//@ts-nocheck
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin.js";
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet } from "../../../helpers.js";
import { JsonSafe } from "../../../json-safe.js";
/**
 * Keychain is an operator that can create and manage Keys.
 * 
 * Users can request a Keychain to create a new Key using a particular scheme.
 * The Keychain will store the private key, while the public key will be stored
 * inside the Key object on-chain.
 * 
 * Users can request a Keychain to sign data using a particular Key.
 * 
 * The Keychain has an allowlist of addresses that can be used to write data
 * on-chain (public keys and signatures). This can also be used to rotate the
 * identity of the Keychain.
 */
export interface Keychain {
  /** ID of the Keychain. */
  id: bigint;
  /** Address of the creator of the Keychain. */
  creator: string;
  /** A human-readable name of the Keychain. */
  name: string;
  /** Addresses that can update this Keychain. */
  admins: string[];
  /** Addresses that can write data on-chain on behalf of this Keychain. */
  writers: string[];
  /** Fees for creating and signing Keys. */
  fees: KeychainFees;
  /** A human-readable description of the Keychain. */
  description?: string;
  /** A link that points to the website of the keychain provider */
  url?: string;
  /** `KeybaseId` to retrieve an avatar by using the `Keybase` api. The exact length is 16 characters. */
  keybaseId?: KeybaseId;
}
export interface KeychainProtoMsg {
  typeUrl: "/warden.warden.v1beta3.Keychain";
  value: Uint8Array;
}
/**
 * Keychain is an operator that can create and manage Keys.
 * 
 * Users can request a Keychain to create a new Key using a particular scheme.
 * The Keychain will store the private key, while the public key will be stored
 * inside the Key object on-chain.
 * 
 * Users can request a Keychain to sign data using a particular Key.
 * 
 * The Keychain has an allowlist of addresses that can be used to write data
 * on-chain (public keys and signatures). This can also be used to rotate the
 * identity of the Keychain.
 */
export interface KeychainAmino {
  /** ID of the Keychain. */
  id?: string;
  /** Address of the creator of the Keychain. */
  creator?: string;
  /** A human-readable name of the Keychain. */
  name?: string;
  /** Addresses that can update this Keychain. */
  admins?: string[];
  /** Addresses that can write data on-chain on behalf of this Keychain. */
  writers?: string[];
  /** Fees for creating and signing Keys. */
  fees?: KeychainFeesAmino;
  /** A human-readable description of the Keychain. */
  description?: string;
  /** A link that points to the website of the keychain provider */
  url?: string;
  /** `KeybaseId` to retrieve an avatar by using the `Keybase` api. The exact length is 16 characters. */
  keybase_id?: KeybaseIdAmino;
}
export interface KeychainAminoMsg {
  type: "/warden.warden.v1beta3.Keychain";
  value: KeychainAmino;
}
/**
 * Keychain is an operator that can create and manage Keys.
 * 
 * Users can request a Keychain to create a new Key using a particular scheme.
 * The Keychain will store the private key, while the public key will be stored
 * inside the Key object on-chain.
 * 
 * Users can request a Keychain to sign data using a particular Key.
 * 
 * The Keychain has an allowlist of addresses that can be used to write data
 * on-chain (public keys and signatures). This can also be used to rotate the
 * identity of the Keychain.
 */
