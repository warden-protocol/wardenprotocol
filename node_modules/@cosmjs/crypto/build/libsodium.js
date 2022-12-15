"use strict";
// Keep all classes requiring libsodium-js in one file as having multiple
// requiring of the libsodium-wrappers module currently crashes browsers
//
// libsodium.js API: https://gist.github.com/webmaster128/b2dbe6d54d36dd168c9fabf441b9b09c
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Xchacha20poly1305Ietf = exports.xchacha20NonceLength = exports.Ed25519 = exports.Ed25519Keypair = exports.Argon2id = exports.isArgon2idOptions = void 0;
const utils_1 = require("@cosmjs/utils");
const libsodium_wrappers_1 = __importDefault(require("libsodium-wrappers"));
function isArgon2idOptions(thing) {
    if (!(0, utils_1.isNonNullObject)(thing))
        return false;
    if (typeof thing.outputLength !== "number")
        return false;
    if (typeof thing.opsLimit !== "number")
        return false;
    if (typeof thing.memLimitKib !== "number")
        return false;
    return true;
}
exports.isArgon2idOptions = isArgon2idOptions;
class Argon2id {
    static async execute(password, salt, options) {
        await libsodium_wrappers_1.default.ready;
        return libsodium_wrappers_1.default.crypto_pwhash(options.outputLength, password, salt, // libsodium only supports 16 byte salts and will throw when you don't respect that
        options.opsLimit, options.memLimitKib * 1024, libsodium_wrappers_1.default.crypto_pwhash_ALG_ARGON2ID13);
    }
}
exports.Argon2id = Argon2id;
class Ed25519Keypair {
    constructor(privkey, pubkey) {
        this.privkey = privkey;
        this.pubkey = pubkey;
    }
    // a libsodium privkey has the format `<ed25519 privkey> + <ed25519 pubkey>`
    static fromLibsodiumPrivkey(libsodiumPrivkey) {
        if (libsodiumPrivkey.length !== 64) {
            throw new Error(`Unexpected key length ${libsodiumPrivkey.length}. Must be 64.`);
        }
        return new Ed25519Keypair(libsodiumPrivkey.slice(0, 32), libsodiumPrivkey.slice(32, 64));
    }
    toLibsodiumPrivkey() {
        return new Uint8Array([...this.privkey, ...this.pubkey]);
    }
}
exports.Ed25519Keypair = Ed25519Keypair;
class Ed25519 {
    /**
     * Generates a keypair deterministically from a given 32 bytes seed.
     *
     * This seed equals the Ed25519 private key.
     * For implementation details see crypto_sign_seed_keypair in
     * https://download.libsodium.org/doc/public-key_cryptography/public-key_signatures.html
     * and diagram on https://blog.mozilla.org/warner/2011/11/29/ed25519-keys/
     */
    static async makeKeypair(seed) {
        await libsodium_wrappers_1.default.ready;
        const keypair = libsodium_wrappers_1.default.crypto_sign_seed_keypair(seed);
        return Ed25519Keypair.fromLibsodiumPrivkey(keypair.privateKey);
    }
    static async createSignature(message, keyPair) {
        await libsodium_wrappers_1.default.ready;
        return libsodium_wrappers_1.default.crypto_sign_detached(message, keyPair.toLibsodiumPrivkey());
    }
    static async verifySignature(signature, message, pubkey) {
        await libsodium_wrappers_1.default.ready;
        return libsodium_wrappers_1.default.crypto_sign_verify_detached(signature, message, pubkey);
    }
}
exports.Ed25519 = Ed25519;
/**
 * Nonce length in bytes for all flavours of XChaCha20.
 *
 * @see https://libsodium.gitbook.io/doc/advanced/stream_ciphers/xchacha20#notes
 */
exports.xchacha20NonceLength = 24;
class Xchacha20poly1305Ietf {
    static async encrypt(message, key, nonce) {
        await libsodium_wrappers_1.default.ready;
        const additionalData = null;
        return libsodium_wrappers_1.default.crypto_aead_xchacha20poly1305_ietf_encrypt(message, additionalData, null, // secret nonce: unused and should be null (https://download.libsodium.org/doc/secret-key_cryptography/aead/chacha20-poly1305/xchacha20-poly1305_construction)
        nonce, key);
    }
    static async decrypt(ciphertext, key, nonce) {
        await libsodium_wrappers_1.default.ready;
        const additionalData = null;
        return libsodium_wrappers_1.default.crypto_aead_xchacha20poly1305_ietf_decrypt(null, // secret nonce: unused and should be null (https://download.libsodium.org/doc/secret-key_cryptography/aead/chacha20-poly1305/xchacha20-poly1305_construction)
        ciphertext, additionalData, nonce, key);
    }
}
exports.Xchacha20poly1305Ietf = Xchacha20poly1305Ietf;
//# sourceMappingURL=libsodium.js.map