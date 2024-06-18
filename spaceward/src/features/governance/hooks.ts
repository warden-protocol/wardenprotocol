import { useCallback, useMemo } from "react";
import {
	ProposalStatus,
	VoteOption,
} from "@wardenprotocol/wardenjs/codegen/cosmos/gov/v1/gov";
import { useClient, useQueryHooks } from "@/hooks/useClient";
import {
	GovernanceDispatch,
	ProposalParsed,
} from "@/features/governance/types";
import { parseMetadata, parseTimestamp } from "@/features/governance/util";
import { useAddressContext } from "@/hooks/useAddressContext";
import { useToast } from "@/components/ui/use-toast";
import { monitorTx } from "@/hooks/keplr";

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
// fixme conflicts with imported type
type GetTxResponse = UnwrapPromise<ReturnType<typeof monitorTx>>;

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
			} = proposal;

			const id = proposalId.toString(10);
			const { summary, title: name, forum } = parseMetadata(metadata);

			return {
				id,
				description: summary,
				name,
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
	const { toast } = useToast();

	const {
		CosmosBankV1Beta1: {
			tx: { sendMsgSend },
		},
		CosmosGovV1: {
			tx: { sendMsgSubmitProposal, sendMsgVote },
		},
	} = useClient();

	// fixme no copy-paste
	const submitVoteTx = useCallback(
		async (id: string, option: VoteOption) => {
			dispatch({
				type: "txPending",
				payload: true,
			});

			const tx = sendMsgVote({
				value: {
					proposalId: Number(id),
					voter: address,
					option,
					metadata: "",
				},
			});

			let res: GetTxResponse | undefined;

			try {
				res = await monitorTx(tx, toast);
			} catch (e) {
				console.error(e);
			}

			dispatch({
				type: "txPending",
				payload: false,
			});

			return res;
		},
		[address, dispatch, toast],
	);

	// fixme no copy-paste
	const submitNewProposalTx = useCallback(async () => {
		dispatch({
			type: "txPending",
			payload: true,
		});

		const tx = sendMsgSubmitProposal({
			value: {
				messages: [],
				initialDeposit: [{ denom: "uward", amount: "10000000" }],
				proposer: address,
				metadata: JSON.stringify({
					title: "New Proposal",
					summary: "New Proposala Summary",
					forum: "https://forum.link",
					other: "",
				}),
				title: "New Proposal",
				summary: "New Proposala Summary",
				expedited: false,
			},
		});

		let res: GetTxResponse | undefined;

		try {
			res = await monitorTx(tx, toast);
		} catch (e) {
			console.error(e);
		}

		dispatch({
			type: "txPending",
			payload: false,
		});

		return res;
	}, [address, dispatch, toast]);

	return {
		submitVoteTx,
		/** @deprecated use only for debug */
		submitNewProposalTx,
	};
};
