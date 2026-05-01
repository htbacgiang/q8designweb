/**
 * Script kiểm tra cấu hình Cloudinary
 * Chạy: node scripts/check-cloudinary-config.js
 */

const requiredVars = [
  'CLOUD_NAME',
  'CLOUD_API_KEY',
  'CLOUD_API_SECRET',
];

const optionalVars = [
  'CLOUDINARY_FOLDER',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
];

console.log('🔍 Kiểm tra cấu hình Cloudinary...\n');

let hasErrors = false;
let hasWarnings = false;

// Kiểm tra các biến bắt buộc
console.log('📋 Biến môi trường bắt buộc:');
requiredVars.forEach(varName => {
  const value = process.env[varName] || process.env[`CLOUDINARY_${varName}`];
  if (value) {
    // Ẩn giá trị thực để bảo mật, chỉ hiện một phần
    const masked = value.length > 8 
      ? value.substring(0, 4) + '...' + value.substring(value.length - 4)
      : '***';
    console.log(`  ✅ ${varName}: ${masked}`);
  } else {
    console.log(`  ❌ ${varName}: CHƯA ĐƯỢC CẤU HÌNH`);
    hasErrors = true;
  }
});

// Kiểm tra các biến tùy chọn
console.log('\n📋 Biến môi trường tùy chọn:');
optionalVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`  ✓ ${varName}: ${value}`);
  } else {
    console.log(`  ○ ${varName}: không có (sẽ dùng giá trị mặc định)`);
  }
});

// Kiểm tra CLOUDINARY_FOLDER
const folder = process.env.CLOUDINARY_FOLDER || 'q8desgin';
console.log(`\n📁 Thư mục Cloudinary: ${folder}`);

// Tổng kết
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.log('❌ CẤU HÌNH CHƯA ĐẦY ĐỦ!');
  console.log('\nVui lòng cấu hình các biến môi trường sau:');
  requiredVars.forEach(varName => {
    if (!process.env[varName] && !process.env[`CLOUDINARY_${varName}`]) {
      console.log(`  - ${varName} hoặc CLOUDINARY_${varName}`);
    }
  });
  console.log('\nXem hướng dẫn tại: docs/VPS_DEPLOYMENT.md');
  process.exit(1);
} else {
  console.log('✅ Cấu hình Cloudinary đã đầy đủ!');
  process.exit(0);
}

