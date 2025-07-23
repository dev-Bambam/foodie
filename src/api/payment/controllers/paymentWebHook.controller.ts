import { Request, Response } from "express";
import { IPaymentService } from "../types/payment.type";
import { container } from "tsyringe";

const PaymentService = container.resolve<IPaymentService>("IPaymentService")

export const webhookHandler = async (req: Request, res: Response) => {
    const signature = req.headers['x-paystack-signature'] as string
    
    await PaymentService.handlePaymentWebhook({ body: req.body, headers: req.headers }, signature)
    
    res.status(200).json({
        status: "success",
        data: 'working'
    })
}