import { IUserRepository, TCustomer } from "../types/user.types";
import User from "../../../Models/user.model";
import { IUser } from "../types/user.types";
import { injectable } from "tsyringe";
import { TCustomerRegisterationInput } from "../types/user.types";
import { Types } from "mongoose";

@injectable()
export class UserRepository implements IUserRepository {
   async findByEmail(email: string): Promise<IUser | null> {
      return await User.findOne({ email }); // Mongoose example
   }
   async create(input: TCustomerRegisterationInput): Promise<IUser> {
      return await User.create(input); // Mongoose example
   }
   async findById(userId: Types.ObjectId): Promise<IUser | null> {
      return await User.findById(userId)
   }
   async fetchAllCustomer(): Promise<TCustomer[]> {
      return await User.find()
   }
}