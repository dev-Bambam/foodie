"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRepo = void 0;
const payment_model_1 = __importDefault(require("../../../Models/payment.model"));
class PaymentRepo {
    async createPayment(payment) {
        const { id, orderId, amount, userId, status, paymentMethod, createdAt } = await payment_model_1.default.create(payment);
        return {
            id,
            orderId,
            amount,
            userId,
            status,
            paymentMethod,
            createdAt,
        };
    }
    async fetchAPayment(paymentId) {
        const payment = await payment_model_1.default.findById(paymentId);
        return payment;
    }
    async fetchAllPayment(status) {
        let allPayment;
        if (status) {
            allPayment = await payment_model_1.default.find({ status });
            return allPayment;
        }
        allPayment = await payment_model_1.default.find();
        return allPayment;
    }
    async deletePayment(paymentId) {
        await payment_model_1.default.deleteOne({ _id: paymentId });
    }
    async updatePayment(paymentId, paymentUpdate) {
        const updatedPayment = await payment_model_1.default.findOneAndUpdate({ _id: paymentId }, paymentUpdate, { new: true });
        return updatedPayment;
    }
    async fetchAPaymentByOrderID(orderId) {
        const payment = await payment_model_1.default.findOne({ orderId: orderId });
        if (!payment) {
            console.log(`payment for orderId:${orderId} not found`);
        }
        return payment;
    }
    async fetchAPaymentByReference(reference) {
        const payment = await payment_model_1.default.findOne({
            'paymentGatewayResponse.data.reference': reference
        });
        return payment;
    }
    async savePayment(paymentId) {
        const payment = await payment_model_1.default.findById(paymentId);
        await payment?.save();
        return payment;
    }
}
exports.PaymentRepo = PaymentRepo;
