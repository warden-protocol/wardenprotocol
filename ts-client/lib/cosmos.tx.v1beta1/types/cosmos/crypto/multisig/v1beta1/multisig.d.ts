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
    create<I extends {
        signatures?: Uint8Array[];
    } & {
        signatures?: Uint8Array[] & Uint8Array[] & { [K in Exclude<keyof I["signatures"], keyof Uint8Array[]>]: never; };
    } & { [K_1 in Exclude<keyof I, "signatures">]: never; }>(base?: I): MultiSignature;
    fromPartial<I_1 extends {
        signatures?: Uint8Array[];
    } & {
        signatures?: Uint8Array[] & Uint8Array[] & { [K_2 in Exclude<keyof I_1["signatures"], keyof Uint8Array[]>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "signatures">]: never; }>(object: I_1): MultiSignature;
};
export declare const CompactBitArray: {
    encode(message: CompactBitArray, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): CompactBitArray;
    fromJSON(object: any): CompactBitArray;
    toJSON(message: CompactBitArray): unknown;
    create<I extends {
        extraBitsStored?: number;
        elems?: Uint8Array;
    } & {
        extraBitsStored?: number;
        elems?: Uint8Array;
    } & { [K in Exclude<keyof I, keyof CompactBitArray>]: never; }>(base?: I): CompactBitArray;
    fromPartial<I_1 extends {
        extraBitsStored?: number;
        elems?: Uint8Array;
    } & {
        extraBitsStored?: number;
        elems?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, keyof CompactBitArray>]: never; }>(object: I_1): CompactBitArray;
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
