//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../../cosmos/base/query/v1beta1/pagination.js";
import { Params, ParamsAmino, ParamsSDKType } from "./params.js";
import { Future, FutureAmino, FutureSDKType, FutureVote, FutureVoteAmino, FutureVoteSDKType, FutureResult, FutureResultAmino, FutureResultSDKType } from "./future.js";
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { JsonSafe } from "../../../json-safe.js";
import { isSet } from "../../../helpers.js";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/warden.async.v1beta1.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/warden.async.v1beta1.QueryParamsRequest";
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
  typeUrl: "/warden.async.v1beta1.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params holds all the parameters of this module. */
  params?: ParamsAmino;
}
export interface QueryParamsResponseAminoMsg {
  type: "/warden.async.v1beta1.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType;
}
export interface QueryFuturesRequest {
  pagination?: PageRequest;
  /** optional filter to query futures by creator */
  creator?: string;
}
export interface QueryFuturesRequestProtoMsg {
  typeUrl: "/warden.async.v1beta1.QueryFuturesRequest";
  value: Uint8Array;
}
export interface QueryFuturesRequestAmino {
  pagination?: PageRequestAmino;
  /** optional filter to query futures by creator */
  creator?: string;
}
export interface QueryFuturesRequestAminoMsg {
  type: "/warden.async.v1beta1.QueryFuturesRequest";
  value: QueryFuturesRequestAmino;
}
export interface QueryFuturesRequestSDKType {
  pagination?: PageRequestSDKType;
  creator?: string;
}
export interface FutureResponse {
  future: Future;
  votes: FutureVote[];
  result?: FutureResult;
}
export interface FutureResponseProtoMsg {
  typeUrl: "/warden.async.v1beta1.FutureResponse";
  value: Uint8Array;
}
export interface FutureResponseAmino {
  future?: FutureAmino;
  votes?: FutureVoteAmino[];
  result?: FutureResultAmino;
}
export interface FutureResponseAminoMsg {
  type: "/warden.async.v1beta1.FutureResponse";
  value: FutureResponseAmino;
}
export interface FutureResponseSDKType {
  future: FutureSDKType;
  votes: FutureVoteSDKType[];
  result?: FutureResultSDKType;
}
export interface QueryFuturesResponse {
  pagination?: PageResponse;
  futures: FutureResponse[];
}
export interface QueryFuturesResponseProtoMsg {
  typeUrl: "/warden.async.v1beta1.QueryFuturesResponse";
  value: Uint8Array;
}
export interface QueryFuturesResponseAmino {
  pagination?: PageResponseAmino;
  futures?: FutureResponseAmino[];
}
export interface QueryFuturesResponseAminoMsg {
  type: "/warden.async.v1beta1.QueryFuturesResponse";
  value: QueryFuturesResponseAmino;
}
export interface QueryFuturesResponseSDKType {
  pagination?: PageResponseSDKType;
  futures: FutureResponseSDKType[];
}
export interface QueryFutureByIdRequest {
  id: bigint;
}
export interface QueryFutureByIdRequestProtoMsg {
  typeUrl: "/warden.async.v1beta1.QueryFutureByIdRequest";
  value: Uint8Array;
}
export interface QueryFutureByIdRequestAmino {
  id?: string;
}
export interface QueryFutureByIdRequestAminoMsg {
  type: "/warden.async.v1beta1.QueryFutureByIdRequest";
  value: QueryFutureByIdRequestAmino;
}
export interface QueryFutureByIdRequestSDKType {
  id: bigint;
}
export interface QueryFutureByIdResponse {
  futureResponse: FutureResponse;
}
export interface QueryFutureByIdResponseProtoMsg {
  typeUrl: "/warden.async.v1beta1.QueryFutureByIdResponse";
  value: Uint8Array;
}
export interface QueryFutureByIdResponseAmino {
  futureResponse?: FutureResponseAmino;
}
export interface QueryFutureByIdResponseAminoMsg {
  type: "/warden.async.v1beta1.QueryFutureByIdResponse";
  value: QueryFutureByIdResponseAmino;
}
export interface QueryFutureByIdResponseSDKType {
  futureResponse: FutureResponseSDKType;
}
export interface QueryPendingFuturesRequest {
  pagination?: PageRequest;
}
export interface QueryPendingFuturesRequestProtoMsg {
  typeUrl: "/warden.async.v1beta1.QueryPendingFuturesRequest";
  value: Uint8Array;
}
export interface QueryPendingFuturesRequestAmino {
  pagination?: PageRequestAmino;
}
export interface QueryPendingFuturesRequestAminoMsg {
  type: "/warden.async.v1beta1.QueryPendingFuturesRequest";
  value: QueryPendingFuturesRequestAmino;
}
export interface QueryPendingFuturesRequestSDKType {
  pagination?: PageRequestSDKType;
}
export interface QueryPendingFuturesResponse {
  pagination?: PageResponse;
  futures: Future[];
}
export interface QueryPendingFuturesResponseProtoMsg {
  typeUrl: "/warden.async.v1beta1.QueryPendingFuturesResponse";
  value: Uint8Array;
}
export interface QueryPendingFuturesResponseAmino {
  pagination?: PageResponseAmino;
  futures?: FutureAmino[];
}
export interface QueryPendingFuturesResponseAminoMsg {
  type: "/warden.async.v1beta1.QueryPendingFuturesResponse";
  value: QueryPendingFuturesResponseAmino;
}
export interface QueryPendingFuturesResponseSDKType {
  pagination?: PageResponseSDKType;
  futures: FutureSDKType[];
}
export interface QueryHandlersByValidatorRequest {
  pagination?: PageRequest;
  validator: string;
}
export interface QueryHandlersByValidatorRequestProtoMsg {
  typeUrl: "/warden.async.v1beta1.QueryHandlersByValidatorRequest";
  value: Uint8Array;
}
export interface QueryHandlersByValidatorRequestAmino {
  pagination?: PageRequestAmino;
  validator?: string;
}
export interface QueryHandlersByValidatorRequestAminoMsg {
  type: "/warden.async.v1beta1.QueryHandlersByValidatorRequest";
  value: QueryHandlersByValidatorRequestAmino;
}
export interface QueryHandlersByValidatorRequestSDKType {
  pagination?: PageRequestSDKType;
  validator: string;
}
export interface QueryHandlersByValidatorResponse {
  pagination?: PageResponse;
  handlers: string[];
}
export interface QueryHandlersByValidatorResponseProtoMsg {
  typeUrl: "/warden.async.v1beta1.QueryHandlersByValidatorResponse";
  value: Uint8Array;
}
export interface QueryHandlersByValidatorResponseAmino {
  pagination?: PageResponseAmino;
  handlers?: string[];
}
export interface QueryHandlersByValidatorResponseAminoMsg {
  type: "/warden.async.v1beta1.QueryHandlersByValidatorResponse";
  value: QueryHandlersByValidatorResponseAmino;
}
export interface QueryHandlersByValidatorResponseSDKType {
  pagination?: PageResponseSDKType;
  handlers: string[];
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/warden.async.v1beta1.QueryParamsRequest",
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
      typeUrl: "/warden.async.v1beta1.QueryParamsRequest",
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
  typeUrl: "/warden.async.v1beta1.QueryParamsResponse",
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
      typeUrl: "/warden.async.v1beta1.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryFuturesRequest(): QueryFuturesRequest {
  return {
    pagination: undefined,
    creator: undefined
  };
}
export const QueryFuturesRequest = {
  typeUrl: "/warden.async.v1beta1.QueryFuturesRequest",
  encode(message: QueryFuturesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.creator !== undefined) {
      writer.uint32(18).string(message.creator);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryFuturesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFuturesRequest();
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
  fromJSON(object: any): QueryFuturesRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      creator: isSet(object.creator) ? String(object.creator) : undefined
    };
  },
  toJSON(message: QueryFuturesRequest): JsonSafe<QueryFuturesRequest> {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    message.creator !== undefined && (obj.creator = message.creator);
    return obj;
  },
  fromPartial(object: Partial<QueryFuturesRequest>): QueryFuturesRequest {
    const message = createBaseQueryFuturesRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    message.creator = object.creator ?? undefined;
    return message;
  },
  fromAmino(object: QueryFuturesRequestAmino): QueryFuturesRequest {
    const message = createBaseQueryFuturesRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    return message;
  },
  toAmino(message: QueryFuturesRequest): QueryFuturesRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    obj.creator = message.creator === null ? undefined : message.creator;
    return obj;
  },
  fromAminoMsg(object: QueryFuturesRequestAminoMsg): QueryFuturesRequest {
    return QueryFuturesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryFuturesRequestProtoMsg): QueryFuturesRequest {
    return QueryFuturesRequest.decode(message.value);
  },
  toProto(message: QueryFuturesRequest): Uint8Array {
    return QueryFuturesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryFuturesRequest): QueryFuturesRequestProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.QueryFuturesRequest",
      value: QueryFuturesRequest.encode(message).finish()
    };
  }
};
function createBaseFutureResponse(): FutureResponse {
  return {
    future: Future.fromPartial({}),
    votes: [],
    result: undefined
  };
}
export const FutureResponse = {
  typeUrl: "/warden.async.v1beta1.FutureResponse",
  encode(message: FutureResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.future !== undefined) {
      Future.encode(message.future, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.votes) {
      FutureVote.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.result !== undefined) {
      FutureResult.encode(message.result, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): FutureResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFutureResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.future = Future.decode(reader, reader.uint32());
          break;
        case 2:
          message.votes.push(FutureVote.decode(reader, reader.uint32()));
          break;
        case 3:
          message.result = FutureResult.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): FutureResponse {
    return {
      future: isSet(object.future) ? Future.fromJSON(object.future) : undefined,
      votes: Array.isArray(object?.votes) ? object.votes.map((e: any) => FutureVote.fromJSON(e)) : [],
      result: isSet(object.result) ? FutureResult.fromJSON(object.result) : undefined
    };
  },
  toJSON(message: FutureResponse): JsonSafe<FutureResponse> {
    const obj: any = {};
    message.future !== undefined && (obj.future = message.future ? Future.toJSON(message.future) : undefined);
    if (message.votes) {
      obj.votes = message.votes.map(e => e ? FutureVote.toJSON(e) : undefined);
    } else {
      obj.votes = [];
    }
    message.result !== undefined && (obj.result = message.result ? FutureResult.toJSON(message.result) : undefined);
    return obj;
  },
  fromPartial(object: Partial<FutureResponse>): FutureResponse {
    const message = createBaseFutureResponse();
    message.future = object.future !== undefined && object.future !== null ? Future.fromPartial(object.future) : undefined;
    message.votes = object.votes?.map(e => FutureVote.fromPartial(e)) || [];
    message.result = object.result !== undefined && object.result !== null ? FutureResult.fromPartial(object.result) : undefined;
    return message;
  },
  fromAmino(object: FutureResponseAmino): FutureResponse {
    const message = createBaseFutureResponse();
    if (object.future !== undefined && object.future !== null) {
      message.future = Future.fromAmino(object.future);
    }
    message.votes = object.votes?.map(e => FutureVote.fromAmino(e)) || [];
    if (object.result !== undefined && object.result !== null) {
      message.result = FutureResult.fromAmino(object.result);
    }
    return message;
  },
  toAmino(message: FutureResponse): FutureResponseAmino {
    const obj: any = {};
    obj.future = message.future ? Future.toAmino(message.future) : undefined;
    if (message.votes) {
      obj.votes = message.votes.map(e => e ? FutureVote.toAmino(e) : undefined);
    } else {
      obj.votes = message.votes;
    }
    obj.result = message.result ? FutureResult.toAmino(message.result) : undefined;
    return obj;
  },
  fromAminoMsg(object: FutureResponseAminoMsg): FutureResponse {
    return FutureResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: FutureResponseProtoMsg): FutureResponse {
    return FutureResponse.decode(message.value);
  },
  toProto(message: FutureResponse): Uint8Array {
    return FutureResponse.encode(message).finish();
  },
  toProtoMsg(message: FutureResponse): FutureResponseProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.FutureResponse",
      value: FutureResponse.encode(message).finish()
    };
  }
};
function createBaseQueryFuturesResponse(): QueryFuturesResponse {
  return {
    pagination: undefined,
    futures: []
  };
}
export const QueryFuturesResponse = {
  typeUrl: "/warden.async.v1beta1.QueryFuturesResponse",
  encode(message: QueryFuturesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.futures) {
      FutureResponse.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryFuturesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFuturesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        case 2:
          message.futures.push(FutureResponse.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryFuturesResponse {
    return {
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      futures: Array.isArray(object?.futures) ? object.futures.map((e: any) => FutureResponse.fromJSON(e)) : []
    };
  },
  toJSON(message: QueryFuturesResponse): JsonSafe<QueryFuturesResponse> {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    if (message.futures) {
      obj.futures = message.futures.map(e => e ? FutureResponse.toJSON(e) : undefined);
    } else {
      obj.futures = [];
    }
    return obj;
  },
  fromPartial(object: Partial<QueryFuturesResponse>): QueryFuturesResponse {
    const message = createBaseQueryFuturesResponse();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    message.futures = object.futures?.map(e => FutureResponse.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryFuturesResponseAmino): QueryFuturesResponse {
    const message = createBaseQueryFuturesResponse();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    message.futures = object.futures?.map(e => FutureResponse.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryFuturesResponse): QueryFuturesResponseAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    if (message.futures) {
      obj.futures = message.futures.map(e => e ? FutureResponse.toAmino(e) : undefined);
    } else {
      obj.futures = message.futures;
    }
    return obj;
  },
  fromAminoMsg(object: QueryFuturesResponseAminoMsg): QueryFuturesResponse {
    return QueryFuturesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryFuturesResponseProtoMsg): QueryFuturesResponse {
    return QueryFuturesResponse.decode(message.value);
  },
  toProto(message: QueryFuturesResponse): Uint8Array {
    return QueryFuturesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryFuturesResponse): QueryFuturesResponseProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.QueryFuturesResponse",
      value: QueryFuturesResponse.encode(message).finish()
    };
  }
};
function createBaseQueryFutureByIdRequest(): QueryFutureByIdRequest {
  return {
    id: BigInt(0)
  };
}
export const QueryFutureByIdRequest = {
  typeUrl: "/warden.async.v1beta1.QueryFutureByIdRequest",
  encode(message: QueryFutureByIdRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryFutureByIdRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFutureByIdRequest();
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
  fromJSON(object: any): QueryFutureByIdRequest {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0)
    };
  },
  toJSON(message: QueryFutureByIdRequest): JsonSafe<QueryFutureByIdRequest> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<QueryFutureByIdRequest>): QueryFutureByIdRequest {
    const message = createBaseQueryFutureByIdRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryFutureByIdRequestAmino): QueryFutureByIdRequest {
    const message = createBaseQueryFutureByIdRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: QueryFutureByIdRequest): QueryFutureByIdRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? (message.id?.toString)() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryFutureByIdRequestAminoMsg): QueryFutureByIdRequest {
    return QueryFutureByIdRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryFutureByIdRequestProtoMsg): QueryFutureByIdRequest {
    return QueryFutureByIdRequest.decode(message.value);
  },
  toProto(message: QueryFutureByIdRequest): Uint8Array {
    return QueryFutureByIdRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryFutureByIdRequest): QueryFutureByIdRequestProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.QueryFutureByIdRequest",
      value: QueryFutureByIdRequest.encode(message).finish()
    };
  }
};
function createBaseQueryFutureByIdResponse(): QueryFutureByIdResponse {
  return {
    futureResponse: FutureResponse.fromPartial({})
  };
}
export const QueryFutureByIdResponse = {
  typeUrl: "/warden.async.v1beta1.QueryFutureByIdResponse",
  encode(message: QueryFutureByIdResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.futureResponse !== undefined) {
      FutureResponse.encode(message.futureResponse, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryFutureByIdResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFutureByIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.futureResponse = FutureResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryFutureByIdResponse {
    return {
      futureResponse: isSet(object.futureResponse) ? FutureResponse.fromJSON(object.futureResponse) : undefined
    };
  },
  toJSON(message: QueryFutureByIdResponse): JsonSafe<QueryFutureByIdResponse> {
    const obj: any = {};
    message.futureResponse !== undefined && (obj.futureResponse = message.futureResponse ? FutureResponse.toJSON(message.futureResponse) : undefined);
    return obj;
  },
  fromPartial(object: Partial<QueryFutureByIdResponse>): QueryFutureByIdResponse {
    const message = createBaseQueryFutureByIdResponse();
    message.futureResponse = object.futureResponse !== undefined && object.futureResponse !== null ? FutureResponse.fromPartial(object.futureResponse) : undefined;
    return message;
  },
  fromAmino(object: QueryFutureByIdResponseAmino): QueryFutureByIdResponse {
    const message = createBaseQueryFutureByIdResponse();
    if (object.futureResponse !== undefined && object.futureResponse !== null) {
      message.futureResponse = FutureResponse.fromAmino(object.futureResponse);
    }
    return message;
  },
  toAmino(message: QueryFutureByIdResponse): QueryFutureByIdResponseAmino {
    const obj: any = {};
    obj.futureResponse = message.futureResponse ? FutureResponse.toAmino(message.futureResponse) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryFutureByIdResponseAminoMsg): QueryFutureByIdResponse {
    return QueryFutureByIdResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryFutureByIdResponseProtoMsg): QueryFutureByIdResponse {
    return QueryFutureByIdResponse.decode(message.value);
  },
  toProto(message: QueryFutureByIdResponse): Uint8Array {
    return QueryFutureByIdResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryFutureByIdResponse): QueryFutureByIdResponseProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.QueryFutureByIdResponse",
      value: QueryFutureByIdResponse.encode(message).finish()
    };
  }
};
function createBaseQueryPendingFuturesRequest(): QueryPendingFuturesRequest {
  return {
    pagination: undefined
  };
}
export const QueryPendingFuturesRequest = {
  typeUrl: "/warden.async.v1beta1.QueryPendingFuturesRequest",
  encode(message: QueryPendingFuturesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPendingFuturesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPendingFuturesRequest();
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
  fromJSON(object: any): QueryPendingFuturesRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined
    };
  },
  toJSON(message: QueryPendingFuturesRequest): JsonSafe<QueryPendingFuturesRequest> {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial(object: Partial<QueryPendingFuturesRequest>): QueryPendingFuturesRequest {
    const message = createBaseQueryPendingFuturesRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryPendingFuturesRequestAmino): QueryPendingFuturesRequest {
    const message = createBaseQueryPendingFuturesRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryPendingFuturesRequest): QueryPendingFuturesRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryPendingFuturesRequestAminoMsg): QueryPendingFuturesRequest {
    return QueryPendingFuturesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPendingFuturesRequestProtoMsg): QueryPendingFuturesRequest {
    return QueryPendingFuturesRequest.decode(message.value);
  },
  toProto(message: QueryPendingFuturesRequest): Uint8Array {
    return QueryPendingFuturesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryPendingFuturesRequest): QueryPendingFuturesRequestProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.QueryPendingFuturesRequest",
      value: QueryPendingFuturesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryPendingFuturesResponse(): QueryPendingFuturesResponse {
  return {
    pagination: undefined,
    futures: []
  };
}
export const QueryPendingFuturesResponse = {
  typeUrl: "/warden.async.v1beta1.QueryPendingFuturesResponse",
  encode(message: QueryPendingFuturesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.futures) {
      Future.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPendingFuturesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPendingFuturesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        case 2:
          message.futures.push(Future.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryPendingFuturesResponse {
    return {
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      futures: Array.isArray(object?.futures) ? object.futures.map((e: any) => Future.fromJSON(e)) : []
    };
  },
  toJSON(message: QueryPendingFuturesResponse): JsonSafe<QueryPendingFuturesResponse> {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    if (message.futures) {
      obj.futures = message.futures.map(e => e ? Future.toJSON(e) : undefined);
    } else {
      obj.futures = [];
    }
    return obj;
  },
  fromPartial(object: Partial<QueryPendingFuturesResponse>): QueryPendingFuturesResponse {
    const message = createBaseQueryPendingFuturesResponse();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    message.futures = object.futures?.map(e => Future.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryPendingFuturesResponseAmino): QueryPendingFuturesResponse {
    const message = createBaseQueryPendingFuturesResponse();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    message.futures = object.futures?.map(e => Future.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryPendingFuturesResponse): QueryPendingFuturesResponseAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    if (message.futures) {
      obj.futures = message.futures.map(e => e ? Future.toAmino(e) : undefined);
    } else {
      obj.futures = message.futures;
    }
    return obj;
  },
  fromAminoMsg(object: QueryPendingFuturesResponseAminoMsg): QueryPendingFuturesResponse {
    return QueryPendingFuturesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPendingFuturesResponseProtoMsg): QueryPendingFuturesResponse {
    return QueryPendingFuturesResponse.decode(message.value);
  },
  toProto(message: QueryPendingFuturesResponse): Uint8Array {
    return QueryPendingFuturesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryPendingFuturesResponse): QueryPendingFuturesResponseProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.QueryPendingFuturesResponse",
      value: QueryPendingFuturesResponse.encode(message).finish()
    };
  }
};
function createBaseQueryHandlersByValidatorRequest(): QueryHandlersByValidatorRequest {
  return {
    pagination: undefined,
    validator: ""
  };
}
export const QueryHandlersByValidatorRequest = {
  typeUrl: "/warden.async.v1beta1.QueryHandlersByValidatorRequest",
  encode(message: QueryHandlersByValidatorRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.validator !== "") {
      writer.uint32(18).string(message.validator);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryHandlersByValidatorRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryHandlersByValidatorRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.validator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryHandlersByValidatorRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      validator: isSet(object.validator) ? String(object.validator) : ""
    };
  },
  toJSON(message: QueryHandlersByValidatorRequest): JsonSafe<QueryHandlersByValidatorRequest> {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    message.validator !== undefined && (obj.validator = message.validator);
    return obj;
  },
  fromPartial(object: Partial<QueryHandlersByValidatorRequest>): QueryHandlersByValidatorRequest {
    const message = createBaseQueryHandlersByValidatorRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    message.validator = object.validator ?? "";
    return message;
  },
  fromAmino(object: QueryHandlersByValidatorRequestAmino): QueryHandlersByValidatorRequest {
    const message = createBaseQueryHandlersByValidatorRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    if (object.validator !== undefined && object.validator !== null) {
      message.validator = object.validator;
    }
    return message;
  },
  toAmino(message: QueryHandlersByValidatorRequest): QueryHandlersByValidatorRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    obj.validator = message.validator === "" ? undefined : message.validator;
    return obj;
  },
  fromAminoMsg(object: QueryHandlersByValidatorRequestAminoMsg): QueryHandlersByValidatorRequest {
    return QueryHandlersByValidatorRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryHandlersByValidatorRequestProtoMsg): QueryHandlersByValidatorRequest {
    return QueryHandlersByValidatorRequest.decode(message.value);
  },
  toProto(message: QueryHandlersByValidatorRequest): Uint8Array {
    return QueryHandlersByValidatorRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryHandlersByValidatorRequest): QueryHandlersByValidatorRequestProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.QueryHandlersByValidatorRequest",
      value: QueryHandlersByValidatorRequest.encode(message).finish()
    };
  }
};
function createBaseQueryHandlersByValidatorResponse(): QueryHandlersByValidatorResponse {
  return {
    pagination: undefined,
    handlers: []
  };
}
export const QueryHandlersByValidatorResponse = {
  typeUrl: "/warden.async.v1beta1.QueryHandlersByValidatorResponse",
  encode(message: QueryHandlersByValidatorResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.handlers) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryHandlersByValidatorResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryHandlersByValidatorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        case 2:
          message.handlers.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryHandlersByValidatorResponse {
    return {
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      handlers: Array.isArray(object?.handlers) ? object.handlers.map((e: any) => String(e)) : []
    };
  },
  toJSON(message: QueryHandlersByValidatorResponse): JsonSafe<QueryHandlersByValidatorResponse> {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    if (message.handlers) {
      obj.handlers = message.handlers.map(e => e);
    } else {
      obj.handlers = [];
    }
    return obj;
  },
  fromPartial(object: Partial<QueryHandlersByValidatorResponse>): QueryHandlersByValidatorResponse {
    const message = createBaseQueryHandlersByValidatorResponse();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    message.handlers = object.handlers?.map(e => e) || [];
    return message;
  },
  fromAmino(object: QueryHandlersByValidatorResponseAmino): QueryHandlersByValidatorResponse {
    const message = createBaseQueryHandlersByValidatorResponse();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    message.handlers = object.handlers?.map(e => e) || [];
    return message;
  },
  toAmino(message: QueryHandlersByValidatorResponse): QueryHandlersByValidatorResponseAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    if (message.handlers) {
      obj.handlers = message.handlers.map(e => e);
    } else {
      obj.handlers = message.handlers;
    }
    return obj;
  },
  fromAminoMsg(object: QueryHandlersByValidatorResponseAminoMsg): QueryHandlersByValidatorResponse {
    return QueryHandlersByValidatorResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryHandlersByValidatorResponseProtoMsg): QueryHandlersByValidatorResponse {
    return QueryHandlersByValidatorResponse.decode(message.value);
  },
  toProto(message: QueryHandlersByValidatorResponse): Uint8Array {
    return QueryHandlersByValidatorResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryHandlersByValidatorResponse): QueryHandlersByValidatorResponseProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.QueryHandlersByValidatorResponse",
      value: QueryHandlersByValidatorResponse.encode(message).finish()
    };
  }
};