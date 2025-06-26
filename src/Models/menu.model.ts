import mongoose, { Schema } from "mongoose";
import { IMenuItem } from "../api/menu/types/menu.type";

const menuSchema = new Schema<IMenuItem>(
   {
      name: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true, min: 0 },
      category: { type: String, required: true },
      imageUrl: { type: String },
      isAvailable: { type: Boolean, default: true },
   },
   {
      timestamps: true,
   }
);

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;
