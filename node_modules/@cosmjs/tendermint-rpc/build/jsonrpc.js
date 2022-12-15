"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJsonRpcRequest = void 0;
const numbersWithoutZero = "123456789";
/** generates a random numeric character  */
function randomNumericChar() {
    return numbersWithoutZero[Math.floor(Math.random() * numbersWithoutZero.length)];
}
/**
 * An (absolutely not cryptographically secure) random integer > 0.
 */
function randomId() {
    return parseInt(Array.from({ length: 12 })
        .map(() => randomNumericChar())
        .join(""), 10);
}
/** Creates a JSON-RPC request with random ID */
// eslint-disable-next-line @typescript-eslint/ban-types
function createJsonRpcRequest(method, params) {
    const paramsCopy = params ? { ...params } : {};
    return {
        jsonrpc: "2.0",
        id: randomId(),
        method: method,
        params: paramsCopy,
    };
}
exports.createJsonRpcRequest = createJsonRpcRequest;
//# sourceMappingURL=jsonrpc.js.map