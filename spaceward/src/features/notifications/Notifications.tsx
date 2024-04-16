"use client";

import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import { Separator } from "@/components/ui/separator";

export function Notifications() {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className={
						"h-20 w-20 rounded-none border-0 hover:bg-transparent flex items-center place-content-center group"
					}
				>
					<div className="m-2 w-12 h-12 rounded-full border-2 border-card overflow-clip p-3 flex items-center place-content-center group-hover:ring-2 ring-foreground">
						<Bell className="h-[1.5rem] w-[1.3rem]" />
						<span className="sr-only">Notifications</span>
					</div>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-96 bg-card" side="left">
				<div>
					<span>Notifications coming soon</span>
				</div>
			</PopoverContent>
		</Popover>
	);
}
