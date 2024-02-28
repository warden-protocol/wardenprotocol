import useWardenWarden from "@/hooks/useWardenWarden";
import { Skeleton } from "@/components/ui/skeleton";
import AddressAvatar from "@/components/address-avatar";
import { WalletType } from "wardenprotocol-warden-client-ts/lib/warden.warden/rest";
import { ethers } from "ethers";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { useCurrency } from "@/hooks/useCurrency";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { MoveDownLeft, MoveUpRight, Copy } from "lucide-react";
import { Link } from "react-router-dom";

const url = "https://rpc2.sepolia.org";
const provider = new ethers.JsonRpcProvider(url);

const USDollar = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});
const Euro = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "EUR",
});
const GBP = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "GBP",
});

async function getEthBalance(address: string) {
	const balance = await provider.getBalance(address);
	return balance;
}

function Assets({ spaceAddr }: { spaceAddr: string }) {
	const { currency } = useCurrency();
	const { QueryKeys } = useWardenWarden();
	const query = QueryKeys(
		{
			type: WalletType.WALLET_TYPE_ETH,
			space_addr: spaceAddr,
		},
		{},
		10
	);

	if (query.status === "loading") {
		return <div>Loading...</div>;
	}

	return (
		<>
			{query.data?.pages.flatMap((page) =>
				page.keys?.map((key) => {
					return (
						<div className="flex flex-col flex-1 h-full border rounded-lg bg-card">
							<div className="flex flex-row justify-between px-4 py-4 border-b">
								<div className="flex flex-row items-center gap-4">
									<AddressAvatar seed={key.key.public_key} />
									<span className="font-sans flex flex-col">
										<span className="text-muted-foreground text-sm">
											Key
										</span>
										<span>
											{key.key.public_key.slice(0, 8) +
												"..." +
												key.key.public_key.slice(-8)}
										</span>
									</span>
								</div>
								<div className="flex flex-row mr-10">
									<Avatar className="bg-white p-2 border">
										<AvatarImage
											src="/logos/ethereum.svg "
											alt="Ethereum"
										/>
									</Avatar>
								</div>
							</div>
							<div>
								<Accordion
									type="single"
									collapsible
									className="space-y-3"
								>
									{key.wallets?.map((wallet) => {
										return (
											<Address address={wallet.address} />
										);
									})}
								</Accordion>
							</div>
						</div>
					);
				})
			)}
		</>
	);
}

function Address(address) {
	return (
		<AccordionItem
			value={`item-${address.address.toString()}`}
			className="border-0"
		>
			<AccordionTrigger className="py-1 hover:no-underline border-0 font-normal font-sans hover:bg-background p-4">
				<div className="flex flex-row justify-between w-full mr-4">
					<div className="flex flex-row items-center gap-4">
						<AddressAvatar seed={address.address} />
						<div className="font-sans flex flex-col text-left">
							<span className="text-muted-foreground text-xs">
								Wallet Address
							</span>
							<div className="flex flex-row gap-2 items-center">
								<span>
									{address.address.slice(0, 8) +
										"..." +
										address.address.slice(-8)}
								</span>
								<Copy
									className="h-4 w-4"
									onClick={
										((e) => e.preventDefault(),
										navigator.clipboard.writeText(
											address.address
										))
									}
								/>
							</div>
						</div>
					</div>
					<div className="flex flex-col">
						<div className="text-left">
							<span className="text-xs text-muted-foreground">
								Tokens
							</span>
						</div>
						<div className="flex flex-row">
							<div className="bg-white rounded-full w-6 h-6 overflow-clip p-1 flex items-center place-content-center z-20 border-2 border-card">
								<img
									src="/logos/sepolia.png"
									alt="Sepolia"
									className="w-auto h-4"
								/>
							</div>
							<div className="bg-border rounded-full w-6 h-6 overflow-clip p-1 flex items-center place-content-center -ml-2 z-10 border-2 border-card"></div>
							<div className="bg-border rounded-full w-6 h-6 overflow-clip p-1 flex items-center place-content-center -ml-2 z-0 border-2 border-card"></div>
						</div>
					</div>
					<div>
						<div className="text-left">
							<span className="text-xs text-muted-foreground">
								Total Value
							</span>
						</div>
						<div className="text-left">
							<span className="text-sm">$XX.XX</span>
						</div>
					</div>
					<div className="flex flex-row">
						<Button
							size="sm"
							variant="outline"
							className="font-sans text-sm font-normal border-2 border-foreground gap-2"
							onClick={(e) => e.preventDefault()}
						>
							<MoveDownLeft className="h-4 w-4" />
							Receive
						</Button>
					</div>
				</div>
			</AccordionTrigger>
			<AccordionContent>
				<div className="space-y-4">
					<Sepolia address={address.address} />
				</div>
			</AccordionContent>
		</AccordionItem>
	);
}

function Sepolia(address) {
	const { currency } = useCurrency();
	const query = useQuery({
		queryKey: ["eth-balance", address.address],
		queryFn: () => getEthBalance(address.address || "0"),
	});

	if (query.status === "loading") {
		return (
			<div className="flex flex-row justify-between px-6 py-4 border-t">
				<div className="flex flex-row gap-4 items-center min-w-72">
					<Skeleton className="h-10 w-10 rounded-full" />
					<Skeleton className="h-4 w-[200px]" />
				</div>
				<div className="flex flex-row gap-4 items-center text-right">
					<Skeleton className="h-4 w-[150px]" />
				</div>
				<div className="flex flex-row gap-4 items-center text-right">
					<Skeleton className="h-4 w-[150px]" />
				</div>
				<div className="flex flex-row gap-4 items-center w-20">
					<Skeleton className="h-4 w-[50px]" />
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-row justify-between pt-4 border-t px-4">
			<div className="flex flex-row gap-4 items-center min-w-72">
				<div className="bg-white rounded-full w-10 h-10 overflow-clip p-1 flex items-center place-content-center">
					<img
						src="/logos/sepolia.png"
						alt="Sepolia"
						className="w-auto h-8"
					/>
				</div>
				<span>Sepolia Ether</span>
			</div>
			<div className="flex flex-row gap-4 items-center text-right">
				{ethers.formatEther(query?.data || 0)} ETH
			</div>
			<div className="flex flex-row gap-4 items-center text-right">
				{currency === "usd" &&
					USDollar.format(
						ethers.formatEther(query?.data || 0) * 2940
					)}
				{currency === "eur" &&
					Euro.format(ethers.formatEther(query?.data || 0) * 2756)}
				{currency === "gbp" &&
					GBP.format(ethers.formatEther(query?.data || 0) * 2358)}
			</div>
			<div className="flex flex-row gap-4 items-center w-20 mr-10">
				<Link to={`/new-transaction?address=${address.address}`}>
					<Button size="sm" variant="default" className="gap-2">
						<MoveUpRight className="h-4 w-4" />
						Send
					</Button>
				</Link>
			</div>
		</div>
	);
}

export default Assets;
