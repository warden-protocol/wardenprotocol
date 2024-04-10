import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "google.protobuf";
/**
 * The protocol compiler can output a FileDescriptorSet containing the .proto
 * files it parses.
 */
export interface FileDescriptorSet {
    file: FileDescriptorProto[];
}
/** Describes a complete .proto file. */
export interface FileDescriptorProto {
    /** file name, relative to root of source tree */
    name: string;
    /** e.g. "foo", "foo.bar", etc. */
    package: string;
    /** Names of files imported by this file. */
    dependency: string[];
    /** Indexes of the public imported files in the dependency list above. */
    publicDependency: number[];
    /**
     * Indexes of the weak imported files in the dependency list.
     * For Google-internal migration only. Do not use.
     */
    weakDependency: number[];
    /** All top-level definitions in this file. */
    messageType: DescriptorProto[];
    enumType: EnumDescriptorProto[];
    service: ServiceDescriptorProto[];
    extension: FieldDescriptorProto[];
    options: FileOptions | undefined;
    /**
     * This field contains optional information about the original source code.
     * You may safely remove this entire field without harming runtime
     * functionality of the descriptors -- the information is needed only by
     * development tools.
     */
    sourceCodeInfo: SourceCodeInfo | undefined;
    /**
     * The syntax of the proto file.
     * The supported values are "proto2" and "proto3".
     */
    syntax: string;
}
/** Describes a message type. */
export interface DescriptorProto {
    name: string;
    field: FieldDescriptorProto[];
    extension: FieldDescriptorProto[];
    nestedType: DescriptorProto[];
    enumType: EnumDescriptorProto[];
    extensionRange: DescriptorProto_ExtensionRange[];
    oneofDecl: OneofDescriptorProto[];
    options: MessageOptions | undefined;
    reservedRange: DescriptorProto_ReservedRange[];
    /**
     * Reserved field names, which may not be used by fields in the same message.
     * A given name may only be reserved once.
     */
    reservedName: string[];
}
export interface DescriptorProto_ExtensionRange {
    /** Inclusive. */
    start: number;
    /** Exclusive. */
    end: number;
    options: ExtensionRangeOptions | undefined;
}
/**
 * Range of reserved tag numbers. Reserved tag numbers may not be used by
 * fields or extension ranges in the same message. Reserved ranges may
 * not overlap.
 */
export interface DescriptorProto_ReservedRange {
    /** Inclusive. */
    start: number;
    /** Exclusive. */
    end: number;
}
export interface ExtensionRangeOptions {
    /** The parser stores options it doesn't recognize here. See above. */
    uninterpretedOption: UninterpretedOption[];
}
/** Describes a field within a message. */
export interface FieldDescriptorProto {
    name: string;
    number: number;
    label: FieldDescriptorProto_Label;
    /**
     * If type_name is set, this need not be set.  If both this and type_name
     * are set, this must be one of TYPE_ENUM, TYPE_MESSAGE or TYPE_GROUP.
     */
    type: FieldDescriptorProto_Type;
    /**
     * For message and enum types, this is the name of the type.  If the name
     * starts with a '.', it is fully-qualified.  Otherwise, C++-like scoping
     * rules are used to find the type (i.e. first the nested types within this
     * message are searched, then within the parent, on up to the root
     * namespace).
     */
    typeName: string;
    /**
     * For extensions, this is the name of the type being extended.  It is
     * resolved in the same manner as type_name.
     */
    extendee: string;
    /**
     * For numeric types, contains the original text representation of the value.
     * For booleans, "true" or "false".
     * For strings, contains the default text contents (not escaped in any way).
     * For bytes, contains the C escaped value.  All bytes >= 128 are escaped.
     * TODO(kenton):  Base-64 encode?
     */
    defaultValue: string;
    /**
     * If set, gives the index of a oneof in the containing type's oneof_decl
     * list.  This field is a member of that oneof.
     */
    oneofIndex: number;
    /**
     * JSON name of this field. The value is set by protocol compiler. If the
     * user has set a "json_name" option on this field, that option's value
     * will be used. Otherwise, it's deduced from the field's name by converting
     * it to camelCase.
     */
    jsonName: string;
    options: FieldOptions | undefined;
    /**
     * If true, this is a proto3 "optional". When a proto3 field is optional, it
     * tracks presence regardless of field type.
     *
     * When proto3_optional is true, this field must be belong to a oneof to
     * signal to old proto3 clients that presence is tracked for this field. This
     * oneof is known as a "synthetic" oneof, and this field must be its sole
     * member (each proto3 optional field gets its own synthetic oneof). Synthetic
     * oneofs exist in the descriptor only, and do not generate any API. Synthetic
     * oneofs must be ordered after all "real" oneofs.
     *
     * For message fields, proto3_optional doesn't create any semantic change,
     * since non-repeated message fields always track presence. However it still
     * indicates the semantic detail of whether the user wrote "optional" or not.
     * This can be useful for round-tripping the .proto file. For consistency we
     * give message fields a synthetic oneof also, even though it is not required
     * to track presence. This is especially important because the parser can't
     * tell if a field is a message or an enum, so it must always create a
     * synthetic oneof.
     *
     * Proto2 optional fields do not set this flag, because they already indicate
     * optional with `LABEL_OPTIONAL`.
     */
    proto3Optional: boolean;
}
export declare enum FieldDescriptorProto_Type {
    /**
     * TYPE_DOUBLE - 0 is reserved for errors.
     * Order is weird for historical reasons.
     */
    TYPE_DOUBLE = 1,
    TYPE_FLOAT = 2,
    /**
     * TYPE_INT64 - Not ZigZag encoded.  Negative numbers take 10 bytes.  Use TYPE_SINT64 if
     * negative values are likely.
     */
    TYPE_INT64 = 3,
    TYPE_UINT64 = 4,
    /**
     * TYPE_INT32 - Not ZigZag encoded.  Negative numbers take 10 bytes.  Use TYPE_SINT32 if
     * negative values are likely.
     */
    TYPE_INT32 = 5,
    TYPE_FIXED64 = 6,
    TYPE_FIXED32 = 7,
    TYPE_BOOL = 8,
    TYPE_STRING = 9,
    /**
     * TYPE_GROUP - Tag-delimited aggregate.
     * Group type is deprecated and not supported in proto3. However, Proto3
     * implementations should still be able to parse the group wire format and
     * treat group fields as unknown fields.
     */
    TYPE_GROUP = 10,
    /** TYPE_MESSAGE - Length-delimited aggregate. */
    TYPE_MESSAGE = 11,
    /** TYPE_BYTES - New in version 2. */
    TYPE_BYTES = 12,
    TYPE_UINT32 = 13,
    TYPE_ENUM = 14,
    TYPE_SFIXED32 = 15,
    TYPE_SFIXED64 = 16,
    /** TYPE_SINT32 - Uses ZigZag encoding. */
    TYPE_SINT32 = 17,
    /** TYPE_SINT64 - Uses ZigZag encoding. */
    TYPE_SINT64 = 18,
    UNRECOGNIZED = -1
}
export declare function fieldDescriptorProto_TypeFromJSON(object: any): FieldDescriptorProto_Type;
export declare function fieldDescriptorProto_TypeToJSON(object: FieldDescriptorProto_Type): string;
export declare enum FieldDescriptorProto_Label {
    /** LABEL_OPTIONAL - 0 is reserved for errors */
    LABEL_OPTIONAL = 1,
    LABEL_REQUIRED = 2,
    LABEL_REPEATED = 3,
    UNRECOGNIZED = -1
}
export declare function fieldDescriptorProto_LabelFromJSON(object: any): FieldDescriptorProto_Label;
export declare function fieldDescriptorProto_LabelToJSON(object: FieldDescriptorProto_Label): string;
/** Describes a oneof. */
export interface OneofDescriptorProto {
    name: string;
    options: OneofOptions | undefined;
}
/** Describes an enum type. */
export interface EnumDescriptorProto {
    name: string;
    value: EnumValueDescriptorProto[];
    options: EnumOptions | undefined;
    /**
     * Range of reserved numeric values. Reserved numeric values may not be used
     * by enum values in the same enum declaration. Reserved ranges may not
     * overlap.
     */
    reservedRange: EnumDescriptorProto_EnumReservedRange[];
    /**
     * Reserved enum value names, which may not be reused. A given name may only
     * be reserved once.
     */
    reservedName: string[];
}
/**
 * Range of reserved numeric values. Reserved values may not be used by
 * entries in the same enum. Reserved ranges may not overlap.
 *
 * Note that this is distinct from DescriptorProto.ReservedRange in that it
 * is inclusive such that it can appropriately represent the entire int32
 * domain.
 */
export interface EnumDescriptorProto_EnumReservedRange {
    /** Inclusive. */
    start: number;
    /** Inclusive. */
    end: number;
}
/** Describes a value within an enum. */
export interface EnumValueDescriptorProto {
    name: string;
    number: number;
    options: EnumValueOptions | undefined;
}
/** Describes a service. */
export interface ServiceDescriptorProto {
    name: string;
    method: MethodDescriptorProto[];
    options: ServiceOptions | undefined;
}
/** Describes a method of a service. */
export interface MethodDescriptorProto {
    name: string;
    /**
     * Input and output type names.  These are resolved in the same way as
     * FieldDescriptorProto.type_name, but must refer to a message type.
     */
    inputType: string;
    outputType: string;
    options: MethodOptions | undefined;
    /** Identifies if client streams multiple client messages */
    clientStreaming: boolean;
    /** Identifies if server streams multiple server messages */
    serverStreaming: boolean;
}
export interface FileOptions {
    /**
     * Sets the Java package where classes generated from this .proto will be
     * placed.  By default, the proto package is used, but this is often
     * inappropriate because proto packages do not normally start with backwards
     * domain names.
     */
    javaPackage: string;
    /**
     * Controls the name of the wrapper Java class generated for the .proto file.
     * That class will always contain the .proto file's getDescriptor() method as
     * well as any top-level extensions defined in the .proto file.
     * If java_multiple_files is disabled, then all the other classes from the
     * .proto file will be nested inside the single wrapper outer class.
     */
    javaOuterClassname: string;
    /**
     * If enabled, then the Java code generator will generate a separate .java
     * file for each top-level message, enum, and service defined in the .proto
     * file.  Thus, these types will *not* be nested inside the wrapper class
     * named by java_outer_classname.  However, the wrapper class will still be
     * generated to contain the file's getDescriptor() method as well as any
     * top-level extensions defined in the file.
     */
    javaMultipleFiles: boolean;
    /**
     * This option does nothing.
     *
     * @deprecated
     */
    javaGenerateEqualsAndHash: boolean;
    /**
     * If set true, then the Java2 code generator will generate code that
     * throws an exception whenever an attempt is made to assign a non-UTF-8
     * byte sequence to a string field.
     * Message reflection will do the same.
     * However, an extension field still accepts non-UTF-8 byte sequences.
     * This option has no effect on when used with the lite runtime.
     */
    javaStringCheckUtf8: boolean;
    optimizeFor: FileOptions_OptimizeMode;
    /**
     * Sets the Go package where structs generated from this .proto will be
     * placed. If omitted, the Go package will be derived from the following:
     *   - The basename of the package import path, if provided.
     *   - Otherwise, the package statement in the .proto file, if present.
     *   - Otherwise, the basename of the .proto file, without extension.
     */
    goPackage: string;
    /**
     * Should generic services be generated in each language?  "Generic" services
     * are not specific to any particular RPC system.  They are generated by the
     * main code generators in each language (without additional plugins).
     * Generic services were the only kind of service generation supported by
     * early versions of google.protobuf.
     *
     * Generic services are now considered deprecated in favor of using plugins
     * that generate code specific to your particular RPC system.  Therefore,
     * these default to false.  Old code which depends on generic services should
     * explicitly set them to true.
     */
    ccGenericServices: boolean;
    javaGenericServices: boolean;
    pyGenericServices: boolean;
    phpGenericServices: boolean;
    /**
     * Is this file deprecated?
     * Depending on the target platform, this can emit Deprecated annotations
     * for everything in the file, or it will be completely ignored; in the very
     * least, this is a formalization for deprecating files.
     */
    deprecated: boolean;
    /**
     * Enables the use of arenas for the proto messages in this file. This applies
     * only to generated classes for C++.
     */
    ccEnableArenas: boolean;
    /**
     * Sets the objective c class prefix which is prepended to all objective c
     * generated classes from this .proto. There is no default.
     */
    objcClassPrefix: string;
    /** Namespace for generated classes; defaults to the package. */
    csharpNamespace: string;
    /**
     * By default Swift generators will take the proto package and CamelCase it
     * replacing '.' with underscore and use that to prefix the types/symbols
     * defined. When this options is provided, they will use this value instead
     * to prefix the types/symbols defined.
     */
    swiftPrefix: string;
    /**
     * Sets the php class prefix which is prepended to all php generated classes
     * from this .proto. Default is empty.
     */
    phpClassPrefix: string;
    /**
     * Use this option to change the namespace of php generated classes. Default
     * is empty. When this option is empty, the package name will be used for
     * determining the namespace.
     */
    phpNamespace: string;
    /**
     * Use this option to change the namespace of php generated metadata classes.
     * Default is empty. When this option is empty, the proto file name will be
     * used for determining the namespace.
     */
    phpMetadataNamespace: string;
    /**
     * Use this option to change the package of ruby generated classes. Default
     * is empty. When this option is not set, the package name will be used for
     * determining the ruby package.
     */
    rubyPackage: string;
    /**
     * The parser stores options it doesn't recognize here.
     * See the documentation for the "Options" section above.
     */
    uninterpretedOption: UninterpretedOption[];
}
/** Generated classes can be optimized for speed or code size. */
export declare enum FileOptions_OptimizeMode {
    /** SPEED - Generate complete code for parsing, serialization, */
    SPEED = 1,
    /** CODE_SIZE - etc. */
    CODE_SIZE = 2,
    /** LITE_RUNTIME - Generate code using MessageLite and the lite runtime. */
    LITE_RUNTIME = 3,
    UNRECOGNIZED = -1
}
export declare function fileOptions_OptimizeModeFromJSON(object: any): FileOptions_OptimizeMode;
export declare function fileOptions_OptimizeModeToJSON(object: FileOptions_OptimizeMode): string;
export interface MessageOptions {
    /**
     * Set true to use the old proto1 MessageSet wire format for extensions.
     * This is provided for backwards-compatibility with the MessageSet wire
     * format.  You should not use this for any other reason:  It's less
     * efficient, has fewer features, and is more complicated.
     *
     * The message must be defined exactly as follows:
     *   message Foo {
     *     option message_set_wire_format = true;
     *     extensions 4 to max;
     *   }
     * Note that the message cannot have any defined fields; MessageSets only
     * have extensions.
     *
     * All extensions of your type must be singular messages; e.g. they cannot
     * be int32s, enums, or repeated messages.
     *
     * Because this is an option, the above two restrictions are not enforced by
     * the protocol compiler.
     */
    messageSetWireFormat: boolean;
    /**
     * Disables the generation of the standard "descriptor()" accessor, which can
     * conflict with a field of the same name.  This is meant to make migration
     * from proto1 easier; new code should avoid fields named "descriptor".
     */
    noStandardDescriptorAccessor: boolean;
    /**
     * Is this message deprecated?
     * Depending on the target platform, this can emit Deprecated annotations
     * for the message, or it will be completely ignored; in the very least,
     * this is a formalization for deprecating messages.
     */
    deprecated: boolean;
    /**
     * Whether the message is an automatically generated map entry type for the
     * maps field.
     *
     * For maps fields:
     *     map<KeyType, ValueType> map_field = 1;
     * The parsed descriptor looks like:
     *     message MapFieldEntry {
     *         option map_entry = true;
     *         optional KeyType key = 1;
     *         optional ValueType value = 2;
     *     }
     *     repeated MapFieldEntry map_field = 1;
     *
     * Implementations may choose not to generate the map_entry=true message, but
     * use a native map in the target language to hold the keys and values.
     * The reflection APIs in such implementations still need to work as
     * if the field is a repeated message field.
     *
     * NOTE: Do not set the option in .proto files. Always use the maps syntax
     * instead. The option should only be implicitly set by the proto compiler
     * parser.
     */
    mapEntry: boolean;
    /** The parser stores options it doesn't recognize here. See above. */
    uninterpretedOption: UninterpretedOption[];
}
export interface FieldOptions {
    /**
     * The ctype option instructs the C++ code generator to use a different
     * representation of the field than it normally would.  See the specific
     * options below.  This option is not yet implemented in the open source
     * release -- sorry, we'll try to include it in a future version!
     */
    ctype: FieldOptions_CType;
    /**
     * The packed option can be enabled for repeated primitive fields to enable
     * a more efficient representation on the wire. Rather than repeatedly
     * writing the tag and type for each element, the entire array is encoded as
     * a single length-delimited blob. In proto3, only explicit setting it to
     * false will avoid using packed encoding.
     */
    packed: boolean;
    /**
     * The jstype option determines the JavaScript type used for values of the
     * field.  The option is permitted only for 64 bit integral and fixed types
     * (int64, uint64, sint64, fixed64, sfixed64).  A field with jstype JS_STRING
     * is represented as JavaScript string, which avoids loss of precision that
     * can happen when a large value is converted to a floating point JavaScript.
     * Specifying JS_NUMBER for the jstype causes the generated JavaScript code to
     * use the JavaScript "number" type.  The behavior of the default option
     * JS_NORMAL is implementation dependent.
     *
     * This option is an enum to permit additional types to be added, e.g.
     * goog.math.Integer.
     */
    jstype: FieldOptions_JSType;
    /**
     * Should this field be parsed lazily?  Lazy applies only to message-type
     * fields.  It means that when the outer message is initially parsed, the
     * inner message's contents will not be parsed but instead stored in encoded
     * form.  The inner message will actually be parsed when it is first accessed.
     *
     * This is only a hint.  Implementations are free to choose whether to use
     * eager or lazy parsing regardless of the value of this option.  However,
     * setting this option true suggests that the protocol author believes that
     * using lazy parsing on this field is worth the additional bookkeeping
     * overhead typically needed to implement it.
     *
     * This option does not affect the public interface of any generated code;
     * all method signatures remain the same.  Furthermore, thread-safety of the
     * interface is not affected by this option; const methods remain safe to
     * call from multiple threads concurrently, while non-const methods continue
     * to require exclusive access.
     *
     * Note that implementations may choose not to check required fields within
     * a lazy sub-message.  That is, calling IsInitialized() on the outer message
     * may return true even if the inner message has missing required fields.
     * This is necessary because otherwise the inner message would have to be
     * parsed in order to perform the check, defeating the purpose of lazy
     * parsing.  An implementation which chooses not to check required fields
     * must be consistent about it.  That is, for any particular sub-message, the
     * implementation must either *always* check its required fields, or *never*
     * check its required fields, regardless of whether or not the message has
     * been parsed.
     */
    lazy: boolean;
    /**
     * Is this field deprecated?
     * Depending on the target platform, this can emit Deprecated annotations
     * for accessors, or it will be completely ignored; in the very least, this
     * is a formalization for deprecating fields.
     */
    deprecated: boolean;
    /** For Google-internal migration only. Do not use. */
    weak: boolean;
    /** The parser stores options it doesn't recognize here. See above. */
    uninterpretedOption: UninterpretedOption[];
}
export declare enum FieldOptions_CType {
    /** STRING - Default mode. */
    STRING = 0,
    CORD = 1,
    STRING_PIECE = 2,
    UNRECOGNIZED = -1
}
export declare function fieldOptions_CTypeFromJSON(object: any): FieldOptions_CType;
export declare function fieldOptions_CTypeToJSON(object: FieldOptions_CType): string;
export declare enum FieldOptions_JSType {
    /** JS_NORMAL - Use the default type. */
    JS_NORMAL = 0,
    /** JS_STRING - Use JavaScript strings. */
    JS_STRING = 1,
    /** JS_NUMBER - Use JavaScript numbers. */
    JS_NUMBER = 2,
    UNRECOGNIZED = -1
}
export declare function fieldOptions_JSTypeFromJSON(object: any): FieldOptions_JSType;
export declare function fieldOptions_JSTypeToJSON(object: FieldOptions_JSType): string;
export interface OneofOptions {
    /** The parser stores options it doesn't recognize here. See above. */
    uninterpretedOption: UninterpretedOption[];
}
export interface EnumOptions {
    /**
     * Set this option to true to allow mapping different tag names to the same
     * value.
     */
    allowAlias: boolean;
    /**
     * Is this enum deprecated?
     * Depending on the target platform, this can emit Deprecated annotations
     * for the enum, or it will be completely ignored; in the very least, this
     * is a formalization for deprecating enums.
     */
    deprecated: boolean;
    /** The parser stores options it doesn't recognize here. See above. */
    uninterpretedOption: UninterpretedOption[];
}
export interface EnumValueOptions {
    /**
     * Is this enum value deprecated?
     * Depending on the target platform, this can emit Deprecated annotations
     * for the enum value, or it will be completely ignored; in the very least,
     * this is a formalization for deprecating enum values.
     */
    deprecated: boolean;
    /** The parser stores options it doesn't recognize here. See above. */
    uninterpretedOption: UninterpretedOption[];
}
export interface ServiceOptions {
    /**
     * Is this service deprecated?
     * Depending on the target platform, this can emit Deprecated annotations
     * for the service, or it will be completely ignored; in the very least,
     * this is a formalization for deprecating services.
     */
    deprecated: boolean;
    /** The parser stores options it doesn't recognize here. See above. */
    uninterpretedOption: UninterpretedOption[];
}
export interface MethodOptions {
    /**
     * Is this method deprecated?
     * Depending on the target platform, this can emit Deprecated annotations
     * for the method, or it will be completely ignored; in the very least,
     * this is a formalization for deprecating methods.
     */
    deprecated: boolean;
    idempotencyLevel: MethodOptions_IdempotencyLevel;
    /** The parser stores options it doesn't recognize here. See above. */
    uninterpretedOption: UninterpretedOption[];
}
/**
 * Is this method side-effect-free (or safe in HTTP parlance), or idempotent,
 * or neither? HTTP based RPC implementation may choose GET verb for safe
 * methods, and PUT verb for idempotent methods instead of the default POST.
 */
