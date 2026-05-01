import mongoose from "mongoose";

const NavigationPresetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },  // Tên preset
    description: { type: String, default: "" },            // Mô tả ngắn
    items: { type: mongoose.Schema.Types.Mixed, default: [] }, // Toàn bộ cây menu
    isDefault: { type: Boolean, default: false },          // Chỉ 1 preset là mặc định
  },
  { timestamps: true }
);

const NavigationPreset =
  mongoose.models.NavigationPreset ||
  mongoose.model("NavigationPreset", NavigationPresetSchema);

export default NavigationPreset;
