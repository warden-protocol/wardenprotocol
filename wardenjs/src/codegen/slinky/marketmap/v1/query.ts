//@ts-nocheck
import { CurrencyPair, CurrencyPairAmino, CurrencyPairSDKType } from "../../types/v1/currency_pair.js";
import { MarketMap, MarketMapAmino, MarketMapSDKType, Market, MarketAmino, MarketSDKType } from "./market.js";
import { Params, ParamsAmino, ParamsSDKType } from "./params.js";
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { JsonSafe } from "../../../json-safe.js";
import { isSet } from "../../../helpers.js";
/**
 * MarketMapRequest is the query request for the MarketMap query.
 * It takes no arguments.
 */
export interface MarketMapRequest {}
export interface MarketMapRequestProtoMsg {
  typeUrl: "/slinky.marketmap.v1.MarketMapRequest";
  value: Uint8Array;
}
/**
 * MarketMapRequest is the query request for the MarketMap query.
 * It takes no arguments.
 */
export interface MarketMapRequestAmino {}
export interface MarketMapRequestAminoMsg {
  type: "/slinky.marketmap.v1.MarketMapRequest";
  value: MarketMapRequestAmino;
}
/**
 * MarketMapRequest is the query request for the MarketMap query.
 * It takes no arguments.
 */
export interface MarketMapRequestSDKType {}
/** MarketMapResponse is the query response for the MarketMap query. */
export interface MarketMapResponse {
  /**
   * MarketMap defines the global set of market configurations for all providers
   * and markets.
   */
  marketMap: MarketMap;
  /**
   * LastUpdated is the last block height that the market map was updated.
   * This field can be used as an optimization for clients checking if there
   * is a new update to the map.
   */
  lastUpdated: bigint;
  /** ChainId is the chain identifier for the market map. */
  chainId: string;
}
export interface MarketMapResponseProtoMsg {
  typeUrl: "/slinky.marketmap.v1.MarketMapResponse";
  value: Uint8Array;
}
/** MarketMapResponse is the query response for the MarketMap query. */
export interface MarketMapResponseAmino {
  /**
   * MarketMap defines the global set of market configurations for all providers
   * and markets.
   */
  market_map?: MarketMapAmino;
  /**
   * LastUpdated is the last block height that the market map was updated.
   * This field can be used as an optimization for clients checking if there
   * is a new update to the map.
   */
  last_updated?: string;
  /** ChainId is the chain identifier for the market map. */
  chain_id?: string;
}
export interface MarketMapResponseAminoMsg {
  type: "/slinky.marketmap.v1.MarketMapResponse";
  value: MarketMapResponseAmino;
}
/** MarketMapResponse is the query response for the MarketMap query. */
export interface MarketMapResponseSDKType {
  market_map: MarketMapSDKType;
  last_updated: bigint;
  chain_id: string;
}
/**
 * MarketRequest is the query request for the Market query.
 * It takes the currency pair of the market as an argument.
 */
export interface MarketRequest {
  /**
   * CurrencyPair is the currency pair associated with the market being
   * requested.
   */
  currencyPair: CurrencyPair;
}
export interface MarketRequestProtoMsg {
  typeUrl: "/slinky.marketmap.v1.MarketRequest";
  value: Uint8Array;
}
/**
 * MarketRequest is the query request for the Market query.
 * It takes the currency pair of the market as an argument.
 */
export interface MarketRequestAmino {
  /**
   * CurrencyPair is the currency pair associated with the market being
   * requested.
   */
  currency_pair?: CurrencyPairAmino;
}
export interface MarketRequestAminoMsg {
  type: "/slinky.marketmap.v1.MarketRequest";
  value: MarketRequestAmino;
}
/**
 * MarketRequest is the query request for the Market query.
 * It takes the currency pair of the market as an argument.
 */
