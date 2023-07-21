import { Request, Response, NextFunction } from "express";

export default function notFoundMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Response {
  return res.status(404).json({ message: "404 Not Found" });
}
