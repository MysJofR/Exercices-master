"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function genJWToken(id) {
    const token = jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET);
    return token;
}
exports.default = genJWToken;
