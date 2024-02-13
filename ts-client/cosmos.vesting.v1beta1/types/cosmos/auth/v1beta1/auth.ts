/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";

export const protobufPackage = "cosmos.auth.v1beta1";

/**
 * BaseAccount defines a base account type. It contains all the necessary fields
 * for basic account functionality. Any custom account type should extend this
 * type for additional functionality (e.g. vesting).
 */
export interface BaseAccount {
  address: string;
  pubKey: Any | undefined;
  accountNumber: number;
  sequence: number;
}

/** ModuleAccount defines an account for modules that holds coins on a pool. */
export interface ModuleAccount {
  baseAccount: BaseAccount | undefined;
  name: string;
  permissions: string[];
}

/**
 * ModuleCredential represents a unclaimable pubkey for base accounts controlled by modules.
 *
 * Since: cosmos-sdk 0.47
 */
export interface ModuleCredential {
  /** module_name is the name of the module used for address derivation (passed into address.Module). */
  moduleName: string;
  /**
   * derivation_keys is for deriving a module account address (passed into address.Module)
   * adding more keys creates sub-account addresses (passed into address.Derive)
   */
  derivationKeys: Uint8Array[];
}

/** Params defines the parameters for the auth module. */
export interface Params {
  maxMemoCharacters: number;
  txSigLimit: number;
  txSizeCostPerByte: number;
  sigVerifyCostEd25519: number;
  sigVerifyCostSecp256k1: number;
}

function createBaseBaseAccount(): BaseAccount {
  return { address: "", pubKey: undefined, accountNumber: 0, sequence: 0 };
}

