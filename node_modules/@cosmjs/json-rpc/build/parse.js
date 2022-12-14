"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJsonRpcResponse = exports.parseJsonRpcSuccessResponse = exports.parseJsonRpcErrorResponse = exports.parseJsonRpcRequest = exports.parseJsonRpcId = void 0;
const compatibility_1 = require("./compatibility");
/**
 * Extracts ID field from request or response object.
 *
 * Returns `null` when no valid ID was found.
 */
function parseJsonRpcId(data) {
    if (!(0, compatibility_1.isJsonCompatibleDictionary)(data)) {
        throw new Error("Data must be JSON compatible dictionary");
    }
    const id = data.id;
    if (typeof id !== "number" && typeof id !== "string") {
        return null;
    }
    return id;
}
exports.parseJsonRpcId = parseJsonRpcId;
function parseJsonRpcRequest(data) {
    if (!(0, compatibility_1.isJsonCompatibleDictionary)(data)) {
        throw new Error("Data must be JSON compatible dictionary");
    }
    if (data.jsonrpc !== "2.0") {
        throw new Error(`Got unexpected jsonrpc version: ${data.jsonrpc}`);
    }
    const id = parseJsonRpcId(data);
    if (id === null) {
        throw new Error("Invalid id field");
    }
    const method = data.method;
    if (typeof method !== "string") {
        throw new Error("Invalid method field");
    }
    if (!(0, compatibility_1.isJsonCompatibleArray)(data.params) && !(0, compatibility_1.isJsonCompatibleDictionary)(data.params)) {
        throw new Error("Invalid params field");
    }
    return {
        jsonrpc: "2.0",
        id: id,
        method: method,
        params: data.params,
    };
}
exports.parseJsonRpcRequest = parseJsonRpcRequest;
function parseError(error) {
    if (typeof error.code !== "number") {
        throw new Error("Error property 'code' is not a number");
    }
    if (typeof error.message !== "string") {
        throw new Error("Error property 'message' is not a string");
    }
    let maybeUndefinedData;
    if (error.data === undefined) {
        maybeUndefinedData = undefined;
    }
    else if ((0, compatibility_1.isJsonCompatibleValue)(error.data)) {
        maybeUndefinedData = error.data;
    }
    else {
        throw new Error("Error property 'data' is defined but not a JSON compatible value.");
    }
    return {
        code: error.code,
        message: error.message,
        ...(maybeUndefinedData !== undefined ? { data: maybeUndefinedData } : {}),
    };
}
/** Throws if data is not a JsonRpcErrorResponse */
function parseJsonRpcErrorResponse(data) {
    if (!(0, compatibility_1.isJsonCompatibleDictionary)(data)) {
        throw new Error("Data must be JSON compatible dictionary");
    }
    if (data.jsonrpc !== "2.0") {
        throw new Error(`Got unexpected jsonrpc version: ${JSON.stringify(data)}`);
    }
    const id = data.id;
    if (typeof id !== "number" && typeof id !== "string" && id !== null) {
        throw new Error("Invalid id field");
    }
    if (typeof data.error === "undefined" || !(0, compatibility_1.isJsonCompatibleDictionary)(data.error)) {
        throw new Error("Invalid error field");
    }
    return {
        jsonrpc: "2.0",
        id: id,
        error: parseError(data.error),
    };
}
exports.parseJsonRpcErrorResponse = parseJsonRpcErrorResponse;
/** Throws if data is not a JsonRpcSuccessResponse */
function parseJsonRpcSuccessResponse(data) {
    if (!(0, compatibility_1.isJsonCompatibleDictionary)(data)) {
        throw new Error("Data must be JSON compatible dictionary");
    }
    if (data.jsonrpc !== "2.0") {
        throw new Error(`Got unexpected jsonrpc version: ${JSON.stringify(data)}`);
    }
    const id = data.id;
    if (typeof id !== "number" && typeof id !== "string") {
        throw new Error("Invalid id field");
    }
    if (typeof data.result === "undefined") {
        throw new Error("Invalid result field");
    }
    const result = data.result;
    return {
        jsonrpc: "2.0",
        id: id,
        result: result,
    };
}
exports.parseJsonRpcSuccessResponse = parseJsonRpcSuccessResponse;
/**
 * Returns a JsonRpcErrorResponse if input can be parsed as a JSON-RPC error. Otherwise parses
 * input as JsonRpcSuccessResponse. Throws if input is neither a valid error nor success response.
 */
function parseJsonRpcResponse(data) {
    let response;
    try {
        response = parseJsonRpcErrorResponse(data);
    }
    catch (_) {
        response = parseJsonRpcSuccessResponse(data);
    }
    return response;
}
exports.parseJsonRpcResponse = parseJsonRpcResponse;
//# sourceMappingURL=parse.js.map