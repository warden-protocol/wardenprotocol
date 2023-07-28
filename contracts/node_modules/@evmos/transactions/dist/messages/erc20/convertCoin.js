import { createMsgConvertCoin as protoMsgConvertCoin } from '@evmos/proto';
import { generateTypes, createMsgConvertCoin, MSG_CONVERT_COIN_TYPES, } from '@evmos/eip712';
import { createTransactionPayload } from '../base.js';
const createEIP712MsgConvertCoin = (params) => {
    const types = generateTypes(MSG_CONVERT_COIN_TYPES);
    const message = createMsgConvertCoin(params.denom, params.amount, params.receiverHex, params.senderBech32);
    return {
        types,
        message,
    };
};
const createCosmosMsgConvertCoin = (params) => {
    return protoMsgConvertCoin(params.denom, params.amount, params.receiverHex, params.senderBech32);
};
export const createTxMsgConvertCoin = (context, params) => {
    const typedData = createEIP712MsgConvertCoin(params);
    const cosmosMsg = createCosmosMsgConvertCoin(params);
    return createTransactionPayload(context, typedData, cosmosMsg);
};
//# sourceMappingURL=convertCoin.js.map