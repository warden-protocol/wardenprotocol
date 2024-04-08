//@ts-nocheck
import * as _m0 from "protobufjs/minimal";
import { bytesFromBase64, base64FromBytes, isSet } from "../../../../helpers";
/**
 * MultiSignature wraps the signatures from a multisig.LegacyAminoPubKey.
 * See cosmos.tx.v1betata1.ModeInfo.Multi for how to specify which signers
 * signed and with which modes.
 */
export interface MultiSignature {
  signatures: Uint8Array[];
}
export interface MultiSignatureProtoMsg {
  typeUrl: "/cosmos.crypto.multisig.v1beta1.MultiSignature";
  value: Uint8Array;
}
/**
 * MultiSignature wraps the signatures from a multisig.LegacyAminoPubKey.
 * See cosmos.tx.v1betata1.ModeInfo.Multi for how to specify which signers
 * signed and with which modes.
 */
export interface MultiSignatureAmino {
  signatures?: string[];
}
export interface MultiSignatureAminoMsg {
  type: "cosmos-sdk/MultiSignature";
  value: MultiSignatureAmino;
}
/**
 * MultiSignature wraps the signatures from a multisig.LegacyAminoPubKey.
 * See cosmos.tx.v1betata1.ModeInfo.Multi for how to specify which signers
 * signed and with which modes.
 */
export interface MultiSignatureSDKType {
  signatures: Uint8Array[];
}
/**
 * CompactBitArray is an implementation of a space efficient bit array.
 * This is used to ensure that the encoded data takes up a minimal amount of
 * space after proto encoding.
 * This is not thread safe, and is not intended for concurrent usage.
 */
export interface CompactBitArray {
  extraBitsStored: number;
  elems: Uint8Array;
}
export interface CompactBitArrayProtoMsg {
  typeUrl: "/cosmos.crypto.multisig.v1beta1.CompactBitArray";
  value: Uint8Array;
}
/**
 * CompactBitArray is an implementation of a space efficient bit array.
 * This is used to ensure that the encoded data takes up a minimal amount of
 * space after proto encoding.
 * This is not thread safe, and is not intended for concurrent usage.
 */
export interface CompactBitArrayAmino {
  extra_bits_stored?: number;
  elems?: string;
}
export interface CompactBitArrayAminoMsg {
  type: "cosmos-sdk/CompactBitArray";
  value: CompactBitArrayAmino;
}
/**
 * CompactBitArray is an implementation of a space efficient bit array.
 * This is used to ensure that the encoded data takes up a minimal amount of
 * space after proto encoding.
 * This is not thread safe, and is not intended for concurrent usage.
 */
