"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sha512 = exports.Sha512 = exports.sha256 = exports.Sha256 = void 0;
const sha256_1 = require("@noble/hashes/sha256");
const sha512_1 = require("@noble/hashes/sha512");
const utils_1 = require("./utils");
class Sha256 {
    constructor(firstData) {
        this.blockSize = 512 / 8;
        this.impl = sha256_1.sha256.create();
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
exports.Sha256 = Sha256;
/** Convenience function equivalent to `new Sha256(data).digest()` */
function sha256(data) {
    return new Sha256(data).digest();
}
exports.sha256 = sha256;
class Sha512 {
    constructor(firstData) {
        this.blockSize = 1024 / 8;
        this.impl = sha512_1.sha512.create();
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
exports.Sha512 = Sha512;
/** Convenience function equivalent to `new Sha512(data).digest()` */
function sha512(data) {
    return new Sha512(data).digest();
}
exports.sha512 = sha512;
//# sourceMappingURL=sha.js.map