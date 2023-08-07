import type { PartialMessage, PlainMessage } from "../../message.js";
import { Message } from "../../message.js";
import { proto3 } from "../../proto3.js";
import type { FieldList } from "../../field-list.js";
import type { BinaryReadOptions } from "../../binary-format.js";
import type { JsonReadOptions, JsonValue } from "../../json-format.js";
/**
 * `SourceContext` represents information about the source of a
 * protobuf element, like the file in which it is defined.
 *
 * @generated from message google.protobuf.SourceContext
 */
export declare class SourceContext extends Message<SourceContext> {
    /**
     * The path-qualified name of the .proto file that contained the associated
     * protobuf element.  For example: `"google/protobuf/source_context.proto"`.
     *
     * @generated from field: string file_name = 1;
     */
    fileName: string;
    constructor(data?: PartialMessage<SourceContext>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "google.protobuf.SourceContext";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SourceContext;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SourceContext;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SourceContext;
    static equals(a: SourceContext | PlainMessage<SourceContext> | undefined, b: SourceContext | PlainMessage<SourceContext> | undefined): boolean;
}
