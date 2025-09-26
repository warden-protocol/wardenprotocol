import { useCallback, useMemo } from "react";
import {
	ProposalStatus,
	VoteOption,
} from "@wardenprotocol/wardenjs/codegen/cosmos/gov/v1/gov";
import { useQueryHooks, useTx } from "@/hooks/useClient";
import {
	GovernanceDispatch,
	ProposalParsed,
} from "@/features/governance/types";
import { parseMetadata, parseTimestamp } from "@/features/governance/util";
import { useAddressContext } from "@/hooks/useAddressContext";
import { cosmos } from "@wardenprotocol/wardenjs";

export const useGovernance = ({ filter }: { filter: ProposalStatus }) => {
	const {
		cosmos: {
			gov: { v1: governance },
		},
	} = useQueryHooks();

	const proposalsQuery = governance.useProposals({
		request: {
			proposalStatus: filter,
			voter: "",
			depositor: "",
		},
	});

	const proposals: undefined | ProposalParsed[] = useMemo(() => {
		if (!proposalsQuery.data) {
			return undefined;
		}

		return proposalsQuery.data.proposals.map((proposal) => {
			const {
				id: proposalId,
				metadata,
				status,
				votingStartTime,
				votingEndTime,
				summary,
				title
			} = proposal;

			const id = proposalId.toString(10);
			const { summary: _summary, title: _title, forum } = parseMetadata(metadata);

			return {
				id,
				description: _summary || summary,
				name: _title || title,
				status,
				link: forum,
				votingStart: new Date(parseTimestamp(votingStartTime)),
				votingEnd: new Date(parseTimestamp(votingEndTime)),
			};
		});
	}, [proposalsQuery.data]);

	return { proposals };
};

export const useGovernanceTx = (dispatch: GovernanceDispatch) => {
	const { address } = useAddressContext();
	const { tx } = useTx();

	const { vote, submitProposal } = cosmos.gov.v1.MessageComposer.withTypeUrl;

	// fixme no copy-paste
	const submitVoteTx = useCallback(
		async (id: string, option: VoteOption) => {
			dispatch({
				type: "txPending",
				payload: true,
			});

			const res = await tx([vote({
				proposalId: BigInt(id),
				voter: address,
				option,
				metadata: "",
			})], {});

			dispatch({
				type: "txPending",
				payload: false,
			});

			return res;
		},
		[address, dispatch, tx, vote],
	);

	// fixme no copy-paste
	const submitNewProposalTx = useCallback(async () => {
		dispatch({
			type: "txPending",
			payload: true,
		});

		const res = await tx([submitProposal({
			messages: [],
			initialDeposit: [{ denom: "award", amount: "10000000000000000000" }],
			proposer: address,
			metadata: JSON.stringify({
				title: "New Proposal",
				summary: "New Proposala Summary",
				forum: "https://forum.link",
				other: "",
			}),
		})], {});

		dispatch({
			type: "txPending",
			payload: false,
		});

		return res;
	}, [dispatch, tx, address, submitProposal]);

	return {
		submitVoteTx,
		/** @deprecated use only for debug */
		submitNewProposalTx,
	};
};
