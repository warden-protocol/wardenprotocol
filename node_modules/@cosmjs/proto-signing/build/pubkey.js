"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodePubkey = exports.encodePubkey = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const amino_1 = require("@cosmjs/amino");
const encoding_1 = require("@cosmjs/encoding");
const math_1 = require("@cosmjs/math");
const keys_1 = require("cosmjs-types/cosmos/crypto/multisig/keys");
const keys_2 = require("cosmjs-types/cosmos/crypto/secp256k1/keys");
const any_1 = require("cosmjs-types/google/protobuf/any");
function encodePubkey(pubkey) {
    if ((0, amino_1.isSecp256k1Pubkey)(pubkey)) {
        const pubkeyProto = keys_2.PubKey.fromPartial({
            key: (0, encoding_1.fromBase64)(pubkey.value),
        });
        return any_1.Any.fromPartial({
            typeUrl: "/cosmos.crypto.secp256k1.PubKey",
            value: Uint8Array.from(keys_2.PubKey.encode(pubkeyProto).finish()),
        });
    }
    else if ((0, amino_1.isMultisigThresholdPubkey)(pubkey)) {
        const pubkeyProto = keys_1.LegacyAminoPubKey.fromPartial({
            threshold: math_1.Uint53.fromString(pubkey.value.threshold).toNumber(),
            publicKeys: pubkey.value.pubkeys.map(encodePubkey),
        });
        return any_1.Any.fromPartial({
            typeUrl: "/cosmos.crypto.multisig.LegacyAminoPubKey",
            value: Uint8Array.from(keys_1.LegacyAminoPubKey.encode(pubkeyProto).finish()),
        });
    }
    else {
        throw new Error(`Pubkey type ${pubkey.type} not recognized`);
    }
}
exports.encodePubkey = encodePubkey;
function decodeSinglePubkey(pubkey) {
    switch (pubkey.typeUrl) {
        case "/cosmos.crypto.secp256k1.PubKey": {
            const { key } = keys_2.PubKey.decode(pubkey.value);
            return (0, amino_1.encodeSecp256k1Pubkey)(key);
        }
        default:
            throw new Error(`Pubkey type_url ${pubkey.typeUrl} not recognized as single public key type`);
    }
}
function decodePubkey(pubkey) {
    if (!pubkey || !pubkey.value) {
        return null;
    }
    switch (pubkey.typeUrl) {
        case "/cosmos.crypto.secp256k1.PubKey": {
            return decodeSinglePubkey(pubkey);
        }
        case "/cosmos.crypto.multisig.LegacyAminoPubKey": {
            const { threshold, publicKeys } = keys_1.LegacyAminoPubKey.decode(pubkey.value);
            const out = {
                type: "tendermint/PubKeyMultisigThreshold",
                value: {
                    threshold: threshold.toString(),
                    pubkeys: publicKeys.map(decodeSinglePubkey),
                },
            };
            return out;
        }
        default:
            throw new Error(`Pubkey type_url ${pubkey.typeUrl} not recognized`);
    }
}
exports.decodePubkey = decodePubkey;
//# sourceMappingURL=pubkey.js.map