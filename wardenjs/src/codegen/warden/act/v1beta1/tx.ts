//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params.js";
import { Any, AnyAmino, AnySDKType } from "../../../google/protobuf/any.js";
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet } from "../../../helpers.js";
import { JsonSafe } from "../../../json-safe.js";
/** MsgUpdateParams is the Msg/UpdateParams request type. */
export interface MsgUpdateParams {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /** NOTE: All parameters must be supplied. */
  params: Params;
}
export interface MsgUpdateParamsProtoMsg {
  typeUrl: "/warden.act.v1beta1.MsgUpdateParams";
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
  type: "warden/x/act/MsgUpdateParams";
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
  typeUrl: "/warden.act.v1beta1.MsgUpdateParamsResponse";
  value: Uint8Array;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/warden.act.v1beta1.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponseSDKType {}
export interface MsgNewAction {
  /** creator is the address of the requester of this action. */
  creator: string;
  /** message is the arbitrary message to be executed when the action is ready. */
  message?: Any;
  /** action_timeout_height is the block height up until this action can be executed. */
  actionTimeoutHeight: bigint;
}
export interface MsgNewActionProtoMsg {
  typeUrl: "/warden.act.v1beta1.MsgNewAction";
  value: Uint8Array;
}
export interface MsgNewActionAmino {
  /** creator is the address of the requester of this action. */
  creator?: string;
  /** message is the arbitrary message to be executed when the action is ready. */
  message?: AnyAmino;
  /** action_timeout_height is the block height up until this action can be executed. */
  action_timeout_height?: string;
}
export interface MsgNewActionAminoMsg {
  type: "/warden.act.v1beta1.MsgNewAction";
  value: MsgNewActionAmino;
}
export interface MsgNewActionSDKType {
  creator: string;
  message?: AnySDKType;
  action_timeout_height: bigint;
}
export interface MsgNewActionResponse {
  /** id is the unique id of the action. */
  id: bigint;
}
export interface MsgNewActionResponseProtoMsg {
  typeUrl: "/warden.act.v1beta1.MsgNewActionResponse";
  value: Uint8Array;
}
export interface MsgNewActionResponseAmino {
  /** id is the unique id of the action. */
  id?: string;
}
export interface MsgNewActionResponseAminoMsg {
  type: "/warden.act.v1beta1.MsgNewActionResponse";
  value: MsgNewActionResponseAmino;
}
export interface MsgNewActionResponseSDKType {
  id: bigint;
}
export interface MsgApproveAction {
  creator: string;
  actionId: bigint;
}
export interface MsgApproveActionProtoMsg {
  typeUrl: "/warden.act.v1beta1.MsgApproveAction";
  value: Uint8Array;
}
export interface MsgApproveActionAmino {
  creator?: string;
  action_id?: string;
}
export interface MsgApproveActionAminoMsg {
  type: "/warden.act.v1beta1.MsgApproveAction";
  value: MsgApproveActionAmino;
}
export interface MsgApproveActionSDKType {
  creator: string;
  action_id: bigint;
}
export interface MsgApproveActionResponse {
  status: string;
}
export interface MsgApproveActionResponseProtoMsg {
  typeUrl: "/warden.act.v1beta1.MsgApproveActionResponse";
  value: Uint8Array;
}
export interface MsgApproveActionResponseAmino {
  status?: string;
}
export interface MsgApproveActionResponseAminoMsg {
  type: "/warden.act.v1beta1.MsgApproveActionResponse";
  value: MsgApproveActionResponseAmino;
}
export interface MsgApproveActionResponseSDKType {
  status: string;
}
export interface MsgNewRule {
  creator: string;
  name: string;
  definition: string;
}
export interface MsgNewRuleProtoMsg {
  typeUrl: "/warden.act.v1beta1.MsgNewRule";
  value: Uint8Array;
}
export interface MsgNewRuleAmino {
  creator?: string;
  name?: string;
  definition?: string;
}
export interface MsgNewRuleAminoMsg {
  type: "/warden.act.v1beta1.MsgNewRule";
  value: MsgNewRuleAmino;
}
export interface MsgNewRuleSDKType {
  creator: string;
  name: string;
  definition: string;
}
export interface MsgNewRuleResponse {
  id: bigint;
}
export interface MsgNewRuleResponseProtoMsg {
  typeUrl: "/warden.act.v1beta1.MsgNewRuleResponse";
  value: Uint8Array;
}
export interface MsgNewRuleResponseAmino {
  id?: string;
}
export interface MsgNewRuleResponseAminoMsg {
  type: "/warden.act.v1beta1.MsgNewRuleResponse";
  value: MsgNewRuleResponseAmino;
}
export interface MsgNewRuleResponseSDKType {
  id: bigint;
}
export interface MsgUpdateRule {
  creator: string;
  id: bigint;
  name: string;
  definition: string;
}
export interface MsgUpdateRuleProtoMsg {
  typeUrl: "/warden.act.v1beta1.MsgUpdateRule";
  value: Uint8Array;
}
export interface MsgUpdateRuleAmino {
  creator?: string;
  id?: string;
  name?: string;
  definition?: string;
}
export interface MsgUpdateRuleAminoMsg {
  type: "/warden.act.v1beta1.MsgUpdateRule";
  value: MsgUpdateRuleAmino;
}
export interface MsgUpdateRuleSDKType {
  creator: string;
  id: bigint;
  name: string;
  definition: string;
}
export interface MsgUpdateRuleResponse {}
export interface MsgUpdateRuleResponseProtoMsg {
  typeUrl: "/warden.act.v1beta1.MsgUpdateRuleResponse";
  value: Uint8Array;
}
export interface MsgUpdateRuleResponseAmino {}
export interface MsgUpdateRuleResponseAminoMsg {
  type: "/warden.act.v1beta1.MsgUpdateRuleResponse";
  value: MsgUpdateRuleResponseAmino;
}
export interface MsgUpdateRuleResponseSDKType {}
export interface MsgRevokeAction {
  creator: string;
  actionId: bigint;
}
export interface MsgRevokeActionProtoMsg {
  typeUrl: "/warden.act.v1beta1.MsgRevokeAction";
  value: Uint8Array;
}
export interface MsgRevokeActionAmino {
  creator?: string;
  action_id?: string;
}
export interface MsgRevokeActionAminoMsg {
  type: "/warden.act.v1beta1.MsgRevokeAction";
  value: MsgRevokeActionAmino;
}
export interface MsgRevokeActionSDKType {
  creator: string;
  action_id: bigint;
}
export interface MsgRevokeActionResponse {}
export interface MsgRevokeActionResponseProtoMsg {
  typeUrl: "/warden.act.v1beta1.MsgRevokeActionResponse";
  value: Uint8Array;
}
export interface MsgRevokeActionResponseAmino {}
export interface MsgRevokeActionResponseAminoMsg {
  type: "/warden.act.v1beta1.MsgRevokeActionResponse";
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
  typeUrl: "/warden.act.v1beta1.MsgUpdateParams",
  encode(message: MsgUpdateParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
  toJSON(message: MsgUpdateParams): JsonSafe<MsgUpdateParams> {
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
      type: "warden/x/act/MsgUpdateParams",
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
      typeUrl: "/warden.act.v1beta1.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/warden.act.v1beta1.MsgUpdateParamsResponse",
  encode(_: MsgUpdateParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
  toJSON(_: MsgUpdateParamsResponse): JsonSafe<MsgUpdateParamsResponse> {
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
      typeUrl: "/warden.act.v1beta1.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgNewAction(): MsgNewAction {
  return {
    creator: "",
    message: undefined,
    actionTimeoutHeight: BigInt(0)
  };
}
export const MsgNewAction = {
  typeUrl: "/warden.act.v1beta1.MsgNewAction",
  encode(message: MsgNewAction, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.message !== undefined) {
      Any.encode(message.message, writer.uint32(18).fork()).ldelim();
    }
    if (message.actionTimeoutHeight !== BigInt(0)) {
      writer.uint32(24).uint64(message.actionTimeoutHeight);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgNewAction {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgNewAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.message = Any.decode(reader, reader.uint32());
          break;
        case 3:
          message.actionTimeoutHeight = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgNewAction {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      message: isSet(object.message) ? Any.fromJSON(object.message) : undefined,
      actionTimeoutHeight: isSet(object.actionTimeoutHeight) ? BigInt(object.actionTimeoutHeight.toString()) : BigInt(0)
    };
  },
  toJSON(message: MsgNewAction): JsonSafe<MsgNewAction> {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.message !== undefined && (obj.message = message.message ? Any.toJSON(message.message) : undefined);
    message.actionTimeoutHeight !== undefined && (obj.actionTimeoutHeight = (message.actionTimeoutHeight || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<MsgNewAction>): MsgNewAction {
    const message = createBaseMsgNewAction();
    message.creator = object.creator ?? "";
    message.message = object.message !== undefined && object.message !== null ? Any.fromPartial(object.message) : undefined;
    message.actionTimeoutHeight = object.actionTimeoutHeight !== undefined && object.actionTimeoutHeight !== null ? BigInt(object.actionTimeoutHeight.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgNewActionAmino): MsgNewAction {
    const message = createBaseMsgNewAction();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = Any.fromAmino(object.message);
    }
    if (object.action_timeout_height !== undefined && object.action_timeout_height !== null) {
      message.actionTimeoutHeight = BigInt(object.action_timeout_height);
    }
    return message;
  },
  toAmino(message: MsgNewAction): MsgNewActionAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.message = message.message ? Any.toAmino(message.message) : undefined;
    obj.action_timeout_height = message.actionTimeoutHeight !== BigInt(0) ? message.actionTimeoutHeight.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgNewActionAminoMsg): MsgNewAction {
    return MsgNewAction.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgNewActionProtoMsg): MsgNewAction {
    return MsgNewAction.decode(message.value);
  },
  toProto(message: MsgNewAction): Uint8Array {
    return MsgNewAction.encode(message).finish();
  },
  toProtoMsg(message: MsgNewAction): MsgNewActionProtoMsg {
    return {
      typeUrl: "/warden.act.v1beta1.MsgNewAction",
      value: MsgNewAction.encode(message).finish()
    };
  }
};
function createBaseMsgNewActionResponse(): MsgNewActionResponse {
  return {
    id: BigInt(0)
  };
}
export const MsgNewActionResponse = {
  typeUrl: "/warden.act.v1beta1.MsgNewActionResponse",
  encode(message: MsgNewActionResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgNewActionResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgNewActionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgNewActionResponse {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0)
    };
  },
  toJSON(message: MsgNewActionResponse): JsonSafe<MsgNewActionResponse> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<MsgNewActionResponse>): MsgNewActionResponse {
    const message = createBaseMsgNewActionResponse();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgNewActionResponseAmino): MsgNewActionResponse {
    const message = createBaseMsgNewActionResponse();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: MsgNewActionResponse): MsgNewActionResponseAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgNewActionResponseAminoMsg): MsgNewActionResponse {
    return MsgNewActionResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgNewActionResponseProtoMsg): MsgNewActionResponse {
    return MsgNewActionResponse.decode(message.value);
  },
  toProto(message: MsgNewActionResponse): Uint8Array {
    return MsgNewActionResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgNewActionResponse): MsgNewActionResponseProtoMsg {
    return {
      typeUrl: "/warden.act.v1beta1.MsgNewActionResponse",
      value: MsgNewActionResponse.encode(message).finish()
    };
  }
};
function createBaseMsgApproveAction(): MsgApproveAction {
  return {
    creator: "",
    actionId: BigInt(0)
  };
}
export const MsgApproveAction = {
  typeUrl: "/warden.act.v1beta1.MsgApproveAction",
  encode(message: MsgApproveAction, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.actionId !== BigInt(0)) {
      writer.uint32(16).uint64(message.actionId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgApproveAction {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgApproveAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.actionId = reader.uint64();
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
      actionId: isSet(object.actionId) ? BigInt(object.actionId.toString()) : BigInt(0)
    };
  },
  toJSON(message: MsgApproveAction): JsonSafe<MsgApproveAction> {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.actionId !== undefined && (obj.actionId = (message.actionId || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<MsgApproveAction>): MsgApproveAction {
    const message = createBaseMsgApproveAction();
    message.creator = object.creator ?? "";
    message.actionId = object.actionId !== undefined && object.actionId !== null ? BigInt(object.actionId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgApproveActionAmino): MsgApproveAction {
    const message = createBaseMsgApproveAction();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.action_id !== undefined && object.action_id !== null) {
      message.actionId = BigInt(object.action_id);
    }
    return message;
  },
  toAmino(message: MsgApproveAction): MsgApproveActionAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.action_id = message.actionId !== BigInt(0) ? message.actionId.toString() : undefined;
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
      typeUrl: "/warden.act.v1beta1.MsgApproveAction",
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
  typeUrl: "/warden.act.v1beta1.MsgApproveActionResponse",
  encode(message: MsgApproveActionResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.status !== "") {
      writer.uint32(10).string(message.status);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgApproveActionResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
  toJSON(message: MsgApproveActionResponse): JsonSafe<MsgApproveActionResponse> {
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
      typeUrl: "/warden.act.v1beta1.MsgApproveActionResponse",
      value: MsgApproveActionResponse.encode(message).finish()
    };
  }
};
function createBaseMsgNewRule(): MsgNewRule {
  return {
    creator: "",
    name: "",
    definition: ""
  };
}
export const MsgNewRule = {
  typeUrl: "/warden.act.v1beta1.MsgNewRule",
  encode(message: MsgNewRule, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
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
  decode(input: BinaryReader | Uint8Array, length?: number): MsgNewRule {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgNewRule();
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
  fromJSON(object: any): MsgNewRule {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      name: isSet(object.name) ? String(object.name) : "",
      definition: isSet(object.definition) ? String(object.definition) : ""
    };
  },
  toJSON(message: MsgNewRule): JsonSafe<MsgNewRule> {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.name !== undefined && (obj.name = message.name);
    message.definition !== undefined && (obj.definition = message.definition);
    return obj;
  },
  fromPartial(object: Partial<MsgNewRule>): MsgNewRule {
    const message = createBaseMsgNewRule();
    message.creator = object.creator ?? "";
    message.name = object.name ?? "";
    message.definition = object.definition ?? "";
    return message;
  },
  fromAmino(object: MsgNewRuleAmino): MsgNewRule {
    const message = createBaseMsgNewRule();
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
  toAmino(message: MsgNewRule): MsgNewRuleAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.name = message.name === "" ? undefined : message.name;
    obj.definition = message.definition === "" ? undefined : message.definition;
    return obj;
  },
  fromAminoMsg(object: MsgNewRuleAminoMsg): MsgNewRule {
    return MsgNewRule.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgNewRuleProtoMsg): MsgNewRule {
    return MsgNewRule.decode(message.value);
  },
  toProto(message: MsgNewRule): Uint8Array {
    return MsgNewRule.encode(message).finish();
  },
  toProtoMsg(message: MsgNewRule): MsgNewRuleProtoMsg {
    return {
      typeUrl: "/warden.act.v1beta1.MsgNewRule",
      value: MsgNewRule.encode(message).finish()
    };
  }
};
function createBaseMsgNewRuleResponse(): MsgNewRuleResponse {
  return {
    id: BigInt(0)
  };
}
export const MsgNewRuleResponse = {
  typeUrl: "/warden.act.v1beta1.MsgNewRuleResponse",
  encode(message: MsgNewRuleResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgNewRuleResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgNewRuleResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgNewRuleResponse {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0)
    };
  },
  toJSON(message: MsgNewRuleResponse): JsonSafe<MsgNewRuleResponse> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<MsgNewRuleResponse>): MsgNewRuleResponse {
    const message = createBaseMsgNewRuleResponse();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgNewRuleResponseAmino): MsgNewRuleResponse {
    const message = createBaseMsgNewRuleResponse();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: MsgNewRuleResponse): MsgNewRuleResponseAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgNewRuleResponseAminoMsg): MsgNewRuleResponse {
    return MsgNewRuleResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgNewRuleResponseProtoMsg): MsgNewRuleResponse {
    return MsgNewRuleResponse.decode(message.value);
  },
  toProto(message: MsgNewRuleResponse): Uint8Array {
    return MsgNewRuleResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgNewRuleResponse): MsgNewRuleResponseProtoMsg {
    return {
      typeUrl: "/warden.act.v1beta1.MsgNewRuleResponse",
      value: MsgNewRuleResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateRule(): MsgUpdateRule {
  return {
    creator: "",
    id: BigInt(0),
    name: "",
    definition: ""
  };
}
export const MsgUpdateRule = {
  typeUrl: "/warden.act.v1beta1.MsgUpdateRule",
  encode(message: MsgUpdateRule, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== BigInt(0)) {
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
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateRule {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateRule();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.uint64();
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
  fromJSON(object: any): MsgUpdateRule {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      name: isSet(object.name) ? String(object.name) : "",
      definition: isSet(object.definition) ? String(object.definition) : ""
    };
  },
  toJSON(message: MsgUpdateRule): JsonSafe<MsgUpdateRule> {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.name !== undefined && (obj.name = message.name);
    message.definition !== undefined && (obj.definition = message.definition);
    return obj;
  },
  fromPartial(object: Partial<MsgUpdateRule>): MsgUpdateRule {
    const message = createBaseMsgUpdateRule();
    message.creator = object.creator ?? "";
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.name = object.name ?? "";
    message.definition = object.definition ?? "";
    return message;
  },
  fromAmino(object: MsgUpdateRuleAmino): MsgUpdateRule {
    const message = createBaseMsgUpdateRule();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    if (object.definition !== undefined && object.definition !== null) {
      message.definition = object.definition;
    }
    return message;
  },
  toAmino(message: MsgUpdateRule): MsgUpdateRuleAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.name = message.name === "" ? undefined : message.name;
    obj.definition = message.definition === "" ? undefined : message.definition;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateRuleAminoMsg): MsgUpdateRule {
    return MsgUpdateRule.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateRuleProtoMsg): MsgUpdateRule {
    return MsgUpdateRule.decode(message.value);
  },
  toProto(message: MsgUpdateRule): Uint8Array {
    return MsgUpdateRule.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateRule): MsgUpdateRuleProtoMsg {
    return {
      typeUrl: "/warden.act.v1beta1.MsgUpdateRule",
      value: MsgUpdateRule.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateRuleResponse(): MsgUpdateRuleResponse {
  return {};
}
export const MsgUpdateRuleResponse = {
  typeUrl: "/warden.act.v1beta1.MsgUpdateRuleResponse",
  encode(_: MsgUpdateRuleResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateRuleResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateRuleResponse();
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
  fromJSON(_: any): MsgUpdateRuleResponse {
    return {};
  },
  toJSON(_: MsgUpdateRuleResponse): JsonSafe<MsgUpdateRuleResponse> {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<MsgUpdateRuleResponse>): MsgUpdateRuleResponse {
    const message = createBaseMsgUpdateRuleResponse();
    return message;
  },
  fromAmino(_: MsgUpdateRuleResponseAmino): MsgUpdateRuleResponse {
    const message = createBaseMsgUpdateRuleResponse();
    return message;
  },
  toAmino(_: MsgUpdateRuleResponse): MsgUpdateRuleResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateRuleResponseAminoMsg): MsgUpdateRuleResponse {
    return MsgUpdateRuleResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateRuleResponseProtoMsg): MsgUpdateRuleResponse {
    return MsgUpdateRuleResponse.decode(message.value);
  },
  toProto(message: MsgUpdateRuleResponse): Uint8Array {
    return MsgUpdateRuleResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateRuleResponse): MsgUpdateRuleResponseProtoMsg {
    return {
      typeUrl: "/warden.act.v1beta1.MsgUpdateRuleResponse",
      value: MsgUpdateRuleResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRevokeAction(): MsgRevokeAction {
  return {
    creator: "",
    actionId: BigInt(0)
  };
}
export const MsgRevokeAction = {
  typeUrl: "/warden.act.v1beta1.MsgRevokeAction",
  encode(message: MsgRevokeAction, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.actionId !== BigInt(0)) {
      writer.uint32(16).uint64(message.actionId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgRevokeAction {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRevokeAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.actionId = reader.uint64();
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
      actionId: isSet(object.actionId) ? BigInt(object.actionId.toString()) : BigInt(0)
    };
  },
  toJSON(message: MsgRevokeAction): JsonSafe<MsgRevokeAction> {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.actionId !== undefined && (obj.actionId = (message.actionId || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<MsgRevokeAction>): MsgRevokeAction {
    const message = createBaseMsgRevokeAction();
    message.creator = object.creator ?? "";
    message.actionId = object.actionId !== undefined && object.actionId !== null ? BigInt(object.actionId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgRevokeActionAmino): MsgRevokeAction {
    const message = createBaseMsgRevokeAction();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.action_id !== undefined && object.action_id !== null) {
      message.actionId = BigInt(object.action_id);
    }
    return message;
  },
  toAmino(message: MsgRevokeAction): MsgRevokeActionAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.action_id = message.actionId !== BigInt(0) ? message.actionId.toString() : undefined;
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
      typeUrl: "/warden.act.v1beta1.MsgRevokeAction",
      value: MsgRevokeAction.encode(message).finish()
    };
  }
};
function createBaseMsgRevokeActionResponse(): MsgRevokeActionResponse {
  return {};
}
export const MsgRevokeActionResponse = {
  typeUrl: "/warden.act.v1beta1.MsgRevokeActionResponse",
  encode(_: MsgRevokeActionResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgRevokeActionResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
  toJSON(_: MsgRevokeActionResponse): JsonSafe<MsgRevokeActionResponse> {
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
      typeUrl: "/warden.act.v1beta1.MsgRevokeActionResponse",
      value: MsgRevokeActionResponse.encode(message).finish()
    };
  }
};