import { createGenericAuthorization as protoCreateGenericAuthorization, createMsgGrant, } from '@evmos/proto';
import { generateTypes, createMsgGenericAuthorization, MSG_GENERIC_AUTHORIZATION_TYPES, } from '@evmos/eip712';
import { createTransactionPayload } from '../base.js';
const createEIP712MsgGenericGrant = (context, params) => {
    const types = generateTypes(MSG_GENERIC_AUTHORIZATION_TYPES);
    const message = createMsgGenericAuthorization(context.sender.accountAddress, params.granteeAddress, params.typeUrl, params.expires);
    return {
        types,
        message,
    };
};
const createCosmosMsgGenericGrant = (context, params) => {
    const msgGenericGrant = protoCreateGenericAuthorization(params.typeUrl);
    return createMsgGrant(context.sender.accountAddress, params.granteeAddress, msgGenericGrant, params.expires);
};
export const createTxMsgGenericGrant = (context, params) => {
    const typedData = createEIP712MsgGenericGrant(context, params);
    const cosmosMsg = createCosmosMsgGenericGrant(context, params);
    return createTransactionPayload(context, typedData, cosmosMsg);
};
//# sourceMappingURL=genericGrant.js.map