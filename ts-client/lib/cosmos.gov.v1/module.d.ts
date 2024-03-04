import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { QueryParamsResponse } from "./types/cosmos/gov/v1/query";
import { Deposit } from "./types/cosmos/gov/v1/gov";
import { MsgSubmitProposal } from "./types/cosmos/gov/v1/tx";
import { MsgExecLegacyContentResponse } from "./types/cosmos/gov/v1/tx";
import { Vote } from "./types/cosmos/gov/v1/gov";
import { GenesisState } from "./types/cosmos/gov/v1/genesis";
import { MsgVoteWeighted } from "./types/cosmos/gov/v1/tx";
import { QueryVoteResponse } from "./types/cosmos/gov/v1/query";
import { QueryParamsRequest } from "./types/cosmos/gov/v1/query";
import { MsgUpdateParamsResponse } from "./types/cosmos/gov/v1/tx";
import { MsgCancelProposalResponse } from "./types/cosmos/gov/v1/tx";
import { QueryProposalsRequest } from "./types/cosmos/gov/v1/query";
import { QueryDepositsRequest } from "./types/cosmos/gov/v1/query";
import { QueryDepositsResponse } from "./types/cosmos/gov/v1/query";
import { QueryTallyResultRequest } from "./types/cosmos/gov/v1/query";
import { MsgExecLegacyContent } from "./types/cosmos/gov/v1/tx";
import { MsgDeposit } from "./types/cosmos/gov/v1/tx";
import { QueryConstitutionResponse } from "./types/cosmos/gov/v1/query";
import { MsgUpdateParams } from "./types/cosmos/gov/v1/tx";
import { QueryProposalRequest } from "./types/cosmos/gov/v1/query";
import { QueryDepositRequest } from "./types/cosmos/gov/v1/query";
import { MsgDepositResponse } from "./types/cosmos/gov/v1/tx";
import { Proposal } from "./types/cosmos/gov/v1/gov";
import { QueryDepositResponse } from "./types/cosmos/gov/v1/query";
import { WeightedVoteOption } from "./types/cosmos/gov/v1/gov";
import { TallyParams } from "./types/cosmos/gov/v1/gov";
import { QueryProposalsResponse } from "./types/cosmos/gov/v1/query";
import { QueryVotesRequest } from "./types/cosmos/gov/v1/query";
import { TallyResult } from "./types/cosmos/gov/v1/gov";
import { QueryVotesResponse } from "./types/cosmos/gov/v1/query";
import { QueryVoteRequest } from "./types/cosmos/gov/v1/query";
import { QueryTallyResultResponse } from "./types/cosmos/gov/v1/query";
import { DepositParams } from "./types/cosmos/gov/v1/gov";
import { MsgSubmitProposalResponse } from "./types/cosmos/gov/v1/tx";
import { MsgVote } from "./types/cosmos/gov/v1/tx";
import { MsgVoteResponse } from "./types/cosmos/gov/v1/tx";
import { MsgCancelProposal } from "./types/cosmos/gov/v1/tx";
import { QueryConstitutionRequest } from "./types/cosmos/gov/v1/query";
import { QueryProposalResponse } from "./types/cosmos/gov/v1/query";
import { Params } from "./types/cosmos/gov/v1/gov";
import { MsgVoteWeightedResponse } from "./types/cosmos/gov/v1/tx";
import { VotingParams } from "./types/cosmos/gov/v1/gov";
export { QueryParamsResponse, Deposit, MsgSubmitProposal, MsgExecLegacyContentResponse, Vote, GenesisState, MsgVoteWeighted, QueryVoteResponse, QueryParamsRequest, MsgUpdateParamsResponse, MsgCancelProposalResponse, QueryProposalsRequest, QueryDepositsRequest, QueryDepositsResponse, QueryTallyResultRequest, MsgExecLegacyContent, MsgDeposit, QueryConstitutionResponse, MsgUpdateParams, QueryProposalRequest, QueryDepositRequest, MsgDepositResponse, Proposal, QueryDepositResponse, WeightedVoteOption, TallyParams, QueryProposalsResponse, QueryVotesRequest, TallyResult, QueryVotesResponse, QueryVoteRequest, QueryTallyResultResponse, DepositParams, MsgSubmitProposalResponse, MsgVote, MsgVoteResponse, MsgCancelProposal, QueryConstitutionRequest, QueryProposalResponse, Params, MsgVoteWeightedResponse, VotingParams };
type sendQueryParamsResponseParams = {
    value: QueryParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendDepositParams = {
    value: Deposit;
    fee?: StdFee;
    memo?: string;
};
type sendMsgSubmitProposalParams = {
    value: MsgSubmitProposal;
    fee?: StdFee;
    memo?: string;
};
type sendMsgExecLegacyContentResponseParams = {
    value: MsgExecLegacyContentResponse;
    fee?: StdFee;
    memo?: string;
};
type sendVoteParams = {
    value: Vote;
    fee?: StdFee;
    memo?: string;
};
type sendGenesisStateParams = {
    value: GenesisState;
    fee?: StdFee;
    memo?: string;
};
type sendMsgVoteWeightedParams = {
    value: MsgVoteWeighted;
    fee?: StdFee;
    memo?: string;
};
type sendQueryVoteResponseParams = {
    value: QueryVoteResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsRequestParams = {
    value: QueryParamsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgCancelProposalResponseParams = {
    value: MsgCancelProposalResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryProposalsRequestParams = {
    value: QueryProposalsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryDepositsRequestParams = {
    value: QueryDepositsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryDepositsResponseParams = {
    value: QueryDepositsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryTallyResultRequestParams = {
    value: QueryTallyResultRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgExecLegacyContentParams = {
    value: MsgExecLegacyContent;
    fee?: StdFee;
    memo?: string;
};
type sendMsgDepositParams = {
    value: MsgDeposit;
    fee?: StdFee;
    memo?: string;
};
type sendQueryConstitutionResponseParams = {
    value: QueryConstitutionResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsParams = {
    value: MsgUpdateParams;
    fee?: StdFee;
    memo?: string;
};
type sendQueryProposalRequestParams = {
    value: QueryProposalRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryDepositRequestParams = {
    value: QueryDepositRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgDepositResponseParams = {
    value: MsgDepositResponse;
    fee?: StdFee;
    memo?: string;
};
type sendProposalParams = {
    value: Proposal;
    fee?: StdFee;
    memo?: string;
};
type sendQueryDepositResponseParams = {
    value: QueryDepositResponse;
    fee?: StdFee;
    memo?: string;
};
type sendWeightedVoteOptionParams = {
    value: WeightedVoteOption;
    fee?: StdFee;
    memo?: string;
};
type sendTallyParamsParams = {
    value: TallyParams;
    fee?: StdFee;
    memo?: string;
};
type sendQueryProposalsResponseParams = {
    value: QueryProposalsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryVotesRequestParams = {
    value: QueryVotesRequest;
    fee?: StdFee;
    memo?: string;
};
type sendTallyResultParams = {
    value: TallyResult;
    fee?: StdFee;
    memo?: string;
};
type sendQueryVotesResponseParams = {
    value: QueryVotesResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryVoteRequestParams = {
    value: QueryVoteRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryTallyResultResponseParams = {
    value: QueryTallyResultResponse;
    fee?: StdFee;
    memo?: string;
};
type sendDepositParamsParams = {
    value: DepositParams;
    fee?: StdFee;
    memo?: string;
};
type sendMsgSubmitProposalResponseParams = {
    value: MsgSubmitProposalResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgVoteParams = {
    value: MsgVote;
    fee?: StdFee;
    memo?: string;
};
type sendMsgVoteResponseParams = {
    value: MsgVoteResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgCancelProposalParams = {
    value: MsgCancelProposal;
    fee?: StdFee;
    memo?: string;
};
type sendQueryConstitutionRequestParams = {
    value: QueryConstitutionRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryProposalResponseParams = {
    value: QueryProposalResponse;
    fee?: StdFee;
    memo?: string;
};
type sendParamsParams = {
    value: Params;
    fee?: StdFee;
    memo?: string;
};
type sendMsgVoteWeightedResponseParams = {
    value: MsgVoteWeightedResponse;
    fee?: StdFee;
    memo?: string;
};
type sendVotingParamsParams = {
    value: VotingParams;
    fee?: StdFee;
    memo?: string;
};
type queryParamsResponseParams = {
    value: QueryParamsResponse;
};
type depositParams = {
    value: Deposit;
};
type msgSubmitProposalParams = {
    value: MsgSubmitProposal;
};
type msgExecLegacyContentResponseParams = {
    value: MsgExecLegacyContentResponse;
};
type voteParams = {
    value: Vote;
};
type genesisStateParams = {
    value: GenesisState;
};
type msgVoteWeightedParams = {
    value: MsgVoteWeighted;
};
type queryVoteResponseParams = {
    value: QueryVoteResponse;
};
type queryParamsRequestParams = {
    value: QueryParamsRequest;
};
type msgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
};
type msgCancelProposalResponseParams = {
    value: MsgCancelProposalResponse;
};
type queryProposalsRequestParams = {
    value: QueryProposalsRequest;
};
type queryDepositsRequestParams = {
    value: QueryDepositsRequest;
};
type queryDepositsResponseParams = {
    value: QueryDepositsResponse;
};
type queryTallyResultRequestParams = {
    value: QueryTallyResultRequest;
};
type msgExecLegacyContentParams = {
    value: MsgExecLegacyContent;
};
type msgDepositParams = {
    value: MsgDeposit;
};
type queryConstitutionResponseParams = {
    value: QueryConstitutionResponse;
};
type msgUpdateParamsParams = {
    value: MsgUpdateParams;
};
type queryProposalRequestParams = {
    value: QueryProposalRequest;
};
type queryDepositRequestParams = {
    value: QueryDepositRequest;
};
type msgDepositResponseParams = {
    value: MsgDepositResponse;
};
type proposalParams = {
    value: Proposal;
};
type queryDepositResponseParams = {
    value: QueryDepositResponse;
};
type weightedVoteOptionParams = {
    value: WeightedVoteOption;
};
type tallyParamsParams = {
    value: TallyParams;
};
type queryProposalsResponseParams = {
    value: QueryProposalsResponse;
};
type queryVotesRequestParams = {
    value: QueryVotesRequest;
};
type tallyResultParams = {
    value: TallyResult;
};
type queryVotesResponseParams = {
    value: QueryVotesResponse;
};
type queryVoteRequestParams = {
    value: QueryVoteRequest;
};
type queryTallyResultResponseParams = {
    value: QueryTallyResultResponse;
};
type depositParamsParams = {
    value: DepositParams;
};
type msgSubmitProposalResponseParams = {
    value: MsgSubmitProposalResponse;
};
type msgVoteParams = {
    value: MsgVote;
};
type msgVoteResponseParams = {
    value: MsgVoteResponse;
};
type msgCancelProposalParams = {
    value: MsgCancelProposal;
};
type queryConstitutionRequestParams = {
    value: QueryConstitutionRequest;
};
type queryProposalResponseParams = {
    value: QueryProposalResponse;
};
type paramsParams = {
    value: Params;
};
type msgVoteWeightedResponseParams = {
    value: MsgVoteWeightedResponse;
};
type votingParamsParams = {
    value: VotingParams;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendQueryParamsResponse({ value, fee, memo }: sendQueryParamsResponseParams): Promise<DeliverTxResponse>;
    sendDeposit({ value, fee, memo }: sendDepositParams): Promise<DeliverTxResponse>;
    sendMsgSubmitProposal({ value, fee, memo }: sendMsgSubmitProposalParams): Promise<DeliverTxResponse>;
    sendMsgExecLegacyContentResponse({ value, fee, memo }: sendMsgExecLegacyContentResponseParams): Promise<DeliverTxResponse>;
    sendVote({ value, fee, memo }: sendVoteParams): Promise<DeliverTxResponse>;
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendMsgVoteWeighted({ value, fee, memo }: sendMsgVoteWeightedParams): Promise<DeliverTxResponse>;
    sendQueryVoteResponse({ value, fee, memo }: sendQueryVoteResponseParams): Promise<DeliverTxResponse>;
    sendQueryParamsRequest({ value, fee, memo }: sendQueryParamsRequestParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParamsResponse({ value, fee, memo }: sendMsgUpdateParamsResponseParams): Promise<DeliverTxResponse>;
    sendMsgCancelProposalResponse({ value, fee, memo }: sendMsgCancelProposalResponseParams): Promise<DeliverTxResponse>;
    sendQueryProposalsRequest({ value, fee, memo }: sendQueryProposalsRequestParams): Promise<DeliverTxResponse>;
    sendQueryDepositsRequest({ value, fee, memo }: sendQueryDepositsRequestParams): Promise<DeliverTxResponse>;
    sendQueryDepositsResponse({ value, fee, memo }: sendQueryDepositsResponseParams): Promise<DeliverTxResponse>;
    sendQueryTallyResultRequest({ value, fee, memo }: sendQueryTallyResultRequestParams): Promise<DeliverTxResponse>;
    sendMsgExecLegacyContent({ value, fee, memo }: sendMsgExecLegacyContentParams): Promise<DeliverTxResponse>;
    sendMsgDeposit({ value, fee, memo }: sendMsgDepositParams): Promise<DeliverTxResponse>;
    sendQueryConstitutionResponse({ value, fee, memo }: sendQueryConstitutionResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParams({ value, fee, memo }: sendMsgUpdateParamsParams): Promise<DeliverTxResponse>;
    sendQueryProposalRequest({ value, fee, memo }: sendQueryProposalRequestParams): Promise<DeliverTxResponse>;
    sendQueryDepositRequest({ value, fee, memo }: sendQueryDepositRequestParams): Promise<DeliverTxResponse>;
    sendMsgDepositResponse({ value, fee, memo }: sendMsgDepositResponseParams): Promise<DeliverTxResponse>;
    sendProposal({ value, fee, memo }: sendProposalParams): Promise<DeliverTxResponse>;
    sendQueryDepositResponse({ value, fee, memo }: sendQueryDepositResponseParams): Promise<DeliverTxResponse>;
    sendWeightedVoteOption({ value, fee, memo }: sendWeightedVoteOptionParams): Promise<DeliverTxResponse>;
    sendTallyParams({ value, fee, memo }: sendTallyParamsParams): Promise<DeliverTxResponse>;
    sendQueryProposalsResponse({ value, fee, memo }: sendQueryProposalsResponseParams): Promise<DeliverTxResponse>;
    sendQueryVotesRequest({ value, fee, memo }: sendQueryVotesRequestParams): Promise<DeliverTxResponse>;
    sendTallyResult({ value, fee, memo }: sendTallyResultParams): Promise<DeliverTxResponse>;
    sendQueryVotesResponse({ value, fee, memo }: sendQueryVotesResponseParams): Promise<DeliverTxResponse>;
    sendQueryVoteRequest({ value, fee, memo }: sendQueryVoteRequestParams): Promise<DeliverTxResponse>;
    sendQueryTallyResultResponse({ value, fee, memo }: sendQueryTallyResultResponseParams): Promise<DeliverTxResponse>;
    sendDepositParams({ value, fee, memo }: sendDepositParamsParams): Promise<DeliverTxResponse>;
    sendMsgSubmitProposalResponse({ value, fee, memo }: sendMsgSubmitProposalResponseParams): Promise<DeliverTxResponse>;
    sendMsgVote({ value, fee, memo }: sendMsgVoteParams): Promise<DeliverTxResponse>;
    sendMsgVoteResponse({ value, fee, memo }: sendMsgVoteResponseParams): Promise<DeliverTxResponse>;
    sendMsgCancelProposal({ value, fee, memo }: sendMsgCancelProposalParams): Promise<DeliverTxResponse>;
    sendQueryConstitutionRequest({ value, fee, memo }: sendQueryConstitutionRequestParams): Promise<DeliverTxResponse>;
    sendQueryProposalResponse({ value, fee, memo }: sendQueryProposalResponseParams): Promise<DeliverTxResponse>;
    sendParams({ value, fee, memo }: sendParamsParams): Promise<DeliverTxResponse>;
    sendMsgVoteWeightedResponse({ value, fee, memo }: sendMsgVoteWeightedResponseParams): Promise<DeliverTxResponse>;
    sendVotingParams({ value, fee, memo }: sendVotingParamsParams): Promise<DeliverTxResponse>;
    queryParamsResponse({ value }: queryParamsResponseParams): EncodeObject;
    deposit({ value }: depositParams): EncodeObject;
    msgSubmitProposal({ value }: msgSubmitProposalParams): EncodeObject;
    msgExecLegacyContentResponse({ value }: msgExecLegacyContentResponseParams): EncodeObject;
    vote({ value }: voteParams): EncodeObject;
    genesisState({ value }: genesisStateParams): EncodeObject;
    msgVoteWeighted({ value }: msgVoteWeightedParams): EncodeObject;
    queryVoteResponse({ value }: queryVoteResponseParams): EncodeObject;
    queryParamsRequest({ value }: queryParamsRequestParams): EncodeObject;
    msgUpdateParamsResponse({ value }: msgUpdateParamsResponseParams): EncodeObject;
    msgCancelProposalResponse({ value }: msgCancelProposalResponseParams): EncodeObject;
    queryProposalsRequest({ value }: queryProposalsRequestParams): EncodeObject;
    queryDepositsRequest({ value }: queryDepositsRequestParams): EncodeObject;
    queryDepositsResponse({ value }: queryDepositsResponseParams): EncodeObject;
    queryTallyResultRequest({ value }: queryTallyResultRequestParams): EncodeObject;
    msgExecLegacyContent({ value }: msgExecLegacyContentParams): EncodeObject;
    msgDeposit({ value }: msgDepositParams): EncodeObject;
    queryConstitutionResponse({ value }: queryConstitutionResponseParams): EncodeObject;
    msgUpdateParams({ value }: msgUpdateParamsParams): EncodeObject;
    queryProposalRequest({ value }: queryProposalRequestParams): EncodeObject;
    queryDepositRequest({ value }: queryDepositRequestParams): EncodeObject;
    msgDepositResponse({ value }: msgDepositResponseParams): EncodeObject;
    proposal({ value }: proposalParams): EncodeObject;
    queryDepositResponse({ value }: queryDepositResponseParams): EncodeObject;
    weightedVoteOption({ value }: weightedVoteOptionParams): EncodeObject;
    tallyParams({ value }: tallyParamsParams): EncodeObject;
    queryProposalsResponse({ value }: queryProposalsResponseParams): EncodeObject;
    queryVotesRequest({ value }: queryVotesRequestParams): EncodeObject;
    tallyResult({ value }: tallyResultParams): EncodeObject;
    queryVotesResponse({ value }: queryVotesResponseParams): EncodeObject;
    queryVoteRequest({ value }: queryVoteRequestParams): EncodeObject;
    queryTallyResultResponse({ value }: queryTallyResultResponseParams): EncodeObject;
    depositParams({ value }: depositParamsParams): EncodeObject;
    msgSubmitProposalResponse({ value }: msgSubmitProposalResponseParams): EncodeObject;
    msgVote({ value }: msgVoteParams): EncodeObject;
    msgVoteResponse({ value }: msgVoteResponseParams): EncodeObject;
    msgCancelProposal({ value }: msgCancelProposalParams): EncodeObject;
    queryConstitutionRequest({ value }: queryConstitutionRequestParams): EncodeObject;
    queryProposalResponse({ value }: queryProposalResponseParams): EncodeObject;
    params({ value }: paramsParams): EncodeObject;
    msgVoteWeightedResponse({ value }: msgVoteWeightedResponseParams): EncodeObject;
    votingParams({ value }: votingParamsParams): EncodeObject;
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
        CosmosGovV1: SDKModule;
    };
    registry: [string, GeneratedType][];
};
export default IgntModule;
