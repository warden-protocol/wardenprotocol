/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "warden.warden.v1beta2";

/**
 * KeyRequestStatus indicates the status of a key request.
 * A request starts as "pending", waiting to be picked up. Then it can move to
 * either "approved" or "rejected", depending on the decision of the keychain.
 */
export enum KeyRequestStatus {
  /** KEY_REQUEST_STATUS_UNSPECIFIED - The request is missing the status field. */
  KEY_REQUEST_STATUS_UNSPECIFIED = 0,
  /**
   * KEY_REQUEST_STATUS_PENDING - The request is waiting to be fulfilled. This is the initial state of a
   * request.
   */
  KEY_REQUEST_STATUS_PENDING = 1,
  /** KEY_REQUEST_STATUS_FULFILLED - The request was fulfilled. This is a final state for a request. */
  KEY_REQUEST_STATUS_FULFILLED = 2,
  /** KEY_REQUEST_STATUS_REJECTED - The request was rejected. This is a final state for a request. */
  KEY_REQUEST_STATUS_REJECTED = 3,
  UNRECOGNIZED = -1,
}

export function keyRequestStatusFromJSON(object: any): KeyRequestStatus {
  switch (object) {
    case 0:
    case "KEY_REQUEST_STATUS_UNSPECIFIED":
      return KeyRequestStatus.KEY_REQUEST_STATUS_UNSPECIFIED;
    case 1:
    case "KEY_REQUEST_STATUS_PENDING":
      return KeyRequestStatus.KEY_REQUEST_STATUS_PENDING;
    case 2:
    case "KEY_REQUEST_STATUS_FULFILLED":
      return KeyRequestStatus.KEY_REQUEST_STATUS_FULFILLED;
    case 3:
    case "KEY_REQUEST_STATUS_REJECTED":
      return KeyRequestStatus.KEY_REQUEST_STATUS_REJECTED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return KeyRequestStatus.UNRECOGNIZED;
  }
}

