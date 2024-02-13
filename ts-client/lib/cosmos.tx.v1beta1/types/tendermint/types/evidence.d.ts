import _m0 from "protobufjs/minimal";
import { LightBlock, Vote } from "./types";
import { Validator } from "./validator";
export declare const protobufPackage = "tendermint.types";
export interface Evidence {
    duplicateVoteEvidence?: DuplicateVoteEvidence | undefined;
    lightClientAttackEvidence?: LightClientAttackEvidence | undefined;
}
/** DuplicateVoteEvidence contains evidence of a validator signed two conflicting votes. */
export interface DuplicateVoteEvidence {
    voteA: Vote | undefined;
    voteB: Vote | undefined;
    totalVotingPower: number;
    validatorPower: number;
    timestamp: Date | undefined;
}
/** LightClientAttackEvidence contains evidence of a set of validators attempting to mislead a light client. */
export interface LightClientAttackEvidence {
    conflictingBlock: LightBlock | undefined;
    commonHeight: number;
    byzantineValidators: Validator[];
    totalVotingPower: number;
    timestamp: Date | undefined;
}
export interface EvidenceList {
    evidence: Evidence[];
}
export declare const Evidence: {
    encode(message: Evidence, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Evidence;
    fromJSON(object: any): Evidence;
    toJSON(message: Evidence): unknown;
    create<I extends {
        duplicateVoteEvidence?: {
            voteA?: {
                type?: import("./types").SignedMsgType;
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
                type?: import("./types").SignedMsgType;
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
            timestamp?: Date | undefined;
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
                            blockIdFlag?: import("./validator").BlockIDFlag;
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
            timestamp?: Date | undefined;
        };
    } & {
        duplicateVoteEvidence?: {
            voteA?: {
                type?: import("./types").SignedMsgType;
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
                type?: import("./types").SignedMsgType;
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
            timestamp?: Date | undefined;
        } & {
            voteA?: {
                type?: import("./types").SignedMsgType;
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
                type?: import("./types").SignedMsgType;
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
                    } & { [K in Exclude<keyof I["duplicateVoteEvidence"]["voteA"]["blockId"]["partSetHeader"], keyof import("./types").PartSetHeader>]: never; };
                } & { [K_1 in Exclude<keyof I["duplicateVoteEvidence"]["voteA"]["blockId"], keyof import("./types").BlockID>]: never; };
                timestamp?: Date;
                validatorAddress?: Uint8Array;
                validatorIndex?: number;
                signature?: Uint8Array;
                extension?: Uint8Array;
                extensionSignature?: Uint8Array;
            } & { [K_2 in Exclude<keyof I["duplicateVoteEvidence"]["voteA"], keyof Vote>]: never; };
            voteB?: {
                type?: import("./types").SignedMsgType;
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
                type?: import("./types").SignedMsgType;
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
                    } & { [K_3 in Exclude<keyof I["duplicateVoteEvidence"]["voteB"]["blockId"]["partSetHeader"], keyof import("./types").PartSetHeader>]: never; };
                } & { [K_4 in Exclude<keyof I["duplicateVoteEvidence"]["voteB"]["blockId"], keyof import("./types").BlockID>]: never; };
                timestamp?: Date;
                validatorAddress?: Uint8Array;
                validatorIndex?: number;
                signature?: Uint8Array;
                extension?: Uint8Array;
                extensionSignature?: Uint8Array;
            } & { [K_5 in Exclude<keyof I["duplicateVoteEvidence"]["voteB"], keyof Vote>]: never; };
            totalVotingPower?: number;
            validatorPower?: number;
            timestamp?: Date | undefined;
        } & { [K_6 in Exclude<keyof I["duplicateVoteEvidence"], keyof DuplicateVoteEvidence>]: never; };
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
                            blockIdFlag?: import("./validator").BlockIDFlag;
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
            timestamp?: Date | undefined;
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
                            blockIdFlag?: import("./validator").BlockIDFlag;
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
                            blockIdFlag?: import("./validator").BlockIDFlag;
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
                        } & { [K_7 in Exclude<keyof I["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["version"], keyof import("../version/types").Consensus>]: never; };
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
                            } & { [K_8 in Exclude<keyof I["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"]["partSetHeader"], keyof import("./types").PartSetHeader>]: never; };
                        } & { [K_9 in Exclude<keyof I["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"], keyof import("./types").BlockID>]: never; };
                        lastCommitHash?: Uint8Array;
                        dataHash?: Uint8Array;
                        validatorsHash?: Uint8Array;
                        nextValidatorsHash?: Uint8Array;
                        consensusHash?: Uint8Array;
                        appHash?: Uint8Array;
                        lastResultsHash?: Uint8Array;
                        evidenceHash?: Uint8Array;
                        proposerAddress?: Uint8Array;
                    } & { [K_10 in Exclude<keyof I["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"], keyof import("./types").Header>]: never; };
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
                            blockIdFlag?: import("./validator").BlockIDFlag;
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
                            } & { [K_11 in Exclude<keyof I["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"]["partSetHeader"], keyof import("./types").PartSetHeader>]: never; };
                        } & { [K_12 in Exclude<keyof I["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"], keyof import("./types").BlockID>]: never; };
                        signatures?: {
                            blockIdFlag?: import("./validator").BlockIDFlag;
                            validatorAddress?: Uint8Array;
                            timestamp?: Date;
                            signature?: Uint8Array;
                        }[] & ({
                            blockIdFlag?: import("./validator").BlockIDFlag;
                            validatorAddress?: Uint8Array;
                            timestamp?: Date;
                            signature?: Uint8Array;
                        } & {
                            blockIdFlag?: import("./validator").BlockIDFlag;
                            validatorAddress?: Uint8Array;
                            timestamp?: Date;
                            signature?: Uint8Array;
                        } & { [K_13 in Exclude<keyof I["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"][number], keyof import("./types").CommitSig>]: never; })[] & { [K_14 in Exclude<keyof I["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"], keyof {
                            blockIdFlag?: import("./validator").BlockIDFlag;
                            validatorAddress?: Uint8Array;
                            timestamp?: Date;
                            signature?: Uint8Array;
                        }[]>]: never; };
                    } & { [K_15 in Exclude<keyof I["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"], keyof import("./types").Commit>]: never; };
                } & { [K_16 in Exclude<keyof I["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"], keyof import("./types").SignedHeader>]: never; };
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
                        } & { [K_17 in Exclude<keyof I["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number]["pubKey"], keyof import("../crypto/keys").PublicKey>]: never; };
                        votingPower?: number;
                        proposerPriority?: number;
                    } & { [K_18 in Exclude<keyof I["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number], keyof Validator>]: never; })[] & { [K_19 in Exclude<keyof I["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"], keyof {
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
                        } & { [K_20 in Exclude<keyof I["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"]["pubKey"], keyof import("../crypto/keys").PublicKey>]: never; };
                        votingPower?: number;
                        proposerPriority?: number;
                    } & { [K_21 in Exclude<keyof I["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"], keyof Validator>]: never; };
                    totalVotingPower?: number;
                } & { [K_22 in Exclude<keyof I["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"], keyof import("./validator").ValidatorSet>]: never; };
            } & { [K_23 in Exclude<keyof I["lightClientAttackEvidence"]["conflictingBlock"], keyof LightBlock>]: never; };
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
                } & { [K_24 in Exclude<keyof I["lightClientAttackEvidence"]["byzantineValidators"][number]["pubKey"], keyof import("../crypto/keys").PublicKey>]: never; };
                votingPower?: number;
                proposerPriority?: number;
            } & { [K_25 in Exclude<keyof I["lightClientAttackEvidence"]["byzantineValidators"][number], keyof Validator>]: never; })[] & { [K_26 in Exclude<keyof I["lightClientAttackEvidence"]["byzantineValidators"], keyof {
                address?: Uint8Array;
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                };
                votingPower?: number;
                proposerPriority?: number;
            }[]>]: never; };
            totalVotingPower?: number;
            timestamp?: Date | undefined;
        } & { [K_27 in Exclude<keyof I["lightClientAttackEvidence"], keyof LightClientAttackEvidence>]: never; };
    } & { [K_28 in Exclude<keyof I, keyof Evidence>]: never; }>(base?: I): Evidence;
    fromPartial<I_1 extends {
        duplicateVoteEvidence?: {
            voteA?: {
                type?: import("./types").SignedMsgType;
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
                type?: import("./types").SignedMsgType;
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
            timestamp?: Date | undefined;
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
                            blockIdFlag?: import("./validator").BlockIDFlag;
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
            timestamp?: Date | undefined;
        };
    } & {
        duplicateVoteEvidence?: {
            voteA?: {
                type?: import("./types").SignedMsgType;
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
                type?: import("./types").SignedMsgType;
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
            timestamp?: Date | undefined;
        } & {
            voteA?: {
                type?: import("./types").SignedMsgType;
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
                type?: import("./types").SignedMsgType;
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
                    } & { [K_29 in Exclude<keyof I_1["duplicateVoteEvidence"]["voteA"]["blockId"]["partSetHeader"], keyof import("./types").PartSetHeader>]: never; };
                } & { [K_30 in Exclude<keyof I_1["duplicateVoteEvidence"]["voteA"]["blockId"], keyof import("./types").BlockID>]: never; };
                timestamp?: Date;
                validatorAddress?: Uint8Array;
                validatorIndex?: number;
                signature?: Uint8Array;
                extension?: Uint8Array;
                extensionSignature?: Uint8Array;
            } & { [K_31 in Exclude<keyof I_1["duplicateVoteEvidence"]["voteA"], keyof Vote>]: never; };
            voteB?: {
                type?: import("./types").SignedMsgType;
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
                type?: import("./types").SignedMsgType;
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
                    } & { [K_32 in Exclude<keyof I_1["duplicateVoteEvidence"]["voteB"]["blockId"]["partSetHeader"], keyof import("./types").PartSetHeader>]: never; };
                } & { [K_33 in Exclude<keyof I_1["duplicateVoteEvidence"]["voteB"]["blockId"], keyof import("./types").BlockID>]: never; };
                timestamp?: Date;
                validatorAddress?: Uint8Array;
                validatorIndex?: number;
                signature?: Uint8Array;
                extension?: Uint8Array;
                extensionSignature?: Uint8Array;
            } & { [K_34 in Exclude<keyof I_1["duplicateVoteEvidence"]["voteB"], keyof Vote>]: never; };
            totalVotingPower?: number;
            validatorPower?: number;
            timestamp?: Date | undefined;
        } & { [K_35 in Exclude<keyof I_1["duplicateVoteEvidence"], keyof DuplicateVoteEvidence>]: never; };
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
                            blockIdFlag?: import("./validator").BlockIDFlag;
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
            timestamp?: Date | undefined;
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
                            blockIdFlag?: import("./validator").BlockIDFlag;
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
                            blockIdFlag?: import("./validator").BlockIDFlag;
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
                        } & { [K_36 in Exclude<keyof I_1["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["version"], keyof import("../version/types").Consensus>]: never; };
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
                            } & { [K_37 in Exclude<keyof I_1["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"]["partSetHeader"], keyof import("./types").PartSetHeader>]: never; };
                        } & { [K_38 in Exclude<keyof I_1["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"], keyof import("./types").BlockID>]: never; };
                        lastCommitHash?: Uint8Array;
                        dataHash?: Uint8Array;
                        validatorsHash?: Uint8Array;
                        nextValidatorsHash?: Uint8Array;
                        consensusHash?: Uint8Array;
                        appHash?: Uint8Array;
                        lastResultsHash?: Uint8Array;
                        evidenceHash?: Uint8Array;
                        proposerAddress?: Uint8Array;
                    } & { [K_39 in Exclude<keyof I_1["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"], keyof import("./types").Header>]: never; };
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
                            blockIdFlag?: import("./validator").BlockIDFlag;
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
                            } & { [K_40 in Exclude<keyof I_1["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"]["partSetHeader"], keyof import("./types").PartSetHeader>]: never; };
                        } & { [K_41 in Exclude<keyof I_1["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"], keyof import("./types").BlockID>]: never; };
                        signatures?: {
                            blockIdFlag?: import("./validator").BlockIDFlag;
                            validatorAddress?: Uint8Array;
                            timestamp?: Date;
                            signature?: Uint8Array;
                        }[] & ({
                            blockIdFlag?: import("./validator").BlockIDFlag;
                            validatorAddress?: Uint8Array;
                            timestamp?: Date;
                            signature?: Uint8Array;
                        } & {
                            blockIdFlag?: import("./validator").BlockIDFlag;
                            validatorAddress?: Uint8Array;
                            timestamp?: Date;
                            signature?: Uint8Array;
                        } & { [K_42 in Exclude<keyof I_1["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"][number], keyof import("./types").CommitSig>]: never; })[] & { [K_43 in Exclude<keyof I_1["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"], keyof {
                            blockIdFlag?: import("./validator").BlockIDFlag;
                            validatorAddress?: Uint8Array;
                            timestamp?: Date;
                            signature?: Uint8Array;
                        }[]>]: never; };
                    } & { [K_44 in Exclude<keyof I_1["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"], keyof import("./types").Commit>]: never; };
                } & { [K_45 in Exclude<keyof I_1["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"], keyof import("./types").SignedHeader>]: never; };
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
                        } & { [K_46 in Exclude<keyof I_1["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number]["pubKey"], keyof import("../crypto/keys").PublicKey>]: never; };
                        votingPower?: number;
                        proposerPriority?: number;
                    } & { [K_47 in Exclude<keyof I_1["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number], keyof Validator>]: never; })[] & { [K_48 in Exclude<keyof I_1["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"], keyof {
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
                        } & { [K_49 in Exclude<keyof I_1["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"]["pubKey"], keyof import("../crypto/keys").PublicKey>]: never; };
                        votingPower?: number;
                        proposerPriority?: number;
                    } & { [K_50 in Exclude<keyof I_1["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"], keyof Validator>]: never; };
                    totalVotingPower?: number;
                } & { [K_51 in Exclude<keyof I_1["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"], keyof import("./validator").ValidatorSet>]: never; };
            } & { [K_52 in Exclude<keyof I_1["lightClientAttackEvidence"]["conflictingBlock"], keyof LightBlock>]: never; };
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
                } & { [K_53 in Exclude<keyof I_1["lightClientAttackEvidence"]["byzantineValidators"][number]["pubKey"], keyof import("../crypto/keys").PublicKey>]: never; };
                votingPower?: number;
                proposerPriority?: number;
            } & { [K_54 in Exclude<keyof I_1["lightClientAttackEvidence"]["byzantineValidators"][number], keyof Validator>]: never; })[] & { [K_55 in Exclude<keyof I_1["lightClientAttackEvidence"]["byzantineValidators"], keyof {
                address?: Uint8Array;
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                };
                votingPower?: number;
                proposerPriority?: number;
            }[]>]: never; };
            totalVotingPower?: number;
            timestamp?: Date | undefined;
        } & { [K_56 in Exclude<keyof I_1["lightClientAttackEvidence"], keyof LightClientAttackEvidence>]: never; };
    } & { [K_57 in Exclude<keyof I_1, keyof Evidence>]: never; }>(object: I_1): Evidence;
};
export declare const DuplicateVoteEvidence: {
    encode(message: DuplicateVoteEvidence, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DuplicateVoteEvidence;
    fromJSON(object: any): DuplicateVoteEvidence;
    toJSON(message: DuplicateVoteEvidence): unknown;
    create<I extends {
        voteA?: {
            type?: import("./types").SignedMsgType;
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
            type?: import("./types").SignedMsgType;
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
        timestamp?: Date | undefined;
    } & {
        voteA?: {
            type?: import("./types").SignedMsgType;
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
            type?: import("./types").SignedMsgType;
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
                } & { [K in Exclude<keyof I["voteA"]["blockId"]["partSetHeader"], keyof import("./types").PartSetHeader>]: never; };
            } & { [K_1 in Exclude<keyof I["voteA"]["blockId"], keyof import("./types").BlockID>]: never; };
            timestamp?: Date;
            validatorAddress?: Uint8Array;
            validatorIndex?: number;
            signature?: Uint8Array;
            extension?: Uint8Array;
            extensionSignature?: Uint8Array;
        } & { [K_2 in Exclude<keyof I["voteA"], keyof Vote>]: never; };
        voteB?: {
            type?: import("./types").SignedMsgType;
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
            type?: import("./types").SignedMsgType;
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
                } & { [K_3 in Exclude<keyof I["voteB"]["blockId"]["partSetHeader"], keyof import("./types").PartSetHeader>]: never; };
            } & { [K_4 in Exclude<keyof I["voteB"]["blockId"], keyof import("./types").BlockID>]: never; };
            timestamp?: Date;
            validatorAddress?: Uint8Array;
            validatorIndex?: number;
            signature?: Uint8Array;
            extension?: Uint8Array;
            extensionSignature?: Uint8Array;
        } & { [K_5 in Exclude<keyof I["voteB"], keyof Vote>]: never; };
        totalVotingPower?: number;
        validatorPower?: number;
        timestamp?: Date | undefined;
    } & { [K_6 in Exclude<keyof I, keyof DuplicateVoteEvidence>]: never; }>(base?: I): DuplicateVoteEvidence;
    fromPartial<I_1 extends {
        voteA?: {
            type?: import("./types").SignedMsgType;
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
            type?: import("./types").SignedMsgType;
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
        timestamp?: Date | undefined;
    } & {
        voteA?: {
            type?: import("./types").SignedMsgType;
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
            type?: import("./types").SignedMsgType;
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
                } & { [K_7 in Exclude<keyof I_1["voteA"]["blockId"]["partSetHeader"], keyof import("./types").PartSetHeader>]: never; };
            } & { [K_8 in Exclude<keyof I_1["voteA"]["blockId"], keyof import("./types").BlockID>]: never; };
            timestamp?: Date;
            validatorAddress?: Uint8Array;
            validatorIndex?: number;
            signature?: Uint8Array;
            extension?: Uint8Array;
            extensionSignature?: Uint8Array;
        } & { [K_9 in Exclude<keyof I_1["voteA"], keyof Vote>]: never; };
        voteB?: {
            type?: import("./types").SignedMsgType;
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
            type?: import("./types").SignedMsgType;
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
                } & { [K_10 in Exclude<keyof I_1["voteB"]["blockId"]["partSetHeader"], keyof import("./types").PartSetHeader>]: never; };
            } & { [K_11 in Exclude<keyof I_1["voteB"]["blockId"], keyof import("./types").BlockID>]: never; };
            timestamp?: Date;
            validatorAddress?: Uint8Array;
            validatorIndex?: number;
            signature?: Uint8Array;
            extension?: Uint8Array;
            extensionSignature?: Uint8Array;
        } & { [K_12 in Exclude<keyof I_1["voteB"], keyof Vote>]: never; };
        totalVotingPower?: number;
        validatorPower?: number;
        timestamp?: Date | undefined;
    } & { [K_13 in Exclude<keyof I_1, keyof DuplicateVoteEvidence>]: never; }>(object: I_1): DuplicateVoteEvidence;
};
export declare const LightClientAttackEvidence: {
    encode(message: LightClientAttackEvidence, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): LightClientAttackEvidence;
    fromJSON(object: any): LightClientAttackEvidence;
    toJSON(message: LightClientAttackEvidence): unknown;
    create<I extends {
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
                        blockIdFlag?: import("./validator").BlockIDFlag;
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
        timestamp?: Date | undefined;
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
                        blockIdFlag?: import("./validator").BlockIDFlag;
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
                        blockIdFlag?: import("./validator").BlockIDFlag;
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
                    } & { [K in Exclude<keyof I["conflictingBlock"]["signedHeader"]["header"]["version"], keyof import("../version/types").Consensus>]: never; };
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
                        } & { [K_1 in Exclude<keyof I["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"]["partSetHeader"], keyof import("./types").PartSetHeader>]: never; };
                    } & { [K_2 in Exclude<keyof I["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"], keyof import("./types").BlockID>]: never; };
                    lastCommitHash?: Uint8Array;
                    dataHash?: Uint8Array;
                    validatorsHash?: Uint8Array;
                    nextValidatorsHash?: Uint8Array;
                    consensusHash?: Uint8Array;
                    appHash?: Uint8Array;
                    lastResultsHash?: Uint8Array;
                    evidenceHash?: Uint8Array;
                    proposerAddress?: Uint8Array;
                } & { [K_3 in Exclude<keyof I["conflictingBlock"]["signedHeader"]["header"], keyof import("./types").Header>]: never; };
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
                        blockIdFlag?: import("./validator").BlockIDFlag;
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
                        } & { [K_4 in Exclude<keyof I["conflictingBlock"]["signedHeader"]["commit"]["blockId"]["partSetHeader"], keyof import("./types").PartSetHeader>]: never; };
                    } & { [K_5 in Exclude<keyof I["conflictingBlock"]["signedHeader"]["commit"]["blockId"], keyof import("./types").BlockID>]: never; };
                    signatures?: {
                        blockIdFlag?: import("./validator").BlockIDFlag;
                        validatorAddress?: Uint8Array;
                        timestamp?: Date;
                        signature?: Uint8Array;
                    }[] & ({
                        blockIdFlag?: import("./validator").BlockIDFlag;
                        validatorAddress?: Uint8Array;
                        timestamp?: Date;
                        signature?: Uint8Array;
                    } & {
                        blockIdFlag?: import("./validator").BlockIDFlag;
                        validatorAddress?: Uint8Array;
                        timestamp?: Date;
                        signature?: Uint8Array;
                    } & { [K_6 in Exclude<keyof I["conflictingBlock"]["signedHeader"]["commit"]["signatures"][number], keyof import("./types").CommitSig>]: never; })[] & { [K_7 in Exclude<keyof I["conflictingBlock"]["signedHeader"]["commit"]["signatures"], keyof {
                        blockIdFlag?: import("./validator").BlockIDFlag;
                        validatorAddress?: Uint8Array;
                        timestamp?: Date;
                        signature?: Uint8Array;
                    }[]>]: never; };
                } & { [K_8 in Exclude<keyof I["conflictingBlock"]["signedHeader"]["commit"], keyof import("./types").Commit>]: never; };
            } & { [K_9 in Exclude<keyof I["conflictingBlock"]["signedHeader"], keyof import("./types").SignedHeader>]: never; };
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
                    } & { [K_10 in Exclude<keyof I["conflictingBlock"]["validatorSet"]["validators"][number]["pubKey"], keyof import("../crypto/keys").PublicKey>]: never; };
                    votingPower?: number;
                    proposerPriority?: number;
                } & { [K_11 in Exclude<keyof I["conflictingBlock"]["validatorSet"]["validators"][number], keyof Validator>]: never; })[] & { [K_12 in Exclude<keyof I["conflictingBlock"]["validatorSet"]["validators"], keyof {
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
                    } & { [K_13 in Exclude<keyof I["conflictingBlock"]["validatorSet"]["proposer"]["pubKey"], keyof import("../crypto/keys").PublicKey>]: never; };
                    votingPower?: number;
                    proposerPriority?: number;
                } & { [K_14 in Exclude<keyof I["conflictingBlock"]["validatorSet"]["proposer"], keyof Validator>]: never; };
                totalVotingPower?: number;
            } & { [K_15 in Exclude<keyof I["conflictingBlock"]["validatorSet"], keyof import("./validator").ValidatorSet>]: never; };
        } & { [K_16 in Exclude<keyof I["conflictingBlock"], keyof LightBlock>]: never; };
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
            } & { [K_17 in Exclude<keyof I["byzantineValidators"][number]["pubKey"], keyof import("../crypto/keys").PublicKey>]: never; };
            votingPower?: number;
            proposerPriority?: number;
        } & { [K_18 in Exclude<keyof I["byzantineValidators"][number], keyof Validator>]: never; })[] & { [K_19 in Exclude<keyof I["byzantineValidators"], keyof {
            address?: Uint8Array;
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            };
            votingPower?: number;
            proposerPriority?: number;
        }[]>]: never; };
        totalVotingPower?: number;
        timestamp?: Date | undefined;
    } & { [K_20 in Exclude<keyof I, keyof LightClientAttackEvidence>]: never; }>(base?: I): LightClientAttackEvidence;
    fromPartial<I_1 extends {
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
                        blockIdFlag?: import("./validator").BlockIDFlag;
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
        timestamp?: Date | undefined;
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
                        blockIdFlag?: import("./validator").BlockIDFlag;
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
                        blockIdFlag?: import("./validator").BlockIDFlag;
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
                    } & { [K_21 in Exclude<keyof I_1["conflictingBlock"]["signedHeader"]["header"]["version"], keyof import("../version/types").Consensus>]: never; };
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
                        } & { [K_22 in Exclude<keyof I_1["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"]["partSetHeader"], keyof import("./types").PartSetHeader>]: never; };
                    } & { [K_23 in Exclude<keyof I_1["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"], keyof import("./types").BlockID>]: never; };
                    lastCommitHash?: Uint8Array;
                    dataHash?: Uint8Array;
                    validatorsHash?: Uint8Array;
                    nextValidatorsHash?: Uint8Array;
                    consensusHash?: Uint8Array;
                    appHash?: Uint8Array;
                    lastResultsHash?: Uint8Array;
                    evidenceHash?: Uint8Array;
                    proposerAddress?: Uint8Array;
                } & { [K_24 in Exclude<keyof I_1["conflictingBlock"]["signedHeader"]["header"], keyof import("./types").Header>]: never; };
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
                        blockIdFlag?: import("./validator").BlockIDFlag;
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
                        } & { [K_25 in Exclude<keyof I_1["conflictingBlock"]["signedHeader"]["commit"]["blockId"]["partSetHeader"], keyof import("./types").PartSetHeader>]: never; };
                    } & { [K_26 in Exclude<keyof I_1["conflictingBlock"]["signedHeader"]["commit"]["blockId"], keyof import("./types").BlockID>]: never; };
                    signatures?: {
                        blockIdFlag?: import("./validator").BlockIDFlag;
                        validatorAddress?: Uint8Array;
                        timestamp?: Date;
                        signature?: Uint8Array;
                    }[] & ({
                        blockIdFlag?: import("./validator").BlockIDFlag;
                        validatorAddress?: Uint8Array;
                        timestamp?: Date;
                        signature?: Uint8Array;
                    } & {
                        blockIdFlag?: import("./validator").BlockIDFlag;
                        validatorAddress?: Uint8Array;
                        timestamp?: Date;
                        signature?: Uint8Array;
                    } & { [K_27 in Exclude<keyof I_1["conflictingBlock"]["signedHeader"]["commit"]["signatures"][number], keyof import("./types").CommitSig>]: never; })[] & { [K_28 in Exclude<keyof I_1["conflictingBlock"]["signedHeader"]["commit"]["signatures"], keyof {
                        blockIdFlag?: import("./validator").BlockIDFlag;
                        validatorAddress?: Uint8Array;
                        timestamp?: Date;
                        signature?: Uint8Array;
                    }[]>]: never; };
                } & { [K_29 in Exclude<keyof I_1["conflictingBlock"]["signedHeader"]["commit"], keyof import("./types").Commit>]: never; };
            } & { [K_30 in Exclude<keyof I_1["conflictingBlock"]["signedHeader"], keyof import("./types").SignedHeader>]: never; };
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
                    } & { [K_31 in Exclude<keyof I_1["conflictingBlock"]["validatorSet"]["validators"][number]["pubKey"], keyof import("../crypto/keys").PublicKey>]: never; };
                    votingPower?: number;
                    proposerPriority?: number;
                } & { [K_32 in Exclude<keyof I_1["conflictingBlock"]["validatorSet"]["validators"][number], keyof Validator>]: never; })[] & { [K_33 in Exclude<keyof I_1["conflictingBlock"]["validatorSet"]["validators"], keyof {
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
                    } & { [K_34 in Exclude<keyof I_1["conflictingBlock"]["validatorSet"]["proposer"]["pubKey"], keyof import("../crypto/keys").PublicKey>]: never; };
                    votingPower?: number;
                    proposerPriority?: number;
                } & { [K_35 in Exclude<keyof I_1["conflictingBlock"]["validatorSet"]["proposer"], keyof Validator>]: never; };
                totalVotingPower?: number;
            } & { [K_36 in Exclude<keyof I_1["conflictingBlock"]["validatorSet"], keyof import("./validator").ValidatorSet>]: never; };
        } & { [K_37 in Exclude<keyof I_1["conflictingBlock"], keyof LightBlock>]: never; };
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
            } & { [K_38 in Exclude<keyof I_1["byzantineValidators"][number]["pubKey"], keyof import("../crypto/keys").PublicKey>]: never; };
            votingPower?: number;
            proposerPriority?: number;
        } & { [K_39 in Exclude<keyof I_1["byzantineValidators"][number], keyof Validator>]: never; })[] & { [K_40 in Exclude<keyof I_1["byzantineValidators"], keyof {
            address?: Uint8Array;
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            };
            votingPower?: number;
            proposerPriority?: number;
        }[]>]: never; };
        totalVotingPower?: number;
        timestamp?: Date | undefined;
    } & { [K_41 in Exclude<keyof I_1, keyof LightClientAttackEvidence>]: never; }>(object: I_1): LightClientAttackEvidence;
};
export declare const EvidenceList: {
    encode(message: EvidenceList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): EvidenceList;
    fromJSON(object: any): EvidenceList;
    toJSON(message: EvidenceList): unknown;
    create<I extends {
        evidence?: {
            duplicateVoteEvidence?: {
                voteA?: {
                    type?: import("./types").SignedMsgType;
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
                    type?: import("./types").SignedMsgType;
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
                timestamp?: Date | undefined;
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
                                blockIdFlag?: import("./validator").BlockIDFlag;
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
                timestamp?: Date | undefined;
            };
        }[];
    } & {
        evidence?: {
            duplicateVoteEvidence?: {
                voteA?: {
                    type?: import("./types").SignedMsgType;
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
                    type?: import("./types").SignedMsgType;
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
                timestamp?: Date | undefined;
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
                                blockIdFlag?: import("./validator").BlockIDFlag;
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
                timestamp?: Date | undefined;
            };
        }[] & ({
            duplicateVoteEvidence?: {
                voteA?: {
                    type?: import("./types").SignedMsgType;
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
                    type?: import("./types").SignedMsgType;
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
                timestamp?: Date | undefined;
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
                                blockIdFlag?: import("./validator").BlockIDFlag;
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
                timestamp?: Date | undefined;
            };
        } & {
            duplicateVoteEvidence?: {
                voteA?: {
                    type?: import("./types").SignedMsgType;
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
                    type?: import("./types").SignedMsgType;
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
                timestamp?: Date | undefined;
            } & {
                voteA?: {
                    type?: import("./types").SignedMsgType;
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
                    type?: import("./types").SignedMsgType;
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
                        } & { [K in Exclude<keyof I["evidence"][number]["duplicateVoteEvidence"]["voteA"]["blockId"]["partSetHeader"], keyof import("./types").PartSetHeader>]: never; };
                    } & { [K_1 in Exclude<keyof I["evidence"][number]["duplicateVoteEvidence"]["voteA"]["blockId"], keyof import("./types").BlockID>]: never; };
                    timestamp?: Date;
                    validatorAddress?: Uint8Array;
                    validatorIndex?: number;
                    signature?: Uint8Array;
                    extension?: Uint8Array;
                    extensionSignature?: Uint8Array;
                } & { [K_2 in Exclude<keyof I["evidence"][number]["duplicateVoteEvidence"]["voteA"], keyof Vote>]: never; };
                voteB?: {
                    type?: import("./types").SignedMsgType;
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
                    type?: import("./types").SignedMsgType;
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
                        } & { [K_3 in Exclude<keyof I["evidence"][number]["duplicateVoteEvidence"]["voteB"]["blockId"]["partSetHeader"], keyof import("./types").PartSetHeader>]: never; };
                    } & { [K_4 in Exclude<keyof I["evidence"][number]["duplicateVoteEvidence"]["voteB"]["blockId"], keyof import("./types").BlockID>]: never; };
                    timestamp?: Date;
                    validatorAddress?: Uint8Array;
                    validatorIndex?: number;
                    signature?: Uint8Array;
                    extension?: Uint8Array;
                    extensionSignature?: Uint8Array;
                } & { [K_5 in Exclude<keyof I["evidence"][number]["duplicateVoteEvidence"]["voteB"], keyof Vote>]: never; };
                totalVotingPower?: number;
                validatorPower?: number;
                timestamp?: Date | undefined;
            } & { [K_6 in Exclude<keyof I["evidence"][number]["duplicateVoteEvidence"], keyof DuplicateVoteEvidence>]: never; };
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
                                blockIdFlag?: import("./validator").BlockIDFlag;
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
                timestamp?: Date | undefined;
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
                                blockIdFlag?: import("./validator").BlockIDFlag;
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
                                blockIdFlag?: import("./validator").BlockIDFlag;
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
                            } & { [K_7 in Exclude<keyof I["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["version"], keyof import("../version/types").Consensus>]: never; };
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
                                } & { [K_8 in Exclude<keyof I["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"]["partSetHeader"], keyof import("./types").PartSetHeader>]: never; };
                            } & { [K_9 in Exclude<keyof I["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"], keyof import("./types").BlockID>]: never; };
                            lastCommitHash?: Uint8Array;
                            dataHash?: Uint8Array;
                            validatorsHash?: Uint8Array;
                            nextValidatorsHash?: Uint8Array;
                            consensusHash?: Uint8Array;
                            appHash?: Uint8Array;
                            lastResultsHash?: Uint8Array;
                            evidenceHash?: Uint8Array;
                            proposerAddress?: Uint8Array;
                        } & { [K_10 in Exclude<keyof I["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"], keyof import("./types").Header>]: never; };
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
                                blockIdFlag?: import("./validator").BlockIDFlag;
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
                                } & { [K_11 in Exclude<keyof I["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"]["partSetHeader"], keyof import("./types").PartSetHeader>]: never; };
                            } & { [K_12 in Exclude<keyof I["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"], keyof import("./types").BlockID>]: never; };
                            signatures?: {
                                blockIdFlag?: import("./validator").BlockIDFlag;
                                validatorAddress?: Uint8Array;
                                timestamp?: Date;
                                signature?: Uint8Array;
                            }[] & ({
                                blockIdFlag?: import("./validator").BlockIDFlag;
                                validatorAddress?: Uint8Array;
                                timestamp?: Date;
                                signature?: Uint8Array;
                            } & {
                                blockIdFlag?: import("./validator").BlockIDFlag;
                                validatorAddress?: Uint8Array;
                                timestamp?: Date;
                                signature?: Uint8Array;
                            } & { [K_13 in Exclude<keyof I["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"][number], keyof import("./types").CommitSig>]: never; })[] & { [K_14 in Exclude<keyof I["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"], keyof {
                                blockIdFlag?: import("./validator").BlockIDFlag;
                                validatorAddress?: Uint8Array;
                                timestamp?: Date;
                                signature?: Uint8Array;
                            }[]>]: never; };
                        } & { [K_15 in Exclude<keyof I["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"], keyof import("./types").Commit>]: never; };
                    } & { [K_16 in Exclude<keyof I["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"], keyof import("./types").SignedHeader>]: never; };
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
                            } & { [K_17 in Exclude<keyof I["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number]["pubKey"], keyof import("../crypto/keys").PublicKey>]: never; };
                            votingPower?: number;
                            proposerPriority?: number;
                        } & { [K_18 in Exclude<keyof I["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number], keyof Validator>]: never; })[] & { [K_19 in Exclude<keyof I["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"], keyof {
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
                            } & { [K_20 in Exclude<keyof I["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"]["pubKey"], keyof import("../crypto/keys").PublicKey>]: never; };
                            votingPower?: number;
                            proposerPriority?: number;
                        } & { [K_21 in Exclude<keyof I["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"], keyof Validator>]: never; };
                        totalVotingPower?: number;
                    } & { [K_22 in Exclude<keyof I["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"], keyof import("./validator").ValidatorSet>]: never; };
                } & { [K_23 in Exclude<keyof I["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"], keyof LightBlock>]: never; };
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
                    } & { [K_24 in Exclude<keyof I["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number]["pubKey"], keyof import("../crypto/keys").PublicKey>]: never; };
                    votingPower?: number;
                    proposerPriority?: number;
                } & { [K_25 in Exclude<keyof I["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number], keyof Validator>]: never; })[] & { [K_26 in Exclude<keyof I["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"], keyof {
                    address?: Uint8Array;
                    pubKey?: {
                        ed25519?: Uint8Array;
                        secp256k1?: Uint8Array;
                    };
                    votingPower?: number;
                    proposerPriority?: number;
                }[]>]: never; };
                totalVotingPower?: number;
                timestamp?: Date | undefined;
            } & { [K_27 in Exclude<keyof I["evidence"][number]["lightClientAttackEvidence"], keyof LightClientAttackEvidence>]: never; };
        } & { [K_28 in Exclude<keyof I["evidence"][number], keyof Evidence>]: never; })[] & { [K_29 in Exclude<keyof I["evidence"], keyof {
            duplicateVoteEvidence?: {
                voteA?: {
                    type?: import("./types").SignedMsgType;
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
                    type?: import("./types").SignedMsgType;
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
                timestamp?: Date | undefined;
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
                                blockIdFlag?: import("./validator").BlockIDFlag;
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
                timestamp?: Date | undefined;
            };
        }[]>]: never; };
    } & { [K_30 in Exclude<keyof I, "evidence">]: never; }>(base?: I): EvidenceList;
    fromPartial<I_1 extends {
        evidence?: {
            duplicateVoteEvidence?: {
                voteA?: {
                    type?: import("./types").SignedMsgType;
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
                    type?: import("./types").SignedMsgType;
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
                timestamp?: Date | undefined;
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
                                blockIdFlag?: import("./validator").BlockIDFlag;
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
                timestamp?: Date | undefined;
            };
        }[];
    } & {
        evidence?: {
            duplicateVoteEvidence?: {
                voteA?: {
                    type?: import("./types").SignedMsgType;
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
                    type?: import("./types").SignedMsgType;
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
                timestamp?: Date | undefined;
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
                                blockIdFlag?: import("./validator").BlockIDFlag;
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
                timestamp?: Date | undefined;
            };
        }[] & ({
            duplicateVoteEvidence?: {
                voteA?: {
                    type?: import("./types").SignedMsgType;
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
                    type?: import("./types").SignedMsgType;
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
                timestamp?: Date | undefined;
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
                                blockIdFlag?: import("./validator").BlockIDFlag;
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
                timestamp?: Date | undefined;
            };
        } & {
            duplicateVoteEvidence?: {
                voteA?: {
                    type?: import("./types").SignedMsgType;
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
                    type?: import("./types").SignedMsgType;
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
                timestamp?: Date | undefined;
            } & {
                voteA?: {
                    type?: import("./types").SignedMsgType;
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
                    type?: import("./types").SignedMsgType;
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
                        } & { [K_31 in Exclude<keyof I_1["evidence"][number]["duplicateVoteEvidence"]["voteA"]["blockId"]["partSetHeader"], keyof import("./types").PartSetHeader>]: never; };
                    } & { [K_32 in Exclude<keyof I_1["evidence"][number]["duplicateVoteEvidence"]["voteA"]["blockId"], keyof import("./types").BlockID>]: never; };
                    timestamp?: Date;
                    validatorAddress?: Uint8Array;
                    validatorIndex?: number;
                    signature?: Uint8Array;
                    extension?: Uint8Array;
                    extensionSignature?: Uint8Array;
                } & { [K_33 in Exclude<keyof I_1["evidence"][number]["duplicateVoteEvidence"]["voteA"], keyof Vote>]: never; };
                voteB?: {
                    type?: import("./types").SignedMsgType;
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
                    type?: import("./types").SignedMsgType;
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
                        } & { [K_34 in Exclude<keyof I_1["evidence"][number]["duplicateVoteEvidence"]["voteB"]["blockId"]["partSetHeader"], keyof import("./types").PartSetHeader>]: never; };
                    } & { [K_35 in Exclude<keyof I_1["evidence"][number]["duplicateVoteEvidence"]["voteB"]["blockId"], keyof import("./types").BlockID>]: never; };
                    timestamp?: Date;
                    validatorAddress?: Uint8Array;
                    validatorIndex?: number;
                    signature?: Uint8Array;
                    extension?: Uint8Array;
                    extensionSignature?: Uint8Array;
                } & { [K_36 in Exclude<keyof I_1["evidence"][number]["duplicateVoteEvidence"]["voteB"], keyof Vote>]: never; };
                totalVotingPower?: number;
                validatorPower?: number;
                timestamp?: Date | undefined;
            } & { [K_37 in Exclude<keyof I_1["evidence"][number]["duplicateVoteEvidence"], keyof DuplicateVoteEvidence>]: never; };
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
                                blockIdFlag?: import("./validator").BlockIDFlag;
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
                timestamp?: Date | undefined;
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
                                blockIdFlag?: import("./validator").BlockIDFlag;
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
                                blockIdFlag?: import("./validator").BlockIDFlag;
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
                            } & { [K_38 in Exclude<keyof I_1["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["version"], keyof import("../version/types").Consensus>]: never; };
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
                                } & { [K_39 in Exclude<keyof I_1["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"]["partSetHeader"], keyof import("./types").PartSetHeader>]: never; };
                            } & { [K_40 in Exclude<keyof I_1["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"], keyof import("./types").BlockID>]: never; };
                            lastCommitHash?: Uint8Array;
                            dataHash?: Uint8Array;
                            validatorsHash?: Uint8Array;
                            nextValidatorsHash?: Uint8Array;
                            consensusHash?: Uint8Array;
                            appHash?: Uint8Array;
                            lastResultsHash?: Uint8Array;
                            evidenceHash?: Uint8Array;
                            proposerAddress?: Uint8Array;
                        } & { [K_41 in Exclude<keyof I_1["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"], keyof import("./types").Header>]: never; };
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
                                blockIdFlag?: import("./validator").BlockIDFlag;
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
                                } & { [K_42 in Exclude<keyof I_1["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"]["partSetHeader"], keyof import("./types").PartSetHeader>]: never; };
                            } & { [K_43 in Exclude<keyof I_1["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"], keyof import("./types").BlockID>]: never; };
                            signatures?: {
                                blockIdFlag?: import("./validator").BlockIDFlag;
                                validatorAddress?: Uint8Array;
                                timestamp?: Date;
                                signature?: Uint8Array;
                            }[] & ({
                                blockIdFlag?: import("./validator").BlockIDFlag;
                                validatorAddress?: Uint8Array;
                                timestamp?: Date;
                                signature?: Uint8Array;
                            } & {
                                blockIdFlag?: import("./validator").BlockIDFlag;
                                validatorAddress?: Uint8Array;
                                timestamp?: Date;
                                signature?: Uint8Array;
                            } & { [K_44 in Exclude<keyof I_1["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"][number], keyof import("./types").CommitSig>]: never; })[] & { [K_45 in Exclude<keyof I_1["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"], keyof {
                                blockIdFlag?: import("./validator").BlockIDFlag;
                                validatorAddress?: Uint8Array;
                                timestamp?: Date;
                                signature?: Uint8Array;
                            }[]>]: never; };
                        } & { [K_46 in Exclude<keyof I_1["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"], keyof import("./types").Commit>]: never; };
                    } & { [K_47 in Exclude<keyof I_1["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"], keyof import("./types").SignedHeader>]: never; };
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
                            } & { [K_48 in Exclude<keyof I_1["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number]["pubKey"], keyof import("../crypto/keys").PublicKey>]: never; };
                            votingPower?: number;
                            proposerPriority?: number;
                        } & { [K_49 in Exclude<keyof I_1["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number], keyof Validator>]: never; })[] & { [K_50 in Exclude<keyof I_1["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"], keyof {
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
                            } & { [K_51 in Exclude<keyof I_1["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"]["pubKey"], keyof import("../crypto/keys").PublicKey>]: never; };
                            votingPower?: number;
                            proposerPriority?: number;
                        } & { [K_52 in Exclude<keyof I_1["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"], keyof Validator>]: never; };
                        totalVotingPower?: number;
                    } & { [K_53 in Exclude<keyof I_1["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"], keyof import("./validator").ValidatorSet>]: never; };
                } & { [K_54 in Exclude<keyof I_1["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"], keyof LightBlock>]: never; };
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
                    } & { [K_55 in Exclude<keyof I_1["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number]["pubKey"], keyof import("../crypto/keys").PublicKey>]: never; };
                    votingPower?: number;
                    proposerPriority?: number;
                } & { [K_56 in Exclude<keyof I_1["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number], keyof Validator>]: never; })[] & { [K_57 in Exclude<keyof I_1["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"], keyof {
                    address?: Uint8Array;
                    pubKey?: {
                        ed25519?: Uint8Array;
                        secp256k1?: Uint8Array;
                    };
                    votingPower?: number;
                    proposerPriority?: number;
                }[]>]: never; };
                totalVotingPower?: number;
                timestamp?: Date | undefined;
            } & { [K_58 in Exclude<keyof I_1["evidence"][number]["lightClientAttackEvidence"], keyof LightClientAttackEvidence>]: never; };
        } & { [K_59 in Exclude<keyof I_1["evidence"][number], keyof Evidence>]: never; })[] & { [K_60 in Exclude<keyof I_1["evidence"], keyof {
            duplicateVoteEvidence?: {
                voteA?: {
                    type?: import("./types").SignedMsgType;
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
                    type?: import("./types").SignedMsgType;
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
                timestamp?: Date | undefined;
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
                                blockIdFlag?: import("./validator").BlockIDFlag;
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
                timestamp?: Date | undefined;
            };
        }[]>]: never; };
    } & { [K_61 in Exclude<keyof I_1, "evidence">]: never; }>(object: I_1): EvidenceList;
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
