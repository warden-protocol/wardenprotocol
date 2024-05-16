//@ts-nocheck
import { Token, TokenAmino, TokenSDKType } from "../token/token.js";
import { Long, isSet } from "../../helpers.js";
import _m0 from "protobufjs/minimal.js";
export interface Expression {
  identifier?: Identifier;
  integerLiteral?: IntegerLiteral;
  booleanLiteral?: BooleanLiteral;
  arrayLiteral?: ArrayLiteral;
  callExpression?: CallExpression;
  infixExpression?: InfixExpression;
}
export interface ExpressionProtoMsg {
  typeUrl: "/shield.ast.Expression";
  value: Uint8Array;
}
export interface ExpressionAmino {
  identifier?: IdentifierAmino;
  integer_literal?: IntegerLiteralAmino;
  boolean_literal?: BooleanLiteralAmino;
  array_literal?: ArrayLiteralAmino;
  call_expression?: CallExpressionAmino;
  infix_expression?: InfixExpressionAmino;
}
export interface ExpressionAminoMsg {
  type: "/shield.ast.Expression";
  value: ExpressionAmino;
}
export interface ExpressionSDKType {
  identifier?: IdentifierSDKType;
  integer_literal?: IntegerLiteralSDKType;
  boolean_literal?: BooleanLiteralSDKType;
  array_literal?: ArrayLiteralSDKType;
  call_expression?: CallExpressionSDKType;
  infix_expression?: InfixExpressionSDKType;
}
export interface Identifier {
  token: Token;
  value: string;
}
export interface IdentifierProtoMsg {
  typeUrl: "/shield.ast.Identifier";
  value: Uint8Array;
}
export interface IdentifierAmino {
  token?: TokenAmino;
  value?: string;
}
export interface IdentifierAminoMsg {
  type: "/shield.ast.Identifier";
  value: IdentifierAmino;
}
export interface IdentifierSDKType {
  token: TokenSDKType;
  value: string;
}
export interface IntegerLiteral {
  token: Token;
  value: Long;
}
export interface IntegerLiteralProtoMsg {
  typeUrl: "/shield.ast.IntegerLiteral";
  value: Uint8Array;
}
export interface IntegerLiteralAmino {
  token?: TokenAmino;
  value?: string;
}
export interface IntegerLiteralAminoMsg {
  type: "/shield.ast.IntegerLiteral";
  value: IntegerLiteralAmino;
}
export interface IntegerLiteralSDKType {
  token: TokenSDKType;
  value: Long;
}
export interface BooleanLiteral {
  token: Token;
  value: boolean;
}
export interface BooleanLiteralProtoMsg {
  typeUrl: "/shield.ast.BooleanLiteral";
  value: Uint8Array;
}
export interface BooleanLiteralAmino {
  token?: TokenAmino;
  value?: boolean;
}
export interface BooleanLiteralAminoMsg {
  type: "/shield.ast.BooleanLiteral";
  value: BooleanLiteralAmino;
}
export interface BooleanLiteralSDKType {
  token: TokenSDKType;
  value: boolean;
}
export interface ArrayLiteral {
  token: Token;
  elements: Expression[];
}
export interface ArrayLiteralProtoMsg {
  typeUrl: "/shield.ast.ArrayLiteral";
  value: Uint8Array;
}
export interface ArrayLiteralAmino {
  token?: TokenAmino;
  elements?: ExpressionAmino[];
}
export interface ArrayLiteralAminoMsg {
  type: "/shield.ast.ArrayLiteral";
  value: ArrayLiteralAmino;
}
export interface ArrayLiteralSDKType {
  token: TokenSDKType;
  elements: ExpressionSDKType[];
}
export interface CallExpression {
  token: Token;
  function?: Identifier;
  arguments: Expression[];
}
export interface CallExpressionProtoMsg {
  typeUrl: "/shield.ast.CallExpression";
  value: Uint8Array;
}
export interface CallExpressionAmino {
  token?: TokenAmino;
  function?: IdentifierAmino;
  arguments?: ExpressionAmino[];
}
export interface CallExpressionAminoMsg {
  type: "/shield.ast.CallExpression";
  value: CallExpressionAmino;
}
export interface CallExpressionSDKType {
  token: TokenSDKType;
  function?: IdentifierSDKType;
  arguments: ExpressionSDKType[];
}
export interface InfixExpression {
  token: Token;
  left?: Expression;
  operator: string;
  right?: Expression;
}
export interface InfixExpressionProtoMsg {
  typeUrl: "/shield.ast.InfixExpression";
  value: Uint8Array;
}
export interface InfixExpressionAmino {
  token?: TokenAmino;
  left?: ExpressionAmino;
  operator?: string;
  right?: ExpressionAmino;
}
export interface InfixExpressionAminoMsg {
  type: "/shield.ast.InfixExpression";
  value: InfixExpressionAmino;
}
export interface InfixExpressionSDKType {
  token: TokenSDKType;
  left?: ExpressionSDKType;
  operator: string;
  right?: ExpressionSDKType;
}
function createBaseExpression(): Expression {
  return {
    identifier: undefined,
    integerLiteral: undefined,
    booleanLiteral: undefined,
    arrayLiteral: undefined,
    callExpression: undefined,
    infixExpression: undefined
  };
}
export const Expression = {
  typeUrl: "/shield.ast.Expression",
  encode(message: Expression, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.identifier !== undefined) {
      Identifier.encode(message.identifier, writer.uint32(10).fork()).ldelim();
    }
    if (message.integerLiteral !== undefined) {
      IntegerLiteral.encode(message.integerLiteral, writer.uint32(18).fork()).ldelim();
    }
    if (message.booleanLiteral !== undefined) {
      BooleanLiteral.encode(message.booleanLiteral, writer.uint32(26).fork()).ldelim();
    }
    if (message.arrayLiteral !== undefined) {
      ArrayLiteral.encode(message.arrayLiteral, writer.uint32(34).fork()).ldelim();
    }
    if (message.callExpression !== undefined) {
      CallExpression.encode(message.callExpression, writer.uint32(42).fork()).ldelim();
    }
    if (message.infixExpression !== undefined) {
      InfixExpression.encode(message.infixExpression, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): Expression {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExpression();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.identifier = Identifier.decode(reader, reader.uint32());
          break;
        case 2:
          message.integerLiteral = IntegerLiteral.decode(reader, reader.uint32());
          break;
        case 3:
          message.booleanLiteral = BooleanLiteral.decode(reader, reader.uint32());
          break;
        case 4:
          message.arrayLiteral = ArrayLiteral.decode(reader, reader.uint32());
          break;
        case 5:
          message.callExpression = CallExpression.decode(reader, reader.uint32());
          break;
        case 6:
          message.infixExpression = InfixExpression.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Expression {
    return {
      identifier: isSet(object.identifier) ? Identifier.fromJSON(object.identifier) : undefined,
      integerLiteral: isSet(object.integerLiteral) ? IntegerLiteral.fromJSON(object.integerLiteral) : undefined,
      booleanLiteral: isSet(object.booleanLiteral) ? BooleanLiteral.fromJSON(object.booleanLiteral) : undefined,
      arrayLiteral: isSet(object.arrayLiteral) ? ArrayLiteral.fromJSON(object.arrayLiteral) : undefined,
      callExpression: isSet(object.callExpression) ? CallExpression.fromJSON(object.callExpression) : undefined,
      infixExpression: isSet(object.infixExpression) ? InfixExpression.fromJSON(object.infixExpression) : undefined
    };
  },
  toJSON(message: Expression): unknown {
    const obj: any = {};
    message.identifier !== undefined && (obj.identifier = message.identifier ? Identifier.toJSON(message.identifier) : undefined);
    message.integerLiteral !== undefined && (obj.integerLiteral = message.integerLiteral ? IntegerLiteral.toJSON(message.integerLiteral) : undefined);
    message.booleanLiteral !== undefined && (obj.booleanLiteral = message.booleanLiteral ? BooleanLiteral.toJSON(message.booleanLiteral) : undefined);
    message.arrayLiteral !== undefined && (obj.arrayLiteral = message.arrayLiteral ? ArrayLiteral.toJSON(message.arrayLiteral) : undefined);
    message.callExpression !== undefined && (obj.callExpression = message.callExpression ? CallExpression.toJSON(message.callExpression) : undefined);
    message.infixExpression !== undefined && (obj.infixExpression = message.infixExpression ? InfixExpression.toJSON(message.infixExpression) : undefined);
    return obj;
  },
  fromPartial(object: Partial<Expression>): Expression {
    const message = createBaseExpression();
    message.identifier = object.identifier !== undefined && object.identifier !== null ? Identifier.fromPartial(object.identifier) : undefined;
    message.integerLiteral = object.integerLiteral !== undefined && object.integerLiteral !== null ? IntegerLiteral.fromPartial(object.integerLiteral) : undefined;
    message.booleanLiteral = object.booleanLiteral !== undefined && object.booleanLiteral !== null ? BooleanLiteral.fromPartial(object.booleanLiteral) : undefined;
    message.arrayLiteral = object.arrayLiteral !== undefined && object.arrayLiteral !== null ? ArrayLiteral.fromPartial(object.arrayLiteral) : undefined;
    message.callExpression = object.callExpression !== undefined && object.callExpression !== null ? CallExpression.fromPartial(object.callExpression) : undefined;
    message.infixExpression = object.infixExpression !== undefined && object.infixExpression !== null ? InfixExpression.fromPartial(object.infixExpression) : undefined;
    return message;
  },
  fromAmino(object: ExpressionAmino): Expression {
    const message = createBaseExpression();
    if (object.identifier !== undefined && object.identifier !== null) {
      message.identifier = Identifier.fromAmino(object.identifier);
    }
    if (object.integer_literal !== undefined && object.integer_literal !== null) {
      message.integerLiteral = IntegerLiteral.fromAmino(object.integer_literal);
    }
    if (object.boolean_literal !== undefined && object.boolean_literal !== null) {
      message.booleanLiteral = BooleanLiteral.fromAmino(object.boolean_literal);
    }
    if (object.array_literal !== undefined && object.array_literal !== null) {
      message.arrayLiteral = ArrayLiteral.fromAmino(object.array_literal);
    }
    if (object.call_expression !== undefined && object.call_expression !== null) {
      message.callExpression = CallExpression.fromAmino(object.call_expression);
    }
    if (object.infix_expression !== undefined && object.infix_expression !== null) {
      message.infixExpression = InfixExpression.fromAmino(object.infix_expression);
    }
    return message;
  },
  toAmino(message: Expression): ExpressionAmino {
    const obj: any = {};
    obj.identifier = message.identifier ? Identifier.toAmino(message.identifier) : undefined;
    obj.integer_literal = message.integerLiteral ? IntegerLiteral.toAmino(message.integerLiteral) : undefined;
    obj.boolean_literal = message.booleanLiteral ? BooleanLiteral.toAmino(message.booleanLiteral) : undefined;
    obj.array_literal = message.arrayLiteral ? ArrayLiteral.toAmino(message.arrayLiteral) : undefined;
    obj.call_expression = message.callExpression ? CallExpression.toAmino(message.callExpression) : undefined;
    obj.infix_expression = message.infixExpression ? InfixExpression.toAmino(message.infixExpression) : undefined;
    return obj;
  },
  fromAminoMsg(object: ExpressionAminoMsg): Expression {
    return Expression.fromAmino(object.value);
  },
  fromProtoMsg(message: ExpressionProtoMsg): Expression {
    return Expression.decode(message.value);
  },
  toProto(message: Expression): Uint8Array {
    return Expression.encode(message).finish();
  },
  toProtoMsg(message: Expression): ExpressionProtoMsg {
    return {
      typeUrl: "/shield.ast.Expression",
      value: Expression.encode(message).finish()
    };
  }
};
function createBaseIdentifier(): Identifier {
  return {
    token: Token.fromPartial({}),
    value: ""
  };
}
export const Identifier = {
  typeUrl: "/shield.ast.Identifier",
  encode(message: Identifier, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== undefined) {
      Token.encode(message.token, writer.uint32(10).fork()).ldelim();
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): Identifier {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIdentifier();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = Token.decode(reader, reader.uint32());
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Identifier {
    return {
      token: isSet(object.token) ? Token.fromJSON(object.token) : undefined,
      value: isSet(object.value) ? String(object.value) : ""
    };
  },
  toJSON(message: Identifier): unknown {
    const obj: any = {};
    message.token !== undefined && (obj.token = message.token ? Token.toJSON(message.token) : undefined);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },
  fromPartial(object: Partial<Identifier>): Identifier {
    const message = createBaseIdentifier();
    message.token = object.token !== undefined && object.token !== null ? Token.fromPartial(object.token) : undefined;
    message.value = object.value ?? "";
    return message;
  },
  fromAmino(object: IdentifierAmino): Identifier {
    const message = createBaseIdentifier();
    if (object.token !== undefined && object.token !== null) {
      message.token = Token.fromAmino(object.token);
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
  toAmino(message: Identifier): IdentifierAmino {
    const obj: any = {};
    obj.token = message.token ? Token.toAmino(message.token) : undefined;
    obj.value = message.value === "" ? undefined : message.value;
    return obj;
  },
  fromAminoMsg(object: IdentifierAminoMsg): Identifier {
    return Identifier.fromAmino(object.value);
  },
  fromProtoMsg(message: IdentifierProtoMsg): Identifier {
    return Identifier.decode(message.value);
  },
  toProto(message: Identifier): Uint8Array {
    return Identifier.encode(message).finish();
  },
  toProtoMsg(message: Identifier): IdentifierProtoMsg {
    return {
      typeUrl: "/shield.ast.Identifier",
      value: Identifier.encode(message).finish()
    };
  }
};
function createBaseIntegerLiteral(): IntegerLiteral {
  return {
    token: Token.fromPartial({}),
    value: Long.ZERO
  };
}
export const IntegerLiteral = {
  typeUrl: "/shield.ast.IntegerLiteral",
  encode(message: IntegerLiteral, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== undefined) {
      Token.encode(message.token, writer.uint32(10).fork()).ldelim();
    }
    if (!message.value.isZero()) {
      writer.uint32(16).int64(message.value);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): IntegerLiteral {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIntegerLiteral();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = Token.decode(reader, reader.uint32());
          break;
        case 2:
          message.value = (reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): IntegerLiteral {
    return {
      token: isSet(object.token) ? Token.fromJSON(object.token) : undefined,
      value: isSet(object.value) ? Long.fromValue(object.value) : Long.ZERO
    };
  },
  toJSON(message: IntegerLiteral): unknown {
    const obj: any = {};
    message.token !== undefined && (obj.token = message.token ? Token.toJSON(message.token) : undefined);
    message.value !== undefined && (obj.value = (message.value || Long.ZERO).toString());
    return obj;
  },
  fromPartial(object: Partial<IntegerLiteral>): IntegerLiteral {
    const message = createBaseIntegerLiteral();
    message.token = object.token !== undefined && object.token !== null ? Token.fromPartial(object.token) : undefined;
    message.value = object.value !== undefined && object.value !== null ? Long.fromValue(object.value) : Long.ZERO;
    return message;
  },
  fromAmino(object: IntegerLiteralAmino): IntegerLiteral {
    const message = createBaseIntegerLiteral();
    if (object.token !== undefined && object.token !== null) {
      message.token = Token.fromAmino(object.token);
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Long.fromString(object.value);
    }
    return message;
  },
  toAmino(message: IntegerLiteral): IntegerLiteralAmino {
    const obj: any = {};
    obj.token = message.token ? Token.toAmino(message.token) : undefined;
    obj.value = !message.value.isZero() ? message.value.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: IntegerLiteralAminoMsg): IntegerLiteral {
    return IntegerLiteral.fromAmino(object.value);
  },
  fromProtoMsg(message: IntegerLiteralProtoMsg): IntegerLiteral {
    return IntegerLiteral.decode(message.value);
  },
  toProto(message: IntegerLiteral): Uint8Array {
    return IntegerLiteral.encode(message).finish();
  },
  toProtoMsg(message: IntegerLiteral): IntegerLiteralProtoMsg {
    return {
      typeUrl: "/shield.ast.IntegerLiteral",
      value: IntegerLiteral.encode(message).finish()
    };
  }
};
function createBaseBooleanLiteral(): BooleanLiteral {
  return {
    token: Token.fromPartial({}),
    value: false
  };
}
export const BooleanLiteral = {
  typeUrl: "/shield.ast.BooleanLiteral",
  encode(message: BooleanLiteral, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== undefined) {
      Token.encode(message.token, writer.uint32(10).fork()).ldelim();
    }
    if (message.value === true) {
      writer.uint32(16).bool(message.value);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): BooleanLiteral {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBooleanLiteral();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = Token.decode(reader, reader.uint32());
          break;
        case 2:
          message.value = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): BooleanLiteral {
    return {
      token: isSet(object.token) ? Token.fromJSON(object.token) : undefined,
      value: isSet(object.value) ? Boolean(object.value) : false
    };
  },
  toJSON(message: BooleanLiteral): unknown {
    const obj: any = {};
    message.token !== undefined && (obj.token = message.token ? Token.toJSON(message.token) : undefined);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },
  fromPartial(object: Partial<BooleanLiteral>): BooleanLiteral {
    const message = createBaseBooleanLiteral();
    message.token = object.token !== undefined && object.token !== null ? Token.fromPartial(object.token) : undefined;
    message.value = object.value ?? false;
    return message;
  },
  fromAmino(object: BooleanLiteralAmino): BooleanLiteral {
    const message = createBaseBooleanLiteral();
    if (object.token !== undefined && object.token !== null) {
      message.token = Token.fromAmino(object.token);
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
  toAmino(message: BooleanLiteral): BooleanLiteralAmino {
    const obj: any = {};
    obj.token = message.token ? Token.toAmino(message.token) : undefined;
    obj.value = message.value === false ? undefined : message.value;
    return obj;
  },
  fromAminoMsg(object: BooleanLiteralAminoMsg): BooleanLiteral {
    return BooleanLiteral.fromAmino(object.value);
  },
  fromProtoMsg(message: BooleanLiteralProtoMsg): BooleanLiteral {
    return BooleanLiteral.decode(message.value);
  },
  toProto(message: BooleanLiteral): Uint8Array {
    return BooleanLiteral.encode(message).finish();
  },
  toProtoMsg(message: BooleanLiteral): BooleanLiteralProtoMsg {
    return {
      typeUrl: "/shield.ast.BooleanLiteral",
      value: BooleanLiteral.encode(message).finish()
    };
  }
};
function createBaseArrayLiteral(): ArrayLiteral {
  return {
    token: Token.fromPartial({}),
    elements: []
  };
}
export const ArrayLiteral = {
  typeUrl: "/shield.ast.ArrayLiteral",
  encode(message: ArrayLiteral, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== undefined) {
      Token.encode(message.token, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.elements) {
      Expression.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): ArrayLiteral {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArrayLiteral();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = Token.decode(reader, reader.uint32());
          break;
        case 2:
          message.elements.push(Expression.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ArrayLiteral {
    return {
      token: isSet(object.token) ? Token.fromJSON(object.token) : undefined,
      elements: Array.isArray(object?.elements) ? object.elements.map((e: any) => Expression.fromJSON(e)) : []
    };
  },
  toJSON(message: ArrayLiteral): unknown {
    const obj: any = {};
    message.token !== undefined && (obj.token = message.token ? Token.toJSON(message.token) : undefined);
    if (message.elements) {
      obj.elements = message.elements.map(e => e ? Expression.toJSON(e) : undefined);
    } else {
      obj.elements = [];
    }
    return obj;
  },
  fromPartial(object: Partial<ArrayLiteral>): ArrayLiteral {
    const message = createBaseArrayLiteral();
    message.token = object.token !== undefined && object.token !== null ? Token.fromPartial(object.token) : undefined;
    message.elements = object.elements?.map(e => Expression.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: ArrayLiteralAmino): ArrayLiteral {
    const message = createBaseArrayLiteral();
    if (object.token !== undefined && object.token !== null) {
      message.token = Token.fromAmino(object.token);
    }
    message.elements = object.elements?.map(e => Expression.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: ArrayLiteral): ArrayLiteralAmino {
    const obj: any = {};
    obj.token = message.token ? Token.toAmino(message.token) : undefined;
    if (message.elements) {
      obj.elements = message.elements.map(e => e ? Expression.toAmino(e) : undefined);
    } else {
      obj.elements = message.elements;
    }
    return obj;
  },
  fromAminoMsg(object: ArrayLiteralAminoMsg): ArrayLiteral {
    return ArrayLiteral.fromAmino(object.value);
  },
  fromProtoMsg(message: ArrayLiteralProtoMsg): ArrayLiteral {
    return ArrayLiteral.decode(message.value);
  },
  toProto(message: ArrayLiteral): Uint8Array {
    return ArrayLiteral.encode(message).finish();
  },
  toProtoMsg(message: ArrayLiteral): ArrayLiteralProtoMsg {
    return {
      typeUrl: "/shield.ast.ArrayLiteral",
      value: ArrayLiteral.encode(message).finish()
    };
  }
};
function createBaseCallExpression(): CallExpression {
  return {
    token: Token.fromPartial({}),
    function: undefined,
    arguments: []
  };
}
export const CallExpression = {
  typeUrl: "/shield.ast.CallExpression",
  encode(message: CallExpression, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== undefined) {
      Token.encode(message.token, writer.uint32(10).fork()).ldelim();
    }
    if (message.function !== undefined) {
      Identifier.encode(message.function, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.arguments) {
      Expression.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): CallExpression {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCallExpression();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = Token.decode(reader, reader.uint32());
          break;
        case 2:
          message.function = Identifier.decode(reader, reader.uint32());
          break;
        case 3:
          message.arguments.push(Expression.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CallExpression {
    return {
      token: isSet(object.token) ? Token.fromJSON(object.token) : undefined,
      function: isSet(object.function) ? Identifier.fromJSON(object.function) : undefined,
      arguments: Array.isArray(object?.arguments) ? object.arguments.map((e: any) => Expression.fromJSON(e)) : []
    };
  },
  toJSON(message: CallExpression): unknown {
    const obj: any = {};
    message.token !== undefined && (obj.token = message.token ? Token.toJSON(message.token) : undefined);
    message.function !== undefined && (obj.function = message.function ? Identifier.toJSON(message.function) : undefined);
    if (message.arguments) {
      obj.arguments = message.arguments.map(e => e ? Expression.toJSON(e) : undefined);
    } else {
      obj.arguments = [];
    }
    return obj;
  },
  fromPartial(object: Partial<CallExpression>): CallExpression {
    const message = createBaseCallExpression();
    message.token = object.token !== undefined && object.token !== null ? Token.fromPartial(object.token) : undefined;
    message.function = object.function !== undefined && object.function !== null ? Identifier.fromPartial(object.function) : undefined;
    message.arguments = object.arguments?.map(e => Expression.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: CallExpressionAmino): CallExpression {
    const message = createBaseCallExpression();
    if (object.token !== undefined && object.token !== null) {
      message.token = Token.fromAmino(object.token);
    }
    if (object.function !== undefined && object.function !== null) {
      message.function = Identifier.fromAmino(object.function);
    }
    message.arguments = object.arguments?.map(e => Expression.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: CallExpression): CallExpressionAmino {
    const obj: any = {};
    obj.token = message.token ? Token.toAmino(message.token) : undefined;
    obj.function = message.function ? Identifier.toAmino(message.function) : undefined;
    if (message.arguments) {
      obj.arguments = message.arguments.map(e => e ? Expression.toAmino(e) : undefined);
    } else {
      obj.arguments = message.arguments;
    }
    return obj;
  },
  fromAminoMsg(object: CallExpressionAminoMsg): CallExpression {
    return CallExpression.fromAmino(object.value);
  },
  fromProtoMsg(message: CallExpressionProtoMsg): CallExpression {
    return CallExpression.decode(message.value);
  },
  toProto(message: CallExpression): Uint8Array {
    return CallExpression.encode(message).finish();
  },
  toProtoMsg(message: CallExpression): CallExpressionProtoMsg {
    return {
      typeUrl: "/shield.ast.CallExpression",
      value: CallExpression.encode(message).finish()
    };
  }
};
function createBaseInfixExpression(): InfixExpression {
  return {
    token: Token.fromPartial({}),
    left: undefined,
    operator: "",
    right: undefined
  };
}
export const InfixExpression = {
  typeUrl: "/shield.ast.InfixExpression",
  encode(message: InfixExpression, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== undefined) {
      Token.encode(message.token, writer.uint32(10).fork()).ldelim();
    }
    if (message.left !== undefined) {
      Expression.encode(message.left, writer.uint32(18).fork()).ldelim();
    }
    if (message.operator !== "") {
      writer.uint32(26).string(message.operator);
    }
    if (message.right !== undefined) {
      Expression.encode(message.right, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): InfixExpression {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInfixExpression();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = Token.decode(reader, reader.uint32());
          break;
        case 2:
          message.left = Expression.decode(reader, reader.uint32());
          break;
        case 3:
          message.operator = reader.string();
          break;
        case 4:
          message.right = Expression.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): InfixExpression {
    return {
      token: isSet(object.token) ? Token.fromJSON(object.token) : undefined,
      left: isSet(object.left) ? Expression.fromJSON(object.left) : undefined,
      operator: isSet(object.operator) ? String(object.operator) : "",
      right: isSet(object.right) ? Expression.fromJSON(object.right) : undefined
    };
  },
  toJSON(message: InfixExpression): unknown {
    const obj: any = {};
    message.token !== undefined && (obj.token = message.token ? Token.toJSON(message.token) : undefined);
    message.left !== undefined && (obj.left = message.left ? Expression.toJSON(message.left) : undefined);
    message.operator !== undefined && (obj.operator = message.operator);
    message.right !== undefined && (obj.right = message.right ? Expression.toJSON(message.right) : undefined);
    return obj;
  },
  fromPartial(object: Partial<InfixExpression>): InfixExpression {
    const message = createBaseInfixExpression();
    message.token = object.token !== undefined && object.token !== null ? Token.fromPartial(object.token) : undefined;
    message.left = object.left !== undefined && object.left !== null ? Expression.fromPartial(object.left) : undefined;
    message.operator = object.operator ?? "";
    message.right = object.right !== undefined && object.right !== null ? Expression.fromPartial(object.right) : undefined;
    return message;
  },
  fromAmino(object: InfixExpressionAmino): InfixExpression {
    const message = createBaseInfixExpression();
    if (object.token !== undefined && object.token !== null) {
      message.token = Token.fromAmino(object.token);
    }
    if (object.left !== undefined && object.left !== null) {
      message.left = Expression.fromAmino(object.left);
    }
    if (object.operator !== undefined && object.operator !== null) {
      message.operator = object.operator;
    }
    if (object.right !== undefined && object.right !== null) {
      message.right = Expression.fromAmino(object.right);
    }
    return message;
  },
  toAmino(message: InfixExpression): InfixExpressionAmino {
    const obj: any = {};
    obj.token = message.token ? Token.toAmino(message.token) : undefined;
    obj.left = message.left ? Expression.toAmino(message.left) : undefined;
    obj.operator = message.operator === "" ? undefined : message.operator;
    obj.right = message.right ? Expression.toAmino(message.right) : undefined;
    return obj;
  },
  fromAminoMsg(object: InfixExpressionAminoMsg): InfixExpression {
    return InfixExpression.fromAmino(object.value);
  },
  fromProtoMsg(message: InfixExpressionProtoMsg): InfixExpression {
    return InfixExpression.decode(message.value);
  },
  toProto(message: InfixExpression): Uint8Array {
    return InfixExpression.encode(message).finish();
  },
  toProtoMsg(message: InfixExpression): InfixExpressionProtoMsg {
    return {
      typeUrl: "/shield.ast.InfixExpression",
      value: InfixExpression.encode(message).finish()
    };
  }
};