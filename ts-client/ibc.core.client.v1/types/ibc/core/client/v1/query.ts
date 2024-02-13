/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../../cosmos/base/query/v1beta1/pagination";
import { Any } from "../../../../google/protobuf/any";
import { ConsensusStateWithHeight, Height, IdentifiedClientState, Params } from "./client";

export const protobufPackage = "ibc.core.client.v1";

/**
 * QueryClientStateRequest is the request type for the Query/ClientState RPC
 * method
 */
export interface QueryClientStateRequest {
  /** client state unique identifier */
  clientId: string;
}

/**
 * QueryClientStateResponse is the response type for the Query/ClientState RPC
 * method. Besides the client state, it includes a proof and the height from
 * which the proof was retrieved.
 */
export interface QueryClientStateResponse {
  /** client state associated with the request identifier */
  clientState:
    | Any
    | undefined;
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was retrieved */
  proofHeight: Height | undefined;
}

/**
 * QueryClientStatesRequest is the request type for the Query/ClientStates RPC
 * method
 */
export interface QueryClientStatesRequest {
  /** pagination request */
  pagination: PageRequest | undefined;
}

/**
 * QueryClientStatesResponse is the response type for the Query/ClientStates RPC
 * method.
 */
export interface QueryClientStatesResponse {
  /** list of stored ClientStates of the chain. */
  clientStates: IdentifiedClientState[];
  /** pagination response */
  pagination: PageResponse | undefined;
}

/**
 * QueryConsensusStateRequest is the request type for the Query/ConsensusState
 * RPC method. Besides the consensus state, it includes a proof and the height
 * from which the proof was retrieved.
 */
export interface QueryConsensusStateRequest {
  /** client identifier */
  clientId: string;
  /** consensus state revision number */
  revisionNumber: number;
  /** consensus state revision height */
  revisionHeight: number;
  /**
   * latest_height overrrides the height field and queries the latest stored
   * ConsensusState
   */
  latestHeight: boolean;
}

/**
 * QueryConsensusStateResponse is the response type for the Query/ConsensusState
 * RPC method
 */
export interface QueryConsensusStateResponse {
  /** consensus state associated with the client identifier at the given height */
  consensusState:
    | Any
    | undefined;
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was retrieved */
  proofHeight: Height | undefined;
}

/**
 * QueryConsensusStatesRequest is the request type for the Query/ConsensusStates
 * RPC method.
 */
export interface QueryConsensusStatesRequest {
  /** client identifier */
  clientId: string;
  /** pagination request */
  pagination: PageRequest | undefined;
}

/**
 * QueryConsensusStatesResponse is the response type for the
 * Query/ConsensusStates RPC method
 */
export interface QueryConsensusStatesResponse {
  /** consensus states associated with the identifier */
  consensusStates: ConsensusStateWithHeight[];
  /** pagination response */
  pagination: PageResponse | undefined;
}

/**
 * QueryConsensusStateHeightsRequest is the request type for Query/ConsensusStateHeights
 * RPC method.
 */
export interface QueryConsensusStateHeightsRequest {
  /** client identifier */
  clientId: string;
  /** pagination request */
  pagination: PageRequest | undefined;
}

/**
 * QueryConsensusStateHeightsResponse is the response type for the
 * Query/ConsensusStateHeights RPC method
 */
export interface QueryConsensusStateHeightsResponse {
  /** consensus state heights */
  consensusStateHeights: Height[];
  /** pagination response */
  pagination: PageResponse | undefined;
}

/**
 * QueryClientStatusRequest is the request type for the Query/ClientStatus RPC
 * method
 */
export interface QueryClientStatusRequest {
  /** client unique identifier */
  clientId: string;
}

/**
 * QueryClientStatusResponse is the response type for the Query/ClientStatus RPC
 * method. It returns the current status of the IBC client.
 */
export interface QueryClientStatusResponse {
  status: string;
}

/**
 * QueryClientParamsRequest is the request type for the Query/ClientParams RPC
 * method.
 */
export interface QueryClientParamsRequest {
}

/**
 * QueryClientParamsResponse is the response type for the Query/ClientParams RPC
 * method.
 */
export interface QueryClientParamsResponse {
  /** params defines the parameters of the module. */
  params: Params | undefined;
}

