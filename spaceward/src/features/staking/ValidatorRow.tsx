import { Icons } from "@/components/ui/icons-assets";
import { bigintToFixed } from "@/lib/math";
import type { Amount } from "@/utils/interfaces";

import {
	BondStatus,
	Validator,
} from "@wardenprotocol/wardenjs/codegen/cosmos/staking/v1beta1/staking";

import clsx from "clsx";

interface ValidatorProps extends Validator {
	openStakeModal: (address: string) => void;
	stakedAmount?: Amount;
	bondedTokens?: bigint;
}

const B0 = BigInt(0);
const B10000 = BigInt(10000);

export default function ValidatorRow(props: ValidatorProps) {
	const status: BondStatus = props.status;
	const votingPower = props.bondedTokens
		? (BigInt(props.tokens) * B10000) / props.bondedTokens
		: B0;

	return (
		<div className="grid grid-cols-[1fr_150px_150px_150px_200px] gap-3 h-[72px]  border-t-[1px] border-secondary-bg">
			<div className="flex items-center gap-3">
				<img
					src="/images/eth.png"
					alt=""
					className="w-10 h-10 object-contain"
				/>

				<div>
					{/* TODO proper title */}
					{props.description.moniker} {props.operatorAddress}
				</div>
			</div>

			<div className="flex flex-col justify-center">
				{(Number(props.commission.commissionRates.rate) * 100).toFixed(
					1,
				)}
				%
			</div>

			<div className="flex flex-col justify-center">
				{bigintToFixed(votingPower, { decimals: 2 })}%
			</div>

			<div className="flex flex-col justify-center">
				<div className="flex items-center gap-1">
					<div
						className={clsx("w-[6px] h-[6px] rounded-full", {
							"bg-positive":
								status === BondStatus.BOND_STATUS_BONDED,
							"bg-negative":
								status !== BondStatus.BOND_STATUS_BONDED,
						})}
					/>
					{status === BondStatus.BOND_STATUS_BONDED
						? "Active"
						: // todo
							BondStatus[status]}
				</div>
			</div>

			<div
				className="flex items-center justify-end gap-1 cursor-pointer text-secondary-text"
				onClick={() => props.openStakeModal(props.operatorAddress)}
			>
				<div>
					{props.stakedAmount
						? (Number(props.stakedAmount.amount) / 10 ** 6).toFixed(
								6,
							)
						: (Number(props.tokens) / 10 ** 6).toFixed(6)}
				</div>
				<Icons.chevronRight />
			</div>

			{/* TODO when to show this button?
				<div className="flex items-center justify-end">
					<button
						onClick={() => {
							// setStakeModal(true);
						}}
						className="cursor-pointer bg-secondary-bg text-white py-[6px] px-4 rounded hover:bg-hover-bg ease-in duration-100"
					>
						Stake
					</button>
				</div>*/}
		</div>
	);
}
