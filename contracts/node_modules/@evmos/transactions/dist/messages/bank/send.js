import { createMsgSend as protoMsgSend } from '@evmos/proto';
import { generateTypes, createMsgSend, MSG_SEND_TYPES } from '@evmos/eip712';
import { createTransactionPayload } from '../base.js';
const createEIP712MsgSend = (context, params) => {
    const types = generateTypes(MSG_SEND_TYPES);
    const message = createMsgSend(params.amount, params.denom, context.sender.accountAddress, params.destinationAddress);
    return {
        types,
        message,
    };
};
const createCosmosMsgSend = (context, params) => {
    return protoMsgSend(context.sender.accountAddress, params.destinationAddress, params.amount, params.denom);
};
export const createTxMsgSend = (context, params) => {
    const typedData = createEIP712MsgSend(context, params);
    const cosmosMsg = createCosmosMsgSend(context, params);
    return createTransactionPayload(context, typedData, cosmosMsg);
};
//# sourceMappingURL=send.js.map