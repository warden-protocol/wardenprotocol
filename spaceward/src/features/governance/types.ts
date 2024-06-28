import { Dispatch } from "react";
import type {
	ProposalStatus,
	TallyResult,
	Vote,
} from "@wardenprotocol/wardenjs/codegen/cosmos/gov/v1/gov";
import type { CommonActions } from "@/utils/common";

export interface ProposalParsed {
	id: string;
	name: string;
	description?: string;
	status: ProposalStatus;
	votingStart: Date;
	votingEnd: Date;
	link?: string;
}

/**
 * @description recommended format for metadata: https://docs.cosmos.network/v0.46/modules/gov/02_state.html#proposals
 */
export interface MetadataJSON {
	title: string;
	summary: string;
	forum: string;
	other: string;
}

export type SortDirections = "asc" | "desc";
export type SortKeys = "status" | "votes" | "start" | "end";

export interface GovernanceState {
	txPending: boolean;
	proposal?: ProposalParsed;
	votes?: Vote[];
	tally?: TallyResult;
	layout: "list" | "grid";
	step: "details" | "vote" | "votes";
	filterStatus: ProposalStatus;
	proposalDropdown?: boolean;
	sortDirection?: SortDirections;
	sortDropdown?: SortKeys;
	sortKey?: SortKeys;
	voteAmounts: Record<string, bigint>;
}

export type VoteType = "yes" | "no" | "noWithVeto" | "abstain";
export type GovernanceDispatch = Dispatch<CommonActions<GovernanceState>>;
