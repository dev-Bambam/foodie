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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const usertype = __importStar(require("../types/user.types"));
const menutype = __importStar(require("../../menu/types/menu.type"));
const ordertype = __importStar(require("../../order/types/order.type"));
const paymenttype = __importStar(require("../../payment/types/payment.type"));
const tsyringe_1 = require("tsyringe");
/**
 * Service class for admin-related business logic (admin registration, user management, etc.).
 * Handles all admin domain operations and interacts with repositories.
 */
let AdminService = class AdminService {
    constructor(MenuService, OrderService, UserRepo, AuthService, PaymentService) {
        this.MenuService = MenuService;
        this.OrderService = OrderService;
        this.UserRepo = UserRepo;
        this.AuthService = AuthService;
        this.PaymentService = PaymentService;
    }
    // Authentication
    async login(input) {
        const user = await this.AuthService.login(input);
        return user;
    }
    // CRUD Order
    async fetchAllOrder(status) {
        return await this.OrderService.fetchAllOrder(status);
    }
    async updateOrder(orderId, orderData) {
        return await this.OrderService.updateOrder(orderId, orderData);
    }
    // CRUD on Menu
    async createMenu(menuInput) {
        return await this.MenuService.createMenu(menuInput);
    }
    async updateMenu(menuId, menuInput) {
        return await this.MenuService.updateMenu(menuId, menuInput);
    }
    async deleteMenu(menuId) {
        return await this.MenuService.deleteMenu(menuId);
    }
    // CRUD on Payment
    async confirmPayment(paymentId) {
        const payment = await this.PaymentService.confirmPayment(paymentId);
        return payment;
    }
    async fetchAPayment(paymentId) {
        const payment = await this.PaymentService.fetchAPayment(paymentId);
        return payment;
    }
    async fetchAllPayment(status) {
        const allPayment = await this.PaymentService.fetchAllPayment(status);
        return allPayment;
    }
    // CRUD on Customer/ User
    async getAllCustomers() {
        const allCustomer = await this.UserRepo.fetchAllCustomer();
        return allCustomer;
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IMenuService")),
    __param(1, (0, tsyringe_1.inject)("IOrderService")),
    __param(2, (0, tsyringe_1.inject)("IUserRepository")),
    __param(3, (0, tsyringe_1.inject)("IAuthService")),
    __param(4, (0, tsyringe_1.inject)('IPaymentService')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], AdminService);