export declare enum MethodOptions_IdempotencyLevel {
    IDEMPOTENCY_UNKNOWN = 0,
    /** NO_SIDE_EFFECTS - implies idempotent */
    NO_SIDE_EFFECTS = 1,
    /** IDEMPOTENT - idempotent, but may have side effects */
    IDEMPOTENT = 2,
    UNRECOGNIZED = -1
}
export declare function methodOptions_IdempotencyLevelFromJSON(object: any): MethodOptions_IdempotencyLevel;
export declare function methodOptions_IdempotencyLevelToJSON(object: MethodOptions_IdempotencyLevel): string;
/**
 * A message representing a option the parser does not recognize. This only
 * appears in options protos created by the compiler::Parser class.
 * DescriptorPool resolves these when building Descriptor objects. Therefore,
 * options protos in descriptor objects (e.g. returned by Descriptor::options(),
 * or produced by Descriptor::CopyTo()) will never have UninterpretedOptions
 * in them.
 */
export interface UninterpretedOption {
    name: UninterpretedOption_NamePart[];
    /**
     * The value of the uninterpreted option, in whatever type the tokenizer
     * identified it as during parsing. Exactly one of these should be set.
     */
    identifierValue: string;
    positiveIntValue: number;
    negativeIntValue: number;
    doubleValue: number;
    stringValue: Uint8Array;
    aggregateValue: string;
}
/**
 * The name of the uninterpreted option.  Each string represents a segment in
 * a dot-separated name.  is_extension is true iff a segment represents an
 * extension (denoted with parentheses in options specs in .proto files).
 * E.g.,{ ["foo", false], ["bar.baz", true], ["qux", false] } represents
 * "foo.(bar.baz).qux".
 */
export interface UninterpretedOption_NamePart {
    namePart: string;
    isExtension: boolean;
}
/**
 * Encapsulates information about the original source file from which a
 * FileDescriptorProto was generated.
 */
export interface SourceCodeInfo {
    /**
     * A Location identifies a piece of source code in a .proto file which
     * corresponds to a particular definition.  This information is intended
     * to be useful to IDEs, code indexers, documentation generators, and similar
     * tools.
     *
     * For example, say we have a file like:
     *   message Foo {
     *     optional string foo = 1;
     *   }
     * Let's look at just the field definition:
     *   optional string foo = 1;
     *   ^       ^^     ^^  ^  ^^^
     *   a       bc     de  f  ghi
     * We have the following locations:
     *   span   path               represents
     *   [a,i)  [ 4, 0, 2, 0 ]     The whole field definition.
     *   [a,b)  [ 4, 0, 2, 0, 4 ]  The label (optional).
     *   [c,d)  [ 4, 0, 2, 0, 5 ]  The type (string).
     *   [e,f)  [ 4, 0, 2, 0, 1 ]  The name (foo).
     *   [g,h)  [ 4, 0, 2, 0, 3 ]  The number (1).
     *
     * Notes:
     * - A location may refer to a repeated field itself (i.e. not to any
     *   particular index within it).  This is used whenever a set of elements are
     *   logically enclosed in a single code segment.  For example, an entire
     *   extend block (possibly containing multiple extension definitions) will
     *   have an outer location whose path refers to the "extensions" repeated
     *   field without an index.
     * - Multiple locations may have the same path.  This happens when a single
     *   logical declaration is spread out across multiple places.  The most
     *   obvious example is the "extend" block again -- there may be multiple
     *   extend blocks in the same scope, each of which will have the same path.
     * - A location's span is not always a subset of its parent's span.  For
     *   example, the "extendee" of an extension declaration appears at the
     *   beginning of the "extend" block and is shared by all extensions within
     *   the block.
     * - Just because a location's span is a subset of some other location's span
     *   does not mean that it is a descendant.  For example, a "group" defines
     *   both a type and a field in a single declaration.  Thus, the locations
     *   corresponding to the type and field and their components will overlap.
     * - Code which tries to interpret locations should probably be designed to
     *   ignore those that it doesn't understand, as more types of locations could
     *   be recorded in the future.
     */
    location: SourceCodeInfo_Location[];
}
export interface SourceCodeInfo_Location {
    /**
     * Identifies which part of the FileDescriptorProto was defined at this
     * location.
     *
     * Each element is a field number or an index.  They form a path from
     * the root FileDescriptorProto to the place where the definition.  For
     * example, this path:
     *   [ 4, 3, 2, 7, 1 ]
     * refers to:
     *   file.message_type(3)  // 4, 3
     *       .field(7)         // 2, 7
     *       .name()           // 1
     * This is because FileDescriptorProto.message_type has field number 4:
     *   repeated DescriptorProto message_type = 4;
     * and DescriptorProto.field has field number 2:
     *   repeated FieldDescriptorProto field = 2;
     * and FieldDescriptorProto.name has field number 1:
     *   optional string name = 1;
     *
     * Thus, the above path gives the location of a field name.  If we removed
     * the last element:
     *   [ 4, 3, 2, 7 ]
     * this path refers to the whole field declaration (from the beginning
     * of the label to the terminating semicolon).
     */
    path: number[];
    /**
     * Always has exactly three or four elements: start line, start column,
     * end line (optional, otherwise assumed same as start line), end column.
     * These are packed into a single field for efficiency.  Note that line
     * and column numbers are zero-based -- typically you will want to add
     * 1 to each before displaying to a user.
     */
    span: number[];
    /**
     * If this SourceCodeInfo represents a complete declaration, these are any
     * comments appearing before and after the declaration which appear to be
     * attached to the declaration.
     *
     * A series of line comments appearing on consecutive lines, with no other
     * tokens appearing on those lines, will be treated as a single comment.
     *
     * leading_detached_comments will keep paragraphs of comments that appear
     * before (but not connected to) the current element. Each paragraph,
     * separated by empty lines, will be one comment element in the repeated
     * field.
     *
     * Only the comment content is provided; comment markers (e.g. //) are
     * stripped out.  For block comments, leading whitespace and an asterisk
     * will be stripped from the beginning of each line other than the first.
     * Newlines are included in the output.
     *
     * Examples:
     *
     *   optional int32 foo = 1;  // Comment attached to foo.
     *   // Comment attached to bar.
     *   optional int32 bar = 2;
     *
     *   optional string baz = 3;
     *   // Comment attached to baz.
     *   // Another line attached to baz.
     *
     *   // Comment attached to qux.
     *   //
     *   // Another line attached to qux.
     *   optional double qux = 4;
     *
     *   // Detached comment for corge. This is not leading or trailing comments
     *   // to qux or corge because there are blank lines separating it from
     *   // both.
     *
     *   // Detached comment for corge paragraph 2.
     *
     *   optional string corge = 5;
     *   /* Block comment attached
     *    * to corge.  Leading asterisks
     *    * will be removed. * /
     *   /* Block comment attached to
     *    * grault. * /
     *   optional int32 grault = 6;
     *
     *   // ignored detached comments.
     */
    leadingComments: string;
    trailingComments: string;
    leadingDetachedComments: string[];
}
/**
 * Describes the relationship between generated code and its original source
 * file. A GeneratedCodeInfo message is associated with only one generated
 * source file, but may contain references to different source .proto files.
 */
