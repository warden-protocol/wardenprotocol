import { MsgWithdrawDelegatorReward, MsgWithdrawValidatorCommission, MsgSetWithdrawAddress } from '../../proto/cosmos/distribution/tx.js';
export interface MsgWithdrawDelegatorRewardProtoInterface {
    path: string;
    message: MsgWithdrawDelegatorReward;
}
export declare function createMsgWithdrawDelegatorReward(delegatorAddress: string, validatorAddress: string): {
    message: MsgWithdrawDelegatorReward;
    path: string;
};
export interface MsgWithdrawValidatorCommissionProtoInterface {
    path: string;
    message: MsgWithdrawValidatorCommission;
}
export declare function createMsgWithdrawValidatorCommission(validatorAddress: string): {
    message: MsgWithdrawValidatorCommission;
    path: string;
};
export interface MsgSetWithdrawAddressProtoInterface {
    path: string;
    message: MsgSetWithdrawAddress;
}
export declare function createMsgSetWithdrawAddress(delegatorAddress: string, withdrawAddress: string): {
    message: MsgSetWithdrawAddress;
    path: string;
};
//# sourceMappingURL=distribution.d.ts.map