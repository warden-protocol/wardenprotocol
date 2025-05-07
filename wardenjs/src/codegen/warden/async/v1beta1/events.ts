//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet } from "../../../helpers.js";
import { JsonSafe } from "../../../json-safe.js";
/** EventCreateTask is emitted when a new Task is created. */
export interface EventCreateTask {
  /** ID of the new Task. */
  id: bigint;
  /** Creator is the address that created the Task. */
  creator: string;
  /** Plugin is the name of the plugin that will be executed. */
  plugin: string;
  /** Address of callback that will be triggered after execution. */
  callbackAddress: string;
}
export interface EventCreateTaskProtoMsg {
  typeUrl: "/warden.async.v1beta1.EventCreateTask";
  value: Uint8Array;
}
/** EventCreateTask is emitted when a new Task is created. */
export interface EventCreateTaskAmino {
  /** ID of the new Task. */
  id?: string;
  /** Creator is the address that created the Task. */
  creator?: string;
  /** Plugin is the name of the plugin that will be executed. */
  plugin?: string;
  /** Address of callback that will be triggered after execution. */
  callback_address?: string;
}
export interface EventCreateTaskAminoMsg {
  type: "/warden.async.v1beta1.EventCreateTask";
  value: EventCreateTaskAmino;
}
/** EventCreateTask is emitted when a new Task is created. */
export interface EventCreateTaskSDKType {
  id: bigint;
  creator: string;
  plugin: string;
  callback_address: string;
}
function createBaseEventCreateTask(): EventCreateTask {
  return {
    id: BigInt(0),
    creator: "",
    plugin: "",
    callbackAddress: ""
  };
}
export const EventCreateTask = {
  typeUrl: "/warden.async.v1beta1.EventCreateTask",
  encode(message: EventCreateTask, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.plugin !== "") {
      writer.uint32(26).string(message.plugin);
    }
    if (message.callbackAddress !== "") {
      writer.uint32(34).string(message.callbackAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventCreateTask {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventCreateTask();
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
          message.plugin = reader.string();
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
  fromJSON(object: any): EventCreateTask {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      creator: isSet(object.creator) ? String(object.creator) : "",
      plugin: isSet(object.plugin) ? String(object.plugin) : "",
      callbackAddress: isSet(object.callbackAddress) ? String(object.callbackAddress) : ""
    };
  },
  toJSON(message: EventCreateTask): JsonSafe<EventCreateTask> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.creator !== undefined && (obj.creator = message.creator);
    message.plugin !== undefined && (obj.plugin = message.plugin);
    message.callbackAddress !== undefined && (obj.callbackAddress = message.callbackAddress);
    return obj;
  },
  fromPartial(object: Partial<EventCreateTask>): EventCreateTask {
    const message = createBaseEventCreateTask();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.creator = object.creator ?? "";
    message.plugin = object.plugin ?? "";
    message.callbackAddress = object.callbackAddress ?? "";
    return message;
  },
  fromAmino(object: EventCreateTaskAmino): EventCreateTask {
    const message = createBaseEventCreateTask();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.plugin !== undefined && object.plugin !== null) {
      message.plugin = object.plugin;
    }
    if (object.callback_address !== undefined && object.callback_address !== null) {
      message.callbackAddress = object.callback_address;
    }
    return message;
  },
  toAmino(message: EventCreateTask): EventCreateTaskAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? (message.id?.toString)() : undefined;
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.plugin = message.plugin === "" ? undefined : message.plugin;
    obj.callback_address = message.callbackAddress === "" ? undefined : message.callbackAddress;
    return obj;
  },
  fromAminoMsg(object: EventCreateTaskAminoMsg): EventCreateTask {
    return EventCreateTask.fromAmino(object.value);
  },
  fromProtoMsg(message: EventCreateTaskProtoMsg): EventCreateTask {
    return EventCreateTask.decode(message.value);
  },
  toProto(message: EventCreateTask): Uint8Array {
    return EventCreateTask.encode(message).finish();
  },
  toProtoMsg(message: EventCreateTask): EventCreateTaskProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.EventCreateTask",
      value: EventCreateTask.encode(message).finish()
    };
  }
};