import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { MsgVote } from "./types/cosmos/gov/v1beta1/tx";
import { MsgVoteResponse } from "./types/cosmos/gov/v1beta1/tx";
import { QueryProposalRequest } from "./types/cosmos/gov/v1beta1/query";
import { QueryProposalsRequest } from "./types/cosmos/gov/v1beta1/query";
import { QueryProposalsResponse } from "./types/cosmos/gov/v1beta1/query";
import { QueryVoteResponse } from "./types/cosmos/gov/v1beta1/query";
import { TallyParams } from "./types/cosmos/gov/v1beta1/gov";
import { QueryVoteRequest } from "./types/cosmos/gov/v1beta1/query";
import { MsgSubmitProposalResponse } from "./types/cosmos/gov/v1beta1/tx";
import { WeightedVoteOption } from "./types/cosmos/gov/v1beta1/gov";
import { GenesisState } from "./types/cosmos/gov/v1beta1/genesis";
import { QueryDepositsResponse } from "./types/cosmos/gov/v1beta1/query";
import { MsgDepositResponse } from "./types/cosmos/gov/v1beta1/tx";
import { QueryTallyResultRequest } from "./types/cosmos/gov/v1beta1/query";
import { Vote } from "./types/cosmos/gov/v1beta1/gov";
import { TallyResult } from "./types/cosmos/gov/v1beta1/gov";
import { DepositParams } from "./types/cosmos/gov/v1beta1/gov";
import { QueryParamsRequest } from "./types/cosmos/gov/v1beta1/query";
import { QueryParamsResponse } from "./types/cosmos/gov/v1beta1/query";
import { QueryDepositRequest } from "./types/cosmos/gov/v1beta1/query";
import { TextProposal } from "./types/cosmos/gov/v1beta1/gov";
import { Deposit } from "./types/cosmos/gov/v1beta1/gov";
import { QueryVotesRequest } from "./types/cosmos/gov/v1beta1/query";
import { MsgDeposit } from "./types/cosmos/gov/v1beta1/tx";
import { MsgVoteWeightedResponse } from "./types/cosmos/gov/v1beta1/tx";
import { Proposal } from "./types/cosmos/gov/v1beta1/gov";
import { VotingParams } from "./types/cosmos/gov/v1beta1/gov";
import { MsgSubmitProposal } from "./types/cosmos/gov/v1beta1/tx";
import { MsgVoteWeighted } from "./types/cosmos/gov/v1beta1/tx";
import { QueryProposalResponse } from "./types/cosmos/gov/v1beta1/query";
import { QueryVotesResponse } from "./types/cosmos/gov/v1beta1/query";
import { QueryDepositResponse } from "./types/cosmos/gov/v1beta1/query";
import { QueryDepositsRequest } from "./types/cosmos/gov/v1beta1/query";
import { QueryTallyResultResponse } from "./types/cosmos/gov/v1beta1/query";
export { MsgVote, MsgVoteResponse, QueryProposalRequest, QueryProposalsRequest, QueryProposalsResponse, QueryVoteResponse, TallyParams, QueryVoteRequest, MsgSubmitProposalResponse, WeightedVoteOption, GenesisState, QueryDepositsResponse, MsgDepositResponse, QueryTallyResultRequest, Vote, TallyResult, DepositParams, QueryParamsRequest, QueryParamsResponse, QueryDepositRequest, TextProposal, Deposit, QueryVotesRequest, MsgDeposit, MsgVoteWeightedResponse, Proposal, VotingParams, MsgSubmitProposal, MsgVoteWeighted, QueryProposalResponse, QueryVotesResponse, QueryDepositResponse, QueryDepositsRequest, QueryTallyResultResponse };
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
type sendQueryProposalRequestParams = {
    value: QueryProposalRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryProposalsRequestParams = {
    value: QueryProposalsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryProposalsResponseParams = {
    value: QueryProposalsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryVoteResponseParams = {
    value: QueryVoteResponse;
    fee?: StdFee;
    memo?: string;
};
type sendTallyParamsParams = {
    value: TallyParams;
    fee?: StdFee;
    memo?: string;
};
type sendQueryVoteRequestParams = {
    value: QueryVoteRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgSubmitProposalResponseParams = {
    value: MsgSubmitProposalResponse;
    fee?: StdFee;
    memo?: string;
};
type sendWeightedVoteOptionParams = {
    value: WeightedVoteOption;
    fee?: StdFee;
    memo?: string;
};
type sendGenesisStateParams = {
    value: GenesisState;
    fee?: StdFee;
    memo?: string;
};
type sendQueryDepositsResponseParams = {
    value: QueryDepositsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgDepositResponseParams = {
    value: MsgDepositResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryTallyResultRequestParams = {
    value: QueryTallyResultRequest;
    fee?: StdFee;
    memo?: string;
};
type sendVoteParams = {
    value: Vote;
    fee?: StdFee;
    memo?: string;
};
type sendTallyResultParams = {
    value: TallyResult;
    fee?: StdFee;
    memo?: string;
};
type sendDepositParamsParams = {
    value: DepositParams;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsRequestParams = {
    value: QueryParamsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsResponseParams = {
    value: QueryParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryDepositRequestParams = {
    value: QueryDepositRequest;
    fee?: StdFee;
    memo?: string;
};
type sendTextProposalParams = {
    value: TextProposal;
    fee?: StdFee;
    memo?: string;
};
type sendDepositParams = {
    value: Deposit;
    fee?: StdFee;
    memo?: string;
};
type sendQueryVotesRequestParams = {
    value: QueryVotesRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgDepositParams = {
    value: MsgDeposit;
    fee?: StdFee;
    memo?: string;
};
type sendMsgVoteWeightedResponseParams = {
    value: MsgVoteWeightedResponse;
    fee?: StdFee;
    memo?: string;
};
type sendProposalParams = {
    value: Proposal;
    fee?: StdFee;
    memo?: string;
};
type sendVotingParamsParams = {
    value: VotingParams;
    fee?: StdFee;
    memo?: string;
};
type sendMsgSubmitProposalParams = {
    value: MsgSubmitProposal;
    fee?: StdFee;
    memo?: string;
};
type sendMsgVoteWeightedParams = {
    value: MsgVoteWeighted;
    fee?: StdFee;
    memo?: string;
};
type sendQueryProposalResponseParams = {
    value: QueryProposalResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryVotesResponseParams = {
    value: QueryVotesResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryDepositResponseParams = {
    value: QueryDepositResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryDepositsRequestParams = {
    value: QueryDepositsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryTallyResultResponseParams = {
    value: QueryTallyResultResponse;
    fee?: StdFee;
    memo?: string;
};
type msgVoteParams = {
    value: MsgVote;
};
type msgVoteResponseParams = {
    value: MsgVoteResponse;
};
type queryProposalRequestParams = {
    value: QueryProposalRequest;
};
type queryProposalsRequestParams = {
    value: QueryProposalsRequest;
};
type queryProposalsResponseParams = {
    value: QueryProposalsResponse;
};
type queryVoteResponseParams = {
    value: QueryVoteResponse;
};
type tallyParamsParams = {
    value: TallyParams;
};
type queryVoteRequestParams = {
    value: QueryVoteRequest;
};
type msgSubmitProposalResponseParams = {
    value: MsgSubmitProposalResponse;
};
type weightedVoteOptionParams = {
    value: WeightedVoteOption;
};
type genesisStateParams = {
    value: GenesisState;
};
type queryDepositsResponseParams = {
    value: QueryDepositsResponse;
};
type msgDepositResponseParams = {
    value: MsgDepositResponse;
};
type queryTallyResultRequestParams = {
    value: QueryTallyResultRequest;
};
type voteParams = {
    value: Vote;
};
type tallyResultParams = {
    value: TallyResult;
};
type depositParamsParams = {
    value: DepositParams;
};
type queryParamsRequestParams = {
    value: QueryParamsRequest;
};
type queryParamsResponseParams = {
    value: QueryParamsResponse;
};
type queryDepositRequestParams = {
    value: QueryDepositRequest;
};
type textProposalParams = {
    value: TextProposal;
};
type depositParams = {
    value: Deposit;
};
type queryVotesRequestParams = {
    value: QueryVotesRequest;
};
type msgDepositParams = {
    value: MsgDeposit;
};
type msgVoteWeightedResponseParams = {
    value: MsgVoteWeightedResponse;
};
type proposalParams = {
    value: Proposal;
};
type votingParamsParams = {
    value: VotingParams;
};
type msgSubmitProposalParams = {
    value: MsgSubmitProposal;
};
type msgVoteWeightedParams = {
    value: MsgVoteWeighted;
};
type queryProposalResponseParams = {
    value: QueryProposalResponse;
};
type queryVotesResponseParams = {
    value: QueryVotesResponse;
};
type queryDepositResponseParams = {
    value: QueryDepositResponse;
};
type queryDepositsRequestParams = {
    value: QueryDepositsRequest;
};
type queryTallyResultResponseParams = {
    value: QueryTallyResultResponse;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendMsgVote({ value, fee, memo }: sendMsgVoteParams): Promise<DeliverTxResponse>;
    sendMsgVoteResponse({ value, fee, memo }: sendMsgVoteResponseParams): Promise<DeliverTxResponse>;
    sendQueryProposalRequest({ value, fee, memo }: sendQueryProposalRequestParams): Promise<DeliverTxResponse>;
    sendQueryProposalsRequest({ value, fee, memo }: sendQueryProposalsRequestParams): Promise<DeliverTxResponse>;
    sendQueryProposalsResponse({ value, fee, memo }: sendQueryProposalsResponseParams): Promise<DeliverTxResponse>;
    sendQueryVoteResponse({ value, fee, memo }: sendQueryVoteResponseParams): Promise<DeliverTxResponse>;
    sendTallyParams({ value, fee, memo }: sendTallyParamsParams): Promise<DeliverTxResponse>;
    sendQueryVoteRequest({ value, fee, memo }: sendQueryVoteRequestParams): Promise<DeliverTxResponse>;
    sendMsgSubmitProposalResponse({ value, fee, memo }: sendMsgSubmitProposalResponseParams): Promise<DeliverTxResponse>;
    sendWeightedVoteOption({ value, fee, memo }: sendWeightedVoteOptionParams): Promise<DeliverTxResponse>;
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendQueryDepositsResponse({ value, fee, memo }: sendQueryDepositsResponseParams): Promise<DeliverTxResponse>;
    sendMsgDepositResponse({ value, fee, memo }: sendMsgDepositResponseParams): Promise<DeliverTxResponse>;
    sendQueryTallyResultRequest({ value, fee, memo }: sendQueryTallyResultRequestParams): Promise<DeliverTxResponse>;
    sendVote({ value, fee, memo }: sendVoteParams): Promise<DeliverTxResponse>;
    sendTallyResult({ value, fee, memo }: sendTallyResultParams): Promise<DeliverTxResponse>;
    sendDepositParams({ value, fee, memo }: sendDepositParamsParams): Promise<DeliverTxResponse>;
    sendQueryParamsRequest({ value, fee, memo }: sendQueryParamsRequestParams): Promise<DeliverTxResponse>;
    sendQueryParamsResponse({ value, fee, memo }: sendQueryParamsResponseParams): Promise<DeliverTxResponse>;
    sendQueryDepositRequest({ value, fee, memo }: sendQueryDepositRequestParams): Promise<DeliverTxResponse>;
    sendTextProposal({ value, fee, memo }: sendTextProposalParams): Promise<DeliverTxResponse>;
    sendDeposit({ value, fee, memo }: sendDepositParams): Promise<DeliverTxResponse>;
    sendQueryVotesRequest({ value, fee, memo }: sendQueryVotesRequestParams): Promise<DeliverTxResponse>;
    sendMsgDeposit({ value, fee, memo }: sendMsgDepositParams): Promise<DeliverTxResponse>;
    sendMsgVoteWeightedResponse({ value, fee, memo }: sendMsgVoteWeightedResponseParams): Promise<DeliverTxResponse>;
    sendProposal({ value, fee, memo }: sendProposalParams): Promise<DeliverTxResponse>;
    sendVotingParams({ value, fee, memo }: sendVotingParamsParams): Promise<DeliverTxResponse>;
    sendMsgSubmitProposal({ value, fee, memo }: sendMsgSubmitProposalParams): Promise<DeliverTxResponse>;
    sendMsgVoteWeighted({ value, fee, memo }: sendMsgVoteWeightedParams): Promise<DeliverTxResponse>;
    sendQueryProposalResponse({ value, fee, memo }: sendQueryProposalResponseParams): Promise<DeliverTxResponse>;
    sendQueryVotesResponse({ value, fee, memo }: sendQueryVotesResponseParams): Promise<DeliverTxResponse>;
    sendQueryDepositResponse({ value, fee, memo }: sendQueryDepositResponseParams): Promise<DeliverTxResponse>;
    sendQueryDepositsRequest({ value, fee, memo }: sendQueryDepositsRequestParams): Promise<DeliverTxResponse>;
    sendQueryTallyResultResponse({ value, fee, memo }: sendQueryTallyResultResponseParams): Promise<DeliverTxResponse>;
    msgVote({ value }: msgVoteParams): EncodeObject;
    msgVoteResponse({ value }: msgVoteResponseParams): EncodeObject;
    queryProposalRequest({ value }: queryProposalRequestParams): EncodeObject;
    queryProposalsRequest({ value }: queryProposalsRequestParams): EncodeObject;
    queryProposalsResponse({ value }: queryProposalsResponseParams): EncodeObject;
    queryVoteResponse({ value }: queryVoteResponseParams): EncodeObject;
    tallyParams({ value }: tallyParamsParams): EncodeObject;
    queryVoteRequest({ value }: queryVoteRequestParams): EncodeObject;
    msgSubmitProposalResponse({ value }: msgSubmitProposalResponseParams): EncodeObject;
    weightedVoteOption({ value }: weightedVoteOptionParams): EncodeObject;
    genesisState({ value }: genesisStateParams): EncodeObject;
    queryDepositsResponse({ value }: queryDepositsResponseParams): EncodeObject;
    msgDepositResponse({ value }: msgDepositResponseParams): EncodeObject;
    queryTallyResultRequest({ value }: queryTallyResultRequestParams): EncodeObject;
    vote({ value }: voteParams): EncodeObject;
    tallyResult({ value }: tallyResultParams): EncodeObject;
    depositParams({ value }: depositParamsParams): EncodeObject;
    queryParamsRequest({ value }: queryParamsRequestParams): EncodeObject;
    queryParamsResponse({ value }: queryParamsResponseParams): EncodeObject;
    queryDepositRequest({ value }: queryDepositRequestParams): EncodeObject;
    textProposal({ value }: textProposalParams): EncodeObject;
    deposit({ value }: depositParams): EncodeObject;
    queryVotesRequest({ value }: queryVotesRequestParams): EncodeObject;
    msgDeposit({ value }: msgDepositParams): EncodeObject;
    msgVoteWeightedResponse({ value }: msgVoteWeightedResponseParams): EncodeObject;
    proposal({ value }: proposalParams): EncodeObject;
    votingParams({ value }: votingParamsParams): EncodeObject;
    msgSubmitProposal({ value }: msgSubmitProposalParams): EncodeObject;
    msgVoteWeighted({ value }: msgVoteWeightedParams): EncodeObject;
    queryProposalResponse({ value }: queryProposalResponseParams): EncodeObject;
    queryVotesResponse({ value }: queryVotesResponseParams): EncodeObject;
    queryDepositResponse({ value }: queryDepositResponseParams): EncodeObject;
    queryDepositsRequest({ value }: queryDepositsRequestParams): EncodeObject;
    queryTallyResultResponse({ value }: queryTallyResultResponseParams): EncodeObject;
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
        CosmosGovV1Beta1: SDKModule;
    };
    registry: [string, GeneratedType][];
};
export default IgntModule;
