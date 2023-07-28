export declare const MSG_SET_WITHDRAW_ADDRESS_TYPES: {
    MsgValue: {
        name: string;
        type: string;
    }[];
};
export declare function createMsgSetWithdrawAddress(delegatorAddress: string, withdrawAddress: string): {
    type: string;
    value: {
        delegator_address: string;
        withdraw_address: string;
    };
};
//# sourceMappingURL=setWithdrawAddress.d.ts.map