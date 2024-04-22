import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { QueryRawContractStateRequest } from "./types/cosmwasm/wasm/v1/query";
import { MsgClearAdmin } from "./types/cosmwasm/wasm/v1/tx";
import { MsgInstantiateContract2 } from "./types/cosmwasm/wasm/v1/tx";
import { MsgStoreAndMigrateContractResponse } from "./types/cosmwasm/wasm/v1/tx";
import { AbsoluteTxPosition } from "./types/cosmwasm/wasm/v1/types";
import { MsgIBCSendResponse } from "./types/cosmwasm/wasm/v1/ibc";
import { MsgIBCCloseChannel } from "./types/cosmwasm/wasm/v1/ibc";
import { QueryPinnedCodesResponse } from "./types/cosmwasm/wasm/v1/query";
import { MsgStoreCode } from "./types/cosmwasm/wasm/v1/tx";
import { UpdateInstantiateConfigProposal } from "./types/cosmwasm/wasm/v1/proposal_legacy";
import { MsgUnpinCodesResponse } from "./types/cosmwasm/wasm/v1/tx";
import { QueryContractInfoResponse } from "./types/cosmwasm/wasm/v1/query";
import { MsgUpdateParams } from "./types/cosmwasm/wasm/v1/tx";
import { InstantiateContractProposal } from "./types/cosmwasm/wasm/v1/proposal_legacy";
import { PinCodesProposal } from "./types/cosmwasm/wasm/v1/proposal_legacy";
import { MsgUpdateAdmin } from "./types/cosmwasm/wasm/v1/tx";
import { MsgAddCodeUploadParamsAddresses } from "./types/cosmwasm/wasm/v1/tx";
import { AcceptedMessageKeysFilter } from "./types/cosmwasm/wasm/v1/authz";
import { MsgStoreCodeResponse } from "./types/cosmwasm/wasm/v1/tx";
import { MsgUnpinCodes } from "./types/cosmwasm/wasm/v1/tx";
import { StoreCodeProposal } from "./types/cosmwasm/wasm/v1/proposal_legacy";
import { MsgPinCodesResponse } from "./types/cosmwasm/wasm/v1/tx";
import { MsgUpdateContractLabel } from "./types/cosmwasm/wasm/v1/tx";
import { MsgStoreAndInstantiateContractResponse } from "./types/cosmwasm/wasm/v1/tx";
import { MsgAddCodeUploadParamsAddressesResponse } from "./types/cosmwasm/wasm/v1/tx";
import { MsgInstantiateContract } from "./types/cosmwasm/wasm/v1/tx";
import { AccessConfigUpdate } from "./types/cosmwasm/wasm/v1/proposal_legacy";
import { QueryContractsByCodeRequest } from "./types/cosmwasm/wasm/v1/query";
import { MaxFundsLimit } from "./types/cosmwasm/wasm/v1/authz";
import { QuerySmartContractStateRequest } from "./types/cosmwasm/wasm/v1/query";
import { QueryCodesRequest } from "./types/cosmwasm/wasm/v1/query";
import { AcceptedMessagesFilter } from "./types/cosmwasm/wasm/v1/authz";
import { ContractCodeHistoryEntry } from "./types/cosmwasm/wasm/v1/types";
import { QueryContractInfoRequest } from "./types/cosmwasm/wasm/v1/query";
import { QueryParamsResponse } from "./types/cosmwasm/wasm/v1/query";
import { QueryRawContractStateResponse } from "./types/cosmwasm/wasm/v1/query";
import { QueryPinnedCodesRequest } from "./types/cosmwasm/wasm/v1/query";
import { MsgUpdateInstantiateConfig } from "./types/cosmwasm/wasm/v1/tx";
import { MigrateContractProposal } from "./types/cosmwasm/wasm/v1/proposal_legacy";
import { QueryCodesResponse } from "./types/cosmwasm/wasm/v1/query";
import { InstantiateContract2Proposal } from "./types/cosmwasm/wasm/v1/proposal_legacy";
import { StoreAndInstantiateContractProposal } from "./types/cosmwasm/wasm/v1/proposal_legacy";
import { ContractGrant } from "./types/cosmwasm/wasm/v1/authz";
import { QuerySmartContractStateResponse } from "./types/cosmwasm/wasm/v1/query";
import { ExecuteContractProposal } from "./types/cosmwasm/wasm/v1/proposal_legacy";
import { ContractExecutionAuthorization } from "./types/cosmwasm/wasm/v1/authz";
import { MsgInstantiateContractResponse } from "./types/cosmwasm/wasm/v1/tx";
import { MsgUpdateParamsResponse } from "./types/cosmwasm/wasm/v1/tx";
import { MsgRemoveCodeUploadParamsAddressesResponse } from "./types/cosmwasm/wasm/v1/tx";
import { QueryContractHistoryResponse } from "./types/cosmwasm/wasm/v1/query";
import { QueryAllContractStateResponse } from "./types/cosmwasm/wasm/v1/query";
import { MsgStoreAndMigrateContract } from "./types/cosmwasm/wasm/v1/tx";
import { CombinedLimit } from "./types/cosmwasm/wasm/v1/authz";
import { Contract } from "./types/cosmwasm/wasm/v1/genesis";
import { QueryContractsByCreatorRequest } from "./types/cosmwasm/wasm/v1/query";
import { MsgIBCSend } from "./types/cosmwasm/wasm/v1/ibc";
import { QueryAllContractStateRequest } from "./types/cosmwasm/wasm/v1/query";
import { QueryParamsRequest } from "./types/cosmwasm/wasm/v1/query";
import { MsgUpdateContractLabelResponse } from "./types/cosmwasm/wasm/v1/tx";
import { Sequence } from "./types/cosmwasm/wasm/v1/genesis";
import { SudoContractProposal } from "./types/cosmwasm/wasm/v1/proposal_legacy";
import { AllowAllMessagesFilter } from "./types/cosmwasm/wasm/v1/authz";
import { MaxCallsLimit } from "./types/cosmwasm/wasm/v1/authz";
import { QueryCodeRequest } from "./types/cosmwasm/wasm/v1/query";
import { MsgExecuteContractResponse } from "./types/cosmwasm/wasm/v1/tx";
import { Params } from "./types/cosmwasm/wasm/v1/types";
import { MsgUpdateAdminResponse } from "./types/cosmwasm/wasm/v1/tx";
import { Model } from "./types/cosmwasm/wasm/v1/types";
import { MsgMigrateContractResponse } from "./types/cosmwasm/wasm/v1/tx";
import { MsgSudoContractResponse } from "./types/cosmwasm/wasm/v1/tx";
import { ContractInfo } from "./types/cosmwasm/wasm/v1/types";
import { QueryContractHistoryRequest } from "./types/cosmwasm/wasm/v1/query";
import { QueryCodeResponse } from "./types/cosmwasm/wasm/v1/query";
import { QueryContractsByCreatorResponse } from "./types/cosmwasm/wasm/v1/query";
import { GenesisState } from "./types/cosmwasm/wasm/v1/genesis";
import { MsgMigrateContract } from "./types/cosmwasm/wasm/v1/tx";
import { UnpinCodesProposal } from "./types/cosmwasm/wasm/v1/proposal_legacy";
import { ContractMigrationAuthorization } from "./types/cosmwasm/wasm/v1/authz";
import { MsgInstantiateContract2Response } from "./types/cosmwasm/wasm/v1/tx";
import { MsgExecuteContract } from "./types/cosmwasm/wasm/v1/tx";
import { AccessTypeParam } from "./types/cosmwasm/wasm/v1/types";
import { MsgRemoveCodeUploadParamsAddresses } from "./types/cosmwasm/wasm/v1/tx";
import { CodeGrant } from "./types/cosmwasm/wasm/v1/authz";
import { Code } from "./types/cosmwasm/wasm/v1/genesis";
import { UpdateAdminProposal } from "./types/cosmwasm/wasm/v1/proposal_legacy";
import { MsgUpdateInstantiateConfigResponse } from "./types/cosmwasm/wasm/v1/tx";
import { CodeInfo } from "./types/cosmwasm/wasm/v1/types";
import { QueryContractsByCodeResponse } from "./types/cosmwasm/wasm/v1/query";
import { CodeInfoResponse } from "./types/cosmwasm/wasm/v1/query";
import { MsgClearAdminResponse } from "./types/cosmwasm/wasm/v1/tx";
import { MsgPinCodes } from "./types/cosmwasm/wasm/v1/tx";
import { MsgSudoContract } from "./types/cosmwasm/wasm/v1/tx";
import { MsgStoreAndInstantiateContract } from "./types/cosmwasm/wasm/v1/tx";
import { ClearAdminProposal } from "./types/cosmwasm/wasm/v1/proposal_legacy";
import { StoreCodeAuthorization } from "./types/cosmwasm/wasm/v1/authz";
import { AccessConfig } from "./types/cosmwasm/wasm/v1/types";
export { QueryRawContractStateRequest, MsgClearAdmin, MsgInstantiateContract2, MsgStoreAndMigrateContractResponse, AbsoluteTxPosition, MsgIBCSendResponse, MsgIBCCloseChannel, QueryPinnedCodesResponse, MsgStoreCode, UpdateInstantiateConfigProposal, MsgUnpinCodesResponse, QueryContractInfoResponse, MsgUpdateParams, InstantiateContractProposal, PinCodesProposal, MsgUpdateAdmin, MsgAddCodeUploadParamsAddresses, AcceptedMessageKeysFilter, MsgStoreCodeResponse, MsgUnpinCodes, StoreCodeProposal, MsgPinCodesResponse, MsgUpdateContractLabel, MsgStoreAndInstantiateContractResponse, MsgAddCodeUploadParamsAddressesResponse, MsgInstantiateContract, AccessConfigUpdate, QueryContractsByCodeRequest, MaxFundsLimit, QuerySmartContractStateRequest, QueryCodesRequest, AcceptedMessagesFilter, ContractCodeHistoryEntry, QueryContractInfoRequest, QueryParamsResponse, QueryRawContractStateResponse, QueryPinnedCodesRequest, MsgUpdateInstantiateConfig, MigrateContractProposal, QueryCodesResponse, InstantiateContract2Proposal, StoreAndInstantiateContractProposal, ContractGrant, QuerySmartContractStateResponse, ExecuteContractProposal, ContractExecutionAuthorization, MsgInstantiateContractResponse, MsgUpdateParamsResponse, MsgRemoveCodeUploadParamsAddressesResponse, QueryContractHistoryResponse, QueryAllContractStateResponse, MsgStoreAndMigrateContract, CombinedLimit, Contract, QueryContractsByCreatorRequest, MsgIBCSend, QueryAllContractStateRequest, QueryParamsRequest, MsgUpdateContractLabelResponse, Sequence, SudoContractProposal, AllowAllMessagesFilter, MaxCallsLimit, QueryCodeRequest, MsgExecuteContractResponse, Params, MsgUpdateAdminResponse, Model, MsgMigrateContractResponse, MsgSudoContractResponse, ContractInfo, QueryContractHistoryRequest, QueryCodeResponse, QueryContractsByCreatorResponse, GenesisState, MsgMigrateContract, UnpinCodesProposal, ContractMigrationAuthorization, MsgInstantiateContract2Response, MsgExecuteContract, AccessTypeParam, MsgRemoveCodeUploadParamsAddresses, CodeGrant, Code, UpdateAdminProposal, MsgUpdateInstantiateConfigResponse, CodeInfo, QueryContractsByCodeResponse, CodeInfoResponse, MsgClearAdminResponse, MsgPinCodes, MsgSudoContract, MsgStoreAndInstantiateContract, ClearAdminProposal, StoreCodeAuthorization, AccessConfig };
type sendQueryRawContractStateRequestParams = {
    value: QueryRawContractStateRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgClearAdminParams = {
    value: MsgClearAdmin;
    fee?: StdFee;
    memo?: string;
};
type sendMsgInstantiateContract2Params = {
    value: MsgInstantiateContract2;
    fee?: StdFee;
    memo?: string;
};
type sendMsgStoreAndMigrateContractResponseParams = {
    value: MsgStoreAndMigrateContractResponse;
    fee?: StdFee;
    memo?: string;
};
type sendAbsoluteTxPositionParams = {
    value: AbsoluteTxPosition;
    fee?: StdFee;
    memo?: string;
};
type sendMsgIBCSendResponseParams = {
    value: MsgIBCSendResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgIBCCloseChannelParams = {
    value: MsgIBCCloseChannel;
    fee?: StdFee;
    memo?: string;
};
type sendQueryPinnedCodesResponseParams = {
    value: QueryPinnedCodesResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgStoreCodeParams = {
    value: MsgStoreCode;
    fee?: StdFee;
    memo?: string;
};
type sendUpdateInstantiateConfigProposalParams = {
    value: UpdateInstantiateConfigProposal;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUnpinCodesResponseParams = {
    value: MsgUnpinCodesResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryContractInfoResponseParams = {
    value: QueryContractInfoResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsParams = {
    value: MsgUpdateParams;
    fee?: StdFee;
    memo?: string;
};
type sendInstantiateContractProposalParams = {
    value: InstantiateContractProposal;
    fee?: StdFee;
    memo?: string;
};
type sendPinCodesProposalParams = {
    value: PinCodesProposal;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateAdminParams = {
    value: MsgUpdateAdmin;
    fee?: StdFee;
    memo?: string;
};
type sendMsgAddCodeUploadParamsAddressesParams = {
    value: MsgAddCodeUploadParamsAddresses;
    fee?: StdFee;
    memo?: string;
};
type sendAcceptedMessageKeysFilterParams = {
    value: AcceptedMessageKeysFilter;
    fee?: StdFee;
    memo?: string;
};
type sendMsgStoreCodeResponseParams = {
    value: MsgStoreCodeResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUnpinCodesParams = {
    value: MsgUnpinCodes;
    fee?: StdFee;
    memo?: string;
};
type sendStoreCodeProposalParams = {
    value: StoreCodeProposal;
    fee?: StdFee;
    memo?: string;
};
type sendMsgPinCodesResponseParams = {
    value: MsgPinCodesResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateContractLabelParams = {
    value: MsgUpdateContractLabel;
    fee?: StdFee;
    memo?: string;
};
type sendMsgStoreAndInstantiateContractResponseParams = {
    value: MsgStoreAndInstantiateContractResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgAddCodeUploadParamsAddressesResponseParams = {
    value: MsgAddCodeUploadParamsAddressesResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgInstantiateContractParams = {
    value: MsgInstantiateContract;
    fee?: StdFee;
    memo?: string;
};
type sendAccessConfigUpdateParams = {
    value: AccessConfigUpdate;
    fee?: StdFee;
    memo?: string;
};
type sendQueryContractsByCodeRequestParams = {
    value: QueryContractsByCodeRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMaxFundsLimitParams = {
    value: MaxFundsLimit;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySmartContractStateRequestParams = {
    value: QuerySmartContractStateRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryCodesRequestParams = {
    value: QueryCodesRequest;
    fee?: StdFee;
    memo?: string;
};
type sendAcceptedMessagesFilterParams = {
    value: AcceptedMessagesFilter;
    fee?: StdFee;
    memo?: string;
};
type sendContractCodeHistoryEntryParams = {
    value: ContractCodeHistoryEntry;
    fee?: StdFee;
    memo?: string;
};
type sendQueryContractInfoRequestParams = {
    value: QueryContractInfoRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsResponseParams = {
    value: QueryParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryRawContractStateResponseParams = {
    value: QueryRawContractStateResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryPinnedCodesRequestParams = {
    value: QueryPinnedCodesRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateInstantiateConfigParams = {
    value: MsgUpdateInstantiateConfig;
    fee?: StdFee;
    memo?: string;
};
type sendMigrateContractProposalParams = {
    value: MigrateContractProposal;
    fee?: StdFee;
    memo?: string;
};
type sendQueryCodesResponseParams = {
    value: QueryCodesResponse;
    fee?: StdFee;
    memo?: string;
};
type sendInstantiateContract2ProposalParams = {
    value: InstantiateContract2Proposal;
    fee?: StdFee;
    memo?: string;
};
type sendStoreAndInstantiateContractProposalParams = {
    value: StoreAndInstantiateContractProposal;
    fee?: StdFee;
    memo?: string;
};
type sendContractGrantParams = {
    value: ContractGrant;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySmartContractStateResponseParams = {
    value: QuerySmartContractStateResponse;
    fee?: StdFee;
    memo?: string;
};
type sendExecuteContractProposalParams = {
    value: ExecuteContractProposal;
    fee?: StdFee;
    memo?: string;
};
type sendContractExecutionAuthorizationParams = {
    value: ContractExecutionAuthorization;
    fee?: StdFee;
    memo?: string;
};
type sendMsgInstantiateContractResponseParams = {
    value: MsgInstantiateContractResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRemoveCodeUploadParamsAddressesResponseParams = {
    value: MsgRemoveCodeUploadParamsAddressesResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryContractHistoryResponseParams = {
    value: QueryContractHistoryResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAllContractStateResponseParams = {
    value: QueryAllContractStateResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgStoreAndMigrateContractParams = {
    value: MsgStoreAndMigrateContract;
    fee?: StdFee;
    memo?: string;
};
type sendCombinedLimitParams = {
    value: CombinedLimit;
    fee?: StdFee;
    memo?: string;
};
type sendContractParams = {
    value: Contract;
    fee?: StdFee;
    memo?: string;
};
type sendQueryContractsByCreatorRequestParams = {
    value: QueryContractsByCreatorRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgIBCSendParams = {
    value: MsgIBCSend;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAllContractStateRequestParams = {
    value: QueryAllContractStateRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsRequestParams = {
    value: QueryParamsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateContractLabelResponseParams = {
    value: MsgUpdateContractLabelResponse;
    fee?: StdFee;
    memo?: string;
};
type sendSequenceParams = {
    value: Sequence;
    fee?: StdFee;
    memo?: string;
};
type sendSudoContractProposalParams = {
    value: SudoContractProposal;
    fee?: StdFee;
    memo?: string;
};
type sendAllowAllMessagesFilterParams = {
    value: AllowAllMessagesFilter;
    fee?: StdFee;
    memo?: string;
};
type sendMaxCallsLimitParams = {
    value: MaxCallsLimit;
    fee?: StdFee;
    memo?: string;
};
type sendQueryCodeRequestParams = {
    value: QueryCodeRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgExecuteContractResponseParams = {
    value: MsgExecuteContractResponse;
    fee?: StdFee;
    memo?: string;
};
type sendParamsParams = {
    value: Params;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateAdminResponseParams = {
    value: MsgUpdateAdminResponse;
    fee?: StdFee;
    memo?: string;
};
type sendModelParams = {
    value: Model;
    fee?: StdFee;
    memo?: string;
};
type sendMsgMigrateContractResponseParams = {
    value: MsgMigrateContractResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgSudoContractResponseParams = {
    value: MsgSudoContractResponse;
    fee?: StdFee;
    memo?: string;
};
type sendContractInfoParams = {
    value: ContractInfo;
    fee?: StdFee;
    memo?: string;
};
type sendQueryContractHistoryRequestParams = {
    value: QueryContractHistoryRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryCodeResponseParams = {
    value: QueryCodeResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryContractsByCreatorResponseParams = {
    value: QueryContractsByCreatorResponse;
    fee?: StdFee;
    memo?: string;
};
type sendGenesisStateParams = {
    value: GenesisState;
    fee?: StdFee;
    memo?: string;
};
type sendMsgMigrateContractParams = {
    value: MsgMigrateContract;
    fee?: StdFee;
    memo?: string;
};
type sendUnpinCodesProposalParams = {
    value: UnpinCodesProposal;
    fee?: StdFee;
    memo?: string;
};
type sendContractMigrationAuthorizationParams = {
    value: ContractMigrationAuthorization;
    fee?: StdFee;
    memo?: string;
};
type sendMsgInstantiateContract2ResponseParams = {
    value: MsgInstantiateContract2Response;
    fee?: StdFee;
    memo?: string;
};
type sendMsgExecuteContractParams = {
    value: MsgExecuteContract;
    fee?: StdFee;
    memo?: string;
};
type sendAccessTypeParamParams = {
    value: AccessTypeParam;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRemoveCodeUploadParamsAddressesParams = {
    value: MsgRemoveCodeUploadParamsAddresses;
    fee?: StdFee;
    memo?: string;
};
type sendCodeGrantParams = {
    value: CodeGrant;
    fee?: StdFee;
    memo?: string;
};
type sendCodeParams = {
    value: Code;
    fee?: StdFee;
    memo?: string;
};
type sendUpdateAdminProposalParams = {
    value: UpdateAdminProposal;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateInstantiateConfigResponseParams = {
    value: MsgUpdateInstantiateConfigResponse;
    fee?: StdFee;
    memo?: string;
};
type sendCodeInfoParams = {
    value: CodeInfo;
    fee?: StdFee;
    memo?: string;
};
type sendQueryContractsByCodeResponseParams = {
    value: QueryContractsByCodeResponse;
    fee?: StdFee;
    memo?: string;
};
type sendCodeInfoResponseParams = {
    value: CodeInfoResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgClearAdminResponseParams = {
    value: MsgClearAdminResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgPinCodesParams = {
    value: MsgPinCodes;
    fee?: StdFee;
    memo?: string;
};
type sendMsgSudoContractParams = {
    value: MsgSudoContract;
    fee?: StdFee;
    memo?: string;
};
type sendMsgStoreAndInstantiateContractParams = {
    value: MsgStoreAndInstantiateContract;
    fee?: StdFee;
    memo?: string;
};
type sendClearAdminProposalParams = {
    value: ClearAdminProposal;
    fee?: StdFee;
    memo?: string;
};
type sendStoreCodeAuthorizationParams = {
    value: StoreCodeAuthorization;
    fee?: StdFee;
    memo?: string;
};
type sendAccessConfigParams = {
    value: AccessConfig;
    fee?: StdFee;
    memo?: string;
};
type queryRawContractStateRequestParams = {
    value: QueryRawContractStateRequest;
};
type msgClearAdminParams = {
    value: MsgClearAdmin;
};
type msgInstantiateContract2Params = {
    value: MsgInstantiateContract2;
};
type msgStoreAndMigrateContractResponseParams = {
    value: MsgStoreAndMigrateContractResponse;
};
type absoluteTxPositionParams = {
    value: AbsoluteTxPosition;
};
type msgIbcsendResponseParams = {
    value: MsgIBCSendResponse;
};
type msgIbccloseChannelParams = {
    value: MsgIBCCloseChannel;
};
type queryPinnedCodesResponseParams = {
    value: QueryPinnedCodesResponse;
};
type msgStoreCodeParams = {
    value: MsgStoreCode;
};
type updateInstantiateConfigProposalParams = {
    value: UpdateInstantiateConfigProposal;
};
type msgUnpinCodesResponseParams = {
    value: MsgUnpinCodesResponse;
};
type queryContractInfoResponseParams = {
    value: QueryContractInfoResponse;
};
type msgUpdateParamsParams = {
    value: MsgUpdateParams;
};
type instantiateContractProposalParams = {
    value: InstantiateContractProposal;
};
type pinCodesProposalParams = {
    value: PinCodesProposal;
};
type msgUpdateAdminParams = {
    value: MsgUpdateAdmin;
};
type msgAddCodeUploadParamsAddressesParams = {
    value: MsgAddCodeUploadParamsAddresses;
};
type acceptedMessageKeysFilterParams = {
    value: AcceptedMessageKeysFilter;
};
type msgStoreCodeResponseParams = {
    value: MsgStoreCodeResponse;
};
type msgUnpinCodesParams = {
    value: MsgUnpinCodes;
};
type storeCodeProposalParams = {
    value: StoreCodeProposal;
};
type msgPinCodesResponseParams = {
    value: MsgPinCodesResponse;
};
type msgUpdateContractLabelParams = {
    value: MsgUpdateContractLabel;
};
type msgStoreAndInstantiateContractResponseParams = {
    value: MsgStoreAndInstantiateContractResponse;
};
type msgAddCodeUploadParamsAddressesResponseParams = {
    value: MsgAddCodeUploadParamsAddressesResponse;
};
type msgInstantiateContractParams = {
    value: MsgInstantiateContract;
};
type accessConfigUpdateParams = {
    value: AccessConfigUpdate;
};
type queryContractsByCodeRequestParams = {
    value: QueryContractsByCodeRequest;
};
type maxFundsLimitParams = {
    value: MaxFundsLimit;
};
type querySmartContractStateRequestParams = {
    value: QuerySmartContractStateRequest;
};
type queryCodesRequestParams = {
    value: QueryCodesRequest;
};
type acceptedMessagesFilterParams = {
    value: AcceptedMessagesFilter;
};
type contractCodeHistoryEntryParams = {
    value: ContractCodeHistoryEntry;
};
type queryContractInfoRequestParams = {
    value: QueryContractInfoRequest;
};
type queryParamsResponseParams = {
    value: QueryParamsResponse;
};
type queryRawContractStateResponseParams = {
    value: QueryRawContractStateResponse;
};
type queryPinnedCodesRequestParams = {
    value: QueryPinnedCodesRequest;
};
type msgUpdateInstantiateConfigParams = {
    value: MsgUpdateInstantiateConfig;
};
type migrateContractProposalParams = {
    value: MigrateContractProposal;
};
type queryCodesResponseParams = {
    value: QueryCodesResponse;
};
type instantiateContract2ProposalParams = {
    value: InstantiateContract2Proposal;
};
type storeAndInstantiateContractProposalParams = {
    value: StoreAndInstantiateContractProposal;
};
type contractGrantParams = {
    value: ContractGrant;
};
type querySmartContractStateResponseParams = {
    value: QuerySmartContractStateResponse;
};
type executeContractProposalParams = {
    value: ExecuteContractProposal;
};
type contractExecutionAuthorizationParams = {
    value: ContractExecutionAuthorization;
};
type msgInstantiateContractResponseParams = {
    value: MsgInstantiateContractResponse;
};
type msgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
};
type msgRemoveCodeUploadParamsAddressesResponseParams = {
    value: MsgRemoveCodeUploadParamsAddressesResponse;
};
type queryContractHistoryResponseParams = {
    value: QueryContractHistoryResponse;
};
type queryAllContractStateResponseParams = {
    value: QueryAllContractStateResponse;
};
type msgStoreAndMigrateContractParams = {
    value: MsgStoreAndMigrateContract;
};
type combinedLimitParams = {
    value: CombinedLimit;
};
type contractParams = {
    value: Contract;
};
type queryContractsByCreatorRequestParams = {
    value: QueryContractsByCreatorRequest;
};
type msgIbcsendParams = {
    value: MsgIBCSend;
};
type queryAllContractStateRequestParams = {
    value: QueryAllContractStateRequest;
};
type queryParamsRequestParams = {
    value: QueryParamsRequest;
};
type msgUpdateContractLabelResponseParams = {
    value: MsgUpdateContractLabelResponse;
};
type sequenceParams = {
    value: Sequence;
};
type sudoContractProposalParams = {
    value: SudoContractProposal;
};
type allowAllMessagesFilterParams = {
    value: AllowAllMessagesFilter;
};
type maxCallsLimitParams = {
    value: MaxCallsLimit;
};
type queryCodeRequestParams = {
    value: QueryCodeRequest;
};
type msgExecuteContractResponseParams = {
    value: MsgExecuteContractResponse;
};
type paramsParams = {
    value: Params;
};
type msgUpdateAdminResponseParams = {
    value: MsgUpdateAdminResponse;
};
type modelParams = {
    value: Model;
};
type msgMigrateContractResponseParams = {
    value: MsgMigrateContractResponse;
};
type msgSudoContractResponseParams = {
    value: MsgSudoContractResponse;
};
type contractInfoParams = {
    value: ContractInfo;
};
type queryContractHistoryRequestParams = {
    value: QueryContractHistoryRequest;
};
type queryCodeResponseParams = {
    value: QueryCodeResponse;
};
type queryContractsByCreatorResponseParams = {
    value: QueryContractsByCreatorResponse;
};
type genesisStateParams = {
    value: GenesisState;
};
type msgMigrateContractParams = {
    value: MsgMigrateContract;
};
type unpinCodesProposalParams = {
    value: UnpinCodesProposal;
};
type contractMigrationAuthorizationParams = {
    value: ContractMigrationAuthorization;
};
type msgInstantiateContract2ResponseParams = {
    value: MsgInstantiateContract2Response;
};
type msgExecuteContractParams = {
    value: MsgExecuteContract;
};
type accessTypeParamParams = {
    value: AccessTypeParam;
};
type msgRemoveCodeUploadParamsAddressesParams = {
    value: MsgRemoveCodeUploadParamsAddresses;
};
type codeGrantParams = {
    value: CodeGrant;
};
type codeParams = {
    value: Code;
};
type updateAdminProposalParams = {
    value: UpdateAdminProposal;
};
type msgUpdateInstantiateConfigResponseParams = {
    value: MsgUpdateInstantiateConfigResponse;
};
type codeInfoParams = {
    value: CodeInfo;
};
type queryContractsByCodeResponseParams = {
    value: QueryContractsByCodeResponse;
};
type codeInfoResponseParams = {
    value: CodeInfoResponse;
};
type msgClearAdminResponseParams = {
    value: MsgClearAdminResponse;
};
type msgPinCodesParams = {
    value: MsgPinCodes;
};
type msgSudoContractParams = {
    value: MsgSudoContract;
};
type msgStoreAndInstantiateContractParams = {
    value: MsgStoreAndInstantiateContract;
};
type clearAdminProposalParams = {
    value: ClearAdminProposal;
};
type storeCodeAuthorizationParams = {
    value: StoreCodeAuthorization;
};
type accessConfigParams = {
    value: AccessConfig;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendQueryRawContractStateRequest({ value, fee, memo }: sendQueryRawContractStateRequestParams): Promise<DeliverTxResponse>;
    sendMsgClearAdmin({ value, fee, memo }: sendMsgClearAdminParams): Promise<DeliverTxResponse>;
    sendMsgInstantiateContract2({ value, fee, memo }: sendMsgInstantiateContract2Params): Promise<DeliverTxResponse>;
    sendMsgStoreAndMigrateContractResponse({ value, fee, memo }: sendMsgStoreAndMigrateContractResponseParams): Promise<DeliverTxResponse>;
    sendAbsoluteTxPosition({ value, fee, memo }: sendAbsoluteTxPositionParams): Promise<DeliverTxResponse>;
    sendMsgIBCSendResponse({ value, fee, memo }: sendMsgIBCSendResponseParams): Promise<DeliverTxResponse>;
    sendMsgIBCCloseChannel({ value, fee, memo }: sendMsgIBCCloseChannelParams): Promise<DeliverTxResponse>;
    sendQueryPinnedCodesResponse({ value, fee, memo }: sendQueryPinnedCodesResponseParams): Promise<DeliverTxResponse>;
    sendMsgStoreCode({ value, fee, memo }: sendMsgStoreCodeParams): Promise<DeliverTxResponse>;
    sendUpdateInstantiateConfigProposal({ value, fee, memo }: sendUpdateInstantiateConfigProposalParams): Promise<DeliverTxResponse>;
    sendMsgUnpinCodesResponse({ value, fee, memo }: sendMsgUnpinCodesResponseParams): Promise<DeliverTxResponse>;
    sendQueryContractInfoResponse({ value, fee, memo }: sendQueryContractInfoResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParams({ value, fee, memo }: sendMsgUpdateParamsParams): Promise<DeliverTxResponse>;
    sendInstantiateContractProposal({ value, fee, memo }: sendInstantiateContractProposalParams): Promise<DeliverTxResponse>;
    sendPinCodesProposal({ value, fee, memo }: sendPinCodesProposalParams): Promise<DeliverTxResponse>;
    sendMsgUpdateAdmin({ value, fee, memo }: sendMsgUpdateAdminParams): Promise<DeliverTxResponse>;
    sendMsgAddCodeUploadParamsAddresses({ value, fee, memo }: sendMsgAddCodeUploadParamsAddressesParams): Promise<DeliverTxResponse>;
    sendAcceptedMessageKeysFilter({ value, fee, memo }: sendAcceptedMessageKeysFilterParams): Promise<DeliverTxResponse>;
    sendMsgStoreCodeResponse({ value, fee, memo }: sendMsgStoreCodeResponseParams): Promise<DeliverTxResponse>;
    sendMsgUnpinCodes({ value, fee, memo }: sendMsgUnpinCodesParams): Promise<DeliverTxResponse>;
    sendStoreCodeProposal({ value, fee, memo }: sendStoreCodeProposalParams): Promise<DeliverTxResponse>;
    sendMsgPinCodesResponse({ value, fee, memo }: sendMsgPinCodesResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateContractLabel({ value, fee, memo }: sendMsgUpdateContractLabelParams): Promise<DeliverTxResponse>;
    sendMsgStoreAndInstantiateContractResponse({ value, fee, memo }: sendMsgStoreAndInstantiateContractResponseParams): Promise<DeliverTxResponse>;
    sendMsgAddCodeUploadParamsAddressesResponse({ value, fee, memo }: sendMsgAddCodeUploadParamsAddressesResponseParams): Promise<DeliverTxResponse>;
    sendMsgInstantiateContract({ value, fee, memo }: sendMsgInstantiateContractParams): Promise<DeliverTxResponse>;
    sendAccessConfigUpdate({ value, fee, memo }: sendAccessConfigUpdateParams): Promise<DeliverTxResponse>;
    sendQueryContractsByCodeRequest({ value, fee, memo }: sendQueryContractsByCodeRequestParams): Promise<DeliverTxResponse>;
    sendMaxFundsLimit({ value, fee, memo }: sendMaxFundsLimitParams): Promise<DeliverTxResponse>;
    sendQuerySmartContractStateRequest({ value, fee, memo }: sendQuerySmartContractStateRequestParams): Promise<DeliverTxResponse>;
    sendQueryCodesRequest({ value, fee, memo }: sendQueryCodesRequestParams): Promise<DeliverTxResponse>;
    sendAcceptedMessagesFilter({ value, fee, memo }: sendAcceptedMessagesFilterParams): Promise<DeliverTxResponse>;
    sendContractCodeHistoryEntry({ value, fee, memo }: sendContractCodeHistoryEntryParams): Promise<DeliverTxResponse>;
    sendQueryContractInfoRequest({ value, fee, memo }: sendQueryContractInfoRequestParams): Promise<DeliverTxResponse>;
    sendQueryParamsResponse({ value, fee, memo }: sendQueryParamsResponseParams): Promise<DeliverTxResponse>;
    sendQueryRawContractStateResponse({ value, fee, memo }: sendQueryRawContractStateResponseParams): Promise<DeliverTxResponse>;
    sendQueryPinnedCodesRequest({ value, fee, memo }: sendQueryPinnedCodesRequestParams): Promise<DeliverTxResponse>;
    sendMsgUpdateInstantiateConfig({ value, fee, memo }: sendMsgUpdateInstantiateConfigParams): Promise<DeliverTxResponse>;
    sendMigrateContractProposal({ value, fee, memo }: sendMigrateContractProposalParams): Promise<DeliverTxResponse>;
    sendQueryCodesResponse({ value, fee, memo }: sendQueryCodesResponseParams): Promise<DeliverTxResponse>;
    sendInstantiateContract2Proposal({ value, fee, memo }: sendInstantiateContract2ProposalParams): Promise<DeliverTxResponse>;
    sendStoreAndInstantiateContractProposal({ value, fee, memo }: sendStoreAndInstantiateContractProposalParams): Promise<DeliverTxResponse>;
    sendContractGrant({ value, fee, memo }: sendContractGrantParams): Promise<DeliverTxResponse>;
    sendQuerySmartContractStateResponse({ value, fee, memo }: sendQuerySmartContractStateResponseParams): Promise<DeliverTxResponse>;
    sendExecuteContractProposal({ value, fee, memo }: sendExecuteContractProposalParams): Promise<DeliverTxResponse>;
    sendContractExecutionAuthorization({ value, fee, memo }: sendContractExecutionAuthorizationParams): Promise<DeliverTxResponse>;
    sendMsgInstantiateContractResponse({ value, fee, memo }: sendMsgInstantiateContractResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParamsResponse({ value, fee, memo }: sendMsgUpdateParamsResponseParams): Promise<DeliverTxResponse>;
    sendMsgRemoveCodeUploadParamsAddressesResponse({ value, fee, memo }: sendMsgRemoveCodeUploadParamsAddressesResponseParams): Promise<DeliverTxResponse>;
    sendQueryContractHistoryResponse({ value, fee, memo }: sendQueryContractHistoryResponseParams): Promise<DeliverTxResponse>;
    sendQueryAllContractStateResponse({ value, fee, memo }: sendQueryAllContractStateResponseParams): Promise<DeliverTxResponse>;
    sendMsgStoreAndMigrateContract({ value, fee, memo }: sendMsgStoreAndMigrateContractParams): Promise<DeliverTxResponse>;
    sendCombinedLimit({ value, fee, memo }: sendCombinedLimitParams): Promise<DeliverTxResponse>;
    sendContract({ value, fee, memo }: sendContractParams): Promise<DeliverTxResponse>;
    sendQueryContractsByCreatorRequest({ value, fee, memo }: sendQueryContractsByCreatorRequestParams): Promise<DeliverTxResponse>;
    sendMsgIBCSend({ value, fee, memo }: sendMsgIBCSendParams): Promise<DeliverTxResponse>;
    sendQueryAllContractStateRequest({ value, fee, memo }: sendQueryAllContractStateRequestParams): Promise<DeliverTxResponse>;
    sendQueryParamsRequest({ value, fee, memo }: sendQueryParamsRequestParams): Promise<DeliverTxResponse>;
    sendMsgUpdateContractLabelResponse({ value, fee, memo }: sendMsgUpdateContractLabelResponseParams): Promise<DeliverTxResponse>;
    sendSequence({ value, fee, memo }: sendSequenceParams): Promise<DeliverTxResponse>;
    sendSudoContractProposal({ value, fee, memo }: sendSudoContractProposalParams): Promise<DeliverTxResponse>;
    sendAllowAllMessagesFilter({ value, fee, memo }: sendAllowAllMessagesFilterParams): Promise<DeliverTxResponse>;
    sendMaxCallsLimit({ value, fee, memo }: sendMaxCallsLimitParams): Promise<DeliverTxResponse>;
    sendQueryCodeRequest({ value, fee, memo }: sendQueryCodeRequestParams): Promise<DeliverTxResponse>;
    sendMsgExecuteContractResponse({ value, fee, memo }: sendMsgExecuteContractResponseParams): Promise<DeliverTxResponse>;
    sendParams({ value, fee, memo }: sendParamsParams): Promise<DeliverTxResponse>;
    sendMsgUpdateAdminResponse({ value, fee, memo }: sendMsgUpdateAdminResponseParams): Promise<DeliverTxResponse>;
    sendModel({ value, fee, memo }: sendModelParams): Promise<DeliverTxResponse>;
    sendMsgMigrateContractResponse({ value, fee, memo }: sendMsgMigrateContractResponseParams): Promise<DeliverTxResponse>;
    sendMsgSudoContractResponse({ value, fee, memo }: sendMsgSudoContractResponseParams): Promise<DeliverTxResponse>;
    sendContractInfo({ value, fee, memo }: sendContractInfoParams): Promise<DeliverTxResponse>;
    sendQueryContractHistoryRequest({ value, fee, memo }: sendQueryContractHistoryRequestParams): Promise<DeliverTxResponse>;
    sendQueryCodeResponse({ value, fee, memo }: sendQueryCodeResponseParams): Promise<DeliverTxResponse>;
    sendQueryContractsByCreatorResponse({ value, fee, memo }: sendQueryContractsByCreatorResponseParams): Promise<DeliverTxResponse>;
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendMsgMigrateContract({ value, fee, memo }: sendMsgMigrateContractParams): Promise<DeliverTxResponse>;
    sendUnpinCodesProposal({ value, fee, memo }: sendUnpinCodesProposalParams): Promise<DeliverTxResponse>;
    sendContractMigrationAuthorization({ value, fee, memo }: sendContractMigrationAuthorizationParams): Promise<DeliverTxResponse>;
    sendMsgInstantiateContract2Response({ value, fee, memo }: sendMsgInstantiateContract2ResponseParams): Promise<DeliverTxResponse>;
    sendMsgExecuteContract({ value, fee, memo }: sendMsgExecuteContractParams): Promise<DeliverTxResponse>;
    sendAccessTypeParam({ value, fee, memo }: sendAccessTypeParamParams): Promise<DeliverTxResponse>;
    sendMsgRemoveCodeUploadParamsAddresses({ value, fee, memo }: sendMsgRemoveCodeUploadParamsAddressesParams): Promise<DeliverTxResponse>;
    sendCodeGrant({ value, fee, memo }: sendCodeGrantParams): Promise<DeliverTxResponse>;
    sendCode({ value, fee, memo }: sendCodeParams): Promise<DeliverTxResponse>;
    sendUpdateAdminProposal({ value, fee, memo }: sendUpdateAdminProposalParams): Promise<DeliverTxResponse>;
    sendMsgUpdateInstantiateConfigResponse({ value, fee, memo }: sendMsgUpdateInstantiateConfigResponseParams): Promise<DeliverTxResponse>;
    sendCodeInfo({ value, fee, memo }: sendCodeInfoParams): Promise<DeliverTxResponse>;
    sendQueryContractsByCodeResponse({ value, fee, memo }: sendQueryContractsByCodeResponseParams): Promise<DeliverTxResponse>;
    sendCodeInfoResponse({ value, fee, memo }: sendCodeInfoResponseParams): Promise<DeliverTxResponse>;
    sendMsgClearAdminResponse({ value, fee, memo }: sendMsgClearAdminResponseParams): Promise<DeliverTxResponse>;
    sendMsgPinCodes({ value, fee, memo }: sendMsgPinCodesParams): Promise<DeliverTxResponse>;
    sendMsgSudoContract({ value, fee, memo }: sendMsgSudoContractParams): Promise<DeliverTxResponse>;
    sendMsgStoreAndInstantiateContract({ value, fee, memo }: sendMsgStoreAndInstantiateContractParams): Promise<DeliverTxResponse>;
    sendClearAdminProposal({ value, fee, memo }: sendClearAdminProposalParams): Promise<DeliverTxResponse>;
    sendStoreCodeAuthorization({ value, fee, memo }: sendStoreCodeAuthorizationParams): Promise<DeliverTxResponse>;
    sendAccessConfig({ value, fee, memo }: sendAccessConfigParams): Promise<DeliverTxResponse>;
    queryRawContractStateRequest({ value }: queryRawContractStateRequestParams): EncodeObject;
    msgClearAdmin({ value }: msgClearAdminParams): EncodeObject;
    msgInstantiateContract2({ value }: msgInstantiateContract2Params): EncodeObject;
    msgStoreAndMigrateContractResponse({ value }: msgStoreAndMigrateContractResponseParams): EncodeObject;
    absoluteTxPosition({ value }: absoluteTxPositionParams): EncodeObject;
    msgIbcsendResponse({ value }: msgIbcsendResponseParams): EncodeObject;
    msgIbccloseChannel({ value }: msgIbccloseChannelParams): EncodeObject;
    queryPinnedCodesResponse({ value }: queryPinnedCodesResponseParams): EncodeObject;
    msgStoreCode({ value }: msgStoreCodeParams): EncodeObject;
    updateInstantiateConfigProposal({ value }: updateInstantiateConfigProposalParams): EncodeObject;
    msgUnpinCodesResponse({ value }: msgUnpinCodesResponseParams): EncodeObject;
    queryContractInfoResponse({ value }: queryContractInfoResponseParams): EncodeObject;
    msgUpdateParams({ value }: msgUpdateParamsParams): EncodeObject;
    instantiateContractProposal({ value }: instantiateContractProposalParams): EncodeObject;
    pinCodesProposal({ value }: pinCodesProposalParams): EncodeObject;
    msgUpdateAdmin({ value }: msgUpdateAdminParams): EncodeObject;
    msgAddCodeUploadParamsAddresses({ value }: msgAddCodeUploadParamsAddressesParams): EncodeObject;
    acceptedMessageKeysFilter({ value }: acceptedMessageKeysFilterParams): EncodeObject;
    msgStoreCodeResponse({ value }: msgStoreCodeResponseParams): EncodeObject;
    msgUnpinCodes({ value }: msgUnpinCodesParams): EncodeObject;
    storeCodeProposal({ value }: storeCodeProposalParams): EncodeObject;
    msgPinCodesResponse({ value }: msgPinCodesResponseParams): EncodeObject;
    msgUpdateContractLabel({ value }: msgUpdateContractLabelParams): EncodeObject;
    msgStoreAndInstantiateContractResponse({ value }: msgStoreAndInstantiateContractResponseParams): EncodeObject;
    msgAddCodeUploadParamsAddressesResponse({ value }: msgAddCodeUploadParamsAddressesResponseParams): EncodeObject;
    msgInstantiateContract({ value }: msgInstantiateContractParams): EncodeObject;
    accessConfigUpdate({ value }: accessConfigUpdateParams): EncodeObject;
    queryContractsByCodeRequest({ value }: queryContractsByCodeRequestParams): EncodeObject;
    maxFundsLimit({ value }: maxFundsLimitParams): EncodeObject;
    querySmartContractStateRequest({ value }: querySmartContractStateRequestParams): EncodeObject;
    queryCodesRequest({ value }: queryCodesRequestParams): EncodeObject;
    acceptedMessagesFilter({ value }: acceptedMessagesFilterParams): EncodeObject;
    contractCodeHistoryEntry({ value }: contractCodeHistoryEntryParams): EncodeObject;
    queryContractInfoRequest({ value }: queryContractInfoRequestParams): EncodeObject;
    queryParamsResponse({ value }: queryParamsResponseParams): EncodeObject;
    queryRawContractStateResponse({ value }: queryRawContractStateResponseParams): EncodeObject;
    queryPinnedCodesRequest({ value }: queryPinnedCodesRequestParams): EncodeObject;
    msgUpdateInstantiateConfig({ value }: msgUpdateInstantiateConfigParams): EncodeObject;
    migrateContractProposal({ value }: migrateContractProposalParams): EncodeObject;
    queryCodesResponse({ value }: queryCodesResponseParams): EncodeObject;
    instantiateContract2Proposal({ value }: instantiateContract2ProposalParams): EncodeObject;
    storeAndInstantiateContractProposal({ value }: storeAndInstantiateContractProposalParams): EncodeObject;
    contractGrant({ value }: contractGrantParams): EncodeObject;
    querySmartContractStateResponse({ value }: querySmartContractStateResponseParams): EncodeObject;
    executeContractProposal({ value }: executeContractProposalParams): EncodeObject;
    contractExecutionAuthorization({ value }: contractExecutionAuthorizationParams): EncodeObject;
    msgInstantiateContractResponse({ value }: msgInstantiateContractResponseParams): EncodeObject;
    msgUpdateParamsResponse({ value }: msgUpdateParamsResponseParams): EncodeObject;
    msgRemoveCodeUploadParamsAddressesResponse({ value }: msgRemoveCodeUploadParamsAddressesResponseParams): EncodeObject;
    queryContractHistoryResponse({ value }: queryContractHistoryResponseParams): EncodeObject;
    queryAllContractStateResponse({ value }: queryAllContractStateResponseParams): EncodeObject;
    msgStoreAndMigrateContract({ value }: msgStoreAndMigrateContractParams): EncodeObject;
    combinedLimit({ value }: combinedLimitParams): EncodeObject;
    contract({ value }: contractParams): EncodeObject;
    queryContractsByCreatorRequest({ value }: queryContractsByCreatorRequestParams): EncodeObject;
    msgIbcsend({ value }: msgIbcsendParams): EncodeObject;
    queryAllContractStateRequest({ value }: queryAllContractStateRequestParams): EncodeObject;
    queryParamsRequest({ value }: queryParamsRequestParams): EncodeObject;
    msgUpdateContractLabelResponse({ value }: msgUpdateContractLabelResponseParams): EncodeObject;
    sequence({ value }: sequenceParams): EncodeObject;
    sudoContractProposal({ value }: sudoContractProposalParams): EncodeObject;
    allowAllMessagesFilter({ value }: allowAllMessagesFilterParams): EncodeObject;
    maxCallsLimit({ value }: maxCallsLimitParams): EncodeObject;
    queryCodeRequest({ value }: queryCodeRequestParams): EncodeObject;
    msgExecuteContractResponse({ value }: msgExecuteContractResponseParams): EncodeObject;
    params({ value }: paramsParams): EncodeObject;
    msgUpdateAdminResponse({ value }: msgUpdateAdminResponseParams): EncodeObject;
    model({ value }: modelParams): EncodeObject;
    msgMigrateContractResponse({ value }: msgMigrateContractResponseParams): EncodeObject;
    msgSudoContractResponse({ value }: msgSudoContractResponseParams): EncodeObject;
    contractInfo({ value }: contractInfoParams): EncodeObject;
    queryContractHistoryRequest({ value }: queryContractHistoryRequestParams): EncodeObject;
    queryCodeResponse({ value }: queryCodeResponseParams): EncodeObject;
    queryContractsByCreatorResponse({ value }: queryContractsByCreatorResponseParams): EncodeObject;
    genesisState({ value }: genesisStateParams): EncodeObject;
    msgMigrateContract({ value }: msgMigrateContractParams): EncodeObject;
    unpinCodesProposal({ value }: unpinCodesProposalParams): EncodeObject;
    contractMigrationAuthorization({ value }: contractMigrationAuthorizationParams): EncodeObject;
    msgInstantiateContract2Response({ value }: msgInstantiateContract2ResponseParams): EncodeObject;
    msgExecuteContract({ value }: msgExecuteContractParams): EncodeObject;
    accessTypeParam({ value }: accessTypeParamParams): EncodeObject;
    msgRemoveCodeUploadParamsAddresses({ value }: msgRemoveCodeUploadParamsAddressesParams): EncodeObject;
    codeGrant({ value }: codeGrantParams): EncodeObject;
    code({ value }: codeParams): EncodeObject;
    updateAdminProposal({ value }: updateAdminProposalParams): EncodeObject;
    msgUpdateInstantiateConfigResponse({ value }: msgUpdateInstantiateConfigResponseParams): EncodeObject;
    codeInfo({ value }: codeInfoParams): EncodeObject;
    queryContractsByCodeResponse({ value }: queryContractsByCodeResponseParams): EncodeObject;
    codeInfoResponse({ value }: codeInfoResponseParams): EncodeObject;
    msgClearAdminResponse({ value }: msgClearAdminResponseParams): EncodeObject;
    msgPinCodes({ value }: msgPinCodesParams): EncodeObject;
    msgSudoContract({ value }: msgSudoContractParams): EncodeObject;
    msgStoreAndInstantiateContract({ value }: msgStoreAndInstantiateContractParams): EncodeObject;
    clearAdminProposal({ value }: clearAdminProposalParams): EncodeObject;
    storeCodeAuthorization({ value }: storeCodeAuthorizationParams): EncodeObject;
    accessConfig({ value }: accessConfigParams): EncodeObject;
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
        CosmwasmWasmV1: SDKModule;
    };
    registry: [string, GeneratedType][];
};
export default IgntModule;
