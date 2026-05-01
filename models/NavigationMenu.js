import mongoose from "mongoose";

// Sub-item schema (level 3)
const Level3ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  href: { type: String, required: true },
  order: { type: Number, default: 0 },
});

// Child item schema (level 2)
const Level2ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  href: { type: String, required: true },
  order: { type: Number, default: 0 },
  children: [Level3ItemSchema],
});

// Top-level navigation item schema (level 1)
const NavigationItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  href: { type: String, required: true },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  children: [Level2ItemSchema],
});

// Navigation config schema
const NavigationMenuSchema = new mongoose.Schema(
  {
    menuName: { type: String, default: "main" },
    items: [NavigationItemSchema],
  },
  { timestamps: true }
);

const NavigationMenu =
  mongoose.models.NavigationMenu ||
  mongoose.model("NavigationMenu", NavigationMenuSchema);

export default NavigationMenu;
