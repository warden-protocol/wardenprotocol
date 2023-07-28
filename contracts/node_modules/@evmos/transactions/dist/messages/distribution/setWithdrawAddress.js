import { createMsgSetWithdrawAddress as protoMsgSetWithdrawAddress } from '@evmos/proto';
import { generateTypes, MSG_SET_WITHDRAW_ADDRESS_TYPES, createMsgSetWithdrawAddress, } from '@evmos/eip712';
import { createTransactionPayload } from '../base.js';
const createEIP712MsgSetWithdrawAddress = (params) => {
    const types = generateTypes(MSG_SET_WITHDRAW_ADDRESS_TYPES);
    const message = createMsgSetWithdrawAddress(params.delegatorAddress, params.withdrawAddress);
    return {
        types,
        message,
    };
};
const createCosmosMsgSetWithdrawAddress = (params) => {
    return protoMsgSetWithdrawAddress(params.delegatorAddress, params.withdrawAddress);
};
export const createTxMsgSetWithdrawAddress = (context, params) => {
    const typedData = createEIP712MsgSetWithdrawAddress(params);
    const cosmosMsg = createCosmosMsgSetWithdrawAddress(params);
    return createTransactionPayload(context, typedData, cosmosMsg);
};
//# sourceMappingURL=setWithdrawAddress.js.map