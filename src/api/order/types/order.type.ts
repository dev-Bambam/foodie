
import { TAddress } from "../../user/types/user.types";

export type TOrder = {
   userId: string;
   items: TItems;
   totalPrice: number;
   status: "pending" | "confirmed" | "delivered" | "cancelled";
   deliveryAddress: TAddress;
};

export type TItems = {
   items: Array<{
      menuId: string
      quantity: number
      price: number
   }>
}

export type TPlaceOrderInput = Pick<TOrder, 'userId' | 'items' | 'totalPrice' | 'deliveryAddress'>

export type TOrderOutput = Pick<TOrder, "userId" | "items" | "totalPrice" | "deliveryAddress"> & {
   status: 'pending'
};
export type TOrderUpdate = Partial<TOrder>


export interface IOrderRepo{
   createOrder(orderInput: TPlaceOrderInput): Promise<TOrderOutput>
   fetchAllOrder<T extends TOrder['status']>(status: T): Promise<TOrder[]>
}

export interface IOrderService{
   placeOrder(orderInput: TPlaceOrderInput): Promise<TPlaceOrderInput>
   fetchAllOrder<T extends TOrder['status']>(status?: T): Promise<TOrder[]>
}