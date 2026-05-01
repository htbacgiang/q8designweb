const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Get all dependencies from package.json
function getDependencies() {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const scripts = packageJson.scripts || {};
  const scriptContent = JSON.stringify(scripts);
  
  return {
    dependencies: Object.keys(packageJson.dependencies || {}),
    devDependencies: Object.keys(packageJson.devDependencies || {}),
    scripts: scriptContent,
  };
}

// Get all files recursively
function getAllFiles(dir, fileList = [], extensions = ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss', '.sass']) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules, .next, .git, etc.
      if (!['node_modules', '.next', '.git', 'dist', 'build'].includes(file)) {
        getAllFiles(filePath, fileList, extensions);
      }
    } else {
      const ext = path.extname(file);
      if (extensions.includes(ext) || file.includes('.config.')) {
        fileList.push(filePath);
      }
    }
  });
  
  return fileList;
}

// Extract imports from file content
function extractImports(content) {
  const imports = new Set();
  
  // Match import statements
  const importRegex = /import\s+(?:[\w*{}\s,]+from\s+)?['"]([^'"]+)['"]/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    // Extract package name (before first /)
    const packageName = importPath.split('/')[0];
    // Handle scoped packages
    if (packageName.startsWith('@')) {
      const scopedPackage = importPath.split('/').slice(0, 2).join('/');
      imports.add(scopedPackage);
    } else {
      imports.add(packageName);
    }
  }
  
  // Match require statements
  const requireRegex = /require\s*\(['"]([^'"]+)['"]\)/g;
  while ((match = requireRegex.exec(content)) !== null) {
    const requirePath = match[1];
    const packageName = requirePath.split('/')[0];
    if (packageName.startsWith('@')) {
      const scopedPackage = requirePath.split('/').slice(0, 2).join('/');
      imports.add(scopedPackage);
    } else {
      imports.add(packageName);
    }
  }
  
  return Array.from(imports);
}

// Extract component imports (relative imports)
function extractComponentImports(content, filePath) {
  const imports = new Set();
  
  // Match relative imports
  const relativeImportRegex = /import\s+(?:[\w*{}\s,]+from\s+)?['"](\.\.?\/[^'"]+)['"]/g;
  let match;
  while ((match = relativeImportRegex.exec(content)) !== null) {
    const importPath = match[1];
    try {
      const fullPath = path.resolve(path.dirname(filePath), importPath);
      // Normalize path
      const normalizedPath = path.normalize(fullPath).replace(/\\/g, '/');
      imports.add(normalizedPath);
    } catch (e) {
      // Ignore invalid paths
    }
  }
  
  // Match require with relative paths
  const relativeRequireRegex = /require\s*\(['"](\.\.?\/[^'"]+)['"]\)/g;
  while ((match = relativeRequireRegex.exec(content)) !== null) {
    const importPath = match[1];
    try {
      const fullPath = path.resolve(path.dirname(filePath), importPath);
      const normalizedPath = path.normalize(fullPath).replace(/\\/g, '/');
      imports.add(normalizedPath);
    } catch (e) {
      // Ignore invalid paths
    }
  }
  
  return Array.from(imports);
}

// Check if a file is imported anywhere
function isFileImported(filePath, allImports) {
  const normalizedPath = path.normalize(filePath).replace(/\\/g, '/');
  const baseName = path.basename(filePath, path.extname(filePath));
  const dirName = path.dirname(filePath);
  
  // Check exact path matches
  for (const imp of allImports) {
    if (imp.includes(normalizedPath) || normalizedPath.includes(imp)) {
      return true;
    }
    
    // Check if import points to directory and file is index
    if (path.basename(filePath).startsWith('index.')) {
      const dirPath = path.dirname(normalizedPath);
      if (imp.includes(dirPath)) {
        return true;
      }
    }
    
    // Check base name matches
    const impBaseName = path.basename(imp, path.extname(imp));
    if (impBaseName === baseName && imp.includes(dirName)) {
      return true;
    }
  }
  
  return false;
}

