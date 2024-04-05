//@ts-nocheck
import { KeyType, keyTypeFromJSON, keyTypeToJSON } from "./key.js";
import { WalletType, walletTypeFromJSON, walletTypeToJSON } from "./wallet.js";
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet, bytesFromBase64, base64FromBytes } from "../../../helpers.js";
/**
 * SignRequestStatus indicates the status of a signature request.
 * A request starts as "pending", waiting to be picked up. Then it can move to
 * either "approved" or "rejected", depending on the decision of the keychain.
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
export interface SignRequest {
  id: bigint;
  creator: string;
  keyId: bigint;
  dataForSigning: Uint8Array;
  status: SignRequestStatus;
  keyType: KeyType;
  signedData?: Uint8Array;
  rejectReason?: string;
}
export interface SignRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta2.SignRequest";
  value: Uint8Array;
}
export interface SignRequestAmino {
  id?: string;
  creator?: string;
  key_id?: string;
  data_for_signing?: string;
  status?: SignRequestStatus;
  key_type?: KeyType;
  signed_data?: string;
  reject_reason?: string;
}
export interface SignRequestAminoMsg {
  type: "/warden.warden.v1beta2.SignRequest";
  value: SignRequestAmino;
}
export interface SignRequestSDKType {
  id: bigint;
  creator: string;
  key_id: bigint;
  data_for_signing: Uint8Array;
  status: SignRequestStatus;
  key_type: KeyType;
  signed_data?: Uint8Array;
  reject_reason?: string;
}
export interface SignTransactionRequest {
  id: bigint;
  creator: string;
  keyId: bigint;
  walletType: WalletType;
  unsignedTransaction: Uint8Array;
  signRequestId: bigint;
}
export interface SignTransactionRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta2.SignTransactionRequest";
  value: Uint8Array;
}
export interface SignTransactionRequestAmino {
  id?: string;
  creator?: string;
  key_id?: string;
  wallet_type?: WalletType;
  unsigned_transaction?: string;
  sign_request_id?: string;
}
export interface SignTransactionRequestAminoMsg {
  type: "/warden.warden.v1beta2.SignTransactionRequest";
  value: SignTransactionRequestAmino;
}
export interface SignTransactionRequestSDKType {
  id: bigint;
  creator: string;
  key_id: bigint;
  wallet_type: WalletType;
  unsigned_transaction: Uint8Array;
  sign_request_id: bigint;
}
function createBaseSignRequest(): SignRequest {
  return {
    id: BigInt(0),
    creator: "",
    keyId: BigInt(0),
    dataForSigning: new Uint8Array(),
    status: 0,
    keyType: 0,
    signedData: undefined,
    rejectReason: undefined
  };
}
export const SignRequest = {
  typeUrl: "/warden.warden.v1beta2.SignRequest",
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
    if (message.keyType !== 0) {
      writer.uint32(64).int32(message.keyType);
    }
    if (message.signedData !== undefined) {
      writer.uint32(50).bytes(message.signedData);
    }
    if (message.rejectReason !== undefined) {
      writer.uint32(58).string(message.rejectReason);
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
          message.status = (reader.int32() as any);
          break;
        case 8:
          message.keyType = (reader.int32() as any);
          break;
        case 6:
          message.signedData = reader.bytes();
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
  fromJSON(object: any): SignRequest {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      creator: isSet(object.creator) ? String(object.creator) : "",
      keyId: isSet(object.keyId) ? BigInt(object.keyId.toString()) : BigInt(0),
      dataForSigning: isSet(object.dataForSigning) ? bytesFromBase64(object.dataForSigning) : new Uint8Array(),
      status: isSet(object.status) ? signRequestStatusFromJSON(object.status) : -1,
      keyType: isSet(object.keyType) ? keyTypeFromJSON(object.keyType) : -1,
      signedData: isSet(object.signedData) ? bytesFromBase64(object.signedData) : undefined,
      rejectReason: isSet(object.rejectReason) ? String(object.rejectReason) : undefined
    };
  },
  toJSON(message: SignRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.creator !== undefined && (obj.creator = message.creator);
    message.keyId !== undefined && (obj.keyId = (message.keyId || BigInt(0)).toString());
    message.dataForSigning !== undefined && (obj.dataForSigning = base64FromBytes(message.dataForSigning !== undefined ? message.dataForSigning : new Uint8Array()));
    message.status !== undefined && (obj.status = signRequestStatusToJSON(message.status));
    message.keyType !== undefined && (obj.keyType = keyTypeToJSON(message.keyType));
    message.signedData !== undefined && (obj.signedData = message.signedData !== undefined ? base64FromBytes(message.signedData) : undefined);
    message.rejectReason !== undefined && (obj.rejectReason = message.rejectReason);
    return obj;
  },
  fromPartial(object: Partial<SignRequest>): SignRequest {
    const message = createBaseSignRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.creator = object.creator ?? "";
    message.keyId = object.keyId !== undefined && object.keyId !== null ? BigInt(object.keyId.toString()) : BigInt(0);
    message.dataForSigning = object.dataForSigning ?? new Uint8Array();
    message.status = object.status ?? 0;
    message.keyType = object.keyType ?? 0;
    message.signedData = object.signedData ?? undefined;
    message.rejectReason = object.rejectReason ?? undefined;
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
    if (object.key_type !== undefined && object.key_type !== null) {
      message.keyType = object.key_type;
    }
    if (object.signed_data !== undefined && object.signed_data !== null) {
      message.signedData = bytesFromBase64(object.signed_data);
    }
    if (object.reject_reason !== undefined && object.reject_reason !== null) {
      message.rejectReason = object.reject_reason;
    }
    return message;
  },
  toAmino(message: SignRequest): SignRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.key_id = message.keyId !== BigInt(0) ? message.keyId.toString() : undefined;
    obj.data_for_signing = message.dataForSigning ? base64FromBytes(message.dataForSigning) : undefined;
    obj.status = message.status === 0 ? undefined : message.status;
    obj.key_type = message.keyType === 0 ? undefined : message.keyType;
    obj.signed_data = message.signedData ? base64FromBytes(message.signedData) : undefined;
    obj.reject_reason = message.rejectReason === null ? undefined : message.rejectReason;
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
      typeUrl: "/warden.warden.v1beta2.SignRequest",
      value: SignRequest.encode(message).finish()
    };
  }
};
function createBaseSignTransactionRequest(): SignTransactionRequest {
  return {
    id: BigInt(0),
    creator: "",
    keyId: BigInt(0),
    walletType: 0,
    unsignedTransaction: new Uint8Array(),
    signRequestId: BigInt(0)
  };
}
export const SignTransactionRequest = {
  typeUrl: "/warden.warden.v1beta2.SignTransactionRequest",
  encode(message: SignTransactionRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.keyId !== BigInt(0)) {
      writer.uint32(24).uint64(message.keyId);
    }
    if (message.walletType !== 0) {
      writer.uint32(32).int32(message.walletType);
    }
    if (message.unsignedTransaction.length !== 0) {
      writer.uint32(42).bytes(message.unsignedTransaction);
    }
    if (message.signRequestId !== BigInt(0)) {
      writer.uint32(48).uint64(message.signRequestId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SignTransactionRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignTransactionRequest();
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
          message.walletType = (reader.int32() as any);
          break;
        case 5:
          message.unsignedTransaction = reader.bytes();
          break;
        case 6:
          message.signRequestId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SignTransactionRequest {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      creator: isSet(object.creator) ? String(object.creator) : "",
      keyId: isSet(object.keyId) ? BigInt(object.keyId.toString()) : BigInt(0),
      walletType: isSet(object.walletType) ? walletTypeFromJSON(object.walletType) : -1,
      unsignedTransaction: isSet(object.unsignedTransaction) ? bytesFromBase64(object.unsignedTransaction) : new Uint8Array(),
      signRequestId: isSet(object.signRequestId) ? BigInt(object.signRequestId.toString()) : BigInt(0)
    };
  },
  toJSON(message: SignTransactionRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.creator !== undefined && (obj.creator = message.creator);
    message.keyId !== undefined && (obj.keyId = (message.keyId || BigInt(0)).toString());
    message.walletType !== undefined && (obj.walletType = walletTypeToJSON(message.walletType));
    message.unsignedTransaction !== undefined && (obj.unsignedTransaction = base64FromBytes(message.unsignedTransaction !== undefined ? message.unsignedTransaction : new Uint8Array()));
    message.signRequestId !== undefined && (obj.signRequestId = (message.signRequestId || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<SignTransactionRequest>): SignTransactionRequest {
    const message = createBaseSignTransactionRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.creator = object.creator ?? "";
    message.keyId = object.keyId !== undefined && object.keyId !== null ? BigInt(object.keyId.toString()) : BigInt(0);
    message.walletType = object.walletType ?? 0;
    message.unsignedTransaction = object.unsignedTransaction ?? new Uint8Array();
    message.signRequestId = object.signRequestId !== undefined && object.signRequestId !== null ? BigInt(object.signRequestId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: SignTransactionRequestAmino): SignTransactionRequest {
    const message = createBaseSignTransactionRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.key_id !== undefined && object.key_id !== null) {
      message.keyId = BigInt(object.key_id);
    }
    if (object.wallet_type !== undefined && object.wallet_type !== null) {
      message.walletType = object.wallet_type;
    }
    if (object.unsigned_transaction !== undefined && object.unsigned_transaction !== null) {
      message.unsignedTransaction = bytesFromBase64(object.unsigned_transaction);
    }
    if (object.sign_request_id !== undefined && object.sign_request_id !== null) {
      message.signRequestId = BigInt(object.sign_request_id);
    }
    return message;
  },
  toAmino(message: SignTransactionRequest): SignTransactionRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.key_id = message.keyId !== BigInt(0) ? message.keyId.toString() : undefined;
    obj.wallet_type = message.walletType === 0 ? undefined : message.walletType;
    obj.unsigned_transaction = message.unsignedTransaction ? base64FromBytes(message.unsignedTransaction) : undefined;
    obj.sign_request_id = message.signRequestId !== BigInt(0) ? message.signRequestId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: SignTransactionRequestAminoMsg): SignTransactionRequest {
    return SignTransactionRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: SignTransactionRequestProtoMsg): SignTransactionRequest {
    return SignTransactionRequest.decode(message.value);
  },
  toProto(message: SignTransactionRequest): Uint8Array {
    return SignTransactionRequest.encode(message).finish();
  },
  toProtoMsg(message: SignTransactionRequest): SignTransactionRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta2.SignTransactionRequest",
      value: SignTransactionRequest.encode(message).finish()
    };
  }
};