import { Container } from "inversify";
import { TYPES } from "./types";
import { IUserRepository } from "./interfaces/userRepository.interface";
import { UserRepository } from "./repositories/user.repository";
import { IUserService } from "./interfaces/userService.interface";
import { UserService } from "./services/user.service";
import { UserController } from "./controllers/user.controller";
import { KycService } from "./services/kyc.service";
import { KycController } from "./controllers/kyc.controller";
import { KycRepository } from "./repositories/kyc.repositoory";
import { IKycRepository } from "./interfaces/kycRepository.interface";
import { IKycService } from "./interfaces/kycService.interface";

const container = new Container();

container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<IKycRepository>(TYPES.KycRepository).to(KycRepository);
container.bind<IKycService>(TYPES.KycService).to(KycService);
container.bind<KycController>(TYPES.KycController).to(KycController);
export { container };