import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "ibc.applications.fee.v1";
/**
 * Metadata defines the ICS29 channel specific metadata encoded into the channel version bytestring
 * See ICS004: https://github.com/cosmos/ibc/tree/master/spec/core/ics-004-channel-and-packet-semantics#Versioning
 */
export interface Metadata {
    /** fee_version defines the ICS29 fee version */
    feeVersion: string;
    /** app_version defines the underlying application version, which may or may not be a JSON encoded bytestring */
    appVersion: string;
}
export declare const Metadata: {
    encode(message: Metadata, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Metadata;
    fromJSON(object: any): Metadata;
    toJSON(message: Metadata): unknown;
    create<I extends {
        feeVersion?: string;
        appVersion?: string;
    } & {
        feeVersion?: string;
        appVersion?: string;
    } & { [K in Exclude<keyof I, keyof Metadata>]: never; }>(base?: I): Metadata;
    fromPartial<I_1 extends {
        feeVersion?: string;
        appVersion?: string;
    } & {
        feeVersion?: string;
        appVersion?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof Metadata>]: never; }>(object: I_1): Metadata;
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
