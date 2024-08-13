//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet } from "../../../helpers.js";
import { JsonSafe } from "../../../json-safe.js";
/**
 * CurrencyPair is the standard representation of a pair of assets, where one
 * (Base) is priced in terms of the other (Quote)
 */
export interface CurrencyPair {
  Base: string;
  Quote: string;
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
    Base: "",
    Quote: ""
  };
}
export const CurrencyPair = {
  typeUrl: "/slinky.types.v1.CurrencyPair",
  encode(message: CurrencyPair, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.Base !== "") {
      writer.uint32(10).string(message.Base);
    }
    if (message.Quote !== "") {
      writer.uint32(18).string(message.Quote);
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
          message.Base = reader.string();
          break;
        case 2:
          message.Quote = reader.string();
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
      Base: isSet(object.Base) ? String(object.Base) : "",
      Quote: isSet(object.Quote) ? String(object.Quote) : ""
    };
  },
  toJSON(message: CurrencyPair): JsonSafe<CurrencyPair> {
    const obj: any = {};
    message.Base !== undefined && (obj.Base = message.Base);
    message.Quote !== undefined && (obj.Quote = message.Quote);
    return obj;
  },
  fromPartial(object: Partial<CurrencyPair>): CurrencyPair {
    const message = createBaseCurrencyPair();
    message.Base = object.Base ?? "";
    message.Quote = object.Quote ?? "";
    return message;
  },
  fromAmino(object: CurrencyPairAmino): CurrencyPair {
    const message = createBaseCurrencyPair();
    if (object.Base !== undefined && object.Base !== null) {
      message.Base = object.Base;
    }
    if (object.Quote !== undefined && object.Quote !== null) {
      message.Quote = object.Quote;
    }
    return message;
  },
  toAmino(message: CurrencyPair): CurrencyPairAmino {
    const obj: any = {};
    obj.Base = message.Base === "" ? undefined : message.Base;
    obj.Quote = message.Quote === "" ? undefined : message.Quote;
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