/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Params } from "./mint";

export const protobufPackage = "cosmos.mint.v1beta1";

/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params defines the parameters of the module. */
  params: Params | undefined;
}

/** QueryInflationRequest is the request type for the Query/Inflation RPC method. */
export interface QueryInflationRequest {
}

/**
 * QueryInflationResponse is the response type for the Query/Inflation RPC
 * method.
 */
export interface QueryInflationResponse {
  /** inflation is the current minting inflation value. */
  inflation: Uint8Array;
}

/**
 * QueryAnnualProvisionsRequest is the request type for the
 * Query/AnnualProvisions RPC method.
 */
export interface QueryAnnualProvisionsRequest {
}

/**
 * QueryAnnualProvisionsResponse is the response type for the
 * Query/AnnualProvisions RPC method.
 */
export interface QueryAnnualProvisionsResponse {
  /** annual_provisions is the current minting annual provisions value. */
  annualProvisions: Uint8Array;
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

function createBaseQueryInflationRequest(): QueryInflationRequest {
  return {};
}

export const QueryInflationRequest = {
  encode(_: QueryInflationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryInflationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryInflationRequest();
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

  fromJSON(_: any): QueryInflationRequest {
    return {};
  },

  toJSON(_: QueryInflationRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryInflationRequest>, I>>(base?: I): QueryInflationRequest {
    return QueryInflationRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryInflationRequest>, I>>(_: I): QueryInflationRequest {
    const message = createBaseQueryInflationRequest();
    return message;
  },
};

function createBaseQueryInflationResponse(): QueryInflationResponse {
  return { inflation: new Uint8Array(0) };
}

export const QueryInflationResponse = {
  encode(message: QueryInflationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.inflation.length !== 0) {
      writer.uint32(10).bytes(message.inflation);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryInflationResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryInflationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.inflation = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryInflationResponse {
    return { inflation: isSet(object.inflation) ? bytesFromBase64(object.inflation) : new Uint8Array(0) };
  },

  toJSON(message: QueryInflationResponse): unknown {
    const obj: any = {};
    if (message.inflation.length !== 0) {
      obj.inflation = base64FromBytes(message.inflation);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryInflationResponse>, I>>(base?: I): QueryInflationResponse {
    return QueryInflationResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryInflationResponse>, I>>(object: I): QueryInflationResponse {
    const message = createBaseQueryInflationResponse();
    message.inflation = object.inflation ?? new Uint8Array(0);
    return message;
  },
};

function createBaseQueryAnnualProvisionsRequest(): QueryAnnualProvisionsRequest {
  return {};
}

export const QueryAnnualProvisionsRequest = {
  encode(_: QueryAnnualProvisionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAnnualProvisionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAnnualProvisionsRequest();
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

  fromJSON(_: any): QueryAnnualProvisionsRequest {
    return {};
  },

  toJSON(_: QueryAnnualProvisionsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAnnualProvisionsRequest>, I>>(base?: I): QueryAnnualProvisionsRequest {
    return QueryAnnualProvisionsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAnnualProvisionsRequest>, I>>(_: I): QueryAnnualProvisionsRequest {
    const message = createBaseQueryAnnualProvisionsRequest();
    return message;
  },
};

function createBaseQueryAnnualProvisionsResponse(): QueryAnnualProvisionsResponse {
  return { annualProvisions: new Uint8Array(0) };
}

export const QueryAnnualProvisionsResponse = {
  encode(message: QueryAnnualProvisionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.annualProvisions.length !== 0) {
      writer.uint32(10).bytes(message.annualProvisions);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAnnualProvisionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAnnualProvisionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.annualProvisions = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryAnnualProvisionsResponse {
    return {
      annualProvisions: isSet(object.annualProvisions) ? bytesFromBase64(object.annualProvisions) : new Uint8Array(0),
    };
  },

  toJSON(message: QueryAnnualProvisionsResponse): unknown {
    const obj: any = {};
    if (message.annualProvisions.length !== 0) {
      obj.annualProvisions = base64FromBytes(message.annualProvisions);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAnnualProvisionsResponse>, I>>(base?: I): QueryAnnualProvisionsResponse {
    return QueryAnnualProvisionsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAnnualProvisionsResponse>, I>>(
    object: I,
  ): QueryAnnualProvisionsResponse {
    const message = createBaseQueryAnnualProvisionsResponse();
    message.annualProvisions = object.annualProvisions ?? new Uint8Array(0);
    return message;
  },
};

/** Query provides defines the gRPC querier service. */
export interface Query {
  /** Params returns the total set of minting parameters. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Inflation returns the current minting inflation value. */
  Inflation(request: QueryInflationRequest): Promise<QueryInflationResponse>;
  /** AnnualProvisions current minting annual provisions value. */
  AnnualProvisions(request: QueryAnnualProvisionsRequest): Promise<QueryAnnualProvisionsResponse>;
}

export const QueryServiceName = "cosmos.mint.v1beta1.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.Inflation = this.Inflation.bind(this);
    this.AnnualProvisions = this.AnnualProvisions.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(_m0.Reader.create(data)));
  }

  Inflation(request: QueryInflationRequest): Promise<QueryInflationResponse> {
    const data = QueryInflationRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Inflation", data);
    return promise.then((data) => QueryInflationResponse.decode(_m0.Reader.create(data)));
  }

  AnnualProvisions(request: QueryAnnualProvisionsRequest): Promise<QueryAnnualProvisionsResponse> {
    const data = QueryAnnualProvisionsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "AnnualProvisions", data);
    return promise.then((data) => QueryAnnualProvisionsResponse.decode(_m0.Reader.create(data)));
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

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
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
