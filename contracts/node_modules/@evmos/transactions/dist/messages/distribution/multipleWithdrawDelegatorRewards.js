import { createMsgWithdrawDelegatorReward as protoMsgWithdrawDelegatorReward } from '@evmos/proto';
import { generateTypes, MSG_WITHDRAW_DELEGATOR_REWARD_TYPES, createMsgWithdrawDelegatorReward, } from '@evmos/eip712';
import { createTransactionPayload } from '../base.js';
const createEIP712MultipleMsgWithdrawDelegatorReward = (context, params) => {
    const types = generateTypes(MSG_WITHDRAW_DELEGATOR_REWARD_TYPES);
    const messages = params.validatorAddresses.map((valAddr) => createMsgWithdrawDelegatorReward(context.sender.accountAddress, valAddr));
    return {
        types,
        message: messages,
    };
};
const createCosmosMultipleMsgWithdrawDelegatorReward = (context, params) => {
    return params.validatorAddresses.map((valAddr) => protoMsgWithdrawDelegatorReward(context.sender.accountAddress, valAddr));
};
export const createTxMultipleMsgWithdrawDelegatorReward = (context, params) => {
    const typedData = createEIP712MultipleMsgWithdrawDelegatorReward(context, params);
    const cosmosMsgs = createCosmosMultipleMsgWithdrawDelegatorReward(context, params);
    return createTransactionPayload(context, typedData, cosmosMsgs);
};
//# sourceMappingURL=multipleWithdrawDelegatorRewards.js.map