export interface ABCIQueryResponse {
    /** @format int64 */
    code?: number;
    log?: string;
    info?: string;
    /** @format int64 */
    index?: string;
    /** @format byte */
    key?: string;
    /** @format byte */
    value?: string;
    proof_ops?: {
        ops?: {
            type?: string;
            key?: string;
            data?: string;
        }[];
    };
    /** @format int64 */
    height?: string;
    codespace?: string;
}
export interface Any {
    "@type"?: string;
}
export interface BlockID {
    /** @format byte */
    hash?: string;
    part_set_header?: {
        total?: number;
        hash?: string;
    };
}
export declare enum BlockIDFlag {
    BLOCK_ID_FLAG_UNKNOWN = "BLOCK_ID_FLAG_UNKNOWN",
    BLOCK_ID_FLAG_ABSENT = "BLOCK_ID_FLAG_ABSENT",
    BLOCK_ID_FLAG_COMMIT = "BLOCK_ID_FLAG_COMMIT",
    BLOCK_ID_FLAG_NIL = "BLOCK_ID_FLAG_NIL"
}
export interface Commit {
    /** @format int64 */
    height?: string;
    /** @format int32 */
    round?: number;
    block_id?: {
        hash?: string;
        part_set_header?: {
            total?: number;
            hash?: string;
        };
    };
    signatures?: {
        block_id_flag?: "BLOCK_ID_FLAG_UNKNOWN" | "BLOCK_ID_FLAG_ABSENT" | "BLOCK_ID_FLAG_COMMIT" | "BLOCK_ID_FLAG_NIL";
        validator_address?: string;
        timestamp?: string;
        signature?: string;
    }[];
}
export interface CommitSig {
    block_id_flag?: "BLOCK_ID_FLAG_UNKNOWN" | "BLOCK_ID_FLAG_ABSENT" | "BLOCK_ID_FLAG_COMMIT" | "BLOCK_ID_FLAG_NIL";
    /** @format byte */
    validator_address?: string;
    /** @format date-time */
    timestamp?: string;
    /** @format byte */
    signature?: string;
}
export interface Consensus {
    /** @format uint64 */
    block?: string;
    /** @format uint64 */
    app?: string;
}
export interface Data {
    txs?: string[];
}
export interface DefaultNodeInfo {
    protocol_version?: {
        p2p?: string;
        block?: string;
        app?: string;
    };
    default_node_id?: string;
    listen_addr?: string;
    network?: string;
    version?: string;
    /** @format byte */
    channels?: string;
    moniker?: string;
    other?: {
        tx_index?: string;
        rpc_address?: string;
    };
}
export interface DefaultNodeInfoOther {
    tx_index?: string;
    rpc_address?: string;
}
export interface DuplicateVoteEvidence {
    vote_a?: {
        type?: "SIGNED_MSG_TYPE_UNKNOWN" | "SIGNED_MSG_TYPE_PREVOTE" | "SIGNED_MSG_TYPE_PRECOMMIT" | "SIGNED_MSG_TYPE_PROPOSAL";
        height?: string;
        round?: number;
        block_id?: {
            hash?: string;
            part_set_header?: {
                total?: number;
                hash?: string;
            };
        };
        timestamp?: string;
        validator_address?: string;
        validator_index?: number;
        signature?: string;
        extension?: string;
        extension_signature?: string;
    };
    vote_b?: {
        type?: "SIGNED_MSG_TYPE_UNKNOWN" | "SIGNED_MSG_TYPE_PREVOTE" | "SIGNED_MSG_TYPE_PRECOMMIT" | "SIGNED_MSG_TYPE_PROPOSAL";
        height?: string;
        round?: number;
        block_id?: {
            hash?: string;
            part_set_header?: {
                total?: number;
                hash?: string;
            };
        };
        timestamp?: string;
        validator_address?: string;
        validator_index?: number;
        signature?: string;
        extension?: string;
        extension_signature?: string;
    };
    /** @format int64 */
    total_voting_power?: string;
    /** @format int64 */
    validator_power?: string;
    /** @format date-time */
    timestamp?: string;
}
export interface Evidence {
    duplicate_vote_evidence?: {
        vote_a?: {
            type?: "SIGNED_MSG_TYPE_UNKNOWN" | "SIGNED_MSG_TYPE_PREVOTE" | "SIGNED_MSG_TYPE_PRECOMMIT" | "SIGNED_MSG_TYPE_PROPOSAL";
            height?: string;
            round?: number;
            block_id?: {
                hash?: string;
                part_set_header?: {
                    total?: number;
                    hash?: string;
                };
            };
            timestamp?: string;
            validator_address?: string;
            validator_index?: number;
            signature?: string;
            extension?: string;
            extension_signature?: string;
        };
        vote_b?: {
            type?: "SIGNED_MSG_TYPE_UNKNOWN" | "SIGNED_MSG_TYPE_PREVOTE" | "SIGNED_MSG_TYPE_PRECOMMIT" | "SIGNED_MSG_TYPE_PROPOSAL";
            height?: string;
            round?: number;
            block_id?: {
                hash?: string;
                part_set_header?: {
                    total?: number;
                    hash?: string;
                };
            };
            timestamp?: string;
            validator_address?: string;
            validator_index?: number;
            signature?: string;
            extension?: string;
            extension_signature?: string;
        };
        total_voting_power?: string;
        validator_power?: string;
        timestamp?: string;
    };
    light_client_attack_evidence?: {
        conflicting_block?: {
            signed_header?: {
                header?: {
                    version?: {
                        block?: string;
                        app?: string;
                    };
                    chain_id?: string;
                    height?: string;
                    time?: string;
                    last_block_id?: {
                        hash?: string;
                        part_set_header?: {
                            total?: number;
                            hash?: string;
                        };
                    };
                    last_commit_hash?: string;
                    data_hash?: string;
                    validators_hash?: string;
                    next_validators_hash?: string;
                    consensus_hash?: string;
                    app_hash?: string;
                    last_results_hash?: string;
                    evidence_hash?: string;
                    proposer_address?: string;
                };
                commit?: {
                    height?: string;
                    round?: number;
                    block_id?: {
                        hash?: string;
                        part_set_header?: {
                            total?: number;
                            hash?: string;
                        };
                    };
                    signatures?: {
                        block_id_flag?: "BLOCK_ID_FLAG_UNKNOWN" | "BLOCK_ID_FLAG_ABSENT" | "BLOCK_ID_FLAG_COMMIT" | "BLOCK_ID_FLAG_NIL";
                        validator_address?: string;
                        timestamp?: string;
                        signature?: string;
                    }[];
                };
            };
            validator_set?: {
                validators?: {
                    address?: string;
                    pub_key?: {
                        ed25519?: string;
                        secp256k1?: string;
                    };
                    voting_power?: string;
                    proposer_priority?: string;
                }[];
                proposer?: {
                    address?: string;
                    pub_key?: {
                        ed25519?: string;
                        secp256k1?: string;
                    };
                    voting_power?: string;
                    proposer_priority?: string;
                };
                total_voting_power?: string;
            };
        };
        common_height?: string;
        byzantine_validators?: {
            address?: string;
            pub_key?: {
                ed25519?: string;
                secp256k1?: string;
            };
            voting_power?: string;
            proposer_priority?: string;
        }[];
        total_voting_power?: string;
        timestamp?: string;
    };
}
export interface EvidenceList {
    evidence?: {
        duplicate_vote_evidence?: {
            vote_a?: {
                type?: "SIGNED_MSG_TYPE_UNKNOWN" | "SIGNED_MSG_TYPE_PREVOTE" | "SIGNED_MSG_TYPE_PRECOMMIT" | "SIGNED_MSG_TYPE_PROPOSAL";
                height?: string;
                round?: number;
                block_id?: {
                    hash?: string;
                    part_set_header?: {
                        total?: number;
                        hash?: string;
                    };
                };
                timestamp?: string;
                validator_address?: string;
                validator_index?: number;
                signature?: string;
                extension?: string;
                extension_signature?: string;
            };
            vote_b?: {
                type?: "SIGNED_MSG_TYPE_UNKNOWN" | "SIGNED_MSG_TYPE_PREVOTE" | "SIGNED_MSG_TYPE_PRECOMMIT" | "SIGNED_MSG_TYPE_PROPOSAL";
                height?: string;
                round?: number;
                block_id?: {
                    hash?: string;
                    part_set_header?: {
                        total?: number;
                        hash?: string;
                    };
                };
                timestamp?: string;
                validator_address?: string;
                validator_index?: number;
                signature?: string;
                extension?: string;
                extension_signature?: string;
            };
            total_voting_power?: string;
            validator_power?: string;
            timestamp?: string;
        };
        light_client_attack_evidence?: {
            conflicting_block?: {
                signed_header?: {
                    header?: {
                        version?: {
                            block?: string;
                            app?: string;
                        };
                        chain_id?: string;
                        height?: string;
                        time?: string;
                        last_block_id?: {
                            hash?: string;
                            part_set_header?: {
                                total?: number;
                                hash?: string;
                            };
                        };
                        last_commit_hash?: string;
                        data_hash?: string;
                        validators_hash?: string;
                        next_validators_hash?: string;
                        consensus_hash?: string;
                        app_hash?: string;
                        last_results_hash?: string;
                        evidence_hash?: string;
                        proposer_address?: string;
                    };
                    commit?: {
                        height?: string;
                        round?: number;
                        block_id?: {
                            hash?: string;
                            part_set_header?: {
                                total?: number;
                                hash?: string;
                            };
                        };
                        signatures?: {
                            block_id_flag?: "BLOCK_ID_FLAG_UNKNOWN" | "BLOCK_ID_FLAG_ABSENT" | "BLOCK_ID_FLAG_COMMIT" | "BLOCK_ID_FLAG_NIL";
                            validator_address?: string;
                            timestamp?: string;
                            signature?: string;
                        }[];
                    };
                };
                validator_set?: {
                    validators?: {
                        address?: string;
                        pub_key?: {
                            ed25519?: string;
                            secp256k1?: string;
                        };
                        voting_power?: string;
                        proposer_priority?: string;
                    }[];
                    proposer?: {
                        address?: string;
                        pub_key?: {
                            ed25519?: string;
                            secp256k1?: string;
                        };
                        voting_power?: string;
                        proposer_priority?: string;
                    };
                    total_voting_power?: string;
                };
            };
            common_height?: string;
            byzantine_validators?: {
                address?: string;
                pub_key?: {
                    ed25519?: string;
                    secp256k1?: string;
                };
                voting_power?: string;
                proposer_priority?: string;
            }[];
            total_voting_power?: string;
            timestamp?: string;
        };
    }[];
}
export interface GetBlockByHeightResponse {
    block_id?: {
        hash?: string;
        part_set_header?: {
            total?: number;
            hash?: string;
        };
    };
    block?: {
        header?: {
            version?: {
                block?: string;
                app?: string;
            };
            chain_id?: string;
            height?: string;
            time?: string;
            last_block_id?: {
                hash?: string;
                part_set_header?: {
                    total?: number;
                    hash?: string;
                };
            };
            last_commit_hash?: string;
            data_hash?: string;
            validators_hash?: string;
            next_validators_hash?: string;
            consensus_hash?: string;
            app_hash?: string;
            last_results_hash?: string;
            evidence_hash?: string;
            proposer_address?: string;
        };
        data?: {
            txs?: string[];
        };
        evidence?: {
            evidence?: {
                duplicate_vote_evidence?: {
                    vote_a?: {
                        type?: "SIGNED_MSG_TYPE_UNKNOWN" | "SIGNED_MSG_TYPE_PREVOTE" | "SIGNED_MSG_TYPE_PRECOMMIT" | "SIGNED_MSG_TYPE_PROPOSAL";
                        height?: string;
                        round?: number;
                        block_id?: {
                            hash?: string;
                            part_set_header?: {
                                total?: number;
                                hash?: string;
                            };
                        };
                        timestamp?: string;
                        validator_address?: string;
                        validator_index?: number;
                        signature?: string;
                        extension?: string;
                        extension_signature?: string;
                    };
                    vote_b?: {
                        type?: "SIGNED_MSG_TYPE_UNKNOWN" | "SIGNED_MSG_TYPE_PREVOTE" | "SIGNED_MSG_TYPE_PRECOMMIT" | "SIGNED_MSG_TYPE_PROPOSAL";
                        height?: string;
                        round?: number;
                        block_id?: {
                            hash?: string;
                            part_set_header?: {
                                total?: number;
                                hash?: string;
                            };
                        };
                        timestamp?: string;
                        validator_address?: string;
                        validator_index?: number;
                        signature?: string;
                        extension?: string;
                        extension_signature?: string;
                    };
                    total_voting_power?: string;
                    validator_power?: string;
                    timestamp?: string;
                };
                light_client_attack_evidence?: {
                    conflicting_block?: {
                        signed_header?: {
                            header?: {
                                version?: {
                                    block?: string;
                                    app?: string;
                                };
                                chain_id?: string;
                                height?: string;
                                time?: string;
                                last_block_id?: {
                                    hash?: string;
                                    part_set_header?: {
                                        total?: number;
                                        hash?: string;
                                    };
                                };
                                last_commit_hash?: string;
                                data_hash?: string;
                                validators_hash?: string;
                                next_validators_hash?: string;
                                consensus_hash?: string;
                                app_hash?: string;
                                last_results_hash?: string;
                                evidence_hash?: string;
                                proposer_address?: string;
                            };
                            commit?: {
                                height?: string;
                                round?: number;
                                block_id?: {
                                    hash?: string;
                                    part_set_header?: {
                                        total?: number;
                                        hash?: string;
                                    };
                                };
                                signatures?: {
                                    block_id_flag?: "BLOCK_ID_FLAG_UNKNOWN" | "BLOCK_ID_FLAG_ABSENT" | "BLOCK_ID_FLAG_COMMIT" | "BLOCK_ID_FLAG_NIL";
                                    validator_address?: string;
                                    timestamp?: string;
                                    signature?: string;
                                }[];
                            };
                        };
                        validator_set?: {
                            validators?: {
                                address?: string;
                                pub_key?: {
                                    ed25519?: string;
                                    secp256k1?: string;
                                };
                                voting_power?: string;
                                proposer_priority?: string;
                            }[];
                            proposer?: {
                                address?: string;
                                pub_key?: {
                                    ed25519?: string;
                                    secp256k1?: string;
                                };
                                voting_power?: string;
                                proposer_priority?: string;
                            };
                            total_voting_power?: string;
                        };
                    };
                    common_height?: string;
                    byzantine_validators?: {
                        address?: string;
                        pub_key?: {
                            ed25519?: string;
                            secp256k1?: string;
                        };
                        voting_power?: string;
                        proposer_priority?: string;
                    }[];
                    total_voting_power?: string;
                    timestamp?: string;
                };
            }[];
        };
        last_commit?: {
            height?: string;
            round?: number;
            block_id?: {
                hash?: string;
                part_set_header?: {
                    total?: number;
                    hash?: string;
                };
            };
            signatures?: {
                block_id_flag?: "BLOCK_ID_FLAG_UNKNOWN" | "BLOCK_ID_FLAG_ABSENT" | "BLOCK_ID_FLAG_COMMIT" | "BLOCK_ID_FLAG_NIL";
                validator_address?: string;
                timestamp?: string;
                signature?: string;
            }[];
        };
    };
    sdk_block?: {
        header?: {
            version?: {
                block?: string;
                app?: string;
            };
            chain_id?: string;
            height?: string;
            time?: string;
            last_block_id?: {
                hash?: string;
                part_set_header?: {
                    total?: number;
                    hash?: string;
                };
            };
            last_commit_hash?: string;
            data_hash?: string;
            validators_hash?: string;
            next_validators_hash?: string;
            consensus_hash?: string;
            app_hash?: string;
            last_results_hash?: string;
            evidence_hash?: string;
            proposer_address?: string;
        };
        data?: {
            txs?: string[];
        };
        evidence?: {
            evidence?: {
                duplicate_vote_evidence?: {
                    vote_a?: {
                        type?: "SIGNED_MSG_TYPE_UNKNOWN" | "SIGNED_MSG_TYPE_PREVOTE" | "SIGNED_MSG_TYPE_PRECOMMIT" | "SIGNED_MSG_TYPE_PROPOSAL";
                        height?: string;
                        round?: number;
                        block_id?: {
                            hash?: string;
                            part_set_header?: {
                                total?: number;
                                hash?: string;
                            };
                        };
                        timestamp?: string;
                        validator_address?: string;
                        validator_index?: number;
                        signature?: string;
                        extension?: string;
                        extension_signature?: string;
                    };
                    vote_b?: {
                        type?: "SIGNED_MSG_TYPE_UNKNOWN" | "SIGNED_MSG_TYPE_PREVOTE" | "SIGNED_MSG_TYPE_PRECOMMIT" | "SIGNED_MSG_TYPE_PROPOSAL";
                        height?: string;
                        round?: number;
                        block_id?: {
                            hash?: string;
                            part_set_header?: {
                                total?: number;
                                hash?: string;
                            };
                        };
                        timestamp?: string;
                        validator_address?: string;
                        validator_index?: number;
                        signature?: string;
                        extension?: string;
                        extension_signature?: string;
                    };
                    total_voting_power?: string;
                    validator_power?: string;
                    timestamp?: string;
                };
                light_client_attack_evidence?: {
                    conflicting_block?: {
                        signed_header?: {
                            header?: {
                                version?: {
                                    block?: string;
                                    app?: string;
                                };
                                chain_id?: string;
                                height?: string;
                                time?: string;
                                last_block_id?: {
                                    hash?: string;
                                    part_set_header?: {
                                        total?: number;
                                        hash?: string;
                                    };
                                };
                                last_commit_hash?: string;
                                data_hash?: string;
                                validators_hash?: string;
                                next_validators_hash?: string;
                                consensus_hash?: string;
                                app_hash?: string;
                                last_results_hash?: string;
                                evidence_hash?: string;
                                proposer_address?: string;
                            };
                            commit?: {
                                height?: string;
                                round?: number;
                                block_id?: {
                                    hash?: string;
                                    part_set_header?: {
                                        total?: number;
                                        hash?: string;
                                    };
                                };
                                signatures?: {
                                    block_id_flag?: "BLOCK_ID_FLAG_UNKNOWN" | "BLOCK_ID_FLAG_ABSENT" | "BLOCK_ID_FLAG_COMMIT" | "BLOCK_ID_FLAG_NIL";
                                    validator_address?: string;
                                    timestamp?: string;
                                    signature?: string;
                                }[];
                            };
                        };
                        validator_set?: {
                            validators?: {
                                address?: string;
                                pub_key?: {
                                    ed25519?: string;
                                    secp256k1?: string;
                                };
                                voting_power?: string;
                                proposer_priority?: string;
                            }[];
                            proposer?: {
                                address?: string;
                                pub_key?: {
                                    ed25519?: string;
                                    secp256k1?: string;
                                };
                                voting_power?: string;
                                proposer_priority?: string;
                            };
                            total_voting_power?: string;
                        };
                    };
                    common_height?: string;
                    byzantine_validators?: {
                        address?: string;
                        pub_key?: {
                            ed25519?: string;
                            secp256k1?: string;
                        };
                        voting_power?: string;
                        proposer_priority?: string;
                    }[];
                    total_voting_power?: string;
                    timestamp?: string;
                };
            }[];
        };
        last_commit?: {
            height?: string;
            round?: number;
            block_id?: {
                hash?: string;
                part_set_header?: {
                    total?: number;
                    hash?: string;
                };
            };
            signatures?: {
                block_id_flag?: "BLOCK_ID_FLAG_UNKNOWN" | "BLOCK_ID_FLAG_ABSENT" | "BLOCK_ID_FLAG_COMMIT" | "BLOCK_ID_FLAG_NIL";
                validator_address?: string;
                timestamp?: string;
                signature?: string;
            }[];
        };
    };
}
export interface GetLatestBlockResponse {
    block_id?: {
        hash?: string;
        part_set_header?: {
            total?: number;
            hash?: string;
        };
    };
    block?: {
        header?: {
            version?: {
                block?: string;
                app?: string;
            };
            chain_id?: string;
            height?: string;
            time?: string;
            last_block_id?: {
                hash?: string;
                part_set_header?: {
                    total?: number;
                    hash?: string;
                };
            };
            last_commit_hash?: string;
            data_hash?: string;
            validators_hash?: string;
            next_validators_hash?: string;
            consensus_hash?: string;
            app_hash?: string;
            last_results_hash?: string;
            evidence_hash?: string;
            proposer_address?: string;
        };
        data?: {
            txs?: string[];
        };
        evidence?: {
            evidence?: {
                duplicate_vote_evidence?: {
                    vote_a?: {
                        type?: "SIGNED_MSG_TYPE_UNKNOWN" | "SIGNED_MSG_TYPE_PREVOTE" | "SIGNED_MSG_TYPE_PRECOMMIT" | "SIGNED_MSG_TYPE_PROPOSAL";
                        height?: string;
                        round?: number;
                        block_id?: {
                            hash?: string;
                            part_set_header?: {
                                total?: number;
                                hash?: string;
                            };
                        };
                        timestamp?: string;
                        validator_address?: string;
                        validator_index?: number;
                        signature?: string;
                        extension?: string;
                        extension_signature?: string;
                    };
                    vote_b?: {
                        type?: "SIGNED_MSG_TYPE_UNKNOWN" | "SIGNED_MSG_TYPE_PREVOTE" | "SIGNED_MSG_TYPE_PRECOMMIT" | "SIGNED_MSG_TYPE_PROPOSAL";
                        height?: string;
                        round?: number;
                        block_id?: {
                            hash?: string;
                            part_set_header?: {
                                total?: number;
                                hash?: string;
                            };
                        };
                        timestamp?: string;
                        validator_address?: string;
                        validator_index?: number;
                        signature?: string;
                        extension?: string;
                        extension_signature?: string;
                    };
                    total_voting_power?: string;
                    validator_power?: string;
                    timestamp?: string;
                };
                light_client_attack_evidence?: {
                    conflicting_block?: {
                        signed_header?: {
                            header?: {
                                version?: {
                                    block?: string;
                                    app?: string;
                                };
                                chain_id?: string;
                                height?: string;
                                time?: string;
                                last_block_id?: {
                                    hash?: string;
                                    part_set_header?: {
                                        total?: number;
                                        hash?: string;
                                    };
                                };
                                last_commit_hash?: string;
                                data_hash?: string;
                                validators_hash?: string;
                                next_validators_hash?: string;
                                consensus_hash?: string;
                                app_hash?: string;
                                last_results_hash?: string;
                                evidence_hash?: string;
                                proposer_address?: string;
                            };
                            commit?: {
                                height?: string;
                                round?: number;
                                block_id?: {
                                    hash?: string;
                                    part_set_header?: {
                                        total?: number;
                                        hash?: string;
                                    };
                                };
                                signatures?: {
                                    block_id_flag?: "BLOCK_ID_FLAG_UNKNOWN" | "BLOCK_ID_FLAG_ABSENT" | "BLOCK_ID_FLAG_COMMIT" | "BLOCK_ID_FLAG_NIL";
                                    validator_address?: string;
                                    timestamp?: string;
                                    signature?: string;
                                }[];
                            };
                        };
                        validator_set?: {
                            validators?: {
                                address?: string;
                                pub_key?: {
                                    ed25519?: string;
                                    secp256k1?: string;
                                };
                                voting_power?: string;
                                proposer_priority?: string;
                            }[];
                            proposer?: {
                                address?: string;
                                pub_key?: {
                                    ed25519?: string;
                                    secp256k1?: string;
                                };
                                voting_power?: string;
                                proposer_priority?: string;
                            };
                            total_voting_power?: string;
                        };
                    };
                    common_height?: string;
                    byzantine_validators?: {
                        address?: string;
                        pub_key?: {
                            ed25519?: string;
                            secp256k1?: string;
                        };
                        voting_power?: string;
                        proposer_priority?: string;
                    }[];
                    total_voting_power?: string;
                    timestamp?: string;
                };
            }[];
        };
        last_commit?: {
            height?: string;
            round?: number;
            block_id?: {
                hash?: string;
                part_set_header?: {
                    total?: number;
                    hash?: string;
                };
            };
            signatures?: {
                block_id_flag?: "BLOCK_ID_FLAG_UNKNOWN" | "BLOCK_ID_FLAG_ABSENT" | "BLOCK_ID_FLAG_COMMIT" | "BLOCK_ID_FLAG_NIL";
                validator_address?: string;
                timestamp?: string;
                signature?: string;
            }[];
        };
    };
    sdk_block?: {
        header?: {
            version?: {
                block?: string;
                app?: string;
            };
            chain_id?: string;
            height?: string;
            time?: string;
            last_block_id?: {
                hash?: string;
                part_set_header?: {
                    total?: number;
                    hash?: string;
                };
            };
            last_commit_hash?: string;
            data_hash?: string;
            validators_hash?: string;
            next_validators_hash?: string;
            consensus_hash?: string;
            app_hash?: string;
            last_results_hash?: string;
            evidence_hash?: string;
            proposer_address?: string;
        };
        data?: {
            txs?: string[];
        };
        evidence?: {
            evidence?: {
                duplicate_vote_evidence?: {
                    vote_a?: {
                        type?: "SIGNED_MSG_TYPE_UNKNOWN" | "SIGNED_MSG_TYPE_PREVOTE" | "SIGNED_MSG_TYPE_PRECOMMIT" | "SIGNED_MSG_TYPE_PROPOSAL";
                        height?: string;
                        round?: number;
                        block_id?: {
                            hash?: string;
                            part_set_header?: {
                                total?: number;
                                hash?: string;
                            };
                        };
                        timestamp?: string;
                        validator_address?: string;
                        validator_index?: number;
                        signature?: string;
                        extension?: string;
                        extension_signature?: string;
                    };
                    vote_b?: {
                        type?: "SIGNED_MSG_TYPE_UNKNOWN" | "SIGNED_MSG_TYPE_PREVOTE" | "SIGNED_MSG_TYPE_PRECOMMIT" | "SIGNED_MSG_TYPE_PROPOSAL";
                        height?: string;
                        round?: number;
                        block_id?: {
                            hash?: string;
                            part_set_header?: {
                                total?: number;
                                hash?: string;
                            };
                        };
                        timestamp?: string;
                        validator_address?: string;
                        validator_index?: number;
                        signature?: string;
                        extension?: string;
                        extension_signature?: string;
                    };
                    total_voting_power?: string;
                    validator_power?: string;
                    timestamp?: string;
                };
                light_client_attack_evidence?: {
                    conflicting_block?: {
                        signed_header?: {
                            header?: {
                                version?: {
                                    block?: string;
                                    app?: string;
                                };
                                chain_id?: string;
                                height?: string;
                                time?: string;
                                last_block_id?: {
                                    hash?: string;
                                    part_set_header?: {
                                        total?: number;
                                        hash?: string;
                                    };
                                };
                                last_commit_hash?: string;
                                data_hash?: string;
                                validators_hash?: string;
                                next_validators_hash?: string;
                                consensus_hash?: string;
                                app_hash?: string;
                                last_results_hash?: string;
                                evidence_hash?: string;
                                proposer_address?: string;
                            };
                            commit?: {
                                height?: string;
                                round?: number;
                                block_id?: {
                                    hash?: string;
                                    part_set_header?: {
                                        total?: number;
                                        hash?: string;
                                    };
                                };
                                signatures?: {
                                    block_id_flag?: "BLOCK_ID_FLAG_UNKNOWN" | "BLOCK_ID_FLAG_ABSENT" | "BLOCK_ID_FLAG_COMMIT" | "BLOCK_ID_FLAG_NIL";
                                    validator_address?: string;
                                    timestamp?: string;
                                    signature?: string;
                                }[];
                            };
                        };
                        validator_set?: {
                            validators?: {
                                address?: string;
                                pub_key?: {
                                    ed25519?: string;
                                    secp256k1?: string;
                                };
                                voting_power?: string;
                                proposer_priority?: string;
                            }[];
                            proposer?: {
                                address?: string;
                                pub_key?: {
                                    ed25519?: string;
                                    secp256k1?: string;
                                };
                                voting_power?: string;
                                proposer_priority?: string;
                            };
                            total_voting_power?: string;
                        };
                    };
                    common_height?: string;
                    byzantine_validators?: {
                        address?: string;
                        pub_key?: {
                            ed25519?: string;
                            secp256k1?: string;
                        };
                        voting_power?: string;
                        proposer_priority?: string;
                    }[];
                    total_voting_power?: string;
                    timestamp?: string;
                };
            }[];
        };
        last_commit?: {
            height?: string;
            round?: number;
            block_id?: {
                hash?: string;
                part_set_header?: {
                    total?: number;
                    hash?: string;
                };
            };
            signatures?: {
                block_id_flag?: "BLOCK_ID_FLAG_UNKNOWN" | "BLOCK_ID_FLAG_ABSENT" | "BLOCK_ID_FLAG_COMMIT" | "BLOCK_ID_FLAG_NIL";
                validator_address?: string;
                timestamp?: string;
                signature?: string;
            }[];
        };
    };
}
export interface GetLatestValidatorSetResponse {
    /** @format int64 */
    block_height?: string;
    validators?: {
        address?: string;
        pub_key?: {
            "@type"?: string;
        };
        voting_power?: string;
        proposer_priority?: string;
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface GetNodeInfoResponse {
    default_node_info?: {
        protocol_version?: {
            p2p?: string;
            block?: string;
            app?: string;
        };
        default_node_id?: string;
        listen_addr?: string;
        network?: string;
        version?: string;
        channels?: string;
        moniker?: string;
        other?: {
            tx_index?: string;
            rpc_address?: string;
        };
    };
    application_version?: {
        name?: string;
        app_name?: string;
        version?: string;
        git_commit?: string;
        build_tags?: string;
        go_version?: string;
        build_deps?: {
            path?: string;
            version?: string;
            sum?: string;
        }[];
        cosmos_sdk_version?: string;
    };
}
export interface GetSyncingResponse {
    syncing?: boolean;
}
export interface GetValidatorSetByHeightResponse {
    /** @format int64 */
    block_height?: string;
    validators?: {
        address?: string;
        pub_key?: {
            "@type"?: string;
        };
        voting_power?: string;
        proposer_priority?: string;
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface LightBlock {
    signed_header?: {
        header?: {
            version?: {
                block?: string;
                app?: string;
            };
            chain_id?: string;
            height?: string;
            time?: string;
            last_block_id?: {
                hash?: string;
                part_set_header?: {
                    total?: number;
                    hash?: string;
                };
            };
            last_commit_hash?: string;
            data_hash?: string;
            validators_hash?: string;
            next_validators_hash?: string;
            consensus_hash?: string;
            app_hash?: string;
            last_results_hash?: string;
            evidence_hash?: string;
            proposer_address?: string;
        };
        commit?: {
            height?: string;
            round?: number;
            block_id?: {
                hash?: string;
                part_set_header?: {
                    total?: number;
                    hash?: string;
                };
            };
            signatures?: {
                block_id_flag?: "BLOCK_ID_FLAG_UNKNOWN" | "BLOCK_ID_FLAG_ABSENT" | "BLOCK_ID_FLAG_COMMIT" | "BLOCK_ID_FLAG_NIL";
                validator_address?: string;
                timestamp?: string;
                signature?: string;
            }[];
        };
    };
    validator_set?: {
        validators?: {
            address?: string;
            pub_key?: {
                ed25519?: string;
                secp256k1?: string;
            };
            voting_power?: string;
            proposer_priority?: string;
        }[];
        proposer?: {
            address?: string;
            pub_key?: {
                ed25519?: string;
                secp256k1?: string;
            };
            voting_power?: string;
            proposer_priority?: string;
        };
        total_voting_power?: string;
    };
}
export interface LightClientAttackEvidence {
    conflicting_block?: {
        signed_header?: {
            header?: {
                version?: {
                    block?: string;
                    app?: string;
                };
                chain_id?: string;
                height?: string;
                time?: string;
                last_block_id?: {
                    hash?: string;
                    part_set_header?: {
                        total?: number;
                        hash?: string;
                    };
                };
                last_commit_hash?: string;
                data_hash?: string;
                validators_hash?: string;
                next_validators_hash?: string;
                consensus_hash?: string;
                app_hash?: string;
                last_results_hash?: string;
                evidence_hash?: string;
                proposer_address?: string;
            };
            commit?: {
                height?: string;
                round?: number;
                block_id?: {
                    hash?: string;
                    part_set_header?: {
                        total?: number;
                        hash?: string;
                    };
                };
                signatures?: {
                    block_id_flag?: "BLOCK_ID_FLAG_UNKNOWN" | "BLOCK_ID_FLAG_ABSENT" | "BLOCK_ID_FLAG_COMMIT" | "BLOCK_ID_FLAG_NIL";
                    validator_address?: string;
                    timestamp?: string;
                    signature?: string;
                }[];
            };
        };
        validator_set?: {
            validators?: {
                address?: string;
                pub_key?: {
                    ed25519?: string;
                    secp256k1?: string;
                };
                voting_power?: string;
                proposer_priority?: string;
            }[];
            proposer?: {
                address?: string;
                pub_key?: {
                    ed25519?: string;
                    secp256k1?: string;
                };
                voting_power?: string;
                proposer_priority?: string;
            };
            total_voting_power?: string;
        };
    };
    /** @format int64 */
    common_height?: string;
    byzantine_validators?: {
        address?: string;
        pub_key?: {
            ed25519?: string;
            secp256k1?: string;
        };
        voting_power?: string;
        proposer_priority?: string;
    }[];
    /** @format int64 */
    total_voting_power?: string;
    /** @format date-time */
    timestamp?: string;
}
export interface Module {
    path?: string;
    version?: string;
    sum?: string;
}
export interface PageRequest {
    /** @format byte */
    key?: string;
    /** @format uint64 */
    offset?: string;
    /** @format uint64 */
    limit?: string;
    count_total?: boolean;
    reverse?: boolean;
}
export interface PageResponse {
    /** @format byte */
    next_key?: string;
    /** @format uint64 */
    total?: string;
}
export interface PartSetHeader {
    /** @format int64 */
    total?: number;
    /** @format byte */
    hash?: string;
}
export interface ProtocolVersion {
    /** @format uint64 */
    p2p?: string;
    /** @format uint64 */
    block?: string;
    /** @format uint64 */
    app?: string;
}
export interface PublicKey {
    /** @format byte */
    ed25519?: string;
    /** @format byte */
    secp256k1?: string;
}
export interface SignedHeader {
    header?: {
        version?: {
            block?: string;
            app?: string;
        };
        chain_id?: string;
        height?: string;
        time?: string;
        last_block_id?: {
            hash?: string;
            part_set_header?: {
                total?: number;
                hash?: string;
            };
        };
        last_commit_hash?: string;
        data_hash?: string;
        validators_hash?: string;
        next_validators_hash?: string;
        consensus_hash?: string;
        app_hash?: string;
        last_results_hash?: string;
        evidence_hash?: string;
        proposer_address?: string;
    };
    commit?: {
        height?: string;
        round?: number;
        block_id?: {
            hash?: string;
            part_set_header?: {
                total?: number;
                hash?: string;
            };
        };
        signatures?: {
            block_id_flag?: "BLOCK_ID_FLAG_UNKNOWN" | "BLOCK_ID_FLAG_ABSENT" | "BLOCK_ID_FLAG_COMMIT" | "BLOCK_ID_FLAG_NIL";
            validator_address?: string;
            timestamp?: string;
            signature?: string;
        }[];
    };
}
export declare enum SignedMsgType {
    SIGNED_MSG_TYPE_UNKNOWN = "SIGNED_MSG_TYPE_UNKNOWN",
    SIGNED_MSG_TYPE_PREVOTE = "SIGNED_MSG_TYPE_PREVOTE",
    SIGNED_MSG_TYPE_PRECOMMIT = "SIGNED_MSG_TYPE_PRECOMMIT",
    SIGNED_MSG_TYPE_PROPOSAL = "SIGNED_MSG_TYPE_PROPOSAL"
}
export interface Status {
    /** @format int32 */
    code?: number;
    message?: string;
    details?: {
        "@type"?: string;
    }[];
}
export interface ValidatorSet {
    validators?: {
        address?: string;
        pub_key?: {
            ed25519?: string;
            secp256k1?: string;
        };
        voting_power?: string;
        proposer_priority?: string;
    }[];
    proposer?: {
        address?: string;
        pub_key?: {
            ed25519?: string;
            secp256k1?: string;
        };
        voting_power?: string;
        proposer_priority?: string;
    };
    /** @format int64 */
    total_voting_power?: string;
}
export interface VersionInfo {
    name?: string;
    app_name?: string;
    version?: string;
    git_commit?: string;
    build_tags?: string;
    go_version?: string;
    build_deps?: {
        path?: string;
        version?: string;
        sum?: string;
    }[];
    cosmos_sdk_version?: string;
}
export interface Vote {
    type?: "SIGNED_MSG_TYPE_UNKNOWN" | "SIGNED_MSG_TYPE_PREVOTE" | "SIGNED_MSG_TYPE_PRECOMMIT" | "SIGNED_MSG_TYPE_PROPOSAL";
    /** @format int64 */
    height?: string;
    /** @format int32 */
    round?: number;
    block_id?: {
        hash?: string;
        part_set_header?: {
            total?: number;
            hash?: string;
        };
    };
    /** @format date-time */
    timestamp?: string;
    /** @format byte */
    validator_address?: string;
    /** @format int32 */
    validator_index?: number;
    /** @format byte */
    signature?: string;
    /** @format byte */
    extension?: string;
    /** @format byte */
    extension_signature?: string;
}
export interface TypesBlock {
    header?: {
        version?: {
            block?: string;
            app?: string;
        };
        chain_id?: string;
        height?: string;
        time?: string;
        last_block_id?: {
            hash?: string;
            part_set_header?: {
                total?: number;
                hash?: string;
            };
        };
        last_commit_hash?: string;
        data_hash?: string;
        validators_hash?: string;
        next_validators_hash?: string;
        consensus_hash?: string;
        app_hash?: string;
        last_results_hash?: string;
        evidence_hash?: string;
        proposer_address?: string;
    };
    data?: {
        txs?: string[];
    };
    evidence?: {
        evidence?: {
            duplicate_vote_evidence?: {
                vote_a?: {
                    type?: "SIGNED_MSG_TYPE_UNKNOWN" | "SIGNED_MSG_TYPE_PREVOTE" | "SIGNED_MSG_TYPE_PRECOMMIT" | "SIGNED_MSG_TYPE_PROPOSAL";
                    height?: string;
                    round?: number;
                    block_id?: {
                        hash?: string;
                        part_set_header?: {
                            total?: number;
                            hash?: string;
                        };
                    };
                    timestamp?: string;
                    validator_address?: string;
                    validator_index?: number;
                    signature?: string;
                    extension?: string;
                    extension_signature?: string;
                };
                vote_b?: {
                    type?: "SIGNED_MSG_TYPE_UNKNOWN" | "SIGNED_MSG_TYPE_PREVOTE" | "SIGNED_MSG_TYPE_PRECOMMIT" | "SIGNED_MSG_TYPE_PROPOSAL";
                    height?: string;
                    round?: number;
                    block_id?: {
                        hash?: string;
                        part_set_header?: {
                            total?: number;
                            hash?: string;
                        };
                    };
                    timestamp?: string;
                    validator_address?: string;
                    validator_index?: number;
                    signature?: string;
                    extension?: string;
                    extension_signature?: string;
                };
                total_voting_power?: string;
                validator_power?: string;
                timestamp?: string;
            };
            light_client_attack_evidence?: {
                conflicting_block?: {
                    signed_header?: {
                        header?: {
                            version?: {
                                block?: string;
                                app?: string;
                            };
                            chain_id?: string;
                            height?: string;
                            time?: string;
                            last_block_id?: {
                                hash?: string;
                                part_set_header?: {
                                    total?: number;
                                    hash?: string;
                                };
                            };
                            last_commit_hash?: string;
                            data_hash?: string;
                            validators_hash?: string;
                            next_validators_hash?: string;
                            consensus_hash?: string;
                            app_hash?: string;
                            last_results_hash?: string;
                            evidence_hash?: string;
                            proposer_address?: string;
                        };
                        commit?: {
                            height?: string;
                            round?: number;
                            block_id?: {
                                hash?: string;
                                part_set_header?: {
                                    total?: number;
                                    hash?: string;
                                };
                            };
                            signatures?: {
                                block_id_flag?: "BLOCK_ID_FLAG_UNKNOWN" | "BLOCK_ID_FLAG_ABSENT" | "BLOCK_ID_FLAG_COMMIT" | "BLOCK_ID_FLAG_NIL";
                                validator_address?: string;
                                timestamp?: string;
                                signature?: string;
                            }[];
                        };
                    };
                    validator_set?: {
                        validators?: {
                            address?: string;
                            pub_key?: {
                                ed25519?: string;
                                secp256k1?: string;
                            };
                            voting_power?: string;
                            proposer_priority?: string;
                        }[];
                        proposer?: {
                            address?: string;
                            pub_key?: {
                                ed25519?: string;
                                secp256k1?: string;
                            };
                            voting_power?: string;
                            proposer_priority?: string;
                        };
                        total_voting_power?: string;
                    };
                };
                common_height?: string;
                byzantine_validators?: {
                    address?: string;
                    pub_key?: {
                        ed25519?: string;
                        secp256k1?: string;
                    };
                    voting_power?: string;
                    proposer_priority?: string;
                }[];
                total_voting_power?: string;
                timestamp?: string;
            };
        }[];
    };
    last_commit?: {
        height?: string;
        round?: number;
        block_id?: {
            hash?: string;
            part_set_header?: {
                total?: number;
                hash?: string;
            };
        };
        signatures?: {
            block_id_flag?: "BLOCK_ID_FLAG_UNKNOWN" | "BLOCK_ID_FLAG_ABSENT" | "BLOCK_ID_FLAG_COMMIT" | "BLOCK_ID_FLAG_NIL";
            validator_address?: string;
            timestamp?: string;
            signature?: string;
        }[];
    };
}
export interface TypesHeader {
    version?: {
        block?: string;
        app?: string;
    };
    chain_id?: string;
    /** @format int64 */
    height?: string;
    /** @format date-time */
    time?: string;
    last_block_id?: {
        hash?: string;
        part_set_header?: {
            total?: number;
            hash?: string;
        };
    };
    /** @format byte */
    last_commit_hash?: string;
    /** @format byte */
    data_hash?: string;
    /** @format byte */
    validators_hash?: string;
    /** @format byte */
    next_validators_hash?: string;
    /** @format byte */
    consensus_hash?: string;
    /** @format byte */
    app_hash?: string;
    /** @format byte */
    last_results_hash?: string;
    /** @format byte */
    evidence_hash?: string;
    /** @format byte */
    proposer_address?: string;
}
export interface TypesValidator {
    /** @format byte */
    address?: string;
    pub_key?: {
        ed25519?: string;
        secp256k1?: string;
    };
    /** @format int64 */
    voting_power?: string;
    /** @format int64 */
    proposer_priority?: string;
}
export interface V1Beta1Block {
    header?: {
        version?: {
            block?: string;
            app?: string;
        };
        chain_id?: string;
        height?: string;
        time?: string;
        last_block_id?: {
            hash?: string;
            part_set_header?: {
                total?: number;
                hash?: string;
            };
        };
        last_commit_hash?: string;
        data_hash?: string;
        validators_hash?: string;
        next_validators_hash?: string;
        consensus_hash?: string;
        app_hash?: string;
        last_results_hash?: string;
        evidence_hash?: string;
        proposer_address?: string;
    };
    data?: {
        txs?: string[];
    };
    evidence?: {
        evidence?: {
            duplicate_vote_evidence?: {
                vote_a?: {
                    type?: "SIGNED_MSG_TYPE_UNKNOWN" | "SIGNED_MSG_TYPE_PREVOTE" | "SIGNED_MSG_TYPE_PRECOMMIT" | "SIGNED_MSG_TYPE_PROPOSAL";
                    height?: string;
                    round?: number;
                    block_id?: {
                        hash?: string;
                        part_set_header?: {
                            total?: number;
                            hash?: string;
                        };
                    };
                    timestamp?: string;
                    validator_address?: string;
                    validator_index?: number;
                    signature?: string;
                    extension?: string;
                    extension_signature?: string;
                };
                vote_b?: {
                    type?: "SIGNED_MSG_TYPE_UNKNOWN" | "SIGNED_MSG_TYPE_PREVOTE" | "SIGNED_MSG_TYPE_PRECOMMIT" | "SIGNED_MSG_TYPE_PROPOSAL";
                    height?: string;
                    round?: number;
                    block_id?: {
                        hash?: string;
                        part_set_header?: {
                            total?: number;
                            hash?: string;
                        };
                    };
                    timestamp?: string;
                    validator_address?: string;
                    validator_index?: number;
                    signature?: string;
                    extension?: string;
                    extension_signature?: string;
                };
                total_voting_power?: string;
                validator_power?: string;
                timestamp?: string;
            };
            light_client_attack_evidence?: {
                conflicting_block?: {
                    signed_header?: {
                        header?: {
                            version?: {
                                block?: string;
                                app?: string;
                            };
                            chain_id?: string;
                            height?: string;
                            time?: string;
                            last_block_id?: {
                                hash?: string;
                                part_set_header?: {
                                    total?: number;
                                    hash?: string;
                                };
                            };
                            last_commit_hash?: string;
                            data_hash?: string;
                            validators_hash?: string;
                            next_validators_hash?: string;
                            consensus_hash?: string;
                            app_hash?: string;
                            last_results_hash?: string;
                            evidence_hash?: string;
                            proposer_address?: string;
                        };
                        commit?: {
                            height?: string;
                            round?: number;
                            block_id?: {
                                hash?: string;
                                part_set_header?: {
                                    total?: number;
                                    hash?: string;
                                };
                            };
                            signatures?: {
                                block_id_flag?: "BLOCK_ID_FLAG_UNKNOWN" | "BLOCK_ID_FLAG_ABSENT" | "BLOCK_ID_FLAG_COMMIT" | "BLOCK_ID_FLAG_NIL";
                                validator_address?: string;
                                timestamp?: string;
                                signature?: string;
                            }[];
                        };
                    };
                    validator_set?: {
                        validators?: {
                            address?: string;
                            pub_key?: {
                                ed25519?: string;
                                secp256k1?: string;
                            };
                            voting_power?: string;
                            proposer_priority?: string;
                        }[];
                        proposer?: {
                            address?: string;
                            pub_key?: {
                                ed25519?: string;
                                secp256k1?: string;
                            };
                            voting_power?: string;
                            proposer_priority?: string;
                        };
                        total_voting_power?: string;
                    };
                };
                common_height?: string;
                byzantine_validators?: {
                    address?: string;
                    pub_key?: {
                        ed25519?: string;
                        secp256k1?: string;
                    };
                    voting_power?: string;
                    proposer_priority?: string;
                }[];
                total_voting_power?: string;
                timestamp?: string;
            };
        }[];
    };
    last_commit?: {
        height?: string;
        round?: number;
        block_id?: {
            hash?: string;
            part_set_header?: {
                total?: number;
                hash?: string;
            };
        };
        signatures?: {
            block_id_flag?: "BLOCK_ID_FLAG_UNKNOWN" | "BLOCK_ID_FLAG_ABSENT" | "BLOCK_ID_FLAG_COMMIT" | "BLOCK_ID_FLAG_NIL";
            validator_address?: string;
            timestamp?: string;
            signature?: string;
        }[];
    };
}
export interface V1Beta1Header {
    version?: {
        block?: string;
        app?: string;
    };
    chain_id?: string;
    /** @format int64 */
    height?: string;
    /** @format date-time */
    time?: string;
    last_block_id?: {
        hash?: string;
        part_set_header?: {
            total?: number;
            hash?: string;
        };
    };
    /** @format byte */
    last_commit_hash?: string;
    /** @format byte */
    data_hash?: string;
    /** @format byte */
    validators_hash?: string;
    /** @format byte */
    next_validators_hash?: string;
    /** @format byte */
    consensus_hash?: string;
    /** @format byte */
    app_hash?: string;
    /** @format byte */
    last_results_hash?: string;
    /** @format byte */
    evidence_hash?: string;
    proposer_address?: string;
}
export interface V1Beta1ProofOp {
    type?: string;
    /** @format byte */
    key?: string;
    /** @format byte */
    data?: string;
}
export interface V1Beta1ProofOps {
    ops?: {
        type?: string;
        key?: string;
        data?: string;
    }[];
}
export interface V1Beta1Validator {
    address?: string;
    pub_key?: {
        "@type"?: string;
    };
    /** @format int64 */
    voting_power?: string;
    /** @format int64 */
    proposer_priority?: string;
}
import { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
export type QueryParamsType = Record<string | number, any>;
export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseType;
    /** request body */
    body?: unknown;
}
export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;
export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
    securityWorker?: (securityData: SecurityDataType | null) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
    secure?: boolean;
    format?: ResponseType;
}
export declare enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded"
}
export declare class HttpClient<SecurityDataType = unknown> {
    instance: AxiosInstance;
    private securityData;
    private securityWorker?;
    private secure?;
    private format?;
    constructor({ securityWorker, secure, format, ...axiosConfig }?: ApiConfig<SecurityDataType>);
    setSecurityData: (data: SecurityDataType | null) => void;
    private mergeRequestParams;
    private createFormData;
    request: <T = any, _E = any>({ secure, path, type, query, format, body, ...params }: FullRequestParams) => Promise<AxiosResponse<T>>;
}
/**
 * @title HTTP API Console cosmos.base.tendermint.v1beta1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Service
     * @name ServiceAbciQuery
     * @request GET:/cosmos/base/tendermint/v1beta1/abci_query
     */
    serviceABCIQuery: (query?: {
        data?: string;
        path?: string;
        height?: string;
        prove?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        code?: number;
        log?: string;
        info?: string;
        index?: string;
        key?: string;
        value?: string;
        proof_ops?: {
            ops?: {
                type?: string;
                key?: string;
                data?: string;
            }[];
        };
        height?: string;
        codespace?: string;
    }>>;
    /**
     * No description
     *
     * @tags Service
     * @name ServiceGetLatestBlock
     * @request GET:/cosmos/base/tendermint/v1beta1/blocks/latest
     */
    serviceGetLatestBlock: (params?: RequestParams) => Promise<AxiosResponse<{
        block_id?: {
            hash?: string;
            part_set_header?: {
                total?: number;
                hash?: string;
            };
        };
        block?: {
            header?: {
                version?: {
                    block?: string;
                    app?: string;
                };
                chain_id?: string;
                height?: string;
                time?: string;
                last_block_id?: {
                    hash?: string;
                    part_set_header?: {
                        total?: number;
                        hash?: string;
                    };
                };
                last_commit_hash?: string;
                data_hash?: string;
                validators_hash?: string;
                next_validators_hash?: string;
                consensus_hash?: string;
                app_hash?: string;
                last_results_hash?: string;
                evidence_hash?: string;
                proposer_address?: string;
            };
            data?: {
                txs?: string[];
            };
            evidence?: {
                evidence?: {
                    duplicate_vote_evidence?: {
                        vote_a?: {
                            type?: "SIGNED_MSG_TYPE_UNKNOWN" | "SIGNED_MSG_TYPE_PREVOTE" | "SIGNED_MSG_TYPE_PRECOMMIT" | "SIGNED_MSG_TYPE_PROPOSAL";
                            height?: string;
                            round?: number;
                            block_id?: {
                                hash?: string;
                                part_set_header?: {
                                    total?: number;
                                    hash?: string;
                                };
                            };
                            timestamp?: string;
                            validator_address?: string;
                            validator_index?: number;
                            signature?: string;
                            extension?: string;
                            extension_signature?: string;
                        };
                        vote_b?: {
                            type?: "SIGNED_MSG_TYPE_UNKNOWN" | "SIGNED_MSG_TYPE_PREVOTE" | "SIGNED_MSG_TYPE_PRECOMMIT" | "SIGNED_MSG_TYPE_PROPOSAL";
                            height?: string;
                            round?: number;
                            block_id?: {
                                hash?: string;
                                part_set_header?: {
                                    total?: number;
                                    hash?: string;
                                };
                            };
                            timestamp?: string;
                            validator_address?: string;
                            validator_index?: number;
                            signature?: string;
                            extension?: string;
                            extension_signature?: string;
                        };
                        total_voting_power?: string;
                        validator_power?: string;
                        timestamp?: string;
                    };
                    light_client_attack_evidence?: {
                        conflicting_block?: {
                            signed_header?: {
                                header?: {
                                    version?: {
                                        block?: string;
                                        app?: string;
                                    };
                                    chain_id?: string;
                                    height?: string;
                                    time?: string;
                                    last_block_id?: {
                                        hash?: string;
                                        part_set_header?: {
                                            total?: number;
                                            hash?: string;
                                        };
                                    };
                                    last_commit_hash?: string;
                                    data_hash?: string;
                                    validators_hash?: string;
                                    next_validators_hash?: string;
                                    consensus_hash?: string;
                                    app_hash?: string;
                                    last_results_hash?: string;
                                    evidence_hash?: string;
                                    proposer_address?: string;
                                };
                                commit?: {
                                    height?: string;
                                    round?: number;
                                    block_id?: {
                                        hash?: string;
                                        part_set_header?: {
                                            total?: number;
                                            hash?: string;
                                        };
                                    };
                                    signatures?: {
                                        block_id_flag?: "BLOCK_ID_FLAG_UNKNOWN" | "BLOCK_ID_FLAG_ABSENT" | "BLOCK_ID_FLAG_COMMIT" | "BLOCK_ID_FLAG_NIL";
                                        validator_address?: string;
                                        timestamp?: string;
                                        signature?: string;
                                    }[];
                                };
                            };
                            validator_set?: {
                                validators?: {
                                    address?: string;
                                    pub_key?: {
                                        ed25519?: string;
                                        secp256k1?: string;
                                    };
                                    voting_power?: string;
                                    proposer_priority?: string;
                                }[];
                                proposer?: {
                                    address?: string;
                                    pub_key?: {
                                        ed25519?: string;
                                        secp256k1?: string;
                                    };
                                    voting_power?: string;
                                    proposer_priority?: string;
                                };
                                total_voting_power?: string;
                            };
                        };
                        common_height?: string;
                        byzantine_validators?: {
                            address?: string;
                            pub_key?: {
                                ed25519?: string;
                                secp256k1?: string;
                            };
                            voting_power?: string;
                            proposer_priority?: string;
                        }[];
                        total_voting_power?: string;
                        timestamp?: string;
                    };
                }[];
            };
            last_commit?: {
                height?: string;
                round?: number;
                block_id?: {
                    hash?: string;
                    part_set_header?: {
                        total?: number;
                        hash?: string;
                    };
                };
                signatures?: {
                    block_id_flag?: "BLOCK_ID_FLAG_UNKNOWN" | "BLOCK_ID_FLAG_ABSENT" | "BLOCK_ID_FLAG_COMMIT" | "BLOCK_ID_FLAG_NIL";
                    validator_address?: string;
                    timestamp?: string;
                    signature?: string;
                }[];
            };
        };
        sdk_block?: {
            header?: {
                version?: {
                    block?: string;
                    app?: string;
                };
                chain_id?: string;
                height?: string;
                time?: string;
                last_block_id?: {
                    hash?: string;
                    part_set_header?: {
                        total?: number;
                        hash?: string;
                    };
                };
                last_commit_hash?: string;
                data_hash?: string;
                validators_hash?: string;
                next_validators_hash?: string;
                consensus_hash?: string;
                app_hash?: string;
                last_results_hash?: string;
                evidence_hash?: string;
                proposer_address?: string;
            };
            data?: {
                txs?: string[];
            };
            evidence?: {
                evidence?: {
                    duplicate_vote_evidence?: {
                        vote_a?: {
                            type?: "SIGNED_MSG_TYPE_UNKNOWN" | "SIGNED_MSG_TYPE_PREVOTE" | "SIGNED_MSG_TYPE_PRECOMMIT" | "SIGNED_MSG_TYPE_PROPOSAL";
                            height?: string;
                            round?: number;
                            block_id?: {
                                hash?: string;
                                part_set_header?: {
                                    total?: number;
                                    hash?: string;
                                };
                            };
                            timestamp?: string;
                            validator_address?: string;
                            validator_index?: number;
                            signature?: string;
                            extension?: string;
                            extension_signature?: string;
                        };
                        vote_b?: {
                            type?: "SIGNED_MSG_TYPE_UNKNOWN" | "SIGNED_MSG_TYPE_PREVOTE" | "SIGNED_MSG_TYPE_PRECOMMIT" | "SIGNED_MSG_TYPE_PROPOSAL";
                            height?: string;
                            round?: number;
                            block_id?: {
                                hash?: string;
                                part_set_header?: {
                                    total?: number;
                                    hash?: string;
                                };
                            };
                            timestamp?: string;
                            validator_address?: string;
                            validator_index?: number;
                            signature?: string;
                            extension?: string;
                            extension_signature?: string;
                        };
                        total_voting_power?: string;
                        validator_power?: string;
                        timestamp?: string;
                    };
                    light_client_attack_evidence?: {
                        conflicting_block?: {
                            signed_header?: {
                                header?: {
                                    version?: {
                                        block?: string;
                                        app?: string;
                                    };
                                    chain_id?: string;
                                    height?: string;
                                    time?: string;
                                    last_block_id?: {
                                        hash?: string;
                                        part_set_header?: {
                                            total?: number;
                                            hash?: string;
                                        };
                                    };
                                    last_commit_hash?: string;
                                    data_hash?: string;
                                    validators_hash?: string;
                                    next_validators_hash?: string;
                                    consensus_hash?: string;
                                    app_hash?: string;
                                    last_results_hash?: string;
                                    evidence_hash?: string;
                                    proposer_address?: string;
                                };
                                commit?: {
                                    height?: string;
                                    round?: number;
                                    block_id?: {
                                        hash?: string;
                                        part_set_header?: {
                                            total?: number;
                                            hash?: string;
                                        };
                                    };
                                    signatures?: {
                                        block_id_flag?: "BLOCK_ID_FLAG_UNKNOWN" | "BLOCK_ID_FLAG_ABSENT" | "BLOCK_ID_FLAG_COMMIT" | "BLOCK_ID_FLAG_NIL";
                                        validator_address?: string;
                                        timestamp?: string;
                                        signature?: string;
                                    }[];
                                };
                            };
                            validator_set?: {
                                validators?: {
                                    address?: string;
                                    pub_key?: {
                                        ed25519?: string;
                                        secp256k1?: string;
                                    };
                                    voting_power?: string;
                                    proposer_priority?: string;
                                }[];
                                proposer?: {
                                    address?: string;
                                    pub_key?: {
                                        ed25519?: string;
                                        secp256k1?: string;
                                    };
                                    voting_power?: string;
                                    proposer_priority?: string;
                                };
                                total_voting_power?: string;
                            };
                        };
                        common_height?: string;
                        byzantine_validators?: {
                            address?: string;
                            pub_key?: {
                                ed25519?: string;
                                secp256k1?: string;
                            };
                            voting_power?: string;
                            proposer_priority?: string;
                        }[];
                        total_voting_power?: string;
                        timestamp?: string;
                    };
                }[];
            };
            last_commit?: {
                height?: string;
                round?: number;
                block_id?: {
                    hash?: string;
                    part_set_header?: {
                        total?: number;
                        hash?: string;
                    };
                };
                signatures?: {
                    block_id_flag?: "BLOCK_ID_FLAG_UNKNOWN" | "BLOCK_ID_FLAG_ABSENT" | "BLOCK_ID_FLAG_COMMIT" | "BLOCK_ID_FLAG_NIL";
                    validator_address?: string;
                    timestamp?: string;
                    signature?: string;
                }[];
            };
        };
    }>>;
    /**
     * No description
     *
     * @tags Service
     * @name ServiceGetBlockByHeight
     * @request GET:/cosmos/base/tendermint/v1beta1/blocks/{height}
     */
    serviceGetBlockByHeight: (height: string, params?: RequestParams) => Promise<AxiosResponse<{
        block_id?: {
            hash?: string;
            part_set_header?: {
                total?: number;
                hash?: string;
            };
        };
        block?: {
            header?: {
                version?: {
                    block?: string;
                    app?: string;
                };
                chain_id?: string;
                height?: string;
                time?: string;
                last_block_id?: {
                    hash?: string;
                    part_set_header?: {
                        total?: number;
                        hash?: string;
                    };
                };
                last_commit_hash?: string;
                data_hash?: string;
                validators_hash?: string;
                next_validators_hash?: string;
                consensus_hash?: string;
                app_hash?: string;
                last_results_hash?: string;
                evidence_hash?: string;
                proposer_address?: string;
            };
            data?: {
                txs?: string[];
            };
            evidence?: {
                evidence?: {
                    duplicate_vote_evidence?: {
                        vote_a?: {
                            type?: "SIGNED_MSG_TYPE_UNKNOWN" | "SIGNED_MSG_TYPE_PREVOTE" | "SIGNED_MSG_TYPE_PRECOMMIT" | "SIGNED_MSG_TYPE_PROPOSAL";
                            height?: string;
                            round?: number;
                            block_id?: {
                                hash?: string;
                                part_set_header?: {
                                    total?: number;
                                    hash?: string;
                                };
                            };
                            timestamp?: string;
                            validator_address?: string;
                            validator_index?: number;
                            signature?: string;
                            extension?: string;
                            extension_signature?: string;
                        };
                        vote_b?: {
                            type?: "SIGNED_MSG_TYPE_UNKNOWN" | "SIGNED_MSG_TYPE_PREVOTE" | "SIGNED_MSG_TYPE_PRECOMMIT" | "SIGNED_MSG_TYPE_PROPOSAL";
                            height?: string;
                            round?: number;
                            block_id?: {
                                hash?: string;
                                part_set_header?: {
                                    total?: number;
                                    hash?: string;
                                };
                            };
                            timestamp?: string;
                            validator_address?: string;
                            validator_index?: number;
                            signature?: string;
                            extension?: string;
                            extension_signature?: string;
                        };
                        total_voting_power?: string;
                        validator_power?: string;
                        timestamp?: string;
                    };
                    light_client_attack_evidence?: {
                        conflicting_block?: {
                            signed_header?: {
                                header?: {
                                    version?: {
                                        block?: string;
                                        app?: string;
                                    };
                                    chain_id?: string;
                                    height?: string;
                                    time?: string;
                                    last_block_id?: {
                                        hash?: string;
                                        part_set_header?: {
                                            total?: number;
                                            hash?: string;
                                        };
                                    };
                                    last_commit_hash?: string;
                                    data_hash?: string;
                                    validators_hash?: string;
                                    next_validators_hash?: string;
                                    consensus_hash?: string;
                                    app_hash?: string;
                                    last_results_hash?: string;
                                    evidence_hash?: string;
                                    proposer_address?: string;
                                };
                                commit?: {
                                    height?: string;
                                    round?: number;
                                    block_id?: {
                                        hash?: string;
                                        part_set_header?: {
                                            total?: number;
                                            hash?: string;
                                        };
                                    };
                                    signatures?: {
                                        block_id_flag?: "BLOCK_ID_FLAG_UNKNOWN" | "BLOCK_ID_FLAG_ABSENT" | "BLOCK_ID_FLAG_COMMIT" | "BLOCK_ID_FLAG_NIL";
                                        validator_address?: string;
                                        timestamp?: string;
                                        signature?: string;
                                    }[];
                                };
                            };
                            validator_set?: {
                                validators?: {
                                    address?: string;
                                    pub_key?: {
                                        ed25519?: string;
                                        secp256k1?: string;
                                    };
                                    voting_power?: string;
                                    proposer_priority?: string;
                                }[];
                                proposer?: {
                                    address?: string;
                                    pub_key?: {
                                        ed25519?: string;
                                        secp256k1?: string;
                                    };
                                    voting_power?: string;
                                    proposer_priority?: string;
                                };
                                total_voting_power?: string;
                            };
                        };
                        common_height?: string;
                        byzantine_validators?: {
                            address?: string;
                            pub_key?: {
                                ed25519?: string;
                                secp256k1?: string;
                            };
                            voting_power?: string;
                            proposer_priority?: string;
                        }[];
                        total_voting_power?: string;
                        timestamp?: string;
                    };
                }[];
            };
            last_commit?: {
                height?: string;
                round?: number;
                block_id?: {
                    hash?: string;
                    part_set_header?: {
                        total?: number;
                        hash?: string;
                    };
                };
                signatures?: {
                    block_id_flag?: "BLOCK_ID_FLAG_UNKNOWN" | "BLOCK_ID_FLAG_ABSENT" | "BLOCK_ID_FLAG_COMMIT" | "BLOCK_ID_FLAG_NIL";
                    validator_address?: string;
                    timestamp?: string;
                    signature?: string;
                }[];
            };
        };
        sdk_block?: {
            header?: {
                version?: {
                    block?: string;
                    app?: string;
                };
                chain_id?: string;
                height?: string;
                time?: string;
                last_block_id?: {
                    hash?: string;
                    part_set_header?: {
                        total?: number;
                        hash?: string;
                    };
                };
                last_commit_hash?: string;
                data_hash?: string;
                validators_hash?: string;
                next_validators_hash?: string;
                consensus_hash?: string;
                app_hash?: string;
                last_results_hash?: string;
                evidence_hash?: string;
                proposer_address?: string;
            };
            data?: {
                txs?: string[];
            };
            evidence?: {
                evidence?: {
                    duplicate_vote_evidence?: {
                        vote_a?: {
                            type?: "SIGNED_MSG_TYPE_UNKNOWN" | "SIGNED_MSG_TYPE_PREVOTE" | "SIGNED_MSG_TYPE_PRECOMMIT" | "SIGNED_MSG_TYPE_PROPOSAL";
                            height?: string;
                            round?: number;
                            block_id?: {
                                hash?: string;
                                part_set_header?: {
                                    total?: number;
                                    hash?: string;
                                };
                            };
                            timestamp?: string;
                            validator_address?: string;
                            validator_index?: number;
                            signature?: string;
                            extension?: string;
                            extension_signature?: string;
                        };
                        vote_b?: {
                            type?: "SIGNED_MSG_TYPE_UNKNOWN" | "SIGNED_MSG_TYPE_PREVOTE" | "SIGNED_MSG_TYPE_PRECOMMIT" | "SIGNED_MSG_TYPE_PROPOSAL";
                            height?: string;
                            round?: number;
                            block_id?: {
                                hash?: string;
                                part_set_header?: {
                                    total?: number;
                                    hash?: string;
                                };
                            };
                            timestamp?: string;
                            validator_address?: string;
                            validator_index?: number;
                            signature?: string;
                            extension?: string;
                            extension_signature?: string;
                        };
                        total_voting_power?: string;
                        validator_power?: string;
                        timestamp?: string;
                    };
                    light_client_attack_evidence?: {
                        conflicting_block?: {
                            signed_header?: {
                                header?: {
                                    version?: {
                                        block?: string;
                                        app?: string;
                                    };
                                    chain_id?: string;
                                    height?: string;
                                    time?: string;
                                    last_block_id?: {
                                        hash?: string;
                                        part_set_header?: {
                                            total?: number;
                                            hash?: string;
                                        };
                                    };
                                    last_commit_hash?: string;
                                    data_hash?: string;
                                    validators_hash?: string;
                                    next_validators_hash?: string;
                                    consensus_hash?: string;
                                    app_hash?: string;
                                    last_results_hash?: string;
                                    evidence_hash?: string;
                                    proposer_address?: string;
                                };
                                commit?: {
                                    height?: string;
                                    round?: number;
                                    block_id?: {
                                        hash?: string;
                                        part_set_header?: {
                                            total?: number;
                                            hash?: string;
                                        };
                                    };
                                    signatures?: {
                                        block_id_flag?: "BLOCK_ID_FLAG_UNKNOWN" | "BLOCK_ID_FLAG_ABSENT" | "BLOCK_ID_FLAG_COMMIT" | "BLOCK_ID_FLAG_NIL";
                                        validator_address?: string;
                                        timestamp?: string;
                                        signature?: string;
                                    }[];
                                };
                            };
                            validator_set?: {
                                validators?: {
                                    address?: string;
                                    pub_key?: {
                                        ed25519?: string;
                                        secp256k1?: string;
                                    };
                                    voting_power?: string;
                                    proposer_priority?: string;
                                }[];
                                proposer?: {
                                    address?: string;
                                    pub_key?: {
                                        ed25519?: string;
                                        secp256k1?: string;
                                    };
                                    voting_power?: string;
                                    proposer_priority?: string;
                                };
                                total_voting_power?: string;
                            };
                        };
                        common_height?: string;
                        byzantine_validators?: {
                            address?: string;
                            pub_key?: {
                                ed25519?: string;
                                secp256k1?: string;
                            };
                            voting_power?: string;
                            proposer_priority?: string;
                        }[];
                        total_voting_power?: string;
                        timestamp?: string;
                    };
                }[];
            };
            last_commit?: {
                height?: string;
                round?: number;
                block_id?: {
                    hash?: string;
                    part_set_header?: {
                        total?: number;
                        hash?: string;
                    };
                };
                signatures?: {
                    block_id_flag?: "BLOCK_ID_FLAG_UNKNOWN" | "BLOCK_ID_FLAG_ABSENT" | "BLOCK_ID_FLAG_COMMIT" | "BLOCK_ID_FLAG_NIL";
                    validator_address?: string;
                    timestamp?: string;
                    signature?: string;
                }[];
            };
        };
    }>>;
    /**
     * No description
     *
     * @tags Service
     * @name ServiceGetNodeInfo
     * @request GET:/cosmos/base/tendermint/v1beta1/node_info
     */
    serviceGetNodeInfo: (params?: RequestParams) => Promise<AxiosResponse<{
        default_node_info?: {
            protocol_version?: {
                p2p?: string;
                block?: string;
                app?: string;
            };
            default_node_id?: string;
            listen_addr?: string;
            network?: string;
            version?: string;
            channels?: string;
            moniker?: string;
            other?: {
                tx_index?: string;
                rpc_address?: string;
            };
        };
        application_version?: {
            name?: string;
            app_name?: string;
            version?: string;
            git_commit?: string;
            build_tags?: string;
            go_version?: string;
            build_deps?: {
                path?: string;
                version?: string;
                sum?: string;
            }[];
            cosmos_sdk_version?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Service
     * @name ServiceGetSyncing
     * @request GET:/cosmos/base/tendermint/v1beta1/syncing
     */
    serviceGetSyncing: (params?: RequestParams) => Promise<AxiosResponse<{
        syncing?: boolean;
    }>>;
    /**
     * No description
     *
     * @tags Service
     * @name ServiceGetLatestValidatorSet
     * @request GET:/cosmos/base/tendermint/v1beta1/validatorsets/latest
     */
    serviceGetLatestValidatorSet: (query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        block_height?: string;
        validators?: {
            address?: string;
            pub_key?: {
                "@type"?: string;
            };
            voting_power?: string;
            proposer_priority?: string;
        }[];
        pagination?: {
            next_key?: string;
            total?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Service
     * @name ServiceGetValidatorSetByHeight
     * @request GET:/cosmos/base/tendermint/v1beta1/validatorsets/{height}
     */
    serviceGetValidatorSetByHeight: (height: string, query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        block_height?: string;
        validators?: {
            address?: string;
            pub_key?: {
                "@type"?: string;
            };
            voting_power?: string;
            proposer_priority?: string;
        }[];
        pagination?: {
            next_key?: string;
            total?: string;
        };
    }>>;
}
