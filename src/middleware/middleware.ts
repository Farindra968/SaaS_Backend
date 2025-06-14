import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { verifyToken } from "../utils/jwttoken";

interface IExtendRequest extends Request {
  user?: {
    id: string,
    email: string;
    role: string;
    userName: string | null;
  };
}

class Middleware {
  static async isLoggedIn(
    req: IExtendRequest,
    res: Response,
    next: NextFunction
  ) {
    const authToken = req.headers.authorization;
    console.log(authToken);
    // jwt verify
    verifyToken(authToken) // src/utils/jwttoken.ts
      // for success
      .then(async (data: any) => {
        // validing data from User Model
        const userData = await User.findByPk(data);
        console.log(`Userdata ${userData}`);
        // if not valid
        if (!userData) {
          res.status(403).json({ message: "No User found" });
          return;
        } else {
          req.user = userData;
          next();
        }
      })
      // for error
      .catch(() => {
        res.status(401).send("Invalid Token");
      });
  }
}

export default Middleware;
