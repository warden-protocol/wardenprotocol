import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "ibc.applications.interchain_accounts.host.v1";
/**
 * Params defines the set of on-chain interchain accounts parameters.
 * The following parameters may be used to disable the host submodule.
 */
export interface Params {
    /** host_enabled enables or disables the host submodule. */
    hostEnabled: boolean;
    /** allow_messages defines a list of sdk message typeURLs allowed to be executed on a host chain. */
    allowMessages: string[];
}
export declare const Params: {
    encode(message: Params, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Params;
    fromJSON(object: any): Params;
    toJSON(message: Params): unknown;
    create<I extends {
        hostEnabled?: boolean;
        allowMessages?: string[];
    } & {
        hostEnabled?: boolean;
        allowMessages?: string[] & string[] & { [K in Exclude<keyof I["allowMessages"], keyof string[]>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof Params>]: never; }>(base?: I): Params;
    fromPartial<I_1 extends {
        hostEnabled?: boolean;
        allowMessages?: string[];
    } & {
        hostEnabled?: boolean;
        allowMessages?: string[] & string[] & { [K_2 in Exclude<keyof I_1["allowMessages"], keyof string[]>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof Params>]: never; }>(object: I_1): Params;
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
