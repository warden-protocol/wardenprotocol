import { createMsgDelegate as protoMsgDelegate } from '@evmos/proto';
import { generateTypes, MSG_DELEGATE_TYPES, createMsgDelegate, } from '@evmos/eip712';
import { createTransactionPayload } from '../base.js';
const createEIP712MultipleMsgDelegate = (context, params) => {
    const types = generateTypes(MSG_DELEGATE_TYPES);
    const messages = params.values.map((delegateParams) => createMsgDelegate(context.sender.accountAddress, delegateParams.validatorAddress, delegateParams.amount, delegateParams.denom));
    return {
        types,
        message: messages,
    };
};
const createCosmosMultipleMsgDelegate = (context, params) => {
    return params.values.map((delegateParams) => protoMsgDelegate(context.sender.accountAddress, delegateParams.validatorAddress, delegateParams.amount, delegateParams.denom));
};
export const createTxMultipleMsgDelegate = (context, params) => {
    const typedData = createEIP712MultipleMsgDelegate(context, params);
    const cosmosMsgs = createCosmosMultipleMsgDelegate(context, params);
    return createTransactionPayload(context, typedData, cosmosMsgs);
};
//# sourceMappingURL=multipleDelegate.js.map