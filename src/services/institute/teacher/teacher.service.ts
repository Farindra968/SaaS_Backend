import { QueryTypes } from "sequelize";
import sequelize from "../../../config/dbConnection";
import uploadFile from "../../../utils/file";
import generateRandomPassword from "../../../utils/generateRandomPassword";

interface ITeacherData {
  teacherName: string;
  teacherEmail: string;
  teacherPhone: string;
  teacherAddress: string;
  teacherBio: string;
  teacherSalary: string;
  teacherExpertise: string;
  courseId: string
}

const createTeacher = async (
  data: ITeacherData,
  instituteNumber: Number,
  teacherProfile: Express.Multer.File
) => {
  // handeling file / uploading fie in cloudinary
  const profileImage = await uploadFile([teacherProfile]);

  // random pass
  const password = generateRandomPassword(data.teacherName);
  const teacherData = await sequelize.query(
    `INSERT INTO teacher_${instituteNumber} (teacherName, teacherEmail, teacherPhone, teacherAddress, teacherBio, teacherProfile, teacherSalary, teacherExpert, teacherPasword) VALUES(?,?,?,?,?,?,?,?,?)`,
    {
      type: QueryTypes.INSERT,
      replacements: [
        data.teacherName,
        data.teacherEmail,
        data.teacherPhone,
        data.teacherAddress,
        data.teacherBio,
        profileImage[0]?.url,
        data.teacherSalary,
        data.teacherExpertise,
        (await password).hasspassword,
      ],
    }
  );

  const teacherId: {id:string}[] = await sequelize.query(`SELECT id FROM teacher_${instituteNumber} WHERE teacherEmail =?`, {
    type: QueryTypes.SELECT,
    replacements: [data.teacherEmail]
  })

  await sequelize.query(`UPDATE course_${instituteNumber} SET teacherId=? WHERE id=?`,{
    type: QueryTypes.UPDATE,
    replacements: [teacherId[0].id, data.courseId]
  })
};

// get all Teacher
const getAllTeacher = async (instituteNumber: Number) => {
  return await sequelize.query(
    `SELECT id, teacherName, teacherEmail, teacherPhone, teacherAddress, teacherBio, teacherProfile, teacherSalary, teacherExpert FROM teacher_${instituteNumber} `,
    {
      type: QueryTypes.SELECT,
    }
  );
};

// delete teacher
const deleteTeacher = async (instituteNumber: Number, teacherId: string) => {
  // 1 first check teacher exists or not
  const findTeacher = await sequelize.query(
    `SELECT * FROM  teacher_${instituteNumber} WHERE id = ?`,
    {
      type: QueryTypes.SELECT,
      replacements: [teacherId],
    }
  );
  // 2 If not exists
  if (findTeacher.length === 0 || !findTeacher) {
    throw { statusCode: 404, message: "Teacher not found" };
  }

  await sequelize.query(`DELETE FROM teacher_${instituteNumber} WHERE id = ?`, {
    type: QueryTypes.DELETE,
    replacements: [teacherId],
  });
};

export { createTeacher, getAllTeacher, deleteTeacher };
