//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../../cosmos/base/query/v1beta1/pagination.js";
import { KeyRequestStatus, KeyRequest, KeyRequestAmino, KeyRequestSDKType, Key, KeyAmino, KeySDKType, keyRequestStatusFromJSON, keyRequestStatusToJSON } from "./key.js";
import { WalletType, walletTypeFromJSON, walletTypeToJSON } from "./wallet.js";
import { SignRequestStatus, SignRequest, SignRequestAmino, SignRequestSDKType, SignTransactionRequest, SignTransactionRequestAmino, SignTransactionRequestSDKType, signRequestStatusFromJSON, signRequestStatusToJSON } from "./signature.js";
import { Params, ParamsAmino, ParamsSDKType } from "./params.js";
import { Space, SpaceAmino, SpaceSDKType } from "./space.js";
import { Keychain, KeychainAmino, KeychainSDKType } from "./keychain.js";
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet } from "../../../helpers.js";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta1.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/warden.warden.v1beta1.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestSDKType {}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta1.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params holds all the parameters of this module. */
  params: ParamsAmino;
}
export interface QueryParamsResponseAminoMsg {
  type: "/warden.warden.v1beta1.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType;
}
export interface QuerySpacesRequest {
  pagination?: PageRequest;
}
export interface QuerySpacesRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta1.QuerySpacesRequest";
  value: Uint8Array;
}
export interface QuerySpacesRequestAmino {
  pagination?: PageRequestAmino;
}
export interface QuerySpacesRequestAminoMsg {
  type: "/warden.warden.v1beta1.QuerySpacesRequest";
  value: QuerySpacesRequestAmino;
}
export interface QuerySpacesRequestSDKType {
  pagination?: PageRequestSDKType;
}
export interface QuerySpacesResponse {
  pagination?: PageResponse;
  spaces: Space[];
}
export interface QuerySpacesResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta1.QuerySpacesResponse";
  value: Uint8Array;
}
export interface QuerySpacesResponseAmino {
  pagination?: PageResponseAmino;
  spaces?: SpaceAmino[];
}
export interface QuerySpacesResponseAminoMsg {
  type: "/warden.warden.v1beta1.QuerySpacesResponse";
  value: QuerySpacesResponseAmino;
}
export interface QuerySpacesResponseSDKType {
  pagination?: PageResponseSDKType;
  spaces: SpaceSDKType[];
}
export interface QuerySpacesByOwnerRequest {
  pagination?: PageRequest;
  owner: string;
}
export interface QuerySpacesByOwnerRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta1.QuerySpacesByOwnerRequest";
  value: Uint8Array;
}
export interface QuerySpacesByOwnerRequestAmino {
  pagination?: PageRequestAmino;
  owner?: string;
}
export interface QuerySpacesByOwnerRequestAminoMsg {
  type: "/warden.warden.v1beta1.QuerySpacesByOwnerRequest";
  value: QuerySpacesByOwnerRequestAmino;
}
export interface QuerySpacesByOwnerRequestSDKType {
  pagination?: PageRequestSDKType;
  owner: string;
}
export interface QueryKeychainsRequest {
  pagination?: PageRequest;
}
export interface QueryKeychainsRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta1.QueryKeychainsRequest";
  value: Uint8Array;
}
export interface QueryKeychainsRequestAmino {
  pagination?: PageRequestAmino;
}
export interface QueryKeychainsRequestAminoMsg {
  type: "/warden.warden.v1beta1.QueryKeychainsRequest";
  value: QueryKeychainsRequestAmino;
}
export interface QueryKeychainsRequestSDKType {
  pagination?: PageRequestSDKType;
}
export interface QueryKeychainsResponse {
  pagination?: PageResponse;
  keychains: Keychain[];
}
export interface QueryKeychainsResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta1.QueryKeychainsResponse";
  value: Uint8Array;
}
export interface QueryKeychainsResponseAmino {
  pagination?: PageResponseAmino;
  keychains?: KeychainAmino[];
}
export interface QueryKeychainsResponseAminoMsg {
  type: "/warden.warden.v1beta1.QueryKeychainsResponse";
  value: QueryKeychainsResponseAmino;
}
export interface QueryKeychainsResponseSDKType {
  pagination?: PageResponseSDKType;
  keychains: KeychainSDKType[];
}
export interface QuerySpaceByAddressRequest {
  address: string;
}
export interface QuerySpaceByAddressRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta1.QuerySpaceByAddressRequest";
  value: Uint8Array;
}
export interface QuerySpaceByAddressRequestAmino {
  address?: string;
}
export interface QuerySpaceByAddressRequestAminoMsg {
  type: "/warden.warden.v1beta1.QuerySpaceByAddressRequest";
  value: QuerySpaceByAddressRequestAmino;
}
export interface QuerySpaceByAddressRequestSDKType {
  address: string;
}
export interface QuerySpaceByAddressResponse {
  space?: Space;
}
export interface QuerySpaceByAddressResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta1.QuerySpaceByAddressResponse";
  value: Uint8Array;
}
export interface QuerySpaceByAddressResponseAmino {
  space?: SpaceAmino;
}
export interface QuerySpaceByAddressResponseAminoMsg {
  type: "/warden.warden.v1beta1.QuerySpaceByAddressResponse";
  value: QuerySpaceByAddressResponseAmino;
}
export interface QuerySpaceByAddressResponseSDKType {
  space?: SpaceSDKType;
}
export interface QueryKeychainByAddressRequest {
  address: string;
}
export interface QueryKeychainByAddressRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta1.QueryKeychainByAddressRequest";
  value: Uint8Array;
}
export interface QueryKeychainByAddressRequestAmino {
  address?: string;
}
export interface QueryKeychainByAddressRequestAminoMsg {
  type: "/warden.warden.v1beta1.QueryKeychainByAddressRequest";
  value: QueryKeychainByAddressRequestAmino;
}
export interface QueryKeychainByAddressRequestSDKType {
  address: string;
}
export interface QueryKeychainByAddressResponse {
  keychain?: Keychain;
}
export interface QueryKeychainByAddressResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta1.QueryKeychainByAddressResponse";
  value: Uint8Array;
}
export interface QueryKeychainByAddressResponseAmino {
  keychain?: KeychainAmino;
}
export interface QueryKeychainByAddressResponseAminoMsg {
  type: "/warden.warden.v1beta1.QueryKeychainByAddressResponse";
  value: QueryKeychainByAddressResponseAmino;
}
export interface QueryKeychainByAddressResponseSDKType {
  keychain?: KeychainSDKType;
}
export interface QueryKeyRequestsRequest {
  pagination?: PageRequest;
  keychainAddr: string;
  /** Optional */
  status: KeyRequestStatus;
  spaceAddr: string;
}
export interface QueryKeyRequestsRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta1.QueryKeyRequestsRequest";
  value: Uint8Array;
}
export interface QueryKeyRequestsRequestAmino {
  pagination?: PageRequestAmino;
  keychain_addr?: string;
  /** Optional */
  status?: KeyRequestStatus;
  space_addr?: string;
}
export interface QueryKeyRequestsRequestAminoMsg {
  type: "/warden.warden.v1beta1.QueryKeyRequestsRequest";
  value: QueryKeyRequestsRequestAmino;
}
export interface QueryKeyRequestsRequestSDKType {
  pagination?: PageRequestSDKType;
  keychain_addr: string;
  status: KeyRequestStatus;
  space_addr: string;
}
export interface QueryKeyRequestsResponse {
  pagination?: PageResponse;
  keyRequests: KeyRequest[];
}
export interface QueryKeyRequestsResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta1.QueryKeyRequestsResponse";
  value: Uint8Array;
}
export interface QueryKeyRequestsResponseAmino {
  pagination?: PageResponseAmino;
  key_requests?: KeyRequestAmino[];
}
export interface QueryKeyRequestsResponseAminoMsg {
  type: "/warden.warden.v1beta1.QueryKeyRequestsResponse";
  value: QueryKeyRequestsResponseAmino;
}
export interface QueryKeyRequestsResponseSDKType {
  pagination?: PageResponseSDKType;
  key_requests: KeyRequestSDKType[];
}
export interface QueryKeyRequestByIdRequest {
  id: bigint;
}
export interface QueryKeyRequestByIdRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta1.QueryKeyRequestByIdRequest";
  value: Uint8Array;
}
export interface QueryKeyRequestByIdRequestAmino {
  id?: string;
}
export interface QueryKeyRequestByIdRequestAminoMsg {
  type: "/warden.warden.v1beta1.QueryKeyRequestByIdRequest";
  value: QueryKeyRequestByIdRequestAmino;
}
export interface QueryKeyRequestByIdRequestSDKType {
  id: bigint;
}
export interface QueryKeyRequestByIdResponse {
  keyRequest?: KeyRequest;
}
export interface QueryKeyRequestByIdResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta1.QueryKeyRequestByIdResponse";
  value: Uint8Array;
}
export interface QueryKeyRequestByIdResponseAmino {
  key_request?: KeyRequestAmino;
}
export interface QueryKeyRequestByIdResponseAminoMsg {
  type: "/warden.warden.v1beta1.QueryKeyRequestByIdResponse";
  value: QueryKeyRequestByIdResponseAmino;
}
export interface QueryKeyRequestByIdResponseSDKType {
  key_request?: KeyRequestSDKType;
}
export interface QueryKeysRequest {
  pagination?: PageRequest;
  /** Optional */
  spaceAddr: string;
  /** Optional */
  type: WalletType;
  /** Optional */
  keyId: bigint;
}
export interface QueryKeysRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta1.QueryKeysRequest";
  value: Uint8Array;
}
export interface QueryKeysRequestAmino {
  pagination?: PageRequestAmino;
  /** Optional */
  space_addr?: string;
  /** Optional */
  type?: WalletType;
  /** Optional */
  key_id?: string;
}
export interface QueryKeysRequestAminoMsg {
  type: "/warden.warden.v1beta1.QueryKeysRequest";
  value: QueryKeysRequestAmino;
}
export interface QueryKeysRequestSDKType {
  pagination?: PageRequestSDKType;
  space_addr: string;
  type: WalletType;
  key_id: bigint;
}
export interface QueryKeysResponse {
  pagination?: PageResponse;
  keys: KeyResponse[];
}
export interface QueryKeysResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta1.QueryKeysResponse";
  value: Uint8Array;
}
export interface QueryKeysResponseAmino {
  pagination?: PageResponseAmino;
  keys?: KeyResponseAmino[];
}
export interface QueryKeysResponseAminoMsg {
  type: "/warden.warden.v1beta1.QueryKeysResponse";
  value: QueryKeysResponseAmino;
}
export interface QueryKeysResponseSDKType {
  pagination?: PageResponseSDKType;
  keys: KeyResponseSDKType[];
}
export interface KeyResponse {
  key?: Key;
  wallets: WalletKeyResponse[];
}
export interface KeyResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta1.KeyResponse";
  value: Uint8Array;
}
export interface KeyResponseAmino {
  key?: KeyAmino;
  wallets?: WalletKeyResponseAmino[];
}
export interface KeyResponseAminoMsg {
  type: "/warden.warden.v1beta1.KeyResponse";
  value: KeyResponseAmino;
}
export interface KeyResponseSDKType {
  key?: KeySDKType;
  wallets: WalletKeyResponseSDKType[];
}
export interface WalletKeyResponse {
  address: string;
  type: WalletType;
}
export interface WalletKeyResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta1.WalletKeyResponse";
  value: Uint8Array;
}
export interface WalletKeyResponseAmino {
  address?: string;
  type?: WalletType;
}
export interface WalletKeyResponseAminoMsg {
  type: "/warden.warden.v1beta1.WalletKeyResponse";
  value: WalletKeyResponseAmino;
}
export interface WalletKeyResponseSDKType {
  address: string;
  type: WalletType;
}
export interface QuerySignatureRequestsRequest {
  pagination?: PageRequest;
  keychainAddr: string;
  /** Optional */
  status: SignRequestStatus;
}
export interface QuerySignatureRequestsRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta1.QuerySignatureRequestsRequest";
  value: Uint8Array;
}
export interface QuerySignatureRequestsRequestAmino {
  pagination?: PageRequestAmino;
  keychain_addr?: string;
  /** Optional */
  status?: SignRequestStatus;
}
export interface QuerySignatureRequestsRequestAminoMsg {
  type: "/warden.warden.v1beta1.QuerySignatureRequestsRequest";
  value: QuerySignatureRequestsRequestAmino;
}
export interface QuerySignatureRequestsRequestSDKType {
  pagination?: PageRequestSDKType;
  keychain_addr: string;
  status: SignRequestStatus;
}
export interface QuerySignatureRequestsResponse {
  pagination?: PageResponse;
  signRequests: SignRequest[];
}
export interface QuerySignatureRequestsResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta1.QuerySignatureRequestsResponse";
  value: Uint8Array;
}
export interface QuerySignatureRequestsResponseAmino {
  pagination?: PageResponseAmino;
  sign_requests?: SignRequestAmino[];
}
export interface QuerySignatureRequestsResponseAminoMsg {
  type: "/warden.warden.v1beta1.QuerySignatureRequestsResponse";
  value: QuerySignatureRequestsResponseAmino;
}
export interface QuerySignatureRequestsResponseSDKType {
  pagination?: PageResponseSDKType;
  sign_requests: SignRequestSDKType[];
}
export interface QuerySignatureRequestByIdRequest {
  id: bigint;
}
export interface QuerySignatureRequestByIdRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta1.QuerySignatureRequestByIdRequest";
  value: Uint8Array;
}
export interface QuerySignatureRequestByIdRequestAmino {
  id?: string;
}
export interface QuerySignatureRequestByIdRequestAminoMsg {
  type: "/warden.warden.v1beta1.QuerySignatureRequestByIdRequest";
  value: QuerySignatureRequestByIdRequestAmino;
}
export interface QuerySignatureRequestByIdRequestSDKType {
  id: bigint;
}
export interface QuerySignatureRequestByIdResponse {
  signRequest?: SignRequest;
}
export interface QuerySignatureRequestByIdResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta1.QuerySignatureRequestByIdResponse";
  value: Uint8Array;
}
export interface QuerySignatureRequestByIdResponseAmino {
  sign_request?: SignRequestAmino;
}
export interface QuerySignatureRequestByIdResponseAminoMsg {
  type: "/warden.warden.v1beta1.QuerySignatureRequestByIdResponse";
  value: QuerySignatureRequestByIdResponseAmino;
}
export interface QuerySignatureRequestByIdResponseSDKType {
  sign_request?: SignRequestSDKType;
}
export interface QuerySignTransactionRequestsRequest {
  pagination?: PageRequest;
  walletType: WalletType;
  keyId: bigint;
  /** Optional */
  status: SignRequestStatus;
}
export interface QuerySignTransactionRequestsRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta1.QuerySignTransactionRequestsRequest";
  value: Uint8Array;
}
export interface QuerySignTransactionRequestsRequestAmino {
  pagination?: PageRequestAmino;
  wallet_type?: WalletType;
  key_id?: string;
  /** Optional */
  status?: SignRequestStatus;
}
export interface QuerySignTransactionRequestsRequestAminoMsg {
  type: "/warden.warden.v1beta1.QuerySignTransactionRequestsRequest";
  value: QuerySignTransactionRequestsRequestAmino;
}
export interface QuerySignTransactionRequestsRequestSDKType {
  pagination?: PageRequestSDKType;
  wallet_type: WalletType;
  key_id: bigint;
  status: SignRequestStatus;
}
export interface SignTransactionRequestResponse {
  signTransactionRequest?: SignTransactionRequest;
  signRequest?: SignRequest;
}
export interface SignTransactionRequestResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta1.SignTransactionRequestResponse";
  value: Uint8Array;
}
export interface SignTransactionRequestResponseAmino {
  sign_transaction_request?: SignTransactionRequestAmino;
  sign_request?: SignRequestAmino;
}
export interface SignTransactionRequestResponseAminoMsg {
  type: "/warden.warden.v1beta1.SignTransactionRequestResponse";
  value: SignTransactionRequestResponseAmino;
}
export interface SignTransactionRequestResponseSDKType {
  sign_transaction_request?: SignTransactionRequestSDKType;
  sign_request?: SignRequestSDKType;
}
export interface QuerySignTransactionRequestsResponse {
  pagination?: PageResponse;
  signTransactionRequests: SignTransactionRequestResponse[];
}
export interface QuerySignTransactionRequestsResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta1.QuerySignTransactionRequestsResponse";
  value: Uint8Array;
}
export interface QuerySignTransactionRequestsResponseAmino {
  pagination?: PageResponseAmino;
  sign_transaction_requests?: SignTransactionRequestResponseAmino[];
}
export interface QuerySignTransactionRequestsResponseAminoMsg {
  type: "/warden.warden.v1beta1.QuerySignTransactionRequestsResponse";
  value: QuerySignTransactionRequestsResponseAmino;
}
export interface QuerySignTransactionRequestsResponseSDKType {
  pagination?: PageResponseSDKType;
  sign_transaction_requests: SignTransactionRequestResponseSDKType[];
}
export interface QuerySignTransactionRequestByIdRequest {
  id: bigint;
}
export interface QuerySignTransactionRequestByIdRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta1.QuerySignTransactionRequestByIdRequest";
  value: Uint8Array;
}
export interface QuerySignTransactionRequestByIdRequestAmino {
  id?: string;
}
export interface QuerySignTransactionRequestByIdRequestAminoMsg {
  type: "/warden.warden.v1beta1.QuerySignTransactionRequestByIdRequest";
  value: QuerySignTransactionRequestByIdRequestAmino;
}
export interface QuerySignTransactionRequestByIdRequestSDKType {
  id: bigint;
}
export interface QuerySignTransactionRequestByIdResponse {
  signTransactionRequest?: SignTransactionRequest;
}
export interface QuerySignTransactionRequestByIdResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta1.QuerySignTransactionRequestByIdResponse";
  value: Uint8Array;
}
export interface QuerySignTransactionRequestByIdResponseAmino {
  sign_transaction_request?: SignTransactionRequestAmino;
}
export interface QuerySignTransactionRequestByIdResponseAminoMsg {
  type: "/warden.warden.v1beta1.QuerySignTransactionRequestByIdResponse";
  value: QuerySignTransactionRequestByIdResponseAmino;
}
export interface QuerySignTransactionRequestByIdResponseSDKType {
  sign_transaction_request?: SignTransactionRequestSDKType;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/warden.warden.v1beta1.QueryParamsRequest",
  encode(_: QueryParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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
  fromJSON(_: any): QueryParamsRequest {
    return {};
  },
  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<QueryParamsRequest>): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  fromAmino(_: QueryParamsRequestAmino): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  toAmino(_: QueryParamsRequest): QueryParamsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryParamsRequestAminoMsg): QueryParamsRequest {
    return QueryParamsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsRequestProtoMsg): QueryParamsRequest {
    return QueryParamsRequest.decode(message.value);
  },
  toProto(message: QueryParamsRequest): Uint8Array {
    return QueryParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsRequest): QueryParamsRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.QueryParamsRequest",
      value: QueryParamsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryParamsResponse(): QueryParamsResponse {
  return {
    params: Params.fromPartial({})
  };
}
export const QueryParamsResponse = {
  typeUrl: "/warden.warden.v1beta1.QueryParamsResponse",
  encode(message: QueryParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryParamsResponse {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined
    };
  },
  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },
  fromPartial(object: Partial<QueryParamsResponse>): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: QueryParamsResponseAmino): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: QueryParamsResponse): QueryParamsResponseAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : Params.toAmino(Params.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: QueryParamsResponseAminoMsg): QueryParamsResponse {
    return QueryParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsResponseProtoMsg): QueryParamsResponse {
    return QueryParamsResponse.decode(message.value);
  },
  toProto(message: QueryParamsResponse): Uint8Array {
    return QueryParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsResponse): QueryParamsResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySpacesRequest(): QuerySpacesRequest {
  return {
    pagination: undefined
  };
}
export const QuerySpacesRequest = {
  typeUrl: "/warden.warden.v1beta1.QuerySpacesRequest",
  encode(message: QuerySpacesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySpacesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySpacesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QuerySpacesRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined
    };
  },
  toJSON(message: QuerySpacesRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial(object: Partial<QuerySpacesRequest>): QuerySpacesRequest {
    const message = createBaseQuerySpacesRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QuerySpacesRequestAmino): QuerySpacesRequest {
    const message = createBaseQuerySpacesRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QuerySpacesRequest): QuerySpacesRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySpacesRequestAminoMsg): QuerySpacesRequest {
    return QuerySpacesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySpacesRequestProtoMsg): QuerySpacesRequest {
    return QuerySpacesRequest.decode(message.value);
  },
  toProto(message: QuerySpacesRequest): Uint8Array {
    return QuerySpacesRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySpacesRequest): QuerySpacesRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.QuerySpacesRequest",
      value: QuerySpacesRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySpacesResponse(): QuerySpacesResponse {
  return {
    pagination: undefined,
    spaces: []
  };
}
export const QuerySpacesResponse = {
  typeUrl: "/warden.warden.v1beta1.QuerySpacesResponse",
  encode(message: QuerySpacesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.spaces) {
      Space.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySpacesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySpacesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        case 2:
          message.spaces.push(Space.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QuerySpacesResponse {
    return {
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      spaces: Array.isArray(object?.spaces) ? object.spaces.map((e: any) => Space.fromJSON(e)) : []
    };
  },
  toJSON(message: QuerySpacesResponse): unknown {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    if (message.spaces) {
      obj.spaces = message.spaces.map(e => e ? Space.toJSON(e) : undefined);
    } else {
      obj.spaces = [];
    }
    return obj;
  },
  fromPartial(object: Partial<QuerySpacesResponse>): QuerySpacesResponse {
    const message = createBaseQuerySpacesResponse();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    message.spaces = object.spaces?.map(e => Space.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QuerySpacesResponseAmino): QuerySpacesResponse {
    const message = createBaseQuerySpacesResponse();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    message.spaces = object.spaces?.map(e => Space.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QuerySpacesResponse): QuerySpacesResponseAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    if (message.spaces) {
      obj.spaces = message.spaces.map(e => e ? Space.toAmino(e) : undefined);
    } else {
      obj.spaces = message.spaces;
    }
    return obj;
  },
  fromAminoMsg(object: QuerySpacesResponseAminoMsg): QuerySpacesResponse {
    return QuerySpacesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySpacesResponseProtoMsg): QuerySpacesResponse {
    return QuerySpacesResponse.decode(message.value);
  },
  toProto(message: QuerySpacesResponse): Uint8Array {
    return QuerySpacesResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySpacesResponse): QuerySpacesResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.QuerySpacesResponse",
      value: QuerySpacesResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySpacesByOwnerRequest(): QuerySpacesByOwnerRequest {
  return {
    pagination: undefined,
    owner: ""
  };
}
export const QuerySpacesByOwnerRequest = {
  typeUrl: "/warden.warden.v1beta1.QuerySpacesByOwnerRequest",
  encode(message: QuerySpacesByOwnerRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.owner !== "") {
      writer.uint32(18).string(message.owner);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySpacesByOwnerRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySpacesByOwnerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.owner = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QuerySpacesByOwnerRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      owner: isSet(object.owner) ? String(object.owner) : ""
    };
  },
  toJSON(message: QuerySpacesByOwnerRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    message.owner !== undefined && (obj.owner = message.owner);
    return obj;
  },
  fromPartial(object: Partial<QuerySpacesByOwnerRequest>): QuerySpacesByOwnerRequest {
    const message = createBaseQuerySpacesByOwnerRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    message.owner = object.owner ?? "";
    return message;
  },
  fromAmino(object: QuerySpacesByOwnerRequestAmino): QuerySpacesByOwnerRequest {
    const message = createBaseQuerySpacesByOwnerRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    }
    return message;
  },
  toAmino(message: QuerySpacesByOwnerRequest): QuerySpacesByOwnerRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    obj.owner = message.owner === "" ? undefined : message.owner;
    return obj;
  },
  fromAminoMsg(object: QuerySpacesByOwnerRequestAminoMsg): QuerySpacesByOwnerRequest {
    return QuerySpacesByOwnerRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySpacesByOwnerRequestProtoMsg): QuerySpacesByOwnerRequest {
    return QuerySpacesByOwnerRequest.decode(message.value);
  },
  toProto(message: QuerySpacesByOwnerRequest): Uint8Array {
    return QuerySpacesByOwnerRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySpacesByOwnerRequest): QuerySpacesByOwnerRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.QuerySpacesByOwnerRequest",
      value: QuerySpacesByOwnerRequest.encode(message).finish()
    };
  }
};
function createBaseQueryKeychainsRequest(): QueryKeychainsRequest {
  return {
    pagination: undefined
  };
}
export const QueryKeychainsRequest = {
  typeUrl: "/warden.warden.v1beta1.QueryKeychainsRequest",
  encode(message: QueryKeychainsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryKeychainsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryKeychainsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryKeychainsRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined
    };
  },
  toJSON(message: QueryKeychainsRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial(object: Partial<QueryKeychainsRequest>): QueryKeychainsRequest {
    const message = createBaseQueryKeychainsRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryKeychainsRequestAmino): QueryKeychainsRequest {
    const message = createBaseQueryKeychainsRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryKeychainsRequest): QueryKeychainsRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryKeychainsRequestAminoMsg): QueryKeychainsRequest {
    return QueryKeychainsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryKeychainsRequestProtoMsg): QueryKeychainsRequest {
    return QueryKeychainsRequest.decode(message.value);
  },
  toProto(message: QueryKeychainsRequest): Uint8Array {
    return QueryKeychainsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryKeychainsRequest): QueryKeychainsRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.QueryKeychainsRequest",
      value: QueryKeychainsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryKeychainsResponse(): QueryKeychainsResponse {
  return {
    pagination: undefined,
    keychains: []
  };
}
export const QueryKeychainsResponse = {
  typeUrl: "/warden.warden.v1beta1.QueryKeychainsResponse",
  encode(message: QueryKeychainsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.keychains) {
      Keychain.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryKeychainsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryKeychainsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        case 2:
          message.keychains.push(Keychain.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryKeychainsResponse {
    return {
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      keychains: Array.isArray(object?.keychains) ? object.keychains.map((e: any) => Keychain.fromJSON(e)) : []
    };
  },
  toJSON(message: QueryKeychainsResponse): unknown {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    if (message.keychains) {
      obj.keychains = message.keychains.map(e => e ? Keychain.toJSON(e) : undefined);
    } else {
      obj.keychains = [];
    }
    return obj;
  },
  fromPartial(object: Partial<QueryKeychainsResponse>): QueryKeychainsResponse {
    const message = createBaseQueryKeychainsResponse();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    message.keychains = object.keychains?.map(e => Keychain.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryKeychainsResponseAmino): QueryKeychainsResponse {
    const message = createBaseQueryKeychainsResponse();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    message.keychains = object.keychains?.map(e => Keychain.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryKeychainsResponse): QueryKeychainsResponseAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    if (message.keychains) {
      obj.keychains = message.keychains.map(e => e ? Keychain.toAmino(e) : undefined);
    } else {
      obj.keychains = message.keychains;
    }
    return obj;
  },
  fromAminoMsg(object: QueryKeychainsResponseAminoMsg): QueryKeychainsResponse {
    return QueryKeychainsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryKeychainsResponseProtoMsg): QueryKeychainsResponse {
    return QueryKeychainsResponse.decode(message.value);
  },
  toProto(message: QueryKeychainsResponse): Uint8Array {
    return QueryKeychainsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryKeychainsResponse): QueryKeychainsResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.QueryKeychainsResponse",
      value: QueryKeychainsResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySpaceByAddressRequest(): QuerySpaceByAddressRequest {
  return {
    address: ""
  };
}
export const QuerySpaceByAddressRequest = {
  typeUrl: "/warden.warden.v1beta1.QuerySpaceByAddressRequest",
  encode(message: QuerySpaceByAddressRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySpaceByAddressRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySpaceByAddressRequest();
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
  fromJSON(object: any): QuerySpaceByAddressRequest {
    return {
      address: isSet(object.address) ? String(object.address) : ""
    };
  },
  toJSON(message: QuerySpaceByAddressRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },
  fromPartial(object: Partial<QuerySpaceByAddressRequest>): QuerySpaceByAddressRequest {
    const message = createBaseQuerySpaceByAddressRequest();
    message.address = object.address ?? "";
    return message;
  },
  fromAmino(object: QuerySpaceByAddressRequestAmino): QuerySpaceByAddressRequest {
    const message = createBaseQuerySpaceByAddressRequest();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    return message;
  },
  toAmino(message: QuerySpaceByAddressRequest): QuerySpaceByAddressRequestAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    return obj;
  },
  fromAminoMsg(object: QuerySpaceByAddressRequestAminoMsg): QuerySpaceByAddressRequest {
    return QuerySpaceByAddressRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySpaceByAddressRequestProtoMsg): QuerySpaceByAddressRequest {
    return QuerySpaceByAddressRequest.decode(message.value);
  },
  toProto(message: QuerySpaceByAddressRequest): Uint8Array {
    return QuerySpaceByAddressRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySpaceByAddressRequest): QuerySpaceByAddressRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.QuerySpaceByAddressRequest",
      value: QuerySpaceByAddressRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySpaceByAddressResponse(): QuerySpaceByAddressResponse {
  return {
    space: undefined
  };
}
export const QuerySpaceByAddressResponse = {
  typeUrl: "/warden.warden.v1beta1.QuerySpaceByAddressResponse",
  encode(message: QuerySpaceByAddressResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.space !== undefined) {
      Space.encode(message.space, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySpaceByAddressResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySpaceByAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.space = Space.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QuerySpaceByAddressResponse {
    return {
      space: isSet(object.space) ? Space.fromJSON(object.space) : undefined
    };
  },
  toJSON(message: QuerySpaceByAddressResponse): unknown {
    const obj: any = {};
    message.space !== undefined && (obj.space = message.space ? Space.toJSON(message.space) : undefined);
    return obj;
  },
  fromPartial(object: Partial<QuerySpaceByAddressResponse>): QuerySpaceByAddressResponse {
    const message = createBaseQuerySpaceByAddressResponse();
    message.space = object.space !== undefined && object.space !== null ? Space.fromPartial(object.space) : undefined;
    return message;
  },
  fromAmino(object: QuerySpaceByAddressResponseAmino): QuerySpaceByAddressResponse {
    const message = createBaseQuerySpaceByAddressResponse();
    if (object.space !== undefined && object.space !== null) {
      message.space = Space.fromAmino(object.space);
    }
    return message;
  },
  toAmino(message: QuerySpaceByAddressResponse): QuerySpaceByAddressResponseAmino {
    const obj: any = {};
    obj.space = message.space ? Space.toAmino(message.space) : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySpaceByAddressResponseAminoMsg): QuerySpaceByAddressResponse {
    return QuerySpaceByAddressResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySpaceByAddressResponseProtoMsg): QuerySpaceByAddressResponse {
    return QuerySpaceByAddressResponse.decode(message.value);
  },
  toProto(message: QuerySpaceByAddressResponse): Uint8Array {
    return QuerySpaceByAddressResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySpaceByAddressResponse): QuerySpaceByAddressResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.QuerySpaceByAddressResponse",
      value: QuerySpaceByAddressResponse.encode(message).finish()
    };
  }
};
function createBaseQueryKeychainByAddressRequest(): QueryKeychainByAddressRequest {
  return {
    address: ""
  };
}
export const QueryKeychainByAddressRequest = {
  typeUrl: "/warden.warden.v1beta1.QueryKeychainByAddressRequest",
  encode(message: QueryKeychainByAddressRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryKeychainByAddressRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryKeychainByAddressRequest();
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
  fromJSON(object: any): QueryKeychainByAddressRequest {
    return {
      address: isSet(object.address) ? String(object.address) : ""
    };
  },
  toJSON(message: QueryKeychainByAddressRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },
  fromPartial(object: Partial<QueryKeychainByAddressRequest>): QueryKeychainByAddressRequest {
    const message = createBaseQueryKeychainByAddressRequest();
    message.address = object.address ?? "";
    return message;
  },
  fromAmino(object: QueryKeychainByAddressRequestAmino): QueryKeychainByAddressRequest {
    const message = createBaseQueryKeychainByAddressRequest();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    return message;
  },
  toAmino(message: QueryKeychainByAddressRequest): QueryKeychainByAddressRequestAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    return obj;
  },
  fromAminoMsg(object: QueryKeychainByAddressRequestAminoMsg): QueryKeychainByAddressRequest {
    return QueryKeychainByAddressRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryKeychainByAddressRequestProtoMsg): QueryKeychainByAddressRequest {
    return QueryKeychainByAddressRequest.decode(message.value);
  },
  toProto(message: QueryKeychainByAddressRequest): Uint8Array {
    return QueryKeychainByAddressRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryKeychainByAddressRequest): QueryKeychainByAddressRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.QueryKeychainByAddressRequest",
      value: QueryKeychainByAddressRequest.encode(message).finish()
    };
  }
};
function createBaseQueryKeychainByAddressResponse(): QueryKeychainByAddressResponse {
  return {
    keychain: undefined
  };
}
export const QueryKeychainByAddressResponse = {
  typeUrl: "/warden.warden.v1beta1.QueryKeychainByAddressResponse",
  encode(message: QueryKeychainByAddressResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.keychain !== undefined) {
      Keychain.encode(message.keychain, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryKeychainByAddressResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryKeychainByAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.keychain = Keychain.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryKeychainByAddressResponse {
    return {
      keychain: isSet(object.keychain) ? Keychain.fromJSON(object.keychain) : undefined
    };
  },
  toJSON(message: QueryKeychainByAddressResponse): unknown {
    const obj: any = {};
    message.keychain !== undefined && (obj.keychain = message.keychain ? Keychain.toJSON(message.keychain) : undefined);
    return obj;
  },
  fromPartial(object: Partial<QueryKeychainByAddressResponse>): QueryKeychainByAddressResponse {
    const message = createBaseQueryKeychainByAddressResponse();
    message.keychain = object.keychain !== undefined && object.keychain !== null ? Keychain.fromPartial(object.keychain) : undefined;
    return message;
  },
  fromAmino(object: QueryKeychainByAddressResponseAmino): QueryKeychainByAddressResponse {
    const message = createBaseQueryKeychainByAddressResponse();
    if (object.keychain !== undefined && object.keychain !== null) {
      message.keychain = Keychain.fromAmino(object.keychain);
    }
    return message;
  },
  toAmino(message: QueryKeychainByAddressResponse): QueryKeychainByAddressResponseAmino {
    const obj: any = {};
    obj.keychain = message.keychain ? Keychain.toAmino(message.keychain) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryKeychainByAddressResponseAminoMsg): QueryKeychainByAddressResponse {
    return QueryKeychainByAddressResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryKeychainByAddressResponseProtoMsg): QueryKeychainByAddressResponse {
    return QueryKeychainByAddressResponse.decode(message.value);
  },
  toProto(message: QueryKeychainByAddressResponse): Uint8Array {
    return QueryKeychainByAddressResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryKeychainByAddressResponse): QueryKeychainByAddressResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.QueryKeychainByAddressResponse",
      value: QueryKeychainByAddressResponse.encode(message).finish()
    };
  }
};
function createBaseQueryKeyRequestsRequest(): QueryKeyRequestsRequest {
  return {
    pagination: undefined,
    keychainAddr: "",
    status: 0,
    spaceAddr: ""
  };
}
export const QueryKeyRequestsRequest = {
  typeUrl: "/warden.warden.v1beta1.QueryKeyRequestsRequest",
  encode(message: QueryKeyRequestsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.keychainAddr !== "") {
      writer.uint32(18).string(message.keychainAddr);
    }
    if (message.status !== 0) {
      writer.uint32(24).int32(message.status);
    }
    if (message.spaceAddr !== "") {
      writer.uint32(34).string(message.spaceAddr);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryKeyRequestsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryKeyRequestsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.keychainAddr = reader.string();
          break;
        case 3:
          message.status = (reader.int32() as any);
          break;
        case 4:
          message.spaceAddr = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryKeyRequestsRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      keychainAddr: isSet(object.keychainAddr) ? String(object.keychainAddr) : "",
      status: isSet(object.status) ? keyRequestStatusFromJSON(object.status) : -1,
      spaceAddr: isSet(object.spaceAddr) ? String(object.spaceAddr) : ""
    };
  },
  toJSON(message: QueryKeyRequestsRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    message.keychainAddr !== undefined && (obj.keychainAddr = message.keychainAddr);
    message.status !== undefined && (obj.status = keyRequestStatusToJSON(message.status));
    message.spaceAddr !== undefined && (obj.spaceAddr = message.spaceAddr);
    return obj;
  },
  fromPartial(object: Partial<QueryKeyRequestsRequest>): QueryKeyRequestsRequest {
    const message = createBaseQueryKeyRequestsRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    message.keychainAddr = object.keychainAddr ?? "";
    message.status = object.status ?? 0;
    message.spaceAddr = object.spaceAddr ?? "";
    return message;
  },
  fromAmino(object: QueryKeyRequestsRequestAmino): QueryKeyRequestsRequest {
    const message = createBaseQueryKeyRequestsRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    if (object.keychain_addr !== undefined && object.keychain_addr !== null) {
      message.keychainAddr = object.keychain_addr;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    if (object.space_addr !== undefined && object.space_addr !== null) {
      message.spaceAddr = object.space_addr;
    }
    return message;
  },
  toAmino(message: QueryKeyRequestsRequest): QueryKeyRequestsRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    obj.keychain_addr = message.keychainAddr === "" ? undefined : message.keychainAddr;
    obj.status = message.status === 0 ? undefined : message.status;
    obj.space_addr = message.spaceAddr === "" ? undefined : message.spaceAddr;
    return obj;
  },
  fromAminoMsg(object: QueryKeyRequestsRequestAminoMsg): QueryKeyRequestsRequest {
    return QueryKeyRequestsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryKeyRequestsRequestProtoMsg): QueryKeyRequestsRequest {
    return QueryKeyRequestsRequest.decode(message.value);
  },
  toProto(message: QueryKeyRequestsRequest): Uint8Array {
    return QueryKeyRequestsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryKeyRequestsRequest): QueryKeyRequestsRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.QueryKeyRequestsRequest",
      value: QueryKeyRequestsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryKeyRequestsResponse(): QueryKeyRequestsResponse {
  return {
    pagination: undefined,
    keyRequests: []
  };
}
export const QueryKeyRequestsResponse = {
  typeUrl: "/warden.warden.v1beta1.QueryKeyRequestsResponse",
  encode(message: QueryKeyRequestsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.keyRequests) {
      KeyRequest.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryKeyRequestsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryKeyRequestsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        case 2:
          message.keyRequests.push(KeyRequest.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryKeyRequestsResponse {
    return {
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      keyRequests: Array.isArray(object?.keyRequests) ? object.keyRequests.map((e: any) => KeyRequest.fromJSON(e)) : []
    };
  },
  toJSON(message: QueryKeyRequestsResponse): unknown {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    if (message.keyRequests) {
      obj.keyRequests = message.keyRequests.map(e => e ? KeyRequest.toJSON(e) : undefined);
    } else {
      obj.keyRequests = [];
    }
    return obj;
  },
  fromPartial(object: Partial<QueryKeyRequestsResponse>): QueryKeyRequestsResponse {
    const message = createBaseQueryKeyRequestsResponse();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    message.keyRequests = object.keyRequests?.map(e => KeyRequest.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryKeyRequestsResponseAmino): QueryKeyRequestsResponse {
    const message = createBaseQueryKeyRequestsResponse();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    message.keyRequests = object.key_requests?.map(e => KeyRequest.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryKeyRequestsResponse): QueryKeyRequestsResponseAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    if (message.keyRequests) {
      obj.key_requests = message.keyRequests.map(e => e ? KeyRequest.toAmino(e) : undefined);
    } else {
      obj.key_requests = message.keyRequests;
    }
    return obj;
  },
  fromAminoMsg(object: QueryKeyRequestsResponseAminoMsg): QueryKeyRequestsResponse {
    return QueryKeyRequestsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryKeyRequestsResponseProtoMsg): QueryKeyRequestsResponse {
    return QueryKeyRequestsResponse.decode(message.value);
  },
  toProto(message: QueryKeyRequestsResponse): Uint8Array {
    return QueryKeyRequestsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryKeyRequestsResponse): QueryKeyRequestsResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.QueryKeyRequestsResponse",
      value: QueryKeyRequestsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryKeyRequestByIdRequest(): QueryKeyRequestByIdRequest {
  return {
    id: BigInt(0)
  };
}
export const QueryKeyRequestByIdRequest = {
  typeUrl: "/warden.warden.v1beta1.QueryKeyRequestByIdRequest",
  encode(message: QueryKeyRequestByIdRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryKeyRequestByIdRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryKeyRequestByIdRequest();
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
  fromJSON(object: any): QueryKeyRequestByIdRequest {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0)
    };
  },
  toJSON(message: QueryKeyRequestByIdRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<QueryKeyRequestByIdRequest>): QueryKeyRequestByIdRequest {
    const message = createBaseQueryKeyRequestByIdRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryKeyRequestByIdRequestAmino): QueryKeyRequestByIdRequest {
    const message = createBaseQueryKeyRequestByIdRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: QueryKeyRequestByIdRequest): QueryKeyRequestByIdRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryKeyRequestByIdRequestAminoMsg): QueryKeyRequestByIdRequest {
    return QueryKeyRequestByIdRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryKeyRequestByIdRequestProtoMsg): QueryKeyRequestByIdRequest {
    return QueryKeyRequestByIdRequest.decode(message.value);
  },
  toProto(message: QueryKeyRequestByIdRequest): Uint8Array {
    return QueryKeyRequestByIdRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryKeyRequestByIdRequest): QueryKeyRequestByIdRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.QueryKeyRequestByIdRequest",
      value: QueryKeyRequestByIdRequest.encode(message).finish()
    };
  }
};
function createBaseQueryKeyRequestByIdResponse(): QueryKeyRequestByIdResponse {
  return {
    keyRequest: undefined
  };
}
export const QueryKeyRequestByIdResponse = {
  typeUrl: "/warden.warden.v1beta1.QueryKeyRequestByIdResponse",
  encode(message: QueryKeyRequestByIdResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.keyRequest !== undefined) {
      KeyRequest.encode(message.keyRequest, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryKeyRequestByIdResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryKeyRequestByIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.keyRequest = KeyRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryKeyRequestByIdResponse {
    return {
      keyRequest: isSet(object.keyRequest) ? KeyRequest.fromJSON(object.keyRequest) : undefined
    };
  },
  toJSON(message: QueryKeyRequestByIdResponse): unknown {
    const obj: any = {};
    message.keyRequest !== undefined && (obj.keyRequest = message.keyRequest ? KeyRequest.toJSON(message.keyRequest) : undefined);
    return obj;
  },
  fromPartial(object: Partial<QueryKeyRequestByIdResponse>): QueryKeyRequestByIdResponse {
    const message = createBaseQueryKeyRequestByIdResponse();
    message.keyRequest = object.keyRequest !== undefined && object.keyRequest !== null ? KeyRequest.fromPartial(object.keyRequest) : undefined;
    return message;
  },
  fromAmino(object: QueryKeyRequestByIdResponseAmino): QueryKeyRequestByIdResponse {
    const message = createBaseQueryKeyRequestByIdResponse();
    if (object.key_request !== undefined && object.key_request !== null) {
      message.keyRequest = KeyRequest.fromAmino(object.key_request);
    }
    return message;
  },
  toAmino(message: QueryKeyRequestByIdResponse): QueryKeyRequestByIdResponseAmino {
    const obj: any = {};
    obj.key_request = message.keyRequest ? KeyRequest.toAmino(message.keyRequest) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryKeyRequestByIdResponseAminoMsg): QueryKeyRequestByIdResponse {
    return QueryKeyRequestByIdResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryKeyRequestByIdResponseProtoMsg): QueryKeyRequestByIdResponse {
    return QueryKeyRequestByIdResponse.decode(message.value);
  },
  toProto(message: QueryKeyRequestByIdResponse): Uint8Array {
    return QueryKeyRequestByIdResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryKeyRequestByIdResponse): QueryKeyRequestByIdResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.QueryKeyRequestByIdResponse",
      value: QueryKeyRequestByIdResponse.encode(message).finish()
    };
  }
};
function createBaseQueryKeysRequest(): QueryKeysRequest {
  return {
    pagination: undefined,
    spaceAddr: "",
    type: 0,
    keyId: BigInt(0)
  };
}
export const QueryKeysRequest = {
  typeUrl: "/warden.warden.v1beta1.QueryKeysRequest",
  encode(message: QueryKeysRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.spaceAddr !== "") {
      writer.uint32(18).string(message.spaceAddr);
    }
    if (message.type !== 0) {
      writer.uint32(24).int32(message.type);
    }
    if (message.keyId !== BigInt(0)) {
      writer.uint32(32).uint64(message.keyId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryKeysRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryKeysRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.spaceAddr = reader.string();
          break;
        case 3:
          message.type = (reader.int32() as any);
          break;
        case 4:
          message.keyId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryKeysRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      spaceAddr: isSet(object.spaceAddr) ? String(object.spaceAddr) : "",
      type: isSet(object.type) ? walletTypeFromJSON(object.type) : -1,
      keyId: isSet(object.keyId) ? BigInt(object.keyId.toString()) : BigInt(0)
    };
  },
  toJSON(message: QueryKeysRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    message.spaceAddr !== undefined && (obj.spaceAddr = message.spaceAddr);
    message.type !== undefined && (obj.type = walletTypeToJSON(message.type));
    message.keyId !== undefined && (obj.keyId = (message.keyId || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<QueryKeysRequest>): QueryKeysRequest {
    const message = createBaseQueryKeysRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    message.spaceAddr = object.spaceAddr ?? "";
    message.type = object.type ?? 0;
    message.keyId = object.keyId !== undefined && object.keyId !== null ? BigInt(object.keyId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryKeysRequestAmino): QueryKeysRequest {
    const message = createBaseQueryKeysRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    if (object.space_addr !== undefined && object.space_addr !== null) {
      message.spaceAddr = object.space_addr;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    }
    if (object.key_id !== undefined && object.key_id !== null) {
      message.keyId = BigInt(object.key_id);
    }
    return message;
  },
  toAmino(message: QueryKeysRequest): QueryKeysRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    obj.space_addr = message.spaceAddr === "" ? undefined : message.spaceAddr;
    obj.type = message.type === 0 ? undefined : message.type;
    obj.key_id = message.keyId !== BigInt(0) ? message.keyId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryKeysRequestAminoMsg): QueryKeysRequest {
    return QueryKeysRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryKeysRequestProtoMsg): QueryKeysRequest {
    return QueryKeysRequest.decode(message.value);
  },
  toProto(message: QueryKeysRequest): Uint8Array {
    return QueryKeysRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryKeysRequest): QueryKeysRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.QueryKeysRequest",
      value: QueryKeysRequest.encode(message).finish()
    };
  }
};
function createBaseQueryKeysResponse(): QueryKeysResponse {
  return {
    pagination: undefined,
    keys: []
  };
}
export const QueryKeysResponse = {
  typeUrl: "/warden.warden.v1beta1.QueryKeysResponse",
  encode(message: QueryKeysResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.keys) {
      KeyResponse.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryKeysResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryKeysResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        case 2:
          message.keys.push(KeyResponse.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryKeysResponse {
    return {
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      keys: Array.isArray(object?.keys) ? object.keys.map((e: any) => KeyResponse.fromJSON(e)) : []
    };
  },
  toJSON(message: QueryKeysResponse): unknown {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    if (message.keys) {
      obj.keys = message.keys.map(e => e ? KeyResponse.toJSON(e) : undefined);
    } else {
      obj.keys = [];
    }
    return obj;
  },
  fromPartial(object: Partial<QueryKeysResponse>): QueryKeysResponse {
    const message = createBaseQueryKeysResponse();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    message.keys = object.keys?.map(e => KeyResponse.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryKeysResponseAmino): QueryKeysResponse {
    const message = createBaseQueryKeysResponse();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    message.keys = object.keys?.map(e => KeyResponse.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryKeysResponse): QueryKeysResponseAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    if (message.keys) {
      obj.keys = message.keys.map(e => e ? KeyResponse.toAmino(e) : undefined);
    } else {
      obj.keys = message.keys;
    }
    return obj;
  },
  fromAminoMsg(object: QueryKeysResponseAminoMsg): QueryKeysResponse {
    return QueryKeysResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryKeysResponseProtoMsg): QueryKeysResponse {
    return QueryKeysResponse.decode(message.value);
  },
  toProto(message: QueryKeysResponse): Uint8Array {
    return QueryKeysResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryKeysResponse): QueryKeysResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.QueryKeysResponse",
      value: QueryKeysResponse.encode(message).finish()
    };
  }
};
function createBaseKeyResponse(): KeyResponse {
  return {
    key: undefined,
    wallets: []
  };
}
export const KeyResponse = {
  typeUrl: "/warden.warden.v1beta1.KeyResponse",
  encode(message: KeyResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.key !== undefined) {
      Key.encode(message.key, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.wallets) {
      WalletKeyResponse.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): KeyResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = Key.decode(reader, reader.uint32());
          break;
        case 2:
          message.wallets.push(WalletKeyResponse.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): KeyResponse {
    return {
      key: isSet(object.key) ? Key.fromJSON(object.key) : undefined,
      wallets: Array.isArray(object?.wallets) ? object.wallets.map((e: any) => WalletKeyResponse.fromJSON(e)) : []
    };
  },
  toJSON(message: KeyResponse): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key ? Key.toJSON(message.key) : undefined);
    if (message.wallets) {
      obj.wallets = message.wallets.map(e => e ? WalletKeyResponse.toJSON(e) : undefined);
    } else {
      obj.wallets = [];
    }
    return obj;
  },
  fromPartial(object: Partial<KeyResponse>): KeyResponse {
    const message = createBaseKeyResponse();
    message.key = object.key !== undefined && object.key !== null ? Key.fromPartial(object.key) : undefined;
    message.wallets = object.wallets?.map(e => WalletKeyResponse.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: KeyResponseAmino): KeyResponse {
    const message = createBaseKeyResponse();
    if (object.key !== undefined && object.key !== null) {
      message.key = Key.fromAmino(object.key);
    }
    message.wallets = object.wallets?.map(e => WalletKeyResponse.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: KeyResponse): KeyResponseAmino {
    const obj: any = {};
    obj.key = message.key ? Key.toAmino(message.key) : undefined;
    if (message.wallets) {
      obj.wallets = message.wallets.map(e => e ? WalletKeyResponse.toAmino(e) : undefined);
    } else {
      obj.wallets = message.wallets;
    }
    return obj;
  },
  fromAminoMsg(object: KeyResponseAminoMsg): KeyResponse {
    return KeyResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: KeyResponseProtoMsg): KeyResponse {
    return KeyResponse.decode(message.value);
  },
  toProto(message: KeyResponse): Uint8Array {
    return KeyResponse.encode(message).finish();
  },
  toProtoMsg(message: KeyResponse): KeyResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.KeyResponse",
      value: KeyResponse.encode(message).finish()
    };
  }
};
function createBaseWalletKeyResponse(): WalletKeyResponse {
  return {
    address: "",
    type: 0
  };
}
export const WalletKeyResponse = {
  typeUrl: "/warden.warden.v1beta1.WalletKeyResponse",
  encode(message: WalletKeyResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): WalletKeyResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWalletKeyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.type = (reader.int32() as any);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): WalletKeyResponse {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      type: isSet(object.type) ? walletTypeFromJSON(object.type) : -1
    };
  },
  toJSON(message: WalletKeyResponse): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.type !== undefined && (obj.type = walletTypeToJSON(message.type));
    return obj;
  },
  fromPartial(object: Partial<WalletKeyResponse>): WalletKeyResponse {
    const message = createBaseWalletKeyResponse();
    message.address = object.address ?? "";
    message.type = object.type ?? 0;
    return message;
  },
  fromAmino(object: WalletKeyResponseAmino): WalletKeyResponse {
    const message = createBaseWalletKeyResponse();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    }
    return message;
  },
  toAmino(message: WalletKeyResponse): WalletKeyResponseAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    obj.type = message.type === 0 ? undefined : message.type;
    return obj;
  },
  fromAminoMsg(object: WalletKeyResponseAminoMsg): WalletKeyResponse {
    return WalletKeyResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: WalletKeyResponseProtoMsg): WalletKeyResponse {
    return WalletKeyResponse.decode(message.value);
  },
  toProto(message: WalletKeyResponse): Uint8Array {
    return WalletKeyResponse.encode(message).finish();
  },
  toProtoMsg(message: WalletKeyResponse): WalletKeyResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.WalletKeyResponse",
      value: WalletKeyResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySignatureRequestsRequest(): QuerySignatureRequestsRequest {
  return {
    pagination: undefined,
    keychainAddr: "",
    status: 0
  };
}
export const QuerySignatureRequestsRequest = {
  typeUrl: "/warden.warden.v1beta1.QuerySignatureRequestsRequest",
  encode(message: QuerySignatureRequestsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.keychainAddr !== "") {
      writer.uint32(18).string(message.keychainAddr);
    }
    if (message.status !== 0) {
      writer.uint32(24).int32(message.status);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySignatureRequestsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySignatureRequestsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.keychainAddr = reader.string();
          break;
        case 3:
          message.status = (reader.int32() as any);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QuerySignatureRequestsRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      keychainAddr: isSet(object.keychainAddr) ? String(object.keychainAddr) : "",
      status: isSet(object.status) ? signRequestStatusFromJSON(object.status) : -1
    };
  },
  toJSON(message: QuerySignatureRequestsRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    message.keychainAddr !== undefined && (obj.keychainAddr = message.keychainAddr);
    message.status !== undefined && (obj.status = signRequestStatusToJSON(message.status));
    return obj;
  },
  fromPartial(object: Partial<QuerySignatureRequestsRequest>): QuerySignatureRequestsRequest {
    const message = createBaseQuerySignatureRequestsRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    message.keychainAddr = object.keychainAddr ?? "";
    message.status = object.status ?? 0;
    return message;
  },
  fromAmino(object: QuerySignatureRequestsRequestAmino): QuerySignatureRequestsRequest {
    const message = createBaseQuerySignatureRequestsRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    if (object.keychain_addr !== undefined && object.keychain_addr !== null) {
      message.keychainAddr = object.keychain_addr;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    return message;
  },
  toAmino(message: QuerySignatureRequestsRequest): QuerySignatureRequestsRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    obj.keychain_addr = message.keychainAddr === "" ? undefined : message.keychainAddr;
    obj.status = message.status === 0 ? undefined : message.status;
    return obj;
  },
  fromAminoMsg(object: QuerySignatureRequestsRequestAminoMsg): QuerySignatureRequestsRequest {
    return QuerySignatureRequestsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySignatureRequestsRequestProtoMsg): QuerySignatureRequestsRequest {
    return QuerySignatureRequestsRequest.decode(message.value);
  },
  toProto(message: QuerySignatureRequestsRequest): Uint8Array {
    return QuerySignatureRequestsRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySignatureRequestsRequest): QuerySignatureRequestsRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.QuerySignatureRequestsRequest",
      value: QuerySignatureRequestsRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySignatureRequestsResponse(): QuerySignatureRequestsResponse {
  return {
    pagination: undefined,
    signRequests: []
  };
}
export const QuerySignatureRequestsResponse = {
  typeUrl: "/warden.warden.v1beta1.QuerySignatureRequestsResponse",
  encode(message: QuerySignatureRequestsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.signRequests) {
      SignRequest.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySignatureRequestsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySignatureRequestsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        case 2:
          message.signRequests.push(SignRequest.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QuerySignatureRequestsResponse {
    return {
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      signRequests: Array.isArray(object?.signRequests) ? object.signRequests.map((e: any) => SignRequest.fromJSON(e)) : []
    };
  },
  toJSON(message: QuerySignatureRequestsResponse): unknown {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    if (message.signRequests) {
      obj.signRequests = message.signRequests.map(e => e ? SignRequest.toJSON(e) : undefined);
    } else {
      obj.signRequests = [];
    }
    return obj;
  },
  fromPartial(object: Partial<QuerySignatureRequestsResponse>): QuerySignatureRequestsResponse {
    const message = createBaseQuerySignatureRequestsResponse();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    message.signRequests = object.signRequests?.map(e => SignRequest.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QuerySignatureRequestsResponseAmino): QuerySignatureRequestsResponse {
    const message = createBaseQuerySignatureRequestsResponse();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    message.signRequests = object.sign_requests?.map(e => SignRequest.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QuerySignatureRequestsResponse): QuerySignatureRequestsResponseAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    if (message.signRequests) {
      obj.sign_requests = message.signRequests.map(e => e ? SignRequest.toAmino(e) : undefined);
    } else {
      obj.sign_requests = message.signRequests;
    }
    return obj;
  },
  fromAminoMsg(object: QuerySignatureRequestsResponseAminoMsg): QuerySignatureRequestsResponse {
    return QuerySignatureRequestsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySignatureRequestsResponseProtoMsg): QuerySignatureRequestsResponse {
    return QuerySignatureRequestsResponse.decode(message.value);
  },
  toProto(message: QuerySignatureRequestsResponse): Uint8Array {
    return QuerySignatureRequestsResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySignatureRequestsResponse): QuerySignatureRequestsResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.QuerySignatureRequestsResponse",
      value: QuerySignatureRequestsResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySignatureRequestByIdRequest(): QuerySignatureRequestByIdRequest {
  return {
    id: BigInt(0)
  };
}
export const QuerySignatureRequestByIdRequest = {
  typeUrl: "/warden.warden.v1beta1.QuerySignatureRequestByIdRequest",
  encode(message: QuerySignatureRequestByIdRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySignatureRequestByIdRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySignatureRequestByIdRequest();
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
  fromJSON(object: any): QuerySignatureRequestByIdRequest {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0)
    };
  },
  toJSON(message: QuerySignatureRequestByIdRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<QuerySignatureRequestByIdRequest>): QuerySignatureRequestByIdRequest {
    const message = createBaseQuerySignatureRequestByIdRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QuerySignatureRequestByIdRequestAmino): QuerySignatureRequestByIdRequest {
    const message = createBaseQuerySignatureRequestByIdRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: QuerySignatureRequestByIdRequest): QuerySignatureRequestByIdRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySignatureRequestByIdRequestAminoMsg): QuerySignatureRequestByIdRequest {
    return QuerySignatureRequestByIdRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySignatureRequestByIdRequestProtoMsg): QuerySignatureRequestByIdRequest {
    return QuerySignatureRequestByIdRequest.decode(message.value);
  },
  toProto(message: QuerySignatureRequestByIdRequest): Uint8Array {
    return QuerySignatureRequestByIdRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySignatureRequestByIdRequest): QuerySignatureRequestByIdRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.QuerySignatureRequestByIdRequest",
      value: QuerySignatureRequestByIdRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySignatureRequestByIdResponse(): QuerySignatureRequestByIdResponse {
  return {
    signRequest: undefined
  };
}
export const QuerySignatureRequestByIdResponse = {
  typeUrl: "/warden.warden.v1beta1.QuerySignatureRequestByIdResponse",
  encode(message: QuerySignatureRequestByIdResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.signRequest !== undefined) {
      SignRequest.encode(message.signRequest, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySignatureRequestByIdResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySignatureRequestByIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.signRequest = SignRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QuerySignatureRequestByIdResponse {
    return {
      signRequest: isSet(object.signRequest) ? SignRequest.fromJSON(object.signRequest) : undefined
    };
  },
  toJSON(message: QuerySignatureRequestByIdResponse): unknown {
    const obj: any = {};
    message.signRequest !== undefined && (obj.signRequest = message.signRequest ? SignRequest.toJSON(message.signRequest) : undefined);
    return obj;
  },
  fromPartial(object: Partial<QuerySignatureRequestByIdResponse>): QuerySignatureRequestByIdResponse {
    const message = createBaseQuerySignatureRequestByIdResponse();
    message.signRequest = object.signRequest !== undefined && object.signRequest !== null ? SignRequest.fromPartial(object.signRequest) : undefined;
    return message;
  },
  fromAmino(object: QuerySignatureRequestByIdResponseAmino): QuerySignatureRequestByIdResponse {
    const message = createBaseQuerySignatureRequestByIdResponse();
    if (object.sign_request !== undefined && object.sign_request !== null) {
      message.signRequest = SignRequest.fromAmino(object.sign_request);
    }
    return message;
  },
  toAmino(message: QuerySignatureRequestByIdResponse): QuerySignatureRequestByIdResponseAmino {
    const obj: any = {};
    obj.sign_request = message.signRequest ? SignRequest.toAmino(message.signRequest) : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySignatureRequestByIdResponseAminoMsg): QuerySignatureRequestByIdResponse {
    return QuerySignatureRequestByIdResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySignatureRequestByIdResponseProtoMsg): QuerySignatureRequestByIdResponse {
    return QuerySignatureRequestByIdResponse.decode(message.value);
  },
  toProto(message: QuerySignatureRequestByIdResponse): Uint8Array {
    return QuerySignatureRequestByIdResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySignatureRequestByIdResponse): QuerySignatureRequestByIdResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.QuerySignatureRequestByIdResponse",
      value: QuerySignatureRequestByIdResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySignTransactionRequestsRequest(): QuerySignTransactionRequestsRequest {
  return {
    pagination: undefined,
    walletType: 0,
    keyId: BigInt(0),
    status: 0
  };
}
export const QuerySignTransactionRequestsRequest = {
  typeUrl: "/warden.warden.v1beta1.QuerySignTransactionRequestsRequest",
  encode(message: QuerySignTransactionRequestsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.walletType !== 0) {
      writer.uint32(16).int32(message.walletType);
    }
    if (message.keyId !== BigInt(0)) {
      writer.uint32(24).uint64(message.keyId);
    }
    if (message.status !== 0) {
      writer.uint32(32).int32(message.status);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySignTransactionRequestsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySignTransactionRequestsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.walletType = (reader.int32() as any);
          break;
        case 3:
          message.keyId = reader.uint64();
          break;
        case 4:
          message.status = (reader.int32() as any);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QuerySignTransactionRequestsRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      walletType: isSet(object.walletType) ? walletTypeFromJSON(object.walletType) : -1,
      keyId: isSet(object.keyId) ? BigInt(object.keyId.toString()) : BigInt(0),
      status: isSet(object.status) ? signRequestStatusFromJSON(object.status) : -1
    };
  },
  toJSON(message: QuerySignTransactionRequestsRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    message.walletType !== undefined && (obj.walletType = walletTypeToJSON(message.walletType));
    message.keyId !== undefined && (obj.keyId = (message.keyId || BigInt(0)).toString());
    message.status !== undefined && (obj.status = signRequestStatusToJSON(message.status));
    return obj;
  },
  fromPartial(object: Partial<QuerySignTransactionRequestsRequest>): QuerySignTransactionRequestsRequest {
    const message = createBaseQuerySignTransactionRequestsRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    message.walletType = object.walletType ?? 0;
    message.keyId = object.keyId !== undefined && object.keyId !== null ? BigInt(object.keyId.toString()) : BigInt(0);
    message.status = object.status ?? 0;
    return message;
  },
  fromAmino(object: QuerySignTransactionRequestsRequestAmino): QuerySignTransactionRequestsRequest {
    const message = createBaseQuerySignTransactionRequestsRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    if (object.wallet_type !== undefined && object.wallet_type !== null) {
      message.walletType = object.wallet_type;
    }
    if (object.key_id !== undefined && object.key_id !== null) {
      message.keyId = BigInt(object.key_id);
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    return message;
  },
  toAmino(message: QuerySignTransactionRequestsRequest): QuerySignTransactionRequestsRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    obj.wallet_type = message.walletType === 0 ? undefined : message.walletType;
    obj.key_id = message.keyId !== BigInt(0) ? message.keyId.toString() : undefined;
    obj.status = message.status === 0 ? undefined : message.status;
    return obj;
  },
  fromAminoMsg(object: QuerySignTransactionRequestsRequestAminoMsg): QuerySignTransactionRequestsRequest {
    return QuerySignTransactionRequestsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySignTransactionRequestsRequestProtoMsg): QuerySignTransactionRequestsRequest {
    return QuerySignTransactionRequestsRequest.decode(message.value);
  },
  toProto(message: QuerySignTransactionRequestsRequest): Uint8Array {
    return QuerySignTransactionRequestsRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySignTransactionRequestsRequest): QuerySignTransactionRequestsRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.QuerySignTransactionRequestsRequest",
      value: QuerySignTransactionRequestsRequest.encode(message).finish()
    };
  }
};
function createBaseSignTransactionRequestResponse(): SignTransactionRequestResponse {
  return {
    signTransactionRequest: undefined,
    signRequest: undefined
  };
}
export const SignTransactionRequestResponse = {
  typeUrl: "/warden.warden.v1beta1.SignTransactionRequestResponse",
  encode(message: SignTransactionRequestResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.signTransactionRequest !== undefined) {
      SignTransactionRequest.encode(message.signTransactionRequest, writer.uint32(10).fork()).ldelim();
    }
    if (message.signRequest !== undefined) {
      SignRequest.encode(message.signRequest, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SignTransactionRequestResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignTransactionRequestResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.signTransactionRequest = SignTransactionRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.signRequest = SignRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SignTransactionRequestResponse {
    return {
      signTransactionRequest: isSet(object.signTransactionRequest) ? SignTransactionRequest.fromJSON(object.signTransactionRequest) : undefined,
      signRequest: isSet(object.signRequest) ? SignRequest.fromJSON(object.signRequest) : undefined
    };
  },
  toJSON(message: SignTransactionRequestResponse): unknown {
    const obj: any = {};
    message.signTransactionRequest !== undefined && (obj.signTransactionRequest = message.signTransactionRequest ? SignTransactionRequest.toJSON(message.signTransactionRequest) : undefined);
    message.signRequest !== undefined && (obj.signRequest = message.signRequest ? SignRequest.toJSON(message.signRequest) : undefined);
    return obj;
  },
  fromPartial(object: Partial<SignTransactionRequestResponse>): SignTransactionRequestResponse {
    const message = createBaseSignTransactionRequestResponse();
    message.signTransactionRequest = object.signTransactionRequest !== undefined && object.signTransactionRequest !== null ? SignTransactionRequest.fromPartial(object.signTransactionRequest) : undefined;
    message.signRequest = object.signRequest !== undefined && object.signRequest !== null ? SignRequest.fromPartial(object.signRequest) : undefined;
    return message;
  },
  fromAmino(object: SignTransactionRequestResponseAmino): SignTransactionRequestResponse {
    const message = createBaseSignTransactionRequestResponse();
    if (object.sign_transaction_request !== undefined && object.sign_transaction_request !== null) {
      message.signTransactionRequest = SignTransactionRequest.fromAmino(object.sign_transaction_request);
    }
    if (object.sign_request !== undefined && object.sign_request !== null) {
      message.signRequest = SignRequest.fromAmino(object.sign_request);
    }
    return message;
  },
  toAmino(message: SignTransactionRequestResponse): SignTransactionRequestResponseAmino {
    const obj: any = {};
    obj.sign_transaction_request = message.signTransactionRequest ? SignTransactionRequest.toAmino(message.signTransactionRequest) : undefined;
    obj.sign_request = message.signRequest ? SignRequest.toAmino(message.signRequest) : undefined;
    return obj;
  },
  fromAminoMsg(object: SignTransactionRequestResponseAminoMsg): SignTransactionRequestResponse {
    return SignTransactionRequestResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: SignTransactionRequestResponseProtoMsg): SignTransactionRequestResponse {
    return SignTransactionRequestResponse.decode(message.value);
  },
  toProto(message: SignTransactionRequestResponse): Uint8Array {
    return SignTransactionRequestResponse.encode(message).finish();
  },
  toProtoMsg(message: SignTransactionRequestResponse): SignTransactionRequestResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.SignTransactionRequestResponse",
      value: SignTransactionRequestResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySignTransactionRequestsResponse(): QuerySignTransactionRequestsResponse {
  return {
    pagination: undefined,
    signTransactionRequests: []
  };
}
export const QuerySignTransactionRequestsResponse = {
  typeUrl: "/warden.warden.v1beta1.QuerySignTransactionRequestsResponse",
  encode(message: QuerySignTransactionRequestsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.signTransactionRequests) {
      SignTransactionRequestResponse.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySignTransactionRequestsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySignTransactionRequestsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        case 2:
          message.signTransactionRequests.push(SignTransactionRequestResponse.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QuerySignTransactionRequestsResponse {
    return {
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      signTransactionRequests: Array.isArray(object?.signTransactionRequests) ? object.signTransactionRequests.map((e: any) => SignTransactionRequestResponse.fromJSON(e)) : []
    };
  },
  toJSON(message: QuerySignTransactionRequestsResponse): unknown {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    if (message.signTransactionRequests) {
      obj.signTransactionRequests = message.signTransactionRequests.map(e => e ? SignTransactionRequestResponse.toJSON(e) : undefined);
    } else {
      obj.signTransactionRequests = [];
    }
    return obj;
  },
  fromPartial(object: Partial<QuerySignTransactionRequestsResponse>): QuerySignTransactionRequestsResponse {
    const message = createBaseQuerySignTransactionRequestsResponse();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    message.signTransactionRequests = object.signTransactionRequests?.map(e => SignTransactionRequestResponse.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QuerySignTransactionRequestsResponseAmino): QuerySignTransactionRequestsResponse {
    const message = createBaseQuerySignTransactionRequestsResponse();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    message.signTransactionRequests = object.sign_transaction_requests?.map(e => SignTransactionRequestResponse.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QuerySignTransactionRequestsResponse): QuerySignTransactionRequestsResponseAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    if (message.signTransactionRequests) {
      obj.sign_transaction_requests = message.signTransactionRequests.map(e => e ? SignTransactionRequestResponse.toAmino(e) : undefined);
    } else {
      obj.sign_transaction_requests = message.signTransactionRequests;
    }
    return obj;
  },
  fromAminoMsg(object: QuerySignTransactionRequestsResponseAminoMsg): QuerySignTransactionRequestsResponse {
    return QuerySignTransactionRequestsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySignTransactionRequestsResponseProtoMsg): QuerySignTransactionRequestsResponse {
    return QuerySignTransactionRequestsResponse.decode(message.value);
  },
  toProto(message: QuerySignTransactionRequestsResponse): Uint8Array {
    return QuerySignTransactionRequestsResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySignTransactionRequestsResponse): QuerySignTransactionRequestsResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.QuerySignTransactionRequestsResponse",
      value: QuerySignTransactionRequestsResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySignTransactionRequestByIdRequest(): QuerySignTransactionRequestByIdRequest {
  return {
    id: BigInt(0)
  };
}
export const QuerySignTransactionRequestByIdRequest = {
  typeUrl: "/warden.warden.v1beta1.QuerySignTransactionRequestByIdRequest",
  encode(message: QuerySignTransactionRequestByIdRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySignTransactionRequestByIdRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySignTransactionRequestByIdRequest();
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
  fromJSON(object: any): QuerySignTransactionRequestByIdRequest {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0)
    };
  },
  toJSON(message: QuerySignTransactionRequestByIdRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<QuerySignTransactionRequestByIdRequest>): QuerySignTransactionRequestByIdRequest {
    const message = createBaseQuerySignTransactionRequestByIdRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QuerySignTransactionRequestByIdRequestAmino): QuerySignTransactionRequestByIdRequest {
    const message = createBaseQuerySignTransactionRequestByIdRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: QuerySignTransactionRequestByIdRequest): QuerySignTransactionRequestByIdRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySignTransactionRequestByIdRequestAminoMsg): QuerySignTransactionRequestByIdRequest {
    return QuerySignTransactionRequestByIdRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySignTransactionRequestByIdRequestProtoMsg): QuerySignTransactionRequestByIdRequest {
    return QuerySignTransactionRequestByIdRequest.decode(message.value);
  },
  toProto(message: QuerySignTransactionRequestByIdRequest): Uint8Array {
    return QuerySignTransactionRequestByIdRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySignTransactionRequestByIdRequest): QuerySignTransactionRequestByIdRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.QuerySignTransactionRequestByIdRequest",
      value: QuerySignTransactionRequestByIdRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySignTransactionRequestByIdResponse(): QuerySignTransactionRequestByIdResponse {
  return {
    signTransactionRequest: undefined
  };
}
export const QuerySignTransactionRequestByIdResponse = {
  typeUrl: "/warden.warden.v1beta1.QuerySignTransactionRequestByIdResponse",
  encode(message: QuerySignTransactionRequestByIdResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.signTransactionRequest !== undefined) {
      SignTransactionRequest.encode(message.signTransactionRequest, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySignTransactionRequestByIdResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySignTransactionRequestByIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.signTransactionRequest = SignTransactionRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QuerySignTransactionRequestByIdResponse {
    return {
      signTransactionRequest: isSet(object.signTransactionRequest) ? SignTransactionRequest.fromJSON(object.signTransactionRequest) : undefined
    };
  },
  toJSON(message: QuerySignTransactionRequestByIdResponse): unknown {
    const obj: any = {};
    message.signTransactionRequest !== undefined && (obj.signTransactionRequest = message.signTransactionRequest ? SignTransactionRequest.toJSON(message.signTransactionRequest) : undefined);
    return obj;
  },
  fromPartial(object: Partial<QuerySignTransactionRequestByIdResponse>): QuerySignTransactionRequestByIdResponse {
    const message = createBaseQuerySignTransactionRequestByIdResponse();
    message.signTransactionRequest = object.signTransactionRequest !== undefined && object.signTransactionRequest !== null ? SignTransactionRequest.fromPartial(object.signTransactionRequest) : undefined;
    return message;
  },
  fromAmino(object: QuerySignTransactionRequestByIdResponseAmino): QuerySignTransactionRequestByIdResponse {
    const message = createBaseQuerySignTransactionRequestByIdResponse();
    if (object.sign_transaction_request !== undefined && object.sign_transaction_request !== null) {
      message.signTransactionRequest = SignTransactionRequest.fromAmino(object.sign_transaction_request);
    }
    return message;
  },
  toAmino(message: QuerySignTransactionRequestByIdResponse): QuerySignTransactionRequestByIdResponseAmino {
    const obj: any = {};
    obj.sign_transaction_request = message.signTransactionRequest ? SignTransactionRequest.toAmino(message.signTransactionRequest) : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySignTransactionRequestByIdResponseAminoMsg): QuerySignTransactionRequestByIdResponse {
    return QuerySignTransactionRequestByIdResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySignTransactionRequestByIdResponseProtoMsg): QuerySignTransactionRequestByIdResponse {
    return QuerySignTransactionRequestByIdResponse.decode(message.value);
  },
  toProto(message: QuerySignTransactionRequestByIdResponse): Uint8Array {
    return QuerySignTransactionRequestByIdResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySignTransactionRequestByIdResponse): QuerySignTransactionRequestByIdResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.QuerySignTransactionRequestByIdResponse",
      value: QuerySignTransactionRequestByIdResponse.encode(message).finish()
    };
  }
};