import { createMsgEditValidator as protoMsgEditValidator } from '@evmos/proto';
import { generateTypes, MSG_EDIT_VALIDATOR_TYPES, createMsgEditValidator, } from '@evmos/eip712';
import { createTransactionPayload } from '../base.js';
const createEIP712MsgEditValidator = (params) => {
    const types = generateTypes(MSG_EDIT_VALIDATOR_TYPES);
    const message = createMsgEditValidator(params.moniker, params.identity, params.website, params.securityContact, params.details, params.validatorAddress, params.commissionRate, params.minSelfDelegation);
    return {
        types,
        message,
    };
};
const createCosmosMsgEditValidator = (params) => {
    return protoMsgEditValidator(params.moniker, params.identity, params.website, params.securityContact, params.details, params.validatorAddress, params.commissionRate, params.minSelfDelegation);
};
export const createTxMsgEditValidator = (context, params) => {
    const typedData = createEIP712MsgEditValidator(params);
    const cosmosMsg = createCosmosMsgEditValidator(params);
    return createTransactionPayload(context, typedData, cosmosMsg);
};
//# sourceMappingURL=editValidator.js.map