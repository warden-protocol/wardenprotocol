//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params.js";
import { Keychain, KeychainAmino, KeychainSDKType } from "./keychain.js";
import { Space, SpaceAmino, SpaceSDKType } from "./space.js";
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet } from "../../../helpers.js";
/** GenesisState defines the warden module's genesis state. */
export interface GenesisState {
  /** params defines all the parameters of the module. */
  params: Params;
  keychains: Keychain[];
  spaces: Space[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/warden.warden.v1beta1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the warden module's genesis state. */
export interface GenesisStateAmino {
  /** params defines all the parameters of the module. */
  params: ParamsAmino;
  keychains?: KeychainAmino[];
  spaces?: SpaceAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/warden.warden.v1beta1.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the warden module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  keychains: KeychainSDKType[];
  spaces: SpaceSDKType[];
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    keychains: [],
    spaces: []
  };
}
export const GenesisState = {
  typeUrl: "/warden.warden.v1beta1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.keychains) {
      Keychain.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.spaces) {
      Space.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.keychains.push(Keychain.decode(reader, reader.uint32()));
          break;
        case 3:
          message.spaces.push(Space.decode(reader, reader.uint32()));
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
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      keychains: Array.isArray(object?.keychains) ? object.keychains.map((e: any) => Keychain.fromJSON(e)) : [],
      spaces: Array.isArray(object?.spaces) ? object.spaces.map((e: any) => Space.fromJSON(e)) : []
    };
  },
  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.keychains) {
      obj.keychains = message.keychains.map(e => e ? Keychain.toJSON(e) : undefined);
    } else {
      obj.keychains = [];
    }
    if (message.spaces) {
      obj.spaces = message.spaces.map(e => e ? Space.toJSON(e) : undefined);
    } else {
      obj.spaces = [];
    }
    return obj;
  },
  fromPartial(object: Partial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    message.keychains = object.keychains?.map(e => Keychain.fromPartial(e)) || [];
    message.spaces = object.spaces?.map(e => Space.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    message.keychains = object.keychains?.map(e => Keychain.fromAmino(e)) || [];
    message.spaces = object.spaces?.map(e => Space.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GenesisState): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : Params.toAmino(Params.fromPartial({}));
    if (message.keychains) {
      obj.keychains = message.keychains.map(e => e ? Keychain.toAmino(e) : undefined);
    } else {
      obj.keychains = message.keychains;
    }
    if (message.spaces) {
      obj.spaces = message.spaces.map(e => e ? Space.toAmino(e) : undefined);
    } else {
      obj.spaces = message.spaces;
    }
    return obj;
  },
  fromAminoMsg(object: GenesisStateAminoMsg): GenesisState {
    return GenesisState.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisStateProtoMsg): GenesisState {
    return GenesisState.decode(message.value);
  },
  toProto(message: GenesisState): Uint8Array {
    return GenesisState.encode(message).finish();
  },
  toProtoMsg(message: GenesisState): GenesisStateProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};