"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Random = void 0;
class Random {
    /**
     * Returns `count` cryptographically secure random bytes
     */
    static getBytes(count) {
        try {
            const globalObject = typeof window === "object" ? window : self;
            const cryptoApi = typeof globalObject.crypto !== "undefined" ? globalObject.crypto : globalObject.msCrypto;
            const out = new Uint8Array(count);
            cryptoApi.getRandomValues(out);
            return out;
        }
        catch (_a) {
            try {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const crypto = require("crypto");
                return new Uint8Array([...crypto.randomBytes(count)]);
            }
            catch (_b) {
                throw new Error("No secure random number generator found");
            }
        }
    }
}
exports.Random = Random;
//# sourceMappingURL=random.js.map