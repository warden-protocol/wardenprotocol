//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params.js";
import { Action, ActionAmino, ActionSDKType } from "./action.js";
import { Rule, RuleAmino, RuleSDKType } from "./rule.js";
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet } from "../../../helpers.js";
import { JsonSafe } from "../../../json-safe.js";
/** GenesisState defines the act module's genesis state. */
export interface GenesisState {
  /** params defines all the parameters of the module. */
  params: Params;
  actions: Action[];
  rules: Rule[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/warden.act.v1beta1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the act module's genesis state. */
export interface GenesisStateAmino {
  /** params defines all the parameters of the module. */
  params: ParamsAmino;
  actions: ActionAmino[];
  rules: RuleAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/warden.act.v1beta1.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the act module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  actions: ActionSDKType[];
  rules: RuleSDKType[];
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    actions: [],
    rules: []
  };
}
export const GenesisState = {
  typeUrl: "/warden.act.v1beta1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.actions) {
      Action.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.rules) {
      Rule.encode(v!, writer.uint32(26).fork()).ldelim();
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
          message.actions.push(Action.decode(reader, reader.uint32()));
          break;
        case 3:
          message.rules.push(Rule.decode(reader, reader.uint32()));
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
      actions: Array.isArray(object?.actions) ? object.actions.map((e: any) => Action.fromJSON(e)) : [],
      rules: Array.isArray(object?.rules) ? object.rules.map((e: any) => Rule.fromJSON(e)) : []
    };
  },
  toJSON(message: GenesisState): JsonSafe<GenesisState> {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.actions) {
      obj.actions = message.actions.map(e => e ? Action.toJSON(e) : undefined);
    } else {
      obj.actions = [];
    }
    if (message.rules) {
      obj.rules = message.rules.map(e => e ? Rule.toJSON(e) : undefined);
    } else {
      obj.rules = [];
    }
    return obj;
  },
  fromPartial(object: Partial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    message.actions = object.actions?.map(e => Action.fromPartial(e)) || [];
    message.rules = object.rules?.map(e => Rule.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    message.actions = object.actions?.map(e => Action.fromAmino(e)) || [];
    message.rules = object.rules?.map(e => Rule.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GenesisState): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : Params.toAmino(Params.fromPartial({}));
    if (message.actions) {
      obj.actions = message.actions.map(e => e ? Action.toAmino(e) : undefined);
    } else {
      obj.actions = message.actions;
    }
    if (message.rules) {
      obj.rules = message.rules.map(e => e ? Rule.toAmino(e) : undefined);
    } else {
      obj.rules = message.rules;
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
      typeUrl: "/warden.act.v1beta1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};