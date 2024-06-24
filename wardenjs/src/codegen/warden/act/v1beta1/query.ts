//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../../cosmos/base/query/v1beta1/pagination.js";
import { ActionStatus, Action, ActionAmino, ActionSDKType, actionStatusFromJSON, actionStatusToJSON } from "./action.js";
import { Params, ParamsAmino, ParamsSDKType } from "./params.js";
import { Rule, RuleAmino, RuleSDKType } from "./rule.js";
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
export interface QueryRulesRequest {
  pagination?: PageRequest;
}
export interface QueryRulesRequestProtoMsg {
  typeUrl: "/warden.act.v1beta1.QueryRulesRequest";
  value: Uint8Array;
}
export interface QueryRulesRequestAmino {
  pagination?: PageRequestAmino;
}
export interface QueryRulesRequestAminoMsg {
  type: "/warden.act.v1beta1.QueryRulesRequest";
  value: QueryRulesRequestAmino;
}
export interface QueryRulesRequestSDKType {
  pagination?: PageRequestSDKType;
}
export interface QueryRulesResponse {
  pagination?: PageResponse;
  rules: Rule[];
}
export interface QueryRulesResponseProtoMsg {
  typeUrl: "/warden.act.v1beta1.QueryRulesResponse";
  value: Uint8Array;
}
export interface QueryRulesResponseAmino {
  pagination?: PageResponseAmino;
  rules?: RuleAmino[];
}
export interface QueryRulesResponseAminoMsg {
  type: "/warden.act.v1beta1.QueryRulesResponse";
  value: QueryRulesResponseAmino;
}
export interface QueryRulesResponseSDKType {
  pagination?: PageResponseSDKType;
  rules: RuleSDKType[];
}
export interface QuerySimulateRuleRequest {
  pagination?: PageRequest;
  definition: string;
}
export interface QuerySimulateRuleRequestProtoMsg {
  typeUrl: "/warden.act.v1beta1.QuerySimulateRuleRequest";
  value: Uint8Array;
}
export interface QuerySimulateRuleRequestAmino {
  pagination?: PageRequestAmino;
  definition?: string;
}
export interface QuerySimulateRuleRequestAminoMsg {
  type: "/warden.act.v1beta1.QuerySimulateRuleRequest";
  value: QuerySimulateRuleRequestAmino;
}
export interface QuerySimulateRuleRequestSDKType {
  pagination?: PageRequestSDKType;
  definition: string;
}
export interface QuerySimulateRuleResponse {
  evaluation: string;
}
export interface QuerySimulateRuleResponseProtoMsg {
  typeUrl: "/warden.act.v1beta1.QuerySimulateRuleResponse";
  value: Uint8Array;
}
export interface QuerySimulateRuleResponseAmino {
  evaluation?: string;
}
export interface QuerySimulateRuleResponseAminoMsg {
  type: "/warden.act.v1beta1.QuerySimulateRuleResponse";
  value: QuerySimulateRuleResponseAmino;
}
export interface QuerySimulateRuleResponseSDKType {
  evaluation: string;
}
export interface QueryRuleByIdRequest {
  id: bigint;
}
export interface QueryRuleByIdRequestProtoMsg {
  typeUrl: "/warden.act.v1beta1.QueryRuleByIdRequest";
  value: Uint8Array;
}
export interface QueryRuleByIdRequestAmino {
  id?: string;
}
export interface QueryRuleByIdRequestAminoMsg {
  type: "/warden.act.v1beta1.QueryRuleByIdRequest";
  value: QueryRuleByIdRequestAmino;
}
export interface QueryRuleByIdRequestSDKType {
  id: bigint;
}
export interface QueryRuleByIdResponse {
  rule?: Rule;
}
export interface QueryRuleByIdResponseProtoMsg {
  typeUrl: "/warden.act.v1beta1.QueryRuleByIdResponse";
  value: Uint8Array;
}
export interface QueryRuleByIdResponseAmino {
  rule?: RuleAmino;
}
export interface QueryRuleByIdResponseAminoMsg {
  type: "/warden.act.v1beta1.QueryRuleByIdResponse";
  value: QueryRuleByIdResponseAmino;
}
export interface QueryRuleByIdResponseSDKType {
  rule?: RuleSDKType;
}
export interface QueryActionsByAddressRequest {
  pagination?: PageRequest;
  address: string;
  status: ActionStatus;
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
  status: ActionStatus;
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
function createBaseQueryRulesRequest(): QueryRulesRequest {
  return {
    pagination: undefined
  };
}
export const QueryRulesRequest = {
  typeUrl: "/warden.act.v1beta1.QueryRulesRequest",
  encode(message: QueryRulesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryRulesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRulesRequest();
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
  fromJSON(object: any): QueryRulesRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined
    };
  },
  toJSON(message: QueryRulesRequest): JsonSafe<QueryRulesRequest> {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial(object: Partial<QueryRulesRequest>): QueryRulesRequest {
    const message = createBaseQueryRulesRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryRulesRequestAmino): QueryRulesRequest {
    const message = createBaseQueryRulesRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryRulesRequest): QueryRulesRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryRulesRequestAminoMsg): QueryRulesRequest {
    return QueryRulesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRulesRequestProtoMsg): QueryRulesRequest {
    return QueryRulesRequest.decode(message.value);
  },
  toProto(message: QueryRulesRequest): Uint8Array {
    return QueryRulesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryRulesRequest): QueryRulesRequestProtoMsg {
    return {
      typeUrl: "/warden.act.v1beta1.QueryRulesRequest",
      value: QueryRulesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryRulesResponse(): QueryRulesResponse {
  return {
    pagination: undefined,
    rules: []
  };
}
export const QueryRulesResponse = {
  typeUrl: "/warden.act.v1beta1.QueryRulesResponse",
  encode(message: QueryRulesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.rules) {
      Rule.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryRulesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRulesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        case 2:
          message.rules.push(Rule.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryRulesResponse {
    return {
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      rules: Array.isArray(object?.rules) ? object.rules.map((e: any) => Rule.fromJSON(e)) : []
    };
  },
  toJSON(message: QueryRulesResponse): JsonSafe<QueryRulesResponse> {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    if (message.rules) {
      obj.rules = message.rules.map(e => e ? Rule.toJSON(e) : undefined);
    } else {
      obj.rules = [];
    }
    return obj;
  },
  fromPartial(object: Partial<QueryRulesResponse>): QueryRulesResponse {
    const message = createBaseQueryRulesResponse();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    message.rules = object.rules?.map(e => Rule.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryRulesResponseAmino): QueryRulesResponse {
    const message = createBaseQueryRulesResponse();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    message.rules = object.rules?.map(e => Rule.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryRulesResponse): QueryRulesResponseAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    if (message.rules) {
      obj.rules = message.rules.map(e => e ? Rule.toAmino(e) : undefined);
    } else {
      obj.rules = message.rules;
    }
    return obj;
  },
  fromAminoMsg(object: QueryRulesResponseAminoMsg): QueryRulesResponse {
    return QueryRulesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRulesResponseProtoMsg): QueryRulesResponse {
    return QueryRulesResponse.decode(message.value);
  },
  toProto(message: QueryRulesResponse): Uint8Array {
    return QueryRulesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryRulesResponse): QueryRulesResponseProtoMsg {
    return {
      typeUrl: "/warden.act.v1beta1.QueryRulesResponse",
      value: QueryRulesResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySimulateRuleRequest(): QuerySimulateRuleRequest {
  return {
    pagination: undefined,
    definition: ""
  };
}
export const QuerySimulateRuleRequest = {
  typeUrl: "/warden.act.v1beta1.QuerySimulateRuleRequest",
  encode(message: QuerySimulateRuleRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.definition !== "") {
      writer.uint32(18).string(message.definition);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySimulateRuleRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySimulateRuleRequest();
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
  fromJSON(object: any): QuerySimulateRuleRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      definition: isSet(object.definition) ? String(object.definition) : ""
    };
  },
  toJSON(message: QuerySimulateRuleRequest): JsonSafe<QuerySimulateRuleRequest> {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    message.definition !== undefined && (obj.definition = message.definition);
    return obj;
  },
  fromPartial(object: Partial<QuerySimulateRuleRequest>): QuerySimulateRuleRequest {
    const message = createBaseQuerySimulateRuleRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    message.definition = object.definition ?? "";
    return message;
  },
  fromAmino(object: QuerySimulateRuleRequestAmino): QuerySimulateRuleRequest {
    const message = createBaseQuerySimulateRuleRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    if (object.definition !== undefined && object.definition !== null) {
      message.definition = object.definition;
    }
    return message;
  },
  toAmino(message: QuerySimulateRuleRequest): QuerySimulateRuleRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    obj.definition = message.definition === "" ? undefined : message.definition;
    return obj;
  },
  fromAminoMsg(object: QuerySimulateRuleRequestAminoMsg): QuerySimulateRuleRequest {
    return QuerySimulateRuleRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySimulateRuleRequestProtoMsg): QuerySimulateRuleRequest {
    return QuerySimulateRuleRequest.decode(message.value);
  },
  toProto(message: QuerySimulateRuleRequest): Uint8Array {
    return QuerySimulateRuleRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySimulateRuleRequest): QuerySimulateRuleRequestProtoMsg {
    return {
      typeUrl: "/warden.act.v1beta1.QuerySimulateRuleRequest",
      value: QuerySimulateRuleRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySimulateRuleResponse(): QuerySimulateRuleResponse {
  return {
    evaluation: ""
  };
}
export const QuerySimulateRuleResponse = {
  typeUrl: "/warden.act.v1beta1.QuerySimulateRuleResponse",
  encode(message: QuerySimulateRuleResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.evaluation !== "") {
      writer.uint32(10).string(message.evaluation);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySimulateRuleResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySimulateRuleResponse();
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
  fromJSON(object: any): QuerySimulateRuleResponse {
    return {
      evaluation: isSet(object.evaluation) ? String(object.evaluation) : ""
    };
  },
  toJSON(message: QuerySimulateRuleResponse): JsonSafe<QuerySimulateRuleResponse> {
    const obj: any = {};
    message.evaluation !== undefined && (obj.evaluation = message.evaluation);
    return obj;
  },
  fromPartial(object: Partial<QuerySimulateRuleResponse>): QuerySimulateRuleResponse {
    const message = createBaseQuerySimulateRuleResponse();
    message.evaluation = object.evaluation ?? "";
    return message;
  },
  fromAmino(object: QuerySimulateRuleResponseAmino): QuerySimulateRuleResponse {
    const message = createBaseQuerySimulateRuleResponse();
    if (object.evaluation !== undefined && object.evaluation !== null) {
      message.evaluation = object.evaluation;
    }
    return message;
  },
  toAmino(message: QuerySimulateRuleResponse): QuerySimulateRuleResponseAmino {
    const obj: any = {};
    obj.evaluation = message.evaluation === "" ? undefined : message.evaluation;
    return obj;
  },
  fromAminoMsg(object: QuerySimulateRuleResponseAminoMsg): QuerySimulateRuleResponse {
    return QuerySimulateRuleResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySimulateRuleResponseProtoMsg): QuerySimulateRuleResponse {
    return QuerySimulateRuleResponse.decode(message.value);
  },
  toProto(message: QuerySimulateRuleResponse): Uint8Array {
    return QuerySimulateRuleResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySimulateRuleResponse): QuerySimulateRuleResponseProtoMsg {
    return {
      typeUrl: "/warden.act.v1beta1.QuerySimulateRuleResponse",
      value: QuerySimulateRuleResponse.encode(message).finish()
    };
  }
};
function createBaseQueryRuleByIdRequest(): QueryRuleByIdRequest {
  return {
    id: BigInt(0)
  };
}
export const QueryRuleByIdRequest = {
  typeUrl: "/warden.act.v1beta1.QueryRuleByIdRequest",
  encode(message: QueryRuleByIdRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryRuleByIdRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRuleByIdRequest();
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
  fromJSON(object: any): QueryRuleByIdRequest {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0)
    };
  },
  toJSON(message: QueryRuleByIdRequest): JsonSafe<QueryRuleByIdRequest> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<QueryRuleByIdRequest>): QueryRuleByIdRequest {
    const message = createBaseQueryRuleByIdRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryRuleByIdRequestAmino): QueryRuleByIdRequest {
    const message = createBaseQueryRuleByIdRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: QueryRuleByIdRequest): QueryRuleByIdRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryRuleByIdRequestAminoMsg): QueryRuleByIdRequest {
    return QueryRuleByIdRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRuleByIdRequestProtoMsg): QueryRuleByIdRequest {
    return QueryRuleByIdRequest.decode(message.value);
  },
  toProto(message: QueryRuleByIdRequest): Uint8Array {
    return QueryRuleByIdRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryRuleByIdRequest): QueryRuleByIdRequestProtoMsg {
    return {
      typeUrl: "/warden.act.v1beta1.QueryRuleByIdRequest",
      value: QueryRuleByIdRequest.encode(message).finish()
    };
  }
};
function createBaseQueryRuleByIdResponse(): QueryRuleByIdResponse {
  return {
    rule: undefined
  };
}
export const QueryRuleByIdResponse = {
  typeUrl: "/warden.act.v1beta1.QueryRuleByIdResponse",
  encode(message: QueryRuleByIdResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.rule !== undefined) {
      Rule.encode(message.rule, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryRuleByIdResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRuleByIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rule = Rule.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryRuleByIdResponse {
    return {
      rule: isSet(object.rule) ? Rule.fromJSON(object.rule) : undefined
    };
  },
  toJSON(message: QueryRuleByIdResponse): JsonSafe<QueryRuleByIdResponse> {
    const obj: any = {};
    message.rule !== undefined && (obj.rule = message.rule ? Rule.toJSON(message.rule) : undefined);
    return obj;
  },
  fromPartial(object: Partial<QueryRuleByIdResponse>): QueryRuleByIdResponse {
    const message = createBaseQueryRuleByIdResponse();
    message.rule = object.rule !== undefined && object.rule !== null ? Rule.fromPartial(object.rule) : undefined;
    return message;
  },
  fromAmino(object: QueryRuleByIdResponseAmino): QueryRuleByIdResponse {
    const message = createBaseQueryRuleByIdResponse();
    if (object.rule !== undefined && object.rule !== null) {
      message.rule = Rule.fromAmino(object.rule);
    }
    return message;
  },
  toAmino(message: QueryRuleByIdResponse): QueryRuleByIdResponseAmino {
    const obj: any = {};
    obj.rule = message.rule ? Rule.toAmino(message.rule) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryRuleByIdResponseAminoMsg): QueryRuleByIdResponse {
    return QueryRuleByIdResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRuleByIdResponseProtoMsg): QueryRuleByIdResponse {
    return QueryRuleByIdResponse.decode(message.value);
  },
  toProto(message: QueryRuleByIdResponse): Uint8Array {
    return QueryRuleByIdResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryRuleByIdResponse): QueryRuleByIdResponseProtoMsg {
    return {
      typeUrl: "/warden.act.v1beta1.QueryRuleByIdResponse",
      value: QueryRuleByIdResponse.encode(message).finish()
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
  typeUrl: "/warden.act.v1beta1.QueryActionsByAddressRequest",
  encode(message: QueryActionsByAddressRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
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
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
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