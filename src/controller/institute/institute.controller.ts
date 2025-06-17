import { NextFunction, Request, Response } from "express";
import {
  createInstitute,
  createTeacherTable,
  createStudentTable,
  createCourseTable,
} from "../../services/institute/institute.service";
import generateRandomInsituteNumber from "../../utils/generateRandomInsituteNumber";
import { IExtendRequest } from "../../global";

class InstituteController {
  // create Institute
  static async createInstitute(req: IExtendRequest, res: Response, next:NextFunction) {
    try {
      const {
        instituteName,
        instituteEmail,
        institutePhoneNo,
        instituteAddress,
      } = req.body;
      const userData = req.user;
      console.log(`This is user data = ${userData}`);
      const instituteVatNo = req.body.instituteVatNo || null;
      const institutePanNo = req.body.institutePanNo || null;

      // Validation
      if (
        !instituteName ||
        !instituteEmail ||
        !institutePhoneNo ||
        !instituteAddress
      ) {
        res.status(400).json({
          message: "Institute Name, Email, Phone Number & Address are required",
        });
        return;
      }

      if (!instituteVatNo && !institutePanNo) {
        res.status(400).json({
          message: "Either Institute VAT Number or PAN Number must be provided",
        });
        return;
      }

      // Generate unique institute number
      const instituteNumber = generateRandomInsituteNumber();

      // Pass req.body directly (ensure your service expects this shape)
      const data = await createInstitute(instituteNumber, req.body, req.user);

      res.status(201).json({
        message: "Institute created successfully",
        data,
        instituteNumber,
      });
      next()
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  // create teacher
  static async createTeacherTable(req: IExtendRequest, res: Response, next:NextFunction) {
    try {
      const userData = req.user;
      const teacherTable = await createTeacherTable(userData);
      res.status(201).json({ teacherTable, message: "Teacher Table Created" });
      next()
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // create Student
  static async createStudentTable(req: IExtendRequest, res: Response, next:NextFunction) {
    try {
      const userData = req.user;
      const studentTable = await createStudentTable(userData);
      res.status(201).json({ studentTable, message: "Student Table Created" });
      next();
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // create Course
  static async createCourseTable(req: IExtendRequest, res: Response, next:NextFunction) {
    try {
      const userData = req.user;
      const CourseTable = await createCourseTable(userData);
      res.status(201).json({ CourseTable, message: "Course Table Created" });
      next
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export default InstituteController;
