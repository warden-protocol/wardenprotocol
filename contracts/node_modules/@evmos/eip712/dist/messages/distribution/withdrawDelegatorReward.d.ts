export declare const MSG_WITHDRAW_DELEGATOR_REWARD_TYPES: {
    MsgValue: {
        name: string;
        type: string;
    }[];
};
export interface MsgWithdrawDelegatorRewardInterface {
    type: string;
    value: {
        delegator_address: string;
        validator_address: string;
    };
}
export declare function createMsgWithdrawDelegatorReward(delegatorAddress: string, validatorAddress: string): {
    type: string;
    value: {
        delegator_address: string;
        validator_address: string;
    };
};
//# sourceMappingURL=withdrawDelegatorReward.d.ts.map