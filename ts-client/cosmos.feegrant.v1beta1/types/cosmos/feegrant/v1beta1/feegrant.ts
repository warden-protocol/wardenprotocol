/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { Duration } from "../../../google/protobuf/duration";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { Coin } from "../../base/v1beta1/coin";

export const protobufPackage = "cosmos.feegrant.v1beta1";

/** Since: cosmos-sdk 0.43 */

/**
 * BasicAllowance implements Allowance with a one-time grant of coins
 * that optionally expires. The grantee can use up to SpendLimit to cover fees.
 */
export interface BasicAllowance {
  /**
   * spend_limit specifies the maximum amount of coins that can be spent
   * by this allowance and will be updated as coins are spent. If it is
   * empty, there is no spend limit and any amount of coins can be spent.
   */
  spendLimit: Coin[];
  /** expiration specifies an optional time when this allowance expires */
  expiration: Date | undefined;
}

/**
 * PeriodicAllowance extends Allowance to allow for both a maximum cap,
 * as well as a limit per time period.
 */
export interface PeriodicAllowance {
  /** basic specifies a struct of `BasicAllowance` */
  basic:
    | BasicAllowance
    | undefined;
  /**
   * period specifies the time duration in which period_spend_limit coins can
   * be spent before that allowance is reset
   */
  period:
    | Duration
    | undefined;
  /**
   * period_spend_limit specifies the maximum number of coins that can be spent
   * in the period
   */
  periodSpendLimit: Coin[];
  /** period_can_spend is the number of coins left to be spent before the period_reset time */
  periodCanSpend: Coin[];
  /**
   * period_reset is the time at which this period resets and a new one begins,
   * it is calculated from the start time of the first transaction after the
   * last period ended
   */
  periodReset: Date | undefined;
}

/** AllowedMsgAllowance creates allowance only for specified message types. */
export interface AllowedMsgAllowance {
  /** allowance can be any of basic and periodic fee allowance. */
  allowance:
    | Any
    | undefined;
  /** allowed_messages are the messages for which the grantee has the access. */
  allowedMessages: string[];
}

/** Grant is stored in the KVStore to record a grant with full context */
export interface Grant {
  /** granter is the address of the user granting an allowance of their funds. */
  granter: string;
  /** grantee is the address of the user being granted an allowance of another user's funds. */
  grantee: string;
  /** allowance can be any of basic, periodic, allowed fee allowance. */
  allowance: Any | undefined;
}

function createBaseBasicAllowance(): BasicAllowance {
  return { spendLimit: [], expiration: undefined };
}

