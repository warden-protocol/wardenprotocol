import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "cosmos.base.v1beta1";
/**
 * Coin defines a token with a denomination and an amount.
 *
 * NOTE: The amount field is an Int which implements the custom method
 * signatures required by gogoproto.
 */
export interface Coin {
    denom: string;
    amount: string;
}
/**
 * DecCoin defines a token with a denomination and a decimal amount.
 *
 * NOTE: The amount field is an Dec which implements the custom method
 * signatures required by gogoproto.
 */
export interface DecCoin {
    denom: string;
    amount: string;
}
export declare const Coin: {
    encode(message: Coin, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Coin;
    fromJSON(object: any): Coin;
    toJSON(message: Coin): unknown;
    create<I extends {
        denom?: string;
        amount?: string;
    } & {
        denom?: string;
        amount?: string;
    } & { [K in Exclude<keyof I, keyof Coin>]: never; }>(base?: I): Coin;
    fromPartial<I_1 extends {
        denom?: string;
        amount?: string;
    } & {
        denom?: string;
        amount?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof Coin>]: never; }>(object: I_1): Coin;
};
export declare const DecCoin: {
    encode(message: DecCoin, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DecCoin;
    fromJSON(object: any): DecCoin;
    toJSON(message: DecCoin): unknown;
    create<I extends {
        denom?: string;
        amount?: string;
    } & {
        denom?: string;
        amount?: string;
    } & { [K in Exclude<keyof I, keyof DecCoin>]: never; }>(base?: I): DecCoin;
    fromPartial<I_1 extends {
        denom?: string;
        amount?: string;
    } & {
        denom?: string;
        amount?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof DecCoin>]: never; }>(object: I_1): DecCoin;
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
