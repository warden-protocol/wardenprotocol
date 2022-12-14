"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTime = exports.toSeconds = exports.fromSeconds = exports.toRfc3339WithNanoseconds = exports.fromRfc3339WithNanoseconds = void 0;
const encoding_1 = require("@cosmjs/encoding");
const math_1 = require("@cosmjs/math");
function fromRfc3339WithNanoseconds(dateTimeString) {
    const out = (0, encoding_1.fromRfc3339)(dateTimeString);
    const nanosecondsMatch = dateTimeString.match(/\.(\d+)Z$/);
    const nanoseconds = nanosecondsMatch ? nanosecondsMatch[1].slice(3) : "";
    out.nanoseconds = parseInt(nanoseconds.padEnd(6, "0"), 10);
    return out;
}
exports.fromRfc3339WithNanoseconds = fromRfc3339WithNanoseconds;
function toRfc3339WithNanoseconds(dateTime) {
    var _a, _b;
    const millisecondIso = dateTime.toISOString();
    const nanoseconds = (_b = (_a = dateTime.nanoseconds) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "";
    return `${millisecondIso.slice(0, -1)}${nanoseconds.padStart(6, "0")}Z`;
}
exports.toRfc3339WithNanoseconds = toRfc3339WithNanoseconds;
function fromSeconds(seconds, nanos = 0) {
    const checkedNanos = new math_1.Uint32(nanos).toNumber();
    if (checkedNanos > 999999999) {
        throw new Error("Nano seconds must not exceed 999999999");
    }
    const out = new Date(seconds * 1000 + Math.floor(checkedNanos / 1000000));
    out.nanoseconds = checkedNanos % 1000000;
    return out;
}
exports.fromSeconds = fromSeconds;
/**
 * Calculates the UNIX timestamp in seconds as well as the nanoseconds after the given second.
 *
 * This is useful when dealing with external systems like the protobuf type
 * [.google.protobuf.Timestamp](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.Timestamp)
 * or any other system that does not use millisecond precision.
 */
function toSeconds(date) {
    var _a;
    return {
        seconds: Math.floor(date.getTime() / 1000),
        nanos: (date.getTime() % 1000) * 1000000 + ((_a = date.nanoseconds) !== null && _a !== void 0 ? _a : 0),
    };
}
exports.toSeconds = toSeconds;
/** @deprecated Use fromRfc3339WithNanoseconds/toRfc3339WithNanoseconds instead */
class DateTime {
    /** @deprecated Use fromRfc3339WithNanoseconds instead */
    static decode(dateTimeString) {
        return fromRfc3339WithNanoseconds(dateTimeString);
    }
    /** @deprecated Use toRfc3339WithNanoseconds instead */
    static encode(dateTime) {
        return toRfc3339WithNanoseconds(dateTime);
    }
}
exports.DateTime = DateTime;
//# sourceMappingURL=dates.js.map