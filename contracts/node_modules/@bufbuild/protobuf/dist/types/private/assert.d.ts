/**
 * Assert that condition is truthy or throw error (with message)
 */
export declare function assert(condition: unknown, msg?: string): asserts condition;
/**
 * Assert a valid signed protobuf 32-bit integer.
 */
export declare function assertInt32(arg: unknown): asserts arg is number;
/**
 * Assert a valid unsigned protobuf 32-bit integer.
 */
export declare function assertUInt32(arg: unknown): asserts arg is number;
/**
 * Assert a valid protobuf float value.
 */
export declare function assertFloat32(arg: unknown): asserts arg is number;
