//@ts-nocheck
import _m0 from "protobufjs/minimal.js";
/**
 * A generic empty message that you can re-use to avoid defining duplicated
 * empty messages in your APIs. A typical example is to use it as the request
 * or the response type of an API method. For instance:
 * 
 *     service Foo {
 *       rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty);
 *     }
 * 
 * The JSON representation for `Empty` is empty JSON object `{}`.
 */
export interface Empty {}
export interface EmptyProtoMsg {
  typeUrl: "/google.protobuf.Empty";
  value: Uint8Array;
}
/**
 * A generic empty message that you can re-use to avoid defining duplicated
 * empty messages in your APIs. A typical example is to use it as the request
 * or the response type of an API method. For instance:
 * 
 *     service Foo {
 *       rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty);
 *     }
 * 
 * The JSON representation for `Empty` is empty JSON object `{}`.
 */
export interface EmptyAmino {}
export interface EmptyAminoMsg {
  type: "/google.protobuf.Empty";
  value: EmptyAmino;
}
/**
 * A generic empty message that you can re-use to avoid defining duplicated
 * empty messages in your APIs. A typical example is to use it as the request
 * or the response type of an API method. For instance:
 * 
 *     service Foo {
 *       rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty);
 *     }
 * 
 * The JSON representation for `Empty` is empty JSON object `{}`.
 */
export interface EmptySDKType {}
function createBaseEmpty(): Empty {
  return {};
}
export const Empty = {
  typeUrl: "/google.protobuf.Empty",
  encode(_: Empty, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): Empty {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmpty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): Empty {
    return {};
  },
  toJSON(_: Empty): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<Empty>): Empty {
    const message = createBaseEmpty();
    return message;
  },
  fromAmino(_: EmptyAmino): Empty {
    const message = createBaseEmpty();
    return message;
  },
  toAmino(_: Empty): EmptyAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: EmptyAminoMsg): Empty {
    return Empty.fromAmino(object.value);
  },
  fromProtoMsg(message: EmptyProtoMsg): Empty {
    return Empty.decode(message.value);
  },
  toProto(message: Empty): Uint8Array {
    return Empty.encode(message).finish();
  },
  toProtoMsg(message: Empty): EmptyProtoMsg {
    return {
      typeUrl: "/google.protobuf.Empty",
      value: Empty.encode(message).finish()
    };
  }
};