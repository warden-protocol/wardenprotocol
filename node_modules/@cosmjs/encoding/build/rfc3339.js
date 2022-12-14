"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRfc3339 = exports.fromRfc3339 = void 0;
const rfc3339Matcher = /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})(\.\d{1,9})?((?:[+-]\d{2}:\d{2})|Z)$/;
function padded(integer, length = 2) {
    const filled = "00000" + integer.toString();
    return filled.substring(filled.length - length);
}
function fromRfc3339(str) {
    const matches = rfc3339Matcher.exec(str);
    if (!matches) {
        throw new Error("Date string is not in RFC3339 format");
    }
    const year = +matches[1];
    const month = +matches[2];
    const day = +matches[3];
    const hour = +matches[4];
    const minute = +matches[5];
    const second = +matches[6];
    // fractional seconds match either undefined or a string like ".1", ".123456789"
    const milliSeconds = matches[7] ? Math.floor(+matches[7] * 1000) : 0;
    let tzOffsetSign;
    let tzOffsetHours;
    let tzOffsetMinutes;
    // if timezone is undefined, it must be Z or nothing (otherwise the group would have captured).
    if (matches[8] === "Z") {
        tzOffsetSign = 1;
        tzOffsetHours = 0;
        tzOffsetMinutes = 0;
    }
    else {
        tzOffsetSign = matches[8].substring(0, 1) === "-" ? -1 : 1;
        tzOffsetHours = +matches[8].substring(1, 3);
        tzOffsetMinutes = +matches[8].substring(4, 6);
    }
    const tzOffset = tzOffsetSign * (tzOffsetHours * 60 + tzOffsetMinutes) * 60; // seconds
    const timestamp = Date.UTC(year, month - 1, day, hour, minute, second, milliSeconds) - tzOffset * 1000;
    return new Date(timestamp);
}
exports.fromRfc3339 = fromRfc3339;
function toRfc3339(date) {
    const year = date.getUTCFullYear();
    const month = padded(date.getUTCMonth() + 1);
    const day = padded(date.getUTCDate());
    const hour = padded(date.getUTCHours());
    const minute = padded(date.getUTCMinutes());
    const second = padded(date.getUTCSeconds());
    const ms = padded(date.getUTCMilliseconds(), 3);
    return `${year}-${month}-${day}T${hour}:${minute}:${second}.${ms}Z`;
}
exports.toRfc3339 = toRfc3339;
//# sourceMappingURL=rfc3339.js.map