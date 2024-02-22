import { useEffect, useMemo, useState } from "react";
import { createAvatar } from "@dicebear/core";
import { shapes } from "@dicebear/collection";
import { useLocation } from "react-router-dom";

import { Link, Router } from "react-router-dom";
import { useAddressContext } from "@/def-hooks/useAddressContext";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { useSpaceAddress } from "@/hooks/useSpaceAddress";
// import Space from "./space";
import {
	AppWindow,
	ArrowLeftRight,
	ChevronsRight,
	Cog,
	Coins,
	CornerDownRight,
	PlusIcon,
	Key,
	Plus,
	Grid2X2,
	FolderKey,
	User2Icon,
	HomeIcon,
	HelpCircleIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
// import {
// 	Sheet,
// 	SheetContent,
// 	SheetHeader,
// 	SheetTitle,
// 	SheetTrigger,
// } from "@/components/ui/sheet";
import AddressAvatar from "./address-avatar";
import useWardenWarden from "@/hooks/useWardenWarden";
import { useClient } from "@/hooks/useClient";
import { monitorTx } from "@/hooks/keplr";
import { useToast } from "./ui/use-toast";

import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";

const spaceNavItems = [
	{
		label: "Home",
		icon: <HomeIcon className="h-4 w-4 mr-4" />,
		url: "/",
	},
	{
		label: "Keys",
		icon: <Key className="h-4 w-4 mr-4" />,
		url: "/keys",
	},
	{
		label: "Assets",
		icon: <Coins className="h-4 w-4 mr-4" />,
		url: "/assets",
	},
	{
		label: "Actions",
		icon: <ArrowLeftRight className="h-4 w-4 mr-4" />,
		url: "/actions",
	},
	{
		label: "Intents",
		icon: <CornerDownRight className="h-4 w-4 mr-4" />,
		url: "/intents",
	},
	{
		label: "Owners",
		icon: <User2Icon className="h-4 w-4 mr-4" />,
		url: "/owners",
	},
];

const globalNavItems = [
	{
		label: "Keychains",
		icon: <FolderKey className="h-4 w-4 mr-4" />,
		url: "/keychains",
	},
	{
		label: "Explorer",
		icon: <Grid2X2 className="h-4 w-4 mr-4" />,
		url: "/explorer",
	},
	{
		label: "Apps",
		icon: <AppWindow className="h-4 w-4 mr-4" />,
		url: "/apps",
	},
	{
		label: "Settings",
		icon: <Cog className="h-4 w-4 mr-4" />,
		url: "/settings",
	},
];

export function Sidebar() {
	const location = useLocation();

	const { address } = useAddressContext();

	const { spaceAddress, setSpaceAddress } = useSpaceAddress();
	const [avatar, setAvatar] = useState();

	const { QuerySpacesByOwner } = useWardenWarden();
	const { data: spacesQuery } = QuerySpacesByOwner(
		{ owner: address },
		{},
		10
	);
	const count =
		spacesQuery?.pages.length ||
		(0 > 0 && spacesQuery?.pages[0].spaces?.length) ||
		0;

	const { toast } = useToast();
	const client = useClient();
	const sendMsgNewSpace = client.WardenWarden.tx.sendMsgNewSpace;

	useEffect(() => {
		const avatarNew = createAvatar(shapes, {
			size: 512,
			seed: spaceAddress,
			shape1Color: ["F5F5F5", "9747FF", "F15A24"],
			shape2Color: ["0000F5", "005156", "0A0A0A"],
			shape3Color: ["D8FF33", "FFAEEE", "8DE3E9"],
		}).toDataUriSync();
		setAvatar(avatarNew);
	}, [spaceAddress]);

	return (
		<div className="flex flex-row fixed mt-16 min-h-[calc(100vh-64px)]">
			<div className="w-20 min-h-[calc(100vh-64px)] border-r px-4 py-6 flex flex-col gap-4 overflow-scroll h-screen pb-20 justify-between">
				<div className="flex flex-col gap-4 w-full">
					{count && count > 0 && (
						<div className="flex flex-col gap-4 w-full">
							{spacesQuery?.pages[0]?.spaces?.map((space) => (
								<HoverCard openDelay={0}>
									<HoverCardTrigger>
										<div
											className={cn(
												"ring-foreground rounded-full hover:ring-2 cursor-pointer w-12 h-12 flex items-center justify-center",
												spaceAddress === space.address
													? "ring-2 "
													: ""
											)}
											onClick={() =>
												setSpaceAddress(
													space.address || null
												)
											}
										>
											<AddressAvatar
												seed={space.address || ""}
												disableTooltip
											/>
										</div>
									</HoverCardTrigger>
									<HoverCardContent side={"right"}>
										<div className="flex flex-col gap-4">
											<span className="">
												{space.address.slice(0, 10) +
													"..." +
													space.address.slice(-10)}
											</span>
										</div>
									</HoverCardContent>
								</HoverCard>
							))}
						</div>
					)}
					<HoverCard openDelay={0}>
						<HoverCardTrigger>
							<div className="ring-foreground rounded-full hover:ring-2 cursor-pointer w-12 h-12 flex items-center justify-center">
								<button
									className="h-10 w-10 rounded-full bg-foreground flex flex-row items-center justify-center"
									onClick={() => {
										monitorTx(
											sendMsgNewSpace({
												value: {
													creator: address,
													signIntentId: 0,
													adminIntentId: 0,
													additionalOwners: [],
												},
											}),
											toast
										);
									}}
								>
									<Plus className="h-6 w-6 text-background" />
								</button>
							</div>
						</HoverCardTrigger>
						<HoverCardContent side={"right"}>
							<div className="flex flex-col gap-4">
								<span className="">Create a new space</span>
							</div>
						</HoverCardContent>
					</HoverCard>
				</div>
				<div className="flex place-content-center">
					<Link
						to="https://docs.wardenprotocol.org/learn/spaceward/spaceward-intro"
						target="_blank"
					>
						<Button
							variant="ghost"
							size="icon"
							className="h-6 w-6 rounded-full flex flex-row items-center hover:bg-transparent justify-center"
						>
							<HelpCircleIcon className="h-6 w-6 text-foreground" />
						</Button>
					</Link>
				</div>
			</div>
			<div className="w-60 border-r flex flex-col overflow-scroll h-screen pb-20">
				<div>
					<div className="flex flex-col md:gap-10 p-6 h-48 relative overflow-hidden justify-between">
						<div className="absolute inset-0 overflow-clip">
							<div className="absolute inset-0 bg-gradient-to-tr to-background/0 from-background/100 opacity-95"></div>
							<img className="object-fill" src={avatar}></img>
						</div>
						{/* space section with sheet and new transaction button */}
						<div></div>
						<div className="flex flex-row gap-4 items-center ">
							<div className="flex flex-col text-left text-sm mt-0 relative">
								<span className="text-lg font-semibold">
									Active Space
								</span>
								{spaceAddress ? (
									<span className="">
										{spaceAddress.slice(0, 10) +
											"..." +
											spaceAddress.slice(-10)}
									</span>
								) : (
									<span className="">None</span>
								)}
							</div>
							{/* <Button
								variant="default"
								size="icon"
								className="h-8 w-8 rounded-full absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-8"
							>
								<ChevronsRight className="h-10" />
								<span className="sr-only">Spaces</span>
							</Button> */}
							{/* <AccountInfo /> */}
							{/* <Sheet>
								<SheetTrigger asChild>
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
												<h2 className="text-3xl">
													Spaces
												</h2>
												<div>
													<Button
														variant="outline"
														onClick={() => {
															monitorTx(
																sendMsgNewSpace(
																	{
																		value: {
																			creator:
																				address,
																			signIntentId: 0,
																			adminIntentId: 0,
																			additionalOwners:
																				[],
																		},
																	}
																),
																toast
															);
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
												{count && count > 0 && (
													<div className="flex flex-col mt-6 gap-4 w-full">
														{spacesQuery?.pages[0]?.spaces?.map(
															(space) => (
																<Space
																	key={
																		space.address
																	}
																	space={
																		space
																	}
																/>
															)
														)}
													</div>
												)}
											</div>
										</div>
									</SheetHeader>
								</SheetContent>
							</Sheet> */}
						</div>
						{/* <div className="relative">
							<Link
								to="/new-transaction"
								className={cn(
									buttonVariants({
										variant: "default",
										size: "default",
									}),
									"w-full font-semibold text-sm uppercase text-muted"
								)}
							>
								New Transaction
							</Link>
						</div> */}
					</div>

					{/* <Separator /> */}
					<div>
						<div className="space-y-4 py-2">
							<div className="px-0 py-0">
								<div className="space-y-1">
									{spaceNavItems.map((item) => (
										<Link
											to={item.url}
											className={cn(
												buttonVariants({
													variant: "ghost",
													size: "lg",
												}),
												location.pathname === item.url
													? "border-l-accent border-l-[3px]"
													: "border-l-transparent",
												"w-full justify-start rounded-none hover:bg-muted  hover:border-l-accent border-l-[3px]"
											)}
										>
											{item.icon}
											{item.label}
										</Link>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div>
					<Separator />
					<div className="flex flex-col space-y-1 py-2">
						{globalNavItems.map((item) => (
							<Link
								to={item.url}
								className={cn(
									buttonVariants({
										variant: "ghost",
										size: "lg",
									}),
									location.pathname === item.url
										? "border-l-accent border-l-[3px]"
										: "border-l-transparent",
									"w-full justify-start rounded-none hover:bg-muted hover:border-l-accent border-l-[3px]"
								)}
							>
								{item.icon}
								{item.label}
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
