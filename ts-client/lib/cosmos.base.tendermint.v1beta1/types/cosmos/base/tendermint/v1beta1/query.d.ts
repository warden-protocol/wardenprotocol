import _m0 from "protobufjs/minimal";
import { Any } from "../../../../google/protobuf/any";
import { DefaultNodeInfo } from "../../../../tendermint/p2p/types";
import { Block } from "../../../../tendermint/types/block";
import { BlockID } from "../../../../tendermint/types/types";
import { PageRequest, PageResponse } from "../../query/v1beta1/pagination";
import { Block as Block1 } from "./types";
export declare const protobufPackage = "cosmos.base.tendermint.v1beta1";
/** GetValidatorSetByHeightRequest is the request type for the Query/GetValidatorSetByHeight RPC method. */
export interface GetValidatorSetByHeightRequest {
    height: number;
    /** pagination defines an pagination for the request. */
    pagination: PageRequest | undefined;
}
/** GetValidatorSetByHeightResponse is the response type for the Query/GetValidatorSetByHeight RPC method. */
export interface GetValidatorSetByHeightResponse {
    blockHeight: number;
    validators: Validator[];
    /** pagination defines an pagination for the response. */
    pagination: PageResponse | undefined;
}
/** GetLatestValidatorSetRequest is the request type for the Query/GetValidatorSetByHeight RPC method. */
export interface GetLatestValidatorSetRequest {
    /** pagination defines an pagination for the request. */
    pagination: PageRequest | undefined;
}
/** GetLatestValidatorSetResponse is the response type for the Query/GetValidatorSetByHeight RPC method. */
export interface GetLatestValidatorSetResponse {
    blockHeight: number;
    validators: Validator[];
    /** pagination defines an pagination for the response. */
    pagination: PageResponse | undefined;
}
/** Validator is the type for the validator-set. */
export interface Validator {
    address: string;
    pubKey: Any | undefined;
    votingPower: number;
    proposerPriority: number;
}
/** GetBlockByHeightRequest is the request type for the Query/GetBlockByHeight RPC method. */
export interface GetBlockByHeightRequest {
    height: number;
}
/** GetBlockByHeightResponse is the response type for the Query/GetBlockByHeight RPC method. */
export interface GetBlockByHeightResponse {
    blockId: BlockID | undefined;
    /** Deprecated: please use `sdk_block` instead */
    block: Block | undefined;
    /** Since: cosmos-sdk 0.47 */
    sdkBlock: Block1 | undefined;
}
/** GetLatestBlockRequest is the request type for the Query/GetLatestBlock RPC method. */
export interface GetLatestBlockRequest {
}
/** GetLatestBlockResponse is the response type for the Query/GetLatestBlock RPC method. */
export interface GetLatestBlockResponse {
    blockId: BlockID | undefined;
    /** Deprecated: please use `sdk_block` instead */
    block: Block | undefined;
    /** Since: cosmos-sdk 0.47 */
    sdkBlock: Block1 | undefined;
}
/** GetSyncingRequest is the request type for the Query/GetSyncing RPC method. */
export interface GetSyncingRequest {
}
/** GetSyncingResponse is the response type for the Query/GetSyncing RPC method. */
export interface GetSyncingResponse {
    syncing: boolean;
}
/** GetNodeInfoRequest is the request type for the Query/GetNodeInfo RPC method. */
export interface GetNodeInfoRequest {
}
/** GetNodeInfoResponse is the response type for the Query/GetNodeInfo RPC method. */
export interface GetNodeInfoResponse {
    defaultNodeInfo: DefaultNodeInfo | undefined;
    applicationVersion: VersionInfo | undefined;
}
/** VersionInfo is the type for the GetNodeInfoResponse message. */
export interface VersionInfo {
    name: string;
    appName: string;
    version: string;
    gitCommit: string;
    buildTags: string;
    goVersion: string;
    buildDeps: Module[];
    /** Since: cosmos-sdk 0.43 */
    cosmosSdkVersion: string;
}
/** Module is the type for VersionInfo */
export interface Module {
    /** module path */
    path: string;
    /** module version */
    version: string;
    /** checksum */
    sum: string;
}
/** ABCIQueryRequest defines the request structure for the ABCIQuery gRPC query. */
export interface ABCIQueryRequest {
    data: Uint8Array;
    path: string;
    height: number;
    prove: boolean;
}
/**
 * ABCIQueryResponse defines the response structure for the ABCIQuery gRPC query.
 *
 * Note: This type is a duplicate of the ResponseQuery proto type defined in
 * Tendermint.
 */
export interface ABCIQueryResponse {
    code: number;
    /** nondeterministic */
    log: string;
    /** nondeterministic */
    info: string;
    index: number;
    key: Uint8Array;
    value: Uint8Array;
    proofOps: ProofOps | undefined;
    height: number;
    codespace: string;
}
/**
 * ProofOp defines an operation used for calculating Merkle root. The data could
 * be arbitrary format, providing necessary data for example neighbouring node
 * hash.
 *
 * Note: This type is a duplicate of the ProofOp proto type defined in Tendermint.
 */
export interface ProofOp {
    type: string;
    key: Uint8Array;
    data: Uint8Array;
}
/**
 * ProofOps is Merkle proof defined by the list of ProofOps.
 *
 * Note: This type is a duplicate of the ProofOps proto type defined in Tendermint.
 */
