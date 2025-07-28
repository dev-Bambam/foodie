import * as usertype from "../types/user.types";
import * as menutype from "../../menu/types/menu.type";
import * as ordertype from "../../order/types/order.type";
import * as paymenttype from "../../payment/types/payment.type";
import { injectable, inject } from "tsyringe";
import { IAuthService } from "../../auth/types/auth.types"

/**
 * Service class for admin-related business logic (admin registration, user management, etc.).
 * Handles all admin domain operations and interacts with repositories.
 */
@injectable()
export class AdminService implements usertype.IAdminService {
   constructor(
      @inject("IMenuService") private MenuService: menutype.IMenuService,
      @inject("IOderService") private OrderService: ordertype.IOrderService,
      @inject("IUserRepository") private UserRepo: usertype.IUserRepository,
      @inject("IAuthService") private AuthService: IAuthService,
      @inject('IPaymentService') private PaymentService: paymenttype.IPaymentService
   ) {}

   // Authentication
   async login(input: usertype.TLoginInput): Promise<usertype.TUserOutput> {
      const user = await this.AuthService.login(input)
      return user
   }

   // CRUD Order
  async fetchAllOrder<T extends ordertype.TOrder["status"]>(status?: T): Promise<ordertype.TOrder[]> {
   return await this.OrderService.fetchAllOrder(status);
  }
   async updateOrder(
      orderId: string,
      orderData: ordertype.TOrderUpdate
   ): Promise<ordertype.TOrder> {
      return await this.OrderService.updateOrder(orderId, orderData);
   }

   // CRUD on Menu
   async createMenu(menuInput: menutype.TCreateMenuInput): Promise<menutype.TMenuItem> {
      return await this.MenuService.createMenu(menuInput);
   }
   async updateMenu(
      menuId: string,
      menuInput: menutype.TUpdateMenuItem
   ): Promise<menutype.TMenuItem> {
      return await this.MenuService.updateMenu(menuId, menuInput);
   }
   async deleteMenu(menuId: string): Promise<void> {
      return await this.MenuService.deleteMenu(menuId);
   }

   // CRUD on Payment
   async confirmPayment(paymentId: string): Promise<paymenttype.TPayment> {
      const payment = await this.PaymentService.confirmPayment(paymentId)
      return payment
   }
   async fetchAPayment(paymentId: string): Promise<paymenttype.TPayment | null> {
      const payment = await this.PaymentService.fetchAPayment(paymentId)
      return payment
   }
  async fetchAllPayment<T extends paymenttype.TPayment["status"]>(status: T): Promise<paymenttype.TPayment[] | null> {
   const allPayment = await this.PaymentService.fetchAllPayment(status);
   return allPayment;
  }

   // CRUD on Customer/ User
  async getAllCustomers(): Promise<usertype.TUser[]> {
     const allCustomer = await this.UserRepo.fetchAllCustomer()
     return allCustomer
  }
}
