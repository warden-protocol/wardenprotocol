export declare const MSG_CANCEL_UNBONDING_DELEGATION_TYPES: {
    MsgValue: {
        name: string;
        type: string;
    }[];
    TypeAmount: {
        name: string;
        type: string;
    }[];
};
export declare function createMsgCancelUnbondingDelegation(delegatorAddress: string, validatorAddress: string, amount: string, denom: string, creationHeight: string): {
    type: string;
    value: {
        delegator_address: string;
        validator_address: string;
        amount: {
            amount: string;
            denom: string;
        };
        creation_height: number;
    };
};
//# sourceMappingURL=cancelUnbondingDelegation.d.ts.map