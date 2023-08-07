export declare const MSG_UNDELEGATE_TYPES: {
    MsgValue: {
        name: string;
        type: string;
    }[];
    TypeAmount: {
        name: string;
        type: string;
    }[];
};
export declare function createMsgUndelegate(delegatorAddress: string, validatorAddress: string, amount: string, denom: string): {
    type: string;
    value: {
        amount: {
            amount: string;
            denom: string;
        };
        delegator_address: string;
        validator_address: string;
    };
};
//# sourceMappingURL=undelegate.d.ts.map