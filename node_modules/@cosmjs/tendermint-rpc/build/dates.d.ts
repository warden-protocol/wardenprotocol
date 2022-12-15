import { ReadonlyDate } from "readonly-date";
export interface ReadonlyDateWithNanoseconds extends ReadonlyDate {
    readonly nanoseconds?: number;
}
export interface DateWithNanoseconds extends Date {
    /** Nanoseconds after the time stored in a vanilla Date (millisecond granularity) */
    nanoseconds?: number;
}
export declare function fromRfc3339WithNanoseconds(dateTimeString: string): DateWithNanoseconds;
export declare function toRfc3339WithNanoseconds(dateTime: ReadonlyDateWithNanoseconds): string;
export declare function fromSeconds(seconds: number, nanos?: number): DateWithNanoseconds;
/**
 * Calculates the UNIX timestamp in seconds as well as the nanoseconds after the given second.
 *
 * This is useful when dealing with external systems like the protobuf type
 * [.google.protobuf.Timestamp](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.Timestamp)
 * or any other system that does not use millisecond precision.
 */
export declare function toSeconds(date: ReadonlyDateWithNanoseconds): {
    seconds: number;
    nanos: number;
};
/** @deprecated Use fromRfc3339WithNanoseconds/toRfc3339WithNanoseconds instead */
export declare class DateTime {
    /** @deprecated Use fromRfc3339WithNanoseconds instead */
    static decode(dateTimeString: string): ReadonlyDateWithNanoseconds;
    /** @deprecated Use toRfc3339WithNanoseconds instead */
    static encode(dateTime: ReadonlyDateWithNanoseconds): string;
}
