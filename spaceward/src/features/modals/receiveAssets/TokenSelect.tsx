import clsx from "clsx";
import { Icons } from "@/components/ui/icons-assets";
import { BalanceEntry } from "@/features/assets/types";
import { TokenIcons } from "@/components/ui/icons-crypto";
import { AssetPlaceholder } from "@/features/assets/AssetRow";

const TokenSelect = ({
	token,
	isSelect,
	switchToSelect,
}: {
	token: BalanceEntry;
	isSelect: boolean;
	switchToSelect: () => void;
}) => {
	const TokenIcon = TokenIcons[token?.token] ?? AssetPlaceholder;

	return (
		<div
			className="relative flex z-10 items-center"
			onClick={switchToSelect}
		>
			<div
				className={clsx(
					"rounded-lg z-20 py-3 px-4 flex items-center gap-4 h-[72px] bg-fill-elevated border-[1px] border-solid border-border-quaternary w-full",
					isSelect && "pointer-events-none opacity-30",
				)}
			>
				<TokenIcon className="w-10 h-10" />

				<div>
					<div className="">{token?.token}</div>

					<div className="text-xs text-label-secondary">
						{token?.chainName.charAt(0).toUpperCase() +
							token?.chainName.slice(1)}
					</div>
				</div>

				<Icons.chevronDown
					className={clsx(
						"ml-auto duration-200",
						isSelect && "rotate-180",
					)}
				/>
			</div>
		</div>
	);
};

export default TokenSelect;
