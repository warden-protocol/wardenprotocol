import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "tendermint.crypto";
/** PublicKey defines the keys available for use with Validators */
export interface PublicKey {
    ed25519?: Uint8Array | undefined;
    secp256k1?: Uint8Array | undefined;
}
export declare const PublicKey: {
    encode(message: PublicKey, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PublicKey;
    fromJSON(object: any): PublicKey;
    toJSON(message: PublicKey): unknown;
    create<I extends {
        ed25519?: Uint8Array | undefined;
        secp256k1?: Uint8Array | undefined;
    } & {
        ed25519?: Uint8Array | undefined;
        secp256k1?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, keyof PublicKey>]: never; }>(base?: I): PublicKey;
    fromPartial<I_1 extends {
        ed25519?: Uint8Array | undefined;
        secp256k1?: Uint8Array | undefined;
    } & {
        ed25519?: Uint8Array | undefined;
        secp256k1?: Uint8Array | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof PublicKey>]: never; }>(object: I_1): PublicKey;
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
