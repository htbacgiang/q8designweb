import { FinalPost } from "../components/editor";
import { PostDetail } from "./types";

export const generateFormData = (post: FinalPost) => {
  const formData = new FormData();
  for (let key in post) {
    const value = (post as any)[key];
    
    // Bỏ qua các giá trị undefined hoặc null
    if (value === undefined || value === null) continue;
    
    if (key === "tags") {
      if (typeof value === "string" && value.trim()) {
        const tags = value.split(",").map((tag: string) => tag.trim());
        formData.append("tags", JSON.stringify(tags));
      }
    } else if (key === "thumbnail") {
      // Xử lý thumbnail: có thể là File hoặc string (URL từ gallery)
      if (value instanceof File) {
        // File mới upload - append như file
        formData.append("thumbnail", value);
      } else if (typeof value === "string" && value.trim()) {
        // URL từ gallery - append như string vào body
        formData.append("thumbnail", value.trim());
      }
    } else if (key === "category") {
      // Đảm bảo category luôn được gửi lên (trim để đảm bảo format đúng)
      if (typeof value === "string") {
        formData.append("category", value.trim());
      } else {
        formData.append("category", value);
      }
    } else {
      // Các field khác
      formData.append(key, value);
    }
  }

  return formData;
};

export const filterPosts = (posts: PostDetail[], postToFilter: PostDetail) => {
  return posts.filter((post) => {
    return post.id !== postToFilter.id;
  });
};

export const trimText = (text: string, trimBy: number) => {
  if (text.length <= trimBy) return text;
  return text.substring(0, trimBy).trim() + "...";
};
