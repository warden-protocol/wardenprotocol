/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../../cosmos/base/query/v1beta1/pagination";
import { Coin } from "../../../../cosmos/base/v1beta1/coin";
import { PacketId } from "../../../core/channel/v1/channel";
import { IdentifiedPacketFees } from "./fee";
import { FeeEnabledChannel } from "./genesis";

export const protobufPackage = "ibc.applications.fee.v1";

/** QueryIncentivizedPacketsRequest defines the request type for the IncentivizedPackets rpc */
export interface QueryIncentivizedPacketsRequest {
  /** pagination defines an optional pagination for the request. */
  pagination:
    | PageRequest
    | undefined;
  /** block height at which to query */
  queryHeight: number;
}

/** QueryIncentivizedPacketsResponse defines the response type for the IncentivizedPackets rpc */
export interface QueryIncentivizedPacketsResponse {
  /** list of identified fees for incentivized packets */
  incentivizedPackets: IdentifiedPacketFees[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/** QueryIncentivizedPacketRequest defines the request type for the IncentivizedPacket rpc */
export interface QueryIncentivizedPacketRequest {
  /** unique packet identifier comprised of channel ID, port ID and sequence */
  packetId:
    | PacketId
    | undefined;
  /** block height at which to query */
  queryHeight: number;
}

/** QueryIncentivizedPacketsResponse defines the response type for the IncentivizedPacket rpc */
export interface QueryIncentivizedPacketResponse {
  /** the identified fees for the incentivized packet */
  incentivizedPacket: IdentifiedPacketFees | undefined;
}

/**
 * QueryIncentivizedPacketsForChannelRequest defines the request type for querying for all incentivized packets
 * for a specific channel
 */
export interface QueryIncentivizedPacketsForChannelRequest {
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
  portId: string;
  channelId: string;
  /** Height to query at */
  queryHeight: number;
}

/** QueryIncentivizedPacketsResponse defines the response type for the incentivized packets RPC */
export interface QueryIncentivizedPacketsForChannelResponse {
  /** Map of all incentivized_packets */
  incentivizedPackets: IdentifiedPacketFees[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/** QueryTotalRecvFeesRequest defines the request type for the TotalRecvFees rpc */
export interface QueryTotalRecvFeesRequest {
  /** the packet identifier for the associated fees */
  packetId: PacketId | undefined;
}

/** QueryTotalRecvFeesResponse defines the response type for the TotalRecvFees rpc */
export interface QueryTotalRecvFeesResponse {
  /** the total packet receive fees */
  recvFees: Coin[];
}

/** QueryTotalAckFeesRequest defines the request type for the TotalAckFees rpc */
export interface QueryTotalAckFeesRequest {
  /** the packet identifier for the associated fees */
  packetId: PacketId | undefined;
}

/** QueryTotalAckFeesResponse defines the response type for the TotalAckFees rpc */
export interface QueryTotalAckFeesResponse {
  /** the total packet acknowledgement fees */
  ackFees: Coin[];
}

/** QueryTotalTimeoutFeesRequest defines the request type for the TotalTimeoutFees rpc */
export interface QueryTotalTimeoutFeesRequest {
  /** the packet identifier for the associated fees */
  packetId: PacketId | undefined;
}

/** QueryTotalTimeoutFeesResponse defines the response type for the TotalTimeoutFees rpc */
export interface QueryTotalTimeoutFeesResponse {
  /** the total packet timeout fees */
  timeoutFees: Coin[];
}

/** QueryPayeeRequest defines the request type for the Payee rpc */
export interface QueryPayeeRequest {
  /** unique channel identifier */
  channelId: string;
  /** the relayer address to which the distribution address is registered */
  relayer: string;
}

/** QueryPayeeResponse defines the response type for the Payee rpc */
export interface QueryPayeeResponse {
  /** the payee address to which packet fees are paid out */
  payeeAddress: string;
}

/** QueryCounterpartyPayeeRequest defines the request type for the CounterpartyPayee rpc */
export interface QueryCounterpartyPayeeRequest {
  /** unique channel identifier */
  channelId: string;
  /** the relayer address to which the counterparty is registered */
  relayer: string;
}

/** QueryCounterpartyPayeeResponse defines the response type for the CounterpartyPayee rpc */
export interface QueryCounterpartyPayeeResponse {
  /** the counterparty payee address used to compensate forward relaying */
  counterpartyPayee: string;
}

/** QueryFeeEnabledChannelsRequest defines the request type for the FeeEnabledChannels rpc */
export interface QueryFeeEnabledChannelsRequest {
  /** pagination defines an optional pagination for the request. */
  pagination:
    | PageRequest
    | undefined;
  /** block height at which to query */
  queryHeight: number;
}

/** QueryFeeEnabledChannelsResponse defines the response type for the FeeEnabledChannels rpc */
export interface QueryFeeEnabledChannelsResponse {
  /** list of fee enabled channels */
  feeEnabledChannels: FeeEnabledChannel[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/** QueryFeeEnabledChannelRequest defines the request type for the FeeEnabledChannel rpc */
export interface QueryFeeEnabledChannelRequest {
  /** unique port identifier */
  portId: string;
  /** unique channel identifier */
  channelId: string;
}

/** QueryFeeEnabledChannelResponse defines the response type for the FeeEnabledChannel rpc */
export interface QueryFeeEnabledChannelResponse {
  /** boolean flag representing the fee enabled channel status */
  feeEnabled: boolean;
}

function createBaseQueryIncentivizedPacketsRequest(): QueryIncentivizedPacketsRequest {
  return { pagination: undefined, queryHeight: 0 };
}

export const QueryIncentivizedPacketsRequest = {
  encode(message: QueryIncentivizedPacketsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.queryHeight !== 0) {
      writer.uint32(16).uint64(message.queryHeight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryIncentivizedPacketsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIncentivizedPacketsRequest();
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
          if (tag !== 16) {
            break;
          }

          message.queryHeight = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryIncentivizedPacketsRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      queryHeight: isSet(object.queryHeight) ? Number(object.queryHeight) : 0,
    };
  },

  toJSON(message: QueryIncentivizedPacketsRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    if (message.queryHeight !== 0) {
      obj.queryHeight = Math.round(message.queryHeight);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryIncentivizedPacketsRequest>, I>>(base?: I): QueryIncentivizedPacketsRequest {
    return QueryIncentivizedPacketsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryIncentivizedPacketsRequest>, I>>(
    object: I,
  ): QueryIncentivizedPacketsRequest {
    const message = createBaseQueryIncentivizedPacketsRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    message.queryHeight = object.queryHeight ?? 0;
    return message;
  },
};

function createBaseQueryIncentivizedPacketsResponse(): QueryIncentivizedPacketsResponse {
  return { incentivizedPackets: [], pagination: undefined };
}

export const QueryIncentivizedPacketsResponse = {
  encode(message: QueryIncentivizedPacketsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.incentivizedPackets) {
      IdentifiedPacketFees.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryIncentivizedPacketsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIncentivizedPacketsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.incentivizedPackets.push(IdentifiedPacketFees.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryIncentivizedPacketsResponse {
    return {
      incentivizedPackets: Array.isArray(object?.incentivizedPackets)
        ? object.incentivizedPackets.map((e: any) => IdentifiedPacketFees.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryIncentivizedPacketsResponse): unknown {
    const obj: any = {};
    if (message.incentivizedPackets?.length) {
      obj.incentivizedPackets = message.incentivizedPackets.map((e) => IdentifiedPacketFees.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryIncentivizedPacketsResponse>, I>>(
    base?: I,
  ): QueryIncentivizedPacketsResponse {
    return QueryIncentivizedPacketsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryIncentivizedPacketsResponse>, I>>(
    object: I,
  ): QueryIncentivizedPacketsResponse {
    const message = createBaseQueryIncentivizedPacketsResponse();
    message.incentivizedPackets = object.incentivizedPackets?.map((e) => IdentifiedPacketFees.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryIncentivizedPacketRequest(): QueryIncentivizedPacketRequest {
  return { packetId: undefined, queryHeight: 0 };
}

export const QueryIncentivizedPacketRequest = {
  encode(message: QueryIncentivizedPacketRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.packetId !== undefined) {
      PacketId.encode(message.packetId, writer.uint32(10).fork()).ldelim();
    }
    if (message.queryHeight !== 0) {
      writer.uint32(16).uint64(message.queryHeight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryIncentivizedPacketRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIncentivizedPacketRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.packetId = PacketId.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.queryHeight = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryIncentivizedPacketRequest {
    return {
      packetId: isSet(object.packetId) ? PacketId.fromJSON(object.packetId) : undefined,
      queryHeight: isSet(object.queryHeight) ? Number(object.queryHeight) : 0,
    };
  },

  toJSON(message: QueryIncentivizedPacketRequest): unknown {
    const obj: any = {};
    if (message.packetId !== undefined) {
      obj.packetId = PacketId.toJSON(message.packetId);
    }
    if (message.queryHeight !== 0) {
      obj.queryHeight = Math.round(message.queryHeight);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryIncentivizedPacketRequest>, I>>(base?: I): QueryIncentivizedPacketRequest {
    return QueryIncentivizedPacketRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryIncentivizedPacketRequest>, I>>(
    object: I,
  ): QueryIncentivizedPacketRequest {
    const message = createBaseQueryIncentivizedPacketRequest();
    message.packetId = (object.packetId !== undefined && object.packetId !== null)
      ? PacketId.fromPartial(object.packetId)
      : undefined;
    message.queryHeight = object.queryHeight ?? 0;
    return message;
  },
};

function createBaseQueryIncentivizedPacketResponse(): QueryIncentivizedPacketResponse {
  return { incentivizedPacket: undefined };
}

export const QueryIncentivizedPacketResponse = {
  encode(message: QueryIncentivizedPacketResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.incentivizedPacket !== undefined) {
      IdentifiedPacketFees.encode(message.incentivizedPacket, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryIncentivizedPacketResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIncentivizedPacketResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.incentivizedPacket = IdentifiedPacketFees.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryIncentivizedPacketResponse {
    return {
      incentivizedPacket: isSet(object.incentivizedPacket)
        ? IdentifiedPacketFees.fromJSON(object.incentivizedPacket)
        : undefined,
    };
  },

  toJSON(message: QueryIncentivizedPacketResponse): unknown {
    const obj: any = {};
    if (message.incentivizedPacket !== undefined) {
      obj.incentivizedPacket = IdentifiedPacketFees.toJSON(message.incentivizedPacket);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryIncentivizedPacketResponse>, I>>(base?: I): QueryIncentivizedPacketResponse {
    return QueryIncentivizedPacketResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryIncentivizedPacketResponse>, I>>(
    object: I,
  ): QueryIncentivizedPacketResponse {
    const message = createBaseQueryIncentivizedPacketResponse();
    message.incentivizedPacket = (object.incentivizedPacket !== undefined && object.incentivizedPacket !== null)
      ? IdentifiedPacketFees.fromPartial(object.incentivizedPacket)
      : undefined;
    return message;
  },
};

function createBaseQueryIncentivizedPacketsForChannelRequest(): QueryIncentivizedPacketsForChannelRequest {
  return { pagination: undefined, portId: "", channelId: "", queryHeight: 0 };
}

export const QueryIncentivizedPacketsForChannelRequest = {
  encode(message: QueryIncentivizedPacketsForChannelRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.portId !== "") {
      writer.uint32(18).string(message.portId);
    }
    if (message.channelId !== "") {
      writer.uint32(26).string(message.channelId);
    }
    if (message.queryHeight !== 0) {
      writer.uint32(32).uint64(message.queryHeight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryIncentivizedPacketsForChannelRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIncentivizedPacketsForChannelRequest();
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

          message.portId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.channelId = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.queryHeight = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryIncentivizedPacketsForChannelRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      portId: isSet(object.portId) ? String(object.portId) : "",
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
      queryHeight: isSet(object.queryHeight) ? Number(object.queryHeight) : 0,
    };
  },

  toJSON(message: QueryIncentivizedPacketsForChannelRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    if (message.portId !== "") {
      obj.portId = message.portId;
    }
    if (message.channelId !== "") {
      obj.channelId = message.channelId;
    }
    if (message.queryHeight !== 0) {
      obj.queryHeight = Math.round(message.queryHeight);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryIncentivizedPacketsForChannelRequest>, I>>(
    base?: I,
  ): QueryIncentivizedPacketsForChannelRequest {
    return QueryIncentivizedPacketsForChannelRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryIncentivizedPacketsForChannelRequest>, I>>(
    object: I,
  ): QueryIncentivizedPacketsForChannelRequest {
    const message = createBaseQueryIncentivizedPacketsForChannelRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    message.portId = object.portId ?? "";
    message.channelId = object.channelId ?? "";
    message.queryHeight = object.queryHeight ?? 0;
    return message;
  },
};

function createBaseQueryIncentivizedPacketsForChannelResponse(): QueryIncentivizedPacketsForChannelResponse {
  return { incentivizedPackets: [], pagination: undefined };
}

export const QueryIncentivizedPacketsForChannelResponse = {
  encode(message: QueryIncentivizedPacketsForChannelResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.incentivizedPackets) {
      IdentifiedPacketFees.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryIncentivizedPacketsForChannelResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIncentivizedPacketsForChannelResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.incentivizedPackets.push(IdentifiedPacketFees.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryIncentivizedPacketsForChannelResponse {
    return {
      incentivizedPackets: Array.isArray(object?.incentivizedPackets)
        ? object.incentivizedPackets.map((e: any) => IdentifiedPacketFees.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryIncentivizedPacketsForChannelResponse): unknown {
    const obj: any = {};
    if (message.incentivizedPackets?.length) {
      obj.incentivizedPackets = message.incentivizedPackets.map((e) => IdentifiedPacketFees.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryIncentivizedPacketsForChannelResponse>, I>>(
    base?: I,
  ): QueryIncentivizedPacketsForChannelResponse {
    return QueryIncentivizedPacketsForChannelResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryIncentivizedPacketsForChannelResponse>, I>>(
    object: I,
  ): QueryIncentivizedPacketsForChannelResponse {
    const message = createBaseQueryIncentivizedPacketsForChannelResponse();
    message.incentivizedPackets = object.incentivizedPackets?.map((e) => IdentifiedPacketFees.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryTotalRecvFeesRequest(): QueryTotalRecvFeesRequest {
  return { packetId: undefined };
}

export const QueryTotalRecvFeesRequest = {
  encode(message: QueryTotalRecvFeesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.packetId !== undefined) {
      PacketId.encode(message.packetId, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalRecvFeesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalRecvFeesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.packetId = PacketId.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryTotalRecvFeesRequest {
    return { packetId: isSet(object.packetId) ? PacketId.fromJSON(object.packetId) : undefined };
  },

  toJSON(message: QueryTotalRecvFeesRequest): unknown {
    const obj: any = {};
    if (message.packetId !== undefined) {
      obj.packetId = PacketId.toJSON(message.packetId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryTotalRecvFeesRequest>, I>>(base?: I): QueryTotalRecvFeesRequest {
    return QueryTotalRecvFeesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryTotalRecvFeesRequest>, I>>(object: I): QueryTotalRecvFeesRequest {
    const message = createBaseQueryTotalRecvFeesRequest();
    message.packetId = (object.packetId !== undefined && object.packetId !== null)
      ? PacketId.fromPartial(object.packetId)
      : undefined;
    return message;
  },
};

function createBaseQueryTotalRecvFeesResponse(): QueryTotalRecvFeesResponse {
  return { recvFees: [] };
}

export const QueryTotalRecvFeesResponse = {
  encode(message: QueryTotalRecvFeesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.recvFees) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalRecvFeesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalRecvFeesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.recvFees.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryTotalRecvFeesResponse {
    return { recvFees: Array.isArray(object?.recvFees) ? object.recvFees.map((e: any) => Coin.fromJSON(e)) : [] };
  },

  toJSON(message: QueryTotalRecvFeesResponse): unknown {
    const obj: any = {};
    if (message.recvFees?.length) {
      obj.recvFees = message.recvFees.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryTotalRecvFeesResponse>, I>>(base?: I): QueryTotalRecvFeesResponse {
    return QueryTotalRecvFeesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryTotalRecvFeesResponse>, I>>(object: I): QueryTotalRecvFeesResponse {
    const message = createBaseQueryTotalRecvFeesResponse();
    message.recvFees = object.recvFees?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryTotalAckFeesRequest(): QueryTotalAckFeesRequest {
  return { packetId: undefined };
}

export const QueryTotalAckFeesRequest = {
  encode(message: QueryTotalAckFeesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.packetId !== undefined) {
      PacketId.encode(message.packetId, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalAckFeesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalAckFeesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.packetId = PacketId.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryTotalAckFeesRequest {
    return { packetId: isSet(object.packetId) ? PacketId.fromJSON(object.packetId) : undefined };
  },

  toJSON(message: QueryTotalAckFeesRequest): unknown {
    const obj: any = {};
    if (message.packetId !== undefined) {
      obj.packetId = PacketId.toJSON(message.packetId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryTotalAckFeesRequest>, I>>(base?: I): QueryTotalAckFeesRequest {
    return QueryTotalAckFeesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryTotalAckFeesRequest>, I>>(object: I): QueryTotalAckFeesRequest {
    const message = createBaseQueryTotalAckFeesRequest();
    message.packetId = (object.packetId !== undefined && object.packetId !== null)
      ? PacketId.fromPartial(object.packetId)
      : undefined;
    return message;
  },
};

function createBaseQueryTotalAckFeesResponse(): QueryTotalAckFeesResponse {
  return { ackFees: [] };
}

export const QueryTotalAckFeesResponse = {
  encode(message: QueryTotalAckFeesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.ackFees) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalAckFeesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalAckFeesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ackFees.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryTotalAckFeesResponse {
    return { ackFees: Array.isArray(object?.ackFees) ? object.ackFees.map((e: any) => Coin.fromJSON(e)) : [] };
  },

  toJSON(message: QueryTotalAckFeesResponse): unknown {
    const obj: any = {};
    if (message.ackFees?.length) {
      obj.ackFees = message.ackFees.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryTotalAckFeesResponse>, I>>(base?: I): QueryTotalAckFeesResponse {
    return QueryTotalAckFeesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryTotalAckFeesResponse>, I>>(object: I): QueryTotalAckFeesResponse {
    const message = createBaseQueryTotalAckFeesResponse();
    message.ackFees = object.ackFees?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryTotalTimeoutFeesRequest(): QueryTotalTimeoutFeesRequest {
  return { packetId: undefined };
}

export const QueryTotalTimeoutFeesRequest = {
  encode(message: QueryTotalTimeoutFeesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.packetId !== undefined) {
      PacketId.encode(message.packetId, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalTimeoutFeesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalTimeoutFeesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.packetId = PacketId.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryTotalTimeoutFeesRequest {
    return { packetId: isSet(object.packetId) ? PacketId.fromJSON(object.packetId) : undefined };
  },

  toJSON(message: QueryTotalTimeoutFeesRequest): unknown {
    const obj: any = {};
    if (message.packetId !== undefined) {
      obj.packetId = PacketId.toJSON(message.packetId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryTotalTimeoutFeesRequest>, I>>(base?: I): QueryTotalTimeoutFeesRequest {
    return QueryTotalTimeoutFeesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryTotalTimeoutFeesRequest>, I>>(object: I): QueryTotalTimeoutFeesRequest {
    const message = createBaseQueryTotalTimeoutFeesRequest();
    message.packetId = (object.packetId !== undefined && object.packetId !== null)
      ? PacketId.fromPartial(object.packetId)
      : undefined;
    return message;
  },
};

function createBaseQueryTotalTimeoutFeesResponse(): QueryTotalTimeoutFeesResponse {
  return { timeoutFees: [] };
}

export const QueryTotalTimeoutFeesResponse = {
  encode(message: QueryTotalTimeoutFeesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.timeoutFees) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalTimeoutFeesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalTimeoutFeesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.timeoutFees.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryTotalTimeoutFeesResponse {
    return {
      timeoutFees: Array.isArray(object?.timeoutFees) ? object.timeoutFees.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: QueryTotalTimeoutFeesResponse): unknown {
    const obj: any = {};
    if (message.timeoutFees?.length) {
      obj.timeoutFees = message.timeoutFees.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryTotalTimeoutFeesResponse>, I>>(base?: I): QueryTotalTimeoutFeesResponse {
    return QueryTotalTimeoutFeesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryTotalTimeoutFeesResponse>, I>>(
    object: I,
  ): QueryTotalTimeoutFeesResponse {
    const message = createBaseQueryTotalTimeoutFeesResponse();
    message.timeoutFees = object.timeoutFees?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryPayeeRequest(): QueryPayeeRequest {
  return { channelId: "", relayer: "" };
}

export const QueryPayeeRequest = {
  encode(message: QueryPayeeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channelId !== "") {
      writer.uint32(10).string(message.channelId);
    }
    if (message.relayer !== "") {
      writer.uint32(18).string(message.relayer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPayeeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPayeeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.channelId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.relayer = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryPayeeRequest {
    return {
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
      relayer: isSet(object.relayer) ? String(object.relayer) : "",
    };
  },

  toJSON(message: QueryPayeeRequest): unknown {
    const obj: any = {};
    if (message.channelId !== "") {
      obj.channelId = message.channelId;
    }
    if (message.relayer !== "") {
      obj.relayer = message.relayer;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryPayeeRequest>, I>>(base?: I): QueryPayeeRequest {
    return QueryPayeeRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryPayeeRequest>, I>>(object: I): QueryPayeeRequest {
    const message = createBaseQueryPayeeRequest();
    message.channelId = object.channelId ?? "";
    message.relayer = object.relayer ?? "";
    return message;
  },
};

function createBaseQueryPayeeResponse(): QueryPayeeResponse {
  return { payeeAddress: "" };
}

export const QueryPayeeResponse = {
  encode(message: QueryPayeeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.payeeAddress !== "") {
      writer.uint32(10).string(message.payeeAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPayeeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPayeeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.payeeAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryPayeeResponse {
    return { payeeAddress: isSet(object.payeeAddress) ? String(object.payeeAddress) : "" };
  },

  toJSON(message: QueryPayeeResponse): unknown {
    const obj: any = {};
    if (message.payeeAddress !== "") {
      obj.payeeAddress = message.payeeAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryPayeeResponse>, I>>(base?: I): QueryPayeeResponse {
    return QueryPayeeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryPayeeResponse>, I>>(object: I): QueryPayeeResponse {
    const message = createBaseQueryPayeeResponse();
    message.payeeAddress = object.payeeAddress ?? "";
    return message;
  },
};

function createBaseQueryCounterpartyPayeeRequest(): QueryCounterpartyPayeeRequest {
  return { channelId: "", relayer: "" };
}

export const QueryCounterpartyPayeeRequest = {
  encode(message: QueryCounterpartyPayeeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channelId !== "") {
      writer.uint32(10).string(message.channelId);
    }
    if (message.relayer !== "") {
      writer.uint32(18).string(message.relayer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCounterpartyPayeeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCounterpartyPayeeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.channelId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.relayer = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryCounterpartyPayeeRequest {
    return {
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
      relayer: isSet(object.relayer) ? String(object.relayer) : "",
    };
  },

  toJSON(message: QueryCounterpartyPayeeRequest): unknown {
    const obj: any = {};
    if (message.channelId !== "") {
      obj.channelId = message.channelId;
    }
    if (message.relayer !== "") {
      obj.relayer = message.relayer;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryCounterpartyPayeeRequest>, I>>(base?: I): QueryCounterpartyPayeeRequest {
    return QueryCounterpartyPayeeRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryCounterpartyPayeeRequest>, I>>(
    object: I,
  ): QueryCounterpartyPayeeRequest {
    const message = createBaseQueryCounterpartyPayeeRequest();
    message.channelId = object.channelId ?? "";
    message.relayer = object.relayer ?? "";
    return message;
  },
};

function createBaseQueryCounterpartyPayeeResponse(): QueryCounterpartyPayeeResponse {
  return { counterpartyPayee: "" };
}

export const QueryCounterpartyPayeeResponse = {
  encode(message: QueryCounterpartyPayeeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.counterpartyPayee !== "") {
      writer.uint32(10).string(message.counterpartyPayee);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCounterpartyPayeeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCounterpartyPayeeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.counterpartyPayee = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryCounterpartyPayeeResponse {
    return { counterpartyPayee: isSet(object.counterpartyPayee) ? String(object.counterpartyPayee) : "" };
  },

  toJSON(message: QueryCounterpartyPayeeResponse): unknown {
    const obj: any = {};
    if (message.counterpartyPayee !== "") {
      obj.counterpartyPayee = message.counterpartyPayee;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryCounterpartyPayeeResponse>, I>>(base?: I): QueryCounterpartyPayeeResponse {
    return QueryCounterpartyPayeeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryCounterpartyPayeeResponse>, I>>(
    object: I,
  ): QueryCounterpartyPayeeResponse {
    const message = createBaseQueryCounterpartyPayeeResponse();
    message.counterpartyPayee = object.counterpartyPayee ?? "";
    return message;
  },
};

function createBaseQueryFeeEnabledChannelsRequest(): QueryFeeEnabledChannelsRequest {
  return { pagination: undefined, queryHeight: 0 };
}

export const QueryFeeEnabledChannelsRequest = {
  encode(message: QueryFeeEnabledChannelsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.queryHeight !== 0) {
      writer.uint32(16).uint64(message.queryHeight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryFeeEnabledChannelsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFeeEnabledChannelsRequest();
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
          if (tag !== 16) {
            break;
          }

          message.queryHeight = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryFeeEnabledChannelsRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      queryHeight: isSet(object.queryHeight) ? Number(object.queryHeight) : 0,
    };
  },

  toJSON(message: QueryFeeEnabledChannelsRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    if (message.queryHeight !== 0) {
      obj.queryHeight = Math.round(message.queryHeight);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryFeeEnabledChannelsRequest>, I>>(base?: I): QueryFeeEnabledChannelsRequest {
    return QueryFeeEnabledChannelsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryFeeEnabledChannelsRequest>, I>>(
    object: I,
  ): QueryFeeEnabledChannelsRequest {
    const message = createBaseQueryFeeEnabledChannelsRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    message.queryHeight = object.queryHeight ?? 0;
    return message;
  },
};

function createBaseQueryFeeEnabledChannelsResponse(): QueryFeeEnabledChannelsResponse {
  return { feeEnabledChannels: [], pagination: undefined };
}

export const QueryFeeEnabledChannelsResponse = {
  encode(message: QueryFeeEnabledChannelsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.feeEnabledChannels) {
      FeeEnabledChannel.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryFeeEnabledChannelsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFeeEnabledChannelsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.feeEnabledChannels.push(FeeEnabledChannel.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryFeeEnabledChannelsResponse {
    return {
      feeEnabledChannels: Array.isArray(object?.feeEnabledChannels)
        ? object.feeEnabledChannels.map((e: any) => FeeEnabledChannel.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryFeeEnabledChannelsResponse): unknown {
    const obj: any = {};
    if (message.feeEnabledChannels?.length) {
      obj.feeEnabledChannels = message.feeEnabledChannels.map((e) => FeeEnabledChannel.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryFeeEnabledChannelsResponse>, I>>(base?: I): QueryFeeEnabledChannelsResponse {
    return QueryFeeEnabledChannelsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryFeeEnabledChannelsResponse>, I>>(
    object: I,
  ): QueryFeeEnabledChannelsResponse {
    const message = createBaseQueryFeeEnabledChannelsResponse();
    message.feeEnabledChannels = object.feeEnabledChannels?.map((e) => FeeEnabledChannel.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryFeeEnabledChannelRequest(): QueryFeeEnabledChannelRequest {
  return { portId: "", channelId: "" };
}

export const QueryFeeEnabledChannelRequest = {
  encode(message: QueryFeeEnabledChannelRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryFeeEnabledChannelRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFeeEnabledChannelRequest();
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

  fromJSON(object: any): QueryFeeEnabledChannelRequest {
    return {
      portId: isSet(object.portId) ? String(object.portId) : "",
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
    };
  },

  toJSON(message: QueryFeeEnabledChannelRequest): unknown {
    const obj: any = {};
    if (message.portId !== "") {
      obj.portId = message.portId;
    }
    if (message.channelId !== "") {
      obj.channelId = message.channelId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryFeeEnabledChannelRequest>, I>>(base?: I): QueryFeeEnabledChannelRequest {
    return QueryFeeEnabledChannelRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryFeeEnabledChannelRequest>, I>>(
    object: I,
  ): QueryFeeEnabledChannelRequest {
    const message = createBaseQueryFeeEnabledChannelRequest();
    message.portId = object.portId ?? "";
    message.channelId = object.channelId ?? "";
    return message;
  },
};

function createBaseQueryFeeEnabledChannelResponse(): QueryFeeEnabledChannelResponse {
  return { feeEnabled: false };
}

export const QueryFeeEnabledChannelResponse = {
  encode(message: QueryFeeEnabledChannelResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.feeEnabled === true) {
      writer.uint32(8).bool(message.feeEnabled);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryFeeEnabledChannelResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFeeEnabledChannelResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.feeEnabled = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryFeeEnabledChannelResponse {
    return { feeEnabled: isSet(object.feeEnabled) ? Boolean(object.feeEnabled) : false };
  },

  toJSON(message: QueryFeeEnabledChannelResponse): unknown {
    const obj: any = {};
    if (message.feeEnabled === true) {
      obj.feeEnabled = message.feeEnabled;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryFeeEnabledChannelResponse>, I>>(base?: I): QueryFeeEnabledChannelResponse {
    return QueryFeeEnabledChannelResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryFeeEnabledChannelResponse>, I>>(
    object: I,
  ): QueryFeeEnabledChannelResponse {
    const message = createBaseQueryFeeEnabledChannelResponse();
    message.feeEnabled = object.feeEnabled ?? false;
    return message;
  },
};

/** Query defines the ICS29 gRPC querier service. */
export interface Query {
  /** IncentivizedPackets returns all incentivized packets and their associated fees */
  IncentivizedPackets(request: QueryIncentivizedPacketsRequest): Promise<QueryIncentivizedPacketsResponse>;
  /** IncentivizedPacket returns all packet fees for a packet given its identifier */
  IncentivizedPacket(request: QueryIncentivizedPacketRequest): Promise<QueryIncentivizedPacketResponse>;
  /** Gets all incentivized packets for a specific channel */
  IncentivizedPacketsForChannel(
    request: QueryIncentivizedPacketsForChannelRequest,
  ): Promise<QueryIncentivizedPacketsForChannelResponse>;
  /** TotalRecvFees returns the total receive fees for a packet given its identifier */
  TotalRecvFees(request: QueryTotalRecvFeesRequest): Promise<QueryTotalRecvFeesResponse>;
  /** TotalAckFees returns the total acknowledgement fees for a packet given its identifier */
  TotalAckFees(request: QueryTotalAckFeesRequest): Promise<QueryTotalAckFeesResponse>;
  /** TotalTimeoutFees returns the total timeout fees for a packet given its identifier */
  TotalTimeoutFees(request: QueryTotalTimeoutFeesRequest): Promise<QueryTotalTimeoutFeesResponse>;
  /** Payee returns the registered payee address for a specific channel given the relayer address */
  Payee(request: QueryPayeeRequest): Promise<QueryPayeeResponse>;
  /** CounterpartyPayee returns the registered counterparty payee for forward relaying */
  CounterpartyPayee(request: QueryCounterpartyPayeeRequest): Promise<QueryCounterpartyPayeeResponse>;
  /** FeeEnabledChannels returns a list of all fee enabled channels */
  FeeEnabledChannels(request: QueryFeeEnabledChannelsRequest): Promise<QueryFeeEnabledChannelsResponse>;
  /** FeeEnabledChannel returns true if the provided port and channel identifiers belong to a fee enabled channel */
  FeeEnabledChannel(request: QueryFeeEnabledChannelRequest): Promise<QueryFeeEnabledChannelResponse>;
}

export const QueryServiceName = "ibc.applications.fee.v1.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.IncentivizedPackets = this.IncentivizedPackets.bind(this);
    this.IncentivizedPacket = this.IncentivizedPacket.bind(this);
    this.IncentivizedPacketsForChannel = this.IncentivizedPacketsForChannel.bind(this);
    this.TotalRecvFees = this.TotalRecvFees.bind(this);
    this.TotalAckFees = this.TotalAckFees.bind(this);
    this.TotalTimeoutFees = this.TotalTimeoutFees.bind(this);
    this.Payee = this.Payee.bind(this);
    this.CounterpartyPayee = this.CounterpartyPayee.bind(this);
    this.FeeEnabledChannels = this.FeeEnabledChannels.bind(this);
    this.FeeEnabledChannel = this.FeeEnabledChannel.bind(this);
  }
  IncentivizedPackets(request: QueryIncentivizedPacketsRequest): Promise<QueryIncentivizedPacketsResponse> {
    const data = QueryIncentivizedPacketsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "IncentivizedPackets", data);
    return promise.then((data) => QueryIncentivizedPacketsResponse.decode(_m0.Reader.create(data)));
  }

  IncentivizedPacket(request: QueryIncentivizedPacketRequest): Promise<QueryIncentivizedPacketResponse> {
    const data = QueryIncentivizedPacketRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "IncentivizedPacket", data);
    return promise.then((data) => QueryIncentivizedPacketResponse.decode(_m0.Reader.create(data)));
  }

  IncentivizedPacketsForChannel(
    request: QueryIncentivizedPacketsForChannelRequest,
  ): Promise<QueryIncentivizedPacketsForChannelResponse> {
    const data = QueryIncentivizedPacketsForChannelRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "IncentivizedPacketsForChannel", data);
    return promise.then((data) => QueryIncentivizedPacketsForChannelResponse.decode(_m0.Reader.create(data)));
  }

  TotalRecvFees(request: QueryTotalRecvFeesRequest): Promise<QueryTotalRecvFeesResponse> {
    const data = QueryTotalRecvFeesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "TotalRecvFees", data);
    return promise.then((data) => QueryTotalRecvFeesResponse.decode(_m0.Reader.create(data)));
  }

  TotalAckFees(request: QueryTotalAckFeesRequest): Promise<QueryTotalAckFeesResponse> {
    const data = QueryTotalAckFeesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "TotalAckFees", data);
    return promise.then((data) => QueryTotalAckFeesResponse.decode(_m0.Reader.create(data)));
  }

  TotalTimeoutFees(request: QueryTotalTimeoutFeesRequest): Promise<QueryTotalTimeoutFeesResponse> {
    const data = QueryTotalTimeoutFeesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "TotalTimeoutFees", data);
    return promise.then((data) => QueryTotalTimeoutFeesResponse.decode(_m0.Reader.create(data)));
  }

  Payee(request: QueryPayeeRequest): Promise<QueryPayeeResponse> {
    const data = QueryPayeeRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Payee", data);
    return promise.then((data) => QueryPayeeResponse.decode(_m0.Reader.create(data)));
  }

  CounterpartyPayee(request: QueryCounterpartyPayeeRequest): Promise<QueryCounterpartyPayeeResponse> {
    const data = QueryCounterpartyPayeeRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CounterpartyPayee", data);
    return promise.then((data) => QueryCounterpartyPayeeResponse.decode(_m0.Reader.create(data)));
  }

  FeeEnabledChannels(request: QueryFeeEnabledChannelsRequest): Promise<QueryFeeEnabledChannelsResponse> {
    const data = QueryFeeEnabledChannelsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "FeeEnabledChannels", data);
    return promise.then((data) => QueryFeeEnabledChannelsResponse.decode(_m0.Reader.create(data)));
  }

  FeeEnabledChannel(request: QueryFeeEnabledChannelRequest): Promise<QueryFeeEnabledChannelResponse> {
    const data = QueryFeeEnabledChannelRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "FeeEnabledChannel", data);
    return promise.then((data) => QueryFeeEnabledChannelResponse.decode(_m0.Reader.create(data)));
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
