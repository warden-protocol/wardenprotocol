import { createMsgCancelUnbondingDelegation as protoMsgCancelUnbondingDelegation } from '@evmos/proto';
import { generateTypes, MSG_CANCEL_UNBONDING_DELEGATION_TYPES, createMsgCancelUnbondingDelegation, } from '@evmos/eip712';
import { createTransactionPayload } from '../base.js';
const createEIP712MsgCancelUnbondingDelegation = (params) => {
    const types = generateTypes(MSG_CANCEL_UNBONDING_DELEGATION_TYPES);
    const message = createMsgCancelUnbondingDelegation(params.delegatorAddress, params.validatorAddress, params.amount, params.denom, params.creationHeight);
    return {
        types,
        message,
    };
};
const createCosmosMsgCancelUnbondingDelegation = (params) => {
    return protoMsgCancelUnbondingDelegation(params.delegatorAddress, params.validatorAddress, params.amount, params.denom, params.creationHeight);
};
export const createTxMsgCancelUnbondingDelegation = (context, params) => {
    const typedData = createEIP712MsgCancelUnbondingDelegation(params);
    const cosmosMsg = createCosmosMsgCancelUnbondingDelegation(params);
    return createTransactionPayload(context, typedData, cosmosMsg);
};
//# sourceMappingURL=cancelUnbondingDelegation.js.map