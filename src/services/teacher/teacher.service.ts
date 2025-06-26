import { QueryTypes } from "sequelize";
import sequelize from "../../config/dbConnection";
import bcrypt from "bcryptjs";

interface ITeacherLogin {
  id: string,
  teacherEmail: string;
  teacherPassword: string;
  instituteCode: string;
}
const teacherLogin = async (data: ITeacherLogin) => {
  const teacherData: ITeacherLogin[] = await sequelize.query(
    `SELECT * FROM teacher_${data.instituteCode} WHERE teacherEmail = ?`,
    {
      type: QueryTypes.SELECT,
      replacements: [data.teacherEmail],
    }
  );

  if (teacherData.length === 0 || !teacherData) {
    throw { statusCode: 401, message: "Invalid credentials" };
  }
  const isMatch = await bcrypt.compare(
    data.teacherPassword,
    teacherData[0].teacherPassword
  );
  if (!isMatch) {
    throw { statusCode: 401, message: "Invalid credentials" };
  }

  return teacherData;
};

export { teacherLogin };
