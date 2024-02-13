import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { Params } from "./auth";
export declare const protobufPackage = "cosmos.auth.v1beta1";
/** GenesisState defines the auth module's genesis state. */
export interface GenesisState {
    /** params defines all the parameters of the module. */
    params: Params | undefined;
    /** accounts are the accounts present at genesis. */
    accounts: Any[];
}
export declare const GenesisState: {
    encode(message: GenesisState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    create<I extends {
        params?: {
            maxMemoCharacters?: number;
            txSigLimit?: number;
            txSizeCostPerByte?: number;
            sigVerifyCostEd25519?: number;
            sigVerifyCostSecp256k1?: number;
        };
        accounts?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[];
    } & {
        params?: {
            maxMemoCharacters?: number;
            txSigLimit?: number;
            txSizeCostPerByte?: number;
            sigVerifyCostEd25519?: number;
            sigVerifyCostSecp256k1?: number;
        } & {
            maxMemoCharacters?: number;
            txSigLimit?: number;
            txSizeCostPerByte?: number;
            sigVerifyCostEd25519?: number;
            sigVerifyCostSecp256k1?: number;
        } & { [K in Exclude<keyof I["params"], keyof Params>]: never; };
        accounts?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[] & ({
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_1 in Exclude<keyof I["accounts"][number], keyof Any>]: never; })[] & { [K_2 in Exclude<keyof I["accounts"], keyof {
            typeUrl?: string;
            value?: Uint8Array;
        }[]>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof GenesisState>]: never; }>(base?: I): GenesisState;
    fromPartial<I_1 extends {
        params?: {
            maxMemoCharacters?: number;
            txSigLimit?: number;
            txSizeCostPerByte?: number;
            sigVerifyCostEd25519?: number;
            sigVerifyCostSecp256k1?: number;
        };
        accounts?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[];
    } & {
        params?: {
            maxMemoCharacters?: number;
            txSigLimit?: number;
            txSizeCostPerByte?: number;
            sigVerifyCostEd25519?: number;
            sigVerifyCostSecp256k1?: number;
        } & {
            maxMemoCharacters?: number;
            txSigLimit?: number;
            txSizeCostPerByte?: number;
            sigVerifyCostEd25519?: number;
            sigVerifyCostSecp256k1?: number;
        } & { [K_4 in Exclude<keyof I_1["params"], keyof Params>]: never; };
        accounts?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[] & ({
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_5 in Exclude<keyof I_1["accounts"][number], keyof Any>]: never; })[] & { [K_6 in Exclude<keyof I_1["accounts"], keyof {
            typeUrl?: string;
            value?: Uint8Array;
        }[]>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof GenesisState>]: never; }>(object: I_1): GenesisState;
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
