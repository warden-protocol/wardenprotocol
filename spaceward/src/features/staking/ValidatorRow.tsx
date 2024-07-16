import { Icons } from "@/components/ui/icons-assets";
import { bigintToFixed } from "@/lib/math";
import type { Amount } from "@/utils/interfaces";

import {
	BondStatus,
	Validator,
} from "@wardenprotocol/wardenjs/codegen/cosmos/staking/v1beta1/staking";

import clsx from "clsx";
import { getVotingPower } from "./util";
import { VALIDATOR_LOGOS } from "./assets";
import { AssetPlaceholder } from "../assets/AssetRow";

interface ValidatorProps extends Validator {
	openStakeModal: (address: string) => void;
	stakedAmount?: Amount;
	bondedTokens?: bigint;
}

export default function ValidatorRow(props: ValidatorProps) {
	const status: BondStatus = props.status;
	const votingPower = getVotingPower(props.bondedTokens, props);
	const icon = VALIDATOR_LOGOS[props.description?.website];

	return (
		<div className="grid grid-cols-[1fr_150px_150px_150px_200px] gap-3 h-[72px]  border-t-[1px] border-border-quaternary">
			<div className="flex items-center gap-3">
				{icon ? (
					<img
						src={icon}
						alt=""
						className="w-10 h-10 object-contain"
					/>
				) : (
					<AssetPlaceholder className="w-10 h-10 object-contain" />
				)}

				<div>{props.description.moniker} </div>
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
					{props.jailed
						? "Jailed"
						: status === BondStatus.BOND_STATUS_BONDED
							? "Active"
							: status === BondStatus.BOND_STATUS_UNBONDED
								? "Inactive" // todo
								: status === BondStatus.BOND_STATUS_UNBONDING
									? "Unbonding" // todo
									: BondStatus[status]}
				</div>
			</div>

			{props.stakedAmount ? (
				<div
					className="flex items-center justify-end gap-1 cursor-pointer text-muted-foreground"
					onClick={() => props.openStakeModal(props.operatorAddress)}
				>
					<div>
						{(Number(props.stakedAmount.amount) / 10 ** 6).toFixed(
							6,
						)}
					</div>
					<Icons.chevronRight />
				</div>
			) : (
				<div className="flex items-center justify-end">
					<button
						onClick={() =>
							props.openStakeModal(props.operatorAddress)
						}
						className="cursor-pointer bg-fill-quaternary py-[6px] px-4 rounded hover:bg-hover-bg ease-in duration-100 font-semibold"
					>
						Stake
					</button>
				</div>
			)}
		</div>
	);
}
