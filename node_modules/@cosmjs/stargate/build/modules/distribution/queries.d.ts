import { QueryCommunityPoolResponse, QueryDelegationRewardsResponse, QueryDelegationTotalRewardsResponse, QueryDelegatorValidatorsResponse, QueryDelegatorWithdrawAddressResponse, QueryParamsResponse, QueryValidatorCommissionResponse, QueryValidatorOutstandingRewardsResponse, QueryValidatorSlashesResponse } from "cosmjs-types/cosmos/distribution/v1beta1/query";
import { QueryClient } from "../../queryclient";
export interface DistributionExtension {
    readonly distribution: {
        communityPool: () => Promise<QueryCommunityPoolResponse>;
        delegationRewards: (delegatorAddress: string, validatorAddress: string) => Promise<QueryDelegationRewardsResponse>;
        delegationTotalRewards: (delegatorAddress: string) => Promise<QueryDelegationTotalRewardsResponse>;
        delegatorValidators: (delegatorAddress: string) => Promise<QueryDelegatorValidatorsResponse>;
        delegatorWithdrawAddress: (delegatorAddress: string) => Promise<QueryDelegatorWithdrawAddressResponse>;
        params: () => Promise<QueryParamsResponse>;
        validatorCommission: (validatorAddress: string) => Promise<QueryValidatorCommissionResponse>;
        validatorOutstandingRewards: (validatorAddress: string) => Promise<QueryValidatorOutstandingRewardsResponse>;
        validatorSlashes: (validatorAddress: string, startingHeight: number, endingHeight: number, paginationKey?: Uint8Array) => Promise<QueryValidatorSlashesResponse>;
    };
}
export declare function setupDistributionExtension(base: QueryClient): DistributionExtension;
