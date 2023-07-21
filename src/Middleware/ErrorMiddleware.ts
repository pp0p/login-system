import { Request, Response, NextFunction } from "express";
import { Error } from "mongoose";
import multer from "multer";

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  if (err instanceof multer.MulterError) {
    // If the error is a Multer error
    res.status(400).json({
      error: "Multer Error",
      message: err.message, // Send the Multer error message
    });
  } else if (err instanceof Error.ValidationError) {
    // If the error is a Mongoose validation error
    res.status(400).json({
      error: "Validation Failed",
      message: err.message, // Send only the error message
    });
  } else {
   return res.status(500).json({
      message: err.message,
    });
  }
};

export default errorMiddleware;
