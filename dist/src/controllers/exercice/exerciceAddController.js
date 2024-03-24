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
exports.addExercice = void 0;
const compiler_1 = __importDefault(require("../../services/compiler"));
const generateRandomData_1 = __importDefault(require("../../functions/generateRandomData"));
const addExerciceToDB_1 = __importDefault(require("../../models/addExerciceToDB"));
const checkIfExerciceExists_1 = __importDefault(require("../../models/checkIfExerciceExists"));
const errorConstructor_1 = __importDefault(require("../../Errors/errorConstructor"));
//import
function addExercice(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (yield (0, checkIfExerciceExists_1.default)(req.body.statement)) {
            throw new errorConstructor_1.default('Exercice already exists', 400);
        }
        const { genRandomData, ioData, entries, code } = req.body;
        let testCases = {
            testCases: []
        };
        //GENERATE RANDOM tests
        if (genRandomData) {
            if ((entries === null || entries === void 0 ? void 0 : entries.length) == 0) {
                const compiler = new compiler_1.default();
                const programResult = yield compiler.runCode(code, entries);
                // Todos dados ja foram validados pelo schema e pelo validador lexico e sintatico do compilador
                testCases.testCases.push({ output: programResult });
            }
            else {
                const compiler = new compiler_1.default();
                const dataGen = new generateRandomData_1.default();
                yield Promise.all(Array.from({ length: 10 }, () => {
                    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                        try {
                            const randomData = dataGen.lazyGen(entries);
                            const programResult = compiler.runCode(code, randomData);
                            testCases.testCases.push({
                                inputs: randomData,
                                output: yield programResult
                            });
                            return resolve(true);
                        }
                        catch (error) {
                            return reject(error);
                        }
                    }));
                }));
            }
        }
        //USE PROVIDED TESTS
        if (ioData) {
            testCases.testCases.push(...ioData);
        }
        try {
            const result = yield (0, addExerciceToDB_1.default)({
                difficulty: req.body.difficulty,
                statement: req.body.statement,
            }, testCases);
            res.status(201).json(result);
        }
        catch (error) {
            throw new errorConstructor_1.default("Internal server error", 500);
        }
    });
}
exports.addExercice = addExercice;
