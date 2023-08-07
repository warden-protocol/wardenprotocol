import * as staking from '../proto/cosmos/staking/v1beta1/tx';
export interface MsgEditValidatorProtoInterface {
    path: string;
    message: staking.cosmos.staking.v1beta1.MsgEditValidator;
}
export declare function createMsgEditValidator(moniker: string | undefined, identity: string | undefined, website: string | undefined, securityContact: string | undefined, details: string | undefined, validatorAddress: string | undefined, commissionRate: string | undefined, minSelfDelegation: string | undefined): {
    message: staking.cosmos.staking.v1beta1.MsgEditValidator;
    path: string;
};
//# sourceMappingURL=validator.d.ts.map