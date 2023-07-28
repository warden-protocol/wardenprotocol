import { createMsgSubmitProposal as protoMsgSubmitProposal, createAnyMessage, } from '@evmos/proto';
import { generateTypes, createMsgSubmitProposal, MSG_SUBMIT_PROPOSAL_TYPES, } from '@evmos/eip712';
import { createTransactionPayload } from '../base.js';
const createEIP712MsgSubmitProposal = (params) => {
    const types = generateTypes(MSG_SUBMIT_PROPOSAL_TYPES);
    const contentAsJSON = params.content.message.toJSON({
        useProtoFieldName: true,
    });
    const message = createMsgSubmitProposal(contentAsJSON, params.denom, params.amount, params.proposer);
    return {
        types,
        message,
    };
};
const createCosmosMsgSubmitProposal = (params) => {
    const contentAsAny = createAnyMessage(params.content);
    return protoMsgSubmitProposal(contentAsAny, params.denom, params.amount, params.proposer);
};
export const createTxMsgSubmitProposal = (context, params) => {
    const typedData = createEIP712MsgSubmitProposal(params);
    const cosmosMsg = createCosmosMsgSubmitProposal(params);
    return createTransactionPayload(context, typedData, cosmosMsg);
};
//# sourceMappingURL=submitProposal.js.map