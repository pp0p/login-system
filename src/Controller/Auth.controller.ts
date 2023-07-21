import { Request, Response, Router, NextFunction } from "express";
import { config } from "../Config/config";
import IUser from "../Interfaces/User.interface";
import UserModel from "../Model/User.model";
import FileMiddleware from "../Middleware/FileMiddleware";
import RequestValidator from "../utils/RequestValidator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export default class Auth {
  private FileMiddleware: FileMiddleware;
  public router;
  constructor() {
    this.FileMiddleware = new FileMiddleware();
    this.router = Router();

    this.initialisePaths();
  }

  private initialisePaths(): void {
    this.router.post(
      "/register",
      this.FileMiddleware.upload.single("avater"),
      this.register
    );
    this.router.post("/logout", this.logout);
    this.router.post("/auth-status", this.authStatus);
    this.router.post("/login", RequestValidator.validateLogin, this.login);
  }

  private async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { name, username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      /*
        image path example
        http://localhost:5000/public/avater/avater.png
      */
      const imagePath =
        req.protocol + "://" + req.get("host") + "/" + req.file?.path;

      const user: IUser = new UserModel({
        name,
        username,
        password: hashedPassword,
        avater: imagePath,
        isActive: false,
      });
      await user.save();
      res.status(201).send({ message: "done register" });
    } catch (error: any) {
      next(error);
    }
  }
  private async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({ username });

      if (!user) {
        return res
          .status(400)
          .send({ message: "invalid Username or Password ! " });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .send({ message: "invalid Username or Password ! " });
      }

      const token = jwt.sign(
        {
          avater: user.avater,
          username: user.username,
          id: user._id,
        },
        config.jwtSecert,
        {
          expiresIn: "2d",
        }
      );

      return res
        .status(201)
        .cookie("token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 2, // 3 Day Age,
          domain: "localhost",
          sameSite: "lax",
        })
        .send({
          message: "done login",
          token,
        });
    } catch (error: any) {
      next(error);
    }
  }
  private async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res
        .status(201)
        .cookie("token", "" /* remove token*/, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 1,
          domain: "localhost",
          sameSite: "lax",
        })
        .send({
          message: "done logout",
        });
    } catch (error: any) {
      next(error);
    }
  }
  private authStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies?.token;
      jwt.verify(token, config.jwtSecert, (err: any) => {
        if (err) {
          return res.status(400).send({ isAuthenticated: false });
        } else {
          res.status(200).send({ isAuthenticated: true });
        }
      });
    } catch (error: any) {
      next(error);
    }
  }
}
