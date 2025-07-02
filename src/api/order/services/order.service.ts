import { injectable, inject } from "tsyringe";
import * as ordertype from '../types/order.type'

@injectable()
export class OrderService implements ordertype.IOrderService{
    constructor(
        @inject('IOrderRepo') private OrderRepo: ordertype.IOrderRepo
    ) { }
    
    async placeOrder(orderInput: ordertype.TPlaceOrderInput): Promise<ordertype.TPlaceOrderInput> {
        const newOrder = await this.OrderRepo.createOrder(orderInput)

        return newOrder
    }
}