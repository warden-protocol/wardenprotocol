import { proto3 } from "../../proto3.js";
import type { PartialMessage, PlainMessage } from "../../message.js";
import { Message } from "../../message.js";
import type { JsonReadOptions, JsonValue, JsonWriteOptions } from "../../json-format.js";
import type { FieldList } from "../../field-list.js";
import type { BinaryReadOptions } from "../../binary-format.js";
/**
 * `NullValue` is a singleton enumeration to represent the null value for the
 * `Value` type union.
 *
 * The JSON representation for `NullValue` is JSON `null`.
 *
 * @generated from enum google.protobuf.NullValue
 */
export declare enum NullValue {
    /**
     * Null value.
     *
     * @generated from enum value: NULL_VALUE = 0;
     */
    NULL_VALUE = 0
}
/**
 * `Struct` represents a structured data value, consisting of fields
 * which map to dynamically typed values. In some languages, `Struct`
 * might be supported by a native representation. For example, in
 * scripting languages like JS a struct is represented as an
 * object. The details of that representation are described together
 * with the proto support for the language.
 *
 * The JSON representation for `Struct` is JSON object.
 *
 * @generated from message google.protobuf.Struct
 */
export declare class Struct extends Message<Struct> {
    /**
     * Unordered map of dynamically typed values.
     *
     * @generated from field: map<string, google.protobuf.Value> fields = 1;
     */
    fields: {
        [key: string]: Value;
    };
    constructor(data?: PartialMessage<Struct>);
    toJson(options?: Partial<JsonWriteOptions>): JsonValue;
    fromJson(json: JsonValue, options?: Partial<JsonReadOptions>): this;
    static readonly runtime: typeof proto3;
    static readonly typeName = "google.protobuf.Struct";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Struct;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Struct;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Struct;
    static equals(a: Struct | PlainMessage<Struct> | undefined, b: Struct | PlainMessage<Struct> | undefined): boolean;
}
/**
 * `Value` represents a dynamically typed value which can be either
 * null, a number, a string, a boolean, a recursive struct value, or a
 * list of values. A producer of value is expected to set one of these
 * variants. Absence of any variant indicates an error.
 *
 * The JSON representation for `Value` is JSON value.
 *
 * @generated from message google.protobuf.Value
 */
export declare class Value extends Message<Value> {
    /**
     * The kind of value.
     *
     * @generated from oneof google.protobuf.Value.kind
     */
    kind: {
        /**
         * Represents a null value.
         *
         * @generated from field: google.protobuf.NullValue null_value = 1;
         */
        value: NullValue;
        case: "nullValue";
    } | {
        /**
         * Represents a double value.
         *
         * @generated from field: double number_value = 2;
         */
        value: number;
        case: "numberValue";
    } | {
        /**
         * Represents a string value.
         *
         * @generated from field: string string_value = 3;
         */
        value: string;
        case: "stringValue";
    } | {
        /**
         * Represents a boolean value.
         *
         * @generated from field: bool bool_value = 4;
         */
        value: boolean;
        case: "boolValue";
    } | {
        /**
         * Represents a structured value.
         *
         * @generated from field: google.protobuf.Struct struct_value = 5;
         */
        value: Struct;
        case: "structValue";
    } | {
        /**
         * Represents a repeated `Value`.
         *
         * @generated from field: google.protobuf.ListValue list_value = 6;
         */
        value: ListValue;
        case: "listValue";
    } | {
        case: undefined;
        value?: undefined;
    };
    constructor(data?: PartialMessage<Value>);
    toJson(options?: Partial<JsonWriteOptions>): JsonValue;
    fromJson(json: JsonValue, options?: Partial<JsonReadOptions>): this;
    static readonly runtime: typeof proto3;
    static readonly typeName = "google.protobuf.Value";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Value;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Value;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Value;
    static equals(a: Value | PlainMessage<Value> | undefined, b: Value | PlainMessage<Value> | undefined): boolean;
}
/**
 * `ListValue` is a wrapper around a repeated field of values.
 *
 * The JSON representation for `ListValue` is JSON array.
 *
 * @generated from message google.protobuf.ListValue
 */
export declare class ListValue extends Message<ListValue> {
    /**
     * Repeated field of dynamically typed values.
     *
     * @generated from field: repeated google.protobuf.Value values = 1;
     */
    values: Value[];
    constructor(data?: PartialMessage<ListValue>);
    toJson(options?: Partial<JsonWriteOptions>): JsonValue;
    fromJson(json: JsonValue, options?: Partial<JsonReadOptions>): this;
    static readonly runtime: typeof proto3;
    static readonly typeName = "google.protobuf.ListValue";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListValue;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListValue;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListValue;
    static equals(a: ListValue | PlainMessage<ListValue> | undefined, b: ListValue | PlainMessage<ListValue> | undefined): boolean;
}
