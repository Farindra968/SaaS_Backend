import { Request, Response, NextFunction } from "express";

// asyncHandler is a higher-order function that wraps async route handlers
// This allows us to catch errors and pass them to Express's error handling middleware
const asyncHandler =
  (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<void> // Accepts any async Express handler
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    // Executes the async function and catches any errors
    Promise.resolve(fn(req, res, next)).catch(next); // Passes errors to Express via next()
  };

export default asyncHandler;
