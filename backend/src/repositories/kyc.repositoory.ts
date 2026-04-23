import { injectable } from "inversify";
import userModels from "../models/user.models";
import { IKycRepository } from "../interfaces/kycRepository.interface";

@injectable()
export class KycRepository implements IKycRepository {


  async getUserById(userId: string) {
    return await userModels.findById(userId);
  }
  async updateUserKyc(
    userId: string,
    imageUrl: string,
    videoUrl: string
  ) {
    return await userModels.findByIdAndUpdate(
      userId,
      {
        kycSubmitted: true,
        kycImageUrl: imageUrl,
        kycVideoUrl: videoUrl,
      },
      { new: true }
    );
  }
}