import mongoose, { Schema } from "mongoose";
import { IPayment } from "../api/payment/types/payment.type";

const paymentSchema = new Schema<IPayment>({
   orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
   userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
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