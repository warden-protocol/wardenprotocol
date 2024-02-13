import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
export declare const protobufPackage = "cosmos.auth.v1beta1";
/**
 * BaseAccount defines a base account type. It contains all the necessary fields
 * for basic account functionality. Any custom account type should extend this
 * type for additional functionality (e.g. vesting).
 */
export interface BaseAccount {
    address: string;
    pubKey: Any | undefined;
    accountNumber: number;
    sequence: number;
}
/** ModuleAccount defines an account for modules that holds coins on a pool. */
export interface ModuleAccount {
    baseAccount: BaseAccount | undefined;
    name: string;
    permissions: string[];
}
/**
 * ModuleCredential represents a unclaimable pubkey for base accounts controlled by modules.
 *
 * Since: cosmos-sdk 0.47
 */
export interface ModuleCredential {
    /** module_name is the name of the module used for address derivation (passed into address.Module). */
    moduleName: string;
    /**
     * derivation_keys is for deriving a module account address (passed into address.Module)
     * adding more keys creates sub-account addresses (passed into address.Derive)
     */
    derivationKeys: Uint8Array[];
}
/** Params defines the parameters for the auth module. */
export interface Params {
    maxMemoCharacters: number;
    txSigLimit: number;
    txSizeCostPerByte: number;
    sigVerifyCostEd25519: number;
    sigVerifyCostSecp256k1: number;
}
export declare const BaseAccount: {
    encode(message: BaseAccount, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): BaseAccount;
    fromJSON(object: any): BaseAccount;
    toJSON(message: BaseAccount): unknown;
    create<I extends {
        address?: string;
        pubKey?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        accountNumber?: number;
        sequence?: number;
    } & {
        address?: string;
        pubKey?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K in Exclude<keyof I["pubKey"], keyof Any>]: never; };
        accountNumber?: number;
        sequence?: number;
    } & { [K_1 in Exclude<keyof I, keyof BaseAccount>]: never; }>(base?: I): BaseAccount;
    fromPartial<I_1 extends {
        address?: string;
        pubKey?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        accountNumber?: number;
        sequence?: number;
    } & {
        address?: string;
        pubKey?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_2 in Exclude<keyof I_1["pubKey"], keyof Any>]: never; };
        accountNumber?: number;
        sequence?: number;
    } & { [K_3 in Exclude<keyof I_1, keyof BaseAccount>]: never; }>(object: I_1): BaseAccount;
};
export declare const ModuleAccount: {
    encode(message: ModuleAccount, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ModuleAccount;
    fromJSON(object: any): ModuleAccount;
    toJSON(message: ModuleAccount): unknown;
    create<I extends {
        baseAccount?: {
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            accountNumber?: number;
            sequence?: number;
        };
        name?: string;
        permissions?: string[];
    } & {
        baseAccount?: {
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            accountNumber?: number;
            sequence?: number;
        } & {
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K in Exclude<keyof I["baseAccount"]["pubKey"], keyof Any>]: never; };
            accountNumber?: number;
            sequence?: number;
        } & { [K_1 in Exclude<keyof I["baseAccount"], keyof BaseAccount>]: never; };
        name?: string;
        permissions?: string[] & string[] & { [K_2 in Exclude<keyof I["permissions"], keyof string[]>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof ModuleAccount>]: never; }>(base?: I): ModuleAccount;
    fromPartial<I_1 extends {
        baseAccount?: {
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            accountNumber?: number;
            sequence?: number;
        };
        name?: string;
        permissions?: string[];
    } & {
        baseAccount?: {
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            accountNumber?: number;
            sequence?: number;
        } & {
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_4 in Exclude<keyof I_1["baseAccount"]["pubKey"], keyof Any>]: never; };
            accountNumber?: number;
            sequence?: number;
        } & { [K_5 in Exclude<keyof I_1["baseAccount"], keyof BaseAccount>]: never; };
        name?: string;
        permissions?: string[] & string[] & { [K_6 in Exclude<keyof I_1["permissions"], keyof string[]>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof ModuleAccount>]: never; }>(object: I_1): ModuleAccount;
};
export declare const ModuleCredential: {
    encode(message: ModuleCredential, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ModuleCredential;
    fromJSON(object: any): ModuleCredential;
    toJSON(message: ModuleCredential): unknown;
    create<I extends {
        moduleName?: string;
        derivationKeys?: Uint8Array[];
    } & {
        moduleName?: string;
        derivationKeys?: Uint8Array[] & Uint8Array[] & { [K in Exclude<keyof I["derivationKeys"], keyof Uint8Array[]>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof ModuleCredential>]: never; }>(base?: I): ModuleCredential;
    fromPartial<I_1 extends {
        moduleName?: string;
        derivationKeys?: Uint8Array[];
    } & {
        moduleName?: string;
        derivationKeys?: Uint8Array[] & Uint8Array[] & { [K_2 in Exclude<keyof I_1["derivationKeys"], keyof Uint8Array[]>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof ModuleCredential>]: never; }>(object: I_1): ModuleCredential;
};
export declare const Params: {
    encode(message: Params, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Params;
    fromJSON(object: any): Params;
    toJSON(message: Params): unknown;
    create<I extends {
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
    } & { [K in Exclude<keyof I, keyof Params>]: never; }>(base?: I): Params;
    fromPartial<I_1 extends {
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
