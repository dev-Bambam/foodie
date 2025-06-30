import { container } from "tsyringe";
import { UserRepository } from "../../api/user/repositories/user.repo";
import { IUserRepository } from "../../api/user/types/user.types";

// Register UserRepository with the User Model
container.register<IUserRepository>('IUserRepository', {
    useClass: UserRepository
});