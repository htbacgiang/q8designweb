import type { NextApiHandler } from "next";
import { IncomingForm } from "formidable";
import fs from "fs";
import crypto from "crypto";
import cloudinary from "../../lib/cloudinary";
import db from "../../utils/db";
import Image from "../../models/Image";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { getToken } from "next-auth/jwt";

// Tắt bodyParser để formidable xử lý request
export const config = {
  api: { bodyParser: false },
};

// Hàm tiện ích để parse form multipart/form-data, hỗ trợ multiples
const parseForm = (req: any): Promise<{ files: any; fields: any }> => {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({ multiples: true });
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ files, fields });
    });
  });
};

const handler: NextApiHandler = (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST": {
      const { multiple, type } = req.query;
      if (type === "avatar") {
        return uploadAvatar(req, res);
      }
      if (multiple === "true") {
        return uploadMultipleImages(req, res);
      }
      return uploadNewImage(req, res);
    }

    case "GET":
      return readAllImages(req, res);
    default:
      return res.status(404).send("Not found!");
  }
};

// Upload một ảnh lên Cloudinary
const uploadNewImage: NextApiHandler = async (req, res) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const session = token ? { user: token } : null;
    if (!session || !session.user || !(session.user as any).sub) {
      return res.status(401).json({ error: "Bạn cần đăng nhập để upload ảnh!" });
    }

    const { files, fields } = await parseForm(req);
    const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
    const altTextRaw = fields.altText;
    const altText = (Array.isArray(altTextRaw) ? altTextRaw[0] : altTextRaw) || "";

    // Validate loại file
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(imageFile.mimetype)) {
      return res.status(400).json({ error: 'Chỉ hỗ trợ file JPEG, JPG, PNG, WEBP' });
    }

    // Hash nội dung file để tránh upload trùng lên Cloudinary
    const fileBuffer = fs.readFileSync(imageFile.filepath);
    const contentHash = crypto.createHash("sha256").update(new Uint8Array(fileBuffer)).digest("hex");

    await db.connectDb();
    const userId = (session.user as any).sub;

    const existing = await Image.findOne({ uploadedBy: userId, contentHash });
    if (existing) {
      return res.json({
        src: existing.src,
        altText: altText || existing.altText || "",
        id: existing._id,
      });
    }

    const { secure_url: url, public_id } = await cloudinary.uploader.upload(
      imageFile.filepath,
      { folder: "q8desgin" }
    );

    const newImage = new Image({
      src: url,
      altText,
      publicId: public_id,
      uploadedBy: userId,
      contentHash,
    });
    await newImage.save();

    res.json({ src: url, altText, id: newImage._id });
  } catch (error: any) {
    console.error('Error uploading to Cloudinary:', error);
    res.status(500).json({ error: error.message });
  }
};

// Upload avatar lên Cloudinary
const uploadAvatar: NextApiHandler = async (req, res) => {
  try {
    const { files } = await parseForm(req);
    const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;

    // Validate loại file
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(imageFile.mimetype)) {
      return res.status(400).json({ error: 'Chỉ hỗ trợ file JPEG, JPG, PNG, WEBP' });
    }

    // Validate kích thước file (tối đa 5MB)
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    if (imageFile.size > maxFileSize) {
      return res.status(400).json({ error: 'Kích thước file không được vượt quá 5MB' });
    }

    const { secure_url: url } = await cloudinary.uploader.upload(
      imageFile.filepath,
      { folder: "q8desgin/avatar" }
    );

    res.json({ src: url });
  } catch (error: any) {
    console.error('Error uploading avatar to Cloudinary:', error);
    res.status(500).json({ error: error.message });
  }
};

// Upload nhiều ảnh lên Cloudinary cùng lúc
const uploadMultipleImages: NextApiHandler = async (req, res) => {
  try {
    const { files } = await parseForm(req);
    const imageFiles = Array.isArray(files.image) ? files.image : [files.image];
    const uploadedUrls: string[] = [];

    // Validate và upload từng file
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    for (const file of imageFiles) {
      if (!allowedTypes.includes(file.mimetype)) {
        return res.status(400).json({ error: 'Chỉ hỗ trợ file JPEG, JPG, PNG, WEBP' });
      }
      const { secure_url: url } = await cloudinary.uploader.upload(
        file.filepath,
        { folder: "q8desgin" }
      );
      uploadedUrls.push(url);
    }

    res.json({ src: uploadedUrls });
  } catch (error: any) {
    console.error('Error uploading multiple images to Cloudinary:', error);
    res.status(500).json({ error: error.message });
  }
};



// Đọc danh sách ảnh đã upload từ Cloudinary
const readAllImages: NextApiHandler = async (req, res) => {
  try {
    await db.connectDb();
    
    // Load ảnh từ Cloudinary
    const { resources } = await cloudinary.api.resources({
      resource_type: "image",
      type: "upload",
      prefix: "q8desgin", // Sử dụng folder cố định
      max_results: 1000, // Tăng limit để load tất cả ảnh
    });

    
    // Load images từ database để lấy altText
    const dbImages = await Image.find({});
    const dbImagesMap = new Map(dbImages.map((img: any) => [img.publicId, img]));
    
    const formattedImages = resources.map((resource: any, index: number) => {
      const dbImage = dbImagesMap.get(resource.public_id);
      return {
        src: resource.secure_url,
        altText: dbImage?.altText || "",
        id: dbImage?._id?.toString() || resource.public_id, // Ưu tiên dùng _id từ database, fallback về public_id
        publicId: resource.public_id // Giữ publicId để có thể tìm lại sau này
      };
    });
    
    
    res.json({ images: formattedImages });
  } catch (error: any) {
    console.error('Error fetching images from Cloudinary:', error);
    res.status(500).json({ error: error.message });
  }
};

export default handler;