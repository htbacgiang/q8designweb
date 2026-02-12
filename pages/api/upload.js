import multiparty from "multiparty";
import cloudinary from "cloudinary";
import { mongooseConnect } from "../../lib/mongoose";

// Kiểm tra và validate các biến môi trường Cloudinary
const cloudName = process.env.CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUD_API_KEY || process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUD_API_SECRET || process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.error("⚠️  Cloudinary configuration missing in upload.js!");
}

cloudinary.v2.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

export default async function handle(req, res) {
  // Kiểm tra cấu hình Cloudinary trước khi xử lý
  if (!cloudName || !apiKey || !apiSecret) {
    return res.status(500).json({ 
      error: "Cấu hình Cloudinary chưa đầy đủ. Vui lòng kiểm tra các biến môi trường CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET." 
    });
  }

  try {
    await mongooseConnect();

    const form = new multiparty.Form();
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const links = [];
    for (const file of files.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(file.path, {
          folder: process.env.CLOUDINARY_FOLDER || "q8desgin",
          public_id: `file_${Date.now()}`,
          resource_type: "auto",
        });

        const link = result.secure_url;
        links.push(link);
      } catch (uploadError) {
        console.error("Error uploading file to Cloudinary:", uploadError);
        throw uploadError;
      }
    }

    return res.json({ links });
  } catch (error) {
    console.error("Upload error:", error);
    const errorMessage = error.message || "Lỗi upload file";
    if (errorMessage.includes("api_key") || errorMessage.includes("Must supply")) {
      return res.status(500).json({ 
        error: "Cấu hình Cloudinary chưa đầy đủ. Vui lòng kiểm tra các biến môi trường CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET trên VPS." 
      });
    }
    return res.status(500).json({ error: errorMessage });
  }
}

export const config = {
  api: { bodyParser: false },
};
