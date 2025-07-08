import { BadRequestError, NotFoundError } from "../../../Utils/Error/CustomError";
import {
   TUserOutput,
   ICustomerService,
   TLoginInput,
   TCustomerRegisterationInput,
   IUserRepository,
} from "../types/user.types";
import { compare } from "bcryptjs";
import { generateToken } from "../../../Utils/token/jwt";
import { injectable, inject } from "tsyringe";
import { IMenuItem, IMenuService } from "../../menu/types/menu.type";
import { IOrderService, TPlaceOrderInput } from "../../order/types/order.type";
import * as paymenttype from "../../payment/types/payment.type";


@injectable()
export class CustomerService implements ICustomerService {
   constructor(
      @inject("IUserRepository") private userRepository: IUserRepository,
      @inject("IMenuService") private MenuService: IMenuService,
      @inject('IOderService') private OrderService: IOrderService,
      @inject('IPaymentService') private PaymentService: paymenttype.IPaymentService
   ) {}

   async register(customer: TCustomerRegisterationInput): Promise<TUserOutput> {
      // check if user already exist
      const userExist = await this.userRepository.findByEmail(customer.email);
      if (userExist) {
         throw new BadRequestError("User already registered", "DUPLICATE_USER_ERR");
      }
      const newCustomer = await this.userRepository.create(customer);
      const token = generateToken({ userId: newCustomer.id, role: "customer" });

      return {
         id: newCustomer.id,
         name: newCustomer.name,
         email: newCustomer.email,
         role: newCustomer.role as "customer",
         phone: newCustomer.phone,
         address: newCustomer.address,
         createdAt: newCustomer.createdAt,
         token,
      };
   }

   async login(input: TLoginInput): Promise<TUserOutput> {
      const user = await this.userRepository.findByEmail(input.email);
      if (!user) {
         throw new NotFoundError();
      }

      const validPassword = await compare(input.password, user.password);
      if (!validPassword) {
         throw new BadRequestError("Invalid password", "PASSWORD_ERR");
      }

      const token = generateToken({ userId: user.id, role: "customer" });
      return {
         id: user.id,
         name: user.name,
         email: user.email,
         role: user.role as "customer",
         phone: user.phone,
         address: user.address,
         createdAt: user.createdAt,
         token,
      };
   }

   async browseMenus(category?: string): Promise<IMenuItem[] | null > {
      const menus = await this.MenuService.browseMenus(category); 
      
      return menus 
   }
   
   async getMenuDetails(menuId: string): Promise<IMenuItem | null > {
      const menu = await this.MenuService.getMenuDetail(menuId)

      return menu 
   }

   async placeOrder(input: TPlaceOrderInput): Promise<TPlaceOrderInput> {
      const order = await this.OrderService.placeOrder(input)
      return order
   }

   async makePayment(userId: string, orderId: string, amount: number): Promise<paymenttype.TPayment> {
      const user = await this.userRepository.findById(userId)
      
      if (!user) {
         throw new BadRequestError('User not found', 'PAYMENT_ERR')
      }
      const payment = await this.PaymentService.initializePayment(amount, user.email)
      return payment
   }
}
