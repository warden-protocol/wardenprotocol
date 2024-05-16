//@ts-nocheck
import { Long, isSet, bytesFromBase64, base64FromBytes } from "../../../helpers.js";
import _m0 from "protobufjs/minimal.js";
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
/**
 * SignMethod specifies what method of the protocol should be used for parsing
 * the data to be signed.
 */
export enum SignMethod {
  /** SIGN_METHOD_BLACK_BOX - Sign method black box means that the input will be used as-is. */
  SIGN_METHOD_BLACK_BOX = 0,
  /**
   * SIGN_METHOD_ETH - Sign method ETH means that the input will be parsed as an Ethereum
   * transaction.
   */
  SIGN_METHOD_ETH = 1,
  /**
   * SIGN_METHOD_OSMOSIS - Sign method Osmosis means that the input will be parsed as an Osmosis
   * transaction.
   */
  SIGN_METHOD_OSMOSIS = 2,
  UNRECOGNIZED = -1,
}
export const SignMethodSDKType = SignMethod;
export const SignMethodAmino = SignMethod;
export function signMethodFromJSON(object: any): SignMethod {
  switch (object) {
    case 0:
    case "SIGN_METHOD_BLACK_BOX":
      return SignMethod.SIGN_METHOD_BLACK_BOX;
    case 1:
    case "SIGN_METHOD_ETH":
      return SignMethod.SIGN_METHOD_ETH;
    case 2:
    case "SIGN_METHOD_OSMOSIS":
      return SignMethod.SIGN_METHOD_OSMOSIS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SignMethod.UNRECOGNIZED;
  }
}
export function signMethodToJSON(object: SignMethod): string {
  switch (object) {
    case SignMethod.SIGN_METHOD_BLACK_BOX:
      return "SIGN_METHOD_BLACK_BOX";
    case SignMethod.SIGN_METHOD_ETH:
      return "SIGN_METHOD_ETH";
    case SignMethod.SIGN_METHOD_OSMOSIS:
      return "SIGN_METHOD_OSMOSIS";
    case SignMethod.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export interface SignRequest {
  id: Long;
  creator: string;
  keyId: Long;
  dataForSigning: Uint8Array;
  status: SignRequestStatus;
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
  signed_data?: string;
  reject_reason?: string;
}
export interface SignRequestAminoMsg {
  type: "/warden.warden.v1beta2.SignRequest";
  value: SignRequestAmino;
}
export interface SignRequestSDKType {
  id: Long;
  creator: string;
  key_id: Long;
  data_for_signing: Uint8Array;
  status: SignRequestStatus;
  signed_data?: Uint8Array;
  reject_reason?: string;
}
function createBaseSignRequest(): SignRequest {
  return {
    id: Long.UZERO,
    creator: "",
    keyId: Long.UZERO,
    dataForSigning: new Uint8Array(),
    status: 0,
    signedData: undefined,
    rejectReason: undefined
  };
}
export const SignRequest = {
  typeUrl: "/warden.warden.v1beta2.SignRequest",
  encode(message: SignRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (!message.keyId.isZero()) {
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
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): SignRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = (reader.uint64() as Long);
          break;
        case 2:
          message.creator = reader.string();
          break;
        case 3:
          message.keyId = (reader.uint64() as Long);
          break;
        case 4:
          message.dataForSigning = reader.bytes();
          break;
        case 5:
          message.status = (reader.int32() as any);
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
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
      creator: isSet(object.creator) ? String(object.creator) : "",
      keyId: isSet(object.keyId) ? Long.fromValue(object.keyId) : Long.UZERO,
      dataForSigning: isSet(object.dataForSigning) ? bytesFromBase64(object.dataForSigning) : new Uint8Array(),
      status: isSet(object.status) ? signRequestStatusFromJSON(object.status) : -1,
      signedData: isSet(object.signedData) ? bytesFromBase64(object.signedData) : undefined,
      rejectReason: isSet(object.rejectReason) ? String(object.rejectReason) : undefined
    };
  },
  toJSON(message: SignRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString());
    message.creator !== undefined && (obj.creator = message.creator);
    message.keyId !== undefined && (obj.keyId = (message.keyId || Long.UZERO).toString());
    message.dataForSigning !== undefined && (obj.dataForSigning = base64FromBytes(message.dataForSigning !== undefined ? message.dataForSigning : new Uint8Array()));
    message.status !== undefined && (obj.status = signRequestStatusToJSON(message.status));
    message.signedData !== undefined && (obj.signedData = message.signedData !== undefined ? base64FromBytes(message.signedData) : undefined);
    message.rejectReason !== undefined && (obj.rejectReason = message.rejectReason);
    return obj;
  },
  fromPartial(object: Partial<SignRequest>): SignRequest {
    const message = createBaseSignRequest();
    message.id = object.id !== undefined && object.id !== null ? Long.fromValue(object.id) : Long.UZERO;
    message.creator = object.creator ?? "";
    message.keyId = object.keyId !== undefined && object.keyId !== null ? Long.fromValue(object.keyId) : Long.UZERO;
    message.dataForSigning = object.dataForSigning ?? new Uint8Array();
    message.status = object.status ?? 0;
    message.signedData = object.signedData ?? undefined;
    message.rejectReason = object.rejectReason ?? undefined;
    return message;
  },
  fromAmino(object: SignRequestAmino): SignRequest {
    const message = createBaseSignRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = Long.fromString(object.id);
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.key_id !== undefined && object.key_id !== null) {
      message.keyId = Long.fromString(object.key_id);
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
    return message;
  },
  toAmino(message: SignRequest): SignRequestAmino {
    const obj: any = {};
    obj.id = !message.id.isZero() ? message.id.toString() : undefined;
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.key_id = !message.keyId.isZero() ? message.keyId.toString() : undefined;
    obj.data_for_signing = message.dataForSigning ? base64FromBytes(message.dataForSigning) : undefined;
    obj.status = message.status === 0 ? undefined : message.status;
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