/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "shield.token";

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

function createBaseToken(): Token {
  return { type: 0, literal: "" };
}

export const Token = {
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseToken();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.literal = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Token {
    return {
      type: isSet(object.type) ? typeFromJSON(object.type) : 0,
      literal: isSet(object.literal) ? String(object.literal) : "",
    };
  },

  toJSON(message: Token): unknown {
    const obj: any = {};
    if (message.type !== 0) {
      obj.type = typeToJSON(message.type);
    }
    if (message.literal !== "") {
      obj.literal = message.literal;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Token>, I>>(base?: I): Token {
    return Token.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Token>, I>>(object: I): Token {
    const message = createBaseToken();
    message.type = object.type ?? 0;
    message.literal = object.literal ?? "";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
