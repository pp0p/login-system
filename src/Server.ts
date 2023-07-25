import express, { Application } from "express";
import DataBase from "./Config/database";
import { config } from "./Config/config";
import Router from "./Router/Router";
import cookieParser from "cookie-parser";
import cors from "cors"
export default class Server {
  private app: Application;
  private port: number = config.port;
  private database: DataBase = new DataBase();
  private Router: Router = new Router();

  constructor() {
    this.app = express();
  }

  public run(): void {
    this.database.connect();
    this.initialiseMiddleware();
    this.initialiseControllers();
    this.listen();
  }

  private initialiseControllers(): void {
    this.app.use(this.Router.router);
  }

  private initialiseMiddleware(): void {
    this.app.use(express.json());
    this.app.use("/public", express.static("public"));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors(config.corsOption))
    this.app.use(cookieParser());
 
 }

  private listen(): void {
    this.app.listen(this.port, () => {
      console.log(`[🚀] Sever run on Port: ${this.port} [🚀]`);
    });
  }
}
