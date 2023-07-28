import * as staking from '../proto/cosmos/staking/v1beta1/tx';
import * as dist from '../proto/cosmos/distribution/v1beta1/tx';
export declare function createMsgDelegate(delegatorAddress: string, validatorAddress: string, amount: string, denom: string): {
    message: staking.cosmos.staking.v1beta1.MsgDelegate;
    path: string;
};
export declare function createMsgBeginRedelegate(delegatorAddress: string, validatorSrcAddress: string, validatorDstAddress: string, amount: string, denom: string): {
    message: staking.cosmos.staking.v1beta1.MsgBeginRedelegate;
    path: string;
};
export declare function createMsgUndelegate(delegatorAddress: string, validatorAddress: string, amount: string, denom: string): {
    message: staking.cosmos.staking.v1beta1.MsgUndelegate;
    path: string;
};
export interface MsgWithdrawDelegatorRewardProtoInterface {
    path: string;
    message: dist.cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward;
}
export declare function createMsgWithdrawDelegatorReward(delegatorAddress: string, validatorAddress: string): {
    message: dist.cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward;
    path: string;
};
export interface MsgWithdrawValidatorCommissionProtoInterface {
    path: string;
    message: dist.cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission;
}
export declare function createMsgWithdrawValidatorCommission(validatorAddress: string): {
    message: dist.cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission;
    path: string;
};
//# sourceMappingURL=staking.d.ts.map