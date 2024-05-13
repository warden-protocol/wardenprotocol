//@ts-nocheck
import * as _m0 from "protobufjs/minimal";
import { isSet } from "../../../../helpers";
/** BIP44Params is used as path field in ledger item in Record. */
export interface BIP44Params {
  /** purpose is a constant set to 44' (or 0x8000002C) following the BIP43 recommendation */
  purpose: number;
  /** coin_type is a constant that improves privacy */
  coinType: number;
  /** account splits the key space into independent user identities */
  account: number;
  /**
   * change is a constant used for public derivation. Constant 0 is used for external chain and constant 1 for internal
   * chain.
   */
  change: boolean;
  /** address_index is used as child index in BIP32 derivation */
  addressIndex: number;
}
export interface BIP44ParamsProtoMsg {
  typeUrl: "/cosmos.crypto.hd.v1.BIP44Params";
  value: Uint8Array;
}
/** BIP44Params is used as path field in ledger item in Record. */
export interface BIP44ParamsAmino {
  /** purpose is a constant set to 44' (or 0x8000002C) following the BIP43 recommendation */
  purpose?: number;
  /** coin_type is a constant that improves privacy */
  coin_type?: number;
  /** account splits the key space into independent user identities */
  account?: number;
  /**
   * change is a constant used for public derivation. Constant 0 is used for external chain and constant 1 for internal
   * chain.
   */
  change?: boolean;
  /** address_index is used as child index in BIP32 derivation */
  address_index?: number;
}
export interface BIP44ParamsAminoMsg {
  type: "cosmos-sdk/BIP44Params";
  value: BIP44ParamsAmino;
}
/** BIP44Params is used as path field in ledger item in Record. */
export interface BIP44ParamsSDKType {
  purpose: number;
  coin_type: number;
  account: number;
  change: boolean;
  address_index: number;
}
function createBaseBIP44Params(): BIP44Params {
  return {
    purpose: 0,
    coinType: 0,
    account: 0,
    change: false,
    addressIndex: 0
  };
}
export const BIP44Params = {
  typeUrl: "/cosmos.crypto.hd.v1.BIP44Params",
  encode(message: BIP44Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.purpose !== 0) {
      writer.uint32(8).uint32(message.purpose);
    }
    if (message.coinType !== 0) {
      writer.uint32(16).uint32(message.coinType);
    }
    if (message.account !== 0) {
      writer.uint32(24).uint32(message.account);
    }
    if (message.change === true) {
      writer.uint32(32).bool(message.change);
    }
    if (message.addressIndex !== 0) {
      writer.uint32(40).uint32(message.addressIndex);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): BIP44Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBIP44Params();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.purpose = reader.uint32();
          break;
        case 2:
          message.coinType = reader.uint32();
          break;
        case 3:
          message.account = reader.uint32();
          break;
        case 4:
          message.change = reader.bool();
          break;
        case 5:
          message.addressIndex = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): BIP44Params {
    return {
      purpose: isSet(object.purpose) ? Number(object.purpose) : 0,
      coinType: isSet(object.coinType) ? Number(object.coinType) : 0,
      account: isSet(object.account) ? Number(object.account) : 0,
      change: isSet(object.change) ? Boolean(object.change) : false,
      addressIndex: isSet(object.addressIndex) ? Number(object.addressIndex) : 0
    };
  },
  toJSON(message: BIP44Params): unknown {
    const obj: any = {};
    message.purpose !== undefined && (obj.purpose = Math.round(message.purpose));
    message.coinType !== undefined && (obj.coinType = Math.round(message.coinType));
    message.account !== undefined && (obj.account = Math.round(message.account));
    message.change !== undefined && (obj.change = message.change);
    message.addressIndex !== undefined && (obj.addressIndex = Math.round(message.addressIndex));
    return obj;
  },
  fromPartial(object: Partial<BIP44Params>): BIP44Params {
    const message = createBaseBIP44Params();
    message.purpose = object.purpose ?? 0;
    message.coinType = object.coinType ?? 0;
    message.account = object.account ?? 0;
    message.change = object.change ?? false;
    message.addressIndex = object.addressIndex ?? 0;
    return message;
  },
  fromAmino(object: BIP44ParamsAmino): BIP44Params {
    const message = createBaseBIP44Params();
    if (object.purpose !== undefined && object.purpose !== null) {
      message.purpose = object.purpose;
    }
    if (object.coin_type !== undefined && object.coin_type !== null) {
      message.coinType = object.coin_type;
    }
    if (object.account !== undefined && object.account !== null) {
      message.account = object.account;
    }
    if (object.change !== undefined && object.change !== null) {
      message.change = object.change;
    }
    if (object.address_index !== undefined && object.address_index !== null) {
      message.addressIndex = object.address_index;
    }
    return message;
  },
  toAmino(message: BIP44Params): BIP44ParamsAmino {
    const obj: any = {};
    obj.purpose = message.purpose === 0 ? undefined : message.purpose;
    obj.coin_type = message.coinType === 0 ? undefined : message.coinType;
    obj.account = message.account === 0 ? undefined : message.account;
    obj.change = message.change === false ? undefined : message.change;
    obj.address_index = message.addressIndex === 0 ? undefined : message.addressIndex;
    return obj;
  },
  fromAminoMsg(object: BIP44ParamsAminoMsg): BIP44Params {
    return BIP44Params.fromAmino(object.value);
  },
  toAminoMsg(message: BIP44Params): BIP44ParamsAminoMsg {
    return {
      type: "cosmos-sdk/BIP44Params",
      value: BIP44Params.toAmino(message)
    };
  },
  fromProtoMsg(message: BIP44ParamsProtoMsg): BIP44Params {
    return BIP44Params.decode(message.value);
  },
  toProto(message: BIP44Params): Uint8Array {
    return BIP44Params.encode(message).finish();
  },
  toProtoMsg(message: BIP44Params): BIP44ParamsProtoMsg {
    return {
      typeUrl: "/cosmos.crypto.hd.v1.BIP44Params",
      value: BIP44Params.encode(message).finish()
    };
  }
};