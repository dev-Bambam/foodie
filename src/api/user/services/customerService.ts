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
import { TPaymentInput, TPaymentGatewayResData, IPaymentService } from "../../payment/types/payment.type";
import { IAuthService } from "../../auth/types/auth.types";


@injectable()
export class CustomerService implements ICustomerService {
   constructor(
      @inject("IUserRepository") private userRepository: IUserRepository,
      @inject("IMenuService") private MenuService: IMenuService,
      @inject('IOderService') private OrderService: IOrderService,
      @inject('IPaymentService') private PaymentService: IPaymentService,
      @inject('IAuthService') private AuthService: IAuthService
   ) {}

   async register(customer: TCustomerRegisterationInput): Promise<TUserOutput> {
      const user = await this.AuthService.login(customer)
      return user
   }

   async login(input: TLoginInput): Promise<TUserOutput> {
      return await this.AuthService.login(input)
   }

   async browseMenus(category?: string): Promise<IMenuItem[] | null > {
      return await this.MenuService.browseMenus(category); 
   }
   
   async getMenuDetails(menuId: string): Promise<IMenuItem | null > {
      return await this.MenuService.getMenuDetail(menuId) 
   }

   async placeOrder(input: TPlaceOrderInput): Promise<TPlaceOrderInput> {
      return await this.OrderService.placeOrder(input)
   }

   async makePayment(paymentInput: TPaymentInput): Promise<TPaymentGatewayResData['authorization_url']> {
      const { paymentMethod } = paymentInput
      if (paymentMethod === 'cash') {
         return 'success, proceed to make payment with cash'
      }
      const payment_url = await this.PaymentService.createPayment(paymentInput)

      return payment_url
   }
}
