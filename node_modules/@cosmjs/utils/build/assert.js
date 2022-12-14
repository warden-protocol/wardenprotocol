"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertDefinedAndNotNull = exports.assertDefined = exports.assert = void 0;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function assert(condition, msg) {
    if (!condition) {
        throw new Error(msg || "condition is not truthy");
    }
}
exports.assert = assert;
function assertDefined(value, msg) {
    if (value === undefined) {
        throw new Error(msg !== null && msg !== void 0 ? msg : "value is undefined");
    }
}
exports.assertDefined = assertDefined;
function assertDefinedAndNotNull(value, msg) {
    if (value === undefined || value === null) {
        throw new Error(msg !== null && msg !== void 0 ? msg : "value is undefined or null");
    }
}
exports.assertDefinedAndNotNull = assertDefinedAndNotNull;
//# sourceMappingURL=assert.js.map