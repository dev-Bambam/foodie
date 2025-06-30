import { IUserRepository } from "../types/user.types";
import User from "../../../Models/user.model";
import { IUser } from "../types/user.types";
import { injectable } from "tsyringe";
import { TCustomerRegisterationInput } from "../types/user.types";

@injectable()
export class UserRepository implements IUserRepository {
   async findByEmail(email: string): Promise<IUser | null> {
      return User.findOne({ email }); // Mongoose example
   }
   async create(input: TCustomerRegisterationInput): Promise<IUser> {
      return User.create(input); // Mongoose example
   }
}