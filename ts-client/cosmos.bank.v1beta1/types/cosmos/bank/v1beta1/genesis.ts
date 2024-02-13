/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Coin } from "../../base/v1beta1/coin";
import { Metadata, Params, SendEnabled } from "./bank";

export const protobufPackage = "cosmos.bank.v1beta1";

/** GenesisState defines the bank module's genesis state. */
export interface GenesisState {
  /** params defines all the parameters of the module. */
  params:
    | Params
    | undefined;
  /** balances is an array containing the balances of all the accounts. */
  balances: Balance[];
  /**
   * supply represents the total supply. If it is left empty, then supply will be calculated based on the provided
   * balances. Otherwise, it will be used to validate that the sum of the balances equals this amount.
   */
  supply: Coin[];
  /** denom_metadata defines the metadata of the different coins. */
  denomMetadata: Metadata[];
  /**
   * send_enabled defines the denoms where send is enabled or disabled.
   *
   * Since: cosmos-sdk 0.47
   */
  sendEnabled: SendEnabled[];
}

/**
 * Balance defines an account address and balance pair used in the bank module's
 * genesis state.
 */
export interface Balance {
  /** address is the address of the balance holder. */
  address: string;
  /** coins defines the different coins this balance holds. */
  coins: Coin[];
}

function createBaseGenesisState(): GenesisState {
  return { params: undefined, balances: [], supply: [], denomMetadata: [], sendEnabled: [] };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.balances) {
      Balance.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.supply) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.denomMetadata) {
      Metadata.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.sendEnabled) {
      SendEnabled.encode(v!, writer.uint32(42).fork()).ldelim();
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

          message.balances.push(Balance.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.supply.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.denomMetadata.push(Metadata.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.sendEnabled.push(SendEnabled.decode(reader, reader.uint32()));
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
      balances: Array.isArray(object?.balances) ? object.balances.map((e: any) => Balance.fromJSON(e)) : [],
      supply: Array.isArray(object?.supply) ? object.supply.map((e: any) => Coin.fromJSON(e)) : [],
      denomMetadata: Array.isArray(object?.denomMetadata)
        ? object.denomMetadata.map((e: any) => Metadata.fromJSON(e))
        : [],
      sendEnabled: Array.isArray(object?.sendEnabled)
        ? object.sendEnabled.map((e: any) => SendEnabled.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    if (message.balances?.length) {
      obj.balances = message.balances.map((e) => Balance.toJSON(e));
    }
    if (message.supply?.length) {
      obj.supply = message.supply.map((e) => Coin.toJSON(e));
    }
    if (message.denomMetadata?.length) {
      obj.denomMetadata = message.denomMetadata.map((e) => Metadata.toJSON(e));
    }
    if (message.sendEnabled?.length) {
      obj.sendEnabled = message.sendEnabled.map((e) => SendEnabled.toJSON(e));
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
    message.balances = object.balances?.map((e) => Balance.fromPartial(e)) || [];
    message.supply = object.supply?.map((e) => Coin.fromPartial(e)) || [];
    message.denomMetadata = object.denomMetadata?.map((e) => Metadata.fromPartial(e)) || [];
    message.sendEnabled = object.sendEnabled?.map((e) => SendEnabled.fromPartial(e)) || [];
    return message;
  },
};

function createBaseBalance(): Balance {
  return { address: "", coins: [] };
}

export const Balance = {
  encode(message: Balance, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Balance {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBalance();
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

          message.coins.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Balance {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      coins: Array.isArray(object?.coins) ? object.coins.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: Balance): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.coins?.length) {
      obj.coins = message.coins.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Balance>, I>>(base?: I): Balance {
    return Balance.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Balance>, I>>(object: I): Balance {
    const message = createBaseBalance();
    message.address = object.address ?? "";
    message.coins = object.coins?.map((e) => Coin.fromPartial(e)) || [];
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
