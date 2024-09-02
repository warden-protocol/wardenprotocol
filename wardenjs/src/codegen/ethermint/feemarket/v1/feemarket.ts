//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { Decimal } from "@cosmjs/math";
import { isSet } from "../../../helpers.js";
import { JsonSafe } from "../../../json-safe.js";
/** Params defines the EVM module parameters */
export interface Params {
  /** no_base_fee forces the EIP-1559 base fee to 0 (needed for 0 price calls) */
  noBaseFee: boolean;
  /**
   * base_fee_change_denominator bounds the amount the base fee can change
   * between blocks.
   */
  baseFeeChangeDenominator: number;
  /**
   * elasticity_multiplier bounds the maximum gas limit an EIP-1559 block may
   * have.
   */
  elasticityMultiplier: number;
  /** enable_height defines at which block height the base fee calculation is enabled. */
  enableHeight: bigint;
  /** base_fee for EIP-1559 blocks. */
  baseFee: string;
  /** min_gas_price defines the minimum gas price value for cosmos and eth transactions */
  minGasPrice: string;
  /**
   * min_gas_multiplier bounds the minimum gas used to be charged
   * to senders based on gas limit
   */
  minGasMultiplier: string;
}
export interface ParamsProtoMsg {
  typeUrl: "/ethermint.feemarket.v1.Params";
  value: Uint8Array;
}
/** Params defines the EVM module parameters */
export interface ParamsAmino {
  /** no_base_fee forces the EIP-1559 base fee to 0 (needed for 0 price calls) */
  no_base_fee?: boolean;
  /**
   * base_fee_change_denominator bounds the amount the base fee can change
   * between blocks.
   */
  base_fee_change_denominator?: number;
  /**
   * elasticity_multiplier bounds the maximum gas limit an EIP-1559 block may
   * have.
   */
  elasticity_multiplier?: number;
  /** enable_height defines at which block height the base fee calculation is enabled. */
  enable_height?: string;
  /** base_fee for EIP-1559 blocks. */
  base_fee?: string;
  /** min_gas_price defines the minimum gas price value for cosmos and eth transactions */
  min_gas_price?: string;
  /**
   * min_gas_multiplier bounds the minimum gas used to be charged
   * to senders based on gas limit
   */
  min_gas_multiplier?: string;
}
export interface ParamsAminoMsg {
  type: "/ethermint.feemarket.v1.Params";
  value: ParamsAmino;
}
/** Params defines the EVM module parameters */
export interface ParamsSDKType {
  no_base_fee: boolean;
  base_fee_change_denominator: number;
  elasticity_multiplier: number;
  enable_height: bigint;
  base_fee: string;
  min_gas_price: string;
  min_gas_multiplier: string;
}
function createBaseParams(): Params {
  return {
    noBaseFee: false,
    baseFeeChangeDenominator: 0,
    elasticityMultiplier: 0,
    enableHeight: BigInt(0),
    baseFee: "",
    minGasPrice: "",
    minGasMultiplier: ""
  };
}
export const Params = {
  typeUrl: "/ethermint.feemarket.v1.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.noBaseFee === true) {
      writer.uint32(8).bool(message.noBaseFee);
    }
    if (message.baseFeeChangeDenominator !== 0) {
      writer.uint32(16).uint32(message.baseFeeChangeDenominator);
    }
    if (message.elasticityMultiplier !== 0) {
      writer.uint32(24).uint32(message.elasticityMultiplier);
    }
    if (message.enableHeight !== BigInt(0)) {
      writer.uint32(40).int64(message.enableHeight);
    }
    if (message.baseFee !== "") {
      writer.uint32(50).string(message.baseFee);
    }
    if (message.minGasPrice !== "") {
      writer.uint32(58).string(Decimal.fromUserInput(message.minGasPrice, 18).atomics);
    }
    if (message.minGasMultiplier !== "") {
      writer.uint32(66).string(Decimal.fromUserInput(message.minGasMultiplier, 18).atomics);
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
          message.noBaseFee = reader.bool();
          break;
        case 2:
          message.baseFeeChangeDenominator = reader.uint32();
          break;
        case 3:
          message.elasticityMultiplier = reader.uint32();
          break;
        case 5:
          message.enableHeight = reader.int64();
          break;
        case 6:
          message.baseFee = reader.string();
          break;
        case 7:
          message.minGasPrice = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 8:
          message.minGasMultiplier = Decimal.fromAtomics(reader.string(), 18).toString();
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
      noBaseFee: isSet(object.noBaseFee) ? Boolean(object.noBaseFee) : false,
      baseFeeChangeDenominator: isSet(object.baseFeeChangeDenominator) ? Number(object.baseFeeChangeDenominator) : 0,
      elasticityMultiplier: isSet(object.elasticityMultiplier) ? Number(object.elasticityMultiplier) : 0,
      enableHeight: isSet(object.enableHeight) ? BigInt(object.enableHeight.toString()) : BigInt(0),
      baseFee: isSet(object.baseFee) ? String(object.baseFee) : "",
      minGasPrice: isSet(object.minGasPrice) ? String(object.minGasPrice) : "",
      minGasMultiplier: isSet(object.minGasMultiplier) ? String(object.minGasMultiplier) : ""
    };
  },
  toJSON(message: Params): JsonSafe<Params> {
    const obj: any = {};
    message.noBaseFee !== undefined && (obj.noBaseFee = message.noBaseFee);
    message.baseFeeChangeDenominator !== undefined && (obj.baseFeeChangeDenominator = Math.round(message.baseFeeChangeDenominator));
    message.elasticityMultiplier !== undefined && (obj.elasticityMultiplier = Math.round(message.elasticityMultiplier));
    message.enableHeight !== undefined && (obj.enableHeight = (message.enableHeight || BigInt(0)).toString());
    message.baseFee !== undefined && (obj.baseFee = message.baseFee);
    message.minGasPrice !== undefined && (obj.minGasPrice = message.minGasPrice);
    message.minGasMultiplier !== undefined && (obj.minGasMultiplier = message.minGasMultiplier);
    return obj;
  },
  fromPartial(object: Partial<Params>): Params {
    const message = createBaseParams();
    message.noBaseFee = object.noBaseFee ?? false;
    message.baseFeeChangeDenominator = object.baseFeeChangeDenominator ?? 0;
    message.elasticityMultiplier = object.elasticityMultiplier ?? 0;
    message.enableHeight = object.enableHeight !== undefined && object.enableHeight !== null ? BigInt(object.enableHeight.toString()) : BigInt(0);
    message.baseFee = object.baseFee ?? "";
    message.minGasPrice = object.minGasPrice ?? "";
    message.minGasMultiplier = object.minGasMultiplier ?? "";
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.no_base_fee !== undefined && object.no_base_fee !== null) {
      message.noBaseFee = object.no_base_fee;
    }
    if (object.base_fee_change_denominator !== undefined && object.base_fee_change_denominator !== null) {
      message.baseFeeChangeDenominator = object.base_fee_change_denominator;
    }
    if (object.elasticity_multiplier !== undefined && object.elasticity_multiplier !== null) {
      message.elasticityMultiplier = object.elasticity_multiplier;
    }
    if (object.enable_height !== undefined && object.enable_height !== null) {
      message.enableHeight = BigInt(object.enable_height);
    }
    if (object.base_fee !== undefined && object.base_fee !== null) {
      message.baseFee = object.base_fee;
    }
    if (object.min_gas_price !== undefined && object.min_gas_price !== null) {
      message.minGasPrice = object.min_gas_price;
    }
    if (object.min_gas_multiplier !== undefined && object.min_gas_multiplier !== null) {
      message.minGasMultiplier = object.min_gas_multiplier;
    }
    return message;
  },
  toAmino(message: Params): ParamsAmino {
    const obj: any = {};
    obj.no_base_fee = message.noBaseFee === false ? undefined : message.noBaseFee;
    obj.base_fee_change_denominator = message.baseFeeChangeDenominator === 0 ? undefined : message.baseFeeChangeDenominator;
    obj.elasticity_multiplier = message.elasticityMultiplier === 0 ? undefined : message.elasticityMultiplier;
    obj.enable_height = message.enableHeight !== BigInt(0) ? message.enableHeight.toString() : undefined;
    obj.base_fee = message.baseFee === "" ? undefined : message.baseFee;
    obj.min_gas_price = message.minGasPrice === "" ? undefined : message.minGasPrice;
    obj.min_gas_multiplier = message.minGasMultiplier === "" ? undefined : message.minGasMultiplier;
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
      typeUrl: "/ethermint.feemarket.v1.Params",
      value: Params.encode(message).finish()
    };
  }
};