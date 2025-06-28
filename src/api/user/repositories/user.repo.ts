import { IUserRepository } from "../types/user.types";
import User from "../../../Models/user.model";
import { IUser } from "../types/user.types";
import { injectable } from "tsyringe";

@injectable()
export class UserRepository implements IUserRepository{}