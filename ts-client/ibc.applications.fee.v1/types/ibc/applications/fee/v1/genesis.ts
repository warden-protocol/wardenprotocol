/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { PacketId } from "../../../core/channel/v1/channel";
import { IdentifiedPacketFees } from "./fee";

export const protobufPackage = "ibc.applications.fee.v1";

/** GenesisState defines the ICS29 fee middleware genesis state */
export interface GenesisState {
  /** list of identified packet fees */
  identifiedFees: IdentifiedPacketFees[];
  /** list of fee enabled channels */
  feeEnabledChannels: FeeEnabledChannel[];
  /** list of registered payees */
  registeredPayees: RegisteredPayee[];
  /** list of registered counterparty payees */
  registeredCounterpartyPayees: RegisteredCounterpartyPayee[];
  /** list of forward relayer addresses */
  forwardRelayers: ForwardRelayerAddress[];
}

/** FeeEnabledChannel contains the PortID & ChannelID for a fee enabled channel */
export interface FeeEnabledChannel {
  /** unique port identifier */
  portId: string;
  /** unique channel identifier */
  channelId: string;
}

/** RegisteredPayee contains the relayer address and payee address for a specific channel */
export interface RegisteredPayee {
  /** unique channel identifier */
  channelId: string;
  /** the relayer address */
  relayer: string;
  /** the payee address */
  payee: string;
}

/**
 * RegisteredCounterpartyPayee contains the relayer address and counterparty payee address for a specific channel (used
 * for recv fee distribution)
 */
export interface RegisteredCounterpartyPayee {
  /** unique channel identifier */
  channelId: string;
  /** the relayer address */
  relayer: string;
  /** the counterparty payee address */
  counterpartyPayee: string;
}

/** ForwardRelayerAddress contains the forward relayer address and PacketId used for async acknowledgements */
export interface ForwardRelayerAddress {
  /** the forward relayer address */
  address: string;
  /** unique packet identifer comprised of the channel ID, port ID and sequence */
  packetId: PacketId | undefined;
}

