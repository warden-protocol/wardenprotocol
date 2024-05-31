import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Icons as AssetIcons } from "@/components/ui/icons-assets";
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
		label: "Staking",
		icon: <AssetIcons.staking strokeWidth={1} className="h-4 w-4 mr-2" />,
		url: "/staking",
	},
	{
		label: "Governance",
		icon: (
			<AssetIcons.governance strokeWidth={1} className="h-4 w-4 mr-2" />
		),
		url: "/governance",
	},
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
	// {
	// 	label: "Settings",
	// 	icon: <Cog strokeWidth={1} className="h-4 w-4 mr-4" />,
	// 	url: "/settings",
	// },
];

export function InnerSidebar() {
	const location = useLocation();
	return (
		<div className="w-[calc(100%-16px)] md:w-60 xl:flex flex-col overflow-scroll no-scrollbar pb-20 bg-card m-2 rounded-xl">
			<div>
				<div className="my-6 mx-6">
					<a href="/" className="items-center">
						<Icons.logo className="h-6 w-auto hidden md:block" />
						{/* <Icons.icon className="h-8 ml-3 w-auto md:hidden block" /> */}
					</a>
				</div>
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
	);
}

export function Sidebar() {
	return (
		<div className="md:flex flex-row sticky max-h-[calc(100vh-16px)] min-h-screen w-60 hidden">
			<InnerSidebar />
		</div>
	);
}
