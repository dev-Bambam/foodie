import * as paymenttype from "../../payment/types/payment.type";
import { IMenuItem } from "../../menu/types/menu.type";
import * as ordertype from "../../order/types/order.type";
import * as menutype from "../../menu/types/menu.type";

// Main Data Model Type
export type TUser = {
   id: string;
   name: string;
   email: string;
   password: string;
   role: "customer" | "admin";
   phone?: string;
   address?: TUserAddress;
   createdAt: Date;
   updatedAt: Date;
};

// Shared Types
export type TUserAddress = {
   street: string;
   city: string;
   state: string;
};

export type TUserOutput = Omit<TUser, "password" | 'updatedAt'> & { token: string };

export type TCustomerRegisterationInput = Pick<
   TUser,
   "name" | "email" | "address" | "phone" | "password"
>;
export type TLoginInput = Pick<TUser, "email" | "password">;

// CustomerService Interface
export interface ICustomerService {
   register(customer: TCustomerRegisterationInput): Promise<TUserOutput>;
   login(user: TLoginInput): Promise<{ token: string }>;
   browseMenus(category?: string): Promise<IMenuItem[] | null>;
   getMenuDetails(menuId: string): Promise<IMenuItem | null>;
   placeOrder(input: ordertype.TPlaceOrderInput): Promise<ordertype.TPlaceOrderInput>;
   makePayment(paymentInput: paymenttype.TPaymentInput): Promise<paymenttype.TPaymentGatewayResData['authorization_url']>;
   confirmPayment(reference:string): Promise<string>
}

// AdminService Interface
export interface IAdminService {
   // Authentication
   login(input: TLoginInput): Promise<TUserOutput>;

   // CRUD Order
   fetchAllOrder<T extends ordertype.TOrder["status"]>(status?: T): Promise<ordertype.TOrder[]>;
   updateOrder(orderId: string, orderData: ordertype.TOrderUpdate): Promise<ordertype.TOrder>;

   // CRUD on Menu
   createMenu(menuInput: menutype.TCreateMenuInput): Promise<menutype.TMenuItem>;
   updateMenu(menuId: string, menuInput: menutype.TUpdateMenuItem): Promise<menutype.TMenuItem>;
   deleteMenu(menuId: string): Promise<void>;

   // CRUD on Payment
   confirmPayment(paymentId: string): Promise<paymenttype.TPayment>;
   fetchAPayment(paymentId: string): Promise<paymenttype.TPayment | null>
   fetchAllPayment<T extends paymenttype.TPayment['status']>(status: T): Promise<paymenttype.TPayment [] | null>

   // CRUD on Customer/ User
   getAllCustomers(): Promise<TUser[]>;
   
}

export interface IUserRepository {
   create(input: TCustomerRegisterationInput): Promise<TUser>;
   findByEmail(email: string): Promise<TUser | null>;
   findById(userId: string): Promise<TUser | null>;
   fetchAllCustomer(): Promise<TUser[]>;
}