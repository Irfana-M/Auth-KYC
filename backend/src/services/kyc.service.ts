import { injectable, inject } from "inversify";
import { TYPES } from "../types";
import { uploadToCloudinary } from "../utils/cloudinaryUpload";
import { KycRepository } from "../repositories/kyc.repositoory";
import { IKycService } from "../interfaces/kycService.interface";
import { AppError } from "../types/appError";
import { MESSAGES } from "../constants/messages";
import { HttpStatusCode } from "../constants/httpStatusCode";
import userModels from "../models/user.models";

@injectable()
export class KycService implements IKycService {
  constructor(
    @inject(TYPES.KycRepository)
    private kycRepository: KycRepository
  ) {}

  async uploadKyc(
    userId: string,
    image: Express.Multer.File,
    video: Express.Multer.File
  ) {

    const user = await userModels.findById(userId);

  if (!user) {
    throw new AppError(
      MESSAGES.UNAUTHORIZED,
      HttpStatusCode.UNAUTHORIZED
    );
  }

  
  if (user.kycSubmitted) {
    throw new AppError(
      MESSAGES.KYC.ALREADY_SUBMITTED,
      HttpStatusCode.BAD_REQUEST
    );
  }

    const imageResult = await uploadToCloudinary(image, "kyc/images");
    const videoResult = await uploadToCloudinary(video, "kyc/videos");

    
    await this.kycRepository.updateUserKyc(
      userId,
      imageResult.secure_url,
      videoResult.secure_url
    );

    return {
      imageUrl: imageResult.secure_url,
      videoUrl: videoResult.secure_url,
    };
  }
}