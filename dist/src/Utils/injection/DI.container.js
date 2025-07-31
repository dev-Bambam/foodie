"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const user_repo_1 = require("../../api/user/repositories/user.repo");
const menu_repo_1 = require("../../api/menu/repositories/menu.repo");
const order_repo_1 = require("../../api/order/repositories/order.repo");
const paystack_service_1 = require("../../api/payment/services/paystack.service");
const customerService_1 = require("../../api/user/services/customerService");
const menu_service_1 = require("../../api/menu/services/menu.service");
const order_service_1 = require("../../api/order/services/order.service");
const admin_service_1 = require("../../api/user/services/admin.service");
const auth_service_1 = require("../../api/auth/services/auth.service");
const payment_service_1 = require("../../api/payment/services/payment.service");
const payment_repo_1 = require("../../api/payment/repositories/payment.repo");
const upload_service_1 = require("../../uploads/upload.service");
// Register UserRepository with the User Service
tsyringe_1.container.register('IUserRepository', {
    useClass: user_repo_1.UserRepository
});
// Register Menu Repository
tsyringe_1.container.register('IMenuRepo', {
    useClass: menu_repo_1.MenuRepo
});
tsyringe_1.container.register('IMenuService', {
    useClass: menu_service_1.MenuService
});
// Register Order Repository
tsyringe_1.container.register('IOrderRepo', {
    useClass: order_repo_1.OrderRepo
});
tsyringe_1.container.register('IOrderService', {
    useClass: order_service_1.OrderService
});
// Register Payment service
tsyringe_1.container.register('IPaymentGateway', {
    useClass: paystack_service_1.PaystackService
});
tsyringe_1.container.register('IPaymentService', {
    useClass: payment_service_1.PaymentService
});
tsyringe_1.container.register('IPaymentRepo', {
    useClass: payment_repo_1.PaymentRepo
});
// Register Customer Service
tsyringe_1.container.register('ICustomerService', {
    useClass: customerService_1.CustomerService
});
//  Register Admin Service
tsyringe_1.container.register('IAdminService', {
    useClass: admin_service_1.AdminService
});
// Register Auth Service
tsyringe_1.container.register('IAuthService', {
    useClass: auth_service_1.AuthService
});
tsyringe_1.container.register('IUploadService', {
    useClass: upload_service_1.UploadService
});
