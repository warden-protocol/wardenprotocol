/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../../google/protobuf/any";
import { CompactBitArray } from "../../../crypto/multisig/v1beta1/multisig";

export const protobufPackage = "cosmos.tx.signing.v1beta1";

/**
 * SignMode represents a signing mode with its own security guarantees.
 *
 * This enum should be considered a registry of all known sign modes
 * in the Cosmos ecosystem. Apps are not expected to support all known
 * sign modes. Apps that would like to support custom  sign modes are
 * encouraged to open a small PR against this file to add a new case
 * to this SignMode enum describing their sign mode so that different
 * apps have a consistent version of this enum.
 */
export enum SignMode {
  /**
   * SIGN_MODE_UNSPECIFIED - SIGN_MODE_UNSPECIFIED specifies an unknown signing mode and will be
   * rejected.
   */
  SIGN_MODE_UNSPECIFIED = 0,
  /**
   * SIGN_MODE_DIRECT - SIGN_MODE_DIRECT specifies a signing mode which uses SignDoc and is
   * verified with raw bytes from Tx.
   */
  SIGN_MODE_DIRECT = 1,
  /**
   * SIGN_MODE_TEXTUAL - SIGN_MODE_TEXTUAL is a future signing mode that will verify some
   * human-readable textual representation on top of the binary representation
   * from SIGN_MODE_DIRECT.
   *
   * Since: cosmos-sdk 0.50
   */
  SIGN_MODE_TEXTUAL = 2,
  /**
   * SIGN_MODE_DIRECT_AUX - SIGN_MODE_DIRECT_AUX specifies a signing mode which uses
   * SignDocDirectAux. As opposed to SIGN_MODE_DIRECT, this sign mode does not
   * require signers signing over other signers' `signer_info`.
   *
   * Since: cosmos-sdk 0.46
   */
  SIGN_MODE_DIRECT_AUX = 3,
  /**
   * SIGN_MODE_LEGACY_AMINO_JSON - SIGN_MODE_LEGACY_AMINO_JSON is a backwards compatibility mode which uses
   * Amino JSON and will be removed in the future.
   */
  SIGN_MODE_LEGACY_AMINO_JSON = 127,
  /**
   * SIGN_MODE_EIP_191 - SIGN_MODE_EIP_191 specifies the sign mode for EIP 191 signing on the Cosmos
   * SDK. Ref: https://eips.ethereum.org/EIPS/eip-191
   *
   * Currently, SIGN_MODE_EIP_191 is registered as a SignMode enum variant,
   * but is not implemented on the SDK by default. To enable EIP-191, you need
   * to pass a custom `TxConfig` that has an implementation of
   * `SignModeHandler` for EIP-191. The SDK may decide to fully support
   * EIP-191 in the future.
   *
   * Since: cosmos-sdk 0.45.2
   */
  SIGN_MODE_EIP_191 = 191,
  UNRECOGNIZED = -1,
}

export function signModeFromJSON(object: any): SignMode {
  switch (object) {
    case 0:
    case "SIGN_MODE_UNSPECIFIED":
      return SignMode.SIGN_MODE_UNSPECIFIED;
    case 1:
    case "SIGN_MODE_DIRECT":
      return SignMode.SIGN_MODE_DIRECT;
    case 2:
    case "SIGN_MODE_TEXTUAL":
      return SignMode.SIGN_MODE_TEXTUAL;
    case 3:
    case "SIGN_MODE_DIRECT_AUX":
      return SignMode.SIGN_MODE_DIRECT_AUX;
    case 127:
    case "SIGN_MODE_LEGACY_AMINO_JSON":
      return SignMode.SIGN_MODE_LEGACY_AMINO_JSON;
    case 191:
    case "SIGN_MODE_EIP_191":
      return SignMode.SIGN_MODE_EIP_191;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SignMode.UNRECOGNIZED;
  }
}

