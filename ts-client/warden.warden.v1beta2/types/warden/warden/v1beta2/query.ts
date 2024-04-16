/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../cosmos/base/query/v1beta1/pagination";
import {
  AddressType,
  addressTypeFromJSON,
  addressTypeToJSON,
  Key,
  KeyRequest,
  KeyRequestStatus,
  keyRequestStatusFromJSON,
  keyRequestStatusToJSON,
} from "./key";
import { Keychain } from "./keychain";
import { Params } from "./params";
import { SignRequest, SignRequestStatus, signRequestStatusFromJSON, signRequestStatusToJSON } from "./signature";
import { Space } from "./space";

export const protobufPackage = "warden.warden.v1beta2";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

export interface QuerySpacesRequest {
  pagination: PageRequest | undefined;
}

export interface QuerySpacesResponse {
  pagination: PageResponse | undefined;
  spaces: Space[];
}

export interface QuerySpacesByOwnerRequest {
  pagination: PageRequest | undefined;
  owner: string;
}

export interface QueryKeychainsRequest {
  pagination: PageRequest | undefined;
}

export interface QueryKeychainsResponse {
  pagination: PageResponse | undefined;
  keychains: Keychain[];
}

export interface QuerySpaceByIdRequest {
  id: number;
}

export interface QuerySpaceByIdResponse {
  space: Space | undefined;
}

export interface QueryKeychainByIdRequest {
  id: number;
}

export interface QueryKeychainByIdResponse {
  keychain: Keychain | undefined;
}

export interface QueryKeyRequestsRequest {
  pagination: PageRequest | undefined;
  keychainId: number;
  /** Optional */
  status: KeyRequestStatus;
  spaceId: number;
}

export interface QueryKeyRequestsResponse {
  pagination: PageResponse | undefined;
  keyRequests: KeyRequest[];
}

export interface QueryKeyRequestByIdRequest {
  id: number;
}

export interface QueryKeyRequestByIdResponse {
  keyRequest: KeyRequest | undefined;
}

export interface QueryAllKeysRequest {
  pagination:
    | PageRequest
    | undefined;
  /** Optional */
  deriveAddresses: AddressType[];
}

export interface QueryKeysResponse {
  pagination: PageResponse | undefined;
  keys: QueryKeyResponse[];
}

export interface QueryKeysBySpaceIdRequest {
  pagination: PageRequest | undefined;
  spaceId: number;
  /** Optional */
  deriveAddresses: AddressType[];
}

export interface QueryKeyByIdRequest {
  id: number;
  /** Optional */
  deriveAddresses: AddressType[];
}

export interface QueryKeyResponse {
  key: Key | undefined;
  addresses: AddressResponse[];
}

export interface AddressResponse {
  address: string;
  type: AddressType;
}

export interface QuerySignatureRequestsRequest {
  pagination: PageRequest | undefined;
  keychainId: number;
  /** Optional */
  status: SignRequestStatus;
}

export interface QuerySignatureRequestsResponse {
  pagination: PageResponse | undefined;
  signRequests: SignRequest[];
}

export interface QuerySignatureRequestByIdRequest {
  id: number;
}

