import { Request, Response } from "express";
import User from "../../../models/user.model";
import bcrypt from "bcryptjs"


const authRegister = async (data:any)=>{
    // Password hashing
    const hassPassword =  bcrypt.hashSync(data.password, 12)

    const register =  await User.create({
        userName: data.userName, 
        email: data.email, 
        // in password inserting hash password in database
        password: hassPassword, 
        phoneNumber: data.phoneNumber
    })
    if(!register) {
        throw new Error("User registration failed");
    }
    return register

}

export default { authRegister };