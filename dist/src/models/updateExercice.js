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
const prisma_1 = __importDefault(require("../libs/prisma/prisma"));
const errorConstructor_1 = __importDefault(require("../Errors/errorConstructor"));
function updateExercice(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const exercice = yield prisma_1.default.exercice.findUnique({
            where: {
                id: data.id
            }
        });
        if (!exercice)
            throw new errorConstructor_1.default("Exercice not found", 404);
        const newExercice = yield prisma_1.default.exercice.update({
            where: {
                id: data.id
            },
            data: {
                statement: data.statement,
                difficulty: data.difficulty,
                tests: {
                    set: [],
                    createMany: {
                        data: data.tests || []
                    }
                },
                doneBy: {
                    set: []
                }
            }
        });
        if (!newExercice)
            throw new errorConstructor_1.default("Exercice not updated", 500);
        return newExercice;
    });
}
exports.default = updateExercice;
