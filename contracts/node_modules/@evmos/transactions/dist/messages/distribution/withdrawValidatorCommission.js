import { createMsgWithdrawValidatorCommission as protoMsgWithdrawValidatorCommission } from '@evmos/proto';
import { generateTypes, MSG_WITHDRAW_VALIDATOR_COMMISSION_TYPES, createMsgWithdrawValidatorCommission, } from '@evmos/eip712';
import { createTransactionPayload } from '../base.js';
const createEIP712MsgWithdrawValidatorCommission = (params) => {
    const types = generateTypes(MSG_WITHDRAW_VALIDATOR_COMMISSION_TYPES);
    const message = createMsgWithdrawValidatorCommission(params.validatorAddress);
    return {
        types,
        message,
    };
};
const createCosmosMsgWithdrawValidatorCommission = (params) => {
    return protoMsgWithdrawValidatorCommission(params.validatorAddress);
};
export const createTxMsgWithdrawValidatorCommission = (context, params) => {
    const typedData = createEIP712MsgWithdrawValidatorCommission(params);
    const cosmosMsg = createCosmosMsgWithdrawValidatorCommission(params);
    return createTransactionPayload(context, typedData, cosmosMsg);
};
//# sourceMappingURL=withdrawValidatorCommission.js.map