import * as dependency_2 from "./types";
import * as dependency_3 from "./evidence";
import * as pb_1 from "google-protobuf";
export declare namespace tendermint.types {
    class Block extends pb_1.Message {
        constructor(data?: any[] | {
            header?: dependency_2.tendermint.types.Header;
            data?: dependency_2.tendermint.types.Data;
            evidence?: dependency_3.tendermint.types.EvidenceList;
            last_commit?: dependency_2.tendermint.types.Commit;
        });
        get header(): dependency_2.tendermint.types.Header;
        set header(value: dependency_2.tendermint.types.Header);
        get data(): dependency_2.tendermint.types.Data;
        set data(value: dependency_2.tendermint.types.Data);
        get evidence(): dependency_3.tendermint.types.EvidenceList;
        set evidence(value: dependency_3.tendermint.types.EvidenceList);
        get last_commit(): dependency_2.tendermint.types.Commit;
        set last_commit(value: dependency_2.tendermint.types.Commit);
        static fromObject(data: {
            header?: ReturnType<typeof dependency_2.tendermint.types.Header.prototype.toObject>;
            data?: ReturnType<typeof dependency_2.tendermint.types.Data.prototype.toObject>;
            evidence?: ReturnType<typeof dependency_3.tendermint.types.EvidenceList.prototype.toObject>;
            last_commit?: ReturnType<typeof dependency_2.tendermint.types.Commit.prototype.toObject>;
        }): Block;
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
            data?: {
                txs?: Uint8Array[] | undefined;
            } | undefined;
            evidence?: {
                evidence?: {
                    duplicate_vote_evidence?: {
                        vote_a?: {
                            type?: dependency_2.tendermint.types.SignedMsgType | undefined;
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
                            type?: dependency_2.tendermint.types.SignedMsgType | undefined;
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
            } | undefined;
            last_commit?: {
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
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Block;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Block;
    }
}
//# sourceMappingURL=block.d.ts.map