//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params.js";
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet, bytesFromBase64, base64FromBytes } from "../../../helpers.js";
import { JsonSafe } from "../../../json-safe.js";
/** MsgUpdateParams is the Msg/UpdateParams request type. */
export interface MsgUpdateParams {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /** NOTE: All parameters must be supplied. */
  params: Params;
}
export interface MsgUpdateParamsProtoMsg {
  typeUrl: "/warden.async.v1beta1.MsgUpdateParams";
  value: Uint8Array;
}
/** MsgUpdateParams is the Msg/UpdateParams request type. */
export interface MsgUpdateParamsAmino {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority?: string;
  /** NOTE: All parameters must be supplied. */
  params: ParamsAmino;
}
export interface MsgUpdateParamsAminoMsg {
  type: "warden/x/async/MsgUpdateParams";
  value: MsgUpdateParamsAmino;
}
/** MsgUpdateParams is the Msg/UpdateParams request type. */
export interface MsgUpdateParamsSDKType {
  authority: string;
  params: ParamsSDKType;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponse {}
export interface MsgUpdateParamsResponseProtoMsg {
  typeUrl: "/warden.async.v1beta1.MsgUpdateParamsResponse";
  value: Uint8Array;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/warden.async.v1beta1.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponseSDKType {}
export interface MsgAddTask {
  creator: string;
  plugin: string;
  input: Uint8Array;
  callback: string;
}
export interface MsgAddTaskProtoMsg {
  typeUrl: "/warden.async.v1beta1.MsgAddTask";
  value: Uint8Array;
}
export interface MsgAddTaskAmino {
  creator?: string;
  plugin?: string;
  input?: string;
  callback?: string;
}
export interface MsgAddTaskAminoMsg {
  type: "/warden.async.v1beta1.MsgAddTask";
  value: MsgAddTaskAmino;
}
export interface MsgAddTaskSDKType {
  creator: string;
  plugin: string;
  input: Uint8Array;
  callback: string;
}
export interface MsgAddTaskResponse {
  id: bigint;
}
export interface MsgAddTaskResponseProtoMsg {
  typeUrl: "/warden.async.v1beta1.MsgAddTaskResponse";
  value: Uint8Array;
}
export interface MsgAddTaskResponseAmino {
  id?: string;
}
export interface MsgAddTaskResponseAminoMsg {
  type: "/warden.async.v1beta1.MsgAddTaskResponse";
  value: MsgAddTaskResponseAmino;
}
export interface MsgAddTaskResponseSDKType {
  id: bigint;
}
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: Params.fromPartial({})
  };
}
export const MsgUpdateParams = {
  typeUrl: "/warden.async.v1beta1.MsgUpdateParams",
  encode(message: MsgUpdateParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgUpdateParams {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined
    };
  },
  toJSON(message: MsgUpdateParams): JsonSafe<MsgUpdateParams> {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },
  fromPartial(object: Partial<MsgUpdateParams>): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateParamsAmino): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: MsgUpdateParams): MsgUpdateParamsAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.params = message.params ? Params.toAmino(message.params) : Params.toAmino(Params.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsAminoMsg): MsgUpdateParams {
    return MsgUpdateParams.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateParams): MsgUpdateParamsAminoMsg {
    return {
      type: "warden/x/async/MsgUpdateParams",
      value: MsgUpdateParams.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgUpdateParamsProtoMsg): MsgUpdateParams {
    return MsgUpdateParams.decode(message.value);
  },
  toProto(message: MsgUpdateParams): Uint8Array {
    return MsgUpdateParams.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParams): MsgUpdateParamsProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/warden.async.v1beta1.MsgUpdateParamsResponse",
  encode(_: MsgUpdateParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): MsgUpdateParamsResponse {
    return {};
  },
  toJSON(_: MsgUpdateParamsResponse): JsonSafe<MsgUpdateParamsResponse> {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<MsgUpdateParamsResponse>): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  fromAmino(_: MsgUpdateParamsResponseAmino): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  toAmino(_: MsgUpdateParamsResponse): MsgUpdateParamsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsResponseAminoMsg): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateParamsResponseProtoMsg): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.decode(message.value);
  },
  toProto(message: MsgUpdateParamsResponse): Uint8Array {
    return MsgUpdateParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParamsResponse): MsgUpdateParamsResponseProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgAddTask(): MsgAddTask {
  return {
    creator: "",
    plugin: "",
    input: new Uint8Array(),
    callback: ""
  };
}
export const MsgAddTask = {
  typeUrl: "/warden.async.v1beta1.MsgAddTask",
  encode(message: MsgAddTask, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.plugin !== "") {
      writer.uint32(18).string(message.plugin);
    }
    if (message.input.length !== 0) {
      writer.uint32(26).bytes(message.input);
    }
    if (message.callback !== "") {
      writer.uint32(34).string(message.callback);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgAddTask {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddTask();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.plugin = reader.string();
          break;
        case 3:
          message.input = reader.bytes();
          break;
        case 4:
          message.callback = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgAddTask {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      plugin: isSet(object.plugin) ? String(object.plugin) : "",
      input: isSet(object.input) ? bytesFromBase64(object.input) : new Uint8Array(),
      callback: isSet(object.callback) ? String(object.callback) : ""
    };
  },
  toJSON(message: MsgAddTask): JsonSafe<MsgAddTask> {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.plugin !== undefined && (obj.plugin = message.plugin);
    message.input !== undefined && (obj.input = base64FromBytes(message.input !== undefined ? message.input : new Uint8Array()));
    message.callback !== undefined && (obj.callback = message.callback);
    return obj;
  },
  fromPartial(object: Partial<MsgAddTask>): MsgAddTask {
    const message = createBaseMsgAddTask();
    message.creator = object.creator ?? "";
    message.plugin = object.plugin ?? "";
    message.input = object.input ?? new Uint8Array();
    message.callback = object.callback ?? "";
    return message;
  },
  fromAmino(object: MsgAddTaskAmino): MsgAddTask {
    const message = createBaseMsgAddTask();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.plugin !== undefined && object.plugin !== null) {
      message.plugin = object.plugin;
    }
    if (object.input !== undefined && object.input !== null) {
      message.input = bytesFromBase64(object.input);
    }
    if (object.callback !== undefined && object.callback !== null) {
      message.callback = object.callback;
    }
    return message;
  },
  toAmino(message: MsgAddTask): MsgAddTaskAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.plugin = message.plugin === "" ? undefined : message.plugin;
    obj.input = message.input ? base64FromBytes(message.input) : undefined;
    obj.callback = message.callback === "" ? undefined : message.callback;
    return obj;
  },
  fromAminoMsg(object: MsgAddTaskAminoMsg): MsgAddTask {
    return MsgAddTask.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAddTaskProtoMsg): MsgAddTask {
    return MsgAddTask.decode(message.value);
  },
  toProto(message: MsgAddTask): Uint8Array {
    return MsgAddTask.encode(message).finish();
  },
  toProtoMsg(message: MsgAddTask): MsgAddTaskProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.MsgAddTask",
      value: MsgAddTask.encode(message).finish()
    };
  }
};
function createBaseMsgAddTaskResponse(): MsgAddTaskResponse {
  return {
    id: BigInt(0)
  };
}
export const MsgAddTaskResponse = {
  typeUrl: "/warden.async.v1beta1.MsgAddTaskResponse",
  encode(message: MsgAddTaskResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgAddTaskResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddTaskResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgAddTaskResponse {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0)
    };
  },
  toJSON(message: MsgAddTaskResponse): JsonSafe<MsgAddTaskResponse> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<MsgAddTaskResponse>): MsgAddTaskResponse {
    const message = createBaseMsgAddTaskResponse();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgAddTaskResponseAmino): MsgAddTaskResponse {
    const message = createBaseMsgAddTaskResponse();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: MsgAddTaskResponse): MsgAddTaskResponseAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? (message.id?.toString)() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgAddTaskResponseAminoMsg): MsgAddTaskResponse {
    return MsgAddTaskResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAddTaskResponseProtoMsg): MsgAddTaskResponse {
    return MsgAddTaskResponse.decode(message.value);
  },
  toProto(message: MsgAddTaskResponse): Uint8Array {
    return MsgAddTaskResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgAddTaskResponse): MsgAddTaskResponseProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.MsgAddTaskResponse",
      value: MsgAddTaskResponse.encode(message).finish()
    };
  }
};