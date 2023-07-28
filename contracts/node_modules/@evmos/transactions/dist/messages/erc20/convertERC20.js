import { createMsgConvertERC20 as protoMsgConvertERC20 } from '@evmos/proto';
import { generateTypes, createMsgConvertERC20, MSG_CONVERT_ERC20_TYPES, } from '@evmos/eip712';
import { createTransactionPayload } from '../base.js';
const createEIP712MsgConvertERC20 = (params) => {
    const types = generateTypes(MSG_CONVERT_ERC20_TYPES);
    const message = createMsgConvertERC20(params.contractAddress, params.amount, params.receiverBech32, params.senderHex);
    return {
        types,
        message,
    };
};
const createCosmosMsgConvertERC20 = (params) => {
    return protoMsgConvertERC20(params.contractAddress, params.amount, params.receiverBech32, params.senderHex);
};
export const createTxMsgConvertERC20 = (context, params) => {
    const typedData = createEIP712MsgConvertERC20(params);
    const cosmosMsg = createCosmosMsgConvertERC20(params);
    return createTransactionPayload(context, typedData, cosmosMsg);
};
//# sourceMappingURL=convertERC20.js.map