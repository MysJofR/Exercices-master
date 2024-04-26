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
const axios_1 = __importDefault(require("axios"));
const errorConstructor_1 = __importDefault(require("../Errors/errorConstructor"));
class CompilerService {
    constructor() {
    }
    runCode(code, entries) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((entries === null || entries === void 0 ? void 0 : entries.length) === 0)
                    entries = undefined;
                const result = yield axios_1.default.post(`http://${process.env.COMPILER_URL}:8000/`, {
                    code,
                    inputs: entries === null || entries === void 0 ? void 0 : entries.join(",")
                }, { headers: { "Content-Type": "application/json" } });
                if (result.data.err)
                    throw new errorConstructor_1.default(`Erro ao compilar seu programa da resolucao: ${result.data.err}`, 500);
                return result.data.result;
            }
            catch (error) {
                const axiosError = error;
                if (error instanceof errorConstructor_1.default)
                    throw error;
                if (((_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.data) === undefined) {
                    throw new errorConstructor_1.default(`Erro no servico de compilação`, 500);
                }
                else
                    throw new errorConstructor_1.default(`Erro ao compilar seu programa da resolucao: ${(_b = axiosError.response) === null || _b === void 0 ? void 0 : _b.data}`, 500);
            }
        });
    }
}
exports.default = CompilerService;
