import { NotFoundError } from "../../../Utils/Error/CustomError";
import * as paymenttype from "../types/payment.type";
import { injectable, inject } from "tsyringe";
import { UserRepository } from "../../user/repositories/user.repo";
import crypto from "node:crypto";

@injectable()
export class PaymentService implements paymenttype.IPaymentService {
   constructor(
      @inject("IPaymentRepo") private PaymentRepo: paymenttype.IPaymentRepo,
      @inject("IPaymentGateway") private PaymentGateway: paymenttype.IPaymentGateway,
      @inject("IUserRepository") private UserRepo: UserRepository
   ) {}

   async createPayment(payment: paymenttype.TPaymentInput): Promise<string> {
      const newPayment = await this.PaymentRepo.createPayment(payment);
      const { id, amount, userId, orderId } = newPayment;
      const user = await this.UserRepo.findById(userId);
      const userEmail = user?.email;
      const paymentGatewayRes = await this.PaymentGateway.initializePayment(
         amount,
         userEmail!,
         orderId
      );

      const updated = await this.PaymentRepo.updatePayment(id, {
         paymentGatewayResponse: paymentGatewayRes,
      });

      console.log(JSON.stringify(updated));
      // console.log(JSON.stringify(id), newPayment.id);
      const authorization_url = paymentGatewayRes.data.authorization_url;
      return authorization_url;
   }

   async confirmPayment(reference: string): Promise<paymenttype.TPayment> {
      const payment = await this.PaymentRepo.fetchAPaymentByReference(reference);
      console.log(`payment:${JSON.stringify(payment)}`)
      console.log(`reference coming from payment.service.ts:${reference}`);
      const verifyPayment = await this.PaymentGateway.verifyPayment(reference!);
      const paymentUpdate = await this.PaymentRepo.updatePayment(payment!.id, {
         paymentGatewayResponse: verifyPayment,
      });

      return paymentUpdate;
   }

   async fetchAPayment(paymentId: string): Promise<paymenttype.TPayment> {
      const payment = await this.PaymentRepo.fetchAPayment(paymentId);
      if (!payment) {
         throw new NotFoundError("payment not found");
      }
      return payment;
   }

   async fetchAllPayment<T extends paymenttype.TPayment["status"]>(
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

   public generateWebhookHash(payload: string): string {
      const secretKey = process.env.PAYSTACK_TEST_KEY!;
      return crypto.createHmac("sha512", secretKey).update(payload).digest("hex");
   }

   async processChargeWebhook(data: any, update: paymenttype.update): Promise<void> {
      const { metadata } = data;

      if (metadata && metadata.orderId) {
         const payment = await this.PaymentRepo.fetchAPaymentByOrderID(metadata.orderId);
         if (payment && payment.status !== "successful") {
            await this.PaymentRepo.updatePayment(payment.id, {
               status: update.status1 as "successful",
               paymentGatewayResponse: {
                  status: update.status2,
                  message: update.message,
                  data,
               },
            });
         }
      }
   }

   async handlePaymentWebhook(payload: any, signature: string): Promise<void> {
      const expectedHash = this.generateWebhookHash(JSON.stringify(payload.body));
      if (signature && expectedHash === signature) {
         const event = payload.body.event;
         const data = payload.body.data;

         switch (event) {
            case "charge.success":
               let update = {
                  status1: "successful",
                  status2: true,
                  message: "Payment successful through webhook",
               };
               await this.processChargeWebhook(data, update);
               break;
            case "charge.fail":
               update = {
                  status1: "failed",
                  status2: false,
                  message: "Payment failure through webhook",
               };
               await this.processChargeWebhook(data, update);
            default:
               throw new Error("Unhandle paystack webhook coming from handlePaymentWebhook");
               break;
         }
      } else {
         throw new Error("Invlaid paystack webhook signature");
      }
   }

   async savePayment(paymentId: string): Promise<paymenttype.TPayment> {
      const payment = await this.PaymentRepo.savePayment(paymentId)
      return payment
   }
}