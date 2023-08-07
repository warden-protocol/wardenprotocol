export function createEIP712(types, chainId, message) {
    return {
        types,
        primaryType: 'Tx',
        domain: {
            name: 'Cosmos Web3',
            version: '1.0.0',
            chainId,
            verifyingContract: 'cosmos',
            salt: '0',
        },
        message,
    };
}
export function generateMessageWithMultipleTransactions(accountNumber, sequence, chainCosmosId, memo, fee, msgs) {
    return {
        account_number: accountNumber,
        chain_id: chainCosmosId,
        fee,
        memo,
        msgs,
        sequence,
    };
}
export function generateMessage(accountNumber, sequence, chainCosmosId, memo, fee, msg) {
    return generateMessageWithMultipleTransactions(accountNumber, sequence, chainCosmosId, memo, fee, [msg]);
}
export function generateTypes(msgValues) {
    const types = {
        EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'string' },
            { name: 'salt', type: 'string' },
        ],
        Tx: [
            { name: 'account_number', type: 'string' },
            { name: 'chain_id', type: 'string' },
            { name: 'fee', type: 'Fee' },
            { name: 'memo', type: 'string' },
            { name: 'msgs', type: 'Msg[]' },
            { name: 'sequence', type: 'string' },
        ],
        Fee: [
            { name: 'feePayer', type: 'string' },
            { name: 'amount', type: 'Coin[]' },
            { name: 'gas', type: 'string' },
        ],
        Coin: [
            { name: 'denom', type: 'string' },
            { name: 'amount', type: 'string' },
        ],
        Msg: [
            { name: 'type', type: 'string' },
            { name: 'value', type: 'MsgValue' },
        ],
    };
    Object.assign(types, msgValues);
    return types;
}
export function generateFee(amount, denom, gas, feePayer) {
    return {
        amount: [
            {
                amount,
                denom,
            },
        ],
        gas,
        feePayer,
    };
}
//# sourceMappingURL=base.js.map