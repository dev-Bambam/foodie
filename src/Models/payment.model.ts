import mongoose, { Schema } from "mongoose";
import { TPayment } from "../api/payment/types/payment.type";

const paymentSchema = new Schema<TPayment>({
   orderId: { type: String, ref: "Order", required: true },
   userId: { type: String, ref: "User", required: true },
   amount: { type: Number, required: true, min: 0 },
   status: {
      type: String,
      enum: ["pending", "successful", "failed"],
      default: "pending",
   },
   paymentMethod: { type: String, enum: ["bank transfer", "cash"], required: true },
   paymentGatewayResponse: { type: Object },
   createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
