import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { Grant } from "./authz";
export declare const protobufPackage = "cosmos.authz.v1beta1";
/** Since: cosmos-sdk 0.43 */
/**
 * MsgGrant is a request type for Grant method. It declares authorization to the grantee
 * on behalf of the granter with the provided expiration time.
 */
export interface MsgGrant {
    granter: string;
    grantee: string;
    grant: Grant | undefined;
}
/** MsgGrantResponse defines the Msg/MsgGrant response type. */
export interface MsgGrantResponse {
}
/**
 * MsgExec attempts to execute the provided messages using
 * authorizations granted to the grantee. Each message should have only
 * one signer corresponding to the granter of the authorization.
 */
export interface MsgExec {
    grantee: string;
    /**
     * Execute Msg.
     * The x/authz will try to find a grant matching (msg.signers[0], grantee, MsgTypeURL(msg))
     * triple and validate it.
     */
    msgs: Any[];
}
/** MsgExecResponse defines the Msg/MsgExecResponse response type. */
export interface MsgExecResponse {
    results: Uint8Array[];
}
/**
 * MsgRevoke revokes any authorization with the provided sdk.Msg type on the
 * granter's account with that has been granted to the grantee.
 */
export interface MsgRevoke {
    granter: string;
    grantee: string;
    msgTypeUrl: string;
}
/** MsgRevokeResponse defines the Msg/MsgRevokeResponse response type. */
export interface MsgRevokeResponse {
}
export declare const MsgGrant: {
    encode(message: MsgGrant, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgGrant;
    fromJSON(object: any): MsgGrant;
    toJSON(message: MsgGrant): unknown;
    create<I extends {
        granter?: string;
        grantee?: string;
        grant?: {
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            expiration?: Date;
        };
    } & {
        granter?: string;
        grantee?: string;
        grant?: {
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            expiration?: Date;
        } & {
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K in Exclude<keyof I["grant"]["authorization"], keyof Any>]: never; };
            expiration?: Date;
        } & { [K_1 in Exclude<keyof I["grant"], keyof Grant>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof MsgGrant>]: never; }>(base?: I): MsgGrant;
    fromPartial<I_1 extends {
        granter?: string;
        grantee?: string;
        grant?: {
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            expiration?: Date;
        };
    } & {
        granter?: string;
        grantee?: string;
        grant?: {
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            expiration?: Date;
        } & {
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_3 in Exclude<keyof I_1["grant"]["authorization"], keyof Any>]: never; };
            expiration?: Date;
        } & { [K_4 in Exclude<keyof I_1["grant"], keyof Grant>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof MsgGrant>]: never; }>(object: I_1): MsgGrant;
};
export declare const MsgGrantResponse: {
    encode(_: MsgGrantResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgGrantResponse;
    fromJSON(_: any): MsgGrantResponse;
    toJSON(_: MsgGrantResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgGrantResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgGrantResponse;
};
export declare const MsgExec: {
    encode(message: MsgExec, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgExec;
    fromJSON(object: any): MsgExec;
    toJSON(message: MsgExec): unknown;
    create<I extends {
        grantee?: string;
        msgs?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[];
    } & {
        grantee?: string;
        msgs?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[] & ({
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K in Exclude<keyof I["msgs"][number], keyof Any>]: never; })[] & { [K_1 in Exclude<keyof I["msgs"], keyof {
            typeUrl?: string;
            value?: Uint8Array;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof MsgExec>]: never; }>(base?: I): MsgExec;
    fromPartial<I_1 extends {
        grantee?: string;
        msgs?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[];
    } & {
        grantee?: string;
        msgs?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[] & ({
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_3 in Exclude<keyof I_1["msgs"][number], keyof Any>]: never; })[] & { [K_4 in Exclude<keyof I_1["msgs"], keyof {
            typeUrl?: string;
            value?: Uint8Array;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof MsgExec>]: never; }>(object: I_1): MsgExec;
};
export declare const MsgExecResponse: {
    encode(message: MsgExecResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgExecResponse;
    fromJSON(object: any): MsgExecResponse;
    toJSON(message: MsgExecResponse): unknown;
    create<I extends {
        results?: Uint8Array[];
    } & {
        results?: Uint8Array[] & Uint8Array[] & { [K in Exclude<keyof I["results"], keyof Uint8Array[]>]: never; };
    } & { [K_1 in Exclude<keyof I, "results">]: never; }>(base?: I): MsgExecResponse;
    fromPartial<I_1 extends {
        results?: Uint8Array[];
    } & {
        results?: Uint8Array[] & Uint8Array[] & { [K_2 in Exclude<keyof I_1["results"], keyof Uint8Array[]>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "results">]: never; }>(object: I_1): MsgExecResponse;
};
export declare const MsgRevoke: {
    encode(message: MsgRevoke, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgRevoke;
    fromJSON(object: any): MsgRevoke;
    toJSON(message: MsgRevoke): unknown;
    create<I extends {
        granter?: string;
        grantee?: string;
        msgTypeUrl?: string;
    } & {
        granter?: string;
        grantee?: string;
        msgTypeUrl?: string;
    } & { [K in Exclude<keyof I, keyof MsgRevoke>]: never; }>(base?: I): MsgRevoke;
    fromPartial<I_1 extends {
        granter?: string;
        grantee?: string;
        msgTypeUrl?: string;
    } & {
        granter?: string;
        grantee?: string;
        msgTypeUrl?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgRevoke>]: never; }>(object: I_1): MsgRevoke;
};
export declare const MsgRevokeResponse: {
    encode(_: MsgRevokeResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgRevokeResponse;
    fromJSON(_: any): MsgRevokeResponse;
    toJSON(_: MsgRevokeResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgRevokeResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgRevokeResponse;
};
/** Msg defines the authz Msg service. */
export interface Msg {
    /**
     * Grant grants the provided authorization to the grantee on the granter's
     * account with the provided expiration time. If there is already a grant
     * for the given (granter, grantee, Authorization) triple, then the grant
     * will be overwritten.
     */
    Grant(request: MsgGrant): Promise<MsgGrantResponse>;
    /**
     * Exec attempts to execute the provided messages using
     * authorizations granted to the grantee. Each message should have only
     * one signer corresponding to the granter of the authorization.
     */
    Exec(request: MsgExec): Promise<MsgExecResponse>;
    /**
     * Revoke revokes any authorization corresponding to the provided method name on the
     * granter's account that has been granted to the grantee.
     */
    Revoke(request: MsgRevoke): Promise<MsgRevokeResponse>;
}
export declare const MsgServiceName = "cosmos.authz.v1beta1.Msg";
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    Grant(request: MsgGrant): Promise<MsgGrantResponse>;
    Exec(request: MsgExec): Promise<MsgExecResponse>;
    Revoke(request: MsgRevoke): Promise<MsgRevokeResponse>;
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
