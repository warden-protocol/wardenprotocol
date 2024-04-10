import { TallyResult } from "./types/cosmos/gov/v1beta1/gov";
import { MsgVote } from "./types/cosmos/gov/v1beta1/tx";
import { DepositParams } from "./types/cosmos/gov/v1beta1/gov";
import { QueryParamsRequest } from "./types/cosmos/gov/v1beta1/query";
import { TallyParams } from "./types/cosmos/gov/v1beta1/gov";
import { QueryDepositRequest } from "./types/cosmos/gov/v1beta1/query";
import { GenesisState } from "./types/cosmos/gov/v1beta1/genesis";
import { MsgSubmitProposal } from "./types/cosmos/gov/v1beta1/tx";
import { MsgVoteWeighted } from "./types/cosmos/gov/v1beta1/tx";
import { QueryProposalRequest } from "./types/cosmos/gov/v1beta1/query";
import { QueryVotesRequest } from "./types/cosmos/gov/v1beta1/query";
import { Vote } from "./types/cosmos/gov/v1beta1/gov";
import { MsgVoteResponse } from "./types/cosmos/gov/v1beta1/tx";
import { QueryVoteResponse } from "./types/cosmos/gov/v1beta1/query";
import { QueryVotesResponse } from "./types/cosmos/gov/v1beta1/query";
import { QueryTallyResultResponse } from "./types/cosmos/gov/v1beta1/query";
import { QueryProposalsRequest } from "./types/cosmos/gov/v1beta1/query";
import { QueryDepositResponse } from "./types/cosmos/gov/v1beta1/query";
import { QueryDepositsResponse } from "./types/cosmos/gov/v1beta1/query";
import { MsgSubmitProposalResponse } from "./types/cosmos/gov/v1beta1/tx";
import { MsgVoteWeightedResponse } from "./types/cosmos/gov/v1beta1/tx";
import { Proposal } from "./types/cosmos/gov/v1beta1/gov";
import { TextProposal } from "./types/cosmos/gov/v1beta1/gov";
import { QueryProposalResponse } from "./types/cosmos/gov/v1beta1/query";
import { Deposit } from "./types/cosmos/gov/v1beta1/gov";
import { QueryDepositsRequest } from "./types/cosmos/gov/v1beta1/query";
import { QueryTallyResultRequest } from "./types/cosmos/gov/v1beta1/query";
import { QueryProposalsResponse } from "./types/cosmos/gov/v1beta1/query";
import { MsgDepositResponse } from "./types/cosmos/gov/v1beta1/tx";
import { WeightedVoteOption } from "./types/cosmos/gov/v1beta1/gov";
import { VotingParams } from "./types/cosmos/gov/v1beta1/gov";
import { QueryVoteRequest } from "./types/cosmos/gov/v1beta1/query";
import { QueryParamsResponse } from "./types/cosmos/gov/v1beta1/query";
import { MsgDeposit } from "./types/cosmos/gov/v1beta1/tx";
const msgTypes = [
    ["/cosmos.gov.v1beta1.TallyResult", TallyResult],
    ["/cosmos.gov.v1beta1.MsgVote", MsgVote],
    ["/cosmos.gov.v1beta1.DepositParams", DepositParams],
    ["/cosmos.gov.v1beta1.QueryParamsRequest", QueryParamsRequest],
    ["/cosmos.gov.v1beta1.TallyParams", TallyParams],
    ["/cosmos.gov.v1beta1.QueryDepositRequest", QueryDepositRequest],
    ["/cosmos.gov.v1beta1.GenesisState", GenesisState],
    ["/cosmos.gov.v1beta1.MsgSubmitProposal", MsgSubmitProposal],
    ["/cosmos.gov.v1beta1.MsgVoteWeighted", MsgVoteWeighted],
    ["/cosmos.gov.v1beta1.QueryProposalRequest", QueryProposalRequest],
    ["/cosmos.gov.v1beta1.QueryVotesRequest", QueryVotesRequest],
    ["/cosmos.gov.v1beta1.Vote", Vote],
    ["/cosmos.gov.v1beta1.MsgVoteResponse", MsgVoteResponse],
    ["/cosmos.gov.v1beta1.QueryVoteResponse", QueryVoteResponse],
    ["/cosmos.gov.v1beta1.QueryVotesResponse", QueryVotesResponse],
    ["/cosmos.gov.v1beta1.QueryTallyResultResponse", QueryTallyResultResponse],
    ["/cosmos.gov.v1beta1.QueryProposalsRequest", QueryProposalsRequest],
    ["/cosmos.gov.v1beta1.QueryDepositResponse", QueryDepositResponse],
    ["/cosmos.gov.v1beta1.QueryDepositsResponse", QueryDepositsResponse],
    ["/cosmos.gov.v1beta1.MsgSubmitProposalResponse", MsgSubmitProposalResponse],
    ["/cosmos.gov.v1beta1.MsgVoteWeightedResponse", MsgVoteWeightedResponse],
    ["/cosmos.gov.v1beta1.Proposal", Proposal],
    ["/cosmos.gov.v1beta1.TextProposal", TextProposal],
    ["/cosmos.gov.v1beta1.QueryProposalResponse", QueryProposalResponse],
    ["/cosmos.gov.v1beta1.Deposit", Deposit],
    ["/cosmos.gov.v1beta1.QueryDepositsRequest", QueryDepositsRequest],
    ["/cosmos.gov.v1beta1.QueryTallyResultRequest", QueryTallyResultRequest],
    ["/cosmos.gov.v1beta1.QueryProposalsResponse", QueryProposalsResponse],
    ["/cosmos.gov.v1beta1.MsgDepositResponse", MsgDepositResponse],
    ["/cosmos.gov.v1beta1.WeightedVoteOption", WeightedVoteOption],
    ["/cosmos.gov.v1beta1.VotingParams", VotingParams],
    ["/cosmos.gov.v1beta1.QueryVoteRequest", QueryVoteRequest],
    ["/cosmos.gov.v1beta1.QueryParamsResponse", QueryParamsResponse],
    ["/cosmos.gov.v1beta1.MsgDeposit", MsgDeposit],
];
export { msgTypes };
