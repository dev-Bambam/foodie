import mongoose, { Schema } from 'mongoose'
import { IMenu } from '../api/menu/types/menu.type'

const menuSchema = new Schema<IMenu>({
   name: { type: String, required: true },
   description: { type: String, required: true },
   price: { type: Number, required: true, min: 0 },
   category: { type: String, required: true },
   imageUrl: { type: String },
   isAvailable: { type: Boolean, default: true },
   createdAt: { type: Date, default: Date.now },
});

const Menu = mongoose.model('Menu', menuSchema)

export default Menu