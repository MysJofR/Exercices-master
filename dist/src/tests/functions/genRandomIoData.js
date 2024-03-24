"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const genRandomTypedPortugolData_1 = __importDefault(require("./genRandomTypedPortugolData"));
function genRandomIoData() {
    return faker_1.faker.helpers.multiple(() => {
        return {
            inputs: faker_1.faker.helpers.multiple(genRandomTypedPortugolData_1.default, { count: 5 }),
            output: faker_1.faker.helpers.multiple(genRandomTypedPortugolData_1.default, { count: 5 }).toString()
        };
    }, {
        count: {
            min: 1,
            max: 8
        }
    });
}
exports.default = genRandomIoData;
