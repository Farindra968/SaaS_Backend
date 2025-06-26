import { Request, Response } from "express";
import { PASSWORD_REGEX } from "../../constant/regex";
import { teacherLogin } from "../../services/teacher/teacher.service";
import { jsonToken } from "../../utils/jwttoken";
import { ITeacherData } from "../../global";
class TeacherController {
  // teacher login
  static async teacherLogin(req: Request, res: Response) {
    //1. req.body
    const { teacherEmail, teacherPassword, instituteCode } = req.body;
    //2. validation
    if (!teacherEmail || !teacherPassword || !instituteCode) {
      res
        .status(404)
        .json({
          messag: "Teacher Email, Password & Institute Code is required",
        });
      return;
    }
    if (!PASSWORD_REGEX.test(teacherPassword)) {
      res.status(422).json({
        message:
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      });
      return;
    }
    // 3.
    const teacherData = await teacherLogin(req.body);
const token = jsonToken({
  id: teacherData[0].id,
  instituteNumber: instituteCode,
});

    req.headers.authorization = token;
    res.status(200).json({ message: "Login Successfully ", token });
  }
}

export default TeacherController;
