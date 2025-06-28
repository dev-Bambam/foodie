import { container } from "tsyringe";
import { UserService, IUserService } from "./service/user.service";
import { UserController } from "./controller/user.controller";

// Register services
container.register<IUserService>("IUserService", {
   useClass: UserService,
});

container.registerSingleton(UserController);

export { container };
