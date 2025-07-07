import { Types, Document } from "mongoose";
import { IPayment } from "../../payment/types/payment.type";
import { IMenuItem } from "../../menu/types/menu.type";
import * as ordertype from '../../order/types/order.type'
import * as menutype from '../../menu/types/menu.type'

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
   browseMenus(category?: string): Promise<IMenuItem[] | null >
   getMenuDetails(menuId: string): Promise<IMenuItem | null >
   placeOrder(input: ordertype.TPlaceOrderInput): Promise<ordertype.TPlaceOrderInput>;
   makePayment(
      userId: Types.ObjectId,
      orderId: Types.ObjectId,
      amount: number
   ): Promise<IPayment>;
}

// AdminService Interface
export interface IAdminService {
   login(input: TLoginInput): Promise<{ token: string }>;
   getAllCustomers(): Promise<TCustomer[]>;
   confirmOrder(orderId: string): Promise<ordertype.TOrderOutput>;
   confirmPayment(paymentId: string): Promise<IPayment>;
   createMenu(menuInput: menutype.TCreateMenuInput): Promise<menutype.TMenuItem>
   updateMenu(menuId:string, menuInput:menutype.TUpdateMenuItem): Promise<menutype.TMenuItem>
}

export interface IUserRepository {
   create(input: TCustomerRegisterationInput): Promise<IUser>;
   findByEmail(email: string): Promise<IUser | null>;
   findById(userId: Types.ObjectId): Promise<IUser | null>;
   fetchAllCustomer(): Promise<TCustomer[]>
}