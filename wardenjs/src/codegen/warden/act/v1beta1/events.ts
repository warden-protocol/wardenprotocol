//@ts-nocheck
import { ActionVoteType, actionVoteTypeFromJSON, actionVoteTypeToJSON } from "./action_vote.js";
import { ActionStatus, actionStatusFromJSON, actionStatusToJSON } from "./action.js";
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet } from "../../../helpers.js";
import { JsonSafe } from "../../../json-safe.js";
/** EventCreateTemplate is emitted on Template creation */
export interface EventCreateTemplate {
  /** id of the new intent */
  id: bigint;
  /** creator is the address that created the intent */
  creator: string;
}
export interface EventCreateTemplateProtoMsg {
  typeUrl: "/warden.act.v1beta1.EventCreateTemplate";
  value: Uint8Array;
}
/** EventCreateTemplate is emitted on Template creation */
export interface EventCreateTemplateAmino {
  /** id of the new intent */
  id?: string;
  /** creator is the address that created the intent */
  creator?: string;
}
export interface EventCreateTemplateAminoMsg {
  type: "/warden.act.v1beta1.EventCreateTemplate";
  value: EventCreateTemplateAmino;
}
/** EventCreateTemplate is emitted on Template creation */
export interface EventCreateTemplateSDKType {
  id: bigint;
  creator: string;
}
/** EventUpdateTemplate is emitted when Template is updated */
export interface EventUpdateTemplate {
  /** id of updated intent */
  id: bigint;
}
export interface EventUpdateTemplateProtoMsg {
  typeUrl: "/warden.act.v1beta1.EventUpdateTemplate";
  value: Uint8Array;
}
/** EventUpdateTemplate is emitted when Template is updated */
export interface EventUpdateTemplateAmino {
  /** id of updated intent */
  id?: string;
}
export interface EventUpdateTemplateAminoMsg {
  type: "/warden.act.v1beta1.EventUpdateTemplate";
  value: EventUpdateTemplateAmino;
}
/** EventUpdateTemplate is emitted when Template is updated */
export interface EventUpdateTemplateSDKType {
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
/** EventActionVoted is emitted when an Action is voted on */
export interface EventActionVoted {
  /** id of action */
  id: bigint;
  /** address of the account that participated in voting */
  participant: string;
  /** type of the vote */
  voteType: ActionVoteType;
}
export interface EventActionVotedProtoMsg {
  typeUrl: "/warden.act.v1beta1.EventActionVoted";
  value: Uint8Array;
}
/** EventActionVoted is emitted when an Action is voted on */
export interface EventActionVotedAmino {
  /** id of action */
  id?: string;
  /** address of the account that participated in voting */
  participant?: string;
  /** type of the vote */
  vote_type?: ActionVoteType;
}
export interface EventActionVotedAminoMsg {
  type: "/warden.act.v1beta1.EventActionVoted";
  value: EventActionVotedAmino;
}
/** EventActionVoted is emitted when an Action is voted on */
export interface EventActionVotedSDKType {
  id: bigint;
  participant: string;
  vote_type: ActionVoteType;
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
/**
 * EventActionPruned is emitted when an Action is pruned in `Completed`, `Revoked`, `Pending` or `Timeout`
 * states and won't be processed further
 */
export interface EventActionPruned {
  /** id of action */
  id: bigint;
}
export interface EventActionPrunedProtoMsg {
  typeUrl: "/warden.act.v1beta1.EventActionPruned";
  value: Uint8Array;
}
/**
 * EventActionPruned is emitted when an Action is pruned in `Completed`, `Revoked`, `Pending` or `Timeout`
 * states and won't be processed further
 */
export interface EventActionPrunedAmino {
  /** id of action */
  id?: string;
}
export interface EventActionPrunedAminoMsg {
  type: "/warden.act.v1beta1.EventActionPruned";
  value: EventActionPrunedAmino;
}
/**
 * EventActionPruned is emitted when an Action is pruned in `Completed`, `Revoked`, `Pending` or `Timeout`
 * states and won't be processed further
 */
export interface EventActionPrunedSDKType {
  id: bigint;
}
function createBaseEventCreateTemplate(): EventCreateTemplate {
  return {
    id: BigInt(0),
    creator: ""
  };
}
export const EventCreateTemplate = {
  typeUrl: "/warden.act.v1beta1.EventCreateTemplate",
  encode(message: EventCreateTemplate, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventCreateTemplate {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventCreateTemplate();
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
  fromJSON(object: any): EventCreateTemplate {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      creator: isSet(object.creator) ? String(object.creator) : ""
    };
  },
  toJSON(message: EventCreateTemplate): JsonSafe<EventCreateTemplate> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.creator !== undefined && (obj.creator = message.creator);
    return obj;
  },
  fromPartial(object: Partial<EventCreateTemplate>): EventCreateTemplate {
    const message = createBaseEventCreateTemplate();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.creator = object.creator ?? "";
    return message;
  },
  fromAmino(object: EventCreateTemplateAmino): EventCreateTemplate {
    const message = createBaseEventCreateTemplate();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    return message;
  },
  toAmino(message: EventCreateTemplate): EventCreateTemplateAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? (message.id?.toString)() : undefined;
    obj.creator = message.creator === "" ? undefined : message.creator;
    return obj;
  },
  fromAminoMsg(object: EventCreateTemplateAminoMsg): EventCreateTemplate {
    return EventCreateTemplate.fromAmino(object.value);
  },
  fromProtoMsg(message: EventCreateTemplateProtoMsg): EventCreateTemplate {
    return EventCreateTemplate.decode(message.value);
  },
  toProto(message: EventCreateTemplate): Uint8Array {
    return EventCreateTemplate.encode(message).finish();
  },
  toProtoMsg(message: EventCreateTemplate): EventCreateTemplateProtoMsg {
    return {
      typeUrl: "/warden.act.v1beta1.EventCreateTemplate",
      value: EventCreateTemplate.encode(message).finish()
    };
  }
};
function createBaseEventUpdateTemplate(): EventUpdateTemplate {
  return {
    id: BigInt(0)
  };
}
export const EventUpdateTemplate = {
  typeUrl: "/warden.act.v1beta1.EventUpdateTemplate",
  encode(message: EventUpdateTemplate, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventUpdateTemplate {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventUpdateTemplate();
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
  fromJSON(object: any): EventUpdateTemplate {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0)
    };
  },
  toJSON(message: EventUpdateTemplate): JsonSafe<EventUpdateTemplate> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<EventUpdateTemplate>): EventUpdateTemplate {
    const message = createBaseEventUpdateTemplate();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: EventUpdateTemplateAmino): EventUpdateTemplate {
    const message = createBaseEventUpdateTemplate();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: EventUpdateTemplate): EventUpdateTemplateAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? (message.id?.toString)() : undefined;
    return obj;
  },
  fromAminoMsg(object: EventUpdateTemplateAminoMsg): EventUpdateTemplate {
    return EventUpdateTemplate.fromAmino(object.value);
  },
  fromProtoMsg(message: EventUpdateTemplateProtoMsg): EventUpdateTemplate {
    return EventUpdateTemplate.decode(message.value);
  },
  toProto(message: EventUpdateTemplate): Uint8Array {
    return EventUpdateTemplate.encode(message).finish();
  },
  toProtoMsg(message: EventUpdateTemplate): EventUpdateTemplateProtoMsg {
    return {
      typeUrl: "/warden.act.v1beta1.EventUpdateTemplate",
      value: EventUpdateTemplate.encode(message).finish()
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
    obj.id = message.id !== BigInt(0) ? (message.id?.toString)() : undefined;
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
function createBaseEventActionVoted(): EventActionVoted {
  return {
    id: BigInt(0),
    participant: "",
    voteType: 0
  };
}
export const EventActionVoted = {
  typeUrl: "/warden.act.v1beta1.EventActionVoted",
  encode(message: EventActionVoted, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.participant !== "") {
      writer.uint32(18).string(message.participant);
    }
    if (message.voteType !== 0) {
      writer.uint32(24).int32(message.voteType);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventActionVoted {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventActionVoted();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.participant = reader.string();
          break;
        case 3:
          message.voteType = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EventActionVoted {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      participant: isSet(object.participant) ? String(object.participant) : "",
      voteType: isSet(object.voteType) ? actionVoteTypeFromJSON(object.voteType) : -1
    };
  },
  toJSON(message: EventActionVoted): JsonSafe<EventActionVoted> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.participant !== undefined && (obj.participant = message.participant);
    message.voteType !== undefined && (obj.voteType = actionVoteTypeToJSON(message.voteType));
    return obj;
  },
  fromPartial(object: Partial<EventActionVoted>): EventActionVoted {
    const message = createBaseEventActionVoted();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.participant = object.participant ?? "";
    message.voteType = object.voteType ?? 0;
    return message;
  },
  fromAmino(object: EventActionVotedAmino): EventActionVoted {
    const message = createBaseEventActionVoted();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.participant !== undefined && object.participant !== null) {
      message.participant = object.participant;
    }
    if (object.vote_type !== undefined && object.vote_type !== null) {
      message.voteType = object.vote_type;
    }
    return message;
  },
  toAmino(message: EventActionVoted): EventActionVotedAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? (message.id?.toString)() : undefined;
    obj.participant = message.participant === "" ? undefined : message.participant;
    obj.vote_type = message.voteType === 0 ? undefined : message.voteType;
    return obj;
  },
  fromAminoMsg(object: EventActionVotedAminoMsg): EventActionVoted {
    return EventActionVoted.fromAmino(object.value);
  },
  fromProtoMsg(message: EventActionVotedProtoMsg): EventActionVoted {
    return EventActionVoted.decode(message.value);
  },
  toProto(message: EventActionVoted): Uint8Array {
    return EventActionVoted.encode(message).finish();
  },
  toProtoMsg(message: EventActionVoted): EventActionVotedProtoMsg {
    return {
      typeUrl: "/warden.act.v1beta1.EventActionVoted",
      value: EventActionVoted.encode(message).finish()
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
          message.previousStatus = reader.int32() as any;
          break;
        case 3:
          message.newStatus = reader.int32() as any;
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
    obj.id = message.id !== BigInt(0) ? (message.id?.toString)() : undefined;
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
function createBaseEventActionPruned(): EventActionPruned {
  return {
    id: BigInt(0)
  };
}
export const EventActionPruned = {
  typeUrl: "/warden.act.v1beta1.EventActionPruned",
  encode(message: EventActionPruned, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventActionPruned {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventActionPruned();
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
  fromJSON(object: any): EventActionPruned {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0)
    };
  },
  toJSON(message: EventActionPruned): JsonSafe<EventActionPruned> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<EventActionPruned>): EventActionPruned {
    const message = createBaseEventActionPruned();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: EventActionPrunedAmino): EventActionPruned {
    const message = createBaseEventActionPruned();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: EventActionPruned): EventActionPrunedAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? (message.id?.toString)() : undefined;
    return obj;
  },
  fromAminoMsg(object: EventActionPrunedAminoMsg): EventActionPruned {
    return EventActionPruned.fromAmino(object.value);
  },
  fromProtoMsg(message: EventActionPrunedProtoMsg): EventActionPruned {
    return EventActionPruned.decode(message.value);
  },
  toProto(message: EventActionPruned): Uint8Array {
    return EventActionPruned.encode(message).finish();
  },
  toProtoMsg(message: EventActionPruned): EventActionPrunedProtoMsg {
    return {
      typeUrl: "/warden.act.v1beta1.EventActionPruned",
      value: EventActionPruned.encode(message).finish()
    };
  }
};