"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAttribute = exports.parseRawLog = exports.parseLogs = exports.parseLog = exports.parseEvent = exports.parseAttribute = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const utils_1 = require("@cosmjs/utils");
function parseAttribute(input) {
    if (!(0, utils_1.isNonNullObject)(input))
        throw new Error("Attribute must be a non-null object");
    const { key, value } = input;
    if (typeof key !== "string" || !key)
        throw new Error("Attribute's key must be a non-empty string");
    if (typeof value !== "string" && typeof value !== "undefined") {
        throw new Error("Attribute's value must be a string or unset");
    }
    return {
        key: key,
        value: value || "",
    };
}
exports.parseAttribute = parseAttribute;
function parseEvent(input) {
    if (!(0, utils_1.isNonNullObject)(input))
        throw new Error("Event must be a non-null object");
    const { type, attributes } = input;
    if (typeof type !== "string" || type === "") {
        throw new Error(`Event type must be a non-empty string`);
    }
    if (!Array.isArray(attributes))
        throw new Error("Event's attributes must be an array");
    return {
        type: type,
        attributes: attributes.map(parseAttribute),
    };
}
exports.parseEvent = parseEvent;
function parseLog(input) {
    if (!(0, utils_1.isNonNullObject)(input))
        throw new Error("Log must be a non-null object");
    const { msg_index, log, events } = input;
    if (typeof msg_index !== "number")
        throw new Error("Log's msg_index must be a number");
    if (typeof log !== "string")
        throw new Error("Log's log must be a string");
    if (!Array.isArray(events))
        throw new Error("Log's events must be an array");
    return {
        msg_index: msg_index,
        log: log,
        events: events.map(parseEvent),
    };
}
exports.parseLog = parseLog;
function parseLogs(input) {
    if (!Array.isArray(input))
        throw new Error("Logs must be an array");
    return input.map(parseLog);
}
exports.parseLogs = parseLogs;
function parseRawLog(input = "[]") {
    const logsToParse = JSON.parse(input).map(({ events }, i) => ({
        msg_index: i,
        events,
        log: "",
    }));
    return parseLogs(logsToParse);
}
exports.parseRawLog = parseRawLog;
/**
 * Searches in logs for the first event of the given event type and in that event
 * for the first first attribute with the given attribute key.
 *
 * Throws if the attribute was not found.
 */
function findAttribute(logs, eventType, attrKey) {
    var _a;
    const firstLogs = logs.find(() => true);
    const out = (_a = firstLogs === null || firstLogs === void 0 ? void 0 : firstLogs.events.find((event) => event.type === eventType)) === null || _a === void 0 ? void 0 : _a.attributes.find((attr) => attr.key === attrKey);
    if (!out) {
        throw new Error(`Could not find attribute '${attrKey}' in first event of type '${eventType}' in first log.`);
    }
    return out;
}
exports.findAttribute = findAttribute;
//# sourceMappingURL=logs.js.map