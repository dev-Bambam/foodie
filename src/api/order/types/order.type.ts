import { Document, Types } from "mongoose";
import { IAddress } from "../../user/types/user.types";

export interface IOrder extends Document {
   userId: Types.ObjectId;
   items: Array<{
      menuId: Types.ObjectId;
      quantity: number;
      price: number;
   }>;
   totalPrice: number;
   status: "pending" | "confirmed" | "delivered" | "cancelled";
   deliveryAddress:IAddress
}

export interface IPlaceOrderInput {
   items: { menuId: string; quantity: number }[];
   deliveryAddress: IAddress;
}