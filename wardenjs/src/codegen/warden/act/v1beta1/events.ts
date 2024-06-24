//@ts-nocheck
import { ActionStatus, actionStatusFromJSON, actionStatusToJSON } from "./action.js";
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet } from "../../../helpers.js";
import { JsonSafe } from "../../../json-safe.js";
/** EventCreateRule is emitted on Rule creation */
export interface EventCreateRule {
  /** id of the new intent */
  id: bigint;
  /** creator is the address that created the intent */
  creator: string;
}
export interface EventCreateRuleProtoMsg {
  typeUrl: "/warden.act.v1beta1.EventCreateRule";
  value: Uint8Array;
}
/** EventCreateRule is emitted on Rule creation */
export interface EventCreateRuleAmino {
  /** id of the new intent */
  id?: string;
  /** creator is the address that created the intent */
  creator?: string;
}
export interface EventCreateRuleAminoMsg {
  type: "/warden.act.v1beta1.EventCreateRule";
  value: EventCreateRuleAmino;
}
/** EventCreateRule is emitted on Rule creation */
export interface EventCreateRuleSDKType {
  id: bigint;
  creator: string;
}
/** EventUpdateRule is emitted when Rule is updated */
export interface EventUpdateRule {
  /** id of updated intent */
  id: bigint;
}
export interface EventUpdateRuleProtoMsg {
  typeUrl: "/warden.act.v1beta1.EventUpdateRule";
  value: Uint8Array;
}
/** EventUpdateRule is emitted when Rule is updated */
export interface EventUpdateRuleAmino {
  /** id of updated intent */
  id?: string;
}
export interface EventUpdateRuleAminoMsg {
  type: "/warden.act.v1beta1.EventUpdateRule";
  value: EventUpdateRuleAmino;
}
/** EventUpdateRule is emitted when Rule is updated */
export interface EventUpdateRuleSDKType {
  id: bigint;
}
/** EventCreateAction is emitted when an Action is created */
export interface EventCreateAction {
  /** id of the new action */
  id: bigint;
  /** creator is the address that created the action */
  creator: string;
}
export interface EventCreateActionProtoMsg {
  typeUrl: "/warden.act.v1beta1.EventCreateAction";
  value: Uint8Array;
}
/** EventCreateAction is emitted when an Action is created */
export interface EventCreateActionAmino {
  /** id of the new action */
  id?: string;
  /** creator is the address that created the action */
  creator?: string;
}
export interface EventCreateActionAminoMsg {
  type: "/warden.act.v1beta1.EventCreateAction";
  value: EventCreateActionAmino;
}
/** EventCreateAction is emitted when an Action is created */
export interface EventCreateActionSDKType {
  id: bigint;
  creator: string;
}
/** EventApproveAction is emitted when an Action is approved */
export interface EventApproveAction {
  /** id of action */
  id: bigint;
  /** address of the account that approved the action */
  approver: string;
}
export interface EventApproveActionProtoMsg {
  typeUrl: "/warden.act.v1beta1.EventApproveAction";
  value: Uint8Array;
}
/** EventApproveAction is emitted when an Action is approved */
export interface EventApproveActionAmino {
  /** id of action */
  id?: string;
  /** address of the account that approved the action */
  approver?: string;
}
export interface EventApproveActionAminoMsg {
  type: "/warden.act.v1beta1.EventApproveAction";
  value: EventApproveActionAmino;
}
/** EventApproveAction is emitted when an Action is approved */
export interface EventApproveActionSDKType {
  id: bigint;
  approver: string;
}
/** EventActionStateChange is emitted when an Action is in a new state */
export interface EventActionStateChange {
  /** id of action */
  id: bigint;
  /** previous_status is the previous status of the action */
  previousStatus: ActionStatus;
  /** new_status is the new status of the action */
  newStatus: ActionStatus;
}
export interface EventActionStateChangeProtoMsg {
  typeUrl: "/warden.act.v1beta1.EventActionStateChange";
  value: Uint8Array;
}
/** EventActionStateChange is emitted when an Action is in a new state */
export interface EventActionStateChangeAmino {
  /** id of action */
  id?: string;
  /** previous_status is the previous status of the action */
  previous_status?: ActionStatus;
  /** new_status is the new status of the action */
  new_status?: ActionStatus;
}
export interface EventActionStateChangeAminoMsg {
  type: "/warden.act.v1beta1.EventActionStateChange";
  value: EventActionStateChangeAmino;
}
/** EventActionStateChange is emitted when an Action is in a new state */
export interface EventActionStateChangeSDKType {
  id: bigint;
  previous_status: ActionStatus;
  new_status: ActionStatus;
}
function createBaseEventCreateRule(): EventCreateRule {
  return {
    id: BigInt(0),
    creator: ""
  };
}
export const EventCreateRule = {
  typeUrl: "/warden.act.v1beta1.EventCreateRule",
  encode(message: EventCreateRule, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventCreateRule {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventCreateRule();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
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
  fromJSON(object: any): EventCreateRule {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      creator: isSet(object.creator) ? String(object.creator) : ""
    };
  },
  toJSON(message: EventCreateRule): JsonSafe<EventCreateRule> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.creator !== undefined && (obj.creator = message.creator);
    return obj;
  },
  fromPartial(object: Partial<EventCreateRule>): EventCreateRule {
    const message = createBaseEventCreateRule();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.creator = object.creator ?? "";
    return message;
  },
  fromAmino(object: EventCreateRuleAmino): EventCreateRule {
    const message = createBaseEventCreateRule();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    return message;
  },
  toAmino(message: EventCreateRule): EventCreateRuleAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.creator = message.creator === "" ? undefined : message.creator;
    return obj;
  },
  fromAminoMsg(object: EventCreateRuleAminoMsg): EventCreateRule {
    return EventCreateRule.fromAmino(object.value);
  },
  fromProtoMsg(message: EventCreateRuleProtoMsg): EventCreateRule {
    return EventCreateRule.decode(message.value);
  },
  toProto(message: EventCreateRule): Uint8Array {
    return EventCreateRule.encode(message).finish();
  },
  toProtoMsg(message: EventCreateRule): EventCreateRuleProtoMsg {
    return {
      typeUrl: "/warden.act.v1beta1.EventCreateRule",
      value: EventCreateRule.encode(message).finish()
    };
  }
};
function createBaseEventUpdateRule(): EventUpdateRule {
  return {
    id: BigInt(0)
  };
}
export const EventUpdateRule = {
  typeUrl: "/warden.act.v1beta1.EventUpdateRule",
  encode(message: EventUpdateRule, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventUpdateRule {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventUpdateRule();
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
  fromJSON(object: any): EventUpdateRule {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0)
    };
  },
  toJSON(message: EventUpdateRule): JsonSafe<EventUpdateRule> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<EventUpdateRule>): EventUpdateRule {
    const message = createBaseEventUpdateRule();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: EventUpdateRuleAmino): EventUpdateRule {
    const message = createBaseEventUpdateRule();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: EventUpdateRule): EventUpdateRuleAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: EventUpdateRuleAminoMsg): EventUpdateRule {
    return EventUpdateRule.fromAmino(object.value);
  },
  fromProtoMsg(message: EventUpdateRuleProtoMsg): EventUpdateRule {
    return EventUpdateRule.decode(message.value);
  },
  toProto(message: EventUpdateRule): Uint8Array {
    return EventUpdateRule.encode(message).finish();
  },
  toProtoMsg(message: EventUpdateRule): EventUpdateRuleProtoMsg {
    return {
      typeUrl: "/warden.act.v1beta1.EventUpdateRule",
      value: EventUpdateRule.encode(message).finish()
    };
  }
};
function createBaseEventCreateAction(): EventCreateAction {
  return {
    id: BigInt(0),
    creator: ""
  };
}
export const EventCreateAction = {
  typeUrl: "/warden.act.v1beta1.EventCreateAction",
  encode(message: EventCreateAction, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventCreateAction {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventCreateAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
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
  fromJSON(object: any): EventCreateAction {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      creator: isSet(object.creator) ? String(object.creator) : ""
    };
  },
  toJSON(message: EventCreateAction): JsonSafe<EventCreateAction> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.creator !== undefined && (obj.creator = message.creator);
    return obj;
  },
  fromPartial(object: Partial<EventCreateAction>): EventCreateAction {
    const message = createBaseEventCreateAction();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.creator = object.creator ?? "";
    return message;
  },
  fromAmino(object: EventCreateActionAmino): EventCreateAction {
    const message = createBaseEventCreateAction();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    return message;
  },
  toAmino(message: EventCreateAction): EventCreateActionAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.creator = message.creator === "" ? undefined : message.creator;
    return obj;
  },
  fromAminoMsg(object: EventCreateActionAminoMsg): EventCreateAction {
    return EventCreateAction.fromAmino(object.value);
  },
  fromProtoMsg(message: EventCreateActionProtoMsg): EventCreateAction {
    return EventCreateAction.decode(message.value);
  },
  toProto(message: EventCreateAction): Uint8Array {
    return EventCreateAction.encode(message).finish();
  },
  toProtoMsg(message: EventCreateAction): EventCreateActionProtoMsg {
    return {
      typeUrl: "/warden.act.v1beta1.EventCreateAction",
      value: EventCreateAction.encode(message).finish()
    };
  }
};
function createBaseEventApproveAction(): EventApproveAction {
  return {
    id: BigInt(0),
    approver: ""
  };
}
export const EventApproveAction = {
  typeUrl: "/warden.act.v1beta1.EventApproveAction",
  encode(message: EventApproveAction, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.approver !== "") {
      writer.uint32(18).string(message.approver);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventApproveAction {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventApproveAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.approver = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EventApproveAction {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      approver: isSet(object.approver) ? String(object.approver) : ""
    };
  },
  toJSON(message: EventApproveAction): JsonSafe<EventApproveAction> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.approver !== undefined && (obj.approver = message.approver);
    return obj;
  },
  fromPartial(object: Partial<EventApproveAction>): EventApproveAction {
    const message = createBaseEventApproveAction();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.approver = object.approver ?? "";
    return message;
  },
  fromAmino(object: EventApproveActionAmino): EventApproveAction {
    const message = createBaseEventApproveAction();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.approver !== undefined && object.approver !== null) {
      message.approver = object.approver;
    }
    return message;
  },
  toAmino(message: EventApproveAction): EventApproveActionAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.approver = message.approver === "" ? undefined : message.approver;
    return obj;
  },
  fromAminoMsg(object: EventApproveActionAminoMsg): EventApproveAction {
    return EventApproveAction.fromAmino(object.value);
  },
  fromProtoMsg(message: EventApproveActionProtoMsg): EventApproveAction {
    return EventApproveAction.decode(message.value);
  },
  toProto(message: EventApproveAction): Uint8Array {
    return EventApproveAction.encode(message).finish();
  },
  toProtoMsg(message: EventApproveAction): EventApproveActionProtoMsg {
    return {
      typeUrl: "/warden.act.v1beta1.EventApproveAction",
      value: EventApproveAction.encode(message).finish()
    };
  }
};
function createBaseEventActionStateChange(): EventActionStateChange {
  return {
    id: BigInt(0),
    previousStatus: 0,
    newStatus: 0
  };
}
export const EventActionStateChange = {
  typeUrl: "/warden.act.v1beta1.EventActionStateChange",
  encode(message: EventActionStateChange, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.previousStatus !== 0) {
      writer.uint32(16).int32(message.previousStatus);
    }
    if (message.newStatus !== 0) {
      writer.uint32(24).int32(message.newStatus);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventActionStateChange {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventActionStateChange();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.previousStatus = (reader.int32() as any);
          break;
        case 3:
          message.newStatus = (reader.int32() as any);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EventActionStateChange {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      previousStatus: isSet(object.previousStatus) ? actionStatusFromJSON(object.previousStatus) : -1,
      newStatus: isSet(object.newStatus) ? actionStatusFromJSON(object.newStatus) : -1
    };
  },
  toJSON(message: EventActionStateChange): JsonSafe<EventActionStateChange> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.previousStatus !== undefined && (obj.previousStatus = actionStatusToJSON(message.previousStatus));
    message.newStatus !== undefined && (obj.newStatus = actionStatusToJSON(message.newStatus));
    return obj;
  },
  fromPartial(object: Partial<EventActionStateChange>): EventActionStateChange {
    const message = createBaseEventActionStateChange();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.previousStatus = object.previousStatus ?? 0;
    message.newStatus = object.newStatus ?? 0;
    return message;
  },
  fromAmino(object: EventActionStateChangeAmino): EventActionStateChange {
    const message = createBaseEventActionStateChange();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.previous_status !== undefined && object.previous_status !== null) {
      message.previousStatus = object.previous_status;
    }
    if (object.new_status !== undefined && object.new_status !== null) {
      message.newStatus = object.new_status;
    }
    return message;
  },
  toAmino(message: EventActionStateChange): EventActionStateChangeAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.previous_status = message.previousStatus === 0 ? undefined : message.previousStatus;
    obj.new_status = message.newStatus === 0 ? undefined : message.newStatus;
    return obj;
  },
  fromAminoMsg(object: EventActionStateChangeAminoMsg): EventActionStateChange {
    return EventActionStateChange.fromAmino(object.value);
  },
  fromProtoMsg(message: EventActionStateChangeProtoMsg): EventActionStateChange {
    return EventActionStateChange.decode(message.value);
  },
  toProto(message: EventActionStateChange): Uint8Array {
    return EventActionStateChange.encode(message).finish();
  },
  toProtoMsg(message: EventActionStateChange): EventActionStateChangeProtoMsg {
    return {
      typeUrl: "/warden.act.v1beta1.EventActionStateChange",
      value: EventActionStateChange.encode(message).finish()
    };
  }
};