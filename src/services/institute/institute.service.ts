import sequelize from "../../config/dbConnection";
import { ROLE_INSTITUTE } from "../../constant/role";
import { IInstitute, ITeacher } from "../../global";
import User from "../../models/user.model";
import { categories } from "../../seed";

// create Institute
const createInstitute = async (instituteNumber: Number, data: IInstitute) => {
  await sequelize.query(`CREATE TABLE IF NOT EXISTS institute_${instituteNumber} (
    id VARCHAR(36) PRIMARY KEY NOT NULL UNIQUE DEFAULT (UUID()),
    instituteName VARCHAR(255) NOT NULL,
    instituteEmail VARCHAR(255) NOT NULL UNIQUE,
    institutePhoneNo VARCHAR(255) NOT NULL UNIQUE,
    instituteAddress VARCHAR(255),
    instituteDescription TEXT,
    instituteLogo VARCHAR(255),
    instituteVatNo VARCHAR(255),
    institutePanNo VARCHAR(255),
    createdAT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`);

  await sequelize.query(
    `INSERT INTO institute_${instituteNumber} (instituteName, instituteEmail, institutePhoneNo, instituteAddress, instituteVatNo, institutePanNo ) VALUES (?,?,?,?,?,?)`,
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

const userinstituteHistory = async (user: any, instituteNumber: Number) => {
  // adding institute history -
  await sequelize.query(`CREATE TABLE IF NOT EXISTS user_institute (
    id VARCHAR(36) PRIMARY KEY NOT NULL UNIQUE DEFAULT (UUID()),
    userId VARCHAR(225) REFERENCES user(id),
    userName VARCHAR(225) REFERENCES user(userName),
    instituteNumber VARCHAR(255) UNIQUE
    )`);

  if (user) {
    await sequelize.query(
      `INSERT INTO user_institute (userId, userName, instituteNumber) VALUES (?,?,?)`,
      {
        replacements: [user?.id, user?.userName, instituteNumber],
      }
    );
    // add instituteNumber as instituteCode in user model
    await User.update(
      {
        instituteCode: instituteNumber,
        role: ROLE_INSTITUTE,
      },
      { where: { id: user.id } }
    );
  }
};
// create Teacher
const createTeacherTable = async (instituteNumber: Number) => {
  await sequelize.query(`CREATE TABLE IF NOT EXISTS teacher_${instituteNumber} (
id VARCHAR(36) PRIMARY KEY NOT NULL UNIQUE DEFAULT (UUID()),
    teacherName VARCHAR(255) NOT NULL,
    teacherEmail VARCHAR(255) NOT NULL UNIQUE,
    teacherPhone VARCHAR(255) NOT NULL UNIQUE,
    teacherAddress VARCHAR(255) NOT NULL UNIQUE,
    teacherBio TEXT,
    teacherProfile VARCHAR(255),
    teacherSalary VARCHAR(255) NOT NULl,
    joinedDate DATE DEFAULT CURRENT_DATE,
    teacherPasword VARCHAR(255) NOT NULL,
    teacherExpert ENUM("junior", "mid", "expert") NOT NULL DEFAULT 'junior',
    teacherStatus ENUM("pending", "active", "suspended") NOT NULL DEFAULT "pending",
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);
};

// create Teacher
const createStudentTable = async (instituteNumber: Number) => {
  await sequelize.query(`CREATE TABLE IF NOT EXISTS student_${instituteNumber} (
    id VARCHAR(36) PRIMARY KEY NOT NULL UNIQUE DEFAULT (UUID()),
    studentName VARCHAR(255) NOT NULL,
    studentEmail VARCHAR(255) NOT NULL UNIQUE,
    studentPhone VARCHAR(255) NOT NULL UNIQUE,
    studentAddress VARCHAR(255) NOT NULL UNIQUE,
    studentBio TEXT,
    studentProfile VARCHAR(255),
    enrolledDate Date,
    studentStatus ENUM("pending", "active", "suspended") NOT NULL  DEFAULT "pending",
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);
};

// createCourseTable
const createCourseTable = async (instituteNumber: Number) => {
  await sequelize.query(`
  CREATE TABLE IF NOT EXISTS course_${instituteNumber} (
    id VARCHAR(36) PRIMARY KEY NOT NULL UNIQUE DEFAULT (UUID()),
    courseName VARCHAR(255) NOT NULL,
    coursePrice DECIMAL(10, 2) NOT NULL,
    courseImage  VARCHAR(255),
    courseDescription TEXT,
    courseDuration VARCHAR(100),
    courseLevel ENUM("beginner","intermediate","advance") NOT NULL DEFAULT "beginner",
    categoryId VARCHAR(36) NOT NULL REFERENCEs courseCategory_${instituteNumber} (id),
    isPublished BOOLEAN DEFAULT false,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`);
};

const createCategoryTable = async (instituteNumber: Number) => {
  await sequelize.query(`CREATE TABLE IF NOT EXISTS courseCategory_${instituteNumber} (
    id VARCHAR(36) PRIMARY KEY NOT NULL UNIQUE DEFAULT (UUID()),
    categoryName VARCHAR(255) NOT NULL UNIQUE,
    categoryDescription TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP  ON UPDATE CURRENT_TIMESTAMP)`);

  // inserting default categories
  // for (const category of categories) {
  //     await sequelize.query(` INSERT INTO courseCategory_${instituteNumber} (categoryName, categoryDescription) VALUES(?,?)`,{
  //     replacements: [category.categoryName, category.categoresDescription]
  //   })
  // }
};

export {
  createInstitute,
  userinstituteHistory,
  createTeacherTable,
  createStudentTable,
  createCourseTable,
  createCategoryTable,
};