/**
 * QueryUpgradedClientStateRequest is the request type for the
 * Query/UpgradedClientState RPC method
 */
export interface QueryUpgradedClientStateRequest {
}

/**
 * QueryUpgradedClientStateResponse is the response type for the
 * Query/UpgradedClientState RPC method.
 */
export interface QueryUpgradedClientStateResponse {
  /** client state associated with the request identifier */
  upgradedClientState: Any | undefined;
}

/**
 * QueryUpgradedConsensusStateRequest is the request type for the
 * Query/UpgradedConsensusState RPC method
 */
export interface QueryUpgradedConsensusStateRequest {
}

/**
 * QueryUpgradedConsensusStateResponse is the response type for the
 * Query/UpgradedConsensusState RPC method.
 */
export interface QueryUpgradedConsensusStateResponse {
  /** Consensus state associated with the request identifier */
  upgradedConsensusState: Any | undefined;
}

function createBaseQueryClientStateRequest(): QueryClientStateRequest {
  return { clientId: "" };
}

export const QueryClientStateRequest = {
  encode(message: QueryClientStateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clientId !== "") {
      writer.uint32(10).string(message.clientId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryClientStateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientStateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clientId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryClientStateRequest {
    return { clientId: isSet(object.clientId) ? String(object.clientId) : "" };
  },

  toJSON(message: QueryClientStateRequest): unknown {
    const obj: any = {};
    if (message.clientId !== "") {
      obj.clientId = message.clientId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryClientStateRequest>, I>>(base?: I): QueryClientStateRequest {
    return QueryClientStateRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryClientStateRequest>, I>>(object: I): QueryClientStateRequest {
    const message = createBaseQueryClientStateRequest();
    message.clientId = object.clientId ?? "";
    return message;
  },
};

function createBaseQueryClientStateResponse(): QueryClientStateResponse {
  return { clientState: undefined, proof: new Uint8Array(0), proofHeight: undefined };
}

export const QueryClientStateResponse = {
  encode(message: QueryClientStateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clientState !== undefined) {
      Any.encode(message.clientState, writer.uint32(10).fork()).ldelim();
    }
    if (message.proof.length !== 0) {
      writer.uint32(18).bytes(message.proof);
    }
    if (message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryClientStateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clientState = Any.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.proof = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.proofHeight = Height.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryClientStateResponse {
    return {
      clientState: isSet(object.clientState) ? Any.fromJSON(object.clientState) : undefined,
      proof: isSet(object.proof) ? bytesFromBase64(object.proof) : new Uint8Array(0),
      proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
    };
  },

  toJSON(message: QueryClientStateResponse): unknown {
    const obj: any = {};
    if (message.clientState !== undefined) {
      obj.clientState = Any.toJSON(message.clientState);
    }
    if (message.proof.length !== 0) {
      obj.proof = base64FromBytes(message.proof);
    }
    if (message.proofHeight !== undefined) {
      obj.proofHeight = Height.toJSON(message.proofHeight);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryClientStateResponse>, I>>(base?: I): QueryClientStateResponse {
    return QueryClientStateResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryClientStateResponse>, I>>(object: I): QueryClientStateResponse {
    const message = createBaseQueryClientStateResponse();
    message.clientState = (object.clientState !== undefined && object.clientState !== null)
      ? Any.fromPartial(object.clientState)
      : undefined;
    message.proof = object.proof ?? new Uint8Array(0);
    message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
      ? Height.fromPartial(object.proofHeight)
      : undefined;
    return message;
  },
};

function createBaseQueryClientStatesRequest(): QueryClientStatesRequest {
  return { pagination: undefined };
}

export const QueryClientStatesRequest = {
  encode(message: QueryClientStatesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryClientStatesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientStatesRequest();
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

  fromJSON(object: any): QueryClientStatesRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryClientStatesRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryClientStatesRequest>, I>>(base?: I): QueryClientStatesRequest {
    return QueryClientStatesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryClientStatesRequest>, I>>(object: I): QueryClientStatesRequest {
    const message = createBaseQueryClientStatesRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryClientStatesResponse(): QueryClientStatesResponse {
  return { clientStates: [], pagination: undefined };
}

export const QueryClientStatesResponse = {
  encode(message: QueryClientStatesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.clientStates) {
      IdentifiedClientState.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryClientStatesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientStatesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clientStates.push(IdentifiedClientState.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryClientStatesResponse {
    return {
      clientStates: Array.isArray(object?.clientStates)
        ? object.clientStates.map((e: any) => IdentifiedClientState.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryClientStatesResponse): unknown {
    const obj: any = {};
    if (message.clientStates?.length) {
      obj.clientStates = message.clientStates.map((e) => IdentifiedClientState.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryClientStatesResponse>, I>>(base?: I): QueryClientStatesResponse {
    return QueryClientStatesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryClientStatesResponse>, I>>(object: I): QueryClientStatesResponse {
    const message = createBaseQueryClientStatesResponse();
    message.clientStates = object.clientStates?.map((e) => IdentifiedClientState.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryConsensusStateRequest(): QueryConsensusStateRequest {
  return { clientId: "", revisionNumber: 0, revisionHeight: 0, latestHeight: false };
}

export const QueryConsensusStateRequest = {
  encode(message: QueryConsensusStateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clientId !== "") {
      writer.uint32(10).string(message.clientId);
    }
    if (message.revisionNumber !== 0) {
      writer.uint32(16).uint64(message.revisionNumber);
    }
    if (message.revisionHeight !== 0) {
      writer.uint32(24).uint64(message.revisionHeight);
    }
    if (message.latestHeight === true) {
      writer.uint32(32).bool(message.latestHeight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConsensusStateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsensusStateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clientId = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.revisionNumber = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.revisionHeight = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.latestHeight = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryConsensusStateRequest {
    return {
      clientId: isSet(object.clientId) ? String(object.clientId) : "",
      revisionNumber: isSet(object.revisionNumber) ? Number(object.revisionNumber) : 0,
      revisionHeight: isSet(object.revisionHeight) ? Number(object.revisionHeight) : 0,
      latestHeight: isSet(object.latestHeight) ? Boolean(object.latestHeight) : false,
    };
  },

  toJSON(message: QueryConsensusStateRequest): unknown {
    const obj: any = {};
    if (message.clientId !== "") {
      obj.clientId = message.clientId;
    }
    if (message.revisionNumber !== 0) {
      obj.revisionNumber = Math.round(message.revisionNumber);
    }
    if (message.revisionHeight !== 0) {
      obj.revisionHeight = Math.round(message.revisionHeight);
    }
    if (message.latestHeight === true) {
      obj.latestHeight = message.latestHeight;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryConsensusStateRequest>, I>>(base?: I): QueryConsensusStateRequest {
    return QueryConsensusStateRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryConsensusStateRequest>, I>>(object: I): QueryConsensusStateRequest {
    const message = createBaseQueryConsensusStateRequest();
    message.clientId = object.clientId ?? "";
    message.revisionNumber = object.revisionNumber ?? 0;
    message.revisionHeight = object.revisionHeight ?? 0;
    message.latestHeight = object.latestHeight ?? false;
    return message;
  },
};

function createBaseQueryConsensusStateResponse(): QueryConsensusStateResponse {
  return { consensusState: undefined, proof: new Uint8Array(0), proofHeight: undefined };
}

export const QueryConsensusStateResponse = {
  encode(message: QueryConsensusStateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.consensusState !== undefined) {
      Any.encode(message.consensusState, writer.uint32(10).fork()).ldelim();
    }
    if (message.proof.length !== 0) {
      writer.uint32(18).bytes(message.proof);
    }
    if (message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConsensusStateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsensusStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.consensusState = Any.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.proof = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.proofHeight = Height.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryConsensusStateResponse {
    return {
      consensusState: isSet(object.consensusState) ? Any.fromJSON(object.consensusState) : undefined,
      proof: isSet(object.proof) ? bytesFromBase64(object.proof) : new Uint8Array(0),
      proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
    };
  },

  toJSON(message: QueryConsensusStateResponse): unknown {
    const obj: any = {};
    if (message.consensusState !== undefined) {
      obj.consensusState = Any.toJSON(message.consensusState);
    }
    if (message.proof.length !== 0) {
      obj.proof = base64FromBytes(message.proof);
    }
    if (message.proofHeight !== undefined) {
      obj.proofHeight = Height.toJSON(message.proofHeight);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryConsensusStateResponse>, I>>(base?: I): QueryConsensusStateResponse {
    return QueryConsensusStateResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryConsensusStateResponse>, I>>(object: I): QueryConsensusStateResponse {
    const message = createBaseQueryConsensusStateResponse();
    message.consensusState = (object.consensusState !== undefined && object.consensusState !== null)
      ? Any.fromPartial(object.consensusState)
      : undefined;
    message.proof = object.proof ?? new Uint8Array(0);
    message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
      ? Height.fromPartial(object.proofHeight)
      : undefined;
    return message;
  },
};

function createBaseQueryConsensusStatesRequest(): QueryConsensusStatesRequest {
  return { clientId: "", pagination: undefined };
}

export const QueryConsensusStatesRequest = {
  encode(message: QueryConsensusStatesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clientId !== "") {
      writer.uint32(10).string(message.clientId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConsensusStatesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsensusStatesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clientId = reader.string();
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

  fromJSON(object: any): QueryConsensusStatesRequest {
    return {
      clientId: isSet(object.clientId) ? String(object.clientId) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryConsensusStatesRequest): unknown {
    const obj: any = {};
    if (message.clientId !== "") {
      obj.clientId = message.clientId;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryConsensusStatesRequest>, I>>(base?: I): QueryConsensusStatesRequest {
    return QueryConsensusStatesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryConsensusStatesRequest>, I>>(object: I): QueryConsensusStatesRequest {
    const message = createBaseQueryConsensusStatesRequest();
    message.clientId = object.clientId ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryConsensusStatesResponse(): QueryConsensusStatesResponse {
  return { consensusStates: [], pagination: undefined };
}

export const QueryConsensusStatesResponse = {
  encode(message: QueryConsensusStatesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.consensusStates) {
      ConsensusStateWithHeight.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConsensusStatesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsensusStatesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.consensusStates.push(ConsensusStateWithHeight.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryConsensusStatesResponse {
    return {
      consensusStates: Array.isArray(object?.consensusStates)
        ? object.consensusStates.map((e: any) => ConsensusStateWithHeight.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryConsensusStatesResponse): unknown {
    const obj: any = {};
    if (message.consensusStates?.length) {
      obj.consensusStates = message.consensusStates.map((e) => ConsensusStateWithHeight.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryConsensusStatesResponse>, I>>(base?: I): QueryConsensusStatesResponse {
    return QueryConsensusStatesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryConsensusStatesResponse>, I>>(object: I): QueryConsensusStatesResponse {
    const message = createBaseQueryConsensusStatesResponse();
    message.consensusStates = object.consensusStates?.map((e) => ConsensusStateWithHeight.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryConsensusStateHeightsRequest(): QueryConsensusStateHeightsRequest {
  return { clientId: "", pagination: undefined };
}

export const QueryConsensusStateHeightsRequest = {
  encode(message: QueryConsensusStateHeightsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clientId !== "") {
      writer.uint32(10).string(message.clientId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConsensusStateHeightsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsensusStateHeightsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clientId = reader.string();
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

  fromJSON(object: any): QueryConsensusStateHeightsRequest {
    return {
      clientId: isSet(object.clientId) ? String(object.clientId) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryConsensusStateHeightsRequest): unknown {
    const obj: any = {};
    if (message.clientId !== "") {
      obj.clientId = message.clientId;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryConsensusStateHeightsRequest>, I>>(
    base?: I,
  ): QueryConsensusStateHeightsRequest {
    return QueryConsensusStateHeightsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryConsensusStateHeightsRequest>, I>>(
    object: I,
  ): QueryConsensusStateHeightsRequest {
    const message = createBaseQueryConsensusStateHeightsRequest();
    message.clientId = object.clientId ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryConsensusStateHeightsResponse(): QueryConsensusStateHeightsResponse {
  return { consensusStateHeights: [], pagination: undefined };
}

export const QueryConsensusStateHeightsResponse = {
  encode(message: QueryConsensusStateHeightsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.consensusStateHeights) {
      Height.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConsensusStateHeightsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsensusStateHeightsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.consensusStateHeights.push(Height.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryConsensusStateHeightsResponse {
    return {
      consensusStateHeights: Array.isArray(object?.consensusStateHeights)
        ? object.consensusStateHeights.map((e: any) => Height.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryConsensusStateHeightsResponse): unknown {
    const obj: any = {};
    if (message.consensusStateHeights?.length) {
      obj.consensusStateHeights = message.consensusStateHeights.map((e) => Height.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryConsensusStateHeightsResponse>, I>>(
    base?: I,
  ): QueryConsensusStateHeightsResponse {
    return QueryConsensusStateHeightsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryConsensusStateHeightsResponse>, I>>(
    object: I,
  ): QueryConsensusStateHeightsResponse {
    const message = createBaseQueryConsensusStateHeightsResponse();
    message.consensusStateHeights = object.consensusStateHeights?.map((e) => Height.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryClientStatusRequest(): QueryClientStatusRequest {
  return { clientId: "" };
}

export const QueryClientStatusRequest = {
  encode(message: QueryClientStatusRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clientId !== "") {
      writer.uint32(10).string(message.clientId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryClientStatusRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientStatusRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clientId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryClientStatusRequest {
    return { clientId: isSet(object.clientId) ? String(object.clientId) : "" };
  },

  toJSON(message: QueryClientStatusRequest): unknown {
    const obj: any = {};
    if (message.clientId !== "") {
      obj.clientId = message.clientId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryClientStatusRequest>, I>>(base?: I): QueryClientStatusRequest {
    return QueryClientStatusRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryClientStatusRequest>, I>>(object: I): QueryClientStatusRequest {
    const message = createBaseQueryClientStatusRequest();
    message.clientId = object.clientId ?? "";
    return message;
  },
};

function createBaseQueryClientStatusResponse(): QueryClientStatusResponse {
  return { status: "" };
}

export const QueryClientStatusResponse = {
  encode(message: QueryClientStatusResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== "") {
      writer.uint32(10).string(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryClientStatusResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientStatusResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.status = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryClientStatusResponse {
    return { status: isSet(object.status) ? String(object.status) : "" };
  },

  toJSON(message: QueryClientStatusResponse): unknown {
    const obj: any = {};
    if (message.status !== "") {
      obj.status = message.status;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryClientStatusResponse>, I>>(base?: I): QueryClientStatusResponse {
    return QueryClientStatusResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryClientStatusResponse>, I>>(object: I): QueryClientStatusResponse {
    const message = createBaseQueryClientStatusResponse();
    message.status = object.status ?? "";
    return message;
  },
};

function createBaseQueryClientParamsRequest(): QueryClientParamsRequest {
  return {};
}

export const QueryClientParamsRequest = {
  encode(_: QueryClientParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryClientParamsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientParamsRequest();
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

  fromJSON(_: any): QueryClientParamsRequest {
    return {};
  },

  toJSON(_: QueryClientParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryClientParamsRequest>, I>>(base?: I): QueryClientParamsRequest {
    return QueryClientParamsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryClientParamsRequest>, I>>(_: I): QueryClientParamsRequest {
    const message = createBaseQueryClientParamsRequest();
    return message;
  },
};

function createBaseQueryClientParamsResponse(): QueryClientParamsResponse {
  return { params: undefined };
}

export const QueryClientParamsResponse = {
  encode(message: QueryClientParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryClientParamsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientParamsResponse();
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

  fromJSON(object: any): QueryClientParamsResponse {
    return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
  },

  toJSON(message: QueryClientParamsResponse): unknown {
    const obj: any = {};
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryClientParamsResponse>, I>>(base?: I): QueryClientParamsResponse {
    return QueryClientParamsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryClientParamsResponse>, I>>(object: I): QueryClientParamsResponse {
    const message = createBaseQueryClientParamsResponse();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseQueryUpgradedClientStateRequest(): QueryUpgradedClientStateRequest {
  return {};
}

export const QueryUpgradedClientStateRequest = {
  encode(_: QueryUpgradedClientStateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryUpgradedClientStateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUpgradedClientStateRequest();
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

  fromJSON(_: any): QueryUpgradedClientStateRequest {
    return {};
  },

  toJSON(_: QueryUpgradedClientStateRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryUpgradedClientStateRequest>, I>>(base?: I): QueryUpgradedClientStateRequest {
    return QueryUpgradedClientStateRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryUpgradedClientStateRequest>, I>>(_: I): QueryUpgradedClientStateRequest {
    const message = createBaseQueryUpgradedClientStateRequest();
    return message;
  },
};

function createBaseQueryUpgradedClientStateResponse(): QueryUpgradedClientStateResponse {
  return { upgradedClientState: undefined };
}

export const QueryUpgradedClientStateResponse = {
  encode(message: QueryUpgradedClientStateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.upgradedClientState !== undefined) {
      Any.encode(message.upgradedClientState, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryUpgradedClientStateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUpgradedClientStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.upgradedClientState = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryUpgradedClientStateResponse {
    return {
      upgradedClientState: isSet(object.upgradedClientState) ? Any.fromJSON(object.upgradedClientState) : undefined,
    };
  },

  toJSON(message: QueryUpgradedClientStateResponse): unknown {
    const obj: any = {};
    if (message.upgradedClientState !== undefined) {
      obj.upgradedClientState = Any.toJSON(message.upgradedClientState);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryUpgradedClientStateResponse>, I>>(
    base?: I,
  ): QueryUpgradedClientStateResponse {
    return QueryUpgradedClientStateResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryUpgradedClientStateResponse>, I>>(
    object: I,
  ): QueryUpgradedClientStateResponse {
    const message = createBaseQueryUpgradedClientStateResponse();
    message.upgradedClientState = (object.upgradedClientState !== undefined && object.upgradedClientState !== null)
      ? Any.fromPartial(object.upgradedClientState)
      : undefined;
    return message;
  },
};

function createBaseQueryUpgradedConsensusStateRequest(): QueryUpgradedConsensusStateRequest {
  return {};
}

export const QueryUpgradedConsensusStateRequest = {
  encode(_: QueryUpgradedConsensusStateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryUpgradedConsensusStateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUpgradedConsensusStateRequest();
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

  fromJSON(_: any): QueryUpgradedConsensusStateRequest {
    return {};
  },

  toJSON(_: QueryUpgradedConsensusStateRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryUpgradedConsensusStateRequest>, I>>(
    base?: I,
  ): QueryUpgradedConsensusStateRequest {
    return QueryUpgradedConsensusStateRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryUpgradedConsensusStateRequest>, I>>(
    _: I,
  ): QueryUpgradedConsensusStateRequest {
    const message = createBaseQueryUpgradedConsensusStateRequest();
    return message;
  },
};

function createBaseQueryUpgradedConsensusStateResponse(): QueryUpgradedConsensusStateResponse {
  return { upgradedConsensusState: undefined };
}

export const QueryUpgradedConsensusStateResponse = {
  encode(message: QueryUpgradedConsensusStateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.upgradedConsensusState !== undefined) {
      Any.encode(message.upgradedConsensusState, writer.uint32(10).fork()).ldelim();
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
        case 1:
          if (tag !== 10) {
            break;
          }

          message.upgradedConsensusState = Any.decode(reader, reader.uint32());
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
        ? Any.fromJSON(object.upgradedConsensusState)
        : undefined,
    };
  },

  toJSON(message: QueryUpgradedConsensusStateResponse): unknown {
    const obj: any = {};
    if (message.upgradedConsensusState !== undefined) {
      obj.upgradedConsensusState = Any.toJSON(message.upgradedConsensusState);
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
    message.upgradedConsensusState =
      (object.upgradedConsensusState !== undefined && object.upgradedConsensusState !== null)
        ? Any.fromPartial(object.upgradedConsensusState)
        : undefined;
    return message;
  },
};

/** Query provides defines the gRPC querier service */
export interface Query {
  /** ClientState queries an IBC light client. */
  ClientState(request: QueryClientStateRequest): Promise<QueryClientStateResponse>;
  /** ClientStates queries all the IBC light clients of a chain. */
  ClientStates(request: QueryClientStatesRequest): Promise<QueryClientStatesResponse>;
  /**
   * ConsensusState queries a consensus state associated with a client state at
   * a given height.
   */
  ConsensusState(request: QueryConsensusStateRequest): Promise<QueryConsensusStateResponse>;
  /**
   * ConsensusStates queries all the consensus state associated with a given
   * client.
   */
  ConsensusStates(request: QueryConsensusStatesRequest): Promise<QueryConsensusStatesResponse>;
  /** ConsensusStateHeights queries the height of every consensus states associated with a given client. */
  ConsensusStateHeights(request: QueryConsensusStateHeightsRequest): Promise<QueryConsensusStateHeightsResponse>;
  /** Status queries the status of an IBC client. */
  ClientStatus(request: QueryClientStatusRequest): Promise<QueryClientStatusResponse>;
  /** ClientParams queries all parameters of the ibc client submodule. */
  ClientParams(request: QueryClientParamsRequest): Promise<QueryClientParamsResponse>;
  /** UpgradedClientState queries an Upgraded IBC light client. */
  UpgradedClientState(request: QueryUpgradedClientStateRequest): Promise<QueryUpgradedClientStateResponse>;
  /** UpgradedConsensusState queries an Upgraded IBC consensus state. */
  UpgradedConsensusState(request: QueryUpgradedConsensusStateRequest): Promise<QueryUpgradedConsensusStateResponse>;
}

export const QueryServiceName = "ibc.core.client.v1.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.ClientState = this.ClientState.bind(this);
    this.ClientStates = this.ClientStates.bind(this);
    this.ConsensusState = this.ConsensusState.bind(this);
    this.ConsensusStates = this.ConsensusStates.bind(this);
    this.ConsensusStateHeights = this.ConsensusStateHeights.bind(this);
    this.ClientStatus = this.ClientStatus.bind(this);
    this.ClientParams = this.ClientParams.bind(this);
    this.UpgradedClientState = this.UpgradedClientState.bind(this);
    this.UpgradedConsensusState = this.UpgradedConsensusState.bind(this);
  }
  ClientState(request: QueryClientStateRequest): Promise<QueryClientStateResponse> {
    const data = QueryClientStateRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ClientState", data);
    return promise.then((data) => QueryClientStateResponse.decode(_m0.Reader.create(data)));
  }

  ClientStates(request: QueryClientStatesRequest): Promise<QueryClientStatesResponse> {
    const data = QueryClientStatesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ClientStates", data);
    return promise.then((data) => QueryClientStatesResponse.decode(_m0.Reader.create(data)));
  }

  ConsensusState(request: QueryConsensusStateRequest): Promise<QueryConsensusStateResponse> {
    const data = QueryConsensusStateRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ConsensusState", data);
    return promise.then((data) => QueryConsensusStateResponse.decode(_m0.Reader.create(data)));
  }

  ConsensusStates(request: QueryConsensusStatesRequest): Promise<QueryConsensusStatesResponse> {
    const data = QueryConsensusStatesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ConsensusStates", data);
    return promise.then((data) => QueryConsensusStatesResponse.decode(_m0.Reader.create(data)));
  }

  ConsensusStateHeights(request: QueryConsensusStateHeightsRequest): Promise<QueryConsensusStateHeightsResponse> {
    const data = QueryConsensusStateHeightsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ConsensusStateHeights", data);
    return promise.then((data) => QueryConsensusStateHeightsResponse.decode(_m0.Reader.create(data)));
  }

  ClientStatus(request: QueryClientStatusRequest): Promise<QueryClientStatusResponse> {
    const data = QueryClientStatusRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ClientStatus", data);
    return promise.then((data) => QueryClientStatusResponse.decode(_m0.Reader.create(data)));
  }

  ClientParams(request: QueryClientParamsRequest): Promise<QueryClientParamsResponse> {
    const data = QueryClientParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ClientParams", data);
    return promise.then((data) => QueryClientParamsResponse.decode(_m0.Reader.create(data)));
  }

  UpgradedClientState(request: QueryUpgradedClientStateRequest): Promise<QueryUpgradedClientStateResponse> {
    const data = QueryUpgradedClientStateRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpgradedClientState", data);
    return promise.then((data) => QueryUpgradedClientStateResponse.decode(_m0.Reader.create(data)));
  }

  UpgradedConsensusState(request: QueryUpgradedConsensusStateRequest): Promise<QueryUpgradedConsensusStateResponse> {
    const data = QueryUpgradedConsensusStateRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpgradedConsensusState", data);
    return promise.then((data) => QueryUpgradedConsensusStateResponse.decode(_m0.Reader.create(data)));
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
