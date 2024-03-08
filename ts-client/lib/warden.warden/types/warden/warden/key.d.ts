import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "warden.warden";
/**
 * KeyRequestStatus indicates the status of a key request.
 * A request starts as "pending", waiting to be picked up. Then it can move to
 * either "approved" or "rejected", depending on the decision of the keychain.
 */
export declare enum KeyRequestStatus {
    /** KEY_REQUEST_STATUS_UNSPECIFIED - The request is missing the status field. */
    KEY_REQUEST_STATUS_UNSPECIFIED = 0,
    /**
     * KEY_REQUEST_STATUS_PENDING - The request is waiting to be fulfilled. This is the initial state of a
     * request.
     */
    KEY_REQUEST_STATUS_PENDING = 1,
    /** KEY_REQUEST_STATUS_FULFILLED - The request was fulfilled. This is a final state for a request. */
    KEY_REQUEST_STATUS_FULFILLED = 2,
    /** KEY_REQUEST_STATUS_REJECTED - The request was rejected. This is a final state for a request. */
    KEY_REQUEST_STATUS_REJECTED = 3,
    UNRECOGNIZED = -1
}
export declare function keyRequestStatusFromJSON(object: any): KeyRequestStatus;
export declare function keyRequestStatusToJSON(object: KeyRequestStatus): string;
/**
 * KeyType indicates what crypto scheme will be used by this key (e.g.
 * ECDSA). Its public key will be one of the specified type.
 */
export declare enum KeyType {
    /** KEY_TYPE_UNSPECIFIED - The key type is missing. */
    KEY_TYPE_UNSPECIFIED = 0,
    /** KEY_TYPE_ECDSA_SECP256K1 - The key is an ECDSA secp256k1 key. */
    KEY_TYPE_ECDSA_SECP256K1 = 1,
    /** KEY_TYPE_EDDSA_ED25519 - The key is an EdDSA Ed25519 key. */
    KEY_TYPE_EDDSA_ED25519 = 2,
    UNRECOGNIZED = -1
}
export declare function keyTypeFromJSON(object: any): KeyType;
export declare function keyTypeToJSON(object: KeyType): string;
export interface KeyRequest {
    id: number;
    creator: string;
    spaceId: number;
    keychainId: number;
    keyType: KeyType;
    status: KeyRequestStatus;
    rejectReason: string;
}
export interface Key {
    id: number;
    spaceId: number;
    keychainId: number;
    type: KeyType;
    publicKey: Uint8Array;
}
export declare const KeyRequest: {
    encode(message: KeyRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): KeyRequest;
    fromJSON(object: any): KeyRequest;
    toJSON(message: KeyRequest): unknown;
    create<I extends {
        id?: number;
        creator?: string;
        spaceId?: number;
        keychainId?: number;
        keyType?: KeyType;
        status?: KeyRequestStatus;
        rejectReason?: string;
    } & {
        id?: number;
        creator?: string;
        spaceId?: number;
        keychainId?: number;
        keyType?: KeyType;
        status?: KeyRequestStatus;
        rejectReason?: string;
    } & { [K in Exclude<keyof I, keyof KeyRequest>]: never; }>(base?: I): KeyRequest;
    fromPartial<I_1 extends {
        id?: number;
        creator?: string;
        spaceId?: number;
        keychainId?: number;
        keyType?: KeyType;
        status?: KeyRequestStatus;
        rejectReason?: string;
    } & {
        id?: number;
        creator?: string;
        spaceId?: number;
        keychainId?: number;
        keyType?: KeyType;
        status?: KeyRequestStatus;
        rejectReason?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof KeyRequest>]: never; }>(object: I_1): KeyRequest;
};
export declare const Key: {
    encode(message: Key, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Key;
    fromJSON(object: any): Key;
    toJSON(message: Key): unknown;
    create<I extends {
        id?: number;
        spaceId?: number;
        keychainId?: number;
        type?: KeyType;
        publicKey?: Uint8Array;
    } & {
        id?: number;
        spaceId?: number;
        keychainId?: number;
        type?: KeyType;
        publicKey?: Uint8Array;
    } & { [K in Exclude<keyof I, keyof Key>]: never; }>(base?: I): Key;
    fromPartial<I_1 extends {
        id?: number;
        spaceId?: number;
        keychainId?: number;
        type?: KeyType;
        publicKey?: Uint8Array;
    } & {
        id?: number;
        spaceId?: number;
        keychainId?: number;
        type?: KeyType;
        publicKey?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, keyof Key>]: never; }>(object: I_1): Key;
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
