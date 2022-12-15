"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeBlockId = exports.encodeVersion = exports.encodeBytes = exports.encodeTime = exports.encodeInt = exports.encodeString = exports.Integer = exports.dictionaryToStringMap = exports.may = exports.optional = exports.assertNotEmpty = exports.assertObject = exports.assertArray = exports.assertNumber = exports.assertString = exports.assertBoolean = exports.assertSet = void 0;
const encoding_1 = require("@cosmjs/encoding");
const math_1 = require("@cosmjs/math");
/**
 * A runtime checker that ensures a given value is set (i.e. not undefined or null)
 *
 * This is used when you want to verify that data at runtime matches the expected type.
 */
function assertSet(value) {
    if (value === undefined) {
        throw new Error("Value must not be undefined");
    }
    if (value === null) {
        throw new Error("Value must not be null");
    }
    return value;
}
exports.assertSet = assertSet;
/**
 * A runtime checker that ensures a given value is a boolean
 *
 * This is used when you want to verify that data at runtime matches the expected type.
 * This implies assertSet.
 */
function assertBoolean(value) {
    assertSet(value);
    if (typeof value !== "boolean") {
        throw new Error("Value must be a boolean");
    }
    return value;
}
exports.assertBoolean = assertBoolean;
/**
 * A runtime checker that ensures a given value is a string.
 *
 * This is used when you want to verify that data at runtime matches the expected type.
 * This implies assertSet.
 */
function assertString(value) {
    assertSet(value);
    if (typeof value !== "string") {
        throw new Error("Value must be a string");
    }
    return value;
}
exports.assertString = assertString;
/**
 * A runtime checker that ensures a given value is a number
 *
 * This is used when you want to verify that data at runtime matches the expected type.
 * This implies assertSet.
 */
function assertNumber(value) {
    assertSet(value);
    if (typeof value !== "number") {
        throw new Error("Value must be a number");
    }
    return value;
}
exports.assertNumber = assertNumber;
/**
 * A runtime checker that ensures a given value is an array
 *
 * This is used when you want to verify that data at runtime matches the expected type.
 * This implies assertSet.
 */
function assertArray(value) {
    assertSet(value);
    if (!Array.isArray(value)) {
        throw new Error("Value must be a an array");
    }
    return value;
}
exports.assertArray = assertArray;
/**
 * A runtime checker that ensures a given value is an object in the sense of JSON
 * (an unordered collection of key–value pairs where the keys are strings)
 *
 * This is used when you want to verify that data at runtime matches the expected type.
 * This implies assertSet.
 */
function assertObject(value) {
    assertSet(value);
    if (typeof value !== "object") {
        throw new Error("Value must be an object");
    }
    // Exclude special kind of objects like Array, Date or Uint8Array
    // Object.prototype.toString() returns a specified value:
    // http://www.ecma-international.org/ecma-262/7.0/index.html#sec-object.prototype.tostring
    if (Object.prototype.toString.call(value) !== "[object Object]") {
        throw new Error("Value must be a simple object");
    }
    return value;
}
exports.assertObject = assertObject;
/**
 * Throws an error if value matches the empty value for the
 * given type (array/string of length 0, number of value 0, ...)
 *
 * Otherwise returns the value.
 *
 * This implies assertSet
 */
function assertNotEmpty(value) {
    assertSet(value);
    if (typeof value === "number" && value === 0) {
        throw new Error("must provide a non-zero value");
    }
    else if (value.length === 0) {
        throw new Error("must provide a non-empty value");
    }
    return value;
}
exports.assertNotEmpty = assertNotEmpty;
// optional uses the value or provides a default
function optional(value, fallback) {
    return value === undefined || value === null ? fallback : value;
}
exports.optional = optional;
// may will run the transform if value is defined, otherwise returns undefined
function may(transform, value) {
    return value === undefined || value === null ? undefined : transform(value);
}
exports.may = may;
function dictionaryToStringMap(obj) {
    const out = new Map();
    for (const key of Object.keys(obj)) {
        const value = obj[key];
        if (typeof value !== "string") {
            throw new Error("Found dictionary value of type other than string");
        }
        out.set(key, value);
    }
    return out;
}
exports.dictionaryToStringMap = dictionaryToStringMap;
class Integer {
    static parse(input) {
        const asInt = typeof input === "number" ? new math_1.Int53(input) : math_1.Int53.fromString(input);
        return asInt.toNumber();
    }
    static encode(num) {
        return new math_1.Int53(num).toString();
    }
}
exports.Integer = Integer;
// Encodings needed for hashing block headers
// Several of these functions are inspired by https://github.com/nomic-io/js-tendermint/blob/tendermint-0.30/src/
// See https://github.com/tendermint/go-amino/blob/v0.15.0/encoder.go#L193-L195
function encodeString(s) {
    const utf8 = (0, encoding_1.toUtf8)(s);
    return Uint8Array.from([utf8.length, ...utf8]);
}
exports.encodeString = encodeString;
// See https://github.com/tendermint/go-amino/blob/v0.15.0/encoder.go#L79-L87
function encodeInt(n) {
    // eslint-disable-next-line no-bitwise
    return n >= 0x80 ? Uint8Array.from([(n & 0xff) | 0x80, ...encodeInt(n >> 7)]) : Uint8Array.from([n & 0xff]);
}
exports.encodeInt = encodeInt;
// See https://github.com/tendermint/go-amino/blob/v0.15.0/encoder.go#L134-L178
function encodeTime(time) {
    const milliseconds = time.getTime();
    const seconds = Math.floor(milliseconds / 1000);
    const secondsArray = seconds ? [0x08, ...encodeInt(seconds)] : new Uint8Array();
    const nanoseconds = (time.nanoseconds || 0) + (milliseconds % 1000) * 1e6;
    const nanosecondsArray = nanoseconds ? [0x10, ...encodeInt(nanoseconds)] : new Uint8Array();
    return Uint8Array.from([...secondsArray, ...nanosecondsArray]);
}
exports.encodeTime = encodeTime;
// See https://github.com/tendermint/go-amino/blob/v0.15.0/encoder.go#L180-L187
function encodeBytes(bytes) {
    // Since we're only dealing with short byte arrays we don't need a full VarBuffer implementation yet
    if (bytes.length >= 0x80)
        throw new Error("Not implemented for byte arrays of length 128 or more");
    return bytes.length ? Uint8Array.from([bytes.length, ...bytes]) : new Uint8Array();
}
exports.encodeBytes = encodeBytes;
function encodeVersion(version) {
    const blockArray = version.block ? Uint8Array.from([0x08, ...encodeInt(version.block)]) : new Uint8Array();
    const appArray = version.app ? Uint8Array.from([0x10, ...encodeInt(version.app)]) : new Uint8Array();
    return Uint8Array.from([...blockArray, ...appArray]);
}
exports.encodeVersion = encodeVersion;
function encodeBlockId(blockId) {
    return Uint8Array.from([
        0x0a,
        blockId.hash.length,
        ...blockId.hash,
        0x12,
        blockId.parts.hash.length + 4,
        0x08,
        blockId.parts.total,
        0x12,
        blockId.parts.hash.length,
        ...blockId.parts.hash,
    ]);
}
exports.encodeBlockId = encodeBlockId;
//# sourceMappingURL=encodings.js.map