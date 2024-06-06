import { BondStatus } from "@wardenprotocol/wardenjs/codegen/cosmos/staking/v1beta1/staking";
import { useClient, useQueryHooks } from "@/hooks/useClient";
import type { ModalProps } from "./types";
import { useToast } from "@/components/ui/use-toast";
import { useCallback } from "react";
import { useAddressContext } from "@/hooks/useAddressContext";
import { monitorTx } from "@/hooks/keplr";

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
// fixme conflicts with imported type
type GetTxResponse = UnwrapPromise<ReturnType<typeof monitorTx>>;

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
	} = useQueryHooks();

	const queryDelegations = staking.useDelegatorDelegations({
		request: { delegatorAddr: address },
	});

	// fixme possible query key conflict; staking.useParams is overwritten if using distribution.useParams
	const queryDistributionParams = DISTRIBUTION_PARAMS;
	const queryInflation = mint.useInflation({ request: {} });
	const queryPool = staking.usePool({ request: {} });
	const queryStakingParams = staking.useParams({ request: {} });

	const queryTotalRewards = distribution.useDelegationTotalRewards({
		request: { delegatorAddress: address },
	});

	const queryTotalSupply = bank.useTotalSupply({});

	const queryValidators = staking.useValidators({
		request: {
			// @ts-expect-error string expected; fixme possible type bug
			status: BondStatus.BOND_STATUS_UNSPECIFIED,
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
	const { toast } = useToast();

	const {
		CosmosDistributionV1Beta1: {
			tx: { sendMsgWithdrawDelegatorReward },
		},
		CosmosStakingV1Beta1: {
			tx: { sendMsgDelegate, sendMsgUndelegate, sendMsgBeginRedelegate },
		},
	} = useClient();

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

			const tx = sendMsgWithdrawDelegatorReward({
				value: {
					delegatorAddress: address,
					validatorAddress,
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

	const submitStakeTx = useCallback(
		async (amount?: bigint, validatorAddress?: string) => {
			if (!amount || !validatorAddress) {
				return;
			}

			dispatch({
				type: "txPending",
				payload: true,
			});

			const tx = sendMsgDelegate({
				value: {
					delegatorAddress: address,
					validatorAddress,
					amount: {
						amount: amount.toString(),
						denom: "uward",
					},
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

	const submitUnstakeTx = useCallback(
		async (amount?: bigint, validatorAddress?: string) => {
			if (!amount || !validatorAddress) {
				return;
			}

			dispatch({
				type: "txPending",
				payload: true,
			});

			const tx = sendMsgUndelegate({
				value: {
					delegatorAddress: address,
					validatorAddress,
					amount: {
						amount: amount.toString(),
						denom: "uward",
					},
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

	const submitRedelegateTx = useCallback(
		async (amount?: bigint, from?: string, to?: string) => {
			if (!amount || !from || !to) {
				return;
			}

			dispatch({
				type: "txPending",
				payload: true,
			});

			const tx = sendMsgBeginRedelegate({
				value: {
					delegatorAddress: address,
					validatorSrcAddress: from,
					validatorDstAddress: to,
					amount: {
						amount: amount.toString(),
						denom: "uward",
					},
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

	return {
		submitClaimTx,
		submitStakeTx,
		submitUnstakeTx,
		submitRedelegateTx,
	};
};
