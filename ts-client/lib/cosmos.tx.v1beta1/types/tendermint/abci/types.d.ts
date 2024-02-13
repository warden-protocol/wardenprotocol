import _m0 from "protobufjs/minimal";
import { PublicKey } from "../crypto/keys";
import { ProofOps } from "../crypto/proof";
import { ConsensusParams } from "../types/params";
import { BlockIDFlag } from "../types/validator";
export declare const protobufPackage = "tendermint.abci";
export declare enum CheckTxType {
    NEW = 0,
    RECHECK = 1,
    UNRECOGNIZED = -1
}
export declare function checkTxTypeFromJSON(object: any): CheckTxType;
export declare function checkTxTypeToJSON(object: CheckTxType): string;
export declare enum MisbehaviorType {
    UNKNOWN = 0,
    DUPLICATE_VOTE = 1,
    LIGHT_CLIENT_ATTACK = 2,
    UNRECOGNIZED = -1
}
export declare function misbehaviorTypeFromJSON(object: any): MisbehaviorType;
export declare function misbehaviorTypeToJSON(object: MisbehaviorType): string;
export interface Request {
    echo?: RequestEcho | undefined;
    flush?: RequestFlush | undefined;
    info?: RequestInfo | undefined;
    initChain?: RequestInitChain | undefined;
    query?: RequestQuery | undefined;
    checkTx?: RequestCheckTx | undefined;
    commit?: RequestCommit | undefined;
    listSnapshots?: RequestListSnapshots | undefined;
    offerSnapshot?: RequestOfferSnapshot | undefined;
    loadSnapshotChunk?: RequestLoadSnapshotChunk | undefined;
    applySnapshotChunk?: RequestApplySnapshotChunk | undefined;
    prepareProposal?: RequestPrepareProposal | undefined;
    processProposal?: RequestProcessProposal | undefined;
    extendVote?: RequestExtendVote | undefined;
    verifyVoteExtension?: RequestVerifyVoteExtension | undefined;
    finalizeBlock?: RequestFinalizeBlock | undefined;
}
export interface RequestEcho {
    message: string;
}
export interface RequestFlush {
}
export interface RequestInfo {
    version: string;
    blockVersion: number;
    p2pVersion: number;
    abciVersion: string;
}
export interface RequestInitChain {
    time: Date | undefined;
    chainId: string;
    consensusParams: ConsensusParams | undefined;
    validators: ValidatorUpdate[];
    appStateBytes: Uint8Array;
    initialHeight: number;
}
export interface RequestQuery {
    data: Uint8Array;
    path: string;
    height: number;
    prove: boolean;
}
export interface RequestCheckTx {
    tx: Uint8Array;
    type: CheckTxType;
}
export interface RequestCommit {
}
/** lists available snapshots */
export interface RequestListSnapshots {
}
/** offers a snapshot to the application */
export interface RequestOfferSnapshot {
    /** snapshot offered by peers */
    snapshot: Snapshot | undefined;
    /** light client-verified app hash for snapshot height */
    appHash: Uint8Array;
}
/** loads a snapshot chunk */
export interface RequestLoadSnapshotChunk {
    height: number;
    format: number;
    chunk: number;
}
/** Applies a snapshot chunk */
export interface RequestApplySnapshotChunk {
    index: number;
    chunk: Uint8Array;
    sender: string;
}
export interface RequestPrepareProposal {
    /** the modified transactions cannot exceed this size. */
    maxTxBytes: number;
    /**
     * txs is an array of transactions that will be included in a block,
     * sent to the app for possible modifications.
     */
    txs: Uint8Array[];
    localLastCommit: ExtendedCommitInfo | undefined;
    misbehavior: Misbehavior[];
    height: number;
    time: Date | undefined;
    nextValidatorsHash: Uint8Array;
    /** address of the public key of the validator proposing the block. */
    proposerAddress: Uint8Array;
}
export interface RequestProcessProposal {
    txs: Uint8Array[];
    proposedLastCommit: CommitInfo | undefined;
    misbehavior: Misbehavior[];
    /** hash is the merkle root hash of the fields of the proposed block. */
    hash: Uint8Array;
    height: number;
    time: Date | undefined;
    nextValidatorsHash: Uint8Array;
    /** address of the public key of the original proposer of the block. */
    proposerAddress: Uint8Array;
}
/** Extends a vote with application-injected data */
export interface RequestExtendVote {
    /** the hash of the block that this vote may be referring to */
    hash: Uint8Array;
    /** the height of the extended vote */
    height: number;
    /** info of the block that this vote may be referring to */
    time: Date | undefined;
    txs: Uint8Array[];
    proposedLastCommit: CommitInfo | undefined;
    misbehavior: Misbehavior[];
    nextValidatorsHash: Uint8Array;
    /** address of the public key of the original proposer of the block. */
    proposerAddress: Uint8Array;
}
/** Verify the vote extension */
export interface RequestVerifyVoteExtension {
    /** the hash of the block that this received vote corresponds to */
    hash: Uint8Array;
    /** the validator that signed the vote extension */
    validatorAddress: Uint8Array;
    height: number;
    voteExtension: Uint8Array;
}
export interface RequestFinalizeBlock {
    txs: Uint8Array[];
    decidedLastCommit: CommitInfo | undefined;
    misbehavior: Misbehavior[];
    /** hash is the merkle root hash of the fields of the decided block. */
    hash: Uint8Array;
    height: number;
    time: Date | undefined;
    nextValidatorsHash: Uint8Array;
    /** proposer_address is the address of the public key of the original proposer of the block. */
    proposerAddress: Uint8Array;
}
export interface Response {
    exception?: ResponseException | undefined;
    echo?: ResponseEcho | undefined;
    flush?: ResponseFlush | undefined;
    info?: ResponseInfo | undefined;
    initChain?: ResponseInitChain | undefined;
    query?: ResponseQuery | undefined;
    checkTx?: ResponseCheckTx | undefined;
    commit?: ResponseCommit | undefined;
    listSnapshots?: ResponseListSnapshots | undefined;
    offerSnapshot?: ResponseOfferSnapshot | undefined;
    loadSnapshotChunk?: ResponseLoadSnapshotChunk | undefined;
    applySnapshotChunk?: ResponseApplySnapshotChunk | undefined;
    prepareProposal?: ResponsePrepareProposal | undefined;
    processProposal?: ResponseProcessProposal | undefined;
    extendVote?: ResponseExtendVote | undefined;
    verifyVoteExtension?: ResponseVerifyVoteExtension | undefined;
    finalizeBlock?: ResponseFinalizeBlock | undefined;
}
/** nondeterministic */
export interface ResponseException {
    error: string;
}
export interface ResponseEcho {
    message: string;
}
export interface ResponseFlush {
}
export interface ResponseInfo {
    data: string;
    version: string;
    appVersion: number;
    lastBlockHeight: number;
    lastBlockAppHash: Uint8Array;
}
export interface ResponseInitChain {
    consensusParams: ConsensusParams | undefined;
    validators: ValidatorUpdate[];
    appHash: Uint8Array;
}
export interface ResponseQuery {
    code: number;
    /** bytes data = 2; // use "value" instead. */
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
export interface ResponseCheckTx {
    code: number;
    data: Uint8Array;
    /** nondeterministic */
    log: string;
    /** nondeterministic */
    info: string;
    gasWanted: number;
    gasUsed: number;
    events: Event[];
    codespace: string;
}
export interface ResponseCommit {
    retainHeight: number;
}
export interface ResponseListSnapshots {
    snapshots: Snapshot[];
}
export interface ResponseOfferSnapshot {
    result: ResponseOfferSnapshot_Result;
}
export declare enum ResponseOfferSnapshot_Result {
    /** UNKNOWN - Unknown result, abort all snapshot restoration */
    UNKNOWN = 0,
    /** ACCEPT - Snapshot accepted, apply chunks */
    ACCEPT = 1,
    /** ABORT - Abort all snapshot restoration */
    ABORT = 2,
    /** REJECT - Reject this specific snapshot, try others */
    REJECT = 3,
    /** REJECT_FORMAT - Reject all snapshots of this format, try others */
    REJECT_FORMAT = 4,
    /** REJECT_SENDER - Reject all snapshots from the sender(s), try others */
    REJECT_SENDER = 5,
    UNRECOGNIZED = -1
}
export declare function responseOfferSnapshot_ResultFromJSON(object: any): ResponseOfferSnapshot_Result;
export declare function responseOfferSnapshot_ResultToJSON(object: ResponseOfferSnapshot_Result): string;
export interface ResponseLoadSnapshotChunk {
    chunk: Uint8Array;
}
export interface ResponseApplySnapshotChunk {
    result: ResponseApplySnapshotChunk_Result;
    /** Chunks to refetch and reapply */
    refetchChunks: number[];
    /** Chunk senders to reject and ban */
    rejectSenders: string[];
}
export declare enum ResponseApplySnapshotChunk_Result {
    /** UNKNOWN - Unknown result, abort all snapshot restoration */
    UNKNOWN = 0,
    /** ACCEPT - Chunk successfully accepted */
    ACCEPT = 1,
    /** ABORT - Abort all snapshot restoration */
    ABORT = 2,
    /** RETRY - Retry chunk (combine with refetch and reject) */
    RETRY = 3,
    /** RETRY_SNAPSHOT - Retry snapshot (combine with refetch and reject) */
    RETRY_SNAPSHOT = 4,
    /** REJECT_SNAPSHOT - Reject this snapshot, try others */
    REJECT_SNAPSHOT = 5,
    UNRECOGNIZED = -1
}
export declare function responseApplySnapshotChunk_ResultFromJSON(object: any): ResponseApplySnapshotChunk_Result;
export declare function responseApplySnapshotChunk_ResultToJSON(object: ResponseApplySnapshotChunk_Result): string;
export interface ResponsePrepareProposal {
    txs: Uint8Array[];
}
export interface ResponseProcessProposal {
    status: ResponseProcessProposal_ProposalStatus;
}
export declare enum ResponseProcessProposal_ProposalStatus {
    UNKNOWN = 0,
    ACCEPT = 1,
    REJECT = 2,
    UNRECOGNIZED = -1
}
export declare function responseProcessProposal_ProposalStatusFromJSON(object: any): ResponseProcessProposal_ProposalStatus;
export declare function responseProcessProposal_ProposalStatusToJSON(object: ResponseProcessProposal_ProposalStatus): string;
export interface ResponseExtendVote {
    voteExtension: Uint8Array;
}
export interface ResponseVerifyVoteExtension {
    status: ResponseVerifyVoteExtension_VerifyStatus;
}
export declare enum ResponseVerifyVoteExtension_VerifyStatus {
    UNKNOWN = 0,
    ACCEPT = 1,
    /**
     * REJECT - Rejecting the vote extension will reject the entire precommit by the sender.
     * Incorrectly implementing this thus has liveness implications as it may affect
     * CometBFT's ability to receive 2/3+ valid votes to finalize the block.
     * Honest nodes should never be rejected.
     */
    REJECT = 2,
    UNRECOGNIZED = -1
}
export declare function responseVerifyVoteExtension_VerifyStatusFromJSON(object: any): ResponseVerifyVoteExtension_VerifyStatus;
export declare function responseVerifyVoteExtension_VerifyStatusToJSON(object: ResponseVerifyVoteExtension_VerifyStatus): string;
export interface ResponseFinalizeBlock {
    /** set of block events emmitted as part of executing the block */
    events: Event[];
    /**
     * the result of executing each transaction including the events
     * the particular transction emitted. This should match the order
     * of the transactions delivered in the block itself
     */
    txResults: ExecTxResult[];
    /** a list of updates to the validator set. These will reflect the validator set at current height + 2. */
    validatorUpdates: ValidatorUpdate[];
    /** updates to the consensus params, if any. */
    consensusParamUpdates: ConsensusParams | undefined;
    /**
     * app_hash is the hash of the applications' state which is used to confirm that execution of the transactions was
     * deterministic. It is up to the application to decide which algorithm to use.
     */
    appHash: Uint8Array;
}
export interface CommitInfo {
    round: number;
    votes: VoteInfo[];
}
/**
 * ExtendedCommitInfo is similar to CommitInfo except that it is only used in
 * the PrepareProposal request such that CometBFT can provide vote extensions
 * to the application.
 */
export interface ExtendedCommitInfo {
    /** The round at which the block proposer decided in the previous height. */
    round: number;
    /**
     * List of validators' addresses in the last validator set with their voting
     * information, including vote extensions.
     */
    votes: ExtendedVoteInfo[];
}
/**
 * Event allows application developers to attach additional information to
 * ResponseFinalizeBlock and ResponseCheckTx.
 * Later, transactions may be queried using these events.
 */
export interface Event {
    type: string;
    attributes: EventAttribute[];
}
/** EventAttribute is a single key-value pair, associated with an event. */
export interface EventAttribute {
    key: string;
    value: string;
    /** nondeterministic */
    index: boolean;
}
/**
 * ExecTxResult contains results of executing one individual transaction.
 *
 * * Its structure is equivalent to #ResponseDeliverTx which will be deprecated/deleted
 */
export interface ExecTxResult {
    code: number;
    data: Uint8Array;
    /** nondeterministic */
    log: string;
    /** nondeterministic */
    info: string;
    gasWanted: number;
    gasUsed: number;
    /** nondeterministic */
    events: Event[];
    codespace: string;
}
/**
 * TxResult contains results of executing the transaction.
 *
 * One usage is indexing transaction results.
 */
export interface TxResult {
    height: number;
    index: number;
    tx: Uint8Array;
    result: ExecTxResult | undefined;
}
export interface Validator {
    /** The first 20 bytes of SHA256(public key) */
    address: Uint8Array;
    /** PubKey pub_key = 2 [(gogoproto.nullable)=false]; */
    power: number;
}
export interface ValidatorUpdate {
    pubKey: PublicKey | undefined;
    power: number;
}
export interface VoteInfo {
    validator: Validator | undefined;
    blockIdFlag: BlockIDFlag;
}
export interface ExtendedVoteInfo {
    /** The validator that sent the vote. */
    validator: Validator | undefined;
    /** Non-deterministic extension provided by the sending validator's application. */
    voteExtension: Uint8Array;
    /** Vote extension signature created by CometBFT */
    extensionSignature: Uint8Array;
    /** block_id_flag indicates whether the validator voted for a block, nil, or did not vote at all */
    blockIdFlag: BlockIDFlag;
}
export interface Misbehavior {
    type: MisbehaviorType;
    /** The offending validator */
    validator: Validator | undefined;
    /** The height when the offense occurred */
    height: number;
    /** The corresponding time where the offense occurred */
    time: Date | undefined;
    /**
     * Total voting power of the validator set in case the ABCI application does
     * not store historical validators.
     * https://github.com/tendermint/tendermint/issues/4581
     */
    totalVotingPower: number;
}
export interface Snapshot {
    /** The height at which the snapshot was taken */
    height: number;
    /** The application-specific snapshot format */
    format: number;
    /** Number of chunks in the snapshot */
    chunks: number;
    /** Arbitrary snapshot hash, equal only if identical */
    hash: Uint8Array;
    /** Arbitrary application metadata */
    metadata: Uint8Array;
}
export declare const Request: {
    encode(message: Request, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Request;
    fromJSON(object: any): Request;
    toJSON(message: Request): unknown;
    create<I extends {
        echo?: {
            message?: string;
        };
        flush?: {};
        info?: {
            version?: string;
            blockVersion?: number;
            p2pVersion?: number;
            abciVersion?: string;
        };
        initChain?: {
            time?: Date | undefined;
            chainId?: string;
            consensusParams?: {
                block?: {
                    maxBytes?: number;
                    maxGas?: number;
                };
                evidence?: {
                    maxAgeNumBlocks?: number;
                    maxAgeDuration?: {
                        seconds?: number;
                        nanos?: number;
                    };
                    maxBytes?: number;
                };
                validator?: {
                    pubKeyTypes?: string[];
                };
                version?: {
                    app?: number;
                };
                abci?: {
                    voteExtensionsEnableHeight?: number;
                };
            };
            validators?: {
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                };
                power?: number;
            }[];
            appStateBytes?: Uint8Array;
            initialHeight?: number;
        };
        query?: {
            data?: Uint8Array;
            path?: string;
            height?: number;
            prove?: boolean;
        };
        checkTx?: {
            tx?: Uint8Array;
            type?: CheckTxType;
        };
        commit?: {};
        listSnapshots?: {};
        offerSnapshot?: {
            snapshot?: {
                height?: number;
                format?: number;
                chunks?: number;
                hash?: Uint8Array;
                metadata?: Uint8Array;
            };
            appHash?: Uint8Array;
        };
        loadSnapshotChunk?: {
            height?: number;
            format?: number;
            chunk?: number;
        };
        applySnapshotChunk?: {
            index?: number;
            chunk?: Uint8Array;
            sender?: string;
        };
        prepareProposal?: {
            maxTxBytes?: number;
            txs?: Uint8Array[];
            localLastCommit?: {
                round?: number;
                votes?: {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    voteExtension?: Uint8Array;
                    extensionSignature?: Uint8Array;
                    blockIdFlag?: BlockIDFlag;
                }[];
            };
            misbehavior?: {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            }[];
            height?: number;
            time?: Date | undefined;
            nextValidatorsHash?: Uint8Array;
            proposerAddress?: Uint8Array;
        };
        processProposal?: {
            txs?: Uint8Array[];
            proposedLastCommit?: {
                round?: number;
                votes?: {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                }[];
            };
            misbehavior?: {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            }[];
            hash?: Uint8Array;
            height?: number;
            time?: Date | undefined;
            nextValidatorsHash?: Uint8Array;
            proposerAddress?: Uint8Array;
        };
        extendVote?: {
            hash?: Uint8Array;
            height?: number;
            time?: Date | undefined;
            txs?: Uint8Array[];
            proposedLastCommit?: {
                round?: number;
                votes?: {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                }[];
            };
            misbehavior?: {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            }[];
            nextValidatorsHash?: Uint8Array;
            proposerAddress?: Uint8Array;
        };
        verifyVoteExtension?: {
            hash?: Uint8Array;
            validatorAddress?: Uint8Array;
            height?: number;
            voteExtension?: Uint8Array;
        };
        finalizeBlock?: {
            txs?: Uint8Array[];
            decidedLastCommit?: {
                round?: number;
                votes?: {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                }[];
            };
            misbehavior?: {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            }[];
            hash?: Uint8Array;
            height?: number;
            time?: Date | undefined;
            nextValidatorsHash?: Uint8Array;
            proposerAddress?: Uint8Array;
        };
    } & {
        echo?: {
            message?: string;
        } & {
            message?: string;
        } & { [K in Exclude<keyof I["echo"], "message">]: never; };
        flush?: {} & {} & { [K_1 in Exclude<keyof I["flush"], never>]: never; };
        info?: {
            version?: string;
            blockVersion?: number;
            p2pVersion?: number;
            abciVersion?: string;
        } & {
            version?: string;
            blockVersion?: number;
            p2pVersion?: number;
            abciVersion?: string;
        } & { [K_2 in Exclude<keyof I["info"], keyof RequestInfo>]: never; };
        initChain?: {
            time?: Date | undefined;
            chainId?: string;
            consensusParams?: {
                block?: {
                    maxBytes?: number;
                    maxGas?: number;
                };
                evidence?: {
                    maxAgeNumBlocks?: number;
                    maxAgeDuration?: {
                        seconds?: number;
                        nanos?: number;
                    };
                    maxBytes?: number;
                };
                validator?: {
                    pubKeyTypes?: string[];
                };
                version?: {
                    app?: number;
                };
                abci?: {
                    voteExtensionsEnableHeight?: number;
                };
            };
            validators?: {
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                };
                power?: number;
            }[];
            appStateBytes?: Uint8Array;
            initialHeight?: number;
        } & {
            time?: Date | undefined;
            chainId?: string;
            consensusParams?: {
                block?: {
                    maxBytes?: number;
                    maxGas?: number;
                };
                evidence?: {
                    maxAgeNumBlocks?: number;
                    maxAgeDuration?: {
                        seconds?: number;
                        nanos?: number;
                    };
                    maxBytes?: number;
                };
                validator?: {
                    pubKeyTypes?: string[];
                };
                version?: {
                    app?: number;
                };
                abci?: {
                    voteExtensionsEnableHeight?: number;
                };
            } & {
                block?: {
                    maxBytes?: number;
                    maxGas?: number;
                } & {
                    maxBytes?: number;
                    maxGas?: number;
                } & { [K_3 in Exclude<keyof I["initChain"]["consensusParams"]["block"], keyof import("../types/params").BlockParams>]: never; };
                evidence?: {
                    maxAgeNumBlocks?: number;
                    maxAgeDuration?: {
                        seconds?: number;
                        nanos?: number;
                    };
                    maxBytes?: number;
                } & {
                    maxAgeNumBlocks?: number;
                    maxAgeDuration?: {
                        seconds?: number;
                        nanos?: number;
                    } & {
                        seconds?: number;
                        nanos?: number;
                    } & { [K_4 in Exclude<keyof I["initChain"]["consensusParams"]["evidence"]["maxAgeDuration"], keyof import("../../google/protobuf/duration").Duration>]: never; };
                    maxBytes?: number;
                } & { [K_5 in Exclude<keyof I["initChain"]["consensusParams"]["evidence"], keyof import("../types/params").EvidenceParams>]: never; };
                validator?: {
                    pubKeyTypes?: string[];
                } & {
                    pubKeyTypes?: string[] & string[] & { [K_6 in Exclude<keyof I["initChain"]["consensusParams"]["validator"]["pubKeyTypes"], keyof string[]>]: never; };
                } & { [K_7 in Exclude<keyof I["initChain"]["consensusParams"]["validator"], "pubKeyTypes">]: never; };
                version?: {
                    app?: number;
                } & {
                    app?: number;
                } & { [K_8 in Exclude<keyof I["initChain"]["consensusParams"]["version"], "app">]: never; };
                abci?: {
                    voteExtensionsEnableHeight?: number;
                } & {
                    voteExtensionsEnableHeight?: number;
                } & { [K_9 in Exclude<keyof I["initChain"]["consensusParams"]["abci"], "voteExtensionsEnableHeight">]: never; };
            } & { [K_10 in Exclude<keyof I["initChain"]["consensusParams"], keyof ConsensusParams>]: never; };
            validators?: {
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                };
                power?: number;
            }[] & ({
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                };
                power?: number;
            } & {
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                } & {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                } & { [K_11 in Exclude<keyof I["initChain"]["validators"][number]["pubKey"], keyof PublicKey>]: never; };
                power?: number;
            } & { [K_12 in Exclude<keyof I["initChain"]["validators"][number], keyof ValidatorUpdate>]: never; })[] & { [K_13 in Exclude<keyof I["initChain"]["validators"], keyof {
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                };
                power?: number;
            }[]>]: never; };
            appStateBytes?: Uint8Array;
            initialHeight?: number;
        } & { [K_14 in Exclude<keyof I["initChain"], keyof RequestInitChain>]: never; };
        query?: {
            data?: Uint8Array;
            path?: string;
            height?: number;
            prove?: boolean;
        } & {
            data?: Uint8Array;
            path?: string;
            height?: number;
            prove?: boolean;
        } & { [K_15 in Exclude<keyof I["query"], keyof RequestQuery>]: never; };
        checkTx?: {
            tx?: Uint8Array;
            type?: CheckTxType;
        } & {
            tx?: Uint8Array;
            type?: CheckTxType;
        } & { [K_16 in Exclude<keyof I["checkTx"], keyof RequestCheckTx>]: never; };
        commit?: {} & {} & { [K_17 in Exclude<keyof I["commit"], never>]: never; };
        listSnapshots?: {} & {} & { [K_18 in Exclude<keyof I["listSnapshots"], never>]: never; };
        offerSnapshot?: {
            snapshot?: {
                height?: number;
                format?: number;
                chunks?: number;
                hash?: Uint8Array;
                metadata?: Uint8Array;
            };
            appHash?: Uint8Array;
        } & {
            snapshot?: {
                height?: number;
                format?: number;
                chunks?: number;
                hash?: Uint8Array;
                metadata?: Uint8Array;
            } & {
                height?: number;
                format?: number;
                chunks?: number;
                hash?: Uint8Array;
                metadata?: Uint8Array;
            } & { [K_19 in Exclude<keyof I["offerSnapshot"]["snapshot"], keyof Snapshot>]: never; };
            appHash?: Uint8Array;
        } & { [K_20 in Exclude<keyof I["offerSnapshot"], keyof RequestOfferSnapshot>]: never; };
        loadSnapshotChunk?: {
            height?: number;
            format?: number;
            chunk?: number;
        } & {
            height?: number;
            format?: number;
            chunk?: number;
        } & { [K_21 in Exclude<keyof I["loadSnapshotChunk"], keyof RequestLoadSnapshotChunk>]: never; };
        applySnapshotChunk?: {
            index?: number;
            chunk?: Uint8Array;
            sender?: string;
        } & {
            index?: number;
            chunk?: Uint8Array;
            sender?: string;
        } & { [K_22 in Exclude<keyof I["applySnapshotChunk"], keyof RequestApplySnapshotChunk>]: never; };
        prepareProposal?: {
            maxTxBytes?: number;
            txs?: Uint8Array[];
            localLastCommit?: {
                round?: number;
                votes?: {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    voteExtension?: Uint8Array;
                    extensionSignature?: Uint8Array;
                    blockIdFlag?: BlockIDFlag;
                }[];
            };
            misbehavior?: {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            }[];
            height?: number;
            time?: Date | undefined;
            nextValidatorsHash?: Uint8Array;
            proposerAddress?: Uint8Array;
        } & {
            maxTxBytes?: number;
            txs?: Uint8Array[] & Uint8Array[] & { [K_23 in Exclude<keyof I["prepareProposal"]["txs"], keyof Uint8Array[]>]: never; };
            localLastCommit?: {
                round?: number;
                votes?: {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    voteExtension?: Uint8Array;
                    extensionSignature?: Uint8Array;
                    blockIdFlag?: BlockIDFlag;
                }[];
            } & {
                round?: number;
                votes?: {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    voteExtension?: Uint8Array;
                    extensionSignature?: Uint8Array;
                    blockIdFlag?: BlockIDFlag;
                }[] & ({
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    voteExtension?: Uint8Array;
                    extensionSignature?: Uint8Array;
                    blockIdFlag?: BlockIDFlag;
                } & {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    } & {
                        address?: Uint8Array;
                        power?: number;
                    } & { [K_24 in Exclude<keyof I["prepareProposal"]["localLastCommit"]["votes"][number]["validator"], keyof Validator>]: never; };
                    voteExtension?: Uint8Array;
                    extensionSignature?: Uint8Array;
                    blockIdFlag?: BlockIDFlag;
                } & { [K_25 in Exclude<keyof I["prepareProposal"]["localLastCommit"]["votes"][number], keyof ExtendedVoteInfo>]: never; })[] & { [K_26 in Exclude<keyof I["prepareProposal"]["localLastCommit"]["votes"], keyof {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    voteExtension?: Uint8Array;
                    extensionSignature?: Uint8Array;
                    blockIdFlag?: BlockIDFlag;
                }[]>]: never; };
            } & { [K_27 in Exclude<keyof I["prepareProposal"]["localLastCommit"], keyof ExtendedCommitInfo>]: never; };
            misbehavior?: {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            }[] & ({
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            } & {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                } & {
                    address?: Uint8Array;
                    power?: number;
                } & { [K_28 in Exclude<keyof I["prepareProposal"]["misbehavior"][number]["validator"], keyof Validator>]: never; };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            } & { [K_29 in Exclude<keyof I["prepareProposal"]["misbehavior"][number], keyof Misbehavior>]: never; })[] & { [K_30 in Exclude<keyof I["prepareProposal"]["misbehavior"], keyof {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            }[]>]: never; };
            height?: number;
            time?: Date | undefined;
            nextValidatorsHash?: Uint8Array;
            proposerAddress?: Uint8Array;
        } & { [K_31 in Exclude<keyof I["prepareProposal"], keyof RequestPrepareProposal>]: never; };
        processProposal?: {
            txs?: Uint8Array[];
            proposedLastCommit?: {
                round?: number;
                votes?: {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                }[];
            };
            misbehavior?: {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            }[];
            hash?: Uint8Array;
            height?: number;
            time?: Date | undefined;
            nextValidatorsHash?: Uint8Array;
            proposerAddress?: Uint8Array;
        } & {
            txs?: Uint8Array[] & Uint8Array[] & { [K_32 in Exclude<keyof I["processProposal"]["txs"], keyof Uint8Array[]>]: never; };
            proposedLastCommit?: {
                round?: number;
                votes?: {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                }[];
            } & {
                round?: number;
                votes?: {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                }[] & ({
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                } & {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    } & {
                        address?: Uint8Array;
                        power?: number;
                    } & { [K_33 in Exclude<keyof I["processProposal"]["proposedLastCommit"]["votes"][number]["validator"], keyof Validator>]: never; };
                    blockIdFlag?: BlockIDFlag;
                } & { [K_34 in Exclude<keyof I["processProposal"]["proposedLastCommit"]["votes"][number], keyof VoteInfo>]: never; })[] & { [K_35 in Exclude<keyof I["processProposal"]["proposedLastCommit"]["votes"], keyof {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                }[]>]: never; };
            } & { [K_36 in Exclude<keyof I["processProposal"]["proposedLastCommit"], keyof CommitInfo>]: never; };
            misbehavior?: {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            }[] & ({
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            } & {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                } & {
                    address?: Uint8Array;
                    power?: number;
                } & { [K_37 in Exclude<keyof I["processProposal"]["misbehavior"][number]["validator"], keyof Validator>]: never; };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            } & { [K_38 in Exclude<keyof I["processProposal"]["misbehavior"][number], keyof Misbehavior>]: never; })[] & { [K_39 in Exclude<keyof I["processProposal"]["misbehavior"], keyof {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            }[]>]: never; };
            hash?: Uint8Array;
            height?: number;
            time?: Date | undefined;
            nextValidatorsHash?: Uint8Array;
            proposerAddress?: Uint8Array;
        } & { [K_40 in Exclude<keyof I["processProposal"], keyof RequestProcessProposal>]: never; };
        extendVote?: {
            hash?: Uint8Array;
            height?: number;
            time?: Date | undefined;
            txs?: Uint8Array[];
            proposedLastCommit?: {
                round?: number;
                votes?: {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                }[];
            };
            misbehavior?: {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            }[];
            nextValidatorsHash?: Uint8Array;
            proposerAddress?: Uint8Array;
        } & {
            hash?: Uint8Array;
            height?: number;
            time?: Date | undefined;
            txs?: Uint8Array[] & Uint8Array[] & { [K_41 in Exclude<keyof I["extendVote"]["txs"], keyof Uint8Array[]>]: never; };
            proposedLastCommit?: {
                round?: number;
                votes?: {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                }[];
            } & {
                round?: number;
                votes?: {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                }[] & ({
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                } & {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    } & {
                        address?: Uint8Array;
                        power?: number;
                    } & { [K_42 in Exclude<keyof I["extendVote"]["proposedLastCommit"]["votes"][number]["validator"], keyof Validator>]: never; };
                    blockIdFlag?: BlockIDFlag;
                } & { [K_43 in Exclude<keyof I["extendVote"]["proposedLastCommit"]["votes"][number], keyof VoteInfo>]: never; })[] & { [K_44 in Exclude<keyof I["extendVote"]["proposedLastCommit"]["votes"], keyof {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                }[]>]: never; };
            } & { [K_45 in Exclude<keyof I["extendVote"]["proposedLastCommit"], keyof CommitInfo>]: never; };
            misbehavior?: {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            }[] & ({
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            } & {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                } & {
                    address?: Uint8Array;
                    power?: number;
                } & { [K_46 in Exclude<keyof I["extendVote"]["misbehavior"][number]["validator"], keyof Validator>]: never; };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            } & { [K_47 in Exclude<keyof I["extendVote"]["misbehavior"][number], keyof Misbehavior>]: never; })[] & { [K_48 in Exclude<keyof I["extendVote"]["misbehavior"], keyof {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            }[]>]: never; };
            nextValidatorsHash?: Uint8Array;
            proposerAddress?: Uint8Array;
        } & { [K_49 in Exclude<keyof I["extendVote"], keyof RequestExtendVote>]: never; };
        verifyVoteExtension?: {
            hash?: Uint8Array;
            validatorAddress?: Uint8Array;
            height?: number;
            voteExtension?: Uint8Array;
        } & {
            hash?: Uint8Array;
            validatorAddress?: Uint8Array;
            height?: number;
            voteExtension?: Uint8Array;
        } & { [K_50 in Exclude<keyof I["verifyVoteExtension"], keyof RequestVerifyVoteExtension>]: never; };
        finalizeBlock?: {
            txs?: Uint8Array[];
            decidedLastCommit?: {
                round?: number;
                votes?: {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                }[];
            };
            misbehavior?: {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            }[];
            hash?: Uint8Array;
            height?: number;
            time?: Date | undefined;
            nextValidatorsHash?: Uint8Array;
            proposerAddress?: Uint8Array;
        } & {
            txs?: Uint8Array[] & Uint8Array[] & { [K_51 in Exclude<keyof I["finalizeBlock"]["txs"], keyof Uint8Array[]>]: never; };
            decidedLastCommit?: {
                round?: number;
                votes?: {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                }[];
            } & {
                round?: number;
                votes?: {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                }[] & ({
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                } & {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    } & {
                        address?: Uint8Array;
                        power?: number;
                    } & { [K_52 in Exclude<keyof I["finalizeBlock"]["decidedLastCommit"]["votes"][number]["validator"], keyof Validator>]: never; };
                    blockIdFlag?: BlockIDFlag;
                } & { [K_53 in Exclude<keyof I["finalizeBlock"]["decidedLastCommit"]["votes"][number], keyof VoteInfo>]: never; })[] & { [K_54 in Exclude<keyof I["finalizeBlock"]["decidedLastCommit"]["votes"], keyof {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                }[]>]: never; };
            } & { [K_55 in Exclude<keyof I["finalizeBlock"]["decidedLastCommit"], keyof CommitInfo>]: never; };
            misbehavior?: {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            }[] & ({
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            } & {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                } & {
                    address?: Uint8Array;
                    power?: number;
                } & { [K_56 in Exclude<keyof I["finalizeBlock"]["misbehavior"][number]["validator"], keyof Validator>]: never; };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            } & { [K_57 in Exclude<keyof I["finalizeBlock"]["misbehavior"][number], keyof Misbehavior>]: never; })[] & { [K_58 in Exclude<keyof I["finalizeBlock"]["misbehavior"], keyof {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            }[]>]: never; };
            hash?: Uint8Array;
            height?: number;
            time?: Date | undefined;
            nextValidatorsHash?: Uint8Array;
            proposerAddress?: Uint8Array;
        } & { [K_59 in Exclude<keyof I["finalizeBlock"], keyof RequestFinalizeBlock>]: never; };
    } & { [K_60 in Exclude<keyof I, keyof Request>]: never; }>(base?: I): Request;
    fromPartial<I_1 extends {
        echo?: {
            message?: string;
        };
        flush?: {};
        info?: {
            version?: string;
            blockVersion?: number;
            p2pVersion?: number;
            abciVersion?: string;
        };
        initChain?: {
            time?: Date | undefined;
            chainId?: string;
            consensusParams?: {
                block?: {
                    maxBytes?: number;
                    maxGas?: number;
                };
                evidence?: {
                    maxAgeNumBlocks?: number;
                    maxAgeDuration?: {
                        seconds?: number;
                        nanos?: number;
                    };
                    maxBytes?: number;
                };
                validator?: {
                    pubKeyTypes?: string[];
                };
                version?: {
                    app?: number;
                };
                abci?: {
                    voteExtensionsEnableHeight?: number;
                };
            };
            validators?: {
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                };
                power?: number;
            }[];
            appStateBytes?: Uint8Array;
            initialHeight?: number;
        };
        query?: {
            data?: Uint8Array;
            path?: string;
            height?: number;
            prove?: boolean;
        };
        checkTx?: {
            tx?: Uint8Array;
            type?: CheckTxType;
        };
        commit?: {};
        listSnapshots?: {};
        offerSnapshot?: {
            snapshot?: {
                height?: number;
                format?: number;
                chunks?: number;
                hash?: Uint8Array;
                metadata?: Uint8Array;
            };
            appHash?: Uint8Array;
        };
        loadSnapshotChunk?: {
            height?: number;
            format?: number;
            chunk?: number;
        };
        applySnapshotChunk?: {
            index?: number;
            chunk?: Uint8Array;
            sender?: string;
        };
        prepareProposal?: {
            maxTxBytes?: number;
            txs?: Uint8Array[];
            localLastCommit?: {
                round?: number;
                votes?: {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    voteExtension?: Uint8Array;
                    extensionSignature?: Uint8Array;
                    blockIdFlag?: BlockIDFlag;
                }[];
            };
            misbehavior?: {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            }[];
            height?: number;
            time?: Date | undefined;
            nextValidatorsHash?: Uint8Array;
            proposerAddress?: Uint8Array;
        };
        processProposal?: {
            txs?: Uint8Array[];
            proposedLastCommit?: {
                round?: number;
                votes?: {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                }[];
            };
            misbehavior?: {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            }[];
            hash?: Uint8Array;
            height?: number;
            time?: Date | undefined;
            nextValidatorsHash?: Uint8Array;
            proposerAddress?: Uint8Array;
        };
        extendVote?: {
            hash?: Uint8Array;
            height?: number;
            time?: Date | undefined;
            txs?: Uint8Array[];
            proposedLastCommit?: {
                round?: number;
                votes?: {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                }[];
            };
            misbehavior?: {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            }[];
            nextValidatorsHash?: Uint8Array;
            proposerAddress?: Uint8Array;
        };
        verifyVoteExtension?: {
            hash?: Uint8Array;
            validatorAddress?: Uint8Array;
            height?: number;
            voteExtension?: Uint8Array;
        };
        finalizeBlock?: {
            txs?: Uint8Array[];
            decidedLastCommit?: {
                round?: number;
                votes?: {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                }[];
            };
            misbehavior?: {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            }[];
            hash?: Uint8Array;
            height?: number;
            time?: Date | undefined;
            nextValidatorsHash?: Uint8Array;
            proposerAddress?: Uint8Array;
        };
    } & {
        echo?: {
            message?: string;
        } & {
            message?: string;
        } & { [K_61 in Exclude<keyof I_1["echo"], "message">]: never; };
        flush?: {} & {} & { [K_62 in Exclude<keyof I_1["flush"], never>]: never; };
        info?: {
            version?: string;
            blockVersion?: number;
            p2pVersion?: number;
            abciVersion?: string;
        } & {
            version?: string;
            blockVersion?: number;
            p2pVersion?: number;
            abciVersion?: string;
        } & { [K_63 in Exclude<keyof I_1["info"], keyof RequestInfo>]: never; };
        initChain?: {
            time?: Date | undefined;
            chainId?: string;
            consensusParams?: {
                block?: {
                    maxBytes?: number;
                    maxGas?: number;
                };
                evidence?: {
                    maxAgeNumBlocks?: number;
                    maxAgeDuration?: {
                        seconds?: number;
                        nanos?: number;
                    };
                    maxBytes?: number;
                };
                validator?: {
                    pubKeyTypes?: string[];
                };
                version?: {
                    app?: number;
                };
                abci?: {
                    voteExtensionsEnableHeight?: number;
                };
            };
            validators?: {
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                };
                power?: number;
            }[];
            appStateBytes?: Uint8Array;
            initialHeight?: number;
        } & {
            time?: Date | undefined;
            chainId?: string;
            consensusParams?: {
                block?: {
                    maxBytes?: number;
                    maxGas?: number;
                };
                evidence?: {
                    maxAgeNumBlocks?: number;
                    maxAgeDuration?: {
                        seconds?: number;
                        nanos?: number;
                    };
                    maxBytes?: number;
                };
                validator?: {
                    pubKeyTypes?: string[];
                };
                version?: {
                    app?: number;
                };
                abci?: {
                    voteExtensionsEnableHeight?: number;
                };
            } & {
                block?: {
                    maxBytes?: number;
                    maxGas?: number;
                } & {
                    maxBytes?: number;
                    maxGas?: number;
                } & { [K_64 in Exclude<keyof I_1["initChain"]["consensusParams"]["block"], keyof import("../types/params").BlockParams>]: never; };
                evidence?: {
                    maxAgeNumBlocks?: number;
                    maxAgeDuration?: {
                        seconds?: number;
                        nanos?: number;
                    };
                    maxBytes?: number;
                } & {
                    maxAgeNumBlocks?: number;
                    maxAgeDuration?: {
                        seconds?: number;
                        nanos?: number;
                    } & {
                        seconds?: number;
                        nanos?: number;
                    } & { [K_65 in Exclude<keyof I_1["initChain"]["consensusParams"]["evidence"]["maxAgeDuration"], keyof import("../../google/protobuf/duration").Duration>]: never; };
                    maxBytes?: number;
                } & { [K_66 in Exclude<keyof I_1["initChain"]["consensusParams"]["evidence"], keyof import("../types/params").EvidenceParams>]: never; };
                validator?: {
                    pubKeyTypes?: string[];
                } & {
                    pubKeyTypes?: string[] & string[] & { [K_67 in Exclude<keyof I_1["initChain"]["consensusParams"]["validator"]["pubKeyTypes"], keyof string[]>]: never; };
                } & { [K_68 in Exclude<keyof I_1["initChain"]["consensusParams"]["validator"], "pubKeyTypes">]: never; };
                version?: {
                    app?: number;
                } & {
                    app?: number;
                } & { [K_69 in Exclude<keyof I_1["initChain"]["consensusParams"]["version"], "app">]: never; };
                abci?: {
                    voteExtensionsEnableHeight?: number;
                } & {
                    voteExtensionsEnableHeight?: number;
                } & { [K_70 in Exclude<keyof I_1["initChain"]["consensusParams"]["abci"], "voteExtensionsEnableHeight">]: never; };
            } & { [K_71 in Exclude<keyof I_1["initChain"]["consensusParams"], keyof ConsensusParams>]: never; };
            validators?: {
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                };
                power?: number;
            }[] & ({
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                };
                power?: number;
            } & {
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                } & {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                } & { [K_72 in Exclude<keyof I_1["initChain"]["validators"][number]["pubKey"], keyof PublicKey>]: never; };
                power?: number;
            } & { [K_73 in Exclude<keyof I_1["initChain"]["validators"][number], keyof ValidatorUpdate>]: never; })[] & { [K_74 in Exclude<keyof I_1["initChain"]["validators"], keyof {
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                };
                power?: number;
            }[]>]: never; };
            appStateBytes?: Uint8Array;
            initialHeight?: number;
        } & { [K_75 in Exclude<keyof I_1["initChain"], keyof RequestInitChain>]: never; };
        query?: {
            data?: Uint8Array;
            path?: string;
            height?: number;
            prove?: boolean;
        } & {
            data?: Uint8Array;
            path?: string;
            height?: number;
            prove?: boolean;
        } & { [K_76 in Exclude<keyof I_1["query"], keyof RequestQuery>]: never; };
        checkTx?: {
            tx?: Uint8Array;
            type?: CheckTxType;
        } & {
            tx?: Uint8Array;
            type?: CheckTxType;
        } & { [K_77 in Exclude<keyof I_1["checkTx"], keyof RequestCheckTx>]: never; };
        commit?: {} & {} & { [K_78 in Exclude<keyof I_1["commit"], never>]: never; };
        listSnapshots?: {} & {} & { [K_79 in Exclude<keyof I_1["listSnapshots"], never>]: never; };
        offerSnapshot?: {
            snapshot?: {
                height?: number;
                format?: number;
                chunks?: number;
                hash?: Uint8Array;
                metadata?: Uint8Array;
            };
            appHash?: Uint8Array;
        } & {
            snapshot?: {
                height?: number;
                format?: number;
                chunks?: number;
                hash?: Uint8Array;
                metadata?: Uint8Array;
            } & {
                height?: number;
                format?: number;
                chunks?: number;
                hash?: Uint8Array;
                metadata?: Uint8Array;
            } & { [K_80 in Exclude<keyof I_1["offerSnapshot"]["snapshot"], keyof Snapshot>]: never; };
            appHash?: Uint8Array;
        } & { [K_81 in Exclude<keyof I_1["offerSnapshot"], keyof RequestOfferSnapshot>]: never; };
        loadSnapshotChunk?: {
            height?: number;
            format?: number;
            chunk?: number;
        } & {
            height?: number;
            format?: number;
            chunk?: number;
        } & { [K_82 in Exclude<keyof I_1["loadSnapshotChunk"], keyof RequestLoadSnapshotChunk>]: never; };
        applySnapshotChunk?: {
            index?: number;
            chunk?: Uint8Array;
            sender?: string;
        } & {
            index?: number;
            chunk?: Uint8Array;
            sender?: string;
        } & { [K_83 in Exclude<keyof I_1["applySnapshotChunk"], keyof RequestApplySnapshotChunk>]: never; };
        prepareProposal?: {
            maxTxBytes?: number;
            txs?: Uint8Array[];
            localLastCommit?: {
                round?: number;
                votes?: {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    voteExtension?: Uint8Array;
                    extensionSignature?: Uint8Array;
                    blockIdFlag?: BlockIDFlag;
                }[];
            };
            misbehavior?: {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            }[];
            height?: number;
            time?: Date | undefined;
            nextValidatorsHash?: Uint8Array;
            proposerAddress?: Uint8Array;
        } & {
            maxTxBytes?: number;
            txs?: Uint8Array[] & Uint8Array[] & { [K_84 in Exclude<keyof I_1["prepareProposal"]["txs"], keyof Uint8Array[]>]: never; };
            localLastCommit?: {
                round?: number;
                votes?: {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    voteExtension?: Uint8Array;
                    extensionSignature?: Uint8Array;
                    blockIdFlag?: BlockIDFlag;
                }[];
            } & {
                round?: number;
                votes?: {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    voteExtension?: Uint8Array;
                    extensionSignature?: Uint8Array;
                    blockIdFlag?: BlockIDFlag;
                }[] & ({
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    voteExtension?: Uint8Array;
                    extensionSignature?: Uint8Array;
                    blockIdFlag?: BlockIDFlag;
                } & {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    } & {
                        address?: Uint8Array;
                        power?: number;
                    } & { [K_85 in Exclude<keyof I_1["prepareProposal"]["localLastCommit"]["votes"][number]["validator"], keyof Validator>]: never; };
                    voteExtension?: Uint8Array;
                    extensionSignature?: Uint8Array;
                    blockIdFlag?: BlockIDFlag;
                } & { [K_86 in Exclude<keyof I_1["prepareProposal"]["localLastCommit"]["votes"][number], keyof ExtendedVoteInfo>]: never; })[] & { [K_87 in Exclude<keyof I_1["prepareProposal"]["localLastCommit"]["votes"], keyof {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    voteExtension?: Uint8Array;
                    extensionSignature?: Uint8Array;
                    blockIdFlag?: BlockIDFlag;
                }[]>]: never; };
            } & { [K_88 in Exclude<keyof I_1["prepareProposal"]["localLastCommit"], keyof ExtendedCommitInfo>]: never; };
            misbehavior?: {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            }[] & ({
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            } & {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                } & {
                    address?: Uint8Array;
                    power?: number;
                } & { [K_89 in Exclude<keyof I_1["prepareProposal"]["misbehavior"][number]["validator"], keyof Validator>]: never; };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            } & { [K_90 in Exclude<keyof I_1["prepareProposal"]["misbehavior"][number], keyof Misbehavior>]: never; })[] & { [K_91 in Exclude<keyof I_1["prepareProposal"]["misbehavior"], keyof {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            }[]>]: never; };
            height?: number;
            time?: Date | undefined;
            nextValidatorsHash?: Uint8Array;
            proposerAddress?: Uint8Array;
        } & { [K_92 in Exclude<keyof I_1["prepareProposal"], keyof RequestPrepareProposal>]: never; };
        processProposal?: {
            txs?: Uint8Array[];
            proposedLastCommit?: {
                round?: number;
                votes?: {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                }[];
            };
            misbehavior?: {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            }[];
            hash?: Uint8Array;
            height?: number;
            time?: Date | undefined;
            nextValidatorsHash?: Uint8Array;
            proposerAddress?: Uint8Array;
        } & {
            txs?: Uint8Array[] & Uint8Array[] & { [K_93 in Exclude<keyof I_1["processProposal"]["txs"], keyof Uint8Array[]>]: never; };
            proposedLastCommit?: {
                round?: number;
                votes?: {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                }[];
            } & {
                round?: number;
                votes?: {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                }[] & ({
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                } & {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    } & {
                        address?: Uint8Array;
                        power?: number;
                    } & { [K_94 in Exclude<keyof I_1["processProposal"]["proposedLastCommit"]["votes"][number]["validator"], keyof Validator>]: never; };
                    blockIdFlag?: BlockIDFlag;
                } & { [K_95 in Exclude<keyof I_1["processProposal"]["proposedLastCommit"]["votes"][number], keyof VoteInfo>]: never; })[] & { [K_96 in Exclude<keyof I_1["processProposal"]["proposedLastCommit"]["votes"], keyof {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                }[]>]: never; };
            } & { [K_97 in Exclude<keyof I_1["processProposal"]["proposedLastCommit"], keyof CommitInfo>]: never; };
            misbehavior?: {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            }[] & ({
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            } & {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                } & {
                    address?: Uint8Array;
                    power?: number;
                } & { [K_98 in Exclude<keyof I_1["processProposal"]["misbehavior"][number]["validator"], keyof Validator>]: never; };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            } & { [K_99 in Exclude<keyof I_1["processProposal"]["misbehavior"][number], keyof Misbehavior>]: never; })[] & { [K_100 in Exclude<keyof I_1["processProposal"]["misbehavior"], keyof {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            }[]>]: never; };
            hash?: Uint8Array;
            height?: number;
            time?: Date | undefined;
            nextValidatorsHash?: Uint8Array;
            proposerAddress?: Uint8Array;
        } & { [K_101 in Exclude<keyof I_1["processProposal"], keyof RequestProcessProposal>]: never; };
        extendVote?: {
            hash?: Uint8Array;
            height?: number;
            time?: Date | undefined;
            txs?: Uint8Array[];
            proposedLastCommit?: {
                round?: number;
                votes?: {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                }[];
            };
            misbehavior?: {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            }[];
            nextValidatorsHash?: Uint8Array;
            proposerAddress?: Uint8Array;
        } & {
            hash?: Uint8Array;
            height?: number;
            time?: Date | undefined;
            txs?: Uint8Array[] & Uint8Array[] & { [K_102 in Exclude<keyof I_1["extendVote"]["txs"], keyof Uint8Array[]>]: never; };
            proposedLastCommit?: {
                round?: number;
                votes?: {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                }[];
            } & {
                round?: number;
                votes?: {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                }[] & ({
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                } & {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    } & {
                        address?: Uint8Array;
                        power?: number;
                    } & { [K_103 in Exclude<keyof I_1["extendVote"]["proposedLastCommit"]["votes"][number]["validator"], keyof Validator>]: never; };
                    blockIdFlag?: BlockIDFlag;
                } & { [K_104 in Exclude<keyof I_1["extendVote"]["proposedLastCommit"]["votes"][number], keyof VoteInfo>]: never; })[] & { [K_105 in Exclude<keyof I_1["extendVote"]["proposedLastCommit"]["votes"], keyof {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                }[]>]: never; };
            } & { [K_106 in Exclude<keyof I_1["extendVote"]["proposedLastCommit"], keyof CommitInfo>]: never; };
            misbehavior?: {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            }[] & ({
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            } & {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                } & {
                    address?: Uint8Array;
                    power?: number;
                } & { [K_107 in Exclude<keyof I_1["extendVote"]["misbehavior"][number]["validator"], keyof Validator>]: never; };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            } & { [K_108 in Exclude<keyof I_1["extendVote"]["misbehavior"][number], keyof Misbehavior>]: never; })[] & { [K_109 in Exclude<keyof I_1["extendVote"]["misbehavior"], keyof {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            }[]>]: never; };
            nextValidatorsHash?: Uint8Array;
            proposerAddress?: Uint8Array;
        } & { [K_110 in Exclude<keyof I_1["extendVote"], keyof RequestExtendVote>]: never; };
        verifyVoteExtension?: {
            hash?: Uint8Array;
            validatorAddress?: Uint8Array;
            height?: number;
            voteExtension?: Uint8Array;
        } & {
            hash?: Uint8Array;
            validatorAddress?: Uint8Array;
            height?: number;
            voteExtension?: Uint8Array;
        } & { [K_111 in Exclude<keyof I_1["verifyVoteExtension"], keyof RequestVerifyVoteExtension>]: never; };
        finalizeBlock?: {
            txs?: Uint8Array[];
            decidedLastCommit?: {
                round?: number;
                votes?: {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                }[];
            };
            misbehavior?: {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            }[];
            hash?: Uint8Array;
            height?: number;
            time?: Date | undefined;
            nextValidatorsHash?: Uint8Array;
            proposerAddress?: Uint8Array;
        } & {
            txs?: Uint8Array[] & Uint8Array[] & { [K_112 in Exclude<keyof I_1["finalizeBlock"]["txs"], keyof Uint8Array[]>]: never; };
            decidedLastCommit?: {
                round?: number;
                votes?: {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                }[];
            } & {
                round?: number;
                votes?: {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                }[] & ({
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                } & {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    } & {
                        address?: Uint8Array;
                        power?: number;
                    } & { [K_113 in Exclude<keyof I_1["finalizeBlock"]["decidedLastCommit"]["votes"][number]["validator"], keyof Validator>]: never; };
                    blockIdFlag?: BlockIDFlag;
                } & { [K_114 in Exclude<keyof I_1["finalizeBlock"]["decidedLastCommit"]["votes"][number], keyof VoteInfo>]: never; })[] & { [K_115 in Exclude<keyof I_1["finalizeBlock"]["decidedLastCommit"]["votes"], keyof {
                    validator?: {
                        address?: Uint8Array;
                        power?: number;
                    };
                    blockIdFlag?: BlockIDFlag;
                }[]>]: never; };
            } & { [K_116 in Exclude<keyof I_1["finalizeBlock"]["decidedLastCommit"], keyof CommitInfo>]: never; };
            misbehavior?: {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            }[] & ({
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            } & {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                } & {
                    address?: Uint8Array;
                    power?: number;
                } & { [K_117 in Exclude<keyof I_1["finalizeBlock"]["misbehavior"][number]["validator"], keyof Validator>]: never; };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            } & { [K_118 in Exclude<keyof I_1["finalizeBlock"]["misbehavior"][number], keyof Misbehavior>]: never; })[] & { [K_119 in Exclude<keyof I_1["finalizeBlock"]["misbehavior"], keyof {
                type?: MisbehaviorType;
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                height?: number;
                time?: Date | undefined;
                totalVotingPower?: number;
            }[]>]: never; };
            hash?: Uint8Array;
            height?: number;
            time?: Date | undefined;
            nextValidatorsHash?: Uint8Array;
            proposerAddress?: Uint8Array;
        } & { [K_120 in Exclude<keyof I_1["finalizeBlock"], keyof RequestFinalizeBlock>]: never; };
    } & { [K_121 in Exclude<keyof I_1, keyof Request>]: never; }>(object: I_1): Request;
};
export declare const RequestEcho: {
    encode(message: RequestEcho, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RequestEcho;
    fromJSON(object: any): RequestEcho;
    toJSON(message: RequestEcho): unknown;
    create<I extends {
        message?: string;
    } & {
        message?: string;
    } & { [K in Exclude<keyof I, "message">]: never; }>(base?: I): RequestEcho;
    fromPartial<I_1 extends {
        message?: string;
    } & {
        message?: string;
    } & { [K_1 in Exclude<keyof I_1, "message">]: never; }>(object: I_1): RequestEcho;
};
export declare const RequestFlush: {
    encode(_: RequestFlush, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RequestFlush;
    fromJSON(_: any): RequestFlush;
    toJSON(_: RequestFlush): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): RequestFlush;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): RequestFlush;
};
export declare const RequestInfo: {
    encode(message: RequestInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RequestInfo;
    fromJSON(object: any): RequestInfo;
    toJSON(message: RequestInfo): unknown;
    create<I extends {
        version?: string;
        blockVersion?: number;
        p2pVersion?: number;
        abciVersion?: string;
    } & {
        version?: string;
        blockVersion?: number;
        p2pVersion?: number;
        abciVersion?: string;
    } & { [K in Exclude<keyof I, keyof RequestInfo>]: never; }>(base?: I): RequestInfo;
    fromPartial<I_1 extends {
        version?: string;
        blockVersion?: number;
        p2pVersion?: number;
        abciVersion?: string;
    } & {
        version?: string;
        blockVersion?: number;
        p2pVersion?: number;
        abciVersion?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof RequestInfo>]: never; }>(object: I_1): RequestInfo;
};
export declare const RequestInitChain: {
    encode(message: RequestInitChain, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RequestInitChain;
    fromJSON(object: any): RequestInitChain;
    toJSON(message: RequestInitChain): unknown;
    create<I extends {
        time?: Date | undefined;
        chainId?: string;
        consensusParams?: {
            block?: {
                maxBytes?: number;
                maxGas?: number;
            };
            evidence?: {
                maxAgeNumBlocks?: number;
                maxAgeDuration?: {
                    seconds?: number;
                    nanos?: number;
                };
                maxBytes?: number;
            };
            validator?: {
                pubKeyTypes?: string[];
            };
            version?: {
                app?: number;
            };
            abci?: {
                voteExtensionsEnableHeight?: number;
            };
        };
        validators?: {
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            };
            power?: number;
        }[];
        appStateBytes?: Uint8Array;
        initialHeight?: number;
    } & {
        time?: Date | undefined;
        chainId?: string;
        consensusParams?: {
            block?: {
                maxBytes?: number;
                maxGas?: number;
            };
            evidence?: {
                maxAgeNumBlocks?: number;
                maxAgeDuration?: {
                    seconds?: number;
                    nanos?: number;
                };
                maxBytes?: number;
            };
            validator?: {
                pubKeyTypes?: string[];
            };
            version?: {
                app?: number;
            };
            abci?: {
                voteExtensionsEnableHeight?: number;
            };
        } & {
            block?: {
                maxBytes?: number;
                maxGas?: number;
            } & {
                maxBytes?: number;
                maxGas?: number;
            } & { [K in Exclude<keyof I["consensusParams"]["block"], keyof import("../types/params").BlockParams>]: never; };
            evidence?: {
                maxAgeNumBlocks?: number;
                maxAgeDuration?: {
                    seconds?: number;
                    nanos?: number;
                };
                maxBytes?: number;
            } & {
                maxAgeNumBlocks?: number;
                maxAgeDuration?: {
                    seconds?: number;
                    nanos?: number;
                } & {
                    seconds?: number;
                    nanos?: number;
                } & { [K_1 in Exclude<keyof I["consensusParams"]["evidence"]["maxAgeDuration"], keyof import("../../google/protobuf/duration").Duration>]: never; };
                maxBytes?: number;
            } & { [K_2 in Exclude<keyof I["consensusParams"]["evidence"], keyof import("../types/params").EvidenceParams>]: never; };
            validator?: {
                pubKeyTypes?: string[];
            } & {
                pubKeyTypes?: string[] & string[] & { [K_3 in Exclude<keyof I["consensusParams"]["validator"]["pubKeyTypes"], keyof string[]>]: never; };
            } & { [K_4 in Exclude<keyof I["consensusParams"]["validator"], "pubKeyTypes">]: never; };
            version?: {
                app?: number;
            } & {
                app?: number;
            } & { [K_5 in Exclude<keyof I["consensusParams"]["version"], "app">]: never; };
            abci?: {
                voteExtensionsEnableHeight?: number;
            } & {
                voteExtensionsEnableHeight?: number;
            } & { [K_6 in Exclude<keyof I["consensusParams"]["abci"], "voteExtensionsEnableHeight">]: never; };
        } & { [K_7 in Exclude<keyof I["consensusParams"], keyof ConsensusParams>]: never; };
        validators?: {
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            };
            power?: number;
        }[] & ({
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            };
            power?: number;
        } & {
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            } & {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            } & { [K_8 in Exclude<keyof I["validators"][number]["pubKey"], keyof PublicKey>]: never; };
            power?: number;
        } & { [K_9 in Exclude<keyof I["validators"][number], keyof ValidatorUpdate>]: never; })[] & { [K_10 in Exclude<keyof I["validators"], keyof {
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            };
            power?: number;
        }[]>]: never; };
        appStateBytes?: Uint8Array;
        initialHeight?: number;
    } & { [K_11 in Exclude<keyof I, keyof RequestInitChain>]: never; }>(base?: I): RequestInitChain;
    fromPartial<I_1 extends {
        time?: Date | undefined;
        chainId?: string;
        consensusParams?: {
            block?: {
                maxBytes?: number;
                maxGas?: number;
            };
            evidence?: {
                maxAgeNumBlocks?: number;
                maxAgeDuration?: {
                    seconds?: number;
                    nanos?: number;
                };
                maxBytes?: number;
            };
            validator?: {
                pubKeyTypes?: string[];
            };
            version?: {
                app?: number;
            };
            abci?: {
                voteExtensionsEnableHeight?: number;
            };
        };
        validators?: {
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            };
            power?: number;
        }[];
        appStateBytes?: Uint8Array;
        initialHeight?: number;
    } & {
        time?: Date | undefined;
        chainId?: string;
        consensusParams?: {
            block?: {
                maxBytes?: number;
                maxGas?: number;
            };
            evidence?: {
                maxAgeNumBlocks?: number;
                maxAgeDuration?: {
                    seconds?: number;
                    nanos?: number;
                };
                maxBytes?: number;
            };
            validator?: {
                pubKeyTypes?: string[];
            };
            version?: {
                app?: number;
            };
            abci?: {
                voteExtensionsEnableHeight?: number;
            };
        } & {
            block?: {
                maxBytes?: number;
                maxGas?: number;
            } & {
                maxBytes?: number;
                maxGas?: number;
            } & { [K_12 in Exclude<keyof I_1["consensusParams"]["block"], keyof import("../types/params").BlockParams>]: never; };
            evidence?: {
                maxAgeNumBlocks?: number;
                maxAgeDuration?: {
                    seconds?: number;
                    nanos?: number;
                };
                maxBytes?: number;
            } & {
                maxAgeNumBlocks?: number;
                maxAgeDuration?: {
                    seconds?: number;
                    nanos?: number;
                } & {
                    seconds?: number;
                    nanos?: number;
                } & { [K_13 in Exclude<keyof I_1["consensusParams"]["evidence"]["maxAgeDuration"], keyof import("../../google/protobuf/duration").Duration>]: never; };
                maxBytes?: number;
            } & { [K_14 in Exclude<keyof I_1["consensusParams"]["evidence"], keyof import("../types/params").EvidenceParams>]: never; };
            validator?: {
                pubKeyTypes?: string[];
            } & {
                pubKeyTypes?: string[] & string[] & { [K_15 in Exclude<keyof I_1["consensusParams"]["validator"]["pubKeyTypes"], keyof string[]>]: never; };
            } & { [K_16 in Exclude<keyof I_1["consensusParams"]["validator"], "pubKeyTypes">]: never; };
            version?: {
                app?: number;
            } & {
                app?: number;
            } & { [K_17 in Exclude<keyof I_1["consensusParams"]["version"], "app">]: never; };
            abci?: {
                voteExtensionsEnableHeight?: number;
            } & {
                voteExtensionsEnableHeight?: number;
            } & { [K_18 in Exclude<keyof I_1["consensusParams"]["abci"], "voteExtensionsEnableHeight">]: never; };
        } & { [K_19 in Exclude<keyof I_1["consensusParams"], keyof ConsensusParams>]: never; };
        validators?: {
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            };
            power?: number;
        }[] & ({
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            };
            power?: number;
        } & {
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            } & {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            } & { [K_20 in Exclude<keyof I_1["validators"][number]["pubKey"], keyof PublicKey>]: never; };
            power?: number;
        } & { [K_21 in Exclude<keyof I_1["validators"][number], keyof ValidatorUpdate>]: never; })[] & { [K_22 in Exclude<keyof I_1["validators"], keyof {
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            };
            power?: number;
        }[]>]: never; };
        appStateBytes?: Uint8Array;
        initialHeight?: number;
    } & { [K_23 in Exclude<keyof I_1, keyof RequestInitChain>]: never; }>(object: I_1): RequestInitChain;
};
export declare const RequestQuery: {
    encode(message: RequestQuery, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RequestQuery;
    fromJSON(object: any): RequestQuery;
    toJSON(message: RequestQuery): unknown;
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
    } & { [K in Exclude<keyof I, keyof RequestQuery>]: never; }>(base?: I): RequestQuery;
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
    } & { [K_1 in Exclude<keyof I_1, keyof RequestQuery>]: never; }>(object: I_1): RequestQuery;
};
export declare const RequestCheckTx: {
    encode(message: RequestCheckTx, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RequestCheckTx;
    fromJSON(object: any): RequestCheckTx;
    toJSON(message: RequestCheckTx): unknown;
    create<I extends {
        tx?: Uint8Array;
        type?: CheckTxType;
    } & {
        tx?: Uint8Array;
        type?: CheckTxType;
    } & { [K in Exclude<keyof I, keyof RequestCheckTx>]: never; }>(base?: I): RequestCheckTx;
    fromPartial<I_1 extends {
        tx?: Uint8Array;
        type?: CheckTxType;
    } & {
        tx?: Uint8Array;
        type?: CheckTxType;
    } & { [K_1 in Exclude<keyof I_1, keyof RequestCheckTx>]: never; }>(object: I_1): RequestCheckTx;
};
export declare const RequestCommit: {
    encode(_: RequestCommit, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RequestCommit;
    fromJSON(_: any): RequestCommit;
    toJSON(_: RequestCommit): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): RequestCommit;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): RequestCommit;
};
export declare const RequestListSnapshots: {
    encode(_: RequestListSnapshots, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RequestListSnapshots;
    fromJSON(_: any): RequestListSnapshots;
    toJSON(_: RequestListSnapshots): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): RequestListSnapshots;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): RequestListSnapshots;
};
export declare const RequestOfferSnapshot: {
    encode(message: RequestOfferSnapshot, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RequestOfferSnapshot;
    fromJSON(object: any): RequestOfferSnapshot;
    toJSON(message: RequestOfferSnapshot): unknown;
    create<I extends {
        snapshot?: {
            height?: number;
            format?: number;
            chunks?: number;
            hash?: Uint8Array;
            metadata?: Uint8Array;
        };
        appHash?: Uint8Array;
    } & {
        snapshot?: {
            height?: number;
            format?: number;
            chunks?: number;
            hash?: Uint8Array;
            metadata?: Uint8Array;
        } & {
            height?: number;
            format?: number;
            chunks?: number;
            hash?: Uint8Array;
            metadata?: Uint8Array;
        } & { [K in Exclude<keyof I["snapshot"], keyof Snapshot>]: never; };
        appHash?: Uint8Array;
    } & { [K_1 in Exclude<keyof I, keyof RequestOfferSnapshot>]: never; }>(base?: I): RequestOfferSnapshot;
    fromPartial<I_1 extends {
        snapshot?: {
            height?: number;
            format?: number;
            chunks?: number;
            hash?: Uint8Array;
            metadata?: Uint8Array;
        };
        appHash?: Uint8Array;
    } & {
        snapshot?: {
            height?: number;
            format?: number;
            chunks?: number;
            hash?: Uint8Array;
            metadata?: Uint8Array;
        } & {
            height?: number;
            format?: number;
            chunks?: number;
            hash?: Uint8Array;
            metadata?: Uint8Array;
        } & { [K_2 in Exclude<keyof I_1["snapshot"], keyof Snapshot>]: never; };
        appHash?: Uint8Array;
    } & { [K_3 in Exclude<keyof I_1, keyof RequestOfferSnapshot>]: never; }>(object: I_1): RequestOfferSnapshot;
};
export declare const RequestLoadSnapshotChunk: {
    encode(message: RequestLoadSnapshotChunk, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RequestLoadSnapshotChunk;
    fromJSON(object: any): RequestLoadSnapshotChunk;
    toJSON(message: RequestLoadSnapshotChunk): unknown;
    create<I extends {
        height?: number;
        format?: number;
        chunk?: number;
    } & {
        height?: number;
        format?: number;
        chunk?: number;
    } & { [K in Exclude<keyof I, keyof RequestLoadSnapshotChunk>]: never; }>(base?: I): RequestLoadSnapshotChunk;
    fromPartial<I_1 extends {
        height?: number;
        format?: number;
        chunk?: number;
    } & {
        height?: number;
        format?: number;
        chunk?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof RequestLoadSnapshotChunk>]: never; }>(object: I_1): RequestLoadSnapshotChunk;
};
export declare const RequestApplySnapshotChunk: {
    encode(message: RequestApplySnapshotChunk, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RequestApplySnapshotChunk;
    fromJSON(object: any): RequestApplySnapshotChunk;
    toJSON(message: RequestApplySnapshotChunk): unknown;
    create<I extends {
        index?: number;
        chunk?: Uint8Array;
        sender?: string;
    } & {
        index?: number;
        chunk?: Uint8Array;
        sender?: string;
    } & { [K in Exclude<keyof I, keyof RequestApplySnapshotChunk>]: never; }>(base?: I): RequestApplySnapshotChunk;
    fromPartial<I_1 extends {
        index?: number;
        chunk?: Uint8Array;
        sender?: string;
    } & {
        index?: number;
        chunk?: Uint8Array;
        sender?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof RequestApplySnapshotChunk>]: never; }>(object: I_1): RequestApplySnapshotChunk;
};
export declare const RequestPrepareProposal: {
    encode(message: RequestPrepareProposal, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RequestPrepareProposal;
    fromJSON(object: any): RequestPrepareProposal;
    toJSON(message: RequestPrepareProposal): unknown;
    create<I extends {
        maxTxBytes?: number;
        txs?: Uint8Array[];
        localLastCommit?: {
            round?: number;
            votes?: {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                voteExtension?: Uint8Array;
                extensionSignature?: Uint8Array;
                blockIdFlag?: BlockIDFlag;
            }[];
        };
        misbehavior?: {
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        }[];
        height?: number;
        time?: Date | undefined;
        nextValidatorsHash?: Uint8Array;
        proposerAddress?: Uint8Array;
    } & {
        maxTxBytes?: number;
        txs?: Uint8Array[] & Uint8Array[] & { [K in Exclude<keyof I["txs"], keyof Uint8Array[]>]: never; };
        localLastCommit?: {
            round?: number;
            votes?: {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                voteExtension?: Uint8Array;
                extensionSignature?: Uint8Array;
                blockIdFlag?: BlockIDFlag;
            }[];
        } & {
            round?: number;
            votes?: {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                voteExtension?: Uint8Array;
                extensionSignature?: Uint8Array;
                blockIdFlag?: BlockIDFlag;
            }[] & ({
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                voteExtension?: Uint8Array;
                extensionSignature?: Uint8Array;
                blockIdFlag?: BlockIDFlag;
            } & {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                } & {
                    address?: Uint8Array;
                    power?: number;
                } & { [K_1 in Exclude<keyof I["localLastCommit"]["votes"][number]["validator"], keyof Validator>]: never; };
                voteExtension?: Uint8Array;
                extensionSignature?: Uint8Array;
                blockIdFlag?: BlockIDFlag;
            } & { [K_2 in Exclude<keyof I["localLastCommit"]["votes"][number], keyof ExtendedVoteInfo>]: never; })[] & { [K_3 in Exclude<keyof I["localLastCommit"]["votes"], keyof {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                voteExtension?: Uint8Array;
                extensionSignature?: Uint8Array;
                blockIdFlag?: BlockIDFlag;
            }[]>]: never; };
        } & { [K_4 in Exclude<keyof I["localLastCommit"], keyof ExtendedCommitInfo>]: never; };
        misbehavior?: {
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        }[] & ({
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        } & {
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            } & {
                address?: Uint8Array;
                power?: number;
            } & { [K_5 in Exclude<keyof I["misbehavior"][number]["validator"], keyof Validator>]: never; };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        } & { [K_6 in Exclude<keyof I["misbehavior"][number], keyof Misbehavior>]: never; })[] & { [K_7 in Exclude<keyof I["misbehavior"], keyof {
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        }[]>]: never; };
        height?: number;
        time?: Date | undefined;
        nextValidatorsHash?: Uint8Array;
        proposerAddress?: Uint8Array;
    } & { [K_8 in Exclude<keyof I, keyof RequestPrepareProposal>]: never; }>(base?: I): RequestPrepareProposal;
    fromPartial<I_1 extends {
        maxTxBytes?: number;
        txs?: Uint8Array[];
        localLastCommit?: {
            round?: number;
            votes?: {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                voteExtension?: Uint8Array;
                extensionSignature?: Uint8Array;
                blockIdFlag?: BlockIDFlag;
            }[];
        };
        misbehavior?: {
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        }[];
        height?: number;
        time?: Date | undefined;
        nextValidatorsHash?: Uint8Array;
        proposerAddress?: Uint8Array;
    } & {
        maxTxBytes?: number;
        txs?: Uint8Array[] & Uint8Array[] & { [K_9 in Exclude<keyof I_1["txs"], keyof Uint8Array[]>]: never; };
        localLastCommit?: {
            round?: number;
            votes?: {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                voteExtension?: Uint8Array;
                extensionSignature?: Uint8Array;
                blockIdFlag?: BlockIDFlag;
            }[];
        } & {
            round?: number;
            votes?: {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                voteExtension?: Uint8Array;
                extensionSignature?: Uint8Array;
                blockIdFlag?: BlockIDFlag;
            }[] & ({
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                voteExtension?: Uint8Array;
                extensionSignature?: Uint8Array;
                blockIdFlag?: BlockIDFlag;
            } & {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                } & {
                    address?: Uint8Array;
                    power?: number;
                } & { [K_10 in Exclude<keyof I_1["localLastCommit"]["votes"][number]["validator"], keyof Validator>]: never; };
                voteExtension?: Uint8Array;
                extensionSignature?: Uint8Array;
                blockIdFlag?: BlockIDFlag;
            } & { [K_11 in Exclude<keyof I_1["localLastCommit"]["votes"][number], keyof ExtendedVoteInfo>]: never; })[] & { [K_12 in Exclude<keyof I_1["localLastCommit"]["votes"], keyof {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                voteExtension?: Uint8Array;
                extensionSignature?: Uint8Array;
                blockIdFlag?: BlockIDFlag;
            }[]>]: never; };
        } & { [K_13 in Exclude<keyof I_1["localLastCommit"], keyof ExtendedCommitInfo>]: never; };
        misbehavior?: {
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        }[] & ({
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        } & {
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            } & {
                address?: Uint8Array;
                power?: number;
            } & { [K_14 in Exclude<keyof I_1["misbehavior"][number]["validator"], keyof Validator>]: never; };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        } & { [K_15 in Exclude<keyof I_1["misbehavior"][number], keyof Misbehavior>]: never; })[] & { [K_16 in Exclude<keyof I_1["misbehavior"], keyof {
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        }[]>]: never; };
        height?: number;
        time?: Date | undefined;
        nextValidatorsHash?: Uint8Array;
        proposerAddress?: Uint8Array;
    } & { [K_17 in Exclude<keyof I_1, keyof RequestPrepareProposal>]: never; }>(object: I_1): RequestPrepareProposal;
};
export declare const RequestProcessProposal: {
    encode(message: RequestProcessProposal, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RequestProcessProposal;
    fromJSON(object: any): RequestProcessProposal;
    toJSON(message: RequestProcessProposal): unknown;
    create<I extends {
        txs?: Uint8Array[];
        proposedLastCommit?: {
            round?: number;
            votes?: {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                blockIdFlag?: BlockIDFlag;
            }[];
        };
        misbehavior?: {
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        }[];
        hash?: Uint8Array;
        height?: number;
        time?: Date | undefined;
        nextValidatorsHash?: Uint8Array;
        proposerAddress?: Uint8Array;
    } & {
        txs?: Uint8Array[] & Uint8Array[] & { [K in Exclude<keyof I["txs"], keyof Uint8Array[]>]: never; };
        proposedLastCommit?: {
            round?: number;
            votes?: {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                blockIdFlag?: BlockIDFlag;
            }[];
        } & {
            round?: number;
            votes?: {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                blockIdFlag?: BlockIDFlag;
            }[] & ({
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                blockIdFlag?: BlockIDFlag;
            } & {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                } & {
                    address?: Uint8Array;
                    power?: number;
                } & { [K_1 in Exclude<keyof I["proposedLastCommit"]["votes"][number]["validator"], keyof Validator>]: never; };
                blockIdFlag?: BlockIDFlag;
            } & { [K_2 in Exclude<keyof I["proposedLastCommit"]["votes"][number], keyof VoteInfo>]: never; })[] & { [K_3 in Exclude<keyof I["proposedLastCommit"]["votes"], keyof {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                blockIdFlag?: BlockIDFlag;
            }[]>]: never; };
        } & { [K_4 in Exclude<keyof I["proposedLastCommit"], keyof CommitInfo>]: never; };
        misbehavior?: {
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        }[] & ({
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        } & {
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            } & {
                address?: Uint8Array;
                power?: number;
            } & { [K_5 in Exclude<keyof I["misbehavior"][number]["validator"], keyof Validator>]: never; };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        } & { [K_6 in Exclude<keyof I["misbehavior"][number], keyof Misbehavior>]: never; })[] & { [K_7 in Exclude<keyof I["misbehavior"], keyof {
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        }[]>]: never; };
        hash?: Uint8Array;
        height?: number;
        time?: Date | undefined;
        nextValidatorsHash?: Uint8Array;
        proposerAddress?: Uint8Array;
    } & { [K_8 in Exclude<keyof I, keyof RequestProcessProposal>]: never; }>(base?: I): RequestProcessProposal;
    fromPartial<I_1 extends {
        txs?: Uint8Array[];
        proposedLastCommit?: {
            round?: number;
            votes?: {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                blockIdFlag?: BlockIDFlag;
            }[];
        };
        misbehavior?: {
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        }[];
        hash?: Uint8Array;
        height?: number;
        time?: Date | undefined;
        nextValidatorsHash?: Uint8Array;
        proposerAddress?: Uint8Array;
    } & {
        txs?: Uint8Array[] & Uint8Array[] & { [K_9 in Exclude<keyof I_1["txs"], keyof Uint8Array[]>]: never; };
        proposedLastCommit?: {
            round?: number;
            votes?: {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                blockIdFlag?: BlockIDFlag;
            }[];
        } & {
            round?: number;
            votes?: {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                blockIdFlag?: BlockIDFlag;
            }[] & ({
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                blockIdFlag?: BlockIDFlag;
            } & {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                } & {
                    address?: Uint8Array;
                    power?: number;
                } & { [K_10 in Exclude<keyof I_1["proposedLastCommit"]["votes"][number]["validator"], keyof Validator>]: never; };
                blockIdFlag?: BlockIDFlag;
            } & { [K_11 in Exclude<keyof I_1["proposedLastCommit"]["votes"][number], keyof VoteInfo>]: never; })[] & { [K_12 in Exclude<keyof I_1["proposedLastCommit"]["votes"], keyof {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                blockIdFlag?: BlockIDFlag;
            }[]>]: never; };
        } & { [K_13 in Exclude<keyof I_1["proposedLastCommit"], keyof CommitInfo>]: never; };
        misbehavior?: {
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        }[] & ({
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        } & {
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            } & {
                address?: Uint8Array;
                power?: number;
            } & { [K_14 in Exclude<keyof I_1["misbehavior"][number]["validator"], keyof Validator>]: never; };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        } & { [K_15 in Exclude<keyof I_1["misbehavior"][number], keyof Misbehavior>]: never; })[] & { [K_16 in Exclude<keyof I_1["misbehavior"], keyof {
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        }[]>]: never; };
        hash?: Uint8Array;
        height?: number;
        time?: Date | undefined;
        nextValidatorsHash?: Uint8Array;
        proposerAddress?: Uint8Array;
    } & { [K_17 in Exclude<keyof I_1, keyof RequestProcessProposal>]: never; }>(object: I_1): RequestProcessProposal;
};
export declare const RequestExtendVote: {
    encode(message: RequestExtendVote, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RequestExtendVote;
    fromJSON(object: any): RequestExtendVote;
    toJSON(message: RequestExtendVote): unknown;
    create<I extends {
        hash?: Uint8Array;
        height?: number;
        time?: Date | undefined;
        txs?: Uint8Array[];
        proposedLastCommit?: {
            round?: number;
            votes?: {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                blockIdFlag?: BlockIDFlag;
            }[];
        };
        misbehavior?: {
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        }[];
        nextValidatorsHash?: Uint8Array;
        proposerAddress?: Uint8Array;
    } & {
        hash?: Uint8Array;
        height?: number;
        time?: Date | undefined;
        txs?: Uint8Array[] & Uint8Array[] & { [K in Exclude<keyof I["txs"], keyof Uint8Array[]>]: never; };
        proposedLastCommit?: {
            round?: number;
            votes?: {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                blockIdFlag?: BlockIDFlag;
            }[];
        } & {
            round?: number;
            votes?: {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                blockIdFlag?: BlockIDFlag;
            }[] & ({
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                blockIdFlag?: BlockIDFlag;
            } & {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                } & {
                    address?: Uint8Array;
                    power?: number;
                } & { [K_1 in Exclude<keyof I["proposedLastCommit"]["votes"][number]["validator"], keyof Validator>]: never; };
                blockIdFlag?: BlockIDFlag;
            } & { [K_2 in Exclude<keyof I["proposedLastCommit"]["votes"][number], keyof VoteInfo>]: never; })[] & { [K_3 in Exclude<keyof I["proposedLastCommit"]["votes"], keyof {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                blockIdFlag?: BlockIDFlag;
            }[]>]: never; };
        } & { [K_4 in Exclude<keyof I["proposedLastCommit"], keyof CommitInfo>]: never; };
        misbehavior?: {
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        }[] & ({
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        } & {
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            } & {
                address?: Uint8Array;
                power?: number;
            } & { [K_5 in Exclude<keyof I["misbehavior"][number]["validator"], keyof Validator>]: never; };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        } & { [K_6 in Exclude<keyof I["misbehavior"][number], keyof Misbehavior>]: never; })[] & { [K_7 in Exclude<keyof I["misbehavior"], keyof {
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        }[]>]: never; };
        nextValidatorsHash?: Uint8Array;
        proposerAddress?: Uint8Array;
    } & { [K_8 in Exclude<keyof I, keyof RequestExtendVote>]: never; }>(base?: I): RequestExtendVote;
    fromPartial<I_1 extends {
        hash?: Uint8Array;
        height?: number;
        time?: Date | undefined;
        txs?: Uint8Array[];
        proposedLastCommit?: {
            round?: number;
            votes?: {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                blockIdFlag?: BlockIDFlag;
            }[];
        };
        misbehavior?: {
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        }[];
        nextValidatorsHash?: Uint8Array;
        proposerAddress?: Uint8Array;
    } & {
        hash?: Uint8Array;
        height?: number;
        time?: Date | undefined;
        txs?: Uint8Array[] & Uint8Array[] & { [K_9 in Exclude<keyof I_1["txs"], keyof Uint8Array[]>]: never; };
        proposedLastCommit?: {
            round?: number;
            votes?: {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                blockIdFlag?: BlockIDFlag;
            }[];
        } & {
            round?: number;
            votes?: {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                blockIdFlag?: BlockIDFlag;
            }[] & ({
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                blockIdFlag?: BlockIDFlag;
            } & {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                } & {
                    address?: Uint8Array;
                    power?: number;
                } & { [K_10 in Exclude<keyof I_1["proposedLastCommit"]["votes"][number]["validator"], keyof Validator>]: never; };
                blockIdFlag?: BlockIDFlag;
            } & { [K_11 in Exclude<keyof I_1["proposedLastCommit"]["votes"][number], keyof VoteInfo>]: never; })[] & { [K_12 in Exclude<keyof I_1["proposedLastCommit"]["votes"], keyof {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                blockIdFlag?: BlockIDFlag;
            }[]>]: never; };
        } & { [K_13 in Exclude<keyof I_1["proposedLastCommit"], keyof CommitInfo>]: never; };
        misbehavior?: {
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        }[] & ({
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        } & {
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            } & {
                address?: Uint8Array;
                power?: number;
            } & { [K_14 in Exclude<keyof I_1["misbehavior"][number]["validator"], keyof Validator>]: never; };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        } & { [K_15 in Exclude<keyof I_1["misbehavior"][number], keyof Misbehavior>]: never; })[] & { [K_16 in Exclude<keyof I_1["misbehavior"], keyof {
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        }[]>]: never; };
        nextValidatorsHash?: Uint8Array;
        proposerAddress?: Uint8Array;
    } & { [K_17 in Exclude<keyof I_1, keyof RequestExtendVote>]: never; }>(object: I_1): RequestExtendVote;
};
export declare const RequestVerifyVoteExtension: {
    encode(message: RequestVerifyVoteExtension, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RequestVerifyVoteExtension;
    fromJSON(object: any): RequestVerifyVoteExtension;
    toJSON(message: RequestVerifyVoteExtension): unknown;
    create<I extends {
        hash?: Uint8Array;
        validatorAddress?: Uint8Array;
        height?: number;
        voteExtension?: Uint8Array;
    } & {
        hash?: Uint8Array;
        validatorAddress?: Uint8Array;
        height?: number;
        voteExtension?: Uint8Array;
    } & { [K in Exclude<keyof I, keyof RequestVerifyVoteExtension>]: never; }>(base?: I): RequestVerifyVoteExtension;
    fromPartial<I_1 extends {
        hash?: Uint8Array;
        validatorAddress?: Uint8Array;
        height?: number;
        voteExtension?: Uint8Array;
    } & {
        hash?: Uint8Array;
        validatorAddress?: Uint8Array;
        height?: number;
        voteExtension?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, keyof RequestVerifyVoteExtension>]: never; }>(object: I_1): RequestVerifyVoteExtension;
};
export declare const RequestFinalizeBlock: {
    encode(message: RequestFinalizeBlock, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RequestFinalizeBlock;
    fromJSON(object: any): RequestFinalizeBlock;
    toJSON(message: RequestFinalizeBlock): unknown;
    create<I extends {
        txs?: Uint8Array[];
        decidedLastCommit?: {
            round?: number;
            votes?: {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                blockIdFlag?: BlockIDFlag;
            }[];
        };
        misbehavior?: {
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        }[];
        hash?: Uint8Array;
        height?: number;
        time?: Date | undefined;
        nextValidatorsHash?: Uint8Array;
        proposerAddress?: Uint8Array;
    } & {
        txs?: Uint8Array[] & Uint8Array[] & { [K in Exclude<keyof I["txs"], keyof Uint8Array[]>]: never; };
        decidedLastCommit?: {
            round?: number;
            votes?: {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                blockIdFlag?: BlockIDFlag;
            }[];
        } & {
            round?: number;
            votes?: {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                blockIdFlag?: BlockIDFlag;
            }[] & ({
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                blockIdFlag?: BlockIDFlag;
            } & {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                } & {
                    address?: Uint8Array;
                    power?: number;
                } & { [K_1 in Exclude<keyof I["decidedLastCommit"]["votes"][number]["validator"], keyof Validator>]: never; };
                blockIdFlag?: BlockIDFlag;
            } & { [K_2 in Exclude<keyof I["decidedLastCommit"]["votes"][number], keyof VoteInfo>]: never; })[] & { [K_3 in Exclude<keyof I["decidedLastCommit"]["votes"], keyof {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                blockIdFlag?: BlockIDFlag;
            }[]>]: never; };
        } & { [K_4 in Exclude<keyof I["decidedLastCommit"], keyof CommitInfo>]: never; };
        misbehavior?: {
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        }[] & ({
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        } & {
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            } & {
                address?: Uint8Array;
                power?: number;
            } & { [K_5 in Exclude<keyof I["misbehavior"][number]["validator"], keyof Validator>]: never; };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        } & { [K_6 in Exclude<keyof I["misbehavior"][number], keyof Misbehavior>]: never; })[] & { [K_7 in Exclude<keyof I["misbehavior"], keyof {
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        }[]>]: never; };
        hash?: Uint8Array;
        height?: number;
        time?: Date | undefined;
        nextValidatorsHash?: Uint8Array;
        proposerAddress?: Uint8Array;
    } & { [K_8 in Exclude<keyof I, keyof RequestFinalizeBlock>]: never; }>(base?: I): RequestFinalizeBlock;
    fromPartial<I_1 extends {
        txs?: Uint8Array[];
        decidedLastCommit?: {
            round?: number;
            votes?: {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                blockIdFlag?: BlockIDFlag;
            }[];
        };
        misbehavior?: {
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        }[];
        hash?: Uint8Array;
        height?: number;
        time?: Date | undefined;
        nextValidatorsHash?: Uint8Array;
        proposerAddress?: Uint8Array;
    } & {
        txs?: Uint8Array[] & Uint8Array[] & { [K_9 in Exclude<keyof I_1["txs"], keyof Uint8Array[]>]: never; };
        decidedLastCommit?: {
            round?: number;
            votes?: {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                blockIdFlag?: BlockIDFlag;
            }[];
        } & {
            round?: number;
            votes?: {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                blockIdFlag?: BlockIDFlag;
            }[] & ({
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                blockIdFlag?: BlockIDFlag;
            } & {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                } & {
                    address?: Uint8Array;
                    power?: number;
                } & { [K_10 in Exclude<keyof I_1["decidedLastCommit"]["votes"][number]["validator"], keyof Validator>]: never; };
                blockIdFlag?: BlockIDFlag;
            } & { [K_11 in Exclude<keyof I_1["decidedLastCommit"]["votes"][number], keyof VoteInfo>]: never; })[] & { [K_12 in Exclude<keyof I_1["decidedLastCommit"]["votes"], keyof {
                validator?: {
                    address?: Uint8Array;
                    power?: number;
                };
                blockIdFlag?: BlockIDFlag;
            }[]>]: never; };
        } & { [K_13 in Exclude<keyof I_1["decidedLastCommit"], keyof CommitInfo>]: never; };
        misbehavior?: {
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        }[] & ({
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        } & {
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            } & {
                address?: Uint8Array;
                power?: number;
            } & { [K_14 in Exclude<keyof I_1["misbehavior"][number]["validator"], keyof Validator>]: never; };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        } & { [K_15 in Exclude<keyof I_1["misbehavior"][number], keyof Misbehavior>]: never; })[] & { [K_16 in Exclude<keyof I_1["misbehavior"], keyof {
            type?: MisbehaviorType;
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            height?: number;
            time?: Date | undefined;
            totalVotingPower?: number;
        }[]>]: never; };
        hash?: Uint8Array;
        height?: number;
        time?: Date | undefined;
        nextValidatorsHash?: Uint8Array;
        proposerAddress?: Uint8Array;
    } & { [K_17 in Exclude<keyof I_1, keyof RequestFinalizeBlock>]: never; }>(object: I_1): RequestFinalizeBlock;
};
export declare const Response: {
    encode(message: Response, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Response;
    fromJSON(object: any): Response;
    toJSON(message: Response): unknown;
    create<I extends {
        exception?: {
            error?: string;
        };
        echo?: {
            message?: string;
        };
        flush?: {};
        info?: {
            data?: string;
            version?: string;
            appVersion?: number;
            lastBlockHeight?: number;
            lastBlockAppHash?: Uint8Array;
        };
        initChain?: {
            consensusParams?: {
                block?: {
                    maxBytes?: number;
                    maxGas?: number;
                };
                evidence?: {
                    maxAgeNumBlocks?: number;
                    maxAgeDuration?: {
                        seconds?: number;
                        nanos?: number;
                    };
                    maxBytes?: number;
                };
                validator?: {
                    pubKeyTypes?: string[];
                };
                version?: {
                    app?: number;
                };
                abci?: {
                    voteExtensionsEnableHeight?: number;
                };
            };
            validators?: {
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                };
                power?: number;
            }[];
            appHash?: Uint8Array;
        };
        query?: {
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
        };
        checkTx?: {
            code?: number;
            data?: Uint8Array;
            log?: string;
            info?: string;
            gasWanted?: number;
            gasUsed?: number;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[];
            codespace?: string;
        };
        commit?: {
            retainHeight?: number;
        };
        listSnapshots?: {
            snapshots?: {
                height?: number;
                format?: number;
                chunks?: number;
                hash?: Uint8Array;
                metadata?: Uint8Array;
            }[];
        };
        offerSnapshot?: {
            result?: ResponseOfferSnapshot_Result;
        };
        loadSnapshotChunk?: {
            chunk?: Uint8Array;
        };
        applySnapshotChunk?: {
            result?: ResponseApplySnapshotChunk_Result;
            refetchChunks?: number[];
            rejectSenders?: string[];
        };
        prepareProposal?: {
            txs?: Uint8Array[];
        };
        processProposal?: {
            status?: ResponseProcessProposal_ProposalStatus;
        };
        extendVote?: {
            voteExtension?: Uint8Array;
        };
        verifyVoteExtension?: {
            status?: ResponseVerifyVoteExtension_VerifyStatus;
        };
        finalizeBlock?: {
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[];
            txResults?: {
                code?: number;
                data?: Uint8Array;
                log?: string;
                info?: string;
                gasWanted?: number;
                gasUsed?: number;
                events?: {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                        index?: boolean;
                    }[];
                }[];
                codespace?: string;
            }[];
            validatorUpdates?: {
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                };
                power?: number;
            }[];
            consensusParamUpdates?: {
                block?: {
                    maxBytes?: number;
                    maxGas?: number;
                };
                evidence?: {
                    maxAgeNumBlocks?: number;
                    maxAgeDuration?: {
                        seconds?: number;
                        nanos?: number;
                    };
                    maxBytes?: number;
                };
                validator?: {
                    pubKeyTypes?: string[];
                };
                version?: {
                    app?: number;
                };
                abci?: {
                    voteExtensionsEnableHeight?: number;
                };
            };
            appHash?: Uint8Array;
        };
    } & {
        exception?: {
            error?: string;
        } & {
            error?: string;
        } & { [K in Exclude<keyof I["exception"], "error">]: never; };
        echo?: {
            message?: string;
        } & {
            message?: string;
        } & { [K_1 in Exclude<keyof I["echo"], "message">]: never; };
        flush?: {} & {} & { [K_2 in Exclude<keyof I["flush"], never>]: never; };
        info?: {
            data?: string;
            version?: string;
            appVersion?: number;
            lastBlockHeight?: number;
            lastBlockAppHash?: Uint8Array;
        } & {
            data?: string;
            version?: string;
            appVersion?: number;
            lastBlockHeight?: number;
            lastBlockAppHash?: Uint8Array;
        } & { [K_3 in Exclude<keyof I["info"], keyof ResponseInfo>]: never; };
        initChain?: {
            consensusParams?: {
                block?: {
                    maxBytes?: number;
                    maxGas?: number;
                };
                evidence?: {
                    maxAgeNumBlocks?: number;
                    maxAgeDuration?: {
                        seconds?: number;
                        nanos?: number;
                    };
                    maxBytes?: number;
                };
                validator?: {
                    pubKeyTypes?: string[];
                };
                version?: {
                    app?: number;
                };
                abci?: {
                    voteExtensionsEnableHeight?: number;
                };
            };
            validators?: {
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                };
                power?: number;
            }[];
            appHash?: Uint8Array;
        } & {
            consensusParams?: {
                block?: {
                    maxBytes?: number;
                    maxGas?: number;
                };
                evidence?: {
                    maxAgeNumBlocks?: number;
                    maxAgeDuration?: {
                        seconds?: number;
                        nanos?: number;
                    };
                    maxBytes?: number;
                };
                validator?: {
                    pubKeyTypes?: string[];
                };
                version?: {
                    app?: number;
                };
                abci?: {
                    voteExtensionsEnableHeight?: number;
                };
            } & {
                block?: {
                    maxBytes?: number;
                    maxGas?: number;
                } & {
                    maxBytes?: number;
                    maxGas?: number;
                } & { [K_4 in Exclude<keyof I["initChain"]["consensusParams"]["block"], keyof import("../types/params").BlockParams>]: never; };
                evidence?: {
                    maxAgeNumBlocks?: number;
                    maxAgeDuration?: {
                        seconds?: number;
                        nanos?: number;
                    };
                    maxBytes?: number;
                } & {
                    maxAgeNumBlocks?: number;
                    maxAgeDuration?: {
                        seconds?: number;
                        nanos?: number;
                    } & {
                        seconds?: number;
                        nanos?: number;
                    } & { [K_5 in Exclude<keyof I["initChain"]["consensusParams"]["evidence"]["maxAgeDuration"], keyof import("../../google/protobuf/duration").Duration>]: never; };
                    maxBytes?: number;
                } & { [K_6 in Exclude<keyof I["initChain"]["consensusParams"]["evidence"], keyof import("../types/params").EvidenceParams>]: never; };
                validator?: {
                    pubKeyTypes?: string[];
                } & {
                    pubKeyTypes?: string[] & string[] & { [K_7 in Exclude<keyof I["initChain"]["consensusParams"]["validator"]["pubKeyTypes"], keyof string[]>]: never; };
                } & { [K_8 in Exclude<keyof I["initChain"]["consensusParams"]["validator"], "pubKeyTypes">]: never; };
                version?: {
                    app?: number;
                } & {
                    app?: number;
                } & { [K_9 in Exclude<keyof I["initChain"]["consensusParams"]["version"], "app">]: never; };
                abci?: {
                    voteExtensionsEnableHeight?: number;
                } & {
                    voteExtensionsEnableHeight?: number;
                } & { [K_10 in Exclude<keyof I["initChain"]["consensusParams"]["abci"], "voteExtensionsEnableHeight">]: never; };
            } & { [K_11 in Exclude<keyof I["initChain"]["consensusParams"], keyof ConsensusParams>]: never; };
            validators?: {
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                };
                power?: number;
            }[] & ({
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                };
                power?: number;
            } & {
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                } & {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                } & { [K_12 in Exclude<keyof I["initChain"]["validators"][number]["pubKey"], keyof PublicKey>]: never; };
                power?: number;
            } & { [K_13 in Exclude<keyof I["initChain"]["validators"][number], keyof ValidatorUpdate>]: never; })[] & { [K_14 in Exclude<keyof I["initChain"]["validators"], keyof {
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                };
                power?: number;
            }[]>]: never; };
            appHash?: Uint8Array;
        } & { [K_15 in Exclude<keyof I["initChain"], keyof ResponseInitChain>]: never; };
        query?: {
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
                } & { [K_16 in Exclude<keyof I["query"]["proofOps"]["ops"][number], keyof import("../crypto/proof").ProofOp>]: never; })[] & { [K_17 in Exclude<keyof I["query"]["proofOps"]["ops"], keyof {
                    type?: string;
                    key?: Uint8Array;
                    data?: Uint8Array;
                }[]>]: never; };
            } & { [K_18 in Exclude<keyof I["query"]["proofOps"], "ops">]: never; };
            height?: number;
            codespace?: string;
        } & { [K_19 in Exclude<keyof I["query"], keyof ResponseQuery>]: never; };
        checkTx?: {
            code?: number;
            data?: Uint8Array;
            log?: string;
            info?: string;
            gasWanted?: number;
            gasUsed?: number;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[];
            codespace?: string;
        } & {
            code?: number;
            data?: Uint8Array;
            log?: string;
            info?: string;
            gasWanted?: number;
            gasUsed?: number;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[] & ({
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            } & {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[] & ({
                    key?: string;
                    value?: string;
                    index?: boolean;
                } & {
                    key?: string;
                    value?: string;
                    index?: boolean;
                } & { [K_20 in Exclude<keyof I["checkTx"]["events"][number]["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_21 in Exclude<keyof I["checkTx"]["events"][number]["attributes"], keyof {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[]>]: never; };
            } & { [K_22 in Exclude<keyof I["checkTx"]["events"][number], keyof Event>]: never; })[] & { [K_23 in Exclude<keyof I["checkTx"]["events"], keyof {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[]>]: never; };
            codespace?: string;
        } & { [K_24 in Exclude<keyof I["checkTx"], keyof ResponseCheckTx>]: never; };
        commit?: {
            retainHeight?: number;
        } & {
            retainHeight?: number;
        } & { [K_25 in Exclude<keyof I["commit"], "retainHeight">]: never; };
        listSnapshots?: {
            snapshots?: {
                height?: number;
                format?: number;
                chunks?: number;
                hash?: Uint8Array;
                metadata?: Uint8Array;
            }[];
        } & {
            snapshots?: {
                height?: number;
                format?: number;
                chunks?: number;
                hash?: Uint8Array;
                metadata?: Uint8Array;
            }[] & ({
                height?: number;
                format?: number;
                chunks?: number;
                hash?: Uint8Array;
                metadata?: Uint8Array;
            } & {
                height?: number;
                format?: number;
                chunks?: number;
                hash?: Uint8Array;
                metadata?: Uint8Array;
            } & { [K_26 in Exclude<keyof I["listSnapshots"]["snapshots"][number], keyof Snapshot>]: never; })[] & { [K_27 in Exclude<keyof I["listSnapshots"]["snapshots"], keyof {
                height?: number;
                format?: number;
                chunks?: number;
                hash?: Uint8Array;
                metadata?: Uint8Array;
            }[]>]: never; };
        } & { [K_28 in Exclude<keyof I["listSnapshots"], "snapshots">]: never; };
        offerSnapshot?: {
            result?: ResponseOfferSnapshot_Result;
        } & {
            result?: ResponseOfferSnapshot_Result;
        } & { [K_29 in Exclude<keyof I["offerSnapshot"], "result">]: never; };
        loadSnapshotChunk?: {
            chunk?: Uint8Array;
        } & {
            chunk?: Uint8Array;
        } & { [K_30 in Exclude<keyof I["loadSnapshotChunk"], "chunk">]: never; };
        applySnapshotChunk?: {
            result?: ResponseApplySnapshotChunk_Result;
            refetchChunks?: number[];
            rejectSenders?: string[];
        } & {
            result?: ResponseApplySnapshotChunk_Result;
            refetchChunks?: number[] & number[] & { [K_31 in Exclude<keyof I["applySnapshotChunk"]["refetchChunks"], keyof number[]>]: never; };
            rejectSenders?: string[] & string[] & { [K_32 in Exclude<keyof I["applySnapshotChunk"]["rejectSenders"], keyof string[]>]: never; };
        } & { [K_33 in Exclude<keyof I["applySnapshotChunk"], keyof ResponseApplySnapshotChunk>]: never; };
        prepareProposal?: {
            txs?: Uint8Array[];
        } & {
            txs?: Uint8Array[] & Uint8Array[] & { [K_34 in Exclude<keyof I["prepareProposal"]["txs"], keyof Uint8Array[]>]: never; };
        } & { [K_35 in Exclude<keyof I["prepareProposal"], "txs">]: never; };
        processProposal?: {
            status?: ResponseProcessProposal_ProposalStatus;
        } & {
            status?: ResponseProcessProposal_ProposalStatus;
        } & { [K_36 in Exclude<keyof I["processProposal"], "status">]: never; };
        extendVote?: {
            voteExtension?: Uint8Array;
        } & {
            voteExtension?: Uint8Array;
        } & { [K_37 in Exclude<keyof I["extendVote"], "voteExtension">]: never; };
        verifyVoteExtension?: {
            status?: ResponseVerifyVoteExtension_VerifyStatus;
        } & {
            status?: ResponseVerifyVoteExtension_VerifyStatus;
        } & { [K_38 in Exclude<keyof I["verifyVoteExtension"], "status">]: never; };
        finalizeBlock?: {
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[];
            txResults?: {
                code?: number;
                data?: Uint8Array;
                log?: string;
                info?: string;
                gasWanted?: number;
                gasUsed?: number;
                events?: {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                        index?: boolean;
                    }[];
                }[];
                codespace?: string;
            }[];
            validatorUpdates?: {
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                };
                power?: number;
            }[];
            consensusParamUpdates?: {
                block?: {
                    maxBytes?: number;
                    maxGas?: number;
                };
                evidence?: {
                    maxAgeNumBlocks?: number;
                    maxAgeDuration?: {
                        seconds?: number;
                        nanos?: number;
                    };
                    maxBytes?: number;
                };
                validator?: {
                    pubKeyTypes?: string[];
                };
                version?: {
                    app?: number;
                };
                abci?: {
                    voteExtensionsEnableHeight?: number;
                };
            };
            appHash?: Uint8Array;
        } & {
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[] & ({
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            } & {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[] & ({
                    key?: string;
                    value?: string;
                    index?: boolean;
                } & {
                    key?: string;
                    value?: string;
                    index?: boolean;
                } & { [K_39 in Exclude<keyof I["finalizeBlock"]["events"][number]["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_40 in Exclude<keyof I["finalizeBlock"]["events"][number]["attributes"], keyof {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[]>]: never; };
            } & { [K_41 in Exclude<keyof I["finalizeBlock"]["events"][number], keyof Event>]: never; })[] & { [K_42 in Exclude<keyof I["finalizeBlock"]["events"], keyof {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[]>]: never; };
            txResults?: {
                code?: number;
                data?: Uint8Array;
                log?: string;
                info?: string;
                gasWanted?: number;
                gasUsed?: number;
                events?: {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                        index?: boolean;
                    }[];
                }[];
                codespace?: string;
            }[] & ({
                code?: number;
                data?: Uint8Array;
                log?: string;
                info?: string;
                gasWanted?: number;
                gasUsed?: number;
                events?: {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                        index?: boolean;
                    }[];
                }[];
                codespace?: string;
            } & {
                code?: number;
                data?: Uint8Array;
                log?: string;
                info?: string;
                gasWanted?: number;
                gasUsed?: number;
                events?: {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                        index?: boolean;
                    }[];
                }[] & ({
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                        index?: boolean;
                    }[];
                } & {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                        index?: boolean;
                    }[] & ({
                        key?: string;
                        value?: string;
                        index?: boolean;
                    } & {
                        key?: string;
                        value?: string;
                        index?: boolean;
                    } & { [K_43 in Exclude<keyof I["finalizeBlock"]["txResults"][number]["events"][number]["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_44 in Exclude<keyof I["finalizeBlock"]["txResults"][number]["events"][number]["attributes"], keyof {
                        key?: string;
                        value?: string;
                        index?: boolean;
                    }[]>]: never; };
                } & { [K_45 in Exclude<keyof I["finalizeBlock"]["txResults"][number]["events"][number], keyof Event>]: never; })[] & { [K_46 in Exclude<keyof I["finalizeBlock"]["txResults"][number]["events"], keyof {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                        index?: boolean;
                    }[];
                }[]>]: never; };
                codespace?: string;
            } & { [K_47 in Exclude<keyof I["finalizeBlock"]["txResults"][number], keyof ExecTxResult>]: never; })[] & { [K_48 in Exclude<keyof I["finalizeBlock"]["txResults"], keyof {
                code?: number;
                data?: Uint8Array;
                log?: string;
                info?: string;
                gasWanted?: number;
                gasUsed?: number;
                events?: {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                        index?: boolean;
                    }[];
                }[];
                codespace?: string;
            }[]>]: never; };
            validatorUpdates?: {
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                };
                power?: number;
            }[] & ({
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                };
                power?: number;
            } & {
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                } & {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                } & { [K_49 in Exclude<keyof I["finalizeBlock"]["validatorUpdates"][number]["pubKey"], keyof PublicKey>]: never; };
                power?: number;
            } & { [K_50 in Exclude<keyof I["finalizeBlock"]["validatorUpdates"][number], keyof ValidatorUpdate>]: never; })[] & { [K_51 in Exclude<keyof I["finalizeBlock"]["validatorUpdates"], keyof {
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                };
                power?: number;
            }[]>]: never; };
            consensusParamUpdates?: {
                block?: {
                    maxBytes?: number;
                    maxGas?: number;
                };
                evidence?: {
                    maxAgeNumBlocks?: number;
                    maxAgeDuration?: {
                        seconds?: number;
                        nanos?: number;
                    };
                    maxBytes?: number;
                };
                validator?: {
                    pubKeyTypes?: string[];
                };
                version?: {
                    app?: number;
                };
                abci?: {
                    voteExtensionsEnableHeight?: number;
                };
            } & {
                block?: {
                    maxBytes?: number;
                    maxGas?: number;
                } & {
                    maxBytes?: number;
                    maxGas?: number;
                } & { [K_52 in Exclude<keyof I["finalizeBlock"]["consensusParamUpdates"]["block"], keyof import("../types/params").BlockParams>]: never; };
                evidence?: {
                    maxAgeNumBlocks?: number;
                    maxAgeDuration?: {
                        seconds?: number;
                        nanos?: number;
                    };
                    maxBytes?: number;
                } & {
                    maxAgeNumBlocks?: number;
                    maxAgeDuration?: {
                        seconds?: number;
                        nanos?: number;
                    } & {
                        seconds?: number;
                        nanos?: number;
                    } & { [K_53 in Exclude<keyof I["finalizeBlock"]["consensusParamUpdates"]["evidence"]["maxAgeDuration"], keyof import("../../google/protobuf/duration").Duration>]: never; };
                    maxBytes?: number;
                } & { [K_54 in Exclude<keyof I["finalizeBlock"]["consensusParamUpdates"]["evidence"], keyof import("../types/params").EvidenceParams>]: never; };
                validator?: {
                    pubKeyTypes?: string[];
                } & {
                    pubKeyTypes?: string[] & string[] & { [K_55 in Exclude<keyof I["finalizeBlock"]["consensusParamUpdates"]["validator"]["pubKeyTypes"], keyof string[]>]: never; };
                } & { [K_56 in Exclude<keyof I["finalizeBlock"]["consensusParamUpdates"]["validator"], "pubKeyTypes">]: never; };
                version?: {
                    app?: number;
                } & {
                    app?: number;
                } & { [K_57 in Exclude<keyof I["finalizeBlock"]["consensusParamUpdates"]["version"], "app">]: never; };
                abci?: {
                    voteExtensionsEnableHeight?: number;
                } & {
                    voteExtensionsEnableHeight?: number;
                } & { [K_58 in Exclude<keyof I["finalizeBlock"]["consensusParamUpdates"]["abci"], "voteExtensionsEnableHeight">]: never; };
            } & { [K_59 in Exclude<keyof I["finalizeBlock"]["consensusParamUpdates"], keyof ConsensusParams>]: never; };
            appHash?: Uint8Array;
        } & { [K_60 in Exclude<keyof I["finalizeBlock"], keyof ResponseFinalizeBlock>]: never; };
    } & { [K_61 in Exclude<keyof I, keyof Response>]: never; }>(base?: I): Response;
    fromPartial<I_1 extends {
        exception?: {
            error?: string;
        };
        echo?: {
            message?: string;
        };
        flush?: {};
        info?: {
            data?: string;
            version?: string;
            appVersion?: number;
            lastBlockHeight?: number;
            lastBlockAppHash?: Uint8Array;
        };
        initChain?: {
            consensusParams?: {
                block?: {
                    maxBytes?: number;
                    maxGas?: number;
                };
                evidence?: {
                    maxAgeNumBlocks?: number;
                    maxAgeDuration?: {
                        seconds?: number;
                        nanos?: number;
                    };
                    maxBytes?: number;
                };
                validator?: {
                    pubKeyTypes?: string[];
                };
                version?: {
                    app?: number;
                };
                abci?: {
                    voteExtensionsEnableHeight?: number;
                };
            };
            validators?: {
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                };
                power?: number;
            }[];
            appHash?: Uint8Array;
        };
        query?: {
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
        };
        checkTx?: {
            code?: number;
            data?: Uint8Array;
            log?: string;
            info?: string;
            gasWanted?: number;
            gasUsed?: number;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[];
            codespace?: string;
        };
        commit?: {
            retainHeight?: number;
        };
        listSnapshots?: {
            snapshots?: {
                height?: number;
                format?: number;
                chunks?: number;
                hash?: Uint8Array;
                metadata?: Uint8Array;
            }[];
        };
        offerSnapshot?: {
            result?: ResponseOfferSnapshot_Result;
        };
        loadSnapshotChunk?: {
            chunk?: Uint8Array;
        };
        applySnapshotChunk?: {
            result?: ResponseApplySnapshotChunk_Result;
            refetchChunks?: number[];
            rejectSenders?: string[];
        };
        prepareProposal?: {
            txs?: Uint8Array[];
        };
        processProposal?: {
            status?: ResponseProcessProposal_ProposalStatus;
        };
        extendVote?: {
            voteExtension?: Uint8Array;
        };
        verifyVoteExtension?: {
            status?: ResponseVerifyVoteExtension_VerifyStatus;
        };
        finalizeBlock?: {
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[];
            txResults?: {
                code?: number;
                data?: Uint8Array;
                log?: string;
                info?: string;
                gasWanted?: number;
                gasUsed?: number;
                events?: {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                        index?: boolean;
                    }[];
                }[];
                codespace?: string;
            }[];
            validatorUpdates?: {
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                };
                power?: number;
            }[];
            consensusParamUpdates?: {
                block?: {
                    maxBytes?: number;
                    maxGas?: number;
                };
                evidence?: {
                    maxAgeNumBlocks?: number;
                    maxAgeDuration?: {
                        seconds?: number;
                        nanos?: number;
                    };
                    maxBytes?: number;
                };
                validator?: {
                    pubKeyTypes?: string[];
                };
                version?: {
                    app?: number;
                };
                abci?: {
                    voteExtensionsEnableHeight?: number;
                };
            };
            appHash?: Uint8Array;
        };
    } & {
        exception?: {
            error?: string;
        } & {
            error?: string;
        } & { [K_62 in Exclude<keyof I_1["exception"], "error">]: never; };
        echo?: {
            message?: string;
        } & {
            message?: string;
        } & { [K_63 in Exclude<keyof I_1["echo"], "message">]: never; };
        flush?: {} & {} & { [K_64 in Exclude<keyof I_1["flush"], never>]: never; };
        info?: {
            data?: string;
            version?: string;
            appVersion?: number;
            lastBlockHeight?: number;
            lastBlockAppHash?: Uint8Array;
        } & {
            data?: string;
            version?: string;
            appVersion?: number;
            lastBlockHeight?: number;
            lastBlockAppHash?: Uint8Array;
        } & { [K_65 in Exclude<keyof I_1["info"], keyof ResponseInfo>]: never; };
        initChain?: {
            consensusParams?: {
                block?: {
                    maxBytes?: number;
                    maxGas?: number;
                };
                evidence?: {
                    maxAgeNumBlocks?: number;
                    maxAgeDuration?: {
                        seconds?: number;
                        nanos?: number;
                    };
                    maxBytes?: number;
                };
                validator?: {
                    pubKeyTypes?: string[];
                };
                version?: {
                    app?: number;
                };
                abci?: {
                    voteExtensionsEnableHeight?: number;
                };
            };
            validators?: {
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                };
                power?: number;
            }[];
            appHash?: Uint8Array;
        } & {
            consensusParams?: {
                block?: {
                    maxBytes?: number;
                    maxGas?: number;
                };
                evidence?: {
                    maxAgeNumBlocks?: number;
                    maxAgeDuration?: {
                        seconds?: number;
                        nanos?: number;
                    };
                    maxBytes?: number;
                };
                validator?: {
                    pubKeyTypes?: string[];
                };
                version?: {
                    app?: number;
                };
                abci?: {
                    voteExtensionsEnableHeight?: number;
                };
            } & {
                block?: {
                    maxBytes?: number;
                    maxGas?: number;
                } & {
                    maxBytes?: number;
                    maxGas?: number;
                } & { [K_66 in Exclude<keyof I_1["initChain"]["consensusParams"]["block"], keyof import("../types/params").BlockParams>]: never; };
                evidence?: {
                    maxAgeNumBlocks?: number;
                    maxAgeDuration?: {
                        seconds?: number;
                        nanos?: number;
                    };
                    maxBytes?: number;
                } & {
                    maxAgeNumBlocks?: number;
                    maxAgeDuration?: {
                        seconds?: number;
                        nanos?: number;
                    } & {
                        seconds?: number;
                        nanos?: number;
                    } & { [K_67 in Exclude<keyof I_1["initChain"]["consensusParams"]["evidence"]["maxAgeDuration"], keyof import("../../google/protobuf/duration").Duration>]: never; };
                    maxBytes?: number;
                } & { [K_68 in Exclude<keyof I_1["initChain"]["consensusParams"]["evidence"], keyof import("../types/params").EvidenceParams>]: never; };
                validator?: {
                    pubKeyTypes?: string[];
                } & {
                    pubKeyTypes?: string[] & string[] & { [K_69 in Exclude<keyof I_1["initChain"]["consensusParams"]["validator"]["pubKeyTypes"], keyof string[]>]: never; };
                } & { [K_70 in Exclude<keyof I_1["initChain"]["consensusParams"]["validator"], "pubKeyTypes">]: never; };
                version?: {
                    app?: number;
                } & {
                    app?: number;
                } & { [K_71 in Exclude<keyof I_1["initChain"]["consensusParams"]["version"], "app">]: never; };
                abci?: {
                    voteExtensionsEnableHeight?: number;
                } & {
                    voteExtensionsEnableHeight?: number;
                } & { [K_72 in Exclude<keyof I_1["initChain"]["consensusParams"]["abci"], "voteExtensionsEnableHeight">]: never; };
            } & { [K_73 in Exclude<keyof I_1["initChain"]["consensusParams"], keyof ConsensusParams>]: never; };
            validators?: {
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                };
                power?: number;
            }[] & ({
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                };
                power?: number;
            } & {
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                } & {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                } & { [K_74 in Exclude<keyof I_1["initChain"]["validators"][number]["pubKey"], keyof PublicKey>]: never; };
                power?: number;
            } & { [K_75 in Exclude<keyof I_1["initChain"]["validators"][number], keyof ValidatorUpdate>]: never; })[] & { [K_76 in Exclude<keyof I_1["initChain"]["validators"], keyof {
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                };
                power?: number;
            }[]>]: never; };
            appHash?: Uint8Array;
        } & { [K_77 in Exclude<keyof I_1["initChain"], keyof ResponseInitChain>]: never; };
        query?: {
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
                } & { [K_78 in Exclude<keyof I_1["query"]["proofOps"]["ops"][number], keyof import("../crypto/proof").ProofOp>]: never; })[] & { [K_79 in Exclude<keyof I_1["query"]["proofOps"]["ops"], keyof {
                    type?: string;
                    key?: Uint8Array;
                    data?: Uint8Array;
                }[]>]: never; };
            } & { [K_80 in Exclude<keyof I_1["query"]["proofOps"], "ops">]: never; };
            height?: number;
            codespace?: string;
        } & { [K_81 in Exclude<keyof I_1["query"], keyof ResponseQuery>]: never; };
        checkTx?: {
            code?: number;
            data?: Uint8Array;
            log?: string;
            info?: string;
            gasWanted?: number;
            gasUsed?: number;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[];
            codespace?: string;
        } & {
            code?: number;
            data?: Uint8Array;
            log?: string;
            info?: string;
            gasWanted?: number;
            gasUsed?: number;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[] & ({
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            } & {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[] & ({
                    key?: string;
                    value?: string;
                    index?: boolean;
                } & {
                    key?: string;
                    value?: string;
                    index?: boolean;
                } & { [K_82 in Exclude<keyof I_1["checkTx"]["events"][number]["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_83 in Exclude<keyof I_1["checkTx"]["events"][number]["attributes"], keyof {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[]>]: never; };
            } & { [K_84 in Exclude<keyof I_1["checkTx"]["events"][number], keyof Event>]: never; })[] & { [K_85 in Exclude<keyof I_1["checkTx"]["events"], keyof {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[]>]: never; };
            codespace?: string;
        } & { [K_86 in Exclude<keyof I_1["checkTx"], keyof ResponseCheckTx>]: never; };
        commit?: {
            retainHeight?: number;
        } & {
            retainHeight?: number;
        } & { [K_87 in Exclude<keyof I_1["commit"], "retainHeight">]: never; };
        listSnapshots?: {
            snapshots?: {
                height?: number;
                format?: number;
                chunks?: number;
                hash?: Uint8Array;
                metadata?: Uint8Array;
            }[];
        } & {
            snapshots?: {
                height?: number;
                format?: number;
                chunks?: number;
                hash?: Uint8Array;
                metadata?: Uint8Array;
            }[] & ({
                height?: number;
                format?: number;
                chunks?: number;
                hash?: Uint8Array;
                metadata?: Uint8Array;
            } & {
                height?: number;
                format?: number;
                chunks?: number;
                hash?: Uint8Array;
                metadata?: Uint8Array;
            } & { [K_88 in Exclude<keyof I_1["listSnapshots"]["snapshots"][number], keyof Snapshot>]: never; })[] & { [K_89 in Exclude<keyof I_1["listSnapshots"]["snapshots"], keyof {
                height?: number;
                format?: number;
                chunks?: number;
                hash?: Uint8Array;
                metadata?: Uint8Array;
            }[]>]: never; };
        } & { [K_90 in Exclude<keyof I_1["listSnapshots"], "snapshots">]: never; };
        offerSnapshot?: {
            result?: ResponseOfferSnapshot_Result;
        } & {
            result?: ResponseOfferSnapshot_Result;
        } & { [K_91 in Exclude<keyof I_1["offerSnapshot"], "result">]: never; };
        loadSnapshotChunk?: {
            chunk?: Uint8Array;
        } & {
            chunk?: Uint8Array;
        } & { [K_92 in Exclude<keyof I_1["loadSnapshotChunk"], "chunk">]: never; };
        applySnapshotChunk?: {
            result?: ResponseApplySnapshotChunk_Result;
            refetchChunks?: number[];
            rejectSenders?: string[];
        } & {
            result?: ResponseApplySnapshotChunk_Result;
            refetchChunks?: number[] & number[] & { [K_93 in Exclude<keyof I_1["applySnapshotChunk"]["refetchChunks"], keyof number[]>]: never; };
            rejectSenders?: string[] & string[] & { [K_94 in Exclude<keyof I_1["applySnapshotChunk"]["rejectSenders"], keyof string[]>]: never; };
        } & { [K_95 in Exclude<keyof I_1["applySnapshotChunk"], keyof ResponseApplySnapshotChunk>]: never; };
        prepareProposal?: {
            txs?: Uint8Array[];
        } & {
            txs?: Uint8Array[] & Uint8Array[] & { [K_96 in Exclude<keyof I_1["prepareProposal"]["txs"], keyof Uint8Array[]>]: never; };
        } & { [K_97 in Exclude<keyof I_1["prepareProposal"], "txs">]: never; };
        processProposal?: {
            status?: ResponseProcessProposal_ProposalStatus;
        } & {
            status?: ResponseProcessProposal_ProposalStatus;
        } & { [K_98 in Exclude<keyof I_1["processProposal"], "status">]: never; };
        extendVote?: {
            voteExtension?: Uint8Array;
        } & {
            voteExtension?: Uint8Array;
        } & { [K_99 in Exclude<keyof I_1["extendVote"], "voteExtension">]: never; };
        verifyVoteExtension?: {
            status?: ResponseVerifyVoteExtension_VerifyStatus;
        } & {
            status?: ResponseVerifyVoteExtension_VerifyStatus;
        } & { [K_100 in Exclude<keyof I_1["verifyVoteExtension"], "status">]: never; };
        finalizeBlock?: {
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[];
            txResults?: {
                code?: number;
                data?: Uint8Array;
                log?: string;
                info?: string;
                gasWanted?: number;
                gasUsed?: number;
                events?: {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                        index?: boolean;
                    }[];
                }[];
                codespace?: string;
            }[];
            validatorUpdates?: {
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                };
                power?: number;
            }[];
            consensusParamUpdates?: {
                block?: {
                    maxBytes?: number;
                    maxGas?: number;
                };
                evidence?: {
                    maxAgeNumBlocks?: number;
                    maxAgeDuration?: {
                        seconds?: number;
                        nanos?: number;
                    };
                    maxBytes?: number;
                };
                validator?: {
                    pubKeyTypes?: string[];
                };
                version?: {
                    app?: number;
                };
                abci?: {
                    voteExtensionsEnableHeight?: number;
                };
            };
            appHash?: Uint8Array;
        } & {
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[] & ({
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            } & {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[] & ({
                    key?: string;
                    value?: string;
                    index?: boolean;
                } & {
                    key?: string;
                    value?: string;
                    index?: boolean;
                } & { [K_101 in Exclude<keyof I_1["finalizeBlock"]["events"][number]["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_102 in Exclude<keyof I_1["finalizeBlock"]["events"][number]["attributes"], keyof {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[]>]: never; };
            } & { [K_103 in Exclude<keyof I_1["finalizeBlock"]["events"][number], keyof Event>]: never; })[] & { [K_104 in Exclude<keyof I_1["finalizeBlock"]["events"], keyof {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[]>]: never; };
            txResults?: {
                code?: number;
                data?: Uint8Array;
                log?: string;
                info?: string;
                gasWanted?: number;
                gasUsed?: number;
                events?: {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                        index?: boolean;
                    }[];
                }[];
                codespace?: string;
            }[] & ({
                code?: number;
                data?: Uint8Array;
                log?: string;
                info?: string;
                gasWanted?: number;
                gasUsed?: number;
                events?: {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                        index?: boolean;
                    }[];
                }[];
                codespace?: string;
            } & {
                code?: number;
                data?: Uint8Array;
                log?: string;
                info?: string;
                gasWanted?: number;
                gasUsed?: number;
                events?: {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                        index?: boolean;
                    }[];
                }[] & ({
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                        index?: boolean;
                    }[];
                } & {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                        index?: boolean;
                    }[] & ({
                        key?: string;
                        value?: string;
                        index?: boolean;
                    } & {
                        key?: string;
                        value?: string;
                        index?: boolean;
                    } & { [K_105 in Exclude<keyof I_1["finalizeBlock"]["txResults"][number]["events"][number]["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_106 in Exclude<keyof I_1["finalizeBlock"]["txResults"][number]["events"][number]["attributes"], keyof {
                        key?: string;
                        value?: string;
                        index?: boolean;
                    }[]>]: never; };
                } & { [K_107 in Exclude<keyof I_1["finalizeBlock"]["txResults"][number]["events"][number], keyof Event>]: never; })[] & { [K_108 in Exclude<keyof I_1["finalizeBlock"]["txResults"][number]["events"], keyof {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                        index?: boolean;
                    }[];
                }[]>]: never; };
                codespace?: string;
            } & { [K_109 in Exclude<keyof I_1["finalizeBlock"]["txResults"][number], keyof ExecTxResult>]: never; })[] & { [K_110 in Exclude<keyof I_1["finalizeBlock"]["txResults"], keyof {
                code?: number;
                data?: Uint8Array;
                log?: string;
                info?: string;
                gasWanted?: number;
                gasUsed?: number;
                events?: {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                        index?: boolean;
                    }[];
                }[];
                codespace?: string;
            }[]>]: never; };
            validatorUpdates?: {
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                };
                power?: number;
            }[] & ({
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                };
                power?: number;
            } & {
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                } & {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                } & { [K_111 in Exclude<keyof I_1["finalizeBlock"]["validatorUpdates"][number]["pubKey"], keyof PublicKey>]: never; };
                power?: number;
            } & { [K_112 in Exclude<keyof I_1["finalizeBlock"]["validatorUpdates"][number], keyof ValidatorUpdate>]: never; })[] & { [K_113 in Exclude<keyof I_1["finalizeBlock"]["validatorUpdates"], keyof {
                pubKey?: {
                    ed25519?: Uint8Array;
                    secp256k1?: Uint8Array;
                };
                power?: number;
            }[]>]: never; };
            consensusParamUpdates?: {
                block?: {
                    maxBytes?: number;
                    maxGas?: number;
                };
                evidence?: {
                    maxAgeNumBlocks?: number;
                    maxAgeDuration?: {
                        seconds?: number;
                        nanos?: number;
                    };
                    maxBytes?: number;
                };
                validator?: {
                    pubKeyTypes?: string[];
                };
                version?: {
                    app?: number;
                };
                abci?: {
                    voteExtensionsEnableHeight?: number;
                };
            } & {
                block?: {
                    maxBytes?: number;
                    maxGas?: number;
                } & {
                    maxBytes?: number;
                    maxGas?: number;
                } & { [K_114 in Exclude<keyof I_1["finalizeBlock"]["consensusParamUpdates"]["block"], keyof import("../types/params").BlockParams>]: never; };
                evidence?: {
                    maxAgeNumBlocks?: number;
                    maxAgeDuration?: {
                        seconds?: number;
                        nanos?: number;
                    };
                    maxBytes?: number;
                } & {
                    maxAgeNumBlocks?: number;
                    maxAgeDuration?: {
                        seconds?: number;
                        nanos?: number;
                    } & {
                        seconds?: number;
                        nanos?: number;
                    } & { [K_115 in Exclude<keyof I_1["finalizeBlock"]["consensusParamUpdates"]["evidence"]["maxAgeDuration"], keyof import("../../google/protobuf/duration").Duration>]: never; };
                    maxBytes?: number;
                } & { [K_116 in Exclude<keyof I_1["finalizeBlock"]["consensusParamUpdates"]["evidence"], keyof import("../types/params").EvidenceParams>]: never; };
                validator?: {
                    pubKeyTypes?: string[];
                } & {
                    pubKeyTypes?: string[] & string[] & { [K_117 in Exclude<keyof I_1["finalizeBlock"]["consensusParamUpdates"]["validator"]["pubKeyTypes"], keyof string[]>]: never; };
                } & { [K_118 in Exclude<keyof I_1["finalizeBlock"]["consensusParamUpdates"]["validator"], "pubKeyTypes">]: never; };
                version?: {
                    app?: number;
                } & {
                    app?: number;
                } & { [K_119 in Exclude<keyof I_1["finalizeBlock"]["consensusParamUpdates"]["version"], "app">]: never; };
                abci?: {
                    voteExtensionsEnableHeight?: number;
                } & {
                    voteExtensionsEnableHeight?: number;
                } & { [K_120 in Exclude<keyof I_1["finalizeBlock"]["consensusParamUpdates"]["abci"], "voteExtensionsEnableHeight">]: never; };
            } & { [K_121 in Exclude<keyof I_1["finalizeBlock"]["consensusParamUpdates"], keyof ConsensusParams>]: never; };
            appHash?: Uint8Array;
        } & { [K_122 in Exclude<keyof I_1["finalizeBlock"], keyof ResponseFinalizeBlock>]: never; };
    } & { [K_123 in Exclude<keyof I_1, keyof Response>]: never; }>(object: I_1): Response;
};
export declare const ResponseException: {
    encode(message: ResponseException, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResponseException;
    fromJSON(object: any): ResponseException;
    toJSON(message: ResponseException): unknown;
    create<I extends {
        error?: string;
    } & {
        error?: string;
    } & { [K in Exclude<keyof I, "error">]: never; }>(base?: I): ResponseException;
    fromPartial<I_1 extends {
        error?: string;
    } & {
        error?: string;
    } & { [K_1 in Exclude<keyof I_1, "error">]: never; }>(object: I_1): ResponseException;
};
export declare const ResponseEcho: {
    encode(message: ResponseEcho, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResponseEcho;
    fromJSON(object: any): ResponseEcho;
    toJSON(message: ResponseEcho): unknown;
    create<I extends {
        message?: string;
    } & {
        message?: string;
    } & { [K in Exclude<keyof I, "message">]: never; }>(base?: I): ResponseEcho;
    fromPartial<I_1 extends {
        message?: string;
    } & {
        message?: string;
    } & { [K_1 in Exclude<keyof I_1, "message">]: never; }>(object: I_1): ResponseEcho;
};
export declare const ResponseFlush: {
    encode(_: ResponseFlush, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResponseFlush;
    fromJSON(_: any): ResponseFlush;
    toJSON(_: ResponseFlush): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): ResponseFlush;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): ResponseFlush;
};
export declare const ResponseInfo: {
    encode(message: ResponseInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResponseInfo;
    fromJSON(object: any): ResponseInfo;
    toJSON(message: ResponseInfo): unknown;
    create<I extends {
        data?: string;
        version?: string;
        appVersion?: number;
        lastBlockHeight?: number;
        lastBlockAppHash?: Uint8Array;
    } & {
        data?: string;
        version?: string;
        appVersion?: number;
        lastBlockHeight?: number;
        lastBlockAppHash?: Uint8Array;
    } & { [K in Exclude<keyof I, keyof ResponseInfo>]: never; }>(base?: I): ResponseInfo;
    fromPartial<I_1 extends {
        data?: string;
        version?: string;
        appVersion?: number;
        lastBlockHeight?: number;
        lastBlockAppHash?: Uint8Array;
    } & {
        data?: string;
        version?: string;
        appVersion?: number;
        lastBlockHeight?: number;
        lastBlockAppHash?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, keyof ResponseInfo>]: never; }>(object: I_1): ResponseInfo;
};
export declare const ResponseInitChain: {
    encode(message: ResponseInitChain, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResponseInitChain;
    fromJSON(object: any): ResponseInitChain;
    toJSON(message: ResponseInitChain): unknown;
    create<I extends {
        consensusParams?: {
            block?: {
                maxBytes?: number;
                maxGas?: number;
            };
            evidence?: {
                maxAgeNumBlocks?: number;
                maxAgeDuration?: {
                    seconds?: number;
                    nanos?: number;
                };
                maxBytes?: number;
            };
            validator?: {
                pubKeyTypes?: string[];
            };
            version?: {
                app?: number;
            };
            abci?: {
                voteExtensionsEnableHeight?: number;
            };
        };
        validators?: {
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            };
            power?: number;
        }[];
        appHash?: Uint8Array;
    } & {
        consensusParams?: {
            block?: {
                maxBytes?: number;
                maxGas?: number;
            };
            evidence?: {
                maxAgeNumBlocks?: number;
                maxAgeDuration?: {
                    seconds?: number;
                    nanos?: number;
                };
                maxBytes?: number;
            };
            validator?: {
                pubKeyTypes?: string[];
            };
            version?: {
                app?: number;
            };
            abci?: {
                voteExtensionsEnableHeight?: number;
            };
        } & {
            block?: {
                maxBytes?: number;
                maxGas?: number;
            } & {
                maxBytes?: number;
                maxGas?: number;
            } & { [K in Exclude<keyof I["consensusParams"]["block"], keyof import("../types/params").BlockParams>]: never; };
            evidence?: {
                maxAgeNumBlocks?: number;
                maxAgeDuration?: {
                    seconds?: number;
                    nanos?: number;
                };
                maxBytes?: number;
            } & {
                maxAgeNumBlocks?: number;
                maxAgeDuration?: {
                    seconds?: number;
                    nanos?: number;
                } & {
                    seconds?: number;
                    nanos?: number;
                } & { [K_1 in Exclude<keyof I["consensusParams"]["evidence"]["maxAgeDuration"], keyof import("../../google/protobuf/duration").Duration>]: never; };
                maxBytes?: number;
            } & { [K_2 in Exclude<keyof I["consensusParams"]["evidence"], keyof import("../types/params").EvidenceParams>]: never; };
            validator?: {
                pubKeyTypes?: string[];
            } & {
                pubKeyTypes?: string[] & string[] & { [K_3 in Exclude<keyof I["consensusParams"]["validator"]["pubKeyTypes"], keyof string[]>]: never; };
            } & { [K_4 in Exclude<keyof I["consensusParams"]["validator"], "pubKeyTypes">]: never; };
            version?: {
                app?: number;
            } & {
                app?: number;
            } & { [K_5 in Exclude<keyof I["consensusParams"]["version"], "app">]: never; };
            abci?: {
                voteExtensionsEnableHeight?: number;
            } & {
                voteExtensionsEnableHeight?: number;
            } & { [K_6 in Exclude<keyof I["consensusParams"]["abci"], "voteExtensionsEnableHeight">]: never; };
        } & { [K_7 in Exclude<keyof I["consensusParams"], keyof ConsensusParams>]: never; };
        validators?: {
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            };
            power?: number;
        }[] & ({
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            };
            power?: number;
        } & {
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            } & {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            } & { [K_8 in Exclude<keyof I["validators"][number]["pubKey"], keyof PublicKey>]: never; };
            power?: number;
        } & { [K_9 in Exclude<keyof I["validators"][number], keyof ValidatorUpdate>]: never; })[] & { [K_10 in Exclude<keyof I["validators"], keyof {
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            };
            power?: number;
        }[]>]: never; };
        appHash?: Uint8Array;
    } & { [K_11 in Exclude<keyof I, keyof ResponseInitChain>]: never; }>(base?: I): ResponseInitChain;
    fromPartial<I_1 extends {
        consensusParams?: {
            block?: {
                maxBytes?: number;
                maxGas?: number;
            };
            evidence?: {
                maxAgeNumBlocks?: number;
                maxAgeDuration?: {
                    seconds?: number;
                    nanos?: number;
                };
                maxBytes?: number;
            };
            validator?: {
                pubKeyTypes?: string[];
            };
            version?: {
                app?: number;
            };
            abci?: {
                voteExtensionsEnableHeight?: number;
            };
        };
        validators?: {
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            };
            power?: number;
        }[];
        appHash?: Uint8Array;
    } & {
        consensusParams?: {
            block?: {
                maxBytes?: number;
                maxGas?: number;
            };
            evidence?: {
                maxAgeNumBlocks?: number;
                maxAgeDuration?: {
                    seconds?: number;
                    nanos?: number;
                };
                maxBytes?: number;
            };
            validator?: {
                pubKeyTypes?: string[];
            };
            version?: {
                app?: number;
            };
            abci?: {
                voteExtensionsEnableHeight?: number;
            };
        } & {
            block?: {
                maxBytes?: number;
                maxGas?: number;
            } & {
                maxBytes?: number;
                maxGas?: number;
            } & { [K_12 in Exclude<keyof I_1["consensusParams"]["block"], keyof import("../types/params").BlockParams>]: never; };
            evidence?: {
                maxAgeNumBlocks?: number;
                maxAgeDuration?: {
                    seconds?: number;
                    nanos?: number;
                };
                maxBytes?: number;
            } & {
                maxAgeNumBlocks?: number;
                maxAgeDuration?: {
                    seconds?: number;
                    nanos?: number;
                } & {
                    seconds?: number;
                    nanos?: number;
                } & { [K_13 in Exclude<keyof I_1["consensusParams"]["evidence"]["maxAgeDuration"], keyof import("../../google/protobuf/duration").Duration>]: never; };
                maxBytes?: number;
            } & { [K_14 in Exclude<keyof I_1["consensusParams"]["evidence"], keyof import("../types/params").EvidenceParams>]: never; };
            validator?: {
                pubKeyTypes?: string[];
            } & {
                pubKeyTypes?: string[] & string[] & { [K_15 in Exclude<keyof I_1["consensusParams"]["validator"]["pubKeyTypes"], keyof string[]>]: never; };
            } & { [K_16 in Exclude<keyof I_1["consensusParams"]["validator"], "pubKeyTypes">]: never; };
            version?: {
                app?: number;
            } & {
                app?: number;
            } & { [K_17 in Exclude<keyof I_1["consensusParams"]["version"], "app">]: never; };
            abci?: {
                voteExtensionsEnableHeight?: number;
            } & {
                voteExtensionsEnableHeight?: number;
            } & { [K_18 in Exclude<keyof I_1["consensusParams"]["abci"], "voteExtensionsEnableHeight">]: never; };
        } & { [K_19 in Exclude<keyof I_1["consensusParams"], keyof ConsensusParams>]: never; };
        validators?: {
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            };
            power?: number;
        }[] & ({
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            };
            power?: number;
        } & {
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            } & {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            } & { [K_20 in Exclude<keyof I_1["validators"][number]["pubKey"], keyof PublicKey>]: never; };
            power?: number;
        } & { [K_21 in Exclude<keyof I_1["validators"][number], keyof ValidatorUpdate>]: never; })[] & { [K_22 in Exclude<keyof I_1["validators"], keyof {
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            };
            power?: number;
        }[]>]: never; };
        appHash?: Uint8Array;
    } & { [K_23 in Exclude<keyof I_1, keyof ResponseInitChain>]: never; }>(object: I_1): ResponseInitChain;
};
export declare const ResponseQuery: {
    encode(message: ResponseQuery, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResponseQuery;
    fromJSON(object: any): ResponseQuery;
    toJSON(message: ResponseQuery): unknown;
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
            } & { [K in Exclude<keyof I["proofOps"]["ops"][number], keyof import("../crypto/proof").ProofOp>]: never; })[] & { [K_1 in Exclude<keyof I["proofOps"]["ops"], keyof {
                type?: string;
                key?: Uint8Array;
                data?: Uint8Array;
            }[]>]: never; };
        } & { [K_2 in Exclude<keyof I["proofOps"], "ops">]: never; };
        height?: number;
        codespace?: string;
    } & { [K_3 in Exclude<keyof I, keyof ResponseQuery>]: never; }>(base?: I): ResponseQuery;
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
            } & { [K_4 in Exclude<keyof I_1["proofOps"]["ops"][number], keyof import("../crypto/proof").ProofOp>]: never; })[] & { [K_5 in Exclude<keyof I_1["proofOps"]["ops"], keyof {
                type?: string;
                key?: Uint8Array;
                data?: Uint8Array;
            }[]>]: never; };
        } & { [K_6 in Exclude<keyof I_1["proofOps"], "ops">]: never; };
        height?: number;
        codespace?: string;
    } & { [K_7 in Exclude<keyof I_1, keyof ResponseQuery>]: never; }>(object: I_1): ResponseQuery;
};
export declare const ResponseCheckTx: {
    encode(message: ResponseCheckTx, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResponseCheckTx;
    fromJSON(object: any): ResponseCheckTx;
    toJSON(message: ResponseCheckTx): unknown;
    create<I extends {
        code?: number;
        data?: Uint8Array;
        log?: string;
        info?: string;
        gasWanted?: number;
        gasUsed?: number;
        events?: {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        }[];
        codespace?: string;
    } & {
        code?: number;
        data?: Uint8Array;
        log?: string;
        info?: string;
        gasWanted?: number;
        gasUsed?: number;
        events?: {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        }[] & ({
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        } & {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[] & ({
                key?: string;
                value?: string;
                index?: boolean;
            } & {
                key?: string;
                value?: string;
                index?: boolean;
            } & { [K in Exclude<keyof I["events"][number]["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_1 in Exclude<keyof I["events"][number]["attributes"], keyof {
                key?: string;
                value?: string;
                index?: boolean;
            }[]>]: never; };
        } & { [K_2 in Exclude<keyof I["events"][number], keyof Event>]: never; })[] & { [K_3 in Exclude<keyof I["events"], keyof {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        }[]>]: never; };
        codespace?: string;
    } & { [K_4 in Exclude<keyof I, keyof ResponseCheckTx>]: never; }>(base?: I): ResponseCheckTx;
    fromPartial<I_1 extends {
        code?: number;
        data?: Uint8Array;
        log?: string;
        info?: string;
        gasWanted?: number;
        gasUsed?: number;
        events?: {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        }[];
        codespace?: string;
    } & {
        code?: number;
        data?: Uint8Array;
        log?: string;
        info?: string;
        gasWanted?: number;
        gasUsed?: number;
        events?: {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        }[] & ({
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        } & {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[] & ({
                key?: string;
                value?: string;
                index?: boolean;
            } & {
                key?: string;
                value?: string;
                index?: boolean;
            } & { [K_5 in Exclude<keyof I_1["events"][number]["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_6 in Exclude<keyof I_1["events"][number]["attributes"], keyof {
                key?: string;
                value?: string;
                index?: boolean;
            }[]>]: never; };
        } & { [K_7 in Exclude<keyof I_1["events"][number], keyof Event>]: never; })[] & { [K_8 in Exclude<keyof I_1["events"], keyof {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        }[]>]: never; };
        codespace?: string;
    } & { [K_9 in Exclude<keyof I_1, keyof ResponseCheckTx>]: never; }>(object: I_1): ResponseCheckTx;
};
export declare const ResponseCommit: {
    encode(message: ResponseCommit, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResponseCommit;
    fromJSON(object: any): ResponseCommit;
    toJSON(message: ResponseCommit): unknown;
    create<I extends {
        retainHeight?: number;
    } & {
        retainHeight?: number;
    } & { [K in Exclude<keyof I, "retainHeight">]: never; }>(base?: I): ResponseCommit;
    fromPartial<I_1 extends {
        retainHeight?: number;
    } & {
        retainHeight?: number;
    } & { [K_1 in Exclude<keyof I_1, "retainHeight">]: never; }>(object: I_1): ResponseCommit;
};
export declare const ResponseListSnapshots: {
    encode(message: ResponseListSnapshots, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResponseListSnapshots;
    fromJSON(object: any): ResponseListSnapshots;
    toJSON(message: ResponseListSnapshots): unknown;
    create<I extends {
        snapshots?: {
            height?: number;
            format?: number;
            chunks?: number;
            hash?: Uint8Array;
            metadata?: Uint8Array;
        }[];
    } & {
        snapshots?: {
            height?: number;
            format?: number;
            chunks?: number;
            hash?: Uint8Array;
            metadata?: Uint8Array;
        }[] & ({
            height?: number;
            format?: number;
            chunks?: number;
            hash?: Uint8Array;
            metadata?: Uint8Array;
        } & {
            height?: number;
            format?: number;
            chunks?: number;
            hash?: Uint8Array;
            metadata?: Uint8Array;
        } & { [K in Exclude<keyof I["snapshots"][number], keyof Snapshot>]: never; })[] & { [K_1 in Exclude<keyof I["snapshots"], keyof {
            height?: number;
            format?: number;
            chunks?: number;
            hash?: Uint8Array;
            metadata?: Uint8Array;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, "snapshots">]: never; }>(base?: I): ResponseListSnapshots;
    fromPartial<I_1 extends {
        snapshots?: {
            height?: number;
            format?: number;
            chunks?: number;
            hash?: Uint8Array;
            metadata?: Uint8Array;
        }[];
    } & {
        snapshots?: {
            height?: number;
            format?: number;
            chunks?: number;
            hash?: Uint8Array;
            metadata?: Uint8Array;
        }[] & ({
            height?: number;
            format?: number;
            chunks?: number;
            hash?: Uint8Array;
            metadata?: Uint8Array;
        } & {
            height?: number;
            format?: number;
            chunks?: number;
            hash?: Uint8Array;
            metadata?: Uint8Array;
        } & { [K_3 in Exclude<keyof I_1["snapshots"][number], keyof Snapshot>]: never; })[] & { [K_4 in Exclude<keyof I_1["snapshots"], keyof {
            height?: number;
            format?: number;
            chunks?: number;
            hash?: Uint8Array;
            metadata?: Uint8Array;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, "snapshots">]: never; }>(object: I_1): ResponseListSnapshots;
};
export declare const ResponseOfferSnapshot: {
    encode(message: ResponseOfferSnapshot, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResponseOfferSnapshot;
    fromJSON(object: any): ResponseOfferSnapshot;
    toJSON(message: ResponseOfferSnapshot): unknown;
    create<I extends {
        result?: ResponseOfferSnapshot_Result;
    } & {
        result?: ResponseOfferSnapshot_Result;
    } & { [K in Exclude<keyof I, "result">]: never; }>(base?: I): ResponseOfferSnapshot;
    fromPartial<I_1 extends {
        result?: ResponseOfferSnapshot_Result;
    } & {
        result?: ResponseOfferSnapshot_Result;
    } & { [K_1 in Exclude<keyof I_1, "result">]: never; }>(object: I_1): ResponseOfferSnapshot;
};
export declare const ResponseLoadSnapshotChunk: {
    encode(message: ResponseLoadSnapshotChunk, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResponseLoadSnapshotChunk;
    fromJSON(object: any): ResponseLoadSnapshotChunk;
    toJSON(message: ResponseLoadSnapshotChunk): unknown;
    create<I extends {
        chunk?: Uint8Array;
    } & {
        chunk?: Uint8Array;
    } & { [K in Exclude<keyof I, "chunk">]: never; }>(base?: I): ResponseLoadSnapshotChunk;
    fromPartial<I_1 extends {
        chunk?: Uint8Array;
    } & {
        chunk?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, "chunk">]: never; }>(object: I_1): ResponseLoadSnapshotChunk;
};
export declare const ResponseApplySnapshotChunk: {
    encode(message: ResponseApplySnapshotChunk, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResponseApplySnapshotChunk;
    fromJSON(object: any): ResponseApplySnapshotChunk;
    toJSON(message: ResponseApplySnapshotChunk): unknown;
    create<I extends {
        result?: ResponseApplySnapshotChunk_Result;
        refetchChunks?: number[];
        rejectSenders?: string[];
    } & {
        result?: ResponseApplySnapshotChunk_Result;
        refetchChunks?: number[] & number[] & { [K in Exclude<keyof I["refetchChunks"], keyof number[]>]: never; };
        rejectSenders?: string[] & string[] & { [K_1 in Exclude<keyof I["rejectSenders"], keyof string[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof ResponseApplySnapshotChunk>]: never; }>(base?: I): ResponseApplySnapshotChunk;
    fromPartial<I_1 extends {
        result?: ResponseApplySnapshotChunk_Result;
        refetchChunks?: number[];
        rejectSenders?: string[];
    } & {
        result?: ResponseApplySnapshotChunk_Result;
        refetchChunks?: number[] & number[] & { [K_3 in Exclude<keyof I_1["refetchChunks"], keyof number[]>]: never; };
        rejectSenders?: string[] & string[] & { [K_4 in Exclude<keyof I_1["rejectSenders"], keyof string[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof ResponseApplySnapshotChunk>]: never; }>(object: I_1): ResponseApplySnapshotChunk;
};
export declare const ResponsePrepareProposal: {
    encode(message: ResponsePrepareProposal, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResponsePrepareProposal;
    fromJSON(object: any): ResponsePrepareProposal;
    toJSON(message: ResponsePrepareProposal): unknown;
    create<I extends {
        txs?: Uint8Array[];
    } & {
        txs?: Uint8Array[] & Uint8Array[] & { [K in Exclude<keyof I["txs"], keyof Uint8Array[]>]: never; };
    } & { [K_1 in Exclude<keyof I, "txs">]: never; }>(base?: I): ResponsePrepareProposal;
    fromPartial<I_1 extends {
        txs?: Uint8Array[];
    } & {
        txs?: Uint8Array[] & Uint8Array[] & { [K_2 in Exclude<keyof I_1["txs"], keyof Uint8Array[]>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "txs">]: never; }>(object: I_1): ResponsePrepareProposal;
};
export declare const ResponseProcessProposal: {
    encode(message: ResponseProcessProposal, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResponseProcessProposal;
    fromJSON(object: any): ResponseProcessProposal;
    toJSON(message: ResponseProcessProposal): unknown;
    create<I extends {
        status?: ResponseProcessProposal_ProposalStatus;
    } & {
        status?: ResponseProcessProposal_ProposalStatus;
    } & { [K in Exclude<keyof I, "status">]: never; }>(base?: I): ResponseProcessProposal;
    fromPartial<I_1 extends {
        status?: ResponseProcessProposal_ProposalStatus;
    } & {
        status?: ResponseProcessProposal_ProposalStatus;
    } & { [K_1 in Exclude<keyof I_1, "status">]: never; }>(object: I_1): ResponseProcessProposal;
};
export declare const ResponseExtendVote: {
    encode(message: ResponseExtendVote, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResponseExtendVote;
    fromJSON(object: any): ResponseExtendVote;
    toJSON(message: ResponseExtendVote): unknown;
    create<I extends {
        voteExtension?: Uint8Array;
    } & {
        voteExtension?: Uint8Array;
    } & { [K in Exclude<keyof I, "voteExtension">]: never; }>(base?: I): ResponseExtendVote;
    fromPartial<I_1 extends {
        voteExtension?: Uint8Array;
    } & {
        voteExtension?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, "voteExtension">]: never; }>(object: I_1): ResponseExtendVote;
};
export declare const ResponseVerifyVoteExtension: {
    encode(message: ResponseVerifyVoteExtension, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResponseVerifyVoteExtension;
    fromJSON(object: any): ResponseVerifyVoteExtension;
    toJSON(message: ResponseVerifyVoteExtension): unknown;
    create<I extends {
        status?: ResponseVerifyVoteExtension_VerifyStatus;
    } & {
        status?: ResponseVerifyVoteExtension_VerifyStatus;
    } & { [K in Exclude<keyof I, "status">]: never; }>(base?: I): ResponseVerifyVoteExtension;
    fromPartial<I_1 extends {
        status?: ResponseVerifyVoteExtension_VerifyStatus;
    } & {
        status?: ResponseVerifyVoteExtension_VerifyStatus;
    } & { [K_1 in Exclude<keyof I_1, "status">]: never; }>(object: I_1): ResponseVerifyVoteExtension;
};
export declare const ResponseFinalizeBlock: {
    encode(message: ResponseFinalizeBlock, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResponseFinalizeBlock;
    fromJSON(object: any): ResponseFinalizeBlock;
    toJSON(message: ResponseFinalizeBlock): unknown;
    create<I extends {
        events?: {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        }[];
        txResults?: {
            code?: number;
            data?: Uint8Array;
            log?: string;
            info?: string;
            gasWanted?: number;
            gasUsed?: number;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[];
            codespace?: string;
        }[];
        validatorUpdates?: {
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            };
            power?: number;
        }[];
        consensusParamUpdates?: {
            block?: {
                maxBytes?: number;
                maxGas?: number;
            };
            evidence?: {
                maxAgeNumBlocks?: number;
                maxAgeDuration?: {
                    seconds?: number;
                    nanos?: number;
                };
                maxBytes?: number;
            };
            validator?: {
                pubKeyTypes?: string[];
            };
            version?: {
                app?: number;
            };
            abci?: {
                voteExtensionsEnableHeight?: number;
            };
        };
        appHash?: Uint8Array;
    } & {
        events?: {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        }[] & ({
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        } & {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[] & ({
                key?: string;
                value?: string;
                index?: boolean;
            } & {
                key?: string;
                value?: string;
                index?: boolean;
            } & { [K in Exclude<keyof I["events"][number]["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_1 in Exclude<keyof I["events"][number]["attributes"], keyof {
                key?: string;
                value?: string;
                index?: boolean;
            }[]>]: never; };
        } & { [K_2 in Exclude<keyof I["events"][number], keyof Event>]: never; })[] & { [K_3 in Exclude<keyof I["events"], keyof {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        }[]>]: never; };
        txResults?: {
            code?: number;
            data?: Uint8Array;
            log?: string;
            info?: string;
            gasWanted?: number;
            gasUsed?: number;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[];
            codespace?: string;
        }[] & ({
            code?: number;
            data?: Uint8Array;
            log?: string;
            info?: string;
            gasWanted?: number;
            gasUsed?: number;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[];
            codespace?: string;
        } & {
            code?: number;
            data?: Uint8Array;
            log?: string;
            info?: string;
            gasWanted?: number;
            gasUsed?: number;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[] & ({
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            } & {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[] & ({
                    key?: string;
                    value?: string;
                    index?: boolean;
                } & {
                    key?: string;
                    value?: string;
                    index?: boolean;
                } & { [K_4 in Exclude<keyof I["txResults"][number]["events"][number]["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_5 in Exclude<keyof I["txResults"][number]["events"][number]["attributes"], keyof {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[]>]: never; };
            } & { [K_6 in Exclude<keyof I["txResults"][number]["events"][number], keyof Event>]: never; })[] & { [K_7 in Exclude<keyof I["txResults"][number]["events"], keyof {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[]>]: never; };
            codespace?: string;
        } & { [K_8 in Exclude<keyof I["txResults"][number], keyof ExecTxResult>]: never; })[] & { [K_9 in Exclude<keyof I["txResults"], keyof {
            code?: number;
            data?: Uint8Array;
            log?: string;
            info?: string;
            gasWanted?: number;
            gasUsed?: number;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[];
            codespace?: string;
        }[]>]: never; };
        validatorUpdates?: {
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            };
            power?: number;
        }[] & ({
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            };
            power?: number;
        } & {
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            } & {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            } & { [K_10 in Exclude<keyof I["validatorUpdates"][number]["pubKey"], keyof PublicKey>]: never; };
            power?: number;
        } & { [K_11 in Exclude<keyof I["validatorUpdates"][number], keyof ValidatorUpdate>]: never; })[] & { [K_12 in Exclude<keyof I["validatorUpdates"], keyof {
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            };
            power?: number;
        }[]>]: never; };
        consensusParamUpdates?: {
            block?: {
                maxBytes?: number;
                maxGas?: number;
            };
            evidence?: {
                maxAgeNumBlocks?: number;
                maxAgeDuration?: {
                    seconds?: number;
                    nanos?: number;
                };
                maxBytes?: number;
            };
            validator?: {
                pubKeyTypes?: string[];
            };
            version?: {
                app?: number;
            };
            abci?: {
                voteExtensionsEnableHeight?: number;
            };
        } & {
            block?: {
                maxBytes?: number;
                maxGas?: number;
            } & {
                maxBytes?: number;
                maxGas?: number;
            } & { [K_13 in Exclude<keyof I["consensusParamUpdates"]["block"], keyof import("../types/params").BlockParams>]: never; };
            evidence?: {
                maxAgeNumBlocks?: number;
                maxAgeDuration?: {
                    seconds?: number;
                    nanos?: number;
                };
                maxBytes?: number;
            } & {
                maxAgeNumBlocks?: number;
                maxAgeDuration?: {
                    seconds?: number;
                    nanos?: number;
                } & {
                    seconds?: number;
                    nanos?: number;
                } & { [K_14 in Exclude<keyof I["consensusParamUpdates"]["evidence"]["maxAgeDuration"], keyof import("../../google/protobuf/duration").Duration>]: never; };
                maxBytes?: number;
            } & { [K_15 in Exclude<keyof I["consensusParamUpdates"]["evidence"], keyof import("../types/params").EvidenceParams>]: never; };
            validator?: {
                pubKeyTypes?: string[];
            } & {
                pubKeyTypes?: string[] & string[] & { [K_16 in Exclude<keyof I["consensusParamUpdates"]["validator"]["pubKeyTypes"], keyof string[]>]: never; };
            } & { [K_17 in Exclude<keyof I["consensusParamUpdates"]["validator"], "pubKeyTypes">]: never; };
            version?: {
                app?: number;
            } & {
                app?: number;
            } & { [K_18 in Exclude<keyof I["consensusParamUpdates"]["version"], "app">]: never; };
            abci?: {
                voteExtensionsEnableHeight?: number;
            } & {
                voteExtensionsEnableHeight?: number;
            } & { [K_19 in Exclude<keyof I["consensusParamUpdates"]["abci"], "voteExtensionsEnableHeight">]: never; };
        } & { [K_20 in Exclude<keyof I["consensusParamUpdates"], keyof ConsensusParams>]: never; };
        appHash?: Uint8Array;
    } & { [K_21 in Exclude<keyof I, keyof ResponseFinalizeBlock>]: never; }>(base?: I): ResponseFinalizeBlock;
    fromPartial<I_1 extends {
        events?: {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        }[];
        txResults?: {
            code?: number;
            data?: Uint8Array;
            log?: string;
            info?: string;
            gasWanted?: number;
            gasUsed?: number;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[];
            codespace?: string;
        }[];
        validatorUpdates?: {
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            };
            power?: number;
        }[];
        consensusParamUpdates?: {
            block?: {
                maxBytes?: number;
                maxGas?: number;
            };
            evidence?: {
                maxAgeNumBlocks?: number;
                maxAgeDuration?: {
                    seconds?: number;
                    nanos?: number;
                };
                maxBytes?: number;
            };
            validator?: {
                pubKeyTypes?: string[];
            };
            version?: {
                app?: number;
            };
            abci?: {
                voteExtensionsEnableHeight?: number;
            };
        };
        appHash?: Uint8Array;
    } & {
        events?: {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        }[] & ({
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        } & {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[] & ({
                key?: string;
                value?: string;
                index?: boolean;
            } & {
                key?: string;
                value?: string;
                index?: boolean;
            } & { [K_22 in Exclude<keyof I_1["events"][number]["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_23 in Exclude<keyof I_1["events"][number]["attributes"], keyof {
                key?: string;
                value?: string;
                index?: boolean;
            }[]>]: never; };
        } & { [K_24 in Exclude<keyof I_1["events"][number], keyof Event>]: never; })[] & { [K_25 in Exclude<keyof I_1["events"], keyof {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        }[]>]: never; };
        txResults?: {
            code?: number;
            data?: Uint8Array;
            log?: string;
            info?: string;
            gasWanted?: number;
            gasUsed?: number;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[];
            codespace?: string;
        }[] & ({
            code?: number;
            data?: Uint8Array;
            log?: string;
            info?: string;
            gasWanted?: number;
            gasUsed?: number;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[];
            codespace?: string;
        } & {
            code?: number;
            data?: Uint8Array;
            log?: string;
            info?: string;
            gasWanted?: number;
            gasUsed?: number;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[] & ({
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            } & {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[] & ({
                    key?: string;
                    value?: string;
                    index?: boolean;
                } & {
                    key?: string;
                    value?: string;
                    index?: boolean;
                } & { [K_26 in Exclude<keyof I_1["txResults"][number]["events"][number]["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_27 in Exclude<keyof I_1["txResults"][number]["events"][number]["attributes"], keyof {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[]>]: never; };
            } & { [K_28 in Exclude<keyof I_1["txResults"][number]["events"][number], keyof Event>]: never; })[] & { [K_29 in Exclude<keyof I_1["txResults"][number]["events"], keyof {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[]>]: never; };
            codespace?: string;
        } & { [K_30 in Exclude<keyof I_1["txResults"][number], keyof ExecTxResult>]: never; })[] & { [K_31 in Exclude<keyof I_1["txResults"], keyof {
            code?: number;
            data?: Uint8Array;
            log?: string;
            info?: string;
            gasWanted?: number;
            gasUsed?: number;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[];
            codespace?: string;
        }[]>]: never; };
        validatorUpdates?: {
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            };
            power?: number;
        }[] & ({
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            };
            power?: number;
        } & {
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            } & {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            } & { [K_32 in Exclude<keyof I_1["validatorUpdates"][number]["pubKey"], keyof PublicKey>]: never; };
            power?: number;
        } & { [K_33 in Exclude<keyof I_1["validatorUpdates"][number], keyof ValidatorUpdate>]: never; })[] & { [K_34 in Exclude<keyof I_1["validatorUpdates"], keyof {
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            };
            power?: number;
        }[]>]: never; };
        consensusParamUpdates?: {
            block?: {
                maxBytes?: number;
                maxGas?: number;
            };
            evidence?: {
                maxAgeNumBlocks?: number;
                maxAgeDuration?: {
                    seconds?: number;
                    nanos?: number;
                };
                maxBytes?: number;
            };
            validator?: {
                pubKeyTypes?: string[];
            };
            version?: {
                app?: number;
            };
            abci?: {
                voteExtensionsEnableHeight?: number;
            };
        } & {
            block?: {
                maxBytes?: number;
                maxGas?: number;
            } & {
                maxBytes?: number;
                maxGas?: number;
            } & { [K_35 in Exclude<keyof I_1["consensusParamUpdates"]["block"], keyof import("../types/params").BlockParams>]: never; };
            evidence?: {
                maxAgeNumBlocks?: number;
                maxAgeDuration?: {
                    seconds?: number;
                    nanos?: number;
                };
                maxBytes?: number;
            } & {
                maxAgeNumBlocks?: number;
                maxAgeDuration?: {
                    seconds?: number;
                    nanos?: number;
                } & {
                    seconds?: number;
                    nanos?: number;
                } & { [K_36 in Exclude<keyof I_1["consensusParamUpdates"]["evidence"]["maxAgeDuration"], keyof import("../../google/protobuf/duration").Duration>]: never; };
                maxBytes?: number;
            } & { [K_37 in Exclude<keyof I_1["consensusParamUpdates"]["evidence"], keyof import("../types/params").EvidenceParams>]: never; };
            validator?: {
                pubKeyTypes?: string[];
            } & {
                pubKeyTypes?: string[] & string[] & { [K_38 in Exclude<keyof I_1["consensusParamUpdates"]["validator"]["pubKeyTypes"], keyof string[]>]: never; };
            } & { [K_39 in Exclude<keyof I_1["consensusParamUpdates"]["validator"], "pubKeyTypes">]: never; };
            version?: {
                app?: number;
            } & {
                app?: number;
            } & { [K_40 in Exclude<keyof I_1["consensusParamUpdates"]["version"], "app">]: never; };
            abci?: {
                voteExtensionsEnableHeight?: number;
            } & {
                voteExtensionsEnableHeight?: number;
            } & { [K_41 in Exclude<keyof I_1["consensusParamUpdates"]["abci"], "voteExtensionsEnableHeight">]: never; };
        } & { [K_42 in Exclude<keyof I_1["consensusParamUpdates"], keyof ConsensusParams>]: never; };
        appHash?: Uint8Array;
    } & { [K_43 in Exclude<keyof I_1, keyof ResponseFinalizeBlock>]: never; }>(object: I_1): ResponseFinalizeBlock;
};
export declare const CommitInfo: {
    encode(message: CommitInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): CommitInfo;
    fromJSON(object: any): CommitInfo;
    toJSON(message: CommitInfo): unknown;
    create<I extends {
        round?: number;
        votes?: {
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            blockIdFlag?: BlockIDFlag;
        }[];
    } & {
        round?: number;
        votes?: {
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            blockIdFlag?: BlockIDFlag;
        }[] & ({
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            blockIdFlag?: BlockIDFlag;
        } & {
            validator?: {
                address?: Uint8Array;
                power?: number;
            } & {
                address?: Uint8Array;
                power?: number;
            } & { [K in Exclude<keyof I["votes"][number]["validator"], keyof Validator>]: never; };
            blockIdFlag?: BlockIDFlag;
        } & { [K_1 in Exclude<keyof I["votes"][number], keyof VoteInfo>]: never; })[] & { [K_2 in Exclude<keyof I["votes"], keyof {
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            blockIdFlag?: BlockIDFlag;
        }[]>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof CommitInfo>]: never; }>(base?: I): CommitInfo;
    fromPartial<I_1 extends {
        round?: number;
        votes?: {
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            blockIdFlag?: BlockIDFlag;
        }[];
    } & {
        round?: number;
        votes?: {
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            blockIdFlag?: BlockIDFlag;
        }[] & ({
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            blockIdFlag?: BlockIDFlag;
        } & {
            validator?: {
                address?: Uint8Array;
                power?: number;
            } & {
                address?: Uint8Array;
                power?: number;
            } & { [K_4 in Exclude<keyof I_1["votes"][number]["validator"], keyof Validator>]: never; };
            blockIdFlag?: BlockIDFlag;
        } & { [K_5 in Exclude<keyof I_1["votes"][number], keyof VoteInfo>]: never; })[] & { [K_6 in Exclude<keyof I_1["votes"], keyof {
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            blockIdFlag?: BlockIDFlag;
        }[]>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof CommitInfo>]: never; }>(object: I_1): CommitInfo;
};
export declare const ExtendedCommitInfo: {
    encode(message: ExtendedCommitInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ExtendedCommitInfo;
    fromJSON(object: any): ExtendedCommitInfo;
    toJSON(message: ExtendedCommitInfo): unknown;
    create<I extends {
        round?: number;
        votes?: {
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            voteExtension?: Uint8Array;
            extensionSignature?: Uint8Array;
            blockIdFlag?: BlockIDFlag;
        }[];
    } & {
        round?: number;
        votes?: {
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            voteExtension?: Uint8Array;
            extensionSignature?: Uint8Array;
            blockIdFlag?: BlockIDFlag;
        }[] & ({
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            voteExtension?: Uint8Array;
            extensionSignature?: Uint8Array;
            blockIdFlag?: BlockIDFlag;
        } & {
            validator?: {
                address?: Uint8Array;
                power?: number;
            } & {
                address?: Uint8Array;
                power?: number;
            } & { [K in Exclude<keyof I["votes"][number]["validator"], keyof Validator>]: never; };
            voteExtension?: Uint8Array;
            extensionSignature?: Uint8Array;
            blockIdFlag?: BlockIDFlag;
        } & { [K_1 in Exclude<keyof I["votes"][number], keyof ExtendedVoteInfo>]: never; })[] & { [K_2 in Exclude<keyof I["votes"], keyof {
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            voteExtension?: Uint8Array;
            extensionSignature?: Uint8Array;
            blockIdFlag?: BlockIDFlag;
        }[]>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof ExtendedCommitInfo>]: never; }>(base?: I): ExtendedCommitInfo;
    fromPartial<I_1 extends {
        round?: number;
        votes?: {
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            voteExtension?: Uint8Array;
            extensionSignature?: Uint8Array;
            blockIdFlag?: BlockIDFlag;
        }[];
    } & {
        round?: number;
        votes?: {
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            voteExtension?: Uint8Array;
            extensionSignature?: Uint8Array;
            blockIdFlag?: BlockIDFlag;
        }[] & ({
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            voteExtension?: Uint8Array;
            extensionSignature?: Uint8Array;
            blockIdFlag?: BlockIDFlag;
        } & {
            validator?: {
                address?: Uint8Array;
                power?: number;
            } & {
                address?: Uint8Array;
                power?: number;
            } & { [K_4 in Exclude<keyof I_1["votes"][number]["validator"], keyof Validator>]: never; };
            voteExtension?: Uint8Array;
            extensionSignature?: Uint8Array;
            blockIdFlag?: BlockIDFlag;
        } & { [K_5 in Exclude<keyof I_1["votes"][number], keyof ExtendedVoteInfo>]: never; })[] & { [K_6 in Exclude<keyof I_1["votes"], keyof {
            validator?: {
                address?: Uint8Array;
                power?: number;
            };
            voteExtension?: Uint8Array;
            extensionSignature?: Uint8Array;
            blockIdFlag?: BlockIDFlag;
        }[]>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof ExtendedCommitInfo>]: never; }>(object: I_1): ExtendedCommitInfo;
};
export declare const Event: {
    encode(message: Event, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Event;
    fromJSON(object: any): Event;
    toJSON(message: Event): unknown;
    create<I extends {
        type?: string;
        attributes?: {
            key?: string;
            value?: string;
            index?: boolean;
        }[];
    } & {
        type?: string;
        attributes?: {
            key?: string;
            value?: string;
            index?: boolean;
        }[] & ({
            key?: string;
            value?: string;
            index?: boolean;
        } & {
            key?: string;
            value?: string;
            index?: boolean;
        } & { [K in Exclude<keyof I["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_1 in Exclude<keyof I["attributes"], keyof {
            key?: string;
            value?: string;
            index?: boolean;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof Event>]: never; }>(base?: I): Event;
    fromPartial<I_1 extends {
        type?: string;
        attributes?: {
            key?: string;
            value?: string;
            index?: boolean;
        }[];
    } & {
        type?: string;
        attributes?: {
            key?: string;
            value?: string;
            index?: boolean;
        }[] & ({
            key?: string;
            value?: string;
            index?: boolean;
        } & {
            key?: string;
            value?: string;
            index?: boolean;
        } & { [K_3 in Exclude<keyof I_1["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_4 in Exclude<keyof I_1["attributes"], keyof {
            key?: string;
            value?: string;
            index?: boolean;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof Event>]: never; }>(object: I_1): Event;
};
export declare const EventAttribute: {
    encode(message: EventAttribute, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): EventAttribute;
    fromJSON(object: any): EventAttribute;
    toJSON(message: EventAttribute): unknown;
    create<I extends {
        key?: string;
        value?: string;
        index?: boolean;
    } & {
        key?: string;
        value?: string;
        index?: boolean;
    } & { [K in Exclude<keyof I, keyof EventAttribute>]: never; }>(base?: I): EventAttribute;
    fromPartial<I_1 extends {
        key?: string;
        value?: string;
        index?: boolean;
    } & {
        key?: string;
        value?: string;
        index?: boolean;
    } & { [K_1 in Exclude<keyof I_1, keyof EventAttribute>]: never; }>(object: I_1): EventAttribute;
};
export declare const ExecTxResult: {
    encode(message: ExecTxResult, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ExecTxResult;
    fromJSON(object: any): ExecTxResult;
    toJSON(message: ExecTxResult): unknown;
    create<I extends {
        code?: number;
        data?: Uint8Array;
        log?: string;
        info?: string;
        gasWanted?: number;
        gasUsed?: number;
        events?: {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        }[];
        codespace?: string;
    } & {
        code?: number;
        data?: Uint8Array;
        log?: string;
        info?: string;
        gasWanted?: number;
        gasUsed?: number;
        events?: {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        }[] & ({
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        } & {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[] & ({
                key?: string;
                value?: string;
                index?: boolean;
            } & {
                key?: string;
                value?: string;
                index?: boolean;
            } & { [K in Exclude<keyof I["events"][number]["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_1 in Exclude<keyof I["events"][number]["attributes"], keyof {
                key?: string;
                value?: string;
                index?: boolean;
            }[]>]: never; };
        } & { [K_2 in Exclude<keyof I["events"][number], keyof Event>]: never; })[] & { [K_3 in Exclude<keyof I["events"], keyof {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        }[]>]: never; };
        codespace?: string;
    } & { [K_4 in Exclude<keyof I, keyof ExecTxResult>]: never; }>(base?: I): ExecTxResult;
    fromPartial<I_1 extends {
        code?: number;
        data?: Uint8Array;
        log?: string;
        info?: string;
        gasWanted?: number;
        gasUsed?: number;
        events?: {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        }[];
        codespace?: string;
    } & {
        code?: number;
        data?: Uint8Array;
        log?: string;
        info?: string;
        gasWanted?: number;
        gasUsed?: number;
        events?: {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        }[] & ({
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        } & {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[] & ({
                key?: string;
                value?: string;
                index?: boolean;
            } & {
                key?: string;
                value?: string;
                index?: boolean;
            } & { [K_5 in Exclude<keyof I_1["events"][number]["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_6 in Exclude<keyof I_1["events"][number]["attributes"], keyof {
                key?: string;
                value?: string;
                index?: boolean;
            }[]>]: never; };
        } & { [K_7 in Exclude<keyof I_1["events"][number], keyof Event>]: never; })[] & { [K_8 in Exclude<keyof I_1["events"], keyof {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        }[]>]: never; };
        codespace?: string;
    } & { [K_9 in Exclude<keyof I_1, keyof ExecTxResult>]: never; }>(object: I_1): ExecTxResult;
};
export declare const TxResult: {
    encode(message: TxResult, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): TxResult;
    fromJSON(object: any): TxResult;
    toJSON(message: TxResult): unknown;
    create<I extends {
        height?: number;
        index?: number;
        tx?: Uint8Array;
        result?: {
            code?: number;
            data?: Uint8Array;
            log?: string;
            info?: string;
            gasWanted?: number;
            gasUsed?: number;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[];
            codespace?: string;
        };
    } & {
        height?: number;
        index?: number;
        tx?: Uint8Array;
        result?: {
            code?: number;
            data?: Uint8Array;
            log?: string;
            info?: string;
            gasWanted?: number;
            gasUsed?: number;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[];
            codespace?: string;
        } & {
            code?: number;
            data?: Uint8Array;
            log?: string;
            info?: string;
            gasWanted?: number;
            gasUsed?: number;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[] & ({
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            } & {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[] & ({
                    key?: string;
                    value?: string;
                    index?: boolean;
                } & {
                    key?: string;
                    value?: string;
                    index?: boolean;
                } & { [K in Exclude<keyof I["result"]["events"][number]["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_1 in Exclude<keyof I["result"]["events"][number]["attributes"], keyof {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[]>]: never; };
            } & { [K_2 in Exclude<keyof I["result"]["events"][number], keyof Event>]: never; })[] & { [K_3 in Exclude<keyof I["result"]["events"], keyof {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[]>]: never; };
            codespace?: string;
        } & { [K_4 in Exclude<keyof I["result"], keyof ExecTxResult>]: never; };
    } & { [K_5 in Exclude<keyof I, keyof TxResult>]: never; }>(base?: I): TxResult;
    fromPartial<I_1 extends {
        height?: number;
        index?: number;
        tx?: Uint8Array;
        result?: {
            code?: number;
            data?: Uint8Array;
            log?: string;
            info?: string;
            gasWanted?: number;
            gasUsed?: number;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[];
            codespace?: string;
        };
    } & {
        height?: number;
        index?: number;
        tx?: Uint8Array;
        result?: {
            code?: number;
            data?: Uint8Array;
            log?: string;
            info?: string;
            gasWanted?: number;
            gasUsed?: number;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[];
            codespace?: string;
        } & {
            code?: number;
            data?: Uint8Array;
            log?: string;
            info?: string;
            gasWanted?: number;
            gasUsed?: number;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[] & ({
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            } & {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[] & ({
                    key?: string;
                    value?: string;
                    index?: boolean;
                } & {
                    key?: string;
                    value?: string;
                    index?: boolean;
                } & { [K_6 in Exclude<keyof I_1["result"]["events"][number]["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_7 in Exclude<keyof I_1["result"]["events"][number]["attributes"], keyof {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[]>]: never; };
            } & { [K_8 in Exclude<keyof I_1["result"]["events"][number], keyof Event>]: never; })[] & { [K_9 in Exclude<keyof I_1["result"]["events"], keyof {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[]>]: never; };
            codespace?: string;
        } & { [K_10 in Exclude<keyof I_1["result"], keyof ExecTxResult>]: never; };
    } & { [K_11 in Exclude<keyof I_1, keyof TxResult>]: never; }>(object: I_1): TxResult;
};
export declare const Validator: {
    encode(message: Validator, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Validator;
    fromJSON(object: any): Validator;
    toJSON(message: Validator): unknown;
    create<I extends {
        address?: Uint8Array;
        power?: number;
    } & {
        address?: Uint8Array;
        power?: number;
    } & { [K in Exclude<keyof I, keyof Validator>]: never; }>(base?: I): Validator;
    fromPartial<I_1 extends {
        address?: Uint8Array;
        power?: number;
    } & {
        address?: Uint8Array;
        power?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof Validator>]: never; }>(object: I_1): Validator;
};
export declare const ValidatorUpdate: {
    encode(message: ValidatorUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorUpdate;
    fromJSON(object: any): ValidatorUpdate;
    toJSON(message: ValidatorUpdate): unknown;
    create<I extends {
        pubKey?: {
            ed25519?: Uint8Array;
            secp256k1?: Uint8Array;
        };
        power?: number;
    } & {
        pubKey?: {
            ed25519?: Uint8Array;
            secp256k1?: Uint8Array;
        } & {
            ed25519?: Uint8Array;
            secp256k1?: Uint8Array;
        } & { [K in Exclude<keyof I["pubKey"], keyof PublicKey>]: never; };
        power?: number;
    } & { [K_1 in Exclude<keyof I, keyof ValidatorUpdate>]: never; }>(base?: I): ValidatorUpdate;
    fromPartial<I_1 extends {
        pubKey?: {
            ed25519?: Uint8Array;
            secp256k1?: Uint8Array;
        };
        power?: number;
    } & {
        pubKey?: {
            ed25519?: Uint8Array;
            secp256k1?: Uint8Array;
        } & {
            ed25519?: Uint8Array;
            secp256k1?: Uint8Array;
        } & { [K_2 in Exclude<keyof I_1["pubKey"], keyof PublicKey>]: never; };
        power?: number;
    } & { [K_3 in Exclude<keyof I_1, keyof ValidatorUpdate>]: never; }>(object: I_1): ValidatorUpdate;
};
export declare const VoteInfo: {
    encode(message: VoteInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): VoteInfo;
    fromJSON(object: any): VoteInfo;
    toJSON(message: VoteInfo): unknown;
    create<I extends {
        validator?: {
            address?: Uint8Array;
            power?: number;
        };
        blockIdFlag?: BlockIDFlag;
    } & {
        validator?: {
            address?: Uint8Array;
            power?: number;
        } & {
            address?: Uint8Array;
            power?: number;
        } & { [K in Exclude<keyof I["validator"], keyof Validator>]: never; };
        blockIdFlag?: BlockIDFlag;
    } & { [K_1 in Exclude<keyof I, keyof VoteInfo>]: never; }>(base?: I): VoteInfo;
    fromPartial<I_1 extends {
        validator?: {
            address?: Uint8Array;
            power?: number;
        };
        blockIdFlag?: BlockIDFlag;
    } & {
        validator?: {
            address?: Uint8Array;
            power?: number;
        } & {
            address?: Uint8Array;
            power?: number;
        } & { [K_2 in Exclude<keyof I_1["validator"], keyof Validator>]: never; };
        blockIdFlag?: BlockIDFlag;
    } & { [K_3 in Exclude<keyof I_1, keyof VoteInfo>]: never; }>(object: I_1): VoteInfo;
};
export declare const ExtendedVoteInfo: {
    encode(message: ExtendedVoteInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ExtendedVoteInfo;
    fromJSON(object: any): ExtendedVoteInfo;
    toJSON(message: ExtendedVoteInfo): unknown;
    create<I extends {
        validator?: {
            address?: Uint8Array;
            power?: number;
        };
        voteExtension?: Uint8Array;
        extensionSignature?: Uint8Array;
        blockIdFlag?: BlockIDFlag;
    } & {
        validator?: {
            address?: Uint8Array;
            power?: number;
        } & {
            address?: Uint8Array;
            power?: number;
        } & { [K in Exclude<keyof I["validator"], keyof Validator>]: never; };
        voteExtension?: Uint8Array;
        extensionSignature?: Uint8Array;
        blockIdFlag?: BlockIDFlag;
    } & { [K_1 in Exclude<keyof I, keyof ExtendedVoteInfo>]: never; }>(base?: I): ExtendedVoteInfo;
    fromPartial<I_1 extends {
        validator?: {
            address?: Uint8Array;
            power?: number;
        };
        voteExtension?: Uint8Array;
        extensionSignature?: Uint8Array;
        blockIdFlag?: BlockIDFlag;
    } & {
        validator?: {
            address?: Uint8Array;
            power?: number;
        } & {
            address?: Uint8Array;
            power?: number;
        } & { [K_2 in Exclude<keyof I_1["validator"], keyof Validator>]: never; };
        voteExtension?: Uint8Array;
        extensionSignature?: Uint8Array;
        blockIdFlag?: BlockIDFlag;
    } & { [K_3 in Exclude<keyof I_1, keyof ExtendedVoteInfo>]: never; }>(object: I_1): ExtendedVoteInfo;
};
export declare const Misbehavior: {
    encode(message: Misbehavior, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Misbehavior;
    fromJSON(object: any): Misbehavior;
    toJSON(message: Misbehavior): unknown;
    create<I extends {
        type?: MisbehaviorType;
        validator?: {
            address?: Uint8Array;
            power?: number;
        };
        height?: number;
        time?: Date | undefined;
        totalVotingPower?: number;
    } & {
        type?: MisbehaviorType;
        validator?: {
            address?: Uint8Array;
            power?: number;
        } & {
            address?: Uint8Array;
            power?: number;
        } & { [K in Exclude<keyof I["validator"], keyof Validator>]: never; };
        height?: number;
        time?: Date | undefined;
        totalVotingPower?: number;
    } & { [K_1 in Exclude<keyof I, keyof Misbehavior>]: never; }>(base?: I): Misbehavior;
    fromPartial<I_1 extends {
        type?: MisbehaviorType;
        validator?: {
            address?: Uint8Array;
            power?: number;
        };
        height?: number;
        time?: Date | undefined;
        totalVotingPower?: number;
    } & {
        type?: MisbehaviorType;
        validator?: {
            address?: Uint8Array;
            power?: number;
        } & {
            address?: Uint8Array;
            power?: number;
        } & { [K_2 in Exclude<keyof I_1["validator"], keyof Validator>]: never; };
        height?: number;
        time?: Date | undefined;
        totalVotingPower?: number;
    } & { [K_3 in Exclude<keyof I_1, keyof Misbehavior>]: never; }>(object: I_1): Misbehavior;
};
export declare const Snapshot: {
    encode(message: Snapshot, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Snapshot;
    fromJSON(object: any): Snapshot;
    toJSON(message: Snapshot): unknown;
    create<I extends {
        height?: number;
        format?: number;
        chunks?: number;
        hash?: Uint8Array;
        metadata?: Uint8Array;
    } & {
        height?: number;
        format?: number;
        chunks?: number;
        hash?: Uint8Array;
        metadata?: Uint8Array;
    } & { [K in Exclude<keyof I, keyof Snapshot>]: never; }>(base?: I): Snapshot;
    fromPartial<I_1 extends {
        height?: number;
        format?: number;
        chunks?: number;
        hash?: Uint8Array;
        metadata?: Uint8Array;
    } & {
        height?: number;
        format?: number;
        chunks?: number;
        hash?: Uint8Array;
        metadata?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, keyof Snapshot>]: never; }>(object: I_1): Snapshot;
};
export interface ABCI {
    Echo(request: RequestEcho): Promise<ResponseEcho>;
    Flush(request: RequestFlush): Promise<ResponseFlush>;
    Info(request: RequestInfo): Promise<ResponseInfo>;
    CheckTx(request: RequestCheckTx): Promise<ResponseCheckTx>;
    Query(request: RequestQuery): Promise<ResponseQuery>;
    Commit(request: RequestCommit): Promise<ResponseCommit>;
    InitChain(request: RequestInitChain): Promise<ResponseInitChain>;
    ListSnapshots(request: RequestListSnapshots): Promise<ResponseListSnapshots>;
    OfferSnapshot(request: RequestOfferSnapshot): Promise<ResponseOfferSnapshot>;
    LoadSnapshotChunk(request: RequestLoadSnapshotChunk): Promise<ResponseLoadSnapshotChunk>;
    ApplySnapshotChunk(request: RequestApplySnapshotChunk): Promise<ResponseApplySnapshotChunk>;
    PrepareProposal(request: RequestPrepareProposal): Promise<ResponsePrepareProposal>;
    ProcessProposal(request: RequestProcessProposal): Promise<ResponseProcessProposal>;
    ExtendVote(request: RequestExtendVote): Promise<ResponseExtendVote>;
    VerifyVoteExtension(request: RequestVerifyVoteExtension): Promise<ResponseVerifyVoteExtension>;
    FinalizeBlock(request: RequestFinalizeBlock): Promise<ResponseFinalizeBlock>;
}
export declare const ABCIServiceName = "tendermint.abci.ABCI";
export declare class ABCIClientImpl implements ABCI {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    Echo(request: RequestEcho): Promise<ResponseEcho>;
    Flush(request: RequestFlush): Promise<ResponseFlush>;
    Info(request: RequestInfo): Promise<ResponseInfo>;
    CheckTx(request: RequestCheckTx): Promise<ResponseCheckTx>;
    Query(request: RequestQuery): Promise<ResponseQuery>;
    Commit(request: RequestCommit): Promise<ResponseCommit>;
    InitChain(request: RequestInitChain): Promise<ResponseInitChain>;
    ListSnapshots(request: RequestListSnapshots): Promise<ResponseListSnapshots>;
    OfferSnapshot(request: RequestOfferSnapshot): Promise<ResponseOfferSnapshot>;
    LoadSnapshotChunk(request: RequestLoadSnapshotChunk): Promise<ResponseLoadSnapshotChunk>;
    ApplySnapshotChunk(request: RequestApplySnapshotChunk): Promise<ResponseApplySnapshotChunk>;
    PrepareProposal(request: RequestPrepareProposal): Promise<ResponsePrepareProposal>;
    ProcessProposal(request: RequestProcessProposal): Promise<ResponseProcessProposal>;
    ExtendVote(request: RequestExtendVote): Promise<ResponseExtendVote>;
    VerifyVoteExtension(request: RequestVerifyVoteExtension): Promise<ResponseVerifyVoteExtension>;
    FinalizeBlock(request: RequestFinalizeBlock): Promise<ResponseFinalizeBlock>;
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
