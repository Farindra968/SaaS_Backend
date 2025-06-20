import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import envConfig from "../config/config";

const uploadFile = async (
  files: Express.Multer.File[]
): Promise<UploadApiResponse[]> => {
  return Promise.all(
    files.map(
      (file) =>
        new Promise<UploadApiResponse>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: envConfig.cloudinaryFolder, // 👈 this sets the folder in Cloudinary
            },
            (error, result) => {
              if (error || !result) return reject(error);
              resolve(result);
            }
          );

          uploadStream.end(file.buffer);
        })
    )
  );
};

export default uploadFile;
