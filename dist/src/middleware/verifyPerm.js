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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const errorConstructor_1 = __importDefault(require("../Errors/errorConstructor"));
function validatePerms(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.findUnique({
            where: {
                id: req.body.userId
            },
            include: {
                role: true
            }
        });
        if (!user)
            throw new errorConstructor_1.default("User not found", 404);
        const roleId = user === null || user === void 0 ? void 0 : user.roleId;
        const job = yield prisma.role.findUnique({
            where: {
                id: roleId
            },
        });
        let path = ((req.baseUrl + req.path).replace(/\//g, ""));
        if (!(job === null || job === void 0 ? void 0 : job.routesAllow.includes(path)))
            throw new errorConstructor_1.default("You don't have permission to do this", 403);
        return next();
    });
}
exports.default = validatePerms;
