/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../cosmos/base/query/v1beta1/pagination";
import { Any } from "../../google/protobuf/any";
import { Action, ActionStatus, actionStatusFromJSON, actionStatusToJSON } from "./action";
import { Intent } from "./intent";
import { Params } from "./params";

export const protobufPackage = "warden.intent";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

export interface QueryActionsRequest {
  pagination: PageRequest | undefined;
}

export interface QueryActionsResponse {
  pagination: PageResponse | undefined;
  actions: Action[];
}

export interface IntentResponse {
  intent: Intent | undefined;
  metadata: Any | undefined;
}

export interface QueryIntentsRequest {
  pagination: PageRequest | undefined;
}

export interface QueryIntentsResponse {
  pagination: PageResponse | undefined;
  intents: IntentResponse[];
}

export interface QueryIntentByIdRequest {
  id: number;
}

export interface QueryIntentByIdResponse {
  intent: IntentResponse | undefined;
}

export interface QueryActionsByAddressRequest {
  pagination: PageRequest | undefined;
  address: string;
  status: ActionStatus;
}

export interface QueryActionsByAddressResponse {
  pagination: PageResponse | undefined;
  actions: Action[];
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

function createBaseQueryActionsRequest(): QueryActionsRequest {
  return { pagination: undefined };
}

export const QueryActionsRequest = {
  encode(message: QueryActionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryActionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryActionsRequest();
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

  fromJSON(object: any): QueryActionsRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryActionsRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryActionsRequest>, I>>(base?: I): QueryActionsRequest {
    return QueryActionsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryActionsRequest>, I>>(object: I): QueryActionsRequest {
    const message = createBaseQueryActionsRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryActionsResponse(): QueryActionsResponse {
  return { pagination: undefined, actions: [] };
}

export const QueryActionsResponse = {
  encode(message: QueryActionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.actions) {
      Action.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryActionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryActionsResponse();
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

          message.actions.push(Action.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryActionsResponse {
    return {
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      actions: Array.isArray(object?.actions) ? object.actions.map((e: any) => Action.fromJSON(e)) : [],
    };
  },

  toJSON(message: QueryActionsResponse): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    if (message.actions?.length) {
      obj.actions = message.actions.map((e) => Action.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryActionsResponse>, I>>(base?: I): QueryActionsResponse {
    return QueryActionsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryActionsResponse>, I>>(object: I): QueryActionsResponse {
    const message = createBaseQueryActionsResponse();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    message.actions = object.actions?.map((e) => Action.fromPartial(e)) || [];
    return message;
  },
};

function createBaseIntentResponse(): IntentResponse {
  return { intent: undefined, metadata: undefined };
}

export const IntentResponse = {
  encode(message: IntentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.intent !== undefined) {
      Intent.encode(message.intent, writer.uint32(10).fork()).ldelim();
    }
    if (message.metadata !== undefined) {
      Any.encode(message.metadata, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IntentResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIntentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.intent = Intent.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): IntentResponse {
    return {
      intent: isSet(object.intent) ? Intent.fromJSON(object.intent) : undefined,
      metadata: isSet(object.metadata) ? Any.fromJSON(object.metadata) : undefined,
    };
  },

  toJSON(message: IntentResponse): unknown {
    const obj: any = {};
    if (message.intent !== undefined) {
      obj.intent = Intent.toJSON(message.intent);
    }
    if (message.metadata !== undefined) {
      obj.metadata = Any.toJSON(message.metadata);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IntentResponse>, I>>(base?: I): IntentResponse {
    return IntentResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IntentResponse>, I>>(object: I): IntentResponse {
    const message = createBaseIntentResponse();
    message.intent = (object.intent !== undefined && object.intent !== null)
      ? Intent.fromPartial(object.intent)
      : undefined;
    message.metadata = (object.metadata !== undefined && object.metadata !== null)
      ? Any.fromPartial(object.metadata)
      : undefined;
    return message;
  },
};

function createBaseQueryIntentsRequest(): QueryIntentsRequest {
  return { pagination: undefined };
}

export const QueryIntentsRequest = {
  encode(message: QueryIntentsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryIntentsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIntentsRequest();
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

  fromJSON(object: any): QueryIntentsRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryIntentsRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryIntentsRequest>, I>>(base?: I): QueryIntentsRequest {
    return QueryIntentsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryIntentsRequest>, I>>(object: I): QueryIntentsRequest {
    const message = createBaseQueryIntentsRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryIntentsResponse(): QueryIntentsResponse {
  return { pagination: undefined, intents: [] };
}

export const QueryIntentsResponse = {
  encode(message: QueryIntentsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.intents) {
      IntentResponse.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryIntentsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIntentsResponse();
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

          message.intents.push(IntentResponse.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryIntentsResponse {
    return {
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      intents: Array.isArray(object?.intents) ? object.intents.map((e: any) => IntentResponse.fromJSON(e)) : [],
    };
  },

  toJSON(message: QueryIntentsResponse): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    if (message.intents?.length) {
      obj.intents = message.intents.map((e) => IntentResponse.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryIntentsResponse>, I>>(base?: I): QueryIntentsResponse {
    return QueryIntentsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryIntentsResponse>, I>>(object: I): QueryIntentsResponse {
    const message = createBaseQueryIntentsResponse();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    message.intents = object.intents?.map((e) => IntentResponse.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryIntentByIdRequest(): QueryIntentByIdRequest {
  return { id: 0 };
}

export const QueryIntentByIdRequest = {
  encode(message: QueryIntentByIdRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryIntentByIdRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIntentByIdRequest();
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

  fromJSON(object: any): QueryIntentByIdRequest {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: QueryIntentByIdRequest): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryIntentByIdRequest>, I>>(base?: I): QueryIntentByIdRequest {
    return QueryIntentByIdRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryIntentByIdRequest>, I>>(object: I): QueryIntentByIdRequest {
    const message = createBaseQueryIntentByIdRequest();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseQueryIntentByIdResponse(): QueryIntentByIdResponse {
  return { intent: undefined };
}

export const QueryIntentByIdResponse = {
  encode(message: QueryIntentByIdResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.intent !== undefined) {
      IntentResponse.encode(message.intent, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryIntentByIdResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIntentByIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.intent = IntentResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryIntentByIdResponse {
    return { intent: isSet(object.intent) ? IntentResponse.fromJSON(object.intent) : undefined };
  },

  toJSON(message: QueryIntentByIdResponse): unknown {
    const obj: any = {};
    if (message.intent !== undefined) {
      obj.intent = IntentResponse.toJSON(message.intent);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryIntentByIdResponse>, I>>(base?: I): QueryIntentByIdResponse {
    return QueryIntentByIdResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryIntentByIdResponse>, I>>(object: I): QueryIntentByIdResponse {
    const message = createBaseQueryIntentByIdResponse();
    message.intent = (object.intent !== undefined && object.intent !== null)
      ? IntentResponse.fromPartial(object.intent)
      : undefined;
    return message;
  },
};

function createBaseQueryActionsByAddressRequest(): QueryActionsByAddressRequest {
  return { pagination: undefined, address: "", status: 0 };
}

export const QueryActionsByAddressRequest = {
  encode(message: QueryActionsByAddressRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (message.status !== 0) {
      writer.uint32(24).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryActionsByAddressRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryActionsByAddressRequest();
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

          message.address = reader.string();
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

  fromJSON(object: any): QueryActionsByAddressRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      address: isSet(object.address) ? String(object.address) : "",
      status: isSet(object.status) ? actionStatusFromJSON(object.status) : 0,
    };
  },

  toJSON(message: QueryActionsByAddressRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.status !== 0) {
      obj.status = actionStatusToJSON(message.status);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryActionsByAddressRequest>, I>>(base?: I): QueryActionsByAddressRequest {
    return QueryActionsByAddressRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryActionsByAddressRequest>, I>>(object: I): QueryActionsByAddressRequest {
    const message = createBaseQueryActionsByAddressRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    message.address = object.address ?? "";
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseQueryActionsByAddressResponse(): QueryActionsByAddressResponse {
  return { pagination: undefined, actions: [] };
}

export const QueryActionsByAddressResponse = {
  encode(message: QueryActionsByAddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.actions) {
      Action.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryActionsByAddressResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryActionsByAddressResponse();
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

          message.actions.push(Action.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryActionsByAddressResponse {
    return {
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      actions: Array.isArray(object?.actions) ? object.actions.map((e: any) => Action.fromJSON(e)) : [],
    };
  },

  toJSON(message: QueryActionsByAddressResponse): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    if (message.actions?.length) {
      obj.actions = message.actions.map((e) => Action.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryActionsByAddressResponse>, I>>(base?: I): QueryActionsByAddressResponse {
    return QueryActionsByAddressResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryActionsByAddressResponse>, I>>(
    object: I,
  ): QueryActionsByAddressResponse {
    const message = createBaseQueryActionsByAddressResponse();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    message.actions = object.actions?.map((e) => Action.fromPartial(e)) || [];
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a list of Actions items. */
  Actions(request: QueryActionsRequest): Promise<QueryActionsResponse>;
  /** Queries a list of Intents items. */
  Intents(request: QueryIntentsRequest): Promise<QueryIntentsResponse>;
  /** Queries a list of IntentById items. */
  IntentById(request: QueryIntentByIdRequest): Promise<QueryIntentByIdResponse>;
  /** Queries a list of Actions items by one participant address. */
  ActionsByAddress(request: QueryActionsByAddressRequest): Promise<QueryActionsByAddressResponse>;
}

export const QueryServiceName = "warden.intent.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.Actions = this.Actions.bind(this);
    this.Intents = this.Intents.bind(this);
    this.IntentById = this.IntentById.bind(this);
    this.ActionsByAddress = this.ActionsByAddress.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(_m0.Reader.create(data)));
  }

  Actions(request: QueryActionsRequest): Promise<QueryActionsResponse> {
    const data = QueryActionsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Actions", data);
    return promise.then((data) => QueryActionsResponse.decode(_m0.Reader.create(data)));
  }

  Intents(request: QueryIntentsRequest): Promise<QueryIntentsResponse> {
    const data = QueryIntentsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Intents", data);
    return promise.then((data) => QueryIntentsResponse.decode(_m0.Reader.create(data)));
  }

  IntentById(request: QueryIntentByIdRequest): Promise<QueryIntentByIdResponse> {
    const data = QueryIntentByIdRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "IntentById", data);
    return promise.then((data) => QueryIntentByIdResponse.decode(_m0.Reader.create(data)));
  }

  ActionsByAddress(request: QueryActionsByAddressRequest): Promise<QueryActionsByAddressResponse> {
    const data = QueryActionsByAddressRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ActionsByAddress", data);
    return promise.then((data) => QueryActionsByAddressResponse.decode(_m0.Reader.create(data)));
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
