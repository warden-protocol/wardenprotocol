/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../cosmos/base/query/v1beta1/pagination";
import { Key, KeyRequest, KeyRequestStatus, keyRequestStatusFromJSON, keyRequestStatusToJSON } from "./key";
import { Keychain } from "./keychain";
import { Params } from "./params";
import {
  SignRequest,
  SignRequestStatus,
  signRequestStatusFromJSON,
  signRequestStatusToJSON,
  SignTransactionRequest,
} from "./signature";
import { Space } from "./space";
import { WalletType, walletTypeFromJSON, walletTypeToJSON } from "./wallet";

export const protobufPackage = "warden.warden.v1beta1";

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

export interface QuerySpaceByAddressRequest {
  address: string;
}

export interface QuerySpaceByAddressResponse {
  space: Space | undefined;
}

export interface QueryKeychainByAddressRequest {
  address: string;
}

export interface QueryKeychainByAddressResponse {
  keychain: Keychain | undefined;
}

export interface QueryKeyRequestsRequest {
  pagination: PageRequest | undefined;
  keychainAddr: string;
  /** Optional */
  status: KeyRequestStatus;
  spaceAddr: string;
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

export interface QueryKeysRequest {
  pagination:
    | PageRequest
    | undefined;
  /** Optional */
  spaceAddr: string;
  /** Optional */
  type: WalletType;
  /** Optional */
  keyId: number;
}

export interface QueryKeysResponse {
  pagination: PageResponse | undefined;
  keys: KeyResponse[];
}

export interface KeyResponse {
  key: Key | undefined;
  wallets: WalletKeyResponse[];
}

export interface WalletKeyResponse {
  address: string;
  type: WalletType;
}

export interface QuerySignatureRequestsRequest {
  pagination: PageRequest | undefined;
  keychainAddr: string;
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

export interface QuerySignTransactionRequestsRequest {
  pagination: PageRequest | undefined;
  walletType: WalletType;
  keyId: number;
  /** Optional */
  status: SignRequestStatus;
}

export interface SignTransactionRequestResponse {
  signTransactionRequest: SignTransactionRequest | undefined;
  signRequest: SignRequest | undefined;
}

export interface QuerySignTransactionRequestsResponse {
  pagination: PageResponse | undefined;
  signTransactionRequests: SignTransactionRequestResponse[];
}

export interface QuerySignTransactionRequestByIdRequest {
  id: number;
}

export interface QuerySignTransactionRequestByIdResponse {
  signTransactionRequest: SignTransactionRequest | undefined;
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

function createBaseQuerySpaceByAddressRequest(): QuerySpaceByAddressRequest {
  return { address: "" };
}

export const QuerySpaceByAddressRequest = {
  encode(message: QuerySpaceByAddressRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySpaceByAddressRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySpaceByAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.address = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QuerySpaceByAddressRequest {
    return { address: isSet(object.address) ? String(object.address) : "" };
  },

  toJSON(message: QuerySpaceByAddressRequest): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySpaceByAddressRequest>, I>>(base?: I): QuerySpaceByAddressRequest {
    return QuerySpaceByAddressRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySpaceByAddressRequest>, I>>(object: I): QuerySpaceByAddressRequest {
    const message = createBaseQuerySpaceByAddressRequest();
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseQuerySpaceByAddressResponse(): QuerySpaceByAddressResponse {
  return { space: undefined };
}

export const QuerySpaceByAddressResponse = {
  encode(message: QuerySpaceByAddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.space !== undefined) {
      Space.encode(message.space, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySpaceByAddressResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySpaceByAddressResponse();
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

  fromJSON(object: any): QuerySpaceByAddressResponse {
    return { space: isSet(object.space) ? Space.fromJSON(object.space) : undefined };
  },

  toJSON(message: QuerySpaceByAddressResponse): unknown {
    const obj: any = {};
    if (message.space !== undefined) {
      obj.space = Space.toJSON(message.space);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySpaceByAddressResponse>, I>>(base?: I): QuerySpaceByAddressResponse {
    return QuerySpaceByAddressResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySpaceByAddressResponse>, I>>(object: I): QuerySpaceByAddressResponse {
    const message = createBaseQuerySpaceByAddressResponse();
    message.space = (object.space !== undefined && object.space !== null) ? Space.fromPartial(object.space) : undefined;
    return message;
  },
};

function createBaseQueryKeychainByAddressRequest(): QueryKeychainByAddressRequest {
  return { address: "" };
}

export const QueryKeychainByAddressRequest = {
  encode(message: QueryKeychainByAddressRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryKeychainByAddressRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryKeychainByAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.address = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryKeychainByAddressRequest {
    return { address: isSet(object.address) ? String(object.address) : "" };
  },

  toJSON(message: QueryKeychainByAddressRequest): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryKeychainByAddressRequest>, I>>(base?: I): QueryKeychainByAddressRequest {
    return QueryKeychainByAddressRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryKeychainByAddressRequest>, I>>(
    object: I,
  ): QueryKeychainByAddressRequest {
    const message = createBaseQueryKeychainByAddressRequest();
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseQueryKeychainByAddressResponse(): QueryKeychainByAddressResponse {
  return { keychain: undefined };
}

export const QueryKeychainByAddressResponse = {
  encode(message: QueryKeychainByAddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.keychain !== undefined) {
      Keychain.encode(message.keychain, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryKeychainByAddressResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryKeychainByAddressResponse();
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

  fromJSON(object: any): QueryKeychainByAddressResponse {
    return { keychain: isSet(object.keychain) ? Keychain.fromJSON(object.keychain) : undefined };
  },

  toJSON(message: QueryKeychainByAddressResponse): unknown {
    const obj: any = {};
    if (message.keychain !== undefined) {
      obj.keychain = Keychain.toJSON(message.keychain);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryKeychainByAddressResponse>, I>>(base?: I): QueryKeychainByAddressResponse {
    return QueryKeychainByAddressResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryKeychainByAddressResponse>, I>>(
    object: I,
  ): QueryKeychainByAddressResponse {
    const message = createBaseQueryKeychainByAddressResponse();
    message.keychain = (object.keychain !== undefined && object.keychain !== null)
      ? Keychain.fromPartial(object.keychain)
      : undefined;
    return message;
  },
};

function createBaseQueryKeyRequestsRequest(): QueryKeyRequestsRequest {
  return { pagination: undefined, keychainAddr: "", status: 0, spaceAddr: "" };
}

export const QueryKeyRequestsRequest = {
  encode(message: QueryKeyRequestsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
          if (tag !== 18) {
            break;
          }

          message.keychainAddr = reader.string();
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

          message.spaceAddr = reader.string();
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
      keychainAddr: isSet(object.keychainAddr) ? String(object.keychainAddr) : "",
      status: isSet(object.status) ? keyRequestStatusFromJSON(object.status) : 0,
      spaceAddr: isSet(object.spaceAddr) ? String(object.spaceAddr) : "",
    };
  },

  toJSON(message: QueryKeyRequestsRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    if (message.keychainAddr !== "") {
      obj.keychainAddr = message.keychainAddr;
    }
    if (message.status !== 0) {
      obj.status = keyRequestStatusToJSON(message.status);
    }
    if (message.spaceAddr !== "") {
      obj.spaceAddr = message.spaceAddr;
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
    message.keychainAddr = object.keychainAddr ?? "";
    message.status = object.status ?? 0;
    message.spaceAddr = object.spaceAddr ?? "";
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

function createBaseQueryKeysRequest(): QueryKeysRequest {
  return { pagination: undefined, spaceAddr: "", type: 0, keyId: 0 };
}

export const QueryKeysRequest = {
  encode(message: QueryKeysRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.spaceAddr !== "") {
      writer.uint32(18).string(message.spaceAddr);
    }
    if (message.type !== 0) {
      writer.uint32(24).int32(message.type);
    }
    if (message.keyId !== 0) {
      writer.uint32(32).uint64(message.keyId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryKeysRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryKeysRequest();
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

          message.spaceAddr = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.keyId = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryKeysRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      spaceAddr: isSet(object.spaceAddr) ? String(object.spaceAddr) : "",
      type: isSet(object.type) ? walletTypeFromJSON(object.type) : 0,
      keyId: isSet(object.keyId) ? Number(object.keyId) : 0,
    };
  },

  toJSON(message: QueryKeysRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    if (message.spaceAddr !== "") {
      obj.spaceAddr = message.spaceAddr;
    }
    if (message.type !== 0) {
      obj.type = walletTypeToJSON(message.type);
    }
    if (message.keyId !== 0) {
      obj.keyId = Math.round(message.keyId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryKeysRequest>, I>>(base?: I): QueryKeysRequest {
    return QueryKeysRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryKeysRequest>, I>>(object: I): QueryKeysRequest {
    const message = createBaseQueryKeysRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    message.spaceAddr = object.spaceAddr ?? "";
    message.type = object.type ?? 0;
    message.keyId = object.keyId ?? 0;
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
      KeyResponse.encode(v!, writer.uint32(18).fork()).ldelim();
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

          message.keys.push(KeyResponse.decode(reader, reader.uint32()));
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
      keys: Array.isArray(object?.keys) ? object.keys.map((e: any) => KeyResponse.fromJSON(e)) : [],
    };
  },

  toJSON(message: QueryKeysResponse): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    if (message.keys?.length) {
      obj.keys = message.keys.map((e) => KeyResponse.toJSON(e));
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
    message.keys = object.keys?.map((e) => KeyResponse.fromPartial(e)) || [];
    return message;
  },
};

function createBaseKeyResponse(): KeyResponse {
  return { key: undefined, wallets: [] };
}

export const KeyResponse = {
  encode(message: KeyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== undefined) {
      Key.encode(message.key, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.wallets) {
      WalletKeyResponse.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KeyResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeyResponse();
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

          message.wallets.push(WalletKeyResponse.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): KeyResponse {
    return {
      key: isSet(object.key) ? Key.fromJSON(object.key) : undefined,
      wallets: Array.isArray(object?.wallets) ? object.wallets.map((e: any) => WalletKeyResponse.fromJSON(e)) : [],
    };
  },

  toJSON(message: KeyResponse): unknown {
    const obj: any = {};
    if (message.key !== undefined) {
      obj.key = Key.toJSON(message.key);
    }
    if (message.wallets?.length) {
      obj.wallets = message.wallets.map((e) => WalletKeyResponse.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<KeyResponse>, I>>(base?: I): KeyResponse {
    return KeyResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<KeyResponse>, I>>(object: I): KeyResponse {
    const message = createBaseKeyResponse();
    message.key = (object.key !== undefined && object.key !== null) ? Key.fromPartial(object.key) : undefined;
    message.wallets = object.wallets?.map((e) => WalletKeyResponse.fromPartial(e)) || [];
    return message;
  },
};

function createBaseWalletKeyResponse(): WalletKeyResponse {
  return { address: "", type: 0 };
}

export const WalletKeyResponse = {
  encode(message: WalletKeyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WalletKeyResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWalletKeyResponse();
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

  fromJSON(object: any): WalletKeyResponse {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      type: isSet(object.type) ? walletTypeFromJSON(object.type) : 0,
    };
  },

  toJSON(message: WalletKeyResponse): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.type !== 0) {
      obj.type = walletTypeToJSON(message.type);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WalletKeyResponse>, I>>(base?: I): WalletKeyResponse {
    return WalletKeyResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WalletKeyResponse>, I>>(object: I): WalletKeyResponse {
    const message = createBaseWalletKeyResponse();
    message.address = object.address ?? "";
    message.type = object.type ?? 0;
    return message;
  },
};

function createBaseQuerySignatureRequestsRequest(): QuerySignatureRequestsRequest {
  return { pagination: undefined, keychainAddr: "", status: 0 };
}

export const QuerySignatureRequestsRequest = {
  encode(message: QuerySignatureRequestsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
          if (tag !== 18) {
            break;
          }

          message.keychainAddr = reader.string();
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
      keychainAddr: isSet(object.keychainAddr) ? String(object.keychainAddr) : "",
      status: isSet(object.status) ? signRequestStatusFromJSON(object.status) : 0,
    };
  },

  toJSON(message: QuerySignatureRequestsRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    if (message.keychainAddr !== "") {
      obj.keychainAddr = message.keychainAddr;
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
    message.keychainAddr = object.keychainAddr ?? "";
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

function createBaseQuerySignTransactionRequestsRequest(): QuerySignTransactionRequestsRequest {
  return { pagination: undefined, walletType: 0, keyId: 0, status: 0 };
}

export const QuerySignTransactionRequestsRequest = {
  encode(message: QuerySignTransactionRequestsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.walletType !== 0) {
      writer.uint32(16).int32(message.walletType);
    }
    if (message.keyId !== 0) {
      writer.uint32(24).uint64(message.keyId);
    }
    if (message.status !== 0) {
      writer.uint32(32).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySignTransactionRequestsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySignTransactionRequestsRequest();
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

          message.walletType = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.keyId = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
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

  fromJSON(object: any): QuerySignTransactionRequestsRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      walletType: isSet(object.walletType) ? walletTypeFromJSON(object.walletType) : 0,
      keyId: isSet(object.keyId) ? Number(object.keyId) : 0,
      status: isSet(object.status) ? signRequestStatusFromJSON(object.status) : 0,
    };
  },

  toJSON(message: QuerySignTransactionRequestsRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    if (message.walletType !== 0) {
      obj.walletType = walletTypeToJSON(message.walletType);
    }
    if (message.keyId !== 0) {
      obj.keyId = Math.round(message.keyId);
    }
    if (message.status !== 0) {
      obj.status = signRequestStatusToJSON(message.status);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySignTransactionRequestsRequest>, I>>(
    base?: I,
  ): QuerySignTransactionRequestsRequest {
    return QuerySignTransactionRequestsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySignTransactionRequestsRequest>, I>>(
    object: I,
  ): QuerySignTransactionRequestsRequest {
    const message = createBaseQuerySignTransactionRequestsRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    message.walletType = object.walletType ?? 0;
    message.keyId = object.keyId ?? 0;
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseSignTransactionRequestResponse(): SignTransactionRequestResponse {
  return { signTransactionRequest: undefined, signRequest: undefined };
}

export const SignTransactionRequestResponse = {
  encode(message: SignTransactionRequestResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signTransactionRequest !== undefined) {
      SignTransactionRequest.encode(message.signTransactionRequest, writer.uint32(10).fork()).ldelim();
    }
    if (message.signRequest !== undefined) {
      SignRequest.encode(message.signRequest, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignTransactionRequestResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignTransactionRequestResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signTransactionRequest = SignTransactionRequest.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): SignTransactionRequestResponse {
    return {
      signTransactionRequest: isSet(object.signTransactionRequest)
        ? SignTransactionRequest.fromJSON(object.signTransactionRequest)
        : undefined,
      signRequest: isSet(object.signRequest) ? SignRequest.fromJSON(object.signRequest) : undefined,
    };
  },

  toJSON(message: SignTransactionRequestResponse): unknown {
    const obj: any = {};
    if (message.signTransactionRequest !== undefined) {
      obj.signTransactionRequest = SignTransactionRequest.toJSON(message.signTransactionRequest);
    }
    if (message.signRequest !== undefined) {
      obj.signRequest = SignRequest.toJSON(message.signRequest);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SignTransactionRequestResponse>, I>>(base?: I): SignTransactionRequestResponse {
    return SignTransactionRequestResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SignTransactionRequestResponse>, I>>(
    object: I,
  ): SignTransactionRequestResponse {
    const message = createBaseSignTransactionRequestResponse();
    message.signTransactionRequest =
      (object.signTransactionRequest !== undefined && object.signTransactionRequest !== null)
        ? SignTransactionRequest.fromPartial(object.signTransactionRequest)
        : undefined;
    message.signRequest = (object.signRequest !== undefined && object.signRequest !== null)
      ? SignRequest.fromPartial(object.signRequest)
      : undefined;
    return message;
  },
};

function createBaseQuerySignTransactionRequestsResponse(): QuerySignTransactionRequestsResponse {
  return { pagination: undefined, signTransactionRequests: [] };
}

export const QuerySignTransactionRequestsResponse = {
  encode(message: QuerySignTransactionRequestsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.signTransactionRequests) {
      SignTransactionRequestResponse.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySignTransactionRequestsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySignTransactionRequestsResponse();
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

          message.signTransactionRequests.push(SignTransactionRequestResponse.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QuerySignTransactionRequestsResponse {
    return {
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      signTransactionRequests: Array.isArray(object?.signTransactionRequests)
        ? object.signTransactionRequests.map((e: any) => SignTransactionRequestResponse.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QuerySignTransactionRequestsResponse): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    if (message.signTransactionRequests?.length) {
      obj.signTransactionRequests = message.signTransactionRequests.map((e) =>
        SignTransactionRequestResponse.toJSON(e)
      );
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySignTransactionRequestsResponse>, I>>(
    base?: I,
  ): QuerySignTransactionRequestsResponse {
    return QuerySignTransactionRequestsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySignTransactionRequestsResponse>, I>>(
    object: I,
  ): QuerySignTransactionRequestsResponse {
    const message = createBaseQuerySignTransactionRequestsResponse();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    message.signTransactionRequests =
      object.signTransactionRequests?.map((e) => SignTransactionRequestResponse.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQuerySignTransactionRequestByIdRequest(): QuerySignTransactionRequestByIdRequest {
  return { id: 0 };
}

export const QuerySignTransactionRequestByIdRequest = {
  encode(message: QuerySignTransactionRequestByIdRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySignTransactionRequestByIdRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySignTransactionRequestByIdRequest();
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

  fromJSON(object: any): QuerySignTransactionRequestByIdRequest {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: QuerySignTransactionRequestByIdRequest): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySignTransactionRequestByIdRequest>, I>>(
    base?: I,
  ): QuerySignTransactionRequestByIdRequest {
    return QuerySignTransactionRequestByIdRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySignTransactionRequestByIdRequest>, I>>(
    object: I,
  ): QuerySignTransactionRequestByIdRequest {
    const message = createBaseQuerySignTransactionRequestByIdRequest();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseQuerySignTransactionRequestByIdResponse(): QuerySignTransactionRequestByIdResponse {
  return { signTransactionRequest: undefined };
}

export const QuerySignTransactionRequestByIdResponse = {
  encode(message: QuerySignTransactionRequestByIdResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signTransactionRequest !== undefined) {
      SignTransactionRequest.encode(message.signTransactionRequest, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySignTransactionRequestByIdResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySignTransactionRequestByIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signTransactionRequest = SignTransactionRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QuerySignTransactionRequestByIdResponse {
    return {
      signTransactionRequest: isSet(object.signTransactionRequest)
        ? SignTransactionRequest.fromJSON(object.signTransactionRequest)
        : undefined,
    };
  },

  toJSON(message: QuerySignTransactionRequestByIdResponse): unknown {
    const obj: any = {};
    if (message.signTransactionRequest !== undefined) {
      obj.signTransactionRequest = SignTransactionRequest.toJSON(message.signTransactionRequest);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySignTransactionRequestByIdResponse>, I>>(
    base?: I,
  ): QuerySignTransactionRequestByIdResponse {
    return QuerySignTransactionRequestByIdResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySignTransactionRequestByIdResponse>, I>>(
    object: I,
  ): QuerySignTransactionRequestByIdResponse {
    const message = createBaseQuerySignTransactionRequestByIdResponse();
    message.signTransactionRequest =
      (object.signTransactionRequest !== undefined && object.signTransactionRequest !== null)
        ? SignTransactionRequest.fromPartial(object.signTransactionRequest)
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
  /** Queries a list of SpaceByAddress items. */
  SpaceByAddress(request: QuerySpaceByAddressRequest): Promise<QuerySpaceByAddressResponse>;
  /** Queries a list of KeychainById items. */
  KeychainByAddress(request: QueryKeychainByAddressRequest): Promise<QueryKeychainByAddressResponse>;
  /** Queries a list of KeyRequests items. */
  KeyRequests(request: QueryKeyRequestsRequest): Promise<QueryKeyRequestsResponse>;
  /** Queries a single KeyRequest by its id. */
  KeyRequestById(request: QueryKeyRequestByIdRequest): Promise<QueryKeyRequestByIdResponse>;
  /** Queries a list of Keys items. */
  Keys(request: QueryKeysRequest): Promise<QueryKeysResponse>;
  /** Queries a list of SignatureRequests items. */
  SignatureRequests(request: QuerySignatureRequestsRequest): Promise<QuerySignatureRequestsResponse>;
  /** Queries a single SignatureRequest by its id. */
  SignatureRequestById(request: QuerySignatureRequestByIdRequest): Promise<QuerySignatureRequestByIdResponse>;
  /** Queries a list of SignTransactionRequests items. */
  SignTransactionRequests(request: QuerySignTransactionRequestsRequest): Promise<QuerySignTransactionRequestsResponse>;
  /** Queries a list of SignTransactionRequestById items. */
  SignTransactionRequestById(
    request: QuerySignTransactionRequestByIdRequest,
  ): Promise<QuerySignTransactionRequestByIdResponse>;
}

export const QueryServiceName = "warden.warden.v1beta1.Query";
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
    this.SpaceByAddress = this.SpaceByAddress.bind(this);
    this.KeychainByAddress = this.KeychainByAddress.bind(this);
    this.KeyRequests = this.KeyRequests.bind(this);
    this.KeyRequestById = this.KeyRequestById.bind(this);
    this.Keys = this.Keys.bind(this);
    this.SignatureRequests = this.SignatureRequests.bind(this);
    this.SignatureRequestById = this.SignatureRequestById.bind(this);
    this.SignTransactionRequests = this.SignTransactionRequests.bind(this);
    this.SignTransactionRequestById = this.SignTransactionRequestById.bind(this);
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

  SpaceByAddress(request: QuerySpaceByAddressRequest): Promise<QuerySpaceByAddressResponse> {
    const data = QuerySpaceByAddressRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "SpaceByAddress", data);
    return promise.then((data) => QuerySpaceByAddressResponse.decode(_m0.Reader.create(data)));
  }

  KeychainByAddress(request: QueryKeychainByAddressRequest): Promise<QueryKeychainByAddressResponse> {
    const data = QueryKeychainByAddressRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "KeychainByAddress", data);
    return promise.then((data) => QueryKeychainByAddressResponse.decode(_m0.Reader.create(data)));
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

  Keys(request: QueryKeysRequest): Promise<QueryKeysResponse> {
    const data = QueryKeysRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Keys", data);
    return promise.then((data) => QueryKeysResponse.decode(_m0.Reader.create(data)));
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

  SignTransactionRequests(request: QuerySignTransactionRequestsRequest): Promise<QuerySignTransactionRequestsResponse> {
    const data = QuerySignTransactionRequestsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "SignTransactionRequests", data);
    return promise.then((data) => QuerySignTransactionRequestsResponse.decode(_m0.Reader.create(data)));
  }

  SignTransactionRequestById(
    request: QuerySignTransactionRequestByIdRequest,
  ): Promise<QuerySignTransactionRequestByIdResponse> {
    const data = QuerySignTransactionRequestByIdRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "SignTransactionRequestById", data);
    return promise.then((data) => QuerySignTransactionRequestByIdResponse.decode(_m0.Reader.create(data)));
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
