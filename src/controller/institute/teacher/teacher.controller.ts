import { Response } from "express";
import { IExtendRequest } from "../../../global";
import { createTeacher, getAllTeacher } from "../../../services/institute/teacher/teacher.service";

class TeacherController {
  // create teacher
  static async createTeacher(req: IExtendRequest, res: Response) {
    try {
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
    
    res.status(201).json({ message: "Teacher Add successfully ", result });
    } catch (error) {
        res.status(500).json({message: error})
    }
  }

  // get all Teacher
  static async getAllTeacher (req:IExtendRequest, res:Response) {
    //1. Destructure the institute Number from req.user
    const instituteNumber:any = req.user?.instituteCode

    if(!instituteNumber) {
        res.status(404).json({message: "Institute Number code is nor found"})
        return;
    }

    const result = await getAllTeacher(instituteNumber)
    res.status(200).json({ data:result})
  }
}


export default TeacherController