import _m0 from "protobufjs/minimal";
import { Coin } from "../../base/v1beta1/coin";
export declare const protobufPackage = "cosmos.crisis.v1beta1";
/** GenesisState defines the crisis module's genesis state. */
export interface GenesisState {
    /**
     * constant_fee is the fee used to verify the invariant in the crisis
     * module.
     */
    constantFee: Coin | undefined;
}
export declare const GenesisState: {
    encode(message: GenesisState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    create<I extends {
        constantFee?: {
            denom?: string;
            amount?: string;
        };
    } & {
        constantFee?: {
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["constantFee"], keyof Coin>]: never; };
    } & { [K_1 in Exclude<keyof I, "constantFee">]: never; }>(base?: I): GenesisState;
    fromPartial<I_1 extends {
        constantFee?: {
            denom?: string;
            amount?: string;
        };
    } & {
        constantFee?: {
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_2 in Exclude<keyof I_1["constantFee"], keyof Coin>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "constantFee">]: never; }>(object: I_1): GenesisState;
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
