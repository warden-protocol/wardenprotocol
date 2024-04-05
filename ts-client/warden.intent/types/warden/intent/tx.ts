/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Params } from "./params";

export const protobufPackage = "warden.intent";

/** MsgUpdateParams is the Msg/UpdateParams request type. */
export interface MsgUpdateParams {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /** NOTE: All parameters must be supplied. */
  params: Params | undefined;
}

/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponse {
}

export interface MsgApproveAction {
  creator: string;
  actionType: string;
  actionId: number;
}

export interface MsgApproveActionResponse {
  status: string;
}

export interface MsgNewIntent {
  creator: string;
  name: string;
  definition: string;
}

export interface MsgNewIntentResponse {
  id: number;
}

export interface MsgUpdateIntent {
  creator: string;
  id: number;
  name: string;
  definition: string;
}

export interface MsgUpdateIntentResponse {
}

export interface MsgRevokeAction {
  creator: string;
  actionType: string;
  actionId: number;
}

export interface MsgRevokeActionResponse {
}

function createBaseMsgUpdateParams(): MsgUpdateParams {
  return { authority: "", params: undefined };
}

export const MsgUpdateParams = {
  encode(message: MsgUpdateParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParams {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParams();
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

          message.params = Params.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateParams {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: MsgUpdateParams): unknown {
    const obj: any = {};
    if (message.authority !== "") {
      obj.authority = message.authority;
    }
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateParams>, I>>(base?: I): MsgUpdateParams {
    return MsgUpdateParams.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateParams>, I>>(object: I): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}

export const MsgUpdateParamsResponse = {
  encode(_: MsgUpdateParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParamsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateParamsResponse {
    return {};
  },

  toJSON(_: MsgUpdateParamsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateParamsResponse>, I>>(base?: I): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateParamsResponse>, I>>(_: I): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
};

function createBaseMsgApproveAction(): MsgApproveAction {
  return { creator: "", actionType: "", actionId: 0 };
}

export const MsgApproveAction = {
  encode(message: MsgApproveAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.actionType !== "") {
      writer.uint32(18).string(message.actionType);
    }
    if (message.actionId !== 0) {
      writer.uint32(24).uint64(message.actionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgApproveAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgApproveAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.actionType = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.actionId = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgApproveAction {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      actionType: isSet(object.actionType) ? String(object.actionType) : "",
      actionId: isSet(object.actionId) ? Number(object.actionId) : 0,
    };
  },

  toJSON(message: MsgApproveAction): unknown {
    const obj: any = {};
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.actionType !== "") {
      obj.actionType = message.actionType;
    }
    if (message.actionId !== 0) {
      obj.actionId = Math.round(message.actionId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgApproveAction>, I>>(base?: I): MsgApproveAction {
    return MsgApproveAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgApproveAction>, I>>(object: I): MsgApproveAction {
    const message = createBaseMsgApproveAction();
    message.creator = object.creator ?? "";
    message.actionType = object.actionType ?? "";
    message.actionId = object.actionId ?? 0;
    return message;
  },
};

function createBaseMsgApproveActionResponse(): MsgApproveActionResponse {
  return { status: "" };
}

export const MsgApproveActionResponse = {
  encode(message: MsgApproveActionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== "") {
      writer.uint32(10).string(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgApproveActionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgApproveActionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.status = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgApproveActionResponse {
    return { status: isSet(object.status) ? String(object.status) : "" };
  },

  toJSON(message: MsgApproveActionResponse): unknown {
    const obj: any = {};
    if (message.status !== "") {
      obj.status = message.status;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgApproveActionResponse>, I>>(base?: I): MsgApproveActionResponse {
    return MsgApproveActionResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgApproveActionResponse>, I>>(object: I): MsgApproveActionResponse {
    const message = createBaseMsgApproveActionResponse();
    message.status = object.status ?? "";
    return message;
  },
};

function createBaseMsgNewIntent(): MsgNewIntent {
  return { creator: "", name: "", definition: "" };
}

export const MsgNewIntent = {
  encode(message: MsgNewIntent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.definition !== "") {
      writer.uint32(26).string(message.definition);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgNewIntent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgNewIntent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator = reader.string();
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

          message.definition = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgNewIntent {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      name: isSet(object.name) ? String(object.name) : "",
      definition: isSet(object.definition) ? String(object.definition) : "",
    };
  },

  toJSON(message: MsgNewIntent): unknown {
    const obj: any = {};
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.definition !== "") {
      obj.definition = message.definition;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgNewIntent>, I>>(base?: I): MsgNewIntent {
    return MsgNewIntent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgNewIntent>, I>>(object: I): MsgNewIntent {
    const message = createBaseMsgNewIntent();
    message.creator = object.creator ?? "";
    message.name = object.name ?? "";
    message.definition = object.definition ?? "";
    return message;
  },
};

function createBaseMsgNewIntentResponse(): MsgNewIntentResponse {
  return { id: 0 };
}

export const MsgNewIntentResponse = {
  encode(message: MsgNewIntentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgNewIntentResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgNewIntentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgNewIntentResponse {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: MsgNewIntentResponse): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgNewIntentResponse>, I>>(base?: I): MsgNewIntentResponse {
    return MsgNewIntentResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgNewIntentResponse>, I>>(object: I): MsgNewIntentResponse {
    const message = createBaseMsgNewIntentResponse();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseMsgUpdateIntent(): MsgUpdateIntent {
  return { creator: "", id: 0, name: "", definition: "" };
}

export const MsgUpdateIntent = {
  encode(message: MsgUpdateIntent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.definition !== "") {
      writer.uint32(34).string(message.definition);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateIntent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateIntent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.id = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.definition = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateIntent {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
      name: isSet(object.name) ? String(object.name) : "",
      definition: isSet(object.definition) ? String(object.definition) : "",
    };
  },

  toJSON(message: MsgUpdateIntent): unknown {
    const obj: any = {};
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.definition !== "") {
      obj.definition = message.definition;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateIntent>, I>>(base?: I): MsgUpdateIntent {
    return MsgUpdateIntent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateIntent>, I>>(object: I): MsgUpdateIntent {
    const message = createBaseMsgUpdateIntent();
    message.creator = object.creator ?? "";
    message.id = object.id ?? 0;
    message.name = object.name ?? "";
    message.definition = object.definition ?? "";
    return message;
  },
};

function createBaseMsgUpdateIntentResponse(): MsgUpdateIntentResponse {
  return {};
}

export const MsgUpdateIntentResponse = {
  encode(_: MsgUpdateIntentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateIntentResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateIntentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateIntentResponse {
    return {};
  },

  toJSON(_: MsgUpdateIntentResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateIntentResponse>, I>>(base?: I): MsgUpdateIntentResponse {
    return MsgUpdateIntentResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateIntentResponse>, I>>(_: I): MsgUpdateIntentResponse {
    const message = createBaseMsgUpdateIntentResponse();
    return message;
  },
};

function createBaseMsgRevokeAction(): MsgRevokeAction {
  return { creator: "", actionType: "", actionId: 0 };
}

export const MsgRevokeAction = {
  encode(message: MsgRevokeAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.actionType !== "") {
      writer.uint32(18).string(message.actionType);
    }
    if (message.actionId !== 0) {
      writer.uint32(24).uint64(message.actionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRevokeAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRevokeAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.actionType = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.actionId = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgRevokeAction {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      actionType: isSet(object.actionType) ? String(object.actionType) : "",
      actionId: isSet(object.actionId) ? Number(object.actionId) : 0,
    };
  },

  toJSON(message: MsgRevokeAction): unknown {
    const obj: any = {};
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.actionType !== "") {
      obj.actionType = message.actionType;
    }
    if (message.actionId !== 0) {
      obj.actionId = Math.round(message.actionId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRevokeAction>, I>>(base?: I): MsgRevokeAction {
    return MsgRevokeAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRevokeAction>, I>>(object: I): MsgRevokeAction {
    const message = createBaseMsgRevokeAction();
    message.creator = object.creator ?? "";
    message.actionType = object.actionType ?? "";
    message.actionId = object.actionId ?? 0;
    return message;
  },
};

function createBaseMsgRevokeActionResponse(): MsgRevokeActionResponse {
  return {};
}

export const MsgRevokeActionResponse = {
  encode(_: MsgRevokeActionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRevokeActionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRevokeActionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgRevokeActionResponse {
    return {};
  },

  toJSON(_: MsgRevokeActionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRevokeActionResponse>, I>>(base?: I): MsgRevokeActionResponse {
    return MsgRevokeActionResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRevokeActionResponse>, I>>(_: I): MsgRevokeActionResponse {
    const message = createBaseMsgRevokeActionResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /**
   * UpdateParams defines a (governance) operation for updating the module
   * parameters. The authority defaults to the x/gov module account.
   */
  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  /** Add an approval to an existing Action. */
  ApproveAction(request: MsgApproveAction): Promise<MsgApproveActionResponse>;
  /** Create a new intent. */
  NewIntent(request: MsgNewIntent): Promise<MsgNewIntentResponse>;
  /** Update an existing intent name and definition. */
  UpdateIntent(request: MsgUpdateIntent): Promise<MsgUpdateIntentResponse>;
  /** Revoke an existing Action while in pending state. */
  RevokeAction(request: MsgRevokeAction): Promise<MsgRevokeActionResponse>;
}

export const MsgServiceName = "warden.intent.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.UpdateParams = this.UpdateParams.bind(this);
    this.ApproveAction = this.ApproveAction.bind(this);
    this.NewIntent = this.NewIntent.bind(this);
    this.UpdateIntent = this.UpdateIntent.bind(this);
    this.RevokeAction = this.RevokeAction.bind(this);
  }
  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateParams", data);
    return promise.then((data) => MsgUpdateParamsResponse.decode(_m0.Reader.create(data)));
  }

  ApproveAction(request: MsgApproveAction): Promise<MsgApproveActionResponse> {
    const data = MsgApproveAction.encode(request).finish();
    const promise = this.rpc.request(this.service, "ApproveAction", data);
    return promise.then((data) => MsgApproveActionResponse.decode(_m0.Reader.create(data)));
  }

  NewIntent(request: MsgNewIntent): Promise<MsgNewIntentResponse> {
    const data = MsgNewIntent.encode(request).finish();
    const promise = this.rpc.request(this.service, "NewIntent", data);
    return promise.then((data) => MsgNewIntentResponse.decode(_m0.Reader.create(data)));
  }

  UpdateIntent(request: MsgUpdateIntent): Promise<MsgUpdateIntentResponse> {
    const data = MsgUpdateIntent.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateIntent", data);
    return promise.then((data) => MsgUpdateIntentResponse.decode(_m0.Reader.create(data)));
  }

  RevokeAction(request: MsgRevokeAction): Promise<MsgRevokeActionResponse> {
    const data = MsgRevokeAction.encode(request).finish();
    const promise = this.rpc.request(this.service, "RevokeAction", data);
    return promise.then((data) => MsgRevokeActionResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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
