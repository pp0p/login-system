"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function notFoundMiddleware(req, res, next) {
    return res.status(404).json({ message: "404 Not Found" });
}
exports.default = notFoundMiddleware;
