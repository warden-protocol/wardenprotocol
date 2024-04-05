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

export interface GroupMember {
  /** @format uint64 */
  group_id?: string;
  member?: { address?: string; weight?: string; metadata?: string; added_at?: string };
}

export interface Member {
  address?: string;
  weight?: string;
  metadata?: string;

  /** @format date-time */
  added_at?: string;
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

export enum ProposalExecutorResult {
  PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED = "PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED",
  PROPOSAL_EXECUTOR_RESULT_NOT_RUN = "PROPOSAL_EXECUTOR_RESULT_NOT_RUN",
  PROPOSAL_EXECUTOR_RESULT_SUCCESS = "PROPOSAL_EXECUTOR_RESULT_SUCCESS",
  PROPOSAL_EXECUTOR_RESULT_FAILURE = "PROPOSAL_EXECUTOR_RESULT_FAILURE",
}

export enum ProposalStatus {
  PROPOSAL_STATUS_UNSPECIFIED = "PROPOSAL_STATUS_UNSPECIFIED",
  PROPOSAL_STATUS_SUBMITTED = "PROPOSAL_STATUS_SUBMITTED",
  PROPOSAL_STATUS_ACCEPTED = "PROPOSAL_STATUS_ACCEPTED",
  PROPOSAL_STATUS_REJECTED = "PROPOSAL_STATUS_REJECTED",
  PROPOSAL_STATUS_ABORTED = "PROPOSAL_STATUS_ABORTED",
  PROPOSAL_STATUS_WITHDRAWN = "PROPOSAL_STATUS_WITHDRAWN",
}

export interface QueryGroupInfoResponse {
  info?: {
    id?: string;
    admin?: string;
    metadata?: string;
    version?: string;
    total_weight?: string;
    created_at?: string;
  };
}

export interface QueryGroupMembersResponse {
  members?: {
    group_id?: string;
    member?: { address?: string; weight?: string; metadata?: string; added_at?: string };
  }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryGroupPoliciesByAdminResponse {
  group_policies?: {
    address?: string;
    group_id?: string;
    admin?: string;
    metadata?: string;
    version?: string;
    decision_policy?: { "@type"?: string };
    created_at?: string;
  }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryGroupPoliciesByGroupResponse {
  group_policies?: {
    address?: string;
    group_id?: string;
    admin?: string;
    metadata?: string;
    version?: string;
    decision_policy?: { "@type"?: string };
    created_at?: string;
  }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryGroupPolicyInfoResponse {
  info?: {
    address?: string;
    group_id?: string;
    admin?: string;
    metadata?: string;
    version?: string;
    decision_policy?: { "@type"?: string };
    created_at?: string;
  };
}

export interface QueryGroupsByAdminResponse {
  groups?: {
    id?: string;
    admin?: string;
    metadata?: string;
    version?: string;
    total_weight?: string;
    created_at?: string;
  }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryGroupsByMemberResponse {
  groups?: {
    id?: string;
    admin?: string;
    metadata?: string;
    version?: string;
    total_weight?: string;
    created_at?: string;
  }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryGroupsResponse {
  groups?: {
    id?: string;
    admin?: string;
    metadata?: string;
    version?: string;
    total_weight?: string;
    created_at?: string;
  }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryProposalResponse {
  proposal?: {
    id?: string;
    group_policy_address?: string;
    metadata?: string;
    proposers?: string[];
    submit_time?: string;
    group_version?: string;
    group_policy_version?: string;
    status?:
      | "PROPOSAL_STATUS_UNSPECIFIED"
      | "PROPOSAL_STATUS_SUBMITTED"
      | "PROPOSAL_STATUS_ACCEPTED"
      | "PROPOSAL_STATUS_REJECTED"
      | "PROPOSAL_STATUS_ABORTED"
      | "PROPOSAL_STATUS_WITHDRAWN";
    final_tally_result?: { yes_count?: string; abstain_count?: string; no_count?: string; no_with_veto_count?: string };
    voting_period_end?: string;
    executor_result?:
      | "PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED"
      | "PROPOSAL_EXECUTOR_RESULT_NOT_RUN"
      | "PROPOSAL_EXECUTOR_RESULT_SUCCESS"
      | "PROPOSAL_EXECUTOR_RESULT_FAILURE";
    messages?: { "@type"?: string }[];
    title?: string;
    summary?: string;
  };
}

export interface QueryProposalsByGroupPolicyResponse {
  proposals?: {
    id?: string;
    group_policy_address?: string;
    metadata?: string;
    proposers?: string[];
    submit_time?: string;
    group_version?: string;
    group_policy_version?: string;
    status?:
      | "PROPOSAL_STATUS_UNSPECIFIED"
      | "PROPOSAL_STATUS_SUBMITTED"
      | "PROPOSAL_STATUS_ACCEPTED"
      | "PROPOSAL_STATUS_REJECTED"
      | "PROPOSAL_STATUS_ABORTED"
      | "PROPOSAL_STATUS_WITHDRAWN";
    final_tally_result?: { yes_count?: string; abstain_count?: string; no_count?: string; no_with_veto_count?: string };
    voting_period_end?: string;
    executor_result?:
      | "PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED"
      | "PROPOSAL_EXECUTOR_RESULT_NOT_RUN"
      | "PROPOSAL_EXECUTOR_RESULT_SUCCESS"
      | "PROPOSAL_EXECUTOR_RESULT_FAILURE";
    messages?: { "@type"?: string }[];
    title?: string;
    summary?: string;
  }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryTallyResultResponse {
  tally?: { yes_count?: string; abstain_count?: string; no_count?: string; no_with_veto_count?: string };
}

export interface QueryVoteByProposalVoterResponse {
  vote?: {
    proposal_id?: string;
    voter?: string;
    option?:
      | "VOTE_OPTION_UNSPECIFIED"
      | "VOTE_OPTION_YES"
      | "VOTE_OPTION_ABSTAIN"
      | "VOTE_OPTION_NO"
      | "VOTE_OPTION_NO_WITH_VETO";
    metadata?: string;
    submit_time?: string;
  };
}

export interface QueryVotesByProposalResponse {
  votes?: {
    proposal_id?: string;
    voter?: string;
    option?:
      | "VOTE_OPTION_UNSPECIFIED"
      | "VOTE_OPTION_YES"
      | "VOTE_OPTION_ABSTAIN"
      | "VOTE_OPTION_NO"
      | "VOTE_OPTION_NO_WITH_VETO";
    metadata?: string;
    submit_time?: string;
  }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryVotesByVoterResponse {
  votes?: {
    proposal_id?: string;
    voter?: string;
    option?:
      | "VOTE_OPTION_UNSPECIFIED"
      | "VOTE_OPTION_YES"
      | "VOTE_OPTION_ABSTAIN"
      | "VOTE_OPTION_NO"
      | "VOTE_OPTION_NO_WITH_VETO";
    metadata?: string;
    submit_time?: string;
  }[];
  pagination?: { next_key?: string; total?: string };
}

export interface Vote {
  /** @format uint64 */
  proposal_id?: string;
  voter?: string;
  option?:
    | "VOTE_OPTION_UNSPECIFIED"
    | "VOTE_OPTION_YES"
    | "VOTE_OPTION_ABSTAIN"
    | "VOTE_OPTION_NO"
    | "VOTE_OPTION_NO_WITH_VETO";
  metadata?: string;

  /** @format date-time */
  submit_time?: string;
}

export enum VoteOption {
  VOTE_OPTION_UNSPECIFIED = "VOTE_OPTION_UNSPECIFIED",
  VOTE_OPTION_YES = "VOTE_OPTION_YES",
  VOTE_OPTION_ABSTAIN = "VOTE_OPTION_ABSTAIN",
  VOTE_OPTION_NO = "VOTE_OPTION_NO",
  VOTE_OPTION_NO_WITH_VETO = "VOTE_OPTION_NO_WITH_VETO",
}

export interface V1GroupInfo {
  /** @format uint64 */
  id?: string;
  admin?: string;
  metadata?: string;

  /** @format uint64 */
  version?: string;
  total_weight?: string;

  /** @format date-time */
  created_at?: string;
}

export interface V1GroupPolicyInfo {
  address?: string;

  /** @format uint64 */
  group_id?: string;
  admin?: string;
  metadata?: string;

  /** @format uint64 */
  version?: string;
  decision_policy?: { "@type"?: string };

  /** @format date-time */
  created_at?: string;
}

export interface V1Proposal {
  /** @format uint64 */
  id?: string;
  group_policy_address?: string;
  metadata?: string;
  proposers?: string[];

  /** @format date-time */
  submit_time?: string;

  /** @format uint64 */
  group_version?: string;

  /** @format uint64 */
  group_policy_version?: string;
  status?:
    | "PROPOSAL_STATUS_UNSPECIFIED"
    | "PROPOSAL_STATUS_SUBMITTED"
    | "PROPOSAL_STATUS_ACCEPTED"
    | "PROPOSAL_STATUS_REJECTED"
    | "PROPOSAL_STATUS_ABORTED"
    | "PROPOSAL_STATUS_WITHDRAWN";
  final_tally_result?: { yes_count?: string; abstain_count?: string; no_count?: string; no_with_veto_count?: string };

  /** @format date-time */
  voting_period_end?: string;
  executor_result?:
    | "PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED"
    | "PROPOSAL_EXECUTOR_RESULT_NOT_RUN"
    | "PROPOSAL_EXECUTOR_RESULT_SUCCESS"
    | "PROPOSAL_EXECUTOR_RESULT_FAILURE";
  messages?: { "@type"?: string }[];
  title?: string;
  summary?: string;
}

export interface V1TallyResult {
  yes_count?: string;
  abstain_count?: string;
  no_count?: string;
  no_with_veto_count?: string;
}

export interface MemberRequest {
  address?: string;
  weight?: string;
  metadata?: string;
}

export interface MsgCreateGroupPolicyResponse {
  address?: string;
}

export interface MsgCreateGroupResponse {
  /** @format uint64 */
  group_id?: string;
}

export interface MsgCreateGroupWithPolicyResponse {
  /** @format uint64 */
  group_id?: string;
  group_policy_address?: string;
}

export interface MsgExecResponse {
  result?:
    | "PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED"
    | "PROPOSAL_EXECUTOR_RESULT_NOT_RUN"
    | "PROPOSAL_EXECUTOR_RESULT_SUCCESS"
    | "PROPOSAL_EXECUTOR_RESULT_FAILURE";
}

export type MsgLeaveGroupResponse = object;

export interface MsgSubmitProposalResponse {
  /** @format uint64 */
  proposal_id?: string;
}

export type MsgUpdateGroupAdminResponse = object;

export type MsgUpdateGroupMembersResponse = object;

export type MsgUpdateGroupMetadataResponse = object;

export type MsgUpdateGroupPolicyAdminResponse = object;

export type MsgUpdateGroupPolicyDecisionPolicyResponse = object;

export type MsgUpdateGroupPolicyMetadataResponse = object;

export type MsgVoteResponse = object;

export type MsgWithdrawProposalResponse = object;

export enum V1Exec {
  EXEC_UNSPECIFIED = "EXEC_UNSPECIFIED",
  EXEC_TRY = "EXEC_TRY",
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
 * @title HTTP API Console cosmos.group.v1
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Query
   * @name QueryGroupInfo
   * @request GET:/cosmos/group/v1/group_info/{group_id}
   */
  queryGroupInfo = (groupId: string, params: RequestParams = {}) =>
    this.request<
      {
        info?: {
          id?: string;
          admin?: string;
          metadata?: string;
          version?: string;
          total_weight?: string;
          created_at?: string;
        };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/group/v1/group_info/${groupId}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryGroupMembers
   * @request GET:/cosmos/group/v1/group_members/{group_id}
   */
  queryGroupMembers = (
    groupId: string,
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
        members?: {
          group_id?: string;
          member?: { address?: string; weight?: string; metadata?: string; added_at?: string };
        }[];
        pagination?: { next_key?: string; total?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/group/v1/group_members/${groupId}`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryGroupPoliciesByAdmin
   * @request GET:/cosmos/group/v1/group_policies_by_admin/{admin}
   */
  queryGroupPoliciesByAdmin = (
    admin: string,
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
        group_policies?: {
          address?: string;
          group_id?: string;
          admin?: string;
          metadata?: string;
          version?: string;
          decision_policy?: { "@type"?: string };
          created_at?: string;
        }[];
        pagination?: { next_key?: string; total?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/group/v1/group_policies_by_admin/${admin}`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryGroupPoliciesByGroup
   * @request GET:/cosmos/group/v1/group_policies_by_group/{group_id}
   */
  queryGroupPoliciesByGroup = (
    groupId: string,
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
        group_policies?: {
          address?: string;
          group_id?: string;
          admin?: string;
          metadata?: string;
          version?: string;
          decision_policy?: { "@type"?: string };
          created_at?: string;
        }[];
        pagination?: { next_key?: string; total?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/group/v1/group_policies_by_group/${groupId}`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryGroupPolicyInfo
   * @request GET:/cosmos/group/v1/group_policy_info/{address}
   */
  queryGroupPolicyInfo = (address: string, params: RequestParams = {}) =>
    this.request<
      {
        info?: {
          address?: string;
          group_id?: string;
          admin?: string;
          metadata?: string;
          version?: string;
          decision_policy?: { "@type"?: string };
          created_at?: string;
        };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/group/v1/group_policy_info/${address}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryGroups
   * @request GET:/cosmos/group/v1/groups
   */
  queryGroups = (
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
        groups?: {
          id?: string;
          admin?: string;
          metadata?: string;
          version?: string;
          total_weight?: string;
          created_at?: string;
        }[];
        pagination?: { next_key?: string; total?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/group/v1/groups`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryGroupsByAdmin
   * @request GET:/cosmos/group/v1/groups_by_admin/{admin}
   */
  queryGroupsByAdmin = (
    admin: string,
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
        groups?: {
          id?: string;
          admin?: string;
          metadata?: string;
          version?: string;
          total_weight?: string;
          created_at?: string;
        }[];
        pagination?: { next_key?: string; total?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/group/v1/groups_by_admin/${admin}`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryGroupsByMember
   * @request GET:/cosmos/group/v1/groups_by_member/{address}
   */
  queryGroupsByMember = (
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
      {
        groups?: {
          id?: string;
          admin?: string;
          metadata?: string;
          version?: string;
          total_weight?: string;
          created_at?: string;
        }[];
        pagination?: { next_key?: string; total?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/group/v1/groups_by_member/${address}`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryProposal
   * @request GET:/cosmos/group/v1/proposal/{proposal_id}
   */
  queryProposal = (proposalId: string, params: RequestParams = {}) =>
    this.request<
      {
        proposal?: {
          id?: string;
          group_policy_address?: string;
          metadata?: string;
          proposers?: string[];
          submit_time?: string;
          group_version?: string;
          group_policy_version?: string;
          status?:
            | "PROPOSAL_STATUS_UNSPECIFIED"
            | "PROPOSAL_STATUS_SUBMITTED"
            | "PROPOSAL_STATUS_ACCEPTED"
            | "PROPOSAL_STATUS_REJECTED"
            | "PROPOSAL_STATUS_ABORTED"
            | "PROPOSAL_STATUS_WITHDRAWN";
          final_tally_result?: {
            yes_count?: string;
            abstain_count?: string;
            no_count?: string;
            no_with_veto_count?: string;
          };
          voting_period_end?: string;
          executor_result?:
            | "PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED"
            | "PROPOSAL_EXECUTOR_RESULT_NOT_RUN"
            | "PROPOSAL_EXECUTOR_RESULT_SUCCESS"
            | "PROPOSAL_EXECUTOR_RESULT_FAILURE";
          messages?: { "@type"?: string }[];
          title?: string;
          summary?: string;
        };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/group/v1/proposal/${proposalId}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryTallyResult
   * @request GET:/cosmos/group/v1/proposals/{proposal_id}/tally
   */
  queryTallyResult = (proposalId: string, params: RequestParams = {}) =>
    this.request<
      { tally?: { yes_count?: string; abstain_count?: string; no_count?: string; no_with_veto_count?: string } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/group/v1/proposals/${proposalId}/tally`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryProposalsByGroupPolicy
   * @request GET:/cosmos/group/v1/proposals_by_group_policy/{address}
   */
  queryProposalsByGroupPolicy = (
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
      {
        proposals?: {
          id?: string;
          group_policy_address?: string;
          metadata?: string;
          proposers?: string[];
          submit_time?: string;
          group_version?: string;
          group_policy_version?: string;
          status?:
            | "PROPOSAL_STATUS_UNSPECIFIED"
            | "PROPOSAL_STATUS_SUBMITTED"
            | "PROPOSAL_STATUS_ACCEPTED"
            | "PROPOSAL_STATUS_REJECTED"
            | "PROPOSAL_STATUS_ABORTED"
            | "PROPOSAL_STATUS_WITHDRAWN";
          final_tally_result?: {
            yes_count?: string;
            abstain_count?: string;
            no_count?: string;
            no_with_veto_count?: string;
          };
          voting_period_end?: string;
          executor_result?:
            | "PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED"
            | "PROPOSAL_EXECUTOR_RESULT_NOT_RUN"
            | "PROPOSAL_EXECUTOR_RESULT_SUCCESS"
            | "PROPOSAL_EXECUTOR_RESULT_FAILURE";
          messages?: { "@type"?: string }[];
          title?: string;
          summary?: string;
        }[];
        pagination?: { next_key?: string; total?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/group/v1/proposals_by_group_policy/${address}`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryVoteByProposalVoter
   * @request GET:/cosmos/group/v1/vote_by_proposal_voter/{proposal_id}/{voter}
   */
  queryVoteByProposalVoter = (proposalId: string, voter: string, params: RequestParams = {}) =>
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
          metadata?: string;
          submit_time?: string;
        };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/group/v1/vote_by_proposal_voter/${proposalId}/${voter}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryVotesByProposal
   * @request GET:/cosmos/group/v1/votes_by_proposal/{proposal_id}
   */
  queryVotesByProposal = (
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
          metadata?: string;
          submit_time?: string;
        }[];
        pagination?: { next_key?: string; total?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/group/v1/votes_by_proposal/${proposalId}`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryVotesByVoter
   * @request GET:/cosmos/group/v1/votes_by_voter/{voter}
   */
  queryVotesByVoter = (
    voter: string,
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
          metadata?: string;
          submit_time?: string;
        }[];
        pagination?: { next_key?: string; total?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/group/v1/votes_by_voter/${voter}`,
      method: "GET",
      query: query,
      ...params,
    });
}
