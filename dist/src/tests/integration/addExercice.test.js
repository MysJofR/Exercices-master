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
const expressConfig_1 = __importDefault(require("../../config/expressConfig"));
const supertest_1 = __importDefault(require("supertest"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const vitest_1 = require("vitest");
const faker_1 = require("@faker-js/faker");
const getUserAndJWT_1 = __importDefault(require("../functions/getUserAndJWT"));
const genRandomIoData_1 = __importDefault(require("../functions/genRandomIoData"));
const setPermToUser_1 = __importDefault(require("../functions/setPermToUser"));
const mockCodeToReturnValue_1 = __importDefault(require("../functions/mockCodeToReturnValue"));
const genRandomTypedPortugolData_1 = __importDefault(require("../functions/genRandomTypedPortugolData"));
const request = (0, supertest_1.default)((0, expressConfig_1.default)());
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
(0, vitest_1.it)("should add an exercice using IO data", () => __awaiter(void 0, void 0, void 0, function* () {
    const info = yield (0, getUserAndJWT_1.default)(request);
    yield (0, setPermToUser_1.default)(info.user);
    const ioData = (0, genRandomIoData_1.default)();
    const response = yield request.post("/exercice/add").send({
        statement: faker_1.faker.lorem.sentence(),
        difficulty: faker_1.faker.datatype.number({ min: 1, max: 5 }),
        genRandomData: false,
        ioData,
    }).set({
        token: info.jwt
    });
    (0, vitest_1.expect)(response.statusCode).toBe(201);
    const exercice = yield prisma.exercice.findUnique({
        where: {
            id: response.body.id
        },
        include: {
            tests: {
                select: {
                    input: true,
                    output: true
                }
            }
        }
    });
    (0, vitest_1.expect)(exercice).toBeTruthy();
    (0, vitest_1.expect)(exercice === null || exercice === void 0 ? void 0 : exercice.statement).toBe(response.body.statement);
    (0, vitest_1.expect)(exercice === null || exercice === void 0 ? void 0 : exercice.tests).toStrictEqual(ioData.map((data) => {
        return {
            input: data.inputs.map((input) => input.toString()),
            output: data.output
        };
    }));
}));
(0, vitest_1.it)("should add an exercice using random data", () => __awaiter(void 0, void 0, void 0, function* () {
    const info = yield (0, getUserAndJWT_1.default)(request);
    yield (0, setPermToUser_1.default)(info.user);
    const expectedValue = (0, genRandomTypedPortugolData_1.default)();
    const response = yield request.post("/exercice/add").send({
        statement: faker_1.faker.lorem.sentence(),
        difficulty: faker_1.faker.datatype.number({ min: 1, max: 5 }),
        genRandomData: true,
        code: (0, mockCodeToReturnValue_1.default)((expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.toString()) || ""),
        entries: [],
    }).set({
        token: info.jwt
    });
    (0, vitest_1.expect)(response.statusCode).toBe(201);
    const exercice = yield prisma.exercice.findUnique({
        where: {
            id: response.body.id
        },
        include: {
            tests: {
                select: {
                    input: true,
                    output: true
                }
            }
        }
    });
    (0, vitest_1.expect)(exercice).toBeTruthy();
    (0, vitest_1.expect)(exercice === null || exercice === void 0 ? void 0 : exercice.statement).toBe(response.body.statement);
    (0, vitest_1.expect)(exercice === null || exercice === void 0 ? void 0 : exercice.tests).toStrictEqual([{
            input: [],
            output: expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.toString()
        }]);
}));
