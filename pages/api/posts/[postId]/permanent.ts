import { NextApiHandler } from "next";
import { getToken } from "next-auth/jwt";
import Post from "../../../../models/Post";
import db from "../../../../utils/db";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const session = token ? { user: token } : null;

  if (!session || !session.user) {
    return res.status(401).json({ error: "Bạn cần đăng nhập!" });
  }

  try {
    try {
      await db.connectDb();
    } catch (dbError) {
      console.error("Database connection error:", dbError);
      return res.status(500).json({ error: "Database connection failed" });
    }
    
    const postId = req.query.postId as string;
    if (!postId) {
      return res.status(400).json({ error: "Invalid post id" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found!" });
    }

    // Kiểm tra quyền sở hữu - Admin có thể xóa vĩnh viễn mọi bài viết
    const isAdmin = session.user.role === 'admin';
    const isOwner = post.author && post.author.toString() === session.user.sub;
    
    if (!isAdmin && !isOwner) {
      return res.status(403).json({ error: "Bạn không có quyền xóa vĩnh viễn bài viết này!" });
    }

    // Kiểm tra xem bài viết có bị xóa không
    if (!post.deletedAt) {
      return res.status(400).json({ error: "Bài viết này chưa bị xóa! Vui lòng xóa vào thùng rác trước." });
    }

    // Xóa vĩnh viễn bài viết (chỉ xóa bản ghi trong DB)
    await Post.findByIdAndDelete(postId);

    // Không xóa ảnh thumbnail trên Cloudinary: ảnh có thể đang dùng trong thư viện hoặc bài khác,
    // và giữ lại giúp tiết kiệm việc upload lại nếu dùng cho bài viết mới.
    
    res.json({ removed: true, message: "Đã xóa vĩnh viễn bài viết thành công!" });
  } catch (error: any) {
    console.error("Permanent delete post error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  } finally {
    try {
      await db.disconnectDb();
    } catch (disconnectError) {
      console.error("Database disconnect error:", disconnectError);
    }
  }
};

export default handler;

