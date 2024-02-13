/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Permissions } from "./types";

export const protobufPackage = "cosmos.circuit.v1";

/** MsgAuthorizeCircuitBreaker defines the Msg/AuthorizeCircuitBreaker request type. */
export interface MsgAuthorizeCircuitBreaker {
  /**
   * granter is the granter of the circuit breaker permissions and must have
   * LEVEL_SUPER_ADMIN.
   */
  granter: string;
  /** grantee is the account authorized with the provided permissions. */
  grantee: string;
  /**
   * permissions are the circuit breaker permissions that the grantee receives.
   * These will overwrite any existing permissions. LEVEL_NONE_UNSPECIFIED can
   * be specified to revoke all permissions.
   */
  permissions: Permissions | undefined;
}

/** MsgAuthorizeCircuitBreakerResponse defines the Msg/AuthorizeCircuitBreaker response type. */
export interface MsgAuthorizeCircuitBreakerResponse {
  success: boolean;
}

/** MsgTripCircuitBreaker defines the Msg/TripCircuitBreaker request type. */
export interface MsgTripCircuitBreaker {
  /** authority is the account authorized to trip the circuit breaker. */
  authority: string;
  /**
   * msg_type_urls specifies a list of type URLs to immediately stop processing.
   * IF IT IS LEFT EMPTY, ALL MSG PROCESSING WILL STOP IMMEDIATELY.
   * This value is validated against the authority's permissions and if the
   * authority does not have permissions to trip the specified msg type URLs
   * (or all URLs), the operation will fail.
   */
  msgTypeUrls: string[];
}

/** MsgTripCircuitBreakerResponse defines the Msg/TripCircuitBreaker response type. */
export interface MsgTripCircuitBreakerResponse {
  success: boolean;
}

/** MsgResetCircuitBreaker defines the Msg/ResetCircuitBreaker request type. */
export interface MsgResetCircuitBreaker {
  /** authority is the account authorized to trip or reset the circuit breaker. */
  authority: string;
  /**
   * msg_type_urls specifies a list of Msg type URLs to resume processing. If
   * it is left empty all Msg processing for type URLs that the account is
   * authorized to trip will resume.
   */
  msgTypeUrls: string[];
}

/** MsgResetCircuitBreakerResponse defines the Msg/ResetCircuitBreaker response type. */
export interface MsgResetCircuitBreakerResponse {
  success: boolean;
}

function createBaseMsgAuthorizeCircuitBreaker(): MsgAuthorizeCircuitBreaker {
  return { granter: "", grantee: "", permissions: undefined };
}

