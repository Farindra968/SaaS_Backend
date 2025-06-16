import { Request } from "express";

export interface IExtendRequest extends Request {
  user?: {
    id: string,
    email: string;
    role: string;
    userName: string | null;
    instituteCode: number[] | string[]
  };

}