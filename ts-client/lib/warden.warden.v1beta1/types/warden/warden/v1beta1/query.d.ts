import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../cosmos/base/query/v1beta1/pagination";
import { Key, KeyRequest, KeyRequestStatus } from "./key";
import { Keychain } from "./keychain";
import { Params } from "./params";
import { SignRequest, SignRequestStatus, SignTransactionRequest } from "./signature";
import { Space } from "./space";
import { WalletType } from "./wallet";
export declare const protobufPackage = "warden.warden.v1beta1";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
    /** params holds all the parameters of this module. */
    params: Params | undefined;
}
export interface QuerySpacesRequest {
    pagination: PageRequest | undefined;
}
export interface QuerySpacesResponse {
    pagination: PageResponse | undefined;
    spaces: Space[];
}
export interface QuerySpacesByOwnerRequest {
    pagination: PageRequest | undefined;
    owner: string;
}
export interface QueryKeychainsRequest {
    pagination: PageRequest | undefined;
}
export interface QueryKeychainsResponse {
    pagination: PageResponse | undefined;
    keychains: Keychain[];
}
export interface QuerySpaceByAddressRequest {
    address: string;
}
export interface QuerySpaceByAddressResponse {
    space: Space | undefined;
}
export interface QueryKeychainByAddressRequest {
    address: string;
}
export interface QueryKeychainByAddressResponse {
    keychain: Keychain | undefined;
}
export interface QueryKeyRequestsRequest {
    pagination: PageRequest | undefined;
    keychainAddr: string;
    /** Optional */
    status: KeyRequestStatus;
    spaceAddr: string;
}
export interface QueryKeyRequestsResponse {
    pagination: PageResponse | undefined;
    keyRequests: KeyRequest[];
}
export interface QueryKeyRequestByIdRequest {
    id: number;
}
export interface QueryKeyRequestByIdResponse {
    keyRequest: KeyRequest | undefined;
}
export interface QueryKeysRequest {
    pagination: PageRequest | undefined;
    /** Optional */
    spaceAddr: string;
    /** Optional */
    type: WalletType;
    /** Optional */
    keyId: number;
}
export interface QueryKeysResponse {
    pagination: PageResponse | undefined;
    keys: KeyResponse[];
}
export interface KeyResponse {
    key: Key | undefined;
    wallets: WalletKeyResponse[];
}
export interface WalletKeyResponse {
    address: string;
    type: WalletType;
}
export interface QuerySignatureRequestsRequest {
    pagination: PageRequest | undefined;
    keychainAddr: string;
    /** Optional */
    status: SignRequestStatus;
}
export interface QuerySignatureRequestsResponse {
    pagination: PageResponse | undefined;
    signRequests: SignRequest[];
}
export interface QuerySignatureRequestByIdRequest {
    id: number;
}
export interface QuerySignatureRequestByIdResponse {
    signRequest: SignRequest | undefined;
}
export interface QuerySignTransactionRequestsRequest {
    pagination: PageRequest | undefined;
    walletType: WalletType;
    keyId: number;
    /** Optional */
    status: SignRequestStatus;
}
export interface SignTransactionRequestResponse {
    signTransactionRequest: SignTransactionRequest | undefined;
    signRequest: SignRequest | undefined;
}
export interface QuerySignTransactionRequestsResponse {
    pagination: PageResponse | undefined;
    signTransactionRequests: SignTransactionRequestResponse[];
}
export interface QuerySignTransactionRequestByIdRequest {
    id: number;
}
export interface QuerySignTransactionRequestByIdResponse {
    signTransactionRequest: SignTransactionRequest | undefined;
}
export declare const QueryParamsRequest: {
    encode(_: QueryParamsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest;
    fromJSON(_: any): QueryParamsRequest;
    toJSON(_: QueryParamsRequest): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): QueryParamsRequest;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): QueryParamsRequest;
};
export declare const QueryParamsResponse: {
    encode(message: QueryParamsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse;
    fromJSON(object: any): QueryParamsResponse;
    toJSON(message: QueryParamsResponse): unknown;
    create<I extends {
        params?: {};
    } & {
        params?: {} & {} & { [K in Exclude<keyof I["params"], never>]: never; };
    } & { [K_1 in Exclude<keyof I, "params">]: never; }>(base?: I): QueryParamsResponse;
    fromPartial<I_1 extends {
        params?: {};
    } & {
        params?: {} & {} & { [K_2 in Exclude<keyof I_1["params"], never>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "params">]: never; }>(object: I_1): QueryParamsResponse;
};
export declare const QuerySpacesRequest: {
    encode(message: QuerySpacesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySpacesRequest;
    fromJSON(object: any): QuerySpacesRequest;
    toJSON(message: QuerySpacesRequest): unknown;
    create<I extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K in Exclude<keyof I["pagination"], keyof PageRequest>]: never; };
    } & { [K_1 in Exclude<keyof I, "pagination">]: never; }>(base?: I): QuerySpacesRequest;
    fromPartial<I_1 extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K_2 in Exclude<keyof I_1["pagination"], keyof PageRequest>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "pagination">]: never; }>(object: I_1): QuerySpacesRequest;
};
export declare const QuerySpacesResponse: {
    encode(message: QuerySpacesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySpacesResponse;
    fromJSON(object: any): QuerySpacesResponse;
    toJSON(message: QuerySpacesResponse): unknown;
    create<I extends {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
        spaces?: {
            address?: string;
            creator?: string;
            owners?: string[];
            adminIntentId?: number;
            signIntentId?: number;
        }[];
    } & {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
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
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K_1 in Exclude<keyof I["spaces"], keyof {
            address?: string;
            creator?: string;
            owners?: string[];
            adminIntentId?: number;
            signIntentId?: number;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof QuerySpacesResponse>]: never; }>(base?: I): QuerySpacesResponse;
    fromPartial<I_1 extends {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
        spaces?: {
            address?: string;
            creator?: string;
            owners?: string[];
            adminIntentId?: number;
            signIntentId?: number;
        }[];
    } & {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_3 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
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
            owners?: string[] & string[] & {
                [x: string]: never;
            };
            adminIntentId?: number;
            signIntentId?: number;
        } & { [K_4 in Exclude<keyof I_1["spaces"][number], keyof Space>]: never; })[] & { [K_5 in Exclude<keyof I_1["spaces"], keyof {
            address?: string;
            creator?: string;
            owners?: string[];
            adminIntentId?: number;
            signIntentId?: number;
        }[]>]: never; };
    } & { [K_6 in Exclude<keyof I_1, keyof QuerySpacesResponse>]: never; }>(object: I_1): QuerySpacesResponse;
};
export declare const QuerySpacesByOwnerRequest: {
    encode(message: QuerySpacesByOwnerRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySpacesByOwnerRequest;
    fromJSON(object: any): QuerySpacesByOwnerRequest;
    toJSON(message: QuerySpacesByOwnerRequest): unknown;
    create<I extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
        owner?: string;
    } & {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K in Exclude<keyof I["pagination"], keyof PageRequest>]: never; };
        owner?: string;
    } & { [K_1 in Exclude<keyof I, keyof QuerySpacesByOwnerRequest>]: never; }>(base?: I): QuerySpacesByOwnerRequest;
    fromPartial<I_1 extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
        owner?: string;
    } & {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K_2 in Exclude<keyof I_1["pagination"], keyof PageRequest>]: never; };
        owner?: string;
    } & { [K_3 in Exclude<keyof I_1, keyof QuerySpacesByOwnerRequest>]: never; }>(object: I_1): QuerySpacesByOwnerRequest;
};
export declare const QueryKeychainsRequest: {
    encode(message: QueryKeychainsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryKeychainsRequest;
    fromJSON(object: any): QueryKeychainsRequest;
    toJSON(message: QueryKeychainsRequest): unknown;
    create<I extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K in Exclude<keyof I["pagination"], keyof PageRequest>]: never; };
    } & { [K_1 in Exclude<keyof I, "pagination">]: never; }>(base?: I): QueryKeychainsRequest;
    fromPartial<I_1 extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K_2 in Exclude<keyof I_1["pagination"], keyof PageRequest>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "pagination">]: never; }>(object: I_1): QueryKeychainsRequest;
};
export declare const QueryKeychainsResponse: {
    encode(message: QueryKeychainsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryKeychainsResponse;
    fromJSON(object: any): QueryKeychainsResponse;
    toJSON(message: QueryKeychainsResponse): unknown;
    create<I extends {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
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
    } & {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
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
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K_1 in Exclude<keyof I["keychains"], keyof {
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
    } & { [K_2 in Exclude<keyof I, keyof QueryKeychainsResponse>]: never; }>(base?: I): QueryKeychainsResponse;
    fromPartial<I_1 extends {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
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
    } & {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_3 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
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
            admins?: string[] & string[] & {
                [x: string]: never;
            };
            parties?: string[] & string[] & {
                [x: string]: never;
            };
            adminIntentId?: number;
            fees?: {
                keyReq?: number;
                sigReq?: number;
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            };
            isActive?: boolean;
        } & { [K_4 in Exclude<keyof I_1["keychains"][number], keyof Keychain>]: never; })[] & { [K_5 in Exclude<keyof I_1["keychains"], keyof {
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
    } & { [K_6 in Exclude<keyof I_1, keyof QueryKeychainsResponse>]: never; }>(object: I_1): QueryKeychainsResponse;
};
export declare const QuerySpaceByAddressRequest: {
    encode(message: QuerySpaceByAddressRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySpaceByAddressRequest;
    fromJSON(object: any): QuerySpaceByAddressRequest;
    toJSON(message: QuerySpaceByAddressRequest): unknown;
    create<I extends {
        address?: string;
    } & {
        address?: string;
    } & { [K in Exclude<keyof I, "address">]: never; }>(base?: I): QuerySpaceByAddressRequest;
    fromPartial<I_1 extends {
        address?: string;
    } & {
        address?: string;
    } & { [K_1 in Exclude<keyof I_1, "address">]: never; }>(object: I_1): QuerySpaceByAddressRequest;
};
export declare const QuerySpaceByAddressResponse: {
    encode(message: QuerySpaceByAddressResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySpaceByAddressResponse;
    fromJSON(object: any): QuerySpaceByAddressResponse;
    toJSON(message: QuerySpaceByAddressResponse): unknown;
    create<I extends {
        space?: {
            address?: string;
            creator?: string;
            owners?: string[];
            adminIntentId?: number;
            signIntentId?: number;
        };
    } & {
        space?: {
            address?: string;
            creator?: string;
            owners?: string[];
            adminIntentId?: number;
            signIntentId?: number;
        } & {
            address?: string;
            creator?: string;
            owners?: string[] & string[] & {
                [x: string]: never;
            };
            adminIntentId?: number;
            signIntentId?: number;
        } & { [K in Exclude<keyof I["space"], keyof Space>]: never; };
    } & { [K_1 in Exclude<keyof I, "space">]: never; }>(base?: I): QuerySpaceByAddressResponse;
    fromPartial<I_1 extends {
        space?: {
            address?: string;
            creator?: string;
            owners?: string[];
            adminIntentId?: number;
            signIntentId?: number;
        };
    } & {
        space?: {
            address?: string;
            creator?: string;
            owners?: string[];
            adminIntentId?: number;
            signIntentId?: number;
        } & {
            address?: string;
            creator?: string;
            owners?: string[] & string[] & { [K_2 in Exclude<keyof I_1["space"]["owners"], keyof string[]>]: never; };
            adminIntentId?: number;
            signIntentId?: number;
        } & { [K_3 in Exclude<keyof I_1["space"], keyof Space>]: never; };
    } & { [K_4 in Exclude<keyof I_1, "space">]: never; }>(object: I_1): QuerySpaceByAddressResponse;
};
export declare const QueryKeychainByAddressRequest: {
    encode(message: QueryKeychainByAddressRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryKeychainByAddressRequest;
    fromJSON(object: any): QueryKeychainByAddressRequest;
    toJSON(message: QueryKeychainByAddressRequest): unknown;
    create<I extends {
        address?: string;
    } & {
        address?: string;
    } & { [K in Exclude<keyof I, "address">]: never; }>(base?: I): QueryKeychainByAddressRequest;
    fromPartial<I_1 extends {
        address?: string;
    } & {
        address?: string;
    } & { [K_1 in Exclude<keyof I_1, "address">]: never; }>(object: I_1): QueryKeychainByAddressRequest;
};
export declare const QueryKeychainByAddressResponse: {
    encode(message: QueryKeychainByAddressResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryKeychainByAddressResponse;
    fromJSON(object: any): QueryKeychainByAddressResponse;
    toJSON(message: QueryKeychainByAddressResponse): unknown;
    create<I extends {
        keychain?: {
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
        };
    } & {
        keychain?: {
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
            admins?: string[] & string[] & {
                [x: string]: never;
            };
            parties?: string[] & string[] & {
                [x: string]: never;
            };
            adminIntentId?: number;
            fees?: {
                keyReq?: number;
                sigReq?: number;
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            };
            isActive?: boolean;
        } & { [K in Exclude<keyof I["keychain"], keyof Keychain>]: never; };
    } & { [K_1 in Exclude<keyof I, "keychain">]: never; }>(base?: I): QueryKeychainByAddressResponse;
    fromPartial<I_1 extends {
        keychain?: {
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
        };
    } & {
        keychain?: {
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
            admins?: string[] & string[] & { [K_2 in Exclude<keyof I_1["keychain"]["admins"], keyof string[]>]: never; };
            parties?: string[] & string[] & { [K_3 in Exclude<keyof I_1["keychain"]["parties"], keyof string[]>]: never; };
            adminIntentId?: number;
            fees?: {
                keyReq?: number;
                sigReq?: number;
            } & {
                keyReq?: number;
                sigReq?: number;
            } & { [K_4 in Exclude<keyof I_1["keychain"]["fees"], keyof import("./keychain").KeychainFees>]: never; };
            isActive?: boolean;
        } & { [K_5 in Exclude<keyof I_1["keychain"], keyof Keychain>]: never; };
    } & { [K_6 in Exclude<keyof I_1, "keychain">]: never; }>(object: I_1): QueryKeychainByAddressResponse;
};
export declare const QueryKeyRequestsRequest: {
    encode(message: QueryKeyRequestsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryKeyRequestsRequest;
    fromJSON(object: any): QueryKeyRequestsRequest;
    toJSON(message: QueryKeyRequestsRequest): unknown;
    create<I extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
        keychainAddr?: string;
        status?: KeyRequestStatus;
        spaceAddr?: string;
    } & {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K in Exclude<keyof I["pagination"], keyof PageRequest>]: never; };
        keychainAddr?: string;
        status?: KeyRequestStatus;
        spaceAddr?: string;
    } & { [K_1 in Exclude<keyof I, keyof QueryKeyRequestsRequest>]: never; }>(base?: I): QueryKeyRequestsRequest;
    fromPartial<I_1 extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
        keychainAddr?: string;
        status?: KeyRequestStatus;
        spaceAddr?: string;
    } & {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K_2 in Exclude<keyof I_1["pagination"], keyof PageRequest>]: never; };
        keychainAddr?: string;
        status?: KeyRequestStatus;
        spaceAddr?: string;
    } & { [K_3 in Exclude<keyof I_1, keyof QueryKeyRequestsRequest>]: never; }>(object: I_1): QueryKeyRequestsRequest;
};
export declare const QueryKeyRequestsResponse: {
    encode(message: QueryKeyRequestsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryKeyRequestsResponse;
    fromJSON(object: any): QueryKeyRequestsResponse;
    toJSON(message: QueryKeyRequestsResponse): unknown;
    create<I extends {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
        keyRequests?: {
            id?: number;
            creator?: string;
            spaceAddr?: string;
            keychainAddr?: string;
            keyType?: import("./key").KeyType;
            status?: KeyRequestStatus;
            rejectReason?: string;
        }[];
    } & {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
        keyRequests?: {
            id?: number;
            creator?: string;
            spaceAddr?: string;
            keychainAddr?: string;
            keyType?: import("./key").KeyType;
            status?: KeyRequestStatus;
            rejectReason?: string;
        }[] & ({
            id?: number;
            creator?: string;
            spaceAddr?: string;
            keychainAddr?: string;
            keyType?: import("./key").KeyType;
            status?: KeyRequestStatus;
            rejectReason?: string;
        } & {
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K_1 in Exclude<keyof I["keyRequests"], keyof {
            id?: number;
            creator?: string;
            spaceAddr?: string;
            keychainAddr?: string;
            keyType?: import("./key").KeyType;
            status?: KeyRequestStatus;
            rejectReason?: string;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof QueryKeyRequestsResponse>]: never; }>(base?: I): QueryKeyRequestsResponse;
    fromPartial<I_1 extends {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
        keyRequests?: {
            id?: number;
            creator?: string;
            spaceAddr?: string;
            keychainAddr?: string;
            keyType?: import("./key").KeyType;
            status?: KeyRequestStatus;
            rejectReason?: string;
        }[];
    } & {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_3 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
        keyRequests?: {
            id?: number;
            creator?: string;
            spaceAddr?: string;
            keychainAddr?: string;
            keyType?: import("./key").KeyType;
            status?: KeyRequestStatus;
            rejectReason?: string;
        }[] & ({
            id?: number;
            creator?: string;
            spaceAddr?: string;
            keychainAddr?: string;
            keyType?: import("./key").KeyType;
            status?: KeyRequestStatus;
            rejectReason?: string;
        } & {
            id?: number;
            creator?: string;
            spaceAddr?: string;
            keychainAddr?: string;
            keyType?: import("./key").KeyType;
            status?: KeyRequestStatus;
            rejectReason?: string;
        } & { [K_4 in Exclude<keyof I_1["keyRequests"][number], keyof KeyRequest>]: never; })[] & { [K_5 in Exclude<keyof I_1["keyRequests"], keyof {
            id?: number;
            creator?: string;
            spaceAddr?: string;
            keychainAddr?: string;
            keyType?: import("./key").KeyType;
            status?: KeyRequestStatus;
            rejectReason?: string;
        }[]>]: never; };
    } & { [K_6 in Exclude<keyof I_1, keyof QueryKeyRequestsResponse>]: never; }>(object: I_1): QueryKeyRequestsResponse;
};
export declare const QueryKeyRequestByIdRequest: {
    encode(message: QueryKeyRequestByIdRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryKeyRequestByIdRequest;
    fromJSON(object: any): QueryKeyRequestByIdRequest;
    toJSON(message: QueryKeyRequestByIdRequest): unknown;
    create<I extends {
        id?: number;
    } & {
        id?: number;
    } & { [K in Exclude<keyof I, "id">]: never; }>(base?: I): QueryKeyRequestByIdRequest;
    fromPartial<I_1 extends {
        id?: number;
    } & {
        id?: number;
    } & { [K_1 in Exclude<keyof I_1, "id">]: never; }>(object: I_1): QueryKeyRequestByIdRequest;
};
export declare const QueryKeyRequestByIdResponse: {
    encode(message: QueryKeyRequestByIdResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryKeyRequestByIdResponse;
    fromJSON(object: any): QueryKeyRequestByIdResponse;
    toJSON(message: QueryKeyRequestByIdResponse): unknown;
    create<I extends {
        keyRequest?: {
            id?: number;
            creator?: string;
            spaceAddr?: string;
            keychainAddr?: string;
            keyType?: import("./key").KeyType;
            status?: KeyRequestStatus;
            rejectReason?: string;
        };
    } & {
        keyRequest?: {
            id?: number;
            creator?: string;
            spaceAddr?: string;
            keychainAddr?: string;
            keyType?: import("./key").KeyType;
            status?: KeyRequestStatus;
            rejectReason?: string;
        } & {
            id?: number;
            creator?: string;
            spaceAddr?: string;
            keychainAddr?: string;
            keyType?: import("./key").KeyType;
            status?: KeyRequestStatus;
            rejectReason?: string;
        } & { [K in Exclude<keyof I["keyRequest"], keyof KeyRequest>]: never; };
    } & { [K_1 in Exclude<keyof I, "keyRequest">]: never; }>(base?: I): QueryKeyRequestByIdResponse;
    fromPartial<I_1 extends {
        keyRequest?: {
            id?: number;
            creator?: string;
            spaceAddr?: string;
            keychainAddr?: string;
            keyType?: import("./key").KeyType;
            status?: KeyRequestStatus;
            rejectReason?: string;
        };
    } & {
        keyRequest?: {
            id?: number;
            creator?: string;
            spaceAddr?: string;
            keychainAddr?: string;
            keyType?: import("./key").KeyType;
            status?: KeyRequestStatus;
            rejectReason?: string;
        } & {
            id?: number;
            creator?: string;
            spaceAddr?: string;
            keychainAddr?: string;
            keyType?: import("./key").KeyType;
            status?: KeyRequestStatus;
            rejectReason?: string;
        } & { [K_2 in Exclude<keyof I_1["keyRequest"], keyof KeyRequest>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "keyRequest">]: never; }>(object: I_1): QueryKeyRequestByIdResponse;
};
export declare const QueryKeysRequest: {
    encode(message: QueryKeysRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryKeysRequest;
    fromJSON(object: any): QueryKeysRequest;
    toJSON(message: QueryKeysRequest): unknown;
    create<I extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
        spaceAddr?: string;
        type?: WalletType;
        keyId?: number;
    } & {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K in Exclude<keyof I["pagination"], keyof PageRequest>]: never; };
        spaceAddr?: string;
        type?: WalletType;
        keyId?: number;
    } & { [K_1 in Exclude<keyof I, keyof QueryKeysRequest>]: never; }>(base?: I): QueryKeysRequest;
    fromPartial<I_1 extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
        spaceAddr?: string;
        type?: WalletType;
        keyId?: number;
    } & {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K_2 in Exclude<keyof I_1["pagination"], keyof PageRequest>]: never; };
        spaceAddr?: string;
        type?: WalletType;
        keyId?: number;
    } & { [K_3 in Exclude<keyof I_1, keyof QueryKeysRequest>]: never; }>(object: I_1): QueryKeysRequest;
};
export declare const QueryKeysResponse: {
    encode(message: QueryKeysResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryKeysResponse;
    fromJSON(object: any): QueryKeysResponse;
    toJSON(message: QueryKeysResponse): unknown;
    create<I extends {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
        keys?: {
            key?: {
                id?: number;
                spaceAddr?: string;
                keychainAddr?: string;
                type?: import("./key").KeyType;
                publicKey?: Uint8Array;
            };
            wallets?: {
                address?: string;
                type?: WalletType;
            }[];
        }[];
    } & {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
        keys?: {
            key?: {
                id?: number;
                spaceAddr?: string;
                keychainAddr?: string;
                type?: import("./key").KeyType;
                publicKey?: Uint8Array;
            };
            wallets?: {
                address?: string;
                type?: WalletType;
            }[];
        }[] & ({
            key?: {
                id?: number;
                spaceAddr?: string;
                keychainAddr?: string;
                type?: import("./key").KeyType;
                publicKey?: Uint8Array;
            };
            wallets?: {
                address?: string;
                type?: WalletType;
            }[];
        } & {
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K_1 in Exclude<keyof I["keys"], keyof {
            key?: {
                id?: number;
                spaceAddr?: string;
                keychainAddr?: string;
                type?: import("./key").KeyType;
                publicKey?: Uint8Array;
            };
            wallets?: {
                address?: string;
                type?: WalletType;
            }[];
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof QueryKeysResponse>]: never; }>(base?: I): QueryKeysResponse;
    fromPartial<I_1 extends {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
        keys?: {
            key?: {
                id?: number;
                spaceAddr?: string;
                keychainAddr?: string;
                type?: import("./key").KeyType;
                publicKey?: Uint8Array;
            };
            wallets?: {
                address?: string;
                type?: WalletType;
            }[];
        }[];
    } & {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_3 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
        keys?: {
            key?: {
                id?: number;
                spaceAddr?: string;
                keychainAddr?: string;
                type?: import("./key").KeyType;
                publicKey?: Uint8Array;
            };
            wallets?: {
                address?: string;
                type?: WalletType;
            }[];
        }[] & ({
            key?: {
                id?: number;
                spaceAddr?: string;
                keychainAddr?: string;
                type?: import("./key").KeyType;
                publicKey?: Uint8Array;
            };
            wallets?: {
                address?: string;
                type?: WalletType;
            }[];
        } & {
            key?: {
                id?: number;
                spaceAddr?: string;
                keychainAddr?: string;
                type?: import("./key").KeyType;
                publicKey?: Uint8Array;
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            };
            wallets?: {
                address?: string;
                type?: WalletType;
            }[] & ({
                address?: string;
                type?: WalletType;
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            })[] & {
                [x: string]: never;
            };
        } & { [K_4 in Exclude<keyof I_1["keys"][number], keyof KeyResponse>]: never; })[] & { [K_5 in Exclude<keyof I_1["keys"], keyof {
            key?: {
                id?: number;
                spaceAddr?: string;
                keychainAddr?: string;
                type?: import("./key").KeyType;
                publicKey?: Uint8Array;
            };
            wallets?: {
                address?: string;
                type?: WalletType;
            }[];
        }[]>]: never; };
    } & { [K_6 in Exclude<keyof I_1, keyof QueryKeysResponse>]: never; }>(object: I_1): QueryKeysResponse;
};
export declare const KeyResponse: {
    encode(message: KeyResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): KeyResponse;
    fromJSON(object: any): KeyResponse;
    toJSON(message: KeyResponse): unknown;
    create<I extends {
        key?: {
            id?: number;
            spaceAddr?: string;
            keychainAddr?: string;
            type?: import("./key").KeyType;
            publicKey?: Uint8Array;
        };
        wallets?: {
            address?: string;
            type?: WalletType;
        }[];
    } & {
        key?: {
            id?: number;
            spaceAddr?: string;
            keychainAddr?: string;
            type?: import("./key").KeyType;
            publicKey?: Uint8Array;
        } & {
            id?: number;
            spaceAddr?: string;
            keychainAddr?: string;
            type?: import("./key").KeyType;
            publicKey?: Uint8Array;
        } & { [K in Exclude<keyof I["key"], keyof Key>]: never; };
        wallets?: {
            address?: string;
            type?: WalletType;
        }[] & ({
            address?: string;
            type?: WalletType;
        } & {
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K_1 in Exclude<keyof I["wallets"], keyof {
            address?: string;
            type?: WalletType;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof KeyResponse>]: never; }>(base?: I): KeyResponse;
    fromPartial<I_1 extends {
        key?: {
            id?: number;
            spaceAddr?: string;
            keychainAddr?: string;
            type?: import("./key").KeyType;
            publicKey?: Uint8Array;
        };
        wallets?: {
            address?: string;
            type?: WalletType;
        }[];
    } & {
        key?: {
            id?: number;
            spaceAddr?: string;
            keychainAddr?: string;
            type?: import("./key").KeyType;
            publicKey?: Uint8Array;
        } & {
            id?: number;
            spaceAddr?: string;
            keychainAddr?: string;
            type?: import("./key").KeyType;
            publicKey?: Uint8Array;
        } & { [K_3 in Exclude<keyof I_1["key"], keyof Key>]: never; };
        wallets?: {
            address?: string;
            type?: WalletType;
        }[] & ({
            address?: string;
            type?: WalletType;
        } & {
            address?: string;
            type?: WalletType;
        } & { [K_4 in Exclude<keyof I_1["wallets"][number], keyof WalletKeyResponse>]: never; })[] & { [K_5 in Exclude<keyof I_1["wallets"], keyof {
            address?: string;
            type?: WalletType;
        }[]>]: never; };
    } & { [K_6 in Exclude<keyof I_1, keyof KeyResponse>]: never; }>(object: I_1): KeyResponse;
};
export declare const WalletKeyResponse: {
    encode(message: WalletKeyResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): WalletKeyResponse;
    fromJSON(object: any): WalletKeyResponse;
    toJSON(message: WalletKeyResponse): unknown;
    create<I extends {
        address?: string;
        type?: WalletType;
    } & {
        address?: string;
        type?: WalletType;
    } & { [K in Exclude<keyof I, keyof WalletKeyResponse>]: never; }>(base?: I): WalletKeyResponse;
    fromPartial<I_1 extends {
        address?: string;
        type?: WalletType;
    } & {
        address?: string;
        type?: WalletType;
    } & { [K_1 in Exclude<keyof I_1, keyof WalletKeyResponse>]: never; }>(object: I_1): WalletKeyResponse;
};
export declare const QuerySignatureRequestsRequest: {
    encode(message: QuerySignatureRequestsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySignatureRequestsRequest;
    fromJSON(object: any): QuerySignatureRequestsRequest;
    toJSON(message: QuerySignatureRequestsRequest): unknown;
    create<I extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
        keychainAddr?: string;
        status?: SignRequestStatus;
    } & {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K in Exclude<keyof I["pagination"], keyof PageRequest>]: never; };
        keychainAddr?: string;
        status?: SignRequestStatus;
    } & { [K_1 in Exclude<keyof I, keyof QuerySignatureRequestsRequest>]: never; }>(base?: I): QuerySignatureRequestsRequest;
    fromPartial<I_1 extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
        keychainAddr?: string;
        status?: SignRequestStatus;
    } & {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K_2 in Exclude<keyof I_1["pagination"], keyof PageRequest>]: never; };
        keychainAddr?: string;
        status?: SignRequestStatus;
    } & { [K_3 in Exclude<keyof I_1, keyof QuerySignatureRequestsRequest>]: never; }>(object: I_1): QuerySignatureRequestsRequest;
};
export declare const QuerySignatureRequestsResponse: {
    encode(message: QuerySignatureRequestsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySignatureRequestsResponse;
    fromJSON(object: any): QuerySignatureRequestsResponse;
    toJSON(message: QuerySignatureRequestsResponse): unknown;
    create<I extends {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
        signRequests?: {
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: SignRequestStatus;
            keyType?: import("./key").KeyType;
            signedData?: Uint8Array;
            rejectReason?: string;
        }[];
    } & {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
        signRequests?: {
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: SignRequestStatus;
            keyType?: import("./key").KeyType;
            signedData?: Uint8Array;
            rejectReason?: string;
        }[] & ({
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: SignRequestStatus;
            keyType?: import("./key").KeyType;
            signedData?: Uint8Array;
            rejectReason?: string;
        } & {
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K_1 in Exclude<keyof I["signRequests"], keyof {
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: SignRequestStatus;
            keyType?: import("./key").KeyType;
            signedData?: Uint8Array;
            rejectReason?: string;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof QuerySignatureRequestsResponse>]: never; }>(base?: I): QuerySignatureRequestsResponse;
    fromPartial<I_1 extends {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
        signRequests?: {
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: SignRequestStatus;
            keyType?: import("./key").KeyType;
            signedData?: Uint8Array;
            rejectReason?: string;
        }[];
    } & {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_3 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
        signRequests?: {
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: SignRequestStatus;
            keyType?: import("./key").KeyType;
            signedData?: Uint8Array;
            rejectReason?: string;
        }[] & ({
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: SignRequestStatus;
            keyType?: import("./key").KeyType;
            signedData?: Uint8Array;
            rejectReason?: string;
        } & {
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: SignRequestStatus;
            keyType?: import("./key").KeyType;
            signedData?: Uint8Array;
            rejectReason?: string;
        } & { [K_4 in Exclude<keyof I_1["signRequests"][number], keyof SignRequest>]: never; })[] & { [K_5 in Exclude<keyof I_1["signRequests"], keyof {
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: SignRequestStatus;
            keyType?: import("./key").KeyType;
            signedData?: Uint8Array;
            rejectReason?: string;
        }[]>]: never; };
    } & { [K_6 in Exclude<keyof I_1, keyof QuerySignatureRequestsResponse>]: never; }>(object: I_1): QuerySignatureRequestsResponse;
};
export declare const QuerySignatureRequestByIdRequest: {
    encode(message: QuerySignatureRequestByIdRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySignatureRequestByIdRequest;
    fromJSON(object: any): QuerySignatureRequestByIdRequest;
    toJSON(message: QuerySignatureRequestByIdRequest): unknown;
    create<I extends {
        id?: number;
    } & {
        id?: number;
    } & { [K in Exclude<keyof I, "id">]: never; }>(base?: I): QuerySignatureRequestByIdRequest;
    fromPartial<I_1 extends {
        id?: number;
    } & {
        id?: number;
    } & { [K_1 in Exclude<keyof I_1, "id">]: never; }>(object: I_1): QuerySignatureRequestByIdRequest;
};
export declare const QuerySignatureRequestByIdResponse: {
    encode(message: QuerySignatureRequestByIdResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySignatureRequestByIdResponse;
    fromJSON(object: any): QuerySignatureRequestByIdResponse;
    toJSON(message: QuerySignatureRequestByIdResponse): unknown;
    create<I extends {
        signRequest?: {
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: SignRequestStatus;
            keyType?: import("./key").KeyType;
            signedData?: Uint8Array;
            rejectReason?: string;
        };
    } & {
        signRequest?: {
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: SignRequestStatus;
            keyType?: import("./key").KeyType;
            signedData?: Uint8Array;
            rejectReason?: string;
        } & {
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: SignRequestStatus;
            keyType?: import("./key").KeyType;
            signedData?: Uint8Array;
            rejectReason?: string;
        } & { [K in Exclude<keyof I["signRequest"], keyof SignRequest>]: never; };
    } & { [K_1 in Exclude<keyof I, "signRequest">]: never; }>(base?: I): QuerySignatureRequestByIdResponse;
    fromPartial<I_1 extends {
        signRequest?: {
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: SignRequestStatus;
            keyType?: import("./key").KeyType;
            signedData?: Uint8Array;
            rejectReason?: string;
        };
    } & {
        signRequest?: {
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: SignRequestStatus;
            keyType?: import("./key").KeyType;
            signedData?: Uint8Array;
            rejectReason?: string;
        } & {
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: SignRequestStatus;
            keyType?: import("./key").KeyType;
            signedData?: Uint8Array;
            rejectReason?: string;
        } & { [K_2 in Exclude<keyof I_1["signRequest"], keyof SignRequest>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "signRequest">]: never; }>(object: I_1): QuerySignatureRequestByIdResponse;
};
export declare const QuerySignTransactionRequestsRequest: {
    encode(message: QuerySignTransactionRequestsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySignTransactionRequestsRequest;
    fromJSON(object: any): QuerySignTransactionRequestsRequest;
    toJSON(message: QuerySignTransactionRequestsRequest): unknown;
    create<I extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
        walletType?: WalletType;
        keyId?: number;
        status?: SignRequestStatus;
    } & {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K in Exclude<keyof I["pagination"], keyof PageRequest>]: never; };
        walletType?: WalletType;
        keyId?: number;
        status?: SignRequestStatus;
    } & { [K_1 in Exclude<keyof I, keyof QuerySignTransactionRequestsRequest>]: never; }>(base?: I): QuerySignTransactionRequestsRequest;
    fromPartial<I_1 extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
        walletType?: WalletType;
        keyId?: number;
        status?: SignRequestStatus;
    } & {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K_2 in Exclude<keyof I_1["pagination"], keyof PageRequest>]: never; };
        walletType?: WalletType;
        keyId?: number;
        status?: SignRequestStatus;
    } & { [K_3 in Exclude<keyof I_1, keyof QuerySignTransactionRequestsRequest>]: never; }>(object: I_1): QuerySignTransactionRequestsRequest;
};
export declare const SignTransactionRequestResponse: {
    encode(message: SignTransactionRequestResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SignTransactionRequestResponse;
    fromJSON(object: any): SignTransactionRequestResponse;
    toJSON(message: SignTransactionRequestResponse): unknown;
    create<I extends {
        signTransactionRequest?: {
            id?: number;
            creator?: string;
            keyId?: number;
            walletType?: WalletType;
            unsignedTransaction?: Uint8Array;
            signRequestId?: number;
        };
        signRequest?: {
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: SignRequestStatus;
            keyType?: import("./key").KeyType;
            signedData?: Uint8Array;
            rejectReason?: string;
        };
    } & {
        signTransactionRequest?: {
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
        } & { [K in Exclude<keyof I["signTransactionRequest"], keyof SignTransactionRequest>]: never; };
        signRequest?: {
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: SignRequestStatus;
            keyType?: import("./key").KeyType;
            signedData?: Uint8Array;
            rejectReason?: string;
        } & {
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: SignRequestStatus;
            keyType?: import("./key").KeyType;
            signedData?: Uint8Array;
            rejectReason?: string;
        } & { [K_1 in Exclude<keyof I["signRequest"], keyof SignRequest>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof SignTransactionRequestResponse>]: never; }>(base?: I): SignTransactionRequestResponse;
    fromPartial<I_1 extends {
        signTransactionRequest?: {
            id?: number;
            creator?: string;
            keyId?: number;
            walletType?: WalletType;
            unsignedTransaction?: Uint8Array;
            signRequestId?: number;
        };
        signRequest?: {
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: SignRequestStatus;
            keyType?: import("./key").KeyType;
            signedData?: Uint8Array;
            rejectReason?: string;
        };
    } & {
        signTransactionRequest?: {
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
        } & { [K_3 in Exclude<keyof I_1["signTransactionRequest"], keyof SignTransactionRequest>]: never; };
        signRequest?: {
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: SignRequestStatus;
            keyType?: import("./key").KeyType;
            signedData?: Uint8Array;
            rejectReason?: string;
        } & {
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: SignRequestStatus;
            keyType?: import("./key").KeyType;
            signedData?: Uint8Array;
            rejectReason?: string;
        } & { [K_4 in Exclude<keyof I_1["signRequest"], keyof SignRequest>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof SignTransactionRequestResponse>]: never; }>(object: I_1): SignTransactionRequestResponse;
};
export declare const QuerySignTransactionRequestsResponse: {
    encode(message: QuerySignTransactionRequestsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySignTransactionRequestsResponse;
    fromJSON(object: any): QuerySignTransactionRequestsResponse;
    toJSON(message: QuerySignTransactionRequestsResponse): unknown;
    create<I extends {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
        signTransactionRequests?: {
            signTransactionRequest?: {
                id?: number;
                creator?: string;
                keyId?: number;
                walletType?: WalletType;
                unsignedTransaction?: Uint8Array;
                signRequestId?: number;
            };
            signRequest?: {
                id?: number;
                creator?: string;
                keyId?: number;
                dataForSigning?: Uint8Array;
                status?: SignRequestStatus;
                keyType?: import("./key").KeyType;
                signedData?: Uint8Array;
                rejectReason?: string;
            };
        }[];
    } & {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
        signTransactionRequests?: {
            signTransactionRequest?: {
                id?: number;
                creator?: string;
                keyId?: number;
                walletType?: WalletType;
                unsignedTransaction?: Uint8Array;
                signRequestId?: number;
            };
            signRequest?: {
                id?: number;
                creator?: string;
                keyId?: number;
                dataForSigning?: Uint8Array;
                status?: SignRequestStatus;
                keyType?: import("./key").KeyType;
                signedData?: Uint8Array;
                rejectReason?: string;
            };
        }[] & ({
            signTransactionRequest?: {
                id?: number;
                creator?: string;
                keyId?: number;
                walletType?: WalletType;
                unsignedTransaction?: Uint8Array;
                signRequestId?: number;
            };
            signRequest?: {
                id?: number;
                creator?: string;
                keyId?: number;
                dataForSigning?: Uint8Array;
                status?: SignRequestStatus;
                keyType?: import("./key").KeyType;
                signedData?: Uint8Array;
                rejectReason?: string;
            };
        } & {
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K_1 in Exclude<keyof I["signTransactionRequests"], keyof {
            signTransactionRequest?: {
                id?: number;
                creator?: string;
                keyId?: number;
                walletType?: WalletType;
                unsignedTransaction?: Uint8Array;
                signRequestId?: number;
            };
            signRequest?: {
                id?: number;
                creator?: string;
                keyId?: number;
                dataForSigning?: Uint8Array;
                status?: SignRequestStatus;
                keyType?: import("./key").KeyType;
                signedData?: Uint8Array;
                rejectReason?: string;
            };
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof QuerySignTransactionRequestsResponse>]: never; }>(base?: I): QuerySignTransactionRequestsResponse;
    fromPartial<I_1 extends {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
        signTransactionRequests?: {
            signTransactionRequest?: {
                id?: number;
                creator?: string;
                keyId?: number;
                walletType?: WalletType;
                unsignedTransaction?: Uint8Array;
                signRequestId?: number;
            };
            signRequest?: {
                id?: number;
                creator?: string;
                keyId?: number;
                dataForSigning?: Uint8Array;
                status?: SignRequestStatus;
                keyType?: import("./key").KeyType;
                signedData?: Uint8Array;
                rejectReason?: string;
            };
        }[];
    } & {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_3 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
        signTransactionRequests?: {
            signTransactionRequest?: {
                id?: number;
                creator?: string;
                keyId?: number;
                walletType?: WalletType;
                unsignedTransaction?: Uint8Array;
                signRequestId?: number;
            };
            signRequest?: {
                id?: number;
                creator?: string;
                keyId?: number;
                dataForSigning?: Uint8Array;
                status?: SignRequestStatus;
                keyType?: import("./key").KeyType;
                signedData?: Uint8Array;
                rejectReason?: string;
            };
        }[] & ({
            signTransactionRequest?: {
                id?: number;
                creator?: string;
                keyId?: number;
                walletType?: WalletType;
                unsignedTransaction?: Uint8Array;
                signRequestId?: number;
            };
            signRequest?: {
                id?: number;
                creator?: string;
                keyId?: number;
                dataForSigning?: Uint8Array;
                status?: SignRequestStatus;
                keyType?: import("./key").KeyType;
                signedData?: Uint8Array;
                rejectReason?: string;
            };
        } & {
            signTransactionRequest?: {
                id?: number;
                creator?: string;
                keyId?: number;
                walletType?: WalletType;
                unsignedTransaction?: Uint8Array;
                signRequestId?: number;
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            };
            signRequest?: {
                id?: number;
                creator?: string;
                keyId?: number;
                dataForSigning?: Uint8Array;
                status?: SignRequestStatus;
                keyType?: import("./key").KeyType;
                signedData?: Uint8Array;
                rejectReason?: string;
            } & {
                [x: string]: any;
            } & {
                [x: string]: never;
            };
        } & { [K_4 in Exclude<keyof I_1["signTransactionRequests"][number], keyof SignTransactionRequestResponse>]: never; })[] & { [K_5 in Exclude<keyof I_1["signTransactionRequests"], keyof {
            signTransactionRequest?: {
                id?: number;
                creator?: string;
                keyId?: number;
                walletType?: WalletType;
                unsignedTransaction?: Uint8Array;
                signRequestId?: number;
            };
            signRequest?: {
                id?: number;
                creator?: string;
                keyId?: number;
                dataForSigning?: Uint8Array;
                status?: SignRequestStatus;
                keyType?: import("./key").KeyType;
                signedData?: Uint8Array;
                rejectReason?: string;
            };
        }[]>]: never; };
    } & { [K_6 in Exclude<keyof I_1, keyof QuerySignTransactionRequestsResponse>]: never; }>(object: I_1): QuerySignTransactionRequestsResponse;
};
export declare const QuerySignTransactionRequestByIdRequest: {
    encode(message: QuerySignTransactionRequestByIdRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySignTransactionRequestByIdRequest;
    fromJSON(object: any): QuerySignTransactionRequestByIdRequest;
    toJSON(message: QuerySignTransactionRequestByIdRequest): unknown;
    create<I extends {
        id?: number;
    } & {
        id?: number;
    } & { [K in Exclude<keyof I, "id">]: never; }>(base?: I): QuerySignTransactionRequestByIdRequest;
    fromPartial<I_1 extends {
        id?: number;
    } & {
        id?: number;
    } & { [K_1 in Exclude<keyof I_1, "id">]: never; }>(object: I_1): QuerySignTransactionRequestByIdRequest;
};
export declare const QuerySignTransactionRequestByIdResponse: {
    encode(message: QuerySignTransactionRequestByIdResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySignTransactionRequestByIdResponse;
    fromJSON(object: any): QuerySignTransactionRequestByIdResponse;
    toJSON(message: QuerySignTransactionRequestByIdResponse): unknown;
    create<I extends {
        signTransactionRequest?: {
            id?: number;
            creator?: string;
            keyId?: number;
            walletType?: WalletType;
            unsignedTransaction?: Uint8Array;
            signRequestId?: number;
        };
    } & {
        signTransactionRequest?: {
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
        } & { [K in Exclude<keyof I["signTransactionRequest"], keyof SignTransactionRequest>]: never; };
    } & { [K_1 in Exclude<keyof I, "signTransactionRequest">]: never; }>(base?: I): QuerySignTransactionRequestByIdResponse;
    fromPartial<I_1 extends {
        signTransactionRequest?: {
            id?: number;
            creator?: string;
            keyId?: number;
            walletType?: WalletType;
            unsignedTransaction?: Uint8Array;
            signRequestId?: number;
        };
    } & {
        signTransactionRequest?: {
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
        } & { [K_2 in Exclude<keyof I_1["signTransactionRequest"], keyof SignTransactionRequest>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "signTransactionRequest">]: never; }>(object: I_1): QuerySignTransactionRequestByIdResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** Parameters queries the parameters of the module. */
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    /** Queries a list of Spaces items. */
    Spaces(request: QuerySpacesRequest): Promise<QuerySpacesResponse>;
    /** Queries a list of Spaces that has the specified owner. */
    SpacesByOwner(request: QuerySpacesByOwnerRequest): Promise<QuerySpacesResponse>;
    /** Queries a list of Keychains items. */
    Keychains(request: QueryKeychainsRequest): Promise<QueryKeychainsResponse>;
    /** Queries a list of SpaceByAddress items. */
    SpaceByAddress(request: QuerySpaceByAddressRequest): Promise<QuerySpaceByAddressResponse>;
    /** Queries a list of KeychainById items. */
    KeychainByAddress(request: QueryKeychainByAddressRequest): Promise<QueryKeychainByAddressResponse>;
    /** Queries a list of KeyRequests items. */
    KeyRequests(request: QueryKeyRequestsRequest): Promise<QueryKeyRequestsResponse>;
    /** Queries a single KeyRequest by its id. */
    KeyRequestById(request: QueryKeyRequestByIdRequest): Promise<QueryKeyRequestByIdResponse>;
    /** Queries a list of Keys items. */
    Keys(request: QueryKeysRequest): Promise<QueryKeysResponse>;
    /** Queries a list of SignatureRequests items. */
    SignatureRequests(request: QuerySignatureRequestsRequest): Promise<QuerySignatureRequestsResponse>;
    /** Queries a single SignatureRequest by its id. */
    SignatureRequestById(request: QuerySignatureRequestByIdRequest): Promise<QuerySignatureRequestByIdResponse>;
    /** Queries a list of SignTransactionRequests items. */
    SignTransactionRequests(request: QuerySignTransactionRequestsRequest): Promise<QuerySignTransactionRequestsResponse>;
    /** Queries a list of SignTransactionRequestById items. */
    SignTransactionRequestById(request: QuerySignTransactionRequestByIdRequest): Promise<QuerySignTransactionRequestByIdResponse>;
}
export declare const QueryServiceName = "warden.warden.v1beta1.Query";
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    Spaces(request: QuerySpacesRequest): Promise<QuerySpacesResponse>;
    SpacesByOwner(request: QuerySpacesByOwnerRequest): Promise<QuerySpacesResponse>;
    Keychains(request: QueryKeychainsRequest): Promise<QueryKeychainsResponse>;
    SpaceByAddress(request: QuerySpaceByAddressRequest): Promise<QuerySpaceByAddressResponse>;
    KeychainByAddress(request: QueryKeychainByAddressRequest): Promise<QueryKeychainByAddressResponse>;
    KeyRequests(request: QueryKeyRequestsRequest): Promise<QueryKeyRequestsResponse>;
    KeyRequestById(request: QueryKeyRequestByIdRequest): Promise<QueryKeyRequestByIdResponse>;
    Keys(request: QueryKeysRequest): Promise<QueryKeysResponse>;
    SignatureRequests(request: QuerySignatureRequestsRequest): Promise<QuerySignatureRequestsResponse>;
    SignatureRequestById(request: QuerySignatureRequestByIdRequest): Promise<QuerySignatureRequestByIdResponse>;
    SignTransactionRequests(request: QuerySignTransactionRequestsRequest): Promise<QuerySignTransactionRequestsResponse>;
    SignTransactionRequestById(request: QuerySignTransactionRequestByIdRequest): Promise<QuerySignTransactionRequestByIdResponse>;
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
