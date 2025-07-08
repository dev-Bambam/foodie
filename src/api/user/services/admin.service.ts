import * as usertype from "../types/user.types";
import * as menutype from "../../menu/types/menu.type";
import * as ordertype from "../../order/types/order.type";
import { IPayment } from "../../payment/types/payment.type";
import { injectable, inject } from "tsyringe";

@injectable()
export class AdminService implements usertype.IAdminService {
   constructor(
      @inject("IMenuService") private MenuService: menutype.IMenuService,
      @inject("IOderService") private OrderService: ordertype.IOrderService,
      @inject("IUserRepository") private UserRepo: usertype.IUserRepository
   ) {}

   // Authentication
   async login(input: usertype.TLoginInput): Promise<{ token: string }> {
      // Implement your admin login logic here
      // Example: delegate to UserRepo or a dedicated AuthService
      throw new Error("Not implemented");
   }

   // CRUD Order
   async fetchAllOrder<T extends ordertype.TOrder["status"]>(
      status?: T
   ): Promise<ordertype.TOrder[]> {
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
   async updatePayment(paymentId: string): Promise<IPayment> {
      // Implement your payment update logic here
      throw new Error("Not implemented");
   }

   // CRUD on Customer/ User
   async getAllCustomers(): Promise<usertype.TCustomer[]> {
      return await this.UserRepo.fetchAllCustomer();
   }
}
