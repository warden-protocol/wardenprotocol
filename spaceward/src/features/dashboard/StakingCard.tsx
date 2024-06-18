import { bigintToFixed } from "@/lib/math";
import { Icons } from "@/components/ui/icons-assets";
import type { DecCoin } from "@wardenprotocol/wardenjs/codegen/cosmos/base/v1beta1/coin";
import type { DelegationDelegatorReward } from "@wardenprotocol/wardenjs/codegen/cosmos/distribution/v1beta1/distribution";
import { formatReward } from "../staking/util";

interface CardProps {
	stakedWard?: bigint;
	total?: DecCoin[];
}

export default function StakingCard(props: CardProps) {
	return (
		<a
			href="/staking"
			className="cursor-pointer group bg-staking-bg border-[1px] border-border-secondary overflow-hidden rounded-2xl py-5 px-6 relative isolate"
		>
			<img
				src="/images/staking-bg.png"
				className="absolute right-0 bottom-0 h-full object-contain z-[-1]"
				alt=""
			/>
			<div className="font-bold text-2xl mb-4 flex items-center justify-between">
				Staking
				<div className="group-hover:opacity-100 opacity-0 ease-in duration-300 rounded-full w-8 h-8 flex items-center justify-center bg-secondary-bg">
					<Icons.chevronDown className="-rotate-90 w-6 h-6" />
				</div>
			</div>
			<div className="flex justify-between items-center">
				<div className="flex gap-3 items-center">
					<Icons.wardPink className="w-10 h-10" />
					{bigintToFixed(props.stakedWard ?? BigInt(0), {
						decimals: 6,
						format: true,
					})}
					{/* 10,350,456.01 */}
				</div>
				<div className="text-pixel-pink">
					{/* +2,345.11 */}
					{formatReward(props.total)}
				</div>
			</div>
		</a>
	);
}
