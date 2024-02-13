/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Coin } from "../../base/v1beta1/coin";
import { Input, Output, Params, SendEnabled } from "./bank";

export const protobufPackage = "cosmos.bank.v1beta1";

/** MsgSend represents a message to send coins from one account to another. */
export interface MsgSend {
  fromAddress: string;
  toAddress: string;
  amount: Coin[];
}

/** MsgSendResponse defines the Msg/Send response type. */
export interface MsgSendResponse {
}

/** MsgMultiSend represents an arbitrary multi-in, multi-out send message. */
export interface MsgMultiSend {
  /**
   * Inputs, despite being `repeated`, only allows one sender input. This is
   * checked in MsgMultiSend's ValidateBasic.
   */
  inputs: Input[];
  outputs: Output[];
}

/** MsgMultiSendResponse defines the Msg/MultiSend response type. */
export interface MsgMultiSendResponse {
}

/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParams {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /**
   * params defines the x/bank parameters to update.
   *
   * NOTE: All parameters must be supplied.
   */
  params: Params | undefined;
}

/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsResponse {
}

/**
 * MsgSetSendEnabled is the Msg/SetSendEnabled request type.
 *
 * Only entries to add/update/delete need to be included.
 * Existing SendEnabled entries that are not included in this
 * message are left unchanged.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgSetSendEnabled {
  /** authority is the address that controls the module. */
  authority: string;
  /** send_enabled is the list of entries to add or update. */
  sendEnabled: SendEnabled[];
  /**
   * use_default_for is a list of denoms that should use the params.default_send_enabled value.
   * Denoms listed here will have their SendEnabled entries deleted.
   * If a denom is included that doesn't have a SendEnabled entry,
   * it will be ignored.
   */
  useDefaultFor: string[];
}

