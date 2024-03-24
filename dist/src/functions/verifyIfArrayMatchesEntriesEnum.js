"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tiposPortugol = {
    'inteiro': 'inteiro',
    'real': 'real',
    'cadeia': 'cadeia',
    'caracter': 'caracter',
    'logico': 'logico'
};
function verifyIfArrayMatchesEntriesEnum(entries) {
    return entries.filter((entry) => {
        if (Object.values(tiposPortugol).includes(entry))
            return true;
        return false;
    }).length == entries.length;
}
exports.default = verifyIfArrayMatchesEntriesEnum;