export interface MarketRequestSDKType {
  currency_pair: CurrencyPairSDKType;
}
/** MarketResponse is the query response for the Market query. */
export interface MarketResponse {
  /** Market is the configuration of a single market to be price-fetched for. */
  market: Market;
}
export interface MarketResponseProtoMsg {
  typeUrl: "/slinky.marketmap.v1.MarketResponse";
  value: Uint8Array;
}
/** MarketResponse is the query response for the Market query. */
export interface MarketResponseAmino {
  /** Market is the configuration of a single market to be price-fetched for. */
  market?: MarketAmino;
}
export interface MarketResponseAminoMsg {
  type: "/slinky.marketmap.v1.MarketResponse";
  value: MarketResponseAmino;
}
/** MarketResponse is the query response for the Market query. */
export interface MarketResponseSDKType {
  market: MarketSDKType;
}
/** ParamsRequest is the request type for the Query/Params RPC method. */
export interface ParamsRequest {}
export interface ParamsRequestProtoMsg {
  typeUrl: "/slinky.marketmap.v1.ParamsRequest";
  value: Uint8Array;
}
/** ParamsRequest is the request type for the Query/Params RPC method. */
export interface ParamsRequestAmino {}
export interface ParamsRequestAminoMsg {
  type: "/slinky.marketmap.v1.ParamsRequest";
  value: ParamsRequestAmino;
}
/** ParamsRequest is the request type for the Query/Params RPC method. */
export interface ParamsRequestSDKType {}
/** ParamsResponse is the response type for the Query/Params RPC method. */
export interface ParamsResponse {
  /** ParamsResponse is the response type for the Query/Params RPC method. */
  params: Params;
}
export interface ParamsResponseProtoMsg {
  typeUrl: "/slinky.marketmap.v1.ParamsResponse";
  value: Uint8Array;
}
/** ParamsResponse is the response type for the Query/Params RPC method. */
export interface ParamsResponseAmino {
  /** ParamsResponse is the response type for the Query/Params RPC method. */
  params?: ParamsAmino;
}
export interface ParamsResponseAminoMsg {
  type: "/slinky.marketmap.v1.ParamsResponse";
  value: ParamsResponseAmino;
}
/** ParamsResponse is the response type for the Query/Params RPC method. */
export interface ParamsResponseSDKType {
  params: ParamsSDKType;
}
/**
 * LastUpdatedRequest is the request type for the Query/LastUpdated RPC
 * method.
 */
export interface LastUpdatedRequest {}
export interface LastUpdatedRequestProtoMsg {
  typeUrl: "/slinky.marketmap.v1.LastUpdatedRequest";
  value: Uint8Array;
}
/**
 * LastUpdatedRequest is the request type for the Query/LastUpdated RPC
 * method.
 */
export interface LastUpdatedRequestAmino {}
export interface LastUpdatedRequestAminoMsg {
  type: "/slinky.marketmap.v1.LastUpdatedRequest";
  value: LastUpdatedRequestAmino;
}
/**
 * LastUpdatedRequest is the request type for the Query/LastUpdated RPC
 * method.
 */
export interface LastUpdatedRequestSDKType {}
/**
 * LastUpdatedResponse is the response type for the Query/LastUpdated RPC
 * method.
 */
export interface LastUpdatedResponse {
  /**
   * LastUpdatedResponse is the response type for the Query/LastUpdated RPC
   * method.
   */
  lastUpdated: bigint;
}
export interface LastUpdatedResponseProtoMsg {
  typeUrl: "/slinky.marketmap.v1.LastUpdatedResponse";
  value: Uint8Array;
}
/**
 * LastUpdatedResponse is the response type for the Query/LastUpdated RPC
 * method.
 */
export interface LastUpdatedResponseAmino {
  /**
   * LastUpdatedResponse is the response type for the Query/LastUpdated RPC
   * method.
   */
  last_updated?: string;
}
export interface LastUpdatedResponseAminoMsg {
  type: "/slinky.marketmap.v1.LastUpdatedResponse";
  value: LastUpdatedResponseAmino;
}
/**
 * LastUpdatedResponse is the response type for the Query/LastUpdated RPC
 * method.
 */
