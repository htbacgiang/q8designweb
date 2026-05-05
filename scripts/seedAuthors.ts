/**
 * Seed 3 tác giả mặc định cho Q8 Design.
 * Chạy: npx ts-node -r tsconfig-paths/register scripts/seedAuthors.ts
 */
import mongoose from "mongoose";
import Author from "../models/Author";

const MONGODB_URI = process.env.MONGODB_URI || process.env.DATABASE_URL || "";

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
  if (!MONGODB_URI) {
    console.error("Thiếu biến môi trường MONGODB_URI hoặc DATABASE_URL");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log("Đã kết nối MongoDB");

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
  console.error("Seed thất bại:", err);
  process.exit(1);
});
