import type { BinaryReadOptions, BinaryWriteOptions } from "./binary-format.js";
import type { JsonReadOptions, JsonValue, JsonWriteOptions, JsonWriteStringOptions } from "./json-format.js";
import type { MessageType } from "./message-type.js";
/**
 * AnyMessage is an interface implemented by all messages. If you need to
 * handle messages of unknown type, this interface provides a convenient
 * index signature to access fields with message["fieldname"].
 */
export interface AnyMessage extends Message<AnyMessage> {
    [k: string]: any;
}
/**
 * Message is the base class of every message, generated, or created at
 * runtime.
 *
 * It is _not_ safe to extend this class. If you want to create a message at
 * run time, use proto3.makeMessageType().
 */
export declare class Message<T extends Message<T> = AnyMessage> {
    /**
     * Compare with a message of the same type.
     */
    equals(other: T | PlainMessage<T> | undefined | null): boolean;
    /**
     * Create a deep copy.
     */
    clone(): T;
    /**
     * Parse from binary data, merging fields.
     *
     * Repeated fields are appended. Map entries are added, overwriting
     * existing keys.
     *
     * If a message field is already present, it will be merged with the
     * new data.
     */
    fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): this;
    /**
     * Parse a message from a JSON value.
     */
    fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): this;
    /**
     * Parse a message from a JSON string.
     */
    fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): this;
    /**
     * Serialize the message to binary data.
     */
    toBinary(options?: Partial<BinaryWriteOptions>): Uint8Array;
    /**
     * Serialize the message to a JSON value, a JavaScript value that can be
     * passed to JSON.stringify().
     */
    toJson(options?: Partial<JsonWriteOptions>): JsonValue;
    /**
     * Serialize the message to a JSON string.
     */
    toJsonString(options?: Partial<JsonWriteStringOptions>): string;
    /**
     * Override for serialization behavior. This will be invoked when calling
     * JSON.stringify on this message (i.e. JSON.stringify(msg)).
     *
     * Note that this will not serialize google.protobuf.Any with a packed
     * message because the protobuf JSON format specifies that it needs to be
     * unpacked, and this is only possible with a type registry to look up the
     * message type.  As a result, attempting to serialize a message with this
     * type will throw an Error.
     *
     * This method is protected because you should not need to invoke it
     * directly -- instead use JSON.stringify or toJsonString for
     * stringified JSON.  Alternatively, if actual JSON is desired, you should
     * use toJson.
     */
    protected toJSON(): JsonValue;
    /**
     * Retrieve the MessageType of this message - a singleton that represents
     * the protobuf message declaration and provides metadata for reflection-
     * based operations.
     */
    getType(): MessageType<T>;
}
/**
 * PlainMessage<T> strips all methods from a message, leaving only fields
 * and oneof groups.  It is recursive, meaning it applies this same logic to all
 * nested message fields as well.
 */
export type PlainMessage<T extends Message<T>> = {
    [P in keyof T as T[P] extends Function ? never : P]: PlainField<T[P]>;
};
type PlainField<F> = F extends (Date | Uint8Array | bigint | boolean | string | number) ? F : F extends Array<infer U> ? Array<PlainField<U>> : F extends ReadonlyArray<infer U> ? ReadonlyArray<PlainField<U>> : F extends Message<infer U> ? PlainMessage<U> : F extends OneofSelectedMessage<infer C, infer V> ? {
    case: C;
    value: PlainField<V>;
} : F extends {
    case: string | undefined;
    value?: unknown;
} ? F : F extends {
    [key: string | number]: Message<infer U>;
} ? {
    [key: string | number]: PlainField<U>;
} : F;
/**
 * PartialMessage<T> constructs a type from a message. The resulting type
 * only contains the protobuf field members of the message, and all of them
 * are optional.
 *
 * Note that the optionality of the fields is the only difference between
 * PartialMessage and PlainMessage.
 *
 * PartialMessage is similar to the built-in type Partial<T>, but recursive,
 * and respects `oneof` groups.
 */
export type PartialMessage<T extends Message<T>> = {
    [P in keyof T as T[P] extends Function ? never : P]?: PartialField<T[P]>;
};
type PartialField<F> = F extends (Date | Uint8Array | bigint | boolean | string | number) ? F : F extends Array<infer U> ? Array<PartialField<U>> : F extends ReadonlyArray<infer U> ? ReadonlyArray<PartialField<U>> : F extends Message<infer U> ? PartialMessage<U> : F extends OneofSelectedMessage<infer C, infer V> ? {
    case: C;
    value: PartialMessage<V>;
} : F extends {
    case: string | undefined;
    value?: unknown;
} ? F : F extends {
    [key: string | number]: Message<infer U>;
} ? {
    [key: string | number]: PartialMessage<U>;
} : F;
type OneofSelectedMessage<K extends string, M extends Message<M>> = {
    case: K;
    value: M;
};
export {};
