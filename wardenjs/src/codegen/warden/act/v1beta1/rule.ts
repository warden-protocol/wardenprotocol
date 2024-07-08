//@ts-nocheck
import { Expression, ExpressionAmino, ExpressionSDKType } from "../../../shield/ast/ast.js";
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet } from "../../../helpers.js";
import { JsonSafe } from "../../../json-safe.js";
export interface Rule {
  id: bigint;
  creator: string;
  name: string;
  /** The expression to be evaluated for this rule. */
  expression?: Expression;
}
export interface RuleProtoMsg {
  typeUrl: "/warden.act.v1beta1.Rule";
  value: Uint8Array;
}
export interface RuleAmino {
  id?: string;
  creator?: string;
  name?: string;
  /** The expression to be evaluated for this rule. */
  expression?: ExpressionAmino;
}
export interface RuleAminoMsg {
  type: "/warden.act.v1beta1.Rule";
  value: RuleAmino;
}
export interface RuleSDKType {
  id: bigint;
  creator: string;
  name: string;
  expression?: ExpressionSDKType;
}
function createBaseRule(): Rule {
  return {
    id: BigInt(0),
    creator: "",
    name: "",
    expression: undefined
  };
}
export const Rule = {
  typeUrl: "/warden.act.v1beta1.Rule",
  encode(message: Rule, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
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
  decode(input: BinaryReader | Uint8Array, length?: number): Rule {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRule();
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
  fromJSON(object: any): Rule {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      creator: isSet(object.creator) ? String(object.creator) : "",
      name: isSet(object.name) ? String(object.name) : "",
      expression: isSet(object.expression) ? Expression.fromJSON(object.expression) : undefined
    };
  },
  toJSON(message: Rule): JsonSafe<Rule> {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.creator !== undefined && (obj.creator = message.creator);
    message.name !== undefined && (obj.name = message.name);
    message.expression !== undefined && (obj.expression = message.expression ? Expression.toJSON(message.expression) : undefined);
    return obj;
  },
  fromPartial(object: Partial<Rule>): Rule {
    const message = createBaseRule();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.creator = object.creator ?? "";
    message.name = object.name ?? "";
    message.expression = object.expression !== undefined && object.expression !== null ? Expression.fromPartial(object.expression) : undefined;
    return message;
  },
  fromAmino(object: RuleAmino): Rule {
    const message = createBaseRule();
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
  toAmino(message: Rule): RuleAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.name = message.name === "" ? undefined : message.name;
    obj.expression = message.expression ? Expression.toAmino(message.expression) : undefined;
    return obj;
  },
  fromAminoMsg(object: RuleAminoMsg): Rule {
    return Rule.fromAmino(object.value);
  },
  fromProtoMsg(message: RuleProtoMsg): Rule {
    return Rule.decode(message.value);
  },
  toProto(message: Rule): Uint8Array {
    return Rule.encode(message).finish();
  },
  toProtoMsg(message: Rule): RuleProtoMsg {
    return {
      typeUrl: "/warden.act.v1beta1.Rule",
      value: Rule.encode(message).finish()
    };
  }
};