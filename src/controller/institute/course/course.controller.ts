import { Response } from "express";
import { IExtendRequest } from "../../../global";
import {
  createCourse,
  deleteCourse,
  getAllCourse,
  getSingleCourse,
} from "../../../services/institute/course/course.service";

class CourseController {
  // create Coursec - ✔
  static async createCourse(req: IExtendRequest, res: Response) {
    const {
      courseName,
      coursePrice,
      categoryId,
      courseDuration,
      courseDescription,
      courseLevel,
    } = req.body;
    const courseImage = req.file; // Assuming you are using multer for file upload
    console.log("courseImage from User Model == controller", courseImage);
    const instituteNumber: any = req.user?.instituteCode;
    console.log(
      "instituteNumber from User Model == controller",
      instituteNumber
    );

    // validation
    if (
      !courseName ||
      !coursePrice ||
      !categoryId ||
      !courseDuration ||
      !courseDescription ||
      !courseImage ||
      !courseLevel
    ) {
      res.status(400).json({
        message:
          "Course Name, Image, Price, Category, Duration, description, level is required",
      });
      return;
    }
    const courseData = await createCourse(
      req.body,
      courseImage,
      instituteNumber
    );
    console.log(courseData);
    res.status(201).json({ message: "Course Add Successfully" });
  }

  // delete Course - ✔
  static async deleteCourse(req: IExtendRequest, res: Response) {
    //1. course id required:
    const { courseId } = req.params;
    //2. institute Number required
    const instituteNumber: any = req?.user?.instituteCode;

    const result = await deleteCourse(instituteNumber, courseId);

    res.status(200).json({ message: "Course Deleted Successfully" });
  }

  // get All Course ‍‍‍‍‍‍= ✔
  static async getAllCourse(req: IExtendRequest, res: Response) {
    const instituteNumber: any = req?.user?.instituteCode;
    console.log(
      `This is institute controller get All Category from req.user.institutecode = ${req.user?.instituteCode}`
    );

    const allCourse = await getAllCourse(instituteNumber);

    res
      .status(200)
      .json({ message: "Course fetch Successfully", data: allCourse });
  }

  //get Single Course = ✔
  static async getSingleCourse(req: IExtendRequest, res: Response) {
    //1. course id required
    const { courseId } = req.params;
    //2. institute Number is required
    const instituteNumber: any = req?.user?.instituteCode;

    const singleCourse = await getSingleCourse(instituteNumber, courseId);
    if (!singleCourse) {
      res.status(400).json({ message: "Request course is not ofund" });
      return;
    }

    res
      .status(200)
      .json({ message: "Data Fetch Successfully", data: singleCourse });
  }
}

export default CourseController;
