import User from "../../../Models/user.model";
import * as usertype from "../types/user.types";
import { injectable } from "tsyringe";


@injectable()
export class UserRepository implements usertype.IUserRepository {
   async findByEmail(email: string): Promise<usertype.TUser | null> {
      return await User.findOne({ email }); 
   }
   async create(input: usertype.TCustomerRegisterationInput): Promise<usertype.TUser> {
      return await User.create(input); 
   }
   async findById(userId: string): Promise<usertype.TUser | null> {
      return await User.findById(userId)
   }
   async fetchAllCustomer(): Promise<usertype.TUser[]> {
      return await User.find()
   }
}