export interface LastUpdatedResponseSDKType {
  last_updated: bigint;
}
function createBaseMarketMapRequest(): MarketMapRequest {
  return {};
}
export const MarketMapRequest = {
  typeUrl: "/slinky.marketmap.v1.MarketMapRequest",
  encode(_: MarketMapRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MarketMapRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMarketMapRequest();
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
  fromJSON(_: any): MarketMapRequest {
    return {};
  },
  toJSON(_: MarketMapRequest): JsonSafe<MarketMapRequest> {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<MarketMapRequest>): MarketMapRequest {
    const message = createBaseMarketMapRequest();
    return message;
  },
  fromAmino(_: MarketMapRequestAmino): MarketMapRequest {
    const message = createBaseMarketMapRequest();
    return message;
  },
  toAmino(_: MarketMapRequest): MarketMapRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MarketMapRequestAminoMsg): MarketMapRequest {
    return MarketMapRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: MarketMapRequestProtoMsg): MarketMapRequest {
    return MarketMapRequest.decode(message.value);
  },
  toProto(message: MarketMapRequest): Uint8Array {
    return MarketMapRequest.encode(message).finish();
  },
  toProtoMsg(message: MarketMapRequest): MarketMapRequestProtoMsg {
    return {
      typeUrl: "/slinky.marketmap.v1.MarketMapRequest",
      value: MarketMapRequest.encode(message).finish()
    };
  }
};
function createBaseMarketMapResponse(): MarketMapResponse {
  return {
    marketMap: MarketMap.fromPartial({}),
    lastUpdated: BigInt(0),
    chainId: ""
  };
}
export const MarketMapResponse = {
  typeUrl: "/slinky.marketmap.v1.MarketMapResponse",
  encode(message: MarketMapResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.marketMap !== undefined) {
      MarketMap.encode(message.marketMap, writer.uint32(10).fork()).ldelim();
    }
    if (message.lastUpdated !== BigInt(0)) {
      writer.uint32(16).uint64(message.lastUpdated);
    }
    if (message.chainId !== "") {
      writer.uint32(26).string(message.chainId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MarketMapResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMarketMapResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.marketMap = MarketMap.decode(reader, reader.uint32());
          break;
        case 2:
          message.lastUpdated = reader.uint64();
          break;
        case 3:
          message.chainId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MarketMapResponse {
    return {
      marketMap: isSet(object.marketMap) ? MarketMap.fromJSON(object.marketMap) : undefined,
      lastUpdated: isSet(object.lastUpdated) ? BigInt(object.lastUpdated.toString()) : BigInt(0),
      chainId: isSet(object.chainId) ? String(object.chainId) : ""
    };
  },
  toJSON(message: MarketMapResponse): JsonSafe<MarketMapResponse> {
    const obj: any = {};
    message.marketMap !== undefined && (obj.marketMap = message.marketMap ? MarketMap.toJSON(message.marketMap) : undefined);
    message.lastUpdated !== undefined && (obj.lastUpdated = (message.lastUpdated || BigInt(0)).toString());
    message.chainId !== undefined && (obj.chainId = message.chainId);
    return obj;
  },
  fromPartial(object: Partial<MarketMapResponse>): MarketMapResponse {
    const message = createBaseMarketMapResponse();
    message.marketMap = object.marketMap !== undefined && object.marketMap !== null ? MarketMap.fromPartial(object.marketMap) : undefined;
    message.lastUpdated = object.lastUpdated !== undefined && object.lastUpdated !== null ? BigInt(object.lastUpdated.toString()) : BigInt(0);
    message.chainId = object.chainId ?? "";
    return message;
  },
  fromAmino(object: MarketMapResponseAmino): MarketMapResponse {
    const message = createBaseMarketMapResponse();
    if (object.market_map !== undefined && object.market_map !== null) {
      message.marketMap = MarketMap.fromAmino(object.market_map);
    }
    if (object.last_updated !== undefined && object.last_updated !== null) {
      message.lastUpdated = BigInt(object.last_updated);
    }
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    return message;
  },
  toAmino(message: MarketMapResponse): MarketMapResponseAmino {
    const obj: any = {};
    obj.market_map = message.marketMap ? MarketMap.toAmino(message.marketMap) : undefined;
    obj.last_updated = message.lastUpdated !== BigInt(0) ? message.lastUpdated.toString() : undefined;
    obj.chain_id = message.chainId === "" ? undefined : message.chainId;
    return obj;
  },
  fromAminoMsg(object: MarketMapResponseAminoMsg): MarketMapResponse {
    return MarketMapResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MarketMapResponseProtoMsg): MarketMapResponse {
    return MarketMapResponse.decode(message.value);
  },
  toProto(message: MarketMapResponse): Uint8Array {
    return MarketMapResponse.encode(message).finish();
  },
  toProtoMsg(message: MarketMapResponse): MarketMapResponseProtoMsg {
    return {
      typeUrl: "/slinky.marketmap.v1.MarketMapResponse",
      value: MarketMapResponse.encode(message).finish()
    };
  }
};
function createBaseMarketRequest(): MarketRequest {
  return {
    currencyPair: CurrencyPair.fromPartial({})
  };
}
export const MarketRequest = {
  typeUrl: "/slinky.marketmap.v1.MarketRequest",
  encode(message: MarketRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.currencyPair !== undefined) {
      CurrencyPair.encode(message.currencyPair, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MarketRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMarketRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.currencyPair = CurrencyPair.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MarketRequest {
    return {
      currencyPair: isSet(object.currencyPair) ? CurrencyPair.fromJSON(object.currencyPair) : undefined
    };
  },
  toJSON(message: MarketRequest): JsonSafe<MarketRequest> {
    const obj: any = {};
    message.currencyPair !== undefined && (obj.currencyPair = message.currencyPair ? CurrencyPair.toJSON(message.currencyPair) : undefined);
    return obj;
  },
  fromPartial(object: Partial<MarketRequest>): MarketRequest {
    const message = createBaseMarketRequest();
    message.currencyPair = object.currencyPair !== undefined && object.currencyPair !== null ? CurrencyPair.fromPartial(object.currencyPair) : undefined;
    return message;
  },
  fromAmino(object: MarketRequestAmino): MarketRequest {
    const message = createBaseMarketRequest();
    if (object.currency_pair !== undefined && object.currency_pair !== null) {
      message.currencyPair = CurrencyPair.fromAmino(object.currency_pair);
    }
    return message;
  },
  toAmino(message: MarketRequest): MarketRequestAmino {
    const obj: any = {};
    obj.currency_pair = message.currencyPair ? CurrencyPair.toAmino(message.currencyPair) : undefined;
    return obj;
  },
  fromAminoMsg(object: MarketRequestAminoMsg): MarketRequest {
    return MarketRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: MarketRequestProtoMsg): MarketRequest {
    return MarketRequest.decode(message.value);
  },
  toProto(message: MarketRequest): Uint8Array {
    return MarketRequest.encode(message).finish();
  },
  toProtoMsg(message: MarketRequest): MarketRequestProtoMsg {
    return {
      typeUrl: "/slinky.marketmap.v1.MarketRequest",
      value: MarketRequest.encode(message).finish()
    };
  }
};
function createBaseMarketResponse(): MarketResponse {
  return {
    market: Market.fromPartial({})
  };
}
export const MarketResponse = {
  typeUrl: "/slinky.marketmap.v1.MarketResponse",
  encode(message: MarketResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.market !== undefined) {
      Market.encode(message.market, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MarketResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMarketResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.market = Market.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MarketResponse {
    return {
      market: isSet(object.market) ? Market.fromJSON(object.market) : undefined
    };
  },
  toJSON(message: MarketResponse): JsonSafe<MarketResponse> {
    const obj: any = {};
    message.market !== undefined && (obj.market = message.market ? Market.toJSON(message.market) : undefined);
    return obj;
  },
  fromPartial(object: Partial<MarketResponse>): MarketResponse {
    const message = createBaseMarketResponse();
    message.market = object.market !== undefined && object.market !== null ? Market.fromPartial(object.market) : undefined;
    return message;
  },
  fromAmino(object: MarketResponseAmino): MarketResponse {
    const message = createBaseMarketResponse();
    if (object.market !== undefined && object.market !== null) {
      message.market = Market.fromAmino(object.market);
    }
    return message;
  },
  toAmino(message: MarketResponse): MarketResponseAmino {
    const obj: any = {};
    obj.market = message.market ? Market.toAmino(message.market) : undefined;
    return obj;
  },
  fromAminoMsg(object: MarketResponseAminoMsg): MarketResponse {
    return MarketResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MarketResponseProtoMsg): MarketResponse {
    return MarketResponse.decode(message.value);
  },
  toProto(message: MarketResponse): Uint8Array {
    return MarketResponse.encode(message).finish();
  },
  toProtoMsg(message: MarketResponse): MarketResponseProtoMsg {
    return {
      typeUrl: "/slinky.marketmap.v1.MarketResponse",
      value: MarketResponse.encode(message).finish()
    };
  }
};
function createBaseParamsRequest(): ParamsRequest {
  return {};
}
export const ParamsRequest = {
  typeUrl: "/slinky.marketmap.v1.ParamsRequest",
  encode(_: ParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParamsRequest();
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
  fromJSON(_: any): ParamsRequest {
    return {};
  },
  toJSON(_: ParamsRequest): JsonSafe<ParamsRequest> {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<ParamsRequest>): ParamsRequest {
    const message = createBaseParamsRequest();
    return message;
  },
  fromAmino(_: ParamsRequestAmino): ParamsRequest {
    const message = createBaseParamsRequest();
    return message;
  },
  toAmino(_: ParamsRequest): ParamsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: ParamsRequestAminoMsg): ParamsRequest {
    return ParamsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: ParamsRequestProtoMsg): ParamsRequest {
    return ParamsRequest.decode(message.value);
  },
  toProto(message: ParamsRequest): Uint8Array {
    return ParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: ParamsRequest): ParamsRequestProtoMsg {
    return {
      typeUrl: "/slinky.marketmap.v1.ParamsRequest",
      value: ParamsRequest.encode(message).finish()
    };
  }
};
function createBaseParamsResponse(): ParamsResponse {
  return {
    params: Params.fromPartial({})
  };
}
export const ParamsResponse = {
  typeUrl: "/slinky.marketmap.v1.ParamsResponse",
  encode(message: ParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParamsResponse();
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
  fromJSON(object: any): ParamsResponse {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined
    };
  },
  toJSON(message: ParamsResponse): JsonSafe<ParamsResponse> {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },
  fromPartial(object: Partial<ParamsResponse>): ParamsResponse {
    const message = createBaseParamsResponse();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: ParamsResponseAmino): ParamsResponse {
    const message = createBaseParamsResponse();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: ParamsResponse): ParamsResponseAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    return obj;
  },
  fromAminoMsg(object: ParamsResponseAminoMsg): ParamsResponse {
    return ParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: ParamsResponseProtoMsg): ParamsResponse {
    return ParamsResponse.decode(message.value);
  },
  toProto(message: ParamsResponse): Uint8Array {
    return ParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: ParamsResponse): ParamsResponseProtoMsg {
    return {
      typeUrl: "/slinky.marketmap.v1.ParamsResponse",
      value: ParamsResponse.encode(message).finish()
    };
  }
};
function createBaseLastUpdatedRequest(): LastUpdatedRequest {
  return {};
}
export const LastUpdatedRequest = {
  typeUrl: "/slinky.marketmap.v1.LastUpdatedRequest",
  encode(_: LastUpdatedRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): LastUpdatedRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLastUpdatedRequest();
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
  fromJSON(_: any): LastUpdatedRequest {
    return {};
  },
  toJSON(_: LastUpdatedRequest): JsonSafe<LastUpdatedRequest> {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<LastUpdatedRequest>): LastUpdatedRequest {
    const message = createBaseLastUpdatedRequest();
    return message;
  },
  fromAmino(_: LastUpdatedRequestAmino): LastUpdatedRequest {
    const message = createBaseLastUpdatedRequest();
    return message;
  },
  toAmino(_: LastUpdatedRequest): LastUpdatedRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: LastUpdatedRequestAminoMsg): LastUpdatedRequest {
    return LastUpdatedRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: LastUpdatedRequestProtoMsg): LastUpdatedRequest {
    return LastUpdatedRequest.decode(message.value);
  },
  toProto(message: LastUpdatedRequest): Uint8Array {
    return LastUpdatedRequest.encode(message).finish();
  },
  toProtoMsg(message: LastUpdatedRequest): LastUpdatedRequestProtoMsg {
    return {
      typeUrl: "/slinky.marketmap.v1.LastUpdatedRequest",
      value: LastUpdatedRequest.encode(message).finish()
    };
  }
};
function createBaseLastUpdatedResponse(): LastUpdatedResponse {
  return {
    lastUpdated: BigInt(0)
  };
}
export const LastUpdatedResponse = {
  typeUrl: "/slinky.marketmap.v1.LastUpdatedResponse",
  encode(message: LastUpdatedResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.lastUpdated !== BigInt(0)) {
      writer.uint32(8).uint64(message.lastUpdated);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): LastUpdatedResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLastUpdatedResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lastUpdated = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): LastUpdatedResponse {
    return {
      lastUpdated: isSet(object.lastUpdated) ? BigInt(object.lastUpdated.toString()) : BigInt(0)
    };
  },
  toJSON(message: LastUpdatedResponse): JsonSafe<LastUpdatedResponse> {
    const obj: any = {};
    message.lastUpdated !== undefined && (obj.lastUpdated = (message.lastUpdated || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<LastUpdatedResponse>): LastUpdatedResponse {
    const message = createBaseLastUpdatedResponse();
    message.lastUpdated = object.lastUpdated !== undefined && object.lastUpdated !== null ? BigInt(object.lastUpdated.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: LastUpdatedResponseAmino): LastUpdatedResponse {
    const message = createBaseLastUpdatedResponse();
    if (object.last_updated !== undefined && object.last_updated !== null) {
      message.lastUpdated = BigInt(object.last_updated);
    }
    return message;
  },
  toAmino(message: LastUpdatedResponse): LastUpdatedResponseAmino {
    const obj: any = {};
    obj.last_updated = message.lastUpdated !== BigInt(0) ? message.lastUpdated.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: LastUpdatedResponseAminoMsg): LastUpdatedResponse {
    return LastUpdatedResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: LastUpdatedResponseProtoMsg): LastUpdatedResponse {
    return LastUpdatedResponse.decode(message.value);
  },
  toProto(message: LastUpdatedResponse): Uint8Array {
    return LastUpdatedResponse.encode(message).finish();
  },
  toProtoMsg(message: LastUpdatedResponse): LastUpdatedResponseProtoMsg {
    return {
      typeUrl: "/slinky.marketmap.v1.LastUpdatedResponse",
      value: LastUpdatedResponse.encode(message).finish()
    };
  }
};