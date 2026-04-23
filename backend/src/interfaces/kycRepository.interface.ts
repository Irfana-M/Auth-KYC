import { IUser } from "./user.interface";

export interface IKycRepository {
  updateUserKyc(
    userId: string,
    imageUrl: string,
    videoUrl: string
  ): Promise<any>;
  
  getUserById(userId: string): Promise<IUser | null>;
}