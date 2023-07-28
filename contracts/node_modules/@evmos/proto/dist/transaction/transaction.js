import { Keccak } from 'sha3';
import { Coin } from '../proto/cosmos/base/coin.js';
import { TxBody, Fee, SignerInfo, ModeInfo, ModeInfo_Single, AuthInfo, SignDoc, } from '../proto/cosmos/transactions/tx.js';
import { PubKey } from '../proto/ethermint/crypto/keys.js';
import { PubKey as SECP256k1 } from '../proto/cosmos/crypto/secp256k1/keys.js';
import { SignMode } from '../proto/cosmos/transactions/signing.js';
import { createAnyMessage } from '../messages/common.js';
export const SIGN_DIRECT = SignMode.DIRECT;
export const LEGACY_AMINO = SignMode.LEGACY_AMINO_JSON;
export function createBodyWithMultipleMessages(messages, memo) {
    const content = [];
    messages.forEach((message) => {
        content.push(createAnyMessage(message));
    });
    return new TxBody({
        messages: content,
        memo,
    });
}
export function createBody(message, memo) {
    return createBodyWithMultipleMessages([message], memo);
}
export function createFee(fee, denom, gasLimit) {
    return new Fee({
        amount: [
            new Coin({
                denom,
                amount: fee,
            }),
        ],
        gasLimit: BigInt(gasLimit),
    });
}
export function createSignerInfo(algo, publicKey, sequence, mode) {
    let pubkey;
    if (algo === 'secp256k1') {
        pubkey = {
            message: new SECP256k1({
                key: publicKey,
            }),
            path: 'cosmos.crypto.secp256k1.PubKey',
        };
    }
    else {
        pubkey = {
            message: new PubKey({
                key: publicKey,
            }),
            path: 'ethermint.crypto.v1.ethsecp256k1.PubKey',
        };
    }
    const signerInfo = new SignerInfo({
        publicKey: createAnyMessage(pubkey),
        modeInfo: new ModeInfo({
            sum: {
                value: new ModeInfo_Single({
                    mode,
                }),
                case: 'single',
            },
        }),
        sequence: BigInt(sequence),
    });
    return signerInfo;
}
export function createAuthInfo(signerInfo, fee) {
    return new AuthInfo({
        signerInfos: [signerInfo],
        fee,
    });
}
export function createSigDoc(bodyBytes, authInfoBytes, chainId, accountNumber) {
    return new SignDoc({
        bodyBytes,
        authInfoBytes,
        chainId,
        accountNumber: BigInt(accountNumber),
    });
}
export function createTransactionWithMultipleMessages(messages, memo, fee, denom, gasLimit, algo, pubKey, sequence, accountNumber, chainId) {
    const body = createBodyWithMultipleMessages(messages, memo);
    const feeMessage = createFee(fee, denom, gasLimit);
    const pubKeyDecoded = Buffer.from(pubKey, 'base64');
    const signInfoAmino = createSignerInfo(algo, new Uint8Array(pubKeyDecoded), sequence, LEGACY_AMINO);
    const authInfoAmino = createAuthInfo(signInfoAmino, feeMessage);
    const signDocAmino = createSigDoc(body.toBinary(), authInfoAmino.toBinary(), chainId, accountNumber);
    const hashAmino = new Keccak(256);
    hashAmino.update(Buffer.from(signDocAmino.toBinary()));
    const toSignAmino = hashAmino.digest('binary');
    const signInfoDirect = createSignerInfo(algo, new Uint8Array(pubKeyDecoded), sequence, SIGN_DIRECT);
    const authInfoDirect = createAuthInfo(signInfoDirect, feeMessage);
    const signDocDirect = createSigDoc(body.toBinary(), authInfoDirect.toBinary(), chainId, accountNumber);
    const hashDirect = new Keccak(256);
    hashDirect.update(Buffer.from(signDocDirect.toBinary()));
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
export function createTransaction(message, memo, fee, denom, gasLimit, algo, pubKey, sequence, accountNumber, chainId) {
    return createTransactionWithMultipleMessages([message], memo, fee, denom, gasLimit, algo, pubKey, sequence, accountNumber, chainId);
}
//# sourceMappingURL=transaction.js.map