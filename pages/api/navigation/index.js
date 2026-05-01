import { mongooseConnect } from "../../../lib/mongoose";
import NavigationMenu from "../../../models/NavigationMenu";

// Default navigation structure (seed data)
const DEFAULT_MENU = [
  { name: "Trang chủ", href: "/", order: 0, isActive: true, children: [] },
  { name: "Giới thiệu", href: "/gioi-thieu", order: 1, isActive: true, children: [] },
  {
    name: "Dịch vụ",
    href: "/dich-vu",
    order: 2,
    isActive: true,
    children: [
      { name: "Thiết kế kiến trúc", href: "/dich-vu/thiet-ke-kien-truc", order: 0, children: [] },
      { name: "Thiết kế nội thất", href: "/dich-vu/thiet-ke-noi-that", order: 1, children: [] },
      { name: "Thi công trọn gói", href: "/dich-vu/thi-cong-tron-goi", order: 2, children: [] },
      { name: "Cải tạo không gian", href: "/dich-vu/cai-tao-noi-that-chung-cu", order: 3, children: [] },
    ],
  },
  { name: "Dự án", href: "/du-an", order: 3, isActive: true, children: [] },
  { name: "Bài viết", href: "/bai-viet", order: 4, isActive: true, children: [] },
  { name: "Tuyển dụng", href: "/tuyen-dung", order: 5, isActive: true, children: [] },
  { name: "Liên hệ", href: "/lien-he", order: 6, isActive: true, children: [] },
];

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === "GET") {
    try {
      let menu = await NavigationMenu.findOne({ menuName: "main" });
      if (!menu) {
        // Create default menu on first load
        menu = await NavigationMenu.create({ menuName: "main", items: DEFAULT_MENU });
      }
      return res.status(200).json({ success: true, items: menu.items });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  if (req.method === "PUT") {
    try {
      const { items } = req.body;
      if (!Array.isArray(items)) {
        return res.status(400).json({ success: false, message: "items phải là mảng" });
      }
      const menu = await NavigationMenu.findOneAndUpdate(
        { menuName: "main" },
        { items },
        { new: true, upsert: true }
      );
      return res.status(200).json({ success: true, items: menu.items });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
