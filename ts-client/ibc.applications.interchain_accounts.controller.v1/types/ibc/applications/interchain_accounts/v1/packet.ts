/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Any } from "../../../../google/protobuf/any";

export const protobufPackage = "ibc.applications.interchain_accounts.v1";

/**
 * Type defines a classification of message issued from a controller chain to its associated interchain accounts
 * host
 */
export enum Type {
  /** TYPE_UNSPECIFIED - Default zero value enumeration */
  TYPE_UNSPECIFIED = 0,
  /** TYPE_EXECUTE_TX - Execute a transaction on an interchain accounts host chain */
  TYPE_EXECUTE_TX = 1,
  UNRECOGNIZED = -1,
}

export function typeFromJSON(object: any): Type {
  switch (object) {
    case 0:
    case "TYPE_UNSPECIFIED":
      return Type.TYPE_UNSPECIFIED;
    case 1:
    case "TYPE_EXECUTE_TX":
      return Type.TYPE_EXECUTE_TX;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Type.UNRECOGNIZED;
  }
}

export function typeToJSON(object: Type): string {
  switch (object) {
    case Type.TYPE_UNSPECIFIED:
      return "TYPE_UNSPECIFIED";
    case Type.TYPE_EXECUTE_TX:
      return "TYPE_EXECUTE_TX";
    case Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** InterchainAccountPacketData is comprised of a raw transaction, type of transaction and optional memo field. */
export interface InterchainAccountPacketData {
  type: Type;
  data: Uint8Array;
  memo: string;
}

/** CosmosTx contains a list of sdk.Msg's. It should be used when sending transactions to an SDK host chain. */
export interface CosmosTx {
  messages: Any[];
}

function createBaseInterchainAccountPacketData(): InterchainAccountPacketData {
  return { type: 0, data: new Uint8Array(0), memo: "" };
}

export const InterchainAccountPacketData = {
  encode(message: InterchainAccountPacketData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    if (message.memo !== "") {
      writer.uint32(26).string(message.memo);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InterchainAccountPacketData {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInterchainAccountPacketData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.data = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.memo = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InterchainAccountPacketData {
    return {
      type: isSet(object.type) ? typeFromJSON(object.type) : 0,
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
      memo: isSet(object.memo) ? String(object.memo) : "",
    };
  },

  toJSON(message: InterchainAccountPacketData): unknown {
    const obj: any = {};
    if (message.type !== 0) {
      obj.type = typeToJSON(message.type);
    }
    if (message.data.length !== 0) {
      obj.data = base64FromBytes(message.data);
    }
    if (message.memo !== "") {
      obj.memo = message.memo;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<InterchainAccountPacketData>, I>>(base?: I): InterchainAccountPacketData {
    return InterchainAccountPacketData.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<InterchainAccountPacketData>, I>>(object: I): InterchainAccountPacketData {
    const message = createBaseInterchainAccountPacketData();
    message.type = object.type ?? 0;
    message.data = object.data ?? new Uint8Array(0);
    message.memo = object.memo ?? "";
    return message;
  },
};

function createBaseCosmosTx(): CosmosTx {
  return { messages: [] };
}

export const CosmosTx = {
  encode(message: CosmosTx, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.messages) {
      Any.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CosmosTx {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCosmosTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.messages.push(Any.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CosmosTx {
    return { messages: Array.isArray(object?.messages) ? object.messages.map((e: any) => Any.fromJSON(e)) : [] };
  },

  toJSON(message: CosmosTx): unknown {
    const obj: any = {};
    if (message.messages?.length) {
      obj.messages = message.messages.map((e) => Any.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CosmosTx>, I>>(base?: I): CosmosTx {
    return CosmosTx.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CosmosTx>, I>>(object: I): CosmosTx {
    const message = createBaseCosmosTx();
    message.messages = object.messages?.map((e) => Any.fromPartial(e)) || [];
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

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
