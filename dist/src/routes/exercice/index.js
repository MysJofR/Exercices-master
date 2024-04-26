"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addExerciceRoute_1 = __importDefault(require("./addExerciceRoute"));
const submitExerciceRoute_1 = __importDefault(require("./submitExerciceRoute"));
const getExerciceRoute_1 = __importDefault(require("./getExerciceRoute"));
const updateExerciceRoute_1 = __importDefault(require("./updateExerciceRoute"));
const deleteExerciceRoute_1 = __importDefault(require("./deleteExerciceRoute"));
const listExercicesRoute_1 = __importDefault(require("./listExercicesRoute"));
exports.default = {
    addExerciceRoute: addExerciceRoute_1.default,
    submitExerciceRoute: submitExerciceRoute_1.default,
    getExerciceRoute: getExerciceRoute_1.default,
    updateExerciceRoute: updateExerciceRoute_1.default,
    deleteExerciceRoute: deleteExerciceRoute_1.default,
    listExerciceRoute: listExercicesRoute_1.default
};
