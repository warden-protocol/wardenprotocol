//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../binary.js";
import { isSet } from "../../helpers.js";
import { JsonSafe } from "../../json-safe.js";
export enum Type {
  ILLEGAL = 0,
  EOF = 1,
  IDENT = 2,
  INT = 3,
  STRING = 4,
  COMMA = 5,
  SEMICOLON = 6,
  LPAREN = 7,
  RPAREN = 8,
  LBRACKET = 9,
  RBRACKET = 10,
  AND = 11,
  OR = 12,
  EQ = 13,
  NEQ = 14,
  GT = 15,
  LT = 16,
  GTE = 17,
  LTE = 18,
  ADD = 19,
  SUB = 20,
  MUL = 21,
  DIV = 22,
  TRUE = 23,
  FALSE = 24,
  UNRECOGNIZED = -1,
}
export const TypeSDKType = Type;
export const TypeAmino = Type;
export function typeFromJSON(object: any): Type {
  switch (object) {
    case 0:
    case "ILLEGAL":
      return Type.ILLEGAL;
    case 1:
    case "EOF":
      return Type.EOF;
    case 2:
    case "IDENT":
      return Type.IDENT;
    case 3:
    case "INT":
      return Type.INT;
    case 4:
    case "STRING":
      return Type.STRING;
    case 5:
    case "COMMA":
      return Type.COMMA;
    case 6:
    case "SEMICOLON":
      return Type.SEMICOLON;
    case 7:
    case "LPAREN":
      return Type.LPAREN;
    case 8:
    case "RPAREN":
      return Type.RPAREN;
    case 9:
    case "LBRACKET":
      return Type.LBRACKET;
    case 10:
    case "RBRACKET":
      return Type.RBRACKET;
    case 11:
    case "AND":
      return Type.AND;
    case 12:
    case "OR":
      return Type.OR;
    case 13:
    case "EQ":
      return Type.EQ;
    case 14:
    case "NEQ":
      return Type.NEQ;
    case 15:
    case "GT":
      return Type.GT;
    case 16:
    case "LT":
      return Type.LT;
    case 17:
    case "GTE":
      return Type.GTE;
    case 18:
    case "LTE":
      return Type.LTE;
    case 19:
    case "ADD":
      return Type.ADD;
    case 20:
    case "SUB":
      return Type.SUB;
    case 21:
    case "MUL":
      return Type.MUL;
    case 22:
    case "DIV":
      return Type.DIV;
    case 23:
    case "TRUE":
      return Type.TRUE;
    case 24:
    case "FALSE":
      return Type.FALSE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Type.UNRECOGNIZED;
  }
}
export function typeToJSON(object: Type): string {
  switch (object) {
    case Type.ILLEGAL:
      return "ILLEGAL";
    case Type.EOF:
      return "EOF";
    case Type.IDENT:
      return "IDENT";
    case Type.INT:
      return "INT";
    case Type.STRING:
      return "STRING";
    case Type.COMMA:
      return "COMMA";
    case Type.SEMICOLON:
      return "SEMICOLON";
    case Type.LPAREN:
      return "LPAREN";
    case Type.RPAREN:
      return "RPAREN";
    case Type.LBRACKET:
      return "LBRACKET";
    case Type.RBRACKET:
      return "RBRACKET";
    case Type.AND:
      return "AND";
    case Type.OR:
      return "OR";
    case Type.EQ:
      return "EQ";
    case Type.NEQ:
      return "NEQ";
    case Type.GT:
      return "GT";
    case Type.LT:
      return "LT";
    case Type.GTE:
      return "GTE";
    case Type.LTE:
      return "LTE";
    case Type.ADD:
      return "ADD";
    case Type.SUB:
      return "SUB";
    case Type.MUL:
      return "MUL";
    case Type.DIV:
      return "DIV";
    case Type.TRUE:
      return "TRUE";
    case Type.FALSE:
      return "FALSE";
    case Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export interface Token {
  type: Type;
  literal: string;
}
export interface TokenProtoMsg {
  typeUrl: "/shield.token.Token";
  value: Uint8Array;
}
export interface TokenAmino {
  type?: Type;
  literal?: string;
}
export interface TokenAminoMsg {
  type: "/shield.token.Token";
  value: TokenAmino;
}
export interface TokenSDKType {
  type: Type;
  literal: string;
}
function createBaseToken(): Token {
  return {
    type: 0,
    literal: ""
  };
}
export const Token = {
  typeUrl: "/shield.token.Token",
  encode(message: Token, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.literal !== "") {
      writer.uint32(18).string(message.literal);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Token {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseToken();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.literal = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Token {
    return {
      type: isSet(object.type) ? typeFromJSON(object.type) : -1,
      literal: isSet(object.literal) ? String(object.literal) : ""
    };
  },
  toJSON(message: Token): JsonSafe<Token> {
    const obj: any = {};
    message.type !== undefined && (obj.type = typeToJSON(message.type));
    message.literal !== undefined && (obj.literal = message.literal);
    return obj;
  },
  fromPartial(object: Partial<Token>): Token {
    const message = createBaseToken();
    message.type = object.type ?? 0;
    message.literal = object.literal ?? "";
    return message;
  },
  fromAmino(object: TokenAmino): Token {
    const message = createBaseToken();
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    }
    if (object.literal !== undefined && object.literal !== null) {
      message.literal = object.literal;
    }
    return message;
  },
  toAmino(message: Token): TokenAmino {
    const obj: any = {};
    obj.type = message.type === 0 ? undefined : message.type;
    obj.literal = message.literal === "" ? undefined : message.literal;
    return obj;
  },
  fromAminoMsg(object: TokenAminoMsg): Token {
    return Token.fromAmino(object.value);
  },
  fromProtoMsg(message: TokenProtoMsg): Token {
    return Token.decode(message.value);
  },
  toProto(message: Token): Uint8Array {
    return Token.encode(message).finish();
  },
  toProtoMsg(message: Token): TokenProtoMsg {
    return {
      typeUrl: "/shield.token.Token",
      value: Token.encode(message).finish()
    };
  }
};