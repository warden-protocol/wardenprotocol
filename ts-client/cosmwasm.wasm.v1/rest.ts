/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Any {
  "@type"?: string;
}

export interface Status {
  /** @format int32 */
  code?: number;
  message?: string;
  details?: { "@type"?: string }[];
}

export interface AbsoluteTxPosition {
  /** @format uint64 */
  block_height?: string;

  /** @format uint64 */
  tx_index?: string;
}

export interface AccessConfig {
  permission?:
    | "ACCESS_TYPE_UNSPECIFIED"
    | "ACCESS_TYPE_NOBODY"
    | "ACCESS_TYPE_EVERYBODY"
    | "ACCESS_TYPE_ANY_OF_ADDRESSES";
  addresses?: string[];
}

export enum AccessType {
  ACCESS_TYPE_UNSPECIFIED = "ACCESS_TYPE_UNSPECIFIED",
  ACCESS_TYPE_NOBODY = "ACCESS_TYPE_NOBODY",
  ACCESS_TYPE_EVERYBODY = "ACCESS_TYPE_EVERYBODY",
  ACCESS_TYPE_ANY_OF_ADDRESSES = "ACCESS_TYPE_ANY_OF_ADDRESSES",
}

export interface CodeInfoResponse {
  /** @format uint64 */
  code_id?: string;
  creator?: string;

  /** @format byte */
  data_hash?: string;
  instantiate_permission?: {
    permission?:
      | "ACCESS_TYPE_UNSPECIFIED"
      | "ACCESS_TYPE_NOBODY"
      | "ACCESS_TYPE_EVERYBODY"
      | "ACCESS_TYPE_ANY_OF_ADDRESSES";
    addresses?: string[];
  };
}

export interface ContractCodeHistoryEntry {
  operation?:
    | "CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED"
    | "CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT"
    | "CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE"
    | "CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS";

  /** @format uint64 */
  code_id?: string;
  updated?: { block_height?: string; tx_index?: string };

  /** @format byte */
  msg?: string;
}

