//@ts-nocheck
import _m0 from "protobufjs/minimal.js";
import { isSet } from "../../helpers.js";
export enum Type {
  ILLEGAL = 0,
  EOF = 1,
  IDENT = 2,
  INT = 3,
  COMMA = 4,
  SEMICOLON = 5,
  LPAREN = 6,
  RPAREN = 7,
  LBRACKET = 8,
  RBRACKET = 9,
  AND = 10,
  OR = 11,
  TRUE = 12,
  FALSE = 13,
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
    case "COMMA":
      return Type.COMMA;
    case 5:
    case "SEMICOLON":
      return Type.SEMICOLON;
    case 6:
    case "LPAREN":
      return Type.LPAREN;
    case 7:
    case "RPAREN":
      return Type.RPAREN;
    case 8:
    case "LBRACKET":
      return Type.LBRACKET;
    case 9:
    case "RBRACKET":
      return Type.RBRACKET;
    case 10:
    case "AND":
      return Type.AND;
    case 11:
    case "OR":
      return Type.OR;
    case 12:
    case "TRUE":
      return Type.TRUE;
    case 13:
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
  encode(message: Token, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.literal !== "") {
      writer.uint32(18).string(message.literal);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): Token {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseToken();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = (reader.int32() as any);
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
  toJSON(message: Token): unknown {
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