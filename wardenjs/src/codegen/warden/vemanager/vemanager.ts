//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../binary.js";
import { bytesFromBase64, base64FromBytes } from "../../helpers.js";
import { JsonSafe } from "../../json-safe.js";
/**
 * ABCI treats a VoteExtensions as a byte array, but we need to distinguish
 * between multiple extensions coming from different sources, i.e. we want an
 * array of byte arrays, which is what this type represents.
 */
export interface VoteExtensions {
  extensions: Uint8Array[];
}
export interface VoteExtensionsProtoMsg {
  typeUrl: "/warden.vemanager.VoteExtensions";
  value: Uint8Array;
}
/**
 * ABCI treats a VoteExtensions as a byte array, but we need to distinguish
 * between multiple extensions coming from different sources, i.e. we want an
 * array of byte arrays, which is what this type represents.
 */
export interface VoteExtensionsAmino {
  extensions?: string[];
}
export interface VoteExtensionsAminoMsg {
  type: "/warden.vemanager.VoteExtensions";
  value: VoteExtensionsAmino;
}
/**
 * ABCI treats a VoteExtensions as a byte array, but we need to distinguish
 * between multiple extensions coming from different sources, i.e. we want an
 * array of byte arrays, which is what this type represents.
 */
export interface VoteExtensionsSDKType {
  extensions: Uint8Array[];
}
function createBaseVoteExtensions(): VoteExtensions {
  return {
    extensions: []
  };
}
export const VoteExtensions = {
  typeUrl: "/warden.vemanager.VoteExtensions",
  encode(message: VoteExtensions, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.extensions) {
      writer.uint32(10).bytes(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): VoteExtensions {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVoteExtensions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.extensions.push(reader.bytes());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): VoteExtensions {
    return {
      extensions: Array.isArray(object?.extensions) ? object.extensions.map((e: any) => bytesFromBase64(e)) : []
    };
  },
  toJSON(message: VoteExtensions): JsonSafe<VoteExtensions> {
    const obj: any = {};
    if (message.extensions) {
      obj.extensions = message.extensions.map(e => base64FromBytes(e !== undefined ? e : new Uint8Array()));
    } else {
      obj.extensions = [];
    }
    return obj;
  },
  fromPartial(object: Partial<VoteExtensions>): VoteExtensions {
    const message = createBaseVoteExtensions();
    message.extensions = object.extensions?.map(e => e) || [];
    return message;
  },
  fromAmino(object: VoteExtensionsAmino): VoteExtensions {
    const message = createBaseVoteExtensions();
    message.extensions = object.extensions?.map(e => bytesFromBase64(e)) || [];
    return message;
  },
  toAmino(message: VoteExtensions): VoteExtensionsAmino {
    const obj: any = {};
    if (message.extensions) {
      obj.extensions = message.extensions.map(e => base64FromBytes(e));
    } else {
      obj.extensions = message.extensions;
    }
    return obj;
  },
  fromAminoMsg(object: VoteExtensionsAminoMsg): VoteExtensions {
    return VoteExtensions.fromAmino(object.value);
  },
  fromProtoMsg(message: VoteExtensionsProtoMsg): VoteExtensions {
    return VoteExtensions.decode(message.value);
  },
  toProto(message: VoteExtensions): Uint8Array {
    return VoteExtensions.encode(message).finish();
  },
  toProtoMsg(message: VoteExtensions): VoteExtensionsProtoMsg {
    return {
      typeUrl: "/warden.vemanager.VoteExtensions",
      value: VoteExtensions.encode(message).finish()
    };
  }
};