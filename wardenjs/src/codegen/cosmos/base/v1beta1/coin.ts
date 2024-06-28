//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet } from "../../../helpers.js";
import { JsonSafe } from "../../../json-safe.js";
/**
 * Coin defines a token with a denomination and an amount.
 * 
 * NOTE: The amount field is an Int which implements the custom method
 * signatures required by gogoproto.
 */
export interface Coin {
  denom: string;
  amount: string;
}
export interface CoinProtoMsg {
  typeUrl: "/cosmos.base.v1beta1.Coin";
  value: Uint8Array;
}
/**
 * Coin defines a token with a denomination and an amount.
 * 
 * NOTE: The amount field is an Int which implements the custom method
 * signatures required by gogoproto.
 */
export interface CoinAmino {
  denom?: string;
  amount?: string;
}
export interface CoinAminoMsg {
  type: "cosmos-sdk/Coin";
  value: CoinAmino;
}
/**
 * Coin defines a token with a denomination and an amount.
 * 
 * NOTE: The amount field is an Int which implements the custom method
 * signatures required by gogoproto.
 */
export interface CoinSDKType {
  denom: string;
  amount: string;
}
/**
 * DecCoin defines a token with a denomination and a decimal amount.
 * 
 * NOTE: The amount field is an Dec which implements the custom method
 * signatures required by gogoproto.
 */
export interface DecCoin {
  denom: string;
  amount: string;
}
export interface DecCoinProtoMsg {
  typeUrl: "/cosmos.base.v1beta1.DecCoin";
  value: Uint8Array;
}
/**
 * DecCoin defines a token with a denomination and a decimal amount.
 * 
 * NOTE: The amount field is an Dec which implements the custom method
 * signatures required by gogoproto.
 */
export interface DecCoinAmino {
  denom?: string;
  amount?: string;
}
export interface DecCoinAminoMsg {
  type: "cosmos-sdk/DecCoin";
  value: DecCoinAmino;
}
/**
 * DecCoin defines a token with a denomination and a decimal amount.
 * 
 * NOTE: The amount field is an Dec which implements the custom method
 * signatures required by gogoproto.
 */
