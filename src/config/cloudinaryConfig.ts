import { v2 as cloudinary } from "cloudinary";
import envConfig from "./config";

// Configuration
const cloudinaryConfig = () => {
  console.log(envConfig.cloudinaryKey)
  cloudinary.config({
    cloud_name: envConfig.cloudinaryName,
    api_key: envConfig.cloudinaryKey,
    api_secret: envConfig.cloudinarySecret,
  });
  
};


export default cloudinaryConfig;

