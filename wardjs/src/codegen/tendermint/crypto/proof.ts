//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../binary.js";
import { isSet, bytesFromBase64, base64FromBytes } from "../../helpers.js";
export interface Proof {
  total: bigint;
  index: bigint;
  leafHash: Uint8Array;
  aunts: Uint8Array[];
}
export interface ProofProtoMsg {
  typeUrl: "/tendermint.crypto.Proof";
  value: Uint8Array;
}
export interface ProofAmino {
  total?: string;
  index?: string;
  leaf_hash?: string;
  aunts?: string[];
}
export interface ProofAminoMsg {
  type: "/tendermint.crypto.Proof";
  value: ProofAmino;
}
export interface ProofSDKType {
  total: bigint;
  index: bigint;
  leaf_hash: Uint8Array;
  aunts: Uint8Array[];
}
export interface ValueOp {
  /** Encoded in ProofOp.Key. */
  key: Uint8Array;
  /** To encode in ProofOp.Data */
  proof?: Proof;
}
export interface ValueOpProtoMsg {
  typeUrl: "/tendermint.crypto.ValueOp";
  value: Uint8Array;
}
export interface ValueOpAmino {
  /** Encoded in ProofOp.Key. */
  key?: string;
  /** To encode in ProofOp.Data */
  proof?: ProofAmino;
}
export interface ValueOpAminoMsg {
  type: "/tendermint.crypto.ValueOp";
  value: ValueOpAmino;
}
export interface ValueOpSDKType {
  key: Uint8Array;
  proof?: ProofSDKType;
}
export interface DominoOp {
  key: string;
  input: string;
  output: string;
}
export interface DominoOpProtoMsg {
  typeUrl: "/tendermint.crypto.DominoOp";
  value: Uint8Array;
}
export interface DominoOpAmino {
  key?: string;
  input?: string;
  output?: string;
}
export interface DominoOpAminoMsg {
  type: "/tendermint.crypto.DominoOp";
  value: DominoOpAmino;
}
export interface DominoOpSDKType {
  key: string;
  input: string;
  output: string;
}
/**
 * ProofOp defines an operation used for calculating Merkle root
 * The data could be arbitrary format, providing nessecary data
 * for example neighbouring node hash
 */
export interface ProofOp {
  type: string;
  key: Uint8Array;
  data: Uint8Array;
}
export interface ProofOpProtoMsg {
  typeUrl: "/tendermint.crypto.ProofOp";
  value: Uint8Array;
}
/**
 * ProofOp defines an operation used for calculating Merkle root
 * The data could be arbitrary format, providing nessecary data
 * for example neighbouring node hash
 */
export interface ProofOpAmino {
  type?: string;
  key?: string;
  data?: string;
}
export interface ProofOpAminoMsg {
  type: "/tendermint.crypto.ProofOp";
  value: ProofOpAmino;
}
/**
 * ProofOp defines an operation used for calculating Merkle root
 * The data could be arbitrary format, providing nessecary data
 * for example neighbouring node hash
 */
