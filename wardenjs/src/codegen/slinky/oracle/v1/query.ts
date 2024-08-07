//@ts-nocheck
import { CurrencyPair, CurrencyPairAmino, CurrencyPairSDKType } from "../../types/v1/currency_pair.js";
import { QuotePrice, QuotePriceAmino, QuotePriceSDKType } from "./genesis.js";
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { JsonSafe } from "../../../json-safe.js";
import { isSet, isObject } from "../../../helpers.js";
export interface GetAllCurrencyPairsRequest {}
export interface GetAllCurrencyPairsRequestProtoMsg {
  typeUrl: "/slinky.oracle.v1.GetAllCurrencyPairsRequest";
  value: Uint8Array;
}
export interface GetAllCurrencyPairsRequestAmino {}
export interface GetAllCurrencyPairsRequestAminoMsg {
  type: "/slinky.oracle.v1.GetAllCurrencyPairsRequest";
  value: GetAllCurrencyPairsRequestAmino;
}
export interface GetAllCurrencyPairsRequestSDKType {}
/**
 * GetAllCurrencyPairsResponse returns all CurrencyPairs that the module is
 * currently tracking.
 */
export interface GetAllCurrencyPairsResponse {
  currencyPairs: CurrencyPair[];
}
export interface GetAllCurrencyPairsResponseProtoMsg {
  typeUrl: "/slinky.oracle.v1.GetAllCurrencyPairsResponse";
  value: Uint8Array;
}
/**
 * GetAllCurrencyPairsResponse returns all CurrencyPairs that the module is
 * currently tracking.
 */
export interface GetAllCurrencyPairsResponseAmino {
  currency_pairs?: CurrencyPairAmino[];
}
export interface GetAllCurrencyPairsResponseAminoMsg {
  type: "/slinky.oracle.v1.GetAllCurrencyPairsResponse";
  value: GetAllCurrencyPairsResponseAmino;
}
/**
 * GetAllCurrencyPairsResponse returns all CurrencyPairs that the module is
 * currently tracking.
 */
export interface GetAllCurrencyPairsResponseSDKType {
  currency_pairs: CurrencyPairSDKType[];
}
/**
 * GetPriceRequest either takes a CurrencyPair, or an identifier for the
 * CurrencyPair in the format base/quote.
 */
export interface GetPriceRequest {
  /** CurrencyPair represents the pair that the user wishes to query. */
  currencyPair: CurrencyPair;
}
export interface GetPriceRequestProtoMsg {
  typeUrl: "/slinky.oracle.v1.GetPriceRequest";
  value: Uint8Array;
}
/**
 * GetPriceRequest either takes a CurrencyPair, or an identifier for the
 * CurrencyPair in the format base/quote.
 */
export interface GetPriceRequestAmino {
  /** CurrencyPair represents the pair that the user wishes to query. */
  currency_pair?: CurrencyPairAmino;
}
export interface GetPriceRequestAminoMsg {
  type: "/slinky.oracle.v1.GetPriceRequest";
  value: GetPriceRequestAmino;
}
/**
 * GetPriceRequest either takes a CurrencyPair, or an identifier for the
 * CurrencyPair in the format base/quote.
 */
export interface GetPriceRequestSDKType {
  currency_pair: CurrencyPairSDKType;
}
/**
 * GetPriceResponse is the response from the GetPrice grpc method exposed from
 * the x/oracle query service.
 */
export interface GetPriceResponse {
  /**
   * QuotePrice represents the quote-price for the CurrencyPair given in
   * GetPriceRequest (possibly nil if no update has been made)
   */
  price?: QuotePrice;
  /** nonce represents the nonce for the CurrencyPair if it exists in state */
  nonce: bigint;
  /**
   * decimals represents the number of decimals that the quote-price is
   * represented in. For Pairs where ETHEREUM is the quote this will be 18,
   * otherwise it will be 8.
   */
  decimals: bigint;
  /** ID represents the identifier for the CurrencyPair. */
  id: bigint;
}
export interface GetPriceResponseProtoMsg {
  typeUrl: "/slinky.oracle.v1.GetPriceResponse";
  value: Uint8Array;
}
/**
 * GetPriceResponse is the response from the GetPrice grpc method exposed from
 * the x/oracle query service.
 */
