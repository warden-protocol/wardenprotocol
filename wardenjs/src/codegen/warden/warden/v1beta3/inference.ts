//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet, bytesFromBase64, base64FromBytes } from "../../../helpers.js";
import { JsonSafe } from "../../../json-safe.js";
export interface InferenceRequest {
  id: bigint;
  creator: string;
  input: Uint8Array;
  output: Uint8Array;
  error: string;
  createdAt: bigint;
  updatedAt: bigint;
}
export interface InferenceRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta3.InferenceRequest";
  value: Uint8Array;
}
export interface InferenceRequestAmino {
  id?: string;
  creator?: string;
  input?: string;
  output?: string;
  error?: string;
  created_at?: string;
  updated_at?: string;
}
export interface InferenceRequestAminoMsg {
  type: "/warden.warden.v1beta3.InferenceRequest";
  value: InferenceRequestAmino;
}
export interface InferenceRequestSDKType {
  id: bigint;
  creator: string;
  input: Uint8Array;
  output: Uint8Array;
  error: string;
  created_at: bigint;
  updated_at: bigint;
}
export interface InferenceResult {
  id: bigint;
  output: Uint8Array;
  receipt: Uint8Array;
  error: string;
}
export interface InferenceResultProtoMsg {
  typeUrl: "/warden.warden.v1beta3.InferenceResult";
  value: Uint8Array;
}
export interface InferenceResultAmino {
  id?: string;
  output?: string;
  receipt?: string;
  error?: string;
}
export interface InferenceResultAminoMsg {
  type: "/warden.warden.v1beta3.InferenceResult";
  value: InferenceResultAmino;
}
export interface InferenceResultSDKType {
  id: bigint;
  output: Uint8Array;
  receipt: Uint8Array;
  error: string;
}
export interface InferenceTx {
  magicNumber: bigint;
  results: InferenceResult[];
}
export interface InferenceTxProtoMsg {
  typeUrl: "/warden.warden.v1beta3.InferenceTx";
  value: Uint8Array;
}
export interface InferenceTxAmino {
  magic_number?: string;
  results?: InferenceResultAmino[];
}
export interface InferenceTxAminoMsg {
  type: "/warden.warden.v1beta3.InferenceTx";
  value: InferenceTxAmino;
}
export interface InferenceTxSDKType {
  magic_number: bigint;
  results: InferenceResultSDKType[];
}
function createBaseInferenceRequest(): InferenceRequest {
  return {
    id: BigInt(0),
    creator: "",
    input: new Uint8Array(),
    output: new Uint8Array(),
    error: "",
    createdAt: BigInt(0),
    updatedAt: BigInt(0)
  };
}
export const InferenceRequest = {
  typeUrl: "/warden.warden.v1beta3.InferenceRequest",
  encode(message: InferenceRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.input.length !== 0) {
      writer.uint32(26).bytes(message.input);
    }
    if (message.output.length !== 0) {
      writer.uint32(34).bytes(message.output);
    }
    if (message.error !== "") {
      writer.uint32(42).string(message.error);
    }
    if (message.createdAt !== BigInt(0)) {
      writer.uint32(48).uint64(message.createdAt);
    }
    if (message.updatedAt !== BigInt(0)) {
      writer.uint32(56).uint64(message.updatedAt);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): InferenceRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInferenceRequest();
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
          message.input = reader.bytes();
          break;
        case 4:
          message.output = reader.bytes();
          break;
        case 5:
          message.error = reader.string();
          break;
        case 6:
          message.createdAt = reader.uint64();
          break;
        case 7:
          message.updatedAt = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): InferenceRequest {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      creator: isSet(object.creator) ? String(object.creator) : "",
      input: isSet(object.input) ? bytesFromBase64(object.input) : new Uint8Array(),
      output: isSet(object.output) ? bytesFromBase64(object.output) : new Uint8Array(),
      error: isSet(object.error) ? String(object.error) : "",
      createdAt: isSet(object.createdAt) ? BigInt(object.createdAt.toString()) : BigInt(0),
      updatedAt: isSet(object.updatedAt) ? BigInt(object.updatedAt.toString()) : BigInt(0)
    };
  },
  toJSON(message: InferenceRequest): JsonSafe<InferenceRequest> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.creator !== undefined && (obj.creator = message.creator);
    message.input !== undefined && (obj.input = base64FromBytes(message.input !== undefined ? message.input : new Uint8Array()));
    message.output !== undefined && (obj.output = base64FromBytes(message.output !== undefined ? message.output : new Uint8Array()));
    message.error !== undefined && (obj.error = message.error);
    message.createdAt !== undefined && (obj.createdAt = (message.createdAt || BigInt(0)).toString());
    message.updatedAt !== undefined && (obj.updatedAt = (message.updatedAt || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<InferenceRequest>): InferenceRequest {
    const message = createBaseInferenceRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.creator = object.creator ?? "";
    message.input = object.input ?? new Uint8Array();
    message.output = object.output ?? new Uint8Array();
    message.error = object.error ?? "";
    message.createdAt = object.createdAt !== undefined && object.createdAt !== null ? BigInt(object.createdAt.toString()) : BigInt(0);
    message.updatedAt = object.updatedAt !== undefined && object.updatedAt !== null ? BigInt(object.updatedAt.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: InferenceRequestAmino): InferenceRequest {
    const message = createBaseInferenceRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.input !== undefined && object.input !== null) {
      message.input = bytesFromBase64(object.input);
    }
    if (object.output !== undefined && object.output !== null) {
      message.output = bytesFromBase64(object.output);
    }
    if (object.error !== undefined && object.error !== null) {
      message.error = object.error;
    }
    if (object.created_at !== undefined && object.created_at !== null) {
      message.createdAt = BigInt(object.created_at);
    }
    if (object.updated_at !== undefined && object.updated_at !== null) {
      message.updatedAt = BigInt(object.updated_at);
    }
    return message;
  },
  toAmino(message: InferenceRequest): InferenceRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.input = message.input ? base64FromBytes(message.input) : undefined;
    obj.output = message.output ? base64FromBytes(message.output) : undefined;
    obj.error = message.error === "" ? undefined : message.error;
    obj.created_at = message.createdAt !== BigInt(0) ? message.createdAt.toString() : undefined;
    obj.updated_at = message.updatedAt !== BigInt(0) ? message.updatedAt.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: InferenceRequestAminoMsg): InferenceRequest {
    return InferenceRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: InferenceRequestProtoMsg): InferenceRequest {
    return InferenceRequest.decode(message.value);
  },
  toProto(message: InferenceRequest): Uint8Array {
    return InferenceRequest.encode(message).finish();
  },
  toProtoMsg(message: InferenceRequest): InferenceRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.InferenceRequest",
      value: InferenceRequest.encode(message).finish()
    };
  }
};
function createBaseInferenceResult(): InferenceResult {
  return {
    id: BigInt(0),
    output: new Uint8Array(),
    receipt: new Uint8Array(),
    error: ""
  };
}
export const InferenceResult = {
  typeUrl: "/warden.warden.v1beta3.InferenceResult",
  encode(message: InferenceResult, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.output.length !== 0) {
      writer.uint32(18).bytes(message.output);
    }
    if (message.receipt.length !== 0) {
      writer.uint32(26).bytes(message.receipt);
    }
    if (message.error !== "") {
      writer.uint32(34).string(message.error);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): InferenceResult {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInferenceResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.output = reader.bytes();
          break;
        case 3:
          message.receipt = reader.bytes();
          break;
        case 4:
          message.error = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): InferenceResult {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      output: isSet(object.output) ? bytesFromBase64(object.output) : new Uint8Array(),
      receipt: isSet(object.receipt) ? bytesFromBase64(object.receipt) : new Uint8Array(),
      error: isSet(object.error) ? String(object.error) : ""
    };
  },
  toJSON(message: InferenceResult): JsonSafe<InferenceResult> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.output !== undefined && (obj.output = base64FromBytes(message.output !== undefined ? message.output : new Uint8Array()));
    message.receipt !== undefined && (obj.receipt = base64FromBytes(message.receipt !== undefined ? message.receipt : new Uint8Array()));
    message.error !== undefined && (obj.error = message.error);
    return obj;
  },
  fromPartial(object: Partial<InferenceResult>): InferenceResult {
    const message = createBaseInferenceResult();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.output = object.output ?? new Uint8Array();
    message.receipt = object.receipt ?? new Uint8Array();
    message.error = object.error ?? "";
    return message;
  },
  fromAmino(object: InferenceResultAmino): InferenceResult {
    const message = createBaseInferenceResult();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.output !== undefined && object.output !== null) {
      message.output = bytesFromBase64(object.output);
    }
    if (object.receipt !== undefined && object.receipt !== null) {
      message.receipt = bytesFromBase64(object.receipt);
    }
    if (object.error !== undefined && object.error !== null) {
      message.error = object.error;
    }
    return message;
  },
  toAmino(message: InferenceResult): InferenceResultAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.output = message.output ? base64FromBytes(message.output) : undefined;
    obj.receipt = message.receipt ? base64FromBytes(message.receipt) : undefined;
    obj.error = message.error === "" ? undefined : message.error;
    return obj;
  },
  fromAminoMsg(object: InferenceResultAminoMsg): InferenceResult {
    return InferenceResult.fromAmino(object.value);
  },
  fromProtoMsg(message: InferenceResultProtoMsg): InferenceResult {
    return InferenceResult.decode(message.value);
  },
  toProto(message: InferenceResult): Uint8Array {
    return InferenceResult.encode(message).finish();
  },
  toProtoMsg(message: InferenceResult): InferenceResultProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.InferenceResult",
      value: InferenceResult.encode(message).finish()
    };
  }
};
function createBaseInferenceTx(): InferenceTx {
  return {
    magicNumber: BigInt(0),
    results: []
  };
}
export const InferenceTx = {
  typeUrl: "/warden.warden.v1beta3.InferenceTx",
  encode(message: InferenceTx, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.magicNumber !== BigInt(0)) {
      writer.uint32(8).uint64(message.magicNumber);
    }
    for (const v of message.results) {
      InferenceResult.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): InferenceTx {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInferenceTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.magicNumber = reader.uint64();
          break;
        case 2:
          message.results.push(InferenceResult.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): InferenceTx {
    return {
      magicNumber: isSet(object.magicNumber) ? BigInt(object.magicNumber.toString()) : BigInt(0),
      results: Array.isArray(object?.results) ? object.results.map((e: any) => InferenceResult.fromJSON(e)) : []
    };
  },
  toJSON(message: InferenceTx): JsonSafe<InferenceTx> {
    const obj: any = {};
    message.magicNumber !== undefined && (obj.magicNumber = (message.magicNumber || BigInt(0)).toString());
    if (message.results) {
      obj.results = message.results.map(e => e ? InferenceResult.toJSON(e) : undefined);
    } else {
      obj.results = [];
    }
    return obj;
  },
  fromPartial(object: Partial<InferenceTx>): InferenceTx {
    const message = createBaseInferenceTx();
    message.magicNumber = object.magicNumber !== undefined && object.magicNumber !== null ? BigInt(object.magicNumber.toString()) : BigInt(0);
    message.results = object.results?.map(e => InferenceResult.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: InferenceTxAmino): InferenceTx {
    const message = createBaseInferenceTx();
    if (object.magic_number !== undefined && object.magic_number !== null) {
      message.magicNumber = BigInt(object.magic_number);
    }
    message.results = object.results?.map(e => InferenceResult.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: InferenceTx): InferenceTxAmino {
    const obj: any = {};
    obj.magic_number = message.magicNumber !== BigInt(0) ? message.magicNumber.toString() : undefined;
    if (message.results) {
      obj.results = message.results.map(e => e ? InferenceResult.toAmino(e) : undefined);
    } else {
      obj.results = message.results;
    }
    return obj;
  },
  fromAminoMsg(object: InferenceTxAminoMsg): InferenceTx {
    return InferenceTx.fromAmino(object.value);
  },
  fromProtoMsg(message: InferenceTxProtoMsg): InferenceTx {
    return InferenceTx.decode(message.value);
  },
  toProto(message: InferenceTx): Uint8Array {
    return InferenceTx.encode(message).finish();
  },
  toProtoMsg(message: InferenceTx): InferenceTxProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.InferenceTx",
      value: InferenceTx.encode(message).finish()
    };
  }
};