import { v2 as cloudinary } from "cloudinary";
import envConfig from "./config";

// Configuration
const cloudinaryConfig = () => {
  console.log(envConfig.cloudinaryKey)
  cloudinary.config({
    cloud_name: "dgmayu5ic", //envConfig.cloudinaryName,
    api_key: "857433961659282",//envConfig.cloudinaryKey,
    api_secret: "xO4BYyp2T0KT5I91Kxx4FtJEWgg",//envConfig.cloudinarySecret,
  });
  
};


export default cloudinaryConfig;

