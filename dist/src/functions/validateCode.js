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
const errorConstructor_1 = __importDefault(require("../Errors/errorConstructor"));
const getInfoFromExercice_1 = __importDefault(require("../models/getInfoFromExercice"));
const compiler_1 = __importDefault(require("../services/compiler"));
function validateCode(exerciceId, code) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const exercice = yield (0, getInfoFromExercice_1.default)(exerciceId);
            const tests = exercice === null || exercice === void 0 ? void 0 : exercice.tests;
            return Promise.all(tests === null || tests === void 0 ? void 0 : tests.map((test, i) => __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const compilerService = new compiler_1.default();
                        const result = yield compilerService.runCode(code, tests[i].input);
                        if (result !== tests[i].output) {
                            reject({ errorOn: i, expected: tests[i].output, got: result });
                        }
                        resolve(true);
                    }
                    catch (error) {
                        reject(error);
                    }
                }));
            }))).then((result) => {
                return Promise.resolve({ passed: true });
            }).catch((error) => {
                return Promise.resolve({ passed: false, error: error });
            });
        }
        catch (error) {
            if (error instanceof errorConstructor_1.default)
                throw error;
            else
                throw new errorConstructor_1.default('Internal server error', 500);
        }
    });
}
exports.default = validateCode;
