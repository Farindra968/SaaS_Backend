import {config} from "dotenv";

config()

const envConfig = {
    portNumber: process.env.PORT,
    databaseName: process.env.DB_NAME,
    databaseUser: process.env.DB_USER,
    databasePassword: process.env.DB_PASSWORD,
    databaseHost: process.env.DB_HOST,
    databasePort: process.env.DB_PORT,
    jsonSecret: process.env.JSON_SECRET
}


export default envConfig;