import { injectable } from "tsyringe";
import * as ordertype from "./../types/order.type";
import Order from "./../../../Models/order.model";

@injectable()
export class OrderRepo implements ordertype.IOrderRepo {
   async createOrder(orderInput: ordertype.TPlaceOrderInput): Promise<ordertype.TOrderOutput> {
      const newOrder = await Order.create(orderInput);

      return {
         userId: newOrder.userId,
         items: newOrder.items,
         totalPrice: newOrder.totalPrice,
         deliveryAddress: newOrder.deliveryAddress,
         status: newOrder.status as "pending",
      };
   }
   async fetchAllOrder<T extends ordertype.TOrder["status"]>(
      status?: T
   ): Promise<ordertype.TOrder[]> {
      if (status) {
         return await Order.find({ status });
      }
      return await Order.find();
   }
   async updateOrder(
      orderId: string,
      orderObject: ordertype.TOrderUpdate
   ): Promise<ordertype.TOrder> {
      const updatedOrder = await Order.findByIdAndUpdate(orderId, orderObject, { new: true });

      return updatedOrder as ordertype.TOrder;
   }
   async deleteOrder(orderId: string): Promise<void> {
      await Order.findByIdAndDelete(orderId);
   }
}
