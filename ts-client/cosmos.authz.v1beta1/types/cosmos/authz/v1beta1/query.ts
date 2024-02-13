/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
import { Grant, GrantAuthorization } from "./authz";

export const protobufPackage = "cosmos.authz.v1beta1";

/** Since: cosmos-sdk 0.43 */

/** QueryGrantsRequest is the request type for the Query/Grants RPC method. */
export interface QueryGrantsRequest {
  granter: string;
  grantee: string;
  /** Optional, msg_type_url, when set, will query only grants matching given msg type. */
  msgTypeUrl: string;
  /** pagination defines an pagination for the request. */
  pagination: PageRequest | undefined;
}

/** QueryGrantsResponse is the response type for the Query/Authorizations RPC method. */
export interface QueryGrantsResponse {
  /** authorizations is a list of grants granted for grantee by granter. */
  grants: Grant[];
  /** pagination defines an pagination for the response. */
  pagination: PageResponse | undefined;
}

/** QueryGranterGrantsRequest is the request type for the Query/GranterGrants RPC method. */
export interface QueryGranterGrantsRequest {
  granter: string;
  /** pagination defines an pagination for the request. */
  pagination: PageRequest | undefined;
}

/** QueryGranterGrantsResponse is the response type for the Query/GranterGrants RPC method. */
export interface QueryGranterGrantsResponse {
  /** grants is a list of grants granted by the granter. */
  grants: GrantAuthorization[];
  /** pagination defines an pagination for the response. */
  pagination: PageResponse | undefined;
}

/** QueryGranteeGrantsRequest is the request type for the Query/GranteeGrants RPC method. */
export interface QueryGranteeGrantsRequest {
  grantee: string;
  /** pagination defines an pagination for the request. */
  pagination: PageRequest | undefined;
}

/** QueryGranteeGrantsResponse is the response type for the Query/GranteeGrants RPC method. */
export interface QueryGranteeGrantsResponse {
  /** grants is a list of grants granted to the grantee. */
  grants: GrantAuthorization[];
  /** pagination defines an pagination for the response. */
  pagination: PageResponse | undefined;
}

function createBaseQueryGrantsRequest(): QueryGrantsRequest {
  return { granter: "", grantee: "", msgTypeUrl: "", pagination: undefined };
}

