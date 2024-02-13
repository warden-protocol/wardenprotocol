/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../google/protobuf/any";

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

/** Action wraps a message that needs to be approved by a set of approvers. */
export interface Action {
  id: number;
  approvers: string[];
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
  msg: Any | undefined;
  creator: string;
  /**
   * BTL (blocks to live) is the block height up until this action can be
   * approved or rejected.
   */
  btl: number;
}

function createBaseAction(): Action {
  return { id: 0, approvers: [], status: 0, intentId: 0, msg: undefined, creator: "", btl: 0 };
}

export const Action = {
  encode(message: Action, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    for (const v of message.approvers) {
      writer.uint32(18).string(v!);
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
    if (message.creator !== "") {
      writer.uint32(50).string(message.creator);
    }
    if (message.btl !== 0) {
      writer.uint32(56).uint64(message.btl);
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

          message.approvers.push(reader.string());
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

          message.creator = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.btl = longToNumber(reader.uint64() as Long);
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
      approvers: Array.isArray(object?.approvers) ? object.approvers.map((e: any) => String(e)) : [],
      status: isSet(object.status) ? actionStatusFromJSON(object.status) : 0,
      intentId: isSet(object.intentId) ? Number(object.intentId) : 0,
      msg: isSet(object.msg) ? Any.fromJSON(object.msg) : undefined,
      creator: isSet(object.creator) ? String(object.creator) : "",
      btl: isSet(object.btl) ? Number(object.btl) : 0,
    };
  },

  toJSON(message: Action): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.approvers?.length) {
      obj.approvers = message.approvers;
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
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.btl !== 0) {
      obj.btl = Math.round(message.btl);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Action>, I>>(base?: I): Action {
    return Action.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Action>, I>>(object: I): Action {
    const message = createBaseAction();
    message.id = object.id ?? 0;
    message.approvers = object.approvers?.map((e) => e) || [];
    message.status = object.status ?? 0;
    message.intentId = object.intentId ?? 0;
    message.msg = (object.msg !== undefined && object.msg !== null) ? Any.fromPartial(object.msg) : undefined;
    message.creator = object.creator ?? "";
    message.btl = object.btl ?? 0;
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