export const BasicAllowance = {
  encode(message: BasicAllowance, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.spendLimit) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.expiration !== undefined) {
      Timestamp.encode(toTimestamp(message.expiration), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BasicAllowance {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBasicAllowance();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.spendLimit.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.expiration = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BasicAllowance {
    return {
      spendLimit: Array.isArray(object?.spendLimit) ? object.spendLimit.map((e: any) => Coin.fromJSON(e)) : [],
      expiration: isSet(object.expiration) ? fromJsonTimestamp(object.expiration) : undefined,
    };
  },

  toJSON(message: BasicAllowance): unknown {
    const obj: any = {};
    if (message.spendLimit?.length) {
      obj.spendLimit = message.spendLimit.map((e) => Coin.toJSON(e));
    }
    if (message.expiration !== undefined) {
      obj.expiration = message.expiration.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BasicAllowance>, I>>(base?: I): BasicAllowance {
    return BasicAllowance.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BasicAllowance>, I>>(object: I): BasicAllowance {
    const message = createBaseBasicAllowance();
    message.spendLimit = object.spendLimit?.map((e) => Coin.fromPartial(e)) || [];
    message.expiration = object.expiration ?? undefined;
    return message;
  },
};

function createBasePeriodicAllowance(): PeriodicAllowance {
  return { basic: undefined, period: undefined, periodSpendLimit: [], periodCanSpend: [], periodReset: undefined };
}

export const PeriodicAllowance = {
  encode(message: PeriodicAllowance, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.basic !== undefined) {
      BasicAllowance.encode(message.basic, writer.uint32(10).fork()).ldelim();
    }
    if (message.period !== undefined) {
      Duration.encode(message.period, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.periodSpendLimit) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.periodCanSpend) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.periodReset !== undefined) {
      Timestamp.encode(toTimestamp(message.periodReset), writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PeriodicAllowance {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePeriodicAllowance();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.basic = BasicAllowance.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.period = Duration.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.periodSpendLimit.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.periodCanSpend.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.periodReset = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PeriodicAllowance {
    return {
      basic: isSet(object.basic) ? BasicAllowance.fromJSON(object.basic) : undefined,
      period: isSet(object.period) ? Duration.fromJSON(object.period) : undefined,
      periodSpendLimit: Array.isArray(object?.periodSpendLimit)
        ? object.periodSpendLimit.map((e: any) => Coin.fromJSON(e))
        : [],
      periodCanSpend: Array.isArray(object?.periodCanSpend)
        ? object.periodCanSpend.map((e: any) => Coin.fromJSON(e))
        : [],
      periodReset: isSet(object.periodReset) ? fromJsonTimestamp(object.periodReset) : undefined,
    };
  },

  toJSON(message: PeriodicAllowance): unknown {
    const obj: any = {};
    if (message.basic !== undefined) {
      obj.basic = BasicAllowance.toJSON(message.basic);
    }
    if (message.period !== undefined) {
      obj.period = Duration.toJSON(message.period);
    }
    if (message.periodSpendLimit?.length) {
      obj.periodSpendLimit = message.periodSpendLimit.map((e) => Coin.toJSON(e));
    }
    if (message.periodCanSpend?.length) {
      obj.periodCanSpend = message.periodCanSpend.map((e) => Coin.toJSON(e));
    }
    if (message.periodReset !== undefined) {
      obj.periodReset = message.periodReset.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PeriodicAllowance>, I>>(base?: I): PeriodicAllowance {
    return PeriodicAllowance.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PeriodicAllowance>, I>>(object: I): PeriodicAllowance {
    const message = createBasePeriodicAllowance();
    message.basic = (object.basic !== undefined && object.basic !== null)
      ? BasicAllowance.fromPartial(object.basic)
      : undefined;
    message.period = (object.period !== undefined && object.period !== null)
      ? Duration.fromPartial(object.period)
      : undefined;
    message.periodSpendLimit = object.periodSpendLimit?.map((e) => Coin.fromPartial(e)) || [];
    message.periodCanSpend = object.periodCanSpend?.map((e) => Coin.fromPartial(e)) || [];
    message.periodReset = object.periodReset ?? undefined;
    return message;
  },
};

function createBaseAllowedMsgAllowance(): AllowedMsgAllowance {
  return { allowance: undefined, allowedMessages: [] };
}

export const AllowedMsgAllowance = {
  encode(message: AllowedMsgAllowance, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.allowance !== undefined) {
      Any.encode(message.allowance, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.allowedMessages) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AllowedMsgAllowance {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllowedMsgAllowance();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.allowance = Any.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.allowedMessages.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AllowedMsgAllowance {
    return {
      allowance: isSet(object.allowance) ? Any.fromJSON(object.allowance) : undefined,
      allowedMessages: Array.isArray(object?.allowedMessages) ? object.allowedMessages.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: AllowedMsgAllowance): unknown {
    const obj: any = {};
    if (message.allowance !== undefined) {
      obj.allowance = Any.toJSON(message.allowance);
    }
    if (message.allowedMessages?.length) {
      obj.allowedMessages = message.allowedMessages;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AllowedMsgAllowance>, I>>(base?: I): AllowedMsgAllowance {
    return AllowedMsgAllowance.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AllowedMsgAllowance>, I>>(object: I): AllowedMsgAllowance {
    const message = createBaseAllowedMsgAllowance();
    message.allowance = (object.allowance !== undefined && object.allowance !== null)
      ? Any.fromPartial(object.allowance)
      : undefined;
    message.allowedMessages = object.allowedMessages?.map((e) => e) || [];
    return message;
  },
};

function createBaseGrant(): Grant {
  return { granter: "", grantee: "", allowance: undefined };
}

export const Grant = {
  encode(message: Grant, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.granter !== "") {
      writer.uint32(10).string(message.granter);
    }
    if (message.grantee !== "") {
      writer.uint32(18).string(message.grantee);
    }
    if (message.allowance !== undefined) {
      Any.encode(message.allowance, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Grant {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGrant();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.granter = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.grantee = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.allowance = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Grant {
    return {
      granter: isSet(object.granter) ? String(object.granter) : "",
      grantee: isSet(object.grantee) ? String(object.grantee) : "",
      allowance: isSet(object.allowance) ? Any.fromJSON(object.allowance) : undefined,
    };
  },

  toJSON(message: Grant): unknown {
    const obj: any = {};
    if (message.granter !== "") {
      obj.granter = message.granter;
    }
    if (message.grantee !== "") {
      obj.grantee = message.grantee;
    }
    if (message.allowance !== undefined) {
      obj.allowance = Any.toJSON(message.allowance);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Grant>, I>>(base?: I): Grant {
    return Grant.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Grant>, I>>(object: I): Grant {
    const message = createBaseGrant();
    message.granter = object.granter ?? "";
    message.grantee = object.grantee ?? "";
    message.allowance = (object.allowance !== undefined && object.allowance !== null)
      ? Any.fromPartial(object.allowance)
      : undefined;
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

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
