export type TPayment =  {
   id: string;
   orderId: string;
   userEmail: string;
   amount: number;
   status: "pending" | "successful" | "failed";
   paymentMethod: "bank transfer" | "cash";
   transactionId: string;
   createdAt: Date;
};

export type TPaymentInput = Omit<TPayment, 'id' | 'status' | 'createdAt'>;
export type TUpdatePayment = Partial<TPaymentInput>;

export interface IPaymentService {
   initializePayment(amount: number, email: string, metadata?: any): Promise<TPayment>;
   verifyPayment(reference: string): Promise<TPayment>;
   fetchAllPayment<T extends keyof TPayment["status"]>(status?: T): Promise<TPayment[]>;
   fetchAPayment(paymentId: string): Promise<TPayment>;
   updatePayment(paymentId: string, paymentUpdate: TUpdatePayment): Promise<TPayment>;
   deletePayment(paymentId: string): Promise<void>;
}

export interface IPaymentRepo{
   // CRUD
   createPayment(payment: TPaymentInput): Promise<TPayment>
   fetchAllPayment<T extends keyof TPayment['status']>(status?: T): Promise<TPayment[] | null>
   fetchAPayment(paymentId: string): Promise<TPayment | null >
   updatePayment(paymentId: string, paymentUpdate: TUpdatePayment): Promise<TPayment>
   deletePayment(paymentId: string): Promise<void>
}
