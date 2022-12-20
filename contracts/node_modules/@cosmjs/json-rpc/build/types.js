"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonRpcCode = exports.isJsonRpcSuccessResponse = exports.isJsonRpcErrorResponse = void 0;
function isJsonRpcErrorResponse(response) {
    return typeof response.error === "object";
}
exports.isJsonRpcErrorResponse = isJsonRpcErrorResponse;
function isJsonRpcSuccessResponse(response) {
    return !isJsonRpcErrorResponse(response);
}
exports.isJsonRpcSuccessResponse = isJsonRpcSuccessResponse;
/**
 * Error codes as specified in JSON-RPC 2.0
 *
 * @see https://www.jsonrpc.org/specification#error_object
 */
exports.jsonRpcCode = {
    parseError: -32700,
    invalidRequest: -32600,
    methodNotFound: -32601,
    invalidParams: -32602,
    internalError: -32603,
    // server error (Reserved for implementation-defined server-errors.):
    // -32000 to -32099
    serverError: {
        default: -32000,
    },
};
//# sourceMappingURL=types.js.map