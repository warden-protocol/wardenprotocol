/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { MsgActionCreated } from "../../intent/action";
import {
  KeyRequestStatus,
  keyRequestStatusFromJSON,
  keyRequestStatusToJSON,
  KeyType,
  keyTypeFromJSON,
  keyTypeToJSON,
} from "./key";
import { KeychainFees } from "./keychain";
import { Params } from "./params";
import { SignRequestStatus, signRequestStatusFromJSON, signRequestStatusToJSON } from "./signature";
import { WalletType, walletTypeFromJSON, walletTypeToJSON } from "./wallet";

export const protobufPackage = "warden.warden.v1beta2";

/** MsgUpdateParams is the Msg/UpdateParams request type. */
export interface MsgUpdateParams {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /**
   * params defines the module parameters to update.
   *
   * NOTE: All parameters must be supplied.
   */
  params: Params | undefined;
}

/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponse {
}

export interface MsgNewSpace {
  creator: string;
  adminIntentId: number;
  signIntentId: number;
  additionalOwners: string[];
}

export interface MsgNewSpaceResponse {
  id: number;
}

export interface MsgAddSpaceOwner {
  creator: string;
  spaceId: number;
  newOwner: string;
  btl: number;
}

export interface MsgAddSpaceOwnerResponse {
}

export interface MsgRemoveSpaceOwner {
  creator: string;
  spaceId: number;
  owner: string;
  btl: number;
}

export interface MsgRemoveSpaceOwnerResponse {
}

export interface MsgNewKeychain {
  creator: string;
  description: string;
  adminIntentId: number;
  keychainFees: KeychainFees | undefined;
}

export interface MsgNewKeychainResponse {
  id: number;
}

export interface MsgAddKeychainParty {
  creator: string;
  keychainId: number;
  party: string;
}

export interface MsgAddKeychainPartyResponse {
}

export interface MsgUpdateSpace {
  creator: string;
  spaceId: number;
  adminIntentId: number;
  signIntentId: number;
  btl: number;
}

export interface MsgUpdateSpaceResponse {
}

export interface MsgUpdateKeychain {
  creator: string;
  keychainId: number;
  description: string;
  isActive: boolean;
}

export interface MsgUpdateKeychainResponse {
}

export interface MsgNewKeyRequest {
  creator: string;
  spaceId: number;
  keychainId: number;
  keyType: KeyType;
  btl: number;
  intentId: number;
}

export interface MsgNewKeyRequestResponse {
  id: number;
}

export interface MsgNewKey {
  publicKey: Uint8Array;
}

export interface MsgUpdateKeyRequest {
  creator: string;
  requestId: number;
  status: KeyRequestStatus;
  key?: MsgNewKey | undefined;
  rejectReason?: string | undefined;
}

export interface MsgUpdateKeyRequestResponse {
}

export interface MsgNewSignatureRequest {
  creator: string;
  keyId: number;
  dataForSigning: Uint8Array;
  btl: number;
}

export interface MsgNewSignatureRequestResponse {
  id: number;
}

export interface MsgSignedData {
  signedData: Uint8Array;
}

export interface MsgFulfilSignatureRequest {
  creator: string;
  requestId: number;
  status: SignRequestStatus;
  payload?: MsgSignedData | undefined;
  rejectReason?: string | undefined;
}

export interface MsgFulfilSignatureRequestResponse {
}

export interface MsgNewSignTransactionRequest {
  creator: string;
  keyId: number;
  walletType: WalletType;
  unsignedTransaction: Uint8Array;
  btl: number;
  /** Additional metadata required when parsing the unsigned transaction. */
  metadata: Any | undefined;
}

export interface MsgNewSignTransactionRequestResponse {
  id: number;
  signatureRequestId: number;
}

export interface MetadataEthereum {
  chainId: number;
}

function createBaseMsgUpdateParams(): MsgUpdateParams {
  return { authority: "", params: undefined };
}

