import { useEffect, useState } from "react";
import { createAvatar } from "@dicebear/core";
import { shapes } from "@dicebear/collection";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAddressContext } from "@/hooks/useAddressContext";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { useSpaceId } from "@/hooks/useSpaceId";
import { Icons } from "@/components/ui/icons";
import {
	AppWindow,
	ArrowLeftRight,
	Cog,
	Coins,
	Key,
	Plus,
	Grid2X2,
	FolderKey,
	User2Icon,
	HomeIcon,
	HelpCircleIcon,
	OrbitIcon,
	FileCheckIcon,
	BookUserIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
// import AddressAvatar from "@/components/AddressAvatar";
import useWardenWardenV1Beta2 from "@/hooks/useWardenWardenV1Beta2";
import { useClient } from "@/hooks/useClient";
// import { monitorTx } from "@/hooks/keplr";
import { useToast } from "@/components/ui/use-toast";
import { SpaceSelector } from "@/features/spaces";

const spaceNavItems = [
	{
		label: "Dashboard",
		icon: <HomeIcon strokeWidth={1} className="h-4 w-4 mr-4" />,
		url: "/",
	},
	// {
	// 	label: "Spaces",
	// 	icon: <OrbitIcon strokeWidth={1} className="h-4 w-4 mr-4" />,
	// 	url: "/spaces",
	// },
	{
		label: "Keys",
		icon: <Key strokeWidth={1} className="h-4 w-4 mr-4" />,
		url: "/keys",
	},
	{
		label: "Assets",
		icon: <Coins strokeWidth={1} className="h-4 w-4 mr-4" />,
		url: "/assets",
	},
	{
		label: "Owners",
		icon: <User2Icon strokeWidth={1} className="h-4 w-4 mr-4" />,
		url: "/owners",
	},
	{
		label: "Intents",
		icon: <FileCheckIcon strokeWidth={1} className="h-4 w-4 mr-4" />,
		url: "/intents",
	},
];

const globalNavItems = [
	{
		label: "Actions",
		icon: <ArrowLeftRight strokeWidth={1} className="h-4 w-4 mr-4" />,
		url: "/actions",
	},
	// {
	// 	label: "Address Book",
	// 	icon: <BookUserIcon strokeWidth={1} className="h-4 w-4 mr-4" />,
	// 	url: "/address-book",
	// },
	{
		label: "Keychains",
		icon: <FolderKey strokeWidth={1} className="h-4 w-4 mr-4" />,
		url: "/keychains",
	},
	{
		label: "Explorer",
		icon: <Grid2X2 strokeWidth={1} className="h-4 w-4 mr-4" />,
		url: "/explorer",
	},
	{
		label: "dApps",
		icon: <AppWindow strokeWidth={1} className="h-4 w-4 mr-4" />,
		url: "/apps",
	},
	{
		label: "Settings",
		icon: <Cog strokeWidth={1} className="h-4 w-4 mr-4" />,
		url: "/settings",
	},
];

interface SpacesQueryResult {
	pageParam: number;
	pagination?:
		| { next_key?: string | undefined; total?: string | undefined }
		| undefined;
	spaces?:
		| {
				id?: string | undefined;
				creator?: string | undefined;
				owners?: string[] | undefined;
				admin_intent_id?: string | undefined;
				sign_intent_id?: string | undefined;
		  }[]
		| undefined;
}

export function Sidebar() {
	const location = useLocation();

	const { address } = useAddressContext();

	const { spaceId, setSpaceId } = useSpaceId();
	const [avatar, setAvatar] = useState<string>();

	const { QuerySpacesByOwner } = useWardenWardenV1Beta2();
	const { data: spacesQuery } = QuerySpacesByOwner(
		{ owner: address },
		{ enabled: !!address },
		100,
	);
	const count =
		((spacesQuery as any)?.pages[0] as SpacesQueryResult | undefined)
			?.spaces?.length || 0;

	const { toast } = useToast();
	const client = useClient();
	const sendMsgNewSpace = client.WardenWardenV1Beta2.tx.sendMsgNewSpace;

	useEffect(() => {
		if (spaceId) {
			const avatarNew = createAvatar(shapes, {
				size: 512,
				seed: spaceId,
				shape1Color: ["F5F5F5", "9747FF", "F15A24"],
				shape2Color: ["0000F5", "005156", "0A0A0A"],
				shape3Color: ["D8FF33", "FFAEEE", "8DE3E9"],
			}).toDataUriSync();
			setAvatar(avatarNew);
		}
	}, [spaceId]);

	return (
		<div className="md:flex flex-row sticky max-h-[calc(100vh-16px)] min-h-screen w-20 xl:w-60 hidden">
			{/* <div className="w-20 min-h-[calc(100vh-64px)] px-4 py-6 flex flex-col gap-4 overflow-scroll no-scrollbar h-screen pb-20 justify-between bg-card">
				<div className="flex flex-col gap-6 w-full">
					{count && count > 0 ? (
						<div className="flex flex-col gap-6 w-full">
							{(
								(spacesQuery as any)?.pages[0] as
									| SpacesQueryResult
									| undefined
							)?.spaces?.map((space) => (
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
			</div> */}
			<div className="w-60 xl:flex flex-col overflow-scroll no-scrollbar pb-20 hidden bg-card m-2 rounded-xl">
				<div>
					<div className="my-6 mx-6">
						<a href="/" className="items-center">
							<Icons.logo className="h-6 w-auto hidden md:block" />
							<Icons.icon className="h-8 ml-3 w-auto md:hidden block" />
						</a>
					</div>
					{/* <div
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
					</div> */}
					<div className="px-2">
						<SpaceSelector />
					</div>
					<div>
						<div className="space-y-4 py-2">
							<div className="px-2 py-0">
								<div className="space-y-1">
									{spaceNavItems.map((item) => (
										<Link
											to={item.url}
											key={item.url}
											className={cn(
												buttonVariants({
													variant: "ghost",
													size: "lg",
												}),
												location.pathname === item.url
													? "bg-background text-accent"
													: "bg-transparent text-muted-foreground",
												"w-full justify-start px-4 h-12 text-sm hover:bg-background hover:text-accent rounded-lg",
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
					<Separator className="bg-background" />
					<div className="flex flex-col space-y-1 py-2 px-2">
						{globalNavItems.map((item) => (
							<Link
								to={item.url}
								key={item.url}
								className={cn(
									buttonVariants({
										variant: "ghost",
										size: "lg",
									}),
									location.pathname === item.url
										? "bg-background text-accent"
										: "bg-transparent text-muted-foreground",
									"w-full justify-start px-4 h-12 text-sm hover:bg-background hover:text-accent rounded-lg",
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
