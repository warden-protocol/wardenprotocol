import { createMsgDelegate as protoMsgDelegate } from '@evmos/proto';
import { generateTypes, MSG_DELEGATE_TYPES, createMsgDelegate, } from '@evmos/eip712';
import { createTransactionPayload } from '../base.js';
const createEIP712MsgDelegate = (context, params) => {
    const types = generateTypes(MSG_DELEGATE_TYPES);
    const message = createMsgDelegate(context.sender.accountAddress, params.validatorAddress, params.amount, params.denom);
    return {
        types,
        message,
    };
};
const createCosmosMsgDelegate = (context, params) => {
    return protoMsgDelegate(context.sender.accountAddress, params.validatorAddress, params.amount, params.denom);
};
export const createTxMsgDelegate = (context, params) => {
    const typedData = createEIP712MsgDelegate(context, params);
    const cosmosMsg = createCosmosMsgDelegate(context, params);
    return createTransactionPayload(context, typedData, cosmosMsg);
};
//# sourceMappingURL=delegate.js.map