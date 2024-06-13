//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet, bytesFromBase64, base64FromBytes } from "../../../helpers.js";
import { JsonSafe } from "../../../json-safe.js";
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
export enum AddressType {
  /** ADDRESS_TYPE_UNSPECIFIED - The address type is missing. */
  ADDRESS_TYPE_UNSPECIFIED = 0,
  /** ADDRESS_TYPE_ETHEREUM - Ethereum address type (e.g. 0x71C7656EC7ab88b098defB751B7401B5f6d8976F). */
  ADDRESS_TYPE_ETHEREUM = 1,
  /** ADDRESS_TYPE_OSMOSIS - Osmosis address type (e.g. osmo10kmgv5gzygnecf46x092ecfe5xcvvv9rlt823n). */
  ADDRESS_TYPE_OSMOSIS = 2,
  UNRECOGNIZED = -1,
}
export const AddressTypeSDKType = AddressType;
export const AddressTypeAmino = AddressType;
export function addressTypeFromJSON(object: any): AddressType {
  switch (object) {
    case 0:
    case "ADDRESS_TYPE_UNSPECIFIED":
      return AddressType.ADDRESS_TYPE_UNSPECIFIED;
    case 1:
    case "ADDRESS_TYPE_ETHEREUM":
      return AddressType.ADDRESS_TYPE_ETHEREUM;
    case 2:
    case "ADDRESS_TYPE_OSMOSIS":
      return AddressType.ADDRESS_TYPE_OSMOSIS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AddressType.UNRECOGNIZED;
  }
}
export function addressTypeToJSON(object: AddressType): string {
  switch (object) {
    case AddressType.ADDRESS_TYPE_UNSPECIFIED:
      return "ADDRESS_TYPE_UNSPECIFIED";
    case AddressType.ADDRESS_TYPE_ETHEREUM:
      return "ADDRESS_TYPE_ETHEREUM";
    case AddressType.ADDRESS_TYPE_OSMOSIS:
      return "ADDRESS_TYPE_OSMOSIS";
    case AddressType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export interface KeyRequest {
  id: bigint;
  creator: string;
  spaceId: bigint;
  keychainId: bigint;
  keyType: KeyType;
  status: KeyRequestStatus;
  rejectReason: string;
  /** IntentId is the ID of the intent that the resulting Key will use. */
  intentId: bigint;
}
export interface KeyRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta2.KeyRequest";
  value: Uint8Array;
}
export interface KeyRequestAmino {
  id?: string;
  creator?: string;
  space_id?: string;
  keychain_id?: string;
  key_type?: KeyType;
  status?: KeyRequestStatus;
  reject_reason?: string;
  /** IntentId is the ID of the intent that the resulting Key will use. */
  intent_id?: string;
}
export interface KeyRequestAminoMsg {
  type: "/warden.warden.v1beta2.KeyRequest";
  value: KeyRequestAmino;
}
export interface KeyRequestSDKType {
  id: bigint;
  creator: string;
  space_id: bigint;
  keychain_id: bigint;
  key_type: KeyType;
  status: KeyRequestStatus;
  reject_reason: string;
  intent_id: bigint;
}
export interface Key {
  id: bigint;
  spaceId: bigint;
  keychainId: bigint;
  type: KeyType;
  publicKey: Uint8Array;
  /**
   * IntentId is the ID of the intent that will need to be satisfied for using
   * this key to sign data.
   * If this is not set, the key will use the signing intent of the Space.
   */
  intentId: bigint;
}
export interface KeyProtoMsg {
  typeUrl: "/warden.warden.v1beta2.Key";
  value: Uint8Array;
}
export interface KeyAmino {
  id?: string;
  space_id?: string;
  keychain_id?: string;
  type?: KeyType;
  public_key?: string;
  /**
   * IntentId is the ID of the intent that will need to be satisfied for using
   * this key to sign data.
   * If this is not set, the key will use the signing intent of the Space.
   */
  intent_id?: string;
}
export interface KeyAminoMsg {
  type: "/warden.warden.v1beta2.Key";
  value: KeyAmino;
}
export interface KeySDKType {
  id: bigint;
  space_id: bigint;
  keychain_id: bigint;
  type: KeyType;
  public_key: Uint8Array;
  intent_id: bigint;
}
function createBaseKeyRequest(): KeyRequest {
  return {
    id: BigInt(0),
    creator: "",
    spaceId: BigInt(0),
    keychainId: BigInt(0),
    keyType: 0,
    status: 0,
    rejectReason: "",
    intentId: BigInt(0)
  };
}
export const KeyRequest = {
  typeUrl: "/warden.warden.v1beta2.KeyRequest",
  encode(message: KeyRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.spaceId !== BigInt(0)) {
      writer.uint32(24).uint64(message.spaceId);
    }
    if (message.keychainId !== BigInt(0)) {
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
    if (message.intentId !== BigInt(0)) {
      writer.uint32(64).uint64(message.intentId);
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
          message.spaceId = reader.uint64();
          break;
        case 4:
          message.keychainId = reader.uint64();
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
        case 8:
          message.intentId = reader.uint64();
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
      spaceId: isSet(object.spaceId) ? BigInt(object.spaceId.toString()) : BigInt(0),
      keychainId: isSet(object.keychainId) ? BigInt(object.keychainId.toString()) : BigInt(0),
      keyType: isSet(object.keyType) ? keyTypeFromJSON(object.keyType) : -1,
      status: isSet(object.status) ? keyRequestStatusFromJSON(object.status) : -1,
      rejectReason: isSet(object.rejectReason) ? String(object.rejectReason) : "",
      intentId: isSet(object.intentId) ? BigInt(object.intentId.toString()) : BigInt(0)
    };
  },
  toJSON(message: KeyRequest): JsonSafe<KeyRequest> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.creator !== undefined && (obj.creator = message.creator);
    message.spaceId !== undefined && (obj.spaceId = (message.spaceId || BigInt(0)).toString());
    message.keychainId !== undefined && (obj.keychainId = (message.keychainId || BigInt(0)).toString());
    message.keyType !== undefined && (obj.keyType = keyTypeToJSON(message.keyType));
    message.status !== undefined && (obj.status = keyRequestStatusToJSON(message.status));
    message.rejectReason !== undefined && (obj.rejectReason = message.rejectReason);
    message.intentId !== undefined && (obj.intentId = (message.intentId || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<KeyRequest>): KeyRequest {
    const message = createBaseKeyRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.creator = object.creator ?? "";
    message.spaceId = object.spaceId !== undefined && object.spaceId !== null ? BigInt(object.spaceId.toString()) : BigInt(0);
    message.keychainId = object.keychainId !== undefined && object.keychainId !== null ? BigInt(object.keychainId.toString()) : BigInt(0);
    message.keyType = object.keyType ?? 0;
    message.status = object.status ?? 0;
    message.rejectReason = object.rejectReason ?? "";
    message.intentId = object.intentId !== undefined && object.intentId !== null ? BigInt(object.intentId.toString()) : BigInt(0);
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
    if (object.space_id !== undefined && object.space_id !== null) {
      message.spaceId = BigInt(object.space_id);
    }
    if (object.keychain_id !== undefined && object.keychain_id !== null) {
      message.keychainId = BigInt(object.keychain_id);
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
    if (object.intent_id !== undefined && object.intent_id !== null) {
      message.intentId = BigInt(object.intent_id);
    }
    return message;
  },
  toAmino(message: KeyRequest): KeyRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.space_id = message.spaceId !== BigInt(0) ? message.spaceId.toString() : undefined;
    obj.keychain_id = message.keychainId !== BigInt(0) ? message.keychainId.toString() : undefined;
    obj.key_type = message.keyType === 0 ? undefined : message.keyType;
    obj.status = message.status === 0 ? undefined : message.status;
    obj.reject_reason = message.rejectReason === "" ? undefined : message.rejectReason;
    obj.intent_id = message.intentId !== BigInt(0) ? message.intentId.toString() : undefined;
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
      typeUrl: "/warden.warden.v1beta2.KeyRequest",
      value: KeyRequest.encode(message).finish()
    };
  }
};
function createBaseKey(): Key {
  return {
    id: BigInt(0),
    spaceId: BigInt(0),
    keychainId: BigInt(0),
    type: 0,
    publicKey: new Uint8Array(),
    intentId: BigInt(0)
  };
}
export const Key = {
  typeUrl: "/warden.warden.v1beta2.Key",
  encode(message: Key, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.spaceId !== BigInt(0)) {
      writer.uint32(16).uint64(message.spaceId);
    }
    if (message.keychainId !== BigInt(0)) {
      writer.uint32(24).uint64(message.keychainId);
    }
    if (message.type !== 0) {
      writer.uint32(32).int32(message.type);
    }
    if (message.publicKey.length !== 0) {
      writer.uint32(42).bytes(message.publicKey);
    }
    if (message.intentId !== BigInt(0)) {
      writer.uint32(64).uint64(message.intentId);
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
          message.spaceId = reader.uint64();
          break;
        case 3:
          message.keychainId = reader.uint64();
          break;
        case 4:
          message.type = (reader.int32() as any);
          break;
        case 5:
          message.publicKey = reader.bytes();
          break;
        case 8:
          message.intentId = reader.uint64();
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
      spaceId: isSet(object.spaceId) ? BigInt(object.spaceId.toString()) : BigInt(0),
      keychainId: isSet(object.keychainId) ? BigInt(object.keychainId.toString()) : BigInt(0),
      type: isSet(object.type) ? keyTypeFromJSON(object.type) : -1,
      publicKey: isSet(object.publicKey) ? bytesFromBase64(object.publicKey) : new Uint8Array(),
      intentId: isSet(object.intentId) ? BigInt(object.intentId.toString()) : BigInt(0)
    };
  },
  toJSON(message: Key): JsonSafe<Key> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.spaceId !== undefined && (obj.spaceId = (message.spaceId || BigInt(0)).toString());
    message.keychainId !== undefined && (obj.keychainId = (message.keychainId || BigInt(0)).toString());
    message.type !== undefined && (obj.type = keyTypeToJSON(message.type));
    message.publicKey !== undefined && (obj.publicKey = base64FromBytes(message.publicKey !== undefined ? message.publicKey : new Uint8Array()));
    message.intentId !== undefined && (obj.intentId = (message.intentId || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<Key>): Key {
    const message = createBaseKey();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.spaceId = object.spaceId !== undefined && object.spaceId !== null ? BigInt(object.spaceId.toString()) : BigInt(0);
    message.keychainId = object.keychainId !== undefined && object.keychainId !== null ? BigInt(object.keychainId.toString()) : BigInt(0);
    message.type = object.type ?? 0;
    message.publicKey = object.publicKey ?? new Uint8Array();
    message.intentId = object.intentId !== undefined && object.intentId !== null ? BigInt(object.intentId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: KeyAmino): Key {
    const message = createBaseKey();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.space_id !== undefined && object.space_id !== null) {
      message.spaceId = BigInt(object.space_id);
    }
    if (object.keychain_id !== undefined && object.keychain_id !== null) {
      message.keychainId = BigInt(object.keychain_id);
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    }
    if (object.public_key !== undefined && object.public_key !== null) {
      message.publicKey = bytesFromBase64(object.public_key);
    }
    if (object.intent_id !== undefined && object.intent_id !== null) {
      message.intentId = BigInt(object.intent_id);
    }
    return message;
  },
  toAmino(message: Key): KeyAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.space_id = message.spaceId !== BigInt(0) ? message.spaceId.toString() : undefined;
    obj.keychain_id = message.keychainId !== BigInt(0) ? message.keychainId.toString() : undefined;
    obj.type = message.type === 0 ? undefined : message.type;
    obj.public_key = message.publicKey ? base64FromBytes(message.publicKey) : undefined;
    obj.intent_id = message.intentId !== BigInt(0) ? message.intentId.toString() : undefined;
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
      typeUrl: "/warden.warden.v1beta2.Key",
      value: Key.encode(message).finish()
    };
  }
};