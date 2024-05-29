import clsx from "clsx";
import type Long from "long";
import { Icons } from "@/components/ui/icons-assets";
import { useMemo } from "react";
import { bigintToFixed } from "@/lib/math";
import type { DecCoin } from "@wardenprotocol/wardenjs/codegen/cosmos/base/v1beta1/coin";

const DAY_SEC = 86400;

interface HeadingProps {
	availableWard?: bigint;
	stakedWard?: bigint;
	unbondingSeconds?: Long;
	total?: DecCoin[];
	claim: () => Promise<void>;
}

export default function StakingHeading(props: HeadingProps) {
	const unbondingDays = props.unbondingSeconds?.div(DAY_SEC).toString();

	const rewardsWard = useMemo(
		() =>
			props.total?.reduce(
				(total, item) =>
					item.denom !== "uward"
						? total
						: total + BigInt(item.amount),
				BigInt(0),
			),
		[props.total],
	);

	return (
		<div className="grid grid-cols-4 gap-6">
			<div className="bg-tertiary border-border-secondary border-[1px] rounded-xl	px-6 py-6">
				<div className="text-secondary-text text-sm">
					Available WARD
				</div>
				<div className="h-3" />
				<div className="flex items-center gap-[6px] text-xl font-bold">
					<Icons.logoWhite />
					{bigintToFixed(props.availableWard ?? BigInt(0), {
						decimals: 6,
						format: true
					})}
				</div>
			</div>
			<div className="bg-tertiary border-border-secondary border-[1px] rounded-xl	px-6 py-6">
				<div className="text-secondary-text text-sm">Staked WARD</div>
				<div className="h-3" />
				<div className="flex items-center gap-[6px] text-xl font-bold">
					{bigintToFixed(props.stakedWard ?? BigInt(0), {
						decimals: 6,
						format: true
					})}
				</div>
			</div>
			<div className="bg-tertiary border-border-secondary border-[1px] rounded-xl	px-6 py-6">
				<div className="text-secondary-text text-sm flex items-center gap-1">
					Unbonding Period
					<div className="group relative z-10">
						<Icons.info />
						<div
							className={clsx(
								`w-[220px] opacity-0 bg-[rgba(229,238,255,0.15)] text-white text-center text-xs rounded py-2 px-3 absolute z-10 group-hover:opacity-100 top-[-18px] left-1/2 pointer-events-none backdrop-blur-[20px] translate-x-[-50%] translate-y-[-100%] before:content-[''] before:absolute before:left-[50%] before:bottom-0  before:border-[rgba(229,238,255,0.15)] before:border-b-[8px]  before:border-l-[8px] before:border-t-[transparent]  before:border-r-[transparent] before:border-t-[8px]  before:border-r-[8px] before:w-0 before:h-0 before:rotate-[-45deg] before:translate-y-[50%] before:translate-x-[-50%]`,
							)}
						>
							Cooldown period during which the tokens are frozen
							before being unstaked and usable again
						</div>
					</div>
				</div>
				<div className="h-3" />
				<div className="flex items-center gap-[6px] text-xl font-bold">
					<Icons.clock />
					{unbondingDays} days
				</div>
			</div>
			<div className="bg-tertiary border-border-secondary border-[1px] rounded-xl	px-6 py-6">
				<div className="text-secondary-text text-sm">Rewards WARD</div>
				<div className="h-3" />
				<div className="flex items-center gap-[6px] text-xl font-bold">
					{bigintToFixed(rewardsWard ?? BigInt(0), { decimals: 6, format: true })}
					<button
						className="ml-auto font-semibold text-pixel-pink text-base	"
						onClick={props.claim}
					>
						Claim
					</button>
				</div>
			</div>
		</div>
	);
}
