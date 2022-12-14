"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeMultisignedTx = exports.makeCompactBitArray = void 0;
const amino_1 = require("@cosmjs/amino");
const encoding_1 = require("@cosmjs/encoding");
const proto_signing_1 = require("@cosmjs/proto-signing");
const multisig_1 = require("cosmjs-types/cosmos/crypto/multisig/v1beta1/multisig");
const signing_1 = require("cosmjs-types/cosmos/tx/signing/v1beta1/signing");
const tx_1 = require("cosmjs-types/cosmos/tx/v1beta1/tx");
const tx_2 = require("cosmjs-types/cosmos/tx/v1beta1/tx");
const long_1 = __importDefault(require("long"));
function makeCompactBitArray(bits) {
    const byteCount = Math.ceil(bits.length / 8);
    const extraBits = bits.length - Math.floor(bits.length / 8) * 8;
    const bytes = new Uint8Array(byteCount); // zero-filled
    bits.forEach((value, index) => {
        const bytePos = Math.floor(index / 8);
        const bitPos = index % 8;
        // eslint-disable-next-line no-bitwise
        if (value)
            bytes[bytePos] |= 0b1 << (8 - 1 - bitPos);
    });
    return multisig_1.CompactBitArray.fromPartial({ elems: bytes, extraBitsStored: extraBits });
}
exports.makeCompactBitArray = makeCompactBitArray;
function makeMultisignedTx(multisigPubkey, sequence, fee, bodyBytes, signatures) {
    const addresses = Array.from(signatures.keys());
    const prefix = (0, encoding_1.fromBech32)(addresses[0]).prefix;
    const signers = Array(multisigPubkey.value.pubkeys.length).fill(false);
    const signaturesList = new Array();
    for (let i = 0; i < multisigPubkey.value.pubkeys.length; i++) {
        const signerAddress = (0, amino_1.pubkeyToAddress)(multisigPubkey.value.pubkeys[i], prefix);
        const signature = signatures.get(signerAddress);
        if (signature) {
            signers[i] = true;
            signaturesList.push(signature);
        }
    }
    const signerInfo = {
        publicKey: (0, proto_signing_1.encodePubkey)(multisigPubkey),
        modeInfo: {
            multi: {
                bitarray: makeCompactBitArray(signers),
                modeInfos: signaturesList.map((_) => ({ single: { mode: signing_1.SignMode.SIGN_MODE_LEGACY_AMINO_JSON } })),
            },
        },
        sequence: long_1.default.fromNumber(sequence),
    };
    const authInfo = tx_1.AuthInfo.fromPartial({
        signerInfos: [signerInfo],
        fee: {
            amount: [...fee.amount],
            gasLimit: long_1.default.fromString(fee.gas),
        },
    });
    const authInfoBytes = tx_1.AuthInfo.encode(authInfo).finish();
    const signedTx = tx_2.TxRaw.fromPartial({
        bodyBytes: bodyBytes,
        authInfoBytes: authInfoBytes,
        signatures: [multisig_1.MultiSignature.encode(multisig_1.MultiSignature.fromPartial({ signatures: signaturesList })).finish()],
    });
    return signedTx;
}
exports.makeMultisignedTx = makeMultisignedTx;
//# sourceMappingURL=multisignature.js.map