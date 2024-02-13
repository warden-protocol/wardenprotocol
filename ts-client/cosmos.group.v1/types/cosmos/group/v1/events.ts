/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import {
  ProposalExecutorResult,
  proposalExecutorResultFromJSON,
  proposalExecutorResultToJSON,
  ProposalStatus,
  proposalStatusFromJSON,
  proposalStatusToJSON,
  TallyResult,
} from "./types";

export const protobufPackage = "cosmos.group.v1";

/** Since: cosmos-sdk 0.46 */

/** EventCreateGroup is an event emitted when a group is created. */
export interface EventCreateGroup {
  /** group_id is the unique ID of the group. */
  groupId: number;
}

/** EventUpdateGroup is an event emitted when a group is updated. */
export interface EventUpdateGroup {
  /** group_id is the unique ID of the group. */
  groupId: number;
}

/** EventCreateGroupPolicy is an event emitted when a group policy is created. */
export interface EventCreateGroupPolicy {
  /** address is the account address of the group policy. */
  address: string;
}

/** EventUpdateGroupPolicy is an event emitted when a group policy is updated. */
export interface EventUpdateGroupPolicy {
  /** address is the account address of the group policy. */
  address: string;
}

/** EventSubmitProposal is an event emitted when a proposal is created. */
export interface EventSubmitProposal {
  /** proposal_id is the unique ID of the proposal. */
  proposalId: number;
}

/** EventWithdrawProposal is an event emitted when a proposal is withdrawn. */
export interface EventWithdrawProposal {
  /** proposal_id is the unique ID of the proposal. */
  proposalId: number;
}

/** EventVote is an event emitted when a voter votes on a proposal. */
export interface EventVote {
  /** proposal_id is the unique ID of the proposal. */
  proposalId: number;
}

/** EventExec is an event emitted when a proposal is executed. */
export interface EventExec {
  /** proposal_id is the unique ID of the proposal. */
  proposalId: number;
  /** result is the proposal execution result. */
  result: ProposalExecutorResult;
  /** logs contains error logs in case the execution result is FAILURE. */
  logs: string;
}

/** EventLeaveGroup is an event emitted when group member leaves the group. */
export interface EventLeaveGroup {
  /** group_id is the unique ID of the group. */
  groupId: number;
  /** address is the account address of the group member. */
  address: string;
}

/** EventProposalPruned is an event emitted when a proposal is pruned. */
export interface EventProposalPruned {
  /** proposal_id is the unique ID of the proposal. */
  proposalId: number;
  /** status is the proposal status (UNSPECIFIED, SUBMITTED, ACCEPTED, REJECTED, ABORTED, WITHDRAWN). */
  status: ProposalStatus;
  /** tally_result is the proposal tally result (when applicable). */
  tallyResult: TallyResult | undefined;
}

function createBaseEventCreateGroup(): EventCreateGroup {
  return { groupId: 0 };
}

