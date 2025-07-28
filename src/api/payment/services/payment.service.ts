import { NotFoundError } from "../../../Utils/Error/CustomError";
import * as paymenttype from "../types/payment.type";
import { injectable, inject } from "tsyringe";
import { UserRepository } from "../../user/repositories/user.repo";
import crypto from "node:crypto";

/**
 * Service class for handling payment-related operations, including creation, confirmation,
 * retrieval, updating, deletion, webhook processing, and integration with payment gateways.
 * Implements the IPaymentService interface and uses dependency injection for repositories and gateways.
 */
@injectable()
export class PaymentService implements paymenttype.IPaymentService {
   constructor(
      @inject("IPaymentRepo") private PaymentRepo: paymenttype.IPaymentRepo,
      @inject("IPaymentGateway") private PaymentGateway: paymenttype.IPaymentGateway,
      @inject("IUserRepository") private UserRepo: UserRepository
   ) {}

   /**
    * Creates a new payment and initializes it with the payment gateway.
    * @param payment - The payment input data.
    * @returns The authorization URL from the payment gateway.
    */
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

   /**
    * Confirms a payment by verifying it with the payment gateway and updating its status.
    * @param reference - The payment reference to verify.
    * @returns The updated payment object.
    */
   async confirmPayment(reference: string): Promise<paymenttype.TPayment> {
      const payment = await this.PaymentRepo.fetchAPaymentByReference(reference);
      console.log(`payment:${JSON.stringify(payment)}`);
      console.log(`reference coming from payment.service.ts:${reference}`);
      const verifyPayment = await this.PaymentGateway.verifyPayment(reference!);
      const paymentUpdate = await this.PaymentRepo.updatePayment(payment!.id, {
         paymentGatewayResponse: verifyPayment,
      });

      return paymentUpdate;
   }

   /**
    * Fetches a single payment by its ID.
    * @param paymentId - The ID of the payment to fetch.
    * @throws NotFoundError if the payment is not found.
    * @returns The payment object.
    */
   async fetchAPayment(paymentId: string): Promise<paymenttype.TPayment> {
      const payment = await this.PaymentRepo.fetchAPayment(paymentId);
      if (!payment) {
         throw new NotFoundError("payment not found");
      }
      return payment;
   }

   /**
    * Fetches all payments, optionally filtered by status.
    * @param status - Optional payment status to filter by.
    * @returns An array of payment objects.
    */
   async fetchAllPayment<T extends paymenttype.TPayment["status"]>(
      status?: T
   ): Promise<paymenttype.TPayment[]> {
      const allPayment = await this.PaymentRepo.fetchAllPayment(status);
      return allPayment;
   }

   /**
    * Deletes a payment by its ID.
    * @param paymentId - The ID of the payment to delete.
    * @returns A promise that resolves when the payment is deleted.
    */
   async deletePayment(paymentId: string): Promise<void> {
      return await this.PaymentRepo.deletePayment(paymentId);
   }

   /**
    * Updates a payment with new data.
    * @param paymentId - The ID of the payment to update.
    * @param paymentUpdate - The update data for the payment.
    * @returns The updated payment object.
    */
   async updatePayment(
      paymentId: string,
      paymentUpdate: paymenttype.TUpdatePayment
   ): Promise<paymenttype.TPayment> {
      const updatedPayment = await this.PaymentRepo.updatePayment(paymentId, paymentUpdate);

      return updatedPayment;
   }

   /**
    * Generates a HMAC hash for webhook payload verification.
    * @param payload - The webhook payload as a string.
    * @returns The generated hash string.
    */
   public generateWebhookHash(payload: string): string {
      const secretKey = process.env.PAYSTACK_TEST_KEY!;
      return crypto.createHmac("sha512", secretKey).update(payload).digest("hex");
   }

   /**
    * Processes a charge webhook event and updates the payment status accordingly.
    * @param data - The webhook data payload.
    * @param update - The update object containing status and message.
    * @returns A promise that resolves when processing is complete.
    */
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

   /**
    * Handles incoming payment webhooks, verifies signature, and processes events.
    * @param payload - The webhook payload.
    * @param signature - The signature to verify the webhook.
    * @throws Error if the signature is invalid or the event is unhandled.
    * @returns A promise that resolves when the webhook is handled.
    */
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

   /**
    * Saves a payment by its ID.
    * @param paymentId - The ID of the payment to save.
    * @returns The saved payment object.
    */
   async savePayment(paymentId: string): Promise<paymenttype.TPayment> {
      const payment = await this.PaymentRepo.savePayment(paymentId);
      return payment;
   }
}
