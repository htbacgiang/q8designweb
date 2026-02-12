/**
 * PM2 Ecosystem Configuration
 * 
 * LƯU Ý QUAN TRỌNG: Các biến môi trường Cloudinary phải được cấu hình trên VPS
 * 
 * Cách 1: Tạo file .env trong thư mục dự án với các biến sau:
 *   CLOUD_NAME=your-cloud-name
 *   CLOUD_API_KEY=your-api-key
 *   CLOUD_API_SECRET=your-api-secret
 *   CLOUDINARY_FOLDER=q8desgin
 * 
 * Cách 2: Thêm trực tiếp vào env section bên dưới (không khuyến khích vì bảo mật)
 * 
 * Sau khi cấu hình, restart PM2: pm2 restart all
 */
module.exports = {
  apps: [
    {
      name: 'btacademy-web',
      script: 'npm',
      args: 'start',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
        // Thêm các biến môi trường Cloudinary vào đây nếu không dùng .env file:
        // CLOUD_NAME: 'your-cloud-name',
        // CLOUD_API_KEY: 'your-api-key',
        // CLOUD_API_SECRET: 'your-api-secret',
        // CLOUDINARY_FOLDER: 'q8desgin',
      }
    },
    {
      name: 'btacademy-email-cron',
      script: 'scripts/daily-email-cron.js',
      args: 'setup',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
