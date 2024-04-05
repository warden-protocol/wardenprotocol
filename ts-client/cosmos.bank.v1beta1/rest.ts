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

export interface Coin {
  denom?: string;
  amount?: string;
}

export interface DenomOwner {
  address?: string;
  balance?: { denom?: string; amount?: string };
}

export interface DenomUnit {
  denom?: string;

  /** @format int64 */
  exponent?: number;
  aliases?: string[];
}

export interface Metadata {
  description?: string;
  denom_units?: { denom?: string; exponent?: number; aliases?: string[] }[];
  base?: string;
  display?: string;
  name?: string;
  symbol?: string;
  uri?: string;
  uri_hash?: string;
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

export interface QueryAllBalancesResponse {
  balances?: { denom?: string; amount?: string }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryBalanceResponse {
  balance?: { denom?: string; amount?: string };
}

export interface QueryDenomMetadataByQueryStringResponse {
  metadata?: {
    description?: string;
    denom_units?: { denom?: string; exponent?: number; aliases?: string[] }[];
    base?: string;
    display?: string;
    name?: string;
    symbol?: string;
    uri?: string;
    uri_hash?: string;
  };
}

export interface QueryDenomMetadataResponse {
  metadata?: {
    description?: string;
    denom_units?: { denom?: string; exponent?: number; aliases?: string[] }[];
    base?: string;
    display?: string;
    name?: string;
    symbol?: string;
    uri?: string;
    uri_hash?: string;
  };
}

export interface QueryDenomOwnersByQueryResponse {
  denom_owners?: { address?: string; balance?: { denom?: string; amount?: string } }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryDenomOwnersResponse {
  denom_owners?: { address?: string; balance?: { denom?: string; amount?: string } }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryDenomsMetadataResponse {
  metadatas?: {
    description?: string;
    denom_units?: { denom?: string; exponent?: number; aliases?: string[] }[];
    base?: string;
    display?: string;
    name?: string;
    symbol?: string;
    uri?: string;
    uri_hash?: string;
  }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryParamsResponse {
  params?: { send_enabled?: { denom?: string; enabled?: boolean }[]; default_send_enabled?: boolean };
}

export interface QuerySendEnabledResponse {
  send_enabled?: { denom?: string; enabled?: boolean }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QuerySpendableBalanceByDenomResponse {
  balance?: { denom?: string; amount?: string };
}

export interface QuerySpendableBalancesResponse {
  balances?: { denom?: string; amount?: string }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QuerySupplyOfResponse {
  amount?: { denom?: string; amount?: string };
}

export interface QueryTotalSupplyResponse {
  supply?: { denom?: string; amount?: string }[];
  pagination?: { next_key?: string; total?: string };
}

export interface V1Beta1Params {
  send_enabled?: { denom?: string; enabled?: boolean }[];
  default_send_enabled?: boolean;
}

export interface V1Beta1SendEnabled {
  denom?: string;
  enabled?: boolean;
}

export interface Input {
  address?: string;
  coins?: { denom?: string; amount?: string }[];
}

export type MsgMultiSendResponse = object;

export type MsgSendResponse = object;

export type MsgSetSendEnabledResponse = object;

export type MsgUpdateParamsResponse = object;

export interface Output {
  address?: string;
  coins?: { denom?: string; amount?: string }[];
}

export interface Params {
  send_enabled?: { denom?: string; enabled?: boolean }[];
  default_send_enabled?: boolean;
}

export interface SendEnabled {
  denom?: string;
  enabled?: boolean;
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
 * @title HTTP API Console cosmos.bank.v1beta1
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Query
   * @name QueryAllBalances
   * @request GET:/cosmos/bank/v1beta1/balances/{address}
   */
  queryAllBalances = (
    address: string,
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
      resolve_denom?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      { balances?: { denom?: string; amount?: string }[]; pagination?: { next_key?: string; total?: string } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/bank/v1beta1/balances/${address}`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryBalance
   * @request GET:/cosmos/bank/v1beta1/balances/{address}/by_denom
   */
  queryBalance = (address: string, query?: { denom?: string }, params: RequestParams = {}) =>
    this.request<
      { balance?: { denom?: string; amount?: string } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/bank/v1beta1/balances/${address}/by_denom`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryDenomOwners
   * @request GET:/cosmos/bank/v1beta1/denom_owners/{denom}
   */
  queryDenomOwners = (
    denom: string,
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
        denom_owners?: { address?: string; balance?: { denom?: string; amount?: string } }[];
        pagination?: { next_key?: string; total?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/bank/v1beta1/denom_owners/${denom}`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryDenomOwnersByQuery
   * @request GET:/cosmos/bank/v1beta1/denom_owners_by_query
   */
  queryDenomOwnersByQuery = (
    query?: {
      denom?: string;
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
        denom_owners?: { address?: string; balance?: { denom?: string; amount?: string } }[];
        pagination?: { next_key?: string; total?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/bank/v1beta1/denom_owners_by_query`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryDenomsMetadata
   * @request GET:/cosmos/bank/v1beta1/denoms_metadata
   */
  queryDenomsMetadata = (
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
        metadatas?: {
          description?: string;
          denom_units?: { denom?: string; exponent?: number; aliases?: string[] }[];
          base?: string;
          display?: string;
          name?: string;
          symbol?: string;
          uri?: string;
          uri_hash?: string;
        }[];
        pagination?: { next_key?: string; total?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/bank/v1beta1/denoms_metadata`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryDenomMetadata
   * @request GET:/cosmos/bank/v1beta1/denoms_metadata/{denom}
   */
  queryDenomMetadata = (denom: string, params: RequestParams = {}) =>
    this.request<
      {
        metadata?: {
          description?: string;
          denom_units?: { denom?: string; exponent?: number; aliases?: string[] }[];
          base?: string;
          display?: string;
          name?: string;
          symbol?: string;
          uri?: string;
          uri_hash?: string;
        };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/bank/v1beta1/denoms_metadata/${denom}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryDenomMetadataByQueryString
   * @request GET:/cosmos/bank/v1beta1/denoms_metadata_by_query_string
   */
  queryDenomMetadataByQueryString = (query?: { denom?: string }, params: RequestParams = {}) =>
    this.request<
      {
        metadata?: {
          description?: string;
          denom_units?: { denom?: string; exponent?: number; aliases?: string[] }[];
          base?: string;
          display?: string;
          name?: string;
          symbol?: string;
          uri?: string;
          uri_hash?: string;
        };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/bank/v1beta1/denoms_metadata_by_query_string`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryParams
   * @request GET:/cosmos/bank/v1beta1/params
   */
  queryParams = (params: RequestParams = {}) =>
    this.request<
      { params?: { send_enabled?: { denom?: string; enabled?: boolean }[]; default_send_enabled?: boolean } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/bank/v1beta1/params`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QuerySendEnabled
   * @request GET:/cosmos/bank/v1beta1/send_enabled
   */
  querySendEnabled = (
    query?: {
      denoms?: string[];
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      { send_enabled?: { denom?: string; enabled?: boolean }[]; pagination?: { next_key?: string; total?: string } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/bank/v1beta1/send_enabled`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QuerySpendableBalances
   * @request GET:/cosmos/bank/v1beta1/spendable_balances/{address}
   */
  querySpendableBalances = (
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
      { balances?: { denom?: string; amount?: string }[]; pagination?: { next_key?: string; total?: string } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/bank/v1beta1/spendable_balances/${address}`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QuerySpendableBalanceByDenom
   * @request GET:/cosmos/bank/v1beta1/spendable_balances/{address}/by_denom
   */
  querySpendableBalanceByDenom = (address: string, query?: { denom?: string }, params: RequestParams = {}) =>
    this.request<
      { balance?: { denom?: string; amount?: string } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/bank/v1beta1/spendable_balances/${address}/by_denom`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryTotalSupply
   * @request GET:/cosmos/bank/v1beta1/supply
   */
  queryTotalSupply = (
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
      { supply?: { denom?: string; amount?: string }[]; pagination?: { next_key?: string; total?: string } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/bank/v1beta1/supply`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QuerySupplyOf
   * @request GET:/cosmos/bank/v1beta1/supply/by_denom
   */
  querySupplyOf = (query?: { denom?: string }, params: RequestParams = {}) =>
    this.request<
      { amount?: { denom?: string; amount?: string } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/bank/v1beta1/supply/by_denom`,
      method: "GET",
      query: query,
      ...params,
    });
}
