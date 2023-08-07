import { createMsgUndelegate as protoMsgUndelegate } from '@evmos/proto';
import { generateTypes, MSG_UNDELEGATE_TYPES, createMsgUndelegate, } from '@evmos/eip712';
import { createTransactionPayload } from '../base.js';
const createEIP712MsgUndelegate = (context, params) => {
    const types = generateTypes(MSG_UNDELEGATE_TYPES);
    const message = createMsgUndelegate(context.sender.accountAddress, params.validatorAddress, params.amount, params.denom);
    return {
        types,
        message,
    };
};
const createCosmosMsgUndelegate = (context, params) => {
    return protoMsgUndelegate(context.sender.accountAddress, params.validatorAddress, params.amount, params.denom);
};
export const createTxMsgUndelegate = (context, params) => {
    const typedData = createEIP712MsgUndelegate(context, params);
    const cosmosMsg = createCosmosMsgUndelegate(context, params);
    return createTransactionPayload(context, typedData, cosmosMsg);
};
//# sourceMappingURL=undelegate.js.map