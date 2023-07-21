"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./Config/database"));
const config_1 = require("./Config/config");
const Router_1 = __importDefault(require("./Router/Router"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
class Server {
    constructor() {
        this.port = config_1.config.port;
        this.database = new database_1.default();
        this.Router = new Router_1.default();
        this.app = (0, express_1.default)();
    }
    run() {
        this.database.connect();
        this.initialiseMiddleware();
        this.initialiseControllers();
        this.listen();
    }
    initialiseControllers() {
        this.app.use(this.Router.router);
    }
    initialiseMiddleware() {
        this.app.use(express_1.default.json());
        this.app.use("/public", express_1.default.static("public"));
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_parser_1.default)());
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`[🚀] Sever run on Port: ${this.port} [🚀]`);
        });
    }
}
exports.default = Server;
