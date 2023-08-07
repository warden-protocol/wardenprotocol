import { Coin } from '../../proto/cosmos/base/coin.js';
import { MsgDelegate, MsgBeginRedelegate, MsgUndelegate, MsgCancelUnbondingDelegation, } from '../../proto/cosmos/staking/tx.js';
export function createMsgDelegate(delegatorAddress, validatorAddress, amount, denom) {
    const value = new Coin({
        denom,
        amount,
    });
    const message = new MsgDelegate({
        delegatorAddress,
        validatorAddress,
        amount: value,
    });
    return {
        message,
        path: MsgDelegate.typeName,
    };
}
export function createMsgBeginRedelegate(delegatorAddress, validatorSrcAddress, validatorDstAddress, amount, denom) {
    const value = new Coin({
        denom,
        amount,
    });
    const message = new MsgBeginRedelegate({
        delegatorAddress,
        validatorSrcAddress,
        validatorDstAddress,
        amount: value,
    });
    return {
        message,
        path: MsgBeginRedelegate.typeName,
    };
}
export function createMsgUndelegate(delegatorAddress, validatorAddress, amount, denom) {
    const value = new Coin({
        denom,
        amount,
    });
    const message = new MsgUndelegate({
        delegatorAddress,
        validatorAddress,
        amount: value,
    });
    return {
        message,
        path: MsgUndelegate.typeName,
    };
}
export function createMsgCancelUnbondingDelegation(delegatorAddress, validatorAddress, amount, denom, creationHeight) {
    const value = new Coin({
        denom,
        amount,
    });
    const message = new MsgCancelUnbondingDelegation({
        delegatorAddress,
        validatorAddress,
        amount: value,
        creationHeight: BigInt(creationHeight),
    });
    return {
        message,
        path: MsgCancelUnbondingDelegation.typeName,
    };
}
//# sourceMappingURL=staking.js.map