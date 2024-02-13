import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "ibc.applications.interchain_accounts.controller.v1";
/**
 * Params defines the set of on-chain interchain accounts parameters.
 * The following parameters may be used to disable the controller submodule.
 */
export interface Params {
    /** controller_enabled enables or disables the controller submodule. */
    controllerEnabled: boolean;
}
export declare const Params: {
    encode(message: Params, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Params;
    fromJSON(object: any): Params;
    toJSON(message: Params): unknown;
    create<I extends {
        controllerEnabled?: boolean;
    } & {
        controllerEnabled?: boolean;
    } & { [K in Exclude<keyof I, "controllerEnabled">]: never; }>(base?: I): Params;
    fromPartial<I_1 extends {
        controllerEnabled?: boolean;
    } & {
        controllerEnabled?: boolean;
    } & { [K_1 in Exclude<keyof I_1, "controllerEnabled">]: never; }>(object: I_1): Params;
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
