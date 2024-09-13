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
   * Optional ID of the Template to be applied to every *admin* operation.
   * If not specified, the default Template is used.
   * 
   * Admin operations are:
   * - warden.warden.Msg.AddSpaceOwner
   * - warden.warden.Msg.RemoveSpaceOwner
   * - warden.warden.Msg.UpdateSpace
   * 
   * The default Template is to allow any operation when at least one of its
   * owner approves it.
   */
  adminTemplateId: bigint;
  /**
   * Optional ID of the Template to be applied to every *sign* operation.
   * If not specified, the default Template is used.
   * 
   * Sign operations are:
   * - warden.warden.Msg.NewKeyRequest
   * - warden.warden.Msg.NewSignRequest
   * - warden.warden.Msg.UpdateKey
   * 
   * The default Template is to allow any operation when at least one of its
   * owner approves it.
   */
  signTemplateId: bigint;
  /** Version of the space. Every time the Space is updated, this number gets increasead by one. */
  nonce: bigint;
  /**
   * Optional ID of the Template to be applied to every approve vote on *admin* operation.
   * If not specified, the default Template is used.
   * 
   * Admin operations are:
   * - warden.warden.Msg.AddSpaceOwner
   * - warden.warden.Msg.RemoveSpaceOwner
   * - warden.warden.Msg.UpdateSpace
   * 
   * The default Template is to allow any operation when at least one of its
   * owner approves it.
   */
  approveAdminTemplateId: bigint;
  /**
   * Optional ID of the Template to be applied to every reject vote on *admin* operation.
   * If not specified, the default Template is used.
   * 
   * Admin operations are:
   * - warden.warden.Msg.AddSpaceOwner
   * - warden.warden.Msg.RemoveSpaceOwner
   * - warden.warden.Msg.UpdateSpace
   * 
   * The default Template is to allow any operation when at least one of its
   * owner approves it.
   */
  rejectAdminTemplateId: bigint;
  /**
   * Optional ID of the Template to be applied to every approve vote on *sign* operation.
   * If not specified, the default Template is used.
   * 
   * Sign operations are:
   * - warden.warden.Msg.NewKeyRequest
   * - warden.warden.Msg.NewSignRequest
   * - warden.warden.Msg.UpdateKey
   * 
   * The default Template is to allow any operation when at least one of its
   * owner approves it.
   */
  approveSignTemplateId: bigint;
  /**
   * Optional ID of the Template to be applied to every reject vote on *sign* operation.
   * If not specified, the default Template is used.
   * 
   * Sign operations are:
   * - warden.warden.Msg.NewKeyRequest
   * - warden.warden.Msg.NewSignRequest
   * - warden.warden.Msg.UpdateKey
   * 
   * The default Template is to allow any operation when at least one of its
   * owner approves it.
   */
  rejectSignTemplateId: bigint;
}
export interface SpaceProtoMsg {
  typeUrl: "/warden.warden.v1beta3.Space";
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
   * Optional ID of the Template to be applied to every *admin* operation.
   * If not specified, the default Template is used.
   * 
   * Admin operations are:
   * - warden.warden.Msg.AddSpaceOwner
   * - warden.warden.Msg.RemoveSpaceOwner
   * - warden.warden.Msg.UpdateSpace
   * 
   * The default Template is to allow any operation when at least one of its
   * owner approves it.
   */
  admin_template_id?: string;
  /**
   * Optional ID of the Template to be applied to every *sign* operation.
   * If not specified, the default Template is used.
   * 
   * Sign operations are:
   * - warden.warden.Msg.NewKeyRequest
   * - warden.warden.Msg.NewSignRequest
   * - warden.warden.Msg.UpdateKey
   * 
   * The default Template is to allow any operation when at least one of its
   * owner approves it.
   */
  sign_template_id?: string;
  /** Version of the space. Every time the Space is updated, this number gets increasead by one. */
  nonce?: string;
  /**
   * Optional ID of the Template to be applied to every approve vote on *admin* operation.
   * If not specified, the default Template is used.
   * 
   * Admin operations are:
   * - warden.warden.Msg.AddSpaceOwner
   * - warden.warden.Msg.RemoveSpaceOwner
   * - warden.warden.Msg.UpdateSpace
   * 
   * The default Template is to allow any operation when at least one of its
   * owner approves it.
   */
  approve_admin_template_id?: string;
  /**
   * Optional ID of the Template to be applied to every reject vote on *admin* operation.
   * If not specified, the default Template is used.
   * 
   * Admin operations are:
   * - warden.warden.Msg.AddSpaceOwner
   * - warden.warden.Msg.RemoveSpaceOwner
   * - warden.warden.Msg.UpdateSpace
   * 
   * The default Template is to allow any operation when at least one of its
   * owner approves it.
   */
  reject_admin_template_id?: string;
  /**
   * Optional ID of the Template to be applied to every approve vote on *sign* operation.
   * If not specified, the default Template is used.
   * 
   * Sign operations are:
   * - warden.warden.Msg.NewKeyRequest
   * - warden.warden.Msg.NewSignRequest
   * - warden.warden.Msg.UpdateKey
   * 
   * The default Template is to allow any operation when at least one of its
   * owner approves it.
   */
  approve_sign_template_id?: string;
  /**
   * Optional ID of the Template to be applied to every reject vote on *sign* operation.
   * If not specified, the default Template is used.
   * 
   * Sign operations are:
   * - warden.warden.Msg.NewKeyRequest
   * - warden.warden.Msg.NewSignRequest
   * - warden.warden.Msg.UpdateKey
   * 
   * The default Template is to allow any operation when at least one of its
   * owner approves it.
   */
  reject_sign_template_id?: string;
}
export interface SpaceAminoMsg {
  type: "/warden.warden.v1beta3.Space";
  value: SpaceAmino;
}
/** Space is a collection of users (called owners) that manages a set of Keys. */
export interface SpaceSDKType {
  id: bigint;
  creator: string;
  owners: string[];
  admin_template_id: bigint;
  sign_template_id: bigint;
  nonce: bigint;
  approve_admin_template_id: bigint;
  reject_admin_template_id: bigint;
  approve_sign_template_id: bigint;
  reject_sign_template_id: bigint;
}
function createBaseSpace(): Space {
  return {
    id: BigInt(0),
    creator: "",
    owners: [],
    adminTemplateId: BigInt(0),
    signTemplateId: BigInt(0),
    nonce: BigInt(0),
    approveAdminTemplateId: BigInt(0),
    rejectAdminTemplateId: BigInt(0),
    approveSignTemplateId: BigInt(0),
    rejectSignTemplateId: BigInt(0)
  };
}
export const Space = {
  typeUrl: "/warden.warden.v1beta3.Space",
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
    if (message.adminTemplateId !== BigInt(0)) {
      writer.uint32(40).uint64(message.adminTemplateId);
    }
    if (message.signTemplateId !== BigInt(0)) {
      writer.uint32(48).uint64(message.signTemplateId);
    }
    if (message.nonce !== BigInt(0)) {
      writer.uint32(56).uint64(message.nonce);
    }
    if (message.approveAdminTemplateId !== BigInt(0)) {
      writer.uint32(64).uint64(message.approveAdminTemplateId);
    }
    if (message.rejectAdminTemplateId !== BigInt(0)) {
      writer.uint32(72).uint64(message.rejectAdminTemplateId);
    }
    if (message.approveSignTemplateId !== BigInt(0)) {
      writer.uint32(80).uint64(message.approveSignTemplateId);
    }
    if (message.rejectSignTemplateId !== BigInt(0)) {
      writer.uint32(88).uint64(message.rejectSignTemplateId);
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
          message.adminTemplateId = reader.uint64();
          break;
        case 6:
          message.signTemplateId = reader.uint64();
          break;
        case 7:
          message.nonce = reader.uint64();
          break;
        case 8:
          message.approveAdminTemplateId = reader.uint64();
          break;
        case 9:
          message.rejectAdminTemplateId = reader.uint64();
          break;
        case 10:
          message.approveSignTemplateId = reader.uint64();
          break;
        case 11:
          message.rejectSignTemplateId = reader.uint64();
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
      adminTemplateId: isSet(object.adminTemplateId) ? BigInt(object.adminTemplateId.toString()) : BigInt(0),
      signTemplateId: isSet(object.signTemplateId) ? BigInt(object.signTemplateId.toString()) : BigInt(0),
      nonce: isSet(object.nonce) ? BigInt(object.nonce.toString()) : BigInt(0),
      approveAdminTemplateId: isSet(object.approveAdminTemplateId) ? BigInt(object.approveAdminTemplateId.toString()) : BigInt(0),
      rejectAdminTemplateId: isSet(object.rejectAdminTemplateId) ? BigInt(object.rejectAdminTemplateId.toString()) : BigInt(0),
      approveSignTemplateId: isSet(object.approveSignTemplateId) ? BigInt(object.approveSignTemplateId.toString()) : BigInt(0),
      rejectSignTemplateId: isSet(object.rejectSignTemplateId) ? BigInt(object.rejectSignTemplateId.toString()) : BigInt(0)
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
    message.adminTemplateId !== undefined && (obj.adminTemplateId = (message.adminTemplateId || BigInt(0)).toString());
    message.signTemplateId !== undefined && (obj.signTemplateId = (message.signTemplateId || BigInt(0)).toString());
    message.nonce !== undefined && (obj.nonce = (message.nonce || BigInt(0)).toString());
    message.approveAdminTemplateId !== undefined && (obj.approveAdminTemplateId = (message.approveAdminTemplateId || BigInt(0)).toString());
    message.rejectAdminTemplateId !== undefined && (obj.rejectAdminTemplateId = (message.rejectAdminTemplateId || BigInt(0)).toString());
    message.approveSignTemplateId !== undefined && (obj.approveSignTemplateId = (message.approveSignTemplateId || BigInt(0)).toString());
    message.rejectSignTemplateId !== undefined && (obj.rejectSignTemplateId = (message.rejectSignTemplateId || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<Space>): Space {
    const message = createBaseSpace();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.creator = object.creator ?? "";
    message.owners = object.owners?.map(e => e) || [];
    message.adminTemplateId = object.adminTemplateId !== undefined && object.adminTemplateId !== null ? BigInt(object.adminTemplateId.toString()) : BigInt(0);
    message.signTemplateId = object.signTemplateId !== undefined && object.signTemplateId !== null ? BigInt(object.signTemplateId.toString()) : BigInt(0);
    message.nonce = object.nonce !== undefined && object.nonce !== null ? BigInt(object.nonce.toString()) : BigInt(0);
    message.approveAdminTemplateId = object.approveAdminTemplateId !== undefined && object.approveAdminTemplateId !== null ? BigInt(object.approveAdminTemplateId.toString()) : BigInt(0);
    message.rejectAdminTemplateId = object.rejectAdminTemplateId !== undefined && object.rejectAdminTemplateId !== null ? BigInt(object.rejectAdminTemplateId.toString()) : BigInt(0);
    message.approveSignTemplateId = object.approveSignTemplateId !== undefined && object.approveSignTemplateId !== null ? BigInt(object.approveSignTemplateId.toString()) : BigInt(0);
    message.rejectSignTemplateId = object.rejectSignTemplateId !== undefined && object.rejectSignTemplateId !== null ? BigInt(object.rejectSignTemplateId.toString()) : BigInt(0);
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
    if (object.admin_template_id !== undefined && object.admin_template_id !== null) {
      message.adminTemplateId = BigInt(object.admin_template_id);
    }
    if (object.sign_template_id !== undefined && object.sign_template_id !== null) {
      message.signTemplateId = BigInt(object.sign_template_id);
    }
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = BigInt(object.nonce);
    }
    if (object.approve_admin_template_id !== undefined && object.approve_admin_template_id !== null) {
      message.approveAdminTemplateId = BigInt(object.approve_admin_template_id);
    }
    if (object.reject_admin_template_id !== undefined && object.reject_admin_template_id !== null) {
      message.rejectAdminTemplateId = BigInt(object.reject_admin_template_id);
    }
    if (object.approve_sign_template_id !== undefined && object.approve_sign_template_id !== null) {
      message.approveSignTemplateId = BigInt(object.approve_sign_template_id);
    }
    if (object.reject_sign_template_id !== undefined && object.reject_sign_template_id !== null) {
      message.rejectSignTemplateId = BigInt(object.reject_sign_template_id);
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
    obj.admin_template_id = message.adminTemplateId !== BigInt(0) ? message.adminTemplateId.toString() : undefined;
    obj.sign_template_id = message.signTemplateId !== BigInt(0) ? message.signTemplateId.toString() : undefined;
    obj.nonce = message.nonce !== BigInt(0) ? message.nonce.toString() : undefined;
    obj.approve_admin_template_id = message.approveAdminTemplateId !== BigInt(0) ? message.approveAdminTemplateId.toString() : undefined;
    obj.reject_admin_template_id = message.rejectAdminTemplateId !== BigInt(0) ? message.rejectAdminTemplateId.toString() : undefined;
    obj.approve_sign_template_id = message.approveSignTemplateId !== BigInt(0) ? message.approveSignTemplateId.toString() : undefined;
    obj.reject_sign_template_id = message.rejectSignTemplateId !== BigInt(0) ? message.rejectSignTemplateId.toString() : undefined;
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
      typeUrl: "/warden.warden.v1beta3.Space",
      value: Space.encode(message).finish()
    };
  }
};