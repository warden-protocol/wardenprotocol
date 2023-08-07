export const MSG_WITHDRAW_DELEGATOR_REWARD_TYPES = {
    MsgValue: [
        { name: 'delegator_address', type: 'string' },
        { name: 'validator_address', type: 'string' },
    ],
};
export function createMsgWithdrawDelegatorReward(delegatorAddress, validatorAddress) {
    return {
        type: 'cosmos-sdk/MsgWithdrawDelegationReward',
        value: {
            delegator_address: delegatorAddress,
            validator_address: validatorAddress,
        },
    };
}
//# sourceMappingURL=withdrawDelegatorReward.js.map