import _m0 from "protobufjs/minimal";
import { EvidenceList } from "../../../../tendermint/types/evidence";
import { BlockID, Commit, Data } from "../../../../tendermint/types/types";
import { Consensus } from "../../../../tendermint/version/types";
export declare const protobufPackage = "cosmos.base.tendermint.v1beta1";
/**
 * Block is tendermint type Block, with the Header proposer address
 * field converted to bech32 string.
 */
export interface Block {
    header: Header | undefined;
    data: Data | undefined;
    evidence: EvidenceList | undefined;
    lastCommit: Commit | undefined;
}
/** Header defines the structure of a Tendermint block header. */
export interface Header {
    /** basic block info */
    version: Consensus | undefined;
    chainId: string;
    height: number;
    time: Date | undefined;
    /** prev block info */
    lastBlockId: BlockID | undefined;
    /** hashes of block data */
    lastCommitHash: Uint8Array;
    /** transactions */
    dataHash: Uint8Array;
    /** hashes from the app output from the prev block */
    validatorsHash: Uint8Array;
    /** validators for the next block */
    nextValidatorsHash: Uint8Array;
    /** consensus params for current block */
    consensusHash: Uint8Array;
    /** state after txs from the previous block */
    appHash: Uint8Array;
    /** root hash of all results from the txs from the previous block */
    lastResultsHash: Uint8Array;
    /** consensus info */
    evidenceHash: Uint8Array;
    /**
     * proposer_address is the original block proposer address, formatted as a Bech32 string.
     * In Tendermint, this type is `bytes`, but in the SDK, we convert it to a Bech32 string
     * for better UX.
     */
    proposerAddress: string;
}
export declare const Block: {
    encode(message: Block, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Block;
    fromJSON(object: any): Block;
    toJSON(message: Block): unknown;
    create<I extends {
        header?: {
            version?: {
                block?: number;
                app?: number;
            };
            chainId?: string;
            height?: number;
            time?: Date | undefined;
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
            proposerAddress?: string;
        };
        data?: {
            txs?: Uint8Array[];
        };
        evidence?: {
            evidence?: {
                duplicateVoteEvidence?: {
                    voteA?: {
                        type?: import("../../../../tendermint/types/types").SignedMsgType;
                        height?: number;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                        extension?: Uint8Array;
                        extensionSignature?: Uint8Array;
                    };
                    voteB?: {
                        type?: import("../../../../tendermint/types/types").SignedMsgType;
                        height?: number;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                        extension?: Uint8Array;
                        extensionSignature?: Uint8Array;
                    };
                    totalVotingPower?: number;
                    validatorPower?: number;
                    timestamp?: Date;
                };
                lightClientAttackEvidence?: {
                    conflictingBlock?: {
                        signedHeader?: {
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
                            commit?: {
                                height?: number;
                                round?: number;
                                blockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                signatures?: {
                                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                }[];
                            };
                        };
                        validatorSet?: {
                            validators?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            }[];
                            proposer?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            };
                            totalVotingPower?: number;
                        };
                    };
                    commonHeight?: number;
                    byzantineValidators?: {
                        address?: Uint8Array;
                        pubKey?: {
                            ed25519?: Uint8Array;
                            secp256k1?: Uint8Array;
                        };
                        votingPower?: number;
                        proposerPriority?: number;
                    }[];
                    totalVotingPower?: number;
                    timestamp?: Date;
                };
            }[];
        };
        lastCommit?: {
            height?: number;
            round?: number;
            blockId?: {
                hash?: Uint8Array;
                partSetHeader?: {
                    total?: number;
                    hash?: Uint8Array;
                };
            };
            signatures?: {
                blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                validatorAddress?: Uint8Array;
                timestamp?: Date;
                signature?: Uint8Array;
            }[];
        };
    } & {
        header?: {
            version?: {
                block?: number;
                app?: number;
            };
            chainId?: string;
            height?: number;
            time?: Date | undefined;
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
            proposerAddress?: string;
        } & {
            version?: {
                block?: number;
                app?: number;
            } & {
                block?: number;
                app?: number;
            } & { [K in Exclude<keyof I["header"]["version"], keyof Consensus>]: never; };
            chainId?: string;
            height?: number;
            time?: Date | undefined;
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
                } & { [K_1 in Exclude<keyof I["header"]["lastBlockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
            } & { [K_2 in Exclude<keyof I["header"]["lastBlockId"], keyof BlockID>]: never; };
            lastCommitHash?: Uint8Array;
            dataHash?: Uint8Array;
            validatorsHash?: Uint8Array;
            nextValidatorsHash?: Uint8Array;
            consensusHash?: Uint8Array;
            appHash?: Uint8Array;
            lastResultsHash?: Uint8Array;
            evidenceHash?: Uint8Array;
            proposerAddress?: string;
        } & { [K_3 in Exclude<keyof I["header"], keyof Header>]: never; };
        data?: {
            txs?: Uint8Array[];
        } & {
            txs?: Uint8Array[] & Uint8Array[] & { [K_4 in Exclude<keyof I["data"]["txs"], keyof Uint8Array[]>]: never; };
        } & { [K_5 in Exclude<keyof I["data"], "txs">]: never; };
        evidence?: {
            evidence?: {
                duplicateVoteEvidence?: {
                    voteA?: {
                        type?: import("../../../../tendermint/types/types").SignedMsgType;
                        height?: number;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                        extension?: Uint8Array;
                        extensionSignature?: Uint8Array;
                    };
                    voteB?: {
                        type?: import("../../../../tendermint/types/types").SignedMsgType;
                        height?: number;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                        extension?: Uint8Array;
                        extensionSignature?: Uint8Array;
                    };
                    totalVotingPower?: number;
                    validatorPower?: number;
                    timestamp?: Date;
                };
                lightClientAttackEvidence?: {
                    conflictingBlock?: {
                        signedHeader?: {
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
                            commit?: {
                                height?: number;
                                round?: number;
                                blockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                signatures?: {
                                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                }[];
                            };
                        };
                        validatorSet?: {
                            validators?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            }[];
                            proposer?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            };
                            totalVotingPower?: number;
                        };
                    };
                    commonHeight?: number;
                    byzantineValidators?: {
                        address?: Uint8Array;
                        pubKey?: {
                            ed25519?: Uint8Array;
                            secp256k1?: Uint8Array;
                        };
                        votingPower?: number;
                        proposerPriority?: number;
                    }[];
                    totalVotingPower?: number;
                    timestamp?: Date;
                };
            }[];
        } & {
            evidence?: {
                duplicateVoteEvidence?: {
                    voteA?: {
                        type?: import("../../../../tendermint/types/types").SignedMsgType;
                        height?: number;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                        extension?: Uint8Array;
                        extensionSignature?: Uint8Array;
                    };
                    voteB?: {
                        type?: import("../../../../tendermint/types/types").SignedMsgType;
                        height?: number;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                        extension?: Uint8Array;
                        extensionSignature?: Uint8Array;
                    };
                    totalVotingPower?: number;
                    validatorPower?: number;
                    timestamp?: Date;
                };
                lightClientAttackEvidence?: {
                    conflictingBlock?: {
                        signedHeader?: {
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
                            commit?: {
                                height?: number;
                                round?: number;
                                blockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                signatures?: {
                                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                }[];
                            };
                        };
                        validatorSet?: {
                            validators?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            }[];
                            proposer?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            };
                            totalVotingPower?: number;
                        };
                    };
                    commonHeight?: number;
                    byzantineValidators?: {
                        address?: Uint8Array;
                        pubKey?: {
                            ed25519?: Uint8Array;
                            secp256k1?: Uint8Array;
                        };
                        votingPower?: number;
                        proposerPriority?: number;
                    }[];
                    totalVotingPower?: number;
                    timestamp?: Date;
                };
            }[] & ({
                duplicateVoteEvidence?: {
                    voteA?: {
                        type?: import("../../../../tendermint/types/types").SignedMsgType;
                        height?: number;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                        extension?: Uint8Array;
                        extensionSignature?: Uint8Array;
                    };
                    voteB?: {
                        type?: import("../../../../tendermint/types/types").SignedMsgType;
                        height?: number;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                        extension?: Uint8Array;
                        extensionSignature?: Uint8Array;
                    };
                    totalVotingPower?: number;
                    validatorPower?: number;
                    timestamp?: Date;
                };
                lightClientAttackEvidence?: {
                    conflictingBlock?: {
                        signedHeader?: {
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
                            commit?: {
                                height?: number;
                                round?: number;
                                blockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                signatures?: {
                                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                }[];
                            };
                        };
                        validatorSet?: {
                            validators?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            }[];
                            proposer?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            };
                            totalVotingPower?: number;
                        };
                    };
                    commonHeight?: number;
                    byzantineValidators?: {
                        address?: Uint8Array;
                        pubKey?: {
                            ed25519?: Uint8Array;
                            secp256k1?: Uint8Array;
                        };
                        votingPower?: number;
                        proposerPriority?: number;
                    }[];
                    totalVotingPower?: number;
                    timestamp?: Date;
                };
            } & {
                duplicateVoteEvidence?: {
                    voteA?: {
                        type?: import("../../../../tendermint/types/types").SignedMsgType;
                        height?: number;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                        extension?: Uint8Array;
                        extensionSignature?: Uint8Array;
                    };
                    voteB?: {
                        type?: import("../../../../tendermint/types/types").SignedMsgType;
                        height?: number;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                        extension?: Uint8Array;
                        extensionSignature?: Uint8Array;
                    };
                    totalVotingPower?: number;
                    validatorPower?: number;
                    timestamp?: Date;
                } & {
                    voteA?: {
                        type?: import("../../../../tendermint/types/types").SignedMsgType;
                        height?: number;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                        extension?: Uint8Array;
                        extensionSignature?: Uint8Array;
                    } & {
                        type?: import("../../../../tendermint/types/types").SignedMsgType;
                        height?: number;
                        round?: number;
                        blockId?: {
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
                            } & { [K_6 in Exclude<keyof I["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                        } & { [K_7 in Exclude<keyof I["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"]["blockId"], keyof BlockID>]: never; };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                        extension?: Uint8Array;
                        extensionSignature?: Uint8Array;
                    } & { [K_8 in Exclude<keyof I["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"], keyof import("../../../../tendermint/types/types").Vote>]: never; };
                    voteB?: {
                        type?: import("../../../../tendermint/types/types").SignedMsgType;
                        height?: number;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                        extension?: Uint8Array;
                        extensionSignature?: Uint8Array;
                    } & {
                        type?: import("../../../../tendermint/types/types").SignedMsgType;
                        height?: number;
                        round?: number;
                        blockId?: {
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
                            } & { [K_9 in Exclude<keyof I["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                        } & { [K_10 in Exclude<keyof I["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"]["blockId"], keyof BlockID>]: never; };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                        extension?: Uint8Array;
                        extensionSignature?: Uint8Array;
                    } & { [K_11 in Exclude<keyof I["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"], keyof import("../../../../tendermint/types/types").Vote>]: never; };
                    totalVotingPower?: number;
                    validatorPower?: number;
                    timestamp?: Date;
                } & { [K_12 in Exclude<keyof I["evidence"]["evidence"][number]["duplicateVoteEvidence"], keyof import("../../../../tendermint/types/evidence").DuplicateVoteEvidence>]: never; };
                lightClientAttackEvidence?: {
                    conflictingBlock?: {
                        signedHeader?: {
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
                            commit?: {
                                height?: number;
                                round?: number;
                                blockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                signatures?: {
                                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                }[];
                            };
                        };
                        validatorSet?: {
                            validators?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            }[];
                            proposer?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            };
                            totalVotingPower?: number;
                        };
                    };
                    commonHeight?: number;
                    byzantineValidators?: {
                        address?: Uint8Array;
                        pubKey?: {
                            ed25519?: Uint8Array;
                            secp256k1?: Uint8Array;
                        };
                        votingPower?: number;
                        proposerPriority?: number;
                    }[];
                    totalVotingPower?: number;
                    timestamp?: Date;
                } & {
                    conflictingBlock?: {
                        signedHeader?: {
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
                            commit?: {
                                height?: number;
                                round?: number;
                                blockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                signatures?: {
                                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                }[];
                            };
                        };
                        validatorSet?: {
                            validators?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            }[];
                            proposer?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            };
                            totalVotingPower?: number;
                        };
                    } & {
                        signedHeader?: {
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
                            commit?: {
                                height?: number;
                                round?: number;
                                blockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                signatures?: {
                                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                }[];
                            };
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
                                } & { [K_13 in Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["version"], keyof Consensus>]: never; };
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
                                    } & { [K_14 in Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                                } & { [K_15 in Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"], keyof BlockID>]: never; };
                                lastCommitHash?: Uint8Array;
                                dataHash?: Uint8Array;
                                validatorsHash?: Uint8Array;
                                nextValidatorsHash?: Uint8Array;
                                consensusHash?: Uint8Array;
                                appHash?: Uint8Array;
                                lastResultsHash?: Uint8Array;
                                evidenceHash?: Uint8Array;
                                proposerAddress?: Uint8Array;
                            } & { [K_16 in Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"], keyof import("../../../../tendermint/types/types").Header>]: never; };
                            commit?: {
                                height?: number;
                                round?: number;
                                blockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                signatures?: {
                                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                }[];
                            } & {
                                height?: number;
                                round?: number;
                                blockId?: {
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
                                    } & { [K_17 in Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                                } & { [K_18 in Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"], keyof BlockID>]: never; };
                                signatures?: {
                                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                }[] & ({
                                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                } & {
                                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                } & { [K_19 in Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"][number], keyof import("../../../../tendermint/types/types").CommitSig>]: never; })[] & { [K_20 in Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"], keyof {
                                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                }[]>]: never; };
                            } & { [K_21 in Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"], keyof Commit>]: never; };
                        } & { [K_22 in Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"], keyof import("../../../../tendermint/types/types").SignedHeader>]: never; };
                        validatorSet?: {
                            validators?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            }[];
                            proposer?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            };
                            totalVotingPower?: number;
                        } & {
                            validators?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            }[] & ({
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            } & {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                } & {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                } & { [K_23 in Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                                votingPower?: number;
                                proposerPriority?: number;
                            } & { [K_24 in Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number], keyof import("../../../../tendermint/types/validator").Validator>]: never; })[] & { [K_25 in Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"], keyof {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            }[]>]: never; };
                            proposer?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            } & {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                } & {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                } & { [K_26 in Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                                votingPower?: number;
                                proposerPriority?: number;
                            } & { [K_27 in Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"], keyof import("../../../../tendermint/types/validator").Validator>]: never; };
                            totalVotingPower?: number;
                        } & { [K_28 in Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"], keyof import("../../../../tendermint/types/validator").ValidatorSet>]: never; };
                    } & { [K_29 in Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"], keyof import("../../../../tendermint/types/types").LightBlock>]: never; };
                    commonHeight?: number;
                    byzantineValidators?: {
                        address?: Uint8Array;
                        pubKey?: {
                            ed25519?: Uint8Array;
                            secp256k1?: Uint8Array;
                        };
                        votingPower?: number;
                        proposerPriority?: number;
                    }[] & ({
                        address?: Uint8Array;
                        pubKey?: {
                            ed25519?: Uint8Array;
                            secp256k1?: Uint8Array;
                        };
                        votingPower?: number;
                        proposerPriority?: number;
                    } & {
                        address?: Uint8Array;
                        pubKey?: {
                            ed25519?: Uint8Array;
                            secp256k1?: Uint8Array;
                        } & {
                            ed25519?: Uint8Array;
                            secp256k1?: Uint8Array;
                        } & { [K_30 in Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                        votingPower?: number;
                        proposerPriority?: number;
                    } & { [K_31 in Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number], keyof import("../../../../tendermint/types/validator").Validator>]: never; })[] & { [K_32 in Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"], keyof {
                        address?: Uint8Array;
                        pubKey?: {
                            ed25519?: Uint8Array;
                            secp256k1?: Uint8Array;
                        };
                        votingPower?: number;
                        proposerPriority?: number;
                    }[]>]: never; };
                    totalVotingPower?: number;
                    timestamp?: Date;
                } & { [K_33 in Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"], keyof import("../../../../tendermint/types/evidence").LightClientAttackEvidence>]: never; };
            } & { [K_34 in Exclude<keyof I["evidence"]["evidence"][number], keyof import("../../../../tendermint/types/evidence").Evidence>]: never; })[] & { [K_35 in Exclude<keyof I["evidence"]["evidence"], keyof {
                duplicateVoteEvidence?: {
                    voteA?: {
                        type?: import("../../../../tendermint/types/types").SignedMsgType;
                        height?: number;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                        extension?: Uint8Array;
                        extensionSignature?: Uint8Array;
                    };
                    voteB?: {
                        type?: import("../../../../tendermint/types/types").SignedMsgType;
                        height?: number;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                        extension?: Uint8Array;
                        extensionSignature?: Uint8Array;
                    };
                    totalVotingPower?: number;
                    validatorPower?: number;
                    timestamp?: Date;
                };
                lightClientAttackEvidence?: {
                    conflictingBlock?: {
                        signedHeader?: {
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
                            commit?: {
                                height?: number;
                                round?: number;
                                blockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                signatures?: {
                                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                }[];
                            };
                        };
                        validatorSet?: {
                            validators?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            }[];
                            proposer?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            };
                            totalVotingPower?: number;
                        };
                    };
                    commonHeight?: number;
                    byzantineValidators?: {
                        address?: Uint8Array;
                        pubKey?: {
                            ed25519?: Uint8Array;
                            secp256k1?: Uint8Array;
                        };
                        votingPower?: number;
                        proposerPriority?: number;
                    }[];
                    totalVotingPower?: number;
                    timestamp?: Date;
                };
            }[]>]: never; };
        } & { [K_36 in Exclude<keyof I["evidence"], "evidence">]: never; };
        lastCommit?: {
            height?: number;
            round?: number;
            blockId?: {
                hash?: Uint8Array;
                partSetHeader?: {
                    total?: number;
                    hash?: Uint8Array;
                };
            };
            signatures?: {
                blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                validatorAddress?: Uint8Array;
                timestamp?: Date;
                signature?: Uint8Array;
            }[];
        } & {
            height?: number;
            round?: number;
            blockId?: {
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
                } & { [K_37 in Exclude<keyof I["lastCommit"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
            } & { [K_38 in Exclude<keyof I["lastCommit"]["blockId"], keyof BlockID>]: never; };
            signatures?: {
                blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                validatorAddress?: Uint8Array;
                timestamp?: Date;
                signature?: Uint8Array;
            }[] & ({
                blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                validatorAddress?: Uint8Array;
                timestamp?: Date;
                signature?: Uint8Array;
            } & {
                blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                validatorAddress?: Uint8Array;
                timestamp?: Date;
                signature?: Uint8Array;
            } & { [K_39 in Exclude<keyof I["lastCommit"]["signatures"][number], keyof import("../../../../tendermint/types/types").CommitSig>]: never; })[] & { [K_40 in Exclude<keyof I["lastCommit"]["signatures"], keyof {
                blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                validatorAddress?: Uint8Array;
                timestamp?: Date;
                signature?: Uint8Array;
            }[]>]: never; };
        } & { [K_41 in Exclude<keyof I["lastCommit"], keyof Commit>]: never; };
    } & { [K_42 in Exclude<keyof I, keyof Block>]: never; }>(base?: I): Block;
    fromPartial<I_1 extends {
        header?: {
            version?: {
                block?: number;
                app?: number;
            };
            chainId?: string;
            height?: number;
            time?: Date | undefined;
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
            proposerAddress?: string;
        };
        data?: {
            txs?: Uint8Array[];
        };
        evidence?: {
            evidence?: {
                duplicateVoteEvidence?: {
                    voteA?: {
                        type?: import("../../../../tendermint/types/types").SignedMsgType;
                        height?: number;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                        extension?: Uint8Array;
                        extensionSignature?: Uint8Array;
                    };
                    voteB?: {
                        type?: import("../../../../tendermint/types/types").SignedMsgType;
                        height?: number;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                        extension?: Uint8Array;
                        extensionSignature?: Uint8Array;
                    };
                    totalVotingPower?: number;
                    validatorPower?: number;
                    timestamp?: Date;
                };
                lightClientAttackEvidence?: {
                    conflictingBlock?: {
                        signedHeader?: {
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
                            commit?: {
                                height?: number;
                                round?: number;
                                blockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                signatures?: {
                                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                }[];
                            };
                        };
                        validatorSet?: {
                            validators?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            }[];
                            proposer?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            };
                            totalVotingPower?: number;
                        };
                    };
                    commonHeight?: number;
                    byzantineValidators?: {
                        address?: Uint8Array;
                        pubKey?: {
                            ed25519?: Uint8Array;
                            secp256k1?: Uint8Array;
                        };
                        votingPower?: number;
                        proposerPriority?: number;
                    }[];
                    totalVotingPower?: number;
                    timestamp?: Date;
                };
            }[];
        };
        lastCommit?: {
            height?: number;
            round?: number;
            blockId?: {
                hash?: Uint8Array;
                partSetHeader?: {
                    total?: number;
                    hash?: Uint8Array;
                };
            };
            signatures?: {
                blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                validatorAddress?: Uint8Array;
                timestamp?: Date;
                signature?: Uint8Array;
            }[];
        };
    } & {
        header?: {
            version?: {
                block?: number;
                app?: number;
            };
            chainId?: string;
            height?: number;
            time?: Date | undefined;
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
            proposerAddress?: string;
        } & {
            version?: {
                block?: number;
                app?: number;
            } & {
                block?: number;
                app?: number;
            } & { [K_43 in Exclude<keyof I_1["header"]["version"], keyof Consensus>]: never; };
            chainId?: string;
            height?: number;
            time?: Date | undefined;
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
                } & { [K_44 in Exclude<keyof I_1["header"]["lastBlockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
            } & { [K_45 in Exclude<keyof I_1["header"]["lastBlockId"], keyof BlockID>]: never; };
            lastCommitHash?: Uint8Array;
            dataHash?: Uint8Array;
            validatorsHash?: Uint8Array;
            nextValidatorsHash?: Uint8Array;
            consensusHash?: Uint8Array;
            appHash?: Uint8Array;
            lastResultsHash?: Uint8Array;
            evidenceHash?: Uint8Array;
            proposerAddress?: string;
        } & { [K_46 in Exclude<keyof I_1["header"], keyof Header>]: never; };
        data?: {
            txs?: Uint8Array[];
        } & {
            txs?: Uint8Array[] & Uint8Array[] & { [K_47 in Exclude<keyof I_1["data"]["txs"], keyof Uint8Array[]>]: never; };
        } & { [K_48 in Exclude<keyof I_1["data"], "txs">]: never; };
        evidence?: {
            evidence?: {
                duplicateVoteEvidence?: {
                    voteA?: {
                        type?: import("../../../../tendermint/types/types").SignedMsgType;
                        height?: number;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                        extension?: Uint8Array;
                        extensionSignature?: Uint8Array;
                    };
                    voteB?: {
                        type?: import("../../../../tendermint/types/types").SignedMsgType;
                        height?: number;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                        extension?: Uint8Array;
                        extensionSignature?: Uint8Array;
                    };
                    totalVotingPower?: number;
                    validatorPower?: number;
                    timestamp?: Date;
                };
                lightClientAttackEvidence?: {
                    conflictingBlock?: {
                        signedHeader?: {
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
                            commit?: {
                                height?: number;
                                round?: number;
                                blockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                signatures?: {
                                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                }[];
                            };
                        };
                        validatorSet?: {
                            validators?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            }[];
                            proposer?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            };
                            totalVotingPower?: number;
                        };
                    };
                    commonHeight?: number;
                    byzantineValidators?: {
                        address?: Uint8Array;
                        pubKey?: {
                            ed25519?: Uint8Array;
                            secp256k1?: Uint8Array;
                        };
                        votingPower?: number;
                        proposerPriority?: number;
                    }[];
                    totalVotingPower?: number;
                    timestamp?: Date;
                };
            }[];
        } & {
            evidence?: {
                duplicateVoteEvidence?: {
                    voteA?: {
                        type?: import("../../../../tendermint/types/types").SignedMsgType;
                        height?: number;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                        extension?: Uint8Array;
                        extensionSignature?: Uint8Array;
                    };
                    voteB?: {
                        type?: import("../../../../tendermint/types/types").SignedMsgType;
                        height?: number;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                        extension?: Uint8Array;
                        extensionSignature?: Uint8Array;
                    };
                    totalVotingPower?: number;
                    validatorPower?: number;
                    timestamp?: Date;
                };
                lightClientAttackEvidence?: {
                    conflictingBlock?: {
                        signedHeader?: {
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
                            commit?: {
                                height?: number;
                                round?: number;
                                blockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                signatures?: {
                                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                }[];
                            };
                        };
                        validatorSet?: {
                            validators?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            }[];
                            proposer?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            };
                            totalVotingPower?: number;
                        };
                    };
                    commonHeight?: number;
                    byzantineValidators?: {
                        address?: Uint8Array;
                        pubKey?: {
                            ed25519?: Uint8Array;
                            secp256k1?: Uint8Array;
                        };
                        votingPower?: number;
                        proposerPriority?: number;
                    }[];
                    totalVotingPower?: number;
                    timestamp?: Date;
                };
            }[] & ({
                duplicateVoteEvidence?: {
                    voteA?: {
                        type?: import("../../../../tendermint/types/types").SignedMsgType;
                        height?: number;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                        extension?: Uint8Array;
                        extensionSignature?: Uint8Array;
                    };
                    voteB?: {
                        type?: import("../../../../tendermint/types/types").SignedMsgType;
                        height?: number;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                        extension?: Uint8Array;
                        extensionSignature?: Uint8Array;
                    };
                    totalVotingPower?: number;
                    validatorPower?: number;
                    timestamp?: Date;
                };
                lightClientAttackEvidence?: {
                    conflictingBlock?: {
                        signedHeader?: {
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
                            commit?: {
                                height?: number;
                                round?: number;
                                blockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                signatures?: {
                                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                }[];
                            };
                        };
                        validatorSet?: {
                            validators?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            }[];
                            proposer?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            };
                            totalVotingPower?: number;
                        };
                    };
                    commonHeight?: number;
                    byzantineValidators?: {
                        address?: Uint8Array;
                        pubKey?: {
                            ed25519?: Uint8Array;
                            secp256k1?: Uint8Array;
                        };
                        votingPower?: number;
                        proposerPriority?: number;
                    }[];
                    totalVotingPower?: number;
                    timestamp?: Date;
                };
            } & {
                duplicateVoteEvidence?: {
                    voteA?: {
                        type?: import("../../../../tendermint/types/types").SignedMsgType;
                        height?: number;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                        extension?: Uint8Array;
                        extensionSignature?: Uint8Array;
                    };
                    voteB?: {
                        type?: import("../../../../tendermint/types/types").SignedMsgType;
                        height?: number;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                        extension?: Uint8Array;
                        extensionSignature?: Uint8Array;
                    };
                    totalVotingPower?: number;
                    validatorPower?: number;
                    timestamp?: Date;
                } & {
                    voteA?: {
                        type?: import("../../../../tendermint/types/types").SignedMsgType;
                        height?: number;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                        extension?: Uint8Array;
                        extensionSignature?: Uint8Array;
                    } & {
                        type?: import("../../../../tendermint/types/types").SignedMsgType;
                        height?: number;
                        round?: number;
                        blockId?: {
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
                            } & { [K_49 in Exclude<keyof I_1["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                        } & { [K_50 in Exclude<keyof I_1["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"]["blockId"], keyof BlockID>]: never; };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                        extension?: Uint8Array;
                        extensionSignature?: Uint8Array;
                    } & { [K_51 in Exclude<keyof I_1["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"], keyof import("../../../../tendermint/types/types").Vote>]: never; };
                    voteB?: {
                        type?: import("../../../../tendermint/types/types").SignedMsgType;
                        height?: number;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                        extension?: Uint8Array;
                        extensionSignature?: Uint8Array;
                    } & {
                        type?: import("../../../../tendermint/types/types").SignedMsgType;
                        height?: number;
                        round?: number;
                        blockId?: {
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
                            } & { [K_52 in Exclude<keyof I_1["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                        } & { [K_53 in Exclude<keyof I_1["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"]["blockId"], keyof BlockID>]: never; };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                        extension?: Uint8Array;
                        extensionSignature?: Uint8Array;
                    } & { [K_54 in Exclude<keyof I_1["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"], keyof import("../../../../tendermint/types/types").Vote>]: never; };
                    totalVotingPower?: number;
                    validatorPower?: number;
                    timestamp?: Date;
                } & { [K_55 in Exclude<keyof I_1["evidence"]["evidence"][number]["duplicateVoteEvidence"], keyof import("../../../../tendermint/types/evidence").DuplicateVoteEvidence>]: never; };
                lightClientAttackEvidence?: {
                    conflictingBlock?: {
                        signedHeader?: {
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
                            commit?: {
                                height?: number;
                                round?: number;
                                blockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                signatures?: {
                                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                }[];
                            };
                        };
                        validatorSet?: {
                            validators?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            }[];
                            proposer?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            };
                            totalVotingPower?: number;
                        };
                    };
                    commonHeight?: number;
                    byzantineValidators?: {
                        address?: Uint8Array;
                        pubKey?: {
                            ed25519?: Uint8Array;
                            secp256k1?: Uint8Array;
                        };
                        votingPower?: number;
                        proposerPriority?: number;
                    }[];
                    totalVotingPower?: number;
                    timestamp?: Date;
                } & {
                    conflictingBlock?: {
                        signedHeader?: {
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
                            commit?: {
                                height?: number;
                                round?: number;
                                blockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                signatures?: {
                                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                }[];
                            };
                        };
                        validatorSet?: {
                            validators?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            }[];
                            proposer?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            };
                            totalVotingPower?: number;
                        };
                    } & {
                        signedHeader?: {
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
                            commit?: {
                                height?: number;
                                round?: number;
                                blockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                signatures?: {
                                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                }[];
                            };
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
                                } & { [K_56 in Exclude<keyof I_1["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["version"], keyof Consensus>]: never; };
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
                                    } & { [K_57 in Exclude<keyof I_1["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                                } & { [K_58 in Exclude<keyof I_1["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"], keyof BlockID>]: never; };
                                lastCommitHash?: Uint8Array;
                                dataHash?: Uint8Array;
                                validatorsHash?: Uint8Array;
                                nextValidatorsHash?: Uint8Array;
                                consensusHash?: Uint8Array;
                                appHash?: Uint8Array;
                                lastResultsHash?: Uint8Array;
                                evidenceHash?: Uint8Array;
                                proposerAddress?: Uint8Array;
                            } & { [K_59 in Exclude<keyof I_1["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"], keyof import("../../../../tendermint/types/types").Header>]: never; };
                            commit?: {
                                height?: number;
                                round?: number;
                                blockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                signatures?: {
                                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                }[];
                            } & {
                                height?: number;
                                round?: number;
                                blockId?: {
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
                                    } & { [K_60 in Exclude<keyof I_1["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                                } & { [K_61 in Exclude<keyof I_1["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"], keyof BlockID>]: never; };
                                signatures?: {
                                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                }[] & ({
                                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                } & {
                                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                } & { [K_62 in Exclude<keyof I_1["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"][number], keyof import("../../../../tendermint/types/types").CommitSig>]: never; })[] & { [K_63 in Exclude<keyof I_1["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"], keyof {
                                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                }[]>]: never; };
                            } & { [K_64 in Exclude<keyof I_1["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"], keyof Commit>]: never; };
                        } & { [K_65 in Exclude<keyof I_1["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"], keyof import("../../../../tendermint/types/types").SignedHeader>]: never; };
                        validatorSet?: {
                            validators?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            }[];
                            proposer?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            };
                            totalVotingPower?: number;
                        } & {
                            validators?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            }[] & ({
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            } & {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                } & {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                } & { [K_66 in Exclude<keyof I_1["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                                votingPower?: number;
                                proposerPriority?: number;
                            } & { [K_67 in Exclude<keyof I_1["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number], keyof import("../../../../tendermint/types/validator").Validator>]: never; })[] & { [K_68 in Exclude<keyof I_1["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"], keyof {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            }[]>]: never; };
                            proposer?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            } & {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                } & {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                } & { [K_69 in Exclude<keyof I_1["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                                votingPower?: number;
                                proposerPriority?: number;
                            } & { [K_70 in Exclude<keyof I_1["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"], keyof import("../../../../tendermint/types/validator").Validator>]: never; };
                            totalVotingPower?: number;
                        } & { [K_71 in Exclude<keyof I_1["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"], keyof import("../../../../tendermint/types/validator").ValidatorSet>]: never; };
                    } & { [K_72 in Exclude<keyof I_1["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"], keyof import("../../../../tendermint/types/types").LightBlock>]: never; };
                    commonHeight?: number;
                    byzantineValidators?: {
                        address?: Uint8Array;
                        pubKey?: {
                            ed25519?: Uint8Array;
                            secp256k1?: Uint8Array;
                        };
                        votingPower?: number;
                        proposerPriority?: number;
                    }[] & ({
                        address?: Uint8Array;
                        pubKey?: {
                            ed25519?: Uint8Array;
                            secp256k1?: Uint8Array;
                        };
                        votingPower?: number;
                        proposerPriority?: number;
                    } & {
                        address?: Uint8Array;
                        pubKey?: {
                            ed25519?: Uint8Array;
                            secp256k1?: Uint8Array;
                        } & {
                            ed25519?: Uint8Array;
                            secp256k1?: Uint8Array;
                        } & { [K_73 in Exclude<keyof I_1["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                        votingPower?: number;
                        proposerPriority?: number;
                    } & { [K_74 in Exclude<keyof I_1["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number], keyof import("../../../../tendermint/types/validator").Validator>]: never; })[] & { [K_75 in Exclude<keyof I_1["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"], keyof {
                        address?: Uint8Array;
                        pubKey?: {
                            ed25519?: Uint8Array;
                            secp256k1?: Uint8Array;
                        };
                        votingPower?: number;
                        proposerPriority?: number;
                    }[]>]: never; };
                    totalVotingPower?: number;
                    timestamp?: Date;
                } & { [K_76 in Exclude<keyof I_1["evidence"]["evidence"][number]["lightClientAttackEvidence"], keyof import("../../../../tendermint/types/evidence").LightClientAttackEvidence>]: never; };
            } & { [K_77 in Exclude<keyof I_1["evidence"]["evidence"][number], keyof import("../../../../tendermint/types/evidence").Evidence>]: never; })[] & { [K_78 in Exclude<keyof I_1["evidence"]["evidence"], keyof {
                duplicateVoteEvidence?: {
                    voteA?: {
                        type?: import("../../../../tendermint/types/types").SignedMsgType;
                        height?: number;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                        extension?: Uint8Array;
                        extensionSignature?: Uint8Array;
                    };
                    voteB?: {
                        type?: import("../../../../tendermint/types/types").SignedMsgType;
                        height?: number;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                        extension?: Uint8Array;
                        extensionSignature?: Uint8Array;
                    };
                    totalVotingPower?: number;
                    validatorPower?: number;
                    timestamp?: Date;
                };
                lightClientAttackEvidence?: {
                    conflictingBlock?: {
                        signedHeader?: {
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
                            commit?: {
                                height?: number;
                                round?: number;
                                blockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                signatures?: {
                                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                }[];
                            };
                        };
                        validatorSet?: {
                            validators?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            }[];
                            proposer?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: number;
                                proposerPriority?: number;
                            };
                            totalVotingPower?: number;
                        };
                    };
                    commonHeight?: number;
                    byzantineValidators?: {
                        address?: Uint8Array;
                        pubKey?: {
                            ed25519?: Uint8Array;
                            secp256k1?: Uint8Array;
                        };
                        votingPower?: number;
                        proposerPriority?: number;
                    }[];
                    totalVotingPower?: number;
                    timestamp?: Date;
                };
            }[]>]: never; };
        } & { [K_79 in Exclude<keyof I_1["evidence"], "evidence">]: never; };
        lastCommit?: {
            height?: number;
            round?: number;
            blockId?: {
                hash?: Uint8Array;
                partSetHeader?: {
                    total?: number;
                    hash?: Uint8Array;
                };
            };
            signatures?: {
                blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                validatorAddress?: Uint8Array;
                timestamp?: Date;
                signature?: Uint8Array;
            }[];
        } & {
            height?: number;
            round?: number;
            blockId?: {
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
                } & { [K_80 in Exclude<keyof I_1["lastCommit"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
            } & { [K_81 in Exclude<keyof I_1["lastCommit"]["blockId"], keyof BlockID>]: never; };
            signatures?: {
                blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                validatorAddress?: Uint8Array;
                timestamp?: Date;
                signature?: Uint8Array;
            }[] & ({
                blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                validatorAddress?: Uint8Array;
                timestamp?: Date;
                signature?: Uint8Array;
            } & {
                blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                validatorAddress?: Uint8Array;
                timestamp?: Date;
                signature?: Uint8Array;
            } & { [K_82 in Exclude<keyof I_1["lastCommit"]["signatures"][number], keyof import("../../../../tendermint/types/types").CommitSig>]: never; })[] & { [K_83 in Exclude<keyof I_1["lastCommit"]["signatures"], keyof {
                blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                validatorAddress?: Uint8Array;
                timestamp?: Date;
                signature?: Uint8Array;
            }[]>]: never; };
        } & { [K_84 in Exclude<keyof I_1["lastCommit"], keyof Commit>]: never; };
    } & { [K_85 in Exclude<keyof I_1, keyof Block>]: never; }>(object: I_1): Block;
};
export declare const Header: {
    encode(message: Header, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Header;
    fromJSON(object: any): Header;
    toJSON(message: Header): unknown;
    create<I extends {
        version?: {
            block?: number;
            app?: number;
        };
        chainId?: string;
        height?: number;
        time?: Date | undefined;
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
        proposerAddress?: string;
    } & {
        version?: {
            block?: number;
            app?: number;
        } & {
            block?: number;
            app?: number;
        } & { [K in Exclude<keyof I["version"], keyof Consensus>]: never; };
        chainId?: string;
        height?: number;
        time?: Date | undefined;
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
            } & { [K_1 in Exclude<keyof I["lastBlockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
        } & { [K_2 in Exclude<keyof I["lastBlockId"], keyof BlockID>]: never; };
        lastCommitHash?: Uint8Array;
        dataHash?: Uint8Array;
        validatorsHash?: Uint8Array;
        nextValidatorsHash?: Uint8Array;
        consensusHash?: Uint8Array;
        appHash?: Uint8Array;
        lastResultsHash?: Uint8Array;
        evidenceHash?: Uint8Array;
        proposerAddress?: string;
    } & { [K_3 in Exclude<keyof I, keyof Header>]: never; }>(base?: I): Header;
    fromPartial<I_1 extends {
        version?: {
            block?: number;
            app?: number;
        };
        chainId?: string;
        height?: number;
        time?: Date | undefined;
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
        proposerAddress?: string;
    } & {
        version?: {
            block?: number;
            app?: number;
        } & {
            block?: number;
            app?: number;
        } & { [K_4 in Exclude<keyof I_1["version"], keyof Consensus>]: never; };
        chainId?: string;
        height?: number;
        time?: Date | undefined;
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
            } & { [K_5 in Exclude<keyof I_1["lastBlockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
        } & { [K_6 in Exclude<keyof I_1["lastBlockId"], keyof BlockID>]: never; };
        lastCommitHash?: Uint8Array;
        dataHash?: Uint8Array;
        validatorsHash?: Uint8Array;
        nextValidatorsHash?: Uint8Array;
        consensusHash?: Uint8Array;
        appHash?: Uint8Array;
        lastResultsHash?: Uint8Array;
        evidenceHash?: Uint8Array;
        proposerAddress?: string;
    } & { [K_7 in Exclude<keyof I_1, keyof Header>]: never; }>(object: I_1): Header;
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
