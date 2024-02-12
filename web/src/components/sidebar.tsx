import * as React from "react";
// import Link from "next/link";
import { Link } from "react-router-dom";

import { useKeplrAddress } from "../keplr";

// import { NavItem } from "@/types/nav";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
// import FaucetButton from "./faucet-button";
// import KeychainAddress from "./keychain_address";
import useSpaceAddress from "@/hooks/useSpaceAddress";
import { spacesByOwner } from "../client/identity";

import Space from "./space";
import { MsgNewSpace } from "../proto/wardenprotocol/identity/tx_pb";

import { useBroadcaster } from "@/hooks/keplr";

// import { keychains } from "@/client/identity";
import { spaces } from "@/client/identity";
import { useQuery } from "@tanstack/react-query";
// import {
// 	Card,
// 	CardContent,
// 	CardFooter,
// 	CardHeader,
// 	CardTitle,
// } from "../components/ui/card";
// import CardRow from "@/components/card-row";
// import NewKeychainButton from "@/components/new-keychain-button";
// import Address from "@/components/address";
// import ChooseKeychainButton from "@/components/choose-keychain-button";

import {
	AppWindow,
	ArrowLeftRight,
	ChevronsRight,
	Cog,
	Coins,
	CornerDownRight,
	Home,
	PlusIcon,
	Key,
	Plus,
	Tv2,
	Grid2X2,
	FolderKey,
} from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { Separator } from "@/components/ui/separator";

