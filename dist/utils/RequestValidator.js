"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequestValidator {
    static validateLogin(req, res, next) {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(422).send({ message: "Please fill in all fields" });
        }
        else
            next();
    }
}
exports.default = RequestValidator;
