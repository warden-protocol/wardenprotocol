import { createMsgClawback as protoMsgClawback } from '@evmos/proto';
import { generateTypes, createMsgClawback, MSG_CLAWBACK_TYPES, } from '@evmos/eip712';
import { createTransactionPayload } from '../base.js';
const createEIP712MsgClawback = (params) => {
    const types = generateTypes(MSG_CLAWBACK_TYPES);
    const message = createMsgClawback(params.funderAddress, params.accountAddress, params.destAddress);
    return {
        types,
        message,
    };
};
const createCosmosMsgClawback = (params) => {
    return protoMsgClawback(params.funderAddress, params.accountAddress, params.destAddress);
};
export const createTxMsgClawback = (context, params) => {
    const typedData = createEIP712MsgClawback(params);
    const cosmosMsg = createCosmosMsgClawback(params);
    return createTransactionPayload(context, typedData, cosmosMsg);
};
//# sourceMappingURL=clawback.js.map