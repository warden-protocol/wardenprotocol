import { useEffect, useMemo, useState } from "react";
import { createAvatar } from "@dicebear/core";
import { shapes } from "@dicebear/collection";
import { useLocation } from "react-router-dom";

import { Link, Router } from "react-router-dom";
import { useAddressContext } from "@/def-hooks/useAddressContext";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { useSpaceId } from "@/hooks/useSpaceId";
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
	Copy,
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
import { generate, count } from "random-words";

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
		label: "Actions",
		icon: <ArrowLeftRight className="h-4 w-4 mr-4" />,
		url: "/actions",
	},
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
		label: "dApps",
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

	const { spaceId, setSpaceId } = useSpaceId();
	const [avatar, setAvatar] = useState();

	const { QuerySpacesByOwner } = useWardenWarden();
	const { data: spacesQuery } = QuerySpacesByOwner(
		{ owner: address },
		{},
		100
	);
	const count = spacesQuery?.pages[0].spaces?.length || 0;

	const { toast } = useToast();
	const client = useClient();
	const sendMsgNewSpace = client.WardenWarden.tx.sendMsgNewSpace;

	useEffect(() => {
		const avatarNew = createAvatar(shapes, {
			size: 512,
			seed: spaceId,
			shape1Color: ["F5F5F5", "9747FF", "F15A24"],
			shape2Color: ["0000F5", "005156", "0A0A0A"],
			shape3Color: ["D8FF33", "FFAEEE", "8DE3E9"],
		}).toDataUriSync();
		setAvatar(avatarNew);
	}, [spaceId]);

	return (
		<div className="flex flex-row fixed mt-16 min-h-[calc(100vh-64px)] w-80 bg-card">
			<div className="w-20 min-h-[calc(100vh-64px)] border-r px-4 py-6 flex flex-col gap-4 overflow-scroll no-scrollbar h-screen pb-20 justify-between">
				<div className="flex flex-col gap-4 w-full">
					{count && count > 0 ? (
						<div className="flex flex-col gap-4 w-full">
							{spacesQuery?.pages[0]?.spaces?.map((space) => (
								<HoverCard openDelay={0}>
									<HoverCardTrigger>
										<div
											className={cn(
												"ring-foreground rounded-full hover:ring-2 cursor-pointer w-12 h-12 flex items-center justify-center",
												spaceId === space.id
													? "ring-2 "
													: ""
											)}
											onClick={() =>
												setSpaceId(
													space.id || null
												)
											}
										>
											<AddressAvatar
												seed={space.id || ""}
												disableTooltip
											/>
										</div>
									</HoverCardTrigger>
									<HoverCardContent side={"right"}>
										<div className="flex flex-col gap-4">
											<span className="">
												{space.id}
											</span>
										</div>
									</HoverCardContent>
								</HoverCard>
							))}
						</div>
					) : null}
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
			<div className="w-60 border-r flex flex-col overflow-scroll no-scrollbar h-screen pb-20">
				<div>
					<div
						className={cn(
							"flex flex-col md:gap-10 p-6 h-48 relative overflow-hidden justify-between",
							!spaceId && "border-b"
						)}
					>
						{spaceId ? (
							<div className="absolute inset-0 overflow-clip">
								<div className="absolute inset-0 bg-gradient-to-tr to-background/0 from-background/100 opacity-95"></div>
								<img className="object-fill" src={avatar}></img>
							</div>
						) : null}
						<div></div>
						<div className="flex flex-row gap-4 items-center">
							<div className="flex flex-col text-left text-sm mt-0 relative">
								<span className="text-lg font-semibold">
									Active Space
								</span>
								{spaceId ? (
									<div className="flex flex-row space-x-2">
										<span className="">
											Space {spaceId}
										</span>
									</div>
								) : (
									<span className="">None</span>
								)}
							</div>
						</div>
					</div>
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
