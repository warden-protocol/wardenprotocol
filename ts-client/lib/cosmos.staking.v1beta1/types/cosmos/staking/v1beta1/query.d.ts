import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
import { DelegationResponse, HistoricalInfo, Params, Pool, RedelegationResponse, UnbondingDelegation, Validator } from "./staking";
export declare const protobufPackage = "cosmos.staking.v1beta1";
/** QueryValidatorsRequest is request type for Query/Validators RPC method. */
export interface QueryValidatorsRequest {
    /** status enables to query for validators matching a given status. */
    status: string;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/** QueryValidatorsResponse is response type for the Query/Validators RPC method */
export interface QueryValidatorsResponse {
    /** validators contains all the queried validators. */
    validators: Validator[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/** QueryValidatorRequest is response type for the Query/Validator RPC method */
export interface QueryValidatorRequest {
    /** validator_addr defines the validator address to query for. */
    validatorAddr: string;
}
/** QueryValidatorResponse is response type for the Query/Validator RPC method */
export interface QueryValidatorResponse {
    /** validator defines the validator info. */
    validator: Validator | undefined;
}
/**
 * QueryValidatorDelegationsRequest is request type for the
 * Query/ValidatorDelegations RPC method
 */
export interface QueryValidatorDelegationsRequest {
    /** validator_addr defines the validator address to query for. */
    validatorAddr: string;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/**
 * QueryValidatorDelegationsResponse is response type for the
 * Query/ValidatorDelegations RPC method
 */
export interface QueryValidatorDelegationsResponse {
    delegationResponses: DelegationResponse[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/**
 * QueryValidatorUnbondingDelegationsRequest is required type for the
 * Query/ValidatorUnbondingDelegations RPC method
 */
export interface QueryValidatorUnbondingDelegationsRequest {
    /** validator_addr defines the validator address to query for. */
    validatorAddr: string;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/**
 * QueryValidatorUnbondingDelegationsResponse is response type for the
 * Query/ValidatorUnbondingDelegations RPC method.
 */
export interface QueryValidatorUnbondingDelegationsResponse {
    unbondingResponses: UnbondingDelegation[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/** QueryDelegationRequest is request type for the Query/Delegation RPC method. */
export interface QueryDelegationRequest {
    /** delegator_addr defines the delegator address to query for. */
    delegatorAddr: string;
    /** validator_addr defines the validator address to query for. */
    validatorAddr: string;
}
/** QueryDelegationResponse is response type for the Query/Delegation RPC method. */
export interface QueryDelegationResponse {
    /** delegation_responses defines the delegation info of a delegation. */
    delegationResponse: DelegationResponse | undefined;
}
/**
 * QueryUnbondingDelegationRequest is request type for the
 * Query/UnbondingDelegation RPC method.
 */
export interface QueryUnbondingDelegationRequest {
    /** delegator_addr defines the delegator address to query for. */
    delegatorAddr: string;
    /** validator_addr defines the validator address to query for. */
    validatorAddr: string;
}
/**
 * QueryDelegationResponse is response type for the Query/UnbondingDelegation
 * RPC method.
 */
export interface QueryUnbondingDelegationResponse {
    /** unbond defines the unbonding information of a delegation. */
    unbond: UnbondingDelegation | undefined;
}
/**
 * QueryDelegatorDelegationsRequest is request type for the
 * Query/DelegatorDelegations RPC method.
 */
export interface QueryDelegatorDelegationsRequest {
    /** delegator_addr defines the delegator address to query for. */
    delegatorAddr: string;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/**
 * QueryDelegatorDelegationsResponse is response type for the
 * Query/DelegatorDelegations RPC method.
 */
export interface QueryDelegatorDelegationsResponse {
    /** delegation_responses defines all the delegations' info of a delegator. */
    delegationResponses: DelegationResponse[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/**
 * QueryDelegatorUnbondingDelegationsRequest is request type for the
 * Query/DelegatorUnbondingDelegations RPC method.
 */
export interface QueryDelegatorUnbondingDelegationsRequest {
    /** delegator_addr defines the delegator address to query for. */
    delegatorAddr: string;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/**
 * QueryUnbondingDelegatorDelegationsResponse is response type for the
 * Query/UnbondingDelegatorDelegations RPC method.
 */
export interface QueryDelegatorUnbondingDelegationsResponse {
    unbondingResponses: UnbondingDelegation[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/**
 * QueryRedelegationsRequest is request type for the Query/Redelegations RPC
 * method.
 */
export interface QueryRedelegationsRequest {
    /** delegator_addr defines the delegator address to query for. */
    delegatorAddr: string;
    /** src_validator_addr defines the validator address to redelegate from. */
    srcValidatorAddr: string;
    /** dst_validator_addr defines the validator address to redelegate to. */
    dstValidatorAddr: string;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/**
 * QueryRedelegationsResponse is response type for the Query/Redelegations RPC
 * method.
 */
export interface QueryRedelegationsResponse {
    redelegationResponses: RedelegationResponse[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/**
 * QueryDelegatorValidatorsRequest is request type for the
 * Query/DelegatorValidators RPC method.
 */
export interface QueryDelegatorValidatorsRequest {
    /** delegator_addr defines the delegator address to query for. */
    delegatorAddr: string;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/**
 * QueryDelegatorValidatorsResponse is response type for the
 * Query/DelegatorValidators RPC method.
 */
export interface QueryDelegatorValidatorsResponse {
    /** validators defines the validators' info of a delegator. */
    validators: Validator[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/**
 * QueryDelegatorValidatorRequest is request type for the
 * Query/DelegatorValidator RPC method.
 */
export interface QueryDelegatorValidatorRequest {
    /** delegator_addr defines the delegator address to query for. */
    delegatorAddr: string;
    /** validator_addr defines the validator address to query for. */
    validatorAddr: string;
}
/**
 * QueryDelegatorValidatorResponse response type for the
 * Query/DelegatorValidator RPC method.
 */
export interface QueryDelegatorValidatorResponse {
    /** validator defines the validator info. */
    validator: Validator | undefined;
}
/**
 * QueryHistoricalInfoRequest is request type for the Query/HistoricalInfo RPC
 * method.
 */
export interface QueryHistoricalInfoRequest {
    /** height defines at which height to query the historical info. */
    height: number;
}
/**
 * QueryHistoricalInfoResponse is response type for the Query/HistoricalInfo RPC
 * method.
 */
export interface QueryHistoricalInfoResponse {
    /** hist defines the historical info at the given height. */
    hist: HistoricalInfo | undefined;
}
/** QueryPoolRequest is request type for the Query/Pool RPC method. */
export interface QueryPoolRequest {
}
/** QueryPoolResponse is response type for the Query/Pool RPC method. */
export interface QueryPoolResponse {
    /** pool defines the pool info. */
    pool: Pool | undefined;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
    /** params holds all the parameters of this module. */
    params: Params | undefined;
}
export declare const QueryValidatorsRequest: {
    encode(message: QueryValidatorsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryValidatorsRequest;
    fromJSON(object: any): QueryValidatorsRequest;
    toJSON(message: QueryValidatorsRequest): unknown;
    create<I extends {
        status?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        status?: string;
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
    } & { [K_1 in Exclude<keyof I, keyof QueryValidatorsRequest>]: never; }>(base?: I): QueryValidatorsRequest;
    fromPartial<I_1 extends {
        status?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        status?: string;
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
    } & { [K_3 in Exclude<keyof I_1, keyof QueryValidatorsRequest>]: never; }>(object: I_1): QueryValidatorsRequest;
};
export declare const QueryValidatorsResponse: {
    encode(message: QueryValidatorsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryValidatorsResponse;
    fromJSON(object: any): QueryValidatorsResponse;
    toJSON(message: QueryValidatorsResponse): unknown;
    create<I extends {
        validators?: {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        validators?: {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        }[] & ({
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        } & {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K in Exclude<keyof I["validators"][number]["consensusPubkey"], keyof import("../../../google/protobuf/any").Any>]: never; };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            } & {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            } & { [K_1 in Exclude<keyof I["validators"][number]["description"], keyof import("./staking").Description>]: never; };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            } & {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                } & {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                } & { [K_2 in Exclude<keyof I["validators"][number]["commission"]["commissionRates"], keyof import("./staking").CommissionRates>]: never; };
                updateTime?: Date;
            } & { [K_3 in Exclude<keyof I["validators"][number]["commission"], keyof import("./staking").Commission>]: never; };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[] & number[] & { [K_4 in Exclude<keyof I["validators"][number]["unbondingIds"], keyof number[]>]: never; };
        } & { [K_5 in Exclude<keyof I["validators"][number], keyof Validator>]: never; })[] & { [K_6 in Exclude<keyof I["validators"], keyof {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_7 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_8 in Exclude<keyof I, keyof QueryValidatorsResponse>]: never; }>(base?: I): QueryValidatorsResponse;
    fromPartial<I_1 extends {
        validators?: {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        validators?: {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        }[] & ({
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        } & {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_9 in Exclude<keyof I_1["validators"][number]["consensusPubkey"], keyof import("../../../google/protobuf/any").Any>]: never; };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            } & {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            } & { [K_10 in Exclude<keyof I_1["validators"][number]["description"], keyof import("./staking").Description>]: never; };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            } & {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                } & {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                } & { [K_11 in Exclude<keyof I_1["validators"][number]["commission"]["commissionRates"], keyof import("./staking").CommissionRates>]: never; };
                updateTime?: Date;
            } & { [K_12 in Exclude<keyof I_1["validators"][number]["commission"], keyof import("./staking").Commission>]: never; };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[] & number[] & { [K_13 in Exclude<keyof I_1["validators"][number]["unbondingIds"], keyof number[]>]: never; };
        } & { [K_14 in Exclude<keyof I_1["validators"][number], keyof Validator>]: never; })[] & { [K_15 in Exclude<keyof I_1["validators"], keyof {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_16 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_17 in Exclude<keyof I_1, keyof QueryValidatorsResponse>]: never; }>(object: I_1): QueryValidatorsResponse;
};
export declare const QueryValidatorRequest: {
    encode(message: QueryValidatorRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryValidatorRequest;
    fromJSON(object: any): QueryValidatorRequest;
    toJSON(message: QueryValidatorRequest): unknown;
    create<I extends {
        validatorAddr?: string;
    } & {
        validatorAddr?: string;
    } & { [K in Exclude<keyof I, "validatorAddr">]: never; }>(base?: I): QueryValidatorRequest;
    fromPartial<I_1 extends {
        validatorAddr?: string;
    } & {
        validatorAddr?: string;
    } & { [K_1 in Exclude<keyof I_1, "validatorAddr">]: never; }>(object: I_1): QueryValidatorRequest;
};
export declare const QueryValidatorResponse: {
    encode(message: QueryValidatorResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryValidatorResponse;
    fromJSON(object: any): QueryValidatorResponse;
    toJSON(message: QueryValidatorResponse): unknown;
    create<I extends {
        validator?: {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        };
    } & {
        validator?: {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        } & {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K in Exclude<keyof I["validator"]["consensusPubkey"], keyof import("../../../google/protobuf/any").Any>]: never; };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            } & {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            } & { [K_1 in Exclude<keyof I["validator"]["description"], keyof import("./staking").Description>]: never; };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            } & {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                } & {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                } & { [K_2 in Exclude<keyof I["validator"]["commission"]["commissionRates"], keyof import("./staking").CommissionRates>]: never; };
                updateTime?: Date;
            } & { [K_3 in Exclude<keyof I["validator"]["commission"], keyof import("./staking").Commission>]: never; };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[] & number[] & { [K_4 in Exclude<keyof I["validator"]["unbondingIds"], keyof number[]>]: never; };
        } & { [K_5 in Exclude<keyof I["validator"], keyof Validator>]: never; };
    } & { [K_6 in Exclude<keyof I, "validator">]: never; }>(base?: I): QueryValidatorResponse;
    fromPartial<I_1 extends {
        validator?: {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        };
    } & {
        validator?: {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        } & {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_7 in Exclude<keyof I_1["validator"]["consensusPubkey"], keyof import("../../../google/protobuf/any").Any>]: never; };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            } & {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            } & { [K_8 in Exclude<keyof I_1["validator"]["description"], keyof import("./staking").Description>]: never; };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            } & {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                } & {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                } & { [K_9 in Exclude<keyof I_1["validator"]["commission"]["commissionRates"], keyof import("./staking").CommissionRates>]: never; };
                updateTime?: Date;
            } & { [K_10 in Exclude<keyof I_1["validator"]["commission"], keyof import("./staking").Commission>]: never; };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[] & number[] & { [K_11 in Exclude<keyof I_1["validator"]["unbondingIds"], keyof number[]>]: never; };
        } & { [K_12 in Exclude<keyof I_1["validator"], keyof Validator>]: never; };
    } & { [K_13 in Exclude<keyof I_1, "validator">]: never; }>(object: I_1): QueryValidatorResponse;
};
export declare const QueryValidatorDelegationsRequest: {
    encode(message: QueryValidatorDelegationsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryValidatorDelegationsRequest;
    fromJSON(object: any): QueryValidatorDelegationsRequest;
    toJSON(message: QueryValidatorDelegationsRequest): unknown;
    create<I extends {
        validatorAddr?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        validatorAddr?: string;
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
    } & { [K_1 in Exclude<keyof I, keyof QueryValidatorDelegationsRequest>]: never; }>(base?: I): QueryValidatorDelegationsRequest;
    fromPartial<I_1 extends {
        validatorAddr?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        validatorAddr?: string;
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
    } & { [K_3 in Exclude<keyof I_1, keyof QueryValidatorDelegationsRequest>]: never; }>(object: I_1): QueryValidatorDelegationsRequest;
};
export declare const QueryValidatorDelegationsResponse: {
    encode(message: QueryValidatorDelegationsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryValidatorDelegationsResponse;
    fromJSON(object: any): QueryValidatorDelegationsResponse;
    toJSON(message: QueryValidatorDelegationsResponse): unknown;
    create<I extends {
        delegationResponses?: {
            delegation?: {
                delegatorAddress?: string;
                validatorAddress?: string;
                shares?: string;
            };
            balance?: {
                denom?: string;
                amount?: string;
            };
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        delegationResponses?: {
            delegation?: {
                delegatorAddress?: string;
                validatorAddress?: string;
                shares?: string;
            };
            balance?: {
                denom?: string;
                amount?: string;
            };
        }[] & ({
            delegation?: {
                delegatorAddress?: string;
                validatorAddress?: string;
                shares?: string;
            };
            balance?: {
                denom?: string;
                amount?: string;
            };
        } & {
            delegation?: {
                delegatorAddress?: string;
                validatorAddress?: string;
                shares?: string;
            } & {
                delegatorAddress?: string;
                validatorAddress?: string;
                shares?: string;
            } & { [K in Exclude<keyof I["delegationResponses"][number]["delegation"], keyof import("./staking").Delegation>]: never; };
            balance?: {
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_1 in Exclude<keyof I["delegationResponses"][number]["balance"], keyof import("../../base/v1beta1/coin").Coin>]: never; };
        } & { [K_2 in Exclude<keyof I["delegationResponses"][number], keyof DelegationResponse>]: never; })[] & { [K_3 in Exclude<keyof I["delegationResponses"], keyof {
            delegation?: {
                delegatorAddress?: string;
                validatorAddress?: string;
                shares?: string;
            };
            balance?: {
                denom?: string;
                amount?: string;
            };
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_4 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_5 in Exclude<keyof I, keyof QueryValidatorDelegationsResponse>]: never; }>(base?: I): QueryValidatorDelegationsResponse;
    fromPartial<I_1 extends {
        delegationResponses?: {
            delegation?: {
                delegatorAddress?: string;
                validatorAddress?: string;
                shares?: string;
            };
            balance?: {
                denom?: string;
                amount?: string;
            };
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        delegationResponses?: {
            delegation?: {
                delegatorAddress?: string;
                validatorAddress?: string;
                shares?: string;
            };
            balance?: {
                denom?: string;
                amount?: string;
            };
        }[] & ({
            delegation?: {
                delegatorAddress?: string;
                validatorAddress?: string;
                shares?: string;
            };
            balance?: {
                denom?: string;
                amount?: string;
            };
        } & {
            delegation?: {
                delegatorAddress?: string;
                validatorAddress?: string;
                shares?: string;
            } & {
                delegatorAddress?: string;
                validatorAddress?: string;
                shares?: string;
            } & { [K_6 in Exclude<keyof I_1["delegationResponses"][number]["delegation"], keyof import("./staking").Delegation>]: never; };
            balance?: {
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_7 in Exclude<keyof I_1["delegationResponses"][number]["balance"], keyof import("../../base/v1beta1/coin").Coin>]: never; };
        } & { [K_8 in Exclude<keyof I_1["delegationResponses"][number], keyof DelegationResponse>]: never; })[] & { [K_9 in Exclude<keyof I_1["delegationResponses"], keyof {
            delegation?: {
                delegatorAddress?: string;
                validatorAddress?: string;
                shares?: string;
            };
            balance?: {
                denom?: string;
                amount?: string;
            };
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_10 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_11 in Exclude<keyof I_1, keyof QueryValidatorDelegationsResponse>]: never; }>(object: I_1): QueryValidatorDelegationsResponse;
};
export declare const QueryValidatorUnbondingDelegationsRequest: {
    encode(message: QueryValidatorUnbondingDelegationsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryValidatorUnbondingDelegationsRequest;
    fromJSON(object: any): QueryValidatorUnbondingDelegationsRequest;
    toJSON(message: QueryValidatorUnbondingDelegationsRequest): unknown;
    create<I extends {
        validatorAddr?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        validatorAddr?: string;
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
    } & { [K_1 in Exclude<keyof I, keyof QueryValidatorUnbondingDelegationsRequest>]: never; }>(base?: I): QueryValidatorUnbondingDelegationsRequest;
    fromPartial<I_1 extends {
        validatorAddr?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        validatorAddr?: string;
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
    } & { [K_3 in Exclude<keyof I_1, keyof QueryValidatorUnbondingDelegationsRequest>]: never; }>(object: I_1): QueryValidatorUnbondingDelegationsRequest;
};
export declare const QueryValidatorUnbondingDelegationsResponse: {
    encode(message: QueryValidatorUnbondingDelegationsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryValidatorUnbondingDelegationsResponse;
    fromJSON(object: any): QueryValidatorUnbondingDelegationsResponse;
    toJSON(message: QueryValidatorUnbondingDelegationsResponse): unknown;
    create<I extends {
        unbondingResponses?: {
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        unbondingResponses?: {
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        }[] & ({
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        } & {
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[] & ({
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            } & {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            } & { [K in Exclude<keyof I["unbondingResponses"][number]["entries"][number], keyof import("./staking").UnbondingDelegationEntry>]: never; })[] & { [K_1 in Exclude<keyof I["unbondingResponses"][number]["entries"], keyof {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[]>]: never; };
        } & { [K_2 in Exclude<keyof I["unbondingResponses"][number], keyof UnbondingDelegation>]: never; })[] & { [K_3 in Exclude<keyof I["unbondingResponses"], keyof {
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_4 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_5 in Exclude<keyof I, keyof QueryValidatorUnbondingDelegationsResponse>]: never; }>(base?: I): QueryValidatorUnbondingDelegationsResponse;
    fromPartial<I_1 extends {
        unbondingResponses?: {
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        unbondingResponses?: {
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        }[] & ({
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        } & {
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[] & ({
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            } & {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            } & { [K_6 in Exclude<keyof I_1["unbondingResponses"][number]["entries"][number], keyof import("./staking").UnbondingDelegationEntry>]: never; })[] & { [K_7 in Exclude<keyof I_1["unbondingResponses"][number]["entries"], keyof {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[]>]: never; };
        } & { [K_8 in Exclude<keyof I_1["unbondingResponses"][number], keyof UnbondingDelegation>]: never; })[] & { [K_9 in Exclude<keyof I_1["unbondingResponses"], keyof {
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_10 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_11 in Exclude<keyof I_1, keyof QueryValidatorUnbondingDelegationsResponse>]: never; }>(object: I_1): QueryValidatorUnbondingDelegationsResponse;
};
export declare const QueryDelegationRequest: {
    encode(message: QueryDelegationRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDelegationRequest;
    fromJSON(object: any): QueryDelegationRequest;
    toJSON(message: QueryDelegationRequest): unknown;
    create<I extends {
        delegatorAddr?: string;
        validatorAddr?: string;
    } & {
        delegatorAddr?: string;
        validatorAddr?: string;
    } & { [K in Exclude<keyof I, keyof QueryDelegationRequest>]: never; }>(base?: I): QueryDelegationRequest;
    fromPartial<I_1 extends {
        delegatorAddr?: string;
        validatorAddr?: string;
    } & {
        delegatorAddr?: string;
        validatorAddr?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof QueryDelegationRequest>]: never; }>(object: I_1): QueryDelegationRequest;
};
export declare const QueryDelegationResponse: {
    encode(message: QueryDelegationResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDelegationResponse;
    fromJSON(object: any): QueryDelegationResponse;
    toJSON(message: QueryDelegationResponse): unknown;
    create<I extends {
        delegationResponse?: {
            delegation?: {
                delegatorAddress?: string;
                validatorAddress?: string;
                shares?: string;
            };
            balance?: {
                denom?: string;
                amount?: string;
            };
        };
    } & {
        delegationResponse?: {
            delegation?: {
                delegatorAddress?: string;
                validatorAddress?: string;
                shares?: string;
            };
            balance?: {
                denom?: string;
                amount?: string;
            };
        } & {
            delegation?: {
                delegatorAddress?: string;
                validatorAddress?: string;
                shares?: string;
            } & {
                delegatorAddress?: string;
                validatorAddress?: string;
                shares?: string;
            } & { [K in Exclude<keyof I["delegationResponse"]["delegation"], keyof import("./staking").Delegation>]: never; };
            balance?: {
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_1 in Exclude<keyof I["delegationResponse"]["balance"], keyof import("../../base/v1beta1/coin").Coin>]: never; };
        } & { [K_2 in Exclude<keyof I["delegationResponse"], keyof DelegationResponse>]: never; };
    } & { [K_3 in Exclude<keyof I, "delegationResponse">]: never; }>(base?: I): QueryDelegationResponse;
    fromPartial<I_1 extends {
        delegationResponse?: {
            delegation?: {
                delegatorAddress?: string;
                validatorAddress?: string;
                shares?: string;
            };
            balance?: {
                denom?: string;
                amount?: string;
            };
        };
    } & {
        delegationResponse?: {
            delegation?: {
                delegatorAddress?: string;
                validatorAddress?: string;
                shares?: string;
            };
            balance?: {
                denom?: string;
                amount?: string;
            };
        } & {
            delegation?: {
                delegatorAddress?: string;
                validatorAddress?: string;
                shares?: string;
            } & {
                delegatorAddress?: string;
                validatorAddress?: string;
                shares?: string;
            } & { [K_4 in Exclude<keyof I_1["delegationResponse"]["delegation"], keyof import("./staking").Delegation>]: never; };
            balance?: {
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_5 in Exclude<keyof I_1["delegationResponse"]["balance"], keyof import("../../base/v1beta1/coin").Coin>]: never; };
        } & { [K_6 in Exclude<keyof I_1["delegationResponse"], keyof DelegationResponse>]: never; };
    } & { [K_7 in Exclude<keyof I_1, "delegationResponse">]: never; }>(object: I_1): QueryDelegationResponse;
};
export declare const QueryUnbondingDelegationRequest: {
    encode(message: QueryUnbondingDelegationRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryUnbondingDelegationRequest;
    fromJSON(object: any): QueryUnbondingDelegationRequest;
    toJSON(message: QueryUnbondingDelegationRequest): unknown;
    create<I extends {
        delegatorAddr?: string;
        validatorAddr?: string;
    } & {
        delegatorAddr?: string;
        validatorAddr?: string;
    } & { [K in Exclude<keyof I, keyof QueryUnbondingDelegationRequest>]: never; }>(base?: I): QueryUnbondingDelegationRequest;
    fromPartial<I_1 extends {
        delegatorAddr?: string;
        validatorAddr?: string;
    } & {
        delegatorAddr?: string;
        validatorAddr?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof QueryUnbondingDelegationRequest>]: never; }>(object: I_1): QueryUnbondingDelegationRequest;
};
export declare const QueryUnbondingDelegationResponse: {
    encode(message: QueryUnbondingDelegationResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryUnbondingDelegationResponse;
    fromJSON(object: any): QueryUnbondingDelegationResponse;
    toJSON(message: QueryUnbondingDelegationResponse): unknown;
    create<I extends {
        unbond?: {
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        };
    } & {
        unbond?: {
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        } & {
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[] & ({
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            } & {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            } & { [K in Exclude<keyof I["unbond"]["entries"][number], keyof import("./staking").UnbondingDelegationEntry>]: never; })[] & { [K_1 in Exclude<keyof I["unbond"]["entries"], keyof {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[]>]: never; };
        } & { [K_2 in Exclude<keyof I["unbond"], keyof UnbondingDelegation>]: never; };
    } & { [K_3 in Exclude<keyof I, "unbond">]: never; }>(base?: I): QueryUnbondingDelegationResponse;
    fromPartial<I_1 extends {
        unbond?: {
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        };
    } & {
        unbond?: {
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        } & {
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[] & ({
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            } & {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            } & { [K_4 in Exclude<keyof I_1["unbond"]["entries"][number], keyof import("./staking").UnbondingDelegationEntry>]: never; })[] & { [K_5 in Exclude<keyof I_1["unbond"]["entries"], keyof {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[]>]: never; };
        } & { [K_6 in Exclude<keyof I_1["unbond"], keyof UnbondingDelegation>]: never; };
    } & { [K_7 in Exclude<keyof I_1, "unbond">]: never; }>(object: I_1): QueryUnbondingDelegationResponse;
};
export declare const QueryDelegatorDelegationsRequest: {
    encode(message: QueryDelegatorDelegationsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDelegatorDelegationsRequest;
    fromJSON(object: any): QueryDelegatorDelegationsRequest;
    toJSON(message: QueryDelegatorDelegationsRequest): unknown;
    create<I extends {
        delegatorAddr?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        delegatorAddr?: string;
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
    } & { [K_1 in Exclude<keyof I, keyof QueryDelegatorDelegationsRequest>]: never; }>(base?: I): QueryDelegatorDelegationsRequest;
    fromPartial<I_1 extends {
        delegatorAddr?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        delegatorAddr?: string;
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
    } & { [K_3 in Exclude<keyof I_1, keyof QueryDelegatorDelegationsRequest>]: never; }>(object: I_1): QueryDelegatorDelegationsRequest;
};
export declare const QueryDelegatorDelegationsResponse: {
    encode(message: QueryDelegatorDelegationsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDelegatorDelegationsResponse;
    fromJSON(object: any): QueryDelegatorDelegationsResponse;
    toJSON(message: QueryDelegatorDelegationsResponse): unknown;
    create<I extends {
        delegationResponses?: {
            delegation?: {
                delegatorAddress?: string;
                validatorAddress?: string;
                shares?: string;
            };
            balance?: {
                denom?: string;
                amount?: string;
            };
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        delegationResponses?: {
            delegation?: {
                delegatorAddress?: string;
                validatorAddress?: string;
                shares?: string;
            };
            balance?: {
                denom?: string;
                amount?: string;
            };
        }[] & ({
            delegation?: {
                delegatorAddress?: string;
                validatorAddress?: string;
                shares?: string;
            };
            balance?: {
                denom?: string;
                amount?: string;
            };
        } & {
            delegation?: {
                delegatorAddress?: string;
                validatorAddress?: string;
                shares?: string;
            } & {
                delegatorAddress?: string;
                validatorAddress?: string;
                shares?: string;
            } & { [K in Exclude<keyof I["delegationResponses"][number]["delegation"], keyof import("./staking").Delegation>]: never; };
            balance?: {
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_1 in Exclude<keyof I["delegationResponses"][number]["balance"], keyof import("../../base/v1beta1/coin").Coin>]: never; };
        } & { [K_2 in Exclude<keyof I["delegationResponses"][number], keyof DelegationResponse>]: never; })[] & { [K_3 in Exclude<keyof I["delegationResponses"], keyof {
            delegation?: {
                delegatorAddress?: string;
                validatorAddress?: string;
                shares?: string;
            };
            balance?: {
                denom?: string;
                amount?: string;
            };
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_4 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_5 in Exclude<keyof I, keyof QueryDelegatorDelegationsResponse>]: never; }>(base?: I): QueryDelegatorDelegationsResponse;
    fromPartial<I_1 extends {
        delegationResponses?: {
            delegation?: {
                delegatorAddress?: string;
                validatorAddress?: string;
                shares?: string;
            };
            balance?: {
                denom?: string;
                amount?: string;
            };
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        delegationResponses?: {
            delegation?: {
                delegatorAddress?: string;
                validatorAddress?: string;
                shares?: string;
            };
            balance?: {
                denom?: string;
                amount?: string;
            };
        }[] & ({
            delegation?: {
                delegatorAddress?: string;
                validatorAddress?: string;
                shares?: string;
            };
            balance?: {
                denom?: string;
                amount?: string;
            };
        } & {
            delegation?: {
                delegatorAddress?: string;
                validatorAddress?: string;
                shares?: string;
            } & {
                delegatorAddress?: string;
                validatorAddress?: string;
                shares?: string;
            } & { [K_6 in Exclude<keyof I_1["delegationResponses"][number]["delegation"], keyof import("./staking").Delegation>]: never; };
            balance?: {
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_7 in Exclude<keyof I_1["delegationResponses"][number]["balance"], keyof import("../../base/v1beta1/coin").Coin>]: never; };
        } & { [K_8 in Exclude<keyof I_1["delegationResponses"][number], keyof DelegationResponse>]: never; })[] & { [K_9 in Exclude<keyof I_1["delegationResponses"], keyof {
            delegation?: {
                delegatorAddress?: string;
                validatorAddress?: string;
                shares?: string;
            };
            balance?: {
                denom?: string;
                amount?: string;
            };
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_10 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_11 in Exclude<keyof I_1, keyof QueryDelegatorDelegationsResponse>]: never; }>(object: I_1): QueryDelegatorDelegationsResponse;
};
export declare const QueryDelegatorUnbondingDelegationsRequest: {
    encode(message: QueryDelegatorUnbondingDelegationsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDelegatorUnbondingDelegationsRequest;
    fromJSON(object: any): QueryDelegatorUnbondingDelegationsRequest;
    toJSON(message: QueryDelegatorUnbondingDelegationsRequest): unknown;
    create<I extends {
        delegatorAddr?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        delegatorAddr?: string;
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
    } & { [K_1 in Exclude<keyof I, keyof QueryDelegatorUnbondingDelegationsRequest>]: never; }>(base?: I): QueryDelegatorUnbondingDelegationsRequest;
    fromPartial<I_1 extends {
        delegatorAddr?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        delegatorAddr?: string;
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
    } & { [K_3 in Exclude<keyof I_1, keyof QueryDelegatorUnbondingDelegationsRequest>]: never; }>(object: I_1): QueryDelegatorUnbondingDelegationsRequest;
};
export declare const QueryDelegatorUnbondingDelegationsResponse: {
    encode(message: QueryDelegatorUnbondingDelegationsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDelegatorUnbondingDelegationsResponse;
    fromJSON(object: any): QueryDelegatorUnbondingDelegationsResponse;
    toJSON(message: QueryDelegatorUnbondingDelegationsResponse): unknown;
    create<I extends {
        unbondingResponses?: {
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        unbondingResponses?: {
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        }[] & ({
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        } & {
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[] & ({
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            } & {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            } & { [K in Exclude<keyof I["unbondingResponses"][number]["entries"][number], keyof import("./staking").UnbondingDelegationEntry>]: never; })[] & { [K_1 in Exclude<keyof I["unbondingResponses"][number]["entries"], keyof {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[]>]: never; };
        } & { [K_2 in Exclude<keyof I["unbondingResponses"][number], keyof UnbondingDelegation>]: never; })[] & { [K_3 in Exclude<keyof I["unbondingResponses"], keyof {
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_4 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_5 in Exclude<keyof I, keyof QueryDelegatorUnbondingDelegationsResponse>]: never; }>(base?: I): QueryDelegatorUnbondingDelegationsResponse;
    fromPartial<I_1 extends {
        unbondingResponses?: {
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        unbondingResponses?: {
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        }[] & ({
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        } & {
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[] & ({
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            } & {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            } & { [K_6 in Exclude<keyof I_1["unbondingResponses"][number]["entries"][number], keyof import("./staking").UnbondingDelegationEntry>]: never; })[] & { [K_7 in Exclude<keyof I_1["unbondingResponses"][number]["entries"], keyof {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[]>]: never; };
        } & { [K_8 in Exclude<keyof I_1["unbondingResponses"][number], keyof UnbondingDelegation>]: never; })[] & { [K_9 in Exclude<keyof I_1["unbondingResponses"], keyof {
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_10 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_11 in Exclude<keyof I_1, keyof QueryDelegatorUnbondingDelegationsResponse>]: never; }>(object: I_1): QueryDelegatorUnbondingDelegationsResponse;
};
export declare const QueryRedelegationsRequest: {
    encode(message: QueryRedelegationsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryRedelegationsRequest;
    fromJSON(object: any): QueryRedelegationsRequest;
    toJSON(message: QueryRedelegationsRequest): unknown;
    create<I extends {
        delegatorAddr?: string;
        srcValidatorAddr?: string;
        dstValidatorAddr?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        delegatorAddr?: string;
        srcValidatorAddr?: string;
        dstValidatorAddr?: string;
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
    } & { [K_1 in Exclude<keyof I, keyof QueryRedelegationsRequest>]: never; }>(base?: I): QueryRedelegationsRequest;
    fromPartial<I_1 extends {
        delegatorAddr?: string;
        srcValidatorAddr?: string;
        dstValidatorAddr?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        delegatorAddr?: string;
        srcValidatorAddr?: string;
        dstValidatorAddr?: string;
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
    } & { [K_3 in Exclude<keyof I_1, keyof QueryRedelegationsRequest>]: never; }>(object: I_1): QueryRedelegationsRequest;
};
export declare const QueryRedelegationsResponse: {
    encode(message: QueryRedelegationsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryRedelegationsResponse;
    fromJSON(object: any): QueryRedelegationsResponse;
    toJSON(message: QueryRedelegationsResponse): unknown;
    create<I extends {
        redelegationResponses?: {
            redelegation?: {
                delegatorAddress?: string;
                validatorSrcAddress?: string;
                validatorDstAddress?: string;
                entries?: {
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                }[];
            };
            entries?: {
                redelegationEntry?: {
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                };
                balance?: string;
            }[];
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        redelegationResponses?: {
            redelegation?: {
                delegatorAddress?: string;
                validatorSrcAddress?: string;
                validatorDstAddress?: string;
                entries?: {
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                }[];
            };
            entries?: {
                redelegationEntry?: {
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                };
                balance?: string;
            }[];
        }[] & ({
            redelegation?: {
                delegatorAddress?: string;
                validatorSrcAddress?: string;
                validatorDstAddress?: string;
                entries?: {
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                }[];
            };
            entries?: {
                redelegationEntry?: {
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                };
                balance?: string;
            }[];
        } & {
            redelegation?: {
                delegatorAddress?: string;
                validatorSrcAddress?: string;
                validatorDstAddress?: string;
                entries?: {
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                }[];
            } & {
                delegatorAddress?: string;
                validatorSrcAddress?: string;
                validatorDstAddress?: string;
                entries?: {
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                }[] & ({
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                } & {
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                } & { [K in Exclude<keyof I["redelegationResponses"][number]["redelegation"]["entries"][number], keyof import("./staking").RedelegationEntry>]: never; })[] & { [K_1 in Exclude<keyof I["redelegationResponses"][number]["redelegation"]["entries"], keyof {
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                }[]>]: never; };
            } & { [K_2 in Exclude<keyof I["redelegationResponses"][number]["redelegation"], keyof import("./staking").Redelegation>]: never; };
            entries?: {
                redelegationEntry?: {
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                };
                balance?: string;
            }[] & ({
                redelegationEntry?: {
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                };
                balance?: string;
            } & {
                redelegationEntry?: {
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                } & {
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                } & { [K_3 in Exclude<keyof I["redelegationResponses"][number]["entries"][number]["redelegationEntry"], keyof import("./staking").RedelegationEntry>]: never; };
                balance?: string;
            } & { [K_4 in Exclude<keyof I["redelegationResponses"][number]["entries"][number], keyof import("./staking").RedelegationEntryResponse>]: never; })[] & { [K_5 in Exclude<keyof I["redelegationResponses"][number]["entries"], keyof {
                redelegationEntry?: {
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                };
                balance?: string;
            }[]>]: never; };
        } & { [K_6 in Exclude<keyof I["redelegationResponses"][number], keyof RedelegationResponse>]: never; })[] & { [K_7 in Exclude<keyof I["redelegationResponses"], keyof {
            redelegation?: {
                delegatorAddress?: string;
                validatorSrcAddress?: string;
                validatorDstAddress?: string;
                entries?: {
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                }[];
            };
            entries?: {
                redelegationEntry?: {
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                };
                balance?: string;
            }[];
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_8 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_9 in Exclude<keyof I, keyof QueryRedelegationsResponse>]: never; }>(base?: I): QueryRedelegationsResponse;
    fromPartial<I_1 extends {
        redelegationResponses?: {
            redelegation?: {
                delegatorAddress?: string;
                validatorSrcAddress?: string;
                validatorDstAddress?: string;
                entries?: {
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                }[];
            };
            entries?: {
                redelegationEntry?: {
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                };
                balance?: string;
            }[];
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        redelegationResponses?: {
            redelegation?: {
                delegatorAddress?: string;
                validatorSrcAddress?: string;
                validatorDstAddress?: string;
                entries?: {
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                }[];
            };
            entries?: {
                redelegationEntry?: {
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                };
                balance?: string;
            }[];
        }[] & ({
            redelegation?: {
                delegatorAddress?: string;
                validatorSrcAddress?: string;
                validatorDstAddress?: string;
                entries?: {
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                }[];
            };
            entries?: {
                redelegationEntry?: {
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                };
                balance?: string;
            }[];
        } & {
            redelegation?: {
                delegatorAddress?: string;
                validatorSrcAddress?: string;
                validatorDstAddress?: string;
                entries?: {
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                }[];
            } & {
                delegatorAddress?: string;
                validatorSrcAddress?: string;
                validatorDstAddress?: string;
                entries?: {
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                }[] & ({
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                } & {
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                } & { [K_10 in Exclude<keyof I_1["redelegationResponses"][number]["redelegation"]["entries"][number], keyof import("./staking").RedelegationEntry>]: never; })[] & { [K_11 in Exclude<keyof I_1["redelegationResponses"][number]["redelegation"]["entries"], keyof {
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                }[]>]: never; };
            } & { [K_12 in Exclude<keyof I_1["redelegationResponses"][number]["redelegation"], keyof import("./staking").Redelegation>]: never; };
            entries?: {
                redelegationEntry?: {
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                };
                balance?: string;
            }[] & ({
                redelegationEntry?: {
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                };
                balance?: string;
            } & {
                redelegationEntry?: {
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                } & {
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                } & { [K_13 in Exclude<keyof I_1["redelegationResponses"][number]["entries"][number]["redelegationEntry"], keyof import("./staking").RedelegationEntry>]: never; };
                balance?: string;
            } & { [K_14 in Exclude<keyof I_1["redelegationResponses"][number]["entries"][number], keyof import("./staking").RedelegationEntryResponse>]: never; })[] & { [K_15 in Exclude<keyof I_1["redelegationResponses"][number]["entries"], keyof {
                redelegationEntry?: {
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                };
                balance?: string;
            }[]>]: never; };
        } & { [K_16 in Exclude<keyof I_1["redelegationResponses"][number], keyof RedelegationResponse>]: never; })[] & { [K_17 in Exclude<keyof I_1["redelegationResponses"], keyof {
            redelegation?: {
                delegatorAddress?: string;
                validatorSrcAddress?: string;
                validatorDstAddress?: string;
                entries?: {
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                }[];
            };
            entries?: {
                redelegationEntry?: {
                    creationHeight?: number;
                    completionTime?: Date;
                    initialBalance?: string;
                    sharesDst?: string;
                    unbondingId?: number;
                    unbondingOnHoldRefCount?: number;
                };
                balance?: string;
            }[];
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_18 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_19 in Exclude<keyof I_1, keyof QueryRedelegationsResponse>]: never; }>(object: I_1): QueryRedelegationsResponse;
};
export declare const QueryDelegatorValidatorsRequest: {
    encode(message: QueryDelegatorValidatorsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDelegatorValidatorsRequest;
    fromJSON(object: any): QueryDelegatorValidatorsRequest;
    toJSON(message: QueryDelegatorValidatorsRequest): unknown;
    create<I extends {
        delegatorAddr?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        delegatorAddr?: string;
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
    } & { [K_1 in Exclude<keyof I, keyof QueryDelegatorValidatorsRequest>]: never; }>(base?: I): QueryDelegatorValidatorsRequest;
    fromPartial<I_1 extends {
        delegatorAddr?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        delegatorAddr?: string;
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
    } & { [K_3 in Exclude<keyof I_1, keyof QueryDelegatorValidatorsRequest>]: never; }>(object: I_1): QueryDelegatorValidatorsRequest;
};
export declare const QueryDelegatorValidatorsResponse: {
    encode(message: QueryDelegatorValidatorsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDelegatorValidatorsResponse;
    fromJSON(object: any): QueryDelegatorValidatorsResponse;
    toJSON(message: QueryDelegatorValidatorsResponse): unknown;
    create<I extends {
        validators?: {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        validators?: {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        }[] & ({
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        } & {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K in Exclude<keyof I["validators"][number]["consensusPubkey"], keyof import("../../../google/protobuf/any").Any>]: never; };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            } & {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            } & { [K_1 in Exclude<keyof I["validators"][number]["description"], keyof import("./staking").Description>]: never; };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            } & {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                } & {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                } & { [K_2 in Exclude<keyof I["validators"][number]["commission"]["commissionRates"], keyof import("./staking").CommissionRates>]: never; };
                updateTime?: Date;
            } & { [K_3 in Exclude<keyof I["validators"][number]["commission"], keyof import("./staking").Commission>]: never; };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[] & number[] & { [K_4 in Exclude<keyof I["validators"][number]["unbondingIds"], keyof number[]>]: never; };
        } & { [K_5 in Exclude<keyof I["validators"][number], keyof Validator>]: never; })[] & { [K_6 in Exclude<keyof I["validators"], keyof {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_7 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_8 in Exclude<keyof I, keyof QueryDelegatorValidatorsResponse>]: never; }>(base?: I): QueryDelegatorValidatorsResponse;
    fromPartial<I_1 extends {
        validators?: {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        validators?: {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        }[] & ({
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        } & {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_9 in Exclude<keyof I_1["validators"][number]["consensusPubkey"], keyof import("../../../google/protobuf/any").Any>]: never; };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            } & {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            } & { [K_10 in Exclude<keyof I_1["validators"][number]["description"], keyof import("./staking").Description>]: never; };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            } & {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                } & {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                } & { [K_11 in Exclude<keyof I_1["validators"][number]["commission"]["commissionRates"], keyof import("./staking").CommissionRates>]: never; };
                updateTime?: Date;
            } & { [K_12 in Exclude<keyof I_1["validators"][number]["commission"], keyof import("./staking").Commission>]: never; };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[] & number[] & { [K_13 in Exclude<keyof I_1["validators"][number]["unbondingIds"], keyof number[]>]: never; };
        } & { [K_14 in Exclude<keyof I_1["validators"][number], keyof Validator>]: never; })[] & { [K_15 in Exclude<keyof I_1["validators"], keyof {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_16 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_17 in Exclude<keyof I_1, keyof QueryDelegatorValidatorsResponse>]: never; }>(object: I_1): QueryDelegatorValidatorsResponse;
};
export declare const QueryDelegatorValidatorRequest: {
    encode(message: QueryDelegatorValidatorRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDelegatorValidatorRequest;
    fromJSON(object: any): QueryDelegatorValidatorRequest;
    toJSON(message: QueryDelegatorValidatorRequest): unknown;
    create<I extends {
        delegatorAddr?: string;
        validatorAddr?: string;
    } & {
        delegatorAddr?: string;
        validatorAddr?: string;
    } & { [K in Exclude<keyof I, keyof QueryDelegatorValidatorRequest>]: never; }>(base?: I): QueryDelegatorValidatorRequest;
    fromPartial<I_1 extends {
        delegatorAddr?: string;
        validatorAddr?: string;
    } & {
        delegatorAddr?: string;
        validatorAddr?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof QueryDelegatorValidatorRequest>]: never; }>(object: I_1): QueryDelegatorValidatorRequest;
};
export declare const QueryDelegatorValidatorResponse: {
    encode(message: QueryDelegatorValidatorResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDelegatorValidatorResponse;
    fromJSON(object: any): QueryDelegatorValidatorResponse;
    toJSON(message: QueryDelegatorValidatorResponse): unknown;
    create<I extends {
        validator?: {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        };
    } & {
        validator?: {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        } & {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K in Exclude<keyof I["validator"]["consensusPubkey"], keyof import("../../../google/protobuf/any").Any>]: never; };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            } & {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            } & { [K_1 in Exclude<keyof I["validator"]["description"], keyof import("./staking").Description>]: never; };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            } & {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                } & {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                } & { [K_2 in Exclude<keyof I["validator"]["commission"]["commissionRates"], keyof import("./staking").CommissionRates>]: never; };
                updateTime?: Date;
            } & { [K_3 in Exclude<keyof I["validator"]["commission"], keyof import("./staking").Commission>]: never; };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[] & number[] & { [K_4 in Exclude<keyof I["validator"]["unbondingIds"], keyof number[]>]: never; };
        } & { [K_5 in Exclude<keyof I["validator"], keyof Validator>]: never; };
    } & { [K_6 in Exclude<keyof I, "validator">]: never; }>(base?: I): QueryDelegatorValidatorResponse;
    fromPartial<I_1 extends {
        validator?: {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        };
    } & {
        validator?: {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        } & {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_7 in Exclude<keyof I_1["validator"]["consensusPubkey"], keyof import("../../../google/protobuf/any").Any>]: never; };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            } & {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            } & { [K_8 in Exclude<keyof I_1["validator"]["description"], keyof import("./staking").Description>]: never; };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            } & {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                } & {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                } & { [K_9 in Exclude<keyof I_1["validator"]["commission"]["commissionRates"], keyof import("./staking").CommissionRates>]: never; };
                updateTime?: Date;
            } & { [K_10 in Exclude<keyof I_1["validator"]["commission"], keyof import("./staking").Commission>]: never; };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[] & number[] & { [K_11 in Exclude<keyof I_1["validator"]["unbondingIds"], keyof number[]>]: never; };
        } & { [K_12 in Exclude<keyof I_1["validator"], keyof Validator>]: never; };
    } & { [K_13 in Exclude<keyof I_1, "validator">]: never; }>(object: I_1): QueryDelegatorValidatorResponse;
};
export declare const QueryHistoricalInfoRequest: {
    encode(message: QueryHistoricalInfoRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryHistoricalInfoRequest;
    fromJSON(object: any): QueryHistoricalInfoRequest;
    toJSON(message: QueryHistoricalInfoRequest): unknown;
    create<I extends {
        height?: number;
    } & {
        height?: number;
    } & { [K in Exclude<keyof I, "height">]: never; }>(base?: I): QueryHistoricalInfoRequest;
    fromPartial<I_1 extends {
        height?: number;
    } & {
        height?: number;
    } & { [K_1 in Exclude<keyof I_1, "height">]: never; }>(object: I_1): QueryHistoricalInfoRequest;
};
export declare const QueryHistoricalInfoResponse: {
    encode(message: QueryHistoricalInfoResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryHistoricalInfoResponse;
    fromJSON(object: any): QueryHistoricalInfoResponse;
    toJSON(message: QueryHistoricalInfoResponse): unknown;
    create<I extends {
        hist?: {
            header?: {
                version?: {
                    block?: number;
                    app?: number;
                };
                chainId?: string;
                height?: number;
                time?: Date;
                lastBlockId?: {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    };
                };
                lastCommitHash?: Uint8Array;
                dataHash?: Uint8Array;
                validatorsHash?: Uint8Array;
                nextValidatorsHash?: Uint8Array;
                consensusHash?: Uint8Array;
                appHash?: Uint8Array;
                lastResultsHash?: Uint8Array;
                evidenceHash?: Uint8Array;
                proposerAddress?: Uint8Array;
            };
            valset?: {
                operatorAddress?: string;
                consensusPubkey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
                jailed?: boolean;
                status?: import("./staking").BondStatus;
                tokens?: string;
                delegatorShares?: string;
                description?: {
                    moniker?: string;
                    identity?: string;
                    website?: string;
                    securityContact?: string;
                    details?: string;
                };
                unbondingHeight?: number;
                unbondingTime?: Date;
                commission?: {
                    commissionRates?: {
                        rate?: string;
                        maxRate?: string;
                        maxChangeRate?: string;
                    };
                    updateTime?: Date;
                };
                minSelfDelegation?: string;
                unbondingOnHoldRefCount?: number;
                unbondingIds?: number[];
            }[];
        };
    } & {
        hist?: {
            header?: {
                version?: {
                    block?: number;
                    app?: number;
                };
                chainId?: string;
                height?: number;
                time?: Date;
                lastBlockId?: {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    };
                };
                lastCommitHash?: Uint8Array;
                dataHash?: Uint8Array;
                validatorsHash?: Uint8Array;
                nextValidatorsHash?: Uint8Array;
                consensusHash?: Uint8Array;
                appHash?: Uint8Array;
                lastResultsHash?: Uint8Array;
                evidenceHash?: Uint8Array;
                proposerAddress?: Uint8Array;
            };
            valset?: {
                operatorAddress?: string;
                consensusPubkey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
                jailed?: boolean;
                status?: import("./staking").BondStatus;
                tokens?: string;
                delegatorShares?: string;
                description?: {
                    moniker?: string;
                    identity?: string;
                    website?: string;
                    securityContact?: string;
                    details?: string;
                };
                unbondingHeight?: number;
                unbondingTime?: Date;
                commission?: {
                    commissionRates?: {
                        rate?: string;
                        maxRate?: string;
                        maxChangeRate?: string;
                    };
                    updateTime?: Date;
                };
                minSelfDelegation?: string;
                unbondingOnHoldRefCount?: number;
                unbondingIds?: number[];
            }[];
        } & {
            header?: {
                version?: {
                    block?: number;
                    app?: number;
                };
                chainId?: string;
                height?: number;
                time?: Date;
                lastBlockId?: {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    };
                };
                lastCommitHash?: Uint8Array;
                dataHash?: Uint8Array;
                validatorsHash?: Uint8Array;
                nextValidatorsHash?: Uint8Array;
                consensusHash?: Uint8Array;
                appHash?: Uint8Array;
                lastResultsHash?: Uint8Array;
                evidenceHash?: Uint8Array;
                proposerAddress?: Uint8Array;
            } & {
                version?: {
                    block?: number;
                    app?: number;
                } & {
                    block?: number;
                    app?: number;
                } & { [K in Exclude<keyof I["hist"]["header"]["version"], keyof import("../../../tendermint/version/types").Consensus>]: never; };
                chainId?: string;
                height?: number;
                time?: Date;
                lastBlockId?: {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    };
                } & {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    } & {
                        total?: number;
                        hash?: Uint8Array;
                    } & { [K_1 in Exclude<keyof I["hist"]["header"]["lastBlockId"]["partSetHeader"], keyof import("../../../tendermint/types/types").PartSetHeader>]: never; };
                } & { [K_2 in Exclude<keyof I["hist"]["header"]["lastBlockId"], keyof import("../../../tendermint/types/types").BlockID>]: never; };
                lastCommitHash?: Uint8Array;
                dataHash?: Uint8Array;
                validatorsHash?: Uint8Array;
                nextValidatorsHash?: Uint8Array;
                consensusHash?: Uint8Array;
                appHash?: Uint8Array;
                lastResultsHash?: Uint8Array;
                evidenceHash?: Uint8Array;
                proposerAddress?: Uint8Array;
            } & { [K_3 in Exclude<keyof I["hist"]["header"], keyof import("../../../tendermint/types/types").Header>]: never; };
            valset?: {
                operatorAddress?: string;
                consensusPubkey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
                jailed?: boolean;
                status?: import("./staking").BondStatus;
                tokens?: string;
                delegatorShares?: string;
                description?: {
                    moniker?: string;
                    identity?: string;
                    website?: string;
                    securityContact?: string;
                    details?: string;
                };
                unbondingHeight?: number;
                unbondingTime?: Date;
                commission?: {
                    commissionRates?: {
                        rate?: string;
                        maxRate?: string;
                        maxChangeRate?: string;
                    };
                    updateTime?: Date;
                };
                minSelfDelegation?: string;
                unbondingOnHoldRefCount?: number;
                unbondingIds?: number[];
            }[] & ({
                operatorAddress?: string;
                consensusPubkey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
                jailed?: boolean;
                status?: import("./staking").BondStatus;
                tokens?: string;
                delegatorShares?: string;
                description?: {
                    moniker?: string;
                    identity?: string;
                    website?: string;
                    securityContact?: string;
                    details?: string;
                };
                unbondingHeight?: number;
                unbondingTime?: Date;
                commission?: {
                    commissionRates?: {
                        rate?: string;
                        maxRate?: string;
                        maxChangeRate?: string;
                    };
                    updateTime?: Date;
                };
                minSelfDelegation?: string;
                unbondingOnHoldRefCount?: number;
                unbondingIds?: number[];
            } & {
                operatorAddress?: string;
                consensusPubkey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_4 in Exclude<keyof I["hist"]["valset"][number]["consensusPubkey"], keyof import("../../../google/protobuf/any").Any>]: never; };
                jailed?: boolean;
                status?: import("./staking").BondStatus;
                tokens?: string;
                delegatorShares?: string;
                description?: {
                    moniker?: string;
                    identity?: string;
                    website?: string;
                    securityContact?: string;
                    details?: string;
                } & {
                    moniker?: string;
                    identity?: string;
                    website?: string;
                    securityContact?: string;
                    details?: string;
                } & { [K_5 in Exclude<keyof I["hist"]["valset"][number]["description"], keyof import("./staking").Description>]: never; };
                unbondingHeight?: number;
                unbondingTime?: Date;
                commission?: {
                    commissionRates?: {
                        rate?: string;
                        maxRate?: string;
                        maxChangeRate?: string;
                    };
                    updateTime?: Date;
                } & {
                    commissionRates?: {
                        rate?: string;
                        maxRate?: string;
                        maxChangeRate?: string;
                    } & {
                        rate?: string;
                        maxRate?: string;
                        maxChangeRate?: string;
                    } & { [K_6 in Exclude<keyof I["hist"]["valset"][number]["commission"]["commissionRates"], keyof import("./staking").CommissionRates>]: never; };
                    updateTime?: Date;
                } & { [K_7 in Exclude<keyof I["hist"]["valset"][number]["commission"], keyof import("./staking").Commission>]: never; };
                minSelfDelegation?: string;
                unbondingOnHoldRefCount?: number;
                unbondingIds?: number[] & number[] & { [K_8 in Exclude<keyof I["hist"]["valset"][number]["unbondingIds"], keyof number[]>]: never; };
            } & { [K_9 in Exclude<keyof I["hist"]["valset"][number], keyof Validator>]: never; })[] & { [K_10 in Exclude<keyof I["hist"]["valset"], keyof {
                operatorAddress?: string;
                consensusPubkey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
                jailed?: boolean;
                status?: import("./staking").BondStatus;
                tokens?: string;
                delegatorShares?: string;
                description?: {
                    moniker?: string;
                    identity?: string;
                    website?: string;
                    securityContact?: string;
                    details?: string;
                };
                unbondingHeight?: number;
                unbondingTime?: Date;
                commission?: {
                    commissionRates?: {
                        rate?: string;
                        maxRate?: string;
                        maxChangeRate?: string;
                    };
                    updateTime?: Date;
                };
                minSelfDelegation?: string;
                unbondingOnHoldRefCount?: number;
                unbondingIds?: number[];
            }[]>]: never; };
        } & { [K_11 in Exclude<keyof I["hist"], keyof HistoricalInfo>]: never; };
    } & { [K_12 in Exclude<keyof I, "hist">]: never; }>(base?: I): QueryHistoricalInfoResponse;
    fromPartial<I_1 extends {
        hist?: {
            header?: {
                version?: {
                    block?: number;
                    app?: number;
                };
                chainId?: string;
                height?: number;
                time?: Date;
                lastBlockId?: {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    };
                };
                lastCommitHash?: Uint8Array;
                dataHash?: Uint8Array;
                validatorsHash?: Uint8Array;
                nextValidatorsHash?: Uint8Array;
                consensusHash?: Uint8Array;
                appHash?: Uint8Array;
                lastResultsHash?: Uint8Array;
                evidenceHash?: Uint8Array;
                proposerAddress?: Uint8Array;
            };
            valset?: {
                operatorAddress?: string;
                consensusPubkey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
                jailed?: boolean;
                status?: import("./staking").BondStatus;
                tokens?: string;
                delegatorShares?: string;
                description?: {
                    moniker?: string;
                    identity?: string;
                    website?: string;
                    securityContact?: string;
                    details?: string;
                };
                unbondingHeight?: number;
                unbondingTime?: Date;
                commission?: {
                    commissionRates?: {
                        rate?: string;
                        maxRate?: string;
                        maxChangeRate?: string;
                    };
                    updateTime?: Date;
                };
                minSelfDelegation?: string;
                unbondingOnHoldRefCount?: number;
                unbondingIds?: number[];
            }[];
        };
    } & {
        hist?: {
            header?: {
                version?: {
                    block?: number;
                    app?: number;
                };
                chainId?: string;
                height?: number;
                time?: Date;
                lastBlockId?: {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    };
                };
                lastCommitHash?: Uint8Array;
                dataHash?: Uint8Array;
                validatorsHash?: Uint8Array;
                nextValidatorsHash?: Uint8Array;
                consensusHash?: Uint8Array;
                appHash?: Uint8Array;
                lastResultsHash?: Uint8Array;
                evidenceHash?: Uint8Array;
                proposerAddress?: Uint8Array;
            };
            valset?: {
                operatorAddress?: string;
                consensusPubkey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
                jailed?: boolean;
                status?: import("./staking").BondStatus;
                tokens?: string;
                delegatorShares?: string;
                description?: {
                    moniker?: string;
                    identity?: string;
                    website?: string;
                    securityContact?: string;
                    details?: string;
                };
                unbondingHeight?: number;
                unbondingTime?: Date;
                commission?: {
                    commissionRates?: {
                        rate?: string;
                        maxRate?: string;
                        maxChangeRate?: string;
                    };
                    updateTime?: Date;
                };
                minSelfDelegation?: string;
                unbondingOnHoldRefCount?: number;
                unbondingIds?: number[];
            }[];
        } & {
            header?: {
                version?: {
                    block?: number;
                    app?: number;
                };
                chainId?: string;
                height?: number;
                time?: Date;
                lastBlockId?: {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    };
                };
                lastCommitHash?: Uint8Array;
                dataHash?: Uint8Array;
                validatorsHash?: Uint8Array;
                nextValidatorsHash?: Uint8Array;
                consensusHash?: Uint8Array;
                appHash?: Uint8Array;
                lastResultsHash?: Uint8Array;
                evidenceHash?: Uint8Array;
                proposerAddress?: Uint8Array;
            } & {
                version?: {
                    block?: number;
                    app?: number;
                } & {
                    block?: number;
                    app?: number;
                } & { [K_13 in Exclude<keyof I_1["hist"]["header"]["version"], keyof import("../../../tendermint/version/types").Consensus>]: never; };
                chainId?: string;
                height?: number;
                time?: Date;
                lastBlockId?: {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    };
                } & {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    } & {
                        total?: number;
                        hash?: Uint8Array;
                    } & { [K_14 in Exclude<keyof I_1["hist"]["header"]["lastBlockId"]["partSetHeader"], keyof import("../../../tendermint/types/types").PartSetHeader>]: never; };
                } & { [K_15 in Exclude<keyof I_1["hist"]["header"]["lastBlockId"], keyof import("../../../tendermint/types/types").BlockID>]: never; };
                lastCommitHash?: Uint8Array;
                dataHash?: Uint8Array;
                validatorsHash?: Uint8Array;
                nextValidatorsHash?: Uint8Array;
                consensusHash?: Uint8Array;
                appHash?: Uint8Array;
                lastResultsHash?: Uint8Array;
                evidenceHash?: Uint8Array;
                proposerAddress?: Uint8Array;
            } & { [K_16 in Exclude<keyof I_1["hist"]["header"], keyof import("../../../tendermint/types/types").Header>]: never; };
            valset?: {
                operatorAddress?: string;
                consensusPubkey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
                jailed?: boolean;
                status?: import("./staking").BondStatus;
                tokens?: string;
                delegatorShares?: string;
                description?: {
                    moniker?: string;
                    identity?: string;
                    website?: string;
                    securityContact?: string;
                    details?: string;
                };
                unbondingHeight?: number;
                unbondingTime?: Date;
                commission?: {
                    commissionRates?: {
                        rate?: string;
                        maxRate?: string;
                        maxChangeRate?: string;
                    };
                    updateTime?: Date;
                };
                minSelfDelegation?: string;
                unbondingOnHoldRefCount?: number;
                unbondingIds?: number[];
            }[] & ({
                operatorAddress?: string;
                consensusPubkey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
                jailed?: boolean;
                status?: import("./staking").BondStatus;
                tokens?: string;
                delegatorShares?: string;
                description?: {
                    moniker?: string;
                    identity?: string;
                    website?: string;
                    securityContact?: string;
                    details?: string;
                };
                unbondingHeight?: number;
                unbondingTime?: Date;
                commission?: {
                    commissionRates?: {
                        rate?: string;
                        maxRate?: string;
                        maxChangeRate?: string;
                    };
                    updateTime?: Date;
                };
                minSelfDelegation?: string;
                unbondingOnHoldRefCount?: number;
                unbondingIds?: number[];
            } & {
                operatorAddress?: string;
                consensusPubkey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_17 in Exclude<keyof I_1["hist"]["valset"][number]["consensusPubkey"], keyof import("../../../google/protobuf/any").Any>]: never; };
                jailed?: boolean;
                status?: import("./staking").BondStatus;
                tokens?: string;
                delegatorShares?: string;
                description?: {
                    moniker?: string;
                    identity?: string;
                    website?: string;
                    securityContact?: string;
                    details?: string;
                } & {
                    moniker?: string;
                    identity?: string;
                    website?: string;
                    securityContact?: string;
                    details?: string;
                } & { [K_18 in Exclude<keyof I_1["hist"]["valset"][number]["description"], keyof import("./staking").Description>]: never; };
                unbondingHeight?: number;
                unbondingTime?: Date;
                commission?: {
                    commissionRates?: {
                        rate?: string;
                        maxRate?: string;
                        maxChangeRate?: string;
                    };
                    updateTime?: Date;
                } & {
                    commissionRates?: {
                        rate?: string;
                        maxRate?: string;
                        maxChangeRate?: string;
                    } & {
                        rate?: string;
                        maxRate?: string;
                        maxChangeRate?: string;
                    } & { [K_19 in Exclude<keyof I_1["hist"]["valset"][number]["commission"]["commissionRates"], keyof import("./staking").CommissionRates>]: never; };
                    updateTime?: Date;
                } & { [K_20 in Exclude<keyof I_1["hist"]["valset"][number]["commission"], keyof import("./staking").Commission>]: never; };
                minSelfDelegation?: string;
                unbondingOnHoldRefCount?: number;
                unbondingIds?: number[] & number[] & { [K_21 in Exclude<keyof I_1["hist"]["valset"][number]["unbondingIds"], keyof number[]>]: never; };
            } & { [K_22 in Exclude<keyof I_1["hist"]["valset"][number], keyof Validator>]: never; })[] & { [K_23 in Exclude<keyof I_1["hist"]["valset"], keyof {
                operatorAddress?: string;
                consensusPubkey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
                jailed?: boolean;
                status?: import("./staking").BondStatus;
                tokens?: string;
                delegatorShares?: string;
                description?: {
                    moniker?: string;
                    identity?: string;
                    website?: string;
                    securityContact?: string;
                    details?: string;
                };
                unbondingHeight?: number;
                unbondingTime?: Date;
                commission?: {
                    commissionRates?: {
                        rate?: string;
                        maxRate?: string;
                        maxChangeRate?: string;
                    };
                    updateTime?: Date;
                };
                minSelfDelegation?: string;
                unbondingOnHoldRefCount?: number;
                unbondingIds?: number[];
            }[]>]: never; };
        } & { [K_24 in Exclude<keyof I_1["hist"], keyof HistoricalInfo>]: never; };
    } & { [K_25 in Exclude<keyof I_1, "hist">]: never; }>(object: I_1): QueryHistoricalInfoResponse;
};
export declare const QueryPoolRequest: {
    encode(_: QueryPoolRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryPoolRequest;
    fromJSON(_: any): QueryPoolRequest;
    toJSON(_: QueryPoolRequest): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): QueryPoolRequest;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): QueryPoolRequest;
};
export declare const QueryPoolResponse: {
    encode(message: QueryPoolResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryPoolResponse;
    fromJSON(object: any): QueryPoolResponse;
    toJSON(message: QueryPoolResponse): unknown;
    create<I extends {
        pool?: {
            notBondedTokens?: string;
            bondedTokens?: string;
        };
    } & {
        pool?: {
            notBondedTokens?: string;
            bondedTokens?: string;
        } & {
            notBondedTokens?: string;
            bondedTokens?: string;
        } & { [K in Exclude<keyof I["pool"], keyof Pool>]: never; };
    } & { [K_1 in Exclude<keyof I, "pool">]: never; }>(base?: I): QueryPoolResponse;
    fromPartial<I_1 extends {
        pool?: {
            notBondedTokens?: string;
            bondedTokens?: string;
        };
    } & {
        pool?: {
            notBondedTokens?: string;
            bondedTokens?: string;
        } & {
            notBondedTokens?: string;
            bondedTokens?: string;
        } & { [K_2 in Exclude<keyof I_1["pool"], keyof Pool>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "pool">]: never; }>(object: I_1): QueryPoolResponse;
};
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
            unbondingTime?: {
                seconds?: number;
                nanos?: number;
            };
            maxValidators?: number;
            maxEntries?: number;
            historicalEntries?: number;
            bondDenom?: string;
            minCommissionRate?: string;
        };
    } & {
        params?: {
            unbondingTime?: {
                seconds?: number;
                nanos?: number;
            };
            maxValidators?: number;
            maxEntries?: number;
            historicalEntries?: number;
            bondDenom?: string;
            minCommissionRate?: string;
        } & {
            unbondingTime?: {
                seconds?: number;
                nanos?: number;
            } & {
                seconds?: number;
                nanos?: number;
            } & { [K in Exclude<keyof I["params"]["unbondingTime"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
            maxValidators?: number;
            maxEntries?: number;
            historicalEntries?: number;
            bondDenom?: string;
            minCommissionRate?: string;
        } & { [K_1 in Exclude<keyof I["params"], keyof Params>]: never; };
    } & { [K_2 in Exclude<keyof I, "params">]: never; }>(base?: I): QueryParamsResponse;
    fromPartial<I_1 extends {
        params?: {
            unbondingTime?: {
                seconds?: number;
                nanos?: number;
            };
            maxValidators?: number;
            maxEntries?: number;
            historicalEntries?: number;
            bondDenom?: string;
            minCommissionRate?: string;
        };
    } & {
        params?: {
            unbondingTime?: {
                seconds?: number;
                nanos?: number;
            };
            maxValidators?: number;
            maxEntries?: number;
            historicalEntries?: number;
            bondDenom?: string;
            minCommissionRate?: string;
        } & {
            unbondingTime?: {
                seconds?: number;
                nanos?: number;
            } & {
                seconds?: number;
                nanos?: number;
            } & { [K_3 in Exclude<keyof I_1["params"]["unbondingTime"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
            maxValidators?: number;
            maxEntries?: number;
            historicalEntries?: number;
            bondDenom?: string;
            minCommissionRate?: string;
        } & { [K_4 in Exclude<keyof I_1["params"], keyof Params>]: never; };
    } & { [K_5 in Exclude<keyof I_1, "params">]: never; }>(object: I_1): QueryParamsResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /**
     * Validators queries all validators that match the given status.
     *
     * When called from another module, this query might consume a high amount of
     * gas if the pagination field is incorrectly set.
     */
    Validators(request: QueryValidatorsRequest): Promise<QueryValidatorsResponse>;
    /** Validator queries validator info for given validator address. */
    Validator(request: QueryValidatorRequest): Promise<QueryValidatorResponse>;
    /**
     * ValidatorDelegations queries delegate info for given validator.
     *
     * When called from another module, this query might consume a high amount of
     * gas if the pagination field is incorrectly set.
     */
    ValidatorDelegations(request: QueryValidatorDelegationsRequest): Promise<QueryValidatorDelegationsResponse>;
    /**
     * ValidatorUnbondingDelegations queries unbonding delegations of a validator.
     *
     * When called from another module, this query might consume a high amount of
     * gas if the pagination field is incorrectly set.
     */
    ValidatorUnbondingDelegations(request: QueryValidatorUnbondingDelegationsRequest): Promise<QueryValidatorUnbondingDelegationsResponse>;
    /** Delegation queries delegate info for given validator delegator pair. */
    Delegation(request: QueryDelegationRequest): Promise<QueryDelegationResponse>;
    /**
     * UnbondingDelegation queries unbonding info for given validator delegator
     * pair.
     */
    UnbondingDelegation(request: QueryUnbondingDelegationRequest): Promise<QueryUnbondingDelegationResponse>;
    /**
     * DelegatorDelegations queries all delegations of a given delegator address.
     *
     * When called from another module, this query might consume a high amount of
     * gas if the pagination field is incorrectly set.
     */
    DelegatorDelegations(request: QueryDelegatorDelegationsRequest): Promise<QueryDelegatorDelegationsResponse>;
    /**
     * DelegatorUnbondingDelegations queries all unbonding delegations of a given
     * delegator address.
     *
     * When called from another module, this query might consume a high amount of
     * gas if the pagination field is incorrectly set.
     */
    DelegatorUnbondingDelegations(request: QueryDelegatorUnbondingDelegationsRequest): Promise<QueryDelegatorUnbondingDelegationsResponse>;
    /**
     * Redelegations queries redelegations of given address.
     *
     * When called from another module, this query might consume a high amount of
     * gas if the pagination field is incorrectly set.
     */
    Redelegations(request: QueryRedelegationsRequest): Promise<QueryRedelegationsResponse>;
    /**
     * DelegatorValidators queries all validators info for given delegator
     * address.
     *
     * When called from another module, this query might consume a high amount of
     * gas if the pagination field is incorrectly set.
     */
    DelegatorValidators(request: QueryDelegatorValidatorsRequest): Promise<QueryDelegatorValidatorsResponse>;
    /**
     * DelegatorValidator queries validator info for given delegator validator
     * pair.
     */
    DelegatorValidator(request: QueryDelegatorValidatorRequest): Promise<QueryDelegatorValidatorResponse>;
    /** HistoricalInfo queries the historical info for given height. */
    HistoricalInfo(request: QueryHistoricalInfoRequest): Promise<QueryHistoricalInfoResponse>;
    /** Pool queries the pool info. */
    Pool(request: QueryPoolRequest): Promise<QueryPoolResponse>;
    /** Parameters queries the staking parameters. */
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
}
export declare const QueryServiceName = "cosmos.staking.v1beta1.Query";
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    Validators(request: QueryValidatorsRequest): Promise<QueryValidatorsResponse>;
    Validator(request: QueryValidatorRequest): Promise<QueryValidatorResponse>;
    ValidatorDelegations(request: QueryValidatorDelegationsRequest): Promise<QueryValidatorDelegationsResponse>;
    ValidatorUnbondingDelegations(request: QueryValidatorUnbondingDelegationsRequest): Promise<QueryValidatorUnbondingDelegationsResponse>;
    Delegation(request: QueryDelegationRequest): Promise<QueryDelegationResponse>;
    UnbondingDelegation(request: QueryUnbondingDelegationRequest): Promise<QueryUnbondingDelegationResponse>;
    DelegatorDelegations(request: QueryDelegatorDelegationsRequest): Promise<QueryDelegatorDelegationsResponse>;
    DelegatorUnbondingDelegations(request: QueryDelegatorUnbondingDelegationsRequest): Promise<QueryDelegatorUnbondingDelegationsResponse>;
    Redelegations(request: QueryRedelegationsRequest): Promise<QueryRedelegationsResponse>;
    DelegatorValidators(request: QueryDelegatorValidatorsRequest): Promise<QueryDelegatorValidatorsResponse>;
    DelegatorValidator(request: QueryDelegatorValidatorRequest): Promise<QueryDelegatorValidatorResponse>;
    HistoricalInfo(request: QueryHistoricalInfoRequest): Promise<QueryHistoricalInfoResponse>;
    Pool(request: QueryPoolRequest): Promise<QueryPoolResponse>;
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
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
