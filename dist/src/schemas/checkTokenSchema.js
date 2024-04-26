"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const checkTokenSchema = (0, yup_1.object)().shape({
    token: (0, yup_1.string)().required()
});
exports.default = checkTokenSchema;
