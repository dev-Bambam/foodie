"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookHandler = void 0;
const tsyringe_1 = require("tsyringe");
const PaymentService = tsyringe_1.container.resolve("IPaymentService");
const webhookHandler = async (req, res) => {
    const signature = req.headers['x-paystacl-signature'];
    await PaymentService.handlePaymentWebhook({ body: req.body, headers: req.headers }, signature);
    res.status(200).json({
        status: "success",
        data: 'working'
    });
};
exports.webhookHandler = webhookHandler;
