"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Auth_controller_1 = __importDefault(require("../Controller/Auth.controller"));
const ErrorMiddleware_1 = __importDefault(require("../Middleware/ErrorMiddleware"));
const notFoundMiddleware_1 = __importDefault(require("../Middleware/notFoundMiddleware"));
class Router {
    constructor() {
        this.path = "/api";
        this.auth = new Auth_controller_1.default();
        this.router = (0, express_1.Router)();
        this.run();
    }
    run() {
        this.initialisePaths();
        this.initialiseMiddleware();
    }
    initialisePaths() {
        this.router.use(`${this.path}/auth`, this.auth.router);
    }
    initialiseMiddleware() {
        this.router.use(ErrorMiddleware_1.default);
        this.router.use(notFoundMiddleware_1.default);
    }
}
exports.default = Router;
