import type { AnyMessage, Message } from "./message.js";
import type { MessageType } from "./message-type.js";
/**
 * ServiceType represents a protobuf services. It provides metadata for
 * reflection-based operations.
 */
export interface ServiceType {
    /**
     * The fully qualified name of the service.
     */
    readonly typeName: string;
    /**
     * A map of local name (safe to use in ECMAScript) to method.
     */
    readonly methods: {
        [localName: string]: MethodInfo;
    };
}
/**
 * MethodInfo represents a method of a protobuf service, a remote procedure
 * call. All methods provide the following properties:
 *
 * - "name": The original name of the protobuf rpc.
 * - "I": The input message type.
 * - "O": The output message type.
 * - "kind": The method type.
 * - "idempotency": User-provided indication whether the method will cause
 *   the same effect every time it is called.
 */
export type MethodInfo<I extends Message<I> = AnyMessage, O extends Message<O> = AnyMessage> = MethodInfoUnary<I, O> | MethodInfoServerStreaming<I, O> | MethodInfoClientStreaming<I, O> | MethodInfoBiDiStreaming<I, O>;
/**
 * A unary method: rpc (Input) returns (Output)
 */
export interface MethodInfoUnary<I extends Message<I>, O extends Message<O>> extends miShared<I, O> {
    readonly kind: MethodKind.Unary;
}
/**
 * A server streaming method: rpc (Input) returns (stream Output)
 */
export interface MethodInfoServerStreaming<I extends Message<I>, O extends Message<O>> extends miShared<I, O> {
    readonly kind: MethodKind.ServerStreaming;
}
/**
 * A client streaming method: rpc (stream Input) returns (Output)
 */
export interface MethodInfoClientStreaming<I extends Message<I>, O extends Message<O>> extends miShared<I, O> {
    readonly kind: MethodKind.ClientStreaming;
}
/**
 * A method that streams bi-directionally: rpc (stream Input) returns (stream Output)
 */
export interface MethodInfoBiDiStreaming<I extends Message<I>, O extends Message<O>> extends miShared<I, O> {
    readonly kind: MethodKind.BiDiStreaming;
}
interface miShared<I extends Message<I> = AnyMessage, O extends Message<O> = AnyMessage> {
    readonly name: string;
    readonly I: MessageType<I>;
    readonly O: MessageType<O>;
    readonly idempotency?: MethodIdempotency;
}
/**
 * MethodKind represents the four method types that can be declared in
 * protobuf with the `stream` keyword:
 *
 * 1. Unary:           rpc (Input) returns (Output)
 * 2. ServerStreaming: rpc (Input) returns (stream Output)
 * 3. ClientStreaming: rpc (stream Input) returns (Output)
 * 4. BiDiStreaming:   rpc (stream Input) returns (stream Output)
 */
export declare enum MethodKind {
    Unary = 0,
    ServerStreaming = 1,
    ClientStreaming = 2,
    BiDiStreaming = 3
}
/**
 * Is this method side-effect-free (or safe in HTTP parlance), or just
 * idempotent, or neither? HTTP based RPC implementation may choose GET verb
 * for safe methods, and PUT verb for idempotent methods instead of the
 * default POST.
 *
 * This enum matches the protobuf enum google.protobuf.MethodOptions.IdempotencyLevel,
 * defined in the well-known type google/protobuf/descriptor.proto, but
 * drops UNKNOWN.
 */
export declare enum MethodIdempotency {
    /**
     * Idempotent, no side effects.
     */
    NoSideEffects = 1,
    /**
     * Idempotent, but may have side effects.
     */
    Idempotent = 2
}
export {};
