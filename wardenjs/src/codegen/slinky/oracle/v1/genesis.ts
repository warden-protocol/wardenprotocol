//@ts-nocheck
import { Timestamp, TimestampSDKType } from "../../../google/protobuf/timestamp.js";
import { CurrencyPair, CurrencyPairAmino, CurrencyPairSDKType } from "../../types/v1/currency_pair.js";
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet, fromJsonTimestamp, fromTimestamp } from "../../../helpers.js";
import { JsonSafe } from "../../../json-safe.js";
/**
 * QuotePrice is the representation of the aggregated prices for a CurrencyPair,
 * where price represents the price of Base in terms of Quote
 */
export interface QuotePrice {
  price: string;
  /**
   * BlockTimestamp tracks the block height associated with this price update.
   * We include block timestamp alongside the price to ensure that smart
   * contracts and applications are not utilizing stale oracle prices
   */
  blockTimestamp: Timestamp;
  /** BlockHeight is height of block mentioned above */
  blockHeight: bigint;
}
export interface QuotePriceProtoMsg {
  typeUrl: "/slinky.oracle.v1.QuotePrice";
  value: Uint8Array;
}
/**
 * QuotePrice is the representation of the aggregated prices for a CurrencyPair,
 * where price represents the price of Base in terms of Quote
 */
export interface QuotePriceAmino {
  price?: string;
  /**
   * BlockTimestamp tracks the block height associated with this price update.
   * We include block timestamp alongside the price to ensure that smart
   * contracts and applications are not utilizing stale oracle prices
   */
  block_timestamp?: string;
  /** BlockHeight is height of block mentioned above */
  block_height?: string;
}
export interface QuotePriceAminoMsg {
  type: "/slinky.oracle.v1.QuotePrice";
  value: QuotePriceAmino;
}
/**
 * QuotePrice is the representation of the aggregated prices for a CurrencyPair,
 * where price represents the price of Base in terms of Quote
 */
export interface QuotePriceSDKType {
  price: string;
  block_timestamp: TimestampSDKType;
  block_height: bigint;
}
/**
 * CurrencyPairState represents the stateful information tracked by the x/oracle
 * module per-currency-pair.
 */
export interface CurrencyPairState {
  /**
   * QuotePrice is the latest price for a currency-pair, notice this value can
   * be null in the case that no price exists for the currency-pair
   */
  price?: QuotePrice;
  /** Nonce is the number of updates this currency-pair has received */
  nonce: bigint;
  /** ID is the ID of the CurrencyPair */
  id: bigint;
}
export interface CurrencyPairStateProtoMsg {
  typeUrl: "/slinky.oracle.v1.CurrencyPairState";
  value: Uint8Array;
}
/**
 * CurrencyPairState represents the stateful information tracked by the x/oracle
 * module per-currency-pair.
 */
export interface CurrencyPairStateAmino {
  /**
   * QuotePrice is the latest price for a currency-pair, notice this value can
   * be null in the case that no price exists for the currency-pair
   */
  price?: QuotePriceAmino;
  /** Nonce is the number of updates this currency-pair has received */
  nonce?: string;
  /** ID is the ID of the CurrencyPair */
  id?: string;
}
export interface CurrencyPairStateAminoMsg {
  type: "/slinky.oracle.v1.CurrencyPairState";
  value: CurrencyPairStateAmino;
}
/**
 * CurrencyPairState represents the stateful information tracked by the x/oracle
 * module per-currency-pair.
 */
export interface CurrencyPairStateSDKType {
  price?: QuotePriceSDKType;
  nonce: bigint;
  id: bigint;
}
/**
 * CurrencyPairGenesis is the information necessary for initialization of a
 * CurrencyPair.
 */
