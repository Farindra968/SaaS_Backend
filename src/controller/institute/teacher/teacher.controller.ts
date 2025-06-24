import { Response } from "express";
import { IExtendRequest } from "../../../global";
import { createTeacher } from "../../../services/institute/teacher/teacher.service";

class TeacherController {
  // create teacher
  static async createTeacher(req: IExtendRequest, res: Response) {
    //1. destructure req.body
    const {
      teacherName,
      teacherEmail,
      teacherPhone,
      teacherAddress,
      teacherBio,
      teacherSalary,
      teacherExpertise,
    } = req.body;

    //2. file upload through multer
    const teacherProfile: any = req.file ? req.file : null;

    //3. instituteNumber from req.user
    const instituteNumber: any = req.user?.instituteCode;

    // validation
    if (
      !teacherName ||
      !teacherEmail ||
      !teacherPhone ||
      !teacherAddress ||
      !teacherBio ||
      !teacherSalary ||
      !teacherExpertise
    ) {
      res
        .status(400)
        .json({
          message:
            "Teacher Name, Email, Phone Number, Address, Bio, Salary, Joined, Expertise are required",
        });
      return;
    }

    // createTeacher services
    const result = await createTeacher(
      req.body,
      instituteNumber,
      teacherProfile
    );
    res.status(2001).json({ message: "Teacher Add successfully ", result });
  }
}


export default TeacherController