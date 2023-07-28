import type { FieldListSource } from "./field-list.js";
import type { FieldList } from "../field-list.js";
import type { EnumObject } from "./enum.js";
import type { Message, PartialMessage, PlainMessage } from "../message.js";
import type { MessageType } from "../message-type.js";
import type { EnumValueInfo } from "../enum.js";
/**
 * Provides utilities used by generated code.
 * All methods are internal and are not safe to use, they may break with a
 * future release.
 */
export interface Util {
    /**
     * Create a field list
     */
    newFieldList(fields: FieldListSource): FieldList;
    /**
     * Sets reflection information on a generated enum.
     */
    setEnumType(enumObject: EnumObject, typeName: string, values: Omit<EnumValueInfo, "localName">[], opt?: {}): void;
    /**
     * Set default field values on the target message.
     */
    initFields(target: Message): void;
    /**
     * Set specified field values on the target message, recursively.
     */
    initPartial<T extends Message<T>>(source: PartialMessage<T> | undefined, target: T): void;
    /**
     * Compares two messages of the same type recursively.
     * Will also return true if both messages are `undefined` or `null`.
     */
    equals<T extends Message<T>>(type: MessageType<T>, a: T | PlainMessage<T> | undefined | null, b: T | PlainMessage<T> | undefined | null): boolean;
    /**
     * Create a deep copy.
     */
    clone<T extends Message<T>>(message: T): T;
}
