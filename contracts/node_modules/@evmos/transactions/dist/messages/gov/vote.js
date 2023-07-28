import { createMsgVote as protoMsgVote } from '@evmos/proto';
import { generateTypes, createMsgVote, MSG_VOTE_TYPES } from '@evmos/eip712';
import { createTransactionPayload } from '../base.js';
const createEIP712MsgVote = (context, params) => {
    const types = generateTypes(MSG_VOTE_TYPES);
    const message = createMsgVote(params.proposalId, params.option, context.sender.accountAddress);
    return {
        types,
        message,
    };
};
const createCosmosMsgVote = (context, params) => {
    return protoMsgVote(params.proposalId, params.option, context.sender.accountAddress);
};
export const createTxMsgVote = (context, params) => {
    const typedData = createEIP712MsgVote(context, params);
    const cosmosMsg = createCosmosMsgVote(context, params);
    return createTransactionPayload(context, typedData, cosmosMsg);
};
//# sourceMappingURL=vote.js.map