export function keyRequestStatusToJSON(object: KeyRequestStatus): string {
  switch (object) {
    case KeyRequestStatus.KEY_REQUEST_STATUS_UNSPECIFIED:
      return "KEY_REQUEST_STATUS_UNSPECIFIED";
    case KeyRequestStatus.KEY_REQUEST_STATUS_PENDING:
      return "KEY_REQUEST_STATUS_PENDING";
    case KeyRequestStatus.KEY_REQUEST_STATUS_FULFILLED:
      return "KEY_REQUEST_STATUS_FULFILLED";
    case KeyRequestStatus.KEY_REQUEST_STATUS_REJECTED:
      return "KEY_REQUEST_STATUS_REJECTED";
    case KeyRequestStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * KeyType indicates what crypto scheme will be used by this key (e.g.
 * ECDSA). Its public key will be one of the specified type.
 */
export enum KeyType {
  /** KEY_TYPE_UNSPECIFIED - The key type is missing. */
  KEY_TYPE_UNSPECIFIED = 0,
  /** KEY_TYPE_ECDSA_SECP256K1 - The key is an ECDSA secp256k1 key. */
  KEY_TYPE_ECDSA_SECP256K1 = 1,
  /** KEY_TYPE_EDDSA_ED25519 - The key is an EdDSA Ed25519 key. */
  KEY_TYPE_EDDSA_ED25519 = 2,
  UNRECOGNIZED = -1,
}

export function keyTypeFromJSON(object: any): KeyType {
  switch (object) {
    case 0:
    case "KEY_TYPE_UNSPECIFIED":
      return KeyType.KEY_TYPE_UNSPECIFIED;
    case 1:
    case "KEY_TYPE_ECDSA_SECP256K1":
      return KeyType.KEY_TYPE_ECDSA_SECP256K1;
    case 2:
    case "KEY_TYPE_EDDSA_ED25519":
      return KeyType.KEY_TYPE_EDDSA_ED25519;
    case -1:
    case "UNRECOGNIZED":
    default:
      return KeyType.UNRECOGNIZED;
  }
}

export function keyTypeToJSON(object: KeyType): string {
  switch (object) {
    case KeyType.KEY_TYPE_UNSPECIFIED:
      return "KEY_TYPE_UNSPECIFIED";
    case KeyType.KEY_TYPE_ECDSA_SECP256K1:
      return "KEY_TYPE_ECDSA_SECP256K1";
    case KeyType.KEY_TYPE_EDDSA_ED25519:
      return "KEY_TYPE_EDDSA_ED25519";
    case KeyType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface KeyRequest {
  id: number;
  creator: string;
  spaceId: number;
  keychainId: number;
  keyType: KeyType;
  status: KeyRequestStatus;
  rejectReason: string;
}

export interface Key {
  id: number;
  spaceId: number;
  keychainId: number;
  type: KeyType;
  publicKey: Uint8Array;
}

function createBaseKeyRequest(): KeyRequest {
  return { id: 0, creator: "", spaceId: 0, keychainId: 0, keyType: 0, status: 0, rejectReason: "" };
}

export const KeyRequest = {
  encode(message: KeyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.spaceId !== 0) {
      writer.uint32(24).uint64(message.spaceId);
    }
    if (message.keychainId !== 0) {
      writer.uint32(32).uint64(message.keychainId);
    }
    if (message.keyType !== 0) {
      writer.uint32(40).int32(message.keyType);
    }
    if (message.status !== 0) {
      writer.uint32(48).int32(message.status);
    }
    if (message.rejectReason !== "") {
      writer.uint32(58).string(message.rejectReason);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KeyRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.spaceId = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.keychainId = longToNumber(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.keyType = reader.int32() as any;
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.rejectReason = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): KeyRequest {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      creator: isSet(object.creator) ? String(object.creator) : "",
      spaceId: isSet(object.spaceId) ? Number(object.spaceId) : 0,
      keychainId: isSet(object.keychainId) ? Number(object.keychainId) : 0,
      keyType: isSet(object.keyType) ? keyTypeFromJSON(object.keyType) : 0,
      status: isSet(object.status) ? keyRequestStatusFromJSON(object.status) : 0,
      rejectReason: isSet(object.rejectReason) ? String(object.rejectReason) : "",
    };
  },

  toJSON(message: KeyRequest): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.spaceId !== 0) {
      obj.spaceId = Math.round(message.spaceId);
    }
    if (message.keychainId !== 0) {
      obj.keychainId = Math.round(message.keychainId);
    }
    if (message.keyType !== 0) {
      obj.keyType = keyTypeToJSON(message.keyType);
    }
    if (message.status !== 0) {
      obj.status = keyRequestStatusToJSON(message.status);
    }
    if (message.rejectReason !== "") {
      obj.rejectReason = message.rejectReason;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<KeyRequest>, I>>(base?: I): KeyRequest {
    return KeyRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<KeyRequest>, I>>(object: I): KeyRequest {
    const message = createBaseKeyRequest();
    message.id = object.id ?? 0;
    message.creator = object.creator ?? "";
    message.spaceId = object.spaceId ?? 0;
    message.keychainId = object.keychainId ?? 0;
    message.keyType = object.keyType ?? 0;
    message.status = object.status ?? 0;
    message.rejectReason = object.rejectReason ?? "";
    return message;
  },
};

function createBaseKey(): Key {
  return { id: 0, spaceId: 0, keychainId: 0, type: 0, publicKey: new Uint8Array(0) };
}

export const Key = {
  encode(message: Key, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.spaceId !== 0) {
      writer.uint32(16).uint64(message.spaceId);
    }
    if (message.keychainId !== 0) {
      writer.uint32(24).uint64(message.keychainId);
    }
    if (message.type !== 0) {
      writer.uint32(32).int32(message.type);
    }
    if (message.publicKey.length !== 0) {
      writer.uint32(42).bytes(message.publicKey);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Key {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.spaceId = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.keychainId = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.publicKey = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Key {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      spaceId: isSet(object.spaceId) ? Number(object.spaceId) : 0,
      keychainId: isSet(object.keychainId) ? Number(object.keychainId) : 0,
      type: isSet(object.type) ? keyTypeFromJSON(object.type) : 0,
      publicKey: isSet(object.publicKey) ? bytesFromBase64(object.publicKey) : new Uint8Array(0),
    };
  },

  toJSON(message: Key): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.spaceId !== 0) {
      obj.spaceId = Math.round(message.spaceId);
    }
    if (message.keychainId !== 0) {
      obj.keychainId = Math.round(message.keychainId);
    }
    if (message.type !== 0) {
      obj.type = keyTypeToJSON(message.type);
    }
    if (message.publicKey.length !== 0) {
      obj.publicKey = base64FromBytes(message.publicKey);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Key>, I>>(base?: I): Key {
    return Key.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Key>, I>>(object: I): Key {
    const message = createBaseKey();
    message.id = object.id ?? 0;
    message.spaceId = object.spaceId ?? 0;
    message.keychainId = object.keychainId ?? 0;
    message.type = object.type ?? 0;
    message.publicKey = object.publicKey ?? new Uint8Array(0);
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
