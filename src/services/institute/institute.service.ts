import sequelize from "../../config/dbConnection";
import { ROLE_INSTITUTE } from "../../constant/role";
import { IInstitute, ITeacher } from "../../global";
import User from "../../models/user.model";

// create Institute
const createInstitute = async (
  instituteNumber: Number,
  data: IInstitute,
  user: any
) => {
  await sequelize.query(`CREATE TABLE IF NOT EXISTS institute_${instituteNumber} (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    instituteName VARCHAR(255) NOT NULL,
    instituteEmail VARCHAR(255) NOT NULL UNIQUE,
    institutePhoneNo VARCHAR(255) NOT NULL UNIQUE ,
    instituteAddress VARCHAR(255),
    instituteVatNo VARCHAR(255),
    institutePanNo VARCHAR(255),
    createdAT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`);

  // adding institute history -
  await sequelize.query(`CREATE TABLE IF NOT EXISTS user_institute (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    userId VARCHAR(225) REFERENCES user(id),
    userName VARCHAR(225) REFERENCES user(userName),
    instituteNumber VARCHAR(255) UNIQUE
    )`);
  await sequelize.query(
    `INSERT INTO user_institute (userId, userName, instituteNumber) VALUES (?,?,?)`,
    {
      replacements: [user?.id, user?.userName, instituteNumber],
    }
  );
  console.log(user?.id, user?.userName);
  // add instituteNumber as instituteCode in user model
  if (user) {
    await User.update(
      { role: ROLE_INSTITUTE, instituteCode: instituteNumber },
      { where: { id: user?.id } }
    );
  }

  await sequelize.query(
    `INSERT INTO institute_${instituteNumber} (instituteName, instituteEmail, institutePhoneNo, instituteAddress, instituteVatNo, institutePanNo) VALUES (?, ?, ?, ?, ?, ?)`,
    {
      replacements: [
        data.instituteName,
        data.instituteEmail,
        data.institutePhoneNo,
        data.instituteAddress,
        data.instituteVatNo || null,
        data.institutePanNo || null,
      ],
    }
  );
};

// create Teacher
const createTeacherTable = async (user: any) => {
  await sequelize.query(`CREATE TABLE IF NOT EXISTS teacher_${user?.instituteCode} (
    id INIT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    teacherName VARCHAR(255) NOT NULL,
    teacherEmail VARCHAR(255) NOT NULL UNIQUE,
    teacherPhone VARCHAR(255) NOT NULL UNIQUE,
    teacherAddress VARCHAR(255) NOT NULL UNIQUE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);
};

// create Teacher
const createStudentTable = async (user: any) => {
  await sequelize.query(`CREATE TABLE IF NOT EXISTS teacher_${user?.instituteCode} (
    id INIT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    studentName VARCHAR(255) NOT NULL,
    studentEmail VARCHAR(255) NOT NULL UNIQUE,
    studentPhone VARCHAR(255) NOT NULL UNIQUE,
    studentAddress VARCHAR(255) NOT NULL UNIQUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);
};

// createCourseTable
const createCourseTable = async (user: any) => {
  await sequelize.query(`
  CREATE TABLE IF NOT EXISTS teacher_${user?.instituteCode} (
    id INT PRIMARY KEY AUTO_INCREMENT,
    courseName VARCHAR(255) NOT NULL,
    coursePrice DECIMAL(10, 2) NOT NULL,
    courseCategory VARCHAR(100) NOT NULL,
    courseDescription TEXT,
    courseDuration INT, -- Duration in hours/days
    isPublished BOOLEAN DEFAULT false,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`);
};

export {
  createInstitute,
  createTeacherTable,
  createStudentTable,
  createCourseTable,
};
