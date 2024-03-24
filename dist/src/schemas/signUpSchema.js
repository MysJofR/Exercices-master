"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const signUpSchema = (0, yup_1.object)().shape({
    username: (0, yup_1.string)().required(),
    password: (0, yup_1.string)().required(),
});
exports.default = signUpSchema;