export interface KeychainSDKType {
  id: bigint;
  creator: string;
  name: string;
  admins: string[];
  writers: string[];
  fees: KeychainFeesSDKType;
  description?: string;
  url?: string;
  keybase_id?: KeybaseIdSDKType;
}
export interface KeybaseId {
  value: string;
}
export interface KeybaseIdProtoMsg {
  typeUrl: "/warden.warden.v1beta3.KeybaseId";
  value: Uint8Array;
}
export interface KeybaseIdAmino {
  value?: string;
}
export interface KeybaseIdAminoMsg {
  type: "/warden.warden.v1beta3.KeybaseId";
  value: KeybaseIdAmino;
}
export interface KeybaseIdSDKType {
  value: string;
}
/** Fees for creating and signing Keys. */
export interface KeychainFees {
  /** Fee for creating a new Key. */
  keyReq: Coin[];
  /** Fee for signing data. */
  sigReq: Coin[];
}
export interface KeychainFeesProtoMsg {
  typeUrl: "/warden.warden.v1beta3.KeychainFees";
  value: Uint8Array;
}
/** Fees for creating and signing Keys. */
export interface KeychainFeesAmino {
  /** Fee for creating a new Key. */
  key_req: CoinAmino[];
  /** Fee for signing data. */
  sig_req: CoinAmino[];
}
export interface KeychainFeesAminoMsg {
  type: "/warden.warden.v1beta3.KeychainFees";
  value: KeychainFeesAmino;
}
/** Fees for creating and signing Keys. */
export interface KeychainFeesSDKType {
  key_req: CoinSDKType[];
  sig_req: CoinSDKType[];
}
function createBaseKeychain(): Keychain {
  return {
    id: BigInt(0),
    creator: "",
    name: "",
    admins: [],
    writers: [],
    fees: KeychainFees.fromPartial({}),
    description: undefined,
    url: undefined,
    keybaseId: undefined
  };
}
export const Keychain = {
  typeUrl: "/warden.warden.v1beta3.Keychain",
  encode(message: Keychain, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    for (const v of message.admins) {
      writer.uint32(34).string(v!);
    }
    for (const v of message.writers) {
      writer.uint32(42).string(v!);
    }
    if (message.fees !== undefined) {
      KeychainFees.encode(message.fees, writer.uint32(58).fork()).ldelim();
    }
    if (message.description !== undefined) {
      writer.uint32(66).string(message.description);
    }
    if (message.url !== undefined) {
      writer.uint32(74).string(message.url);
    }
    if (message.keybaseId !== undefined) {
      KeybaseId.encode(message.keybaseId, writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Keychain {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeychain();
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
          message.name = reader.string();
          break;
        case 4:
          message.admins.push(reader.string());
          break;
        case 5:
          message.writers.push(reader.string());
          break;
        case 7:
          message.fees = KeychainFees.decode(reader, reader.uint32());
          break;
        case 8:
          message.description = reader.string();
          break;
        case 9:
          message.url = reader.string();
          break;
        case 10:
          message.keybaseId = KeybaseId.decode(reader, reader.uint32());
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
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      creator: isSet(object.creator) ? String(object.creator) : "",
      name: isSet(object.name) ? String(object.name) : "",
      admins: Array.isArray(object?.admins) ? object.admins.map((e: any) => String(e)) : [],
      writers: Array.isArray(object?.writers) ? object.writers.map((e: any) => String(e)) : [],
      fees: isSet(object.fees) ? KeychainFees.fromJSON(object.fees) : undefined,
      description: isSet(object.description) ? String(object.description) : undefined,
      url: isSet(object.url) ? String(object.url) : undefined,
      keybaseId: isSet(object.keybaseId) ? KeybaseId.fromJSON(object.keybaseId) : undefined
    };
  },
  toJSON(message: Keychain): JsonSafe<Keychain> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.creator !== undefined && (obj.creator = message.creator);
    message.name !== undefined && (obj.name = message.name);
    if (message.admins) {
      obj.admins = message.admins.map(e => e);
    } else {
      obj.admins = [];
    }
    if (message.writers) {
      obj.writers = message.writers.map(e => e);
    } else {
      obj.writers = [];
    }
    message.fees !== undefined && (obj.fees = message.fees ? KeychainFees.toJSON(message.fees) : undefined);
    message.description !== undefined && (obj.description = message.description);
    message.url !== undefined && (obj.url = message.url);
    message.keybaseId !== undefined && (obj.keybaseId = message.keybaseId ? KeybaseId.toJSON(message.keybaseId) : undefined);
    return obj;
  },
  fromPartial(object: Partial<Keychain>): Keychain {
    const message = createBaseKeychain();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.creator = object.creator ?? "";
    message.name = object.name ?? "";
    message.admins = object.admins?.map(e => e) || [];
    message.writers = object.writers?.map(e => e) || [];
    message.fees = object.fees !== undefined && object.fees !== null ? KeychainFees.fromPartial(object.fees) : undefined;
    message.description = object.description ?? undefined;
    message.url = object.url ?? undefined;
    message.keybaseId = object.keybaseId !== undefined && object.keybaseId !== null ? KeybaseId.fromPartial(object.keybaseId) : undefined;
    return message;
  },
  fromAmino(object: KeychainAmino): Keychain {
    const message = createBaseKeychain();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    message.admins = object.admins?.map(e => e) || [];
    message.writers = object.writers?.map(e => e) || [];
    if (object.fees !== undefined && object.fees !== null) {
      message.fees = KeychainFees.fromAmino(object.fees);
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.url !== undefined && object.url !== null) {
      message.url = object.url;
    }
    if (object.keybase_id !== undefined && object.keybase_id !== null) {
      message.keybaseId = KeybaseId.fromAmino(object.keybase_id);
    }
    return message;
  },
  toAmino(message: Keychain): KeychainAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.name = message.name === "" ? undefined : message.name;
    if (message.admins) {
      obj.admins = message.admins.map(e => e);
    } else {
      obj.admins = message.admins;
    }
    if (message.writers) {
      obj.writers = message.writers.map(e => e);
    } else {
      obj.writers = message.writers;
    }
    obj.fees = message.fees ? KeychainFees.toAmino(message.fees) : undefined;
    obj.description = message.description === null ? undefined : message.description;
    obj.url = message.url === null ? undefined : message.url;
    obj.keybase_id = message.keybaseId ? KeybaseId.toAmino(message.keybaseId) : undefined;
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
      typeUrl: "/warden.warden.v1beta3.Keychain",
      value: Keychain.encode(message).finish()
    };
  }
};
function createBaseKeybaseId(): KeybaseId {
  return {
    value: ""
  };
}
export const KeybaseId = {
  typeUrl: "/warden.warden.v1beta3.KeybaseId",
  encode(message: KeybaseId, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.value !== "") {
      writer.uint32(10).string(message.value);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): KeybaseId {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeybaseId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): KeybaseId {
    return {
      value: isSet(object.value) ? String(object.value) : ""
    };
  },
  toJSON(message: KeybaseId): JsonSafe<KeybaseId> {
    const obj: any = {};
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },
  fromPartial(object: Partial<KeybaseId>): KeybaseId {
    const message = createBaseKeybaseId();
    message.value = object.value ?? "";
    return message;
  },
  fromAmino(object: KeybaseIdAmino): KeybaseId {
    const message = createBaseKeybaseId();
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
  toAmino(message: KeybaseId): KeybaseIdAmino {
    const obj: any = {};
    obj.value = message.value === "" ? undefined : message.value;
    return obj;
  },
  fromAminoMsg(object: KeybaseIdAminoMsg): KeybaseId {
    return KeybaseId.fromAmino(object.value);
  },
  fromProtoMsg(message: KeybaseIdProtoMsg): KeybaseId {
    return KeybaseId.decode(message.value);
  },
  toProto(message: KeybaseId): Uint8Array {
    return KeybaseId.encode(message).finish();
  },
  toProtoMsg(message: KeybaseId): KeybaseIdProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta3.KeybaseId",
      value: KeybaseId.encode(message).finish()
    };
  }
};
function createBaseKeychainFees(): KeychainFees {
  return {
    keyReq: [],
    sigReq: []
  };
}
export const KeychainFees = {
  typeUrl: "/warden.warden.v1beta3.KeychainFees",
  encode(message: KeychainFees, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.keyReq) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.sigReq) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): KeychainFees {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeychainFees();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.keyReq.push(Coin.decode(reader, reader.uint32()));
          break;
        case 2:
          message.sigReq.push(Coin.decode(reader, reader.uint32()));
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
      keyReq: Array.isArray(object?.keyReq) ? object.keyReq.map((e: any) => Coin.fromJSON(e)) : [],
      sigReq: Array.isArray(object?.sigReq) ? object.sigReq.map((e: any) => Coin.fromJSON(e)) : []
    };
  },
  toJSON(message: KeychainFees): JsonSafe<KeychainFees> {
    const obj: any = {};
    if (message.keyReq) {
      obj.keyReq = message.keyReq.map(e => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.keyReq = [];
    }
    if (message.sigReq) {
      obj.sigReq = message.sigReq.map(e => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.sigReq = [];
    }
    return obj;
  },
  fromPartial(object: Partial<KeychainFees>): KeychainFees {
    const message = createBaseKeychainFees();
    message.keyReq = object.keyReq?.map(e => Coin.fromPartial(e)) || [];
    message.sigReq = object.sigReq?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: KeychainFeesAmino): KeychainFees {
    const message = createBaseKeychainFees();
    message.keyReq = object.key_req?.map(e => Coin.fromAmino(e)) || [];
    message.sigReq = object.sig_req?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: KeychainFees): KeychainFeesAmino {
    const obj: any = {};
    if (message.keyReq) {
      obj.key_req = message.keyReq.map(e => e ? Coin.toAmino(e) : undefined);
    } else {
      obj.key_req = message.keyReq;
    }
    if (message.sigReq) {
      obj.sig_req = message.sigReq.map(e => e ? Coin.toAmino(e) : undefined);
    } else {
      obj.sig_req = message.sigReq;
    }
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
      typeUrl: "/warden.warden.v1beta3.KeychainFees",
      value: KeychainFees.encode(message).finish()
    };
  }
};