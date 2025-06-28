import { container } from "tsyringe";
import { UserRepository } from "../../api/user/repositories/user.repo";
import { CustomerService } from '../../api/user/services/customerService'
import User from '../../Models/user.model'
import { IUserRepository } from "../../api/user/types/user.types";

// Register UserRepository with the User Model
container.register<IUserRepository>('IUserRepository', {
    useClass: new UserRepository()
})