import { Types, Document } from "mongoose";
import { IPayment } from "../../payment/types/payment.type";
import { IMenuItem } from "../../menu/types/menu.type";
import { TPlaceOrderInput } from "../../order/types/order.type";
import { IOrder } from "../../order/types/order.type";

// Main Data Model interface
export interface IUser {
   id: string;
   name: string;
   email: string;
   password: string;
   role: "customer" | 'admin';
   phone?: string;
   address?:TAddress
   createdAt: Date;
   updatedAt: Date;
}


// Shared Types
export type TAddress = {
   street: string;
   city: string;
   state: string;
}

export type TCustomer = Pick<IUser, 'id'|'name'|'email'|'phone'|'address'> & {role:'customer', token:string}
export type TCustomerRegisterationInput = {
   name: string;
   email: string;
   password: string;
   role?: string;
   phone?: string;
   address?: TAddress;
}

export type TLoginInput = {
   email: string;
   password: string;
};


// CustomerService Interface
export interface ICustomerService {
   register(customer: TCustomerRegisterationInput): Promise<TCustomer>;
   login(user: TLoginInput): Promise<{ token: string }>;
   browseMenus(category?: string): Promise<IMenuItem[]>
   getMenuDetails(menuId: Types.ObjectId): Promise<IMenuItem>
   placeOrder(userId: Types.ObjectId, input: TPlaceOrderInput): Promise<IOrder>;
   makePayment(
      userId: Types.ObjectId,
      orderId: Types.ObjectId,
      paymentMethod: "card" | "cash"
   ): Promise<IPayment>;
}

// AdminService Interface
export interface IAdminService {
   login(input: TLoginInput): Promise<{ token: string }>;
   getAllCustomers(): Promise<TCustomer[]>;
   confirmOrder(orderId: Types.ObjectId): Promise<IOrder>;
   confirmPayment(paymentId: Types.ObjectId): Promise<IPayment>;
}

export interface IUserRepository {
   create(input: TCustomerRegisterationInput): Promise<IUser>;
   findByEmail(email: string): Promise<IUser | null>;
   // findById(userId: Types.ObjectId): Promise<IUser | null>;
}