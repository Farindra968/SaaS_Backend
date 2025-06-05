import jwt from "jsonwebtoken"
import envConfig from "../config/config"

interface ITokenData {
    id: string;
    email: string;
    userName: string;
    phoneNumber: string;
    role?: string; // Optional, if you want to include user role in the token
}
const jsonToken = (data:ITokenData)=>{
    if(!envConfig.jsonSecret){
        throw { statusCode: 500, message: "JSON secret is not defined in environment variables" };
    }
    const token = jwt.sign(data, envConfig.jsonSecret, {expiresIn: 60*60} ) // tokem expire in 1 hour
    console.log("JWT Token generated:", token);
    return token;
}

export {jsonToken}