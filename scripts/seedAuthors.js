/**
 * Seed 3 tác giả mặc định cho Q8 Design.
 * Chạy: node scripts/seedAuthors.js
 */
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

// Tự load .env (không cần dotenv package)
const envFile = path.join(__dirname, "..", ".env");
if (fs.existsSync(envFile)) {
  fs.readFileSync(envFile, "utf8")
    .split("\n")
    .forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) return;
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed
        .slice(eqIdx + 1)
        .trim()
        .replace(/^["']|["']$/g, "");
      if (key && !process.env[key]) process.env[key] = val;
    });
}

const MONGODB_URI = process.env.MONGODB_URI || process.env.DATABASE_URL;

if (!MONGODB_URI) {
  console.error("❌ Thiếu biến môi trường MONGODB_URI hoặc DATABASE_URL trong file .env");
  process.exit(1);
}

const AuthorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    role: { type: String, trim: true },
    bio: { type: String, trim: true },
    avatar: { type: String },
    socialLinks: {
      facebook: String,
      zalo: String,
      linkedin: String,
    },
  },
  { timestamps: true }
);

const Author =
  mongoose.models?.Author || mongoose.model("Author", AuthorSchema);

const authors = [
  {
    name: "KTS Mạnh Cường",
    slug: "kts-manh-cuong",
    role: "Kiến trúc sư",
    bio: "Kiến trúc sư với hơn 10 năm kinh nghiệm trong lĩnh vực thiết kế nội thất và kiến trúc cao cấp.",
  },
  {
    name: "KTS Hương Nguyễn",
    slug: "kts-huong-nguyen",
    role: "Kiến trúc sư",
    bio: "Chuyên gia thiết kế nội thất với phong cách hiện đại và tinh tế, mang lại không gian sống hoàn hảo.",
  },
  {
    name: "Hoàng Quốc Hữu",
    slug: "hoang-quoc-huu",
    role: "Founder & CEO",
    bio: "Nhà sáng lập Q8 Design với tầm nhìn mang lại những không gian sống đẳng cấp và cá nhân hóa cho khách hàng.",
  },
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("✅ Đã kết nối MongoDB");

  for (const author of authors) {
    const result = await Author.findOneAndUpdate(
      { slug: author.slug },
      author,
      { upsert: true, new: true }
    );
    console.log(`✅ Seeded: ${result.name}`);
  }

  await mongoose.disconnect();
  console.log("✅ Seed hoàn tất!");
}

seed().catch((err) => {
  console.error("❌ Seed thất bại:", err.message);
  process.exit(1);
});