export const QueryGrantsRequest = {
  encode(message: QueryGrantsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.granter !== "") {
      writer.uint32(10).string(message.granter);
    }
    if (message.grantee !== "") {
      writer.uint32(18).string(message.grantee);
    }
    if (message.msgTypeUrl !== "") {
      writer.uint32(26).string(message.msgTypeUrl);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGrantsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGrantsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.granter = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.grantee = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.msgTypeUrl = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
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

  fromJSON(object: any): QueryGrantsRequest {
    return {
      granter: isSet(object.granter) ? String(object.granter) : "",
      grantee: isSet(object.grantee) ? String(object.grantee) : "",
      msgTypeUrl: isSet(object.msgTypeUrl) ? String(object.msgTypeUrl) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryGrantsRequest): unknown {
    const obj: any = {};
    if (message.granter !== "") {
      obj.granter = message.granter;
    }
    if (message.grantee !== "") {
      obj.grantee = message.grantee;
    }
    if (message.msgTypeUrl !== "") {
      obj.msgTypeUrl = message.msgTypeUrl;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGrantsRequest>, I>>(base?: I): QueryGrantsRequest {
    return QueryGrantsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGrantsRequest>, I>>(object: I): QueryGrantsRequest {
    const message = createBaseQueryGrantsRequest();
    message.granter = object.granter ?? "";
    message.grantee = object.grantee ?? "";
    message.msgTypeUrl = object.msgTypeUrl ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGrantsResponse(): QueryGrantsResponse {
  return { grants: [], pagination: undefined };
}

export const QueryGrantsResponse = {
  encode(message: QueryGrantsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.grants) {
      Grant.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGrantsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGrantsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.grants.push(Grant.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGrantsResponse {
    return {
      grants: Array.isArray(object?.grants) ? object.grants.map((e: any) => Grant.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryGrantsResponse): unknown {
    const obj: any = {};
    if (message.grants?.length) {
      obj.grants = message.grants.map((e) => Grant.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGrantsResponse>, I>>(base?: I): QueryGrantsResponse {
    return QueryGrantsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGrantsResponse>, I>>(object: I): QueryGrantsResponse {
    const message = createBaseQueryGrantsResponse();
    message.grants = object.grants?.map((e) => Grant.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGranterGrantsRequest(): QueryGranterGrantsRequest {
  return { granter: "", pagination: undefined };
}

export const QueryGranterGrantsRequest = {
  encode(message: QueryGranterGrantsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.granter !== "") {
      writer.uint32(10).string(message.granter);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGranterGrantsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGranterGrantsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.granter = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): QueryGranterGrantsRequest {
    return {
      granter: isSet(object.granter) ? String(object.granter) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryGranterGrantsRequest): unknown {
    const obj: any = {};
    if (message.granter !== "") {
      obj.granter = message.granter;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGranterGrantsRequest>, I>>(base?: I): QueryGranterGrantsRequest {
    return QueryGranterGrantsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGranterGrantsRequest>, I>>(object: I): QueryGranterGrantsRequest {
    const message = createBaseQueryGranterGrantsRequest();
    message.granter = object.granter ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGranterGrantsResponse(): QueryGranterGrantsResponse {
  return { grants: [], pagination: undefined };
}

export const QueryGranterGrantsResponse = {
  encode(message: QueryGranterGrantsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.grants) {
      GrantAuthorization.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGranterGrantsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGranterGrantsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.grants.push(GrantAuthorization.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGranterGrantsResponse {
    return {
      grants: Array.isArray(object?.grants) ? object.grants.map((e: any) => GrantAuthorization.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryGranterGrantsResponse): unknown {
    const obj: any = {};
    if (message.grants?.length) {
      obj.grants = message.grants.map((e) => GrantAuthorization.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGranterGrantsResponse>, I>>(base?: I): QueryGranterGrantsResponse {
    return QueryGranterGrantsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGranterGrantsResponse>, I>>(object: I): QueryGranterGrantsResponse {
    const message = createBaseQueryGranterGrantsResponse();
    message.grants = object.grants?.map((e) => GrantAuthorization.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGranteeGrantsRequest(): QueryGranteeGrantsRequest {
  return { grantee: "", pagination: undefined };
}

export const QueryGranteeGrantsRequest = {
  encode(message: QueryGranteeGrantsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.grantee !== "") {
      writer.uint32(10).string(message.grantee);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGranteeGrantsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGranteeGrantsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.grantee = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): QueryGranteeGrantsRequest {
    return {
      grantee: isSet(object.grantee) ? String(object.grantee) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryGranteeGrantsRequest): unknown {
    const obj: any = {};
    if (message.grantee !== "") {
      obj.grantee = message.grantee;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGranteeGrantsRequest>, I>>(base?: I): QueryGranteeGrantsRequest {
    return QueryGranteeGrantsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGranteeGrantsRequest>, I>>(object: I): QueryGranteeGrantsRequest {
    const message = createBaseQueryGranteeGrantsRequest();
    message.grantee = object.grantee ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGranteeGrantsResponse(): QueryGranteeGrantsResponse {
  return { grants: [], pagination: undefined };
}

export const QueryGranteeGrantsResponse = {
  encode(message: QueryGranteeGrantsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.grants) {
      GrantAuthorization.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGranteeGrantsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGranteeGrantsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.grants.push(GrantAuthorization.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGranteeGrantsResponse {
    return {
      grants: Array.isArray(object?.grants) ? object.grants.map((e: any) => GrantAuthorization.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryGranteeGrantsResponse): unknown {
    const obj: any = {};
    if (message.grants?.length) {
      obj.grants = message.grants.map((e) => GrantAuthorization.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGranteeGrantsResponse>, I>>(base?: I): QueryGranteeGrantsResponse {
    return QueryGranteeGrantsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGranteeGrantsResponse>, I>>(object: I): QueryGranteeGrantsResponse {
    const message = createBaseQueryGranteeGrantsResponse();
    message.grants = object.grants?.map((e) => GrantAuthorization.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Returns list of `Authorization`, granted to the grantee by the granter. */
  Grants(request: QueryGrantsRequest): Promise<QueryGrantsResponse>;
  /**
   * GranterGrants returns list of `GrantAuthorization`, granted by granter.
   *
   * Since: cosmos-sdk 0.46
   */
  GranterGrants(request: QueryGranterGrantsRequest): Promise<QueryGranterGrantsResponse>;
  /**
   * GranteeGrants returns a list of `GrantAuthorization` by grantee.
   *
   * Since: cosmos-sdk 0.46
   */
  GranteeGrants(request: QueryGranteeGrantsRequest): Promise<QueryGranteeGrantsResponse>;
}

export const QueryServiceName = "cosmos.authz.v1beta1.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.Grants = this.Grants.bind(this);
    this.GranterGrants = this.GranterGrants.bind(this);
    this.GranteeGrants = this.GranteeGrants.bind(this);
  }
  Grants(request: QueryGrantsRequest): Promise<QueryGrantsResponse> {
    const data = QueryGrantsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Grants", data);
    return promise.then((data) => QueryGrantsResponse.decode(_m0.Reader.create(data)));
  }

  GranterGrants(request: QueryGranterGrantsRequest): Promise<QueryGranterGrantsResponse> {
    const data = QueryGranterGrantsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GranterGrants", data);
    return promise.then((data) => QueryGranterGrantsResponse.decode(_m0.Reader.create(data)));
  }

  GranteeGrants(request: QueryGranteeGrantsRequest): Promise<QueryGranteeGrantsResponse> {
    const data = QueryGranteeGrantsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GranteeGrants", data);
    return promise.then((data) => QueryGranteeGrantsResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
