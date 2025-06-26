import { BadRequestError, NotFoundError } from "../../../Utils/Error/CustomError";
import {
   ICustomer,
   ICustomerService,
   ILoginInput,
   IRegisterInput,
   IUserRepository
} from "../types/user.types";
import { compare } from "bcryptjs";
import { generateToken } from "../../../Utils/token/jwt";

class CustomerService implements ICustomerService {
   constructor(private userRepository: IUserRepository) {}

   async register(input: IRegisterInput): Promise<ICustomer> {
      // check if user already exist
      const userExist = await this.userRepository.findByEmail(input.email);
      if (userExist) {
         throw new BadRequestError("User already registered", "DUPLICATE_USER_ERR");
      }
      const user = await this.userRepository.create({
         ...input,
         role: "customer",
      });
       const token = generateToken({userId: user.id, role:'customer'})

      return {
         userId: user._id,
         name: user.name,
         email: user.email,
         role: "customer",
         phone: user.phone,
          address: user.address,
         token
      };
   }

   async login(input: ILoginInput): Promise<{ token: string }> {
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
}
