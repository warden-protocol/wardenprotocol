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

/**
 * IntProto defines a Protobuf wrapper around an Int object.
 * Deprecated: Prefer to use math.Int directly. It supports binary Marshal and Unmarshal.
 */
export interface IntProto {
  int: string;
}

/**
 * DecProto defines a Protobuf wrapper around a Dec object.
 * Deprecated: Prefer to use math.LegacyDec directly. It supports binary Marshal and Unmarshal.
 */
export interface DecProto {
  dec: string;
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

function createBaseIntProto(): IntProto {
  return { int: "" };
}

export const IntProto = {
  encode(message: IntProto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.int !== "") {
      writer.uint32(10).string(message.int);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IntProto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIntProto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.int = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IntProto {
    return { int: isSet(object.int) ? String(object.int) : "" };
  },

  toJSON(message: IntProto): unknown {
    const obj: any = {};
    if (message.int !== "") {
      obj.int = message.int;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IntProto>, I>>(base?: I): IntProto {
    return IntProto.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IntProto>, I>>(object: I): IntProto {
    const message = createBaseIntProto();
    message.int = object.int ?? "";
    return message;
  },
};

function createBaseDecProto(): DecProto {
  return { dec: "" };
}

export const DecProto = {
  encode(message: DecProto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.dec !== "") {
      writer.uint32(10).string(message.dec);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DecProto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDecProto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.dec = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DecProto {
    return { dec: isSet(object.dec) ? String(object.dec) : "" };
  },

  toJSON(message: DecProto): unknown {
    const obj: any = {};
    if (message.dec !== "") {
      obj.dec = message.dec;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DecProto>, I>>(base?: I): DecProto {
    return DecProto.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DecProto>, I>>(object: I): DecProto {
    const message = createBaseDecProto();
    message.dec = object.dec ?? "";
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
