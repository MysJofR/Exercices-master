"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
//Validate body
const validateBody_1 = __importDefault(require("../../middleware/validateBody"));
const submitExerciceSchema_1 = __importDefault(require("../../schemas/submitExerciceSchema"));
const exerciceSubmitController_1 = __importDefault(require("../../controllers/exercice/exerciceSubmitController"));
Router.post("/submit", (0, validateBody_1.default)(submitExerciceSchema_1.default), exerciceSubmitController_1.default);
exports.default = Router;
