import { createIBCMsgTransfer as protoIBCMsgTransfer } from '@evmos/proto';
import { generateTypes, createIBCMsgTransfer, CREATE_IBC_MSG_TRANSFER_TYPES, } from '@evmos/eip712';
import { createTransactionPayload } from '../base.js';
const createEIP712IBCMsgTransfer = (context, params) => {
    const msgTransferTypes = CREATE_IBC_MSG_TRANSFER_TYPES(params.memo);
    const types = generateTypes(msgTransferTypes);
    const message = createIBCMsgTransfer(params.receiver, context.sender.accountAddress, params.sourceChannel, params.sourcePort, params.revisionHeight, params.revisionNumber, params.timeoutTimestamp, params.amount, params.denom, params.memo);
    return {
        types,
        message,
    };
};
const createCosmosIBCMsgTransfer = (context, params) => {
    return protoIBCMsgTransfer(params.sourcePort, params.sourceChannel, params.amount, params.denom, context.sender.accountAddress, params.receiver, params.revisionNumber, params.revisionHeight, params.timeoutTimestamp, params.memo);
};
export const createTxIBCMsgTransfer = (context, params) => {
    const typedData = createEIP712IBCMsgTransfer(context, params);
    const cosmosMsg = createCosmosIBCMsgTransfer(context, params);
    return createTransactionPayload(context, typedData, cosmosMsg);
};
//# sourceMappingURL=transfer.js.map