"use client";

import { Button } from "@/components/ui/button";
import { Bell, Ghost } from "lucide-react";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

export function Notifications() {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="h-16 w-16 rounded-none border-l"
				>
					<Bell className="h-[1.5rem] w-[1.3rem]" />
					<span className="sr-only">Notifications</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80 p-0">
				<Card className="border-0 !p-0">
					<CardHeader>
						<CardTitle>Notifications</CardTitle>
					</CardHeader>
					<Separator className="mb-4" />
					<CardContent>
						<div>
							<span>No notifications</span>
						</div>
					</CardContent>
				</Card>
			</PopoverContent>
		</Popover>
	);
}
