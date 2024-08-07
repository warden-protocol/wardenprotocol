//@ts-nocheck
import { Market, MarketAmino, MarketSDKType } from "./market.js";
import { Params, ParamsAmino, ParamsSDKType } from "./params.js";
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet, isObject } from "../../../helpers.js";
import { JsonSafe } from "../../../json-safe.js";
/**
 * MsgUpsertMarkets defines a message carrying a payload for performing market upserts (update or
 * create if does not exist) in the x/marketmap module.
 */
export interface MsgUpsertMarkets {
  /**
   * Authority is the signer of this transaction.  This authority must be
   * authorized by the module to execute the message.
   */
  authority: string;
  /**
   * CreateMarkets is the list of all markets to be created for the given
   * transaction.
   */
  markets: Market[];
}
export interface MsgUpsertMarketsProtoMsg {
  typeUrl: "/slinky.marketmap.v1.MsgUpsertMarkets";
  value: Uint8Array;
}
/**
 * MsgUpsertMarkets defines a message carrying a payload for performing market upserts (update or
 * create if does not exist) in the x/marketmap module.
 */
export interface MsgUpsertMarketsAmino {
  /**
   * Authority is the signer of this transaction.  This authority must be
   * authorized by the module to execute the message.
   */
  authority?: string;
  /**
   * CreateMarkets is the list of all markets to be created for the given
   * transaction.
   */
  markets?: MarketAmino[];
}
export interface MsgUpsertMarketsAminoMsg {
  type: "slinky/x/marketmap/MsgUpsertMarkets";
  value: MsgUpsertMarketsAmino;
}
/**
 * MsgUpsertMarkets defines a message carrying a payload for performing market upserts (update or
 * create if does not exist) in the x/marketmap module.
 */
export interface MsgUpsertMarketsSDKType {
  authority: string;
  markets: MarketSDKType[];
}
export interface MsgUpsertMarketsResponse_MarketUpdatesEntry {
  key: string;
  value: boolean;
}
export interface MsgUpsertMarketsResponse_MarketUpdatesEntryProtoMsg {
  typeUrl: string;
  value: Uint8Array;
}
export interface MsgUpsertMarketsResponse_MarketUpdatesEntryAmino {
  key?: string;
  value?: boolean;
}
export interface MsgUpsertMarketsResponse_MarketUpdatesEntryAminoMsg {
  type: string;
  value: MsgUpsertMarketsResponse_MarketUpdatesEntryAmino;
}
export interface MsgUpsertMarketsResponse_MarketUpdatesEntrySDKType {
  key: string;
  value: boolean;
}
/** MsgUpsertMarketsResponse is the response from the UpsertMarkets API in the x/marketmap module. */
export interface MsgUpsertMarketsResponse {
  /** UpdatedMarkets is a map between the ticker and whether the market was updated. */
  marketUpdates: {
    [key: string]: boolean;
  };
}
export interface MsgUpsertMarketsResponseProtoMsg {
  typeUrl: "/slinky.marketmap.v1.MsgUpsertMarketsResponse";
  value: Uint8Array;
}
/** MsgUpsertMarketsResponse is the response from the UpsertMarkets API in the x/marketmap module. */
export interface MsgUpsertMarketsResponseAmino {
  /** UpdatedMarkets is a map between the ticker and whether the market was updated. */
  market_updates?: {
    [key: string]: boolean;
  };
}
export interface MsgUpsertMarketsResponseAminoMsg {
  type: "/slinky.marketmap.v1.MsgUpsertMarketsResponse";
  value: MsgUpsertMarketsResponseAmino;
}
/** MsgUpsertMarketsResponse is the response from the UpsertMarkets API in the x/marketmap module. */
export interface MsgUpsertMarketsResponseSDKType {
  market_updates: {
    [key: string]: boolean;
  };
}
/**
 * MsgCreateMarkets defines a message carrying a payload for creating markets in
 * the x/marketmap module.
 */
export interface MsgCreateMarkets {
  /**
   * Authority is the signer of this transaction.  This authority must be
   * authorized by the module to execute the message.
   */
  authority: string;
  /**
   * CreateMarkets is the list of all markets to be created for the given
   * transaction.
   */
  createMarkets: Market[];
}
export interface MsgCreateMarketsProtoMsg {
  typeUrl: "/slinky.marketmap.v1.MsgCreateMarkets";
  value: Uint8Array;
}
/**
 * MsgCreateMarkets defines a message carrying a payload for creating markets in
 * the x/marketmap module.
 */
