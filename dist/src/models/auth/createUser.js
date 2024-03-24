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
const errorConstructor_1 = __importDefault(require("../../Errors/errorConstructor"));
const prisma_1 = __importDefault(require("../../libs/prisma/prisma"));
const checkIfUserExists_1 = require("../checkIfUserExists");
const bcrypt_1 = __importDefault(require("bcrypt"));
function createUser(name, pass) {
    return __awaiter(this, void 0, void 0, function* () {
        if (yield (0, checkIfUserExists_1.checkIfUserExists)(name))
            throw new errorConstructor_1.default("User already exists", 409);
        const user = yield prisma_1.default.user.create({
            data: {
                name,
                password: bcrypt_1.default.hashSync(pass, 10),
                role: {
                    connectOrCreate: {
                        where: {
                            name: process.env.DEFAULT_ROLE
                        },
                        create: {
                            name: process.env.DEFAULT_ROLE,
                            routesAllow: {
                                set: [
                                    //Default permissions
                                    "exercice",
                                    "exercicesubmit"
                                ]
                            }
                        }
                    }
                }
            }
        });
        if (user)
            return user;
        else
            throw new errorConstructor_1.default("User not created", 500);
    });
}
exports.default = createUser;
