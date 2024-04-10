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

export interface QueryInterchainAccountResponse {
  address?: string;
}

export interface QueryParamsResponse {
  params?: { controller_enabled?: boolean };
}

export interface V1Params {
  controller_enabled?: boolean;
}

export interface InterchainAccountPacketData {
  type?: "TYPE_UNSPECIFIED" | "TYPE_EXECUTE_TX";

  /** @format byte */
  data?: string;
  memo?: string;
}

export interface MsgRegisterInterchainAccountResponse {
  channel_id?: string;
  port_id?: string;
}

export interface MsgSendTxResponse {
  /** @format uint64 */
  sequence?: string;
}

export type MsgUpdateParamsResponse = object;

export enum Order {
  ORDER_NONE_UNSPECIFIED = "ORDER_NONE_UNSPECIFIED",
  ORDER_UNORDERED = "ORDER_UNORDERED",
  ORDER_ORDERED = "ORDER_ORDERED",
}

export interface ControllerV1Params {
  controller_enabled?: boolean;
}

export enum V1Type {
  TYPE_UNSPECIFIED = "TYPE_UNSPECIFIED",
  TYPE_EXECUTE_TX = "TYPE_EXECUTE_TX",
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
 * @title HTTP API Console ibc.applications.interchain_accounts.controller.v1
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Query
   * @name QueryInterchainAccount
   * @request GET:/ibc/apps/interchain_accounts/controller/v1/owners/{owner}/connections/{connection_id}
   */
  queryInterchainAccount = (owner: string, connectionId: string, params: RequestParams = {}) =>
    this.request<{ address?: string }, { code?: number; message?: string; details?: { "@type"?: string }[] }>({
      path: `/ibc/apps/interchain_accounts/controller/v1/owners/${owner}/connections/${connectionId}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryParams
   * @request GET:/ibc/apps/interchain_accounts/controller/v1/params
   */
  queryParams = (params: RequestParams = {}) =>
    this.request<
      { params?: { controller_enabled?: boolean } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/ibc/apps/interchain_accounts/controller/v1/params`,
      method: "GET",
      ...params,
    });
}
