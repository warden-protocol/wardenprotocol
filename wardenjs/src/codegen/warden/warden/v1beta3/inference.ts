//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet, bytesFromBase64, base64FromBytes } from "../../../helpers.js";
import { JsonSafe } from "../../../json-safe.js";
export interface InferenceRequest {
  id: bigint;
  creator: string;
  input?: SolverInput;
  response?: SolverResponse;
  error: string;
  createdAt: bigint;
  updatedAt: bigint;
  contractCallback: string;
}
export interface InferenceRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta3.InferenceRequest";
  value: Uint8Array;
}
export interface InferenceRequestAmino {
  id?: string;
  creator?: string;
  input?: SolverInputAmino;
  response?: SolverResponseAmino;
  error?: string;
  created_at?: string;
  updated_at?: string;
  contract_callback?: string;
}
export interface InferenceRequestAminoMsg {
  type: "/warden.warden.v1beta3.InferenceRequest";
  value: InferenceRequestAmino;
}
export interface InferenceRequestSDKType {
  id: bigint;
  creator: string;
  input?: SolverInputSDKType;
  response?: SolverResponseSDKType;
  error: string;
  created_at: bigint;
  updated_at: bigint;
  contract_callback: string;
}
export interface InferenceResult {
  id: bigint;
  response?: SolverResponse;
  error: string;
}
export interface InferenceResultProtoMsg {
  typeUrl: "/warden.warden.v1beta3.InferenceResult";
  value: Uint8Array;
}
export interface InferenceResultAmino {
  id?: string;
  response?: SolverResponseAmino;
  error?: string;
}
export interface InferenceResultAminoMsg {
  type: "/warden.warden.v1beta3.InferenceResult";
  value: InferenceResultAmino;
}
export interface InferenceResultSDKType {
  id: bigint;
  response?: SolverResponseSDKType;
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
export interface SolverRequest {
  solverInput: SolverInput;
  ExpectedItems: bigint;
  FalsePositiveRate: number;
}
export interface SolverRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta3.SolverRequest";
  value: Uint8Array;
}
export interface SolverRequestAmino {
  solver_input: SolverInputAmino;
  ExpectedItems: string;
  FalsePositiveRate: number;
}
export interface SolverRequestAminoMsg {
  type: "/warden.warden.v1beta3.SolverRequest";
  value: SolverRequestAmino;
}
export interface SolverRequestSDKType {
  solver_input: SolverInputSDKType;
  ExpectedItems: bigint;
  FalsePositiveRate: number;
}
export interface SolverInput {
  tokens: string[];
  adversaryMode: boolean;
}
export interface SolverInputProtoMsg {
  typeUrl: "/warden.warden.v1beta3.SolverInput";
  value: Uint8Array;
}
export interface SolverInputAmino {
  tokens?: string[];
  adversary_mode: boolean;
}
export interface SolverInputAminoMsg {
  type: "/warden.warden.v1beta3.SolverInput";
  value: SolverInputAmino;
}
export interface SolverInputSDKType {
  tokens: string[];
  adversary_mode: boolean;
}
export interface SolverResponse {
  solverOutput: SolverOutput;
  solverReceipt: Uint8Array;
}
export interface SolverResponseProtoMsg {
  typeUrl: "/warden.warden.v1beta3.SolverResponse";
  value: Uint8Array;
}
export interface SolverResponseAmino {
  solver_output: SolverOutputAmino;
  solver_receipt: string;
}
export interface SolverResponseAminoMsg {
  type: "/warden.warden.v1beta3.SolverResponse";
  value: SolverResponseAmino;
}
export interface SolverResponseSDKType {
  solver_output: SolverOutputSDKType;
  solver_receipt: Uint8Array;
}
export interface SolverOutput {
  forecasts: Forecast[];
}
export interface SolverOutputProtoMsg {
  typeUrl: "/warden.warden.v1beta3.SolverOutput";
  value: Uint8Array;
}
export interface SolverOutputAmino {
  forecasts?: ForecastAmino[];
}
export interface SolverOutputAminoMsg {
  type: "/warden.warden.v1beta3.SolverOutput";
  value: SolverOutputAmino;
}
export interface SolverOutputSDKType {
  forecasts: ForecastSDKType[];
}
export interface Forecast {
  key: string;
  value: number;
}
export interface ForecastProtoMsg {
  typeUrl: "/warden.warden.v1beta3.Forecast";
  value: Uint8Array;
}
export interface ForecastAmino {
  key?: string;
  value?: number;
}
export interface ForecastAminoMsg {
  type: "/warden.warden.v1beta3.Forecast";
  value: ForecastAmino;
}
export interface ForecastSDKType {
  key: string;
  value: number;
}
function createBaseInferenceRequest(): InferenceRequest {
  return {
    id: BigInt(0),
    creator: "",
    input: undefined,
    response: undefined,
    error: "",
    createdAt: BigInt(0),
    updatedAt: BigInt(0),
    contractCallback: ""
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
    if (message.input !== undefined) {
      SolverInput.encode(message.input, writer.uint32(26).fork()).ldelim();
    }
    if (message.response !== undefined) {
      SolverResponse.encode(message.response, writer.uint32(34).fork()).ldelim();
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
    if (message.contractCallback !== "") {
      writer.uint32(66).string(message.contractCallback);
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
          message.input = SolverInput.decode(reader, reader.uint32());
          break;
        case 4:
          message.response = SolverResponse.decode(reader, reader.uint32());
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
        case 8:
          message.contractCallback = reader.string();
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
      input: isSet(object.input) ? SolverInput.fromJSON(object.input) : undefined,
      response: isSet(object.response) ? SolverResponse.fromJSON(object.response) : undefined,
      error: isSet(object.error) ? String(object.error) : "",
      createdAt: isSet(object.createdAt) ? BigInt(object.createdAt.toString()) : BigInt(0),
      updatedAt: isSet(object.updatedAt) ? BigInt(object.updatedAt.toString()) : BigInt(0),
      contractCallback: isSet(object.contractCallback) ? String(object.contractCallback) : ""
    };
  },
  toJSON(message: InferenceRequest): JsonSafe<InferenceRequest> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.creator !== undefined && (obj.creator = message.creator);
    message.input !== undefined && (obj.input = message.input ? SolverInput.toJSON(message.input) : undefined);
    message.response !== undefined && (obj.response = message.response ? SolverResponse.toJSON(message.response) : undefined);
    message.error !== undefined && (obj.error = message.error);
    message.createdAt !== undefined && (obj.createdAt = (message.createdAt || BigInt(0)).toString());
    message.updatedAt !== undefined && (obj.updatedAt = (message.updatedAt || BigInt(0)).toString());
    message.contractCallback !== undefined && (obj.contractCallback = message.contractCallback);
    return obj;
  },
  fromPartial(object: Partial<InferenceRequest>): InferenceRequest {
    const message = createBaseInferenceRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.creator = object.creator ?? "";
    message.input = object.input !== undefined && object.input !== null ? SolverInput.fromPartial(object.input) : undefined;
    message.response = object.response !== undefined && object.response !== null ? SolverResponse.fromPartial(object.response) : undefined;
    message.error = object.error ?? "";
    message.createdAt = object.createdAt !== undefined && object.createdAt !== null ? BigInt(object.createdAt.toString()) : BigInt(0);
    message.updatedAt = object.updatedAt !== undefined && object.updatedAt !== null ? BigInt(object.updatedAt.toString()) : BigInt(0);
    message.contractCallback = object.contractCallback ?? "";
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
      message.input = SolverInput.fromAmino(object.input);
    }
    if (object.response !== undefined && object.response !== null) {
      message.response = SolverResponse.fromAmino(object.response);
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
    if (object.contract_callback !== undefined && object.contract_callback !== null) {
      message.contractCallback = object.contract_callback;
    }
    return message;
  },
  toAmino(message: InferenceRequest): InferenceRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.input = message.input ? SolverInput.toAmino(message.input) : undefined;
    obj.response = message.response ? SolverResponse.toAmino(message.response) : undefined;
    obj.error = message.error === "" ? undefined : message.error;
    obj.created_at = message.createdAt !== BigInt(0) ? message.createdAt.toString() : undefined;
    obj.updated_at = message.updatedAt !== BigInt(0) ? message.updatedAt.toString() : undefined;
    obj.contract_callback = message.contractCallback === "" ? undefined : message.contractCallback;
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
    response: undefined,
    error: ""
  };
}
export const InferenceResult = {
  typeUrl: "/warden.warden.v1beta3.InferenceResult",
  encode(message: InferenceResult, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.response !== undefined) {
      SolverResponse.encode(message.response, writer.uint32(18).fork()).ldelim();
    }
    if (message.error !== "") {
      writer.uint32(26).string(message.error);
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
          message.response = SolverResponse.decode(reader, reader.uint32());
          break;
        case 3:
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
      response: isSet(object.response) ? SolverResponse.fromJSON(object.response) : undefined,
      error: isSet(object.error) ? String(object.error) : ""
    };
  },
  toJSON(message: InferenceResult): JsonSafe<InferenceResult> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.response !== undefined && (obj.response = message.response ? SolverResponse.toJSON(message.response) : undefined);
    message.error !== undefined && (obj.error = message.error);
    return obj;
  },
  fromPartial(object: Partial<InferenceResult>): InferenceResult {
    const message = createBaseInferenceResult();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.response = object.response !== undefined && object.response !== null ? SolverResponse.fromPartial(object.response) : undefined;
    message.error = object.error ?? "";
    return message;
  },
  fromAmino(object: InferenceResultAmino): InferenceResult {
    const message = createBaseInferenceResult();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.response !== undefined && object.response !== null) {
      message.response = SolverResponse.fromAmino(object.response);
    }
    if (object.error !== undefined && object.error !== null) {
      message.error = object.error;
    }
    return message;
  },
  toAmino(message: InferenceResult): InferenceResultAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.response = message.response ? SolverResponse.toAmino(message.response) : undefined;
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
function createBaseSolverRequest(): SolverRequest {
  return {
    solverInput: SolverInput.fromPartial({}),
    ExpectedItems: BigInt(0),
    FalsePositiveRate: 0
  };
}
export const SolverRequest = {
  typeUrl: "/warden.warden.v1beta3.SolverRequest",
  encode(message: SolverRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.solverInput !== undefined) {
      SolverInput.encode(message.solverInput, writer.uint32(10).fork()).ldelim();
    }
    if (message.ExpectedItems !== BigInt(0)) {
      writer.uint32(16).int64(message.ExpectedItems);
    }
    if (message.FalsePositiveRate !== 0) {
      writer.uint32(25).double(message.FalsePositiveRate);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SolverRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSolverRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.solverInput = SolverInput.decode(reader, reader.uint32());
          break;
        case 2:
          message.ExpectedItems = reader.int64();
          break;
        case 3:
          message.FalsePositiveRate = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SolverRequest {
    return {
      solverInput: isSet(object.solverInput) ? SolverInput.fromJSON(object.solverInput) : undefined,
      ExpectedItems: isSet(object.ExpectedItems) ? BigInt(object.ExpectedItems.toString()) : BigInt(0),
      FalsePositiveRate: isSet(object.FalsePositiveRate) ? Number(object.FalsePositiveRate) : 0
    };
  },
  toJSON(message: SolverRequest): JsonSafe<SolverRequest> {
    const obj: any = {};
    message.solverInput !== undefined && (obj.solverInput = message.solverInput ? SolverInput.toJSON(message.solverInput) : undefined);
    message.ExpectedItems !== undefined && (obj.ExpectedItems = (message.ExpectedItems || BigInt(0)).toString());
    message.FalsePositiveRate !== undefined && (obj.FalsePositiveRate = message.FalsePositiveRate);
    return obj;
  },
  fromPartial(object: Partial<SolverRequest>): SolverRequest {
    const message = createBaseSolverRequest();
    message.solverInput = object.solverInput !== undefined && object.solverInput !== null ? SolverInput.fromPartial(object.solverInput) : undefined;
    message.ExpectedItems = object.ExpectedItems !== undefined && object.ExpectedItems !== null ? BigInt(object.ExpectedItems.toString()) : BigInt(0);
    message.FalsePositiveRate = object.FalsePositiveRate ?? 0;
    return message;
  },
  fromAmino(object: SolverRequestAmino): SolverRequest {
    const message = createBaseSolverRequest();
    if (object.solver_input !== undefined && object.solver_input !== null) {
      message.solverInput = SolverInput.fromAmino(object.solver_input);
    }
    if (object.ExpectedItems !== undefined && object.ExpectedItems !== null) {
      message.ExpectedItems = BigInt(object.ExpectedItems);
    }
    if (object.FalsePositiveRate !== undefined && object.FalsePositiveRate !== null) {
      message.FalsePositiveRate = object.FalsePositiveRate;
    }
    return message;
  },
  toAmino(message: SolverRequest): SolverRequestAmino {
    const obj: any = {};
    obj.solver_input = message.solverInput ? SolverInput.toAmino(message.solverInput) : SolverInput.toAmino(SolverInput.fromPartial({}));
    obj.ExpectedItems = message.ExpectedItems ? message.ExpectedItems.toString() : "0";
    obj.FalsePositiveRate = message.FalsePositiveRate ?? 0;
    return obj;
  },
  fromAminoMsg(object: SolverRequestAminoMsg): SolverRequest {
    return SolverRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: SolverRequestProtoMsg): SolverRequest {
    return SolverRequest.decode(message.value);
  },
  toProto(message: SolverRequest): Uint8Array {
    return SolverRequest.encode(message).finish();
  },
  toProtoMsg(message: SolverRequest): SolverRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.SolverRequest",
      value: SolverRequest.encode(message).finish()
    };
  }
};
function createBaseSolverInput(): SolverInput {
  return {
    tokens: [],
    adversaryMode: false
  };
}
export const SolverInput = {
  typeUrl: "/warden.warden.v1beta3.SolverInput",
  encode(message: SolverInput, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.tokens) {
      writer.uint32(10).string(v!);
    }
    if (message.adversaryMode === true) {
      writer.uint32(16).bool(message.adversaryMode);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SolverInput {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSolverInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tokens.push(reader.string());
          break;
        case 2:
          message.adversaryMode = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SolverInput {
    return {
      tokens: Array.isArray(object?.tokens) ? object.tokens.map((e: any) => String(e)) : [],
      adversaryMode: isSet(object.adversaryMode) ? Boolean(object.adversaryMode) : false
    };
  },
  toJSON(message: SolverInput): JsonSafe<SolverInput> {
    const obj: any = {};
    if (message.tokens) {
      obj.tokens = message.tokens.map(e => e);
    } else {
      obj.tokens = [];
    }
    message.adversaryMode !== undefined && (obj.adversaryMode = message.adversaryMode);
    return obj;
  },
  fromPartial(object: Partial<SolverInput>): SolverInput {
    const message = createBaseSolverInput();
    message.tokens = object.tokens?.map(e => e) || [];
    message.adversaryMode = object.adversaryMode ?? false;
    return message;
  },
  fromAmino(object: SolverInputAmino): SolverInput {
    const message = createBaseSolverInput();
    message.tokens = object.tokens?.map(e => e) || [];
    if (object.adversary_mode !== undefined && object.adversary_mode !== null) {
      message.adversaryMode = object.adversary_mode;
    }
    return message;
  },
  toAmino(message: SolverInput): SolverInputAmino {
    const obj: any = {};
    if (message.tokens) {
      obj.tokens = message.tokens.map(e => e);
    } else {
      obj.tokens = message.tokens;
    }
    obj.adversary_mode = message.adversaryMode ?? false;
    return obj;
  },
  fromAminoMsg(object: SolverInputAminoMsg): SolverInput {
    return SolverInput.fromAmino(object.value);
  },
  fromProtoMsg(message: SolverInputProtoMsg): SolverInput {
    return SolverInput.decode(message.value);
  },
  toProto(message: SolverInput): Uint8Array {
    return SolverInput.encode(message).finish();
  },
  toProtoMsg(message: SolverInput): SolverInputProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.SolverInput",
      value: SolverInput.encode(message).finish()
    };
  }
};
function createBaseSolverResponse(): SolverResponse {
  return {
    solverOutput: SolverOutput.fromPartial({}),
    solverReceipt: new Uint8Array()
  };
}
export const SolverResponse = {
  typeUrl: "/warden.warden.v1beta3.SolverResponse",
  encode(message: SolverResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.solverOutput !== undefined) {
      SolverOutput.encode(message.solverOutput, writer.uint32(10).fork()).ldelim();
    }
    if (message.solverReceipt.length !== 0) {
      writer.uint32(18).bytes(message.solverReceipt);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SolverResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSolverResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.solverOutput = SolverOutput.decode(reader, reader.uint32());
          break;
        case 2:
          message.solverReceipt = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SolverResponse {
    return {
      solverOutput: isSet(object.solverOutput) ? SolverOutput.fromJSON(object.solverOutput) : undefined,
      solverReceipt: isSet(object.solverReceipt) ? bytesFromBase64(object.solverReceipt) : new Uint8Array()
    };
  },
  toJSON(message: SolverResponse): JsonSafe<SolverResponse> {
    const obj: any = {};
    message.solverOutput !== undefined && (obj.solverOutput = message.solverOutput ? SolverOutput.toJSON(message.solverOutput) : undefined);
    message.solverReceipt !== undefined && (obj.solverReceipt = base64FromBytes(message.solverReceipt !== undefined ? message.solverReceipt : new Uint8Array()));
    return obj;
  },
  fromPartial(object: Partial<SolverResponse>): SolverResponse {
    const message = createBaseSolverResponse();
    message.solverOutput = object.solverOutput !== undefined && object.solverOutput !== null ? SolverOutput.fromPartial(object.solverOutput) : undefined;
    message.solverReceipt = object.solverReceipt ?? new Uint8Array();
    return message;
  },
  fromAmino(object: SolverResponseAmino): SolverResponse {
    const message = createBaseSolverResponse();
    if (object.solver_output !== undefined && object.solver_output !== null) {
      message.solverOutput = SolverOutput.fromAmino(object.solver_output);
    }
    if (object.solver_receipt !== undefined && object.solver_receipt !== null) {
      message.solverReceipt = bytesFromBase64(object.solver_receipt);
    }
    return message;
  },
  toAmino(message: SolverResponse): SolverResponseAmino {
    const obj: any = {};
    obj.solver_output = message.solverOutput ? SolverOutput.toAmino(message.solverOutput) : SolverOutput.toAmino(SolverOutput.fromPartial({}));
    obj.solver_receipt = message.solverReceipt ? base64FromBytes(message.solverReceipt) : "";
    return obj;
  },
  fromAminoMsg(object: SolverResponseAminoMsg): SolverResponse {
    return SolverResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: SolverResponseProtoMsg): SolverResponse {
    return SolverResponse.decode(message.value);
  },
  toProto(message: SolverResponse): Uint8Array {
    return SolverResponse.encode(message).finish();
  },
  toProtoMsg(message: SolverResponse): SolverResponseProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.SolverResponse",
      value: SolverResponse.encode(message).finish()
    };
  }
};
function createBaseSolverOutput(): SolverOutput {
  return {
    forecasts: []
  };
}
export const SolverOutput = {
  typeUrl: "/warden.warden.v1beta3.SolverOutput",
  encode(message: SolverOutput, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.forecasts) {
      Forecast.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SolverOutput {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSolverOutput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.forecasts.push(Forecast.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SolverOutput {
    return {
      forecasts: Array.isArray(object?.forecasts) ? object.forecasts.map((e: any) => Forecast.fromJSON(e)) : []
    };
  },
  toJSON(message: SolverOutput): JsonSafe<SolverOutput> {
    const obj: any = {};
    if (message.forecasts) {
      obj.forecasts = message.forecasts.map(e => e ? Forecast.toJSON(e) : undefined);
    } else {
      obj.forecasts = [];
    }
    return obj;
  },
  fromPartial(object: Partial<SolverOutput>): SolverOutput {
    const message = createBaseSolverOutput();
    message.forecasts = object.forecasts?.map(e => Forecast.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: SolverOutputAmino): SolverOutput {
    const message = createBaseSolverOutput();
    message.forecasts = object.forecasts?.map(e => Forecast.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: SolverOutput): SolverOutputAmino {
    const obj: any = {};
    if (message.forecasts) {
      obj.forecasts = message.forecasts.map(e => e ? Forecast.toAmino(e) : undefined);
    } else {
      obj.forecasts = message.forecasts;
    }
    return obj;
  },
  fromAminoMsg(object: SolverOutputAminoMsg): SolverOutput {
    return SolverOutput.fromAmino(object.value);
  },
  fromProtoMsg(message: SolverOutputProtoMsg): SolverOutput {
    return SolverOutput.decode(message.value);
  },
  toProto(message: SolverOutput): Uint8Array {
    return SolverOutput.encode(message).finish();
  },
  toProtoMsg(message: SolverOutput): SolverOutputProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.SolverOutput",
      value: SolverOutput.encode(message).finish()
    };
  }
};
function createBaseForecast(): Forecast {
  return {
    key: "",
    value: 0
  };
}
export const Forecast = {
  typeUrl: "/warden.warden.v1beta3.Forecast",
  encode(message: Forecast, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(21).float(message.value);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Forecast {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseForecast();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Forecast {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? Number(object.value) : 0
    };
  },
  toJSON(message: Forecast): JsonSafe<Forecast> {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },
  fromPartial(object: Partial<Forecast>): Forecast {
    const message = createBaseForecast();
    message.key = object.key ?? "";
    message.value = object.value ?? 0;
    return message;
  },
  fromAmino(object: ForecastAmino): Forecast {
    const message = createBaseForecast();
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
  toAmino(message: Forecast): ForecastAmino {
    const obj: any = {};
    obj.key = message.key === "" ? undefined : message.key;
    obj.value = message.value === 0 ? undefined : message.value;
    return obj;
  },
  fromAminoMsg(object: ForecastAminoMsg): Forecast {
    return Forecast.fromAmino(object.value);
  },
  fromProtoMsg(message: ForecastProtoMsg): Forecast {
    return Forecast.decode(message.value);
  },
  toProto(message: Forecast): Uint8Array {
    return Forecast.encode(message).finish();
  },
  toProtoMsg(message: Forecast): ForecastProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.Forecast",
      value: Forecast.encode(message).finish()
    };
  }
};