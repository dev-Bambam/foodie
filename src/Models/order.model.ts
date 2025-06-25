import mongoose, { Schema } from "mongoose";
import { IOrder } from "../api/order/types/order.type";
const orderSchema = new Schema<IOrder>(
   {
      userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      items: [
         {
            menuId: { type: Schema.Types.ObjectId, ref: "Menu", required: true },
            quantity: { type: Number, required: true, min: 1 },
            price: { type: Number, required: true, min: 0 },
         },
      ],
      totalPrice: { type: Number, required: true, min: 0 },
      status: {
         type: String,
         enum: ["pending", "confirmed", "delivered", "cancelled"],
         default: "pending",
      },
      deliveryAddress: {
         street: { type: String, required: true },
         city: { type: String, required: true },
         state: { type: String, required: true },
      },
   },
   { timestamps: true }
);

// Update updatedAt on save
orderSchema.pre("save", function (next) {
   this.updatedAt = new Date();
   next();
});
