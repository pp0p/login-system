import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request, Response, NextFunction } from "express";
import UserModel from "../Model/User.model";
import RequestValidator from "../utils/RequestValidator";
export default abstract class MulterConfig {
  protected readonly sotrage: multer.StorageEngine = multer.diskStorage({
    // specify the directory where uploaded files should be stored
    destination: "./public/avater",

    filename(req, file, cb) {
      // generate a unique filename using the fieldname and a random number
      const filename: string = `${file.fieldname}-${Math.floor(
        Math.random() * 10000000
      )}`;

      // get the extension of the uploaded file
      const ext: string = path.extname(file.originalname);
      cb(null, filename + ext);
    },
  });
  protected readonly fileFilter = async (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ): Promise<void> => {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a Image"));
    }

    //  validate fields before save image
    if (req.path === "/register") {
      const { username, name, password } = req.body;
      if (!username || !name || !password) {
        return cb(new Error("Please fill in all fields"));
      }
      const checkUsername = await UserModel.findOne({ username });
      if (checkUsername) {
        return cb(new Error("username already exist"));
      }
    }
    cb(null, true);
  };
}
