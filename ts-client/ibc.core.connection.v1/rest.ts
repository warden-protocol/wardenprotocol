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

export interface ConnectionEnd {
  client_id?: string;
  versions?: { identifier?: string; features?: string[] }[];
  state?: "STATE_UNINITIALIZED_UNSPECIFIED" | "STATE_INIT" | "STATE_TRYOPEN" | "STATE_OPEN";
  counterparty?: { client_id?: string; connection_id?: string; prefix?: { key_prefix?: string } };

  /** @format uint64 */
  delay_period?: string;
}

export interface Counterparty {
  client_id?: string;
  connection_id?: string;
  prefix?: { key_prefix?: string };
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

export interface IdentifiedConnection {
  id?: string;
  client_id?: string;
  versions?: { identifier?: string; features?: string[] }[];
  state?: "STATE_UNINITIALIZED_UNSPECIFIED" | "STATE_INIT" | "STATE_TRYOPEN" | "STATE_OPEN";
  counterparty?: { client_id?: string; connection_id?: string; prefix?: { key_prefix?: string } };

  /** @format uint64 */
  delay_period?: string;
}

export interface MerklePrefix {
  /** @format byte */
  key_prefix?: string;
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

export interface QueryClientConnectionsResponse {
  connection_paths?: string[];

  /** @format byte */
  proof?: string;
  proof_height?: { revision_number?: string; revision_height?: string };
}

export interface QueryConnectionClientStateResponse {
  identified_client_state?: { client_id?: string; client_state?: { "@type"?: string } };

  /** @format byte */
  proof?: string;
  proof_height?: { revision_number?: string; revision_height?: string };
}

export interface QueryConnectionConsensusStateResponse {
  consensus_state?: { "@type"?: string };
  client_id?: string;

  /** @format byte */
  proof?: string;
  proof_height?: { revision_number?: string; revision_height?: string };
}

export interface QueryConnectionParamsResponse {
  params?: { max_expected_time_per_block?: string };
}

export interface QueryConnectionResponse {
  connection?: {
    client_id?: string;
    versions?: { identifier?: string; features?: string[] }[];
    state?: "STATE_UNINITIALIZED_UNSPECIFIED" | "STATE_INIT" | "STATE_TRYOPEN" | "STATE_OPEN";
    counterparty?: { client_id?: string; connection_id?: string; prefix?: { key_prefix?: string } };
    delay_period?: string;
  };

  /** @format byte */
  proof?: string;
  proof_height?: { revision_number?: string; revision_height?: string };
}

export interface QueryConnectionsResponse {
  connections?: {
    id?: string;
    client_id?: string;
    versions?: { identifier?: string; features?: string[] }[];
    state?: "STATE_UNINITIALIZED_UNSPECIFIED" | "STATE_INIT" | "STATE_TRYOPEN" | "STATE_OPEN";
    counterparty?: { client_id?: string; connection_id?: string; prefix?: { key_prefix?: string } };
    delay_period?: string;
  }[];
  pagination?: { next_key?: string; total?: string };
  height?: { revision_number?: string; revision_height?: string };
}

export enum State {
  STATE_UNINITIALIZED_UNSPECIFIED = "STATE_UNINITIALIZED_UNSPECIFIED",
  STATE_INIT = "STATE_INIT",
  STATE_TRYOPEN = "STATE_TRYOPEN",
  STATE_OPEN = "STATE_OPEN",
}

export interface Version {
  identifier?: string;
  features?: string[];
}

export interface ConnectionV1Params {
  /** @format uint64 */
  max_expected_time_per_block?: string;
}

export type MsgConnectionOpenAckResponse = object;

export type MsgConnectionOpenConfirmResponse = object;

export type MsgConnectionOpenInitResponse = object;

export type MsgConnectionOpenTryResponse = object;

export type MsgUpdateParamsResponse = object;

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
 * @title HTTP API Console ibc.core.connection.v1
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Query
   * @name QueryClientConnections
   * @request GET:/ibc/core/connection/v1/client_connections/{client_id}
   */
  queryClientConnections = (clientId: string, params: RequestParams = {}) =>
    this.request<
      {
        connection_paths?: string[];
        proof?: string;
        proof_height?: { revision_number?: string; revision_height?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/ibc/core/connection/v1/client_connections/${clientId}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryConnections
   * @request GET:/ibc/core/connection/v1/connections
   */
  queryConnections = (
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
        connections?: {
          id?: string;
          client_id?: string;
          versions?: { identifier?: string; features?: string[] }[];
          state?: "STATE_UNINITIALIZED_UNSPECIFIED" | "STATE_INIT" | "STATE_TRYOPEN" | "STATE_OPEN";
          counterparty?: { client_id?: string; connection_id?: string; prefix?: { key_prefix?: string } };
          delay_period?: string;
        }[];
        pagination?: { next_key?: string; total?: string };
        height?: { revision_number?: string; revision_height?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/ibc/core/connection/v1/connections`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryConnection
   * @request GET:/ibc/core/connection/v1/connections/{connection_id}
   */
  queryConnection = (connectionId: string, params: RequestParams = {}) =>
    this.request<
      {
        connection?: {
          client_id?: string;
          versions?: { identifier?: string; features?: string[] }[];
          state?: "STATE_UNINITIALIZED_UNSPECIFIED" | "STATE_INIT" | "STATE_TRYOPEN" | "STATE_OPEN";
          counterparty?: { client_id?: string; connection_id?: string; prefix?: { key_prefix?: string } };
          delay_period?: string;
        };
        proof?: string;
        proof_height?: { revision_number?: string; revision_height?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/ibc/core/connection/v1/connections/${connectionId}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryConnectionClientState
   * @request GET:/ibc/core/connection/v1/connections/{connection_id}/client_state
   */
  queryConnectionClientState = (connectionId: string, params: RequestParams = {}) =>
    this.request<
      {
        identified_client_state?: { client_id?: string; client_state?: { "@type"?: string } };
        proof?: string;
        proof_height?: { revision_number?: string; revision_height?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/ibc/core/connection/v1/connections/${connectionId}/client_state`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryConnectionConsensusState
   * @request GET:/ibc/core/connection/v1/connections/{connection_id}/consensus_state/revision/{revision_number}/height/{revision_height}
   */
  queryConnectionConsensusState = (
    connectionId: string,
    revisionNumber: string,
    revisionHeight: string,
    params: RequestParams = {},
  ) =>
    this.request<
      {
        consensus_state?: { "@type"?: string };
        client_id?: string;
        proof?: string;
        proof_height?: { revision_number?: string; revision_height?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/ibc/core/connection/v1/connections/${connectionId}/consensus_state/revision/${revisionNumber}/height/${revisionHeight}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryConnectionParams
   * @request GET:/ibc/core/connection/v1/params
   */
  queryConnectionParams = (params: RequestParams = {}) =>
    this.request<
      { params?: { max_expected_time_per_block?: string } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/ibc/core/connection/v1/params`,
      method: "GET",
      ...params,
    });
}
