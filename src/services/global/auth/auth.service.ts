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


const authLogin = async (data: any) => {
    const user = await User.findOne({ where: { email: data.email } });
    if (!user) {
        throw new Error("Invalid email or password"); // Generic message
    }
    //comparing the data password (hash /excrypt) to user input password
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }

    // Optionally, generate JWT or handle session here

    return user;
};


export default { authRegister, authLogin };