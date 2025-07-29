"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaystackService = void 0;
const axios_1 = __importDefault(require("axios"));
const tsyringe_1 = require("tsyringe");
let PaystackService = class PaystackService {
    constructor() {
        this.secretKey = process.env.PAYSTACK_TEST_KEY;
        this.baseUrl = "https://api.paystack.co";
    }
    async initializePayment(amount, email, metadata) {
        const response = await axios_1.default.post(`${this.baseUrl}/transaction/initialize`, {
            email,
            amount: amount * 100,
            // callback_url: `${process.env.PORT}/confirm-payment?orderId=${metadata}`,
            metadata: {
                orderId: metadata
            }
        }, {
            headers: {
                Authorization: `Bearer ${this.secretKey}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    }
    async verifyPayment(reference) {
        const response = await axios_1.default.get(`${this.baseUrl}/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${this.secretKey}`,
            },
        });
        return response.data;
    }
};
exports.PaystackService = PaystackService;
exports.PaystackService = PaystackService = __decorate([
    (0, tsyringe_1.injectable)()
], PaystackService);
