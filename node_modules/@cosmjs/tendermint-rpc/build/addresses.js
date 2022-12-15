"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pubkeyToAddress = exports.pubkeyToRawAddress = exports.rawSecp256k1PubkeyToRawAddress = exports.rawEd25519PubkeyToRawAddress = void 0;
const crypto_1 = require("@cosmjs/crypto");
const encoding_1 = require("@cosmjs/encoding");
function rawEd25519PubkeyToRawAddress(pubkeyData) {
    if (pubkeyData.length !== 32) {
        throw new Error(`Invalid Ed25519 pubkey length: ${pubkeyData.length}`);
    }
    return (0, crypto_1.sha256)(pubkeyData).slice(0, 20);
}
exports.rawEd25519PubkeyToRawAddress = rawEd25519PubkeyToRawAddress;
function rawSecp256k1PubkeyToRawAddress(pubkeyData) {
    if (pubkeyData.length !== 33) {
        throw new Error(`Invalid Secp256k1 pubkey length (compressed): ${pubkeyData.length}`);
    }
    return (0, crypto_1.ripemd160)((0, crypto_1.sha256)(pubkeyData));
}
exports.rawSecp256k1PubkeyToRawAddress = rawSecp256k1PubkeyToRawAddress;
// For secp256k1 this assumes we already have a compressed pubkey.
function pubkeyToRawAddress(type, data) {
    switch (type) {
        case "ed25519":
            return rawEd25519PubkeyToRawAddress(data);
        case "secp256k1":
            return rawSecp256k1PubkeyToRawAddress(data);
        default:
            // Keep this case here to guard against new types being added but not handled
            throw new Error(`Pubkey type ${type} not supported`);
    }
}
exports.pubkeyToRawAddress = pubkeyToRawAddress;
function pubkeyToAddress(type, data) {
    return (0, encoding_1.toHex)(pubkeyToRawAddress(type, data)).toUpperCase();
}
exports.pubkeyToAddress = pubkeyToAddress;
//# sourceMappingURL=addresses.js.map