import { v2 as cloudinary } from "cloudinary";
import envConfig from "./config";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configuration
cloudinary.config({
  cloud_name:  envConfig.cloudinaryName,
  api_key: envConfig.cloudinaryKey,
  api_secret: envConfig.cloudinarySecret,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: envConfig.cloudinaryFolder,
    // format: "jpg png webp jpeg pdf",
  }),
});

export { cloudinary, storage };
