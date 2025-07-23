"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tsyringe_1 = require("tsyringe");
const bcryptjs_1 = require("bcryptjs");
const CustomError_1 = require("../../../Utils/Error/CustomError");
const jwt_1 = require("../../../Utils/token/jwt");
let AuthService = class AuthService {
    constructor(UserRepo) {
        this.UserRepo = UserRepo;
    }
    async login(loginInput) {
        const { email, password } = loginInput;
        const user = await this.UserRepo.findByEmail(email);
        console.log(user);
        if (!user) {
            throw new CustomError_1.NotFoundError("user not found");
        }
        const validPassword = await (0, bcryptjs_1.compare)(password, user.password);
        if (!validPassword) {
            throw new CustomError_1.BadRequestError("incorrect password", "PASSWORD_ERR");
        }
        const token = (0, jwt_1.generateToken)({ userId: user.id, role: user.role });
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            address: user.address,
            token,
            createdAt: user.createdAt,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IUserRepository")),
    __metadata("design:paramtypes", [Object])
], AuthService);
