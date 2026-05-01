const mongoose = require('mongoose');

// Import models
const PostSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, trim: true, unique: true },
  content: { type: String, required: true, trim: true },
  category: { type: String },
  meta: { type: String, required: true, trim: true },
  tags: { type: [String] },
  thumbnail: {
    url: String,
    public_id: String,
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isDraft: { type: Boolean, default: true },
}, { timestamps: true });

const Post = mongoose.models?.Post || mongoose.model("Post", PostSchema);

// Sample posts data for Q8 Design
const samplePosts = [
  {
    title: "Thiết kế nội thất hiện đại - Xu hướng 2025",
    slug: "thiet-ke-noi-that-hien-dai-xu-huong-2025",
    content: `
      <h2>Thiết kế nội thất hiện đại là gì?</h2>
      <p>Thiết kế nội thất hiện đại tập trung vào sự đơn giản, chức năng và tính thẩm mỹ cao. Phong cách này loại bỏ những chi tiết rườm rà, tập trung vào những đường nét sạch sẽ và không gian mở.</p>
      
      <h2>Đặc điểm của thiết kế nội thất hiện đại</h2>
      <ul>
        <li>Đường nét sạch sẽ, tối giản</li>
        <li>Sử dụng màu sắc trung tính</li>
        <li>Vật liệu tự nhiên như gỗ, đá</li>
        <li>Ánh sáng tự nhiên và nhân tạo hài hòa</li>
      </ul>
    `,
    category: "Thiết kế hiện đại",
    meta: "Khám phá xu hướng thiết kế nội thất hiện đại 2025 - phong cách tối giản, chức năng và thẩm mỹ cao.",
    tags: ["thiết kế hiện đại", "xu hướng 2025", "nội thất"],
    thumbnail: {
      url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      public_id: "modern_interior_1"
    },
    isDraft: false
  },
  {
    title: "Phong cách Scandinavian trong thiết kế nội thất",
    slug: "phong-cach-scandinavian-trong-thiet-ke-noi-that",
    content: `
      <h2>Phong cách Scandinavian</h2>
      <p>Phong cách Scandinavian bắt nguồn từ các nước Bắc Âu, đặc trưng bởi sự tối giản, ấm áp và gần gũi với thiên nhiên.</p>
      
      <h2>Nguyên tắc thiết kế Scandinavian</h2>
      <ul>
        <li>Màu sắc nhẹ nhàng, chủ yếu là trắng và gỗ</li>
        <li>Nội thất đơn giản, chức năng</li>
        <li>Ánh sáng tự nhiên tối đa</li>
        <li>Vật liệu tự nhiên</li>
      </ul>
    `,
    category: "Phong cách thiết kế",
    meta: "Tìm hiểu về phong cách Scandinavian - xu hướng thiết kế nội thất được yêu thích nhất hiện nay.",
    tags: ["scandinavian", "phong cách", "thiết kế"],
    thumbnail: {
      url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop",
      public_id: "scandinavian_1"
    },
    isDraft: false
  },
  {
    title: "Mẹo chọn màu sắc cho phòng ngủ",
    slug: "meo-chon-mau-sac-cho-phong-ngu",
    content: `
      <h2>Tầm quan trọng của màu sắc trong phòng ngủ</h2>
      <p>Màu sắc có ảnh hưởng lớn đến tâm trạng và chất lượng giấc ngủ. Việc chọn màu sắc phù hợp sẽ tạo ra không gian thư giãn và thoải mái.</p>
      
      <h2>Những màu sắc phù hợp cho phòng ngủ</h2>
      <ul>
        <li>Màu xanh dương nhạt - tạo cảm giác bình yên</li>
        <li>Màu xanh lá cây nhạt - gần gũi với thiên nhiên</li>
        <li>Màu be, kem - ấm áp và dễ chịu</li>
        <li>Màu xám nhạt - sang trọng và hiện đại</li>
      </ul>
    `,
    category: "Mẹo thiết kế",
    meta: "Hướng dẫn chọn màu sắc phù hợp cho phòng ngủ để có giấc ngủ ngon và không gian thư giãn.",
    tags: ["màu sắc", "phòng ngủ", "mẹo thiết kế"],
    thumbnail: {
      url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      public_id: "bedroom_colors_1"
    },
    isDraft: false
  }
];

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ Database connection error:', error);
    process.exit(1);
  }
}

// Create test posts
async function createTestPosts() {
  try {
    console.log('🔌 Connecting to database...');
    await connectDB();

    // Check if posts already exist
    const existingPosts = await Post.find({});
    if (existingPosts.length > 0) {
      console.log(`📊 Found ${existingPosts.length} existing posts`);
      console.log('✅ Test posts already exist, skipping creation');
      return;
    }

    console.log('📝 Creating test posts...');
    const createdPosts = await Post.insertMany(samplePosts);
    
    console.log(`✅ Successfully created ${createdPosts.length} test posts:`);
    createdPosts.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title} (${post.slug})`);
    });

    console.log('\n🎉 Test posts creation completed!');
    
  } catch (error) {
    console.error('❌ Error creating test posts:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
}

// Run the script
createTestPosts();