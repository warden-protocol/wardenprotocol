//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../../cosmos/base/query/v1beta1/pagination.js";
import { ActionStatus, Action, ActionAmino, ActionSDKType, actionStatusFromJSON, actionStatusToJSON } from "./action.js";
import { Params, ParamsAmino, ParamsSDKType } from "./params.js";
import { Template, TemplateAmino, TemplateSDKType } from "./template.js";
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { JsonSafe } from "../../../json-safe.js";
import { isSet } from "../../../helpers.js";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/warden.act.v1beta1.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/warden.act.v1beta1.QueryParamsRequest";
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
  typeUrl: "/warden.act.v1beta1.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params holds all the parameters of this module. */
  params?: ParamsAmino;
}
export interface QueryParamsResponseAminoMsg {
  type: "/warden.act.v1beta1.QueryParamsResponse";
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
  typeUrl: "/warden.act.v1beta1.QueryActionsRequest";
  value: Uint8Array;
}
export interface QueryActionsRequestAmino {
  pagination?: PageRequestAmino;
}
export interface QueryActionsRequestAminoMsg {
  type: "/warden.act.v1beta1.QueryActionsRequest";
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
  typeUrl: "/warden.act.v1beta1.QueryActionsResponse";
  value: Uint8Array;
}
export interface QueryActionsResponseAmino {
  pagination?: PageResponseAmino;
  actions?: ActionAmino[];
}
export interface QueryActionsResponseAminoMsg {
  type: "/warden.act.v1beta1.QueryActionsResponse";
  value: QueryActionsResponseAmino;
}
export interface QueryActionsResponseSDKType {
  pagination?: PageResponseSDKType;
  actions: ActionSDKType[];
}
export interface QueryTemplatesRequest {
  pagination?: PageRequest;
  creator?: string;
}
export interface QueryTemplatesRequestProtoMsg {
  typeUrl: "/warden.act.v1beta1.QueryTemplatesRequest";
  value: Uint8Array;
}
export interface QueryTemplatesRequestAmino {
  pagination?: PageRequestAmino;
  creator?: string;
}
export interface QueryTemplatesRequestAminoMsg {
  type: "/warden.act.v1beta1.QueryTemplatesRequest";
  value: QueryTemplatesRequestAmino;
}
export interface QueryTemplatesRequestSDKType {
  pagination?: PageRequestSDKType;
  creator?: string;
}
export interface QueryTemplatesResponse {
  pagination?: PageResponse;
  templates: Template[];
}
export interface QueryTemplatesResponseProtoMsg {
  typeUrl: "/warden.act.v1beta1.QueryTemplatesResponse";
  value: Uint8Array;
}
export interface QueryTemplatesResponseAmino {
  pagination?: PageResponseAmino;
  templates?: TemplateAmino[];
}
export interface QueryTemplatesResponseAminoMsg {
  type: "/warden.act.v1beta1.QueryTemplatesResponse";
  value: QueryTemplatesResponseAmino;
}
export interface QueryTemplatesResponseSDKType {
  pagination?: PageResponseSDKType;
  templates: TemplateSDKType[];
}
export interface QuerySimulateTemplateRequest {
  pagination?: PageRequest;
  definition: string;
}
export interface QuerySimulateTemplateRequestProtoMsg {
  typeUrl: "/warden.act.v1beta1.QuerySimulateTemplateRequest";
  value: Uint8Array;
}
export interface QuerySimulateTemplateRequestAmino {
  pagination?: PageRequestAmino;
  definition?: string;
}
export interface QuerySimulateTemplateRequestAminoMsg {
  type: "/warden.act.v1beta1.QuerySimulateTemplateRequest";
  value: QuerySimulateTemplateRequestAmino;
}
export interface QuerySimulateTemplateRequestSDKType {
  pagination?: PageRequestSDKType;
  definition: string;
}
export interface QuerySimulateTemplateResponse {
  evaluation: string;
}
export interface QuerySimulateTemplateResponseProtoMsg {
  typeUrl: "/warden.act.v1beta1.QuerySimulateTemplateResponse";
  value: Uint8Array;
}
export interface QuerySimulateTemplateResponseAmino {
  evaluation?: string;
}
export interface QuerySimulateTemplateResponseAminoMsg {
  type: "/warden.act.v1beta1.QuerySimulateTemplateResponse";
  value: QuerySimulateTemplateResponseAmino;
}
export interface QuerySimulateTemplateResponseSDKType {
  evaluation: string;
}
export interface QueryTemplateByIdRequest {
  id: bigint;
}
export interface QueryTemplateByIdRequestProtoMsg {
  typeUrl: "/warden.act.v1beta1.QueryTemplateByIdRequest";
  value: Uint8Array;
}
export interface QueryTemplateByIdRequestAmino {
  id?: string;
}
export interface QueryTemplateByIdRequestAminoMsg {
  type: "/warden.act.v1beta1.QueryTemplateByIdRequest";
  value: QueryTemplateByIdRequestAmino;
}
export interface QueryTemplateByIdRequestSDKType {
  id: bigint;
}
export interface QueryTemplateByIdResponse {
  template?: Template;
}
export interface QueryTemplateByIdResponseProtoMsg {
  typeUrl: "/warden.act.v1beta1.QueryTemplateByIdResponse";
  value: Uint8Array;
}
export interface QueryTemplateByIdResponseAmino {
  template?: TemplateAmino;
}
export interface QueryTemplateByIdResponseAminoMsg {
  type: "/warden.act.v1beta1.QueryTemplateByIdResponse";
  value: QueryTemplateByIdResponseAmino;
}
export interface QueryTemplateByIdResponseSDKType {
  template?: TemplateSDKType;
}
export interface QueryActionsByAddressRequest {
  pagination?: PageRequest;
  address: string;
  status?: ActionStatus;
}
export interface QueryActionsByAddressRequestProtoMsg {
  typeUrl: "/warden.act.v1beta1.QueryActionsByAddressRequest";
  value: Uint8Array;
}
export interface QueryActionsByAddressRequestAmino {
  pagination?: PageRequestAmino;
  address?: string;
  status?: ActionStatus;
}
export interface QueryActionsByAddressRequestAminoMsg {
  type: "/warden.act.v1beta1.QueryActionsByAddressRequest";
  value: QueryActionsByAddressRequestAmino;
}
export interface QueryActionsByAddressRequestSDKType {
  pagination?: PageRequestSDKType;
  address: string;
  status?: ActionStatus;
}
export interface QueryActionsByAddressResponse {
  pagination?: PageResponse;
  actions: Action[];
}
export interface QueryActionsByAddressResponseProtoMsg {
  typeUrl: "/warden.act.v1beta1.QueryActionsByAddressResponse";
  value: Uint8Array;
}
export interface QueryActionsByAddressResponseAmino {
  pagination?: PageResponseAmino;
  actions?: ActionAmino[];
}
export interface QueryActionsByAddressResponseAminoMsg {
  type: "/warden.act.v1beta1.QueryActionsByAddressResponse";
  value: QueryActionsByAddressResponseAmino;
}
export interface QueryActionsByAddressResponseSDKType {
  pagination?: PageResponseSDKType;
  actions: ActionSDKType[];
}
export interface QueryActionByIdRequest {
  id: bigint;
}
export interface QueryActionByIdRequestProtoMsg {
  typeUrl: "/warden.act.v1beta1.QueryActionByIdRequest";
  value: Uint8Array;
}
export interface QueryActionByIdRequestAmino {
  id?: string;
}
export interface QueryActionByIdRequestAminoMsg {
  type: "/warden.act.v1beta1.QueryActionByIdRequest";
  value: QueryActionByIdRequestAmino;
}
export interface QueryActionByIdRequestSDKType {
  id: bigint;
}
export interface QueryActionByIdResponse {
  action?: Action;
}
export interface QueryActionByIdResponseProtoMsg {
  typeUrl: "/warden.act.v1beta1.QueryActionByIdResponse";
  value: Uint8Array;
}
export interface QueryActionByIdResponseAmino {
  action?: ActionAmino;
}
export interface QueryActionByIdResponseAminoMsg {
  type: "/warden.act.v1beta1.QueryActionByIdResponse";
  value: QueryActionByIdResponseAmino;
}
export interface QueryActionByIdResponseSDKType {
  action?: ActionSDKType;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/warden.act.v1beta1.QueryParamsRequest",
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
      typeUrl: "/warden.act.v1beta1.QueryParamsRequest",
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
  typeUrl: "/warden.act.v1beta1.QueryParamsResponse",
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
      typeUrl: "/warden.act.v1beta1.QueryParamsResponse",
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
  typeUrl: "/warden.act.v1beta1.QueryActionsRequest",
  encode(message: QueryActionsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryActionsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
  toJSON(message: QueryActionsRequest): JsonSafe<QueryActionsRequest> {
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
      typeUrl: "/warden.act.v1beta1.QueryActionsRequest",
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
  typeUrl: "/warden.act.v1beta1.QueryActionsResponse",
  encode(message: QueryActionsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.actions) {
      Action.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryActionsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
  toJSON(message: QueryActionsResponse): JsonSafe<QueryActionsResponse> {
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
      typeUrl: "/warden.act.v1beta1.QueryActionsResponse",
      value: QueryActionsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryTemplatesRequest(): QueryTemplatesRequest {
  return {
    pagination: undefined,
    creator: undefined
  };
}
export const QueryTemplatesRequest = {
  typeUrl: "/warden.act.v1beta1.QueryTemplatesRequest",
  encode(message: QueryTemplatesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.creator !== undefined) {
      writer.uint32(18).string(message.creator);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryTemplatesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTemplatesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.creator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryTemplatesRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      creator: isSet(object.creator) ? String(object.creator) : undefined
    };
  },
  toJSON(message: QueryTemplatesRequest): JsonSafe<QueryTemplatesRequest> {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    message.creator !== undefined && (obj.creator = message.creator);
    return obj;
  },
  fromPartial(object: Partial<QueryTemplatesRequest>): QueryTemplatesRequest {
    const message = createBaseQueryTemplatesRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    message.creator = object.creator ?? undefined;
    return message;
  },
  fromAmino(object: QueryTemplatesRequestAmino): QueryTemplatesRequest {
    const message = createBaseQueryTemplatesRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    return message;
  },
  toAmino(message: QueryTemplatesRequest): QueryTemplatesRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    obj.creator = message.creator === null ? undefined : message.creator;
    return obj;
  },
  fromAminoMsg(object: QueryTemplatesRequestAminoMsg): QueryTemplatesRequest {
    return QueryTemplatesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryTemplatesRequestProtoMsg): QueryTemplatesRequest {
    return QueryTemplatesRequest.decode(message.value);
  },
  toProto(message: QueryTemplatesRequest): Uint8Array {
    return QueryTemplatesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryTemplatesRequest): QueryTemplatesRequestProtoMsg {
    return {
      typeUrl: "/warden.act.v1beta1.QueryTemplatesRequest",
      value: QueryTemplatesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryTemplatesResponse(): QueryTemplatesResponse {
  return {
    pagination: undefined,
    templates: []
  };
}
export const QueryTemplatesResponse = {
  typeUrl: "/warden.act.v1beta1.QueryTemplatesResponse",
  encode(message: QueryTemplatesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.templates) {
      Template.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryTemplatesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTemplatesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        case 2:
          message.templates.push(Template.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryTemplatesResponse {
    return {
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      templates: Array.isArray(object?.templates) ? object.templates.map((e: any) => Template.fromJSON(e)) : []
    };
  },
  toJSON(message: QueryTemplatesResponse): JsonSafe<QueryTemplatesResponse> {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    if (message.templates) {
      obj.templates = message.templates.map(e => e ? Template.toJSON(e) : undefined);
    } else {
      obj.templates = [];
    }
    return obj;
  },
  fromPartial(object: Partial<QueryTemplatesResponse>): QueryTemplatesResponse {
    const message = createBaseQueryTemplatesResponse();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    message.templates = object.templates?.map(e => Template.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryTemplatesResponseAmino): QueryTemplatesResponse {
    const message = createBaseQueryTemplatesResponse();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    message.templates = object.templates?.map(e => Template.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryTemplatesResponse): QueryTemplatesResponseAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    if (message.templates) {
      obj.templates = message.templates.map(e => e ? Template.toAmino(e) : undefined);
    } else {
      obj.templates = message.templates;
    }
    return obj;
  },
  fromAminoMsg(object: QueryTemplatesResponseAminoMsg): QueryTemplatesResponse {
    return QueryTemplatesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryTemplatesResponseProtoMsg): QueryTemplatesResponse {
    return QueryTemplatesResponse.decode(message.value);
  },
  toProto(message: QueryTemplatesResponse): Uint8Array {
    return QueryTemplatesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryTemplatesResponse): QueryTemplatesResponseProtoMsg {
    return {
      typeUrl: "/warden.act.v1beta1.QueryTemplatesResponse",
      value: QueryTemplatesResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySimulateTemplateRequest(): QuerySimulateTemplateRequest {
  return {
    pagination: undefined,
    definition: ""
  };
}
export const QuerySimulateTemplateRequest = {
  typeUrl: "/warden.act.v1beta1.QuerySimulateTemplateRequest",
  encode(message: QuerySimulateTemplateRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.definition !== "") {
      writer.uint32(18).string(message.definition);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySimulateTemplateRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySimulateTemplateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.definition = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QuerySimulateTemplateRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      definition: isSet(object.definition) ? String(object.definition) : ""
    };
  },
  toJSON(message: QuerySimulateTemplateRequest): JsonSafe<QuerySimulateTemplateRequest> {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    message.definition !== undefined && (obj.definition = message.definition);
    return obj;
  },
  fromPartial(object: Partial<QuerySimulateTemplateRequest>): QuerySimulateTemplateRequest {
    const message = createBaseQuerySimulateTemplateRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    message.definition = object.definition ?? "";
    return message;
  },
  fromAmino(object: QuerySimulateTemplateRequestAmino): QuerySimulateTemplateRequest {
    const message = createBaseQuerySimulateTemplateRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    if (object.definition !== undefined && object.definition !== null) {
      message.definition = object.definition;
    }
    return message;
  },
  toAmino(message: QuerySimulateTemplateRequest): QuerySimulateTemplateRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    obj.definition = message.definition === "" ? undefined : message.definition;
    return obj;
  },
  fromAminoMsg(object: QuerySimulateTemplateRequestAminoMsg): QuerySimulateTemplateRequest {
    return QuerySimulateTemplateRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySimulateTemplateRequestProtoMsg): QuerySimulateTemplateRequest {
    return QuerySimulateTemplateRequest.decode(message.value);
  },
  toProto(message: QuerySimulateTemplateRequest): Uint8Array {
    return QuerySimulateTemplateRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySimulateTemplateRequest): QuerySimulateTemplateRequestProtoMsg {
    return {
      typeUrl: "/warden.act.v1beta1.QuerySimulateTemplateRequest",
      value: QuerySimulateTemplateRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySimulateTemplateResponse(): QuerySimulateTemplateResponse {
  return {
    evaluation: ""
  };
}
export const QuerySimulateTemplateResponse = {
  typeUrl: "/warden.act.v1beta1.QuerySimulateTemplateResponse",
  encode(message: QuerySimulateTemplateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.evaluation !== "") {
      writer.uint32(10).string(message.evaluation);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySimulateTemplateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySimulateTemplateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.evaluation = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QuerySimulateTemplateResponse {
    return {
      evaluation: isSet(object.evaluation) ? String(object.evaluation) : ""
    };
  },
  toJSON(message: QuerySimulateTemplateResponse): JsonSafe<QuerySimulateTemplateResponse> {
    const obj: any = {};
    message.evaluation !== undefined && (obj.evaluation = message.evaluation);
    return obj;
  },
  fromPartial(object: Partial<QuerySimulateTemplateResponse>): QuerySimulateTemplateResponse {
    const message = createBaseQuerySimulateTemplateResponse();
    message.evaluation = object.evaluation ?? "";
    return message;
  },
  fromAmino(object: QuerySimulateTemplateResponseAmino): QuerySimulateTemplateResponse {
    const message = createBaseQuerySimulateTemplateResponse();
    if (object.evaluation !== undefined && object.evaluation !== null) {
      message.evaluation = object.evaluation;
    }
    return message;
  },
  toAmino(message: QuerySimulateTemplateResponse): QuerySimulateTemplateResponseAmino {
    const obj: any = {};
    obj.evaluation = message.evaluation === "" ? undefined : message.evaluation;
    return obj;
  },
  fromAminoMsg(object: QuerySimulateTemplateResponseAminoMsg): QuerySimulateTemplateResponse {
    return QuerySimulateTemplateResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySimulateTemplateResponseProtoMsg): QuerySimulateTemplateResponse {
    return QuerySimulateTemplateResponse.decode(message.value);
  },
  toProto(message: QuerySimulateTemplateResponse): Uint8Array {
    return QuerySimulateTemplateResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySimulateTemplateResponse): QuerySimulateTemplateResponseProtoMsg {
    return {
      typeUrl: "/warden.act.v1beta1.QuerySimulateTemplateResponse",
      value: QuerySimulateTemplateResponse.encode(message).finish()
    };
  }
};
function createBaseQueryTemplateByIdRequest(): QueryTemplateByIdRequest {
  return {
    id: BigInt(0)
  };
}
export const QueryTemplateByIdRequest = {
  typeUrl: "/warden.act.v1beta1.QueryTemplateByIdRequest",
  encode(message: QueryTemplateByIdRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryTemplateByIdRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTemplateByIdRequest();
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
  fromJSON(object: any): QueryTemplateByIdRequest {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0)
    };
  },
  toJSON(message: QueryTemplateByIdRequest): JsonSafe<QueryTemplateByIdRequest> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<QueryTemplateByIdRequest>): QueryTemplateByIdRequest {
    const message = createBaseQueryTemplateByIdRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryTemplateByIdRequestAmino): QueryTemplateByIdRequest {
    const message = createBaseQueryTemplateByIdRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: QueryTemplateByIdRequest): QueryTemplateByIdRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? (message.id?.toString)() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryTemplateByIdRequestAminoMsg): QueryTemplateByIdRequest {
    return QueryTemplateByIdRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryTemplateByIdRequestProtoMsg): QueryTemplateByIdRequest {
    return QueryTemplateByIdRequest.decode(message.value);
  },
  toProto(message: QueryTemplateByIdRequest): Uint8Array {
    return QueryTemplateByIdRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryTemplateByIdRequest): QueryTemplateByIdRequestProtoMsg {
    return {
      typeUrl: "/warden.act.v1beta1.QueryTemplateByIdRequest",
      value: QueryTemplateByIdRequest.encode(message).finish()
    };
  }
};
function createBaseQueryTemplateByIdResponse(): QueryTemplateByIdResponse {
  return {
    template: undefined
  };
}
export const QueryTemplateByIdResponse = {
  typeUrl: "/warden.act.v1beta1.QueryTemplateByIdResponse",
  encode(message: QueryTemplateByIdResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.template !== undefined) {
      Template.encode(message.template, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryTemplateByIdResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTemplateByIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.template = Template.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryTemplateByIdResponse {
    return {
      template: isSet(object.template) ? Template.fromJSON(object.template) : undefined
    };
  },
  toJSON(message: QueryTemplateByIdResponse): JsonSafe<QueryTemplateByIdResponse> {
    const obj: any = {};
    message.template !== undefined && (obj.template = message.template ? Template.toJSON(message.template) : undefined);
    return obj;
  },
  fromPartial(object: Partial<QueryTemplateByIdResponse>): QueryTemplateByIdResponse {
    const message = createBaseQueryTemplateByIdResponse();
    message.template = object.template !== undefined && object.template !== null ? Template.fromPartial(object.template) : undefined;
    return message;
  },
  fromAmino(object: QueryTemplateByIdResponseAmino): QueryTemplateByIdResponse {
    const message = createBaseQueryTemplateByIdResponse();
    if (object.template !== undefined && object.template !== null) {
      message.template = Template.fromAmino(object.template);
    }
    return message;
  },
  toAmino(message: QueryTemplateByIdResponse): QueryTemplateByIdResponseAmino {
    const obj: any = {};
    obj.template = message.template ? Template.toAmino(message.template) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryTemplateByIdResponseAminoMsg): QueryTemplateByIdResponse {
    return QueryTemplateByIdResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryTemplateByIdResponseProtoMsg): QueryTemplateByIdResponse {
    return QueryTemplateByIdResponse.decode(message.value);
  },
  toProto(message: QueryTemplateByIdResponse): Uint8Array {
    return QueryTemplateByIdResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryTemplateByIdResponse): QueryTemplateByIdResponseProtoMsg {
    return {
      typeUrl: "/warden.act.v1beta1.QueryTemplateByIdResponse",
      value: QueryTemplateByIdResponse.encode(message).finish()
    };
  }
};
function createBaseQueryActionsByAddressRequest(): QueryActionsByAddressRequest {
  return {
    pagination: undefined,
    address: "",
    status: undefined
  };
}
export const QueryActionsByAddressRequest = {
  typeUrl: "/warden.act.v1beta1.QueryActionsByAddressRequest",
  encode(message: QueryActionsByAddressRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (message.status !== undefined) {
      writer.uint32(24).int32(message.status);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryActionsByAddressRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
          message.status = reader.int32() as any;
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
      status: isSet(object.status) ? actionStatusFromJSON(object.status) : undefined
    };
  },
  toJSON(message: QueryActionsByAddressRequest): JsonSafe<QueryActionsByAddressRequest> {
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
    message.status = object.status ?? undefined;
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
    obj.status = message.status === null ? undefined : message.status;
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
      typeUrl: "/warden.act.v1beta1.QueryActionsByAddressRequest",
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
  typeUrl: "/warden.act.v1beta1.QueryActionsByAddressResponse",
  encode(message: QueryActionsByAddressResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.actions) {
      Action.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryActionsByAddressResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
  toJSON(message: QueryActionsByAddressResponse): JsonSafe<QueryActionsByAddressResponse> {
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
      typeUrl: "/warden.act.v1beta1.QueryActionsByAddressResponse",
      value: QueryActionsByAddressResponse.encode(message).finish()
    };
  }
};
function createBaseQueryActionByIdRequest(): QueryActionByIdRequest {
  return {
    id: BigInt(0)
  };
}
export const QueryActionByIdRequest = {
  typeUrl: "/warden.act.v1beta1.QueryActionByIdRequest",
  encode(message: QueryActionByIdRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryActionByIdRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryActionByIdRequest();
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
  fromJSON(object: any): QueryActionByIdRequest {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0)
    };
  },
  toJSON(message: QueryActionByIdRequest): JsonSafe<QueryActionByIdRequest> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<QueryActionByIdRequest>): QueryActionByIdRequest {
    const message = createBaseQueryActionByIdRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryActionByIdRequestAmino): QueryActionByIdRequest {
    const message = createBaseQueryActionByIdRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: QueryActionByIdRequest): QueryActionByIdRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? (message.id?.toString)() : undefined;
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
      typeUrl: "/warden.act.v1beta1.QueryActionByIdRequest",
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
  typeUrl: "/warden.act.v1beta1.QueryActionByIdResponse",
  encode(message: QueryActionByIdResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.action !== undefined) {
      Action.encode(message.action, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryActionByIdResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
  toJSON(message: QueryActionByIdResponse): JsonSafe<QueryActionByIdResponse> {
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
      typeUrl: "/warden.act.v1beta1.QueryActionByIdResponse",
      value: QueryActionByIdResponse.encode(message).finish()
    };
  }
};