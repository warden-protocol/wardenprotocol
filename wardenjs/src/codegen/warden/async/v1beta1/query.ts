//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../../cosmos/base/query/v1beta1/pagination.js";
import { Params, ParamsAmino, ParamsSDKType } from "./params.js";
import { Task, TaskAmino, TaskSDKType, TaskVote, TaskVoteAmino, TaskVoteSDKType, TaskResult, TaskResultAmino, TaskResultSDKType } from "./task.js";
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { JsonSafe } from "../../../json-safe.js";
import { isSet } from "../../../helpers.js";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/warden.async.v1beta1.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/warden.async.v1beta1.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestSDKType {}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/warden.async.v1beta1.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params holds all the parameters of this module. */
  params?: ParamsAmino;
}
export interface QueryParamsResponseAminoMsg {
  type: "/warden.async.v1beta1.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType;
}
export interface QueryTasksRequest {
  pagination?: PageRequest;
  /** optional filter to query tasks by creator */
  creator?: string;
}
export interface QueryTasksRequestProtoMsg {
  typeUrl: "/warden.async.v1beta1.QueryTasksRequest";
  value: Uint8Array;
}
export interface QueryTasksRequestAmino {
  pagination?: PageRequestAmino;
  /** optional filter to query tasks by creator */
  creator?: string;
}
export interface QueryTasksRequestAminoMsg {
  type: "/warden.async.v1beta1.QueryTasksRequest";
  value: QueryTasksRequestAmino;
}
export interface QueryTasksRequestSDKType {
  pagination?: PageRequestSDKType;
  creator?: string;
}
export interface TaskResponse {
  task: Task;
  votes: TaskVote[];
  result?: TaskResult;
}
export interface TaskResponseProtoMsg {
  typeUrl: "/warden.async.v1beta1.TaskResponse";
  value: Uint8Array;
}
export interface TaskResponseAmino {
  task?: TaskAmino;
  votes?: TaskVoteAmino[];
  result?: TaskResultAmino;
}
export interface TaskResponseAminoMsg {
  type: "/warden.async.v1beta1.TaskResponse";
  value: TaskResponseAmino;
}
export interface TaskResponseSDKType {
  task: TaskSDKType;
  votes: TaskVoteSDKType[];
  result?: TaskResultSDKType;
}
export interface QueryTasksResponse {
  pagination?: PageResponse;
  tasks: TaskResponse[];
}
export interface QueryTasksResponseProtoMsg {
  typeUrl: "/warden.async.v1beta1.QueryTasksResponse";
  value: Uint8Array;
}
export interface QueryTasksResponseAmino {
  pagination?: PageResponseAmino;
  tasks?: TaskResponseAmino[];
}
export interface QueryTasksResponseAminoMsg {
  type: "/warden.async.v1beta1.QueryTasksResponse";
  value: QueryTasksResponseAmino;
}
export interface QueryTasksResponseSDKType {
  pagination?: PageResponseSDKType;
  tasks: TaskResponseSDKType[];
}
export interface QueryTaskByIdRequest {
  id: bigint;
}
export interface QueryTaskByIdRequestProtoMsg {
  typeUrl: "/warden.async.v1beta1.QueryTaskByIdRequest";
  value: Uint8Array;
}
export interface QueryTaskByIdRequestAmino {
  id?: string;
}
export interface QueryTaskByIdRequestAminoMsg {
  type: "/warden.async.v1beta1.QueryTaskByIdRequest";
  value: QueryTaskByIdRequestAmino;
}
export interface QueryTaskByIdRequestSDKType {
  id: bigint;
}
export interface QueryTaskByIdResponse {
  taskResponse: TaskResponse;
}
export interface QueryTaskByIdResponseProtoMsg {
  typeUrl: "/warden.async.v1beta1.QueryTaskByIdResponse";
  value: Uint8Array;
}
export interface QueryTaskByIdResponseAmino {
  taskResponse?: TaskResponseAmino;
}
export interface QueryTaskByIdResponseAminoMsg {
  type: "/warden.async.v1beta1.QueryTaskByIdResponse";
  value: QueryTaskByIdResponseAmino;
}
export interface QueryTaskByIdResponseSDKType {
  taskResponse: TaskResponseSDKType;
}
export interface QueryPendingTasksRequest {
  pagination?: PageRequest;
}
export interface QueryPendingTasksRequestProtoMsg {
  typeUrl: "/warden.async.v1beta1.QueryPendingTasksRequest";
  value: Uint8Array;
}
export interface QueryPendingTasksRequestAmino {
  pagination?: PageRequestAmino;
}
export interface QueryPendingTasksRequestAminoMsg {
  type: "/warden.async.v1beta1.QueryPendingTasksRequest";
  value: QueryPendingTasksRequestAmino;
}
export interface QueryPendingTasksRequestSDKType {
  pagination?: PageRequestSDKType;
}
export interface QueryPendingTasksResponse {
  pagination?: PageResponse;
  tasks: Task[];
}
export interface QueryPendingTasksResponseProtoMsg {
  typeUrl: "/warden.async.v1beta1.QueryPendingTasksResponse";
  value: Uint8Array;
}
export interface QueryPendingTasksResponseAmino {
  pagination?: PageResponseAmino;
  tasks?: TaskAmino[];
}
export interface QueryPendingTasksResponseAminoMsg {
  type: "/warden.async.v1beta1.QueryPendingTasksResponse";
  value: QueryPendingTasksResponseAmino;
}
export interface QueryPendingTasksResponseSDKType {
  pagination?: PageResponseSDKType;
  tasks: TaskSDKType[];
}
export interface QueryPluginsByValidatorRequest {
  pagination?: PageRequest;
  validator: string;
}
export interface QueryPluginsByValidatorRequestProtoMsg {
  typeUrl: "/warden.async.v1beta1.QueryPluginsByValidatorRequest";
  value: Uint8Array;
}
export interface QueryPluginsByValidatorRequestAmino {
  pagination?: PageRequestAmino;
  validator?: string;
}
export interface QueryPluginsByValidatorRequestAminoMsg {
  type: "/warden.async.v1beta1.QueryPluginsByValidatorRequest";
  value: QueryPluginsByValidatorRequestAmino;
}
export interface QueryPluginsByValidatorRequestSDKType {
  pagination?: PageRequestSDKType;
  validator: string;
}
export interface QueryPluginsByValidatorResponse {
  pagination?: PageResponse;
  plugins: string[];
}
export interface QueryPluginsByValidatorResponseProtoMsg {
  typeUrl: "/warden.async.v1beta1.QueryPluginsByValidatorResponse";
  value: Uint8Array;
}
export interface QueryPluginsByValidatorResponseAmino {
  pagination?: PageResponseAmino;
  plugins?: string[];
}
export interface QueryPluginsByValidatorResponseAminoMsg {
  type: "/warden.async.v1beta1.QueryPluginsByValidatorResponse";
  value: QueryPluginsByValidatorResponseAmino;
}
export interface QueryPluginsByValidatorResponseSDKType {
  pagination?: PageResponseSDKType;
  plugins: string[];
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/warden.async.v1beta1.QueryParamsRequest",
  encode(_: QueryParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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
  fromJSON(_: any): QueryParamsRequest {
    return {};
  },
  toJSON(_: QueryParamsRequest): JsonSafe<QueryParamsRequest> {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<QueryParamsRequest>): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  fromAmino(_: QueryParamsRequestAmino): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  toAmino(_: QueryParamsRequest): QueryParamsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryParamsRequestAminoMsg): QueryParamsRequest {
    return QueryParamsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsRequestProtoMsg): QueryParamsRequest {
    return QueryParamsRequest.decode(message.value);
  },
  toProto(message: QueryParamsRequest): Uint8Array {
    return QueryParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsRequest): QueryParamsRequestProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.QueryParamsRequest",
      value: QueryParamsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryParamsResponse(): QueryParamsResponse {
  return {
    params: Params.fromPartial({})
  };
}
export const QueryParamsResponse = {
  typeUrl: "/warden.async.v1beta1.QueryParamsResponse",
  encode(message: QueryParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryParamsResponse {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined
    };
  },
  toJSON(message: QueryParamsResponse): JsonSafe<QueryParamsResponse> {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },
  fromPartial(object: Partial<QueryParamsResponse>): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: QueryParamsResponseAmino): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: QueryParamsResponse): QueryParamsResponseAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryParamsResponseAminoMsg): QueryParamsResponse {
    return QueryParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsResponseProtoMsg): QueryParamsResponse {
    return QueryParamsResponse.decode(message.value);
  },
  toProto(message: QueryParamsResponse): Uint8Array {
    return QueryParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsResponse): QueryParamsResponseProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryTasksRequest(): QueryTasksRequest {
  return {
    pagination: undefined,
    creator: undefined
  };
}
export const QueryTasksRequest = {
  typeUrl: "/warden.async.v1beta1.QueryTasksRequest",
  encode(message: QueryTasksRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.creator !== undefined) {
      writer.uint32(18).string(message.creator);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryTasksRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTasksRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.creator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryTasksRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      creator: isSet(object.creator) ? String(object.creator) : undefined
    };
  },
  toJSON(message: QueryTasksRequest): JsonSafe<QueryTasksRequest> {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    message.creator !== undefined && (obj.creator = message.creator);
    return obj;
  },
  fromPartial(object: Partial<QueryTasksRequest>): QueryTasksRequest {
    const message = createBaseQueryTasksRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    message.creator = object.creator ?? undefined;
    return message;
  },
  fromAmino(object: QueryTasksRequestAmino): QueryTasksRequest {
    const message = createBaseQueryTasksRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    return message;
  },
  toAmino(message: QueryTasksRequest): QueryTasksRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    obj.creator = message.creator === null ? undefined : message.creator;
    return obj;
  },
  fromAminoMsg(object: QueryTasksRequestAminoMsg): QueryTasksRequest {
    return QueryTasksRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryTasksRequestProtoMsg): QueryTasksRequest {
    return QueryTasksRequest.decode(message.value);
  },
  toProto(message: QueryTasksRequest): Uint8Array {
    return QueryTasksRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryTasksRequest): QueryTasksRequestProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.QueryTasksRequest",
      value: QueryTasksRequest.encode(message).finish()
    };
  }
};
function createBaseTaskResponse(): TaskResponse {
  return {
    task: Task.fromPartial({}),
    votes: [],
    result: undefined
  };
}
export const TaskResponse = {
  typeUrl: "/warden.async.v1beta1.TaskResponse",
  encode(message: TaskResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.task !== undefined) {
      Task.encode(message.task, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.votes) {
      TaskVote.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.result !== undefined) {
      TaskResult.encode(message.result, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): TaskResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTaskResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.task = Task.decode(reader, reader.uint32());
          break;
        case 2:
          message.votes.push(TaskVote.decode(reader, reader.uint32()));
          break;
        case 3:
          message.result = TaskResult.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): TaskResponse {
    return {
      task: isSet(object.task) ? Task.fromJSON(object.task) : undefined,
      votes: Array.isArray(object?.votes) ? object.votes.map((e: any) => TaskVote.fromJSON(e)) : [],
      result: isSet(object.result) ? TaskResult.fromJSON(object.result) : undefined
    };
  },
  toJSON(message: TaskResponse): JsonSafe<TaskResponse> {
    const obj: any = {};
    message.task !== undefined && (obj.task = message.task ? Task.toJSON(message.task) : undefined);
    if (message.votes) {
      obj.votes = message.votes.map(e => e ? TaskVote.toJSON(e) : undefined);
    } else {
      obj.votes = [];
    }
    message.result !== undefined && (obj.result = message.result ? TaskResult.toJSON(message.result) : undefined);
    return obj;
  },
  fromPartial(object: Partial<TaskResponse>): TaskResponse {
    const message = createBaseTaskResponse();
    message.task = object.task !== undefined && object.task !== null ? Task.fromPartial(object.task) : undefined;
    message.votes = object.votes?.map(e => TaskVote.fromPartial(e)) || [];
    message.result = object.result !== undefined && object.result !== null ? TaskResult.fromPartial(object.result) : undefined;
    return message;
  },
  fromAmino(object: TaskResponseAmino): TaskResponse {
    const message = createBaseTaskResponse();
    if (object.task !== undefined && object.task !== null) {
      message.task = Task.fromAmino(object.task);
    }
    message.votes = object.votes?.map(e => TaskVote.fromAmino(e)) || [];
    if (object.result !== undefined && object.result !== null) {
      message.result = TaskResult.fromAmino(object.result);
    }
    return message;
  },
  toAmino(message: TaskResponse): TaskResponseAmino {
    const obj: any = {};
    obj.task = message.task ? Task.toAmino(message.task) : undefined;
    if (message.votes) {
      obj.votes = message.votes.map(e => e ? TaskVote.toAmino(e) : undefined);
    } else {
      obj.votes = message.votes;
    }
    obj.result = message.result ? TaskResult.toAmino(message.result) : undefined;
    return obj;
  },
  fromAminoMsg(object: TaskResponseAminoMsg): TaskResponse {
    return TaskResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: TaskResponseProtoMsg): TaskResponse {
    return TaskResponse.decode(message.value);
  },
  toProto(message: TaskResponse): Uint8Array {
    return TaskResponse.encode(message).finish();
  },
  toProtoMsg(message: TaskResponse): TaskResponseProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.TaskResponse",
      value: TaskResponse.encode(message).finish()
    };
  }
};
function createBaseQueryTasksResponse(): QueryTasksResponse {
  return {
    pagination: undefined,
    tasks: []
  };
}
export const QueryTasksResponse = {
  typeUrl: "/warden.async.v1beta1.QueryTasksResponse",
  encode(message: QueryTasksResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.tasks) {
      TaskResponse.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryTasksResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTasksResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        case 2:
          message.tasks.push(TaskResponse.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryTasksResponse {
    return {
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      tasks: Array.isArray(object?.tasks) ? object.tasks.map((e: any) => TaskResponse.fromJSON(e)) : []
    };
  },
  toJSON(message: QueryTasksResponse): JsonSafe<QueryTasksResponse> {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    if (message.tasks) {
      obj.tasks = message.tasks.map(e => e ? TaskResponse.toJSON(e) : undefined);
    } else {
      obj.tasks = [];
    }
    return obj;
  },
  fromPartial(object: Partial<QueryTasksResponse>): QueryTasksResponse {
    const message = createBaseQueryTasksResponse();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    message.tasks = object.tasks?.map(e => TaskResponse.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryTasksResponseAmino): QueryTasksResponse {
    const message = createBaseQueryTasksResponse();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    message.tasks = object.tasks?.map(e => TaskResponse.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryTasksResponse): QueryTasksResponseAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    if (message.tasks) {
      obj.tasks = message.tasks.map(e => e ? TaskResponse.toAmino(e) : undefined);
    } else {
      obj.tasks = message.tasks;
    }
    return obj;
  },
  fromAminoMsg(object: QueryTasksResponseAminoMsg): QueryTasksResponse {
    return QueryTasksResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryTasksResponseProtoMsg): QueryTasksResponse {
    return QueryTasksResponse.decode(message.value);
  },
  toProto(message: QueryTasksResponse): Uint8Array {
    return QueryTasksResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryTasksResponse): QueryTasksResponseProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.QueryTasksResponse",
      value: QueryTasksResponse.encode(message).finish()
    };
  }
};
function createBaseQueryTaskByIdRequest(): QueryTaskByIdRequest {
  return {
    id: BigInt(0)
  };
}
export const QueryTaskByIdRequest = {
  typeUrl: "/warden.async.v1beta1.QueryTaskByIdRequest",
  encode(message: QueryTaskByIdRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryTaskByIdRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTaskByIdRequest();
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
  fromJSON(object: any): QueryTaskByIdRequest {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0)
    };
  },
  toJSON(message: QueryTaskByIdRequest): JsonSafe<QueryTaskByIdRequest> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<QueryTaskByIdRequest>): QueryTaskByIdRequest {
    const message = createBaseQueryTaskByIdRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryTaskByIdRequestAmino): QueryTaskByIdRequest {
    const message = createBaseQueryTaskByIdRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: QueryTaskByIdRequest): QueryTaskByIdRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? (message.id?.toString)() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryTaskByIdRequestAminoMsg): QueryTaskByIdRequest {
    return QueryTaskByIdRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryTaskByIdRequestProtoMsg): QueryTaskByIdRequest {
    return QueryTaskByIdRequest.decode(message.value);
  },
  toProto(message: QueryTaskByIdRequest): Uint8Array {
    return QueryTaskByIdRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryTaskByIdRequest): QueryTaskByIdRequestProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.QueryTaskByIdRequest",
      value: QueryTaskByIdRequest.encode(message).finish()
    };
  }
};
function createBaseQueryTaskByIdResponse(): QueryTaskByIdResponse {
  return {
    taskResponse: TaskResponse.fromPartial({})
  };
}
export const QueryTaskByIdResponse = {
  typeUrl: "/warden.async.v1beta1.QueryTaskByIdResponse",
  encode(message: QueryTaskByIdResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.taskResponse !== undefined) {
      TaskResponse.encode(message.taskResponse, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryTaskByIdResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTaskByIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.taskResponse = TaskResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryTaskByIdResponse {
    return {
      taskResponse: isSet(object.taskResponse) ? TaskResponse.fromJSON(object.taskResponse) : undefined
    };
  },
  toJSON(message: QueryTaskByIdResponse): JsonSafe<QueryTaskByIdResponse> {
    const obj: any = {};
    message.taskResponse !== undefined && (obj.taskResponse = message.taskResponse ? TaskResponse.toJSON(message.taskResponse) : undefined);
    return obj;
  },
  fromPartial(object: Partial<QueryTaskByIdResponse>): QueryTaskByIdResponse {
    const message = createBaseQueryTaskByIdResponse();
    message.taskResponse = object.taskResponse !== undefined && object.taskResponse !== null ? TaskResponse.fromPartial(object.taskResponse) : undefined;
    return message;
  },
  fromAmino(object: QueryTaskByIdResponseAmino): QueryTaskByIdResponse {
    const message = createBaseQueryTaskByIdResponse();
    if (object.taskResponse !== undefined && object.taskResponse !== null) {
      message.taskResponse = TaskResponse.fromAmino(object.taskResponse);
    }
    return message;
  },
  toAmino(message: QueryTaskByIdResponse): QueryTaskByIdResponseAmino {
    const obj: any = {};
    obj.taskResponse = message.taskResponse ? TaskResponse.toAmino(message.taskResponse) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryTaskByIdResponseAminoMsg): QueryTaskByIdResponse {
    return QueryTaskByIdResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryTaskByIdResponseProtoMsg): QueryTaskByIdResponse {
    return QueryTaskByIdResponse.decode(message.value);
  },
  toProto(message: QueryTaskByIdResponse): Uint8Array {
    return QueryTaskByIdResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryTaskByIdResponse): QueryTaskByIdResponseProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.QueryTaskByIdResponse",
      value: QueryTaskByIdResponse.encode(message).finish()
    };
  }
};
function createBaseQueryPendingTasksRequest(): QueryPendingTasksRequest {
  return {
    pagination: undefined
  };
}
export const QueryPendingTasksRequest = {
  typeUrl: "/warden.async.v1beta1.QueryPendingTasksRequest",
  encode(message: QueryPendingTasksRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPendingTasksRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPendingTasksRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryPendingTasksRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined
    };
  },
  toJSON(message: QueryPendingTasksRequest): JsonSafe<QueryPendingTasksRequest> {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial(object: Partial<QueryPendingTasksRequest>): QueryPendingTasksRequest {
    const message = createBaseQueryPendingTasksRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryPendingTasksRequestAmino): QueryPendingTasksRequest {
    const message = createBaseQueryPendingTasksRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryPendingTasksRequest): QueryPendingTasksRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryPendingTasksRequestAminoMsg): QueryPendingTasksRequest {
    return QueryPendingTasksRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPendingTasksRequestProtoMsg): QueryPendingTasksRequest {
    return QueryPendingTasksRequest.decode(message.value);
  },
  toProto(message: QueryPendingTasksRequest): Uint8Array {
    return QueryPendingTasksRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryPendingTasksRequest): QueryPendingTasksRequestProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.QueryPendingTasksRequest",
      value: QueryPendingTasksRequest.encode(message).finish()
    };
  }
};
function createBaseQueryPendingTasksResponse(): QueryPendingTasksResponse {
  return {
    pagination: undefined,
    tasks: []
  };
}
export const QueryPendingTasksResponse = {
  typeUrl: "/warden.async.v1beta1.QueryPendingTasksResponse",
  encode(message: QueryPendingTasksResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.tasks) {
      Task.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPendingTasksResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPendingTasksResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        case 2:
          message.tasks.push(Task.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryPendingTasksResponse {
    return {
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      tasks: Array.isArray(object?.tasks) ? object.tasks.map((e: any) => Task.fromJSON(e)) : []
    };
  },
  toJSON(message: QueryPendingTasksResponse): JsonSafe<QueryPendingTasksResponse> {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    if (message.tasks) {
      obj.tasks = message.tasks.map(e => e ? Task.toJSON(e) : undefined);
    } else {
      obj.tasks = [];
    }
    return obj;
  },
  fromPartial(object: Partial<QueryPendingTasksResponse>): QueryPendingTasksResponse {
    const message = createBaseQueryPendingTasksResponse();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    message.tasks = object.tasks?.map(e => Task.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryPendingTasksResponseAmino): QueryPendingTasksResponse {
    const message = createBaseQueryPendingTasksResponse();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    message.tasks = object.tasks?.map(e => Task.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryPendingTasksResponse): QueryPendingTasksResponseAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    if (message.tasks) {
      obj.tasks = message.tasks.map(e => e ? Task.toAmino(e) : undefined);
    } else {
      obj.tasks = message.tasks;
    }
    return obj;
  },
  fromAminoMsg(object: QueryPendingTasksResponseAminoMsg): QueryPendingTasksResponse {
    return QueryPendingTasksResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPendingTasksResponseProtoMsg): QueryPendingTasksResponse {
    return QueryPendingTasksResponse.decode(message.value);
  },
  toProto(message: QueryPendingTasksResponse): Uint8Array {
    return QueryPendingTasksResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryPendingTasksResponse): QueryPendingTasksResponseProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.QueryPendingTasksResponse",
      value: QueryPendingTasksResponse.encode(message).finish()
    };
  }
};
function createBaseQueryPluginsByValidatorRequest(): QueryPluginsByValidatorRequest {
  return {
    pagination: undefined,
    validator: ""
  };
}
export const QueryPluginsByValidatorRequest = {
  typeUrl: "/warden.async.v1beta1.QueryPluginsByValidatorRequest",
  encode(message: QueryPluginsByValidatorRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.validator !== "") {
      writer.uint32(18).string(message.validator);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPluginsByValidatorRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPluginsByValidatorRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.validator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryPluginsByValidatorRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      validator: isSet(object.validator) ? String(object.validator) : ""
    };
  },
  toJSON(message: QueryPluginsByValidatorRequest): JsonSafe<QueryPluginsByValidatorRequest> {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    message.validator !== undefined && (obj.validator = message.validator);
    return obj;
  },
  fromPartial(object: Partial<QueryPluginsByValidatorRequest>): QueryPluginsByValidatorRequest {
    const message = createBaseQueryPluginsByValidatorRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    message.validator = object.validator ?? "";
    return message;
  },
  fromAmino(object: QueryPluginsByValidatorRequestAmino): QueryPluginsByValidatorRequest {
    const message = createBaseQueryPluginsByValidatorRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    if (object.validator !== undefined && object.validator !== null) {
      message.validator = object.validator;
    }
    return message;
  },
  toAmino(message: QueryPluginsByValidatorRequest): QueryPluginsByValidatorRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    obj.validator = message.validator === "" ? undefined : message.validator;
    return obj;
  },
  fromAminoMsg(object: QueryPluginsByValidatorRequestAminoMsg): QueryPluginsByValidatorRequest {
    return QueryPluginsByValidatorRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPluginsByValidatorRequestProtoMsg): QueryPluginsByValidatorRequest {
    return QueryPluginsByValidatorRequest.decode(message.value);
  },
  toProto(message: QueryPluginsByValidatorRequest): Uint8Array {
    return QueryPluginsByValidatorRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryPluginsByValidatorRequest): QueryPluginsByValidatorRequestProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.QueryPluginsByValidatorRequest",
      value: QueryPluginsByValidatorRequest.encode(message).finish()
    };
  }
};
function createBaseQueryPluginsByValidatorResponse(): QueryPluginsByValidatorResponse {
  return {
    pagination: undefined,
    plugins: []
  };
}
export const QueryPluginsByValidatorResponse = {
  typeUrl: "/warden.async.v1beta1.QueryPluginsByValidatorResponse",
  encode(message: QueryPluginsByValidatorResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.plugins) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPluginsByValidatorResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPluginsByValidatorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        case 2:
          message.plugins.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryPluginsByValidatorResponse {
    return {
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      plugins: Array.isArray(object?.plugins) ? object.plugins.map((e: any) => String(e)) : []
    };
  },
  toJSON(message: QueryPluginsByValidatorResponse): JsonSafe<QueryPluginsByValidatorResponse> {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    if (message.plugins) {
      obj.plugins = message.plugins.map(e => e);
    } else {
      obj.plugins = [];
    }
    return obj;
  },
  fromPartial(object: Partial<QueryPluginsByValidatorResponse>): QueryPluginsByValidatorResponse {
    const message = createBaseQueryPluginsByValidatorResponse();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    message.plugins = object.plugins?.map(e => e) || [];
    return message;
  },
  fromAmino(object: QueryPluginsByValidatorResponseAmino): QueryPluginsByValidatorResponse {
    const message = createBaseQueryPluginsByValidatorResponse();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    message.plugins = object.plugins?.map(e => e) || [];
    return message;
  },
  toAmino(message: QueryPluginsByValidatorResponse): QueryPluginsByValidatorResponseAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    if (message.plugins) {
      obj.plugins = message.plugins.map(e => e);
    } else {
      obj.plugins = message.plugins;
    }
    return obj;
  },
  fromAminoMsg(object: QueryPluginsByValidatorResponseAminoMsg): QueryPluginsByValidatorResponse {
    return QueryPluginsByValidatorResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPluginsByValidatorResponseProtoMsg): QueryPluginsByValidatorResponse {
    return QueryPluginsByValidatorResponse.decode(message.value);
  },
  toProto(message: QueryPluginsByValidatorResponse): Uint8Array {
    return QueryPluginsByValidatorResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryPluginsByValidatorResponse): QueryPluginsByValidatorResponseProtoMsg {
    return {
      typeUrl: "/warden.async.v1beta1.QueryPluginsByValidatorResponse",
      value: QueryPluginsByValidatorResponse.encode(message).finish()
    };
  }
};