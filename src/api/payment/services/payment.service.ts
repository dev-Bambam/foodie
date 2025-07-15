import { NotFoundError } from "../../../Utils/Error/CustomError";
import * as paymenttype from "../types/payment.type";
import { injectable, inject } from "tsyringe";
import { UserRepository } from "../../user/repositories/user.repo";

@injectable()
class PaymentService implements paymenttype.IPaymentService {
   constructor(
      @inject("IPaymentRepo") private PaymentRepo: paymenttype.IPaymentRepo,
      @inject("IPaymentGateway") private PaymentGateway: paymenttype.IPaymentGateway,
      @inject("IUserRepository") private UserRepo: UserRepository
   ) {}

   async createPayment<T extends keyof paymenttype.TPaymentGatewayResData["authorization_url"]>(
      payment: paymenttype.TPaymentInput
   ): Promise<T> {
      const newPayment = await this.PaymentRepo.createPayment(payment);
      const { id, amount, userId } = newPayment;
      const user = await this.UserRepo.findById(userId);
      const userEmail = user?.email;
      const paymentGatewayRes = await this.PaymentGateway.initializePayment(amount, userEmail!);
      await this.PaymentRepo.updatePayment(id, {
         paymentGatewayResponse: paymentGatewayRes
      });

      const authorization_url = paymentGatewayRes.data.authorization_url as T
      return authorization_url
   }

   async confirmPayment(paymentId: string): Promise<paymenttype.TPayment> {
      const payment = await this.PaymentRepo.fetchAPayment(paymentId)
      const reference = payment?.paymentGatewayResponse?.data.reference
      const verifyPayment = await this.PaymentGateway.verifyPayment(reference!)
      const paymentUpdate = await this.PaymentRepo.updatePayment(paymentId, {
         paymentGatewayResponse: verifyPayment
      })

      return paymentUpdate
   }

   async fetchAPayment(paymentId: string): Promise<paymenttype.TPayment> {
      const payment = await this.PaymentRepo.fetchAPayment(paymentId);
      if (!payment) {
         throw new NotFoundError("payment not found");
      }
      return payment;
   }

   async fetchAllPayment<T extends keyof paymenttype.TPayment["status"]>(
      status?: T
   ): Promise<paymenttype.TPayment[]> {
      const allPayment = await this.PaymentRepo.fetchAllPayment(status);
      return allPayment;
   }

   async deletePayment(paymentId: string): Promise<void> {
      return await this.PaymentRepo.deletePayment(paymentId);
   }

   async updatePayment(
      paymentId: string,
      paymentUpdate: paymenttype.TUpdatePayment
   ): Promise<paymenttype.TPayment> {
      const updatedPayment = await this.PaymentRepo.updatePayment(paymentId, paymentUpdate);

      return updatedPayment;
   }
}
