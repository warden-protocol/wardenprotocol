import { createMsgRevoke, RevokeMessages } from '@evmos/proto';
import { createTransactionPayload } from '../base.js';
const createEIP712MsgStakeRevokeAuthorization = () => {
    return {
        types: {},
        message: {},
    };
};
const createCosmosMsgStakeRevokeAuthorization = (context, params) => {
    return createMsgRevoke(context.sender.accountAddress, params.granteeAddress, RevokeMessages.REVOKE_MSG_DELEGATE);
};
export function createTxMsgStakeRevokeAuthorization(context, params) {
    const typedData = createEIP712MsgStakeRevokeAuthorization();
    const cosmosMsg = createCosmosMsgStakeRevokeAuthorization(context, params);
    return createTransactionPayload(context, typedData, cosmosMsg);
}
//# sourceMappingURL=stakingRevoke.js.map