"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateBody_1 = __importDefault(require("../../middleware/validateBody"));
const deleteExerciceSchema_1 = __importDefault(require("../../schemas/deleteExerciceSchema"));
const exerciceDeleteController_1 = __importDefault(require("../../controllers/exercice/exerciceDeleteController"));
const Router = express_1.default.Router();
Router.delete('/delete', (0, validateBody_1.default)(deleteExerciceSchema_1.default), exerciceDeleteController_1.default);
exports.default = Router;
