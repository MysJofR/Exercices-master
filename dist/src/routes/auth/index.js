"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const checkIfTokenIsValidRoute_1 = __importDefault(require("./checkIfTokenIsValidRoute"));
const loginRoute_1 = __importDefault(require("./loginRoute"));
const signUpRoute_1 = __importDefault(require("./signUpRoute"));
exports.default = {
    checkTokenRoute: checkIfTokenIsValidRoute_1.default,
    loginRoute: loginRoute_1.default,
    signUpRoute: signUpRoute_1.default
};
