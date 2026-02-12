import { NextApiHandler } from "next";
import db from "../../../utils/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { getToken } from "next-auth/jwt";
import Post from "../../../models/Post";
import formidable from "formidable";
import cloudinary from "../../../lib/cloudinary";
import { IncomingPost } from "../../../utils/types";

export const config = {
  api: { 
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      return saveDraft(req, res);
    case "PUT":
      return updateDraftStatus(req, res);
    case "GET":
      return getDrafts(req, res);
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
};

const saveDraft: NextApiHandler = async (req, res) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const session = token ? { user: token } : null;

  if (!session || !session.user || !session.user.sub) {
    return res.status(401).json({ error: "Bạn cần đăng nhập để lưu nháp!" });
  }

  try {
    // Xử lý FormData (cho việc upload file)
    const { files, fields } = await readFile<IncomingPost>(req);
    
    // Formidable trả về array cho mỗi field, cần lấy phần tử đầu tiên
    const getFieldValue = (field: any): string => {
      if (Array.isArray(field)) return field[0] || '';
      return field || '';
    };
    
    let tags: string[] = [];
    try {
      const tagsField = getFieldValue(fields.tags);
      if (tagsField && typeof tagsField === 'string') {
        tags = JSON.parse(tagsField);
      }
    } catch (parseError) {
      console.error("Lỗi parse tags:", parseError);
      tags = [];
    }

    const title = getFieldValue(fields.title);
    const content = getFieldValue(fields.content);
    const slug = getFieldValue(fields.slug);
    const meta = getFieldValue(fields.meta);
    const category = getFieldValue(fields.category);
    const postId = getFieldValue((fields as any).postId);
    const isFeaturedValue = getFieldValue((fields as any).isFeatured);
    const isFeatured =
      typeof isFeaturedValue === 'string'
        ? ["true", "1", "on", "yes"].includes(isFeaturedValue.toLowerCase())
        : !!isFeaturedValue;

    await db.connectDb();

      // Xử lý FormData logic...
      // Nếu có postId, cập nhật bài viết hiện có
      if (postId) {
        const existingPost = await Post.findById(postId);
        if (!existingPost) {
          return res.status(404).json({ error: "Không tìm thấy bài viết!" });
        }

        // Kiểm tra quyền sở hữu - Admin có thể chỉnh sửa mọi bài viết
        const isAdmin = session.user.role === 'admin';
        const isOwner = existingPost.author && existingPost.author.toString() === session.user.sub;
        
        if (!isAdmin && !isOwner) {
          return res.status(403).json({ error: "Bạn không có quyền chỉnh sửa bài viết này!" });
        }

        // Cập nhật bài viết
        existingPost.title = title || existingPost.title;
        existingPost.content = content || existingPost.content;
        // Đảm bảo meta luôn có giá trị (bắt buộc trong model)
        existingPost.meta = (meta && meta.trim() !== '') ? meta : (existingPost.meta || "Nháp bài viết - Meta description sẽ được cập nhật sau");
        existingPost.tags = tags;
        existingPost.category = category || existingPost.category;
        existingPost.isDraft = true;
        // Nếu slug mới đụng trùng bài viết khác, tạo slug khác để tránh lỗi duplicate key
        if (slug && slug !== existingPost.slug) {
          existingPost.slug = await ensureUniqueSlug(slug, existingPost._id.toString());
        }
        // Cập nhật trạng thái nổi bật
        if (typeof isFeatured === 'boolean') {
          existingPost.isFeatured = isFeatured;
        }

        // Xử lý thumbnail: có thể là file mới upload hoặc URL từ gallery
        const thumbnailFile = files.thumbnail as formidable.File | undefined;
        const thumbnailUrl = getFieldValue((fields as any).thumbnail);
        
        if (thumbnailFile) {
          // File mới upload - upload lên Cloudinary
          const { secure_url: url, public_id } = await cloudinary.uploader.upload(
            thumbnailFile.filepath,
            { folder: process.env.CLOUDINARY_FOLDER || "giangnoitiet" }
          );
          existingPost.thumbnail = { url, public_id };
        } else if (thumbnailUrl && thumbnailUrl.trim()) {
          // URL từ gallery - lưu trực tiếp URL (không cần upload lại)
          existingPost.thumbnail = { url: thumbnailUrl.trim() };
        }

        await existingPost.save();
        return res.json({ post: existingPost, message: "Đã lưu nháp thành công!" });
      }

      // Nếu không có postId, kiểm tra xem đã có bài nháp nào của user này chưa
      // Tìm bài nháp gần nhất của user (có thể là bài đang chỉnh sửa)
      const existingDraft = await Post.findOne({
        author: session.user.sub,
        isDraft: true,
        $or: [
          { deletedAt: null },
          { deletedAt: { $exists: false } }
        ]
      }).sort({ updatedAt: -1 }); // Lấy bài nháp được cập nhật gần nhất

      // Nếu tìm thấy bài nháp và có thể là cùng bài (dựa trên slug hoặc title tương tự)
      if (existingDraft) {
        const slugMatch = slug && slug.trim() && existingDraft.slug === slug.trim();
        const titleMatch = title && title.trim() && 
          existingDraft.title.trim().toLowerCase() === title.trim().toLowerCase();
        
        // Nếu slug hoặc title khớp, hoặc bài nháp này chưa có slug/title rõ ràng (có thể là bài mới tạo)
        if (slugMatch || titleMatch || 
            (!existingDraft.slug || existingDraft.slug.startsWith('draft-')) ||
            (!existingDraft.title || existingDraft.title === "Nháp bài viết")) {
          // Cập nhật bài nháp hiện có
          existingDraft.title = title || existingDraft.title || "Nháp bài viết";
          existingDraft.content = content || existingDraft.content || "";
          existingDraft.meta = (meta && meta.trim() !== '') ? meta : (existingDraft.meta || "Nháp bài viết - Meta description sẽ được cập nhật sau");
          existingDraft.tags = tags;
          existingDraft.category = category || existingDraft.category || "";
          existingDraft.isDraft = true;
          
          // Cập nhật slug nếu có và khác với slug hiện tại
          if (slug && slug.trim() && slug.trim() !== existingDraft.slug) {
            existingDraft.slug = await ensureUniqueSlug(slug.trim(), existingDraft._id.toString());
          } else if (!existingDraft.slug || existingDraft.slug.startsWith('draft-')) {
            // Nếu chưa có slug hoặc là slug tự động, tạo slug mới từ title
            const newSlug = await ensureUniqueSlug(
              slug && slug.trim() ? slug.trim() : title || undefined,
              existingDraft._id.toString()
            );
            existingDraft.slug = newSlug;
          }
          
          // Cập nhật trạng thái nổi bật
          if (typeof isFeatured === 'boolean') {
            existingDraft.isFeatured = isFeatured;
          }

          // Xử lý thumbnail: có thể là file mới upload hoặc URL từ gallery
          const thumbnailFile = files.thumbnail as formidable.File | undefined;
          const thumbnailUrl = getFieldValue((fields as any).thumbnail);
          
          if (thumbnailFile) {
            // File mới upload - upload lên Cloudinary
            const { secure_url: url, public_id } = await cloudinary.uploader.upload(
              thumbnailFile.filepath,
              { folder: process.env.CLOUDINARY_FOLDER || "giangnoitiet" }
            );
            existingDraft.thumbnail = { url, public_id };
          } else if (thumbnailUrl && thumbnailUrl.trim()) {
            // URL từ gallery - lưu trực tiếp URL (không cần upload lại)
            existingDraft.thumbnail = { url: thumbnailUrl.trim() };
          }

          await existingDraft.save();
          return res.json({ post: existingDraft, message: "Đã lưu nháp thành công!" });
        }
      }

      // Tạo bài viết nháp mới (chỉ khi không tìm thấy bài nháp phù hợp)
      // Đảm bảo meta luôn có giá trị (bắt buộc trong model)
      const metaValue = meta && meta.trim() !== '' ? meta : "Nháp bài viết - Meta description sẽ được cập nhật sau";
      
      const uniqueSlug = await ensureUniqueSlug(
        slug && slug.trim() ? slug.trim() : title || undefined
      );

      const newDraft = new Post({
        title: title || "Nháp bài viết",
        content: content || "",
        slug: uniqueSlug,
        meta: metaValue,
        tags,
        category: category || "",
        author: session.user.sub,
        isDraft: true,
        isFeatured: isFeatured || false,
      });

      // Xử lý thumbnail: có thể là file mới upload hoặc URL từ gallery
      const thumbnailFile = files.thumbnail as formidable.File | undefined;
      const thumbnailUrl = getFieldValue((fields as any).thumbnail);
      
      if (thumbnailFile) {
        // File mới upload - upload lên Cloudinary
        const { secure_url: url, public_id } = await cloudinary.uploader.upload(
          thumbnailFile.filepath,
          { folder: process.env.CLOUDINARY_FOLDER || "giangnoitiet" }
        );
        newDraft.thumbnail = { url, public_id };
      } else if (thumbnailUrl && thumbnailUrl.trim()) {
        // URL từ gallery - lưu trực tiếp URL (không cần upload lại)
        newDraft.thumbnail = { url: thumbnailUrl.trim() };
      }

      await newDraft.save();
      res.json({ post: newDraft, message: "Đã tạo nháp mới!" });
  } catch (error: any) {
    console.error("Lỗi lưu nháp:", error);
    // Trả về thông báo lỗi chi tiết hơn để debug
    const errorMessage = error.message || "Lỗi máy chủ!";
    console.error("Chi tiết lỗi:", {
      message: errorMessage,
      stack: error.stack,
      code: error.code,
    });
    res.status(500).json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

const ensureUniqueSlug = async (rawSlug?: string, excludeId?: string): Promise<string> => {
  // Ưu tiên slug client gửi lên, fallback draft-{timestamp}
  const baseSlug = (rawSlug && rawSlug.trim()) ? rawSlug.trim() : `draft-${Date.now()}`;
  let candidate = baseSlug;
  let suffix = 1;

  // Nếu có excludeId (khi cập nhật), bỏ qua chính bài viết đó
  const conflictFilter = (slug: string) =>
    Post.findOne(excludeId ? { slug, _id: { $ne: excludeId } } : { slug });

  while (await conflictFilter(candidate)) {
    candidate = `${baseSlug}-${suffix++}`;
  }

  return candidate;
};

const updateDraftStatus: NextApiHandler = async (req, res) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const session = token ? { user: token } : null;

  if (!session || !session.user) {
    return res.status(401).json({ error: "Bạn cần đăng nhập!" });
  }

  try {
    const body = await parseJsonBody(req);
    const { postId, isDraft } = body;
    
    await db.connectDb();

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Không tìm thấy bài viết!" });
    }

    // Kiểm tra quyền sở hữu - Admin có thể chỉnh sửa mọi bài viết
    const isAdmin = session.user.role === 'admin';
    const isOwner = post.author && post.author.toString() === session.user.sub;
    
    if (!isAdmin && !isOwner) {
      return res.status(403).json({ error: "Bạn không có quyền chỉnh sửa bài viết này!" });
    }

    post.isDraft = isDraft;
    await post.save();

    res.json({ post, message: isDraft ? "Đã chuyển về nháp!" : "Đã xuất bản!" });
  } catch (error: any) {
    console.error("Lỗi cập nhật trạng thái:", error);
    res.status(500).json({ error: "Lỗi máy chủ!" });
  }
};



const getDrafts: NextApiHandler = async (req, res) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const session = token ? { user: token } : null;

  if (!session || !session.user) {
    return res.status(401).json({ error: "Bạn cần đăng nhập!" });
  }

  try {
    await db.connectDb();

    const drafts = await Post.find({ 
      author: session.user.sub, 
      isDraft: true 
    }).sort({ updatedAt: -1 });

    res.json({ drafts });
  } catch (error: any) {
    console.error("Lỗi lấy danh sách nháp:", error);
    res.status(500).json({ error: "Lỗi máy chủ!" });
  }
};

// Helper function để đọc file từ formidable
const readFile = async <T>(req: any): Promise<{ fields: T; files: any }> => {
  return new Promise((resolve, reject) => {
    const form = formidable();
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields: fields as T, files });
    });
  });
};

// Helper function để parse JSON body
const parseJsonBody = async (req: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk: any) => {
      data += chunk;
    });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        resolve(parsed);
      } catch (error) {
        reject(error);
      }
    });
  });
};

export default handler;
