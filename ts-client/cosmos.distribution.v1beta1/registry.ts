import { GeneratedType } from "@cosmjs/proto-signing";
import { ValidatorCurrentRewardsRecord } from "./types/cosmos/distribution/v1beta1/genesis";
import { QueryValidatorCommissionRequest } from "./types/cosmos/distribution/v1beta1/query";
import { DelegatorWithdrawInfo } from "./types/cosmos/distribution/v1beta1/genesis";
import { MsgWithdrawValidatorCommission } from "./types/cosmos/distribution/v1beta1/tx";
import { QueryValidatorDistributionInfoResponse } from "./types/cosmos/distribution/v1beta1/query";
import { ValidatorHistoricalRewardsRecord } from "./types/cosmos/distribution/v1beta1/genesis";
import { QueryDelegatorWithdrawAddressResponse } from "./types/cosmos/distribution/v1beta1/query";
import { QueryDelegatorWithdrawAddressRequest } from "./types/cosmos/distribution/v1beta1/query";
import { MsgWithdrawDelegatorRewardResponse } from "./types/cosmos/distribution/v1beta1/tx";
import { DelegatorStartingInfoRecord } from "./types/cosmos/distribution/v1beta1/genesis";
import { FeePool } from "./types/cosmos/distribution/v1beta1/distribution";
import { QueryValidatorOutstandingRewardsRequest } from "./types/cosmos/distribution/v1beta1/query";
import { QueryDelegationRewardsRequest } from "./types/cosmos/distribution/v1beta1/query";
import { QueryValidatorCommissionResponse } from "./types/cosmos/distribution/v1beta1/query";
import { MsgCommunityPoolSpendResponse } from "./types/cosmos/distribution/v1beta1/tx";
import { QueryParamsRequest } from "./types/cosmos/distribution/v1beta1/query";
import { QueryDelegationTotalRewardsRequest } from "./types/cosmos/distribution/v1beta1/query";
import { MsgWithdrawDelegatorReward } from "./types/cosmos/distribution/v1beta1/tx";
import { MsgWithdrawValidatorCommissionResponse } from "./types/cosmos/distribution/v1beta1/tx";
import { ValidatorSlashEvent } from "./types/cosmos/distribution/v1beta1/distribution";
import { ValidatorSlashEvents } from "./types/cosmos/distribution/v1beta1/distribution";
import { QueryParamsResponse } from "./types/cosmos/distribution/v1beta1/query";
import { MsgFundCommunityPoolResponse } from "./types/cosmos/distribution/v1beta1/tx";
import { Params } from "./types/cosmos/distribution/v1beta1/distribution";
import { QueryValidatorSlashesResponse } from "./types/cosmos/distribution/v1beta1/query";
import { QueryCommunityPoolRequest } from "./types/cosmos/distribution/v1beta1/query";
import { QueryCommunityPoolResponse } from "./types/cosmos/distribution/v1beta1/query";
import { GenesisState } from "./types/cosmos/distribution/v1beta1/genesis";
import { QueryValidatorSlashesRequest } from "./types/cosmos/distribution/v1beta1/query";
import { ValidatorCurrentRewards } from "./types/cosmos/distribution/v1beta1/distribution";
import { MsgDepositValidatorRewardsPoolResponse } from "./types/cosmos/distribution/v1beta1/tx";
import { ValidatorHistoricalRewards } from "./types/cosmos/distribution/v1beta1/distribution";
import { QueryDelegationRewardsResponse } from "./types/cosmos/distribution/v1beta1/query";
import { MsgFundCommunityPool } from "./types/cosmos/distribution/v1beta1/tx";
import { ValidatorSlashEventRecord } from "./types/cosmos/distribution/v1beta1/genesis";
import { QueryValidatorOutstandingRewardsResponse } from "./types/cosmos/distribution/v1beta1/query";
import { MsgSetWithdrawAddressResponse } from "./types/cosmos/distribution/v1beta1/tx";
import { MsgCommunityPoolSpend } from "./types/cosmos/distribution/v1beta1/tx";
import { ValidatorAccumulatedCommissionRecord } from "./types/cosmos/distribution/v1beta1/genesis";
import { ValidatorOutstandingRewards } from "./types/cosmos/distribution/v1beta1/distribution";
import { MsgSetWithdrawAddress } from "./types/cosmos/distribution/v1beta1/tx";
import { MsgUpdateParamsResponse } from "./types/cosmos/distribution/v1beta1/tx";
import { MsgDepositValidatorRewardsPool } from "./types/cosmos/distribution/v1beta1/tx";
import { ValidatorOutstandingRewardsRecord } from "./types/cosmos/distribution/v1beta1/genesis";
import { CommunityPoolSpendProposal } from "./types/cosmos/distribution/v1beta1/distribution";
import { QueryValidatorDistributionInfoRequest } from "./types/cosmos/distribution/v1beta1/query";
import { QueryDelegatorValidatorsResponse } from "./types/cosmos/distribution/v1beta1/query";
import { QueryDelegationTotalRewardsResponse } from "./types/cosmos/distribution/v1beta1/query";
import { QueryDelegatorValidatorsRequest } from "./types/cosmos/distribution/v1beta1/query";
import { MsgUpdateParams } from "./types/cosmos/distribution/v1beta1/tx";
import { ValidatorAccumulatedCommission } from "./types/cosmos/distribution/v1beta1/distribution";
import { DelegatorStartingInfo } from "./types/cosmos/distribution/v1beta1/distribution";
import { DelegationDelegatorReward } from "./types/cosmos/distribution/v1beta1/distribution";
import { CommunityPoolSpendProposalWithDeposit } from "./types/cosmos/distribution/v1beta1/distribution";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/cosmos.distribution.v1beta1.ValidatorCurrentRewardsRecord", ValidatorCurrentRewardsRecord],
    ["/cosmos.distribution.v1beta1.QueryValidatorCommissionRequest", QueryValidatorCommissionRequest],
    ["/cosmos.distribution.v1beta1.DelegatorWithdrawInfo", DelegatorWithdrawInfo],
    ["/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission", MsgWithdrawValidatorCommission],
    ["/cosmos.distribution.v1beta1.QueryValidatorDistributionInfoResponse", QueryValidatorDistributionInfoResponse],
    ["/cosmos.distribution.v1beta1.ValidatorHistoricalRewardsRecord", ValidatorHistoricalRewardsRecord],
    ["/cosmos.distribution.v1beta1.QueryDelegatorWithdrawAddressResponse", QueryDelegatorWithdrawAddressResponse],
    ["/cosmos.distribution.v1beta1.QueryDelegatorWithdrawAddressRequest", QueryDelegatorWithdrawAddressRequest],
    ["/cosmos.distribution.v1beta1.MsgWithdrawDelegatorRewardResponse", MsgWithdrawDelegatorRewardResponse],
    ["/cosmos.distribution.v1beta1.DelegatorStartingInfoRecord", DelegatorStartingInfoRecord],
    ["/cosmos.distribution.v1beta1.FeePool", FeePool],
    ["/cosmos.distribution.v1beta1.QueryValidatorOutstandingRewardsRequest", QueryValidatorOutstandingRewardsRequest],
    ["/cosmos.distribution.v1beta1.QueryDelegationRewardsRequest", QueryDelegationRewardsRequest],
    ["/cosmos.distribution.v1beta1.QueryValidatorCommissionResponse", QueryValidatorCommissionResponse],
    ["/cosmos.distribution.v1beta1.MsgCommunityPoolSpendResponse", MsgCommunityPoolSpendResponse],
    ["/cosmos.distribution.v1beta1.QueryParamsRequest", QueryParamsRequest],
    ["/cosmos.distribution.v1beta1.QueryDelegationTotalRewardsRequest", QueryDelegationTotalRewardsRequest],
    ["/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward", MsgWithdrawDelegatorReward],
    ["/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommissionResponse", MsgWithdrawValidatorCommissionResponse],
    ["/cosmos.distribution.v1beta1.ValidatorSlashEvent", ValidatorSlashEvent],
    ["/cosmos.distribution.v1beta1.ValidatorSlashEvents", ValidatorSlashEvents],
    ["/cosmos.distribution.v1beta1.QueryParamsResponse", QueryParamsResponse],
    ["/cosmos.distribution.v1beta1.MsgFundCommunityPoolResponse", MsgFundCommunityPoolResponse],
    ["/cosmos.distribution.v1beta1.Params", Params],
    ["/cosmos.distribution.v1beta1.QueryValidatorSlashesResponse", QueryValidatorSlashesResponse],
    ["/cosmos.distribution.v1beta1.QueryCommunityPoolRequest", QueryCommunityPoolRequest],
    ["/cosmos.distribution.v1beta1.QueryCommunityPoolResponse", QueryCommunityPoolResponse],
    ["/cosmos.distribution.v1beta1.GenesisState", GenesisState],
    ["/cosmos.distribution.v1beta1.QueryValidatorSlashesRequest", QueryValidatorSlashesRequest],
    ["/cosmos.distribution.v1beta1.ValidatorCurrentRewards", ValidatorCurrentRewards],
    ["/cosmos.distribution.v1beta1.MsgDepositValidatorRewardsPoolResponse", MsgDepositValidatorRewardsPoolResponse],
    ["/cosmos.distribution.v1beta1.ValidatorHistoricalRewards", ValidatorHistoricalRewards],
    ["/cosmos.distribution.v1beta1.QueryDelegationRewardsResponse", QueryDelegationRewardsResponse],
    ["/cosmos.distribution.v1beta1.MsgFundCommunityPool", MsgFundCommunityPool],
    ["/cosmos.distribution.v1beta1.ValidatorSlashEventRecord", ValidatorSlashEventRecord],
    ["/cosmos.distribution.v1beta1.QueryValidatorOutstandingRewardsResponse", QueryValidatorOutstandingRewardsResponse],
    ["/cosmos.distribution.v1beta1.MsgSetWithdrawAddressResponse", MsgSetWithdrawAddressResponse],
    ["/cosmos.distribution.v1beta1.MsgCommunityPoolSpend", MsgCommunityPoolSpend],
    ["/cosmos.distribution.v1beta1.ValidatorAccumulatedCommissionRecord", ValidatorAccumulatedCommissionRecord],
    ["/cosmos.distribution.v1beta1.ValidatorOutstandingRewards", ValidatorOutstandingRewards],
    ["/cosmos.distribution.v1beta1.MsgSetWithdrawAddress", MsgSetWithdrawAddress],
    ["/cosmos.distribution.v1beta1.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/cosmos.distribution.v1beta1.MsgDepositValidatorRewardsPool", MsgDepositValidatorRewardsPool],
    ["/cosmos.distribution.v1beta1.ValidatorOutstandingRewardsRecord", ValidatorOutstandingRewardsRecord],
    ["/cosmos.distribution.v1beta1.CommunityPoolSpendProposal", CommunityPoolSpendProposal],
    ["/cosmos.distribution.v1beta1.QueryValidatorDistributionInfoRequest", QueryValidatorDistributionInfoRequest],
    ["/cosmos.distribution.v1beta1.QueryDelegatorValidatorsResponse", QueryDelegatorValidatorsResponse],
    ["/cosmos.distribution.v1beta1.QueryDelegationTotalRewardsResponse", QueryDelegationTotalRewardsResponse],
    ["/cosmos.distribution.v1beta1.QueryDelegatorValidatorsRequest", QueryDelegatorValidatorsRequest],
    ["/cosmos.distribution.v1beta1.MsgUpdateParams", MsgUpdateParams],
    ["/cosmos.distribution.v1beta1.ValidatorAccumulatedCommission", ValidatorAccumulatedCommission],
    ["/cosmos.distribution.v1beta1.DelegatorStartingInfo", DelegatorStartingInfo],
    ["/cosmos.distribution.v1beta1.DelegationDelegatorReward", DelegationDelegatorReward],
    ["/cosmos.distribution.v1beta1.CommunityPoolSpendProposalWithDeposit", CommunityPoolSpendProposalWithDeposit],
    
];

export { msgTypes }