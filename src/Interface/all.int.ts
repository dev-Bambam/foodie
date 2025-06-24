import mongoose, { Document } from "mongoose";

//User Interface
export interface IUser extends Document {
   name: string;
   email: string;
   password: string;
   role: "customer" | "admin";
   phone?: string;
   address?: {
      street: string;
      city: string;
      state: string;
   };
   createdAt: Date;
}

// Menu Interface
export interface IMenu extends Document {
   name: string;
   description: string;
   price: number;
   category: string;
   imageUrl?: string;
   isAvailable: boolean;
   createdAt: Date;
}

// Order Interface
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

// Payment Interface
export interface IPayment extends Document {
    orderId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    amount: number;
    status: 'pending' | 'completed' | 'failed';
    paymentMethod: 'card' | 'cash';
    transactionId?: string;
    createdAt: Date;
  }
  