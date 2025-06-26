import { IUser } from "../../../Models/user.model";
import { Types } from "mongoose";
import { IRegisterInput } from "../types/user.types";

interface IUserRepository {
   create(input: IRegisterInput): Promise<IUser>;
   findByEmail(email: string): Promise<IUser | null>;
   findById(userId: Types.ObjectId): Promise<IUser | null>;
}

export { IUserRepository };