export enum ContractCodeHistoryOperationType {
  CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED = "CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED",
  CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT = "CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT",
  CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE = "CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE",
  CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS = "CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS",
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
  models?: { key?: string; value?: string }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryCodeResponse {
  code_info?: {
    code_id?: string;
    creator?: string;
    data_hash?: string;
    instantiate_permission?: {
      permission?:
        | "ACCESS_TYPE_UNSPECIFIED"
        | "ACCESS_TYPE_NOBODY"
        | "ACCESS_TYPE_EVERYBODY"
        | "ACCESS_TYPE_ANY_OF_ADDRESSES";
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
      permission?:
        | "ACCESS_TYPE_UNSPECIFIED"
        | "ACCESS_TYPE_NOBODY"
        | "ACCESS_TYPE_EVERYBODY"
        | "ACCESS_TYPE_ANY_OF_ADDRESSES";
      addresses?: string[];
    };
  }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryContractHistoryResponse {
  entries?: {
    operation?:
      | "CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED"
      | "CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT"
      | "CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE"
      | "CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS";
    code_id?: string;
    updated?: { block_height?: string; tx_index?: string };
    msg?: string;
  }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryContractInfoResponse {
  address?: string;
  contract_info?: {
    code_id?: string;
    creator?: string;
    admin?: string;
    label?: string;
    created?: { block_height?: string; tx_index?: string };
    ibc_port_id?: string;
    extension?: { "@type"?: string };
  };
}

export interface QueryContractsByCodeResponse {
  contracts?: string[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryContractsByCreatorResponse {
  contract_addresses?: string[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryParamsResponse {
  params?: {
    code_upload_access?: {
      permission?:
        | "ACCESS_TYPE_UNSPECIFIED"
        | "ACCESS_TYPE_NOBODY"
        | "ACCESS_TYPE_EVERYBODY"
        | "ACCESS_TYPE_ANY_OF_ADDRESSES";
      addresses?: string[];
    };
    instantiate_default_permission?:
      | "ACCESS_TYPE_UNSPECIFIED"
      | "ACCESS_TYPE_NOBODY"
      | "ACCESS_TYPE_EVERYBODY"
      | "ACCESS_TYPE_ANY_OF_ADDRESSES";
  };
}

export interface QueryPinnedCodesResponse {
  code_ids?: string[];
  pagination?: { next_key?: string; total?: string };
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
  created?: { block_height?: string; tx_index?: string };
  ibc_port_id?: string;
  extension?: { "@type"?: string };
}

export interface V1Params {
  code_upload_access?: {
    permission?:
      | "ACCESS_TYPE_UNSPECIFIED"
      | "ACCESS_TYPE_NOBODY"
      | "ACCESS_TYPE_EVERYBODY"
      | "ACCESS_TYPE_ANY_OF_ADDRESSES";
    addresses?: string[];
  };
  instantiate_default_permission?:
    | "ACCESS_TYPE_UNSPECIFIED"
    | "ACCESS_TYPE_NOBODY"
    | "ACCESS_TYPE_EVERYBODY"
    | "ACCESS_TYPE_ANY_OF_ADDRESSES";
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
    permission?:
      | "ACCESS_TYPE_UNSPECIFIED"
      | "ACCESS_TYPE_NOBODY"
      | "ACCESS_TYPE_EVERYBODY"
      | "ACCESS_TYPE_ANY_OF_ADDRESSES";
    addresses?: string[];
  };
  instantiate_default_permission?:
    | "ACCESS_TYPE_UNSPECIFIED"
    | "ACCESS_TYPE_NOBODY"
    | "ACCESS_TYPE_EVERYBODY"
    | "ACCESS_TYPE_ANY_OF_ADDRESSES";
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";

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
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.instance.defaults.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      formData.append(
        key,
        property instanceof Blob
          ? property
          : typeof property === "object" && property !== null
          ? JSON.stringify(property)
          : `${property}`,
      );
      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = (format && this.format) || void 0;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      requestParams.headers.common = { Accept: "*/*" };
      requestParams.headers.post = {};
      requestParams.headers.put = {};

      body = this.createFormData(body as Record<string, unknown>);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title HTTP API Console cosmwasm.wasm.v1
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Query
   * @name QueryCodes
   * @request GET:/cosmwasm/wasm/v1/code
   */
  queryCodes = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code_infos?: {
          code_id?: string;
          creator?: string;
          data_hash?: string;
          instantiate_permission?: {
            permission?:
              | "ACCESS_TYPE_UNSPECIFIED"
              | "ACCESS_TYPE_NOBODY"
              | "ACCESS_TYPE_EVERYBODY"
              | "ACCESS_TYPE_ANY_OF_ADDRESSES";
            addresses?: string[];
          };
        }[];
        pagination?: { next_key?: string; total?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmwasm/wasm/v1/code`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryCode
   * @request GET:/cosmwasm/wasm/v1/code/{code_id}
   */
  queryCode = (codeId: string, params: RequestParams = {}) =>
    this.request<
      {
        code_info?: {
          code_id?: string;
          creator?: string;
          data_hash?: string;
          instantiate_permission?: {
            permission?:
              | "ACCESS_TYPE_UNSPECIFIED"
              | "ACCESS_TYPE_NOBODY"
              | "ACCESS_TYPE_EVERYBODY"
              | "ACCESS_TYPE_ANY_OF_ADDRESSES";
            addresses?: string[];
          };
        };
        data?: string;
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmwasm/wasm/v1/code/${codeId}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryContractsByCode
   * @request GET:/cosmwasm/wasm/v1/code/{code_id}/contracts
   */
  queryContractsByCode = (
    codeId: string,
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      { contracts?: string[]; pagination?: { next_key?: string; total?: string } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmwasm/wasm/v1/code/${codeId}/contracts`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryParams
   * @request GET:/cosmwasm/wasm/v1/codes/params
   */
  queryParams = (params: RequestParams = {}) =>
    this.request<
      {
        params?: {
          code_upload_access?: {
            permission?:
              | "ACCESS_TYPE_UNSPECIFIED"
              | "ACCESS_TYPE_NOBODY"
              | "ACCESS_TYPE_EVERYBODY"
              | "ACCESS_TYPE_ANY_OF_ADDRESSES";
            addresses?: string[];
          };
          instantiate_default_permission?:
            | "ACCESS_TYPE_UNSPECIFIED"
            | "ACCESS_TYPE_NOBODY"
            | "ACCESS_TYPE_EVERYBODY"
            | "ACCESS_TYPE_ANY_OF_ADDRESSES";
        };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmwasm/wasm/v1/codes/params`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryPinnedCodes
   * @request GET:/cosmwasm/wasm/v1/codes/pinned
   */
  queryPinnedCodes = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      { code_ids?: string[]; pagination?: { next_key?: string; total?: string } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmwasm/wasm/v1/codes/pinned`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryContractInfo
   * @request GET:/cosmwasm/wasm/v1/contract/{address}
   */
  queryContractInfo = (address: string, params: RequestParams = {}) =>
    this.request<
      {
        address?: string;
        contract_info?: {
          code_id?: string;
          creator?: string;
          admin?: string;
          label?: string;
          created?: { block_height?: string; tx_index?: string };
          ibc_port_id?: string;
          extension?: { "@type"?: string };
        };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmwasm/wasm/v1/contract/${address}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryContractHistory
   * @request GET:/cosmwasm/wasm/v1/contract/{address}/history
   */
  queryContractHistory = (
    address: string,
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        entries?: {
          operation?:
            | "CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED"
            | "CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT"
            | "CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE"
            | "CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS";
          code_id?: string;
          updated?: { block_height?: string; tx_index?: string };
          msg?: string;
        }[];
        pagination?: { next_key?: string; total?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmwasm/wasm/v1/contract/${address}/history`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryRawContractState
   * @request GET:/cosmwasm/wasm/v1/contract/{address}/raw/{query_data}
   */
  queryRawContractState = (address: string, queryData: string, params: RequestParams = {}) =>
    this.request<{ data?: string }, { code?: number; message?: string; details?: { "@type"?: string }[] }>({
      path: `/cosmwasm/wasm/v1/contract/${address}/raw/${queryData}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QuerySmartContractState
   * @request GET:/cosmwasm/wasm/v1/contract/{address}/smart/{query_data}
   */
  querySmartContractState = (address: string, queryData: string, params: RequestParams = {}) =>
    this.request<{ data?: string }, { code?: number; message?: string; details?: { "@type"?: string }[] }>({
      path: `/cosmwasm/wasm/v1/contract/${address}/smart/${queryData}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryAllContractState
   * @request GET:/cosmwasm/wasm/v1/contract/{address}/state
   */
  queryAllContractState = (
    address: string,
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      { models?: { key?: string; value?: string }[]; pagination?: { next_key?: string; total?: string } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmwasm/wasm/v1/contract/${address}/state`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryContractsByCreator
   * @request GET:/cosmwasm/wasm/v1/contracts/creator/{creator_address}
   */
  queryContractsByCreator = (
    creatorAddress: string,
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      { contract_addresses?: string[]; pagination?: { next_key?: string; total?: string } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmwasm/wasm/v1/contracts/creator/${creatorAddress}`,
      method: "GET",
      query: query,
      ...params,
    });
}