/**
 * MsgSetSendEnabledResponse defines the Msg/SetSendEnabled response type.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgSetSendEnabledResponse {
}

function createBaseMsgSend(): MsgSend {
  return { fromAddress: "", toAddress: "", amount: [] };
}

export const MsgSend = {
  encode(message: MsgSend, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fromAddress !== "") {
      writer.uint32(10).string(message.fromAddress);
    }
    if (message.toAddress !== "") {
      writer.uint32(18).string(message.toAddress);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSend {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSend();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fromAddress = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.toAddress = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.amount.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSend {
    return {
      fromAddress: isSet(object.fromAddress) ? String(object.fromAddress) : "",
      toAddress: isSet(object.toAddress) ? String(object.toAddress) : "",
      amount: Array.isArray(object?.amount) ? object.amount.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: MsgSend): unknown {
    const obj: any = {};
    if (message.fromAddress !== "") {
      obj.fromAddress = message.fromAddress;
    }
    if (message.toAddress !== "") {
      obj.toAddress = message.toAddress;
    }
    if (message.amount?.length) {
      obj.amount = message.amount.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSend>, I>>(base?: I): MsgSend {
    return MsgSend.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSend>, I>>(object: I): MsgSend {
    const message = createBaseMsgSend();
    message.fromAddress = object.fromAddress ?? "";
    message.toAddress = object.toAddress ?? "";
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgSendResponse(): MsgSendResponse {
  return {};
}

export const MsgSendResponse = {
  encode(_: MsgSendResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSendResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSendResponse();
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

  fromJSON(_: any): MsgSendResponse {
    return {};
  },

  toJSON(_: MsgSendResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSendResponse>, I>>(base?: I): MsgSendResponse {
    return MsgSendResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSendResponse>, I>>(_: I): MsgSendResponse {
    const message = createBaseMsgSendResponse();
    return message;
  },
};

function createBaseMsgMultiSend(): MsgMultiSend {
  return { inputs: [], outputs: [] };
}

export const MsgMultiSend = {
  encode(message: MsgMultiSend, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.inputs) {
      Input.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.outputs) {
      Output.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMultiSend {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMultiSend();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.inputs.push(Input.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.outputs.push(Output.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgMultiSend {
    return {
      inputs: Array.isArray(object?.inputs) ? object.inputs.map((e: any) => Input.fromJSON(e)) : [],
      outputs: Array.isArray(object?.outputs) ? object.outputs.map((e: any) => Output.fromJSON(e)) : [],
    };
  },

  toJSON(message: MsgMultiSend): unknown {
    const obj: any = {};
    if (message.inputs?.length) {
      obj.inputs = message.inputs.map((e) => Input.toJSON(e));
    }
    if (message.outputs?.length) {
      obj.outputs = message.outputs.map((e) => Output.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgMultiSend>, I>>(base?: I): MsgMultiSend {
    return MsgMultiSend.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgMultiSend>, I>>(object: I): MsgMultiSend {
    const message = createBaseMsgMultiSend();
    message.inputs = object.inputs?.map((e) => Input.fromPartial(e)) || [];
    message.outputs = object.outputs?.map((e) => Output.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgMultiSendResponse(): MsgMultiSendResponse {
  return {};
}

export const MsgMultiSendResponse = {
  encode(_: MsgMultiSendResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMultiSendResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMultiSendResponse();
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

  fromJSON(_: any): MsgMultiSendResponse {
    return {};
  },

  toJSON(_: MsgMultiSendResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgMultiSendResponse>, I>>(base?: I): MsgMultiSendResponse {
    return MsgMultiSendResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgMultiSendResponse>, I>>(_: I): MsgMultiSendResponse {
    const message = createBaseMsgMultiSendResponse();
    return message;
  },
};

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

function createBaseMsgSetSendEnabled(): MsgSetSendEnabled {
  return { authority: "", sendEnabled: [], useDefaultFor: [] };
}

export const MsgSetSendEnabled = {
  encode(message: MsgSetSendEnabled, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    for (const v of message.sendEnabled) {
      SendEnabled.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.useDefaultFor) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetSendEnabled {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetSendEnabled();
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

          message.sendEnabled.push(SendEnabled.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.useDefaultFor.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSetSendEnabled {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      sendEnabled: Array.isArray(object?.sendEnabled)
        ? object.sendEnabled.map((e: any) => SendEnabled.fromJSON(e))
        : [],
      useDefaultFor: Array.isArray(object?.useDefaultFor) ? object.useDefaultFor.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: MsgSetSendEnabled): unknown {
    const obj: any = {};
    if (message.authority !== "") {
      obj.authority = message.authority;
    }
    if (message.sendEnabled?.length) {
      obj.sendEnabled = message.sendEnabled.map((e) => SendEnabled.toJSON(e));
    }
    if (message.useDefaultFor?.length) {
      obj.useDefaultFor = message.useDefaultFor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSetSendEnabled>, I>>(base?: I): MsgSetSendEnabled {
    return MsgSetSendEnabled.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSetSendEnabled>, I>>(object: I): MsgSetSendEnabled {
    const message = createBaseMsgSetSendEnabled();
    message.authority = object.authority ?? "";
    message.sendEnabled = object.sendEnabled?.map((e) => SendEnabled.fromPartial(e)) || [];
    message.useDefaultFor = object.useDefaultFor?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgSetSendEnabledResponse(): MsgSetSendEnabledResponse {
  return {};
}

export const MsgSetSendEnabledResponse = {
  encode(_: MsgSetSendEnabledResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetSendEnabledResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetSendEnabledResponse();
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

  fromJSON(_: any): MsgSetSendEnabledResponse {
    return {};
  },

  toJSON(_: MsgSetSendEnabledResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSetSendEnabledResponse>, I>>(base?: I): MsgSetSendEnabledResponse {
    return MsgSetSendEnabledResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSetSendEnabledResponse>, I>>(_: I): MsgSetSendEnabledResponse {
    const message = createBaseMsgSetSendEnabledResponse();
    return message;
  },
};

/** Msg defines the bank Msg service. */
export interface Msg {
  /** Send defines a method for sending coins from one account to another account. */
  Send(request: MsgSend): Promise<MsgSendResponse>;
  /** MultiSend defines a method for sending coins from some accounts to other accounts. */
  MultiSend(request: MsgMultiSend): Promise<MsgMultiSendResponse>;
  /**
   * UpdateParams defines a governance operation for updating the x/bank module parameters.
   * The authority is defined in the keeper.
   *
   * Since: cosmos-sdk 0.47
   */
  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  /**
   * SetSendEnabled is a governance operation for setting the SendEnabled flag
   * on any number of Denoms. Only the entries to add or update should be
   * included. Entries that already exist in the store, but that aren't
   * included in this message, will be left unchanged.
   *
   * Since: cosmos-sdk 0.47
   */
  SetSendEnabled(request: MsgSetSendEnabled): Promise<MsgSetSendEnabledResponse>;
}

export const MsgServiceName = "cosmos.bank.v1beta1.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.Send = this.Send.bind(this);
    this.MultiSend = this.MultiSend.bind(this);
    this.UpdateParams = this.UpdateParams.bind(this);
    this.SetSendEnabled = this.SetSendEnabled.bind(this);
  }
  Send(request: MsgSend): Promise<MsgSendResponse> {
    const data = MsgSend.encode(request).finish();
    const promise = this.rpc.request(this.service, "Send", data);
    return promise.then((data) => MsgSendResponse.decode(_m0.Reader.create(data)));
  }

  MultiSend(request: MsgMultiSend): Promise<MsgMultiSendResponse> {
    const data = MsgMultiSend.encode(request).finish();
    const promise = this.rpc.request(this.service, "MultiSend", data);
    return promise.then((data) => MsgMultiSendResponse.decode(_m0.Reader.create(data)));
  }

  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateParams", data);
    return promise.then((data) => MsgUpdateParamsResponse.decode(_m0.Reader.create(data)));
  }

  SetSendEnabled(request: MsgSetSendEnabled): Promise<MsgSetSendEnabledResponse> {
    const data = MsgSetSendEnabled.encode(request).finish();
    const promise = this.rpc.request(this.service, "SetSendEnabled", data);
    return promise.then((data) => MsgSetSendEnabledResponse.decode(_m0.Reader.create(data)));
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
