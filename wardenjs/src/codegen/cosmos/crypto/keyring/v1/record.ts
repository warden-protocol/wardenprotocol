//@ts-nocheck
import { Any, AnyAmino, AnySDKType } from "../../../../google/protobuf/any";
import { BIP44Params, BIP44ParamsAmino, BIP44ParamsSDKType } from "../../hd/v1/hd";
import * as _m0 from "protobufjs/minimal";
import { isSet } from "../../../../helpers";
/** Record is used for representing a key in the keyring. */
export interface Record {
  /** name represents a name of Record */
  name: string;
  /** pub_key represents a public key in any format */
  pubKey?: Any;
  /** local stores the public information about a locally stored key */
  local?: Record_Local;
  /** ledger stores the public information about a Ledger key */
  ledger?: Record_Ledger;
  /** Multi does not store any information. */
  multi?: Record_Multi;
  /** Offline does not store any information. */
  offline?: Record_Offline;
}
export interface RecordProtoMsg {
  typeUrl: "/cosmos.crypto.keyring.v1.Record";
  value: Uint8Array;
}
/** Record is used for representing a key in the keyring. */
export interface RecordAmino {
  /** name represents a name of Record */
  name?: string;
  /** pub_key represents a public key in any format */
  pub_key?: AnyAmino;
  /** local stores the public information about a locally stored key */
  local?: Record_LocalAmino;
  /** ledger stores the public information about a Ledger key */
  ledger?: Record_LedgerAmino;
  /** Multi does not store any information. */
  multi?: Record_MultiAmino;
  /** Offline does not store any information. */
  offline?: Record_OfflineAmino;
}
export interface RecordAminoMsg {
  type: "cosmos-sdk/Record";
  value: RecordAmino;
}
/** Record is used for representing a key in the keyring. */
export interface RecordSDKType {
  name: string;
  pub_key?: AnySDKType;
  local?: Record_LocalSDKType;
  ledger?: Record_LedgerSDKType;
  multi?: Record_MultiSDKType;
  offline?: Record_OfflineSDKType;
}
/**
 * Item is a keyring item stored in a keyring backend.
 * Local item
 */
export interface Record_Local {
  privKey?: Any;
  privKeyType: string;
}
export interface Record_LocalProtoMsg {
  typeUrl: "/cosmos.crypto.keyring.v1.Local";
  value: Uint8Array;
}
/**
 * Item is a keyring item stored in a keyring backend.
 * Local item
 */
export interface Record_LocalAmino {
  priv_key?: AnyAmino;
  priv_key_type?: string;
}
export interface Record_LocalAminoMsg {
  type: "cosmos-sdk/Local";
  value: Record_LocalAmino;
}
/**
 * Item is a keyring item stored in a keyring backend.
 * Local item
 */
