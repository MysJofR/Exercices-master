"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const updateExerciceSchema = (0, yup_1.object)().shape({
    exerciceId: (0, yup_1.string)().required(),
    statement: (0, yup_1.string)(),
    difficulty: (0, yup_1.number)().min(0).max(5),
    tests: (0, yup_1.array)().of((0, yup_1.object)({
        input: (0, yup_1.array)().of((0, yup_1.string)().required()).required(),
        output: (0, yup_1.string)().required()
    }).required())
}).test('atLeastOneOf', 'You must provide at least one of these keys: statement, difficulty, tests', function (value) {
    return (value.statement || value.difficulty || value.tests) ? true : false;
});
exports.default = updateExerciceSchema;
