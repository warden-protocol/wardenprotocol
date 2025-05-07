//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet, bytesFromBase64, base64FromBytes } from "../../../helpers.js";
import { JsonSafe } from "../../../json-safe.js";
export enum TaskVoteType {
  /** VOTE_TYPE_UNSPECIFIED - Unspecified vote type. */
  VOTE_TYPE_UNSPECIFIED = 0,
  /** VOTE_TYPE_VERIFIED - Vote to approve the result of the Task. */
  VOTE_TYPE_VERIFIED = 1,
  /** VOTE_TYPE_REJECTED - Vote to reject the result of the Task. */
  VOTE_TYPE_REJECTED = 2,
  UNRECOGNIZED = -1,
}
export const TaskVoteTypeSDKType = TaskVoteType;
export const TaskVoteTypeAmino = TaskVoteType;
export function taskVoteTypeFromJSON(object: any): TaskVoteType {
  switch (object) {
    case 0:
    case "VOTE_TYPE_UNSPECIFIED":
      return TaskVoteType.VOTE_TYPE_UNSPECIFIED;
    case 1:
    case "VOTE_TYPE_VERIFIED":
      return TaskVoteType.VOTE_TYPE_VERIFIED;
    case 2:
    case "VOTE_TYPE_REJECTED":
      return TaskVoteType.VOTE_TYPE_REJECTED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TaskVoteType.UNRECOGNIZED;
  }
}
export function taskVoteTypeToJSON(object: TaskVoteType): string {
  switch (object) {
    case TaskVoteType.VOTE_TYPE_UNSPECIFIED:
      return "VOTE_TYPE_UNSPECIFIED";
    case TaskVoteType.VOTE_TYPE_VERIFIED:
      return "VOTE_TYPE_VERIFIED";
    case TaskVoteType.VOTE_TYPE_REJECTED:
      return "VOTE_TYPE_REJECTED";
    case TaskVoteType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/**
 * Task defines a task that will be executed asynchronously.
 * Validators will be able to submit the proposed result of the Task
 * execution.
 * Other validators will then be able to vote on the validity of the proposed
 * result.
 */
export interface Task {
  /** Unique ID of the Task. */
  id: bigint;
  /** Creator of the Task. */
  creator: string;
  /** Unique name of the plugin to be used to execute the Task. */
  plugin: string;
  /**
   * Input data to be used by the plugin to execute the Task.
   * The actual format is determined by the plugin being used.
   */
  input: Uint8Array;
  /** Callback to be called when the Task is completed. */
  callback: string;
}
export interface TaskProtoMsg {
  typeUrl: "/warden.async.v1beta1.Task";
  value: Uint8Array;
}
/**
 * Task defines a task that will be executed asynchronously.
 * Validators will be able to submit the proposed result of the Task
 * execution.
 * Other validators will then be able to vote on the validity of the proposed
 * result.
 */
export interface TaskAmino {
  /** Unique ID of the Task. */
  id?: string;
  /** Creator of the Task. */
  creator?: string;
  /** Unique name of the plugin to be used to execute the Task. */
  plugin?: string;
  /**
   * Input data to be used by the plugin to execute the Task.
   * The actual format is determined by the plugin being used.
   */
  input?: string;
  /** Callback to be called when the Task is completed. */
  callback?: string;
}
export interface TaskAminoMsg {
  type: "/warden.async.v1beta1.Task";
  value: TaskAmino;
}
/**
 * Task defines a task that will be executed asynchronously.
 * Validators will be able to submit the proposed result of the Task
 * execution.
 * Other validators will then be able to vote on the validity of the proposed
 * result.
 */
export interface TaskSDKType {
  id: bigint;
  creator: string;
  plugin: string;
  input: Uint8Array;
  callback: string;
}
/**
 * TaskResult is the result of the execution of a Task.
 * It is submitted by validators as vote extensions.
 * Only one TaskResult per Task is allowed to be submitted, subsequent
 * attempts to submit a TaskResult will be rejected.
 */
export interface TaskResult {
  /** ID of the Task this result is for. */
  id: bigint;
  /**
   * Output of the Task.
   * The actual format is determined by the plugin being used.
   */
  output: Uint8Array;
  /** Address of the validator that submitted the result. */
  submitter: Uint8Array;
}
export interface TaskResultProtoMsg {
  typeUrl: "/warden.async.v1beta1.TaskResult";
  value: Uint8Array;
}
/**
 * TaskResult is the result of the execution of a Task.
 * It is submitted by validators as vote extensions.
 * Only one TaskResult per Task is allowed to be submitted, subsequent
 * attempts to submit a TaskResult will be rejected.
 */
export interface TaskResultAmino {
  /** ID of the Task this result is for. */
  id?: string;
  /**
   * Output of the Task.
   * The actual format is determined by the plugin being used.
   */
  output?: string;
  /** Address of the validator that submitted the result. */
  submitter?: string;
}
export interface TaskResultAminoMsg {
  type: "/warden.async.v1beta1.TaskResult";
  value: TaskResultAmino;
}
/**
 * TaskResult is the result of the execution of a Task.
 * It is submitted by validators as vote extensions.
 * Only one TaskResult per Task is allowed to be submitted, subsequent
 * attempts to submit a TaskResult will be rejected.
 */
export interface TaskResultSDKType {
  id: bigint;
  output: Uint8Array;
  submitter: Uint8Array;
}
/** TaskVote is the vote of a validator on the validity of a Task result. */
export interface TaskVote {
  /** ID of the Task this vote is for. */
  taskId: bigint;
  /** Address of the validator who voted. */
  voter: Uint8Array;
  /** Vote type. */
  vote: TaskVoteType;
}
export interface TaskVoteProtoMsg {
  typeUrl: "/warden.async.v1beta1.TaskVote";
  value: Uint8Array;
}
/** TaskVote is the vote of a validator on the validity of a Task result. */
export interface TaskVoteAmino {
  /** ID of the Task this vote is for. */
  task_id?: string;
  /** Address of the validator who voted. */
  voter?: string;
  /** Vote type. */
  vote?: TaskVoteType;
}
export interface TaskVoteAminoMsg {
  type: "/warden.async.v1beta1.TaskVote";
  value: TaskVoteAmino;
}
/** TaskVote is the vote of a validator on the validity of a Task result. */
export interface TaskVoteSDKType {
  task_id: bigint;
  voter: Uint8Array;
  vote: TaskVoteType;
}
function createBaseTask(): Task {
  return {
    id: BigInt(0),
    creator: "",
    plugin: "",
    input: new Uint8Array(),
    callback: ""
  };
}
export const Task = {
  typeUrl: "/warden.async.v1beta1.Task",
  encode(message: Task, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.plugin !== "") {
      writer.uint32(26).string(message.plugin);
    }
    if (message.input.length !== 0) {
      writer.uint32(34).bytes(message.input);
    }
    if (message.callback !== "") {
      writer.uint32(42).string(message.callback);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Task {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTask();
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
  fromJSON(object: any): Task {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      creator: isSet(object.creator) ? String(object.creator) : "",
      plugin: isSet(object.plugin) ? String(object.plugin) : "",
      input: isSet(object.input) ? bytesFromBase64(object.input) : new Uint8Array(),
      callback: isSet(object.callback) ? String(object.callback) : ""
    };
  },
  toJSON(message: Task): JsonSafe<Task> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.creator !== undefined && (obj.creator = message.creator);
    message.plugin !== undefined && (obj.plugin = message.plugin);
    message.input !== undefined && (obj.input = base64FromBytes(message.input !== undefined ? message.input : new Uint8Array()));
    message.callback !== undefined && (obj.callback = message.callback);
    return obj;
  },
  fromPartial(object: Partial<Task>): Task {
    const message = createBaseTask();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.creator = object.creator ?? "";
    message.plugin = object.plugin ?? "";
    message.input = object.input ?? new Uint8Array();
    message.callback = object.callback ?? "";
    return message;
  },
  fromAmino(object: TaskAmino): Task {
    const message = createBaseTask();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
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
  toAmino(message: Task): TaskAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? (message.id?.toString)() : undefined;
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.plugin = message.plugin === "" ? undefined : message.plugin;
    obj.input = message.input ? base64FromBytes(message.input) : undefined;
    obj.callback = message.callback === "" ? undefined : message.callback;
    return obj;
  },
  fromAminoMsg(object: TaskAminoMsg): Task {
    return Task.fromAmino(object.value);
  },
  fromProtoMsg(message: TaskProtoMsg): Task {
    return Task.decode(message.value);
  },
  toProto(message: Task): Uint8Array {
    return Task.encode(message).finish();
  },
  toProtoMsg(message: Task): TaskProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.Task",
      value: Task.encode(message).finish()
    };
  }
};
function createBaseTaskResult(): TaskResult {
  return {
    id: BigInt(0),
    output: new Uint8Array(),
    submitter: new Uint8Array()
  };
}
export const TaskResult = {
  typeUrl: "/warden.async.v1beta1.TaskResult",
  encode(message: TaskResult, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
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
  decode(input: BinaryReader | Uint8Array, length?: number): TaskResult {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTaskResult();
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
  fromJSON(object: any): TaskResult {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      output: isSet(object.output) ? bytesFromBase64(object.output) : new Uint8Array(),
      submitter: isSet(object.submitter) ? bytesFromBase64(object.submitter) : new Uint8Array()
    };
  },
  toJSON(message: TaskResult): JsonSafe<TaskResult> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.output !== undefined && (obj.output = base64FromBytes(message.output !== undefined ? message.output : new Uint8Array()));
    message.submitter !== undefined && (obj.submitter = base64FromBytes(message.submitter !== undefined ? message.submitter : new Uint8Array()));
    return obj;
  },
  fromPartial(object: Partial<TaskResult>): TaskResult {
    const message = createBaseTaskResult();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.output = object.output ?? new Uint8Array();
    message.submitter = object.submitter ?? new Uint8Array();
    return message;
  },
  fromAmino(object: TaskResultAmino): TaskResult {
    const message = createBaseTaskResult();
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
  toAmino(message: TaskResult): TaskResultAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? (message.id?.toString)() : undefined;
    obj.output = message.output ? base64FromBytes(message.output) : undefined;
    obj.submitter = message.submitter ? base64FromBytes(message.submitter) : undefined;
    return obj;
  },
  fromAminoMsg(object: TaskResultAminoMsg): TaskResult {
    return TaskResult.fromAmino(object.value);
  },
  fromProtoMsg(message: TaskResultProtoMsg): TaskResult {
    return TaskResult.decode(message.value);
  },
  toProto(message: TaskResult): Uint8Array {
    return TaskResult.encode(message).finish();
  },
  toProtoMsg(message: TaskResult): TaskResultProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.TaskResult",
      value: TaskResult.encode(message).finish()
    };
  }
};
function createBaseTaskVote(): TaskVote {
  return {
    taskId: BigInt(0),
    voter: new Uint8Array(),
    vote: 0
  };
}
export const TaskVote = {
  typeUrl: "/warden.async.v1beta1.TaskVote",
  encode(message: TaskVote, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.taskId !== BigInt(0)) {
      writer.uint32(8).uint64(message.taskId);
    }
    if (message.voter.length !== 0) {
      writer.uint32(18).bytes(message.voter);
    }
    if (message.vote !== 0) {
      writer.uint32(24).int32(message.vote);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): TaskVote {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTaskVote();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.taskId = reader.uint64();
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
  fromJSON(object: any): TaskVote {
    return {
      taskId: isSet(object.taskId) ? BigInt(object.taskId.toString()) : BigInt(0),
      voter: isSet(object.voter) ? bytesFromBase64(object.voter) : new Uint8Array(),
      vote: isSet(object.vote) ? taskVoteTypeFromJSON(object.vote) : -1
    };
  },
  toJSON(message: TaskVote): JsonSafe<TaskVote> {
    const obj: any = {};
    message.taskId !== undefined && (obj.taskId = (message.taskId || BigInt(0)).toString());
    message.voter !== undefined && (obj.voter = base64FromBytes(message.voter !== undefined ? message.voter : new Uint8Array()));
    message.vote !== undefined && (obj.vote = taskVoteTypeToJSON(message.vote));
    return obj;
  },
  fromPartial(object: Partial<TaskVote>): TaskVote {
    const message = createBaseTaskVote();
    message.taskId = object.taskId !== undefined && object.taskId !== null ? BigInt(object.taskId.toString()) : BigInt(0);
    message.voter = object.voter ?? new Uint8Array();
    message.vote = object.vote ?? 0;
    return message;
  },
  fromAmino(object: TaskVoteAmino): TaskVote {
    const message = createBaseTaskVote();
    if (object.task_id !== undefined && object.task_id !== null) {
      message.taskId = BigInt(object.task_id);
    }
    if (object.voter !== undefined && object.voter !== null) {
      message.voter = bytesFromBase64(object.voter);
    }
    if (object.vote !== undefined && object.vote !== null) {
      message.vote = object.vote;
    }
    return message;
  },
  toAmino(message: TaskVote): TaskVoteAmino {
    const obj: any = {};
    obj.task_id = message.taskId !== BigInt(0) ? (message.taskId?.toString)() : undefined;
    obj.voter = message.voter ? base64FromBytes(message.voter) : undefined;
    obj.vote = message.vote === 0 ? undefined : message.vote;
    return obj;
  },
  fromAminoMsg(object: TaskVoteAminoMsg): TaskVote {
    return TaskVote.fromAmino(object.value);
  },
  fromProtoMsg(message: TaskVoteProtoMsg): TaskVote {
    return TaskVote.decode(message.value);
  },
  toProto(message: TaskVote): Uint8Array {
    return TaskVote.encode(message).finish();
  },
  toProtoMsg(message: TaskVote): TaskVoteProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.TaskVote",
      value: TaskVote.encode(message).finish()
    };
  }
};