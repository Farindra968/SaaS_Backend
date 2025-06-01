import { Request, Response } from "express"
import userService from "../services/user.service"

const getUser = async (req:Request, res:Response)=> {
// try catch block to handle errors
    // Fetching users from the userService
    try {
        const users = await userService.FectUser()
        res.json(users)
    } catch (error) {
        res.status(500).send({error})
    }

}


export {getUser}