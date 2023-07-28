export const MSG_CANCEL_UNBONDING_DELEGATION_TYPES = {
    MsgValue: [
        { name: 'delegator_address', type: 'string' },
        { name: 'validator_address', type: 'string' },
        { name: 'amount', type: 'TypeAmount' },
        { name: 'creation_height', type: 'int64' },
    ],
    TypeAmount: [
        { name: 'denom', type: 'string' },
        { name: 'amount', type: 'string' },
    ],
};
export function createMsgCancelUnbondingDelegation(delegatorAddress, validatorAddress, amount, denom, creationHeight) {
    return {
        type: 'cosmos-sdk/MsgCancelUnbondingDelegation',
        value: {
            delegator_address: delegatorAddress,
            validator_address: validatorAddress,
            amount: {
                amount,
                denom,
            },
            creation_height: parseInt(creationHeight, 10),
        },
    };
}
//# sourceMappingURL=cancelUnbondingDelegation.js.map