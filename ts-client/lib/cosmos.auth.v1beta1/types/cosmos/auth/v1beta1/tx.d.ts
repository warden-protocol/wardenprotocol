import _m0 from "protobufjs/minimal";
import { Params } from "./auth";
export declare const protobufPackage = "cosmos.auth.v1beta1";
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParams {
    /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
    authority: string;
    /**
     * params defines the x/auth parameters to update.
     *
     * NOTE: All parameters must be supplied.
     */
    params: Params | undefined;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsResponse {
}
export declare const MsgUpdateParams: {
    encode(message: MsgUpdateParams, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParams;
    fromJSON(object: any): MsgUpdateParams;
    toJSON(message: MsgUpdateParams): unknown;
    create<I extends {
        authority?: string;
        params?: {
            maxMemoCharacters?: number;
            txSigLimit?: number;
            txSizeCostPerByte?: number;
            sigVerifyCostEd25519?: number;
            sigVerifyCostSecp256k1?: number;
        };
    } & {
        authority?: string;
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
    } & { [K_1 in Exclude<keyof I, keyof MsgUpdateParams>]: never; }>(base?: I): MsgUpdateParams;
    fromPartial<I_1 extends {
        authority?: string;
        params?: {
            maxMemoCharacters?: number;
            txSigLimit?: number;
            txSizeCostPerByte?: number;
            sigVerifyCostEd25519?: number;
            sigVerifyCostSecp256k1?: number;
        };
    } & {
        authority?: string;
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
        } & { [K_2 in Exclude<keyof I_1["params"], keyof Params>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof MsgUpdateParams>]: never; }>(object: I_1): MsgUpdateParams;
};
export declare const MsgUpdateParamsResponse: {
    encode(_: MsgUpdateParamsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParamsResponse;
    fromJSON(_: any): MsgUpdateParamsResponse;
    toJSON(_: MsgUpdateParamsResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgUpdateParamsResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgUpdateParamsResponse;
};
/** Msg defines the x/auth Msg service. */
export interface Msg {
    /**
     * UpdateParams defines a (governance) operation for updating the x/auth module
     * parameters. The authority defaults to the x/gov module account.
     *
     * Since: cosmos-sdk 0.47
     */
    UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}
export declare const MsgServiceName = "cosmos.auth.v1beta1.Msg";
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
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
