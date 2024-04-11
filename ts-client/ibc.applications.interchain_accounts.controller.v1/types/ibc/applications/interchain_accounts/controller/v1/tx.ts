/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Order, orderFromJSON, orderToJSON } from "../../../../core/channel/v1/channel";
import { InterchainAccountPacketData } from "../../v1/packet";
import { Params } from "./controller";

export const protobufPackage = "ibc.applications.interchain_accounts.controller.v1";

/** MsgRegisterInterchainAccount defines the payload for Msg/RegisterAccount */
export interface MsgRegisterInterchainAccount {
  owner: string;
  connectionId: string;
  version: string;
  ordering: Order;
}

/** MsgRegisterInterchainAccountResponse defines the response for Msg/RegisterAccount */
export interface MsgRegisterInterchainAccountResponse {
  channelId: string;
  portId: string;
}

/** MsgSendTx defines the payload for Msg/SendTx */
export interface MsgSendTx {
  owner: string;
  connectionId: string;
  packetData:
    | InterchainAccountPacketData
    | undefined;
  /**
   * Relative timeout timestamp provided will be added to the current block time during transaction execution.
   * The timeout timestamp must be non-zero.
   */
  relativeTimeout: number;
}

/** MsgSendTxResponse defines the response for MsgSendTx */
export interface MsgSendTxResponse {
  sequence: number;
}

/** MsgUpdateParams defines the payload for Msg/UpdateParams */
export interface MsgUpdateParams {
  /** signer address */
  signer: string;
  /**
   * params defines the 27-interchain-accounts/controller parameters to update.
   *
   * NOTE: All parameters must be supplied.
   */
  params: Params | undefined;
}

/** MsgUpdateParamsResponse defines the response for Msg/UpdateParams */
export interface MsgUpdateParamsResponse {
}

function createBaseMsgRegisterInterchainAccount(): MsgRegisterInterchainAccount {
  return { owner: "", connectionId: "", version: "", ordering: 0 };
}

