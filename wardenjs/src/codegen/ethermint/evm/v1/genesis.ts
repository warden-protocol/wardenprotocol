//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType, State, StateAmino, StateSDKType } from "./evm.js";
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet } from "../../../helpers.js";
import { JsonSafe } from "../../../json-safe.js";
/** GenesisState defines the evm module's genesis state. */
export interface GenesisState {
  /** accounts is an array containing the ethereum genesis accounts. */
  accounts: GenesisAccount[];
  /** params defines all the parameters of the module. */
  params: Params;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/ethermint.evm.v1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the evm module's genesis state. */
export interface GenesisStateAmino {
  /** accounts is an array containing the ethereum genesis accounts. */
  accounts?: GenesisAccountAmino[];
  /** params defines all the parameters of the module. */
  params?: ParamsAmino;
}
export interface GenesisStateAminoMsg {
  type: "/ethermint.evm.v1.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the evm module's genesis state. */
export interface GenesisStateSDKType {
  accounts: GenesisAccountSDKType[];
  params: ParamsSDKType;
}
/**
 * GenesisAccount defines an account to be initialized in the genesis state.
 * Its main difference between with Geth's GenesisAccount is that it uses a
 * custom storage type and that it doesn't contain the private key field.
 */
export interface GenesisAccount {
  /** address defines an ethereum hex formated address of an account */
  address: string;
  /** code defines the hex bytes of the account code. */
  code: string;
  /** storage defines the set of state key values for the account. */
  storage: State[];
}
export interface GenesisAccountProtoMsg {
  typeUrl: "/ethermint.evm.v1.GenesisAccount";
  value: Uint8Array;
}
/**
 * GenesisAccount defines an account to be initialized in the genesis state.
 * Its main difference between with Geth's GenesisAccount is that it uses a
 * custom storage type and that it doesn't contain the private key field.
 */
export interface GenesisAccountAmino {
  /** address defines an ethereum hex formated address of an account */
  address?: string;
  /** code defines the hex bytes of the account code. */
  code?: string;
  /** storage defines the set of state key values for the account. */
  storage?: StateAmino[];
}
export interface GenesisAccountAminoMsg {
  type: "/ethermint.evm.v1.GenesisAccount";
  value: GenesisAccountAmino;
}
/**
 * GenesisAccount defines an account to be initialized in the genesis state.
 * Its main difference between with Geth's GenesisAccount is that it uses a
 * custom storage type and that it doesn't contain the private key field.
 */
export interface GenesisAccountSDKType {
  address: string;
  code: string;
  storage: StateSDKType[];
}
function createBaseGenesisState(): GenesisState {
  return {
    accounts: [],
    params: Params.fromPartial({})
  };
}
export const GenesisState = {
  typeUrl: "/ethermint.evm.v1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.accounts) {
      GenesisAccount.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accounts.push(GenesisAccount.decode(reader, reader.uint32()));
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GenesisState {
    return {
      accounts: Array.isArray(object?.accounts) ? object.accounts.map((e: any) => GenesisAccount.fromJSON(e)) : [],
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined
    };
  },
  toJSON(message: GenesisState): JsonSafe<GenesisState> {
    const obj: any = {};
    if (message.accounts) {
      obj.accounts = message.accounts.map(e => e ? GenesisAccount.toJSON(e) : undefined);
    } else {
      obj.accounts = [];
    }
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },
  fromPartial(object: Partial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.accounts = object.accounts?.map(e => GenesisAccount.fromPartial(e)) || [];
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    message.accounts = object.accounts?.map(e => GenesisAccount.fromAmino(e)) || [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: GenesisState): GenesisStateAmino {
    const obj: any = {};
    if (message.accounts) {
      obj.accounts = message.accounts.map(e => e ? GenesisAccount.toAmino(e) : undefined);
    } else {
      obj.accounts = message.accounts;
    }
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    return obj;
  },
  fromAminoMsg(object: GenesisStateAminoMsg): GenesisState {
    return GenesisState.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisStateProtoMsg): GenesisState {
    return GenesisState.decode(message.value);
  },
  toProto(message: GenesisState): Uint8Array {
    return GenesisState.encode(message).finish();
  },
  toProtoMsg(message: GenesisState): GenesisStateProtoMsg {
    return {
      typeUrl: "/ethermint.evm.v1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};
function createBaseGenesisAccount(): GenesisAccount {
  return {
    address: "",
    code: "",
    storage: []
  };
}
export const GenesisAccount = {
  typeUrl: "/ethermint.evm.v1.GenesisAccount",
  encode(message: GenesisAccount, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.code !== "") {
      writer.uint32(18).string(message.code);
    }
    for (const v of message.storage) {
      State.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GenesisAccount {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.code = reader.string();
          break;
        case 3:
          message.storage.push(State.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GenesisAccount {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      code: isSet(object.code) ? String(object.code) : "",
      storage: Array.isArray(object?.storage) ? object.storage.map((e: any) => State.fromJSON(e)) : []
    };
  },
  toJSON(message: GenesisAccount): JsonSafe<GenesisAccount> {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.code !== undefined && (obj.code = message.code);
    if (message.storage) {
      obj.storage = message.storage.map(e => e ? State.toJSON(e) : undefined);
    } else {
      obj.storage = [];
    }
    return obj;
  },
  fromPartial(object: Partial<GenesisAccount>): GenesisAccount {
    const message = createBaseGenesisAccount();
    message.address = object.address ?? "";
    message.code = object.code ?? "";
    message.storage = object.storage?.map(e => State.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisAccountAmino): GenesisAccount {
    const message = createBaseGenesisAccount();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.code !== undefined && object.code !== null) {
      message.code = object.code;
    }
    message.storage = object.storage?.map(e => State.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GenesisAccount): GenesisAccountAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    obj.code = message.code === "" ? undefined : message.code;
    if (message.storage) {
      obj.storage = message.storage.map(e => e ? State.toAmino(e) : undefined);
    } else {
      obj.storage = message.storage;
    }
    return obj;
  },
  fromAminoMsg(object: GenesisAccountAminoMsg): GenesisAccount {
    return GenesisAccount.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisAccountProtoMsg): GenesisAccount {
    return GenesisAccount.decode(message.value);
  },
  toProto(message: GenesisAccount): Uint8Array {
    return GenesisAccount.encode(message).finish();
  },
  toProtoMsg(message: GenesisAccount): GenesisAccountProtoMsg {
    return {
      typeUrl: "/ethermint.evm.v1.GenesisAccount",
      value: GenesisAccount.encode(message).finish()
    };
  }
};