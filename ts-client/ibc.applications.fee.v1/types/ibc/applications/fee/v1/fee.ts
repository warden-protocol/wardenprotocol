/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../../cosmos/base/v1beta1/coin";
import { PacketId } from "../../../core/channel/v1/channel";

export const protobufPackage = "ibc.applications.fee.v1";

/** Fee defines the ICS29 receive, acknowledgement and timeout fees */
export interface Fee {
  /** the packet receive fee */
  recvFee: Coin[];
  /** the packet acknowledgement fee */
  ackFee: Coin[];
  /** the packet timeout fee */
  timeoutFee: Coin[];
}

/** PacketFee contains ICS29 relayer fees, refund address and optional list of permitted relayers */
export interface PacketFee {
  /** fee encapsulates the recv, ack and timeout fees associated with an IBC packet */
  fee:
    | Fee
    | undefined;
  /** the refund address for unspent fees */
  refundAddress: string;
  /** optional list of relayers permitted to receive fees */
  relayers: string[];
}

/** PacketFees contains a list of type PacketFee */
export interface PacketFees {
  /** list of packet fees */
  packetFees: PacketFee[];
}

/** IdentifiedPacketFees contains a list of type PacketFee and associated PacketId */
export interface IdentifiedPacketFees {
  /** unique packet identifier comprised of the channel ID, port ID and sequence */
  packetId:
    | PacketId
    | undefined;
  /** list of packet fees */
  packetFees: PacketFee[];
}

function createBaseFee(): Fee {
  return { recvFee: [], ackFee: [], timeoutFee: [] };
}

export const Fee = {
  encode(message: Fee, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.recvFee) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.ackFee) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.timeoutFee) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Fee {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFee();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.recvFee.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.ackFee.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.timeoutFee.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Fee {
    return {
      recvFee: Array.isArray(object?.recvFee) ? object.recvFee.map((e: any) => Coin.fromJSON(e)) : [],
      ackFee: Array.isArray(object?.ackFee) ? object.ackFee.map((e: any) => Coin.fromJSON(e)) : [],
      timeoutFee: Array.isArray(object?.timeoutFee) ? object.timeoutFee.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: Fee): unknown {
    const obj: any = {};
    if (message.recvFee?.length) {
      obj.recvFee = message.recvFee.map((e) => Coin.toJSON(e));
    }
    if (message.ackFee?.length) {
      obj.ackFee = message.ackFee.map((e) => Coin.toJSON(e));
    }
    if (message.timeoutFee?.length) {
      obj.timeoutFee = message.timeoutFee.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Fee>, I>>(base?: I): Fee {
    return Fee.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Fee>, I>>(object: I): Fee {
    const message = createBaseFee();
    message.recvFee = object.recvFee?.map((e) => Coin.fromPartial(e)) || [];
    message.ackFee = object.ackFee?.map((e) => Coin.fromPartial(e)) || [];
    message.timeoutFee = object.timeoutFee?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBasePacketFee(): PacketFee {
  return { fee: undefined, refundAddress: "", relayers: [] };
}

export const PacketFee = {
  encode(message: PacketFee, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fee !== undefined) {
      Fee.encode(message.fee, writer.uint32(10).fork()).ldelim();
    }
    if (message.refundAddress !== "") {
      writer.uint32(18).string(message.refundAddress);
    }
    for (const v of message.relayers) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PacketFee {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePacketFee();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fee = Fee.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.refundAddress = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.relayers.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PacketFee {
    return {
      fee: isSet(object.fee) ? Fee.fromJSON(object.fee) : undefined,
      refundAddress: isSet(object.refundAddress) ? String(object.refundAddress) : "",
      relayers: Array.isArray(object?.relayers) ? object.relayers.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: PacketFee): unknown {
    const obj: any = {};
    if (message.fee !== undefined) {
      obj.fee = Fee.toJSON(message.fee);
    }
    if (message.refundAddress !== "") {
      obj.refundAddress = message.refundAddress;
    }
    if (message.relayers?.length) {
      obj.relayers = message.relayers;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PacketFee>, I>>(base?: I): PacketFee {
    return PacketFee.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PacketFee>, I>>(object: I): PacketFee {
    const message = createBasePacketFee();
    message.fee = (object.fee !== undefined && object.fee !== null) ? Fee.fromPartial(object.fee) : undefined;
    message.refundAddress = object.refundAddress ?? "";
    message.relayers = object.relayers?.map((e) => e) || [];
    return message;
  },
};

function createBasePacketFees(): PacketFees {
  return { packetFees: [] };
}

export const PacketFees = {
  encode(message: PacketFees, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.packetFees) {
      PacketFee.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PacketFees {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePacketFees();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.packetFees.push(PacketFee.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PacketFees {
    return {
      packetFees: Array.isArray(object?.packetFees) ? object.packetFees.map((e: any) => PacketFee.fromJSON(e)) : [],
    };
  },

  toJSON(message: PacketFees): unknown {
    const obj: any = {};
    if (message.packetFees?.length) {
      obj.packetFees = message.packetFees.map((e) => PacketFee.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PacketFees>, I>>(base?: I): PacketFees {
    return PacketFees.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PacketFees>, I>>(object: I): PacketFees {
    const message = createBasePacketFees();
    message.packetFees = object.packetFees?.map((e) => PacketFee.fromPartial(e)) || [];
    return message;
  },
};

function createBaseIdentifiedPacketFees(): IdentifiedPacketFees {
  return { packetId: undefined, packetFees: [] };
}

export const IdentifiedPacketFees = {
  encode(message: IdentifiedPacketFees, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.packetId !== undefined) {
      PacketId.encode(message.packetId, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.packetFees) {
      PacketFee.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IdentifiedPacketFees {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIdentifiedPacketFees();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.packetId = PacketId.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.packetFees.push(PacketFee.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IdentifiedPacketFees {
    return {
      packetId: isSet(object.packetId) ? PacketId.fromJSON(object.packetId) : undefined,
      packetFees: Array.isArray(object?.packetFees) ? object.packetFees.map((e: any) => PacketFee.fromJSON(e)) : [],
    };
  },

  toJSON(message: IdentifiedPacketFees): unknown {
    const obj: any = {};
    if (message.packetId !== undefined) {
      obj.packetId = PacketId.toJSON(message.packetId);
    }
    if (message.packetFees?.length) {
      obj.packetFees = message.packetFees.map((e) => PacketFee.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IdentifiedPacketFees>, I>>(base?: I): IdentifiedPacketFees {
    return IdentifiedPacketFees.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IdentifiedPacketFees>, I>>(object: I): IdentifiedPacketFees {
    const message = createBaseIdentifiedPacketFees();
    message.packetId = (object.packetId !== undefined && object.packetId !== null)
      ? PacketId.fromPartial(object.packetId)
      : undefined;
    message.packetFees = object.packetFees?.map((e) => PacketFee.fromPartial(e)) || [];
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
