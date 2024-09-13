import clsx from "clsx";
import * as Popover from "@radix-ui/react-popover";

import "./animate.css";
import { QueuedActionStatus, useActionsState } from "./hooks";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ApproveSidebar() {
	const [open, setOpen] = useState(true);
	const { data } = useActionsState();
	const storeIds = Object.keys(data ?? {});

	const filtered = storeIds.filter((id) => {
		const action = data?.[id];
		return (
			action &&
			action.status !== QueuedActionStatus.Failed &&
			action.status !== QueuedActionStatus.Success
		);
	});

	const total = filtered.length;
	const hidden = false;// !total;
	const first = data?.[filtered[0]];


	return (
		<div
			className={clsx(
				"flex flex-col mx-2 p-3 rounded-lg bg-fill-quaternary relative select-none",
				{
					hidden,
					"border-progress": !hidden,
				},
			)}
		>
			<div>
				<Popover.Root open={open} modal={true}
					onOpenChange={() => setOpen(v => !v)}
				>
					<div
						className={clsx("flex flex-col")}
					>
						<div className="flex items-center">
							<p className="text-lg font-semibold">___---___</p>
						</div>

						<p className="text-sm text-gray-500 mb-2">
							Awaiting your approval
						</p>
						{/* progress bar */}
						<Popover.Trigger asChild>
							<Button
								className={clsx(
									"flex items-center rounded-lg justify-center gap-2 h-10 font-semibold w-full duration-200 hover:text-background z-10",
									{
										"hover:bg-fill-accent-primary hover:text-background":
											true,
									},
									{
										"bg-fill-quaternary text-muted-foreground":
											false,
									},
								)}
							>
								View
							</Button>
						</Popover.Trigger>
					</div >
					<Popover.Portal>
						<Popover.Content
							side="left"
							sideOffset={20}
							className="p-0"
						>
							<div className="bg-fill-quaternary">
								TODO

							</div>
						</Popover.Content>
					</Popover.Portal>
				</Popover.Root>
			</div>
		</div>
	);
}
