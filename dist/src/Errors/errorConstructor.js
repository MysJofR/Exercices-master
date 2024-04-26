"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppErrorConstructor {
    constructor(message, code) {
        if (message)
            this.message = message;
        else
            this.message = "Internal server error";
        if (code)
            this.code = code;
        else
            this.code = 500;
    }
}
exports.default = AppErrorConstructor;
