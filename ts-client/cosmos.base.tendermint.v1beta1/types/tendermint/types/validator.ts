/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PublicKey } from "../crypto/keys";

export const protobufPackage = "tendermint.types";

/** BlockIdFlag indicates which BlockID the signature is for */
export enum BlockIDFlag {
  /** BLOCK_ID_FLAG_UNKNOWN - indicates an error condition */
  BLOCK_ID_FLAG_UNKNOWN = 0,
  /** BLOCK_ID_FLAG_ABSENT - the vote was not received */
  BLOCK_ID_FLAG_ABSENT = 1,
  /** BLOCK_ID_FLAG_COMMIT - voted for the block that received the majority */
  BLOCK_ID_FLAG_COMMIT = 2,
  /** BLOCK_ID_FLAG_NIL - voted for nil */
  BLOCK_ID_FLAG_NIL = 3,
  UNRECOGNIZED = -1,
}

export function blockIDFlagFromJSON(object: any): BlockIDFlag {
  switch (object) {
    case 0:
    case "BLOCK_ID_FLAG_UNKNOWN":
      return BlockIDFlag.BLOCK_ID_FLAG_UNKNOWN;
    case 1:
    case "BLOCK_ID_FLAG_ABSENT":
      return BlockIDFlag.BLOCK_ID_FLAG_ABSENT;
    case 2:
    case "BLOCK_ID_FLAG_COMMIT":
      return BlockIDFlag.BLOCK_ID_FLAG_COMMIT;
    case 3:
    case "BLOCK_ID_FLAG_NIL":
      return BlockIDFlag.BLOCK_ID_FLAG_NIL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return BlockIDFlag.UNRECOGNIZED;
  }
}

