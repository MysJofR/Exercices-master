"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
function genRandomTypedPortugolData() {
    switch (Math.floor(Math.random() * 5)) {
        //CADEIA
        case 0:
            return faker_1.faker.lorem.sentence();
        //INTEIRO
        case 1:
            return faker_1.faker.number.int({ min: 0, max: 1000 });
        //REAL
        case 2:
            return faker_1.faker.number.float({ min: 0, max: 1000 });
        //LOGICO
        case 3:
            return faker_1.faker.datatype.boolean() ? "verdadeiro" : "falso";
        //CARACTER
        case 4:
            return faker_1.faker.word.sample()[0];
    }
}
exports.default = genRandomTypedPortugolData;
