import { Request } from "express";

 interface IExtendRequest extends Request{
    user?: {
        id: string,
        email: string,
        role: string,
        username: string | null
    }
}

export type {IExtendRequest}