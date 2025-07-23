import { BadRequestError } from "../../../Utils/Error/CustomError";
import {
   TUserOutput,
   ICustomerService,
   TLoginInput,
   TCustomerRegisterationInput,
   IUserRepository,
} from "../types/user.types";
import { injectable, inject } from "tsyringe";
import { IMenuItem, IMenuService } from "../../menu/types/menu.type";
import { IOrderService, TPlaceOrderInput } from "../../order/types/order.type";
// import * as paymenttype from "../../payment/types/payment.type";
import {
   TPaymentInput,
   TPaymentGatewayResData,
   IPaymentService,
} from "../../payment/types/payment.type";
import { IAuthService } from "../../auth/types/auth.types";

@injectable()
export class CustomerService implements ICustomerService {
   constructor(
      @inject("IUserRepository") private userRepository: IUserRepository,
      @inject("IMenuService") private MenuService: IMenuService,
      @inject("IOderService") private OrderService: IOrderService,
      @inject("IPaymentService") private PaymentService: IPaymentService,
      @inject("IAuthService") private AuthService: IAuthService
   ) {}

   async register(customer: TCustomerRegisterationInput): Promise<TUserOutput> {
      const { email, password } = customer
      const customerExist = await this.userRepository.findByEmail(email);
      if (customerExist) {
         throw new BadRequestError("User already exist", "DUPLICATE_ENTRY_ERR");
      }

      await this.userRepository.create(customer);
      const customerLogin = await this.AuthService.login({ email, password });

      return customerLogin;
   }

   async login(input: TLoginInput): Promise<TUserOutput> {
      const user = await this.AuthService.login(input);
      return user;
   }

   async browseMenus(category?: string): Promise<IMenuItem[] | null> {
      const menus = await this.MenuService.browseMenus(category);
      return menus;
   }

   async getMenuDetails(menuId: string): Promise<IMenuItem | null> {
      const menuDetail = await this.MenuService.getMenuDetail(menuId);
      return menuDetail;
   }

   async placeOrder(input: TPlaceOrderInput): Promise<TPlaceOrderInput> {
      const order = await this.OrderService.placeOrder(input);
      return order;
   }

   async makePayment(
      paymentInput: TPaymentInput
   ): Promise<TPaymentGatewayResData["authorization_url"]> {
      const { paymentMethod } = paymentInput;
      if (paymentMethod === "cash") {
         return "success, proceed to make payment with cash";
      }
      const payment_url = await this.PaymentService.createPayment(paymentInput);

      return payment_url;
   }

   async confirmPayment(orderId: string): Promise<string >{
      const updatedPayment = await this.PaymentService.confirmPayment(orderId)
      if (updatedPayment.status as 'failed' === 'failed') {
         return `Payment failed for order:${orderId}`
      } else if (updatedPayment.status as 'pending' === 'pending') {
         return `Payment still pending for order:${orderId}, please try again`
      }

      return `Payment successful for order:${orderId}, thanks for your patronage`
   }
}
