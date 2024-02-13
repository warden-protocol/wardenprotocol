import _m0 from "protobufjs/minimal";
import { Coin, DecCoin } from "../../base/v1beta1/coin";
export declare const protobufPackage = "cosmos.distribution.v1beta1";
/** Params defines the set of params for the distribution module. */
export interface Params {
    communityTax: string;
    /**
     * Deprecated: The base_proposer_reward field is deprecated and is no longer used
     * in the x/distribution module's reward mechanism.
     *
     * @deprecated
     */
    baseProposerReward: string;
    /**
     * Deprecated: The bonus_proposer_reward field is deprecated and is no longer used
     * in the x/distribution module's reward mechanism.
     *
     * @deprecated
     */
    bonusProposerReward: string;
    withdrawAddrEnabled: boolean;
}
/**
 * ValidatorHistoricalRewards represents historical rewards for a validator.
 * Height is implicit within the store key.
 * Cumulative reward ratio is the sum from the zeroeth period
 * until this period of rewards / tokens, per the spec.
 * The reference count indicates the number of objects
 * which might need to reference this historical entry at any point.
 * ReferenceCount =
 *    number of outstanding delegations which ended the associated period (and
 *    might need to read that record)
 *  + number of slashes which ended the associated period (and might need to
 *  read that record)
 *  + one per validator for the zeroeth period, set on initialization
 */
export interface ValidatorHistoricalRewards {
    cumulativeRewardRatio: DecCoin[];
    referenceCount: number;
}
/**
 * ValidatorCurrentRewards represents current rewards and current
 * period for a validator kept as a running counter and incremented
 * each block as long as the validator's tokens remain constant.
 */
export interface ValidatorCurrentRewards {
    rewards: DecCoin[];
    period: number;
}
/**
 * ValidatorAccumulatedCommission represents accumulated commission
 * for a validator kept as a running counter, can be withdrawn at any time.
 */
export interface ValidatorAccumulatedCommission {
    commission: DecCoin[];
}
/**
 * ValidatorOutstandingRewards represents outstanding (un-withdrawn) rewards
 * for a validator inexpensive to track, allows simple sanity checks.
 */
export interface ValidatorOutstandingRewards {
    rewards: DecCoin[];
}
/**
 * ValidatorSlashEvent represents a validator slash event.
 * Height is implicit within the store key.
 * This is needed to calculate appropriate amount of staking tokens
 * for delegations which are withdrawn after a slash has occurred.
 */
export interface ValidatorSlashEvent {
    validatorPeriod: number;
    fraction: string;
}
/** ValidatorSlashEvents is a collection of ValidatorSlashEvent messages. */
export interface ValidatorSlashEvents {
    validatorSlashEvents: ValidatorSlashEvent[];
}
/** FeePool is the global fee pool for distribution. */
export interface FeePool {
    communityPool: DecCoin[];
}
/**
 * CommunityPoolSpendProposal details a proposal for use of community funds,
 * together with how many coins are proposed to be spent, and to which
 * recipient account.
 *
 * Deprecated: Do not use. As of the Cosmos SDK release v0.47.x, there is no
 * longer a need for an explicit CommunityPoolSpendProposal. To spend community
 * pool funds, a simple MsgCommunityPoolSpend can be invoked from the x/gov
 * module via a v1 governance proposal.
 *
 * @deprecated
 */
export interface CommunityPoolSpendProposal {
    title: string;
    description: string;
    recipient: string;
    amount: Coin[];
}
/**
 * DelegatorStartingInfo represents the starting info for a delegator reward
 * period. It tracks the previous validator period, the delegation's amount of
 * staking token, and the creation height (to check later on if any slashes have
 * occurred). NOTE: Even though validators are slashed to whole staking tokens,
 * the delegators within the validator may be left with less than a full token,
 * thus sdk.Dec is used.
 */
export interface DelegatorStartingInfo {
    previousPeriod: number;
    stake: string;
    height: number;
}
/**
 * DelegationDelegatorReward represents the properties
 * of a delegator's delegation reward.
 */
export interface DelegationDelegatorReward {
    validatorAddress: string;
    reward: DecCoin[];
}
/**
 * CommunityPoolSpendProposalWithDeposit defines a CommunityPoolSpendProposal
 * with a deposit
 */
