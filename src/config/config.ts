import {config} from "dotenv";

config()

const envConfig = {
    portNumber: process.env.PORT
}


export default envConfig;