export interface MsgCreateMarketsAmino {
  /**
   * Authority is the signer of this transaction.  This authority must be
   * authorized by the module to execute the message.
   */
  authority?: string;
  /**
   * CreateMarkets is the list of all markets to be created for the given
   * transaction.
   */
  create_markets?: MarketAmino[];
}
export interface MsgCreateMarketsAminoMsg {
  type: "slinky/x/marketmap/MsgCreateMarkets";
  value: MsgCreateMarketsAmino;
}
/**
 * MsgCreateMarkets defines a message carrying a payload for creating markets in
 * the x/marketmap module.
 */
export interface MsgCreateMarketsSDKType {
  authority: string;
  create_markets: MarketSDKType[];
}
/** MsgUpdateMarketMapResponse is the response message for MsgUpdateMarketMap. */
export interface MsgCreateMarketsResponse {}
export interface MsgCreateMarketsResponseProtoMsg {
  typeUrl: "/slinky.marketmap.v1.MsgCreateMarketsResponse";
  value: Uint8Array;
}
/** MsgUpdateMarketMapResponse is the response message for MsgUpdateMarketMap. */
export interface MsgCreateMarketsResponseAmino {}
export interface MsgCreateMarketsResponseAminoMsg {
  type: "/slinky.marketmap.v1.MsgCreateMarketsResponse";
  value: MsgCreateMarketsResponseAmino;
}
/** MsgUpdateMarketMapResponse is the response message for MsgUpdateMarketMap. */
export interface MsgCreateMarketsResponseSDKType {}
/**
 * MsgUpdateMarkets defines a message carrying a payload for updating the
 * x/marketmap module.
 */
export interface MsgUpdateMarkets {
  /**
   * Authority is the signer of this transaction.  This authority must be
   * authorized by the module to execute the message.
   */
  authority: string;
  /**
   * UpdateMarkets is the list of all markets to be updated for the given
   * transaction.
   */
  updateMarkets: Market[];
}
export interface MsgUpdateMarketsProtoMsg {
  typeUrl: "/slinky.marketmap.v1.MsgUpdateMarkets";
  value: Uint8Array;
}
/**
 * MsgUpdateMarkets defines a message carrying a payload for updating the
 * x/marketmap module.
 */
export interface MsgUpdateMarketsAmino {
  /**
   * Authority is the signer of this transaction.  This authority must be
   * authorized by the module to execute the message.
   */
  authority?: string;
  /**
   * UpdateMarkets is the list of all markets to be updated for the given
   * transaction.
   */
  update_markets?: MarketAmino[];
}
export interface MsgUpdateMarketsAminoMsg {
  type: "slinky/x/marketmap/MsgUpdateMarkets";
  value: MsgUpdateMarketsAmino;
}
/**
 * MsgUpdateMarkets defines a message carrying a payload for updating the
 * x/marketmap module.
 */
export interface MsgUpdateMarketsSDKType {
  authority: string;
  update_markets: MarketSDKType[];
}
/** MsgUpdateMarketsResponse is the response message for MsgUpdateMarkets. */
export interface MsgUpdateMarketsResponse {}
export interface MsgUpdateMarketsResponseProtoMsg {
  typeUrl: "/slinky.marketmap.v1.MsgUpdateMarketsResponse";
  value: Uint8Array;
}
/** MsgUpdateMarketsResponse is the response message for MsgUpdateMarkets. */
export interface MsgUpdateMarketsResponseAmino {}
export interface MsgUpdateMarketsResponseAminoMsg {
  type: "/slinky.marketmap.v1.MsgUpdateMarketsResponse";
  value: MsgUpdateMarketsResponseAmino;
}
/** MsgUpdateMarketsResponse is the response message for MsgUpdateMarkets. */
export interface MsgUpdateMarketsResponseSDKType {}
/**
 * MsgParams defines the Msg/Params request type. It contains the
 * new parameters for the x/marketmap module.
 */
export interface MsgParams {
  /** Params defines the new parameters for the x/marketmap module. */
  params: Params;
  /**
   * Authority defines the authority that is updating the x/marketmap module
   * parameters.
   */
  authority: string;
}
export interface MsgParamsProtoMsg {
  typeUrl: "/slinky.marketmap.v1.MsgParams";
  value: Uint8Array;
}
/**
 * MsgParams defines the Msg/Params request type. It contains the
 * new parameters for the x/marketmap module.
 */
export interface MsgParamsAmino {
  /** Params defines the new parameters for the x/marketmap module. */
  params?: ParamsAmino;
  /**
   * Authority defines the authority that is updating the x/marketmap module
   * parameters.
   */
  authority?: string;
}
export interface MsgParamsAminoMsg {
  type: "/slinky.marketmap.v1.MsgParams";
  value: MsgParamsAmino;
}
/**
 * MsgParams defines the Msg/Params request type. It contains the
 * new parameters for the x/marketmap module.
 */
