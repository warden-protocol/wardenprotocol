/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Key, KeyRequest } from "./key";
import { Keychain } from "./keychain";
import { Params } from "./params";
import { SignRequest } from "./signature";
import { Space } from "./space";

export const protobufPackage = "warden.warden.v1beta2";

/** GenesisState defines the warden module's genesis state. */
export interface GenesisState {
  /** params defines all the parameters of the module. */
  params: Params | undefined;
  keychains: Keychain[];
  spaces: Space[];
  keys: Key[];
  keyRequests: KeyRequest[];
  signatureRequests: SignRequest[];
}

function createBaseGenesisState(): GenesisState {
  return { params: undefined, keychains: [], spaces: [], keys: [], keyRequests: [], signatureRequests: [] };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.keychains) {
      Keychain.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.spaces) {
      Space.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.keys) {
      Key.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.keyRequests) {
      KeyRequest.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.signatureRequests) {
      SignRequest.encode(v!, writer.uint32(50).fork()).ldelim();
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

          message.params = Params.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.keychains.push(Keychain.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.spaces.push(Space.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.keys.push(Key.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.keyRequests.push(KeyRequest.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.signatureRequests.push(SignRequest.decode(reader, reader.uint32()));
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
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      keychains: Array.isArray(object?.keychains) ? object.keychains.map((e: any) => Keychain.fromJSON(e)) : [],
      spaces: Array.isArray(object?.spaces) ? object.spaces.map((e: any) => Space.fromJSON(e)) : [],
      keys: Array.isArray(object?.keys) ? object.keys.map((e: any) => Key.fromJSON(e)) : [],
      keyRequests: Array.isArray(object?.keyRequests) ? object.keyRequests.map((e: any) => KeyRequest.fromJSON(e)) : [],
      signatureRequests: Array.isArray(object?.signatureRequests)
        ? object.signatureRequests.map((e: any) => SignRequest.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    if (message.keychains?.length) {
      obj.keychains = message.keychains.map((e) => Keychain.toJSON(e));
    }
    if (message.spaces?.length) {
      obj.spaces = message.spaces.map((e) => Space.toJSON(e));
    }
    if (message.keys?.length) {
      obj.keys = message.keys.map((e) => Key.toJSON(e));
    }
    if (message.keyRequests?.length) {
      obj.keyRequests = message.keyRequests.map((e) => KeyRequest.toJSON(e));
    }
    if (message.signatureRequests?.length) {
      obj.signatureRequests = message.signatureRequests.map((e) => SignRequest.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisState>, I>>(base?: I): GenesisState {
    return GenesisState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    message.keychains = object.keychains?.map((e) => Keychain.fromPartial(e)) || [];
    message.spaces = object.spaces?.map((e) => Space.fromPartial(e)) || [];
    message.keys = object.keys?.map((e) => Key.fromPartial(e)) || [];
    message.keyRequests = object.keyRequests?.map((e) => KeyRequest.fromPartial(e)) || [];
    message.signatureRequests = object.signatureRequests?.map((e) => SignRequest.fromPartial(e)) || [];
    return message;
  },
};

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
