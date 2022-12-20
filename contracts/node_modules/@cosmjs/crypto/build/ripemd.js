"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ripemd160 = exports.Ripemd160 = void 0;
const ripemd160_1 = require("@noble/hashes/ripemd160");
const utils_1 = require("./utils");
class Ripemd160 {
    constructor(firstData) {
        this.blockSize = 512 / 8;
        this.impl = ripemd160_1.ripemd160.create();
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
exports.Ripemd160 = Ripemd160;
/** Convenience function equivalent to `new Ripemd160(data).digest()` */
function ripemd160(data) {
    return new Ripemd160(data).digest();
}
exports.ripemd160 = ripemd160;
//# sourceMappingURL=ripemd.js.map