export interface MsgParamsSDKType {
  params: ParamsSDKType;
  authority: string;
}
/** MsgParamsResponse defines the Msg/Params response type. */
export interface MsgParamsResponse {}
export interface MsgParamsResponseProtoMsg {
  typeUrl: "/slinky.marketmap.v1.MsgParamsResponse";
  value: Uint8Array;
}
/** MsgParamsResponse defines the Msg/Params response type. */
export interface MsgParamsResponseAmino {}
export interface MsgParamsResponseAminoMsg {
  type: "/slinky.marketmap.v1.MsgParamsResponse";
  value: MsgParamsResponseAmino;
}
/** MsgParamsResponse defines the Msg/Params response type. */
export interface MsgParamsResponseSDKType {}
/**
 * MsgRemoveMarketAuthorities defines the Msg/RemoveMarketAuthoritiesResponse
 * request type. It contains the new addresses to remove from the list of
 * authorities
 */
export interface MsgRemoveMarketAuthorities {
  /** RemoveAddresses is the list of addresses to remove. */
  removeAddresses: string[];
  /**
   * Admin defines the authority that is the x/marketmap
   * Admin account.  This account is set in the module parameters.
   */
  admin: string;
}
export interface MsgRemoveMarketAuthoritiesProtoMsg {
  typeUrl: "/slinky.marketmap.v1.MsgRemoveMarketAuthorities";
  value: Uint8Array;
}
/**
 * MsgRemoveMarketAuthorities defines the Msg/RemoveMarketAuthoritiesResponse
 * request type. It contains the new addresses to remove from the list of
 * authorities
 */
export interface MsgRemoveMarketAuthoritiesAmino {
  /** RemoveAddresses is the list of addresses to remove. */
  remove_addresses?: string[];
  /**
   * Admin defines the authority that is the x/marketmap
   * Admin account.  This account is set in the module parameters.
   */
  admin?: string;
}
export interface MsgRemoveMarketAuthoritiesAminoMsg {
  type: "/slinky.marketmap.v1.MsgRemoveMarketAuthorities";
  value: MsgRemoveMarketAuthoritiesAmino;
}
/**
 * MsgRemoveMarketAuthorities defines the Msg/RemoveMarketAuthoritiesResponse
 * request type. It contains the new addresses to remove from the list of
 * authorities
 */
export interface MsgRemoveMarketAuthoritiesSDKType {
  remove_addresses: string[];
  admin: string;
}
/**
 * MsgRemoveMarketAuthoritiesResponse defines the
 * Msg/RemoveMarketAuthoritiesResponse response type.
 */
export interface MsgRemoveMarketAuthoritiesResponse {}
export interface MsgRemoveMarketAuthoritiesResponseProtoMsg {
  typeUrl: "/slinky.marketmap.v1.MsgRemoveMarketAuthoritiesResponse";
  value: Uint8Array;
}
/**
 * MsgRemoveMarketAuthoritiesResponse defines the
 * Msg/RemoveMarketAuthoritiesResponse response type.
 */
export interface MsgRemoveMarketAuthoritiesResponseAmino {}
export interface MsgRemoveMarketAuthoritiesResponseAminoMsg {
  type: "/slinky.marketmap.v1.MsgRemoveMarketAuthoritiesResponse";
  value: MsgRemoveMarketAuthoritiesResponseAmino;
}
/**
 * MsgRemoveMarketAuthoritiesResponse defines the
 * Msg/RemoveMarketAuthoritiesResponse response type.
 */
