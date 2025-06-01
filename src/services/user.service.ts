import User from "../models/user.model"

const FectUser = async ()=> {
    return await User.findAll()
}

export default {FectUser};