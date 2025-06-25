import mongoose, { Document } from "mongoose";

export interface IOrder extends Document {
   userId: mongoose.Types.ObjectId;
   items: Array<{
      menuId: mongoose.Types.ObjectId;
      quantity: number;
      price: number;
   }>;
   totalPrice: number;
   status: "pending" | "confirmed" | "delivered" | "cancelled";
   deliveryAddress: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
   };
   createdAt: Date;
   updatedAt: Date;
}
