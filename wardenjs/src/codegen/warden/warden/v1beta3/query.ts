//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../../cosmos/base/query/v1beta1/pagination.js";
import { KeyRequestStatus, AddressType, KeyRequest, KeyRequestAmino, KeyRequestSDKType, Key, KeyAmino, KeySDKType, keyRequestStatusFromJSON, keyRequestStatusToJSON, addressTypeFromJSON, addressTypeToJSON } from "./key.js";
import { SignRequestStatus, SignRequest, SignRequestAmino, SignRequestSDKType, signRequestStatusFromJSON, signRequestStatusToJSON } from "./signature.js";
import { Params, ParamsAmino, ParamsSDKType } from "./params.js";
import { Space, SpaceAmino, SpaceSDKType } from "./space.js";
import { Keychain, KeychainAmino, KeychainSDKType } from "./keychain.js";
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { JsonSafe } from "../../../json-safe.js";
import { isSet } from "../../../helpers.js";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta3.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/warden.warden.v1beta3.QueryParamsRequest";
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
  typeUrl: "/warden.warden.v1beta3.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params holds all the parameters of this module. */
  params: ParamsAmino;
}
export interface QueryParamsResponseAminoMsg {
  type: "/warden.warden.v1beta3.QueryParamsResponse";
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
  typeUrl: "/warden.warden.v1beta3.QuerySpacesRequest";
  value: Uint8Array;
}
export interface QuerySpacesRequestAmino {
  pagination?: PageRequestAmino;
}
export interface QuerySpacesRequestAminoMsg {
  type: "/warden.warden.v1beta3.QuerySpacesRequest";
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
  typeUrl: "/warden.warden.v1beta3.QuerySpacesResponse";
  value: Uint8Array;
}
export interface QuerySpacesResponseAmino {
  pagination?: PageResponseAmino;
  spaces?: SpaceAmino[];
}
export interface QuerySpacesResponseAminoMsg {
  type: "/warden.warden.v1beta3.QuerySpacesResponse";
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
  typeUrl: "/warden.warden.v1beta3.QuerySpacesByOwnerRequest";
  value: Uint8Array;
}
export interface QuerySpacesByOwnerRequestAmino {
  pagination?: PageRequestAmino;
  owner?: string;
}
export interface QuerySpacesByOwnerRequestAminoMsg {
  type: "/warden.warden.v1beta3.QuerySpacesByOwnerRequest";
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
  typeUrl: "/warden.warden.v1beta3.QueryKeychainsRequest";
  value: Uint8Array;
}
export interface QueryKeychainsRequestAmino {
  pagination?: PageRequestAmino;
}
export interface QueryKeychainsRequestAminoMsg {
  type: "/warden.warden.v1beta3.QueryKeychainsRequest";
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
  typeUrl: "/warden.warden.v1beta3.QueryKeychainsResponse";
  value: Uint8Array;
}
export interface QueryKeychainsResponseAmino {
  pagination?: PageResponseAmino;
  keychains?: KeychainAmino[];
}
export interface QueryKeychainsResponseAminoMsg {
  type: "/warden.warden.v1beta3.QueryKeychainsResponse";
  value: QueryKeychainsResponseAmino;
}
export interface QueryKeychainsResponseSDKType {
  pagination?: PageResponseSDKType;
  keychains: KeychainSDKType[];
}
export interface QuerySpaceByIdRequest {
  id: bigint;
}
export interface QuerySpaceByIdRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta3.QuerySpaceByIdRequest";
  value: Uint8Array;
}
export interface QuerySpaceByIdRequestAmino {
  id?: string;
}
export interface QuerySpaceByIdRequestAminoMsg {
  type: "/warden.warden.v1beta3.QuerySpaceByIdRequest";
  value: QuerySpaceByIdRequestAmino;
}
export interface QuerySpaceByIdRequestSDKType {
  id: bigint;
}
export interface QuerySpaceByIdResponse {
  space?: Space;
}
export interface QuerySpaceByIdResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta3.QuerySpaceByIdResponse";
  value: Uint8Array;
}
export interface QuerySpaceByIdResponseAmino {
  space?: SpaceAmino;
}
export interface QuerySpaceByIdResponseAminoMsg {
  type: "/warden.warden.v1beta3.QuerySpaceByIdResponse";
  value: QuerySpaceByIdResponseAmino;
}
export interface QuerySpaceByIdResponseSDKType {
  space?: SpaceSDKType;
}
export interface QueryKeychainByIdRequest {
  id: bigint;
}
export interface QueryKeychainByIdRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta3.QueryKeychainByIdRequest";
  value: Uint8Array;
}
export interface QueryKeychainByIdRequestAmino {
  id?: string;
}
export interface QueryKeychainByIdRequestAminoMsg {
  type: "/warden.warden.v1beta3.QueryKeychainByIdRequest";
  value: QueryKeychainByIdRequestAmino;
}
export interface QueryKeychainByIdRequestSDKType {
  id: bigint;
}
export interface QueryKeychainByIdResponse {
  keychain?: Keychain;
}
export interface QueryKeychainByIdResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta3.QueryKeychainByIdResponse";
  value: Uint8Array;
}
export interface QueryKeychainByIdResponseAmino {
  keychain?: KeychainAmino;
}
export interface QueryKeychainByIdResponseAminoMsg {
  type: "/warden.warden.v1beta3.QueryKeychainByIdResponse";
  value: QueryKeychainByIdResponseAmino;
}
export interface QueryKeychainByIdResponseSDKType {
  keychain?: KeychainSDKType;
}
export interface QueryKeyRequestsRequest {
  pagination?: PageRequest;
  keychainId: bigint;
  /** Optional */
  status: KeyRequestStatus;
  spaceId: bigint;
}
export interface QueryKeyRequestsRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta3.QueryKeyRequestsRequest";
  value: Uint8Array;
}
export interface QueryKeyRequestsRequestAmino {
  pagination?: PageRequestAmino;
  keychain_id?: string;
  /** Optional */
  status?: KeyRequestStatus;
  space_id?: string;
}
export interface QueryKeyRequestsRequestAminoMsg {
  type: "/warden.warden.v1beta3.QueryKeyRequestsRequest";
  value: QueryKeyRequestsRequestAmino;
}
export interface QueryKeyRequestsRequestSDKType {
  pagination?: PageRequestSDKType;
  keychain_id: bigint;
  status: KeyRequestStatus;
  space_id: bigint;
}
export interface QueryKeyRequestsResponse {
  pagination?: PageResponse;
  keyRequests: KeyRequest[];
}
export interface QueryKeyRequestsResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta3.QueryKeyRequestsResponse";
  value: Uint8Array;
}
export interface QueryKeyRequestsResponseAmino {
  pagination?: PageResponseAmino;
  key_requests?: KeyRequestAmino[];
}
export interface QueryKeyRequestsResponseAminoMsg {
  type: "/warden.warden.v1beta3.QueryKeyRequestsResponse";
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
  typeUrl: "/warden.warden.v1beta3.QueryKeyRequestByIdRequest";
  value: Uint8Array;
}
export interface QueryKeyRequestByIdRequestAmino {
  id?: string;
}
export interface QueryKeyRequestByIdRequestAminoMsg {
  type: "/warden.warden.v1beta3.QueryKeyRequestByIdRequest";
  value: QueryKeyRequestByIdRequestAmino;
}
export interface QueryKeyRequestByIdRequestSDKType {
  id: bigint;
}
export interface QueryKeyRequestByIdResponse {
  keyRequest?: KeyRequest;
}
export interface QueryKeyRequestByIdResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta3.QueryKeyRequestByIdResponse";
  value: Uint8Array;
}
export interface QueryKeyRequestByIdResponseAmino {
  key_request?: KeyRequestAmino;
}
export interface QueryKeyRequestByIdResponseAminoMsg {
  type: "/warden.warden.v1beta3.QueryKeyRequestByIdResponse";
  value: QueryKeyRequestByIdResponseAmino;
}
export interface QueryKeyRequestByIdResponseSDKType {
  key_request?: KeyRequestSDKType;
}
export interface QueryAllKeysRequest {
  pagination?: PageRequest;
  /** Optional */
  deriveAddresses: AddressType[];
}
export interface QueryAllKeysRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta3.QueryAllKeysRequest";
  value: Uint8Array;
}
export interface QueryAllKeysRequestAmino {
  pagination?: PageRequestAmino;
  /** Optional */
  derive_addresses?: AddressType[];
}
export interface QueryAllKeysRequestAminoMsg {
  type: "/warden.warden.v1beta3.QueryAllKeysRequest";
  value: QueryAllKeysRequestAmino;
}
export interface QueryAllKeysRequestSDKType {
  pagination?: PageRequestSDKType;
  derive_addresses: AddressType[];
}
export interface QueryKeysResponse {
  pagination?: PageResponse;
  keys: QueryKeyResponse[];
}
export interface QueryKeysResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta3.QueryKeysResponse";
  value: Uint8Array;
}
export interface QueryKeysResponseAmino {
  pagination?: PageResponseAmino;
  keys?: QueryKeyResponseAmino[];
}
export interface QueryKeysResponseAminoMsg {
  type: "/warden.warden.v1beta3.QueryKeysResponse";
  value: QueryKeysResponseAmino;
}
export interface QueryKeysResponseSDKType {
  pagination?: PageResponseSDKType;
  keys: QueryKeyResponseSDKType[];
}
export interface QueryKeysBySpaceIdRequest {
  pagination?: PageRequest;
  spaceId: bigint;
  /** Optional */
  deriveAddresses: AddressType[];
}
export interface QueryKeysBySpaceIdRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta3.QueryKeysBySpaceIdRequest";
  value: Uint8Array;
}
export interface QueryKeysBySpaceIdRequestAmino {
  pagination?: PageRequestAmino;
  space_id?: string;
  /** Optional */
  derive_addresses?: AddressType[];
}
export interface QueryKeysBySpaceIdRequestAminoMsg {
  type: "/warden.warden.v1beta3.QueryKeysBySpaceIdRequest";
  value: QueryKeysBySpaceIdRequestAmino;
}
export interface QueryKeysBySpaceIdRequestSDKType {
  pagination?: PageRequestSDKType;
  space_id: bigint;
  derive_addresses: AddressType[];
}
export interface QueryKeyByIdRequest {
  id: bigint;
  /** Optional */
  deriveAddresses: AddressType[];
}
export interface QueryKeyByIdRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta3.QueryKeyByIdRequest";
  value: Uint8Array;
}
export interface QueryKeyByIdRequestAmino {
  id?: string;
  /** Optional */
  derive_addresses?: AddressType[];
}
export interface QueryKeyByIdRequestAminoMsg {
  type: "/warden.warden.v1beta3.QueryKeyByIdRequest";
  value: QueryKeyByIdRequestAmino;
}
export interface QueryKeyByIdRequestSDKType {
  id: bigint;
  derive_addresses: AddressType[];
}
export interface QueryKeyResponse {
  key: Key;
  addresses: AddressResponse[];
}
export interface QueryKeyResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta3.QueryKeyResponse";
  value: Uint8Array;
}
export interface QueryKeyResponseAmino {
  key?: KeyAmino;
  addresses?: AddressResponseAmino[];
}
export interface QueryKeyResponseAminoMsg {
  type: "/warden.warden.v1beta3.QueryKeyResponse";
  value: QueryKeyResponseAmino;
}
export interface QueryKeyResponseSDKType {
  key: KeySDKType;
  addresses: AddressResponseSDKType[];
}
export interface AddressResponse {
  address: string;
  type: AddressType;
}
export interface AddressResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta3.AddressResponse";
  value: Uint8Array;
}
export interface AddressResponseAmino {
  address?: string;
  type?: AddressType;
}
export interface AddressResponseAminoMsg {
  type: "/warden.warden.v1beta3.AddressResponse";
  value: AddressResponseAmino;
}
export interface AddressResponseSDKType {
  address: string;
  type: AddressType;
}
export interface QuerySignRequestsRequest {
  pagination?: PageRequest;
  keychainId: bigint;
  /** Optional */
  status: SignRequestStatus;
}
export interface QuerySignRequestsRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta3.QuerySignRequestsRequest";
  value: Uint8Array;
}
export interface QuerySignRequestsRequestAmino {
  pagination?: PageRequestAmino;
  keychain_id?: string;
  /** Optional */
  status?: SignRequestStatus;
}
export interface QuerySignRequestsRequestAminoMsg {
  type: "/warden.warden.v1beta3.QuerySignRequestsRequest";
  value: QuerySignRequestsRequestAmino;
}
export interface QuerySignRequestsRequestSDKType {
  pagination?: PageRequestSDKType;
  keychain_id: bigint;
  status: SignRequestStatus;
}
export interface QuerySignRequestsResponse {
  pagination?: PageResponse;
  signRequests: SignRequest[];
}
export interface QuerySignRequestsResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta3.QuerySignRequestsResponse";
  value: Uint8Array;
}
export interface QuerySignRequestsResponseAmino {
  pagination?: PageResponseAmino;
  sign_requests?: SignRequestAmino[];
}
export interface QuerySignRequestsResponseAminoMsg {
  type: "/warden.warden.v1beta3.QuerySignRequestsResponse";
  value: QuerySignRequestsResponseAmino;
}
export interface QuerySignRequestsResponseSDKType {
  pagination?: PageResponseSDKType;
  sign_requests: SignRequestSDKType[];
}
export interface QuerySignRequestByIdRequest {
  id: bigint;
}
export interface QuerySignRequestByIdRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta3.QuerySignRequestByIdRequest";
  value: Uint8Array;
}
export interface QuerySignRequestByIdRequestAmino {
  id?: string;
}
export interface QuerySignRequestByIdRequestAminoMsg {
  type: "/warden.warden.v1beta3.QuerySignRequestByIdRequest";
  value: QuerySignRequestByIdRequestAmino;
}
export interface QuerySignRequestByIdRequestSDKType {
  id: bigint;
}
export interface QuerySignRequestByIdResponse {
  signRequest?: SignRequest;
}
export interface QuerySignRequestByIdResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta3.QuerySignRequestByIdResponse";
  value: Uint8Array;
}
export interface QuerySignRequestByIdResponseAmino {
  sign_request?: SignRequestAmino;
}
export interface QuerySignRequestByIdResponseAminoMsg {
  type: "/warden.warden.v1beta3.QuerySignRequestByIdResponse";
  value: QuerySignRequestByIdResponseAmino;
}
export interface QuerySignRequestByIdResponseSDKType {
  sign_request?: SignRequestSDKType;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/warden.warden.v1beta3.QueryParamsRequest",
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
  toJSON(_: QueryParamsRequest): JsonSafe<QueryParamsRequest> {
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
      typeUrl: "/warden.warden.v1beta3.QueryParamsRequest",
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
  typeUrl: "/warden.warden.v1beta3.QueryParamsResponse",
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
  toJSON(message: QueryParamsResponse): JsonSafe<QueryParamsResponse> {
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
      typeUrl: "/warden.warden.v1beta3.QueryParamsResponse",
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
  typeUrl: "/warden.warden.v1beta3.QuerySpacesRequest",
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
  toJSON(message: QuerySpacesRequest): JsonSafe<QuerySpacesRequest> {
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
      typeUrl: "/warden.warden.v1beta3.QuerySpacesRequest",
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
  typeUrl: "/warden.warden.v1beta3.QuerySpacesResponse",
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
  toJSON(message: QuerySpacesResponse): JsonSafe<QuerySpacesResponse> {
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
      typeUrl: "/warden.warden.v1beta3.QuerySpacesResponse",
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
  typeUrl: "/warden.warden.v1beta3.QuerySpacesByOwnerRequest",
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
  toJSON(message: QuerySpacesByOwnerRequest): JsonSafe<QuerySpacesByOwnerRequest> {
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
      typeUrl: "/warden.warden.v1beta3.QuerySpacesByOwnerRequest",
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
  typeUrl: "/warden.warden.v1beta3.QueryKeychainsRequest",
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
  toJSON(message: QueryKeychainsRequest): JsonSafe<QueryKeychainsRequest> {
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
      typeUrl: "/warden.warden.v1beta3.QueryKeychainsRequest",
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
  typeUrl: "/warden.warden.v1beta3.QueryKeychainsResponse",
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
  toJSON(message: QueryKeychainsResponse): JsonSafe<QueryKeychainsResponse> {
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
      typeUrl: "/warden.warden.v1beta3.QueryKeychainsResponse",
      value: QueryKeychainsResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySpaceByIdRequest(): QuerySpaceByIdRequest {
  return {
    id: BigInt(0)
  };
}
export const QuerySpaceByIdRequest = {
  typeUrl: "/warden.warden.v1beta3.QuerySpaceByIdRequest",
  encode(message: QuerySpaceByIdRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySpaceByIdRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySpaceByIdRequest();
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
  fromJSON(object: any): QuerySpaceByIdRequest {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0)
    };
  },
  toJSON(message: QuerySpaceByIdRequest): JsonSafe<QuerySpaceByIdRequest> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<QuerySpaceByIdRequest>): QuerySpaceByIdRequest {
    const message = createBaseQuerySpaceByIdRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QuerySpaceByIdRequestAmino): QuerySpaceByIdRequest {
    const message = createBaseQuerySpaceByIdRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: QuerySpaceByIdRequest): QuerySpaceByIdRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySpaceByIdRequestAminoMsg): QuerySpaceByIdRequest {
    return QuerySpaceByIdRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySpaceByIdRequestProtoMsg): QuerySpaceByIdRequest {
    return QuerySpaceByIdRequest.decode(message.value);
  },
  toProto(message: QuerySpaceByIdRequest): Uint8Array {
    return QuerySpaceByIdRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySpaceByIdRequest): QuerySpaceByIdRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.QuerySpaceByIdRequest",
      value: QuerySpaceByIdRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySpaceByIdResponse(): QuerySpaceByIdResponse {
  return {
    space: undefined
  };
}
export const QuerySpaceByIdResponse = {
  typeUrl: "/warden.warden.v1beta3.QuerySpaceByIdResponse",
  encode(message: QuerySpaceByIdResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.space !== undefined) {
      Space.encode(message.space, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySpaceByIdResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySpaceByIdResponse();
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
  fromJSON(object: any): QuerySpaceByIdResponse {
    return {
      space: isSet(object.space) ? Space.fromJSON(object.space) : undefined
    };
  },
  toJSON(message: QuerySpaceByIdResponse): JsonSafe<QuerySpaceByIdResponse> {
    const obj: any = {};
    message.space !== undefined && (obj.space = message.space ? Space.toJSON(message.space) : undefined);
    return obj;
  },
  fromPartial(object: Partial<QuerySpaceByIdResponse>): QuerySpaceByIdResponse {
    const message = createBaseQuerySpaceByIdResponse();
    message.space = object.space !== undefined && object.space !== null ? Space.fromPartial(object.space) : undefined;
    return message;
  },
  fromAmino(object: QuerySpaceByIdResponseAmino): QuerySpaceByIdResponse {
    const message = createBaseQuerySpaceByIdResponse();
    if (object.space !== undefined && object.space !== null) {
      message.space = Space.fromAmino(object.space);
    }
    return message;
  },
  toAmino(message: QuerySpaceByIdResponse): QuerySpaceByIdResponseAmino {
    const obj: any = {};
    obj.space = message.space ? Space.toAmino(message.space) : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySpaceByIdResponseAminoMsg): QuerySpaceByIdResponse {
    return QuerySpaceByIdResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySpaceByIdResponseProtoMsg): QuerySpaceByIdResponse {
    return QuerySpaceByIdResponse.decode(message.value);
  },
  toProto(message: QuerySpaceByIdResponse): Uint8Array {
    return QuerySpaceByIdResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySpaceByIdResponse): QuerySpaceByIdResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.QuerySpaceByIdResponse",
      value: QuerySpaceByIdResponse.encode(message).finish()
    };
  }
};
function createBaseQueryKeychainByIdRequest(): QueryKeychainByIdRequest {
  return {
    id: BigInt(0)
  };
}
export const QueryKeychainByIdRequest = {
  typeUrl: "/warden.warden.v1beta3.QueryKeychainByIdRequest",
  encode(message: QueryKeychainByIdRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryKeychainByIdRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryKeychainByIdRequest();
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
  fromJSON(object: any): QueryKeychainByIdRequest {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0)
    };
  },
  toJSON(message: QueryKeychainByIdRequest): JsonSafe<QueryKeychainByIdRequest> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<QueryKeychainByIdRequest>): QueryKeychainByIdRequest {
    const message = createBaseQueryKeychainByIdRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryKeychainByIdRequestAmino): QueryKeychainByIdRequest {
    const message = createBaseQueryKeychainByIdRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: QueryKeychainByIdRequest): QueryKeychainByIdRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryKeychainByIdRequestAminoMsg): QueryKeychainByIdRequest {
    return QueryKeychainByIdRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryKeychainByIdRequestProtoMsg): QueryKeychainByIdRequest {
    return QueryKeychainByIdRequest.decode(message.value);
  },
  toProto(message: QueryKeychainByIdRequest): Uint8Array {
    return QueryKeychainByIdRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryKeychainByIdRequest): QueryKeychainByIdRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.QueryKeychainByIdRequest",
      value: QueryKeychainByIdRequest.encode(message).finish()
    };
  }
};
function createBaseQueryKeychainByIdResponse(): QueryKeychainByIdResponse {
  return {
    keychain: undefined
  };
}
export const QueryKeychainByIdResponse = {
  typeUrl: "/warden.warden.v1beta3.QueryKeychainByIdResponse",
  encode(message: QueryKeychainByIdResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.keychain !== undefined) {
      Keychain.encode(message.keychain, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryKeychainByIdResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryKeychainByIdResponse();
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
  fromJSON(object: any): QueryKeychainByIdResponse {
    return {
      keychain: isSet(object.keychain) ? Keychain.fromJSON(object.keychain) : undefined
    };
  },
  toJSON(message: QueryKeychainByIdResponse): JsonSafe<QueryKeychainByIdResponse> {
    const obj: any = {};
    message.keychain !== undefined && (obj.keychain = message.keychain ? Keychain.toJSON(message.keychain) : undefined);
    return obj;
  },
  fromPartial(object: Partial<QueryKeychainByIdResponse>): QueryKeychainByIdResponse {
    const message = createBaseQueryKeychainByIdResponse();
    message.keychain = object.keychain !== undefined && object.keychain !== null ? Keychain.fromPartial(object.keychain) : undefined;
    return message;
  },
  fromAmino(object: QueryKeychainByIdResponseAmino): QueryKeychainByIdResponse {
    const message = createBaseQueryKeychainByIdResponse();
    if (object.keychain !== undefined && object.keychain !== null) {
      message.keychain = Keychain.fromAmino(object.keychain);
    }
    return message;
  },
  toAmino(message: QueryKeychainByIdResponse): QueryKeychainByIdResponseAmino {
    const obj: any = {};
    obj.keychain = message.keychain ? Keychain.toAmino(message.keychain) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryKeychainByIdResponseAminoMsg): QueryKeychainByIdResponse {
    return QueryKeychainByIdResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryKeychainByIdResponseProtoMsg): QueryKeychainByIdResponse {
    return QueryKeychainByIdResponse.decode(message.value);
  },
  toProto(message: QueryKeychainByIdResponse): Uint8Array {
    return QueryKeychainByIdResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryKeychainByIdResponse): QueryKeychainByIdResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.QueryKeychainByIdResponse",
      value: QueryKeychainByIdResponse.encode(message).finish()
    };
  }
};
function createBaseQueryKeyRequestsRequest(): QueryKeyRequestsRequest {
  return {
    pagination: undefined,
    keychainId: BigInt(0),
    status: 0,
    spaceId: BigInt(0)
  };
}
export const QueryKeyRequestsRequest = {
  typeUrl: "/warden.warden.v1beta3.QueryKeyRequestsRequest",
  encode(message: QueryKeyRequestsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.keychainId !== BigInt(0)) {
      writer.uint32(16).uint64(message.keychainId);
    }
    if (message.status !== 0) {
      writer.uint32(24).int32(message.status);
    }
    if (message.spaceId !== BigInt(0)) {
      writer.uint32(32).uint64(message.spaceId);
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
          message.keychainId = reader.uint64();
          break;
        case 3:
          message.status = (reader.int32() as any);
          break;
        case 4:
          message.spaceId = reader.uint64();
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
      keychainId: isSet(object.keychainId) ? BigInt(object.keychainId.toString()) : BigInt(0),
      status: isSet(object.status) ? keyRequestStatusFromJSON(object.status) : -1,
      spaceId: isSet(object.spaceId) ? BigInt(object.spaceId.toString()) : BigInt(0)
    };
  },
  toJSON(message: QueryKeyRequestsRequest): JsonSafe<QueryKeyRequestsRequest> {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    message.keychainId !== undefined && (obj.keychainId = (message.keychainId || BigInt(0)).toString());
    message.status !== undefined && (obj.status = keyRequestStatusToJSON(message.status));
    message.spaceId !== undefined && (obj.spaceId = (message.spaceId || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<QueryKeyRequestsRequest>): QueryKeyRequestsRequest {
    const message = createBaseQueryKeyRequestsRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    message.keychainId = object.keychainId !== undefined && object.keychainId !== null ? BigInt(object.keychainId.toString()) : BigInt(0);
    message.status = object.status ?? 0;
    message.spaceId = object.spaceId !== undefined && object.spaceId !== null ? BigInt(object.spaceId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryKeyRequestsRequestAmino): QueryKeyRequestsRequest {
    const message = createBaseQueryKeyRequestsRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    if (object.keychain_id !== undefined && object.keychain_id !== null) {
      message.keychainId = BigInt(object.keychain_id);
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    if (object.space_id !== undefined && object.space_id !== null) {
      message.spaceId = BigInt(object.space_id);
    }
    return message;
  },
  toAmino(message: QueryKeyRequestsRequest): QueryKeyRequestsRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    obj.keychain_id = message.keychainId !== BigInt(0) ? message.keychainId.toString() : undefined;
    obj.status = message.status === 0 ? undefined : message.status;
    obj.space_id = message.spaceId !== BigInt(0) ? message.spaceId.toString() : undefined;
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
      typeUrl: "/warden.warden.v1beta3.QueryKeyRequestsRequest",
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
  typeUrl: "/warden.warden.v1beta3.QueryKeyRequestsResponse",
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
  toJSON(message: QueryKeyRequestsResponse): JsonSafe<QueryKeyRequestsResponse> {
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
      typeUrl: "/warden.warden.v1beta3.QueryKeyRequestsResponse",
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
  typeUrl: "/warden.warden.v1beta3.QueryKeyRequestByIdRequest",
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
  toJSON(message: QueryKeyRequestByIdRequest): JsonSafe<QueryKeyRequestByIdRequest> {
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
      typeUrl: "/warden.warden.v1beta3.QueryKeyRequestByIdRequest",
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
  typeUrl: "/warden.warden.v1beta3.QueryKeyRequestByIdResponse",
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
  toJSON(message: QueryKeyRequestByIdResponse): JsonSafe<QueryKeyRequestByIdResponse> {
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
      typeUrl: "/warden.warden.v1beta3.QueryKeyRequestByIdResponse",
      value: QueryKeyRequestByIdResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllKeysRequest(): QueryAllKeysRequest {
  return {
    pagination: undefined,
    deriveAddresses: []
  };
}
export const QueryAllKeysRequest = {
  typeUrl: "/warden.warden.v1beta3.QueryAllKeysRequest",
  encode(message: QueryAllKeysRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(18).fork();
    for (const v of message.deriveAddresses) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAllKeysRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllKeysRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.deriveAddresses.push((reader.int32() as any));
            }
          } else {
            message.deriveAddresses.push((reader.int32() as any));
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryAllKeysRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      deriveAddresses: Array.isArray(object?.deriveAddresses) ? object.deriveAddresses.map((e: any) => addressTypeFromJSON(e)) : []
    };
  },
  toJSON(message: QueryAllKeysRequest): JsonSafe<QueryAllKeysRequest> {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    if (message.deriveAddresses) {
      obj.deriveAddresses = message.deriveAddresses.map(e => addressTypeToJSON(e));
    } else {
      obj.deriveAddresses = [];
    }
    return obj;
  },
  fromPartial(object: Partial<QueryAllKeysRequest>): QueryAllKeysRequest {
    const message = createBaseQueryAllKeysRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    message.deriveAddresses = object.deriveAddresses?.map(e => e) || [];
    return message;
  },
  fromAmino(object: QueryAllKeysRequestAmino): QueryAllKeysRequest {
    const message = createBaseQueryAllKeysRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    message.deriveAddresses = object.derive_addresses?.map(e => e) || [];
    return message;
  },
  toAmino(message: QueryAllKeysRequest): QueryAllKeysRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    if (message.deriveAddresses) {
      obj.derive_addresses = message.deriveAddresses.map(e => e);
    } else {
      obj.derive_addresses = message.deriveAddresses;
    }
    return obj;
  },
  fromAminoMsg(object: QueryAllKeysRequestAminoMsg): QueryAllKeysRequest {
    return QueryAllKeysRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllKeysRequestProtoMsg): QueryAllKeysRequest {
    return QueryAllKeysRequest.decode(message.value);
  },
  toProto(message: QueryAllKeysRequest): Uint8Array {
    return QueryAllKeysRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllKeysRequest): QueryAllKeysRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.QueryAllKeysRequest",
      value: QueryAllKeysRequest.encode(message).finish()
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
  typeUrl: "/warden.warden.v1beta3.QueryKeysResponse",
  encode(message: QueryKeysResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.keys) {
      QueryKeyResponse.encode(v!, writer.uint32(18).fork()).ldelim();
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
          message.keys.push(QueryKeyResponse.decode(reader, reader.uint32()));
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
      keys: Array.isArray(object?.keys) ? object.keys.map((e: any) => QueryKeyResponse.fromJSON(e)) : []
    };
  },
  toJSON(message: QueryKeysResponse): JsonSafe<QueryKeysResponse> {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    if (message.keys) {
      obj.keys = message.keys.map(e => e ? QueryKeyResponse.toJSON(e) : undefined);
    } else {
      obj.keys = [];
    }
    return obj;
  },
  fromPartial(object: Partial<QueryKeysResponse>): QueryKeysResponse {
    const message = createBaseQueryKeysResponse();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    message.keys = object.keys?.map(e => QueryKeyResponse.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryKeysResponseAmino): QueryKeysResponse {
    const message = createBaseQueryKeysResponse();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    message.keys = object.keys?.map(e => QueryKeyResponse.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryKeysResponse): QueryKeysResponseAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    if (message.keys) {
      obj.keys = message.keys.map(e => e ? QueryKeyResponse.toAmino(e) : undefined);
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
      typeUrl: "/warden.warden.v1beta3.QueryKeysResponse",
      value: QueryKeysResponse.encode(message).finish()
    };
  }
};
function createBaseQueryKeysBySpaceIdRequest(): QueryKeysBySpaceIdRequest {
  return {
    pagination: undefined,
    spaceId: BigInt(0),
    deriveAddresses: []
  };
}
export const QueryKeysBySpaceIdRequest = {
  typeUrl: "/warden.warden.v1beta3.QueryKeysBySpaceIdRequest",
  encode(message: QueryKeysBySpaceIdRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.spaceId !== BigInt(0)) {
      writer.uint32(16).uint64(message.spaceId);
    }
    writer.uint32(26).fork();
    for (const v of message.deriveAddresses) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryKeysBySpaceIdRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryKeysBySpaceIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.spaceId = reader.uint64();
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.deriveAddresses.push((reader.int32() as any));
            }
          } else {
            message.deriveAddresses.push((reader.int32() as any));
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryKeysBySpaceIdRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      spaceId: isSet(object.spaceId) ? BigInt(object.spaceId.toString()) : BigInt(0),
      deriveAddresses: Array.isArray(object?.deriveAddresses) ? object.deriveAddresses.map((e: any) => addressTypeFromJSON(e)) : []
    };
  },
  toJSON(message: QueryKeysBySpaceIdRequest): JsonSafe<QueryKeysBySpaceIdRequest> {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    message.spaceId !== undefined && (obj.spaceId = (message.spaceId || BigInt(0)).toString());
    if (message.deriveAddresses) {
      obj.deriveAddresses = message.deriveAddresses.map(e => addressTypeToJSON(e));
    } else {
      obj.deriveAddresses = [];
    }
    return obj;
  },
  fromPartial(object: Partial<QueryKeysBySpaceIdRequest>): QueryKeysBySpaceIdRequest {
    const message = createBaseQueryKeysBySpaceIdRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    message.spaceId = object.spaceId !== undefined && object.spaceId !== null ? BigInt(object.spaceId.toString()) : BigInt(0);
    message.deriveAddresses = object.deriveAddresses?.map(e => e) || [];
    return message;
  },
  fromAmino(object: QueryKeysBySpaceIdRequestAmino): QueryKeysBySpaceIdRequest {
    const message = createBaseQueryKeysBySpaceIdRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    if (object.space_id !== undefined && object.space_id !== null) {
      message.spaceId = BigInt(object.space_id);
    }
    message.deriveAddresses = object.derive_addresses?.map(e => e) || [];
    return message;
  },
  toAmino(message: QueryKeysBySpaceIdRequest): QueryKeysBySpaceIdRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    obj.space_id = message.spaceId !== BigInt(0) ? message.spaceId.toString() : undefined;
    if (message.deriveAddresses) {
      obj.derive_addresses = message.deriveAddresses.map(e => e);
    } else {
      obj.derive_addresses = message.deriveAddresses;
    }
    return obj;
  },
  fromAminoMsg(object: QueryKeysBySpaceIdRequestAminoMsg): QueryKeysBySpaceIdRequest {
    return QueryKeysBySpaceIdRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryKeysBySpaceIdRequestProtoMsg): QueryKeysBySpaceIdRequest {
    return QueryKeysBySpaceIdRequest.decode(message.value);
  },
  toProto(message: QueryKeysBySpaceIdRequest): Uint8Array {
    return QueryKeysBySpaceIdRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryKeysBySpaceIdRequest): QueryKeysBySpaceIdRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.QueryKeysBySpaceIdRequest",
      value: QueryKeysBySpaceIdRequest.encode(message).finish()
    };
  }
};
function createBaseQueryKeyByIdRequest(): QueryKeyByIdRequest {
  return {
    id: BigInt(0),
    deriveAddresses: []
  };
}
export const QueryKeyByIdRequest = {
  typeUrl: "/warden.warden.v1beta3.QueryKeyByIdRequest",
  encode(message: QueryKeyByIdRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    writer.uint32(18).fork();
    for (const v of message.deriveAddresses) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryKeyByIdRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryKeyByIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.deriveAddresses.push((reader.int32() as any));
            }
          } else {
            message.deriveAddresses.push((reader.int32() as any));
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryKeyByIdRequest {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      deriveAddresses: Array.isArray(object?.deriveAddresses) ? object.deriveAddresses.map((e: any) => addressTypeFromJSON(e)) : []
    };
  },
  toJSON(message: QueryKeyByIdRequest): JsonSafe<QueryKeyByIdRequest> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    if (message.deriveAddresses) {
      obj.deriveAddresses = message.deriveAddresses.map(e => addressTypeToJSON(e));
    } else {
      obj.deriveAddresses = [];
    }
    return obj;
  },
  fromPartial(object: Partial<QueryKeyByIdRequest>): QueryKeyByIdRequest {
    const message = createBaseQueryKeyByIdRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.deriveAddresses = object.deriveAddresses?.map(e => e) || [];
    return message;
  },
  fromAmino(object: QueryKeyByIdRequestAmino): QueryKeyByIdRequest {
    const message = createBaseQueryKeyByIdRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    message.deriveAddresses = object.derive_addresses?.map(e => e) || [];
    return message;
  },
  toAmino(message: QueryKeyByIdRequest): QueryKeyByIdRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    if (message.deriveAddresses) {
      obj.derive_addresses = message.deriveAddresses.map(e => e);
    } else {
      obj.derive_addresses = message.deriveAddresses;
    }
    return obj;
  },
  fromAminoMsg(object: QueryKeyByIdRequestAminoMsg): QueryKeyByIdRequest {
    return QueryKeyByIdRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryKeyByIdRequestProtoMsg): QueryKeyByIdRequest {
    return QueryKeyByIdRequest.decode(message.value);
  },
  toProto(message: QueryKeyByIdRequest): Uint8Array {
    return QueryKeyByIdRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryKeyByIdRequest): QueryKeyByIdRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.QueryKeyByIdRequest",
      value: QueryKeyByIdRequest.encode(message).finish()
    };
  }
};
function createBaseQueryKeyResponse(): QueryKeyResponse {
  return {
    key: Key.fromPartial({}),
    addresses: []
  };
}
export const QueryKeyResponse = {
  typeUrl: "/warden.warden.v1beta3.QueryKeyResponse",
  encode(message: QueryKeyResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.key !== undefined) {
      Key.encode(message.key, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.addresses) {
      AddressResponse.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryKeyResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryKeyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = Key.decode(reader, reader.uint32());
          break;
        case 2:
          message.addresses.push(AddressResponse.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryKeyResponse {
    return {
      key: isSet(object.key) ? Key.fromJSON(object.key) : undefined,
      addresses: Array.isArray(object?.addresses) ? object.addresses.map((e: any) => AddressResponse.fromJSON(e)) : []
    };
  },
  toJSON(message: QueryKeyResponse): JsonSafe<QueryKeyResponse> {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key ? Key.toJSON(message.key) : undefined);
    if (message.addresses) {
      obj.addresses = message.addresses.map(e => e ? AddressResponse.toJSON(e) : undefined);
    } else {
      obj.addresses = [];
    }
    return obj;
  },
  fromPartial(object: Partial<QueryKeyResponse>): QueryKeyResponse {
    const message = createBaseQueryKeyResponse();
    message.key = object.key !== undefined && object.key !== null ? Key.fromPartial(object.key) : undefined;
    message.addresses = object.addresses?.map(e => AddressResponse.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryKeyResponseAmino): QueryKeyResponse {
    const message = createBaseQueryKeyResponse();
    if (object.key !== undefined && object.key !== null) {
      message.key = Key.fromAmino(object.key);
    }
    message.addresses = object.addresses?.map(e => AddressResponse.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryKeyResponse): QueryKeyResponseAmino {
    const obj: any = {};
    obj.key = message.key ? Key.toAmino(message.key) : undefined;
    if (message.addresses) {
      obj.addresses = message.addresses.map(e => e ? AddressResponse.toAmino(e) : undefined);
    } else {
      obj.addresses = message.addresses;
    }
    return obj;
  },
  fromAminoMsg(object: QueryKeyResponseAminoMsg): QueryKeyResponse {
    return QueryKeyResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryKeyResponseProtoMsg): QueryKeyResponse {
    return QueryKeyResponse.decode(message.value);
  },
  toProto(message: QueryKeyResponse): Uint8Array {
    return QueryKeyResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryKeyResponse): QueryKeyResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.QueryKeyResponse",
      value: QueryKeyResponse.encode(message).finish()
    };
  }
};
function createBaseAddressResponse(): AddressResponse {
  return {
    address: "",
    type: 0
  };
}
export const AddressResponse = {
  typeUrl: "/warden.warden.v1beta3.AddressResponse",
  encode(message: AddressResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): AddressResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddressResponse();
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
  fromJSON(object: any): AddressResponse {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      type: isSet(object.type) ? addressTypeFromJSON(object.type) : -1
    };
  },
  toJSON(message: AddressResponse): JsonSafe<AddressResponse> {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.type !== undefined && (obj.type = addressTypeToJSON(message.type));
    return obj;
  },
  fromPartial(object: Partial<AddressResponse>): AddressResponse {
    const message = createBaseAddressResponse();
    message.address = object.address ?? "";
    message.type = object.type ?? 0;
    return message;
  },
  fromAmino(object: AddressResponseAmino): AddressResponse {
    const message = createBaseAddressResponse();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    }
    return message;
  },
  toAmino(message: AddressResponse): AddressResponseAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    obj.type = message.type === 0 ? undefined : message.type;
    return obj;
  },
  fromAminoMsg(object: AddressResponseAminoMsg): AddressResponse {
    return AddressResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: AddressResponseProtoMsg): AddressResponse {
    return AddressResponse.decode(message.value);
  },
  toProto(message: AddressResponse): Uint8Array {
    return AddressResponse.encode(message).finish();
  },
  toProtoMsg(message: AddressResponse): AddressResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.AddressResponse",
      value: AddressResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySignRequestsRequest(): QuerySignRequestsRequest {
  return {
    pagination: undefined,
    keychainId: BigInt(0),
    status: 0
  };
}
export const QuerySignRequestsRequest = {
  typeUrl: "/warden.warden.v1beta3.QuerySignRequestsRequest",
  encode(message: QuerySignRequestsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.keychainId !== BigInt(0)) {
      writer.uint32(16).uint64(message.keychainId);
    }
    if (message.status !== 0) {
      writer.uint32(24).int32(message.status);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySignRequestsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySignRequestsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.keychainId = reader.uint64();
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
  fromJSON(object: any): QuerySignRequestsRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      keychainId: isSet(object.keychainId) ? BigInt(object.keychainId.toString()) : BigInt(0),
      status: isSet(object.status) ? signRequestStatusFromJSON(object.status) : -1
    };
  },
  toJSON(message: QuerySignRequestsRequest): JsonSafe<QuerySignRequestsRequest> {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    message.keychainId !== undefined && (obj.keychainId = (message.keychainId || BigInt(0)).toString());
    message.status !== undefined && (obj.status = signRequestStatusToJSON(message.status));
    return obj;
  },
  fromPartial(object: Partial<QuerySignRequestsRequest>): QuerySignRequestsRequest {
    const message = createBaseQuerySignRequestsRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    message.keychainId = object.keychainId !== undefined && object.keychainId !== null ? BigInt(object.keychainId.toString()) : BigInt(0);
    message.status = object.status ?? 0;
    return message;
  },
  fromAmino(object: QuerySignRequestsRequestAmino): QuerySignRequestsRequest {
    const message = createBaseQuerySignRequestsRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    if (object.keychain_id !== undefined && object.keychain_id !== null) {
      message.keychainId = BigInt(object.keychain_id);
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    return message;
  },
  toAmino(message: QuerySignRequestsRequest): QuerySignRequestsRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    obj.keychain_id = message.keychainId !== BigInt(0) ? message.keychainId.toString() : undefined;
    obj.status = message.status === 0 ? undefined : message.status;
    return obj;
  },
  fromAminoMsg(object: QuerySignRequestsRequestAminoMsg): QuerySignRequestsRequest {
    return QuerySignRequestsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySignRequestsRequestProtoMsg): QuerySignRequestsRequest {
    return QuerySignRequestsRequest.decode(message.value);
  },
  toProto(message: QuerySignRequestsRequest): Uint8Array {
    return QuerySignRequestsRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySignRequestsRequest): QuerySignRequestsRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.QuerySignRequestsRequest",
      value: QuerySignRequestsRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySignRequestsResponse(): QuerySignRequestsResponse {
  return {
    pagination: undefined,
    signRequests: []
  };
}
export const QuerySignRequestsResponse = {
  typeUrl: "/warden.warden.v1beta3.QuerySignRequestsResponse",
  encode(message: QuerySignRequestsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.signRequests) {
      SignRequest.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySignRequestsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySignRequestsResponse();
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
  fromJSON(object: any): QuerySignRequestsResponse {
    return {
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      signRequests: Array.isArray(object?.signRequests) ? object.signRequests.map((e: any) => SignRequest.fromJSON(e)) : []
    };
  },
  toJSON(message: QuerySignRequestsResponse): JsonSafe<QuerySignRequestsResponse> {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    if (message.signRequests) {
      obj.signRequests = message.signRequests.map(e => e ? SignRequest.toJSON(e) : undefined);
    } else {
      obj.signRequests = [];
    }
    return obj;
  },
  fromPartial(object: Partial<QuerySignRequestsResponse>): QuerySignRequestsResponse {
    const message = createBaseQuerySignRequestsResponse();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    message.signRequests = object.signRequests?.map(e => SignRequest.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QuerySignRequestsResponseAmino): QuerySignRequestsResponse {
    const message = createBaseQuerySignRequestsResponse();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    message.signRequests = object.sign_requests?.map(e => SignRequest.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QuerySignRequestsResponse): QuerySignRequestsResponseAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    if (message.signRequests) {
      obj.sign_requests = message.signRequests.map(e => e ? SignRequest.toAmino(e) : undefined);
    } else {
      obj.sign_requests = message.signRequests;
    }
    return obj;
  },
  fromAminoMsg(object: QuerySignRequestsResponseAminoMsg): QuerySignRequestsResponse {
    return QuerySignRequestsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySignRequestsResponseProtoMsg): QuerySignRequestsResponse {
    return QuerySignRequestsResponse.decode(message.value);
  },
  toProto(message: QuerySignRequestsResponse): Uint8Array {
    return QuerySignRequestsResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySignRequestsResponse): QuerySignRequestsResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.QuerySignRequestsResponse",
      value: QuerySignRequestsResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySignRequestByIdRequest(): QuerySignRequestByIdRequest {
  return {
    id: BigInt(0)
  };
}
export const QuerySignRequestByIdRequest = {
  typeUrl: "/warden.warden.v1beta3.QuerySignRequestByIdRequest",
  encode(message: QuerySignRequestByIdRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySignRequestByIdRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySignRequestByIdRequest();
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
  fromJSON(object: any): QuerySignRequestByIdRequest {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0)
    };
  },
  toJSON(message: QuerySignRequestByIdRequest): JsonSafe<QuerySignRequestByIdRequest> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<QuerySignRequestByIdRequest>): QuerySignRequestByIdRequest {
    const message = createBaseQuerySignRequestByIdRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QuerySignRequestByIdRequestAmino): QuerySignRequestByIdRequest {
    const message = createBaseQuerySignRequestByIdRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: QuerySignRequestByIdRequest): QuerySignRequestByIdRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySignRequestByIdRequestAminoMsg): QuerySignRequestByIdRequest {
    return QuerySignRequestByIdRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySignRequestByIdRequestProtoMsg): QuerySignRequestByIdRequest {
    return QuerySignRequestByIdRequest.decode(message.value);
  },
  toProto(message: QuerySignRequestByIdRequest): Uint8Array {
    return QuerySignRequestByIdRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySignRequestByIdRequest): QuerySignRequestByIdRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.QuerySignRequestByIdRequest",
      value: QuerySignRequestByIdRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySignRequestByIdResponse(): QuerySignRequestByIdResponse {
  return {
    signRequest: undefined
  };
}
export const QuerySignRequestByIdResponse = {
  typeUrl: "/warden.warden.v1beta3.QuerySignRequestByIdResponse",
  encode(message: QuerySignRequestByIdResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.signRequest !== undefined) {
      SignRequest.encode(message.signRequest, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySignRequestByIdResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySignRequestByIdResponse();
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
  fromJSON(object: any): QuerySignRequestByIdResponse {
    return {
      signRequest: isSet(object.signRequest) ? SignRequest.fromJSON(object.signRequest) : undefined
    };
  },
  toJSON(message: QuerySignRequestByIdResponse): JsonSafe<QuerySignRequestByIdResponse> {
    const obj: any = {};
    message.signRequest !== undefined && (obj.signRequest = message.signRequest ? SignRequest.toJSON(message.signRequest) : undefined);
    return obj;
  },
  fromPartial(object: Partial<QuerySignRequestByIdResponse>): QuerySignRequestByIdResponse {
    const message = createBaseQuerySignRequestByIdResponse();
    message.signRequest = object.signRequest !== undefined && object.signRequest !== null ? SignRequest.fromPartial(object.signRequest) : undefined;
    return message;
  },
  fromAmino(object: QuerySignRequestByIdResponseAmino): QuerySignRequestByIdResponse {
    const message = createBaseQuerySignRequestByIdResponse();
    if (object.sign_request !== undefined && object.sign_request !== null) {
      message.signRequest = SignRequest.fromAmino(object.sign_request);
    }
    return message;
  },
  toAmino(message: QuerySignRequestByIdResponse): QuerySignRequestByIdResponseAmino {
    const obj: any = {};
    obj.sign_request = message.signRequest ? SignRequest.toAmino(message.signRequest) : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySignRequestByIdResponseAminoMsg): QuerySignRequestByIdResponse {
    return QuerySignRequestByIdResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySignRequestByIdResponseProtoMsg): QuerySignRequestByIdResponse {
    return QuerySignRequestByIdResponse.decode(message.value);
  },
  toProto(message: QuerySignRequestByIdResponse): Uint8Array {
    return QuerySignRequestByIdResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySignRequestByIdResponse): QuerySignRequestByIdResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.QuerySignRequestByIdResponse",
      value: QuerySignRequestByIdResponse.encode(message).finish()
    };
  }
};