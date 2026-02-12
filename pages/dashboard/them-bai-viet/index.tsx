import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import Editor, { FinalPost } from "../../../components/editor";
import AdminLayout from "../../../components/layout/AdminLayout";
import { generateFormData } from "../../../utils/helper";
interface Props {}

const Create: NextPage<Props> = () => {
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  const handleSubmit = async (post: FinalPost) => {
    setCreating(true);
    try {
      // Nếu đã có post.id (bài viết nháp đã được tạo từ auto-save), cập nhật bài viết đó thành published
      if (post.id) {
        // Set isDraft: false để publish bài viết
        const postToSubmit = { ...post, isDraft: false };
        const formData = generateFormData(postToSubmit);
        
        // Cập nhật bài viết nháp thành published
        const { data } = await axios.patch(`/api/posts/${post.id}`, formData);
        toast.success("Bài viết đã được đăng thành công!");
        router.push("/dashboard/bai-viet/update/" + data.post.slug);
      } else {
        // Nếu chưa có post.id, tạo bài viết mới (mặc định không phải nháp)
        const postToSubmit = { ...post, isDraft: false };
        const formData = generateFormData(postToSubmit);
        
        const { data } = await axios.post("/api/posts", formData);
        toast.success("Bài viết mới đã được tạo thành công!");
        router.push("/dashboard/bai-viet/update/" + data.post.slug);
      }
    } catch (error: any) {
      console.log(error.response?.data || error);
      toast.error("Có lỗi xảy ra khi đăng bài viết!");
    }
    setCreating(false);
  };
  return (
    <AdminLayout title="Thêm bài viết mới">
      <div className="add-post-container">
        <div className="add-post-content">
          <Editor onSubmit={handleSubmit} busy={creating} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Create;
