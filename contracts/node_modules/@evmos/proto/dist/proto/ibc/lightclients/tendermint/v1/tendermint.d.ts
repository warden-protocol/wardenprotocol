import * as dependency_1 from "./../../../../tendermint/types/validator";
import * as dependency_2 from "./../../../../tendermint/types/types";
import * as dependency_3 from "./../../../../proofs";
import * as dependency_4 from "./../../../../google/protobuf/duration";
import * as dependency_5 from "./../../../../google/protobuf/timestamp";
import * as dependency_6 from "./../../../core/client/v1/client";
import * as dependency_7 from "./../../../core/commitment/v1/commitment";
import * as pb_1 from "google-protobuf";
export declare namespace ibc.lightclients.tendermint.v1 {
    class ClientState extends pb_1.Message {
        constructor(data?: any[] | {
            chain_id?: string;
            trust_level?: Fraction;
            trusting_period?: dependency_4.google.protobuf.Duration;
            unbonding_period?: dependency_4.google.protobuf.Duration;
            max_clock_drift?: dependency_4.google.protobuf.Duration;
            frozen_height?: dependency_6.ibc.core.client.v1.Height;
            latest_height?: dependency_6.ibc.core.client.v1.Height;
            proof_specs?: dependency_3.ics23.ProofSpec[];
            upgrade_path?: string[];
            allow_update_after_expiry?: boolean;
            allow_update_after_misbehaviour?: boolean;
        });
        get chain_id(): string;
        set chain_id(value: string);
        get trust_level(): Fraction;
        set trust_level(value: Fraction);
        get trusting_period(): dependency_4.google.protobuf.Duration;
        set trusting_period(value: dependency_4.google.protobuf.Duration);
        get unbonding_period(): dependency_4.google.protobuf.Duration;
        set unbonding_period(value: dependency_4.google.protobuf.Duration);
        get max_clock_drift(): dependency_4.google.protobuf.Duration;
        set max_clock_drift(value: dependency_4.google.protobuf.Duration);
        get frozen_height(): dependency_6.ibc.core.client.v1.Height;
        set frozen_height(value: dependency_6.ibc.core.client.v1.Height);
        get latest_height(): dependency_6.ibc.core.client.v1.Height;
        set latest_height(value: dependency_6.ibc.core.client.v1.Height);
        get proof_specs(): dependency_3.ics23.ProofSpec[];
        set proof_specs(value: dependency_3.ics23.ProofSpec[]);
        get upgrade_path(): string[];
        set upgrade_path(value: string[]);
        get allow_update_after_expiry(): boolean;
        set allow_update_after_expiry(value: boolean);
        get allow_update_after_misbehaviour(): boolean;
        set allow_update_after_misbehaviour(value: boolean);
        static fromObject(data: {
            chain_id?: string;
            trust_level?: ReturnType<typeof Fraction.prototype.toObject>;
            trusting_period?: ReturnType<typeof dependency_4.google.protobuf.Duration.prototype.toObject>;
            unbonding_period?: ReturnType<typeof dependency_4.google.protobuf.Duration.prototype.toObject>;
            max_clock_drift?: ReturnType<typeof dependency_4.google.protobuf.Duration.prototype.toObject>;
            frozen_height?: ReturnType<typeof dependency_6.ibc.core.client.v1.Height.prototype.toObject>;
            latest_height?: ReturnType<typeof dependency_6.ibc.core.client.v1.Height.prototype.toObject>;
            proof_specs?: ReturnType<typeof dependency_3.ics23.ProofSpec.prototype.toObject>[];
            upgrade_path?: string[];
            allow_update_after_expiry?: boolean;
            allow_update_after_misbehaviour?: boolean;
        }): ClientState;
        toObject(): {
            chain_id?: string | undefined;
            trust_level?: {
                numerator?: number | undefined;
                denominator?: number | undefined;
            } | undefined;
            trusting_period?: {
                seconds?: number | undefined;
                nanos?: number | undefined;
            } | undefined;
            unbonding_period?: {
                seconds?: number | undefined;
                nanos?: number | undefined;
            } | undefined;
            max_clock_drift?: {
                seconds?: number | undefined;
                nanos?: number | undefined;
            } | undefined;
            frozen_height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
            latest_height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
            proof_specs?: {
                leaf_spec?: {
                    hash?: dependency_3.ics23.HashOp | undefined;
                    prehash_key?: dependency_3.ics23.HashOp | undefined;
                    prehash_value?: dependency_3.ics23.HashOp | undefined;
                    length?: dependency_3.ics23.LengthOp | undefined;
                    prefix?: Uint8Array | undefined;
                } | undefined;
                inner_spec?: {
                    child_order?: number[] | undefined;
                    child_size?: number | undefined;
                    min_prefix_length?: number | undefined;
                    max_prefix_length?: number | undefined;
                    empty_child?: Uint8Array | undefined;
                    hash?: dependency_3.ics23.HashOp | undefined;
                } | undefined;
                max_depth?: number | undefined;
                min_depth?: number | undefined;
            }[] | undefined;
            upgrade_path?: string[] | undefined;
            allow_update_after_expiry?: boolean | undefined;
            allow_update_after_misbehaviour?: boolean | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ClientState;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ClientState;
    }
    class ConsensusState extends pb_1.Message {
        constructor(data?: any[] | {
            timestamp?: dependency_5.google.protobuf.Timestamp;
            root?: dependency_7.ibc.core.commitment.v1.MerkleRoot;
            next_validators_hash?: Uint8Array;
        });
        get timestamp(): dependency_5.google.protobuf.Timestamp;
        set timestamp(value: dependency_5.google.protobuf.Timestamp);
        get root(): dependency_7.ibc.core.commitment.v1.MerkleRoot;
        set root(value: dependency_7.ibc.core.commitment.v1.MerkleRoot);
        get next_validators_hash(): Uint8Array;
        set next_validators_hash(value: Uint8Array);
        static fromObject(data: {
            timestamp?: ReturnType<typeof dependency_5.google.protobuf.Timestamp.prototype.toObject>;
            root?: ReturnType<typeof dependency_7.ibc.core.commitment.v1.MerkleRoot.prototype.toObject>;
            next_validators_hash?: Uint8Array;
        }): ConsensusState;
        toObject(): {
            timestamp?: {
                seconds?: number | undefined;
                nanos?: number | undefined;
            } | undefined;
            root?: {
                hash?: Uint8Array | undefined;
            } | undefined;
            next_validators_hash?: Uint8Array | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ConsensusState;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ConsensusState;
    }
    class Misbehaviour extends pb_1.Message {
        constructor(data?: any[] | {
            client_id?: string;
            header_1?: Header;
            header_2?: Header;
        });
        get client_id(): string;
        set client_id(value: string);
        get header_1(): Header;
        set header_1(value: Header);
        get header_2(): Header;
        set header_2(value: Header);
        static fromObject(data: {
            client_id?: string;
            header_1?: ReturnType<typeof Header.prototype.toObject>;
            header_2?: ReturnType<typeof Header.prototype.toObject>;
        }): Misbehaviour;
        toObject(): {
            client_id?: string | undefined;
            header_1?: {
                signed_header?: {
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
                    commit?: {
                        height?: number | undefined;
                        round?: number | undefined;
                        block_id?: {
                            hash?: Uint8Array | undefined;
                            part_set_header?: {
                                total?: number | undefined;
                                hash?: Uint8Array | undefined;
                            } | undefined;
                        } | undefined;
                        signatures?: {
                            block_id_flag?: dependency_2.tendermint.types.BlockIDFlag | undefined;
                            validator_address?: Uint8Array | undefined;
                            timestamp?: {
                                seconds?: number | undefined;
                                nanos?: number | undefined;
                            } | undefined;
                            signature?: Uint8Array | undefined;
                        }[] | undefined;
                    } | undefined;
                } | undefined;
                validator_set?: {
                    validators?: {
                        address?: Uint8Array | undefined;
                        pub_key?: {
                            ed25519?: Uint8Array | undefined;
                            secp256k1?: Uint8Array | undefined;
                        } | undefined;
                        voting_power?: number | undefined;
                        proposer_priority?: number | undefined;
                    }[] | undefined;
                    proposer?: {
                        address?: Uint8Array | undefined;
                        pub_key?: {
                            ed25519?: Uint8Array | undefined;
                            secp256k1?: Uint8Array | undefined;
                        } | undefined;
                        voting_power?: number | undefined;
                        proposer_priority?: number | undefined;
                    } | undefined;
                    total_voting_power?: number | undefined;
                } | undefined;
                trusted_height?: {
                    revision_number?: number | undefined;
                    revision_height?: number | undefined;
                } | undefined;
                trusted_validators?: {
                    validators?: {
                        address?: Uint8Array | undefined;
                        pub_key?: {
                            ed25519?: Uint8Array | undefined;
                            secp256k1?: Uint8Array | undefined;
                        } | undefined;
                        voting_power?: number | undefined;
                        proposer_priority?: number | undefined;
                    }[] | undefined;
                    proposer?: {
                        address?: Uint8Array | undefined;
                        pub_key?: {
                            ed25519?: Uint8Array | undefined;
                            secp256k1?: Uint8Array | undefined;
                        } | undefined;
                        voting_power?: number | undefined;
                        proposer_priority?: number | undefined;
                    } | undefined;
                    total_voting_power?: number | undefined;
                } | undefined;
            } | undefined;
            header_2?: {
                signed_header?: {
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
                    commit?: {
                        height?: number | undefined;
                        round?: number | undefined;
                        block_id?: {
                            hash?: Uint8Array | undefined;
                            part_set_header?: {
                                total?: number | undefined;
                                hash?: Uint8Array | undefined;
                            } | undefined;
                        } | undefined;
                        signatures?: {
                            block_id_flag?: dependency_2.tendermint.types.BlockIDFlag | undefined;
                            validator_address?: Uint8Array | undefined;
                            timestamp?: {
                                seconds?: number | undefined;
                                nanos?: number | undefined;
                            } | undefined;
                            signature?: Uint8Array | undefined;
                        }[] | undefined;
                    } | undefined;
                } | undefined;
                validator_set?: {
                    validators?: {
                        address?: Uint8Array | undefined;
                        pub_key?: {
                            ed25519?: Uint8Array | undefined;
                            secp256k1?: Uint8Array | undefined;
                        } | undefined;
                        voting_power?: number | undefined;
                        proposer_priority?: number | undefined;
                    }[] | undefined;
                    proposer?: {
                        address?: Uint8Array | undefined;
                        pub_key?: {
                            ed25519?: Uint8Array | undefined;
                            secp256k1?: Uint8Array | undefined;
                        } | undefined;
                        voting_power?: number | undefined;
                        proposer_priority?: number | undefined;
                    } | undefined;
                    total_voting_power?: number | undefined;
                } | undefined;
                trusted_height?: {
                    revision_number?: number | undefined;
                    revision_height?: number | undefined;
                } | undefined;
                trusted_validators?: {
                    validators?: {
                        address?: Uint8Array | undefined;
                        pub_key?: {
                            ed25519?: Uint8Array | undefined;
                            secp256k1?: Uint8Array | undefined;
                        } | undefined;
                        voting_power?: number | undefined;
                        proposer_priority?: number | undefined;
                    }[] | undefined;
                    proposer?: {
                        address?: Uint8Array | undefined;
                        pub_key?: {
                            ed25519?: Uint8Array | undefined;
                            secp256k1?: Uint8Array | undefined;
                        } | undefined;
                        voting_power?: number | undefined;
                        proposer_priority?: number | undefined;
                    } | undefined;
                    total_voting_power?: number | undefined;
                } | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Misbehaviour;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Misbehaviour;
    }
    class Header extends pb_1.Message {
        constructor(data?: any[] | {
            signed_header?: dependency_2.tendermint.types.SignedHeader;
            validator_set?: dependency_1.tendermint.types.ValidatorSet;
            trusted_height?: dependency_6.ibc.core.client.v1.Height;
            trusted_validators?: dependency_1.tendermint.types.ValidatorSet;
        });
        get signed_header(): dependency_2.tendermint.types.SignedHeader;
        set signed_header(value: dependency_2.tendermint.types.SignedHeader);
        get validator_set(): dependency_1.tendermint.types.ValidatorSet;
        set validator_set(value: dependency_1.tendermint.types.ValidatorSet);
        get trusted_height(): dependency_6.ibc.core.client.v1.Height;
        set trusted_height(value: dependency_6.ibc.core.client.v1.Height);
        get trusted_validators(): dependency_1.tendermint.types.ValidatorSet;
        set trusted_validators(value: dependency_1.tendermint.types.ValidatorSet);
        static fromObject(data: {
            signed_header?: ReturnType<typeof dependency_2.tendermint.types.SignedHeader.prototype.toObject>;
            validator_set?: ReturnType<typeof dependency_1.tendermint.types.ValidatorSet.prototype.toObject>;
            trusted_height?: ReturnType<typeof dependency_6.ibc.core.client.v1.Height.prototype.toObject>;
            trusted_validators?: ReturnType<typeof dependency_1.tendermint.types.ValidatorSet.prototype.toObject>;
        }): Header;
        toObject(): {
            signed_header?: {
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
                commit?: {
                    height?: number | undefined;
                    round?: number | undefined;
                    block_id?: {
                        hash?: Uint8Array | undefined;
                        part_set_header?: {
                            total?: number | undefined;
                            hash?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                    signatures?: {
                        block_id_flag?: dependency_2.tendermint.types.BlockIDFlag | undefined;
                        validator_address?: Uint8Array | undefined;
                        timestamp?: {
                            seconds?: number | undefined;
                            nanos?: number | undefined;
                        } | undefined;
                        signature?: Uint8Array | undefined;
                    }[] | undefined;
                } | undefined;
            } | undefined;
            validator_set?: {
                validators?: {
                    address?: Uint8Array | undefined;
                    pub_key?: {
                        ed25519?: Uint8Array | undefined;
                        secp256k1?: Uint8Array | undefined;
                    } | undefined;
                    voting_power?: number | undefined;
                    proposer_priority?: number | undefined;
                }[] | undefined;
                proposer?: {
                    address?: Uint8Array | undefined;
                    pub_key?: {
                        ed25519?: Uint8Array | undefined;
                        secp256k1?: Uint8Array | undefined;
                    } | undefined;
                    voting_power?: number | undefined;
                    proposer_priority?: number | undefined;
                } | undefined;
                total_voting_power?: number | undefined;
            } | undefined;
            trusted_height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
            trusted_validators?: {
                validators?: {
                    address?: Uint8Array | undefined;
                    pub_key?: {
                        ed25519?: Uint8Array | undefined;
                        secp256k1?: Uint8Array | undefined;
                    } | undefined;
                    voting_power?: number | undefined;
                    proposer_priority?: number | undefined;
                }[] | undefined;
                proposer?: {
                    address?: Uint8Array | undefined;
                    pub_key?: {
                        ed25519?: Uint8Array | undefined;
                        secp256k1?: Uint8Array | undefined;
                    } | undefined;
                    voting_power?: number | undefined;
                    proposer_priority?: number | undefined;
                } | undefined;
                total_voting_power?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Header;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Header;
    }
    class Fraction extends pb_1.Message {
        constructor(data?: any[] | {
            numerator?: number;
            denominator?: number;
        });
        get numerator(): number;
        set numerator(value: number);
        get denominator(): number;
        set denominator(value: number);
        static fromObject(data: {
            numerator?: number;
            denominator?: number;
        }): Fraction;
        toObject(): {
            numerator?: number | undefined;
            denominator?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Fraction;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Fraction;
    }
}
//# sourceMappingURL=tendermint.d.ts.map