export function blockIDFlagToJSON(object: BlockIDFlag): string {
  switch (object) {
    case BlockIDFlag.BLOCK_ID_FLAG_UNKNOWN:
      return "BLOCK_ID_FLAG_UNKNOWN";
    case BlockIDFlag.BLOCK_ID_FLAG_ABSENT:
      return "BLOCK_ID_FLAG_ABSENT";
    case BlockIDFlag.BLOCK_ID_FLAG_COMMIT:
      return "BLOCK_ID_FLAG_COMMIT";
    case BlockIDFlag.BLOCK_ID_FLAG_NIL:
      return "BLOCK_ID_FLAG_NIL";
    case BlockIDFlag.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ValidatorSet {
  validators: Validator[];
  proposer: Validator | undefined;
  totalVotingPower: number;
}

export interface Validator {
  address: Uint8Array;
  pubKey: PublicKey | undefined;
  votingPower: number;
  proposerPriority: number;
}

export interface SimpleValidator {
  pubKey: PublicKey | undefined;
  votingPower: number;
}

function createBaseValidatorSet(): ValidatorSet {
  return { validators: [], proposer: undefined, totalVotingPower: 0 };
}

export const ValidatorSet = {
  encode(message: ValidatorSet, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.validators) {
      Validator.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.proposer !== undefined) {
      Validator.encode(message.proposer, writer.uint32(18).fork()).ldelim();
    }
    if (message.totalVotingPower !== 0) {
      writer.uint32(24).int64(message.totalVotingPower);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorSet {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorSet();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.validators.push(Validator.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.proposer = Validator.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
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

  fromJSON(object: any): ValidatorSet {
    return {
      validators: Array.isArray(object?.validators) ? object.validators.map((e: any) => Validator.fromJSON(e)) : [],
      proposer: isSet(object.proposer) ? Validator.fromJSON(object.proposer) : undefined,
      totalVotingPower: isSet(object.totalVotingPower) ? Number(object.totalVotingPower) : 0,
    };
  },

  toJSON(message: ValidatorSet): unknown {
    const obj: any = {};
    if (message.validators?.length) {
      obj.validators = message.validators.map((e) => Validator.toJSON(e));
    }
    if (message.proposer !== undefined) {
      obj.proposer = Validator.toJSON(message.proposer);
    }
    if (message.totalVotingPower !== 0) {
      obj.totalVotingPower = Math.round(message.totalVotingPower);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidatorSet>, I>>(base?: I): ValidatorSet {
    return ValidatorSet.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValidatorSet>, I>>(object: I): ValidatorSet {
    const message = createBaseValidatorSet();
    message.validators = object.validators?.map((e) => Validator.fromPartial(e)) || [];
    message.proposer = (object.proposer !== undefined && object.proposer !== null)
      ? Validator.fromPartial(object.proposer)
      : undefined;
    message.totalVotingPower = object.totalVotingPower ?? 0;
    return message;
  },
};

function createBaseValidator(): Validator {
  return { address: new Uint8Array(0), pubKey: undefined, votingPower: 0, proposerPriority: 0 };
}

export const Validator = {
  encode(message: Validator, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address.length !== 0) {
      writer.uint32(10).bytes(message.address);
    }
    if (message.pubKey !== undefined) {
      PublicKey.encode(message.pubKey, writer.uint32(18).fork()).ldelim();
    }
    if (message.votingPower !== 0) {
      writer.uint32(24).int64(message.votingPower);
    }
    if (message.proposerPriority !== 0) {
      writer.uint32(32).int64(message.proposerPriority);
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
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pubKey = PublicKey.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.votingPower = longToNumber(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.proposerPriority = longToNumber(reader.int64() as Long);
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
      pubKey: isSet(object.pubKey) ? PublicKey.fromJSON(object.pubKey) : undefined,
      votingPower: isSet(object.votingPower) ? Number(object.votingPower) : 0,
      proposerPriority: isSet(object.proposerPriority) ? Number(object.proposerPriority) : 0,
    };
  },

  toJSON(message: Validator): unknown {
    const obj: any = {};
    if (message.address.length !== 0) {
      obj.address = base64FromBytes(message.address);
    }
    if (message.pubKey !== undefined) {
      obj.pubKey = PublicKey.toJSON(message.pubKey);
    }
    if (message.votingPower !== 0) {
      obj.votingPower = Math.round(message.votingPower);
    }
    if (message.proposerPriority !== 0) {
      obj.proposerPriority = Math.round(message.proposerPriority);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Validator>, I>>(base?: I): Validator {
    return Validator.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Validator>, I>>(object: I): Validator {
    const message = createBaseValidator();
    message.address = object.address ?? new Uint8Array(0);
    message.pubKey = (object.pubKey !== undefined && object.pubKey !== null)
      ? PublicKey.fromPartial(object.pubKey)
      : undefined;
    message.votingPower = object.votingPower ?? 0;
    message.proposerPriority = object.proposerPriority ?? 0;
    return message;
  },
};

function createBaseSimpleValidator(): SimpleValidator {
  return { pubKey: undefined, votingPower: 0 };
}

export const SimpleValidator = {
  encode(message: SimpleValidator, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pubKey !== undefined) {
      PublicKey.encode(message.pubKey, writer.uint32(10).fork()).ldelim();
    }
    if (message.votingPower !== 0) {
      writer.uint32(16).int64(message.votingPower);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleValidator {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimpleValidator();
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

          message.votingPower = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SimpleValidator {
    return {
      pubKey: isSet(object.pubKey) ? PublicKey.fromJSON(object.pubKey) : undefined,
      votingPower: isSet(object.votingPower) ? Number(object.votingPower) : 0,
    };
  },

  toJSON(message: SimpleValidator): unknown {
    const obj: any = {};
    if (message.pubKey !== undefined) {
      obj.pubKey = PublicKey.toJSON(message.pubKey);
    }
    if (message.votingPower !== 0) {
      obj.votingPower = Math.round(message.votingPower);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SimpleValidator>, I>>(base?: I): SimpleValidator {
    return SimpleValidator.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SimpleValidator>, I>>(object: I): SimpleValidator {
    const message = createBaseSimpleValidator();
    message.pubKey = (object.pubKey !== undefined && object.pubKey !== null)
      ? PublicKey.fromPartial(object.pubKey)
      : undefined;
    message.votingPower = object.votingPower ?? 0;
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
