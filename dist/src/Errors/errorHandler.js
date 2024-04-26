"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorConstructor_1 = __importDefault(require("./errorConstructor"));
function errorHandler(err, req, res, next) {
    if (err instanceof errorConstructor_1.default) {
        res.status(err.code || 500).json({ message: err.message });
    }
    else {
        res.status(500).json({ message: "Internal server error" });
    }
    next();
}
exports.default = errorHandler;
