//@ts-nocheck
import { CurrencyPair, CurrencyPairAmino, CurrencyPairSDKType } from "../../types/v1/currency_pair.js";
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet, isObject } from "../../../helpers.js";
import { JsonSafe } from "../../../json-safe.js";
/** Market encapsulates a Ticker and its provider-specific configuration. */
export interface Market {
  /**
   * Ticker represents a price feed for a given asset pair i.e. BTC/USD. The
   * price feed is scaled to a number of decimal places and has a minimum number
   * of providers required to consider the ticker valid.
   */
  ticker: Ticker;
  /** ProviderConfigs is the list of provider-specific configs for this Market. */
  providerConfigs: ProviderConfig[];
}
export interface MarketProtoMsg {
  typeUrl: "/slinky.marketmap.v1.Market";
  value: Uint8Array;
}
/** Market encapsulates a Ticker and its provider-specific configuration. */
export interface MarketAmino {
  /**
   * Ticker represents a price feed for a given asset pair i.e. BTC/USD. The
   * price feed is scaled to a number of decimal places and has a minimum number
   * of providers required to consider the ticker valid.
   */
  ticker?: TickerAmino;
  /** ProviderConfigs is the list of provider-specific configs for this Market. */
  provider_configs?: ProviderConfigAmino[];
}
export interface MarketAminoMsg {
  type: "/slinky.marketmap.v1.Market";
  value: MarketAmino;
}
/** Market encapsulates a Ticker and its provider-specific configuration. */
export interface MarketSDKType {
  ticker: TickerSDKType;
  provider_configs: ProviderConfigSDKType[];
}
/**
 * Ticker represents a price feed for a given asset pair i.e. BTC/USD. The price
 * feed is scaled to a number of decimal places and has a minimum number of
 * providers required to consider the ticker valid.
 */
export interface Ticker {
  /** CurrencyPair is the currency pair for this ticker. */
  currencyPair: CurrencyPair;
  /**
   * Decimals is the number of decimal places for the ticker. The number of
   * decimal places is used to convert the price to a human-readable format.
   */
  decimals: bigint;
  /**
   * MinProviderCount is the minimum number of providers required to consider
   * the ticker valid.
   */
  minProviderCount: bigint;
  /**
   * Enabled is the flag that denotes if the Ticker is enabled for price
   * fetching by an oracle.
   */
  enabled: boolean;
  /**
   * MetadataJSON is a string of JSON that encodes any extra configuration
   * for the given ticker.
   */
  metadataJSON: string;
}
export interface TickerProtoMsg {
  typeUrl: "/slinky.marketmap.v1.Ticker";
  value: Uint8Array;
}
/**
 * Ticker represents a price feed for a given asset pair i.e. BTC/USD. The price
 * feed is scaled to a number of decimal places and has a minimum number of
 * providers required to consider the ticker valid.
 */
export interface TickerAmino {
  /** CurrencyPair is the currency pair for this ticker. */
  currency_pair?: CurrencyPairAmino;
  /**
   * Decimals is the number of decimal places for the ticker. The number of
   * decimal places is used to convert the price to a human-readable format.
   */
  decimals?: string;
  /**
   * MinProviderCount is the minimum number of providers required to consider
   * the ticker valid.
   */
  min_provider_count?: string;
  /**
   * Enabled is the flag that denotes if the Ticker is enabled for price
   * fetching by an oracle.
   */
  enabled?: boolean;
  /**
   * MetadataJSON is a string of JSON that encodes any extra configuration
   * for the given ticker.
   */
  metadata_JSON?: string;
}
export interface TickerAminoMsg {
  type: "/slinky.marketmap.v1.Ticker";
  value: TickerAmino;
}
/**
 * Ticker represents a price feed for a given asset pair i.e. BTC/USD. The price
 * feed is scaled to a number of decimal places and has a minimum number of
 * providers required to consider the ticker valid.
 */
