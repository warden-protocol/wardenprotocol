import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaQuery } from "@uidotdev/usehooks";

export function Notifications() {
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");
	return (
		<Popover modal={true} open={open} onOpenChange={() => setOpen(!open)}>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className={
						"h-16 w-16 rounded-none border-0 hover:bg-transparent flex items-center place-content-center group"
					}
				>
					<div className="w-12 h-12 rounded-full border-2 border-card overflow-clip p-3 flex items-center place-content-center group-hover:ring-2 ring-foreground">
						<Bell className="h-[1.5rem] w-[1.3rem]" />
						<span className="sr-only">Notifications</span>
					</div>
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="bg-transparent w-screen rounded-none h-screen overflow-scroll no-scrollbar"
				side={isDesktop ? "left" : "bottom"}
				sideOffset={8}
			>
				<div
					className="inset-0 bg-card/40 backdrop-blur-md absolute"
					onClick={() => setOpen(false)}
				></div>
				<div className="p-3 md:p-6 pt-0 flex flex-col space-y-6 w-[450px] max-w-full bg-card fixed h-[calc(100vh-16px)] rounded-xl top-2 right-0">
					<span className="text-4xl font-display">Notifications</span>
					<span>No notifications</span>
				</div>
			</PopoverContent>
		</Popover>
	);
}
