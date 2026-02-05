import { useEffect, useState } from "react";
import FaucetButton from "./FaucetButton";
import { Button } from "@/components/ui/button";
import { AlertCircle, ChevronsUpDown, RefreshCw } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import AddressAvatar from "./AddressAvatar";
import { env } from "@/env";

import { Copy } from "@/components/ui/copy";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider,
} from "./ui/tooltip";
import { Icons } from "@/layouts/icons";
import { wallets } from "cosmos-kit";
import { bigintToFixed } from "@/lib/math";
import { useConnectWallet } from "@web3-onboard/react";
import { useBalance } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";

export function ConnectWallet() {
	const [{ wallet }, , disconnect] = useConnectWallet()
	const address = wallet?.accounts?.[0]?.address;
	const username = wallet?.accounts?.[0]?.ens?.name ?? `${address?.slice(0, 6)}...${address?.slice(-4)}`;
	const [showTooltip, setShowTooltip] = useState<Boolean>(false);
	const [currentWallet, setCurrentWallet] = useState("");
	const queryClient = useQueryClient();
	const [isRefreshing, setIsRefreshing] = useState(false);

	const balance = useBalance({
		address: address,
		chainId: env.evmChainId
	});

	const handleRefresh = async () => {
		if (!address || isRefreshing) return;
		setIsRefreshing(true);
		try {
			// Invalidate and refetch balance query
			await queryClient.invalidateQueries({ queryKey: balance.queryKey });
			await balance.refetch();
		} catch (error) {
			console.error("Error refreshing balance:", error);
		} finally {
			setIsRefreshing(false);
		}
	};

	const ward = bigintToFixed(balance.data?.value, {
		ceil: true,
		decimals: 18,
		display: 2,
	});

	useEffect(() => {
		typeof window !== undefined &&
			"localStorage" &&
			setCurrentWallet(
				localStorage.getItem("cosmos-kit@2:core//current-wallet") ?? "",
			);
	}, [address]);

	const supportedWallets = wallets.for("keplr", "leap", "cosmostation");

	const walletIcon = supportedWallets.find(
		(item) => item.walletInfo.name === currentWallet,
	)?.walletInfo.logo;

	return (
		<Popover>
			<PopoverTrigger asChild>
				{address ? (
					<Button
						asChild
						variant="outline"
						role="combobox"
						className="p-0 my-0 w-full flex items-center bg-transparent hover:bg-transparent cursor-pointer rounded-xl bg:bg-card mt-6 min-w-0 md:hover:bg-card hover:text-foreground border-0"
					>
						<div className="relative flex flex-col">
							<div className="border-[2px] flex items-center justify-center shrink-0 p-[2px] rounded-full focus:border-pixel-pink border-transparent">
								<AddressAvatar
									seed={address}
									className="w-8 h-8"
								/>
							</div>
							<div className="text-center text-label-secondary text-xs mt-[6px]">
								..{address.slice(-4)}
							</div>
						</div>
						{/* <div>
							<div className="md:flex flex-col text-left text-xs hidden w-full px-4">
								<span className="block text-sm max-w-44 truncate">
									{username}
								</span>
								<span className="block text-xs text-muted-foreground">
									{ward.toFixed(2)} WARD
								</span>
							</div>
							<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 hidden md:block" />
						</div> */}
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
				<PopoverContent
					side="left"
					className="w-[384px] mt-2 mr-2 bg-card rounded-xl p-6 border-[1px] border-border-edge border-solid"
				>
					<div className="grid gap-6">
						<div className="flex flex-row text-left gap-3 items-center">
							<div className="relative flex items-center justify-center shrink-0">
								<AddressAvatar
									seed={address}
									className="w-10 h-10"
								/>
								{currentWallet && walletIcon ? (
									<div className="absolute w-4 h-4 bg-fill-quaternary rounded-full -right-[6px] -bottom-[6px] p-1 flex-center justify-center">
										<img
											src={
												typeof walletIcon === "string"
													? walletIcon
													: walletIcon.minor
											}
											alt=""
										/>
									</div>
								) : (
									<></>
								)}
							</div>
							<div>
								<div className="overflow-hidden text-ellipsis max-w-[160px]">
									{username}
								</div>
								<div className="text-xs text-label-secondary">
									<Copy value={address} split />
								</div>
							</div>

							<div className="flex flex-row gap-2 ml-auto">
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger
											className="outline-none"
											onMouseEnter={() =>
												setShowTooltip(true)
											}
											onMouseLeave={() =>
												setShowTooltip(false)
											}
										>
											<Icons.logOut
												onClick={() => disconnect(wallet)}
												className="h-6 w-6 cursor-pointer "
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
						<div className="bg-fill-quaternary rounded-lg flex items-center gap-3 p-4">
							<Icons.wardPink />
							<div>
								<div className="text-xs text-label-secondary">
									Balance
								</div>
								<div>{ward}&nbsp;WARD</div>
							</div>
							<div className="ml-auto flex items-center gap-2">
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												variant="ghost"
												size="icon"
												className="h-8 w-8"
												onClick={handleRefresh}
												disabled={isRefreshing || !address}
											>
												<RefreshCw
													className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
												/>
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p>Refresh Balance</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
								<FaucetButton className="!px-5" />
							</div>
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
