"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentWebHook_controller_1 = require("../api/payment/controllers/paymentWebHook.controller");
const webhookRouter = (0, express_1.Router)();
webhookRouter.post('/paystack', paymentWebHook_controller_1.webhookHandler);
exports.default = webhookRouter;
