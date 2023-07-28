import { createMsgWithdrawDelegatorReward as protoMsgWithdrawDelegatorReward } from '@evmos/proto';
import { generateTypes, MSG_WITHDRAW_DELEGATOR_REWARD_TYPES, createMsgWithdrawDelegatorReward, } from '@evmos/eip712';
import { createTransactionPayload } from '../base.js';
const createEIP712MsgWithdrawDelegatorReward = (context, params) => {
    const types = generateTypes(MSG_WITHDRAW_DELEGATOR_REWARD_TYPES);
    const message = createMsgWithdrawDelegatorReward(context.sender.accountAddress, params.validatorAddress);
    return {
        types,
        message,
    };
};
const createCosmosMsgWithdrawDelegatorReward = (context, params) => {
    return protoMsgWithdrawDelegatorReward(context.sender.accountAddress, params.validatorAddress);
};
export const createTxMsgWithdrawDelegatorReward = (context, params) => {
    const typedData = createEIP712MsgWithdrawDelegatorReward(context, params);
    const cosmosMsg = createCosmosMsgWithdrawDelegatorReward(context, params);
    return createTransactionPayload(context, typedData, cosmosMsg);
};
//# sourceMappingURL=withdrawDelegatorRewards.js.map