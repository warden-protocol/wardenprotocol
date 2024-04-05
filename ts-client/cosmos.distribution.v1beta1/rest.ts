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

export interface DecCoin {
  denom?: string;
  amount?: string;
}

export interface DelegationDelegatorReward {
  validator_address?: string;
  reward?: { denom?: string; amount?: string }[];
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

export interface QueryCommunityPoolResponse {
  pool?: { denom?: string; amount?: string }[];
}

export interface QueryDelegationRewardsResponse {
  rewards?: { denom?: string; amount?: string }[];
}

export interface QueryDelegationTotalRewardsResponse {
  rewards?: { validator_address?: string; reward?: { denom?: string; amount?: string }[] }[];
  total?: { denom?: string; amount?: string }[];
}

export interface QueryDelegatorValidatorsResponse {
  validators?: string[];
}

export interface QueryDelegatorWithdrawAddressResponse {
  withdraw_address?: string;
}

export interface QueryParamsResponse {
  params?: {
    community_tax?: string;
    base_proposer_reward?: string;
    bonus_proposer_reward?: string;
    withdraw_addr_enabled?: boolean;
  };
}

export interface QueryValidatorCommissionResponse {
  commission?: { commission?: { denom?: string; amount?: string }[] };
}

export interface QueryValidatorDistributionInfoResponse {
  operator_address?: string;
  self_bond_rewards?: { denom?: string; amount?: string }[];
  commission?: { denom?: string; amount?: string }[];
}

export interface QueryValidatorOutstandingRewardsResponse {
  rewards?: { rewards?: { denom?: string; amount?: string }[] };
}

export interface QueryValidatorSlashesResponse {
  slashes?: { validator_period?: string; fraction?: string }[];
  pagination?: { next_key?: string; total?: string };
}

export interface ValidatorAccumulatedCommission {
  commission?: { denom?: string; amount?: string }[];
}

export interface ValidatorSlashEvent {
  /** @format uint64 */
  validator_period?: string;
  fraction?: string;
}

export interface V1Beta1Params {
  community_tax?: string;
  base_proposer_reward?: string;
  bonus_proposer_reward?: string;
  withdraw_addr_enabled?: boolean;
}

export interface V1Beta1ValidatorOutstandingRewards {
  rewards?: { denom?: string; amount?: string }[];
}

export interface Coin {
  denom?: string;
  amount?: string;
}

export type MsgCommunityPoolSpendResponse = object;

export type MsgDepositValidatorRewardsPoolResponse = object;

export type MsgFundCommunityPoolResponse = object;

export type MsgSetWithdrawAddressResponse = object;

export type MsgUpdateParamsResponse = object;

export interface MsgWithdrawDelegatorRewardResponse {
  amount?: { denom?: string; amount?: string }[];
}

export interface MsgWithdrawValidatorCommissionResponse {
  amount?: { denom?: string; amount?: string }[];
}

export interface Params {
  community_tax?: string;
  base_proposer_reward?: string;
  bonus_proposer_reward?: string;
  withdraw_addr_enabled?: boolean;
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
 * @title HTTP API Console cosmos.distribution.v1beta1
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Query
   * @name QueryCommunityPool
   * @request GET:/cosmos/distribution/v1beta1/community_pool
   */
  queryCommunityPool = (params: RequestParams = {}) =>
    this.request<
      { pool?: { denom?: string; amount?: string }[] },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/distribution/v1beta1/community_pool`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryDelegationTotalRewards
   * @request GET:/cosmos/distribution/v1beta1/delegators/{delegator_address}/rewards
   */
  queryDelegationTotalRewards = (delegatorAddress: string, params: RequestParams = {}) =>
    this.request<
      {
        rewards?: { validator_address?: string; reward?: { denom?: string; amount?: string }[] }[];
        total?: { denom?: string; amount?: string }[];
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/distribution/v1beta1/delegators/${delegatorAddress}/rewards`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryDelegationRewards
   * @request GET:/cosmos/distribution/v1beta1/delegators/{delegator_address}/rewards/{validator_address}
   */
  queryDelegationRewards = (delegatorAddress: string, validatorAddress: string, params: RequestParams = {}) =>
    this.request<
      { rewards?: { denom?: string; amount?: string }[] },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/distribution/v1beta1/delegators/${delegatorAddress}/rewards/${validatorAddress}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryDelegatorValidators
   * @request GET:/cosmos/distribution/v1beta1/delegators/{delegator_address}/validators
   */
  queryDelegatorValidators = (delegatorAddress: string, params: RequestParams = {}) =>
    this.request<{ validators?: string[] }, { code?: number; message?: string; details?: { "@type"?: string }[] }>({
      path: `/cosmos/distribution/v1beta1/delegators/${delegatorAddress}/validators`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryDelegatorWithdrawAddress
   * @request GET:/cosmos/distribution/v1beta1/delegators/{delegator_address}/withdraw_address
   */
  queryDelegatorWithdrawAddress = (delegatorAddress: string, params: RequestParams = {}) =>
    this.request<{ withdraw_address?: string }, { code?: number; message?: string; details?: { "@type"?: string }[] }>({
      path: `/cosmos/distribution/v1beta1/delegators/${delegatorAddress}/withdraw_address`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryParams
   * @request GET:/cosmos/distribution/v1beta1/params
   */
  queryParams = (params: RequestParams = {}) =>
    this.request<
      {
        params?: {
          community_tax?: string;
          base_proposer_reward?: string;
          bonus_proposer_reward?: string;
          withdraw_addr_enabled?: boolean;
        };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/distribution/v1beta1/params`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryValidatorDistributionInfo
   * @request GET:/cosmos/distribution/v1beta1/validators/{validator_address}
   */
  queryValidatorDistributionInfo = (validatorAddress: string, params: RequestParams = {}) =>
    this.request<
      {
        operator_address?: string;
        self_bond_rewards?: { denom?: string; amount?: string }[];
        commission?: { denom?: string; amount?: string }[];
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/distribution/v1beta1/validators/${validatorAddress}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryValidatorCommission
   * @request GET:/cosmos/distribution/v1beta1/validators/{validator_address}/commission
   */
  queryValidatorCommission = (validatorAddress: string, params: RequestParams = {}) =>
    this.request<
      { commission?: { commission?: { denom?: string; amount?: string }[] } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/distribution/v1beta1/validators/${validatorAddress}/commission`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryValidatorOutstandingRewards
   * @request GET:/cosmos/distribution/v1beta1/validators/{validator_address}/outstanding_rewards
   */
  queryValidatorOutstandingRewards = (validatorAddress: string, params: RequestParams = {}) =>
    this.request<
      { rewards?: { rewards?: { denom?: string; amount?: string }[] } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/distribution/v1beta1/validators/${validatorAddress}/outstanding_rewards`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryValidatorSlashes
   * @request GET:/cosmos/distribution/v1beta1/validators/{validator_address}/slashes
   */
  queryValidatorSlashes = (
    validatorAddress: string,
    query?: {
      starting_height?: string;
      ending_height?: string;
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
        slashes?: { validator_period?: string; fraction?: string }[];
        pagination?: { next_key?: string; total?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/distribution/v1beta1/validators/${validatorAddress}/slashes`,
      method: "GET",
      query: query,
      ...params,
    });
}
