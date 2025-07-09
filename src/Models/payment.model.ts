import mongoose, { Schema } from "mongoose";
import { TPayment } from "../api/payment/types/payment.type";

const paymentSchema = new Schema<TPayment>({
   orderId: { type: String, ref: "Order", required: true },
   userEmail: { type: String, ref: "User", required: true },
   amount: { type: Number, required: true, min: 0 },
   status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
   },
   paymentMethod: { type: String, enum: ["card", "cash"], required: true },
   transactionId: { type: String },
   createdAt: { type: Date, default: Date.now },
});
  
const Payment = mongoose.model('Payment', paymentSchema)

export default Payment