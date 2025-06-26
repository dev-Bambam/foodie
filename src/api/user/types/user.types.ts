import { Types, Document } from "mongoose";
import { IPayment } from "../../payment/types/payment.type";
import { IMenuItem } from "../../menu/types/menu.type";
import { IPlaceOrderInput } from "../../order/types/order.type";
import { IOrder } from "../../order/types/order.type";

// Main Data Model interface
export interface IUser extends Document{
   id: Types.ObjectId
   name: string
   email: string
   password: string
   role: string
   phone: string
   address?: {
      street: string
      city: string
      state: string
   }
}


// Shared Types
export interface IAddress {
   street: string;
   city: string;
   state: string;
}


export interface ICustomer {
   userId: Types.ObjectId | unknown;
   name: string;
   email: string;
   role: "customer";
   phone?: string;
   address?: IAddress;
   token: string;
}

export interface IRegisterInput {
   name: string;
   email: string;
   password: string;
   role?: string;
   phone?: string;
   address?: IAddress;
}

export interface ILoginInput {
   email: string;
   password: string;
}


// CustomerService Interface
export interface ICustomerService {
   register(input: IRegisterInput): Promise<ICustomer>;
   login(input: ILoginInput): Promise<{ token: string }>;
   browseMenus(category?: string): Promise<IMenuItem[]>;
   getMenuDetails(menuId: Types.ObjectId): Promise<IMenuItem>;
   placeOrder(userId: Types.ObjectId, input: IPlaceOrderInput): Promise<IOrder>;
   makePayment(
      userId: Types.ObjectId,
      orderId: Types.ObjectId,
      paymentMethod: "card" | "cash"
   ): Promise<IPayment>;
}

// AdminService Interface
export interface IAdminService {
   login(input: ILoginInput): Promise<{ token: string }>;
   getAllCustomers(): Promise<ICustomer[]>;
   confirmOrder(orderId: Types.ObjectId): Promise<IOrder>;
   confirmPayment(paymentId: Types.ObjectId): Promise<IPayment>;
}

export interface IUserRepository extends Document {
   create(input: IRegisterInput): Promise<IUser>;
   findByEmail(email: string): Promise<IUser | null>;
   findById(userId: Types.ObjectId): Promise<IUser | null>;
}

