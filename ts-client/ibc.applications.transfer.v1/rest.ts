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

export interface QueryDenomHashResponse {
  hash?: string;
}

export interface QueryDenomTraceResponse {
  denom_trace?: { path?: string; base_denom?: string };
}

export interface QueryDenomTracesResponse {
  denom_traces?: { path?: string; base_denom?: string }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryEscrowAddressResponse {
  escrow_address?: string;
}

export interface QueryParamsResponse {
  params?: { send_enabled?: boolean; receive_enabled?: boolean };
}

export interface QueryTotalEscrowForDenomResponse {
  amount?: { denom?: string; amount?: string };
}

export interface V1DenomTrace {
  path?: string;
  base_denom?: string;
}

export interface V1Params {
  send_enabled?: boolean;
  receive_enabled?: boolean;
}

export interface Height {
  /** @format uint64 */
  revision_number?: string;

  /** @format uint64 */
  revision_height?: string;
}

export interface MsgTransferResponse {
  /** @format uint64 */
  sequence?: string;
}

export type MsgUpdateParamsResponse = object;

export interface TransferV1Params {
  send_enabled?: boolean;
  receive_enabled?: boolean;
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
 * @title HTTP API Console ibc.applications.transfer.v1
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Query
   * @name QueryEscrowAddress
   * @request GET:/ibc/apps/transfer/v1/channels/{channel_id}/ports/{port_id}/escrow_address
   */
  queryEscrowAddress = (channelId: string, portId: string, params: RequestParams = {}) =>
    this.request<{ escrow_address?: string }, { code?: number; message?: string; details?: { "@type"?: string }[] }>({
      path: `/ibc/apps/transfer/v1/channels/${channelId}/ports/${portId}/escrow_address`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryDenomHash
   * @request GET:/ibc/apps/transfer/v1/denom_hashes/{trace}
   */
  queryDenomHash = (trace: string, params: RequestParams = {}) =>
    this.request<{ hash?: string }, { code?: number; message?: string; details?: { "@type"?: string }[] }>({
      path: `/ibc/apps/transfer/v1/denom_hashes/${trace}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryDenomTraces
   * @request GET:/ibc/apps/transfer/v1/denom_traces
   */
  queryDenomTraces = (
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
      { denom_traces?: { path?: string; base_denom?: string }[]; pagination?: { next_key?: string; total?: string } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/ibc/apps/transfer/v1/denom_traces`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryDenomTrace
   * @request GET:/ibc/apps/transfer/v1/denom_traces/{hash}
   */
  queryDenomTrace = (hash: string, params: RequestParams = {}) =>
    this.request<
      { denom_trace?: { path?: string; base_denom?: string } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/ibc/apps/transfer/v1/denom_traces/${hash}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryTotalEscrowForDenom
   * @request GET:/ibc/apps/transfer/v1/denoms/{denom}/total_escrow
   */
  queryTotalEscrowForDenom = (denom: string, params: RequestParams = {}) =>
    this.request<
      { amount?: { denom?: string; amount?: string } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/ibc/apps/transfer/v1/denoms/${denom}/total_escrow`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryParams
   * @request GET:/ibc/apps/transfer/v1/params
   */
  queryParams = (params: RequestParams = {}) =>
    this.request<
      { params?: { send_enabled?: boolean; receive_enabled?: boolean } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/ibc/apps/transfer/v1/params`,
      method: "GET",
      ...params,
    });
}
