// Script để tạo bài viết mẫu
import db from "../utils/db.js";
import Post from "../models/Post.ts";

const samplePosts = [
  {
    title: "Giới thiệu về Q8 Design",
    slug: "gioi-thieu-ve-q8-design",
    content: "<p>Q8 Design là công ty chuyên về thiết kế nội thất và kiến trúc với hơn 10 năm kinh nghiệm trong ngành.</p>",
    category: "Giới thiệu",
    meta: "Tìm hiểu về Q8 Design và sứ mệnh tạo ra những không gian sống hoàn hảo cho khách hàng.",
    tags: ["q8 design", "thiết kế nội thất", "kiến trúc"],
    isDraft: false,
    thumbnail: {
      url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      public_id: "q8_intro_1"
    }
  },
  {
    title: "Xu hướng thiết kế nội thất 2025",
    slug: "xu-huong-thiet-ke-noi-that-2025",
    content: "<p>Khám phá những xu hướng thiết kế nội thất mới nhất trong năm 2025.</p>",
    category: "Xu hướng",
    meta: "Cập nhật những xu hướng thiết kế nội thất hot nhất năm 2025.",
    tags: ["xu hướng", "2025", "thiết kế nội thất"],
    isDraft: false,
    thumbnail: {
      url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop",
      public_id: "trend_2025_1"
    }
  },
  {
    title: "Mẹo trang trí phòng khách hiện đại",
    slug: "meo-trang-tri-phong-khach-hien-dai",
    content: "<p>Những mẹo hay để trang trí phòng khách theo phong cách hiện đại.</p>",
    category: "Mẹo thiết kế",
    meta: "Hướng dẫn chi tiết cách trang trí phòng khách đẹp và hiện đại.",
    tags: ["phòng khách", "trang trí", "hiện đại"],
    isDraft: false,
    thumbnail: {
      url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      public_id: "living_room_1"
    }
  },
  {
    title: "Phong cách thiết kế Scandinavian",
    slug: "phong-cach-thiet-ke-scandinavian",
    content: "<p>Tìm hiểu về phong cách thiết kế Scandinavian và cách áp dụng vào không gian sống.</p>",
    category: "Phong cách thiết kế",
    meta: "Khám phá vẻ đẹp tối giản và ấm áp của phong cách Scandinavian.",
    tags: ["scandinavian", "tối giản", "phong cách"],
    isDraft: false
  },
  {
    title: "Cách chọn màu sắc cho không gian sống",
    slug: "cach-chon-mau-sac-cho-khong-gian-song",
    content: "<p>Hướng dẫn cách chọn màu sắc phù hợp cho từng không gian trong nhà.</p>",
    category: "Màu sắc",
    meta: "Bí quyết chọn màu sắc tạo cảm giác thoải mái và hài hòa cho ngôi nhà.",
    tags: ["màu sắc", "trang trí", "không gian"],
    isDraft: false
  }
];

async function createSamplePosts() {
  try {
    console.log("🔌 Connecting to database...");
    await db.connectDb();
    console.log("✅ Connected successfully");

    // Check current posts
    const currentCount = await Post.countDocuments({});
    console.log(`📊 Current posts in database: ${currentCount}`);

    // Don't create if we already have posts
    if (currentCount > 5) {
      console.log("✅ Database already has posts, skipping creation");
      return;
    }

    // Create sample posts
    console.log("📝 Creating sample posts...");
    const createdPosts = await Post.insertMany(samplePosts);
    
    console.log(`✅ Successfully created ${createdPosts.length} sample posts:`);
    createdPosts.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title} (${post.slug})`);
    });

    // Verify
    const total = await Post.countDocuments({});
    const published = await Post.countDocuments({ isDraft: false });
    
    console.log(`\n📊 Final Summary:`);
    console.log(`   Total posts: ${total}`);
    console.log(`   Published posts: ${published}`);
    
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    process.exit(0);
  }
}

createSamplePosts();
