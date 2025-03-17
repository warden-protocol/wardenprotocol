//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet } from "../../../helpers.js";
import { JsonSafe } from "../../../json-safe.js";
/** EventCreateFuture is emitted when a new Future is created. */
export interface EventCreateFuture {
  /** ID of the new Future. */
  id: bigint;
  /** Creator is the address that created the Future. */
  creator: string;
  /** Handler is the name of the handler that will be executed. */
  handler: string;
  /** Address of callback that will be triggered after execution. */
  callbackAddress: string;
}
export interface EventCreateFutureProtoMsg {
  typeUrl: "/warden.async.v1beta1.EventCreateFuture";
  value: Uint8Array;
}
/** EventCreateFuture is emitted when a new Future is created. */
export interface EventCreateFutureAmino {
  /** ID of the new Future. */
  id?: string;
  /** Creator is the address that created the Future. */
  creator?: string;
  /** Handler is the name of the handler that will be executed. */
  handler?: string;
  /** Address of callback that will be triggered after execution. */
  callback_address?: string;
}
export interface EventCreateFutureAminoMsg {
  type: "/warden.async.v1beta1.EventCreateFuture";
  value: EventCreateFutureAmino;
}
/** EventCreateFuture is emitted when a new Future is created. */
export interface EventCreateFutureSDKType {
  id: bigint;
  creator: string;
  handler: string;
  callback_address: string;
}
function createBaseEventCreateFuture(): EventCreateFuture {
  return {
    id: BigInt(0),
    creator: "",
    handler: "",
    callbackAddress: ""
  };
}
export const EventCreateFuture = {
  typeUrl: "/warden.async.v1beta1.EventCreateFuture",
  encode(message: EventCreateFuture, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.handler !== "") {
      writer.uint32(26).string(message.handler);
    }
    if (message.callbackAddress !== "") {
      writer.uint32(34).string(message.callbackAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventCreateFuture {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventCreateFuture();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.creator = reader.string();
          break;
        case 3:
          message.handler = reader.string();
          break;
        case 4:
          message.callbackAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EventCreateFuture {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      creator: isSet(object.creator) ? String(object.creator) : "",
      handler: isSet(object.handler) ? String(object.handler) : "",
      callbackAddress: isSet(object.callbackAddress) ? String(object.callbackAddress) : ""
    };
  },
  toJSON(message: EventCreateFuture): JsonSafe<EventCreateFuture> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.creator !== undefined && (obj.creator = message.creator);
    message.handler !== undefined && (obj.handler = message.handler);
    message.callbackAddress !== undefined && (obj.callbackAddress = message.callbackAddress);
    return obj;
  },
  fromPartial(object: Partial<EventCreateFuture>): EventCreateFuture {
    const message = createBaseEventCreateFuture();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.creator = object.creator ?? "";
    message.handler = object.handler ?? "";
    message.callbackAddress = object.callbackAddress ?? "";
    return message;
  },
  fromAmino(object: EventCreateFutureAmino): EventCreateFuture {
    const message = createBaseEventCreateFuture();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.handler !== undefined && object.handler !== null) {
      message.handler = object.handler;
    }
    if (object.callback_address !== undefined && object.callback_address !== null) {
      message.callbackAddress = object.callback_address;
    }
    return message;
  },
  toAmino(message: EventCreateFuture): EventCreateFutureAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? (message.id?.toString)() : undefined;
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.handler = message.handler === "" ? undefined : message.handler;
    obj.callback_address = message.callbackAddress === "" ? undefined : message.callbackAddress;
    return obj;
  },
  fromAminoMsg(object: EventCreateFutureAminoMsg): EventCreateFuture {
    return EventCreateFuture.fromAmino(object.value);
  },
  fromProtoMsg(message: EventCreateFutureProtoMsg): EventCreateFuture {
    return EventCreateFuture.decode(message.value);
  },
  toProto(message: EventCreateFuture): Uint8Array {
    return EventCreateFuture.encode(message).finish();
  },
  toProtoMsg(message: EventCreateFuture): EventCreateFutureProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.EventCreateFuture",
      value: EventCreateFuture.encode(message).finish()
    };
  }
};