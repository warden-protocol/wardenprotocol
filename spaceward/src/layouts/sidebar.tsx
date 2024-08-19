import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Icons as AssetIcons } from "@/components/ui/icons-assets";
import {
	AppWindow,
	ArrowLeftRight,
	Coins,
	Key,
	Grid2X2,
	FolderKey,
	User2Icon,
	HomeIcon,
	FileCheckIcon,
	CircleCheckBig,
	Layers3,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SpaceSelector } from "@/features/spaces";

const spaceNavItems = [
	{
		label: "Dashboard",
		icon: <HomeIcon strokeWidth={1} className="h-4 w-4 mr-4" />,
		url: "/",
	},
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
		label: "Rules",
		icon: <FileCheckIcon strokeWidth={1} className="h-4 w-4 mr-4" />,
		url: "/rules",
	},
];

const globalNavItems = [
	{
		label: "Staking",
		icon: <Layers3 strokeWidth={1} className="h-4 w-4 mr-4" />,
		url: "/staking",
	},
	{
		label: "Governance",
		icon: <CircleCheckBig strokeWidth={1} className="h-4 w-4 mr-4" />,
		url: "/governance",
	},
	{
		label: "Actions",
		icon: <ArrowLeftRight strokeWidth={1} className="h-4 w-4 mr-4" />,
		url: "/actions",
	},
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
];

export function InnerSidebar() {
	const location = useLocation();
	return (
		<div className="w-[calc(100%-16px)] md:w-60 xl:flex flex-col overflow-scroll no-scrollbar pb-20 bg-card m-2 rounded-xl">
			<div>
				<div className="overflow-hidden">
					<div className="my-6 mx-6 relative z-20">
						<a
							href="/"
							className="items-center justify-center flex"
						>
							<Icons.logo className="h-6 w-auto hidden md:block invert dark:invert-0" />
						</a>
					</div>
					<div className="px-2 relative z-10">
						<SpaceSelector />
					</div>
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
												? "bg-fill-quaternary"
												: "bg-transparent text-foreground",
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
				<Separator className="bg-border-quaternary" />

				<div className="flex flex-col space-y-1 py-2 px-2">
					<div className="px-4 h-12 flex items-center text-sm text-label-tertiary">
						Global
					</div>

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
									? "bg-fill-quaternary"
									: "bg-transparent text-foreground",
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
