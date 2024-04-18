import { useState } from "react";
import FaucetButton from "./FaucetButton";
import { Button } from "@/components/ui/button";
import { AlertCircle, ChevronsUpDown, LogOutIcon } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import AddressAvatar from "./AddressAvatar";
import { useAddressContext } from "@/hooks/useAddressContext";
import { useAsset } from "@/hooks/useAsset";
import { useChain } from "@cosmos-kit/react";
import { env } from "@/env";

import { Copy } from "@/components/ui/copy";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider,
} from "./ui/tooltip";

export function ConnectWallet() {
	const { wallet, disconnect, username } = useChain(env.cosmoskitChainName);
	const { address } = useAddressContext();

	const [showTooltip, setShowTooltip] = useState<Boolean>(false);

	const { balance } = useAsset("uward");
	const ward = parseInt(balance?.amount || "0") / 10 ** 6;

	return (
		<Popover>
			<PopoverTrigger asChild>
				{address ? (
					<Button
						asChild
						variant="outline"
						role="combobox"
						className="justify-between w-80 cursor-pointer rounded-xl bg-card h-16 px-0 md:px-4 gap-2 min-w-0 hover:bg-card hover:text-foreground border-0"
					>
						<div>
							<div className="relative w-10">
								<AddressAvatar seed={address} />
							</div>
							<div className="md:flex flex-col text-left text-xs hidden w-full px-4">
								<span className="block text-sm max-w-44 truncate">
									{username}
								</span>
								<span className="block text-xs text-muted-foreground">
									{ward.toFixed(2)} WARD
								</span>
							</div>
							<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 hidden md:block" />
						</div>
					</Button>
				) : (
					<Button
						variant="outline"
						role="combobox"
						className="justify-between cursor-pointer h-16 border-t-0 border-b-0 rounded-none gap-4 min-w-0 hover:bg-muted hover:border-b-accent hover:border-b-2"
					>
						<div>
							<AlertCircle className="ml-2 h-8 w-8 shrink-0" />
						</div>
						<div className="flex flex-col text-left text-xs">
							<span>Not Connected</span>
							<span>Connect Wallet</span>
						</div>
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				)}
			</PopoverTrigger>

			{address ? (
				<PopoverContent className="w-80 bg-card rounded-xl border-0 px-4 py-6">
					<div className="grid gap-4">
						<div className="flex flex-row text-left text-xs gap-2 justify-between items-center px-2">
							<span className="block text-sm">
								<Copy value={address} split />
							</span>
							<div className="flex flex-row gap-2">
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger
											onMouseEnter={() =>
												setShowTooltip(true)
											}
											onMouseLeave={() =>
												setShowTooltip(false)
											}
										>
											<LogOutIcon
												onClick={() => disconnect()}
												className="h-4 w-4 cursor-pointer"
											/>
										</TooltipTrigger>
										{showTooltip && (
											<TooltipContent>
												<p>Disconnect Wallet</p>
											</TooltipContent>
										)}
									</Tooltip>
								</TooltipProvider>
							</div>
						</div>
						<div className="bg-background rounded-xl">
							<div className="px-6 py-4 text-sm border-b border-card flex justify-between">
								<span>Wallet</span>
								<span>{wallet?.prettyName || ""}</span>
							</div>
							<div className="px-6 py-4 text-sm flex justify-between">
								<span>Balance</span>
								<span>{ward.toFixed(2)} WARD</span>
							</div>
						</div>
						<div className="flex flex-col gap-4 flex-grow mx-2">
							<FaucetButton />
						</div>
					</div>
				</PopoverContent>
			) : (
				<PopoverContent className="w-80 rounded-t-none border-t-0 -translate-y-1 bg-card">
					<div className="flex flex-col gap-4"></div>
				</PopoverContent>
			)}
		</Popover>
	);
}
