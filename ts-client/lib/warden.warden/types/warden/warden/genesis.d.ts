import _m0 from "protobufjs/minimal";
import { Key, KeyRequest } from "./key";
import { Keychain } from "./keychain";
import { Params } from "./params";
import { SignRequest, SignTransactionRequest } from "./signature";
import { Space } from "./space";
export declare const protobufPackage = "warden.warden";
/** GenesisState defines the warden module's genesis state. */
export interface GenesisState {
    /** params defines all the parameters of the module. */
    params: Params | undefined;
    keychains: Keychain[];
    spaces: Space[];
    keys: Key[];
    keyRequests: KeyRequest[];
    signatureRequests: SignRequest[];
    signTransactionRequests: SignTransactionRequest[];
}
export declare const GenesisState: {
    encode(message: GenesisState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    create<I extends {
        params?: {};
        keychains?: {
            id?: number;
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
            id?: number;
            creator?: string;
            owners?: string[];
            adminIntentId?: number;
            signIntentId?: number;
        }[];
        keys?: {
            id?: number;
            spaceId?: number;
            keychainId?: number;
            type?: import("./key").KeyType;
            publicKey?: Uint8Array;
        }[];
        keyRequests?: {
            id?: number;
            creator?: string;
            spaceId?: number;
            keychainId?: number;
            keyType?: import("./key").KeyType;
            status?: import("./key").KeyRequestStatus;
            rejectReason?: string;
        }[];
        signatureRequests?: {
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: import("./signature").SignRequestStatus;
            keyType?: import("./key").KeyType;
            signedData?: Uint8Array;
            rejectReason?: string;
        }[];
        signTransactionRequests?: {
            id?: number;
            creator?: string;
            keyId?: number;
            walletType?: import("./wallet").WalletType;
            unsignedTransaction?: Uint8Array;
            signRequestId?: number;
        }[];
    } & {
        params?: {} & {} & { [K in Exclude<keyof I["params"], never>]: never; };
        keychains?: {
            id?: number;
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
            id?: number;
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
            id?: number;
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
            id?: number;
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
            id?: number;
            creator?: string;
            owners?: string[];
            adminIntentId?: number;
            signIntentId?: number;
        }[] & ({
            id?: number;
            creator?: string;
            owners?: string[];
            adminIntentId?: number;
            signIntentId?: number;
        } & {
            id?: number;
            creator?: string;
            owners?: string[] & string[] & { [K_6 in Exclude<keyof I["spaces"][number]["owners"], keyof string[]>]: never; };
            adminIntentId?: number;
            signIntentId?: number;
        } & { [K_7 in Exclude<keyof I["spaces"][number], keyof Space>]: never; })[] & { [K_8 in Exclude<keyof I["spaces"], keyof {
            id?: number;
            creator?: string;
            owners?: string[];
            adminIntentId?: number;
            signIntentId?: number;
        }[]>]: never; };
        keys?: {
            id?: number;
            spaceId?: number;
            keychainId?: number;
            type?: import("./key").KeyType;
            publicKey?: Uint8Array;
        }[] & ({
            id?: number;
            spaceId?: number;
            keychainId?: number;
            type?: import("./key").KeyType;
            publicKey?: Uint8Array;
        } & {
            id?: number;
            spaceId?: number;
            keychainId?: number;
            type?: import("./key").KeyType;
            publicKey?: Uint8Array;
        } & { [K_9 in Exclude<keyof I["keys"][number], keyof Key>]: never; })[] & { [K_10 in Exclude<keyof I["keys"], keyof {
            id?: number;
            spaceId?: number;
            keychainId?: number;
            type?: import("./key").KeyType;
            publicKey?: Uint8Array;
        }[]>]: never; };
        keyRequests?: {
            id?: number;
            creator?: string;
            spaceId?: number;
            keychainId?: number;
            keyType?: import("./key").KeyType;
            status?: import("./key").KeyRequestStatus;
            rejectReason?: string;
        }[] & ({
            id?: number;
            creator?: string;
            spaceId?: number;
            keychainId?: number;
            keyType?: import("./key").KeyType;
            status?: import("./key").KeyRequestStatus;
            rejectReason?: string;
        } & {
            id?: number;
            creator?: string;
            spaceId?: number;
            keychainId?: number;
            keyType?: import("./key").KeyType;
            status?: import("./key").KeyRequestStatus;
            rejectReason?: string;
        } & { [K_11 in Exclude<keyof I["keyRequests"][number], keyof KeyRequest>]: never; })[] & { [K_12 in Exclude<keyof I["keyRequests"], keyof {
            id?: number;
            creator?: string;
            spaceId?: number;
            keychainId?: number;
            keyType?: import("./key").KeyType;
            status?: import("./key").KeyRequestStatus;
            rejectReason?: string;
        }[]>]: never; };
        signatureRequests?: {
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: import("./signature").SignRequestStatus;
            keyType?: import("./key").KeyType;
            signedData?: Uint8Array;
            rejectReason?: string;
        }[] & ({
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: import("./signature").SignRequestStatus;
            keyType?: import("./key").KeyType;
            signedData?: Uint8Array;
            rejectReason?: string;
        } & {
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: import("./signature").SignRequestStatus;
            keyType?: import("./key").KeyType;
            signedData?: Uint8Array;
            rejectReason?: string;
        } & { [K_13 in Exclude<keyof I["signatureRequests"][number], keyof SignRequest>]: never; })[] & { [K_14 in Exclude<keyof I["signatureRequests"], keyof {
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: import("./signature").SignRequestStatus;
            keyType?: import("./key").KeyType;
            signedData?: Uint8Array;
            rejectReason?: string;
        }[]>]: never; };
        signTransactionRequests?: {
            id?: number;
            creator?: string;
            keyId?: number;
            walletType?: import("./wallet").WalletType;
            unsignedTransaction?: Uint8Array;
            signRequestId?: number;
        }[] & ({
            id?: number;
            creator?: string;
            keyId?: number;
            walletType?: import("./wallet").WalletType;
            unsignedTransaction?: Uint8Array;
            signRequestId?: number;
        } & {
            id?: number;
            creator?: string;
            keyId?: number;
            walletType?: import("./wallet").WalletType;
            unsignedTransaction?: Uint8Array;
            signRequestId?: number;
        } & { [K_15 in Exclude<keyof I["signTransactionRequests"][number], keyof SignTransactionRequest>]: never; })[] & { [K_16 in Exclude<keyof I["signTransactionRequests"], keyof {
            id?: number;
            creator?: string;
            keyId?: number;
            walletType?: import("./wallet").WalletType;
            unsignedTransaction?: Uint8Array;
            signRequestId?: number;
        }[]>]: never; };
    } & { [K_17 in Exclude<keyof I, keyof GenesisState>]: never; }>(base?: I): GenesisState;
    fromPartial<I_1 extends {
        params?: {};
        keychains?: {
            id?: number;
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
            id?: number;
            creator?: string;
            owners?: string[];
            adminIntentId?: number;
            signIntentId?: number;
        }[];
        keys?: {
            id?: number;
            spaceId?: number;
            keychainId?: number;
            type?: import("./key").KeyType;
            publicKey?: Uint8Array;
        }[];
        keyRequests?: {
            id?: number;
            creator?: string;
            spaceId?: number;
            keychainId?: number;
            keyType?: import("./key").KeyType;
            status?: import("./key").KeyRequestStatus;
            rejectReason?: string;
        }[];
        signatureRequests?: {
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: import("./signature").SignRequestStatus;
            keyType?: import("./key").KeyType;
            signedData?: Uint8Array;
            rejectReason?: string;
        }[];
        signTransactionRequests?: {
            id?: number;
            creator?: string;
            keyId?: number;
            walletType?: import("./wallet").WalletType;
            unsignedTransaction?: Uint8Array;
            signRequestId?: number;
        }[];
    } & {
        params?: {} & {} & { [K_18 in Exclude<keyof I_1["params"], never>]: never; };
        keychains?: {
            id?: number;
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
            id?: number;
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
            id?: number;
            creator?: string;
            description?: string;
            admins?: string[] & string[] & { [K_19 in Exclude<keyof I_1["keychains"][number]["admins"], keyof string[]>]: never; };
            parties?: string[] & string[] & { [K_20 in Exclude<keyof I_1["keychains"][number]["parties"], keyof string[]>]: never; };
            adminIntentId?: number;
            fees?: {
                keyReq?: number;
                sigReq?: number;
            } & {
                keyReq?: number;
                sigReq?: number;
            } & { [K_21 in Exclude<keyof I_1["keychains"][number]["fees"], keyof import("./keychain").KeychainFees>]: never; };
            isActive?: boolean;
        } & { [K_22 in Exclude<keyof I_1["keychains"][number], keyof Keychain>]: never; })[] & { [K_23 in Exclude<keyof I_1["keychains"], keyof {
            id?: number;
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
            id?: number;
            creator?: string;
            owners?: string[];
            adminIntentId?: number;
            signIntentId?: number;
        }[] & ({
            id?: number;
            creator?: string;
            owners?: string[];
            adminIntentId?: number;
            signIntentId?: number;
        } & {
            id?: number;
            creator?: string;
            owners?: string[] & string[] & { [K_24 in Exclude<keyof I_1["spaces"][number]["owners"], keyof string[]>]: never; };
            adminIntentId?: number;
            signIntentId?: number;
        } & { [K_25 in Exclude<keyof I_1["spaces"][number], keyof Space>]: never; })[] & { [K_26 in Exclude<keyof I_1["spaces"], keyof {
            id?: number;
            creator?: string;
            owners?: string[];
            adminIntentId?: number;
            signIntentId?: number;
        }[]>]: never; };
        keys?: {
            id?: number;
            spaceId?: number;
            keychainId?: number;
            type?: import("./key").KeyType;
            publicKey?: Uint8Array;
        }[] & ({
            id?: number;
            spaceId?: number;
            keychainId?: number;
            type?: import("./key").KeyType;
            publicKey?: Uint8Array;
        } & {
            id?: number;
            spaceId?: number;
            keychainId?: number;
            type?: import("./key").KeyType;
            publicKey?: Uint8Array;
        } & { [K_27 in Exclude<keyof I_1["keys"][number], keyof Key>]: never; })[] & { [K_28 in Exclude<keyof I_1["keys"], keyof {
            id?: number;
            spaceId?: number;
            keychainId?: number;
            type?: import("./key").KeyType;
            publicKey?: Uint8Array;
        }[]>]: never; };
        keyRequests?: {
            id?: number;
            creator?: string;
            spaceId?: number;
            keychainId?: number;
            keyType?: import("./key").KeyType;
            status?: import("./key").KeyRequestStatus;
            rejectReason?: string;
        }[] & ({
            id?: number;
            creator?: string;
            spaceId?: number;
            keychainId?: number;
            keyType?: import("./key").KeyType;
            status?: import("./key").KeyRequestStatus;
            rejectReason?: string;
        } & {
            id?: number;
            creator?: string;
            spaceId?: number;
            keychainId?: number;
            keyType?: import("./key").KeyType;
            status?: import("./key").KeyRequestStatus;
            rejectReason?: string;
        } & { [K_29 in Exclude<keyof I_1["keyRequests"][number], keyof KeyRequest>]: never; })[] & { [K_30 in Exclude<keyof I_1["keyRequests"], keyof {
            id?: number;
            creator?: string;
            spaceId?: number;
            keychainId?: number;
            keyType?: import("./key").KeyType;
            status?: import("./key").KeyRequestStatus;
            rejectReason?: string;
        }[]>]: never; };
        signatureRequests?: {
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: import("./signature").SignRequestStatus;
            keyType?: import("./key").KeyType;
            signedData?: Uint8Array;
            rejectReason?: string;
        }[] & ({
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: import("./signature").SignRequestStatus;
            keyType?: import("./key").KeyType;
            signedData?: Uint8Array;
            rejectReason?: string;
        } & {
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: import("./signature").SignRequestStatus;
            keyType?: import("./key").KeyType;
            signedData?: Uint8Array;
            rejectReason?: string;
        } & { [K_31 in Exclude<keyof I_1["signatureRequests"][number], keyof SignRequest>]: never; })[] & { [K_32 in Exclude<keyof I_1["signatureRequests"], keyof {
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: import("./signature").SignRequestStatus;
            keyType?: import("./key").KeyType;
            signedData?: Uint8Array;
            rejectReason?: string;
        }[]>]: never; };
        signTransactionRequests?: {
            id?: number;
            creator?: string;
            keyId?: number;
            walletType?: import("./wallet").WalletType;
            unsignedTransaction?: Uint8Array;
            signRequestId?: number;
        }[] & ({
            id?: number;
            creator?: string;
            keyId?: number;
            walletType?: import("./wallet").WalletType;
            unsignedTransaction?: Uint8Array;
            signRequestId?: number;
        } & {
            id?: number;
            creator?: string;
            keyId?: number;
            walletType?: import("./wallet").WalletType;
            unsignedTransaction?: Uint8Array;
            signRequestId?: number;
        } & { [K_33 in Exclude<keyof I_1["signTransactionRequests"][number], keyof SignTransactionRequest>]: never; })[] & { [K_34 in Exclude<keyof I_1["signTransactionRequests"], keyof {
            id?: number;
            creator?: string;
            keyId?: number;
            walletType?: import("./wallet").WalletType;
            unsignedTransaction?: Uint8Array;
            signRequestId?: number;
        }[]>]: never; };
    } & { [K_35 in Exclude<keyof I_1, keyof GenesisState>]: never; }>(object: I_1): GenesisState;
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