export const MsgAuthorizeCircuitBreaker = {
  encode(message: MsgAuthorizeCircuitBreaker, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.granter !== "") {
      writer.uint32(10).string(message.granter);
    }
    if (message.grantee !== "") {
      writer.uint32(18).string(message.grantee);
    }
    if (message.permissions !== undefined) {
      Permissions.encode(message.permissions, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAuthorizeCircuitBreaker {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAuthorizeCircuitBreaker();
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

          message.permissions = Permissions.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgAuthorizeCircuitBreaker {
    return {
      granter: isSet(object.granter) ? String(object.granter) : "",
      grantee: isSet(object.grantee) ? String(object.grantee) : "",
      permissions: isSet(object.permissions) ? Permissions.fromJSON(object.permissions) : undefined,
    };
  },

  toJSON(message: MsgAuthorizeCircuitBreaker): unknown {
    const obj: any = {};
    if (message.granter !== "") {
      obj.granter = message.granter;
    }
    if (message.grantee !== "") {
      obj.grantee = message.grantee;
    }
    if (message.permissions !== undefined) {
      obj.permissions = Permissions.toJSON(message.permissions);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAuthorizeCircuitBreaker>, I>>(base?: I): MsgAuthorizeCircuitBreaker {
    return MsgAuthorizeCircuitBreaker.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAuthorizeCircuitBreaker>, I>>(object: I): MsgAuthorizeCircuitBreaker {
    const message = createBaseMsgAuthorizeCircuitBreaker();
    message.granter = object.granter ?? "";
    message.grantee = object.grantee ?? "";
    message.permissions = (object.permissions !== undefined && object.permissions !== null)
      ? Permissions.fromPartial(object.permissions)
      : undefined;
    return message;
  },
};

function createBaseMsgAuthorizeCircuitBreakerResponse(): MsgAuthorizeCircuitBreakerResponse {
  return { success: false };
}

export const MsgAuthorizeCircuitBreakerResponse = {
  encode(message: MsgAuthorizeCircuitBreakerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAuthorizeCircuitBreakerResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAuthorizeCircuitBreakerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.success = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgAuthorizeCircuitBreakerResponse {
    return { success: isSet(object.success) ? Boolean(object.success) : false };
  },

  toJSON(message: MsgAuthorizeCircuitBreakerResponse): unknown {
    const obj: any = {};
    if (message.success === true) {
      obj.success = message.success;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAuthorizeCircuitBreakerResponse>, I>>(
    base?: I,
  ): MsgAuthorizeCircuitBreakerResponse {
    return MsgAuthorizeCircuitBreakerResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAuthorizeCircuitBreakerResponse>, I>>(
    object: I,
  ): MsgAuthorizeCircuitBreakerResponse {
    const message = createBaseMsgAuthorizeCircuitBreakerResponse();
    message.success = object.success ?? false;
    return message;
  },
};

function createBaseMsgTripCircuitBreaker(): MsgTripCircuitBreaker {
  return { authority: "", msgTypeUrls: [] };
}

export const MsgTripCircuitBreaker = {
  encode(message: MsgTripCircuitBreaker, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    for (const v of message.msgTypeUrls) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTripCircuitBreaker {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTripCircuitBreaker();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authority = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): MsgTripCircuitBreaker {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      msgTypeUrls: Array.isArray(object?.msgTypeUrls) ? object.msgTypeUrls.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: MsgTripCircuitBreaker): unknown {
    const obj: any = {};
    if (message.authority !== "") {
      obj.authority = message.authority;
    }
    if (message.msgTypeUrls?.length) {
      obj.msgTypeUrls = message.msgTypeUrls;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgTripCircuitBreaker>, I>>(base?: I): MsgTripCircuitBreaker {
    return MsgTripCircuitBreaker.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgTripCircuitBreaker>, I>>(object: I): MsgTripCircuitBreaker {
    const message = createBaseMsgTripCircuitBreaker();
    message.authority = object.authority ?? "";
    message.msgTypeUrls = object.msgTypeUrls?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgTripCircuitBreakerResponse(): MsgTripCircuitBreakerResponse {
  return { success: false };
}

export const MsgTripCircuitBreakerResponse = {
  encode(message: MsgTripCircuitBreakerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTripCircuitBreakerResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTripCircuitBreakerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.success = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgTripCircuitBreakerResponse {
    return { success: isSet(object.success) ? Boolean(object.success) : false };
  },

  toJSON(message: MsgTripCircuitBreakerResponse): unknown {
    const obj: any = {};
    if (message.success === true) {
      obj.success = message.success;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgTripCircuitBreakerResponse>, I>>(base?: I): MsgTripCircuitBreakerResponse {
    return MsgTripCircuitBreakerResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgTripCircuitBreakerResponse>, I>>(
    object: I,
  ): MsgTripCircuitBreakerResponse {
    const message = createBaseMsgTripCircuitBreakerResponse();
    message.success = object.success ?? false;
    return message;
  },
};

function createBaseMsgResetCircuitBreaker(): MsgResetCircuitBreaker {
  return { authority: "", msgTypeUrls: [] };
}

export const MsgResetCircuitBreaker = {
  encode(message: MsgResetCircuitBreaker, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    for (const v of message.msgTypeUrls) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgResetCircuitBreaker {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgResetCircuitBreaker();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authority = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
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

  fromJSON(object: any): MsgResetCircuitBreaker {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      msgTypeUrls: Array.isArray(object?.msgTypeUrls) ? object.msgTypeUrls.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: MsgResetCircuitBreaker): unknown {
    const obj: any = {};
    if (message.authority !== "") {
      obj.authority = message.authority;
    }
    if (message.msgTypeUrls?.length) {
      obj.msgTypeUrls = message.msgTypeUrls;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgResetCircuitBreaker>, I>>(base?: I): MsgResetCircuitBreaker {
    return MsgResetCircuitBreaker.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgResetCircuitBreaker>, I>>(object: I): MsgResetCircuitBreaker {
    const message = createBaseMsgResetCircuitBreaker();
    message.authority = object.authority ?? "";
    message.msgTypeUrls = object.msgTypeUrls?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgResetCircuitBreakerResponse(): MsgResetCircuitBreakerResponse {
  return { success: false };
}

export const MsgResetCircuitBreakerResponse = {
  encode(message: MsgResetCircuitBreakerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgResetCircuitBreakerResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgResetCircuitBreakerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.success = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgResetCircuitBreakerResponse {
    return { success: isSet(object.success) ? Boolean(object.success) : false };
  },

  toJSON(message: MsgResetCircuitBreakerResponse): unknown {
    const obj: any = {};
    if (message.success === true) {
      obj.success = message.success;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgResetCircuitBreakerResponse>, I>>(base?: I): MsgResetCircuitBreakerResponse {
    return MsgResetCircuitBreakerResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgResetCircuitBreakerResponse>, I>>(
    object: I,
  ): MsgResetCircuitBreakerResponse {
    const message = createBaseMsgResetCircuitBreakerResponse();
    message.success = object.success ?? false;
    return message;
  },
};

/** Msg defines the circuit Msg service. */
export interface Msg {
  /**
   * AuthorizeCircuitBreaker allows a super-admin to grant (or revoke) another
   * account's circuit breaker permissions.
   */
  AuthorizeCircuitBreaker(request: MsgAuthorizeCircuitBreaker): Promise<MsgAuthorizeCircuitBreakerResponse>;
  /** TripCircuitBreaker pauses processing of Msg's in the state machine. */
  TripCircuitBreaker(request: MsgTripCircuitBreaker): Promise<MsgTripCircuitBreakerResponse>;
  /**
   * ResetCircuitBreaker resumes processing of Msg's in the state machine that
   * have been been paused using TripCircuitBreaker.
   */
  ResetCircuitBreaker(request: MsgResetCircuitBreaker): Promise<MsgResetCircuitBreakerResponse>;
}

export const MsgServiceName = "cosmos.circuit.v1.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.AuthorizeCircuitBreaker = this.AuthorizeCircuitBreaker.bind(this);
    this.TripCircuitBreaker = this.TripCircuitBreaker.bind(this);
    this.ResetCircuitBreaker = this.ResetCircuitBreaker.bind(this);
  }
  AuthorizeCircuitBreaker(request: MsgAuthorizeCircuitBreaker): Promise<MsgAuthorizeCircuitBreakerResponse> {
    const data = MsgAuthorizeCircuitBreaker.encode(request).finish();
    const promise = this.rpc.request(this.service, "AuthorizeCircuitBreaker", data);
    return promise.then((data) => MsgAuthorizeCircuitBreakerResponse.decode(_m0.Reader.create(data)));
  }

  TripCircuitBreaker(request: MsgTripCircuitBreaker): Promise<MsgTripCircuitBreakerResponse> {
    const data = MsgTripCircuitBreaker.encode(request).finish();
    const promise = this.rpc.request(this.service, "TripCircuitBreaker", data);
    return promise.then((data) => MsgTripCircuitBreakerResponse.decode(_m0.Reader.create(data)));
  }

  ResetCircuitBreaker(request: MsgResetCircuitBreaker): Promise<MsgResetCircuitBreakerResponse> {
    const data = MsgResetCircuitBreaker.encode(request).finish();
    const promise = this.rpc.request(this.service, "ResetCircuitBreaker", data);
    return promise.then((data) => MsgResetCircuitBreakerResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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
