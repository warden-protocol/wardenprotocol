//@ts-nocheck
import { Duration, DurationAmino, DurationSDKType } from "../../../google/protobuf/duration.js";
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet } from "../../../helpers.js";
import { JsonSafe } from "../../../json-safe.js";
/** Params defines the parameters for the module. */
export interface Params {
  maxPendingTime: Duration;
  maxCompletedTime: Duration;
  pruneCheckBlockFrequency: bigint;
}
export interface ParamsProtoMsg {
  typeUrl: "/warden.act.v1beta1.Params";
  value: Uint8Array;
}
/** Params defines the parameters for the module. */
export interface ParamsAmino {
  max_pending_time: DurationAmino;
  max_completed_time: DurationAmino;
  prune_check_block_frequency?: string;
}
export interface ParamsAminoMsg {
  type: "warden/x/act/Params";
  value: ParamsAmino;
}
/** Params defines the parameters for the module. */
export interface ParamsSDKType {
  max_pending_time: DurationSDKType;
  max_completed_time: DurationSDKType;
  prune_check_block_frequency: bigint;
}
function createBaseParams(): Params {
  return {
    maxPendingTime: Duration.fromPartial({}),
    maxCompletedTime: Duration.fromPartial({}),
    pruneCheckBlockFrequency: BigInt(0)
  };
}
export const Params = {
  typeUrl: "/warden.act.v1beta1.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.maxPendingTime !== undefined) {
      Duration.encode(message.maxPendingTime, writer.uint32(10).fork()).ldelim();
    }
    if (message.maxCompletedTime !== undefined) {
      Duration.encode(message.maxCompletedTime, writer.uint32(18).fork()).ldelim();
    }
    if (message.pruneCheckBlockFrequency !== BigInt(0)) {
      writer.uint32(24).int64(message.pruneCheckBlockFrequency);
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
          message.maxPendingTime = Duration.decode(reader, reader.uint32());
          break;
        case 2:
          message.maxCompletedTime = Duration.decode(reader, reader.uint32());
          break;
        case 3:
          message.pruneCheckBlockFrequency = reader.int64();
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
      maxPendingTime: isSet(object.maxPendingTime) ? Duration.fromJSON(object.maxPendingTime) : undefined,
      maxCompletedTime: isSet(object.maxCompletedTime) ? Duration.fromJSON(object.maxCompletedTime) : undefined,
      pruneCheckBlockFrequency: isSet(object.pruneCheckBlockFrequency) ? BigInt(object.pruneCheckBlockFrequency.toString()) : BigInt(0)
    };
  },
  toJSON(message: Params): JsonSafe<Params> {
    const obj: any = {};
    message.maxPendingTime !== undefined && (obj.maxPendingTime = message.maxPendingTime ? Duration.toJSON(message.maxPendingTime) : undefined);
    message.maxCompletedTime !== undefined && (obj.maxCompletedTime = message.maxCompletedTime ? Duration.toJSON(message.maxCompletedTime) : undefined);
    message.pruneCheckBlockFrequency !== undefined && (obj.pruneCheckBlockFrequency = (message.pruneCheckBlockFrequency || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<Params>): Params {
    const message = createBaseParams();
    message.maxPendingTime = object.maxPendingTime !== undefined && object.maxPendingTime !== null ? Duration.fromPartial(object.maxPendingTime) : undefined;
    message.maxCompletedTime = object.maxCompletedTime !== undefined && object.maxCompletedTime !== null ? Duration.fromPartial(object.maxCompletedTime) : undefined;
    message.pruneCheckBlockFrequency = object.pruneCheckBlockFrequency !== undefined && object.pruneCheckBlockFrequency !== null ? BigInt(object.pruneCheckBlockFrequency.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.max_pending_time !== undefined && object.max_pending_time !== null) {
      message.maxPendingTime = Duration.fromAmino(object.max_pending_time);
    }
    if (object.max_completed_time !== undefined && object.max_completed_time !== null) {
      message.maxCompletedTime = Duration.fromAmino(object.max_completed_time);
    }
    if (object.prune_check_block_frequency !== undefined && object.prune_check_block_frequency !== null) {
      message.pruneCheckBlockFrequency = BigInt(object.prune_check_block_frequency);
    }
    return message;
  },
  toAmino(message: Params): ParamsAmino {
    const obj: any = {};
    obj.max_pending_time = message.maxPendingTime ? Duration.toAmino(message.maxPendingTime) : Duration.toAmino(Duration.fromPartial({}));
    obj.max_completed_time = message.maxCompletedTime ? Duration.toAmino(message.maxCompletedTime) : Duration.toAmino(Duration.fromPartial({}));
    obj.prune_check_block_frequency = message.pruneCheckBlockFrequency !== BigInt(0) ? (message.pruneCheckBlockFrequency?.toString)() : undefined;
    return obj;
  },
  fromAminoMsg(object: ParamsAminoMsg): Params {
    return Params.fromAmino(object.value);
  },
  toAminoMsg(message: Params): ParamsAminoMsg {
    return {
      type: "warden/x/act/Params",
      value: Params.toAmino(message)
    };
  },
  fromProtoMsg(message: ParamsProtoMsg): Params {
    return Params.decode(message.value);
  },
  toProto(message: Params): Uint8Array {
    return Params.encode(message).finish();
  },
  toProtoMsg(message: Params): ParamsProtoMsg {
    return {
      typeUrl: "/warden.act.v1beta1.Params",
      value: Params.encode(message).finish()
    };
  }
};