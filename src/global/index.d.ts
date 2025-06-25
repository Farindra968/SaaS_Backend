import { Request } from "express";

export interface IExtendRequest extends Request {
  user?: {
    id: string,
    email: string;
    role: string;
    userName: string | null;
    instituteCode?: string | number
  };



}

export interface IInstitute {
  instituteName: string;
  instituteEmail: string;
  institutePhoneNo: string;
  instituteAddress: string;
  instituteDescription:string;
  instituteLogo:string;
  instituteVatNo?: string | null;
  institutePanNo?: string | null;
}

export interface ICourse {
  id?: number; // Optional, usually auto-generated
  courseName: string;
  coursePrice: number; // Since you're using DECIMAL(10, 2)
  categoryId: string;
  courseImage: string;
  courseDescription?: string;
  courseDuration?: string;
  courseLevel: "beginner" | "intermediate" | "advance";
  isPublished?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface ITeacher {
  teacherName:string, 
  teacherEmail:string,
  teacherPhone:string, 
  teacherAddress:string
}

export interface ITeacherData {
  teacherName: string;
  teacherEmail: string;
  teacherPhone: string;
  teacherAddress: string;
  teacherBio: string;
  teacherSalary: string;
  teacherExpertise: string;
  courseId: string
}