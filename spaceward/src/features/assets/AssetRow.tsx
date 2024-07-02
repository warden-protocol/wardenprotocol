import { FileWarning } from "lucide-react";
import {
	NetworkIconsTransparent,
	TokenIcons,
} from "@/components/ui/icons-crypto";
import { bigintToFixed } from "@/lib/math";
import type { BalanceEntry } from "./types";

export const AssetPlaceholder = ({ className }: { className?: string }) => (
	// fixme use another placeholder
	<FileWarning className={className} />
);

const AssetRow = ({ asset, onClick }: { asset: BalanceEntry, onClick?: () => void }) => {
	const Network =
		NetworkIconsTransparent[asset.chainName] ?? AssetPlaceholder;

	const Token = TokenIcons[asset.token] ?? AssetPlaceholder;

	return (
		<div className="flex gap-3 text-left cursor-pointer items-center p-3" onClick={onClick}>
			<div className="relative">
				<Token className="w-10 h-10" />

				<Network className="absolute bottom-[-6px] right-[-6px] w-[18px] h-[18px]" />
			</div>

			<div>
				<div>{asset.token}</div>
				<div className="text-xs text-muted-foreground">
					{asset.title}
				</div>
			</div>

			<div className="ml-auto">
				{bigintToFixed(asset.balance, { decimals: asset.decimals })}
			</div>
		</div>
	);
};

export default AssetRow;
