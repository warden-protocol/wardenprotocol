/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../../cosmos/base/query/v1beta1/pagination";
import { Coin } from "../../../../cosmos/base/v1beta1/coin";
import { DenomTrace, Params } from "./transfer";

export const protobufPackage = "ibc.applications.transfer.v1";

/**
 * QueryDenomTraceRequest is the request type for the Query/DenomTrace RPC
 * method
 */
export interface QueryDenomTraceRequest {
  /** hash (in hex format) or denom (full denom with ibc prefix) of the denomination trace information. */
  hash: string;
}

/**
 * QueryDenomTraceResponse is the response type for the Query/DenomTrace RPC
 * method.
 */
export interface QueryDenomTraceResponse {
  /** denom_trace returns the requested denomination trace information. */
  denomTrace: DenomTrace | undefined;
}

/**
 * QueryConnectionsRequest is the request type for the Query/DenomTraces RPC
 * method
 */
export interface QueryDenomTracesRequest {
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/**
 * QueryConnectionsResponse is the response type for the Query/DenomTraces RPC
 * method.
 */
export interface QueryDenomTracesResponse {
  /** denom_traces returns all denominations trace information. */
  denomTraces: DenomTrace[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params defines the parameters of the module. */
  params: Params | undefined;
}

/**
 * QueryDenomHashRequest is the request type for the Query/DenomHash RPC
 * method
 */
export interface QueryDenomHashRequest {
  /** The denomination trace ([port_id]/[channel_id])+/[denom] */
  trace: string;
}

/**
 * QueryDenomHashResponse is the response type for the Query/DenomHash RPC
 * method.
 */
export interface QueryDenomHashResponse {
  /** hash (in hex format) of the denomination trace information. */
  hash: string;
}

/** QueryEscrowAddressRequest is the request type for the EscrowAddress RPC method. */
export interface QueryEscrowAddressRequest {
  /** unique port identifier */
  portId: string;
  /** unique channel identifier */
  channelId: string;
}

/** QueryEscrowAddressResponse is the response type of the EscrowAddress RPC method. */
export interface QueryEscrowAddressResponse {
  /** the escrow account address */
  escrowAddress: string;
}

/** QueryTotalEscrowForDenomRequest is the request type for TotalEscrowForDenom RPC method. */
export interface QueryTotalEscrowForDenomRequest {
  denom: string;
}

/** QueryTotalEscrowForDenomResponse is the response type for TotalEscrowForDenom RPC method. */
export interface QueryTotalEscrowForDenomResponse {
  amount: Coin | undefined;
}

function createBaseQueryDenomTraceRequest(): QueryDenomTraceRequest {
  return { hash: "" };
}

export const QueryDenomTraceRequest = {
  encode(message: QueryDenomTraceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hash !== "") {
      writer.uint32(10).string(message.hash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomTraceRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomTraceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hash = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDenomTraceRequest {
    return { hash: isSet(object.hash) ? String(object.hash) : "" };
  },

  toJSON(message: QueryDenomTraceRequest): unknown {
    const obj: any = {};
    if (message.hash !== "") {
      obj.hash = message.hash;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDenomTraceRequest>, I>>(base?: I): QueryDenomTraceRequest {
    return QueryDenomTraceRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomTraceRequest>, I>>(object: I): QueryDenomTraceRequest {
    const message = createBaseQueryDenomTraceRequest();
    message.hash = object.hash ?? "";
    return message;
  },
};

function createBaseQueryDenomTraceResponse(): QueryDenomTraceResponse {
  return { denomTrace: undefined };
}

export const QueryDenomTraceResponse = {
  encode(message: QueryDenomTraceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denomTrace !== undefined) {
      DenomTrace.encode(message.denomTrace, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomTraceResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomTraceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denomTrace = DenomTrace.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDenomTraceResponse {
    return { denomTrace: isSet(object.denomTrace) ? DenomTrace.fromJSON(object.denomTrace) : undefined };
  },

  toJSON(message: QueryDenomTraceResponse): unknown {
    const obj: any = {};
    if (message.denomTrace !== undefined) {
      obj.denomTrace = DenomTrace.toJSON(message.denomTrace);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDenomTraceResponse>, I>>(base?: I): QueryDenomTraceResponse {
    return QueryDenomTraceResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomTraceResponse>, I>>(object: I): QueryDenomTraceResponse {
    const message = createBaseQueryDenomTraceResponse();
    message.denomTrace = (object.denomTrace !== undefined && object.denomTrace !== null)
      ? DenomTrace.fromPartial(object.denomTrace)
      : undefined;
    return message;
  },
};

function createBaseQueryDenomTracesRequest(): QueryDenomTracesRequest {
  return { pagination: undefined };
}

export const QueryDenomTracesRequest = {
  encode(message: QueryDenomTracesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomTracesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomTracesRequest();
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

  fromJSON(object: any): QueryDenomTracesRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryDenomTracesRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDenomTracesRequest>, I>>(base?: I): QueryDenomTracesRequest {
    return QueryDenomTracesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomTracesRequest>, I>>(object: I): QueryDenomTracesRequest {
    const message = createBaseQueryDenomTracesRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryDenomTracesResponse(): QueryDenomTracesResponse {
  return { denomTraces: [], pagination: undefined };
}

export const QueryDenomTracesResponse = {
  encode(message: QueryDenomTracesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.denomTraces) {
      DenomTrace.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomTracesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomTracesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denomTraces.push(DenomTrace.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryDenomTracesResponse {
    return {
      denomTraces: Array.isArray(object?.denomTraces) ? object.denomTraces.map((e: any) => DenomTrace.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryDenomTracesResponse): unknown {
    const obj: any = {};
    if (message.denomTraces?.length) {
      obj.denomTraces = message.denomTraces.map((e) => DenomTrace.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDenomTracesResponse>, I>>(base?: I): QueryDenomTracesResponse {
    return QueryDenomTracesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomTracesResponse>, I>>(object: I): QueryDenomTracesResponse {
    const message = createBaseQueryDenomTracesResponse();
    message.denomTraces = object.denomTraces?.map((e) => DenomTrace.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

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

function createBaseQueryDenomHashRequest(): QueryDenomHashRequest {
  return { trace: "" };
}

export const QueryDenomHashRequest = {
  encode(message: QueryDenomHashRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.trace !== "") {
      writer.uint32(10).string(message.trace);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomHashRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomHashRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.trace = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDenomHashRequest {
    return { trace: isSet(object.trace) ? String(object.trace) : "" };
  },

  toJSON(message: QueryDenomHashRequest): unknown {
    const obj: any = {};
    if (message.trace !== "") {
      obj.trace = message.trace;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDenomHashRequest>, I>>(base?: I): QueryDenomHashRequest {
    return QueryDenomHashRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomHashRequest>, I>>(object: I): QueryDenomHashRequest {
    const message = createBaseQueryDenomHashRequest();
    message.trace = object.trace ?? "";
    return message;
  },
};

function createBaseQueryDenomHashResponse(): QueryDenomHashResponse {
  return { hash: "" };
}

export const QueryDenomHashResponse = {
  encode(message: QueryDenomHashResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hash !== "") {
      writer.uint32(10).string(message.hash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomHashResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomHashResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hash = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDenomHashResponse {
    return { hash: isSet(object.hash) ? String(object.hash) : "" };
  },

  toJSON(message: QueryDenomHashResponse): unknown {
    const obj: any = {};
    if (message.hash !== "") {
      obj.hash = message.hash;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDenomHashResponse>, I>>(base?: I): QueryDenomHashResponse {
    return QueryDenomHashResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomHashResponse>, I>>(object: I): QueryDenomHashResponse {
    const message = createBaseQueryDenomHashResponse();
    message.hash = object.hash ?? "";
    return message;
  },
};

function createBaseQueryEscrowAddressRequest(): QueryEscrowAddressRequest {
  return { portId: "", channelId: "" };
}

export const QueryEscrowAddressRequest = {
  encode(message: QueryEscrowAddressRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryEscrowAddressRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEscrowAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.portId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channelId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryEscrowAddressRequest {
    return {
      portId: isSet(object.portId) ? String(object.portId) : "",
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
    };
  },

  toJSON(message: QueryEscrowAddressRequest): unknown {
    const obj: any = {};
    if (message.portId !== "") {
      obj.portId = message.portId;
    }
    if (message.channelId !== "") {
      obj.channelId = message.channelId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryEscrowAddressRequest>, I>>(base?: I): QueryEscrowAddressRequest {
    return QueryEscrowAddressRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryEscrowAddressRequest>, I>>(object: I): QueryEscrowAddressRequest {
    const message = createBaseQueryEscrowAddressRequest();
    message.portId = object.portId ?? "";
    message.channelId = object.channelId ?? "";
    return message;
  },
};

function createBaseQueryEscrowAddressResponse(): QueryEscrowAddressResponse {
  return { escrowAddress: "" };
}

export const QueryEscrowAddressResponse = {
  encode(message: QueryEscrowAddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.escrowAddress !== "") {
      writer.uint32(10).string(message.escrowAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryEscrowAddressResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEscrowAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.escrowAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryEscrowAddressResponse {
    return { escrowAddress: isSet(object.escrowAddress) ? String(object.escrowAddress) : "" };
  },

  toJSON(message: QueryEscrowAddressResponse): unknown {
    const obj: any = {};
    if (message.escrowAddress !== "") {
      obj.escrowAddress = message.escrowAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryEscrowAddressResponse>, I>>(base?: I): QueryEscrowAddressResponse {
    return QueryEscrowAddressResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryEscrowAddressResponse>, I>>(object: I): QueryEscrowAddressResponse {
    const message = createBaseQueryEscrowAddressResponse();
    message.escrowAddress = object.escrowAddress ?? "";
    return message;
  },
};

function createBaseQueryTotalEscrowForDenomRequest(): QueryTotalEscrowForDenomRequest {
  return { denom: "" };
}

export const QueryTotalEscrowForDenomRequest = {
  encode(message: QueryTotalEscrowForDenomRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalEscrowForDenomRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalEscrowForDenomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryTotalEscrowForDenomRequest {
    return { denom: isSet(object.denom) ? String(object.denom) : "" };
  },

  toJSON(message: QueryTotalEscrowForDenomRequest): unknown {
    const obj: any = {};
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryTotalEscrowForDenomRequest>, I>>(base?: I): QueryTotalEscrowForDenomRequest {
    return QueryTotalEscrowForDenomRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryTotalEscrowForDenomRequest>, I>>(
    object: I,
  ): QueryTotalEscrowForDenomRequest {
    const message = createBaseQueryTotalEscrowForDenomRequest();
    message.denom = object.denom ?? "";
    return message;
  },
};

function createBaseQueryTotalEscrowForDenomResponse(): QueryTotalEscrowForDenomResponse {
  return { amount: undefined };
}

export const QueryTotalEscrowForDenomResponse = {
  encode(message: QueryTotalEscrowForDenomResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalEscrowForDenomResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalEscrowForDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.amount = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryTotalEscrowForDenomResponse {
    return { amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined };
  },

  toJSON(message: QueryTotalEscrowForDenomResponse): unknown {
    const obj: any = {};
    if (message.amount !== undefined) {
      obj.amount = Coin.toJSON(message.amount);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryTotalEscrowForDenomResponse>, I>>(
    base?: I,
  ): QueryTotalEscrowForDenomResponse {
    return QueryTotalEscrowForDenomResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryTotalEscrowForDenomResponse>, I>>(
    object: I,
  ): QueryTotalEscrowForDenomResponse {
    const message = createBaseQueryTotalEscrowForDenomResponse();
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Coin.fromPartial(object.amount)
      : undefined;
    return message;
  },
};

/** Query provides defines the gRPC querier service. */
export interface Query {
  /** DenomTraces queries all denomination traces. */
  DenomTraces(request: QueryDenomTracesRequest): Promise<QueryDenomTracesResponse>;
  /** DenomTrace queries a denomination trace information. */
  DenomTrace(request: QueryDenomTraceRequest): Promise<QueryDenomTraceResponse>;
  /** Params queries all parameters of the ibc-transfer module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** DenomHash queries a denomination hash information. */
  DenomHash(request: QueryDenomHashRequest): Promise<QueryDenomHashResponse>;
  /** EscrowAddress returns the escrow address for a particular port and channel id. */
  EscrowAddress(request: QueryEscrowAddressRequest): Promise<QueryEscrowAddressResponse>;
  /** TotalEscrowForDenom returns the total amount of tokens in escrow based on the denom. */
  TotalEscrowForDenom(request: QueryTotalEscrowForDenomRequest): Promise<QueryTotalEscrowForDenomResponse>;
}

export const QueryServiceName = "ibc.applications.transfer.v1.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.DenomTraces = this.DenomTraces.bind(this);
    this.DenomTrace = this.DenomTrace.bind(this);
    this.Params = this.Params.bind(this);
    this.DenomHash = this.DenomHash.bind(this);
    this.EscrowAddress = this.EscrowAddress.bind(this);
    this.TotalEscrowForDenom = this.TotalEscrowForDenom.bind(this);
  }
  DenomTraces(request: QueryDenomTracesRequest): Promise<QueryDenomTracesResponse> {
    const data = QueryDenomTracesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DenomTraces", data);
    return promise.then((data) => QueryDenomTracesResponse.decode(_m0.Reader.create(data)));
  }

  DenomTrace(request: QueryDenomTraceRequest): Promise<QueryDenomTraceResponse> {
    const data = QueryDenomTraceRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DenomTrace", data);
    return promise.then((data) => QueryDenomTraceResponse.decode(_m0.Reader.create(data)));
  }

  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(_m0.Reader.create(data)));
  }

  DenomHash(request: QueryDenomHashRequest): Promise<QueryDenomHashResponse> {
    const data = QueryDenomHashRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DenomHash", data);
    return promise.then((data) => QueryDenomHashResponse.decode(_m0.Reader.create(data)));
  }

  EscrowAddress(request: QueryEscrowAddressRequest): Promise<QueryEscrowAddressResponse> {
    const data = QueryEscrowAddressRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "EscrowAddress", data);
    return promise.then((data) => QueryEscrowAddressResponse.decode(_m0.Reader.create(data)));
  }

  TotalEscrowForDenom(request: QueryTotalEscrowForDenomRequest): Promise<QueryTotalEscrowForDenomResponse> {
    const data = QueryTotalEscrowForDenomRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "TotalEscrowForDenom", data);
    return promise.then((data) => QueryTotalEscrowForDenomResponse.decode(_m0.Reader.create(data)));
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
