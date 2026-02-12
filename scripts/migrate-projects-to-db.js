const mongoose = require('mongoose');
const Project = require('../models/Project');
const fs = require('fs');
const path = require('path');

const projectsFilePath = path.join(__dirname, '..', 'data', 'projects.json');

// Load environment variables from .env.local if it exists
try {
  const envFile = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8');
  envFile.split('\n').forEach(line => {
    const [key, ...values] = line.split('=');
    if (key && values.length) {
      process.env[key.trim()] = values.join('=').trim();
    }
  });
} catch (error) {
  console.log('⚠️ No .env.local file found. Make sure MONGODB_URI is set as environment variable.');
}

async function migrateProjects() {
  try {
    // Connect to database
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined. Please set it as an environment variable or in .env.local file");
    }
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to database');

    // Read projects from JSON file
    let projects = [];
    try {
      const data = fs.readFileSync(projectsFilePath, 'utf8');
      projects = JSON.parse(data);
      console.log(`📄 Found ${projects.length} projects in JSON file`);
    } catch (error) {
      console.error('❌ Error reading projects.json:', error.message);
      return;
    }

    if (projects.length === 0) {
      console.log('⚠️ No projects found in JSON file');
      return;
    }

    // Check how many projects already exist in database
    const existingCount = await Project.countDocuments();
    console.log(`📊 Existing projects in database: ${existingCount}`);

    if (existingCount > 0) {
      console.log('⚠️ Database already contains projects. Skipping migration.');
      console.log('💡 To force migration, empty the collection first.');
      return;
    }

    // Insert projects into database
    let successCount = 0;
    let errorCount = 0;

    for (const project of projects) {
      try {
        // Remove 'id' field and use MongoDB's _id
        const { id, ...projectData } = project;
        
        // Create new project
        const newProject = new Project(projectData);
        await newProject.save();
        successCount++;
        console.log(`✓ Migrated: ${project.title}`);
      } catch (error) {
        errorCount++;
        console.error(`✗ Failed to migrate "${project.title}":`, error.message);
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`   ✓ Successfully migrated: ${successCount}`);
    console.log(`   ✗ Failed: ${errorCount}`);
    console.log(`   Total: ${projects.length}`);

  } catch (error) {
    console.error('❌ Migration error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected from database');
    process.exit(0);
  }
}

// Run migration
migrateProjects().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
