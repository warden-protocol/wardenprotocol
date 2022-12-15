"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeSignDoc = exports.makeSignDoc = exports.sortedJsonStringify = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const encoding_1 = require("@cosmjs/encoding");
const math_1 = require("@cosmjs/math");
function sortedObject(obj) {
    if (typeof obj !== "object" || obj === null) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(sortedObject);
    }
    const sortedKeys = Object.keys(obj).sort();
    const result = {};
    // NOTE: Use forEach instead of reduce for performance with large objects eg Wasm code
    sortedKeys.forEach((key) => {
        result[key] = sortedObject(obj[key]);
    });
    return result;
}
/** Returns a JSON string with objects sorted by key */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function sortedJsonStringify(obj) {
    return JSON.stringify(sortedObject(obj));
}
exports.sortedJsonStringify = sortedJsonStringify;
function makeSignDoc(msgs, fee, chainId, memo, accountNumber, sequence) {
    return {
        chain_id: chainId,
        account_number: math_1.Uint53.fromString(accountNumber.toString()).toString(),
        sequence: math_1.Uint53.fromString(sequence.toString()).toString(),
        fee: fee,
        msgs: msgs,
        memo: memo || "",
    };
}
exports.makeSignDoc = makeSignDoc;
function serializeSignDoc(signDoc) {
    return (0, encoding_1.toUtf8)(sortedJsonStringify(signDoc));
}
exports.serializeSignDoc = serializeSignDoc;
//# sourceMappingURL=signdoc.js.map