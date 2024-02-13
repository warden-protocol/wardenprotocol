import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
import { DecCoin } from "../../base/v1beta1/coin";
import { DelegationDelegatorReward, Params, ValidatorAccumulatedCommission, ValidatorOutstandingRewards, ValidatorSlashEvent } from "./distribution";
export declare const protobufPackage = "cosmos.distribution.v1beta1";
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
    /** params defines the parameters of the module. */
    params: Params | undefined;
}
/** QueryValidatorDistributionInfoRequest is the request type for the Query/ValidatorDistributionInfo RPC method. */
export interface QueryValidatorDistributionInfoRequest {
    /** validator_address defines the validator address to query for. */
    validatorAddress: string;
}
/** QueryValidatorDistributionInfoResponse is the response type for the Query/ValidatorDistributionInfo RPC method. */
export interface QueryValidatorDistributionInfoResponse {
    /** operator_address defines the validator operator address. */
    operatorAddress: string;
    /** self_bond_rewards defines the self delegations rewards. */
    selfBondRewards: DecCoin[];
    /** commission defines the commission the validator received. */
    commission: DecCoin[];
}
/**
 * QueryValidatorOutstandingRewardsRequest is the request type for the
 * Query/ValidatorOutstandingRewards RPC method.
 */
export interface QueryValidatorOutstandingRewardsRequest {
    /** validator_address defines the validator address to query for. */
    validatorAddress: string;
}
/**
 * QueryValidatorOutstandingRewardsResponse is the response type for the
 * Query/ValidatorOutstandingRewards RPC method.
 */
export interface QueryValidatorOutstandingRewardsResponse {
    rewards: ValidatorOutstandingRewards | undefined;
}
/**
 * QueryValidatorCommissionRequest is the request type for the
 * Query/ValidatorCommission RPC method
 */
export interface QueryValidatorCommissionRequest {
    /** validator_address defines the validator address to query for. */
    validatorAddress: string;
}
/**
 * QueryValidatorCommissionResponse is the response type for the
 * Query/ValidatorCommission RPC method
 */
export interface QueryValidatorCommissionResponse {
    /** commission defines the commission the validator received. */
    commission: ValidatorAccumulatedCommission | undefined;
}
/**
 * QueryValidatorSlashesRequest is the request type for the
 * Query/ValidatorSlashes RPC method
 */