export interface CommunityPoolSpendProposalWithDeposit {
    title: string;
    description: string;
    recipient: string;
    amount: string;
    deposit: string;
}
export declare const Params: {
    encode(message: Params, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Params;
    fromJSON(object: any): Params;
    toJSON(message: Params): unknown;
    create<I extends {
        communityTax?: string;
        baseProposerReward?: string;
        bonusProposerReward?: string;
        withdrawAddrEnabled?: boolean;
    } & {
        communityTax?: string;
        baseProposerReward?: string;
        bonusProposerReward?: string;
        withdrawAddrEnabled?: boolean;
    } & { [K in Exclude<keyof I, keyof Params>]: never; }>(base?: I): Params;
    fromPartial<I_1 extends {
        communityTax?: string;
        baseProposerReward?: string;
        bonusProposerReward?: string;
        withdrawAddrEnabled?: boolean;
    } & {
        communityTax?: string;
        baseProposerReward?: string;
        bonusProposerReward?: string;
        withdrawAddrEnabled?: boolean;
    } & { [K_1 in Exclude<keyof I_1, keyof Params>]: never; }>(object: I_1): Params;
};
export declare const ValidatorHistoricalRewards: {
    encode(message: ValidatorHistoricalRewards, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorHistoricalRewards;
    fromJSON(object: any): ValidatorHistoricalRewards;
    toJSON(message: ValidatorHistoricalRewards): unknown;
    create<I extends {
        cumulativeRewardRatio?: {
            denom?: string;
            amount?: string;
        }[];
        referenceCount?: number;
    } & {
        cumulativeRewardRatio?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["cumulativeRewardRatio"][number], keyof DecCoin>]: never; })[] & { [K_1 in Exclude<keyof I["cumulativeRewardRatio"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        referenceCount?: number;
    } & { [K_2 in Exclude<keyof I, keyof ValidatorHistoricalRewards>]: never; }>(base?: I): ValidatorHistoricalRewards;
    fromPartial<I_1 extends {
        cumulativeRewardRatio?: {
            denom?: string;
            amount?: string;
        }[];
        referenceCount?: number;
    } & {
        cumulativeRewardRatio?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_3 in Exclude<keyof I_1["cumulativeRewardRatio"][number], keyof DecCoin>]: never; })[] & { [K_4 in Exclude<keyof I_1["cumulativeRewardRatio"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        referenceCount?: number;
    } & { [K_5 in Exclude<keyof I_1, keyof ValidatorHistoricalRewards>]: never; }>(object: I_1): ValidatorHistoricalRewards;
};
export declare const ValidatorCurrentRewards: {
    encode(message: ValidatorCurrentRewards, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorCurrentRewards;
    fromJSON(object: any): ValidatorCurrentRewards;
    toJSON(message: ValidatorCurrentRewards): unknown;
    create<I extends {
        rewards?: {
            denom?: string;
            amount?: string;
        }[];
        period?: number;
    } & {
        rewards?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["rewards"][number], keyof DecCoin>]: never; })[] & { [K_1 in Exclude<keyof I["rewards"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        period?: number;
    } & { [K_2 in Exclude<keyof I, keyof ValidatorCurrentRewards>]: never; }>(base?: I): ValidatorCurrentRewards;
    fromPartial<I_1 extends {
        rewards?: {
            denom?: string;
            amount?: string;
        }[];
        period?: number;
    } & {
        rewards?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_3 in Exclude<keyof I_1["rewards"][number], keyof DecCoin>]: never; })[] & { [K_4 in Exclude<keyof I_1["rewards"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        period?: number;
    } & { [K_5 in Exclude<keyof I_1, keyof ValidatorCurrentRewards>]: never; }>(object: I_1): ValidatorCurrentRewards;
};
export declare const ValidatorAccumulatedCommission: {
    encode(message: ValidatorAccumulatedCommission, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorAccumulatedCommission;
    fromJSON(object: any): ValidatorAccumulatedCommission;
    toJSON(message: ValidatorAccumulatedCommission): unknown;
    create<I extends {
        commission?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        commission?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["commission"][number], keyof DecCoin>]: never; })[] & { [K_1 in Exclude<keyof I["commission"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, "commission">]: never; }>(base?: I): ValidatorAccumulatedCommission;
    fromPartial<I_1 extends {
        commission?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        commission?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_3 in Exclude<keyof I_1["commission"][number], keyof DecCoin>]: never; })[] & { [K_4 in Exclude<keyof I_1["commission"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, "commission">]: never; }>(object: I_1): ValidatorAccumulatedCommission;
};
export declare const ValidatorOutstandingRewards: {
    encode(message: ValidatorOutstandingRewards, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorOutstandingRewards;
    fromJSON(object: any): ValidatorOutstandingRewards;
    toJSON(message: ValidatorOutstandingRewards): unknown;
    create<I extends {
        rewards?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        rewards?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["rewards"][number], keyof DecCoin>]: never; })[] & { [K_1 in Exclude<keyof I["rewards"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, "rewards">]: never; }>(base?: I): ValidatorOutstandingRewards;
    fromPartial<I_1 extends {
        rewards?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        rewards?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_3 in Exclude<keyof I_1["rewards"][number], keyof DecCoin>]: never; })[] & { [K_4 in Exclude<keyof I_1["rewards"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, "rewards">]: never; }>(object: I_1): ValidatorOutstandingRewards;
};
export declare const ValidatorSlashEvent: {
    encode(message: ValidatorSlashEvent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorSlashEvent;
    fromJSON(object: any): ValidatorSlashEvent;
    toJSON(message: ValidatorSlashEvent): unknown;
    create<I extends {
        validatorPeriod?: number;
        fraction?: string;
    } & {
        validatorPeriod?: number;
        fraction?: string;
    } & { [K in Exclude<keyof I, keyof ValidatorSlashEvent>]: never; }>(base?: I): ValidatorSlashEvent;
    fromPartial<I_1 extends {
        validatorPeriod?: number;
        fraction?: string;
    } & {
        validatorPeriod?: number;
        fraction?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof ValidatorSlashEvent>]: never; }>(object: I_1): ValidatorSlashEvent;
};
export declare const ValidatorSlashEvents: {
    encode(message: ValidatorSlashEvents, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorSlashEvents;
    fromJSON(object: any): ValidatorSlashEvents;
    toJSON(message: ValidatorSlashEvents): unknown;
    create<I extends {
        validatorSlashEvents?: {
            validatorPeriod?: number;
            fraction?: string;
        }[];
    } & {
        validatorSlashEvents?: {
            validatorPeriod?: number;
            fraction?: string;
        }[] & ({
            validatorPeriod?: number;
            fraction?: string;
        } & {
            validatorPeriod?: number;
            fraction?: string;
        } & { [K in Exclude<keyof I["validatorSlashEvents"][number], keyof ValidatorSlashEvent>]: never; })[] & { [K_1 in Exclude<keyof I["validatorSlashEvents"], keyof {
            validatorPeriod?: number;
            fraction?: string;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, "validatorSlashEvents">]: never; }>(base?: I): ValidatorSlashEvents;
    fromPartial<I_1 extends {
        validatorSlashEvents?: {
            validatorPeriod?: number;
            fraction?: string;
        }[];
    } & {
        validatorSlashEvents?: {
            validatorPeriod?: number;
            fraction?: string;
        }[] & ({
            validatorPeriod?: number;
            fraction?: string;
        } & {
            validatorPeriod?: number;
            fraction?: string;
        } & { [K_3 in Exclude<keyof I_1["validatorSlashEvents"][number], keyof ValidatorSlashEvent>]: never; })[] & { [K_4 in Exclude<keyof I_1["validatorSlashEvents"], keyof {
            validatorPeriod?: number;
            fraction?: string;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, "validatorSlashEvents">]: never; }>(object: I_1): ValidatorSlashEvents;
};
export declare const FeePool: {
    encode(message: FeePool, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): FeePool;
    fromJSON(object: any): FeePool;
    toJSON(message: FeePool): unknown;
    create<I extends {
        communityPool?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        communityPool?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["communityPool"][number], keyof DecCoin>]: never; })[] & { [K_1 in Exclude<keyof I["communityPool"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, "communityPool">]: never; }>(base?: I): FeePool;
    fromPartial<I_1 extends {
        communityPool?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        communityPool?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_3 in Exclude<keyof I_1["communityPool"][number], keyof DecCoin>]: never; })[] & { [K_4 in Exclude<keyof I_1["communityPool"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, "communityPool">]: never; }>(object: I_1): FeePool;
};
export declare const CommunityPoolSpendProposal: {
    encode(message: CommunityPoolSpendProposal, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): CommunityPoolSpendProposal;
    fromJSON(object: any): CommunityPoolSpendProposal;
    toJSON(message: CommunityPoolSpendProposal): unknown;
    create<I extends {
        title?: string;
        description?: string;
        recipient?: string;
        amount?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        title?: string;
        description?: string;
        recipient?: string;
        amount?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["amount"][number], keyof Coin>]: never; })[] & { [K_1 in Exclude<keyof I["amount"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof CommunityPoolSpendProposal>]: never; }>(base?: I): CommunityPoolSpendProposal;
    fromPartial<I_1 extends {
        title?: string;
        description?: string;
        recipient?: string;
        amount?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        title?: string;
        description?: string;
        recipient?: string;
        amount?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_3 in Exclude<keyof I_1["amount"][number], keyof Coin>]: never; })[] & { [K_4 in Exclude<keyof I_1["amount"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof CommunityPoolSpendProposal>]: never; }>(object: I_1): CommunityPoolSpendProposal;
};
export declare const DelegatorStartingInfo: {
    encode(message: DelegatorStartingInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DelegatorStartingInfo;
    fromJSON(object: any): DelegatorStartingInfo;
    toJSON(message: DelegatorStartingInfo): unknown;
    create<I extends {
        previousPeriod?: number;
        stake?: string;
        height?: number;
    } & {
        previousPeriod?: number;
        stake?: string;
        height?: number;
    } & { [K in Exclude<keyof I, keyof DelegatorStartingInfo>]: never; }>(base?: I): DelegatorStartingInfo;
    fromPartial<I_1 extends {
        previousPeriod?: number;
        stake?: string;
        height?: number;
    } & {
        previousPeriod?: number;
        stake?: string;
        height?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof DelegatorStartingInfo>]: never; }>(object: I_1): DelegatorStartingInfo;
};
export declare const DelegationDelegatorReward: {
    encode(message: DelegationDelegatorReward, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DelegationDelegatorReward;
    fromJSON(object: any): DelegationDelegatorReward;
    toJSON(message: DelegationDelegatorReward): unknown;
    create<I extends {
        validatorAddress?: string;
        reward?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        validatorAddress?: string;
        reward?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["reward"][number], keyof DecCoin>]: never; })[] & { [K_1 in Exclude<keyof I["reward"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof DelegationDelegatorReward>]: never; }>(base?: I): DelegationDelegatorReward;
    fromPartial<I_1 extends {
        validatorAddress?: string;
        reward?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        validatorAddress?: string;
        reward?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_3 in Exclude<keyof I_1["reward"][number], keyof DecCoin>]: never; })[] & { [K_4 in Exclude<keyof I_1["reward"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof DelegationDelegatorReward>]: never; }>(object: I_1): DelegationDelegatorReward;
};
export declare const CommunityPoolSpendProposalWithDeposit: {
    encode(message: CommunityPoolSpendProposalWithDeposit, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): CommunityPoolSpendProposalWithDeposit;
    fromJSON(object: any): CommunityPoolSpendProposalWithDeposit;
    toJSON(message: CommunityPoolSpendProposalWithDeposit): unknown;
    create<I extends {
        title?: string;
        description?: string;
        recipient?: string;
        amount?: string;
        deposit?: string;
    } & {
        title?: string;
        description?: string;
        recipient?: string;
        amount?: string;
        deposit?: string;
    } & { [K in Exclude<keyof I, keyof CommunityPoolSpendProposalWithDeposit>]: never; }>(base?: I): CommunityPoolSpendProposalWithDeposit;
    fromPartial<I_1 extends {
        title?: string;
        description?: string;
        recipient?: string;
        amount?: string;
        deposit?: string;
    } & {
        title?: string;
        description?: string;
        recipient?: string;
        amount?: string;
        deposit?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof CommunityPoolSpendProposalWithDeposit>]: never; }>(object: I_1): CommunityPoolSpendProposalWithDeposit;
};
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};
