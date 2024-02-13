import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "cosmos.authz.v1beta1";
/** Since: cosmos-sdk 0.43 */
/** EventGrant is emitted on Msg/Grant */
export interface EventGrant {
    /** Msg type URL for which an autorization is granted */
    msgTypeUrl: string;
    /** Granter account address */
    granter: string;
    /** Grantee account address */
    grantee: string;
}
/** EventRevoke is emitted on Msg/Revoke */
export interface EventRevoke {
    /** Msg type URL for which an autorization is revoked */
    msgTypeUrl: string;
    /** Granter account address */
    granter: string;
    /** Grantee account address */
    grantee: string;
}
export declare const EventGrant: {
    encode(message: EventGrant, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): EventGrant;
    fromJSON(object: any): EventGrant;
    toJSON(message: EventGrant): unknown;
    create<I extends {
        msgTypeUrl?: string;
        granter?: string;
        grantee?: string;
    } & {
        msgTypeUrl?: string;
        granter?: string;
        grantee?: string;
    } & { [K in Exclude<keyof I, keyof EventGrant>]: never; }>(base?: I): EventGrant;
    fromPartial<I_1 extends {
        msgTypeUrl?: string;
        granter?: string;
        grantee?: string;
    } & {
        msgTypeUrl?: string;
        granter?: string;
        grantee?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof EventGrant>]: never; }>(object: I_1): EventGrant;
};
export declare const EventRevoke: {
    encode(message: EventRevoke, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): EventRevoke;
    fromJSON(object: any): EventRevoke;
    toJSON(message: EventRevoke): unknown;
    create<I extends {
        msgTypeUrl?: string;
        granter?: string;
        grantee?: string;
    } & {
        msgTypeUrl?: string;
        granter?: string;
        grantee?: string;
    } & { [K in Exclude<keyof I, keyof EventRevoke>]: never; }>(base?: I): EventRevoke;
    fromPartial<I_1 extends {
        msgTypeUrl?: string;
        granter?: string;
        grantee?: string;
    } & {
        msgTypeUrl?: string;
        granter?: string;
        grantee?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof EventRevoke>]: never; }>(object: I_1): EventRevoke;
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
