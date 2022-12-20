"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeJsonRpcId = void 0;
// Start with 10001 to avoid possible collisions with all hand-selected values like e.g. 1,2,3,42,100
let counter = 10000;
/**
 * Creates a new ID to be used for creating a JSON-RPC request.
 *
 * Multiple calls of this produce unique values.
 *
 * The output may be any value compatible to JSON-RPC request IDs with an undefined output format and generation logic.
 */
function makeJsonRpcId() {
    return (counter += 1);
}
exports.makeJsonRpcId = makeJsonRpcId;
//# sourceMappingURL=id.js.map