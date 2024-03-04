import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { ValidatorSlashEventRecord } from "./types/cosmos/distribution/v1beta1/genesis";
import { MsgFundCommunityPool } from "./types/cosmos/distribution/v1beta1/tx";
import { QueryDelegationTotalRewardsResponse } from "./types/cosmos/distribution/v1beta1/query";
import { CommunityPoolSpendProposalWithDeposit } from "./types/cosmos/distribution/v1beta1/distribution";
import { QueryValidatorOutstandingRewardsRequest } from "./types/cosmos/distribution/v1beta1/query";
import { QueryValidatorSlashesRequest } from "./types/cosmos/distribution/v1beta1/query";
import { QueryDelegationRewardsResponse } from "./types/cosmos/distribution/v1beta1/query";
import { QueryDelegatorValidatorsRequest } from "./types/cosmos/distribution/v1beta1/query";
import { QueryDelegatorValidatorsResponse } from "./types/cosmos/distribution/v1beta1/query";
import { CommunityPoolSpendProposal } from "./types/cosmos/distribution/v1beta1/distribution";
import { ValidatorHistoricalRewards } from "./types/cosmos/distribution/v1beta1/distribution";
import { FeePool } from "./types/cosmos/distribution/v1beta1/distribution";
import { MsgCommunityPoolSpend } from "./types/cosmos/distribution/v1beta1/tx";
import { MsgWithdrawValidatorCommissionResponse } from "./types/cosmos/distribution/v1beta1/tx";
import { QueryValidatorDistributionInfoResponse } from "./types/cosmos/distribution/v1beta1/query";
import { QueryDelegationRewardsRequest } from "./types/cosmos/distribution/v1beta1/query";
import { DelegatorStartingInfo } from "./types/cosmos/distribution/v1beta1/distribution";
import { ValidatorAccumulatedCommissionRecord } from "./types/cosmos/distribution/v1beta1/genesis";
import { MsgCommunityPoolSpendResponse } from "./types/cosmos/distribution/v1beta1/tx";
import { MsgDepositValidatorRewardsPool } from "./types/cosmos/distribution/v1beta1/tx";
import { MsgFundCommunityPoolResponse } from "./types/cosmos/distribution/v1beta1/tx";
import { QueryValidatorCommissionRequest } from "./types/cosmos/distribution/v1beta1/query";
import { QueryDelegatorWithdrawAddressRequest } from "./types/cosmos/distribution/v1beta1/query";
import { QueryDelegatorWithdrawAddressResponse } from "./types/cosmos/distribution/v1beta1/query";
import { ValidatorCurrentRewards } from "./types/cosmos/distribution/v1beta1/distribution";
import { ValidatorSlashEvent } from "./types/cosmos/distribution/v1beta1/distribution";
import { ValidatorCurrentRewardsRecord } from "./types/cosmos/distribution/v1beta1/genesis";
import { MsgSetWithdrawAddress } from "./types/cosmos/distribution/v1beta1/tx";
import { MsgUpdateParams } from "./types/cosmos/distribution/v1beta1/tx";
import { QueryParamsResponse } from "./types/cosmos/distribution/v1beta1/query";
import { MsgWithdrawValidatorCommission } from "./types/cosmos/distribution/v1beta1/tx";
import { QueryCommunityPoolResponse } from "./types/cosmos/distribution/v1beta1/query";
import { ValidatorHistoricalRewardsRecord } from "./types/cosmos/distribution/v1beta1/genesis";
import { MsgWithdrawDelegatorRewardResponse } from "./types/cosmos/distribution/v1beta1/tx";
import { ValidatorAccumulatedCommission } from "./types/cosmos/distribution/v1beta1/distribution";
import { GenesisState } from "./types/cosmos/distribution/v1beta1/genesis";
import { MsgSetWithdrawAddressResponse } from "./types/cosmos/distribution/v1beta1/tx";
import { Params } from "./types/cosmos/distribution/v1beta1/distribution";
import { ValidatorSlashEvents } from "./types/cosmos/distribution/v1beta1/distribution";
import { ValidatorOutstandingRewardsRecord } from "./types/cosmos/distribution/v1beta1/genesis";
import { QueryValidatorCommissionResponse } from "./types/cosmos/distribution/v1beta1/query";
import { DelegatorWithdrawInfo } from "./types/cosmos/distribution/v1beta1/genesis";
import { MsgUpdateParamsResponse } from "./types/cosmos/distribution/v1beta1/tx";
import { QueryParamsRequest } from "./types/cosmos/distribution/v1beta1/query";
import { QueryValidatorDistributionInfoRequest } from "./types/cosmos/distribution/v1beta1/query";
import { QueryValidatorOutstandingRewardsResponse } from "./types/cosmos/distribution/v1beta1/query";
import { DelegationDelegatorReward } from "./types/cosmos/distribution/v1beta1/distribution";
import { DelegatorStartingInfoRecord } from "./types/cosmos/distribution/v1beta1/genesis";
import { MsgWithdrawDelegatorReward } from "./types/cosmos/distribution/v1beta1/tx";
import { ValidatorOutstandingRewards } from "./types/cosmos/distribution/v1beta1/distribution";
import { QueryValidatorSlashesResponse } from "./types/cosmos/distribution/v1beta1/query";
import { QueryDelegationTotalRewardsRequest } from "./types/cosmos/distribution/v1beta1/query";
import { QueryCommunityPoolRequest } from "./types/cosmos/distribution/v1beta1/query";
import { MsgDepositValidatorRewardsPoolResponse } from "./types/cosmos/distribution/v1beta1/tx";
export { ValidatorSlashEventRecord, MsgFundCommunityPool, QueryDelegationTotalRewardsResponse, CommunityPoolSpendProposalWithDeposit, QueryValidatorOutstandingRewardsRequest, QueryValidatorSlashesRequest, QueryDelegationRewardsResponse, QueryDelegatorValidatorsRequest, QueryDelegatorValidatorsResponse, CommunityPoolSpendProposal, ValidatorHistoricalRewards, FeePool, MsgCommunityPoolSpend, MsgWithdrawValidatorCommissionResponse, QueryValidatorDistributionInfoResponse, QueryDelegationRewardsRequest, DelegatorStartingInfo, ValidatorAccumulatedCommissionRecord, MsgCommunityPoolSpendResponse, MsgDepositValidatorRewardsPool, MsgFundCommunityPoolResponse, QueryValidatorCommissionRequest, QueryDelegatorWithdrawAddressRequest, QueryDelegatorWithdrawAddressResponse, ValidatorCurrentRewards, ValidatorSlashEvent, ValidatorCurrentRewardsRecord, MsgSetWithdrawAddress, MsgUpdateParams, QueryParamsResponse, MsgWithdrawValidatorCommission, QueryCommunityPoolResponse, ValidatorHistoricalRewardsRecord, MsgWithdrawDelegatorRewardResponse, ValidatorAccumulatedCommission, GenesisState, MsgSetWithdrawAddressResponse, Params, ValidatorSlashEvents, ValidatorOutstandingRewardsRecord, QueryValidatorCommissionResponse, DelegatorWithdrawInfo, MsgUpdateParamsResponse, QueryParamsRequest, QueryValidatorDistributionInfoRequest, QueryValidatorOutstandingRewardsResponse, DelegationDelegatorReward, DelegatorStartingInfoRecord, MsgWithdrawDelegatorReward, ValidatorOutstandingRewards, QueryValidatorSlashesResponse, QueryDelegationTotalRewardsRequest, QueryCommunityPoolRequest, MsgDepositValidatorRewardsPoolResponse };
type sendValidatorSlashEventRecordParams = {
    value: ValidatorSlashEventRecord;
    fee?: StdFee;
    memo?: string;
};
type sendMsgFundCommunityPoolParams = {
    value: MsgFundCommunityPool;
    fee?: StdFee;
    memo?: string;
};
type sendQueryDelegationTotalRewardsResponseParams = {
    value: QueryDelegationTotalRewardsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendCommunityPoolSpendProposalWithDepositParams = {
    value: CommunityPoolSpendProposalWithDeposit;
    fee?: StdFee;
    memo?: string;
};
type sendQueryValidatorOutstandingRewardsRequestParams = {
    value: QueryValidatorOutstandingRewardsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryValidatorSlashesRequestParams = {
    value: QueryValidatorSlashesRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryDelegationRewardsResponseParams = {
    value: QueryDelegationRewardsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryDelegatorValidatorsRequestParams = {
    value: QueryDelegatorValidatorsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryDelegatorValidatorsResponseParams = {
    value: QueryDelegatorValidatorsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendCommunityPoolSpendProposalParams = {
    value: CommunityPoolSpendProposal;
    fee?: StdFee;
    memo?: string;
};
type sendValidatorHistoricalRewardsParams = {
    value: ValidatorHistoricalRewards;
    fee?: StdFee;
    memo?: string;
};
type sendFeePoolParams = {
    value: FeePool;
    fee?: StdFee;
    memo?: string;
};
type sendMsgCommunityPoolSpendParams = {
    value: MsgCommunityPoolSpend;
    fee?: StdFee;
    memo?: string;
};
type sendMsgWithdrawValidatorCommissionResponseParams = {
    value: MsgWithdrawValidatorCommissionResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryValidatorDistributionInfoResponseParams = {
    value: QueryValidatorDistributionInfoResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryDelegationRewardsRequestParams = {
    value: QueryDelegationRewardsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendDelegatorStartingInfoParams = {
    value: DelegatorStartingInfo;
    fee?: StdFee;
    memo?: string;
};
type sendValidatorAccumulatedCommissionRecordParams = {
    value: ValidatorAccumulatedCommissionRecord;
    fee?: StdFee;
    memo?: string;
};
type sendMsgCommunityPoolSpendResponseParams = {
    value: MsgCommunityPoolSpendResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgDepositValidatorRewardsPoolParams = {
    value: MsgDepositValidatorRewardsPool;
    fee?: StdFee;
    memo?: string;
};
type sendMsgFundCommunityPoolResponseParams = {
    value: MsgFundCommunityPoolResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryValidatorCommissionRequestParams = {
    value: QueryValidatorCommissionRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryDelegatorWithdrawAddressRequestParams = {
    value: QueryDelegatorWithdrawAddressRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryDelegatorWithdrawAddressResponseParams = {
    value: QueryDelegatorWithdrawAddressResponse;
    fee?: StdFee;
    memo?: string;
};
type sendValidatorCurrentRewardsParams = {
    value: ValidatorCurrentRewards;
    fee?: StdFee;
    memo?: string;
};
type sendValidatorSlashEventParams = {
    value: ValidatorSlashEvent;
    fee?: StdFee;
    memo?: string;
};
type sendValidatorCurrentRewardsRecordParams = {
    value: ValidatorCurrentRewardsRecord;
    fee?: StdFee;
    memo?: string;
};
type sendMsgSetWithdrawAddressParams = {
    value: MsgSetWithdrawAddress;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsParams = {
    value: MsgUpdateParams;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsResponseParams = {
    value: QueryParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgWithdrawValidatorCommissionParams = {
    value: MsgWithdrawValidatorCommission;
    fee?: StdFee;
    memo?: string;
};
type sendQueryCommunityPoolResponseParams = {
    value: QueryCommunityPoolResponse;
    fee?: StdFee;
    memo?: string;
};
type sendValidatorHistoricalRewardsRecordParams = {
    value: ValidatorHistoricalRewardsRecord;
    fee?: StdFee;
    memo?: string;
};
type sendMsgWithdrawDelegatorRewardResponseParams = {
    value: MsgWithdrawDelegatorRewardResponse;
    fee?: StdFee;
    memo?: string;
};
type sendValidatorAccumulatedCommissionParams = {
    value: ValidatorAccumulatedCommission;
    fee?: StdFee;
    memo?: string;
};
type sendGenesisStateParams = {
    value: GenesisState;
    fee?: StdFee;
    memo?: string;
};
type sendMsgSetWithdrawAddressResponseParams = {
    value: MsgSetWithdrawAddressResponse;
    fee?: StdFee;
    memo?: string;
};
type sendParamsParams = {
    value: Params;
    fee?: StdFee;
    memo?: string;
};
type sendValidatorSlashEventsParams = {
    value: ValidatorSlashEvents;
    fee?: StdFee;
    memo?: string;
};
type sendValidatorOutstandingRewardsRecordParams = {
    value: ValidatorOutstandingRewardsRecord;
    fee?: StdFee;
    memo?: string;
};
type sendQueryValidatorCommissionResponseParams = {
    value: QueryValidatorCommissionResponse;
    fee?: StdFee;
    memo?: string;
};
type sendDelegatorWithdrawInfoParams = {
    value: DelegatorWithdrawInfo;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsRequestParams = {
    value: QueryParamsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryValidatorDistributionInfoRequestParams = {
    value: QueryValidatorDistributionInfoRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryValidatorOutstandingRewardsResponseParams = {
    value: QueryValidatorOutstandingRewardsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendDelegationDelegatorRewardParams = {
    value: DelegationDelegatorReward;
    fee?: StdFee;
    memo?: string;
};
type sendDelegatorStartingInfoRecordParams = {
    value: DelegatorStartingInfoRecord;
    fee?: StdFee;
    memo?: string;
};
type sendMsgWithdrawDelegatorRewardParams = {
    value: MsgWithdrawDelegatorReward;
    fee?: StdFee;
    memo?: string;
};
type sendValidatorOutstandingRewardsParams = {
    value: ValidatorOutstandingRewards;
    fee?: StdFee;
    memo?: string;
};
type sendQueryValidatorSlashesResponseParams = {
    value: QueryValidatorSlashesResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryDelegationTotalRewardsRequestParams = {
    value: QueryDelegationTotalRewardsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryCommunityPoolRequestParams = {
    value: QueryCommunityPoolRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgDepositValidatorRewardsPoolResponseParams = {
    value: MsgDepositValidatorRewardsPoolResponse;
    fee?: StdFee;
    memo?: string;
};
type validatorSlashEventRecordParams = {
    value: ValidatorSlashEventRecord;
};
type msgFundCommunityPoolParams = {
    value: MsgFundCommunityPool;
};
type queryDelegationTotalRewardsResponseParams = {
    value: QueryDelegationTotalRewardsResponse;
};
type communityPoolSpendProposalWithDepositParams = {
    value: CommunityPoolSpendProposalWithDeposit;
};
type queryValidatorOutstandingRewardsRequestParams = {
    value: QueryValidatorOutstandingRewardsRequest;
};
type queryValidatorSlashesRequestParams = {
    value: QueryValidatorSlashesRequest;
};
type queryDelegationRewardsResponseParams = {
    value: QueryDelegationRewardsResponse;
};
type queryDelegatorValidatorsRequestParams = {
    value: QueryDelegatorValidatorsRequest;
};
type queryDelegatorValidatorsResponseParams = {
    value: QueryDelegatorValidatorsResponse;
};
type communityPoolSpendProposalParams = {
    value: CommunityPoolSpendProposal;
};
type validatorHistoricalRewardsParams = {
    value: ValidatorHistoricalRewards;
};
type feePoolParams = {
    value: FeePool;
};
type msgCommunityPoolSpendParams = {
    value: MsgCommunityPoolSpend;
};
type msgWithdrawValidatorCommissionResponseParams = {
    value: MsgWithdrawValidatorCommissionResponse;
};
type queryValidatorDistributionInfoResponseParams = {
    value: QueryValidatorDistributionInfoResponse;
};
type queryDelegationRewardsRequestParams = {
    value: QueryDelegationRewardsRequest;
};
type delegatorStartingInfoParams = {
    value: DelegatorStartingInfo;
};
type validatorAccumulatedCommissionRecordParams = {
    value: ValidatorAccumulatedCommissionRecord;
};
type msgCommunityPoolSpendResponseParams = {
    value: MsgCommunityPoolSpendResponse;
};
type msgDepositValidatorRewardsPoolParams = {
    value: MsgDepositValidatorRewardsPool;
};
type msgFundCommunityPoolResponseParams = {
    value: MsgFundCommunityPoolResponse;
};
type queryValidatorCommissionRequestParams = {
    value: QueryValidatorCommissionRequest;
};
type queryDelegatorWithdrawAddressRequestParams = {
    value: QueryDelegatorWithdrawAddressRequest;
};
type queryDelegatorWithdrawAddressResponseParams = {
    value: QueryDelegatorWithdrawAddressResponse;
};
type validatorCurrentRewardsParams = {
    value: ValidatorCurrentRewards;
};
type validatorSlashEventParams = {
    value: ValidatorSlashEvent;
};
type validatorCurrentRewardsRecordParams = {
    value: ValidatorCurrentRewardsRecord;
};
type msgSetWithdrawAddressParams = {
    value: MsgSetWithdrawAddress;
};
type msgUpdateParamsParams = {
    value: MsgUpdateParams;
};
type queryParamsResponseParams = {
    value: QueryParamsResponse;
};
type msgWithdrawValidatorCommissionParams = {
    value: MsgWithdrawValidatorCommission;
};
type queryCommunityPoolResponseParams = {
    value: QueryCommunityPoolResponse;
};
type validatorHistoricalRewardsRecordParams = {
    value: ValidatorHistoricalRewardsRecord;
};
type msgWithdrawDelegatorRewardResponseParams = {
    value: MsgWithdrawDelegatorRewardResponse;
};
type validatorAccumulatedCommissionParams = {
    value: ValidatorAccumulatedCommission;
};
type genesisStateParams = {
    value: GenesisState;
};
type msgSetWithdrawAddressResponseParams = {
    value: MsgSetWithdrawAddressResponse;
};
type paramsParams = {
    value: Params;
};
type validatorSlashEventsParams = {
    value: ValidatorSlashEvents;
};
type validatorOutstandingRewardsRecordParams = {
    value: ValidatorOutstandingRewardsRecord;
};
type queryValidatorCommissionResponseParams = {
    value: QueryValidatorCommissionResponse;
};
type delegatorWithdrawInfoParams = {
    value: DelegatorWithdrawInfo;
};
type msgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
};
type queryParamsRequestParams = {
    value: QueryParamsRequest;
};
type queryValidatorDistributionInfoRequestParams = {
    value: QueryValidatorDistributionInfoRequest;
};
type queryValidatorOutstandingRewardsResponseParams = {
    value: QueryValidatorOutstandingRewardsResponse;
};
type delegationDelegatorRewardParams = {
    value: DelegationDelegatorReward;
};
type delegatorStartingInfoRecordParams = {
    value: DelegatorStartingInfoRecord;
};
type msgWithdrawDelegatorRewardParams = {
    value: MsgWithdrawDelegatorReward;
};
type validatorOutstandingRewardsParams = {
    value: ValidatorOutstandingRewards;
};
type queryValidatorSlashesResponseParams = {
    value: QueryValidatorSlashesResponse;
};
type queryDelegationTotalRewardsRequestParams = {
    value: QueryDelegationTotalRewardsRequest;
};
type queryCommunityPoolRequestParams = {
    value: QueryCommunityPoolRequest;
};
type msgDepositValidatorRewardsPoolResponseParams = {
    value: MsgDepositValidatorRewardsPoolResponse;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendValidatorSlashEventRecord({ value, fee, memo }: sendValidatorSlashEventRecordParams): Promise<DeliverTxResponse>;
    sendMsgFundCommunityPool({ value, fee, memo }: sendMsgFundCommunityPoolParams): Promise<DeliverTxResponse>;
    sendQueryDelegationTotalRewardsResponse({ value, fee, memo }: sendQueryDelegationTotalRewardsResponseParams): Promise<DeliverTxResponse>;
    sendCommunityPoolSpendProposalWithDeposit({ value, fee, memo }: sendCommunityPoolSpendProposalWithDepositParams): Promise<DeliverTxResponse>;
    sendQueryValidatorOutstandingRewardsRequest({ value, fee, memo }: sendQueryValidatorOutstandingRewardsRequestParams): Promise<DeliverTxResponse>;
    sendQueryValidatorSlashesRequest({ value, fee, memo }: sendQueryValidatorSlashesRequestParams): Promise<DeliverTxResponse>;
    sendQueryDelegationRewardsResponse({ value, fee, memo }: sendQueryDelegationRewardsResponseParams): Promise<DeliverTxResponse>;
    sendQueryDelegatorValidatorsRequest({ value, fee, memo }: sendQueryDelegatorValidatorsRequestParams): Promise<DeliverTxResponse>;
    sendQueryDelegatorValidatorsResponse({ value, fee, memo }: sendQueryDelegatorValidatorsResponseParams): Promise<DeliverTxResponse>;
    sendCommunityPoolSpendProposal({ value, fee, memo }: sendCommunityPoolSpendProposalParams): Promise<DeliverTxResponse>;
    sendValidatorHistoricalRewards({ value, fee, memo }: sendValidatorHistoricalRewardsParams): Promise<DeliverTxResponse>;
    sendFeePool({ value, fee, memo }: sendFeePoolParams): Promise<DeliverTxResponse>;
    sendMsgCommunityPoolSpend({ value, fee, memo }: sendMsgCommunityPoolSpendParams): Promise<DeliverTxResponse>;
    sendMsgWithdrawValidatorCommissionResponse({ value, fee, memo }: sendMsgWithdrawValidatorCommissionResponseParams): Promise<DeliverTxResponse>;
    sendQueryValidatorDistributionInfoResponse({ value, fee, memo }: sendQueryValidatorDistributionInfoResponseParams): Promise<DeliverTxResponse>;
    sendQueryDelegationRewardsRequest({ value, fee, memo }: sendQueryDelegationRewardsRequestParams): Promise<DeliverTxResponse>;
    sendDelegatorStartingInfo({ value, fee, memo }: sendDelegatorStartingInfoParams): Promise<DeliverTxResponse>;
    sendValidatorAccumulatedCommissionRecord({ value, fee, memo }: sendValidatorAccumulatedCommissionRecordParams): Promise<DeliverTxResponse>;
    sendMsgCommunityPoolSpendResponse({ value, fee, memo }: sendMsgCommunityPoolSpendResponseParams): Promise<DeliverTxResponse>;
    sendMsgDepositValidatorRewardsPool({ value, fee, memo }: sendMsgDepositValidatorRewardsPoolParams): Promise<DeliverTxResponse>;
    sendMsgFundCommunityPoolResponse({ value, fee, memo }: sendMsgFundCommunityPoolResponseParams): Promise<DeliverTxResponse>;
    sendQueryValidatorCommissionRequest({ value, fee, memo }: sendQueryValidatorCommissionRequestParams): Promise<DeliverTxResponse>;
    sendQueryDelegatorWithdrawAddressRequest({ value, fee, memo }: sendQueryDelegatorWithdrawAddressRequestParams): Promise<DeliverTxResponse>;
    sendQueryDelegatorWithdrawAddressResponse({ value, fee, memo }: sendQueryDelegatorWithdrawAddressResponseParams): Promise<DeliverTxResponse>;
    sendValidatorCurrentRewards({ value, fee, memo }: sendValidatorCurrentRewardsParams): Promise<DeliverTxResponse>;
    sendValidatorSlashEvent({ value, fee, memo }: sendValidatorSlashEventParams): Promise<DeliverTxResponse>;
    sendValidatorCurrentRewardsRecord({ value, fee, memo }: sendValidatorCurrentRewardsRecordParams): Promise<DeliverTxResponse>;
    sendMsgSetWithdrawAddress({ value, fee, memo }: sendMsgSetWithdrawAddressParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParams({ value, fee, memo }: sendMsgUpdateParamsParams): Promise<DeliverTxResponse>;
    sendQueryParamsResponse({ value, fee, memo }: sendQueryParamsResponseParams): Promise<DeliverTxResponse>;
    sendMsgWithdrawValidatorCommission({ value, fee, memo }: sendMsgWithdrawValidatorCommissionParams): Promise<DeliverTxResponse>;
    sendQueryCommunityPoolResponse({ value, fee, memo }: sendQueryCommunityPoolResponseParams): Promise<DeliverTxResponse>;
    sendValidatorHistoricalRewardsRecord({ value, fee, memo }: sendValidatorHistoricalRewardsRecordParams): Promise<DeliverTxResponse>;
    sendMsgWithdrawDelegatorRewardResponse({ value, fee, memo }: sendMsgWithdrawDelegatorRewardResponseParams): Promise<DeliverTxResponse>;
    sendValidatorAccumulatedCommission({ value, fee, memo }: sendValidatorAccumulatedCommissionParams): Promise<DeliverTxResponse>;
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendMsgSetWithdrawAddressResponse({ value, fee, memo }: sendMsgSetWithdrawAddressResponseParams): Promise<DeliverTxResponse>;
    sendParams({ value, fee, memo }: sendParamsParams): Promise<DeliverTxResponse>;
    sendValidatorSlashEvents({ value, fee, memo }: sendValidatorSlashEventsParams): Promise<DeliverTxResponse>;
    sendValidatorOutstandingRewardsRecord({ value, fee, memo }: sendValidatorOutstandingRewardsRecordParams): Promise<DeliverTxResponse>;
    sendQueryValidatorCommissionResponse({ value, fee, memo }: sendQueryValidatorCommissionResponseParams): Promise<DeliverTxResponse>;
    sendDelegatorWithdrawInfo({ value, fee, memo }: sendDelegatorWithdrawInfoParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParamsResponse({ value, fee, memo }: sendMsgUpdateParamsResponseParams): Promise<DeliverTxResponse>;
    sendQueryParamsRequest({ value, fee, memo }: sendQueryParamsRequestParams): Promise<DeliverTxResponse>;
    sendQueryValidatorDistributionInfoRequest({ value, fee, memo }: sendQueryValidatorDistributionInfoRequestParams): Promise<DeliverTxResponse>;
    sendQueryValidatorOutstandingRewardsResponse({ value, fee, memo }: sendQueryValidatorOutstandingRewardsResponseParams): Promise<DeliverTxResponse>;
    sendDelegationDelegatorReward({ value, fee, memo }: sendDelegationDelegatorRewardParams): Promise<DeliverTxResponse>;
    sendDelegatorStartingInfoRecord({ value, fee, memo }: sendDelegatorStartingInfoRecordParams): Promise<DeliverTxResponse>;
    sendMsgWithdrawDelegatorReward({ value, fee, memo }: sendMsgWithdrawDelegatorRewardParams): Promise<DeliverTxResponse>;
    sendValidatorOutstandingRewards({ value, fee, memo }: sendValidatorOutstandingRewardsParams): Promise<DeliverTxResponse>;
    sendQueryValidatorSlashesResponse({ value, fee, memo }: sendQueryValidatorSlashesResponseParams): Promise<DeliverTxResponse>;
    sendQueryDelegationTotalRewardsRequest({ value, fee, memo }: sendQueryDelegationTotalRewardsRequestParams): Promise<DeliverTxResponse>;
    sendQueryCommunityPoolRequest({ value, fee, memo }: sendQueryCommunityPoolRequestParams): Promise<DeliverTxResponse>;
    sendMsgDepositValidatorRewardsPoolResponse({ value, fee, memo }: sendMsgDepositValidatorRewardsPoolResponseParams): Promise<DeliverTxResponse>;
    validatorSlashEventRecord({ value }: validatorSlashEventRecordParams): EncodeObject;
    msgFundCommunityPool({ value }: msgFundCommunityPoolParams): EncodeObject;
    queryDelegationTotalRewardsResponse({ value }: queryDelegationTotalRewardsResponseParams): EncodeObject;
    communityPoolSpendProposalWithDeposit({ value }: communityPoolSpendProposalWithDepositParams): EncodeObject;
    queryValidatorOutstandingRewardsRequest({ value }: queryValidatorOutstandingRewardsRequestParams): EncodeObject;
    queryValidatorSlashesRequest({ value }: queryValidatorSlashesRequestParams): EncodeObject;
    queryDelegationRewardsResponse({ value }: queryDelegationRewardsResponseParams): EncodeObject;
    queryDelegatorValidatorsRequest({ value }: queryDelegatorValidatorsRequestParams): EncodeObject;
    queryDelegatorValidatorsResponse({ value }: queryDelegatorValidatorsResponseParams): EncodeObject;
    communityPoolSpendProposal({ value }: communityPoolSpendProposalParams): EncodeObject;
    validatorHistoricalRewards({ value }: validatorHistoricalRewardsParams): EncodeObject;
    feePool({ value }: feePoolParams): EncodeObject;
    msgCommunityPoolSpend({ value }: msgCommunityPoolSpendParams): EncodeObject;
    msgWithdrawValidatorCommissionResponse({ value }: msgWithdrawValidatorCommissionResponseParams): EncodeObject;
    queryValidatorDistributionInfoResponse({ value }: queryValidatorDistributionInfoResponseParams): EncodeObject;
    queryDelegationRewardsRequest({ value }: queryDelegationRewardsRequestParams): EncodeObject;
    delegatorStartingInfo({ value }: delegatorStartingInfoParams): EncodeObject;
    validatorAccumulatedCommissionRecord({ value }: validatorAccumulatedCommissionRecordParams): EncodeObject;
    msgCommunityPoolSpendResponse({ value }: msgCommunityPoolSpendResponseParams): EncodeObject;
    msgDepositValidatorRewardsPool({ value }: msgDepositValidatorRewardsPoolParams): EncodeObject;
    msgFundCommunityPoolResponse({ value }: msgFundCommunityPoolResponseParams): EncodeObject;
    queryValidatorCommissionRequest({ value }: queryValidatorCommissionRequestParams): EncodeObject;
    queryDelegatorWithdrawAddressRequest({ value }: queryDelegatorWithdrawAddressRequestParams): EncodeObject;
    queryDelegatorWithdrawAddressResponse({ value }: queryDelegatorWithdrawAddressResponseParams): EncodeObject;
    validatorCurrentRewards({ value }: validatorCurrentRewardsParams): EncodeObject;
    validatorSlashEvent({ value }: validatorSlashEventParams): EncodeObject;
    validatorCurrentRewardsRecord({ value }: validatorCurrentRewardsRecordParams): EncodeObject;
    msgSetWithdrawAddress({ value }: msgSetWithdrawAddressParams): EncodeObject;
    msgUpdateParams({ value }: msgUpdateParamsParams): EncodeObject;
    queryParamsResponse({ value }: queryParamsResponseParams): EncodeObject;
    msgWithdrawValidatorCommission({ value }: msgWithdrawValidatorCommissionParams): EncodeObject;
    queryCommunityPoolResponse({ value }: queryCommunityPoolResponseParams): EncodeObject;
    validatorHistoricalRewardsRecord({ value }: validatorHistoricalRewardsRecordParams): EncodeObject;
    msgWithdrawDelegatorRewardResponse({ value }: msgWithdrawDelegatorRewardResponseParams): EncodeObject;
    validatorAccumulatedCommission({ value }: validatorAccumulatedCommissionParams): EncodeObject;
    genesisState({ value }: genesisStateParams): EncodeObject;
    msgSetWithdrawAddressResponse({ value }: msgSetWithdrawAddressResponseParams): EncodeObject;
    params({ value }: paramsParams): EncodeObject;
    validatorSlashEvents({ value }: validatorSlashEventsParams): EncodeObject;
    validatorOutstandingRewardsRecord({ value }: validatorOutstandingRewardsRecordParams): EncodeObject;
    queryValidatorCommissionResponse({ value }: queryValidatorCommissionResponseParams): EncodeObject;
    delegatorWithdrawInfo({ value }: delegatorWithdrawInfoParams): EncodeObject;
    msgUpdateParamsResponse({ value }: msgUpdateParamsResponseParams): EncodeObject;
    queryParamsRequest({ value }: queryParamsRequestParams): EncodeObject;
    queryValidatorDistributionInfoRequest({ value }: queryValidatorDistributionInfoRequestParams): EncodeObject;
    queryValidatorOutstandingRewardsResponse({ value }: queryValidatorOutstandingRewardsResponseParams): EncodeObject;
    delegationDelegatorReward({ value }: delegationDelegatorRewardParams): EncodeObject;
    delegatorStartingInfoRecord({ value }: delegatorStartingInfoRecordParams): EncodeObject;
    msgWithdrawDelegatorReward({ value }: msgWithdrawDelegatorRewardParams): EncodeObject;
    validatorOutstandingRewards({ value }: validatorOutstandingRewardsParams): EncodeObject;
    queryValidatorSlashesResponse({ value }: queryValidatorSlashesResponseParams): EncodeObject;
    queryDelegationTotalRewardsRequest({ value }: queryDelegationTotalRewardsRequestParams): EncodeObject;
    queryCommunityPoolRequest({ value }: queryCommunityPoolRequestParams): EncodeObject;
    msgDepositValidatorRewardsPoolResponse({ value }: msgDepositValidatorRewardsPoolResponseParams): EncodeObject;
};
interface QueryClientOptions {
    addr: string;
}
export declare const queryClient: ({ addr: addr }?: QueryClientOptions) => Api<unknown>;
declare class SDKModule {
    query: ReturnType<typeof queryClient>;
    tx: ReturnType<typeof txClient>;
    structure: Record<string, unknown>;
    registry: Array<[string, GeneratedType]>;
    constructor(client: IgniteClient);
    updateTX(client: IgniteClient): void;
}
declare const IgntModule: (test: IgniteClient) => {
    module: {
        CosmosDistributionV1Beta1: SDKModule;
    };
    registry: [string, GeneratedType][];
};
export default IgntModule;
