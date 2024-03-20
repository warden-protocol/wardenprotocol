import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "warden.warden.v1beta2";
/** Space is a collection of users (called owners) that manages a set of keys. */
export interface Space {
    id: number;
    creator: string;
    owners: string[];
    /**
     * Optional ID of the intent to be applied to every *admin* operation.
     * If not specified, the default intent is used.
     *
     * Admin operations are:
     * - warden.warden.Msg.AddSpaceOwner
     * - warden.warden.Msg.RemoveSpaceOwner
     *
     * The default intent is to allow any operation when at least one of its
     * owner approves it.
     */
    adminIntentId: number;
    /**
     * Optional ID of the intent to be applied to every *sign* operation.
     * If not specified, the default intent is used.
     *
     * Sign operations are:
     * - warden.warden.Msg.NewKeyRequest
     * - warden.warden.Msg.NewSignTransactionRequest
     * - warden.warden.Msg.NewSignatureRequest
     * - warden.warden.Msg.NewWalletRequest
     *
     * The default intent is to allow any operation when at least one of its
     * owner approves it.
     */
    signIntentId: number;
}
export declare const Space: {
    encode(message: Space, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Space;
    fromJSON(object: any): Space;
    toJSON(message: Space): unknown;
    create<I extends {
        id?: number;
        creator?: string;
        owners?: string[];
        adminIntentId?: number;
        signIntentId?: number;
    } & {
        id?: number;
        creator?: string;
        owners?: string[] & string[] & { [K in Exclude<keyof I["owners"], keyof string[]>]: never; };
        adminIntentId?: number;
        signIntentId?: number;
    } & { [K_1 in Exclude<keyof I, keyof Space>]: never; }>(base?: I): Space;
    fromPartial<I_1 extends {
        id?: number;
        creator?: string;
        owners?: string[];
        adminIntentId?: number;
        signIntentId?: number;
    } & {
        id?: number;
        creator?: string;
        owners?: string[] & string[] & { [K_2 in Exclude<keyof I_1["owners"], keyof string[]>]: never; };
        adminIntentId?: number;
        signIntentId?: number;
    } & { [K_3 in Exclude<keyof I_1, keyof Space>]: never; }>(object: I_1): Space;
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