export interface MsgRemoveMarketAuthoritiesResponseSDKType {}
function createBaseMsgUpsertMarkets(): MsgUpsertMarkets {
  return {
    authority: "",
    markets: []
  };
}
export const MsgUpsertMarkets = {
  typeUrl: "/slinky.marketmap.v1.MsgUpsertMarkets",
  encode(message: MsgUpsertMarkets, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    for (const v of message.markets) {
      Market.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpsertMarkets {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpsertMarkets();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.markets.push(Market.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgUpsertMarkets {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      markets: Array.isArray(object?.markets) ? object.markets.map((e: any) => Market.fromJSON(e)) : []
    };
  },
  toJSON(message: MsgUpsertMarkets): JsonSafe<MsgUpsertMarkets> {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    if (message.markets) {
      obj.markets = message.markets.map(e => e ? Market.toJSON(e) : undefined);
    } else {
      obj.markets = [];
    }
    return obj;
  },
  fromPartial(object: Partial<MsgUpsertMarkets>): MsgUpsertMarkets {
    const message = createBaseMsgUpsertMarkets();
    message.authority = object.authority ?? "";
    message.markets = object.markets?.map(e => Market.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgUpsertMarketsAmino): MsgUpsertMarkets {
    const message = createBaseMsgUpsertMarkets();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    message.markets = object.markets?.map(e => Market.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgUpsertMarkets): MsgUpsertMarketsAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    if (message.markets) {
      obj.markets = message.markets.map(e => e ? Market.toAmino(e) : undefined);
    } else {
      obj.markets = message.markets;
    }
    return obj;
  },
  fromAminoMsg(object: MsgUpsertMarketsAminoMsg): MsgUpsertMarkets {
    return MsgUpsertMarkets.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpsertMarkets): MsgUpsertMarketsAminoMsg {
    return {
      type: "slinky/x/marketmap/MsgUpsertMarkets",
      value: MsgUpsertMarkets.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgUpsertMarketsProtoMsg): MsgUpsertMarkets {
    return MsgUpsertMarkets.decode(message.value);
  },
  toProto(message: MsgUpsertMarkets): Uint8Array {
    return MsgUpsertMarkets.encode(message).finish();
  },
  toProtoMsg(message: MsgUpsertMarkets): MsgUpsertMarketsProtoMsg {
    return {
      typeUrl: "/slinky.marketmap.v1.MsgUpsertMarkets",
      value: MsgUpsertMarkets.encode(message).finish()
    };
  }
};
function createBaseMsgUpsertMarketsResponse_MarketUpdatesEntry(): MsgUpsertMarketsResponse_MarketUpdatesEntry {
  return {
    key: "",
    value: false
  };
}
export const MsgUpsertMarketsResponse_MarketUpdatesEntry = {
  encode(message: MsgUpsertMarketsResponse_MarketUpdatesEntry, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value === true) {
      writer.uint32(16).bool(message.value);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpsertMarketsResponse_MarketUpdatesEntry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpsertMarketsResponse_MarketUpdatesEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgUpsertMarketsResponse_MarketUpdatesEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? Boolean(object.value) : false
    };
  },
  toJSON(message: MsgUpsertMarketsResponse_MarketUpdatesEntry): JsonSafe<MsgUpsertMarketsResponse_MarketUpdatesEntry> {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },
  fromPartial(object: Partial<MsgUpsertMarketsResponse_MarketUpdatesEntry>): MsgUpsertMarketsResponse_MarketUpdatesEntry {
    const message = createBaseMsgUpsertMarketsResponse_MarketUpdatesEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? false;
    return message;
  },
  fromAmino(object: MsgUpsertMarketsResponse_MarketUpdatesEntryAmino): MsgUpsertMarketsResponse_MarketUpdatesEntry {
    const message = createBaseMsgUpsertMarketsResponse_MarketUpdatesEntry();
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
  toAmino(message: MsgUpsertMarketsResponse_MarketUpdatesEntry): MsgUpsertMarketsResponse_MarketUpdatesEntryAmino {
    const obj: any = {};
    obj.key = message.key === "" ? undefined : message.key;
    obj.value = message.value === false ? undefined : message.value;
    return obj;
  },
  fromAminoMsg(object: MsgUpsertMarketsResponse_MarketUpdatesEntryAminoMsg): MsgUpsertMarketsResponse_MarketUpdatesEntry {
    return MsgUpsertMarketsResponse_MarketUpdatesEntry.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpsertMarketsResponse_MarketUpdatesEntryProtoMsg): MsgUpsertMarketsResponse_MarketUpdatesEntry {
    return MsgUpsertMarketsResponse_MarketUpdatesEntry.decode(message.value);
  },
  toProto(message: MsgUpsertMarketsResponse_MarketUpdatesEntry): Uint8Array {
    return MsgUpsertMarketsResponse_MarketUpdatesEntry.encode(message).finish();
  }
};
function createBaseMsgUpsertMarketsResponse(): MsgUpsertMarketsResponse {
  return {
    marketUpdates: {}
  };
}
export const MsgUpsertMarketsResponse = {
  typeUrl: "/slinky.marketmap.v1.MsgUpsertMarketsResponse",
  encode(message: MsgUpsertMarketsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    Object.entries(message.marketUpdates).forEach(([key, value]) => {
      MsgUpsertMarketsResponse_MarketUpdatesEntry.encode({
        key: (key as any),
        value
      }, writer.uint32(8).fork()).ldelim();
    });
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpsertMarketsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpsertMarketsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = MsgUpsertMarketsResponse_MarketUpdatesEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.marketUpdates[entry1.key] = entry1.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgUpsertMarketsResponse {
    return {
      marketUpdates: isObject(object.marketUpdates) ? Object.entries(object.marketUpdates).reduce<{
        [key: string]: bool;
      }>((acc, [key, value]) => {
        acc[key] = bool.fromJSON(value);
        return acc;
      }, {}) : {}
    };
  },
  toJSON(message: MsgUpsertMarketsResponse): JsonSafe<MsgUpsertMarketsResponse> {
    const obj: any = {};
    obj.marketUpdates = {};
    if (message.marketUpdates) {
      Object.entries(message.marketUpdates).forEach(([k, v]) => {
        obj.marketUpdates[k] = bool.toJSON(v);
      });
    }
    return obj;
  },
  fromPartial(object: Partial<MsgUpsertMarketsResponse>): MsgUpsertMarketsResponse {
    const message = createBaseMsgUpsertMarketsResponse();
    message.marketUpdates = Object.entries(object.marketUpdates ?? {}).reduce<{
      [key: string]: bool;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = bool.fromPartial(value);
      }
      return acc;
    }, {});
    return message;
  },
  fromAmino(object: MsgUpsertMarketsResponseAmino): MsgUpsertMarketsResponse {
    const message = createBaseMsgUpsertMarketsResponse();
    message.marketUpdates = Object.entries(object.market_updates ?? {}).reduce<{
      [key: string]: bool;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = bool.fromAmino(value);
      }
      return acc;
    }, {});
    return message;
  },
  toAmino(message: MsgUpsertMarketsResponse): MsgUpsertMarketsResponseAmino {
    const obj: any = {};
    obj.market_updates = {};
    if (message.marketUpdates) {
      Object.entries(message.marketUpdates).forEach(([k, v]) => {
        obj.market_updates[k] = bool.toAmino(v);
      });
    }
    return obj;
  },
  fromAminoMsg(object: MsgUpsertMarketsResponseAminoMsg): MsgUpsertMarketsResponse {
    return MsgUpsertMarketsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpsertMarketsResponseProtoMsg): MsgUpsertMarketsResponse {
    return MsgUpsertMarketsResponse.decode(message.value);
  },
  toProto(message: MsgUpsertMarketsResponse): Uint8Array {
    return MsgUpsertMarketsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpsertMarketsResponse): MsgUpsertMarketsResponseProtoMsg {
    return {
      typeUrl: "/slinky.marketmap.v1.MsgUpsertMarketsResponse",
      value: MsgUpsertMarketsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgCreateMarkets(): MsgCreateMarkets {
  return {
    authority: "",
    createMarkets: []
  };
}
export const MsgCreateMarkets = {
  typeUrl: "/slinky.marketmap.v1.MsgCreateMarkets",
  encode(message: MsgCreateMarkets, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    for (const v of message.createMarkets) {
      Market.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateMarkets {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateMarkets();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.createMarkets.push(Market.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgCreateMarkets {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      createMarkets: Array.isArray(object?.createMarkets) ? object.createMarkets.map((e: any) => Market.fromJSON(e)) : []
    };
  },
  toJSON(message: MsgCreateMarkets): JsonSafe<MsgCreateMarkets> {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    if (message.createMarkets) {
      obj.createMarkets = message.createMarkets.map(e => e ? Market.toJSON(e) : undefined);
    } else {
      obj.createMarkets = [];
    }
    return obj;
  },
  fromPartial(object: Partial<MsgCreateMarkets>): MsgCreateMarkets {
    const message = createBaseMsgCreateMarkets();
    message.authority = object.authority ?? "";
    message.createMarkets = object.createMarkets?.map(e => Market.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgCreateMarketsAmino): MsgCreateMarkets {
    const message = createBaseMsgCreateMarkets();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    message.createMarkets = object.create_markets?.map(e => Market.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgCreateMarkets): MsgCreateMarketsAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    if (message.createMarkets) {
      obj.create_markets = message.createMarkets.map(e => e ? Market.toAmino(e) : undefined);
    } else {
      obj.create_markets = message.createMarkets;
    }
    return obj;
  },
  fromAminoMsg(object: MsgCreateMarketsAminoMsg): MsgCreateMarkets {
    return MsgCreateMarkets.fromAmino(object.value);
  },
  toAminoMsg(message: MsgCreateMarkets): MsgCreateMarketsAminoMsg {
    return {
      type: "slinky/x/marketmap/MsgCreateMarkets",
      value: MsgCreateMarkets.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgCreateMarketsProtoMsg): MsgCreateMarkets {
    return MsgCreateMarkets.decode(message.value);
  },
  toProto(message: MsgCreateMarkets): Uint8Array {
    return MsgCreateMarkets.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateMarkets): MsgCreateMarketsProtoMsg {
    return {
      typeUrl: "/slinky.marketmap.v1.MsgCreateMarkets",
      value: MsgCreateMarkets.encode(message).finish()
    };
  }
};
function createBaseMsgCreateMarketsResponse(): MsgCreateMarketsResponse {
  return {};
}
export const MsgCreateMarketsResponse = {
  typeUrl: "/slinky.marketmap.v1.MsgCreateMarketsResponse",
  encode(_: MsgCreateMarketsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateMarketsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateMarketsResponse();
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
  fromJSON(_: any): MsgCreateMarketsResponse {
    return {};
  },
  toJSON(_: MsgCreateMarketsResponse): JsonSafe<MsgCreateMarketsResponse> {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<MsgCreateMarketsResponse>): MsgCreateMarketsResponse {
    const message = createBaseMsgCreateMarketsResponse();
    return message;
  },
  fromAmino(_: MsgCreateMarketsResponseAmino): MsgCreateMarketsResponse {
    const message = createBaseMsgCreateMarketsResponse();
    return message;
  },
  toAmino(_: MsgCreateMarketsResponse): MsgCreateMarketsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgCreateMarketsResponseAminoMsg): MsgCreateMarketsResponse {
    return MsgCreateMarketsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCreateMarketsResponseProtoMsg): MsgCreateMarketsResponse {
    return MsgCreateMarketsResponse.decode(message.value);
  },
  toProto(message: MsgCreateMarketsResponse): Uint8Array {
    return MsgCreateMarketsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateMarketsResponse): MsgCreateMarketsResponseProtoMsg {
    return {
      typeUrl: "/slinky.marketmap.v1.MsgCreateMarketsResponse",
      value: MsgCreateMarketsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateMarkets(): MsgUpdateMarkets {
  return {
    authority: "",
    updateMarkets: []
  };
}
export const MsgUpdateMarkets = {
  typeUrl: "/slinky.marketmap.v1.MsgUpdateMarkets",
  encode(message: MsgUpdateMarkets, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    for (const v of message.updateMarkets) {
      Market.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateMarkets {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateMarkets();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.updateMarkets.push(Market.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgUpdateMarkets {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      updateMarkets: Array.isArray(object?.updateMarkets) ? object.updateMarkets.map((e: any) => Market.fromJSON(e)) : []
    };
  },
  toJSON(message: MsgUpdateMarkets): JsonSafe<MsgUpdateMarkets> {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    if (message.updateMarkets) {
      obj.updateMarkets = message.updateMarkets.map(e => e ? Market.toJSON(e) : undefined);
    } else {
      obj.updateMarkets = [];
    }
    return obj;
  },
  fromPartial(object: Partial<MsgUpdateMarkets>): MsgUpdateMarkets {
    const message = createBaseMsgUpdateMarkets();
    message.authority = object.authority ?? "";
    message.updateMarkets = object.updateMarkets?.map(e => Market.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgUpdateMarketsAmino): MsgUpdateMarkets {
    const message = createBaseMsgUpdateMarkets();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    message.updateMarkets = object.update_markets?.map(e => Market.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgUpdateMarkets): MsgUpdateMarketsAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    if (message.updateMarkets) {
      obj.update_markets = message.updateMarkets.map(e => e ? Market.toAmino(e) : undefined);
    } else {
      obj.update_markets = message.updateMarkets;
    }
    return obj;
  },
  fromAminoMsg(object: MsgUpdateMarketsAminoMsg): MsgUpdateMarkets {
    return MsgUpdateMarkets.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateMarkets): MsgUpdateMarketsAminoMsg {
    return {
      type: "slinky/x/marketmap/MsgUpdateMarkets",
      value: MsgUpdateMarkets.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgUpdateMarketsProtoMsg): MsgUpdateMarkets {
    return MsgUpdateMarkets.decode(message.value);
  },
  toProto(message: MsgUpdateMarkets): Uint8Array {
    return MsgUpdateMarkets.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateMarkets): MsgUpdateMarketsProtoMsg {
    return {
      typeUrl: "/slinky.marketmap.v1.MsgUpdateMarkets",
      value: MsgUpdateMarkets.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateMarketsResponse(): MsgUpdateMarketsResponse {
  return {};
}
export const MsgUpdateMarketsResponse = {
  typeUrl: "/slinky.marketmap.v1.MsgUpdateMarketsResponse",
  encode(_: MsgUpdateMarketsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateMarketsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateMarketsResponse();
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
  fromJSON(_: any): MsgUpdateMarketsResponse {
    return {};
  },
  toJSON(_: MsgUpdateMarketsResponse): JsonSafe<MsgUpdateMarketsResponse> {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<MsgUpdateMarketsResponse>): MsgUpdateMarketsResponse {
    const message = createBaseMsgUpdateMarketsResponse();
    return message;
  },
  fromAmino(_: MsgUpdateMarketsResponseAmino): MsgUpdateMarketsResponse {
    const message = createBaseMsgUpdateMarketsResponse();
    return message;
  },
  toAmino(_: MsgUpdateMarketsResponse): MsgUpdateMarketsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateMarketsResponseAminoMsg): MsgUpdateMarketsResponse {
    return MsgUpdateMarketsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateMarketsResponseProtoMsg): MsgUpdateMarketsResponse {
    return MsgUpdateMarketsResponse.decode(message.value);
  },
  toProto(message: MsgUpdateMarketsResponse): Uint8Array {
    return MsgUpdateMarketsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateMarketsResponse): MsgUpdateMarketsResponseProtoMsg {
    return {
      typeUrl: "/slinky.marketmap.v1.MsgUpdateMarketsResponse",
      value: MsgUpdateMarketsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgParams(): MsgParams {
  return {
    params: Params.fromPartial({}),
    authority: ""
  };
}
export const MsgParams = {
  typeUrl: "/slinky.marketmap.v1.MsgParams",
  encode(message: MsgParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    if (message.authority !== "") {
      writer.uint32(18).string(message.authority);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.authority = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgParams {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      authority: isSet(object.authority) ? String(object.authority) : ""
    };
  },
  toJSON(message: MsgParams): JsonSafe<MsgParams> {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    message.authority !== undefined && (obj.authority = message.authority);
    return obj;
  },
  fromPartial(object: Partial<MsgParams>): MsgParams {
    const message = createBaseMsgParams();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    message.authority = object.authority ?? "";
    return message;
  },
  fromAmino(object: MsgParamsAmino): MsgParams {
    const message = createBaseMsgParams();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    return message;
  },
  toAmino(message: MsgParams): MsgParamsAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    obj.authority = message.authority === "" ? undefined : message.authority;
    return obj;
  },
  fromAminoMsg(object: MsgParamsAminoMsg): MsgParams {
    return MsgParams.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgParamsProtoMsg): MsgParams {
    return MsgParams.decode(message.value);
  },
  toProto(message: MsgParams): Uint8Array {
    return MsgParams.encode(message).finish();
  },
  toProtoMsg(message: MsgParams): MsgParamsProtoMsg {
    return {
      typeUrl: "/slinky.marketmap.v1.MsgParams",
      value: MsgParams.encode(message).finish()
    };
  }
};
function createBaseMsgParamsResponse(): MsgParamsResponse {
  return {};
}
export const MsgParamsResponse = {
  typeUrl: "/slinky.marketmap.v1.MsgParamsResponse",
  encode(_: MsgParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgParamsResponse();
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
  fromJSON(_: any): MsgParamsResponse {
    return {};
  },
  toJSON(_: MsgParamsResponse): JsonSafe<MsgParamsResponse> {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<MsgParamsResponse>): MsgParamsResponse {
    const message = createBaseMsgParamsResponse();
    return message;
  },
  fromAmino(_: MsgParamsResponseAmino): MsgParamsResponse {
    const message = createBaseMsgParamsResponse();
    return message;
  },
  toAmino(_: MsgParamsResponse): MsgParamsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgParamsResponseAminoMsg): MsgParamsResponse {
    return MsgParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgParamsResponseProtoMsg): MsgParamsResponse {
    return MsgParamsResponse.decode(message.value);
  },
  toProto(message: MsgParamsResponse): Uint8Array {
    return MsgParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgParamsResponse): MsgParamsResponseProtoMsg {
    return {
      typeUrl: "/slinky.marketmap.v1.MsgParamsResponse",
      value: MsgParamsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRemoveMarketAuthorities(): MsgRemoveMarketAuthorities {
  return {
    removeAddresses: [],
    admin: ""
  };
}
export const MsgRemoveMarketAuthorities = {
  typeUrl: "/slinky.marketmap.v1.MsgRemoveMarketAuthorities",
  encode(message: MsgRemoveMarketAuthorities, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.removeAddresses) {
      writer.uint32(10).string(v!);
    }
    if (message.admin !== "") {
      writer.uint32(18).string(message.admin);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgRemoveMarketAuthorities {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveMarketAuthorities();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.removeAddresses.push(reader.string());
          break;
        case 2:
          message.admin = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgRemoveMarketAuthorities {
    return {
      removeAddresses: Array.isArray(object?.removeAddresses) ? object.removeAddresses.map((e: any) => String(e)) : [],
      admin: isSet(object.admin) ? String(object.admin) : ""
    };
  },
  toJSON(message: MsgRemoveMarketAuthorities): JsonSafe<MsgRemoveMarketAuthorities> {
    const obj: any = {};
    if (message.removeAddresses) {
      obj.removeAddresses = message.removeAddresses.map(e => e);
    } else {
      obj.removeAddresses = [];
    }
    message.admin !== undefined && (obj.admin = message.admin);
    return obj;
  },
  fromPartial(object: Partial<MsgRemoveMarketAuthorities>): MsgRemoveMarketAuthorities {
    const message = createBaseMsgRemoveMarketAuthorities();
    message.removeAddresses = object.removeAddresses?.map(e => e) || [];
    message.admin = object.admin ?? "";
    return message;
  },
  fromAmino(object: MsgRemoveMarketAuthoritiesAmino): MsgRemoveMarketAuthorities {
    const message = createBaseMsgRemoveMarketAuthorities();
    message.removeAddresses = object.remove_addresses?.map(e => e) || [];
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = object.admin;
    }
    return message;
  },
  toAmino(message: MsgRemoveMarketAuthorities): MsgRemoveMarketAuthoritiesAmino {
    const obj: any = {};
    if (message.removeAddresses) {
      obj.remove_addresses = message.removeAddresses.map(e => e);
    } else {
      obj.remove_addresses = message.removeAddresses;
    }
    obj.admin = message.admin === "" ? undefined : message.admin;
    return obj;
  },
  fromAminoMsg(object: MsgRemoveMarketAuthoritiesAminoMsg): MsgRemoveMarketAuthorities {
    return MsgRemoveMarketAuthorities.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRemoveMarketAuthoritiesProtoMsg): MsgRemoveMarketAuthorities {
    return MsgRemoveMarketAuthorities.decode(message.value);
  },
  toProto(message: MsgRemoveMarketAuthorities): Uint8Array {
    return MsgRemoveMarketAuthorities.encode(message).finish();
  },
  toProtoMsg(message: MsgRemoveMarketAuthorities): MsgRemoveMarketAuthoritiesProtoMsg {
    return {
      typeUrl: "/slinky.marketmap.v1.MsgRemoveMarketAuthorities",
      value: MsgRemoveMarketAuthorities.encode(message).finish()
    };
  }
};
function createBaseMsgRemoveMarketAuthoritiesResponse(): MsgRemoveMarketAuthoritiesResponse {
  return {};
}
export const MsgRemoveMarketAuthoritiesResponse = {
  typeUrl: "/slinky.marketmap.v1.MsgRemoveMarketAuthoritiesResponse",
  encode(_: MsgRemoveMarketAuthoritiesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgRemoveMarketAuthoritiesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveMarketAuthoritiesResponse();
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
  fromJSON(_: any): MsgRemoveMarketAuthoritiesResponse {
    return {};
  },
  toJSON(_: MsgRemoveMarketAuthoritiesResponse): JsonSafe<MsgRemoveMarketAuthoritiesResponse> {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<MsgRemoveMarketAuthoritiesResponse>): MsgRemoveMarketAuthoritiesResponse {
    const message = createBaseMsgRemoveMarketAuthoritiesResponse();
    return message;
  },
  fromAmino(_: MsgRemoveMarketAuthoritiesResponseAmino): MsgRemoveMarketAuthoritiesResponse {
    const message = createBaseMsgRemoveMarketAuthoritiesResponse();
    return message;
  },
  toAmino(_: MsgRemoveMarketAuthoritiesResponse): MsgRemoveMarketAuthoritiesResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRemoveMarketAuthoritiesResponseAminoMsg): MsgRemoveMarketAuthoritiesResponse {
    return MsgRemoveMarketAuthoritiesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRemoveMarketAuthoritiesResponseProtoMsg): MsgRemoveMarketAuthoritiesResponse {
    return MsgRemoveMarketAuthoritiesResponse.decode(message.value);
  },
  toProto(message: MsgRemoveMarketAuthoritiesResponse): Uint8Array {
    return MsgRemoveMarketAuthoritiesResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRemoveMarketAuthoritiesResponse): MsgRemoveMarketAuthoritiesResponseProtoMsg {
    return {
      typeUrl: "/slinky.marketmap.v1.MsgRemoveMarketAuthoritiesResponse",
      value: MsgRemoveMarketAuthoritiesResponse.encode(message).finish()
    };
  }
};