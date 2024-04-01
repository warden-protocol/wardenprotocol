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
import useWardenWardenV1Beta2 from "@/hooks/useWardenWardenV1Beta2";
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
		label: "Owners",
		icon: <User2Icon className="h-4 w-4 mr-4" />,
		url: "/owners",
	},
	{
		label: "Intents",
		icon: (
			<svg
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="h-4 w-4 mr-4"
			>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M3.5267 1.86019C3.9174 1.46949 4.4473 1.25 4.99984 1.25H12.0832C12.1937 1.25 12.2997 1.2939 12.3778 1.37204L16.9611 5.95537C17.0393 6.03351 17.0832 6.13949 17.0832 6.25V16.6667C17.0832 17.2192 16.8637 17.7491 16.473 18.1398C16.0823 18.5305 15.5524 18.75 14.9998 18.75H4.99984C4.4473 18.75 3.9174 18.5305 3.5267 18.1398C3.136 17.7491 2.9165 17.2192 2.9165 16.6667V3.33333C2.9165 2.7808 3.136 2.25089 3.5267 1.86019ZM4.99984 2.08333C4.66832 2.08333 4.35037 2.21503 4.11595 2.44945C3.88153 2.68387 3.74984 3.00181 3.74984 3.33333V16.6667C3.74984 16.9982 3.88153 17.3161 4.11595 17.5505C4.35037 17.785 4.66832 17.9167 4.99984 17.9167H14.9998C15.3314 17.9167 15.6493 17.785 15.8837 17.5505C16.1181 17.3161 16.2498 16.9982 16.2498 16.6667V6.42259L11.9106 2.08333H4.99984Z"
					fill="white"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M11.6665 1.25C11.8966 1.25 12.0832 1.43655 12.0832 1.66667V6.25H16.6665C16.8966 6.25 17.0832 6.43655 17.0832 6.66667C17.0832 6.89679 16.8966 7.08333 16.6665 7.08333H11.6665C11.4364 7.08333 11.2498 6.89679 11.2498 6.66667V1.66667C11.2498 1.43655 11.4364 1.25 11.6665 1.25Z"
					fill="white"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M12.7945 10.5387C12.9572 10.7014 12.9572 10.9652 12.7945 11.128L9.46113 14.4613C9.29841 14.624 9.03459 14.624 8.87188 14.4613L7.20521 12.7946C7.04249 12.6319 7.04249 12.3681 7.20521 12.2054C7.36793 12.0427 7.63175 12.0427 7.79447 12.2054L9.1665 13.5774L12.2052 10.5387C12.3679 10.376 12.6317 10.376 12.7945 10.5387Z"
					fill="white"
				/>
			</svg>
		),
		url: "/intents",
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

	const { QuerySpacesByOwner } = useWardenWardenV1Beta2();
	const { data: spacesQuery } = QuerySpacesByOwner(
		{ owner: address },
		{ enabled: !!address },
		100,
	);
	const count = spacesQuery?.pages[0].spaces?.length || 0;

	const { toast } = useToast();
	const client = useClient();
	const sendMsgNewSpace = client.WardenWardenV1Beta2.tx.sendMsgNewSpace;

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
		<div className="md:flex flex-row fixed mt-16 min-h-[calc(100vh-64px)] w-20 xl:w-80 hidden">
			<div className="w-20 min-h-[calc(100vh-64px)] px-4 py-6 flex flex-col gap-4 overflow-scroll no-scrollbar h-screen pb-20 justify-between bg-card">
				<div className="flex flex-col gap-6 w-full">
					{count && count > 0 ? (
						<div className="flex flex-col gap-6 w-full">
							{spacesQuery?.pages[0]?.spaces?.map((space) => (
								<HoverCard openDelay={0}>
									<HoverCardTrigger>
										<div
											className={cn(
												"ring-foreground rounded-full hover:ring-2 cursor-pointer w-12 h-12 flex items-center justify-center",
												spaceId === space.id
													? "ring-2 "
													: "",
											)}
											onClick={() =>
												setSpaceId(space.id || null)
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
											<span className="">{space.id}</span>
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
											toast,
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
			<div className="w-60 border-r xl:flex flex-col overflow-scroll no-scrollbar h-screen pb-20 hidden">
				<div>
					<div
						className={cn(
							"flex flex-col md:gap-10 p-6 h-48 relative overflow-hidden justify-between",
							!spaceId && "border-b",
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
										<span className="">{spaceId}</span>
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
												"w-full justify-start rounded-none hover:bg-muted  hover:border-l-accent border-l-[3px]",
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
									"w-full justify-start rounded-none hover:bg-muted hover:border-l-accent border-l-[3px]",
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
