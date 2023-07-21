import multer from "multer";
import MulterConfig from "../Config/multer";
import { Request, Response, NextFunction, RequestHandler } from "express";
export default class FileMiddleware extends MulterConfig {
  public readonly upload: multer.Multer = multer({
    storage: this.sotrage,
    fileFilter: this.fileFilter,
  });
}
