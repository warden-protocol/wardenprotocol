//@ts-nocheck
import { Long, isSet } from "../../../helpers.js";
import _m0 from "protobufjs/minimal.js";
/** Space is a collection of users (called owners) that manages a set of keys. */
export interface Space {
  id: Long;
  creator: string;
  owners: string[];
  /**
   * Optional ID of the intent to be applied to every *admin* operation.
   * If not specified, the default intent is used.
   * 
   * Admin operations are:
   * - warden.warden.Msg.AddSpaceOwner
   * - warden.warden.Msg.RemoveSpaceOwner
   * 
   * The default intent is to allow any operation when at least one of its
   * owner approves it.
   */
  adminIntentId: Long;
  /**
   * Optional ID of the intent to be applied to every *sign* operation.
   * If not specified, the default intent is used.
   * 
   * Sign operations are:
   * - warden.warden.Msg.NewKeyRequest
   * - warden.warden.Msg.NewSignTransactionRequest
   * - warden.warden.Msg.NewSignatureRequest
   * - warden.warden.Msg.NewWalletRequest
   * 
   * The default intent is to allow any operation when at least one of its
   * owner approves it.
   */
  signIntentId: Long;
}
export interface SpaceProtoMsg {
  typeUrl: "/warden.warden.v1beta2.Space";
  value: Uint8Array;
}
/** Space is a collection of users (called owners) that manages a set of keys. */
export interface SpaceAmino {
  id?: string;
  creator?: string;
  owners?: string[];
  /**
   * Optional ID of the intent to be applied to every *admin* operation.
   * If not specified, the default intent is used.
   * 
   * Admin operations are:
   * - warden.warden.Msg.AddSpaceOwner
   * - warden.warden.Msg.RemoveSpaceOwner
   * 
   * The default intent is to allow any operation when at least one of its
   * owner approves it.
   */
  admin_intent_id?: string;
  /**
   * Optional ID of the intent to be applied to every *sign* operation.
   * If not specified, the default intent is used.
   * 
   * Sign operations are:
   * - warden.warden.Msg.NewKeyRequest
   * - warden.warden.Msg.NewSignTransactionRequest
   * - warden.warden.Msg.NewSignatureRequest
   * - warden.warden.Msg.NewWalletRequest
   * 
   * The default intent is to allow any operation when at least one of its
   * owner approves it.
   */
  sign_intent_id?: string;
}
export interface SpaceAminoMsg {
  type: "/warden.warden.v1beta2.Space";
  value: SpaceAmino;
}
/** Space is a collection of users (called owners) that manages a set of keys. */
export interface SpaceSDKType {
  id: Long;
  creator: string;
  owners: string[];
  admin_intent_id: Long;
  sign_intent_id: Long;
}
function createBaseSpace(): Space {
  return {
    id: Long.UZERO,
    creator: "",
    owners: [],
    adminIntentId: Long.UZERO,
    signIntentId: Long.UZERO
  };
}
export const Space = {
  typeUrl: "/warden.warden.v1beta2.Space",
  encode(message: Space, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    for (const v of message.owners) {
      writer.uint32(26).string(v!);
    }
    if (!message.adminIntentId.isZero()) {
      writer.uint32(40).uint64(message.adminIntentId);
    }
    if (!message.signIntentId.isZero()) {
      writer.uint32(48).uint64(message.signIntentId);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): Space {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSpace();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = (reader.uint64() as Long);
          break;
        case 2:
          message.creator = reader.string();
          break;
        case 3:
          message.owners.push(reader.string());
          break;
        case 5:
          message.adminIntentId = (reader.uint64() as Long);
          break;
        case 6:
          message.signIntentId = (reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Space {
    return {
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
      creator: isSet(object.creator) ? String(object.creator) : "",
      owners: Array.isArray(object?.owners) ? object.owners.map((e: any) => String(e)) : [],
      adminIntentId: isSet(object.adminIntentId) ? Long.fromValue(object.adminIntentId) : Long.UZERO,
      signIntentId: isSet(object.signIntentId) ? Long.fromValue(object.signIntentId) : Long.UZERO
    };
  },
  toJSON(message: Space): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString());
    message.creator !== undefined && (obj.creator = message.creator);
    if (message.owners) {
      obj.owners = message.owners.map(e => e);
    } else {
      obj.owners = [];
    }
    message.adminIntentId !== undefined && (obj.adminIntentId = (message.adminIntentId || Long.UZERO).toString());
    message.signIntentId !== undefined && (obj.signIntentId = (message.signIntentId || Long.UZERO).toString());
    return obj;
  },
  fromPartial(object: Partial<Space>): Space {
    const message = createBaseSpace();
    message.id = object.id !== undefined && object.id !== null ? Long.fromValue(object.id) : Long.UZERO;
    message.creator = object.creator ?? "";
    message.owners = object.owners?.map(e => e) || [];
    message.adminIntentId = object.adminIntentId !== undefined && object.adminIntentId !== null ? Long.fromValue(object.adminIntentId) : Long.UZERO;
    message.signIntentId = object.signIntentId !== undefined && object.signIntentId !== null ? Long.fromValue(object.signIntentId) : Long.UZERO;
    return message;
  },
  fromAmino(object: SpaceAmino): Space {
    const message = createBaseSpace();
    if (object.id !== undefined && object.id !== null) {
      message.id = Long.fromString(object.id);
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    message.owners = object.owners?.map(e => e) || [];
    if (object.admin_intent_id !== undefined && object.admin_intent_id !== null) {
      message.adminIntentId = Long.fromString(object.admin_intent_id);
    }
    if (object.sign_intent_id !== undefined && object.sign_intent_id !== null) {
      message.signIntentId = Long.fromString(object.sign_intent_id);
    }
    return message;
  },
  toAmino(message: Space): SpaceAmino {
    const obj: any = {};
    obj.id = !message.id.isZero() ? message.id.toString() : undefined;
    obj.creator = message.creator === "" ? undefined : message.creator;
    if (message.owners) {
      obj.owners = message.owners.map(e => e);
    } else {
      obj.owners = message.owners;
    }
    obj.admin_intent_id = !message.adminIntentId.isZero() ? message.adminIntentId.toString() : undefined;
    obj.sign_intent_id = !message.signIntentId.isZero() ? message.signIntentId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: SpaceAminoMsg): Space {
    return Space.fromAmino(object.value);
  },
  fromProtoMsg(message: SpaceProtoMsg): Space {
    return Space.decode(message.value);
  },
  toProto(message: Space): Uint8Array {
    return Space.encode(message).finish();
  },
  toProtoMsg(message: Space): SpaceProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta2.Space",
      value: Space.encode(message).finish()
    };
  }
};