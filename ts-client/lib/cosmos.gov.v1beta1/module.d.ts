import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { QueryProposalsRequest } from "./types/cosmos/gov/v1beta1/query";
import { WeightedVoteOption } from "./types/cosmos/gov/v1beta1/gov";
import { TallyResult } from "./types/cosmos/gov/v1beta1/gov";
import { MsgVoteWeightedResponse } from "./types/cosmos/gov/v1beta1/tx";
import { TextProposal } from "./types/cosmos/gov/v1beta1/gov";
import { QueryVotesResponse } from "./types/cosmos/gov/v1beta1/query";
import { QueryVoteResponse } from "./types/cosmos/gov/v1beta1/query";
import { QueryDepositRequest } from "./types/cosmos/gov/v1beta1/query";
import { QueryDepositResponse } from "./types/cosmos/gov/v1beta1/query";
import { Deposit } from "./types/cosmos/gov/v1beta1/gov";
import { QueryProposalResponse } from "./types/cosmos/gov/v1beta1/query";
import { QueryProposalsResponse } from "./types/cosmos/gov/v1beta1/query";
import { QueryVotesRequest } from "./types/cosmos/gov/v1beta1/query";
import { QueryParamsResponse } from "./types/cosmos/gov/v1beta1/query";
import { QueryDepositsResponse } from "./types/cosmos/gov/v1beta1/query";
import { Proposal } from "./types/cosmos/gov/v1beta1/gov";
import { Vote } from "./types/cosmos/gov/v1beta1/gov";
import { QueryVoteRequest } from "./types/cosmos/gov/v1beta1/query";
import { QueryTallyResultRequest } from "./types/cosmos/gov/v1beta1/query";
import { MsgSubmitProposalResponse } from "./types/cosmos/gov/v1beta1/tx";
import { MsgDeposit } from "./types/cosmos/gov/v1beta1/tx";
import { MsgVoteWeighted } from "./types/cosmos/gov/v1beta1/tx";
import { DepositParams } from "./types/cosmos/gov/v1beta1/gov";
import { MsgDepositResponse } from "./types/cosmos/gov/v1beta1/tx";
import { QueryParamsRequest } from "./types/cosmos/gov/v1beta1/query";
import { QueryDepositsRequest } from "./types/cosmos/gov/v1beta1/query";
import { QueryTallyResultResponse } from "./types/cosmos/gov/v1beta1/query";
import { MsgSubmitProposal } from "./types/cosmos/gov/v1beta1/tx";
import { MsgVoteResponse } from "./types/cosmos/gov/v1beta1/tx";
import { VotingParams } from "./types/cosmos/gov/v1beta1/gov";
import { QueryProposalRequest } from "./types/cosmos/gov/v1beta1/query";
import { GenesisState } from "./types/cosmos/gov/v1beta1/genesis";
import { MsgVote } from "./types/cosmos/gov/v1beta1/tx";
import { TallyParams } from "./types/cosmos/gov/v1beta1/gov";
export { QueryProposalsRequest, WeightedVoteOption, TallyResult, MsgVoteWeightedResponse, TextProposal, QueryVotesResponse, QueryVoteResponse, QueryDepositRequest, QueryDepositResponse, Deposit, QueryProposalResponse, QueryProposalsResponse, QueryVotesRequest, QueryParamsResponse, QueryDepositsResponse, Proposal, Vote, QueryVoteRequest, QueryTallyResultRequest, MsgSubmitProposalResponse, MsgDeposit, MsgVoteWeighted, DepositParams, MsgDepositResponse, QueryParamsRequest, QueryDepositsRequest, QueryTallyResultResponse, MsgSubmitProposal, MsgVoteResponse, VotingParams, QueryProposalRequest, GenesisState, MsgVote, TallyParams };
type sendQueryProposalsRequestParams = {
    value: QueryProposalsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendWeightedVoteOptionParams = {
    value: WeightedVoteOption;
    fee?: StdFee;
    memo?: string;
};
type sendTallyResultParams = {
    value: TallyResult;
    fee?: StdFee;
    memo?: string;
};
type sendMsgVoteWeightedResponseParams = {
    value: MsgVoteWeightedResponse;
    fee?: StdFee;
    memo?: string;
};
type sendTextProposalParams = {
    value: TextProposal;
    fee?: StdFee;
    memo?: string;
};
type sendQueryVotesResponseParams = {
    value: QueryVotesResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryVoteResponseParams = {
    value: QueryVoteResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryDepositRequestParams = {
    value: QueryDepositRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryDepositResponseParams = {
    value: QueryDepositResponse;
    fee?: StdFee;
    memo?: string;
};
type sendDepositParams = {
    value: Deposit;
    fee?: StdFee;
    memo?: string;
};
type sendQueryProposalResponseParams = {
    value: QueryProposalResponse;
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
type sendQueryParamsResponseParams = {
    value: QueryParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryDepositsResponseParams = {
    value: QueryDepositsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendProposalParams = {
    value: Proposal;
    fee?: StdFee;
    memo?: string;
};
type sendVoteParams = {
    value: Vote;
    fee?: StdFee;
    memo?: string;
};
type sendQueryVoteRequestParams = {
    value: QueryVoteRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryTallyResultRequestParams = {
    value: QueryTallyResultRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgSubmitProposalResponseParams = {
    value: MsgSubmitProposalResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgDepositParams = {
    value: MsgDeposit;
    fee?: StdFee;
    memo?: string;
};
type sendMsgVoteWeightedParams = {
    value: MsgVoteWeighted;
    fee?: StdFee;
    memo?: string;
};
type sendDepositParamsParams = {
    value: DepositParams;
    fee?: StdFee;
    memo?: string;
};
type sendMsgDepositResponseParams = {
    value: MsgDepositResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsRequestParams = {
    value: QueryParamsRequest;
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
type sendMsgSubmitProposalParams = {
    value: MsgSubmitProposal;
    fee?: StdFee;
    memo?: string;
};
type sendMsgVoteResponseParams = {
    value: MsgVoteResponse;
    fee?: StdFee;
    memo?: string;
};
type sendVotingParamsParams = {
    value: VotingParams;
    fee?: StdFee;
    memo?: string;
};
type sendQueryProposalRequestParams = {
    value: QueryProposalRequest;
    fee?: StdFee;
    memo?: string;
};
type sendGenesisStateParams = {
    value: GenesisState;
    fee?: StdFee;
    memo?: string;
};
type sendMsgVoteParams = {
    value: MsgVote;
    fee?: StdFee;
    memo?: string;
};
type sendTallyParamsParams = {
    value: TallyParams;
    fee?: StdFee;
    memo?: string;
};
type queryProposalsRequestParams = {
    value: QueryProposalsRequest;
};
type weightedVoteOptionParams = {
    value: WeightedVoteOption;
};
type tallyResultParams = {
    value: TallyResult;
};
type msgVoteWeightedResponseParams = {
    value: MsgVoteWeightedResponse;
};
type textProposalParams = {
    value: TextProposal;
};
type queryVotesResponseParams = {
    value: QueryVotesResponse;
};
type queryVoteResponseParams = {
    value: QueryVoteResponse;
};
type queryDepositRequestParams = {
    value: QueryDepositRequest;
};
type queryDepositResponseParams = {
    value: QueryDepositResponse;
};
type depositParams = {
    value: Deposit;
};
type queryProposalResponseParams = {
    value: QueryProposalResponse;
};
type queryProposalsResponseParams = {
    value: QueryProposalsResponse;
};
type queryVotesRequestParams = {
    value: QueryVotesRequest;
};
type queryParamsResponseParams = {
    value: QueryParamsResponse;
};
type queryDepositsResponseParams = {
    value: QueryDepositsResponse;
};
type proposalParams = {
    value: Proposal;
};
type voteParams = {
    value: Vote;
};
type queryVoteRequestParams = {
    value: QueryVoteRequest;
};
type queryTallyResultRequestParams = {
    value: QueryTallyResultRequest;
};
type msgSubmitProposalResponseParams = {
    value: MsgSubmitProposalResponse;
};
type msgDepositParams = {
    value: MsgDeposit;
};
type msgVoteWeightedParams = {
    value: MsgVoteWeighted;
};
type depositParamsParams = {
    value: DepositParams;
};
type msgDepositResponseParams = {
    value: MsgDepositResponse;
};
type queryParamsRequestParams = {
    value: QueryParamsRequest;
};
type queryDepositsRequestParams = {
    value: QueryDepositsRequest;
};
type queryTallyResultResponseParams = {
    value: QueryTallyResultResponse;
};
type msgSubmitProposalParams = {
    value: MsgSubmitProposal;
};
type msgVoteResponseParams = {
    value: MsgVoteResponse;
};
type votingParamsParams = {
    value: VotingParams;
};
type queryProposalRequestParams = {
    value: QueryProposalRequest;
};
type genesisStateParams = {
    value: GenesisState;
};
type msgVoteParams = {
    value: MsgVote;
};
type tallyParamsParams = {
    value: TallyParams;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendQueryProposalsRequest({ value, fee, memo }: sendQueryProposalsRequestParams): Promise<DeliverTxResponse>;
    sendWeightedVoteOption({ value, fee, memo }: sendWeightedVoteOptionParams): Promise<DeliverTxResponse>;
    sendTallyResult({ value, fee, memo }: sendTallyResultParams): Promise<DeliverTxResponse>;
    sendMsgVoteWeightedResponse({ value, fee, memo }: sendMsgVoteWeightedResponseParams): Promise<DeliverTxResponse>;
    sendTextProposal({ value, fee, memo }: sendTextProposalParams): Promise<DeliverTxResponse>;
    sendQueryVotesResponse({ value, fee, memo }: sendQueryVotesResponseParams): Promise<DeliverTxResponse>;
    sendQueryVoteResponse({ value, fee, memo }: sendQueryVoteResponseParams): Promise<DeliverTxResponse>;
    sendQueryDepositRequest({ value, fee, memo }: sendQueryDepositRequestParams): Promise<DeliverTxResponse>;
    sendQueryDepositResponse({ value, fee, memo }: sendQueryDepositResponseParams): Promise<DeliverTxResponse>;
    sendDeposit({ value, fee, memo }: sendDepositParams): Promise<DeliverTxResponse>;
    sendQueryProposalResponse({ value, fee, memo }: sendQueryProposalResponseParams): Promise<DeliverTxResponse>;
    sendQueryProposalsResponse({ value, fee, memo }: sendQueryProposalsResponseParams): Promise<DeliverTxResponse>;
    sendQueryVotesRequest({ value, fee, memo }: sendQueryVotesRequestParams): Promise<DeliverTxResponse>;
    sendQueryParamsResponse({ value, fee, memo }: sendQueryParamsResponseParams): Promise<DeliverTxResponse>;
    sendQueryDepositsResponse({ value, fee, memo }: sendQueryDepositsResponseParams): Promise<DeliverTxResponse>;
    sendProposal({ value, fee, memo }: sendProposalParams): Promise<DeliverTxResponse>;
    sendVote({ value, fee, memo }: sendVoteParams): Promise<DeliverTxResponse>;
    sendQueryVoteRequest({ value, fee, memo }: sendQueryVoteRequestParams): Promise<DeliverTxResponse>;
    sendQueryTallyResultRequest({ value, fee, memo }: sendQueryTallyResultRequestParams): Promise<DeliverTxResponse>;
    sendMsgSubmitProposalResponse({ value, fee, memo }: sendMsgSubmitProposalResponseParams): Promise<DeliverTxResponse>;
    sendMsgDeposit({ value, fee, memo }: sendMsgDepositParams): Promise<DeliverTxResponse>;
    sendMsgVoteWeighted({ value, fee, memo }: sendMsgVoteWeightedParams): Promise<DeliverTxResponse>;
    sendDepositParams({ value, fee, memo }: sendDepositParamsParams): Promise<DeliverTxResponse>;
    sendMsgDepositResponse({ value, fee, memo }: sendMsgDepositResponseParams): Promise<DeliverTxResponse>;
    sendQueryParamsRequest({ value, fee, memo }: sendQueryParamsRequestParams): Promise<DeliverTxResponse>;
    sendQueryDepositsRequest({ value, fee, memo }: sendQueryDepositsRequestParams): Promise<DeliverTxResponse>;
    sendQueryTallyResultResponse({ value, fee, memo }: sendQueryTallyResultResponseParams): Promise<DeliverTxResponse>;
    sendMsgSubmitProposal({ value, fee, memo }: sendMsgSubmitProposalParams): Promise<DeliverTxResponse>;
    sendMsgVoteResponse({ value, fee, memo }: sendMsgVoteResponseParams): Promise<DeliverTxResponse>;
    sendVotingParams({ value, fee, memo }: sendVotingParamsParams): Promise<DeliverTxResponse>;
    sendQueryProposalRequest({ value, fee, memo }: sendQueryProposalRequestParams): Promise<DeliverTxResponse>;
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendMsgVote({ value, fee, memo }: sendMsgVoteParams): Promise<DeliverTxResponse>;
    sendTallyParams({ value, fee, memo }: sendTallyParamsParams): Promise<DeliverTxResponse>;
    queryProposalsRequest({ value }: queryProposalsRequestParams): EncodeObject;
    weightedVoteOption({ value }: weightedVoteOptionParams): EncodeObject;
    tallyResult({ value }: tallyResultParams): EncodeObject;
    msgVoteWeightedResponse({ value }: msgVoteWeightedResponseParams): EncodeObject;
    textProposal({ value }: textProposalParams): EncodeObject;
    queryVotesResponse({ value }: queryVotesResponseParams): EncodeObject;
    queryVoteResponse({ value }: queryVoteResponseParams): EncodeObject;
    queryDepositRequest({ value }: queryDepositRequestParams): EncodeObject;
    queryDepositResponse({ value }: queryDepositResponseParams): EncodeObject;
    deposit({ value }: depositParams): EncodeObject;
    queryProposalResponse({ value }: queryProposalResponseParams): EncodeObject;
    queryProposalsResponse({ value }: queryProposalsResponseParams): EncodeObject;
    queryVotesRequest({ value }: queryVotesRequestParams): EncodeObject;
    queryParamsResponse({ value }: queryParamsResponseParams): EncodeObject;
    queryDepositsResponse({ value }: queryDepositsResponseParams): EncodeObject;
    proposal({ value }: proposalParams): EncodeObject;
    vote({ value }: voteParams): EncodeObject;
    queryVoteRequest({ value }: queryVoteRequestParams): EncodeObject;
    queryTallyResultRequest({ value }: queryTallyResultRequestParams): EncodeObject;
    msgSubmitProposalResponse({ value }: msgSubmitProposalResponseParams): EncodeObject;
    msgDeposit({ value }: msgDepositParams): EncodeObject;
    msgVoteWeighted({ value }: msgVoteWeightedParams): EncodeObject;
    depositParams({ value }: depositParamsParams): EncodeObject;
    msgDepositResponse({ value }: msgDepositResponseParams): EncodeObject;
    queryParamsRequest({ value }: queryParamsRequestParams): EncodeObject;
    queryDepositsRequest({ value }: queryDepositsRequestParams): EncodeObject;
    queryTallyResultResponse({ value }: queryTallyResultResponseParams): EncodeObject;
    msgSubmitProposal({ value }: msgSubmitProposalParams): EncodeObject;
    msgVoteResponse({ value }: msgVoteResponseParams): EncodeObject;
    votingParams({ value }: votingParamsParams): EncodeObject;
    queryProposalRequest({ value }: queryProposalRequestParams): EncodeObject;
    genesisState({ value }: genesisStateParams): EncodeObject;
    msgVote({ value }: msgVoteParams): EncodeObject;
    tallyParams({ value }: tallyParamsParams): EncodeObject;
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
