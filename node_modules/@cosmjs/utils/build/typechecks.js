"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUint8Array = exports.isNonNullObject = void 0;
/**
 * Checks if data is a non-null object (i.e. matches the TypeScript object type).
 *
 * Note: this returns true for arrays, which are objects in JavaScript
 * even though array and object are different types in JSON.
 *
 * @see https://www.typescriptlang.org/docs/handbook/basic-types.html#object
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function isNonNullObject(data) {
    return typeof data === "object" && data !== null;
}
exports.isNonNullObject = isNonNullObject;
/**
 * Checks if data is an Uint8Array. Note: Buffer is treated as not a Uint8Array
 */
function isUint8Array(data) {
    if (!isNonNullObject(data))
        return false;
    // Avoid instanceof check which is unreliable in some JS environments
    // https://medium.com/@simonwarta/limitations-of-the-instanceof-operator-f4bcdbe7a400
    // Use check that was discussed in https://github.com/crypto-browserify/pbkdf2/pull/81
    if (Object.prototype.toString.call(data) !== "[object Uint8Array]")
        return false;
    if (typeof Buffer !== "undefined" && typeof Buffer.isBuffer !== "undefined") {
        // Buffer.isBuffer is available at runtime
        if (Buffer.isBuffer(data))
            return false;
    }
    return true;
}
exports.isUint8Array = isUint8Array;
//# sourceMappingURL=typechecks.js.map