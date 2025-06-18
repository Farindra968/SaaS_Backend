import express, { Router } from "express";
import CourseController from "../../../controller/institute/course/course.controller";
import Middleware from "../../../middleware/middleware";
import asyncHandler from "../../../utils/asyncHandler";

const router:Router = express.Router();

router.route("/").get(Middleware.isLoggedIn, asyncHandler(CourseController.getAllCourse))
router.route("/add").post(Middleware.isLoggedIn, asyncHandler(CourseController.createCourse))

export default router