export interface ProofOpSDKType {
  type: string;
  key: Uint8Array;
  data: Uint8Array;
}
/** ProofOps is Merkle proof defined by the list of ProofOps */
export interface ProofOps {
  ops: ProofOp[];
}
export interface ProofOpsProtoMsg {
  typeUrl: "/tendermint.crypto.ProofOps";
  value: Uint8Array;
}
/** ProofOps is Merkle proof defined by the list of ProofOps */
export interface ProofOpsAmino {
  ops?: ProofOpAmino[];
}
export interface ProofOpsAminoMsg {
  type: "/tendermint.crypto.ProofOps";
  value: ProofOpsAmino;
}
/** ProofOps is Merkle proof defined by the list of ProofOps */
export interface ProofOpsSDKType {
  ops: ProofOpSDKType[];
}
function createBaseProof(): Proof {
  return {
    total: BigInt(0),
    index: BigInt(0),
    leafHash: new Uint8Array(),
    aunts: []
  };
}
export const Proof = {
  typeUrl: "/tendermint.crypto.Proof",
  encode(message: Proof, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.total !== BigInt(0)) {
      writer.uint32(8).int64(message.total);
    }
    if (message.index !== BigInt(0)) {
      writer.uint32(16).int64(message.index);
    }
    if (message.leafHash.length !== 0) {
      writer.uint32(26).bytes(message.leafHash);
    }
    for (const v of message.aunts) {
      writer.uint32(34).bytes(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Proof {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProof();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.total = reader.int64();
          break;
        case 2:
          message.index = reader.int64();
          break;
        case 3:
          message.leafHash = reader.bytes();
          break;
        case 4:
          message.aunts.push(reader.bytes());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Proof {
    return {
      total: isSet(object.total) ? BigInt(object.total.toString()) : BigInt(0),
      index: isSet(object.index) ? BigInt(object.index.toString()) : BigInt(0),
      leafHash: isSet(object.leafHash) ? bytesFromBase64(object.leafHash) : new Uint8Array(),
      aunts: Array.isArray(object?.aunts) ? object.aunts.map((e: any) => bytesFromBase64(e)) : []
    };
  },
  toJSON(message: Proof): unknown {
    const obj: any = {};
    message.total !== undefined && (obj.total = (message.total || BigInt(0)).toString());
    message.index !== undefined && (obj.index = (message.index || BigInt(0)).toString());
    message.leafHash !== undefined && (obj.leafHash = base64FromBytes(message.leafHash !== undefined ? message.leafHash : new Uint8Array()));
    if (message.aunts) {
      obj.aunts = message.aunts.map(e => base64FromBytes(e !== undefined ? e : new Uint8Array()));
    } else {
      obj.aunts = [];
    }
    return obj;
  },
  fromPartial(object: Partial<Proof>): Proof {
    const message = createBaseProof();
    message.total = object.total !== undefined && object.total !== null ? BigInt(object.total.toString()) : BigInt(0);
    message.index = object.index !== undefined && object.index !== null ? BigInt(object.index.toString()) : BigInt(0);
    message.leafHash = object.leafHash ?? new Uint8Array();
    message.aunts = object.aunts?.map(e => e) || [];
    return message;
  },
  fromAmino(object: ProofAmino): Proof {
    const message = createBaseProof();
    if (object.total !== undefined && object.total !== null) {
      message.total = BigInt(object.total);
    }
    if (object.index !== undefined && object.index !== null) {
      message.index = BigInt(object.index);
    }
    if (object.leaf_hash !== undefined && object.leaf_hash !== null) {
      message.leafHash = bytesFromBase64(object.leaf_hash);
    }
    message.aunts = object.aunts?.map(e => bytesFromBase64(e)) || [];
    return message;
  },
  toAmino(message: Proof): ProofAmino {
    const obj: any = {};
    obj.total = message.total !== BigInt(0) ? message.total.toString() : undefined;
    obj.index = message.index !== BigInt(0) ? message.index.toString() : undefined;
    obj.leaf_hash = message.leafHash ? base64FromBytes(message.leafHash) : undefined;
    if (message.aunts) {
      obj.aunts = message.aunts.map(e => base64FromBytes(e));
    } else {
      obj.aunts = message.aunts;
    }
    return obj;
  },
  fromAminoMsg(object: ProofAminoMsg): Proof {
    return Proof.fromAmino(object.value);
  },
  fromProtoMsg(message: ProofProtoMsg): Proof {
    return Proof.decode(message.value);
  },
  toProto(message: Proof): Uint8Array {
    return Proof.encode(message).finish();
  },
  toProtoMsg(message: Proof): ProofProtoMsg {
    return {
      typeUrl: "/tendermint.crypto.Proof",
      value: Proof.encode(message).finish()
    };
  }
};
function createBaseValueOp(): ValueOp {
  return {
    key: new Uint8Array(),
    proof: undefined
  };
}
export const ValueOp = {
  typeUrl: "/tendermint.crypto.ValueOp",
  encode(message: ValueOp, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.key.length !== 0) {
      writer.uint32(10).bytes(message.key);
    }
    if (message.proof !== undefined) {
      Proof.encode(message.proof, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ValueOp {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValueOp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.bytes();
          break;
        case 2:
          message.proof = Proof.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ValueOp {
    return {
      key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(),
      proof: isSet(object.proof) ? Proof.fromJSON(object.proof) : undefined
    };
  },
  toJSON(message: ValueOp): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = base64FromBytes(message.key !== undefined ? message.key : new Uint8Array()));
    message.proof !== undefined && (obj.proof = message.proof ? Proof.toJSON(message.proof) : undefined);
    return obj;
  },
  fromPartial(object: Partial<ValueOp>): ValueOp {
    const message = createBaseValueOp();
    message.key = object.key ?? new Uint8Array();
    message.proof = object.proof !== undefined && object.proof !== null ? Proof.fromPartial(object.proof) : undefined;
    return message;
  },
  fromAmino(object: ValueOpAmino): ValueOp {
    const message = createBaseValueOp();
    if (object.key !== undefined && object.key !== null) {
      message.key = bytesFromBase64(object.key);
    }
    if (object.proof !== undefined && object.proof !== null) {
      message.proof = Proof.fromAmino(object.proof);
    }
    return message;
  },
  toAmino(message: ValueOp): ValueOpAmino {
    const obj: any = {};
    obj.key = message.key ? base64FromBytes(message.key) : undefined;
    obj.proof = message.proof ? Proof.toAmino(message.proof) : undefined;
    return obj;
  },
  fromAminoMsg(object: ValueOpAminoMsg): ValueOp {
    return ValueOp.fromAmino(object.value);
  },
  fromProtoMsg(message: ValueOpProtoMsg): ValueOp {
    return ValueOp.decode(message.value);
  },
  toProto(message: ValueOp): Uint8Array {
    return ValueOp.encode(message).finish();
  },
  toProtoMsg(message: ValueOp): ValueOpProtoMsg {
    return {
      typeUrl: "/tendermint.crypto.ValueOp",
      value: ValueOp.encode(message).finish()
    };
  }
};
function createBaseDominoOp(): DominoOp {
  return {
    key: "",
    input: "",
    output: ""
  };
}
export const DominoOp = {
  typeUrl: "/tendermint.crypto.DominoOp",
  encode(message: DominoOp, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.input !== "") {
      writer.uint32(18).string(message.input);
    }
    if (message.output !== "") {
      writer.uint32(26).string(message.output);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): DominoOp {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDominoOp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.input = reader.string();
          break;
        case 3:
          message.output = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): DominoOp {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      input: isSet(object.input) ? String(object.input) : "",
      output: isSet(object.output) ? String(object.output) : ""
    };
  },
  toJSON(message: DominoOp): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.input !== undefined && (obj.input = message.input);
    message.output !== undefined && (obj.output = message.output);
    return obj;
  },
  fromPartial(object: Partial<DominoOp>): DominoOp {
    const message = createBaseDominoOp();
    message.key = object.key ?? "";
    message.input = object.input ?? "";
    message.output = object.output ?? "";
    return message;
  },
  fromAmino(object: DominoOpAmino): DominoOp {
    const message = createBaseDominoOp();
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.input !== undefined && object.input !== null) {
      message.input = object.input;
    }
    if (object.output !== undefined && object.output !== null) {
      message.output = object.output;
    }
    return message;
  },
  toAmino(message: DominoOp): DominoOpAmino {
    const obj: any = {};
    obj.key = message.key === "" ? undefined : message.key;
    obj.input = message.input === "" ? undefined : message.input;
    obj.output = message.output === "" ? undefined : message.output;
    return obj;
  },
  fromAminoMsg(object: DominoOpAminoMsg): DominoOp {
    return DominoOp.fromAmino(object.value);
  },
  fromProtoMsg(message: DominoOpProtoMsg): DominoOp {
    return DominoOp.decode(message.value);
  },
  toProto(message: DominoOp): Uint8Array {
    return DominoOp.encode(message).finish();
  },
  toProtoMsg(message: DominoOp): DominoOpProtoMsg {
    return {
      typeUrl: "/tendermint.crypto.DominoOp",
      value: DominoOp.encode(message).finish()
    };
  }
};
function createBaseProofOp(): ProofOp {
  return {
    type: "",
    key: new Uint8Array(),
    data: new Uint8Array()
  };
}
export const ProofOp = {
  typeUrl: "/tendermint.crypto.ProofOp",
  encode(message: ProofOp, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.type !== "") {
      writer.uint32(10).string(message.type);
    }
    if (message.key.length !== 0) {
      writer.uint32(18).bytes(message.key);
    }
    if (message.data.length !== 0) {
      writer.uint32(26).bytes(message.data);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ProofOp {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProofOp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.string();
          break;
        case 2:
          message.key = reader.bytes();
          break;
        case 3:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ProofOp {
    return {
      type: isSet(object.type) ? String(object.type) : "",
      key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(),
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array()
    };
  },
  toJSON(message: ProofOp): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = message.type);
    message.key !== undefined && (obj.key = base64FromBytes(message.key !== undefined ? message.key : new Uint8Array()));
    message.data !== undefined && (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    return obj;
  },
  fromPartial(object: Partial<ProofOp>): ProofOp {
    const message = createBaseProofOp();
    message.type = object.type ?? "";
    message.key = object.key ?? new Uint8Array();
    message.data = object.data ?? new Uint8Array();
    return message;
  },
  fromAmino(object: ProofOpAmino): ProofOp {
    const message = createBaseProofOp();
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = bytesFromBase64(object.key);
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = bytesFromBase64(object.data);
    }
    return message;
  },
  toAmino(message: ProofOp): ProofOpAmino {
    const obj: any = {};
    obj.type = message.type === "" ? undefined : message.type;
    obj.key = message.key ? base64FromBytes(message.key) : undefined;
    obj.data = message.data ? base64FromBytes(message.data) : undefined;
    return obj;
  },
  fromAminoMsg(object: ProofOpAminoMsg): ProofOp {
    return ProofOp.fromAmino(object.value);
  },
  fromProtoMsg(message: ProofOpProtoMsg): ProofOp {
    return ProofOp.decode(message.value);
  },
  toProto(message: ProofOp): Uint8Array {
    return ProofOp.encode(message).finish();
  },
  toProtoMsg(message: ProofOp): ProofOpProtoMsg {
    return {
      typeUrl: "/tendermint.crypto.ProofOp",
      value: ProofOp.encode(message).finish()
    };
  }
};
function createBaseProofOps(): ProofOps {
  return {
    ops: []
  };
}
export const ProofOps = {
  typeUrl: "/tendermint.crypto.ProofOps",
  encode(message: ProofOps, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.ops) {
      ProofOp.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ProofOps {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProofOps();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ops.push(ProofOp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ProofOps {
    return {
      ops: Array.isArray(object?.ops) ? object.ops.map((e: any) => ProofOp.fromJSON(e)) : []
    };
  },
  toJSON(message: ProofOps): unknown {
    const obj: any = {};
    if (message.ops) {
      obj.ops = message.ops.map(e => e ? ProofOp.toJSON(e) : undefined);
    } else {
      obj.ops = [];
    }
    return obj;
  },
  fromPartial(object: Partial<ProofOps>): ProofOps {
    const message = createBaseProofOps();
    message.ops = object.ops?.map(e => ProofOp.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: ProofOpsAmino): ProofOps {
    const message = createBaseProofOps();
    message.ops = object.ops?.map(e => ProofOp.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: ProofOps): ProofOpsAmino {
    const obj: any = {};
    if (message.ops) {
      obj.ops = message.ops.map(e => e ? ProofOp.toAmino(e) : undefined);
    } else {
      obj.ops = message.ops;
    }
    return obj;
  },
  fromAminoMsg(object: ProofOpsAminoMsg): ProofOps {
    return ProofOps.fromAmino(object.value);
  },
  fromProtoMsg(message: ProofOpsProtoMsg): ProofOps {
    return ProofOps.decode(message.value);
  },
  toProto(message: ProofOps): Uint8Array {
    return ProofOps.encode(message).finish();
  },
  toProtoMsg(message: ProofOps): ProofOpsProtoMsg {
    return {
      typeUrl: "/tendermint.crypto.ProofOps",
      value: ProofOps.encode(message).finish()
    };
  }
};