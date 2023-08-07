import { parseChainId } from './utils.js';
import { MSG_VOTE_TYPES } from '../messages/gov/index.js';
import { MSG_SEND_TYPES } from '../messages/bank/index.js';
import { MSG_DELEGATE_TYPES } from '../messages/staking/index.js';
import { generateTypes, createEIP712 } from '../messages/base.js';
export const MSG_TYPES = {
    MSG_SEND: 'cosmos-sdk/MsgSend',
    MSG_VOTE: 'cosmos-sdk/MsgVote',
    MSG_DELEGATE: 'cosmos-sdk/MsgDelegate',
};
export function getFeePayerFromMsg(msg) {
    switch (msg.type) {
        case MSG_TYPES.MSG_SEND:
            return msg.value.from_address;
        case MSG_TYPES.MSG_VOTE:
            return msg.value.voter;
        case MSG_TYPES.MSG_DELEGATE:
            return msg.value.delegator_address;
        default:
            throw new Error('Unsupported message type');
    }
}
function formatSignDoc(signDoc) {
    const signDocCpy = {};
    Object.assign(signDocCpy, signDoc);
    if (!Object.keys(signDoc.fee).includes('feePayer') ||
        signDoc.fee.feePayer === '') {
        signDocCpy.fee.feePayer = getFeePayerFromMsg(signDoc.msgs[0]);
    }
    return signDocCpy;
}
export function eip712MessageType(msg) {
    switch (msg.type) {
        case MSG_TYPES.MSG_SEND:
            return generateTypes(MSG_SEND_TYPES);
        case MSG_TYPES.MSG_VOTE:
            return generateTypes(MSG_VOTE_TYPES);
        case MSG_TYPES.MSG_DELEGATE:
            return generateTypes(MSG_DELEGATE_TYPES);
        default:
            throw new Error('Unsupported message type in SignDoc');
    }
}
export function decodeAminoSignDoc(bytes) {
    const rawSignDoc = JSON.parse(Buffer.from(bytes).toString());
    if (rawSignDoc.msgs.length !== 1) {
        throw new Error(`Expected single message in Amino SignDoc but received ${rawSignDoc.msgs.length}.`);
    }
    const signDoc = formatSignDoc(rawSignDoc);
    const chainId = signDoc.chain_id;
    const msg = signDoc.msgs[0];
    const type = eip712MessageType(msg);
    return createEIP712(type, parseChainId(chainId), signDoc);
}
//# sourceMappingURL=decodeAmino.js.map