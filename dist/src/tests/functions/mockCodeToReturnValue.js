"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mockCodeToReturnValue(value) {
    return `
        programa{
            funcao inicio(){
                escreva("${value}")
            }
        }
    `;
}
exports.default = mockCodeToReturnValue;