export interface GeneratedCodeInfo {
    /**
     * An Annotation connects some span of text in generated code to an element
     * of its generating .proto file.
     */
    annotation: GeneratedCodeInfo_Annotation[];
}
export interface GeneratedCodeInfo_Annotation {
    /**
     * Identifies the element in the original source .proto file. This field
     * is formatted the same as SourceCodeInfo.Location.path.
     */
    path: number[];
    /** Identifies the filesystem path to the original source .proto. */
    sourceFile: string;
    /**
     * Identifies the starting offset in bytes in the generated code
     * that relates to the identified object.
     */
    begin: number;
    /**
     * Identifies the ending offset in bytes in the generated code that
     * relates to the identified offset. The end offset should be one past
     * the last relevant byte (so the length of the text = end - begin).
     */
    end: number;
}
export declare const FileDescriptorSet: {
    encode(message: FileDescriptorSet, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): FileDescriptorSet;
    fromJSON(object: any): FileDescriptorSet;
    toJSON(message: FileDescriptorSet): unknown;
    create<I extends {
        file?: {
            name?: string;
            package?: string;
            dependency?: string[];
            publicDependency?: number[];
            weakDependency?: number[];
            messageType?: {
                name?: string;
                field?: {
                    name?: string;
                    number?: number;
                    label?: FieldDescriptorProto_Label;
                    type?: FieldDescriptorProto_Type;
                    typeName?: string;
                    extendee?: string;
                    defaultValue?: string;
                    oneofIndex?: number;
                    jsonName?: string;
                    options?: {
                        ctype?: FieldOptions_CType;
                        packed?: boolean;
                        jstype?: FieldOptions_JSType;
                        lazy?: boolean;
                        deprecated?: boolean;
                        weak?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    proto3Optional?: boolean;
                }[];
                extension?: {
                    name?: string;
                    number?: number;
                    label?: FieldDescriptorProto_Label;
                    type?: FieldDescriptorProto_Type;
                    typeName?: string;
                    extendee?: string;
                    defaultValue?: string;
                    oneofIndex?: number;
                    jsonName?: string;
                    options?: {
                        ctype?: FieldOptions_CType;
                        packed?: boolean;
                        jstype?: FieldOptions_JSType;
                        lazy?: boolean;
                        deprecated?: boolean;
                        weak?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    proto3Optional?: boolean;
                }[];
                nestedType?: any[];
                enumType?: {
                    name?: string;
                    value?: {
                        name?: string;
                        number?: number;
                        options?: {
                            deprecated?: boolean;
                            uninterpretedOption?: {
                                name?: {
                                    namePart?: string;
                                    isExtension?: boolean;
                                }[];
                                identifierValue?: string;
                                positiveIntValue?: number;
                                negativeIntValue?: number;
                                doubleValue?: number;
                                stringValue?: Uint8Array;
                                aggregateValue?: string;
                            }[];
                        };
                    }[];
                    options?: {
                        allowAlias?: boolean;
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    reservedRange?: {
                        start?: number;
                        end?: number;
                    }[];
                    reservedName?: string[];
                }[];
                extensionRange?: {
                    start?: number;
                    end?: number;
                    options?: {
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                oneofDecl?: {
                    name?: string;
                    options?: {
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    messageSetWireFormat?: boolean;
                    noStandardDescriptorAccessor?: boolean;
                    deprecated?: boolean;
                    mapEntry?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[];
            enumType?: {
                name?: string;
                value?: {
                    name?: string;
                    number?: number;
                    options?: {
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    allowAlias?: boolean;
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[];
            service?: {
                name?: string;
                method?: {
                    name?: string;
                    inputType?: string;
                    outputType?: string;
                    options?: {
                        deprecated?: boolean;
                        idempotencyLevel?: MethodOptions_IdempotencyLevel;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    clientStreaming?: boolean;
                    serverStreaming?: boolean;
                }[];
                options?: {
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            extension?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            options?: {
                javaPackage?: string;
                javaOuterClassname?: string;
                javaMultipleFiles?: boolean;
                javaGenerateEqualsAndHash?: boolean;
                javaStringCheckUtf8?: boolean;
                optimizeFor?: FileOptions_OptimizeMode;
                goPackage?: string;
                ccGenericServices?: boolean;
                javaGenericServices?: boolean;
                pyGenericServices?: boolean;
                phpGenericServices?: boolean;
                deprecated?: boolean;
                ccEnableArenas?: boolean;
                objcClassPrefix?: string;
                csharpNamespace?: string;
                swiftPrefix?: string;
                phpClassPrefix?: string;
                phpNamespace?: string;
                phpMetadataNamespace?: string;
                rubyPackage?: string;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            sourceCodeInfo?: {
                location?: {
                    path?: number[];
                    span?: number[];
                    leadingComments?: string;
                    trailingComments?: string;
                    leadingDetachedComments?: string[];
                }[];
            };
            syntax?: string;
        }[];
    } & {
        file?: {
            name?: string;
            package?: string;
            dependency?: string[];
            publicDependency?: number[];
            weakDependency?: number[];
            messageType?: {
                name?: string;
                field?: {
                    name?: string;
                    number?: number;
                    label?: FieldDescriptorProto_Label;
                    type?: FieldDescriptorProto_Type;
                    typeName?: string;
                    extendee?: string;
                    defaultValue?: string;
                    oneofIndex?: number;
                    jsonName?: string;
                    options?: {
                        ctype?: FieldOptions_CType;
                        packed?: boolean;
                        jstype?: FieldOptions_JSType;
                        lazy?: boolean;
                        deprecated?: boolean;
                        weak?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    proto3Optional?: boolean;
                }[];
                extension?: {
                    name?: string;
                    number?: number;
                    label?: FieldDescriptorProto_Label;
                    type?: FieldDescriptorProto_Type;
                    typeName?: string;
                    extendee?: string;
                    defaultValue?: string;
                    oneofIndex?: number;
                    jsonName?: string;
                    options?: {
                        ctype?: FieldOptions_CType;
                        packed?: boolean;
                        jstype?: FieldOptions_JSType;
                        lazy?: boolean;
                        deprecated?: boolean;
                        weak?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    proto3Optional?: boolean;
                }[];
                nestedType?: any[];
                enumType?: {
                    name?: string;
                    value?: {
                        name?: string;
                        number?: number;
                        options?: {
                            deprecated?: boolean;
                            uninterpretedOption?: {
                                name?: {
                                    namePart?: string;
                                    isExtension?: boolean;
                                }[];
                                identifierValue?: string;
                                positiveIntValue?: number;
                                negativeIntValue?: number;
                                doubleValue?: number;
                                stringValue?: Uint8Array;
                                aggregateValue?: string;
                            }[];
                        };
                    }[];
                    options?: {
                        allowAlias?: boolean;
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    reservedRange?: {
                        start?: number;
                        end?: number;
                    }[];
                    reservedName?: string[];
                }[];
                extensionRange?: {
                    start?: number;
                    end?: number;
                    options?: {
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                oneofDecl?: {
                    name?: string;
                    options?: {
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    messageSetWireFormat?: boolean;
                    noStandardDescriptorAccessor?: boolean;
                    deprecated?: boolean;
                    mapEntry?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[];
            enumType?: {
                name?: string;
                value?: {
                    name?: string;
                    number?: number;
                    options?: {
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    allowAlias?: boolean;
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[];
            service?: {
                name?: string;
                method?: {
                    name?: string;
                    inputType?: string;
                    outputType?: string;
                    options?: {
                        deprecated?: boolean;
                        idempotencyLevel?: MethodOptions_IdempotencyLevel;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    clientStreaming?: boolean;
                    serverStreaming?: boolean;
                }[];
                options?: {
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            extension?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            options?: {
                javaPackage?: string;
                javaOuterClassname?: string;
                javaMultipleFiles?: boolean;
                javaGenerateEqualsAndHash?: boolean;
                javaStringCheckUtf8?: boolean;
                optimizeFor?: FileOptions_OptimizeMode;
                goPackage?: string;
                ccGenericServices?: boolean;
                javaGenericServices?: boolean;
                pyGenericServices?: boolean;
                phpGenericServices?: boolean;
                deprecated?: boolean;
                ccEnableArenas?: boolean;
                objcClassPrefix?: string;
                csharpNamespace?: string;
                swiftPrefix?: string;
                phpClassPrefix?: string;
                phpNamespace?: string;
                phpMetadataNamespace?: string;
                rubyPackage?: string;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            sourceCodeInfo?: {
                location?: {
                    path?: number[];
                    span?: number[];
                    leadingComments?: string;
                    trailingComments?: string;
                    leadingDetachedComments?: string[];
                }[];
            };
            syntax?: string;
        }[] & ({
            name?: string;
            package?: string;
            dependency?: string[];
            publicDependency?: number[];
            weakDependency?: number[];
            messageType?: {
                name?: string;
                field?: {
                    name?: string;
                    number?: number;
                    label?: FieldDescriptorProto_Label;
                    type?: FieldDescriptorProto_Type;
                    typeName?: string;
                    extendee?: string;
                    defaultValue?: string;
                    oneofIndex?: number;
                    jsonName?: string;
                    options?: {
                        ctype?: FieldOptions_CType;
                        packed?: boolean;
                        jstype?: FieldOptions_JSType;
                        lazy?: boolean;
                        deprecated?: boolean;
                        weak?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    proto3Optional?: boolean;
                }[];
                extension?: {
                    name?: string;
                    number?: number;
                    label?: FieldDescriptorProto_Label;
                    type?: FieldDescriptorProto_Type;
                    typeName?: string;
                    extendee?: string;
                    defaultValue?: string;
                    oneofIndex?: number;
                    jsonName?: string;
                    options?: {
                        ctype?: FieldOptions_CType;
                        packed?: boolean;
                        jstype?: FieldOptions_JSType;
                        lazy?: boolean;
                        deprecated?: boolean;
                        weak?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    proto3Optional?: boolean;
                }[];
                nestedType?: any[];
                enumType?: {
                    name?: string;
                    value?: {
                        name?: string;
                        number?: number;
                        options?: {
                            deprecated?: boolean;
                            uninterpretedOption?: {
                                name?: {
                                    namePart?: string;
                                    isExtension?: boolean;
                                }[];
                                identifierValue?: string;
                                positiveIntValue?: number;
                                negativeIntValue?: number;
                                doubleValue?: number;
                                stringValue?: Uint8Array;
                                aggregateValue?: string;
                            }[];
                        };
                    }[];
                    options?: {
                        allowAlias?: boolean;
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    reservedRange?: {
                        start?: number;
                        end?: number;
                    }[];
                    reservedName?: string[];
                }[];
                extensionRange?: {
                    start?: number;
                    end?: number;
                    options?: {
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                oneofDecl?: {
                    name?: string;
                    options?: {
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    messageSetWireFormat?: boolean;
                    noStandardDescriptorAccessor?: boolean;
                    deprecated?: boolean;
                    mapEntry?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[];
            enumType?: {
                name?: string;
                value?: {
                    name?: string;
                    number?: number;
                    options?: {
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    allowAlias?: boolean;
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[];
            service?: {
                name?: string;
                method?: {
                    name?: string;
                    inputType?: string;
                    outputType?: string;
                    options?: {
                        deprecated?: boolean;
                        idempotencyLevel?: MethodOptions_IdempotencyLevel;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    clientStreaming?: boolean;
                    serverStreaming?: boolean;
                }[];
                options?: {
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            extension?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            options?: {
                javaPackage?: string;
                javaOuterClassname?: string;
                javaMultipleFiles?: boolean;
                javaGenerateEqualsAndHash?: boolean;
                javaStringCheckUtf8?: boolean;
                optimizeFor?: FileOptions_OptimizeMode;
                goPackage?: string;
                ccGenericServices?: boolean;
                javaGenericServices?: boolean;
                pyGenericServices?: boolean;
                phpGenericServices?: boolean;
                deprecated?: boolean;
                ccEnableArenas?: boolean;
                objcClassPrefix?: string;
                csharpNamespace?: string;
                swiftPrefix?: string;
                phpClassPrefix?: string;
                phpNamespace?: string;
                phpMetadataNamespace?: string;
                rubyPackage?: string;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            sourceCodeInfo?: {
                location?: {
                    path?: number[];
                    span?: number[];
                    leadingComments?: string;
                    trailingComments?: string;
                    leadingDetachedComments?: string[];
                }[];
            };
            syntax?: string;
        } & {
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K in Exclude<keyof I["file"], keyof {
            name?: string;
            package?: string;
            dependency?: string[];
            publicDependency?: number[];
            weakDependency?: number[];
            messageType?: {
                name?: string;
                field?: {
                    name?: string;
                    number?: number;
                    label?: FieldDescriptorProto_Label;
                    type?: FieldDescriptorProto_Type;
                    typeName?: string;
                    extendee?: string;
                    defaultValue?: string;
                    oneofIndex?: number;
                    jsonName?: string;
                    options?: {
                        ctype?: FieldOptions_CType;
                        packed?: boolean;
                        jstype?: FieldOptions_JSType;
                        lazy?: boolean;
                        deprecated?: boolean;
                        weak?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    proto3Optional?: boolean;
                }[];
                extension?: {
                    name?: string;
                    number?: number;
                    label?: FieldDescriptorProto_Label;
                    type?: FieldDescriptorProto_Type;
                    typeName?: string;
                    extendee?: string;
                    defaultValue?: string;
                    oneofIndex?: number;
                    jsonName?: string;
                    options?: {
                        ctype?: FieldOptions_CType;
                        packed?: boolean;
                        jstype?: FieldOptions_JSType;
                        lazy?: boolean;
                        deprecated?: boolean;
                        weak?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    proto3Optional?: boolean;
                }[];
                nestedType?: any[];
                enumType?: {
                    name?: string;
                    value?: {
                        name?: string;
                        number?: number;
                        options?: {
                            deprecated?: boolean;
                            uninterpretedOption?: {
                                name?: {
                                    namePart?: string;
                                    isExtension?: boolean;
                                }[];
                                identifierValue?: string;
                                positiveIntValue?: number;
                                negativeIntValue?: number;
                                doubleValue?: number;
                                stringValue?: Uint8Array;
                                aggregateValue?: string;
                            }[];
                        };
                    }[];
                    options?: {
                        allowAlias?: boolean;
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    reservedRange?: {
                        start?: number;
                        end?: number;
                    }[];
                    reservedName?: string[];
                }[];
                extensionRange?: {
                    start?: number;
                    end?: number;
                    options?: {
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                oneofDecl?: {
                    name?: string;
                    options?: {
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    messageSetWireFormat?: boolean;
                    noStandardDescriptorAccessor?: boolean;
                    deprecated?: boolean;
                    mapEntry?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[];
            enumType?: {
                name?: string;
                value?: {
                    name?: string;
                    number?: number;
                    options?: {
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    allowAlias?: boolean;
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[];
            service?: {
                name?: string;
                method?: {
                    name?: string;
                    inputType?: string;
                    outputType?: string;
                    options?: {
                        deprecated?: boolean;
                        idempotencyLevel?: MethodOptions_IdempotencyLevel;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    clientStreaming?: boolean;
                    serverStreaming?: boolean;
                }[];
                options?: {
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            extension?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            options?: {
                javaPackage?: string;
                javaOuterClassname?: string;
                javaMultipleFiles?: boolean;
                javaGenerateEqualsAndHash?: boolean;
                javaStringCheckUtf8?: boolean;
                optimizeFor?: FileOptions_OptimizeMode;
                goPackage?: string;
                ccGenericServices?: boolean;
                javaGenericServices?: boolean;
                pyGenericServices?: boolean;
                phpGenericServices?: boolean;
                deprecated?: boolean;
                ccEnableArenas?: boolean;
                objcClassPrefix?: string;
                csharpNamespace?: string;
                swiftPrefix?: string;
                phpClassPrefix?: string;
                phpNamespace?: string;
                phpMetadataNamespace?: string;
                rubyPackage?: string;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            sourceCodeInfo?: {
                location?: {
                    path?: number[];
                    span?: number[];
                    leadingComments?: string;
                    trailingComments?: string;
                    leadingDetachedComments?: string[];
                }[];
            };
            syntax?: string;
        }[]>]: never; };
    } & { [K_1 in Exclude<keyof I, "file">]: never; }>(base?: I): FileDescriptorSet;
    fromPartial<I_1 extends {
        file?: {
            name?: string;
            package?: string;
            dependency?: string[];
            publicDependency?: number[];
            weakDependency?: number[];
            messageType?: {
                name?: string;
                field?: {
                    name?: string;
                    number?: number;
                    label?: FieldDescriptorProto_Label;
                    type?: FieldDescriptorProto_Type;
                    typeName?: string;
                    extendee?: string;
                    defaultValue?: string;
                    oneofIndex?: number;
                    jsonName?: string;
                    options?: {
                        ctype?: FieldOptions_CType;
                        packed?: boolean;
                        jstype?: FieldOptions_JSType;
                        lazy?: boolean;
                        deprecated?: boolean;
                        weak?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    proto3Optional?: boolean;
                }[];
                extension?: {
                    name?: string;
                    number?: number;
                    label?: FieldDescriptorProto_Label;
                    type?: FieldDescriptorProto_Type;
                    typeName?: string;
                    extendee?: string;
                    defaultValue?: string;
                    oneofIndex?: number;
                    jsonName?: string;
                    options?: {
                        ctype?: FieldOptions_CType;
                        packed?: boolean;
                        jstype?: FieldOptions_JSType;
                        lazy?: boolean;
                        deprecated?: boolean;
                        weak?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    proto3Optional?: boolean;
                }[];
                nestedType?: any[];
                enumType?: {
                    name?: string;
                    value?: {
                        name?: string;
                        number?: number;
                        options?: {
                            deprecated?: boolean;
                            uninterpretedOption?: {
                                name?: {
                                    namePart?: string;
                                    isExtension?: boolean;
                                }[];
                                identifierValue?: string;
                                positiveIntValue?: number;
                                negativeIntValue?: number;
                                doubleValue?: number;
                                stringValue?: Uint8Array;
                                aggregateValue?: string;
                            }[];
                        };
                    }[];
                    options?: {
                        allowAlias?: boolean;
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    reservedRange?: {
                        start?: number;
                        end?: number;
                    }[];
                    reservedName?: string[];
                }[];
                extensionRange?: {
                    start?: number;
                    end?: number;
                    options?: {
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                oneofDecl?: {
                    name?: string;
                    options?: {
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    messageSetWireFormat?: boolean;
                    noStandardDescriptorAccessor?: boolean;
                    deprecated?: boolean;
                    mapEntry?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[];
            enumType?: {
                name?: string;
                value?: {
                    name?: string;
                    number?: number;
                    options?: {
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    allowAlias?: boolean;
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[];
            service?: {
                name?: string;
                method?: {
                    name?: string;
                    inputType?: string;
                    outputType?: string;
                    options?: {
                        deprecated?: boolean;
                        idempotencyLevel?: MethodOptions_IdempotencyLevel;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    clientStreaming?: boolean;
                    serverStreaming?: boolean;
                }[];
                options?: {
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            extension?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            options?: {
                javaPackage?: string;
                javaOuterClassname?: string;
                javaMultipleFiles?: boolean;
                javaGenerateEqualsAndHash?: boolean;
                javaStringCheckUtf8?: boolean;
                optimizeFor?: FileOptions_OptimizeMode;
                goPackage?: string;
                ccGenericServices?: boolean;
                javaGenericServices?: boolean;
                pyGenericServices?: boolean;
                phpGenericServices?: boolean;
                deprecated?: boolean;
                ccEnableArenas?: boolean;
                objcClassPrefix?: string;
                csharpNamespace?: string;
                swiftPrefix?: string;
                phpClassPrefix?: string;
                phpNamespace?: string;
                phpMetadataNamespace?: string;
                rubyPackage?: string;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            sourceCodeInfo?: {
                location?: {
                    path?: number[];
                    span?: number[];
                    leadingComments?: string;
                    trailingComments?: string;
                    leadingDetachedComments?: string[];
                }[];
            };
            syntax?: string;
        }[];
    } & {
        file?: {
            name?: string;
            package?: string;
            dependency?: string[];
            publicDependency?: number[];
            weakDependency?: number[];
            messageType?: {
                name?: string;
                field?: {
                    name?: string;
                    number?: number;
                    label?: FieldDescriptorProto_Label;
                    type?: FieldDescriptorProto_Type;
                    typeName?: string;
                    extendee?: string;
                    defaultValue?: string;
                    oneofIndex?: number;
                    jsonName?: string;
                    options?: {
                        ctype?: FieldOptions_CType;
                        packed?: boolean;
                        jstype?: FieldOptions_JSType;
                        lazy?: boolean;
                        deprecated?: boolean;
                        weak?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    proto3Optional?: boolean;
                }[];
                extension?: {
                    name?: string;
                    number?: number;
                    label?: FieldDescriptorProto_Label;
                    type?: FieldDescriptorProto_Type;
                    typeName?: string;
                    extendee?: string;
                    defaultValue?: string;
                    oneofIndex?: number;
                    jsonName?: string;
                    options?: {
                        ctype?: FieldOptions_CType;
                        packed?: boolean;
                        jstype?: FieldOptions_JSType;
                        lazy?: boolean;
                        deprecated?: boolean;
                        weak?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    proto3Optional?: boolean;
                }[];
                nestedType?: any[];
                enumType?: {
                    name?: string;
                    value?: {
                        name?: string;
                        number?: number;
                        options?: {
                            deprecated?: boolean;
                            uninterpretedOption?: {
                                name?: {
                                    namePart?: string;
                                    isExtension?: boolean;
                                }[];
                                identifierValue?: string;
                                positiveIntValue?: number;
                                negativeIntValue?: number;
                                doubleValue?: number;
                                stringValue?: Uint8Array;
                                aggregateValue?: string;
                            }[];
                        };
                    }[];
                    options?: {
                        allowAlias?: boolean;
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    reservedRange?: {
                        start?: number;
                        end?: number;
                    }[];
                    reservedName?: string[];
                }[];
                extensionRange?: {
                    start?: number;
                    end?: number;
                    options?: {
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                oneofDecl?: {
                    name?: string;
                    options?: {
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    messageSetWireFormat?: boolean;
                    noStandardDescriptorAccessor?: boolean;
                    deprecated?: boolean;
                    mapEntry?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[];
            enumType?: {
                name?: string;
                value?: {
                    name?: string;
                    number?: number;
                    options?: {
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    allowAlias?: boolean;
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[];
            service?: {
                name?: string;
                method?: {
                    name?: string;
                    inputType?: string;
                    outputType?: string;
                    options?: {
                        deprecated?: boolean;
                        idempotencyLevel?: MethodOptions_IdempotencyLevel;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    clientStreaming?: boolean;
                    serverStreaming?: boolean;
                }[];
                options?: {
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            extension?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            options?: {
                javaPackage?: string;
                javaOuterClassname?: string;
                javaMultipleFiles?: boolean;
                javaGenerateEqualsAndHash?: boolean;
                javaStringCheckUtf8?: boolean;
                optimizeFor?: FileOptions_OptimizeMode;
                goPackage?: string;
                ccGenericServices?: boolean;
                javaGenericServices?: boolean;
                pyGenericServices?: boolean;
                phpGenericServices?: boolean;
                deprecated?: boolean;
                ccEnableArenas?: boolean;
                objcClassPrefix?: string;
                csharpNamespace?: string;
                swiftPrefix?: string;
                phpClassPrefix?: string;
                phpNamespace?: string;
                phpMetadataNamespace?: string;
                rubyPackage?: string;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            sourceCodeInfo?: {
                location?: {
                    path?: number[];
                    span?: number[];
                    leadingComments?: string;
                    trailingComments?: string;
                    leadingDetachedComments?: string[];
                }[];
            };
            syntax?: string;
        }[] & ({
            name?: string;
            package?: string;
            dependency?: string[];
            publicDependency?: number[];
            weakDependency?: number[];
            messageType?: {
                name?: string;
                field?: {
                    name?: string;
                    number?: number;
                    label?: FieldDescriptorProto_Label;
                    type?: FieldDescriptorProto_Type;
                    typeName?: string;
                    extendee?: string;
                    defaultValue?: string;
                    oneofIndex?: number;
                    jsonName?: string;
                    options?: {
                        ctype?: FieldOptions_CType;
                        packed?: boolean;
                        jstype?: FieldOptions_JSType;
                        lazy?: boolean;
                        deprecated?: boolean;
                        weak?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    proto3Optional?: boolean;
                }[];
                extension?: {
                    name?: string;
                    number?: number;
                    label?: FieldDescriptorProto_Label;
                    type?: FieldDescriptorProto_Type;
                    typeName?: string;
                    extendee?: string;
                    defaultValue?: string;
                    oneofIndex?: number;
                    jsonName?: string;
                    options?: {
                        ctype?: FieldOptions_CType;
                        packed?: boolean;
                        jstype?: FieldOptions_JSType;
                        lazy?: boolean;
                        deprecated?: boolean;
                        weak?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    proto3Optional?: boolean;
                }[];
                nestedType?: any[];
                enumType?: {
                    name?: string;
                    value?: {
                        name?: string;
                        number?: number;
                        options?: {
                            deprecated?: boolean;
                            uninterpretedOption?: {
                                name?: {
                                    namePart?: string;
                                    isExtension?: boolean;
                                }[];
                                identifierValue?: string;
                                positiveIntValue?: number;
                                negativeIntValue?: number;
                                doubleValue?: number;
                                stringValue?: Uint8Array;
                                aggregateValue?: string;
                            }[];
                        };
                    }[];
                    options?: {
                        allowAlias?: boolean;
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    reservedRange?: {
                        start?: number;
                        end?: number;
                    }[];
                    reservedName?: string[];
                }[];
                extensionRange?: {
                    start?: number;
                    end?: number;
                    options?: {
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                oneofDecl?: {
                    name?: string;
                    options?: {
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    messageSetWireFormat?: boolean;
                    noStandardDescriptorAccessor?: boolean;
                    deprecated?: boolean;
                    mapEntry?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[];
            enumType?: {
                name?: string;
                value?: {
                    name?: string;
                    number?: number;
                    options?: {
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    allowAlias?: boolean;
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[];
            service?: {
                name?: string;
                method?: {
                    name?: string;
                    inputType?: string;
                    outputType?: string;
                    options?: {
                        deprecated?: boolean;
                        idempotencyLevel?: MethodOptions_IdempotencyLevel;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    clientStreaming?: boolean;
                    serverStreaming?: boolean;
                }[];
                options?: {
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            extension?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            options?: {
                javaPackage?: string;
                javaOuterClassname?: string;
                javaMultipleFiles?: boolean;
                javaGenerateEqualsAndHash?: boolean;
                javaStringCheckUtf8?: boolean;
                optimizeFor?: FileOptions_OptimizeMode;
                goPackage?: string;
                ccGenericServices?: boolean;
                javaGenericServices?: boolean;
                pyGenericServices?: boolean;
                phpGenericServices?: boolean;
                deprecated?: boolean;
                ccEnableArenas?: boolean;
                objcClassPrefix?: string;
                csharpNamespace?: string;
                swiftPrefix?: string;
                phpClassPrefix?: string;
                phpNamespace?: string;
                phpMetadataNamespace?: string;
                rubyPackage?: string;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            sourceCodeInfo?: {
                location?: {
                    path?: number[];
                    span?: number[];
                    leadingComments?: string;
                    trailingComments?: string;
                    leadingDetachedComments?: string[];
                }[];
            };
            syntax?: string;
        } & {
            name?: string;
            package?: string;
            dependency?: string[] & string[] & {
                [x: string]: never;
            };
            publicDependency?: number[] & number[] & {
                [x: string]: never;
            };
            weakDependency?: number[] & number[] & {
                [x: string]: never;
            };
            messageType?: {
                name?: string;
                field?: {
                    name?: string;
                    number?: number;
                    label?: FieldDescriptorProto_Label;
                    type?: FieldDescriptorProto_Type;
                    typeName?: string;
                    extendee?: string;
                    defaultValue?: string;
                    oneofIndex?: number;
                    jsonName?: string;
                    options?: {
                        ctype?: FieldOptions_CType;
                        packed?: boolean;
                        jstype?: FieldOptions_JSType;
                        lazy?: boolean;
                        deprecated?: boolean;
                        weak?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    proto3Optional?: boolean;
                }[];
                extension?: {
                    name?: string;
                    number?: number;
                    label?: FieldDescriptorProto_Label;
                    type?: FieldDescriptorProto_Type;
                    typeName?: string;
                    extendee?: string;
                    defaultValue?: string;
                    oneofIndex?: number;
                    jsonName?: string;
                    options?: {
                        ctype?: FieldOptions_CType;
                        packed?: boolean;
                        jstype?: FieldOptions_JSType;
                        lazy?: boolean;
                        deprecated?: boolean;
                        weak?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    proto3Optional?: boolean;
                }[];
                nestedType?: any[];
                enumType?: {
                    name?: string;
                    value?: {
                        name?: string;
                        number?: number;
                        options?: {
                            deprecated?: boolean;
                            uninterpretedOption?: {
                                name?: {
                                    namePart?: string;
                                    isExtension?: boolean;
                                }[];
                                identifierValue?: string;
                                positiveIntValue?: number;
                                negativeIntValue?: number;
                                doubleValue?: number;
                                stringValue?: Uint8Array;
                                aggregateValue?: string;
                            }[];
                        };
                    }[];
                    options?: {
                        allowAlias?: boolean;
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    reservedRange?: {
                        start?: number;
                        end?: number;
                    }[];
                    reservedName?: string[];
                }[];
                extensionRange?: {
                    start?: number;
                    end?: number;
                    options?: {
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                oneofDecl?: {
                    name?: string;
                    options?: {
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    messageSetWireFormat?: boolean;
                    noStandardDescriptorAccessor?: boolean;
                    deprecated?: boolean;
                    mapEntry?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[] & ({
                name?: string;
                field?: {
                    name?: string;
                    number?: number;
                    label?: FieldDescriptorProto_Label;
                    type?: FieldDescriptorProto_Type;
                    typeName?: string;
                    extendee?: string;
                    defaultValue?: string;
                    oneofIndex?: number;
                    jsonName?: string;
                    options?: {
                        ctype?: FieldOptions_CType;
                        packed?: boolean;
                        jstype?: FieldOptions_JSType;
                        lazy?: boolean;
                        deprecated?: boolean;
                        weak?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    proto3Optional?: boolean;
                }[];
                extension?: {
                    name?: string;
                    number?: number;
                    label?: FieldDescriptorProto_Label;
                    type?: FieldDescriptorProto_Type;
                    typeName?: string;
                    extendee?: string;
                    defaultValue?: string;
                    oneofIndex?: number;
                    jsonName?: string;
                    options?: {
                        ctype?: FieldOptions_CType;
                        packed?: boolean;
                        jstype?: FieldOptions_JSType;
                        lazy?: boolean;
                        deprecated?: boolean;
                        weak?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    proto3Optional?: boolean;
                }[];
                nestedType?: any[];
                enumType?: {
                    name?: string;
                    value?: {
                        name?: string;
                        number?: number;
                        options?: {
                            deprecated?: boolean;
                            uninterpretedOption?: {
                                name?: {
                                    namePart?: string;
                                    isExtension?: boolean;
                                }[];
                                identifierValue?: string;
                                positiveIntValue?: number;
                                negativeIntValue?: number;
                                doubleValue?: number;
                                stringValue?: Uint8Array;
                                aggregateValue?: string;
                            }[];
                        };
                    }[];
                    options?: {
                        allowAlias?: boolean;
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    reservedRange?: {
                        start?: number;
                        end?: number;
                    }[];
                    reservedName?: string[];
                }[];
                extensionRange?: {
                    start?: number;
                    end?: number;
                    options?: {
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                oneofDecl?: {
                    name?: string;
                    options?: {
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    messageSetWireFormat?: boolean;
                    noStandardDescriptorAccessor?: boolean;
                    deprecated?: boolean;
                    mapEntry?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
            enumType?: {
                name?: string;
                value?: {
                    name?: string;
                    number?: number;
                    options?: {
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    allowAlias?: boolean;
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[] & ({
                name?: string;
                value?: {
                    name?: string;
                    number?: number;
                    options?: {
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    allowAlias?: boolean;
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
            service?: {
                name?: string;
                method?: {
                    name?: string;
                    inputType?: string;
                    outputType?: string;
                    options?: {
                        deprecated?: boolean;
                        idempotencyLevel?: MethodOptions_IdempotencyLevel;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    clientStreaming?: boolean;
                    serverStreaming?: boolean;
                }[];
                options?: {
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[] & ({
                name?: string;
                method?: {
                    name?: string;
                    inputType?: string;
                    outputType?: string;
                    options?: {
                        deprecated?: boolean;
                        idempotencyLevel?: MethodOptions_IdempotencyLevel;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    clientStreaming?: boolean;
                    serverStreaming?: boolean;
                }[];
                options?: {
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
            extension?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[] & ({
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
            options?: {
                javaPackage?: string;
                javaOuterClassname?: string;
                javaMultipleFiles?: boolean;
                javaGenerateEqualsAndHash?: boolean;
                javaStringCheckUtf8?: boolean;
                optimizeFor?: FileOptions_OptimizeMode;
                goPackage?: string;
                ccGenericServices?: boolean;
                javaGenericServices?: boolean;
                pyGenericServices?: boolean;
                phpGenericServices?: boolean;
                deprecated?: boolean;
                ccEnableArenas?: boolean;
                objcClassPrefix?: string;
                csharpNamespace?: string;
                swiftPrefix?: string;
                phpClassPrefix?: string;
                phpNamespace?: string;
                phpMetadataNamespace?: string;
                rubyPackage?: string;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            };
            sourceCodeInfo?: {
                location?: {
                    path?: number[];
                    span?: number[];
                    leadingComments?: string;
                    trailingComments?: string;
                    leadingDetachedComments?: string[];
                }[];
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            };
            syntax?: string;
        } & { [K_2 in Exclude<keyof I_1["file"][number], keyof FileDescriptorProto>]: never; })[] & { [K_3 in Exclude<keyof I_1["file"], keyof {
            name?: string;
            package?: string;
            dependency?: string[];
            publicDependency?: number[];
            weakDependency?: number[];
            messageType?: {
                name?: string;
                field?: {
                    name?: string;
                    number?: number;
                    label?: FieldDescriptorProto_Label;
                    type?: FieldDescriptorProto_Type;
                    typeName?: string;
                    extendee?: string;
                    defaultValue?: string;
                    oneofIndex?: number;
                    jsonName?: string;
                    options?: {
                        ctype?: FieldOptions_CType;
                        packed?: boolean;
                        jstype?: FieldOptions_JSType;
                        lazy?: boolean;
                        deprecated?: boolean;
                        weak?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    proto3Optional?: boolean;
                }[];
                extension?: {
                    name?: string;
                    number?: number;
                    label?: FieldDescriptorProto_Label;
                    type?: FieldDescriptorProto_Type;
                    typeName?: string;
                    extendee?: string;
                    defaultValue?: string;
                    oneofIndex?: number;
                    jsonName?: string;
                    options?: {
                        ctype?: FieldOptions_CType;
                        packed?: boolean;
                        jstype?: FieldOptions_JSType;
                        lazy?: boolean;
                        deprecated?: boolean;
                        weak?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    proto3Optional?: boolean;
                }[];
                nestedType?: any[];
                enumType?: {
                    name?: string;
                    value?: {
                        name?: string;
                        number?: number;
                        options?: {
                            deprecated?: boolean;
                            uninterpretedOption?: {
                                name?: {
                                    namePart?: string;
                                    isExtension?: boolean;
                                }[];
                                identifierValue?: string;
                                positiveIntValue?: number;
                                negativeIntValue?: number;
                                doubleValue?: number;
                                stringValue?: Uint8Array;
                                aggregateValue?: string;
                            }[];
                        };
                    }[];
                    options?: {
                        allowAlias?: boolean;
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    reservedRange?: {
                        start?: number;
                        end?: number;
                    }[];
                    reservedName?: string[];
                }[];
                extensionRange?: {
                    start?: number;
                    end?: number;
                    options?: {
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                oneofDecl?: {
                    name?: string;
                    options?: {
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    messageSetWireFormat?: boolean;
                    noStandardDescriptorAccessor?: boolean;
                    deprecated?: boolean;
                    mapEntry?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[];
            enumType?: {
                name?: string;
                value?: {
                    name?: string;
                    number?: number;
                    options?: {
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    allowAlias?: boolean;
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[];
            service?: {
                name?: string;
                method?: {
                    name?: string;
                    inputType?: string;
                    outputType?: string;
                    options?: {
                        deprecated?: boolean;
                        idempotencyLevel?: MethodOptions_IdempotencyLevel;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    clientStreaming?: boolean;
                    serverStreaming?: boolean;
                }[];
                options?: {
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            extension?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            options?: {
                javaPackage?: string;
                javaOuterClassname?: string;
                javaMultipleFiles?: boolean;
                javaGenerateEqualsAndHash?: boolean;
                javaStringCheckUtf8?: boolean;
                optimizeFor?: FileOptions_OptimizeMode;
                goPackage?: string;
                ccGenericServices?: boolean;
                javaGenericServices?: boolean;
                pyGenericServices?: boolean;
                phpGenericServices?: boolean;
                deprecated?: boolean;
                ccEnableArenas?: boolean;
                objcClassPrefix?: string;
                csharpNamespace?: string;
                swiftPrefix?: string;
                phpClassPrefix?: string;
                phpNamespace?: string;
                phpMetadataNamespace?: string;
                rubyPackage?: string;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            sourceCodeInfo?: {
                location?: {
                    path?: number[];
                    span?: number[];
                    leadingComments?: string;
                    trailingComments?: string;
                    leadingDetachedComments?: string[];
                }[];
            };
            syntax?: string;
        }[]>]: never; };
    } & { [K_4 in Exclude<keyof I_1, "file">]: never; }>(object: I_1): FileDescriptorSet;
};
export declare const FileDescriptorProto: {
    encode(message: FileDescriptorProto, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): FileDescriptorProto;
    fromJSON(object: any): FileDescriptorProto;
    toJSON(message: FileDescriptorProto): unknown;
    create<I extends {
        name?: string;
        package?: string;
        dependency?: string[];
        publicDependency?: number[];
        weakDependency?: number[];
        messageType?: {
            name?: string;
            field?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            extension?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            nestedType?: any[];
            enumType?: {
                name?: string;
                value?: {
                    name?: string;
                    number?: number;
                    options?: {
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    allowAlias?: boolean;
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[];
            extensionRange?: {
                start?: number;
                end?: number;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            oneofDecl?: {
                name?: string;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            options?: {
                messageSetWireFormat?: boolean;
                noStandardDescriptorAccessor?: boolean;
                deprecated?: boolean;
                mapEntry?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            reservedRange?: {
                start?: number;
                end?: number;
            }[];
            reservedName?: string[];
        }[];
        enumType?: {
            name?: string;
            value?: {
                name?: string;
                number?: number;
                options?: {
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            options?: {
                allowAlias?: boolean;
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            reservedRange?: {
                start?: number;
                end?: number;
            }[];
            reservedName?: string[];
        }[];
        service?: {
            name?: string;
            method?: {
                name?: string;
                inputType?: string;
                outputType?: string;
                options?: {
                    deprecated?: boolean;
                    idempotencyLevel?: MethodOptions_IdempotencyLevel;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                clientStreaming?: boolean;
                serverStreaming?: boolean;
            }[];
            options?: {
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
        }[];
        extension?: {
            name?: string;
            number?: number;
            label?: FieldDescriptorProto_Label;
            type?: FieldDescriptorProto_Type;
            typeName?: string;
            extendee?: string;
            defaultValue?: string;
            oneofIndex?: number;
            jsonName?: string;
            options?: {
                ctype?: FieldOptions_CType;
                packed?: boolean;
                jstype?: FieldOptions_JSType;
                lazy?: boolean;
                deprecated?: boolean;
                weak?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            proto3Optional?: boolean;
        }[];
        options?: {
            javaPackage?: string;
            javaOuterClassname?: string;
            javaMultipleFiles?: boolean;
            javaGenerateEqualsAndHash?: boolean;
            javaStringCheckUtf8?: boolean;
            optimizeFor?: FileOptions_OptimizeMode;
            goPackage?: string;
            ccGenericServices?: boolean;
            javaGenericServices?: boolean;
            pyGenericServices?: boolean;
            phpGenericServices?: boolean;
            deprecated?: boolean;
            ccEnableArenas?: boolean;
            objcClassPrefix?: string;
            csharpNamespace?: string;
            swiftPrefix?: string;
            phpClassPrefix?: string;
            phpNamespace?: string;
            phpMetadataNamespace?: string;
            rubyPackage?: string;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        };
        sourceCodeInfo?: {
            location?: {
                path?: number[];
                span?: number[];
                leadingComments?: string;
                trailingComments?: string;
                leadingDetachedComments?: string[];
            }[];
        };
        syntax?: string;
    } & {
        name?: string;
        package?: string;
        dependency?: string[] & string[] & { [K in Exclude<keyof I["dependency"], keyof string[]>]: never; };
        publicDependency?: number[] & number[] & { [K_1 in Exclude<keyof I["publicDependency"], keyof number[]>]: never; };
        weakDependency?: number[] & number[] & { [K_2 in Exclude<keyof I["weakDependency"], keyof number[]>]: never; };
        messageType?: {
            name?: string;
            field?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            extension?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            nestedType?: any[];
            enumType?: {
                name?: string;
                value?: {
                    name?: string;
                    number?: number;
                    options?: {
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    allowAlias?: boolean;
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[];
            extensionRange?: {
                start?: number;
                end?: number;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            oneofDecl?: {
                name?: string;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            options?: {
                messageSetWireFormat?: boolean;
                noStandardDescriptorAccessor?: boolean;
                deprecated?: boolean;
                mapEntry?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            reservedRange?: {
                start?: number;
                end?: number;
            }[];
            reservedName?: string[];
        }[] & ({
            name?: string;
            field?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            extension?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            nestedType?: any[];
            enumType?: {
                name?: string;
                value?: {
                    name?: string;
                    number?: number;
                    options?: {
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    allowAlias?: boolean;
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[];
            extensionRange?: {
                start?: number;
                end?: number;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            oneofDecl?: {
                name?: string;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            options?: {
                messageSetWireFormat?: boolean;
                noStandardDescriptorAccessor?: boolean;
                deprecated?: boolean;
                mapEntry?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            reservedRange?: {
                start?: number;
                end?: number;
            }[];
            reservedName?: string[];
        } & {
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K_3 in Exclude<keyof I["messageType"], keyof {
            name?: string;
            field?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            extension?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            nestedType?: any[];
            enumType?: {
                name?: string;
                value?: {
                    name?: string;
                    number?: number;
                    options?: {
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    allowAlias?: boolean;
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[];
            extensionRange?: {
                start?: number;
                end?: number;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            oneofDecl?: {
                name?: string;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            options?: {
                messageSetWireFormat?: boolean;
                noStandardDescriptorAccessor?: boolean;
                deprecated?: boolean;
                mapEntry?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            reservedRange?: {
                start?: number;
                end?: number;
            }[];
            reservedName?: string[];
        }[]>]: never; };
        enumType?: {
            name?: string;
            value?: {
                name?: string;
                number?: number;
                options?: {
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            options?: {
                allowAlias?: boolean;
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            reservedRange?: {
                start?: number;
                end?: number;
            }[];
            reservedName?: string[];
        }[] & ({
            name?: string;
            value?: {
                name?: string;
                number?: number;
                options?: {
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            options?: {
                allowAlias?: boolean;
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            reservedRange?: {
                start?: number;
                end?: number;
            }[];
            reservedName?: string[];
        } & {
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K_4 in Exclude<keyof I["enumType"], keyof {
            name?: string;
            value?: {
                name?: string;
                number?: number;
                options?: {
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            options?: {
                allowAlias?: boolean;
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            reservedRange?: {
                start?: number;
                end?: number;
            }[];
            reservedName?: string[];
        }[]>]: never; };
        service?: {
            name?: string;
            method?: {
                name?: string;
                inputType?: string;
                outputType?: string;
                options?: {
                    deprecated?: boolean;
                    idempotencyLevel?: MethodOptions_IdempotencyLevel;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                clientStreaming?: boolean;
                serverStreaming?: boolean;
            }[];
            options?: {
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
        }[] & ({
            name?: string;
            method?: {
                name?: string;
                inputType?: string;
                outputType?: string;
                options?: {
                    deprecated?: boolean;
                    idempotencyLevel?: MethodOptions_IdempotencyLevel;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                clientStreaming?: boolean;
                serverStreaming?: boolean;
            }[];
            options?: {
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
        } & {
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K_5 in Exclude<keyof I["service"], keyof {
            name?: string;
            method?: {
                name?: string;
                inputType?: string;
                outputType?: string;
                options?: {
                    deprecated?: boolean;
                    idempotencyLevel?: MethodOptions_IdempotencyLevel;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                clientStreaming?: boolean;
                serverStreaming?: boolean;
            }[];
            options?: {
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
        }[]>]: never; };
        extension?: {
            name?: string;
            number?: number;
            label?: FieldDescriptorProto_Label;
            type?: FieldDescriptorProto_Type;
            typeName?: string;
            extendee?: string;
            defaultValue?: string;
            oneofIndex?: number;
            jsonName?: string;
            options?: {
                ctype?: FieldOptions_CType;
                packed?: boolean;
                jstype?: FieldOptions_JSType;
                lazy?: boolean;
                deprecated?: boolean;
                weak?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            proto3Optional?: boolean;
        }[] & ({
            name?: string;
            number?: number;
            label?: FieldDescriptorProto_Label;
            type?: FieldDescriptorProto_Type;
            typeName?: string;
            extendee?: string;
            defaultValue?: string;
            oneofIndex?: number;
            jsonName?: string;
            options?: {
                ctype?: FieldOptions_CType;
                packed?: boolean;
                jstype?: FieldOptions_JSType;
                lazy?: boolean;
                deprecated?: boolean;
                weak?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            proto3Optional?: boolean;
        } & {
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K_6 in Exclude<keyof I["extension"], keyof {
            name?: string;
            number?: number;
            label?: FieldDescriptorProto_Label;
            type?: FieldDescriptorProto_Type;
            typeName?: string;
            extendee?: string;
            defaultValue?: string;
            oneofIndex?: number;
            jsonName?: string;
            options?: {
                ctype?: FieldOptions_CType;
                packed?: boolean;
                jstype?: FieldOptions_JSType;
                lazy?: boolean;
                deprecated?: boolean;
                weak?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            proto3Optional?: boolean;
        }[]>]: never; };
        options?: {
            javaPackage?: string;
            javaOuterClassname?: string;
            javaMultipleFiles?: boolean;
            javaGenerateEqualsAndHash?: boolean;
            javaStringCheckUtf8?: boolean;
            optimizeFor?: FileOptions_OptimizeMode;
            goPackage?: string;
            ccGenericServices?: boolean;
            javaGenericServices?: boolean;
            pyGenericServices?: boolean;
            phpGenericServices?: boolean;
            deprecated?: boolean;
            ccEnableArenas?: boolean;
            objcClassPrefix?: string;
            csharpNamespace?: string;
            swiftPrefix?: string;
            phpClassPrefix?: string;
            phpNamespace?: string;
            phpMetadataNamespace?: string;
            rubyPackage?: string;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        } & {
            javaPackage?: string;
            javaOuterClassname?: string;
            javaMultipleFiles?: boolean;
            javaGenerateEqualsAndHash?: boolean;
            javaStringCheckUtf8?: boolean;
            optimizeFor?: FileOptions_OptimizeMode;
            goPackage?: string;
            ccGenericServices?: boolean;
            javaGenericServices?: boolean;
            pyGenericServices?: boolean;
            phpGenericServices?: boolean;
            deprecated?: boolean;
            ccEnableArenas?: boolean;
            objcClassPrefix?: string;
            csharpNamespace?: string;
            swiftPrefix?: string;
            phpClassPrefix?: string;
            phpNamespace?: string;
            phpMetadataNamespace?: string;
            rubyPackage?: string;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[] & ({
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
        } & { [K_7 in Exclude<keyof I["options"], keyof FileOptions>]: never; };
        sourceCodeInfo?: {
            location?: {
                path?: number[];
                span?: number[];
                leadingComments?: string;
                trailingComments?: string;
                leadingDetachedComments?: string[];
            }[];
        } & {
            location?: {
                path?: number[];
                span?: number[];
                leadingComments?: string;
                trailingComments?: string;
                leadingDetachedComments?: string[];
            }[] & ({
                path?: number[];
                span?: number[];
                leadingComments?: string;
                trailingComments?: string;
                leadingDetachedComments?: string[];
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
        } & { [K_8 in Exclude<keyof I["sourceCodeInfo"], "location">]: never; };
        syntax?: string;
    } & { [K_9 in Exclude<keyof I, keyof FileDescriptorProto>]: never; }>(base?: I): FileDescriptorProto;
    fromPartial<I_1 extends {
        name?: string;
        package?: string;
        dependency?: string[];
        publicDependency?: number[];
        weakDependency?: number[];
        messageType?: {
            name?: string;
            field?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            extension?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            nestedType?: any[];
            enumType?: {
                name?: string;
                value?: {
                    name?: string;
                    number?: number;
                    options?: {
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    allowAlias?: boolean;
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[];
            extensionRange?: {
                start?: number;
                end?: number;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            oneofDecl?: {
                name?: string;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            options?: {
                messageSetWireFormat?: boolean;
                noStandardDescriptorAccessor?: boolean;
                deprecated?: boolean;
                mapEntry?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            reservedRange?: {
                start?: number;
                end?: number;
            }[];
            reservedName?: string[];
        }[];
        enumType?: {
            name?: string;
            value?: {
                name?: string;
                number?: number;
                options?: {
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            options?: {
                allowAlias?: boolean;
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            reservedRange?: {
                start?: number;
                end?: number;
            }[];
            reservedName?: string[];
        }[];
        service?: {
            name?: string;
            method?: {
                name?: string;
                inputType?: string;
                outputType?: string;
                options?: {
                    deprecated?: boolean;
                    idempotencyLevel?: MethodOptions_IdempotencyLevel;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                clientStreaming?: boolean;
                serverStreaming?: boolean;
            }[];
            options?: {
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
        }[];
        extension?: {
            name?: string;
            number?: number;
            label?: FieldDescriptorProto_Label;
            type?: FieldDescriptorProto_Type;
            typeName?: string;
            extendee?: string;
            defaultValue?: string;
            oneofIndex?: number;
            jsonName?: string;
            options?: {
                ctype?: FieldOptions_CType;
                packed?: boolean;
                jstype?: FieldOptions_JSType;
                lazy?: boolean;
                deprecated?: boolean;
                weak?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            proto3Optional?: boolean;
        }[];
        options?: {
            javaPackage?: string;
            javaOuterClassname?: string;
            javaMultipleFiles?: boolean;
            javaGenerateEqualsAndHash?: boolean;
            javaStringCheckUtf8?: boolean;
            optimizeFor?: FileOptions_OptimizeMode;
            goPackage?: string;
            ccGenericServices?: boolean;
            javaGenericServices?: boolean;
            pyGenericServices?: boolean;
            phpGenericServices?: boolean;
            deprecated?: boolean;
            ccEnableArenas?: boolean;
            objcClassPrefix?: string;
            csharpNamespace?: string;
            swiftPrefix?: string;
            phpClassPrefix?: string;
            phpNamespace?: string;
            phpMetadataNamespace?: string;
            rubyPackage?: string;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        };
        sourceCodeInfo?: {
            location?: {
                path?: number[];
                span?: number[];
                leadingComments?: string;
                trailingComments?: string;
                leadingDetachedComments?: string[];
            }[];
        };
        syntax?: string;
    } & {
        name?: string;
        package?: string;
        dependency?: string[] & string[] & { [K_10 in Exclude<keyof I_1["dependency"], keyof string[]>]: never; };
        publicDependency?: number[] & number[] & { [K_11 in Exclude<keyof I_1["publicDependency"], keyof number[]>]: never; };
        weakDependency?: number[] & number[] & { [K_12 in Exclude<keyof I_1["weakDependency"], keyof number[]>]: never; };
        messageType?: {
            name?: string;
            field?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            extension?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            nestedType?: any[];
            enumType?: {
                name?: string;
                value?: {
                    name?: string;
                    number?: number;
                    options?: {
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    allowAlias?: boolean;
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[];
            extensionRange?: {
                start?: number;
                end?: number;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            oneofDecl?: {
                name?: string;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            options?: {
                messageSetWireFormat?: boolean;
                noStandardDescriptorAccessor?: boolean;
                deprecated?: boolean;
                mapEntry?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            reservedRange?: {
                start?: number;
                end?: number;
            }[];
            reservedName?: string[];
        }[] & ({
            name?: string;
            field?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            extension?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            nestedType?: any[];
            enumType?: {
                name?: string;
                value?: {
                    name?: string;
                    number?: number;
                    options?: {
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    allowAlias?: boolean;
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[];
            extensionRange?: {
                start?: number;
                end?: number;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            oneofDecl?: {
                name?: string;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            options?: {
                messageSetWireFormat?: boolean;
                noStandardDescriptorAccessor?: boolean;
                deprecated?: boolean;
                mapEntry?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            reservedRange?: {
                start?: number;
                end?: number;
            }[];
            reservedName?: string[];
        } & {
            name?: string;
            field?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[] & ({
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
            extension?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[] & ({
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
            nestedType?: {
                name?: string;
                field?: {
                    name?: string;
                    number?: number;
                    label?: FieldDescriptorProto_Label;
                    type?: FieldDescriptorProto_Type;
                    typeName?: string;
                    extendee?: string;
                    defaultValue?: string;
                    oneofIndex?: number;
                    jsonName?: string;
                    options?: {
                        ctype?: FieldOptions_CType;
                        packed?: boolean;
                        jstype?: FieldOptions_JSType;
                        lazy?: boolean;
                        deprecated?: boolean;
                        weak?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    proto3Optional?: boolean;
                }[];
                extension?: {
                    name?: string;
                    number?: number;
                    label?: FieldDescriptorProto_Label;
                    type?: FieldDescriptorProto_Type;
                    typeName?: string;
                    extendee?: string;
                    defaultValue?: string;
                    oneofIndex?: number;
                    jsonName?: string;
                    options?: {
                        ctype?: FieldOptions_CType;
                        packed?: boolean;
                        jstype?: FieldOptions_JSType;
                        lazy?: boolean;
                        deprecated?: boolean;
                        weak?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    proto3Optional?: boolean;
                }[];
                nestedType?: any[];
                enumType?: {
                    name?: string;
                    value?: {
                        name?: string;
                        number?: number;
                        options?: {
                            deprecated?: boolean;
                            uninterpretedOption?: {
                                name?: {
                                    namePart?: string;
                                    isExtension?: boolean;
                                }[];
                                identifierValue?: string;
                                positiveIntValue?: number;
                                negativeIntValue?: number;
                                doubleValue?: number;
                                stringValue?: Uint8Array;
                                aggregateValue?: string;
                            }[];
                        };
                    }[];
                    options?: {
                        allowAlias?: boolean;
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    reservedRange?: {
                        start?: number;
                        end?: number;
                    }[];
                    reservedName?: string[];
                }[];
                extensionRange?: {
                    start?: number;
                    end?: number;
                    options?: {
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                oneofDecl?: {
                    name?: string;
                    options?: {
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    messageSetWireFormat?: boolean;
                    noStandardDescriptorAccessor?: boolean;
                    deprecated?: boolean;
                    mapEntry?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[] & ({
                name?: string;
                field?: {
                    name?: string;
                    number?: number;
                    label?: FieldDescriptorProto_Label;
                    type?: FieldDescriptorProto_Type;
                    typeName?: string;
                    extendee?: string;
                    defaultValue?: string;
                    oneofIndex?: number;
                    jsonName?: string;
                    options?: {
                        ctype?: FieldOptions_CType;
                        packed?: boolean;
                        jstype?: FieldOptions_JSType;
                        lazy?: boolean;
                        deprecated?: boolean;
                        weak?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    proto3Optional?: boolean;
                }[];
                extension?: {
                    name?: string;
                    number?: number;
                    label?: FieldDescriptorProto_Label;
                    type?: FieldDescriptorProto_Type;
                    typeName?: string;
                    extendee?: string;
                    defaultValue?: string;
                    oneofIndex?: number;
                    jsonName?: string;
                    options?: {
                        ctype?: FieldOptions_CType;
                        packed?: boolean;
                        jstype?: FieldOptions_JSType;
                        lazy?: boolean;
                        deprecated?: boolean;
                        weak?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    proto3Optional?: boolean;
                }[];
                nestedType?: any[];
                enumType?: {
                    name?: string;
                    value?: {
                        name?: string;
                        number?: number;
                        options?: {
                            deprecated?: boolean;
                            uninterpretedOption?: {
                                name?: {
                                    namePart?: string;
                                    isExtension?: boolean;
                                }[];
                                identifierValue?: string;
                                positiveIntValue?: number;
                                negativeIntValue?: number;
                                doubleValue?: number;
                                stringValue?: Uint8Array;
                                aggregateValue?: string;
                            }[];
                        };
                    }[];
                    options?: {
                        allowAlias?: boolean;
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    reservedRange?: {
                        start?: number;
                        end?: number;
                    }[];
                    reservedName?: string[];
                }[];
                extensionRange?: {
                    start?: number;
                    end?: number;
                    options?: {
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                oneofDecl?: {
                    name?: string;
                    options?: {
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    messageSetWireFormat?: boolean;
                    noStandardDescriptorAccessor?: boolean;
                    deprecated?: boolean;
                    mapEntry?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
            enumType?: {
                name?: string;
                value?: {
                    name?: string;
                    number?: number;
                    options?: {
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    allowAlias?: boolean;
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[] & ({
                name?: string;
                value?: {
                    name?: string;
                    number?: number;
                    options?: {
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    allowAlias?: boolean;
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
            extensionRange?: {
                start?: number;
                end?: number;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[] & ({
                start?: number;
                end?: number;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
            oneofDecl?: {
                name?: string;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[] & ({
                name?: string;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
            options?: {
                messageSetWireFormat?: boolean;
                noStandardDescriptorAccessor?: boolean;
                deprecated?: boolean;
                mapEntry?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            };
            reservedRange?: {
                start?: number;
                end?: number;
            }[] & ({
                start?: number;
                end?: number;
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
            reservedName?: string[] & string[] & {
                [x: string]: never;
            };
        } & { [K_13 in Exclude<keyof I_1["messageType"][number], keyof DescriptorProto>]: never; })[] & { [K_14 in Exclude<keyof I_1["messageType"], keyof {
            name?: string;
            field?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            extension?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            nestedType?: any[];
            enumType?: {
                name?: string;
                value?: {
                    name?: string;
                    number?: number;
                    options?: {
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    allowAlias?: boolean;
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[];
            extensionRange?: {
                start?: number;
                end?: number;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            oneofDecl?: {
                name?: string;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            options?: {
                messageSetWireFormat?: boolean;
                noStandardDescriptorAccessor?: boolean;
                deprecated?: boolean;
                mapEntry?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            reservedRange?: {
                start?: number;
                end?: number;
            }[];
            reservedName?: string[];
        }[]>]: never; };
        enumType?: {
            name?: string;
            value?: {
                name?: string;
                number?: number;
                options?: {
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            options?: {
                allowAlias?: boolean;
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            reservedRange?: {
                start?: number;
                end?: number;
            }[];
            reservedName?: string[];
        }[] & ({
            name?: string;
            value?: {
                name?: string;
                number?: number;
                options?: {
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            options?: {
                allowAlias?: boolean;
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            reservedRange?: {
                start?: number;
                end?: number;
            }[];
            reservedName?: string[];
        } & {
            name?: string;
            value?: {
                name?: string;
                number?: number;
                options?: {
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[] & ({
                name?: string;
                number?: number;
                options?: {
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
            options?: {
                allowAlias?: boolean;
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            };
            reservedRange?: {
                start?: number;
                end?: number;
            }[] & ({
                start?: number;
                end?: number;
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
            reservedName?: string[] & string[] & {
                [x: string]: never;
            };
        } & { [K_15 in Exclude<keyof I_1["enumType"][number], keyof EnumDescriptorProto>]: never; })[] & { [K_16 in Exclude<keyof I_1["enumType"], keyof {
            name?: string;
            value?: {
                name?: string;
                number?: number;
                options?: {
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            options?: {
                allowAlias?: boolean;
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            reservedRange?: {
                start?: number;
                end?: number;
            }[];
            reservedName?: string[];
        }[]>]: never; };
        service?: {
            name?: string;
            method?: {
                name?: string;
                inputType?: string;
                outputType?: string;
                options?: {
                    deprecated?: boolean;
                    idempotencyLevel?: MethodOptions_IdempotencyLevel;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                clientStreaming?: boolean;
                serverStreaming?: boolean;
            }[];
            options?: {
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
        }[] & ({
            name?: string;
            method?: {
                name?: string;
                inputType?: string;
                outputType?: string;
                options?: {
                    deprecated?: boolean;
                    idempotencyLevel?: MethodOptions_IdempotencyLevel;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                clientStreaming?: boolean;
                serverStreaming?: boolean;
            }[];
            options?: {
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
        } & {
            name?: string;
            method?: {
                name?: string;
                inputType?: string;
                outputType?: string;
                options?: {
                    deprecated?: boolean;
                    idempotencyLevel?: MethodOptions_IdempotencyLevel;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                clientStreaming?: boolean;
                serverStreaming?: boolean;
            }[] & ({
                name?: string;
                inputType?: string;
                outputType?: string;
                options?: {
                    deprecated?: boolean;
                    idempotencyLevel?: MethodOptions_IdempotencyLevel;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                clientStreaming?: boolean;
                serverStreaming?: boolean;
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
            options?: {
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            };
        } & { [K_17 in Exclude<keyof I_1["service"][number], keyof ServiceDescriptorProto>]: never; })[] & { [K_18 in Exclude<keyof I_1["service"], keyof {
            name?: string;
            method?: {
                name?: string;
                inputType?: string;
                outputType?: string;
                options?: {
                    deprecated?: boolean;
                    idempotencyLevel?: MethodOptions_IdempotencyLevel;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                clientStreaming?: boolean;
                serverStreaming?: boolean;
            }[];
            options?: {
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
        }[]>]: never; };
        extension?: {
            name?: string;
            number?: number;
            label?: FieldDescriptorProto_Label;
            type?: FieldDescriptorProto_Type;
            typeName?: string;
            extendee?: string;
            defaultValue?: string;
            oneofIndex?: number;
            jsonName?: string;
            options?: {
                ctype?: FieldOptions_CType;
                packed?: boolean;
                jstype?: FieldOptions_JSType;
                lazy?: boolean;
                deprecated?: boolean;
                weak?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            proto3Optional?: boolean;
        }[] & ({
            name?: string;
            number?: number;
            label?: FieldDescriptorProto_Label;
            type?: FieldDescriptorProto_Type;
            typeName?: string;
            extendee?: string;
            defaultValue?: string;
            oneofIndex?: number;
            jsonName?: string;
            options?: {
                ctype?: FieldOptions_CType;
                packed?: boolean;
                jstype?: FieldOptions_JSType;
                lazy?: boolean;
                deprecated?: boolean;
                weak?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            proto3Optional?: boolean;
        } & {
            name?: string;
            number?: number;
            label?: FieldDescriptorProto_Label;
            type?: FieldDescriptorProto_Type;
            typeName?: string;
            extendee?: string;
            defaultValue?: string;
            oneofIndex?: number;
            jsonName?: string;
            options?: {
                ctype?: FieldOptions_CType;
                packed?: boolean;
                jstype?: FieldOptions_JSType;
                lazy?: boolean;
                deprecated?: boolean;
                weak?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            };
            proto3Optional?: boolean;
        } & { [K_19 in Exclude<keyof I_1["extension"][number], keyof FieldDescriptorProto>]: never; })[] & { [K_20 in Exclude<keyof I_1["extension"], keyof {
            name?: string;
            number?: number;
            label?: FieldDescriptorProto_Label;
            type?: FieldDescriptorProto_Type;
            typeName?: string;
            extendee?: string;
            defaultValue?: string;
            oneofIndex?: number;
            jsonName?: string;
            options?: {
                ctype?: FieldOptions_CType;
                packed?: boolean;
                jstype?: FieldOptions_JSType;
                lazy?: boolean;
                deprecated?: boolean;
                weak?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            proto3Optional?: boolean;
        }[]>]: never; };
        options?: {
            javaPackage?: string;
            javaOuterClassname?: string;
            javaMultipleFiles?: boolean;
            javaGenerateEqualsAndHash?: boolean;
            javaStringCheckUtf8?: boolean;
            optimizeFor?: FileOptions_OptimizeMode;
            goPackage?: string;
            ccGenericServices?: boolean;
            javaGenericServices?: boolean;
            pyGenericServices?: boolean;
            phpGenericServices?: boolean;
            deprecated?: boolean;
            ccEnableArenas?: boolean;
            objcClassPrefix?: string;
            csharpNamespace?: string;
            swiftPrefix?: string;
            phpClassPrefix?: string;
            phpNamespace?: string;
            phpMetadataNamespace?: string;
            rubyPackage?: string;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        } & {
            javaPackage?: string;
            javaOuterClassname?: string;
            javaMultipleFiles?: boolean;
            javaGenerateEqualsAndHash?: boolean;
            javaStringCheckUtf8?: boolean;
            optimizeFor?: FileOptions_OptimizeMode;
            goPackage?: string;
            ccGenericServices?: boolean;
            javaGenericServices?: boolean;
            pyGenericServices?: boolean;
            phpGenericServices?: boolean;
            deprecated?: boolean;
            ccEnableArenas?: boolean;
            objcClassPrefix?: string;
            csharpNamespace?: string;
            swiftPrefix?: string;
            phpClassPrefix?: string;
            phpNamespace?: string;
            phpMetadataNamespace?: string;
            rubyPackage?: string;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[] & ({
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            } & {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[] & ({
                    namePart?: string;
                    isExtension?: boolean;
                } & {
                    namePart?: string;
                    isExtension?: boolean;
                } & { [K_21 in Exclude<keyof I_1["options"]["uninterpretedOption"][number]["name"][number], keyof UninterpretedOption_NamePart>]: never; })[] & { [K_22 in Exclude<keyof I_1["options"]["uninterpretedOption"][number]["name"], keyof {
                    namePart?: string;
                    isExtension?: boolean;
                }[]>]: never; };
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            } & { [K_23 in Exclude<keyof I_1["options"]["uninterpretedOption"][number], keyof UninterpretedOption>]: never; })[] & { [K_24 in Exclude<keyof I_1["options"]["uninterpretedOption"], keyof {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[]>]: never; };
        } & { [K_25 in Exclude<keyof I_1["options"], keyof FileOptions>]: never; };
        sourceCodeInfo?: {
            location?: {
                path?: number[];
                span?: number[];
                leadingComments?: string;
                trailingComments?: string;
                leadingDetachedComments?: string[];
            }[];
        } & {
            location?: {
                path?: number[];
                span?: number[];
                leadingComments?: string;
                trailingComments?: string;
                leadingDetachedComments?: string[];
            }[] & ({
                path?: number[];
                span?: number[];
                leadingComments?: string;
                trailingComments?: string;
                leadingDetachedComments?: string[];
            } & {
                path?: number[] & number[] & { [K_26 in Exclude<keyof I_1["sourceCodeInfo"]["location"][number]["path"], keyof number[]>]: never; };
                span?: number[] & number[] & { [K_27 in Exclude<keyof I_1["sourceCodeInfo"]["location"][number]["span"], keyof number[]>]: never; };
                leadingComments?: string;
                trailingComments?: string;
                leadingDetachedComments?: string[] & string[] & { [K_28 in Exclude<keyof I_1["sourceCodeInfo"]["location"][number]["leadingDetachedComments"], keyof string[]>]: never; };
            } & { [K_29 in Exclude<keyof I_1["sourceCodeInfo"]["location"][number], keyof SourceCodeInfo_Location>]: never; })[] & { [K_30 in Exclude<keyof I_1["sourceCodeInfo"]["location"], keyof {
                path?: number[];
                span?: number[];
                leadingComments?: string;
                trailingComments?: string;
                leadingDetachedComments?: string[];
            }[]>]: never; };
        } & { [K_31 in Exclude<keyof I_1["sourceCodeInfo"], "location">]: never; };
        syntax?: string;
    } & { [K_32 in Exclude<keyof I_1, keyof FileDescriptorProto>]: never; }>(object: I_1): FileDescriptorProto;
};
export declare const DescriptorProto: {
    encode(message: DescriptorProto, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DescriptorProto;
    fromJSON(object: any): DescriptorProto;
    toJSON(message: DescriptorProto): unknown;
    create<I extends {
        name?: string;
        field?: {
            name?: string;
            number?: number;
            label?: FieldDescriptorProto_Label;
            type?: FieldDescriptorProto_Type;
            typeName?: string;
            extendee?: string;
            defaultValue?: string;
            oneofIndex?: number;
            jsonName?: string;
            options?: {
                ctype?: FieldOptions_CType;
                packed?: boolean;
                jstype?: FieldOptions_JSType;
                lazy?: boolean;
                deprecated?: boolean;
                weak?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            proto3Optional?: boolean;
        }[];
        extension?: {
            name?: string;
            number?: number;
            label?: FieldDescriptorProto_Label;
            type?: FieldDescriptorProto_Type;
            typeName?: string;
            extendee?: string;
            defaultValue?: string;
            oneofIndex?: number;
            jsonName?: string;
            options?: {
                ctype?: FieldOptions_CType;
                packed?: boolean;
                jstype?: FieldOptions_JSType;
                lazy?: boolean;
                deprecated?: boolean;
                weak?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            proto3Optional?: boolean;
        }[];
        nestedType?: any[];
        enumType?: {
            name?: string;
            value?: {
                name?: string;
                number?: number;
                options?: {
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            options?: {
                allowAlias?: boolean;
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            reservedRange?: {
                start?: number;
                end?: number;
            }[];
            reservedName?: string[];
        }[];
        extensionRange?: {
            start?: number;
            end?: number;
            options?: {
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
        }[];
        oneofDecl?: {
            name?: string;
            options?: {
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
        }[];
        options?: {
            messageSetWireFormat?: boolean;
            noStandardDescriptorAccessor?: boolean;
            deprecated?: boolean;
            mapEntry?: boolean;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        };
        reservedRange?: {
            start?: number;
            end?: number;
        }[];
        reservedName?: string[];
    } & {
        name?: string;
        field?: {
            name?: string;
            number?: number;
            label?: FieldDescriptorProto_Label;
            type?: FieldDescriptorProto_Type;
            typeName?: string;
            extendee?: string;
            defaultValue?: string;
            oneofIndex?: number;
            jsonName?: string;
            options?: {
                ctype?: FieldOptions_CType;
                packed?: boolean;
                jstype?: FieldOptions_JSType;
                lazy?: boolean;
                deprecated?: boolean;
                weak?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            proto3Optional?: boolean;
        }[] & ({
            name?: string;
            number?: number;
            label?: FieldDescriptorProto_Label;
            type?: FieldDescriptorProto_Type;
            typeName?: string;
            extendee?: string;
            defaultValue?: string;
            oneofIndex?: number;
            jsonName?: string;
            options?: {
                ctype?: FieldOptions_CType;
                packed?: boolean;
                jstype?: FieldOptions_JSType;
                lazy?: boolean;
                deprecated?: boolean;
                weak?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            proto3Optional?: boolean;
        } & {
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K in Exclude<keyof I["field"], keyof {
            name?: string;
            number?: number;
            label?: FieldDescriptorProto_Label;
            type?: FieldDescriptorProto_Type;
            typeName?: string;
            extendee?: string;
            defaultValue?: string;
            oneofIndex?: number;
            jsonName?: string;
            options?: {
                ctype?: FieldOptions_CType;
                packed?: boolean;
                jstype?: FieldOptions_JSType;
                lazy?: boolean;
                deprecated?: boolean;
                weak?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            proto3Optional?: boolean;
        }[]>]: never; };
        extension?: {
            name?: string;
            number?: number;
            label?: FieldDescriptorProto_Label;
            type?: FieldDescriptorProto_Type;
            typeName?: string;
            extendee?: string;
            defaultValue?: string;
            oneofIndex?: number;
            jsonName?: string;
            options?: {
                ctype?: FieldOptions_CType;
                packed?: boolean;
                jstype?: FieldOptions_JSType;
                lazy?: boolean;
                deprecated?: boolean;
                weak?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            proto3Optional?: boolean;
        }[] & ({
            name?: string;
            number?: number;
            label?: FieldDescriptorProto_Label;
            type?: FieldDescriptorProto_Type;
            typeName?: string;
            extendee?: string;
            defaultValue?: string;
            oneofIndex?: number;
            jsonName?: string;
            options?: {
                ctype?: FieldOptions_CType;
                packed?: boolean;
                jstype?: FieldOptions_JSType;
                lazy?: boolean;
                deprecated?: boolean;
                weak?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            proto3Optional?: boolean;
        } & {
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K_1 in Exclude<keyof I["extension"], keyof {
            name?: string;
            number?: number;
            label?: FieldDescriptorProto_Label;
            type?: FieldDescriptorProto_Type;
            typeName?: string;
            extendee?: string;
            defaultValue?: string;
            oneofIndex?: number;
            jsonName?: string;
            options?: {
                ctype?: FieldOptions_CType;
                packed?: boolean;
                jstype?: FieldOptions_JSType;
                lazy?: boolean;
                deprecated?: boolean;
                weak?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            proto3Optional?: boolean;
        }[]>]: never; };
        nestedType?: {
            name?: string;
            field?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            extension?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            nestedType?: any[];
            enumType?: {
                name?: string;
                value?: {
                    name?: string;
                    number?: number;
                    options?: {
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    allowAlias?: boolean;
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[];
            extensionRange?: {
                start?: number;
                end?: number;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            oneofDecl?: {
                name?: string;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            options?: {
                messageSetWireFormat?: boolean;
                noStandardDescriptorAccessor?: boolean;
                deprecated?: boolean;
                mapEntry?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            reservedRange?: {
                start?: number;
                end?: number;
            }[];
            reservedName?: string[];
        }[] & ({
            name?: string;
            field?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            extension?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            nestedType?: any[];
            enumType?: {
                name?: string;
                value?: {
                    name?: string;
                    number?: number;
                    options?: {
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    allowAlias?: boolean;
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[];
            extensionRange?: {
                start?: number;
                end?: number;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            oneofDecl?: {
                name?: string;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            options?: {
                messageSetWireFormat?: boolean;
                noStandardDescriptorAccessor?: boolean;
                deprecated?: boolean;
                mapEntry?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            reservedRange?: {
                start?: number;
                end?: number;
            }[];
            reservedName?: string[];
        } & {
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K_2 in Exclude<keyof I["nestedType"], keyof {
            name?: string;
            field?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            extension?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            nestedType?: any[];
            enumType?: {
                name?: string;
                value?: {
                    name?: string;
                    number?: number;
                    options?: {
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    allowAlias?: boolean;
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[];
            extensionRange?: {
                start?: number;
                end?: number;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            oneofDecl?: {
                name?: string;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            options?: {
                messageSetWireFormat?: boolean;
                noStandardDescriptorAccessor?: boolean;
                deprecated?: boolean;
                mapEntry?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            reservedRange?: {
                start?: number;
                end?: number;
            }[];
            reservedName?: string[];
        }[]>]: never; };
        enumType?: {
            name?: string;
            value?: {
                name?: string;
                number?: number;
                options?: {
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            options?: {
                allowAlias?: boolean;
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            reservedRange?: {
                start?: number;
                end?: number;
            }[];
            reservedName?: string[];
        }[] & ({
            name?: string;
            value?: {
                name?: string;
                number?: number;
                options?: {
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            options?: {
                allowAlias?: boolean;
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            reservedRange?: {
                start?: number;
                end?: number;
            }[];
            reservedName?: string[];
        } & {
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K_3 in Exclude<keyof I["enumType"], keyof {
            name?: string;
            value?: {
                name?: string;
                number?: number;
                options?: {
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            options?: {
                allowAlias?: boolean;
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            reservedRange?: {
                start?: number;
                end?: number;
            }[];
            reservedName?: string[];
        }[]>]: never; };
        extensionRange?: {
            start?: number;
            end?: number;
            options?: {
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
        }[] & ({
            start?: number;
            end?: number;
            options?: {
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
        } & {
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K_4 in Exclude<keyof I["extensionRange"], keyof {
            start?: number;
            end?: number;
            options?: {
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
        }[]>]: never; };
        oneofDecl?: {
            name?: string;
            options?: {
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
        }[] & ({
            name?: string;
            options?: {
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
        } & {
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K_5 in Exclude<keyof I["oneofDecl"], keyof {
            name?: string;
            options?: {
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
        }[]>]: never; };
        options?: {
            messageSetWireFormat?: boolean;
            noStandardDescriptorAccessor?: boolean;
            deprecated?: boolean;
            mapEntry?: boolean;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        } & {
            messageSetWireFormat?: boolean;
            noStandardDescriptorAccessor?: boolean;
            deprecated?: boolean;
            mapEntry?: boolean;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[] & ({
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
        } & { [K_6 in Exclude<keyof I["options"], keyof MessageOptions>]: never; };
        reservedRange?: {
            start?: number;
            end?: number;
        }[] & ({
            start?: number;
            end?: number;
        } & {
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K_7 in Exclude<keyof I["reservedRange"], keyof {
            start?: number;
            end?: number;
        }[]>]: never; };
        reservedName?: string[] & string[] & { [K_8 in Exclude<keyof I["reservedName"], keyof string[]>]: never; };
    } & { [K_9 in Exclude<keyof I, keyof DescriptorProto>]: never; }>(base?: I): DescriptorProto;
    fromPartial<I_1 extends {
        name?: string;
        field?: {
            name?: string;
            number?: number;
            label?: FieldDescriptorProto_Label;
            type?: FieldDescriptorProto_Type;
            typeName?: string;
            extendee?: string;
            defaultValue?: string;
            oneofIndex?: number;
            jsonName?: string;
            options?: {
                ctype?: FieldOptions_CType;
                packed?: boolean;
                jstype?: FieldOptions_JSType;
                lazy?: boolean;
                deprecated?: boolean;
                weak?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            proto3Optional?: boolean;
        }[];
        extension?: {
            name?: string;
            number?: number;
            label?: FieldDescriptorProto_Label;
            type?: FieldDescriptorProto_Type;
            typeName?: string;
            extendee?: string;
            defaultValue?: string;
            oneofIndex?: number;
            jsonName?: string;
            options?: {
                ctype?: FieldOptions_CType;
                packed?: boolean;
                jstype?: FieldOptions_JSType;
                lazy?: boolean;
                deprecated?: boolean;
                weak?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            proto3Optional?: boolean;
        }[];
        nestedType?: any[];
        enumType?: {
            name?: string;
            value?: {
                name?: string;
                number?: number;
                options?: {
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            options?: {
                allowAlias?: boolean;
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            reservedRange?: {
                start?: number;
                end?: number;
            }[];
            reservedName?: string[];
        }[];
        extensionRange?: {
            start?: number;
            end?: number;
            options?: {
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
        }[];
        oneofDecl?: {
            name?: string;
            options?: {
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
        }[];
        options?: {
            messageSetWireFormat?: boolean;
            noStandardDescriptorAccessor?: boolean;
            deprecated?: boolean;
            mapEntry?: boolean;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        };
        reservedRange?: {
            start?: number;
            end?: number;
        }[];
        reservedName?: string[];
    } & {
        name?: string;
        field?: {
            name?: string;
            number?: number;
            label?: FieldDescriptorProto_Label;
            type?: FieldDescriptorProto_Type;
            typeName?: string;
            extendee?: string;
            defaultValue?: string;
            oneofIndex?: number;
            jsonName?: string;
            options?: {
                ctype?: FieldOptions_CType;
                packed?: boolean;
                jstype?: FieldOptions_JSType;
                lazy?: boolean;
                deprecated?: boolean;
                weak?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            proto3Optional?: boolean;
        }[] & ({
            name?: string;
            number?: number;
            label?: FieldDescriptorProto_Label;
            type?: FieldDescriptorProto_Type;
            typeName?: string;
            extendee?: string;
            defaultValue?: string;
            oneofIndex?: number;
            jsonName?: string;
            options?: {
                ctype?: FieldOptions_CType;
                packed?: boolean;
                jstype?: FieldOptions_JSType;
                lazy?: boolean;
                deprecated?: boolean;
                weak?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            proto3Optional?: boolean;
        } & {
            name?: string;
            number?: number;
            label?: FieldDescriptorProto_Label;
            type?: FieldDescriptorProto_Type;
            typeName?: string;
            extendee?: string;
            defaultValue?: string;
            oneofIndex?: number;
            jsonName?: string;
            options?: {
                ctype?: FieldOptions_CType;
                packed?: boolean;
                jstype?: FieldOptions_JSType;
                lazy?: boolean;
                deprecated?: boolean;
                weak?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            };
            proto3Optional?: boolean;
        } & { [K_10 in Exclude<keyof I_1["field"][number], keyof FieldDescriptorProto>]: never; })[] & { [K_11 in Exclude<keyof I_1["field"], keyof {
            name?: string;
            number?: number;
            label?: FieldDescriptorProto_Label;
            type?: FieldDescriptorProto_Type;
            typeName?: string;
            extendee?: string;
            defaultValue?: string;
            oneofIndex?: number;
            jsonName?: string;
            options?: {
                ctype?: FieldOptions_CType;
                packed?: boolean;
                jstype?: FieldOptions_JSType;
                lazy?: boolean;
                deprecated?: boolean;
                weak?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            proto3Optional?: boolean;
        }[]>]: never; };
        extension?: {
            name?: string;
            number?: number;
            label?: FieldDescriptorProto_Label;
            type?: FieldDescriptorProto_Type;
            typeName?: string;
            extendee?: string;
            defaultValue?: string;
            oneofIndex?: number;
            jsonName?: string;
            options?: {
                ctype?: FieldOptions_CType;
                packed?: boolean;
                jstype?: FieldOptions_JSType;
                lazy?: boolean;
                deprecated?: boolean;
                weak?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            proto3Optional?: boolean;
        }[] & ({
            name?: string;
            number?: number;
            label?: FieldDescriptorProto_Label;
            type?: FieldDescriptorProto_Type;
            typeName?: string;
            extendee?: string;
            defaultValue?: string;
            oneofIndex?: number;
            jsonName?: string;
            options?: {
                ctype?: FieldOptions_CType;
                packed?: boolean;
                jstype?: FieldOptions_JSType;
                lazy?: boolean;
                deprecated?: boolean;
                weak?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            proto3Optional?: boolean;
        } & {
            name?: string;
            number?: number;
            label?: FieldDescriptorProto_Label;
            type?: FieldDescriptorProto_Type;
            typeName?: string;
            extendee?: string;
            defaultValue?: string;
            oneofIndex?: number;
            jsonName?: string;
            options?: {
                ctype?: FieldOptions_CType;
                packed?: boolean;
                jstype?: FieldOptions_JSType;
                lazy?: boolean;
                deprecated?: boolean;
                weak?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            };
            proto3Optional?: boolean;
        } & { [K_12 in Exclude<keyof I_1["extension"][number], keyof FieldDescriptorProto>]: never; })[] & { [K_13 in Exclude<keyof I_1["extension"], keyof {
            name?: string;
            number?: number;
            label?: FieldDescriptorProto_Label;
            type?: FieldDescriptorProto_Type;
            typeName?: string;
            extendee?: string;
            defaultValue?: string;
            oneofIndex?: number;
            jsonName?: string;
            options?: {
                ctype?: FieldOptions_CType;
                packed?: boolean;
                jstype?: FieldOptions_JSType;
                lazy?: boolean;
                deprecated?: boolean;
                weak?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            proto3Optional?: boolean;
        }[]>]: never; };
        nestedType?: {
            name?: string;
            field?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            extension?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            nestedType?: any[];
            enumType?: {
                name?: string;
                value?: {
                    name?: string;
                    number?: number;
                    options?: {
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    allowAlias?: boolean;
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[];
            extensionRange?: {
                start?: number;
                end?: number;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            oneofDecl?: {
                name?: string;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            options?: {
                messageSetWireFormat?: boolean;
                noStandardDescriptorAccessor?: boolean;
                deprecated?: boolean;
                mapEntry?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            reservedRange?: {
                start?: number;
                end?: number;
            }[];
            reservedName?: string[];
        }[] & ({
            name?: string;
            field?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            extension?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            nestedType?: any[];
            enumType?: {
                name?: string;
                value?: {
                    name?: string;
                    number?: number;
                    options?: {
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    allowAlias?: boolean;
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[];
            extensionRange?: {
                start?: number;
                end?: number;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            oneofDecl?: {
                name?: string;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            options?: {
                messageSetWireFormat?: boolean;
                noStandardDescriptorAccessor?: boolean;
                deprecated?: boolean;
                mapEntry?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            reservedRange?: {
                start?: number;
                end?: number;
            }[];
            reservedName?: string[];
        } & {
            name?: string;
            field?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[] & ({
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
            extension?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[] & ({
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
            nestedType?: {
                name?: string;
                field?: {
                    name?: string;
                    number?: number;
                    label?: FieldDescriptorProto_Label;
                    type?: FieldDescriptorProto_Type;
                    typeName?: string;
                    extendee?: string;
                    defaultValue?: string;
                    oneofIndex?: number;
                    jsonName?: string;
                    options?: {
                        ctype?: FieldOptions_CType;
                        packed?: boolean;
                        jstype?: FieldOptions_JSType;
                        lazy?: boolean;
                        deprecated?: boolean;
                        weak?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    proto3Optional?: boolean;
                }[];
                extension?: {
                    name?: string;
                    number?: number;
                    label?: FieldDescriptorProto_Label;
                    type?: FieldDescriptorProto_Type;
                    typeName?: string;
                    extendee?: string;
                    defaultValue?: string;
                    oneofIndex?: number;
                    jsonName?: string;
                    options?: {
                        ctype?: FieldOptions_CType;
                        packed?: boolean;
                        jstype?: FieldOptions_JSType;
                        lazy?: boolean;
                        deprecated?: boolean;
                        weak?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    proto3Optional?: boolean;
                }[];
                nestedType?: any[];
                enumType?: {
                    name?: string;
                    value?: {
                        name?: string;
                        number?: number;
                        options?: {
                            deprecated?: boolean;
                            uninterpretedOption?: {
                                name?: {
                                    namePart?: string;
                                    isExtension?: boolean;
                                }[];
                                identifierValue?: string;
                                positiveIntValue?: number;
                                negativeIntValue?: number;
                                doubleValue?: number;
                                stringValue?: Uint8Array;
                                aggregateValue?: string;
                            }[];
                        };
                    }[];
                    options?: {
                        allowAlias?: boolean;
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    reservedRange?: {
                        start?: number;
                        end?: number;
                    }[];
                    reservedName?: string[];
                }[];
                extensionRange?: {
                    start?: number;
                    end?: number;
                    options?: {
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                oneofDecl?: {
                    name?: string;
                    options?: {
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    messageSetWireFormat?: boolean;
                    noStandardDescriptorAccessor?: boolean;
                    deprecated?: boolean;
                    mapEntry?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[] & ({
                name?: string;
                field?: {
                    name?: string;
                    number?: number;
                    label?: FieldDescriptorProto_Label;
                    type?: FieldDescriptorProto_Type;
                    typeName?: string;
                    extendee?: string;
                    defaultValue?: string;
                    oneofIndex?: number;
                    jsonName?: string;
                    options?: {
                        ctype?: FieldOptions_CType;
                        packed?: boolean;
                        jstype?: FieldOptions_JSType;
                        lazy?: boolean;
                        deprecated?: boolean;
                        weak?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    proto3Optional?: boolean;
                }[];
                extension?: {
                    name?: string;
                    number?: number;
                    label?: FieldDescriptorProto_Label;
                    type?: FieldDescriptorProto_Type;
                    typeName?: string;
                    extendee?: string;
                    defaultValue?: string;
                    oneofIndex?: number;
                    jsonName?: string;
                    options?: {
                        ctype?: FieldOptions_CType;
                        packed?: boolean;
                        jstype?: FieldOptions_JSType;
                        lazy?: boolean;
                        deprecated?: boolean;
                        weak?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    proto3Optional?: boolean;
                }[];
                nestedType?: any[];
                enumType?: {
                    name?: string;
                    value?: {
                        name?: string;
                        number?: number;
                        options?: {
                            deprecated?: boolean;
                            uninterpretedOption?: {
                                name?: {
                                    namePart?: string;
                                    isExtension?: boolean;
                                }[];
                                identifierValue?: string;
                                positiveIntValue?: number;
                                negativeIntValue?: number;
                                doubleValue?: number;
                                stringValue?: Uint8Array;
                                aggregateValue?: string;
                            }[];
                        };
                    }[];
                    options?: {
                        allowAlias?: boolean;
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                    reservedRange?: {
                        start?: number;
                        end?: number;
                    }[];
                    reservedName?: string[];
                }[];
                extensionRange?: {
                    start?: number;
                    end?: number;
                    options?: {
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                oneofDecl?: {
                    name?: string;
                    options?: {
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    messageSetWireFormat?: boolean;
                    noStandardDescriptorAccessor?: boolean;
                    deprecated?: boolean;
                    mapEntry?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
            enumType?: {
                name?: string;
                value?: {
                    name?: string;
                    number?: number;
                    options?: {
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    allowAlias?: boolean;
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[] & ({
                name?: string;
                value?: {
                    name?: string;
                    number?: number;
                    options?: {
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    allowAlias?: boolean;
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
            extensionRange?: {
                start?: number;
                end?: number;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[] & ({
                start?: number;
                end?: number;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
            oneofDecl?: {
                name?: string;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[] & ({
                name?: string;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
            options?: {
                messageSetWireFormat?: boolean;
                noStandardDescriptorAccessor?: boolean;
                deprecated?: boolean;
                mapEntry?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            };
            reservedRange?: {
                start?: number;
                end?: number;
            }[] & ({
                start?: number;
                end?: number;
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
            reservedName?: string[] & string[] & {
                [x: string]: never;
            };
        } & { [K_14 in Exclude<keyof I_1["nestedType"][number], keyof DescriptorProto>]: never; })[] & { [K_15 in Exclude<keyof I_1["nestedType"], keyof {
            name?: string;
            field?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            extension?: {
                name?: string;
                number?: number;
                label?: FieldDescriptorProto_Label;
                type?: FieldDescriptorProto_Type;
                typeName?: string;
                extendee?: string;
                defaultValue?: string;
                oneofIndex?: number;
                jsonName?: string;
                options?: {
                    ctype?: FieldOptions_CType;
                    packed?: boolean;
                    jstype?: FieldOptions_JSType;
                    lazy?: boolean;
                    deprecated?: boolean;
                    weak?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                proto3Optional?: boolean;
            }[];
            nestedType?: any[];
            enumType?: {
                name?: string;
                value?: {
                    name?: string;
                    number?: number;
                    options?: {
                        deprecated?: boolean;
                        uninterpretedOption?: {
                            name?: {
                                namePart?: string;
                                isExtension?: boolean;
                            }[];
                            identifierValue?: string;
                            positiveIntValue?: number;
                            negativeIntValue?: number;
                            doubleValue?: number;
                            stringValue?: Uint8Array;
                            aggregateValue?: string;
                        }[];
                    };
                }[];
                options?: {
                    allowAlias?: boolean;
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
                reservedRange?: {
                    start?: number;
                    end?: number;
                }[];
                reservedName?: string[];
            }[];
            extensionRange?: {
                start?: number;
                end?: number;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            oneofDecl?: {
                name?: string;
                options?: {
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            options?: {
                messageSetWireFormat?: boolean;
                noStandardDescriptorAccessor?: boolean;
                deprecated?: boolean;
                mapEntry?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            reservedRange?: {
                start?: number;
                end?: number;
            }[];
            reservedName?: string[];
        }[]>]: never; };
        enumType?: {
            name?: string;
            value?: {
                name?: string;
                number?: number;
                options?: {
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            options?: {
                allowAlias?: boolean;
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            reservedRange?: {
                start?: number;
                end?: number;
            }[];
            reservedName?: string[];
        }[] & ({
            name?: string;
            value?: {
                name?: string;
                number?: number;
                options?: {
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            options?: {
                allowAlias?: boolean;
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            reservedRange?: {
                start?: number;
                end?: number;
            }[];
            reservedName?: string[];
        } & {
            name?: string;
            value?: {
                name?: string;
                number?: number;
                options?: {
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[] & ({
                name?: string;
                number?: number;
                options?: {
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
            options?: {
                allowAlias?: boolean;
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            };
            reservedRange?: {
                start?: number;
                end?: number;
            }[] & ({
                start?: number;
                end?: number;
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
            reservedName?: string[] & string[] & {
                [x: string]: never;
            };
        } & { [K_16 in Exclude<keyof I_1["enumType"][number], keyof EnumDescriptorProto>]: never; })[] & { [K_17 in Exclude<keyof I_1["enumType"], keyof {
            name?: string;
            value?: {
                name?: string;
                number?: number;
                options?: {
                    deprecated?: boolean;
                    uninterpretedOption?: {
                        name?: {
                            namePart?: string;
                            isExtension?: boolean;
                        }[];
                        identifierValue?: string;
                        positiveIntValue?: number;
                        negativeIntValue?: number;
                        doubleValue?: number;
                        stringValue?: Uint8Array;
                        aggregateValue?: string;
                    }[];
                };
            }[];
            options?: {
                allowAlias?: boolean;
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            reservedRange?: {
                start?: number;
                end?: number;
            }[];
            reservedName?: string[];
        }[]>]: never; };
        extensionRange?: {
            start?: number;
            end?: number;
            options?: {
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
        }[] & ({
            start?: number;
            end?: number;
            options?: {
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
        } & {
            start?: number;
            end?: number;
            options?: {
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            };
        } & { [K_18 in Exclude<keyof I_1["extensionRange"][number], keyof DescriptorProto_ExtensionRange>]: never; })[] & { [K_19 in Exclude<keyof I_1["extensionRange"], keyof {
            start?: number;
            end?: number;
            options?: {
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
        }[]>]: never; };
        oneofDecl?: {
            name?: string;
            options?: {
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
        }[] & ({
            name?: string;
            options?: {
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
        } & {
            name?: string;
            options?: {
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            };
        } & { [K_20 in Exclude<keyof I_1["oneofDecl"][number], keyof OneofDescriptorProto>]: never; })[] & { [K_21 in Exclude<keyof I_1["oneofDecl"], keyof {
            name?: string;
            options?: {
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
        }[]>]: never; };
        options?: {
            messageSetWireFormat?: boolean;
            noStandardDescriptorAccessor?: boolean;
            deprecated?: boolean;
            mapEntry?: boolean;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        } & {
            messageSetWireFormat?: boolean;
            noStandardDescriptorAccessor?: boolean;
            deprecated?: boolean;
            mapEntry?: boolean;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[] & ({
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            } & {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[] & ({
                    namePart?: string;
                    isExtension?: boolean;
                } & {
                    namePart?: string;
                    isExtension?: boolean;
                } & { [K_22 in Exclude<keyof I_1["options"]["uninterpretedOption"][number]["name"][number], keyof UninterpretedOption_NamePart>]: never; })[] & { [K_23 in Exclude<keyof I_1["options"]["uninterpretedOption"][number]["name"], keyof {
                    namePart?: string;
                    isExtension?: boolean;
                }[]>]: never; };
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            } & { [K_24 in Exclude<keyof I_1["options"]["uninterpretedOption"][number], keyof UninterpretedOption>]: never; })[] & { [K_25 in Exclude<keyof I_1["options"]["uninterpretedOption"], keyof {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[]>]: never; };
        } & { [K_26 in Exclude<keyof I_1["options"], keyof MessageOptions>]: never; };
        reservedRange?: {
            start?: number;
            end?: number;
        }[] & ({
            start?: number;
            end?: number;
        } & {
            start?: number;
            end?: number;
        } & { [K_27 in Exclude<keyof I_1["reservedRange"][number], keyof DescriptorProto_ReservedRange>]: never; })[] & { [K_28 in Exclude<keyof I_1["reservedRange"], keyof {
            start?: number;
            end?: number;
        }[]>]: never; };
        reservedName?: string[] & string[] & { [K_29 in Exclude<keyof I_1["reservedName"], keyof string[]>]: never; };
    } & { [K_30 in Exclude<keyof I_1, keyof DescriptorProto>]: never; }>(object: I_1): DescriptorProto;
};
export declare const DescriptorProto_ExtensionRange: {
    encode(message: DescriptorProto_ExtensionRange, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DescriptorProto_ExtensionRange;
    fromJSON(object: any): DescriptorProto_ExtensionRange;
    toJSON(message: DescriptorProto_ExtensionRange): unknown;
    create<I extends {
        start?: number;
        end?: number;
        options?: {
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        };
    } & {
        start?: number;
        end?: number;
        options?: {
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        } & {
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[] & ({
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
        } & { [K in Exclude<keyof I["options"], "uninterpretedOption">]: never; };
    } & { [K_1 in Exclude<keyof I, keyof DescriptorProto_ExtensionRange>]: never; }>(base?: I): DescriptorProto_ExtensionRange;
    fromPartial<I_1 extends {
        start?: number;
        end?: number;
        options?: {
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        };
    } & {
        start?: number;
        end?: number;
        options?: {
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        } & {
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[] & ({
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            } & {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[] & ({
                    namePart?: string;
                    isExtension?: boolean;
                } & {
                    namePart?: string;
                    isExtension?: boolean;
                } & { [K_2 in Exclude<keyof I_1["options"]["uninterpretedOption"][number]["name"][number], keyof UninterpretedOption_NamePart>]: never; })[] & { [K_3 in Exclude<keyof I_1["options"]["uninterpretedOption"][number]["name"], keyof {
                    namePart?: string;
                    isExtension?: boolean;
                }[]>]: never; };
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            } & { [K_4 in Exclude<keyof I_1["options"]["uninterpretedOption"][number], keyof UninterpretedOption>]: never; })[] & { [K_5 in Exclude<keyof I_1["options"]["uninterpretedOption"], keyof {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[]>]: never; };
        } & { [K_6 in Exclude<keyof I_1["options"], "uninterpretedOption">]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof DescriptorProto_ExtensionRange>]: never; }>(object: I_1): DescriptorProto_ExtensionRange;
};
export declare const DescriptorProto_ReservedRange: {
    encode(message: DescriptorProto_ReservedRange, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DescriptorProto_ReservedRange;
    fromJSON(object: any): DescriptorProto_ReservedRange;
    toJSON(message: DescriptorProto_ReservedRange): unknown;
    create<I extends {
        start?: number;
        end?: number;
    } & {
        start?: number;
        end?: number;
    } & { [K in Exclude<keyof I, keyof DescriptorProto_ReservedRange>]: never; }>(base?: I): DescriptorProto_ReservedRange;
    fromPartial<I_1 extends {
        start?: number;
        end?: number;
    } & {
        start?: number;
        end?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof DescriptorProto_ReservedRange>]: never; }>(object: I_1): DescriptorProto_ReservedRange;
};
export declare const ExtensionRangeOptions: {
    encode(message: ExtensionRangeOptions, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ExtensionRangeOptions;
    fromJSON(object: any): ExtensionRangeOptions;
    toJSON(message: ExtensionRangeOptions): unknown;
    create<I extends {
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[];
    } & {
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[] & ({
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        } & {
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K in Exclude<keyof I["uninterpretedOption"], keyof {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[]>]: never; };
    } & { [K_1 in Exclude<keyof I, "uninterpretedOption">]: never; }>(base?: I): ExtensionRangeOptions;
    fromPartial<I_1 extends {
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[];
    } & {
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[] & ({
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        } & {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[] & ({
                namePart?: string;
                isExtension?: boolean;
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        } & { [K_2 in Exclude<keyof I_1["uninterpretedOption"][number], keyof UninterpretedOption>]: never; })[] & { [K_3 in Exclude<keyof I_1["uninterpretedOption"], keyof {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[]>]: never; };
    } & { [K_4 in Exclude<keyof I_1, "uninterpretedOption">]: never; }>(object: I_1): ExtensionRangeOptions;
};
export declare const FieldDescriptorProto: {
    encode(message: FieldDescriptorProto, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): FieldDescriptorProto;
    fromJSON(object: any): FieldDescriptorProto;
    toJSON(message: FieldDescriptorProto): unknown;
    create<I extends {
        name?: string;
        number?: number;
        label?: FieldDescriptorProto_Label;
        type?: FieldDescriptorProto_Type;
        typeName?: string;
        extendee?: string;
        defaultValue?: string;
        oneofIndex?: number;
        jsonName?: string;
        options?: {
            ctype?: FieldOptions_CType;
            packed?: boolean;
            jstype?: FieldOptions_JSType;
            lazy?: boolean;
            deprecated?: boolean;
            weak?: boolean;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        };
        proto3Optional?: boolean;
    } & {
        name?: string;
        number?: number;
        label?: FieldDescriptorProto_Label;
        type?: FieldDescriptorProto_Type;
        typeName?: string;
        extendee?: string;
        defaultValue?: string;
        oneofIndex?: number;
        jsonName?: string;
        options?: {
            ctype?: FieldOptions_CType;
            packed?: boolean;
            jstype?: FieldOptions_JSType;
            lazy?: boolean;
            deprecated?: boolean;
            weak?: boolean;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        } & {
            ctype?: FieldOptions_CType;
            packed?: boolean;
            jstype?: FieldOptions_JSType;
            lazy?: boolean;
            deprecated?: boolean;
            weak?: boolean;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[] & ({
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
        } & { [K in Exclude<keyof I["options"], keyof FieldOptions>]: never; };
        proto3Optional?: boolean;
    } & { [K_1 in Exclude<keyof I, keyof FieldDescriptorProto>]: never; }>(base?: I): FieldDescriptorProto;
    fromPartial<I_1 extends {
        name?: string;
        number?: number;
        label?: FieldDescriptorProto_Label;
        type?: FieldDescriptorProto_Type;
        typeName?: string;
        extendee?: string;
        defaultValue?: string;
        oneofIndex?: number;
        jsonName?: string;
        options?: {
            ctype?: FieldOptions_CType;
            packed?: boolean;
            jstype?: FieldOptions_JSType;
            lazy?: boolean;
            deprecated?: boolean;
            weak?: boolean;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        };
        proto3Optional?: boolean;
    } & {
        name?: string;
        number?: number;
        label?: FieldDescriptorProto_Label;
        type?: FieldDescriptorProto_Type;
        typeName?: string;
        extendee?: string;
        defaultValue?: string;
        oneofIndex?: number;
        jsonName?: string;
        options?: {
            ctype?: FieldOptions_CType;
            packed?: boolean;
            jstype?: FieldOptions_JSType;
            lazy?: boolean;
            deprecated?: boolean;
            weak?: boolean;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        } & {
            ctype?: FieldOptions_CType;
            packed?: boolean;
            jstype?: FieldOptions_JSType;
            lazy?: boolean;
            deprecated?: boolean;
            weak?: boolean;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[] & ({
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            } & {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[] & ({
                    namePart?: string;
                    isExtension?: boolean;
                } & {
                    namePart?: string;
                    isExtension?: boolean;
                } & { [K_2 in Exclude<keyof I_1["options"]["uninterpretedOption"][number]["name"][number], keyof UninterpretedOption_NamePart>]: never; })[] & { [K_3 in Exclude<keyof I_1["options"]["uninterpretedOption"][number]["name"], keyof {
                    namePart?: string;
                    isExtension?: boolean;
                }[]>]: never; };
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            } & { [K_4 in Exclude<keyof I_1["options"]["uninterpretedOption"][number], keyof UninterpretedOption>]: never; })[] & { [K_5 in Exclude<keyof I_1["options"]["uninterpretedOption"], keyof {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[]>]: never; };
        } & { [K_6 in Exclude<keyof I_1["options"], keyof FieldOptions>]: never; };
        proto3Optional?: boolean;
    } & { [K_7 in Exclude<keyof I_1, keyof FieldDescriptorProto>]: never; }>(object: I_1): FieldDescriptorProto;
};
export declare const OneofDescriptorProto: {
    encode(message: OneofDescriptorProto, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): OneofDescriptorProto;
    fromJSON(object: any): OneofDescriptorProto;
    toJSON(message: OneofDescriptorProto): unknown;
    create<I extends {
        name?: string;
        options?: {
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        };
    } & {
        name?: string;
        options?: {
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        } & {
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[] & ({
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
        } & { [K in Exclude<keyof I["options"], "uninterpretedOption">]: never; };
    } & { [K_1 in Exclude<keyof I, keyof OneofDescriptorProto>]: never; }>(base?: I): OneofDescriptorProto;
    fromPartial<I_1 extends {
        name?: string;
        options?: {
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        };
    } & {
        name?: string;
        options?: {
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        } & {
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[] & ({
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            } & {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[] & ({
                    namePart?: string;
                    isExtension?: boolean;
                } & {
                    namePart?: string;
                    isExtension?: boolean;
                } & { [K_2 in Exclude<keyof I_1["options"]["uninterpretedOption"][number]["name"][number], keyof UninterpretedOption_NamePart>]: never; })[] & { [K_3 in Exclude<keyof I_1["options"]["uninterpretedOption"][number]["name"], keyof {
                    namePart?: string;
                    isExtension?: boolean;
                }[]>]: never; };
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            } & { [K_4 in Exclude<keyof I_1["options"]["uninterpretedOption"][number], keyof UninterpretedOption>]: never; })[] & { [K_5 in Exclude<keyof I_1["options"]["uninterpretedOption"], keyof {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[]>]: never; };
        } & { [K_6 in Exclude<keyof I_1["options"], "uninterpretedOption">]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof OneofDescriptorProto>]: never; }>(object: I_1): OneofDescriptorProto;
};
export declare const EnumDescriptorProto: {
    encode(message: EnumDescriptorProto, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): EnumDescriptorProto;
    fromJSON(object: any): EnumDescriptorProto;
    toJSON(message: EnumDescriptorProto): unknown;
    create<I extends {
        name?: string;
        value?: {
            name?: string;
            number?: number;
            options?: {
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
        }[];
        options?: {
            allowAlias?: boolean;
            deprecated?: boolean;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        };
        reservedRange?: {
            start?: number;
            end?: number;
        }[];
        reservedName?: string[];
    } & {
        name?: string;
        value?: {
            name?: string;
            number?: number;
            options?: {
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
        }[] & ({
            name?: string;
            number?: number;
            options?: {
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
        } & {
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K in Exclude<keyof I["value"], keyof {
            name?: string;
            number?: number;
            options?: {
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
        }[]>]: never; };
        options?: {
            allowAlias?: boolean;
            deprecated?: boolean;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        } & {
            allowAlias?: boolean;
            deprecated?: boolean;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[] & ({
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
        } & { [K_1 in Exclude<keyof I["options"], keyof EnumOptions>]: never; };
        reservedRange?: {
            start?: number;
            end?: number;
        }[] & ({
            start?: number;
            end?: number;
        } & {
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K_2 in Exclude<keyof I["reservedRange"], keyof {
            start?: number;
            end?: number;
        }[]>]: never; };
        reservedName?: string[] & string[] & { [K_3 in Exclude<keyof I["reservedName"], keyof string[]>]: never; };
    } & { [K_4 in Exclude<keyof I, keyof EnumDescriptorProto>]: never; }>(base?: I): EnumDescriptorProto;
    fromPartial<I_1 extends {
        name?: string;
        value?: {
            name?: string;
            number?: number;
            options?: {
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
        }[];
        options?: {
            allowAlias?: boolean;
            deprecated?: boolean;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        };
        reservedRange?: {
            start?: number;
            end?: number;
        }[];
        reservedName?: string[];
    } & {
        name?: string;
        value?: {
            name?: string;
            number?: number;
            options?: {
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
        }[] & ({
            name?: string;
            number?: number;
            options?: {
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
        } & {
            name?: string;
            number?: number;
            options?: {
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            };
        } & { [K_5 in Exclude<keyof I_1["value"][number], keyof EnumValueDescriptorProto>]: never; })[] & { [K_6 in Exclude<keyof I_1["value"], keyof {
            name?: string;
            number?: number;
            options?: {
                deprecated?: boolean;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
        }[]>]: never; };
        options?: {
            allowAlias?: boolean;
            deprecated?: boolean;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        } & {
            allowAlias?: boolean;
            deprecated?: boolean;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[] & ({
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            } & {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[] & ({
                    namePart?: string;
                    isExtension?: boolean;
                } & {
                    namePart?: string;
                    isExtension?: boolean;
                } & { [K_7 in Exclude<keyof I_1["options"]["uninterpretedOption"][number]["name"][number], keyof UninterpretedOption_NamePart>]: never; })[] & { [K_8 in Exclude<keyof I_1["options"]["uninterpretedOption"][number]["name"], keyof {
                    namePart?: string;
                    isExtension?: boolean;
                }[]>]: never; };
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            } & { [K_9 in Exclude<keyof I_1["options"]["uninterpretedOption"][number], keyof UninterpretedOption>]: never; })[] & { [K_10 in Exclude<keyof I_1["options"]["uninterpretedOption"], keyof {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[]>]: never; };
        } & { [K_11 in Exclude<keyof I_1["options"], keyof EnumOptions>]: never; };
        reservedRange?: {
            start?: number;
            end?: number;
        }[] & ({
            start?: number;
            end?: number;
        } & {
            start?: number;
            end?: number;
        } & { [K_12 in Exclude<keyof I_1["reservedRange"][number], keyof EnumDescriptorProto_EnumReservedRange>]: never; })[] & { [K_13 in Exclude<keyof I_1["reservedRange"], keyof {
            start?: number;
            end?: number;
        }[]>]: never; };
        reservedName?: string[] & string[] & { [K_14 in Exclude<keyof I_1["reservedName"], keyof string[]>]: never; };
    } & { [K_15 in Exclude<keyof I_1, keyof EnumDescriptorProto>]: never; }>(object: I_1): EnumDescriptorProto;
};
export declare const EnumDescriptorProto_EnumReservedRange: {
    encode(message: EnumDescriptorProto_EnumReservedRange, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): EnumDescriptorProto_EnumReservedRange;
    fromJSON(object: any): EnumDescriptorProto_EnumReservedRange;
    toJSON(message: EnumDescriptorProto_EnumReservedRange): unknown;
    create<I extends {
        start?: number;
        end?: number;
    } & {
        start?: number;
        end?: number;
    } & { [K in Exclude<keyof I, keyof EnumDescriptorProto_EnumReservedRange>]: never; }>(base?: I): EnumDescriptorProto_EnumReservedRange;
    fromPartial<I_1 extends {
        start?: number;
        end?: number;
    } & {
        start?: number;
        end?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof EnumDescriptorProto_EnumReservedRange>]: never; }>(object: I_1): EnumDescriptorProto_EnumReservedRange;
};
export declare const EnumValueDescriptorProto: {
    encode(message: EnumValueDescriptorProto, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): EnumValueDescriptorProto;
    fromJSON(object: any): EnumValueDescriptorProto;
    toJSON(message: EnumValueDescriptorProto): unknown;
    create<I extends {
        name?: string;
        number?: number;
        options?: {
            deprecated?: boolean;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        };
    } & {
        name?: string;
        number?: number;
        options?: {
            deprecated?: boolean;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        } & {
            deprecated?: boolean;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[] & ({
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
        } & { [K in Exclude<keyof I["options"], keyof EnumValueOptions>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof EnumValueDescriptorProto>]: never; }>(base?: I): EnumValueDescriptorProto;
    fromPartial<I_1 extends {
        name?: string;
        number?: number;
        options?: {
            deprecated?: boolean;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        };
    } & {
        name?: string;
        number?: number;
        options?: {
            deprecated?: boolean;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        } & {
            deprecated?: boolean;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[] & ({
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            } & {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[] & ({
                    namePart?: string;
                    isExtension?: boolean;
                } & {
                    namePart?: string;
                    isExtension?: boolean;
                } & { [K_2 in Exclude<keyof I_1["options"]["uninterpretedOption"][number]["name"][number], keyof UninterpretedOption_NamePart>]: never; })[] & { [K_3 in Exclude<keyof I_1["options"]["uninterpretedOption"][number]["name"], keyof {
                    namePart?: string;
                    isExtension?: boolean;
                }[]>]: never; };
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            } & { [K_4 in Exclude<keyof I_1["options"]["uninterpretedOption"][number], keyof UninterpretedOption>]: never; })[] & { [K_5 in Exclude<keyof I_1["options"]["uninterpretedOption"], keyof {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[]>]: never; };
        } & { [K_6 in Exclude<keyof I_1["options"], keyof EnumValueOptions>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof EnumValueDescriptorProto>]: never; }>(object: I_1): EnumValueDescriptorProto;
};
export declare const ServiceDescriptorProto: {
    encode(message: ServiceDescriptorProto, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ServiceDescriptorProto;
    fromJSON(object: any): ServiceDescriptorProto;
    toJSON(message: ServiceDescriptorProto): unknown;
    create<I extends {
        name?: string;
        method?: {
            name?: string;
            inputType?: string;
            outputType?: string;
            options?: {
                deprecated?: boolean;
                idempotencyLevel?: MethodOptions_IdempotencyLevel;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            clientStreaming?: boolean;
            serverStreaming?: boolean;
        }[];
        options?: {
            deprecated?: boolean;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        };
    } & {
        name?: string;
        method?: {
            name?: string;
            inputType?: string;
            outputType?: string;
            options?: {
                deprecated?: boolean;
                idempotencyLevel?: MethodOptions_IdempotencyLevel;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            clientStreaming?: boolean;
            serverStreaming?: boolean;
        }[] & ({
            name?: string;
            inputType?: string;
            outputType?: string;
            options?: {
                deprecated?: boolean;
                idempotencyLevel?: MethodOptions_IdempotencyLevel;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            clientStreaming?: boolean;
            serverStreaming?: boolean;
        } & {
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K in Exclude<keyof I["method"], keyof {
            name?: string;
            inputType?: string;
            outputType?: string;
            options?: {
                deprecated?: boolean;
                idempotencyLevel?: MethodOptions_IdempotencyLevel;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            clientStreaming?: boolean;
            serverStreaming?: boolean;
        }[]>]: never; };
        options?: {
            deprecated?: boolean;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        } & {
            deprecated?: boolean;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[] & ({
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
        } & { [K_1 in Exclude<keyof I["options"], keyof ServiceOptions>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof ServiceDescriptorProto>]: never; }>(base?: I): ServiceDescriptorProto;
    fromPartial<I_1 extends {
        name?: string;
        method?: {
            name?: string;
            inputType?: string;
            outputType?: string;
            options?: {
                deprecated?: boolean;
                idempotencyLevel?: MethodOptions_IdempotencyLevel;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            clientStreaming?: boolean;
            serverStreaming?: boolean;
        }[];
        options?: {
            deprecated?: boolean;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        };
    } & {
        name?: string;
        method?: {
            name?: string;
            inputType?: string;
            outputType?: string;
            options?: {
                deprecated?: boolean;
                idempotencyLevel?: MethodOptions_IdempotencyLevel;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            clientStreaming?: boolean;
            serverStreaming?: boolean;
        }[] & ({
            name?: string;
            inputType?: string;
            outputType?: string;
            options?: {
                deprecated?: boolean;
                idempotencyLevel?: MethodOptions_IdempotencyLevel;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            clientStreaming?: boolean;
            serverStreaming?: boolean;
        } & {
            name?: string;
            inputType?: string;
            outputType?: string;
            options?: {
                deprecated?: boolean;
                idempotencyLevel?: MethodOptions_IdempotencyLevel;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            };
            clientStreaming?: boolean;
            serverStreaming?: boolean;
        } & { [K_3 in Exclude<keyof I_1["method"][number], keyof MethodDescriptorProto>]: never; })[] & { [K_4 in Exclude<keyof I_1["method"], keyof {
            name?: string;
            inputType?: string;
            outputType?: string;
            options?: {
                deprecated?: boolean;
                idempotencyLevel?: MethodOptions_IdempotencyLevel;
                uninterpretedOption?: {
                    name?: {
                        namePart?: string;
                        isExtension?: boolean;
                    }[];
                    identifierValue?: string;
                    positiveIntValue?: number;
                    negativeIntValue?: number;
                    doubleValue?: number;
                    stringValue?: Uint8Array;
                    aggregateValue?: string;
                }[];
            };
            clientStreaming?: boolean;
            serverStreaming?: boolean;
        }[]>]: never; };
        options?: {
            deprecated?: boolean;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        } & {
            deprecated?: boolean;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[] & ({
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            } & {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[] & ({
                    namePart?: string;
                    isExtension?: boolean;
                } & {
                    namePart?: string;
                    isExtension?: boolean;
                } & { [K_5 in Exclude<keyof I_1["options"]["uninterpretedOption"][number]["name"][number], keyof UninterpretedOption_NamePart>]: never; })[] & { [K_6 in Exclude<keyof I_1["options"]["uninterpretedOption"][number]["name"], keyof {
                    namePart?: string;
                    isExtension?: boolean;
                }[]>]: never; };
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            } & { [K_7 in Exclude<keyof I_1["options"]["uninterpretedOption"][number], keyof UninterpretedOption>]: never; })[] & { [K_8 in Exclude<keyof I_1["options"]["uninterpretedOption"], keyof {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[]>]: never; };
        } & { [K_9 in Exclude<keyof I_1["options"], keyof ServiceOptions>]: never; };
    } & { [K_10 in Exclude<keyof I_1, keyof ServiceDescriptorProto>]: never; }>(object: I_1): ServiceDescriptorProto;
};
export declare const MethodDescriptorProto: {
    encode(message: MethodDescriptorProto, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MethodDescriptorProto;
    fromJSON(object: any): MethodDescriptorProto;
    toJSON(message: MethodDescriptorProto): unknown;
    create<I extends {
        name?: string;
        inputType?: string;
        outputType?: string;
        options?: {
            deprecated?: boolean;
            idempotencyLevel?: MethodOptions_IdempotencyLevel;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        };
        clientStreaming?: boolean;
        serverStreaming?: boolean;
    } & {
        name?: string;
        inputType?: string;
        outputType?: string;
        options?: {
            deprecated?: boolean;
            idempotencyLevel?: MethodOptions_IdempotencyLevel;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        } & {
            deprecated?: boolean;
            idempotencyLevel?: MethodOptions_IdempotencyLevel;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[] & ({
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
        } & { [K in Exclude<keyof I["options"], keyof MethodOptions>]: never; };
        clientStreaming?: boolean;
        serverStreaming?: boolean;
    } & { [K_1 in Exclude<keyof I, keyof MethodDescriptorProto>]: never; }>(base?: I): MethodDescriptorProto;
    fromPartial<I_1 extends {
        name?: string;
        inputType?: string;
        outputType?: string;
        options?: {
            deprecated?: boolean;
            idempotencyLevel?: MethodOptions_IdempotencyLevel;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        };
        clientStreaming?: boolean;
        serverStreaming?: boolean;
    } & {
        name?: string;
        inputType?: string;
        outputType?: string;
        options?: {
            deprecated?: boolean;
            idempotencyLevel?: MethodOptions_IdempotencyLevel;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[];
        } & {
            deprecated?: boolean;
            idempotencyLevel?: MethodOptions_IdempotencyLevel;
            uninterpretedOption?: {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[] & ({
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            } & {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[] & ({
                    namePart?: string;
                    isExtension?: boolean;
                } & {
                    namePart?: string;
                    isExtension?: boolean;
                } & { [K_2 in Exclude<keyof I_1["options"]["uninterpretedOption"][number]["name"][number], keyof UninterpretedOption_NamePart>]: never; })[] & { [K_3 in Exclude<keyof I_1["options"]["uninterpretedOption"][number]["name"], keyof {
                    namePart?: string;
                    isExtension?: boolean;
                }[]>]: never; };
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            } & { [K_4 in Exclude<keyof I_1["options"]["uninterpretedOption"][number], keyof UninterpretedOption>]: never; })[] & { [K_5 in Exclude<keyof I_1["options"]["uninterpretedOption"], keyof {
                name?: {
                    namePart?: string;
                    isExtension?: boolean;
                }[];
                identifierValue?: string;
                positiveIntValue?: number;
                negativeIntValue?: number;
                doubleValue?: number;
                stringValue?: Uint8Array;
                aggregateValue?: string;
            }[]>]: never; };
        } & { [K_6 in Exclude<keyof I_1["options"], keyof MethodOptions>]: never; };
        clientStreaming?: boolean;
        serverStreaming?: boolean;
    } & { [K_7 in Exclude<keyof I_1, keyof MethodDescriptorProto>]: never; }>(object: I_1): MethodDescriptorProto;
};
export declare const FileOptions: {
    encode(message: FileOptions, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): FileOptions;
    fromJSON(object: any): FileOptions;
    toJSON(message: FileOptions): unknown;
    create<I extends {
        javaPackage?: string;
        javaOuterClassname?: string;
        javaMultipleFiles?: boolean;
        javaGenerateEqualsAndHash?: boolean;
        javaStringCheckUtf8?: boolean;
        optimizeFor?: FileOptions_OptimizeMode;
        goPackage?: string;
        ccGenericServices?: boolean;
        javaGenericServices?: boolean;
        pyGenericServices?: boolean;
        phpGenericServices?: boolean;
        deprecated?: boolean;
        ccEnableArenas?: boolean;
        objcClassPrefix?: string;
        csharpNamespace?: string;
        swiftPrefix?: string;
        phpClassPrefix?: string;
        phpNamespace?: string;
        phpMetadataNamespace?: string;
        rubyPackage?: string;
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[];
    } & {
        javaPackage?: string;
        javaOuterClassname?: string;
        javaMultipleFiles?: boolean;
        javaGenerateEqualsAndHash?: boolean;
        javaStringCheckUtf8?: boolean;
        optimizeFor?: FileOptions_OptimizeMode;
        goPackage?: string;
        ccGenericServices?: boolean;
        javaGenericServices?: boolean;
        pyGenericServices?: boolean;
        phpGenericServices?: boolean;
        deprecated?: boolean;
        ccEnableArenas?: boolean;
        objcClassPrefix?: string;
        csharpNamespace?: string;
        swiftPrefix?: string;
        phpClassPrefix?: string;
        phpNamespace?: string;
        phpMetadataNamespace?: string;
        rubyPackage?: string;
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[] & ({
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        } & {
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K in Exclude<keyof I["uninterpretedOption"], keyof {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[]>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof FileOptions>]: never; }>(base?: I): FileOptions;
    fromPartial<I_1 extends {
        javaPackage?: string;
        javaOuterClassname?: string;
        javaMultipleFiles?: boolean;
        javaGenerateEqualsAndHash?: boolean;
        javaStringCheckUtf8?: boolean;
        optimizeFor?: FileOptions_OptimizeMode;
        goPackage?: string;
        ccGenericServices?: boolean;
        javaGenericServices?: boolean;
        pyGenericServices?: boolean;
        phpGenericServices?: boolean;
        deprecated?: boolean;
        ccEnableArenas?: boolean;
        objcClassPrefix?: string;
        csharpNamespace?: string;
        swiftPrefix?: string;
        phpClassPrefix?: string;
        phpNamespace?: string;
        phpMetadataNamespace?: string;
        rubyPackage?: string;
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[];
    } & {
        javaPackage?: string;
        javaOuterClassname?: string;
        javaMultipleFiles?: boolean;
        javaGenerateEqualsAndHash?: boolean;
        javaStringCheckUtf8?: boolean;
        optimizeFor?: FileOptions_OptimizeMode;
        goPackage?: string;
        ccGenericServices?: boolean;
        javaGenericServices?: boolean;
        pyGenericServices?: boolean;
        phpGenericServices?: boolean;
        deprecated?: boolean;
        ccEnableArenas?: boolean;
        objcClassPrefix?: string;
        csharpNamespace?: string;
        swiftPrefix?: string;
        phpClassPrefix?: string;
        phpNamespace?: string;
        phpMetadataNamespace?: string;
        rubyPackage?: string;
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[] & ({
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        } & {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[] & ({
                namePart?: string;
                isExtension?: boolean;
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        } & { [K_2 in Exclude<keyof I_1["uninterpretedOption"][number], keyof UninterpretedOption>]: never; })[] & { [K_3 in Exclude<keyof I_1["uninterpretedOption"], keyof {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[]>]: never; };
    } & { [K_4 in Exclude<keyof I_1, keyof FileOptions>]: never; }>(object: I_1): FileOptions;
};
export declare const MessageOptions: {
    encode(message: MessageOptions, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MessageOptions;
    fromJSON(object: any): MessageOptions;
    toJSON(message: MessageOptions): unknown;
    create<I extends {
        messageSetWireFormat?: boolean;
        noStandardDescriptorAccessor?: boolean;
        deprecated?: boolean;
        mapEntry?: boolean;
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[];
    } & {
        messageSetWireFormat?: boolean;
        noStandardDescriptorAccessor?: boolean;
        deprecated?: boolean;
        mapEntry?: boolean;
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[] & ({
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        } & {
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K in Exclude<keyof I["uninterpretedOption"], keyof {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[]>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof MessageOptions>]: never; }>(base?: I): MessageOptions;
    fromPartial<I_1 extends {
        messageSetWireFormat?: boolean;
        noStandardDescriptorAccessor?: boolean;
        deprecated?: boolean;
        mapEntry?: boolean;
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[];
    } & {
        messageSetWireFormat?: boolean;
        noStandardDescriptorAccessor?: boolean;
        deprecated?: boolean;
        mapEntry?: boolean;
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[] & ({
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        } & {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[] & ({
                namePart?: string;
                isExtension?: boolean;
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        } & { [K_2 in Exclude<keyof I_1["uninterpretedOption"][number], keyof UninterpretedOption>]: never; })[] & { [K_3 in Exclude<keyof I_1["uninterpretedOption"], keyof {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[]>]: never; };
    } & { [K_4 in Exclude<keyof I_1, keyof MessageOptions>]: never; }>(object: I_1): MessageOptions;
};
export declare const FieldOptions: {
    encode(message: FieldOptions, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): FieldOptions;
    fromJSON(object: any): FieldOptions;
    toJSON(message: FieldOptions): unknown;
    create<I extends {
        ctype?: FieldOptions_CType;
        packed?: boolean;
        jstype?: FieldOptions_JSType;
        lazy?: boolean;
        deprecated?: boolean;
        weak?: boolean;
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[];
    } & {
        ctype?: FieldOptions_CType;
        packed?: boolean;
        jstype?: FieldOptions_JSType;
        lazy?: boolean;
        deprecated?: boolean;
        weak?: boolean;
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[] & ({
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        } & {
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K in Exclude<keyof I["uninterpretedOption"], keyof {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[]>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof FieldOptions>]: never; }>(base?: I): FieldOptions;
    fromPartial<I_1 extends {
        ctype?: FieldOptions_CType;
        packed?: boolean;
        jstype?: FieldOptions_JSType;
        lazy?: boolean;
        deprecated?: boolean;
        weak?: boolean;
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[];
    } & {
        ctype?: FieldOptions_CType;
        packed?: boolean;
        jstype?: FieldOptions_JSType;
        lazy?: boolean;
        deprecated?: boolean;
        weak?: boolean;
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[] & ({
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        } & {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[] & ({
                namePart?: string;
                isExtension?: boolean;
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        } & { [K_2 in Exclude<keyof I_1["uninterpretedOption"][number], keyof UninterpretedOption>]: never; })[] & { [K_3 in Exclude<keyof I_1["uninterpretedOption"], keyof {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[]>]: never; };
    } & { [K_4 in Exclude<keyof I_1, keyof FieldOptions>]: never; }>(object: I_1): FieldOptions;
};
export declare const OneofOptions: {
    encode(message: OneofOptions, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): OneofOptions;
    fromJSON(object: any): OneofOptions;
    toJSON(message: OneofOptions): unknown;
    create<I extends {
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[];
    } & {
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[] & ({
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        } & {
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K in Exclude<keyof I["uninterpretedOption"], keyof {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[]>]: never; };
    } & { [K_1 in Exclude<keyof I, "uninterpretedOption">]: never; }>(base?: I): OneofOptions;
    fromPartial<I_1 extends {
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[];
    } & {
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[] & ({
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        } & {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[] & ({
                namePart?: string;
                isExtension?: boolean;
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        } & { [K_2 in Exclude<keyof I_1["uninterpretedOption"][number], keyof UninterpretedOption>]: never; })[] & { [K_3 in Exclude<keyof I_1["uninterpretedOption"], keyof {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[]>]: never; };
    } & { [K_4 in Exclude<keyof I_1, "uninterpretedOption">]: never; }>(object: I_1): OneofOptions;
};
export declare const EnumOptions: {
    encode(message: EnumOptions, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): EnumOptions;
    fromJSON(object: any): EnumOptions;
    toJSON(message: EnumOptions): unknown;
    create<I extends {
        allowAlias?: boolean;
        deprecated?: boolean;
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[];
    } & {
        allowAlias?: boolean;
        deprecated?: boolean;
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[] & ({
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        } & {
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K in Exclude<keyof I["uninterpretedOption"], keyof {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[]>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof EnumOptions>]: never; }>(base?: I): EnumOptions;
    fromPartial<I_1 extends {
        allowAlias?: boolean;
        deprecated?: boolean;
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[];
    } & {
        allowAlias?: boolean;
        deprecated?: boolean;
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[] & ({
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        } & {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[] & ({
                namePart?: string;
                isExtension?: boolean;
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        } & { [K_2 in Exclude<keyof I_1["uninterpretedOption"][number], keyof UninterpretedOption>]: never; })[] & { [K_3 in Exclude<keyof I_1["uninterpretedOption"], keyof {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[]>]: never; };
    } & { [K_4 in Exclude<keyof I_1, keyof EnumOptions>]: never; }>(object: I_1): EnumOptions;
};
export declare const EnumValueOptions: {
    encode(message: EnumValueOptions, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): EnumValueOptions;
    fromJSON(object: any): EnumValueOptions;
    toJSON(message: EnumValueOptions): unknown;
    create<I extends {
        deprecated?: boolean;
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[];
    } & {
        deprecated?: boolean;
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[] & ({
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        } & {
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K in Exclude<keyof I["uninterpretedOption"], keyof {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[]>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof EnumValueOptions>]: never; }>(base?: I): EnumValueOptions;
    fromPartial<I_1 extends {
        deprecated?: boolean;
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[];
    } & {
        deprecated?: boolean;
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[] & ({
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        } & {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[] & ({
                namePart?: string;
                isExtension?: boolean;
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        } & { [K_2 in Exclude<keyof I_1["uninterpretedOption"][number], keyof UninterpretedOption>]: never; })[] & { [K_3 in Exclude<keyof I_1["uninterpretedOption"], keyof {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[]>]: never; };
    } & { [K_4 in Exclude<keyof I_1, keyof EnumValueOptions>]: never; }>(object: I_1): EnumValueOptions;
};
export declare const ServiceOptions: {
    encode(message: ServiceOptions, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ServiceOptions;
    fromJSON(object: any): ServiceOptions;
    toJSON(message: ServiceOptions): unknown;
    create<I extends {
        deprecated?: boolean;
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[];
    } & {
        deprecated?: boolean;
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[] & ({
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        } & {
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K in Exclude<keyof I["uninterpretedOption"], keyof {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[]>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof ServiceOptions>]: never; }>(base?: I): ServiceOptions;
    fromPartial<I_1 extends {
        deprecated?: boolean;
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[];
    } & {
        deprecated?: boolean;
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[] & ({
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        } & {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[] & ({
                namePart?: string;
                isExtension?: boolean;
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        } & { [K_2 in Exclude<keyof I_1["uninterpretedOption"][number], keyof UninterpretedOption>]: never; })[] & { [K_3 in Exclude<keyof I_1["uninterpretedOption"], keyof {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[]>]: never; };
    } & { [K_4 in Exclude<keyof I_1, keyof ServiceOptions>]: never; }>(object: I_1): ServiceOptions;
};
export declare const MethodOptions: {
    encode(message: MethodOptions, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MethodOptions;
    fromJSON(object: any): MethodOptions;
    toJSON(message: MethodOptions): unknown;
    create<I extends {
        deprecated?: boolean;
        idempotencyLevel?: MethodOptions_IdempotencyLevel;
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[];
    } & {
        deprecated?: boolean;
        idempotencyLevel?: MethodOptions_IdempotencyLevel;
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[] & ({
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        } & {
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K in Exclude<keyof I["uninterpretedOption"], keyof {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[]>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof MethodOptions>]: never; }>(base?: I): MethodOptions;
    fromPartial<I_1 extends {
        deprecated?: boolean;
        idempotencyLevel?: MethodOptions_IdempotencyLevel;
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[];
    } & {
        deprecated?: boolean;
        idempotencyLevel?: MethodOptions_IdempotencyLevel;
        uninterpretedOption?: {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[] & ({
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        } & {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[] & ({
                namePart?: string;
                isExtension?: boolean;
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        } & { [K_2 in Exclude<keyof I_1["uninterpretedOption"][number], keyof UninterpretedOption>]: never; })[] & { [K_3 in Exclude<keyof I_1["uninterpretedOption"], keyof {
            name?: {
                namePart?: string;
                isExtension?: boolean;
            }[];
            identifierValue?: string;
            positiveIntValue?: number;
            negativeIntValue?: number;
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }[]>]: never; };
    } & { [K_4 in Exclude<keyof I_1, keyof MethodOptions>]: never; }>(object: I_1): MethodOptions;
};
export declare const UninterpretedOption: {
    encode(message: UninterpretedOption, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): UninterpretedOption;
    fromJSON(object: any): UninterpretedOption;
    toJSON(message: UninterpretedOption): unknown;
    create<I extends {
        name?: {
            namePart?: string;
            isExtension?: boolean;
        }[];
        identifierValue?: string;
        positiveIntValue?: number;
        negativeIntValue?: number;
        doubleValue?: number;
        stringValue?: Uint8Array;
        aggregateValue?: string;
    } & {
        name?: {
            namePart?: string;
            isExtension?: boolean;
        }[] & ({
            namePart?: string;
            isExtension?: boolean;
        } & {
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K in Exclude<keyof I["name"], keyof {
            namePart?: string;
            isExtension?: boolean;
        }[]>]: never; };
        identifierValue?: string;
        positiveIntValue?: number;
        negativeIntValue?: number;
        doubleValue?: number;
        stringValue?: Uint8Array;
        aggregateValue?: string;
    } & { [K_1 in Exclude<keyof I, keyof UninterpretedOption>]: never; }>(base?: I): UninterpretedOption;
    fromPartial<I_1 extends {
        name?: {
            namePart?: string;
            isExtension?: boolean;
        }[];
        identifierValue?: string;
        positiveIntValue?: number;
        negativeIntValue?: number;
        doubleValue?: number;
        stringValue?: Uint8Array;
        aggregateValue?: string;
    } & {
        name?: {
            namePart?: string;
            isExtension?: boolean;
        }[] & ({
            namePart?: string;
            isExtension?: boolean;
        } & {
            namePart?: string;
            isExtension?: boolean;
        } & { [K_2 in Exclude<keyof I_1["name"][number], keyof UninterpretedOption_NamePart>]: never; })[] & { [K_3 in Exclude<keyof I_1["name"], keyof {
            namePart?: string;
            isExtension?: boolean;
        }[]>]: never; };
        identifierValue?: string;
        positiveIntValue?: number;
        negativeIntValue?: number;
        doubleValue?: number;
        stringValue?: Uint8Array;
        aggregateValue?: string;
    } & { [K_4 in Exclude<keyof I_1, keyof UninterpretedOption>]: never; }>(object: I_1): UninterpretedOption;
};
export declare const UninterpretedOption_NamePart: {
    encode(message: UninterpretedOption_NamePart, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): UninterpretedOption_NamePart;
    fromJSON(object: any): UninterpretedOption_NamePart;
    toJSON(message: UninterpretedOption_NamePart): unknown;
    create<I extends {
        namePart?: string;
        isExtension?: boolean;
    } & {
        namePart?: string;
        isExtension?: boolean;
    } & { [K in Exclude<keyof I, keyof UninterpretedOption_NamePart>]: never; }>(base?: I): UninterpretedOption_NamePart;
    fromPartial<I_1 extends {
        namePart?: string;
        isExtension?: boolean;
    } & {
        namePart?: string;
        isExtension?: boolean;
    } & { [K_1 in Exclude<keyof I_1, keyof UninterpretedOption_NamePart>]: never; }>(object: I_1): UninterpretedOption_NamePart;
};
export declare const SourceCodeInfo: {
    encode(message: SourceCodeInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SourceCodeInfo;
    fromJSON(object: any): SourceCodeInfo;
    toJSON(message: SourceCodeInfo): unknown;
    create<I extends {
        location?: {
            path?: number[];
            span?: number[];
            leadingComments?: string;
            trailingComments?: string;
            leadingDetachedComments?: string[];
        }[];
    } & {
        location?: {
            path?: number[];
            span?: number[];
            leadingComments?: string;
            trailingComments?: string;
            leadingDetachedComments?: string[];
        }[] & ({
            path?: number[];
            span?: number[];
            leadingComments?: string;
            trailingComments?: string;
            leadingDetachedComments?: string[];
        } & {
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K in Exclude<keyof I["location"], keyof {
            path?: number[];
            span?: number[];
            leadingComments?: string;
            trailingComments?: string;
            leadingDetachedComments?: string[];
        }[]>]: never; };
    } & { [K_1 in Exclude<keyof I, "location">]: never; }>(base?: I): SourceCodeInfo;
    fromPartial<I_1 extends {
        location?: {
            path?: number[];
            span?: number[];
            leadingComments?: string;
            trailingComments?: string;
            leadingDetachedComments?: string[];
        }[];
    } & {
        location?: {
            path?: number[];
            span?: number[];
            leadingComments?: string;
            trailingComments?: string;
            leadingDetachedComments?: string[];
        }[] & ({
            path?: number[];
            span?: number[];
            leadingComments?: string;
            trailingComments?: string;
            leadingDetachedComments?: string[];
        } & {
            path?: number[] & number[] & {
                [x: string]: never;
            };
            span?: number[] & number[] & {
                [x: string]: never;
            };
            leadingComments?: string;
            trailingComments?: string;
            leadingDetachedComments?: string[] & string[] & {
                [x: string]: never;
            };
        } & { [K_2 in Exclude<keyof I_1["location"][number], keyof SourceCodeInfo_Location>]: never; })[] & { [K_3 in Exclude<keyof I_1["location"], keyof {
            path?: number[];
            span?: number[];
            leadingComments?: string;
            trailingComments?: string;
            leadingDetachedComments?: string[];
        }[]>]: never; };
    } & { [K_4 in Exclude<keyof I_1, "location">]: never; }>(object: I_1): SourceCodeInfo;
};
export declare const SourceCodeInfo_Location: {
    encode(message: SourceCodeInfo_Location, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SourceCodeInfo_Location;
    fromJSON(object: any): SourceCodeInfo_Location;
    toJSON(message: SourceCodeInfo_Location): unknown;
    create<I extends {
        path?: number[];
        span?: number[];
        leadingComments?: string;
        trailingComments?: string;
        leadingDetachedComments?: string[];
    } & {
        path?: number[] & number[] & { [K in Exclude<keyof I["path"], keyof number[]>]: never; };
        span?: number[] & number[] & { [K_1 in Exclude<keyof I["span"], keyof number[]>]: never; };
        leadingComments?: string;
        trailingComments?: string;
        leadingDetachedComments?: string[] & string[] & { [K_2 in Exclude<keyof I["leadingDetachedComments"], keyof string[]>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof SourceCodeInfo_Location>]: never; }>(base?: I): SourceCodeInfo_Location;
    fromPartial<I_1 extends {
        path?: number[];
        span?: number[];
        leadingComments?: string;
        trailingComments?: string;
        leadingDetachedComments?: string[];
    } & {
        path?: number[] & number[] & { [K_4 in Exclude<keyof I_1["path"], keyof number[]>]: never; };
        span?: number[] & number[] & { [K_5 in Exclude<keyof I_1["span"], keyof number[]>]: never; };
        leadingComments?: string;
        trailingComments?: string;
        leadingDetachedComments?: string[] & string[] & { [K_6 in Exclude<keyof I_1["leadingDetachedComments"], keyof string[]>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof SourceCodeInfo_Location>]: never; }>(object: I_1): SourceCodeInfo_Location;
};
export declare const GeneratedCodeInfo: {
    encode(message: GeneratedCodeInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GeneratedCodeInfo;
    fromJSON(object: any): GeneratedCodeInfo;
    toJSON(message: GeneratedCodeInfo): unknown;
    create<I extends {
        annotation?: {
            path?: number[];
            sourceFile?: string;
            begin?: number;
            end?: number;
        }[];
    } & {
        annotation?: {
            path?: number[];
            sourceFile?: string;
            begin?: number;
            end?: number;
        }[] & ({
            path?: number[];
            sourceFile?: string;
            begin?: number;
            end?: number;
        } & {
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K in Exclude<keyof I["annotation"], keyof {
            path?: number[];
            sourceFile?: string;
            begin?: number;
            end?: number;
        }[]>]: never; };
    } & { [K_1 in Exclude<keyof I, "annotation">]: never; }>(base?: I): GeneratedCodeInfo;
    fromPartial<I_1 extends {
        annotation?: {
            path?: number[];
            sourceFile?: string;
            begin?: number;
            end?: number;
        }[];
    } & {
        annotation?: {
            path?: number[];
            sourceFile?: string;
            begin?: number;
            end?: number;
        }[] & ({
            path?: number[];
            sourceFile?: string;
            begin?: number;
            end?: number;
        } & {
            path?: number[] & number[] & {
                [x: string]: never;
            };
            sourceFile?: string;
            begin?: number;
            end?: number;
        } & { [K_2 in Exclude<keyof I_1["annotation"][number], keyof GeneratedCodeInfo_Annotation>]: never; })[] & { [K_3 in Exclude<keyof I_1["annotation"], keyof {
            path?: number[];
            sourceFile?: string;
            begin?: number;
            end?: number;
        }[]>]: never; };
    } & { [K_4 in Exclude<keyof I_1, "annotation">]: never; }>(object: I_1): GeneratedCodeInfo;
};
export declare const GeneratedCodeInfo_Annotation: {
    encode(message: GeneratedCodeInfo_Annotation, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GeneratedCodeInfo_Annotation;
    fromJSON(object: any): GeneratedCodeInfo_Annotation;
    toJSON(message: GeneratedCodeInfo_Annotation): unknown;
    create<I extends {
        path?: number[];
        sourceFile?: string;
        begin?: number;
        end?: number;
    } & {
        path?: number[] & number[] & { [K in Exclude<keyof I["path"], keyof number[]>]: never; };
        sourceFile?: string;
        begin?: number;
        end?: number;
    } & { [K_1 in Exclude<keyof I, keyof GeneratedCodeInfo_Annotation>]: never; }>(base?: I): GeneratedCodeInfo_Annotation;
    fromPartial<I_1 extends {
        path?: number[];
        sourceFile?: string;
        begin?: number;
        end?: number;
    } & {
        path?: number[] & number[] & { [K_2 in Exclude<keyof I_1["path"], keyof number[]>]: never; };
        sourceFile?: string;
        begin?: number;
        end?: number;
    } & { [K_3 in Exclude<keyof I_1, keyof GeneratedCodeInfo_Annotation>]: never; }>(object: I_1): GeneratedCodeInfo_Annotation;
};
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};