export interface CompactBitArraySDKType {
  extra_bits_stored: number;
  elems: Uint8Array;
}
function createBaseMultiSignature(): MultiSignature {
  return {
    signatures: []
  };
}
export const MultiSignature = {
  typeUrl: "/cosmos.crypto.multisig.v1beta1.MultiSignature",
  encode(message: MultiSignature, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.signatures) {
      writer.uint32(10).bytes(v!);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MultiSignature {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMultiSignature();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.signatures.push(reader.bytes());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MultiSignature {
    return {
      signatures: Array.isArray(object?.signatures) ? object.signatures.map((e: any) => bytesFromBase64(e)) : []
    };
  },
  toJSON(message: MultiSignature): unknown {
    const obj: any = {};
    if (message.signatures) {
      obj.signatures = message.signatures.map(e => base64FromBytes(e !== undefined ? e : new Uint8Array()));
    } else {
      obj.signatures = [];
    }
    return obj;
  },
  fromPartial(object: Partial<MultiSignature>): MultiSignature {
    const message = createBaseMultiSignature();
    message.signatures = object.signatures?.map(e => e) || [];
    return message;
  },
  fromAmino(object: MultiSignatureAmino): MultiSignature {
    const message = createBaseMultiSignature();
    message.signatures = object.signatures?.map(e => bytesFromBase64(e)) || [];
    return message;
  },
  toAmino(message: MultiSignature): MultiSignatureAmino {
    const obj: any = {};
    if (message.signatures) {
      obj.signatures = message.signatures.map(e => base64FromBytes(e));
    } else {
      obj.signatures = message.signatures;
    }
    return obj;
  },
  fromAminoMsg(object: MultiSignatureAminoMsg): MultiSignature {
    return MultiSignature.fromAmino(object.value);
  },
  toAminoMsg(message: MultiSignature): MultiSignatureAminoMsg {
    return {
      type: "cosmos-sdk/MultiSignature",
      value: MultiSignature.toAmino(message)
    };
  },
  fromProtoMsg(message: MultiSignatureProtoMsg): MultiSignature {
    return MultiSignature.decode(message.value);
  },
  toProto(message: MultiSignature): Uint8Array {
    return MultiSignature.encode(message).finish();
  },
  toProtoMsg(message: MultiSignature): MultiSignatureProtoMsg {
    return {
      typeUrl: "/cosmos.crypto.multisig.v1beta1.MultiSignature",
      value: MultiSignature.encode(message).finish()
    };
  }
};
function createBaseCompactBitArray(): CompactBitArray {
  return {
    extraBitsStored: 0,
    elems: new Uint8Array()
  };
}
export const CompactBitArray = {
  typeUrl: "/cosmos.crypto.multisig.v1beta1.CompactBitArray",
  encode(message: CompactBitArray, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.extraBitsStored !== 0) {
      writer.uint32(8).uint32(message.extraBitsStored);
    }
    if (message.elems.length !== 0) {
      writer.uint32(18).bytes(message.elems);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): CompactBitArray {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCompactBitArray();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.extraBitsStored = reader.uint32();
          break;
        case 2:
          message.elems = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CompactBitArray {
    return {
      extraBitsStored: isSet(object.extraBitsStored) ? Number(object.extraBitsStored) : 0,
      elems: isSet(object.elems) ? bytesFromBase64(object.elems) : new Uint8Array()
    };
  },
  toJSON(message: CompactBitArray): unknown {
    const obj: any = {};
    message.extraBitsStored !== undefined && (obj.extraBitsStored = Math.round(message.extraBitsStored));
    message.elems !== undefined && (obj.elems = base64FromBytes(message.elems !== undefined ? message.elems : new Uint8Array()));
    return obj;
  },
  fromPartial(object: Partial<CompactBitArray>): CompactBitArray {
    const message = createBaseCompactBitArray();
    message.extraBitsStored = object.extraBitsStored ?? 0;
    message.elems = object.elems ?? new Uint8Array();
    return message;
  },
  fromAmino(object: CompactBitArrayAmino): CompactBitArray {
    const message = createBaseCompactBitArray();
    if (object.extra_bits_stored !== undefined && object.extra_bits_stored !== null) {
      message.extraBitsStored = object.extra_bits_stored;
    }
    if (object.elems !== undefined && object.elems !== null) {
      message.elems = bytesFromBase64(object.elems);
    }
    return message;
  },
  toAmino(message: CompactBitArray): CompactBitArrayAmino {
    const obj: any = {};
    obj.extra_bits_stored = message.extraBitsStored === 0 ? undefined : message.extraBitsStored;
    obj.elems = message.elems ? base64FromBytes(message.elems) : undefined;
    return obj;
  },
  fromAminoMsg(object: CompactBitArrayAminoMsg): CompactBitArray {
    return CompactBitArray.fromAmino(object.value);
  },
  toAminoMsg(message: CompactBitArray): CompactBitArrayAminoMsg {
    return {
      type: "cosmos-sdk/CompactBitArray",
      value: CompactBitArray.toAmino(message)
    };
  },
  fromProtoMsg(message: CompactBitArrayProtoMsg): CompactBitArray {
    return CompactBitArray.decode(message.value);
  },
  toProto(message: CompactBitArray): Uint8Array {
    return CompactBitArray.encode(message).finish();
  },
  toProtoMsg(message: CompactBitArray): CompactBitArrayProtoMsg {
    return {
      typeUrl: "/cosmos.crypto.multisig.v1beta1.CompactBitArray",
      value: CompactBitArray.encode(message).finish()
    };
  }
};