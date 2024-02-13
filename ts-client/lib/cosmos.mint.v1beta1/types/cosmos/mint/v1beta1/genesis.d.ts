import _m0 from "protobufjs/minimal";
import { Minter, Params } from "./mint";
export declare const protobufPackage = "cosmos.mint.v1beta1";
/** GenesisState defines the mint module's genesis state. */
export interface GenesisState {
    /** minter is a space for holding current inflation information. */
    minter: Minter | undefined;
    /** params defines all the parameters of the module. */
    params: Params | undefined;
}
export declare const GenesisState: {
    encode(message: GenesisState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    create<I extends {
        minter?: {
            inflation?: string;
            annualProvisions?: string;
        };
        params?: {
            mintDenom?: string;
            inflationRateChange?: string;
            inflationMax?: string;
            inflationMin?: string;
            goalBonded?: string;
            blocksPerYear?: number;
        };
    } & {
        minter?: {
            inflation?: string;
            annualProvisions?: string;
        } & {
            inflation?: string;
            annualProvisions?: string;
        } & { [K in Exclude<keyof I["minter"], keyof Minter>]: never; };
        params?: {
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
        } & { [K_1 in Exclude<keyof I["params"], keyof Params>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof GenesisState>]: never; }>(base?: I): GenesisState;
    fromPartial<I_1 extends {
        minter?: {
            inflation?: string;
            annualProvisions?: string;
        };
        params?: {
            mintDenom?: string;
            inflationRateChange?: string;
            inflationMax?: string;
            inflationMin?: string;
            goalBonded?: string;
            blocksPerYear?: number;
        };
    } & {
        minter?: {
            inflation?: string;
            annualProvisions?: string;
        } & {
            inflation?: string;
            annualProvisions?: string;
        } & { [K_3 in Exclude<keyof I_1["minter"], keyof Minter>]: never; };
        params?: {
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
        } & { [K_4 in Exclude<keyof I_1["params"], keyof Params>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof GenesisState>]: never; }>(object: I_1): GenesisState;
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
