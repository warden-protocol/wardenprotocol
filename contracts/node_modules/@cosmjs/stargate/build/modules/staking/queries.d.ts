import { QueryDelegationResponse, QueryDelegatorDelegationsResponse, QueryDelegatorUnbondingDelegationsResponse, QueryDelegatorValidatorResponse, QueryDelegatorValidatorsResponse, QueryHistoricalInfoResponse, QueryParamsResponse, QueryPoolResponse, QueryRedelegationsResponse, QueryUnbondingDelegationResponse, QueryValidatorDelegationsResponse, QueryValidatorResponse, QueryValidatorsResponse, QueryValidatorUnbondingDelegationsResponse } from "cosmjs-types/cosmos/staking/v1beta1/query";
import { BondStatus } from "cosmjs-types/cosmos/staking/v1beta1/staking";
import { QueryClient } from "../../queryclient";
export declare type BondStatusString = keyof Pick<typeof BondStatus, "BOND_STATUS_BONDED" | "BOND_STATUS_UNBONDED" | "BOND_STATUS_UNBONDING"> | "";
export interface StakingExtension {
    readonly staking: {
        delegation: (delegatorAddress: string, validatorAddress: string) => Promise<QueryDelegationResponse>;
        delegatorDelegations: (delegatorAddress: string, paginationKey?: Uint8Array) => Promise<QueryDelegatorDelegationsResponse>;
        delegatorUnbondingDelegations: (delegatorAddress: string, paginationKey?: Uint8Array) => Promise<QueryDelegatorUnbondingDelegationsResponse>;
        delegatorValidator: (delegatorAddress: string, validatorAddress: string) => Promise<QueryDelegatorValidatorResponse>;
        delegatorValidators: (delegatorAddress: string, paginationKey?: Uint8Array) => Promise<QueryDelegatorValidatorsResponse>;
        historicalInfo: (height: number) => Promise<QueryHistoricalInfoResponse>;
        params: () => Promise<QueryParamsResponse>;
        pool: () => Promise<QueryPoolResponse>;
        redelegations: (delegatorAddress: string, sourceValidatorAddress: string, destinationValidatorAddress: string, paginationKey?: Uint8Array) => Promise<QueryRedelegationsResponse>;
        unbondingDelegation: (delegatorAddress: string, validatorAddress: string) => Promise<QueryUnbondingDelegationResponse>;
        validator: (validatorAddress: string) => Promise<QueryValidatorResponse>;
        validatorDelegations: (validatorAddress: string, paginationKey?: Uint8Array) => Promise<QueryValidatorDelegationsResponse>;
        validators: (status: BondStatusString, paginationKey?: Uint8Array) => Promise<QueryValidatorsResponse>;
        validatorUnbondingDelegations: (validatorAddress: string, paginationKey?: Uint8Array) => Promise<QueryValidatorUnbondingDelegationsResponse>;
    };
}
export declare function setupStakingExtension(base: QueryClient): StakingExtension;
