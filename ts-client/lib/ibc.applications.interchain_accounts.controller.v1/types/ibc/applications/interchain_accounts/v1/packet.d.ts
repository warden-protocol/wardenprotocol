import _m0 from "protobufjs/minimal";
import { Any } from "../../../../google/protobuf/any";
export declare const protobufPackage = "ibc.applications.interchain_accounts.v1";
/**
 * Type defines a classification of message issued from a controller chain to its associated interchain accounts
 * host
 */
export declare enum Type {
    /** TYPE_UNSPECIFIED - Default zero value enumeration */
    TYPE_UNSPECIFIED = 0,
    /** TYPE_EXECUTE_TX - Execute a transaction on an interchain accounts host chain */
    TYPE_EXECUTE_TX = 1,
    UNRECOGNIZED = -1
}
export declare function typeFromJSON(object: any): Type;
export declare function typeToJSON(object: Type): string;
/** InterchainAccountPacketData is comprised of a raw transaction, type of transaction and optional memo field. */
export interface InterchainAccountPacketData {
    type: Type;
    data: Uint8Array;
    memo: string;
}
/** CosmosTx contains a list of sdk.Msg's. It should be used when sending transactions to an SDK host chain. */
export interface CosmosTx {
    messages: Any[];
}
export declare const InterchainAccountPacketData: {
    encode(message: InterchainAccountPacketData, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): InterchainAccountPacketData;
    fromJSON(object: any): InterchainAccountPacketData;
    toJSON(message: InterchainAccountPacketData): unknown;
    create<I extends {
        type?: Type;
        data?: Uint8Array;
        memo?: string;
    } & {
        type?: Type;
        data?: Uint8Array;
        memo?: string;
    } & { [K in Exclude<keyof I, keyof InterchainAccountPacketData>]: never; }>(base?: I): InterchainAccountPacketData;
    fromPartial<I_1 extends {
        type?: Type;
        data?: Uint8Array;
        memo?: string;
    } & {
        type?: Type;
        data?: Uint8Array;
        memo?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof InterchainAccountPacketData>]: never; }>(object: I_1): InterchainAccountPacketData;
};
export declare const CosmosTx: {
    encode(message: CosmosTx, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): CosmosTx;
    fromJSON(object: any): CosmosTx;
    toJSON(message: CosmosTx): unknown;
    create<I extends {
        messages?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[];
    } & {
        messages?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[] & ({
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K in Exclude<keyof I["messages"][number], keyof Any>]: never; })[] & { [K_1 in Exclude<keyof I["messages"], keyof {
            typeUrl?: string;
            value?: Uint8Array;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, "messages">]: never; }>(base?: I): CosmosTx;
    fromPartial<I_1 extends {
        messages?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[];
    } & {
        messages?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[] & ({
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_3 in Exclude<keyof I_1["messages"][number], keyof Any>]: never; })[] & { [K_4 in Exclude<keyof I_1["messages"], keyof {
            typeUrl?: string;
            value?: Uint8Array;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, "messages">]: never; }>(object: I_1): CosmosTx;
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
