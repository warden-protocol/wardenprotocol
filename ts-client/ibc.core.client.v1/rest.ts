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

export interface ConsensusStateWithHeight {
  height?: { revision_number?: string; revision_height?: string };
  consensus_state?: { "@type"?: string };
}

export interface Height {
  /** @format uint64 */
  revision_number?: string;

  /** @format uint64 */
  revision_height?: string;
}

export interface IdentifiedClientState {
  client_id?: string;
  client_state?: { "@type"?: string };
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

export interface Params {
  allowed_clients?: string[];
}

export interface QueryClientParamsResponse {
  params?: { allowed_clients?: string[] };
}

export interface QueryClientStateResponse {
  client_state?: { "@type"?: string };

  /** @format byte */
  proof?: string;
  proof_height?: { revision_number?: string; revision_height?: string };
}

export interface QueryClientStatesResponse {
  client_states?: { client_id?: string; client_state?: { "@type"?: string } }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryClientStatusResponse {
  status?: string;
}

export interface QueryConsensusStateHeightsResponse {
  consensus_state_heights?: { revision_number?: string; revision_height?: string }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryConsensusStateResponse {
  consensus_state?: { "@type"?: string };

  /** @format byte */
  proof?: string;
  proof_height?: { revision_number?: string; revision_height?: string };
}

export interface QueryConsensusStatesResponse {
  consensus_states?: {
    height?: { revision_number?: string; revision_height?: string };
    consensus_state?: { "@type"?: string };
  }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryUpgradedClientStateResponse {
  upgraded_client_state?: { "@type"?: string };
}

export interface QueryUpgradedConsensusStateResponse {
  upgraded_consensus_state?: { "@type"?: string };
}

export type MsgCreateClientResponse = object;

export type MsgIBCSoftwareUpgradeResponse = object;

export type MsgRecoverClientResponse = object;

export type MsgSubmitMisbehaviourResponse = object;

export type MsgUpdateClientResponse = object;

export type MsgUpdateParamsResponse = object;

export type MsgUpgradeClientResponse = object;

export interface Plan {
  name?: string;

  /** @format date-time */
  time?: string;

  /** @format int64 */
  height?: string;
  info?: string;
  upgraded_client_state?: { "@type"?: string };
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
 * @title HTTP API Console ibc.core.client.v1
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Query
   * @name QueryClientStates
   * @request GET:/ibc/core/client/v1/client_states
   */
  queryClientStates = (
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
        client_states?: { client_id?: string; client_state?: { "@type"?: string } }[];
        pagination?: { next_key?: string; total?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/ibc/core/client/v1/client_states`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryClientState
   * @request GET:/ibc/core/client/v1/client_states/{client_id}
   */
  queryClientState = (clientId: string, params: RequestParams = {}) =>
    this.request<
      {
        client_state?: { "@type"?: string };
        proof?: string;
        proof_height?: { revision_number?: string; revision_height?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/ibc/core/client/v1/client_states/${clientId}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryClientStatus
   * @request GET:/ibc/core/client/v1/client_status/{client_id}
   */
  queryClientStatus = (clientId: string, params: RequestParams = {}) =>
    this.request<{ status?: string }, { code?: number; message?: string; details?: { "@type"?: string }[] }>({
      path: `/ibc/core/client/v1/client_status/${clientId}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryConsensusStates
   * @request GET:/ibc/core/client/v1/consensus_states/{client_id}
   */
  queryConsensusStates = (
    clientId: string,
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
        consensus_states?: {
          height?: { revision_number?: string; revision_height?: string };
          consensus_state?: { "@type"?: string };
        }[];
        pagination?: { next_key?: string; total?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/ibc/core/client/v1/consensus_states/${clientId}`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryConsensusStateHeights
   * @request GET:/ibc/core/client/v1/consensus_states/{client_id}/heights
   */
  queryConsensusStateHeights = (
    clientId: string,
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
        consensus_state_heights?: { revision_number?: string; revision_height?: string }[];
        pagination?: { next_key?: string; total?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/ibc/core/client/v1/consensus_states/${clientId}/heights`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryConsensusState
   * @request GET:/ibc/core/client/v1/consensus_states/{client_id}/revision/{revision_number}/height/{revision_height}
   */
  queryConsensusState = (
    clientId: string,
    revisionNumber: string,
    revisionHeight: string,
    query?: { latest_height?: boolean },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        consensus_state?: { "@type"?: string };
        proof?: string;
        proof_height?: { revision_number?: string; revision_height?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/ibc/core/client/v1/consensus_states/${clientId}/revision/${revisionNumber}/height/${revisionHeight}`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryClientParams
   * @request GET:/ibc/core/client/v1/params
   */
  queryClientParams = (params: RequestParams = {}) =>
    this.request<
      { params?: { allowed_clients?: string[] } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/ibc/core/client/v1/params`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryUpgradedClientState
   * @request GET:/ibc/core/client/v1/upgraded_client_states
   */
  queryUpgradedClientState = (params: RequestParams = {}) =>
    this.request<
      { upgraded_client_state?: { "@type"?: string } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/ibc/core/client/v1/upgraded_client_states`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryUpgradedConsensusState
   * @request GET:/ibc/core/client/v1/upgraded_consensus_states
   */
  queryUpgradedConsensusState = (params: RequestParams = {}) =>
    this.request<
      { upgraded_consensus_state?: { "@type"?: string } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/ibc/core/client/v1/upgraded_consensus_states`,
      method: "GET",
      ...params,
    });
}