export interface CurrencyPairGenesis {
  /** The CurrencyPair to be added to module state */
  currencyPair: CurrencyPair;
  /**
   * A genesis price if one exists (note this will be empty, unless it results
   * from forking the state of this module)
   */
  currencyPairPrice?: QuotePrice;
  /**
   * nonce is the nonce (number of updates) for the CP (same case as above,
   * likely 0 unless it results from fork of module)
   */
  nonce: bigint;
  /** id is the ID of the CurrencyPair */
  id: bigint;
}
export interface CurrencyPairGenesisProtoMsg {
  typeUrl: "/slinky.oracle.v1.CurrencyPairGenesis";
  value: Uint8Array;
}
/**
 * CurrencyPairGenesis is the information necessary for initialization of a
 * CurrencyPair.
 */
export interface CurrencyPairGenesisAmino {
  /** The CurrencyPair to be added to module state */
  currency_pair?: CurrencyPairAmino;
  /**
   * A genesis price if one exists (note this will be empty, unless it results
   * from forking the state of this module)
   */
  currency_pair_price?: QuotePriceAmino;
  /**
   * nonce is the nonce (number of updates) for the CP (same case as above,
   * likely 0 unless it results from fork of module)
   */
  nonce?: string;
  /** id is the ID of the CurrencyPair */
  id?: string;
}
export interface CurrencyPairGenesisAminoMsg {
  type: "/slinky.oracle.v1.CurrencyPairGenesis";
  value: CurrencyPairGenesisAmino;
}
/**
 * CurrencyPairGenesis is the information necessary for initialization of a
 * CurrencyPair.
 */
export interface CurrencyPairGenesisSDKType {
  currency_pair: CurrencyPairSDKType;
  currency_pair_price?: QuotePriceSDKType;
  nonce: bigint;
  id: bigint;
}
/**
 * GenesisState is the genesis-state for the x/oracle module, it takes a set of
 * predefined CurrencyPairGeneses
 */
export interface GenesisState {
  /**
   * CurrencyPairGenesis is the set of CurrencyPairGeneses for the module. I.e
   * the starting set of CurrencyPairs for the module + information regarding
   * their latest update.
   */
  currencyPairGenesis: CurrencyPairGenesis[];
  /** NextID is the next ID to be used for a CurrencyPair */
  nextId: bigint;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/slinky.oracle.v1.GenesisState";
  value: Uint8Array;
}
/**
 * GenesisState is the genesis-state for the x/oracle module, it takes a set of
 * predefined CurrencyPairGeneses
 */
export interface GenesisStateAmino {
  /**
   * CurrencyPairGenesis is the set of CurrencyPairGeneses for the module. I.e
   * the starting set of CurrencyPairs for the module + information regarding
   * their latest update.
   */
  currency_pair_genesis?: CurrencyPairGenesisAmino[];
  /** NextID is the next ID to be used for a CurrencyPair */
  next_id?: string;
}
export interface GenesisStateAminoMsg {
  type: "/slinky.oracle.v1.GenesisState";
  value: GenesisStateAmino;
}
/**
 * GenesisState is the genesis-state for the x/oracle module, it takes a set of
 * predefined CurrencyPairGeneses
 */
