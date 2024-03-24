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
const getDifficultyFromUser_1 = __importDefault(require("./getDifficultyFromUser"));
function getExercice(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma_1.default.user.findUnique({
            where: {
                name: name
            },
            include: {
                exercisesDone: true
            }
        });
        if (user == undefined)
            throw new errorConstructor_1.default("User not found", 404);
        const difficulty = yield (0, getDifficultyFromUser_1.default)(name);
        if (difficulty == 6) {
            const randomExercice = yield prisma_1.default.exercice.findMany();
            return {
                hasDoneAll: true,
                exercice: randomExercice[Math.floor(Math.random() * randomExercice.length)]
            };
        }
        const exerciceDone = user.exercisesDone.map(exercice => exercice.id);
        const randomExercice = yield prisma_1.default.exercice.findFirst({
            where: {
                id: {
                    notIn: exerciceDone
                },
                difficulty: difficulty
            },
            orderBy: {
                id: 'desc'
            }
        });
        return {
            hasDoneAll: false,
            exercice: randomExercice
        };
    });
}
exports.default = getExercice;
