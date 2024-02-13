import _m0 from "protobufjs/minimal";
import { DecCoin } from "../../base/v1beta1/coin";
import { DelegatorStartingInfo, FeePool, Params, ValidatorAccumulatedCommission, ValidatorCurrentRewards, ValidatorHistoricalRewards, ValidatorSlashEvent } from "./distribution";
export declare const protobufPackage = "cosmos.distribution.v1beta1";
/**
 * DelegatorWithdrawInfo is the address for where distributions rewards are
 * withdrawn to by default this struct is only used at genesis to feed in
 * default withdraw addresses.
 */
export interface DelegatorWithdrawInfo {
    /** delegator_address is the address of the delegator. */
    delegatorAddress: string;
    /** withdraw_address is the address to withdraw the delegation rewards to. */
    withdrawAddress: string;
}
/** ValidatorOutstandingRewardsRecord is used for import/export via genesis json. */
export interface ValidatorOutstandingRewardsRecord {
    /** validator_address is the address of the validator. */
    validatorAddress: string;
    /** outstanding_rewards represents the outstanding rewards of a validator. */
    outstandingRewards: DecCoin[];
}
/**
 * ValidatorAccumulatedCommissionRecord is used for import / export via genesis
 * json.
 */
export interface ValidatorAccumulatedCommissionRecord {
    /** validator_address is the address of the validator. */
    validatorAddress: string;
    /** accumulated is the accumulated commission of a validator. */
    accumulated: ValidatorAccumulatedCommission | undefined;
}
/**
 * ValidatorHistoricalRewardsRecord is used for import / export via genesis
 * json.
 */
