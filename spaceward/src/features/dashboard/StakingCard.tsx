import { bigintToFixed } from "@/lib/math";
import { Icons } from "@/components/ui/icons-assets";
import type { DecCoin } from "@wardenprotocol/wardenjs/codegen/cosmos/base/v1beta1/coin";
import { formatReward } from "../staking/util";
import { Link } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

interface CardProps {
	stakedWard?: bigint;
	total?: DecCoin[];
}

export default function StakingCard(props: CardProps) {
	return (
		<Link
			to="/staking"
			className="cursor-pointer group bg-staking-bg overflow-hidden rounded-2xl py-5 px-6 relative isolate"
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

					{props.stakedWard ? (
						bigintToFixed(props.stakedWard ?? BigInt(0), {
							decimals: 6,
							format: true,
						})
					) : (
						<LoaderCircle className="animate-spin" />
					)}
				</div>
				<div className="text-pixel-pink">
					{props.total ? (
						formatReward(props.total)
					) : (
						<div className="rounded h-10 px-5 font-semibold bg-fill-quaternary duration-300 ease-out hover:bg-pink-secondary text-foreground flex items-center justify-center">
							Stake
						</div>
					)}
				</div>
			</div>
		</Link>
	);
}
