import { MsgEditValidator, MsgCreateValidator } from '../../proto/cosmos/staking/tx.js';
export interface MsgEditValidatorProtoInterface {
    path: string;
    message: MsgEditValidator;
}
export declare function createMsgEditValidator(moniker: string | undefined, identity: string | undefined, website: string | undefined, securityContact: string | undefined, details: string | undefined, validatorAddress: string | undefined, commissionRate: string | undefined, minSelfDelegation: string | undefined): {
    message: MsgEditValidator;
    path: string;
};
export interface MsgCreateValidatorInterface {
    path: string;
    message: MsgCreateValidator;
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
    message: MsgCreateValidator;
    path: string;
};
//# sourceMappingURL=validator.d.ts.map