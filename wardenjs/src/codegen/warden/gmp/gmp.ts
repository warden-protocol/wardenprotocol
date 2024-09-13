//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../binary.js";
import { isSet } from "../../helpers.js";
import { JsonSafe } from "../../json-safe.js";
/** Params defines the parameters for the gmp module. */
export interface Params {
  /** The axelar address that we'll send IBC transactions to. */
  gmpAddress: string;
  /** The channel over which we communicate with axelar. */
  gmpChannel: string;
  /** The amount of time we'll wait for a response from axelar before timing out. */
  gmpTimeout: bigint;
  /** The axelar address of the fee recipient. */
  feeRecipient: string;
}
export interface ParamsProtoMsg {
  typeUrl: "/warden.gmp.Params";
  value: Uint8Array;
}
/** Params defines the parameters for the gmp module. */
export interface ParamsAmino {
  /** The axelar address that we'll send IBC transactions to. */
  gmp_address?: string;
  /** The channel over which we communicate with axelar. */
  gmp_channel?: string;
  /** The amount of time we'll wait for a response from axelar before timing out. */
  gmp_timeout?: string;
  /** The axelar address of the fee recipient. */
  fee_recipient?: string;
}
export interface ParamsAminoMsg {
  type: "/warden.gmp.Params";
  value: ParamsAmino;
}
/** Params defines the parameters for the gmp module. */
export interface ParamsSDKType {
  gmp_address: string;
  gmp_channel: string;
  gmp_timeout: bigint;
  fee_recipient: string;
}
function createBaseParams(): Params {
  return {
    gmpAddress: "",
    gmpChannel: "",
    gmpTimeout: BigInt(0),
    feeRecipient: ""
  };
}
export const Params = {
  typeUrl: "/warden.gmp.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.gmpAddress !== "") {
      writer.uint32(10).string(message.gmpAddress);
    }
    if (message.gmpChannel !== "") {
      writer.uint32(18).string(message.gmpChannel);
    }
    if (message.gmpTimeout !== BigInt(0)) {
      writer.uint32(24).int64(message.gmpTimeout);
    }
    if (message.feeRecipient !== "") {
      writer.uint32(34).string(message.feeRecipient);
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
          message.gmpAddress = reader.string();
          break;
        case 2:
          message.gmpChannel = reader.string();
          break;
        case 3:
          message.gmpTimeout = reader.int64();
          break;
        case 4:
          message.feeRecipient = reader.string();
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
      gmpAddress: isSet(object.gmpAddress) ? String(object.gmpAddress) : "",
      gmpChannel: isSet(object.gmpChannel) ? String(object.gmpChannel) : "",
      gmpTimeout: isSet(object.gmpTimeout) ? BigInt(object.gmpTimeout.toString()) : BigInt(0),
      feeRecipient: isSet(object.feeRecipient) ? String(object.feeRecipient) : ""
    };
  },
  toJSON(message: Params): JsonSafe<Params> {
    const obj: any = {};
    message.gmpAddress !== undefined && (obj.gmpAddress = message.gmpAddress);
    message.gmpChannel !== undefined && (obj.gmpChannel = message.gmpChannel);
    message.gmpTimeout !== undefined && (obj.gmpTimeout = (message.gmpTimeout || BigInt(0)).toString());
    message.feeRecipient !== undefined && (obj.feeRecipient = message.feeRecipient);
    return obj;
  },
  fromPartial(object: Partial<Params>): Params {
    const message = createBaseParams();
    message.gmpAddress = object.gmpAddress ?? "";
    message.gmpChannel = object.gmpChannel ?? "";
    message.gmpTimeout = object.gmpTimeout !== undefined && object.gmpTimeout !== null ? BigInt(object.gmpTimeout.toString()) : BigInt(0);
    message.feeRecipient = object.feeRecipient ?? "";
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.gmp_address !== undefined && object.gmp_address !== null) {
      message.gmpAddress = object.gmp_address;
    }
    if (object.gmp_channel !== undefined && object.gmp_channel !== null) {
      message.gmpChannel = object.gmp_channel;
    }
    if (object.gmp_timeout !== undefined && object.gmp_timeout !== null) {
      message.gmpTimeout = BigInt(object.gmp_timeout);
    }
    if (object.fee_recipient !== undefined && object.fee_recipient !== null) {
      message.feeRecipient = object.fee_recipient;
    }
    return message;
  },
  toAmino(message: Params): ParamsAmino {
    const obj: any = {};
    obj.gmp_address = message.gmpAddress === "" ? undefined : message.gmpAddress;
    obj.gmp_channel = message.gmpChannel === "" ? undefined : message.gmpChannel;
    obj.gmp_timeout = message.gmpTimeout !== BigInt(0) ? (message.gmpTimeout?.toString)() : undefined;
    obj.fee_recipient = message.feeRecipient === "" ? undefined : message.feeRecipient;
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
      typeUrl: "/warden.gmp.Params",
      value: Params.encode(message).finish()
    };
  }
};