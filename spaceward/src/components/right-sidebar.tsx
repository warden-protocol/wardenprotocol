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

export function RightSidebar() {
	const location = useLocation();

	const { address } = useAddressContext();

	const { spaceAddress, setSpaceAddress } = useSpaceAddress();
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
			seed: spaceAddress,
			shape1Color: ["F5F5F5", "9747FF", "F15A24"],
			shape2Color: ["0000F5", "005156", "0A0A0A"],
			shape3Color: ["D8FF33", "FFAEEE", "8DE3E9"],
		}).toDataUriSync();
		setAvatar(avatarNew);
	}, [spaceAddress]);

	return (
		<div className="flex flex-row top-0 fixed right-0 mt-16 min-h-[calc(100vh-64px)] w-20">
			<div className="w-20 min-h-[calc(100vh-64px)] border-l px-4 py-6 flex flex-col gap-4 overflow-scroll no-scrollbar h-screen pb-20 justify-between bg-card"></div>
		</div>
	);
}
