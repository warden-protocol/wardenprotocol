import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "warden.warden";
export interface Keychain {
    address: string;
    creator: string;
    description: string;
    admins: string[];
    parties: string[];
    adminIntentId: number;
    fees: KeychainFees | undefined;
    isActive: boolean;
}
export interface KeychainFees {
    keyReq: number;
    sigReq: number;
}
export declare const Keychain: {
    encode(message: Keychain, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Keychain;
    fromJSON(object: any): Keychain;
    toJSON(message: Keychain): unknown;
    create<I extends {
        address?: string;
        creator?: string;
        description?: string;
        admins?: string[];
        parties?: string[];
        adminIntentId?: number;
        fees?: {
            keyReq?: number;
            sigReq?: number;
        };
        isActive?: boolean;
    } & {
        address?: string;
        creator?: string;
        description?: string;
        admins?: string[] & string[] & { [K in Exclude<keyof I["admins"], keyof string[]>]: never; };
        parties?: string[] & string[] & { [K_1 in Exclude<keyof I["parties"], keyof string[]>]: never; };
        adminIntentId?: number;
        fees?: {
            keyReq?: number;
            sigReq?: number;
        } & {
            keyReq?: number;
            sigReq?: number;
        } & { [K_2 in Exclude<keyof I["fees"], keyof KeychainFees>]: never; };
        isActive?: boolean;
    } & { [K_3 in Exclude<keyof I, keyof Keychain>]: never; }>(base?: I): Keychain;
    fromPartial<I_1 extends {
        address?: string;
        creator?: string;
        description?: string;
        admins?: string[];
        parties?: string[];
        adminIntentId?: number;
        fees?: {
            keyReq?: number;
            sigReq?: number;
        };
        isActive?: boolean;
    } & {
        address?: string;
        creator?: string;
        description?: string;
        admins?: string[] & string[] & { [K_4 in Exclude<keyof I_1["admins"], keyof string[]>]: never; };
        parties?: string[] & string[] & { [K_5 in Exclude<keyof I_1["parties"], keyof string[]>]: never; };
        adminIntentId?: number;
        fees?: {
            keyReq?: number;
            sigReq?: number;
        } & {
            keyReq?: number;
            sigReq?: number;
        } & { [K_6 in Exclude<keyof I_1["fees"], keyof KeychainFees>]: never; };
        isActive?: boolean;
    } & { [K_7 in Exclude<keyof I_1, keyof Keychain>]: never; }>(object: I_1): Keychain;
};
export declare const KeychainFees: {
    encode(message: KeychainFees, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): KeychainFees;
    fromJSON(object: any): KeychainFees;
    toJSON(message: KeychainFees): unknown;
    create<I extends {
        keyReq?: number;
        sigReq?: number;
    } & {
        keyReq?: number;
        sigReq?: number;
    } & { [K in Exclude<keyof I, keyof KeychainFees>]: never; }>(base?: I): KeychainFees;
    fromPartial<I_1 extends {
        keyReq?: number;
        sigReq?: number;
    } & {
        keyReq?: number;
        sigReq?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof KeychainFees>]: never; }>(object: I_1): KeychainFees;
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
