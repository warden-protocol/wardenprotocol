import { createMsgRegisterRevenue as protoMsgRegisterRevenue } from '@evmos/proto';
import { generateTypes, createMsgRegisterRevenue, MSG_REGISTER_REVENUE_TYPES, } from '@evmos/eip712';
import { createTransactionPayload } from '../base.js';
const createEIP712MsgRegisterRevenue = (params) => {
    const types = generateTypes(MSG_REGISTER_REVENUE_TYPES);
    const message = createMsgRegisterRevenue(params.contractAddress, params.deployerAddress, params.withdrawerAddress, params.nonces);
    return {
        types,
        message,
    };
};
const createCosmosMsgRegisterRevenue = (params) => {
    return protoMsgRegisterRevenue(params.contractAddress, params.deployerAddress, params.withdrawerAddress, params.nonces);
};
export const createTxMsgRegisterRevenue = (context, params) => {
    const typedData = createEIP712MsgRegisterRevenue(params);
    const cosmosMsg = createCosmosMsgRegisterRevenue(params);
    return createTransactionPayload(context, typedData, cosmosMsg);
};
//# sourceMappingURL=registerRevenue.js.map