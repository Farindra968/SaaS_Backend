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
        (await password).hasspassword,
      ],
    }
  );
};

export { createTeacher };
