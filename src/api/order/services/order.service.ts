import { injectable, inject } from "tsyringe";
import * as ordertype from "../types/order.type";

@injectable()
export class OrderService implements ordertype.IOrderService {
   constructor(@inject("IOrderRepo") private OrderRepo: ordertype.IOrderRepo) {}

   async placeOrder(orderInput: ordertype.TPlaceOrderInput): Promise<ordertype.TOrderOutput> {
      const newOrder = await this.OrderRepo.createOrder(orderInput);

      return newOrder;
   }

   async fetchAllOrder<T extends ordertype.TOrder["status"]>(
      status?: T
   ): Promise<ordertype.TOrder[]> {
      if (status) {
         return await this.OrderRepo.fetchAllOrder(status);
      }
       
      return this.OrderRepo.fetchAllOrder(status!);
   }
}
