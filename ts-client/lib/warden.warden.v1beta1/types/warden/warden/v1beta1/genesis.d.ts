import _m0 from "protobufjs/minimal";
import { Keychain } from "./keychain";
import { Params } from "./params";
import { Space } from "./space";
export declare const protobufPackage = "warden.warden.v1beta1";
/** GenesisState defines the warden module's genesis state. */
export interface GenesisState {
    /** params defines all the parameters of the module. */
    params: Params | undefined;
    keychains: Keychain[];
    spaces: Space[];
}
export declare const GenesisState: {
    encode(message: GenesisState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    create<I extends {
        params?: {};
        keychains?: {
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
        }[];
        spaces?: {
            address?: string;
            creator?: string;
            owners?: string[];
            adminIntentId?: number;
            signIntentId?: number;
        }[];
    } & {
        params?: {} & {} & { [K in Exclude<keyof I["params"], never>]: never; };
        keychains?: {
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
        }[] & ({
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
            admins?: string[] & string[] & { [K_1 in Exclude<keyof I["keychains"][number]["admins"], keyof string[]>]: never; };
            parties?: string[] & string[] & { [K_2 in Exclude<keyof I["keychains"][number]["parties"], keyof string[]>]: never; };
            adminIntentId?: number;
            fees?: {
                keyReq?: number;
                sigReq?: number;
            } & {
                keyReq?: number;
                sigReq?: number;
            } & { [K_3 in Exclude<keyof I["keychains"][number]["fees"], keyof import("./keychain").KeychainFees>]: never; };
            isActive?: boolean;
        } & { [K_4 in Exclude<keyof I["keychains"][number], keyof Keychain>]: never; })[] & { [K_5 in Exclude<keyof I["keychains"], keyof {
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
        }[]>]: never; };
        spaces?: {
            address?: string;
            creator?: string;
            owners?: string[];
            adminIntentId?: number;
            signIntentId?: number;
        }[] & ({
            address?: string;
            creator?: string;
            owners?: string[];
            adminIntentId?: number;
            signIntentId?: number;
        } & {
            address?: string;
            creator?: string;
            owners?: string[] & string[] & { [K_6 in Exclude<keyof I["spaces"][number]["owners"], keyof string[]>]: never; };
            adminIntentId?: number;
            signIntentId?: number;
        } & { [K_7 in Exclude<keyof I["spaces"][number], keyof Space>]: never; })[] & { [K_8 in Exclude<keyof I["spaces"], keyof {
            address?: string;
            creator?: string;
            owners?: string[];
            adminIntentId?: number;
            signIntentId?: number;
        }[]>]: never; };
    } & { [K_9 in Exclude<keyof I, keyof GenesisState>]: never; }>(base?: I): GenesisState;
    fromPartial<I_1 extends {
        params?: {};
        keychains?: {
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
        }[];
        spaces?: {
            address?: string;
            creator?: string;
            owners?: string[];
            adminIntentId?: number;
            signIntentId?: number;
        }[];
    } & {
        params?: {} & {} & { [K_10 in Exclude<keyof I_1["params"], never>]: never; };
        keychains?: {
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
        }[] & ({
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
            admins?: string[] & string[] & { [K_11 in Exclude<keyof I_1["keychains"][number]["admins"], keyof string[]>]: never; };
            parties?: string[] & string[] & { [K_12 in Exclude<keyof I_1["keychains"][number]["parties"], keyof string[]>]: never; };
            adminIntentId?: number;
            fees?: {
                keyReq?: number;
                sigReq?: number;
            } & {
                keyReq?: number;
                sigReq?: number;
            } & { [K_13 in Exclude<keyof I_1["keychains"][number]["fees"], keyof import("./keychain").KeychainFees>]: never; };
            isActive?: boolean;
        } & { [K_14 in Exclude<keyof I_1["keychains"][number], keyof Keychain>]: never; })[] & { [K_15 in Exclude<keyof I_1["keychains"], keyof {
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
        }[]>]: never; };
        spaces?: {
            address?: string;
            creator?: string;
            owners?: string[];
            adminIntentId?: number;
            signIntentId?: number;
        }[] & ({
            address?: string;
            creator?: string;
            owners?: string[];
            adminIntentId?: number;
            signIntentId?: number;
        } & {
            address?: string;
            creator?: string;
            owners?: string[] & string[] & { [K_16 in Exclude<keyof I_1["spaces"][number]["owners"], keyof string[]>]: never; };
            adminIntentId?: number;
            signIntentId?: number;
        } & { [K_17 in Exclude<keyof I_1["spaces"][number], keyof Space>]: never; })[] & { [K_18 in Exclude<keyof I_1["spaces"], keyof {
            address?: string;
            creator?: string;
            owners?: string[];
            adminIntentId?: number;
            signIntentId?: number;
        }[]>]: never; };
    } & { [K_19 in Exclude<keyof I_1, keyof GenesisState>]: never; }>(object: I_1): GenesisState;
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
