"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateBody_1 = __importDefault(require("../../middleware/validateBody"));
const loginSchema_1 = __importDefault(require("../../schemas/loginSchema"));
const loginController_1 = __importDefault(require("../../controllers/auth/loginController"));
const Router = express_1.default.Router();
Router.post("/login", (0, validateBody_1.default)(loginSchema_1.default), loginController_1.default);
exports.default = Router;
