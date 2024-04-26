"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const exerciceListAllController_1 = __importDefault(require("../../controllers/exercice/exerciceListAllController"));
const Router = express_1.default.Router();
Router.get("/list", exerciceListAllController_1.default);
exports.default = Router;
