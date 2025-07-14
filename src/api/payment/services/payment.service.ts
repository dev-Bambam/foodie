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

   async createPayment(payment: paymenttype.TPaymentInput): Promise<paymenttype.TPayment> {
      const newPayment = await this.PaymentRepo.createPayment(payment);
      const { amount, userId } = newPayment;
      const user = await this.UserRepo.findById(userId)
      const userEmail = user?.email
      const initPayment = await this.PaymentGateway.initializePayment(amount, userEmail!);
      return newPayment;
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