export const MsgUpdateParams = {
  encode(message: MsgUpdateParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParams {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authority = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.params = Params.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateParams {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: MsgUpdateParams): unknown {
    const obj: any = {};
    if (message.authority !== "") {
      obj.authority = message.authority;
    }
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateParams>, I>>(base?: I): MsgUpdateParams {
    return MsgUpdateParams.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateParams>, I>>(object: I): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}

export const MsgUpdateParamsResponse = {
  encode(_: MsgUpdateParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParamsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateParamsResponse {
    return {};
  },

  toJSON(_: MsgUpdateParamsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateParamsResponse>, I>>(base?: I): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateParamsResponse>, I>>(_: I): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
};

function createBaseMsgNewSpace(): MsgNewSpace {
  return { creator: "", adminIntentId: 0, signIntentId: 0, additionalOwners: [] };
}

export const MsgNewSpace = {
  encode(message: MsgNewSpace, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.adminIntentId !== 0) {
      writer.uint32(16).uint64(message.adminIntentId);
    }
    if (message.signIntentId !== 0) {
      writer.uint32(24).uint64(message.signIntentId);
    }
    for (const v of message.additionalOwners) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgNewSpace {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgNewSpace();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.adminIntentId = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.signIntentId = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.additionalOwners.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgNewSpace {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      adminIntentId: isSet(object.adminIntentId) ? Number(object.adminIntentId) : 0,
      signIntentId: isSet(object.signIntentId) ? Number(object.signIntentId) : 0,
      additionalOwners: Array.isArray(object?.additionalOwners)
        ? object.additionalOwners.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: MsgNewSpace): unknown {
    const obj: any = {};
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.adminIntentId !== 0) {
      obj.adminIntentId = Math.round(message.adminIntentId);
    }
    if (message.signIntentId !== 0) {
      obj.signIntentId = Math.round(message.signIntentId);
    }
    if (message.additionalOwners?.length) {
      obj.additionalOwners = message.additionalOwners;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgNewSpace>, I>>(base?: I): MsgNewSpace {
    return MsgNewSpace.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgNewSpace>, I>>(object: I): MsgNewSpace {
    const message = createBaseMsgNewSpace();
    message.creator = object.creator ?? "";
    message.adminIntentId = object.adminIntentId ?? 0;
    message.signIntentId = object.signIntentId ?? 0;
    message.additionalOwners = object.additionalOwners?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgNewSpaceResponse(): MsgNewSpaceResponse {
  return { id: 0 };
}

export const MsgNewSpaceResponse = {
  encode(message: MsgNewSpaceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgNewSpaceResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgNewSpaceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgNewSpaceResponse {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: MsgNewSpaceResponse): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgNewSpaceResponse>, I>>(base?: I): MsgNewSpaceResponse {
    return MsgNewSpaceResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgNewSpaceResponse>, I>>(object: I): MsgNewSpaceResponse {
    const message = createBaseMsgNewSpaceResponse();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseMsgAddSpaceOwner(): MsgAddSpaceOwner {
  return { creator: "", spaceId: 0, newOwner: "", btl: 0 };
}

export const MsgAddSpaceOwner = {
  encode(message: MsgAddSpaceOwner, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.spaceId !== 0) {
      writer.uint32(16).uint64(message.spaceId);
    }
    if (message.newOwner !== "") {
      writer.uint32(26).string(message.newOwner);
    }
    if (message.btl !== 0) {
      writer.uint32(32).uint64(message.btl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddSpaceOwner {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddSpaceOwner();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.spaceId = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.newOwner = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.btl = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgAddSpaceOwner {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      spaceId: isSet(object.spaceId) ? Number(object.spaceId) : 0,
      newOwner: isSet(object.newOwner) ? String(object.newOwner) : "",
      btl: isSet(object.btl) ? Number(object.btl) : 0,
    };
  },

  toJSON(message: MsgAddSpaceOwner): unknown {
    const obj: any = {};
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.spaceId !== 0) {
      obj.spaceId = Math.round(message.spaceId);
    }
    if (message.newOwner !== "") {
      obj.newOwner = message.newOwner;
    }
    if (message.btl !== 0) {
      obj.btl = Math.round(message.btl);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAddSpaceOwner>, I>>(base?: I): MsgAddSpaceOwner {
    return MsgAddSpaceOwner.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAddSpaceOwner>, I>>(object: I): MsgAddSpaceOwner {
    const message = createBaseMsgAddSpaceOwner();
    message.creator = object.creator ?? "";
    message.spaceId = object.spaceId ?? 0;
    message.newOwner = object.newOwner ?? "";
    message.btl = object.btl ?? 0;
    return message;
  },
};

function createBaseMsgAddSpaceOwnerResponse(): MsgAddSpaceOwnerResponse {
  return {};
}

export const MsgAddSpaceOwnerResponse = {
  encode(_: MsgAddSpaceOwnerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddSpaceOwnerResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddSpaceOwnerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgAddSpaceOwnerResponse {
    return {};
  },

  toJSON(_: MsgAddSpaceOwnerResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAddSpaceOwnerResponse>, I>>(base?: I): MsgAddSpaceOwnerResponse {
    return MsgAddSpaceOwnerResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAddSpaceOwnerResponse>, I>>(_: I): MsgAddSpaceOwnerResponse {
    const message = createBaseMsgAddSpaceOwnerResponse();
    return message;
  },
};

function createBaseMsgRemoveSpaceOwner(): MsgRemoveSpaceOwner {
  return { creator: "", spaceId: 0, owner: "", btl: 0 };
}

export const MsgRemoveSpaceOwner = {
  encode(message: MsgRemoveSpaceOwner, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.spaceId !== 0) {
      writer.uint32(16).uint64(message.spaceId);
    }
    if (message.owner !== "") {
      writer.uint32(26).string(message.owner);
    }
    if (message.btl !== 0) {
      writer.uint32(32).uint64(message.btl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveSpaceOwner {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveSpaceOwner();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.spaceId = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.owner = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.btl = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgRemoveSpaceOwner {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      spaceId: isSet(object.spaceId) ? Number(object.spaceId) : 0,
      owner: isSet(object.owner) ? String(object.owner) : "",
      btl: isSet(object.btl) ? Number(object.btl) : 0,
    };
  },

  toJSON(message: MsgRemoveSpaceOwner): unknown {
    const obj: any = {};
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.spaceId !== 0) {
      obj.spaceId = Math.round(message.spaceId);
    }
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (message.btl !== 0) {
      obj.btl = Math.round(message.btl);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRemoveSpaceOwner>, I>>(base?: I): MsgRemoveSpaceOwner {
    return MsgRemoveSpaceOwner.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRemoveSpaceOwner>, I>>(object: I): MsgRemoveSpaceOwner {
    const message = createBaseMsgRemoveSpaceOwner();
    message.creator = object.creator ?? "";
    message.spaceId = object.spaceId ?? 0;
    message.owner = object.owner ?? "";
    message.btl = object.btl ?? 0;
    return message;
  },
};

function createBaseMsgRemoveSpaceOwnerResponse(): MsgRemoveSpaceOwnerResponse {
  return {};
}

export const MsgRemoveSpaceOwnerResponse = {
  encode(_: MsgRemoveSpaceOwnerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveSpaceOwnerResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveSpaceOwnerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgRemoveSpaceOwnerResponse {
    return {};
  },

  toJSON(_: MsgRemoveSpaceOwnerResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRemoveSpaceOwnerResponse>, I>>(base?: I): MsgRemoveSpaceOwnerResponse {
    return MsgRemoveSpaceOwnerResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRemoveSpaceOwnerResponse>, I>>(_: I): MsgRemoveSpaceOwnerResponse {
    const message = createBaseMsgRemoveSpaceOwnerResponse();
    return message;
  },
};

function createBaseMsgNewKeychain(): MsgNewKeychain {
  return { creator: "", description: "", adminIntentId: 0, keychainFees: undefined };
}

export const MsgNewKeychain = {
  encode(message: MsgNewKeychain, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.adminIntentId !== 0) {
      writer.uint32(24).uint64(message.adminIntentId);
    }
    if (message.keychainFees !== undefined) {
      KeychainFees.encode(message.keychainFees, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgNewKeychain {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgNewKeychain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.adminIntentId = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.keychainFees = KeychainFees.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgNewKeychain {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      description: isSet(object.description) ? String(object.description) : "",
      adminIntentId: isSet(object.adminIntentId) ? Number(object.adminIntentId) : 0,
      keychainFees: isSet(object.keychainFees) ? KeychainFees.fromJSON(object.keychainFees) : undefined,
    };
  },

  toJSON(message: MsgNewKeychain): unknown {
    const obj: any = {};
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.adminIntentId !== 0) {
      obj.adminIntentId = Math.round(message.adminIntentId);
    }
    if (message.keychainFees !== undefined) {
      obj.keychainFees = KeychainFees.toJSON(message.keychainFees);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgNewKeychain>, I>>(base?: I): MsgNewKeychain {
    return MsgNewKeychain.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgNewKeychain>, I>>(object: I): MsgNewKeychain {
    const message = createBaseMsgNewKeychain();
    message.creator = object.creator ?? "";
    message.description = object.description ?? "";
    message.adminIntentId = object.adminIntentId ?? 0;
    message.keychainFees = (object.keychainFees !== undefined && object.keychainFees !== null)
      ? KeychainFees.fromPartial(object.keychainFees)
      : undefined;
    return message;
  },
};

function createBaseMsgNewKeychainResponse(): MsgNewKeychainResponse {
  return { id: 0 };
}

export const MsgNewKeychainResponse = {
  encode(message: MsgNewKeychainResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgNewKeychainResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgNewKeychainResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgNewKeychainResponse {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: MsgNewKeychainResponse): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgNewKeychainResponse>, I>>(base?: I): MsgNewKeychainResponse {
    return MsgNewKeychainResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgNewKeychainResponse>, I>>(object: I): MsgNewKeychainResponse {
    const message = createBaseMsgNewKeychainResponse();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseMsgAddKeychainParty(): MsgAddKeychainParty {
  return { creator: "", keychainId: 0, party: "" };
}

export const MsgAddKeychainParty = {
  encode(message: MsgAddKeychainParty, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.keychainId !== 0) {
      writer.uint32(16).uint64(message.keychainId);
    }
    if (message.party !== "") {
      writer.uint32(26).string(message.party);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddKeychainParty {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddKeychainParty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.keychainId = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.party = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgAddKeychainParty {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      keychainId: isSet(object.keychainId) ? Number(object.keychainId) : 0,
      party: isSet(object.party) ? String(object.party) : "",
    };
  },

  toJSON(message: MsgAddKeychainParty): unknown {
    const obj: any = {};
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.keychainId !== 0) {
      obj.keychainId = Math.round(message.keychainId);
    }
    if (message.party !== "") {
      obj.party = message.party;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAddKeychainParty>, I>>(base?: I): MsgAddKeychainParty {
    return MsgAddKeychainParty.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAddKeychainParty>, I>>(object: I): MsgAddKeychainParty {
    const message = createBaseMsgAddKeychainParty();
    message.creator = object.creator ?? "";
    message.keychainId = object.keychainId ?? 0;
    message.party = object.party ?? "";
    return message;
  },
};

function createBaseMsgAddKeychainPartyResponse(): MsgAddKeychainPartyResponse {
  return {};
}

export const MsgAddKeychainPartyResponse = {
  encode(_: MsgAddKeychainPartyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddKeychainPartyResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddKeychainPartyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgAddKeychainPartyResponse {
    return {};
  },

  toJSON(_: MsgAddKeychainPartyResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAddKeychainPartyResponse>, I>>(base?: I): MsgAddKeychainPartyResponse {
    return MsgAddKeychainPartyResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAddKeychainPartyResponse>, I>>(_: I): MsgAddKeychainPartyResponse {
    const message = createBaseMsgAddKeychainPartyResponse();
    return message;
  },
};

function createBaseMsgUpdateSpace(): MsgUpdateSpace {
  return { creator: "", spaceId: 0, adminIntentId: 0, signIntentId: 0, btl: 0 };
}

export const MsgUpdateSpace = {
  encode(message: MsgUpdateSpace, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.spaceId !== 0) {
      writer.uint32(16).uint64(message.spaceId);
    }
    if (message.adminIntentId !== 0) {
      writer.uint32(24).uint64(message.adminIntentId);
    }
    if (message.signIntentId !== 0) {
      writer.uint32(32).uint64(message.signIntentId);
    }
    if (message.btl !== 0) {
      writer.uint32(40).uint64(message.btl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateSpace {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateSpace();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator = reader.string();
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

          message.adminIntentId = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.signIntentId = longToNumber(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.btl = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateSpace {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      spaceId: isSet(object.spaceId) ? Number(object.spaceId) : 0,
      adminIntentId: isSet(object.adminIntentId) ? Number(object.adminIntentId) : 0,
      signIntentId: isSet(object.signIntentId) ? Number(object.signIntentId) : 0,
      btl: isSet(object.btl) ? Number(object.btl) : 0,
    };
  },

  toJSON(message: MsgUpdateSpace): unknown {
    const obj: any = {};
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.spaceId !== 0) {
      obj.spaceId = Math.round(message.spaceId);
    }
    if (message.adminIntentId !== 0) {
      obj.adminIntentId = Math.round(message.adminIntentId);
    }
    if (message.signIntentId !== 0) {
      obj.signIntentId = Math.round(message.signIntentId);
    }
    if (message.btl !== 0) {
      obj.btl = Math.round(message.btl);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateSpace>, I>>(base?: I): MsgUpdateSpace {
    return MsgUpdateSpace.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateSpace>, I>>(object: I): MsgUpdateSpace {
    const message = createBaseMsgUpdateSpace();
    message.creator = object.creator ?? "";
    message.spaceId = object.spaceId ?? 0;
    message.adminIntentId = object.adminIntentId ?? 0;
    message.signIntentId = object.signIntentId ?? 0;
    message.btl = object.btl ?? 0;
    return message;
  },
};

function createBaseMsgUpdateSpaceResponse(): MsgUpdateSpaceResponse {
  return {};
}

export const MsgUpdateSpaceResponse = {
  encode(_: MsgUpdateSpaceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateSpaceResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateSpaceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateSpaceResponse {
    return {};
  },

  toJSON(_: MsgUpdateSpaceResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateSpaceResponse>, I>>(base?: I): MsgUpdateSpaceResponse {
    return MsgUpdateSpaceResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateSpaceResponse>, I>>(_: I): MsgUpdateSpaceResponse {
    const message = createBaseMsgUpdateSpaceResponse();
    return message;
  },
};

function createBaseMsgUpdateKeychain(): MsgUpdateKeychain {
  return { creator: "", keychainId: 0, description: "", isActive: false };
}

export const MsgUpdateKeychain = {
  encode(message: MsgUpdateKeychain, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.keychainId !== 0) {
      writer.uint32(16).uint64(message.keychainId);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.isActive === true) {
      writer.uint32(32).bool(message.isActive);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateKeychain {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateKeychain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.keychainId = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.description = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.isActive = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateKeychain {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      keychainId: isSet(object.keychainId) ? Number(object.keychainId) : 0,
      description: isSet(object.description) ? String(object.description) : "",
      isActive: isSet(object.isActive) ? Boolean(object.isActive) : false,
    };
  },

  toJSON(message: MsgUpdateKeychain): unknown {
    const obj: any = {};
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.keychainId !== 0) {
      obj.keychainId = Math.round(message.keychainId);
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.isActive === true) {
      obj.isActive = message.isActive;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateKeychain>, I>>(base?: I): MsgUpdateKeychain {
    return MsgUpdateKeychain.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateKeychain>, I>>(object: I): MsgUpdateKeychain {
    const message = createBaseMsgUpdateKeychain();
    message.creator = object.creator ?? "";
    message.keychainId = object.keychainId ?? 0;
    message.description = object.description ?? "";
    message.isActive = object.isActive ?? false;
    return message;
  },
};

function createBaseMsgUpdateKeychainResponse(): MsgUpdateKeychainResponse {
  return {};
}

export const MsgUpdateKeychainResponse = {
  encode(_: MsgUpdateKeychainResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateKeychainResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateKeychainResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateKeychainResponse {
    return {};
  },

  toJSON(_: MsgUpdateKeychainResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateKeychainResponse>, I>>(base?: I): MsgUpdateKeychainResponse {
    return MsgUpdateKeychainResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateKeychainResponse>, I>>(_: I): MsgUpdateKeychainResponse {
    const message = createBaseMsgUpdateKeychainResponse();
    return message;
  },
};

function createBaseMsgNewKeyRequest(): MsgNewKeyRequest {
  return { creator: "", spaceId: 0, keychainId: 0, keyType: 0, btl: 0, intentId: 0 };
}

export const MsgNewKeyRequest = {
  encode(message: MsgNewKeyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.spaceId !== 0) {
      writer.uint32(16).uint64(message.spaceId);
    }
    if (message.keychainId !== 0) {
      writer.uint32(24).uint64(message.keychainId);
    }
    if (message.keyType !== 0) {
      writer.uint32(32).int32(message.keyType);
    }
    if (message.btl !== 0) {
      writer.uint32(40).uint64(message.btl);
    }
    if (message.intentId !== 0) {
      writer.uint32(48).uint64(message.intentId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgNewKeyRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgNewKeyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator = reader.string();
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

          message.keyType = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.btl = longToNumber(reader.uint64() as Long);
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.intentId = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgNewKeyRequest {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      spaceId: isSet(object.spaceId) ? Number(object.spaceId) : 0,
      keychainId: isSet(object.keychainId) ? Number(object.keychainId) : 0,
      keyType: isSet(object.keyType) ? keyTypeFromJSON(object.keyType) : 0,
      btl: isSet(object.btl) ? Number(object.btl) : 0,
      intentId: isSet(object.intentId) ? Number(object.intentId) : 0,
    };
  },

  toJSON(message: MsgNewKeyRequest): unknown {
    const obj: any = {};
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
    if (message.btl !== 0) {
      obj.btl = Math.round(message.btl);
    }
    if (message.intentId !== 0) {
      obj.intentId = Math.round(message.intentId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgNewKeyRequest>, I>>(base?: I): MsgNewKeyRequest {
    return MsgNewKeyRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgNewKeyRequest>, I>>(object: I): MsgNewKeyRequest {
    const message = createBaseMsgNewKeyRequest();
    message.creator = object.creator ?? "";
    message.spaceId = object.spaceId ?? 0;
    message.keychainId = object.keychainId ?? 0;
    message.keyType = object.keyType ?? 0;
    message.btl = object.btl ?? 0;
    message.intentId = object.intentId ?? 0;
    return message;
  },
};

function createBaseMsgNewKeyRequestResponse(): MsgNewKeyRequestResponse {
  return { id: 0 };
}

export const MsgNewKeyRequestResponse = {
  encode(message: MsgNewKeyRequestResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgNewKeyRequestResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgNewKeyRequestResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgNewKeyRequestResponse {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: MsgNewKeyRequestResponse): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgNewKeyRequestResponse>, I>>(base?: I): MsgNewKeyRequestResponse {
    return MsgNewKeyRequestResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgNewKeyRequestResponse>, I>>(object: I): MsgNewKeyRequestResponse {
    const message = createBaseMsgNewKeyRequestResponse();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseMsgNewKey(): MsgNewKey {
  return { publicKey: new Uint8Array(0) };
}

export const MsgNewKey = {
  encode(message: MsgNewKey, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.publicKey.length !== 0) {
      writer.uint32(10).bytes(message.publicKey);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgNewKey {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgNewKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  fromJSON(object: any): MsgNewKey {
    return { publicKey: isSet(object.publicKey) ? bytesFromBase64(object.publicKey) : new Uint8Array(0) };
  },

  toJSON(message: MsgNewKey): unknown {
    const obj: any = {};
    if (message.publicKey.length !== 0) {
      obj.publicKey = base64FromBytes(message.publicKey);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgNewKey>, I>>(base?: I): MsgNewKey {
    return MsgNewKey.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgNewKey>, I>>(object: I): MsgNewKey {
    const message = createBaseMsgNewKey();
    message.publicKey = object.publicKey ?? new Uint8Array(0);
    return message;
  },
};

function createBaseMsgUpdateKeyRequest(): MsgUpdateKeyRequest {
  return { creator: "", requestId: 0, status: 0, key: undefined, rejectReason: undefined };
}

export const MsgUpdateKeyRequest = {
  encode(message: MsgUpdateKeyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.requestId !== 0) {
      writer.uint32(16).uint64(message.requestId);
    }
    if (message.status !== 0) {
      writer.uint32(24).int32(message.status);
    }
    if (message.key !== undefined) {
      MsgNewKey.encode(message.key, writer.uint32(34).fork()).ldelim();
    }
    if (message.rejectReason !== undefined) {
      writer.uint32(42).string(message.rejectReason);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateKeyRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateKeyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.requestId = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.key = MsgNewKey.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
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

  fromJSON(object: any): MsgUpdateKeyRequest {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      status: isSet(object.status) ? keyRequestStatusFromJSON(object.status) : 0,
      key: isSet(object.key) ? MsgNewKey.fromJSON(object.key) : undefined,
      rejectReason: isSet(object.rejectReason) ? String(object.rejectReason) : undefined,
    };
  },

  toJSON(message: MsgUpdateKeyRequest): unknown {
    const obj: any = {};
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.requestId !== 0) {
      obj.requestId = Math.round(message.requestId);
    }
    if (message.status !== 0) {
      obj.status = keyRequestStatusToJSON(message.status);
    }
    if (message.key !== undefined) {
      obj.key = MsgNewKey.toJSON(message.key);
    }
    if (message.rejectReason !== undefined) {
      obj.rejectReason = message.rejectReason;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateKeyRequest>, I>>(base?: I): MsgUpdateKeyRequest {
    return MsgUpdateKeyRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateKeyRequest>, I>>(object: I): MsgUpdateKeyRequest {
    const message = createBaseMsgUpdateKeyRequest();
    message.creator = object.creator ?? "";
    message.requestId = object.requestId ?? 0;
    message.status = object.status ?? 0;
    message.key = (object.key !== undefined && object.key !== null) ? MsgNewKey.fromPartial(object.key) : undefined;
    message.rejectReason = object.rejectReason ?? undefined;
    return message;
  },
};

function createBaseMsgUpdateKeyRequestResponse(): MsgUpdateKeyRequestResponse {
  return {};
}

export const MsgUpdateKeyRequestResponse = {
  encode(_: MsgUpdateKeyRequestResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateKeyRequestResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateKeyRequestResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateKeyRequestResponse {
    return {};
  },

  toJSON(_: MsgUpdateKeyRequestResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateKeyRequestResponse>, I>>(base?: I): MsgUpdateKeyRequestResponse {
    return MsgUpdateKeyRequestResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateKeyRequestResponse>, I>>(_: I): MsgUpdateKeyRequestResponse {
    const message = createBaseMsgUpdateKeyRequestResponse();
    return message;
  },
};

function createBaseMsgNewSignatureRequest(): MsgNewSignatureRequest {
  return { creator: "", keyId: 0, dataForSigning: new Uint8Array(0), btl: 0 };
}

export const MsgNewSignatureRequest = {
  encode(message: MsgNewSignatureRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.keyId !== 0) {
      writer.uint32(16).uint64(message.keyId);
    }
    if (message.dataForSigning.length !== 0) {
      writer.uint32(26).bytes(message.dataForSigning);
    }
    if (message.btl !== 0) {
      writer.uint32(32).uint64(message.btl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgNewSignatureRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgNewSignatureRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.keyId = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.dataForSigning = reader.bytes();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.btl = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgNewSignatureRequest {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      keyId: isSet(object.keyId) ? Number(object.keyId) : 0,
      dataForSigning: isSet(object.dataForSigning) ? bytesFromBase64(object.dataForSigning) : new Uint8Array(0),
      btl: isSet(object.btl) ? Number(object.btl) : 0,
    };
  },

  toJSON(message: MsgNewSignatureRequest): unknown {
    const obj: any = {};
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.keyId !== 0) {
      obj.keyId = Math.round(message.keyId);
    }
    if (message.dataForSigning.length !== 0) {
      obj.dataForSigning = base64FromBytes(message.dataForSigning);
    }
    if (message.btl !== 0) {
      obj.btl = Math.round(message.btl);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgNewSignatureRequest>, I>>(base?: I): MsgNewSignatureRequest {
    return MsgNewSignatureRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgNewSignatureRequest>, I>>(object: I): MsgNewSignatureRequest {
    const message = createBaseMsgNewSignatureRequest();
    message.creator = object.creator ?? "";
    message.keyId = object.keyId ?? 0;
    message.dataForSigning = object.dataForSigning ?? new Uint8Array(0);
    message.btl = object.btl ?? 0;
    return message;
  },
};

function createBaseMsgNewSignatureRequestResponse(): MsgNewSignatureRequestResponse {
  return { id: 0 };
}

export const MsgNewSignatureRequestResponse = {
  encode(message: MsgNewSignatureRequestResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgNewSignatureRequestResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgNewSignatureRequestResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgNewSignatureRequestResponse {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: MsgNewSignatureRequestResponse): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgNewSignatureRequestResponse>, I>>(base?: I): MsgNewSignatureRequestResponse {
    return MsgNewSignatureRequestResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgNewSignatureRequestResponse>, I>>(
    object: I,
  ): MsgNewSignatureRequestResponse {
    const message = createBaseMsgNewSignatureRequestResponse();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseMsgSignedData(): MsgSignedData {
  return { signedData: new Uint8Array(0) };
}

export const MsgSignedData = {
  encode(message: MsgSignedData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signedData.length !== 0) {
      writer.uint32(10).bytes(message.signedData);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSignedData {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSignedData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signedData = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSignedData {
    return { signedData: isSet(object.signedData) ? bytesFromBase64(object.signedData) : new Uint8Array(0) };
  },

  toJSON(message: MsgSignedData): unknown {
    const obj: any = {};
    if (message.signedData.length !== 0) {
      obj.signedData = base64FromBytes(message.signedData);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSignedData>, I>>(base?: I): MsgSignedData {
    return MsgSignedData.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSignedData>, I>>(object: I): MsgSignedData {
    const message = createBaseMsgSignedData();
    message.signedData = object.signedData ?? new Uint8Array(0);
    return message;
  },
};

function createBaseMsgFulfilSignatureRequest(): MsgFulfilSignatureRequest {
  return { creator: "", requestId: 0, status: 0, payload: undefined, rejectReason: undefined };
}

export const MsgFulfilSignatureRequest = {
  encode(message: MsgFulfilSignatureRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.requestId !== 0) {
      writer.uint32(16).uint64(message.requestId);
    }
    if (message.status !== 0) {
      writer.uint32(24).int32(message.status);
    }
    if (message.payload !== undefined) {
      MsgSignedData.encode(message.payload, writer.uint32(34).fork()).ldelim();
    }
    if (message.rejectReason !== undefined) {
      writer.uint32(42).string(message.rejectReason);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgFulfilSignatureRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFulfilSignatureRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.requestId = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.payload = MsgSignedData.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
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

  fromJSON(object: any): MsgFulfilSignatureRequest {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      status: isSet(object.status) ? signRequestStatusFromJSON(object.status) : 0,
      payload: isSet(object.payload) ? MsgSignedData.fromJSON(object.payload) : undefined,
      rejectReason: isSet(object.rejectReason) ? String(object.rejectReason) : undefined,
    };
  },

  toJSON(message: MsgFulfilSignatureRequest): unknown {
    const obj: any = {};
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.requestId !== 0) {
      obj.requestId = Math.round(message.requestId);
    }
    if (message.status !== 0) {
      obj.status = signRequestStatusToJSON(message.status);
    }
    if (message.payload !== undefined) {
      obj.payload = MsgSignedData.toJSON(message.payload);
    }
    if (message.rejectReason !== undefined) {
      obj.rejectReason = message.rejectReason;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgFulfilSignatureRequest>, I>>(base?: I): MsgFulfilSignatureRequest {
    return MsgFulfilSignatureRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgFulfilSignatureRequest>, I>>(object: I): MsgFulfilSignatureRequest {
    const message = createBaseMsgFulfilSignatureRequest();
    message.creator = object.creator ?? "";
    message.requestId = object.requestId ?? 0;
    message.status = object.status ?? 0;
    message.payload = (object.payload !== undefined && object.payload !== null)
      ? MsgSignedData.fromPartial(object.payload)
      : undefined;
    message.rejectReason = object.rejectReason ?? undefined;
    return message;
  },
};

function createBaseMsgFulfilSignatureRequestResponse(): MsgFulfilSignatureRequestResponse {
  return {};
}

export const MsgFulfilSignatureRequestResponse = {
  encode(_: MsgFulfilSignatureRequestResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgFulfilSignatureRequestResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFulfilSignatureRequestResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgFulfilSignatureRequestResponse {
    return {};
  },

  toJSON(_: MsgFulfilSignatureRequestResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgFulfilSignatureRequestResponse>, I>>(
    base?: I,
  ): MsgFulfilSignatureRequestResponse {
    return MsgFulfilSignatureRequestResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgFulfilSignatureRequestResponse>, I>>(
    _: I,
  ): MsgFulfilSignatureRequestResponse {
    const message = createBaseMsgFulfilSignatureRequestResponse();
    return message;
  },
};

function createBaseMsgNewSignTransactionRequest(): MsgNewSignTransactionRequest {
  return { creator: "", keyId: 0, walletType: 0, unsignedTransaction: new Uint8Array(0), btl: 0, metadata: undefined };
}

export const MsgNewSignTransactionRequest = {
  encode(message: MsgNewSignTransactionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.keyId !== 0) {
      writer.uint32(16).uint64(message.keyId);
    }
    if (message.walletType !== 0) {
      writer.uint32(24).int32(message.walletType);
    }
    if (message.unsignedTransaction.length !== 0) {
      writer.uint32(34).bytes(message.unsignedTransaction);
    }
    if (message.btl !== 0) {
      writer.uint32(40).uint64(message.btl);
    }
    if (message.metadata !== undefined) {
      Any.encode(message.metadata, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgNewSignTransactionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgNewSignTransactionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.keyId = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.walletType = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.unsignedTransaction = reader.bytes();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.btl = longToNumber(reader.uint64() as Long);
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.metadata = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgNewSignTransactionRequest {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      keyId: isSet(object.keyId) ? Number(object.keyId) : 0,
      walletType: isSet(object.walletType) ? walletTypeFromJSON(object.walletType) : 0,
      unsignedTransaction: isSet(object.unsignedTransaction)
        ? bytesFromBase64(object.unsignedTransaction)
        : new Uint8Array(0),
      btl: isSet(object.btl) ? Number(object.btl) : 0,
      metadata: isSet(object.metadata) ? Any.fromJSON(object.metadata) : undefined,
    };
  },

  toJSON(message: MsgNewSignTransactionRequest): unknown {
    const obj: any = {};
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.keyId !== 0) {
      obj.keyId = Math.round(message.keyId);
    }
    if (message.walletType !== 0) {
      obj.walletType = walletTypeToJSON(message.walletType);
    }
    if (message.unsignedTransaction.length !== 0) {
      obj.unsignedTransaction = base64FromBytes(message.unsignedTransaction);
    }
    if (message.btl !== 0) {
      obj.btl = Math.round(message.btl);
    }
    if (message.metadata !== undefined) {
      obj.metadata = Any.toJSON(message.metadata);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgNewSignTransactionRequest>, I>>(base?: I): MsgNewSignTransactionRequest {
    return MsgNewSignTransactionRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgNewSignTransactionRequest>, I>>(object: I): MsgNewSignTransactionRequest {
    const message = createBaseMsgNewSignTransactionRequest();
    message.creator = object.creator ?? "";
    message.keyId = object.keyId ?? 0;
    message.walletType = object.walletType ?? 0;
    message.unsignedTransaction = object.unsignedTransaction ?? new Uint8Array(0);
    message.btl = object.btl ?? 0;
    message.metadata = (object.metadata !== undefined && object.metadata !== null)
      ? Any.fromPartial(object.metadata)
      : undefined;
    return message;
  },
};

function createBaseMsgNewSignTransactionRequestResponse(): MsgNewSignTransactionRequestResponse {
  return { id: 0, signatureRequestId: 0 };
}

export const MsgNewSignTransactionRequestResponse = {
  encode(message: MsgNewSignTransactionRequestResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.signatureRequestId !== 0) {
      writer.uint32(16).uint64(message.signatureRequestId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgNewSignTransactionRequestResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgNewSignTransactionRequestResponse();
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

          message.signatureRequestId = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgNewSignTransactionRequestResponse {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      signatureRequestId: isSet(object.signatureRequestId) ? Number(object.signatureRequestId) : 0,
    };
  },

  toJSON(message: MsgNewSignTransactionRequestResponse): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.signatureRequestId !== 0) {
      obj.signatureRequestId = Math.round(message.signatureRequestId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgNewSignTransactionRequestResponse>, I>>(
    base?: I,
  ): MsgNewSignTransactionRequestResponse {
    return MsgNewSignTransactionRequestResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgNewSignTransactionRequestResponse>, I>>(
    object: I,
  ): MsgNewSignTransactionRequestResponse {
    const message = createBaseMsgNewSignTransactionRequestResponse();
    message.id = object.id ?? 0;
    message.signatureRequestId = object.signatureRequestId ?? 0;
    return message;
  },
};

function createBaseMetadataEthereum(): MetadataEthereum {
  return { chainId: 0 };
}

export const MetadataEthereum = {
  encode(message: MetadataEthereum, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainId !== 0) {
      writer.uint32(8).uint64(message.chainId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MetadataEthereum {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMetadataEthereum();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.chainId = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MetadataEthereum {
    return { chainId: isSet(object.chainId) ? Number(object.chainId) : 0 };
  },

  toJSON(message: MetadataEthereum): unknown {
    const obj: any = {};
    if (message.chainId !== 0) {
      obj.chainId = Math.round(message.chainId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MetadataEthereum>, I>>(base?: I): MetadataEthereum {
    return MetadataEthereum.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MetadataEthereum>, I>>(object: I): MetadataEthereum {
    const message = createBaseMetadataEthereum();
    message.chainId = object.chainId ?? 0;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /**
   * UpdateParams defines a (governance) operation for updating the module
   * parameters. The authority defaults to the x/gov module account.
   */
  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  /** Create a new Space. The creator will be the first owner of the Space. */
  NewSpace(request: MsgNewSpace): Promise<MsgNewSpaceResponse>;
  /** Add a new owner to a space. */
  AddSpaceOwner(request: MsgAddSpaceOwner): Promise<MsgActionCreated>;
  /**
   * Remove an owner from the space. The user can remove itself, but at
   * least one owner must be left.
   */
  RemoveSpaceOwner(request: MsgRemoveSpaceOwner): Promise<MsgActionCreated>;
  /** Create a new keychain. The user will be the first admin of the keychain. */
  NewKeychain(request: MsgNewKeychain): Promise<MsgNewKeychainResponse>;
  /**
   * Add a new party to a keychain. Transactions coming from this party will
   * be considered trusted by the keychain.
   */
  AddKeychainParty(request: MsgAddKeychainParty): Promise<MsgAddKeychainPartyResponse>;
  /** Update a space, e.g. changing the intents in use. */
  UpdateSpace(request: MsgUpdateSpace): Promise<MsgActionCreated>;
  /** Update a keychain, e.g. update the status or description. */
  UpdateKeychain(request: MsgUpdateKeychain): Promise<MsgUpdateKeychainResponse>;
  /**
   * Request a new key to a keychain, the key will belong to the specified
   * space.
   */
  NewKeyRequest(request: MsgNewKeyRequest): Promise<MsgActionCreated>;
  /**
   * Update an existing request by writing a result into it. This method is
   * called by a keychain party.
   */
  UpdateKeyRequest(request: MsgUpdateKeyRequest): Promise<MsgUpdateKeyRequestResponse>;
  /** Request a new signature */
  NewSignatureRequest(request: MsgNewSignatureRequest): Promise<MsgActionCreated>;
  /** Fulfill a signature request */
  FulfilSignatureRequest(request: MsgFulfilSignatureRequest): Promise<MsgFulfilSignatureRequestResponse>;
  /**
   * Request a new signature for a layer 1 transaction, using the specified
   * wallet.
   * The difference with NewSignatureRequest is that this message will be
   * parsed by the wallet to apply specific intents that depends on
   * informations contained in the transaction itself (e.g. amount, recipient).
   */
  NewSignTransactionRequest(request: MsgNewSignTransactionRequest): Promise<MsgActionCreated>;
}

export const MsgServiceName = "warden.warden.v1beta2.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.UpdateParams = this.UpdateParams.bind(this);
    this.NewSpace = this.NewSpace.bind(this);
    this.AddSpaceOwner = this.AddSpaceOwner.bind(this);
    this.RemoveSpaceOwner = this.RemoveSpaceOwner.bind(this);
    this.NewKeychain = this.NewKeychain.bind(this);
    this.AddKeychainParty = this.AddKeychainParty.bind(this);
    this.UpdateSpace = this.UpdateSpace.bind(this);
    this.UpdateKeychain = this.UpdateKeychain.bind(this);
    this.NewKeyRequest = this.NewKeyRequest.bind(this);
    this.UpdateKeyRequest = this.UpdateKeyRequest.bind(this);
    this.NewSignatureRequest = this.NewSignatureRequest.bind(this);
    this.FulfilSignatureRequest = this.FulfilSignatureRequest.bind(this);
    this.NewSignTransactionRequest = this.NewSignTransactionRequest.bind(this);
  }
  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateParams", data);
    return promise.then((data) => MsgUpdateParamsResponse.decode(_m0.Reader.create(data)));
  }

  NewSpace(request: MsgNewSpace): Promise<MsgNewSpaceResponse> {
    const data = MsgNewSpace.encode(request).finish();
    const promise = this.rpc.request(this.service, "NewSpace", data);
    return promise.then((data) => MsgNewSpaceResponse.decode(_m0.Reader.create(data)));
  }

  AddSpaceOwner(request: MsgAddSpaceOwner): Promise<MsgActionCreated> {
    const data = MsgAddSpaceOwner.encode(request).finish();
    const promise = this.rpc.request(this.service, "AddSpaceOwner", data);
    return promise.then((data) => MsgActionCreated.decode(_m0.Reader.create(data)));
  }

  RemoveSpaceOwner(request: MsgRemoveSpaceOwner): Promise<MsgActionCreated> {
    const data = MsgRemoveSpaceOwner.encode(request).finish();
    const promise = this.rpc.request(this.service, "RemoveSpaceOwner", data);
    return promise.then((data) => MsgActionCreated.decode(_m0.Reader.create(data)));
  }

  NewKeychain(request: MsgNewKeychain): Promise<MsgNewKeychainResponse> {
    const data = MsgNewKeychain.encode(request).finish();
    const promise = this.rpc.request(this.service, "NewKeychain", data);
    return promise.then((data) => MsgNewKeychainResponse.decode(_m0.Reader.create(data)));
  }

  AddKeychainParty(request: MsgAddKeychainParty): Promise<MsgAddKeychainPartyResponse> {
    const data = MsgAddKeychainParty.encode(request).finish();
    const promise = this.rpc.request(this.service, "AddKeychainParty", data);
    return promise.then((data) => MsgAddKeychainPartyResponse.decode(_m0.Reader.create(data)));
  }

  UpdateSpace(request: MsgUpdateSpace): Promise<MsgActionCreated> {
    const data = MsgUpdateSpace.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateSpace", data);
    return promise.then((data) => MsgActionCreated.decode(_m0.Reader.create(data)));
  }

  UpdateKeychain(request: MsgUpdateKeychain): Promise<MsgUpdateKeychainResponse> {
    const data = MsgUpdateKeychain.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateKeychain", data);
    return promise.then((data) => MsgUpdateKeychainResponse.decode(_m0.Reader.create(data)));
  }

  NewKeyRequest(request: MsgNewKeyRequest): Promise<MsgActionCreated> {
    const data = MsgNewKeyRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "NewKeyRequest", data);
    return promise.then((data) => MsgActionCreated.decode(_m0.Reader.create(data)));
  }

  UpdateKeyRequest(request: MsgUpdateKeyRequest): Promise<MsgUpdateKeyRequestResponse> {
    const data = MsgUpdateKeyRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateKeyRequest", data);
    return promise.then((data) => MsgUpdateKeyRequestResponse.decode(_m0.Reader.create(data)));
  }

  NewSignatureRequest(request: MsgNewSignatureRequest): Promise<MsgActionCreated> {
    const data = MsgNewSignatureRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "NewSignatureRequest", data);
    return promise.then((data) => MsgActionCreated.decode(_m0.Reader.create(data)));
  }

  FulfilSignatureRequest(request: MsgFulfilSignatureRequest): Promise<MsgFulfilSignatureRequestResponse> {
    const data = MsgFulfilSignatureRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "FulfilSignatureRequest", data);
    return promise.then((data) => MsgFulfilSignatureRequestResponse.decode(_m0.Reader.create(data)));
  }

  NewSignTransactionRequest(request: MsgNewSignTransactionRequest): Promise<MsgActionCreated> {
    const data = MsgNewSignTransactionRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "NewSignTransactionRequest", data);
    return promise.then((data) => MsgActionCreated.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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
