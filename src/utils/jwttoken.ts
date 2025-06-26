import jwt from "jsonwebtoken";
import envConfig from "../config/config";

const jsonToken = (encryptData: { id: string; instituteNumber?: string }) => {
  if (!envConfig.jsonSecret) {
    throw {
      statusCode: 500,
      message: "JSON secret is not defined in environment variables",
    };
  }
  const token = jwt.sign({ id: encryptData }, envConfig.jsonSecret, {
    expiresIn: "30d",
  });
  console.log("JWT Token generated:", token);
  return token;
};

const verifyToken = async (authToken: any) => {
  return await new Promise((resolve, reject) => {
    // if Secret key not found
    if (!envConfig.jsonSecret) {
      throw {
        statusCode: 500,
        message: "JSON secret is not defined in environment variables",
      };
    }
    jwt.verify(
      authToken,
      envConfig.jsonSecret,
      (error: any, encryptData: any) => {
        if (error) {
          return reject(error);
        }
        resolve(encryptData);
      }
    );
  });
};

export { jsonToken, verifyToken };
