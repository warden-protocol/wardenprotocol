import { createMsgBeginRedelegate as protoMsgBeginRedelegate } from '@evmos/proto';
import { generateTypes, MSG_BEGIN_REDELEGATE_TYPES, createMsgBeginRedelegate, } from '@evmos/eip712';
import { createTransactionPayload } from '../base.js';
const createEIP712MsgBeginRedelegate = (context, params) => {
    const types = generateTypes(MSG_BEGIN_REDELEGATE_TYPES);
    const message = createMsgBeginRedelegate(context.sender.accountAddress, params.validatorSrcAddress, params.validatorDstAddress, params.amount, params.denom);
    return {
        types,
        message,
    };
};
const createCosmosMsgBeginRedelegate = (context, params) => {
    return protoMsgBeginRedelegate(context.sender.accountAddress, params.validatorSrcAddress, params.validatorDstAddress, params.amount, params.denom);
};
export const createTxMsgBeginRedelegate = (context, params) => {
    const typedData = createEIP712MsgBeginRedelegate(context, params);
    const cosmosMsg = createCosmosMsgBeginRedelegate(context, params);
    return createTransactionPayload(context, typedData, cosmosMsg);
};
//# sourceMappingURL=beginRedelegate.js.map