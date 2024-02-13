/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";
import { PublicKey } from "../crypto/keys";
import { ProofOps } from "../crypto/proof";
import { ConsensusParams } from "../types/params";
import { BlockIDFlag, blockIDFlagFromJSON, blockIDFlagToJSON } from "../types/validator";

export const protobufPackage = "tendermint.abci";

export enum CheckTxType {
  NEW = 0,
  RECHECK = 1,
  UNRECOGNIZED = -1,
}

export function checkTxTypeFromJSON(object: any): CheckTxType {
  switch (object) {
    case 0:
    case "NEW":
      return CheckTxType.NEW;
    case 1:
    case "RECHECK":
      return CheckTxType.RECHECK;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CheckTxType.UNRECOGNIZED;
  }
}

export function checkTxTypeToJSON(object: CheckTxType): string {
  switch (object) {
    case CheckTxType.NEW:
      return "NEW";
    case CheckTxType.RECHECK:
      return "RECHECK";
    case CheckTxType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum MisbehaviorType {
  UNKNOWN = 0,
  DUPLICATE_VOTE = 1,
  LIGHT_CLIENT_ATTACK = 2,
  UNRECOGNIZED = -1,
}

export function misbehaviorTypeFromJSON(object: any): MisbehaviorType {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return MisbehaviorType.UNKNOWN;
    case 1:
    case "DUPLICATE_VOTE":
      return MisbehaviorType.DUPLICATE_VOTE;
    case 2:
    case "LIGHT_CLIENT_ATTACK":
      return MisbehaviorType.LIGHT_CLIENT_ATTACK;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MisbehaviorType.UNRECOGNIZED;
  }
}

export function misbehaviorTypeToJSON(object: MisbehaviorType): string {
  switch (object) {
    case MisbehaviorType.UNKNOWN:
      return "UNKNOWN";
    case MisbehaviorType.DUPLICATE_VOTE:
      return "DUPLICATE_VOTE";
    case MisbehaviorType.LIGHT_CLIENT_ATTACK:
      return "LIGHT_CLIENT_ATTACK";
    case MisbehaviorType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

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
  snapshot:
    | Snapshot
    | undefined;
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

export enum ResponseOfferSnapshot_Result {
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
  UNRECOGNIZED = -1,
}

export function responseOfferSnapshot_ResultFromJSON(object: any): ResponseOfferSnapshot_Result {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return ResponseOfferSnapshot_Result.UNKNOWN;
    case 1:
    case "ACCEPT":
      return ResponseOfferSnapshot_Result.ACCEPT;
    case 2:
    case "ABORT":
      return ResponseOfferSnapshot_Result.ABORT;
    case 3:
    case "REJECT":
      return ResponseOfferSnapshot_Result.REJECT;
    case 4:
    case "REJECT_FORMAT":
      return ResponseOfferSnapshot_Result.REJECT_FORMAT;
    case 5:
    case "REJECT_SENDER":
      return ResponseOfferSnapshot_Result.REJECT_SENDER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ResponseOfferSnapshot_Result.UNRECOGNIZED;
  }
}

export function responseOfferSnapshot_ResultToJSON(object: ResponseOfferSnapshot_Result): string {
  switch (object) {
    case ResponseOfferSnapshot_Result.UNKNOWN:
      return "UNKNOWN";
    case ResponseOfferSnapshot_Result.ACCEPT:
      return "ACCEPT";
    case ResponseOfferSnapshot_Result.ABORT:
      return "ABORT";
    case ResponseOfferSnapshot_Result.REJECT:
      return "REJECT";
    case ResponseOfferSnapshot_Result.REJECT_FORMAT:
      return "REJECT_FORMAT";
    case ResponseOfferSnapshot_Result.REJECT_SENDER:
      return "REJECT_SENDER";
    case ResponseOfferSnapshot_Result.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

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

export enum ResponseApplySnapshotChunk_Result {
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
  UNRECOGNIZED = -1,
}

export function responseApplySnapshotChunk_ResultFromJSON(object: any): ResponseApplySnapshotChunk_Result {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return ResponseApplySnapshotChunk_Result.UNKNOWN;
    case 1:
    case "ACCEPT":
      return ResponseApplySnapshotChunk_Result.ACCEPT;
    case 2:
    case "ABORT":
      return ResponseApplySnapshotChunk_Result.ABORT;
    case 3:
    case "RETRY":
      return ResponseApplySnapshotChunk_Result.RETRY;
    case 4:
    case "RETRY_SNAPSHOT":
      return ResponseApplySnapshotChunk_Result.RETRY_SNAPSHOT;
    case 5:
    case "REJECT_SNAPSHOT":
      return ResponseApplySnapshotChunk_Result.REJECT_SNAPSHOT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ResponseApplySnapshotChunk_Result.UNRECOGNIZED;
  }
}

export function responseApplySnapshotChunk_ResultToJSON(object: ResponseApplySnapshotChunk_Result): string {
  switch (object) {
    case ResponseApplySnapshotChunk_Result.UNKNOWN:
      return "UNKNOWN";
    case ResponseApplySnapshotChunk_Result.ACCEPT:
      return "ACCEPT";
    case ResponseApplySnapshotChunk_Result.ABORT:
      return "ABORT";
    case ResponseApplySnapshotChunk_Result.RETRY:
      return "RETRY";
    case ResponseApplySnapshotChunk_Result.RETRY_SNAPSHOT:
      return "RETRY_SNAPSHOT";
    case ResponseApplySnapshotChunk_Result.REJECT_SNAPSHOT:
      return "REJECT_SNAPSHOT";
    case ResponseApplySnapshotChunk_Result.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ResponsePrepareProposal {
  txs: Uint8Array[];
}

export interface ResponseProcessProposal {
  status: ResponseProcessProposal_ProposalStatus;
}

export enum ResponseProcessProposal_ProposalStatus {
  UNKNOWN = 0,
  ACCEPT = 1,
  REJECT = 2,
  UNRECOGNIZED = -1,
}

export function responseProcessProposal_ProposalStatusFromJSON(object: any): ResponseProcessProposal_ProposalStatus {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return ResponseProcessProposal_ProposalStatus.UNKNOWN;
    case 1:
    case "ACCEPT":
      return ResponseProcessProposal_ProposalStatus.ACCEPT;
    case 2:
    case "REJECT":
      return ResponseProcessProposal_ProposalStatus.REJECT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ResponseProcessProposal_ProposalStatus.UNRECOGNIZED;
  }
}

export function responseProcessProposal_ProposalStatusToJSON(object: ResponseProcessProposal_ProposalStatus): string {
  switch (object) {
    case ResponseProcessProposal_ProposalStatus.UNKNOWN:
      return "UNKNOWN";
    case ResponseProcessProposal_ProposalStatus.ACCEPT:
      return "ACCEPT";
    case ResponseProcessProposal_ProposalStatus.REJECT:
      return "REJECT";
    case ResponseProcessProposal_ProposalStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ResponseExtendVote {
  voteExtension: Uint8Array;
}

export interface ResponseVerifyVoteExtension {
  status: ResponseVerifyVoteExtension_VerifyStatus;
}

export enum ResponseVerifyVoteExtension_VerifyStatus {
  UNKNOWN = 0,
  ACCEPT = 1,
  /**
   * REJECT - Rejecting the vote extension will reject the entire precommit by the sender.
   * Incorrectly implementing this thus has liveness implications as it may affect
   * CometBFT's ability to receive 2/3+ valid votes to finalize the block.
   * Honest nodes should never be rejected.
   */
  REJECT = 2,
  UNRECOGNIZED = -1,
}

export function responseVerifyVoteExtension_VerifyStatusFromJSON(
  object: any,
): ResponseVerifyVoteExtension_VerifyStatus {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return ResponseVerifyVoteExtension_VerifyStatus.UNKNOWN;
    case 1:
    case "ACCEPT":
      return ResponseVerifyVoteExtension_VerifyStatus.ACCEPT;
    case 2:
    case "REJECT":
      return ResponseVerifyVoteExtension_VerifyStatus.REJECT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ResponseVerifyVoteExtension_VerifyStatus.UNRECOGNIZED;
  }
}

export function responseVerifyVoteExtension_VerifyStatusToJSON(
  object: ResponseVerifyVoteExtension_VerifyStatus,
): string {
  switch (object) {
    case ResponseVerifyVoteExtension_VerifyStatus.UNKNOWN:
      return "UNKNOWN";
    case ResponseVerifyVoteExtension_VerifyStatus.ACCEPT:
      return "ACCEPT";
    case ResponseVerifyVoteExtension_VerifyStatus.REJECT:
      return "REJECT";
    case ResponseVerifyVoteExtension_VerifyStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

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
  consensusParamUpdates:
    | ConsensusParams
    | undefined;
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
  validator:
    | Validator
    | undefined;
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
  validator:
    | Validator
    | undefined;
  /** The height when the offense occurred */
  height: number;
  /** The corresponding time where the offense occurred */
  time:
    | Date
    | undefined;
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

function createBaseRequest(): Request {
  return {
    echo: undefined,
    flush: undefined,
    info: undefined,
    initChain: undefined,
    query: undefined,
    checkTx: undefined,
    commit: undefined,
    listSnapshots: undefined,
    offerSnapshot: undefined,
    loadSnapshotChunk: undefined,
    applySnapshotChunk: undefined,
    prepareProposal: undefined,
    processProposal: undefined,
    extendVote: undefined,
    verifyVoteExtension: undefined,
    finalizeBlock: undefined,
  };
}

export const Request = {
  encode(message: Request, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.echo !== undefined) {
      RequestEcho.encode(message.echo, writer.uint32(10).fork()).ldelim();
    }
    if (message.flush !== undefined) {
      RequestFlush.encode(message.flush, writer.uint32(18).fork()).ldelim();
    }
    if (message.info !== undefined) {
      RequestInfo.encode(message.info, writer.uint32(26).fork()).ldelim();
    }
    if (message.initChain !== undefined) {
      RequestInitChain.encode(message.initChain, writer.uint32(42).fork()).ldelim();
    }
    if (message.query !== undefined) {
      RequestQuery.encode(message.query, writer.uint32(50).fork()).ldelim();
    }
    if (message.checkTx !== undefined) {
      RequestCheckTx.encode(message.checkTx, writer.uint32(66).fork()).ldelim();
    }
    if (message.commit !== undefined) {
      RequestCommit.encode(message.commit, writer.uint32(90).fork()).ldelim();
    }
    if (message.listSnapshots !== undefined) {
      RequestListSnapshots.encode(message.listSnapshots, writer.uint32(98).fork()).ldelim();
    }
    if (message.offerSnapshot !== undefined) {
      RequestOfferSnapshot.encode(message.offerSnapshot, writer.uint32(106).fork()).ldelim();
    }
    if (message.loadSnapshotChunk !== undefined) {
      RequestLoadSnapshotChunk.encode(message.loadSnapshotChunk, writer.uint32(114).fork()).ldelim();
    }
    if (message.applySnapshotChunk !== undefined) {
      RequestApplySnapshotChunk.encode(message.applySnapshotChunk, writer.uint32(122).fork()).ldelim();
    }
    if (message.prepareProposal !== undefined) {
      RequestPrepareProposal.encode(message.prepareProposal, writer.uint32(130).fork()).ldelim();
    }
    if (message.processProposal !== undefined) {
      RequestProcessProposal.encode(message.processProposal, writer.uint32(138).fork()).ldelim();
    }
    if (message.extendVote !== undefined) {
      RequestExtendVote.encode(message.extendVote, writer.uint32(146).fork()).ldelim();
    }
    if (message.verifyVoteExtension !== undefined) {
      RequestVerifyVoteExtension.encode(message.verifyVoteExtension, writer.uint32(154).fork()).ldelim();
    }
    if (message.finalizeBlock !== undefined) {
      RequestFinalizeBlock.encode(message.finalizeBlock, writer.uint32(162).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Request {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.echo = RequestEcho.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.flush = RequestFlush.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.info = RequestInfo.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.initChain = RequestInitChain.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.query = RequestQuery.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.checkTx = RequestCheckTx.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.commit = RequestCommit.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.listSnapshots = RequestListSnapshots.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.offerSnapshot = RequestOfferSnapshot.decode(reader, reader.uint32());
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.loadSnapshotChunk = RequestLoadSnapshotChunk.decode(reader, reader.uint32());
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.applySnapshotChunk = RequestApplySnapshotChunk.decode(reader, reader.uint32());
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.prepareProposal = RequestPrepareProposal.decode(reader, reader.uint32());
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.processProposal = RequestProcessProposal.decode(reader, reader.uint32());
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.extendVote = RequestExtendVote.decode(reader, reader.uint32());
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.verifyVoteExtension = RequestVerifyVoteExtension.decode(reader, reader.uint32());
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }

          message.finalizeBlock = RequestFinalizeBlock.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Request {
    return {
      echo: isSet(object.echo) ? RequestEcho.fromJSON(object.echo) : undefined,
      flush: isSet(object.flush) ? RequestFlush.fromJSON(object.flush) : undefined,
      info: isSet(object.info) ? RequestInfo.fromJSON(object.info) : undefined,
      initChain: isSet(object.initChain) ? RequestInitChain.fromJSON(object.initChain) : undefined,
      query: isSet(object.query) ? RequestQuery.fromJSON(object.query) : undefined,
      checkTx: isSet(object.checkTx) ? RequestCheckTx.fromJSON(object.checkTx) : undefined,
      commit: isSet(object.commit) ? RequestCommit.fromJSON(object.commit) : undefined,
      listSnapshots: isSet(object.listSnapshots) ? RequestListSnapshots.fromJSON(object.listSnapshots) : undefined,
      offerSnapshot: isSet(object.offerSnapshot) ? RequestOfferSnapshot.fromJSON(object.offerSnapshot) : undefined,
      loadSnapshotChunk: isSet(object.loadSnapshotChunk)
        ? RequestLoadSnapshotChunk.fromJSON(object.loadSnapshotChunk)
        : undefined,
      applySnapshotChunk: isSet(object.applySnapshotChunk)
        ? RequestApplySnapshotChunk.fromJSON(object.applySnapshotChunk)
        : undefined,
      prepareProposal: isSet(object.prepareProposal)
        ? RequestPrepareProposal.fromJSON(object.prepareProposal)
        : undefined,
      processProposal: isSet(object.processProposal)
        ? RequestProcessProposal.fromJSON(object.processProposal)
        : undefined,
      extendVote: isSet(object.extendVote) ? RequestExtendVote.fromJSON(object.extendVote) : undefined,
      verifyVoteExtension: isSet(object.verifyVoteExtension)
        ? RequestVerifyVoteExtension.fromJSON(object.verifyVoteExtension)
        : undefined,
      finalizeBlock: isSet(object.finalizeBlock) ? RequestFinalizeBlock.fromJSON(object.finalizeBlock) : undefined,
    };
  },

  toJSON(message: Request): unknown {
    const obj: any = {};
    if (message.echo !== undefined) {
      obj.echo = RequestEcho.toJSON(message.echo);
    }
    if (message.flush !== undefined) {
      obj.flush = RequestFlush.toJSON(message.flush);
    }
    if (message.info !== undefined) {
      obj.info = RequestInfo.toJSON(message.info);
    }
    if (message.initChain !== undefined) {
      obj.initChain = RequestInitChain.toJSON(message.initChain);
    }
    if (message.query !== undefined) {
      obj.query = RequestQuery.toJSON(message.query);
    }
    if (message.checkTx !== undefined) {
      obj.checkTx = RequestCheckTx.toJSON(message.checkTx);
    }
    if (message.commit !== undefined) {
      obj.commit = RequestCommit.toJSON(message.commit);
    }
    if (message.listSnapshots !== undefined) {
      obj.listSnapshots = RequestListSnapshots.toJSON(message.listSnapshots);
    }
    if (message.offerSnapshot !== undefined) {
      obj.offerSnapshot = RequestOfferSnapshot.toJSON(message.offerSnapshot);
    }
    if (message.loadSnapshotChunk !== undefined) {
      obj.loadSnapshotChunk = RequestLoadSnapshotChunk.toJSON(message.loadSnapshotChunk);
    }
    if (message.applySnapshotChunk !== undefined) {
      obj.applySnapshotChunk = RequestApplySnapshotChunk.toJSON(message.applySnapshotChunk);
    }
    if (message.prepareProposal !== undefined) {
      obj.prepareProposal = RequestPrepareProposal.toJSON(message.prepareProposal);
    }
    if (message.processProposal !== undefined) {
      obj.processProposal = RequestProcessProposal.toJSON(message.processProposal);
    }
    if (message.extendVote !== undefined) {
      obj.extendVote = RequestExtendVote.toJSON(message.extendVote);
    }
    if (message.verifyVoteExtension !== undefined) {
      obj.verifyVoteExtension = RequestVerifyVoteExtension.toJSON(message.verifyVoteExtension);
    }
    if (message.finalizeBlock !== undefined) {
      obj.finalizeBlock = RequestFinalizeBlock.toJSON(message.finalizeBlock);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Request>, I>>(base?: I): Request {
    return Request.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Request>, I>>(object: I): Request {
    const message = createBaseRequest();
    message.echo = (object.echo !== undefined && object.echo !== null)
      ? RequestEcho.fromPartial(object.echo)
      : undefined;
    message.flush = (object.flush !== undefined && object.flush !== null)
      ? RequestFlush.fromPartial(object.flush)
      : undefined;
    message.info = (object.info !== undefined && object.info !== null)
      ? RequestInfo.fromPartial(object.info)
      : undefined;
    message.initChain = (object.initChain !== undefined && object.initChain !== null)
      ? RequestInitChain.fromPartial(object.initChain)
      : undefined;
    message.query = (object.query !== undefined && object.query !== null)
      ? RequestQuery.fromPartial(object.query)
      : undefined;
    message.checkTx = (object.checkTx !== undefined && object.checkTx !== null)
      ? RequestCheckTx.fromPartial(object.checkTx)
      : undefined;
    message.commit = (object.commit !== undefined && object.commit !== null)
      ? RequestCommit.fromPartial(object.commit)
      : undefined;
    message.listSnapshots = (object.listSnapshots !== undefined && object.listSnapshots !== null)
      ? RequestListSnapshots.fromPartial(object.listSnapshots)
      : undefined;
    message.offerSnapshot = (object.offerSnapshot !== undefined && object.offerSnapshot !== null)
      ? RequestOfferSnapshot.fromPartial(object.offerSnapshot)
      : undefined;
    message.loadSnapshotChunk = (object.loadSnapshotChunk !== undefined && object.loadSnapshotChunk !== null)
      ? RequestLoadSnapshotChunk.fromPartial(object.loadSnapshotChunk)
      : undefined;
    message.applySnapshotChunk = (object.applySnapshotChunk !== undefined && object.applySnapshotChunk !== null)
      ? RequestApplySnapshotChunk.fromPartial(object.applySnapshotChunk)
      : undefined;
    message.prepareProposal = (object.prepareProposal !== undefined && object.prepareProposal !== null)
      ? RequestPrepareProposal.fromPartial(object.prepareProposal)
      : undefined;
    message.processProposal = (object.processProposal !== undefined && object.processProposal !== null)
      ? RequestProcessProposal.fromPartial(object.processProposal)
      : undefined;
    message.extendVote = (object.extendVote !== undefined && object.extendVote !== null)
      ? RequestExtendVote.fromPartial(object.extendVote)
      : undefined;
    message.verifyVoteExtension = (object.verifyVoteExtension !== undefined && object.verifyVoteExtension !== null)
      ? RequestVerifyVoteExtension.fromPartial(object.verifyVoteExtension)
      : undefined;
    message.finalizeBlock = (object.finalizeBlock !== undefined && object.finalizeBlock !== null)
      ? RequestFinalizeBlock.fromPartial(object.finalizeBlock)
      : undefined;
    return message;
  },
};

function createBaseRequestEcho(): RequestEcho {
  return { message: "" };
}

export const RequestEcho = {
  encode(message: RequestEcho, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestEcho {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestEcho();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestEcho {
    return { message: isSet(object.message) ? String(object.message) : "" };
  },

  toJSON(message: RequestEcho): unknown {
    const obj: any = {};
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestEcho>, I>>(base?: I): RequestEcho {
    return RequestEcho.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestEcho>, I>>(object: I): RequestEcho {
    const message = createBaseRequestEcho();
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseRequestFlush(): RequestFlush {
  return {};
}

export const RequestFlush = {
  encode(_: RequestFlush, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestFlush {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestFlush();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): RequestFlush {
    return {};
  },

  toJSON(_: RequestFlush): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestFlush>, I>>(base?: I): RequestFlush {
    return RequestFlush.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestFlush>, I>>(_: I): RequestFlush {
    const message = createBaseRequestFlush();
    return message;
  },
};

function createBaseRequestInfo(): RequestInfo {
  return { version: "", blockVersion: 0, p2pVersion: 0, abciVersion: "" };
}

export const RequestInfo = {
  encode(message: RequestInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.version !== "") {
      writer.uint32(10).string(message.version);
    }
    if (message.blockVersion !== 0) {
      writer.uint32(16).uint64(message.blockVersion);
    }
    if (message.p2pVersion !== 0) {
      writer.uint32(24).uint64(message.p2pVersion);
    }
    if (message.abciVersion !== "") {
      writer.uint32(34).string(message.abciVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.version = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.blockVersion = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.p2pVersion = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.abciVersion = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestInfo {
    return {
      version: isSet(object.version) ? String(object.version) : "",
      blockVersion: isSet(object.blockVersion) ? Number(object.blockVersion) : 0,
      p2pVersion: isSet(object.p2pVersion) ? Number(object.p2pVersion) : 0,
      abciVersion: isSet(object.abciVersion) ? String(object.abciVersion) : "",
    };
  },

  toJSON(message: RequestInfo): unknown {
    const obj: any = {};
    if (message.version !== "") {
      obj.version = message.version;
    }
    if (message.blockVersion !== 0) {
      obj.blockVersion = Math.round(message.blockVersion);
    }
    if (message.p2pVersion !== 0) {
      obj.p2pVersion = Math.round(message.p2pVersion);
    }
    if (message.abciVersion !== "") {
      obj.abciVersion = message.abciVersion;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestInfo>, I>>(base?: I): RequestInfo {
    return RequestInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestInfo>, I>>(object: I): RequestInfo {
    const message = createBaseRequestInfo();
    message.version = object.version ?? "";
    message.blockVersion = object.blockVersion ?? 0;
    message.p2pVersion = object.p2pVersion ?? 0;
    message.abciVersion = object.abciVersion ?? "";
    return message;
  },
};

function createBaseRequestInitChain(): RequestInitChain {
  return {
    time: undefined,
    chainId: "",
    consensusParams: undefined,
    validators: [],
    appStateBytes: new Uint8Array(0),
    initialHeight: 0,
  };
}

export const RequestInitChain = {
  encode(message: RequestInitChain, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.time !== undefined) {
      Timestamp.encode(toTimestamp(message.time), writer.uint32(10).fork()).ldelim();
    }
    if (message.chainId !== "") {
      writer.uint32(18).string(message.chainId);
    }
    if (message.consensusParams !== undefined) {
      ConsensusParams.encode(message.consensusParams, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.validators) {
      ValidatorUpdate.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.appStateBytes.length !== 0) {
      writer.uint32(42).bytes(message.appStateBytes);
    }
    if (message.initialHeight !== 0) {
      writer.uint32(48).int64(message.initialHeight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestInitChain {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestInitChain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.chainId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.consensusParams = ConsensusParams.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.validators.push(ValidatorUpdate.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.appStateBytes = reader.bytes();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.initialHeight = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestInitChain {
    return {
      time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
      chainId: isSet(object.chainId) ? String(object.chainId) : "",
      consensusParams: isSet(object.consensusParams) ? ConsensusParams.fromJSON(object.consensusParams) : undefined,
      validators: Array.isArray(object?.validators)
        ? object.validators.map((e: any) => ValidatorUpdate.fromJSON(e))
        : [],
      appStateBytes: isSet(object.appStateBytes) ? bytesFromBase64(object.appStateBytes) : new Uint8Array(0),
      initialHeight: isSet(object.initialHeight) ? Number(object.initialHeight) : 0,
    };
  },

  toJSON(message: RequestInitChain): unknown {
    const obj: any = {};
    if (message.time !== undefined) {
      obj.time = message.time.toISOString();
    }
    if (message.chainId !== "") {
      obj.chainId = message.chainId;
    }
    if (message.consensusParams !== undefined) {
      obj.consensusParams = ConsensusParams.toJSON(message.consensusParams);
    }
    if (message.validators?.length) {
      obj.validators = message.validators.map((e) => ValidatorUpdate.toJSON(e));
    }
    if (message.appStateBytes.length !== 0) {
      obj.appStateBytes = base64FromBytes(message.appStateBytes);
    }
    if (message.initialHeight !== 0) {
      obj.initialHeight = Math.round(message.initialHeight);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestInitChain>, I>>(base?: I): RequestInitChain {
    return RequestInitChain.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestInitChain>, I>>(object: I): RequestInitChain {
    const message = createBaseRequestInitChain();
    message.time = object.time ?? undefined;
    message.chainId = object.chainId ?? "";
    message.consensusParams = (object.consensusParams !== undefined && object.consensusParams !== null)
      ? ConsensusParams.fromPartial(object.consensusParams)
      : undefined;
    message.validators = object.validators?.map((e) => ValidatorUpdate.fromPartial(e)) || [];
    message.appStateBytes = object.appStateBytes ?? new Uint8Array(0);
    message.initialHeight = object.initialHeight ?? 0;
    return message;
  },
};

function createBaseRequestQuery(): RequestQuery {
  return { data: new Uint8Array(0), path: "", height: 0, prove: false };
}

export const RequestQuery = {
  encode(message: RequestQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    if (message.path !== "") {
      writer.uint32(18).string(message.path);
    }
    if (message.height !== 0) {
      writer.uint32(24).int64(message.height);
    }
    if (message.prove === true) {
      writer.uint32(32).bool(message.prove);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.data = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.path = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.height = longToNumber(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.prove = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestQuery {
    return {
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
      path: isSet(object.path) ? String(object.path) : "",
      height: isSet(object.height) ? Number(object.height) : 0,
      prove: isSet(object.prove) ? Boolean(object.prove) : false,
    };
  },

  toJSON(message: RequestQuery): unknown {
    const obj: any = {};
    if (message.data.length !== 0) {
      obj.data = base64FromBytes(message.data);
    }
    if (message.path !== "") {
      obj.path = message.path;
    }
    if (message.height !== 0) {
      obj.height = Math.round(message.height);
    }
    if (message.prove === true) {
      obj.prove = message.prove;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestQuery>, I>>(base?: I): RequestQuery {
    return RequestQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestQuery>, I>>(object: I): RequestQuery {
    const message = createBaseRequestQuery();
    message.data = object.data ?? new Uint8Array(0);
    message.path = object.path ?? "";
    message.height = object.height ?? 0;
    message.prove = object.prove ?? false;
    return message;
  },
};

function createBaseRequestCheckTx(): RequestCheckTx {
  return { tx: new Uint8Array(0), type: 0 };
}

export const RequestCheckTx = {
  encode(message: RequestCheckTx, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tx.length !== 0) {
      writer.uint32(10).bytes(message.tx);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestCheckTx {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestCheckTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tx = reader.bytes();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestCheckTx {
    return {
      tx: isSet(object.tx) ? bytesFromBase64(object.tx) : new Uint8Array(0),
      type: isSet(object.type) ? checkTxTypeFromJSON(object.type) : 0,
    };
  },

  toJSON(message: RequestCheckTx): unknown {
    const obj: any = {};
    if (message.tx.length !== 0) {
      obj.tx = base64FromBytes(message.tx);
    }
    if (message.type !== 0) {
      obj.type = checkTxTypeToJSON(message.type);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestCheckTx>, I>>(base?: I): RequestCheckTx {
    return RequestCheckTx.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestCheckTx>, I>>(object: I): RequestCheckTx {
    const message = createBaseRequestCheckTx();
    message.tx = object.tx ?? new Uint8Array(0);
    message.type = object.type ?? 0;
    return message;
  },
};

function createBaseRequestCommit(): RequestCommit {
  return {};
}

export const RequestCommit = {
  encode(_: RequestCommit, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestCommit {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestCommit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): RequestCommit {
    return {};
  },

  toJSON(_: RequestCommit): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestCommit>, I>>(base?: I): RequestCommit {
    return RequestCommit.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestCommit>, I>>(_: I): RequestCommit {
    const message = createBaseRequestCommit();
    return message;
  },
};

function createBaseRequestListSnapshots(): RequestListSnapshots {
  return {};
}

export const RequestListSnapshots = {
  encode(_: RequestListSnapshots, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestListSnapshots {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestListSnapshots();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): RequestListSnapshots {
    return {};
  },

  toJSON(_: RequestListSnapshots): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestListSnapshots>, I>>(base?: I): RequestListSnapshots {
    return RequestListSnapshots.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestListSnapshots>, I>>(_: I): RequestListSnapshots {
    const message = createBaseRequestListSnapshots();
    return message;
  },
};

function createBaseRequestOfferSnapshot(): RequestOfferSnapshot {
  return { snapshot: undefined, appHash: new Uint8Array(0) };
}

export const RequestOfferSnapshot = {
  encode(message: RequestOfferSnapshot, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.snapshot !== undefined) {
      Snapshot.encode(message.snapshot, writer.uint32(10).fork()).ldelim();
    }
    if (message.appHash.length !== 0) {
      writer.uint32(18).bytes(message.appHash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestOfferSnapshot {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestOfferSnapshot();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.snapshot = Snapshot.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.appHash = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestOfferSnapshot {
    return {
      snapshot: isSet(object.snapshot) ? Snapshot.fromJSON(object.snapshot) : undefined,
      appHash: isSet(object.appHash) ? bytesFromBase64(object.appHash) : new Uint8Array(0),
    };
  },

  toJSON(message: RequestOfferSnapshot): unknown {
    const obj: any = {};
    if (message.snapshot !== undefined) {
      obj.snapshot = Snapshot.toJSON(message.snapshot);
    }
    if (message.appHash.length !== 0) {
      obj.appHash = base64FromBytes(message.appHash);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestOfferSnapshot>, I>>(base?: I): RequestOfferSnapshot {
    return RequestOfferSnapshot.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestOfferSnapshot>, I>>(object: I): RequestOfferSnapshot {
    const message = createBaseRequestOfferSnapshot();
    message.snapshot = (object.snapshot !== undefined && object.snapshot !== null)
      ? Snapshot.fromPartial(object.snapshot)
      : undefined;
    message.appHash = object.appHash ?? new Uint8Array(0);
    return message;
  },
};

function createBaseRequestLoadSnapshotChunk(): RequestLoadSnapshotChunk {
  return { height: 0, format: 0, chunk: 0 };
}

export const RequestLoadSnapshotChunk = {
  encode(message: RequestLoadSnapshotChunk, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== 0) {
      writer.uint32(8).uint64(message.height);
    }
    if (message.format !== 0) {
      writer.uint32(16).uint32(message.format);
    }
    if (message.chunk !== 0) {
      writer.uint32(24).uint32(message.chunk);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestLoadSnapshotChunk {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestLoadSnapshotChunk();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.height = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.format = reader.uint32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.chunk = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestLoadSnapshotChunk {
    return {
      height: isSet(object.height) ? Number(object.height) : 0,
      format: isSet(object.format) ? Number(object.format) : 0,
      chunk: isSet(object.chunk) ? Number(object.chunk) : 0,
    };
  },

  toJSON(message: RequestLoadSnapshotChunk): unknown {
    const obj: any = {};
    if (message.height !== 0) {
      obj.height = Math.round(message.height);
    }
    if (message.format !== 0) {
      obj.format = Math.round(message.format);
    }
    if (message.chunk !== 0) {
      obj.chunk = Math.round(message.chunk);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestLoadSnapshotChunk>, I>>(base?: I): RequestLoadSnapshotChunk {
    return RequestLoadSnapshotChunk.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestLoadSnapshotChunk>, I>>(object: I): RequestLoadSnapshotChunk {
    const message = createBaseRequestLoadSnapshotChunk();
    message.height = object.height ?? 0;
    message.format = object.format ?? 0;
    message.chunk = object.chunk ?? 0;
    return message;
  },
};

function createBaseRequestApplySnapshotChunk(): RequestApplySnapshotChunk {
  return { index: 0, chunk: new Uint8Array(0), sender: "" };
}

export const RequestApplySnapshotChunk = {
  encode(message: RequestApplySnapshotChunk, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.index !== 0) {
      writer.uint32(8).uint32(message.index);
    }
    if (message.chunk.length !== 0) {
      writer.uint32(18).bytes(message.chunk);
    }
    if (message.sender !== "") {
      writer.uint32(26).string(message.sender);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestApplySnapshotChunk {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestApplySnapshotChunk();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.index = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.chunk = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.sender = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestApplySnapshotChunk {
    return {
      index: isSet(object.index) ? Number(object.index) : 0,
      chunk: isSet(object.chunk) ? bytesFromBase64(object.chunk) : new Uint8Array(0),
      sender: isSet(object.sender) ? String(object.sender) : "",
    };
  },

  toJSON(message: RequestApplySnapshotChunk): unknown {
    const obj: any = {};
    if (message.index !== 0) {
      obj.index = Math.round(message.index);
    }
    if (message.chunk.length !== 0) {
      obj.chunk = base64FromBytes(message.chunk);
    }
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestApplySnapshotChunk>, I>>(base?: I): RequestApplySnapshotChunk {
    return RequestApplySnapshotChunk.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestApplySnapshotChunk>, I>>(object: I): RequestApplySnapshotChunk {
    const message = createBaseRequestApplySnapshotChunk();
    message.index = object.index ?? 0;
    message.chunk = object.chunk ?? new Uint8Array(0);
    message.sender = object.sender ?? "";
    return message;
  },
};

function createBaseRequestPrepareProposal(): RequestPrepareProposal {
  return {
    maxTxBytes: 0,
    txs: [],
    localLastCommit: undefined,
    misbehavior: [],
    height: 0,
    time: undefined,
    nextValidatorsHash: new Uint8Array(0),
    proposerAddress: new Uint8Array(0),
  };
}

export const RequestPrepareProposal = {
  encode(message: RequestPrepareProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.maxTxBytes !== 0) {
      writer.uint32(8).int64(message.maxTxBytes);
    }
    for (const v of message.txs) {
      writer.uint32(18).bytes(v!);
    }
    if (message.localLastCommit !== undefined) {
      ExtendedCommitInfo.encode(message.localLastCommit, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.misbehavior) {
      Misbehavior.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.height !== 0) {
      writer.uint32(40).int64(message.height);
    }
    if (message.time !== undefined) {
      Timestamp.encode(toTimestamp(message.time), writer.uint32(50).fork()).ldelim();
    }
    if (message.nextValidatorsHash.length !== 0) {
      writer.uint32(58).bytes(message.nextValidatorsHash);
    }
    if (message.proposerAddress.length !== 0) {
      writer.uint32(66).bytes(message.proposerAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestPrepareProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestPrepareProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.maxTxBytes = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.txs.push(reader.bytes());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.localLastCommit = ExtendedCommitInfo.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.misbehavior.push(Misbehavior.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.height = longToNumber(reader.int64() as Long);
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.nextValidatorsHash = reader.bytes();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.proposerAddress = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestPrepareProposal {
    return {
      maxTxBytes: isSet(object.maxTxBytes) ? Number(object.maxTxBytes) : 0,
      txs: Array.isArray(object?.txs) ? object.txs.map((e: any) => bytesFromBase64(e)) : [],
      localLastCommit: isSet(object.localLastCommit) ? ExtendedCommitInfo.fromJSON(object.localLastCommit) : undefined,
      misbehavior: Array.isArray(object?.misbehavior)
        ? object.misbehavior.map((e: any) => Misbehavior.fromJSON(e))
        : [],
      height: isSet(object.height) ? Number(object.height) : 0,
      time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
      nextValidatorsHash: isSet(object.nextValidatorsHash)
        ? bytesFromBase64(object.nextValidatorsHash)
        : new Uint8Array(0),
      proposerAddress: isSet(object.proposerAddress) ? bytesFromBase64(object.proposerAddress) : new Uint8Array(0),
    };
  },

  toJSON(message: RequestPrepareProposal): unknown {
    const obj: any = {};
    if (message.maxTxBytes !== 0) {
      obj.maxTxBytes = Math.round(message.maxTxBytes);
    }
    if (message.txs?.length) {
      obj.txs = message.txs.map((e) => base64FromBytes(e));
    }
    if (message.localLastCommit !== undefined) {
      obj.localLastCommit = ExtendedCommitInfo.toJSON(message.localLastCommit);
    }
    if (message.misbehavior?.length) {
      obj.misbehavior = message.misbehavior.map((e) => Misbehavior.toJSON(e));
    }
    if (message.height !== 0) {
      obj.height = Math.round(message.height);
    }
    if (message.time !== undefined) {
      obj.time = message.time.toISOString();
    }
    if (message.nextValidatorsHash.length !== 0) {
      obj.nextValidatorsHash = base64FromBytes(message.nextValidatorsHash);
    }
    if (message.proposerAddress.length !== 0) {
      obj.proposerAddress = base64FromBytes(message.proposerAddress);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestPrepareProposal>, I>>(base?: I): RequestPrepareProposal {
    return RequestPrepareProposal.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestPrepareProposal>, I>>(object: I): RequestPrepareProposal {
    const message = createBaseRequestPrepareProposal();
    message.maxTxBytes = object.maxTxBytes ?? 0;
    message.txs = object.txs?.map((e) => e) || [];
    message.localLastCommit = (object.localLastCommit !== undefined && object.localLastCommit !== null)
      ? ExtendedCommitInfo.fromPartial(object.localLastCommit)
      : undefined;
    message.misbehavior = object.misbehavior?.map((e) => Misbehavior.fromPartial(e)) || [];
    message.height = object.height ?? 0;
    message.time = object.time ?? undefined;
    message.nextValidatorsHash = object.nextValidatorsHash ?? new Uint8Array(0);
    message.proposerAddress = object.proposerAddress ?? new Uint8Array(0);
    return message;
  },
};

function createBaseRequestProcessProposal(): RequestProcessProposal {
  return {
    txs: [],
    proposedLastCommit: undefined,
    misbehavior: [],
    hash: new Uint8Array(0),
    height: 0,
    time: undefined,
    nextValidatorsHash: new Uint8Array(0),
    proposerAddress: new Uint8Array(0),
  };
}

export const RequestProcessProposal = {
  encode(message: RequestProcessProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.txs) {
      writer.uint32(10).bytes(v!);
    }
    if (message.proposedLastCommit !== undefined) {
      CommitInfo.encode(message.proposedLastCommit, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.misbehavior) {
      Misbehavior.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.hash.length !== 0) {
      writer.uint32(34).bytes(message.hash);
    }
    if (message.height !== 0) {
      writer.uint32(40).int64(message.height);
    }
    if (message.time !== undefined) {
      Timestamp.encode(toTimestamp(message.time), writer.uint32(50).fork()).ldelim();
    }
    if (message.nextValidatorsHash.length !== 0) {
      writer.uint32(58).bytes(message.nextValidatorsHash);
    }
    if (message.proposerAddress.length !== 0) {
      writer.uint32(66).bytes(message.proposerAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestProcessProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestProcessProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.txs.push(reader.bytes());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.proposedLastCommit = CommitInfo.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.misbehavior.push(Misbehavior.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.hash = reader.bytes();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.height = longToNumber(reader.int64() as Long);
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.nextValidatorsHash = reader.bytes();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.proposerAddress = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestProcessProposal {
    return {
      txs: Array.isArray(object?.txs) ? object.txs.map((e: any) => bytesFromBase64(e)) : [],
      proposedLastCommit: isSet(object.proposedLastCommit) ? CommitInfo.fromJSON(object.proposedLastCommit) : undefined,
      misbehavior: Array.isArray(object?.misbehavior)
        ? object.misbehavior.map((e: any) => Misbehavior.fromJSON(e))
        : [],
      hash: isSet(object.hash) ? bytesFromBase64(object.hash) : new Uint8Array(0),
      height: isSet(object.height) ? Number(object.height) : 0,
      time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
      nextValidatorsHash: isSet(object.nextValidatorsHash)
        ? bytesFromBase64(object.nextValidatorsHash)
        : new Uint8Array(0),
      proposerAddress: isSet(object.proposerAddress) ? bytesFromBase64(object.proposerAddress) : new Uint8Array(0),
    };
  },

  toJSON(message: RequestProcessProposal): unknown {
    const obj: any = {};
    if (message.txs?.length) {
      obj.txs = message.txs.map((e) => base64FromBytes(e));
    }
    if (message.proposedLastCommit !== undefined) {
      obj.proposedLastCommit = CommitInfo.toJSON(message.proposedLastCommit);
    }
    if (message.misbehavior?.length) {
      obj.misbehavior = message.misbehavior.map((e) => Misbehavior.toJSON(e));
    }
    if (message.hash.length !== 0) {
      obj.hash = base64FromBytes(message.hash);
    }
    if (message.height !== 0) {
      obj.height = Math.round(message.height);
    }
    if (message.time !== undefined) {
      obj.time = message.time.toISOString();
    }
    if (message.nextValidatorsHash.length !== 0) {
      obj.nextValidatorsHash = base64FromBytes(message.nextValidatorsHash);
    }
    if (message.proposerAddress.length !== 0) {
      obj.proposerAddress = base64FromBytes(message.proposerAddress);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestProcessProposal>, I>>(base?: I): RequestProcessProposal {
    return RequestProcessProposal.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestProcessProposal>, I>>(object: I): RequestProcessProposal {
    const message = createBaseRequestProcessProposal();
    message.txs = object.txs?.map((e) => e) || [];
    message.proposedLastCommit = (object.proposedLastCommit !== undefined && object.proposedLastCommit !== null)
      ? CommitInfo.fromPartial(object.proposedLastCommit)
      : undefined;
    message.misbehavior = object.misbehavior?.map((e) => Misbehavior.fromPartial(e)) || [];
    message.hash = object.hash ?? new Uint8Array(0);
    message.height = object.height ?? 0;
    message.time = object.time ?? undefined;
    message.nextValidatorsHash = object.nextValidatorsHash ?? new Uint8Array(0);
    message.proposerAddress = object.proposerAddress ?? new Uint8Array(0);
    return message;
  },
};

function createBaseRequestExtendVote(): RequestExtendVote {
  return {
    hash: new Uint8Array(0),
    height: 0,
    time: undefined,
    txs: [],
    proposedLastCommit: undefined,
    misbehavior: [],
    nextValidatorsHash: new Uint8Array(0),
    proposerAddress: new Uint8Array(0),
  };
}

export const RequestExtendVote = {
  encode(message: RequestExtendVote, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hash.length !== 0) {
      writer.uint32(10).bytes(message.hash);
    }
    if (message.height !== 0) {
      writer.uint32(16).int64(message.height);
    }
    if (message.time !== undefined) {
      Timestamp.encode(toTimestamp(message.time), writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.txs) {
      writer.uint32(34).bytes(v!);
    }
    if (message.proposedLastCommit !== undefined) {
      CommitInfo.encode(message.proposedLastCommit, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.misbehavior) {
      Misbehavior.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.nextValidatorsHash.length !== 0) {
      writer.uint32(58).bytes(message.nextValidatorsHash);
    }
    if (message.proposerAddress.length !== 0) {
      writer.uint32(66).bytes(message.proposerAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestExtendVote {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestExtendVote();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hash = reader.bytes();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.height = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.txs.push(reader.bytes());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.proposedLastCommit = CommitInfo.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.misbehavior.push(Misbehavior.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.nextValidatorsHash = reader.bytes();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.proposerAddress = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestExtendVote {
    return {
      hash: isSet(object.hash) ? bytesFromBase64(object.hash) : new Uint8Array(0),
      height: isSet(object.height) ? Number(object.height) : 0,
      time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
      txs: Array.isArray(object?.txs) ? object.txs.map((e: any) => bytesFromBase64(e)) : [],
      proposedLastCommit: isSet(object.proposedLastCommit) ? CommitInfo.fromJSON(object.proposedLastCommit) : undefined,
      misbehavior: Array.isArray(object?.misbehavior)
        ? object.misbehavior.map((e: any) => Misbehavior.fromJSON(e))
        : [],
      nextValidatorsHash: isSet(object.nextValidatorsHash)
        ? bytesFromBase64(object.nextValidatorsHash)
        : new Uint8Array(0),
      proposerAddress: isSet(object.proposerAddress) ? bytesFromBase64(object.proposerAddress) : new Uint8Array(0),
    };
  },

  toJSON(message: RequestExtendVote): unknown {
    const obj: any = {};
    if (message.hash.length !== 0) {
      obj.hash = base64FromBytes(message.hash);
    }
    if (message.height !== 0) {
      obj.height = Math.round(message.height);
    }
    if (message.time !== undefined) {
      obj.time = message.time.toISOString();
    }
    if (message.txs?.length) {
      obj.txs = message.txs.map((e) => base64FromBytes(e));
    }
    if (message.proposedLastCommit !== undefined) {
      obj.proposedLastCommit = CommitInfo.toJSON(message.proposedLastCommit);
    }
    if (message.misbehavior?.length) {
      obj.misbehavior = message.misbehavior.map((e) => Misbehavior.toJSON(e));
    }
    if (message.nextValidatorsHash.length !== 0) {
      obj.nextValidatorsHash = base64FromBytes(message.nextValidatorsHash);
    }
    if (message.proposerAddress.length !== 0) {
      obj.proposerAddress = base64FromBytes(message.proposerAddress);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestExtendVote>, I>>(base?: I): RequestExtendVote {
    return RequestExtendVote.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestExtendVote>, I>>(object: I): RequestExtendVote {
    const message = createBaseRequestExtendVote();
    message.hash = object.hash ?? new Uint8Array(0);
    message.height = object.height ?? 0;
    message.time = object.time ?? undefined;
    message.txs = object.txs?.map((e) => e) || [];
    message.proposedLastCommit = (object.proposedLastCommit !== undefined && object.proposedLastCommit !== null)
      ? CommitInfo.fromPartial(object.proposedLastCommit)
      : undefined;
    message.misbehavior = object.misbehavior?.map((e) => Misbehavior.fromPartial(e)) || [];
    message.nextValidatorsHash = object.nextValidatorsHash ?? new Uint8Array(0);
    message.proposerAddress = object.proposerAddress ?? new Uint8Array(0);
    return message;
  },
};

function createBaseRequestVerifyVoteExtension(): RequestVerifyVoteExtension {
  return { hash: new Uint8Array(0), validatorAddress: new Uint8Array(0), height: 0, voteExtension: new Uint8Array(0) };
}

export const RequestVerifyVoteExtension = {
  encode(message: RequestVerifyVoteExtension, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hash.length !== 0) {
      writer.uint32(10).bytes(message.hash);
    }
    if (message.validatorAddress.length !== 0) {
      writer.uint32(18).bytes(message.validatorAddress);
    }
    if (message.height !== 0) {
      writer.uint32(24).int64(message.height);
    }
    if (message.voteExtension.length !== 0) {
      writer.uint32(34).bytes(message.voteExtension);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestVerifyVoteExtension {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestVerifyVoteExtension();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hash = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.validatorAddress = reader.bytes();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.height = longToNumber(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.voteExtension = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestVerifyVoteExtension {
    return {
      hash: isSet(object.hash) ? bytesFromBase64(object.hash) : new Uint8Array(0),
      validatorAddress: isSet(object.validatorAddress) ? bytesFromBase64(object.validatorAddress) : new Uint8Array(0),
      height: isSet(object.height) ? Number(object.height) : 0,
      voteExtension: isSet(object.voteExtension) ? bytesFromBase64(object.voteExtension) : new Uint8Array(0),
    };
  },

  toJSON(message: RequestVerifyVoteExtension): unknown {
    const obj: any = {};
    if (message.hash.length !== 0) {
      obj.hash = base64FromBytes(message.hash);
    }
    if (message.validatorAddress.length !== 0) {
      obj.validatorAddress = base64FromBytes(message.validatorAddress);
    }
    if (message.height !== 0) {
      obj.height = Math.round(message.height);
    }
    if (message.voteExtension.length !== 0) {
      obj.voteExtension = base64FromBytes(message.voteExtension);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestVerifyVoteExtension>, I>>(base?: I): RequestVerifyVoteExtension {
    return RequestVerifyVoteExtension.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestVerifyVoteExtension>, I>>(object: I): RequestVerifyVoteExtension {
    const message = createBaseRequestVerifyVoteExtension();
    message.hash = object.hash ?? new Uint8Array(0);
    message.validatorAddress = object.validatorAddress ?? new Uint8Array(0);
    message.height = object.height ?? 0;
    message.voteExtension = object.voteExtension ?? new Uint8Array(0);
    return message;
  },
};

function createBaseRequestFinalizeBlock(): RequestFinalizeBlock {
  return {
    txs: [],
    decidedLastCommit: undefined,
    misbehavior: [],
    hash: new Uint8Array(0),
    height: 0,
    time: undefined,
    nextValidatorsHash: new Uint8Array(0),
    proposerAddress: new Uint8Array(0),
  };
}

export const RequestFinalizeBlock = {
  encode(message: RequestFinalizeBlock, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.txs) {
      writer.uint32(10).bytes(v!);
    }
    if (message.decidedLastCommit !== undefined) {
      CommitInfo.encode(message.decidedLastCommit, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.misbehavior) {
      Misbehavior.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.hash.length !== 0) {
      writer.uint32(34).bytes(message.hash);
    }
    if (message.height !== 0) {
      writer.uint32(40).int64(message.height);
    }
    if (message.time !== undefined) {
      Timestamp.encode(toTimestamp(message.time), writer.uint32(50).fork()).ldelim();
    }
    if (message.nextValidatorsHash.length !== 0) {
      writer.uint32(58).bytes(message.nextValidatorsHash);
    }
    if (message.proposerAddress.length !== 0) {
      writer.uint32(66).bytes(message.proposerAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestFinalizeBlock {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestFinalizeBlock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.txs.push(reader.bytes());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.decidedLastCommit = CommitInfo.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.misbehavior.push(Misbehavior.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.hash = reader.bytes();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.height = longToNumber(reader.int64() as Long);
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.nextValidatorsHash = reader.bytes();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.proposerAddress = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestFinalizeBlock {
    return {
      txs: Array.isArray(object?.txs) ? object.txs.map((e: any) => bytesFromBase64(e)) : [],
      decidedLastCommit: isSet(object.decidedLastCommit) ? CommitInfo.fromJSON(object.decidedLastCommit) : undefined,
      misbehavior: Array.isArray(object?.misbehavior)
        ? object.misbehavior.map((e: any) => Misbehavior.fromJSON(e))
        : [],
      hash: isSet(object.hash) ? bytesFromBase64(object.hash) : new Uint8Array(0),
      height: isSet(object.height) ? Number(object.height) : 0,
      time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
      nextValidatorsHash: isSet(object.nextValidatorsHash)
        ? bytesFromBase64(object.nextValidatorsHash)
        : new Uint8Array(0),
      proposerAddress: isSet(object.proposerAddress) ? bytesFromBase64(object.proposerAddress) : new Uint8Array(0),
    };
  },

  toJSON(message: RequestFinalizeBlock): unknown {
    const obj: any = {};
    if (message.txs?.length) {
      obj.txs = message.txs.map((e) => base64FromBytes(e));
    }
    if (message.decidedLastCommit !== undefined) {
      obj.decidedLastCommit = CommitInfo.toJSON(message.decidedLastCommit);
    }
    if (message.misbehavior?.length) {
      obj.misbehavior = message.misbehavior.map((e) => Misbehavior.toJSON(e));
    }
    if (message.hash.length !== 0) {
      obj.hash = base64FromBytes(message.hash);
    }
    if (message.height !== 0) {
      obj.height = Math.round(message.height);
    }
    if (message.time !== undefined) {
      obj.time = message.time.toISOString();
    }
    if (message.nextValidatorsHash.length !== 0) {
      obj.nextValidatorsHash = base64FromBytes(message.nextValidatorsHash);
    }
    if (message.proposerAddress.length !== 0) {
      obj.proposerAddress = base64FromBytes(message.proposerAddress);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestFinalizeBlock>, I>>(base?: I): RequestFinalizeBlock {
    return RequestFinalizeBlock.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestFinalizeBlock>, I>>(object: I): RequestFinalizeBlock {
    const message = createBaseRequestFinalizeBlock();
    message.txs = object.txs?.map((e) => e) || [];
    message.decidedLastCommit = (object.decidedLastCommit !== undefined && object.decidedLastCommit !== null)
      ? CommitInfo.fromPartial(object.decidedLastCommit)
      : undefined;
    message.misbehavior = object.misbehavior?.map((e) => Misbehavior.fromPartial(e)) || [];
    message.hash = object.hash ?? new Uint8Array(0);
    message.height = object.height ?? 0;
    message.time = object.time ?? undefined;
    message.nextValidatorsHash = object.nextValidatorsHash ?? new Uint8Array(0);
    message.proposerAddress = object.proposerAddress ?? new Uint8Array(0);
    return message;
  },
};

function createBaseResponse(): Response {
  return {
    exception: undefined,
    echo: undefined,
    flush: undefined,
    info: undefined,
    initChain: undefined,
    query: undefined,
    checkTx: undefined,
    commit: undefined,
    listSnapshots: undefined,
    offerSnapshot: undefined,
    loadSnapshotChunk: undefined,
    applySnapshotChunk: undefined,
    prepareProposal: undefined,
    processProposal: undefined,
    extendVote: undefined,
    verifyVoteExtension: undefined,
    finalizeBlock: undefined,
  };
}

export const Response = {
  encode(message: Response, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.exception !== undefined) {
      ResponseException.encode(message.exception, writer.uint32(10).fork()).ldelim();
    }
    if (message.echo !== undefined) {
      ResponseEcho.encode(message.echo, writer.uint32(18).fork()).ldelim();
    }
    if (message.flush !== undefined) {
      ResponseFlush.encode(message.flush, writer.uint32(26).fork()).ldelim();
    }
    if (message.info !== undefined) {
      ResponseInfo.encode(message.info, writer.uint32(34).fork()).ldelim();
    }
    if (message.initChain !== undefined) {
      ResponseInitChain.encode(message.initChain, writer.uint32(50).fork()).ldelim();
    }
    if (message.query !== undefined) {
      ResponseQuery.encode(message.query, writer.uint32(58).fork()).ldelim();
    }
    if (message.checkTx !== undefined) {
      ResponseCheckTx.encode(message.checkTx, writer.uint32(74).fork()).ldelim();
    }
    if (message.commit !== undefined) {
      ResponseCommit.encode(message.commit, writer.uint32(98).fork()).ldelim();
    }
    if (message.listSnapshots !== undefined) {
      ResponseListSnapshots.encode(message.listSnapshots, writer.uint32(106).fork()).ldelim();
    }
    if (message.offerSnapshot !== undefined) {
      ResponseOfferSnapshot.encode(message.offerSnapshot, writer.uint32(114).fork()).ldelim();
    }
    if (message.loadSnapshotChunk !== undefined) {
      ResponseLoadSnapshotChunk.encode(message.loadSnapshotChunk, writer.uint32(122).fork()).ldelim();
    }
    if (message.applySnapshotChunk !== undefined) {
      ResponseApplySnapshotChunk.encode(message.applySnapshotChunk, writer.uint32(130).fork()).ldelim();
    }
    if (message.prepareProposal !== undefined) {
      ResponsePrepareProposal.encode(message.prepareProposal, writer.uint32(138).fork()).ldelim();
    }
    if (message.processProposal !== undefined) {
      ResponseProcessProposal.encode(message.processProposal, writer.uint32(146).fork()).ldelim();
    }
    if (message.extendVote !== undefined) {
      ResponseExtendVote.encode(message.extendVote, writer.uint32(154).fork()).ldelim();
    }
    if (message.verifyVoteExtension !== undefined) {
      ResponseVerifyVoteExtension.encode(message.verifyVoteExtension, writer.uint32(162).fork()).ldelim();
    }
    if (message.finalizeBlock !== undefined) {
      ResponseFinalizeBlock.encode(message.finalizeBlock, writer.uint32(170).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Response {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.exception = ResponseException.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.echo = ResponseEcho.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.flush = ResponseFlush.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.info = ResponseInfo.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.initChain = ResponseInitChain.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.query = ResponseQuery.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.checkTx = ResponseCheckTx.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.commit = ResponseCommit.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.listSnapshots = ResponseListSnapshots.decode(reader, reader.uint32());
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.offerSnapshot = ResponseOfferSnapshot.decode(reader, reader.uint32());
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.loadSnapshotChunk = ResponseLoadSnapshotChunk.decode(reader, reader.uint32());
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.applySnapshotChunk = ResponseApplySnapshotChunk.decode(reader, reader.uint32());
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.prepareProposal = ResponsePrepareProposal.decode(reader, reader.uint32());
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.processProposal = ResponseProcessProposal.decode(reader, reader.uint32());
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.extendVote = ResponseExtendVote.decode(reader, reader.uint32());
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }

          message.verifyVoteExtension = ResponseVerifyVoteExtension.decode(reader, reader.uint32());
          continue;
        case 21:
          if (tag !== 170) {
            break;
          }

          message.finalizeBlock = ResponseFinalizeBlock.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Response {
    return {
      exception: isSet(object.exception) ? ResponseException.fromJSON(object.exception) : undefined,
      echo: isSet(object.echo) ? ResponseEcho.fromJSON(object.echo) : undefined,
      flush: isSet(object.flush) ? ResponseFlush.fromJSON(object.flush) : undefined,
      info: isSet(object.info) ? ResponseInfo.fromJSON(object.info) : undefined,
      initChain: isSet(object.initChain) ? ResponseInitChain.fromJSON(object.initChain) : undefined,
      query: isSet(object.query) ? ResponseQuery.fromJSON(object.query) : undefined,
      checkTx: isSet(object.checkTx) ? ResponseCheckTx.fromJSON(object.checkTx) : undefined,
      commit: isSet(object.commit) ? ResponseCommit.fromJSON(object.commit) : undefined,
      listSnapshots: isSet(object.listSnapshots) ? ResponseListSnapshots.fromJSON(object.listSnapshots) : undefined,
      offerSnapshot: isSet(object.offerSnapshot) ? ResponseOfferSnapshot.fromJSON(object.offerSnapshot) : undefined,
      loadSnapshotChunk: isSet(object.loadSnapshotChunk)
        ? ResponseLoadSnapshotChunk.fromJSON(object.loadSnapshotChunk)
        : undefined,
      applySnapshotChunk: isSet(object.applySnapshotChunk)
        ? ResponseApplySnapshotChunk.fromJSON(object.applySnapshotChunk)
        : undefined,
      prepareProposal: isSet(object.prepareProposal)
        ? ResponsePrepareProposal.fromJSON(object.prepareProposal)
        : undefined,
      processProposal: isSet(object.processProposal)
        ? ResponseProcessProposal.fromJSON(object.processProposal)
        : undefined,
      extendVote: isSet(object.extendVote) ? ResponseExtendVote.fromJSON(object.extendVote) : undefined,
      verifyVoteExtension: isSet(object.verifyVoteExtension)
        ? ResponseVerifyVoteExtension.fromJSON(object.verifyVoteExtension)
        : undefined,
      finalizeBlock: isSet(object.finalizeBlock) ? ResponseFinalizeBlock.fromJSON(object.finalizeBlock) : undefined,
    };
  },

  toJSON(message: Response): unknown {
    const obj: any = {};
    if (message.exception !== undefined) {
      obj.exception = ResponseException.toJSON(message.exception);
    }
    if (message.echo !== undefined) {
      obj.echo = ResponseEcho.toJSON(message.echo);
    }
    if (message.flush !== undefined) {
      obj.flush = ResponseFlush.toJSON(message.flush);
    }
    if (message.info !== undefined) {
      obj.info = ResponseInfo.toJSON(message.info);
    }
    if (message.initChain !== undefined) {
      obj.initChain = ResponseInitChain.toJSON(message.initChain);
    }
    if (message.query !== undefined) {
      obj.query = ResponseQuery.toJSON(message.query);
    }
    if (message.checkTx !== undefined) {
      obj.checkTx = ResponseCheckTx.toJSON(message.checkTx);
    }
    if (message.commit !== undefined) {
      obj.commit = ResponseCommit.toJSON(message.commit);
    }
    if (message.listSnapshots !== undefined) {
      obj.listSnapshots = ResponseListSnapshots.toJSON(message.listSnapshots);
    }
    if (message.offerSnapshot !== undefined) {
      obj.offerSnapshot = ResponseOfferSnapshot.toJSON(message.offerSnapshot);
    }
    if (message.loadSnapshotChunk !== undefined) {
      obj.loadSnapshotChunk = ResponseLoadSnapshotChunk.toJSON(message.loadSnapshotChunk);
    }
    if (message.applySnapshotChunk !== undefined) {
      obj.applySnapshotChunk = ResponseApplySnapshotChunk.toJSON(message.applySnapshotChunk);
    }
    if (message.prepareProposal !== undefined) {
      obj.prepareProposal = ResponsePrepareProposal.toJSON(message.prepareProposal);
    }
    if (message.processProposal !== undefined) {
      obj.processProposal = ResponseProcessProposal.toJSON(message.processProposal);
    }
    if (message.extendVote !== undefined) {
      obj.extendVote = ResponseExtendVote.toJSON(message.extendVote);
    }
    if (message.verifyVoteExtension !== undefined) {
      obj.verifyVoteExtension = ResponseVerifyVoteExtension.toJSON(message.verifyVoteExtension);
    }
    if (message.finalizeBlock !== undefined) {
      obj.finalizeBlock = ResponseFinalizeBlock.toJSON(message.finalizeBlock);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Response>, I>>(base?: I): Response {
    return Response.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Response>, I>>(object: I): Response {
    const message = createBaseResponse();
    message.exception = (object.exception !== undefined && object.exception !== null)
      ? ResponseException.fromPartial(object.exception)
      : undefined;
    message.echo = (object.echo !== undefined && object.echo !== null)
      ? ResponseEcho.fromPartial(object.echo)
      : undefined;
    message.flush = (object.flush !== undefined && object.flush !== null)
      ? ResponseFlush.fromPartial(object.flush)
      : undefined;
    message.info = (object.info !== undefined && object.info !== null)
      ? ResponseInfo.fromPartial(object.info)
      : undefined;
    message.initChain = (object.initChain !== undefined && object.initChain !== null)
      ? ResponseInitChain.fromPartial(object.initChain)
      : undefined;
    message.query = (object.query !== undefined && object.query !== null)
      ? ResponseQuery.fromPartial(object.query)
      : undefined;
    message.checkTx = (object.checkTx !== undefined && object.checkTx !== null)
      ? ResponseCheckTx.fromPartial(object.checkTx)
      : undefined;
    message.commit = (object.commit !== undefined && object.commit !== null)
      ? ResponseCommit.fromPartial(object.commit)
      : undefined;
    message.listSnapshots = (object.listSnapshots !== undefined && object.listSnapshots !== null)
      ? ResponseListSnapshots.fromPartial(object.listSnapshots)
      : undefined;
    message.offerSnapshot = (object.offerSnapshot !== undefined && object.offerSnapshot !== null)
      ? ResponseOfferSnapshot.fromPartial(object.offerSnapshot)
      : undefined;
    message.loadSnapshotChunk = (object.loadSnapshotChunk !== undefined && object.loadSnapshotChunk !== null)
      ? ResponseLoadSnapshotChunk.fromPartial(object.loadSnapshotChunk)
      : undefined;
    message.applySnapshotChunk = (object.applySnapshotChunk !== undefined && object.applySnapshotChunk !== null)
      ? ResponseApplySnapshotChunk.fromPartial(object.applySnapshotChunk)
      : undefined;
    message.prepareProposal = (object.prepareProposal !== undefined && object.prepareProposal !== null)
      ? ResponsePrepareProposal.fromPartial(object.prepareProposal)
      : undefined;
    message.processProposal = (object.processProposal !== undefined && object.processProposal !== null)
      ? ResponseProcessProposal.fromPartial(object.processProposal)
      : undefined;
    message.extendVote = (object.extendVote !== undefined && object.extendVote !== null)
      ? ResponseExtendVote.fromPartial(object.extendVote)
      : undefined;
    message.verifyVoteExtension = (object.verifyVoteExtension !== undefined && object.verifyVoteExtension !== null)
      ? ResponseVerifyVoteExtension.fromPartial(object.verifyVoteExtension)
      : undefined;
    message.finalizeBlock = (object.finalizeBlock !== undefined && object.finalizeBlock !== null)
      ? ResponseFinalizeBlock.fromPartial(object.finalizeBlock)
      : undefined;
    return message;
  },
};

function createBaseResponseException(): ResponseException {
  return { error: "" };
}

export const ResponseException = {
  encode(message: ResponseException, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== "") {
      writer.uint32(10).string(message.error);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseException {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseException();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseException {
    return { error: isSet(object.error) ? String(object.error) : "" };
  },

  toJSON(message: ResponseException): unknown {
    const obj: any = {};
    if (message.error !== "") {
      obj.error = message.error;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ResponseException>, I>>(base?: I): ResponseException {
    return ResponseException.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseException>, I>>(object: I): ResponseException {
    const message = createBaseResponseException();
    message.error = object.error ?? "";
    return message;
  },
};

function createBaseResponseEcho(): ResponseEcho {
  return { message: "" };
}

export const ResponseEcho = {
  encode(message: ResponseEcho, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseEcho {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseEcho();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseEcho {
    return { message: isSet(object.message) ? String(object.message) : "" };
  },

  toJSON(message: ResponseEcho): unknown {
    const obj: any = {};
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ResponseEcho>, I>>(base?: I): ResponseEcho {
    return ResponseEcho.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseEcho>, I>>(object: I): ResponseEcho {
    const message = createBaseResponseEcho();
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseResponseFlush(): ResponseFlush {
  return {};
}

export const ResponseFlush = {
  encode(_: ResponseFlush, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseFlush {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseFlush();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): ResponseFlush {
    return {};
  },

  toJSON(_: ResponseFlush): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ResponseFlush>, I>>(base?: I): ResponseFlush {
    return ResponseFlush.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseFlush>, I>>(_: I): ResponseFlush {
    const message = createBaseResponseFlush();
    return message;
  },
};

function createBaseResponseInfo(): ResponseInfo {
  return { data: "", version: "", appVersion: 0, lastBlockHeight: 0, lastBlockAppHash: new Uint8Array(0) };
}

export const ResponseInfo = {
  encode(message: ResponseInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.data !== "") {
      writer.uint32(10).string(message.data);
    }
    if (message.version !== "") {
      writer.uint32(18).string(message.version);
    }
    if (message.appVersion !== 0) {
      writer.uint32(24).uint64(message.appVersion);
    }
    if (message.lastBlockHeight !== 0) {
      writer.uint32(32).int64(message.lastBlockHeight);
    }
    if (message.lastBlockAppHash.length !== 0) {
      writer.uint32(42).bytes(message.lastBlockAppHash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.data = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.version = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.appVersion = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.lastBlockHeight = longToNumber(reader.int64() as Long);
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.lastBlockAppHash = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseInfo {
    return {
      data: isSet(object.data) ? String(object.data) : "",
      version: isSet(object.version) ? String(object.version) : "",
      appVersion: isSet(object.appVersion) ? Number(object.appVersion) : 0,
      lastBlockHeight: isSet(object.lastBlockHeight) ? Number(object.lastBlockHeight) : 0,
      lastBlockAppHash: isSet(object.lastBlockAppHash) ? bytesFromBase64(object.lastBlockAppHash) : new Uint8Array(0),
    };
  },

  toJSON(message: ResponseInfo): unknown {
    const obj: any = {};
    if (message.data !== "") {
      obj.data = message.data;
    }
    if (message.version !== "") {
      obj.version = message.version;
    }
    if (message.appVersion !== 0) {
      obj.appVersion = Math.round(message.appVersion);
    }
    if (message.lastBlockHeight !== 0) {
      obj.lastBlockHeight = Math.round(message.lastBlockHeight);
    }
    if (message.lastBlockAppHash.length !== 0) {
      obj.lastBlockAppHash = base64FromBytes(message.lastBlockAppHash);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ResponseInfo>, I>>(base?: I): ResponseInfo {
    return ResponseInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseInfo>, I>>(object: I): ResponseInfo {
    const message = createBaseResponseInfo();
    message.data = object.data ?? "";
    message.version = object.version ?? "";
    message.appVersion = object.appVersion ?? 0;
    message.lastBlockHeight = object.lastBlockHeight ?? 0;
    message.lastBlockAppHash = object.lastBlockAppHash ?? new Uint8Array(0);
    return message;
  },
};

function createBaseResponseInitChain(): ResponseInitChain {
  return { consensusParams: undefined, validators: [], appHash: new Uint8Array(0) };
}

export const ResponseInitChain = {
  encode(message: ResponseInitChain, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.consensusParams !== undefined) {
      ConsensusParams.encode(message.consensusParams, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.validators) {
      ValidatorUpdate.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.appHash.length !== 0) {
      writer.uint32(26).bytes(message.appHash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseInitChain {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseInitChain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.consensusParams = ConsensusParams.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.validators.push(ValidatorUpdate.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.appHash = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseInitChain {
    return {
      consensusParams: isSet(object.consensusParams) ? ConsensusParams.fromJSON(object.consensusParams) : undefined,
      validators: Array.isArray(object?.validators)
        ? object.validators.map((e: any) => ValidatorUpdate.fromJSON(e))
        : [],
      appHash: isSet(object.appHash) ? bytesFromBase64(object.appHash) : new Uint8Array(0),
    };
  },

  toJSON(message: ResponseInitChain): unknown {
    const obj: any = {};
    if (message.consensusParams !== undefined) {
      obj.consensusParams = ConsensusParams.toJSON(message.consensusParams);
    }
    if (message.validators?.length) {
      obj.validators = message.validators.map((e) => ValidatorUpdate.toJSON(e));
    }
    if (message.appHash.length !== 0) {
      obj.appHash = base64FromBytes(message.appHash);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ResponseInitChain>, I>>(base?: I): ResponseInitChain {
    return ResponseInitChain.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseInitChain>, I>>(object: I): ResponseInitChain {
    const message = createBaseResponseInitChain();
    message.consensusParams = (object.consensusParams !== undefined && object.consensusParams !== null)
      ? ConsensusParams.fromPartial(object.consensusParams)
      : undefined;
    message.validators = object.validators?.map((e) => ValidatorUpdate.fromPartial(e)) || [];
    message.appHash = object.appHash ?? new Uint8Array(0);
    return message;
  },
};

function createBaseResponseQuery(): ResponseQuery {
  return {
    code: 0,
    log: "",
    info: "",
    index: 0,
    key: new Uint8Array(0),
    value: new Uint8Array(0),
    proofOps: undefined,
    height: 0,
    codespace: "",
  };
}

export const ResponseQuery = {
  encode(message: ResponseQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== 0) {
      writer.uint32(8).uint32(message.code);
    }
    if (message.log !== "") {
      writer.uint32(26).string(message.log);
    }
    if (message.info !== "") {
      writer.uint32(34).string(message.info);
    }
    if (message.index !== 0) {
      writer.uint32(40).int64(message.index);
    }
    if (message.key.length !== 0) {
      writer.uint32(50).bytes(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(58).bytes(message.value);
    }
    if (message.proofOps !== undefined) {
      ProofOps.encode(message.proofOps, writer.uint32(66).fork()).ldelim();
    }
    if (message.height !== 0) {
      writer.uint32(72).int64(message.height);
    }
    if (message.codespace !== "") {
      writer.uint32(82).string(message.codespace);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.code = reader.uint32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.log = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.info = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.index = longToNumber(reader.int64() as Long);
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.key = reader.bytes();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.value = reader.bytes();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.proofOps = ProofOps.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.height = longToNumber(reader.int64() as Long);
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.codespace = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseQuery {
    return {
      code: isSet(object.code) ? Number(object.code) : 0,
      log: isSet(object.log) ? String(object.log) : "",
      info: isSet(object.info) ? String(object.info) : "",
      index: isSet(object.index) ? Number(object.index) : 0,
      key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(0),
      value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0),
      proofOps: isSet(object.proofOps) ? ProofOps.fromJSON(object.proofOps) : undefined,
      height: isSet(object.height) ? Number(object.height) : 0,
      codespace: isSet(object.codespace) ? String(object.codespace) : "",
    };
  },

  toJSON(message: ResponseQuery): unknown {
    const obj: any = {};
    if (message.code !== 0) {
      obj.code = Math.round(message.code);
    }
    if (message.log !== "") {
      obj.log = message.log;
    }
    if (message.info !== "") {
      obj.info = message.info;
    }
    if (message.index !== 0) {
      obj.index = Math.round(message.index);
    }
    if (message.key.length !== 0) {
      obj.key = base64FromBytes(message.key);
    }
    if (message.value.length !== 0) {
      obj.value = base64FromBytes(message.value);
    }
    if (message.proofOps !== undefined) {
      obj.proofOps = ProofOps.toJSON(message.proofOps);
    }
    if (message.height !== 0) {
      obj.height = Math.round(message.height);
    }
    if (message.codespace !== "") {
      obj.codespace = message.codespace;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ResponseQuery>, I>>(base?: I): ResponseQuery {
    return ResponseQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseQuery>, I>>(object: I): ResponseQuery {
    const message = createBaseResponseQuery();
    message.code = object.code ?? 0;
    message.log = object.log ?? "";
    message.info = object.info ?? "";
    message.index = object.index ?? 0;
    message.key = object.key ?? new Uint8Array(0);
    message.value = object.value ?? new Uint8Array(0);
    message.proofOps = (object.proofOps !== undefined && object.proofOps !== null)
      ? ProofOps.fromPartial(object.proofOps)
      : undefined;
    message.height = object.height ?? 0;
    message.codespace = object.codespace ?? "";
    return message;
  },
};

function createBaseResponseCheckTx(): ResponseCheckTx {
  return { code: 0, data: new Uint8Array(0), log: "", info: "", gasWanted: 0, gasUsed: 0, events: [], codespace: "" };
}

export const ResponseCheckTx = {
  encode(message: ResponseCheckTx, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== 0) {
      writer.uint32(8).uint32(message.code);
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    if (message.log !== "") {
      writer.uint32(26).string(message.log);
    }
    if (message.info !== "") {
      writer.uint32(34).string(message.info);
    }
    if (message.gasWanted !== 0) {
      writer.uint32(40).int64(message.gasWanted);
    }
    if (message.gasUsed !== 0) {
      writer.uint32(48).int64(message.gasUsed);
    }
    for (const v of message.events) {
      Event.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.codespace !== "") {
      writer.uint32(66).string(message.codespace);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseCheckTx {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseCheckTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.code = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.data = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.log = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.info = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.gasWanted = longToNumber(reader.int64() as Long);
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.gasUsed = longToNumber(reader.int64() as Long);
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.events.push(Event.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.codespace = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseCheckTx {
    return {
      code: isSet(object.code) ? Number(object.code) : 0,
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
      log: isSet(object.log) ? String(object.log) : "",
      info: isSet(object.info) ? String(object.info) : "",
      gasWanted: isSet(object.gas_wanted) ? Number(object.gas_wanted) : 0,
      gasUsed: isSet(object.gas_used) ? Number(object.gas_used) : 0,
      events: Array.isArray(object?.events) ? object.events.map((e: any) => Event.fromJSON(e)) : [],
      codespace: isSet(object.codespace) ? String(object.codespace) : "",
    };
  },

  toJSON(message: ResponseCheckTx): unknown {
    const obj: any = {};
    if (message.code !== 0) {
      obj.code = Math.round(message.code);
    }
    if (message.data.length !== 0) {
      obj.data = base64FromBytes(message.data);
    }
    if (message.log !== "") {
      obj.log = message.log;
    }
    if (message.info !== "") {
      obj.info = message.info;
    }
    if (message.gasWanted !== 0) {
      obj.gas_wanted = Math.round(message.gasWanted);
    }
    if (message.gasUsed !== 0) {
      obj.gas_used = Math.round(message.gasUsed);
    }
    if (message.events?.length) {
      obj.events = message.events.map((e) => Event.toJSON(e));
    }
    if (message.codespace !== "") {
      obj.codespace = message.codespace;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ResponseCheckTx>, I>>(base?: I): ResponseCheckTx {
    return ResponseCheckTx.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseCheckTx>, I>>(object: I): ResponseCheckTx {
    const message = createBaseResponseCheckTx();
    message.code = object.code ?? 0;
    message.data = object.data ?? new Uint8Array(0);
    message.log = object.log ?? "";
    message.info = object.info ?? "";
    message.gasWanted = object.gasWanted ?? 0;
    message.gasUsed = object.gasUsed ?? 0;
    message.events = object.events?.map((e) => Event.fromPartial(e)) || [];
    message.codespace = object.codespace ?? "";
    return message;
  },
};

function createBaseResponseCommit(): ResponseCommit {
  return { retainHeight: 0 };
}

export const ResponseCommit = {
  encode(message: ResponseCommit, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.retainHeight !== 0) {
      writer.uint32(24).int64(message.retainHeight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseCommit {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseCommit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 3:
          if (tag !== 24) {
            break;
          }

          message.retainHeight = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseCommit {
    return { retainHeight: isSet(object.retainHeight) ? Number(object.retainHeight) : 0 };
  },

  toJSON(message: ResponseCommit): unknown {
    const obj: any = {};
    if (message.retainHeight !== 0) {
      obj.retainHeight = Math.round(message.retainHeight);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ResponseCommit>, I>>(base?: I): ResponseCommit {
    return ResponseCommit.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseCommit>, I>>(object: I): ResponseCommit {
    const message = createBaseResponseCommit();
    message.retainHeight = object.retainHeight ?? 0;
    return message;
  },
};

function createBaseResponseListSnapshots(): ResponseListSnapshots {
  return { snapshots: [] };
}

export const ResponseListSnapshots = {
  encode(message: ResponseListSnapshots, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.snapshots) {
      Snapshot.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseListSnapshots {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseListSnapshots();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.snapshots.push(Snapshot.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseListSnapshots {
    return {
      snapshots: Array.isArray(object?.snapshots) ? object.snapshots.map((e: any) => Snapshot.fromJSON(e)) : [],
    };
  },

  toJSON(message: ResponseListSnapshots): unknown {
    const obj: any = {};
    if (message.snapshots?.length) {
      obj.snapshots = message.snapshots.map((e) => Snapshot.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ResponseListSnapshots>, I>>(base?: I): ResponseListSnapshots {
    return ResponseListSnapshots.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseListSnapshots>, I>>(object: I): ResponseListSnapshots {
    const message = createBaseResponseListSnapshots();
    message.snapshots = object.snapshots?.map((e) => Snapshot.fromPartial(e)) || [];
    return message;
  },
};

function createBaseResponseOfferSnapshot(): ResponseOfferSnapshot {
  return { result: 0 };
}

export const ResponseOfferSnapshot = {
  encode(message: ResponseOfferSnapshot, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseOfferSnapshot {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseOfferSnapshot();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.result = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseOfferSnapshot {
    return { result: isSet(object.result) ? responseOfferSnapshot_ResultFromJSON(object.result) : 0 };
  },

  toJSON(message: ResponseOfferSnapshot): unknown {
    const obj: any = {};
    if (message.result !== 0) {
      obj.result = responseOfferSnapshot_ResultToJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ResponseOfferSnapshot>, I>>(base?: I): ResponseOfferSnapshot {
    return ResponseOfferSnapshot.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseOfferSnapshot>, I>>(object: I): ResponseOfferSnapshot {
    const message = createBaseResponseOfferSnapshot();
    message.result = object.result ?? 0;
    return message;
  },
};

function createBaseResponseLoadSnapshotChunk(): ResponseLoadSnapshotChunk {
  return { chunk: new Uint8Array(0) };
}

export const ResponseLoadSnapshotChunk = {
  encode(message: ResponseLoadSnapshotChunk, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chunk.length !== 0) {
      writer.uint32(10).bytes(message.chunk);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseLoadSnapshotChunk {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseLoadSnapshotChunk();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.chunk = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseLoadSnapshotChunk {
    return { chunk: isSet(object.chunk) ? bytesFromBase64(object.chunk) : new Uint8Array(0) };
  },

  toJSON(message: ResponseLoadSnapshotChunk): unknown {
    const obj: any = {};
    if (message.chunk.length !== 0) {
      obj.chunk = base64FromBytes(message.chunk);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ResponseLoadSnapshotChunk>, I>>(base?: I): ResponseLoadSnapshotChunk {
    return ResponseLoadSnapshotChunk.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseLoadSnapshotChunk>, I>>(object: I): ResponseLoadSnapshotChunk {
    const message = createBaseResponseLoadSnapshotChunk();
    message.chunk = object.chunk ?? new Uint8Array(0);
    return message;
  },
};

function createBaseResponseApplySnapshotChunk(): ResponseApplySnapshotChunk {
  return { result: 0, refetchChunks: [], rejectSenders: [] };
}

export const ResponseApplySnapshotChunk = {
  encode(message: ResponseApplySnapshotChunk, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    writer.uint32(18).fork();
    for (const v of message.refetchChunks) {
      writer.uint32(v);
    }
    writer.ldelim();
    for (const v of message.rejectSenders) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseApplySnapshotChunk {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseApplySnapshotChunk();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.result = reader.int32() as any;
          continue;
        case 2:
          if (tag === 16) {
            message.refetchChunks.push(reader.uint32());

            continue;
          }

          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.refetchChunks.push(reader.uint32());
            }

            continue;
          }

          break;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.rejectSenders.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseApplySnapshotChunk {
    return {
      result: isSet(object.result) ? responseApplySnapshotChunk_ResultFromJSON(object.result) : 0,
      refetchChunks: Array.isArray(object?.refetchChunks) ? object.refetchChunks.map((e: any) => Number(e)) : [],
      rejectSenders: Array.isArray(object?.rejectSenders) ? object.rejectSenders.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: ResponseApplySnapshotChunk): unknown {
    const obj: any = {};
    if (message.result !== 0) {
      obj.result = responseApplySnapshotChunk_ResultToJSON(message.result);
    }
    if (message.refetchChunks?.length) {
      obj.refetchChunks = message.refetchChunks.map((e) => Math.round(e));
    }
    if (message.rejectSenders?.length) {
      obj.rejectSenders = message.rejectSenders;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ResponseApplySnapshotChunk>, I>>(base?: I): ResponseApplySnapshotChunk {
    return ResponseApplySnapshotChunk.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseApplySnapshotChunk>, I>>(object: I): ResponseApplySnapshotChunk {
    const message = createBaseResponseApplySnapshotChunk();
    message.result = object.result ?? 0;
    message.refetchChunks = object.refetchChunks?.map((e) => e) || [];
    message.rejectSenders = object.rejectSenders?.map((e) => e) || [];
    return message;
  },
};

function createBaseResponsePrepareProposal(): ResponsePrepareProposal {
  return { txs: [] };
}

export const ResponsePrepareProposal = {
  encode(message: ResponsePrepareProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.txs) {
      writer.uint32(10).bytes(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponsePrepareProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponsePrepareProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.txs.push(reader.bytes());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponsePrepareProposal {
    return { txs: Array.isArray(object?.txs) ? object.txs.map((e: any) => bytesFromBase64(e)) : [] };
  },

  toJSON(message: ResponsePrepareProposal): unknown {
    const obj: any = {};
    if (message.txs?.length) {
      obj.txs = message.txs.map((e) => base64FromBytes(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ResponsePrepareProposal>, I>>(base?: I): ResponsePrepareProposal {
    return ResponsePrepareProposal.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponsePrepareProposal>, I>>(object: I): ResponsePrepareProposal {
    const message = createBaseResponsePrepareProposal();
    message.txs = object.txs?.map((e) => e) || [];
    return message;
  },
};

function createBaseResponseProcessProposal(): ResponseProcessProposal {
  return { status: 0 };
}

export const ResponseProcessProposal = {
  encode(message: ResponseProcessProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseProcessProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseProcessProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseProcessProposal {
    return { status: isSet(object.status) ? responseProcessProposal_ProposalStatusFromJSON(object.status) : 0 };
  },

  toJSON(message: ResponseProcessProposal): unknown {
    const obj: any = {};
    if (message.status !== 0) {
      obj.status = responseProcessProposal_ProposalStatusToJSON(message.status);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ResponseProcessProposal>, I>>(base?: I): ResponseProcessProposal {
    return ResponseProcessProposal.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseProcessProposal>, I>>(object: I): ResponseProcessProposal {
    const message = createBaseResponseProcessProposal();
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseResponseExtendVote(): ResponseExtendVote {
  return { voteExtension: new Uint8Array(0) };
}

export const ResponseExtendVote = {
  encode(message: ResponseExtendVote, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.voteExtension.length !== 0) {
      writer.uint32(10).bytes(message.voteExtension);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseExtendVote {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseExtendVote();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.voteExtension = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseExtendVote {
    return { voteExtension: isSet(object.voteExtension) ? bytesFromBase64(object.voteExtension) : new Uint8Array(0) };
  },

  toJSON(message: ResponseExtendVote): unknown {
    const obj: any = {};
    if (message.voteExtension.length !== 0) {
      obj.voteExtension = base64FromBytes(message.voteExtension);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ResponseExtendVote>, I>>(base?: I): ResponseExtendVote {
    return ResponseExtendVote.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseExtendVote>, I>>(object: I): ResponseExtendVote {
    const message = createBaseResponseExtendVote();
    message.voteExtension = object.voteExtension ?? new Uint8Array(0);
    return message;
  },
};

function createBaseResponseVerifyVoteExtension(): ResponseVerifyVoteExtension {
  return { status: 0 };
}

export const ResponseVerifyVoteExtension = {
  encode(message: ResponseVerifyVoteExtension, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseVerifyVoteExtension {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseVerifyVoteExtension();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseVerifyVoteExtension {
    return { status: isSet(object.status) ? responseVerifyVoteExtension_VerifyStatusFromJSON(object.status) : 0 };
  },

  toJSON(message: ResponseVerifyVoteExtension): unknown {
    const obj: any = {};
    if (message.status !== 0) {
      obj.status = responseVerifyVoteExtension_VerifyStatusToJSON(message.status);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ResponseVerifyVoteExtension>, I>>(base?: I): ResponseVerifyVoteExtension {
    return ResponseVerifyVoteExtension.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseVerifyVoteExtension>, I>>(object: I): ResponseVerifyVoteExtension {
    const message = createBaseResponseVerifyVoteExtension();
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseResponseFinalizeBlock(): ResponseFinalizeBlock {
  return {
    events: [],
    txResults: [],
    validatorUpdates: [],
    consensusParamUpdates: undefined,
    appHash: new Uint8Array(0),
  };
}

export const ResponseFinalizeBlock = {
  encode(message: ResponseFinalizeBlock, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.events) {
      Event.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.txResults) {
      ExecTxResult.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.validatorUpdates) {
      ValidatorUpdate.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.consensusParamUpdates !== undefined) {
      ConsensusParams.encode(message.consensusParamUpdates, writer.uint32(34).fork()).ldelim();
    }
    if (message.appHash.length !== 0) {
      writer.uint32(42).bytes(message.appHash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseFinalizeBlock {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseFinalizeBlock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.events.push(Event.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.txResults.push(ExecTxResult.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.validatorUpdates.push(ValidatorUpdate.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.consensusParamUpdates = ConsensusParams.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.appHash = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseFinalizeBlock {
    return {
      events: Array.isArray(object?.events) ? object.events.map((e: any) => Event.fromJSON(e)) : [],
      txResults: Array.isArray(object?.txResults) ? object.txResults.map((e: any) => ExecTxResult.fromJSON(e)) : [],
      validatorUpdates: Array.isArray(object?.validatorUpdates)
        ? object.validatorUpdates.map((e: any) => ValidatorUpdate.fromJSON(e))
        : [],
      consensusParamUpdates: isSet(object.consensusParamUpdates)
        ? ConsensusParams.fromJSON(object.consensusParamUpdates)
        : undefined,
      appHash: isSet(object.appHash) ? bytesFromBase64(object.appHash) : new Uint8Array(0),
    };
  },

  toJSON(message: ResponseFinalizeBlock): unknown {
    const obj: any = {};
    if (message.events?.length) {
      obj.events = message.events.map((e) => Event.toJSON(e));
    }
    if (message.txResults?.length) {
      obj.txResults = message.txResults.map((e) => ExecTxResult.toJSON(e));
    }
    if (message.validatorUpdates?.length) {
      obj.validatorUpdates = message.validatorUpdates.map((e) => ValidatorUpdate.toJSON(e));
    }
    if (message.consensusParamUpdates !== undefined) {
      obj.consensusParamUpdates = ConsensusParams.toJSON(message.consensusParamUpdates);
    }
    if (message.appHash.length !== 0) {
      obj.appHash = base64FromBytes(message.appHash);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ResponseFinalizeBlock>, I>>(base?: I): ResponseFinalizeBlock {
    return ResponseFinalizeBlock.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseFinalizeBlock>, I>>(object: I): ResponseFinalizeBlock {
    const message = createBaseResponseFinalizeBlock();
    message.events = object.events?.map((e) => Event.fromPartial(e)) || [];
    message.txResults = object.txResults?.map((e) => ExecTxResult.fromPartial(e)) || [];
    message.validatorUpdates = object.validatorUpdates?.map((e) => ValidatorUpdate.fromPartial(e)) || [];
    message.consensusParamUpdates =
      (object.consensusParamUpdates !== undefined && object.consensusParamUpdates !== null)
        ? ConsensusParams.fromPartial(object.consensusParamUpdates)
        : undefined;
    message.appHash = object.appHash ?? new Uint8Array(0);
    return message;
  },
};

function createBaseCommitInfo(): CommitInfo {
  return { round: 0, votes: [] };
}

export const CommitInfo = {
  encode(message: CommitInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.round !== 0) {
      writer.uint32(8).int32(message.round);
    }
    for (const v of message.votes) {
      VoteInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommitInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommitInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.round = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.votes.push(VoteInfo.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommitInfo {
    return {
      round: isSet(object.round) ? Number(object.round) : 0,
      votes: Array.isArray(object?.votes) ? object.votes.map((e: any) => VoteInfo.fromJSON(e)) : [],
    };
  },

  toJSON(message: CommitInfo): unknown {
    const obj: any = {};
    if (message.round !== 0) {
      obj.round = Math.round(message.round);
    }
    if (message.votes?.length) {
      obj.votes = message.votes.map((e) => VoteInfo.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommitInfo>, I>>(base?: I): CommitInfo {
    return CommitInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommitInfo>, I>>(object: I): CommitInfo {
    const message = createBaseCommitInfo();
    message.round = object.round ?? 0;
    message.votes = object.votes?.map((e) => VoteInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseExtendedCommitInfo(): ExtendedCommitInfo {
  return { round: 0, votes: [] };
}

export const ExtendedCommitInfo = {
  encode(message: ExtendedCommitInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.round !== 0) {
      writer.uint32(8).int32(message.round);
    }
    for (const v of message.votes) {
      ExtendedVoteInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExtendedCommitInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExtendedCommitInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.round = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.votes.push(ExtendedVoteInfo.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExtendedCommitInfo {
    return {
      round: isSet(object.round) ? Number(object.round) : 0,
      votes: Array.isArray(object?.votes) ? object.votes.map((e: any) => ExtendedVoteInfo.fromJSON(e)) : [],
    };
  },

  toJSON(message: ExtendedCommitInfo): unknown {
    const obj: any = {};
    if (message.round !== 0) {
      obj.round = Math.round(message.round);
    }
    if (message.votes?.length) {
      obj.votes = message.votes.map((e) => ExtendedVoteInfo.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExtendedCommitInfo>, I>>(base?: I): ExtendedCommitInfo {
    return ExtendedCommitInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExtendedCommitInfo>, I>>(object: I): ExtendedCommitInfo {
    const message = createBaseExtendedCommitInfo();
    message.round = object.round ?? 0;
    message.votes = object.votes?.map((e) => ExtendedVoteInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseEvent(): Event {
  return { type: "", attributes: [] };
}

export const Event = {
  encode(message: Event, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== "") {
      writer.uint32(10).string(message.type);
    }
    for (const v of message.attributes) {
      EventAttribute.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Event {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.type = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.attributes.push(EventAttribute.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Event {
    return {
      type: isSet(object.type) ? String(object.type) : "",
      attributes: Array.isArray(object?.attributes)
        ? object.attributes.map((e: any) => EventAttribute.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Event): unknown {
    const obj: any = {};
    if (message.type !== "") {
      obj.type = message.type;
    }
    if (message.attributes?.length) {
      obj.attributes = message.attributes.map((e) => EventAttribute.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Event>, I>>(base?: I): Event {
    return Event.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Event>, I>>(object: I): Event {
    const message = createBaseEvent();
    message.type = object.type ?? "";
    message.attributes = object.attributes?.map((e) => EventAttribute.fromPartial(e)) || [];
    return message;
  },
};

function createBaseEventAttribute(): EventAttribute {
  return { key: "", value: "", index: false };
}

export const EventAttribute = {
  encode(message: EventAttribute, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    if (message.index === true) {
      writer.uint32(24).bool(message.index);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventAttribute {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventAttribute();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.index = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EventAttribute {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? String(object.value) : "",
      index: isSet(object.index) ? Boolean(object.index) : false,
    };
  },

  toJSON(message: EventAttribute): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    if (message.index === true) {
      obj.index = message.index;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EventAttribute>, I>>(base?: I): EventAttribute {
    return EventAttribute.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EventAttribute>, I>>(object: I): EventAttribute {
    const message = createBaseEventAttribute();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    message.index = object.index ?? false;
    return message;
  },
};

function createBaseExecTxResult(): ExecTxResult {
  return { code: 0, data: new Uint8Array(0), log: "", info: "", gasWanted: 0, gasUsed: 0, events: [], codespace: "" };
}

export const ExecTxResult = {
  encode(message: ExecTxResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== 0) {
      writer.uint32(8).uint32(message.code);
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    if (message.log !== "") {
      writer.uint32(26).string(message.log);
    }
    if (message.info !== "") {
      writer.uint32(34).string(message.info);
    }
    if (message.gasWanted !== 0) {
      writer.uint32(40).int64(message.gasWanted);
    }
    if (message.gasUsed !== 0) {
      writer.uint32(48).int64(message.gasUsed);
    }
    for (const v of message.events) {
      Event.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.codespace !== "") {
      writer.uint32(66).string(message.codespace);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecTxResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecTxResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.code = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.data = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.log = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.info = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.gasWanted = longToNumber(reader.int64() as Long);
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.gasUsed = longToNumber(reader.int64() as Long);
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.events.push(Event.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.codespace = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExecTxResult {
    return {
      code: isSet(object.code) ? Number(object.code) : 0,
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
      log: isSet(object.log) ? String(object.log) : "",
      info: isSet(object.info) ? String(object.info) : "",
      gasWanted: isSet(object.gas_wanted) ? Number(object.gas_wanted) : 0,
      gasUsed: isSet(object.gas_used) ? Number(object.gas_used) : 0,
      events: Array.isArray(object?.events) ? object.events.map((e: any) => Event.fromJSON(e)) : [],
      codespace: isSet(object.codespace) ? String(object.codespace) : "",
    };
  },

  toJSON(message: ExecTxResult): unknown {
    const obj: any = {};
    if (message.code !== 0) {
      obj.code = Math.round(message.code);
    }
    if (message.data.length !== 0) {
      obj.data = base64FromBytes(message.data);
    }
    if (message.log !== "") {
      obj.log = message.log;
    }
    if (message.info !== "") {
      obj.info = message.info;
    }
    if (message.gasWanted !== 0) {
      obj.gas_wanted = Math.round(message.gasWanted);
    }
    if (message.gasUsed !== 0) {
      obj.gas_used = Math.round(message.gasUsed);
    }
    if (message.events?.length) {
      obj.events = message.events.map((e) => Event.toJSON(e));
    }
    if (message.codespace !== "") {
      obj.codespace = message.codespace;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExecTxResult>, I>>(base?: I): ExecTxResult {
    return ExecTxResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExecTxResult>, I>>(object: I): ExecTxResult {
    const message = createBaseExecTxResult();
    message.code = object.code ?? 0;
    message.data = object.data ?? new Uint8Array(0);
    message.log = object.log ?? "";
    message.info = object.info ?? "";
    message.gasWanted = object.gasWanted ?? 0;
    message.gasUsed = object.gasUsed ?? 0;
    message.events = object.events?.map((e) => Event.fromPartial(e)) || [];
    message.codespace = object.codespace ?? "";
    return message;
  },
};

function createBaseTxResult(): TxResult {
  return { height: 0, index: 0, tx: new Uint8Array(0), result: undefined };
}

export const TxResult = {
  encode(message: TxResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== 0) {
      writer.uint32(8).int64(message.height);
    }
    if (message.index !== 0) {
      writer.uint32(16).uint32(message.index);
    }
    if (message.tx.length !== 0) {
      writer.uint32(26).bytes(message.tx);
    }
    if (message.result !== undefined) {
      ExecTxResult.encode(message.result, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TxResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTxResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.height = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.index = reader.uint32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.tx = reader.bytes();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.result = ExecTxResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TxResult {
    return {
      height: isSet(object.height) ? Number(object.height) : 0,
      index: isSet(object.index) ? Number(object.index) : 0,
      tx: isSet(object.tx) ? bytesFromBase64(object.tx) : new Uint8Array(0),
      result: isSet(object.result) ? ExecTxResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: TxResult): unknown {
    const obj: any = {};
    if (message.height !== 0) {
      obj.height = Math.round(message.height);
    }
    if (message.index !== 0) {
      obj.index = Math.round(message.index);
    }
    if (message.tx.length !== 0) {
      obj.tx = base64FromBytes(message.tx);
    }
    if (message.result !== undefined) {
      obj.result = ExecTxResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TxResult>, I>>(base?: I): TxResult {
    return TxResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TxResult>, I>>(object: I): TxResult {
    const message = createBaseTxResult();
    message.height = object.height ?? 0;
    message.index = object.index ?? 0;
    message.tx = object.tx ?? new Uint8Array(0);
    message.result = (object.result !== undefined && object.result !== null)
      ? ExecTxResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseValidator(): Validator {
  return { address: new Uint8Array(0), power: 0 };
}

export const Validator = {
  encode(message: Validator, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address.length !== 0) {
      writer.uint32(10).bytes(message.address);
    }
    if (message.power !== 0) {
      writer.uint32(24).int64(message.power);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Validator {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.address = reader.bytes();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.power = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Validator {
    return {
      address: isSet(object.address) ? bytesFromBase64(object.address) : new Uint8Array(0),
      power: isSet(object.power) ? Number(object.power) : 0,
    };
  },

  toJSON(message: Validator): unknown {
    const obj: any = {};
    if (message.address.length !== 0) {
      obj.address = base64FromBytes(message.address);
    }
    if (message.power !== 0) {
      obj.power = Math.round(message.power);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Validator>, I>>(base?: I): Validator {
    return Validator.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Validator>, I>>(object: I): Validator {
    const message = createBaseValidator();
    message.address = object.address ?? new Uint8Array(0);
    message.power = object.power ?? 0;
    return message;
  },
};

function createBaseValidatorUpdate(): ValidatorUpdate {
  return { pubKey: undefined, power: 0 };
}

export const ValidatorUpdate = {
  encode(message: ValidatorUpdate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pubKey !== undefined) {
      PublicKey.encode(message.pubKey, writer.uint32(10).fork()).ldelim();
    }
    if (message.power !== 0) {
      writer.uint32(16).int64(message.power);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorUpdate {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pubKey = PublicKey.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.power = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValidatorUpdate {
    return {
      pubKey: isSet(object.pubKey) ? PublicKey.fromJSON(object.pubKey) : undefined,
      power: isSet(object.power) ? Number(object.power) : 0,
    };
  },

  toJSON(message: ValidatorUpdate): unknown {
    const obj: any = {};
    if (message.pubKey !== undefined) {
      obj.pubKey = PublicKey.toJSON(message.pubKey);
    }
    if (message.power !== 0) {
      obj.power = Math.round(message.power);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidatorUpdate>, I>>(base?: I): ValidatorUpdate {
    return ValidatorUpdate.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValidatorUpdate>, I>>(object: I): ValidatorUpdate {
    const message = createBaseValidatorUpdate();
    message.pubKey = (object.pubKey !== undefined && object.pubKey !== null)
      ? PublicKey.fromPartial(object.pubKey)
      : undefined;
    message.power = object.power ?? 0;
    return message;
  },
};

function createBaseVoteInfo(): VoteInfo {
  return { validator: undefined, blockIdFlag: 0 };
}

export const VoteInfo = {
  encode(message: VoteInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.validator !== undefined) {
      Validator.encode(message.validator, writer.uint32(10).fork()).ldelim();
    }
    if (message.blockIdFlag !== 0) {
      writer.uint32(24).int32(message.blockIdFlag);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VoteInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVoteInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.validator = Validator.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.blockIdFlag = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VoteInfo {
    return {
      validator: isSet(object.validator) ? Validator.fromJSON(object.validator) : undefined,
      blockIdFlag: isSet(object.blockIdFlag) ? blockIDFlagFromJSON(object.blockIdFlag) : 0,
    };
  },

  toJSON(message: VoteInfo): unknown {
    const obj: any = {};
    if (message.validator !== undefined) {
      obj.validator = Validator.toJSON(message.validator);
    }
    if (message.blockIdFlag !== 0) {
      obj.blockIdFlag = blockIDFlagToJSON(message.blockIdFlag);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VoteInfo>, I>>(base?: I): VoteInfo {
    return VoteInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VoteInfo>, I>>(object: I): VoteInfo {
    const message = createBaseVoteInfo();
    message.validator = (object.validator !== undefined && object.validator !== null)
      ? Validator.fromPartial(object.validator)
      : undefined;
    message.blockIdFlag = object.blockIdFlag ?? 0;
    return message;
  },
};

function createBaseExtendedVoteInfo(): ExtendedVoteInfo {
  return {
    validator: undefined,
    voteExtension: new Uint8Array(0),
    extensionSignature: new Uint8Array(0),
    blockIdFlag: 0,
  };
}

export const ExtendedVoteInfo = {
  encode(message: ExtendedVoteInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.validator !== undefined) {
      Validator.encode(message.validator, writer.uint32(10).fork()).ldelim();
    }
    if (message.voteExtension.length !== 0) {
      writer.uint32(26).bytes(message.voteExtension);
    }
    if (message.extensionSignature.length !== 0) {
      writer.uint32(34).bytes(message.extensionSignature);
    }
    if (message.blockIdFlag !== 0) {
      writer.uint32(40).int32(message.blockIdFlag);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExtendedVoteInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExtendedVoteInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.validator = Validator.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.voteExtension = reader.bytes();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.extensionSignature = reader.bytes();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.blockIdFlag = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExtendedVoteInfo {
    return {
      validator: isSet(object.validator) ? Validator.fromJSON(object.validator) : undefined,
      voteExtension: isSet(object.voteExtension) ? bytesFromBase64(object.voteExtension) : new Uint8Array(0),
      extensionSignature: isSet(object.extensionSignature)
        ? bytesFromBase64(object.extensionSignature)
        : new Uint8Array(0),
      blockIdFlag: isSet(object.blockIdFlag) ? blockIDFlagFromJSON(object.blockIdFlag) : 0,
    };
  },

  toJSON(message: ExtendedVoteInfo): unknown {
    const obj: any = {};
    if (message.validator !== undefined) {
      obj.validator = Validator.toJSON(message.validator);
    }
    if (message.voteExtension.length !== 0) {
      obj.voteExtension = base64FromBytes(message.voteExtension);
    }
    if (message.extensionSignature.length !== 0) {
      obj.extensionSignature = base64FromBytes(message.extensionSignature);
    }
    if (message.blockIdFlag !== 0) {
      obj.blockIdFlag = blockIDFlagToJSON(message.blockIdFlag);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExtendedVoteInfo>, I>>(base?: I): ExtendedVoteInfo {
    return ExtendedVoteInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExtendedVoteInfo>, I>>(object: I): ExtendedVoteInfo {
    const message = createBaseExtendedVoteInfo();
    message.validator = (object.validator !== undefined && object.validator !== null)
      ? Validator.fromPartial(object.validator)
      : undefined;
    message.voteExtension = object.voteExtension ?? new Uint8Array(0);
    message.extensionSignature = object.extensionSignature ?? new Uint8Array(0);
    message.blockIdFlag = object.blockIdFlag ?? 0;
    return message;
  },
};

function createBaseMisbehavior(): Misbehavior {
  return { type: 0, validator: undefined, height: 0, time: undefined, totalVotingPower: 0 };
}

export const Misbehavior = {
  encode(message: Misbehavior, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.validator !== undefined) {
      Validator.encode(message.validator, writer.uint32(18).fork()).ldelim();
    }
    if (message.height !== 0) {
      writer.uint32(24).int64(message.height);
    }
    if (message.time !== undefined) {
      Timestamp.encode(toTimestamp(message.time), writer.uint32(34).fork()).ldelim();
    }
    if (message.totalVotingPower !== 0) {
      writer.uint32(40).int64(message.totalVotingPower);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Misbehavior {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMisbehavior();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.validator = Validator.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.height = longToNumber(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.totalVotingPower = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Misbehavior {
    return {
      type: isSet(object.type) ? misbehaviorTypeFromJSON(object.type) : 0,
      validator: isSet(object.validator) ? Validator.fromJSON(object.validator) : undefined,
      height: isSet(object.height) ? Number(object.height) : 0,
      time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
      totalVotingPower: isSet(object.totalVotingPower) ? Number(object.totalVotingPower) : 0,
    };
  },

  toJSON(message: Misbehavior): unknown {
    const obj: any = {};
    if (message.type !== 0) {
      obj.type = misbehaviorTypeToJSON(message.type);
    }
    if (message.validator !== undefined) {
      obj.validator = Validator.toJSON(message.validator);
    }
    if (message.height !== 0) {
      obj.height = Math.round(message.height);
    }
    if (message.time !== undefined) {
      obj.time = message.time.toISOString();
    }
    if (message.totalVotingPower !== 0) {
      obj.totalVotingPower = Math.round(message.totalVotingPower);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Misbehavior>, I>>(base?: I): Misbehavior {
    return Misbehavior.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Misbehavior>, I>>(object: I): Misbehavior {
    const message = createBaseMisbehavior();
    message.type = object.type ?? 0;
    message.validator = (object.validator !== undefined && object.validator !== null)
      ? Validator.fromPartial(object.validator)
      : undefined;
    message.height = object.height ?? 0;
    message.time = object.time ?? undefined;
    message.totalVotingPower = object.totalVotingPower ?? 0;
    return message;
  },
};

function createBaseSnapshot(): Snapshot {
  return { height: 0, format: 0, chunks: 0, hash: new Uint8Array(0), metadata: new Uint8Array(0) };
}

export const Snapshot = {
  encode(message: Snapshot, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== 0) {
      writer.uint32(8).uint64(message.height);
    }
    if (message.format !== 0) {
      writer.uint32(16).uint32(message.format);
    }
    if (message.chunks !== 0) {
      writer.uint32(24).uint32(message.chunks);
    }
    if (message.hash.length !== 0) {
      writer.uint32(34).bytes(message.hash);
    }
    if (message.metadata.length !== 0) {
      writer.uint32(42).bytes(message.metadata);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Snapshot {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSnapshot();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.height = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.format = reader.uint32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.chunks = reader.uint32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.hash = reader.bytes();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.metadata = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Snapshot {
    return {
      height: isSet(object.height) ? Number(object.height) : 0,
      format: isSet(object.format) ? Number(object.format) : 0,
      chunks: isSet(object.chunks) ? Number(object.chunks) : 0,
      hash: isSet(object.hash) ? bytesFromBase64(object.hash) : new Uint8Array(0),
      metadata: isSet(object.metadata) ? bytesFromBase64(object.metadata) : new Uint8Array(0),
    };
  },

  toJSON(message: Snapshot): unknown {
    const obj: any = {};
    if (message.height !== 0) {
      obj.height = Math.round(message.height);
    }
    if (message.format !== 0) {
      obj.format = Math.round(message.format);
    }
    if (message.chunks !== 0) {
      obj.chunks = Math.round(message.chunks);
    }
    if (message.hash.length !== 0) {
      obj.hash = base64FromBytes(message.hash);
    }
    if (message.metadata.length !== 0) {
      obj.metadata = base64FromBytes(message.metadata);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Snapshot>, I>>(base?: I): Snapshot {
    return Snapshot.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Snapshot>, I>>(object: I): Snapshot {
    const message = createBaseSnapshot();
    message.height = object.height ?? 0;
    message.format = object.format ?? 0;
    message.chunks = object.chunks ?? 0;
    message.hash = object.hash ?? new Uint8Array(0);
    message.metadata = object.metadata ?? new Uint8Array(0);
    return message;
  },
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

export const ABCIServiceName = "tendermint.abci.ABCI";
export class ABCIClientImpl implements ABCI {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || ABCIServiceName;
    this.rpc = rpc;
    this.Echo = this.Echo.bind(this);
    this.Flush = this.Flush.bind(this);
    this.Info = this.Info.bind(this);
    this.CheckTx = this.CheckTx.bind(this);
    this.Query = this.Query.bind(this);
    this.Commit = this.Commit.bind(this);
    this.InitChain = this.InitChain.bind(this);
    this.ListSnapshots = this.ListSnapshots.bind(this);
    this.OfferSnapshot = this.OfferSnapshot.bind(this);
    this.LoadSnapshotChunk = this.LoadSnapshotChunk.bind(this);
    this.ApplySnapshotChunk = this.ApplySnapshotChunk.bind(this);
    this.PrepareProposal = this.PrepareProposal.bind(this);
    this.ProcessProposal = this.ProcessProposal.bind(this);
    this.ExtendVote = this.ExtendVote.bind(this);
    this.VerifyVoteExtension = this.VerifyVoteExtension.bind(this);
    this.FinalizeBlock = this.FinalizeBlock.bind(this);
  }
  Echo(request: RequestEcho): Promise<ResponseEcho> {
    const data = RequestEcho.encode(request).finish();
    const promise = this.rpc.request(this.service, "Echo", data);
    return promise.then((data) => ResponseEcho.decode(_m0.Reader.create(data)));
  }

  Flush(request: RequestFlush): Promise<ResponseFlush> {
    const data = RequestFlush.encode(request).finish();
    const promise = this.rpc.request(this.service, "Flush", data);
    return promise.then((data) => ResponseFlush.decode(_m0.Reader.create(data)));
  }

  Info(request: RequestInfo): Promise<ResponseInfo> {
    const data = RequestInfo.encode(request).finish();
    const promise = this.rpc.request(this.service, "Info", data);
    return promise.then((data) => ResponseInfo.decode(_m0.Reader.create(data)));
  }

  CheckTx(request: RequestCheckTx): Promise<ResponseCheckTx> {
    const data = RequestCheckTx.encode(request).finish();
    const promise = this.rpc.request(this.service, "CheckTx", data);
    return promise.then((data) => ResponseCheckTx.decode(_m0.Reader.create(data)));
  }

  Query(request: RequestQuery): Promise<ResponseQuery> {
    const data = RequestQuery.encode(request).finish();
    const promise = this.rpc.request(this.service, "Query", data);
    return promise.then((data) => ResponseQuery.decode(_m0.Reader.create(data)));
  }

  Commit(request: RequestCommit): Promise<ResponseCommit> {
    const data = RequestCommit.encode(request).finish();
    const promise = this.rpc.request(this.service, "Commit", data);
    return promise.then((data) => ResponseCommit.decode(_m0.Reader.create(data)));
  }

  InitChain(request: RequestInitChain): Promise<ResponseInitChain> {
    const data = RequestInitChain.encode(request).finish();
    const promise = this.rpc.request(this.service, "InitChain", data);
    return promise.then((data) => ResponseInitChain.decode(_m0.Reader.create(data)));
  }

  ListSnapshots(request: RequestListSnapshots): Promise<ResponseListSnapshots> {
    const data = RequestListSnapshots.encode(request).finish();
    const promise = this.rpc.request(this.service, "ListSnapshots", data);
    return promise.then((data) => ResponseListSnapshots.decode(_m0.Reader.create(data)));
  }

  OfferSnapshot(request: RequestOfferSnapshot): Promise<ResponseOfferSnapshot> {
    const data = RequestOfferSnapshot.encode(request).finish();
    const promise = this.rpc.request(this.service, "OfferSnapshot", data);
    return promise.then((data) => ResponseOfferSnapshot.decode(_m0.Reader.create(data)));
  }

  LoadSnapshotChunk(request: RequestLoadSnapshotChunk): Promise<ResponseLoadSnapshotChunk> {
    const data = RequestLoadSnapshotChunk.encode(request).finish();
    const promise = this.rpc.request(this.service, "LoadSnapshotChunk", data);
    return promise.then((data) => ResponseLoadSnapshotChunk.decode(_m0.Reader.create(data)));
  }

  ApplySnapshotChunk(request: RequestApplySnapshotChunk): Promise<ResponseApplySnapshotChunk> {
    const data = RequestApplySnapshotChunk.encode(request).finish();
    const promise = this.rpc.request(this.service, "ApplySnapshotChunk", data);
    return promise.then((data) => ResponseApplySnapshotChunk.decode(_m0.Reader.create(data)));
  }

  PrepareProposal(request: RequestPrepareProposal): Promise<ResponsePrepareProposal> {
    const data = RequestPrepareProposal.encode(request).finish();
    const promise = this.rpc.request(this.service, "PrepareProposal", data);
    return promise.then((data) => ResponsePrepareProposal.decode(_m0.Reader.create(data)));
  }

  ProcessProposal(request: RequestProcessProposal): Promise<ResponseProcessProposal> {
    const data = RequestProcessProposal.encode(request).finish();
    const promise = this.rpc.request(this.service, "ProcessProposal", data);
    return promise.then((data) => ResponseProcessProposal.decode(_m0.Reader.create(data)));
  }

  ExtendVote(request: RequestExtendVote): Promise<ResponseExtendVote> {
    const data = RequestExtendVote.encode(request).finish();
    const promise = this.rpc.request(this.service, "ExtendVote", data);
    return promise.then((data) => ResponseExtendVote.decode(_m0.Reader.create(data)));
  }

  VerifyVoteExtension(request: RequestVerifyVoteExtension): Promise<ResponseVerifyVoteExtension> {
    const data = RequestVerifyVoteExtension.encode(request).finish();
    const promise = this.rpc.request(this.service, "VerifyVoteExtension", data);
    return promise.then((data) => ResponseVerifyVoteExtension.decode(_m0.Reader.create(data)));
  }

  FinalizeBlock(request: RequestFinalizeBlock): Promise<ResponseFinalizeBlock> {
    const data = RequestFinalizeBlock.encode(request).finish();
    const promise = this.rpc.request(this.service, "FinalizeBlock", data);
    return promise.then((data) => ResponseFinalizeBlock.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