export const MsgRegisterInterchainAccount = {
  encode(message: MsgRegisterInterchainAccount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.connectionId !== "") {
      writer.uint32(18).string(message.connectionId);
    }
    if (message.version !== "") {
      writer.uint32(26).string(message.version);
    }
    if (message.ordering !== 0) {
      writer.uint32(32).int32(message.ordering);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterInterchainAccount {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterInterchainAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.owner = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.connectionId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.version = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.ordering = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgRegisterInterchainAccount {
    return {
      owner: isSet(object.owner) ? String(object.owner) : "",
      connectionId: isSet(object.connectionId) ? String(object.connectionId) : "",
      version: isSet(object.version) ? String(object.version) : "",
      ordering: isSet(object.ordering) ? orderFromJSON(object.ordering) : 0,
    };
  },

  toJSON(message: MsgRegisterInterchainAccount): unknown {
    const obj: any = {};
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (message.connectionId !== "") {
      obj.connectionId = message.connectionId;
    }
    if (message.version !== "") {
      obj.version = message.version;
    }
    if (message.ordering !== 0) {
      obj.ordering = orderToJSON(message.ordering);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRegisterInterchainAccount>, I>>(base?: I): MsgRegisterInterchainAccount {
    return MsgRegisterInterchainAccount.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRegisterInterchainAccount>, I>>(object: I): MsgRegisterInterchainAccount {
    const message = createBaseMsgRegisterInterchainAccount();
    message.owner = object.owner ?? "";
    message.connectionId = object.connectionId ?? "";
    message.version = object.version ?? "";
    message.ordering = object.ordering ?? 0;
    return message;
  },
};

function createBaseMsgRegisterInterchainAccountResponse(): MsgRegisterInterchainAccountResponse {
  return { channelId: "", portId: "" };
}

export const MsgRegisterInterchainAccountResponse = {
  encode(message: MsgRegisterInterchainAccountResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channelId !== "") {
      writer.uint32(10).string(message.channelId);
    }
    if (message.portId !== "") {
      writer.uint32(18).string(message.portId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterInterchainAccountResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterInterchainAccountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.channelId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.portId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgRegisterInterchainAccountResponse {
    return {
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
      portId: isSet(object.portId) ? String(object.portId) : "",
    };
  },

  toJSON(message: MsgRegisterInterchainAccountResponse): unknown {
    const obj: any = {};
    if (message.channelId !== "") {
      obj.channelId = message.channelId;
    }
    if (message.portId !== "") {
      obj.portId = message.portId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRegisterInterchainAccountResponse>, I>>(
    base?: I,
  ): MsgRegisterInterchainAccountResponse {
    return MsgRegisterInterchainAccountResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRegisterInterchainAccountResponse>, I>>(
    object: I,
  ): MsgRegisterInterchainAccountResponse {
    const message = createBaseMsgRegisterInterchainAccountResponse();
    message.channelId = object.channelId ?? "";
    message.portId = object.portId ?? "";
    return message;
  },
};

function createBaseMsgSendTx(): MsgSendTx {
  return { owner: "", connectionId: "", packetData: undefined, relativeTimeout: 0 };
}

export const MsgSendTx = {
  encode(message: MsgSendTx, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.connectionId !== "") {
      writer.uint32(18).string(message.connectionId);
    }
    if (message.packetData !== undefined) {
      InterchainAccountPacketData.encode(message.packetData, writer.uint32(26).fork()).ldelim();
    }
    if (message.relativeTimeout !== 0) {
      writer.uint32(32).uint64(message.relativeTimeout);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSendTx {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSendTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.owner = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.connectionId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.packetData = InterchainAccountPacketData.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.relativeTimeout = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSendTx {
    return {
      owner: isSet(object.owner) ? String(object.owner) : "",
      connectionId: isSet(object.connectionId) ? String(object.connectionId) : "",
      packetData: isSet(object.packetData) ? InterchainAccountPacketData.fromJSON(object.packetData) : undefined,
      relativeTimeout: isSet(object.relativeTimeout) ? Number(object.relativeTimeout) : 0,
    };
  },

  toJSON(message: MsgSendTx): unknown {
    const obj: any = {};
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (message.connectionId !== "") {
      obj.connectionId = message.connectionId;
    }
    if (message.packetData !== undefined) {
      obj.packetData = InterchainAccountPacketData.toJSON(message.packetData);
    }
    if (message.relativeTimeout !== 0) {
      obj.relativeTimeout = Math.round(message.relativeTimeout);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSendTx>, I>>(base?: I): MsgSendTx {
    return MsgSendTx.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSendTx>, I>>(object: I): MsgSendTx {
    const message = createBaseMsgSendTx();
    message.owner = object.owner ?? "";
    message.connectionId = object.connectionId ?? "";
    message.packetData = (object.packetData !== undefined && object.packetData !== null)
      ? InterchainAccountPacketData.fromPartial(object.packetData)
      : undefined;
    message.relativeTimeout = object.relativeTimeout ?? 0;
    return message;
  },
};

function createBaseMsgSendTxResponse(): MsgSendTxResponse {
  return { sequence: 0 };
}

export const MsgSendTxResponse = {
  encode(message: MsgSendTxResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sequence !== 0) {
      writer.uint32(8).uint64(message.sequence);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSendTxResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSendTxResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
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

  fromJSON(object: any): MsgSendTxResponse {
    return { sequence: isSet(object.sequence) ? Number(object.sequence) : 0 };
  },

  toJSON(message: MsgSendTxResponse): unknown {
    const obj: any = {};
    if (message.sequence !== 0) {
      obj.sequence = Math.round(message.sequence);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSendTxResponse>, I>>(base?: I): MsgSendTxResponse {
    return MsgSendTxResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSendTxResponse>, I>>(object: I): MsgSendTxResponse {
    const message = createBaseMsgSendTxResponse();
    message.sequence = object.sequence ?? 0;
    return message;
  },
};

function createBaseMsgUpdateParams(): MsgUpdateParams {
  return { signer: "", params: undefined };
}

export const MsgUpdateParams = {
  encode(message: MsgUpdateParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
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

          message.signer = reader.string();
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
      signer: isSet(object.signer) ? String(object.signer) : "",
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: MsgUpdateParams): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
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
    message.signer = object.signer ?? "";
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

/** Msg defines the 27-interchain-accounts/controller Msg service. */
export interface Msg {
  /** RegisterInterchainAccount defines a rpc handler for MsgRegisterInterchainAccount. */
  RegisterInterchainAccount(request: MsgRegisterInterchainAccount): Promise<MsgRegisterInterchainAccountResponse>;
  /** SendTx defines a rpc handler for MsgSendTx. */
  SendTx(request: MsgSendTx): Promise<MsgSendTxResponse>;
  /** UpdateParams defines a rpc handler for MsgUpdateParams. */
  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}

export const MsgServiceName = "ibc.applications.interchain_accounts.controller.v1.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.RegisterInterchainAccount = this.RegisterInterchainAccount.bind(this);
    this.SendTx = this.SendTx.bind(this);
    this.UpdateParams = this.UpdateParams.bind(this);
  }
  RegisterInterchainAccount(request: MsgRegisterInterchainAccount): Promise<MsgRegisterInterchainAccountResponse> {
    const data = MsgRegisterInterchainAccount.encode(request).finish();
    const promise = this.rpc.request(this.service, "RegisterInterchainAccount", data);
    return promise.then((data) => MsgRegisterInterchainAccountResponse.decode(_m0.Reader.create(data)));
  }

  SendTx(request: MsgSendTx): Promise<MsgSendTxResponse> {
    const data = MsgSendTx.encode(request).finish();
    const promise = this.rpc.request(this.service, "SendTx", data);
    return promise.then((data) => MsgSendTxResponse.decode(_m0.Reader.create(data)));
  }

  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateParams", data);
    return promise.then((data) => MsgUpdateParamsResponse.decode(_m0.Reader.create(data)));
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
