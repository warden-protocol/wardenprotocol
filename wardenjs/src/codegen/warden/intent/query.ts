//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../cosmos/base/query/v1beta1/pagination";
import { ActionStatus, Action, ActionAmino, ActionSDKType, actionStatusFromJSON, actionStatusToJSON } from "./action";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { Intent, IntentAmino, IntentSDKType } from "./intent";
import { Long, isSet } from "../../helpers";
import * as _m0 from "protobufjs/minimal";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/warden.intent.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/warden.intent.QueryParamsRequest";
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
  typeUrl: "/warden.intent.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params holds all the parameters of this module. */
  params?: ParamsAmino;
}
export interface QueryParamsResponseAminoMsg {
  type: "/warden.intent.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType;
}
export interface QueryActionsRequest {
  pagination?: PageRequest;
}
export interface QueryActionsRequestProtoMsg {
  typeUrl: "/warden.intent.QueryActionsRequest";
  value: Uint8Array;
}
export interface QueryActionsRequestAmino {
  pagination?: PageRequestAmino;
}
export interface QueryActionsRequestAminoMsg {
  type: "/warden.intent.QueryActionsRequest";
  value: QueryActionsRequestAmino;
}
export interface QueryActionsRequestSDKType {
  pagination?: PageRequestSDKType;
}
export interface QueryActionsResponse {
  pagination?: PageResponse;
  actions: Action[];
}
export interface QueryActionsResponseProtoMsg {
  typeUrl: "/warden.intent.QueryActionsResponse";
  value: Uint8Array;
}
export interface QueryActionsResponseAmino {
  pagination?: PageResponseAmino;
  actions?: ActionAmino[];
}
export interface QueryActionsResponseAminoMsg {
  type: "/warden.intent.QueryActionsResponse";
  value: QueryActionsResponseAmino;
}
export interface QueryActionsResponseSDKType {
  pagination?: PageResponseSDKType;
  actions: ActionSDKType[];
}
export interface QueryIntentsRequest {
  pagination?: PageRequest;
}
export interface QueryIntentsRequestProtoMsg {
  typeUrl: "/warden.intent.QueryIntentsRequest";
  value: Uint8Array;
}
export interface QueryIntentsRequestAmino {
  pagination?: PageRequestAmino;
}
export interface QueryIntentsRequestAminoMsg {
  type: "/warden.intent.QueryIntentsRequest";
  value: QueryIntentsRequestAmino;
}
export interface QueryIntentsRequestSDKType {
  pagination?: PageRequestSDKType;
}
export interface QueryIntentsResponse {
  pagination?: PageResponse;
  intents: Intent[];
}
export interface QueryIntentsResponseProtoMsg {
  typeUrl: "/warden.intent.QueryIntentsResponse";
  value: Uint8Array;
}
export interface QueryIntentsResponseAmino {
  pagination?: PageResponseAmino;
  intents?: IntentAmino[];
}
export interface QueryIntentsResponseAminoMsg {
  type: "/warden.intent.QueryIntentsResponse";
  value: QueryIntentsResponseAmino;
}
export interface QueryIntentsResponseSDKType {
  pagination?: PageResponseSDKType;
  intents: IntentSDKType[];
}
export interface QueryIntentByIdRequest {
  id: Long;
}
export interface QueryIntentByIdRequestProtoMsg {
  typeUrl: "/warden.intent.QueryIntentByIdRequest";
  value: Uint8Array;
}
export interface QueryIntentByIdRequestAmino {
  id?: string;
}
export interface QueryIntentByIdRequestAminoMsg {
  type: "/warden.intent.QueryIntentByIdRequest";
  value: QueryIntentByIdRequestAmino;
}
export interface QueryIntentByIdRequestSDKType {
  id: Long;
}
export interface QueryIntentByIdResponse {
  intent?: Intent;
}
export interface QueryIntentByIdResponseProtoMsg {
  typeUrl: "/warden.intent.QueryIntentByIdResponse";
  value: Uint8Array;
}
export interface QueryIntentByIdResponseAmino {
  intent?: IntentAmino;
}
export interface QueryIntentByIdResponseAminoMsg {
  type: "/warden.intent.QueryIntentByIdResponse";
  value: QueryIntentByIdResponseAmino;
}
export interface QueryIntentByIdResponseSDKType {
  intent?: IntentSDKType;
}
export interface QueryActionsByAddressRequest {
  pagination?: PageRequest;
  address: string;
  status: ActionStatus;
}
export interface QueryActionsByAddressRequestProtoMsg {
  typeUrl: "/warden.intent.QueryActionsByAddressRequest";
  value: Uint8Array;
}
export interface QueryActionsByAddressRequestAmino {
  pagination?: PageRequestAmino;
  address?: string;
  status?: ActionStatus;
}
export interface QueryActionsByAddressRequestAminoMsg {
  type: "/warden.intent.QueryActionsByAddressRequest";
  value: QueryActionsByAddressRequestAmino;
}
export interface QueryActionsByAddressRequestSDKType {
  pagination?: PageRequestSDKType;
  address: string;
  status: ActionStatus;
}
export interface QueryActionsByAddressResponse {
  pagination?: PageResponse;
  actions: Action[];
}
export interface QueryActionsByAddressResponseProtoMsg {
  typeUrl: "/warden.intent.QueryActionsByAddressResponse";
  value: Uint8Array;
}
export interface QueryActionsByAddressResponseAmino {
  pagination?: PageResponseAmino;
  actions?: ActionAmino[];
}
export interface QueryActionsByAddressResponseAminoMsg {
  type: "/warden.intent.QueryActionsByAddressResponse";
  value: QueryActionsByAddressResponseAmino;
}
export interface QueryActionsByAddressResponseSDKType {
  pagination?: PageResponseSDKType;
  actions: ActionSDKType[];
}
export interface QueryActionByIdRequest {
  id: Long;
}
export interface QueryActionByIdRequestProtoMsg {
  typeUrl: "/warden.intent.QueryActionByIdRequest";
  value: Uint8Array;
}
export interface QueryActionByIdRequestAmino {
  id?: string;
}
export interface QueryActionByIdRequestAminoMsg {
  type: "/warden.intent.QueryActionByIdRequest";
  value: QueryActionByIdRequestAmino;
}
export interface QueryActionByIdRequestSDKType {
  id: Long;
}
export interface QueryActionByIdResponse {
  action?: Action;
}
export interface QueryActionByIdResponseProtoMsg {
  typeUrl: "/warden.intent.QueryActionByIdResponse";
  value: Uint8Array;
}
export interface QueryActionByIdResponseAmino {
  action?: ActionAmino;
}
export interface QueryActionByIdResponseAminoMsg {
  type: "/warden.intent.QueryActionByIdResponse";
  value: QueryActionByIdResponseAmino;
}
export interface QueryActionByIdResponseSDKType {
  action?: ActionSDKType;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/warden.intent.QueryParamsRequest",
  encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
      typeUrl: "/warden.intent.QueryParamsRequest",
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
  typeUrl: "/warden.intent.QueryParamsResponse",
  encode(message: QueryParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
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
      typeUrl: "/warden.intent.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryActionsRequest(): QueryActionsRequest {
  return {
    pagination: undefined
  };
}
export const QueryActionsRequest = {
  typeUrl: "/warden.intent.QueryActionsRequest",
  encode(message: QueryActionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryActionsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryActionsRequest();
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
  fromJSON(object: any): QueryActionsRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined
    };
  },
  toJSON(message: QueryActionsRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial(object: Partial<QueryActionsRequest>): QueryActionsRequest {
    const message = createBaseQueryActionsRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryActionsRequestAmino): QueryActionsRequest {
    const message = createBaseQueryActionsRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryActionsRequest): QueryActionsRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryActionsRequestAminoMsg): QueryActionsRequest {
    return QueryActionsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryActionsRequestProtoMsg): QueryActionsRequest {
    return QueryActionsRequest.decode(message.value);
  },
  toProto(message: QueryActionsRequest): Uint8Array {
    return QueryActionsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryActionsRequest): QueryActionsRequestProtoMsg {
    return {
      typeUrl: "/warden.intent.QueryActionsRequest",
      value: QueryActionsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryActionsResponse(): QueryActionsResponse {
  return {
    pagination: undefined,
    actions: []
  };
}
export const QueryActionsResponse = {
  typeUrl: "/warden.intent.QueryActionsResponse",
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryActionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        case 2:
          message.actions.push(Action.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryActionsResponse {
    return {
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      actions: Array.isArray(object?.actions) ? object.actions.map((e: any) => Action.fromJSON(e)) : []
    };
  },
  toJSON(message: QueryActionsResponse): unknown {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    if (message.actions) {
      obj.actions = message.actions.map(e => e ? Action.toJSON(e) : undefined);
    } else {
      obj.actions = [];
    }
    return obj;
  },
  fromPartial(object: Partial<QueryActionsResponse>): QueryActionsResponse {
    const message = createBaseQueryActionsResponse();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    message.actions = object.actions?.map(e => Action.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryActionsResponseAmino): QueryActionsResponse {
    const message = createBaseQueryActionsResponse();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    message.actions = object.actions?.map(e => Action.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryActionsResponse): QueryActionsResponseAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    if (message.actions) {
      obj.actions = message.actions.map(e => e ? Action.toAmino(e) : undefined);
    } else {
      obj.actions = message.actions;
    }
    return obj;
  },
  fromAminoMsg(object: QueryActionsResponseAminoMsg): QueryActionsResponse {
    return QueryActionsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryActionsResponseProtoMsg): QueryActionsResponse {
    return QueryActionsResponse.decode(message.value);
  },
  toProto(message: QueryActionsResponse): Uint8Array {
    return QueryActionsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryActionsResponse): QueryActionsResponseProtoMsg {
    return {
      typeUrl: "/warden.intent.QueryActionsResponse",
      value: QueryActionsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryIntentsRequest(): QueryIntentsRequest {
  return {
    pagination: undefined
  };
}
export const QueryIntentsRequest = {
  typeUrl: "/warden.intent.QueryIntentsRequest",
  encode(message: QueryIntentsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryIntentsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIntentsRequest();
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
  fromJSON(object: any): QueryIntentsRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined
    };
  },
  toJSON(message: QueryIntentsRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial(object: Partial<QueryIntentsRequest>): QueryIntentsRequest {
    const message = createBaseQueryIntentsRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryIntentsRequestAmino): QueryIntentsRequest {
    const message = createBaseQueryIntentsRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryIntentsRequest): QueryIntentsRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryIntentsRequestAminoMsg): QueryIntentsRequest {
    return QueryIntentsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryIntentsRequestProtoMsg): QueryIntentsRequest {
    return QueryIntentsRequest.decode(message.value);
  },
  toProto(message: QueryIntentsRequest): Uint8Array {
    return QueryIntentsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryIntentsRequest): QueryIntentsRequestProtoMsg {
    return {
      typeUrl: "/warden.intent.QueryIntentsRequest",
      value: QueryIntentsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryIntentsResponse(): QueryIntentsResponse {
  return {
    pagination: undefined,
    intents: []
  };
}
export const QueryIntentsResponse = {
  typeUrl: "/warden.intent.QueryIntentsResponse",
  encode(message: QueryIntentsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.intents) {
      Intent.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryIntentsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIntentsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        case 2:
          message.intents.push(Intent.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryIntentsResponse {
    return {
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      intents: Array.isArray(object?.intents) ? object.intents.map((e: any) => Intent.fromJSON(e)) : []
    };
  },
  toJSON(message: QueryIntentsResponse): unknown {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    if (message.intents) {
      obj.intents = message.intents.map(e => e ? Intent.toJSON(e) : undefined);
    } else {
      obj.intents = [];
    }
    return obj;
  },
  fromPartial(object: Partial<QueryIntentsResponse>): QueryIntentsResponse {
    const message = createBaseQueryIntentsResponse();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    message.intents = object.intents?.map(e => Intent.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryIntentsResponseAmino): QueryIntentsResponse {
    const message = createBaseQueryIntentsResponse();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    message.intents = object.intents?.map(e => Intent.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryIntentsResponse): QueryIntentsResponseAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    if (message.intents) {
      obj.intents = message.intents.map(e => e ? Intent.toAmino(e) : undefined);
    } else {
      obj.intents = message.intents;
    }
    return obj;
  },
  fromAminoMsg(object: QueryIntentsResponseAminoMsg): QueryIntentsResponse {
    return QueryIntentsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryIntentsResponseProtoMsg): QueryIntentsResponse {
    return QueryIntentsResponse.decode(message.value);
  },
  toProto(message: QueryIntentsResponse): Uint8Array {
    return QueryIntentsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryIntentsResponse): QueryIntentsResponseProtoMsg {
    return {
      typeUrl: "/warden.intent.QueryIntentsResponse",
      value: QueryIntentsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryIntentByIdRequest(): QueryIntentByIdRequest {
  return {
    id: Long.UZERO
  };
}
export const QueryIntentByIdRequest = {
  typeUrl: "/warden.intent.QueryIntentByIdRequest",
  encode(message: QueryIntentByIdRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryIntentByIdRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIntentByIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = (reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryIntentByIdRequest {
    return {
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO
    };
  },
  toJSON(message: QueryIntentByIdRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString());
    return obj;
  },
  fromPartial(object: Partial<QueryIntentByIdRequest>): QueryIntentByIdRequest {
    const message = createBaseQueryIntentByIdRequest();
    message.id = object.id !== undefined && object.id !== null ? Long.fromValue(object.id) : Long.UZERO;
    return message;
  },
  fromAmino(object: QueryIntentByIdRequestAmino): QueryIntentByIdRequest {
    const message = createBaseQueryIntentByIdRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = Long.fromString(object.id);
    }
    return message;
  },
  toAmino(message: QueryIntentByIdRequest): QueryIntentByIdRequestAmino {
    const obj: any = {};
    obj.id = !message.id.isZero() ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryIntentByIdRequestAminoMsg): QueryIntentByIdRequest {
    return QueryIntentByIdRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryIntentByIdRequestProtoMsg): QueryIntentByIdRequest {
    return QueryIntentByIdRequest.decode(message.value);
  },
  toProto(message: QueryIntentByIdRequest): Uint8Array {
    return QueryIntentByIdRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryIntentByIdRequest): QueryIntentByIdRequestProtoMsg {
    return {
      typeUrl: "/warden.intent.QueryIntentByIdRequest",
      value: QueryIntentByIdRequest.encode(message).finish()
    };
  }
};
function createBaseQueryIntentByIdResponse(): QueryIntentByIdResponse {
  return {
    intent: undefined
  };
}
export const QueryIntentByIdResponse = {
  typeUrl: "/warden.intent.QueryIntentByIdResponse",
  encode(message: QueryIntentByIdResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.intent !== undefined) {
      Intent.encode(message.intent, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryIntentByIdResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIntentByIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.intent = Intent.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryIntentByIdResponse {
    return {
      intent: isSet(object.intent) ? Intent.fromJSON(object.intent) : undefined
    };
  },
  toJSON(message: QueryIntentByIdResponse): unknown {
    const obj: any = {};
    message.intent !== undefined && (obj.intent = message.intent ? Intent.toJSON(message.intent) : undefined);
    return obj;
  },
  fromPartial(object: Partial<QueryIntentByIdResponse>): QueryIntentByIdResponse {
    const message = createBaseQueryIntentByIdResponse();
    message.intent = object.intent !== undefined && object.intent !== null ? Intent.fromPartial(object.intent) : undefined;
    return message;
  },
  fromAmino(object: QueryIntentByIdResponseAmino): QueryIntentByIdResponse {
    const message = createBaseQueryIntentByIdResponse();
    if (object.intent !== undefined && object.intent !== null) {
      message.intent = Intent.fromAmino(object.intent);
    }
    return message;
  },
  toAmino(message: QueryIntentByIdResponse): QueryIntentByIdResponseAmino {
    const obj: any = {};
    obj.intent = message.intent ? Intent.toAmino(message.intent) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryIntentByIdResponseAminoMsg): QueryIntentByIdResponse {
    return QueryIntentByIdResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryIntentByIdResponseProtoMsg): QueryIntentByIdResponse {
    return QueryIntentByIdResponse.decode(message.value);
  },
  toProto(message: QueryIntentByIdResponse): Uint8Array {
    return QueryIntentByIdResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryIntentByIdResponse): QueryIntentByIdResponseProtoMsg {
    return {
      typeUrl: "/warden.intent.QueryIntentByIdResponse",
      value: QueryIntentByIdResponse.encode(message).finish()
    };
  }
};
function createBaseQueryActionsByAddressRequest(): QueryActionsByAddressRequest {
  return {
    pagination: undefined,
    address: "",
    status: 0
  };
}
export const QueryActionsByAddressRequest = {
  typeUrl: "/warden.intent.QueryActionsByAddressRequest",
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryActionsByAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.address = reader.string();
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
  fromJSON(object: any): QueryActionsByAddressRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      address: isSet(object.address) ? String(object.address) : "",
      status: isSet(object.status) ? actionStatusFromJSON(object.status) : -1
    };
  },
  toJSON(message: QueryActionsByAddressRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    message.address !== undefined && (obj.address = message.address);
    message.status !== undefined && (obj.status = actionStatusToJSON(message.status));
    return obj;
  },
  fromPartial(object: Partial<QueryActionsByAddressRequest>): QueryActionsByAddressRequest {
    const message = createBaseQueryActionsByAddressRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    message.address = object.address ?? "";
    message.status = object.status ?? 0;
    return message;
  },
  fromAmino(object: QueryActionsByAddressRequestAmino): QueryActionsByAddressRequest {
    const message = createBaseQueryActionsByAddressRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    return message;
  },
  toAmino(message: QueryActionsByAddressRequest): QueryActionsByAddressRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    obj.address = message.address === "" ? undefined : message.address;
    obj.status = message.status === 0 ? undefined : message.status;
    return obj;
  },
  fromAminoMsg(object: QueryActionsByAddressRequestAminoMsg): QueryActionsByAddressRequest {
    return QueryActionsByAddressRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryActionsByAddressRequestProtoMsg): QueryActionsByAddressRequest {
    return QueryActionsByAddressRequest.decode(message.value);
  },
  toProto(message: QueryActionsByAddressRequest): Uint8Array {
    return QueryActionsByAddressRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryActionsByAddressRequest): QueryActionsByAddressRequestProtoMsg {
    return {
      typeUrl: "/warden.intent.QueryActionsByAddressRequest",
      value: QueryActionsByAddressRequest.encode(message).finish()
    };
  }
};
function createBaseQueryActionsByAddressResponse(): QueryActionsByAddressResponse {
  return {
    pagination: undefined,
    actions: []
  };
}
export const QueryActionsByAddressResponse = {
  typeUrl: "/warden.intent.QueryActionsByAddressResponse",
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryActionsByAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        case 2:
          message.actions.push(Action.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryActionsByAddressResponse {
    return {
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      actions: Array.isArray(object?.actions) ? object.actions.map((e: any) => Action.fromJSON(e)) : []
    };
  },
  toJSON(message: QueryActionsByAddressResponse): unknown {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    if (message.actions) {
      obj.actions = message.actions.map(e => e ? Action.toJSON(e) : undefined);
    } else {
      obj.actions = [];
    }
    return obj;
  },
  fromPartial(object: Partial<QueryActionsByAddressResponse>): QueryActionsByAddressResponse {
    const message = createBaseQueryActionsByAddressResponse();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    message.actions = object.actions?.map(e => Action.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryActionsByAddressResponseAmino): QueryActionsByAddressResponse {
    const message = createBaseQueryActionsByAddressResponse();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    message.actions = object.actions?.map(e => Action.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryActionsByAddressResponse): QueryActionsByAddressResponseAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    if (message.actions) {
      obj.actions = message.actions.map(e => e ? Action.toAmino(e) : undefined);
    } else {
      obj.actions = message.actions;
    }
    return obj;
  },
  fromAminoMsg(object: QueryActionsByAddressResponseAminoMsg): QueryActionsByAddressResponse {
    return QueryActionsByAddressResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryActionsByAddressResponseProtoMsg): QueryActionsByAddressResponse {
    return QueryActionsByAddressResponse.decode(message.value);
  },
  toProto(message: QueryActionsByAddressResponse): Uint8Array {
    return QueryActionsByAddressResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryActionsByAddressResponse): QueryActionsByAddressResponseProtoMsg {
    return {
      typeUrl: "/warden.intent.QueryActionsByAddressResponse",
      value: QueryActionsByAddressResponse.encode(message).finish()
    };
  }
};
function createBaseQueryActionByIdRequest(): QueryActionByIdRequest {
  return {
    id: Long.UZERO
  };
}
export const QueryActionByIdRequest = {
  typeUrl: "/warden.intent.QueryActionByIdRequest",
  encode(message: QueryActionByIdRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryActionByIdRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryActionByIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = (reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryActionByIdRequest {
    return {
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO
    };
  },
  toJSON(message: QueryActionByIdRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString());
    return obj;
  },
  fromPartial(object: Partial<QueryActionByIdRequest>): QueryActionByIdRequest {
    const message = createBaseQueryActionByIdRequest();
    message.id = object.id !== undefined && object.id !== null ? Long.fromValue(object.id) : Long.UZERO;
    return message;
  },
  fromAmino(object: QueryActionByIdRequestAmino): QueryActionByIdRequest {
    const message = createBaseQueryActionByIdRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = Long.fromString(object.id);
    }
    return message;
  },
  toAmino(message: QueryActionByIdRequest): QueryActionByIdRequestAmino {
    const obj: any = {};
    obj.id = !message.id.isZero() ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryActionByIdRequestAminoMsg): QueryActionByIdRequest {
    return QueryActionByIdRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryActionByIdRequestProtoMsg): QueryActionByIdRequest {
    return QueryActionByIdRequest.decode(message.value);
  },
  toProto(message: QueryActionByIdRequest): Uint8Array {
    return QueryActionByIdRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryActionByIdRequest): QueryActionByIdRequestProtoMsg {
    return {
      typeUrl: "/warden.intent.QueryActionByIdRequest",
      value: QueryActionByIdRequest.encode(message).finish()
    };
  }
};
function createBaseQueryActionByIdResponse(): QueryActionByIdResponse {
  return {
    action: undefined
  };
}
export const QueryActionByIdResponse = {
  typeUrl: "/warden.intent.QueryActionByIdResponse",
  encode(message: QueryActionByIdResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.action !== undefined) {
      Action.encode(message.action, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryActionByIdResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryActionByIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.action = Action.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryActionByIdResponse {
    return {
      action: isSet(object.action) ? Action.fromJSON(object.action) : undefined
    };
  },
  toJSON(message: QueryActionByIdResponse): unknown {
    const obj: any = {};
    message.action !== undefined && (obj.action = message.action ? Action.toJSON(message.action) : undefined);
    return obj;
  },
  fromPartial(object: Partial<QueryActionByIdResponse>): QueryActionByIdResponse {
    const message = createBaseQueryActionByIdResponse();
    message.action = object.action !== undefined && object.action !== null ? Action.fromPartial(object.action) : undefined;
    return message;
  },
  fromAmino(object: QueryActionByIdResponseAmino): QueryActionByIdResponse {
    const message = createBaseQueryActionByIdResponse();
    if (object.action !== undefined && object.action !== null) {
      message.action = Action.fromAmino(object.action);
    }
    return message;
  },
  toAmino(message: QueryActionByIdResponse): QueryActionByIdResponseAmino {
    const obj: any = {};
    obj.action = message.action ? Action.toAmino(message.action) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryActionByIdResponseAminoMsg): QueryActionByIdResponse {
    return QueryActionByIdResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryActionByIdResponseProtoMsg): QueryActionByIdResponse {
    return QueryActionByIdResponse.decode(message.value);
  },
  toProto(message: QueryActionByIdResponse): Uint8Array {
    return QueryActionByIdResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryActionByIdResponse): QueryActionByIdResponseProtoMsg {
    return {
      typeUrl: "/warden.intent.QueryActionByIdResponse",
      value: QueryActionByIdResponse.encode(message).finish()
    };
  }
};