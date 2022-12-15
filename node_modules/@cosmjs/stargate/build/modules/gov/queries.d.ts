import { Uint64 } from "@cosmjs/math";
import { ProposalStatus } from "cosmjs-types/cosmos/gov/v1beta1/gov";
import { QueryDepositResponse, QueryDepositsResponse, QueryParamsResponse, QueryProposalResponse, QueryProposalsResponse, QueryTallyResultResponse, QueryVoteResponse, QueryVotesResponse } from "cosmjs-types/cosmos/gov/v1beta1/query";
import Long from "long";
import { QueryClient } from "../../queryclient";
export declare type GovParamsType = "deposit" | "tallying" | "voting";
export declare type GovProposalId = string | number | Long | Uint64;
export interface GovExtension {
    readonly gov: {
        readonly params: (parametersType: GovParamsType) => Promise<QueryParamsResponse>;
        readonly proposals: (proposalStatus: ProposalStatus, depositor: string, voter: string, paginationKey?: Uint8Array) => Promise<QueryProposalsResponse>;
        readonly proposal: (proposalId: GovProposalId) => Promise<QueryProposalResponse>;
        readonly deposits: (proposalId: GovProposalId, paginationKey?: Uint8Array) => Promise<QueryDepositsResponse>;
        readonly deposit: (proposalId: GovProposalId, depositorAddress: string) => Promise<QueryDepositResponse>;
        readonly tally: (proposalId: GovProposalId) => Promise<QueryTallyResultResponse>;
        readonly votes: (proposalId: GovProposalId, paginationKey?: Uint8Array) => Promise<QueryVotesResponse>;
        readonly vote: (proposalId: GovProposalId, voterAddress: string) => Promise<QueryVoteResponse>;
    };
}
export declare function setupGovExtension(base: QueryClient): GovExtension;
