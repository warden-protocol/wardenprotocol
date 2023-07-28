import { createMsgCreateClawbackVestingAccount as protoMsgCreateClawbackVestingAccount } from '@evmos/proto';
import { generateTypes, createMsgCreateClawbackVestingAccount, MSG_CREATE_CLAWBACK_VESTING_ACCOUNT_TYPES, } from '@evmos/eip712';
import { createTransactionPayload } from '../base.js';
const createEIP712MsgCreateClawbackVestingAccount = (params) => {
    const types = generateTypes(MSG_CREATE_CLAWBACK_VESTING_ACCOUNT_TYPES);
    const message = createMsgCreateClawbackVestingAccount(params.fromAddress, params.toAddress, params.startTime, params.lockupPeriods, params.vestingPeriods, params.merge);
    return {
        types,
        message,
    };
};
const createCosmosMsgCreateClawbackVestingAccount = (params) => {
    return protoMsgCreateClawbackVestingAccount(params.fromAddress, params.toAddress, params.startTime, params.lockupPeriods, params.vestingPeriods, params.merge);
};
export const createTxMsgCreateClawbackVestingAccount = (context, params) => {
    const typedData = createEIP712MsgCreateClawbackVestingAccount(params);
    const cosmosMsg = createCosmosMsgCreateClawbackVestingAccount(params);
    return createTransactionPayload(context, typedData, cosmosMsg);
};
//# sourceMappingURL=createClawbackVestingAccount.js.map