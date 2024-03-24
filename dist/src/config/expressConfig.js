"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = __importStar(require("../../swagger.json"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("../routes/exercice/index"));
const index_2 = __importDefault(require("../routes/auth/index"));
const verifyPerm_1 = __importDefault(require("../middleware/verifyPerm"));
const errorHandler_1 = __importDefault(require("../Errors/errorHandler"));
const validateJWT_1 = __importDefault(require("../middleware/validateJWT"));
function expressConfig() {
    const app = (0, express_1.default)();
    //Configure to use JSON and URLENCODED
    app.use((0, cors_1.default)({
        origin: '*'
    }));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    //Configure routes
    app.get("/", (req, res) => {
        res.sendFile("R:\\AutomaticProjects\\Exercices\\frontend\\index.html");
    });
    app.get("/login", (req, res) => {
        res.sendFile("R:\\AutomaticProjects\\Exercices\\frontend\\auth\\login\\index.html");
    });
    app.get("/signup", (req, res) => {
        res.sendFile("R:\\AutomaticProjects\\Exercices\\frontend\\auth\\signup\\index.html");
    });
    app.use("/auth", index_2.default.signUpRoute);
    app.use("/auth", index_2.default.loginRoute);
    app.use("/auth", index_2.default.checkTokenRoute);
    app.use(validateJWT_1.default);
    app.use(verifyPerm_1.default);
    app.use("/exercice", index_1.default.updateExerciceRoute);
    app.use("/exercice", index_1.default.addExerciceRoute);
    app.use("/exercice", index_1.default.submitExerciceRoute);
    app.use("/exercice", index_1.default.getExerciceRoute);
    app.use("/exercice", index_1.default.deleteExerciceRoute);
    app.use("/exercice", index_1.default.listExerciceRoute);
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
    app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
    app.use(errorHandler_1.default);
    return app;
}
exports.default = expressConfig;
