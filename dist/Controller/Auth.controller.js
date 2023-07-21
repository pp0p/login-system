"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const config_1 = require("../Config/config");
const User_model_1 = __importDefault(require("../Model/User.model"));
const FileMiddleware_1 = __importDefault(require("../Middleware/FileMiddleware"));
const RequestValidator_1 = __importDefault(require("../utils/RequestValidator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Auth {
    constructor() {
        this.FileMiddleware = new FileMiddleware_1.default();
        this.router = (0, express_1.Router)();
        this.initialisePaths();
    }
    initialisePaths() {
        this.router.post("/register", this.FileMiddleware.upload.single("avater"), this.register);
        this.router.post("/logout", this.logout);
        this.router.post("/auth-status", this.authStatus);
        this.router.post("/login", RequestValidator_1.default.validateLogin, this.login);
    }
    register(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, username, password } = req.body;
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                /*
                  image path example
                  http://localhost:5000/public/avater/avater.png
                */
                const imagePath = req.protocol + "://" + req.get("host") + "/" + ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
                const user = new User_model_1.default({
                    name,
                    username,
                    password: hashedPassword,
                    avater: imagePath,
                    isActive: false,
                });
                yield user.save();
                res.status(201).send({ message: "done register" });
            }
            catch (error) {
                next(error);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const user = yield User_model_1.default.findOne({ username });
                if (!user) {
                    return res
                        .status(400)
                        .send({ message: "invalid Username or Password ! " });
                }
                const isMatch = yield bcrypt_1.default.compare(password, user.password);
                if (!isMatch) {
                    return res
                        .status(400)
                        .send({ message: "invalid Username or Password ! " });
                }
                const token = jsonwebtoken_1.default.sign({
                    avater: user.avater,
                    username: user.username,
                    id: user._id,
                }, config_1.config.jwtSecert, {
                    expiresIn: "2d",
                });
                return res
                    .status(201)
                    .cookie("token", token, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24 * 2,
                    domain: "localhost",
                    sameSite: "lax",
                })
                    .send({
                    message: "done login",
                    token,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
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
            }
            catch (error) {
                next(error);
            }
        });
    }
    authStatus(req, res, next) {
        var _a;
        try {
            const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
            jsonwebtoken_1.default.verify(token, config_1.config.jwtSecert, (err) => {
                if (err) {
                    return res.status(400).send({ isAuthenticated: false });
                }
                else {
                    res.status(200).send({ isAuthenticated: true });
                }
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = Auth;
