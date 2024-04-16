export interface Any {
    "@type"?: string;
}
export interface Status {
    /** @format int32 */
    code?: number;
    message?: string;
    details?: {
        "@type"?: string;
    }[];
}
export interface AbsoluteTxPosition {
    /** @format uint64 */
    block_height?: string;
    /** @format uint64 */
    tx_index?: string;
}
export interface AccessConfig {
    permission?: "ACCESS_TYPE_UNSPECIFIED" | "ACCESS_TYPE_NOBODY" | "ACCESS_TYPE_EVERYBODY" | "ACCESS_TYPE_ANY_OF_ADDRESSES";
    addresses?: string[];
}
export declare enum AccessType {
    ACCESS_TYPE_UNSPECIFIED = "ACCESS_TYPE_UNSPECIFIED",
    ACCESS_TYPE_NOBODY = "ACCESS_TYPE_NOBODY",
    ACCESS_TYPE_EVERYBODY = "ACCESS_TYPE_EVERYBODY",
    ACCESS_TYPE_ANY_OF_ADDRESSES = "ACCESS_TYPE_ANY_OF_ADDRESSES"
}
export interface CodeInfoResponse {
    /** @format uint64 */
    code_id?: string;
    creator?: string;
    /** @format byte */
    data_hash?: string;
    instantiate_permission?: {
        permission?: "ACCESS_TYPE_UNSPECIFIED" | "ACCESS_TYPE_NOBODY" | "ACCESS_TYPE_EVERYBODY" | "ACCESS_TYPE_ANY_OF_ADDRESSES";
        addresses?: string[];
    };
}
export interface ContractCodeHistoryEntry {
    operation?: "CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED" | "CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT" | "CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE" | "CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS";
    /** @format uint64 */
    code_id?: string;
    updated?: {
        block_height?: string;
        tx_index?: string;
    };
    /** @format byte */
    msg?: string;
}
export declare enum ContractCodeHistoryOperationType {
    CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED = "CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED",
    CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT = "CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT",
    CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE = "CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE",
    CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS = "CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS"
}
export interface Model {
    /** @format byte */
    key?: string;
    /** @format byte */
    value?: string;
}
export interface PageRequest {
    /** @format byte */
    key?: string;
    /** @format uint64 */
    offset?: string;
    /** @format uint64 */
    limit?: string;
    count_total?: boolean;
    reverse?: boolean;
}
export interface PageResponse {
    /** @format byte */
    next_key?: string;
    /** @format uint64 */
    total?: string;
}
export interface QueryAllContractStateResponse {
    models?: {
        key?: string;
        value?: string;
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface QueryCodeResponse {
    code_info?: {
        code_id?: string;
        creator?: string;
        data_hash?: string;
        instantiate_permission?: {
            permission?: "ACCESS_TYPE_UNSPECIFIED" | "ACCESS_TYPE_NOBODY" | "ACCESS_TYPE_EVERYBODY" | "ACCESS_TYPE_ANY_OF_ADDRESSES";
            addresses?: string[];
        };
    };
    /** @format byte */
    data?: string;
}
export interface QueryCodesResponse {
    code_infos?: {
        code_id?: string;
        creator?: string;
        data_hash?: string;
        instantiate_permission?: {
            permission?: "ACCESS_TYPE_UNSPECIFIED" | "ACCESS_TYPE_NOBODY" | "ACCESS_TYPE_EVERYBODY" | "ACCESS_TYPE_ANY_OF_ADDRESSES";
            addresses?: string[];
        };
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface QueryContractHistoryResponse {
    entries?: {
        operation?: "CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED" | "CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT" | "CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE" | "CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS";
        code_id?: string;
        updated?: {
            block_height?: string;
            tx_index?: string;
        };
        msg?: string;
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface QueryContractInfoResponse {
    address?: string;
    contract_info?: {
        code_id?: string;
        creator?: string;
        admin?: string;
        label?: string;
        created?: {
            block_height?: string;
            tx_index?: string;
        };
        ibc_port_id?: string;
        extension?: {
            "@type"?: string;
        };
    };
}
export interface QueryContractsByCodeResponse {
    contracts?: string[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface QueryContractsByCreatorResponse {
    contract_addresses?: string[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface QueryParamsResponse {
    params?: {
        code_upload_access?: {
            permission?: "ACCESS_TYPE_UNSPECIFIED" | "ACCESS_TYPE_NOBODY" | "ACCESS_TYPE_EVERYBODY" | "ACCESS_TYPE_ANY_OF_ADDRESSES";
            addresses?: string[];
        };
        instantiate_default_permission?: "ACCESS_TYPE_UNSPECIFIED" | "ACCESS_TYPE_NOBODY" | "ACCESS_TYPE_EVERYBODY" | "ACCESS_TYPE_ANY_OF_ADDRESSES";
    };
}
export interface QueryPinnedCodesResponse {
    code_ids?: string[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface QueryRawContractStateResponse {
    /** @format byte */
    data?: string;
}
export interface QuerySmartContractStateResponse {
    /** @format byte */
    data?: string;
}
export interface V1ContractInfo {
    /** @format uint64 */
    code_id?: string;
    creator?: string;
    admin?: string;
    label?: string;
    created?: {
        block_height?: string;
        tx_index?: string;
    };
    ibc_port_id?: string;
    extension?: {
        "@type"?: string;
    };
}
export interface V1Params {
    code_upload_access?: {
        permission?: "ACCESS_TYPE_UNSPECIFIED" | "ACCESS_TYPE_NOBODY" | "ACCESS_TYPE_EVERYBODY" | "ACCESS_TYPE_ANY_OF_ADDRESSES";
        addresses?: string[];
    };
    instantiate_default_permission?: "ACCESS_TYPE_UNSPECIFIED" | "ACCESS_TYPE_NOBODY" | "ACCESS_TYPE_EVERYBODY" | "ACCESS_TYPE_ANY_OF_ADDRESSES";
}
export interface Coin {
    denom?: string;
    amount?: string;
}
export type MsgAddCodeUploadParamsAddressesResponse = object;
export type MsgClearAdminResponse = object;
export interface MsgExecuteContractResponse {
    /** @format byte */
    data?: string;
}
export interface MsgInstantiateContract2Response {
    address?: string;
    /** @format byte */
    data?: string;
}
export interface MsgInstantiateContractResponse {
    address?: string;
    /** @format byte */
    data?: string;
}
export interface MsgMigrateContractResponse {
    /** @format byte */
    data?: string;
}
export type MsgPinCodesResponse = object;
export type MsgRemoveCodeUploadParamsAddressesResponse = object;
export interface MsgStoreAndInstantiateContractResponse {
    address?: string;
    /** @format byte */
    data?: string;
}
export interface MsgStoreAndMigrateContractResponse {
    /** @format uint64 */
    code_id?: string;
    /** @format byte */
    checksum?: string;
    /** @format byte */
    data?: string;
}
export interface MsgStoreCodeResponse {
    /** @format uint64 */
    code_id?: string;
    /** @format byte */
    checksum?: string;
}
export interface MsgSudoContractResponse {
    /** @format byte */
    data?: string;
}
export type MsgUnpinCodesResponse = object;
export type MsgUpdateAdminResponse = object;
export type MsgUpdateContractLabelResponse = object;
export type MsgUpdateInstantiateConfigResponse = object;
export type MsgUpdateParamsResponse = object;
export interface Params {
    code_upload_access?: {
        permission?: "ACCESS_TYPE_UNSPECIFIED" | "ACCESS_TYPE_NOBODY" | "ACCESS_TYPE_EVERYBODY" | "ACCESS_TYPE_ANY_OF_ADDRESSES";
        addresses?: string[];
    };
    instantiate_default_permission?: "ACCESS_TYPE_UNSPECIFIED" | "ACCESS_TYPE_NOBODY" | "ACCESS_TYPE_EVERYBODY" | "ACCESS_TYPE_ANY_OF_ADDRESSES";
}
import { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
export type QueryParamsType = Record<string | number, any>;
export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseType;
    /** request body */
    body?: unknown;
}
export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;
export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
    securityWorker?: (securityData: SecurityDataType | null) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
    secure?: boolean;
    format?: ResponseType;
}
export declare enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded"
}
export declare class HttpClient<SecurityDataType = unknown> {
    instance: AxiosInstance;
    private securityData;
    private securityWorker?;
    private secure?;
    private format?;
    constructor({ securityWorker, secure, format, ...axiosConfig }?: ApiConfig<SecurityDataType>);
    setSecurityData: (data: SecurityDataType | null) => void;
    private mergeRequestParams;
    private createFormData;
    request: <T = any, _E = any>({ secure, path, type, query, format, body, ...params }: FullRequestParams) => Promise<AxiosResponse<T>>;
}
/**
 * @title HTTP API Console cosmwasm.wasm.v1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Query
     * @name QueryCodes
     * @request GET:/cosmwasm/wasm/v1/code
     */
    queryCodes: (query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        code_infos?: {
            code_id?: string;
            creator?: string;
            data_hash?: string;
            instantiate_permission?: {
                permission?: "ACCESS_TYPE_UNSPECIFIED" | "ACCESS_TYPE_NOBODY" | "ACCESS_TYPE_EVERYBODY" | "ACCESS_TYPE_ANY_OF_ADDRESSES";
                addresses?: string[];
            };
        }[];
        pagination?: {
            next_key?: string;
            total?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryCode
     * @request GET:/cosmwasm/wasm/v1/code/{code_id}
     */
    queryCode: (codeId: string, params?: RequestParams) => Promise<AxiosResponse<{
        code_info?: {
            code_id?: string;
            creator?: string;
            data_hash?: string;
            instantiate_permission?: {
                permission?: "ACCESS_TYPE_UNSPECIFIED" | "ACCESS_TYPE_NOBODY" | "ACCESS_TYPE_EVERYBODY" | "ACCESS_TYPE_ANY_OF_ADDRESSES";
                addresses?: string[];
            };
        };
        data?: string;
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryContractsByCode
     * @request GET:/cosmwasm/wasm/v1/code/{code_id}/contracts
     */
    queryContractsByCode: (codeId: string, query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        contracts?: string[];
        pagination?: {
            next_key?: string;
            total?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryParams
     * @request GET:/cosmwasm/wasm/v1/codes/params
     */
    queryParams: (params?: RequestParams) => Promise<AxiosResponse<{
        params?: {
            code_upload_access?: {
                permission?: "ACCESS_TYPE_UNSPECIFIED" | "ACCESS_TYPE_NOBODY" | "ACCESS_TYPE_EVERYBODY" | "ACCESS_TYPE_ANY_OF_ADDRESSES";
                addresses?: string[];
            };
            instantiate_default_permission?: "ACCESS_TYPE_UNSPECIFIED" | "ACCESS_TYPE_NOBODY" | "ACCESS_TYPE_EVERYBODY" | "ACCESS_TYPE_ANY_OF_ADDRESSES";
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryPinnedCodes
     * @request GET:/cosmwasm/wasm/v1/codes/pinned
     */
    queryPinnedCodes: (query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        code_ids?: string[];
        pagination?: {
            next_key?: string;
            total?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryContractInfo
     * @request GET:/cosmwasm/wasm/v1/contract/{address}
     */
    queryContractInfo: (address: string, params?: RequestParams) => Promise<AxiosResponse<{
        address?: string;
        contract_info?: {
            code_id?: string;
            creator?: string;
            admin?: string;
            label?: string;
            created?: {
                block_height?: string;
                tx_index?: string;
            };
            ibc_port_id?: string;
            extension?: {
                "@type"?: string;
            };
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryContractHistory
     * @request GET:/cosmwasm/wasm/v1/contract/{address}/history
     */
    queryContractHistory: (address: string, query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        entries?: {
            operation?: "CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED" | "CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT" | "CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE" | "CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS";
            code_id?: string;
            updated?: {
                block_height?: string;
                tx_index?: string;
            };
            msg?: string;
        }[];
        pagination?: {
            next_key?: string;
            total?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryRawContractState
     * @request GET:/cosmwasm/wasm/v1/contract/{address}/raw/{query_data}
     */
    queryRawContractState: (address: string, queryData: string, params?: RequestParams) => Promise<AxiosResponse<{
        data?: string;
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QuerySmartContractState
     * @request GET:/cosmwasm/wasm/v1/contract/{address}/smart/{query_data}
     */
    querySmartContractState: (address: string, queryData: string, params?: RequestParams) => Promise<AxiosResponse<{
        data?: string;
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryAllContractState
     * @request GET:/cosmwasm/wasm/v1/contract/{address}/state
     */
    queryAllContractState: (address: string, query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        models?: {
            key?: string;
            value?: string;
        }[];
        pagination?: {
            next_key?: string;
            total?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryContractsByCreator
     * @request GET:/cosmwasm/wasm/v1/contracts/creator/{creator_address}
     */
    queryContractsByCreator: (creatorAddress: string, query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        contract_addresses?: string[];
        pagination?: {
            next_key?: string;
            total?: string;
        };
    }>>;
}
