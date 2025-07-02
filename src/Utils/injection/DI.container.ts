import { container } from "tsyringe";
import { UserRepository } from "../../api/user/repositories/user.repo";
import { IUserRepository } from "../../api/user/types/user.types";
import { IMenuRepo } from "../../api/menu/types/menu.type";
import { MenuRepo } from "../../api/menu/repositories/menu.repo";
import { OrderRepo } from "../../api/order/repositories/order.repo";
import { IOrderRepo } from "../../api/order/types/order.type";
import { IPaymentService } from "../../api/payment/types/payment.type";
import { PaystackService } from "../../api/payment/services/paystack.service";

// Register UserRepository with the User Service
container.register<IUserRepository>('IUserRepository', {
    useClass: UserRepository
});


// Register Menu Repository
container.register<IMenuRepo>('IMenuRepo', {
    useClass: MenuRepo
})

// Register Order Repository
container.register<IOrderRepo>('IOrderRepo', {
    useClass: OrderRepo
})

// Register Payment service
container.register<IPaymentService>('IPayment', {
    useClass: PaystackService
})