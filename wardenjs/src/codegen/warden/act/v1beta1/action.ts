//@ts-nocheck
import { Timestamp, TimestampSDKType } from "../../../google/protobuf/timestamp.js";
import { Any, AnyAmino, AnySDKType } from "../../../google/protobuf/any.js";
import { Rule, RuleAmino, RuleSDKType } from "./rule.js";
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
  /** ACTION_STATUS_COMPLETED - Rule has been satified, action has been executed. */
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
export interface Approver {
  /** address is the address of the approver */
  address: string;
  /** approved_at is a timestamp specifying when the approver approved an action */
  approvedAt: Timestamp;
}
export interface ApproverProtoMsg {
  typeUrl: "/warden.act.v1beta1.Approver";
  value: Uint8Array;
}
export interface ApproverAmino {
  /** address is the address of the approver */
  address?: string;
  /** approved_at is a timestamp specifying when the approver approved an action */
  approved_at: string;
}
export interface ApproverAminoMsg {
  type: "/warden.act.v1beta1.Approver";
  value: ApproverAmino;
}
export interface ApproverSDKType {
  address: string;
  approved_at: TimestampSDKType;
}
/**
 * Action wraps a message that will be executed when its associated rule is
 * satisfied.
 */
export interface Action {
  id: bigint;
  approvers: Approver[];
  status: ActionStatus;
  /**
   * Original message that started the action, it will be executed when the
   * rule is satisfied.
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
  /**
   * rule is the condition that this action is associated with. Instead of
   * storing the rule ID, we store the entire Rule object so that is immutable
   * and cannot be changed later.
   */
  rule: Rule;
  /** mentions is a list of addresses that are mentioned in the rule. */
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
 * Action wraps a message that will be executed when its associated rule is
 * satisfied.
 */
export interface ActionAmino {
  id?: string;
  approvers?: ApproverAmino[];
  status?: ActionStatus;
  /**
   * Original message that started the action, it will be executed when the
   * rule is satisfied.
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
  /**
   * rule is the condition that this action is associated with. Instead of
   * storing the rule ID, we store the entire Rule object so that is immutable
   * and cannot be changed later.
   */
  rule?: RuleAmino;
  /** mentions is a list of addresses that are mentioned in the rule. */
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
 * Action wraps a message that will be executed when its associated rule is
 * satisfied.
 */
export interface ActionSDKType {
  id: bigint;
  approvers: ApproverSDKType[];
  status: ActionStatus;
  msg?: AnySDKType;
  result?: AnySDKType;
  creator: string;
  timeout_height: bigint;
  created_at: TimestampSDKType;
  updated_at: TimestampSDKType;
  rule: RuleSDKType;
  mentions: string[];
  approve_expression: ExpressionSDKType;
  reject_expression: ExpressionSDKType;
  votes: ActionVoteSDKType[];
}
function createBaseApprover(): Approver {
  return {
    address: "",
    approvedAt: Timestamp.fromPartial({})
  };
}
export const Approver = {
  typeUrl: "/warden.act.v1beta1.Approver",
  encode(message: Approver, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.approvedAt !== undefined) {
      Timestamp.encode(message.approvedAt, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Approver {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApprover();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.approvedAt = Timestamp.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Approver {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      approvedAt: isSet(object.approvedAt) ? fromJsonTimestamp(object.approvedAt) : undefined
    };
  },
  toJSON(message: Approver): JsonSafe<Approver> {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.approvedAt !== undefined && (obj.approvedAt = fromTimestamp(message.approvedAt).toISOString());
    return obj;
  },
  fromPartial(object: Partial<Approver>): Approver {
    const message = createBaseApprover();
    message.address = object.address ?? "";
    message.approvedAt = object.approvedAt !== undefined && object.approvedAt !== null ? Timestamp.fromPartial(object.approvedAt) : undefined;
    return message;
  },
  fromAmino(object: ApproverAmino): Approver {
    const message = createBaseApprover();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.approved_at !== undefined && object.approved_at !== null) {
      message.approvedAt = Timestamp.fromAmino(object.approved_at);
    }
    return message;
  },
  toAmino(message: Approver): ApproverAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    obj.approved_at = message.approvedAt ? Timestamp.toAmino(message.approvedAt) : Timestamp.toAmino(Timestamp.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: ApproverAminoMsg): Approver {
    return Approver.fromAmino(object.value);
  },
  fromProtoMsg(message: ApproverProtoMsg): Approver {
    return Approver.decode(message.value);
  },
  toProto(message: Approver): Uint8Array {
    return Approver.encode(message).finish();
  },
  toProtoMsg(message: Approver): ApproverProtoMsg {
    return {
      typeUrl: "/warden.act.v1beta1.Approver",
      value: Approver.encode(message).finish()
    };
  }
};
function createBaseAction(): Action {
  return {
    id: BigInt(0),
    approvers: [],
    status: 0,
    msg: undefined,
    result: undefined,
    creator: "",
    timeoutHeight: BigInt(0),
    createdAt: Timestamp.fromPartial({}),
    updatedAt: Timestamp.fromPartial({}),
    rule: Rule.fromPartial({}),
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
    for (const v of message.approvers) {
      Approver.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(24).int32(message.status);
    }
    if (message.msg !== undefined) {
      Any.encode(message.msg, writer.uint32(42).fork()).ldelim();
    }
    if (message.result !== undefined) {
      Any.encode(message.result, writer.uint32(50).fork()).ldelim();
    }
    if (message.creator !== "") {
      writer.uint32(58).string(message.creator);
    }
    if (message.timeoutHeight !== BigInt(0)) {
      writer.uint32(64).uint64(message.timeoutHeight);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(message.createdAt, writer.uint32(74).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(message.updatedAt, writer.uint32(82).fork()).ldelim();
    }
    if (message.rule !== undefined) {
      Rule.encode(message.rule, writer.uint32(90).fork()).ldelim();
    }
    for (const v of message.mentions) {
      writer.uint32(98).string(v!);
    }
    if (message.approveExpression !== undefined) {
      Expression.encode(message.approveExpression, writer.uint32(106).fork()).ldelim();
    }
    if (message.rejectExpression !== undefined) {
      Expression.encode(message.rejectExpression, writer.uint32(114).fork()).ldelim();
    }
    for (const v of message.votes) {
      ActionVote.encode(v!, writer.uint32(122).fork()).ldelim();
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
          message.approvers.push(Approver.decode(reader, reader.uint32()));
          break;
        case 3:
          message.status = (reader.int32() as any);
          break;
        case 5:
          message.msg = Any.decode(reader, reader.uint32());
          break;
        case 6:
          message.result = Any.decode(reader, reader.uint32());
          break;
        case 7:
          message.creator = reader.string();
          break;
        case 8:
          message.timeoutHeight = reader.uint64();
          break;
        case 9:
          message.createdAt = Timestamp.decode(reader, reader.uint32());
          break;
        case 10:
          message.updatedAt = Timestamp.decode(reader, reader.uint32());
          break;
        case 11:
          message.rule = Rule.decode(reader, reader.uint32());
          break;
        case 12:
          message.mentions.push(reader.string());
          break;
        case 13:
          message.approveExpression = Expression.decode(reader, reader.uint32());
          break;
        case 14:
          message.rejectExpression = Expression.decode(reader, reader.uint32());
          break;
        case 15:
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
      approvers: Array.isArray(object?.approvers) ? object.approvers.map((e: any) => Approver.fromJSON(e)) : [],
      status: isSet(object.status) ? actionStatusFromJSON(object.status) : -1,
      msg: isSet(object.msg) ? Any.fromJSON(object.msg) : undefined,
      result: isSet(object.result) ? Any.fromJSON(object.result) : undefined,
      creator: isSet(object.creator) ? String(object.creator) : "",
      timeoutHeight: isSet(object.timeoutHeight) ? BigInt(object.timeoutHeight.toString()) : BigInt(0),
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      updatedAt: isSet(object.updatedAt) ? fromJsonTimestamp(object.updatedAt) : undefined,
      rule: isSet(object.rule) ? Rule.fromJSON(object.rule) : undefined,
      mentions: Array.isArray(object?.mentions) ? object.mentions.map((e: any) => String(e)) : [],
      approveExpression: isSet(object.approveExpression) ? Expression.fromJSON(object.approveExpression) : undefined,
      rejectExpression: isSet(object.rejectExpression) ? Expression.fromJSON(object.rejectExpression) : undefined,
      votes: Array.isArray(object?.votes) ? object.votes.map((e: any) => ActionVote.fromJSON(e)) : []
    };
  },
  toJSON(message: Action): JsonSafe<Action> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    if (message.approvers) {
      obj.approvers = message.approvers.map(e => e ? Approver.toJSON(e) : undefined);
    } else {
      obj.approvers = [];
    }
    message.status !== undefined && (obj.status = actionStatusToJSON(message.status));
    message.msg !== undefined && (obj.msg = message.msg ? Any.toJSON(message.msg) : undefined);
    message.result !== undefined && (obj.result = message.result ? Any.toJSON(message.result) : undefined);
    message.creator !== undefined && (obj.creator = message.creator);
    message.timeoutHeight !== undefined && (obj.timeoutHeight = (message.timeoutHeight || BigInt(0)).toString());
    message.createdAt !== undefined && (obj.createdAt = fromTimestamp(message.createdAt).toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = fromTimestamp(message.updatedAt).toISOString());
    message.rule !== undefined && (obj.rule = message.rule ? Rule.toJSON(message.rule) : undefined);
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
    message.approvers = object.approvers?.map(e => Approver.fromPartial(e)) || [];
    message.status = object.status ?? 0;
    message.msg = object.msg !== undefined && object.msg !== null ? Any.fromPartial(object.msg) : undefined;
    message.result = object.result !== undefined && object.result !== null ? Any.fromPartial(object.result) : undefined;
    message.creator = object.creator ?? "";
    message.timeoutHeight = object.timeoutHeight !== undefined && object.timeoutHeight !== null ? BigInt(object.timeoutHeight.toString()) : BigInt(0);
    message.createdAt = object.createdAt !== undefined && object.createdAt !== null ? Timestamp.fromPartial(object.createdAt) : undefined;
    message.updatedAt = object.updatedAt !== undefined && object.updatedAt !== null ? Timestamp.fromPartial(object.updatedAt) : undefined;
    message.rule = object.rule !== undefined && object.rule !== null ? Rule.fromPartial(object.rule) : undefined;
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
    message.approvers = object.approvers?.map(e => Approver.fromAmino(e)) || [];
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
    if (object.rule !== undefined && object.rule !== null) {
      message.rule = Rule.fromAmino(object.rule);
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
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    if (message.approvers) {
      obj.approvers = message.approvers.map(e => e ? Approver.toAmino(e) : undefined);
    } else {
      obj.approvers = message.approvers;
    }
    obj.status = message.status === 0 ? undefined : message.status;
    obj.msg = message.msg ? Any.toAmino(message.msg) : undefined;
    obj.result = message.result ? Any.toAmino(message.result) : undefined;
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.timeout_height = message.timeoutHeight !== BigInt(0) ? message.timeoutHeight.toString() : undefined;
    obj.created_at = message.createdAt ? Timestamp.toAmino(message.createdAt) : Timestamp.toAmino(Timestamp.fromPartial({}));
    obj.updated_at = message.updatedAt ? Timestamp.toAmino(message.updatedAt) : Timestamp.toAmino(Timestamp.fromPartial({}));
    obj.rule = message.rule ? Rule.toAmino(message.rule) : undefined;
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