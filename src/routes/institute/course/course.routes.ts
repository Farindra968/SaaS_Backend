import express, { Router } from "express";
import CourseController from "../../../controller/institute/course/course.controller";
import Middleware from "../../../middleware/middleware";
import asyncHandler from "../../../utils/asyncHandler";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const router:Router = express.Router();

router.route("/").get(Middleware.isLoggedIn, asyncHandler(CourseController.getAllCourse))
router.route("/add").post(Middleware.isLoggedIn, upload.single("courseImage"), asyncHandler(CourseController.createCourse))

//dynamic route
router.route("/:courseId").get(Middleware.isLoggedIn, asyncHandler(CourseController.getSingleCourse)).delete(Middleware.isLoggedIn, asyncHandler(CourseController.deleteCourse))

export default router