import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
export declare const protobufPackage = "cosmos.evidence.v1beta1";
/** GenesisState defines the evidence module's genesis state. */
export interface GenesisState {
    /** evidence defines all the evidence at genesis. */
    evidence: Any[];
}
export declare const GenesisState: {
    encode(message: GenesisState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    create<I extends {
        evidence?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[];
    } & {
        evidence?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[] & ({
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K in Exclude<keyof I["evidence"][number], keyof Any>]: never; })[] & { [K_1 in Exclude<keyof I["evidence"], keyof {
            typeUrl?: string;
            value?: Uint8Array;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, "evidence">]: never; }>(base?: I): GenesisState;
    fromPartial<I_1 extends {
        evidence?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[];
    } & {
        evidence?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[] & ({
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_3 in Exclude<keyof I_1["evidence"][number], keyof Any>]: never; })[] & { [K_4 in Exclude<keyof I_1["evidence"], keyof {
            typeUrl?: string;
            value?: Uint8Array;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, "evidence">]: never; }>(object: I_1): GenesisState;
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
