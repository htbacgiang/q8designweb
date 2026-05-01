import { mongooseConnect } from "../../../../lib/mongoose";
import NavigationPreset from "../../../../models/NavigationPreset";
import NavigationMenu from "../../../../models/NavigationMenu";

export default async function handler(req, res) {
  await mongooseConnect();

  // GET — list all presets
  if (req.method === "GET") {
    try {
      const presets = await NavigationPreset.find({}).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, presets });
    } catch (e) {
      return res.status(500).json({ success: false, message: e.message });
    }
  }

  // POST — create new preset from current items
  if (req.method === "POST") {
    try {
      const { name, description, items } = req.body;
      if (!name?.trim()) {
        return res.status(400).json({ success: false, message: "Tên preset không được trống" });
      }
      const preset = await NavigationPreset.create({
        name: name.trim(),
        description: description?.trim() || "",
        items: items || [],
        isDefault: false,
      });
      return res.status(201).json({ success: true, preset });
    } catch (e) {
      if (e.code === 11000) {
        return res.status(400).json({ success: false, message: "Tên preset đã tồn tại" });
      }
      return res.status(500).json({ success: false, message: e.message });
    }
  }

  // PUT — update preset name/description/items  OR  set as default (apply to nav)
  if (req.method === "PUT") {
    try {
      const { id, name, description, items, setAsDefault } = req.body;
      if (!id) return res.status(400).json({ success: false, message: "Thiếu id" });

      const preset = await NavigationPreset.findById(id);
      if (!preset) return res.status(404).json({ success: false, message: "Không tìm thấy preset" });

      if (name !== undefined) preset.name = name.trim();
      if (description !== undefined) preset.description = description.trim();
      if (items !== undefined) preset.items = items;

      // Set làm mặc định: áp dụng menu preset này vào navigation chính
      if (setAsDefault) {
        await NavigationPreset.updateMany({}, { isDefault: false });
        preset.isDefault = true;

        // Cập nhật NavigationMenu "main"
        await NavigationMenu.findOneAndUpdate(
          { menuName: "main" },
          { items: preset.items },
          { new: true, upsert: true }
        );

        // Xóa cache localStorage phía client sẽ tự làm (TTL hết hạn)
      }

      await preset.save();
      return res.status(200).json({ success: true, preset });
    } catch (e) {
      return res.status(500).json({ success: false, message: e.message });
    }
  }

  // DELETE — delete preset by id
  if (req.method === "DELETE") {
    try {
      const { id } = req.body;
      if (!id) return res.status(400).json({ success: false, message: "Thiếu id" });
      await NavigationPreset.findByIdAndDelete(id);
      return res.status(200).json({ success: true });
    } catch (e) {
      return res.status(500).json({ success: false, message: e.message });
    }
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
