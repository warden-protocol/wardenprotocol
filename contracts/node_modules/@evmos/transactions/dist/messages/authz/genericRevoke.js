import { createMsgRevoke } from '@evmos/proto';
import { generateTypes, createMsgRevokeGenericAuthorization, MSG_REVOKE_GENERIC_AUTHORIZATION_TYPES, } from '@evmos/eip712';
import { createTransactionPayload } from '../base.js';
const createEIP712MsgGenericRevoke = (context, params) => {
    const types = generateTypes(MSG_REVOKE_GENERIC_AUTHORIZATION_TYPES);
    const message = createMsgRevokeGenericAuthorization(context.sender.accountAddress, params.granteeAddress, params.typeUrl);
    return {
        types,
        message,
    };
};
const createCosmosMsgGenericRevoke = (context, params) => {
    return createMsgRevoke(context.sender.accountAddress, params.granteeAddress, params.typeUrl);
};
export const createTxMsgGenericRevoke = (context, params) => {
    const typedData = createEIP712MsgGenericRevoke(context, params);
    const cosmosMsg = createCosmosMsgGenericRevoke(context, params);
    return createTransactionPayload(context, typedData, cosmosMsg);
};
//# sourceMappingURL=genericRevoke.js.map