function createBaseGenesisState(): GenesisState {
  return {
    identifiedFees: [],
    feeEnabledChannels: [],
    registeredPayees: [],
    registeredCounterpartyPayees: [],
    forwardRelayers: [],
  };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.identifiedFees) {
      IdentifiedPacketFees.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.feeEnabledChannels) {
      FeeEnabledChannel.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.registeredPayees) {
      RegisteredPayee.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.registeredCounterpartyPayees) {
      RegisteredCounterpartyPayee.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.forwardRelayers) {
      ForwardRelayerAddress.encode(v!, writer.uint32(42).fork()).ldelim();
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

          message.identifiedFees.push(IdentifiedPacketFees.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.feeEnabledChannels.push(FeeEnabledChannel.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.registeredPayees.push(RegisteredPayee.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.registeredCounterpartyPayees.push(RegisteredCounterpartyPayee.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.forwardRelayers.push(ForwardRelayerAddress.decode(reader, reader.uint32()));
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
      identifiedFees: Array.isArray(object?.identifiedFees)
        ? object.identifiedFees.map((e: any) => IdentifiedPacketFees.fromJSON(e))
        : [],
      feeEnabledChannels: Array.isArray(object?.feeEnabledChannels)
        ? object.feeEnabledChannels.map((e: any) => FeeEnabledChannel.fromJSON(e))
        : [],
      registeredPayees: Array.isArray(object?.registeredPayees)
        ? object.registeredPayees.map((e: any) => RegisteredPayee.fromJSON(e))
        : [],
      registeredCounterpartyPayees: Array.isArray(object?.registeredCounterpartyPayees)
        ? object.registeredCounterpartyPayees.map((e: any) => RegisteredCounterpartyPayee.fromJSON(e))
        : [],
      forwardRelayers: Array.isArray(object?.forwardRelayers)
        ? object.forwardRelayers.map((e: any) => ForwardRelayerAddress.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.identifiedFees?.length) {
      obj.identifiedFees = message.identifiedFees.map((e) => IdentifiedPacketFees.toJSON(e));
    }
    if (message.feeEnabledChannels?.length) {
      obj.feeEnabledChannels = message.feeEnabledChannels.map((e) => FeeEnabledChannel.toJSON(e));
    }
    if (message.registeredPayees?.length) {
      obj.registeredPayees = message.registeredPayees.map((e) => RegisteredPayee.toJSON(e));
    }
    if (message.registeredCounterpartyPayees?.length) {
      obj.registeredCounterpartyPayees = message.registeredCounterpartyPayees.map((e) =>
        RegisteredCounterpartyPayee.toJSON(e)
      );
    }
    if (message.forwardRelayers?.length) {
      obj.forwardRelayers = message.forwardRelayers.map((e) => ForwardRelayerAddress.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisState>, I>>(base?: I): GenesisState {
    return GenesisState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.identifiedFees = object.identifiedFees?.map((e) => IdentifiedPacketFees.fromPartial(e)) || [];
    message.feeEnabledChannels = object.feeEnabledChannels?.map((e) => FeeEnabledChannel.fromPartial(e)) || [];
    message.registeredPayees = object.registeredPayees?.map((e) => RegisteredPayee.fromPartial(e)) || [];
    message.registeredCounterpartyPayees =
      object.registeredCounterpartyPayees?.map((e) => RegisteredCounterpartyPayee.fromPartial(e)) || [];
    message.forwardRelayers = object.forwardRelayers?.map((e) => ForwardRelayerAddress.fromPartial(e)) || [];
    return message;
  },
};

function createBaseFeeEnabledChannel(): FeeEnabledChannel {
  return { portId: "", channelId: "" };
}

export const FeeEnabledChannel = {
  encode(message: FeeEnabledChannel, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FeeEnabledChannel {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFeeEnabledChannel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.portId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channelId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FeeEnabledChannel {
    return {
      portId: isSet(object.portId) ? String(object.portId) : "",
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
    };
  },

  toJSON(message: FeeEnabledChannel): unknown {
    const obj: any = {};
    if (message.portId !== "") {
      obj.portId = message.portId;
    }
    if (message.channelId !== "") {
      obj.channelId = message.channelId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FeeEnabledChannel>, I>>(base?: I): FeeEnabledChannel {
    return FeeEnabledChannel.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FeeEnabledChannel>, I>>(object: I): FeeEnabledChannel {
    const message = createBaseFeeEnabledChannel();
    message.portId = object.portId ?? "";
    message.channelId = object.channelId ?? "";
    return message;
  },
};

function createBaseRegisteredPayee(): RegisteredPayee {
  return { channelId: "", relayer: "", payee: "" };
}

export const RegisteredPayee = {
  encode(message: RegisteredPayee, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channelId !== "") {
      writer.uint32(10).string(message.channelId);
    }
    if (message.relayer !== "") {
      writer.uint32(18).string(message.relayer);
    }
    if (message.payee !== "") {
      writer.uint32(26).string(message.payee);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegisteredPayee {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisteredPayee();
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

          message.relayer = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.payee = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RegisteredPayee {
    return {
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
      relayer: isSet(object.relayer) ? String(object.relayer) : "",
      payee: isSet(object.payee) ? String(object.payee) : "",
    };
  },

  toJSON(message: RegisteredPayee): unknown {
    const obj: any = {};
    if (message.channelId !== "") {
      obj.channelId = message.channelId;
    }
    if (message.relayer !== "") {
      obj.relayer = message.relayer;
    }
    if (message.payee !== "") {
      obj.payee = message.payee;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RegisteredPayee>, I>>(base?: I): RegisteredPayee {
    return RegisteredPayee.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RegisteredPayee>, I>>(object: I): RegisteredPayee {
    const message = createBaseRegisteredPayee();
    message.channelId = object.channelId ?? "";
    message.relayer = object.relayer ?? "";
    message.payee = object.payee ?? "";
    return message;
  },
};

function createBaseRegisteredCounterpartyPayee(): RegisteredCounterpartyPayee {
  return { channelId: "", relayer: "", counterpartyPayee: "" };
}

export const RegisteredCounterpartyPayee = {
  encode(message: RegisteredCounterpartyPayee, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channelId !== "") {
      writer.uint32(10).string(message.channelId);
    }
    if (message.relayer !== "") {
      writer.uint32(18).string(message.relayer);
    }
    if (message.counterpartyPayee !== "") {
      writer.uint32(26).string(message.counterpartyPayee);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegisteredCounterpartyPayee {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisteredCounterpartyPayee();
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

          message.relayer = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.counterpartyPayee = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RegisteredCounterpartyPayee {
    return {
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
      relayer: isSet(object.relayer) ? String(object.relayer) : "",
      counterpartyPayee: isSet(object.counterpartyPayee) ? String(object.counterpartyPayee) : "",
    };
  },

  toJSON(message: RegisteredCounterpartyPayee): unknown {
    const obj: any = {};
    if (message.channelId !== "") {
      obj.channelId = message.channelId;
    }
    if (message.relayer !== "") {
      obj.relayer = message.relayer;
    }
    if (message.counterpartyPayee !== "") {
      obj.counterpartyPayee = message.counterpartyPayee;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RegisteredCounterpartyPayee>, I>>(base?: I): RegisteredCounterpartyPayee {
    return RegisteredCounterpartyPayee.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RegisteredCounterpartyPayee>, I>>(object: I): RegisteredCounterpartyPayee {
    const message = createBaseRegisteredCounterpartyPayee();
    message.channelId = object.channelId ?? "";
    message.relayer = object.relayer ?? "";
    message.counterpartyPayee = object.counterpartyPayee ?? "";
    return message;
  },
};

function createBaseForwardRelayerAddress(): ForwardRelayerAddress {
  return { address: "", packetId: undefined };
}

export const ForwardRelayerAddress = {
  encode(message: ForwardRelayerAddress, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.packetId !== undefined) {
      PacketId.encode(message.packetId, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ForwardRelayerAddress {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseForwardRelayerAddress();
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

          message.packetId = PacketId.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ForwardRelayerAddress {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      packetId: isSet(object.packetId) ? PacketId.fromJSON(object.packetId) : undefined,
    };
  },

  toJSON(message: ForwardRelayerAddress): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.packetId !== undefined) {
      obj.packetId = PacketId.toJSON(message.packetId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ForwardRelayerAddress>, I>>(base?: I): ForwardRelayerAddress {
    return ForwardRelayerAddress.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ForwardRelayerAddress>, I>>(object: I): ForwardRelayerAddress {
    const message = createBaseForwardRelayerAddress();
    message.address = object.address ?? "";
    message.packetId = (object.packetId !== undefined && object.packetId !== null)
      ? PacketId.fromPartial(object.packetId)
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
