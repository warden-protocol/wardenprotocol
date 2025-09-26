// import { FileWarning } from "lucide-react";
import {
	NetworkIcons,
	NetworkIconsTransparent,
	TokenIcons,
} from "@/components/ui/icons-crypto";
import { bigintToFixed } from "@/lib/math";
import type { BalanceEntry } from "./types";
import clsx from "clsx";

const AssetContainer = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => (
	<div
		className={clsx(
			className,
			"border-card-foreground rounded-full bg-card-foreground",
		)}
	>
		{children}
	</div>
);

export const AssetIcon = ({
	className,
	value,
	logo,
	type,
}: {
	className?: string;
	value: string;
	logo?: string;
	type: "token" | "network" | "network-transparent";
}) => {
	const Icons =
		type === "token"
			? TokenIcons
			: type === "network"
				? NetworkIcons
				: NetworkIconsTransparent;

	if (value in Icons) {
		const Icon = Icons[value]!;
		return <Icon className={className} />;
	}

	return (
		<AssetContainer className={clsx(className, "flex items-center justify-center")}>
			{logo ? <img src={logo} alt="" /> : <p className="text-black">{value.slice(0, 2)}</p>}
		</AssetContainer>
	);
};

const AssetRow = ({
	asset,
	onClick,
}: {
	asset: BalanceEntry;
	onClick?: () => void;
}) => {
	return (
		<div
			className="flex gap-3 text-left cursor-pointer items-center p-3"
			onClick={onClick}
		>
			<div className="relative">
				<AssetIcon
					type="token"
					value={asset.token}
					logo={asset.logo}
					className="w-10 h-10"
				/>

				<AssetIcon
					type="network-transparent"
					value={asset.chainName}
					className="absolute bottom-[-6px] right-[-6px] w-[18px] h-[18px]"
				/>
			</div>

			<div>
				<div>{asset.token}</div>
				<div className="text-xs text-muted-foreground">
					{asset.title}
				</div>
			</div>

			<div className="ml-auto">
				{bigintToFixed(asset.balance, { decimals: asset.decimals, ceil: true, display: 4 })}
			</div>
		</div>
	);
};

export default AssetRow;
