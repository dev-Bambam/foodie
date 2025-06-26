import { Document, Types } from "mongoose";
import { TAddress } from "../../user/types/user.types";

export interface IOrder extends Document {
   userId: Types.ObjectId;
   items: Array<{
      menuId: Types.ObjectId;
      quantity: number;
      price: number;
   }>;
   totalPrice: number;
   status: "pending" | "confirmed" | "delivered" | "cancelled";
   deliveryAddress:TAddress
}

export type TPlaceOrderInput = Pick<IOrder, 'userId'|'items' |'totalPrice' |'deliveryAddress'> & {status:'pending'}
