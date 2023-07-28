import * as staking from '../proto/cosmos/staking/v1beta1/tx';
import * as distribution from '../proto/cosmos/distribution/v1beta1/tx';
export interface MsgEditValidatorProtoInterface {
    path: string;
    message: staking.cosmos.staking.v1beta1.MsgEditValidator;
}
export declare function createMsgEditValidator(moniker: string | undefined, identity: string | undefined, website: string | undefined, securityContact: string | undefined, details: string | undefined, validatorAddress: string | undefined, commissionRate: string | undefined, minSelfDelegation: string | undefined): {
    message: staking.cosmos.staking.v1beta1.MsgEditValidator;
    path: string;
};
export interface MsgCreateValidatorInterface {
    path: string;
    message: staking.cosmos.staking.v1beta1.MsgCreateValidator;
}
export declare function createMsgCreateValidator(validatorDescription: {
    moniker: string;
    identity: string;
    website: string;
    securityContact: string;
    details: string;
}, validatorCommission: {
    rate: string;
    maxRate: string;
    maxChangeRate: string;
}, minSelfDelegation: string, delegatorAddress: string, validatorAddress: string, amount: string, denom: string, pubkey: string): {
    message: staking.cosmos.staking.v1beta1.MsgCreateValidator;
    path: string;
};
export interface MsgSetWithdrawAddressProtoInterface {
    path: string;
    message: distribution.cosmos.distribution.v1beta1.MsgSetWithdrawAddress;
}
export declare function createMsgSetWithdrawAddress(delegatorAddress: string, withdrawAddress: string): {
    message: distribution.cosmos.distribution.v1beta1.MsgSetWithdrawAddress;
    path: string;
};
//# sourceMappingURL=validator.d.ts.map