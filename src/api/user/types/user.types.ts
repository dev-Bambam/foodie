import { Types } from "mongoose";

// Shared Types
interface Address {
   street: string;
   city: string;
   state: string;
}

interface Customer {
   userId: Types.ObjectId | unknown;
   name: string;
   email: string;
   role: "customer";
   phone?: string;
   address?: Address;
   token:string
}

interface RegisterInput {
   name: string;
   email: string;
   password: string;
   role?: string;
   phone?: string;
   address?: Address;
}

interface LoginInput {
   email: string;
   password: string;
}

interface PlaceOrderInput {
   items: { menuId: string; quantity: number }[];
   deliveryAddress: Address;
}

// CustomerService Interface
interface ICustomerService {
   register(input: RegisterInput): Promise<Customer>;
   login(input: LoginInput): Promise<{ token: string }>;
   browseMenus(category?: string): Promise<MenuItem[]>;
   getMenuDetails(menuId: Types.ObjectId): Promise<MenuItem>;
   placeOrder(userId: Types.ObjectId, input: PlaceOrderInput): Promise<Order>;
   makePayment(
      userId: Types.ObjectId,
      orderId: Types.ObjectId,
      paymentMethod: "card" | "cash"
   ): Promise<Payment>;
}

// AdminService Interface
interface IAdminService {
   login(input: LoginInput): Promise<{ token: string }>;
   getAllCustomers(): Promise<Customer[]>;
   confirmOrder(orderId: Types.ObjectId): Promise<Order>;
   confirmPayment(paymentId: Types.ObjectId): Promise<Payment>;
}

// Imported Types (from other domains)
interface MenuItem {
   menuId: Types.ObjectId;
   name: string;
   description: string;
   price: number;
   category: string;
   imageUrl?: string;
   isAvailable: boolean;
}

interface Order {
   orderId: Types.ObjectId;
   userId: Types.ObjectId;
   items: { menuId: Types.ObjectId; quantity: number; price: number }[];
   totalPrice: number;
   status: "pending" | "confirmed" | "delivered" | "cancelled";
   deliveryAddress: Address;
   createdAt: Date;
   updatedAt: Date;
}

interface Payment {
   paymentId: Types.ObjectId;
   orderId: Types.ObjectId;
   userId: Types.ObjectId;
   amount: number;
   status: "pending" | "completed" | "failed";
   paymentMethod: "card" | "cash";
   transactionId?: string;
   createdAt: Date;
}

export {
   ICustomerService,
   IAdminService,
   RegisterInput,
   LoginInput,
   PlaceOrderInput,
   Customer,
   Address,
   MenuItem,
   Order,
   Payment,
};
