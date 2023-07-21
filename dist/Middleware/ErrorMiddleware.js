"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const multer_1 = __importDefault(require("multer"));
const errorMiddleware = (err, req, res, next) => {
    if (err instanceof multer_1.default.MulterError) {
        // If the error is a Multer error
        res.status(400).json({
            error: "Multer Error",
            message: err.message, // Send the Multer error message
        });
    }
    else if (err instanceof mongoose_1.Error.ValidationError) {
        // If the error is a Mongoose validation error
        res.status(400).json({
            error: "Validation Failed",
            message: err.message, // Send only the error message
        });
    }
    else {
        return res.status(500).json({
            message: err.message,
        });
    }
};
exports.default = errorMiddleware;
