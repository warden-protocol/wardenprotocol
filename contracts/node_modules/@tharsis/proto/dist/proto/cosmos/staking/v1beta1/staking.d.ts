import * as dependency_2 from "./../../../google/protobuf/any";
import * as dependency_3 from "./../../../google/protobuf/duration";
import * as dependency_4 from "./../../../google/protobuf/timestamp";
import * as dependency_6 from "./../../base/v1beta1/coin";
import * as dependency_7 from "./../../../tendermint/types/types";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.staking.v1beta1 {
    enum BondStatus {
        BOND_STATUS_UNSPECIFIED = 0,
        BOND_STATUS_UNBONDED = 1,
        BOND_STATUS_UNBONDING = 2,
        BOND_STATUS_BONDED = 3
    }
    class HistoricalInfo extends pb_1.Message {
        constructor(data?: any[] | {
            header?: dependency_7.tendermint.types.Header;
            valset?: Validator[];
        });
        get header(): dependency_7.tendermint.types.Header;
        set header(value: dependency_7.tendermint.types.Header);
        get valset(): Validator[];
        set valset(value: Validator[]);
        static fromObject(data: {
            header?: ReturnType<typeof dependency_7.tendermint.types.Header.prototype.toObject>;
            valset?: ReturnType<typeof Validator.prototype.toObject>[];
        }): HistoricalInfo;
        toObject(): {
            header?: {
                version?: {
                    block?: number | undefined;
                    app?: number | undefined;
                } | undefined;
                chain_id?: string | undefined;
                height?: number | undefined;
                time?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                last_block_id?: {
                    hash?: Uint8Array | undefined;
                    part_set_header?: {
                        total?: number | undefined;
                        hash?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                last_commit_hash?: Uint8Array | undefined;
                data_hash?: Uint8Array | undefined;
                validators_hash?: Uint8Array | undefined;
                next_validators_hash?: Uint8Array | undefined;
                consensus_hash?: Uint8Array | undefined;
                app_hash?: Uint8Array | undefined;
                last_results_hash?: Uint8Array | undefined;
                evidence_hash?: Uint8Array | undefined;
                proposer_address?: Uint8Array | undefined;
            } | undefined;
            valset?: {
                operator_address?: string | undefined;
                consensus_pubkey?: {
                    type_url?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
                jailed?: boolean | undefined;
                status?: BondStatus | undefined;
                tokens?: string | undefined;
                delegator_shares?: string | undefined;
                description?: {
                    moniker?: string | undefined;
                    identity?: string | undefined;
                    website?: string | undefined;
                    security_contact?: string | undefined;
                    details?: string | undefined;
                } | undefined;
                unbonding_height?: number | undefined;
                unbonding_time?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                commission?: {
                    commission_rates?: {
                        rate?: string | undefined;
                        max_rate?: string | undefined;
                        max_change_rate?: string | undefined;
                    } | undefined;
                    update_time?: {
                        seconds?: number | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                } | undefined;
                min_self_delegation?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): HistoricalInfo;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): HistoricalInfo;
    }
    class CommissionRates extends pb_1.Message {
        constructor(data?: any[] | {
            rate?: string;
            max_rate?: string;
            max_change_rate?: string;
        });
        get rate(): string;
        set rate(value: string);
        get max_rate(): string;
        set max_rate(value: string);
        get max_change_rate(): string;
        set max_change_rate(value: string);
        static fromObject(data: {
            rate?: string;
            max_rate?: string;
            max_change_rate?: string;
        }): CommissionRates;
        toObject(): {
            rate?: string | undefined;
            max_rate?: string | undefined;
            max_change_rate?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CommissionRates;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): CommissionRates;
    }
    class Commission extends pb_1.Message {
        constructor(data?: any[] | {
            commission_rates?: CommissionRates;
            update_time?: dependency_4.google.protobuf.Timestamp;
        });
        get commission_rates(): CommissionRates;
        set commission_rates(value: CommissionRates);
        get update_time(): dependency_4.google.protobuf.Timestamp;
        set update_time(value: dependency_4.google.protobuf.Timestamp);
        static fromObject(data: {
            commission_rates?: ReturnType<typeof CommissionRates.prototype.toObject>;
            update_time?: ReturnType<typeof dependency_4.google.protobuf.Timestamp.prototype.toObject>;
        }): Commission;
        toObject(): {
            commission_rates?: {
                rate?: string | undefined;
                max_rate?: string | undefined;
                max_change_rate?: string | undefined;
            } | undefined;
            update_time?: {
                seconds?: number | undefined;
                nanos?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Commission;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Commission;
    }
    class Description extends pb_1.Message {
        constructor(data?: any[] | {
            moniker?: string;
            identity?: string;
            website?: string;
            security_contact?: string;
            details?: string;
        });
        get moniker(): string;
        set moniker(value: string);
        get identity(): string;
        set identity(value: string);
        get website(): string;
        set website(value: string);
        get security_contact(): string;
        set security_contact(value: string);
        get details(): string;
        set details(value: string);
        static fromObject(data: {
            moniker?: string;
            identity?: string;
            website?: string;
            security_contact?: string;
            details?: string;
        }): Description;
        toObject(): {
            moniker?: string | undefined;
            identity?: string | undefined;
            website?: string | undefined;
            security_contact?: string | undefined;
            details?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Description;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Description;
    }
    class Validator extends pb_1.Message {
        constructor(data?: any[] | {
            operator_address?: string;
            consensus_pubkey?: dependency_2.google.protobuf.Any;
            jailed?: boolean;
            status?: BondStatus;
            tokens?: string;
            delegator_shares?: string;
            description?: Description;
            unbonding_height?: number;
            unbonding_time?: dependency_4.google.protobuf.Timestamp;
            commission?: Commission;
            min_self_delegation?: string;
        });
        get operator_address(): string;
        set operator_address(value: string);
        get consensus_pubkey(): dependency_2.google.protobuf.Any;
        set consensus_pubkey(value: dependency_2.google.protobuf.Any);
        get jailed(): boolean;
        set jailed(value: boolean);
        get status(): BondStatus;
        set status(value: BondStatus);
        get tokens(): string;
        set tokens(value: string);
        get delegator_shares(): string;
        set delegator_shares(value: string);
        get description(): Description;
        set description(value: Description);
        get unbonding_height(): number;
        set unbonding_height(value: number);
        get unbonding_time(): dependency_4.google.protobuf.Timestamp;
        set unbonding_time(value: dependency_4.google.protobuf.Timestamp);
        get commission(): Commission;
        set commission(value: Commission);
        get min_self_delegation(): string;
        set min_self_delegation(value: string);
        static fromObject(data: {
            operator_address?: string;
            consensus_pubkey?: ReturnType<typeof dependency_2.google.protobuf.Any.prototype.toObject>;
            jailed?: boolean;
            status?: BondStatus;
            tokens?: string;
            delegator_shares?: string;
            description?: ReturnType<typeof Description.prototype.toObject>;
            unbonding_height?: number;
            unbonding_time?: ReturnType<typeof dependency_4.google.protobuf.Timestamp.prototype.toObject>;
            commission?: ReturnType<typeof Commission.prototype.toObject>;
            min_self_delegation?: string;
        }): Validator;
        toObject(): {
            operator_address?: string | undefined;
            consensus_pubkey?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            jailed?: boolean | undefined;
            status?: BondStatus | undefined;
            tokens?: string | undefined;
            delegator_shares?: string | undefined;
            description?: {
                moniker?: string | undefined;
                identity?: string | undefined;
                website?: string | undefined;
                security_contact?: string | undefined;
                details?: string | undefined;
            } | undefined;
            unbonding_height?: number | undefined;
            unbonding_time?: {
                seconds?: number | undefined;
                nanos?: number | undefined;
            } | undefined;
            commission?: {
                commission_rates?: {
                    rate?: string | undefined;
                    max_rate?: string | undefined;
                    max_change_rate?: string | undefined;
                } | undefined;
                update_time?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
            } | undefined;
            min_self_delegation?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Validator;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Validator;
    }
    class ValAddresses extends pb_1.Message {
        constructor(data?: any[] | {
            addresses?: string[];
        });
        get addresses(): string[];
        set addresses(value: string[]);
        static fromObject(data: {
            addresses?: string[];
        }): ValAddresses;
        toObject(): {
            addresses?: string[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ValAddresses;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ValAddresses;
    }
    class DVPair extends pb_1.Message {
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
        }): DVPair;
        toObject(): {
            delegator_address?: string | undefined;
            validator_address?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DVPair;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): DVPair;
    }
    class DVPairs extends pb_1.Message {
        constructor(data?: any[] | {
            pairs?: DVPair[];
        });
        get pairs(): DVPair[];
        set pairs(value: DVPair[]);
        static fromObject(data: {
            pairs?: ReturnType<typeof DVPair.prototype.toObject>[];
        }): DVPairs;
        toObject(): {
            pairs?: {
                delegator_address?: string | undefined;
                validator_address?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DVPairs;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): DVPairs;
    }
    class DVVTriplet extends pb_1.Message {
        constructor(data?: any[] | {
            delegator_address?: string;
            validator_src_address?: string;
            validator_dst_address?: string;
        });
        get delegator_address(): string;
        set delegator_address(value: string);
        get validator_src_address(): string;
        set validator_src_address(value: string);
        get validator_dst_address(): string;
        set validator_dst_address(value: string);
        static fromObject(data: {
            delegator_address?: string;
            validator_src_address?: string;
            validator_dst_address?: string;
        }): DVVTriplet;
        toObject(): {
            delegator_address?: string | undefined;
            validator_src_address?: string | undefined;
            validator_dst_address?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DVVTriplet;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): DVVTriplet;
    }
    class DVVTriplets extends pb_1.Message {
        constructor(data?: any[] | {
            triplets?: DVVTriplet[];
        });
        get triplets(): DVVTriplet[];
        set triplets(value: DVVTriplet[]);
        static fromObject(data: {
            triplets?: ReturnType<typeof DVVTriplet.prototype.toObject>[];
        }): DVVTriplets;
        toObject(): {
            triplets?: {
                delegator_address?: string | undefined;
                validator_src_address?: string | undefined;
                validator_dst_address?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DVVTriplets;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): DVVTriplets;
    }
    class Delegation extends pb_1.Message {
        constructor(data?: any[] | {
            delegator_address?: string;
            validator_address?: string;
            shares?: string;
        });
        get delegator_address(): string;
        set delegator_address(value: string);
        get validator_address(): string;
        set validator_address(value: string);
        get shares(): string;
        set shares(value: string);
        static fromObject(data: {
            delegator_address?: string;
            validator_address?: string;
            shares?: string;
        }): Delegation;
        toObject(): {
            delegator_address?: string | undefined;
            validator_address?: string | undefined;
            shares?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Delegation;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Delegation;
    }
    class UnbondingDelegation extends pb_1.Message {
        constructor(data?: any[] | {
            delegator_address?: string;
            validator_address?: string;
            entries?: UnbondingDelegationEntry[];
        });
        get delegator_address(): string;
        set delegator_address(value: string);
        get validator_address(): string;
        set validator_address(value: string);
        get entries(): UnbondingDelegationEntry[];
        set entries(value: UnbondingDelegationEntry[]);
        static fromObject(data: {
            delegator_address?: string;
            validator_address?: string;
            entries?: ReturnType<typeof UnbondingDelegationEntry.prototype.toObject>[];
        }): UnbondingDelegation;
        toObject(): {
            delegator_address?: string | undefined;
            validator_address?: string | undefined;
            entries?: {
                creation_height?: number | undefined;
                completion_time?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                initial_balance?: string | undefined;
                balance?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): UnbondingDelegation;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): UnbondingDelegation;
    }
    class UnbondingDelegationEntry extends pb_1.Message {
        constructor(data?: any[] | {
            creation_height?: number;
            completion_time?: dependency_4.google.protobuf.Timestamp;
            initial_balance?: string;
            balance?: string;
        });
        get creation_height(): number;
        set creation_height(value: number);
        get completion_time(): dependency_4.google.protobuf.Timestamp;
        set completion_time(value: dependency_4.google.protobuf.Timestamp);
        get initial_balance(): string;
        set initial_balance(value: string);
        get balance(): string;
        set balance(value: string);
        static fromObject(data: {
            creation_height?: number;
            completion_time?: ReturnType<typeof dependency_4.google.protobuf.Timestamp.prototype.toObject>;
            initial_balance?: string;
            balance?: string;
        }): UnbondingDelegationEntry;
        toObject(): {
            creation_height?: number | undefined;
            completion_time?: {
                seconds?: number | undefined;
                nanos?: number | undefined;
            } | undefined;
            initial_balance?: string | undefined;
            balance?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): UnbondingDelegationEntry;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): UnbondingDelegationEntry;
    }
    class RedelegationEntry extends pb_1.Message {
        constructor(data?: any[] | {
            creation_height?: number;
            completion_time?: dependency_4.google.protobuf.Timestamp;
            initial_balance?: string;
            shares_dst?: string;
        });
        get creation_height(): number;
        set creation_height(value: number);
        get completion_time(): dependency_4.google.protobuf.Timestamp;
        set completion_time(value: dependency_4.google.protobuf.Timestamp);
        get initial_balance(): string;
        set initial_balance(value: string);
        get shares_dst(): string;
        set shares_dst(value: string);
        static fromObject(data: {
            creation_height?: number;
            completion_time?: ReturnType<typeof dependency_4.google.protobuf.Timestamp.prototype.toObject>;
            initial_balance?: string;
            shares_dst?: string;
        }): RedelegationEntry;
        toObject(): {
            creation_height?: number | undefined;
            completion_time?: {
                seconds?: number | undefined;
                nanos?: number | undefined;
            } | undefined;
            initial_balance?: string | undefined;
            shares_dst?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): RedelegationEntry;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): RedelegationEntry;
    }
    class Redelegation extends pb_1.Message {
        constructor(data?: any[] | {
            delegator_address?: string;
            validator_src_address?: string;
            validator_dst_address?: string;
            entries?: RedelegationEntry[];
        });
        get delegator_address(): string;
        set delegator_address(value: string);
        get validator_src_address(): string;
        set validator_src_address(value: string);
        get validator_dst_address(): string;
        set validator_dst_address(value: string);
        get entries(): RedelegationEntry[];
        set entries(value: RedelegationEntry[]);
        static fromObject(data: {
            delegator_address?: string;
            validator_src_address?: string;
            validator_dst_address?: string;
            entries?: ReturnType<typeof RedelegationEntry.prototype.toObject>[];
        }): Redelegation;
        toObject(): {
            delegator_address?: string | undefined;
            validator_src_address?: string | undefined;
            validator_dst_address?: string | undefined;
            entries?: {
                creation_height?: number | undefined;
                completion_time?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                initial_balance?: string | undefined;
                shares_dst?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Redelegation;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Redelegation;
    }
    class Params extends pb_1.Message {
        constructor(data?: any[] | {
            unbonding_time?: dependency_3.google.protobuf.Duration;
            max_validators?: number;
            max_entries?: number;
            historical_entries?: number;
            bond_denom?: string;
        });
        get unbonding_time(): dependency_3.google.protobuf.Duration;
        set unbonding_time(value: dependency_3.google.protobuf.Duration);
        get max_validators(): number;
        set max_validators(value: number);
        get max_entries(): number;
        set max_entries(value: number);
        get historical_entries(): number;
        set historical_entries(value: number);
        get bond_denom(): string;
        set bond_denom(value: string);
        static fromObject(data: {
            unbonding_time?: ReturnType<typeof dependency_3.google.protobuf.Duration.prototype.toObject>;
            max_validators?: number;
            max_entries?: number;
            historical_entries?: number;
            bond_denom?: string;
        }): Params;
        toObject(): {
            unbonding_time?: {
                seconds?: number | undefined;
                nanos?: number | undefined;
            } | undefined;
            max_validators?: number | undefined;
            max_entries?: number | undefined;
            historical_entries?: number | undefined;
            bond_denom?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Params;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Params;
    }
    class DelegationResponse extends pb_1.Message {
        constructor(data?: any[] | {
            delegation?: Delegation;
            balance?: dependency_6.cosmos.base.v1beta1.Coin;
        });
        get delegation(): Delegation;
        set delegation(value: Delegation);
        get balance(): dependency_6.cosmos.base.v1beta1.Coin;
        set balance(value: dependency_6.cosmos.base.v1beta1.Coin);
        static fromObject(data: {
            delegation?: ReturnType<typeof Delegation.prototype.toObject>;
            balance?: ReturnType<typeof dependency_6.cosmos.base.v1beta1.Coin.prototype.toObject>;
        }): DelegationResponse;
        toObject(): {
            delegation?: {
                delegator_address?: string | undefined;
                validator_address?: string | undefined;
                shares?: string | undefined;
            } | undefined;
            balance?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DelegationResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): DelegationResponse;
    }
    class RedelegationEntryResponse extends pb_1.Message {
        constructor(data?: any[] | {
            redelegation_entry?: RedelegationEntry;
            balance?: string;
        });
        get redelegation_entry(): RedelegationEntry;
        set redelegation_entry(value: RedelegationEntry);
        get balance(): string;
        set balance(value: string);
        static fromObject(data: {
            redelegation_entry?: ReturnType<typeof RedelegationEntry.prototype.toObject>;
            balance?: string;
        }): RedelegationEntryResponse;
        toObject(): {
            redelegation_entry?: {
                creation_height?: number | undefined;
                completion_time?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                initial_balance?: string | undefined;
                shares_dst?: string | undefined;
            } | undefined;
            balance?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): RedelegationEntryResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): RedelegationEntryResponse;
    }
    class RedelegationResponse extends pb_1.Message {
        constructor(data?: any[] | {
            redelegation?: Redelegation;
            entries?: RedelegationEntryResponse[];
        });
        get redelegation(): Redelegation;
        set redelegation(value: Redelegation);
        get entries(): RedelegationEntryResponse[];
        set entries(value: RedelegationEntryResponse[]);
        static fromObject(data: {
            redelegation?: ReturnType<typeof Redelegation.prototype.toObject>;
            entries?: ReturnType<typeof RedelegationEntryResponse.prototype.toObject>[];
        }): RedelegationResponse;
        toObject(): {
            redelegation?: {
                delegator_address?: string | undefined;
                validator_src_address?: string | undefined;
                validator_dst_address?: string | undefined;
                entries?: {
                    creation_height?: number | undefined;
                    completion_time?: {
                        seconds?: number | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    initial_balance?: string | undefined;
                    shares_dst?: string | undefined;
                }[] | undefined;
            } | undefined;
            entries?: {
                redelegation_entry?: {
                    creation_height?: number | undefined;
                    completion_time?: {
                        seconds?: number | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    initial_balance?: string | undefined;
                    shares_dst?: string | undefined;
                } | undefined;
                balance?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): RedelegationResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): RedelegationResponse;
    }
    class Pool extends pb_1.Message {
        constructor(data?: any[] | {
            not_bonded_tokens?: string;
            bonded_tokens?: string;
        });
        get not_bonded_tokens(): string;
        set not_bonded_tokens(value: string);
        get bonded_tokens(): string;
        set bonded_tokens(value: string);
        static fromObject(data: {
            not_bonded_tokens?: string;
            bonded_tokens?: string;
        }): Pool;
        toObject(): {
            not_bonded_tokens?: string | undefined;
            bonded_tokens?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Pool;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Pool;
    }
}
//# sourceMappingURL=staking.d.ts.map