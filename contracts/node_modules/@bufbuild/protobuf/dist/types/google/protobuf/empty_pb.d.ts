import type { PartialMessage, PlainMessage } from "../../message.js";
import { Message } from "../../message.js";
import { proto3 } from "../../proto3.js";
import type { FieldList } from "../../field-list.js";
import type { BinaryReadOptions } from "../../binary-format.js";
import type { JsonReadOptions, JsonValue } from "../../json-format.js";
/**
 * A generic empty message that you can re-use to avoid defining duplicated
 * empty messages in your APIs. A typical example is to use it as the request
 * or the response type of an API method. For instance:
 *
 *     service Foo {
 *       rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty);
 *     }
 *
 *
 * @generated from message google.protobuf.Empty
 */
export declare class Empty extends Message<Empty> {
    constructor(data?: PartialMessage<Empty>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "google.protobuf.Empty";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Empty;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Empty;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Empty;
    static equals(a: Empty | PlainMessage<Empty> | undefined, b: Empty | PlainMessage<Empty> | undefined): boolean;
}
