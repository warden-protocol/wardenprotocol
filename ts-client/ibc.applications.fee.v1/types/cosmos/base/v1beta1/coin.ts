/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cosmos.base.v1beta1";

/**
 * Coin defines a token with a denomination and an amount.
 *
 * NOTE: The amount field is an Int which implements the custom method
 * signatures required by gogoproto.
 */
export interface Coin {
  denom: string;
  amount: string;
}

/**
 * DecCoin defines a token with a denomination and a decimal amount.
 *
 * NOTE: The amount field is an Dec which implements the custom method
 * signatures required by gogoproto.
 */
export interface DecCoin {
  denom: string;
  amount: string;
}

function createBaseCoin(): Coin {
  return { denom: "", amount: "" };
}

export const Coin = {
  encode(message: Coin, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Coin {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCoin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.amount = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Coin {
    return {
      denom: isSet(object.denom) ? String(object.denom) : "",
      amount: isSet(object.amount) ? String(object.amount) : "",
    };
  },

  toJSON(message: Coin): unknown {
    const obj: any = {};
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    if (message.amount !== "") {
      obj.amount = message.amount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Coin>, I>>(base?: I): Coin {
    return Coin.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Coin>, I>>(object: I): Coin {
    const message = createBaseCoin();
    message.denom = object.denom ?? "";
    message.amount = object.amount ?? "";
    return message;
  },
};

function createBaseDecCoin(): DecCoin {
  return { denom: "", amount: "" };
}

export const DecCoin = {
  encode(message: DecCoin, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DecCoin {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDecCoin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.amount = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DecCoin {
    return {
      denom: isSet(object.denom) ? String(object.denom) : "",
      amount: isSet(object.amount) ? String(object.amount) : "",
    };
  },

  toJSON(message: DecCoin): unknown {
    const obj: any = {};
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    if (message.amount !== "") {
      obj.amount = message.amount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DecCoin>, I>>(base?: I): DecCoin {
    return DecCoin.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DecCoin>, I>>(object: I): DecCoin {
    const message = createBaseDecCoin();
    message.denom = object.denom ?? "";
    message.amount = object.amount ?? "";
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
