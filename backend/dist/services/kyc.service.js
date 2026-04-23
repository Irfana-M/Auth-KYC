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
exports.KycService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../types");
const cloudinaryUpload_1 = require("../utils/cloudinaryUpload");
const kyc_repositoory_1 = require("../repositories/kyc.repositoory");
const appError_1 = require("../types/appError");
const messages_1 = require("../constants/messages");
const httpStatusCode_1 = require("../constants/httpStatusCode");
const user_models_1 = __importDefault(require("../models/user.models"));
let KycService = class KycService {
    kycRepository;
    constructor(kycRepository) {
        this.kycRepository = kycRepository;
    }
    async uploadKyc(userId, image, video) {
        const user = await user_models_1.default.findById(userId);
        if (!user) {
            throw new appError_1.AppError(messages_1.MESSAGES.UNAUTHORIZED, httpStatusCode_1.HttpStatusCode.UNAUTHORIZED);
        }
        if (user.kycSubmitted) {
            throw new appError_1.AppError(messages_1.MESSAGES.KYC.ALREADY_SUBMITTED, httpStatusCode_1.HttpStatusCode.BAD_REQUEST);
        }
        const imageResult = await (0, cloudinaryUpload_1.uploadToCloudinary)(image, "kyc/images");
        const videoResult = await (0, cloudinaryUpload_1.uploadToCloudinary)(video, "kyc/videos");
        await this.kycRepository.updateUserKyc(userId, imageResult.secure_url, videoResult.secure_url);
        return {
            imageUrl: imageResult.secure_url,
            videoUrl: videoResult.secure_url,
        };
    }
};
exports.KycService = KycService;
exports.KycService = KycService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.KycRepository)),
    __metadata("design:paramtypes", [kyc_repositoory_1.KycRepository])
], KycService);
