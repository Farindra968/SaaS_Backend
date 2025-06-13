import express from "express";
import envConfig from "./config/config";
import authRoute from "./routes/global/auth/auth.routes"
import instituteRoute from "./routes/institute/institute.routes"

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

// institute route
app.use("/api/institute", instituteRoute)
export default app;