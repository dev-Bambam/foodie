import mongoose, { Document } from "mongoose";

export interface IPayment extends Document {
   orderId: mongoose.Types.ObjectId;
   userId: mongoose.Types.ObjectId;
   amount: number;
   status: "pending" | "completed" | "failed";
   paymentMethod: "card" | "cash";
   transactionId?: string;
   createdAt: Date;
}