// Main analysis function
function analyzeUnused() {
  log('\n🔍 Đang phân tích dự án...', 'cyan');
  
  const { dependencies, devDependencies, scripts } = getDependencies();
  const allDeps = [...dependencies, ...devDependencies];
  
  log(`\n📦 Tìm thấy ${allDeps.length} dependencies`, 'blue');
  
  // Get all code files (including config files)
  const codeFiles = getAllFiles('.', [], ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss', '.sass']);
  log(`📄 Tìm thấy ${codeFiles.length} file code`, 'blue');
  
  // Get all component files - handle both Windows and Unix paths
  const componentFiles = codeFiles.filter(file => {
    const normalizedFile = file.replace(/\\/g, '/');
    return (normalizedFile.includes('components/') || normalizedFile.includes('components\\')) &&
           !normalizedFile.includes('node_modules') &&
           !normalizedFile.includes('.next') &&
           !normalizedFile.includes('README') &&
           !normalizedFile.includes('.d.ts') &&
           !normalizedFile.includes('.module.css') &&
           !normalizedFile.includes('.module.scss');
  });
  
  // Scan all files for imports
  const usedPackages = new Set();
  const allComponentImports = new Set();
  const fileContents = new Map();
  
  log('\n📖 Đang quét imports...', 'cyan');
  
  codeFiles.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      fileContents.set(file, content);
      
      const imports = extractImports(content);
      imports.forEach(imp => usedPackages.add(imp));
      
      const componentImports = extractComponentImports(content, file);
      componentImports.forEach(imp => allComponentImports.add(imp));
    } catch (e) {
      // Skip files that can't be read
    }
  });
  
  // Check package.json scripts for dependencies
  // Parse scripts object to check each script value
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const scriptsObj = packageJson.scripts || {};
    Object.values(scriptsObj).forEach(scriptCmd => {
      allDeps.forEach(dep => {
        // Check if dependency name appears in script command
        if (typeof scriptCmd === 'string' && scriptCmd.includes(dep)) {
          usedPackages.add(dep);
        }
      });
    });
  } catch (e) {
    // Fallback: check scripts string
    allDeps.forEach(dep => {
      if (scripts.includes(dep)) {
        usedPackages.add(dep);
      }
    });
  }
  
  // Also check for sass/scss files (sass compiler is needed)
  const hasSassFiles = codeFiles.some(file => file.endsWith('.scss') || file.endsWith('.sass'));
  if (hasSassFiles) {
    usedPackages.add('sass');
  }
  
  // Dependencies that are required by Next.js or build tools (should not be removed)
  const requiredDeps = [
    'react-dom', // Required by Next.js
    'react', // Required by Next.js
    'next', // Core framework
    'tailwindcss', // Used in tailwind.config.js
    'postcss', // Used in postcss.config.js
    'autoprefixer', // Used in postcss.config.js
    '@types/node', // TypeScript types
    '@types/react', // TypeScript types
    '@types/react-dom', // TypeScript types
    'eslint', // Used for linting
    'eslint-config-next', // Used for linting
  ];
  
  // Find unused dependencies
  const unusedDeps = allDeps.filter(dep => {
    // Skip built-in modules and special cases
    if (['fs', 'path', 'crypto', 'http', 'https', 'url', 'util', 'stream', 'events', 'buffer'].includes(dep)) {
      return false;
    }
    
    // Skip required dependencies
    if (requiredDeps.includes(dep)) {
      return false;
    }
    
    // Check if package is used
    const isUsed = Array.from(usedPackages).some(used => {
      // Exact match
      if (used === dep) return true;
      // Scoped package match
      if (dep.startsWith('@') && used.startsWith(dep.split('/')[0])) {
        return used.startsWith(dep);
      }
      // Partial match for packages with submodules
      if (used.startsWith(dep + '/')) return true;
      return false;
    });
    
    // Check if used in scripts
    const usedInScripts = scripts.includes(dep);
    
    return !isUsed && !usedInScripts;
  });
  
  // Find unused component files
  log('\n🔍 Đang kiểm tra component files...', 'cyan');
  const unusedComponents = [];
  const componentUsageMap = new Map(); // Track which files use which components
  
  // Normalize all component file paths
  const normalizedComponentFiles = componentFiles.map(file => ({
    original: file,
    normalized: path.normalize(path.resolve(file)).replace(/\\/g, '/'),
    baseName: path.basename(file, path.extname(file)),
    dirName: path.dirname(file),
    relativeFromRoot: path.relative(process.cwd(), file).replace(/\\/g, '/')
  }));
  
  normalizedComponentFiles.forEach(({ original: componentFile, normalized, baseName, dirName, relativeFromRoot }) => {
    // Skip index files and special files
    if (componentFile.includes('index.') || 
        componentFile.includes('README') ||
        componentFile.includes('.d.ts') ||
        componentFile.includes('.module.css') ||
        componentFile.includes('.module.scss')) {
      return;
    }
    
    let isUsed = false;
    const usedInFiles = [];
    
    // Check all files for references to this component
    for (const [file, content] of fileContents.entries()) {
      if (file === componentFile) continue;
      
      const fileDir = path.dirname(file);
      const fileNormalized = path.normalize(file).replace(/\\/g, '/');
      
      // Skip if checking against itself
      if (fileNormalized === normalized) continue;
      
      // Calculate relative path from current file to component
      let relativePath;
      try {
        relativePath = path.relative(fileDir, componentFile).replace(/\\/g, '/');
        // Remove extension for import matching
        const relativePathNoExt = relativePath.replace(/\.(jsx?|tsx?)$/, '');
        const relativePathWithIndex = relativePathNoExt.replace(/\/index$/, '');
        
        // Pattern 1: Direct relative import
        const directImportPatterns = [
          new RegExp(`from\\s+['"]${relativePathNoExt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`, 'i'),
          new RegExp(`from\\s+['"]${relativePathWithIndex.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`, 'i'),
          new RegExp(`require\\s*\\(['"]${relativePathNoExt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]\\)`, 'i'),
          new RegExp(`require\\s*\\(['"]${relativePathWithIndex.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]\\)`, 'i'),
        ];
        
        // Pattern 2: Dynamic import
        const dynamicImportPatterns = [
          new RegExp(`import\\s*\\(['"]${relativePathNoExt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]\\)`, 'i'),
          new RegExp(`import\\s*\\(['"]${relativePathWithIndex.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]\\)`, 'i'),
        ];
        
        // Pattern 3: Component name in import (for named imports)
        const componentNamePattern = new RegExp(`import\\s+.*\\b${baseName}\\b.*from`, 'i');
        
        // Pattern 4: Check for component name usage (JSX/TSX)
        const jsxUsagePattern = new RegExp(`<${baseName}\\b`, 'i');
        
        // Pattern 5: Check absolute path imports (from components/)
        const absolutePathPattern = new RegExp(`['"]\\.\\.?\/.*components\/.*${baseName}['"]`, 'i');
        
        // Check all patterns
        const allPatterns = [
          ...directImportPatterns,
          ...dynamicImportPatterns,
          componentNamePattern,
          jsxUsagePattern,
          absolutePathPattern
        ];
        
        if (allPatterns.some(pattern => pattern.test(content))) {
          isUsed = true;
          usedInFiles.push(file);
        }
        
        // Also check if the normalized import path matches
        const componentImports = extractComponentImports(content, file);
        for (const imp of componentImports) {
          try {
            const resolvedImp = path.normalize(path.resolve(imp)).replace(/\\/g, '/');
            if (resolvedImp === normalized || 
                resolvedImp.includes(normalized) || 
                normalized.includes(resolvedImp)) {
              isUsed = true;
              usedInFiles.push(file);
              break;
            }
          } catch (e) {
            // Ignore resolution errors
          }
        }
      } catch (e) {
        // Ignore path resolution errors
      }
    }
    
    if (!isUsed) {
      unusedComponents.push({
        file: componentFile,
        relativePath: relativeFromRoot,
        baseName: baseName
      });
    } else {
      componentUsageMap.set(componentFile, usedInFiles);
    }
  });
  
  // Print results
  log('\n' + '='.repeat(60), 'cyan');
  log('📊 KẾT QUẢ PHÂN TÍCH', 'cyan');
  log('='.repeat(60), 'cyan');
  
  // Unused dependencies
  log('\n📦 THƯ VIỆN KHÔNG ĐƯỢC SỬ DỤNG:', 'yellow');
  if (unusedDeps.length === 0) {
    log('✅ Không có thư viện nào không được sử dụng', 'green');
  } else {
    unusedDeps.forEach(dep => {
      log(`  ❌ ${dep}`, 'red');
    });
    log(`\n⚠️  Tổng cộng: ${unusedDeps.length} thư viện`, 'yellow');
  }
  
  // Unused components
  log('\n📁 COMPONENT FILES KHÔNG ĐƯỢC SỬ DỤNG:', 'yellow');
  if (unusedComponents.length === 0) {
    log('✅ Không có component nào không được sử dụng', 'green');
  } else {
    unusedComponents.forEach(comp => {
      const displayPath = typeof comp === 'string' ? comp : (comp.relativePath || comp.file);
      log(`  ❌ ${displayPath}`, 'red');
    });
    log(`\n⚠️  Tổng cộng: ${unusedComponents.length} component files`, 'yellow');
  }
  
  // Summary
  log('\n' + '='.repeat(60), 'cyan');
  log('📈 TÓM TẮT:', 'cyan');
  log(`  • Tổng dependencies: ${allDeps.length}`, 'blue');
  log(`  • Dependencies đã sử dụng: ${allDeps.length - unusedDeps.length}`, 'green');
  log(`  • Dependencies chưa sử dụng: ${unusedDeps.length}`, unusedDeps.length > 0 ? 'red' : 'green');
  log(`  • Tổng component files: ${componentFiles.length}`, 'blue');
  log(`  • Component files đã sử dụng: ${componentFiles.length - unusedComponents.length}`, 'green');
  log(`  • Component files chưa sử dụng: ${unusedComponents.length}`, unusedComponents.length > 0 ? 'red' : 'green');
  log('='.repeat(60) + '\n', 'cyan');
  
  // Save to file
  const report = {
    timestamp: new Date().toISOString(),
    unusedDependencies: unusedDeps,
    unusedComponents: unusedComponents.map(comp => typeof comp === 'string' ? comp : comp.file),
    unusedComponentsDetails: unusedComponents,
    componentUsageMap: Object.fromEntries(componentUsageMap),
    summary: {
      totalDependencies: allDeps.length,
      usedDependencies: allDeps.length - unusedDeps.length,
      unusedDependencies: unusedDeps.length,
      totalComponents: componentFiles.length,
      usedComponents: componentFiles.length - unusedComponents.length,
      unusedComponents: unusedComponents.length,
    }
  };
  
  fs.writeFileSync('unused-report.json', JSON.stringify(report, null, 2));
  log('💾 Đã lưu báo cáo vào unused-report.json', 'green');
}

// Run analysis
try {
  analyzeUnused();
} catch (error) {
  log(`\n❌ Lỗi: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
}
