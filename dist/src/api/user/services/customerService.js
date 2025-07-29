"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const CustomError_1 = require("../../../Utils/Error/CustomError");
const tsyringe_1 = require("tsyringe");
/**
 * Service class for customer-related business logic (user registration, profile, etc.).
 * Handles all customer domain operations and interacts with repositories.
 */
let CustomerService = class CustomerService {
    constructor(userRepository, MenuService, OrderService, PaymentService, AuthService) {
        this.userRepository = userRepository;
        this.MenuService = MenuService;
        this.OrderService = OrderService;
        this.PaymentService = PaymentService;
        this.AuthService = AuthService;
    }
    async register(customer) {
        const { email, password } = customer;
        const customerExist = await this.userRepository.findByEmail(email);
        if (customerExist) {
            throw new CustomError_1.BadRequestError("User already exist", "DUPLICATE_ENTRY_ERR");
        }
        await this.userRepository.create(customer);
        const customerLogin = await this.AuthService.login({ email, password });
        return customerLogin;
    }
    async login(input) {
        const user = await this.AuthService.login(input);
        return user;
    }
    async browseMenus(category) {
        const menus = await this.MenuService.browseMenus(category);
        return menus;
    }
    async getMenuDetails(menuId) {
        const menuDetail = await this.MenuService.getMenuDetail(menuId);
        return menuDetail;
    }
    async placeOrder(input) {
        const order = await this.OrderService.placeOrder(input);
        return order;
    }
    async makePayment(paymentInput) {
        const { paymentMethod } = paymentInput;
        if (paymentMethod === "cash") {
            return "success, proceed to make payment with cash";
        }
        const payment_url = await this.PaymentService.createPayment(paymentInput);
        return payment_url;
    }
    async confirmPayment(reference) {
        const payment = await this.PaymentService.confirmPayment(reference);
        const orderId = payment.orderId;
        if (payment.status === "failed") {
            payment.status = "failed";
            return `Payment failed for order:${orderId}`;
        }
        else if (payment.status === "pending") {
            payment.status = "pending";
            return `Payment still pending for order:${orderId}, please try again`;
        }
        payment.status = "successful";
        await this.PaymentService.savePayment(payment.id);
        return `Payment successful: orderId:${orderId}, paymentId:${payment.id}`;
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IUserRepository")),
    __param(1, (0, tsyringe_1.inject)("IMenuService")),
    __param(2, (0, tsyringe_1.inject)("IOrderService")),
    __param(3, (0, tsyringe_1.inject)("IPaymentService")),
    __param(4, (0, tsyringe_1.inject)("IAuthService")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], CustomerService);
