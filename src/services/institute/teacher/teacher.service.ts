import { QueryTypes } from "sequelize";
import sequelize from "../../../config/dbConnection";
import uploadFile from "../../../utils/file";
import generateRandomPassword from "../../../utils/generateRandomPassword";
import Mailer from "../../../utils/sendMail";
import sendMail from "../../../utils/sendMail";
import teacherWelcomeEmail from "../../../mail/teacherWelcome";
import { ITeacherData } from "../../../global";

const createTeacher = async (
  data: ITeacherData,
  instituteNumber: Number,
  teacherProfile: Express.Multer.File
) => {
  // handeling file / uploading fie in cloudinary
  const profileImage = await uploadFile([teacherProfile]);
  if (!profileImage[0]?.url) {
    throw new Error("Failed to upload teacher profile image.");
  }

  // random pass
  const password = await generateRandomPassword(data.teacherName);
  await sequelize.query(
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
        password.hasspassword,
      ],
    }
  );

  console.log("ReplaceMent", [
    data.teacherName,
    data.teacherEmail,
    data.teacherPhone,
    data.teacherAddress,
    data.teacherBio,
    profileImage[0]?.url,
    data.teacherSalary,
    data.teacherExpertise,
    password.hasspassword,
  ]);

  const teacherId: { id: string }[] = await sequelize.query(
    `SELECT id FROM teacher_${instituteNumber} WHERE teacherEmail =?`,
    {
      type: QueryTypes.SELECT,
      replacements: [data.teacherEmail],
    }
  );

  await sequelize.query(
    `UPDATE course_${instituteNumber} SET teacherId=? WHERE id=?`,
    {
      type: QueryTypes.UPDATE,
      replacements: [teacherId[0].id, data.courseId],
    }
  );

  // send mail function
  const plainPassword = password.plaintext;

  const mailInforation = {
    to: data.teacherEmail,
    subject: `Welcome ${data.teacherName} as a Mentor of Edu Academy`,
    html: teacherWelcomeEmail(plainPassword, data),
  };
  await sendMail(mailInforation);
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
