import { NextApiHandler } from "next";
import db from "../../../utils/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { getToken } from "next-auth/jwt";
import Image from "../../../models/Image";
import cloudinary from "../../../lib/cloudinary";

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  
  console.log("Alt-text API called with method:", method);
  
  if (method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("Request body:", req.body);
    
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const session = token ? { user: token } : null;
    if (!session || !session.user || !(session.user as any).sub) {
      console.log("No session found");
      return res.status(401).json({ error: "Bạn cần đăng nhập!" });
    }

    console.log("User session:", (session.user as any).sub);

    const { imageId, altText } = req.body;
    console.log("Parsed data:", { imageId, altText });
    
    if (!imageId) {
      console.log("Missing imageId");
      return res.status(400).json({ error: "Thiếu ID ảnh!" });
    }

    await db.connectDb();
    console.log("Database connected");
    
    // imageId có thể là MongoDB _id hoặc publicId (đường dẫn Cloudinary)
    // Thử tìm bằng _id trước, nếu không tìm thấy thì tìm bằng publicId
    let image = null;
    try {
      // Thử tìm bằng _id nếu imageId là ObjectId hợp lệ
      if (imageId.match(/^[0-9a-fA-F]{24}$/)) {
        image = await Image.findById(imageId);
      }
    } catch (e) {
      // Không phải ObjectId hợp lệ, tiếp tục tìm bằng publicId
    }
    
    // Nếu không tìm thấy bằng _id, tìm bằng publicId
    if (!image) {
      image = await Image.findOne({ publicId: imageId });
    }
    
    console.log("Found image in database:", image ? "yes" : "no");
    
    // Nếu không tìm thấy trong database, thử tạo record mới từ Cloudinary
    if (!image) {
      console.log("Image not found in database, trying to fetch from Cloudinary...");
      try {
        // Lấy thông tin image từ Cloudinary
        const cloudinaryResource = await cloudinary.api.resource(imageId, {
          resource_type: "image"
        });
        
        console.log("Found image in Cloudinary:", cloudinaryResource.public_id);
        
        // Tạo record mới trong database
        image = new Image({
          src: cloudinaryResource.secure_url,
          altText: altText || "",
          publicId: cloudinaryResource.public_id,
          uploadedBy: (session.user as any).sub,
        });
        await image.save();
        console.log("Created new image record in database");
      } catch (cloudinaryError: any) {
        console.error("Error fetching from Cloudinary:", cloudinaryError);
        return res.status(404).json({ 
          error: "Không tìm thấy ảnh trong database và Cloudinary!" 
        });
      }
    }

    // Kiểm tra quyền sở hữu
    console.log("Image uploaded by:", image.uploadedBy.toString());
    console.log("Current user:", (session.user as any).sub);
    
    if (image.uploadedBy.toString() !== (session.user as any).sub) {
      console.log("Permission denied");
      return res.status(403).json({ error: "Bạn không có quyền chỉnh sửa ảnh này!" });
    }

    image.altText = altText || "";
    await image.save();
    console.log("Alt text saved successfully");

    res.json({ success: true, image });
  } catch (error: any) {
    console.error('Error updating image alt text:', error);
    res.status(500).json({ error: error.message });
  }
};

export default handler;