export interface TickerSDKType {
  currency_pair: CurrencyPairSDKType;
  decimals: bigint;
  min_provider_count: bigint;
  enabled: boolean;
  metadata_JSON: string;
}
export interface ProviderConfig {
  /**
   * Name corresponds to the name of the provider for which the configuration is
   * being set.
   */
  name: string;
  /**
   * OffChainTicker is the off-chain representation of the ticker i.e. BTC/USD.
   * The off-chain ticker is unique to a given provider and is used to fetch the
   * price of the ticker from the provider.
   */
  offChainTicker: string;
  /**
   * NormalizeByPair is the currency pair for this ticker to be normalized by.
   * For example, if the desired Ticker is BTC/USD, this market could be reached
   * using: OffChainTicker = BTC/USDT NormalizeByPair = USDT/USD This field is
   * optional and nullable.
   */
  normalizeByPair?: CurrencyPair;
  /**
   * Invert is a boolean indicating if the BASE and QUOTE of the market should
   * be inverted. i.e. BASE -> QUOTE, QUOTE -> BASE
   */
  invert: boolean;
  /**
   * MetadataJSON is a string of JSON that encodes any extra configuration
   * for the given provider config.
   */
  metadataJSON: string;
}
export interface ProviderConfigProtoMsg {
  typeUrl: "/slinky.marketmap.v1.ProviderConfig";
  value: Uint8Array;
}
export interface ProviderConfigAmino {
  /**
   * Name corresponds to the name of the provider for which the configuration is
   * being set.
   */
  name?: string;
  /**
   * OffChainTicker is the off-chain representation of the ticker i.e. BTC/USD.
   * The off-chain ticker is unique to a given provider and is used to fetch the
   * price of the ticker from the provider.
   */
  off_chain_ticker?: string;
  /**
   * NormalizeByPair is the currency pair for this ticker to be normalized by.
   * For example, if the desired Ticker is BTC/USD, this market could be reached
   * using: OffChainTicker = BTC/USDT NormalizeByPair = USDT/USD This field is
   * optional and nullable.
   */
  normalize_by_pair?: CurrencyPairAmino;
  /**
   * Invert is a boolean indicating if the BASE and QUOTE of the market should
   * be inverted. i.e. BASE -> QUOTE, QUOTE -> BASE
   */
  invert?: boolean;
  /**
   * MetadataJSON is a string of JSON that encodes any extra configuration
   * for the given provider config.
   */
  metadata_JSON?: string;
}
export interface ProviderConfigAminoMsg {
  type: "/slinky.marketmap.v1.ProviderConfig";
  value: ProviderConfigAmino;
}
export interface ProviderConfigSDKType {
  name: string;
  off_chain_ticker: string;
  normalize_by_pair?: CurrencyPairSDKType;
  invert: boolean;
  metadata_JSON: string;
}
export interface MarketMap_MarketsEntry {
  key: string;
  value?: Market;
}
export interface MarketMap_MarketsEntryProtoMsg {
  typeUrl: string;
  value: Uint8Array;
}
export interface MarketMap_MarketsEntryAmino {
  key?: string;
  value?: MarketAmino;
}
export interface MarketMap_MarketsEntryAminoMsg {
  type: string;
  value: MarketMap_MarketsEntryAmino;
}
export interface MarketMap_MarketsEntrySDKType {
  key: string;
  value?: MarketSDKType;
}
/** MarketMap maps ticker strings to their Markets. */
export interface MarketMap {
  /**
   * Markets is the full list of tickers and their associated configurations
   * to be stored on-chain.
   */
  markets: {
    [key: string]: Market;
  };
}
export interface MarketMapProtoMsg {
  typeUrl: "/slinky.marketmap.v1.MarketMap";
  value: Uint8Array;
}
/** MarketMap maps ticker strings to their Markets. */
export interface MarketMapAmino {
  /**
   * Markets is the full list of tickers and their associated configurations
   * to be stored on-chain.
   */
  markets?: {
    [key: string]: MarketAmino;
  };
}
export interface MarketMapAminoMsg {
  type: "/slinky.marketmap.v1.MarketMap";
  value: MarketMapAmino;
}
/** MarketMap maps ticker strings to their Markets. */
export interface MarketMapSDKType {
  markets: {
    [key: string]: MarketSDKType;
  };
}
function createBaseMarket(): Market {
  return {
    ticker: Ticker.fromPartial({}),
    providerConfigs: []
  };
}
export const Market = {
  typeUrl: "/slinky.marketmap.v1.Market",
  encode(message: Market, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.ticker !== undefined) {
      Ticker.encode(message.ticker, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.providerConfigs) {
      ProviderConfig.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Market {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMarket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ticker = Ticker.decode(reader, reader.uint32());
          break;
        case 2:
          message.providerConfigs.push(ProviderConfig.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Market {
    return {
      ticker: isSet(object.ticker) ? Ticker.fromJSON(object.ticker) : undefined,
      providerConfigs: Array.isArray(object?.providerConfigs) ? object.providerConfigs.map((e: any) => ProviderConfig.fromJSON(e)) : []
    };
  },
  toJSON(message: Market): JsonSafe<Market> {
    const obj: any = {};
    message.ticker !== undefined && (obj.ticker = message.ticker ? Ticker.toJSON(message.ticker) : undefined);
    if (message.providerConfigs) {
      obj.providerConfigs = message.providerConfigs.map(e => e ? ProviderConfig.toJSON(e) : undefined);
    } else {
      obj.providerConfigs = [];
    }
    return obj;
  },
  fromPartial(object: Partial<Market>): Market {
    const message = createBaseMarket();
    message.ticker = object.ticker !== undefined && object.ticker !== null ? Ticker.fromPartial(object.ticker) : undefined;
    message.providerConfigs = object.providerConfigs?.map(e => ProviderConfig.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MarketAmino): Market {
    const message = createBaseMarket();
    if (object.ticker !== undefined && object.ticker !== null) {
      message.ticker = Ticker.fromAmino(object.ticker);
    }
    message.providerConfigs = object.provider_configs?.map(e => ProviderConfig.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: Market): MarketAmino {
    const obj: any = {};
    obj.ticker = message.ticker ? Ticker.toAmino(message.ticker) : undefined;
    if (message.providerConfigs) {
      obj.provider_configs = message.providerConfigs.map(e => e ? ProviderConfig.toAmino(e) : undefined);
    } else {
      obj.provider_configs = message.providerConfigs;
    }
    return obj;
  },
  fromAminoMsg(object: MarketAminoMsg): Market {
    return Market.fromAmino(object.value);
  },
  fromProtoMsg(message: MarketProtoMsg): Market {
    return Market.decode(message.value);
  },
  toProto(message: Market): Uint8Array {
    return Market.encode(message).finish();
  },
  toProtoMsg(message: Market): MarketProtoMsg {
    return {
      typeUrl: "/slinky.marketmap.v1.Market",
      value: Market.encode(message).finish()
    };
  }
};
function createBaseTicker(): Ticker {
  return {
    currencyPair: CurrencyPair.fromPartial({}),
    decimals: BigInt(0),
    minProviderCount: BigInt(0),
    enabled: false,
    metadataJSON: ""
  };
}
export const Ticker = {
  typeUrl: "/slinky.marketmap.v1.Ticker",
  encode(message: Ticker, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.currencyPair !== undefined) {
      CurrencyPair.encode(message.currencyPair, writer.uint32(10).fork()).ldelim();
    }
    if (message.decimals !== BigInt(0)) {
      writer.uint32(16).uint64(message.decimals);
    }
    if (message.minProviderCount !== BigInt(0)) {
      writer.uint32(24).uint64(message.minProviderCount);
    }
    if (message.enabled === true) {
      writer.uint32(112).bool(message.enabled);
    }
    if (message.metadataJSON !== "") {
      writer.uint32(122).string(message.metadataJSON);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Ticker {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTicker();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.currencyPair = CurrencyPair.decode(reader, reader.uint32());
          break;
        case 2:
          message.decimals = reader.uint64();
          break;
        case 3:
          message.minProviderCount = reader.uint64();
          break;
        case 14:
          message.enabled = reader.bool();
          break;
        case 15:
          message.metadataJSON = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Ticker {
    return {
      currencyPair: isSet(object.currencyPair) ? CurrencyPair.fromJSON(object.currencyPair) : undefined,
      decimals: isSet(object.decimals) ? BigInt(object.decimals.toString()) : BigInt(0),
      minProviderCount: isSet(object.minProviderCount) ? BigInt(object.minProviderCount.toString()) : BigInt(0),
      enabled: isSet(object.enabled) ? Boolean(object.enabled) : false,
      metadataJSON: isSet(object.metadataJSON) ? String(object.metadataJSON) : ""
    };
  },
  toJSON(message: Ticker): JsonSafe<Ticker> {
    const obj: any = {};
    message.currencyPair !== undefined && (obj.currencyPair = message.currencyPair ? CurrencyPair.toJSON(message.currencyPair) : undefined);
    message.decimals !== undefined && (obj.decimals = (message.decimals || BigInt(0)).toString());
    message.minProviderCount !== undefined && (obj.minProviderCount = (message.minProviderCount || BigInt(0)).toString());
    message.enabled !== undefined && (obj.enabled = message.enabled);
    message.metadataJSON !== undefined && (obj.metadataJSON = message.metadataJSON);
    return obj;
  },
  fromPartial(object: Partial<Ticker>): Ticker {
    const message = createBaseTicker();
    message.currencyPair = object.currencyPair !== undefined && object.currencyPair !== null ? CurrencyPair.fromPartial(object.currencyPair) : undefined;
    message.decimals = object.decimals !== undefined && object.decimals !== null ? BigInt(object.decimals.toString()) : BigInt(0);
    message.minProviderCount = object.minProviderCount !== undefined && object.minProviderCount !== null ? BigInt(object.minProviderCount.toString()) : BigInt(0);
    message.enabled = object.enabled ?? false;
    message.metadataJSON = object.metadataJSON ?? "";
    return message;
  },
  fromAmino(object: TickerAmino): Ticker {
    const message = createBaseTicker();
    if (object.currency_pair !== undefined && object.currency_pair !== null) {
      message.currencyPair = CurrencyPair.fromAmino(object.currency_pair);
    }
    if (object.decimals !== undefined && object.decimals !== null) {
      message.decimals = BigInt(object.decimals);
    }
    if (object.min_provider_count !== undefined && object.min_provider_count !== null) {
      message.minProviderCount = BigInt(object.min_provider_count);
    }
    if (object.enabled !== undefined && object.enabled !== null) {
      message.enabled = object.enabled;
    }
    if (object.metadata_JSON !== undefined && object.metadata_JSON !== null) {
      message.metadataJSON = object.metadata_JSON;
    }
    return message;
  },
  toAmino(message: Ticker): TickerAmino {
    const obj: any = {};
    obj.currency_pair = message.currencyPair ? CurrencyPair.toAmino(message.currencyPair) : undefined;
    obj.decimals = message.decimals !== BigInt(0) ? message.decimals.toString() : undefined;
    obj.min_provider_count = message.minProviderCount !== BigInt(0) ? message.minProviderCount.toString() : undefined;
    obj.enabled = message.enabled === false ? undefined : message.enabled;
    obj.metadata_JSON = message.metadataJSON === "" ? undefined : message.metadataJSON;
    return obj;
  },
  fromAminoMsg(object: TickerAminoMsg): Ticker {
    return Ticker.fromAmino(object.value);
  },
  fromProtoMsg(message: TickerProtoMsg): Ticker {
    return Ticker.decode(message.value);
  },
  toProto(message: Ticker): Uint8Array {
    return Ticker.encode(message).finish();
  },
  toProtoMsg(message: Ticker): TickerProtoMsg {
    return {
      typeUrl: "/slinky.marketmap.v1.Ticker",
      value: Ticker.encode(message).finish()
    };
  }
};
function createBaseProviderConfig(): ProviderConfig {
  return {
    name: "",
    offChainTicker: "",
    normalizeByPair: undefined,
    invert: false,
    metadataJSON: ""
  };
}
export const ProviderConfig = {
  typeUrl: "/slinky.marketmap.v1.ProviderConfig",
  encode(message: ProviderConfig, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.offChainTicker !== "") {
      writer.uint32(18).string(message.offChainTicker);
    }
    if (message.normalizeByPair !== undefined) {
      CurrencyPair.encode(message.normalizeByPair, writer.uint32(26).fork()).ldelim();
    }
    if (message.invert === true) {
      writer.uint32(32).bool(message.invert);
    }
    if (message.metadataJSON !== "") {
      writer.uint32(122).string(message.metadataJSON);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ProviderConfig {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProviderConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.offChainTicker = reader.string();
          break;
        case 3:
          message.normalizeByPair = CurrencyPair.decode(reader, reader.uint32());
          break;
        case 4:
          message.invert = reader.bool();
          break;
        case 15:
          message.metadataJSON = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ProviderConfig {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      offChainTicker: isSet(object.offChainTicker) ? String(object.offChainTicker) : "",
      normalizeByPair: isSet(object.normalizeByPair) ? CurrencyPair.fromJSON(object.normalizeByPair) : undefined,
      invert: isSet(object.invert) ? Boolean(object.invert) : false,
      metadataJSON: isSet(object.metadataJSON) ? String(object.metadataJSON) : ""
    };
  },
  toJSON(message: ProviderConfig): JsonSafe<ProviderConfig> {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.offChainTicker !== undefined && (obj.offChainTicker = message.offChainTicker);
    message.normalizeByPair !== undefined && (obj.normalizeByPair = message.normalizeByPair ? CurrencyPair.toJSON(message.normalizeByPair) : undefined);
    message.invert !== undefined && (obj.invert = message.invert);
    message.metadataJSON !== undefined && (obj.metadataJSON = message.metadataJSON);
    return obj;
  },
  fromPartial(object: Partial<ProviderConfig>): ProviderConfig {
    const message = createBaseProviderConfig();
    message.name = object.name ?? "";
    message.offChainTicker = object.offChainTicker ?? "";
    message.normalizeByPair = object.normalizeByPair !== undefined && object.normalizeByPair !== null ? CurrencyPair.fromPartial(object.normalizeByPair) : undefined;
    message.invert = object.invert ?? false;
    message.metadataJSON = object.metadataJSON ?? "";
    return message;
  },
  fromAmino(object: ProviderConfigAmino): ProviderConfig {
    const message = createBaseProviderConfig();
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    if (object.off_chain_ticker !== undefined && object.off_chain_ticker !== null) {
      message.offChainTicker = object.off_chain_ticker;
    }
    if (object.normalize_by_pair !== undefined && object.normalize_by_pair !== null) {
      message.normalizeByPair = CurrencyPair.fromAmino(object.normalize_by_pair);
    }
    if (object.invert !== undefined && object.invert !== null) {
      message.invert = object.invert;
    }
    if (object.metadata_JSON !== undefined && object.metadata_JSON !== null) {
      message.metadataJSON = object.metadata_JSON;
    }
    return message;
  },
  toAmino(message: ProviderConfig): ProviderConfigAmino {
    const obj: any = {};
    obj.name = message.name === "" ? undefined : message.name;
    obj.off_chain_ticker = message.offChainTicker === "" ? undefined : message.offChainTicker;
    obj.normalize_by_pair = message.normalizeByPair ? CurrencyPair.toAmino(message.normalizeByPair) : undefined;
    obj.invert = message.invert === false ? undefined : message.invert;
    obj.metadata_JSON = message.metadataJSON === "" ? undefined : message.metadataJSON;
    return obj;
  },
  fromAminoMsg(object: ProviderConfigAminoMsg): ProviderConfig {
    return ProviderConfig.fromAmino(object.value);
  },
  fromProtoMsg(message: ProviderConfigProtoMsg): ProviderConfig {
    return ProviderConfig.decode(message.value);
  },
  toProto(message: ProviderConfig): Uint8Array {
    return ProviderConfig.encode(message).finish();
  },
  toProtoMsg(message: ProviderConfig): ProviderConfigProtoMsg {
    return {
      typeUrl: "/slinky.marketmap.v1.ProviderConfig",
      value: ProviderConfig.encode(message).finish()
    };
  }
};
function createBaseMarketMap_MarketsEntry(): MarketMap_MarketsEntry {
  return {
    key: "",
    value: undefined
  };
}
export const MarketMap_MarketsEntry = {
  encode(message: MarketMap_MarketsEntry, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Market.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MarketMap_MarketsEntry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMarketMap_MarketsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = Market.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MarketMap_MarketsEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? Market.fromJSON(object.value) : undefined
    };
  },
  toJSON(message: MarketMap_MarketsEntry): JsonSafe<MarketMap_MarketsEntry> {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value ? Market.toJSON(message.value) : undefined);
    return obj;
  },
  fromPartial(object: Partial<MarketMap_MarketsEntry>): MarketMap_MarketsEntry {
    const message = createBaseMarketMap_MarketsEntry();
    message.key = object.key ?? "";
    message.value = object.value !== undefined && object.value !== null ? Market.fromPartial(object.value) : undefined;
    return message;
  },
  fromAmino(object: MarketMap_MarketsEntryAmino): MarketMap_MarketsEntry {
    const message = createBaseMarketMap_MarketsEntry();
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Market.fromAmino(object.value);
    }
    return message;
  },
  toAmino(message: MarketMap_MarketsEntry): MarketMap_MarketsEntryAmino {
    const obj: any = {};
    obj.key = message.key === "" ? undefined : message.key;
    obj.value = message.value ? Market.toAmino(message.value) : undefined;
    return obj;
  },
  fromAminoMsg(object: MarketMap_MarketsEntryAminoMsg): MarketMap_MarketsEntry {
    return MarketMap_MarketsEntry.fromAmino(object.value);
  },
  fromProtoMsg(message: MarketMap_MarketsEntryProtoMsg): MarketMap_MarketsEntry {
    return MarketMap_MarketsEntry.decode(message.value);
  },
  toProto(message: MarketMap_MarketsEntry): Uint8Array {
    return MarketMap_MarketsEntry.encode(message).finish();
  }
};
function createBaseMarketMap(): MarketMap {
  return {
    markets: {}
  };
}
export const MarketMap = {
  typeUrl: "/slinky.marketmap.v1.MarketMap",
  encode(message: MarketMap, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    Object.entries(message.markets).forEach(([key, value]) => {
      MarketMap_MarketsEntry.encode({
        key: (key as any),
        value
      }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MarketMap {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMarketMap();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = MarketMap_MarketsEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.markets[entry1.key] = entry1.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MarketMap {
    return {
      markets: isObject(object.markets) ? Object.entries(object.markets).reduce<{
        [key: string]: Market;
      }>((acc, [key, value]) => {
        acc[key] = Market.fromJSON(value);
        return acc;
      }, {}) : {}
    };
  },
  toJSON(message: MarketMap): JsonSafe<MarketMap> {
    const obj: any = {};
    obj.markets = {};
    if (message.markets) {
      Object.entries(message.markets).forEach(([k, v]) => {
        obj.markets[k] = Market.toJSON(v);
      });
    }
    return obj;
  },
  fromPartial(object: Partial<MarketMap>): MarketMap {
    const message = createBaseMarketMap();
    message.markets = Object.entries(object.markets ?? {}).reduce<{
      [key: string]: Market;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = Market.fromPartial(value);
      }
      return acc;
    }, {});
    return message;
  },
  fromAmino(object: MarketMapAmino): MarketMap {
    const message = createBaseMarketMap();
    message.markets = Object.entries(object.markets ?? {}).reduce<{
      [key: string]: Market;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = Market.fromAmino(value);
      }
      return acc;
    }, {});
    return message;
  },
  toAmino(message: MarketMap): MarketMapAmino {
    const obj: any = {};
    obj.markets = {};
    if (message.markets) {
      Object.entries(message.markets).forEach(([k, v]) => {
        obj.markets[k] = Market.toAmino(v);
      });
    }
    return obj;
  },
  fromAminoMsg(object: MarketMapAminoMsg): MarketMap {
    return MarketMap.fromAmino(object.value);
  },
  fromProtoMsg(message: MarketMapProtoMsg): MarketMap {
    return MarketMap.decode(message.value);
  },
  toProto(message: MarketMap): Uint8Array {
    return MarketMap.encode(message).finish();
  },
  toProtoMsg(message: MarketMap): MarketMapProtoMsg {
    return {
      typeUrl: "/slinky.marketmap.v1.MarketMap",
      value: MarketMap.encode(message).finish()
    };
  }
};