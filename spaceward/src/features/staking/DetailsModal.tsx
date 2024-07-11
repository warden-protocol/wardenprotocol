import type { DelegationDelegatorReward } from "@wardenprotocol/wardenjs/codegen/cosmos/distribution/v1beta1/distribution";
import type { DelegationResponse } from "@wardenprotocol/wardenjs/codegen/cosmos/staking/v1beta1/staking";
import type { ModalProps } from "./types";
import { bigintToFixed } from "@/lib/math";
import { formatReward } from "./util";
import { useMemo } from "react";
import { useStakingTx } from "./hooks";

export default function DetailsModal({
	delegation,
	dispatch,
	validator,
	rewards,
}: ModalProps & {
	delegation: DelegationResponse;
	rewards: DelegationDelegatorReward[];
}) {
	const stakedWard = BigInt(delegation.balance.amount);
	const { submitClaimTx, submitUnstakeTx } = useStakingTx(dispatch);

	const reward = useMemo(() => {
		return rewards.find(
			(reward) =>
				reward.validatorAddress ===
				delegation.delegation.validatorAddress,
		);
	}, [rewards, validator]);

	async function submitClaim() {
		await submitClaimTx(delegation.delegation.validatorAddress);
		dispatch({ type: "modal", payload: undefined });
	}

	async function submitUnstake() {
		await submitUnstakeTx(
			BigInt(delegation.balance.amount),
			delegation.delegation.validatorAddress,
		);
		dispatch({ type: "modal", payload: undefined });
	}

	return (
		<div
			onClick={(e) => e.stopPropagation()}
			className="max-w-[520px] w-[520px] tracking-wide pb-5"
		>
			<div className="font-bold text-5xl mb-12 leading-[56px] text-center">
				Staked details
			</div>

			<div className="bg-secondary-bg rounded-lg py-4 px-6">
				<div className="font-bold text-xl mb-4">
					{bigintToFixed(stakedWard, {
						decimals: 6,
						format: true,
					})}{" "}
					WARD staked
				</div>

				<div className="flex justify-between items-center mb-5 py-1">
					<div>
						<div className="text-xs text-label-tertiary">
							Validator
						</div>
						<div>{validator.description.moniker}</div>
					</div>
					<button
						onClick={() =>
							dispatch({ type: "modal", payload: "redelegate" })
						}
						className="rounded bg-secondary-bg font-semibold py-[6px] px-4 hover:bg-hover-bg transition-all duration-300"
					>
						Redelegate
					</button>
				</div>

				<div className="flex justify-between items-center py-1">
					<div>
						<div className="text-xs text-label-tertiary">
							Rewards
						</div>
						<div>{formatReward(reward?.reward)} WARD</div>
					</div>
					<button
						onClick={submitClaim}
						className="rounded bg-secondary-bg font-semibold py-[6px] px-4 hover:bg-hover-bg transition-all duration-300"
					>
						Claim
					</button>
				</div>
			</div>

			<button
				onClick={() => dispatch({ type: "modal", payload: "stake" })}
				className="rounded-lg mt-12 bg-foreground h-14 flex items-center justify-center w-full font-semibold text-background hover:bg-accent transition-all duration-300"
			>
				Stake More
			</button>

			<button
				onClick={submitUnstake}
				className="rounded-lg mt-4 bg-secondary-bg h-14 flex items-center justify-center w-full font-semibold  hover:bg-hover-bg transition-all duration-300 text-white"
			>
				Unstake
			</button>

			<div className="mt-2 text-center text-xs text-muted-foreground">
				Unbonding period is 21 days
			</div>
		</div>
	);
}
