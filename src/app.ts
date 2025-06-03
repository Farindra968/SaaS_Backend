import express from "express";
import envConfig from "./config/config";
import userRoute from "./routes/user.routes"
import authRoute from "./routes/global/auth/auth.routes"

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
//auth routes
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)

export default app;