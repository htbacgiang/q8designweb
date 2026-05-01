// Quick script to create test posts without needing .env.local
const mongoose = require('mongoose');

// Hardcode a simple connection for testing
const MONGODB_URI = "mongodb://localhost:27017/q8design_test"; // Local MongoDB for testing

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
  isDraft: { type: Boolean, default: false }, // Default to published
}, { timestamps: true });

const Post = mongoose.model("Post", PostSchema);

const testPosts = [
  {
    title: "Bài viết test số 1 - Thiết kế nội thất hiện đại",
    slug: "bai-viet-test-so-1-thiet-ke-noi-that-hien-dai",
    content: "<p>Đây là nội dung bài viết test về thiết kế nội thất hiện đại. Thiết kế hiện đại tập trung vào sự đơn giản và chức năng.</p>",
    category: "Thiết kế hiện đại",
    meta: "Bài viết test về thiết kế nội thất hiện đại và các xu hướng thiết kế mới nhất.",
    tags: ["thiết kế hiện đại", "nội thất", "test"],
    isDraft: false
  },
  {
    title: "Bài viết test số 2 - Phong cách Scandinavian",
    slug: "bai-viet-test-so-2-phong-cach-scandinavian",
    content: "<p>Đây là nội dung bài viết test về phong cách Scandinavian. Phong cách này đặc trưng bởi sự tối giản và ấm áp.</p>",
    category: "Phong cách thiết kế",
    meta: "Bài viết test về phong cách thiết kế Scandinavian và cách áp dụng vào không gian sống.",
    tags: ["scandinavian", "phong cách", "test"],
    isDraft: false
  },
  {
    title: "Bài viết test số 3 - Mẹo trang trí nhà",
    slug: "bai-viet-test-so-3-meo-trang-tri-nha",
    content: "<p>Đây là nội dung bài viết test về mẹo trang trí nhà. Những mẹo hay giúp tạo ra không gian sống đẹp và tiện nghi.</p>",
    category: "Mẹo thiết kế",
    meta: "Bài viết test về các mẹo trang trí nhà và tạo không gian sống hoàn hảo.",
    tags: ["trang trí", "mẹo thiết kế", "test"],
    isDraft: false
  }
];

async function createQuickTestPosts() {
  try {
    console.log("🔌 Connecting to local MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected successfully");

    // Clear existing posts
    await Post.deleteMany({});
    console.log("🧹 Cleared existing posts");

    // Create test posts
    const createdPosts = await Post.insertMany(testPosts);
    console.log(`✅ Created ${createdPosts.length} test posts:`);
    
    createdPosts.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title}`);
      console.log(`   Slug: ${post.slug}`);
      console.log(`   isDraft: ${post.isDraft}`);
      console.log(`   Category: ${post.category}`);
    });

    // Verify
    const total = await Post.countDocuments({});
    const published = await Post.countDocuments({ isDraft: false });
    
    console.log(`\n📊 Summary:`);
    console.log(`   Total posts: ${total}`);
    console.log(`   Published posts: ${published}`);
    
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected");
  }
}

createQuickTestPosts();
