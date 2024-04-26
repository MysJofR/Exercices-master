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
function getUserDifficult(name) {
    return __awaiter(this, void 0, void 0, function* () {
        let exercicesDifficultyOne = yield prisma_1.default.exercice.findMany({
            where: {
                difficulty: 1
            },
            select: {
                doneBy: true
            }
        });
        exercicesDifficultyOne = exercicesDifficultyOne.filter(exercice => {
            for (let i = 0; i < exercice.doneBy.length; i++) {
                if (exercice.doneBy[i].name == name) {
                    return false;
                }
            }
            return true;
        });
        let exercicesDifficultyTwo = yield prisma_1.default.exercice.findMany({
            where: {
                difficulty: 2
            },
            select: {
                doneBy: true
            }
        });
        exercicesDifficultyTwo = exercicesDifficultyTwo.filter(exercice => {
            for (let i = 0; i < exercice.doneBy.length; i++) {
                if (exercice.doneBy[i].name == name) {
                    return false;
                }
            }
            return true;
        });
        let exercicesDifficultyThree = yield prisma_1.default.exercice.findMany({
            where: {
                difficulty: 3
            },
            select: {
                doneBy: true
            }
        });
        exercicesDifficultyThree = exercicesDifficultyThree.filter(exercice => {
            for (let i = 0; i < exercice.doneBy.length; i++) {
                if (exercice.doneBy[i].name == name) {
                    return false;
                }
            }
            return true;
        });
        let exercicesDifficultyFour = yield prisma_1.default.exercice.findMany({
            where: {
                difficulty: 4
            },
            select: {
                doneBy: true
            }
        });
        exercicesDifficultyFour = exercicesDifficultyFour.filter(exercice => {
            for (let i = 0; i < exercice.doneBy.length; i++) {
                if (exercice.doneBy[i].name == name) {
                    return false;
                }
            }
            return true;
        });
        let exercicesDifficultyFive = yield prisma_1.default.exercice.findMany({
            where: {
                difficulty: 5
            },
            select: {
                doneBy: true
            }
        });
        exercicesDifficultyFive = exercicesDifficultyFive.filter(exercice => {
            for (let i = 0; i < exercice.doneBy.length; i++) {
                if (exercice.doneBy[i].name == name) {
                    return false;
                }
            }
            return true;
        });
        if (exercicesDifficultyOne.length != 0) {
            return 1;
        }
        else {
            if (exercicesDifficultyTwo.length != 0) {
                return 2;
            }
            else {
                if (exercicesDifficultyThree.length != 0) {
                    return 3;
                }
                else {
                    if (exercicesDifficultyFour.length != 0) {
                        return 4;
                    }
                    else {
                        if (exercicesDifficultyFive.length != 0) {
                            return 5;
                        }
                        else {
                            return 6;
                        }
                    }
                }
            }
        }
    });
}
exports.default = getUserDifficult;
