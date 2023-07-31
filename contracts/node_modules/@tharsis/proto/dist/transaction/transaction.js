"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransaction = exports.createTransactionWithMultipleMessages = exports.createSigDoc = exports.createAuthInfo = exports.createSignerInfo = exports.createFee = exports.createBody = exports.createBodyWithMultipleMessages = exports.protoTxNamespace = exports.LEGACY_AMINO = exports.SIGN_DIRECT = void 0;
const sha3_1 = require("sha3");
const tx = __importStar(require("../proto/cosmos/tx/v1beta1/tx"));
const signing = __importStar(require("../proto/cosmos/tx/signing/v1beta1/signing"));
const coin = __importStar(require("../proto/cosmos/base/v1beta1/coin"));
const eth = __importStar(require("../proto/ethermint/crypto/v1/ethsecp256k1/keys"));
const secp = __importStar(require("../proto/cosmos/crypto/secp256k1/keys"));
const utils_1 = require("../messages/utils");
exports.SIGN_DIRECT = signing.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT;
exports.LEGACY_AMINO = signing.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_LEGACY_AMINO_JSON;
var protoTxNamespace;
(function (protoTxNamespace) {
    protoTxNamespace.txn = tx.cosmos.tx.v1beta1;
})(protoTxNamespace = exports.protoTxNamespace || (exports.protoTxNamespace = {}));
function createBodyWithMultipleMessages(messages, memo) {
    const content = [];
    messages.forEach((message) => {
        content.push((0, utils_1.createAnyMessage)(message));
    });
    return new tx.cosmos.tx.v1beta1.TxBody({
        messages: content,
        memo,
    });
}
exports.createBodyWithMultipleMessages = createBodyWithMultipleMessages;
function createBody(message, memo) {
    return createBodyWithMultipleMessages([message], memo);
}
exports.createBody = createBody;
function createFee(fee, denom, gasLimit) {
    return new tx.cosmos.tx.v1beta1.Fee({
        amount: [
            new coin.cosmos.base.v1beta1.Coin({
                denom,
                amount: fee,
            }),
        ],
        gas_limit: gasLimit,
    });
}
exports.createFee = createFee;
function createSignerInfo(algo, publicKey, sequence, mode) {
    let pubkey;
    if (algo === 'secp256k1') {
        pubkey = {
            message: new secp.cosmos.crypto.secp256k1.PubKey({
                key: publicKey,
            }),
            path: 'cosmos.crypto.secp256k1.PubKey',
        };
    }
    else {
        pubkey = {
            message: new eth.ethermint.crypto.v1.ethsecp256k1.PubKey({
                key: publicKey,
            }),
            path: 'ethermint.crypto.v1.ethsecp256k1.PubKey',
        };
    }
    const signerInfo = new tx.cosmos.tx.v1beta1.SignerInfo({
        public_key: (0, utils_1.createAnyMessage)(pubkey),
        mode_info: new tx.cosmos.tx.v1beta1.ModeInfo({
            single: new tx.cosmos.tx.v1beta1.ModeInfo.Single({
                mode,
            }),
        }),
        sequence,
    });
    return signerInfo;
}
exports.createSignerInfo = createSignerInfo;
function createAuthInfo(signerInfo, fee) {
    return new tx.cosmos.tx.v1beta1.AuthInfo({
        signer_infos: [signerInfo],
        fee,
    });
}
exports.createAuthInfo = createAuthInfo;
function createSigDoc(bodyBytes, authInfoBytes, chainId, accountNumber) {
    return new tx.cosmos.tx.v1beta1.SignDoc({
        body_bytes: bodyBytes,
        auth_info_bytes: authInfoBytes,
        chain_id: chainId,
        account_number: accountNumber,
    });
}
exports.createSigDoc = createSigDoc;
function createTransactionWithMultipleMessages(messages, memo, fee, denom, gasLimit, algo, pubKey, sequence, accountNumber, chainId) {
    const body = createBodyWithMultipleMessages(messages, memo);
    const feeMessage = createFee(fee, denom, gasLimit);
    const pubKeyDecoded = Buffer.from(pubKey, 'base64');
    const signInfoAmino = createSignerInfo(algo, new Uint8Array(pubKeyDecoded), sequence, exports.LEGACY_AMINO);
    const authInfoAmino = createAuthInfo(signInfoAmino, feeMessage);
    const signDocAmino = createSigDoc(body.serializeBinary(), authInfoAmino.serializeBinary(), chainId, accountNumber);
    const hashAmino = new sha3_1.Keccak(256);
    hashAmino.update(Buffer.from(signDocAmino.serializeBinary()));
    const toSignAmino = hashAmino.digest('binary');
    const signInfoDirect = createSignerInfo(algo, new Uint8Array(pubKeyDecoded), sequence, exports.SIGN_DIRECT);
    const authInfoDirect = createAuthInfo(signInfoDirect, feeMessage);
    const signDocDirect = createSigDoc(body.serializeBinary(), authInfoDirect.serializeBinary(), chainId, accountNumber);
    const hashDirect = new sha3_1.Keccak(256);
    hashDirect.update(Buffer.from(signDocDirect.serializeBinary()));
    const toSignDirect = hashDirect.digest('binary');
    return {
        legacyAmino: {
            body,
            authInfo: authInfoAmino,
            signBytes: toSignAmino.toString('base64'),
        },
        signDirect: {
            body,
            authInfo: authInfoDirect,
            signBytes: toSignDirect.toString('base64'),
        },
    };
}
exports.createTransactionWithMultipleMessages = createTransactionWithMultipleMessages;
function createTransaction(message, memo, fee, denom, gasLimit, algo, pubKey, sequence, accountNumber, chainId) {
    return createTransactionWithMultipleMessages([message], memo, fee, denom, gasLimit, algo, pubKey, sequence, accountNumber, chainId);
}
exports.createTransaction = createTransaction;
//# sourceMappingURL=transaction.js.map