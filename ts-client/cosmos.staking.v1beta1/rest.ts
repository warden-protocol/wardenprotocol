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

export interface BlockID {
  /** @format byte */
  hash?: string;
  part_set_header?: { total?: number; hash?: string };
}

export enum BondStatus {
  BOND_STATUS_UNSPECIFIED = "BOND_STATUS_UNSPECIFIED",
  BOND_STATUS_UNBONDED = "BOND_STATUS_UNBONDED",
  BOND_STATUS_UNBONDING = "BOND_STATUS_UNBONDING",
  BOND_STATUS_BONDED = "BOND_STATUS_BONDED",
}

export interface Coin {
  denom?: string;
  amount?: string;
}

export interface Commission {
  commission_rates?: { rate?: string; max_rate?: string; max_change_rate?: string };

  /** @format date-time */
  update_time?: string;
}

export interface CommissionRates {
  rate?: string;
  max_rate?: string;
  max_change_rate?: string;
}

export interface Consensus {
  /** @format uint64 */
  block?: string;

  /** @format uint64 */
  app?: string;
}

export interface DelegationResponse {
  delegation?: { delegator_address?: string; validator_address?: string; shares?: string };
  balance?: { denom?: string; amount?: string };
}

export interface Description {
  moniker?: string;
  identity?: string;
  website?: string;
  security_contact?: string;
  details?: string;
}

export interface Header {
  version?: { block?: string; app?: string };
  chain_id?: string;

  /** @format int64 */
  height?: string;

  /** @format date-time */
  time?: string;
  last_block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };

  /** @format byte */
  last_commit_hash?: string;

  /** @format byte */
  data_hash?: string;

  /** @format byte */
  validators_hash?: string;

  /** @format byte */
  next_validators_hash?: string;

  /** @format byte */
  consensus_hash?: string;

  /** @format byte */
  app_hash?: string;

  /** @format byte */
  last_results_hash?: string;

  /** @format byte */
  evidence_hash?: string;

  /** @format byte */
  proposer_address?: string;
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

export interface PartSetHeader {
  /** @format int64 */
  total?: number;

  /** @format byte */
  hash?: string;
}

export interface QueryDelegationResponse {
  delegation_response?: {
    delegation?: { delegator_address?: string; validator_address?: string; shares?: string };
    balance?: { denom?: string; amount?: string };
  };
}

