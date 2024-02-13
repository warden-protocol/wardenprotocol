/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../../../google/protobuf/timestamp";
import { EvidenceList } from "../../../../tendermint/types/evidence";
import { BlockID, Commit, Data } from "../../../../tendermint/types/types";
import { Consensus } from "../../../../tendermint/version/types";

export const protobufPackage = "cosmos.base.tendermint.v1beta1";

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
  /**
   * proposer_address is the original block proposer address, formatted as a Bech32 string.
   * In Tendermint, this type is `bytes`, but in the SDK, we convert it to a Bech32 string
   * for better UX.
   */
  proposerAddress: string;
}

function createBaseBlock(): Block {
  return { header: undefined, data: undefined, evidence: undefined, lastCommit: undefined };
}

export const Block = {
  encode(message: Block, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.header !== undefined) {
      Header.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.data !== undefined) {
      Data.encode(message.data, writer.uint32(18).fork()).ldelim();
    }
    if (message.evidence !== undefined) {
      EvidenceList.encode(message.evidence, writer.uint32(26).fork()).ldelim();
    }
    if (message.lastCommit !== undefined) {
      Commit.encode(message.lastCommit, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Block {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlock();
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

          message.data = Data.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.evidence = EvidenceList.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.lastCommit = Commit.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Block {
    return {
      header: isSet(object.header) ? Header.fromJSON(object.header) : undefined,
      data: isSet(object.data) ? Data.fromJSON(object.data) : undefined,
      evidence: isSet(object.evidence) ? EvidenceList.fromJSON(object.evidence) : undefined,
      lastCommit: isSet(object.lastCommit) ? Commit.fromJSON(object.lastCommit) : undefined,
    };
  },

  toJSON(message: Block): unknown {
    const obj: any = {};
    if (message.header !== undefined) {
      obj.header = Header.toJSON(message.header);
    }
    if (message.data !== undefined) {
      obj.data = Data.toJSON(message.data);
    }
    if (message.evidence !== undefined) {
      obj.evidence = EvidenceList.toJSON(message.evidence);
    }
    if (message.lastCommit !== undefined) {
      obj.lastCommit = Commit.toJSON(message.lastCommit);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Block>, I>>(base?: I): Block {
    return Block.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Block>, I>>(object: I): Block {
    const message = createBaseBlock();
    message.header = (object.header !== undefined && object.header !== null)
      ? Header.fromPartial(object.header)
      : undefined;
    message.data = (object.data !== undefined && object.data !== null) ? Data.fromPartial(object.data) : undefined;
    message.evidence = (object.evidence !== undefined && object.evidence !== null)
      ? EvidenceList.fromPartial(object.evidence)
      : undefined;
    message.lastCommit = (object.lastCommit !== undefined && object.lastCommit !== null)
      ? Commit.fromPartial(object.lastCommit)
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
    proposerAddress: "",
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
    if (message.proposerAddress !== "") {
      writer.uint32(114).string(message.proposerAddress);
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

          message.proposerAddress = reader.string();
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
      proposerAddress: isSet(object.proposerAddress) ? String(object.proposerAddress) : "",
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
    if (message.proposerAddress !== "") {
      obj.proposerAddress = message.proposerAddress;
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
    message.proposerAddress = object.proposerAddress ?? "";
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
