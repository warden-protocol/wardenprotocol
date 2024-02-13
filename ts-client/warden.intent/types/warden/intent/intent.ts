/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../google/protobuf/any";

export const protobufPackage = "warden.intent";

export interface Intent {
  id: number;
  name: string;
  /**
   * The actual intent informations. It must be one the supported intent types:
   * - BoolparserIntent
   */
  intent: Any | undefined;
}

export interface BoolparserIntent {
  /**
   * Definition of the intent, eg.
   * "t1 + t2 + t3 > 1"
   */
  definition: string;
  participants: IntentParticipant[];
}

export interface IntentParticipant {
  abbreviation: string;
  address: string;
}

function createBaseIntent(): Intent {
  return { id: 0, name: "", intent: undefined };
}

export const Intent = {
  encode(message: Intent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.intent !== undefined) {
      Any.encode(message.intent, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Intent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIntent();
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

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.intent = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Intent {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      name: isSet(object.name) ? String(object.name) : "",
      intent: isSet(object.intent) ? Any.fromJSON(object.intent) : undefined,
    };
  },

  toJSON(message: Intent): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.intent !== undefined) {
      obj.intent = Any.toJSON(message.intent);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Intent>, I>>(base?: I): Intent {
    return Intent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Intent>, I>>(object: I): Intent {
    const message = createBaseIntent();
    message.id = object.id ?? 0;
    message.name = object.name ?? "";
    message.intent = (object.intent !== undefined && object.intent !== null)
      ? Any.fromPartial(object.intent)
      : undefined;
    return message;
  },
};

function createBaseBoolparserIntent(): BoolparserIntent {
  return { definition: "", participants: [] };
}

export const BoolparserIntent = {
  encode(message: BoolparserIntent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.definition !== "") {
      writer.uint32(10).string(message.definition);
    }
    for (const v of message.participants) {
      IntentParticipant.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BoolparserIntent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBoolparserIntent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.definition = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.participants.push(IntentParticipant.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BoolparserIntent {
    return {
      definition: isSet(object.definition) ? String(object.definition) : "",
      participants: Array.isArray(object?.participants)
        ? object.participants.map((e: any) => IntentParticipant.fromJSON(e))
        : [],
    };
  },

  toJSON(message: BoolparserIntent): unknown {
    const obj: any = {};
    if (message.definition !== "") {
      obj.definition = message.definition;
    }
    if (message.participants?.length) {
      obj.participants = message.participants.map((e) => IntentParticipant.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BoolparserIntent>, I>>(base?: I): BoolparserIntent {
    return BoolparserIntent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BoolparserIntent>, I>>(object: I): BoolparserIntent {
    const message = createBaseBoolparserIntent();
    message.definition = object.definition ?? "";
    message.participants = object.participants?.map((e) => IntentParticipant.fromPartial(e)) || [];
    return message;
  },
};

function createBaseIntentParticipant(): IntentParticipant {
  return { abbreviation: "", address: "" };
}

export const IntentParticipant = {
  encode(message: IntentParticipant, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.abbreviation !== "") {
      writer.uint32(10).string(message.abbreviation);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IntentParticipant {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIntentParticipant();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.abbreviation = reader.string();
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

  fromJSON(object: any): IntentParticipant {
    return {
      abbreviation: isSet(object.abbreviation) ? String(object.abbreviation) : "",
      address: isSet(object.address) ? String(object.address) : "",
    };
  },

  toJSON(message: IntentParticipant): unknown {
    const obj: any = {};
    if (message.abbreviation !== "") {
      obj.abbreviation = message.abbreviation;
    }
    if (message.address !== "") {
      obj.address = message.address;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IntentParticipant>, I>>(base?: I): IntentParticipant {
    return IntentParticipant.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IntentParticipant>, I>>(object: I): IntentParticipant {
    const message = createBaseIntentParticipant();
    message.abbreviation = object.abbreviation ?? "";
    message.address = object.address ?? "";
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
