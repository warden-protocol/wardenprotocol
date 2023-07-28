import * as dependency_2 from "./../../google/protobuf/timestamp";
import * as dependency_3 from "./types";
import * as dependency_4 from "./validator";
import * as pb_1 from "google-protobuf";
export declare namespace tendermint.types {
    class Evidence extends pb_1.Message {
        constructor(data?: any[] | ({} & (({
            duplicate_vote_evidence?: DuplicateVoteEvidence;
            light_client_attack_evidence?: never;
        } | {
            duplicate_vote_evidence?: never;
            light_client_attack_evidence?: LightClientAttackEvidence;
        }))));
        get duplicate_vote_evidence(): DuplicateVoteEvidence;
        set duplicate_vote_evidence(value: DuplicateVoteEvidence);
        get light_client_attack_evidence(): LightClientAttackEvidence;
        set light_client_attack_evidence(value: LightClientAttackEvidence);
        get sum(): "none" | "duplicate_vote_evidence" | "light_client_attack_evidence";
        static fromObject(data: {
            duplicate_vote_evidence?: ReturnType<typeof DuplicateVoteEvidence.prototype.toObject>;
            light_client_attack_evidence?: ReturnType<typeof LightClientAttackEvidence.prototype.toObject>;
        }): Evidence;
        toObject(): {
            duplicate_vote_evidence?: {
                vote_a?: {
                    type?: dependency_3.tendermint.types.SignedMsgType | undefined;
                    height?: number | undefined;
                    round?: number | undefined;
                    block_id?: {
                        hash?: Uint8Array | undefined;
                        part_set_header?: {
                            total?: number | undefined;
                            hash?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                    timestamp?: {
                        seconds?: number | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    validator_address?: Uint8Array | undefined;
                    validator_index?: number | undefined;
                    signature?: Uint8Array | undefined;
                } | undefined;
                vote_b?: {
                    type?: dependency_3.tendermint.types.SignedMsgType | undefined;
                    height?: number | undefined;
                    round?: number | undefined;
                    block_id?: {
                        hash?: Uint8Array | undefined;
                        part_set_header?: {
                            total?: number | undefined;
                            hash?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                    timestamp?: {
                        seconds?: number | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    validator_address?: Uint8Array | undefined;
                    validator_index?: number | undefined;
                    signature?: Uint8Array | undefined;
                } | undefined;
                total_voting_power?: number | undefined;
                validator_power?: number | undefined;
                timestamp?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
            } | undefined;
            light_client_attack_evidence?: {
                conflicting_block?: {
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
                                block_id_flag?: dependency_3.tendermint.types.BlockIDFlag | undefined;
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
                } | undefined;
                common_height?: number | undefined;
                byzantine_validators?: {
                    address?: Uint8Array | undefined;
                    pub_key?: {
                        ed25519?: Uint8Array | undefined;
                        secp256k1?: Uint8Array | undefined;
                    } | undefined;
                    voting_power?: number | undefined;
                    proposer_priority?: number | undefined;
                }[] | undefined;
                total_voting_power?: number | undefined;
                timestamp?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Evidence;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Evidence;
    }
    class DuplicateVoteEvidence extends pb_1.Message {
        constructor(data?: any[] | {
            vote_a?: dependency_3.tendermint.types.Vote;
            vote_b?: dependency_3.tendermint.types.Vote;
            total_voting_power?: number;
            validator_power?: number;
            timestamp?: dependency_2.google.protobuf.Timestamp;
        });
        get vote_a(): dependency_3.tendermint.types.Vote;
        set vote_a(value: dependency_3.tendermint.types.Vote);
        get vote_b(): dependency_3.tendermint.types.Vote;
        set vote_b(value: dependency_3.tendermint.types.Vote);
        get total_voting_power(): number;
        set total_voting_power(value: number);
        get validator_power(): number;
        set validator_power(value: number);
        get timestamp(): dependency_2.google.protobuf.Timestamp;
        set timestamp(value: dependency_2.google.protobuf.Timestamp);
        static fromObject(data: {
            vote_a?: ReturnType<typeof dependency_3.tendermint.types.Vote.prototype.toObject>;
            vote_b?: ReturnType<typeof dependency_3.tendermint.types.Vote.prototype.toObject>;
            total_voting_power?: number;
            validator_power?: number;
            timestamp?: ReturnType<typeof dependency_2.google.protobuf.Timestamp.prototype.toObject>;
        }): DuplicateVoteEvidence;
        toObject(): {
            vote_a?: {
                type?: dependency_3.tendermint.types.SignedMsgType | undefined;
                height?: number | undefined;
                round?: number | undefined;
                block_id?: {
                    hash?: Uint8Array | undefined;
                    part_set_header?: {
                        total?: number | undefined;
                        hash?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                timestamp?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                validator_address?: Uint8Array | undefined;
                validator_index?: number | undefined;
                signature?: Uint8Array | undefined;
            } | undefined;
            vote_b?: {
                type?: dependency_3.tendermint.types.SignedMsgType | undefined;
                height?: number | undefined;
                round?: number | undefined;
                block_id?: {
                    hash?: Uint8Array | undefined;
                    part_set_header?: {
                        total?: number | undefined;
                        hash?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                timestamp?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                validator_address?: Uint8Array | undefined;
                validator_index?: number | undefined;
                signature?: Uint8Array | undefined;
            } | undefined;
            total_voting_power?: number | undefined;
            validator_power?: number | undefined;
            timestamp?: {
                seconds?: number | undefined;
                nanos?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DuplicateVoteEvidence;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): DuplicateVoteEvidence;
    }
    class LightClientAttackEvidence extends pb_1.Message {
        constructor(data?: any[] | {
            conflicting_block?: dependency_3.tendermint.types.LightBlock;
            common_height?: number;
            byzantine_validators?: dependency_4.tendermint.types.Validator[];
            total_voting_power?: number;
            timestamp?: dependency_2.google.protobuf.Timestamp;
        });
        get conflicting_block(): dependency_3.tendermint.types.LightBlock;
        set conflicting_block(value: dependency_3.tendermint.types.LightBlock);
        get common_height(): number;
        set common_height(value: number);
        get byzantine_validators(): dependency_4.tendermint.types.Validator[];
        set byzantine_validators(value: dependency_4.tendermint.types.Validator[]);
        get total_voting_power(): number;
        set total_voting_power(value: number);
        get timestamp(): dependency_2.google.protobuf.Timestamp;
        set timestamp(value: dependency_2.google.protobuf.Timestamp);
        static fromObject(data: {
            conflicting_block?: ReturnType<typeof dependency_3.tendermint.types.LightBlock.prototype.toObject>;
            common_height?: number;
            byzantine_validators?: ReturnType<typeof dependency_4.tendermint.types.Validator.prototype.toObject>[];
            total_voting_power?: number;
            timestamp?: ReturnType<typeof dependency_2.google.protobuf.Timestamp.prototype.toObject>;
        }): LightClientAttackEvidence;
        toObject(): {
            conflicting_block?: {
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
                            block_id_flag?: dependency_3.tendermint.types.BlockIDFlag | undefined;
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
            } | undefined;
            common_height?: number | undefined;
            byzantine_validators?: {
                address?: Uint8Array | undefined;
                pub_key?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                voting_power?: number | undefined;
                proposer_priority?: number | undefined;
            }[] | undefined;
            total_voting_power?: number | undefined;
            timestamp?: {
                seconds?: number | undefined;
                nanos?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): LightClientAttackEvidence;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): LightClientAttackEvidence;
    }
    class EvidenceList extends pb_1.Message {
        constructor(data?: any[] | {
            evidence?: Evidence[];
        });
        get evidence(): Evidence[];
        set evidence(value: Evidence[]);
        static fromObject(data: {
            evidence?: ReturnType<typeof Evidence.prototype.toObject>[];
        }): EvidenceList;
        toObject(): {
            evidence?: {
                duplicate_vote_evidence?: {
                    vote_a?: {
                        type?: dependency_3.tendermint.types.SignedMsgType | undefined;
                        height?: number | undefined;
                        round?: number | undefined;
                        block_id?: {
                            hash?: Uint8Array | undefined;
                            part_set_header?: {
                                total?: number | undefined;
                                hash?: Uint8Array | undefined;
                            } | undefined;
                        } | undefined;
                        timestamp?: {
                            seconds?: number | undefined;
                            nanos?: number | undefined;
                        } | undefined;
                        validator_address?: Uint8Array | undefined;
                        validator_index?: number | undefined;
                        signature?: Uint8Array | undefined;
                    } | undefined;
                    vote_b?: {
                        type?: dependency_3.tendermint.types.SignedMsgType | undefined;
                        height?: number | undefined;
                        round?: number | undefined;
                        block_id?: {
                            hash?: Uint8Array | undefined;
                            part_set_header?: {
                                total?: number | undefined;
                                hash?: Uint8Array | undefined;
                            } | undefined;
                        } | undefined;
                        timestamp?: {
                            seconds?: number | undefined;
                            nanos?: number | undefined;
                        } | undefined;
                        validator_address?: Uint8Array | undefined;
                        validator_index?: number | undefined;
                        signature?: Uint8Array | undefined;
                    } | undefined;
                    total_voting_power?: number | undefined;
                    validator_power?: number | undefined;
                    timestamp?: {
                        seconds?: number | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                } | undefined;
                light_client_attack_evidence?: {
                    conflicting_block?: {
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
                                    block_id_flag?: dependency_3.tendermint.types.BlockIDFlag | undefined;
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
                    } | undefined;
                    common_height?: number | undefined;
                    byzantine_validators?: {
                        address?: Uint8Array | undefined;
                        pub_key?: {
                            ed25519?: Uint8Array | undefined;
                            secp256k1?: Uint8Array | undefined;
                        } | undefined;
                        voting_power?: number | undefined;
                        proposer_priority?: number | undefined;
                    }[] | undefined;
                    total_voting_power?: number | undefined;
                    timestamp?: {
                        seconds?: number | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                } | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): EvidenceList;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): EvidenceList;
    }
}
//# sourceMappingURL=evidence.d.ts.map