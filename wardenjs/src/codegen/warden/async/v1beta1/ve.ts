//@ts-nocheck
import { TaskVoteType, taskVoteTypeFromJSON, taskVoteTypeToJSON } from "./task.js";
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { JsonSafe } from "../../../json-safe.js";
import { isSet, bytesFromBase64, base64FromBytes } from "../../../helpers.js";
export interface AsyncInjectedTx {}
export interface AsyncInjectedTxProtoMsg {
  typeUrl: "/warden.async.v1beta1.AsyncInjectedTx";
  value: Uint8Array;
}
export interface AsyncInjectedTxAmino {}
export interface AsyncInjectedTxAminoMsg {
  type: "/warden.async.v1beta1.AsyncInjectedTx";
  value: AsyncInjectedTxAmino;
}
export interface AsyncInjectedTxSDKType {}
/**
 * A vote extension coming from a validator. It contains results, votes for
 * some tasks and plugins that are supported by the validator.
 */
export interface AsyncVoteExtension {
  results: VEResultItem[];
  votes: VEVoteItem[];
  plugins: string[];
  updatePlugins: boolean;
}
export interface AsyncVoteExtensionProtoMsg {
  typeUrl: "/warden.async.v1beta1.AsyncVoteExtension";
  value: Uint8Array;
}
/**
 * A vote extension coming from a validator. It contains results, votes for
 * some tasks and plugins that are supported by the validator.
 */
export interface AsyncVoteExtensionAmino {
  results?: VEResultItemAmino[];
  votes?: VEVoteItemAmino[];
  plugins?: string[];
  update_plugins?: boolean;
}
export interface AsyncVoteExtensionAminoMsg {
  type: "/warden.async.v1beta1.AsyncVoteExtension";
  value: AsyncVoteExtensionAmino;
}
/**
 * A vote extension coming from a validator. It contains results, votes for
 * some tasks and plugins that are supported by the validator.
 */
