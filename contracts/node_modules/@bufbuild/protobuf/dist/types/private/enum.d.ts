import type { EnumType, EnumValueInfo } from "../enum.js";
/**
 * Represents a generated enum.
 */
export interface EnumObject {
    [key: number]: string;
    [k: string]: number | string;
}
/**
 * Get reflection information from a generated enum.
 * If this function is called on something other than a generated
 * enum, it raises an error.
 */
export declare function getEnumType(enumObject: EnumObject): EnumType;
/**
 * Sets reflection information on a generated enum.
 */
export declare function setEnumType(enumObject: EnumObject, typeName: string, values: Omit<EnumValueInfo, "localName">[], opt?: {}): void;
/**
 * Create a new EnumType with the given values.
 */
export declare function makeEnumType(typeName: string, values: (EnumValueInfo | Omit<EnumValueInfo, "localName">)[], _opt?: {}): EnumType;
/**
 * Create a new enum object with the given values.
 * Sets reflection information.
 */
export declare function makeEnum(typeName: string, values: (EnumValueInfo | Omit<EnumValueInfo, "localName">)[], opt?: {}): EnumObject;