export interface DecCoinSDKType {
  denom: string;
  amount: string;
}
/** IntProto defines a Protobuf wrapper around an Int object. */
export interface IntProto {
  int: string;
}
export interface IntProtoProtoMsg {
  typeUrl: "/cosmos.base.v1beta1.IntProto";
  value: Uint8Array;
}
/** IntProto defines a Protobuf wrapper around an Int object. */
export interface IntProtoAmino {
  int?: string;
}
export interface IntProtoAminoMsg {
  type: "cosmos-sdk/IntProto";
  value: IntProtoAmino;
}
/** IntProto defines a Protobuf wrapper around an Int object. */
export interface IntProtoSDKType {
  int: string;
}
/** DecProto defines a Protobuf wrapper around a Dec object. */
export interface DecProto {
  dec: string;
}
export interface DecProtoProtoMsg {
  typeUrl: "/cosmos.base.v1beta1.DecProto";
  value: Uint8Array;
}
/** DecProto defines a Protobuf wrapper around a Dec object. */
export interface DecProtoAmino {
  dec?: string;
}
export interface DecProtoAminoMsg {
  type: "cosmos-sdk/DecProto";
  value: DecProtoAmino;
}
/** DecProto defines a Protobuf wrapper around a Dec object. */
export interface DecProtoSDKType {
  dec: string;
}
function createBaseCoin(): Coin {
  return {
    denom: "",
    amount: ""
  };
}
export const Coin = {
  typeUrl: "/cosmos.base.v1beta1.Coin",
  encode(message: Coin, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Coin {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCoin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Coin {
    return {
      denom: isSet(object.denom) ? String(object.denom) : "",
      amount: isSet(object.amount) ? String(object.amount) : ""
    };
  },
  toJSON(message: Coin): JsonSafe<Coin> {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    message.amount !== undefined && (obj.amount = message.amount);
    return obj;
  },
  fromPartial(object: Partial<Coin>): Coin {
    const message = createBaseCoin();
    message.denom = object.denom ?? "";
    message.amount = object.amount ?? "";
    return message;
  },
  fromAmino(object: CoinAmino): Coin {
    const message = createBaseCoin();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    return message;
  },
  toAmino(message: Coin): CoinAmino {
    const obj: any = {};
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.amount = message.amount === "" ? undefined : message.amount;
    return obj;
  },
  fromAminoMsg(object: CoinAminoMsg): Coin {
    return Coin.fromAmino(object.value);
  },
  toAminoMsg(message: Coin): CoinAminoMsg {
    return {
      type: "cosmos-sdk/Coin",
      value: Coin.toAmino(message)
    };
  },
  fromProtoMsg(message: CoinProtoMsg): Coin {
    return Coin.decode(message.value);
  },
  toProto(message: Coin): Uint8Array {
    return Coin.encode(message).finish();
  },
  toProtoMsg(message: Coin): CoinProtoMsg {
    return {
      typeUrl: "/cosmos.base.v1beta1.Coin",
      value: Coin.encode(message).finish()
    };
  }
};
function createBaseDecCoin(): DecCoin {
  return {
    denom: "",
    amount: ""
  };
}
export const DecCoin = {
  typeUrl: "/cosmos.base.v1beta1.DecCoin",
  encode(message: DecCoin, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): DecCoin {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDecCoin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): DecCoin {
    return {
      denom: isSet(object.denom) ? String(object.denom) : "",
      amount: isSet(object.amount) ? String(object.amount) : ""
    };
  },
  toJSON(message: DecCoin): JsonSafe<DecCoin> {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    message.amount !== undefined && (obj.amount = message.amount);
    return obj;
  },
  fromPartial(object: Partial<DecCoin>): DecCoin {
    const message = createBaseDecCoin();
    message.denom = object.denom ?? "";
    message.amount = object.amount ?? "";
    return message;
  },
  fromAmino(object: DecCoinAmino): DecCoin {
    const message = createBaseDecCoin();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    return message;
  },
  toAmino(message: DecCoin): DecCoinAmino {
    const obj: any = {};
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.amount = message.amount === "" ? undefined : message.amount;
    return obj;
  },
  fromAminoMsg(object: DecCoinAminoMsg): DecCoin {
    return DecCoin.fromAmino(object.value);
  },
  toAminoMsg(message: DecCoin): DecCoinAminoMsg {
    return {
      type: "cosmos-sdk/DecCoin",
      value: DecCoin.toAmino(message)
    };
  },
  fromProtoMsg(message: DecCoinProtoMsg): DecCoin {
    return DecCoin.decode(message.value);
  },
  toProto(message: DecCoin): Uint8Array {
    return DecCoin.encode(message).finish();
  },
  toProtoMsg(message: DecCoin): DecCoinProtoMsg {
    return {
      typeUrl: "/cosmos.base.v1beta1.DecCoin",
      value: DecCoin.encode(message).finish()
    };
  }
};
function createBaseIntProto(): IntProto {
  return {
    int: ""
  };
}
export const IntProto = {
  typeUrl: "/cosmos.base.v1beta1.IntProto",
  encode(message: IntProto, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.int !== "") {
      writer.uint32(10).string(message.int);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): IntProto {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIntProto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.int = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): IntProto {
    return {
      int: isSet(object.int) ? String(object.int) : ""
    };
  },
  toJSON(message: IntProto): JsonSafe<IntProto> {
    const obj: any = {};
    message.int !== undefined && (obj.int = message.int);
    return obj;
  },
  fromPartial(object: Partial<IntProto>): IntProto {
    const message = createBaseIntProto();
    message.int = object.int ?? "";
    return message;
  },
  fromAmino(object: IntProtoAmino): IntProto {
    const message = createBaseIntProto();
    if (object.int !== undefined && object.int !== null) {
      message.int = object.int;
    }
    return message;
  },
  toAmino(message: IntProto): IntProtoAmino {
    const obj: any = {};
    obj.int = message.int === "" ? undefined : message.int;
    return obj;
  },
  fromAminoMsg(object: IntProtoAminoMsg): IntProto {
    return IntProto.fromAmino(object.value);
  },
  toAminoMsg(message: IntProto): IntProtoAminoMsg {
    return {
      type: "cosmos-sdk/IntProto",
      value: IntProto.toAmino(message)
    };
  },
  fromProtoMsg(message: IntProtoProtoMsg): IntProto {
    return IntProto.decode(message.value);
  },
  toProto(message: IntProto): Uint8Array {
    return IntProto.encode(message).finish();
  },
  toProtoMsg(message: IntProto): IntProtoProtoMsg {
    return {
      typeUrl: "/cosmos.base.v1beta1.IntProto",
      value: IntProto.encode(message).finish()
    };
  }
};
function createBaseDecProto(): DecProto {
  return {
    dec: ""
  };
}
export const DecProto = {
  typeUrl: "/cosmos.base.v1beta1.DecProto",
  encode(message: DecProto, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.dec !== "") {
      writer.uint32(10).string(message.dec);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): DecProto {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDecProto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.dec = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): DecProto {
    return {
      dec: isSet(object.dec) ? String(object.dec) : ""
    };
  },
  toJSON(message: DecProto): JsonSafe<DecProto> {
    const obj: any = {};
    message.dec !== undefined && (obj.dec = message.dec);
    return obj;
  },
  fromPartial(object: Partial<DecProto>): DecProto {
    const message = createBaseDecProto();
    message.dec = object.dec ?? "";
    return message;
  },
  fromAmino(object: DecProtoAmino): DecProto {
    const message = createBaseDecProto();
    if (object.dec !== undefined && object.dec !== null) {
      message.dec = object.dec;
    }
    return message;
  },
  toAmino(message: DecProto): DecProtoAmino {
    const obj: any = {};
    obj.dec = message.dec === "" ? undefined : message.dec;
    return obj;
  },
  fromAminoMsg(object: DecProtoAminoMsg): DecProto {
    return DecProto.fromAmino(object.value);
  },
  toAminoMsg(message: DecProto): DecProtoAminoMsg {
    return {
      type: "cosmos-sdk/DecProto",
      value: DecProto.toAmino(message)
    };
  },
  fromProtoMsg(message: DecProtoProtoMsg): DecProto {
    return DecProto.decode(message.value);
  },
  toProto(message: DecProto): Uint8Array {
    return DecProto.encode(message).finish();
  },
  toProtoMsg(message: DecProto): DecProtoProtoMsg {
    return {
      typeUrl: "/cosmos.base.v1beta1.DecProto",
      value: DecProto.encode(message).finish()
    };
  }
};