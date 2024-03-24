"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkIfTokenIsValidController_1 = __importDefault(require("../../controllers/auth/checkIfTokenIsValidController"));
const validateBody_1 = __importDefault(require("../../middleware/validateBody"));
const checkTokenSchema_1 = __importDefault(require("../../schemas/checkTokenSchema"));
const Router = express_1.default.Router();
Router.post("/", (0, validateBody_1.default)(checkTokenSchema_1.default), checkIfTokenIsValidController_1.default);
exports.default = Router;