export interface ValidatorHistoricalRewardsRecord {
    /** validator_address is the address of the validator. */
    validatorAddress: string;
    /** period defines the period the historical rewards apply to. */
    period: number;
    /** rewards defines the historical rewards of a validator. */
    rewards: ValidatorHistoricalRewards | undefined;
}
/** ValidatorCurrentRewardsRecord is used for import / export via genesis json. */
export interface ValidatorCurrentRewardsRecord {
    /** validator_address is the address of the validator. */
    validatorAddress: string;
    /** rewards defines the current rewards of a validator. */
    rewards: ValidatorCurrentRewards | undefined;
}
/** DelegatorStartingInfoRecord used for import / export via genesis json. */
export interface DelegatorStartingInfoRecord {
    /** delegator_address is the address of the delegator. */
    delegatorAddress: string;
    /** validator_address is the address of the validator. */
    validatorAddress: string;
    /** starting_info defines the starting info of a delegator. */
    startingInfo: DelegatorStartingInfo | undefined;
}
/** ValidatorSlashEventRecord is used for import / export via genesis json. */
export interface ValidatorSlashEventRecord {
    /** validator_address is the address of the validator. */
    validatorAddress: string;
    /** height defines the block height at which the slash event occurred. */
    height: number;
    /** period is the period of the slash event. */
    period: number;
    /** validator_slash_event describes the slash event. */
    validatorSlashEvent: ValidatorSlashEvent | undefined;
}
/** GenesisState defines the distribution module's genesis state. */
export interface GenesisState {
    /** params defines all the parameters of the module. */
    params: Params | undefined;
    /** fee_pool defines the fee pool at genesis. */
    feePool: FeePool | undefined;
    /** fee_pool defines the delegator withdraw infos at genesis. */
    delegatorWithdrawInfos: DelegatorWithdrawInfo[];
    /** fee_pool defines the previous proposer at genesis. */
    previousProposer: string;
    /** fee_pool defines the outstanding rewards of all validators at genesis. */
    outstandingRewards: ValidatorOutstandingRewardsRecord[];
    /** fee_pool defines the accumulated commissions of all validators at genesis. */
    validatorAccumulatedCommissions: ValidatorAccumulatedCommissionRecord[];
    /** fee_pool defines the historical rewards of all validators at genesis. */
    validatorHistoricalRewards: ValidatorHistoricalRewardsRecord[];
    /** fee_pool defines the current rewards of all validators at genesis. */
    validatorCurrentRewards: ValidatorCurrentRewardsRecord[];
    /** fee_pool defines the delegator starting infos at genesis. */
    delegatorStartingInfos: DelegatorStartingInfoRecord[];
    /** fee_pool defines the validator slash events at genesis. */
    validatorSlashEvents: ValidatorSlashEventRecord[];
}
export declare const DelegatorWithdrawInfo: {
    encode(message: DelegatorWithdrawInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DelegatorWithdrawInfo;
    fromJSON(object: any): DelegatorWithdrawInfo;
    toJSON(message: DelegatorWithdrawInfo): unknown;
    create<I extends {
        delegatorAddress?: string;
        withdrawAddress?: string;
    } & {
        delegatorAddress?: string;
        withdrawAddress?: string;
    } & { [K in Exclude<keyof I, keyof DelegatorWithdrawInfo>]: never; }>(base?: I): DelegatorWithdrawInfo;
    fromPartial<I_1 extends {
        delegatorAddress?: string;
        withdrawAddress?: string;
    } & {
        delegatorAddress?: string;
        withdrawAddress?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof DelegatorWithdrawInfo>]: never; }>(object: I_1): DelegatorWithdrawInfo;
};
export declare const ValidatorOutstandingRewardsRecord: {
    encode(message: ValidatorOutstandingRewardsRecord, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorOutstandingRewardsRecord;
    fromJSON(object: any): ValidatorOutstandingRewardsRecord;
    toJSON(message: ValidatorOutstandingRewardsRecord): unknown;
    create<I extends {
        validatorAddress?: string;
        outstandingRewards?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        validatorAddress?: string;
        outstandingRewards?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["outstandingRewards"][number], keyof DecCoin>]: never; })[] & { [K_1 in Exclude<keyof I["outstandingRewards"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof ValidatorOutstandingRewardsRecord>]: never; }>(base?: I): ValidatorOutstandingRewardsRecord;
    fromPartial<I_1 extends {
        validatorAddress?: string;
        outstandingRewards?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        validatorAddress?: string;
        outstandingRewards?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_3 in Exclude<keyof I_1["outstandingRewards"][number], keyof DecCoin>]: never; })[] & { [K_4 in Exclude<keyof I_1["outstandingRewards"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof ValidatorOutstandingRewardsRecord>]: never; }>(object: I_1): ValidatorOutstandingRewardsRecord;
};
export declare const ValidatorAccumulatedCommissionRecord: {
    encode(message: ValidatorAccumulatedCommissionRecord, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorAccumulatedCommissionRecord;
    fromJSON(object: any): ValidatorAccumulatedCommissionRecord;
    toJSON(message: ValidatorAccumulatedCommissionRecord): unknown;
    create<I extends {
        validatorAddress?: string;
        accumulated?: {
            commission?: {
                denom?: string;
                amount?: string;
            }[];
        };
    } & {
        validatorAddress?: string;
        accumulated?: {
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
            } & { [K in Exclude<keyof I["accumulated"]["commission"][number], keyof DecCoin>]: never; })[] & { [K_1 in Exclude<keyof I["accumulated"]["commission"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
        } & { [K_2 in Exclude<keyof I["accumulated"], "commission">]: never; };
    } & { [K_3 in Exclude<keyof I, keyof ValidatorAccumulatedCommissionRecord>]: never; }>(base?: I): ValidatorAccumulatedCommissionRecord;
    fromPartial<I_1 extends {
        validatorAddress?: string;
        accumulated?: {
            commission?: {
                denom?: string;
                amount?: string;
            }[];
        };
    } & {
        validatorAddress?: string;
        accumulated?: {
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
            } & { [K_4 in Exclude<keyof I_1["accumulated"]["commission"][number], keyof DecCoin>]: never; })[] & { [K_5 in Exclude<keyof I_1["accumulated"]["commission"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
        } & { [K_6 in Exclude<keyof I_1["accumulated"], "commission">]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof ValidatorAccumulatedCommissionRecord>]: never; }>(object: I_1): ValidatorAccumulatedCommissionRecord;
};
export declare const ValidatorHistoricalRewardsRecord: {
    encode(message: ValidatorHistoricalRewardsRecord, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorHistoricalRewardsRecord;
    fromJSON(object: any): ValidatorHistoricalRewardsRecord;
    toJSON(message: ValidatorHistoricalRewardsRecord): unknown;
    create<I extends {
        validatorAddress?: string;
        period?: number;
        rewards?: {
            cumulativeRewardRatio?: {
                denom?: string;
                amount?: string;
            }[];
            referenceCount?: number;
        };
    } & {
        validatorAddress?: string;
        period?: number;
        rewards?: {
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
            } & { [K in Exclude<keyof I["rewards"]["cumulativeRewardRatio"][number], keyof DecCoin>]: never; })[] & { [K_1 in Exclude<keyof I["rewards"]["cumulativeRewardRatio"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            referenceCount?: number;
        } & { [K_2 in Exclude<keyof I["rewards"], keyof ValidatorHistoricalRewards>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof ValidatorHistoricalRewardsRecord>]: never; }>(base?: I): ValidatorHistoricalRewardsRecord;
    fromPartial<I_1 extends {
        validatorAddress?: string;
        period?: number;
        rewards?: {
            cumulativeRewardRatio?: {
                denom?: string;
                amount?: string;
            }[];
            referenceCount?: number;
        };
    } & {
        validatorAddress?: string;
        period?: number;
        rewards?: {
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
            } & { [K_4 in Exclude<keyof I_1["rewards"]["cumulativeRewardRatio"][number], keyof DecCoin>]: never; })[] & { [K_5 in Exclude<keyof I_1["rewards"]["cumulativeRewardRatio"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            referenceCount?: number;
        } & { [K_6 in Exclude<keyof I_1["rewards"], keyof ValidatorHistoricalRewards>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof ValidatorHistoricalRewardsRecord>]: never; }>(object: I_1): ValidatorHistoricalRewardsRecord;
};
export declare const ValidatorCurrentRewardsRecord: {
    encode(message: ValidatorCurrentRewardsRecord, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorCurrentRewardsRecord;
    fromJSON(object: any): ValidatorCurrentRewardsRecord;
    toJSON(message: ValidatorCurrentRewardsRecord): unknown;
    create<I extends {
        validatorAddress?: string;
        rewards?: {
            rewards?: {
                denom?: string;
                amount?: string;
            }[];
            period?: number;
        };
    } & {
        validatorAddress?: string;
        rewards?: {
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
            } & { [K in Exclude<keyof I["rewards"]["rewards"][number], keyof DecCoin>]: never; })[] & { [K_1 in Exclude<keyof I["rewards"]["rewards"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            period?: number;
        } & { [K_2 in Exclude<keyof I["rewards"], keyof ValidatorCurrentRewards>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof ValidatorCurrentRewardsRecord>]: never; }>(base?: I): ValidatorCurrentRewardsRecord;
    fromPartial<I_1 extends {
        validatorAddress?: string;
        rewards?: {
            rewards?: {
                denom?: string;
                amount?: string;
            }[];
            period?: number;
        };
    } & {
        validatorAddress?: string;
        rewards?: {
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
            } & { [K_4 in Exclude<keyof I_1["rewards"]["rewards"][number], keyof DecCoin>]: never; })[] & { [K_5 in Exclude<keyof I_1["rewards"]["rewards"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            period?: number;
        } & { [K_6 in Exclude<keyof I_1["rewards"], keyof ValidatorCurrentRewards>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof ValidatorCurrentRewardsRecord>]: never; }>(object: I_1): ValidatorCurrentRewardsRecord;
};
export declare const DelegatorStartingInfoRecord: {
    encode(message: DelegatorStartingInfoRecord, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DelegatorStartingInfoRecord;
    fromJSON(object: any): DelegatorStartingInfoRecord;
    toJSON(message: DelegatorStartingInfoRecord): unknown;
    create<I extends {
        delegatorAddress?: string;
        validatorAddress?: string;
        startingInfo?: {
            previousPeriod?: number;
            stake?: string;
            height?: number;
        };
    } & {
        delegatorAddress?: string;
        validatorAddress?: string;
        startingInfo?: {
            previousPeriod?: number;
            stake?: string;
            height?: number;
        } & {
            previousPeriod?: number;
            stake?: string;
            height?: number;
        } & { [K in Exclude<keyof I["startingInfo"], keyof DelegatorStartingInfo>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof DelegatorStartingInfoRecord>]: never; }>(base?: I): DelegatorStartingInfoRecord;
    fromPartial<I_1 extends {
        delegatorAddress?: string;
        validatorAddress?: string;
        startingInfo?: {
            previousPeriod?: number;
            stake?: string;
            height?: number;
        };
    } & {
        delegatorAddress?: string;
        validatorAddress?: string;
        startingInfo?: {
            previousPeriod?: number;
            stake?: string;
            height?: number;
        } & {
            previousPeriod?: number;
            stake?: string;
            height?: number;
        } & { [K_2 in Exclude<keyof I_1["startingInfo"], keyof DelegatorStartingInfo>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof DelegatorStartingInfoRecord>]: never; }>(object: I_1): DelegatorStartingInfoRecord;
};
export declare const ValidatorSlashEventRecord: {
    encode(message: ValidatorSlashEventRecord, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorSlashEventRecord;
    fromJSON(object: any): ValidatorSlashEventRecord;
    toJSON(message: ValidatorSlashEventRecord): unknown;
    create<I extends {
        validatorAddress?: string;
        height?: number;
        period?: number;
        validatorSlashEvent?: {
            validatorPeriod?: number;
            fraction?: string;
        };
    } & {
        validatorAddress?: string;
        height?: number;
        period?: number;
        validatorSlashEvent?: {
            validatorPeriod?: number;
            fraction?: string;
        } & {
            validatorPeriod?: number;
            fraction?: string;
        } & { [K in Exclude<keyof I["validatorSlashEvent"], keyof ValidatorSlashEvent>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof ValidatorSlashEventRecord>]: never; }>(base?: I): ValidatorSlashEventRecord;
    fromPartial<I_1 extends {
        validatorAddress?: string;
        height?: number;
        period?: number;
        validatorSlashEvent?: {
            validatorPeriod?: number;
            fraction?: string;
        };
    } & {
        validatorAddress?: string;
        height?: number;
        period?: number;
        validatorSlashEvent?: {
            validatorPeriod?: number;
            fraction?: string;
        } & {
            validatorPeriod?: number;
            fraction?: string;
        } & { [K_2 in Exclude<keyof I_1["validatorSlashEvent"], keyof ValidatorSlashEvent>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof ValidatorSlashEventRecord>]: never; }>(object: I_1): ValidatorSlashEventRecord;
};
export declare const GenesisState: {
    encode(message: GenesisState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    create<I extends {
        params?: {
            communityTax?: string;
            baseProposerReward?: string;
            bonusProposerReward?: string;
            withdrawAddrEnabled?: boolean;
        };
        feePool?: {
            communityPool?: {
                denom?: string;
                amount?: string;
            }[];
        };
        delegatorWithdrawInfos?: {
            delegatorAddress?: string;
            withdrawAddress?: string;
        }[];
        previousProposer?: string;
        outstandingRewards?: {
            validatorAddress?: string;
            outstandingRewards?: {
                denom?: string;
                amount?: string;
            }[];
        }[];
        validatorAccumulatedCommissions?: {
            validatorAddress?: string;
            accumulated?: {
                commission?: {
                    denom?: string;
                    amount?: string;
                }[];
            };
        }[];
        validatorHistoricalRewards?: {
            validatorAddress?: string;
            period?: number;
            rewards?: {
                cumulativeRewardRatio?: {
                    denom?: string;
                    amount?: string;
                }[];
                referenceCount?: number;
            };
        }[];
        validatorCurrentRewards?: {
            validatorAddress?: string;
            rewards?: {
                rewards?: {
                    denom?: string;
                    amount?: string;
                }[];
                period?: number;
            };
        }[];
        delegatorStartingInfos?: {
            delegatorAddress?: string;
            validatorAddress?: string;
            startingInfo?: {
                previousPeriod?: number;
                stake?: string;
                height?: number;
            };
        }[];
        validatorSlashEvents?: {
            validatorAddress?: string;
            height?: number;
            period?: number;
            validatorSlashEvent?: {
                validatorPeriod?: number;
                fraction?: string;
            };
        }[];
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
        feePool?: {
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
            } & { [K_1 in Exclude<keyof I["feePool"]["communityPool"][number], keyof DecCoin>]: never; })[] & { [K_2 in Exclude<keyof I["feePool"]["communityPool"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
        } & { [K_3 in Exclude<keyof I["feePool"], "communityPool">]: never; };
        delegatorWithdrawInfos?: {
            delegatorAddress?: string;
            withdrawAddress?: string;
        }[] & ({
            delegatorAddress?: string;
            withdrawAddress?: string;
        } & {
            delegatorAddress?: string;
            withdrawAddress?: string;
        } & { [K_4 in Exclude<keyof I["delegatorWithdrawInfos"][number], keyof DelegatorWithdrawInfo>]: never; })[] & { [K_5 in Exclude<keyof I["delegatorWithdrawInfos"], keyof {
            delegatorAddress?: string;
            withdrawAddress?: string;
        }[]>]: never; };
        previousProposer?: string;
        outstandingRewards?: {
            validatorAddress?: string;
            outstandingRewards?: {
                denom?: string;
                amount?: string;
            }[];
        }[] & ({
            validatorAddress?: string;
            outstandingRewards?: {
                denom?: string;
                amount?: string;
            }[];
        } & {
            validatorAddress?: string;
            outstandingRewards?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_6 in Exclude<keyof I["outstandingRewards"][number]["outstandingRewards"][number], keyof DecCoin>]: never; })[] & { [K_7 in Exclude<keyof I["outstandingRewards"][number]["outstandingRewards"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
        } & { [K_8 in Exclude<keyof I["outstandingRewards"][number], keyof ValidatorOutstandingRewardsRecord>]: never; })[] & { [K_9 in Exclude<keyof I["outstandingRewards"], keyof {
            validatorAddress?: string;
            outstandingRewards?: {
                denom?: string;
                amount?: string;
            }[];
        }[]>]: never; };
        validatorAccumulatedCommissions?: {
            validatorAddress?: string;
            accumulated?: {
                commission?: {
                    denom?: string;
                    amount?: string;
                }[];
            };
        }[] & ({
            validatorAddress?: string;
            accumulated?: {
                commission?: {
                    denom?: string;
                    amount?: string;
                }[];
            };
        } & {
            validatorAddress?: string;
            accumulated?: {
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
                } & { [K_10 in Exclude<keyof I["validatorAccumulatedCommissions"][number]["accumulated"]["commission"][number], keyof DecCoin>]: never; })[] & { [K_11 in Exclude<keyof I["validatorAccumulatedCommissions"][number]["accumulated"]["commission"], keyof {
                    denom?: string;
                    amount?: string;
                }[]>]: never; };
            } & { [K_12 in Exclude<keyof I["validatorAccumulatedCommissions"][number]["accumulated"], "commission">]: never; };
        } & { [K_13 in Exclude<keyof I["validatorAccumulatedCommissions"][number], keyof ValidatorAccumulatedCommissionRecord>]: never; })[] & { [K_14 in Exclude<keyof I["validatorAccumulatedCommissions"], keyof {
            validatorAddress?: string;
            accumulated?: {
                commission?: {
                    denom?: string;
                    amount?: string;
                }[];
            };
        }[]>]: never; };
        validatorHistoricalRewards?: {
            validatorAddress?: string;
            period?: number;
            rewards?: {
                cumulativeRewardRatio?: {
                    denom?: string;
                    amount?: string;
                }[];
                referenceCount?: number;
            };
        }[] & ({
            validatorAddress?: string;
            period?: number;
            rewards?: {
                cumulativeRewardRatio?: {
                    denom?: string;
                    amount?: string;
                }[];
                referenceCount?: number;
            };
        } & {
            validatorAddress?: string;
            period?: number;
            rewards?: {
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
                } & { [K_15 in Exclude<keyof I["validatorHistoricalRewards"][number]["rewards"]["cumulativeRewardRatio"][number], keyof DecCoin>]: never; })[] & { [K_16 in Exclude<keyof I["validatorHistoricalRewards"][number]["rewards"]["cumulativeRewardRatio"], keyof {
                    denom?: string;
                    amount?: string;
                }[]>]: never; };
                referenceCount?: number;
            } & { [K_17 in Exclude<keyof I["validatorHistoricalRewards"][number]["rewards"], keyof ValidatorHistoricalRewards>]: never; };
        } & { [K_18 in Exclude<keyof I["validatorHistoricalRewards"][number], keyof ValidatorHistoricalRewardsRecord>]: never; })[] & { [K_19 in Exclude<keyof I["validatorHistoricalRewards"], keyof {
            validatorAddress?: string;
            period?: number;
            rewards?: {
                cumulativeRewardRatio?: {
                    denom?: string;
                    amount?: string;
                }[];
                referenceCount?: number;
            };
        }[]>]: never; };
        validatorCurrentRewards?: {
            validatorAddress?: string;
            rewards?: {
                rewards?: {
                    denom?: string;
                    amount?: string;
                }[];
                period?: number;
            };
        }[] & ({
            validatorAddress?: string;
            rewards?: {
                rewards?: {
                    denom?: string;
                    amount?: string;
                }[];
                period?: number;
            };
        } & {
            validatorAddress?: string;
            rewards?: {
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
                } & { [K_20 in Exclude<keyof I["validatorCurrentRewards"][number]["rewards"]["rewards"][number], keyof DecCoin>]: never; })[] & { [K_21 in Exclude<keyof I["validatorCurrentRewards"][number]["rewards"]["rewards"], keyof {
                    denom?: string;
                    amount?: string;
                }[]>]: never; };
                period?: number;
            } & { [K_22 in Exclude<keyof I["validatorCurrentRewards"][number]["rewards"], keyof ValidatorCurrentRewards>]: never; };
        } & { [K_23 in Exclude<keyof I["validatorCurrentRewards"][number], keyof ValidatorCurrentRewardsRecord>]: never; })[] & { [K_24 in Exclude<keyof I["validatorCurrentRewards"], keyof {
            validatorAddress?: string;
            rewards?: {
                rewards?: {
                    denom?: string;
                    amount?: string;
                }[];
                period?: number;
            };
        }[]>]: never; };
        delegatorStartingInfos?: {
            delegatorAddress?: string;
            validatorAddress?: string;
            startingInfo?: {
                previousPeriod?: number;
                stake?: string;
                height?: number;
            };
        }[] & ({
            delegatorAddress?: string;
            validatorAddress?: string;
            startingInfo?: {
                previousPeriod?: number;
                stake?: string;
                height?: number;
            };
        } & {
            delegatorAddress?: string;
            validatorAddress?: string;
            startingInfo?: {
                previousPeriod?: number;
                stake?: string;
                height?: number;
            } & {
                previousPeriod?: number;
                stake?: string;
                height?: number;
            } & { [K_25 in Exclude<keyof I["delegatorStartingInfos"][number]["startingInfo"], keyof DelegatorStartingInfo>]: never; };
        } & { [K_26 in Exclude<keyof I["delegatorStartingInfos"][number], keyof DelegatorStartingInfoRecord>]: never; })[] & { [K_27 in Exclude<keyof I["delegatorStartingInfos"], keyof {
            delegatorAddress?: string;
            validatorAddress?: string;
            startingInfo?: {
                previousPeriod?: number;
                stake?: string;
                height?: number;
            };
        }[]>]: never; };
        validatorSlashEvents?: {
            validatorAddress?: string;
            height?: number;
            period?: number;
            validatorSlashEvent?: {
                validatorPeriod?: number;
                fraction?: string;
            };
        }[] & ({
            validatorAddress?: string;
            height?: number;
            period?: number;
            validatorSlashEvent?: {
                validatorPeriod?: number;
                fraction?: string;
            };
        } & {
            validatorAddress?: string;
            height?: number;
            period?: number;
            validatorSlashEvent?: {
                validatorPeriod?: number;
                fraction?: string;
            } & {
                validatorPeriod?: number;
                fraction?: string;
            } & { [K_28 in Exclude<keyof I["validatorSlashEvents"][number]["validatorSlashEvent"], keyof ValidatorSlashEvent>]: never; };
        } & { [K_29 in Exclude<keyof I["validatorSlashEvents"][number], keyof ValidatorSlashEventRecord>]: never; })[] & { [K_30 in Exclude<keyof I["validatorSlashEvents"], keyof {
            validatorAddress?: string;
            height?: number;
            period?: number;
            validatorSlashEvent?: {
                validatorPeriod?: number;
                fraction?: string;
            };
        }[]>]: never; };
    } & { [K_31 in Exclude<keyof I, keyof GenesisState>]: never; }>(base?: I): GenesisState;
    fromPartial<I_1 extends {
        params?: {
            communityTax?: string;
            baseProposerReward?: string;
            bonusProposerReward?: string;
            withdrawAddrEnabled?: boolean;
        };
        feePool?: {
            communityPool?: {
                denom?: string;
                amount?: string;
            }[];
        };
        delegatorWithdrawInfos?: {
            delegatorAddress?: string;
            withdrawAddress?: string;
        }[];
        previousProposer?: string;
        outstandingRewards?: {
            validatorAddress?: string;
            outstandingRewards?: {
                denom?: string;
                amount?: string;
            }[];
        }[];
        validatorAccumulatedCommissions?: {
            validatorAddress?: string;
            accumulated?: {
                commission?: {
                    denom?: string;
                    amount?: string;
                }[];
            };
        }[];
        validatorHistoricalRewards?: {
            validatorAddress?: string;
            period?: number;
            rewards?: {
                cumulativeRewardRatio?: {
                    denom?: string;
                    amount?: string;
                }[];
                referenceCount?: number;
            };
        }[];
        validatorCurrentRewards?: {
            validatorAddress?: string;
            rewards?: {
                rewards?: {
                    denom?: string;
                    amount?: string;
                }[];
                period?: number;
            };
        }[];
        delegatorStartingInfos?: {
            delegatorAddress?: string;
            validatorAddress?: string;
            startingInfo?: {
                previousPeriod?: number;
                stake?: string;
                height?: number;
            };
        }[];
        validatorSlashEvents?: {
            validatorAddress?: string;
            height?: number;
            period?: number;
            validatorSlashEvent?: {
                validatorPeriod?: number;
                fraction?: string;
            };
        }[];
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
        } & { [K_32 in Exclude<keyof I_1["params"], keyof Params>]: never; };
        feePool?: {
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
            } & { [K_33 in Exclude<keyof I_1["feePool"]["communityPool"][number], keyof DecCoin>]: never; })[] & { [K_34 in Exclude<keyof I_1["feePool"]["communityPool"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
        } & { [K_35 in Exclude<keyof I_1["feePool"], "communityPool">]: never; };
        delegatorWithdrawInfos?: {
            delegatorAddress?: string;
            withdrawAddress?: string;
        }[] & ({
            delegatorAddress?: string;
            withdrawAddress?: string;
        } & {
            delegatorAddress?: string;
            withdrawAddress?: string;
        } & { [K_36 in Exclude<keyof I_1["delegatorWithdrawInfos"][number], keyof DelegatorWithdrawInfo>]: never; })[] & { [K_37 in Exclude<keyof I_1["delegatorWithdrawInfos"], keyof {
            delegatorAddress?: string;
            withdrawAddress?: string;
        }[]>]: never; };
        previousProposer?: string;
        outstandingRewards?: {
            validatorAddress?: string;
            outstandingRewards?: {
                denom?: string;
                amount?: string;
            }[];
        }[] & ({
            validatorAddress?: string;
            outstandingRewards?: {
                denom?: string;
                amount?: string;
            }[];
        } & {
            validatorAddress?: string;
            outstandingRewards?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_38 in Exclude<keyof I_1["outstandingRewards"][number]["outstandingRewards"][number], keyof DecCoin>]: never; })[] & { [K_39 in Exclude<keyof I_1["outstandingRewards"][number]["outstandingRewards"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
        } & { [K_40 in Exclude<keyof I_1["outstandingRewards"][number], keyof ValidatorOutstandingRewardsRecord>]: never; })[] & { [K_41 in Exclude<keyof I_1["outstandingRewards"], keyof {
            validatorAddress?: string;
            outstandingRewards?: {
                denom?: string;
                amount?: string;
            }[];
        }[]>]: never; };
        validatorAccumulatedCommissions?: {
            validatorAddress?: string;
            accumulated?: {
                commission?: {
                    denom?: string;
                    amount?: string;
                }[];
            };
        }[] & ({
            validatorAddress?: string;
            accumulated?: {
                commission?: {
                    denom?: string;
                    amount?: string;
                }[];
            };
        } & {
            validatorAddress?: string;
            accumulated?: {
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
                } & { [K_42 in Exclude<keyof I_1["validatorAccumulatedCommissions"][number]["accumulated"]["commission"][number], keyof DecCoin>]: never; })[] & { [K_43 in Exclude<keyof I_1["validatorAccumulatedCommissions"][number]["accumulated"]["commission"], keyof {
                    denom?: string;
                    amount?: string;
                }[]>]: never; };
            } & { [K_44 in Exclude<keyof I_1["validatorAccumulatedCommissions"][number]["accumulated"], "commission">]: never; };
        } & { [K_45 in Exclude<keyof I_1["validatorAccumulatedCommissions"][number], keyof ValidatorAccumulatedCommissionRecord>]: never; })[] & { [K_46 in Exclude<keyof I_1["validatorAccumulatedCommissions"], keyof {
            validatorAddress?: string;
            accumulated?: {
                commission?: {
                    denom?: string;
                    amount?: string;
                }[];
            };
        }[]>]: never; };
        validatorHistoricalRewards?: {
            validatorAddress?: string;
            period?: number;
            rewards?: {
                cumulativeRewardRatio?: {
                    denom?: string;
                    amount?: string;
                }[];
                referenceCount?: number;
            };
        }[] & ({
            validatorAddress?: string;
            period?: number;
            rewards?: {
                cumulativeRewardRatio?: {
                    denom?: string;
                    amount?: string;
                }[];
                referenceCount?: number;
            };
        } & {
            validatorAddress?: string;
            period?: number;
            rewards?: {
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
                } & { [K_47 in Exclude<keyof I_1["validatorHistoricalRewards"][number]["rewards"]["cumulativeRewardRatio"][number], keyof DecCoin>]: never; })[] & { [K_48 in Exclude<keyof I_1["validatorHistoricalRewards"][number]["rewards"]["cumulativeRewardRatio"], keyof {
                    denom?: string;
                    amount?: string;
                }[]>]: never; };
                referenceCount?: number;
            } & { [K_49 in Exclude<keyof I_1["validatorHistoricalRewards"][number]["rewards"], keyof ValidatorHistoricalRewards>]: never; };
        } & { [K_50 in Exclude<keyof I_1["validatorHistoricalRewards"][number], keyof ValidatorHistoricalRewardsRecord>]: never; })[] & { [K_51 in Exclude<keyof I_1["validatorHistoricalRewards"], keyof {
            validatorAddress?: string;
            period?: number;
            rewards?: {
                cumulativeRewardRatio?: {
                    denom?: string;
                    amount?: string;
                }[];
                referenceCount?: number;
            };
        }[]>]: never; };
        validatorCurrentRewards?: {
            validatorAddress?: string;
            rewards?: {
                rewards?: {
                    denom?: string;
                    amount?: string;
                }[];
                period?: number;
            };
        }[] & ({
            validatorAddress?: string;
            rewards?: {
                rewards?: {
                    denom?: string;
                    amount?: string;
                }[];
                period?: number;
            };
        } & {
            validatorAddress?: string;
            rewards?: {
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
                } & { [K_52 in Exclude<keyof I_1["validatorCurrentRewards"][number]["rewards"]["rewards"][number], keyof DecCoin>]: never; })[] & { [K_53 in Exclude<keyof I_1["validatorCurrentRewards"][number]["rewards"]["rewards"], keyof {
                    denom?: string;
                    amount?: string;
                }[]>]: never; };
                period?: number;
            } & { [K_54 in Exclude<keyof I_1["validatorCurrentRewards"][number]["rewards"], keyof ValidatorCurrentRewards>]: never; };
        } & { [K_55 in Exclude<keyof I_1["validatorCurrentRewards"][number], keyof ValidatorCurrentRewardsRecord>]: never; })[] & { [K_56 in Exclude<keyof I_1["validatorCurrentRewards"], keyof {
            validatorAddress?: string;
            rewards?: {
                rewards?: {
                    denom?: string;
                    amount?: string;
                }[];
                period?: number;
            };
        }[]>]: never; };
        delegatorStartingInfos?: {
            delegatorAddress?: string;
            validatorAddress?: string;
            startingInfo?: {
                previousPeriod?: number;
                stake?: string;
                height?: number;
            };
        }[] & ({
            delegatorAddress?: string;
            validatorAddress?: string;
            startingInfo?: {
                previousPeriod?: number;
                stake?: string;
                height?: number;
            };
        } & {
            delegatorAddress?: string;
            validatorAddress?: string;
            startingInfo?: {
                previousPeriod?: number;
                stake?: string;
                height?: number;
            } & {
                previousPeriod?: number;
                stake?: string;
                height?: number;
            } & { [K_57 in Exclude<keyof I_1["delegatorStartingInfos"][number]["startingInfo"], keyof DelegatorStartingInfo>]: never; };
        } & { [K_58 in Exclude<keyof I_1["delegatorStartingInfos"][number], keyof DelegatorStartingInfoRecord>]: never; })[] & { [K_59 in Exclude<keyof I_1["delegatorStartingInfos"], keyof {
            delegatorAddress?: string;
            validatorAddress?: string;
            startingInfo?: {
                previousPeriod?: number;
                stake?: string;
                height?: number;
            };
        }[]>]: never; };
        validatorSlashEvents?: {
            validatorAddress?: string;
            height?: number;
            period?: number;
            validatorSlashEvent?: {
                validatorPeriod?: number;
                fraction?: string;
            };
        }[] & ({
            validatorAddress?: string;
            height?: number;
            period?: number;
            validatorSlashEvent?: {
                validatorPeriod?: number;
                fraction?: string;
            };
        } & {
            validatorAddress?: string;
            height?: number;
            period?: number;
            validatorSlashEvent?: {
                validatorPeriod?: number;
                fraction?: string;
            } & {
                validatorPeriod?: number;
                fraction?: string;
            } & { [K_60 in Exclude<keyof I_1["validatorSlashEvents"][number]["validatorSlashEvent"], keyof ValidatorSlashEvent>]: never; };
        } & { [K_61 in Exclude<keyof I_1["validatorSlashEvents"][number], keyof ValidatorSlashEventRecord>]: never; })[] & { [K_62 in Exclude<keyof I_1["validatorSlashEvents"], keyof {
            validatorAddress?: string;
            height?: number;
            period?: number;
            validatorSlashEvent?: {
                validatorPeriod?: number;
                fraction?: string;
            };
        }[]>]: never; };
    } & { [K_63 in Exclude<keyof I_1, keyof GenesisState>]: never; }>(object: I_1): GenesisState;
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
