import axios from "axios";
import { IPaymentService } from "../types/payment.type";

export class PaystackService implements IPaymentService{
    private secretKey = process.env.PAYSTACK_SECRET_KEY!
    private baseUrl = 'https://api.paystack.co'

    async initializePayment(amount: number, email: string, metadata?: any): Promise<any> {
        const response = await axios.post(
            `${this.baseUrl}/transactions/initialize`,
            {
                amount: amount * 100,
                email,
                metadata
            },
            {
                headers: {
                    Authorization: `Bearer ${this.secretKey}`,
                    'Content-Type': 'application/json'
                },
            }
        );
        return response
    }

    async verifyPayment(reference: string): Promise<any> {
        const response = await axios.get(
            `${this.baseUrl}/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${this.secretKey}`
                }
            }
        )
        return response.data
    }
}