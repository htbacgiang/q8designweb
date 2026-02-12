import { v2 as cloudinary } from "cloudinary";

// Kiểm tra và validate các biến môi trường Cloudinary
const cloudName = process.env.CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUD_API_KEY || process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUD_API_SECRET || process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.error("⚠️  Cloudinary configuration missing!");
  console.error("Required environment variables:");
  console.error("  - CLOUD_NAME or CLOUDINARY_CLOUD_NAME");
  console.error("  - CLOUD_API_KEY or CLOUDINARY_API_KEY");
  console.error("  - CLOUD_API_SECRET or CLOUDINARY_API_SECRET");
  console.error("Current values:", {
    cloudName: cloudName ? "✓" : "✗",
    apiKey: apiKey ? "✓" : "✗",
    apiSecret: apiSecret ? "✓" : "✗",
  });
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

export default cloudinary;