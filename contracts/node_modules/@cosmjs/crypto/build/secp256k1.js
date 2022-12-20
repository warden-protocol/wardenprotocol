"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Secp256k1 = void 0;
const encoding_1 = require("@cosmjs/encoding");
const bn_js_1 = __importDefault(require("bn.js"));
const elliptic_1 = __importDefault(require("elliptic"));
const secp256k1signature_1 = require("./secp256k1signature");
const secp256k1 = new elliptic_1.default.ec("secp256k1");
const secp256k1N = new bn_js_1.default("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141", "hex");
class Secp256k1 {
    /**
     * Takes a 32 byte private key and returns a privkey/pubkey pair.
     *
     * The resulting pubkey is uncompressed. For the use in Cosmos it should
     * be compressed first using `Secp256k1.compressPubkey`.
     */
    static async makeKeypair(privkey) {
        if (privkey.length !== 32) {
            // is this check missing in secp256k1.validatePrivateKey?
            // https://github.com/bitjson/bitcoin-ts/issues/4
            throw new Error("input data is not a valid secp256k1 private key");
        }
        const keypair = secp256k1.keyFromPrivate(privkey);
        if (keypair.validate().result !== true) {
            throw new Error("input data is not a valid secp256k1 private key");
        }
        // range test that is not part of the elliptic implementation
        const privkeyAsBigInteger = new bn_js_1.default(privkey);
        if (privkeyAsBigInteger.gte(secp256k1N)) {
            // not strictly smaller than N
            throw new Error("input data is not a valid secp256k1 private key");
        }
        const out = {
            privkey: (0, encoding_1.fromHex)(keypair.getPrivate("hex")),
            // encodes uncompressed as
            // - 1-byte prefix "04"
            // - 32-byte x coordinate
            // - 32-byte y coordinate
            pubkey: Uint8Array.from(keypair.getPublic("array")),
        };
        return out;
    }
    /**
     * Creates a signature that is
     * - deterministic (RFC 6979)
     * - lowS signature
     * - DER encoded
     */
    static async createSignature(messageHash, privkey) {
        if (messageHash.length === 0) {
            throw new Error("Message hash must not be empty");
        }
        if (messageHash.length > 32) {
            throw new Error("Message hash length must not exceed 32 bytes");
        }
        const keypair = secp256k1.keyFromPrivate(privkey);
        // the `canonical` option ensures creation of lowS signature representations
        const { r, s, recoveryParam } = keypair.sign(messageHash, { canonical: true });
        if (typeof recoveryParam !== "number")
            throw new Error("Recovery param missing");
        return new secp256k1signature_1.ExtendedSecp256k1Signature(Uint8Array.from(r.toArray()), Uint8Array.from(s.toArray()), recoveryParam);
    }
    static async verifySignature(signature, messageHash, pubkey) {
        if (messageHash.length === 0) {
            throw new Error("Message hash must not be empty");
        }
        if (messageHash.length > 32) {
            throw new Error("Message hash length must not exceed 32 bytes");
        }
        const keypair = secp256k1.keyFromPublic(pubkey);
        // From https://github.com/indutny/elliptic:
        //
        //     Sign the message's hash (input must be an array, or a hex-string)
        //
        //     Signature MUST be either:
        //     1) DER-encoded signature as hex-string; or
        //     2) DER-encoded signature as buffer; or
        //     3) object with two hex-string properties (r and s); or
        //     4) object with two buffer properties (r and s)
        //
        // Uint8Array is not a Buffer, but elliptic seems to be happy with the interface
        // common to both types. Uint8Array is not an array of ints but the interface is
        // similar
        try {
            return keypair.verify(messageHash, signature.toDer());
        }
        catch (error) {
            return false;
        }
    }
    static recoverPubkey(signature, messageHash) {
        const signatureForElliptic = { r: (0, encoding_1.toHex)(signature.r()), s: (0, encoding_1.toHex)(signature.s()) };
        const point = secp256k1.recoverPubKey(messageHash, signatureForElliptic, signature.recovery);
        const keypair = secp256k1.keyFromPublic(point);
        return (0, encoding_1.fromHex)(keypair.getPublic(false, "hex"));
    }
    /**
     * Takes a compressed or uncompressed pubkey and return a compressed one.
     *
     * This function is idempotent.
     */
    static compressPubkey(pubkey) {
        switch (pubkey.length) {
            case 33:
                return pubkey;
            case 65:
                return Uint8Array.from(secp256k1.keyFromPublic(pubkey).getPublic(true, "array"));
            default:
                throw new Error("Invalid pubkey length");
        }
    }
    /**
     * Takes a compressed or uncompressed pubkey and returns an uncompressed one.
     *
     * This function is idempotent.
     */
    static uncompressPubkey(pubkey) {
        switch (pubkey.length) {
            case 33:
                return Uint8Array.from(secp256k1.keyFromPublic(pubkey).getPublic(false, "array"));
            case 65:
                return pubkey;
            default:
                throw new Error("Invalid pubkey length");
        }
    }
    static trimRecoveryByte(signature) {
        switch (signature.length) {
            case 64:
                return signature;
            case 65:
                return signature.slice(0, 64);
            default:
                throw new Error("Invalid signature length");
        }
    }
}
exports.Secp256k1 = Secp256k1;
//# sourceMappingURL=secp256k1.js.map