import { injectable } from "tsyringe";
import * as ordertype from './../types/order.type'
import Order from './../../../Models/order.model'

@injectable()
export class OrderRepo implements ordertype.IOrderRepo{
    async createOrder(orderInput: ordertype.TPlaceOrderInput): Promise<ordertype.TPlaceOrderInput> {
        const newOrder = await Order.create(orderInput)

        return {
            userId: newOrder.userId,
            items: newOrder.items,
            totalPrice: newOrder.totalPrice,
            deliveryAddress: newOrder.deliveryAddress,
            status: newOrder.status as 'pending'
        } 
    }
}