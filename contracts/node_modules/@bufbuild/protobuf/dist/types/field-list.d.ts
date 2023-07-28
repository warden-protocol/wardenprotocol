import type { FieldInfo, OneofInfo } from "./field.js";
/**
 * Provides convenient access to field information of a message type.
 */
export interface FieldList {
    /**
     * Find field information by field name or json_name.
     */
    findJsonName(jsonName: string): FieldInfo | undefined;
    /**
     * Find field information by proto field number.
     */
    find(fieldNo: number): FieldInfo | undefined;
    /**
     * Return field information in the order they appear in the source.
     */
    list(): readonly FieldInfo[];
    /**
     * Return field information ordered by field number ascending.
     */
    byNumber(): readonly FieldInfo[];
    /**
     * In order of appearance in the source, list fields and
     * oneof groups.
     */
    byMember(): readonly (FieldInfo | OneofInfo)[];
}