export interface GenesisStateSDKType {
  currency_pair_genesis: CurrencyPairGenesisSDKType[];
  next_id: bigint;
}
function createBaseQuotePrice(): QuotePrice {
  return {
    price: "",
    blockTimestamp: Timestamp.fromPartial({}),
    blockHeight: BigInt(0)
  };
}
export const QuotePrice = {
  typeUrl: "/slinky.oracle.v1.QuotePrice",
  encode(message: QuotePrice, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.price !== "") {
      writer.uint32(10).string(message.price);
    }
    if (message.blockTimestamp !== undefined) {
      Timestamp.encode(message.blockTimestamp, writer.uint32(18).fork()).ldelim();
    }
    if (message.blockHeight !== BigInt(0)) {
      writer.uint32(24).uint64(message.blockHeight);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuotePrice {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuotePrice();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.price = reader.string();
          break;
        case 2:
          message.blockTimestamp = Timestamp.decode(reader, reader.uint32());
          break;
        case 3:
          message.blockHeight = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QuotePrice {
    return {
      price: isSet(object.price) ? String(object.price) : "",
      blockTimestamp: isSet(object.blockTimestamp) ? fromJsonTimestamp(object.blockTimestamp) : undefined,
      blockHeight: isSet(object.blockHeight) ? BigInt(object.blockHeight.toString()) : BigInt(0)
    };
  },
  toJSON(message: QuotePrice): JsonSafe<QuotePrice> {
    const obj: any = {};
    message.price !== undefined && (obj.price = message.price);
    message.blockTimestamp !== undefined && (obj.blockTimestamp = fromTimestamp(message.blockTimestamp).toISOString());
    message.blockHeight !== undefined && (obj.blockHeight = (message.blockHeight || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<QuotePrice>): QuotePrice {
    const message = createBaseQuotePrice();
    message.price = object.price ?? "";
    message.blockTimestamp = object.blockTimestamp !== undefined && object.blockTimestamp !== null ? Timestamp.fromPartial(object.blockTimestamp) : undefined;
    message.blockHeight = object.blockHeight !== undefined && object.blockHeight !== null ? BigInt(object.blockHeight.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QuotePriceAmino): QuotePrice {
    const message = createBaseQuotePrice();
    if (object.price !== undefined && object.price !== null) {
      message.price = object.price;
    }
    if (object.block_timestamp !== undefined && object.block_timestamp !== null) {
      message.blockTimestamp = Timestamp.fromAmino(object.block_timestamp);
    }
    if (object.block_height !== undefined && object.block_height !== null) {
      message.blockHeight = BigInt(object.block_height);
    }
    return message;
  },
  toAmino(message: QuotePrice): QuotePriceAmino {
    const obj: any = {};
    obj.price = message.price === "" ? undefined : message.price;
    obj.block_timestamp = message.blockTimestamp ? Timestamp.toAmino(message.blockTimestamp) : undefined;
    obj.block_height = message.blockHeight !== BigInt(0) ? message.blockHeight.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QuotePriceAminoMsg): QuotePrice {
    return QuotePrice.fromAmino(object.value);
  },
  fromProtoMsg(message: QuotePriceProtoMsg): QuotePrice {
    return QuotePrice.decode(message.value);
  },
  toProto(message: QuotePrice): Uint8Array {
    return QuotePrice.encode(message).finish();
  },
  toProtoMsg(message: QuotePrice): QuotePriceProtoMsg {
    return {
      typeUrl: "/slinky.oracle.v1.QuotePrice",
      value: QuotePrice.encode(message).finish()
    };
  }
};
function createBaseCurrencyPairState(): CurrencyPairState {
  return {
    price: undefined,
    nonce: BigInt(0),
    id: BigInt(0)
  };
}
export const CurrencyPairState = {
  typeUrl: "/slinky.oracle.v1.CurrencyPairState",
  encode(message: CurrencyPairState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.price !== undefined) {
      QuotePrice.encode(message.price, writer.uint32(10).fork()).ldelim();
    }
    if (message.nonce !== BigInt(0)) {
      writer.uint32(16).uint64(message.nonce);
    }
    if (message.id !== BigInt(0)) {
      writer.uint32(24).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): CurrencyPairState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCurrencyPairState();
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
          message.id = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CurrencyPairState {
    return {
      price: isSet(object.price) ? QuotePrice.fromJSON(object.price) : undefined,
      nonce: isSet(object.nonce) ? BigInt(object.nonce.toString()) : BigInt(0),
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0)
    };
  },
  toJSON(message: CurrencyPairState): JsonSafe<CurrencyPairState> {
    const obj: any = {};
    message.price !== undefined && (obj.price = message.price ? QuotePrice.toJSON(message.price) : undefined);
    message.nonce !== undefined && (obj.nonce = (message.nonce || BigInt(0)).toString());
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<CurrencyPairState>): CurrencyPairState {
    const message = createBaseCurrencyPairState();
    message.price = object.price !== undefined && object.price !== null ? QuotePrice.fromPartial(object.price) : undefined;
    message.nonce = object.nonce !== undefined && object.nonce !== null ? BigInt(object.nonce.toString()) : BigInt(0);
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: CurrencyPairStateAmino): CurrencyPairState {
    const message = createBaseCurrencyPairState();
    if (object.price !== undefined && object.price !== null) {
      message.price = QuotePrice.fromAmino(object.price);
    }
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = BigInt(object.nonce);
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: CurrencyPairState): CurrencyPairStateAmino {
    const obj: any = {};
    obj.price = message.price ? QuotePrice.toAmino(message.price) : undefined;
    obj.nonce = message.nonce !== BigInt(0) ? message.nonce.toString() : undefined;
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: CurrencyPairStateAminoMsg): CurrencyPairState {
    return CurrencyPairState.fromAmino(object.value);
  },
  fromProtoMsg(message: CurrencyPairStateProtoMsg): CurrencyPairState {
    return CurrencyPairState.decode(message.value);
  },
  toProto(message: CurrencyPairState): Uint8Array {
    return CurrencyPairState.encode(message).finish();
  },
  toProtoMsg(message: CurrencyPairState): CurrencyPairStateProtoMsg {
    return {
      typeUrl: "/slinky.oracle.v1.CurrencyPairState",
      value: CurrencyPairState.encode(message).finish()
    };
  }
};
function createBaseCurrencyPairGenesis(): CurrencyPairGenesis {
  return {
    currencyPair: CurrencyPair.fromPartial({}),
    currencyPairPrice: undefined,
    nonce: BigInt(0),
    id: BigInt(0)
  };
}
export const CurrencyPairGenesis = {
  typeUrl: "/slinky.oracle.v1.CurrencyPairGenesis",
  encode(message: CurrencyPairGenesis, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.currencyPair !== undefined) {
      CurrencyPair.encode(message.currencyPair, writer.uint32(10).fork()).ldelim();
    }
    if (message.currencyPairPrice !== undefined) {
      QuotePrice.encode(message.currencyPairPrice, writer.uint32(18).fork()).ldelim();
    }
    if (message.nonce !== BigInt(0)) {
      writer.uint32(24).uint64(message.nonce);
    }
    if (message.id !== BigInt(0)) {
      writer.uint32(32).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): CurrencyPairGenesis {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCurrencyPairGenesis();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.currencyPair = CurrencyPair.decode(reader, reader.uint32());
          break;
        case 2:
          message.currencyPairPrice = QuotePrice.decode(reader, reader.uint32());
          break;
        case 3:
          message.nonce = reader.uint64();
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
  fromJSON(object: any): CurrencyPairGenesis {
    return {
      currencyPair: isSet(object.currencyPair) ? CurrencyPair.fromJSON(object.currencyPair) : undefined,
      currencyPairPrice: isSet(object.currencyPairPrice) ? QuotePrice.fromJSON(object.currencyPairPrice) : undefined,
      nonce: isSet(object.nonce) ? BigInt(object.nonce.toString()) : BigInt(0),
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0)
    };
  },
  toJSON(message: CurrencyPairGenesis): JsonSafe<CurrencyPairGenesis> {
    const obj: any = {};
    message.currencyPair !== undefined && (obj.currencyPair = message.currencyPair ? CurrencyPair.toJSON(message.currencyPair) : undefined);
    message.currencyPairPrice !== undefined && (obj.currencyPairPrice = message.currencyPairPrice ? QuotePrice.toJSON(message.currencyPairPrice) : undefined);
    message.nonce !== undefined && (obj.nonce = (message.nonce || BigInt(0)).toString());
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<CurrencyPairGenesis>): CurrencyPairGenesis {
    const message = createBaseCurrencyPairGenesis();
    message.currencyPair = object.currencyPair !== undefined && object.currencyPair !== null ? CurrencyPair.fromPartial(object.currencyPair) : undefined;
    message.currencyPairPrice = object.currencyPairPrice !== undefined && object.currencyPairPrice !== null ? QuotePrice.fromPartial(object.currencyPairPrice) : undefined;
    message.nonce = object.nonce !== undefined && object.nonce !== null ? BigInt(object.nonce.toString()) : BigInt(0);
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: CurrencyPairGenesisAmino): CurrencyPairGenesis {
    const message = createBaseCurrencyPairGenesis();
    if (object.currency_pair !== undefined && object.currency_pair !== null) {
      message.currencyPair = CurrencyPair.fromAmino(object.currency_pair);
    }
    if (object.currency_pair_price !== undefined && object.currency_pair_price !== null) {
      message.currencyPairPrice = QuotePrice.fromAmino(object.currency_pair_price);
    }
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = BigInt(object.nonce);
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: CurrencyPairGenesis): CurrencyPairGenesisAmino {
    const obj: any = {};
    obj.currency_pair = message.currencyPair ? CurrencyPair.toAmino(message.currencyPair) : undefined;
    obj.currency_pair_price = message.currencyPairPrice ? QuotePrice.toAmino(message.currencyPairPrice) : undefined;
    obj.nonce = message.nonce !== BigInt(0) ? message.nonce.toString() : undefined;
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: CurrencyPairGenesisAminoMsg): CurrencyPairGenesis {
    return CurrencyPairGenesis.fromAmino(object.value);
  },
  fromProtoMsg(message: CurrencyPairGenesisProtoMsg): CurrencyPairGenesis {
    return CurrencyPairGenesis.decode(message.value);
  },
  toProto(message: CurrencyPairGenesis): Uint8Array {
    return CurrencyPairGenesis.encode(message).finish();
  },
  toProtoMsg(message: CurrencyPairGenesis): CurrencyPairGenesisProtoMsg {
    return {
      typeUrl: "/slinky.oracle.v1.CurrencyPairGenesis",
      value: CurrencyPairGenesis.encode(message).finish()
    };
  }
};
function createBaseGenesisState(): GenesisState {
  return {
    currencyPairGenesis: [],
    nextId: BigInt(0)
  };
}
export const GenesisState = {
  typeUrl: "/slinky.oracle.v1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.currencyPairGenesis) {
      CurrencyPairGenesis.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.nextId !== BigInt(0)) {
      writer.uint32(16).uint64(message.nextId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.currencyPairGenesis.push(CurrencyPairGenesis.decode(reader, reader.uint32()));
          break;
        case 2:
          message.nextId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GenesisState {
    return {
      currencyPairGenesis: Array.isArray(object?.currencyPairGenesis) ? object.currencyPairGenesis.map((e: any) => CurrencyPairGenesis.fromJSON(e)) : [],
      nextId: isSet(object.nextId) ? BigInt(object.nextId.toString()) : BigInt(0)
    };
  },
  toJSON(message: GenesisState): JsonSafe<GenesisState> {
    const obj: any = {};
    if (message.currencyPairGenesis) {
      obj.currencyPairGenesis = message.currencyPairGenesis.map(e => e ? CurrencyPairGenesis.toJSON(e) : undefined);
    } else {
      obj.currencyPairGenesis = [];
    }
    message.nextId !== undefined && (obj.nextId = (message.nextId || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.currencyPairGenesis = object.currencyPairGenesis?.map(e => CurrencyPairGenesis.fromPartial(e)) || [];
    message.nextId = object.nextId !== undefined && object.nextId !== null ? BigInt(object.nextId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    message.currencyPairGenesis = object.currency_pair_genesis?.map(e => CurrencyPairGenesis.fromAmino(e)) || [];
    if (object.next_id !== undefined && object.next_id !== null) {
      message.nextId = BigInt(object.next_id);
    }
    return message;
  },
  toAmino(message: GenesisState): GenesisStateAmino {
    const obj: any = {};
    if (message.currencyPairGenesis) {
      obj.currency_pair_genesis = message.currencyPairGenesis.map(e => e ? CurrencyPairGenesis.toAmino(e) : undefined);
    } else {
      obj.currency_pair_genesis = message.currencyPairGenesis;
    }
    obj.next_id = message.nextId !== BigInt(0) ? message.nextId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: GenesisStateAminoMsg): GenesisState {
    return GenesisState.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisStateProtoMsg): GenesisState {
    return GenesisState.decode(message.value);
  },
  toProto(message: GenesisState): Uint8Array {
    return GenesisState.encode(message).finish();
  },
  toProtoMsg(message: GenesisState): GenesisStateProtoMsg {
    return {
      typeUrl: "/slinky.oracle.v1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};