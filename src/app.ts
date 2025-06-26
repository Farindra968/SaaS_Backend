import express, {
  Request,
  Response,
} from "express";

import envConfig from "./config/config";

// Route Imports
import authRoute from "./routes/global/auth/auth.routes";
import instituteRoute from "./routes/institute/institute.routes";
import courseRoute from "./routes/institute/course/course.routes";
import categoryRoute from "./routes/institute/category/category.routes"
import teacherInstituteRoute from "./routes/institute/teacher/teacher.routes"
import teacherRoute from "./routes/teacher/teacher.routes"
import cloudinaryConfig from "./config/cloudinaryConfig"; 

const app = express();

// ✅ Middleware to parse JSON and URL-encoded requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Cloudinary configuration
cloudinaryConfig();

// ✅ Health check endpoint
app.get("/", (req: Request, res: Response) => {
  res.json({
    name: "SaaS Edu",
    description: "A SaaS application for educational purposes",
    version: "1.0.0",
    author: "Farindra",
    port: envConfig.portNumber,
    
  });
});



// ✅ API Routes
app.use("/api/auth", authRoute);
// Institute Route
app.use("/api/institute", instituteRoute);
app.use("/api/institute/course", courseRoute);
app.use("/api/institute/category", categoryRoute);
app.use("/api/institute/teacher", teacherInstituteRoute);

// Teacher Route
app.use("/api/teacher", teacherRoute)

export default app;
