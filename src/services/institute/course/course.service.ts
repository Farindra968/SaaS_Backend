import sequelize from "../../../config/dbConnection";
import { ICourse } from "../../../global";

const createCourse = async (Data: ICourse, instituteNumber: string) => {
  await sequelize.query(
    ` INSERT INTO course_${instituteNumber} (courseName, coursePrice, courseCategory, courseDuration, courseDescription, courseLevel, courseImage) VALUES(?,?,?,?,?,?,?)`,
    {
      replacements: [
        Data.courseName,
        Data.coursePrice,
        Data.courseCategory,
        Data.courseDuration,
        Data.courseDescription,
        Data.courseLevel,
        Data.courseImage,
      ],
    }
  );
};

// deleteCourse
const deleteCourse = async (instotuteNumber: string, courseId: any) => {
  // 1. check first did the course exists or not
  const [findCourse] = await sequelize.query(
    `SELECT * FROM course_${instotuteNumber} WHERE id = ${courseId}`
  );
  // 2. if course not exist
  if (findCourse.length === 0 || !findCourse) {
    throw { message: "Course Not Found" };
  }
  await sequelize.query(
    `DELETE FROM  course_${instotuteNumber} WHERE id = ${courseId}`
  );
};

// get all course
const getAllCourse = async(instotuteNumber:string)=>{
    return await sequelize.query(`SELECT * FROM course_${instotuteNumber}`)
}

//get Single Course
const getSingleCourse = async(instituteNumber:string, courseId:any)=> {
    return await sequelize.query(`SELECT * FROM course_${instituteNumber} WHERE id=?`, {
        replacements: [courseId]
    })
}

export { createCourse, deleteCourse, getAllCourse, getSingleCourse };
