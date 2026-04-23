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
exports.KycController = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../types");
const httpStatusCode_1 = require("../constants/httpStatusCode");
const messages_1 = require("../constants/messages");
const appError_1 = require("../types/appError");
let KycController = class KycController {
    kycService;
    constructor(kycService) {
        this.kycService = kycService;
    }
    uploadKyc = async (req, res) => {
        try {
            const files = req.files;
            if (!files?.image || !files?.video) {
                throw new appError_1.AppError(messages_1.MESSAGES.KYC.REQUIRED, httpStatusCode_1.HttpStatusCode.BAD_REQUEST);
            }
            const userId = req.user?.id;
            if (!userId) {
                throw new appError_1.AppError(messages_1.MESSAGES.UNAUTHORIZED, httpStatusCode_1.HttpStatusCode.UNAUTHORIZED);
            }
            const result = await this.kycService.uploadKyc(userId, files.image[0], files.video[0]);
            res.status(httpStatusCode_1.HttpStatusCode.OK).json({
                success: true,
                message: messages_1.MESSAGES.KYC.SUCCESS,
                data: result,
            });
        }
        catch (error) {
            const statusCode = error instanceof appError_1.AppError
                ? error.statusCode
                : httpStatusCode_1.HttpStatusCode.INTERNAL_SERVER_ERROR;
            res.status(statusCode).json({
                success: false,
                message: error.message || messages_1.MESSAGES.COMMON.INTERNAL_ERROR,
            });
        }
    };
};
exports.KycController = KycController;
exports.KycController = KycController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.KycService)),
    __metadata("design:paramtypes", [Object])
], KycController);
