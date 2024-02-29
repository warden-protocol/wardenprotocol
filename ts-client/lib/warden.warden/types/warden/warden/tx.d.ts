import _m0 from "protobufjs/minimal";
import { Any } from "../../google/protobuf/any";
import { MsgActionCreated } from "../intent/action";
import { KeyRequestStatus, KeyType } from "./key";
import { KeychainFees } from "./keychain";
import { Params } from "./params";
import { SignRequestStatus } from "./signature";
import { WalletType } from "./wallet";
export declare const protobufPackage = "warden.warden";
/** MsgUpdateParams is the Msg/UpdateParams request type. */
export interface MsgUpdateParams {
    /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
    authority: string;
    /**
     * params defines the module parameters to update.
     *
     * NOTE: All parameters must be supplied.
     */
    params: Params | undefined;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponse {
}
export interface MsgNewSpace {
    creator: string;
    adminIntentId: number;
    signIntentId: number;
    additionalOwners: string[];
}
export interface MsgNewSpaceResponse {
    address: string;
}
export interface MsgAddSpaceOwner {
    creator: string;
    spaceAddr: string;
    newOwner: string;
    btl: number;
}
export interface MsgAddSpaceOwnerResponse {
}
export interface MsgRemoveSpaceOwner {
    creator: string;
    spaceAddr: string;
    owner: string;
    btl: number;
}
export interface MsgRemoveSpaceOwnerResponse {
}
export interface MsgNewKeychain {
    creator: string;
    description: string;
    adminIntentId: number;
    keychainFees: KeychainFees | undefined;
}
export interface MsgNewKeychainResponse {
    address: string;
}
export interface MsgAddKeychainParty {
    creator: string;
    keychainAddr: string;
    party: string;
}
export interface MsgAddKeychainPartyResponse {
}
export interface MsgUpdateSpace {
    creator: string;
    spaceAddr: string;
    adminIntentId: number;
    signIntentId: number;
    btl: number;
}
export interface MsgUpdateSpaceResponse {
}
export interface MsgUpdateKeychain {
    creator: string;
    keychainAddr: string;
    description: string;
    isActive: boolean;
}
export interface MsgUpdateKeychainResponse {
}
export interface MsgNewKeyRequest {
    creator: string;
    spaceAddr: string;
    keychainAddr: string;
    keyType: KeyType;
    btl: number;
}
export interface MsgNewKeyRequestResponse {
    id: number;
}
export interface MsgNewKey {
    publicKey: Uint8Array;
}
export interface MsgUpdateKeyRequest {
    creator: string;
    requestId: number;
    status: KeyRequestStatus;
    key?: MsgNewKey | undefined;
    rejectReason?: string | undefined;
}
export interface MsgUpdateKeyRequestResponse {
}
export interface MsgNewSignatureRequest {
    creator: string;
    keyId: number;
    dataForSigning: Uint8Array;
    btl: number;
}
export interface MsgNewSignatureRequestResponse {
    id: number;
}
export interface MsgSignedData {
    signedData: Uint8Array;
}
export interface MsgFulfilSignatureRequest {
    creator: string;
    requestId: number;
    status: SignRequestStatus;
    payload?: MsgSignedData | undefined;
    rejectReason?: string | undefined;
}
export interface MsgFulfilSignatureRequestResponse {
}
export interface MsgNewSignTransactionRequest {
    creator: string;
    keyId: number;
    walletType: WalletType;
    unsignedTransaction: Uint8Array;
    btl: number;
    /** Additional metadata required when parsing the unsigned transaction. */
    metadata: Any | undefined;
}
export interface MsgNewSignTransactionRequestResponse {
    id: number;
    signatureRequestId: number;
}
export interface MetadataEthereum {
    chainId: number;
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
export declare const MsgNewSpace: {
    encode(message: MsgNewSpace, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgNewSpace;
    fromJSON(object: any): MsgNewSpace;
    toJSON(message: MsgNewSpace): unknown;
    create<I extends {
        creator?: string;
        adminIntentId?: number;
        signIntentId?: number;
        additionalOwners?: string[];
    } & {
        creator?: string;
        adminIntentId?: number;
        signIntentId?: number;
        additionalOwners?: string[] & string[] & { [K in Exclude<keyof I["additionalOwners"], keyof string[]>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof MsgNewSpace>]: never; }>(base?: I): MsgNewSpace;
    fromPartial<I_1 extends {
        creator?: string;
        adminIntentId?: number;
        signIntentId?: number;
        additionalOwners?: string[];
    } & {
        creator?: string;
        adminIntentId?: number;
        signIntentId?: number;
        additionalOwners?: string[] & string[] & { [K_2 in Exclude<keyof I_1["additionalOwners"], keyof string[]>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof MsgNewSpace>]: never; }>(object: I_1): MsgNewSpace;
};
export declare const MsgNewSpaceResponse: {
    encode(message: MsgNewSpaceResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgNewSpaceResponse;
    fromJSON(object: any): MsgNewSpaceResponse;
    toJSON(message: MsgNewSpaceResponse): unknown;
    create<I extends {
        address?: string;
    } & {
        address?: string;
    } & { [K in Exclude<keyof I, "address">]: never; }>(base?: I): MsgNewSpaceResponse;
    fromPartial<I_1 extends {
        address?: string;
    } & {
        address?: string;
    } & { [K_1 in Exclude<keyof I_1, "address">]: never; }>(object: I_1): MsgNewSpaceResponse;
};
export declare const MsgAddSpaceOwner: {
    encode(message: MsgAddSpaceOwner, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddSpaceOwner;
    fromJSON(object: any): MsgAddSpaceOwner;
    toJSON(message: MsgAddSpaceOwner): unknown;
    create<I extends {
        creator?: string;
        spaceAddr?: string;
        newOwner?: string;
        btl?: number;
    } & {
        creator?: string;
        spaceAddr?: string;
        newOwner?: string;
        btl?: number;
    } & { [K in Exclude<keyof I, keyof MsgAddSpaceOwner>]: never; }>(base?: I): MsgAddSpaceOwner;
    fromPartial<I_1 extends {
        creator?: string;
        spaceAddr?: string;
        newOwner?: string;
        btl?: number;
    } & {
        creator?: string;
        spaceAddr?: string;
        newOwner?: string;
        btl?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgAddSpaceOwner>]: never; }>(object: I_1): MsgAddSpaceOwner;
};
export declare const MsgAddSpaceOwnerResponse: {
    encode(_: MsgAddSpaceOwnerResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddSpaceOwnerResponse;
    fromJSON(_: any): MsgAddSpaceOwnerResponse;
    toJSON(_: MsgAddSpaceOwnerResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgAddSpaceOwnerResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgAddSpaceOwnerResponse;
};
export declare const MsgRemoveSpaceOwner: {
    encode(message: MsgRemoveSpaceOwner, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveSpaceOwner;
    fromJSON(object: any): MsgRemoveSpaceOwner;
    toJSON(message: MsgRemoveSpaceOwner): unknown;
    create<I extends {
        creator?: string;
        spaceAddr?: string;
        owner?: string;
        btl?: number;
    } & {
        creator?: string;
        spaceAddr?: string;
        owner?: string;
        btl?: number;
    } & { [K in Exclude<keyof I, keyof MsgRemoveSpaceOwner>]: never; }>(base?: I): MsgRemoveSpaceOwner;
    fromPartial<I_1 extends {
        creator?: string;
        spaceAddr?: string;
        owner?: string;
        btl?: number;
    } & {
        creator?: string;
        spaceAddr?: string;
        owner?: string;
        btl?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgRemoveSpaceOwner>]: never; }>(object: I_1): MsgRemoveSpaceOwner;
};
export declare const MsgRemoveSpaceOwnerResponse: {
    encode(_: MsgRemoveSpaceOwnerResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveSpaceOwnerResponse;
    fromJSON(_: any): MsgRemoveSpaceOwnerResponse;
    toJSON(_: MsgRemoveSpaceOwnerResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgRemoveSpaceOwnerResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgRemoveSpaceOwnerResponse;
};
export declare const MsgNewKeychain: {
    encode(message: MsgNewKeychain, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgNewKeychain;
    fromJSON(object: any): MsgNewKeychain;
    toJSON(message: MsgNewKeychain): unknown;
    create<I extends {
        creator?: string;
        description?: string;
        adminIntentId?: number;
        keychainFees?: {
            keyReq?: number;
            sigReq?: number;
        };
    } & {
        creator?: string;
        description?: string;
        adminIntentId?: number;
        keychainFees?: {
            keyReq?: number;
            sigReq?: number;
        } & {
            keyReq?: number;
            sigReq?: number;
        } & { [K in Exclude<keyof I["keychainFees"], keyof KeychainFees>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof MsgNewKeychain>]: never; }>(base?: I): MsgNewKeychain;
    fromPartial<I_1 extends {
        creator?: string;
        description?: string;
        adminIntentId?: number;
        keychainFees?: {
            keyReq?: number;
            sigReq?: number;
        };
    } & {
        creator?: string;
        description?: string;
        adminIntentId?: number;
        keychainFees?: {
            keyReq?: number;
            sigReq?: number;
        } & {
            keyReq?: number;
            sigReq?: number;
        } & { [K_2 in Exclude<keyof I_1["keychainFees"], keyof KeychainFees>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof MsgNewKeychain>]: never; }>(object: I_1): MsgNewKeychain;
};
export declare const MsgNewKeychainResponse: {
    encode(message: MsgNewKeychainResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgNewKeychainResponse;
    fromJSON(object: any): MsgNewKeychainResponse;
    toJSON(message: MsgNewKeychainResponse): unknown;
    create<I extends {
        address?: string;
    } & {
        address?: string;
    } & { [K in Exclude<keyof I, "address">]: never; }>(base?: I): MsgNewKeychainResponse;
    fromPartial<I_1 extends {
        address?: string;
    } & {
        address?: string;
    } & { [K_1 in Exclude<keyof I_1, "address">]: never; }>(object: I_1): MsgNewKeychainResponse;
};
export declare const MsgAddKeychainParty: {
    encode(message: MsgAddKeychainParty, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddKeychainParty;
    fromJSON(object: any): MsgAddKeychainParty;
    toJSON(message: MsgAddKeychainParty): unknown;
    create<I extends {
        creator?: string;
        keychainAddr?: string;
        party?: string;
    } & {
        creator?: string;
        keychainAddr?: string;
        party?: string;
    } & { [K in Exclude<keyof I, keyof MsgAddKeychainParty>]: never; }>(base?: I): MsgAddKeychainParty;
    fromPartial<I_1 extends {
        creator?: string;
        keychainAddr?: string;
        party?: string;
    } & {
        creator?: string;
        keychainAddr?: string;
        party?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgAddKeychainParty>]: never; }>(object: I_1): MsgAddKeychainParty;
};
export declare const MsgAddKeychainPartyResponse: {
    encode(_: MsgAddKeychainPartyResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddKeychainPartyResponse;
    fromJSON(_: any): MsgAddKeychainPartyResponse;
    toJSON(_: MsgAddKeychainPartyResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgAddKeychainPartyResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgAddKeychainPartyResponse;
};
export declare const MsgUpdateSpace: {
    encode(message: MsgUpdateSpace, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateSpace;
    fromJSON(object: any): MsgUpdateSpace;
    toJSON(message: MsgUpdateSpace): unknown;
    create<I extends {
        creator?: string;
        spaceAddr?: string;
        adminIntentId?: number;
        signIntentId?: number;
        btl?: number;
    } & {
        creator?: string;
        spaceAddr?: string;
        adminIntentId?: number;
        signIntentId?: number;
        btl?: number;
    } & { [K in Exclude<keyof I, keyof MsgUpdateSpace>]: never; }>(base?: I): MsgUpdateSpace;
    fromPartial<I_1 extends {
        creator?: string;
        spaceAddr?: string;
        adminIntentId?: number;
        signIntentId?: number;
        btl?: number;
    } & {
        creator?: string;
        spaceAddr?: string;
        adminIntentId?: number;
        signIntentId?: number;
        btl?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgUpdateSpace>]: never; }>(object: I_1): MsgUpdateSpace;
};
export declare const MsgUpdateSpaceResponse: {
    encode(_: MsgUpdateSpaceResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateSpaceResponse;
    fromJSON(_: any): MsgUpdateSpaceResponse;
    toJSON(_: MsgUpdateSpaceResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgUpdateSpaceResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgUpdateSpaceResponse;
};
export declare const MsgUpdateKeychain: {
    encode(message: MsgUpdateKeychain, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateKeychain;
    fromJSON(object: any): MsgUpdateKeychain;
    toJSON(message: MsgUpdateKeychain): unknown;
    create<I extends {
        creator?: string;
        keychainAddr?: string;
        description?: string;
        isActive?: boolean;
    } & {
        creator?: string;
        keychainAddr?: string;
        description?: string;
        isActive?: boolean;
    } & { [K in Exclude<keyof I, keyof MsgUpdateKeychain>]: never; }>(base?: I): MsgUpdateKeychain;
    fromPartial<I_1 extends {
        creator?: string;
        keychainAddr?: string;
        description?: string;
        isActive?: boolean;
    } & {
        creator?: string;
        keychainAddr?: string;
        description?: string;
        isActive?: boolean;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgUpdateKeychain>]: never; }>(object: I_1): MsgUpdateKeychain;
};
export declare const MsgUpdateKeychainResponse: {
    encode(_: MsgUpdateKeychainResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateKeychainResponse;
    fromJSON(_: any): MsgUpdateKeychainResponse;
    toJSON(_: MsgUpdateKeychainResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgUpdateKeychainResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgUpdateKeychainResponse;
};
export declare const MsgNewKeyRequest: {
    encode(message: MsgNewKeyRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgNewKeyRequest;
    fromJSON(object: any): MsgNewKeyRequest;
    toJSON(message: MsgNewKeyRequest): unknown;
    create<I extends {
        creator?: string;
        spaceAddr?: string;
        keychainAddr?: string;
        keyType?: KeyType;
        btl?: number;
    } & {
        creator?: string;
        spaceAddr?: string;
        keychainAddr?: string;
        keyType?: KeyType;
        btl?: number;
    } & { [K in Exclude<keyof I, keyof MsgNewKeyRequest>]: never; }>(base?: I): MsgNewKeyRequest;
    fromPartial<I_1 extends {
        creator?: string;
        spaceAddr?: string;
        keychainAddr?: string;
        keyType?: KeyType;
        btl?: number;
    } & {
        creator?: string;
        spaceAddr?: string;
        keychainAddr?: string;
        keyType?: KeyType;
        btl?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgNewKeyRequest>]: never; }>(object: I_1): MsgNewKeyRequest;
};
export declare const MsgNewKeyRequestResponse: {
    encode(message: MsgNewKeyRequestResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgNewKeyRequestResponse;
    fromJSON(object: any): MsgNewKeyRequestResponse;
    toJSON(message: MsgNewKeyRequestResponse): unknown;
    create<I extends {
        id?: number;
    } & {
        id?: number;
    } & { [K in Exclude<keyof I, "id">]: never; }>(base?: I): MsgNewKeyRequestResponse;
    fromPartial<I_1 extends {
        id?: number;
    } & {
        id?: number;
    } & { [K_1 in Exclude<keyof I_1, "id">]: never; }>(object: I_1): MsgNewKeyRequestResponse;
};
export declare const MsgNewKey: {
    encode(message: MsgNewKey, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgNewKey;
    fromJSON(object: any): MsgNewKey;
    toJSON(message: MsgNewKey): unknown;
    create<I extends {
        publicKey?: Uint8Array;
    } & {
        publicKey?: Uint8Array;
    } & { [K in Exclude<keyof I, "publicKey">]: never; }>(base?: I): MsgNewKey;
    fromPartial<I_1 extends {
        publicKey?: Uint8Array;
    } & {
        publicKey?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, "publicKey">]: never; }>(object: I_1): MsgNewKey;
};
export declare const MsgUpdateKeyRequest: {
    encode(message: MsgUpdateKeyRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateKeyRequest;
    fromJSON(object: any): MsgUpdateKeyRequest;
    toJSON(message: MsgUpdateKeyRequest): unknown;
    create<I extends {
        creator?: string;
        requestId?: number;
        status?: KeyRequestStatus;
        key?: {
            publicKey?: Uint8Array;
        };
        rejectReason?: string | undefined;
    } & {
        creator?: string;
        requestId?: number;
        status?: KeyRequestStatus;
        key?: {
            publicKey?: Uint8Array;
        } & {
            publicKey?: Uint8Array;
        } & { [K in Exclude<keyof I["key"], "publicKey">]: never; };
        rejectReason?: string | undefined;
    } & { [K_1 in Exclude<keyof I, keyof MsgUpdateKeyRequest>]: never; }>(base?: I): MsgUpdateKeyRequest;
    fromPartial<I_1 extends {
        creator?: string;
        requestId?: number;
        status?: KeyRequestStatus;
        key?: {
            publicKey?: Uint8Array;
        };
        rejectReason?: string | undefined;
    } & {
        creator?: string;
        requestId?: number;
        status?: KeyRequestStatus;
        key?: {
            publicKey?: Uint8Array;
        } & {
            publicKey?: Uint8Array;
        } & { [K_2 in Exclude<keyof I_1["key"], "publicKey">]: never; };
        rejectReason?: string | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof MsgUpdateKeyRequest>]: never; }>(object: I_1): MsgUpdateKeyRequest;
};
export declare const MsgUpdateKeyRequestResponse: {
    encode(_: MsgUpdateKeyRequestResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateKeyRequestResponse;
    fromJSON(_: any): MsgUpdateKeyRequestResponse;
    toJSON(_: MsgUpdateKeyRequestResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgUpdateKeyRequestResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgUpdateKeyRequestResponse;
};
export declare const MsgNewSignatureRequest: {
    encode(message: MsgNewSignatureRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgNewSignatureRequest;
    fromJSON(object: any): MsgNewSignatureRequest;
    toJSON(message: MsgNewSignatureRequest): unknown;
    create<I extends {
        creator?: string;
        keyId?: number;
        dataForSigning?: Uint8Array;
        btl?: number;
    } & {
        creator?: string;
        keyId?: number;
        dataForSigning?: Uint8Array;
        btl?: number;
    } & { [K in Exclude<keyof I, keyof MsgNewSignatureRequest>]: never; }>(base?: I): MsgNewSignatureRequest;
    fromPartial<I_1 extends {
        creator?: string;
        keyId?: number;
        dataForSigning?: Uint8Array;
        btl?: number;
    } & {
        creator?: string;
        keyId?: number;
        dataForSigning?: Uint8Array;
        btl?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgNewSignatureRequest>]: never; }>(object: I_1): MsgNewSignatureRequest;
};
export declare const MsgNewSignatureRequestResponse: {
    encode(message: MsgNewSignatureRequestResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgNewSignatureRequestResponse;
    fromJSON(object: any): MsgNewSignatureRequestResponse;
    toJSON(message: MsgNewSignatureRequestResponse): unknown;
    create<I extends {
        id?: number;
    } & {
        id?: number;
    } & { [K in Exclude<keyof I, "id">]: never; }>(base?: I): MsgNewSignatureRequestResponse;
    fromPartial<I_1 extends {
        id?: number;
    } & {
        id?: number;
    } & { [K_1 in Exclude<keyof I_1, "id">]: never; }>(object: I_1): MsgNewSignatureRequestResponse;
};
export declare const MsgSignedData: {
    encode(message: MsgSignedData, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSignedData;
    fromJSON(object: any): MsgSignedData;
    toJSON(message: MsgSignedData): unknown;
    create<I extends {
        signedData?: Uint8Array;
    } & {
        signedData?: Uint8Array;
    } & { [K in Exclude<keyof I, "signedData">]: never; }>(base?: I): MsgSignedData;
    fromPartial<I_1 extends {
        signedData?: Uint8Array;
    } & {
        signedData?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, "signedData">]: never; }>(object: I_1): MsgSignedData;
};
export declare const MsgFulfilSignatureRequest: {
    encode(message: MsgFulfilSignatureRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgFulfilSignatureRequest;
    fromJSON(object: any): MsgFulfilSignatureRequest;
    toJSON(message: MsgFulfilSignatureRequest): unknown;
    create<I extends {
        creator?: string;
        requestId?: number;
        status?: SignRequestStatus;
        payload?: {
            signedData?: Uint8Array;
        };
        rejectReason?: string | undefined;
    } & {
        creator?: string;
        requestId?: number;
        status?: SignRequestStatus;
        payload?: {
            signedData?: Uint8Array;
        } & {
            signedData?: Uint8Array;
        } & { [K in Exclude<keyof I["payload"], "signedData">]: never; };
        rejectReason?: string | undefined;
    } & { [K_1 in Exclude<keyof I, keyof MsgFulfilSignatureRequest>]: never; }>(base?: I): MsgFulfilSignatureRequest;
    fromPartial<I_1 extends {
        creator?: string;
        requestId?: number;
        status?: SignRequestStatus;
        payload?: {
            signedData?: Uint8Array;
        };
        rejectReason?: string | undefined;
    } & {
        creator?: string;
        requestId?: number;
        status?: SignRequestStatus;
        payload?: {
            signedData?: Uint8Array;
        } & {
            signedData?: Uint8Array;
        } & { [K_2 in Exclude<keyof I_1["payload"], "signedData">]: never; };
        rejectReason?: string | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof MsgFulfilSignatureRequest>]: never; }>(object: I_1): MsgFulfilSignatureRequest;
};
export declare const MsgFulfilSignatureRequestResponse: {
    encode(_: MsgFulfilSignatureRequestResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgFulfilSignatureRequestResponse;
    fromJSON(_: any): MsgFulfilSignatureRequestResponse;
    toJSON(_: MsgFulfilSignatureRequestResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgFulfilSignatureRequestResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgFulfilSignatureRequestResponse;
};
export declare const MsgNewSignTransactionRequest: {
    encode(message: MsgNewSignTransactionRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgNewSignTransactionRequest;
    fromJSON(object: any): MsgNewSignTransactionRequest;
    toJSON(message: MsgNewSignTransactionRequest): unknown;
    create<I extends {
        creator?: string;
        keyId?: number;
        walletType?: WalletType;
        unsignedTransaction?: Uint8Array;
        btl?: number;
        metadata?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
    } & {
        creator?: string;
        keyId?: number;
        walletType?: WalletType;
        unsignedTransaction?: Uint8Array;
        btl?: number;
        metadata?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K in Exclude<keyof I["metadata"], keyof Any>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof MsgNewSignTransactionRequest>]: never; }>(base?: I): MsgNewSignTransactionRequest;
    fromPartial<I_1 extends {
        creator?: string;
        keyId?: number;
        walletType?: WalletType;
        unsignedTransaction?: Uint8Array;
        btl?: number;
        metadata?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
    } & {
        creator?: string;
        keyId?: number;
        walletType?: WalletType;
        unsignedTransaction?: Uint8Array;
        btl?: number;
        metadata?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_2 in Exclude<keyof I_1["metadata"], keyof Any>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof MsgNewSignTransactionRequest>]: never; }>(object: I_1): MsgNewSignTransactionRequest;
};
export declare const MsgNewSignTransactionRequestResponse: {
    encode(message: MsgNewSignTransactionRequestResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgNewSignTransactionRequestResponse;
    fromJSON(object: any): MsgNewSignTransactionRequestResponse;
    toJSON(message: MsgNewSignTransactionRequestResponse): unknown;
    create<I extends {
        id?: number;
        signatureRequestId?: number;
    } & {
        id?: number;
        signatureRequestId?: number;
    } & { [K in Exclude<keyof I, keyof MsgNewSignTransactionRequestResponse>]: never; }>(base?: I): MsgNewSignTransactionRequestResponse;
    fromPartial<I_1 extends {
        id?: number;
        signatureRequestId?: number;
    } & {
        id?: number;
        signatureRequestId?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgNewSignTransactionRequestResponse>]: never; }>(object: I_1): MsgNewSignTransactionRequestResponse;
};
export declare const MetadataEthereum: {
    encode(message: MetadataEthereum, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MetadataEthereum;
    fromJSON(object: any): MetadataEthereum;
    toJSON(message: MetadataEthereum): unknown;
    create<I extends {
        chainId?: number;
    } & {
        chainId?: number;
    } & { [K in Exclude<keyof I, "chainId">]: never; }>(base?: I): MetadataEthereum;
    fromPartial<I_1 extends {
        chainId?: number;
    } & {
        chainId?: number;
    } & { [K_1 in Exclude<keyof I_1, "chainId">]: never; }>(object: I_1): MetadataEthereum;
};
/** Msg defines the Msg service. */
export interface Msg {
    /**
     * UpdateParams defines a (governance) operation for updating the module
     * parameters. The authority defaults to the x/gov module account.
     */
    UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
    /** Create a new Space. The creator will be the first owner of the Space. */
    NewSpace(request: MsgNewSpace): Promise<MsgNewSpaceResponse>;
    /** Add a new owner to a space. */
    AddSpaceOwner(request: MsgAddSpaceOwner): Promise<MsgActionCreated>;
    /**
     * Remove an owner from the space. The user can remove itself, but at
     * least one owner must be left.
     */
    RemoveSpaceOwner(request: MsgRemoveSpaceOwner): Promise<MsgActionCreated>;
    /** Create a new keychain. The user will be the first admin of the keychain. */
    NewKeychain(request: MsgNewKeychain): Promise<MsgNewKeychainResponse>;
    /**
     * Add a new party to a keychain. Transactions coming from this party will
     * be considered trusted by the keychain.
     */
    AddKeychainParty(request: MsgAddKeychainParty): Promise<MsgAddKeychainPartyResponse>;
    /** Update a space, e.g. changing the intents in use. */
    UpdateSpace(request: MsgUpdateSpace): Promise<MsgActionCreated>;
    /** Update a keychain, e.g. update the status or description. */
    UpdateKeychain(request: MsgUpdateKeychain): Promise<MsgUpdateKeychainResponse>;
    /**
     * Request a new key to a keychain, the key will belong to the specified
     * space.
     */
    NewKeyRequest(request: MsgNewKeyRequest): Promise<MsgActionCreated>;
    /**
     * Update an existing request by writing a result into it. This method is
     * called by a keychain party.
     */
    UpdateKeyRequest(request: MsgUpdateKeyRequest): Promise<MsgUpdateKeyRequestResponse>;
    /** Request a new signature */
    NewSignatureRequest(request: MsgNewSignatureRequest): Promise<MsgActionCreated>;
    /** Fulfill a signature request */
    FulfilSignatureRequest(request: MsgFulfilSignatureRequest): Promise<MsgFulfilSignatureRequestResponse>;
    /**
     * Request a new signature for a layer 1 transaction, using the specified
     * wallet.
     * The difference with NewSignatureRequest is that this message will be
     * parsed by the wallet to apply specific intents that depends on
     * informations contained in the transaction itself (e.g. amount, recipient).
     */
    NewSignTransactionRequest(request: MsgNewSignTransactionRequest): Promise<MsgActionCreated>;
}
export declare const MsgServiceName = "warden.warden.Msg";
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
    NewSpace(request: MsgNewSpace): Promise<MsgNewSpaceResponse>;
    AddSpaceOwner(request: MsgAddSpaceOwner): Promise<MsgActionCreated>;
    RemoveSpaceOwner(request: MsgRemoveSpaceOwner): Promise<MsgActionCreated>;
    NewKeychain(request: MsgNewKeychain): Promise<MsgNewKeychainResponse>;
    AddKeychainParty(request: MsgAddKeychainParty): Promise<MsgAddKeychainPartyResponse>;
    UpdateSpace(request: MsgUpdateSpace): Promise<MsgActionCreated>;
    UpdateKeychain(request: MsgUpdateKeychain): Promise<MsgUpdateKeychainResponse>;
    NewKeyRequest(request: MsgNewKeyRequest): Promise<MsgActionCreated>;
    UpdateKeyRequest(request: MsgUpdateKeyRequest): Promise<MsgUpdateKeyRequestResponse>;
    NewSignatureRequest(request: MsgNewSignatureRequest): Promise<MsgActionCreated>;
    FulfilSignatureRequest(request: MsgFulfilSignatureRequest): Promise<MsgFulfilSignatureRequestResponse>;
    NewSignTransactionRequest(request: MsgNewSignTransactionRequest): Promise<MsgActionCreated>;
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
