"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRealUint8Array = void 0;
// See https://github.com/paulmillr/noble-hashes/issues/25 for why this is needed
function toRealUint8Array(data) {
    if (data instanceof Uint8Array)
        return data;
    else
        return Uint8Array.from(data);
}
exports.toRealUint8Array = toRealUint8Array;
//# sourceMappingURL=utils.js.map