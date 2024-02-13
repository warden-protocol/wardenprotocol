/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { Timestamp } from "../../../google/protobuf/timestamp";

export const protobufPackage = "cosmos.authz.v1beta1";

/** Since: cosmos-sdk 0.43 */

/**
 * GenericAuthorization gives the grantee unrestricted permissions to execute
 * the provided method on behalf of the granter's account.
 */
export interface GenericAuthorization {
  /** Msg, identified by it's type URL, to grant unrestricted permissions to execute */
  msg: string;
}

/**
 * Grant gives permissions to execute
 * the provide method with expiration time.
 */
export interface Grant {
  authorization:
    | Any
    | undefined;
  /**
   * time when the grant will expire and will be pruned. If null, then the grant
   * doesn't have a time expiration (other conditions  in `authorization`
   * may apply to invalidate the grant)
   */
  expiration: Date | undefined;
}

/**
 * GrantAuthorization extends a grant with both the addresses of the grantee and granter.
 * It is used in genesis.proto and query.proto
 */
export interface GrantAuthorization {
  granter: string;
  grantee: string;
  authorization: Any | undefined;
  expiration: Date | undefined;
}

/** GrantQueueItem contains the list of TypeURL of a sdk.Msg. */
export interface GrantQueueItem {
  /** msg_type_urls contains the list of TypeURL of a sdk.Msg. */
  msgTypeUrls: string[];
}

function createBaseGenericAuthorization(): GenericAuthorization {
  return { msg: "" };
}

export const GenericAuthorization = {
  encode(message: GenericAuthorization, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.msg !== "") {
      writer.uint32(10).string(message.msg);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenericAuthorization {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenericAuthorization();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.msg = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenericAuthorization {
    return { msg: isSet(object.msg) ? String(object.msg) : "" };
  },

  toJSON(message: GenericAuthorization): unknown {
    const obj: any = {};
    if (message.msg !== "") {
      obj.msg = message.msg;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenericAuthorization>, I>>(base?: I): GenericAuthorization {
    return GenericAuthorization.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenericAuthorization>, I>>(object: I): GenericAuthorization {
    const message = createBaseGenericAuthorization();
    message.msg = object.msg ?? "";
    return message;
  },
};

function createBaseGrant(): Grant {
  return { authorization: undefined, expiration: undefined };
}

export const Grant = {
  encode(message: Grant, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authorization !== undefined) {
      Any.encode(message.authorization, writer.uint32(10).fork()).ldelim();
    }
    if (message.expiration !== undefined) {
      Timestamp.encode(toTimestamp(message.expiration), writer.uint32(18).fork()).ldelim();
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

          message.authorization = Any.decode(reader, reader.uint32());
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

  fromJSON(object: any): Grant {
    return {
      authorization: isSet(object.authorization) ? Any.fromJSON(object.authorization) : undefined,
      expiration: isSet(object.expiration) ? fromJsonTimestamp(object.expiration) : undefined,
    };
  },

  toJSON(message: Grant): unknown {
    const obj: any = {};
    if (message.authorization !== undefined) {
      obj.authorization = Any.toJSON(message.authorization);
    }
    if (message.expiration !== undefined) {
      obj.expiration = message.expiration.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Grant>, I>>(base?: I): Grant {
    return Grant.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Grant>, I>>(object: I): Grant {
    const message = createBaseGrant();
    message.authorization = (object.authorization !== undefined && object.authorization !== null)
      ? Any.fromPartial(object.authorization)
      : undefined;
    message.expiration = object.expiration ?? undefined;
    return message;
  },
};

function createBaseGrantAuthorization(): GrantAuthorization {
  return { granter: "", grantee: "", authorization: undefined, expiration: undefined };
}

export const GrantAuthorization = {
  encode(message: GrantAuthorization, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.granter !== "") {
      writer.uint32(10).string(message.granter);
    }
    if (message.grantee !== "") {
      writer.uint32(18).string(message.grantee);
    }
    if (message.authorization !== undefined) {
      Any.encode(message.authorization, writer.uint32(26).fork()).ldelim();
    }
    if (message.expiration !== undefined) {
      Timestamp.encode(toTimestamp(message.expiration), writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GrantAuthorization {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGrantAuthorization();
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

          message.authorization = Any.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
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

  fromJSON(object: any): GrantAuthorization {
    return {
      granter: isSet(object.granter) ? String(object.granter) : "",
      grantee: isSet(object.grantee) ? String(object.grantee) : "",
      authorization: isSet(object.authorization) ? Any.fromJSON(object.authorization) : undefined,
      expiration: isSet(object.expiration) ? fromJsonTimestamp(object.expiration) : undefined,
    };
  },

  toJSON(message: GrantAuthorization): unknown {
    const obj: any = {};
    if (message.granter !== "") {
      obj.granter = message.granter;
    }
    if (message.grantee !== "") {
      obj.grantee = message.grantee;
    }
    if (message.authorization !== undefined) {
      obj.authorization = Any.toJSON(message.authorization);
    }
    if (message.expiration !== undefined) {
      obj.expiration = message.expiration.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GrantAuthorization>, I>>(base?: I): GrantAuthorization {
    return GrantAuthorization.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GrantAuthorization>, I>>(object: I): GrantAuthorization {
    const message = createBaseGrantAuthorization();
    message.granter = object.granter ?? "";
    message.grantee = object.grantee ?? "";
    message.authorization = (object.authorization !== undefined && object.authorization !== null)
      ? Any.fromPartial(object.authorization)
      : undefined;
    message.expiration = object.expiration ?? undefined;
    return message;
  },
};

function createBaseGrantQueueItem(): GrantQueueItem {
  return { msgTypeUrls: [] };
}

export const GrantQueueItem = {
  encode(message: GrantQueueItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.msgTypeUrls) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GrantQueueItem {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGrantQueueItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.msgTypeUrls.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GrantQueueItem {
    return { msgTypeUrls: Array.isArray(object?.msgTypeUrls) ? object.msgTypeUrls.map((e: any) => String(e)) : [] };
  },

  toJSON(message: GrantQueueItem): unknown {
    const obj: any = {};
    if (message.msgTypeUrls?.length) {
      obj.msgTypeUrls = message.msgTypeUrls;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GrantQueueItem>, I>>(base?: I): GrantQueueItem {
    return GrantQueueItem.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GrantQueueItem>, I>>(object: I): GrantQueueItem {
    const message = createBaseGrantQueueItem();
    message.msgTypeUrls = object.msgTypeUrls?.map((e) => e) || [];
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
