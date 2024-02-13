import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "cosmos.mint.v1beta1";
/** Minter represents the minting state. */
export interface Minter {
    /** current annual inflation rate */
    inflation: string;
    /** current annual expected provisions */
    annualProvisions: string;
}
/** Params defines the parameters for the x/mint module. */
export interface Params {
    /** type of coin to mint */
    mintDenom: string;
    /** maximum annual change in inflation rate */
    inflationRateChange: string;
    /** maximum inflation rate */
    inflationMax: string;
    /** minimum inflation rate */
    inflationMin: string;
    /** goal of percent bonded atoms */
    goalBonded: string;
    /** expected blocks per year */
    blocksPerYear: number;
}
export declare const Minter: {
    encode(message: Minter, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Minter;
    fromJSON(object: any): Minter;
    toJSON(message: Minter): unknown;
    create<I extends {
        inflation?: string;
        annualProvisions?: string;
    } & {
        inflation?: string;
        annualProvisions?: string;
    } & { [K in Exclude<keyof I, keyof Minter>]: never; }>(base?: I): Minter;
    fromPartial<I_1 extends {
        inflation?: string;
        annualProvisions?: string;
    } & {
        inflation?: string;
        annualProvisions?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof Minter>]: never; }>(object: I_1): Minter;
};
export declare const Params: {
    encode(message: Params, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Params;
    fromJSON(object: any): Params;
    toJSON(message: Params): unknown;
    create<I extends {
        mintDenom?: string;
        inflationRateChange?: string;
        inflationMax?: string;
        inflationMin?: string;
        goalBonded?: string;
        blocksPerYear?: number;
    } & {
        mintDenom?: string;
        inflationRateChange?: string;
        inflationMax?: string;
        inflationMin?: string;
        goalBonded?: string;
        blocksPerYear?: number;
    } & { [K in Exclude<keyof I, keyof Params>]: never; }>(base?: I): Params;
    fromPartial<I_1 extends {
        mintDenom?: string;
        inflationRateChange?: string;
        inflationMax?: string;
        inflationMin?: string;
        goalBonded?: string;
        blocksPerYear?: number;
    } & {
        mintDenom?: string;
        inflationRateChange?: string;
        inflationMax?: string;
        inflationMin?: string;
        goalBonded?: string;
        blocksPerYear?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof Params>]: never; }>(object: I_1): Params;
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
