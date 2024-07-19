//@ts-nocheck
import { KeyType, keyTypeFromJSON, keyTypeToJSON } from "./key.js";
import { KeychainFees, KeychainFeesAmino, KeychainFeesSDKType } from "./keychain.js";
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet } from "../../../helpers.js";
import { JsonSafe } from "../../../json-safe.js";
/** EventCreateSpace is emitted on Space creation */
export interface EventCreateSpace {
  /** id of the new space */
  id: bigint;
  /** creator is the account address of the space creator */
  creator: string;
  /** owners_count is the count of the space owners */
  ownersCount: bigint;
  /** id of the rule to be applied to every admin operation */
  adminRuleId: bigint;
  /** id of the rule to be applied to every sign operation */
  signRuleId: bigint;
}
export interface EventCreateSpaceProtoMsg {
  typeUrl: "/warden.warden.v1beta3.EventCreateSpace";
  value: Uint8Array;
}
/** EventCreateSpace is emitted on Space creation */
export interface EventCreateSpaceAmino {
  /** id of the new space */
  id?: string;
  /** creator is the account address of the space creator */
  creator?: string;
  /** owners_count is the count of the space owners */
  owners_count?: string;
  /** id of the rule to be applied to every admin operation */
  admin_rule_id?: string;
  /** id of the rule to be applied to every sign operation */
  sign_rule_id?: string;
}
export interface EventCreateSpaceAminoMsg {
  type: "/warden.warden.v1beta3.EventCreateSpace";
  value: EventCreateSpaceAmino;
}
/** EventCreateSpace is emitted on Space creation */
export interface EventCreateSpaceSDKType {
  id: bigint;
  creator: string;
  owners_count: bigint;
  admin_rule_id: bigint;
  sign_rule_id: bigint;
}
/** EventUpdateSpace is emitted when Space is updated */
export interface EventUpdateSpace {
  /** id of the space being updated */
  spaceId: bigint;
  /** id of the rule to be applied to every admin operation */
  adminRuleId: bigint;
  /** id of the rule to be applied to every sign operation */
  signRuleId: bigint;
}
export interface EventUpdateSpaceProtoMsg {
  typeUrl: "/warden.warden.v1beta3.EventUpdateSpace";
  value: Uint8Array;
}
/** EventUpdateSpace is emitted when Space is updated */
export interface EventUpdateSpaceAmino {
  /** id of the space being updated */
  space_id?: string;
  /** id of the rule to be applied to every admin operation */
  admin_rule_id?: string;
  /** id of the rule to be applied to every sign operation */
  sign_rule_id?: string;
}
export interface EventUpdateSpaceAminoMsg {
  type: "/warden.warden.v1beta3.EventUpdateSpace";
  value: EventUpdateSpaceAmino;
}
/** EventUpdateSpace is emitted when Space is updated */
export interface EventUpdateSpaceSDKType {
  space_id: bigint;
  admin_rule_id: bigint;
  sign_rule_id: bigint;
}
/** EventAddSpaceOwner is emitted when a new owner is added */
export interface EventAddSpaceOwner {
  /** id of the space being updated */
  spaceId: bigint;
  /** new_owner is the address of the new space owner */
  newOwner: string;
  /** owners_count is the new count of space owners */
  ownersCount: bigint;
}
export interface EventAddSpaceOwnerProtoMsg {
  typeUrl: "/warden.warden.v1beta3.EventAddSpaceOwner";
  value: Uint8Array;
}
/** EventAddSpaceOwner is emitted when a new owner is added */
export interface EventAddSpaceOwnerAmino {
  /** id of the space being updated */
  space_id?: string;
  /** new_owner is the address of the new space owner */
  new_owner?: string;
  /** owners_count is the new count of space owners */
  owners_count?: string;
}
export interface EventAddSpaceOwnerAminoMsg {
  type: "/warden.warden.v1beta3.EventAddSpaceOwner";
  value: EventAddSpaceOwnerAmino;
}
/** EventAddSpaceOwner is emitted when a new owner is added */
export interface EventAddSpaceOwnerSDKType {
  space_id: bigint;
  new_owner: string;
  owners_count: bigint;
}
/** EventRemoveSpaceOwner is emitted when an owner is removed */
export interface EventRemoveSpaceOwner {
  /** id of the space being updated */
  spaceId: bigint;
  /** removed_owner is the address of the removed space owner */
  removedOwner: string;
  /** owners_count is the new count of space owners */
  ownersCount: bigint;
}
export interface EventRemoveSpaceOwnerProtoMsg {
  typeUrl: "/warden.warden.v1beta3.EventRemoveSpaceOwner";
  value: Uint8Array;
}
/** EventRemoveSpaceOwner is emitted when an owner is removed */
export interface EventRemoveSpaceOwnerAmino {
  /** id of the space being updated */
  space_id?: string;
  /** removed_owner is the address of the removed space owner */
  removed_owner?: string;
  /** owners_count is the new count of space owners */
  owners_count?: string;
}
export interface EventRemoveSpaceOwnerAminoMsg {
  type: "/warden.warden.v1beta3.EventRemoveSpaceOwner";
  value: EventRemoveSpaceOwnerAmino;
}
/** EventRemoveSpaceOwner is emitted when an owner is removed */
export interface EventRemoveSpaceOwnerSDKType {
  space_id: bigint;
  removed_owner: string;
  owners_count: bigint;
}
/** EventNewKeyRequest is emitted on new key request */
export interface EventNewKeyRequest {
  /** id of the new key request */
  id: bigint;
  /** space_id associated with the key request */
  spaceId: bigint;
  /** keychain_id associated with the key request */
  keychainId: bigint;
  /** id of the rule to be applied to every sign operation for this key */
  ruleId: bigint;
  /** the crypto scheme requested for this key */
  keyType: KeyType;
  /** address of the account that requested the key */
  creator: string;
}
export interface EventNewKeyRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta3.EventNewKeyRequest";
  value: Uint8Array;
}
/** EventNewKeyRequest is emitted on new key request */
export interface EventNewKeyRequestAmino {
  /** id of the new key request */
  id?: string;
  /** space_id associated with the key request */
  space_id?: string;
  /** keychain_id associated with the key request */
  keychain_id?: string;
  /** id of the rule to be applied to every sign operation for this key */
  rule_id?: string;
  /** the crypto scheme requested for this key */
  key_type?: KeyType;
  /** address of the account that requested the key */
  creator?: string;
}
export interface EventNewKeyRequestAminoMsg {
  type: "/warden.warden.v1beta3.EventNewKeyRequest";
  value: EventNewKeyRequestAmino;
}
/** EventNewKeyRequest is emitted on new key request */
export interface EventNewKeyRequestSDKType {
  id: bigint;
  space_id: bigint;
  keychain_id: bigint;
  rule_id: bigint;
  key_type: KeyType;
  creator: string;
}
/** EventNewKey is emitted when a new Key is created */
export interface EventNewKey {
  /** id of the new key */
  id: bigint;
  /** the crypto scheme used by this key */
  keyType: KeyType;
  /** space_id associated with the key request */
  spaceId: bigint;
  /** keychain_id associated with the key request */
  keychainId: bigint;
  /** id of the rule to be applied to every sign operation for this key */
  ruleId: bigint;
}
export interface EventNewKeyProtoMsg {
  typeUrl: "/warden.warden.v1beta3.EventNewKey";
  value: Uint8Array;
}
/** EventNewKey is emitted when a new Key is created */
export interface EventNewKeyAmino {
  /** id of the new key */
  id?: string;
  /** the crypto scheme used by this key */
  key_type?: KeyType;
  /** space_id associated with the key request */
  space_id?: string;
  /** keychain_id associated with the key request */
  keychain_id?: string;
  /** id of the rule to be applied to every sign operation for this key */
  rule_id?: string;
}
export interface EventNewKeyAminoMsg {
  type: "/warden.warden.v1beta3.EventNewKey";
  value: EventNewKeyAmino;
}
/** EventNewKey is emitted when a new Key is created */
export interface EventNewKeySDKType {
  id: bigint;
  key_type: KeyType;
  space_id: bigint;
  keychain_id: bigint;
  rule_id: bigint;
}
/** EventRejectKeyRequest is emitted when a Key request is rejected */
export interface EventRejectKeyRequest {
  /** id of the key request */
  id: bigint;
}
export interface EventRejectKeyRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta3.EventRejectKeyRequest";
  value: Uint8Array;
}
/** EventRejectKeyRequest is emitted when a Key request is rejected */
export interface EventRejectKeyRequestAmino {
  /** id of the key request */
  id?: string;
}
export interface EventRejectKeyRequestAminoMsg {
  type: "/warden.warden.v1beta3.EventRejectKeyRequest";
  value: EventRejectKeyRequestAmino;
}
/** EventRejectKeyRequest is emitted when a Key request is rejected */
export interface EventRejectKeyRequestSDKType {
  id: bigint;
}
/** EventUpdateKey is emitted when a key is updated */
export interface EventUpdateKey {
  /** id of the key */
  id: bigint;
  /** id of the rule to be applied to every sign operation */
  ruleId: bigint;
}
export interface EventUpdateKeyProtoMsg {
  typeUrl: "/warden.warden.v1beta3.EventUpdateKey";
  value: Uint8Array;
}
/** EventUpdateKey is emitted when a key is updated */
export interface EventUpdateKeyAmino {
  /** id of the key */
  id?: string;
  /** id of the rule to be applied to every sign operation */
  rule_id?: string;
}
export interface EventUpdateKeyAminoMsg {
  type: "/warden.warden.v1beta3.EventUpdateKey";
  value: EventUpdateKeyAmino;
}
/** EventUpdateKey is emitted when a key is updated */
export interface EventUpdateKeySDKType {
  id: bigint;
  rule_id: bigint;
}
/** EventNewSignRequest is emitted on new signature requests */
export interface EventNewSignRequest {
  /** id of the signature request */
  id: bigint;
  /** id of the Key to be used for signing */
  keyId: bigint;
  /** address of the account that requested the signature */
  creator: string;
}
export interface EventNewSignRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta3.EventNewSignRequest";
  value: Uint8Array;
}
/** EventNewSignRequest is emitted on new signature requests */
export interface EventNewSignRequestAmino {
  /** id of the signature request */
  id?: string;
  /** id of the Key to be used for signing */
  key_id?: string;
  /** address of the account that requested the signature */
  creator?: string;
}
export interface EventNewSignRequestAminoMsg {
  type: "/warden.warden.v1beta3.EventNewSignRequest";
  value: EventNewSignRequestAmino;
}
/** EventNewSignRequest is emitted on new signature requests */
export interface EventNewSignRequestSDKType {
  id: bigint;
  key_id: bigint;
  creator: string;
}
/** EventRequestNewSignatureFulfilled is emitted when signature request is fulfilled */
export interface EventFulfilSignRequest {
  /** id of the sign request */
  id: bigint;
}
export interface EventFulfilSignRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta3.EventFulfilSignRequest";
  value: Uint8Array;
}
/** EventRequestNewSignatureFulfilled is emitted when signature request is fulfilled */
export interface EventFulfilSignRequestAmino {
  /** id of the sign request */
  id?: string;
}
export interface EventFulfilSignRequestAminoMsg {
  type: "/warden.warden.v1beta3.EventFulfilSignRequest";
  value: EventFulfilSignRequestAmino;
}
/** EventRequestNewSignatureFulfilled is emitted when signature request is fulfilled */
export interface EventFulfilSignRequestSDKType {
  id: bigint;
}
/** EventRejectSignRequest is emitted when a signature request is rejected */
export interface EventRejectSignRequest {
  /** id of the signature request */
  id: bigint;
}
export interface EventRejectSignRequestProtoMsg {
  typeUrl: "/warden.warden.v1beta3.EventRejectSignRequest";
  value: Uint8Array;
}
/** EventRejectSignRequest is emitted when a signature request is rejected */
export interface EventRejectSignRequestAmino {
  /** id of the signature request */
  id?: string;
}
export interface EventRejectSignRequestAminoMsg {
  type: "/warden.warden.v1beta3.EventRejectSignRequest";
  value: EventRejectSignRequestAmino;
}
/** EventRejectSignRequest is emitted when a signature request is rejected */
export interface EventRejectSignRequestSDKType {
  id: bigint;
}
/** EventNewKeychain is emitted on Keychain creation */
export interface EventNewKeychain {
  /** id of the new keychain */
  id: bigint;
  /** address of the account that created the keychain */
  creator: string;
  /** amount of charging fees for key and signature requests */
  keychainFees?: KeychainFees;
}
export interface EventNewKeychainProtoMsg {
  typeUrl: "/warden.warden.v1beta3.EventNewKeychain";
  value: Uint8Array;
}
/** EventNewKeychain is emitted on Keychain creation */
export interface EventNewKeychainAmino {
  /** id of the new keychain */
  id?: string;
  /** address of the account that created the keychain */
  creator?: string;
  /** amount of charging fees for key and signature requests */
  keychain_fees?: KeychainFeesAmino;
}
export interface EventNewKeychainAminoMsg {
  type: "/warden.warden.v1beta3.EventNewKeychain";
  value: EventNewKeychainAmino;
}
/** EventNewKeychain is emitted on Keychain creation */
export interface EventNewKeychainSDKType {
  id: bigint;
  creator: string;
  keychain_fees?: KeychainFeesSDKType;
}
/** EventUpdateKeychain is emitted when a Keychain is updated */
export interface EventUpdateKeychain {
  /** id of the keychain */
  id: bigint;
  /** amount of charging fees for key and signature requests */
  keychainFees?: KeychainFees;
}
export interface EventUpdateKeychainProtoMsg {
  typeUrl: "/warden.warden.v1beta3.EventUpdateKeychain";
  value: Uint8Array;
}
/** EventUpdateKeychain is emitted when a Keychain is updated */
export interface EventUpdateKeychainAmino {
  /** id of the keychain */
  id?: string;
  /** amount of charging fees for key and signature requests */
  keychain_fees?: KeychainFeesAmino;
}
export interface EventUpdateKeychainAminoMsg {
  type: "/warden.warden.v1beta3.EventUpdateKeychain";
  value: EventUpdateKeychainAmino;
}
/** EventUpdateKeychain is emitted when a Keychain is updated */
export interface EventUpdateKeychainSDKType {
  id: bigint;
  keychain_fees?: KeychainFeesSDKType;
}
/** EventAddKeychainWriter is emitted when a new writer address is added to a Keychain */
export interface EventAddKeychainWriter {
  /** id of the keychain */
  id: bigint;
  /** address of the new writer */
  newWriter: string;
  /** updated count of writers */
  writersCount: bigint;
}
export interface EventAddKeychainWriterProtoMsg {
  typeUrl: "/warden.warden.v1beta3.EventAddKeychainWriter";
  value: Uint8Array;
}
/** EventAddKeychainWriter is emitted when a new writer address is added to a Keychain */
export interface EventAddKeychainWriterAmino {
  /** id of the keychain */
  id?: string;
  /** address of the new writer */
  new_writer?: string;
  /** updated count of writers */
  writers_count?: string;
}
export interface EventAddKeychainWriterAminoMsg {
  type: "/warden.warden.v1beta3.EventAddKeychainWriter";
  value: EventAddKeychainWriterAmino;
}
/** EventAddKeychainWriter is emitted when a new writer address is added to a Keychain */
export interface EventAddKeychainWriterSDKType {
  id: bigint;
  new_writer: string;
  writers_count: bigint;
}
function createBaseEventCreateSpace(): EventCreateSpace {
  return {
    id: BigInt(0),
    creator: "",
    ownersCount: BigInt(0),
    adminRuleId: BigInt(0),
    signRuleId: BigInt(0)
  };
}
export const EventCreateSpace = {
  typeUrl: "/warden.warden.v1beta3.EventCreateSpace",
  encode(message: EventCreateSpace, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.ownersCount !== BigInt(0)) {
      writer.uint32(24).uint64(message.ownersCount);
    }
    if (message.adminRuleId !== BigInt(0)) {
      writer.uint32(32).uint64(message.adminRuleId);
    }
    if (message.signRuleId !== BigInt(0)) {
      writer.uint32(40).uint64(message.signRuleId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventCreateSpace {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventCreateSpace();
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
          message.ownersCount = reader.uint64();
          break;
        case 4:
          message.adminRuleId = reader.uint64();
          break;
        case 5:
          message.signRuleId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EventCreateSpace {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      creator: isSet(object.creator) ? String(object.creator) : "",
      ownersCount: isSet(object.ownersCount) ? BigInt(object.ownersCount.toString()) : BigInt(0),
      adminRuleId: isSet(object.adminRuleId) ? BigInt(object.adminRuleId.toString()) : BigInt(0),
      signRuleId: isSet(object.signRuleId) ? BigInt(object.signRuleId.toString()) : BigInt(0)
    };
  },
  toJSON(message: EventCreateSpace): JsonSafe<EventCreateSpace> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.creator !== undefined && (obj.creator = message.creator);
    message.ownersCount !== undefined && (obj.ownersCount = (message.ownersCount || BigInt(0)).toString());
    message.adminRuleId !== undefined && (obj.adminRuleId = (message.adminRuleId || BigInt(0)).toString());
    message.signRuleId !== undefined && (obj.signRuleId = (message.signRuleId || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<EventCreateSpace>): EventCreateSpace {
    const message = createBaseEventCreateSpace();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.creator = object.creator ?? "";
    message.ownersCount = object.ownersCount !== undefined && object.ownersCount !== null ? BigInt(object.ownersCount.toString()) : BigInt(0);
    message.adminRuleId = object.adminRuleId !== undefined && object.adminRuleId !== null ? BigInt(object.adminRuleId.toString()) : BigInt(0);
    message.signRuleId = object.signRuleId !== undefined && object.signRuleId !== null ? BigInt(object.signRuleId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: EventCreateSpaceAmino): EventCreateSpace {
    const message = createBaseEventCreateSpace();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.owners_count !== undefined && object.owners_count !== null) {
      message.ownersCount = BigInt(object.owners_count);
    }
    if (object.admin_rule_id !== undefined && object.admin_rule_id !== null) {
      message.adminRuleId = BigInt(object.admin_rule_id);
    }
    if (object.sign_rule_id !== undefined && object.sign_rule_id !== null) {
      message.signRuleId = BigInt(object.sign_rule_id);
    }
    return message;
  },
  toAmino(message: EventCreateSpace): EventCreateSpaceAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.owners_count = message.ownersCount !== BigInt(0) ? message.ownersCount.toString() : undefined;
    obj.admin_rule_id = message.adminRuleId !== BigInt(0) ? message.adminRuleId.toString() : undefined;
    obj.sign_rule_id = message.signRuleId !== BigInt(0) ? message.signRuleId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: EventCreateSpaceAminoMsg): EventCreateSpace {
    return EventCreateSpace.fromAmino(object.value);
  },
  fromProtoMsg(message: EventCreateSpaceProtoMsg): EventCreateSpace {
    return EventCreateSpace.decode(message.value);
  },
  toProto(message: EventCreateSpace): Uint8Array {
    return EventCreateSpace.encode(message).finish();
  },
  toProtoMsg(message: EventCreateSpace): EventCreateSpaceProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.EventCreateSpace",
      value: EventCreateSpace.encode(message).finish()
    };
  }
};
function createBaseEventUpdateSpace(): EventUpdateSpace {
  return {
    spaceId: BigInt(0),
    adminRuleId: BigInt(0),
    signRuleId: BigInt(0)
  };
}
export const EventUpdateSpace = {
  typeUrl: "/warden.warden.v1beta3.EventUpdateSpace",
  encode(message: EventUpdateSpace, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.spaceId !== BigInt(0)) {
      writer.uint32(8).uint64(message.spaceId);
    }
    if (message.adminRuleId !== BigInt(0)) {
      writer.uint32(16).uint64(message.adminRuleId);
    }
    if (message.signRuleId !== BigInt(0)) {
      writer.uint32(24).uint64(message.signRuleId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventUpdateSpace {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventUpdateSpace();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.spaceId = reader.uint64();
          break;
        case 2:
          message.adminRuleId = reader.uint64();
          break;
        case 3:
          message.signRuleId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EventUpdateSpace {
    return {
      spaceId: isSet(object.spaceId) ? BigInt(object.spaceId.toString()) : BigInt(0),
      adminRuleId: isSet(object.adminRuleId) ? BigInt(object.adminRuleId.toString()) : BigInt(0),
      signRuleId: isSet(object.signRuleId) ? BigInt(object.signRuleId.toString()) : BigInt(0)
    };
  },
  toJSON(message: EventUpdateSpace): JsonSafe<EventUpdateSpace> {
    const obj: any = {};
    message.spaceId !== undefined && (obj.spaceId = (message.spaceId || BigInt(0)).toString());
    message.adminRuleId !== undefined && (obj.adminRuleId = (message.adminRuleId || BigInt(0)).toString());
    message.signRuleId !== undefined && (obj.signRuleId = (message.signRuleId || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<EventUpdateSpace>): EventUpdateSpace {
    const message = createBaseEventUpdateSpace();
    message.spaceId = object.spaceId !== undefined && object.spaceId !== null ? BigInt(object.spaceId.toString()) : BigInt(0);
    message.adminRuleId = object.adminRuleId !== undefined && object.adminRuleId !== null ? BigInt(object.adminRuleId.toString()) : BigInt(0);
    message.signRuleId = object.signRuleId !== undefined && object.signRuleId !== null ? BigInt(object.signRuleId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: EventUpdateSpaceAmino): EventUpdateSpace {
    const message = createBaseEventUpdateSpace();
    if (object.space_id !== undefined && object.space_id !== null) {
      message.spaceId = BigInt(object.space_id);
    }
    if (object.admin_rule_id !== undefined && object.admin_rule_id !== null) {
      message.adminRuleId = BigInt(object.admin_rule_id);
    }
    if (object.sign_rule_id !== undefined && object.sign_rule_id !== null) {
      message.signRuleId = BigInt(object.sign_rule_id);
    }
    return message;
  },
  toAmino(message: EventUpdateSpace): EventUpdateSpaceAmino {
    const obj: any = {};
    obj.space_id = message.spaceId !== BigInt(0) ? message.spaceId.toString() : undefined;
    obj.admin_rule_id = message.adminRuleId !== BigInt(0) ? message.adminRuleId.toString() : undefined;
    obj.sign_rule_id = message.signRuleId !== BigInt(0) ? message.signRuleId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: EventUpdateSpaceAminoMsg): EventUpdateSpace {
    return EventUpdateSpace.fromAmino(object.value);
  },
  fromProtoMsg(message: EventUpdateSpaceProtoMsg): EventUpdateSpace {
    return EventUpdateSpace.decode(message.value);
  },
  toProto(message: EventUpdateSpace): Uint8Array {
    return EventUpdateSpace.encode(message).finish();
  },
  toProtoMsg(message: EventUpdateSpace): EventUpdateSpaceProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.EventUpdateSpace",
      value: EventUpdateSpace.encode(message).finish()
    };
  }
};
function createBaseEventAddSpaceOwner(): EventAddSpaceOwner {
  return {
    spaceId: BigInt(0),
    newOwner: "",
    ownersCount: BigInt(0)
  };
}
export const EventAddSpaceOwner = {
  typeUrl: "/warden.warden.v1beta3.EventAddSpaceOwner",
  encode(message: EventAddSpaceOwner, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.spaceId !== BigInt(0)) {
      writer.uint32(8).uint64(message.spaceId);
    }
    if (message.newOwner !== "") {
      writer.uint32(18).string(message.newOwner);
    }
    if (message.ownersCount !== BigInt(0)) {
      writer.uint32(24).uint64(message.ownersCount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventAddSpaceOwner {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventAddSpaceOwner();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.spaceId = reader.uint64();
          break;
        case 2:
          message.newOwner = reader.string();
          break;
        case 3:
          message.ownersCount = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EventAddSpaceOwner {
    return {
      spaceId: isSet(object.spaceId) ? BigInt(object.spaceId.toString()) : BigInt(0),
      newOwner: isSet(object.newOwner) ? String(object.newOwner) : "",
      ownersCount: isSet(object.ownersCount) ? BigInt(object.ownersCount.toString()) : BigInt(0)
    };
  },
  toJSON(message: EventAddSpaceOwner): JsonSafe<EventAddSpaceOwner> {
    const obj: any = {};
    message.spaceId !== undefined && (obj.spaceId = (message.spaceId || BigInt(0)).toString());
    message.newOwner !== undefined && (obj.newOwner = message.newOwner);
    message.ownersCount !== undefined && (obj.ownersCount = (message.ownersCount || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<EventAddSpaceOwner>): EventAddSpaceOwner {
    const message = createBaseEventAddSpaceOwner();
    message.spaceId = object.spaceId !== undefined && object.spaceId !== null ? BigInt(object.spaceId.toString()) : BigInt(0);
    message.newOwner = object.newOwner ?? "";
    message.ownersCount = object.ownersCount !== undefined && object.ownersCount !== null ? BigInt(object.ownersCount.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: EventAddSpaceOwnerAmino): EventAddSpaceOwner {
    const message = createBaseEventAddSpaceOwner();
    if (object.space_id !== undefined && object.space_id !== null) {
      message.spaceId = BigInt(object.space_id);
    }
    if (object.new_owner !== undefined && object.new_owner !== null) {
      message.newOwner = object.new_owner;
    }
    if (object.owners_count !== undefined && object.owners_count !== null) {
      message.ownersCount = BigInt(object.owners_count);
    }
    return message;
  },
  toAmino(message: EventAddSpaceOwner): EventAddSpaceOwnerAmino {
    const obj: any = {};
    obj.space_id = message.spaceId !== BigInt(0) ? message.spaceId.toString() : undefined;
    obj.new_owner = message.newOwner === "" ? undefined : message.newOwner;
    obj.owners_count = message.ownersCount !== BigInt(0) ? message.ownersCount.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: EventAddSpaceOwnerAminoMsg): EventAddSpaceOwner {
    return EventAddSpaceOwner.fromAmino(object.value);
  },
  fromProtoMsg(message: EventAddSpaceOwnerProtoMsg): EventAddSpaceOwner {
    return EventAddSpaceOwner.decode(message.value);
  },
  toProto(message: EventAddSpaceOwner): Uint8Array {
    return EventAddSpaceOwner.encode(message).finish();
  },
  toProtoMsg(message: EventAddSpaceOwner): EventAddSpaceOwnerProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.EventAddSpaceOwner",
      value: EventAddSpaceOwner.encode(message).finish()
    };
  }
};
function createBaseEventRemoveSpaceOwner(): EventRemoveSpaceOwner {
  return {
    spaceId: BigInt(0),
    removedOwner: "",
    ownersCount: BigInt(0)
  };
}
export const EventRemoveSpaceOwner = {
  typeUrl: "/warden.warden.v1beta3.EventRemoveSpaceOwner",
  encode(message: EventRemoveSpaceOwner, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.spaceId !== BigInt(0)) {
      writer.uint32(8).uint64(message.spaceId);
    }
    if (message.removedOwner !== "") {
      writer.uint32(18).string(message.removedOwner);
    }
    if (message.ownersCount !== BigInt(0)) {
      writer.uint32(24).uint64(message.ownersCount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventRemoveSpaceOwner {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventRemoveSpaceOwner();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.spaceId = reader.uint64();
          break;
        case 2:
          message.removedOwner = reader.string();
          break;
        case 3:
          message.ownersCount = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EventRemoveSpaceOwner {
    return {
      spaceId: isSet(object.spaceId) ? BigInt(object.spaceId.toString()) : BigInt(0),
      removedOwner: isSet(object.removedOwner) ? String(object.removedOwner) : "",
      ownersCount: isSet(object.ownersCount) ? BigInt(object.ownersCount.toString()) : BigInt(0)
    };
  },
  toJSON(message: EventRemoveSpaceOwner): JsonSafe<EventRemoveSpaceOwner> {
    const obj: any = {};
    message.spaceId !== undefined && (obj.spaceId = (message.spaceId || BigInt(0)).toString());
    message.removedOwner !== undefined && (obj.removedOwner = message.removedOwner);
    message.ownersCount !== undefined && (obj.ownersCount = (message.ownersCount || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<EventRemoveSpaceOwner>): EventRemoveSpaceOwner {
    const message = createBaseEventRemoveSpaceOwner();
    message.spaceId = object.spaceId !== undefined && object.spaceId !== null ? BigInt(object.spaceId.toString()) : BigInt(0);
    message.removedOwner = object.removedOwner ?? "";
    message.ownersCount = object.ownersCount !== undefined && object.ownersCount !== null ? BigInt(object.ownersCount.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: EventRemoveSpaceOwnerAmino): EventRemoveSpaceOwner {
    const message = createBaseEventRemoveSpaceOwner();
    if (object.space_id !== undefined && object.space_id !== null) {
      message.spaceId = BigInt(object.space_id);
    }
    if (object.removed_owner !== undefined && object.removed_owner !== null) {
      message.removedOwner = object.removed_owner;
    }
    if (object.owners_count !== undefined && object.owners_count !== null) {
      message.ownersCount = BigInt(object.owners_count);
    }
    return message;
  },
  toAmino(message: EventRemoveSpaceOwner): EventRemoveSpaceOwnerAmino {
    const obj: any = {};
    obj.space_id = message.spaceId !== BigInt(0) ? message.spaceId.toString() : undefined;
    obj.removed_owner = message.removedOwner === "" ? undefined : message.removedOwner;
    obj.owners_count = message.ownersCount !== BigInt(0) ? message.ownersCount.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: EventRemoveSpaceOwnerAminoMsg): EventRemoveSpaceOwner {
    return EventRemoveSpaceOwner.fromAmino(object.value);
  },
  fromProtoMsg(message: EventRemoveSpaceOwnerProtoMsg): EventRemoveSpaceOwner {
    return EventRemoveSpaceOwner.decode(message.value);
  },
  toProto(message: EventRemoveSpaceOwner): Uint8Array {
    return EventRemoveSpaceOwner.encode(message).finish();
  },
  toProtoMsg(message: EventRemoveSpaceOwner): EventRemoveSpaceOwnerProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.EventRemoveSpaceOwner",
      value: EventRemoveSpaceOwner.encode(message).finish()
    };
  }
};
function createBaseEventNewKeyRequest(): EventNewKeyRequest {
  return {
    id: BigInt(0),
    spaceId: BigInt(0),
    keychainId: BigInt(0),
    ruleId: BigInt(0),
    keyType: 0,
    creator: ""
  };
}
export const EventNewKeyRequest = {
  typeUrl: "/warden.warden.v1beta3.EventNewKeyRequest",
  encode(message: EventNewKeyRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.spaceId !== BigInt(0)) {
      writer.uint32(16).uint64(message.spaceId);
    }
    if (message.keychainId !== BigInt(0)) {
      writer.uint32(24).uint64(message.keychainId);
    }
    if (message.ruleId !== BigInt(0)) {
      writer.uint32(32).uint64(message.ruleId);
    }
    if (message.keyType !== 0) {
      writer.uint32(40).int32(message.keyType);
    }
    if (message.creator !== "") {
      writer.uint32(50).string(message.creator);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventNewKeyRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventNewKeyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.spaceId = reader.uint64();
          break;
        case 3:
          message.keychainId = reader.uint64();
          break;
        case 4:
          message.ruleId = reader.uint64();
          break;
        case 5:
          message.keyType = (reader.int32() as any);
          break;
        case 6:
          message.creator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EventNewKeyRequest {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      spaceId: isSet(object.spaceId) ? BigInt(object.spaceId.toString()) : BigInt(0),
      keychainId: isSet(object.keychainId) ? BigInt(object.keychainId.toString()) : BigInt(0),
      ruleId: isSet(object.ruleId) ? BigInt(object.ruleId.toString()) : BigInt(0),
      keyType: isSet(object.keyType) ? keyTypeFromJSON(object.keyType) : -1,
      creator: isSet(object.creator) ? String(object.creator) : ""
    };
  },
  toJSON(message: EventNewKeyRequest): JsonSafe<EventNewKeyRequest> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.spaceId !== undefined && (obj.spaceId = (message.spaceId || BigInt(0)).toString());
    message.keychainId !== undefined && (obj.keychainId = (message.keychainId || BigInt(0)).toString());
    message.ruleId !== undefined && (obj.ruleId = (message.ruleId || BigInt(0)).toString());
    message.keyType !== undefined && (obj.keyType = keyTypeToJSON(message.keyType));
    message.creator !== undefined && (obj.creator = message.creator);
    return obj;
  },
  fromPartial(object: Partial<EventNewKeyRequest>): EventNewKeyRequest {
    const message = createBaseEventNewKeyRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.spaceId = object.spaceId !== undefined && object.spaceId !== null ? BigInt(object.spaceId.toString()) : BigInt(0);
    message.keychainId = object.keychainId !== undefined && object.keychainId !== null ? BigInt(object.keychainId.toString()) : BigInt(0);
    message.ruleId = object.ruleId !== undefined && object.ruleId !== null ? BigInt(object.ruleId.toString()) : BigInt(0);
    message.keyType = object.keyType ?? 0;
    message.creator = object.creator ?? "";
    return message;
  },
  fromAmino(object: EventNewKeyRequestAmino): EventNewKeyRequest {
    const message = createBaseEventNewKeyRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.space_id !== undefined && object.space_id !== null) {
      message.spaceId = BigInt(object.space_id);
    }
    if (object.keychain_id !== undefined && object.keychain_id !== null) {
      message.keychainId = BigInt(object.keychain_id);
    }
    if (object.rule_id !== undefined && object.rule_id !== null) {
      message.ruleId = BigInt(object.rule_id);
    }
    if (object.key_type !== undefined && object.key_type !== null) {
      message.keyType = object.key_type;
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    return message;
  },
  toAmino(message: EventNewKeyRequest): EventNewKeyRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.space_id = message.spaceId !== BigInt(0) ? message.spaceId.toString() : undefined;
    obj.keychain_id = message.keychainId !== BigInt(0) ? message.keychainId.toString() : undefined;
    obj.rule_id = message.ruleId !== BigInt(0) ? message.ruleId.toString() : undefined;
    obj.key_type = message.keyType === 0 ? undefined : message.keyType;
    obj.creator = message.creator === "" ? undefined : message.creator;
    return obj;
  },
  fromAminoMsg(object: EventNewKeyRequestAminoMsg): EventNewKeyRequest {
    return EventNewKeyRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: EventNewKeyRequestProtoMsg): EventNewKeyRequest {
    return EventNewKeyRequest.decode(message.value);
  },
  toProto(message: EventNewKeyRequest): Uint8Array {
    return EventNewKeyRequest.encode(message).finish();
  },
  toProtoMsg(message: EventNewKeyRequest): EventNewKeyRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.EventNewKeyRequest",
      value: EventNewKeyRequest.encode(message).finish()
    };
  }
};
function createBaseEventNewKey(): EventNewKey {
  return {
    id: BigInt(0),
    keyType: 0,
    spaceId: BigInt(0),
    keychainId: BigInt(0),
    ruleId: BigInt(0)
  };
}
export const EventNewKey = {
  typeUrl: "/warden.warden.v1beta3.EventNewKey",
  encode(message: EventNewKey, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.keyType !== 0) {
      writer.uint32(16).int32(message.keyType);
    }
    if (message.spaceId !== BigInt(0)) {
      writer.uint32(24).uint64(message.spaceId);
    }
    if (message.keychainId !== BigInt(0)) {
      writer.uint32(32).uint64(message.keychainId);
    }
    if (message.ruleId !== BigInt(0)) {
      writer.uint32(40).uint64(message.ruleId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventNewKey {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventNewKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.keyType = (reader.int32() as any);
          break;
        case 3:
          message.spaceId = reader.uint64();
          break;
        case 4:
          message.keychainId = reader.uint64();
          break;
        case 5:
          message.ruleId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EventNewKey {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      keyType: isSet(object.keyType) ? keyTypeFromJSON(object.keyType) : -1,
      spaceId: isSet(object.spaceId) ? BigInt(object.spaceId.toString()) : BigInt(0),
      keychainId: isSet(object.keychainId) ? BigInt(object.keychainId.toString()) : BigInt(0),
      ruleId: isSet(object.ruleId) ? BigInt(object.ruleId.toString()) : BigInt(0)
    };
  },
  toJSON(message: EventNewKey): JsonSafe<EventNewKey> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.keyType !== undefined && (obj.keyType = keyTypeToJSON(message.keyType));
    message.spaceId !== undefined && (obj.spaceId = (message.spaceId || BigInt(0)).toString());
    message.keychainId !== undefined && (obj.keychainId = (message.keychainId || BigInt(0)).toString());
    message.ruleId !== undefined && (obj.ruleId = (message.ruleId || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<EventNewKey>): EventNewKey {
    const message = createBaseEventNewKey();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.keyType = object.keyType ?? 0;
    message.spaceId = object.spaceId !== undefined && object.spaceId !== null ? BigInt(object.spaceId.toString()) : BigInt(0);
    message.keychainId = object.keychainId !== undefined && object.keychainId !== null ? BigInt(object.keychainId.toString()) : BigInt(0);
    message.ruleId = object.ruleId !== undefined && object.ruleId !== null ? BigInt(object.ruleId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: EventNewKeyAmino): EventNewKey {
    const message = createBaseEventNewKey();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.key_type !== undefined && object.key_type !== null) {
      message.keyType = object.key_type;
    }
    if (object.space_id !== undefined && object.space_id !== null) {
      message.spaceId = BigInt(object.space_id);
    }
    if (object.keychain_id !== undefined && object.keychain_id !== null) {
      message.keychainId = BigInt(object.keychain_id);
    }
    if (object.rule_id !== undefined && object.rule_id !== null) {
      message.ruleId = BigInt(object.rule_id);
    }
    return message;
  },
  toAmino(message: EventNewKey): EventNewKeyAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.key_type = message.keyType === 0 ? undefined : message.keyType;
    obj.space_id = message.spaceId !== BigInt(0) ? message.spaceId.toString() : undefined;
    obj.keychain_id = message.keychainId !== BigInt(0) ? message.keychainId.toString() : undefined;
    obj.rule_id = message.ruleId !== BigInt(0) ? message.ruleId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: EventNewKeyAminoMsg): EventNewKey {
    return EventNewKey.fromAmino(object.value);
  },
  fromProtoMsg(message: EventNewKeyProtoMsg): EventNewKey {
    return EventNewKey.decode(message.value);
  },
  toProto(message: EventNewKey): Uint8Array {
    return EventNewKey.encode(message).finish();
  },
  toProtoMsg(message: EventNewKey): EventNewKeyProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.EventNewKey",
      value: EventNewKey.encode(message).finish()
    };
  }
};
function createBaseEventRejectKeyRequest(): EventRejectKeyRequest {
  return {
    id: BigInt(0)
  };
}
export const EventRejectKeyRequest = {
  typeUrl: "/warden.warden.v1beta3.EventRejectKeyRequest",
  encode(message: EventRejectKeyRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventRejectKeyRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventRejectKeyRequest();
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
  fromJSON(object: any): EventRejectKeyRequest {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0)
    };
  },
  toJSON(message: EventRejectKeyRequest): JsonSafe<EventRejectKeyRequest> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<EventRejectKeyRequest>): EventRejectKeyRequest {
    const message = createBaseEventRejectKeyRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: EventRejectKeyRequestAmino): EventRejectKeyRequest {
    const message = createBaseEventRejectKeyRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: EventRejectKeyRequest): EventRejectKeyRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: EventRejectKeyRequestAminoMsg): EventRejectKeyRequest {
    return EventRejectKeyRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: EventRejectKeyRequestProtoMsg): EventRejectKeyRequest {
    return EventRejectKeyRequest.decode(message.value);
  },
  toProto(message: EventRejectKeyRequest): Uint8Array {
    return EventRejectKeyRequest.encode(message).finish();
  },
  toProtoMsg(message: EventRejectKeyRequest): EventRejectKeyRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.EventRejectKeyRequest",
      value: EventRejectKeyRequest.encode(message).finish()
    };
  }
};
function createBaseEventUpdateKey(): EventUpdateKey {
  return {
    id: BigInt(0),
    ruleId: BigInt(0)
  };
}
export const EventUpdateKey = {
  typeUrl: "/warden.warden.v1beta3.EventUpdateKey",
  encode(message: EventUpdateKey, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.ruleId !== BigInt(0)) {
      writer.uint32(16).uint64(message.ruleId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventUpdateKey {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventUpdateKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.ruleId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EventUpdateKey {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      ruleId: isSet(object.ruleId) ? BigInt(object.ruleId.toString()) : BigInt(0)
    };
  },
  toJSON(message: EventUpdateKey): JsonSafe<EventUpdateKey> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.ruleId !== undefined && (obj.ruleId = (message.ruleId || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<EventUpdateKey>): EventUpdateKey {
    const message = createBaseEventUpdateKey();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.ruleId = object.ruleId !== undefined && object.ruleId !== null ? BigInt(object.ruleId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: EventUpdateKeyAmino): EventUpdateKey {
    const message = createBaseEventUpdateKey();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.rule_id !== undefined && object.rule_id !== null) {
      message.ruleId = BigInt(object.rule_id);
    }
    return message;
  },
  toAmino(message: EventUpdateKey): EventUpdateKeyAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.rule_id = message.ruleId !== BigInt(0) ? message.ruleId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: EventUpdateKeyAminoMsg): EventUpdateKey {
    return EventUpdateKey.fromAmino(object.value);
  },
  fromProtoMsg(message: EventUpdateKeyProtoMsg): EventUpdateKey {
    return EventUpdateKey.decode(message.value);
  },
  toProto(message: EventUpdateKey): Uint8Array {
    return EventUpdateKey.encode(message).finish();
  },
  toProtoMsg(message: EventUpdateKey): EventUpdateKeyProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.EventUpdateKey",
      value: EventUpdateKey.encode(message).finish()
    };
  }
};
function createBaseEventNewSignRequest(): EventNewSignRequest {
  return {
    id: BigInt(0),
    keyId: BigInt(0),
    creator: ""
  };
}
export const EventNewSignRequest = {
  typeUrl: "/warden.warden.v1beta3.EventNewSignRequest",
  encode(message: EventNewSignRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.keyId !== BigInt(0)) {
      writer.uint32(16).uint64(message.keyId);
    }
    if (message.creator !== "") {
      writer.uint32(26).string(message.creator);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventNewSignRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventNewSignRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.keyId = reader.uint64();
          break;
        case 3:
          message.creator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EventNewSignRequest {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      keyId: isSet(object.keyId) ? BigInt(object.keyId.toString()) : BigInt(0),
      creator: isSet(object.creator) ? String(object.creator) : ""
    };
  },
  toJSON(message: EventNewSignRequest): JsonSafe<EventNewSignRequest> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.keyId !== undefined && (obj.keyId = (message.keyId || BigInt(0)).toString());
    message.creator !== undefined && (obj.creator = message.creator);
    return obj;
  },
  fromPartial(object: Partial<EventNewSignRequest>): EventNewSignRequest {
    const message = createBaseEventNewSignRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.keyId = object.keyId !== undefined && object.keyId !== null ? BigInt(object.keyId.toString()) : BigInt(0);
    message.creator = object.creator ?? "";
    return message;
  },
  fromAmino(object: EventNewSignRequestAmino): EventNewSignRequest {
    const message = createBaseEventNewSignRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.key_id !== undefined && object.key_id !== null) {
      message.keyId = BigInt(object.key_id);
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    return message;
  },
  toAmino(message: EventNewSignRequest): EventNewSignRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.key_id = message.keyId !== BigInt(0) ? message.keyId.toString() : undefined;
    obj.creator = message.creator === "" ? undefined : message.creator;
    return obj;
  },
  fromAminoMsg(object: EventNewSignRequestAminoMsg): EventNewSignRequest {
    return EventNewSignRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: EventNewSignRequestProtoMsg): EventNewSignRequest {
    return EventNewSignRequest.decode(message.value);
  },
  toProto(message: EventNewSignRequest): Uint8Array {
    return EventNewSignRequest.encode(message).finish();
  },
  toProtoMsg(message: EventNewSignRequest): EventNewSignRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.EventNewSignRequest",
      value: EventNewSignRequest.encode(message).finish()
    };
  }
};
function createBaseEventFulfilSignRequest(): EventFulfilSignRequest {
  return {
    id: BigInt(0)
  };
}
export const EventFulfilSignRequest = {
  typeUrl: "/warden.warden.v1beta3.EventFulfilSignRequest",
  encode(message: EventFulfilSignRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventFulfilSignRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventFulfilSignRequest();
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
  fromJSON(object: any): EventFulfilSignRequest {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0)
    };
  },
  toJSON(message: EventFulfilSignRequest): JsonSafe<EventFulfilSignRequest> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<EventFulfilSignRequest>): EventFulfilSignRequest {
    const message = createBaseEventFulfilSignRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: EventFulfilSignRequestAmino): EventFulfilSignRequest {
    const message = createBaseEventFulfilSignRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: EventFulfilSignRequest): EventFulfilSignRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: EventFulfilSignRequestAminoMsg): EventFulfilSignRequest {
    return EventFulfilSignRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: EventFulfilSignRequestProtoMsg): EventFulfilSignRequest {
    return EventFulfilSignRequest.decode(message.value);
  },
  toProto(message: EventFulfilSignRequest): Uint8Array {
    return EventFulfilSignRequest.encode(message).finish();
  },
  toProtoMsg(message: EventFulfilSignRequest): EventFulfilSignRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.EventFulfilSignRequest",
      value: EventFulfilSignRequest.encode(message).finish()
    };
  }
};
function createBaseEventRejectSignRequest(): EventRejectSignRequest {
  return {
    id: BigInt(0)
  };
}
export const EventRejectSignRequest = {
  typeUrl: "/warden.warden.v1beta3.EventRejectSignRequest",
  encode(message: EventRejectSignRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventRejectSignRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventRejectSignRequest();
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
  fromJSON(object: any): EventRejectSignRequest {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0)
    };
  },
  toJSON(message: EventRejectSignRequest): JsonSafe<EventRejectSignRequest> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<EventRejectSignRequest>): EventRejectSignRequest {
    const message = createBaseEventRejectSignRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: EventRejectSignRequestAmino): EventRejectSignRequest {
    const message = createBaseEventRejectSignRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: EventRejectSignRequest): EventRejectSignRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: EventRejectSignRequestAminoMsg): EventRejectSignRequest {
    return EventRejectSignRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: EventRejectSignRequestProtoMsg): EventRejectSignRequest {
    return EventRejectSignRequest.decode(message.value);
  },
  toProto(message: EventRejectSignRequest): Uint8Array {
    return EventRejectSignRequest.encode(message).finish();
  },
  toProtoMsg(message: EventRejectSignRequest): EventRejectSignRequestProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.EventRejectSignRequest",
      value: EventRejectSignRequest.encode(message).finish()
    };
  }
};
function createBaseEventNewKeychain(): EventNewKeychain {
  return {
    id: BigInt(0),
    creator: "",
    keychainFees: undefined
  };
}
export const EventNewKeychain = {
  typeUrl: "/warden.warden.v1beta3.EventNewKeychain",
  encode(message: EventNewKeychain, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.keychainFees !== undefined) {
      KeychainFees.encode(message.keychainFees, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventNewKeychain {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventNewKeychain();
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
          message.keychainFees = KeychainFees.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EventNewKeychain {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      creator: isSet(object.creator) ? String(object.creator) : "",
      keychainFees: isSet(object.keychainFees) ? KeychainFees.fromJSON(object.keychainFees) : undefined
    };
  },
  toJSON(message: EventNewKeychain): JsonSafe<EventNewKeychain> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.creator !== undefined && (obj.creator = message.creator);
    message.keychainFees !== undefined && (obj.keychainFees = message.keychainFees ? KeychainFees.toJSON(message.keychainFees) : undefined);
    return obj;
  },
  fromPartial(object: Partial<EventNewKeychain>): EventNewKeychain {
    const message = createBaseEventNewKeychain();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.creator = object.creator ?? "";
    message.keychainFees = object.keychainFees !== undefined && object.keychainFees !== null ? KeychainFees.fromPartial(object.keychainFees) : undefined;
    return message;
  },
  fromAmino(object: EventNewKeychainAmino): EventNewKeychain {
    const message = createBaseEventNewKeychain();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.keychain_fees !== undefined && object.keychain_fees !== null) {
      message.keychainFees = KeychainFees.fromAmino(object.keychain_fees);
    }
    return message;
  },
  toAmino(message: EventNewKeychain): EventNewKeychainAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.keychain_fees = message.keychainFees ? KeychainFees.toAmino(message.keychainFees) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventNewKeychainAminoMsg): EventNewKeychain {
    return EventNewKeychain.fromAmino(object.value);
  },
  fromProtoMsg(message: EventNewKeychainProtoMsg): EventNewKeychain {
    return EventNewKeychain.decode(message.value);
  },
  toProto(message: EventNewKeychain): Uint8Array {
    return EventNewKeychain.encode(message).finish();
  },
  toProtoMsg(message: EventNewKeychain): EventNewKeychainProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.EventNewKeychain",
      value: EventNewKeychain.encode(message).finish()
    };
  }
};
function createBaseEventUpdateKeychain(): EventUpdateKeychain {
  return {
    id: BigInt(0),
    keychainFees: undefined
  };
}
export const EventUpdateKeychain = {
  typeUrl: "/warden.warden.v1beta3.EventUpdateKeychain",
  encode(message: EventUpdateKeychain, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.keychainFees !== undefined) {
      KeychainFees.encode(message.keychainFees, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventUpdateKeychain {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventUpdateKeychain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.keychainFees = KeychainFees.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EventUpdateKeychain {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      keychainFees: isSet(object.keychainFees) ? KeychainFees.fromJSON(object.keychainFees) : undefined
    };
  },
  toJSON(message: EventUpdateKeychain): JsonSafe<EventUpdateKeychain> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.keychainFees !== undefined && (obj.keychainFees = message.keychainFees ? KeychainFees.toJSON(message.keychainFees) : undefined);
    return obj;
  },
  fromPartial(object: Partial<EventUpdateKeychain>): EventUpdateKeychain {
    const message = createBaseEventUpdateKeychain();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.keychainFees = object.keychainFees !== undefined && object.keychainFees !== null ? KeychainFees.fromPartial(object.keychainFees) : undefined;
    return message;
  },
  fromAmino(object: EventUpdateKeychainAmino): EventUpdateKeychain {
    const message = createBaseEventUpdateKeychain();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.keychain_fees !== undefined && object.keychain_fees !== null) {
      message.keychainFees = KeychainFees.fromAmino(object.keychain_fees);
    }
    return message;
  },
  toAmino(message: EventUpdateKeychain): EventUpdateKeychainAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.keychain_fees = message.keychainFees ? KeychainFees.toAmino(message.keychainFees) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventUpdateKeychainAminoMsg): EventUpdateKeychain {
    return EventUpdateKeychain.fromAmino(object.value);
  },
  fromProtoMsg(message: EventUpdateKeychainProtoMsg): EventUpdateKeychain {
    return EventUpdateKeychain.decode(message.value);
  },
  toProto(message: EventUpdateKeychain): Uint8Array {
    return EventUpdateKeychain.encode(message).finish();
  },
  toProtoMsg(message: EventUpdateKeychain): EventUpdateKeychainProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.EventUpdateKeychain",
      value: EventUpdateKeychain.encode(message).finish()
    };
  }
};
function createBaseEventAddKeychainWriter(): EventAddKeychainWriter {
  return {
    id: BigInt(0),
    newWriter: "",
    writersCount: BigInt(0)
  };
}
export const EventAddKeychainWriter = {
  typeUrl: "/warden.warden.v1beta3.EventAddKeychainWriter",
  encode(message: EventAddKeychainWriter, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.newWriter !== "") {
      writer.uint32(18).string(message.newWriter);
    }
    if (message.writersCount !== BigInt(0)) {
      writer.uint32(24).uint64(message.writersCount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventAddKeychainWriter {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventAddKeychainWriter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.newWriter = reader.string();
          break;
        case 3:
          message.writersCount = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EventAddKeychainWriter {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      newWriter: isSet(object.newWriter) ? String(object.newWriter) : "",
      writersCount: isSet(object.writersCount) ? BigInt(object.writersCount.toString()) : BigInt(0)
    };
  },
  toJSON(message: EventAddKeychainWriter): JsonSafe<EventAddKeychainWriter> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.newWriter !== undefined && (obj.newWriter = message.newWriter);
    message.writersCount !== undefined && (obj.writersCount = (message.writersCount || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<EventAddKeychainWriter>): EventAddKeychainWriter {
    const message = createBaseEventAddKeychainWriter();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.newWriter = object.newWriter ?? "";
    message.writersCount = object.writersCount !== undefined && object.writersCount !== null ? BigInt(object.writersCount.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: EventAddKeychainWriterAmino): EventAddKeychainWriter {
    const message = createBaseEventAddKeychainWriter();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.new_writer !== undefined && object.new_writer !== null) {
      message.newWriter = object.new_writer;
    }
    if (object.writers_count !== undefined && object.writers_count !== null) {
      message.writersCount = BigInt(object.writers_count);
    }
    return message;
  },
  toAmino(message: EventAddKeychainWriter): EventAddKeychainWriterAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.new_writer = message.newWriter === "" ? undefined : message.newWriter;
    obj.writers_count = message.writersCount !== BigInt(0) ? message.writersCount.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: EventAddKeychainWriterAminoMsg): EventAddKeychainWriter {
    return EventAddKeychainWriter.fromAmino(object.value);
  },
  fromProtoMsg(message: EventAddKeychainWriterProtoMsg): EventAddKeychainWriter {
    return EventAddKeychainWriter.decode(message.value);
  },
  toProto(message: EventAddKeychainWriter): Uint8Array {
    return EventAddKeychainWriter.encode(message).finish();
  },
  toProtoMsg(message: EventAddKeychainWriter): EventAddKeychainWriterProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.EventAddKeychainWriter",
      value: EventAddKeychainWriter.encode(message).finish()
    };
  }
};