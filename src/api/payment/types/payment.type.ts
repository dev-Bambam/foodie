import mongoose, { Document, Types } from "mongoose";

export interface IPayment extends Document {
   id: Types.ObjectId
   orderId: mongoose.Types.ObjectId;
   userId: mongoose.Types.ObjectId;
   amount: number;
   status: "pending" | "completed" | "failed";
   paymentMethod: "card" | "cash";
   transactionId?: string;
   createdAt: Date;
}

export interface IPaymentService{
   initializePayment(amount: number, email: string, metadata?: any): Promise<any>
   verifyPayment(reference:string): Promise<any>
}
