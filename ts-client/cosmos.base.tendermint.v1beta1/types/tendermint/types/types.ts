/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";
import { Proof } from "../crypto/proof";
import { Consensus } from "../version/types";
import { BlockIDFlag, blockIDFlagFromJSON, blockIDFlagToJSON, ValidatorSet } from "./validator";

export const protobufPackage = "tendermint.types";

/** SignedMsgType is a type of signed message in the consensus. */
export enum SignedMsgType {
  SIGNED_MSG_TYPE_UNKNOWN = 0,
  /** SIGNED_MSG_TYPE_PREVOTE - Votes */
  SIGNED_MSG_TYPE_PREVOTE = 1,
  SIGNED_MSG_TYPE_PRECOMMIT = 2,
  /** SIGNED_MSG_TYPE_PROPOSAL - Proposals */
  SIGNED_MSG_TYPE_PROPOSAL = 32,
  UNRECOGNIZED = -1,
}

export function signedMsgTypeFromJSON(object: any): SignedMsgType {
  switch (object) {
    case 0:
    case "SIGNED_MSG_TYPE_UNKNOWN":
      return SignedMsgType.SIGNED_MSG_TYPE_UNKNOWN;
    case 1:
    case "SIGNED_MSG_TYPE_PREVOTE":
      return SignedMsgType.SIGNED_MSG_TYPE_PREVOTE;
    case 2:
    case "SIGNED_MSG_TYPE_PRECOMMIT":
      return SignedMsgType.SIGNED_MSG_TYPE_PRECOMMIT;
    case 32:
    case "SIGNED_MSG_TYPE_PROPOSAL":
      return SignedMsgType.SIGNED_MSG_TYPE_PROPOSAL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SignedMsgType.UNRECOGNIZED;
  }
}

