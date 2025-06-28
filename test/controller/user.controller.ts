import { injectable, inject } from "tsyringe";
import { IUserService } from "../service/user.service";

@injectable()
export class UserController {
   constructor(@inject("IUserService") private userService: IUserService) {}
}



