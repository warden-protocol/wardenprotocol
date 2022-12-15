import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "cosmos.crypto.multisig.v1beta1";
/**
 * MultiSignature wraps the signatures from a multisig.LegacyAminoPubKey.
 * See cosmos.tx.v1betata1.ModeInfo.Multi for how to specify which signers
 * signed and with which modes.
 */
export interface MultiSignature {
    signatures: Uint8Array[];
}
/**
 * CompactBitArray is an implementation of a space efficient bit array.
 * This is used to ensure that the encoded data takes up a minimal amount of
 * space after proto encoding.
 * This is not thread safe, and is not intended for concurrent usage.
 */
export interface CompactBitArray {
    extraBitsStored: number;
    elems: Uint8Array;
}
export declare const MultiSignature: {
    encode(message: MultiSignature, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MultiSignature;
    fromJSON(object: any): MultiSignature;
    toJSON(message: MultiSignature): unknown;
    fromPartial<I extends {
        signatures?: Uint8Array[] | undefined;
    } & {
        signatures?: (Uint8Array[] & Uint8Array[] & { [K in Exclude<keyof I["signatures"], keyof Uint8Array[]>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "signatures">]: never; }>(object: I): MultiSignature;
};
export declare const CompactBitArray: {
    encode(message: CompactBitArray, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): CompactBitArray;
    fromJSON(object: any): CompactBitArray;
    toJSON(message: CompactBitArray): unknown;
    fromPartial<I extends {
        extraBitsStored?: number | undefined;
        elems?: Uint8Array | undefined;
    } & {
        extraBitsStored?: number | undefined;
        elems?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, keyof CompactBitArray>]: never; }>(object: I): CompactBitArray;
};
declare type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
declare type KeysOfUnion<T> = T extends T ? keyof T : never;
export declare type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};
