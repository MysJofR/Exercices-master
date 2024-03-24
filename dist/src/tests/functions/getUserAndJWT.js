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
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
function getInfo(request) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = faker_1.faker.internet.userName();
        const password = faker_1.faker.internet.password();
        //Create user
        const create = yield request.post("/auth/signUp").send({
            username: user,
            password: password
        });
        if (create.statusCode !== 201)
            throw new Error("Error creating user");
        const token = yield request.post("/auth/login").send({
            username: user,
            password: password
        });
        if (token.statusCode !== 200)
            throw new Error("Error getting token");
        const jwt = token.body.token;
        return {
            user,
            password,
            jwt
        };
    });
}
exports.default = getInfo;
