"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
class DataBase {
    constructor() {
        this.mongoUri = config_1.config.mongoUri;
    }
    connect() {
        mongoose_1.default
            .connect(this.mongoUri)
            .then(() => {
            console.log("[🗄️] Database Connected [🗄️]");
        })
            .catch((error) => {
            console.error("[❌] Database Connection Error: \n", error);
        });
    }
}
exports.default = DataBase;