export const BaseAccount = {
  encode(message: BaseAccount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.pubKey !== undefined) {
      Any.encode(message.pubKey, writer.uint32(18).fork()).ldelim();
    }
    if (message.accountNumber !== 0) {
      writer.uint32(24).uint64(message.accountNumber);
    }
    if (message.sequence !== 0) {
      writer.uint32(32).uint64(message.sequence);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BaseAccount {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBaseAccount();
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

          message.pubKey = Any.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.accountNumber = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.sequence = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BaseAccount {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      pubKey: isSet(object.pubKey) ? Any.fromJSON(object.pubKey) : undefined,
      accountNumber: isSet(object.accountNumber) ? Number(object.accountNumber) : 0,
      sequence: isSet(object.sequence) ? Number(object.sequence) : 0,
    };
  },

  toJSON(message: BaseAccount): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.pubKey !== undefined) {
      obj.pubKey = Any.toJSON(message.pubKey);
    }
    if (message.accountNumber !== 0) {
      obj.accountNumber = Math.round(message.accountNumber);
    }
    if (message.sequence !== 0) {
      obj.sequence = Math.round(message.sequence);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BaseAccount>, I>>(base?: I): BaseAccount {
    return BaseAccount.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BaseAccount>, I>>(object: I): BaseAccount {
    const message = createBaseBaseAccount();
    message.address = object.address ?? "";
    message.pubKey = (object.pubKey !== undefined && object.pubKey !== null)
      ? Any.fromPartial(object.pubKey)
      : undefined;
    message.accountNumber = object.accountNumber ?? 0;
    message.sequence = object.sequence ?? 0;
    return message;
  },
};

function createBaseModuleAccount(): ModuleAccount {
  return { baseAccount: undefined, name: "", permissions: [] };
}

export const ModuleAccount = {
  encode(message: ModuleAccount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.baseAccount !== undefined) {
      BaseAccount.encode(message.baseAccount, writer.uint32(10).fork()).ldelim();
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    for (const v of message.permissions) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModuleAccount {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModuleAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.baseAccount = BaseAccount.decode(reader, reader.uint32());
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

          message.permissions.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ModuleAccount {
    return {
      baseAccount: isSet(object.baseAccount) ? BaseAccount.fromJSON(object.baseAccount) : undefined,
      name: isSet(object.name) ? String(object.name) : "",
      permissions: Array.isArray(object?.permissions) ? object.permissions.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: ModuleAccount): unknown {
    const obj: any = {};
    if (message.baseAccount !== undefined) {
      obj.baseAccount = BaseAccount.toJSON(message.baseAccount);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.permissions?.length) {
      obj.permissions = message.permissions;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ModuleAccount>, I>>(base?: I): ModuleAccount {
    return ModuleAccount.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ModuleAccount>, I>>(object: I): ModuleAccount {
    const message = createBaseModuleAccount();
    message.baseAccount = (object.baseAccount !== undefined && object.baseAccount !== null)
      ? BaseAccount.fromPartial(object.baseAccount)
      : undefined;
    message.name = object.name ?? "";
    message.permissions = object.permissions?.map((e) => e) || [];
    return message;
  },
};

function createBaseModuleCredential(): ModuleCredential {
  return { moduleName: "", derivationKeys: [] };
}

export const ModuleCredential = {
  encode(message: ModuleCredential, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.moduleName !== "") {
      writer.uint32(10).string(message.moduleName);
    }
    for (const v of message.derivationKeys) {
      writer.uint32(18).bytes(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModuleCredential {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModuleCredential();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.moduleName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.derivationKeys.push(reader.bytes());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ModuleCredential {
    return {
      moduleName: isSet(object.moduleName) ? String(object.moduleName) : "",
      derivationKeys: Array.isArray(object?.derivationKeys)
        ? object.derivationKeys.map((e: any) => bytesFromBase64(e))
        : [],
    };
  },

  toJSON(message: ModuleCredential): unknown {
    const obj: any = {};
    if (message.moduleName !== "") {
      obj.moduleName = message.moduleName;
    }
    if (message.derivationKeys?.length) {
      obj.derivationKeys = message.derivationKeys.map((e) => base64FromBytes(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ModuleCredential>, I>>(base?: I): ModuleCredential {
    return ModuleCredential.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ModuleCredential>, I>>(object: I): ModuleCredential {
    const message = createBaseModuleCredential();
    message.moduleName = object.moduleName ?? "";
    message.derivationKeys = object.derivationKeys?.map((e) => e) || [];
    return message;
  },
};

function createBaseParams(): Params {
  return {
    maxMemoCharacters: 0,
    txSigLimit: 0,
    txSizeCostPerByte: 0,
    sigVerifyCostEd25519: 0,
    sigVerifyCostSecp256k1: 0,
  };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.maxMemoCharacters !== 0) {
      writer.uint32(8).uint64(message.maxMemoCharacters);
    }
    if (message.txSigLimit !== 0) {
      writer.uint32(16).uint64(message.txSigLimit);
    }
    if (message.txSizeCostPerByte !== 0) {
      writer.uint32(24).uint64(message.txSizeCostPerByte);
    }
    if (message.sigVerifyCostEd25519 !== 0) {
      writer.uint32(32).uint64(message.sigVerifyCostEd25519);
    }
    if (message.sigVerifyCostSecp256k1 !== 0) {
      writer.uint32(40).uint64(message.sigVerifyCostSecp256k1);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.maxMemoCharacters = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.txSigLimit = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.txSizeCostPerByte = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.sigVerifyCostEd25519 = longToNumber(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.sigVerifyCostSecp256k1 = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      maxMemoCharacters: isSet(object.maxMemoCharacters) ? Number(object.maxMemoCharacters) : 0,
      txSigLimit: isSet(object.txSigLimit) ? Number(object.txSigLimit) : 0,
      txSizeCostPerByte: isSet(object.txSizeCostPerByte) ? Number(object.txSizeCostPerByte) : 0,
      sigVerifyCostEd25519: isSet(object.sigVerifyCostEd25519) ? Number(object.sigVerifyCostEd25519) : 0,
      sigVerifyCostSecp256k1: isSet(object.sigVerifyCostSecp256k1) ? Number(object.sigVerifyCostSecp256k1) : 0,
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (message.maxMemoCharacters !== 0) {
      obj.maxMemoCharacters = Math.round(message.maxMemoCharacters);
    }
    if (message.txSigLimit !== 0) {
      obj.txSigLimit = Math.round(message.txSigLimit);
    }
    if (message.txSizeCostPerByte !== 0) {
      obj.txSizeCostPerByte = Math.round(message.txSizeCostPerByte);
    }
    if (message.sigVerifyCostEd25519 !== 0) {
      obj.sigVerifyCostEd25519 = Math.round(message.sigVerifyCostEd25519);
    }
    if (message.sigVerifyCostSecp256k1 !== 0) {
      obj.sigVerifyCostSecp256k1 = Math.round(message.sigVerifyCostSecp256k1);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Params>, I>>(base?: I): Params {
    return Params.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.maxMemoCharacters = object.maxMemoCharacters ?? 0;
    message.txSigLimit = object.txSigLimit ?? 0;
    message.txSizeCostPerByte = object.txSizeCostPerByte ?? 0;
    message.sigVerifyCostEd25519 = object.sigVerifyCostEd25519 ?? 0;
    message.sigVerifyCostSecp256k1 = object.sigVerifyCostSecp256k1 ?? 0;
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
