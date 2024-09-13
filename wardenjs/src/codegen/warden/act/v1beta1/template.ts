//@ts-nocheck
import { Expression, ExpressionAmino, ExpressionSDKType } from "../../../shield/ast/ast.js";
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet } from "../../../helpers.js";
import { JsonSafe } from "../../../json-safe.js";
export interface Template {
  id: bigint;
  creator: string;
  name: string;
  /** The expression to be evaluated for this template. */
  expression?: Expression;
}
export interface TemplateProtoMsg {
  typeUrl: "/warden.act.v1beta1.Template";
  value: Uint8Array;
}
export interface TemplateAmino {
  id?: string;
  creator?: string;
  name?: string;
  /** The expression to be evaluated for this template. */
  expression?: ExpressionAmino;
}
export interface TemplateAminoMsg {
  type: "/warden.act.v1beta1.Template";
  value: TemplateAmino;
}
export interface TemplateSDKType {
  id: bigint;
  creator: string;
  name: string;
  expression?: ExpressionSDKType;
}
function createBaseTemplate(): Template {
  return {
    id: BigInt(0),
    creator: "",
    name: "",
    expression: undefined
  };
}
export const Template = {
  typeUrl: "/warden.act.v1beta1.Template",
  encode(message: Template, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.expression !== undefined) {
      Expression.encode(message.expression, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Template {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTemplate();
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
          message.expression = Expression.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Template {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      creator: isSet(object.creator) ? String(object.creator) : "",
      name: isSet(object.name) ? String(object.name) : "",
      expression: isSet(object.expression) ? Expression.fromJSON(object.expression) : undefined
    };
  },
  toJSON(message: Template): JsonSafe<Template> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.creator !== undefined && (obj.creator = message.creator);
    message.name !== undefined && (obj.name = message.name);
    message.expression !== undefined && (obj.expression = message.expression ? Expression.toJSON(message.expression) : undefined);
    return obj;
  },
  fromPartial(object: Partial<Template>): Template {
    const message = createBaseTemplate();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.creator = object.creator ?? "";
    message.name = object.name ?? "";
    message.expression = object.expression !== undefined && object.expression !== null ? Expression.fromPartial(object.expression) : undefined;
    return message;
  },
  fromAmino(object: TemplateAmino): Template {
    const message = createBaseTemplate();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    if (object.expression !== undefined && object.expression !== null) {
      message.expression = Expression.fromAmino(object.expression);
    }
    return message;
  },
  toAmino(message: Template): TemplateAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.name = message.name === "" ? undefined : message.name;
    obj.expression = message.expression ? Expression.toAmino(message.expression) : undefined;
    return obj;
  },
  fromAminoMsg(object: TemplateAminoMsg): Template {
    return Template.fromAmino(object.value);
  },
  fromProtoMsg(message: TemplateProtoMsg): Template {
    return Template.decode(message.value);
  },
  toProto(message: Template): Uint8Array {
    return Template.encode(message).finish();
  },
  toProtoMsg(message: Template): TemplateProtoMsg {
    return {
      typeUrl: "/warden.act.v1beta1.Template",
      value: Template.encode(message).finish()
    };
  }
};