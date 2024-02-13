/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { ModuleVersion, Plan } from "./upgrade";

export const protobufPackage = "cosmos.upgrade.v1beta1";

/**
 * QueryCurrentPlanRequest is the request type for the Query/CurrentPlan RPC
 * method.
 */
export interface QueryCurrentPlanRequest {
}

/**
 * QueryCurrentPlanResponse is the response type for the Query/CurrentPlan RPC
 * method.
 */
export interface QueryCurrentPlanResponse {
  /** plan is the current upgrade plan. */
  plan: Plan | undefined;
}

/**
 * QueryCurrentPlanRequest is the request type for the Query/AppliedPlan RPC
 * method.
 */
export interface QueryAppliedPlanRequest {
  /** name is the name of the applied plan to query for. */
  name: string;
}

/**
 * QueryAppliedPlanResponse is the response type for the Query/AppliedPlan RPC
 * method.
 */
export interface QueryAppliedPlanResponse {
  /** height is the block height at which the plan was applied. */
  height: number;
}

/**
 * QueryUpgradedConsensusStateRequest is the request type for the Query/UpgradedConsensusState
 * RPC method.
 *
 * @deprecated
 */
export interface QueryUpgradedConsensusStateRequest {
  /**
   * last height of the current chain must be sent in request
   * as this is the height under which next consensus state is stored
   */
  lastHeight: number;
}

/**
 * QueryUpgradedConsensusStateResponse is the response type for the Query/UpgradedConsensusState
 * RPC method.
 *
 * @deprecated
 */
export interface QueryUpgradedConsensusStateResponse {
  /** Since: cosmos-sdk 0.43 */
  upgradedConsensusState: Uint8Array;
}

/**
 * QueryModuleVersionsRequest is the request type for the Query/ModuleVersions
 * RPC method.
 *
 * Since: cosmos-sdk 0.43
 */
export interface QueryModuleVersionsRequest {
  /**
   * module_name is a field to query a specific module
   * consensus version from state. Leaving this empty will
   * fetch the full list of module versions from state
   */
  moduleName: string;
}

/**
 * QueryModuleVersionsResponse is the response type for the Query/ModuleVersions
 * RPC method.
 *
 * Since: cosmos-sdk 0.43
 */
export interface QueryModuleVersionsResponse {
  /** module_versions is a list of module names with their consensus versions. */
  moduleVersions: ModuleVersion[];
}

/**
 * QueryAuthorityRequest is the request type for Query/Authority
 *
 * Since: cosmos-sdk 0.46
 */
export interface QueryAuthorityRequest {
}

/**
 * QueryAuthorityResponse is the response type for Query/Authority
 *
 * Since: cosmos-sdk 0.46
 */
export interface QueryAuthorityResponse {
  address: string;
}

function createBaseQueryCurrentPlanRequest(): QueryCurrentPlanRequest {
  return {};
}

