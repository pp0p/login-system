import { Router as expressRouter, Request, Response } from "express";
import Auth from "../Controller/Auth.controller";
import IRouter from "../Interfaces/Router.interface";
import errorMiddleware from "../Middleware/ErrorMiddleware";
import notFoundMiddleware from "../Middleware/notFoundMiddleware";

export default class Router implements IRouter {
  public path = "/api";
  private auth: Auth = new Auth();
  public router = expressRouter();
  constructor() {
    this.run();
  }
  private run(): void {
    this.initialisePaths();
    this.initialiseMiddleware();
  }
  private initialisePaths(): void {
    this.router.use(`${this.path}/auth`, this.auth.router);
  }
  private initialiseMiddleware(): void {
    this.router.use(errorMiddleware);
    this.router.use(notFoundMiddleware)
  }
}
