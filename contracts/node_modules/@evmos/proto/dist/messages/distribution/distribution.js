import { MsgWithdrawDelegatorReward, MsgWithdrawValidatorCommission, MsgSetWithdrawAddress, } from '../../proto/cosmos/distribution/tx.js';
export function createMsgWithdrawDelegatorReward(delegatorAddress, validatorAddress) {
    const message = new MsgWithdrawDelegatorReward({
        delegatorAddress,
        validatorAddress,
    });
    return {
        message,
        path: MsgWithdrawDelegatorReward.typeName,
    };
}
export function createMsgWithdrawValidatorCommission(validatorAddress) {
    const message = new MsgWithdrawValidatorCommission({
        validatorAddress,
    });
    return {
        message,
        path: MsgWithdrawValidatorCommission.typeName,
    };
}
export function createMsgSetWithdrawAddress(delegatorAddress, withdrawAddress) {
    const message = new MsgSetWithdrawAddress({
        delegatorAddress,
        withdrawAddress,
    });
    return {
        message,
        path: MsgSetWithdrawAddress.typeName,
    };
}
//# sourceMappingURL=distribution.js.map