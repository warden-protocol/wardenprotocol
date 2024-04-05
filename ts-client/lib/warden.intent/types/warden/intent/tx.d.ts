import _m0 from "protobufjs/minimal";
import { Params } from "./params";
export declare const protobufPackage = "warden.intent";
/** MsgUpdateParams is the Msg/UpdateParams request type. */
export interface MsgUpdateParams {
    /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
    authority: string;
    /** NOTE: All parameters must be supplied. */
    params: Params | undefined;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponse {
}
export interface MsgApproveAction {
    creator: string;
    actionType: string;
    actionId: number;
}
export interface MsgApproveActionResponse {
    status: string;
}
export interface MsgNewIntent {
    creator: string;
    name: string;
    definition: string;
}
export interface MsgNewIntentResponse {
    id: number;
}
export interface MsgRevokeAction {
    creator: string;
    actionType: string;
    actionId: number;
}
export interface MsgRevokeActionResponse {
}
export declare const MsgUpdateParams: {
    encode(message: MsgUpdateParams, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParams;
    fromJSON(object: any): MsgUpdateParams;
    toJSON(message: MsgUpdateParams): unknown;
    create<I extends {
        authority?: string;
        params?: {};
    } & {
        authority?: string;
        params?: {} & {} & { [K in Exclude<keyof I["params"], never>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof MsgUpdateParams>]: never; }>(base?: I): MsgUpdateParams;
    fromPartial<I_1 extends {
        authority?: string;
        params?: {};
    } & {
        authority?: string;
        params?: {} & {} & { [K_2 in Exclude<keyof I_1["params"], never>]: never; };
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
export declare const MsgApproveAction: {
    encode(message: MsgApproveAction, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgApproveAction;
    fromJSON(object: any): MsgApproveAction;
    toJSON(message: MsgApproveAction): unknown;
    create<I extends {
        creator?: string;
        actionType?: string;
        actionId?: number;
    } & {
        creator?: string;
        actionType?: string;
        actionId?: number;
    } & { [K in Exclude<keyof I, keyof MsgApproveAction>]: never; }>(base?: I): MsgApproveAction;
    fromPartial<I_1 extends {
        creator?: string;
        actionType?: string;
        actionId?: number;
    } & {
        creator?: string;
        actionType?: string;
        actionId?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgApproveAction>]: never; }>(object: I_1): MsgApproveAction;
};
export declare const MsgApproveActionResponse: {
    encode(message: MsgApproveActionResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgApproveActionResponse;
    fromJSON(object: any): MsgApproveActionResponse;
    toJSON(message: MsgApproveActionResponse): unknown;
    create<I extends {
        status?: string;
    } & {
        status?: string;
    } & { [K in Exclude<keyof I, "status">]: never; }>(base?: I): MsgApproveActionResponse;
    fromPartial<I_1 extends {
        status?: string;
    } & {
        status?: string;
    } & { [K_1 in Exclude<keyof I_1, "status">]: never; }>(object: I_1): MsgApproveActionResponse;
};
export declare const MsgNewIntent: {
    encode(message: MsgNewIntent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgNewIntent;
    fromJSON(object: any): MsgNewIntent;
    toJSON(message: MsgNewIntent): unknown;
    create<I extends {
        creator?: string;
        name?: string;
        definition?: string;
    } & {
        creator?: string;
        name?: string;
        definition?: string;
    } & { [K in Exclude<keyof I, keyof MsgNewIntent>]: never; }>(base?: I): MsgNewIntent;
    fromPartial<I_1 extends {
        creator?: string;
        name?: string;
        definition?: string;
    } & {
        creator?: string;
        name?: string;
        definition?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgNewIntent>]: never; }>(object: I_1): MsgNewIntent;
};
export declare const MsgNewIntentResponse: {
    encode(message: MsgNewIntentResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgNewIntentResponse;
    fromJSON(object: any): MsgNewIntentResponse;
    toJSON(message: MsgNewIntentResponse): unknown;
    create<I extends {
        id?: number;
    } & {
        id?: number;
    } & { [K in Exclude<keyof I, "id">]: never; }>(base?: I): MsgNewIntentResponse;
    fromPartial<I_1 extends {
        id?: number;
    } & {
        id?: number;
    } & { [K_1 in Exclude<keyof I_1, "id">]: never; }>(object: I_1): MsgNewIntentResponse;
};
export declare const MsgRevokeAction: {
    encode(message: MsgRevokeAction, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgRevokeAction;
    fromJSON(object: any): MsgRevokeAction;
    toJSON(message: MsgRevokeAction): unknown;
    create<I extends {
        creator?: string;
        actionType?: string;
        actionId?: number;
    } & {
        creator?: string;
        actionType?: string;
        actionId?: number;
    } & { [K in Exclude<keyof I, keyof MsgRevokeAction>]: never; }>(base?: I): MsgRevokeAction;
    fromPartial<I_1 extends {
        creator?: string;
        actionType?: string;
        actionId?: number;
    } & {
        creator?: string;
        actionType?: string;
        actionId?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgRevokeAction>]: never; }>(object: I_1): MsgRevokeAction;
};
export declare const MsgRevokeActionResponse: {
    encode(_: MsgRevokeActionResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgRevokeActionResponse;
    fromJSON(_: any): MsgRevokeActionResponse;
    toJSON(_: MsgRevokeActionResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgRevokeActionResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgRevokeActionResponse;
};
/** Msg defines the Msg service. */
export interface Msg {
    /**
     * UpdateParams defines a (governance) operation for updating the module
     * parameters. The authority defaults to the x/gov module account.
     */
    UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
    /** Add an approval to an existing Action. */
    ApproveAction(request: MsgApproveAction): Promise<MsgApproveActionResponse>;
    /** Create a new intent. */
    NewIntent(request: MsgNewIntent): Promise<MsgNewIntentResponse>;
    /** Revoke an existing Action while in pending state. */
    RevokeAction(request: MsgRevokeAction): Promise<MsgRevokeActionResponse>;
}
export declare const MsgServiceName = "warden.intent.Msg";
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
    ApproveAction(request: MsgApproveAction): Promise<MsgApproveActionResponse>;
    NewIntent(request: MsgNewIntent): Promise<MsgNewIntentResponse>;
    RevokeAction(request: MsgRevokeAction): Promise<MsgRevokeActionResponse>;
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
