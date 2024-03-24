"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const addExercicesSchema = (0, yup_1.object)({
    genRandomData: (0, yup_1.boolean)().required(),
    statement: (0, yup_1.string)().required(),
    difficulty: (0, yup_1.number)().required().min(0).max(5),
    code: (0, yup_1.string)().matches(/(programa|inicio)/).when("genRandomData", {
        is: true,
        then: (schema) => schema.required()
    }),
    entries: (0, yup_1.array)().of((0, yup_1.string)().matches(/inteiro|real|cadeia|caracter|logico/).required()).when("genRandomData", {
        is: true,
        then: (schema) => schema.required()
    }),
    ioData: (0, yup_1.array)().of((0, yup_1.object)({
        inputs: (0, yup_1.array)().of((0, yup_1.string)().required()).required(),
        output: (0, yup_1.string)().required()
    }).required()).when("genRandomData", {
        is: false,
        then(schema) {
            return schema.required();
        }
    })
});
exports.default = addExercicesSchema;
