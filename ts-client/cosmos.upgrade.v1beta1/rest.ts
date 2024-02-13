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

export interface ModuleVersion {
  name?: string;

  /** @format uint64 */
  version?: string;
}

export interface Plan {
  name?: string;

  /** @format date-time */
  time?: string;

  /** @format int64 */
  height?: string;
  info?: string;
  upgraded_client_state?: { "@type"?: string };
}

export interface QueryAppliedPlanResponse {
  /** @format int64 */
  height?: string;
}

export interface QueryAuthorityResponse {
  address?: string;
}

export interface QueryCurrentPlanResponse {
  plan?: { name?: string; time?: string; height?: string; info?: string; upgraded_client_state?: { "@type"?: string } };
}

export interface QueryModuleVersionsResponse {
  module_versions?: { name?: string; version?: string }[];
}

export interface QueryUpgradedConsensusStateResponse {
  /** @format byte */
  upgraded_consensus_state?: string;
}

export interface Status {
  /** @format int32 */
  code?: number;
  message?: string;
  details?: { "@type"?: string }[];
}

export type MsgCancelUpgradeResponse = object;

export type MsgSoftwareUpgradeResponse = object;

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
 * @title HTTP API Console cosmos.upgrade.v1beta1
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Query
   * @name QueryAppliedPlan
   * @request GET:/cosmos/upgrade/v1beta1/applied_plan/{name}
   */
  queryAppliedPlan = (name: string, params: RequestParams = {}) =>
    this.request<{ height?: string }, { code?: number; message?: string; details?: { "@type"?: string }[] }>({
      path: `/cosmos/upgrade/v1beta1/applied_plan/${name}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryAuthority
   * @request GET:/cosmos/upgrade/v1beta1/authority
   */
  queryAuthority = (params: RequestParams = {}) =>
    this.request<{ address?: string }, { code?: number; message?: string; details?: { "@type"?: string }[] }>({
      path: `/cosmos/upgrade/v1beta1/authority`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryCurrentPlan
   * @request GET:/cosmos/upgrade/v1beta1/current_plan
   */
  queryCurrentPlan = (params: RequestParams = {}) =>
    this.request<
      {
        plan?: {
          name?: string;
          time?: string;
          height?: string;
          info?: string;
          upgraded_client_state?: { "@type"?: string };
        };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/upgrade/v1beta1/current_plan`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryModuleVersions
   * @request GET:/cosmos/upgrade/v1beta1/module_versions
   */
  queryModuleVersions = (query?: { module_name?: string }, params: RequestParams = {}) =>
    this.request<
      { module_versions?: { name?: string; version?: string }[] },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/upgrade/v1beta1/module_versions`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryUpgradedConsensusState
   * @request GET:/cosmos/upgrade/v1beta1/upgraded_consensus_state/{last_height}
   */
  queryUpgradedConsensusState = (lastHeight: string, params: RequestParams = {}) =>
    this.request<
      { upgraded_consensus_state?: string },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/upgrade/v1beta1/upgraded_consensus_state/${lastHeight}`,
      method: "GET",
      ...params,
    });
}
