import clsx from "clsx";
import { Fragment, useState } from "react";
import { Icons } from "@/components/ui/icons-assets";
import type { ModalProps } from "./types";
import { useStakingTx } from "./hooks";
import { BondStatus } from "@wardenprotocol/wardenjs/codegen/cosmos/staking/v1beta1/staking";
import { getVotingPower, numRestrict } from "./util";
import { bigintToFixed } from "@/lib/math";
import { useAsset } from "@/hooks/useAsset";
import { VALIDATOR_LOGOS } from "./assets";
import { AssetPlaceholder } from "../assets/AssetRow";

const StakeModal = ({
	apr,
	validator,
	dispatch,
	bondedTokens,
}: ModalProps & { apr?: bigint; bondedTokens?: bigint }) => {
	const [amount, setAmount] = useState("");
	const [allDetails, setAllDetails] = useState(false);
	const { submitStakeTx } = useStakingTx(dispatch);
	const isInactive = BondStatus.BOND_STATUS_BONDED !== validator.status;

	const { balance } = useAsset("uward");
	const ward = parseInt(balance?.amount ?? "0") / 10 ** 6;

	let maxAmount = ward - 1;
	const isInputError = Number(amount) > maxAmount;

	async function submitTransaction() {
		const numAmount = Number(amount);

		if (
			!Number.isFinite(numAmount) ||
			!numAmount ||
			isInactive ||
			numAmount > maxAmount
		) {
			return;
		}

		const rawAmount = BigInt((10 ** 6 * numAmount).toFixed(0));
		const res = await submitStakeTx(rawAmount, validator.operatorAddress);
		dispatch({ type: "set", payload: { modal: undefined, tab: "my" } });
	}

	const icon = VALIDATOR_LOGOS[validator.description?.website];

	return (
		<div
			onClick={(e) => e.stopPropagation()}
			className="max-w-[520px] w-[520px] text-center tracking-wide pb-5"
		>
			<div className="font-bold text-5xl mb-12 leading-[56px]">
				Stake WARD
			</div>

			{isInactive && (
				<div className="mb-12 bg-bg-negative rounded-lg	py-4 px-4 flex items-center gap-3">
					<Icons.alert />
					Validator is inactive. Staking are not possible at this time
				</div>
			)}

			<form
				action=""
				className={clsx(isInactive && "opacity-30 pointer-events-none")}
				onSubmit={(e) => e.preventDefault()}
			>
				<div
					className={clsx(
						"relative z-50 bg-secondary-bg rounded-lg pl-5 pr-3 flex items-center justify-between gap-2",
						{ "border-negative border-[1px]": isInputError },
					)}
				>
					<Icons.logoWhite />
					<input
						className="block w-full h-[60px] bg-transparent outline-none foces:outline-none"
						id="amount"
						onChange={(e) => {
							const { value } = e.target;
							setAmount(numRestrict(value));
						}}
						value={amount}
						placeholder="Amount WARD"
					/>
					{isInputError && <Icons.alert />}
					{amount && (
						<button onClick={() => setAmount("")}>
							<Icons.clearInput />
						</button>
					)}
					<button
						onClick={() => setAmount(maxAmount.toString())}
						className="text-muted-foreground font-semibold py-[6px] px-3"
					>
						Max
					</button>
				</div>

				{isInputError && (
					<div className="mt-[2px] text-negative text-xs">
						Insufficient balance
					</div>
				)}

				<div className="mt-8 relative z-20 bg-secondary-bg rounded-lg flex-col flex gap-4 py-5 px-6">
					<div className="flex h-8 justify-between items-center w-full">
						<div className="text-xl font-bold">Details</div>
						<div
							onClick={() => setAllDetails(!allDetails)}
							className="text-xl font-semibold text-muted-foreground cursor-pointer"
						>
							{allDetails ? "Hide" : "All"}
						</div>
					</div>

					<div className="flex h-8 justify-between items-center w-full">
						<div>Validator</div>

						{validator.description?.website ? (
							<a
								href={validator.description?.website}
								target="_blank"
								className="flex items-center gap-[6px] cursor-pointer"
							>

								{icon ? <img
									src={icon}
									className="w-6 h-6 object-contain"
									alt=""
								/> : <AssetPlaceholder
									className="w-6 h-6 object-contain" />}

								<span className="decoration-solid underline">
									{validator.description?.moniker}
								</span>
							</a>
						) : (
							<div className="flex items-center gap-[6px] cursor-pointer">
								<AssetPlaceholder
									className="w-6 h-6 object-contain"
								/>

								<span className="decoration-solid">
									{validator.description?.moniker}
								</span>
							</div>
						)}
					</div>

					<div className="flex h-8 justify-between items-center w-full">
						<div>Commision</div>
						<div>
							{(
								Number(
									validator.commission.commissionRates.rate ??
										0,
								) * 100
							).toFixed(1)}
							%
						</div>
					</div>

					{allDetails && (
						<Fragment>
							<div className="flex h-8 justify-between items-center w-full">
								<div>Voting power</div>
								<div>
									{bigintToFixed(
										getVotingPower(bondedTokens, validator),
										{ decimals: 2 },
									)}
									%
								</div>
							</div>

							<div className="flex h-8 justify-between items-center w-full">
								<div>Expected APR</div>
								<div>
									{bigintToFixed(
										(apr ?? BigInt(0)) *
											// fixme maybe incorrect decimals
											BigInt(100),
										{
											decimals: 18,
											format: true,
											display: 2,
										},
									)}
									%
								</div>
							</div>

							<div className="flex h-8 justify-between items-center w-full">
								<div className="flex items-center gap-1">
									Unbonding period
									<div className="group relative z-10">
										<Icons.info />
										<div
											className={clsx(
												`w-[220px] opacity-0 bg-[rgba(229,238,255,0.15)] text-white text-center text-xs rounded py-2 px-3 absolute z-10 group-hover:opacity-100 top-[-18px] left-1/2 pointer-events-none backdrop-blur-[20px] translate-x-[-50%] translate-y-[-100%] before:content-[''] before:absolute before:left-[50%] before:bottom-0  before:border-[rgba(229,238,255,0.15)] before:border-b-[8px]  before:border-l-[8px] before:border-t-[transparent]  before:border-r-[transparent] before:border-t-[8px]  before:border-r-[8px] before:w-0 before:h-0 before:rotate-[-45deg] before:translate-y-[50%] before:translate-x-[-50%]`,
											)}
										>
											Cooldown period during which the
											tokens are frozen before being
											unstaked and usable again
										</div>
									</div>
								</div>
								<div>21 days</div>
							</div>
						</Fragment>
					)}
				</div>

				<div className="mt-12">
					<button
						onClick={submitTransaction}
						className={clsx(
							`bg-foreground rounded h-14 flex items-center justify-center w-full font-semibold text-background hover:bg-accent transition-all duration-200`,
						)}
					>
						Stake
					</button>
				</div>
			</form>
		</div>
	);
};

export default StakeModal;
