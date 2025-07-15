import axios from "axios";
import * as paymenttype from "../types/payment.type";
import { injectable } from "tsyringe";

@injectable()
export class PaystackService implements paymenttype.IPaymentGateway {
   private secretKey = process.env.PAYSTACK_TEST_KEY!;
   private baseUrl = "https://api.paystack.co";

   async initializePayment(amount: number, email: string, metadata?: any): Promise<paymenttype.TPaymentGatewayResponse> {
      const response = await axios.post(
         `${this.baseUrl}/transactions/initialize`,
         {
            email,
            amount: amount * 100,
            callback_url: `${process.env.PORT}/payment-success?transactionId=${metadata}`,
            metadata: {
               transactionId: metadata
            }
         },
         {
            headers: {
               Authorization: `Bearer ${this.secretKey}`,
               "Content-Type": "application/json",
            },
         }
      );
      return response.data;
   }

   async verifyPayment(reference: string): Promise<paymenttype.TPaymentGatewayResponse> {
      const response = await axios.get(`${this.baseUrl}/transaction/verify/${reference}`, {
         headers: {
            Authorization: `Bearer ${this.secretKey}`,
         },
      });
      return response.data;
   }
}