export function signModeToJSON(object: SignMode): string {
  switch (object) {
    case SignMode.SIGN_MODE_UNSPECIFIED:
      return "SIGN_MODE_UNSPECIFIED";
    case SignMode.SIGN_MODE_DIRECT:
      return "SIGN_MODE_DIRECT";
    case SignMode.SIGN_MODE_TEXTUAL:
      return "SIGN_MODE_TEXTUAL";
    case SignMode.SIGN_MODE_DIRECT_AUX:
      return "SIGN_MODE_DIRECT_AUX";
    case SignMode.SIGN_MODE_LEGACY_AMINO_JSON:
      return "SIGN_MODE_LEGACY_AMINO_JSON";
    case SignMode.SIGN_MODE_EIP_191:
      return "SIGN_MODE_EIP_191";
    case SignMode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** SignatureDescriptors wraps multiple SignatureDescriptor's. */
export interface SignatureDescriptors {
  /** signatures are the signature descriptors */
  signatures: SignatureDescriptor[];
}

/**
 * SignatureDescriptor is a convenience type which represents the full data for
 * a signature including the public key of the signer, signing modes and the
 * signature itself. It is primarily used for coordinating signatures between
 * clients.
 */
export interface SignatureDescriptor {
  /** public_key is the public key of the signer */
  publicKey: Any | undefined;
  data:
    | SignatureDescriptor_Data
    | undefined;
  /**
   * sequence is the sequence of the account, which describes the
   * number of committed transactions signed by a given address. It is used to prevent
   * replay attacks.
   */
  sequence: number;
}

/** Data represents signature data */
export interface SignatureDescriptor_Data {
  /** single represents a single signer */
  single?:
    | SignatureDescriptor_Data_Single
    | undefined;
  /** multi represents a multisig signer */
  multi?: SignatureDescriptor_Data_Multi | undefined;
}

/** Single is the signature data for a single signer */
export interface SignatureDescriptor_Data_Single {
  /** mode is the signing mode of the single signer */
  mode: SignMode;
  /** signature is the raw signature bytes */
  signature: Uint8Array;
}

/** Multi is the signature data for a multisig public key */
export interface SignatureDescriptor_Data_Multi {
  /** bitarray specifies which keys within the multisig are signing */
  bitarray:
    | CompactBitArray
    | undefined;
  /** signatures is the signatures of the multi-signature */
  signatures: SignatureDescriptor_Data[];
}

function createBaseSignatureDescriptors(): SignatureDescriptors {
  return { signatures: [] };
}

export const SignatureDescriptors = {
  encode(message: SignatureDescriptors, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.signatures) {
      SignatureDescriptor.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignatureDescriptors {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignatureDescriptors();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signatures.push(SignatureDescriptor.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SignatureDescriptors {
    return {
      signatures: Array.isArray(object?.signatures)
        ? object.signatures.map((e: any) => SignatureDescriptor.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SignatureDescriptors): unknown {
    const obj: any = {};
    if (message.signatures?.length) {
      obj.signatures = message.signatures.map((e) => SignatureDescriptor.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SignatureDescriptors>, I>>(base?: I): SignatureDescriptors {
    return SignatureDescriptors.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SignatureDescriptors>, I>>(object: I): SignatureDescriptors {
    const message = createBaseSignatureDescriptors();
    message.signatures = object.signatures?.map((e) => SignatureDescriptor.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSignatureDescriptor(): SignatureDescriptor {
  return { publicKey: undefined, data: undefined, sequence: 0 };
}

export const SignatureDescriptor = {
  encode(message: SignatureDescriptor, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.publicKey !== undefined) {
      Any.encode(message.publicKey, writer.uint32(10).fork()).ldelim();
    }
    if (message.data !== undefined) {
      SignatureDescriptor_Data.encode(message.data, writer.uint32(18).fork()).ldelim();
    }
    if (message.sequence !== 0) {
      writer.uint32(24).uint64(message.sequence);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignatureDescriptor {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignatureDescriptor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.publicKey = Any.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.data = SignatureDescriptor_Data.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.sequence = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SignatureDescriptor {
    return {
      publicKey: isSet(object.publicKey) ? Any.fromJSON(object.publicKey) : undefined,
      data: isSet(object.data) ? SignatureDescriptor_Data.fromJSON(object.data) : undefined,
      sequence: isSet(object.sequence) ? Number(object.sequence) : 0,
    };
  },

  toJSON(message: SignatureDescriptor): unknown {
    const obj: any = {};
    if (message.publicKey !== undefined) {
      obj.publicKey = Any.toJSON(message.publicKey);
    }
    if (message.data !== undefined) {
      obj.data = SignatureDescriptor_Data.toJSON(message.data);
    }
    if (message.sequence !== 0) {
      obj.sequence = Math.round(message.sequence);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SignatureDescriptor>, I>>(base?: I): SignatureDescriptor {
    return SignatureDescriptor.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SignatureDescriptor>, I>>(object: I): SignatureDescriptor {
    const message = createBaseSignatureDescriptor();
    message.publicKey = (object.publicKey !== undefined && object.publicKey !== null)
      ? Any.fromPartial(object.publicKey)
      : undefined;
    message.data = (object.data !== undefined && object.data !== null)
      ? SignatureDescriptor_Data.fromPartial(object.data)
      : undefined;
    message.sequence = object.sequence ?? 0;
    return message;
  },
};

function createBaseSignatureDescriptor_Data(): SignatureDescriptor_Data {
  return { single: undefined, multi: undefined };
}

export const SignatureDescriptor_Data = {
  encode(message: SignatureDescriptor_Data, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.single !== undefined) {
      SignatureDescriptor_Data_Single.encode(message.single, writer.uint32(10).fork()).ldelim();
    }
    if (message.multi !== undefined) {
      SignatureDescriptor_Data_Multi.encode(message.multi, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignatureDescriptor_Data {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignatureDescriptor_Data();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.single = SignatureDescriptor_Data_Single.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.multi = SignatureDescriptor_Data_Multi.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SignatureDescriptor_Data {
    return {
      single: isSet(object.single) ? SignatureDescriptor_Data_Single.fromJSON(object.single) : undefined,
      multi: isSet(object.multi) ? SignatureDescriptor_Data_Multi.fromJSON(object.multi) : undefined,
    };
  },

  toJSON(message: SignatureDescriptor_Data): unknown {
    const obj: any = {};
    if (message.single !== undefined) {
      obj.single = SignatureDescriptor_Data_Single.toJSON(message.single);
    }
    if (message.multi !== undefined) {
      obj.multi = SignatureDescriptor_Data_Multi.toJSON(message.multi);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SignatureDescriptor_Data>, I>>(base?: I): SignatureDescriptor_Data {
    return SignatureDescriptor_Data.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SignatureDescriptor_Data>, I>>(object: I): SignatureDescriptor_Data {
    const message = createBaseSignatureDescriptor_Data();
    message.single = (object.single !== undefined && object.single !== null)
      ? SignatureDescriptor_Data_Single.fromPartial(object.single)
      : undefined;
    message.multi = (object.multi !== undefined && object.multi !== null)
      ? SignatureDescriptor_Data_Multi.fromPartial(object.multi)
      : undefined;
    return message;
  },
};

function createBaseSignatureDescriptor_Data_Single(): SignatureDescriptor_Data_Single {
  return { mode: 0, signature: new Uint8Array(0) };
}

export const SignatureDescriptor_Data_Single = {
  encode(message: SignatureDescriptor_Data_Single, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.mode !== 0) {
      writer.uint32(8).int32(message.mode);
    }
    if (message.signature.length !== 0) {
      writer.uint32(18).bytes(message.signature);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignatureDescriptor_Data_Single {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignatureDescriptor_Data_Single();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.mode = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): SignatureDescriptor_Data_Single {
    return {
      mode: isSet(object.mode) ? signModeFromJSON(object.mode) : 0,
      signature: isSet(object.signature) ? bytesFromBase64(object.signature) : new Uint8Array(0),
    };
  },

  toJSON(message: SignatureDescriptor_Data_Single): unknown {
    const obj: any = {};
    if (message.mode !== 0) {
      obj.mode = signModeToJSON(message.mode);
    }
    if (message.signature.length !== 0) {
      obj.signature = base64FromBytes(message.signature);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SignatureDescriptor_Data_Single>, I>>(base?: I): SignatureDescriptor_Data_Single {
    return SignatureDescriptor_Data_Single.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SignatureDescriptor_Data_Single>, I>>(
    object: I,
  ): SignatureDescriptor_Data_Single {
    const message = createBaseSignatureDescriptor_Data_Single();
    message.mode = object.mode ?? 0;
    message.signature = object.signature ?? new Uint8Array(0);
    return message;
  },
};

function createBaseSignatureDescriptor_Data_Multi(): SignatureDescriptor_Data_Multi {
  return { bitarray: undefined, signatures: [] };
}

export const SignatureDescriptor_Data_Multi = {
  encode(message: SignatureDescriptor_Data_Multi, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.bitarray !== undefined) {
      CompactBitArray.encode(message.bitarray, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.signatures) {
      SignatureDescriptor_Data.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignatureDescriptor_Data_Multi {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignatureDescriptor_Data_Multi();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.bitarray = CompactBitArray.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.signatures.push(SignatureDescriptor_Data.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SignatureDescriptor_Data_Multi {
    return {
      bitarray: isSet(object.bitarray) ? CompactBitArray.fromJSON(object.bitarray) : undefined,
      signatures: Array.isArray(object?.signatures)
        ? object.signatures.map((e: any) => SignatureDescriptor_Data.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SignatureDescriptor_Data_Multi): unknown {
    const obj: any = {};
    if (message.bitarray !== undefined) {
      obj.bitarray = CompactBitArray.toJSON(message.bitarray);
    }
    if (message.signatures?.length) {
      obj.signatures = message.signatures.map((e) => SignatureDescriptor_Data.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SignatureDescriptor_Data_Multi>, I>>(base?: I): SignatureDescriptor_Data_Multi {
    return SignatureDescriptor_Data_Multi.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SignatureDescriptor_Data_Multi>, I>>(
    object: I,
  ): SignatureDescriptor_Data_Multi {
    const message = createBaseSignatureDescriptor_Data_Multi();
    message.bitarray = (object.bitarray !== undefined && object.bitarray !== null)
      ? CompactBitArray.fromPartial(object.bitarray)
      : undefined;
    message.signatures = object.signatures?.map((e) => SignatureDescriptor_Data.fromPartial(e)) || [];
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
