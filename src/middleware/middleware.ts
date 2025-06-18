import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { verifyToken } from "../utils/jwttoken"; // your custom async token verifier
import jwt from "jsonwebtoken";
import envConfig from "../config/config";
import { IExtendRequest } from "../global";

class Middleware {
  static async isLoggedIn(
    req: IExtendRequest,
    res: Response,
    next: NextFunction
  ) {
    const authToken = req.headers.authorization;
    console.log(`==========> ${authToken}`);

    if (!authToken) {
      res.status(401).send("Authorization token missing or invalid");
      return;
    }

    // ✅ Step 1: Using direct `jwt.verify`

    jwt.verify(authToken, envConfig.jsonSecret!, async (error, data: any) => {
      if (error || !data) {
        res.status(401).send("Invalid or expired token");
        return;
      }
      const userData = await User.findByPk(data.id, {
        attributes: ["id", "userName", "email", "role", "instituteCode"],
      });
      if (!userData) {
        res.status(404).send("User not found");
        return;
      }
      req.user = data;

      next();
    });

    // ✅ Step 2: Alternative using your `verifyToken` promise-based function
    /*verifyToken(authToken)
      .then(async(data:any) => {
        const userData = await User.findByPk(data.id)
        if(!userData) {
          res.status(404).send("User Not found")
          return;
        }
        req.user = data;
        next();
      })
      .catch(() => {
        res.status(401).send("Invalid or Expired Token")
      });*/
  }
}

export default Middleware;
