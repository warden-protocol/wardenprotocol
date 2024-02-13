/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { ClientConsensusStates, IdentifiedClientState, Params } from "./client";

export const protobufPackage = "ibc.core.client.v1";

/** GenesisState defines the ibc client submodule's genesis state. */
export interface GenesisState {
  /** client states with their corresponding identifiers */
  clients: IdentifiedClientState[];
  /** consensus states from each client */
  clientsConsensus: ClientConsensusStates[];
  /** metadata from each client */
  clientsMetadata: IdentifiedGenesisMetadata[];
  params:
    | Params
    | undefined;
  /**
   * Deprecated: create_localhost has been deprecated.
   * The localhost client is automatically created at genesis.
   *
   * @deprecated
   */
  createLocalhost: boolean;
  /** the sequence for the next generated client identifier */
  nextClientSequence: number;
}

/**
 * GenesisMetadata defines the genesis type for metadata that clients may return
 * with ExportMetadata
 */
export interface GenesisMetadata {
  /** store key of metadata without clientID-prefix */
  key: Uint8Array;
  /** metadata value */
  value: Uint8Array;
}

/**
 * IdentifiedGenesisMetadata has the client metadata with the corresponding
 * client id.
 */
export interface IdentifiedGenesisMetadata {
  clientId: string;
  clientMetadata: GenesisMetadata[];
}

function createBaseGenesisState(): GenesisState {
  return {
    clients: [],
    clientsConsensus: [],
    clientsMetadata: [],
    params: undefined,
    createLocalhost: false,
    nextClientSequence: 0,
  };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.clients) {
      IdentifiedClientState.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.clientsConsensus) {
      ClientConsensusStates.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.clientsMetadata) {
      IdentifiedGenesisMetadata.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(34).fork()).ldelim();
    }
    if (message.createLocalhost === true) {
      writer.uint32(40).bool(message.createLocalhost);
    }
    if (message.nextClientSequence !== 0) {
      writer.uint32(48).uint64(message.nextClientSequence);
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

          message.clients.push(IdentifiedClientState.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.clientsConsensus.push(ClientConsensusStates.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.clientsMetadata.push(IdentifiedGenesisMetadata.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.params = Params.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.createLocalhost = reader.bool();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.nextClientSequence = longToNumber(reader.uint64() as Long);
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
      clients: Array.isArray(object?.clients) ? object.clients.map((e: any) => IdentifiedClientState.fromJSON(e)) : [],
      clientsConsensus: Array.isArray(object?.clientsConsensus)
        ? object.clientsConsensus.map((e: any) => ClientConsensusStates.fromJSON(e))
        : [],
      clientsMetadata: Array.isArray(object?.clientsMetadata)
        ? object.clientsMetadata.map((e: any) => IdentifiedGenesisMetadata.fromJSON(e))
        : [],
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      createLocalhost: isSet(object.createLocalhost) ? Boolean(object.createLocalhost) : false,
      nextClientSequence: isSet(object.nextClientSequence) ? Number(object.nextClientSequence) : 0,
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.clients?.length) {
      obj.clients = message.clients.map((e) => IdentifiedClientState.toJSON(e));
    }
    if (message.clientsConsensus?.length) {
      obj.clientsConsensus = message.clientsConsensus.map((e) => ClientConsensusStates.toJSON(e));
    }
    if (message.clientsMetadata?.length) {
      obj.clientsMetadata = message.clientsMetadata.map((e) => IdentifiedGenesisMetadata.toJSON(e));
    }
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    if (message.createLocalhost === true) {
      obj.createLocalhost = message.createLocalhost;
    }
    if (message.nextClientSequence !== 0) {
      obj.nextClientSequence = Math.round(message.nextClientSequence);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisState>, I>>(base?: I): GenesisState {
    return GenesisState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.clients = object.clients?.map((e) => IdentifiedClientState.fromPartial(e)) || [];
    message.clientsConsensus = object.clientsConsensus?.map((e) => ClientConsensusStates.fromPartial(e)) || [];
    message.clientsMetadata = object.clientsMetadata?.map((e) => IdentifiedGenesisMetadata.fromPartial(e)) || [];
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    message.createLocalhost = object.createLocalhost ?? false;
    message.nextClientSequence = object.nextClientSequence ?? 0;
    return message;
  },
};

function createBaseGenesisMetadata(): GenesisMetadata {
  return { key: new Uint8Array(0), value: new Uint8Array(0) };
}

export const GenesisMetadata = {
  encode(message: GenesisMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key.length !== 0) {
      writer.uint32(10).bytes(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisMetadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenesisMetadata {
    return {
      key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(0),
      value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0),
    };
  },

  toJSON(message: GenesisMetadata): unknown {
    const obj: any = {};
    if (message.key.length !== 0) {
      obj.key = base64FromBytes(message.key);
    }
    if (message.value.length !== 0) {
      obj.value = base64FromBytes(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisMetadata>, I>>(base?: I): GenesisMetadata {
    return GenesisMetadata.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisMetadata>, I>>(object: I): GenesisMetadata {
    const message = createBaseGenesisMetadata();
    message.key = object.key ?? new Uint8Array(0);
    message.value = object.value ?? new Uint8Array(0);
    return message;
  },
};

function createBaseIdentifiedGenesisMetadata(): IdentifiedGenesisMetadata {
  return { clientId: "", clientMetadata: [] };
}

export const IdentifiedGenesisMetadata = {
  encode(message: IdentifiedGenesisMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clientId !== "") {
      writer.uint32(10).string(message.clientId);
    }
    for (const v of message.clientMetadata) {
      GenesisMetadata.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IdentifiedGenesisMetadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIdentifiedGenesisMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clientId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.clientMetadata.push(GenesisMetadata.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IdentifiedGenesisMetadata {
    return {
      clientId: isSet(object.clientId) ? String(object.clientId) : "",
      clientMetadata: Array.isArray(object?.clientMetadata)
        ? object.clientMetadata.map((e: any) => GenesisMetadata.fromJSON(e))
        : [],
    };
  },

  toJSON(message: IdentifiedGenesisMetadata): unknown {
    const obj: any = {};
    if (message.clientId !== "") {
      obj.clientId = message.clientId;
    }
    if (message.clientMetadata?.length) {
      obj.clientMetadata = message.clientMetadata.map((e) => GenesisMetadata.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IdentifiedGenesisMetadata>, I>>(base?: I): IdentifiedGenesisMetadata {
    return IdentifiedGenesisMetadata.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IdentifiedGenesisMetadata>, I>>(object: I): IdentifiedGenesisMetadata {
    const message = createBaseIdentifiedGenesisMetadata();
    message.clientId = object.clientId ?? "";
    message.clientMetadata = object.clientMetadata?.map((e) => GenesisMetadata.fromPartial(e)) || [];
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
