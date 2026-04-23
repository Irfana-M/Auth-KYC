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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const messages_1 = require("../constants/messages");
const inversify_1 = require("inversify");
const types_1 = require("../types");
const user_mapper_1 = require("../mappers/user.mapper");
const appError_1 = require("../types/appError");
const httpStatusCode_1 = require("../constants/httpStatusCode");
let UserService = class UserService {
    _userRepo;
    constructor(_userRepo) {
        this._userRepo = _userRepo;
    }
    async register(email, password) {
        if (!email || !password) {
            throw new appError_1.AppError(messages_1.MESSAGES.REQUIRED_FIELDS, httpStatusCode_1.HttpStatusCode.BAD_REQUEST);
        }
        const existing = await this._userRepo.findByEmail(email);
        if (existing) {
            throw new appError_1.AppError(messages_1.MESSAGES.USER_EXISTS, httpStatusCode_1.HttpStatusCode.BAD_REQUEST);
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await this._userRepo.create({
            email,
            password: hashedPassword,
        });
        return {
            user: (0, user_mapper_1.mapUserToDTO)(user),
        };
    }
    async login(email, password) {
        if (!email || !password) {
            throw new appError_1.AppError(messages_1.MESSAGES.REQUIRED_FIELDS, httpStatusCode_1.HttpStatusCode.BAD_REQUEST);
        }
        const user = await this._userRepo.findByEmail(email);
        if (!user) {
            throw new appError_1.AppError(messages_1.MESSAGES.INVALID_CREDENTIALS, httpStatusCode_1.HttpStatusCode.UNAUTHORIZED);
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            throw new appError_1.AppError(messages_1.MESSAGES.INVALID_CREDENTIALS, httpStatusCode_1.HttpStatusCode.UNAUTHORIZED);
        }
        const accessToken = jsonwebtoken_1.default.sign({ id: user._id.toString() }, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRES });
        const refreshToken = jsonwebtoken_1.default.sign({ id: user._id.toString() }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES });
        return { accessToken, refreshToken };
    }
    async refreshToken(refreshToken) {
        if (!refreshToken) {
            throw new appError_1.AppError(messages_1.MESSAGES.UNAUTHORIZED, httpStatusCode_1.HttpStatusCode.UNAUTHORIZED);
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            const accessToken = jsonwebtoken_1.default.sign({ id: decoded.id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
            return { accessToken };
        }
        catch (error) {
            throw new appError_1.AppError(messages_1.MESSAGES.TOKEN_EXPIRED, httpStatusCode_1.HttpStatusCode.UNAUTHORIZED);
        }
    }
    async getUsersPaginated(page, limit, search) {
        const result = await this._userRepo.findAllPaginated(page, limit, search);
        return {
            users: result.users.map(user_mapper_1.mapUserToDTO),
            total: result.total,
            pages: result.pages,
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.UserRepository)),
    __metadata("design:paramtypes", [Object])
], UserService);
