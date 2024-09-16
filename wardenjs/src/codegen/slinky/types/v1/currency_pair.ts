//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet } from "../../../helpers.js";
import { JsonSafe } from "../../../json-safe.js";
/**
 * CurrencyPair is the standard representation of a pair of assets, where one
 * (Base) is priced in terms of the other (Quote)
 */
export interface CurrencyPair {
  base: string;
  quote: string;
}
export interface CurrencyPairProtoMsg {
  typeUrl: "/slinky.types.v1.CurrencyPair";
  value: Uint8Array;
}
/**
 * CurrencyPair is the standard representation of a pair of assets, where one
 * (Base) is priced in terms of the other (Quote)
 */
export interface CurrencyPairAmino {
  Base?: string;
  Quote?: string;
}
export interface CurrencyPairAminoMsg {
  type: "/slinky.types.v1.CurrencyPair";
  value: CurrencyPairAmino;
}
/**
 * CurrencyPair is the standard representation of a pair of assets, where one
 * (Base) is priced in terms of the other (Quote)
 */
export interface CurrencyPairSDKType {
  Base: string;
  Quote: string;
}
function createBaseCurrencyPair(): CurrencyPair {
  return {
    base: "",
    quote: ""
  };
}
export const CurrencyPair = {
  typeUrl: "/slinky.types.v1.CurrencyPair",
  encode(message: CurrencyPair, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.base !== "") {
      writer.uint32(10).string(message.base);
    }
    if (message.quote !== "") {
      writer.uint32(18).string(message.quote);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): CurrencyPair {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCurrencyPair();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.base = reader.string();
          break;
        case 2:
          message.quote = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CurrencyPair {
    return {
      base: isSet(object.base) ? String(object.base) : "",
      quote: isSet(object.quote) ? String(object.quote) : ""
    };
  },
  toJSON(message: CurrencyPair): JsonSafe<CurrencyPair> {
    const obj: any = {};
    message.base !== undefined && (obj.base = message.base);
    message.quote !== undefined && (obj.quote = message.quote);
    return obj;
  },
  fromPartial(object: Partial<CurrencyPair>): CurrencyPair {
    const message = createBaseCurrencyPair();
    message.base = object.base ?? "";
    message.quote = object.quote ?? "";
    return message;
  },
  fromAmino(object: CurrencyPairAmino): CurrencyPair {
    const message = createBaseCurrencyPair();
    if (object.Base !== undefined && object.Base !== null) {
      message.base = object.Base;
    }
    if (object.Quote !== undefined && object.Quote !== null) {
      message.quote = object.Quote;
    }
    return message;
  },
  toAmino(message: CurrencyPair): CurrencyPairAmino {
    const obj: any = {};
    obj.Base = message.base === "" ? undefined : message.base;
    obj.Quote = message.quote === "" ? undefined : message.quote;
    return obj;
  },
  fromAminoMsg(object: CurrencyPairAminoMsg): CurrencyPair {
    return CurrencyPair.fromAmino(object.value);
  },
  fromProtoMsg(message: CurrencyPairProtoMsg): CurrencyPair {
    return CurrencyPair.decode(message.value);
  },
  toProto(message: CurrencyPair): Uint8Array {
    return CurrencyPair.encode(message).finish();
  },
  toProtoMsg(message: CurrencyPair): CurrencyPairProtoMsg {
    return {
      typeUrl: "/slinky.types.v1.CurrencyPair",
      value: CurrencyPair.encode(message).finish()
    };
  }
};