export interface QueryDelegatorDelegationsResponse {
  delegation_responses?: {
    delegation?: { delegator_address?: string; validator_address?: string; shares?: string };
    balance?: { denom?: string; amount?: string };
  }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryDelegatorUnbondingDelegationsResponse {
  unbonding_responses?: {
    delegator_address?: string;
    validator_address?: string;
    entries?: {
      creation_height?: string;
      completion_time?: string;
      initial_balance?: string;
      balance?: string;
      unbonding_id?: string;
      unbonding_on_hold_ref_count?: string;
    }[];
  }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryDelegatorValidatorResponse {
  validator?: {
    operator_address?: string;
    consensus_pubkey?: { "@type"?: string };
    jailed?: boolean;
    status?: "BOND_STATUS_UNSPECIFIED" | "BOND_STATUS_UNBONDED" | "BOND_STATUS_UNBONDING" | "BOND_STATUS_BONDED";
    tokens?: string;
    delegator_shares?: string;
    description?: {
      moniker?: string;
      identity?: string;
      website?: string;
      security_contact?: string;
      details?: string;
    };
    unbonding_height?: string;
    unbonding_time?: string;
    commission?: {
      commission_rates?: { rate?: string; max_rate?: string; max_change_rate?: string };
      update_time?: string;
    };
    min_self_delegation?: string;
    unbonding_on_hold_ref_count?: string;
    unbonding_ids?: string[];
  };
}

export interface QueryDelegatorValidatorsResponse {
  validators?: {
    operator_address?: string;
    consensus_pubkey?: { "@type"?: string };
    jailed?: boolean;
    status?: "BOND_STATUS_UNSPECIFIED" | "BOND_STATUS_UNBONDED" | "BOND_STATUS_UNBONDING" | "BOND_STATUS_BONDED";
    tokens?: string;
    delegator_shares?: string;
    description?: {
      moniker?: string;
      identity?: string;
      website?: string;
      security_contact?: string;
      details?: string;
    };
    unbonding_height?: string;
    unbonding_time?: string;
    commission?: {
      commission_rates?: { rate?: string; max_rate?: string; max_change_rate?: string };
      update_time?: string;
    };
    min_self_delegation?: string;
    unbonding_on_hold_ref_count?: string;
    unbonding_ids?: string[];
  }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryHistoricalInfoResponse {
  hist?: {
    header?: {
      version?: { block?: string; app?: string };
      chain_id?: string;
      height?: string;
      time?: string;
      last_block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };
      last_commit_hash?: string;
      data_hash?: string;
      validators_hash?: string;
      next_validators_hash?: string;
      consensus_hash?: string;
      app_hash?: string;
      last_results_hash?: string;
      evidence_hash?: string;
      proposer_address?: string;
    };
    valset?: {
      operator_address?: string;
      consensus_pubkey?: { "@type"?: string };
      jailed?: boolean;
      status?: "BOND_STATUS_UNSPECIFIED" | "BOND_STATUS_UNBONDED" | "BOND_STATUS_UNBONDING" | "BOND_STATUS_BONDED";
      tokens?: string;
      delegator_shares?: string;
      description?: {
        moniker?: string;
        identity?: string;
        website?: string;
        security_contact?: string;
        details?: string;
      };
      unbonding_height?: string;
      unbonding_time?: string;
      commission?: {
        commission_rates?: { rate?: string; max_rate?: string; max_change_rate?: string };
        update_time?: string;
      };
      min_self_delegation?: string;
      unbonding_on_hold_ref_count?: string;
      unbonding_ids?: string[];
    }[];
  };
}

export interface QueryParamsResponse {
  params?: {
    unbonding_time?: string;
    max_validators?: number;
    max_entries?: number;
    historical_entries?: number;
    bond_denom?: string;
    min_commission_rate?: string;
  };
}

export interface QueryPoolResponse {
  pool?: { not_bonded_tokens?: string; bonded_tokens?: string };
}

export interface QueryRedelegationsResponse {
  redelegation_responses?: {
    redelegation?: {
      delegator_address?: string;
      validator_src_address?: string;
      validator_dst_address?: string;
      entries?: {
        creation_height?: string;
        completion_time?: string;
        initial_balance?: string;
        shares_dst?: string;
        unbonding_id?: string;
        unbonding_on_hold_ref_count?: string;
      }[];
    };
    entries?: {
      redelegation_entry?: {
        creation_height?: string;
        completion_time?: string;
        initial_balance?: string;
        shares_dst?: string;
        unbonding_id?: string;
        unbonding_on_hold_ref_count?: string;
      };
      balance?: string;
    }[];
  }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryUnbondingDelegationResponse {
  unbond?: {
    delegator_address?: string;
    validator_address?: string;
    entries?: {
      creation_height?: string;
      completion_time?: string;
      initial_balance?: string;
      balance?: string;
      unbonding_id?: string;
      unbonding_on_hold_ref_count?: string;
    }[];
  };
}

export interface QueryValidatorDelegationsResponse {
  delegation_responses?: {
    delegation?: { delegator_address?: string; validator_address?: string; shares?: string };
    balance?: { denom?: string; amount?: string };
  }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryValidatorResponse {
  validator?: {
    operator_address?: string;
    consensus_pubkey?: { "@type"?: string };
    jailed?: boolean;
    status?: "BOND_STATUS_UNSPECIFIED" | "BOND_STATUS_UNBONDED" | "BOND_STATUS_UNBONDING" | "BOND_STATUS_BONDED";
    tokens?: string;
    delegator_shares?: string;
    description?: {
      moniker?: string;
      identity?: string;
      website?: string;
      security_contact?: string;
      details?: string;
    };
    unbonding_height?: string;
    unbonding_time?: string;
    commission?: {
      commission_rates?: { rate?: string; max_rate?: string; max_change_rate?: string };
      update_time?: string;
    };
    min_self_delegation?: string;
    unbonding_on_hold_ref_count?: string;
    unbonding_ids?: string[];
  };
}

export interface QueryValidatorUnbondingDelegationsResponse {
  unbonding_responses?: {
    delegator_address?: string;
    validator_address?: string;
    entries?: {
      creation_height?: string;
      completion_time?: string;
      initial_balance?: string;
      balance?: string;
      unbonding_id?: string;
      unbonding_on_hold_ref_count?: string;
    }[];
  }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryValidatorsResponse {
  validators?: {
    operator_address?: string;
    consensus_pubkey?: { "@type"?: string };
    jailed?: boolean;
    status?: "BOND_STATUS_UNSPECIFIED" | "BOND_STATUS_UNBONDED" | "BOND_STATUS_UNBONDING" | "BOND_STATUS_BONDED";
    tokens?: string;
    delegator_shares?: string;
    description?: {
      moniker?: string;
      identity?: string;
      website?: string;
      security_contact?: string;
      details?: string;
    };
    unbonding_height?: string;
    unbonding_time?: string;
    commission?: {
      commission_rates?: { rate?: string; max_rate?: string; max_change_rate?: string };
      update_time?: string;
    };
    min_self_delegation?: string;
    unbonding_on_hold_ref_count?: string;
    unbonding_ids?: string[];
  }[];
  pagination?: { next_key?: string; total?: string };
}

export interface Redelegation {
  delegator_address?: string;
  validator_src_address?: string;
  validator_dst_address?: string;
  entries?: {
    creation_height?: string;
    completion_time?: string;
    initial_balance?: string;
    shares_dst?: string;
    unbonding_id?: string;
    unbonding_on_hold_ref_count?: string;
  }[];
}

export interface RedelegationEntry {
  /** @format int64 */
  creation_height?: string;

  /** @format date-time */
  completion_time?: string;
  initial_balance?: string;
  shares_dst?: string;

  /** @format uint64 */
  unbonding_id?: string;

  /** @format int64 */
  unbonding_on_hold_ref_count?: string;
}

export interface RedelegationEntryResponse {
  redelegation_entry?: {
    creation_height?: string;
    completion_time?: string;
    initial_balance?: string;
    shares_dst?: string;
    unbonding_id?: string;
    unbonding_on_hold_ref_count?: string;
  };
  balance?: string;
}

export interface RedelegationResponse {
  redelegation?: {
    delegator_address?: string;
    validator_src_address?: string;
    validator_dst_address?: string;
    entries?: {
      creation_height?: string;
      completion_time?: string;
      initial_balance?: string;
      shares_dst?: string;
      unbonding_id?: string;
      unbonding_on_hold_ref_count?: string;
    }[];
  };
  entries?: {
    redelegation_entry?: {
      creation_height?: string;
      completion_time?: string;
      initial_balance?: string;
      shares_dst?: string;
      unbonding_id?: string;
      unbonding_on_hold_ref_count?: string;
    };
    balance?: string;
  }[];
}

export interface UnbondingDelegationEntry {
  /** @format int64 */
  creation_height?: string;

  /** @format date-time */
  completion_time?: string;
  initial_balance?: string;
  balance?: string;

  /** @format uint64 */
  unbonding_id?: string;

  /** @format int64 */
  unbonding_on_hold_ref_count?: string;
}

export interface V1Beta1Delegation {
  delegator_address?: string;
  validator_address?: string;
  shares?: string;
}

export interface V1Beta1HistoricalInfo {
  header?: {
    version?: { block?: string; app?: string };
    chain_id?: string;
    height?: string;
    time?: string;
    last_block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };
    last_commit_hash?: string;
    data_hash?: string;
    validators_hash?: string;
    next_validators_hash?: string;
    consensus_hash?: string;
    app_hash?: string;
    last_results_hash?: string;
    evidence_hash?: string;
    proposer_address?: string;
  };
  valset?: {
    operator_address?: string;
    consensus_pubkey?: { "@type"?: string };
    jailed?: boolean;
    status?: "BOND_STATUS_UNSPECIFIED" | "BOND_STATUS_UNBONDED" | "BOND_STATUS_UNBONDING" | "BOND_STATUS_BONDED";
    tokens?: string;
    delegator_shares?: string;
    description?: {
      moniker?: string;
      identity?: string;
      website?: string;
      security_contact?: string;
      details?: string;
    };
    unbonding_height?: string;
    unbonding_time?: string;
    commission?: {
      commission_rates?: { rate?: string; max_rate?: string; max_change_rate?: string };
      update_time?: string;
    };
    min_self_delegation?: string;
    unbonding_on_hold_ref_count?: string;
    unbonding_ids?: string[];
  }[];
}

export interface V1Beta1Params {
  unbonding_time?: string;

  /** @format int64 */
  max_validators?: number;

  /** @format int64 */
  max_entries?: number;

  /** @format int64 */
  historical_entries?: number;
  bond_denom?: string;
  min_commission_rate?: string;
}

export interface V1Beta1Pool {
  not_bonded_tokens?: string;
  bonded_tokens?: string;
}

export interface V1Beta1UnbondingDelegation {
  delegator_address?: string;
  validator_address?: string;
  entries?: {
    creation_height?: string;
    completion_time?: string;
    initial_balance?: string;
    balance?: string;
    unbonding_id?: string;
    unbonding_on_hold_ref_count?: string;
  }[];
}

export interface V1Beta1Validator {
  operator_address?: string;
  consensus_pubkey?: { "@type"?: string };
  jailed?: boolean;
  status?: "BOND_STATUS_UNSPECIFIED" | "BOND_STATUS_UNBONDED" | "BOND_STATUS_UNBONDING" | "BOND_STATUS_BONDED";
  tokens?: string;
  delegator_shares?: string;
  description?: { moniker?: string; identity?: string; website?: string; security_contact?: string; details?: string };

  /** @format int64 */
  unbonding_height?: string;

  /** @format date-time */
  unbonding_time?: string;
  commission?: {
    commission_rates?: { rate?: string; max_rate?: string; max_change_rate?: string };
    update_time?: string;
  };
  min_self_delegation?: string;

  /** @format int64 */
  unbonding_on_hold_ref_count?: string;
  unbonding_ids?: string[];
}

export interface MsgBeginRedelegateResponse {
  /** @format date-time */
  completion_time?: string;
}

export type MsgCancelUnbondingDelegationResponse = object;

export type MsgCreateValidatorResponse = object;

export type MsgDelegateResponse = object;

export type MsgEditValidatorResponse = object;

export interface MsgUndelegateResponse {
  /** @format date-time */
  completion_time?: string;
  amount?: { denom?: string; amount?: string };
}

export type MsgUpdateParamsResponse = object;

export interface Params {
  unbonding_time?: string;

  /** @format int64 */
  max_validators?: number;

  /** @format int64 */
  max_entries?: number;

  /** @format int64 */
  historical_entries?: number;
  bond_denom?: string;
  min_commission_rate?: string;
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
 * @title HTTP API Console cosmos.staking.v1beta1
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Query
   * @name QueryDelegatorDelegations
   * @request GET:/cosmos/staking/v1beta1/delegations/{delegator_addr}
   */
  queryDelegatorDelegations = (
    delegatorAddr: string,
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
        delegation_responses?: {
          delegation?: { delegator_address?: string; validator_address?: string; shares?: string };
          balance?: { denom?: string; amount?: string };
        }[];
        pagination?: { next_key?: string; total?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/staking/v1beta1/delegations/${delegatorAddr}`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryRedelegations
   * @request GET:/cosmos/staking/v1beta1/delegators/{delegator_addr}/redelegations
   */
  queryRedelegations = (
    delegatorAddr: string,
    query?: {
      src_validator_addr?: string;
      dst_validator_addr?: string;
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
        redelegation_responses?: {
          redelegation?: {
            delegator_address?: string;
            validator_src_address?: string;
            validator_dst_address?: string;
            entries?: {
              creation_height?: string;
              completion_time?: string;
              initial_balance?: string;
              shares_dst?: string;
              unbonding_id?: string;
              unbonding_on_hold_ref_count?: string;
            }[];
          };
          entries?: {
            redelegation_entry?: {
              creation_height?: string;
              completion_time?: string;
              initial_balance?: string;
              shares_dst?: string;
              unbonding_id?: string;
              unbonding_on_hold_ref_count?: string;
            };
            balance?: string;
          }[];
        }[];
        pagination?: { next_key?: string; total?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/staking/v1beta1/delegators/${delegatorAddr}/redelegations`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryDelegatorUnbondingDelegations
   * @request GET:/cosmos/staking/v1beta1/delegators/{delegator_addr}/unbonding_delegations
   */
  queryDelegatorUnbondingDelegations = (
    delegatorAddr: string,
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
        unbonding_responses?: {
          delegator_address?: string;
          validator_address?: string;
          entries?: {
            creation_height?: string;
            completion_time?: string;
            initial_balance?: string;
            balance?: string;
            unbonding_id?: string;
            unbonding_on_hold_ref_count?: string;
          }[];
        }[];
        pagination?: { next_key?: string; total?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/staking/v1beta1/delegators/${delegatorAddr}/unbonding_delegations`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryDelegatorValidators
   * @request GET:/cosmos/staking/v1beta1/delegators/{delegator_addr}/validators
   */
  queryDelegatorValidators = (
    delegatorAddr: string,
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
        validators?: {
          operator_address?: string;
          consensus_pubkey?: { "@type"?: string };
          jailed?: boolean;
          status?: "BOND_STATUS_UNSPECIFIED" | "BOND_STATUS_UNBONDED" | "BOND_STATUS_UNBONDING" | "BOND_STATUS_BONDED";
          tokens?: string;
          delegator_shares?: string;
          description?: {
            moniker?: string;
            identity?: string;
            website?: string;
            security_contact?: string;
            details?: string;
          };
          unbonding_height?: string;
          unbonding_time?: string;
          commission?: {
            commission_rates?: { rate?: string; max_rate?: string; max_change_rate?: string };
            update_time?: string;
          };
          min_self_delegation?: string;
          unbonding_on_hold_ref_count?: string;
          unbonding_ids?: string[];
        }[];
        pagination?: { next_key?: string; total?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/staking/v1beta1/delegators/${delegatorAddr}/validators`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryDelegatorValidator
   * @request GET:/cosmos/staking/v1beta1/delegators/{delegator_addr}/validators/{validator_addr}
   */
  queryDelegatorValidator = (delegatorAddr: string, validatorAddr: string, params: RequestParams = {}) =>
    this.request<
      {
        validator?: {
          operator_address?: string;
          consensus_pubkey?: { "@type"?: string };
          jailed?: boolean;
          status?: "BOND_STATUS_UNSPECIFIED" | "BOND_STATUS_UNBONDED" | "BOND_STATUS_UNBONDING" | "BOND_STATUS_BONDED";
          tokens?: string;
          delegator_shares?: string;
          description?: {
            moniker?: string;
            identity?: string;
            website?: string;
            security_contact?: string;
            details?: string;
          };
          unbonding_height?: string;
          unbonding_time?: string;
          commission?: {
            commission_rates?: { rate?: string; max_rate?: string; max_change_rate?: string };
            update_time?: string;
          };
          min_self_delegation?: string;
          unbonding_on_hold_ref_count?: string;
          unbonding_ids?: string[];
        };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/staking/v1beta1/delegators/${delegatorAddr}/validators/${validatorAddr}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryHistoricalInfo
   * @request GET:/cosmos/staking/v1beta1/historical_info/{height}
   */
  queryHistoricalInfo = (height: string, params: RequestParams = {}) =>
    this.request<
      {
        hist?: {
          header?: {
            version?: { block?: string; app?: string };
            chain_id?: string;
            height?: string;
            time?: string;
            last_block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };
            last_commit_hash?: string;
            data_hash?: string;
            validators_hash?: string;
            next_validators_hash?: string;
            consensus_hash?: string;
            app_hash?: string;
            last_results_hash?: string;
            evidence_hash?: string;
            proposer_address?: string;
          };
          valset?: {
            operator_address?: string;
            consensus_pubkey?: { "@type"?: string };
            jailed?: boolean;
            status?:
              | "BOND_STATUS_UNSPECIFIED"
              | "BOND_STATUS_UNBONDED"
              | "BOND_STATUS_UNBONDING"
              | "BOND_STATUS_BONDED";
            tokens?: string;
            delegator_shares?: string;
            description?: {
              moniker?: string;
              identity?: string;
              website?: string;
              security_contact?: string;
              details?: string;
            };
            unbonding_height?: string;
            unbonding_time?: string;
            commission?: {
              commission_rates?: { rate?: string; max_rate?: string; max_change_rate?: string };
              update_time?: string;
            };
            min_self_delegation?: string;
            unbonding_on_hold_ref_count?: string;
            unbonding_ids?: string[];
          }[];
        };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/staking/v1beta1/historical_info/${height}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryParams
   * @request GET:/cosmos/staking/v1beta1/params
   */
  queryParams = (params: RequestParams = {}) =>
    this.request<
      {
        params?: {
          unbonding_time?: string;
          max_validators?: number;
          max_entries?: number;
          historical_entries?: number;
          bond_denom?: string;
          min_commission_rate?: string;
        };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/staking/v1beta1/params`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryPool
   * @request GET:/cosmos/staking/v1beta1/pool
   */
  queryPool = (params: RequestParams = {}) =>
    this.request<
      { pool?: { not_bonded_tokens?: string; bonded_tokens?: string } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/staking/v1beta1/pool`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryValidators
   * @request GET:/cosmos/staking/v1beta1/validators
   */
  queryValidators = (
    query?: {
      status?: string;
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
        validators?: {
          operator_address?: string;
          consensus_pubkey?: { "@type"?: string };
          jailed?: boolean;
          status?: "BOND_STATUS_UNSPECIFIED" | "BOND_STATUS_UNBONDED" | "BOND_STATUS_UNBONDING" | "BOND_STATUS_BONDED";
          tokens?: string;
          delegator_shares?: string;
          description?: {
            moniker?: string;
            identity?: string;
            website?: string;
            security_contact?: string;
            details?: string;
          };
          unbonding_height?: string;
          unbonding_time?: string;
          commission?: {
            commission_rates?: { rate?: string; max_rate?: string; max_change_rate?: string };
            update_time?: string;
          };
          min_self_delegation?: string;
          unbonding_on_hold_ref_count?: string;
          unbonding_ids?: string[];
        }[];
        pagination?: { next_key?: string; total?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/staking/v1beta1/validators`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryValidator
   * @request GET:/cosmos/staking/v1beta1/validators/{validator_addr}
   */
  queryValidator = (validatorAddr: string, params: RequestParams = {}) =>
    this.request<
      {
        validator?: {
          operator_address?: string;
          consensus_pubkey?: { "@type"?: string };
          jailed?: boolean;
          status?: "BOND_STATUS_UNSPECIFIED" | "BOND_STATUS_UNBONDED" | "BOND_STATUS_UNBONDING" | "BOND_STATUS_BONDED";
          tokens?: string;
          delegator_shares?: string;
          description?: {
            moniker?: string;
            identity?: string;
            website?: string;
            security_contact?: string;
            details?: string;
          };
          unbonding_height?: string;
          unbonding_time?: string;
          commission?: {
            commission_rates?: { rate?: string; max_rate?: string; max_change_rate?: string };
            update_time?: string;
          };
          min_self_delegation?: string;
          unbonding_on_hold_ref_count?: string;
          unbonding_ids?: string[];
        };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/staking/v1beta1/validators/${validatorAddr}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryValidatorDelegations
   * @request GET:/cosmos/staking/v1beta1/validators/{validator_addr}/delegations
   */
  queryValidatorDelegations = (
    validatorAddr: string,
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
        delegation_responses?: {
          delegation?: { delegator_address?: string; validator_address?: string; shares?: string };
          balance?: { denom?: string; amount?: string };
        }[];
        pagination?: { next_key?: string; total?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/staking/v1beta1/validators/${validatorAddr}/delegations`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryDelegation
   * @request GET:/cosmos/staking/v1beta1/validators/{validator_addr}/delegations/{delegator_addr}
   */
  queryDelegation = (validatorAddr: string, delegatorAddr: string, params: RequestParams = {}) =>
    this.request<
      {
        delegation_response?: {
          delegation?: { delegator_address?: string; validator_address?: string; shares?: string };
          balance?: { denom?: string; amount?: string };
        };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/staking/v1beta1/validators/${validatorAddr}/delegations/${delegatorAddr}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryUnbondingDelegation
   * @request GET:/cosmos/staking/v1beta1/validators/{validator_addr}/delegations/{delegator_addr}/unbonding_delegation
   */
  queryUnbondingDelegation = (validatorAddr: string, delegatorAddr: string, params: RequestParams = {}) =>
    this.request<
      {
        unbond?: {
          delegator_address?: string;
          validator_address?: string;
          entries?: {
            creation_height?: string;
            completion_time?: string;
            initial_balance?: string;
            balance?: string;
            unbonding_id?: string;
            unbonding_on_hold_ref_count?: string;
          }[];
        };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/staking/v1beta1/validators/${validatorAddr}/delegations/${delegatorAddr}/unbonding_delegation`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryValidatorUnbondingDelegations
   * @request GET:/cosmos/staking/v1beta1/validators/{validator_addr}/unbonding_delegations
   */
  queryValidatorUnbondingDelegations = (
    validatorAddr: string,
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
        unbonding_responses?: {
          delegator_address?: string;
          validator_address?: string;
          entries?: {
            creation_height?: string;
            completion_time?: string;
            initial_balance?: string;
            balance?: string;
            unbonding_id?: string;
            unbonding_on_hold_ref_count?: string;
          }[];
        }[];
        pagination?: { next_key?: string; total?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/staking/v1beta1/validators/${validatorAddr}/unbonding_delegations`,
      method: "GET",
      query: query,
      ...params,
    });
}