export interface ProofOps {
    ops: ProofOp[];
}
export declare const GetValidatorSetByHeightRequest: {
    encode(message: GetValidatorSetByHeightRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GetValidatorSetByHeightRequest;
    fromJSON(object: any): GetValidatorSetByHeightRequest;
    toJSON(message: GetValidatorSetByHeightRequest): unknown;
    create<I extends {
        height?: number;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        height?: number;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K in Exclude<keyof I["pagination"], keyof PageRequest>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof GetValidatorSetByHeightRequest>]: never; }>(base?: I): GetValidatorSetByHeightRequest;
    fromPartial<I_1 extends {
        height?: number;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        height?: number;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K_2 in Exclude<keyof I_1["pagination"], keyof PageRequest>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof GetValidatorSetByHeightRequest>]: never; }>(object: I_1): GetValidatorSetByHeightRequest;
};
export declare const GetValidatorSetByHeightResponse: {
    encode(message: GetValidatorSetByHeightResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GetValidatorSetByHeightResponse;
    fromJSON(object: any): GetValidatorSetByHeightResponse;
    toJSON(message: GetValidatorSetByHeightResponse): unknown;
    create<I extends {
        blockHeight?: number;
        validators?: {
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            votingPower?: number;
            proposerPriority?: number;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        blockHeight?: number;
        validators?: {
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            votingPower?: number;
            proposerPriority?: number;
        }[] & ({
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            votingPower?: number;
            proposerPriority?: number;
        } & {
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K in Exclude<keyof I["validators"][number]["pubKey"], keyof Any>]: never; };
            votingPower?: number;
            proposerPriority?: number;
        } & { [K_1 in Exclude<keyof I["validators"][number], keyof Validator>]: never; })[] & { [K_2 in Exclude<keyof I["validators"], keyof {
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            votingPower?: number;
            proposerPriority?: number;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_3 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_4 in Exclude<keyof I, keyof GetValidatorSetByHeightResponse>]: never; }>(base?: I): GetValidatorSetByHeightResponse;
    fromPartial<I_1 extends {
        blockHeight?: number;
        validators?: {
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            votingPower?: number;
            proposerPriority?: number;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        blockHeight?: number;
        validators?: {
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            votingPower?: number;
            proposerPriority?: number;
        }[] & ({
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            votingPower?: number;
            proposerPriority?: number;
        } & {
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_5 in Exclude<keyof I_1["validators"][number]["pubKey"], keyof Any>]: never; };
            votingPower?: number;
            proposerPriority?: number;
        } & { [K_6 in Exclude<keyof I_1["validators"][number], keyof Validator>]: never; })[] & { [K_7 in Exclude<keyof I_1["validators"], keyof {
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            votingPower?: number;
            proposerPriority?: number;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_8 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_9 in Exclude<keyof I_1, keyof GetValidatorSetByHeightResponse>]: never; }>(object: I_1): GetValidatorSetByHeightResponse;
};
export declare const GetLatestValidatorSetRequest: {
    encode(message: GetLatestValidatorSetRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GetLatestValidatorSetRequest;
    fromJSON(object: any): GetLatestValidatorSetRequest;
    toJSON(message: GetLatestValidatorSetRequest): unknown;
    create<I extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K in Exclude<keyof I["pagination"], keyof PageRequest>]: never; };
    } & { [K_1 in Exclude<keyof I, "pagination">]: never; }>(base?: I): GetLatestValidatorSetRequest;
    fromPartial<I_1 extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K_2 in Exclude<keyof I_1["pagination"], keyof PageRequest>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "pagination">]: never; }>(object: I_1): GetLatestValidatorSetRequest;
};
export declare const GetLatestValidatorSetResponse: {
    encode(message: GetLatestValidatorSetResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GetLatestValidatorSetResponse;
    fromJSON(object: any): GetLatestValidatorSetResponse;
    toJSON(message: GetLatestValidatorSetResponse): unknown;
    create<I extends {
        blockHeight?: number;
        validators?: {
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            votingPower?: number;
            proposerPriority?: number;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        blockHeight?: number;
        validators?: {
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            votingPower?: number;
            proposerPriority?: number;
        }[] & ({
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            votingPower?: number;
            proposerPriority?: number;
        } & {
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K in Exclude<keyof I["validators"][number]["pubKey"], keyof Any>]: never; };
            votingPower?: number;
            proposerPriority?: number;
        } & { [K_1 in Exclude<keyof I["validators"][number], keyof Validator>]: never; })[] & { [K_2 in Exclude<keyof I["validators"], keyof {
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            votingPower?: number;
            proposerPriority?: number;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_3 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_4 in Exclude<keyof I, keyof GetLatestValidatorSetResponse>]: never; }>(base?: I): GetLatestValidatorSetResponse;
    fromPartial<I_1 extends {
        blockHeight?: number;
        validators?: {
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            votingPower?: number;
            proposerPriority?: number;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        blockHeight?: number;
        validators?: {
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            votingPower?: number;
            proposerPriority?: number;
        }[] & ({
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            votingPower?: number;
            proposerPriority?: number;
        } & {
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_5 in Exclude<keyof I_1["validators"][number]["pubKey"], keyof Any>]: never; };
            votingPower?: number;
            proposerPriority?: number;
        } & { [K_6 in Exclude<keyof I_1["validators"][number], keyof Validator>]: never; })[] & { [K_7 in Exclude<keyof I_1["validators"], keyof {
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            votingPower?: number;
            proposerPriority?: number;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_8 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_9 in Exclude<keyof I_1, keyof GetLatestValidatorSetResponse>]: never; }>(object: I_1): GetLatestValidatorSetResponse;
};
export declare const Validator: {
    encode(message: Validator, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Validator;
    fromJSON(object: any): Validator;
    toJSON(message: Validator): unknown;
    create<I extends {
        address?: string;
        pubKey?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        votingPower?: number;
        proposerPriority?: number;
    } & {
        address?: string;
        pubKey?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K in Exclude<keyof I["pubKey"], keyof Any>]: never; };
        votingPower?: number;
        proposerPriority?: number;
    } & { [K_1 in Exclude<keyof I, keyof Validator>]: never; }>(base?: I): Validator;
    fromPartial<I_1 extends {
        address?: string;
        pubKey?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        votingPower?: number;
        proposerPriority?: number;
    } & {
        address?: string;
        pubKey?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_2 in Exclude<keyof I_1["pubKey"], keyof Any>]: never; };
        votingPower?: number;
        proposerPriority?: number;
    } & { [K_3 in Exclude<keyof I_1, keyof Validator>]: never; }>(object: I_1): Validator;
};
export declare const GetBlockByHeightRequest: {
    encode(message: GetBlockByHeightRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GetBlockByHeightRequest;
    fromJSON(object: any): GetBlockByHeightRequest;
    toJSON(message: GetBlockByHeightRequest): unknown;
    create<I extends {
        height?: number;
    } & {
        height?: number;
    } & { [K in Exclude<keyof I, "height">]: never; }>(base?: I): GetBlockByHeightRequest;
    fromPartial<I_1 extends {
        height?: number;
    } & {
        height?: number;
    } & { [K_1 in Exclude<keyof I_1, "height">]: never; }>(object: I_1): GetBlockByHeightRequest;
};
export declare const GetBlockByHeightResponse: {
    encode(message: GetBlockByHeightResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GetBlockByHeightResponse;
    fromJSON(object: any): GetBlockByHeightResponse;
    toJSON(message: GetBlockByHeightResponse): unknown;
    create<I extends {
        blockId?: {
            hash?: Uint8Array;
            partSetHeader?: {
                total?: number;
                hash?: Uint8Array;
            };
        };
        block?: {
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
        };
        sdkBlock?: {
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
        };
    } & {
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
            } & { [K in Exclude<keyof I["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
        } & { [K_1 in Exclude<keyof I["blockId"], keyof BlockID>]: never; };
        block?: {
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
                } & { [K_2 in Exclude<keyof I["block"]["header"]["version"], keyof import("../../../../tendermint/version/types").Consensus>]: never; };
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
                    } & { [K_3 in Exclude<keyof I["block"]["header"]["lastBlockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                } & { [K_4 in Exclude<keyof I["block"]["header"]["lastBlockId"], keyof BlockID>]: never; };
                lastCommitHash?: Uint8Array;
                dataHash?: Uint8Array;
                validatorsHash?: Uint8Array;
                nextValidatorsHash?: Uint8Array;
                consensusHash?: Uint8Array;
                appHash?: Uint8Array;
                lastResultsHash?: Uint8Array;
                evidenceHash?: Uint8Array;
                proposerAddress?: Uint8Array;
            } & { [K_5 in Exclude<keyof I["block"]["header"], keyof import("../../../../tendermint/types/types").Header>]: never; };
            data?: {
                txs?: Uint8Array[];
            } & {
                txs?: Uint8Array[] & Uint8Array[] & { [K_6 in Exclude<keyof I["block"]["data"]["txs"], keyof Uint8Array[]>]: never; };
            } & { [K_7 in Exclude<keyof I["block"]["data"], "txs">]: never; };
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
                                } & { [K_8 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                            } & { [K_9 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"]["blockId"], keyof BlockID>]: never; };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        } & { [K_10 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"], keyof import("../../../../tendermint/types/types").Vote>]: never; };
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
                                } & { [K_11 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                            } & { [K_12 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"]["blockId"], keyof BlockID>]: never; };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        } & { [K_13 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"], keyof import("../../../../tendermint/types/types").Vote>]: never; };
                        totalVotingPower?: number;
                        validatorPower?: number;
                        timestamp?: Date;
                    } & { [K_14 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"], keyof import("../../../../tendermint/types/evidence").DuplicateVoteEvidence>]: never; };
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
                                    } & { [K_15 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["version"], keyof import("../../../../tendermint/version/types").Consensus>]: never; };
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
                                        } & { [K_16 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                                    } & { [K_17 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"], keyof BlockID>]: never; };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                } & { [K_18 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"], keyof import("../../../../tendermint/types/types").Header>]: never; };
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
                                        } & { [K_19 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                                    } & { [K_20 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"], keyof BlockID>]: never; };
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
                                    } & { [K_21 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"][number], keyof import("../../../../tendermint/types/types").CommitSig>]: never; })[] & { [K_22 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"], keyof {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[]>]: never; };
                                } & { [K_23 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"], keyof import("../../../../tendermint/types/types").Commit>]: never; };
                            } & { [K_24 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"], keyof import("../../../../tendermint/types/types").SignedHeader>]: never; };
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
                                    } & { [K_25 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                } & { [K_26 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number], keyof import("../../../../tendermint/types/validator").Validator>]: never; })[] & { [K_27 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"], keyof {
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
                                    } & { [K_28 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                } & { [K_29 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"], keyof import("../../../../tendermint/types/validator").Validator>]: never; };
                                totalVotingPower?: number;
                            } & { [K_30 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"], keyof import("../../../../tendermint/types/validator").ValidatorSet>]: never; };
                        } & { [K_31 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"], keyof import("../../../../tendermint/types/types").LightBlock>]: never; };
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
                            } & { [K_32 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                            votingPower?: number;
                            proposerPriority?: number;
                        } & { [K_33 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number], keyof import("../../../../tendermint/types/validator").Validator>]: never; })[] & { [K_34 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"], keyof {
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
                    } & { [K_35 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"], keyof import("../../../../tendermint/types/evidence").LightClientAttackEvidence>]: never; };
                } & { [K_36 in Exclude<keyof I["block"]["evidence"]["evidence"][number], keyof import("../../../../tendermint/types/evidence").Evidence>]: never; })[] & { [K_37 in Exclude<keyof I["block"]["evidence"]["evidence"], keyof {
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
            } & { [K_38 in Exclude<keyof I["block"]["evidence"], "evidence">]: never; };
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
                    } & { [K_39 in Exclude<keyof I["block"]["lastCommit"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                } & { [K_40 in Exclude<keyof I["block"]["lastCommit"]["blockId"], keyof BlockID>]: never; };
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
                } & { [K_41 in Exclude<keyof I["block"]["lastCommit"]["signatures"][number], keyof import("../../../../tendermint/types/types").CommitSig>]: never; })[] & { [K_42 in Exclude<keyof I["block"]["lastCommit"]["signatures"], keyof {
                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                }[]>]: never; };
            } & { [K_43 in Exclude<keyof I["block"]["lastCommit"], keyof import("../../../../tendermint/types/types").Commit>]: never; };
        } & { [K_44 in Exclude<keyof I["block"], keyof Block>]: never; };
        sdkBlock?: {
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
                proposerAddress?: string;
            } & {
                version?: {
                    block?: number;
                    app?: number;
                } & {
                    block?: number;
                    app?: number;
                } & { [K_45 in Exclude<keyof I["sdkBlock"]["header"]["version"], keyof import("../../../../tendermint/version/types").Consensus>]: never; };
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
                    } & { [K_46 in Exclude<keyof I["sdkBlock"]["header"]["lastBlockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                } & { [K_47 in Exclude<keyof I["sdkBlock"]["header"]["lastBlockId"], keyof BlockID>]: never; };
                lastCommitHash?: Uint8Array;
                dataHash?: Uint8Array;
                validatorsHash?: Uint8Array;
                nextValidatorsHash?: Uint8Array;
                consensusHash?: Uint8Array;
                appHash?: Uint8Array;
                lastResultsHash?: Uint8Array;
                evidenceHash?: Uint8Array;
                proposerAddress?: string;
            } & { [K_48 in Exclude<keyof I["sdkBlock"]["header"], keyof import("./types").Header>]: never; };
            data?: {
                txs?: Uint8Array[];
            } & {
                txs?: Uint8Array[] & Uint8Array[] & { [K_49 in Exclude<keyof I["sdkBlock"]["data"]["txs"], keyof Uint8Array[]>]: never; };
            } & { [K_50 in Exclude<keyof I["sdkBlock"]["data"], "txs">]: never; };
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
                                } & { [K_51 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                            } & { [K_52 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"]["blockId"], keyof BlockID>]: never; };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        } & { [K_53 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"], keyof import("../../../../tendermint/types/types").Vote>]: never; };
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
                                } & { [K_54 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                            } & { [K_55 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"]["blockId"], keyof BlockID>]: never; };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        } & { [K_56 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"], keyof import("../../../../tendermint/types/types").Vote>]: never; };
                        totalVotingPower?: number;
                        validatorPower?: number;
                        timestamp?: Date;
                    } & { [K_57 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["duplicateVoteEvidence"], keyof import("../../../../tendermint/types/evidence").DuplicateVoteEvidence>]: never; };
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
                                    } & { [K_58 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["version"], keyof import("../../../../tendermint/version/types").Consensus>]: never; };
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
                                        } & { [K_59 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                                    } & { [K_60 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"], keyof BlockID>]: never; };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                } & { [K_61 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"], keyof import("../../../../tendermint/types/types").Header>]: never; };
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
                                        } & { [K_62 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                                    } & { [K_63 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"], keyof BlockID>]: never; };
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
                                    } & { [K_64 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"][number], keyof import("../../../../tendermint/types/types").CommitSig>]: never; })[] & { [K_65 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"], keyof {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[]>]: never; };
                                } & { [K_66 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"], keyof import("../../../../tendermint/types/types").Commit>]: never; };
                            } & { [K_67 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"], keyof import("../../../../tendermint/types/types").SignedHeader>]: never; };
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
                                    } & { [K_68 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                } & { [K_69 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number], keyof import("../../../../tendermint/types/validator").Validator>]: never; })[] & { [K_70 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"], keyof {
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
                                    } & { [K_71 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                } & { [K_72 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"], keyof import("../../../../tendermint/types/validator").Validator>]: never; };
                                totalVotingPower?: number;
                            } & { [K_73 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"], keyof import("../../../../tendermint/types/validator").ValidatorSet>]: never; };
                        } & { [K_74 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"], keyof import("../../../../tendermint/types/types").LightBlock>]: never; };
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
                            } & { [K_75 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                            votingPower?: number;
                            proposerPriority?: number;
                        } & { [K_76 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number], keyof import("../../../../tendermint/types/validator").Validator>]: never; })[] & { [K_77 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"], keyof {
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
                    } & { [K_78 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"], keyof import("../../../../tendermint/types/evidence").LightClientAttackEvidence>]: never; };
                } & { [K_79 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number], keyof import("../../../../tendermint/types/evidence").Evidence>]: never; })[] & { [K_80 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"], keyof {
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
            } & { [K_81 in Exclude<keyof I["sdkBlock"]["evidence"], "evidence">]: never; };
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
                    } & { [K_82 in Exclude<keyof I["sdkBlock"]["lastCommit"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                } & { [K_83 in Exclude<keyof I["sdkBlock"]["lastCommit"]["blockId"], keyof BlockID>]: never; };
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
                } & { [K_84 in Exclude<keyof I["sdkBlock"]["lastCommit"]["signatures"][number], keyof import("../../../../tendermint/types/types").CommitSig>]: never; })[] & { [K_85 in Exclude<keyof I["sdkBlock"]["lastCommit"]["signatures"], keyof {
                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                }[]>]: never; };
            } & { [K_86 in Exclude<keyof I["sdkBlock"]["lastCommit"], keyof import("../../../../tendermint/types/types").Commit>]: never; };
        } & { [K_87 in Exclude<keyof I["sdkBlock"], keyof Block1>]: never; };
    } & { [K_88 in Exclude<keyof I, keyof GetBlockByHeightResponse>]: never; }>(base?: I): GetBlockByHeightResponse;
    fromPartial<I_1 extends {
        blockId?: {
            hash?: Uint8Array;
            partSetHeader?: {
                total?: number;
                hash?: Uint8Array;
            };
        };
        block?: {
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
        };
        sdkBlock?: {
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
        };
    } & {
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
            } & { [K_89 in Exclude<keyof I_1["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
        } & { [K_90 in Exclude<keyof I_1["blockId"], keyof BlockID>]: never; };
        block?: {
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
                } & { [K_91 in Exclude<keyof I_1["block"]["header"]["version"], keyof import("../../../../tendermint/version/types").Consensus>]: never; };
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
                    } & { [K_92 in Exclude<keyof I_1["block"]["header"]["lastBlockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                } & { [K_93 in Exclude<keyof I_1["block"]["header"]["lastBlockId"], keyof BlockID>]: never; };
                lastCommitHash?: Uint8Array;
                dataHash?: Uint8Array;
                validatorsHash?: Uint8Array;
                nextValidatorsHash?: Uint8Array;
                consensusHash?: Uint8Array;
                appHash?: Uint8Array;
                lastResultsHash?: Uint8Array;
                evidenceHash?: Uint8Array;
                proposerAddress?: Uint8Array;
            } & { [K_94 in Exclude<keyof I_1["block"]["header"], keyof import("../../../../tendermint/types/types").Header>]: never; };
            data?: {
                txs?: Uint8Array[];
            } & {
                txs?: Uint8Array[] & Uint8Array[] & { [K_95 in Exclude<keyof I_1["block"]["data"]["txs"], keyof Uint8Array[]>]: never; };
            } & { [K_96 in Exclude<keyof I_1["block"]["data"], "txs">]: never; };
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
                                } & { [K_97 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                            } & { [K_98 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"]["blockId"], keyof BlockID>]: never; };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        } & { [K_99 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"], keyof import("../../../../tendermint/types/types").Vote>]: never; };
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
                                } & { [K_100 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                            } & { [K_101 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"]["blockId"], keyof BlockID>]: never; };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        } & { [K_102 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"], keyof import("../../../../tendermint/types/types").Vote>]: never; };
                        totalVotingPower?: number;
                        validatorPower?: number;
                        timestamp?: Date;
                    } & { [K_103 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"], keyof import("../../../../tendermint/types/evidence").DuplicateVoteEvidence>]: never; };
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
                                    } & { [K_104 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["version"], keyof import("../../../../tendermint/version/types").Consensus>]: never; };
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
                                        } & { [K_105 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                                    } & { [K_106 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"], keyof BlockID>]: never; };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                } & { [K_107 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"], keyof import("../../../../tendermint/types/types").Header>]: never; };
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
                                        } & { [K_108 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                                    } & { [K_109 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"], keyof BlockID>]: never; };
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
                                    } & { [K_110 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"][number], keyof import("../../../../tendermint/types/types").CommitSig>]: never; })[] & { [K_111 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"], keyof {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[]>]: never; };
                                } & { [K_112 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"], keyof import("../../../../tendermint/types/types").Commit>]: never; };
                            } & { [K_113 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"], keyof import("../../../../tendermint/types/types").SignedHeader>]: never; };
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
                                    } & { [K_114 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                } & { [K_115 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number], keyof import("../../../../tendermint/types/validator").Validator>]: never; })[] & { [K_116 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"], keyof {
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
                                    } & { [K_117 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                } & { [K_118 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"], keyof import("../../../../tendermint/types/validator").Validator>]: never; };
                                totalVotingPower?: number;
                            } & { [K_119 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"], keyof import("../../../../tendermint/types/validator").ValidatorSet>]: never; };
                        } & { [K_120 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"], keyof import("../../../../tendermint/types/types").LightBlock>]: never; };
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
                            } & { [K_121 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                            votingPower?: number;
                            proposerPriority?: number;
                        } & { [K_122 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number], keyof import("../../../../tendermint/types/validator").Validator>]: never; })[] & { [K_123 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"], keyof {
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
                    } & { [K_124 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"], keyof import("../../../../tendermint/types/evidence").LightClientAttackEvidence>]: never; };
                } & { [K_125 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number], keyof import("../../../../tendermint/types/evidence").Evidence>]: never; })[] & { [K_126 in Exclude<keyof I_1["block"]["evidence"]["evidence"], keyof {
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
            } & { [K_127 in Exclude<keyof I_1["block"]["evidence"], "evidence">]: never; };
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
                    } & { [K_128 in Exclude<keyof I_1["block"]["lastCommit"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                } & { [K_129 in Exclude<keyof I_1["block"]["lastCommit"]["blockId"], keyof BlockID>]: never; };
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
                } & { [K_130 in Exclude<keyof I_1["block"]["lastCommit"]["signatures"][number], keyof import("../../../../tendermint/types/types").CommitSig>]: never; })[] & { [K_131 in Exclude<keyof I_1["block"]["lastCommit"]["signatures"], keyof {
                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                }[]>]: never; };
            } & { [K_132 in Exclude<keyof I_1["block"]["lastCommit"], keyof import("../../../../tendermint/types/types").Commit>]: never; };
        } & { [K_133 in Exclude<keyof I_1["block"], keyof Block>]: never; };
        sdkBlock?: {
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
                proposerAddress?: string;
            } & {
                version?: {
                    block?: number;
                    app?: number;
                } & {
                    block?: number;
                    app?: number;
                } & { [K_134 in Exclude<keyof I_1["sdkBlock"]["header"]["version"], keyof import("../../../../tendermint/version/types").Consensus>]: never; };
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
                    } & { [K_135 in Exclude<keyof I_1["sdkBlock"]["header"]["lastBlockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                } & { [K_136 in Exclude<keyof I_1["sdkBlock"]["header"]["lastBlockId"], keyof BlockID>]: never; };
                lastCommitHash?: Uint8Array;
                dataHash?: Uint8Array;
                validatorsHash?: Uint8Array;
                nextValidatorsHash?: Uint8Array;
                consensusHash?: Uint8Array;
                appHash?: Uint8Array;
                lastResultsHash?: Uint8Array;
                evidenceHash?: Uint8Array;
                proposerAddress?: string;
            } & { [K_137 in Exclude<keyof I_1["sdkBlock"]["header"], keyof import("./types").Header>]: never; };
            data?: {
                txs?: Uint8Array[];
            } & {
                txs?: Uint8Array[] & Uint8Array[] & { [K_138 in Exclude<keyof I_1["sdkBlock"]["data"]["txs"], keyof Uint8Array[]>]: never; };
            } & { [K_139 in Exclude<keyof I_1["sdkBlock"]["data"], "txs">]: never; };
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
                                } & { [K_140 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                            } & { [K_141 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"]["blockId"], keyof BlockID>]: never; };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        } & { [K_142 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"], keyof import("../../../../tendermint/types/types").Vote>]: never; };
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
                                } & { [K_143 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                            } & { [K_144 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"]["blockId"], keyof BlockID>]: never; };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        } & { [K_145 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"], keyof import("../../../../tendermint/types/types").Vote>]: never; };
                        totalVotingPower?: number;
                        validatorPower?: number;
                        timestamp?: Date;
                    } & { [K_146 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["duplicateVoteEvidence"], keyof import("../../../../tendermint/types/evidence").DuplicateVoteEvidence>]: never; };
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
                                    } & { [K_147 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["version"], keyof import("../../../../tendermint/version/types").Consensus>]: never; };
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
                                        } & { [K_148 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                                    } & { [K_149 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"], keyof BlockID>]: never; };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                } & { [K_150 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"], keyof import("../../../../tendermint/types/types").Header>]: never; };
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
                                        } & { [K_151 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                                    } & { [K_152 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"], keyof BlockID>]: never; };
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
                                    } & { [K_153 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"][number], keyof import("../../../../tendermint/types/types").CommitSig>]: never; })[] & { [K_154 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"], keyof {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[]>]: never; };
                                } & { [K_155 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"], keyof import("../../../../tendermint/types/types").Commit>]: never; };
                            } & { [K_156 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"], keyof import("../../../../tendermint/types/types").SignedHeader>]: never; };
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
                                    } & { [K_157 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                } & { [K_158 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number], keyof import("../../../../tendermint/types/validator").Validator>]: never; })[] & { [K_159 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"], keyof {
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
                                    } & { [K_160 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                } & { [K_161 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"], keyof import("../../../../tendermint/types/validator").Validator>]: never; };
                                totalVotingPower?: number;
                            } & { [K_162 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"], keyof import("../../../../tendermint/types/validator").ValidatorSet>]: never; };
                        } & { [K_163 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"], keyof import("../../../../tendermint/types/types").LightBlock>]: never; };
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
                            } & { [K_164 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                            votingPower?: number;
                            proposerPriority?: number;
                        } & { [K_165 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number], keyof import("../../../../tendermint/types/validator").Validator>]: never; })[] & { [K_166 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"], keyof {
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
                    } & { [K_167 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"], keyof import("../../../../tendermint/types/evidence").LightClientAttackEvidence>]: never; };
                } & { [K_168 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number], keyof import("../../../../tendermint/types/evidence").Evidence>]: never; })[] & { [K_169 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"], keyof {
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
            } & { [K_170 in Exclude<keyof I_1["sdkBlock"]["evidence"], "evidence">]: never; };
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
                    } & { [K_171 in Exclude<keyof I_1["sdkBlock"]["lastCommit"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                } & { [K_172 in Exclude<keyof I_1["sdkBlock"]["lastCommit"]["blockId"], keyof BlockID>]: never; };
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
                } & { [K_173 in Exclude<keyof I_1["sdkBlock"]["lastCommit"]["signatures"][number], keyof import("../../../../tendermint/types/types").CommitSig>]: never; })[] & { [K_174 in Exclude<keyof I_1["sdkBlock"]["lastCommit"]["signatures"], keyof {
                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                }[]>]: never; };
            } & { [K_175 in Exclude<keyof I_1["sdkBlock"]["lastCommit"], keyof import("../../../../tendermint/types/types").Commit>]: never; };
        } & { [K_176 in Exclude<keyof I_1["sdkBlock"], keyof Block1>]: never; };
    } & { [K_177 in Exclude<keyof I_1, keyof GetBlockByHeightResponse>]: never; }>(object: I_1): GetBlockByHeightResponse;
};
export declare const GetLatestBlockRequest: {
    encode(_: GetLatestBlockRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GetLatestBlockRequest;
    fromJSON(_: any): GetLatestBlockRequest;
    toJSON(_: GetLatestBlockRequest): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): GetLatestBlockRequest;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): GetLatestBlockRequest;
};
export declare const GetLatestBlockResponse: {
    encode(message: GetLatestBlockResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GetLatestBlockResponse;
    fromJSON(object: any): GetLatestBlockResponse;
    toJSON(message: GetLatestBlockResponse): unknown;
    create<I extends {
        blockId?: {
            hash?: Uint8Array;
            partSetHeader?: {
                total?: number;
                hash?: Uint8Array;
            };
        };
        block?: {
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
        };
        sdkBlock?: {
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
        };
    } & {
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
            } & { [K in Exclude<keyof I["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
        } & { [K_1 in Exclude<keyof I["blockId"], keyof BlockID>]: never; };
        block?: {
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
                } & { [K_2 in Exclude<keyof I["block"]["header"]["version"], keyof import("../../../../tendermint/version/types").Consensus>]: never; };
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
                    } & { [K_3 in Exclude<keyof I["block"]["header"]["lastBlockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                } & { [K_4 in Exclude<keyof I["block"]["header"]["lastBlockId"], keyof BlockID>]: never; };
                lastCommitHash?: Uint8Array;
                dataHash?: Uint8Array;
                validatorsHash?: Uint8Array;
                nextValidatorsHash?: Uint8Array;
                consensusHash?: Uint8Array;
                appHash?: Uint8Array;
                lastResultsHash?: Uint8Array;
                evidenceHash?: Uint8Array;
                proposerAddress?: Uint8Array;
            } & { [K_5 in Exclude<keyof I["block"]["header"], keyof import("../../../../tendermint/types/types").Header>]: never; };
            data?: {
                txs?: Uint8Array[];
            } & {
                txs?: Uint8Array[] & Uint8Array[] & { [K_6 in Exclude<keyof I["block"]["data"]["txs"], keyof Uint8Array[]>]: never; };
            } & { [K_7 in Exclude<keyof I["block"]["data"], "txs">]: never; };
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
                                } & { [K_8 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                            } & { [K_9 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"]["blockId"], keyof BlockID>]: never; };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        } & { [K_10 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"], keyof import("../../../../tendermint/types/types").Vote>]: never; };
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
                                } & { [K_11 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                            } & { [K_12 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"]["blockId"], keyof BlockID>]: never; };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        } & { [K_13 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"], keyof import("../../../../tendermint/types/types").Vote>]: never; };
                        totalVotingPower?: number;
                        validatorPower?: number;
                        timestamp?: Date;
                    } & { [K_14 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"], keyof import("../../../../tendermint/types/evidence").DuplicateVoteEvidence>]: never; };
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
                                    } & { [K_15 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["version"], keyof import("../../../../tendermint/version/types").Consensus>]: never; };
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
                                        } & { [K_16 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                                    } & { [K_17 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"], keyof BlockID>]: never; };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                } & { [K_18 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"], keyof import("../../../../tendermint/types/types").Header>]: never; };
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
                                        } & { [K_19 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                                    } & { [K_20 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"], keyof BlockID>]: never; };
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
                                    } & { [K_21 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"][number], keyof import("../../../../tendermint/types/types").CommitSig>]: never; })[] & { [K_22 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"], keyof {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[]>]: never; };
                                } & { [K_23 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"], keyof import("../../../../tendermint/types/types").Commit>]: never; };
                            } & { [K_24 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"], keyof import("../../../../tendermint/types/types").SignedHeader>]: never; };
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
                                    } & { [K_25 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                } & { [K_26 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number], keyof import("../../../../tendermint/types/validator").Validator>]: never; })[] & { [K_27 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"], keyof {
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
                                    } & { [K_28 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                } & { [K_29 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"], keyof import("../../../../tendermint/types/validator").Validator>]: never; };
                                totalVotingPower?: number;
                            } & { [K_30 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"], keyof import("../../../../tendermint/types/validator").ValidatorSet>]: never; };
                        } & { [K_31 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"], keyof import("../../../../tendermint/types/types").LightBlock>]: never; };
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
                            } & { [K_32 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                            votingPower?: number;
                            proposerPriority?: number;
                        } & { [K_33 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number], keyof import("../../../../tendermint/types/validator").Validator>]: never; })[] & { [K_34 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"], keyof {
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
                    } & { [K_35 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"], keyof import("../../../../tendermint/types/evidence").LightClientAttackEvidence>]: never; };
                } & { [K_36 in Exclude<keyof I["block"]["evidence"]["evidence"][number], keyof import("../../../../tendermint/types/evidence").Evidence>]: never; })[] & { [K_37 in Exclude<keyof I["block"]["evidence"]["evidence"], keyof {
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
            } & { [K_38 in Exclude<keyof I["block"]["evidence"], "evidence">]: never; };
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
                    } & { [K_39 in Exclude<keyof I["block"]["lastCommit"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                } & { [K_40 in Exclude<keyof I["block"]["lastCommit"]["blockId"], keyof BlockID>]: never; };
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
                } & { [K_41 in Exclude<keyof I["block"]["lastCommit"]["signatures"][number], keyof import("../../../../tendermint/types/types").CommitSig>]: never; })[] & { [K_42 in Exclude<keyof I["block"]["lastCommit"]["signatures"], keyof {
                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                }[]>]: never; };
            } & { [K_43 in Exclude<keyof I["block"]["lastCommit"], keyof import("../../../../tendermint/types/types").Commit>]: never; };
        } & { [K_44 in Exclude<keyof I["block"], keyof Block>]: never; };
        sdkBlock?: {
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
                proposerAddress?: string;
            } & {
                version?: {
                    block?: number;
                    app?: number;
                } & {
                    block?: number;
                    app?: number;
                } & { [K_45 in Exclude<keyof I["sdkBlock"]["header"]["version"], keyof import("../../../../tendermint/version/types").Consensus>]: never; };
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
                    } & { [K_46 in Exclude<keyof I["sdkBlock"]["header"]["lastBlockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                } & { [K_47 in Exclude<keyof I["sdkBlock"]["header"]["lastBlockId"], keyof BlockID>]: never; };
                lastCommitHash?: Uint8Array;
                dataHash?: Uint8Array;
                validatorsHash?: Uint8Array;
                nextValidatorsHash?: Uint8Array;
                consensusHash?: Uint8Array;
                appHash?: Uint8Array;
                lastResultsHash?: Uint8Array;
                evidenceHash?: Uint8Array;
                proposerAddress?: string;
            } & { [K_48 in Exclude<keyof I["sdkBlock"]["header"], keyof import("./types").Header>]: never; };
            data?: {
                txs?: Uint8Array[];
            } & {
                txs?: Uint8Array[] & Uint8Array[] & { [K_49 in Exclude<keyof I["sdkBlock"]["data"]["txs"], keyof Uint8Array[]>]: never; };
            } & { [K_50 in Exclude<keyof I["sdkBlock"]["data"], "txs">]: never; };
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
                                } & { [K_51 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                            } & { [K_52 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"]["blockId"], keyof BlockID>]: never; };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        } & { [K_53 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"], keyof import("../../../../tendermint/types/types").Vote>]: never; };
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
                                } & { [K_54 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                            } & { [K_55 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"]["blockId"], keyof BlockID>]: never; };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        } & { [K_56 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"], keyof import("../../../../tendermint/types/types").Vote>]: never; };
                        totalVotingPower?: number;
                        validatorPower?: number;
                        timestamp?: Date;
                    } & { [K_57 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["duplicateVoteEvidence"], keyof import("../../../../tendermint/types/evidence").DuplicateVoteEvidence>]: never; };
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
                                    } & { [K_58 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["version"], keyof import("../../../../tendermint/version/types").Consensus>]: never; };
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
                                        } & { [K_59 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                                    } & { [K_60 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"], keyof BlockID>]: never; };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                } & { [K_61 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"], keyof import("../../../../tendermint/types/types").Header>]: never; };
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
                                        } & { [K_62 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                                    } & { [K_63 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"], keyof BlockID>]: never; };
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
                                    } & { [K_64 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"][number], keyof import("../../../../tendermint/types/types").CommitSig>]: never; })[] & { [K_65 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"], keyof {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[]>]: never; };
                                } & { [K_66 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"], keyof import("../../../../tendermint/types/types").Commit>]: never; };
                            } & { [K_67 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"], keyof import("../../../../tendermint/types/types").SignedHeader>]: never; };
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
                                    } & { [K_68 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                } & { [K_69 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number], keyof import("../../../../tendermint/types/validator").Validator>]: never; })[] & { [K_70 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"], keyof {
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
                                    } & { [K_71 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                } & { [K_72 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"], keyof import("../../../../tendermint/types/validator").Validator>]: never; };
                                totalVotingPower?: number;
                            } & { [K_73 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"], keyof import("../../../../tendermint/types/validator").ValidatorSet>]: never; };
                        } & { [K_74 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"], keyof import("../../../../tendermint/types/types").LightBlock>]: never; };
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
                            } & { [K_75 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                            votingPower?: number;
                            proposerPriority?: number;
                        } & { [K_76 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number], keyof import("../../../../tendermint/types/validator").Validator>]: never; })[] & { [K_77 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"], keyof {
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
                    } & { [K_78 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"], keyof import("../../../../tendermint/types/evidence").LightClientAttackEvidence>]: never; };
                } & { [K_79 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"][number], keyof import("../../../../tendermint/types/evidence").Evidence>]: never; })[] & { [K_80 in Exclude<keyof I["sdkBlock"]["evidence"]["evidence"], keyof {
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
            } & { [K_81 in Exclude<keyof I["sdkBlock"]["evidence"], "evidence">]: never; };
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
                    } & { [K_82 in Exclude<keyof I["sdkBlock"]["lastCommit"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                } & { [K_83 in Exclude<keyof I["sdkBlock"]["lastCommit"]["blockId"], keyof BlockID>]: never; };
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
                } & { [K_84 in Exclude<keyof I["sdkBlock"]["lastCommit"]["signatures"][number], keyof import("../../../../tendermint/types/types").CommitSig>]: never; })[] & { [K_85 in Exclude<keyof I["sdkBlock"]["lastCommit"]["signatures"], keyof {
                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                }[]>]: never; };
            } & { [K_86 in Exclude<keyof I["sdkBlock"]["lastCommit"], keyof import("../../../../tendermint/types/types").Commit>]: never; };
        } & { [K_87 in Exclude<keyof I["sdkBlock"], keyof Block1>]: never; };
    } & { [K_88 in Exclude<keyof I, keyof GetLatestBlockResponse>]: never; }>(base?: I): GetLatestBlockResponse;
    fromPartial<I_1 extends {
        blockId?: {
            hash?: Uint8Array;
            partSetHeader?: {
                total?: number;
                hash?: Uint8Array;
            };
        };
        block?: {
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
        };
        sdkBlock?: {
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
        };
    } & {
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
            } & { [K_89 in Exclude<keyof I_1["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
        } & { [K_90 in Exclude<keyof I_1["blockId"], keyof BlockID>]: never; };
        block?: {
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
                } & { [K_91 in Exclude<keyof I_1["block"]["header"]["version"], keyof import("../../../../tendermint/version/types").Consensus>]: never; };
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
                    } & { [K_92 in Exclude<keyof I_1["block"]["header"]["lastBlockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                } & { [K_93 in Exclude<keyof I_1["block"]["header"]["lastBlockId"], keyof BlockID>]: never; };
                lastCommitHash?: Uint8Array;
                dataHash?: Uint8Array;
                validatorsHash?: Uint8Array;
                nextValidatorsHash?: Uint8Array;
                consensusHash?: Uint8Array;
                appHash?: Uint8Array;
                lastResultsHash?: Uint8Array;
                evidenceHash?: Uint8Array;
                proposerAddress?: Uint8Array;
            } & { [K_94 in Exclude<keyof I_1["block"]["header"], keyof import("../../../../tendermint/types/types").Header>]: never; };
            data?: {
                txs?: Uint8Array[];
            } & {
                txs?: Uint8Array[] & Uint8Array[] & { [K_95 in Exclude<keyof I_1["block"]["data"]["txs"], keyof Uint8Array[]>]: never; };
            } & { [K_96 in Exclude<keyof I_1["block"]["data"], "txs">]: never; };
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
                                } & { [K_97 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                            } & { [K_98 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"]["blockId"], keyof BlockID>]: never; };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        } & { [K_99 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"], keyof import("../../../../tendermint/types/types").Vote>]: never; };
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
                                } & { [K_100 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                            } & { [K_101 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"]["blockId"], keyof BlockID>]: never; };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        } & { [K_102 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"], keyof import("../../../../tendermint/types/types").Vote>]: never; };
                        totalVotingPower?: number;
                        validatorPower?: number;
                        timestamp?: Date;
                    } & { [K_103 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"], keyof import("../../../../tendermint/types/evidence").DuplicateVoteEvidence>]: never; };
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
                                    } & { [K_104 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["version"], keyof import("../../../../tendermint/version/types").Consensus>]: never; };
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
                                        } & { [K_105 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                                    } & { [K_106 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"], keyof BlockID>]: never; };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                } & { [K_107 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"], keyof import("../../../../tendermint/types/types").Header>]: never; };
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
                                        } & { [K_108 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                                    } & { [K_109 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"], keyof BlockID>]: never; };
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
                                    } & { [K_110 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"][number], keyof import("../../../../tendermint/types/types").CommitSig>]: never; })[] & { [K_111 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"], keyof {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[]>]: never; };
                                } & { [K_112 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"], keyof import("../../../../tendermint/types/types").Commit>]: never; };
                            } & { [K_113 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"], keyof import("../../../../tendermint/types/types").SignedHeader>]: never; };
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
                                    } & { [K_114 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                } & { [K_115 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number], keyof import("../../../../tendermint/types/validator").Validator>]: never; })[] & { [K_116 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"], keyof {
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
                                    } & { [K_117 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                } & { [K_118 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"], keyof import("../../../../tendermint/types/validator").Validator>]: never; };
                                totalVotingPower?: number;
                            } & { [K_119 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"], keyof import("../../../../tendermint/types/validator").ValidatorSet>]: never; };
                        } & { [K_120 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"], keyof import("../../../../tendermint/types/types").LightBlock>]: never; };
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
                            } & { [K_121 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                            votingPower?: number;
                            proposerPriority?: number;
                        } & { [K_122 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number], keyof import("../../../../tendermint/types/validator").Validator>]: never; })[] & { [K_123 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"], keyof {
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
                    } & { [K_124 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"], keyof import("../../../../tendermint/types/evidence").LightClientAttackEvidence>]: never; };
                } & { [K_125 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number], keyof import("../../../../tendermint/types/evidence").Evidence>]: never; })[] & { [K_126 in Exclude<keyof I_1["block"]["evidence"]["evidence"], keyof {
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
            } & { [K_127 in Exclude<keyof I_1["block"]["evidence"], "evidence">]: never; };
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
                    } & { [K_128 in Exclude<keyof I_1["block"]["lastCommit"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                } & { [K_129 in Exclude<keyof I_1["block"]["lastCommit"]["blockId"], keyof BlockID>]: never; };
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
                } & { [K_130 in Exclude<keyof I_1["block"]["lastCommit"]["signatures"][number], keyof import("../../../../tendermint/types/types").CommitSig>]: never; })[] & { [K_131 in Exclude<keyof I_1["block"]["lastCommit"]["signatures"], keyof {
                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                }[]>]: never; };
            } & { [K_132 in Exclude<keyof I_1["block"]["lastCommit"], keyof import("../../../../tendermint/types/types").Commit>]: never; };
        } & { [K_133 in Exclude<keyof I_1["block"], keyof Block>]: never; };
        sdkBlock?: {
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
                proposerAddress?: string;
            } & {
                version?: {
                    block?: number;
                    app?: number;
                } & {
                    block?: number;
                    app?: number;
                } & { [K_134 in Exclude<keyof I_1["sdkBlock"]["header"]["version"], keyof import("../../../../tendermint/version/types").Consensus>]: never; };
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
                    } & { [K_135 in Exclude<keyof I_1["sdkBlock"]["header"]["lastBlockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                } & { [K_136 in Exclude<keyof I_1["sdkBlock"]["header"]["lastBlockId"], keyof BlockID>]: never; };
                lastCommitHash?: Uint8Array;
                dataHash?: Uint8Array;
                validatorsHash?: Uint8Array;
                nextValidatorsHash?: Uint8Array;
                consensusHash?: Uint8Array;
                appHash?: Uint8Array;
                lastResultsHash?: Uint8Array;
                evidenceHash?: Uint8Array;
                proposerAddress?: string;
            } & { [K_137 in Exclude<keyof I_1["sdkBlock"]["header"], keyof import("./types").Header>]: never; };
            data?: {
                txs?: Uint8Array[];
            } & {
                txs?: Uint8Array[] & Uint8Array[] & { [K_138 in Exclude<keyof I_1["sdkBlock"]["data"]["txs"], keyof Uint8Array[]>]: never; };
            } & { [K_139 in Exclude<keyof I_1["sdkBlock"]["data"], "txs">]: never; };
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
                                } & { [K_140 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                            } & { [K_141 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"]["blockId"], keyof BlockID>]: never; };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        } & { [K_142 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"], keyof import("../../../../tendermint/types/types").Vote>]: never; };
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
                                } & { [K_143 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                            } & { [K_144 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"]["blockId"], keyof BlockID>]: never; };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        } & { [K_145 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"], keyof import("../../../../tendermint/types/types").Vote>]: never; };
                        totalVotingPower?: number;
                        validatorPower?: number;
                        timestamp?: Date;
                    } & { [K_146 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["duplicateVoteEvidence"], keyof import("../../../../tendermint/types/evidence").DuplicateVoteEvidence>]: never; };
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
                                    } & { [K_147 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["version"], keyof import("../../../../tendermint/version/types").Consensus>]: never; };
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
                                        } & { [K_148 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                                    } & { [K_149 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"], keyof BlockID>]: never; };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                } & { [K_150 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"], keyof import("../../../../tendermint/types/types").Header>]: never; };
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
                                        } & { [K_151 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                                    } & { [K_152 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"], keyof BlockID>]: never; };
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
                                    } & { [K_153 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"][number], keyof import("../../../../tendermint/types/types").CommitSig>]: never; })[] & { [K_154 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"], keyof {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[]>]: never; };
                                } & { [K_155 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"], keyof import("../../../../tendermint/types/types").Commit>]: never; };
                            } & { [K_156 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"], keyof import("../../../../tendermint/types/types").SignedHeader>]: never; };
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
                                    } & { [K_157 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                } & { [K_158 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number], keyof import("../../../../tendermint/types/validator").Validator>]: never; })[] & { [K_159 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"], keyof {
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
                                    } & { [K_160 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                } & { [K_161 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"], keyof import("../../../../tendermint/types/validator").Validator>]: never; };
                                totalVotingPower?: number;
                            } & { [K_162 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"], keyof import("../../../../tendermint/types/validator").ValidatorSet>]: never; };
                        } & { [K_163 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"], keyof import("../../../../tendermint/types/types").LightBlock>]: never; };
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
                            } & { [K_164 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                            votingPower?: number;
                            proposerPriority?: number;
                        } & { [K_165 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number], keyof import("../../../../tendermint/types/validator").Validator>]: never; })[] & { [K_166 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"], keyof {
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
                    } & { [K_167 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number]["lightClientAttackEvidence"], keyof import("../../../../tendermint/types/evidence").LightClientAttackEvidence>]: never; };
                } & { [K_168 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"][number], keyof import("../../../../tendermint/types/evidence").Evidence>]: never; })[] & { [K_169 in Exclude<keyof I_1["sdkBlock"]["evidence"]["evidence"], keyof {
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
            } & { [K_170 in Exclude<keyof I_1["sdkBlock"]["evidence"], "evidence">]: never; };
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
                    } & { [K_171 in Exclude<keyof I_1["sdkBlock"]["lastCommit"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                } & { [K_172 in Exclude<keyof I_1["sdkBlock"]["lastCommit"]["blockId"], keyof BlockID>]: never; };
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
                } & { [K_173 in Exclude<keyof I_1["sdkBlock"]["lastCommit"]["signatures"][number], keyof import("../../../../tendermint/types/types").CommitSig>]: never; })[] & { [K_174 in Exclude<keyof I_1["sdkBlock"]["lastCommit"]["signatures"], keyof {
                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                }[]>]: never; };
            } & { [K_175 in Exclude<keyof I_1["sdkBlock"]["lastCommit"], keyof import("../../../../tendermint/types/types").Commit>]: never; };
        } & { [K_176 in Exclude<keyof I_1["sdkBlock"], keyof Block1>]: never; };
    } & { [K_177 in Exclude<keyof I_1, keyof GetLatestBlockResponse>]: never; }>(object: I_1): GetLatestBlockResponse;
};
export declare const GetSyncingRequest: {
    encode(_: GetSyncingRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GetSyncingRequest;
    fromJSON(_: any): GetSyncingRequest;
    toJSON(_: GetSyncingRequest): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): GetSyncingRequest;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): GetSyncingRequest;
};
export declare const GetSyncingResponse: {
    encode(message: GetSyncingResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GetSyncingResponse;
    fromJSON(object: any): GetSyncingResponse;
    toJSON(message: GetSyncingResponse): unknown;
    create<I extends {
        syncing?: boolean;
    } & {
        syncing?: boolean;
    } & { [K in Exclude<keyof I, "syncing">]: never; }>(base?: I): GetSyncingResponse;
    fromPartial<I_1 extends {
        syncing?: boolean;
    } & {
        syncing?: boolean;
    } & { [K_1 in Exclude<keyof I_1, "syncing">]: never; }>(object: I_1): GetSyncingResponse;
};
export declare const GetNodeInfoRequest: {
    encode(_: GetNodeInfoRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GetNodeInfoRequest;
    fromJSON(_: any): GetNodeInfoRequest;
    toJSON(_: GetNodeInfoRequest): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): GetNodeInfoRequest;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): GetNodeInfoRequest;
};
export declare const GetNodeInfoResponse: {
    encode(message: GetNodeInfoResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GetNodeInfoResponse;
    fromJSON(object: any): GetNodeInfoResponse;
    toJSON(message: GetNodeInfoResponse): unknown;
    create<I extends {
        defaultNodeInfo?: {
            protocolVersion?: {
                p2p?: number;
                block?: number;
                app?: number;
            };
            defaultNodeId?: string;
            listenAddr?: string;
            network?: string;
            version?: string;
            channels?: Uint8Array;
            moniker?: string;
            other?: {
                txIndex?: string;
                rpcAddress?: string;
            };
        };
        applicationVersion?: {
            name?: string;
            appName?: string;
            version?: string;
            gitCommit?: string;
            buildTags?: string;
            goVersion?: string;
            buildDeps?: {
                path?: string;
                version?: string;
                sum?: string;
            }[];
            cosmosSdkVersion?: string;
        };
    } & {
        defaultNodeInfo?: {
            protocolVersion?: {
                p2p?: number;
                block?: number;
                app?: number;
            };
            defaultNodeId?: string;
            listenAddr?: string;
            network?: string;
            version?: string;
            channels?: Uint8Array;
            moniker?: string;
            other?: {
                txIndex?: string;
                rpcAddress?: string;
            };
        } & {
            protocolVersion?: {
                p2p?: number;
                block?: number;
                app?: number;
            } & {
                p2p?: number;
                block?: number;
                app?: number;
            } & { [K in Exclude<keyof I["defaultNodeInfo"]["protocolVersion"], keyof import("../../../../tendermint/p2p/types").ProtocolVersion>]: never; };
            defaultNodeId?: string;
            listenAddr?: string;
            network?: string;
            version?: string;
            channels?: Uint8Array;
            moniker?: string;
            other?: {
                txIndex?: string;
                rpcAddress?: string;
            } & {
                txIndex?: string;
                rpcAddress?: string;
            } & { [K_1 in Exclude<keyof I["defaultNodeInfo"]["other"], keyof import("../../../../tendermint/p2p/types").DefaultNodeInfoOther>]: never; };
        } & { [K_2 in Exclude<keyof I["defaultNodeInfo"], keyof DefaultNodeInfo>]: never; };
        applicationVersion?: {
            name?: string;
            appName?: string;
            version?: string;
            gitCommit?: string;
            buildTags?: string;
            goVersion?: string;
            buildDeps?: {
                path?: string;
                version?: string;
                sum?: string;
            }[];
            cosmosSdkVersion?: string;
        } & {
            name?: string;
            appName?: string;
            version?: string;
            gitCommit?: string;
            buildTags?: string;
            goVersion?: string;
            buildDeps?: {
                path?: string;
                version?: string;
                sum?: string;
            }[] & ({
                path?: string;
                version?: string;
                sum?: string;
            } & {
                path?: string;
                version?: string;
                sum?: string;
            } & { [K_3 in Exclude<keyof I["applicationVersion"]["buildDeps"][number], keyof Module>]: never; })[] & { [K_4 in Exclude<keyof I["applicationVersion"]["buildDeps"], keyof {
                path?: string;
                version?: string;
                sum?: string;
            }[]>]: never; };
            cosmosSdkVersion?: string;
        } & { [K_5 in Exclude<keyof I["applicationVersion"], keyof VersionInfo>]: never; };
    } & { [K_6 in Exclude<keyof I, keyof GetNodeInfoResponse>]: never; }>(base?: I): GetNodeInfoResponse;
    fromPartial<I_1 extends {
        defaultNodeInfo?: {
            protocolVersion?: {
                p2p?: number;
                block?: number;
                app?: number;
            };
            defaultNodeId?: string;
            listenAddr?: string;
            network?: string;
            version?: string;
            channels?: Uint8Array;
            moniker?: string;
            other?: {
                txIndex?: string;
                rpcAddress?: string;
            };
        };
        applicationVersion?: {
            name?: string;
            appName?: string;
            version?: string;
            gitCommit?: string;
            buildTags?: string;
            goVersion?: string;
            buildDeps?: {
                path?: string;
                version?: string;
                sum?: string;
            }[];
            cosmosSdkVersion?: string;
        };
    } & {
        defaultNodeInfo?: {
            protocolVersion?: {
                p2p?: number;
                block?: number;
                app?: number;
            };
            defaultNodeId?: string;
            listenAddr?: string;
            network?: string;
            version?: string;
            channels?: Uint8Array;
            moniker?: string;
            other?: {
                txIndex?: string;
                rpcAddress?: string;
            };
        } & {
            protocolVersion?: {
                p2p?: number;
                block?: number;
                app?: number;
            } & {
                p2p?: number;
                block?: number;
                app?: number;
            } & { [K_7 in Exclude<keyof I_1["defaultNodeInfo"]["protocolVersion"], keyof import("../../../../tendermint/p2p/types").ProtocolVersion>]: never; };
            defaultNodeId?: string;
            listenAddr?: string;
            network?: string;
            version?: string;
            channels?: Uint8Array;
            moniker?: string;
            other?: {
                txIndex?: string;
                rpcAddress?: string;
            } & {
                txIndex?: string;
                rpcAddress?: string;
            } & { [K_8 in Exclude<keyof I_1["defaultNodeInfo"]["other"], keyof import("../../../../tendermint/p2p/types").DefaultNodeInfoOther>]: never; };
        } & { [K_9 in Exclude<keyof I_1["defaultNodeInfo"], keyof DefaultNodeInfo>]: never; };
        applicationVersion?: {
            name?: string;
            appName?: string;
            version?: string;
            gitCommit?: string;
            buildTags?: string;
            goVersion?: string;
            buildDeps?: {
                path?: string;
                version?: string;
                sum?: string;
            }[];
            cosmosSdkVersion?: string;
        } & {
            name?: string;
            appName?: string;
            version?: string;
            gitCommit?: string;
            buildTags?: string;
            goVersion?: string;
            buildDeps?: {
                path?: string;
                version?: string;
                sum?: string;
            }[] & ({
                path?: string;
                version?: string;
                sum?: string;
            } & {
                path?: string;
                version?: string;
                sum?: string;
            } & { [K_10 in Exclude<keyof I_1["applicationVersion"]["buildDeps"][number], keyof Module>]: never; })[] & { [K_11 in Exclude<keyof I_1["applicationVersion"]["buildDeps"], keyof {
                path?: string;
                version?: string;
                sum?: string;
            }[]>]: never; };
            cosmosSdkVersion?: string;
        } & { [K_12 in Exclude<keyof I_1["applicationVersion"], keyof VersionInfo>]: never; };
    } & { [K_13 in Exclude<keyof I_1, keyof GetNodeInfoResponse>]: never; }>(object: I_1): GetNodeInfoResponse;
};
export declare const VersionInfo: {
    encode(message: VersionInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): VersionInfo;
    fromJSON(object: any): VersionInfo;
    toJSON(message: VersionInfo): unknown;
    create<I extends {
        name?: string;
        appName?: string;
        version?: string;
        gitCommit?: string;
        buildTags?: string;
        goVersion?: string;
        buildDeps?: {
            path?: string;
            version?: string;
            sum?: string;
        }[];
        cosmosSdkVersion?: string;
    } & {
        name?: string;
        appName?: string;
        version?: string;
        gitCommit?: string;
        buildTags?: string;
        goVersion?: string;
        buildDeps?: {
            path?: string;
            version?: string;
            sum?: string;
        }[] & ({
            path?: string;
            version?: string;
            sum?: string;
        } & {
            path?: string;
            version?: string;
            sum?: string;
        } & { [K in Exclude<keyof I["buildDeps"][number], keyof Module>]: never; })[] & { [K_1 in Exclude<keyof I["buildDeps"], keyof {
            path?: string;
            version?: string;
            sum?: string;
        }[]>]: never; };
        cosmosSdkVersion?: string;
    } & { [K_2 in Exclude<keyof I, keyof VersionInfo>]: never; }>(base?: I): VersionInfo;
    fromPartial<I_1 extends {
        name?: string;
        appName?: string;
        version?: string;
        gitCommit?: string;
        buildTags?: string;
        goVersion?: string;
        buildDeps?: {
            path?: string;
            version?: string;
            sum?: string;
        }[];
        cosmosSdkVersion?: string;
    } & {
        name?: string;
        appName?: string;
        version?: string;
        gitCommit?: string;
        buildTags?: string;
        goVersion?: string;
        buildDeps?: {
            path?: string;
            version?: string;
            sum?: string;
        }[] & ({
            path?: string;
            version?: string;
            sum?: string;
        } & {
            path?: string;
            version?: string;
            sum?: string;
        } & { [K_3 in Exclude<keyof I_1["buildDeps"][number], keyof Module>]: never; })[] & { [K_4 in Exclude<keyof I_1["buildDeps"], keyof {
            path?: string;
            version?: string;
            sum?: string;
        }[]>]: never; };
        cosmosSdkVersion?: string;
    } & { [K_5 in Exclude<keyof I_1, keyof VersionInfo>]: never; }>(object: I_1): VersionInfo;
};
export declare const Module: {
    encode(message: Module, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Module;
    fromJSON(object: any): Module;
    toJSON(message: Module): unknown;
    create<I extends {
        path?: string;
        version?: string;
        sum?: string;
    } & {
        path?: string;
        version?: string;
        sum?: string;
    } & { [K in Exclude<keyof I, keyof Module>]: never; }>(base?: I): Module;
    fromPartial<I_1 extends {
        path?: string;
        version?: string;
        sum?: string;
    } & {
        path?: string;
        version?: string;
        sum?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof Module>]: never; }>(object: I_1): Module;
};
export declare const ABCIQueryRequest: {
    encode(message: ABCIQueryRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ABCIQueryRequest;
    fromJSON(object: any): ABCIQueryRequest;
    toJSON(message: ABCIQueryRequest): unknown;
    create<I extends {
        data?: Uint8Array;
        path?: string;
        height?: number;
        prove?: boolean;
    } & {
        data?: Uint8Array;
        path?: string;
        height?: number;
        prove?: boolean;
    } & { [K in Exclude<keyof I, keyof ABCIQueryRequest>]: never; }>(base?: I): ABCIQueryRequest;
    fromPartial<I_1 extends {
        data?: Uint8Array;
        path?: string;
        height?: number;
        prove?: boolean;
    } & {
        data?: Uint8Array;
        path?: string;
        height?: number;
        prove?: boolean;
    } & { [K_1 in Exclude<keyof I_1, keyof ABCIQueryRequest>]: never; }>(object: I_1): ABCIQueryRequest;
};
export declare const ABCIQueryResponse: {
    encode(message: ABCIQueryResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ABCIQueryResponse;
    fromJSON(object: any): ABCIQueryResponse;
    toJSON(message: ABCIQueryResponse): unknown;
    create<I extends {
        code?: number;
        log?: string;
        info?: string;
        index?: number;
        key?: Uint8Array;
        value?: Uint8Array;
        proofOps?: {
            ops?: {
                type?: string;
                key?: Uint8Array;
                data?: Uint8Array;
            }[];
        };
        height?: number;
        codespace?: string;
    } & {
        code?: number;
        log?: string;
        info?: string;
        index?: number;
        key?: Uint8Array;
        value?: Uint8Array;
        proofOps?: {
            ops?: {
                type?: string;
                key?: Uint8Array;
                data?: Uint8Array;
            }[];
        } & {
            ops?: {
                type?: string;
                key?: Uint8Array;
                data?: Uint8Array;
            }[] & ({
                type?: string;
                key?: Uint8Array;
                data?: Uint8Array;
            } & {
                type?: string;
                key?: Uint8Array;
                data?: Uint8Array;
            } & { [K in Exclude<keyof I["proofOps"]["ops"][number], keyof ProofOp>]: never; })[] & { [K_1 in Exclude<keyof I["proofOps"]["ops"], keyof {
                type?: string;
                key?: Uint8Array;
                data?: Uint8Array;
            }[]>]: never; };
        } & { [K_2 in Exclude<keyof I["proofOps"], "ops">]: never; };
        height?: number;
        codespace?: string;
    } & { [K_3 in Exclude<keyof I, keyof ABCIQueryResponse>]: never; }>(base?: I): ABCIQueryResponse;
    fromPartial<I_1 extends {
        code?: number;
        log?: string;
        info?: string;
        index?: number;
        key?: Uint8Array;
        value?: Uint8Array;
        proofOps?: {
            ops?: {
                type?: string;
                key?: Uint8Array;
                data?: Uint8Array;
            }[];
        };
        height?: number;
        codespace?: string;
    } & {
        code?: number;
        log?: string;
        info?: string;
        index?: number;
        key?: Uint8Array;
        value?: Uint8Array;
        proofOps?: {
            ops?: {
                type?: string;
                key?: Uint8Array;
                data?: Uint8Array;
            }[];
        } & {
            ops?: {
                type?: string;
                key?: Uint8Array;
                data?: Uint8Array;
            }[] & ({
                type?: string;
                key?: Uint8Array;
                data?: Uint8Array;
            } & {
                type?: string;
                key?: Uint8Array;
                data?: Uint8Array;
            } & { [K_4 in Exclude<keyof I_1["proofOps"]["ops"][number], keyof ProofOp>]: never; })[] & { [K_5 in Exclude<keyof I_1["proofOps"]["ops"], keyof {
                type?: string;
                key?: Uint8Array;
                data?: Uint8Array;
            }[]>]: never; };
        } & { [K_6 in Exclude<keyof I_1["proofOps"], "ops">]: never; };
        height?: number;
        codespace?: string;
    } & { [K_7 in Exclude<keyof I_1, keyof ABCIQueryResponse>]: never; }>(object: I_1): ABCIQueryResponse;
};
export declare const ProofOp: {
    encode(message: ProofOp, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ProofOp;
    fromJSON(object: any): ProofOp;
    toJSON(message: ProofOp): unknown;
    create<I extends {
        type?: string;
        key?: Uint8Array;
        data?: Uint8Array;
    } & {
        type?: string;
        key?: Uint8Array;
        data?: Uint8Array;
    } & { [K in Exclude<keyof I, keyof ProofOp>]: never; }>(base?: I): ProofOp;
    fromPartial<I_1 extends {
        type?: string;
        key?: Uint8Array;
        data?: Uint8Array;
    } & {
        type?: string;
        key?: Uint8Array;
        data?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, keyof ProofOp>]: never; }>(object: I_1): ProofOp;
};
export declare const ProofOps: {
    encode(message: ProofOps, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ProofOps;
    fromJSON(object: any): ProofOps;
    toJSON(message: ProofOps): unknown;
    create<I extends {
        ops?: {
            type?: string;
            key?: Uint8Array;
            data?: Uint8Array;
        }[];
    } & {
        ops?: {
            type?: string;
            key?: Uint8Array;
            data?: Uint8Array;
        }[] & ({
            type?: string;
            key?: Uint8Array;
            data?: Uint8Array;
        } & {
            type?: string;
            key?: Uint8Array;
            data?: Uint8Array;
        } & { [K in Exclude<keyof I["ops"][number], keyof ProofOp>]: never; })[] & { [K_1 in Exclude<keyof I["ops"], keyof {
            type?: string;
            key?: Uint8Array;
            data?: Uint8Array;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, "ops">]: never; }>(base?: I): ProofOps;
    fromPartial<I_1 extends {
        ops?: {
            type?: string;
            key?: Uint8Array;
            data?: Uint8Array;
        }[];
    } & {
        ops?: {
            type?: string;
            key?: Uint8Array;
            data?: Uint8Array;
        }[] & ({
            type?: string;
            key?: Uint8Array;
            data?: Uint8Array;
        } & {
            type?: string;
            key?: Uint8Array;
            data?: Uint8Array;
        } & { [K_3 in Exclude<keyof I_1["ops"][number], keyof ProofOp>]: never; })[] & { [K_4 in Exclude<keyof I_1["ops"], keyof {
            type?: string;
            key?: Uint8Array;
            data?: Uint8Array;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, "ops">]: never; }>(object: I_1): ProofOps;
};
/** Service defines the gRPC querier service for tendermint queries. */
export interface Service {
    /** GetNodeInfo queries the current node info. */
    GetNodeInfo(request: GetNodeInfoRequest): Promise<GetNodeInfoResponse>;
    /** GetSyncing queries node syncing. */
    GetSyncing(request: GetSyncingRequest): Promise<GetSyncingResponse>;
    /** GetLatestBlock returns the latest block. */
    GetLatestBlock(request: GetLatestBlockRequest): Promise<GetLatestBlockResponse>;
    /** GetBlockByHeight queries block for given height. */
    GetBlockByHeight(request: GetBlockByHeightRequest): Promise<GetBlockByHeightResponse>;
    /** GetLatestValidatorSet queries latest validator-set. */
    GetLatestValidatorSet(request: GetLatestValidatorSetRequest): Promise<GetLatestValidatorSetResponse>;
    /** GetValidatorSetByHeight queries validator-set at a given height. */
    GetValidatorSetByHeight(request: GetValidatorSetByHeightRequest): Promise<GetValidatorSetByHeightResponse>;
    /**
     * ABCIQuery defines a query handler that supports ABCI queries directly to the
     * application, bypassing Tendermint completely. The ABCI query must contain
     * a valid and supported path, including app, custom, p2p, and store.
     *
     * Since: cosmos-sdk 0.46
     */
    ABCIQuery(request: ABCIQueryRequest): Promise<ABCIQueryResponse>;
}
export declare const ServiceServiceName = "cosmos.base.tendermint.v1beta1.Service";
export declare class ServiceClientImpl implements Service {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    GetNodeInfo(request: GetNodeInfoRequest): Promise<GetNodeInfoResponse>;
    GetSyncing(request: GetSyncingRequest): Promise<GetSyncingResponse>;
    GetLatestBlock(request: GetLatestBlockRequest): Promise<GetLatestBlockResponse>;
    GetBlockByHeight(request: GetBlockByHeightRequest): Promise<GetBlockByHeightResponse>;
    GetLatestValidatorSet(request: GetLatestValidatorSetRequest): Promise<GetLatestValidatorSetResponse>;
    GetValidatorSetByHeight(request: GetValidatorSetByHeightRequest): Promise<GetValidatorSetByHeightResponse>;
    ABCIQuery(request: ABCIQueryRequest): Promise<ABCIQueryResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
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
