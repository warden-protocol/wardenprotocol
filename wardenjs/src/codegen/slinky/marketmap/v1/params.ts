//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet } from "../../../helpers.js";
import { JsonSafe } from "../../../json-safe.js";
/** Params defines the parameters for the x/marketmap module. */
export interface Params {
  /**
   * MarketAuthorities is the list of authority accounts that are able to
   * control updating the marketmap.
   */
  marketAuthorities: string[];
  /**
   * Admin is an address that can remove addresses from the MarketAuthorities
   * list. Only governance can add to the MarketAuthorities or change the Admin.
   */
  admin: string;
}
export interface ParamsProtoMsg {
  typeUrl: "/slinky.marketmap.v1.Params";
  value: Uint8Array;
}
/** Params defines the parameters for the x/marketmap module. */
export interface ParamsAmino {
  /**
   * MarketAuthorities is the list of authority accounts that are able to
   * control updating the marketmap.
   */
  market_authorities?: string[];
  /**
   * Admin is an address that can remove addresses from the MarketAuthorities
   * list. Only governance can add to the MarketAuthorities or change the Admin.
   */
  admin?: string;
}
export interface ParamsAminoMsg {
  type: "/slinky.marketmap.v1.Params";
  value: ParamsAmino;
}
/** Params defines the parameters for the x/marketmap module. */
export interface ParamsSDKType {
  market_authorities: string[];
  admin: string;
}
function createBaseParams(): Params {
  return {
    marketAuthorities: [],
    admin: ""
  };
}
export const Params = {
  typeUrl: "/slinky.marketmap.v1.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.marketAuthorities) {
      writer.uint32(10).string(v!);
    }
    if (message.admin !== "") {
      writer.uint32(18).string(message.admin);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Params {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.marketAuthorities.push(reader.string());
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
  fromJSON(object: any): Params {
    return {
      marketAuthorities: Array.isArray(object?.marketAuthorities) ? object.marketAuthorities.map((e: any) => String(e)) : [],
      admin: isSet(object.admin) ? String(object.admin) : ""
    };
  },
  toJSON(message: Params): JsonSafe<Params> {
    const obj: any = {};
    if (message.marketAuthorities) {
      obj.marketAuthorities = message.marketAuthorities.map(e => e);
    } else {
      obj.marketAuthorities = [];
    }
    message.admin !== undefined && (obj.admin = message.admin);
    return obj;
  },
  fromPartial(object: Partial<Params>): Params {
    const message = createBaseParams();
    message.marketAuthorities = object.marketAuthorities?.map(e => e) || [];
    message.admin = object.admin ?? "";
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    message.marketAuthorities = object.market_authorities?.map(e => e) || [];
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = object.admin;
    }
    return message;
  },
  toAmino(message: Params): ParamsAmino {
    const obj: any = {};
    if (message.marketAuthorities) {
      obj.market_authorities = message.marketAuthorities.map(e => e);
    } else {
      obj.market_authorities = message.marketAuthorities;
    }
    obj.admin = message.admin === "" ? undefined : message.admin;
    return obj;
  },
  fromAminoMsg(object: ParamsAminoMsg): Params {
    return Params.fromAmino(object.value);
  },
  fromProtoMsg(message: ParamsProtoMsg): Params {
    return Params.decode(message.value);
  },
  toProto(message: Params): Uint8Array {
    return Params.encode(message).finish();
  },
  toProtoMsg(message: Params): ParamsProtoMsg {
    return {
      typeUrl: "/slinky.marketmap.v1.Params",
      value: Params.encode(message).finish()
    };
  }
};