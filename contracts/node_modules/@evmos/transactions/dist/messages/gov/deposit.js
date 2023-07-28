import { createMsgDeposit as protoMsgDeposit } from '@evmos/proto';
import { generateTypes, createMsgDeposit, MSG_DEPOSIT_TYPES, } from '@evmos/eip712';
import { createTransactionPayload } from '../base.js';
const createEIP712MsgDeposit = (context, params) => {
    const types = generateTypes(MSG_DEPOSIT_TYPES);
    const message = createMsgDeposit(params.proposalId, context.sender.accountAddress, params.deposit);
    return {
        types,
        message,
    };
};
const createCosmosMsgDeposit = (context, params) => {
    return protoMsgDeposit(params.proposalId, context.sender.accountAddress, params.deposit);
};
export const createTxMsgDeposit = (context, params) => {
    const typedData = createEIP712MsgDeposit(context, params);
    const cosmosMsg = createCosmosMsgDeposit(context, params);
    return createTransactionPayload(context, typedData, cosmosMsg);
};
//# sourceMappingURL=deposit.js.map