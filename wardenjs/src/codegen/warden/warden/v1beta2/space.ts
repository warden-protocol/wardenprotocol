//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet } from "../../../helpers.js";
import { JsonSafe } from "../../../json-safe.js";
/** Space is a collection of users (called owners) that manages a set of Keys. */
export interface Space {
  /** Unique ID of the space. */
  id: bigint;
  /** Address of the creator of the space. */
  creator: string;
  /** List of owners of the space. */
  owners: string[];
  /**
   * Optional ID of the Rule to be applied to every *admin* operation.
   * If not specified, the default Rule is used.
   * 
   * Admin operations are:
   * - warden.warden.Msg.AddSpaceOwner
   * - warden.warden.Msg.RemoveSpaceOwner
   * - warden.warden.Msg.UpdateSpace
   * 
   * The default Rule is to allow any operation when at least one of its
   * owner approves it.
   */
  adminRuleId: bigint;
  /**
   * Optional ID of the Rule to be applied to every *sign* operation.
   * If not specified, the default Rule is used.
   * 
   * Sign operations are:
   * - warden.warden.Msg.NewKeyRequest
   * - warden.warden.Msg.NewSignatureRequest
   * - warden.warden.Msg.UpdateKey
   * 
   * The default Rule is to allow any operation when at least one of its
   * owner approves it.
   */
  signRuleId: bigint;
}
export interface SpaceProtoMsg {
  typeUrl: "/warden.warden.v1beta2.Space";
  value: Uint8Array;
}
/** Space is a collection of users (called owners) that manages a set of Keys. */
export interface SpaceAmino {
  /** Unique ID of the space. */
  id?: string;
  /** Address of the creator of the space. */
  creator?: string;
  /** List of owners of the space. */
  owners?: string[];
  /**
   * Optional ID of the Rule to be applied to every *admin* operation.
   * If not specified, the default Rule is used.
   * 
   * Admin operations are:
   * - warden.warden.Msg.AddSpaceOwner
   * - warden.warden.Msg.RemoveSpaceOwner
   * - warden.warden.Msg.UpdateSpace
   * 
   * The default Rule is to allow any operation when at least one of its
   * owner approves it.
   */
  admin_rule_id?: string;
  /**
   * Optional ID of the Rule to be applied to every *sign* operation.
   * If not specified, the default Rule is used.
   * 
   * Sign operations are:
   * - warden.warden.Msg.NewKeyRequest
   * - warden.warden.Msg.NewSignatureRequest
   * - warden.warden.Msg.UpdateKey
   * 
   * The default Rule is to allow any operation when at least one of its
   * owner approves it.
   */
  sign_rule_id?: string;
}
export interface SpaceAminoMsg {
  type: "/warden.warden.v1beta2.Space";
  value: SpaceAmino;
}
/** Space is a collection of users (called owners) that manages a set of Keys. */
export interface SpaceSDKType {
  id: bigint;
  creator: string;
  owners: string[];
  admin_rule_id: bigint;
  sign_rule_id: bigint;
}
function createBaseSpace(): Space {
  return {
    id: BigInt(0),
    creator: "",
    owners: [],
    adminRuleId: BigInt(0),
    signRuleId: BigInt(0)
  };
}
export const Space = {
  typeUrl: "/warden.warden.v1beta2.Space",
  encode(message: Space, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    for (const v of message.owners) {
      writer.uint32(26).string(v!);
    }
    if (message.adminRuleId !== BigInt(0)) {
      writer.uint32(40).uint64(message.adminRuleId);
    }
    if (message.signRuleId !== BigInt(0)) {
      writer.uint32(48).uint64(message.signRuleId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Space {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSpace();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.creator = reader.string();
          break;
        case 3:
          message.owners.push(reader.string());
          break;
        case 5:
          message.adminRuleId = reader.uint64();
          break;
        case 6:
          message.signRuleId = reader.uint64();
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
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      creator: isSet(object.creator) ? String(object.creator) : "",
      owners: Array.isArray(object?.owners) ? object.owners.map((e: any) => String(e)) : [],
      adminRuleId: isSet(object.adminRuleId) ? BigInt(object.adminRuleId.toString()) : BigInt(0),
      signRuleId: isSet(object.signRuleId) ? BigInt(object.signRuleId.toString()) : BigInt(0)
    };
  },
  toJSON(message: Space): JsonSafe<Space> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.creator !== undefined && (obj.creator = message.creator);
    if (message.owners) {
      obj.owners = message.owners.map(e => e);
    } else {
      obj.owners = [];
    }
    message.adminRuleId !== undefined && (obj.adminRuleId = (message.adminRuleId || BigInt(0)).toString());
    message.signRuleId !== undefined && (obj.signRuleId = (message.signRuleId || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<Space>): Space {
    const message = createBaseSpace();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.creator = object.creator ?? "";
    message.owners = object.owners?.map(e => e) || [];
    message.adminRuleId = object.adminRuleId !== undefined && object.adminRuleId !== null ? BigInt(object.adminRuleId.toString()) : BigInt(0);
    message.signRuleId = object.signRuleId !== undefined && object.signRuleId !== null ? BigInt(object.signRuleId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: SpaceAmino): Space {
    const message = createBaseSpace();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    message.owners = object.owners?.map(e => e) || [];
    if (object.admin_rule_id !== undefined && object.admin_rule_id !== null) {
      message.adminRuleId = BigInt(object.admin_rule_id);
    }
    if (object.sign_rule_id !== undefined && object.sign_rule_id !== null) {
      message.signRuleId = BigInt(object.sign_rule_id);
    }
    return message;
  },
  toAmino(message: Space): SpaceAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.creator = message.creator === "" ? undefined : message.creator;
    if (message.owners) {
      obj.owners = message.owners.map(e => e);
    } else {
      obj.owners = message.owners;
    }
    obj.admin_rule_id = message.adminRuleId !== BigInt(0) ? message.adminRuleId.toString() : undefined;
    obj.sign_rule_id = message.signRuleId !== BigInt(0) ? message.signRuleId.toString() : undefined;
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