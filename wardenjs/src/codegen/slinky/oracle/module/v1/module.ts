//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../../../binary.js";
import { isSet } from "../../../../helpers.js";
import { JsonSafe } from "../../../../json-safe.js";
/** Module is the config object of the builder module. */
export interface Module {
  /**
   * Authority defines the custom module authority. If not set, defaults to the
   * governance module.
   */
  authority: string;
}
export interface ModuleProtoMsg {
  typeUrl: "/slinky.oracle.module.v1.Module";
  value: Uint8Array;
}
/** Module is the config object of the builder module. */
export interface ModuleAmino {
  /**
   * Authority defines the custom module authority. If not set, defaults to the
   * governance module.
   */
  authority?: string;
}
export interface ModuleAminoMsg {
  type: "/slinky.oracle.module.v1.Module";
  value: ModuleAmino;
}
/** Module is the config object of the builder module. */
export interface ModuleSDKType {
  authority: string;
}
function createBaseModule(): Module {
  return {
    authority: ""
  };
}
export const Module = {
  typeUrl: "/slinky.oracle.module.v1.Module",
  encode(message: Module, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Module {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModule();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Module {
    return {
      authority: isSet(object.authority) ? String(object.authority) : ""
    };
  },
  toJSON(message: Module): JsonSafe<Module> {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    return obj;
  },
  fromPartial(object: Partial<Module>): Module {
    const message = createBaseModule();
    message.authority = object.authority ?? "";
    return message;
  },
  fromAmino(object: ModuleAmino): Module {
    const message = createBaseModule();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    return message;
  },
  toAmino(message: Module): ModuleAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    return obj;
  },
  fromAminoMsg(object: ModuleAminoMsg): Module {
    return Module.fromAmino(object.value);
  },
  fromProtoMsg(message: ModuleProtoMsg): Module {
    return Module.decode(message.value);
  },
  toProto(message: Module): Uint8Array {
    return Module.encode(message).finish();
  },
  toProtoMsg(message: Module): ModuleProtoMsg {
    return {
      typeUrl: "/slinky.oracle.module.v1.Module",
      value: Module.encode(message).finish()
    };
  }
};