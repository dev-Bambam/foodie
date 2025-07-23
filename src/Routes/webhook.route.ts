import { Router } from "express";
import { webhookHandler } from "../api/payment/controllers/paymentWebHook.controller";

const webhookRouter = Router()

webhookRouter.post('/paystack', webhookHandler)

export default webhookRouter