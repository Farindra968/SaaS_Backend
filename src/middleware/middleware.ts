import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import envConfig from "../config/config";
import User from "../models/user.model";

class Middleware {
  static async isLoggedIn(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const token = req.headers.authorization;
    console.log(`middleware:${token}`);
    if (!token) {
      res.status(401).send("Unauthorized Login");
      return;
    }
    if (!envConfig.jsonSecret) {
      res.status(400).send("No JSON SECRET Key");
      return;
    }
    /// verifying jwt token
    jwt.verify(token, envConfig.jsonSecret, async (error, data: any) => {
      if (error) {
        res.status(403).json("Invalid Token");
      } else {
        const userData = await User.findByPk(data.id);
        if (!userData) {
          res.status(403).json({ message: "No User Found with this token" });
        } else {
          console.log(`UserData= ${data.userName}, ${data.email}`);
          next();
        }
      }
    });
  }
}

export default Middleware;
