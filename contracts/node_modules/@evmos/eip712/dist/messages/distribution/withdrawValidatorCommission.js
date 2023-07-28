export const MSG_WITHDRAW_VALIDATOR_COMMISSION_TYPES = {
    MsgValue: [{ name: 'validator_address', type: 'string' }],
};
export function createMsgWithdrawValidatorCommission(validatorAddress) {
    return {
        type: 'cosmos-sdk/MsgWithdrawValidatorCommission',
        value: {
            validator_address: validatorAddress,
        },
    };
}
//# sourceMappingURL=withdrawValidatorCommission.js.map