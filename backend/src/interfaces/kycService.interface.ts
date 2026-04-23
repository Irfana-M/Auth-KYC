export interface IKycService {
  uploadKyc(
    userId: string,
    image: Express.Multer.File,
    video: Express.Multer.File
  ): Promise<{
    imageUrl: string;
    videoUrl: string;
  }>;
}