export interface Record_LocalSDKType {
  priv_key?: AnySDKType;
  priv_key_type: string;
}
/** Ledger item */
export interface Record_Ledger {
  path?: BIP44Params;
}
export interface Record_LedgerProtoMsg {
  typeUrl: "/cosmos.crypto.keyring.v1.Ledger";
  value: Uint8Array;
}
/** Ledger item */
export interface Record_LedgerAmino {
  path?: BIP44ParamsAmino;
}
export interface Record_LedgerAminoMsg {
  type: "cosmos-sdk/Ledger";
  value: Record_LedgerAmino;
}
/** Ledger item */
export interface Record_LedgerSDKType {
  path?: BIP44ParamsSDKType;
}
/** Multi item */
export interface Record_Multi {}
export interface Record_MultiProtoMsg {
  typeUrl: "/cosmos.crypto.keyring.v1.Multi";
  value: Uint8Array;
}
/** Multi item */
export interface Record_MultiAmino {}
export interface Record_MultiAminoMsg {
  type: "cosmos-sdk/Multi";
  value: Record_MultiAmino;
}
/** Multi item */
export interface Record_MultiSDKType {}
/** Offline item */
export interface Record_Offline {}
export interface Record_OfflineProtoMsg {
  typeUrl: "/cosmos.crypto.keyring.v1.Offline";
  value: Uint8Array;
}
/** Offline item */
export interface Record_OfflineAmino {}
export interface Record_OfflineAminoMsg {
  type: "cosmos-sdk/Offline";
  value: Record_OfflineAmino;
}
/** Offline item */
export interface Record_OfflineSDKType {}
function createBaseRecord(): Record {
  return {
    name: "",
    pubKey: undefined,
    local: undefined,
    ledger: undefined,
    multi: undefined,
    offline: undefined
  };
}
export const Record = {
  typeUrl: "/cosmos.crypto.keyring.v1.Record",
  encode(message: Record, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.pubKey !== undefined) {
      Any.encode(message.pubKey, writer.uint32(18).fork()).ldelim();
    }
    if (message.local !== undefined) {
      Record_Local.encode(message.local, writer.uint32(26).fork()).ldelim();
    }
    if (message.ledger !== undefined) {
      Record_Ledger.encode(message.ledger, writer.uint32(34).fork()).ldelim();
    }
    if (message.multi !== undefined) {
      Record_Multi.encode(message.multi, writer.uint32(42).fork()).ldelim();
    }
    if (message.offline !== undefined) {
      Record_Offline.encode(message.offline, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): Record {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.pubKey = Any.decode(reader, reader.uint32());
          break;
        case 3:
          message.local = Record_Local.decode(reader, reader.uint32());
          break;
        case 4:
          message.ledger = Record_Ledger.decode(reader, reader.uint32());
          break;
        case 5:
          message.multi = Record_Multi.decode(reader, reader.uint32());
          break;
        case 6:
          message.offline = Record_Offline.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Record {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      pubKey: isSet(object.pubKey) ? Any.fromJSON(object.pubKey) : undefined,
      local: isSet(object.local) ? Record_Local.fromJSON(object.local) : undefined,
      ledger: isSet(object.ledger) ? Record_Ledger.fromJSON(object.ledger) : undefined,
      multi: isSet(object.multi) ? Record_Multi.fromJSON(object.multi) : undefined,
      offline: isSet(object.offline) ? Record_Offline.fromJSON(object.offline) : undefined
    };
  },
  toJSON(message: Record): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.pubKey !== undefined && (obj.pubKey = message.pubKey ? Any.toJSON(message.pubKey) : undefined);
    message.local !== undefined && (obj.local = message.local ? Record_Local.toJSON(message.local) : undefined);
    message.ledger !== undefined && (obj.ledger = message.ledger ? Record_Ledger.toJSON(message.ledger) : undefined);
    message.multi !== undefined && (obj.multi = message.multi ? Record_Multi.toJSON(message.multi) : undefined);
    message.offline !== undefined && (obj.offline = message.offline ? Record_Offline.toJSON(message.offline) : undefined);
    return obj;
  },
  fromPartial(object: Partial<Record>): Record {
    const message = createBaseRecord();
    message.name = object.name ?? "";
    message.pubKey = object.pubKey !== undefined && object.pubKey !== null ? Any.fromPartial(object.pubKey) : undefined;
    message.local = object.local !== undefined && object.local !== null ? Record_Local.fromPartial(object.local) : undefined;
    message.ledger = object.ledger !== undefined && object.ledger !== null ? Record_Ledger.fromPartial(object.ledger) : undefined;
    message.multi = object.multi !== undefined && object.multi !== null ? Record_Multi.fromPartial(object.multi) : undefined;
    message.offline = object.offline !== undefined && object.offline !== null ? Record_Offline.fromPartial(object.offline) : undefined;
    return message;
  },
  fromAmino(object: RecordAmino): Record {
    const message = createBaseRecord();
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    if (object.pub_key !== undefined && object.pub_key !== null) {
      message.pubKey = Any.fromAmino(object.pub_key);
    }
    if (object.local !== undefined && object.local !== null) {
      message.local = Record_Local.fromAmino(object.local);
    }
    if (object.ledger !== undefined && object.ledger !== null) {
      message.ledger = Record_Ledger.fromAmino(object.ledger);
    }
    if (object.multi !== undefined && object.multi !== null) {
      message.multi = Record_Multi.fromAmino(object.multi);
    }
    if (object.offline !== undefined && object.offline !== null) {
      message.offline = Record_Offline.fromAmino(object.offline);
    }
    return message;
  },
  toAmino(message: Record): RecordAmino {
    const obj: any = {};
    obj.name = message.name === "" ? undefined : message.name;
    obj.pub_key = message.pubKey ? Any.toAmino(message.pubKey) : undefined;
    obj.local = message.local ? Record_Local.toAmino(message.local) : undefined;
    obj.ledger = message.ledger ? Record_Ledger.toAmino(message.ledger) : undefined;
    obj.multi = message.multi ? Record_Multi.toAmino(message.multi) : undefined;
    obj.offline = message.offline ? Record_Offline.toAmino(message.offline) : undefined;
    return obj;
  },
  fromAminoMsg(object: RecordAminoMsg): Record {
    return Record.fromAmino(object.value);
  },
  toAminoMsg(message: Record): RecordAminoMsg {
    return {
      type: "cosmos-sdk/Record",
      value: Record.toAmino(message)
    };
  },
  fromProtoMsg(message: RecordProtoMsg): Record {
    return Record.decode(message.value);
  },
  toProto(message: Record): Uint8Array {
    return Record.encode(message).finish();
  },
  toProtoMsg(message: Record): RecordProtoMsg {
    return {
      typeUrl: "/cosmos.crypto.keyring.v1.Record",
      value: Record.encode(message).finish()
    };
  }
};
function createBaseRecord_Local(): Record_Local {
  return {
    privKey: undefined,
    privKeyType: ""
  };
}
export const Record_Local = {
  typeUrl: "/cosmos.crypto.keyring.v1.Local",
  encode(message: Record_Local, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.privKey !== undefined) {
      Any.encode(message.privKey, writer.uint32(10).fork()).ldelim();
    }
    if (message.privKeyType !== "") {
      writer.uint32(18).string(message.privKeyType);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): Record_Local {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecord_Local();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.privKey = Any.decode(reader, reader.uint32());
          break;
        case 2:
          message.privKeyType = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Record_Local {
    return {
      privKey: isSet(object.privKey) ? Any.fromJSON(object.privKey) : undefined,
      privKeyType: isSet(object.privKeyType) ? String(object.privKeyType) : ""
    };
  },
  toJSON(message: Record_Local): unknown {
    const obj: any = {};
    message.privKey !== undefined && (obj.privKey = message.privKey ? Any.toJSON(message.privKey) : undefined);
    message.privKeyType !== undefined && (obj.privKeyType = message.privKeyType);
    return obj;
  },
  fromPartial(object: Partial<Record_Local>): Record_Local {
    const message = createBaseRecord_Local();
    message.privKey = object.privKey !== undefined && object.privKey !== null ? Any.fromPartial(object.privKey) : undefined;
    message.privKeyType = object.privKeyType ?? "";
    return message;
  },
  fromAmino(object: Record_LocalAmino): Record_Local {
    const message = createBaseRecord_Local();
    if (object.priv_key !== undefined && object.priv_key !== null) {
      message.privKey = Any.fromAmino(object.priv_key);
    }
    if (object.priv_key_type !== undefined && object.priv_key_type !== null) {
      message.privKeyType = object.priv_key_type;
    }
    return message;
  },
  toAmino(message: Record_Local): Record_LocalAmino {
    const obj: any = {};
    obj.priv_key = message.privKey ? Any.toAmino(message.privKey) : undefined;
    obj.priv_key_type = message.privKeyType === "" ? undefined : message.privKeyType;
    return obj;
  },
  fromAminoMsg(object: Record_LocalAminoMsg): Record_Local {
    return Record_Local.fromAmino(object.value);
  },
  toAminoMsg(message: Record_Local): Record_LocalAminoMsg {
    return {
      type: "cosmos-sdk/Local",
      value: Record_Local.toAmino(message)
    };
  },
  fromProtoMsg(message: Record_LocalProtoMsg): Record_Local {
    return Record_Local.decode(message.value);
  },
  toProto(message: Record_Local): Uint8Array {
    return Record_Local.encode(message).finish();
  },
  toProtoMsg(message: Record_Local): Record_LocalProtoMsg {
    return {
      typeUrl: "/cosmos.crypto.keyring.v1.Local",
      value: Record_Local.encode(message).finish()
    };
  }
};
function createBaseRecord_Ledger(): Record_Ledger {
  return {
    path: undefined
  };
}
export const Record_Ledger = {
  typeUrl: "/cosmos.crypto.keyring.v1.Ledger",
  encode(message: Record_Ledger, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.path !== undefined) {
      BIP44Params.encode(message.path, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): Record_Ledger {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecord_Ledger();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.path = BIP44Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Record_Ledger {
    return {
      path: isSet(object.path) ? BIP44Params.fromJSON(object.path) : undefined
    };
  },
  toJSON(message: Record_Ledger): unknown {
    const obj: any = {};
    message.path !== undefined && (obj.path = message.path ? BIP44Params.toJSON(message.path) : undefined);
    return obj;
  },
  fromPartial(object: Partial<Record_Ledger>): Record_Ledger {
    const message = createBaseRecord_Ledger();
    message.path = object.path !== undefined && object.path !== null ? BIP44Params.fromPartial(object.path) : undefined;
    return message;
  },
  fromAmino(object: Record_LedgerAmino): Record_Ledger {
    const message = createBaseRecord_Ledger();
    if (object.path !== undefined && object.path !== null) {
      message.path = BIP44Params.fromAmino(object.path);
    }
    return message;
  },
  toAmino(message: Record_Ledger): Record_LedgerAmino {
    const obj: any = {};
    obj.path = message.path ? BIP44Params.toAmino(message.path) : undefined;
    return obj;
  },
  fromAminoMsg(object: Record_LedgerAminoMsg): Record_Ledger {
    return Record_Ledger.fromAmino(object.value);
  },
  toAminoMsg(message: Record_Ledger): Record_LedgerAminoMsg {
    return {
      type: "cosmos-sdk/Ledger",
      value: Record_Ledger.toAmino(message)
    };
  },
  fromProtoMsg(message: Record_LedgerProtoMsg): Record_Ledger {
    return Record_Ledger.decode(message.value);
  },
  toProto(message: Record_Ledger): Uint8Array {
    return Record_Ledger.encode(message).finish();
  },
  toProtoMsg(message: Record_Ledger): Record_LedgerProtoMsg {
    return {
      typeUrl: "/cosmos.crypto.keyring.v1.Ledger",
      value: Record_Ledger.encode(message).finish()
    };
  }
};
function createBaseRecord_Multi(): Record_Multi {
  return {};
}
export const Record_Multi = {
  typeUrl: "/cosmos.crypto.keyring.v1.Multi",
  encode(_: Record_Multi, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): Record_Multi {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecord_Multi();
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
  fromJSON(_: any): Record_Multi {
    return {};
  },
  toJSON(_: Record_Multi): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<Record_Multi>): Record_Multi {
    const message = createBaseRecord_Multi();
    return message;
  },
  fromAmino(_: Record_MultiAmino): Record_Multi {
    const message = createBaseRecord_Multi();
    return message;
  },
  toAmino(_: Record_Multi): Record_MultiAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: Record_MultiAminoMsg): Record_Multi {
    return Record_Multi.fromAmino(object.value);
  },
  toAminoMsg(message: Record_Multi): Record_MultiAminoMsg {
    return {
      type: "cosmos-sdk/Multi",
      value: Record_Multi.toAmino(message)
    };
  },
  fromProtoMsg(message: Record_MultiProtoMsg): Record_Multi {
    return Record_Multi.decode(message.value);
  },
  toProto(message: Record_Multi): Uint8Array {
    return Record_Multi.encode(message).finish();
  },
  toProtoMsg(message: Record_Multi): Record_MultiProtoMsg {
    return {
      typeUrl: "/cosmos.crypto.keyring.v1.Multi",
      value: Record_Multi.encode(message).finish()
    };
  }
};
function createBaseRecord_Offline(): Record_Offline {
  return {};
}
export const Record_Offline = {
  typeUrl: "/cosmos.crypto.keyring.v1.Offline",
  encode(_: Record_Offline, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): Record_Offline {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecord_Offline();
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
  fromJSON(_: any): Record_Offline {
    return {};
  },
  toJSON(_: Record_Offline): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<Record_Offline>): Record_Offline {
    const message = createBaseRecord_Offline();
    return message;
  },
  fromAmino(_: Record_OfflineAmino): Record_Offline {
    const message = createBaseRecord_Offline();
    return message;
  },
  toAmino(_: Record_Offline): Record_OfflineAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: Record_OfflineAminoMsg): Record_Offline {
    return Record_Offline.fromAmino(object.value);
  },
  toAminoMsg(message: Record_Offline): Record_OfflineAminoMsg {
    return {
      type: "cosmos-sdk/Offline",
      value: Record_Offline.toAmino(message)
    };
  },
  fromProtoMsg(message: Record_OfflineProtoMsg): Record_Offline {
    return Record_Offline.decode(message.value);
  },
  toProto(message: Record_Offline): Uint8Array {
    return Record_Offline.encode(message).finish();
  },
  toProtoMsg(message: Record_Offline): Record_OfflineProtoMsg {
    return {
      typeUrl: "/cosmos.crypto.keyring.v1.Offline",
      value: Record_Offline.encode(message).finish()
    };
  }
};