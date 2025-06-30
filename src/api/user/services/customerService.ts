import { BadRequestError, NotFoundError } from "../../../Utils/Error/CustomError";
import {
   TCustomer,
   ICustomerService,
   TLoginInput,
   TCustomerRegisterationInput,
   IUserRepository,
} from "../types/user.types";
import { compare } from "bcryptjs";
import { generateToken } from "../../../Utils/token/jwt";
import { injectable, inject } from "tsyringe";
import { IMenuItem, IMenuService } from "../../menu/types/menu.type";
import { Types } from "mongoose";

@injectable()
export class CustomerService implements ICustomerService {
   constructor(
      @inject("IUserRepository") private userRepository: IUserRepository,
      @inject("IMenuRepo") private MenuService: IMenuService
   ) {}

   async register(customer: TCustomerRegisterationInput): Promise<TCustomer> {
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
         token,
      };
   }

   async login(input: TLoginInput): Promise<{ token: string }> {
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
}