export interface GetPriceResponseAmino {
  /**
   * QuotePrice represents the quote-price for the CurrencyPair given in
   * GetPriceRequest (possibly nil if no update has been made)
   */
  price?: QuotePriceAmino;
  /** nonce represents the nonce for the CurrencyPair if it exists in state */
  nonce?: string;
  /**
   * decimals represents the number of decimals that the quote-price is
   * represented in. For Pairs where ETHEREUM is the quote this will be 18,
   * otherwise it will be 8.
   */
  decimals?: string;
  /** ID represents the identifier for the CurrencyPair. */
  id?: string;
}
export interface GetPriceResponseAminoMsg {
  type: "/slinky.oracle.v1.GetPriceResponse";
  value: GetPriceResponseAmino;
}
/**
 * GetPriceResponse is the response from the GetPrice grpc method exposed from
 * the x/oracle query service.
 */
export interface GetPriceResponseSDKType {
  price?: QuotePriceSDKType;
  nonce: bigint;
  decimals: bigint;
  id: bigint;
}
/**
 * GetPricesRequest takes an identifier for the CurrencyPair
 * in the format base/quote.
 */
export interface GetPricesRequest {
  /**
   * GetPricesRequest takes an identifier for the CurrencyPair
   * in the format base/quote.
   */
  currencyPairIds: string[];
}
export interface GetPricesRequestProtoMsg {
  typeUrl: "/slinky.oracle.v1.GetPricesRequest";
  value: Uint8Array;
}
/**
 * GetPricesRequest takes an identifier for the CurrencyPair
 * in the format base/quote.
 */
export interface GetPricesRequestAmino {
  /**
   * GetPricesRequest takes an identifier for the CurrencyPair
   * in the format base/quote.
   */
  currency_pair_ids?: string[];
}
export interface GetPricesRequestAminoMsg {
  type: "/slinky.oracle.v1.GetPricesRequest";
  value: GetPricesRequestAmino;
}
/**
 * GetPricesRequest takes an identifier for the CurrencyPair
 * in the format base/quote.
 */
export interface GetPricesRequestSDKType {
  currency_pair_ids: string[];
}
/**
 * GetPricesResponse is the response from the GetPrices grpc method exposed from
 * the x/oracle query service.
 */
export interface GetPricesResponse {
  prices: GetPriceResponse[];
}
export interface GetPricesResponseProtoMsg {
  typeUrl: "/slinky.oracle.v1.GetPricesResponse";
  value: Uint8Array;
}
/**
 * GetPricesResponse is the response from the GetPrices grpc method exposed from
 * the x/oracle query service.
 */
export interface GetPricesResponseAmino {
  prices?: GetPriceResponseAmino[];
}
export interface GetPricesResponseAminoMsg {
  type: "/slinky.oracle.v1.GetPricesResponse";
  value: GetPricesResponseAmino;
}
/**
 * GetPricesResponse is the response from the GetPrices grpc method exposed from
 * the x/oracle query service.
 */
