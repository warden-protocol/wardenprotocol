export const MSG_BEGIN_REDELEGATE_TYPES = {
    MsgValue: [
        { name: 'delegator_address', type: 'string' },
        { name: 'validator_src_address', type: 'string' },
        { name: 'validator_dst_address', type: 'string' },
        { name: 'amount', type: 'TypeAmount' },
    ],
    TypeAmount: [
        { name: 'denom', type: 'string' },
        { name: 'amount', type: 'string' },
    ],
};
export function createMsgBeginRedelegate(delegatorAddress, validatorSrcAddress, validatorDstAddress, amount, denom) {
    return {
        type: 'cosmos-sdk/MsgBeginRedelegate',
        value: {
            amount: {
                amount,
                denom,
            },
            delegator_address: delegatorAddress,
            validator_src_address: validatorSrcAddress,
            validator_dst_address: validatorDstAddress,
        },
    };
}
//# sourceMappingURL=beginRedelegate.js.map