/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Order, orderFromJSON, orderToJSON, Timeout } from "./channel";

export const protobufPackage = "ibc.core.channel.v1";

/**
 * Upgrade is a verifiable type which contains the relevant information
 * for an attempted upgrade. It provides the proposed changes to the channel
 * end, the timeout for this upgrade attempt and the next packet sequence
 * which allows the counterparty to efficiently know the highest sequence it has received.
 * The next sequence send is used for pruning and upgrading from unordered to ordered channels.
 */
export interface Upgrade {
  fields: UpgradeFields | undefined;
  timeout: Timeout | undefined;
  nextSequenceSend: number;
}

/**
 * UpgradeFields are the fields in a channel end which may be changed
 * during a channel upgrade.
 */
export interface UpgradeFields {
  ordering: Order;
  connectionHops: string[];
  version: string;
}

/**
 * ErrorReceipt defines a type which encapsulates the upgrade sequence and error associated with the
 * upgrade handshake failure. When a channel upgrade handshake is aborted both chains are expected to increment to the
 * next sequence.
 */
export interface ErrorReceipt {
  /** the channel upgrade sequence */
  sequence: number;
  /** the error message detailing the cause of failure */
  message: string;
}

function createBaseUpgrade(): Upgrade {
  return { fields: undefined, timeout: undefined, nextSequenceSend: 0 };
}

export const Upgrade = {
  encode(message: Upgrade, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fields !== undefined) {
      UpgradeFields.encode(message.fields, writer.uint32(10).fork()).ldelim();
    }
    if (message.timeout !== undefined) {
      Timeout.encode(message.timeout, writer.uint32(18).fork()).ldelim();
    }
    if (message.nextSequenceSend !== 0) {
      writer.uint32(24).uint64(message.nextSequenceSend);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Upgrade {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpgrade();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fields = UpgradeFields.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.timeout = Timeout.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.nextSequenceSend = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Upgrade {
    return {
      fields: isSet(object.fields) ? UpgradeFields.fromJSON(object.fields) : undefined,
      timeout: isSet(object.timeout) ? Timeout.fromJSON(object.timeout) : undefined,
      nextSequenceSend: isSet(object.nextSequenceSend) ? Number(object.nextSequenceSend) : 0,
    };
  },

  toJSON(message: Upgrade): unknown {
    const obj: any = {};
    if (message.fields !== undefined) {
      obj.fields = UpgradeFields.toJSON(message.fields);
    }
    if (message.timeout !== undefined) {
      obj.timeout = Timeout.toJSON(message.timeout);
    }
    if (message.nextSequenceSend !== 0) {
      obj.nextSequenceSend = Math.round(message.nextSequenceSend);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Upgrade>, I>>(base?: I): Upgrade {
    return Upgrade.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Upgrade>, I>>(object: I): Upgrade {
    const message = createBaseUpgrade();
    message.fields = (object.fields !== undefined && object.fields !== null)
      ? UpgradeFields.fromPartial(object.fields)
      : undefined;
    message.timeout = (object.timeout !== undefined && object.timeout !== null)
      ? Timeout.fromPartial(object.timeout)
      : undefined;
    message.nextSequenceSend = object.nextSequenceSend ?? 0;
    return message;
  },
};

function createBaseUpgradeFields(): UpgradeFields {
  return { ordering: 0, connectionHops: [], version: "" };
}

export const UpgradeFields = {
  encode(message: UpgradeFields, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ordering !== 0) {
      writer.uint32(8).int32(message.ordering);
    }
    for (const v of message.connectionHops) {
      writer.uint32(18).string(v!);
    }
    if (message.version !== "") {
      writer.uint32(26).string(message.version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpgradeFields {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpgradeFields();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.ordering = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.connectionHops.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.version = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpgradeFields {
    return {
      ordering: isSet(object.ordering) ? orderFromJSON(object.ordering) : 0,
      connectionHops: Array.isArray(object?.connectionHops) ? object.connectionHops.map((e: any) => String(e)) : [],
      version: isSet(object.version) ? String(object.version) : "",
    };
  },

  toJSON(message: UpgradeFields): unknown {
    const obj: any = {};
    if (message.ordering !== 0) {
      obj.ordering = orderToJSON(message.ordering);
    }
    if (message.connectionHops?.length) {
      obj.connectionHops = message.connectionHops;
    }
    if (message.version !== "") {
      obj.version = message.version;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpgradeFields>, I>>(base?: I): UpgradeFields {
    return UpgradeFields.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpgradeFields>, I>>(object: I): UpgradeFields {
    const message = createBaseUpgradeFields();
    message.ordering = object.ordering ?? 0;
    message.connectionHops = object.connectionHops?.map((e) => e) || [];
    message.version = object.version ?? "";
    return message;
  },
};

function createBaseErrorReceipt(): ErrorReceipt {
  return { sequence: 0, message: "" };
}

export const ErrorReceipt = {
  encode(message: ErrorReceipt, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sequence !== 0) {
      writer.uint32(8).uint64(message.sequence);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ErrorReceipt {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseErrorReceipt();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.sequence = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ErrorReceipt {
    return {
      sequence: isSet(object.sequence) ? Number(object.sequence) : 0,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: ErrorReceipt): unknown {
    const obj: any = {};
    if (message.sequence !== 0) {
      obj.sequence = Math.round(message.sequence);
    }
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ErrorReceipt>, I>>(base?: I): ErrorReceipt {
    return ErrorReceipt.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ErrorReceipt>, I>>(object: I): ErrorReceipt {
    const message = createBaseErrorReceipt();
    message.sequence = object.sequence ?? 0;
    message.message = object.message ?? "";
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
