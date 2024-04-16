import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../cosmos/base/query/v1beta1/pagination";
import { AccessConfig, ContractCodeHistoryEntry, ContractInfo, Model, Params } from "./types";
export declare const protobufPackage = "cosmwasm.wasm.v1";
/**
 * QueryContractInfoRequest is the request type for the Query/ContractInfo RPC
 * method
 */
export interface QueryContractInfoRequest {
    /** address is the address of the contract to query */
    address: string;
}
/**
 * QueryContractInfoResponse is the response type for the Query/ContractInfo RPC
 * method
 */
export interface QueryContractInfoResponse {
    /** address is the address of the contract */
    address: string;
    contractInfo: ContractInfo | undefined;
}
/**
 * QueryContractHistoryRequest is the request type for the Query/ContractHistory
 * RPC method
 */
export interface QueryContractHistoryRequest {
    /** address is the address of the contract to query */
    address: string;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/**
 * QueryContractHistoryResponse is the response type for the
 * Query/ContractHistory RPC method
 */
export interface QueryContractHistoryResponse {
    entries: ContractCodeHistoryEntry[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/**
 * QueryContractsByCodeRequest is the request type for the Query/ContractsByCode
 * RPC method
 */
export interface QueryContractsByCodeRequest {
    /** grpc-gateway_out does not support Go style CodID */
    codeId: number;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/**
 * QueryContractsByCodeResponse is the response type for the
 * Query/ContractsByCode RPC method
 */
export interface QueryContractsByCodeResponse {
    /** contracts are a set of contract addresses */
    contracts: string[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/**
 * QueryAllContractStateRequest is the request type for the
 * Query/AllContractState RPC method
 */
export interface QueryAllContractStateRequest {
    /** address is the address of the contract */
    address: string;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/**
 * QueryAllContractStateResponse is the response type for the
 * Query/AllContractState RPC method
 */
export interface QueryAllContractStateResponse {
    models: Model[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/**
 * QueryRawContractStateRequest is the request type for the
 * Query/RawContractState RPC method
 */
export interface QueryRawContractStateRequest {
    /** address is the address of the contract */
    address: string;
    queryData: Uint8Array;
}
/**
 * QueryRawContractStateResponse is the response type for the
 * Query/RawContractState RPC method
 */
export interface QueryRawContractStateResponse {
    /** Data contains the raw store data */
    data: Uint8Array;
}
/**
 * QuerySmartContractStateRequest is the request type for the
 * Query/SmartContractState RPC method
 */
export interface QuerySmartContractStateRequest {
    /** address is the address of the contract */
    address: string;
    /** QueryData contains the query data passed to the contract */
    queryData: Uint8Array;
}
/**
 * QuerySmartContractStateResponse is the response type for the
 * Query/SmartContractState RPC method
 */
export interface QuerySmartContractStateResponse {
    /** Data contains the json data returned from the smart contract */
    data: Uint8Array;
}
/** QueryCodeRequest is the request type for the Query/Code RPC method */
export interface QueryCodeRequest {
    /** grpc-gateway_out does not support Go style CodID */
    codeId: number;
}
/** CodeInfoResponse contains code meta data from CodeInfo */
export interface CodeInfoResponse {
    /** id for legacy support */
    codeId: number;
    creator: string;
    dataHash: Uint8Array;
    instantiatePermission: AccessConfig | undefined;
}
/** QueryCodeResponse is the response type for the Query/Code RPC method */
export interface QueryCodeResponse {
    codeInfo: CodeInfoResponse | undefined;
    data: Uint8Array;
}
/** QueryCodesRequest is the request type for the Query/Codes RPC method */
export interface QueryCodesRequest {
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/** QueryCodesResponse is the response type for the Query/Codes RPC method */
export interface QueryCodesResponse {
    codeInfos: CodeInfoResponse[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/**
 * QueryPinnedCodesRequest is the request type for the Query/PinnedCodes
 * RPC method
 */
export interface QueryPinnedCodesRequest {
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/**
 * QueryPinnedCodesResponse is the response type for the
 * Query/PinnedCodes RPC method
 */
export interface QueryPinnedCodesResponse {
    codeIds: number[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
    /** params defines the parameters of the module. */
    params: Params | undefined;
}
/**
 * QueryContractsByCreatorRequest is the request type for the
 * Query/ContractsByCreator RPC method.
 */
export interface QueryContractsByCreatorRequest {
    /** CreatorAddress is the address of contract creator */
    creatorAddress: string;
    /** Pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/**
 * QueryContractsByCreatorResponse is the response type for the
 * Query/ContractsByCreator RPC method.
 */
export interface QueryContractsByCreatorResponse {
    /** ContractAddresses result set */
    contractAddresses: string[];
    /** Pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
export declare const QueryContractInfoRequest: {
    encode(message: QueryContractInfoRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryContractInfoRequest;
    fromJSON(object: any): QueryContractInfoRequest;
    toJSON(message: QueryContractInfoRequest): unknown;
    create<I extends {
        address?: string;
    } & {
        address?: string;
    } & { [K in Exclude<keyof I, "address">]: never; }>(base?: I): QueryContractInfoRequest;
    fromPartial<I_1 extends {
        address?: string;
    } & {
        address?: string;
    } & { [K_1 in Exclude<keyof I_1, "address">]: never; }>(object: I_1): QueryContractInfoRequest;
};
export declare const QueryContractInfoResponse: {
    encode(message: QueryContractInfoResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryContractInfoResponse;
    fromJSON(object: any): QueryContractInfoResponse;
    toJSON(message: QueryContractInfoResponse): unknown;
    create<I extends {
        address?: string;
        contractInfo?: {
            codeId?: number;
            creator?: string;
            admin?: string;
            label?: string;
            created?: {
                blockHeight?: number;
                txIndex?: number;
            };
            ibcPortId?: string;
            extension?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        };
    } & {
        address?: string;
        contractInfo?: {
            codeId?: number;
            creator?: string;
            admin?: string;
            label?: string;
            created?: {
                blockHeight?: number;
                txIndex?: number;
            };
            ibcPortId?: string;
            extension?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        } & {
            codeId?: number;
            creator?: string;
            admin?: string;
            label?: string;
            created?: {
                blockHeight?: number;
                txIndex?: number;
            } & {
                blockHeight?: number;
                txIndex?: number;
            } & { [K in Exclude<keyof I["contractInfo"]["created"], keyof import("./types").AbsoluteTxPosition>]: never; };
            ibcPortId?: string;
            extension?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_1 in Exclude<keyof I["contractInfo"]["extension"], keyof import("../../../google/protobuf/any").Any>]: never; };
        } & { [K_2 in Exclude<keyof I["contractInfo"], keyof ContractInfo>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof QueryContractInfoResponse>]: never; }>(base?: I): QueryContractInfoResponse;
    fromPartial<I_1 extends {
        address?: string;
        contractInfo?: {
            codeId?: number;
            creator?: string;
            admin?: string;
            label?: string;
            created?: {
                blockHeight?: number;
                txIndex?: number;
            };
            ibcPortId?: string;
            extension?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        };
    } & {
        address?: string;
        contractInfo?: {
            codeId?: number;
            creator?: string;
            admin?: string;
            label?: string;
            created?: {
                blockHeight?: number;
                txIndex?: number;
            };
            ibcPortId?: string;
            extension?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        } & {
            codeId?: number;
            creator?: string;
            admin?: string;
            label?: string;
            created?: {
                blockHeight?: number;
                txIndex?: number;
            } & {
                blockHeight?: number;
                txIndex?: number;
            } & { [K_4 in Exclude<keyof I_1["contractInfo"]["created"], keyof import("./types").AbsoluteTxPosition>]: never; };
            ibcPortId?: string;
            extension?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_5 in Exclude<keyof I_1["contractInfo"]["extension"], keyof import("../../../google/protobuf/any").Any>]: never; };
        } & { [K_6 in Exclude<keyof I_1["contractInfo"], keyof ContractInfo>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof QueryContractInfoResponse>]: never; }>(object: I_1): QueryContractInfoResponse;
};
export declare const QueryContractHistoryRequest: {
    encode(message: QueryContractHistoryRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryContractHistoryRequest;
    fromJSON(object: any): QueryContractHistoryRequest;
    toJSON(message: QueryContractHistoryRequest): unknown;
    create<I extends {
        address?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        address?: string;
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
    } & { [K_1 in Exclude<keyof I, keyof QueryContractHistoryRequest>]: never; }>(base?: I): QueryContractHistoryRequest;
    fromPartial<I_1 extends {
        address?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        address?: string;
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
    } & { [K_3 in Exclude<keyof I_1, keyof QueryContractHistoryRequest>]: never; }>(object: I_1): QueryContractHistoryRequest;
};
export declare const QueryContractHistoryResponse: {
    encode(message: QueryContractHistoryResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryContractHistoryResponse;
    fromJSON(object: any): QueryContractHistoryResponse;
    toJSON(message: QueryContractHistoryResponse): unknown;
    create<I extends {
        entries?: {
            operation?: import("./types").ContractCodeHistoryOperationType;
            codeId?: number;
            updated?: {
                blockHeight?: number;
                txIndex?: number;
            };
            msg?: Uint8Array;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        entries?: {
            operation?: import("./types").ContractCodeHistoryOperationType;
            codeId?: number;
            updated?: {
                blockHeight?: number;
                txIndex?: number;
            };
            msg?: Uint8Array;
        }[] & ({
            operation?: import("./types").ContractCodeHistoryOperationType;
            codeId?: number;
            updated?: {
                blockHeight?: number;
                txIndex?: number;
            };
            msg?: Uint8Array;
        } & {
            operation?: import("./types").ContractCodeHistoryOperationType;
            codeId?: number;
            updated?: {
                blockHeight?: number;
                txIndex?: number;
            } & {
                blockHeight?: number;
                txIndex?: number;
            } & { [K in Exclude<keyof I["entries"][number]["updated"], keyof import("./types").AbsoluteTxPosition>]: never; };
            msg?: Uint8Array;
        } & { [K_1 in Exclude<keyof I["entries"][number], keyof ContractCodeHistoryEntry>]: never; })[] & { [K_2 in Exclude<keyof I["entries"], keyof {
            operation?: import("./types").ContractCodeHistoryOperationType;
            codeId?: number;
            updated?: {
                blockHeight?: number;
                txIndex?: number;
            };
            msg?: Uint8Array;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_3 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_4 in Exclude<keyof I, keyof QueryContractHistoryResponse>]: never; }>(base?: I): QueryContractHistoryResponse;
    fromPartial<I_1 extends {
        entries?: {
            operation?: import("./types").ContractCodeHistoryOperationType;
            codeId?: number;
            updated?: {
                blockHeight?: number;
                txIndex?: number;
            };
            msg?: Uint8Array;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        entries?: {
            operation?: import("./types").ContractCodeHistoryOperationType;
            codeId?: number;
            updated?: {
                blockHeight?: number;
                txIndex?: number;
            };
            msg?: Uint8Array;
        }[] & ({
            operation?: import("./types").ContractCodeHistoryOperationType;
            codeId?: number;
            updated?: {
                blockHeight?: number;
                txIndex?: number;
            };
            msg?: Uint8Array;
        } & {
            operation?: import("./types").ContractCodeHistoryOperationType;
            codeId?: number;
            updated?: {
                blockHeight?: number;
                txIndex?: number;
            } & {
                blockHeight?: number;
                txIndex?: number;
            } & { [K_5 in Exclude<keyof I_1["entries"][number]["updated"], keyof import("./types").AbsoluteTxPosition>]: never; };
            msg?: Uint8Array;
        } & { [K_6 in Exclude<keyof I_1["entries"][number], keyof ContractCodeHistoryEntry>]: never; })[] & { [K_7 in Exclude<keyof I_1["entries"], keyof {
            operation?: import("./types").ContractCodeHistoryOperationType;
            codeId?: number;
            updated?: {
                blockHeight?: number;
                txIndex?: number;
            };
            msg?: Uint8Array;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_8 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_9 in Exclude<keyof I_1, keyof QueryContractHistoryResponse>]: never; }>(object: I_1): QueryContractHistoryResponse;
};
export declare const QueryContractsByCodeRequest: {
    encode(message: QueryContractsByCodeRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryContractsByCodeRequest;
    fromJSON(object: any): QueryContractsByCodeRequest;
    toJSON(message: QueryContractsByCodeRequest): unknown;
    create<I extends {
        codeId?: number;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        codeId?: number;
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
    } & { [K_1 in Exclude<keyof I, keyof QueryContractsByCodeRequest>]: never; }>(base?: I): QueryContractsByCodeRequest;
    fromPartial<I_1 extends {
        codeId?: number;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        codeId?: number;
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
    } & { [K_3 in Exclude<keyof I_1, keyof QueryContractsByCodeRequest>]: never; }>(object: I_1): QueryContractsByCodeRequest;
};
export declare const QueryContractsByCodeResponse: {
    encode(message: QueryContractsByCodeResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryContractsByCodeResponse;
    fromJSON(object: any): QueryContractsByCodeResponse;
    toJSON(message: QueryContractsByCodeResponse): unknown;
    create<I extends {
        contracts?: string[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        contracts?: string[] & string[] & { [K in Exclude<keyof I["contracts"], keyof string[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_1 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof QueryContractsByCodeResponse>]: never; }>(base?: I): QueryContractsByCodeResponse;
    fromPartial<I_1 extends {
        contracts?: string[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        contracts?: string[] & string[] & { [K_3 in Exclude<keyof I_1["contracts"], keyof string[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_4 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof QueryContractsByCodeResponse>]: never; }>(object: I_1): QueryContractsByCodeResponse;
};
export declare const QueryAllContractStateRequest: {
    encode(message: QueryAllContractStateRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllContractStateRequest;
    fromJSON(object: any): QueryAllContractStateRequest;
    toJSON(message: QueryAllContractStateRequest): unknown;
    create<I extends {
        address?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        address?: string;
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
    } & { [K_1 in Exclude<keyof I, keyof QueryAllContractStateRequest>]: never; }>(base?: I): QueryAllContractStateRequest;
    fromPartial<I_1 extends {
        address?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        address?: string;
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
    } & { [K_3 in Exclude<keyof I_1, keyof QueryAllContractStateRequest>]: never; }>(object: I_1): QueryAllContractStateRequest;
};
export declare const QueryAllContractStateResponse: {
    encode(message: QueryAllContractStateResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllContractStateResponse;
    fromJSON(object: any): QueryAllContractStateResponse;
    toJSON(message: QueryAllContractStateResponse): unknown;
    create<I extends {
        models?: {
            key?: Uint8Array;
            value?: Uint8Array;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        models?: {
            key?: Uint8Array;
            value?: Uint8Array;
        }[] & ({
            key?: Uint8Array;
            value?: Uint8Array;
        } & {
            key?: Uint8Array;
            value?: Uint8Array;
        } & { [K in Exclude<keyof I["models"][number], keyof Model>]: never; })[] & { [K_1 in Exclude<keyof I["models"], keyof {
            key?: Uint8Array;
            value?: Uint8Array;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_2 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof QueryAllContractStateResponse>]: never; }>(base?: I): QueryAllContractStateResponse;
    fromPartial<I_1 extends {
        models?: {
            key?: Uint8Array;
            value?: Uint8Array;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        models?: {
            key?: Uint8Array;
            value?: Uint8Array;
        }[] & ({
            key?: Uint8Array;
            value?: Uint8Array;
        } & {
            key?: Uint8Array;
            value?: Uint8Array;
        } & { [K_4 in Exclude<keyof I_1["models"][number], keyof Model>]: never; })[] & { [K_5 in Exclude<keyof I_1["models"], keyof {
            key?: Uint8Array;
            value?: Uint8Array;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_6 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof QueryAllContractStateResponse>]: never; }>(object: I_1): QueryAllContractStateResponse;
};
export declare const QueryRawContractStateRequest: {
    encode(message: QueryRawContractStateRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryRawContractStateRequest;
    fromJSON(object: any): QueryRawContractStateRequest;
    toJSON(message: QueryRawContractStateRequest): unknown;
    create<I extends {
        address?: string;
        queryData?: Uint8Array;
    } & {
        address?: string;
        queryData?: Uint8Array;
    } & { [K in Exclude<keyof I, keyof QueryRawContractStateRequest>]: never; }>(base?: I): QueryRawContractStateRequest;
    fromPartial<I_1 extends {
        address?: string;
        queryData?: Uint8Array;
    } & {
        address?: string;
        queryData?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, keyof QueryRawContractStateRequest>]: never; }>(object: I_1): QueryRawContractStateRequest;
};
export declare const QueryRawContractStateResponse: {
    encode(message: QueryRawContractStateResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryRawContractStateResponse;
    fromJSON(object: any): QueryRawContractStateResponse;
    toJSON(message: QueryRawContractStateResponse): unknown;
    create<I extends {
        data?: Uint8Array;
    } & {
        data?: Uint8Array;
    } & { [K in Exclude<keyof I, "data">]: never; }>(base?: I): QueryRawContractStateResponse;
    fromPartial<I_1 extends {
        data?: Uint8Array;
    } & {
        data?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, "data">]: never; }>(object: I_1): QueryRawContractStateResponse;
};
export declare const QuerySmartContractStateRequest: {
    encode(message: QuerySmartContractStateRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySmartContractStateRequest;
    fromJSON(object: any): QuerySmartContractStateRequest;
    toJSON(message: QuerySmartContractStateRequest): unknown;
    create<I extends {
        address?: string;
        queryData?: Uint8Array;
    } & {
        address?: string;
        queryData?: Uint8Array;
    } & { [K in Exclude<keyof I, keyof QuerySmartContractStateRequest>]: never; }>(base?: I): QuerySmartContractStateRequest;
    fromPartial<I_1 extends {
        address?: string;
        queryData?: Uint8Array;
    } & {
        address?: string;
        queryData?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, keyof QuerySmartContractStateRequest>]: never; }>(object: I_1): QuerySmartContractStateRequest;
};
export declare const QuerySmartContractStateResponse: {
    encode(message: QuerySmartContractStateResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySmartContractStateResponse;
    fromJSON(object: any): QuerySmartContractStateResponse;
    toJSON(message: QuerySmartContractStateResponse): unknown;
    create<I extends {
        data?: Uint8Array;
    } & {
        data?: Uint8Array;
    } & { [K in Exclude<keyof I, "data">]: never; }>(base?: I): QuerySmartContractStateResponse;
    fromPartial<I_1 extends {
        data?: Uint8Array;
    } & {
        data?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, "data">]: never; }>(object: I_1): QuerySmartContractStateResponse;
};
export declare const QueryCodeRequest: {
    encode(message: QueryCodeRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryCodeRequest;
    fromJSON(object: any): QueryCodeRequest;
    toJSON(message: QueryCodeRequest): unknown;
    create<I extends {
        codeId?: number;
    } & {
        codeId?: number;
    } & { [K in Exclude<keyof I, "codeId">]: never; }>(base?: I): QueryCodeRequest;
    fromPartial<I_1 extends {
        codeId?: number;
    } & {
        codeId?: number;
    } & { [K_1 in Exclude<keyof I_1, "codeId">]: never; }>(object: I_1): QueryCodeRequest;
};
export declare const CodeInfoResponse: {
    encode(message: CodeInfoResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): CodeInfoResponse;
    fromJSON(object: any): CodeInfoResponse;
    toJSON(message: CodeInfoResponse): unknown;
    create<I extends {
        codeId?: number;
        creator?: string;
        dataHash?: Uint8Array;
        instantiatePermission?: {
            permission?: import("./types").AccessType;
            addresses?: string[];
        };
    } & {
        codeId?: number;
        creator?: string;
        dataHash?: Uint8Array;
        instantiatePermission?: {
            permission?: import("./types").AccessType;
            addresses?: string[];
        } & {
            permission?: import("./types").AccessType;
            addresses?: string[] & string[] & { [K in Exclude<keyof I["instantiatePermission"]["addresses"], keyof string[]>]: never; };
        } & { [K_1 in Exclude<keyof I["instantiatePermission"], keyof AccessConfig>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof CodeInfoResponse>]: never; }>(base?: I): CodeInfoResponse;
    fromPartial<I_1 extends {
        codeId?: number;
        creator?: string;
        dataHash?: Uint8Array;
        instantiatePermission?: {
            permission?: import("./types").AccessType;
            addresses?: string[];
        };
    } & {
        codeId?: number;
        creator?: string;
        dataHash?: Uint8Array;
        instantiatePermission?: {
            permission?: import("./types").AccessType;
            addresses?: string[];
        } & {
            permission?: import("./types").AccessType;
            addresses?: string[] & string[] & { [K_3 in Exclude<keyof I_1["instantiatePermission"]["addresses"], keyof string[]>]: never; };
        } & { [K_4 in Exclude<keyof I_1["instantiatePermission"], keyof AccessConfig>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof CodeInfoResponse>]: never; }>(object: I_1): CodeInfoResponse;
};
export declare const QueryCodeResponse: {
    encode(message: QueryCodeResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryCodeResponse;
    fromJSON(object: any): QueryCodeResponse;
    toJSON(message: QueryCodeResponse): unknown;
    create<I extends {
        codeInfo?: {
            codeId?: number;
            creator?: string;
            dataHash?: Uint8Array;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
        };
        data?: Uint8Array;
    } & {
        codeInfo?: {
            codeId?: number;
            creator?: string;
            dataHash?: Uint8Array;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
        } & {
            codeId?: number;
            creator?: string;
            dataHash?: Uint8Array;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            } & {
                permission?: import("./types").AccessType;
                addresses?: string[] & string[] & { [K in Exclude<keyof I["codeInfo"]["instantiatePermission"]["addresses"], keyof string[]>]: never; };
            } & { [K_1 in Exclude<keyof I["codeInfo"]["instantiatePermission"], keyof AccessConfig>]: never; };
        } & { [K_2 in Exclude<keyof I["codeInfo"], keyof CodeInfoResponse>]: never; };
        data?: Uint8Array;
    } & { [K_3 in Exclude<keyof I, keyof QueryCodeResponse>]: never; }>(base?: I): QueryCodeResponse;
    fromPartial<I_1 extends {
        codeInfo?: {
            codeId?: number;
            creator?: string;
            dataHash?: Uint8Array;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
        };
        data?: Uint8Array;
    } & {
        codeInfo?: {
            codeId?: number;
            creator?: string;
            dataHash?: Uint8Array;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
        } & {
            codeId?: number;
            creator?: string;
            dataHash?: Uint8Array;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            } & {
                permission?: import("./types").AccessType;
                addresses?: string[] & string[] & { [K_4 in Exclude<keyof I_1["codeInfo"]["instantiatePermission"]["addresses"], keyof string[]>]: never; };
            } & { [K_5 in Exclude<keyof I_1["codeInfo"]["instantiatePermission"], keyof AccessConfig>]: never; };
        } & { [K_6 in Exclude<keyof I_1["codeInfo"], keyof CodeInfoResponse>]: never; };
        data?: Uint8Array;
    } & { [K_7 in Exclude<keyof I_1, keyof QueryCodeResponse>]: never; }>(object: I_1): QueryCodeResponse;
};
export declare const QueryCodesRequest: {
    encode(message: QueryCodesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryCodesRequest;
    fromJSON(object: any): QueryCodesRequest;
    toJSON(message: QueryCodesRequest): unknown;
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
    } & { [K_1 in Exclude<keyof I, "pagination">]: never; }>(base?: I): QueryCodesRequest;
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
    } & { [K_3 in Exclude<keyof I_1, "pagination">]: never; }>(object: I_1): QueryCodesRequest;
};
export declare const QueryCodesResponse: {
    encode(message: QueryCodesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryCodesResponse;
    fromJSON(object: any): QueryCodesResponse;
    toJSON(message: QueryCodesResponse): unknown;
    create<I extends {
        codeInfos?: {
            codeId?: number;
            creator?: string;
            dataHash?: Uint8Array;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        codeInfos?: {
            codeId?: number;
            creator?: string;
            dataHash?: Uint8Array;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
        }[] & ({
            codeId?: number;
            creator?: string;
            dataHash?: Uint8Array;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
        } & {
            codeId?: number;
            creator?: string;
            dataHash?: Uint8Array;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            } & {
                permission?: import("./types").AccessType;
                addresses?: string[] & string[] & { [K in Exclude<keyof I["codeInfos"][number]["instantiatePermission"]["addresses"], keyof string[]>]: never; };
            } & { [K_1 in Exclude<keyof I["codeInfos"][number]["instantiatePermission"], keyof AccessConfig>]: never; };
        } & { [K_2 in Exclude<keyof I["codeInfos"][number], keyof CodeInfoResponse>]: never; })[] & { [K_3 in Exclude<keyof I["codeInfos"], keyof {
            codeId?: number;
            creator?: string;
            dataHash?: Uint8Array;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_4 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_5 in Exclude<keyof I, keyof QueryCodesResponse>]: never; }>(base?: I): QueryCodesResponse;
    fromPartial<I_1 extends {
        codeInfos?: {
            codeId?: number;
            creator?: string;
            dataHash?: Uint8Array;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        codeInfos?: {
            codeId?: number;
            creator?: string;
            dataHash?: Uint8Array;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
        }[] & ({
            codeId?: number;
            creator?: string;
            dataHash?: Uint8Array;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
        } & {
            codeId?: number;
            creator?: string;
            dataHash?: Uint8Array;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            } & {
                permission?: import("./types").AccessType;
                addresses?: string[] & string[] & { [K_6 in Exclude<keyof I_1["codeInfos"][number]["instantiatePermission"]["addresses"], keyof string[]>]: never; };
            } & { [K_7 in Exclude<keyof I_1["codeInfos"][number]["instantiatePermission"], keyof AccessConfig>]: never; };
        } & { [K_8 in Exclude<keyof I_1["codeInfos"][number], keyof CodeInfoResponse>]: never; })[] & { [K_9 in Exclude<keyof I_1["codeInfos"], keyof {
            codeId?: number;
            creator?: string;
            dataHash?: Uint8Array;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_10 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_11 in Exclude<keyof I_1, keyof QueryCodesResponse>]: never; }>(object: I_1): QueryCodesResponse;
};
export declare const QueryPinnedCodesRequest: {
    encode(message: QueryPinnedCodesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryPinnedCodesRequest;
    fromJSON(object: any): QueryPinnedCodesRequest;
    toJSON(message: QueryPinnedCodesRequest): unknown;
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
    } & { [K_1 in Exclude<keyof I, "pagination">]: never; }>(base?: I): QueryPinnedCodesRequest;
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
    } & { [K_3 in Exclude<keyof I_1, "pagination">]: never; }>(object: I_1): QueryPinnedCodesRequest;
};
export declare const QueryPinnedCodesResponse: {
    encode(message: QueryPinnedCodesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryPinnedCodesResponse;
    fromJSON(object: any): QueryPinnedCodesResponse;
    toJSON(message: QueryPinnedCodesResponse): unknown;
    create<I extends {
        codeIds?: number[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        codeIds?: number[] & number[] & { [K in Exclude<keyof I["codeIds"], keyof number[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_1 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof QueryPinnedCodesResponse>]: never; }>(base?: I): QueryPinnedCodesResponse;
    fromPartial<I_1 extends {
        codeIds?: number[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        codeIds?: number[] & number[] & { [K_3 in Exclude<keyof I_1["codeIds"], keyof number[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_4 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof QueryPinnedCodesResponse>]: never; }>(object: I_1): QueryPinnedCodesResponse;
};
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
        params?: {
            codeUploadAccess?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
            instantiateDefaultPermission?: import("./types").AccessType;
        };
    } & {
        params?: {
            codeUploadAccess?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
            instantiateDefaultPermission?: import("./types").AccessType;
        } & {
            codeUploadAccess?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            } & {
                permission?: import("./types").AccessType;
                addresses?: string[] & string[] & { [K in Exclude<keyof I["params"]["codeUploadAccess"]["addresses"], keyof string[]>]: never; };
            } & { [K_1 in Exclude<keyof I["params"]["codeUploadAccess"], keyof AccessConfig>]: never; };
            instantiateDefaultPermission?: import("./types").AccessType;
        } & { [K_2 in Exclude<keyof I["params"], keyof Params>]: never; };
    } & { [K_3 in Exclude<keyof I, "params">]: never; }>(base?: I): QueryParamsResponse;
    fromPartial<I_1 extends {
        params?: {
            codeUploadAccess?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
            instantiateDefaultPermission?: import("./types").AccessType;
        };
    } & {
        params?: {
            codeUploadAccess?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
            instantiateDefaultPermission?: import("./types").AccessType;
        } & {
            codeUploadAccess?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            } & {
                permission?: import("./types").AccessType;
                addresses?: string[] & string[] & { [K_4 in Exclude<keyof I_1["params"]["codeUploadAccess"]["addresses"], keyof string[]>]: never; };
            } & { [K_5 in Exclude<keyof I_1["params"]["codeUploadAccess"], keyof AccessConfig>]: never; };
            instantiateDefaultPermission?: import("./types").AccessType;
        } & { [K_6 in Exclude<keyof I_1["params"], keyof Params>]: never; };
    } & { [K_7 in Exclude<keyof I_1, "params">]: never; }>(object: I_1): QueryParamsResponse;
};
export declare const QueryContractsByCreatorRequest: {
    encode(message: QueryContractsByCreatorRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryContractsByCreatorRequest;
    fromJSON(object: any): QueryContractsByCreatorRequest;
    toJSON(message: QueryContractsByCreatorRequest): unknown;
    create<I extends {
        creatorAddress?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        creatorAddress?: string;
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
    } & { [K_1 in Exclude<keyof I, keyof QueryContractsByCreatorRequest>]: never; }>(base?: I): QueryContractsByCreatorRequest;
    fromPartial<I_1 extends {
        creatorAddress?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        creatorAddress?: string;
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
    } & { [K_3 in Exclude<keyof I_1, keyof QueryContractsByCreatorRequest>]: never; }>(object: I_1): QueryContractsByCreatorRequest;
};
export declare const QueryContractsByCreatorResponse: {
    encode(message: QueryContractsByCreatorResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryContractsByCreatorResponse;
    fromJSON(object: any): QueryContractsByCreatorResponse;
    toJSON(message: QueryContractsByCreatorResponse): unknown;
    create<I extends {
        contractAddresses?: string[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        contractAddresses?: string[] & string[] & { [K in Exclude<keyof I["contractAddresses"], keyof string[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_1 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof QueryContractsByCreatorResponse>]: never; }>(base?: I): QueryContractsByCreatorResponse;
    fromPartial<I_1 extends {
        contractAddresses?: string[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        contractAddresses?: string[] & string[] & { [K_3 in Exclude<keyof I_1["contractAddresses"], keyof string[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_4 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof QueryContractsByCreatorResponse>]: never; }>(object: I_1): QueryContractsByCreatorResponse;
};
/** Query provides defines the gRPC querier service */
export interface Query {
    /** ContractInfo gets the contract meta data */
    ContractInfo(request: QueryContractInfoRequest): Promise<QueryContractInfoResponse>;
    /** ContractHistory gets the contract code history */
    ContractHistory(request: QueryContractHistoryRequest): Promise<QueryContractHistoryResponse>;
    /** ContractsByCode lists all smart contracts for a code id */
    ContractsByCode(request: QueryContractsByCodeRequest): Promise<QueryContractsByCodeResponse>;
    /** AllContractState gets all raw store data for a single contract */
    AllContractState(request: QueryAllContractStateRequest): Promise<QueryAllContractStateResponse>;
    /** RawContractState gets single key from the raw store data of a contract */
    RawContractState(request: QueryRawContractStateRequest): Promise<QueryRawContractStateResponse>;
    /** SmartContractState get smart query result from the contract */
    SmartContractState(request: QuerySmartContractStateRequest): Promise<QuerySmartContractStateResponse>;
    /** Code gets the binary code and metadata for a singe wasm code */
    Code(request: QueryCodeRequest): Promise<QueryCodeResponse>;
    /** Codes gets the metadata for all stored wasm codes */
    Codes(request: QueryCodesRequest): Promise<QueryCodesResponse>;
    /** PinnedCodes gets the pinned code ids */
    PinnedCodes(request: QueryPinnedCodesRequest): Promise<QueryPinnedCodesResponse>;
    /** Params gets the module params */
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    /** ContractsByCreator gets the contracts by creator */
    ContractsByCreator(request: QueryContractsByCreatorRequest): Promise<QueryContractsByCreatorResponse>;
}
export declare const QueryServiceName = "cosmwasm.wasm.v1.Query";
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    ContractInfo(request: QueryContractInfoRequest): Promise<QueryContractInfoResponse>;
    ContractHistory(request: QueryContractHistoryRequest): Promise<QueryContractHistoryResponse>;
    ContractsByCode(request: QueryContractsByCodeRequest): Promise<QueryContractsByCodeResponse>;
    AllContractState(request: QueryAllContractStateRequest): Promise<QueryAllContractStateResponse>;
    RawContractState(request: QueryRawContractStateRequest): Promise<QueryRawContractStateResponse>;
    SmartContractState(request: QuerySmartContractStateRequest): Promise<QuerySmartContractStateResponse>;
    Code(request: QueryCodeRequest): Promise<QueryCodeResponse>;
    Codes(request: QueryCodesRequest): Promise<QueryCodesResponse>;
    PinnedCodes(request: QueryPinnedCodesRequest): Promise<QueryPinnedCodesResponse>;
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    ContractsByCreator(request: QueryContractsByCreatorRequest): Promise<QueryContractsByCreatorResponse>;
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
