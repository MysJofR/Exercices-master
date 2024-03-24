"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const submitExercicesSchema = (0, yup_1.object)({
    exerciceId: (0, yup_1.string)().required(),
    code: (0, yup_1.string)().required().matches(/(programa|inicio)/),
});
exports.default = submitExercicesSchema;
