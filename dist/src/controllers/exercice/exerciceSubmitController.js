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
const validateCode_1 = __importDefault(require("../../functions/validateCode"));
const errorConstructor_1 = __importDefault(require("../../Errors/errorConstructor"));
const userPass_1 = require("../../models/userPass");
function submitExercice(req, res) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const validate = yield (0, validateCode_1.default)(req.body.exerciceId, req.body.code);
        if (validate.error instanceof errorConstructor_1.default)
            throw new errorConstructor_1.default(validate.error.message, 500);
        else {
            if (validate.passed == false)
                throw new errorConstructor_1.default(`Erro no teste ${(_a = validate.error) === null || _a === void 0 ? void 0 : _a.errorOn} do seu programa da resolucao: Esperado ${(_b = validate.error) === null || _b === void 0 ? void 0 : _b.expected} mas obteve ${(_c = validate.error) === null || _c === void 0 ? void 0 : _c.got}`, 500);
            if (validate.passed == true) {
                yield (0, userPass_1.userPass)((req.user), req.body.exerciceId);
                return res.status(200).json({ message: 'Parabens, voce passou em todos os testes!' });
            }
        }
    });
}
exports.default = submitExercice;
