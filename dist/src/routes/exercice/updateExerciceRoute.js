"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const updateExerciceSchema_1 = __importDefault(require("../../schemas/updateExerciceSchema"));
const validateBody_1 = __importDefault(require("../../middleware/validateBody"));
const exerciceUpdateController_1 = __importDefault(require("../../controllers/exercice/exerciceUpdateController"));
Router.put("/update", (0, validateBody_1.default)(updateExerciceSchema_1.default), exerciceUpdateController_1.default);
exports.default = Router;
