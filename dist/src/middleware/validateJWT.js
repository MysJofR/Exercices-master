"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorConstructor_1 = __importDefault(require("../Errors/errorConstructor"));
function validateJWT(req, res, next) {
    try {
        const token = req.headers["token"];
        if (!token)
            throw new errorConstructor_1.default("Token cannot be find", 401);
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err)
                throw new errorConstructor_1.default("invalid token", 401);
            if (!decoded.id)
                throw new errorConstructor_1.default("invalid token", 401);
            req.body.userId = decoded.id;
            req.user = decoded.id;
            next();
        });
    }
    catch (error) {
        if (error instanceof errorConstructor_1.default)
            throw error;
        throw new errorConstructor_1.default("Internal server error", 500);
    }
}
exports.default = validateJWT;
