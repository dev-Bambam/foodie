import * as paymenttype from "../types/payment.type";
import Payment from "../../../Models/payment.model";

export class PaymentRepo implements paymenttype.IPaymentRepo {
   async createPayment(payment: paymenttype.TPayment): Promise<paymenttype.TPayment> {
      const { id, orderId, amount, userId, status, paymentMethod, createdAt } = await Payment.create(payment); 

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

   async fetchAPayment(paymentId: string): Promise<paymenttype.TPayment | null> {
      const payment = await Payment.findById(paymentId);

      return payment
   }

   async fetchAllPayment<T extends  paymenttype.TPayment["status"]>(status?: T): Promise<paymenttype.TPayment[]> {
      let allPayment;
      if (status) {
         allPayment = await Payment.find({ status })
         return allPayment
      }
      allPayment = await Payment.find()

      return allPayment
   }

   async deletePayment(paymentId: string): Promise<void> {
       await Payment.deleteOne({id: paymentId})
   }

   async updatePayment(paymentId: string, paymentUpdate: paymenttype.TUpdatePayment): Promise<paymenttype.TPayment> {
      const updatedPayment = await Payment.findOneAndUpdate(
         { id: paymentId },
         paymentUpdate,
         { new: true }
      );
      return updatedPayment as paymenttype.TPayment;
   }

   async fetchAPaymentByOrderID(orderId: string): Promise<paymenttype.TPayment | null> {
      const payment = await Payment.findOne({ orderId })
      
      return payment 
   }
}
