import streamifier from "streamifier";
import cloudinary from "../config/cloudinary";

export const uploadToCloudinary = (
  file: Express.Multer.File,
  folder: string
) => {
  return new Promise<any>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
      },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};