//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { Long, isSet } from "../../helpers";
import * as _m0 from "protobufjs/minimal";
/** MsgUpdateParams is the Msg/UpdateParams request type. */
export interface MsgUpdateParams {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /** NOTE: All parameters must be supplied. */
  params: Params;
}
export interface MsgUpdateParamsProtoMsg {
  typeUrl: "/warden.intent.MsgUpdateParams";
  value: Uint8Array;
}
/** MsgUpdateParams is the Msg/UpdateParams request type. */
export interface MsgUpdateParamsAmino {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority?: string;
  /** NOTE: All parameters must be supplied. */
  params: ParamsAmino;
}
export interface MsgUpdateParamsAminoMsg {
  type: "warden/x/intent/MsgUpdateParams";
  value: MsgUpdateParamsAmino;
}
/** MsgUpdateParams is the Msg/UpdateParams request type. */
export interface MsgUpdateParamsSDKType {
  authority: string;
  params: ParamsSDKType;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponse {}
export interface MsgUpdateParamsResponseProtoMsg {
  typeUrl: "/warden.intent.MsgUpdateParamsResponse";
  value: Uint8Array;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/warden.intent.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponseSDKType {}
export interface MsgApproveAction {
  creator: string;
  actionType: string;
  actionId: Long;
}
export interface MsgApproveActionProtoMsg {
  typeUrl: "/warden.intent.MsgApproveAction";
  value: Uint8Array;
}
export interface MsgApproveActionAmino {
  creator?: string;
  action_type?: string;
  action_id?: string;
}
export interface MsgApproveActionAminoMsg {
  type: "/warden.intent.MsgApproveAction";
  value: MsgApproveActionAmino;
}
export interface MsgApproveActionSDKType {
  creator: string;
  action_type: string;
  action_id: Long;
}
export interface MsgApproveActionResponse {
  status: string;
}
export interface MsgApproveActionResponseProtoMsg {
  typeUrl: "/warden.intent.MsgApproveActionResponse";
  value: Uint8Array;
}
export interface MsgApproveActionResponseAmino {
  status?: string;
}
export interface MsgApproveActionResponseAminoMsg {
  type: "/warden.intent.MsgApproveActionResponse";
  value: MsgApproveActionResponseAmino;
}
export interface MsgApproveActionResponseSDKType {
  status: string;
}
export interface MsgNewIntent {
  creator: string;
  name: string;
  definition: string;
}
export interface MsgNewIntentProtoMsg {
  typeUrl: "/warden.intent.MsgNewIntent";
  value: Uint8Array;
}
export interface MsgNewIntentAmino {
  creator?: string;
  name?: string;
  definition?: string;
}
export interface MsgNewIntentAminoMsg {
  type: "/warden.intent.MsgNewIntent";
  value: MsgNewIntentAmino;
}
export interface MsgNewIntentSDKType {
  creator: string;
  name: string;
  definition: string;
}
export interface MsgNewIntentResponse {
  id: Long;
}
export interface MsgNewIntentResponseProtoMsg {
  typeUrl: "/warden.intent.MsgNewIntentResponse";
  value: Uint8Array;
}
export interface MsgNewIntentResponseAmino {
  id?: string;
}
export interface MsgNewIntentResponseAminoMsg {
  type: "/warden.intent.MsgNewIntentResponse";
  value: MsgNewIntentResponseAmino;
}
export interface MsgNewIntentResponseSDKType {
  id: Long;
}
export interface MsgUpdateIntent {
  creator: string;
  id: Long;
  name: string;
  definition: string;
}
export interface MsgUpdateIntentProtoMsg {
  typeUrl: "/warden.intent.MsgUpdateIntent";
  value: Uint8Array;
}
export interface MsgUpdateIntentAmino {
  creator?: string;
  id?: string;
  name?: string;
  definition?: string;
}
export interface MsgUpdateIntentAminoMsg {
  type: "/warden.intent.MsgUpdateIntent";
  value: MsgUpdateIntentAmino;
}
export interface MsgUpdateIntentSDKType {
  creator: string;
  id: Long;
  name: string;
  definition: string;
}
export interface MsgUpdateIntentResponse {}
export interface MsgUpdateIntentResponseProtoMsg {
  typeUrl: "/warden.intent.MsgUpdateIntentResponse";
  value: Uint8Array;
}
export interface MsgUpdateIntentResponseAmino {}
export interface MsgUpdateIntentResponseAminoMsg {
  type: "/warden.intent.MsgUpdateIntentResponse";
  value: MsgUpdateIntentResponseAmino;
}
export interface MsgUpdateIntentResponseSDKType {}
export interface MsgRevokeAction {
  creator: string;
  actionType: string;
  actionId: Long;
}
export interface MsgRevokeActionProtoMsg {
  typeUrl: "/warden.intent.MsgRevokeAction";
  value: Uint8Array;
}
export interface MsgRevokeActionAmino {
  creator?: string;
  action_type?: string;
  action_id?: string;
}
export interface MsgRevokeActionAminoMsg {
  type: "/warden.intent.MsgRevokeAction";
  value: MsgRevokeActionAmino;
}
export interface MsgRevokeActionSDKType {
  creator: string;
  action_type: string;
  action_id: Long;
}
export interface MsgRevokeActionResponse {}
export interface MsgRevokeActionResponseProtoMsg {
  typeUrl: "/warden.intent.MsgRevokeActionResponse";
  value: Uint8Array;
}
export interface MsgRevokeActionResponseAmino {}
export interface MsgRevokeActionResponseAminoMsg {
  type: "/warden.intent.MsgRevokeActionResponse";
  value: MsgRevokeActionResponseAmino;
}
export interface MsgRevokeActionResponseSDKType {}
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: Params.fromPartial({})
  };
}
export const MsgUpdateParams = {
  typeUrl: "/warden.intent.MsgUpdateParams",
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgUpdateParams {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined
    };
  },
  toJSON(message: MsgUpdateParams): unknown {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },
  fromPartial(object: Partial<MsgUpdateParams>): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateParamsAmino): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: MsgUpdateParams): MsgUpdateParamsAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.params = message.params ? Params.toAmino(message.params) : Params.toAmino(Params.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsAminoMsg): MsgUpdateParams {
    return MsgUpdateParams.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateParams): MsgUpdateParamsAminoMsg {
    return {
      type: "warden/x/intent/MsgUpdateParams",
      value: MsgUpdateParams.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgUpdateParamsProtoMsg): MsgUpdateParams {
    return MsgUpdateParams.decode(message.value);
  },
  toProto(message: MsgUpdateParams): Uint8Array {
    return MsgUpdateParams.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParams): MsgUpdateParamsProtoMsg {
    return {
      typeUrl: "/warden.intent.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/warden.intent.MsgUpdateParamsResponse",
  encode(_: MsgUpdateParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
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
  fromPartial(_: Partial<MsgUpdateParamsResponse>): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  fromAmino(_: MsgUpdateParamsResponseAmino): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  toAmino(_: MsgUpdateParamsResponse): MsgUpdateParamsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsResponseAminoMsg): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateParamsResponseProtoMsg): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.decode(message.value);
  },
  toProto(message: MsgUpdateParamsResponse): Uint8Array {
    return MsgUpdateParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParamsResponse): MsgUpdateParamsResponseProtoMsg {
    return {
      typeUrl: "/warden.intent.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgApproveAction(): MsgApproveAction {
  return {
    creator: "",
    actionType: "",
    actionId: Long.UZERO
  };
}
export const MsgApproveAction = {
  typeUrl: "/warden.intent.MsgApproveAction",
  encode(message: MsgApproveAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.actionType !== "") {
      writer.uint32(18).string(message.actionType);
    }
    if (!message.actionId.isZero()) {
      writer.uint32(24).uint64(message.actionId);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgApproveAction {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgApproveAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.actionType = reader.string();
          break;
        case 3:
          message.actionId = (reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgApproveAction {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      actionType: isSet(object.actionType) ? String(object.actionType) : "",
      actionId: isSet(object.actionId) ? Long.fromValue(object.actionId) : Long.UZERO
    };
  },
  toJSON(message: MsgApproveAction): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.actionType !== undefined && (obj.actionType = message.actionType);
    message.actionId !== undefined && (obj.actionId = (message.actionId || Long.UZERO).toString());
    return obj;
  },
  fromPartial(object: Partial<MsgApproveAction>): MsgApproveAction {
    const message = createBaseMsgApproveAction();
    message.creator = object.creator ?? "";
    message.actionType = object.actionType ?? "";
    message.actionId = object.actionId !== undefined && object.actionId !== null ? Long.fromValue(object.actionId) : Long.UZERO;
    return message;
  },
  fromAmino(object: MsgApproveActionAmino): MsgApproveAction {
    const message = createBaseMsgApproveAction();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.action_type !== undefined && object.action_type !== null) {
      message.actionType = object.action_type;
    }
    if (object.action_id !== undefined && object.action_id !== null) {
      message.actionId = Long.fromString(object.action_id);
    }
    return message;
  },
  toAmino(message: MsgApproveAction): MsgApproveActionAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.action_type = message.actionType === "" ? undefined : message.actionType;
    obj.action_id = !message.actionId.isZero() ? message.actionId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgApproveActionAminoMsg): MsgApproveAction {
    return MsgApproveAction.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgApproveActionProtoMsg): MsgApproveAction {
    return MsgApproveAction.decode(message.value);
  },
  toProto(message: MsgApproveAction): Uint8Array {
    return MsgApproveAction.encode(message).finish();
  },
  toProtoMsg(message: MsgApproveAction): MsgApproveActionProtoMsg {
    return {
      typeUrl: "/warden.intent.MsgApproveAction",
      value: MsgApproveAction.encode(message).finish()
    };
  }
};
function createBaseMsgApproveActionResponse(): MsgApproveActionResponse {
  return {
    status: ""
  };
}
export const MsgApproveActionResponse = {
  typeUrl: "/warden.intent.MsgApproveActionResponse",
  encode(message: MsgApproveActionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== "") {
      writer.uint32(10).string(message.status);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgApproveActionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgApproveActionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgApproveActionResponse {
    return {
      status: isSet(object.status) ? String(object.status) : ""
    };
  },
  toJSON(message: MsgApproveActionResponse): unknown {
    const obj: any = {};
    message.status !== undefined && (obj.status = message.status);
    return obj;
  },
  fromPartial(object: Partial<MsgApproveActionResponse>): MsgApproveActionResponse {
    const message = createBaseMsgApproveActionResponse();
    message.status = object.status ?? "";
    return message;
  },
  fromAmino(object: MsgApproveActionResponseAmino): MsgApproveActionResponse {
    const message = createBaseMsgApproveActionResponse();
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    return message;
  },
  toAmino(message: MsgApproveActionResponse): MsgApproveActionResponseAmino {
    const obj: any = {};
    obj.status = message.status === "" ? undefined : message.status;
    return obj;
  },
  fromAminoMsg(object: MsgApproveActionResponseAminoMsg): MsgApproveActionResponse {
    return MsgApproveActionResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgApproveActionResponseProtoMsg): MsgApproveActionResponse {
    return MsgApproveActionResponse.decode(message.value);
  },
  toProto(message: MsgApproveActionResponse): Uint8Array {
    return MsgApproveActionResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgApproveActionResponse): MsgApproveActionResponseProtoMsg {
    return {
      typeUrl: "/warden.intent.MsgApproveActionResponse",
      value: MsgApproveActionResponse.encode(message).finish()
    };
  }
};
function createBaseMsgNewIntent(): MsgNewIntent {
  return {
    creator: "",
    name: "",
    definition: ""
  };
}
export const MsgNewIntent = {
  typeUrl: "/warden.intent.MsgNewIntent",
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgNewIntent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.definition = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgNewIntent {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      name: isSet(object.name) ? String(object.name) : "",
      definition: isSet(object.definition) ? String(object.definition) : ""
    };
  },
  toJSON(message: MsgNewIntent): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.name !== undefined && (obj.name = message.name);
    message.definition !== undefined && (obj.definition = message.definition);
    return obj;
  },
  fromPartial(object: Partial<MsgNewIntent>): MsgNewIntent {
    const message = createBaseMsgNewIntent();
    message.creator = object.creator ?? "";
    message.name = object.name ?? "";
    message.definition = object.definition ?? "";
    return message;
  },
  fromAmino(object: MsgNewIntentAmino): MsgNewIntent {
    const message = createBaseMsgNewIntent();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    if (object.definition !== undefined && object.definition !== null) {
      message.definition = object.definition;
    }
    return message;
  },
  toAmino(message: MsgNewIntent): MsgNewIntentAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.name = message.name === "" ? undefined : message.name;
    obj.definition = message.definition === "" ? undefined : message.definition;
    return obj;
  },
  fromAminoMsg(object: MsgNewIntentAminoMsg): MsgNewIntent {
    return MsgNewIntent.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgNewIntentProtoMsg): MsgNewIntent {
    return MsgNewIntent.decode(message.value);
  },
  toProto(message: MsgNewIntent): Uint8Array {
    return MsgNewIntent.encode(message).finish();
  },
  toProtoMsg(message: MsgNewIntent): MsgNewIntentProtoMsg {
    return {
      typeUrl: "/warden.intent.MsgNewIntent",
      value: MsgNewIntent.encode(message).finish()
    };
  }
};
function createBaseMsgNewIntentResponse(): MsgNewIntentResponse {
  return {
    id: Long.UZERO
  };
}
export const MsgNewIntentResponse = {
  typeUrl: "/warden.intent.MsgNewIntentResponse",
  encode(message: MsgNewIntentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgNewIntentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgNewIntentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = (reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgNewIntentResponse {
    return {
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO
    };
  },
  toJSON(message: MsgNewIntentResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString());
    return obj;
  },
  fromPartial(object: Partial<MsgNewIntentResponse>): MsgNewIntentResponse {
    const message = createBaseMsgNewIntentResponse();
    message.id = object.id !== undefined && object.id !== null ? Long.fromValue(object.id) : Long.UZERO;
    return message;
  },
  fromAmino(object: MsgNewIntentResponseAmino): MsgNewIntentResponse {
    const message = createBaseMsgNewIntentResponse();
    if (object.id !== undefined && object.id !== null) {
      message.id = Long.fromString(object.id);
    }
    return message;
  },
  toAmino(message: MsgNewIntentResponse): MsgNewIntentResponseAmino {
    const obj: any = {};
    obj.id = !message.id.isZero() ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgNewIntentResponseAminoMsg): MsgNewIntentResponse {
    return MsgNewIntentResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgNewIntentResponseProtoMsg): MsgNewIntentResponse {
    return MsgNewIntentResponse.decode(message.value);
  },
  toProto(message: MsgNewIntentResponse): Uint8Array {
    return MsgNewIntentResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgNewIntentResponse): MsgNewIntentResponseProtoMsg {
    return {
      typeUrl: "/warden.intent.MsgNewIntentResponse",
      value: MsgNewIntentResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateIntent(): MsgUpdateIntent {
  return {
    creator: "",
    id: Long.UZERO,
    name: "",
    definition: ""
  };
}
export const MsgUpdateIntent = {
  typeUrl: "/warden.intent.MsgUpdateIntent",
  encode(message: MsgUpdateIntent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (!message.id.isZero()) {
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateIntent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = (reader.uint64() as Long);
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.definition = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgUpdateIntent {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
      name: isSet(object.name) ? String(object.name) : "",
      definition: isSet(object.definition) ? String(object.definition) : ""
    };
  },
  toJSON(message: MsgUpdateIntent): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString());
    message.name !== undefined && (obj.name = message.name);
    message.definition !== undefined && (obj.definition = message.definition);
    return obj;
  },
  fromPartial(object: Partial<MsgUpdateIntent>): MsgUpdateIntent {
    const message = createBaseMsgUpdateIntent();
    message.creator = object.creator ?? "";
    message.id = object.id !== undefined && object.id !== null ? Long.fromValue(object.id) : Long.UZERO;
    message.name = object.name ?? "";
    message.definition = object.definition ?? "";
    return message;
  },
  fromAmino(object: MsgUpdateIntentAmino): MsgUpdateIntent {
    const message = createBaseMsgUpdateIntent();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Long.fromString(object.id);
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    if (object.definition !== undefined && object.definition !== null) {
      message.definition = object.definition;
    }
    return message;
  },
  toAmino(message: MsgUpdateIntent): MsgUpdateIntentAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.id = !message.id.isZero() ? message.id.toString() : undefined;
    obj.name = message.name === "" ? undefined : message.name;
    obj.definition = message.definition === "" ? undefined : message.definition;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateIntentAminoMsg): MsgUpdateIntent {
    return MsgUpdateIntent.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateIntentProtoMsg): MsgUpdateIntent {
    return MsgUpdateIntent.decode(message.value);
  },
  toProto(message: MsgUpdateIntent): Uint8Array {
    return MsgUpdateIntent.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateIntent): MsgUpdateIntentProtoMsg {
    return {
      typeUrl: "/warden.intent.MsgUpdateIntent",
      value: MsgUpdateIntent.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateIntentResponse(): MsgUpdateIntentResponse {
  return {};
}
export const MsgUpdateIntentResponse = {
  typeUrl: "/warden.intent.MsgUpdateIntentResponse",
  encode(_: MsgUpdateIntentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateIntentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateIntentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
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
  fromPartial(_: Partial<MsgUpdateIntentResponse>): MsgUpdateIntentResponse {
    const message = createBaseMsgUpdateIntentResponse();
    return message;
  },
  fromAmino(_: MsgUpdateIntentResponseAmino): MsgUpdateIntentResponse {
    const message = createBaseMsgUpdateIntentResponse();
    return message;
  },
  toAmino(_: MsgUpdateIntentResponse): MsgUpdateIntentResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateIntentResponseAminoMsg): MsgUpdateIntentResponse {
    return MsgUpdateIntentResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateIntentResponseProtoMsg): MsgUpdateIntentResponse {
    return MsgUpdateIntentResponse.decode(message.value);
  },
  toProto(message: MsgUpdateIntentResponse): Uint8Array {
    return MsgUpdateIntentResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateIntentResponse): MsgUpdateIntentResponseProtoMsg {
    return {
      typeUrl: "/warden.intent.MsgUpdateIntentResponse",
      value: MsgUpdateIntentResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRevokeAction(): MsgRevokeAction {
  return {
    creator: "",
    actionType: "",
    actionId: Long.UZERO
  };
}
export const MsgRevokeAction = {
  typeUrl: "/warden.intent.MsgRevokeAction",
  encode(message: MsgRevokeAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.actionType !== "") {
      writer.uint32(18).string(message.actionType);
    }
    if (!message.actionId.isZero()) {
      writer.uint32(24).uint64(message.actionId);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRevokeAction {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRevokeAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.actionType = reader.string();
          break;
        case 3:
          message.actionId = (reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgRevokeAction {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      actionType: isSet(object.actionType) ? String(object.actionType) : "",
      actionId: isSet(object.actionId) ? Long.fromValue(object.actionId) : Long.UZERO
    };
  },
  toJSON(message: MsgRevokeAction): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.actionType !== undefined && (obj.actionType = message.actionType);
    message.actionId !== undefined && (obj.actionId = (message.actionId || Long.UZERO).toString());
    return obj;
  },
  fromPartial(object: Partial<MsgRevokeAction>): MsgRevokeAction {
    const message = createBaseMsgRevokeAction();
    message.creator = object.creator ?? "";
    message.actionType = object.actionType ?? "";
    message.actionId = object.actionId !== undefined && object.actionId !== null ? Long.fromValue(object.actionId) : Long.UZERO;
    return message;
  },
  fromAmino(object: MsgRevokeActionAmino): MsgRevokeAction {
    const message = createBaseMsgRevokeAction();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.action_type !== undefined && object.action_type !== null) {
      message.actionType = object.action_type;
    }
    if (object.action_id !== undefined && object.action_id !== null) {
      message.actionId = Long.fromString(object.action_id);
    }
    return message;
  },
  toAmino(message: MsgRevokeAction): MsgRevokeActionAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.action_type = message.actionType === "" ? undefined : message.actionType;
    obj.action_id = !message.actionId.isZero() ? message.actionId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgRevokeActionAminoMsg): MsgRevokeAction {
    return MsgRevokeAction.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRevokeActionProtoMsg): MsgRevokeAction {
    return MsgRevokeAction.decode(message.value);
  },
  toProto(message: MsgRevokeAction): Uint8Array {
    return MsgRevokeAction.encode(message).finish();
  },
  toProtoMsg(message: MsgRevokeAction): MsgRevokeActionProtoMsg {
    return {
      typeUrl: "/warden.intent.MsgRevokeAction",
      value: MsgRevokeAction.encode(message).finish()
    };
  }
};
function createBaseMsgRevokeActionResponse(): MsgRevokeActionResponse {
  return {};
}
export const MsgRevokeActionResponse = {
  typeUrl: "/warden.intent.MsgRevokeActionResponse",
  encode(_: MsgRevokeActionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRevokeActionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRevokeActionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
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
  fromPartial(_: Partial<MsgRevokeActionResponse>): MsgRevokeActionResponse {
    const message = createBaseMsgRevokeActionResponse();
    return message;
  },
  fromAmino(_: MsgRevokeActionResponseAmino): MsgRevokeActionResponse {
    const message = createBaseMsgRevokeActionResponse();
    return message;
  },
  toAmino(_: MsgRevokeActionResponse): MsgRevokeActionResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRevokeActionResponseAminoMsg): MsgRevokeActionResponse {
    return MsgRevokeActionResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRevokeActionResponseProtoMsg): MsgRevokeActionResponse {
    return MsgRevokeActionResponse.decode(message.value);
  },
  toProto(message: MsgRevokeActionResponse): Uint8Array {
    return MsgRevokeActionResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRevokeActionResponse): MsgRevokeActionResponseProtoMsg {
    return {
      typeUrl: "/warden.intent.MsgRevokeActionResponse",
      value: MsgRevokeActionResponse.encode(message).finish()
    };
  }
};