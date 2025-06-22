import jwt from "jsonwebtoken";
import envConfig from "../config/config";

interface ITokenData {
  id: string;
  email: string;
  userName: string;
  role?: string; // Optional, if you want to include user role in the token
  instituteCode?: string
}

const jsonToken = (data: ITokenData) => {
  if (!envConfig.jsonSecret) {
    throw {
      statusCode: 500,
      message: "JSON secret is not defined in environment variables",
    };
  }
const token = jwt.sign(data, envConfig.jsonSecret, { expiresIn: 30 * 24 * 60 * 60 });
  console.log("JWT Token generated:", token);
  return token;
};

const verifyToken = async(authToken:any)=>{
  return await new Promise((resolve, reject)=>{
    // if Secret key not found
    if(!envConfig.jsonSecret) {
      throw {
        statusCode: 500,
      message: "JSON secret is not defined in environment variables",
    };
    } 
    jwt.verify(authToken, envConfig.jsonSecret, (error:any, data:any)=>{
      if(error) {return reject(error)};
      resolve(data);

    })
  })
}


export { jsonToken, verifyToken };
