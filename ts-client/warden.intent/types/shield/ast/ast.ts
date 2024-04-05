/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Token } from "../token/token";

export const protobufPackage = "shield.ast";

export interface Expression {
  identifier?: Identifier | undefined;
  integerLiteral?: IntegerLiteral | undefined;
  booleanLiteral?: BooleanLiteral | undefined;
  arrayLiteral?: ArrayLiteral | undefined;
  callExpression?: CallExpression | undefined;
  infixExpression?: InfixExpression | undefined;
}

export interface Identifier {
  token: Token | undefined;
  value: string;
}

export interface IntegerLiteral {
  token: Token | undefined;
  value: number;
}

export interface BooleanLiteral {
  token: Token | undefined;
  value: boolean;
}

export interface ArrayLiteral {
  token: Token | undefined;
  elements: Expression[];
}

export interface CallExpression {
  token: Token | undefined;
  function: Identifier | undefined;
  arguments: Expression[];
}

export interface InfixExpression {
  token: Token | undefined;
  left: Expression | undefined;
  operator: string;
  right: Expression | undefined;
}

function createBaseExpression(): Expression {
  return {
    identifier: undefined,
    integerLiteral: undefined,
    booleanLiteral: undefined,
    arrayLiteral: undefined,
    callExpression: undefined,
    infixExpression: undefined,
  };
}

