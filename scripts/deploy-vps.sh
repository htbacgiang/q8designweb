#!/bin/bash

# Script để deploy và khắc phục lỗi trên VPS
# Chạy script này trên VPS

echo "🚀 Bắt đầu deploy và khắc phục lỗi..."

# 1. Kiểm tra và sửa DNS
echo "🔍 Kiểm tra DNS configuration..."
echo "nameserver 8.8.8.8" | sudo tee -a /etc/resolv.conf
echo "nameserver 1.1.1.1" | sudo tee -a /etc/resolv.conf

# 2. Kiểm tra firewall
echo "🔥 Kiểm tra firewall..."
sudo ufw allow 3000
sudo ufw allow 80
sudo ufw allow 443

# 3. Cập nhật code
echo "📦 Cập nhật code..."
git pull origin main

# 4. Cài đặt dependencies
echo "📚 Cài đặt dependencies..."
npm install

# 5. Build ứng dụng
echo "🏗️  Build ứng dụng..."
npm run build

# 6. Kiểm tra environment variables
echo "🔧 Kiểm tra environment variables..."
if [ ! -f .env ]; then
    echo "❌ File .env không tồn tại!"
    echo "Tạo file .env từ template..."
    cp env.txt .env
fi

# 7. Sửa lỗi chính tả domain (nếu có)
echo "✏️  Sửa lỗi chính tả domain..."
sed -i 's/q8desgin\.vn/q8design.vn/g' .env
sed -i 's/q8desgin\.vn/q8design.vn/g' pages/**/*.js
sed -i 's/q8desgin\.vn/q8design.vn/g' components/**/*.jsx

# 8. Restart services
echo "🔄 Restart services..."
if command -v pm2 &> /dev/null; then
    pm2 restart all
    pm2 save
else
    echo "⚠️  PM2 không được cài đặt. Khởi động thủ công:"
    echo "npm start"
fi

# 9. Kiểm tra kết nối database
echo "🗄️  Kiểm tra kết nối database..."
node -e "
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/q8design')
  .then(() => console.log('✅ Database connected'))
  .catch(err => console.log('❌ Database connection failed:', err.message));
"

# 10. Test API endpoint
echo "🧪 Test API endpoint..."
curl -f http://localhost:3000/api/projects || echo "❌ API không hoạt động"

echo "✅ Hoàn thành deploy và khắc phục lỗi!"
echo ""
echo "📋 Các bước tiếp theo:"
echo "1. Kiểm tra logs: pm2 logs"
echo "2. Kiểm tra status: pm2 status"
echo "3. Test website: curl http://localhost:3000"
echo "4. Kiểm tra database: mongo q8design --eval 'db.projects.count()'"
