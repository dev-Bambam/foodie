import { injectable } from "tsyringe";
import * as ordertype from './../types/order.type'
import Order from './../../../Models/order.model'

@injectable()
export class OrderRepo implements ordertype.IOrderRepo{
    async createOrder(orderInput: ordertype.TPlaceOrderInput): Promise<void> {
        
    }
}