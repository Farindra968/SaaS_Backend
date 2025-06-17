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
  static async createInstitute(
    req: IExtendRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const {
        instituteName,
        instituteEmail,
        institutePhoneNo,
        instituteAddress,
      } = req.body;
      const userData = req.user;
      const reqInstituteNo = req.instituteNumber;
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
      console.log(`This is institute Number ==== ${instituteNumber}`);
      req.instituteNumber = instituteNumber
      console.log(`This is request Institute Number ${req.instituteNumber}`)

      // Pass req.body directly (ensure your service expects this shape)
      const instituteTable = await createInstitute(
        instituteNumber,
        req.body,
        userData,
      );
      next();
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  // create teacher
  static async createTeacherTable(
    req: IExtendRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const instituteNumber: any = req?.instituteNumber;
      const teacherTable = await createTeacherTable(instituteNumber);
      next();
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // create Student
  static async createStudentTable(
    req: IExtendRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const instituteNumber: any = req?.instituteNumber;
      const studentTable = await createStudentTable(instituteNumber);
      next();
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // create Course
  static async createCourseTable(req: IExtendRequest, res: Response) {
    try {
      const instituteNumber: any = req?.instituteNumber;
      console.log(req?.instituteNumber)
      const CourseTable = await createCourseTable(instituteNumber);
      res.status(201).json({
        istituteCode: `${instituteNumber}, ${req.instituteNumber}`,
        message:
          "Institute Created successfully with Teacher Table, Student Table, & Course Table",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export default InstituteController;
