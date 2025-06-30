import { container } from "tsyringe";
import { UserRepository } from "../../api/user/repositories/user.repo";
import { IUserRepository } from "../../api/user/types/user.types";
import { IMenuRepo } from "../../api/menu/types/menu.type";
import { MenuRepo } from "../../api/menu/repositories/menu.repo";

// Register UserRepository with the User Service
container.register<IUserRepository>('IUserRepository', {
    useClass: UserRepository
});


// Register Menu Repository
container.register<IMenuRepo>('IMenuRepo', {
    useClass: MenuRepo
})