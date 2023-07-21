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
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const User_model_1 = __importDefault(require("../Model/User.model"));
class MulterConfig {
    constructor() {
        this.sotrage = multer_1.default.diskStorage({
            // specify the directory where uploaded files should be stored
            destination: "./public/avater",
            filename(req, file, cb) {
                // generate a unique filename using the fieldname and a random number
                const filename = `${file.fieldname}-${Math.floor(Math.random() * 10000000)}`;
                // get the extension of the uploaded file
                const ext = path_1.default.extname(file.originalname);
                cb(null, filename + ext);
            },
        });
        this.fileFilter = (req, file, cb) => __awaiter(this, void 0, void 0, function* () {
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
                const checkUsername = yield User_model_1.default.findOne({ username });
                if (checkUsername) {
                    return cb(new Error("username already exist"));
                }
            }
            cb(null, true);
        });
    }
}
exports.default = MulterConfig;
