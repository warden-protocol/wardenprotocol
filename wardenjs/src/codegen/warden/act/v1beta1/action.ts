//@ts-nocheck
import { Any, AnyAmino, AnySDKType } from "../../../google/protobuf/any.js";
import { Timestamp, TimestampSDKType } from "../../../google/protobuf/timestamp.js";
import { Expression, ExpressionAmino, ExpressionSDKType } from "../../../shield/ast/ast.js";
import { ActionVote, ActionVoteAmino, ActionVoteSDKType } from "./action_vote.js";
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet, fromJsonTimestamp, fromTimestamp } from "../../../helpers.js";
import { JsonSafe } from "../../../json-safe.js";
/** Current status of an action. */
export enum ActionStatus {
  /** ACTION_STATUS_UNSPECIFIED - Unspecified status. */
  ACTION_STATUS_UNSPECIFIED = 0,
  /** ACTION_STATUS_PENDING - Action is pending approval. This is the initial status. */
  ACTION_STATUS_PENDING = 1,
  /** ACTION_STATUS_COMPLETED - Template has been satisfied, action has been executed. */
  ACTION_STATUS_COMPLETED = 2,
  /** ACTION_STATUS_REVOKED - Action has been revoked by its creator. */
  ACTION_STATUS_REVOKED = 3,
  /** ACTION_STATUS_TIMEOUT - Action has been rejected since TimeoutHeight has been reached. */
  ACTION_STATUS_TIMEOUT = 4,
  UNRECOGNIZED = -1,
}
export const ActionStatusSDKType = ActionStatus;
export const ActionStatusAmino = ActionStatus;
export function actionStatusFromJSON(object: any): ActionStatus {
  switch (object) {
    case 0:
    case "ACTION_STATUS_UNSPECIFIED":
      return ActionStatus.ACTION_STATUS_UNSPECIFIED;
    case 1:
    case "ACTION_STATUS_PENDING":
      return ActionStatus.ACTION_STATUS_PENDING;
    case 2:
    case "ACTION_STATUS_COMPLETED":
      return ActionStatus.ACTION_STATUS_COMPLETED;
    case 3:
    case "ACTION_STATUS_REVOKED":
      return ActionStatus.ACTION_STATUS_REVOKED;
    case 4:
    case "ACTION_STATUS_TIMEOUT":
      return ActionStatus.ACTION_STATUS_TIMEOUT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ActionStatus.UNRECOGNIZED;
  }
}
export function actionStatusToJSON(object: ActionStatus): string {
  switch (object) {
    case ActionStatus.ACTION_STATUS_UNSPECIFIED:
      return "ACTION_STATUS_UNSPECIFIED";
    case ActionStatus.ACTION_STATUS_PENDING:
      return "ACTION_STATUS_PENDING";
    case ActionStatus.ACTION_STATUS_COMPLETED:
      return "ACTION_STATUS_COMPLETED";
    case ActionStatus.ACTION_STATUS_REVOKED:
      return "ACTION_STATUS_REVOKED";
    case ActionStatus.ACTION_STATUS_TIMEOUT:
      return "ACTION_STATUS_TIMEOUT";
    case ActionStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/**
 * Action wraps a message that will be executed when its associated template is
 * satisfied.
 */
export interface Action {
  id: bigint;
  status: ActionStatus;
  /**
   * Original message that started the action, it will be executed when the
   * template is satisfied.
   */
  msg?: Any;
  /** Result of the action, it will be set when the action is completed. */
  result?: Any;
  creator: string;
  /** TimeoutHeight is the block height up until this action can be executed. */
  timeoutHeight: bigint;
  /** created_at is a timestamp specifying when the action was created */
  createdAt: Timestamp;
  /** updated_at is a timestamp specifying when the action's status was updated */
  updatedAt: Timestamp;
  /** mentions is a list of addresses that are mentioned in the template. */
  mentions: string[];
  /** The expression to be evaluated for approval. */
  approveExpression: Expression;
  /** The expression to be evaluated for rejection. */
  rejectExpression: Expression;
  /** The votes accepted from the voting participants. */
  votes: ActionVote[];
}
export interface ActionProtoMsg {
  typeUrl: "/warden.act.v1beta1.Action";
  value: Uint8Array;
}
/**
 * Action wraps a message that will be executed when its associated template is
 * satisfied.
 */
export interface ActionAmino {
  id?: string;
  status?: ActionStatus;
  /**
   * Original message that started the action, it will be executed when the
   * template is satisfied.
   */
  msg?: AnyAmino;
  /** Result of the action, it will be set when the action is completed. */
  result?: AnyAmino;
  creator?: string;
  /** TimeoutHeight is the block height up until this action can be executed. */
  timeout_height?: string;
  /** created_at is a timestamp specifying when the action was created */
  created_at: string;
  /** updated_at is a timestamp specifying when the action's status was updated */
  updated_at: string;
  /** mentions is a list of addresses that are mentioned in the template. */
  mentions?: string[];
  /** The expression to be evaluated for approval. */
  approve_expression?: ExpressionAmino;
  /** The expression to be evaluated for rejection. */
  reject_expression?: ExpressionAmino;
  /** The votes accepted from the voting participants. */
  votes?: ActionVoteAmino[];
}
export interface ActionAminoMsg {
  type: "/warden.act.v1beta1.Action";
  value: ActionAmino;
}
/**
 * Action wraps a message that will be executed when its associated template is
 * satisfied.
 */
export interface ActionSDKType {
  id: bigint;
  status: ActionStatus;
  msg?: AnySDKType;
  result?: AnySDKType;
  creator: string;
  timeout_height: bigint;
  created_at: TimestampSDKType;
  updated_at: TimestampSDKType;
  mentions: string[];
  approve_expression: ExpressionSDKType;
  reject_expression: ExpressionSDKType;
  votes: ActionVoteSDKType[];
}
function createBaseAction(): Action {
  return {
    id: BigInt(0),
    status: 0,
    msg: undefined,
    result: undefined,
    creator: "",
    timeoutHeight: BigInt(0),
    createdAt: Timestamp.fromPartial({}),
    updatedAt: Timestamp.fromPartial({}),
    mentions: [],
    approveExpression: Expression.fromPartial({}),
    rejectExpression: Expression.fromPartial({}),
    votes: []
  };
}
export const Action = {
  typeUrl: "/warden.act.v1beta1.Action",
  encode(message: Action, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.msg !== undefined) {
      Any.encode(message.msg, writer.uint32(26).fork()).ldelim();
    }
    if (message.result !== undefined) {
      Any.encode(message.result, writer.uint32(34).fork()).ldelim();
    }
    if (message.creator !== "") {
      writer.uint32(42).string(message.creator);
    }
    if (message.timeoutHeight !== BigInt(0)) {
      writer.uint32(48).uint64(message.timeoutHeight);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(message.createdAt, writer.uint32(58).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(message.updatedAt, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.mentions) {
      writer.uint32(74).string(v!);
    }
    if (message.approveExpression !== undefined) {
      Expression.encode(message.approveExpression, writer.uint32(82).fork()).ldelim();
    }
    if (message.rejectExpression !== undefined) {
      Expression.encode(message.rejectExpression, writer.uint32(90).fork()).ldelim();
    }
    for (const v of message.votes) {
      ActionVote.encode(v!, writer.uint32(98).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Action {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.status = reader.int32() as any;
          break;
        case 3:
          message.msg = Any.decode(reader, reader.uint32());
          break;
        case 4:
          message.result = Any.decode(reader, reader.uint32());
          break;
        case 5:
          message.creator = reader.string();
          break;
        case 6:
          message.timeoutHeight = reader.uint64();
          break;
        case 7:
          message.createdAt = Timestamp.decode(reader, reader.uint32());
          break;
        case 8:
          message.updatedAt = Timestamp.decode(reader, reader.uint32());
          break;
        case 9:
          message.mentions.push(reader.string());
          break;
        case 10:
          message.approveExpression = Expression.decode(reader, reader.uint32());
          break;
        case 11:
          message.rejectExpression = Expression.decode(reader, reader.uint32());
          break;
        case 12:
          message.votes.push(ActionVote.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Action {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      status: isSet(object.status) ? actionStatusFromJSON(object.status) : -1,
      msg: isSet(object.msg) ? Any.fromJSON(object.msg) : undefined,
      result: isSet(object.result) ? Any.fromJSON(object.result) : undefined,
      creator: isSet(object.creator) ? String(object.creator) : "",
      timeoutHeight: isSet(object.timeoutHeight) ? BigInt(object.timeoutHeight.toString()) : BigInt(0),
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      updatedAt: isSet(object.updatedAt) ? fromJsonTimestamp(object.updatedAt) : undefined,
      mentions: Array.isArray(object?.mentions) ? object.mentions.map((e: any) => String(e)) : [],
      approveExpression: isSet(object.approveExpression) ? Expression.fromJSON(object.approveExpression) : undefined,
      rejectExpression: isSet(object.rejectExpression) ? Expression.fromJSON(object.rejectExpression) : undefined,
      votes: Array.isArray(object?.votes) ? object.votes.map((e: any) => ActionVote.fromJSON(e)) : []
    };
  },
  toJSON(message: Action): JsonSafe<Action> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.status !== undefined && (obj.status = actionStatusToJSON(message.status));
    message.msg !== undefined && (obj.msg = message.msg ? Any.toJSON(message.msg) : undefined);
    message.result !== undefined && (obj.result = message.result ? Any.toJSON(message.result) : undefined);
    message.creator !== undefined && (obj.creator = message.creator);
    message.timeoutHeight !== undefined && (obj.timeoutHeight = (message.timeoutHeight || BigInt(0)).toString());
    message.createdAt !== undefined && (obj.createdAt = fromTimestamp(message.createdAt).toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = fromTimestamp(message.updatedAt).toISOString());
    if (message.mentions) {
      obj.mentions = message.mentions.map(e => e);
    } else {
      obj.mentions = [];
    }
    message.approveExpression !== undefined && (obj.approveExpression = message.approveExpression ? Expression.toJSON(message.approveExpression) : undefined);
    message.rejectExpression !== undefined && (obj.rejectExpression = message.rejectExpression ? Expression.toJSON(message.rejectExpression) : undefined);
    if (message.votes) {
      obj.votes = message.votes.map(e => e ? ActionVote.toJSON(e) : undefined);
    } else {
      obj.votes = [];
    }
    return obj;
  },
  fromPartial(object: Partial<Action>): Action {
    const message = createBaseAction();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.status = object.status ?? 0;
    message.msg = object.msg !== undefined && object.msg !== null ? Any.fromPartial(object.msg) : undefined;
    message.result = object.result !== undefined && object.result !== null ? Any.fromPartial(object.result) : undefined;
    message.creator = object.creator ?? "";
    message.timeoutHeight = object.timeoutHeight !== undefined && object.timeoutHeight !== null ? BigInt(object.timeoutHeight.toString()) : BigInt(0);
    message.createdAt = object.createdAt !== undefined && object.createdAt !== null ? Timestamp.fromPartial(object.createdAt) : undefined;
    message.updatedAt = object.updatedAt !== undefined && object.updatedAt !== null ? Timestamp.fromPartial(object.updatedAt) : undefined;
    message.mentions = object.mentions?.map(e => e) || [];
    message.approveExpression = object.approveExpression !== undefined && object.approveExpression !== null ? Expression.fromPartial(object.approveExpression) : undefined;
    message.rejectExpression = object.rejectExpression !== undefined && object.rejectExpression !== null ? Expression.fromPartial(object.rejectExpression) : undefined;
    message.votes = object.votes?.map(e => ActionVote.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: ActionAmino): Action {
    const message = createBaseAction();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = Any.fromAmino(object.msg);
    }
    if (object.result !== undefined && object.result !== null) {
      message.result = Any.fromAmino(object.result);
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.timeout_height !== undefined && object.timeout_height !== null) {
      message.timeoutHeight = BigInt(object.timeout_height);
    }
    if (object.created_at !== undefined && object.created_at !== null) {
      message.createdAt = Timestamp.fromAmino(object.created_at);
    }
    if (object.updated_at !== undefined && object.updated_at !== null) {
      message.updatedAt = Timestamp.fromAmino(object.updated_at);
    }
    message.mentions = object.mentions?.map(e => e) || [];
    if (object.approve_expression !== undefined && object.approve_expression !== null) {
      message.approveExpression = Expression.fromAmino(object.approve_expression);
    }
    if (object.reject_expression !== undefined && object.reject_expression !== null) {
      message.rejectExpression = Expression.fromAmino(object.reject_expression);
    }
    message.votes = object.votes?.map(e => ActionVote.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: Action): ActionAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? (message.id?.toString)() : undefined;
    obj.status = message.status === 0 ? undefined : message.status;
    obj.msg = message.msg ? Any.toAmino(message.msg) : undefined;
    obj.result = message.result ? Any.toAmino(message.result) : undefined;
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.timeout_height = message.timeoutHeight !== BigInt(0) ? (message.timeoutHeight?.toString)() : undefined;
    obj.created_at = message.createdAt ? Timestamp.toAmino(message.createdAt) : Timestamp.toAmino(Timestamp.fromPartial({}));
    obj.updated_at = message.updatedAt ? Timestamp.toAmino(message.updatedAt) : Timestamp.toAmino(Timestamp.fromPartial({}));
    if (message.mentions) {
      obj.mentions = message.mentions.map(e => e);
    } else {
      obj.mentions = message.mentions;
    }
    obj.approve_expression = message.approveExpression ? Expression.toAmino(message.approveExpression) : undefined;
    obj.reject_expression = message.rejectExpression ? Expression.toAmino(message.rejectExpression) : undefined;
    if (message.votes) {
      obj.votes = message.votes.map(e => e ? ActionVote.toAmino(e) : undefined);
    } else {
      obj.votes = message.votes;
    }
    return obj;
  },
  fromAminoMsg(object: ActionAminoMsg): Action {
    return Action.fromAmino(object.value);
  },
  fromProtoMsg(message: ActionProtoMsg): Action {
    return Action.decode(message.value);
  },
  toProto(message: Action): Uint8Array {
    return Action.encode(message).finish();
  },
  toProtoMsg(message: Action): ActionProtoMsg {
    return {
      typeUrl: "/warden.act.v1beta1.Action",
      value: Action.encode(message).finish()
    };
  }
};
