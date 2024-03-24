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
const bcrypt_1 = require("bcrypt");
const errorConstructor_1 = __importDefault(require("../../Errors/errorConstructor"));
const prisma_1 = __importDefault(require("../../libs/prisma/prisma"));
function login(user, pass) {
    return __awaiter(this, void 0, void 0, function* () {
        const userData = yield prisma_1.default.user.findUnique({
            where: {
                name: user
            }
        });
        if (!userData)
            throw new errorConstructor_1.default("User not found", 404);
        const passwordMatch = yield (0, bcrypt_1.compare)(pass, userData.password);
        if (!passwordMatch)
            throw new errorConstructor_1.default("Password does not match", 401);
        return userData;
    });
}
exports.default = login;
