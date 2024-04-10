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

export interface DepositParams {
  min_deposit?: { denom?: string; amount?: string }[];
  max_deposit_period?: string;
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

export enum ProposalStatus {
  PROPOSAL_STATUS_UNSPECIFIED = "PROPOSAL_STATUS_UNSPECIFIED",
  PROPOSAL_STATUS_DEPOSIT_PERIOD = "PROPOSAL_STATUS_DEPOSIT_PERIOD",
  PROPOSAL_STATUS_VOTING_PERIOD = "PROPOSAL_STATUS_VOTING_PERIOD",
  PROPOSAL_STATUS_PASSED = "PROPOSAL_STATUS_PASSED",
  PROPOSAL_STATUS_REJECTED = "PROPOSAL_STATUS_REJECTED",
  PROPOSAL_STATUS_FAILED = "PROPOSAL_STATUS_FAILED",
}

export interface QueryDepositResponse {
  deposit?: { proposal_id?: string; depositor?: string; amount?: { denom?: string; amount?: string }[] };
}

export interface QueryDepositsResponse {
  deposits?: { proposal_id?: string; depositor?: string; amount?: { denom?: string; amount?: string }[] }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryParamsResponse {
  voting_params?: { voting_period?: string };
  deposit_params?: { min_deposit?: { denom?: string; amount?: string }[]; max_deposit_period?: string };
  tally_params?: { quorum?: string; threshold?: string; veto_threshold?: string };
}

export interface QueryProposalResponse {
  proposal?: {
    proposal_id?: string;
    content?: { "@type"?: string };
    status?:
      | "PROPOSAL_STATUS_UNSPECIFIED"
      | "PROPOSAL_STATUS_DEPOSIT_PERIOD"
      | "PROPOSAL_STATUS_VOTING_PERIOD"
      | "PROPOSAL_STATUS_PASSED"
      | "PROPOSAL_STATUS_REJECTED"
      | "PROPOSAL_STATUS_FAILED";
    final_tally_result?: { yes?: string; abstain?: string; no?: string; no_with_veto?: string };
    submit_time?: string;
    deposit_end_time?: string;
    total_deposit?: { denom?: string; amount?: string }[];
    voting_start_time?: string;
    voting_end_time?: string;
  };
}

export interface QueryProposalsResponse {
  proposals?: {
    proposal_id?: string;
    content?: { "@type"?: string };
    status?:
      | "PROPOSAL_STATUS_UNSPECIFIED"
      | "PROPOSAL_STATUS_DEPOSIT_PERIOD"
      | "PROPOSAL_STATUS_VOTING_PERIOD"
      | "PROPOSAL_STATUS_PASSED"
      | "PROPOSAL_STATUS_REJECTED"
      | "PROPOSAL_STATUS_FAILED";
    final_tally_result?: { yes?: string; abstain?: string; no?: string; no_with_veto?: string };
    submit_time?: string;
    deposit_end_time?: string;
    total_deposit?: { denom?: string; amount?: string }[];
    voting_start_time?: string;
    voting_end_time?: string;
  }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryTallyResultResponse {
  tally?: { yes?: string; abstain?: string; no?: string; no_with_veto?: string };
}

export interface QueryVoteResponse {
  vote?: {
    proposal_id?: string;
    voter?: string;
    option?:
      | "VOTE_OPTION_UNSPECIFIED"
      | "VOTE_OPTION_YES"
      | "VOTE_OPTION_ABSTAIN"
      | "VOTE_OPTION_NO"
      | "VOTE_OPTION_NO_WITH_VETO";
    options?: {
      option?:
        | "VOTE_OPTION_UNSPECIFIED"
        | "VOTE_OPTION_YES"
        | "VOTE_OPTION_ABSTAIN"
        | "VOTE_OPTION_NO"
        | "VOTE_OPTION_NO_WITH_VETO";
      weight?: string;
    }[];
  };
}

export interface QueryVotesResponse {
  votes?: {
    proposal_id?: string;
    voter?: string;
    option?:
      | "VOTE_OPTION_UNSPECIFIED"
      | "VOTE_OPTION_YES"
      | "VOTE_OPTION_ABSTAIN"
      | "VOTE_OPTION_NO"
      | "VOTE_OPTION_NO_WITH_VETO";
    options?: {
      option?:
        | "VOTE_OPTION_UNSPECIFIED"
        | "VOTE_OPTION_YES"
        | "VOTE_OPTION_ABSTAIN"
        | "VOTE_OPTION_NO"
        | "VOTE_OPTION_NO_WITH_VETO";
      weight?: string;
    }[];
  }[];
  pagination?: { next_key?: string; total?: string };
}

export interface TallyParams {
  /** @format byte */
  quorum?: string;

