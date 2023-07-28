import { createMsgGrant, createStakeAuthorization, Proto } from '@evmos/proto';
import { createTransactionPayload } from '../base.js';
const createEIP712MsgStakeAuthorization = () => {
    return {
        types: {},
        message: {},
    };
};
const createCosmosMsgStakeAuthorization = (context, params) => {
    const stakeAuthType = Proto.Cosmos.Staking.Authz.AuthorizationType.DELEGATE;
    const auth = createStakeAuthorization(params.validatorAddress, params.denom, params.maxTokens, stakeAuthType);
    return createMsgGrant(context.sender.accountAddress, params.granteeAddress, auth, params.expiration);
};
export function createTxMsgStakeAuthorization(context, params) {
    const typedData = createEIP712MsgStakeAuthorization();
    const cosmosMsg = createCosmosMsgStakeAuthorization(context, params);
    return createTransactionPayload(context, typedData, cosmosMsg);
}
//# sourceMappingURL=stakingGrant.js.map