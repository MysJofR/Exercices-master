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
const vitest_1 = require("vitest");
const getUserAndJWT_1 = __importDefault(require("../functions/getUserAndJWT"));
const supertest_1 = __importDefault(require("supertest"));
const expressConfig_1 = __importDefault(require("../../config/expressConfig"));
const setPermToUser_1 = __importDefault(require("../functions/setPermToUser"));
const client_1 = require("@prisma/client");
const faker_1 = require("@faker-js/faker");
const request = (0, supertest_1.default)((0, expressConfig_1.default)());
const prisma = new client_1.PrismaClient();
(0, vitest_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.user.deleteMany();
    yield prisma.tests.deleteMany();
    yield prisma.$transaction([prisma.exercice.deleteMany(), prisma.role.deleteMany()]);
}));
(0, vitest_1.afterEach)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.user.deleteMany();
    yield prisma.tests.deleteMany();
    yield prisma.$transaction([prisma.exercice.deleteMany(), prisma.role.deleteMany()]);
}));
(0, vitest_1.it)("should return a exercice if there is one", () => __awaiter(void 0, void 0, void 0, function* () {
    const info = yield (0, getUserAndJWT_1.default)(request);
    yield (0, setPermToUser_1.default)(info.user);
    const exerciceData = {
        statement: faker_1.faker.lorem.word(),
        difficulty: faker_1.faker.datatype.number({
            min: 1,
            max: 5
        }),
    };
    const exercice = yield prisma.exercice.create({
        data: {
            statement: exerciceData.statement,
            difficulty: exerciceData.difficulty,
        }
    });
    (0, vitest_1.expect)(exercice).toBeDefined();
    const response = yield request.get("/exercice").set({
        token: info.jwt
    });
    (0, vitest_1.expect)(response.body.statement).toBe(exerciceData.statement);
}));
