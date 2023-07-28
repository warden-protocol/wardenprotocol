import { createMsgUpdateRevenue as protoMsgUpdateRevenue } from '@evmos/proto';
import { generateTypes, createMsgUpdateRevenue, MSG_UPDATE_REVENUE_TYPES, } from '@evmos/eip712';
import { createTransactionPayload } from '../base.js';
const createEIP712MsgUpdateRevenue = (params) => {
    const types = generateTypes(MSG_UPDATE_REVENUE_TYPES);
    const message = createMsgUpdateRevenue(params.contractAddress, params.deployerAddress, params.withdrawerAddress);
    return {
        types,
        message,
    };
};
const createCosmosMsgUpdateRevenue = (params) => {
    return protoMsgUpdateRevenue(params.contractAddress, params.deployerAddress, params.withdrawerAddress);
};
export const createTxMsgUpdateRevenue = (context, params) => {
    const typedData = createEIP712MsgUpdateRevenue(params);
    const cosmosMsg = createCosmosMsgUpdateRevenue(params);
    return createTransactionPayload(context, typedData, cosmosMsg);
};
//# sourceMappingURL=updateRevenue.js.map