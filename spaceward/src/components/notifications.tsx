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
					className="h-16 w-16 rounded-none border-l hover:bg-muted hover:border-b-accent hover:border-b-2"
				>
					<Bell className="h-[1.5rem] w-[1.3rem]" />
					<span className="sr-only">Notifications</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80 rounded-t-none border-t-0 -translate-y-1 bg-card">
				<div>
					<span>Notifications coming soon</span>
				</div>
			</PopoverContent>
		</Popover>
	);
}
