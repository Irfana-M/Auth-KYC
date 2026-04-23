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
exports.UserController = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../types");
const httpStatusCode_1 = require("../constants/httpStatusCode");
const logger_1 = __importDefault(require("../utils/logger"));
const ms_1 = __importDefault(require("ms"));
const appError_1 = require("../types/appError");
const messages_1 = require("../constants/messages");
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    register = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw new appError_1.AppError(messages_1.MESSAGES.REQUIRED_FIELDS, httpStatusCode_1.HttpStatusCode.BAD_REQUEST);
            }
            const { user } = await this.userService.register(email, password);
            logger_1.default.info(`User registered: ${email}`);
            res.status(httpStatusCode_1.HttpStatusCode.CREATED).json({
                success: true,
                message: messages_1.MESSAGES.REGISTER_SUCCESS,
                data: user,
            });
        }
        catch (error) {
            next(error);
        }
    };
    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw new appError_1.AppError(messages_1.MESSAGES.REQUIRED_FIELDS, httpStatusCode_1.HttpStatusCode.BAD_REQUEST);
            }
            const { accessToken, refreshToken } = await this.userService.login(email, password);
            const expires = process.env.REFRESH_COOKIE_EXPIRES;
            if (!expires) {
                throw new Error("REFRESH_COOKIE_EXPIRES not defined in .env");
            }
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: (0, ms_1.default)(expires),
            });
            logger_1.default.info(`User logged in: ${email}`);
            res.status(httpStatusCode_1.HttpStatusCode.OK).json({
                success: true,
                message: messages_1.MESSAGES.LOGIN_SUCCESS,
                data: { accessToken },
            });
        }
        catch (error) {
            next(error);
        }
    };
    refresh = async (req, res, next) => {
        try {
            const refreshToken = req.cookies?.refreshToken;
            if (!refreshToken) {
                throw new appError_1.AppError(messages_1.MESSAGES.NO_REFRESH_TOKEN, httpStatusCode_1.HttpStatusCode.UNAUTHORIZED);
            }
            const { accessToken } = await this.userService.refreshToken(refreshToken);
            res.status(httpStatusCode_1.HttpStatusCode.OK).json({
                success: true,
                message: messages_1.MESSAGES.TOKEN_REFRESHED,
                data: { accessToken },
            });
        }
        catch (error) {
            next(error);
        }
    };
    logout = async (req, res) => {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        res.status(httpStatusCode_1.HttpStatusCode.OK).json({
            success: true,
            message: messages_1.MESSAGES.LOGOUT_SUCCESS,
        });
    };
    getUsers = async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search || "";
            const data = await this.userService.getUsersPaginated(page, limit, search);
            console.log(data);
            res.status(httpStatusCode_1.HttpStatusCode.OK).json({
                success: true,
                data,
            });
        }
        catch (error) {
            next(error);
        }
    };
};
exports.UserController = UserController;
exports.UserController = UserController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.UserService)),
    __metadata("design:paramtypes", [Object])
], UserController);
