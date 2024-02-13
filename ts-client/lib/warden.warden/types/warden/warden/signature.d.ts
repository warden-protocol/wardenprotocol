import _m0 from "protobufjs/minimal";
import { KeyType } from "./key";
import { WalletType } from "./wallet";
export declare const protobufPackage = "warden.warden";
/**
 * SignRequestStatus indicates the status of a signature request.
 * A request starts as "pending", waiting to be picked up. Then it can move to
 * either "approved" or "rejected", depending on the decision of the keychain.
 */
export declare enum SignRequestStatus {
    /** SIGN_REQUEST_STATUS_UNSPECIFIED - The request is missing the status field. */
    SIGN_REQUEST_STATUS_UNSPECIFIED = 0,
    /**
     * SIGN_REQUEST_STATUS_PENDING - The request is waiting to be fulfilled. This is the initial state of a
     * request.
     */
    SIGN_REQUEST_STATUS_PENDING = 1,
    /** SIGN_REQUEST_STATUS_FULFILLED - The request was fulfilled. This is a final state for a request. */
    SIGN_REQUEST_STATUS_FULFILLED = 2,
    /** SIGN_REQUEST_STATUS_REJECTED - The request was rejected. This is a final state for a request. */
    SIGN_REQUEST_STATUS_REJECTED = 3,
    UNRECOGNIZED = -1
}
export declare function signRequestStatusFromJSON(object: any): SignRequestStatus;
export declare function signRequestStatusToJSON(object: SignRequestStatus): string;
export interface SignRequest {
    id: number;
    creator: string;
    keyId: number;
    dataForSigning: Uint8Array;
    status: SignRequestStatus;
    keyType: KeyType;
    signedData?: Uint8Array | undefined;
    rejectReason?: string | undefined;
}
export interface SignTransactionRequest {
    id: number;
    creator: string;
    keyId: number;
    walletType: WalletType;
    unsignedTransaction: Uint8Array;
    signRequestId: number;
}
export declare const SignRequest: {
    encode(message: SignRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SignRequest;
    fromJSON(object: any): SignRequest;
    toJSON(message: SignRequest): unknown;
    create<I extends {
        id?: number;
        creator?: string;
        keyId?: number;
        dataForSigning?: Uint8Array;
        status?: SignRequestStatus;
        keyType?: KeyType;
        signedData?: Uint8Array | undefined;
        rejectReason?: string | undefined;
    } & {
        id?: number;
        creator?: string;
        keyId?: number;
        dataForSigning?: Uint8Array;
        status?: SignRequestStatus;
        keyType?: KeyType;
        signedData?: Uint8Array | undefined;
        rejectReason?: string | undefined;
    } & { [K in Exclude<keyof I, keyof SignRequest>]: never; }>(base?: I): SignRequest;
    fromPartial<I_1 extends {
        id?: number;
        creator?: string;
        keyId?: number;
        dataForSigning?: Uint8Array;
        status?: SignRequestStatus;
        keyType?: KeyType;
        signedData?: Uint8Array | undefined;
        rejectReason?: string | undefined;
    } & {
        id?: number;
        creator?: string;
        keyId?: number;
        dataForSigning?: Uint8Array;
        status?: SignRequestStatus;
        keyType?: KeyType;
        signedData?: Uint8Array | undefined;
        rejectReason?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof SignRequest>]: never; }>(object: I_1): SignRequest;
};
export declare const SignTransactionRequest: {
    encode(message: SignTransactionRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SignTransactionRequest;
    fromJSON(object: any): SignTransactionRequest;
    toJSON(message: SignTransactionRequest): unknown;
    create<I extends {
        id?: number;
        creator?: string;
        keyId?: number;
        walletType?: WalletType;
        unsignedTransaction?: Uint8Array;
        signRequestId?: number;
    } & {
        id?: number;
        creator?: string;
        keyId?: number;
        walletType?: WalletType;
        unsignedTransaction?: Uint8Array;
        signRequestId?: number;
    } & { [K in Exclude<keyof I, keyof SignTransactionRequest>]: never; }>(base?: I): SignTransactionRequest;
    fromPartial<I_1 extends {
        id?: number;
        creator?: string;
        keyId?: number;
        walletType?: WalletType;
        unsignedTransaction?: Uint8Array;
        signRequestId?: number;
    } & {
        id?: number;
        creator?: string;
        keyId?: number;
        walletType?: WalletType;
        unsignedTransaction?: Uint8Array;
        signRequestId?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof SignTransactionRequest>]: never; }>(object: I_1): SignTransactionRequest;
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
