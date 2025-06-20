import {config} from "dotenv";

config()

const envConfig = {
    // MySQL server
    portNumber: process.env.PORT,
    databaseName: process.env.DB_NAME,
    databaseUser: process.env.DB_USER,
    databasePassword: process.env.DB_PASSWORD,
    databaseHost: process.env.DB_HOST,
    databasePort: process.env.DB_PORT,
    // JWt
    jsonSecret: process.env.JSON_SECRET,
    // cloudinary
    cloudinaryName: process.env.CLOUDINARY_NAME,
    cloudinaryKey: process.env.CLOUDINARY_API_KEY,
    cloudinarySecret: process.env.CLOUDINARY_API_SECRET,
    cloudinaryFolder: process.env.CLOUDINARY_FOLDER,
}


export default envConfig;