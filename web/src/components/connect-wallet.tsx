"use client";

// import * as React from "react";

import { useKeplrAddress } from "../keplr";
// import useKeychainAddress from "@/hooks/useKeychainAddress";
import { useQuery } from "@tanstack/react-query";
import { balances } from "../client/bank";
import FaucetButton from "./faucet-button";

import { Button } from "@/components/ui/button";
import { AlertCircle, ChevronsUpDown, Copy } from "lucide-react";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

// import {
// 	Card,
// 	CardContent,
// 	CardDescription,
// 	CardFooter,
// 	CardHeader,
// 	CardTitle,
// } from "@/components/ui/card";

// import { Avatar, AvatarImage } from "@/components/ui/avatar";
import AddressAvatar from "./address-avatar";

export function ConnectWallet() {
	const addr = useKeplrAddress();
	// const [keychainAddress, _] = useKeychainAddress();
	const bq = useQuery({
		queryKey: ["balances", addr],
		queryFn: () => balances(addr),
	});
	const nward =
		bq.data?.balances.find((b) => b.denom === "nward")?.amount || "0";
	const ward = parseInt(nward) / 10 ** 9;

	return (
		<Popover>
			<PopoverTrigger asChild>
				{addr ? (
					<Button
						variant="outline"
						role="combobox"
						className="justify-between h-16 border-t-0 border-b-0 rounded-none gap-4 min-w-0"
					>
						<AddressAvatar seed={addr} />
						<div className="flex flex-col text-left text-xs">
							<span className="block text-sm truncate">
								{addr.slice(0, 8) + "..." + addr.slice(-8)}
							</span>
							<span className="block text-sm truncate">
								{ward.toFixed(2)} WARD
							</span>
						</div>
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				) : (
					<Button
						variant="outline"
						role="combobox"
						className="justify-between h-16 border-t-0 border-b-0 rounded-none gap-4"
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

			<PopoverContent className="w-80">
				{addr ? (
					<div className="grid gap-4">
						<div className="flex flex-row text-left text-xs gap-2 justify-between items-center">
							<span className="block text-base">
								{addr.slice(0, 12) + "..." + addr.slice(-12)}
							</span>
							<span>
								<Copy className="h-4 w-4" />
							</span>
						</div>
						<div className="border rounded-lg">
							<div className="px-6 py-3 text-sm border-b flex justify-between">
								<span>Wallet</span>
								<span>Keplr</span>
							</div>
							<div className="px-6 py-3 text-sm flex justify-between">
								<span>Balance</span>
								<span>{ward.toFixed(2)} WARD</span>
							</div>
						</div>
						<div className="flex flex-grow">
							<FaucetButton />
						</div>
					</div>
				) : (
					<div className="grid gap-4">
						<div>
							<AlertCircle className="h-24 w-24 mx-auto shrink-0" />
						</div>
						<div>
							<Button
								onClick={() => window.location.reload()}
								size="lg"
								className="mx-auto w-full"
							>
								Connect Wallet
							</Button>
						</div>
					</div>
				)}
			</PopoverContent>
		</Popover>
	);
}
