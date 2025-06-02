import { Request, Response } from "express";
import User from "../../../models/user.model";


const register = async (data:any)=>{
    return await User.create(data)

}

export default { register };