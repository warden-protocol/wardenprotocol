import { Message } from "../message.js";
import type { AnyMessage } from "../message.js";
import type { FieldListSource } from "./field-list.js";
import type { MessageType } from "../message-type.js";
import type { ProtoRuntime } from "./proto-runtime.js";
/**
 * Create a new message type using the given runtime.
 */
export declare function makeMessageType<T extends Message<T> = AnyMessage>(runtime: ProtoRuntime, typeName: string, fields: FieldListSource, opt?: {
    /**
     * localName is the "name" property of the constructed function.
     * It is useful in stack traces, debuggers and test frameworks,
     * but has no other implications.
     *
     * If omitted, the last part of the typeName is used.
     */
    localName?: string;
}): MessageType<T>;
