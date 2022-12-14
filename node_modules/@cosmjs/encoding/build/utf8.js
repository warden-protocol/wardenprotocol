"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromUtf8 = exports.toUtf8 = void 0;
function toUtf8(str) {
    return new TextEncoder().encode(str);
}
exports.toUtf8 = toUtf8;
function fromUtf8(data) {
    return new TextDecoder("utf-8", { fatal: true }).decode(data);
}
exports.fromUtf8 = fromUtf8;
//# sourceMappingURL=utf8.js.map