import {
	Sheet,
	SheetContent,
	// SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
// import { Badge } from "./ui/badge";

// import AccountInfo from "@/components/account-info";

// interface MainNavProps {
// 	items?: NavItem[];
// }

import AddressAvatar from "./address-avatar";

export function Sidebar() {
	const { broadcast } = useBroadcaster();
	const addr = useKeplrAddress();

	const [spaceAddress, _] = useSpaceAddress();

	const wsQuery = useQuery({
		queryKey: ["spaces", "owner", addr],
		queryFn: () => spacesByOwner(addr),
	});
	const count = wsQuery.data?.spaces.length;

	return (
		<div className="space-y-4 py-4 fixed mt-16 min-h-[calc(100vh-64px)] w-72 border-r flex flex-col">
			<div>
				<div className="flex flex-col gap-6 md:gap-10 px-4 pb-4">
					{/* workspace section with sheet and new transaction button */}
					<div className="py-2 flex flex-row gap-4 items-center relative">
						{spaceAddress ? (
							<AddressAvatar seed={spaceAddress} />
						) : (
							[]
						)}
						<div className="flex flex-col text-left text-sm mt-0">
							<span className="font-display">Active Space</span>
							{spaceAddress ? (
								<span className="">
									{spaceAddress.slice(0, 8) +
										"..." +
										spaceAddress.slice(-8)}
								</span>
							) : (
								<span className="">None</span>
							)}
						</div>
						<Button
							variant="default"
							size="icon"
							className="h-8 w-8 rounded-full absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-8"
						>
							<ChevronsRight className="h-10" />
							<span className="sr-only">Spaces</span>
						</Button>
						{/* <AccountInfo /> */}
						<Sheet>
							<SheetTrigger>
								<Button
									variant="default"
									size="icon"
									className="h-8 w-8 rounded-full absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-8"
								>
									<ChevronsRight className="h-10" />
									<span className="sr-only">Spaces</span>
								</Button>
							</SheetTrigger>
							<SheetContent
								side="left"
								className="!w-[600px] !max-w-[600px] mt-16 overflow-scroll"
							>
								<SheetHeader className="mt-12">
									<SheetTitle>
										<div className="flex justify-between items-center w-full">
											<h2 className="text-3xl">Spaces</h2>
											<div>
												<Button
													variant="outline"
													onClick={() => {
														broadcast([
															new MsgNewSpace({
																creator: addr,
															}),
														]);
													}}
												>
													<Plus className="mr-2 h-4 w-4" />
													New
												</Button>
											</div>
										</div>
									</SheetTitle>
									<div className="">
										<div className="flex items-center justify-center">
											{count && count > 0 ? (
												<div className="flex flex-col mt-6 gap-4 w-full">
													{wsQuery.data?.spaces.map(
														(space) => (
															<Space
																key={
																	space.address
																}
																space={space}
															/>
														)
													)}
												</div>
											) : (
												<div className="text-center">
													<h3 className="mt-2 text-3xl text-gray-900">
														No spaces
													</h3>
													<p className="mt-1 text-gray-500">
														Get started by creating
														a new space.
													</p>
													<div className="mt-6">
														<Button
															type="button"
															onClick={() => {
																broadcast([
																	new MsgNewSpace(
																		{
																			creator:
																				addr,
																		}
																	),
																]);
															}}
														>
															<PlusIcon
																className="-ml-0.5 mr-1.5 h-5 w-5"
																aria-hidden="true"
															/>
															New Space
														</Button>
													</div>
												</div>
											)}
										</div>
									</div>
								</SheetHeader>
							</SheetContent>
						</Sheet>
					</div>
				</div>
				<div className="px-4 pb-4">
					<Link
						to="/new-transaction"
						className={cn(
							buttonVariants({
								variant: "default",
								size: "sm",
							}),
							"w-full"
						)}
					>
						New Transaction
					</Link>
				</div>
				<Separator />
				<div>
					<div className="space-y-4 py-4">
						<div className="px-3 py-2">
							<div className="space-y-1">
								{/* <Link
								to="/"
								className={cn(
									buttonVariants({
										variant: "ghost",
										size: "lg",
									}),
									"w-full justify-start"
								)}
							>
								<Home className="mr-4 h-4 w-4" />
								Home
							</Link> */}
								{/* <Link
								to="/"
								className={cn(
									buttonVariants({
										variant: "ghost",
										size: "lg",
									}),
									"w-full justify-start"
								)}
							>
								<Tv2 className="mr-4 h-4 w-4" />
								Spaces
							</Link> */}
								<Link
									to="/keys"
									className={cn(
										buttonVariants({
											variant: "ghost",
											size: "lg",
										}),
										"w-full justify-start"
									)}
								>
									<Key className="mr-4 h-4 w-4" />
									Keys
								</Link>
								<Link
									to="/assets"
									className={cn(
										buttonVariants({
											variant: "ghost",
											size: "lg",
										}),
										"w-full justify-start"
									)}
								>
									<Coins className="mr-4 h-4 w-4" />
									Assets
								</Link>
								<Link
									to="/actions"
									className={cn(
										buttonVariants({
											variant: "ghost",
											size: "lg",
										}),
										"w-full justify-start"
									)}
								>
									<ArrowLeftRight className="mr-4 h-4 w-4" />
									Actions
								</Link>
								<Link
									to="/intents"
									className={cn(
										buttonVariants({
											variant: "ghost",
											size: "lg",
										}),
										"w-full justify-start"
									)}
								>
									<CornerDownRight className="mr-4 h-4 w-4" />
									Intents
								</Link>
								<Link
									to="/walletconnect"
									className={cn(
										buttonVariants({
											variant: "ghost",
											size: "lg",
										}),
										"w-full justify-start"
									)}
								>
									{/* <AppWindow className="mr-4 h-4 w-4" /> */}
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4 mr-4"
										focusable="false"
										aria-hidden="true"
									>
										<path
											d="M6.09442 8.34459C9.35599 5.21847 14.644 5.21847 17.9056 8.34459L18.2981 8.72082C18.4612 8.87713 18.4612 9.13055 18.2981 9.28686L16.9554 10.5739C16.8738 10.652 16.7416 10.652 16.6601 10.5739L16.1199 10.0561C13.8445 7.87528 10.1555 7.87528 7.88012 10.0561L7.30164 10.6106C7.2201 10.6887 7.0879 10.6887 7.00636 10.6106L5.66357 9.32358C5.50049 9.16727 5.50049 8.91385 5.66357 8.75754L6.09442 8.34459ZM20.6826 11.0063L21.8777 12.1517C22.0408 12.308 22.0408 12.5615 21.8777 12.7178L16.489 17.8828C16.3259 18.0391 16.0615 18.0391 15.8984 17.8828C15.8984 17.8828 15.8984 17.8828 15.8984 17.8828L12.0739 14.217C12.0331 14.1779 11.967 14.1779 11.9262 14.217C11.9262 14.217 11.9262 14.217 11.9262 14.217L8.10172 17.8828C7.93865 18.0391 7.67424 18.0391 7.51116 17.8828C7.51116 17.8828 7.51117 17.8828 7.51116 17.8828L2.12231 12.7177C1.95923 12.5614 1.95923 12.308 2.12231 12.1517L3.31739 11.0062C3.48047 10.8499 3.74487 10.8499 3.90795 11.0062L7.73258 14.672C7.77335 14.7111 7.83945 14.7111 7.88022 14.672C7.88022 14.672 7.88022 14.672 7.88022 14.672L11.7047 11.0062C11.8677 10.8499 12.1321 10.8499 12.2952 11.0062C12.2952 11.0062 12.2952 11.0062 12.2952 11.0062L16.1198 14.672C16.1606 14.7111 16.2267 14.7111 16.2675 14.672L20.0921 11.0063C20.2551 10.85 20.5195 10.85 20.6826 11.0063Z"
											fill="currentColor"
										></path>
									</svg>
									WalletConnect
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div>
				<Separator />
				<div className="flex flex-col space-y-1 px-3 py-2">
					<Link
						to="/keychains"
						className={cn(
							buttonVariants({
								variant: "ghost",
								size: "lg",
							}),
							"w-full justify-start"
						)}
					>
						<FolderKey className="mr-4 h-4 w-4" />
						Keychains
					</Link>
					<Link
						to="/explorer"
						className={cn(
							buttonVariants({
								variant: "ghost",
								size: "lg",
							}),
							"w-full justify-start"
						)}
					>
						<Grid2X2 className="mr-4 h-4 w-4" />
						Explorer
					</Link>
					<Link
						to="/apps"
						className={cn(
							buttonVariants({
								variant: "ghost",
								size: "lg",
							}),
							"w-full justify-start"
						)}
					>
						<AppWindow className="mr-4 h-4 w-4" />
						Apps
					</Link>
					<Link
						to="/settings"
						className={cn(
							buttonVariants({
								variant: "ghost",
								size: "lg",
							}),
							"w-full justify-start"
						)}
					>
						<Cog className="mr-4 h-4 w-4" />
						Settings
					</Link>
				</div>
			</div>
		</div>
	);
}