export const EventCreateGroup = {
  encode(message: EventCreateGroup, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.groupId !== 0) {
      writer.uint32(8).uint64(message.groupId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventCreateGroup {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventCreateGroup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.groupId = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EventCreateGroup {
    return { groupId: isSet(object.groupId) ? Number(object.groupId) : 0 };
  },

  toJSON(message: EventCreateGroup): unknown {
    const obj: any = {};
    if (message.groupId !== 0) {
      obj.groupId = Math.round(message.groupId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EventCreateGroup>, I>>(base?: I): EventCreateGroup {
    return EventCreateGroup.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EventCreateGroup>, I>>(object: I): EventCreateGroup {
    const message = createBaseEventCreateGroup();
    message.groupId = object.groupId ?? 0;
    return message;
  },
};

function createBaseEventUpdateGroup(): EventUpdateGroup {
  return { groupId: 0 };
}

export const EventUpdateGroup = {
  encode(message: EventUpdateGroup, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.groupId !== 0) {
      writer.uint32(8).uint64(message.groupId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventUpdateGroup {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventUpdateGroup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.groupId = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EventUpdateGroup {
    return { groupId: isSet(object.groupId) ? Number(object.groupId) : 0 };
  },

  toJSON(message: EventUpdateGroup): unknown {
    const obj: any = {};
    if (message.groupId !== 0) {
      obj.groupId = Math.round(message.groupId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EventUpdateGroup>, I>>(base?: I): EventUpdateGroup {
    return EventUpdateGroup.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EventUpdateGroup>, I>>(object: I): EventUpdateGroup {
    const message = createBaseEventUpdateGroup();
    message.groupId = object.groupId ?? 0;
    return message;
  },
};

function createBaseEventCreateGroupPolicy(): EventCreateGroupPolicy {
  return { address: "" };
}

export const EventCreateGroupPolicy = {
  encode(message: EventCreateGroupPolicy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventCreateGroupPolicy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventCreateGroupPolicy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.address = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EventCreateGroupPolicy {
    return { address: isSet(object.address) ? String(object.address) : "" };
  },

  toJSON(message: EventCreateGroupPolicy): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EventCreateGroupPolicy>, I>>(base?: I): EventCreateGroupPolicy {
    return EventCreateGroupPolicy.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EventCreateGroupPolicy>, I>>(object: I): EventCreateGroupPolicy {
    const message = createBaseEventCreateGroupPolicy();
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseEventUpdateGroupPolicy(): EventUpdateGroupPolicy {
  return { address: "" };
}

export const EventUpdateGroupPolicy = {
  encode(message: EventUpdateGroupPolicy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventUpdateGroupPolicy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventUpdateGroupPolicy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.address = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EventUpdateGroupPolicy {
    return { address: isSet(object.address) ? String(object.address) : "" };
  },

  toJSON(message: EventUpdateGroupPolicy): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EventUpdateGroupPolicy>, I>>(base?: I): EventUpdateGroupPolicy {
    return EventUpdateGroupPolicy.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EventUpdateGroupPolicy>, I>>(object: I): EventUpdateGroupPolicy {
    const message = createBaseEventUpdateGroupPolicy();
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseEventSubmitProposal(): EventSubmitProposal {
  return { proposalId: 0 };
}

export const EventSubmitProposal = {
  encode(message: EventSubmitProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.proposalId !== 0) {
      writer.uint32(8).uint64(message.proposalId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventSubmitProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSubmitProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.proposalId = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EventSubmitProposal {
    return { proposalId: isSet(object.proposalId) ? Number(object.proposalId) : 0 };
  },

  toJSON(message: EventSubmitProposal): unknown {
    const obj: any = {};
    if (message.proposalId !== 0) {
      obj.proposalId = Math.round(message.proposalId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EventSubmitProposal>, I>>(base?: I): EventSubmitProposal {
    return EventSubmitProposal.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EventSubmitProposal>, I>>(object: I): EventSubmitProposal {
    const message = createBaseEventSubmitProposal();
    message.proposalId = object.proposalId ?? 0;
    return message;
  },
};

function createBaseEventWithdrawProposal(): EventWithdrawProposal {
  return { proposalId: 0 };
}

export const EventWithdrawProposal = {
  encode(message: EventWithdrawProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.proposalId !== 0) {
      writer.uint32(8).uint64(message.proposalId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventWithdrawProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventWithdrawProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.proposalId = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EventWithdrawProposal {
    return { proposalId: isSet(object.proposalId) ? Number(object.proposalId) : 0 };
  },

  toJSON(message: EventWithdrawProposal): unknown {
    const obj: any = {};
    if (message.proposalId !== 0) {
      obj.proposalId = Math.round(message.proposalId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EventWithdrawProposal>, I>>(base?: I): EventWithdrawProposal {
    return EventWithdrawProposal.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EventWithdrawProposal>, I>>(object: I): EventWithdrawProposal {
    const message = createBaseEventWithdrawProposal();
    message.proposalId = object.proposalId ?? 0;
    return message;
  },
};

function createBaseEventVote(): EventVote {
  return { proposalId: 0 };
}

export const EventVote = {
  encode(message: EventVote, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.proposalId !== 0) {
      writer.uint32(8).uint64(message.proposalId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventVote {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventVote();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.proposalId = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EventVote {
    return { proposalId: isSet(object.proposalId) ? Number(object.proposalId) : 0 };
  },

  toJSON(message: EventVote): unknown {
    const obj: any = {};
    if (message.proposalId !== 0) {
      obj.proposalId = Math.round(message.proposalId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EventVote>, I>>(base?: I): EventVote {
    return EventVote.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EventVote>, I>>(object: I): EventVote {
    const message = createBaseEventVote();
    message.proposalId = object.proposalId ?? 0;
    return message;
  },
};

function createBaseEventExec(): EventExec {
  return { proposalId: 0, result: 0, logs: "" };
}

export const EventExec = {
  encode(message: EventExec, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.proposalId !== 0) {
      writer.uint32(8).uint64(message.proposalId);
    }
    if (message.result !== 0) {
      writer.uint32(16).int32(message.result);
    }
    if (message.logs !== "") {
      writer.uint32(26).string(message.logs);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventExec {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventExec();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.proposalId = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.result = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.logs = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EventExec {
    return {
      proposalId: isSet(object.proposalId) ? Number(object.proposalId) : 0,
      result: isSet(object.result) ? proposalExecutorResultFromJSON(object.result) : 0,
      logs: isSet(object.logs) ? String(object.logs) : "",
    };
  },

  toJSON(message: EventExec): unknown {
    const obj: any = {};
    if (message.proposalId !== 0) {
      obj.proposalId = Math.round(message.proposalId);
    }
    if (message.result !== 0) {
      obj.result = proposalExecutorResultToJSON(message.result);
    }
    if (message.logs !== "") {
      obj.logs = message.logs;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EventExec>, I>>(base?: I): EventExec {
    return EventExec.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EventExec>, I>>(object: I): EventExec {
    const message = createBaseEventExec();
    message.proposalId = object.proposalId ?? 0;
    message.result = object.result ?? 0;
    message.logs = object.logs ?? "";
    return message;
  },
};

function createBaseEventLeaveGroup(): EventLeaveGroup {
  return { groupId: 0, address: "" };
}

export const EventLeaveGroup = {
  encode(message: EventLeaveGroup, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.groupId !== 0) {
      writer.uint32(8).uint64(message.groupId);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventLeaveGroup {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventLeaveGroup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.groupId = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.address = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EventLeaveGroup {
    return {
      groupId: isSet(object.groupId) ? Number(object.groupId) : 0,
      address: isSet(object.address) ? String(object.address) : "",
    };
  },

  toJSON(message: EventLeaveGroup): unknown {
    const obj: any = {};
    if (message.groupId !== 0) {
      obj.groupId = Math.round(message.groupId);
    }
    if (message.address !== "") {
      obj.address = message.address;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EventLeaveGroup>, I>>(base?: I): EventLeaveGroup {
    return EventLeaveGroup.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EventLeaveGroup>, I>>(object: I): EventLeaveGroup {
    const message = createBaseEventLeaveGroup();
    message.groupId = object.groupId ?? 0;
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseEventProposalPruned(): EventProposalPruned {
  return { proposalId: 0, status: 0, tallyResult: undefined };
}

export const EventProposalPruned = {
  encode(message: EventProposalPruned, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.proposalId !== 0) {
      writer.uint32(8).uint64(message.proposalId);
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.tallyResult !== undefined) {
      TallyResult.encode(message.tallyResult, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventProposalPruned {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventProposalPruned();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.proposalId = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.tallyResult = TallyResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EventProposalPruned {
    return {
      proposalId: isSet(object.proposalId) ? Number(object.proposalId) : 0,
      status: isSet(object.status) ? proposalStatusFromJSON(object.status) : 0,
      tallyResult: isSet(object.tallyResult) ? TallyResult.fromJSON(object.tallyResult) : undefined,
    };
  },

  toJSON(message: EventProposalPruned): unknown {
    const obj: any = {};
    if (message.proposalId !== 0) {
      obj.proposalId = Math.round(message.proposalId);
    }
    if (message.status !== 0) {
      obj.status = proposalStatusToJSON(message.status);
    }
    if (message.tallyResult !== undefined) {
      obj.tallyResult = TallyResult.toJSON(message.tallyResult);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EventProposalPruned>, I>>(base?: I): EventProposalPruned {
    return EventProposalPruned.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EventProposalPruned>, I>>(object: I): EventProposalPruned {
    const message = createBaseEventProposalPruned();
    message.proposalId = object.proposalId ?? 0;
    message.status = object.status ?? 0;
    message.tallyResult = (object.tallyResult !== undefined && object.tallyResult !== null)
      ? TallyResult.fromPartial(object.tallyResult)
      : undefined;
    return message;
  },
};

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
