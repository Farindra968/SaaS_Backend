import { Response } from "express";
import { IExtendRequest } from "../../../global";

class CourseController {
  static async createCourse(req: IExtendRequest, res: Response) {
    const {
      courseName,
      coursePrice,
      courseCategory,
      courseDuration,
      courseDescription,
      courseLevel,
    } = req.body;
    // validation
    if (
      !courseName ||
      !coursePrice ||
      !courseCategory ||
      !courseDuration ||
      !courseDescription ||
      !courseLevel
    ) {
      res.status(400).json({ message: "Course Name, Price, Category, Duration, description, level is required" });
      return;
    }
  }
}
export default CourseController;
