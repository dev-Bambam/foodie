import { TPayment } from "../../payment/types/payment.type";
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

export type TUserOutput = Omit<TUser, "password"> & { token: string };
export type TCustomer = Pick<TUser, "id" | "name" | "email" | "phone" | "address"> & {
   role: "customer";
   token: string;
};
export type TCustomerRegisterationInput = Pick <TUser, 'name'|'email'|'address'|'phone'|'password'>

export type TLoginInput = Pick<TUser, 'email' | 'password'>

// CustomerService Interface
export interface ICustomerService {
   register(customer: TCustomerRegisterationInput): Promise<TCustomer>;
   login(user: TLoginInput): Promise<{ token: string }>;
   browseMenus(category?: string): Promise<IMenuItem[] | null>;
   getMenuDetails(menuId: string): Promise<IMenuItem | null>;
   placeOrder(input: ordertype.TPlaceOrderInput): Promise<ordertype.TPlaceOrderInput>;
   makePayment(userId: string, orderId: string, amount: number): Promise<TPayment>;
}

// AdminService Interface
export interface IAdminService {
   // Authentication
   login(input: TLoginInput): Promise<{ token: string }>;

   // CRUD Order
   fetchAllOrder<T extends ordertype.TOrder["status"]>(status?: T): Promise<ordertype.TOrder[]>;
   updateOrder(orderId: string, orderData: ordertype.TOrderUpdate): Promise<ordertype.TOrder>;

   // CRUD on Menu
   createMenu(menuInput: menutype.TCreateMenuInput): Promise<menutype.TMenuItem>;
   updateMenu(menuId: string, menuInput: menutype.TUpdateMenuItem): Promise<menutype.TMenuItem>;
   deleteMenu(menuId: string): Promise<void>;

   // CRUD on Payment
   updatePayment(paymentId: string): Promise<TPayment>;

   // CRUD on Customer/ User
   getAllCustomers(): Promise<TCustomer[]>;
}

export interface IUserRepository {
   create(input: TCustomerRegisterationInput): Promise<TUser>;
   findByEmail(email: string): Promise<TUser | null>;
   findById(userId: string): Promise<TUser | null>;
   fetchAllCustomer(): Promise<TCustomer[]>;
}
