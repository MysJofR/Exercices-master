"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const deleteExerciceSchema = (0, yup_1.object)().shape({
    exerciceId: (0, yup_1.string)().required(),
});
exports.default = deleteExerciceSchema;
