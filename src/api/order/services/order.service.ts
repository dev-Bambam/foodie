import { injectable, inject } from "tsyringe";
import * as ordertype from "../types/order.type";

@injectable()
export class OrderService implements ordertype.IOrderService {
   constructor(@inject("IOrderRepo") private OrderRepo: ordertype.IOrderRepo) {}

   async placeOrder(orderInput: ordertype.TPlaceOrderInput): Promise<ordertype.TOrderOutput> {
      return await this.OrderRepo.createOrder(orderInput);
   }

   async fetchAllOrder<T extends ordertype.TOrder["status"]>(
      status?: T
   ): Promise<ordertype.TOrder[]> {
      return await this.OrderRepo.fetchAllOrder(status!);
   }

   async updateOrder(
      orderId: string,
      orderObject: ordertype.TOrderUpdate
   ): Promise<ordertype.TOrder> {
      return await this.OrderRepo.updateOrder(orderId, orderObject);
   }

   async deleteOrder(orderId: string): Promise<void> {
      await this.OrderRepo.deleteOrder(orderId);
   }
}
