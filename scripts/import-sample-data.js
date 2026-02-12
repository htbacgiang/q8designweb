const mongoose = require('mongoose');
const Project = require('../models/Project');

// Sample data
const sampleProjects = [
  {
    title: "Dự án Biệt thự FLC Sầm Sơn",
    subtitle: "Biệt thự nghỉ dưỡng cao cấp",
    category: "villa",
    location: "FLC Sầm Sơn, Thanh Hóa",
    area: "350m²",
    type: "Thiết kế và Thi công trọn gói",
    year: 2024,
    client: "Gia đình anh H.",
    style: "Hiện đại nghỉ dưỡng",
    budget: "3.5 - 4.2 tỷ VNĐ",
    duration: "6 tháng",
    completion: "Hoàn thành",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
    mainImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&h=200&fit=crop"
    ],
    description: "Biệt thự nghỉ dưỡng cao cấp với phong cách hiện đại, tận dụng tối đa view biển và ánh sáng tự nhiên.",
    tags: ["Hiện đại", "Nghỉ dưỡng", "View biển"],
    has3D: true,
    model3D: "https://sketchfab.com/models/2e85bf66e2dd4d48b683d6843e040a2b/embed",
    featured: true,
    slug: "du-an-biet-thu-flc-sam-son",
    overview: "Dự án biệt thự FLC Sầm Sơn là một công trình nghỉ dưỡng cao cấp, được thiết kế với phong cách hiện đại tối giản, tập trung vào việc tận dụng tối đa view biển tuyệt đẹp và ánh sáng tự nhiên.",
    features: [
      {
        icon: "🏖️",
        title: "View biển trực diện",
        desc: "Tận hưởng view biển tuyệt đẹp từ mọi góc nhìn"
      }
    ],
    status: "active"
  }
];

async function importData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/q8design');
    console.log('Connected to database');

    // Clear existing projects
    await Project.deleteMany({});
    console.log('Cleared existing projects');

    // Import sample data
    const projects = await Project.insertMany(sampleProjects);
    console.log(`Imported ${projects.length} projects`);

    // List all projects
    const allProjects = await Project.find({}).select('title slug');
    console.log('\nAll projects:');
    allProjects.forEach(p => {
      console.log(`- ${p.title} (${p.slug})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

importData();