export interface QueryValidatorSlashesRequest {
    /** validator_address defines the validator address to query for. */
    validatorAddress: string;
    /** starting_height defines the optional starting height to query the slashes. */
    startingHeight: number;
    /** starting_height defines the optional ending height to query the slashes. */
    endingHeight: number;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/**
 * QueryValidatorSlashesResponse is the response type for the
 * Query/ValidatorSlashes RPC method.
 */
export interface QueryValidatorSlashesResponse {
    /** slashes defines the slashes the validator received. */
    slashes: ValidatorSlashEvent[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/**
 * QueryDelegationRewardsRequest is the request type for the
 * Query/DelegationRewards RPC method.
 */
export interface QueryDelegationRewardsRequest {
    /** delegator_address defines the delegator address to query for. */
    delegatorAddress: string;
    /** validator_address defines the validator address to query for. */
    validatorAddress: string;
}
/**
 * QueryDelegationRewardsResponse is the response type for the
 * Query/DelegationRewards RPC method.
 */
export interface QueryDelegationRewardsResponse {
    /** rewards defines the rewards accrued by a delegation. */
    rewards: DecCoin[];
}
/**
 * QueryDelegationTotalRewardsRequest is the request type for the
 * Query/DelegationTotalRewards RPC method.
 */
export interface QueryDelegationTotalRewardsRequest {
    /** delegator_address defines the delegator address to query for. */
    delegatorAddress: string;
}
/**
 * QueryDelegationTotalRewardsResponse is the response type for the
 * Query/DelegationTotalRewards RPC method.
 */
export interface QueryDelegationTotalRewardsResponse {
    /** rewards defines all the rewards accrued by a delegator. */
    rewards: DelegationDelegatorReward[];
    /** total defines the sum of all the rewards. */
    total: DecCoin[];
}
/**
 * QueryDelegatorValidatorsRequest is the request type for the
 * Query/DelegatorValidators RPC method.
 */
export interface QueryDelegatorValidatorsRequest {
    /** delegator_address defines the delegator address to query for. */
    delegatorAddress: string;
}
/**
 * QueryDelegatorValidatorsResponse is the response type for the
 * Query/DelegatorValidators RPC method.
 */
export interface QueryDelegatorValidatorsResponse {
    /** validators defines the validators a delegator is delegating for. */
    validators: string[];
}
/**
 * QueryDelegatorWithdrawAddressRequest is the request type for the
 * Query/DelegatorWithdrawAddress RPC method.
 */
export interface QueryDelegatorWithdrawAddressRequest {
    /** delegator_address defines the delegator address to query for. */
    delegatorAddress: string;
}
/**
 * QueryDelegatorWithdrawAddressResponse is the response type for the
 * Query/DelegatorWithdrawAddress RPC method.
 */
export interface QueryDelegatorWithdrawAddressResponse {
    /** withdraw_address defines the delegator address to query for. */
    withdrawAddress: string;
}
/**
 * QueryCommunityPoolRequest is the request type for the Query/CommunityPool RPC
 * method.
 */
export interface QueryCommunityPoolRequest {
}
/**
 * QueryCommunityPoolResponse is the response type for the Query/CommunityPool
 * RPC method.
 */
export interface QueryCommunityPoolResponse {
    /** pool defines community pool's coins. */
    pool: DecCoin[];
}
export declare const QueryParamsRequest: {
    encode(_: QueryParamsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest;
    fromJSON(_: any): QueryParamsRequest;
    toJSON(_: QueryParamsRequest): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): QueryParamsRequest;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): QueryParamsRequest;
};
export declare const QueryParamsResponse: {
    encode(message: QueryParamsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse;
    fromJSON(object: any): QueryParamsResponse;
    toJSON(message: QueryParamsResponse): unknown;
    create<I extends {
        params?: {
            communityTax?: string;
            baseProposerReward?: string;
            bonusProposerReward?: string;
            withdrawAddrEnabled?: boolean;
        };
    } & {
        params?: {
            communityTax?: string;
            baseProposerReward?: string;
            bonusProposerReward?: string;
            withdrawAddrEnabled?: boolean;
        } & {
            communityTax?: string;
            baseProposerReward?: string;
            bonusProposerReward?: string;
            withdrawAddrEnabled?: boolean;
        } & { [K in Exclude<keyof I["params"], keyof Params>]: never; };
    } & { [K_1 in Exclude<keyof I, "params">]: never; }>(base?: I): QueryParamsResponse;
    fromPartial<I_1 extends {
        params?: {
            communityTax?: string;
            baseProposerReward?: string;
            bonusProposerReward?: string;
            withdrawAddrEnabled?: boolean;
        };
    } & {
        params?: {
            communityTax?: string;
            baseProposerReward?: string;
            bonusProposerReward?: string;
            withdrawAddrEnabled?: boolean;
        } & {
            communityTax?: string;
            baseProposerReward?: string;
            bonusProposerReward?: string;
            withdrawAddrEnabled?: boolean;
        } & { [K_2 in Exclude<keyof I_1["params"], keyof Params>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "params">]: never; }>(object: I_1): QueryParamsResponse;
};
export declare const QueryValidatorDistributionInfoRequest: {
    encode(message: QueryValidatorDistributionInfoRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryValidatorDistributionInfoRequest;
    fromJSON(object: any): QueryValidatorDistributionInfoRequest;
    toJSON(message: QueryValidatorDistributionInfoRequest): unknown;
    create<I extends {
        validatorAddress?: string;
    } & {
        validatorAddress?: string;
    } & { [K in Exclude<keyof I, "validatorAddress">]: never; }>(base?: I): QueryValidatorDistributionInfoRequest;
    fromPartial<I_1 extends {
        validatorAddress?: string;
    } & {
        validatorAddress?: string;
    } & { [K_1 in Exclude<keyof I_1, "validatorAddress">]: never; }>(object: I_1): QueryValidatorDistributionInfoRequest;
};
export declare const QueryValidatorDistributionInfoResponse: {
    encode(message: QueryValidatorDistributionInfoResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryValidatorDistributionInfoResponse;
    fromJSON(object: any): QueryValidatorDistributionInfoResponse;
    toJSON(message: QueryValidatorDistributionInfoResponse): unknown;
    create<I extends {
        operatorAddress?: string;
        selfBondRewards?: {
            denom?: string;
            amount?: string;
        }[];
        commission?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        operatorAddress?: string;
        selfBondRewards?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["selfBondRewards"][number], keyof DecCoin>]: never; })[] & { [K_1 in Exclude<keyof I["selfBondRewards"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        commission?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_2 in Exclude<keyof I["commission"][number], keyof DecCoin>]: never; })[] & { [K_3 in Exclude<keyof I["commission"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_4 in Exclude<keyof I, keyof QueryValidatorDistributionInfoResponse>]: never; }>(base?: I): QueryValidatorDistributionInfoResponse;
    fromPartial<I_1 extends {
        operatorAddress?: string;
        selfBondRewards?: {
            denom?: string;
            amount?: string;
        }[];
        commission?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        operatorAddress?: string;
        selfBondRewards?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_5 in Exclude<keyof I_1["selfBondRewards"][number], keyof DecCoin>]: never; })[] & { [K_6 in Exclude<keyof I_1["selfBondRewards"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        commission?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_7 in Exclude<keyof I_1["commission"][number], keyof DecCoin>]: never; })[] & { [K_8 in Exclude<keyof I_1["commission"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_9 in Exclude<keyof I_1, keyof QueryValidatorDistributionInfoResponse>]: never; }>(object: I_1): QueryValidatorDistributionInfoResponse;
};
export declare const QueryValidatorOutstandingRewardsRequest: {
    encode(message: QueryValidatorOutstandingRewardsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryValidatorOutstandingRewardsRequest;
    fromJSON(object: any): QueryValidatorOutstandingRewardsRequest;
    toJSON(message: QueryValidatorOutstandingRewardsRequest): unknown;
    create<I extends {
        validatorAddress?: string;
    } & {
        validatorAddress?: string;
    } & { [K in Exclude<keyof I, "validatorAddress">]: never; }>(base?: I): QueryValidatorOutstandingRewardsRequest;
    fromPartial<I_1 extends {
        validatorAddress?: string;
    } & {
        validatorAddress?: string;
    } & { [K_1 in Exclude<keyof I_1, "validatorAddress">]: never; }>(object: I_1): QueryValidatorOutstandingRewardsRequest;
};
export declare const QueryValidatorOutstandingRewardsResponse: {
    encode(message: QueryValidatorOutstandingRewardsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryValidatorOutstandingRewardsResponse;
    fromJSON(object: any): QueryValidatorOutstandingRewardsResponse;
    toJSON(message: QueryValidatorOutstandingRewardsResponse): unknown;
    create<I extends {
        rewards?: {
            rewards?: {
                denom?: string;
                amount?: string;
            }[];
        };
    } & {
        rewards?: {
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
            } & { [K in Exclude<keyof I["rewards"]["rewards"][number], keyof DecCoin>]: never; })[] & { [K_1 in Exclude<keyof I["rewards"]["rewards"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
        } & { [K_2 in Exclude<keyof I["rewards"], "rewards">]: never; };
    } & { [K_3 in Exclude<keyof I, "rewards">]: never; }>(base?: I): QueryValidatorOutstandingRewardsResponse;
    fromPartial<I_1 extends {
        rewards?: {
            rewards?: {
                denom?: string;
                amount?: string;
            }[];
        };
    } & {
        rewards?: {
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
            } & { [K_4 in Exclude<keyof I_1["rewards"]["rewards"][number], keyof DecCoin>]: never; })[] & { [K_5 in Exclude<keyof I_1["rewards"]["rewards"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
        } & { [K_6 in Exclude<keyof I_1["rewards"], "rewards">]: never; };
    } & { [K_7 in Exclude<keyof I_1, "rewards">]: never; }>(object: I_1): QueryValidatorOutstandingRewardsResponse;
};
export declare const QueryValidatorCommissionRequest: {
    encode(message: QueryValidatorCommissionRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryValidatorCommissionRequest;
    fromJSON(object: any): QueryValidatorCommissionRequest;
    toJSON(message: QueryValidatorCommissionRequest): unknown;
    create<I extends {
        validatorAddress?: string;
    } & {
        validatorAddress?: string;
    } & { [K in Exclude<keyof I, "validatorAddress">]: never; }>(base?: I): QueryValidatorCommissionRequest;
    fromPartial<I_1 extends {
        validatorAddress?: string;
    } & {
        validatorAddress?: string;
    } & { [K_1 in Exclude<keyof I_1, "validatorAddress">]: never; }>(object: I_1): QueryValidatorCommissionRequest;
};
export declare const QueryValidatorCommissionResponse: {
    encode(message: QueryValidatorCommissionResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryValidatorCommissionResponse;
    fromJSON(object: any): QueryValidatorCommissionResponse;
    toJSON(message: QueryValidatorCommissionResponse): unknown;
    create<I extends {
        commission?: {
            commission?: {
                denom?: string;
                amount?: string;
            }[];
        };
    } & {
        commission?: {
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
            } & { [K in Exclude<keyof I["commission"]["commission"][number], keyof DecCoin>]: never; })[] & { [K_1 in Exclude<keyof I["commission"]["commission"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
        } & { [K_2 in Exclude<keyof I["commission"], "commission">]: never; };
    } & { [K_3 in Exclude<keyof I, "commission">]: never; }>(base?: I): QueryValidatorCommissionResponse;
    fromPartial<I_1 extends {
        commission?: {
            commission?: {
                denom?: string;
                amount?: string;
            }[];
        };
    } & {
        commission?: {
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
            } & { [K_4 in Exclude<keyof I_1["commission"]["commission"][number], keyof DecCoin>]: never; })[] & { [K_5 in Exclude<keyof I_1["commission"]["commission"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
        } & { [K_6 in Exclude<keyof I_1["commission"], "commission">]: never; };
    } & { [K_7 in Exclude<keyof I_1, "commission">]: never; }>(object: I_1): QueryValidatorCommissionResponse;
};
export declare const QueryValidatorSlashesRequest: {
    encode(message: QueryValidatorSlashesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryValidatorSlashesRequest;
    fromJSON(object: any): QueryValidatorSlashesRequest;
    toJSON(message: QueryValidatorSlashesRequest): unknown;
    create<I extends {
        validatorAddress?: string;
        startingHeight?: number;
        endingHeight?: number;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        validatorAddress?: string;
        startingHeight?: number;
        endingHeight?: number;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K in Exclude<keyof I["pagination"], keyof PageRequest>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof QueryValidatorSlashesRequest>]: never; }>(base?: I): QueryValidatorSlashesRequest;
    fromPartial<I_1 extends {
        validatorAddress?: string;
        startingHeight?: number;
        endingHeight?: number;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        validatorAddress?: string;
        startingHeight?: number;
        endingHeight?: number;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K_2 in Exclude<keyof I_1["pagination"], keyof PageRequest>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof QueryValidatorSlashesRequest>]: never; }>(object: I_1): QueryValidatorSlashesRequest;
};
export declare const QueryValidatorSlashesResponse: {
    encode(message: QueryValidatorSlashesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryValidatorSlashesResponse;
    fromJSON(object: any): QueryValidatorSlashesResponse;
    toJSON(message: QueryValidatorSlashesResponse): unknown;
    create<I extends {
        slashes?: {
            validatorPeriod?: number;
            fraction?: string;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        slashes?: {
            validatorPeriod?: number;
            fraction?: string;
        }[] & ({
            validatorPeriod?: number;
            fraction?: string;
        } & {
            validatorPeriod?: number;
            fraction?: string;
        } & { [K in Exclude<keyof I["slashes"][number], keyof ValidatorSlashEvent>]: never; })[] & { [K_1 in Exclude<keyof I["slashes"], keyof {
            validatorPeriod?: number;
            fraction?: string;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_2 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof QueryValidatorSlashesResponse>]: never; }>(base?: I): QueryValidatorSlashesResponse;
    fromPartial<I_1 extends {
        slashes?: {
            validatorPeriod?: number;
            fraction?: string;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        slashes?: {
            validatorPeriod?: number;
            fraction?: string;
        }[] & ({
            validatorPeriod?: number;
            fraction?: string;
        } & {
            validatorPeriod?: number;
            fraction?: string;
        } & { [K_4 in Exclude<keyof I_1["slashes"][number], keyof ValidatorSlashEvent>]: never; })[] & { [K_5 in Exclude<keyof I_1["slashes"], keyof {
            validatorPeriod?: number;
            fraction?: string;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_6 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof QueryValidatorSlashesResponse>]: never; }>(object: I_1): QueryValidatorSlashesResponse;
};
export declare const QueryDelegationRewardsRequest: {
    encode(message: QueryDelegationRewardsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDelegationRewardsRequest;
    fromJSON(object: any): QueryDelegationRewardsRequest;
    toJSON(message: QueryDelegationRewardsRequest): unknown;
    create<I extends {
        delegatorAddress?: string;
        validatorAddress?: string;
    } & {
        delegatorAddress?: string;
        validatorAddress?: string;
    } & { [K in Exclude<keyof I, keyof QueryDelegationRewardsRequest>]: never; }>(base?: I): QueryDelegationRewardsRequest;
    fromPartial<I_1 extends {
        delegatorAddress?: string;
        validatorAddress?: string;
    } & {
        delegatorAddress?: string;
        validatorAddress?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof QueryDelegationRewardsRequest>]: never; }>(object: I_1): QueryDelegationRewardsRequest;
};
export declare const QueryDelegationRewardsResponse: {
    encode(message: QueryDelegationRewardsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDelegationRewardsResponse;
    fromJSON(object: any): QueryDelegationRewardsResponse;
    toJSON(message: QueryDelegationRewardsResponse): unknown;
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
    } & { [K_2 in Exclude<keyof I, "rewards">]: never; }>(base?: I): QueryDelegationRewardsResponse;
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
    } & { [K_5 in Exclude<keyof I_1, "rewards">]: never; }>(object: I_1): QueryDelegationRewardsResponse;
};
export declare const QueryDelegationTotalRewardsRequest: {
    encode(message: QueryDelegationTotalRewardsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDelegationTotalRewardsRequest;
    fromJSON(object: any): QueryDelegationTotalRewardsRequest;
    toJSON(message: QueryDelegationTotalRewardsRequest): unknown;
    create<I extends {
        delegatorAddress?: string;
    } & {
        delegatorAddress?: string;
    } & { [K in Exclude<keyof I, "delegatorAddress">]: never; }>(base?: I): QueryDelegationTotalRewardsRequest;
    fromPartial<I_1 extends {
        delegatorAddress?: string;
    } & {
        delegatorAddress?: string;
    } & { [K_1 in Exclude<keyof I_1, "delegatorAddress">]: never; }>(object: I_1): QueryDelegationTotalRewardsRequest;
};
export declare const QueryDelegationTotalRewardsResponse: {
    encode(message: QueryDelegationTotalRewardsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDelegationTotalRewardsResponse;
    fromJSON(object: any): QueryDelegationTotalRewardsResponse;
    toJSON(message: QueryDelegationTotalRewardsResponse): unknown;
    create<I extends {
        rewards?: {
            validatorAddress?: string;
            reward?: {
                denom?: string;
                amount?: string;
            }[];
        }[];
        total?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        rewards?: {
            validatorAddress?: string;
            reward?: {
                denom?: string;
                amount?: string;
            }[];
        }[] & ({
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
            } & { [K in Exclude<keyof I["rewards"][number]["reward"][number], keyof DecCoin>]: never; })[] & { [K_1 in Exclude<keyof I["rewards"][number]["reward"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
        } & { [K_2 in Exclude<keyof I["rewards"][number], keyof DelegationDelegatorReward>]: never; })[] & { [K_3 in Exclude<keyof I["rewards"], keyof {
            validatorAddress?: string;
            reward?: {
                denom?: string;
                amount?: string;
            }[];
        }[]>]: never; };
        total?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_4 in Exclude<keyof I["total"][number], keyof DecCoin>]: never; })[] & { [K_5 in Exclude<keyof I["total"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_6 in Exclude<keyof I, keyof QueryDelegationTotalRewardsResponse>]: never; }>(base?: I): QueryDelegationTotalRewardsResponse;
    fromPartial<I_1 extends {
        rewards?: {
            validatorAddress?: string;
            reward?: {
                denom?: string;
                amount?: string;
            }[];
        }[];
        total?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        rewards?: {
            validatorAddress?: string;
            reward?: {
                denom?: string;
                amount?: string;
            }[];
        }[] & ({
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
            } & { [K_7 in Exclude<keyof I_1["rewards"][number]["reward"][number], keyof DecCoin>]: never; })[] & { [K_8 in Exclude<keyof I_1["rewards"][number]["reward"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
        } & { [K_9 in Exclude<keyof I_1["rewards"][number], keyof DelegationDelegatorReward>]: never; })[] & { [K_10 in Exclude<keyof I_1["rewards"], keyof {
            validatorAddress?: string;
            reward?: {
                denom?: string;
                amount?: string;
            }[];
        }[]>]: never; };
        total?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_11 in Exclude<keyof I_1["total"][number], keyof DecCoin>]: never; })[] & { [K_12 in Exclude<keyof I_1["total"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_13 in Exclude<keyof I_1, keyof QueryDelegationTotalRewardsResponse>]: never; }>(object: I_1): QueryDelegationTotalRewardsResponse;
};
export declare const QueryDelegatorValidatorsRequest: {
    encode(message: QueryDelegatorValidatorsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDelegatorValidatorsRequest;
    fromJSON(object: any): QueryDelegatorValidatorsRequest;
    toJSON(message: QueryDelegatorValidatorsRequest): unknown;
    create<I extends {
        delegatorAddress?: string;
    } & {
        delegatorAddress?: string;
    } & { [K in Exclude<keyof I, "delegatorAddress">]: never; }>(base?: I): QueryDelegatorValidatorsRequest;
    fromPartial<I_1 extends {
        delegatorAddress?: string;
    } & {
        delegatorAddress?: string;
    } & { [K_1 in Exclude<keyof I_1, "delegatorAddress">]: never; }>(object: I_1): QueryDelegatorValidatorsRequest;
};
export declare const QueryDelegatorValidatorsResponse: {
    encode(message: QueryDelegatorValidatorsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDelegatorValidatorsResponse;
    fromJSON(object: any): QueryDelegatorValidatorsResponse;
    toJSON(message: QueryDelegatorValidatorsResponse): unknown;
    create<I extends {
        validators?: string[];
    } & {
        validators?: string[] & string[] & { [K in Exclude<keyof I["validators"], keyof string[]>]: never; };
    } & { [K_1 in Exclude<keyof I, "validators">]: never; }>(base?: I): QueryDelegatorValidatorsResponse;
    fromPartial<I_1 extends {
        validators?: string[];
    } & {
        validators?: string[] & string[] & { [K_2 in Exclude<keyof I_1["validators"], keyof string[]>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "validators">]: never; }>(object: I_1): QueryDelegatorValidatorsResponse;
};
export declare const QueryDelegatorWithdrawAddressRequest: {
    encode(message: QueryDelegatorWithdrawAddressRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDelegatorWithdrawAddressRequest;
    fromJSON(object: any): QueryDelegatorWithdrawAddressRequest;
    toJSON(message: QueryDelegatorWithdrawAddressRequest): unknown;
    create<I extends {
        delegatorAddress?: string;
    } & {
        delegatorAddress?: string;
    } & { [K in Exclude<keyof I, "delegatorAddress">]: never; }>(base?: I): QueryDelegatorWithdrawAddressRequest;
    fromPartial<I_1 extends {
        delegatorAddress?: string;
    } & {
        delegatorAddress?: string;
    } & { [K_1 in Exclude<keyof I_1, "delegatorAddress">]: never; }>(object: I_1): QueryDelegatorWithdrawAddressRequest;
};
export declare const QueryDelegatorWithdrawAddressResponse: {
    encode(message: QueryDelegatorWithdrawAddressResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDelegatorWithdrawAddressResponse;
    fromJSON(object: any): QueryDelegatorWithdrawAddressResponse;
    toJSON(message: QueryDelegatorWithdrawAddressResponse): unknown;
    create<I extends {
        withdrawAddress?: string;
    } & {
        withdrawAddress?: string;
    } & { [K in Exclude<keyof I, "withdrawAddress">]: never; }>(base?: I): QueryDelegatorWithdrawAddressResponse;
    fromPartial<I_1 extends {
        withdrawAddress?: string;
    } & {
        withdrawAddress?: string;
    } & { [K_1 in Exclude<keyof I_1, "withdrawAddress">]: never; }>(object: I_1): QueryDelegatorWithdrawAddressResponse;
};
export declare const QueryCommunityPoolRequest: {
    encode(_: QueryCommunityPoolRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryCommunityPoolRequest;
    fromJSON(_: any): QueryCommunityPoolRequest;
    toJSON(_: QueryCommunityPoolRequest): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): QueryCommunityPoolRequest;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): QueryCommunityPoolRequest;
};
export declare const QueryCommunityPoolResponse: {
    encode(message: QueryCommunityPoolResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryCommunityPoolResponse;
    fromJSON(object: any): QueryCommunityPoolResponse;
    toJSON(message: QueryCommunityPoolResponse): unknown;
    create<I extends {
        pool?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        pool?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["pool"][number], keyof DecCoin>]: never; })[] & { [K_1 in Exclude<keyof I["pool"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, "pool">]: never; }>(base?: I): QueryCommunityPoolResponse;
    fromPartial<I_1 extends {
        pool?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        pool?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_3 in Exclude<keyof I_1["pool"][number], keyof DecCoin>]: never; })[] & { [K_4 in Exclude<keyof I_1["pool"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, "pool">]: never; }>(object: I_1): QueryCommunityPoolResponse;
};
/** Query defines the gRPC querier service for distribution module. */
export interface Query {
    /** Params queries params of the distribution module. */
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    /** ValidatorDistributionInfo queries validator commission and self-delegation rewards for validator */
    ValidatorDistributionInfo(request: QueryValidatorDistributionInfoRequest): Promise<QueryValidatorDistributionInfoResponse>;
    /** ValidatorOutstandingRewards queries rewards of a validator address. */
    ValidatorOutstandingRewards(request: QueryValidatorOutstandingRewardsRequest): Promise<QueryValidatorOutstandingRewardsResponse>;
    /** ValidatorCommission queries accumulated commission for a validator. */
    ValidatorCommission(request: QueryValidatorCommissionRequest): Promise<QueryValidatorCommissionResponse>;
    /** ValidatorSlashes queries slash events of a validator. */
    ValidatorSlashes(request: QueryValidatorSlashesRequest): Promise<QueryValidatorSlashesResponse>;
    /** DelegationRewards queries the total rewards accrued by a delegation. */
    DelegationRewards(request: QueryDelegationRewardsRequest): Promise<QueryDelegationRewardsResponse>;
    /**
     * DelegationTotalRewards queries the total rewards accrued by each
     * validator.
     */
    DelegationTotalRewards(request: QueryDelegationTotalRewardsRequest): Promise<QueryDelegationTotalRewardsResponse>;
    /** DelegatorValidators queries the validators of a delegator. */
    DelegatorValidators(request: QueryDelegatorValidatorsRequest): Promise<QueryDelegatorValidatorsResponse>;
    /** DelegatorWithdrawAddress queries withdraw address of a delegator. */
    DelegatorWithdrawAddress(request: QueryDelegatorWithdrawAddressRequest): Promise<QueryDelegatorWithdrawAddressResponse>;
    /** CommunityPool queries the community pool coins. */
    CommunityPool(request: QueryCommunityPoolRequest): Promise<QueryCommunityPoolResponse>;
}
export declare const QueryServiceName = "cosmos.distribution.v1beta1.Query";
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    ValidatorDistributionInfo(request: QueryValidatorDistributionInfoRequest): Promise<QueryValidatorDistributionInfoResponse>;
    ValidatorOutstandingRewards(request: QueryValidatorOutstandingRewardsRequest): Promise<QueryValidatorOutstandingRewardsResponse>;
    ValidatorCommission(request: QueryValidatorCommissionRequest): Promise<QueryValidatorCommissionResponse>;
    ValidatorSlashes(request: QueryValidatorSlashesRequest): Promise<QueryValidatorSlashesResponse>;
    DelegationRewards(request: QueryDelegationRewardsRequest): Promise<QueryDelegationRewardsResponse>;
    DelegationTotalRewards(request: QueryDelegationTotalRewardsRequest): Promise<QueryDelegationTotalRewardsResponse>;
    DelegatorValidators(request: QueryDelegatorValidatorsRequest): Promise<QueryDelegatorValidatorsResponse>;
    DelegatorWithdrawAddress(request: QueryDelegatorWithdrawAddressRequest): Promise<QueryDelegatorWithdrawAddressResponse>;
    CommunityPool(request: QueryCommunityPoolRequest): Promise<QueryCommunityPoolResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
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
