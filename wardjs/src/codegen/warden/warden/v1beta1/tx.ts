//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params.js";
import { KeychainFees, KeychainFeesAmino, KeychainFeesSDKType } from "./keychain.js";
import { KeyType, KeyRequestStatus, keyTypeFromJSON, keyTypeToJSON, keyRequestStatusFromJSON, keyRequestStatusToJSON } from "./key.js";
import { SignRequestStatus, signRequestStatusFromJSON, signRequestStatusToJSON } from "./signature.js";
import { WalletType, walletTypeFromJSON, walletTypeToJSON } from "./wallet.js";
import { Any, AnyAmino, AnySDKType } from "../../../google/protobuf/any.js";
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet, bytesFromBase64, base64FromBytes } from "../../../helpers.js";
/** MsgUpdateParams is the Msg/UpdateParams request type. */
export interface MsgUpdateParams {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /**
   * params defines the module parameters to update.
   * 
   * NOTE: All parameters must be supplied.
   */
  params: Params;
}
export interface MsgUpdateParamsProtoMsg {
  typeUrl: "/warden.warden.v1beta1.MsgUpdateParams";
  value: Uint8Array;
}
/** MsgUpdateParams is the Msg/UpdateParams request type. */
export interface MsgUpdateParamsAmino {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority?: string;
  /**
   * params defines the module parameters to update.
   * 
   * NOTE: All parameters must be supplied.
   */
  params: ParamsAmino;
}
export interface MsgUpdateParamsAminoMsg {
  type: "warden/x/warden/MsgUpdateParams";
  value: MsgUpdateParamsAmino;
}
/** MsgUpdateParams is the Msg/UpdateParams request type. */
export interface MsgUpdateParamsSDKType {
  authority: string;
  params: ParamsSDKType;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponse {}
export interface MsgUpdateParamsResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta1.MsgUpdateParamsResponse";
  value: Uint8Array;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/warden.warden.v1beta1.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponseSDKType {}
export interface MsgNewSpace {
  creator: string;
  adminIntentId: bigint;
  signIntentId: bigint;
  additionalOwners: string[];
}
export interface MsgNewSpaceProtoMsg {
  typeUrl: "/warden.warden.v1beta1.MsgNewSpace";
  value: Uint8Array;
}
export interface MsgNewSpaceAmino {
  creator?: string;
  admin_intent_id?: string;
  sign_intent_id?: string;
  additional_owners?: string[];
}
export interface MsgNewSpaceAminoMsg {
  type: "/warden.warden.v1beta1.MsgNewSpace";
  value: MsgNewSpaceAmino;
}
export interface MsgNewSpaceSDKType {
  creator: string;
  admin_intent_id: bigint;
  sign_intent_id: bigint;
  additional_owners: string[];
}
export interface MsgNewSpaceResponse {
  address: string;
}
export interface MsgNewSpaceResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta1.MsgNewSpaceResponse";
  value: Uint8Array;
}
export interface MsgNewSpaceResponseAmino {
  address?: string;
}
export interface MsgNewSpaceResponseAminoMsg {
  type: "/warden.warden.v1beta1.MsgNewSpaceResponse";
  value: MsgNewSpaceResponseAmino;
}
export interface MsgNewSpaceResponseSDKType {
  address: string;
}
export interface MsgAddSpaceOwner {
  creator: string;
  spaceAddr: string;
  newOwner: string;
  btl: bigint;
}
export interface MsgAddSpaceOwnerProtoMsg {
  typeUrl: "/warden.warden.v1beta1.MsgAddSpaceOwner";
  value: Uint8Array;
}
export interface MsgAddSpaceOwnerAmino {
  creator?: string;
  space_addr?: string;
  new_owner?: string;
  btl?: string;
}
export interface MsgAddSpaceOwnerAminoMsg {
  type: "/warden.warden.v1beta1.MsgAddSpaceOwner";
  value: MsgAddSpaceOwnerAmino;
}
export interface MsgAddSpaceOwnerSDKType {
  creator: string;
  space_addr: string;
  new_owner: string;
  btl: bigint;
}
export interface MsgAddSpaceOwnerResponse {}
export interface MsgAddSpaceOwnerResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta1.MsgAddSpaceOwnerResponse";
  value: Uint8Array;
}
export interface MsgAddSpaceOwnerResponseAmino {}
export interface MsgAddSpaceOwnerResponseAminoMsg {
  type: "/warden.warden.v1beta1.MsgAddSpaceOwnerResponse";
  value: MsgAddSpaceOwnerResponseAmino;
}
export interface MsgAddSpaceOwnerResponseSDKType {}
export interface MsgRemoveSpaceOwner {
  creator: string;
  spaceAddr: string;
  owner: string;
  btl: bigint;
}
export interface MsgRemoveSpaceOwnerProtoMsg {
  typeUrl: "/warden.warden.v1beta1.MsgRemoveSpaceOwner";
  value: Uint8Array;
}
export interface MsgRemoveSpaceOwnerAmino {
  creator?: string;
  space_addr?: string;
  owner?: string;
  btl?: string;
}
export interface MsgRemoveSpaceOwnerAminoMsg {
  type: "/warden.warden.v1beta1.MsgRemoveSpaceOwner";
  value: MsgRemoveSpaceOwnerAmino;
}
export interface MsgRemoveSpaceOwnerSDKType {
  creator: string;
  space_addr: string;
  owner: string;
  btl: bigint;
}
export interface MsgRemoveSpaceOwnerResponse {}
export interface MsgRemoveSpaceOwnerResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta1.MsgRemoveSpaceOwnerResponse";
  value: Uint8Array;
}
export interface MsgRemoveSpaceOwnerResponseAmino {}
export interface MsgRemoveSpaceOwnerResponseAminoMsg {
  type: "/warden.warden.v1beta1.MsgRemoveSpaceOwnerResponse";
  value: MsgRemoveSpaceOwnerResponseAmino;
}
export interface MsgRemoveSpaceOwnerResponseSDKType {}
export interface MsgNewKeychain {
  creator: string;
  description: string;
  adminIntentId: bigint;
  keychainFees?: KeychainFees;
}
export interface MsgNewKeychainProtoMsg {
  typeUrl: "/warden.warden.v1beta1.MsgNewKeychain";
  value: Uint8Array;
}
export interface MsgNewKeychainAmino {
  creator?: string;
  description?: string;
  admin_intent_id?: string;
  keychain_fees?: KeychainFeesAmino;
}
export interface MsgNewKeychainAminoMsg {
  type: "/warden.warden.v1beta1.MsgNewKeychain";
  value: MsgNewKeychainAmino;
}
export interface MsgNewKeychainSDKType {
  creator: string;
  description: string;
  admin_intent_id: bigint;
  keychain_fees?: KeychainFeesSDKType;
}
export interface MsgNewKeychainResponse {
  address: string;
}
export interface MsgNewKeychainResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta1.MsgNewKeychainResponse";
  value: Uint8Array;
}
export interface MsgNewKeychainResponseAmino {
  address?: string;
}
export interface MsgNewKeychainResponseAminoMsg {
  type: "/warden.warden.v1beta1.MsgNewKeychainResponse";
  value: MsgNewKeychainResponseAmino;
}
export interface MsgNewKeychainResponseSDKType {
  address: string;
}
export interface MsgAddKeychainParty {
  creator: string;
  keychainAddr: string;
  party: string;
}
export interface MsgAddKeychainPartyProtoMsg {
  typeUrl: "/warden.warden.v1beta1.MsgAddKeychainParty";
  value: Uint8Array;
}
export interface MsgAddKeychainPartyAmino {
  creator?: string;
  keychain_addr?: string;
  party?: string;
}
export interface MsgAddKeychainPartyAminoMsg {
  type: "/warden.warden.v1beta1.MsgAddKeychainParty";
  value: MsgAddKeychainPartyAmino;
}
export interface MsgAddKeychainPartySDKType {
  creator: string;
  keychain_addr: string;
  party: string;
}
export interface MsgAddKeychainPartyResponse {}
export interface MsgAddKeychainPartyResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta1.MsgAddKeychainPartyResponse";
  value: Uint8Array;
}
export interface MsgAddKeychainPartyResponseAmino {}
export interface MsgAddKeychainPartyResponseAminoMsg {
  type: "/warden.warden.v1beta1.MsgAddKeychainPartyResponse";
  value: MsgAddKeychainPartyResponseAmino;
}
export interface MsgAddKeychainPartyResponseSDKType {}
export interface MsgUpdateSpace {
  creator: string;
  spaceAddr: string;
  adminIntentId: bigint;
  signIntentId: bigint;
  btl: bigint;
}
export interface MsgUpdateSpaceProtoMsg {
  typeUrl: "/warden.warden.v1beta1.MsgUpdateSpace";
  value: Uint8Array;
}
export interface MsgUpdateSpaceAmino {
  creator?: string;
  space_addr?: string;
  admin_intent_id?: string;
  sign_intent_id?: string;
  btl?: string;
}
export interface MsgUpdateSpaceAminoMsg {
  type: "/warden.warden.v1beta1.MsgUpdateSpace";
  value: MsgUpdateSpaceAmino;
}
export interface MsgUpdateSpaceSDKType {
  creator: string;
  space_addr: string;
  admin_intent_id: bigint;
  sign_intent_id: bigint;
  btl: bigint;
}
export interface MsgUpdateSpaceResponse {}
export interface MsgUpdateSpaceResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta1.MsgUpdateSpaceResponse";
  value: Uint8Array;
}
export interface MsgUpdateSpaceResponseAmino {}
export interface MsgUpdateSpaceResponseAminoMsg {
  type: "/warden.warden.v1beta1.MsgUpdateSpaceResponse";
  value: MsgUpdateSpaceResponseAmino;
}
export interface MsgUpdateSpaceResponseSDKType {}
export interface MsgUpdateKeychain {
  creator: string;
  keychainAddr: string;
  description: string;
  isActive: boolean;
}
export interface MsgUpdateKeychainProtoMsg {
  typeUrl: "/warden.warden.v1beta1.MsgUpdateKeychain";
  value: Uint8Array;
}
export interface MsgUpdateKeychainAmino {
  creator?: string;
  keychain_addr?: string;
  description?: string;
  is_active?: boolean;
}
export interface MsgUpdateKeychainAminoMsg {
  type: "/warden.warden.v1beta1.MsgUpdateKeychain";
  value: MsgUpdateKeychainAmino;
}
export interface MsgUpdateKeychainSDKType {
  creator: string;
  keychain_addr: string;
  description: string;
  is_active: boolean;
}
export interface MsgUpdateKeychainResponse {}
export interface MsgUpdateKeychainResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta1.MsgUpdateKeychainResponse";
  value: Uint8Array;
}
export interface MsgUpdateKeychainResponseAmino {}
export interface MsgUpdateKeychainResponseAminoMsg {
  type: "/warden.warden.v1beta1.MsgUpdateKeychainResponse";
  value: MsgUpdateKeychainResponseAmino;
}
export interface MsgUpdateKeychainResponseSDKType {}
export interface MsgNewKeyRequest {
  creator: string;
  spaceAddr: string;
  keychainAddr: string;
  keyType: KeyType;
  btl: bigint;
}
export interface MsgNewKeyRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta1.MsgNewKeyRequest";
  value: Uint8Array;
}
export interface MsgNewKeyRequestAmino {
  creator?: string;
  space_addr?: string;
  keychain_addr?: string;
  key_type?: KeyType;
  btl?: string;
}
export interface MsgNewKeyRequestAminoMsg {
  type: "/warden.warden.v1beta1.MsgNewKeyRequest";
  value: MsgNewKeyRequestAmino;
}
export interface MsgNewKeyRequestSDKType {
  creator: string;
  space_addr: string;
  keychain_addr: string;
  key_type: KeyType;
  btl: bigint;
}
export interface MsgNewKeyRequestResponse {
  id: bigint;
}
export interface MsgNewKeyRequestResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta1.MsgNewKeyRequestResponse";
  value: Uint8Array;
}
export interface MsgNewKeyRequestResponseAmino {
  id?: string;
}
export interface MsgNewKeyRequestResponseAminoMsg {
  type: "/warden.warden.v1beta1.MsgNewKeyRequestResponse";
  value: MsgNewKeyRequestResponseAmino;
}
export interface MsgNewKeyRequestResponseSDKType {
  id: bigint;
}
export interface MsgNewKey {
  publicKey: Uint8Array;
}
export interface MsgNewKeyProtoMsg {
  typeUrl: "/warden.warden.v1beta1.MsgNewKey";
  value: Uint8Array;
}
export interface MsgNewKeyAmino {
  public_key?: string;
}
export interface MsgNewKeyAminoMsg {
  type: "/warden.warden.v1beta1.MsgNewKey";
  value: MsgNewKeyAmino;
}
export interface MsgNewKeySDKType {
  public_key: Uint8Array;
}
export interface MsgUpdateKeyRequest {
  creator: string;
  requestId: bigint;
  status: KeyRequestStatus;
  key?: MsgNewKey;
  rejectReason?: string;
}
export interface MsgUpdateKeyRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta1.MsgUpdateKeyRequest";
  value: Uint8Array;
}
export interface MsgUpdateKeyRequestAmino {
  creator?: string;
  request_id?: string;
  status?: KeyRequestStatus;
  key?: MsgNewKeyAmino;
  reject_reason?: string;
}
export interface MsgUpdateKeyRequestAminoMsg {
  type: "/warden.warden.v1beta1.MsgUpdateKeyRequest";
  value: MsgUpdateKeyRequestAmino;
}
export interface MsgUpdateKeyRequestSDKType {
  creator: string;
  request_id: bigint;
  status: KeyRequestStatus;
  key?: MsgNewKeySDKType;
  reject_reason?: string;
}
export interface MsgUpdateKeyRequestResponse {}
export interface MsgUpdateKeyRequestResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta1.MsgUpdateKeyRequestResponse";
  value: Uint8Array;
}
export interface MsgUpdateKeyRequestResponseAmino {}
export interface MsgUpdateKeyRequestResponseAminoMsg {
  type: "/warden.warden.v1beta1.MsgUpdateKeyRequestResponse";
  value: MsgUpdateKeyRequestResponseAmino;
}
export interface MsgUpdateKeyRequestResponseSDKType {}
export interface MsgNewSignatureRequest {
  creator: string;
  keyId: bigint;
  dataForSigning: Uint8Array;
  btl: bigint;
}
export interface MsgNewSignatureRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta1.MsgNewSignatureRequest";
  value: Uint8Array;
}
export interface MsgNewSignatureRequestAmino {
  creator?: string;
  key_id?: string;
  data_for_signing?: string;
  btl?: string;
}
export interface MsgNewSignatureRequestAminoMsg {
  type: "/warden.warden.v1beta1.MsgNewSignatureRequest";
  value: MsgNewSignatureRequestAmino;
}
export interface MsgNewSignatureRequestSDKType {
  creator: string;
  key_id: bigint;
  data_for_signing: Uint8Array;
  btl: bigint;
}
export interface MsgNewSignatureRequestResponse {
  id: bigint;
}
export interface MsgNewSignatureRequestResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta1.MsgNewSignatureRequestResponse";
  value: Uint8Array;
}
export interface MsgNewSignatureRequestResponseAmino {
  id?: string;
}
export interface MsgNewSignatureRequestResponseAminoMsg {
  type: "/warden.warden.v1beta1.MsgNewSignatureRequestResponse";
  value: MsgNewSignatureRequestResponseAmino;
}
export interface MsgNewSignatureRequestResponseSDKType {
  id: bigint;
}
export interface MsgSignedData {
  signedData: Uint8Array;
}
export interface MsgSignedDataProtoMsg {
  typeUrl: "/warden.warden.v1beta1.MsgSignedData";
  value: Uint8Array;
}
export interface MsgSignedDataAmino {
  signed_data?: string;
}
export interface MsgSignedDataAminoMsg {
  type: "/warden.warden.v1beta1.MsgSignedData";
  value: MsgSignedDataAmino;
}
export interface MsgSignedDataSDKType {
  signed_data: Uint8Array;
}
export interface MsgFulfilSignatureRequest {
  creator: string;
  requestId: bigint;
  status: SignRequestStatus;
  payload?: MsgSignedData;
  rejectReason?: string;
}
export interface MsgFulfilSignatureRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta1.MsgFulfilSignatureRequest";
  value: Uint8Array;
}
export interface MsgFulfilSignatureRequestAmino {
  creator?: string;
  request_id?: string;
  status?: SignRequestStatus;
  payload?: MsgSignedDataAmino;
  reject_reason?: string;
}
export interface MsgFulfilSignatureRequestAminoMsg {
  type: "/warden.warden.v1beta1.MsgFulfilSignatureRequest";
  value: MsgFulfilSignatureRequestAmino;
}
export interface MsgFulfilSignatureRequestSDKType {
  creator: string;
  request_id: bigint;
  status: SignRequestStatus;
  payload?: MsgSignedDataSDKType;
  reject_reason?: string;
}
export interface MsgFulfilSignatureRequestResponse {}
export interface MsgFulfilSignatureRequestResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta1.MsgFulfilSignatureRequestResponse";
  value: Uint8Array;
}
export interface MsgFulfilSignatureRequestResponseAmino {}
export interface MsgFulfilSignatureRequestResponseAminoMsg {
  type: "/warden.warden.v1beta1.MsgFulfilSignatureRequestResponse";
  value: MsgFulfilSignatureRequestResponseAmino;
}
export interface MsgFulfilSignatureRequestResponseSDKType {}
export interface MsgNewSignTransactionRequest {
  creator: string;
  keyId: bigint;
  walletType: WalletType;
  unsignedTransaction: Uint8Array;
  btl: bigint;
  /** Additional metadata required when parsing the unsigned transaction. */
  metadata?: Any;
}
export interface MsgNewSignTransactionRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta1.MsgNewSignTransactionRequest";
  value: Uint8Array;
}
export interface MsgNewSignTransactionRequestAmino {
  creator?: string;
  key_id?: string;
  wallet_type?: WalletType;
  unsigned_transaction?: string;
  btl?: string;
  /** Additional metadata required when parsing the unsigned transaction. */
  metadata?: AnyAmino;
}
export interface MsgNewSignTransactionRequestAminoMsg {
  type: "/warden.warden.v1beta1.MsgNewSignTransactionRequest";
  value: MsgNewSignTransactionRequestAmino;
}
export interface MsgNewSignTransactionRequestSDKType {
  creator: string;
  key_id: bigint;
  wallet_type: WalletType;
  unsigned_transaction: Uint8Array;
  btl: bigint;
  metadata?: AnySDKType;
}
export interface MsgNewSignTransactionRequestResponse {
  id: bigint;
  signatureRequestId: bigint;
}
export interface MsgNewSignTransactionRequestResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta1.MsgNewSignTransactionRequestResponse";
  value: Uint8Array;
}
export interface MsgNewSignTransactionRequestResponseAmino {
  id?: string;
  signature_request_id?: string;
}
export interface MsgNewSignTransactionRequestResponseAminoMsg {
  type: "/warden.warden.v1beta1.MsgNewSignTransactionRequestResponse";
  value: MsgNewSignTransactionRequestResponseAmino;
}
export interface MsgNewSignTransactionRequestResponseSDKType {
  id: bigint;
  signature_request_id: bigint;
}
export interface MetadataEthereum {
  chainId: bigint;
}
export interface MetadataEthereumProtoMsg {
  typeUrl: "/warden.warden.v1beta1.MetadataEthereum";
  value: Uint8Array;
}
export interface MetadataEthereumAmino {
  chain_id?: string;
}
export interface MetadataEthereumAminoMsg {
  type: "/warden.warden.v1beta1.MetadataEthereum";
  value: MetadataEthereumAmino;
}
export interface MetadataEthereumSDKType {
  chain_id: bigint;
}
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: Params.fromPartial({})
  };
}
export const MsgUpdateParams = {
  typeUrl: "/warden.warden.v1beta1.MsgUpdateParams",
  encode(message: MsgUpdateParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgUpdateParams {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined
    };
  },
  toJSON(message: MsgUpdateParams): unknown {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },
  fromPartial(object: Partial<MsgUpdateParams>): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateParamsAmino): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: MsgUpdateParams): MsgUpdateParamsAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.params = message.params ? Params.toAmino(message.params) : Params.toAmino(Params.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsAminoMsg): MsgUpdateParams {
    return MsgUpdateParams.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateParams): MsgUpdateParamsAminoMsg {
    return {
      type: "warden/x/warden/MsgUpdateParams",
      value: MsgUpdateParams.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgUpdateParamsProtoMsg): MsgUpdateParams {
    return MsgUpdateParams.decode(message.value);
  },
  toProto(message: MsgUpdateParams): Uint8Array {
    return MsgUpdateParams.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParams): MsgUpdateParamsProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/warden.warden.v1beta1.MsgUpdateParamsResponse",
  encode(_: MsgUpdateParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
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
  fromPartial(_: Partial<MsgUpdateParamsResponse>): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  fromAmino(_: MsgUpdateParamsResponseAmino): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  toAmino(_: MsgUpdateParamsResponse): MsgUpdateParamsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsResponseAminoMsg): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateParamsResponseProtoMsg): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.decode(message.value);
  },
  toProto(message: MsgUpdateParamsResponse): Uint8Array {
    return MsgUpdateParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParamsResponse): MsgUpdateParamsResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgNewSpace(): MsgNewSpace {
  return {
    creator: "",
    adminIntentId: BigInt(0),
    signIntentId: BigInt(0),
    additionalOwners: []
  };
}
export const MsgNewSpace = {
  typeUrl: "/warden.warden.v1beta1.MsgNewSpace",
  encode(message: MsgNewSpace, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.adminIntentId !== BigInt(0)) {
      writer.uint32(16).uint64(message.adminIntentId);
    }
    if (message.signIntentId !== BigInt(0)) {
      writer.uint32(24).uint64(message.signIntentId);
    }
    for (const v of message.additionalOwners) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgNewSpace {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgNewSpace();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.adminIntentId = reader.uint64();
          break;
        case 3:
          message.signIntentId = reader.uint64();
          break;
        case 4:
          message.additionalOwners.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgNewSpace {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      adminIntentId: isSet(object.adminIntentId) ? BigInt(object.adminIntentId.toString()) : BigInt(0),
      signIntentId: isSet(object.signIntentId) ? BigInt(object.signIntentId.toString()) : BigInt(0),
      additionalOwners: Array.isArray(object?.additionalOwners) ? object.additionalOwners.map((e: any) => String(e)) : []
    };
  },
  toJSON(message: MsgNewSpace): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.adminIntentId !== undefined && (obj.adminIntentId = (message.adminIntentId || BigInt(0)).toString());
    message.signIntentId !== undefined && (obj.signIntentId = (message.signIntentId || BigInt(0)).toString());
    if (message.additionalOwners) {
      obj.additionalOwners = message.additionalOwners.map(e => e);
    } else {
      obj.additionalOwners = [];
    }
    return obj;
  },
  fromPartial(object: Partial<MsgNewSpace>): MsgNewSpace {
    const message = createBaseMsgNewSpace();
    message.creator = object.creator ?? "";
    message.adminIntentId = object.adminIntentId !== undefined && object.adminIntentId !== null ? BigInt(object.adminIntentId.toString()) : BigInt(0);
    message.signIntentId = object.signIntentId !== undefined && object.signIntentId !== null ? BigInt(object.signIntentId.toString()) : BigInt(0);
    message.additionalOwners = object.additionalOwners?.map(e => e) || [];
    return message;
  },
  fromAmino(object: MsgNewSpaceAmino): MsgNewSpace {
    const message = createBaseMsgNewSpace();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.admin_intent_id !== undefined && object.admin_intent_id !== null) {
      message.adminIntentId = BigInt(object.admin_intent_id);
    }
    if (object.sign_intent_id !== undefined && object.sign_intent_id !== null) {
      message.signIntentId = BigInt(object.sign_intent_id);
    }
    message.additionalOwners = object.additional_owners?.map(e => e) || [];
    return message;
  },
  toAmino(message: MsgNewSpace): MsgNewSpaceAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.admin_intent_id = message.adminIntentId !== BigInt(0) ? message.adminIntentId.toString() : undefined;
    obj.sign_intent_id = message.signIntentId !== BigInt(0) ? message.signIntentId.toString() : undefined;
    if (message.additionalOwners) {
      obj.additional_owners = message.additionalOwners.map(e => e);
    } else {
      obj.additional_owners = message.additionalOwners;
    }
    return obj;
  },
  fromAminoMsg(object: MsgNewSpaceAminoMsg): MsgNewSpace {
    return MsgNewSpace.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgNewSpaceProtoMsg): MsgNewSpace {
    return MsgNewSpace.decode(message.value);
  },
  toProto(message: MsgNewSpace): Uint8Array {
    return MsgNewSpace.encode(message).finish();
  },
  toProtoMsg(message: MsgNewSpace): MsgNewSpaceProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.MsgNewSpace",
      value: MsgNewSpace.encode(message).finish()
    };
  }
};
function createBaseMsgNewSpaceResponse(): MsgNewSpaceResponse {
  return {
    address: ""
  };
}
export const MsgNewSpaceResponse = {
  typeUrl: "/warden.warden.v1beta1.MsgNewSpaceResponse",
  encode(message: MsgNewSpaceResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgNewSpaceResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgNewSpaceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgNewSpaceResponse {
    return {
      address: isSet(object.address) ? String(object.address) : ""
    };
  },
  toJSON(message: MsgNewSpaceResponse): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },
  fromPartial(object: Partial<MsgNewSpaceResponse>): MsgNewSpaceResponse {
    const message = createBaseMsgNewSpaceResponse();
    message.address = object.address ?? "";
    return message;
  },
  fromAmino(object: MsgNewSpaceResponseAmino): MsgNewSpaceResponse {
    const message = createBaseMsgNewSpaceResponse();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    return message;
  },
  toAmino(message: MsgNewSpaceResponse): MsgNewSpaceResponseAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    return obj;
  },
  fromAminoMsg(object: MsgNewSpaceResponseAminoMsg): MsgNewSpaceResponse {
    return MsgNewSpaceResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgNewSpaceResponseProtoMsg): MsgNewSpaceResponse {
    return MsgNewSpaceResponse.decode(message.value);
  },
  toProto(message: MsgNewSpaceResponse): Uint8Array {
    return MsgNewSpaceResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgNewSpaceResponse): MsgNewSpaceResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.MsgNewSpaceResponse",
      value: MsgNewSpaceResponse.encode(message).finish()
    };
  }
};
function createBaseMsgAddSpaceOwner(): MsgAddSpaceOwner {
  return {
    creator: "",
    spaceAddr: "",
    newOwner: "",
    btl: BigInt(0)
  };
}
export const MsgAddSpaceOwner = {
  typeUrl: "/warden.warden.v1beta1.MsgAddSpaceOwner",
  encode(message: MsgAddSpaceOwner, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.spaceAddr !== "") {
      writer.uint32(18).string(message.spaceAddr);
    }
    if (message.newOwner !== "") {
      writer.uint32(26).string(message.newOwner);
    }
    if (message.btl !== BigInt(0)) {
      writer.uint32(32).uint64(message.btl);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgAddSpaceOwner {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddSpaceOwner();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.spaceAddr = reader.string();
          break;
        case 3:
          message.newOwner = reader.string();
          break;
        case 4:
          message.btl = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgAddSpaceOwner {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      spaceAddr: isSet(object.spaceAddr) ? String(object.spaceAddr) : "",
      newOwner: isSet(object.newOwner) ? String(object.newOwner) : "",
      btl: isSet(object.btl) ? BigInt(object.btl.toString()) : BigInt(0)
    };
  },
  toJSON(message: MsgAddSpaceOwner): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.spaceAddr !== undefined && (obj.spaceAddr = message.spaceAddr);
    message.newOwner !== undefined && (obj.newOwner = message.newOwner);
    message.btl !== undefined && (obj.btl = (message.btl || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<MsgAddSpaceOwner>): MsgAddSpaceOwner {
    const message = createBaseMsgAddSpaceOwner();
    message.creator = object.creator ?? "";
    message.spaceAddr = object.spaceAddr ?? "";
    message.newOwner = object.newOwner ?? "";
    message.btl = object.btl !== undefined && object.btl !== null ? BigInt(object.btl.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgAddSpaceOwnerAmino): MsgAddSpaceOwner {
    const message = createBaseMsgAddSpaceOwner();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.space_addr !== undefined && object.space_addr !== null) {
      message.spaceAddr = object.space_addr;
    }
    if (object.new_owner !== undefined && object.new_owner !== null) {
      message.newOwner = object.new_owner;
    }
    if (object.btl !== undefined && object.btl !== null) {
      message.btl = BigInt(object.btl);
    }
    return message;
  },
  toAmino(message: MsgAddSpaceOwner): MsgAddSpaceOwnerAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.space_addr = message.spaceAddr === "" ? undefined : message.spaceAddr;
    obj.new_owner = message.newOwner === "" ? undefined : message.newOwner;
    obj.btl = message.btl !== BigInt(0) ? message.btl.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgAddSpaceOwnerAminoMsg): MsgAddSpaceOwner {
    return MsgAddSpaceOwner.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAddSpaceOwnerProtoMsg): MsgAddSpaceOwner {
    return MsgAddSpaceOwner.decode(message.value);
  },
  toProto(message: MsgAddSpaceOwner): Uint8Array {
    return MsgAddSpaceOwner.encode(message).finish();
  },
  toProtoMsg(message: MsgAddSpaceOwner): MsgAddSpaceOwnerProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.MsgAddSpaceOwner",
      value: MsgAddSpaceOwner.encode(message).finish()
    };
  }
};
function createBaseMsgAddSpaceOwnerResponse(): MsgAddSpaceOwnerResponse {
  return {};
}
export const MsgAddSpaceOwnerResponse = {
  typeUrl: "/warden.warden.v1beta1.MsgAddSpaceOwnerResponse",
  encode(_: MsgAddSpaceOwnerResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgAddSpaceOwnerResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddSpaceOwnerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
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
  fromPartial(_: Partial<MsgAddSpaceOwnerResponse>): MsgAddSpaceOwnerResponse {
    const message = createBaseMsgAddSpaceOwnerResponse();
    return message;
  },
  fromAmino(_: MsgAddSpaceOwnerResponseAmino): MsgAddSpaceOwnerResponse {
    const message = createBaseMsgAddSpaceOwnerResponse();
    return message;
  },
  toAmino(_: MsgAddSpaceOwnerResponse): MsgAddSpaceOwnerResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgAddSpaceOwnerResponseAminoMsg): MsgAddSpaceOwnerResponse {
    return MsgAddSpaceOwnerResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAddSpaceOwnerResponseProtoMsg): MsgAddSpaceOwnerResponse {
    return MsgAddSpaceOwnerResponse.decode(message.value);
  },
  toProto(message: MsgAddSpaceOwnerResponse): Uint8Array {
    return MsgAddSpaceOwnerResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgAddSpaceOwnerResponse): MsgAddSpaceOwnerResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.MsgAddSpaceOwnerResponse",
      value: MsgAddSpaceOwnerResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRemoveSpaceOwner(): MsgRemoveSpaceOwner {
  return {
    creator: "",
    spaceAddr: "",
    owner: "",
    btl: BigInt(0)
  };
}
export const MsgRemoveSpaceOwner = {
  typeUrl: "/warden.warden.v1beta1.MsgRemoveSpaceOwner",
  encode(message: MsgRemoveSpaceOwner, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.spaceAddr !== "") {
      writer.uint32(18).string(message.spaceAddr);
    }
    if (message.owner !== "") {
      writer.uint32(26).string(message.owner);
    }
    if (message.btl !== BigInt(0)) {
      writer.uint32(32).uint64(message.btl);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgRemoveSpaceOwner {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveSpaceOwner();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.spaceAddr = reader.string();
          break;
        case 3:
          message.owner = reader.string();
          break;
        case 4:
          message.btl = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgRemoveSpaceOwner {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      spaceAddr: isSet(object.spaceAddr) ? String(object.spaceAddr) : "",
      owner: isSet(object.owner) ? String(object.owner) : "",
      btl: isSet(object.btl) ? BigInt(object.btl.toString()) : BigInt(0)
    };
  },
  toJSON(message: MsgRemoveSpaceOwner): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.spaceAddr !== undefined && (obj.spaceAddr = message.spaceAddr);
    message.owner !== undefined && (obj.owner = message.owner);
    message.btl !== undefined && (obj.btl = (message.btl || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<MsgRemoveSpaceOwner>): MsgRemoveSpaceOwner {
    const message = createBaseMsgRemoveSpaceOwner();
    message.creator = object.creator ?? "";
    message.spaceAddr = object.spaceAddr ?? "";
    message.owner = object.owner ?? "";
    message.btl = object.btl !== undefined && object.btl !== null ? BigInt(object.btl.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgRemoveSpaceOwnerAmino): MsgRemoveSpaceOwner {
    const message = createBaseMsgRemoveSpaceOwner();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.space_addr !== undefined && object.space_addr !== null) {
      message.spaceAddr = object.space_addr;
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    }
    if (object.btl !== undefined && object.btl !== null) {
      message.btl = BigInt(object.btl);
    }
    return message;
  },
  toAmino(message: MsgRemoveSpaceOwner): MsgRemoveSpaceOwnerAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.space_addr = message.spaceAddr === "" ? undefined : message.spaceAddr;
    obj.owner = message.owner === "" ? undefined : message.owner;
    obj.btl = message.btl !== BigInt(0) ? message.btl.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgRemoveSpaceOwnerAminoMsg): MsgRemoveSpaceOwner {
    return MsgRemoveSpaceOwner.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRemoveSpaceOwnerProtoMsg): MsgRemoveSpaceOwner {
    return MsgRemoveSpaceOwner.decode(message.value);
  },
  toProto(message: MsgRemoveSpaceOwner): Uint8Array {
    return MsgRemoveSpaceOwner.encode(message).finish();
  },
  toProtoMsg(message: MsgRemoveSpaceOwner): MsgRemoveSpaceOwnerProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.MsgRemoveSpaceOwner",
      value: MsgRemoveSpaceOwner.encode(message).finish()
    };
  }
};
function createBaseMsgRemoveSpaceOwnerResponse(): MsgRemoveSpaceOwnerResponse {
  return {};
}
export const MsgRemoveSpaceOwnerResponse = {
  typeUrl: "/warden.warden.v1beta1.MsgRemoveSpaceOwnerResponse",
  encode(_: MsgRemoveSpaceOwnerResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgRemoveSpaceOwnerResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveSpaceOwnerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
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
  fromPartial(_: Partial<MsgRemoveSpaceOwnerResponse>): MsgRemoveSpaceOwnerResponse {
    const message = createBaseMsgRemoveSpaceOwnerResponse();
    return message;
  },
  fromAmino(_: MsgRemoveSpaceOwnerResponseAmino): MsgRemoveSpaceOwnerResponse {
    const message = createBaseMsgRemoveSpaceOwnerResponse();
    return message;
  },
  toAmino(_: MsgRemoveSpaceOwnerResponse): MsgRemoveSpaceOwnerResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRemoveSpaceOwnerResponseAminoMsg): MsgRemoveSpaceOwnerResponse {
    return MsgRemoveSpaceOwnerResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRemoveSpaceOwnerResponseProtoMsg): MsgRemoveSpaceOwnerResponse {
    return MsgRemoveSpaceOwnerResponse.decode(message.value);
  },
  toProto(message: MsgRemoveSpaceOwnerResponse): Uint8Array {
    return MsgRemoveSpaceOwnerResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRemoveSpaceOwnerResponse): MsgRemoveSpaceOwnerResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.MsgRemoveSpaceOwnerResponse",
      value: MsgRemoveSpaceOwnerResponse.encode(message).finish()
    };
  }
};
function createBaseMsgNewKeychain(): MsgNewKeychain {
  return {
    creator: "",
    description: "",
    adminIntentId: BigInt(0),
    keychainFees: undefined
  };
}
export const MsgNewKeychain = {
  typeUrl: "/warden.warden.v1beta1.MsgNewKeychain",
  encode(message: MsgNewKeychain, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.adminIntentId !== BigInt(0)) {
      writer.uint32(24).uint64(message.adminIntentId);
    }
    if (message.keychainFees !== undefined) {
      KeychainFees.encode(message.keychainFees, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgNewKeychain {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgNewKeychain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.adminIntentId = reader.uint64();
          break;
        case 4:
          message.keychainFees = KeychainFees.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgNewKeychain {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      description: isSet(object.description) ? String(object.description) : "",
      adminIntentId: isSet(object.adminIntentId) ? BigInt(object.adminIntentId.toString()) : BigInt(0),
      keychainFees: isSet(object.keychainFees) ? KeychainFees.fromJSON(object.keychainFees) : undefined
    };
  },
  toJSON(message: MsgNewKeychain): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.description !== undefined && (obj.description = message.description);
    message.adminIntentId !== undefined && (obj.adminIntentId = (message.adminIntentId || BigInt(0)).toString());
    message.keychainFees !== undefined && (obj.keychainFees = message.keychainFees ? KeychainFees.toJSON(message.keychainFees) : undefined);
    return obj;
  },
  fromPartial(object: Partial<MsgNewKeychain>): MsgNewKeychain {
    const message = createBaseMsgNewKeychain();
    message.creator = object.creator ?? "";
    message.description = object.description ?? "";
    message.adminIntentId = object.adminIntentId !== undefined && object.adminIntentId !== null ? BigInt(object.adminIntentId.toString()) : BigInt(0);
    message.keychainFees = object.keychainFees !== undefined && object.keychainFees !== null ? KeychainFees.fromPartial(object.keychainFees) : undefined;
    return message;
  },
  fromAmino(object: MsgNewKeychainAmino): MsgNewKeychain {
    const message = createBaseMsgNewKeychain();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.admin_intent_id !== undefined && object.admin_intent_id !== null) {
      message.adminIntentId = BigInt(object.admin_intent_id);
    }
    if (object.keychain_fees !== undefined && object.keychain_fees !== null) {
      message.keychainFees = KeychainFees.fromAmino(object.keychain_fees);
    }
    return message;
  },
  toAmino(message: MsgNewKeychain): MsgNewKeychainAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.description = message.description === "" ? undefined : message.description;
    obj.admin_intent_id = message.adminIntentId !== BigInt(0) ? message.adminIntentId.toString() : undefined;
    obj.keychain_fees = message.keychainFees ? KeychainFees.toAmino(message.keychainFees) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgNewKeychainAminoMsg): MsgNewKeychain {
    return MsgNewKeychain.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgNewKeychainProtoMsg): MsgNewKeychain {
    return MsgNewKeychain.decode(message.value);
  },
  toProto(message: MsgNewKeychain): Uint8Array {
    return MsgNewKeychain.encode(message).finish();
  },
  toProtoMsg(message: MsgNewKeychain): MsgNewKeychainProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.MsgNewKeychain",
      value: MsgNewKeychain.encode(message).finish()
    };
  }
};
function createBaseMsgNewKeychainResponse(): MsgNewKeychainResponse {
  return {
    address: ""
  };
}
export const MsgNewKeychainResponse = {
  typeUrl: "/warden.warden.v1beta1.MsgNewKeychainResponse",
  encode(message: MsgNewKeychainResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgNewKeychainResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgNewKeychainResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgNewKeychainResponse {
    return {
      address: isSet(object.address) ? String(object.address) : ""
    };
  },
  toJSON(message: MsgNewKeychainResponse): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },
  fromPartial(object: Partial<MsgNewKeychainResponse>): MsgNewKeychainResponse {
    const message = createBaseMsgNewKeychainResponse();
    message.address = object.address ?? "";
    return message;
  },
  fromAmino(object: MsgNewKeychainResponseAmino): MsgNewKeychainResponse {
    const message = createBaseMsgNewKeychainResponse();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    return message;
  },
  toAmino(message: MsgNewKeychainResponse): MsgNewKeychainResponseAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    return obj;
  },
  fromAminoMsg(object: MsgNewKeychainResponseAminoMsg): MsgNewKeychainResponse {
    return MsgNewKeychainResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgNewKeychainResponseProtoMsg): MsgNewKeychainResponse {
    return MsgNewKeychainResponse.decode(message.value);
  },
  toProto(message: MsgNewKeychainResponse): Uint8Array {
    return MsgNewKeychainResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgNewKeychainResponse): MsgNewKeychainResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.MsgNewKeychainResponse",
      value: MsgNewKeychainResponse.encode(message).finish()
    };
  }
};
function createBaseMsgAddKeychainParty(): MsgAddKeychainParty {
  return {
    creator: "",
    keychainAddr: "",
    party: ""
  };
}
export const MsgAddKeychainParty = {
  typeUrl: "/warden.warden.v1beta1.MsgAddKeychainParty",
  encode(message: MsgAddKeychainParty, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.keychainAddr !== "") {
      writer.uint32(18).string(message.keychainAddr);
    }
    if (message.party !== "") {
      writer.uint32(26).string(message.party);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgAddKeychainParty {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddKeychainParty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.keychainAddr = reader.string();
          break;
        case 3:
          message.party = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgAddKeychainParty {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      keychainAddr: isSet(object.keychainAddr) ? String(object.keychainAddr) : "",
      party: isSet(object.party) ? String(object.party) : ""
    };
  },
  toJSON(message: MsgAddKeychainParty): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.keychainAddr !== undefined && (obj.keychainAddr = message.keychainAddr);
    message.party !== undefined && (obj.party = message.party);
    return obj;
  },
  fromPartial(object: Partial<MsgAddKeychainParty>): MsgAddKeychainParty {
    const message = createBaseMsgAddKeychainParty();
    message.creator = object.creator ?? "";
    message.keychainAddr = object.keychainAddr ?? "";
    message.party = object.party ?? "";
    return message;
  },
  fromAmino(object: MsgAddKeychainPartyAmino): MsgAddKeychainParty {
    const message = createBaseMsgAddKeychainParty();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.keychain_addr !== undefined && object.keychain_addr !== null) {
      message.keychainAddr = object.keychain_addr;
    }
    if (object.party !== undefined && object.party !== null) {
      message.party = object.party;
    }
    return message;
  },
  toAmino(message: MsgAddKeychainParty): MsgAddKeychainPartyAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.keychain_addr = message.keychainAddr === "" ? undefined : message.keychainAddr;
    obj.party = message.party === "" ? undefined : message.party;
    return obj;
  },
  fromAminoMsg(object: MsgAddKeychainPartyAminoMsg): MsgAddKeychainParty {
    return MsgAddKeychainParty.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAddKeychainPartyProtoMsg): MsgAddKeychainParty {
    return MsgAddKeychainParty.decode(message.value);
  },
  toProto(message: MsgAddKeychainParty): Uint8Array {
    return MsgAddKeychainParty.encode(message).finish();
  },
  toProtoMsg(message: MsgAddKeychainParty): MsgAddKeychainPartyProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.MsgAddKeychainParty",
      value: MsgAddKeychainParty.encode(message).finish()
    };
  }
};
function createBaseMsgAddKeychainPartyResponse(): MsgAddKeychainPartyResponse {
  return {};
}
export const MsgAddKeychainPartyResponse = {
  typeUrl: "/warden.warden.v1beta1.MsgAddKeychainPartyResponse",
  encode(_: MsgAddKeychainPartyResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgAddKeychainPartyResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddKeychainPartyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
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
  fromPartial(_: Partial<MsgAddKeychainPartyResponse>): MsgAddKeychainPartyResponse {
    const message = createBaseMsgAddKeychainPartyResponse();
    return message;
  },
  fromAmino(_: MsgAddKeychainPartyResponseAmino): MsgAddKeychainPartyResponse {
    const message = createBaseMsgAddKeychainPartyResponse();
    return message;
  },
  toAmino(_: MsgAddKeychainPartyResponse): MsgAddKeychainPartyResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgAddKeychainPartyResponseAminoMsg): MsgAddKeychainPartyResponse {
    return MsgAddKeychainPartyResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAddKeychainPartyResponseProtoMsg): MsgAddKeychainPartyResponse {
    return MsgAddKeychainPartyResponse.decode(message.value);
  },
  toProto(message: MsgAddKeychainPartyResponse): Uint8Array {
    return MsgAddKeychainPartyResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgAddKeychainPartyResponse): MsgAddKeychainPartyResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.MsgAddKeychainPartyResponse",
      value: MsgAddKeychainPartyResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateSpace(): MsgUpdateSpace {
  return {
    creator: "",
    spaceAddr: "",
    adminIntentId: BigInt(0),
    signIntentId: BigInt(0),
    btl: BigInt(0)
  };
}
export const MsgUpdateSpace = {
  typeUrl: "/warden.warden.v1beta1.MsgUpdateSpace",
  encode(message: MsgUpdateSpace, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.spaceAddr !== "") {
      writer.uint32(18).string(message.spaceAddr);
    }
    if (message.adminIntentId !== BigInt(0)) {
      writer.uint32(24).uint64(message.adminIntentId);
    }
    if (message.signIntentId !== BigInt(0)) {
      writer.uint32(32).uint64(message.signIntentId);
    }
    if (message.btl !== BigInt(0)) {
      writer.uint32(40).uint64(message.btl);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateSpace {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateSpace();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.spaceAddr = reader.string();
          break;
        case 3:
          message.adminIntentId = reader.uint64();
          break;
        case 4:
          message.signIntentId = reader.uint64();
          break;
        case 5:
          message.btl = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgUpdateSpace {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      spaceAddr: isSet(object.spaceAddr) ? String(object.spaceAddr) : "",
      adminIntentId: isSet(object.adminIntentId) ? BigInt(object.adminIntentId.toString()) : BigInt(0),
      signIntentId: isSet(object.signIntentId) ? BigInt(object.signIntentId.toString()) : BigInt(0),
      btl: isSet(object.btl) ? BigInt(object.btl.toString()) : BigInt(0)
    };
  },
  toJSON(message: MsgUpdateSpace): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.spaceAddr !== undefined && (obj.spaceAddr = message.spaceAddr);
    message.adminIntentId !== undefined && (obj.adminIntentId = (message.adminIntentId || BigInt(0)).toString());
    message.signIntentId !== undefined && (obj.signIntentId = (message.signIntentId || BigInt(0)).toString());
    message.btl !== undefined && (obj.btl = (message.btl || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<MsgUpdateSpace>): MsgUpdateSpace {
    const message = createBaseMsgUpdateSpace();
    message.creator = object.creator ?? "";
    message.spaceAddr = object.spaceAddr ?? "";
    message.adminIntentId = object.adminIntentId !== undefined && object.adminIntentId !== null ? BigInt(object.adminIntentId.toString()) : BigInt(0);
    message.signIntentId = object.signIntentId !== undefined && object.signIntentId !== null ? BigInt(object.signIntentId.toString()) : BigInt(0);
    message.btl = object.btl !== undefined && object.btl !== null ? BigInt(object.btl.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgUpdateSpaceAmino): MsgUpdateSpace {
    const message = createBaseMsgUpdateSpace();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.space_addr !== undefined && object.space_addr !== null) {
      message.spaceAddr = object.space_addr;
    }
    if (object.admin_intent_id !== undefined && object.admin_intent_id !== null) {
      message.adminIntentId = BigInt(object.admin_intent_id);
    }
    if (object.sign_intent_id !== undefined && object.sign_intent_id !== null) {
      message.signIntentId = BigInt(object.sign_intent_id);
    }
    if (object.btl !== undefined && object.btl !== null) {
      message.btl = BigInt(object.btl);
    }
    return message;
  },
  toAmino(message: MsgUpdateSpace): MsgUpdateSpaceAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.space_addr = message.spaceAddr === "" ? undefined : message.spaceAddr;
    obj.admin_intent_id = message.adminIntentId !== BigInt(0) ? message.adminIntentId.toString() : undefined;
    obj.sign_intent_id = message.signIntentId !== BigInt(0) ? message.signIntentId.toString() : undefined;
    obj.btl = message.btl !== BigInt(0) ? message.btl.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateSpaceAminoMsg): MsgUpdateSpace {
    return MsgUpdateSpace.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateSpaceProtoMsg): MsgUpdateSpace {
    return MsgUpdateSpace.decode(message.value);
  },
  toProto(message: MsgUpdateSpace): Uint8Array {
    return MsgUpdateSpace.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateSpace): MsgUpdateSpaceProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.MsgUpdateSpace",
      value: MsgUpdateSpace.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateSpaceResponse(): MsgUpdateSpaceResponse {
  return {};
}
export const MsgUpdateSpaceResponse = {
  typeUrl: "/warden.warden.v1beta1.MsgUpdateSpaceResponse",
  encode(_: MsgUpdateSpaceResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateSpaceResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateSpaceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
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
  fromPartial(_: Partial<MsgUpdateSpaceResponse>): MsgUpdateSpaceResponse {
    const message = createBaseMsgUpdateSpaceResponse();
    return message;
  },
  fromAmino(_: MsgUpdateSpaceResponseAmino): MsgUpdateSpaceResponse {
    const message = createBaseMsgUpdateSpaceResponse();
    return message;
  },
  toAmino(_: MsgUpdateSpaceResponse): MsgUpdateSpaceResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateSpaceResponseAminoMsg): MsgUpdateSpaceResponse {
    return MsgUpdateSpaceResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateSpaceResponseProtoMsg): MsgUpdateSpaceResponse {
    return MsgUpdateSpaceResponse.decode(message.value);
  },
  toProto(message: MsgUpdateSpaceResponse): Uint8Array {
    return MsgUpdateSpaceResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateSpaceResponse): MsgUpdateSpaceResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.MsgUpdateSpaceResponse",
      value: MsgUpdateSpaceResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateKeychain(): MsgUpdateKeychain {
  return {
    creator: "",
    keychainAddr: "",
    description: "",
    isActive: false
  };
}
export const MsgUpdateKeychain = {
  typeUrl: "/warden.warden.v1beta1.MsgUpdateKeychain",
  encode(message: MsgUpdateKeychain, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.keychainAddr !== "") {
      writer.uint32(18).string(message.keychainAddr);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.isActive === true) {
      writer.uint32(32).bool(message.isActive);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateKeychain {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateKeychain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.keychainAddr = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        case 4:
          message.isActive = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgUpdateKeychain {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      keychainAddr: isSet(object.keychainAddr) ? String(object.keychainAddr) : "",
      description: isSet(object.description) ? String(object.description) : "",
      isActive: isSet(object.isActive) ? Boolean(object.isActive) : false
    };
  },
  toJSON(message: MsgUpdateKeychain): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.keychainAddr !== undefined && (obj.keychainAddr = message.keychainAddr);
    message.description !== undefined && (obj.description = message.description);
    message.isActive !== undefined && (obj.isActive = message.isActive);
    return obj;
  },
  fromPartial(object: Partial<MsgUpdateKeychain>): MsgUpdateKeychain {
    const message = createBaseMsgUpdateKeychain();
    message.creator = object.creator ?? "";
    message.keychainAddr = object.keychainAddr ?? "";
    message.description = object.description ?? "";
    message.isActive = object.isActive ?? false;
    return message;
  },
  fromAmino(object: MsgUpdateKeychainAmino): MsgUpdateKeychain {
    const message = createBaseMsgUpdateKeychain();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.keychain_addr !== undefined && object.keychain_addr !== null) {
      message.keychainAddr = object.keychain_addr;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.is_active !== undefined && object.is_active !== null) {
      message.isActive = object.is_active;
    }
    return message;
  },
  toAmino(message: MsgUpdateKeychain): MsgUpdateKeychainAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.keychain_addr = message.keychainAddr === "" ? undefined : message.keychainAddr;
    obj.description = message.description === "" ? undefined : message.description;
    obj.is_active = message.isActive === false ? undefined : message.isActive;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateKeychainAminoMsg): MsgUpdateKeychain {
    return MsgUpdateKeychain.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateKeychainProtoMsg): MsgUpdateKeychain {
    return MsgUpdateKeychain.decode(message.value);
  },
  toProto(message: MsgUpdateKeychain): Uint8Array {
    return MsgUpdateKeychain.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateKeychain): MsgUpdateKeychainProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.MsgUpdateKeychain",
      value: MsgUpdateKeychain.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateKeychainResponse(): MsgUpdateKeychainResponse {
  return {};
}
export const MsgUpdateKeychainResponse = {
  typeUrl: "/warden.warden.v1beta1.MsgUpdateKeychainResponse",
  encode(_: MsgUpdateKeychainResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateKeychainResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateKeychainResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
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
  fromPartial(_: Partial<MsgUpdateKeychainResponse>): MsgUpdateKeychainResponse {
    const message = createBaseMsgUpdateKeychainResponse();
    return message;
  },
  fromAmino(_: MsgUpdateKeychainResponseAmino): MsgUpdateKeychainResponse {
    const message = createBaseMsgUpdateKeychainResponse();
    return message;
  },
  toAmino(_: MsgUpdateKeychainResponse): MsgUpdateKeychainResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateKeychainResponseAminoMsg): MsgUpdateKeychainResponse {
    return MsgUpdateKeychainResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateKeychainResponseProtoMsg): MsgUpdateKeychainResponse {
    return MsgUpdateKeychainResponse.decode(message.value);
  },
  toProto(message: MsgUpdateKeychainResponse): Uint8Array {
    return MsgUpdateKeychainResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateKeychainResponse): MsgUpdateKeychainResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.MsgUpdateKeychainResponse",
      value: MsgUpdateKeychainResponse.encode(message).finish()
    };
  }
};
function createBaseMsgNewKeyRequest(): MsgNewKeyRequest {
  return {
    creator: "",
    spaceAddr: "",
    keychainAddr: "",
    keyType: 0,
    btl: BigInt(0)
  };
}
export const MsgNewKeyRequest = {
  typeUrl: "/warden.warden.v1beta1.MsgNewKeyRequest",
  encode(message: MsgNewKeyRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.spaceAddr !== "") {
      writer.uint32(18).string(message.spaceAddr);
    }
    if (message.keychainAddr !== "") {
      writer.uint32(26).string(message.keychainAddr);
    }
    if (message.keyType !== 0) {
      writer.uint32(32).int32(message.keyType);
    }
    if (message.btl !== BigInt(0)) {
      writer.uint32(40).uint64(message.btl);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgNewKeyRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgNewKeyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.spaceAddr = reader.string();
          break;
        case 3:
          message.keychainAddr = reader.string();
          break;
        case 4:
          message.keyType = (reader.int32() as any);
          break;
        case 5:
          message.btl = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgNewKeyRequest {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      spaceAddr: isSet(object.spaceAddr) ? String(object.spaceAddr) : "",
      keychainAddr: isSet(object.keychainAddr) ? String(object.keychainAddr) : "",
      keyType: isSet(object.keyType) ? keyTypeFromJSON(object.keyType) : -1,
      btl: isSet(object.btl) ? BigInt(object.btl.toString()) : BigInt(0)
    };
  },
  toJSON(message: MsgNewKeyRequest): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.spaceAddr !== undefined && (obj.spaceAddr = message.spaceAddr);
    message.keychainAddr !== undefined && (obj.keychainAddr = message.keychainAddr);
    message.keyType !== undefined && (obj.keyType = keyTypeToJSON(message.keyType));
    message.btl !== undefined && (obj.btl = (message.btl || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<MsgNewKeyRequest>): MsgNewKeyRequest {
    const message = createBaseMsgNewKeyRequest();
    message.creator = object.creator ?? "";
    message.spaceAddr = object.spaceAddr ?? "";
    message.keychainAddr = object.keychainAddr ?? "";
    message.keyType = object.keyType ?? 0;
    message.btl = object.btl !== undefined && object.btl !== null ? BigInt(object.btl.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgNewKeyRequestAmino): MsgNewKeyRequest {
    const message = createBaseMsgNewKeyRequest();
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
    if (object.btl !== undefined && object.btl !== null) {
      message.btl = BigInt(object.btl);
    }
    return message;
  },
  toAmino(message: MsgNewKeyRequest): MsgNewKeyRequestAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.space_addr = message.spaceAddr === "" ? undefined : message.spaceAddr;
    obj.keychain_addr = message.keychainAddr === "" ? undefined : message.keychainAddr;
    obj.key_type = message.keyType === 0 ? undefined : message.keyType;
    obj.btl = message.btl !== BigInt(0) ? message.btl.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgNewKeyRequestAminoMsg): MsgNewKeyRequest {
    return MsgNewKeyRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgNewKeyRequestProtoMsg): MsgNewKeyRequest {
    return MsgNewKeyRequest.decode(message.value);
  },
  toProto(message: MsgNewKeyRequest): Uint8Array {
    return MsgNewKeyRequest.encode(message).finish();
  },
  toProtoMsg(message: MsgNewKeyRequest): MsgNewKeyRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.MsgNewKeyRequest",
      value: MsgNewKeyRequest.encode(message).finish()
    };
  }
};
function createBaseMsgNewKeyRequestResponse(): MsgNewKeyRequestResponse {
  return {
    id: BigInt(0)
  };
}
export const MsgNewKeyRequestResponse = {
  typeUrl: "/warden.warden.v1beta1.MsgNewKeyRequestResponse",
  encode(message: MsgNewKeyRequestResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgNewKeyRequestResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgNewKeyRequestResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgNewKeyRequestResponse {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0)
    };
  },
  toJSON(message: MsgNewKeyRequestResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<MsgNewKeyRequestResponse>): MsgNewKeyRequestResponse {
    const message = createBaseMsgNewKeyRequestResponse();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgNewKeyRequestResponseAmino): MsgNewKeyRequestResponse {
    const message = createBaseMsgNewKeyRequestResponse();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: MsgNewKeyRequestResponse): MsgNewKeyRequestResponseAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgNewKeyRequestResponseAminoMsg): MsgNewKeyRequestResponse {
    return MsgNewKeyRequestResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgNewKeyRequestResponseProtoMsg): MsgNewKeyRequestResponse {
    return MsgNewKeyRequestResponse.decode(message.value);
  },
  toProto(message: MsgNewKeyRequestResponse): Uint8Array {
    return MsgNewKeyRequestResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgNewKeyRequestResponse): MsgNewKeyRequestResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.MsgNewKeyRequestResponse",
      value: MsgNewKeyRequestResponse.encode(message).finish()
    };
  }
};
function createBaseMsgNewKey(): MsgNewKey {
  return {
    publicKey: new Uint8Array()
  };
}
export const MsgNewKey = {
  typeUrl: "/warden.warden.v1beta1.MsgNewKey",
  encode(message: MsgNewKey, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.publicKey.length !== 0) {
      writer.uint32(10).bytes(message.publicKey);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgNewKey {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgNewKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.publicKey = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgNewKey {
    return {
      publicKey: isSet(object.publicKey) ? bytesFromBase64(object.publicKey) : new Uint8Array()
    };
  },
  toJSON(message: MsgNewKey): unknown {
    const obj: any = {};
    message.publicKey !== undefined && (obj.publicKey = base64FromBytes(message.publicKey !== undefined ? message.publicKey : new Uint8Array()));
    return obj;
  },
  fromPartial(object: Partial<MsgNewKey>): MsgNewKey {
    const message = createBaseMsgNewKey();
    message.publicKey = object.publicKey ?? new Uint8Array();
    return message;
  },
  fromAmino(object: MsgNewKeyAmino): MsgNewKey {
    const message = createBaseMsgNewKey();
    if (object.public_key !== undefined && object.public_key !== null) {
      message.publicKey = bytesFromBase64(object.public_key);
    }
    return message;
  },
  toAmino(message: MsgNewKey): MsgNewKeyAmino {
    const obj: any = {};
    obj.public_key = message.publicKey ? base64FromBytes(message.publicKey) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgNewKeyAminoMsg): MsgNewKey {
    return MsgNewKey.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgNewKeyProtoMsg): MsgNewKey {
    return MsgNewKey.decode(message.value);
  },
  toProto(message: MsgNewKey): Uint8Array {
    return MsgNewKey.encode(message).finish();
  },
  toProtoMsg(message: MsgNewKey): MsgNewKeyProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.MsgNewKey",
      value: MsgNewKey.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateKeyRequest(): MsgUpdateKeyRequest {
  return {
    creator: "",
    requestId: BigInt(0),
    status: 0,
    key: undefined,
    rejectReason: undefined
  };
}
export const MsgUpdateKeyRequest = {
  typeUrl: "/warden.warden.v1beta1.MsgUpdateKeyRequest",
  encode(message: MsgUpdateKeyRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.requestId !== BigInt(0)) {
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
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateKeyRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateKeyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.requestId = reader.uint64();
          break;
        case 3:
          message.status = (reader.int32() as any);
          break;
        case 4:
          message.key = MsgNewKey.decode(reader, reader.uint32());
          break;
        case 5:
          message.rejectReason = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgUpdateKeyRequest {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      requestId: isSet(object.requestId) ? BigInt(object.requestId.toString()) : BigInt(0),
      status: isSet(object.status) ? keyRequestStatusFromJSON(object.status) : -1,
      key: isSet(object.key) ? MsgNewKey.fromJSON(object.key) : undefined,
      rejectReason: isSet(object.rejectReason) ? String(object.rejectReason) : undefined
    };
  },
  toJSON(message: MsgUpdateKeyRequest): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.requestId !== undefined && (obj.requestId = (message.requestId || BigInt(0)).toString());
    message.status !== undefined && (obj.status = keyRequestStatusToJSON(message.status));
    message.key !== undefined && (obj.key = message.key ? MsgNewKey.toJSON(message.key) : undefined);
    message.rejectReason !== undefined && (obj.rejectReason = message.rejectReason);
    return obj;
  },
  fromPartial(object: Partial<MsgUpdateKeyRequest>): MsgUpdateKeyRequest {
    const message = createBaseMsgUpdateKeyRequest();
    message.creator = object.creator ?? "";
    message.requestId = object.requestId !== undefined && object.requestId !== null ? BigInt(object.requestId.toString()) : BigInt(0);
    message.status = object.status ?? 0;
    message.key = object.key !== undefined && object.key !== null ? MsgNewKey.fromPartial(object.key) : undefined;
    message.rejectReason = object.rejectReason ?? undefined;
    return message;
  },
  fromAmino(object: MsgUpdateKeyRequestAmino): MsgUpdateKeyRequest {
    const message = createBaseMsgUpdateKeyRequest();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.request_id !== undefined && object.request_id !== null) {
      message.requestId = BigInt(object.request_id);
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = MsgNewKey.fromAmino(object.key);
    }
    if (object.reject_reason !== undefined && object.reject_reason !== null) {
      message.rejectReason = object.reject_reason;
    }
    return message;
  },
  toAmino(message: MsgUpdateKeyRequest): MsgUpdateKeyRequestAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.request_id = message.requestId !== BigInt(0) ? message.requestId.toString() : undefined;
    obj.status = message.status === 0 ? undefined : message.status;
    obj.key = message.key ? MsgNewKey.toAmino(message.key) : undefined;
    obj.reject_reason = message.rejectReason === null ? undefined : message.rejectReason;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateKeyRequestAminoMsg): MsgUpdateKeyRequest {
    return MsgUpdateKeyRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateKeyRequestProtoMsg): MsgUpdateKeyRequest {
    return MsgUpdateKeyRequest.decode(message.value);
  },
  toProto(message: MsgUpdateKeyRequest): Uint8Array {
    return MsgUpdateKeyRequest.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateKeyRequest): MsgUpdateKeyRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.MsgUpdateKeyRequest",
      value: MsgUpdateKeyRequest.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateKeyRequestResponse(): MsgUpdateKeyRequestResponse {
  return {};
}
export const MsgUpdateKeyRequestResponse = {
  typeUrl: "/warden.warden.v1beta1.MsgUpdateKeyRequestResponse",
  encode(_: MsgUpdateKeyRequestResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateKeyRequestResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateKeyRequestResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
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
  fromPartial(_: Partial<MsgUpdateKeyRequestResponse>): MsgUpdateKeyRequestResponse {
    const message = createBaseMsgUpdateKeyRequestResponse();
    return message;
  },
  fromAmino(_: MsgUpdateKeyRequestResponseAmino): MsgUpdateKeyRequestResponse {
    const message = createBaseMsgUpdateKeyRequestResponse();
    return message;
  },
  toAmino(_: MsgUpdateKeyRequestResponse): MsgUpdateKeyRequestResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateKeyRequestResponseAminoMsg): MsgUpdateKeyRequestResponse {
    return MsgUpdateKeyRequestResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateKeyRequestResponseProtoMsg): MsgUpdateKeyRequestResponse {
    return MsgUpdateKeyRequestResponse.decode(message.value);
  },
  toProto(message: MsgUpdateKeyRequestResponse): Uint8Array {
    return MsgUpdateKeyRequestResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateKeyRequestResponse): MsgUpdateKeyRequestResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.MsgUpdateKeyRequestResponse",
      value: MsgUpdateKeyRequestResponse.encode(message).finish()
    };
  }
};
function createBaseMsgNewSignatureRequest(): MsgNewSignatureRequest {
  return {
    creator: "",
    keyId: BigInt(0),
    dataForSigning: new Uint8Array(),
    btl: BigInt(0)
  };
}
export const MsgNewSignatureRequest = {
  typeUrl: "/warden.warden.v1beta1.MsgNewSignatureRequest",
  encode(message: MsgNewSignatureRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.keyId !== BigInt(0)) {
      writer.uint32(16).uint64(message.keyId);
    }
    if (message.dataForSigning.length !== 0) {
      writer.uint32(26).bytes(message.dataForSigning);
    }
    if (message.btl !== BigInt(0)) {
      writer.uint32(32).uint64(message.btl);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgNewSignatureRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgNewSignatureRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.keyId = reader.uint64();
          break;
        case 3:
          message.dataForSigning = reader.bytes();
          break;
        case 4:
          message.btl = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgNewSignatureRequest {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      keyId: isSet(object.keyId) ? BigInt(object.keyId.toString()) : BigInt(0),
      dataForSigning: isSet(object.dataForSigning) ? bytesFromBase64(object.dataForSigning) : new Uint8Array(),
      btl: isSet(object.btl) ? BigInt(object.btl.toString()) : BigInt(0)
    };
  },
  toJSON(message: MsgNewSignatureRequest): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.keyId !== undefined && (obj.keyId = (message.keyId || BigInt(0)).toString());
    message.dataForSigning !== undefined && (obj.dataForSigning = base64FromBytes(message.dataForSigning !== undefined ? message.dataForSigning : new Uint8Array()));
    message.btl !== undefined && (obj.btl = (message.btl || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<MsgNewSignatureRequest>): MsgNewSignatureRequest {
    const message = createBaseMsgNewSignatureRequest();
    message.creator = object.creator ?? "";
    message.keyId = object.keyId !== undefined && object.keyId !== null ? BigInt(object.keyId.toString()) : BigInt(0);
    message.dataForSigning = object.dataForSigning ?? new Uint8Array();
    message.btl = object.btl !== undefined && object.btl !== null ? BigInt(object.btl.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgNewSignatureRequestAmino): MsgNewSignatureRequest {
    const message = createBaseMsgNewSignatureRequest();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.key_id !== undefined && object.key_id !== null) {
      message.keyId = BigInt(object.key_id);
    }
    if (object.data_for_signing !== undefined && object.data_for_signing !== null) {
      message.dataForSigning = bytesFromBase64(object.data_for_signing);
    }
    if (object.btl !== undefined && object.btl !== null) {
      message.btl = BigInt(object.btl);
    }
    return message;
  },
  toAmino(message: MsgNewSignatureRequest): MsgNewSignatureRequestAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.key_id = message.keyId !== BigInt(0) ? message.keyId.toString() : undefined;
    obj.data_for_signing = message.dataForSigning ? base64FromBytes(message.dataForSigning) : undefined;
    obj.btl = message.btl !== BigInt(0) ? message.btl.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgNewSignatureRequestAminoMsg): MsgNewSignatureRequest {
    return MsgNewSignatureRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgNewSignatureRequestProtoMsg): MsgNewSignatureRequest {
    return MsgNewSignatureRequest.decode(message.value);
  },
  toProto(message: MsgNewSignatureRequest): Uint8Array {
    return MsgNewSignatureRequest.encode(message).finish();
  },
  toProtoMsg(message: MsgNewSignatureRequest): MsgNewSignatureRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.MsgNewSignatureRequest",
      value: MsgNewSignatureRequest.encode(message).finish()
    };
  }
};
function createBaseMsgNewSignatureRequestResponse(): MsgNewSignatureRequestResponse {
  return {
    id: BigInt(0)
  };
}
export const MsgNewSignatureRequestResponse = {
  typeUrl: "/warden.warden.v1beta1.MsgNewSignatureRequestResponse",
  encode(message: MsgNewSignatureRequestResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgNewSignatureRequestResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgNewSignatureRequestResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgNewSignatureRequestResponse {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0)
    };
  },
  toJSON(message: MsgNewSignatureRequestResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<MsgNewSignatureRequestResponse>): MsgNewSignatureRequestResponse {
    const message = createBaseMsgNewSignatureRequestResponse();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgNewSignatureRequestResponseAmino): MsgNewSignatureRequestResponse {
    const message = createBaseMsgNewSignatureRequestResponse();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: MsgNewSignatureRequestResponse): MsgNewSignatureRequestResponseAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgNewSignatureRequestResponseAminoMsg): MsgNewSignatureRequestResponse {
    return MsgNewSignatureRequestResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgNewSignatureRequestResponseProtoMsg): MsgNewSignatureRequestResponse {
    return MsgNewSignatureRequestResponse.decode(message.value);
  },
  toProto(message: MsgNewSignatureRequestResponse): Uint8Array {
    return MsgNewSignatureRequestResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgNewSignatureRequestResponse): MsgNewSignatureRequestResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.MsgNewSignatureRequestResponse",
      value: MsgNewSignatureRequestResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSignedData(): MsgSignedData {
  return {
    signedData: new Uint8Array()
  };
}
export const MsgSignedData = {
  typeUrl: "/warden.warden.v1beta1.MsgSignedData",
  encode(message: MsgSignedData, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.signedData.length !== 0) {
      writer.uint32(10).bytes(message.signedData);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSignedData {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSignedData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.signedData = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgSignedData {
    return {
      signedData: isSet(object.signedData) ? bytesFromBase64(object.signedData) : new Uint8Array()
    };
  },
  toJSON(message: MsgSignedData): unknown {
    const obj: any = {};
    message.signedData !== undefined && (obj.signedData = base64FromBytes(message.signedData !== undefined ? message.signedData : new Uint8Array()));
    return obj;
  },
  fromPartial(object: Partial<MsgSignedData>): MsgSignedData {
    const message = createBaseMsgSignedData();
    message.signedData = object.signedData ?? new Uint8Array();
    return message;
  },
  fromAmino(object: MsgSignedDataAmino): MsgSignedData {
    const message = createBaseMsgSignedData();
    if (object.signed_data !== undefined && object.signed_data !== null) {
      message.signedData = bytesFromBase64(object.signed_data);
    }
    return message;
  },
  toAmino(message: MsgSignedData): MsgSignedDataAmino {
    const obj: any = {};
    obj.signed_data = message.signedData ? base64FromBytes(message.signedData) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgSignedDataAminoMsg): MsgSignedData {
    return MsgSignedData.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSignedDataProtoMsg): MsgSignedData {
    return MsgSignedData.decode(message.value);
  },
  toProto(message: MsgSignedData): Uint8Array {
    return MsgSignedData.encode(message).finish();
  },
  toProtoMsg(message: MsgSignedData): MsgSignedDataProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.MsgSignedData",
      value: MsgSignedData.encode(message).finish()
    };
  }
};
function createBaseMsgFulfilSignatureRequest(): MsgFulfilSignatureRequest {
  return {
    creator: "",
    requestId: BigInt(0),
    status: 0,
    payload: undefined,
    rejectReason: undefined
  };
}
export const MsgFulfilSignatureRequest = {
  typeUrl: "/warden.warden.v1beta1.MsgFulfilSignatureRequest",
  encode(message: MsgFulfilSignatureRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.requestId !== BigInt(0)) {
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
  decode(input: BinaryReader | Uint8Array, length?: number): MsgFulfilSignatureRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFulfilSignatureRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.requestId = reader.uint64();
          break;
        case 3:
          message.status = (reader.int32() as any);
          break;
        case 4:
          message.payload = MsgSignedData.decode(reader, reader.uint32());
          break;
        case 5:
          message.rejectReason = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgFulfilSignatureRequest {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      requestId: isSet(object.requestId) ? BigInt(object.requestId.toString()) : BigInt(0),
      status: isSet(object.status) ? signRequestStatusFromJSON(object.status) : -1,
      payload: isSet(object.payload) ? MsgSignedData.fromJSON(object.payload) : undefined,
      rejectReason: isSet(object.rejectReason) ? String(object.rejectReason) : undefined
    };
  },
  toJSON(message: MsgFulfilSignatureRequest): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.requestId !== undefined && (obj.requestId = (message.requestId || BigInt(0)).toString());
    message.status !== undefined && (obj.status = signRequestStatusToJSON(message.status));
    message.payload !== undefined && (obj.payload = message.payload ? MsgSignedData.toJSON(message.payload) : undefined);
    message.rejectReason !== undefined && (obj.rejectReason = message.rejectReason);
    return obj;
  },
  fromPartial(object: Partial<MsgFulfilSignatureRequest>): MsgFulfilSignatureRequest {
    const message = createBaseMsgFulfilSignatureRequest();
    message.creator = object.creator ?? "";
    message.requestId = object.requestId !== undefined && object.requestId !== null ? BigInt(object.requestId.toString()) : BigInt(0);
    message.status = object.status ?? 0;
    message.payload = object.payload !== undefined && object.payload !== null ? MsgSignedData.fromPartial(object.payload) : undefined;
    message.rejectReason = object.rejectReason ?? undefined;
    return message;
  },
  fromAmino(object: MsgFulfilSignatureRequestAmino): MsgFulfilSignatureRequest {
    const message = createBaseMsgFulfilSignatureRequest();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.request_id !== undefined && object.request_id !== null) {
      message.requestId = BigInt(object.request_id);
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    if (object.payload !== undefined && object.payload !== null) {
      message.payload = MsgSignedData.fromAmino(object.payload);
    }
    if (object.reject_reason !== undefined && object.reject_reason !== null) {
      message.rejectReason = object.reject_reason;
    }
    return message;
  },
  toAmino(message: MsgFulfilSignatureRequest): MsgFulfilSignatureRequestAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.request_id = message.requestId !== BigInt(0) ? message.requestId.toString() : undefined;
    obj.status = message.status === 0 ? undefined : message.status;
    obj.payload = message.payload ? MsgSignedData.toAmino(message.payload) : undefined;
    obj.reject_reason = message.rejectReason === null ? undefined : message.rejectReason;
    return obj;
  },
  fromAminoMsg(object: MsgFulfilSignatureRequestAminoMsg): MsgFulfilSignatureRequest {
    return MsgFulfilSignatureRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgFulfilSignatureRequestProtoMsg): MsgFulfilSignatureRequest {
    return MsgFulfilSignatureRequest.decode(message.value);
  },
  toProto(message: MsgFulfilSignatureRequest): Uint8Array {
    return MsgFulfilSignatureRequest.encode(message).finish();
  },
  toProtoMsg(message: MsgFulfilSignatureRequest): MsgFulfilSignatureRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.MsgFulfilSignatureRequest",
      value: MsgFulfilSignatureRequest.encode(message).finish()
    };
  }
};
function createBaseMsgFulfilSignatureRequestResponse(): MsgFulfilSignatureRequestResponse {
  return {};
}
export const MsgFulfilSignatureRequestResponse = {
  typeUrl: "/warden.warden.v1beta1.MsgFulfilSignatureRequestResponse",
  encode(_: MsgFulfilSignatureRequestResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgFulfilSignatureRequestResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFulfilSignatureRequestResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
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
  fromPartial(_: Partial<MsgFulfilSignatureRequestResponse>): MsgFulfilSignatureRequestResponse {
    const message = createBaseMsgFulfilSignatureRequestResponse();
    return message;
  },
  fromAmino(_: MsgFulfilSignatureRequestResponseAmino): MsgFulfilSignatureRequestResponse {
    const message = createBaseMsgFulfilSignatureRequestResponse();
    return message;
  },
  toAmino(_: MsgFulfilSignatureRequestResponse): MsgFulfilSignatureRequestResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgFulfilSignatureRequestResponseAminoMsg): MsgFulfilSignatureRequestResponse {
    return MsgFulfilSignatureRequestResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgFulfilSignatureRequestResponseProtoMsg): MsgFulfilSignatureRequestResponse {
    return MsgFulfilSignatureRequestResponse.decode(message.value);
  },
  toProto(message: MsgFulfilSignatureRequestResponse): Uint8Array {
    return MsgFulfilSignatureRequestResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgFulfilSignatureRequestResponse): MsgFulfilSignatureRequestResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.MsgFulfilSignatureRequestResponse",
      value: MsgFulfilSignatureRequestResponse.encode(message).finish()
    };
  }
};
function createBaseMsgNewSignTransactionRequest(): MsgNewSignTransactionRequest {
  return {
    creator: "",
    keyId: BigInt(0),
    walletType: 0,
    unsignedTransaction: new Uint8Array(),
    btl: BigInt(0),
    metadata: undefined
  };
}
export const MsgNewSignTransactionRequest = {
  typeUrl: "/warden.warden.v1beta1.MsgNewSignTransactionRequest",
  encode(message: MsgNewSignTransactionRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.keyId !== BigInt(0)) {
      writer.uint32(16).uint64(message.keyId);
    }
    if (message.walletType !== 0) {
      writer.uint32(24).int32(message.walletType);
    }
    if (message.unsignedTransaction.length !== 0) {
      writer.uint32(34).bytes(message.unsignedTransaction);
    }
    if (message.btl !== BigInt(0)) {
      writer.uint32(40).uint64(message.btl);
    }
    if (message.metadata !== undefined) {
      Any.encode(message.metadata, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgNewSignTransactionRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgNewSignTransactionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.keyId = reader.uint64();
          break;
        case 3:
          message.walletType = (reader.int32() as any);
          break;
        case 4:
          message.unsignedTransaction = reader.bytes();
          break;
        case 5:
          message.btl = reader.uint64();
          break;
        case 6:
          message.metadata = Any.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgNewSignTransactionRequest {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      keyId: isSet(object.keyId) ? BigInt(object.keyId.toString()) : BigInt(0),
      walletType: isSet(object.walletType) ? walletTypeFromJSON(object.walletType) : -1,
      unsignedTransaction: isSet(object.unsignedTransaction) ? bytesFromBase64(object.unsignedTransaction) : new Uint8Array(),
      btl: isSet(object.btl) ? BigInt(object.btl.toString()) : BigInt(0),
      metadata: isSet(object.metadata) ? Any.fromJSON(object.metadata) : undefined
    };
  },
  toJSON(message: MsgNewSignTransactionRequest): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.keyId !== undefined && (obj.keyId = (message.keyId || BigInt(0)).toString());
    message.walletType !== undefined && (obj.walletType = walletTypeToJSON(message.walletType));
    message.unsignedTransaction !== undefined && (obj.unsignedTransaction = base64FromBytes(message.unsignedTransaction !== undefined ? message.unsignedTransaction : new Uint8Array()));
    message.btl !== undefined && (obj.btl = (message.btl || BigInt(0)).toString());
    message.metadata !== undefined && (obj.metadata = message.metadata ? Any.toJSON(message.metadata) : undefined);
    return obj;
  },
  fromPartial(object: Partial<MsgNewSignTransactionRequest>): MsgNewSignTransactionRequest {
    const message = createBaseMsgNewSignTransactionRequest();
    message.creator = object.creator ?? "";
    message.keyId = object.keyId !== undefined && object.keyId !== null ? BigInt(object.keyId.toString()) : BigInt(0);
    message.walletType = object.walletType ?? 0;
    message.unsignedTransaction = object.unsignedTransaction ?? new Uint8Array();
    message.btl = object.btl !== undefined && object.btl !== null ? BigInt(object.btl.toString()) : BigInt(0);
    message.metadata = object.metadata !== undefined && object.metadata !== null ? Any.fromPartial(object.metadata) : undefined;
    return message;
  },
  fromAmino(object: MsgNewSignTransactionRequestAmino): MsgNewSignTransactionRequest {
    const message = createBaseMsgNewSignTransactionRequest();
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
    if (object.btl !== undefined && object.btl !== null) {
      message.btl = BigInt(object.btl);
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Any.fromAmino(object.metadata);
    }
    return message;
  },
  toAmino(message: MsgNewSignTransactionRequest): MsgNewSignTransactionRequestAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.key_id = message.keyId !== BigInt(0) ? message.keyId.toString() : undefined;
    obj.wallet_type = message.walletType === 0 ? undefined : message.walletType;
    obj.unsigned_transaction = message.unsignedTransaction ? base64FromBytes(message.unsignedTransaction) : undefined;
    obj.btl = message.btl !== BigInt(0) ? message.btl.toString() : undefined;
    obj.metadata = message.metadata ? Any.toAmino(message.metadata) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgNewSignTransactionRequestAminoMsg): MsgNewSignTransactionRequest {
    return MsgNewSignTransactionRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgNewSignTransactionRequestProtoMsg): MsgNewSignTransactionRequest {
    return MsgNewSignTransactionRequest.decode(message.value);
  },
  toProto(message: MsgNewSignTransactionRequest): Uint8Array {
    return MsgNewSignTransactionRequest.encode(message).finish();
  },
  toProtoMsg(message: MsgNewSignTransactionRequest): MsgNewSignTransactionRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.MsgNewSignTransactionRequest",
      value: MsgNewSignTransactionRequest.encode(message).finish()
    };
  }
};
function createBaseMsgNewSignTransactionRequestResponse(): MsgNewSignTransactionRequestResponse {
  return {
    id: BigInt(0),
    signatureRequestId: BigInt(0)
  };
}
export const MsgNewSignTransactionRequestResponse = {
  typeUrl: "/warden.warden.v1beta1.MsgNewSignTransactionRequestResponse",
  encode(message: MsgNewSignTransactionRequestResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.signatureRequestId !== BigInt(0)) {
      writer.uint32(16).uint64(message.signatureRequestId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgNewSignTransactionRequestResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgNewSignTransactionRequestResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.signatureRequestId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgNewSignTransactionRequestResponse {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      signatureRequestId: isSet(object.signatureRequestId) ? BigInt(object.signatureRequestId.toString()) : BigInt(0)
    };
  },
  toJSON(message: MsgNewSignTransactionRequestResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.signatureRequestId !== undefined && (obj.signatureRequestId = (message.signatureRequestId || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<MsgNewSignTransactionRequestResponse>): MsgNewSignTransactionRequestResponse {
    const message = createBaseMsgNewSignTransactionRequestResponse();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.signatureRequestId = object.signatureRequestId !== undefined && object.signatureRequestId !== null ? BigInt(object.signatureRequestId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgNewSignTransactionRequestResponseAmino): MsgNewSignTransactionRequestResponse {
    const message = createBaseMsgNewSignTransactionRequestResponse();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.signature_request_id !== undefined && object.signature_request_id !== null) {
      message.signatureRequestId = BigInt(object.signature_request_id);
    }
    return message;
  },
  toAmino(message: MsgNewSignTransactionRequestResponse): MsgNewSignTransactionRequestResponseAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.signature_request_id = message.signatureRequestId !== BigInt(0) ? message.signatureRequestId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgNewSignTransactionRequestResponseAminoMsg): MsgNewSignTransactionRequestResponse {
    return MsgNewSignTransactionRequestResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgNewSignTransactionRequestResponseProtoMsg): MsgNewSignTransactionRequestResponse {
    return MsgNewSignTransactionRequestResponse.decode(message.value);
  },
  toProto(message: MsgNewSignTransactionRequestResponse): Uint8Array {
    return MsgNewSignTransactionRequestResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgNewSignTransactionRequestResponse): MsgNewSignTransactionRequestResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.MsgNewSignTransactionRequestResponse",
      value: MsgNewSignTransactionRequestResponse.encode(message).finish()
    };
  }
};
function createBaseMetadataEthereum(): MetadataEthereum {
  return {
    chainId: BigInt(0)
  };
}
export const MetadataEthereum = {
  typeUrl: "/warden.warden.v1beta1.MetadataEthereum",
  encode(message: MetadataEthereum, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== BigInt(0)) {
      writer.uint32(8).uint64(message.chainId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MetadataEthereum {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMetadataEthereum();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MetadataEthereum {
    return {
      chainId: isSet(object.chainId) ? BigInt(object.chainId.toString()) : BigInt(0)
    };
  },
  toJSON(message: MetadataEthereum): unknown {
    const obj: any = {};
    message.chainId !== undefined && (obj.chainId = (message.chainId || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<MetadataEthereum>): MetadataEthereum {
    const message = createBaseMetadataEthereum();
    message.chainId = object.chainId !== undefined && object.chainId !== null ? BigInt(object.chainId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MetadataEthereumAmino): MetadataEthereum {
    const message = createBaseMetadataEthereum();
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = BigInt(object.chain_id);
    }
    return message;
  },
  toAmino(message: MetadataEthereum): MetadataEthereumAmino {
    const obj: any = {};
    obj.chain_id = message.chainId !== BigInt(0) ? message.chainId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MetadataEthereumAminoMsg): MetadataEthereum {
    return MetadataEthereum.fromAmino(object.value);
  },
  fromProtoMsg(message: MetadataEthereumProtoMsg): MetadataEthereum {
    return MetadataEthereum.decode(message.value);
  },
  toProto(message: MetadataEthereum): Uint8Array {
    return MetadataEthereum.encode(message).finish();
  },
  toProtoMsg(message: MetadataEthereum): MetadataEthereumProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.MetadataEthereum",
      value: MetadataEthereum.encode(message).finish()
    };
  }
};