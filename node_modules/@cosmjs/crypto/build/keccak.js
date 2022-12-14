"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keccak256 = exports.Keccak256 = void 0;
const sha3_1 = require("@noble/hashes/sha3");
const utils_1 = require("./utils");
class Keccak256 {
    constructor(firstData) {
        this.blockSize = 512 / 8;
        this.impl = sha3_1.keccak_256.create();
        if (firstData) {
            this.update(firstData);
        }
    }
    update(data) {
        this.impl.update((0, utils_1.toRealUint8Array)(data));
        return this;
    }
    digest() {
        return this.impl.digest();
    }
}
exports.Keccak256 = Keccak256;
/** Convenience function equivalent to `new Keccak256(data).digest()` */
function keccak256(data) {
    return new Keccak256(data).digest();
}
exports.keccak256 = keccak256;
//# sourceMappingURL=keccak.js.map