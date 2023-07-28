import type { BinaryReadOptions, BinaryWriteOptions } from "./binary-format.js";
import type { Message } from "./message.js";
import type { MessageType } from "./message-type.js";
/**
 * protoDelimited provides functions to serialize and parse size-delimited
 * messages.
 *
 * A size-delimited message is a varint size in bytes, followed by exactly
 * that many bytes of a message serialized with the binary format.
 *
 * This size-delimited format is compatible with other implementations.
 * For details, see https://github.com/protocolbuffers/protobuf/issues/10229
 */
export declare const protoDelimited: {
    /**
     * Serialize a message, prefixing it with its size.
     */
    enc(message: Message, options?: BinaryWriteOptions): Uint8Array;
    /**
     * Parse a size-delimited message, ignoring extra bytes.
     */
    dec<T extends Message<T>>(type: MessageType<T>, bytes: Uint8Array, options?: BinaryReadOptions): T;
    /**
     * Parse a stream of size-delimited messages.
     */
    decStream<T_1 extends Message<T_1>>(type: MessageType<T_1>, iterable: AsyncIterable<Uint8Array>): AsyncGenerator<T_1, void, unknown>;
    /**
     * Decodes the size from the given size-delimited message, which may be
     * incomplete.
     *
     * Returns an object with the following properties:
     * - size: The size of the delimited message in bytes
     * - offset: The offset in the given byte array where the message starts
     * - eof: true
     *
     * If the size-delimited data does not include all bytes of the varint size,
     * the following object is returned:
     * - size: null
     * - offset: null
     * - eof: false
     *
     * This function can be used to implement parsing of size-delimited messages
     * from a stream.
     */
    peekSize(data: Uint8Array): {
        readonly eof: false;
        readonly size: number;
        readonly offset: number;
    } | {
        readonly eof: true;
        readonly size: null;
        readonly offset: null;
    };
};