export const Expression = {
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExpression();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.identifier = Identifier.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.integerLiteral = IntegerLiteral.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.booleanLiteral = BooleanLiteral.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.arrayLiteral = ArrayLiteral.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.callExpression = CallExpression.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.infixExpression = InfixExpression.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
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
      infixExpression: isSet(object.infixExpression) ? InfixExpression.fromJSON(object.infixExpression) : undefined,
    };
  },

  toJSON(message: Expression): unknown {
    const obj: any = {};
    if (message.identifier !== undefined) {
      obj.identifier = Identifier.toJSON(message.identifier);
    }
    if (message.integerLiteral !== undefined) {
      obj.integerLiteral = IntegerLiteral.toJSON(message.integerLiteral);
    }
    if (message.booleanLiteral !== undefined) {
      obj.booleanLiteral = BooleanLiteral.toJSON(message.booleanLiteral);
    }
    if (message.arrayLiteral !== undefined) {
      obj.arrayLiteral = ArrayLiteral.toJSON(message.arrayLiteral);
    }
    if (message.callExpression !== undefined) {
      obj.callExpression = CallExpression.toJSON(message.callExpression);
    }
    if (message.infixExpression !== undefined) {
      obj.infixExpression = InfixExpression.toJSON(message.infixExpression);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Expression>, I>>(base?: I): Expression {
    return Expression.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Expression>, I>>(object: I): Expression {
    const message = createBaseExpression();
    message.identifier = (object.identifier !== undefined && object.identifier !== null)
      ? Identifier.fromPartial(object.identifier)
      : undefined;
    message.integerLiteral = (object.integerLiteral !== undefined && object.integerLiteral !== null)
      ? IntegerLiteral.fromPartial(object.integerLiteral)
      : undefined;
    message.booleanLiteral = (object.booleanLiteral !== undefined && object.booleanLiteral !== null)
      ? BooleanLiteral.fromPartial(object.booleanLiteral)
      : undefined;
    message.arrayLiteral = (object.arrayLiteral !== undefined && object.arrayLiteral !== null)
      ? ArrayLiteral.fromPartial(object.arrayLiteral)
      : undefined;
    message.callExpression = (object.callExpression !== undefined && object.callExpression !== null)
      ? CallExpression.fromPartial(object.callExpression)
      : undefined;
    message.infixExpression = (object.infixExpression !== undefined && object.infixExpression !== null)
      ? InfixExpression.fromPartial(object.infixExpression)
      : undefined;
    return message;
  },
};

function createBaseIdentifier(): Identifier {
  return { token: undefined, value: "" };
}

export const Identifier = {
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIdentifier();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.token = Token.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Identifier {
    return {
      token: isSet(object.token) ? Token.fromJSON(object.token) : undefined,
      value: isSet(object.value) ? String(object.value) : "",
    };
  },

  toJSON(message: Identifier): unknown {
    const obj: any = {};
    if (message.token !== undefined) {
      obj.token = Token.toJSON(message.token);
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Identifier>, I>>(base?: I): Identifier {
    return Identifier.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Identifier>, I>>(object: I): Identifier {
    const message = createBaseIdentifier();
    message.token = (object.token !== undefined && object.token !== null) ? Token.fromPartial(object.token) : undefined;
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseIntegerLiteral(): IntegerLiteral {
  return { token: undefined, value: 0 };
}

export const IntegerLiteral = {
  encode(message: IntegerLiteral, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== undefined) {
      Token.encode(message.token, writer.uint32(10).fork()).ldelim();
    }
    if (message.value !== 0) {
      writer.uint32(16).int64(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IntegerLiteral {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIntegerLiteral();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.token = Token.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.value = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IntegerLiteral {
    return {
      token: isSet(object.token) ? Token.fromJSON(object.token) : undefined,
      value: isSet(object.value) ? Number(object.value) : 0,
    };
  },

  toJSON(message: IntegerLiteral): unknown {
    const obj: any = {};
    if (message.token !== undefined) {
      obj.token = Token.toJSON(message.token);
    }
    if (message.value !== 0) {
      obj.value = Math.round(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IntegerLiteral>, I>>(base?: I): IntegerLiteral {
    return IntegerLiteral.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IntegerLiteral>, I>>(object: I): IntegerLiteral {
    const message = createBaseIntegerLiteral();
    message.token = (object.token !== undefined && object.token !== null) ? Token.fromPartial(object.token) : undefined;
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseBooleanLiteral(): BooleanLiteral {
  return { token: undefined, value: false };
}

export const BooleanLiteral = {
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBooleanLiteral();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.token = Token.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.value = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BooleanLiteral {
    return {
      token: isSet(object.token) ? Token.fromJSON(object.token) : undefined,
      value: isSet(object.value) ? Boolean(object.value) : false,
    };
  },

  toJSON(message: BooleanLiteral): unknown {
    const obj: any = {};
    if (message.token !== undefined) {
      obj.token = Token.toJSON(message.token);
    }
    if (message.value === true) {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BooleanLiteral>, I>>(base?: I): BooleanLiteral {
    return BooleanLiteral.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BooleanLiteral>, I>>(object: I): BooleanLiteral {
    const message = createBaseBooleanLiteral();
    message.token = (object.token !== undefined && object.token !== null) ? Token.fromPartial(object.token) : undefined;
    message.value = object.value ?? false;
    return message;
  },
};

function createBaseArrayLiteral(): ArrayLiteral {
  return { token: undefined, elements: [] };
}

export const ArrayLiteral = {
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArrayLiteral();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.token = Token.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.elements.push(Expression.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ArrayLiteral {
    return {
      token: isSet(object.token) ? Token.fromJSON(object.token) : undefined,
      elements: Array.isArray(object?.elements) ? object.elements.map((e: any) => Expression.fromJSON(e)) : [],
    };
  },

  toJSON(message: ArrayLiteral): unknown {
    const obj: any = {};
    if (message.token !== undefined) {
      obj.token = Token.toJSON(message.token);
    }
    if (message.elements?.length) {
      obj.elements = message.elements.map((e) => Expression.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ArrayLiteral>, I>>(base?: I): ArrayLiteral {
    return ArrayLiteral.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ArrayLiteral>, I>>(object: I): ArrayLiteral {
    const message = createBaseArrayLiteral();
    message.token = (object.token !== undefined && object.token !== null) ? Token.fromPartial(object.token) : undefined;
    message.elements = object.elements?.map((e) => Expression.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCallExpression(): CallExpression {
  return { token: undefined, function: undefined, arguments: [] };
}

export const CallExpression = {
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCallExpression();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.token = Token.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.function = Identifier.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.arguments.push(Expression.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CallExpression {
    return {
      token: isSet(object.token) ? Token.fromJSON(object.token) : undefined,
      function: isSet(object.function) ? Identifier.fromJSON(object.function) : undefined,
      arguments: Array.isArray(object?.arguments) ? object.arguments.map((e: any) => Expression.fromJSON(e)) : [],
    };
  },

  toJSON(message: CallExpression): unknown {
    const obj: any = {};
    if (message.token !== undefined) {
      obj.token = Token.toJSON(message.token);
    }
    if (message.function !== undefined) {
      obj.function = Identifier.toJSON(message.function);
    }
    if (message.arguments?.length) {
      obj.arguments = message.arguments.map((e) => Expression.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CallExpression>, I>>(base?: I): CallExpression {
    return CallExpression.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CallExpression>, I>>(object: I): CallExpression {
    const message = createBaseCallExpression();
    message.token = (object.token !== undefined && object.token !== null) ? Token.fromPartial(object.token) : undefined;
    message.function = (object.function !== undefined && object.function !== null)
      ? Identifier.fromPartial(object.function)
      : undefined;
    message.arguments = object.arguments?.map((e) => Expression.fromPartial(e)) || [];
    return message;
  },
};

function createBaseInfixExpression(): InfixExpression {
  return { token: undefined, left: undefined, operator: "", right: undefined };
}

export const InfixExpression = {
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInfixExpression();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.token = Token.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.left = Expression.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.operator = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.right = Expression.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InfixExpression {
    return {
      token: isSet(object.token) ? Token.fromJSON(object.token) : undefined,
      left: isSet(object.left) ? Expression.fromJSON(object.left) : undefined,
      operator: isSet(object.operator) ? String(object.operator) : "",
      right: isSet(object.right) ? Expression.fromJSON(object.right) : undefined,
    };
  },

  toJSON(message: InfixExpression): unknown {
    const obj: any = {};
    if (message.token !== undefined) {
      obj.token = Token.toJSON(message.token);
    }
    if (message.left !== undefined) {
      obj.left = Expression.toJSON(message.left);
    }
    if (message.operator !== "") {
      obj.operator = message.operator;
    }
    if (message.right !== undefined) {
      obj.right = Expression.toJSON(message.right);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<InfixExpression>, I>>(base?: I): InfixExpression {
    return InfixExpression.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<InfixExpression>, I>>(object: I): InfixExpression {
    const message = createBaseInfixExpression();
    message.token = (object.token !== undefined && object.token !== null) ? Token.fromPartial(object.token) : undefined;
    message.left = (object.left !== undefined && object.left !== null)
      ? Expression.fromPartial(object.left)
      : undefined;
    message.operator = object.operator ?? "";
    message.right = (object.right !== undefined && object.right !== null)
      ? Expression.fromPartial(object.right)
      : undefined;
    return message;
  },
};

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
