import { BondStatus } from "@wardenprotocol/wardenjs/codegen/cosmos/staking/v1beta1/staking";
import { useQueryHooks, useTx } from "@/hooks/useClient";
import type { ModalProps } from "./types";
import { useCallback } from "react";
import { useAddressContext } from "@/hooks/useAddressContext";
import { cosmos } from "@wardenprotocol/wardenjs";

/** @deprecated fix distribution hooks */
const DISTRIBUTION_PARAMS = {
	data: {
		params: {
			communityTax: "0.02",
			baseProposerReward: "0",
			bonusProposerReward: "0",
			withdrawAddrEnabled: true,
		},
	},
};

export const useStakingQueries = (address: string) => {
	const {
		cosmos: {
			bank: { v1beta1: bank },
			distribution: { v1beta1: distribution },
			mint: { v1beta1: mint },
			staking: { v1beta1: staking },
		},
		isReady,
	} = useQueryHooks();

	const queryDelegations = staking.useDelegatorDelegations({
		request: { delegatorAddr: address },
		options: {
			enabled: isReady,
		},
	});

	// fixme possible query key conflict; staking.useParams is overwritten if using distribution.useParams
	const queryDistributionParams = DISTRIBUTION_PARAMS;

	const queryInflation = mint.useInflation({
		request: {},
		options: { enabled: isReady },
	});

	const queryPool = staking.usePool({
		request: {},
		options: { enabled: isReady },
	});

	const queryStakingParams = staking.useParams({
		request: {},
		options: { enabled: isReady },
	});

	const queryTotalRewards = distribution.useDelegationTotalRewards({
		request: { delegatorAddress: address },
		options: {
			enabled: isReady,
		},
	});

	const queryTotalSupply = bank.useTotalSupply({
		options: { enabled: isReady },
	});

	const queryValidators = staking.useValidators({
		request: {
			// @ts-expect-error string expected; fixme possible type bug
			status: BondStatus.BOND_STATUS_UNSPECIFIED,
			pagination: {
				key: new Uint8Array(),
				offset: BigInt(0),
				limit: BigInt(2000),
				countTotal: true,
				reverse: false,
			},
		},
		options: {
			enabled: isReady,
		},
	});

	return {
		queryDelegations,
		queryDistributionParams,
		queryInflation,
		queryPool,
		queryStakingParams,
		queryTotalRewards,
		queryTotalSupply,
		queryValidators,
	};
};

type Dispatch = ModalProps["dispatch"];

export const useStakingTx = (dispatch: Dispatch) => {
	const { address } = useAddressContext();
	const { tx } = useTx();

	const { withdrawDelegatorReward } =
		cosmos.distribution.v1beta1.MessageComposer.withTypeUrl;
	const { delegate, undelegate, beginRedelegate } =
		cosmos.staking.v1beta1.MessageComposer.withTypeUrl;

	// fixme no copy-paste
	const submitClaimTx = useCallback(
		async (validatorAddress?: string) => {
			if (!validatorAddress) {
				return;
			}

			dispatch({
				type: "txPending",
				payload: true,
			});

			const res = await tx(
				[
					withdrawDelegatorReward({
						delegatorAddress: address,
						validatorAddress,
					}),
				],
				{},
			);

			dispatch({
				type: "txPending",
				payload: false,
			});

			return res;
		},
		[address, dispatch, tx, withdrawDelegatorReward],
	);

	const submitStakeTx = useCallback(
		async (amount?: bigint, validatorAddress?: string) => {
			if (!amount || !validatorAddress) {
				return;
			}

			dispatch({
				type: "txPending",
				payload: true,
			});

			const res = await tx(
				[
					delegate({
						delegatorAddress: address,
						validatorAddress,
						amount: {
							amount: amount.toString(),
							denom: "award",
						},
					}),
				],
				{},
			);

			dispatch({
				type: "txPending",
				payload: false,
			});

			return res;
		},
		[address, dispatch, tx, delegate],
	);

	const submitUnstakeTx = useCallback(
		async (amount?: bigint, validatorAddress?: string) => {
			if (!amount || !validatorAddress) {
				return;
			}

			dispatch({
				type: "txPending",
				payload: true,
			});

			const res = await tx(
				[
					undelegate({
						delegatorAddress: address,
						validatorAddress,
						amount: {
							amount: amount.toString(),
							denom: "award",
						},
					}),
				],
				{},
			);

			dispatch({
				type: "txPending",
				payload: false,
			});

			return res;
		},
		[address, dispatch, tx, undelegate],
	);

	const submitRedelegateTx = useCallback(
		async (amount?: bigint, from?: string, to?: string) => {
			if (!amount || !from || !to) {
				return;
			}

			dispatch({
				type: "txPending",
				payload: true,
			});

			const res = await tx(
				[
					beginRedelegate({
						delegatorAddress: address,
						validatorSrcAddress: from,
						validatorDstAddress: to,
						amount: {
							amount: amount.toString(),
							denom: "award",
						},
					}),
				],
				{},
			);

			dispatch({
				type: "txPending",
				payload: false,
			});

			return res;
		},
		[address, dispatch, tx, beginRedelegate],
	);

	return {
		submitClaimTx,
		submitStakeTx,
		submitUnstakeTx,
		submitRedelegateTx,
	};
};
