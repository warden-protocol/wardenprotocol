/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../google/protobuf/any";
import { Timestamp } from "../../google/protobuf/timestamp";

export const protobufPackage = "warden.intent";

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
  approvedAt: Date | undefined;
}

/** Action wraps a message that needs to be approved by a set of approvers. */
export interface Action {
  id: number;
  approvers: Approver[];
  status: ActionStatus;
  /**
   * Optional intent id that must be satisfied by the approvers.
   * If not specified, it's up to the creator of the action to decide what to
   * apply.
   */
  intentId: number;
  /**
   * Original message that started the action, it will be executed when the
   * intent is satisfied.
   */
  msg:
    | Any
    | undefined;
  /** Result of the action, it will be set when the action is completed. */
  result: Any | undefined;
  creator: string;
  /**
   * BTL (blocks to live) is the block height up until this action can be
   * approved or rejected.
   */
  btl: number;
  /** created_at is a timestamp specifying when the action was created */
  createdAt:
    | Date
    | undefined;
  /** updated_at is a timestamp specifying when the action's status was updated */
  updatedAt: Date | undefined;
}

/** MsgActionCreated is returned by rpc that creates an action. */
export interface MsgActionCreated {
  action: Action | undefined;
}

function createBaseApprover(): Approver {
  return { address: "", approvedAt: undefined };
}

export const Approver = {
  encode(message: Approver, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.approvedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.approvedAt), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Approver {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApprover();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.address = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.approvedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Approver {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      approvedAt: isSet(object.approvedAt) ? fromJsonTimestamp(object.approvedAt) : undefined,
    };
  },

  toJSON(message: Approver): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.approvedAt !== undefined) {
      obj.approvedAt = message.approvedAt.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Approver>, I>>(base?: I): Approver {
    return Approver.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Approver>, I>>(object: I): Approver {
    const message = createBaseApprover();
    message.address = object.address ?? "";
    message.approvedAt = object.approvedAt ?? undefined;
    return message;
  },
};

function createBaseAction(): Action {
  return {
    id: 0,
    approvers: [],
    status: 0,
    intentId: 0,
    msg: undefined,
    result: undefined,
    creator: "",
    btl: 0,
    createdAt: undefined,
    updatedAt: undefined,
  };
}

export const Action = {
  encode(message: Action, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    for (const v of message.approvers) {
      Approver.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(24).int32(message.status);
    }
    if (message.intentId !== 0) {
      writer.uint32(32).uint64(message.intentId);
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
    if (message.btl !== 0) {
      writer.uint32(64).uint64(message.btl);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(74).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Action {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.approvers.push(Approver.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.intentId = longToNumber(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.msg = Any.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.result = Any.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.btl = longToNumber(reader.uint64() as Long);
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.updatedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Action {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      approvers: Array.isArray(object?.approvers) ? object.approvers.map((e: any) => Approver.fromJSON(e)) : [],
      status: isSet(object.status) ? actionStatusFromJSON(object.status) : 0,
      intentId: isSet(object.intentId) ? Number(object.intentId) : 0,
      msg: isSet(object.msg) ? Any.fromJSON(object.msg) : undefined,
      result: isSet(object.result) ? Any.fromJSON(object.result) : undefined,
      creator: isSet(object.creator) ? String(object.creator) : "",
      btl: isSet(object.btl) ? Number(object.btl) : 0,
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      updatedAt: isSet(object.updatedAt) ? fromJsonTimestamp(object.updatedAt) : undefined,
    };
  },

  toJSON(message: Action): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.approvers?.length) {
      obj.approvers = message.approvers.map((e) => Approver.toJSON(e));
    }
    if (message.status !== 0) {
      obj.status = actionStatusToJSON(message.status);
    }
    if (message.intentId !== 0) {
      obj.intentId = Math.round(message.intentId);
    }
    if (message.msg !== undefined) {
      obj.msg = Any.toJSON(message.msg);
    }
    if (message.result !== undefined) {
      obj.result = Any.toJSON(message.result);
    }
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.btl !== 0) {
      obj.btl = Math.round(message.btl);
    }
    if (message.createdAt !== undefined) {
      obj.createdAt = message.createdAt.toISOString();
    }
    if (message.updatedAt !== undefined) {
      obj.updatedAt = message.updatedAt.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Action>, I>>(base?: I): Action {
    return Action.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Action>, I>>(object: I): Action {
    const message = createBaseAction();
    message.id = object.id ?? 0;
    message.approvers = object.approvers?.map((e) => Approver.fromPartial(e)) || [];
    message.status = object.status ?? 0;
    message.intentId = object.intentId ?? 0;
    message.msg = (object.msg !== undefined && object.msg !== null) ? Any.fromPartial(object.msg) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? Any.fromPartial(object.result)
      : undefined;
    message.creator = object.creator ?? "";
    message.btl = object.btl ?? 0;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

function createBaseMsgActionCreated(): MsgActionCreated {
  return { action: undefined };
}

export const MsgActionCreated = {
  encode(message: MsgActionCreated, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.action !== undefined) {
      Action.encode(message.action, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgActionCreated {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgActionCreated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.action = Action.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgActionCreated {
    return { action: isSet(object.action) ? Action.fromJSON(object.action) : undefined };
  },

  toJSON(message: MsgActionCreated): unknown {
    const obj: any = {};
    if (message.action !== undefined) {
      obj.action = Action.toJSON(message.action);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgActionCreated>, I>>(base?: I): MsgActionCreated {
    return MsgActionCreated.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgActionCreated>, I>>(object: I): MsgActionCreated {
    const message = createBaseMsgActionCreated();
    message.action = (object.action !== undefined && object.action !== null)
      ? Action.fromPartial(object.action)
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

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

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
