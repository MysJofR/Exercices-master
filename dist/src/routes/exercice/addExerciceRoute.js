"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const exerciceAddController_1 = require("../../controllers/exercice/exerciceAddController");
//Validate body
const validateBody_1 = __importDefault(require("../../middleware/validateBody"));
const addExercicesSchema_1 = __importDefault(require("../../schemas/addExercicesSchema"));
Router.post("/add", (0, validateBody_1.default)(addExercicesSchema_1.default), exerciceAddController_1.addExercice);
exports.default = Router;
