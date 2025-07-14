export type TPayment = {
   id: string;
   orderId: string;
   userId: string;
   amount: number;
   status: "pending" | "successful" | "failed";
   paymentMethod: "bank transfer" | "cash";
   transactionId: string;
   paymentGatewayResponse?: TPaymentGatewayRes
   createdAt: Date;
};

export type TPaystackReposnse =  {
   status: boolean;
   message: string;
   data: TPaymentGatewayRes
};

export type TPaymentGatewayRes = {
   data: {
      authorization_url: string;
      access_code: string;
      reference: string;
   };
};

export type TPaymentInput = Omit<TPayment, "id" | "status" | "createdAt">;

export type TUpdatePayment = Partial<TPaymentInput>;

export interface IPaymentService {
   createPayment(payment: TPaymentInput): Promise<TPayment>;
   fetchAllPayment<T extends keyof TPayment["status"]>(status?: T): Promise<TPayment[]>;
   fetchAPayment(paymentId: string): Promise<TPayment>;
   updatePayment(paymentId: string, paymentUpdate: TUpdatePayment): Promise<TPayment>;
   deletePayment(paymentId: string): Promise<void>;
}

export interface IPaymentGateway {
   initializePayment(amount: number, email: string, metadata?: any): Promise<TPaymentGatewayRes>;
   verifyPayment(reference: string): Promise<any>;
}

export interface IPaymentRepo {
   // CRUD
   createPayment(payment: TPaymentInput): Promise<TPayment>;
   fetchAllPayment<T extends keyof TPayment["status"]>(status?: T): Promise<TPayment[]>;
   fetchAPayment(paymentId: string): Promise<TPayment | null>;
   updatePayment(paymentId: string, paymentUpdate: TUpdatePayment): Promise<TPayment>;
   deletePayment(paymentId: string): Promise<void>;
}
