import { container } from "tsyringe";
import { UserRepository } from "../../api/user/repositories/user.repo";
import { IAdminService, ICustomerService, IUserRepository } from "../../api/user/types/user.types";
import { IMenuRepo, IMenuService } from "../../api/menu/types/menu.type";
import { MenuRepo } from "../../api/menu/repositories/menu.repo";
import { OrderRepo } from "../../api/order/repositories/order.repo";
import { IOrderRepo, IOrderService } from "../../api/order/types/order.type";
import { IPaymentGateway, IPaymentService } from "../../api/payment/types/payment.type";
import { PaystackService } from "../../api/payment/services/paystack.service";
import { CustomerService } from "../../api/user/services/customerService";
import { MenuService } from "../../api/menu/services/menu.service";
import { OrderService } from "../../api/order/services/order.service";
import { AdminService } from "../../api/user/services/admin.service";
import { IAuthService } from "../../api/auth/types/auth.types";
import { AuthService } from "../../api/auth/services/auth.service";

// Register UserRepository with the User Service
container.register<IUserRepository>('IUserRepository', {
    useClass: UserRepository
});


// Register Menu Repository
container.register<IMenuRepo>('IMenuRepo', {
    useClass: MenuRepo
})
container.register<IMenuService>('IMenuService', {
    useClass:MenuService
})

// Register Order Repository
container.register<IOrderRepo>('IOrderRepo', {
    useClass: OrderRepo
})
container.register<IOrderService>('IOderService', {
    useClass: OrderService
})

// Register Payment service
container.register<IPaymentGateway>('IPaymentGateway', {
    useClass: PaystackService
})

// Register Customer Service
container.register<ICustomerService>('ICustomerService', {
    useClass: CustomerService
})

//  Register Admin Service
container.register<IAdminService>('IAdminService', {
    useClass: AdminService
})

// Register Auth Service
container.register<IAuthService>('IAuthService', {
    useClass: AuthService
})