  /** @format byte */
  threshold?: string;

  /** @format byte */
  veto_threshold?: string;
}

export enum VoteOption {
  VOTE_OPTION_UNSPECIFIED = "VOTE_OPTION_UNSPECIFIED",
  VOTE_OPTION_YES = "VOTE_OPTION_YES",
  VOTE_OPTION_ABSTAIN = "VOTE_OPTION_ABSTAIN",
  VOTE_OPTION_NO = "VOTE_OPTION_NO",
  VOTE_OPTION_NO_WITH_VETO = "VOTE_OPTION_NO_WITH_VETO",
}

export interface VotingParams {
  voting_period?: string;
}

export interface WeightedVoteOption {
  option?:
    | "VOTE_OPTION_UNSPECIFIED"
    | "VOTE_OPTION_YES"
    | "VOTE_OPTION_ABSTAIN"
    | "VOTE_OPTION_NO"
    | "VOTE_OPTION_NO_WITH_VETO";
  weight?: string;
}

export interface V1Beta1Deposit {
  /** @format uint64 */
  proposal_id?: string;
  depositor?: string;
  amount?: { denom?: string; amount?: string }[];
}

export interface V1Beta1Proposal {
  /** @format uint64 */
  proposal_id?: string;
  content?: { "@type"?: string };
  status?:
    | "PROPOSAL_STATUS_UNSPECIFIED"
    | "PROPOSAL_STATUS_DEPOSIT_PERIOD"
    | "PROPOSAL_STATUS_VOTING_PERIOD"
    | "PROPOSAL_STATUS_PASSED"
    | "PROPOSAL_STATUS_REJECTED"
    | "PROPOSAL_STATUS_FAILED";
  final_tally_result?: { yes?: string; abstain?: string; no?: string; no_with_veto?: string };

  /** @format date-time */
  submit_time?: string;

  /** @format date-time */
  deposit_end_time?: string;
  total_deposit?: { denom?: string; amount?: string }[];

  /** @format date-time */
  voting_start_time?: string;

