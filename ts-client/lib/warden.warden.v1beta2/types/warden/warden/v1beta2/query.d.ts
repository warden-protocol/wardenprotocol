import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../cosmos/base/query/v1beta1/pagination";
import { AddressType, Key, KeyRequest, KeyRequestStatus } from "./key";
import { Keychain } from "./keychain";
import { Params } from "./params";
import { SignRequest, SignRequestStatus } from "./signature";
import { Space } from "./space";
export declare const protobufPackage = "warden.warden.v1beta2";
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
export interface QuerySpaceByIdRequest {
    id: number;
}
export interface QuerySpaceByIdResponse {
    space: Space | undefined;
}
export interface QueryKeychainByIdRequest {
    id: number;
}
export interface QueryKeychainByIdResponse {
    keychain: Keychain | undefined;
}
export interface QueryKeyRequestsRequest {
    pagination: PageRequest | undefined;
    keychainId: number;
    /** Optional */
    status: KeyRequestStatus;
    spaceId: number;
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
export interface QueryAllKeysRequest {
    pagination: PageRequest | undefined;
    /** Optional */
    deriveAddresses: AddressType[];
}
export interface QueryKeysResponse {
    pagination: PageResponse | undefined;
    keys: QueryKeyResponse[];
}
export interface QueryKeysBySpaceIdRequest {
    pagination: PageRequest | undefined;
    spaceId: number;
    /** Optional */
    deriveAddresses: AddressType[];
}
export interface QueryKeyByIdRequest {
    id: number;
    /** Optional */
    deriveAddresses: AddressType[];
}
export interface QueryKeyResponse {
    key: Key | undefined;
    addresses: AddressResponse[];
}
export interface AddressResponse {
    address: string;
    type: AddressType;
}
export interface QuerySignatureRequestsRequest {
    pagination: PageRequest | undefined;
    keychainId: number;
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
            id?: number;
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
            owners?: string[] & string[] & { [K_1 in Exclude<keyof I["spaces"][number]["owners"], keyof string[]>]: never; };
            adminIntentId?: number;
            signIntentId?: number;
        } & { [K_2 in Exclude<keyof I["spaces"][number], keyof Space>]: never; })[] & { [K_3 in Exclude<keyof I["spaces"], keyof {
            id?: number;
            creator?: string;
            owners?: string[];
            adminIntentId?: number;
            signIntentId?: number;
        }[]>]: never; };
    } & { [K_4 in Exclude<keyof I, keyof QuerySpacesResponse>]: never; }>(base?: I): QuerySpacesResponse;
    fromPartial<I_1 extends {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
        spaces?: {
            id?: number;
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
        } & { [K_5 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
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
            owners?: string[] & string[] & { [K_6 in Exclude<keyof I_1["spaces"][number]["owners"], keyof string[]>]: never; };
            adminIntentId?: number;
            signIntentId?: number;
        } & { [K_7 in Exclude<keyof I_1["spaces"][number], keyof Space>]: never; })[] & { [K_8 in Exclude<keyof I_1["spaces"], keyof {
            id?: number;
            creator?: string;
            owners?: string[];
            adminIntentId?: number;
            signIntentId?: number;
        }[]>]: never; };
    } & { [K_9 in Exclude<keyof I_1, keyof QuerySpacesResponse>]: never; }>(object: I_1): QuerySpacesResponse;
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
    } & {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
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
    } & { [K_6 in Exclude<keyof I, keyof QueryKeychainsResponse>]: never; }>(base?: I): QueryKeychainsResponse;
    fromPartial<I_1 extends {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
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
    } & {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_7 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
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
            admins?: string[] & string[] & { [K_8 in Exclude<keyof I_1["keychains"][number]["admins"], keyof string[]>]: never; };
            parties?: string[] & string[] & { [K_9 in Exclude<keyof I_1["keychains"][number]["parties"], keyof string[]>]: never; };
            adminIntentId?: number;
            fees?: {
                keyReq?: number;
                sigReq?: number;
            } & {
                keyReq?: number;
                sigReq?: number;
            } & { [K_10 in Exclude<keyof I_1["keychains"][number]["fees"], keyof import("./keychain").KeychainFees>]: never; };
            isActive?: boolean;
        } & { [K_11 in Exclude<keyof I_1["keychains"][number], keyof Keychain>]: never; })[] & { [K_12 in Exclude<keyof I_1["keychains"], keyof {
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
    } & { [K_13 in Exclude<keyof I_1, keyof QueryKeychainsResponse>]: never; }>(object: I_1): QueryKeychainsResponse;
};
export declare const QuerySpaceByIdRequest: {
    encode(message: QuerySpaceByIdRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySpaceByIdRequest;
    fromJSON(object: any): QuerySpaceByIdRequest;
    toJSON(message: QuerySpaceByIdRequest): unknown;
    create<I extends {
        id?: number;
    } & {
        id?: number;
    } & { [K in Exclude<keyof I, "id">]: never; }>(base?: I): QuerySpaceByIdRequest;
    fromPartial<I_1 extends {
        id?: number;
    } & {
        id?: number;
    } & { [K_1 in Exclude<keyof I_1, "id">]: never; }>(object: I_1): QuerySpaceByIdRequest;
};
export declare const QuerySpaceByIdResponse: {
    encode(message: QuerySpaceByIdResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySpaceByIdResponse;
    fromJSON(object: any): QuerySpaceByIdResponse;
    toJSON(message: QuerySpaceByIdResponse): unknown;
    create<I extends {
        space?: {
            id?: number;
            creator?: string;
            owners?: string[];
            adminIntentId?: number;
            signIntentId?: number;
        };
    } & {
        space?: {
            id?: number;
            creator?: string;
            owners?: string[];
            adminIntentId?: number;
            signIntentId?: number;
        } & {
            id?: number;
            creator?: string;
            owners?: string[] & string[] & { [K in Exclude<keyof I["space"]["owners"], keyof string[]>]: never; };
            adminIntentId?: number;
            signIntentId?: number;
        } & { [K_1 in Exclude<keyof I["space"], keyof Space>]: never; };
    } & { [K_2 in Exclude<keyof I, "space">]: never; }>(base?: I): QuerySpaceByIdResponse;
    fromPartial<I_1 extends {
        space?: {
            id?: number;
            creator?: string;
            owners?: string[];
            adminIntentId?: number;
            signIntentId?: number;
        };
    } & {
        space?: {
            id?: number;
            creator?: string;
            owners?: string[];
            adminIntentId?: number;
            signIntentId?: number;
        } & {
            id?: number;
            creator?: string;
            owners?: string[] & string[] & { [K_3 in Exclude<keyof I_1["space"]["owners"], keyof string[]>]: never; };
            adminIntentId?: number;
            signIntentId?: number;
        } & { [K_4 in Exclude<keyof I_1["space"], keyof Space>]: never; };
    } & { [K_5 in Exclude<keyof I_1, "space">]: never; }>(object: I_1): QuerySpaceByIdResponse;
};
export declare const QueryKeychainByIdRequest: {
    encode(message: QueryKeychainByIdRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryKeychainByIdRequest;
    fromJSON(object: any): QueryKeychainByIdRequest;
    toJSON(message: QueryKeychainByIdRequest): unknown;
    create<I extends {
        id?: number;
    } & {
        id?: number;
    } & { [K in Exclude<keyof I, "id">]: never; }>(base?: I): QueryKeychainByIdRequest;
    fromPartial<I_1 extends {
        id?: number;
    } & {
        id?: number;
    } & { [K_1 in Exclude<keyof I_1, "id">]: never; }>(object: I_1): QueryKeychainByIdRequest;
};
export declare const QueryKeychainByIdResponse: {
    encode(message: QueryKeychainByIdResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryKeychainByIdResponse;
    fromJSON(object: any): QueryKeychainByIdResponse;
    toJSON(message: QueryKeychainByIdResponse): unknown;
    create<I extends {
        keychain?: {
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
        };
    } & {
        keychain?: {
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
            admins?: string[] & string[] & { [K in Exclude<keyof I["keychain"]["admins"], keyof string[]>]: never; };
            parties?: string[] & string[] & { [K_1 in Exclude<keyof I["keychain"]["parties"], keyof string[]>]: never; };
            adminIntentId?: number;
            fees?: {
                keyReq?: number;
                sigReq?: number;
            } & {
                keyReq?: number;
                sigReq?: number;
            } & { [K_2 in Exclude<keyof I["keychain"]["fees"], keyof import("./keychain").KeychainFees>]: never; };
            isActive?: boolean;
        } & { [K_3 in Exclude<keyof I["keychain"], keyof Keychain>]: never; };
    } & { [K_4 in Exclude<keyof I, "keychain">]: never; }>(base?: I): QueryKeychainByIdResponse;
    fromPartial<I_1 extends {
        keychain?: {
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
        };
    } & {
        keychain?: {
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
            admins?: string[] & string[] & { [K_5 in Exclude<keyof I_1["keychain"]["admins"], keyof string[]>]: never; };
            parties?: string[] & string[] & { [K_6 in Exclude<keyof I_1["keychain"]["parties"], keyof string[]>]: never; };
            adminIntentId?: number;
            fees?: {
                keyReq?: number;
                sigReq?: number;
            } & {
                keyReq?: number;
                sigReq?: number;
            } & { [K_7 in Exclude<keyof I_1["keychain"]["fees"], keyof import("./keychain").KeychainFees>]: never; };
            isActive?: boolean;
        } & { [K_8 in Exclude<keyof I_1["keychain"], keyof Keychain>]: never; };
    } & { [K_9 in Exclude<keyof I_1, "keychain">]: never; }>(object: I_1): QueryKeychainByIdResponse;
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
        keychainId?: number;
        status?: KeyRequestStatus;
        spaceId?: number;
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
        keychainId?: number;
        status?: KeyRequestStatus;
        spaceId?: number;
    } & { [K_1 in Exclude<keyof I, keyof QueryKeyRequestsRequest>]: never; }>(base?: I): QueryKeyRequestsRequest;
    fromPartial<I_1 extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
        keychainId?: number;
        status?: KeyRequestStatus;
        spaceId?: number;
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
        keychainId?: number;
        status?: KeyRequestStatus;
        spaceId?: number;
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
            spaceId?: number;
            keychainId?: number;
            keyType?: import("./key").KeyType;
            status?: KeyRequestStatus;
            rejectReason?: string;
            intentId?: number;
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
            spaceId?: number;
            keychainId?: number;
            keyType?: import("./key").KeyType;
            status?: KeyRequestStatus;
            rejectReason?: string;
            intentId?: number;
        }[] & ({
            id?: number;
            creator?: string;
            spaceId?: number;
            keychainId?: number;
            keyType?: import("./key").KeyType;
            status?: KeyRequestStatus;
            rejectReason?: string;
            intentId?: number;
        } & {
            id?: number;
            creator?: string;
            spaceId?: number;
            keychainId?: number;
            keyType?: import("./key").KeyType;
            status?: KeyRequestStatus;
            rejectReason?: string;
            intentId?: number;
        } & { [K_1 in Exclude<keyof I["keyRequests"][number], keyof KeyRequest>]: never; })[] & { [K_2 in Exclude<keyof I["keyRequests"], keyof {
            id?: number;
            creator?: string;
            spaceId?: number;
            keychainId?: number;
            keyType?: import("./key").KeyType;
            status?: KeyRequestStatus;
            rejectReason?: string;
            intentId?: number;
        }[]>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof QueryKeyRequestsResponse>]: never; }>(base?: I): QueryKeyRequestsResponse;
    fromPartial<I_1 extends {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
        keyRequests?: {
            id?: number;
            creator?: string;
            spaceId?: number;
            keychainId?: number;
            keyType?: import("./key").KeyType;
            status?: KeyRequestStatus;
            rejectReason?: string;
            intentId?: number;
        }[];
    } & {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_4 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
        keyRequests?: {
            id?: number;
            creator?: string;
            spaceId?: number;
            keychainId?: number;
            keyType?: import("./key").KeyType;
            status?: KeyRequestStatus;
            rejectReason?: string;
            intentId?: number;
        }[] & ({
            id?: number;
            creator?: string;
            spaceId?: number;
            keychainId?: number;
            keyType?: import("./key").KeyType;
            status?: KeyRequestStatus;
            rejectReason?: string;
            intentId?: number;
        } & {
            id?: number;
            creator?: string;
            spaceId?: number;
            keychainId?: number;
            keyType?: import("./key").KeyType;
            status?: KeyRequestStatus;
            rejectReason?: string;
            intentId?: number;
        } & { [K_5 in Exclude<keyof I_1["keyRequests"][number], keyof KeyRequest>]: never; })[] & { [K_6 in Exclude<keyof I_1["keyRequests"], keyof {
            id?: number;
            creator?: string;
            spaceId?: number;
            keychainId?: number;
            keyType?: import("./key").KeyType;
            status?: KeyRequestStatus;
            rejectReason?: string;
            intentId?: number;
        }[]>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof QueryKeyRequestsResponse>]: never; }>(object: I_1): QueryKeyRequestsResponse;
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
            spaceId?: number;
            keychainId?: number;
            keyType?: import("./key").KeyType;
            status?: KeyRequestStatus;
            rejectReason?: string;
            intentId?: number;
        };
    } & {
        keyRequest?: {
            id?: number;
            creator?: string;
            spaceId?: number;
            keychainId?: number;
            keyType?: import("./key").KeyType;
            status?: KeyRequestStatus;
            rejectReason?: string;
            intentId?: number;
        } & {
            id?: number;
            creator?: string;
            spaceId?: number;
            keychainId?: number;
            keyType?: import("./key").KeyType;
            status?: KeyRequestStatus;
            rejectReason?: string;
            intentId?: number;
        } & { [K in Exclude<keyof I["keyRequest"], keyof KeyRequest>]: never; };
    } & { [K_1 in Exclude<keyof I, "keyRequest">]: never; }>(base?: I): QueryKeyRequestByIdResponse;
    fromPartial<I_1 extends {
        keyRequest?: {
            id?: number;
            creator?: string;
            spaceId?: number;
            keychainId?: number;
            keyType?: import("./key").KeyType;
            status?: KeyRequestStatus;
            rejectReason?: string;
            intentId?: number;
        };
    } & {
        keyRequest?: {
            id?: number;
            creator?: string;
            spaceId?: number;
            keychainId?: number;
            keyType?: import("./key").KeyType;
            status?: KeyRequestStatus;
            rejectReason?: string;
            intentId?: number;
        } & {
            id?: number;
            creator?: string;
            spaceId?: number;
            keychainId?: number;
            keyType?: import("./key").KeyType;
            status?: KeyRequestStatus;
            rejectReason?: string;
            intentId?: number;
        } & { [K_2 in Exclude<keyof I_1["keyRequest"], keyof KeyRequest>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "keyRequest">]: never; }>(object: I_1): QueryKeyRequestByIdResponse;
};
export declare const QueryAllKeysRequest: {
    encode(message: QueryAllKeysRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllKeysRequest;
    fromJSON(object: any): QueryAllKeysRequest;
    toJSON(message: QueryAllKeysRequest): unknown;
    create<I extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
        deriveAddresses?: AddressType[];
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
        deriveAddresses?: AddressType[] & AddressType[] & { [K_1 in Exclude<keyof I["deriveAddresses"], keyof AddressType[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof QueryAllKeysRequest>]: never; }>(base?: I): QueryAllKeysRequest;
    fromPartial<I_1 extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
        deriveAddresses?: AddressType[];
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
        } & { [K_3 in Exclude<keyof I_1["pagination"], keyof PageRequest>]: never; };
        deriveAddresses?: AddressType[] & AddressType[] & { [K_4 in Exclude<keyof I_1["deriveAddresses"], keyof AddressType[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof QueryAllKeysRequest>]: never; }>(object: I_1): QueryAllKeysRequest;
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
                spaceId?: number;
                keychainId?: number;
                type?: import("./key").KeyType;
                publicKey?: Uint8Array;
                intentId?: number;
            };
            addresses?: {
                address?: string;
                type?: AddressType;
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
                spaceId?: number;
                keychainId?: number;
                type?: import("./key").KeyType;
                publicKey?: Uint8Array;
                intentId?: number;
            };
            addresses?: {
                address?: string;
                type?: AddressType;
            }[];
        }[] & ({
            key?: {
                id?: number;
                spaceId?: number;
                keychainId?: number;
                type?: import("./key").KeyType;
                publicKey?: Uint8Array;
                intentId?: number;
            };
            addresses?: {
                address?: string;
                type?: AddressType;
            }[];
        } & {
            key?: {
                id?: number;
                spaceId?: number;
                keychainId?: number;
                type?: import("./key").KeyType;
                publicKey?: Uint8Array;
                intentId?: number;
            } & {
                id?: number;
                spaceId?: number;
                keychainId?: number;
                type?: import("./key").KeyType;
                publicKey?: Uint8Array;
                intentId?: number;
            } & { [K_1 in Exclude<keyof I["keys"][number]["key"], keyof Key>]: never; };
            addresses?: {
                address?: string;
                type?: AddressType;
            }[] & ({
                address?: string;
                type?: AddressType;
            } & {
                address?: string;
                type?: AddressType;
            } & { [K_2 in Exclude<keyof I["keys"][number]["addresses"][number], keyof AddressResponse>]: never; })[] & { [K_3 in Exclude<keyof I["keys"][number]["addresses"], keyof {
                address?: string;
                type?: AddressType;
            }[]>]: never; };
        } & { [K_4 in Exclude<keyof I["keys"][number], keyof QueryKeyResponse>]: never; })[] & { [K_5 in Exclude<keyof I["keys"], keyof {
            key?: {
                id?: number;
                spaceId?: number;
                keychainId?: number;
                type?: import("./key").KeyType;
                publicKey?: Uint8Array;
                intentId?: number;
            };
            addresses?: {
                address?: string;
                type?: AddressType;
            }[];
        }[]>]: never; };
    } & { [K_6 in Exclude<keyof I, keyof QueryKeysResponse>]: never; }>(base?: I): QueryKeysResponse;
    fromPartial<I_1 extends {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
        keys?: {
            key?: {
                id?: number;
                spaceId?: number;
                keychainId?: number;
                type?: import("./key").KeyType;
                publicKey?: Uint8Array;
                intentId?: number;
            };
            addresses?: {
                address?: string;
                type?: AddressType;
            }[];
        }[];
    } & {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_7 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
        keys?: {
            key?: {
                id?: number;
                spaceId?: number;
                keychainId?: number;
                type?: import("./key").KeyType;
                publicKey?: Uint8Array;
                intentId?: number;
            };
            addresses?: {
                address?: string;
                type?: AddressType;
            }[];
        }[] & ({
            key?: {
                id?: number;
                spaceId?: number;
                keychainId?: number;
                type?: import("./key").KeyType;
                publicKey?: Uint8Array;
                intentId?: number;
            };
            addresses?: {
                address?: string;
                type?: AddressType;
            }[];
        } & {
            key?: {
                id?: number;
                spaceId?: number;
                keychainId?: number;
                type?: import("./key").KeyType;
                publicKey?: Uint8Array;
                intentId?: number;
            } & {
                id?: number;
                spaceId?: number;
                keychainId?: number;
                type?: import("./key").KeyType;
                publicKey?: Uint8Array;
                intentId?: number;
            } & { [K_8 in Exclude<keyof I_1["keys"][number]["key"], keyof Key>]: never; };
            addresses?: {
                address?: string;
                type?: AddressType;
            }[] & ({
                address?: string;
                type?: AddressType;
            } & {
                address?: string;
                type?: AddressType;
            } & { [K_9 in Exclude<keyof I_1["keys"][number]["addresses"][number], keyof AddressResponse>]: never; })[] & { [K_10 in Exclude<keyof I_1["keys"][number]["addresses"], keyof {
                address?: string;
                type?: AddressType;
            }[]>]: never; };
        } & { [K_11 in Exclude<keyof I_1["keys"][number], keyof QueryKeyResponse>]: never; })[] & { [K_12 in Exclude<keyof I_1["keys"], keyof {
            key?: {
                id?: number;
                spaceId?: number;
                keychainId?: number;
                type?: import("./key").KeyType;
                publicKey?: Uint8Array;
                intentId?: number;
            };
            addresses?: {
                address?: string;
                type?: AddressType;
            }[];
        }[]>]: never; };
    } & { [K_13 in Exclude<keyof I_1, keyof QueryKeysResponse>]: never; }>(object: I_1): QueryKeysResponse;
};
export declare const QueryKeysBySpaceIdRequest: {
    encode(message: QueryKeysBySpaceIdRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryKeysBySpaceIdRequest;
    fromJSON(object: any): QueryKeysBySpaceIdRequest;
    toJSON(message: QueryKeysBySpaceIdRequest): unknown;
    create<I extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
        spaceId?: number;
        deriveAddresses?: AddressType[];
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
        spaceId?: number;
        deriveAddresses?: AddressType[] & AddressType[] & { [K_1 in Exclude<keyof I["deriveAddresses"], keyof AddressType[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof QueryKeysBySpaceIdRequest>]: never; }>(base?: I): QueryKeysBySpaceIdRequest;
    fromPartial<I_1 extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
        spaceId?: number;
        deriveAddresses?: AddressType[];
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
        } & { [K_3 in Exclude<keyof I_1["pagination"], keyof PageRequest>]: never; };
        spaceId?: number;
        deriveAddresses?: AddressType[] & AddressType[] & { [K_4 in Exclude<keyof I_1["deriveAddresses"], keyof AddressType[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof QueryKeysBySpaceIdRequest>]: never; }>(object: I_1): QueryKeysBySpaceIdRequest;
};
export declare const QueryKeyByIdRequest: {
    encode(message: QueryKeyByIdRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryKeyByIdRequest;
    fromJSON(object: any): QueryKeyByIdRequest;
    toJSON(message: QueryKeyByIdRequest): unknown;
    create<I extends {
        id?: number;
        deriveAddresses?: AddressType[];
    } & {
        id?: number;
        deriveAddresses?: AddressType[] & AddressType[] & { [K in Exclude<keyof I["deriveAddresses"], keyof AddressType[]>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof QueryKeyByIdRequest>]: never; }>(base?: I): QueryKeyByIdRequest;
    fromPartial<I_1 extends {
        id?: number;
        deriveAddresses?: AddressType[];
    } & {
        id?: number;
        deriveAddresses?: AddressType[] & AddressType[] & { [K_2 in Exclude<keyof I_1["deriveAddresses"], keyof AddressType[]>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof QueryKeyByIdRequest>]: never; }>(object: I_1): QueryKeyByIdRequest;
};
export declare const QueryKeyResponse: {
    encode(message: QueryKeyResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryKeyResponse;
    fromJSON(object: any): QueryKeyResponse;
    toJSON(message: QueryKeyResponse): unknown;
    create<I extends {
        key?: {
            id?: number;
            spaceId?: number;
            keychainId?: number;
            type?: import("./key").KeyType;
            publicKey?: Uint8Array;
            intentId?: number;
        };
        addresses?: {
            address?: string;
            type?: AddressType;
        }[];
    } & {
        key?: {
            id?: number;
            spaceId?: number;
            keychainId?: number;
            type?: import("./key").KeyType;
            publicKey?: Uint8Array;
            intentId?: number;
        } & {
            id?: number;
            spaceId?: number;
            keychainId?: number;
            type?: import("./key").KeyType;
            publicKey?: Uint8Array;
            intentId?: number;
        } & { [K in Exclude<keyof I["key"], keyof Key>]: never; };
        addresses?: {
            address?: string;
            type?: AddressType;
        }[] & ({
            address?: string;
            type?: AddressType;
        } & {
            address?: string;
            type?: AddressType;
        } & { [K_1 in Exclude<keyof I["addresses"][number], keyof AddressResponse>]: never; })[] & { [K_2 in Exclude<keyof I["addresses"], keyof {
            address?: string;
            type?: AddressType;
        }[]>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof QueryKeyResponse>]: never; }>(base?: I): QueryKeyResponse;
    fromPartial<I_1 extends {
        key?: {
            id?: number;
            spaceId?: number;
            keychainId?: number;
            type?: import("./key").KeyType;
            publicKey?: Uint8Array;
            intentId?: number;
        };
        addresses?: {
            address?: string;
            type?: AddressType;
        }[];
    } & {
        key?: {
            id?: number;
            spaceId?: number;
            keychainId?: number;
            type?: import("./key").KeyType;
            publicKey?: Uint8Array;
            intentId?: number;
        } & {
            id?: number;
            spaceId?: number;
            keychainId?: number;
            type?: import("./key").KeyType;
            publicKey?: Uint8Array;
            intentId?: number;
        } & { [K_4 in Exclude<keyof I_1["key"], keyof Key>]: never; };
        addresses?: {
            address?: string;
            type?: AddressType;
        }[] & ({
            address?: string;
            type?: AddressType;
        } & {
            address?: string;
            type?: AddressType;
        } & { [K_5 in Exclude<keyof I_1["addresses"][number], keyof AddressResponse>]: never; })[] & { [K_6 in Exclude<keyof I_1["addresses"], keyof {
            address?: string;
            type?: AddressType;
        }[]>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof QueryKeyResponse>]: never; }>(object: I_1): QueryKeyResponse;
};
export declare const AddressResponse: {
    encode(message: AddressResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AddressResponse;
    fromJSON(object: any): AddressResponse;
    toJSON(message: AddressResponse): unknown;
    create<I extends {
        address?: string;
        type?: AddressType;
    } & {
        address?: string;
        type?: AddressType;
    } & { [K in Exclude<keyof I, keyof AddressResponse>]: never; }>(base?: I): AddressResponse;
    fromPartial<I_1 extends {
        address?: string;
        type?: AddressType;
    } & {
        address?: string;
        type?: AddressType;
    } & { [K_1 in Exclude<keyof I_1, keyof AddressResponse>]: never; }>(object: I_1): AddressResponse;
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
        keychainId?: number;
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
        keychainId?: number;
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
        keychainId?: number;
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
        keychainId?: number;
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
            signedData?: Uint8Array;
            rejectReason?: string;
        }[] & ({
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: SignRequestStatus;
            signedData?: Uint8Array;
            rejectReason?: string;
        } & {
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: SignRequestStatus;
            signedData?: Uint8Array;
            rejectReason?: string;
        } & { [K_1 in Exclude<keyof I["signRequests"][number], keyof SignRequest>]: never; })[] & { [K_2 in Exclude<keyof I["signRequests"], keyof {
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: SignRequestStatus;
            signedData?: Uint8Array;
            rejectReason?: string;
        }[]>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof QuerySignatureRequestsResponse>]: never; }>(base?: I): QuerySignatureRequestsResponse;
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
        } & { [K_4 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
        signRequests?: {
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: SignRequestStatus;
            signedData?: Uint8Array;
            rejectReason?: string;
        }[] & ({
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: SignRequestStatus;
            signedData?: Uint8Array;
            rejectReason?: string;
        } & {
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: SignRequestStatus;
            signedData?: Uint8Array;
            rejectReason?: string;
        } & { [K_5 in Exclude<keyof I_1["signRequests"][number], keyof SignRequest>]: never; })[] & { [K_6 in Exclude<keyof I_1["signRequests"], keyof {
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: SignRequestStatus;
            signedData?: Uint8Array;
            rejectReason?: string;
        }[]>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof QuerySignatureRequestsResponse>]: never; }>(object: I_1): QuerySignatureRequestsResponse;
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
            signedData?: Uint8Array;
            rejectReason?: string;
        } & {
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: SignRequestStatus;
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
            signedData?: Uint8Array;
            rejectReason?: string;
        } & {
            id?: number;
            creator?: string;
            keyId?: number;
            dataForSigning?: Uint8Array;
            status?: SignRequestStatus;
            signedData?: Uint8Array;
            rejectReason?: string;
        } & { [K_2 in Exclude<keyof I_1["signRequest"], keyof SignRequest>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "signRequest">]: never; }>(object: I_1): QuerySignatureRequestByIdResponse;
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
    /** Queries a space by its id. */
    SpaceById(request: QuerySpaceByIdRequest): Promise<QuerySpaceByIdResponse>;
    /** Queries a keychain by its id. */
    KeychainById(request: QueryKeychainByIdRequest): Promise<QueryKeychainByIdResponse>;
    /** Queries a list of KeyRequests items. */
    KeyRequests(request: QueryKeyRequestsRequest): Promise<QueryKeyRequestsResponse>;
    /** Queries a single KeyRequest by its id. */
    KeyRequestById(request: QueryKeyRequestByIdRequest): Promise<QueryKeyRequestByIdResponse>;
    /** Queries a list of Keys items. */
    AllKeys(request: QueryAllKeysRequest): Promise<QueryKeysResponse>;
    /** Queries a list of Keys items by their Space ID. */
    KeysBySpaceId(request: QueryKeysBySpaceIdRequest): Promise<QueryKeysResponse>;
    /** Queries a Key by its ID. */
    KeyById(request: QueryKeyByIdRequest): Promise<QueryKeyResponse>;
    /** Queries a list of SignatureRequests items. */
    SignatureRequests(request: QuerySignatureRequestsRequest): Promise<QuerySignatureRequestsResponse>;
    /** Queries a single SignatureRequest by its id. */
    SignatureRequestById(request: QuerySignatureRequestByIdRequest): Promise<QuerySignatureRequestByIdResponse>;
}
export declare const QueryServiceName = "warden.warden.v1beta2.Query";
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
    SpaceById(request: QuerySpaceByIdRequest): Promise<QuerySpaceByIdResponse>;
    KeychainById(request: QueryKeychainByIdRequest): Promise<QueryKeychainByIdResponse>;
    KeyRequests(request: QueryKeyRequestsRequest): Promise<QueryKeyRequestsResponse>;
    KeyRequestById(request: QueryKeyRequestByIdRequest): Promise<QueryKeyRequestByIdResponse>;
    AllKeys(request: QueryAllKeysRequest): Promise<QueryKeysResponse>;
    KeysBySpaceId(request: QueryKeysBySpaceIdRequest): Promise<QueryKeysResponse>;
    KeyById(request: QueryKeyByIdRequest): Promise<QueryKeyResponse>;
    SignatureRequests(request: QuerySignatureRequestsRequest): Promise<QuerySignatureRequestsResponse>;
    SignatureRequestById(request: QuerySignatureRequestByIdRequest): Promise<QuerySignatureRequestByIdResponse>;
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
