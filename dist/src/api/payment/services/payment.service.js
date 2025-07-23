"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const CustomError_1 = require("../../../Utils/Error/CustomError");
const paymenttype = __importStar(require("../types/payment.type"));
const tsyringe_1 = require("tsyringe");
const user_repo_1 = require("../../user/repositories/user.repo");
const node_crypto_1 = __importDefault(require("node:crypto"));
let PaymentService = class PaymentService {
    constructor(PaymentRepo, PaymentGateway, UserRepo) {
        this.PaymentRepo = PaymentRepo;
        this.PaymentGateway = PaymentGateway;
        this.UserRepo = UserRepo;
    }
    async createPayment(payment) {
        const newPayment = await this.PaymentRepo.createPayment(payment);
        const { id, amount, userId, orderId } = newPayment;
        const user = await this.UserRepo.findById(userId);
        const userEmail = user?.email;
        const paymentGatewayRes = await this.PaymentGateway.initializePayment(amount, userEmail, orderId);
        await this.PaymentRepo.updatePayment(id, {
            paymentGatewayResponse: paymentGatewayRes,
        });
        const authorization_url = paymentGatewayRes.data.authorization_url;
        return authorization_url;
    }
    async confirmPayment(paymentId) {
        const payment = await this.PaymentRepo.fetchAPayment(paymentId);
        const reference = payment?.paymentGatewayResponse?.data.reference;
        const verifyPayment = await this.PaymentGateway.verifyPayment(reference);
        const paymentUpdate = await this.PaymentRepo.updatePayment(paymentId, {
            paymentGatewayResponse: verifyPayment,
        });
        return paymentUpdate;
    }
    async fetchAPayment(paymentId) {
        const payment = await this.PaymentRepo.fetchAPayment(paymentId);
        if (!payment) {
            throw new CustomError_1.NotFoundError("payment not found");
        }
        return payment;
    }
    async fetchAllPayment(status) {
        const allPayment = await this.PaymentRepo.fetchAllPayment(status);
        return allPayment;
    }
    async deletePayment(paymentId) {
        return await this.PaymentRepo.deletePayment(paymentId);
    }
    async updatePayment(paymentId, paymentUpdate) {
        const updatedPayment = await this.PaymentRepo.updatePayment(paymentId, paymentUpdate);
        return updatedPayment;
    }
    generateWebhookHash(payload) {
        const secretKey = process.env.PAYSTACK_TEST_KEY;
        return node_crypto_1.default.createHmac("sha512", secretKey).update(payload).digest("hex");
    }
    async processChargeWebhook(data, update) {
        const { metadata } = data;
        if (metadata && metadata.orderId) {
            const payment = await this.PaymentRepo.fetchAPaymentByOrderID(metadata.orderId);
            if (payment && payment.status !== "successful") {
                await this.PaymentRepo.updatePayment(payment.id, {
                    status: update.status1,
                    paymentGatewayResponse: {
                        status: update.status2,
                        message: update.message,
                        data,
                    },
                });
            }
        }
    }
    async handlePaymentWebhook(payload, signature) {
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
        }
        else {
            throw new Error("Invlaid paystack webhook signature");
        }
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IPaymentRepo")),
    __param(1, (0, tsyringe_1.inject)("IPaymentGateway")),
    __param(2, (0, tsyringe_1.inject)("IUserRepository")),
    __metadata("design:paramtypes", [Object, Object, user_repo_1.UserRepository])
], PaymentService);
