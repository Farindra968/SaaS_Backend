import express, { Router } from "express";
import asyncHandler from "../../utils/asyncHandler";
import TeacherController from "../../controller/teacher/teacher.controller";

const router:Router = express.Router()

router.route("/").post( asyncHandler(TeacherController.teacherLogin))

export default router