export function signedMsgTypeToJSON(object: SignedMsgType): string {
  switch (object) {
    case SignedMsgType.SIGNED_MSG_TYPE_UNKNOWN:
      return "SIGNED_MSG_TYPE_UNKNOWN";
    case SignedMsgType.SIGNED_MSG_TYPE_PREVOTE:
      return "SIGNED_MSG_TYPE_PREVOTE";
    case SignedMsgType.SIGNED_MSG_TYPE_PRECOMMIT:
      return "SIGNED_MSG_TYPE_PRECOMMIT";
    case SignedMsgType.SIGNED_MSG_TYPE_PROPOSAL:
      return "SIGNED_MSG_TYPE_PROPOSAL";
    case SignedMsgType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** PartsetHeader */
export interface PartSetHeader {
  total: number;
  hash: Uint8Array;
}

export interface Part {
  index: number;
  bytes: Uint8Array;
  proof: Proof | undefined;
}

/** BlockID */
export interface BlockID {
  hash: Uint8Array;
  partSetHeader: PartSetHeader | undefined;
}

/** Header defines the structure of a block header. */
export interface Header {
  /** basic block info */
  version: Consensus | undefined;
  chainId: string;
  height: number;
  time:
    | Date
    | undefined;
  /** prev block info */
  lastBlockId:
    | BlockID
    | undefined;
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
  /** original proposer of the block */
  proposerAddress: Uint8Array;
}

/** Data contains the set of transactions included in the block */
export interface Data {
  /**
   * Txs that will be applied by state @ block.Height+1.
   * NOTE: not all txs here are valid.  We're just agreeing on the order first.
   * This means that block.AppHash does not include these txs.
   */
  txs: Uint8Array[];
}

/**
 * Vote represents a prevote or precommit vote from validators for
 * consensus.
 */
export interface Vote {
  type: SignedMsgType;
  height: number;
  round: number;
  /** zero if vote is nil. */
  blockId: BlockID | undefined;
  timestamp: Date | undefined;
  validatorAddress: Uint8Array;
  validatorIndex: number;
  /**
   * Vote signature by the validator if they participated in consensus for the
   * associated block.
   */
  signature: Uint8Array;
  /**
   * Vote extension provided by the application. Only valid for precommit
   * messages.
   */
  extension: Uint8Array;
  /**
   * Vote extension signature by the validator if they participated in
   * consensus for the associated block.
   * Only valid for precommit messages.
   */
  extensionSignature: Uint8Array;
}

/** Commit contains the evidence that a block was committed by a set of validators. */
export interface Commit {
  height: number;
  round: number;
  blockId: BlockID | undefined;
  signatures: CommitSig[];
}

/** CommitSig is a part of the Vote included in a Commit. */
export interface CommitSig {
  blockIdFlag: BlockIDFlag;
  validatorAddress: Uint8Array;
  timestamp: Date | undefined;
  signature: Uint8Array;
}

export interface ExtendedCommit {
  height: number;
  round: number;
  blockId: BlockID | undefined;
  extendedSignatures: ExtendedCommitSig[];
}

/**
 * ExtendedCommitSig retains all the same fields as CommitSig but adds vote
 * extension-related fields. We use two signatures to ensure backwards compatibility.
 * That is the digest of the original signature is still the same in prior versions
 */
export interface ExtendedCommitSig {
  blockIdFlag: BlockIDFlag;
  validatorAddress: Uint8Array;
  timestamp: Date | undefined;
  signature: Uint8Array;
  /** Vote extension data */
  extension: Uint8Array;
  /** Vote extension signature */
  extensionSignature: Uint8Array;
}

export interface Proposal {
  type: SignedMsgType;
  height: number;
  round: number;
  polRound: number;
  blockId: BlockID | undefined;
  timestamp: Date | undefined;
  signature: Uint8Array;
}

export interface SignedHeader {
  header: Header | undefined;
  commit: Commit | undefined;
}

export interface LightBlock {
  signedHeader: SignedHeader | undefined;
  validatorSet: ValidatorSet | undefined;
}

export interface BlockMeta {
  blockId: BlockID | undefined;
  blockSize: number;
  header: Header | undefined;
  numTxs: number;
}

/** TxProof represents a Merkle proof of the presence of a transaction in the Merkle tree. */
export interface TxProof {
  rootHash: Uint8Array;
  data: Uint8Array;
  proof: Proof | undefined;
}

function createBasePartSetHeader(): PartSetHeader {
  return { total: 0, hash: new Uint8Array(0) };
}

export const PartSetHeader = {
  encode(message: PartSetHeader, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.total !== 0) {
      writer.uint32(8).uint32(message.total);
    }
    if (message.hash.length !== 0) {
      writer.uint32(18).bytes(message.hash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartSetHeader {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePartSetHeader();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.total = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.hash = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PartSetHeader {
    return {
      total: isSet(object.total) ? Number(object.total) : 0,
      hash: isSet(object.hash) ? bytesFromBase64(object.hash) : new Uint8Array(0),
    };
  },

  toJSON(message: PartSetHeader): unknown {
    const obj: any = {};
    if (message.total !== 0) {
      obj.total = Math.round(message.total);
    }
    if (message.hash.length !== 0) {
      obj.hash = base64FromBytes(message.hash);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PartSetHeader>, I>>(base?: I): PartSetHeader {
    return PartSetHeader.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PartSetHeader>, I>>(object: I): PartSetHeader {
    const message = createBasePartSetHeader();
    message.total = object.total ?? 0;
    message.hash = object.hash ?? new Uint8Array(0);
    return message;
  },
};

function createBasePart(): Part {
  return { index: 0, bytes: new Uint8Array(0), proof: undefined };
}

export const Part = {
  encode(message: Part, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.index !== 0) {
      writer.uint32(8).uint32(message.index);
    }
    if (message.bytes.length !== 0) {
      writer.uint32(18).bytes(message.bytes);
    }
    if (message.proof !== undefined) {
      Proof.encode(message.proof, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Part {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePart();
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

          message.bytes = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.proof = Proof.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Part {
    return {
      index: isSet(object.index) ? Number(object.index) : 0,
      bytes: isSet(object.bytes) ? bytesFromBase64(object.bytes) : new Uint8Array(0),
      proof: isSet(object.proof) ? Proof.fromJSON(object.proof) : undefined,
    };
  },

  toJSON(message: Part): unknown {
    const obj: any = {};
    if (message.index !== 0) {
      obj.index = Math.round(message.index);
    }
    if (message.bytes.length !== 0) {
      obj.bytes = base64FromBytes(message.bytes);
    }
    if (message.proof !== undefined) {
      obj.proof = Proof.toJSON(message.proof);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Part>, I>>(base?: I): Part {
    return Part.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Part>, I>>(object: I): Part {
    const message = createBasePart();
    message.index = object.index ?? 0;
    message.bytes = object.bytes ?? new Uint8Array(0);
    message.proof = (object.proof !== undefined && object.proof !== null) ? Proof.fromPartial(object.proof) : undefined;
    return message;
  },
};

function createBaseBlockID(): BlockID {
  return { hash: new Uint8Array(0), partSetHeader: undefined };
}

export const BlockID = {
  encode(message: BlockID, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hash.length !== 0) {
      writer.uint32(10).bytes(message.hash);
    }
    if (message.partSetHeader !== undefined) {
      PartSetHeader.encode(message.partSetHeader, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockID {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockID();
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

          message.partSetHeader = PartSetHeader.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BlockID {
    return {
      hash: isSet(object.hash) ? bytesFromBase64(object.hash) : new Uint8Array(0),
      partSetHeader: isSet(object.partSetHeader) ? PartSetHeader.fromJSON(object.partSetHeader) : undefined,
    };
  },

  toJSON(message: BlockID): unknown {
    const obj: any = {};
    if (message.hash.length !== 0) {
      obj.hash = base64FromBytes(message.hash);
    }
    if (message.partSetHeader !== undefined) {
      obj.partSetHeader = PartSetHeader.toJSON(message.partSetHeader);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BlockID>, I>>(base?: I): BlockID {
    return BlockID.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BlockID>, I>>(object: I): BlockID {
    const message = createBaseBlockID();
    message.hash = object.hash ?? new Uint8Array(0);
    message.partSetHeader = (object.partSetHeader !== undefined && object.partSetHeader !== null)
      ? PartSetHeader.fromPartial(object.partSetHeader)
      : undefined;
    return message;
  },
};

function createBaseHeader(): Header {
  return {
    version: undefined,
    chainId: "",
    height: 0,
    time: undefined,
    lastBlockId: undefined,
    lastCommitHash: new Uint8Array(0),
    dataHash: new Uint8Array(0),
    validatorsHash: new Uint8Array(0),
    nextValidatorsHash: new Uint8Array(0),
    consensusHash: new Uint8Array(0),
    appHash: new Uint8Array(0),
    lastResultsHash: new Uint8Array(0),
    evidenceHash: new Uint8Array(0),
    proposerAddress: new Uint8Array(0),
  };
}

export const Header = {
  encode(message: Header, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.version !== undefined) {
      Consensus.encode(message.version, writer.uint32(10).fork()).ldelim();
    }
    if (message.chainId !== "") {
      writer.uint32(18).string(message.chainId);
    }
    if (message.height !== 0) {
      writer.uint32(24).int64(message.height);
    }
    if (message.time !== undefined) {
      Timestamp.encode(toTimestamp(message.time), writer.uint32(34).fork()).ldelim();
    }
    if (message.lastBlockId !== undefined) {
      BlockID.encode(message.lastBlockId, writer.uint32(42).fork()).ldelim();
    }
    if (message.lastCommitHash.length !== 0) {
      writer.uint32(50).bytes(message.lastCommitHash);
    }
    if (message.dataHash.length !== 0) {
      writer.uint32(58).bytes(message.dataHash);
    }
    if (message.validatorsHash.length !== 0) {
      writer.uint32(66).bytes(message.validatorsHash);
    }
    if (message.nextValidatorsHash.length !== 0) {
      writer.uint32(74).bytes(message.nextValidatorsHash);
    }
    if (message.consensusHash.length !== 0) {
      writer.uint32(82).bytes(message.consensusHash);
    }
    if (message.appHash.length !== 0) {
      writer.uint32(90).bytes(message.appHash);
    }
    if (message.lastResultsHash.length !== 0) {
      writer.uint32(98).bytes(message.lastResultsHash);
    }
    if (message.evidenceHash.length !== 0) {
      writer.uint32(106).bytes(message.evidenceHash);
    }
    if (message.proposerAddress.length !== 0) {
      writer.uint32(114).bytes(message.proposerAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Header {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHeader();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.version = Consensus.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.chainId = reader.string();
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
          if (tag !== 42) {
            break;
          }

          message.lastBlockId = BlockID.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.lastCommitHash = reader.bytes();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.dataHash = reader.bytes();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.validatorsHash = reader.bytes();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.nextValidatorsHash = reader.bytes();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.consensusHash = reader.bytes();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.appHash = reader.bytes();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.lastResultsHash = reader.bytes();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.evidenceHash = reader.bytes();
          continue;
        case 14:
          if (tag !== 114) {
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

  fromJSON(object: any): Header {
    return {
      version: isSet(object.version) ? Consensus.fromJSON(object.version) : undefined,
      chainId: isSet(object.chainId) ? String(object.chainId) : "",
      height: isSet(object.height) ? Number(object.height) : 0,
      time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
      lastBlockId: isSet(object.lastBlockId) ? BlockID.fromJSON(object.lastBlockId) : undefined,
      lastCommitHash: isSet(object.lastCommitHash) ? bytesFromBase64(object.lastCommitHash) : new Uint8Array(0),
      dataHash: isSet(object.dataHash) ? bytesFromBase64(object.dataHash) : new Uint8Array(0),
      validatorsHash: isSet(object.validatorsHash) ? bytesFromBase64(object.validatorsHash) : new Uint8Array(0),
      nextValidatorsHash: isSet(object.nextValidatorsHash)
        ? bytesFromBase64(object.nextValidatorsHash)
        : new Uint8Array(0),
      consensusHash: isSet(object.consensusHash) ? bytesFromBase64(object.consensusHash) : new Uint8Array(0),
      appHash: isSet(object.appHash) ? bytesFromBase64(object.appHash) : new Uint8Array(0),
      lastResultsHash: isSet(object.lastResultsHash) ? bytesFromBase64(object.lastResultsHash) : new Uint8Array(0),
      evidenceHash: isSet(object.evidenceHash) ? bytesFromBase64(object.evidenceHash) : new Uint8Array(0),
      proposerAddress: isSet(object.proposerAddress) ? bytesFromBase64(object.proposerAddress) : new Uint8Array(0),
    };
  },

  toJSON(message: Header): unknown {
    const obj: any = {};
    if (message.version !== undefined) {
      obj.version = Consensus.toJSON(message.version);
    }
    if (message.chainId !== "") {
      obj.chainId = message.chainId;
    }
    if (message.height !== 0) {
      obj.height = Math.round(message.height);
    }
    if (message.time !== undefined) {
      obj.time = message.time.toISOString();
    }
    if (message.lastBlockId !== undefined) {
      obj.lastBlockId = BlockID.toJSON(message.lastBlockId);
    }
    if (message.lastCommitHash.length !== 0) {
      obj.lastCommitHash = base64FromBytes(message.lastCommitHash);
    }
    if (message.dataHash.length !== 0) {
      obj.dataHash = base64FromBytes(message.dataHash);
    }
    if (message.validatorsHash.length !== 0) {
      obj.validatorsHash = base64FromBytes(message.validatorsHash);
    }
    if (message.nextValidatorsHash.length !== 0) {
      obj.nextValidatorsHash = base64FromBytes(message.nextValidatorsHash);
    }
    if (message.consensusHash.length !== 0) {
      obj.consensusHash = base64FromBytes(message.consensusHash);
    }
    if (message.appHash.length !== 0) {
      obj.appHash = base64FromBytes(message.appHash);
    }
    if (message.lastResultsHash.length !== 0) {
      obj.lastResultsHash = base64FromBytes(message.lastResultsHash);
    }
    if (message.evidenceHash.length !== 0) {
      obj.evidenceHash = base64FromBytes(message.evidenceHash);
    }
    if (message.proposerAddress.length !== 0) {
      obj.proposerAddress = base64FromBytes(message.proposerAddress);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Header>, I>>(base?: I): Header {
    return Header.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Header>, I>>(object: I): Header {
    const message = createBaseHeader();
    message.version = (object.version !== undefined && object.version !== null)
      ? Consensus.fromPartial(object.version)
      : undefined;
    message.chainId = object.chainId ?? "";
    message.height = object.height ?? 0;
    message.time = object.time ?? undefined;
    message.lastBlockId = (object.lastBlockId !== undefined && object.lastBlockId !== null)
      ? BlockID.fromPartial(object.lastBlockId)
      : undefined;
    message.lastCommitHash = object.lastCommitHash ?? new Uint8Array(0);
    message.dataHash = object.dataHash ?? new Uint8Array(0);
    message.validatorsHash = object.validatorsHash ?? new Uint8Array(0);
    message.nextValidatorsHash = object.nextValidatorsHash ?? new Uint8Array(0);
    message.consensusHash = object.consensusHash ?? new Uint8Array(0);
    message.appHash = object.appHash ?? new Uint8Array(0);
    message.lastResultsHash = object.lastResultsHash ?? new Uint8Array(0);
    message.evidenceHash = object.evidenceHash ?? new Uint8Array(0);
    message.proposerAddress = object.proposerAddress ?? new Uint8Array(0);
    return message;
  },
};

function createBaseData(): Data {
  return { txs: [] };
}

export const Data = {
  encode(message: Data, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.txs) {
      writer.uint32(10).bytes(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Data {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseData();
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

  fromJSON(object: any): Data {
    return { txs: Array.isArray(object?.txs) ? object.txs.map((e: any) => bytesFromBase64(e)) : [] };
  },

  toJSON(message: Data): unknown {
    const obj: any = {};
    if (message.txs?.length) {
      obj.txs = message.txs.map((e) => base64FromBytes(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Data>, I>>(base?: I): Data {
    return Data.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Data>, I>>(object: I): Data {
    const message = createBaseData();
    message.txs = object.txs?.map((e) => e) || [];
    return message;
  },
};

function createBaseVote(): Vote {
  return {
    type: 0,
    height: 0,
    round: 0,
    blockId: undefined,
    timestamp: undefined,
    validatorAddress: new Uint8Array(0),
    validatorIndex: 0,
    signature: new Uint8Array(0),
    extension: new Uint8Array(0),
    extensionSignature: new Uint8Array(0),
  };
}

export const Vote = {
  encode(message: Vote, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.height !== 0) {
      writer.uint32(16).int64(message.height);
    }
    if (message.round !== 0) {
      writer.uint32(24).int32(message.round);
    }
    if (message.blockId !== undefined) {
      BlockID.encode(message.blockId, writer.uint32(34).fork()).ldelim();
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(42).fork()).ldelim();
    }
    if (message.validatorAddress.length !== 0) {
      writer.uint32(50).bytes(message.validatorAddress);
    }
    if (message.validatorIndex !== 0) {
      writer.uint32(56).int32(message.validatorIndex);
    }
    if (message.signature.length !== 0) {
      writer.uint32(66).bytes(message.signature);
    }
    if (message.extension.length !== 0) {
      writer.uint32(74).bytes(message.extension);
    }
    if (message.extensionSignature.length !== 0) {
      writer.uint32(82).bytes(message.extensionSignature);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Vote {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVote();
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
          if (tag !== 16) {
            break;
          }

          message.height = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.round = reader.int32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.blockId = BlockID.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.validatorAddress = reader.bytes();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.validatorIndex = reader.int32();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.signature = reader.bytes();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.extension = reader.bytes();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.extensionSignature = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Vote {
    return {
      type: isSet(object.type) ? signedMsgTypeFromJSON(object.type) : 0,
      height: isSet(object.height) ? Number(object.height) : 0,
      round: isSet(object.round) ? Number(object.round) : 0,
      blockId: isSet(object.blockId) ? BlockID.fromJSON(object.blockId) : undefined,
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
      validatorAddress: isSet(object.validatorAddress) ? bytesFromBase64(object.validatorAddress) : new Uint8Array(0),
      validatorIndex: isSet(object.validatorIndex) ? Number(object.validatorIndex) : 0,
      signature: isSet(object.signature) ? bytesFromBase64(object.signature) : new Uint8Array(0),
      extension: isSet(object.extension) ? bytesFromBase64(object.extension) : new Uint8Array(0),
      extensionSignature: isSet(object.extensionSignature)
        ? bytesFromBase64(object.extensionSignature)
        : new Uint8Array(0),
    };
  },

  toJSON(message: Vote): unknown {
    const obj: any = {};
    if (message.type !== 0) {
      obj.type = signedMsgTypeToJSON(message.type);
    }
    if (message.height !== 0) {
      obj.height = Math.round(message.height);
    }
    if (message.round !== 0) {
      obj.round = Math.round(message.round);
    }
    if (message.blockId !== undefined) {
      obj.blockId = BlockID.toJSON(message.blockId);
    }
    if (message.timestamp !== undefined) {
      obj.timestamp = message.timestamp.toISOString();
    }
    if (message.validatorAddress.length !== 0) {
      obj.validatorAddress = base64FromBytes(message.validatorAddress);
    }
    if (message.validatorIndex !== 0) {
      obj.validatorIndex = Math.round(message.validatorIndex);
    }
    if (message.signature.length !== 0) {
      obj.signature = base64FromBytes(message.signature);
    }
    if (message.extension.length !== 0) {
      obj.extension = base64FromBytes(message.extension);
    }
    if (message.extensionSignature.length !== 0) {
      obj.extensionSignature = base64FromBytes(message.extensionSignature);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Vote>, I>>(base?: I): Vote {
    return Vote.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Vote>, I>>(object: I): Vote {
    const message = createBaseVote();
    message.type = object.type ?? 0;
    message.height = object.height ?? 0;
    message.round = object.round ?? 0;
    message.blockId = (object.blockId !== undefined && object.blockId !== null)
      ? BlockID.fromPartial(object.blockId)
      : undefined;
    message.timestamp = object.timestamp ?? undefined;
    message.validatorAddress = object.validatorAddress ?? new Uint8Array(0);
    message.validatorIndex = object.validatorIndex ?? 0;
    message.signature = object.signature ?? new Uint8Array(0);
    message.extension = object.extension ?? new Uint8Array(0);
    message.extensionSignature = object.extensionSignature ?? new Uint8Array(0);
    return message;
  },
};

function createBaseCommit(): Commit {
  return { height: 0, round: 0, blockId: undefined, signatures: [] };
}

export const Commit = {
  encode(message: Commit, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== 0) {
      writer.uint32(8).int64(message.height);
    }
    if (message.round !== 0) {
      writer.uint32(16).int32(message.round);
    }
    if (message.blockId !== undefined) {
      BlockID.encode(message.blockId, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.signatures) {
      CommitSig.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Commit {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommit();
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

          message.round = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.blockId = BlockID.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.signatures.push(CommitSig.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Commit {
    return {
      height: isSet(object.height) ? Number(object.height) : 0,
      round: isSet(object.round) ? Number(object.round) : 0,
      blockId: isSet(object.blockId) ? BlockID.fromJSON(object.blockId) : undefined,
      signatures: Array.isArray(object?.signatures) ? object.signatures.map((e: any) => CommitSig.fromJSON(e)) : [],
    };
  },

  toJSON(message: Commit): unknown {
    const obj: any = {};
    if (message.height !== 0) {
      obj.height = Math.round(message.height);
    }
    if (message.round !== 0) {
      obj.round = Math.round(message.round);
    }
    if (message.blockId !== undefined) {
      obj.blockId = BlockID.toJSON(message.blockId);
    }
    if (message.signatures?.length) {
      obj.signatures = message.signatures.map((e) => CommitSig.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Commit>, I>>(base?: I): Commit {
    return Commit.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Commit>, I>>(object: I): Commit {
    const message = createBaseCommit();
    message.height = object.height ?? 0;
    message.round = object.round ?? 0;
    message.blockId = (object.blockId !== undefined && object.blockId !== null)
      ? BlockID.fromPartial(object.blockId)
      : undefined;
    message.signatures = object.signatures?.map((e) => CommitSig.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCommitSig(): CommitSig {
  return { blockIdFlag: 0, validatorAddress: new Uint8Array(0), timestamp: undefined, signature: new Uint8Array(0) };
}

export const CommitSig = {
  encode(message: CommitSig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.blockIdFlag !== 0) {
      writer.uint32(8).int32(message.blockIdFlag);
    }
    if (message.validatorAddress.length !== 0) {
      writer.uint32(18).bytes(message.validatorAddress);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(26).fork()).ldelim();
    }
    if (message.signature.length !== 0) {
      writer.uint32(34).bytes(message.signature);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommitSig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommitSig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.blockIdFlag = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.validatorAddress = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.signature = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommitSig {
    return {
      blockIdFlag: isSet(object.blockIdFlag) ? blockIDFlagFromJSON(object.blockIdFlag) : 0,
      validatorAddress: isSet(object.validatorAddress) ? bytesFromBase64(object.validatorAddress) : new Uint8Array(0),
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
      signature: isSet(object.signature) ? bytesFromBase64(object.signature) : new Uint8Array(0),
    };
  },

  toJSON(message: CommitSig): unknown {
    const obj: any = {};
    if (message.blockIdFlag !== 0) {
      obj.blockIdFlag = blockIDFlagToJSON(message.blockIdFlag);
    }
    if (message.validatorAddress.length !== 0) {
      obj.validatorAddress = base64FromBytes(message.validatorAddress);
    }
    if (message.timestamp !== undefined) {
      obj.timestamp = message.timestamp.toISOString();
    }
    if (message.signature.length !== 0) {
      obj.signature = base64FromBytes(message.signature);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommitSig>, I>>(base?: I): CommitSig {
    return CommitSig.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommitSig>, I>>(object: I): CommitSig {
    const message = createBaseCommitSig();
    message.blockIdFlag = object.blockIdFlag ?? 0;
    message.validatorAddress = object.validatorAddress ?? new Uint8Array(0);
    message.timestamp = object.timestamp ?? undefined;
    message.signature = object.signature ?? new Uint8Array(0);
    return message;
  },
};

function createBaseExtendedCommit(): ExtendedCommit {
  return { height: 0, round: 0, blockId: undefined, extendedSignatures: [] };
}

export const ExtendedCommit = {
  encode(message: ExtendedCommit, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== 0) {
      writer.uint32(8).int64(message.height);
    }
    if (message.round !== 0) {
      writer.uint32(16).int32(message.round);
    }
    if (message.blockId !== undefined) {
      BlockID.encode(message.blockId, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.extendedSignatures) {
      ExtendedCommitSig.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExtendedCommit {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExtendedCommit();
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

          message.round = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.blockId = BlockID.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.extendedSignatures.push(ExtendedCommitSig.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExtendedCommit {
    return {
      height: isSet(object.height) ? Number(object.height) : 0,
      round: isSet(object.round) ? Number(object.round) : 0,
      blockId: isSet(object.blockId) ? BlockID.fromJSON(object.blockId) : undefined,
      extendedSignatures: Array.isArray(object?.extendedSignatures)
        ? object.extendedSignatures.map((e: any) => ExtendedCommitSig.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ExtendedCommit): unknown {
    const obj: any = {};
    if (message.height !== 0) {
      obj.height = Math.round(message.height);
    }
    if (message.round !== 0) {
      obj.round = Math.round(message.round);
    }
    if (message.blockId !== undefined) {
      obj.blockId = BlockID.toJSON(message.blockId);
    }
    if (message.extendedSignatures?.length) {
      obj.extendedSignatures = message.extendedSignatures.map((e) => ExtendedCommitSig.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExtendedCommit>, I>>(base?: I): ExtendedCommit {
    return ExtendedCommit.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExtendedCommit>, I>>(object: I): ExtendedCommit {
    const message = createBaseExtendedCommit();
    message.height = object.height ?? 0;
    message.round = object.round ?? 0;
    message.blockId = (object.blockId !== undefined && object.blockId !== null)
      ? BlockID.fromPartial(object.blockId)
      : undefined;
    message.extendedSignatures = object.extendedSignatures?.map((e) => ExtendedCommitSig.fromPartial(e)) || [];
    return message;
  },
};

function createBaseExtendedCommitSig(): ExtendedCommitSig {
  return {
    blockIdFlag: 0,
    validatorAddress: new Uint8Array(0),
    timestamp: undefined,
    signature: new Uint8Array(0),
    extension: new Uint8Array(0),
    extensionSignature: new Uint8Array(0),
  };
}

export const ExtendedCommitSig = {
  encode(message: ExtendedCommitSig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.blockIdFlag !== 0) {
      writer.uint32(8).int32(message.blockIdFlag);
    }
    if (message.validatorAddress.length !== 0) {
      writer.uint32(18).bytes(message.validatorAddress);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(26).fork()).ldelim();
    }
    if (message.signature.length !== 0) {
      writer.uint32(34).bytes(message.signature);
    }
    if (message.extension.length !== 0) {
      writer.uint32(42).bytes(message.extension);
    }
    if (message.extensionSignature.length !== 0) {
      writer.uint32(50).bytes(message.extensionSignature);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExtendedCommitSig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExtendedCommitSig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.blockIdFlag = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.validatorAddress = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.signature = reader.bytes();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.extension = reader.bytes();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.extensionSignature = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExtendedCommitSig {
    return {
      blockIdFlag: isSet(object.blockIdFlag) ? blockIDFlagFromJSON(object.blockIdFlag) : 0,
      validatorAddress: isSet(object.validatorAddress) ? bytesFromBase64(object.validatorAddress) : new Uint8Array(0),
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
      signature: isSet(object.signature) ? bytesFromBase64(object.signature) : new Uint8Array(0),
      extension: isSet(object.extension) ? bytesFromBase64(object.extension) : new Uint8Array(0),
      extensionSignature: isSet(object.extensionSignature)
        ? bytesFromBase64(object.extensionSignature)
        : new Uint8Array(0),
    };
  },

  toJSON(message: ExtendedCommitSig): unknown {
    const obj: any = {};
    if (message.blockIdFlag !== 0) {
      obj.blockIdFlag = blockIDFlagToJSON(message.blockIdFlag);
    }
    if (message.validatorAddress.length !== 0) {
      obj.validatorAddress = base64FromBytes(message.validatorAddress);
    }
    if (message.timestamp !== undefined) {
      obj.timestamp = message.timestamp.toISOString();
    }
    if (message.signature.length !== 0) {
      obj.signature = base64FromBytes(message.signature);
    }
    if (message.extension.length !== 0) {
      obj.extension = base64FromBytes(message.extension);
    }
    if (message.extensionSignature.length !== 0) {
      obj.extensionSignature = base64FromBytes(message.extensionSignature);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExtendedCommitSig>, I>>(base?: I): ExtendedCommitSig {
    return ExtendedCommitSig.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExtendedCommitSig>, I>>(object: I): ExtendedCommitSig {
    const message = createBaseExtendedCommitSig();
    message.blockIdFlag = object.blockIdFlag ?? 0;
    message.validatorAddress = object.validatorAddress ?? new Uint8Array(0);
    message.timestamp = object.timestamp ?? undefined;
    message.signature = object.signature ?? new Uint8Array(0);
    message.extension = object.extension ?? new Uint8Array(0);
    message.extensionSignature = object.extensionSignature ?? new Uint8Array(0);
    return message;
  },
};

function createBaseProposal(): Proposal {
  return {
    type: 0,
    height: 0,
    round: 0,
    polRound: 0,
    blockId: undefined,
    timestamp: undefined,
    signature: new Uint8Array(0),
  };
}

export const Proposal = {
  encode(message: Proposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.height !== 0) {
      writer.uint32(16).int64(message.height);
    }
    if (message.round !== 0) {
      writer.uint32(24).int32(message.round);
    }
    if (message.polRound !== 0) {
      writer.uint32(32).int32(message.polRound);
    }
    if (message.blockId !== undefined) {
      BlockID.encode(message.blockId, writer.uint32(42).fork()).ldelim();
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(50).fork()).ldelim();
    }
    if (message.signature.length !== 0) {
      writer.uint32(58).bytes(message.signature);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Proposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProposal();
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
          if (tag !== 16) {
            break;
          }

          message.height = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.round = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.polRound = reader.int32();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.blockId = BlockID.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.signature = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Proposal {
    return {
      type: isSet(object.type) ? signedMsgTypeFromJSON(object.type) : 0,
      height: isSet(object.height) ? Number(object.height) : 0,
      round: isSet(object.round) ? Number(object.round) : 0,
      polRound: isSet(object.polRound) ? Number(object.polRound) : 0,
      blockId: isSet(object.blockId) ? BlockID.fromJSON(object.blockId) : undefined,
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
      signature: isSet(object.signature) ? bytesFromBase64(object.signature) : new Uint8Array(0),
    };
  },

  toJSON(message: Proposal): unknown {
    const obj: any = {};
    if (message.type !== 0) {
      obj.type = signedMsgTypeToJSON(message.type);
    }
    if (message.height !== 0) {
      obj.height = Math.round(message.height);
    }
    if (message.round !== 0) {
      obj.round = Math.round(message.round);
    }
    if (message.polRound !== 0) {
      obj.polRound = Math.round(message.polRound);
    }
    if (message.blockId !== undefined) {
      obj.blockId = BlockID.toJSON(message.blockId);
    }
    if (message.timestamp !== undefined) {
      obj.timestamp = message.timestamp.toISOString();
    }
    if (message.signature.length !== 0) {
      obj.signature = base64FromBytes(message.signature);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Proposal>, I>>(base?: I): Proposal {
    return Proposal.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Proposal>, I>>(object: I): Proposal {
    const message = createBaseProposal();
    message.type = object.type ?? 0;
    message.height = object.height ?? 0;
    message.round = object.round ?? 0;
    message.polRound = object.polRound ?? 0;
    message.blockId = (object.blockId !== undefined && object.blockId !== null)
      ? BlockID.fromPartial(object.blockId)
      : undefined;
    message.timestamp = object.timestamp ?? undefined;
    message.signature = object.signature ?? new Uint8Array(0);
    return message;
  },
};

function createBaseSignedHeader(): SignedHeader {
  return { header: undefined, commit: undefined };
}

export const SignedHeader = {
  encode(message: SignedHeader, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.header !== undefined) {
      Header.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.commit !== undefined) {
      Commit.encode(message.commit, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignedHeader {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignedHeader();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.header = Header.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.commit = Commit.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SignedHeader {
    return {
      header: isSet(object.header) ? Header.fromJSON(object.header) : undefined,
      commit: isSet(object.commit) ? Commit.fromJSON(object.commit) : undefined,
    };
  },

  toJSON(message: SignedHeader): unknown {
    const obj: any = {};
    if (message.header !== undefined) {
      obj.header = Header.toJSON(message.header);
    }
    if (message.commit !== undefined) {
      obj.commit = Commit.toJSON(message.commit);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SignedHeader>, I>>(base?: I): SignedHeader {
    return SignedHeader.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SignedHeader>, I>>(object: I): SignedHeader {
    const message = createBaseSignedHeader();
    message.header = (object.header !== undefined && object.header !== null)
      ? Header.fromPartial(object.header)
      : undefined;
    message.commit = (object.commit !== undefined && object.commit !== null)
      ? Commit.fromPartial(object.commit)
      : undefined;
    return message;
  },
};

function createBaseLightBlock(): LightBlock {
  return { signedHeader: undefined, validatorSet: undefined };
}

export const LightBlock = {
  encode(message: LightBlock, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signedHeader !== undefined) {
      SignedHeader.encode(message.signedHeader, writer.uint32(10).fork()).ldelim();
    }
    if (message.validatorSet !== undefined) {
      ValidatorSet.encode(message.validatorSet, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LightBlock {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLightBlock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signedHeader = SignedHeader.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.validatorSet = ValidatorSet.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LightBlock {
    return {
      signedHeader: isSet(object.signedHeader) ? SignedHeader.fromJSON(object.signedHeader) : undefined,
      validatorSet: isSet(object.validatorSet) ? ValidatorSet.fromJSON(object.validatorSet) : undefined,
    };
  },

  toJSON(message: LightBlock): unknown {
    const obj: any = {};
    if (message.signedHeader !== undefined) {
      obj.signedHeader = SignedHeader.toJSON(message.signedHeader);
    }
    if (message.validatorSet !== undefined) {
      obj.validatorSet = ValidatorSet.toJSON(message.validatorSet);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LightBlock>, I>>(base?: I): LightBlock {
    return LightBlock.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LightBlock>, I>>(object: I): LightBlock {
    const message = createBaseLightBlock();
    message.signedHeader = (object.signedHeader !== undefined && object.signedHeader !== null)
      ? SignedHeader.fromPartial(object.signedHeader)
      : undefined;
    message.validatorSet = (object.validatorSet !== undefined && object.validatorSet !== null)
      ? ValidatorSet.fromPartial(object.validatorSet)
      : undefined;
    return message;
  },
};

function createBaseBlockMeta(): BlockMeta {
  return { blockId: undefined, blockSize: 0, header: undefined, numTxs: 0 };
}

export const BlockMeta = {
  encode(message: BlockMeta, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.blockId !== undefined) {
      BlockID.encode(message.blockId, writer.uint32(10).fork()).ldelim();
    }
    if (message.blockSize !== 0) {
      writer.uint32(16).int64(message.blockSize);
    }
    if (message.header !== undefined) {
      Header.encode(message.header, writer.uint32(26).fork()).ldelim();
    }
    if (message.numTxs !== 0) {
      writer.uint32(32).int64(message.numTxs);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockMeta {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockMeta();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.blockId = BlockID.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.blockSize = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.header = Header.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.numTxs = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BlockMeta {
    return {
      blockId: isSet(object.blockId) ? BlockID.fromJSON(object.blockId) : undefined,
      blockSize: isSet(object.blockSize) ? Number(object.blockSize) : 0,
      header: isSet(object.header) ? Header.fromJSON(object.header) : undefined,
      numTxs: isSet(object.numTxs) ? Number(object.numTxs) : 0,
    };
  },

  toJSON(message: BlockMeta): unknown {
    const obj: any = {};
    if (message.blockId !== undefined) {
      obj.blockId = BlockID.toJSON(message.blockId);
    }
    if (message.blockSize !== 0) {
      obj.blockSize = Math.round(message.blockSize);
    }
    if (message.header !== undefined) {
      obj.header = Header.toJSON(message.header);
    }
    if (message.numTxs !== 0) {
      obj.numTxs = Math.round(message.numTxs);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BlockMeta>, I>>(base?: I): BlockMeta {
    return BlockMeta.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BlockMeta>, I>>(object: I): BlockMeta {
    const message = createBaseBlockMeta();
    message.blockId = (object.blockId !== undefined && object.blockId !== null)
      ? BlockID.fromPartial(object.blockId)
      : undefined;
    message.blockSize = object.blockSize ?? 0;
    message.header = (object.header !== undefined && object.header !== null)
      ? Header.fromPartial(object.header)
      : undefined;
    message.numTxs = object.numTxs ?? 0;
    return message;
  },
};

function createBaseTxProof(): TxProof {
  return { rootHash: new Uint8Array(0), data: new Uint8Array(0), proof: undefined };
}

export const TxProof = {
  encode(message: TxProof, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rootHash.length !== 0) {
      writer.uint32(10).bytes(message.rootHash);
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    if (message.proof !== undefined) {
      Proof.encode(message.proof, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TxProof {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTxProof();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.rootHash = reader.bytes();
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

          message.proof = Proof.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TxProof {
    return {
      rootHash: isSet(object.rootHash) ? bytesFromBase64(object.rootHash) : new Uint8Array(0),
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
      proof: isSet(object.proof) ? Proof.fromJSON(object.proof) : undefined,
    };
  },

  toJSON(message: TxProof): unknown {
    const obj: any = {};
    if (message.rootHash.length !== 0) {
      obj.rootHash = base64FromBytes(message.rootHash);
    }
    if (message.data.length !== 0) {
      obj.data = base64FromBytes(message.data);
    }
    if (message.proof !== undefined) {
      obj.proof = Proof.toJSON(message.proof);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TxProof>, I>>(base?: I): TxProof {
    return TxProof.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TxProof>, I>>(object: I): TxProof {
    const message = createBaseTxProof();
    message.rootHash = object.rootHash ?? new Uint8Array(0);
    message.data = object.data ?? new Uint8Array(0);
    message.proof = (object.proof !== undefined && object.proof !== null) ? Proof.fromPartial(object.proof) : undefined;
    return message;
  },
};

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