export interface QuerySignatureRequestByIdResponse {
  signRequest: SignRequest | undefined;
}

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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

  fromJSON(_: any): QueryParamsRequest {
    return {};
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(base?: I): QueryParamsRequest {
    return QueryParamsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(_: I): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
  return { params: undefined };
}

export const QueryParamsResponse = {
  encode(message: QueryParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  fromJSON(object: any): QueryParamsResponse {
    return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(base?: I): QueryParamsResponse {
    return QueryParamsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(object: I): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseQuerySpacesRequest(): QuerySpacesRequest {
  return { pagination: undefined };
}

export const QuerySpacesRequest = {
  encode(message: QuerySpacesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySpacesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySpacesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QuerySpacesRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QuerySpacesRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySpacesRequest>, I>>(base?: I): QuerySpacesRequest {
    return QuerySpacesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySpacesRequest>, I>>(object: I): QuerySpacesRequest {
    const message = createBaseQuerySpacesRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQuerySpacesResponse(): QuerySpacesResponse {
  return { pagination: undefined, spaces: [] };
}

export const QuerySpacesResponse = {
  encode(message: QuerySpacesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.spaces) {
      Space.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySpacesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySpacesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.spaces.push(Space.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QuerySpacesResponse {
    return {
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      spaces: Array.isArray(object?.spaces) ? object.spaces.map((e: any) => Space.fromJSON(e)) : [],
    };
  },

  toJSON(message: QuerySpacesResponse): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    if (message.spaces?.length) {
      obj.spaces = message.spaces.map((e) => Space.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySpacesResponse>, I>>(base?: I): QuerySpacesResponse {
    return QuerySpacesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySpacesResponse>, I>>(object: I): QuerySpacesResponse {
    const message = createBaseQuerySpacesResponse();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    message.spaces = object.spaces?.map((e) => Space.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQuerySpacesByOwnerRequest(): QuerySpacesByOwnerRequest {
  return { pagination: undefined, owner: "" };
}

export const QuerySpacesByOwnerRequest = {
  encode(message: QuerySpacesByOwnerRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.owner !== "") {
      writer.uint32(18).string(message.owner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySpacesByOwnerRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySpacesByOwnerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.owner = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QuerySpacesByOwnerRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      owner: isSet(object.owner) ? String(object.owner) : "",
    };
  },

  toJSON(message: QuerySpacesByOwnerRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySpacesByOwnerRequest>, I>>(base?: I): QuerySpacesByOwnerRequest {
    return QuerySpacesByOwnerRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySpacesByOwnerRequest>, I>>(object: I): QuerySpacesByOwnerRequest {
    const message = createBaseQuerySpacesByOwnerRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    message.owner = object.owner ?? "";
    return message;
  },
};

function createBaseQueryKeychainsRequest(): QueryKeychainsRequest {
  return { pagination: undefined };
}

export const QueryKeychainsRequest = {
  encode(message: QueryKeychainsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryKeychainsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryKeychainsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryKeychainsRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryKeychainsRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryKeychainsRequest>, I>>(base?: I): QueryKeychainsRequest {
    return QueryKeychainsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryKeychainsRequest>, I>>(object: I): QueryKeychainsRequest {
    const message = createBaseQueryKeychainsRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryKeychainsResponse(): QueryKeychainsResponse {
  return { pagination: undefined, keychains: [] };
}

export const QueryKeychainsResponse = {
  encode(message: QueryKeychainsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.keychains) {
      Keychain.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryKeychainsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryKeychainsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.keychains.push(Keychain.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryKeychainsResponse {
    return {
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      keychains: Array.isArray(object?.keychains) ? object.keychains.map((e: any) => Keychain.fromJSON(e)) : [],
    };
  },

  toJSON(message: QueryKeychainsResponse): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    if (message.keychains?.length) {
      obj.keychains = message.keychains.map((e) => Keychain.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryKeychainsResponse>, I>>(base?: I): QueryKeychainsResponse {
    return QueryKeychainsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryKeychainsResponse>, I>>(object: I): QueryKeychainsResponse {
    const message = createBaseQueryKeychainsResponse();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    message.keychains = object.keychains?.map((e) => Keychain.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQuerySpaceByIdRequest(): QuerySpaceByIdRequest {
  return { id: 0 };
}

export const QuerySpaceByIdRequest = {
  encode(message: QuerySpaceByIdRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySpaceByIdRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySpaceByIdRequest();
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

  fromJSON(object: any): QuerySpaceByIdRequest {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: QuerySpaceByIdRequest): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySpaceByIdRequest>, I>>(base?: I): QuerySpaceByIdRequest {
    return QuerySpaceByIdRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySpaceByIdRequest>, I>>(object: I): QuerySpaceByIdRequest {
    const message = createBaseQuerySpaceByIdRequest();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseQuerySpaceByIdResponse(): QuerySpaceByIdResponse {
  return { space: undefined };
}

export const QuerySpaceByIdResponse = {
  encode(message: QuerySpaceByIdResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.space !== undefined) {
      Space.encode(message.space, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySpaceByIdResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySpaceByIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.space = Space.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QuerySpaceByIdResponse {
    return { space: isSet(object.space) ? Space.fromJSON(object.space) : undefined };
  },

  toJSON(message: QuerySpaceByIdResponse): unknown {
    const obj: any = {};
    if (message.space !== undefined) {
      obj.space = Space.toJSON(message.space);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySpaceByIdResponse>, I>>(base?: I): QuerySpaceByIdResponse {
    return QuerySpaceByIdResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySpaceByIdResponse>, I>>(object: I): QuerySpaceByIdResponse {
    const message = createBaseQuerySpaceByIdResponse();
    message.space = (object.space !== undefined && object.space !== null) ? Space.fromPartial(object.space) : undefined;
    return message;
  },
};

function createBaseQueryKeychainByIdRequest(): QueryKeychainByIdRequest {
  return { id: 0 };
}

export const QueryKeychainByIdRequest = {
  encode(message: QueryKeychainByIdRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryKeychainByIdRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryKeychainByIdRequest();
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

  fromJSON(object: any): QueryKeychainByIdRequest {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: QueryKeychainByIdRequest): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryKeychainByIdRequest>, I>>(base?: I): QueryKeychainByIdRequest {
    return QueryKeychainByIdRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryKeychainByIdRequest>, I>>(object: I): QueryKeychainByIdRequest {
    const message = createBaseQueryKeychainByIdRequest();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseQueryKeychainByIdResponse(): QueryKeychainByIdResponse {
  return { keychain: undefined };
}

export const QueryKeychainByIdResponse = {
  encode(message: QueryKeychainByIdResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.keychain !== undefined) {
      Keychain.encode(message.keychain, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryKeychainByIdResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryKeychainByIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.keychain = Keychain.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryKeychainByIdResponse {
    return { keychain: isSet(object.keychain) ? Keychain.fromJSON(object.keychain) : undefined };
  },

  toJSON(message: QueryKeychainByIdResponse): unknown {
    const obj: any = {};
    if (message.keychain !== undefined) {
      obj.keychain = Keychain.toJSON(message.keychain);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryKeychainByIdResponse>, I>>(base?: I): QueryKeychainByIdResponse {
    return QueryKeychainByIdResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryKeychainByIdResponse>, I>>(object: I): QueryKeychainByIdResponse {
    const message = createBaseQueryKeychainByIdResponse();
    message.keychain = (object.keychain !== undefined && object.keychain !== null)
      ? Keychain.fromPartial(object.keychain)
      : undefined;
    return message;
  },
};

function createBaseQueryKeyRequestsRequest(): QueryKeyRequestsRequest {
  return { pagination: undefined, keychainId: 0, status: 0, spaceId: 0 };
}

export const QueryKeyRequestsRequest = {
  encode(message: QueryKeyRequestsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.keychainId !== 0) {
      writer.uint32(16).uint64(message.keychainId);
    }
    if (message.status !== 0) {
      writer.uint32(24).int32(message.status);
    }
    if (message.spaceId !== 0) {
      writer.uint32(32).uint64(message.spaceId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryKeyRequestsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryKeyRequestsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.keychainId = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.spaceId = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryKeyRequestsRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      keychainId: isSet(object.keychainId) ? Number(object.keychainId) : 0,
      status: isSet(object.status) ? keyRequestStatusFromJSON(object.status) : 0,
      spaceId: isSet(object.spaceId) ? Number(object.spaceId) : 0,
    };
  },

  toJSON(message: QueryKeyRequestsRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    if (message.keychainId !== 0) {
      obj.keychainId = Math.round(message.keychainId);
    }
    if (message.status !== 0) {
      obj.status = keyRequestStatusToJSON(message.status);
    }
    if (message.spaceId !== 0) {
      obj.spaceId = Math.round(message.spaceId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryKeyRequestsRequest>, I>>(base?: I): QueryKeyRequestsRequest {
    return QueryKeyRequestsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryKeyRequestsRequest>, I>>(object: I): QueryKeyRequestsRequest {
    const message = createBaseQueryKeyRequestsRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    message.keychainId = object.keychainId ?? 0;
    message.status = object.status ?? 0;
    message.spaceId = object.spaceId ?? 0;
    return message;
  },
};

function createBaseQueryKeyRequestsResponse(): QueryKeyRequestsResponse {
  return { pagination: undefined, keyRequests: [] };
}

export const QueryKeyRequestsResponse = {
  encode(message: QueryKeyRequestsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.keyRequests) {
      KeyRequest.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryKeyRequestsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryKeyRequestsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.keyRequests.push(KeyRequest.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryKeyRequestsResponse {
    return {
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      keyRequests: Array.isArray(object?.keyRequests) ? object.keyRequests.map((e: any) => KeyRequest.fromJSON(e)) : [],
    };
  },

  toJSON(message: QueryKeyRequestsResponse): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    if (message.keyRequests?.length) {
      obj.keyRequests = message.keyRequests.map((e) => KeyRequest.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryKeyRequestsResponse>, I>>(base?: I): QueryKeyRequestsResponse {
    return QueryKeyRequestsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryKeyRequestsResponse>, I>>(object: I): QueryKeyRequestsResponse {
    const message = createBaseQueryKeyRequestsResponse();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    message.keyRequests = object.keyRequests?.map((e) => KeyRequest.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryKeyRequestByIdRequest(): QueryKeyRequestByIdRequest {
  return { id: 0 };
}

export const QueryKeyRequestByIdRequest = {
  encode(message: QueryKeyRequestByIdRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryKeyRequestByIdRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryKeyRequestByIdRequest();
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

  fromJSON(object: any): QueryKeyRequestByIdRequest {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: QueryKeyRequestByIdRequest): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryKeyRequestByIdRequest>, I>>(base?: I): QueryKeyRequestByIdRequest {
    return QueryKeyRequestByIdRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryKeyRequestByIdRequest>, I>>(object: I): QueryKeyRequestByIdRequest {
    const message = createBaseQueryKeyRequestByIdRequest();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseQueryKeyRequestByIdResponse(): QueryKeyRequestByIdResponse {
  return { keyRequest: undefined };
}

export const QueryKeyRequestByIdResponse = {
  encode(message: QueryKeyRequestByIdResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.keyRequest !== undefined) {
      KeyRequest.encode(message.keyRequest, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryKeyRequestByIdResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryKeyRequestByIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.keyRequest = KeyRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryKeyRequestByIdResponse {
    return { keyRequest: isSet(object.keyRequest) ? KeyRequest.fromJSON(object.keyRequest) : undefined };
  },

  toJSON(message: QueryKeyRequestByIdResponse): unknown {
    const obj: any = {};
    if (message.keyRequest !== undefined) {
      obj.keyRequest = KeyRequest.toJSON(message.keyRequest);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryKeyRequestByIdResponse>, I>>(base?: I): QueryKeyRequestByIdResponse {
    return QueryKeyRequestByIdResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryKeyRequestByIdResponse>, I>>(object: I): QueryKeyRequestByIdResponse {
    const message = createBaseQueryKeyRequestByIdResponse();
    message.keyRequest = (object.keyRequest !== undefined && object.keyRequest !== null)
      ? KeyRequest.fromPartial(object.keyRequest)
      : undefined;
    return message;
  },
};

function createBaseQueryAllKeysRequest(): QueryAllKeysRequest {
  return { pagination: undefined, deriveAddresses: [] };
}

export const QueryAllKeysRequest = {
  encode(message: QueryAllKeysRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllKeysRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllKeysRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag === 16) {
            message.deriveAddresses.push(reader.int32() as any);

            continue;
          }

          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.deriveAddresses.push(reader.int32() as any);
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryAllKeysRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      deriveAddresses: Array.isArray(object?.deriveAddresses)
        ? object.deriveAddresses.map((e: any) => addressTypeFromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryAllKeysRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    if (message.deriveAddresses?.length) {
      obj.deriveAddresses = message.deriveAddresses.map((e) => addressTypeToJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAllKeysRequest>, I>>(base?: I): QueryAllKeysRequest {
    return QueryAllKeysRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAllKeysRequest>, I>>(object: I): QueryAllKeysRequest {
    const message = createBaseQueryAllKeysRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    message.deriveAddresses = object.deriveAddresses?.map((e) => e) || [];
    return message;
  },
};

function createBaseQueryKeysResponse(): QueryKeysResponse {
  return { pagination: undefined, keys: [] };
}

export const QueryKeysResponse = {
  encode(message: QueryKeysResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.keys) {
      QueryKeyResponse.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryKeysResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryKeysResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.keys.push(QueryKeyResponse.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryKeysResponse {
    return {
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      keys: Array.isArray(object?.keys) ? object.keys.map((e: any) => QueryKeyResponse.fromJSON(e)) : [],
    };
  },

  toJSON(message: QueryKeysResponse): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    if (message.keys?.length) {
      obj.keys = message.keys.map((e) => QueryKeyResponse.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryKeysResponse>, I>>(base?: I): QueryKeysResponse {
    return QueryKeysResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryKeysResponse>, I>>(object: I): QueryKeysResponse {
    const message = createBaseQueryKeysResponse();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    message.keys = object.keys?.map((e) => QueryKeyResponse.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryKeysBySpaceIdRequest(): QueryKeysBySpaceIdRequest {
  return { pagination: undefined, spaceId: 0, deriveAddresses: [] };
}

export const QueryKeysBySpaceIdRequest = {
  encode(message: QueryKeysBySpaceIdRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.spaceId !== 0) {
      writer.uint32(16).uint64(message.spaceId);
    }
    writer.uint32(26).fork();
    for (const v of message.deriveAddresses) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryKeysBySpaceIdRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryKeysBySpaceIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.spaceId = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag === 24) {
            message.deriveAddresses.push(reader.int32() as any);

            continue;
          }

          if (tag === 26) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.deriveAddresses.push(reader.int32() as any);
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryKeysBySpaceIdRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      spaceId: isSet(object.spaceId) ? Number(object.spaceId) : 0,
      deriveAddresses: Array.isArray(object?.deriveAddresses)
        ? object.deriveAddresses.map((e: any) => addressTypeFromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryKeysBySpaceIdRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    if (message.spaceId !== 0) {
      obj.spaceId = Math.round(message.spaceId);
    }
    if (message.deriveAddresses?.length) {
      obj.deriveAddresses = message.deriveAddresses.map((e) => addressTypeToJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryKeysBySpaceIdRequest>, I>>(base?: I): QueryKeysBySpaceIdRequest {
    return QueryKeysBySpaceIdRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryKeysBySpaceIdRequest>, I>>(object: I): QueryKeysBySpaceIdRequest {
    const message = createBaseQueryKeysBySpaceIdRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    message.spaceId = object.spaceId ?? 0;
    message.deriveAddresses = object.deriveAddresses?.map((e) => e) || [];
    return message;
  },
};

function createBaseQueryKeyByIdRequest(): QueryKeyByIdRequest {
  return { id: 0, deriveAddresses: [] };
}

export const QueryKeyByIdRequest = {
  encode(message: QueryKeyByIdRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    writer.uint32(18).fork();
    for (const v of message.deriveAddresses) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryKeyByIdRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryKeyByIdRequest();
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
          if (tag === 16) {
            message.deriveAddresses.push(reader.int32() as any);

            continue;
          }

          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.deriveAddresses.push(reader.int32() as any);
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryKeyByIdRequest {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      deriveAddresses: Array.isArray(object?.deriveAddresses)
        ? object.deriveAddresses.map((e: any) => addressTypeFromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryKeyByIdRequest): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.deriveAddresses?.length) {
      obj.deriveAddresses = message.deriveAddresses.map((e) => addressTypeToJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryKeyByIdRequest>, I>>(base?: I): QueryKeyByIdRequest {
    return QueryKeyByIdRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryKeyByIdRequest>, I>>(object: I): QueryKeyByIdRequest {
    const message = createBaseQueryKeyByIdRequest();
    message.id = object.id ?? 0;
    message.deriveAddresses = object.deriveAddresses?.map((e) => e) || [];
    return message;
  },
};

function createBaseQueryKeyResponse(): QueryKeyResponse {
  return { key: undefined, addresses: [] };
}

export const QueryKeyResponse = {
  encode(message: QueryKeyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== undefined) {
      Key.encode(message.key, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.addresses) {
      AddressResponse.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryKeyResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryKeyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = Key.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.addresses.push(AddressResponse.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryKeyResponse {
    return {
      key: isSet(object.key) ? Key.fromJSON(object.key) : undefined,
      addresses: Array.isArray(object?.addresses) ? object.addresses.map((e: any) => AddressResponse.fromJSON(e)) : [],
    };
  },

  toJSON(message: QueryKeyResponse): unknown {
    const obj: any = {};
    if (message.key !== undefined) {
      obj.key = Key.toJSON(message.key);
    }
    if (message.addresses?.length) {
      obj.addresses = message.addresses.map((e) => AddressResponse.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryKeyResponse>, I>>(base?: I): QueryKeyResponse {
    return QueryKeyResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryKeyResponse>, I>>(object: I): QueryKeyResponse {
    const message = createBaseQueryKeyResponse();
    message.key = (object.key !== undefined && object.key !== null) ? Key.fromPartial(object.key) : undefined;
    message.addresses = object.addresses?.map((e) => AddressResponse.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAddressResponse(): AddressResponse {
  return { address: "", type: 0 };
}

export const AddressResponse = {
  encode(message: AddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddressResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.address = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddressResponse {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      type: isSet(object.type) ? addressTypeFromJSON(object.type) : 0,
    };
  },

  toJSON(message: AddressResponse): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.type !== 0) {
      obj.type = addressTypeToJSON(message.type);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AddressResponse>, I>>(base?: I): AddressResponse {
    return AddressResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AddressResponse>, I>>(object: I): AddressResponse {
    const message = createBaseAddressResponse();
    message.address = object.address ?? "";
    message.type = object.type ?? 0;
    return message;
  },
};

function createBaseQuerySignatureRequestsRequest(): QuerySignatureRequestsRequest {
  return { pagination: undefined, keychainId: 0, status: 0 };
}

export const QuerySignatureRequestsRequest = {
  encode(message: QuerySignatureRequestsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.keychainId !== 0) {
      writer.uint32(16).uint64(message.keychainId);
    }
    if (message.status !== 0) {
      writer.uint32(24).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySignatureRequestsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySignatureRequestsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.keychainId = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QuerySignatureRequestsRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      keychainId: isSet(object.keychainId) ? Number(object.keychainId) : 0,
      status: isSet(object.status) ? signRequestStatusFromJSON(object.status) : 0,
    };
  },

  toJSON(message: QuerySignatureRequestsRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    if (message.keychainId !== 0) {
      obj.keychainId = Math.round(message.keychainId);
    }
    if (message.status !== 0) {
      obj.status = signRequestStatusToJSON(message.status);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySignatureRequestsRequest>, I>>(base?: I): QuerySignatureRequestsRequest {
    return QuerySignatureRequestsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySignatureRequestsRequest>, I>>(
    object: I,
  ): QuerySignatureRequestsRequest {
    const message = createBaseQuerySignatureRequestsRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    message.keychainId = object.keychainId ?? 0;
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseQuerySignatureRequestsResponse(): QuerySignatureRequestsResponse {
  return { pagination: undefined, signRequests: [] };
}

export const QuerySignatureRequestsResponse = {
  encode(message: QuerySignatureRequestsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.signRequests) {
      SignRequest.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySignatureRequestsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySignatureRequestsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.signRequests.push(SignRequest.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QuerySignatureRequestsResponse {
    return {
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      signRequests: Array.isArray(object?.signRequests)
        ? object.signRequests.map((e: any) => SignRequest.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QuerySignatureRequestsResponse): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    if (message.signRequests?.length) {
      obj.signRequests = message.signRequests.map((e) => SignRequest.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySignatureRequestsResponse>, I>>(base?: I): QuerySignatureRequestsResponse {
    return QuerySignatureRequestsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySignatureRequestsResponse>, I>>(
    object: I,
  ): QuerySignatureRequestsResponse {
    const message = createBaseQuerySignatureRequestsResponse();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    message.signRequests = object.signRequests?.map((e) => SignRequest.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQuerySignatureRequestByIdRequest(): QuerySignatureRequestByIdRequest {
  return { id: 0 };
}

export const QuerySignatureRequestByIdRequest = {
  encode(message: QuerySignatureRequestByIdRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySignatureRequestByIdRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySignatureRequestByIdRequest();
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

  fromJSON(object: any): QuerySignatureRequestByIdRequest {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: QuerySignatureRequestByIdRequest): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySignatureRequestByIdRequest>, I>>(
    base?: I,
  ): QuerySignatureRequestByIdRequest {
    return QuerySignatureRequestByIdRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySignatureRequestByIdRequest>, I>>(
    object: I,
  ): QuerySignatureRequestByIdRequest {
    const message = createBaseQuerySignatureRequestByIdRequest();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseQuerySignatureRequestByIdResponse(): QuerySignatureRequestByIdResponse {
  return { signRequest: undefined };
}

export const QuerySignatureRequestByIdResponse = {
  encode(message: QuerySignatureRequestByIdResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signRequest !== undefined) {
      SignRequest.encode(message.signRequest, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySignatureRequestByIdResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySignatureRequestByIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signRequest = SignRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QuerySignatureRequestByIdResponse {
    return { signRequest: isSet(object.signRequest) ? SignRequest.fromJSON(object.signRequest) : undefined };
  },

  toJSON(message: QuerySignatureRequestByIdResponse): unknown {
    const obj: any = {};
    if (message.signRequest !== undefined) {
      obj.signRequest = SignRequest.toJSON(message.signRequest);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySignatureRequestByIdResponse>, I>>(
    base?: I,
  ): QuerySignatureRequestByIdResponse {
    return QuerySignatureRequestByIdResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySignatureRequestByIdResponse>, I>>(
    object: I,
  ): QuerySignatureRequestByIdResponse {
    const message = createBaseQuerySignatureRequestByIdResponse();
    message.signRequest = (object.signRequest !== undefined && object.signRequest !== null)
      ? SignRequest.fromPartial(object.signRequest)
      : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a list of Spaces items. */
  Spaces(request: QuerySpacesRequest): Promise<QuerySpacesResponse>;
  /** Queries a list of Spaces that has the specified owner. */
  SpacesByOwner(request: QuerySpacesByOwnerRequest): Promise<QuerySpacesResponse>;
  /** Queries a list of Keychains items. */
  Keychains(request: QueryKeychainsRequest): Promise<QueryKeychainsResponse>;
  /** Queries a space by its id. */
  SpaceById(request: QuerySpaceByIdRequest): Promise<QuerySpaceByIdResponse>;
  /** Queries a keychain by its id. */
  KeychainById(request: QueryKeychainByIdRequest): Promise<QueryKeychainByIdResponse>;
  /** Queries a list of KeyRequests items. */
  KeyRequests(request: QueryKeyRequestsRequest): Promise<QueryKeyRequestsResponse>;
  /** Queries a single KeyRequest by its id. */
  KeyRequestById(request: QueryKeyRequestByIdRequest): Promise<QueryKeyRequestByIdResponse>;
  /** Queries a list of Keys items. */
  AllKeys(request: QueryAllKeysRequest): Promise<QueryKeysResponse>;
  /** Queries a list of Keys items by their Space ID. */
  KeysBySpaceId(request: QueryKeysBySpaceIdRequest): Promise<QueryKeysResponse>;
  /** Queries a Key by its ID. */
  KeyById(request: QueryKeyByIdRequest): Promise<QueryKeyResponse>;
  /** Queries a list of SignatureRequests items. */
  SignatureRequests(request: QuerySignatureRequestsRequest): Promise<QuerySignatureRequestsResponse>;
  /** Queries a single SignatureRequest by its id. */
  SignatureRequestById(request: QuerySignatureRequestByIdRequest): Promise<QuerySignatureRequestByIdResponse>;
}

export const QueryServiceName = "warden.warden.v1beta2.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.Spaces = this.Spaces.bind(this);
    this.SpacesByOwner = this.SpacesByOwner.bind(this);
    this.Keychains = this.Keychains.bind(this);
    this.SpaceById = this.SpaceById.bind(this);
    this.KeychainById = this.KeychainById.bind(this);
    this.KeyRequests = this.KeyRequests.bind(this);
    this.KeyRequestById = this.KeyRequestById.bind(this);
    this.AllKeys = this.AllKeys.bind(this);
    this.KeysBySpaceId = this.KeysBySpaceId.bind(this);
    this.KeyById = this.KeyById.bind(this);
    this.SignatureRequests = this.SignatureRequests.bind(this);
    this.SignatureRequestById = this.SignatureRequestById.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(_m0.Reader.create(data)));
  }

  Spaces(request: QuerySpacesRequest): Promise<QuerySpacesResponse> {
    const data = QuerySpacesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Spaces", data);
    return promise.then((data) => QuerySpacesResponse.decode(_m0.Reader.create(data)));
  }

  SpacesByOwner(request: QuerySpacesByOwnerRequest): Promise<QuerySpacesResponse> {
    const data = QuerySpacesByOwnerRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "SpacesByOwner", data);
    return promise.then((data) => QuerySpacesResponse.decode(_m0.Reader.create(data)));
  }

  Keychains(request: QueryKeychainsRequest): Promise<QueryKeychainsResponse> {
    const data = QueryKeychainsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Keychains", data);
    return promise.then((data) => QueryKeychainsResponse.decode(_m0.Reader.create(data)));
  }

  SpaceById(request: QuerySpaceByIdRequest): Promise<QuerySpaceByIdResponse> {
    const data = QuerySpaceByIdRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "SpaceById", data);
    return promise.then((data) => QuerySpaceByIdResponse.decode(_m0.Reader.create(data)));
  }

  KeychainById(request: QueryKeychainByIdRequest): Promise<QueryKeychainByIdResponse> {
    const data = QueryKeychainByIdRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "KeychainById", data);
    return promise.then((data) => QueryKeychainByIdResponse.decode(_m0.Reader.create(data)));
  }

  KeyRequests(request: QueryKeyRequestsRequest): Promise<QueryKeyRequestsResponse> {
    const data = QueryKeyRequestsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "KeyRequests", data);
    return promise.then((data) => QueryKeyRequestsResponse.decode(_m0.Reader.create(data)));
  }

  KeyRequestById(request: QueryKeyRequestByIdRequest): Promise<QueryKeyRequestByIdResponse> {
    const data = QueryKeyRequestByIdRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "KeyRequestById", data);
    return promise.then((data) => QueryKeyRequestByIdResponse.decode(_m0.Reader.create(data)));
  }

  AllKeys(request: QueryAllKeysRequest): Promise<QueryKeysResponse> {
    const data = QueryAllKeysRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "AllKeys", data);
    return promise.then((data) => QueryKeysResponse.decode(_m0.Reader.create(data)));
  }

  KeysBySpaceId(request: QueryKeysBySpaceIdRequest): Promise<QueryKeysResponse> {
    const data = QueryKeysBySpaceIdRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "KeysBySpaceId", data);
    return promise.then((data) => QueryKeysResponse.decode(_m0.Reader.create(data)));
  }

  KeyById(request: QueryKeyByIdRequest): Promise<QueryKeyResponse> {
    const data = QueryKeyByIdRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "KeyById", data);
    return promise.then((data) => QueryKeyResponse.decode(_m0.Reader.create(data)));
  }

  SignatureRequests(request: QuerySignatureRequestsRequest): Promise<QuerySignatureRequestsResponse> {
    const data = QuerySignatureRequestsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "SignatureRequests", data);
    return promise.then((data) => QuerySignatureRequestsResponse.decode(_m0.Reader.create(data)));
  }

  SignatureRequestById(request: QuerySignatureRequestByIdRequest): Promise<QuerySignatureRequestByIdResponse> {
    const data = QuerySignatureRequestByIdRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "SignatureRequestById", data);
    return promise.then((data) => QuerySignatureRequestByIdResponse.decode(_m0.Reader.create(data)));
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
