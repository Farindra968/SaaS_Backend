import { NextFunction, Request, Response } from "express";

const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((error: Error) => {
      res.status(500).json({
        error,
      });
    });
  };
};

export default asyncHandler;
