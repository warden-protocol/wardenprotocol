import { createMsgCancelRevenue as protoMsgCancelRevenue } from '@evmos/proto';
import { generateTypes, createMsgCancelRevenue, MSG_CANCEL_REVENUE_TYPES, } from '@evmos/eip712';
import { createTransactionPayload } from '../base.js';
const createEIP712MsgCancelRevenue = (params) => {
    const types = generateTypes(MSG_CANCEL_REVENUE_TYPES);
    const message = createMsgCancelRevenue(params.contractAddress, params.deployerAddress);
    return {
        types,
        message,
    };
};
const createCosmosMsgCancelRevenue = (params) => {
    return protoMsgCancelRevenue(params.contractAddress, params.deployerAddress);
};
export const createTxMsgCancelRevenue = (context, params) => {
    const typedData = createEIP712MsgCancelRevenue(params);
    const cosmosMsg = createCosmosMsgCancelRevenue(params);
    return createTransactionPayload(context, typedData, cosmosMsg);
};
//# sourceMappingURL=cancelRevenue.js.map