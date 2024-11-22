//@ts-nocheck
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin.js";
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet, bytesFromBase64, base64FromBytes } from "../../../helpers.js";
import { JsonSafe } from "../../../json-safe.js";
/**
 * SignRequestStatus indicates the status of a signature request.
 * 
 * The possible state transitions are:
 *   * PENDING -> FULFILLED
 *   * PENDING -> REJECTED
 */
export enum SignRequestStatus {
  /** SIGN_REQUEST_STATUS_UNSPECIFIED - The request is missing the status field. */
  SIGN_REQUEST_STATUS_UNSPECIFIED = 0,
  /**
   * SIGN_REQUEST_STATUS_PENDING - The request is waiting to be fulfilled. This is the initial state of a
   * request.
   */
  SIGN_REQUEST_STATUS_PENDING = 1,
  /** SIGN_REQUEST_STATUS_FULFILLED - The request was fulfilled. This is a final state for a request. */
  SIGN_REQUEST_STATUS_FULFILLED = 2,
  /** SIGN_REQUEST_STATUS_REJECTED - The request was rejected. This is a final state for a request. */
  SIGN_REQUEST_STATUS_REJECTED = 3,
  UNRECOGNIZED = -1,
}
export const SignRequestStatusSDKType = SignRequestStatus;
export const SignRequestStatusAmino = SignRequestStatus;
export function signRequestStatusFromJSON(object: any): SignRequestStatus {
  switch (object) {
    case 0:
    case "SIGN_REQUEST_STATUS_UNSPECIFIED":
      return SignRequestStatus.SIGN_REQUEST_STATUS_UNSPECIFIED;
    case 1:
    case "SIGN_REQUEST_STATUS_PENDING":
      return SignRequestStatus.SIGN_REQUEST_STATUS_PENDING;
    case 2:
    case "SIGN_REQUEST_STATUS_FULFILLED":
      return SignRequestStatus.SIGN_REQUEST_STATUS_FULFILLED;
    case 3:
    case "SIGN_REQUEST_STATUS_REJECTED":
      return SignRequestStatus.SIGN_REQUEST_STATUS_REJECTED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SignRequestStatus.UNRECOGNIZED;
  }
}
export function signRequestStatusToJSON(object: SignRequestStatus): string {
  switch (object) {
    case SignRequestStatus.SIGN_REQUEST_STATUS_UNSPECIFIED:
      return "SIGN_REQUEST_STATUS_UNSPECIFIED";
    case SignRequestStatus.SIGN_REQUEST_STATUS_PENDING:
      return "SIGN_REQUEST_STATUS_PENDING";
    case SignRequestStatus.SIGN_REQUEST_STATUS_FULFILLED:
      return "SIGN_REQUEST_STATUS_FULFILLED";
    case SignRequestStatus.SIGN_REQUEST_STATUS_REJECTED:
      return "SIGN_REQUEST_STATUS_REJECTED";
    case SignRequestStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** BroadcastType specifies how the transaction should be broadcasted. */
export enum BroadcastType {
  /** BROADCAST_TYPE_DISABLED - The signature should be broadcasted manually by the caller. */
  BROADCAST_TYPE_DISABLED = 0,
  /** BROADCAST_TYPE_AUTOMATIC - The signature should be automatically broadcasted by an offchain relayer. */
  BROADCAST_TYPE_AUTOMATIC = 1,
  UNRECOGNIZED = -1,
}
export const BroadcastTypeSDKType = BroadcastType;
export const BroadcastTypeAmino = BroadcastType;
export function broadcastTypeFromJSON(object: any): BroadcastType {
  switch (object) {
    case 0:
    case "BROADCAST_TYPE_DISABLED":
      return BroadcastType.BROADCAST_TYPE_DISABLED;
    case 1:
    case "BROADCAST_TYPE_AUTOMATIC":
      return BroadcastType.BROADCAST_TYPE_AUTOMATIC;
    case -1:
    case "UNRECOGNIZED":
    default:
      return BroadcastType.UNRECOGNIZED;
  }
}
export function broadcastTypeToJSON(object: BroadcastType): string {
  switch (object) {
    case BroadcastType.BROADCAST_TYPE_DISABLED:
      return "BROADCAST_TYPE_DISABLED";
    case BroadcastType.BROADCAST_TYPE_AUTOMATIC:
      return "BROADCAST_TYPE_AUTOMATIC";
    case BroadcastType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/**
 * SignRequest is the request from a user (creator) to a Keychain to sign a
 * message (data_for_signing).
 * 
 * Once that the Keychain has received the request, it will either fulfill it
 * or reject it. The result of the request will be stored in the result field.
 */
export interface SignRequest {
  /** Unique id of the request. */
  id: bigint;
  /** Address of the creator of the request. */
  creator: string;
  /** Key ID of the key to be used for signing. */
  keyId: bigint;
  /** Data to be signed. */
  dataForSigning: Uint8Array;
  /** Status of the request. */
  status: SignRequestStatus;
  signedData?: Uint8Array;
  rejectReason?: string;
  encryptionKey: Uint8Array;
  /** Amount of fees deducted during new sign request */
  deductedKeychainFees: Coin[];
  /** Broadcast type of the sign request, indicating how the transaction should be broadcasted. */
  broadcastType: BroadcastType;
}
export interface SignRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta3.SignRequest";
  value: Uint8Array;
}
/**
 * SignRequest is the request from a user (creator) to a Keychain to sign a
 * message (data_for_signing).
 * 
 * Once that the Keychain has received the request, it will either fulfill it
 * or reject it. The result of the request will be stored in the result field.
 */
export interface SignRequestAmino {
  /** Unique id of the request. */
  id?: string;
  /** Address of the creator of the request. */
  creator?: string;
  /** Key ID of the key to be used for signing. */
  key_id?: string;
  /** Data to be signed. */
  data_for_signing?: string;
  /** Status of the request. */
  status?: SignRequestStatus;
  signed_data?: string;
  reject_reason?: string;
  encryption_key?: string;
  /** Amount of fees deducted during new sign request */
  deducted_keychain_fees: CoinAmino[];
  /** Broadcast type of the sign request, indicating how the transaction should be broadcasted. */
  broadcast_type?: BroadcastType;
}
export interface SignRequestAminoMsg {
  type: "/warden.warden.v1beta3.SignRequest";
  value: SignRequestAmino;
}
/**
 * SignRequest is the request from a user (creator) to a Keychain to sign a
 * message (data_for_signing).
 * 
 * Once that the Keychain has received the request, it will either fulfill it
 * or reject it. The result of the request will be stored in the result field.
 */
export interface SignRequestSDKType {
  id: bigint;
  creator: string;
  key_id: bigint;
  data_for_signing: Uint8Array;
  status: SignRequestStatus;
  signed_data?: Uint8Array;
  reject_reason?: string;
  encryption_key: Uint8Array;
  deducted_keychain_fees: CoinSDKType[];
  broadcast_type: BroadcastType;
}
function createBaseSignRequest(): SignRequest {
  return {
    id: BigInt(0),
    creator: "",
    keyId: BigInt(0),
    dataForSigning: new Uint8Array(),
    status: 0,
    signedData: undefined,
    rejectReason: undefined,
    encryptionKey: new Uint8Array(),
    deductedKeychainFees: [],
    broadcastType: 0
  };
}
export const SignRequest = {
  typeUrl: "/warden.warden.v1beta3.SignRequest",
  encode(message: SignRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.keyId !== BigInt(0)) {
      writer.uint32(24).uint64(message.keyId);
    }
    if (message.dataForSigning.length !== 0) {
      writer.uint32(34).bytes(message.dataForSigning);
    }
    if (message.status !== 0) {
      writer.uint32(40).int32(message.status);
    }
    if (message.signedData !== undefined) {
      writer.uint32(50).bytes(message.signedData);
    }
    if (message.rejectReason !== undefined) {
      writer.uint32(58).string(message.rejectReason);
    }
    if (message.encryptionKey.length !== 0) {
      writer.uint32(66).bytes(message.encryptionKey);
    }
    for (const v of message.deductedKeychainFees) {
      Coin.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    if (message.broadcastType !== 0) {
      writer.uint32(80).int32(message.broadcastType);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SignRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignRequest();
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
          message.keyId = reader.uint64();
          break;
        case 4:
          message.dataForSigning = reader.bytes();
          break;
        case 5:
          message.status = reader.int32() as any;
          break;
        case 6:
          message.signedData = reader.bytes();
          break;
        case 7:
          message.rejectReason = reader.string();
          break;
        case 8:
          message.encryptionKey = reader.bytes();
          break;
        case 9:
          message.deductedKeychainFees.push(Coin.decode(reader, reader.uint32()));
          break;
        case 10:
          message.broadcastType = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SignRequest {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      creator: isSet(object.creator) ? String(object.creator) : "",
      keyId: isSet(object.keyId) ? BigInt(object.keyId.toString()) : BigInt(0),
      dataForSigning: isSet(object.dataForSigning) ? bytesFromBase64(object.dataForSigning) : new Uint8Array(),
      status: isSet(object.status) ? signRequestStatusFromJSON(object.status) : -1,
      signedData: isSet(object.signedData) ? bytesFromBase64(object.signedData) : undefined,
      rejectReason: isSet(object.rejectReason) ? String(object.rejectReason) : undefined,
      encryptionKey: isSet(object.encryptionKey) ? bytesFromBase64(object.encryptionKey) : new Uint8Array(),
      deductedKeychainFees: Array.isArray(object?.deductedKeychainFees) ? object.deductedKeychainFees.map((e: any) => Coin.fromJSON(e)) : [],
      broadcastType: isSet(object.broadcastType) ? broadcastTypeFromJSON(object.broadcastType) : -1
    };
  },
  toJSON(message: SignRequest): JsonSafe<SignRequest> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.creator !== undefined && (obj.creator = message.creator);
    message.keyId !== undefined && (obj.keyId = (message.keyId || BigInt(0)).toString());
    message.dataForSigning !== undefined && (obj.dataForSigning = base64FromBytes(message.dataForSigning !== undefined ? message.dataForSigning : new Uint8Array()));
    message.status !== undefined && (obj.status = signRequestStatusToJSON(message.status));
    message.signedData !== undefined && (obj.signedData = message.signedData !== undefined ? base64FromBytes(message.signedData) : undefined);
    message.rejectReason !== undefined && (obj.rejectReason = message.rejectReason);
    message.encryptionKey !== undefined && (obj.encryptionKey = base64FromBytes(message.encryptionKey !== undefined ? message.encryptionKey : new Uint8Array()));
    if (message.deductedKeychainFees) {
      obj.deductedKeychainFees = message.deductedKeychainFees.map(e => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.deductedKeychainFees = [];
    }
    message.broadcastType !== undefined && (obj.broadcastType = broadcastTypeToJSON(message.broadcastType));
    return obj;
  },
  fromPartial(object: Partial<SignRequest>): SignRequest {
    const message = createBaseSignRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.creator = object.creator ?? "";
    message.keyId = object.keyId !== undefined && object.keyId !== null ? BigInt(object.keyId.toString()) : BigInt(0);
    message.dataForSigning = object.dataForSigning ?? new Uint8Array();
    message.status = object.status ?? 0;
    message.signedData = object.signedData ?? undefined;
    message.rejectReason = object.rejectReason ?? undefined;
    message.encryptionKey = object.encryptionKey ?? new Uint8Array();
    message.deductedKeychainFees = object.deductedKeychainFees?.map(e => Coin.fromPartial(e)) || [];
    message.broadcastType = object.broadcastType ?? 0;
    return message;
  },
  fromAmino(object: SignRequestAmino): SignRequest {
    const message = createBaseSignRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.key_id !== undefined && object.key_id !== null) {
      message.keyId = BigInt(object.key_id);
    }
    if (object.data_for_signing !== undefined && object.data_for_signing !== null) {
      message.dataForSigning = bytesFromBase64(object.data_for_signing);
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    if (object.signed_data !== undefined && object.signed_data !== null) {
      message.signedData = bytesFromBase64(object.signed_data);
    }
    if (object.reject_reason !== undefined && object.reject_reason !== null) {
      message.rejectReason = object.reject_reason;
    }
    if (object.encryption_key !== undefined && object.encryption_key !== null) {
      message.encryptionKey = bytesFromBase64(object.encryption_key);
    }
    message.deductedKeychainFees = object.deducted_keychain_fees?.map(e => Coin.fromAmino(e)) || [];
    if (object.broadcast_type !== undefined && object.broadcast_type !== null) {
      message.broadcastType = object.broadcast_type;
    }
    return message;
  },
  toAmino(message: SignRequest): SignRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? (message.id?.toString)() : undefined;
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.key_id = message.keyId !== BigInt(0) ? (message.keyId?.toString)() : undefined;
    obj.data_for_signing = message.dataForSigning ? base64FromBytes(message.dataForSigning) : undefined;
    obj.status = message.status === 0 ? undefined : message.status;
    obj.signed_data = message.signedData ? base64FromBytes(message.signedData) : undefined;
    obj.reject_reason = message.rejectReason === null ? undefined : message.rejectReason;
    obj.encryption_key = message.encryptionKey ? base64FromBytes(message.encryptionKey) : undefined;
    if (message.deductedKeychainFees) {
      obj.deducted_keychain_fees = message.deductedKeychainFees.map(e => e ? Coin.toAmino(e) : undefined);
    } else {
      obj.deducted_keychain_fees = message.deductedKeychainFees;
    }
    obj.broadcast_type = message.broadcastType === 0 ? undefined : message.broadcastType;
    return obj;
  },
  fromAminoMsg(object: SignRequestAminoMsg): SignRequest {
    return SignRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: SignRequestProtoMsg): SignRequest {
    return SignRequest.decode(message.value);
  },
  toProto(message: SignRequest): Uint8Array {
    return SignRequest.encode(message).finish();
  },
  toProtoMsg(message: SignRequest): SignRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.SignRequest",
      value: SignRequest.encode(message).finish()
    };
  }
};