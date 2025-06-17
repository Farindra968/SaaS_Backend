import { Request } from "express";

export interface IExtendRequest extends Request {
  user?: {
    id: string,
    email: string;
    role: string;
    userName: string | null;
    instituteCode?: number[] | string[]
  };

}

export interface IInstitute {
  instituteName: string;
  instituteEmail: string;
  institutePhoneNo: string;
  instituteAddress: string;
  instituteVatNo?: string | null;
  institutePanNo?: string | null;
}



export interface ITeacher {
  teacherName:string, 
  teacherEmail:string,
  teacherPhone:string, 
  teacherAddress:string
}