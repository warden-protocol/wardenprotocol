//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params.js";
import { KeychainFees, KeychainFeesAmino, KeychainFeesSDKType } from "./keychain.js";
import { KeyType, KeyRequestStatus, keyTypeFromJSON, keyTypeToJSON, keyRequestStatusFromJSON, keyRequestStatusToJSON } from "./key.js";
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin.js";
import { BroadcastType, SignRequestStatus, broadcastTypeFromJSON, broadcastTypeToJSON, signRequestStatusFromJSON, signRequestStatusToJSON } from "./signature.js";
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet, bytesFromBase64, base64FromBytes } from "../../../helpers.js";
import { JsonSafe } from "../../../json-safe.js";
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
  typeUrl: "/warden.warden.v1beta3.MsgUpdateParams";
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
  typeUrl: "/warden.warden.v1beta3.MsgUpdateParamsResponse";
  value: Uint8Array;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/warden.warden.v1beta3.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponseSDKType {}
export interface MsgNewSpace {
  creator: string;
  approveAdminTemplateId: bigint;
  rejectAdminTemplateId: bigint;
  approveSignTemplateId: bigint;
  rejectSignTemplateId: bigint;
  additionalOwners: string[];
}
export interface MsgNewSpaceProtoMsg {
  typeUrl: "/warden.warden.v1beta3.MsgNewSpace";
  value: Uint8Array;
}
export interface MsgNewSpaceAmino {
  creator?: string;
  approve_admin_template_id?: string;
  reject_admin_template_id?: string;
  approve_sign_template_id?: string;
  reject_sign_template_id?: string;
  additional_owners?: string[];
}
export interface MsgNewSpaceAminoMsg {
  type: "/warden.warden.v1beta3.MsgNewSpace";
  value: MsgNewSpaceAmino;
}
export interface MsgNewSpaceSDKType {
  creator: string;
  approve_admin_template_id: bigint;
  reject_admin_template_id: bigint;
  approve_sign_template_id: bigint;
  reject_sign_template_id: bigint;
  additional_owners: string[];
}
export interface MsgNewSpaceResponse {
  id: bigint;
}
export interface MsgNewSpaceResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta3.MsgNewSpaceResponse";
  value: Uint8Array;
}
export interface MsgNewSpaceResponseAmino {
  id?: string;
}
export interface MsgNewSpaceResponseAminoMsg {
  type: "/warden.warden.v1beta3.MsgNewSpaceResponse";
  value: MsgNewSpaceResponseAmino;
}
export interface MsgNewSpaceResponseSDKType {
  id: bigint;
}
export interface MsgAddSpaceOwner {
  authority: string;
  spaceId: bigint;
  newOwner: string;
  nonce: bigint;
}
export interface MsgAddSpaceOwnerProtoMsg {
  typeUrl: "/warden.warden.v1beta3.MsgAddSpaceOwner";
  value: Uint8Array;
}
export interface MsgAddSpaceOwnerAmino {
  authority?: string;
  space_id?: string;
  new_owner?: string;
  nonce?: string;
}
export interface MsgAddSpaceOwnerAminoMsg {
  type: "/warden.warden.v1beta3.MsgAddSpaceOwner";
  value: MsgAddSpaceOwnerAmino;
}
export interface MsgAddSpaceOwnerSDKType {
  authority: string;
  space_id: bigint;
  new_owner: string;
  nonce: bigint;
}
export interface MsgAddSpaceOwnerResponse {}
export interface MsgAddSpaceOwnerResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta3.MsgAddSpaceOwnerResponse";
  value: Uint8Array;
}
export interface MsgAddSpaceOwnerResponseAmino {}
export interface MsgAddSpaceOwnerResponseAminoMsg {
  type: "/warden.warden.v1beta3.MsgAddSpaceOwnerResponse";
  value: MsgAddSpaceOwnerResponseAmino;
}
export interface MsgAddSpaceOwnerResponseSDKType {}
export interface MsgRemoveSpaceOwner {
  authority: string;
  spaceId: bigint;
  owner: string;
  nonce: bigint;
}
export interface MsgRemoveSpaceOwnerProtoMsg {
  typeUrl: "/warden.warden.v1beta3.MsgRemoveSpaceOwner";
  value: Uint8Array;
}
export interface MsgRemoveSpaceOwnerAmino {
  authority?: string;
  space_id?: string;
  owner?: string;
  nonce?: string;
}
export interface MsgRemoveSpaceOwnerAminoMsg {
  type: "/warden.warden.v1beta3.MsgRemoveSpaceOwner";
  value: MsgRemoveSpaceOwnerAmino;
}
export interface MsgRemoveSpaceOwnerSDKType {
  authority: string;
  space_id: bigint;
  owner: string;
  nonce: bigint;
}
export interface MsgRemoveSpaceOwnerResponse {}
export interface MsgRemoveSpaceOwnerResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta3.MsgRemoveSpaceOwnerResponse";
  value: Uint8Array;
}
export interface MsgRemoveSpaceOwnerResponseAmino {}
export interface MsgRemoveSpaceOwnerResponseAminoMsg {
  type: "/warden.warden.v1beta3.MsgRemoveSpaceOwnerResponse";
  value: MsgRemoveSpaceOwnerResponseAmino;
}
export interface MsgRemoveSpaceOwnerResponseSDKType {}
export interface MsgNewKeychain {
  creator: string;
  name: string;
  keychainFees: KeychainFees;
  description: string;
  url: string;
  keybaseId: string;
}
export interface MsgNewKeychainProtoMsg {
  typeUrl: "/warden.warden.v1beta3.MsgNewKeychain";
  value: Uint8Array;
}
export interface MsgNewKeychainAmino {
  creator?: string;
  name?: string;
  keychain_fees?: KeychainFeesAmino;
  description?: string;
  url?: string;
  keybase_id?: string;
}
export interface MsgNewKeychainAminoMsg {
  type: "/warden.warden.v1beta3.MsgNewKeychain";
  value: MsgNewKeychainAmino;
}
export interface MsgNewKeychainSDKType {
  creator: string;
  name: string;
  keychain_fees: KeychainFeesSDKType;
  description: string;
  url: string;
  keybase_id: string;
}
export interface MsgNewKeychainResponse {
  id: bigint;
}
export interface MsgNewKeychainResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta3.MsgNewKeychainResponse";
  value: Uint8Array;
}
export interface MsgNewKeychainResponseAmino {
  id?: string;
}
export interface MsgNewKeychainResponseAminoMsg {
  type: "/warden.warden.v1beta3.MsgNewKeychainResponse";
  value: MsgNewKeychainResponseAmino;
}
export interface MsgNewKeychainResponseSDKType {
  id: bigint;
}
export interface MsgAddKeychainWriter {
  creator: string;
  keychainId: bigint;
  writer: string;
}
export interface MsgAddKeychainWriterProtoMsg {
  typeUrl: "/warden.warden.v1beta3.MsgAddKeychainWriter";
  value: Uint8Array;
}
export interface MsgAddKeychainWriterAmino {
  creator?: string;
  keychain_id?: string;
  writer?: string;
}
export interface MsgAddKeychainWriterAminoMsg {
  type: "/warden.warden.v1beta3.MsgAddKeychainWriter";
  value: MsgAddKeychainWriterAmino;
}
export interface MsgAddKeychainWriterSDKType {
  creator: string;
  keychain_id: bigint;
  writer: string;
}
export interface MsgAddKeychainWriterResponse {}
export interface MsgAddKeychainWriterResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta3.MsgAddKeychainWriterResponse";
  value: Uint8Array;
}
export interface MsgAddKeychainWriterResponseAmino {}
export interface MsgAddKeychainWriterResponseAminoMsg {
  type: "/warden.warden.v1beta3.MsgAddKeychainWriterResponse";
  value: MsgAddKeychainWriterResponseAmino;
}
export interface MsgAddKeychainWriterResponseSDKType {}
export interface MsgUpdateSpace {
  authority: string;
  spaceId: bigint;
  nonce: bigint;
  approveAdminTemplateId: bigint;
  rejectAdminTemplateId: bigint;
  approveSignTemplateId: bigint;
  rejectSignTemplateId: bigint;
}
export interface MsgUpdateSpaceProtoMsg {
  typeUrl: "/warden.warden.v1beta3.MsgUpdateSpace";
  value: Uint8Array;
}
export interface MsgUpdateSpaceAmino {
  authority?: string;
  space_id?: string;
  nonce?: string;
  approve_admin_template_id?: string;
  reject_admin_template_id?: string;
  approve_sign_template_id?: string;
  reject_sign_template_id?: string;
}
export interface MsgUpdateSpaceAminoMsg {
  type: "/warden.warden.v1beta3.MsgUpdateSpace";
  value: MsgUpdateSpaceAmino;
}
export interface MsgUpdateSpaceSDKType {
  authority: string;
  space_id: bigint;
  nonce: bigint;
  approve_admin_template_id: bigint;
  reject_admin_template_id: bigint;
  approve_sign_template_id: bigint;
  reject_sign_template_id: bigint;
}
export interface MsgUpdateSpaceResponse {}
export interface MsgUpdateSpaceResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta3.MsgUpdateSpaceResponse";
  value: Uint8Array;
}
export interface MsgUpdateSpaceResponseAmino {}
export interface MsgUpdateSpaceResponseAminoMsg {
  type: "/warden.warden.v1beta3.MsgUpdateSpaceResponse";
  value: MsgUpdateSpaceResponseAmino;
}
export interface MsgUpdateSpaceResponseSDKType {}
export interface MsgUpdateKeychain {
  creator: string;
  keychainId: bigint;
  name: string;
  keychainFees: KeychainFees;
  description: string;
  url: string;
  keybaseId: string;
}
export interface MsgUpdateKeychainProtoMsg {
  typeUrl: "/warden.warden.v1beta3.MsgUpdateKeychain";
  value: Uint8Array;
}
export interface MsgUpdateKeychainAmino {
  creator?: string;
  keychain_id?: string;
  name?: string;
  keychain_fees?: KeychainFeesAmino;
  description?: string;
  url?: string;
  keybase_id?: string;
}
export interface MsgUpdateKeychainAminoMsg {
  type: "/warden.warden.v1beta3.MsgUpdateKeychain";
  value: MsgUpdateKeychainAmino;
}
export interface MsgUpdateKeychainSDKType {
  creator: string;
  keychain_id: bigint;
  name: string;
  keychain_fees: KeychainFeesSDKType;
  description: string;
  url: string;
  keybase_id: string;
}
export interface MsgUpdateKeychainResponse {}
export interface MsgUpdateKeychainResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta3.MsgUpdateKeychainResponse";
  value: Uint8Array;
}
export interface MsgUpdateKeychainResponseAmino {}
export interface MsgUpdateKeychainResponseAminoMsg {
  type: "/warden.warden.v1beta3.MsgUpdateKeychainResponse";
  value: MsgUpdateKeychainResponseAmino;
}
export interface MsgUpdateKeychainResponseSDKType {}
export interface MsgAddKeychainAdminRequest {
  authority: string;
  keychainId: bigint;
  newAdmin: string;
}
export interface MsgAddKeychainAdminRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta3.MsgAddKeychainAdminRequest";
  value: Uint8Array;
}
export interface MsgAddKeychainAdminRequestAmino {
  authority?: string;
  keychain_id?: string;
  new_admin?: string;
}
export interface MsgAddKeychainAdminRequestAminoMsg {
  type: "/warden.warden.v1beta3.MsgAddKeychainAdminRequest";
  value: MsgAddKeychainAdminRequestAmino;
}
export interface MsgAddKeychainAdminRequestSDKType {
  authority: string;
  keychain_id: bigint;
  new_admin: string;
}
export interface MsgAddKeychainAdminResponse {}
export interface MsgAddKeychainAdminResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta3.MsgAddKeychainAdminResponse";
  value: Uint8Array;
}
export interface MsgAddKeychainAdminResponseAmino {}
export interface MsgAddKeychainAdminResponseAminoMsg {
  type: "/warden.warden.v1beta3.MsgAddKeychainAdminResponse";
  value: MsgAddKeychainAdminResponseAmino;
}
export interface MsgAddKeychainAdminResponseSDKType {}
export interface MsgRemoveKeychainAdminRequest {
  authority: string;
  keychainId: bigint;
  admin: string;
}
export interface MsgRemoveKeychainAdminRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta3.MsgRemoveKeychainAdminRequest";
  value: Uint8Array;
}
export interface MsgRemoveKeychainAdminRequestAmino {
  authority?: string;
  keychain_id?: string;
  admin?: string;
}
export interface MsgRemoveKeychainAdminRequestAminoMsg {
  type: "/warden.warden.v1beta3.MsgRemoveKeychainAdminRequest";
  value: MsgRemoveKeychainAdminRequestAmino;
}
export interface MsgRemoveKeychainAdminRequestSDKType {
  authority: string;
  keychain_id: bigint;
  admin: string;
}
export interface MsgRemoveKeychainAdminResponse {}
export interface MsgRemoveKeychainAdminResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta3.MsgRemoveKeychainAdminResponse";
  value: Uint8Array;
}
export interface MsgRemoveKeychainAdminResponseAmino {}
export interface MsgRemoveKeychainAdminResponseAminoMsg {
  type: "/warden.warden.v1beta3.MsgRemoveKeychainAdminResponse";
  value: MsgRemoveKeychainAdminResponseAmino;
}
export interface MsgRemoveKeychainAdminResponseSDKType {}
export interface MsgNewKeyRequest {
  authority: string;
  spaceId: bigint;
  keychainId: bigint;
  keyType: KeyType;
  approveTemplateId: bigint;
  rejectTemplateId: bigint;
  maxKeychainFees: Coin[];
  nonce: bigint;
}
export interface MsgNewKeyRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta3.MsgNewKeyRequest";
  value: Uint8Array;
}
export interface MsgNewKeyRequestAmino {
  authority?: string;
  space_id?: string;
  keychain_id?: string;
  key_type?: KeyType;
  approve_template_id?: string;
  reject_template_id?: string;
  max_keychain_fees: CoinAmino[];
  nonce?: string;
}
export interface MsgNewKeyRequestAminoMsg {
  type: "/warden.warden.v1beta3.MsgNewKeyRequest";
  value: MsgNewKeyRequestAmino;
}
export interface MsgNewKeyRequestSDKType {
  authority: string;
  space_id: bigint;
  keychain_id: bigint;
  key_type: KeyType;
  approve_template_id: bigint;
  reject_template_id: bigint;
  max_keychain_fees: CoinSDKType[];
  nonce: bigint;
}
export interface MsgNewKeyRequestResponse {
  id: bigint;
}
export interface MsgNewKeyRequestResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta3.MsgNewKeyRequestResponse";
  value: Uint8Array;
}
export interface MsgNewKeyRequestResponseAmino {
  id?: string;
}
export interface MsgNewKeyRequestResponseAminoMsg {
  type: "/warden.warden.v1beta3.MsgNewKeyRequestResponse";
  value: MsgNewKeyRequestResponseAmino;
}
export interface MsgNewKeyRequestResponseSDKType {
  id: bigint;
}
export interface MsgNewKey {
  publicKey: Uint8Array;
}
export interface MsgNewKeyProtoMsg {
  typeUrl: "/warden.warden.v1beta3.MsgNewKey";
  value: Uint8Array;
}
export interface MsgNewKeyAmino {
  public_key?: string;
}
export interface MsgNewKeyAminoMsg {
  type: "/warden.warden.v1beta3.MsgNewKey";
  value: MsgNewKeyAmino;
}
export interface MsgNewKeySDKType {
  public_key: Uint8Array;
}
export interface MsgFulfilKeyRequest {
  creator: string;
  requestId: bigint;
  status: KeyRequestStatus;
  key?: MsgNewKey;
  rejectReason?: string;
}
export interface MsgFulfilKeyRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta3.MsgFulfilKeyRequest";
  value: Uint8Array;
}
export interface MsgFulfilKeyRequestAmino {
  creator?: string;
  request_id?: string;
  status?: KeyRequestStatus;
  key?: MsgNewKeyAmino;
  reject_reason?: string;
}
export interface MsgFulfilKeyRequestAminoMsg {
  type: "/warden.warden.v1beta3.MsgFulfilKeyRequest";
  value: MsgFulfilKeyRequestAmino;
}
export interface MsgFulfilKeyRequestSDKType {
  creator: string;
  request_id: bigint;
  status: KeyRequestStatus;
  key?: MsgNewKeySDKType;
  reject_reason?: string;
}
export interface MsgFulfilKeyRequestResponse {}
export interface MsgFulfilKeyRequestResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta3.MsgFulfilKeyRequestResponse";
  value: Uint8Array;
}
export interface MsgFulfilKeyRequestResponseAmino {}
export interface MsgFulfilKeyRequestResponseAminoMsg {
  type: "/warden.warden.v1beta3.MsgFulfilKeyRequestResponse";
  value: MsgFulfilKeyRequestResponseAmino;
}
export interface MsgFulfilKeyRequestResponseSDKType {}
export interface MsgUpdateKey {
  authority: string;
  keyId: bigint;
  approveTemplateId: bigint;
  rejectTemplateId: bigint;
}
export interface MsgUpdateKeyProtoMsg {
  typeUrl: "/warden.warden.v1beta3.MsgUpdateKey";
  value: Uint8Array;
}
export interface MsgUpdateKeyAmino {
  authority?: string;
  key_id?: string;
  approve_template_id?: string;
  reject_template_id?: string;
}
export interface MsgUpdateKeyAminoMsg {
  type: "/warden.warden.v1beta3.MsgUpdateKey";
  value: MsgUpdateKeyAmino;
}
export interface MsgUpdateKeySDKType {
  authority: string;
  key_id: bigint;
  approve_template_id: bigint;
  reject_template_id: bigint;
}
export interface MsgUpdateKeyResponse {}
export interface MsgUpdateKeyResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta3.MsgUpdateKeyResponse";
  value: Uint8Array;
}
export interface MsgUpdateKeyResponseAmino {}
export interface MsgUpdateKeyResponseAminoMsg {
  type: "/warden.warden.v1beta3.MsgUpdateKeyResponse";
  value: MsgUpdateKeyResponseAmino;
}
export interface MsgUpdateKeyResponseSDKType {}
export interface MsgNewSignRequest {
  authority: string;
  keyId: bigint;
  input: Uint8Array;
  analyzers: string[];
  encryptionKey: Uint8Array;
  maxKeychainFees: Coin[];
  nonce: bigint;
  broadcastType: BroadcastType;
}
export interface MsgNewSignRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta3.MsgNewSignRequest";
  value: Uint8Array;
}
export interface MsgNewSignRequestAmino {
  authority?: string;
  key_id?: string;
  input?: string;
  analyzers?: string[];
  encryption_key?: string;
  max_keychain_fees: CoinAmino[];
  nonce?: string;
  broadcast_type?: BroadcastType;
}
export interface MsgNewSignRequestAminoMsg {
  type: "/warden.warden.v1beta3.MsgNewSignRequest";
  value: MsgNewSignRequestAmino;
}
export interface MsgNewSignRequestSDKType {
  authority: string;
  key_id: bigint;
  input: Uint8Array;
  analyzers: string[];
  encryption_key: Uint8Array;
  max_keychain_fees: CoinSDKType[];
  nonce: bigint;
  broadcast_type: BroadcastType;
}
export interface MsgNewSignRequestResponse {
  id: bigint;
}
export interface MsgNewSignRequestResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta3.MsgNewSignRequestResponse";
  value: Uint8Array;
}
export interface MsgNewSignRequestResponseAmino {
  id?: string;
}
export interface MsgNewSignRequestResponseAminoMsg {
  type: "/warden.warden.v1beta3.MsgNewSignRequestResponse";
  value: MsgNewSignRequestResponseAmino;
}
export interface MsgNewSignRequestResponseSDKType {
  id: bigint;
}
export interface MsgSignedData {
  signedData: Uint8Array;
}
export interface MsgSignedDataProtoMsg {
  typeUrl: "/warden.warden.v1beta3.MsgSignedData";
  value: Uint8Array;
}
export interface MsgSignedDataAmino {
  signed_data?: string;
}
export interface MsgSignedDataAminoMsg {
  type: "/warden.warden.v1beta3.MsgSignedData";
  value: MsgSignedDataAmino;
}
export interface MsgSignedDataSDKType {
  signed_data: Uint8Array;
}
export interface MsgFulfilSignRequest {
  creator: string;
  requestId: bigint;
  status: SignRequestStatus;
  payload?: MsgSignedData;
  rejectReason?: string;
}
export interface MsgFulfilSignRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta3.MsgFulfilSignRequest";
  value: Uint8Array;
}
export interface MsgFulfilSignRequestAmino {
  creator?: string;
  request_id?: string;
  status?: SignRequestStatus;
  payload?: MsgSignedDataAmino;
  reject_reason?: string;
}
export interface MsgFulfilSignRequestAminoMsg {
  type: "/warden.warden.v1beta3.MsgFulfilSignRequest";
  value: MsgFulfilSignRequestAmino;
}
export interface MsgFulfilSignRequestSDKType {
  creator: string;
  request_id: bigint;
  status: SignRequestStatus;
  payload?: MsgSignedDataSDKType;
  reject_reason?: string;
}
export interface MsgFulfilSignRequestResponse {}
export interface MsgFulfilSignRequestResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta3.MsgFulfilSignRequestResponse";
  value: Uint8Array;
}
export interface MsgFulfilSignRequestResponseAmino {}
export interface MsgFulfilSignRequestResponseAminoMsg {
  type: "/warden.warden.v1beta3.MsgFulfilSignRequestResponse";
  value: MsgFulfilSignRequestResponseAmino;
}
export interface MsgFulfilSignRequestResponseSDKType {}
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: Params.fromPartial({})
  };
}
export const MsgUpdateParams = {
  typeUrl: "/warden.warden.v1beta3.MsgUpdateParams",
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
  toJSON(message: MsgUpdateParams): JsonSafe<MsgUpdateParams> {
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
      typeUrl: "/warden.warden.v1beta3.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/warden.warden.v1beta3.MsgUpdateParamsResponse",
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
  toJSON(_: MsgUpdateParamsResponse): JsonSafe<MsgUpdateParamsResponse> {
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
      typeUrl: "/warden.warden.v1beta3.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgNewSpace(): MsgNewSpace {
  return {
    creator: "",
    approveAdminTemplateId: BigInt(0),
    rejectAdminTemplateId: BigInt(0),
    approveSignTemplateId: BigInt(0),
    rejectSignTemplateId: BigInt(0),
    additionalOwners: []
  };
}
export const MsgNewSpace = {
  typeUrl: "/warden.warden.v1beta3.MsgNewSpace",
  encode(message: MsgNewSpace, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.approveAdminTemplateId !== BigInt(0)) {
      writer.uint32(16).uint64(message.approveAdminTemplateId);
    }
    if (message.rejectAdminTemplateId !== BigInt(0)) {
      writer.uint32(24).uint64(message.rejectAdminTemplateId);
    }
    if (message.approveSignTemplateId !== BigInt(0)) {
      writer.uint32(32).uint64(message.approveSignTemplateId);
    }
    if (message.rejectSignTemplateId !== BigInt(0)) {
      writer.uint32(40).uint64(message.rejectSignTemplateId);
    }
    for (const v of message.additionalOwners) {
      writer.uint32(50).string(v!);
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
          message.approveAdminTemplateId = reader.uint64();
          break;
        case 3:
          message.rejectAdminTemplateId = reader.uint64();
          break;
        case 4:
          message.approveSignTemplateId = reader.uint64();
          break;
        case 5:
          message.rejectSignTemplateId = reader.uint64();
          break;
        case 6:
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
      approveAdminTemplateId: isSet(object.approveAdminTemplateId) ? BigInt(object.approveAdminTemplateId.toString()) : BigInt(0),
      rejectAdminTemplateId: isSet(object.rejectAdminTemplateId) ? BigInt(object.rejectAdminTemplateId.toString()) : BigInt(0),
      approveSignTemplateId: isSet(object.approveSignTemplateId) ? BigInt(object.approveSignTemplateId.toString()) : BigInt(0),
      rejectSignTemplateId: isSet(object.rejectSignTemplateId) ? BigInt(object.rejectSignTemplateId.toString()) : BigInt(0),
      additionalOwners: Array.isArray(object?.additionalOwners) ? object.additionalOwners.map((e: any) => String(e)) : []
    };
  },
  toJSON(message: MsgNewSpace): JsonSafe<MsgNewSpace> {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.approveAdminTemplateId !== undefined && (obj.approveAdminTemplateId = (message.approveAdminTemplateId || BigInt(0)).toString());
    message.rejectAdminTemplateId !== undefined && (obj.rejectAdminTemplateId = (message.rejectAdminTemplateId || BigInt(0)).toString());
    message.approveSignTemplateId !== undefined && (obj.approveSignTemplateId = (message.approveSignTemplateId || BigInt(0)).toString());
    message.rejectSignTemplateId !== undefined && (obj.rejectSignTemplateId = (message.rejectSignTemplateId || BigInt(0)).toString());
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
    message.approveAdminTemplateId = object.approveAdminTemplateId !== undefined && object.approveAdminTemplateId !== null ? BigInt(object.approveAdminTemplateId.toString()) : BigInt(0);
    message.rejectAdminTemplateId = object.rejectAdminTemplateId !== undefined && object.rejectAdminTemplateId !== null ? BigInt(object.rejectAdminTemplateId.toString()) : BigInt(0);
    message.approveSignTemplateId = object.approveSignTemplateId !== undefined && object.approveSignTemplateId !== null ? BigInt(object.approveSignTemplateId.toString()) : BigInt(0);
    message.rejectSignTemplateId = object.rejectSignTemplateId !== undefined && object.rejectSignTemplateId !== null ? BigInt(object.rejectSignTemplateId.toString()) : BigInt(0);
    message.additionalOwners = object.additionalOwners?.map(e => e) || [];
    return message;
  },
  fromAmino(object: MsgNewSpaceAmino): MsgNewSpace {
    const message = createBaseMsgNewSpace();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.approve_admin_template_id !== undefined && object.approve_admin_template_id !== null) {
      message.approveAdminTemplateId = BigInt(object.approve_admin_template_id);
    }
    if (object.reject_admin_template_id !== undefined && object.reject_admin_template_id !== null) {
      message.rejectAdminTemplateId = BigInt(object.reject_admin_template_id);
    }
    if (object.approve_sign_template_id !== undefined && object.approve_sign_template_id !== null) {
      message.approveSignTemplateId = BigInt(object.approve_sign_template_id);
    }
    if (object.reject_sign_template_id !== undefined && object.reject_sign_template_id !== null) {
      message.rejectSignTemplateId = BigInt(object.reject_sign_template_id);
    }
    message.additionalOwners = object.additional_owners?.map(e => e) || [];
    return message;
  },
  toAmino(message: MsgNewSpace): MsgNewSpaceAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.approve_admin_template_id = message.approveAdminTemplateId !== BigInt(0) ? (message.approveAdminTemplateId?.toString)() : undefined;
    obj.reject_admin_template_id = message.rejectAdminTemplateId !== BigInt(0) ? (message.rejectAdminTemplateId?.toString)() : undefined;
    obj.approve_sign_template_id = message.approveSignTemplateId !== BigInt(0) ? (message.approveSignTemplateId?.toString)() : undefined;
    obj.reject_sign_template_id = message.rejectSignTemplateId !== BigInt(0) ? (message.rejectSignTemplateId?.toString)() : undefined;
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
      typeUrl: "/warden.warden.v1beta3.MsgNewSpace",
      value: MsgNewSpace.encode(message).finish()
    };
  }
};
function createBaseMsgNewSpaceResponse(): MsgNewSpaceResponse {
  return {
    id: BigInt(0)
  };
}
export const MsgNewSpaceResponse = {
  typeUrl: "/warden.warden.v1beta3.MsgNewSpaceResponse",
  encode(message: MsgNewSpaceResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
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
          message.id = reader.uint64();
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
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0)
    };
  },
  toJSON(message: MsgNewSpaceResponse): JsonSafe<MsgNewSpaceResponse> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<MsgNewSpaceResponse>): MsgNewSpaceResponse {
    const message = createBaseMsgNewSpaceResponse();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgNewSpaceResponseAmino): MsgNewSpaceResponse {
    const message = createBaseMsgNewSpaceResponse();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: MsgNewSpaceResponse): MsgNewSpaceResponseAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? (message.id?.toString)() : undefined;
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
      typeUrl: "/warden.warden.v1beta3.MsgNewSpaceResponse",
      value: MsgNewSpaceResponse.encode(message).finish()
    };
  }
};
function createBaseMsgAddSpaceOwner(): MsgAddSpaceOwner {
  return {
    authority: "",
    spaceId: BigInt(0),
    newOwner: "",
    nonce: BigInt(0)
  };
}
export const MsgAddSpaceOwner = {
  typeUrl: "/warden.warden.v1beta3.MsgAddSpaceOwner",
  encode(message: MsgAddSpaceOwner, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.spaceId !== BigInt(0)) {
      writer.uint32(16).uint64(message.spaceId);
    }
    if (message.newOwner !== "") {
      writer.uint32(26).string(message.newOwner);
    }
    if (message.nonce !== BigInt(0)) {
      writer.uint32(32).uint64(message.nonce);
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
          message.authority = reader.string();
          break;
        case 2:
          message.spaceId = reader.uint64();
          break;
        case 3:
          message.newOwner = reader.string();
          break;
        case 4:
          message.nonce = reader.uint64();
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
      authority: isSet(object.authority) ? String(object.authority) : "",
      spaceId: isSet(object.spaceId) ? BigInt(object.spaceId.toString()) : BigInt(0),
      newOwner: isSet(object.newOwner) ? String(object.newOwner) : "",
      nonce: isSet(object.nonce) ? BigInt(object.nonce.toString()) : BigInt(0)
    };
  },
  toJSON(message: MsgAddSpaceOwner): JsonSafe<MsgAddSpaceOwner> {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.spaceId !== undefined && (obj.spaceId = (message.spaceId || BigInt(0)).toString());
    message.newOwner !== undefined && (obj.newOwner = message.newOwner);
    message.nonce !== undefined && (obj.nonce = (message.nonce || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<MsgAddSpaceOwner>): MsgAddSpaceOwner {
    const message = createBaseMsgAddSpaceOwner();
    message.authority = object.authority ?? "";
    message.spaceId = object.spaceId !== undefined && object.spaceId !== null ? BigInt(object.spaceId.toString()) : BigInt(0);
    message.newOwner = object.newOwner ?? "";
    message.nonce = object.nonce !== undefined && object.nonce !== null ? BigInt(object.nonce.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgAddSpaceOwnerAmino): MsgAddSpaceOwner {
    const message = createBaseMsgAddSpaceOwner();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.space_id !== undefined && object.space_id !== null) {
      message.spaceId = BigInt(object.space_id);
    }
    if (object.new_owner !== undefined && object.new_owner !== null) {
      message.newOwner = object.new_owner;
    }
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = BigInt(object.nonce);
    }
    return message;
  },
  toAmino(message: MsgAddSpaceOwner): MsgAddSpaceOwnerAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.space_id = message.spaceId !== BigInt(0) ? (message.spaceId?.toString)() : undefined;
    obj.new_owner = message.newOwner === "" ? undefined : message.newOwner;
    obj.nonce = message.nonce !== BigInt(0) ? (message.nonce?.toString)() : undefined;
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
      typeUrl: "/warden.warden.v1beta3.MsgAddSpaceOwner",
      value: MsgAddSpaceOwner.encode(message).finish()
    };
  }
};
function createBaseMsgAddSpaceOwnerResponse(): MsgAddSpaceOwnerResponse {
  return {};
}
export const MsgAddSpaceOwnerResponse = {
  typeUrl: "/warden.warden.v1beta3.MsgAddSpaceOwnerResponse",
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
  toJSON(_: MsgAddSpaceOwnerResponse): JsonSafe<MsgAddSpaceOwnerResponse> {
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
      typeUrl: "/warden.warden.v1beta3.MsgAddSpaceOwnerResponse",
      value: MsgAddSpaceOwnerResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRemoveSpaceOwner(): MsgRemoveSpaceOwner {
  return {
    authority: "",
    spaceId: BigInt(0),
    owner: "",
    nonce: BigInt(0)
  };
}
export const MsgRemoveSpaceOwner = {
  typeUrl: "/warden.warden.v1beta3.MsgRemoveSpaceOwner",
  encode(message: MsgRemoveSpaceOwner, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.spaceId !== BigInt(0)) {
      writer.uint32(16).uint64(message.spaceId);
    }
    if (message.owner !== "") {
      writer.uint32(26).string(message.owner);
    }
    if (message.nonce !== BigInt(0)) {
      writer.uint32(32).uint64(message.nonce);
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
          message.authority = reader.string();
          break;
        case 2:
          message.spaceId = reader.uint64();
          break;
        case 3:
          message.owner = reader.string();
          break;
        case 4:
          message.nonce = reader.uint64();
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
      authority: isSet(object.authority) ? String(object.authority) : "",
      spaceId: isSet(object.spaceId) ? BigInt(object.spaceId.toString()) : BigInt(0),
      owner: isSet(object.owner) ? String(object.owner) : "",
      nonce: isSet(object.nonce) ? BigInt(object.nonce.toString()) : BigInt(0)
    };
  },
  toJSON(message: MsgRemoveSpaceOwner): JsonSafe<MsgRemoveSpaceOwner> {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.spaceId !== undefined && (obj.spaceId = (message.spaceId || BigInt(0)).toString());
    message.owner !== undefined && (obj.owner = message.owner);
    message.nonce !== undefined && (obj.nonce = (message.nonce || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<MsgRemoveSpaceOwner>): MsgRemoveSpaceOwner {
    const message = createBaseMsgRemoveSpaceOwner();
    message.authority = object.authority ?? "";
    message.spaceId = object.spaceId !== undefined && object.spaceId !== null ? BigInt(object.spaceId.toString()) : BigInt(0);
    message.owner = object.owner ?? "";
    message.nonce = object.nonce !== undefined && object.nonce !== null ? BigInt(object.nonce.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgRemoveSpaceOwnerAmino): MsgRemoveSpaceOwner {
    const message = createBaseMsgRemoveSpaceOwner();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.space_id !== undefined && object.space_id !== null) {
      message.spaceId = BigInt(object.space_id);
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    }
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = BigInt(object.nonce);
    }
    return message;
  },
  toAmino(message: MsgRemoveSpaceOwner): MsgRemoveSpaceOwnerAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.space_id = message.spaceId !== BigInt(0) ? (message.spaceId?.toString)() : undefined;
    obj.owner = message.owner === "" ? undefined : message.owner;
    obj.nonce = message.nonce !== BigInt(0) ? (message.nonce?.toString)() : undefined;
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
      typeUrl: "/warden.warden.v1beta3.MsgRemoveSpaceOwner",
      value: MsgRemoveSpaceOwner.encode(message).finish()
    };
  }
};
function createBaseMsgRemoveSpaceOwnerResponse(): MsgRemoveSpaceOwnerResponse {
  return {};
}
export const MsgRemoveSpaceOwnerResponse = {
  typeUrl: "/warden.warden.v1beta3.MsgRemoveSpaceOwnerResponse",
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
  toJSON(_: MsgRemoveSpaceOwnerResponse): JsonSafe<MsgRemoveSpaceOwnerResponse> {
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
      typeUrl: "/warden.warden.v1beta3.MsgRemoveSpaceOwnerResponse",
      value: MsgRemoveSpaceOwnerResponse.encode(message).finish()
    };
  }
};
function createBaseMsgNewKeychain(): MsgNewKeychain {
  return {
    creator: "",
    name: "",
    keychainFees: KeychainFees.fromPartial({}),
    description: "",
    url: "",
    keybaseId: ""
  };
}
export const MsgNewKeychain = {
  typeUrl: "/warden.warden.v1beta3.MsgNewKeychain",
  encode(message: MsgNewKeychain, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.keychainFees !== undefined) {
      KeychainFees.encode(message.keychainFees, writer.uint32(34).fork()).ldelim();
    }
    if (message.description !== "") {
      writer.uint32(42).string(message.description);
    }
    if (message.url !== "") {
      writer.uint32(50).string(message.url);
    }
    if (message.keybaseId !== "") {
      writer.uint32(58).string(message.keybaseId);
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
          message.name = reader.string();
          break;
        case 4:
          message.keychainFees = KeychainFees.decode(reader, reader.uint32());
          break;
        case 5:
          message.description = reader.string();
          break;
        case 6:
          message.url = reader.string();
          break;
        case 7:
          message.keybaseId = reader.string();
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
      name: isSet(object.name) ? String(object.name) : "",
      keychainFees: isSet(object.keychainFees) ? KeychainFees.fromJSON(object.keychainFees) : undefined,
      description: isSet(object.description) ? String(object.description) : "",
      url: isSet(object.url) ? String(object.url) : "",
      keybaseId: isSet(object.keybaseId) ? String(object.keybaseId) : ""
    };
  },
  toJSON(message: MsgNewKeychain): JsonSafe<MsgNewKeychain> {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.name !== undefined && (obj.name = message.name);
    message.keychainFees !== undefined && (obj.keychainFees = message.keychainFees ? KeychainFees.toJSON(message.keychainFees) : undefined);
    message.description !== undefined && (obj.description = message.description);
    message.url !== undefined && (obj.url = message.url);
    message.keybaseId !== undefined && (obj.keybaseId = message.keybaseId);
    return obj;
  },
  fromPartial(object: Partial<MsgNewKeychain>): MsgNewKeychain {
    const message = createBaseMsgNewKeychain();
    message.creator = object.creator ?? "";
    message.name = object.name ?? "";
    message.keychainFees = object.keychainFees !== undefined && object.keychainFees !== null ? KeychainFees.fromPartial(object.keychainFees) : undefined;
    message.description = object.description ?? "";
    message.url = object.url ?? "";
    message.keybaseId = object.keybaseId ?? "";
    return message;
  },
  fromAmino(object: MsgNewKeychainAmino): MsgNewKeychain {
    const message = createBaseMsgNewKeychain();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    if (object.keychain_fees !== undefined && object.keychain_fees !== null) {
      message.keychainFees = KeychainFees.fromAmino(object.keychain_fees);
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.url !== undefined && object.url !== null) {
      message.url = object.url;
    }
    if (object.keybase_id !== undefined && object.keybase_id !== null) {
      message.keybaseId = object.keybase_id;
    }
    return message;
  },
  toAmino(message: MsgNewKeychain): MsgNewKeychainAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.name = message.name === "" ? undefined : message.name;
    obj.keychain_fees = message.keychainFees ? KeychainFees.toAmino(message.keychainFees) : undefined;
    obj.description = message.description === "" ? undefined : message.description;
    obj.url = message.url === "" ? undefined : message.url;
    obj.keybase_id = message.keybaseId === "" ? undefined : message.keybaseId;
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
      typeUrl: "/warden.warden.v1beta3.MsgNewKeychain",
      value: MsgNewKeychain.encode(message).finish()
    };
  }
};
function createBaseMsgNewKeychainResponse(): MsgNewKeychainResponse {
  return {
    id: BigInt(0)
  };
}
export const MsgNewKeychainResponse = {
  typeUrl: "/warden.warden.v1beta3.MsgNewKeychainResponse",
  encode(message: MsgNewKeychainResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
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
          message.id = reader.uint64();
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
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0)
    };
  },
  toJSON(message: MsgNewKeychainResponse): JsonSafe<MsgNewKeychainResponse> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<MsgNewKeychainResponse>): MsgNewKeychainResponse {
    const message = createBaseMsgNewKeychainResponse();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgNewKeychainResponseAmino): MsgNewKeychainResponse {
    const message = createBaseMsgNewKeychainResponse();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: MsgNewKeychainResponse): MsgNewKeychainResponseAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? (message.id?.toString)() : undefined;
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
      typeUrl: "/warden.warden.v1beta3.MsgNewKeychainResponse",
      value: MsgNewKeychainResponse.encode(message).finish()
    };
  }
};
function createBaseMsgAddKeychainWriter(): MsgAddKeychainWriter {
  return {
    creator: "",
    keychainId: BigInt(0),
    writer: ""
  };
}
export const MsgAddKeychainWriter = {
  typeUrl: "/warden.warden.v1beta3.MsgAddKeychainWriter",
  encode(message: MsgAddKeychainWriter, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.keychainId !== BigInt(0)) {
      writer.uint32(16).uint64(message.keychainId);
    }
    if (message.writer !== "") {
      writer.uint32(26).string(message.writer);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgAddKeychainWriter {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddKeychainWriter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.keychainId = reader.uint64();
          break;
        case 3:
          message.writer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgAddKeychainWriter {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      keychainId: isSet(object.keychainId) ? BigInt(object.keychainId.toString()) : BigInt(0),
      writer: isSet(object.writer) ? String(object.writer) : ""
    };
  },
  toJSON(message: MsgAddKeychainWriter): JsonSafe<MsgAddKeychainWriter> {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.keychainId !== undefined && (obj.keychainId = (message.keychainId || BigInt(0)).toString());
    message.writer !== undefined && (obj.writer = message.writer);
    return obj;
  },
  fromPartial(object: Partial<MsgAddKeychainWriter>): MsgAddKeychainWriter {
    const message = createBaseMsgAddKeychainWriter();
    message.creator = object.creator ?? "";
    message.keychainId = object.keychainId !== undefined && object.keychainId !== null ? BigInt(object.keychainId.toString()) : BigInt(0);
    message.writer = object.writer ?? "";
    return message;
  },
  fromAmino(object: MsgAddKeychainWriterAmino): MsgAddKeychainWriter {
    const message = createBaseMsgAddKeychainWriter();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.keychain_id !== undefined && object.keychain_id !== null) {
      message.keychainId = BigInt(object.keychain_id);
    }
    if (object.writer !== undefined && object.writer !== null) {
      message.writer = object.writer;
    }
    return message;
  },
  toAmino(message: MsgAddKeychainWriter): MsgAddKeychainWriterAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.keychain_id = message.keychainId !== BigInt(0) ? (message.keychainId?.toString)() : undefined;
    obj.writer = message.writer === "" ? undefined : message.writer;
    return obj;
  },
  fromAminoMsg(object: MsgAddKeychainWriterAminoMsg): MsgAddKeychainWriter {
    return MsgAddKeychainWriter.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAddKeychainWriterProtoMsg): MsgAddKeychainWriter {
    return MsgAddKeychainWriter.decode(message.value);
  },
  toProto(message: MsgAddKeychainWriter): Uint8Array {
    return MsgAddKeychainWriter.encode(message).finish();
  },
  toProtoMsg(message: MsgAddKeychainWriter): MsgAddKeychainWriterProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.MsgAddKeychainWriter",
      value: MsgAddKeychainWriter.encode(message).finish()
    };
  }
};
function createBaseMsgAddKeychainWriterResponse(): MsgAddKeychainWriterResponse {
  return {};
}
export const MsgAddKeychainWriterResponse = {
  typeUrl: "/warden.warden.v1beta3.MsgAddKeychainWriterResponse",
  encode(_: MsgAddKeychainWriterResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgAddKeychainWriterResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddKeychainWriterResponse();
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
  fromJSON(_: any): MsgAddKeychainWriterResponse {
    return {};
  },
  toJSON(_: MsgAddKeychainWriterResponse): JsonSafe<MsgAddKeychainWriterResponse> {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<MsgAddKeychainWriterResponse>): MsgAddKeychainWriterResponse {
    const message = createBaseMsgAddKeychainWriterResponse();
    return message;
  },
  fromAmino(_: MsgAddKeychainWriterResponseAmino): MsgAddKeychainWriterResponse {
    const message = createBaseMsgAddKeychainWriterResponse();
    return message;
  },
  toAmino(_: MsgAddKeychainWriterResponse): MsgAddKeychainWriterResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgAddKeychainWriterResponseAminoMsg): MsgAddKeychainWriterResponse {
    return MsgAddKeychainWriterResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAddKeychainWriterResponseProtoMsg): MsgAddKeychainWriterResponse {
    return MsgAddKeychainWriterResponse.decode(message.value);
  },
  toProto(message: MsgAddKeychainWriterResponse): Uint8Array {
    return MsgAddKeychainWriterResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgAddKeychainWriterResponse): MsgAddKeychainWriterResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.MsgAddKeychainWriterResponse",
      value: MsgAddKeychainWriterResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateSpace(): MsgUpdateSpace {
  return {
    authority: "",
    spaceId: BigInt(0),
    nonce: BigInt(0),
    approveAdminTemplateId: BigInt(0),
    rejectAdminTemplateId: BigInt(0),
    approveSignTemplateId: BigInt(0),
    rejectSignTemplateId: BigInt(0)
  };
}
export const MsgUpdateSpace = {
  typeUrl: "/warden.warden.v1beta3.MsgUpdateSpace",
  encode(message: MsgUpdateSpace, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.spaceId !== BigInt(0)) {
      writer.uint32(16).uint64(message.spaceId);
    }
    if (message.nonce !== BigInt(0)) {
      writer.uint32(24).uint64(message.nonce);
    }
    if (message.approveAdminTemplateId !== BigInt(0)) {
      writer.uint32(32).uint64(message.approveAdminTemplateId);
    }
    if (message.rejectAdminTemplateId !== BigInt(0)) {
      writer.uint32(40).uint64(message.rejectAdminTemplateId);
    }
    if (message.approveSignTemplateId !== BigInt(0)) {
      writer.uint32(48).uint64(message.approveSignTemplateId);
    }
    if (message.rejectSignTemplateId !== BigInt(0)) {
      writer.uint32(56).uint64(message.rejectSignTemplateId);
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
          message.authority = reader.string();
          break;
        case 2:
          message.spaceId = reader.uint64();
          break;
        case 3:
          message.nonce = reader.uint64();
          break;
        case 4:
          message.approveAdminTemplateId = reader.uint64();
          break;
        case 5:
          message.rejectAdminTemplateId = reader.uint64();
          break;
        case 6:
          message.approveSignTemplateId = reader.uint64();
          break;
        case 7:
          message.rejectSignTemplateId = reader.uint64();
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
      authority: isSet(object.authority) ? String(object.authority) : "",
      spaceId: isSet(object.spaceId) ? BigInt(object.spaceId.toString()) : BigInt(0),
      nonce: isSet(object.nonce) ? BigInt(object.nonce.toString()) : BigInt(0),
      approveAdminTemplateId: isSet(object.approveAdminTemplateId) ? BigInt(object.approveAdminTemplateId.toString()) : BigInt(0),
      rejectAdminTemplateId: isSet(object.rejectAdminTemplateId) ? BigInt(object.rejectAdminTemplateId.toString()) : BigInt(0),
      approveSignTemplateId: isSet(object.approveSignTemplateId) ? BigInt(object.approveSignTemplateId.toString()) : BigInt(0),
      rejectSignTemplateId: isSet(object.rejectSignTemplateId) ? BigInt(object.rejectSignTemplateId.toString()) : BigInt(0)
    };
  },
  toJSON(message: MsgUpdateSpace): JsonSafe<MsgUpdateSpace> {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.spaceId !== undefined && (obj.spaceId = (message.spaceId || BigInt(0)).toString());
    message.nonce !== undefined && (obj.nonce = (message.nonce || BigInt(0)).toString());
    message.approveAdminTemplateId !== undefined && (obj.approveAdminTemplateId = (message.approveAdminTemplateId || BigInt(0)).toString());
    message.rejectAdminTemplateId !== undefined && (obj.rejectAdminTemplateId = (message.rejectAdminTemplateId || BigInt(0)).toString());
    message.approveSignTemplateId !== undefined && (obj.approveSignTemplateId = (message.approveSignTemplateId || BigInt(0)).toString());
    message.rejectSignTemplateId !== undefined && (obj.rejectSignTemplateId = (message.rejectSignTemplateId || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<MsgUpdateSpace>): MsgUpdateSpace {
    const message = createBaseMsgUpdateSpace();
    message.authority = object.authority ?? "";
    message.spaceId = object.spaceId !== undefined && object.spaceId !== null ? BigInt(object.spaceId.toString()) : BigInt(0);
    message.nonce = object.nonce !== undefined && object.nonce !== null ? BigInt(object.nonce.toString()) : BigInt(0);
    message.approveAdminTemplateId = object.approveAdminTemplateId !== undefined && object.approveAdminTemplateId !== null ? BigInt(object.approveAdminTemplateId.toString()) : BigInt(0);
    message.rejectAdminTemplateId = object.rejectAdminTemplateId !== undefined && object.rejectAdminTemplateId !== null ? BigInt(object.rejectAdminTemplateId.toString()) : BigInt(0);
    message.approveSignTemplateId = object.approveSignTemplateId !== undefined && object.approveSignTemplateId !== null ? BigInt(object.approveSignTemplateId.toString()) : BigInt(0);
    message.rejectSignTemplateId = object.rejectSignTemplateId !== undefined && object.rejectSignTemplateId !== null ? BigInt(object.rejectSignTemplateId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgUpdateSpaceAmino): MsgUpdateSpace {
    const message = createBaseMsgUpdateSpace();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.space_id !== undefined && object.space_id !== null) {
      message.spaceId = BigInt(object.space_id);
    }
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = BigInt(object.nonce);
    }
    if (object.approve_admin_template_id !== undefined && object.approve_admin_template_id !== null) {
      message.approveAdminTemplateId = BigInt(object.approve_admin_template_id);
    }
    if (object.reject_admin_template_id !== undefined && object.reject_admin_template_id !== null) {
      message.rejectAdminTemplateId = BigInt(object.reject_admin_template_id);
    }
    if (object.approve_sign_template_id !== undefined && object.approve_sign_template_id !== null) {
      message.approveSignTemplateId = BigInt(object.approve_sign_template_id);
    }
    if (object.reject_sign_template_id !== undefined && object.reject_sign_template_id !== null) {
      message.rejectSignTemplateId = BigInt(object.reject_sign_template_id);
    }
    return message;
  },
  toAmino(message: MsgUpdateSpace): MsgUpdateSpaceAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.space_id = message.spaceId !== BigInt(0) ? (message.spaceId?.toString)() : undefined;
    obj.nonce = message.nonce !== BigInt(0) ? (message.nonce?.toString)() : undefined;
    obj.approve_admin_template_id = message.approveAdminTemplateId !== BigInt(0) ? (message.approveAdminTemplateId?.toString)() : undefined;
    obj.reject_admin_template_id = message.rejectAdminTemplateId !== BigInt(0) ? (message.rejectAdminTemplateId?.toString)() : undefined;
    obj.approve_sign_template_id = message.approveSignTemplateId !== BigInt(0) ? (message.approveSignTemplateId?.toString)() : undefined;
    obj.reject_sign_template_id = message.rejectSignTemplateId !== BigInt(0) ? (message.rejectSignTemplateId?.toString)() : undefined;
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
      typeUrl: "/warden.warden.v1beta3.MsgUpdateSpace",
      value: MsgUpdateSpace.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateSpaceResponse(): MsgUpdateSpaceResponse {
  return {};
}
export const MsgUpdateSpaceResponse = {
  typeUrl: "/warden.warden.v1beta3.MsgUpdateSpaceResponse",
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
  toJSON(_: MsgUpdateSpaceResponse): JsonSafe<MsgUpdateSpaceResponse> {
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
      typeUrl: "/warden.warden.v1beta3.MsgUpdateSpaceResponse",
      value: MsgUpdateSpaceResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateKeychain(): MsgUpdateKeychain {
  return {
    creator: "",
    keychainId: BigInt(0),
    name: "",
    keychainFees: KeychainFees.fromPartial({}),
    description: "",
    url: "",
    keybaseId: ""
  };
}
export const MsgUpdateKeychain = {
  typeUrl: "/warden.warden.v1beta3.MsgUpdateKeychain",
  encode(message: MsgUpdateKeychain, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.keychainId !== BigInt(0)) {
      writer.uint32(16).uint64(message.keychainId);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.keychainFees !== undefined) {
      KeychainFees.encode(message.keychainFees, writer.uint32(42).fork()).ldelim();
    }
    if (message.description !== "") {
      writer.uint32(50).string(message.description);
    }
    if (message.url !== "") {
      writer.uint32(58).string(message.url);
    }
    if (message.keybaseId !== "") {
      writer.uint32(66).string(message.keybaseId);
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
          message.keychainId = reader.uint64();
          break;
        case 3:
          message.name = reader.string();
          break;
        case 5:
          message.keychainFees = KeychainFees.decode(reader, reader.uint32());
          break;
        case 6:
          message.description = reader.string();
          break;
        case 7:
          message.url = reader.string();
          break;
        case 8:
          message.keybaseId = reader.string();
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
      keychainId: isSet(object.keychainId) ? BigInt(object.keychainId.toString()) : BigInt(0),
      name: isSet(object.name) ? String(object.name) : "",
      keychainFees: isSet(object.keychainFees) ? KeychainFees.fromJSON(object.keychainFees) : undefined,
      description: isSet(object.description) ? String(object.description) : "",
      url: isSet(object.url) ? String(object.url) : "",
      keybaseId: isSet(object.keybaseId) ? String(object.keybaseId) : ""
    };
  },
  toJSON(message: MsgUpdateKeychain): JsonSafe<MsgUpdateKeychain> {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.keychainId !== undefined && (obj.keychainId = (message.keychainId || BigInt(0)).toString());
    message.name !== undefined && (obj.name = message.name);
    message.keychainFees !== undefined && (obj.keychainFees = message.keychainFees ? KeychainFees.toJSON(message.keychainFees) : undefined);
    message.description !== undefined && (obj.description = message.description);
    message.url !== undefined && (obj.url = message.url);
    message.keybaseId !== undefined && (obj.keybaseId = message.keybaseId);
    return obj;
  },
  fromPartial(object: Partial<MsgUpdateKeychain>): MsgUpdateKeychain {
    const message = createBaseMsgUpdateKeychain();
    message.creator = object.creator ?? "";
    message.keychainId = object.keychainId !== undefined && object.keychainId !== null ? BigInt(object.keychainId.toString()) : BigInt(0);
    message.name = object.name ?? "";
    message.keychainFees = object.keychainFees !== undefined && object.keychainFees !== null ? KeychainFees.fromPartial(object.keychainFees) : undefined;
    message.description = object.description ?? "";
    message.url = object.url ?? "";
    message.keybaseId = object.keybaseId ?? "";
    return message;
  },
  fromAmino(object: MsgUpdateKeychainAmino): MsgUpdateKeychain {
    const message = createBaseMsgUpdateKeychain();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.keychain_id !== undefined && object.keychain_id !== null) {
      message.keychainId = BigInt(object.keychain_id);
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    if (object.keychain_fees !== undefined && object.keychain_fees !== null) {
      message.keychainFees = KeychainFees.fromAmino(object.keychain_fees);
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.url !== undefined && object.url !== null) {
      message.url = object.url;
    }
    if (object.keybase_id !== undefined && object.keybase_id !== null) {
      message.keybaseId = object.keybase_id;
    }
    return message;
  },
  toAmino(message: MsgUpdateKeychain): MsgUpdateKeychainAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.keychain_id = message.keychainId !== BigInt(0) ? (message.keychainId?.toString)() : undefined;
    obj.name = message.name === "" ? undefined : message.name;
    obj.keychain_fees = message.keychainFees ? KeychainFees.toAmino(message.keychainFees) : undefined;
    obj.description = message.description === "" ? undefined : message.description;
    obj.url = message.url === "" ? undefined : message.url;
    obj.keybase_id = message.keybaseId === "" ? undefined : message.keybaseId;
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
      typeUrl: "/warden.warden.v1beta3.MsgUpdateKeychain",
      value: MsgUpdateKeychain.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateKeychainResponse(): MsgUpdateKeychainResponse {
  return {};
}
export const MsgUpdateKeychainResponse = {
  typeUrl: "/warden.warden.v1beta3.MsgUpdateKeychainResponse",
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
  toJSON(_: MsgUpdateKeychainResponse): JsonSafe<MsgUpdateKeychainResponse> {
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
      typeUrl: "/warden.warden.v1beta3.MsgUpdateKeychainResponse",
      value: MsgUpdateKeychainResponse.encode(message).finish()
    };
  }
};
function createBaseMsgAddKeychainAdminRequest(): MsgAddKeychainAdminRequest {
  return {
    authority: "",
    keychainId: BigInt(0),
    newAdmin: ""
  };
}
export const MsgAddKeychainAdminRequest = {
  typeUrl: "/warden.warden.v1beta3.MsgAddKeychainAdminRequest",
  encode(message: MsgAddKeychainAdminRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.keychainId !== BigInt(0)) {
      writer.uint32(16).uint64(message.keychainId);
    }
    if (message.newAdmin !== "") {
      writer.uint32(26).string(message.newAdmin);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgAddKeychainAdminRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddKeychainAdminRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.keychainId = reader.uint64();
          break;
        case 3:
          message.newAdmin = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgAddKeychainAdminRequest {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      keychainId: isSet(object.keychainId) ? BigInt(object.keychainId.toString()) : BigInt(0),
      newAdmin: isSet(object.newAdmin) ? String(object.newAdmin) : ""
    };
  },
  toJSON(message: MsgAddKeychainAdminRequest): JsonSafe<MsgAddKeychainAdminRequest> {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.keychainId !== undefined && (obj.keychainId = (message.keychainId || BigInt(0)).toString());
    message.newAdmin !== undefined && (obj.newAdmin = message.newAdmin);
    return obj;
  },
  fromPartial(object: Partial<MsgAddKeychainAdminRequest>): MsgAddKeychainAdminRequest {
    const message = createBaseMsgAddKeychainAdminRequest();
    message.authority = object.authority ?? "";
    message.keychainId = object.keychainId !== undefined && object.keychainId !== null ? BigInt(object.keychainId.toString()) : BigInt(0);
    message.newAdmin = object.newAdmin ?? "";
    return message;
  },
  fromAmino(object: MsgAddKeychainAdminRequestAmino): MsgAddKeychainAdminRequest {
    const message = createBaseMsgAddKeychainAdminRequest();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.keychain_id !== undefined && object.keychain_id !== null) {
      message.keychainId = BigInt(object.keychain_id);
    }
    if (object.new_admin !== undefined && object.new_admin !== null) {
      message.newAdmin = object.new_admin;
    }
    return message;
  },
  toAmino(message: MsgAddKeychainAdminRequest): MsgAddKeychainAdminRequestAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.keychain_id = message.keychainId !== BigInt(0) ? (message.keychainId?.toString)() : undefined;
    obj.new_admin = message.newAdmin === "" ? undefined : message.newAdmin;
    return obj;
  },
  fromAminoMsg(object: MsgAddKeychainAdminRequestAminoMsg): MsgAddKeychainAdminRequest {
    return MsgAddKeychainAdminRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAddKeychainAdminRequestProtoMsg): MsgAddKeychainAdminRequest {
    return MsgAddKeychainAdminRequest.decode(message.value);
  },
  toProto(message: MsgAddKeychainAdminRequest): Uint8Array {
    return MsgAddKeychainAdminRequest.encode(message).finish();
  },
  toProtoMsg(message: MsgAddKeychainAdminRequest): MsgAddKeychainAdminRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.MsgAddKeychainAdminRequest",
      value: MsgAddKeychainAdminRequest.encode(message).finish()
    };
  }
};
function createBaseMsgAddKeychainAdminResponse(): MsgAddKeychainAdminResponse {
  return {};
}
export const MsgAddKeychainAdminResponse = {
  typeUrl: "/warden.warden.v1beta3.MsgAddKeychainAdminResponse",
  encode(_: MsgAddKeychainAdminResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgAddKeychainAdminResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddKeychainAdminResponse();
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
  fromJSON(_: any): MsgAddKeychainAdminResponse {
    return {};
  },
  toJSON(_: MsgAddKeychainAdminResponse): JsonSafe<MsgAddKeychainAdminResponse> {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<MsgAddKeychainAdminResponse>): MsgAddKeychainAdminResponse {
    const message = createBaseMsgAddKeychainAdminResponse();
    return message;
  },
  fromAmino(_: MsgAddKeychainAdminResponseAmino): MsgAddKeychainAdminResponse {
    const message = createBaseMsgAddKeychainAdminResponse();
    return message;
  },
  toAmino(_: MsgAddKeychainAdminResponse): MsgAddKeychainAdminResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgAddKeychainAdminResponseAminoMsg): MsgAddKeychainAdminResponse {
    return MsgAddKeychainAdminResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAddKeychainAdminResponseProtoMsg): MsgAddKeychainAdminResponse {
    return MsgAddKeychainAdminResponse.decode(message.value);
  },
  toProto(message: MsgAddKeychainAdminResponse): Uint8Array {
    return MsgAddKeychainAdminResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgAddKeychainAdminResponse): MsgAddKeychainAdminResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.MsgAddKeychainAdminResponse",
      value: MsgAddKeychainAdminResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRemoveKeychainAdminRequest(): MsgRemoveKeychainAdminRequest {
  return {
    authority: "",
    keychainId: BigInt(0),
    admin: ""
  };
}
export const MsgRemoveKeychainAdminRequest = {
  typeUrl: "/warden.warden.v1beta3.MsgRemoveKeychainAdminRequest",
  encode(message: MsgRemoveKeychainAdminRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.keychainId !== BigInt(0)) {
      writer.uint32(16).uint64(message.keychainId);
    }
    if (message.admin !== "") {
      writer.uint32(26).string(message.admin);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgRemoveKeychainAdminRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveKeychainAdminRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.keychainId = reader.uint64();
          break;
        case 3:
          message.admin = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgRemoveKeychainAdminRequest {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      keychainId: isSet(object.keychainId) ? BigInt(object.keychainId.toString()) : BigInt(0),
      admin: isSet(object.admin) ? String(object.admin) : ""
    };
  },
  toJSON(message: MsgRemoveKeychainAdminRequest): JsonSafe<MsgRemoveKeychainAdminRequest> {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.keychainId !== undefined && (obj.keychainId = (message.keychainId || BigInt(0)).toString());
    message.admin !== undefined && (obj.admin = message.admin);
    return obj;
  },
  fromPartial(object: Partial<MsgRemoveKeychainAdminRequest>): MsgRemoveKeychainAdminRequest {
    const message = createBaseMsgRemoveKeychainAdminRequest();
    message.authority = object.authority ?? "";
    message.keychainId = object.keychainId !== undefined && object.keychainId !== null ? BigInt(object.keychainId.toString()) : BigInt(0);
    message.admin = object.admin ?? "";
    return message;
  },
  fromAmino(object: MsgRemoveKeychainAdminRequestAmino): MsgRemoveKeychainAdminRequest {
    const message = createBaseMsgRemoveKeychainAdminRequest();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.keychain_id !== undefined && object.keychain_id !== null) {
      message.keychainId = BigInt(object.keychain_id);
    }
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = object.admin;
    }
    return message;
  },
  toAmino(message: MsgRemoveKeychainAdminRequest): MsgRemoveKeychainAdminRequestAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.keychain_id = message.keychainId !== BigInt(0) ? (message.keychainId?.toString)() : undefined;
    obj.admin = message.admin === "" ? undefined : message.admin;
    return obj;
  },
  fromAminoMsg(object: MsgRemoveKeychainAdminRequestAminoMsg): MsgRemoveKeychainAdminRequest {
    return MsgRemoveKeychainAdminRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRemoveKeychainAdminRequestProtoMsg): MsgRemoveKeychainAdminRequest {
    return MsgRemoveKeychainAdminRequest.decode(message.value);
  },
  toProto(message: MsgRemoveKeychainAdminRequest): Uint8Array {
    return MsgRemoveKeychainAdminRequest.encode(message).finish();
  },
  toProtoMsg(message: MsgRemoveKeychainAdminRequest): MsgRemoveKeychainAdminRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.MsgRemoveKeychainAdminRequest",
      value: MsgRemoveKeychainAdminRequest.encode(message).finish()
    };
  }
};
function createBaseMsgRemoveKeychainAdminResponse(): MsgRemoveKeychainAdminResponse {
  return {};
}
export const MsgRemoveKeychainAdminResponse = {
  typeUrl: "/warden.warden.v1beta3.MsgRemoveKeychainAdminResponse",
  encode(_: MsgRemoveKeychainAdminResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgRemoveKeychainAdminResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveKeychainAdminResponse();
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
  fromJSON(_: any): MsgRemoveKeychainAdminResponse {
    return {};
  },
  toJSON(_: MsgRemoveKeychainAdminResponse): JsonSafe<MsgRemoveKeychainAdminResponse> {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<MsgRemoveKeychainAdminResponse>): MsgRemoveKeychainAdminResponse {
    const message = createBaseMsgRemoveKeychainAdminResponse();
    return message;
  },
  fromAmino(_: MsgRemoveKeychainAdminResponseAmino): MsgRemoveKeychainAdminResponse {
    const message = createBaseMsgRemoveKeychainAdminResponse();
    return message;
  },
  toAmino(_: MsgRemoveKeychainAdminResponse): MsgRemoveKeychainAdminResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRemoveKeychainAdminResponseAminoMsg): MsgRemoveKeychainAdminResponse {
    return MsgRemoveKeychainAdminResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRemoveKeychainAdminResponseProtoMsg): MsgRemoveKeychainAdminResponse {
    return MsgRemoveKeychainAdminResponse.decode(message.value);
  },
  toProto(message: MsgRemoveKeychainAdminResponse): Uint8Array {
    return MsgRemoveKeychainAdminResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRemoveKeychainAdminResponse): MsgRemoveKeychainAdminResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.MsgRemoveKeychainAdminResponse",
      value: MsgRemoveKeychainAdminResponse.encode(message).finish()
    };
  }
};
function createBaseMsgNewKeyRequest(): MsgNewKeyRequest {
  return {
    authority: "",
    spaceId: BigInt(0),
    keychainId: BigInt(0),
    keyType: 0,
    approveTemplateId: BigInt(0),
    rejectTemplateId: BigInt(0),
    maxKeychainFees: [],
    nonce: BigInt(0)
  };
}
export const MsgNewKeyRequest = {
  typeUrl: "/warden.warden.v1beta3.MsgNewKeyRequest",
  encode(message: MsgNewKeyRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.spaceId !== BigInt(0)) {
      writer.uint32(16).uint64(message.spaceId);
    }
    if (message.keychainId !== BigInt(0)) {
      writer.uint32(24).uint64(message.keychainId);
    }
    if (message.keyType !== 0) {
      writer.uint32(32).int32(message.keyType);
    }
    if (message.approveTemplateId !== BigInt(0)) {
      writer.uint32(40).uint64(message.approveTemplateId);
    }
    if (message.rejectTemplateId !== BigInt(0)) {
      writer.uint32(48).uint64(message.rejectTemplateId);
    }
    for (const v of message.maxKeychainFees) {
      Coin.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.nonce !== BigInt(0)) {
      writer.uint32(64).uint64(message.nonce);
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
          message.authority = reader.string();
          break;
        case 2:
          message.spaceId = reader.uint64();
          break;
        case 3:
          message.keychainId = reader.uint64();
          break;
        case 4:
          message.keyType = reader.int32() as any;
          break;
        case 5:
          message.approveTemplateId = reader.uint64();
          break;
        case 6:
          message.rejectTemplateId = reader.uint64();
          break;
        case 7:
          message.maxKeychainFees.push(Coin.decode(reader, reader.uint32()));
          break;
        case 8:
          message.nonce = reader.uint64();
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
      authority: isSet(object.authority) ? String(object.authority) : "",
      spaceId: isSet(object.spaceId) ? BigInt(object.spaceId.toString()) : BigInt(0),
      keychainId: isSet(object.keychainId) ? BigInt(object.keychainId.toString()) : BigInt(0),
      keyType: isSet(object.keyType) ? keyTypeFromJSON(object.keyType) : -1,
      approveTemplateId: isSet(object.approveTemplateId) ? BigInt(object.approveTemplateId.toString()) : BigInt(0),
      rejectTemplateId: isSet(object.rejectTemplateId) ? BigInt(object.rejectTemplateId.toString()) : BigInt(0),
      maxKeychainFees: Array.isArray(object?.maxKeychainFees) ? object.maxKeychainFees.map((e: any) => Coin.fromJSON(e)) : [],
      nonce: isSet(object.nonce) ? BigInt(object.nonce.toString()) : BigInt(0)
    };
  },
  toJSON(message: MsgNewKeyRequest): JsonSafe<MsgNewKeyRequest> {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.spaceId !== undefined && (obj.spaceId = (message.spaceId || BigInt(0)).toString());
    message.keychainId !== undefined && (obj.keychainId = (message.keychainId || BigInt(0)).toString());
    message.keyType !== undefined && (obj.keyType = keyTypeToJSON(message.keyType));
    message.approveTemplateId !== undefined && (obj.approveTemplateId = (message.approveTemplateId || BigInt(0)).toString());
    message.rejectTemplateId !== undefined && (obj.rejectTemplateId = (message.rejectTemplateId || BigInt(0)).toString());
    if (message.maxKeychainFees) {
      obj.maxKeychainFees = message.maxKeychainFees.map(e => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.maxKeychainFees = [];
    }
    message.nonce !== undefined && (obj.nonce = (message.nonce || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<MsgNewKeyRequest>): MsgNewKeyRequest {
    const message = createBaseMsgNewKeyRequest();
    message.authority = object.authority ?? "";
    message.spaceId = object.spaceId !== undefined && object.spaceId !== null ? BigInt(object.spaceId.toString()) : BigInt(0);
    message.keychainId = object.keychainId !== undefined && object.keychainId !== null ? BigInt(object.keychainId.toString()) : BigInt(0);
    message.keyType = object.keyType ?? 0;
    message.approveTemplateId = object.approveTemplateId !== undefined && object.approveTemplateId !== null ? BigInt(object.approveTemplateId.toString()) : BigInt(0);
    message.rejectTemplateId = object.rejectTemplateId !== undefined && object.rejectTemplateId !== null ? BigInt(object.rejectTemplateId.toString()) : BigInt(0);
    message.maxKeychainFees = object.maxKeychainFees?.map(e => Coin.fromPartial(e)) || [];
    message.nonce = object.nonce !== undefined && object.nonce !== null ? BigInt(object.nonce.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgNewKeyRequestAmino): MsgNewKeyRequest {
    const message = createBaseMsgNewKeyRequest();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
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
    if (object.approve_template_id !== undefined && object.approve_template_id !== null) {
      message.approveTemplateId = BigInt(object.approve_template_id);
    }
    if (object.reject_template_id !== undefined && object.reject_template_id !== null) {
      message.rejectTemplateId = BigInt(object.reject_template_id);
    }
    message.maxKeychainFees = object.max_keychain_fees?.map(e => Coin.fromAmino(e)) || [];
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = BigInt(object.nonce);
    }
    return message;
  },
  toAmino(message: MsgNewKeyRequest): MsgNewKeyRequestAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.space_id = message.spaceId !== BigInt(0) ? (message.spaceId?.toString)() : undefined;
    obj.keychain_id = message.keychainId !== BigInt(0) ? (message.keychainId?.toString)() : undefined;
    obj.key_type = message.keyType === 0 ? undefined : message.keyType;
    obj.approve_template_id = message.approveTemplateId !== BigInt(0) ? (message.approveTemplateId?.toString)() : undefined;
    obj.reject_template_id = message.rejectTemplateId !== BigInt(0) ? (message.rejectTemplateId?.toString)() : undefined;
    if (message.maxKeychainFees) {
      obj.max_keychain_fees = message.maxKeychainFees.map(e => e ? Coin.toAmino(e) : undefined);
    } else {
      obj.max_keychain_fees = message.maxKeychainFees;
    }
    obj.nonce = message.nonce !== BigInt(0) ? (message.nonce?.toString)() : undefined;
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
      typeUrl: "/warden.warden.v1beta3.MsgNewKeyRequest",
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
  typeUrl: "/warden.warden.v1beta3.MsgNewKeyRequestResponse",
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
  toJSON(message: MsgNewKeyRequestResponse): JsonSafe<MsgNewKeyRequestResponse> {
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
    obj.id = message.id !== BigInt(0) ? (message.id?.toString)() : undefined;
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
      typeUrl: "/warden.warden.v1beta3.MsgNewKeyRequestResponse",
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
  typeUrl: "/warden.warden.v1beta3.MsgNewKey",
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
  toJSON(message: MsgNewKey): JsonSafe<MsgNewKey> {
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
      typeUrl: "/warden.warden.v1beta3.MsgNewKey",
      value: MsgNewKey.encode(message).finish()
    };
  }
};
function createBaseMsgFulfilKeyRequest(): MsgFulfilKeyRequest {
  return {
    creator: "",
    requestId: BigInt(0),
    status: 0,
    key: undefined,
    rejectReason: undefined
  };
}
export const MsgFulfilKeyRequest = {
  typeUrl: "/warden.warden.v1beta3.MsgFulfilKeyRequest",
  encode(message: MsgFulfilKeyRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
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
  decode(input: BinaryReader | Uint8Array, length?: number): MsgFulfilKeyRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFulfilKeyRequest();
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
          message.status = reader.int32() as any;
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
  fromJSON(object: any): MsgFulfilKeyRequest {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      requestId: isSet(object.requestId) ? BigInt(object.requestId.toString()) : BigInt(0),
      status: isSet(object.status) ? keyRequestStatusFromJSON(object.status) : -1,
      key: isSet(object.key) ? MsgNewKey.fromJSON(object.key) : undefined,
      rejectReason: isSet(object.rejectReason) ? String(object.rejectReason) : undefined
    };
  },
  toJSON(message: MsgFulfilKeyRequest): JsonSafe<MsgFulfilKeyRequest> {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.requestId !== undefined && (obj.requestId = (message.requestId || BigInt(0)).toString());
    message.status !== undefined && (obj.status = keyRequestStatusToJSON(message.status));
    message.key !== undefined && (obj.key = message.key ? MsgNewKey.toJSON(message.key) : undefined);
    message.rejectReason !== undefined && (obj.rejectReason = message.rejectReason);
    return obj;
  },
  fromPartial(object: Partial<MsgFulfilKeyRequest>): MsgFulfilKeyRequest {
    const message = createBaseMsgFulfilKeyRequest();
    message.creator = object.creator ?? "";
    message.requestId = object.requestId !== undefined && object.requestId !== null ? BigInt(object.requestId.toString()) : BigInt(0);
    message.status = object.status ?? 0;
    message.key = object.key !== undefined && object.key !== null ? MsgNewKey.fromPartial(object.key) : undefined;
    message.rejectReason = object.rejectReason ?? undefined;
    return message;
  },
  fromAmino(object: MsgFulfilKeyRequestAmino): MsgFulfilKeyRequest {
    const message = createBaseMsgFulfilKeyRequest();
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
  toAmino(message: MsgFulfilKeyRequest): MsgFulfilKeyRequestAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.request_id = message.requestId !== BigInt(0) ? (message.requestId?.toString)() : undefined;
    obj.status = message.status === 0 ? undefined : message.status;
    obj.key = message.key ? MsgNewKey.toAmino(message.key) : undefined;
    obj.reject_reason = message.rejectReason === null ? undefined : message.rejectReason;
    return obj;
  },
  fromAminoMsg(object: MsgFulfilKeyRequestAminoMsg): MsgFulfilKeyRequest {
    return MsgFulfilKeyRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgFulfilKeyRequestProtoMsg): MsgFulfilKeyRequest {
    return MsgFulfilKeyRequest.decode(message.value);
  },
  toProto(message: MsgFulfilKeyRequest): Uint8Array {
    return MsgFulfilKeyRequest.encode(message).finish();
  },
  toProtoMsg(message: MsgFulfilKeyRequest): MsgFulfilKeyRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.MsgFulfilKeyRequest",
      value: MsgFulfilKeyRequest.encode(message).finish()
    };
  }
};
function createBaseMsgFulfilKeyRequestResponse(): MsgFulfilKeyRequestResponse {
  return {};
}
export const MsgFulfilKeyRequestResponse = {
  typeUrl: "/warden.warden.v1beta3.MsgFulfilKeyRequestResponse",
  encode(_: MsgFulfilKeyRequestResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgFulfilKeyRequestResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFulfilKeyRequestResponse();
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
  fromJSON(_: any): MsgFulfilKeyRequestResponse {
    return {};
  },
  toJSON(_: MsgFulfilKeyRequestResponse): JsonSafe<MsgFulfilKeyRequestResponse> {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<MsgFulfilKeyRequestResponse>): MsgFulfilKeyRequestResponse {
    const message = createBaseMsgFulfilKeyRequestResponse();
    return message;
  },
  fromAmino(_: MsgFulfilKeyRequestResponseAmino): MsgFulfilKeyRequestResponse {
    const message = createBaseMsgFulfilKeyRequestResponse();
    return message;
  },
  toAmino(_: MsgFulfilKeyRequestResponse): MsgFulfilKeyRequestResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgFulfilKeyRequestResponseAminoMsg): MsgFulfilKeyRequestResponse {
    return MsgFulfilKeyRequestResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgFulfilKeyRequestResponseProtoMsg): MsgFulfilKeyRequestResponse {
    return MsgFulfilKeyRequestResponse.decode(message.value);
  },
  toProto(message: MsgFulfilKeyRequestResponse): Uint8Array {
    return MsgFulfilKeyRequestResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgFulfilKeyRequestResponse): MsgFulfilKeyRequestResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.MsgFulfilKeyRequestResponse",
      value: MsgFulfilKeyRequestResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateKey(): MsgUpdateKey {
  return {
    authority: "",
    keyId: BigInt(0),
    approveTemplateId: BigInt(0),
    rejectTemplateId: BigInt(0)
  };
}
export const MsgUpdateKey = {
  typeUrl: "/warden.warden.v1beta3.MsgUpdateKey",
  encode(message: MsgUpdateKey, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.keyId !== BigInt(0)) {
      writer.uint32(16).uint64(message.keyId);
    }
    if (message.approveTemplateId !== BigInt(0)) {
      writer.uint32(32).uint64(message.approveTemplateId);
    }
    if (message.rejectTemplateId !== BigInt(0)) {
      writer.uint32(40).uint64(message.rejectTemplateId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateKey {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.keyId = reader.uint64();
          break;
        case 4:
          message.approveTemplateId = reader.uint64();
          break;
        case 5:
          message.rejectTemplateId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgUpdateKey {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      keyId: isSet(object.keyId) ? BigInt(object.keyId.toString()) : BigInt(0),
      approveTemplateId: isSet(object.approveTemplateId) ? BigInt(object.approveTemplateId.toString()) : BigInt(0),
      rejectTemplateId: isSet(object.rejectTemplateId) ? BigInt(object.rejectTemplateId.toString()) : BigInt(0)
    };
  },
  toJSON(message: MsgUpdateKey): JsonSafe<MsgUpdateKey> {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.keyId !== undefined && (obj.keyId = (message.keyId || BigInt(0)).toString());
    message.approveTemplateId !== undefined && (obj.approveTemplateId = (message.approveTemplateId || BigInt(0)).toString());
    message.rejectTemplateId !== undefined && (obj.rejectTemplateId = (message.rejectTemplateId || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<MsgUpdateKey>): MsgUpdateKey {
    const message = createBaseMsgUpdateKey();
    message.authority = object.authority ?? "";
    message.keyId = object.keyId !== undefined && object.keyId !== null ? BigInt(object.keyId.toString()) : BigInt(0);
    message.approveTemplateId = object.approveTemplateId !== undefined && object.approveTemplateId !== null ? BigInt(object.approveTemplateId.toString()) : BigInt(0);
    message.rejectTemplateId = object.rejectTemplateId !== undefined && object.rejectTemplateId !== null ? BigInt(object.rejectTemplateId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgUpdateKeyAmino): MsgUpdateKey {
    const message = createBaseMsgUpdateKey();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.key_id !== undefined && object.key_id !== null) {
      message.keyId = BigInt(object.key_id);
    }
    if (object.approve_template_id !== undefined && object.approve_template_id !== null) {
      message.approveTemplateId = BigInt(object.approve_template_id);
    }
    if (object.reject_template_id !== undefined && object.reject_template_id !== null) {
      message.rejectTemplateId = BigInt(object.reject_template_id);
    }
    return message;
  },
  toAmino(message: MsgUpdateKey): MsgUpdateKeyAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.key_id = message.keyId !== BigInt(0) ? (message.keyId?.toString)() : undefined;
    obj.approve_template_id = message.approveTemplateId !== BigInt(0) ? (message.approveTemplateId?.toString)() : undefined;
    obj.reject_template_id = message.rejectTemplateId !== BigInt(0) ? (message.rejectTemplateId?.toString)() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateKeyAminoMsg): MsgUpdateKey {
    return MsgUpdateKey.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateKeyProtoMsg): MsgUpdateKey {
    return MsgUpdateKey.decode(message.value);
  },
  toProto(message: MsgUpdateKey): Uint8Array {
    return MsgUpdateKey.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateKey): MsgUpdateKeyProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.MsgUpdateKey",
      value: MsgUpdateKey.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateKeyResponse(): MsgUpdateKeyResponse {
  return {};
}
export const MsgUpdateKeyResponse = {
  typeUrl: "/warden.warden.v1beta3.MsgUpdateKeyResponse",
  encode(_: MsgUpdateKeyResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateKeyResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateKeyResponse();
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
  fromJSON(_: any): MsgUpdateKeyResponse {
    return {};
  },
  toJSON(_: MsgUpdateKeyResponse): JsonSafe<MsgUpdateKeyResponse> {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<MsgUpdateKeyResponse>): MsgUpdateKeyResponse {
    const message = createBaseMsgUpdateKeyResponse();
    return message;
  },
  fromAmino(_: MsgUpdateKeyResponseAmino): MsgUpdateKeyResponse {
    const message = createBaseMsgUpdateKeyResponse();
    return message;
  },
  toAmino(_: MsgUpdateKeyResponse): MsgUpdateKeyResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateKeyResponseAminoMsg): MsgUpdateKeyResponse {
    return MsgUpdateKeyResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateKeyResponseProtoMsg): MsgUpdateKeyResponse {
    return MsgUpdateKeyResponse.decode(message.value);
  },
  toProto(message: MsgUpdateKeyResponse): Uint8Array {
    return MsgUpdateKeyResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateKeyResponse): MsgUpdateKeyResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.MsgUpdateKeyResponse",
      value: MsgUpdateKeyResponse.encode(message).finish()
    };
  }
};
function createBaseMsgNewSignRequest(): MsgNewSignRequest {
  return {
    authority: "",
    keyId: BigInt(0),
    input: new Uint8Array(),
    analyzers: [],
    encryptionKey: new Uint8Array(),
    maxKeychainFees: [],
    nonce: BigInt(0),
    broadcastType: 0
  };
}
export const MsgNewSignRequest = {
  typeUrl: "/warden.warden.v1beta3.MsgNewSignRequest",
  encode(message: MsgNewSignRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.keyId !== BigInt(0)) {
      writer.uint32(16).uint64(message.keyId);
    }
    if (message.input.length !== 0) {
      writer.uint32(26).bytes(message.input);
    }
    for (const v of message.analyzers) {
      writer.uint32(34).string(v!);
    }
    if (message.encryptionKey.length !== 0) {
      writer.uint32(42).bytes(message.encryptionKey);
    }
    for (const v of message.maxKeychainFees) {
      Coin.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.nonce !== BigInt(0)) {
      writer.uint32(56).uint64(message.nonce);
    }
    if (message.broadcastType !== 0) {
      writer.uint32(64).int32(message.broadcastType);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgNewSignRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgNewSignRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.keyId = reader.uint64();
          break;
        case 3:
          message.input = reader.bytes();
          break;
        case 4:
          message.analyzers.push(reader.string());
          break;
        case 5:
          message.encryptionKey = reader.bytes();
          break;
        case 6:
          message.maxKeychainFees.push(Coin.decode(reader, reader.uint32()));
          break;
        case 7:
          message.nonce = reader.uint64();
          break;
        case 8:
          message.broadcastType = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgNewSignRequest {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      keyId: isSet(object.keyId) ? BigInt(object.keyId.toString()) : BigInt(0),
      input: isSet(object.input) ? bytesFromBase64(object.input) : new Uint8Array(),
      analyzers: Array.isArray(object?.analyzers) ? object.analyzers.map((e: any) => String(e)) : [],
      encryptionKey: isSet(object.encryptionKey) ? bytesFromBase64(object.encryptionKey) : new Uint8Array(),
      maxKeychainFees: Array.isArray(object?.maxKeychainFees) ? object.maxKeychainFees.map((e: any) => Coin.fromJSON(e)) : [],
      nonce: isSet(object.nonce) ? BigInt(object.nonce.toString()) : BigInt(0),
      broadcastType: isSet(object.broadcastType) ? broadcastTypeFromJSON(object.broadcastType) : -1
    };
  },
  toJSON(message: MsgNewSignRequest): JsonSafe<MsgNewSignRequest> {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.keyId !== undefined && (obj.keyId = (message.keyId || BigInt(0)).toString());
    message.input !== undefined && (obj.input = base64FromBytes(message.input !== undefined ? message.input : new Uint8Array()));
    if (message.analyzers) {
      obj.analyzers = message.analyzers.map(e => e);
    } else {
      obj.analyzers = [];
    }
    message.encryptionKey !== undefined && (obj.encryptionKey = base64FromBytes(message.encryptionKey !== undefined ? message.encryptionKey : new Uint8Array()));
    if (message.maxKeychainFees) {
      obj.maxKeychainFees = message.maxKeychainFees.map(e => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.maxKeychainFees = [];
    }
    message.nonce !== undefined && (obj.nonce = (message.nonce || BigInt(0)).toString());
    message.broadcastType !== undefined && (obj.broadcastType = broadcastTypeToJSON(message.broadcastType));
    return obj;
  },
  fromPartial(object: Partial<MsgNewSignRequest>): MsgNewSignRequest {
    const message = createBaseMsgNewSignRequest();
    message.authority = object.authority ?? "";
    message.keyId = object.keyId !== undefined && object.keyId !== null ? BigInt(object.keyId.toString()) : BigInt(0);
    message.input = object.input ?? new Uint8Array();
    message.analyzers = object.analyzers?.map(e => e) || [];
    message.encryptionKey = object.encryptionKey ?? new Uint8Array();
    message.maxKeychainFees = object.maxKeychainFees?.map(e => Coin.fromPartial(e)) || [];
    message.nonce = object.nonce !== undefined && object.nonce !== null ? BigInt(object.nonce.toString()) : BigInt(0);
    message.broadcastType = object.broadcastType ?? 0;
    return message;
  },
  fromAmino(object: MsgNewSignRequestAmino): MsgNewSignRequest {
    const message = createBaseMsgNewSignRequest();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.key_id !== undefined && object.key_id !== null) {
      message.keyId = BigInt(object.key_id);
    }
    if (object.input !== undefined && object.input !== null) {
      message.input = bytesFromBase64(object.input);
    }
    message.analyzers = object.analyzers?.map(e => e) || [];
    if (object.encryption_key !== undefined && object.encryption_key !== null) {
      message.encryptionKey = bytesFromBase64(object.encryption_key);
    }
    message.maxKeychainFees = object.max_keychain_fees?.map(e => Coin.fromAmino(e)) || [];
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = BigInt(object.nonce);
    }
    if (object.broadcast_type !== undefined && object.broadcast_type !== null) {
      message.broadcastType = object.broadcast_type;
    }
    return message;
  },
  toAmino(message: MsgNewSignRequest): MsgNewSignRequestAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.key_id = message.keyId !== BigInt(0) ? (message.keyId?.toString)() : undefined;
    obj.input = message.input ? base64FromBytes(message.input) : undefined;
    if (message.analyzers) {
      obj.analyzers = message.analyzers.map(e => e);
    } else {
      obj.analyzers = message.analyzers;
    }
    obj.encryption_key = message.encryptionKey ? base64FromBytes(message.encryptionKey) : undefined;
    if (message.maxKeychainFees) {
      obj.max_keychain_fees = message.maxKeychainFees.map(e => e ? Coin.toAmino(e) : undefined);
    } else {
      obj.max_keychain_fees = message.maxKeychainFees;
    }
    obj.nonce = message.nonce !== BigInt(0) ? (message.nonce?.toString)() : undefined;
    obj.broadcast_type = message.broadcastType === 0 ? undefined : message.broadcastType;
    return obj;
  },
  fromAminoMsg(object: MsgNewSignRequestAminoMsg): MsgNewSignRequest {
    return MsgNewSignRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgNewSignRequestProtoMsg): MsgNewSignRequest {
    return MsgNewSignRequest.decode(message.value);
  },
  toProto(message: MsgNewSignRequest): Uint8Array {
    return MsgNewSignRequest.encode(message).finish();
  },
  toProtoMsg(message: MsgNewSignRequest): MsgNewSignRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.MsgNewSignRequest",
      value: MsgNewSignRequest.encode(message).finish()
    };
  }
};
function createBaseMsgNewSignRequestResponse(): MsgNewSignRequestResponse {
  return {
    id: BigInt(0)
  };
}
export const MsgNewSignRequestResponse = {
  typeUrl: "/warden.warden.v1beta3.MsgNewSignRequestResponse",
  encode(message: MsgNewSignRequestResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgNewSignRequestResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgNewSignRequestResponse();
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
  fromJSON(object: any): MsgNewSignRequestResponse {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0)
    };
  },
  toJSON(message: MsgNewSignRequestResponse): JsonSafe<MsgNewSignRequestResponse> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<MsgNewSignRequestResponse>): MsgNewSignRequestResponse {
    const message = createBaseMsgNewSignRequestResponse();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgNewSignRequestResponseAmino): MsgNewSignRequestResponse {
    const message = createBaseMsgNewSignRequestResponse();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: MsgNewSignRequestResponse): MsgNewSignRequestResponseAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? (message.id?.toString)() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgNewSignRequestResponseAminoMsg): MsgNewSignRequestResponse {
    return MsgNewSignRequestResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgNewSignRequestResponseProtoMsg): MsgNewSignRequestResponse {
    return MsgNewSignRequestResponse.decode(message.value);
  },
  toProto(message: MsgNewSignRequestResponse): Uint8Array {
    return MsgNewSignRequestResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgNewSignRequestResponse): MsgNewSignRequestResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.MsgNewSignRequestResponse",
      value: MsgNewSignRequestResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSignedData(): MsgSignedData {
  return {
    signedData: new Uint8Array()
  };
}
export const MsgSignedData = {
  typeUrl: "/warden.warden.v1beta3.MsgSignedData",
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
  toJSON(message: MsgSignedData): JsonSafe<MsgSignedData> {
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
      typeUrl: "/warden.warden.v1beta3.MsgSignedData",
      value: MsgSignedData.encode(message).finish()
    };
  }
};
function createBaseMsgFulfilSignRequest(): MsgFulfilSignRequest {
  return {
    creator: "",
    requestId: BigInt(0),
    status: 0,
    payload: undefined,
    rejectReason: undefined
  };
}
export const MsgFulfilSignRequest = {
  typeUrl: "/warden.warden.v1beta3.MsgFulfilSignRequest",
  encode(message: MsgFulfilSignRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
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
  decode(input: BinaryReader | Uint8Array, length?: number): MsgFulfilSignRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFulfilSignRequest();
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
          message.status = reader.int32() as any;
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
  fromJSON(object: any): MsgFulfilSignRequest {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      requestId: isSet(object.requestId) ? BigInt(object.requestId.toString()) : BigInt(0),
      status: isSet(object.status) ? signRequestStatusFromJSON(object.status) : -1,
      payload: isSet(object.payload) ? MsgSignedData.fromJSON(object.payload) : undefined,
      rejectReason: isSet(object.rejectReason) ? String(object.rejectReason) : undefined
    };
  },
  toJSON(message: MsgFulfilSignRequest): JsonSafe<MsgFulfilSignRequest> {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.requestId !== undefined && (obj.requestId = (message.requestId || BigInt(0)).toString());
    message.status !== undefined && (obj.status = signRequestStatusToJSON(message.status));
    message.payload !== undefined && (obj.payload = message.payload ? MsgSignedData.toJSON(message.payload) : undefined);
    message.rejectReason !== undefined && (obj.rejectReason = message.rejectReason);
    return obj;
  },
  fromPartial(object: Partial<MsgFulfilSignRequest>): MsgFulfilSignRequest {
    const message = createBaseMsgFulfilSignRequest();
    message.creator = object.creator ?? "";
    message.requestId = object.requestId !== undefined && object.requestId !== null ? BigInt(object.requestId.toString()) : BigInt(0);
    message.status = object.status ?? 0;
    message.payload = object.payload !== undefined && object.payload !== null ? MsgSignedData.fromPartial(object.payload) : undefined;
    message.rejectReason = object.rejectReason ?? undefined;
    return message;
  },
  fromAmino(object: MsgFulfilSignRequestAmino): MsgFulfilSignRequest {
    const message = createBaseMsgFulfilSignRequest();
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
  toAmino(message: MsgFulfilSignRequest): MsgFulfilSignRequestAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.request_id = message.requestId !== BigInt(0) ? (message.requestId?.toString)() : undefined;
    obj.status = message.status === 0 ? undefined : message.status;
    obj.payload = message.payload ? MsgSignedData.toAmino(message.payload) : undefined;
    obj.reject_reason = message.rejectReason === null ? undefined : message.rejectReason;
    return obj;
  },
  fromAminoMsg(object: MsgFulfilSignRequestAminoMsg): MsgFulfilSignRequest {
    return MsgFulfilSignRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgFulfilSignRequestProtoMsg): MsgFulfilSignRequest {
    return MsgFulfilSignRequest.decode(message.value);
  },
  toProto(message: MsgFulfilSignRequest): Uint8Array {
    return MsgFulfilSignRequest.encode(message).finish();
  },
  toProtoMsg(message: MsgFulfilSignRequest): MsgFulfilSignRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.MsgFulfilSignRequest",
      value: MsgFulfilSignRequest.encode(message).finish()
    };
  }
};
function createBaseMsgFulfilSignRequestResponse(): MsgFulfilSignRequestResponse {
  return {};
}
export const MsgFulfilSignRequestResponse = {
  typeUrl: "/warden.warden.v1beta3.MsgFulfilSignRequestResponse",
  encode(_: MsgFulfilSignRequestResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgFulfilSignRequestResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFulfilSignRequestResponse();
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
  fromJSON(_: any): MsgFulfilSignRequestResponse {
    return {};
  },
  toJSON(_: MsgFulfilSignRequestResponse): JsonSafe<MsgFulfilSignRequestResponse> {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<MsgFulfilSignRequestResponse>): MsgFulfilSignRequestResponse {
    const message = createBaseMsgFulfilSignRequestResponse();
    return message;
  },
  fromAmino(_: MsgFulfilSignRequestResponseAmino): MsgFulfilSignRequestResponse {
    const message = createBaseMsgFulfilSignRequestResponse();
    return message;
  },
  toAmino(_: MsgFulfilSignRequestResponse): MsgFulfilSignRequestResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgFulfilSignRequestResponseAminoMsg): MsgFulfilSignRequestResponse {
    return MsgFulfilSignRequestResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgFulfilSignRequestResponseProtoMsg): MsgFulfilSignRequestResponse {
    return MsgFulfilSignRequestResponse.decode(message.value);
  },
  toProto(message: MsgFulfilSignRequestResponse): Uint8Array {
    return MsgFulfilSignRequestResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgFulfilSignRequestResponse): MsgFulfilSignRequestResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.MsgFulfilSignRequestResponse",
      value: MsgFulfilSignRequestResponse.encode(message).finish()
    };
  }
};