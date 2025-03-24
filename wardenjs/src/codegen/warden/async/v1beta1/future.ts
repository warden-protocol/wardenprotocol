//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet, bytesFromBase64, base64FromBytes } from "../../../helpers.js";
import { JsonSafe } from "../../../json-safe.js";
export enum FutureVoteType {
  /** VOTE_TYPE_UNSPECIFIED - Unspecified vote type. */
  VOTE_TYPE_UNSPECIFIED = 0,
  /** VOTE_TYPE_VERIFIED - Vote to approve the result of the Future. */
  VOTE_TYPE_VERIFIED = 1,
  /** VOTE_TYPE_REJECTED - Vote to reject the result of the Future. */
  VOTE_TYPE_REJECTED = 2,
  UNRECOGNIZED = -1,
}
export const FutureVoteTypeSDKType = FutureVoteType;
export const FutureVoteTypeAmino = FutureVoteType;
export function futureVoteTypeFromJSON(object: any): FutureVoteType {
  switch (object) {
    case 0:
    case "VOTE_TYPE_UNSPECIFIED":
      return FutureVoteType.VOTE_TYPE_UNSPECIFIED;
    case 1:
    case "VOTE_TYPE_VERIFIED":
      return FutureVoteType.VOTE_TYPE_VERIFIED;
    case 2:
    case "VOTE_TYPE_REJECTED":
      return FutureVoteType.VOTE_TYPE_REJECTED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return FutureVoteType.UNRECOGNIZED;
  }
}
export function futureVoteTypeToJSON(object: FutureVoteType): string {
  switch (object) {
    case FutureVoteType.VOTE_TYPE_UNSPECIFIED:
      return "VOTE_TYPE_UNSPECIFIED";
    case FutureVoteType.VOTE_TYPE_VERIFIED:
      return "VOTE_TYPE_VERIFIED";
    case FutureVoteType.VOTE_TYPE_REJECTED:
      return "VOTE_TYPE_REJECTED";
    case FutureVoteType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/**
 * Future defines a task that will be executed asynchronously.
 * Validators will be able to submit the proposed result of the Future
 * execution.
 * Other validators will then be able to vote on the validity of the proposed
 * result.
 */
export interface Future {
  /** Unique ID of the Future. */
  id: bigint;
  /** Creator of the Future. */
  creator: string;
  /** Unique name of the handler to be used to execute the Future. */
  handler: string;
  /**
   * Input data to be used by the handler to execute the Future.
   * The actual format is determined by the handler being used.
   */
  input: Uint8Array;
  /** Callback to be called when the Future is completed. */
  callback: string;
}
export interface FutureProtoMsg {
  typeUrl: "/warden.async.v1beta1.Future";
  value: Uint8Array;
}
/**
 * Future defines a task that will be executed asynchronously.
 * Validators will be able to submit the proposed result of the Future
 * execution.
 * Other validators will then be able to vote on the validity of the proposed
 * result.
 */
export interface FutureAmino {
  /** Unique ID of the Future. */
  id?: string;
  /** Creator of the Future. */
  creator?: string;
  /** Unique name of the handler to be used to execute the Future. */
  handler?: string;
  /**
   * Input data to be used by the handler to execute the Future.
   * The actual format is determined by the handler being used.
   */
  input?: string;
  /** Callback to be called when the Future is completed. */
  callback?: string;
}
export interface FutureAminoMsg {
  type: "/warden.async.v1beta1.Future";
  value: FutureAmino;
}
/**
 * Future defines a task that will be executed asynchronously.
 * Validators will be able to submit the proposed result of the Future
 * execution.
 * Other validators will then be able to vote on the validity of the proposed
 * result.
 */
export interface FutureSDKType {
  id: bigint;
  creator: string;
  handler: string;
  input: Uint8Array;
  callback: string;
}
/**
 * FutureResult is the result of the execution of a Future.
 * It is submitted by validators as vote extensions.
 * Only one FutureResult per Future is allowed to be submitted, subsequent
 * attempts to submit a FutureResult will be rejected.
 */
export interface FutureResult {
  /** ID of the Future this result is for. */
  id: bigint;
  /**
   * Output of the Future.
   * The actual format is determined by the handler being used.
   */
  output: Uint8Array;
  /** Address of the validator that submitted the result. */
  submitter: Uint8Array;
}
export interface FutureResultProtoMsg {
  typeUrl: "/warden.async.v1beta1.FutureResult";
  value: Uint8Array;
}
/**
 * FutureResult is the result of the execution of a Future.
 * It is submitted by validators as vote extensions.
 * Only one FutureResult per Future is allowed to be submitted, subsequent
 * attempts to submit a FutureResult will be rejected.
 */
export interface FutureResultAmino {
  /** ID of the Future this result is for. */
  id?: string;
  /**
   * Output of the Future.
   * The actual format is determined by the handler being used.
   */
  output?: string;
  /** Address of the validator that submitted the result. */
  submitter?: string;
}
export interface FutureResultAminoMsg {
  type: "/warden.async.v1beta1.FutureResult";
  value: FutureResultAmino;
}
/**
 * FutureResult is the result of the execution of a Future.
 * It is submitted by validators as vote extensions.
 * Only one FutureResult per Future is allowed to be submitted, subsequent
 * attempts to submit a FutureResult will be rejected.
 */
export interface FutureResultSDKType {
  id: bigint;
  output: Uint8Array;
  submitter: Uint8Array;
}
/** FutureVote is the vote of a validator on the validity of a Future result. */
export interface FutureVote {
  /** ID of the Future this vote is for. */
  futureId: bigint;
  /** Address of the validator who voted. */
  voter: Uint8Array;
  /** Vote type. */
  vote: FutureVoteType;
}
export interface FutureVoteProtoMsg {
  typeUrl: "/warden.async.v1beta1.FutureVote";
  value: Uint8Array;
}
/** FutureVote is the vote of a validator on the validity of a Future result. */
export interface FutureVoteAmino {
  /** ID of the Future this vote is for. */
  future_id?: string;
  /** Address of the validator who voted. */
  voter?: string;
  /** Vote type. */
  vote?: FutureVoteType;
}
export interface FutureVoteAminoMsg {
  type: "/warden.async.v1beta1.FutureVote";
  value: FutureVoteAmino;
}
/** FutureVote is the vote of a validator on the validity of a Future result. */
export interface FutureVoteSDKType {
  future_id: bigint;
  voter: Uint8Array;
  vote: FutureVoteType;
}
function createBaseFuture(): Future {
  return {
    id: BigInt(0),
    creator: "",
    handler: "",
    input: new Uint8Array(),
    callback: ""
  };
}
export const Future = {
  typeUrl: "/warden.async.v1beta1.Future",
  encode(message: Future, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.handler !== "") {
      writer.uint32(26).string(message.handler);
    }
    if (message.input.length !== 0) {
      writer.uint32(34).bytes(message.input);
    }
    if (message.callback !== "") {
      writer.uint32(42).string(message.callback);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Future {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFuture();
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
          message.input = reader.bytes();
          break;
        case 5:
          message.callback = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Future {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      creator: isSet(object.creator) ? String(object.creator) : "",
      handler: isSet(object.handler) ? String(object.handler) : "",
      input: isSet(object.input) ? bytesFromBase64(object.input) : new Uint8Array(),
      callback: isSet(object.callback) ? String(object.callback) : ""
    };
  },
  toJSON(message: Future): JsonSafe<Future> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.creator !== undefined && (obj.creator = message.creator);
    message.handler !== undefined && (obj.handler = message.handler);
    message.input !== undefined && (obj.input = base64FromBytes(message.input !== undefined ? message.input : new Uint8Array()));
    message.callback !== undefined && (obj.callback = message.callback);
    return obj;
  },
  fromPartial(object: Partial<Future>): Future {
    const message = createBaseFuture();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.creator = object.creator ?? "";
    message.handler = object.handler ?? "";
    message.input = object.input ?? new Uint8Array();
    message.callback = object.callback ?? "";
    return message;
  },
  fromAmino(object: FutureAmino): Future {
    const message = createBaseFuture();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.handler !== undefined && object.handler !== null) {
      message.handler = object.handler;
    }
    if (object.input !== undefined && object.input !== null) {
      message.input = bytesFromBase64(object.input);
    }
    if (object.callback !== undefined && object.callback !== null) {
      message.callback = object.callback;
    }
    return message;
  },
  toAmino(message: Future): FutureAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? (message.id?.toString)() : undefined;
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.handler = message.handler === "" ? undefined : message.handler;
    obj.input = message.input ? base64FromBytes(message.input) : undefined;
    obj.callback = message.callback === "" ? undefined : message.callback;
    return obj;
  },
  fromAminoMsg(object: FutureAminoMsg): Future {
    return Future.fromAmino(object.value);
  },
  fromProtoMsg(message: FutureProtoMsg): Future {
    return Future.decode(message.value);
  },
  toProto(message: Future): Uint8Array {
    return Future.encode(message).finish();
  },
  toProtoMsg(message: Future): FutureProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.Future",
      value: Future.encode(message).finish()
    };
  }
};
function createBaseFutureResult(): FutureResult {
  return {
    id: BigInt(0),
    output: new Uint8Array(),
    submitter: new Uint8Array()
  };
}
export const FutureResult = {
  typeUrl: "/warden.async.v1beta1.FutureResult",
  encode(message: FutureResult, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.output.length !== 0) {
      writer.uint32(18).bytes(message.output);
    }
    if (message.submitter.length !== 0) {
      writer.uint32(26).bytes(message.submitter);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): FutureResult {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFutureResult();
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
          message.submitter = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): FutureResult {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      output: isSet(object.output) ? bytesFromBase64(object.output) : new Uint8Array(),
      submitter: isSet(object.submitter) ? bytesFromBase64(object.submitter) : new Uint8Array()
    };
  },
  toJSON(message: FutureResult): JsonSafe<FutureResult> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.output !== undefined && (obj.output = base64FromBytes(message.output !== undefined ? message.output : new Uint8Array()));
    message.submitter !== undefined && (obj.submitter = base64FromBytes(message.submitter !== undefined ? message.submitter : new Uint8Array()));
    return obj;
  },
  fromPartial(object: Partial<FutureResult>): FutureResult {
    const message = createBaseFutureResult();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.output = object.output ?? new Uint8Array();
    message.submitter = object.submitter ?? new Uint8Array();
    return message;
  },
  fromAmino(object: FutureResultAmino): FutureResult {
    const message = createBaseFutureResult();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.output !== undefined && object.output !== null) {
      message.output = bytesFromBase64(object.output);
    }
    if (object.submitter !== undefined && object.submitter !== null) {
      message.submitter = bytesFromBase64(object.submitter);
    }
    return message;
  },
  toAmino(message: FutureResult): FutureResultAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? (message.id?.toString)() : undefined;
    obj.output = message.output ? base64FromBytes(message.output) : undefined;
    obj.submitter = message.submitter ? base64FromBytes(message.submitter) : undefined;
    return obj;
  },
  fromAminoMsg(object: FutureResultAminoMsg): FutureResult {
    return FutureResult.fromAmino(object.value);
  },
  fromProtoMsg(message: FutureResultProtoMsg): FutureResult {
    return FutureResult.decode(message.value);
  },
  toProto(message: FutureResult): Uint8Array {
    return FutureResult.encode(message).finish();
  },
  toProtoMsg(message: FutureResult): FutureResultProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.FutureResult",
      value: FutureResult.encode(message).finish()
    };
  }
};
function createBaseFutureVote(): FutureVote {
  return {
    futureId: BigInt(0),
    voter: new Uint8Array(),
    vote: 0
  };
}
export const FutureVote = {
  typeUrl: "/warden.async.v1beta1.FutureVote",
  encode(message: FutureVote, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.futureId !== BigInt(0)) {
      writer.uint32(8).uint64(message.futureId);
    }
    if (message.voter.length !== 0) {
      writer.uint32(18).bytes(message.voter);
    }
    if (message.vote !== 0) {
      writer.uint32(24).int32(message.vote);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): FutureVote {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFutureVote();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.futureId = reader.uint64();
          break;
        case 2:
          message.voter = reader.bytes();
          break;
        case 3:
          message.vote = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): FutureVote {
    return {
      futureId: isSet(object.futureId) ? BigInt(object.futureId.toString()) : BigInt(0),
      voter: isSet(object.voter) ? bytesFromBase64(object.voter) : new Uint8Array(),
      vote: isSet(object.vote) ? futureVoteTypeFromJSON(object.vote) : -1
    };
  },
  toJSON(message: FutureVote): JsonSafe<FutureVote> {
    const obj: any = {};
    message.futureId !== undefined && (obj.futureId = (message.futureId || BigInt(0)).toString());
    message.voter !== undefined && (obj.voter = base64FromBytes(message.voter !== undefined ? message.voter : new Uint8Array()));
    message.vote !== undefined && (obj.vote = futureVoteTypeToJSON(message.vote));
    return obj;
  },
  fromPartial(object: Partial<FutureVote>): FutureVote {
    const message = createBaseFutureVote();
    message.futureId = object.futureId !== undefined && object.futureId !== null ? BigInt(object.futureId.toString()) : BigInt(0);
    message.voter = object.voter ?? new Uint8Array();
    message.vote = object.vote ?? 0;
    return message;
  },
  fromAmino(object: FutureVoteAmino): FutureVote {
    const message = createBaseFutureVote();
    if (object.future_id !== undefined && object.future_id !== null) {
      message.futureId = BigInt(object.future_id);
    }
    if (object.voter !== undefined && object.voter !== null) {
      message.voter = bytesFromBase64(object.voter);
    }
    if (object.vote !== undefined && object.vote !== null) {
      message.vote = object.vote;
    }
    return message;
  },
  toAmino(message: FutureVote): FutureVoteAmino {
    const obj: any = {};
    obj.future_id = message.futureId !== BigInt(0) ? (message.futureId?.toString)() : undefined;
    obj.voter = message.voter ? base64FromBytes(message.voter) : undefined;
    obj.vote = message.vote === 0 ? undefined : message.vote;
    return obj;
  },
  fromAminoMsg(object: FutureVoteAminoMsg): FutureVote {
    return FutureVote.fromAmino(object.value);
  },
  fromProtoMsg(message: FutureVoteProtoMsg): FutureVote {
    return FutureVote.decode(message.value);
  },
  toProto(message: FutureVote): Uint8Array {
    return FutureVote.encode(message).finish();
  },
  toProtoMsg(message: FutureVote): FutureVoteProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.FutureVote",
      value: FutureVote.encode(message).finish()
    };
  }
};