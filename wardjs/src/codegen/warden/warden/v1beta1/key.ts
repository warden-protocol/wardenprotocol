//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet, bytesFromBase64, base64FromBytes } from "../../../helpers.js";
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
export const KeyRequestStatusSDKType = KeyRequestStatus;
export const KeyRequestStatusAmino = KeyRequestStatus;
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
export const KeyTypeSDKType = KeyType;
export const KeyTypeAmino = KeyType;
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
  id: bigint;
  creator: string;
  spaceAddr: string;
  keychainAddr: string;
  keyType: KeyType;
  status: KeyRequestStatus;
  rejectReason: string;
}
export interface KeyRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta1.KeyRequest";
  value: Uint8Array;
}
export interface KeyRequestAmino {
  id?: string;
  creator?: string;
  space_addr?: string;
  keychain_addr?: string;
  key_type?: KeyType;
  status?: KeyRequestStatus;
  reject_reason?: string;
}
export interface KeyRequestAminoMsg {
  type: "/warden.warden.v1beta1.KeyRequest";
  value: KeyRequestAmino;
}
export interface KeyRequestSDKType {
  id: bigint;
  creator: string;
  space_addr: string;
  keychain_addr: string;
  key_type: KeyType;
  status: KeyRequestStatus;
  reject_reason: string;
}
export interface Key {
  id: bigint;
  spaceAddr: string;
  keychainAddr: string;
  type: KeyType;
  publicKey: Uint8Array;
}
export interface KeyProtoMsg {
  typeUrl: "/warden.warden.v1beta1.Key";
  value: Uint8Array;
}
export interface KeyAmino {
  id?: string;
  space_addr?: string;
  keychain_addr?: string;
  type?: KeyType;
  public_key?: string;
}
export interface KeyAminoMsg {
  type: "/warden.warden.v1beta1.Key";
  value: KeyAmino;
}
export interface KeySDKType {
  id: bigint;
  space_addr: string;
  keychain_addr: string;
  type: KeyType;
  public_key: Uint8Array;
}
function createBaseKeyRequest(): KeyRequest {
  return {
    id: BigInt(0),
    creator: "",
    spaceAddr: "",
    keychainAddr: "",
    keyType: 0,
    status: 0,
    rejectReason: ""
  };
}
export const KeyRequest = {
  typeUrl: "/warden.warden.v1beta1.KeyRequest",
  encode(message: KeyRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.spaceAddr !== "") {
      writer.uint32(26).string(message.spaceAddr);
    }
    if (message.keychainAddr !== "") {
      writer.uint32(34).string(message.keychainAddr);
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
  decode(input: BinaryReader | Uint8Array, length?: number): KeyRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.creator = reader.string();
          break;
        case 3:
          message.spaceAddr = reader.string();
          break;
        case 4:
          message.keychainAddr = reader.string();
          break;
        case 5:
          message.keyType = (reader.int32() as any);
          break;
        case 6:
          message.status = (reader.int32() as any);
          break;
        case 7:
          message.rejectReason = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): KeyRequest {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      creator: isSet(object.creator) ? String(object.creator) : "",
      spaceAddr: isSet(object.spaceAddr) ? String(object.spaceAddr) : "",
      keychainAddr: isSet(object.keychainAddr) ? String(object.keychainAddr) : "",
      keyType: isSet(object.keyType) ? keyTypeFromJSON(object.keyType) : -1,
      status: isSet(object.status) ? keyRequestStatusFromJSON(object.status) : -1,
      rejectReason: isSet(object.rejectReason) ? String(object.rejectReason) : ""
    };
  },
  toJSON(message: KeyRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.creator !== undefined && (obj.creator = message.creator);
    message.spaceAddr !== undefined && (obj.spaceAddr = message.spaceAddr);
    message.keychainAddr !== undefined && (obj.keychainAddr = message.keychainAddr);
    message.keyType !== undefined && (obj.keyType = keyTypeToJSON(message.keyType));
    message.status !== undefined && (obj.status = keyRequestStatusToJSON(message.status));
    message.rejectReason !== undefined && (obj.rejectReason = message.rejectReason);
    return obj;
  },
  fromPartial(object: Partial<KeyRequest>): KeyRequest {
    const message = createBaseKeyRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.creator = object.creator ?? "";
    message.spaceAddr = object.spaceAddr ?? "";
    message.keychainAddr = object.keychainAddr ?? "";
    message.keyType = object.keyType ?? 0;
    message.status = object.status ?? 0;
    message.rejectReason = object.rejectReason ?? "";
    return message;
  },
  fromAmino(object: KeyRequestAmino): KeyRequest {
    const message = createBaseKeyRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.space_addr !== undefined && object.space_addr !== null) {
      message.spaceAddr = object.space_addr;
    }
    if (object.keychain_addr !== undefined && object.keychain_addr !== null) {
      message.keychainAddr = object.keychain_addr;
    }
    if (object.key_type !== undefined && object.key_type !== null) {
      message.keyType = object.key_type;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    if (object.reject_reason !== undefined && object.reject_reason !== null) {
      message.rejectReason = object.reject_reason;
    }
    return message;
  },
  toAmino(message: KeyRequest): KeyRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.space_addr = message.spaceAddr === "" ? undefined : message.spaceAddr;
    obj.keychain_addr = message.keychainAddr === "" ? undefined : message.keychainAddr;
    obj.key_type = message.keyType === 0 ? undefined : message.keyType;
    obj.status = message.status === 0 ? undefined : message.status;
    obj.reject_reason = message.rejectReason === "" ? undefined : message.rejectReason;
    return obj;
  },
  fromAminoMsg(object: KeyRequestAminoMsg): KeyRequest {
    return KeyRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: KeyRequestProtoMsg): KeyRequest {
    return KeyRequest.decode(message.value);
  },
  toProto(message: KeyRequest): Uint8Array {
    return KeyRequest.encode(message).finish();
  },
  toProtoMsg(message: KeyRequest): KeyRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.KeyRequest",
      value: KeyRequest.encode(message).finish()
    };
  }
};
function createBaseKey(): Key {
  return {
    id: BigInt(0),
    spaceAddr: "",
    keychainAddr: "",
    type: 0,
    publicKey: new Uint8Array()
  };
}
export const Key = {
  typeUrl: "/warden.warden.v1beta1.Key",
  encode(message: Key, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.spaceAddr !== "") {
      writer.uint32(18).string(message.spaceAddr);
    }
    if (message.keychainAddr !== "") {
      writer.uint32(26).string(message.keychainAddr);
    }
    if (message.type !== 0) {
      writer.uint32(32).int32(message.type);
    }
    if (message.publicKey.length !== 0) {
      writer.uint32(42).bytes(message.publicKey);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Key {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.spaceAddr = reader.string();
          break;
        case 3:
          message.keychainAddr = reader.string();
          break;
        case 4:
          message.type = (reader.int32() as any);
          break;
        case 5:
          message.publicKey = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Key {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      spaceAddr: isSet(object.spaceAddr) ? String(object.spaceAddr) : "",
      keychainAddr: isSet(object.keychainAddr) ? String(object.keychainAddr) : "",
      type: isSet(object.type) ? keyTypeFromJSON(object.type) : -1,
      publicKey: isSet(object.publicKey) ? bytesFromBase64(object.publicKey) : new Uint8Array()
    };
  },
  toJSON(message: Key): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.spaceAddr !== undefined && (obj.spaceAddr = message.spaceAddr);
    message.keychainAddr !== undefined && (obj.keychainAddr = message.keychainAddr);
    message.type !== undefined && (obj.type = keyTypeToJSON(message.type));
    message.publicKey !== undefined && (obj.publicKey = base64FromBytes(message.publicKey !== undefined ? message.publicKey : new Uint8Array()));
    return obj;
  },
  fromPartial(object: Partial<Key>): Key {
    const message = createBaseKey();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.spaceAddr = object.spaceAddr ?? "";
    message.keychainAddr = object.keychainAddr ?? "";
    message.type = object.type ?? 0;
    message.publicKey = object.publicKey ?? new Uint8Array();
    return message;
  },
  fromAmino(object: KeyAmino): Key {
    const message = createBaseKey();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.space_addr !== undefined && object.space_addr !== null) {
      message.spaceAddr = object.space_addr;
    }
    if (object.keychain_addr !== undefined && object.keychain_addr !== null) {
      message.keychainAddr = object.keychain_addr;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    }
    if (object.public_key !== undefined && object.public_key !== null) {
      message.publicKey = bytesFromBase64(object.public_key);
    }
    return message;
  },
  toAmino(message: Key): KeyAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.space_addr = message.spaceAddr === "" ? undefined : message.spaceAddr;
    obj.keychain_addr = message.keychainAddr === "" ? undefined : message.keychainAddr;
    obj.type = message.type === 0 ? undefined : message.type;
    obj.public_key = message.publicKey ? base64FromBytes(message.publicKey) : undefined;
    return obj;
  },
  fromAminoMsg(object: KeyAminoMsg): Key {
    return Key.fromAmino(object.value);
  },
  fromProtoMsg(message: KeyProtoMsg): Key {
    return Key.decode(message.value);
  },
  toProto(message: Key): Uint8Array {
    return Key.encode(message).finish();
  },
  toProtoMsg(message: Key): KeyProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.Key",
      value: Key.encode(message).finish()
    };
  }
};