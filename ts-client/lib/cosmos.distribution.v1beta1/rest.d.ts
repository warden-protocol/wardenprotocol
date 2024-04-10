export interface Any {
    "@type"?: string;
}
export interface Status {
    /** @format int32 */
    code?: number;
    message?: string;
    details?: {
        "@type"?: string;
    }[];
}
export interface DecCoin {
    denom?: string;
    amount?: string;
}
export interface DelegationDelegatorReward {
    validator_address?: string;
    reward?: {
        denom?: string;
        amount?: string;
    }[];
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
    pool?: {
        denom?: string;
        amount?: string;
    }[];
}
export interface QueryDelegationRewardsResponse {
    rewards?: {
        denom?: string;
        amount?: string;
    }[];
}
export interface QueryDelegationTotalRewardsResponse {
    rewards?: {
        validator_address?: string;
        reward?: {
            denom?: string;
            amount?: string;
        }[];
    }[];
    total?: {
        denom?: string;
        amount?: string;
    }[];
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
    commission?: {
        commission?: {
            denom?: string;
            amount?: string;
        }[];
    };
}
export interface QueryValidatorDistributionInfoResponse {
    operator_address?: string;
    self_bond_rewards?: {
        denom?: string;
        amount?: string;
    }[];
    commission?: {
        denom?: string;
        amount?: string;
    }[];
}
export interface QueryValidatorOutstandingRewardsResponse {
    rewards?: {
        rewards?: {
            denom?: string;
            amount?: string;
        }[];
    };
}
export interface QueryValidatorSlashesResponse {
    slashes?: {
        validator_period?: string;
        fraction?: string;
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface ValidatorAccumulatedCommission {
    commission?: {
        denom?: string;
        amount?: string;
    }[];
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
    rewards?: {
        denom?: string;
        amount?: string;
    }[];
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
    amount?: {
        denom?: string;
        amount?: string;
    }[];
}
export interface MsgWithdrawValidatorCommissionResponse {
    amount?: {
        denom?: string;
        amount?: string;
    }[];
}
export interface Params {
    community_tax?: string;
    base_proposer_reward?: string;
    bonus_proposer_reward?: string;
    withdraw_addr_enabled?: boolean;
}
import { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
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
    securityWorker?: (securityData: SecurityDataType | null) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
    secure?: boolean;
    format?: ResponseType;
}
export declare enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded"
}
export declare class HttpClient<SecurityDataType = unknown> {
    instance: AxiosInstance;
    private securityData;
    private securityWorker?;
    private secure?;
    private format?;
    constructor({ securityWorker, secure, format, ...axiosConfig }?: ApiConfig<SecurityDataType>);
    setSecurityData: (data: SecurityDataType | null) => void;
    private mergeRequestParams;
    private createFormData;
    request: <T = any, _E = any>({ secure, path, type, query, format, body, ...params }: FullRequestParams) => Promise<AxiosResponse<T>>;
}
/**
 * @title HTTP API Console cosmos.distribution.v1beta1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Query
     * @name QueryCommunityPool
     * @request GET:/cosmos/distribution/v1beta1/community_pool
     */
    queryCommunityPool: (params?: RequestParams) => Promise<AxiosResponse<{
        pool?: {
            denom?: string;
            amount?: string;
        }[];
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryDelegationTotalRewards
     * @request GET:/cosmos/distribution/v1beta1/delegators/{delegator_address}/rewards
     */
    queryDelegationTotalRewards: (delegatorAddress: string, params?: RequestParams) => Promise<AxiosResponse<{
        rewards?: {
            validator_address?: string;
            reward?: {
                denom?: string;
                amount?: string;
            }[];
        }[];
        total?: {
            denom?: string;
            amount?: string;
        }[];
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryDelegationRewards
     * @request GET:/cosmos/distribution/v1beta1/delegators/{delegator_address}/rewards/{validator_address}
     */
    queryDelegationRewards: (delegatorAddress: string, validatorAddress: string, params?: RequestParams) => Promise<AxiosResponse<{
        rewards?: {
            denom?: string;
            amount?: string;
        }[];
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryDelegatorValidators
     * @request GET:/cosmos/distribution/v1beta1/delegators/{delegator_address}/validators
     */
    queryDelegatorValidators: (delegatorAddress: string, params?: RequestParams) => Promise<AxiosResponse<{
        validators?: string[];
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryDelegatorWithdrawAddress
     * @request GET:/cosmos/distribution/v1beta1/delegators/{delegator_address}/withdraw_address
     */
    queryDelegatorWithdrawAddress: (delegatorAddress: string, params?: RequestParams) => Promise<AxiosResponse<{
        withdraw_address?: string;
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryParams
     * @request GET:/cosmos/distribution/v1beta1/params
     */
    queryParams: (params?: RequestParams) => Promise<AxiosResponse<{
        params?: {
            community_tax?: string;
            base_proposer_reward?: string;
            bonus_proposer_reward?: string;
            withdraw_addr_enabled?: boolean;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryValidatorDistributionInfo
     * @request GET:/cosmos/distribution/v1beta1/validators/{validator_address}
     */
    queryValidatorDistributionInfo: (validatorAddress: string, params?: RequestParams) => Promise<AxiosResponse<{
        operator_address?: string;
        self_bond_rewards?: {
            denom?: string;
            amount?: string;
        }[];
        commission?: {
            denom?: string;
            amount?: string;
        }[];
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryValidatorCommission
     * @request GET:/cosmos/distribution/v1beta1/validators/{validator_address}/commission
     */
    queryValidatorCommission: (validatorAddress: string, params?: RequestParams) => Promise<AxiosResponse<{
        commission?: {
            commission?: {
                denom?: string;
                amount?: string;
            }[];
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryValidatorOutstandingRewards
     * @request GET:/cosmos/distribution/v1beta1/validators/{validator_address}/outstanding_rewards
     */
    queryValidatorOutstandingRewards: (validatorAddress: string, params?: RequestParams) => Promise<AxiosResponse<{
        rewards?: {
            rewards?: {
                denom?: string;
                amount?: string;
            }[];
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryValidatorSlashes
     * @request GET:/cosmos/distribution/v1beta1/validators/{validator_address}/slashes
     */
    queryValidatorSlashes: (validatorAddress: string, query?: {
        starting_height?: string;
        ending_height?: string;
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        slashes?: {
            validator_period?: string;
            fraction?: string;
        }[];
        pagination?: {
            next_key?: string;
            total?: string;
        };
    }>>;
}
