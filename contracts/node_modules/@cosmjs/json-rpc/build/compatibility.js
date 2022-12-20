"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isJsonCompatibleDictionary = exports.isJsonCompatibleArray = exports.isJsonCompatibleValue = void 0;
function isJsonCompatibleValue(value) {
    if (typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean" ||
        value === null ||
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        isJsonCompatibleArray(value) ||
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        isJsonCompatibleDictionary(value)) {
        return true;
    }
    else {
        return false;
    }
}
exports.isJsonCompatibleValue = isJsonCompatibleValue;
function isJsonCompatibleArray(value) {
    if (!Array.isArray(value)) {
        return false;
    }
    for (const item of value) {
        if (!isJsonCompatibleValue(item)) {
            return false;
        }
    }
    // all items okay
    return true;
}
exports.isJsonCompatibleArray = isJsonCompatibleArray;
function isJsonCompatibleDictionary(data) {
    if (typeof data !== "object" || data === null) {
        // data must be a non-null object
        return false;
    }
    // Exclude special kind of objects like Array, Date or Uint8Array
    // Object.prototype.toString() returns a specified value:
    // http://www.ecma-international.org/ecma-262/7.0/index.html#sec-object.prototype.tostring
    if (Object.prototype.toString.call(data) !== "[object Object]") {
        return false;
    }
    return Object.values(data).every(isJsonCompatibleValue);
}
exports.isJsonCompatibleDictionary = isJsonCompatibleDictionary;
//# sourceMappingURL=compatibility.js.map