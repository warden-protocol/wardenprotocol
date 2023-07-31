import * as dependency_2 from "./../../base/v1beta1/coin";
import * as dependency_3 from "./distribution";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.distribution.v1beta1 {
    class DelegatorWithdrawInfo extends pb_1.Message {
        constructor(data?: any[] | {
            delegator_address?: string;
            withdraw_address?: string;
        });
        get delegator_address(): string;
        set delegator_address(value: string);
        get withdraw_address(): string;
        set withdraw_address(value: string);
        static fromObject(data: {
            delegator_address?: string;
            withdraw_address?: string;
        }): DelegatorWithdrawInfo;
        toObject(): {
            delegator_address?: string | undefined;
            withdraw_address?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DelegatorWithdrawInfo;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): DelegatorWithdrawInfo;
    }
    class ValidatorOutstandingRewardsRecord extends pb_1.Message {
        constructor(data?: any[] | {
            validator_address?: string;
            outstanding_rewards?: dependency_2.cosmos.base.v1beta1.DecCoin[];
        });
        get validator_address(): string;
        set validator_address(value: string);
        get outstanding_rewards(): dependency_2.cosmos.base.v1beta1.DecCoin[];
        set outstanding_rewards(value: dependency_2.cosmos.base.v1beta1.DecCoin[]);
        static fromObject(data: {
            validator_address?: string;
            outstanding_rewards?: ReturnType<typeof dependency_2.cosmos.base.v1beta1.DecCoin.prototype.toObject>[];
        }): ValidatorOutstandingRewardsRecord;
        toObject(): {
            validator_address?: string | undefined;
            outstanding_rewards?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ValidatorOutstandingRewardsRecord;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ValidatorOutstandingRewardsRecord;
    }
    class ValidatorAccumulatedCommissionRecord extends pb_1.Message {
        constructor(data?: any[] | {
            validator_address?: string;
            accumulated?: dependency_3.cosmos.distribution.v1beta1.ValidatorAccumulatedCommission;
        });
        get validator_address(): string;
        set validator_address(value: string);
        get accumulated(): dependency_3.cosmos.distribution.v1beta1.ValidatorAccumulatedCommission;
        set accumulated(value: dependency_3.cosmos.distribution.v1beta1.ValidatorAccumulatedCommission);
        static fromObject(data: {
            validator_address?: string;
            accumulated?: ReturnType<typeof dependency_3.cosmos.distribution.v1beta1.ValidatorAccumulatedCommission.prototype.toObject>;
        }): ValidatorAccumulatedCommissionRecord;
        toObject(): {
            validator_address?: string | undefined;
            accumulated?: {
                commission?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ValidatorAccumulatedCommissionRecord;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ValidatorAccumulatedCommissionRecord;
    }
    class ValidatorHistoricalRewardsRecord extends pb_1.Message {
        constructor(data?: any[] | {
            validator_address?: string;
            period?: number;
            rewards?: dependency_3.cosmos.distribution.v1beta1.ValidatorHistoricalRewards;
        });
        get validator_address(): string;
        set validator_address(value: string);
        get period(): number;
        set period(value: number);
        get rewards(): dependency_3.cosmos.distribution.v1beta1.ValidatorHistoricalRewards;
        set rewards(value: dependency_3.cosmos.distribution.v1beta1.ValidatorHistoricalRewards);
        static fromObject(data: {
            validator_address?: string;
            period?: number;
            rewards?: ReturnType<typeof dependency_3.cosmos.distribution.v1beta1.ValidatorHistoricalRewards.prototype.toObject>;
        }): ValidatorHistoricalRewardsRecord;
        toObject(): {
            validator_address?: string | undefined;
            period?: number | undefined;
            rewards?: {
                cumulative_reward_ratio?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
                reference_count?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ValidatorHistoricalRewardsRecord;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ValidatorHistoricalRewardsRecord;
    }
    class ValidatorCurrentRewardsRecord extends pb_1.Message {
        constructor(data?: any[] | {
            validator_address?: string;
            rewards?: dependency_3.cosmos.distribution.v1beta1.ValidatorCurrentRewards;
        });
        get validator_address(): string;
        set validator_address(value: string);
        get rewards(): dependency_3.cosmos.distribution.v1beta1.ValidatorCurrentRewards;
        set rewards(value: dependency_3.cosmos.distribution.v1beta1.ValidatorCurrentRewards);
        static fromObject(data: {
            validator_address?: string;
            rewards?: ReturnType<typeof dependency_3.cosmos.distribution.v1beta1.ValidatorCurrentRewards.prototype.toObject>;
        }): ValidatorCurrentRewardsRecord;
        toObject(): {
            validator_address?: string | undefined;
            rewards?: {
                rewards?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
                period?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ValidatorCurrentRewardsRecord;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ValidatorCurrentRewardsRecord;
    }
    class DelegatorStartingInfoRecord extends pb_1.Message {
        constructor(data?: any[] | {
            delegator_address?: string;
            validator_address?: string;
            starting_info?: dependency_3.cosmos.distribution.v1beta1.DelegatorStartingInfo;
        });
        get delegator_address(): string;
        set delegator_address(value: string);
        get validator_address(): string;
        set validator_address(value: string);
        get starting_info(): dependency_3.cosmos.distribution.v1beta1.DelegatorStartingInfo;
        set starting_info(value: dependency_3.cosmos.distribution.v1beta1.DelegatorStartingInfo);
        static fromObject(data: {
            delegator_address?: string;
            validator_address?: string;
            starting_info?: ReturnType<typeof dependency_3.cosmos.distribution.v1beta1.DelegatorStartingInfo.prototype.toObject>;
        }): DelegatorStartingInfoRecord;
        toObject(): {
            delegator_address?: string | undefined;
            validator_address?: string | undefined;
            starting_info?: {
                previous_period?: number | undefined;
                stake?: string | undefined;
                height?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DelegatorStartingInfoRecord;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): DelegatorStartingInfoRecord;
    }
    class ValidatorSlashEventRecord extends pb_1.Message {
        constructor(data?: any[] | {
            validator_address?: string;
            height?: number;
            period?: number;
            validator_slash_event?: dependency_3.cosmos.distribution.v1beta1.ValidatorSlashEvent;
        });
        get validator_address(): string;
        set validator_address(value: string);
        get height(): number;
        set height(value: number);
        get period(): number;
        set period(value: number);
        get validator_slash_event(): dependency_3.cosmos.distribution.v1beta1.ValidatorSlashEvent;
        set validator_slash_event(value: dependency_3.cosmos.distribution.v1beta1.ValidatorSlashEvent);
        static fromObject(data: {
            validator_address?: string;
            height?: number;
            period?: number;
            validator_slash_event?: ReturnType<typeof dependency_3.cosmos.distribution.v1beta1.ValidatorSlashEvent.prototype.toObject>;
        }): ValidatorSlashEventRecord;
        toObject(): {
            validator_address?: string | undefined;
            height?: number | undefined;
            period?: number | undefined;
            validator_slash_event?: {
                validator_period?: number | undefined;
                fraction?: string | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ValidatorSlashEventRecord;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ValidatorSlashEventRecord;
    }
    class GenesisState extends pb_1.Message {
        constructor(data?: any[] | {
            params?: dependency_3.cosmos.distribution.v1beta1.Params;
            fee_pool?: dependency_3.cosmos.distribution.v1beta1.FeePool;
            delegator_withdraw_infos?: DelegatorWithdrawInfo[];
            previous_proposer?: string;
            outstanding_rewards?: ValidatorOutstandingRewardsRecord[];
            validator_accumulated_commissions?: ValidatorAccumulatedCommissionRecord[];
            validator_historical_rewards?: ValidatorHistoricalRewardsRecord[];
            validator_current_rewards?: ValidatorCurrentRewardsRecord[];
            delegator_starting_infos?: DelegatorStartingInfoRecord[];
            validator_slash_events?: ValidatorSlashEventRecord[];
        });
        get params(): dependency_3.cosmos.distribution.v1beta1.Params;
        set params(value: dependency_3.cosmos.distribution.v1beta1.Params);
        get fee_pool(): dependency_3.cosmos.distribution.v1beta1.FeePool;
        set fee_pool(value: dependency_3.cosmos.distribution.v1beta1.FeePool);
        get delegator_withdraw_infos(): DelegatorWithdrawInfo[];
        set delegator_withdraw_infos(value: DelegatorWithdrawInfo[]);
        get previous_proposer(): string;
        set previous_proposer(value: string);
        get outstanding_rewards(): ValidatorOutstandingRewardsRecord[];
        set outstanding_rewards(value: ValidatorOutstandingRewardsRecord[]);
        get validator_accumulated_commissions(): ValidatorAccumulatedCommissionRecord[];
        set validator_accumulated_commissions(value: ValidatorAccumulatedCommissionRecord[]);
        get validator_historical_rewards(): ValidatorHistoricalRewardsRecord[];
        set validator_historical_rewards(value: ValidatorHistoricalRewardsRecord[]);
        get validator_current_rewards(): ValidatorCurrentRewardsRecord[];
        set validator_current_rewards(value: ValidatorCurrentRewardsRecord[]);
        get delegator_starting_infos(): DelegatorStartingInfoRecord[];
        set delegator_starting_infos(value: DelegatorStartingInfoRecord[]);
        get validator_slash_events(): ValidatorSlashEventRecord[];
        set validator_slash_events(value: ValidatorSlashEventRecord[]);
        static fromObject(data: {
            params?: ReturnType<typeof dependency_3.cosmos.distribution.v1beta1.Params.prototype.toObject>;
            fee_pool?: ReturnType<typeof dependency_3.cosmos.distribution.v1beta1.FeePool.prototype.toObject>;
            delegator_withdraw_infos?: ReturnType<typeof DelegatorWithdrawInfo.prototype.toObject>[];
            previous_proposer?: string;
            outstanding_rewards?: ReturnType<typeof ValidatorOutstandingRewardsRecord.prototype.toObject>[];
            validator_accumulated_commissions?: ReturnType<typeof ValidatorAccumulatedCommissionRecord.prototype.toObject>[];
            validator_historical_rewards?: ReturnType<typeof ValidatorHistoricalRewardsRecord.prototype.toObject>[];
            validator_current_rewards?: ReturnType<typeof ValidatorCurrentRewardsRecord.prototype.toObject>[];
            delegator_starting_infos?: ReturnType<typeof DelegatorStartingInfoRecord.prototype.toObject>[];
            validator_slash_events?: ReturnType<typeof ValidatorSlashEventRecord.prototype.toObject>[];
        }): GenesisState;
        toObject(): {
            params?: {
                community_tax?: string | undefined;
                base_proposer_reward?: string | undefined;
                bonus_proposer_reward?: string | undefined;
                withdraw_addr_enabled?: boolean | undefined;
            } | undefined;
            fee_pool?: {
                community_pool?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
            } | undefined;
            delegator_withdraw_infos?: {
                delegator_address?: string | undefined;
                withdraw_address?: string | undefined;
            }[] | undefined;
            previous_proposer?: string | undefined;
            outstanding_rewards?: {
                validator_address?: string | undefined;
                outstanding_rewards?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
            }[] | undefined;
            validator_accumulated_commissions?: {
                validator_address?: string | undefined;
                accumulated?: {
                    commission?: {
                        denom?: string | undefined;
                        amount?: string | undefined;
                    }[] | undefined;
                } | undefined;
            }[] | undefined;
            validator_historical_rewards?: {
                validator_address?: string | undefined;
                period?: number | undefined;
                rewards?: {
                    cumulative_reward_ratio?: {
                        denom?: string | undefined;
                        amount?: string | undefined;
                    }[] | undefined;
                    reference_count?: number | undefined;
                } | undefined;
            }[] | undefined;
            validator_current_rewards?: {
                validator_address?: string | undefined;
                rewards?: {
                    rewards?: {
                        denom?: string | undefined;
                        amount?: string | undefined;
                    }[] | undefined;
                    period?: number | undefined;
                } | undefined;
            }[] | undefined;
            delegator_starting_infos?: {
                delegator_address?: string | undefined;
                validator_address?: string | undefined;
                starting_info?: {
                    previous_period?: number | undefined;
                    stake?: string | undefined;
                    height?: number | undefined;
                } | undefined;
            }[] | undefined;
            validator_slash_events?: {
                validator_address?: string | undefined;
                height?: number | undefined;
                period?: number | undefined;
                validator_slash_event?: {
                    validator_period?: number | undefined;
                    fraction?: string | undefined;
                } | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GenesisState;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GenesisState;
    }
}
//# sourceMappingURL=genesis.d.ts.map