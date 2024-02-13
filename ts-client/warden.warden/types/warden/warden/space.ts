/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "warden.warden";

/** Space is a collection of users (called owners) that manages a set of keys. */
export interface Space {
  address: string;
  creator: string;
  owners: string[];
  /**
   * Optional ID of the intent to be applied to every *admin* operation.
   * If not specified, the default intent is used.
   *
   * Admin operations are:
   * - warden.warden.Msg.AddSpaceOwner
   * - warden.warden.Msg.RemoveSpaceOwner
   *
   * The default intent is to allow any operation when at least one of its
   * owner approves it.
   */
  adminIntentId: number;
  /**
   * Optional ID of the intent to be applied to every *sign* operation.
   * If not specified, the default intent is used.
   *
   * Sign operations are:
   * - warden.warden.Msg.NewKeyRequest
   * - warden.warden.Msg.NewSignTransactionRequest
   * - warden.warden.Msg.NewSignatureRequest
   * - warden.warden.Msg.NewWalletRequest
   *
   * The default intent is to allow any operation when at least one of its
   * owner approves it.
   */
  signIntentId: number;
}

function createBaseSpace(): Space {
  return { address: "", creator: "", owners: [], adminIntentId: 0, signIntentId: 0 };
}

export const Space = {
  encode(message: Space, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    for (const v of message.owners) {
      writer.uint32(26).string(v!);
    }
    if (message.adminIntentId !== 0) {
      writer.uint32(40).uint64(message.adminIntentId);
    }
    if (message.signIntentId !== 0) {
      writer.uint32(48).uint64(message.signIntentId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Space {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSpace();
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

          message.creator = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.owners.push(reader.string());
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.adminIntentId = longToNumber(reader.uint64() as Long);
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.signIntentId = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Space {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      creator: isSet(object.creator) ? String(object.creator) : "",
      owners: Array.isArray(object?.owners) ? object.owners.map((e: any) => String(e)) : [],
      adminIntentId: isSet(object.adminIntentId) ? Number(object.adminIntentId) : 0,
      signIntentId: isSet(object.signIntentId) ? Number(object.signIntentId) : 0,
    };
  },

  toJSON(message: Space): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.owners?.length) {
      obj.owners = message.owners;
    }
    if (message.adminIntentId !== 0) {
      obj.adminIntentId = Math.round(message.adminIntentId);
    }
    if (message.signIntentId !== 0) {
      obj.signIntentId = Math.round(message.signIntentId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Space>, I>>(base?: I): Space {
    return Space.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Space>, I>>(object: I): Space {
    const message = createBaseSpace();
    message.address = object.address ?? "";
    message.creator = object.creator ?? "";
    message.owners = object.owners?.map((e) => e) || [];
    message.adminIntentId = object.adminIntentId ?? 0;
    message.signIntentId = object.signIntentId ?? 0;
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
