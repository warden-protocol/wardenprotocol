/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { ConnectionPaths, IdentifiedConnection, Params } from "./connection";

export const protobufPackage = "ibc.core.connection.v1";

/** GenesisState defines the ibc connection submodule's genesis state. */
export interface GenesisState {
  connections: IdentifiedConnection[];
  clientConnectionPaths: ConnectionPaths[];
  /** the sequence for the next generated connection identifier */
  nextConnectionSequence: number;
  params: Params | undefined;
}

function createBaseGenesisState(): GenesisState {
  return { connections: [], clientConnectionPaths: [], nextConnectionSequence: 0, params: undefined };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.connections) {
      IdentifiedConnection.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.clientConnectionPaths) {
      ConnectionPaths.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.nextConnectionSequence !== 0) {
      writer.uint32(24).uint64(message.nextConnectionSequence);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.connections.push(IdentifiedConnection.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.clientConnectionPaths.push(ConnectionPaths.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.nextConnectionSequence = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.params = Params.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      connections: Array.isArray(object?.connections)
        ? object.connections.map((e: any) => IdentifiedConnection.fromJSON(e))
        : [],
      clientConnectionPaths: Array.isArray(object?.clientConnectionPaths)
        ? object.clientConnectionPaths.map((e: any) => ConnectionPaths.fromJSON(e))
        : [],
      nextConnectionSequence: isSet(object.nextConnectionSequence) ? Number(object.nextConnectionSequence) : 0,
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.connections?.length) {
      obj.connections = message.connections.map((e) => IdentifiedConnection.toJSON(e));
    }
    if (message.clientConnectionPaths?.length) {
      obj.clientConnectionPaths = message.clientConnectionPaths.map((e) => ConnectionPaths.toJSON(e));
    }
    if (message.nextConnectionSequence !== 0) {
      obj.nextConnectionSequence = Math.round(message.nextConnectionSequence);
    }
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisState>, I>>(base?: I): GenesisState {
    return GenesisState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.connections = object.connections?.map((e) => IdentifiedConnection.fromPartial(e)) || [];
    message.clientConnectionPaths = object.clientConnectionPaths?.map((e) => ConnectionPaths.fromPartial(e)) || [];
    message.nextConnectionSequence = object.nextConnectionSequence ?? 0;
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
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
