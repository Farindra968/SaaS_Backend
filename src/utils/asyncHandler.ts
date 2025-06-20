import { NextFunction, Request, Response } from "express";
import { Next } from "mysql2/typings/mysql/lib/parsers/typeCast";

// const asyncHandler = (fn: Function) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     Promise.resolve(fn(req, res, next)).catch(next);
//   };
// };
const asyncHandler = (fn:Function)=>{
  return (req:Request, res:Response, next:NextFunction)=>{
fn(req, res, next).catch((error:Error)=>{
  res.status(500).json({
    success: false,
    message: error.message || "Internal Server Error",
    error: error.stack
  })
})
  }
}


export default asyncHandler;