export const QueryCurrentPlanRequest = {
  encode(_: QueryCurrentPlanRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCurrentPlanRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCurrentPlanRequest();
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

  fromJSON(_: any): QueryCurrentPlanRequest {
    return {};
  },

  toJSON(_: QueryCurrentPlanRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryCurrentPlanRequest>, I>>(base?: I): QueryCurrentPlanRequest {
    return QueryCurrentPlanRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryCurrentPlanRequest>, I>>(_: I): QueryCurrentPlanRequest {
    const message = createBaseQueryCurrentPlanRequest();
    return message;
  },
};

function createBaseQueryCurrentPlanResponse(): QueryCurrentPlanResponse {
  return { plan: undefined };
}

export const QueryCurrentPlanResponse = {
  encode(message: QueryCurrentPlanResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.plan !== undefined) {
      Plan.encode(message.plan, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCurrentPlanResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCurrentPlanResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.plan = Plan.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryCurrentPlanResponse {
    return { plan: isSet(object.plan) ? Plan.fromJSON(object.plan) : undefined };
  },

  toJSON(message: QueryCurrentPlanResponse): unknown {
    const obj: any = {};
    if (message.plan !== undefined) {
      obj.plan = Plan.toJSON(message.plan);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryCurrentPlanResponse>, I>>(base?: I): QueryCurrentPlanResponse {
    return QueryCurrentPlanResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryCurrentPlanResponse>, I>>(object: I): QueryCurrentPlanResponse {
    const message = createBaseQueryCurrentPlanResponse();
    message.plan = (object.plan !== undefined && object.plan !== null) ? Plan.fromPartial(object.plan) : undefined;
    return message;
  },
};

function createBaseQueryAppliedPlanRequest(): QueryAppliedPlanRequest {
  return { name: "" };
}

export const QueryAppliedPlanRequest = {
  encode(message: QueryAppliedPlanRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAppliedPlanRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAppliedPlanRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryAppliedPlanRequest {
    return { name: isSet(object.name) ? String(object.name) : "" };
  },

  toJSON(message: QueryAppliedPlanRequest): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAppliedPlanRequest>, I>>(base?: I): QueryAppliedPlanRequest {
    return QueryAppliedPlanRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAppliedPlanRequest>, I>>(object: I): QueryAppliedPlanRequest {
    const message = createBaseQueryAppliedPlanRequest();
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseQueryAppliedPlanResponse(): QueryAppliedPlanResponse {
  return { height: 0 };
}

export const QueryAppliedPlanResponse = {
  encode(message: QueryAppliedPlanResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== 0) {
      writer.uint32(8).int64(message.height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAppliedPlanResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAppliedPlanResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.height = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryAppliedPlanResponse {
    return { height: isSet(object.height) ? Number(object.height) : 0 };
  },

  toJSON(message: QueryAppliedPlanResponse): unknown {
    const obj: any = {};
    if (message.height !== 0) {
      obj.height = Math.round(message.height);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAppliedPlanResponse>, I>>(base?: I): QueryAppliedPlanResponse {
    return QueryAppliedPlanResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAppliedPlanResponse>, I>>(object: I): QueryAppliedPlanResponse {
    const message = createBaseQueryAppliedPlanResponse();
    message.height = object.height ?? 0;
    return message;
  },
};

function createBaseQueryUpgradedConsensusStateRequest(): QueryUpgradedConsensusStateRequest {
  return { lastHeight: 0 };
}

export const QueryUpgradedConsensusStateRequest = {
  encode(message: QueryUpgradedConsensusStateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.lastHeight !== 0) {
      writer.uint32(8).int64(message.lastHeight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryUpgradedConsensusStateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUpgradedConsensusStateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.lastHeight = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryUpgradedConsensusStateRequest {
    return { lastHeight: isSet(object.lastHeight) ? Number(object.lastHeight) : 0 };
  },

  toJSON(message: QueryUpgradedConsensusStateRequest): unknown {
    const obj: any = {};
    if (message.lastHeight !== 0) {
      obj.lastHeight = Math.round(message.lastHeight);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryUpgradedConsensusStateRequest>, I>>(
    base?: I,
  ): QueryUpgradedConsensusStateRequest {
    return QueryUpgradedConsensusStateRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryUpgradedConsensusStateRequest>, I>>(
    object: I,
  ): QueryUpgradedConsensusStateRequest {
    const message = createBaseQueryUpgradedConsensusStateRequest();
    message.lastHeight = object.lastHeight ?? 0;
    return message;
  },
};

function createBaseQueryUpgradedConsensusStateResponse(): QueryUpgradedConsensusStateResponse {
  return { upgradedConsensusState: new Uint8Array(0) };
}

export const QueryUpgradedConsensusStateResponse = {
  encode(message: QueryUpgradedConsensusStateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.upgradedConsensusState.length !== 0) {
      writer.uint32(18).bytes(message.upgradedConsensusState);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryUpgradedConsensusStateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUpgradedConsensusStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.upgradedConsensusState = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryUpgradedConsensusStateResponse {
    return {
      upgradedConsensusState: isSet(object.upgradedConsensusState)
        ? bytesFromBase64(object.upgradedConsensusState)
        : new Uint8Array(0),
    };
  },

  toJSON(message: QueryUpgradedConsensusStateResponse): unknown {
    const obj: any = {};
    if (message.upgradedConsensusState.length !== 0) {
      obj.upgradedConsensusState = base64FromBytes(message.upgradedConsensusState);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryUpgradedConsensusStateResponse>, I>>(
    base?: I,
  ): QueryUpgradedConsensusStateResponse {
    return QueryUpgradedConsensusStateResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryUpgradedConsensusStateResponse>, I>>(
    object: I,
  ): QueryUpgradedConsensusStateResponse {
    const message = createBaseQueryUpgradedConsensusStateResponse();
    message.upgradedConsensusState = object.upgradedConsensusState ?? new Uint8Array(0);
    return message;
  },
};

function createBaseQueryModuleVersionsRequest(): QueryModuleVersionsRequest {
  return { moduleName: "" };
}

export const QueryModuleVersionsRequest = {
  encode(message: QueryModuleVersionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.moduleName !== "") {
      writer.uint32(10).string(message.moduleName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryModuleVersionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryModuleVersionsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.moduleName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryModuleVersionsRequest {
    return { moduleName: isSet(object.moduleName) ? String(object.moduleName) : "" };
  },

  toJSON(message: QueryModuleVersionsRequest): unknown {
    const obj: any = {};
    if (message.moduleName !== "") {
      obj.moduleName = message.moduleName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryModuleVersionsRequest>, I>>(base?: I): QueryModuleVersionsRequest {
    return QueryModuleVersionsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryModuleVersionsRequest>, I>>(object: I): QueryModuleVersionsRequest {
    const message = createBaseQueryModuleVersionsRequest();
    message.moduleName = object.moduleName ?? "";
    return message;
  },
};

function createBaseQueryModuleVersionsResponse(): QueryModuleVersionsResponse {
  return { moduleVersions: [] };
}

export const QueryModuleVersionsResponse = {
  encode(message: QueryModuleVersionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.moduleVersions) {
      ModuleVersion.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryModuleVersionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryModuleVersionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.moduleVersions.push(ModuleVersion.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryModuleVersionsResponse {
    return {
      moduleVersions: Array.isArray(object?.moduleVersions)
        ? object.moduleVersions.map((e: any) => ModuleVersion.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryModuleVersionsResponse): unknown {
    const obj: any = {};
    if (message.moduleVersions?.length) {
      obj.moduleVersions = message.moduleVersions.map((e) => ModuleVersion.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryModuleVersionsResponse>, I>>(base?: I): QueryModuleVersionsResponse {
    return QueryModuleVersionsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryModuleVersionsResponse>, I>>(object: I): QueryModuleVersionsResponse {
    const message = createBaseQueryModuleVersionsResponse();
    message.moduleVersions = object.moduleVersions?.map((e) => ModuleVersion.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryAuthorityRequest(): QueryAuthorityRequest {
  return {};
}

export const QueryAuthorityRequest = {
  encode(_: QueryAuthorityRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAuthorityRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAuthorityRequest();
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

  fromJSON(_: any): QueryAuthorityRequest {
    return {};
  },

  toJSON(_: QueryAuthorityRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAuthorityRequest>, I>>(base?: I): QueryAuthorityRequest {
    return QueryAuthorityRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAuthorityRequest>, I>>(_: I): QueryAuthorityRequest {
    const message = createBaseQueryAuthorityRequest();
    return message;
  },
};

function createBaseQueryAuthorityResponse(): QueryAuthorityResponse {
  return { address: "" };
}

export const QueryAuthorityResponse = {
  encode(message: QueryAuthorityResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAuthorityResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAuthorityResponse();
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

  fromJSON(object: any): QueryAuthorityResponse {
    return { address: isSet(object.address) ? String(object.address) : "" };
  },

  toJSON(message: QueryAuthorityResponse): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAuthorityResponse>, I>>(base?: I): QueryAuthorityResponse {
    return QueryAuthorityResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAuthorityResponse>, I>>(object: I): QueryAuthorityResponse {
    const message = createBaseQueryAuthorityResponse();
    message.address = object.address ?? "";
    return message;
  },
};

/** Query defines the gRPC upgrade querier service. */
export interface Query {
  /** CurrentPlan queries the current upgrade plan. */
  CurrentPlan(request: QueryCurrentPlanRequest): Promise<QueryCurrentPlanResponse>;
  /** AppliedPlan queries a previously applied upgrade plan by its name. */
  AppliedPlan(request: QueryAppliedPlanRequest): Promise<QueryAppliedPlanResponse>;
  /**
   * UpgradedConsensusState queries the consensus state that will serve
   * as a trusted kernel for the next version of this chain. It will only be
   * stored at the last height of this chain.
   * UpgradedConsensusState RPC not supported with legacy querier
   * This rpc is deprecated now that IBC has its own replacement
   * (https://github.com/cosmos/ibc-go/blob/2c880a22e9f9cc75f62b527ca94aa75ce1106001/proto/ibc/core/client/v1/query.proto#L54)
   *
   * @deprecated
   */
  UpgradedConsensusState(request: QueryUpgradedConsensusStateRequest): Promise<QueryUpgradedConsensusStateResponse>;
  /**
   * ModuleVersions queries the list of module versions from state.
   *
   * Since: cosmos-sdk 0.43
   */
  ModuleVersions(request: QueryModuleVersionsRequest): Promise<QueryModuleVersionsResponse>;
  /**
   * Returns the account with authority to conduct upgrades
   *
   * Since: cosmos-sdk 0.46
   */
  Authority(request: QueryAuthorityRequest): Promise<QueryAuthorityResponse>;
}

export const QueryServiceName = "cosmos.upgrade.v1beta1.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.CurrentPlan = this.CurrentPlan.bind(this);
    this.AppliedPlan = this.AppliedPlan.bind(this);
    this.UpgradedConsensusState = this.UpgradedConsensusState.bind(this);
    this.ModuleVersions = this.ModuleVersions.bind(this);
    this.Authority = this.Authority.bind(this);
  }
  CurrentPlan(request: QueryCurrentPlanRequest): Promise<QueryCurrentPlanResponse> {
    const data = QueryCurrentPlanRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CurrentPlan", data);
    return promise.then((data) => QueryCurrentPlanResponse.decode(_m0.Reader.create(data)));
  }

  AppliedPlan(request: QueryAppliedPlanRequest): Promise<QueryAppliedPlanResponse> {
    const data = QueryAppliedPlanRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "AppliedPlan", data);
    return promise.then((data) => QueryAppliedPlanResponse.decode(_m0.Reader.create(data)));
  }

  UpgradedConsensusState(request: QueryUpgradedConsensusStateRequest): Promise<QueryUpgradedConsensusStateResponse> {
    const data = QueryUpgradedConsensusStateRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpgradedConsensusState", data);
    return promise.then((data) => QueryUpgradedConsensusStateResponse.decode(_m0.Reader.create(data)));
  }

  ModuleVersions(request: QueryModuleVersionsRequest): Promise<QueryModuleVersionsResponse> {
    const data = QueryModuleVersionsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ModuleVersions", data);
    return promise.then((data) => QueryModuleVersionsResponse.decode(_m0.Reader.create(data)));
  }

  Authority(request: QueryAuthorityRequest): Promise<QueryAuthorityResponse> {
    const data = QueryAuthorityRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Authority", data);
    return promise.then((data) => QueryAuthorityResponse.decode(_m0.Reader.create(data)));
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
