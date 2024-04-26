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
const getExercice_1 = __importDefault(require("../../models/getExercice"));
const client_1 = require("@prisma/client");
const errorConstructor_1 = __importDefault(require("../../Errors/errorConstructor"));
const prisma = new client_1.PrismaClient();
function getExerciceController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.findUnique({
            where: {
                id: req.body.userId
            }
        });
        if (user == undefined)
            throw new errorConstructor_1.default("User not found", 404);
        const response = yield (0, getExercice_1.default)(user.name);
        if (response) {
            res.status(200).json(response);
        }
        else {
            res.status(500).json("Internal server error");
        }
    });
}
exports.default = getExerciceController;
