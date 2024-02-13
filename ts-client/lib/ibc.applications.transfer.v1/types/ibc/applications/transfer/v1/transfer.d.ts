import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "ibc.applications.transfer.v1";
/**
 * DenomTrace contains the base denomination for ICS20 fungible tokens and the
 * source tracing information path.
 */
export interface DenomTrace {
    /**
     * path defines the chain of port/channel identifiers used for tracing the
     * source of the fungible token.
     */
    path: string;
    /** base denomination of the relayed fungible token. */
    baseDenom: string;
}
/**
 * Params defines the set of IBC transfer parameters.
 * NOTE: To prevent a single token from being transferred, set the
 * TransfersEnabled parameter to true and then set the bank module's SendEnabled
 * parameter for the denomination to false.
 */
export interface Params {
    /**
     * send_enabled enables or disables all cross-chain token transfers from this
     * chain.
     */
    sendEnabled: boolean;
    /**
     * receive_enabled enables or disables all cross-chain token transfers to this
     * chain.
     */
    receiveEnabled: boolean;
}
export declare const DenomTrace: {
    encode(message: DenomTrace, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DenomTrace;
    fromJSON(object: any): DenomTrace;
    toJSON(message: DenomTrace): unknown;
    create<I extends {
        path?: string;
        baseDenom?: string;
    } & {
        path?: string;
        baseDenom?: string;
    } & { [K in Exclude<keyof I, keyof DenomTrace>]: never; }>(base?: I): DenomTrace;
    fromPartial<I_1 extends {
        path?: string;
        baseDenom?: string;
    } & {
        path?: string;
        baseDenom?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof DenomTrace>]: never; }>(object: I_1): DenomTrace;
};
export declare const Params: {
    encode(message: Params, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Params;
    fromJSON(object: any): Params;
    toJSON(message: Params): unknown;
    create<I extends {
        sendEnabled?: boolean;
        receiveEnabled?: boolean;
    } & {
        sendEnabled?: boolean;
        receiveEnabled?: boolean;
    } & { [K in Exclude<keyof I, keyof Params>]: never; }>(base?: I): Params;
    fromPartial<I_1 extends {
        sendEnabled?: boolean;
        receiveEnabled?: boolean;
    } & {
        sendEnabled?: boolean;
        receiveEnabled?: boolean;
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
