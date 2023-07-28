import { MsgDelegate, MsgBeginRedelegate, MsgUndelegate, MsgCancelUnbondingDelegation } from '../../proto/cosmos/staking/tx.js';
export declare function createMsgDelegate(delegatorAddress: string, validatorAddress: string, amount: string, denom: string): {
    message: MsgDelegate;
    path: string;
};
export declare function createMsgBeginRedelegate(delegatorAddress: string, validatorSrcAddress: string, validatorDstAddress: string, amount: string, denom: string): {
    message: MsgBeginRedelegate;
    path: string;
};
export declare function createMsgUndelegate(delegatorAddress: string, validatorAddress: string, amount: string, denom: string): {
    message: MsgUndelegate;
    path: string;
};
export declare function createMsgCancelUnbondingDelegation(delegatorAddress: string, validatorAddress: string, amount: string, denom: string, creationHeight: string): {
    message: MsgCancelUnbondingDelegation;
    path: string;
};
//# sourceMappingURL=staking.d.ts.map