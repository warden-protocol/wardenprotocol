import * as dependency_1 from "./../../base/query/v1beta1/pagination";
import * as dependency_4 from "./../../base/v1beta1/coin";
import * as dependency_5 from "./distribution";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.distribution.v1beta1 {
    class QueryParamsRequest extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): QueryParamsRequest;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryParamsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryParamsRequest;
    }
    class QueryParamsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            params?: dependency_5.cosmos.distribution.v1beta1.Params;
        });
        get params(): dependency_5.cosmos.distribution.v1beta1.Params;
        set params(value: dependency_5.cosmos.distribution.v1beta1.Params);
        static fromObject(data: {
            params?: ReturnType<typeof dependency_5.cosmos.distribution.v1beta1.Params.prototype.toObject>;
        }): QueryParamsResponse;
        toObject(): {
            params?: {
                community_tax?: string | undefined;
                base_proposer_reward?: string | undefined;
                bonus_proposer_reward?: string | undefined;
                withdraw_addr_enabled?: boolean | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryParamsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryParamsResponse;
    }
    class QueryValidatorOutstandingRewardsRequest extends pb_1.Message {
        constructor(data?: any[] | {
            validator_address?: string;
        });
        get validator_address(): string;
        set validator_address(value: string);
        static fromObject(data: {
            validator_address?: string;
        }): QueryValidatorOutstandingRewardsRequest;
        toObject(): {
            validator_address?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryValidatorOutstandingRewardsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryValidatorOutstandingRewardsRequest;
    }
    class QueryValidatorOutstandingRewardsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            rewards?: dependency_5.cosmos.distribution.v1beta1.ValidatorOutstandingRewards;
        });
        get rewards(): dependency_5.cosmos.distribution.v1beta1.ValidatorOutstandingRewards;
        set rewards(value: dependency_5.cosmos.distribution.v1beta1.ValidatorOutstandingRewards);
        static fromObject(data: {
            rewards?: ReturnType<typeof dependency_5.cosmos.distribution.v1beta1.ValidatorOutstandingRewards.prototype.toObject>;
        }): QueryValidatorOutstandingRewardsResponse;
        toObject(): {
            rewards?: {
                rewards?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryValidatorOutstandingRewardsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryValidatorOutstandingRewardsResponse;
    }
    class QueryValidatorCommissionRequest extends pb_1.Message {
        constructor(data?: any[] | {
            validator_address?: string;
        });
        get validator_address(): string;
        set validator_address(value: string);
        static fromObject(data: {
            validator_address?: string;
        }): QueryValidatorCommissionRequest;
        toObject(): {
            validator_address?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryValidatorCommissionRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryValidatorCommissionRequest;
    }
    class QueryValidatorCommissionResponse extends pb_1.Message {
        constructor(data?: any[] | {
            commission?: dependency_5.cosmos.distribution.v1beta1.ValidatorAccumulatedCommission;
        });
        get commission(): dependency_5.cosmos.distribution.v1beta1.ValidatorAccumulatedCommission;
        set commission(value: dependency_5.cosmos.distribution.v1beta1.ValidatorAccumulatedCommission);
        static fromObject(data: {
            commission?: ReturnType<typeof dependency_5.cosmos.distribution.v1beta1.ValidatorAccumulatedCommission.prototype.toObject>;
        }): QueryValidatorCommissionResponse;
        toObject(): {
            commission?: {
                commission?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryValidatorCommissionResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryValidatorCommissionResponse;
    }
    class QueryValidatorSlashesRequest extends pb_1.Message {
        constructor(data?: any[] | {
            validator_address?: string;
            starting_height?: number;
            ending_height?: number;
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageRequest;
        });
        get validator_address(): string;
        set validator_address(value: string);
        get starting_height(): number;
        set starting_height(value: number);
        get ending_height(): number;
        set ending_height(value: number);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            validator_address?: string;
            starting_height?: number;
            ending_height?: number;
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryValidatorSlashesRequest;
        toObject(): {
            validator_address?: string | undefined;
            starting_height?: number | undefined;
            ending_height?: number | undefined;
            pagination?: {
                key?: Uint8Array | undefined;
                offset?: number | undefined;
                limit?: number | undefined;
                count_total?: boolean | undefined;
                reverse?: boolean | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryValidatorSlashesRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryValidatorSlashesRequest;
    }
    class QueryValidatorSlashesResponse extends pb_1.Message {
        constructor(data?: any[] | {
            slashes?: dependency_5.cosmos.distribution.v1beta1.ValidatorSlashEvent[];
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageResponse;
        });
        get slashes(): dependency_5.cosmos.distribution.v1beta1.ValidatorSlashEvent[];
        set slashes(value: dependency_5.cosmos.distribution.v1beta1.ValidatorSlashEvent[]);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            slashes?: ReturnType<typeof dependency_5.cosmos.distribution.v1beta1.ValidatorSlashEvent.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): QueryValidatorSlashesResponse;
        toObject(): {
            slashes?: {
                validator_period?: number | undefined;
                fraction?: string | undefined;
            }[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryValidatorSlashesResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryValidatorSlashesResponse;
    }
    class QueryDelegationRewardsRequest extends pb_1.Message {
        constructor(data?: any[] | {
            delegator_address?: string;
            validator_address?: string;
        });
        get delegator_address(): string;
        set delegator_address(value: string);
        get validator_address(): string;
        set validator_address(value: string);
        static fromObject(data: {
            delegator_address?: string;
            validator_address?: string;
        }): QueryDelegationRewardsRequest;
        toObject(): {
            delegator_address?: string | undefined;
            validator_address?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryDelegationRewardsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryDelegationRewardsRequest;
    }
    class QueryDelegationRewardsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            rewards?: dependency_4.cosmos.base.v1beta1.DecCoin[];
        });
        get rewards(): dependency_4.cosmos.base.v1beta1.DecCoin[];
        set rewards(value: dependency_4.cosmos.base.v1beta1.DecCoin[]);
        static fromObject(data: {
            rewards?: ReturnType<typeof dependency_4.cosmos.base.v1beta1.DecCoin.prototype.toObject>[];
        }): QueryDelegationRewardsResponse;
        toObject(): {
            rewards?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryDelegationRewardsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryDelegationRewardsResponse;
    }
    class QueryDelegationTotalRewardsRequest extends pb_1.Message {
        constructor(data?: any[] | {
            delegator_address?: string;
        });
        get delegator_address(): string;
        set delegator_address(value: string);
        static fromObject(data: {
            delegator_address?: string;
        }): QueryDelegationTotalRewardsRequest;
        toObject(): {
            delegator_address?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryDelegationTotalRewardsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryDelegationTotalRewardsRequest;
    }
    class QueryDelegationTotalRewardsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            rewards?: dependency_5.cosmos.distribution.v1beta1.DelegationDelegatorReward[];
            total?: dependency_4.cosmos.base.v1beta1.DecCoin[];
        });
        get rewards(): dependency_5.cosmos.distribution.v1beta1.DelegationDelegatorReward[];
        set rewards(value: dependency_5.cosmos.distribution.v1beta1.DelegationDelegatorReward[]);
        get total(): dependency_4.cosmos.base.v1beta1.DecCoin[];
        set total(value: dependency_4.cosmos.base.v1beta1.DecCoin[]);
        static fromObject(data: {
            rewards?: ReturnType<typeof dependency_5.cosmos.distribution.v1beta1.DelegationDelegatorReward.prototype.toObject>[];
            total?: ReturnType<typeof dependency_4.cosmos.base.v1beta1.DecCoin.prototype.toObject>[];
        }): QueryDelegationTotalRewardsResponse;
        toObject(): {
            rewards?: {
                validator_address?: string | undefined;
                reward?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
            }[] | undefined;
            total?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryDelegationTotalRewardsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryDelegationTotalRewardsResponse;
    }
    class QueryDelegatorValidatorsRequest extends pb_1.Message {
        constructor(data?: any[] | {
            delegator_address?: string;
        });
        get delegator_address(): string;
        set delegator_address(value: string);
        static fromObject(data: {
            delegator_address?: string;
        }): QueryDelegatorValidatorsRequest;
        toObject(): {
            delegator_address?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryDelegatorValidatorsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryDelegatorValidatorsRequest;
    }
    class QueryDelegatorValidatorsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            validators?: string[];
        });
        get validators(): string[];
        set validators(value: string[]);
        static fromObject(data: {
            validators?: string[];
        }): QueryDelegatorValidatorsResponse;
        toObject(): {
            validators?: string[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryDelegatorValidatorsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryDelegatorValidatorsResponse;
    }
    class QueryDelegatorWithdrawAddressRequest extends pb_1.Message {
        constructor(data?: any[] | {
            delegator_address?: string;
        });
        get delegator_address(): string;
        set delegator_address(value: string);
        static fromObject(data: {
            delegator_address?: string;
        }): QueryDelegatorWithdrawAddressRequest;
        toObject(): {
            delegator_address?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryDelegatorWithdrawAddressRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryDelegatorWithdrawAddressRequest;
    }
    class QueryDelegatorWithdrawAddressResponse extends pb_1.Message {
        constructor(data?: any[] | {
            withdraw_address?: string;
        });
        get withdraw_address(): string;
        set withdraw_address(value: string);
        static fromObject(data: {
            withdraw_address?: string;
        }): QueryDelegatorWithdrawAddressResponse;
        toObject(): {
            withdraw_address?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryDelegatorWithdrawAddressResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryDelegatorWithdrawAddressResponse;
    }
    class QueryCommunityPoolRequest extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): QueryCommunityPoolRequest;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryCommunityPoolRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryCommunityPoolRequest;
    }
    class QueryCommunityPoolResponse extends pb_1.Message {
        constructor(data?: any[] | {
            pool?: dependency_4.cosmos.base.v1beta1.DecCoin[];
        });
        get pool(): dependency_4.cosmos.base.v1beta1.DecCoin[];
        set pool(value: dependency_4.cosmos.base.v1beta1.DecCoin[]);
        static fromObject(data: {
            pool?: ReturnType<typeof dependency_4.cosmos.base.v1beta1.DecCoin.prototype.toObject>[];
        }): QueryCommunityPoolResponse;
        toObject(): {
            pool?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryCommunityPoolResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryCommunityPoolResponse;
    }
}
//# sourceMappingURL=query.d.ts.map