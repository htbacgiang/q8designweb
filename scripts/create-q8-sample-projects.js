// Script để tạo dự án mẫu cho Q8 Design
import db from "../utils/db.js";

// Sample projects data for Q8 Design
const sampleProjects = [
  {
    id: "project-1",
    title: "Biệt thự hiện đại tại Quận 2",
    subtitle: "Thiết kế nội thất biệt thự 3 tầng phong cách hiện đại",
    slug: "biet-thu-hien-dai-quan-2",
    category: "villa",
    location: "Quận 2, TP.HCM",
    area: "350m²",
    year: "2024",
    completion: "Hoàn thành",
    featured: true,
    has3D: true,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop"
    ],
    tags: ["hiện đại", "biệt thự", "3 tầng"],
    description: "Dự án thiết kế nội thất biệt thự hiện đại với không gian mở, ánh sáng tự nhiên và vật liệu cao cấp."
  },
  {
    id: "project-2", 
    title: "Căn hộ chung cư cao cấp",
    subtitle: "Thiết kế nội thất căn hộ 2PN phong cách Scandinavian",
    slug: "can-ho-chung-cu-cao-cap",
    category: "apartment",
    location: "Quận 1, TP.HCM",
    area: "85m²",
    year: "2024",
    completion: "Hoàn thành",
    featured: false,
    has3D: false,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop"
    ],
    tags: ["scandinavian", "căn hộ", "2PN"],
    description: "Thiết kế nội thất căn hộ theo phong cách Scandinavian với gam màu trắng và gỗ tự nhiên."
  },
  {
    id: "project-3",
    title: "Nhà phố thương mại",
    subtitle: "Thiết kế nội thất nhà phố kết hợp kinh doanh",
    slug: "nha-pho-thuong-mai",
    category: "townhouse", 
    location: "Quận 3, TP.HCM",
    area: "120m²",
    year: "2023",
    completion: "Hoàn thành",
    featured: true,
    has3D: true,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop"
    ],
    tags: ["nhà phố", "thương mại", "kinh doanh"],
    description: "Thiết kế nội thất nhà phố kết hợp không gian sống và kinh doanh với layout tối ưu."
  },
  {
    id: "project-4",
    title: "Văn phòng công ty",
    subtitle: "Thiết kế nội thất văn phòng hiện đại",
    slug: "van-phong-cong-ty",
    category: "commercial",
    location: "Quận 7, TP.HCM", 
    area: "200m²",
    year: "2024",
    completion: "Đang thi công",
    featured: false,
    has3D: true,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop"
    ],
    tags: ["văn phòng", "công ty", "hiện đại"],
    description: "Thiết kế nội thất văn phòng công ty với không gian làm việc hiện đại và tiện nghi."
  },
  {
    id: "project-5",
    title: "Căn hộ studio",
    subtitle: "Thiết kế nội thất căn hộ studio tối ưu không gian",
    slug: "can-ho-studio",
    category: "apartment",
    location: "Quận 4, TP.HCM",
    area: "45m²", 
    year: "2023",
    completion: "Hoàn thành",
    featured: false,
    has3D: false,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop"
    ],
    tags: ["studio", "tối ưu", "nhỏ gọn"],
    description: "Thiết kế nội thất căn hộ studio với giải pháp tối ưu không gian cho cuộc sống tiện nghi."
  }
];

async function createSampleProjects() {
  try {
    console.log("🔌 Connecting to database...");
    await db.connectDb();
    console.log("✅ Connected successfully");

    // Check if projects already exist (you might want to use a different collection/model)
    console.log("📊 Creating sample projects for Q8 Design...");
    
    // Since we don't have a Project model yet, we'll just log the data
    // You can later create a Project model and save these to database
    console.log(`✅ Sample projects data prepared:`);
    sampleProjects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.title}`);
      console.log(`   Category: ${project.category}`);
      console.log(`   Location: ${project.location}`);
      console.log(`   Area: ${project.area}`);
      console.log(`   Featured: ${project.featured ? 'Yes' : 'No'}`);
      console.log(`   Gallery: ${project.gallery.length} images`);
      console.log('');
    });

    console.log("💡 Note: To save these projects to database, you need to:");
    console.log("   1. Create a Project model in models/Project.js");
    console.log("   2. Update this script to use the model");
    console.log("   3. Run the script again");
    
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    process.exit(0);
  }
}

createSampleProjects();
