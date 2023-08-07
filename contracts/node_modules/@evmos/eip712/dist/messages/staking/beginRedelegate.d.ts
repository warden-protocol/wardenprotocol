export declare const MSG_BEGIN_REDELEGATE_TYPES: {
    MsgValue: {
        name: string;
        type: string;
    }[];
    TypeAmount: {
        name: string;
        type: string;
    }[];
};
export declare function createMsgBeginRedelegate(delegatorAddress: string, validatorSrcAddress: string, validatorDstAddress: string, amount: string, denom: string): {
    type: string;
    value: {
        amount: {
            amount: string;
            denom: string;
        };
        delegator_address: string;
        validator_src_address: string;
        validator_dst_address: string;
    };
};
//# sourceMappingURL=beginRedelegate.d.ts.map