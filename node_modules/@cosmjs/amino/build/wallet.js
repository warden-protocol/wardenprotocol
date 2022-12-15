"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = exports.supportedAlgorithms = exports.executeKdf = exports.cosmjsSalt = void 0;
const crypto_1 = require("@cosmjs/crypto");
const encoding_1 = require("@cosmjs/encoding");
/**
 * A fixed salt is chosen to archive a deterministic password to key derivation.
 * This reduces the scope of a potential rainbow attack to all CosmJS users.
 * Must be 16 bytes due to implementation limitations.
 */
exports.cosmjsSalt = (0, encoding_1.toAscii)("The CosmJS salt.");
async function executeKdf(password, configuration) {
    switch (configuration.algorithm) {
        case "argon2id": {
            const options = configuration.params;
            if (!(0, crypto_1.isArgon2idOptions)(options))
                throw new Error("Invalid format of argon2id params");
            return crypto_1.Argon2id.execute(password, exports.cosmjsSalt, options);
        }
        default:
            throw new Error("Unsupported KDF algorithm");
    }
}
exports.executeKdf = executeKdf;
exports.supportedAlgorithms = {
    xchacha20poly1305Ietf: "xchacha20poly1305-ietf",
};
async function encrypt(plaintext, encryptionKey, config) {
    switch (config.algorithm) {
        case exports.supportedAlgorithms.xchacha20poly1305Ietf: {
            const nonce = crypto_1.Random.getBytes(crypto_1.xchacha20NonceLength);
            // Prepend fixed-length nonce to ciphertext as suggested in the example from https://github.com/jedisct1/libsodium.js#api
            return new Uint8Array([
                ...nonce,
                ...(await crypto_1.Xchacha20poly1305Ietf.encrypt(plaintext, encryptionKey, nonce)),
            ]);
        }
        default:
            throw new Error(`Unsupported encryption algorithm: '${config.algorithm}'`);
    }
}
exports.encrypt = encrypt;
async function decrypt(ciphertext, encryptionKey, config) {
    switch (config.algorithm) {
        case exports.supportedAlgorithms.xchacha20poly1305Ietf: {
            const nonce = ciphertext.slice(0, crypto_1.xchacha20NonceLength);
            return crypto_1.Xchacha20poly1305Ietf.decrypt(ciphertext.slice(crypto_1.xchacha20NonceLength), encryptionKey, nonce);
        }
        default:
            throw new Error(`Unsupported encryption algorithm: '${config.algorithm}'`);
    }
}
exports.decrypt = decrypt;
//# sourceMappingURL=wallet.js.map