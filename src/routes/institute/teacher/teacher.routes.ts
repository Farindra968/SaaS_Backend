import express, { Router } from "express";
import Middleware from "../../../middleware/middleware";
import multer from "multer";
import asyncHandler from "../../../utils/asyncHandler";
import TeacherController from "../../../controller/institute/teacher/teacher.controller";

const upload = multer({ storage: multer.memoryStorage() });
const router: Router = express.Router();

router
  .route("/")
  .post(
    Middleware.isLoggedIn,
    upload.single("teacherProfile"),
    TeacherController.createTeacher
  ).get(Middleware.isLoggedIn, asyncHandler(TeacherController.getAllTeacher))


// dynamic route
router.route("/:teacherId").delete(Middleware.isLoggedIn, asyncHandler(TeacherController.deleteTeacher))
export default router;
