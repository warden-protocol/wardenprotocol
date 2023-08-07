/**
 * Reflection information for a protobuf enumeration.
 */
export interface EnumType {
    /**
     * The fully qualified name of the enumeration.
     */
    readonly typeName: string;
    readonly values: readonly EnumValueInfo[];
    /**
     * Find an enum value by its (protobuf) name.
     */
    findName(name: string): EnumValueInfo | undefined;
    /**
     * Find an enum value by its number.
     */
    findNumber(no: number): EnumValueInfo | undefined;
}
/**
 * Reflection information for a protobuf enumeration value.
 */
export interface EnumValueInfo {
    /**
     * The numeric enumeration value, as specified in the protobuf source.
     */
    readonly no: number;
    /**
     * The name of the enumeration value, as specified in the protobuf source.
     */
    readonly name: string;
    /**
     * The name of the enumeration value in generated code.
     */
    readonly localName: string;
}
