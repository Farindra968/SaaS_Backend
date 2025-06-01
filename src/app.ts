import express from "express";
import envConfig from "./config/config";
import userRoute from "./routes/user.routes"

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

// Routes
app.use("/api/users", userRoute)

export default app;