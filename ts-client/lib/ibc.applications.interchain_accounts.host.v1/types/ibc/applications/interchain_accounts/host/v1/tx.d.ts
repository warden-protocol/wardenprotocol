import _m0 from "protobufjs/minimal";
import { Params } from "./host";
export declare const protobufPackage = "ibc.applications.interchain_accounts.host.v1";
/** MsgUpdateParams defines the payload for Msg/UpdateParams */
export interface MsgUpdateParams {
    /** signer address */
    signer: string;
    /**
     * params defines the 27-interchain-accounts/host parameters to update.
     *
     * NOTE: All parameters must be supplied.
     */
    params: Params | undefined;
}
/** MsgUpdateParamsResponse defines the response for Msg/UpdateParams */
export interface MsgUpdateParamsResponse {
}
export declare const MsgUpdateParams: {
    encode(message: MsgUpdateParams, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParams;
    fromJSON(object: any): MsgUpdateParams;
    toJSON(message: MsgUpdateParams): unknown;
    create<I extends {
        signer?: string;
        params?: {
            hostEnabled?: boolean;
            allowMessages?: string[];
        };
    } & {
        signer?: string;
        params?: {
            hostEnabled?: boolean;
            allowMessages?: string[];
        } & {
            hostEnabled?: boolean;
            allowMessages?: string[] & string[] & { [K in Exclude<keyof I["params"]["allowMessages"], keyof string[]>]: never; };
        } & { [K_1 in Exclude<keyof I["params"], keyof Params>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof MsgUpdateParams>]: never; }>(base?: I): MsgUpdateParams;
    fromPartial<I_1 extends {
        signer?: string;
        params?: {
            hostEnabled?: boolean;
            allowMessages?: string[];
        };
    } & {
        signer?: string;
        params?: {
            hostEnabled?: boolean;
            allowMessages?: string[];
        } & {
            hostEnabled?: boolean;
            allowMessages?: string[] & string[] & { [K_3 in Exclude<keyof I_1["params"]["allowMessages"], keyof string[]>]: never; };
        } & { [K_4 in Exclude<keyof I_1["params"], keyof Params>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof MsgUpdateParams>]: never; }>(object: I_1): MsgUpdateParams;
};
export declare const MsgUpdateParamsResponse: {
    encode(_: MsgUpdateParamsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParamsResponse;
    fromJSON(_: any): MsgUpdateParamsResponse;
    toJSON(_: MsgUpdateParamsResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgUpdateParamsResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgUpdateParamsResponse;
};
/** Msg defines the 27-interchain-accounts/host Msg service. */
export interface Msg {
    /** UpdateParams defines a rpc handler for MsgUpdateParams. */
    UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}
export declare const MsgServiceName = "ibc.applications.interchain_accounts.host.v1.Msg";
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
