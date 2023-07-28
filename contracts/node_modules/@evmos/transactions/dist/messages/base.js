import { createEIP712, generateFee, generateMessageWithMultipleTransactions, } from '@evmos/eip712';
import { createTransactionWithMultipleMessages } from '@evmos/proto';
const wrapTypeToArray = (obj) => {
    return Array.isArray(obj) ? obj : [obj];
};
const createEIP712Payload = (context, typedData) => {
    const { fee, sender, chain, memo } = context;
    const feeObject = generateFee(fee.amount, fee.denom, fee.gas, sender.accountAddress);
    const payloadMessages = wrapTypeToArray(typedData.message);
    const messages = generateMessageWithMultipleTransactions(sender.accountNumber.toString(), sender.sequence.toString(), chain.cosmosChainId, memo, feeObject, payloadMessages);
    return createEIP712(typedData.types, chain.chainId, messages);
};
const createCosmosPayload = (context, cosmosPayload) => {
    const { fee, sender, chain, memo } = context;
    const messages = wrapTypeToArray(cosmosPayload);
    return createTransactionWithMultipleMessages(messages, memo, fee.amount, fee.denom, parseInt(fee.gas, 10), 'ethsecp256', sender.pubkey, sender.sequence, sender.accountNumber, chain.cosmosChainId);
};
export const createTransactionPayload = (context, typedData, cosmosMessage) => {
    const eip712Payload = createEIP712Payload(context, typedData);
    const cosmosPayload = createCosmosPayload(context, cosmosMessage);
    return {
        signDirect: cosmosPayload.signDirect,
        legacyAmino: cosmosPayload.legacyAmino,
        eipToSign: eip712Payload,
    };
};
//# sourceMappingURL=base.js.map