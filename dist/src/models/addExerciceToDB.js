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
const checkIfExerciceExists_1 = __importDefault(require("./checkIfExerciceExists"));
const errorConstructor_1 = __importDefault(require("../Errors/errorConstructor"));
const prisma_1 = __importDefault(require("../libs/prisma/prisma"));
function addExerciceToDB(exercice, testCases) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (yield (0, checkIfExerciceExists_1.default)(exercice.statement)) {
                throw new errorConstructor_1.default("Exercice with same statement already exists", 400);
            }
            const result = yield prisma_1.default.exercice.create({
                data: {
                    statement: exercice.statement,
                    difficulty: exercice.difficulty,
                    tests: {
                        create: testCases.testCases.map(testCase => {
                            return {
                                input: {
                                    set: testCase.inputs || []
                                },
                                output: testCase.output
                            };
                        })
                    }
                },
                include: {
                    tests: true
                }
            });
            if (!result) {
                throw new errorConstructor_1.default("Internal Server Error", 500);
            }
            return result;
        }
        catch (error) {
            if (error instanceof errorConstructor_1.default) {
                throw error;
            }
            throw new errorConstructor_1.default("Internal Server Error", 500);
        }
    });
}
exports.default = addExerciceToDB;