export interface AsyncVoteExtensionSDKType {
  results: VEResultItemSDKType[];
  votes: VEVoteItemSDKType[];
  plugins: string[];
  update_plugins: boolean;
}
export interface VEResultItem {
  taskId: bigint;
  output: Uint8Array;
}
export interface VEResultItemProtoMsg {
  typeUrl: "/warden.async.v1beta1.VEResultItem";
  value: Uint8Array;
}
export interface VEResultItemAmino {
  task_id?: string;
  output?: string;
}
export interface VEResultItemAminoMsg {
  type: "/warden.async.v1beta1.VEResultItem";
  value: VEResultItemAmino;
}
export interface VEResultItemSDKType {
  task_id: bigint;
  output: Uint8Array;
}
export interface VEVoteItem {
  taskId: bigint;
  vote: TaskVoteType;
}
export interface VEVoteItemProtoMsg {
  typeUrl: "/warden.async.v1beta1.VEVoteItem";
  value: Uint8Array;
}
export interface VEVoteItemAmino {
  task_id?: string;
  vote?: TaskVoteType;
}
export interface VEVoteItemAminoMsg {
  type: "/warden.async.v1beta1.VEVoteItem";
  value: VEVoteItemAmino;
}
export interface VEVoteItemSDKType {
  task_id: bigint;
  vote: TaskVoteType;
}
function createBaseAsyncInjectedTx(): AsyncInjectedTx {
  return {};
}
export const AsyncInjectedTx = {
  typeUrl: "/warden.async.v1beta1.AsyncInjectedTx",
  encode(_: AsyncInjectedTx, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): AsyncInjectedTx {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAsyncInjectedTx();
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
  fromJSON(_: any): AsyncInjectedTx {
    return {};
  },
  toJSON(_: AsyncInjectedTx): JsonSafe<AsyncInjectedTx> {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<AsyncInjectedTx>): AsyncInjectedTx {
    const message = createBaseAsyncInjectedTx();
    return message;
  },
  fromAmino(_: AsyncInjectedTxAmino): AsyncInjectedTx {
    const message = createBaseAsyncInjectedTx();
    return message;
  },
  toAmino(_: AsyncInjectedTx): AsyncInjectedTxAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: AsyncInjectedTxAminoMsg): AsyncInjectedTx {
    return AsyncInjectedTx.fromAmino(object.value);
  },
  fromProtoMsg(message: AsyncInjectedTxProtoMsg): AsyncInjectedTx {
    return AsyncInjectedTx.decode(message.value);
  },
  toProto(message: AsyncInjectedTx): Uint8Array {
    return AsyncInjectedTx.encode(message).finish();
  },
  toProtoMsg(message: AsyncInjectedTx): AsyncInjectedTxProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.AsyncInjectedTx",
      value: AsyncInjectedTx.encode(message).finish()
    };
  }
};
function createBaseAsyncVoteExtension(): AsyncVoteExtension {
  return {
    results: [],
    votes: [],
    plugins: [],
    updatePlugins: false
  };
}
export const AsyncVoteExtension = {
  typeUrl: "/warden.async.v1beta1.AsyncVoteExtension",
  encode(message: AsyncVoteExtension, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.results) {
      VEResultItem.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.votes) {
      VEVoteItem.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.plugins) {
      writer.uint32(26).string(v!);
    }
    if (message.updatePlugins === true) {
      writer.uint32(32).bool(message.updatePlugins);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): AsyncVoteExtension {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAsyncVoteExtension();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.results.push(VEResultItem.decode(reader, reader.uint32()));
          break;
        case 2:
          message.votes.push(VEVoteItem.decode(reader, reader.uint32()));
          break;
        case 3:
          message.plugins.push(reader.string());
          break;
        case 4:
          message.updatePlugins = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): AsyncVoteExtension {
    return {
      results: Array.isArray(object?.results) ? object.results.map((e: any) => VEResultItem.fromJSON(e)) : [],
      votes: Array.isArray(object?.votes) ? object.votes.map((e: any) => VEVoteItem.fromJSON(e)) : [],
      plugins: Array.isArray(object?.plugins) ? object.plugins.map((e: any) => String(e)) : [],
      updatePlugins: isSet(object.updatePlugins) ? Boolean(object.updatePlugins) : false
    };
  },
  toJSON(message: AsyncVoteExtension): JsonSafe<AsyncVoteExtension> {
    const obj: any = {};
    if (message.results) {
      obj.results = message.results.map(e => e ? VEResultItem.toJSON(e) : undefined);
    } else {
      obj.results = [];
    }
    if (message.votes) {
      obj.votes = message.votes.map(e => e ? VEVoteItem.toJSON(e) : undefined);
    } else {
      obj.votes = [];
    }
    if (message.plugins) {
      obj.plugins = message.plugins.map(e => e);
    } else {
      obj.plugins = [];
    }
    message.updatePlugins !== undefined && (obj.updatePlugins = message.updatePlugins);
    return obj;
  },
  fromPartial(object: Partial<AsyncVoteExtension>): AsyncVoteExtension {
    const message = createBaseAsyncVoteExtension();
    message.results = object.results?.map(e => VEResultItem.fromPartial(e)) || [];
    message.votes = object.votes?.map(e => VEVoteItem.fromPartial(e)) || [];
    message.plugins = object.plugins?.map(e => e) || [];
    message.updatePlugins = object.updatePlugins ?? false;
    return message;
  },
  fromAmino(object: AsyncVoteExtensionAmino): AsyncVoteExtension {
    const message = createBaseAsyncVoteExtension();
    message.results = object.results?.map(e => VEResultItem.fromAmino(e)) || [];
    message.votes = object.votes?.map(e => VEVoteItem.fromAmino(e)) || [];
    message.plugins = object.plugins?.map(e => e) || [];
    if (object.update_plugins !== undefined && object.update_plugins !== null) {
      message.updatePlugins = object.update_plugins;
    }
    return message;
  },
  toAmino(message: AsyncVoteExtension): AsyncVoteExtensionAmino {
    const obj: any = {};
    if (message.results) {
      obj.results = message.results.map(e => e ? VEResultItem.toAmino(e) : undefined);
    } else {
      obj.results = message.results;
    }
    if (message.votes) {
      obj.votes = message.votes.map(e => e ? VEVoteItem.toAmino(e) : undefined);
    } else {
      obj.votes = message.votes;
    }
    if (message.plugins) {
      obj.plugins = message.plugins.map(e => e);
    } else {
      obj.plugins = message.plugins;
    }
    obj.update_plugins = message.updatePlugins === false ? undefined : message.updatePlugins;
    return obj;
  },
  fromAminoMsg(object: AsyncVoteExtensionAminoMsg): AsyncVoteExtension {
    return AsyncVoteExtension.fromAmino(object.value);
  },
  fromProtoMsg(message: AsyncVoteExtensionProtoMsg): AsyncVoteExtension {
    return AsyncVoteExtension.decode(message.value);
  },
  toProto(message: AsyncVoteExtension): Uint8Array {
    return AsyncVoteExtension.encode(message).finish();
  },
  toProtoMsg(message: AsyncVoteExtension): AsyncVoteExtensionProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.AsyncVoteExtension",
      value: AsyncVoteExtension.encode(message).finish()
    };
  }
};
function createBaseVEResultItem(): VEResultItem {
  return {
    taskId: BigInt(0),
    output: new Uint8Array()
  };
}
export const VEResultItem = {
  typeUrl: "/warden.async.v1beta1.VEResultItem",
  encode(message: VEResultItem, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.taskId !== BigInt(0)) {
      writer.uint32(8).uint64(message.taskId);
    }
    if (message.output.length !== 0) {
      writer.uint32(18).bytes(message.output);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): VEResultItem {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVEResultItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.taskId = reader.uint64();
          break;
        case 2:
          message.output = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): VEResultItem {
    return {
      taskId: isSet(object.taskId) ? BigInt(object.taskId.toString()) : BigInt(0),
      output: isSet(object.output) ? bytesFromBase64(object.output) : new Uint8Array()
    };
  },
  toJSON(message: VEResultItem): JsonSafe<VEResultItem> {
    const obj: any = {};
    message.taskId !== undefined && (obj.taskId = (message.taskId || BigInt(0)).toString());
    message.output !== undefined && (obj.output = base64FromBytes(message.output !== undefined ? message.output : new Uint8Array()));
    return obj;
  },
  fromPartial(object: Partial<VEResultItem>): VEResultItem {
    const message = createBaseVEResultItem();
    message.taskId = object.taskId !== undefined && object.taskId !== null ? BigInt(object.taskId.toString()) : BigInt(0);
    message.output = object.output ?? new Uint8Array();
    return message;
  },
  fromAmino(object: VEResultItemAmino): VEResultItem {
    const message = createBaseVEResultItem();
    if (object.task_id !== undefined && object.task_id !== null) {
      message.taskId = BigInt(object.task_id);
    }
    if (object.output !== undefined && object.output !== null) {
      message.output = bytesFromBase64(object.output);
    }
    return message;
  },
  toAmino(message: VEResultItem): VEResultItemAmino {
    const obj: any = {};
    obj.task_id = message.taskId !== BigInt(0) ? (message.taskId?.toString)() : undefined;
    obj.output = message.output ? base64FromBytes(message.output) : undefined;
    return obj;
  },
  fromAminoMsg(object: VEResultItemAminoMsg): VEResultItem {
    return VEResultItem.fromAmino(object.value);
  },
  fromProtoMsg(message: VEResultItemProtoMsg): VEResultItem {
    return VEResultItem.decode(message.value);
  },
  toProto(message: VEResultItem): Uint8Array {
    return VEResultItem.encode(message).finish();
  },
  toProtoMsg(message: VEResultItem): VEResultItemProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.VEResultItem",
      value: VEResultItem.encode(message).finish()
    };
  }
};
function createBaseVEVoteItem(): VEVoteItem {
  return {
    taskId: BigInt(0),
    vote: 0
  };
}
export const VEVoteItem = {
  typeUrl: "/warden.async.v1beta1.VEVoteItem",
  encode(message: VEVoteItem, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.taskId !== BigInt(0)) {
      writer.uint32(8).uint64(message.taskId);
    }
    if (message.vote !== 0) {
      writer.uint32(16).int32(message.vote);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): VEVoteItem {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVEVoteItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.taskId = reader.uint64();
          break;
        case 2:
          message.vote = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): VEVoteItem {
    return {
      taskId: isSet(object.taskId) ? BigInt(object.taskId.toString()) : BigInt(0),
      vote: isSet(object.vote) ? taskVoteTypeFromJSON(object.vote) : -1
    };
  },
  toJSON(message: VEVoteItem): JsonSafe<VEVoteItem> {
    const obj: any = {};
    message.taskId !== undefined && (obj.taskId = (message.taskId || BigInt(0)).toString());
    message.vote !== undefined && (obj.vote = taskVoteTypeToJSON(message.vote));
    return obj;
  },
  fromPartial(object: Partial<VEVoteItem>): VEVoteItem {
    const message = createBaseVEVoteItem();
    message.taskId = object.taskId !== undefined && object.taskId !== null ? BigInt(object.taskId.toString()) : BigInt(0);
    message.vote = object.vote ?? 0;
    return message;
  },
  fromAmino(object: VEVoteItemAmino): VEVoteItem {
    const message = createBaseVEVoteItem();
    if (object.task_id !== undefined && object.task_id !== null) {
      message.taskId = BigInt(object.task_id);
    }
    if (object.vote !== undefined && object.vote !== null) {
      message.vote = object.vote;
    }
    return message;
  },
  toAmino(message: VEVoteItem): VEVoteItemAmino {
    const obj: any = {};
    obj.task_id = message.taskId !== BigInt(0) ? (message.taskId?.toString)() : undefined;
    obj.vote = message.vote === 0 ? undefined : message.vote;
    return obj;
  },
  fromAminoMsg(object: VEVoteItemAminoMsg): VEVoteItem {
    return VEVoteItem.fromAmino(object.value);
  },
  fromProtoMsg(message: VEVoteItemProtoMsg): VEVoteItem {
    return VEVoteItem.decode(message.value);
  },
  toProto(message: VEVoteItem): Uint8Array {
    return VEVoteItem.encode(message).finish();
  },
  toProtoMsg(message: VEVoteItem): VEVoteItemProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.VEVoteItem",
      value: VEVoteItem.encode(message).finish()
    };
  }
};