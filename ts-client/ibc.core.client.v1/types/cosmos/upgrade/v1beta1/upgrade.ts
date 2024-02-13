/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { Timestamp } from "../../../google/protobuf/timestamp";

export const protobufPackage = "cosmos.upgrade.v1beta1";

/** Plan specifies information about a planned upgrade and when it should occur. */
export interface Plan {
  /**
   * Sets the name for the upgrade. This name will be used by the upgraded
   * version of the software to apply any special "on-upgrade" commands during
   * the first BeginBlock method after the upgrade is applied. It is also used
   * to detect whether a software version can handle a given upgrade. If no
   * upgrade handler with this name has been set in the software, it will be
   * assumed that the software is out-of-date when the upgrade Time or Height is
   * reached and the software will exit.
   */
  name: string;
  /**
   * Deprecated: Time based upgrades have been deprecated. Time based upgrade logic
   * has been removed from the SDK.
   * If this field is not empty, an error will be thrown.
   *
   * @deprecated
   */
  time:
    | Date
    | undefined;
  /** The height at which the upgrade must be performed. */
  height: number;
  /**
   * Any application specific upgrade info to be included on-chain
   * such as a git commit that validators could automatically upgrade to
   */
  info: string;
  /**
   * Deprecated: UpgradedClientState field has been deprecated. IBC upgrade logic has been
   * moved to the IBC module in the sub module 02-client.
   * If this field is not empty, an error will be thrown.
   *
   * @deprecated
   */
  upgradedClientState: Any | undefined;
}

/**
 * SoftwareUpgradeProposal is a gov Content type for initiating a software
 * upgrade.
 * Deprecated: This legacy proposal is deprecated in favor of Msg-based gov
 * proposals, see MsgSoftwareUpgrade.
 *
 * @deprecated
 */
export interface SoftwareUpgradeProposal {
  /** title of the proposal */
  title: string;
  /** description of the proposal */
  description: string;
  /** plan of the proposal */
  plan: Plan | undefined;
}

/**
 * CancelSoftwareUpgradeProposal is a gov Content type for cancelling a software
 * upgrade.
 * Deprecated: This legacy proposal is deprecated in favor of Msg-based gov
 * proposals, see MsgCancelUpgrade.
 *
 * @deprecated
 */
export interface CancelSoftwareUpgradeProposal {
  /** title of the proposal */
  title: string;
  /** description of the proposal */
  description: string;
}

/**
 * ModuleVersion specifies a module and its consensus version.
 *
 * Since: cosmos-sdk 0.43
 */
export interface ModuleVersion {
  /** name of the app module */
  name: string;
  /** consensus version of the app module */
  version: number;
}

function createBasePlan(): Plan {
  return { name: "", time: undefined, height: 0, info: "", upgradedClientState: undefined };
}

export const Plan = {
  encode(message: Plan, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.time !== undefined) {
      Timestamp.encode(toTimestamp(message.time), writer.uint32(18).fork()).ldelim();
    }
    if (message.height !== 0) {
      writer.uint32(24).int64(message.height);
    }
    if (message.info !== "") {
      writer.uint32(34).string(message.info);
    }
    if (message.upgradedClientState !== undefined) {
      Any.encode(message.upgradedClientState, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Plan {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlan();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.height = longToNumber(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.info = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.upgradedClientState = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Plan {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
      height: isSet(object.height) ? Number(object.height) : 0,
      info: isSet(object.info) ? String(object.info) : "",
      upgradedClientState: isSet(object.upgradedClientState) ? Any.fromJSON(object.upgradedClientState) : undefined,
    };
  },

  toJSON(message: Plan): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.time !== undefined) {
      obj.time = message.time.toISOString();
    }
    if (message.height !== 0) {
      obj.height = Math.round(message.height);
    }
    if (message.info !== "") {
      obj.info = message.info;
    }
    if (message.upgradedClientState !== undefined) {
      obj.upgradedClientState = Any.toJSON(message.upgradedClientState);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Plan>, I>>(base?: I): Plan {
    return Plan.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Plan>, I>>(object: I): Plan {
    const message = createBasePlan();
    message.name = object.name ?? "";
    message.time = object.time ?? undefined;
    message.height = object.height ?? 0;
    message.info = object.info ?? "";
    message.upgradedClientState = (object.upgradedClientState !== undefined && object.upgradedClientState !== null)
      ? Any.fromPartial(object.upgradedClientState)
      : undefined;
    return message;
  },
};

function createBaseSoftwareUpgradeProposal(): SoftwareUpgradeProposal {
  return { title: "", description: "", plan: undefined };
}

export const SoftwareUpgradeProposal = {
  encode(message: SoftwareUpgradeProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.plan !== undefined) {
      Plan.encode(message.plan, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SoftwareUpgradeProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSoftwareUpgradeProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.title = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.plan = Plan.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SoftwareUpgradeProposal {
    return {
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      plan: isSet(object.plan) ? Plan.fromJSON(object.plan) : undefined,
    };
  },

  toJSON(message: SoftwareUpgradeProposal): unknown {
    const obj: any = {};
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.plan !== undefined) {
      obj.plan = Plan.toJSON(message.plan);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SoftwareUpgradeProposal>, I>>(base?: I): SoftwareUpgradeProposal {
    return SoftwareUpgradeProposal.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SoftwareUpgradeProposal>, I>>(object: I): SoftwareUpgradeProposal {
    const message = createBaseSoftwareUpgradeProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.plan = (object.plan !== undefined && object.plan !== null) ? Plan.fromPartial(object.plan) : undefined;
    return message;
  },
};

function createBaseCancelSoftwareUpgradeProposal(): CancelSoftwareUpgradeProposal {
  return { title: "", description: "" };
}

export const CancelSoftwareUpgradeProposal = {
  encode(message: CancelSoftwareUpgradeProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CancelSoftwareUpgradeProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCancelSoftwareUpgradeProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.title = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CancelSoftwareUpgradeProposal {
    return {
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
    };
  },

  toJSON(message: CancelSoftwareUpgradeProposal): unknown {
    const obj: any = {};
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CancelSoftwareUpgradeProposal>, I>>(base?: I): CancelSoftwareUpgradeProposal {
    return CancelSoftwareUpgradeProposal.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CancelSoftwareUpgradeProposal>, I>>(
    object: I,
  ): CancelSoftwareUpgradeProposal {
    const message = createBaseCancelSoftwareUpgradeProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    return message;
  },
};

function createBaseModuleVersion(): ModuleVersion {
  return { name: "", version: 0 };
}

export const ModuleVersion = {
  encode(message: ModuleVersion, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.version !== 0) {
      writer.uint32(16).uint64(message.version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModuleVersion {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModuleVersion();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.version = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ModuleVersion {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      version: isSet(object.version) ? Number(object.version) : 0,
    };
  },

  toJSON(message: ModuleVersion): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.version !== 0) {
      obj.version = Math.round(message.version);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ModuleVersion>, I>>(base?: I): ModuleVersion {
    return ModuleVersion.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ModuleVersion>, I>>(object: I): ModuleVersion {
    const message = createBaseModuleVersion();
    message.name = object.name ?? "";
    message.version = object.version ?? 0;
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
