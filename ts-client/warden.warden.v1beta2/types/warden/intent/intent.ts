/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Expression } from "../../shield/ast/ast";

export const protobufPackage = "warden.intent";

export interface Intent {
  id: number;
  creator: string;
  name: string;
  /** The expression to be evaluated for this intent. */
  expression: Expression | undefined;
}

function createBaseIntent(): Intent {
  return { id: 0, creator: "", name: "", expression: undefined };
}

export const Intent = {
  encode(message: Intent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.expression !== undefined) {
      Expression.encode(message.expression, writer.uint32(34).fork()).ldelim();
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

          message.creator = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.expression = Expression.decode(reader, reader.uint32());
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
      creator: isSet(object.creator) ? String(object.creator) : "",
      name: isSet(object.name) ? String(object.name) : "",
      expression: isSet(object.expression) ? Expression.fromJSON(object.expression) : undefined,
    };
  },

  toJSON(message: Intent): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.expression !== undefined) {
      obj.expression = Expression.toJSON(message.expression);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Intent>, I>>(base?: I): Intent {
    return Intent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Intent>, I>>(object: I): Intent {
    const message = createBaseIntent();
    message.id = object.id ?? 0;
    message.creator = object.creator ?? "";
    message.name = object.name ?? "";
    message.expression = (object.expression !== undefined && object.expression !== null)
      ? Expression.fromPartial(object.expression)
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
