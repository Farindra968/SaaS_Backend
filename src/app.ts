import express from "express";
import envConfig from "./config/config";

const app = express();

app.use(express.json()) // body parser middleware to parse JSON requests

app.get("/", (req, res)=>{
    res.json({
        name: "SaaS Edu",
        description: "A SaaS application for educational purposes",
        version: "1.0.0",
        author: "Farindra",
        port: envConfig.portNumber
    })
})

export default app;