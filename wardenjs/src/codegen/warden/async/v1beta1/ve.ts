//@ts-nocheck
import { FutureVoteType, futureVoteTypeFromJSON, futureVoteTypeToJSON } from "./future.js";
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
 * some futures and handlers that are supported by the validator.
 */
export interface AsyncVoteExtension {
  results: VEResultItem[];
  votes: VEVoteItem[];
  handlers: string[];
  updateHandlers: boolean;
}
export interface AsyncVoteExtensionProtoMsg {
  typeUrl: "/warden.async.v1beta1.AsyncVoteExtension";
  value: Uint8Array;
}
/**
 * A vote extension coming from a validator. It contains results, votes for
 * some futures and handlers that are supported by the validator.
 */
export interface AsyncVoteExtensionAmino {
  results?: VEResultItemAmino[];
  votes?: VEVoteItemAmino[];
  handlers?: string[];
  update_handlers?: boolean;
}
export interface AsyncVoteExtensionAminoMsg {
  type: "/warden.async.v1beta1.AsyncVoteExtension";
  value: AsyncVoteExtensionAmino;
}
/**
 * A vote extension coming from a validator. It contains results, votes for
 * some futures and handlers that are supported by the validator.
 */
export interface AsyncVoteExtensionSDKType {
  results: VEResultItemSDKType[];
  votes: VEVoteItemSDKType[];
  handlers: string[];
  update_handlers: boolean;
}
export interface VEResultItem {
  futureId: bigint;
  output: Uint8Array;
}
export interface VEResultItemProtoMsg {
  typeUrl: "/warden.async.v1beta1.VEResultItem";
  value: Uint8Array;
}
export interface VEResultItemAmino {
  future_id?: string;
  output?: string;
}
export interface VEResultItemAminoMsg {
  type: "/warden.async.v1beta1.VEResultItem";
  value: VEResultItemAmino;
}
export interface VEResultItemSDKType {
  future_id: bigint;
  output: Uint8Array;
}
export interface VEVoteItem {
  futureId: bigint;
  vote: FutureVoteType;
}
export interface VEVoteItemProtoMsg {
  typeUrl: "/warden.async.v1beta1.VEVoteItem";
  value: Uint8Array;
}
export interface VEVoteItemAmino {
  future_id?: string;
  vote?: FutureVoteType;
}
export interface VEVoteItemAminoMsg {
  type: "/warden.async.v1beta1.VEVoteItem";
  value: VEVoteItemAmino;
}
export interface VEVoteItemSDKType {
  future_id: bigint;
  vote: FutureVoteType;
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
    handlers: [],
    updateHandlers: false
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
    for (const v of message.handlers) {
      writer.uint32(26).string(v!);
    }
    if (message.updateHandlers === true) {
      writer.uint32(32).bool(message.updateHandlers);
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
          message.handlers.push(reader.string());
          break;
        case 4:
          message.updateHandlers = reader.bool();
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
      handlers: Array.isArray(object?.handlers) ? object.handlers.map((e: any) => String(e)) : [],
      updateHandlers: isSet(object.updateHandlers) ? Boolean(object.updateHandlers) : false
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
    if (message.handlers) {
      obj.handlers = message.handlers.map(e => e);
    } else {
      obj.handlers = [];
    }
    message.updateHandlers !== undefined && (obj.updateHandlers = message.updateHandlers);
    return obj;
  },
  fromPartial(object: Partial<AsyncVoteExtension>): AsyncVoteExtension {
    const message = createBaseAsyncVoteExtension();
    message.results = object.results?.map(e => VEResultItem.fromPartial(e)) || [];
    message.votes = object.votes?.map(e => VEVoteItem.fromPartial(e)) || [];
    message.handlers = object.handlers?.map(e => e) || [];
    message.updateHandlers = object.updateHandlers ?? false;
    return message;
  },
  fromAmino(object: AsyncVoteExtensionAmino): AsyncVoteExtension {
    const message = createBaseAsyncVoteExtension();
    message.results = object.results?.map(e => VEResultItem.fromAmino(e)) || [];
    message.votes = object.votes?.map(e => VEVoteItem.fromAmino(e)) || [];
    message.handlers = object.handlers?.map(e => e) || [];
    if (object.update_handlers !== undefined && object.update_handlers !== null) {
      message.updateHandlers = object.update_handlers;
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
    if (message.handlers) {
      obj.handlers = message.handlers.map(e => e);
    } else {
      obj.handlers = message.handlers;
    }
    obj.update_handlers = message.updateHandlers === false ? undefined : message.updateHandlers;
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
    futureId: BigInt(0),
    output: new Uint8Array()
  };
}
export const VEResultItem = {
  typeUrl: "/warden.async.v1beta1.VEResultItem",
  encode(message: VEResultItem, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.futureId !== BigInt(0)) {
      writer.uint32(8).uint64(message.futureId);
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
          message.futureId = reader.uint64();
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
      futureId: isSet(object.futureId) ? BigInt(object.futureId.toString()) : BigInt(0),
      output: isSet(object.output) ? bytesFromBase64(object.output) : new Uint8Array()
    };
  },
  toJSON(message: VEResultItem): JsonSafe<VEResultItem> {
    const obj: any = {};
    message.futureId !== undefined && (obj.futureId = (message.futureId || BigInt(0)).toString());
    message.output !== undefined && (obj.output = base64FromBytes(message.output !== undefined ? message.output : new Uint8Array()));
    return obj;
  },
  fromPartial(object: Partial<VEResultItem>): VEResultItem {
    const message = createBaseVEResultItem();
    message.futureId = object.futureId !== undefined && object.futureId !== null ? BigInt(object.futureId.toString()) : BigInt(0);
    message.output = object.output ?? new Uint8Array();
    return message;
  },
  fromAmino(object: VEResultItemAmino): VEResultItem {
    const message = createBaseVEResultItem();
    if (object.future_id !== undefined && object.future_id !== null) {
      message.futureId = BigInt(object.future_id);
    }
    if (object.output !== undefined && object.output !== null) {
      message.output = bytesFromBase64(object.output);
    }
    return message;
  },
  toAmino(message: VEResultItem): VEResultItemAmino {
    const obj: any = {};
    obj.future_id = message.futureId !== BigInt(0) ? (message.futureId?.toString)() : undefined;
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
    futureId: BigInt(0),
    vote: 0
  };
}
export const VEVoteItem = {
  typeUrl: "/warden.async.v1beta1.VEVoteItem",
  encode(message: VEVoteItem, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.futureId !== BigInt(0)) {
      writer.uint32(8).uint64(message.futureId);
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
          message.futureId = reader.uint64();
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
      futureId: isSet(object.futureId) ? BigInt(object.futureId.toString()) : BigInt(0),
      vote: isSet(object.vote) ? futureVoteTypeFromJSON(object.vote) : -1
    };
  },
  toJSON(message: VEVoteItem): JsonSafe<VEVoteItem> {
    const obj: any = {};
    message.futureId !== undefined && (obj.futureId = (message.futureId || BigInt(0)).toString());
    message.vote !== undefined && (obj.vote = futureVoteTypeToJSON(message.vote));
    return obj;
  },
  fromPartial(object: Partial<VEVoteItem>): VEVoteItem {
    const message = createBaseVEVoteItem();
    message.futureId = object.futureId !== undefined && object.futureId !== null ? BigInt(object.futureId.toString()) : BigInt(0);
    message.vote = object.vote ?? 0;
    return message;
  },
  fromAmino(object: VEVoteItemAmino): VEVoteItem {
    const message = createBaseVEVoteItem();
    if (object.future_id !== undefined && object.future_id !== null) {
      message.futureId = BigInt(object.future_id);
    }
    if (object.vote !== undefined && object.vote !== null) {
      message.vote = object.vote;
    }
    return message;
  },
  toAmino(message: VEVoteItem): VEVoteItemAmino {
    const obj: any = {};
    obj.future_id = message.futureId !== BigInt(0) ? (message.futureId?.toString)() : undefined;
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