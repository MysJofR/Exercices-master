"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expressConfig_1 = __importDefault(require("./config/expressConfig"));
(0, expressConfig_1.default)().listen(3000, () => {
    console.log("Server running on port 3000");
});
