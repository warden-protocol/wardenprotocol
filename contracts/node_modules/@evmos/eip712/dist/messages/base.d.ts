export declare function createEIP712(types: object, chainId: number, message: object): {
    types: object;
    primaryType: string;
    domain: {
        name: string;
        version: string;
        chainId: number;
        verifyingContract: string;
        salt: string;
    };
    message: object;
};
export declare function generateMessageWithMultipleTransactions(accountNumber: string, sequence: string, chainCosmosId: string, memo: string, fee: object, msgs: object[]): {
    account_number: string;
    chain_id: string;
    fee: object;
    memo: string;
    msgs: object[];
    sequence: string;
};
export declare function generateMessage(accountNumber: string, sequence: string, chainCosmosId: string, memo: string, fee: object, msg: object): {
    account_number: string;
    chain_id: string;
    fee: object;
    memo: string;
    msgs: object[];
    sequence: string;
};
export declare function generateTypes(msgValues: object): {
    EIP712Domain: {
        name: string;
        type: string;
    }[];
    Tx: {
        name: string;
        type: string;
    }[];
    Fee: {
        name: string;
        type: string;
    }[];
    Coin: {
        name: string;
        type: string;
    }[];
    Msg: {
        name: string;
        type: string;
    }[];
};
export declare function generateFee(amount: string, denom: string, gas: string, feePayer: string): {
    amount: {
        amount: string;
        denom: string;
    }[];
    gas: string;
    feePayer: string;
};
//# sourceMappingURL=base.d.ts.map