  /** @format date-time */
  voting_end_time?: string;
}

export interface V1Beta1TallyResult {
  yes?: string;
  abstain?: string;
  no?: string;
  no_with_veto?: string;
}

export interface V1Beta1Vote {
  /** @format uint64 */
  proposal_id?: string;
  voter?: string;
  option?:
    | "VOTE_OPTION_UNSPECIFIED"
    | "VOTE_OPTION_YES"
    | "VOTE_OPTION_ABSTAIN"
    | "VOTE_OPTION_NO"
    | "VOTE_OPTION_NO_WITH_VETO";
  options?: {
    option?:
      | "VOTE_OPTION_UNSPECIFIED"
      | "VOTE_OPTION_YES"
      | "VOTE_OPTION_ABSTAIN"
      | "VOTE_OPTION_NO"
      | "VOTE_OPTION_NO_WITH_VETO";
    weight?: string;
  }[];
}

export type MsgDepositResponse = object;

export interface MsgSubmitProposalResponse {
  /** @format uint64 */
  proposal_id?: string;
}

export type MsgVoteResponse = object;

export type MsgVoteWeightedResponse = object;

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
 * @title HTTP API Console cosmos.gov.v1beta1
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Query
   * @name QueryParams
   * @request GET:/cosmos/gov/v1beta1/params/{params_type}
   */
  queryParams = (paramsType: string, params: RequestParams = {}) =>
    this.request<
      {
        voting_params?: { voting_period?: string };
        deposit_params?: { min_deposit?: { denom?: string; amount?: string }[]; max_deposit_period?: string };
        tally_params?: { quorum?: string; threshold?: string; veto_threshold?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/gov/v1beta1/params/${paramsType}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryProposals
   * @request GET:/cosmos/gov/v1beta1/proposals
   */
  queryProposals = (
    query?: {
      proposal_status?:
        | "PROPOSAL_STATUS_UNSPECIFIED"
        | "PROPOSAL_STATUS_DEPOSIT_PERIOD"
        | "PROPOSAL_STATUS_VOTING_PERIOD"
        | "PROPOSAL_STATUS_PASSED"
        | "PROPOSAL_STATUS_REJECTED"
        | "PROPOSAL_STATUS_FAILED";
      voter?: string;
      depositor?: string;
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
        proposals?: {
          proposal_id?: string;
          content?: { "@type"?: string };
          status?:
            | "PROPOSAL_STATUS_UNSPECIFIED"
            | "PROPOSAL_STATUS_DEPOSIT_PERIOD"
            | "PROPOSAL_STATUS_VOTING_PERIOD"
            | "PROPOSAL_STATUS_PASSED"
            | "PROPOSAL_STATUS_REJECTED"
            | "PROPOSAL_STATUS_FAILED";
          final_tally_result?: { yes?: string; abstain?: string; no?: string; no_with_veto?: string };
          submit_time?: string;
          deposit_end_time?: string;
          total_deposit?: { denom?: string; amount?: string }[];
          voting_start_time?: string;
          voting_end_time?: string;
        }[];
        pagination?: { next_key?: string; total?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/gov/v1beta1/proposals`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryProposal
   * @request GET:/cosmos/gov/v1beta1/proposals/{proposal_id}
   */
  queryProposal = (proposalId: string, params: RequestParams = {}) =>
    this.request<
      {
        proposal?: {
          proposal_id?: string;
          content?: { "@type"?: string };
          status?:
            | "PROPOSAL_STATUS_UNSPECIFIED"
            | "PROPOSAL_STATUS_DEPOSIT_PERIOD"
            | "PROPOSAL_STATUS_VOTING_PERIOD"
            | "PROPOSAL_STATUS_PASSED"
            | "PROPOSAL_STATUS_REJECTED"
            | "PROPOSAL_STATUS_FAILED";
          final_tally_result?: { yes?: string; abstain?: string; no?: string; no_with_veto?: string };
          submit_time?: string;
          deposit_end_time?: string;
          total_deposit?: { denom?: string; amount?: string }[];
          voting_start_time?: string;
          voting_end_time?: string;
        };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/gov/v1beta1/proposals/${proposalId}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryDeposits
   * @request GET:/cosmos/gov/v1beta1/proposals/{proposal_id}/deposits
   */
  queryDeposits = (
    proposalId: string,
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
        deposits?: { proposal_id?: string; depositor?: string; amount?: { denom?: string; amount?: string }[] }[];
        pagination?: { next_key?: string; total?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/gov/v1beta1/proposals/${proposalId}/deposits`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryDeposit
   * @request GET:/cosmos/gov/v1beta1/proposals/{proposal_id}/deposits/{depositor}
   */
  queryDeposit = (proposalId: string, depositor: string, params: RequestParams = {}) =>
    this.request<
      { deposit?: { proposal_id?: string; depositor?: string; amount?: { denom?: string; amount?: string }[] } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/gov/v1beta1/proposals/${proposalId}/deposits/${depositor}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryTallyResult
   * @request GET:/cosmos/gov/v1beta1/proposals/{proposal_id}/tally
   */
  queryTallyResult = (proposalId: string, params: RequestParams = {}) =>
    this.request<
      { tally?: { yes?: string; abstain?: string; no?: string; no_with_veto?: string } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/gov/v1beta1/proposals/${proposalId}/tally`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryVotes
   * @request GET:/cosmos/gov/v1beta1/proposals/{proposal_id}/votes
   */
  queryVotes = (
    proposalId: string,
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
        votes?: {
          proposal_id?: string;
          voter?: string;
          option?:
            | "VOTE_OPTION_UNSPECIFIED"
            | "VOTE_OPTION_YES"
            | "VOTE_OPTION_ABSTAIN"
            | "VOTE_OPTION_NO"
            | "VOTE_OPTION_NO_WITH_VETO";
          options?: {
            option?:
              | "VOTE_OPTION_UNSPECIFIED"
              | "VOTE_OPTION_YES"
              | "VOTE_OPTION_ABSTAIN"
              | "VOTE_OPTION_NO"
              | "VOTE_OPTION_NO_WITH_VETO";
            weight?: string;
          }[];
        }[];
        pagination?: { next_key?: string; total?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/gov/v1beta1/proposals/${proposalId}/votes`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryVote
   * @request GET:/cosmos/gov/v1beta1/proposals/{proposal_id}/votes/{voter}
   */
  queryVote = (proposalId: string, voter: string, params: RequestParams = {}) =>
    this.request<
      {
        vote?: {
          proposal_id?: string;
          voter?: string;
          option?:
            | "VOTE_OPTION_UNSPECIFIED"
            | "VOTE_OPTION_YES"
            | "VOTE_OPTION_ABSTAIN"
            | "VOTE_OPTION_NO"
            | "VOTE_OPTION_NO_WITH_VETO";
          options?: {
            option?:
              | "VOTE_OPTION_UNSPECIFIED"
              | "VOTE_OPTION_YES"
              | "VOTE_OPTION_ABSTAIN"
              | "VOTE_OPTION_NO"
              | "VOTE_OPTION_NO_WITH_VETO";
            weight?: string;
          }[];
        };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/gov/v1beta1/proposals/${proposalId}/votes/${voter}`,
      method: "GET",
      ...params,
    });
}
