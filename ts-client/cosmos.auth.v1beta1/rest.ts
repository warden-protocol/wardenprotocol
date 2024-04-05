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

export interface AddressBytesToStringResponse {
  address_string?: string;
}

export interface AddressStringToBytesResponse {
  /** @format byte */
  address_bytes?: string;
}

export interface BaseAccount {
  address?: string;
  pub_key?: { "@type"?: string };

  /** @format uint64 */
  account_number?: string;

  /** @format uint64 */
  sequence?: string;
}

export interface Bech32PrefixResponse {
  bech32_prefix?: string;
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

export interface QueryAccountAddressByIDResponse {
  account_address?: string;
}

export interface QueryAccountInfoResponse {
  info?: { address?: string; pub_key?: { "@type"?: string }; account_number?: string; sequence?: string };
}

export interface QueryAccountResponse {
  account?: { "@type"?: string };
}

export interface QueryAccountsResponse {
  accounts?: { "@type"?: string }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryModuleAccountByNameResponse {
  account?: { "@type"?: string };
}

export interface QueryModuleAccountsResponse {
  accounts?: { "@type"?: string }[];
}

export interface QueryParamsResponse {
  params?: {
    max_memo_characters?: string;
    tx_sig_limit?: string;
    tx_size_cost_per_byte?: string;
    sig_verify_cost_ed25519?: string;
    sig_verify_cost_secp256k1?: string;
  };
}

export interface V1Beta1Params {
  /** @format uint64 */
  max_memo_characters?: string;

  /** @format uint64 */
  tx_sig_limit?: string;

  /** @format uint64 */
  tx_size_cost_per_byte?: string;

  /** @format uint64 */
  sig_verify_cost_ed25519?: string;

  /** @format uint64 */
  sig_verify_cost_secp256k1?: string;
}

export type MsgUpdateParamsResponse = object;

export interface Params {
  /** @format uint64 */
  max_memo_characters?: string;

  /** @format uint64 */
  tx_sig_limit?: string;

  /** @format uint64 */
  tx_size_cost_per_byte?: string;

  /** @format uint64 */
  sig_verify_cost_ed25519?: string;

  /** @format uint64 */
  sig_verify_cost_secp256k1?: string;
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
 * @title HTTP API Console cosmos.auth.v1beta1
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Query
   * @name QueryAccountInfo
   * @request GET:/cosmos/auth/v1beta1/account_info/{address}
   */
  queryAccountInfo = (address: string, params: RequestParams = {}) =>
    this.request<
      { info?: { address?: string; pub_key?: { "@type"?: string }; account_number?: string; sequence?: string } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/auth/v1beta1/account_info/${address}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryAccounts
   * @request GET:/cosmos/auth/v1beta1/accounts
   */
  queryAccounts = (
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
      { accounts?: { "@type"?: string }[]; pagination?: { next_key?: string; total?: string } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/auth/v1beta1/accounts`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryAccount
   * @request GET:/cosmos/auth/v1beta1/accounts/{address}
   */
  queryAccount = (address: string, params: RequestParams = {}) =>
    this.request<
      { account?: { "@type"?: string } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/auth/v1beta1/accounts/${address}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryAccountAddressById
   * @request GET:/cosmos/auth/v1beta1/address_by_id/{id}
   */
  queryAccountAddressByID = (id: string, query?: { account_id?: string }, params: RequestParams = {}) =>
    this.request<{ account_address?: string }, { code?: number; message?: string; details?: { "@type"?: string }[] }>({
      path: `/cosmos/auth/v1beta1/address_by_id/${id}`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryBech32Prefix
   * @request GET:/cosmos/auth/v1beta1/bech32
   */
  queryBech32Prefix = (params: RequestParams = {}) =>
    this.request<{ bech32_prefix?: string }, { code?: number; message?: string; details?: { "@type"?: string }[] }>({
      path: `/cosmos/auth/v1beta1/bech32`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryAddressBytesToString
   * @request GET:/cosmos/auth/v1beta1/bech32/{address_bytes}
   */
  queryAddressBytesToString = (addressBytes: string, params: RequestParams = {}) =>
    this.request<{ address_string?: string }, { code?: number; message?: string; details?: { "@type"?: string }[] }>({
      path: `/cosmos/auth/v1beta1/bech32/${addressBytes}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryAddressStringToBytes
   * @request GET:/cosmos/auth/v1beta1/bech32/{address_string}
   */
  queryAddressStringToBytes = (addressString: string, params: RequestParams = {}) =>
    this.request<{ address_bytes?: string }, { code?: number; message?: string; details?: { "@type"?: string }[] }>({
      path: `/cosmos/auth/v1beta1/bech32/${addressString}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryModuleAccounts
   * @request GET:/cosmos/auth/v1beta1/module_accounts
   */
  queryModuleAccounts = (params: RequestParams = {}) =>
    this.request<
      { accounts?: { "@type"?: string }[] },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/auth/v1beta1/module_accounts`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryModuleAccountByName
   * @request GET:/cosmos/auth/v1beta1/module_accounts/{name}
   */
  queryModuleAccountByName = (name: string, params: RequestParams = {}) =>
    this.request<
      { account?: { "@type"?: string } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/auth/v1beta1/module_accounts/${name}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryParams
   * @request GET:/cosmos/auth/v1beta1/params
   */
  queryParams = (params: RequestParams = {}) =>
    this.request<
      {
        params?: {
          max_memo_characters?: string;
          tx_sig_limit?: string;
          tx_size_cost_per_byte?: string;
          sig_verify_cost_ed25519?: string;
          sig_verify_cost_secp256k1?: string;
        };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/auth/v1beta1/params`,
      method: "GET",
      ...params,
    });
}
