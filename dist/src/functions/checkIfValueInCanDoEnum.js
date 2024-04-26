"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
function checkIfValuesInRoutesEnum(value) {
    const routesEnum = Object.values(client_1.Routes);
    return value.filter((e) => routesEnum.includes(e)).length === value.length;
}
exports.default = checkIfValuesInRoutesEnum;
