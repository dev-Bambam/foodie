import { Document, Types } from "mongoose";
import { TAddress } from "../../user/types/user.types";

export interface IOrder {
   userId: Types.ObjectId;
   items: TItems
   totalPrice: number;
   status: "pending" | "confirmed" | "delivered" | "cancelled";
   deliveryAddress:TAddress
}

export type TItems = {
   items: Array<{
      menuId: string
      quantity: number
      price: number
   }>
}

export type TPlaceOrderInput = Pick<IOrder, 'userId' | 'items' | 'totalPrice' | 'deliveryAddress'> & {
   status: 'pending'
}

export type TOrderOutput = Pick<IOrder, "userId" | "items" | "totalPrice" | "deliveryAddress"> & {
   status: ''
};


export interface IOrderRepo{
   createOrder(orderInput: TPlaceOrderInput): Promise<TPlaceOrderInput>
   fetchAll<T extends IOrder['status']>(status: T): Promise<IOrder[]>
}

export interface IOrderService{
   placeOrder(orderInput: TPlaceOrderInput): Promise<TPlaceOrderInput>
}