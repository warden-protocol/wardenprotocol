//@ts-nocheck
import { Grant, GrantAmino, GrantSDKType } from "./feegrant.js";
import _m0 from "protobufjs/minimal.js";
/** GenesisState contains a set of fee allowances, persisted from the store */
export interface GenesisState {
  allowances: Grant[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/cosmos.feegrant.v1beta1.GenesisState";
  value: Uint8Array;
}
/** GenesisState contains a set of fee allowances, persisted from the store */
export interface GenesisStateAmino {
  allowances?: GrantAmino[];
}
export interface GenesisStateAminoMsg {
  type: "cosmos-sdk/GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState contains a set of fee allowances, persisted from the store */
export interface GenesisStateSDKType {
  allowances: GrantSDKType[];
}
function createBaseGenesisState(): GenesisState {
  return {
    allowances: []
  };
}
export const GenesisState = {
  typeUrl: "/cosmos.feegrant.v1beta1.GenesisState",
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.allowances) {
      Grant.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.allowances.push(Grant.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GenesisState {
    return {
      allowances: Array.isArray(object?.allowances) ? object.allowances.map((e: any) => Grant.fromJSON(e)) : []
    };
  },
  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.allowances) {
      obj.allowances = message.allowances.map(e => e ? Grant.toJSON(e) : undefined);
    } else {
      obj.allowances = [];
    }
    return obj;
  },
  fromPartial(object: Partial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.allowances = object.allowances?.map(e => Grant.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    message.allowances = object.allowances?.map(e => Grant.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GenesisState): GenesisStateAmino {
    const obj: any = {};
    if (message.allowances) {
      obj.allowances = message.allowances.map(e => e ? Grant.toAmino(e) : undefined);
    } else {
      obj.allowances = message.allowances;
    }
    return obj;
  },
  fromAminoMsg(object: GenesisStateAminoMsg): GenesisState {
    return GenesisState.fromAmino(object.value);
  },
  toAminoMsg(message: GenesisState): GenesisStateAminoMsg {
    return {
      type: "cosmos-sdk/GenesisState",
      value: GenesisState.toAmino(message)
    };
  },
  fromProtoMsg(message: GenesisStateProtoMsg): GenesisState {
    return GenesisState.decode(message.value);
  },
  toProto(message: GenesisState): Uint8Array {
    return GenesisState.encode(message).finish();
  },
  toProtoMsg(message: GenesisState): GenesisStateProtoMsg {
    return {
      typeUrl: "/cosmos.feegrant.v1beta1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};