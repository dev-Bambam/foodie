import * as authtype from "../types/auth.types";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../user/types/user.types";
import { compare } from "bcryptjs";
import { BadRequestError, NotFoundError } from "../../../Utils/Error/CustomError";
import { generateToken } from "../../../Utils/token/jwt";

@injectable()
export class AuthService implements authtype.IAuthService {
   constructor(@inject("IUserRepository") private UserRepo: IUserRepository) {}

   async login(loginInput: authtype.TLoginInput): Promise<authtype.TLoginOutput> {
      const { email, password } = loginInput;
      const user = await this.UserRepo.findByEmail(email);
      console.log(user);
      if (!user) {
         throw new NotFoundError("user not found");
      }

      const validPassword = await compare(password, user.password);
      if (!validPassword) {
         throw new BadRequestError("incorrect password", "PASSWORD_ERR");
      }

      const token = generateToken({ userId: user.id, role: user.role });

      return {
         id: user.id,
         name: user.name,
         email: user.email,
         role: user.role,
         phone: user.phone,
         address: user.address,
         token,
         createdAt: user.createdAt,
      };
   }
}
