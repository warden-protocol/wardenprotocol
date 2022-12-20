"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayContentStartsWith = exports.arrayContentEquals = void 0;
/**
 * Compares the content of two arrays-like objects for equality.
 *
 * Equality is defined as having equal length and element values, where element equality means `===` returning `true`.
 *
 * This allows you to compare the content of a Buffer, Uint8Array or number[], ignoring the specific type.
 * As a consequence, this returns different results than Jasmine's `toEqual`, which ensures elements have the same type.
 */
function arrayContentEquals(a, b) {
    if (a.length !== b.length)
        return false;
    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i])
            return false;
    }
    return true;
}
exports.arrayContentEquals = arrayContentEquals;
/**
 * Checks if `a` starts with the contents of `b`.
 *
 * This requires equality of the element values, where element equality means `===` returning `true`.
 *
 * This allows you to compare the content of a Buffer, Uint8Array or number[], ignoring the specific type.
 * As a consequence, this returns different results than Jasmine's `toEqual`, which ensures elements have the same type.
 */
function arrayContentStartsWith(a, b) {
    if (a.length < b.length)
        return false;
    for (let i = 0; i < b.length; ++i) {
        if (a[i] !== b[i])
            return false;
    }
    return true;
}
exports.arrayContentStartsWith = arrayContentStartsWith;
//# sourceMappingURL=arrays.js.map