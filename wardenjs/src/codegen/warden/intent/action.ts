//@ts-nocheck
import { Timestamp, TimestampSDKType } from "../../google/protobuf/timestamp.js";
import { Any, AnyAmino, AnySDKType } from "../../google/protobuf/any.js";
import { Intent, IntentAmino, IntentSDKType } from "./intent.js";
import { Long, isSet, fromJsonTimestamp, fromTimestamp } from "../../helpers.js";
import _m0 from "protobufjs/minimal.js";
/** Current status of an action. */
export enum ActionStatus {
  /** ACTION_STATUS_UNSPECIFIED - Unspecified status. */
  ACTION_STATUS_UNSPECIFIED = 0,
  /** ACTION_STATUS_PENDING - Action is pending approval. This is the initial status. */
  ACTION_STATUS_PENDING = 1,
  /** ACTION_STATUS_COMPLETED - Intent has been satified, action has been executed. */
  ACTION_STATUS_COMPLETED = 2,
  /** ACTION_STATUS_REVOKED - Action has been revoked by its creator. */
  ACTION_STATUS_REVOKED = 3,
  /** ACTION_STATUS_TIMEOUT - Action has been rejected since Btl is expired */
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
  typeUrl: "/warden.intent.Approver";
  value: Uint8Array;
}
export interface ApproverAmino {
  /** address is the address of the approver */
  address?: string;
  /** approved_at is a timestamp specifying when the approver approved an action */
  approved_at: string;
}
export interface ApproverAminoMsg {
  type: "/warden.intent.Approver";
  value: ApproverAmino;
}
export interface ApproverSDKType {
  address: string;
  approved_at: TimestampSDKType;
}
/** Action wraps a message that needs to be approved by a set of approvers. */
export interface Action {
  id: Long;
  approvers: Approver[];
  status: ActionStatus;
  /**
   * Original message that started the action, it will be executed when the
   * intent is satisfied.
   */
  msg?: Any;
  /** Result of the action, it will be set when the action is completed. */
  result?: Any;
  creator: string;
  /**
   * BTL (blocks to live) is the block height up until this action can be
   * approved or rejected.
   */
  btl: Long;
  /** created_at is a timestamp specifying when the action was created */
  createdAt: Timestamp;
  /** updated_at is a timestamp specifying when the action's status was updated */
  updatedAt: Timestamp;
  /**
   * intent is the intent that this action is associated with. Instead of
   * storing the intent ID, we store the entire intent object so that is
   * immutable and cannot be changed later.
   */
  intent: Intent;
  /** mentions is a list of addresses that are mentioned in the intent. */
  mentions: string[];
}
export interface ActionProtoMsg {
  typeUrl: "/warden.intent.Action";
  value: Uint8Array;
}
/** Action wraps a message that needs to be approved by a set of approvers. */
export interface ActionAmino {
  id?: string;
  approvers?: ApproverAmino[];
  status?: ActionStatus;
  /**
   * Original message that started the action, it will be executed when the
   * intent is satisfied.
   */
  msg?: AnyAmino;
  /** Result of the action, it will be set when the action is completed. */
  result?: AnyAmino;
  creator?: string;
  /**
   * BTL (blocks to live) is the block height up until this action can be
   * approved or rejected.
   */
  btl?: string;
  /** created_at is a timestamp specifying when the action was created */
  created_at: string;
  /** updated_at is a timestamp specifying when the action's status was updated */
  updated_at: string;
  /**
   * intent is the intent that this action is associated with. Instead of
   * storing the intent ID, we store the entire intent object so that is
   * immutable and cannot be changed later.
   */
  intent?: IntentAmino;
  /** mentions is a list of addresses that are mentioned in the intent. */
  mentions?: string[];
}
export interface ActionAminoMsg {
  type: "/warden.intent.Action";
  value: ActionAmino;
}
/** Action wraps a message that needs to be approved by a set of approvers. */
export interface ActionSDKType {
  id: Long;
  approvers: ApproverSDKType[];
  status: ActionStatus;
  msg?: AnySDKType;
  result?: AnySDKType;
  creator: string;
  btl: Long;
  created_at: TimestampSDKType;
  updated_at: TimestampSDKType;
  intent: IntentSDKType;
  mentions: string[];
}
/** MsgActionCreated is returned by rpc that creates an action. */
export interface MsgActionCreated {
  action?: Action;
}
export interface MsgActionCreatedProtoMsg {
  typeUrl: "/warden.intent.MsgActionCreated";
  value: Uint8Array;
}
/** MsgActionCreated is returned by rpc that creates an action. */
export interface MsgActionCreatedAmino {
  action?: ActionAmino;
}
export interface MsgActionCreatedAminoMsg {
  type: "/warden.intent.MsgActionCreated";
  value: MsgActionCreatedAmino;
}
/** MsgActionCreated is returned by rpc that creates an action. */
export interface MsgActionCreatedSDKType {
  action?: ActionSDKType;
}
function createBaseApprover(): Approver {
  return {
    address: "",
    approvedAt: Timestamp.fromPartial({})
  };
}
export const Approver = {
  typeUrl: "/warden.intent.Approver",
  encode(message: Approver, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.approvedAt !== undefined) {
      Timestamp.encode(message.approvedAt, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): Approver {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
  toJSON(message: Approver): unknown {
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
      typeUrl: "/warden.intent.Approver",
      value: Approver.encode(message).finish()
    };
  }
};
function createBaseAction(): Action {
  return {
    id: Long.UZERO,
    approvers: [],
    status: 0,
    msg: undefined,
    result: undefined,
    creator: "",
    btl: Long.UZERO,
    createdAt: Timestamp.fromPartial({}),
    updatedAt: Timestamp.fromPartial({}),
    intent: Intent.fromPartial({}),
    mentions: []
  };
}
export const Action = {
  typeUrl: "/warden.intent.Action",
  encode(message: Action, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.id.isZero()) {
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
    if (!message.btl.isZero()) {
      writer.uint32(64).uint64(message.btl);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(message.createdAt, writer.uint32(74).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(message.updatedAt, writer.uint32(82).fork()).ldelim();
    }
    if (message.intent !== undefined) {
      Intent.encode(message.intent, writer.uint32(90).fork()).ldelim();
    }
    for (const v of message.mentions) {
      writer.uint32(98).string(v!);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): Action {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = (reader.uint64() as Long);
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
          message.btl = (reader.uint64() as Long);
          break;
        case 9:
          message.createdAt = Timestamp.decode(reader, reader.uint32());
          break;
        case 10:
          message.updatedAt = Timestamp.decode(reader, reader.uint32());
          break;
        case 11:
          message.intent = Intent.decode(reader, reader.uint32());
          break;
        case 12:
          message.mentions.push(reader.string());
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
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
      approvers: Array.isArray(object?.approvers) ? object.approvers.map((e: any) => Approver.fromJSON(e)) : [],
      status: isSet(object.status) ? actionStatusFromJSON(object.status) : -1,
      msg: isSet(object.msg) ? Any.fromJSON(object.msg) : undefined,
      result: isSet(object.result) ? Any.fromJSON(object.result) : undefined,
      creator: isSet(object.creator) ? String(object.creator) : "",
      btl: isSet(object.btl) ? Long.fromValue(object.btl) : Long.UZERO,
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      updatedAt: isSet(object.updatedAt) ? fromJsonTimestamp(object.updatedAt) : undefined,
      intent: isSet(object.intent) ? Intent.fromJSON(object.intent) : undefined,
      mentions: Array.isArray(object?.mentions) ? object.mentions.map((e: any) => String(e)) : []
    };
  },
  toJSON(message: Action): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString());
    if (message.approvers) {
      obj.approvers = message.approvers.map(e => e ? Approver.toJSON(e) : undefined);
    } else {
      obj.approvers = [];
    }
    message.status !== undefined && (obj.status = actionStatusToJSON(message.status));
    message.msg !== undefined && (obj.msg = message.msg ? Any.toJSON(message.msg) : undefined);
    message.result !== undefined && (obj.result = message.result ? Any.toJSON(message.result) : undefined);
    message.creator !== undefined && (obj.creator = message.creator);
    message.btl !== undefined && (obj.btl = (message.btl || Long.UZERO).toString());
    message.createdAt !== undefined && (obj.createdAt = fromTimestamp(message.createdAt).toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = fromTimestamp(message.updatedAt).toISOString());
    message.intent !== undefined && (obj.intent = message.intent ? Intent.toJSON(message.intent) : undefined);
    if (message.mentions) {
      obj.mentions = message.mentions.map(e => e);
    } else {
      obj.mentions = [];
    }
    return obj;
  },
  fromPartial(object: Partial<Action>): Action {
    const message = createBaseAction();
    message.id = object.id !== undefined && object.id !== null ? Long.fromValue(object.id) : Long.UZERO;
    message.approvers = object.approvers?.map(e => Approver.fromPartial(e)) || [];
    message.status = object.status ?? 0;
    message.msg = object.msg !== undefined && object.msg !== null ? Any.fromPartial(object.msg) : undefined;
    message.result = object.result !== undefined && object.result !== null ? Any.fromPartial(object.result) : undefined;
    message.creator = object.creator ?? "";
    message.btl = object.btl !== undefined && object.btl !== null ? Long.fromValue(object.btl) : Long.UZERO;
    message.createdAt = object.createdAt !== undefined && object.createdAt !== null ? Timestamp.fromPartial(object.createdAt) : undefined;
    message.updatedAt = object.updatedAt !== undefined && object.updatedAt !== null ? Timestamp.fromPartial(object.updatedAt) : undefined;
    message.intent = object.intent !== undefined && object.intent !== null ? Intent.fromPartial(object.intent) : undefined;
    message.mentions = object.mentions?.map(e => e) || [];
    return message;
  },
  fromAmino(object: ActionAmino): Action {
    const message = createBaseAction();
    if (object.id !== undefined && object.id !== null) {
      message.id = Long.fromString(object.id);
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
    if (object.btl !== undefined && object.btl !== null) {
      message.btl = Long.fromString(object.btl);
    }
    if (object.created_at !== undefined && object.created_at !== null) {
      message.createdAt = Timestamp.fromAmino(object.created_at);
    }
    if (object.updated_at !== undefined && object.updated_at !== null) {
      message.updatedAt = Timestamp.fromAmino(object.updated_at);
    }
    if (object.intent !== undefined && object.intent !== null) {
      message.intent = Intent.fromAmino(object.intent);
    }
    message.mentions = object.mentions?.map(e => e) || [];
    return message;
  },
  toAmino(message: Action): ActionAmino {
    const obj: any = {};
    obj.id = !message.id.isZero() ? message.id.toString() : undefined;
    if (message.approvers) {
      obj.approvers = message.approvers.map(e => e ? Approver.toAmino(e) : undefined);
    } else {
      obj.approvers = message.approvers;
    }
    obj.status = message.status === 0 ? undefined : message.status;
    obj.msg = message.msg ? Any.toAmino(message.msg) : undefined;
    obj.result = message.result ? Any.toAmino(message.result) : undefined;
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.btl = !message.btl.isZero() ? message.btl.toString() : undefined;
    obj.created_at = message.createdAt ? Timestamp.toAmino(message.createdAt) : Timestamp.toAmino(Timestamp.fromPartial({}));
    obj.updated_at = message.updatedAt ? Timestamp.toAmino(message.updatedAt) : Timestamp.toAmino(Timestamp.fromPartial({}));
    obj.intent = message.intent ? Intent.toAmino(message.intent) : undefined;
    if (message.mentions) {
      obj.mentions = message.mentions.map(e => e);
    } else {
      obj.mentions = message.mentions;
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
      typeUrl: "/warden.intent.Action",
      value: Action.encode(message).finish()
    };
  }
};
function createBaseMsgActionCreated(): MsgActionCreated {
  return {
    action: undefined
  };
}
export const MsgActionCreated = {
  typeUrl: "/warden.intent.MsgActionCreated",
  encode(message: MsgActionCreated, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.action !== undefined) {
      Action.encode(message.action, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgActionCreated {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgActionCreated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.action = Action.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgActionCreated {
    return {
      action: isSet(object.action) ? Action.fromJSON(object.action) : undefined
    };
  },
  toJSON(message: MsgActionCreated): unknown {
    const obj: any = {};
    message.action !== undefined && (obj.action = message.action ? Action.toJSON(message.action) : undefined);
    return obj;
  },
  fromPartial(object: Partial<MsgActionCreated>): MsgActionCreated {
    const message = createBaseMsgActionCreated();
    message.action = object.action !== undefined && object.action !== null ? Action.fromPartial(object.action) : undefined;
    return message;
  },
  fromAmino(object: MsgActionCreatedAmino): MsgActionCreated {
    const message = createBaseMsgActionCreated();
    if (object.action !== undefined && object.action !== null) {
      message.action = Action.fromAmino(object.action);
    }
    return message;
  },
  toAmino(message: MsgActionCreated): MsgActionCreatedAmino {
    const obj: any = {};
    obj.action = message.action ? Action.toAmino(message.action) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgActionCreatedAminoMsg): MsgActionCreated {
    return MsgActionCreated.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgActionCreatedProtoMsg): MsgActionCreated {
    return MsgActionCreated.decode(message.value);
  },
  toProto(message: MsgActionCreated): Uint8Array {
    return MsgActionCreated.encode(message).finish();
  },
  toProtoMsg(message: MsgActionCreated): MsgActionCreatedProtoMsg {
    return {
      typeUrl: "/warden.intent.MsgActionCreated",
      value: MsgActionCreated.encode(message).finish()
    };
  }
};