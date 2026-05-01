const mongoose = require('mongoose');
const Project = require('../models/Project');

const testProject = {
  title: "Dự án Test",
  subtitle: "Dự án test để kiểm tra",
  category: "villa",
  location: "Hà Nội",
  area: "100m²",
  type: "Thiết kế",
  year: 2024,
  client: "Test Client",
  style: "Hiện đại",
  budget: "1 tỷ VNĐ",
  duration: "3 tháng",
  completion: "Hoàn thành",
  image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
  mainImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
  gallery: [],
  description: "Dự án test để kiểm tra hệ thống",
  tags: ["Test", "Hiện đại"],
  has3D: false,
  featured: false,
  slug: "du-an-test",
  overview: "Dự án test để kiểm tra hệ thống hoạt động",
  features: [],
  status: "active"
};

async function createTestProject() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/q8design');
    console.log('Connected to database');

    // Create test project
    const project = new Project(testProject);
    await project.save();
    console.log('Created test project:', project.title);
    console.log('Slug:', project.slug);
    console.log('URL: /du-an/' + project.slug);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createTestProject();