export interface GetPricesResponseSDKType {
  prices: GetPriceResponseSDKType[];
}
/** GetCurrencyPairMappingRequest is the GetCurrencyPairMapping request type. */
export interface GetCurrencyPairMappingRequest {}
export interface GetCurrencyPairMappingRequestProtoMsg {
  typeUrl: "/slinky.oracle.v1.GetCurrencyPairMappingRequest";
  value: Uint8Array;
}
/** GetCurrencyPairMappingRequest is the GetCurrencyPairMapping request type. */
export interface GetCurrencyPairMappingRequestAmino {}
export interface GetCurrencyPairMappingRequestAminoMsg {
  type: "/slinky.oracle.v1.GetCurrencyPairMappingRequest";
  value: GetCurrencyPairMappingRequestAmino;
}
/** GetCurrencyPairMappingRequest is the GetCurrencyPairMapping request type. */
export interface GetCurrencyPairMappingRequestSDKType {}
export interface GetCurrencyPairMappingResponse_CurrencyPairMappingEntry {
  key: bigint;
  value?: CurrencyPair;
}
export interface GetCurrencyPairMappingResponse_CurrencyPairMappingEntryProtoMsg {
  typeUrl: string;
  value: Uint8Array;
}
export interface GetCurrencyPairMappingResponse_CurrencyPairMappingEntryAmino {
  key?: string;
  value?: CurrencyPairAmino;
}
export interface GetCurrencyPairMappingResponse_CurrencyPairMappingEntryAminoMsg {
  type: string;
  value: GetCurrencyPairMappingResponse_CurrencyPairMappingEntryAmino;
}
export interface GetCurrencyPairMappingResponse_CurrencyPairMappingEntrySDKType {
  key: bigint;
  value?: CurrencyPairSDKType;
}
/** GetCurrencyPairMappingResponse is the GetCurrencyPairMapping response type. */
export interface GetCurrencyPairMappingResponse {
  /**
   * currency_pair_mapping is a mapping of the id representing the currency pair
   * to the currency pair itself.
   */
  currencyPairMapping: {
    [key: bigint]: CurrencyPair;
  };
}
export interface GetCurrencyPairMappingResponseProtoMsg {
  typeUrl: "/slinky.oracle.v1.GetCurrencyPairMappingResponse";
  value: Uint8Array;
}
/** GetCurrencyPairMappingResponse is the GetCurrencyPairMapping response type. */
export interface GetCurrencyPairMappingResponseAmino {
  /**
   * currency_pair_mapping is a mapping of the id representing the currency pair
   * to the currency pair itself.
   */
  currency_pair_mapping?: {
    [key: string]: CurrencyPairAmino;
  };
}
export interface GetCurrencyPairMappingResponseAminoMsg {
  type: "/slinky.oracle.v1.GetCurrencyPairMappingResponse";
  value: GetCurrencyPairMappingResponseAmino;
}
/** GetCurrencyPairMappingResponse is the GetCurrencyPairMapping response type. */
export interface GetCurrencyPairMappingResponseSDKType {
  currency_pair_mapping: {
    [key: bigint]: CurrencyPairSDKType;
  };
}
function createBaseGetAllCurrencyPairsRequest(): GetAllCurrencyPairsRequest {
  return {};
}
export const GetAllCurrencyPairsRequest = {
  typeUrl: "/slinky.oracle.v1.GetAllCurrencyPairsRequest",
  encode(_: GetAllCurrencyPairsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GetAllCurrencyPairsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAllCurrencyPairsRequest();
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
  fromJSON(_: any): GetAllCurrencyPairsRequest {
    return {};
  },
  toJSON(_: GetAllCurrencyPairsRequest): JsonSafe<GetAllCurrencyPairsRequest> {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<GetAllCurrencyPairsRequest>): GetAllCurrencyPairsRequest {
    const message = createBaseGetAllCurrencyPairsRequest();
    return message;
  },
  fromAmino(_: GetAllCurrencyPairsRequestAmino): GetAllCurrencyPairsRequest {
    const message = createBaseGetAllCurrencyPairsRequest();
    return message;
  },
  toAmino(_: GetAllCurrencyPairsRequest): GetAllCurrencyPairsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: GetAllCurrencyPairsRequestAminoMsg): GetAllCurrencyPairsRequest {
    return GetAllCurrencyPairsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: GetAllCurrencyPairsRequestProtoMsg): GetAllCurrencyPairsRequest {
    return GetAllCurrencyPairsRequest.decode(message.value);
  },
  toProto(message: GetAllCurrencyPairsRequest): Uint8Array {
    return GetAllCurrencyPairsRequest.encode(message).finish();
  },
  toProtoMsg(message: GetAllCurrencyPairsRequest): GetAllCurrencyPairsRequestProtoMsg {
    return {
      typeUrl: "/slinky.oracle.v1.GetAllCurrencyPairsRequest",
      value: GetAllCurrencyPairsRequest.encode(message).finish()
    };
  }
};
function createBaseGetAllCurrencyPairsResponse(): GetAllCurrencyPairsResponse {
  return {
    currencyPairs: []
  };
}
export const GetAllCurrencyPairsResponse = {
  typeUrl: "/slinky.oracle.v1.GetAllCurrencyPairsResponse",
  encode(message: GetAllCurrencyPairsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.currencyPairs) {
      CurrencyPair.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GetAllCurrencyPairsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAllCurrencyPairsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.currencyPairs.push(CurrencyPair.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GetAllCurrencyPairsResponse {
    return {
      currencyPairs: Array.isArray(object?.currencyPairs) ? object.currencyPairs.map((e: any) => CurrencyPair.fromJSON(e)) : []
    };
  },
  toJSON(message: GetAllCurrencyPairsResponse): JsonSafe<GetAllCurrencyPairsResponse> {
    const obj: any = {};
    if (message.currencyPairs) {
      obj.currencyPairs = message.currencyPairs.map(e => e ? CurrencyPair.toJSON(e) : undefined);
    } else {
      obj.currencyPairs = [];
    }
    return obj;
  },
  fromPartial(object: Partial<GetAllCurrencyPairsResponse>): GetAllCurrencyPairsResponse {
    const message = createBaseGetAllCurrencyPairsResponse();
    message.currencyPairs = object.currencyPairs?.map(e => CurrencyPair.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GetAllCurrencyPairsResponseAmino): GetAllCurrencyPairsResponse {
    const message = createBaseGetAllCurrencyPairsResponse();
    message.currencyPairs = object.currency_pairs?.map(e => CurrencyPair.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GetAllCurrencyPairsResponse): GetAllCurrencyPairsResponseAmino {
    const obj: any = {};
    if (message.currencyPairs) {
      obj.currency_pairs = message.currencyPairs.map(e => e ? CurrencyPair.toAmino(e) : undefined);
    } else {
      obj.currency_pairs = message.currencyPairs;
    }
    return obj;
  },
  fromAminoMsg(object: GetAllCurrencyPairsResponseAminoMsg): GetAllCurrencyPairsResponse {
    return GetAllCurrencyPairsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: GetAllCurrencyPairsResponseProtoMsg): GetAllCurrencyPairsResponse {
    return GetAllCurrencyPairsResponse.decode(message.value);
  },
  toProto(message: GetAllCurrencyPairsResponse): Uint8Array {
    return GetAllCurrencyPairsResponse.encode(message).finish();
  },
  toProtoMsg(message: GetAllCurrencyPairsResponse): GetAllCurrencyPairsResponseProtoMsg {
    return {
      typeUrl: "/slinky.oracle.v1.GetAllCurrencyPairsResponse",
      value: GetAllCurrencyPairsResponse.encode(message).finish()
    };
  }
};
function createBaseGetPriceRequest(): GetPriceRequest {
  return {
    currencyPair: CurrencyPair.fromPartial({})
  };
}
export const GetPriceRequest = {
  typeUrl: "/slinky.oracle.v1.GetPriceRequest",
  encode(message: GetPriceRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.currencyPair !== undefined) {
      CurrencyPair.encode(message.currencyPair, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GetPriceRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPriceRequest();
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
  fromJSON(object: any): GetPriceRequest {
    return {
      currencyPair: isSet(object.currencyPair) ? CurrencyPair.fromJSON(object.currencyPair) : undefined
    };
  },
  toJSON(message: GetPriceRequest): JsonSafe<GetPriceRequest> {
    const obj: any = {};
    message.currencyPair !== undefined && (obj.currencyPair = message.currencyPair ? CurrencyPair.toJSON(message.currencyPair) : undefined);
    return obj;
  },
  fromPartial(object: Partial<GetPriceRequest>): GetPriceRequest {
    const message = createBaseGetPriceRequest();
    message.currencyPair = object.currencyPair !== undefined && object.currencyPair !== null ? CurrencyPair.fromPartial(object.currencyPair) : undefined;
    return message;
  },
  fromAmino(object: GetPriceRequestAmino): GetPriceRequest {
    const message = createBaseGetPriceRequest();
    if (object.currency_pair !== undefined && object.currency_pair !== null) {
      message.currencyPair = CurrencyPair.fromAmino(object.currency_pair);
    }
    return message;
  },
  toAmino(message: GetPriceRequest): GetPriceRequestAmino {
    const obj: any = {};
    obj.currency_pair = message.currencyPair ? CurrencyPair.toAmino(message.currencyPair) : undefined;
    return obj;
  },
  fromAminoMsg(object: GetPriceRequestAminoMsg): GetPriceRequest {
    return GetPriceRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: GetPriceRequestProtoMsg): GetPriceRequest {
    return GetPriceRequest.decode(message.value);
  },
  toProto(message: GetPriceRequest): Uint8Array {
    return GetPriceRequest.encode(message).finish();
  },
  toProtoMsg(message: GetPriceRequest): GetPriceRequestProtoMsg {
    return {
      typeUrl: "/slinky.oracle.v1.GetPriceRequest",
      value: GetPriceRequest.encode(message).finish()
    };
  }
};
function createBaseGetPriceResponse(): GetPriceResponse {
  return {
    price: undefined,
    nonce: BigInt(0),
    decimals: BigInt(0),
    id: BigInt(0)
  };
}
export const GetPriceResponse = {
  typeUrl: "/slinky.oracle.v1.GetPriceResponse",
  encode(message: GetPriceResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.price !== undefined) {
      QuotePrice.encode(message.price, writer.uint32(10).fork()).ldelim();
    }
    if (message.nonce !== BigInt(0)) {
      writer.uint32(16).uint64(message.nonce);
    }
    if (message.decimals !== BigInt(0)) {
      writer.uint32(24).uint64(message.decimals);
    }
    if (message.id !== BigInt(0)) {
      writer.uint32(32).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GetPriceResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPriceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.price = QuotePrice.decode(reader, reader.uint32());
          break;
        case 2:
          message.nonce = reader.uint64();
          break;
        case 3:
          message.decimals = reader.uint64();
          break;
        case 4:
          message.id = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GetPriceResponse {
    return {
      price: isSet(object.price) ? QuotePrice.fromJSON(object.price) : undefined,
      nonce: isSet(object.nonce) ? BigInt(object.nonce.toString()) : BigInt(0),
      decimals: isSet(object.decimals) ? BigInt(object.decimals.toString()) : BigInt(0),
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0)
    };
  },
  toJSON(message: GetPriceResponse): JsonSafe<GetPriceResponse> {
    const obj: any = {};
    message.price !== undefined && (obj.price = message.price ? QuotePrice.toJSON(message.price) : undefined);
    message.nonce !== undefined && (obj.nonce = (message.nonce || BigInt(0)).toString());
    message.decimals !== undefined && (obj.decimals = (message.decimals || BigInt(0)).toString());
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<GetPriceResponse>): GetPriceResponse {
    const message = createBaseGetPriceResponse();
    message.price = object.price !== undefined && object.price !== null ? QuotePrice.fromPartial(object.price) : undefined;
    message.nonce = object.nonce !== undefined && object.nonce !== null ? BigInt(object.nonce.toString()) : BigInt(0);
    message.decimals = object.decimals !== undefined && object.decimals !== null ? BigInt(object.decimals.toString()) : BigInt(0);
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: GetPriceResponseAmino): GetPriceResponse {
    const message = createBaseGetPriceResponse();
    if (object.price !== undefined && object.price !== null) {
      message.price = QuotePrice.fromAmino(object.price);
    }
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = BigInt(object.nonce);
    }
    if (object.decimals !== undefined && object.decimals !== null) {
      message.decimals = BigInt(object.decimals);
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: GetPriceResponse): GetPriceResponseAmino {
    const obj: any = {};
    obj.price = message.price ? QuotePrice.toAmino(message.price) : undefined;
    obj.nonce = message.nonce !== BigInt(0) ? message.nonce.toString() : undefined;
    obj.decimals = message.decimals !== BigInt(0) ? message.decimals.toString() : undefined;
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: GetPriceResponseAminoMsg): GetPriceResponse {
    return GetPriceResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: GetPriceResponseProtoMsg): GetPriceResponse {
    return GetPriceResponse.decode(message.value);
  },
  toProto(message: GetPriceResponse): Uint8Array {
    return GetPriceResponse.encode(message).finish();
  },
  toProtoMsg(message: GetPriceResponse): GetPriceResponseProtoMsg {
    return {
      typeUrl: "/slinky.oracle.v1.GetPriceResponse",
      value: GetPriceResponse.encode(message).finish()
    };
  }
};
function createBaseGetPricesRequest(): GetPricesRequest {
  return {
    currencyPairIds: []
  };
}
export const GetPricesRequest = {
  typeUrl: "/slinky.oracle.v1.GetPricesRequest",
  encode(message: GetPricesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.currencyPairIds) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GetPricesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPricesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.currencyPairIds.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GetPricesRequest {
    return {
      currencyPairIds: Array.isArray(object?.currencyPairIds) ? object.currencyPairIds.map((e: any) => String(e)) : []
    };
  },
  toJSON(message: GetPricesRequest): JsonSafe<GetPricesRequest> {
    const obj: any = {};
    if (message.currencyPairIds) {
      obj.currencyPairIds = message.currencyPairIds.map(e => e);
    } else {
      obj.currencyPairIds = [];
    }
    return obj;
  },
  fromPartial(object: Partial<GetPricesRequest>): GetPricesRequest {
    const message = createBaseGetPricesRequest();
    message.currencyPairIds = object.currencyPairIds?.map(e => e) || [];
    return message;
  },
  fromAmino(object: GetPricesRequestAmino): GetPricesRequest {
    const message = createBaseGetPricesRequest();
    message.currencyPairIds = object.currency_pair_ids?.map(e => e) || [];
    return message;
  },
  toAmino(message: GetPricesRequest): GetPricesRequestAmino {
    const obj: any = {};
    if (message.currencyPairIds) {
      obj.currency_pair_ids = message.currencyPairIds.map(e => e);
    } else {
      obj.currency_pair_ids = message.currencyPairIds;
    }
    return obj;
  },
  fromAminoMsg(object: GetPricesRequestAminoMsg): GetPricesRequest {
    return GetPricesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: GetPricesRequestProtoMsg): GetPricesRequest {
    return GetPricesRequest.decode(message.value);
  },
  toProto(message: GetPricesRequest): Uint8Array {
    return GetPricesRequest.encode(message).finish();
  },
  toProtoMsg(message: GetPricesRequest): GetPricesRequestProtoMsg {
    return {
      typeUrl: "/slinky.oracle.v1.GetPricesRequest",
      value: GetPricesRequest.encode(message).finish()
    };
  }
};
function createBaseGetPricesResponse(): GetPricesResponse {
  return {
    prices: []
  };
}
export const GetPricesResponse = {
  typeUrl: "/slinky.oracle.v1.GetPricesResponse",
  encode(message: GetPricesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.prices) {
      GetPriceResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GetPricesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPricesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.prices.push(GetPriceResponse.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GetPricesResponse {
    return {
      prices: Array.isArray(object?.prices) ? object.prices.map((e: any) => GetPriceResponse.fromJSON(e)) : []
    };
  },
  toJSON(message: GetPricesResponse): JsonSafe<GetPricesResponse> {
    const obj: any = {};
    if (message.prices) {
      obj.prices = message.prices.map(e => e ? GetPriceResponse.toJSON(e) : undefined);
    } else {
      obj.prices = [];
    }
    return obj;
  },
  fromPartial(object: Partial<GetPricesResponse>): GetPricesResponse {
    const message = createBaseGetPricesResponse();
    message.prices = object.prices?.map(e => GetPriceResponse.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GetPricesResponseAmino): GetPricesResponse {
    const message = createBaseGetPricesResponse();
    message.prices = object.prices?.map(e => GetPriceResponse.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GetPricesResponse): GetPricesResponseAmino {
    const obj: any = {};
    if (message.prices) {
      obj.prices = message.prices.map(e => e ? GetPriceResponse.toAmino(e) : undefined);
    } else {
      obj.prices = message.prices;
    }
    return obj;
  },
  fromAminoMsg(object: GetPricesResponseAminoMsg): GetPricesResponse {
    return GetPricesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: GetPricesResponseProtoMsg): GetPricesResponse {
    return GetPricesResponse.decode(message.value);
  },
  toProto(message: GetPricesResponse): Uint8Array {
    return GetPricesResponse.encode(message).finish();
  },
  toProtoMsg(message: GetPricesResponse): GetPricesResponseProtoMsg {
    return {
      typeUrl: "/slinky.oracle.v1.GetPricesResponse",
      value: GetPricesResponse.encode(message).finish()
    };
  }
};
function createBaseGetCurrencyPairMappingRequest(): GetCurrencyPairMappingRequest {
  return {};
}
export const GetCurrencyPairMappingRequest = {
  typeUrl: "/slinky.oracle.v1.GetCurrencyPairMappingRequest",
  encode(_: GetCurrencyPairMappingRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GetCurrencyPairMappingRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCurrencyPairMappingRequest();
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
  fromJSON(_: any): GetCurrencyPairMappingRequest {
    return {};
  },
  toJSON(_: GetCurrencyPairMappingRequest): JsonSafe<GetCurrencyPairMappingRequest> {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<GetCurrencyPairMappingRequest>): GetCurrencyPairMappingRequest {
    const message = createBaseGetCurrencyPairMappingRequest();
    return message;
  },
  fromAmino(_: GetCurrencyPairMappingRequestAmino): GetCurrencyPairMappingRequest {
    const message = createBaseGetCurrencyPairMappingRequest();
    return message;
  },
  toAmino(_: GetCurrencyPairMappingRequest): GetCurrencyPairMappingRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: GetCurrencyPairMappingRequestAminoMsg): GetCurrencyPairMappingRequest {
    return GetCurrencyPairMappingRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: GetCurrencyPairMappingRequestProtoMsg): GetCurrencyPairMappingRequest {
    return GetCurrencyPairMappingRequest.decode(message.value);
  },
  toProto(message: GetCurrencyPairMappingRequest): Uint8Array {
    return GetCurrencyPairMappingRequest.encode(message).finish();
  },
  toProtoMsg(message: GetCurrencyPairMappingRequest): GetCurrencyPairMappingRequestProtoMsg {
    return {
      typeUrl: "/slinky.oracle.v1.GetCurrencyPairMappingRequest",
      value: GetCurrencyPairMappingRequest.encode(message).finish()
    };
  }
};
function createBaseGetCurrencyPairMappingResponse_CurrencyPairMappingEntry(): GetCurrencyPairMappingResponse_CurrencyPairMappingEntry {
  return {
    key: BigInt(0),
    value: undefined
  };
}
export const GetCurrencyPairMappingResponse_CurrencyPairMappingEntry = {
  encode(message: GetCurrencyPairMappingResponse_CurrencyPairMappingEntry, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.key !== BigInt(0)) {
      writer.uint32(8).uint64(message.key);
    }
    if (message.value !== undefined) {
      CurrencyPair.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GetCurrencyPairMappingResponse_CurrencyPairMappingEntry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCurrencyPairMappingResponse_CurrencyPairMappingEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.uint64();
          break;
        case 2:
          message.value = CurrencyPair.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GetCurrencyPairMappingResponse_CurrencyPairMappingEntry {
    return {
      key: isSet(object.key) ? BigInt(object.key.toString()) : BigInt(0),
      value: isSet(object.value) ? CurrencyPair.fromJSON(object.value) : undefined
    };
  },
  toJSON(message: GetCurrencyPairMappingResponse_CurrencyPairMappingEntry): JsonSafe<GetCurrencyPairMappingResponse_CurrencyPairMappingEntry> {
    const obj: any = {};
    message.key !== undefined && (obj.key = (message.key || BigInt(0)).toString());
    message.value !== undefined && (obj.value = message.value ? CurrencyPair.toJSON(message.value) : undefined);
    return obj;
  },
  fromPartial(object: Partial<GetCurrencyPairMappingResponse_CurrencyPairMappingEntry>): GetCurrencyPairMappingResponse_CurrencyPairMappingEntry {
    const message = createBaseGetCurrencyPairMappingResponse_CurrencyPairMappingEntry();
    message.key = object.key !== undefined && object.key !== null ? BigInt(object.key.toString()) : BigInt(0);
    message.value = object.value !== undefined && object.value !== null ? CurrencyPair.fromPartial(object.value) : undefined;
    return message;
  },
  fromAmino(object: GetCurrencyPairMappingResponse_CurrencyPairMappingEntryAmino): GetCurrencyPairMappingResponse_CurrencyPairMappingEntry {
    const message = createBaseGetCurrencyPairMappingResponse_CurrencyPairMappingEntry();
    if (object.key !== undefined && object.key !== null) {
      message.key = BigInt(object.key);
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = CurrencyPair.fromAmino(object.value);
    }
    return message;
  },
  toAmino(message: GetCurrencyPairMappingResponse_CurrencyPairMappingEntry): GetCurrencyPairMappingResponse_CurrencyPairMappingEntryAmino {
    const obj: any = {};
    obj.key = message.key !== BigInt(0) ? message.key.toString() : undefined;
    obj.value = message.value ? CurrencyPair.toAmino(message.value) : undefined;
    return obj;
  },
  fromAminoMsg(object: GetCurrencyPairMappingResponse_CurrencyPairMappingEntryAminoMsg): GetCurrencyPairMappingResponse_CurrencyPairMappingEntry {
    return GetCurrencyPairMappingResponse_CurrencyPairMappingEntry.fromAmino(object.value);
  },
  fromProtoMsg(message: GetCurrencyPairMappingResponse_CurrencyPairMappingEntryProtoMsg): GetCurrencyPairMappingResponse_CurrencyPairMappingEntry {
    return GetCurrencyPairMappingResponse_CurrencyPairMappingEntry.decode(message.value);
  },
  toProto(message: GetCurrencyPairMappingResponse_CurrencyPairMappingEntry): Uint8Array {
    return GetCurrencyPairMappingResponse_CurrencyPairMappingEntry.encode(message).finish();
  }
};
function createBaseGetCurrencyPairMappingResponse(): GetCurrencyPairMappingResponse {
  return {
    currencyPairMapping: {}
  };
}
export const GetCurrencyPairMappingResponse = {
  typeUrl: "/slinky.oracle.v1.GetCurrencyPairMappingResponse",
  encode(message: GetCurrencyPairMappingResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    Object.entries(message.currencyPairMapping).forEach(([key, value]) => {
      GetCurrencyPairMappingResponse_CurrencyPairMappingEntry.encode({
        key: (key as any),
        value
      }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GetCurrencyPairMappingResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCurrencyPairMappingResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = GetCurrencyPairMappingResponse_CurrencyPairMappingEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.currencyPairMapping[entry1.key] = entry1.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GetCurrencyPairMappingResponse {
    return {
      currencyPairMapping: isObject(object.currencyPairMapping) ? Object.entries(object.currencyPairMapping).reduce<{
        [key: bigint]: CurrencyPair;
      }>((acc, [key, value]) => {
        acc[Number(key)] = CurrencyPair.fromJSON(value);
        return acc;
      }, {}) : {}
    };
  },
  toJSON(message: GetCurrencyPairMappingResponse): JsonSafe<GetCurrencyPairMappingResponse> {
    const obj: any = {};
    obj.currencyPairMapping = {};
    if (message.currencyPairMapping) {
      Object.entries(message.currencyPairMapping).forEach(([k, v]) => {
        obj.currencyPairMapping[k] = CurrencyPair.toJSON(v);
      });
    }
    return obj;
  },
  fromPartial(object: Partial<GetCurrencyPairMappingResponse>): GetCurrencyPairMappingResponse {
    const message = createBaseGetCurrencyPairMappingResponse();
    message.currencyPairMapping = Object.entries(object.currencyPairMapping ?? {}).reduce<{
      [key: bigint]: CurrencyPair;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[Number(key)] = CurrencyPair.fromPartial(value);
      }
      return acc;
    }, {});
    return message;
  },
  fromAmino(object: GetCurrencyPairMappingResponseAmino): GetCurrencyPairMappingResponse {
    const message = createBaseGetCurrencyPairMappingResponse();
    message.currencyPairMapping = Object.entries(object.currency_pair_mapping ?? {}).reduce<{
      [key: bigint]: CurrencyPair;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[Number(key)] = CurrencyPair.fromAmino(value);
      }
      return acc;
    }, {});
    return message;
  },
  toAmino(message: GetCurrencyPairMappingResponse): GetCurrencyPairMappingResponseAmino {
    const obj: any = {};
    obj.currency_pair_mapping = {};
    if (message.currencyPairMapping) {
      Object.entries(message.currencyPairMapping).forEach(([k, v]) => {
        obj.currency_pair_mapping[k] = CurrencyPair.toAmino(v);
      });
    }
    return obj;
  },
  fromAminoMsg(object: GetCurrencyPairMappingResponseAminoMsg): GetCurrencyPairMappingResponse {
    return GetCurrencyPairMappingResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: GetCurrencyPairMappingResponseProtoMsg): GetCurrencyPairMappingResponse {
    return GetCurrencyPairMappingResponse.decode(message.value);
  },
  toProto(message: GetCurrencyPairMappingResponse): Uint8Array {
    return GetCurrencyPairMappingResponse.encode(message).finish();
  },
  toProtoMsg(message: GetCurrencyPairMappingResponse): GetCurrencyPairMappingResponseProtoMsg {
    return {
      typeUrl: "/slinky.oracle.v1.GetCurrencyPairMappingResponse",
      value: GetCurrencyPairMappingResponse.encode(message).finish()
    };
  }
};