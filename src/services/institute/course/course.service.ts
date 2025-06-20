import sequelize from "../../../config/dbConnection";
import { ICourse } from "../../../global";
import uploadFile from "../../../utils/file";


// create course
// This function creates a new course in the database for a specific institute.
const createCourse = async (Data: ICourse, courseImage: Express.Multer.File, instituteNumber: string) => {
  const uploadCourseImage = await uploadFile([courseImage]);
  const courseData = await sequelize.query(
    ` INSERT INTO course_${instituteNumber} (courseName, coursePrice, courseCategory, courseDuration, courseDescription, courseLevel, courseImage) VALUES(?,?,?,?,?,?,?)`,
    {
      replacements: [
        Data.courseName,
        Data.coursePrice,
        Data.courseCategory,
        Data.courseDuration,
        Data.courseDescription,
        Data.courseLevel,
        uploadCourseImage[0]?.url,
      ],
    }
  );
  return courseData[0];
};

// deleteCourse
const deleteCourse = async (instituteNumber: string, courseId: any) => {
  // 1. check first did the course exists or not
  const [findCourse] = await sequelize.query(
    `SELECT * FROM course_${instituteNumber} WHERE id = ${courseId}`
  );
  // 2. if course not exist
  if (findCourse.length === 0 || !findCourse) {
    throw { message: "Course Not Found" };
  }
  await sequelize.query(
    `DELETE FROM  course_${instituteNumber} WHERE id = ${courseId}`
  );
};

// get all course
const getAllCourse = async(instituteNumber:string)=>{
    const [data] = await sequelize.query(`SELECT * FROM course_${instituteNumber}`)
    return data;
}

//get Single Course
const getSingleCourse = async(instituteNumber:string, courseId:any)=> {
    const [data] = await sequelize.query(`SELECT * FROM course_${instituteNumber} WHERE id=?`, {
        replacements: [courseId]
    })
    return data;
}

export { createCourse, deleteCourse, getAllCourse, getSingleCourse };
