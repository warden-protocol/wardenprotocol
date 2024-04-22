//@ts-nocheck
import { Long, isSet } from "../../../helpers";
import * as _m0 from "protobufjs/minimal";
export interface Keychain {
  id: Long;
  creator: string;
  description: string;
  admins: string[];
  parties: string[];
  adminIntentId: Long;
  fees?: KeychainFees;
  isActive: boolean;
}
export interface KeychainProtoMsg {
  typeUrl: "/warden.warden.v1beta2.Keychain";
  value: Uint8Array;
}
export interface KeychainAmino {
  id?: string;
  creator?: string;
  description?: string;
  admins?: string[];
  parties?: string[];
  admin_intent_id?: string;
  fees?: KeychainFeesAmino;
  is_active?: boolean;
}
export interface KeychainAminoMsg {
  type: "/warden.warden.v1beta2.Keychain";
  value: KeychainAmino;
}
export interface KeychainSDKType {
  id: Long;
  creator: string;
  description: string;
  admins: string[];
  parties: string[];
  admin_intent_id: Long;
  fees?: KeychainFeesSDKType;
  is_active: boolean;
}
export interface KeychainFees {
  keyReq: Long;
  sigReq: Long;
}
export interface KeychainFeesProtoMsg {
  typeUrl: "/warden.warden.v1beta2.KeychainFees";
  value: Uint8Array;
}
export interface KeychainFeesAmino {
  key_req?: string;
  sig_req?: string;
}
export interface KeychainFeesAminoMsg {
  type: "/warden.warden.v1beta2.KeychainFees";
  value: KeychainFeesAmino;
}
export interface KeychainFeesSDKType {
  key_req: Long;
  sig_req: Long;
}
function createBaseKeychain(): Keychain {
  return {
    id: Long.UZERO,
    creator: "",
    description: "",
    admins: [],
    parties: [],
    adminIntentId: Long.UZERO,
    fees: undefined,
    isActive: false
  };
}
export const Keychain = {
  typeUrl: "/warden.warden.v1beta2.Keychain",
  encode(message: Keychain, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    for (const v of message.admins) {
      writer.uint32(34).string(v!);
    }
    for (const v of message.parties) {
      writer.uint32(42).string(v!);
    }
    if (!message.adminIntentId.isZero()) {
      writer.uint32(48).uint64(message.adminIntentId);
    }
    if (message.fees !== undefined) {
      KeychainFees.encode(message.fees, writer.uint32(58).fork()).ldelim();
    }
    if (message.isActive === true) {
      writer.uint32(64).bool(message.isActive);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): Keychain {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeychain();
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
          message.description = reader.string();
          break;
        case 4:
          message.admins.push(reader.string());
          break;
        case 5:
          message.parties.push(reader.string());
          break;
        case 6:
          message.adminIntentId = (reader.uint64() as Long);
          break;
        case 7:
          message.fees = KeychainFees.decode(reader, reader.uint32());
          break;
        case 8:
          message.isActive = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Keychain {
    return {
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
      creator: isSet(object.creator) ? String(object.creator) : "",
      description: isSet(object.description) ? String(object.description) : "",
      admins: Array.isArray(object?.admins) ? object.admins.map((e: any) => String(e)) : [],
      parties: Array.isArray(object?.parties) ? object.parties.map((e: any) => String(e)) : [],
      adminIntentId: isSet(object.adminIntentId) ? Long.fromValue(object.adminIntentId) : Long.UZERO,
      fees: isSet(object.fees) ? KeychainFees.fromJSON(object.fees) : undefined,
      isActive: isSet(object.isActive) ? Boolean(object.isActive) : false
    };
  },
  toJSON(message: Keychain): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString());
    message.creator !== undefined && (obj.creator = message.creator);
    message.description !== undefined && (obj.description = message.description);
    if (message.admins) {
      obj.admins = message.admins.map(e => e);
    } else {
      obj.admins = [];
    }
    if (message.parties) {
      obj.parties = message.parties.map(e => e);
    } else {
      obj.parties = [];
    }
    message.adminIntentId !== undefined && (obj.adminIntentId = (message.adminIntentId || Long.UZERO).toString());
    message.fees !== undefined && (obj.fees = message.fees ? KeychainFees.toJSON(message.fees) : undefined);
    message.isActive !== undefined && (obj.isActive = message.isActive);
    return obj;
  },
  fromPartial(object: Partial<Keychain>): Keychain {
    const message = createBaseKeychain();
    message.id = object.id !== undefined && object.id !== null ? Long.fromValue(object.id) : Long.UZERO;
    message.creator = object.creator ?? "";
    message.description = object.description ?? "";
    message.admins = object.admins?.map(e => e) || [];
    message.parties = object.parties?.map(e => e) || [];
    message.adminIntentId = object.adminIntentId !== undefined && object.adminIntentId !== null ? Long.fromValue(object.adminIntentId) : Long.UZERO;
    message.fees = object.fees !== undefined && object.fees !== null ? KeychainFees.fromPartial(object.fees) : undefined;
    message.isActive = object.isActive ?? false;
    return message;
  },
  fromAmino(object: KeychainAmino): Keychain {
    const message = createBaseKeychain();
    if (object.id !== undefined && object.id !== null) {
      message.id = Long.fromString(object.id);
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    message.admins = object.admins?.map(e => e) || [];
    message.parties = object.parties?.map(e => e) || [];
    if (object.admin_intent_id !== undefined && object.admin_intent_id !== null) {
      message.adminIntentId = Long.fromString(object.admin_intent_id);
    }
    if (object.fees !== undefined && object.fees !== null) {
      message.fees = KeychainFees.fromAmino(object.fees);
    }
    if (object.is_active !== undefined && object.is_active !== null) {
      message.isActive = object.is_active;
    }
    return message;
  },
  toAmino(message: Keychain): KeychainAmino {
    const obj: any = {};
    obj.id = !message.id.isZero() ? message.id.toString() : undefined;
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.description = message.description === "" ? undefined : message.description;
    if (message.admins) {
      obj.admins = message.admins.map(e => e);
    } else {
      obj.admins = message.admins;
    }
    if (message.parties) {
      obj.parties = message.parties.map(e => e);
    } else {
      obj.parties = message.parties;
    }
    obj.admin_intent_id = !message.adminIntentId.isZero() ? message.adminIntentId.toString() : undefined;
    obj.fees = message.fees ? KeychainFees.toAmino(message.fees) : undefined;
    obj.is_active = message.isActive === false ? undefined : message.isActive;
    return obj;
  },
  fromAminoMsg(object: KeychainAminoMsg): Keychain {
    return Keychain.fromAmino(object.value);
  },
  fromProtoMsg(message: KeychainProtoMsg): Keychain {
    return Keychain.decode(message.value);
  },
  toProto(message: Keychain): Uint8Array {
    return Keychain.encode(message).finish();
  },
  toProtoMsg(message: Keychain): KeychainProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta2.Keychain",
      value: Keychain.encode(message).finish()
    };
  }
};
function createBaseKeychainFees(): KeychainFees {
  return {
    keyReq: Long.ZERO,
    sigReq: Long.ZERO
  };
}
export const KeychainFees = {
  typeUrl: "/warden.warden.v1beta2.KeychainFees",
  encode(message: KeychainFees, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.keyReq.isZero()) {
      writer.uint32(8).int64(message.keyReq);
    }
    if (!message.sigReq.isZero()) {
      writer.uint32(16).int64(message.sigReq);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): KeychainFees {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeychainFees();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.keyReq = (reader.int64() as Long);
          break;
        case 2:
          message.sigReq = (reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): KeychainFees {
    return {
      keyReq: isSet(object.keyReq) ? Long.fromValue(object.keyReq) : Long.ZERO,
      sigReq: isSet(object.sigReq) ? Long.fromValue(object.sigReq) : Long.ZERO
    };
  },
  toJSON(message: KeychainFees): unknown {
    const obj: any = {};
    message.keyReq !== undefined && (obj.keyReq = (message.keyReq || Long.ZERO).toString());
    message.sigReq !== undefined && (obj.sigReq = (message.sigReq || Long.ZERO).toString());
    return obj;
  },
  fromPartial(object: Partial<KeychainFees>): KeychainFees {
    const message = createBaseKeychainFees();
    message.keyReq = object.keyReq !== undefined && object.keyReq !== null ? Long.fromValue(object.keyReq) : Long.ZERO;
    message.sigReq = object.sigReq !== undefined && object.sigReq !== null ? Long.fromValue(object.sigReq) : Long.ZERO;
    return message;
  },
  fromAmino(object: KeychainFeesAmino): KeychainFees {
    const message = createBaseKeychainFees();
    if (object.key_req !== undefined && object.key_req !== null) {
      message.keyReq = Long.fromString(object.key_req);
    }
    if (object.sig_req !== undefined && object.sig_req !== null) {
      message.sigReq = Long.fromString(object.sig_req);
    }
    return message;
  },
  toAmino(message: KeychainFees): KeychainFeesAmino {
    const obj: any = {};
    obj.key_req = !message.keyReq.isZero() ? message.keyReq.toString() : undefined;
    obj.sig_req = !message.sigReq.isZero() ? message.sigReq.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: KeychainFeesAminoMsg): KeychainFees {
    return KeychainFees.fromAmino(object.value);
  },
  fromProtoMsg(message: KeychainFeesProtoMsg): KeychainFees {
    return KeychainFees.decode(message.value);
  },
  toProto(message: KeychainFees): Uint8Array {
    return KeychainFees.encode(message).finish();
  },
  toProtoMsg(message: KeychainFees): KeychainFeesProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta2.KeychainFees",
      value: KeychainFees.encode(message).finish()
    };
  }
};