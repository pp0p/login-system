import { Request, Response, NextFunction } from "express";
import { FileFilterCallback } from "multer";
import UserModel from "../Model/User.model";
class RequestValidator {
  static validateLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): void | Response {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(422).send({ message: "Please fill in all fields" });
    } else next();
  }
}
export default RequestValidator;
