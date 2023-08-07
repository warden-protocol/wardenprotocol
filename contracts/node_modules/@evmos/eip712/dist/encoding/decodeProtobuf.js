import { Registry } from '@cosmjs/proto-signing';
import { AuthInfo, SignDoc, TxBody } from 'cosmjs-types/cosmos/tx/v1beta1/tx.js';
import { MsgVote } from 'cosmjs-types/cosmos/gov/v1beta1/tx.js';
import { MsgDelegate } from 'cosmjs-types/cosmos/staking/v1beta1/tx.js';
import Long from 'long';
import { parseChainId } from './utils.js';
import { MSG_TYPES, eip712MessageType, getFeePayerFromMsg, } from './decodeAmino.js';
import { createEIP712, generateFee, generateMessage } from '../messages/base.js';
export const PROTO_MSG_TYPES = {
    MSG_SEND: '/cosmos.bank.v1beta1.MsgSend',
    MSG_VOTE: '/cosmos.gov.v1beta1.MsgVote',
    MSG_DELEGATE: '/cosmos.staking.v1beta1.MsgDelegate',
};
function protobufTypeUrlToAminoType(typeUrl) {
    switch (typeUrl) {
        case PROTO_MSG_TYPES.MSG_SEND:
            return MSG_TYPES.MSG_SEND;
        case PROTO_MSG_TYPES.MSG_VOTE:
            return MSG_TYPES.MSG_VOTE;
        case PROTO_MSG_TYPES.MSG_DELEGATE:
            return MSG_TYPES.MSG_DELEGATE;
        default:
            throw new Error('Invalid Protobuf message type url received');
    }
}
function convertProtobufMsgToAminoMsg(obj) {
    if (typeof obj !== 'object') {
        return obj;
    }
    if (Array.isArray(obj)) {
        const formattedArray = [];
        obj.forEach((el) => {
            formattedArray.push(convertProtobufMsgToAminoMsg(el));
        });
        return formattedArray;
    }
    if (Long.isLong(obj)) {
        return obj.toString();
    }
    const camelToSnakeCase = (str) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
    const formattedObj = {};
    Object.keys(obj).forEach((key) => {
        formattedObj[camelToSnakeCase(key)] = convertProtobufMsgToAminoMsg(obj[key]);
    });
    return formattedObj;
}
function eip712ProtobufRegistry() {
    const registry = new Registry();
    registry.register(PROTO_MSG_TYPES.MSG_VOTE, MsgVote);
    registry.register(PROTO_MSG_TYPES.MSG_DELEGATE, MsgDelegate);
    return registry;
}
export function decodeProtobufSignDoc(bytes) {
    var _a, _b;
    const registry = eip712ProtobufRegistry();
    const signDoc = SignDoc.decode(bytes);
    const txBody = TxBody.decode(signDoc.bodyBytes);
    const authInfo = AuthInfo.decode(signDoc.authInfoBytes);
    if (txBody.messages.length !== 1) {
        throw new Error(`Expected single message in Protobuf SignDoc but received ${txBody.messages.length}.`);
    }
    const msgBytes = txBody.messages[0];
    if (authInfo.signerInfos.length !== 1) {
        throw new Error(`Expected single signer in Protobuf SignDoc but received ${authInfo.signerInfos.length}.`);
    }
    const signer = authInfo.signerInfos[0];
    if (!authInfo.fee) {
        throw new Error('Expected fee object to be included in payload, got undefined');
    }
    if (authInfo.fee.amount.length !== 1) {
        throw new Error(`Expected single fee in Protobuf SignDoc but received ${(_a = authInfo.fee) === null || _a === void 0 ? void 0 : _a.amount.length}`);
    }
    const amount = authInfo.fee.amount[0];
    const accountNumber = signDoc.accountNumber.toString();
    const sequence = signer.sequence.toString();
    const { chainId } = signDoc;
    const { memo } = txBody;
    const protoMsg = registry.decode(msgBytes);
    const aminoMsg = {
        type: protobufTypeUrlToAminoType(msgBytes.typeUrl),
        value: convertProtobufMsgToAminoMsg(protoMsg),
    };
    let feePayer = (_b = authInfo.fee) === null || _b === void 0 ? void 0 : _b.payer;
    if (!feePayer || feePayer === '') {
        feePayer = getFeePayerFromMsg(aminoMsg);
    }
    const gasLimit = authInfo.fee.gasLimit.toString();
    const fee = generateFee(amount.amount, amount.denom, gasLimit, feePayer);
    const type = eip712MessageType(aminoMsg);
    const eip712Tx = generateMessage(accountNumber, sequence, chainId, memo, fee, aminoMsg);
    return createEIP712(type, parseChainId(chainId), eip712Tx);
}
//# sourceMappingURL=decodeProtobuf.js.map