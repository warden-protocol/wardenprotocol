import { Accordion } from "@/components/ui/accordion";
import { useAddressContext } from "@/hooks/useAddressContext";
import useWardenIntent from "@/hooks/useWardenIntent";
import { Action as ActionModel } from "warden-protocol-wardenprotocol-client-ts/lib/warden.intent/rest";
import { prettyActionStatus } from "@/utils/formatting";
import { Icons } from "@/components/ui/icons-assets";
import { LoaderCircle } from "lucide-react";

export function Actions() {
	const { address } = useAddressContext();
	const { QueryActionsByAddress } = useWardenIntent();
	const q = QueryActionsByAddress(
		{
			address,
			// status: ActionStatus.ACTION_STATUS_COMPLETED,
			"pagination.reverse": true,
		},
		{},
		10,
	);

	const actions = (q.data?.pages?.flatMap((p) => p.actions || []) ||
		[]) as Required<ActionModel>[];

	const groups: { [key: string]: ActionModel[] } = actions.reduce(
		(groups, action) => {
			const date = action.created_at.split("T")[0];
			if (!groups[date]) {
				groups[date] = [];
			}
			groups[date].push(action);
			return groups;
		},
		{},
	);

	const actionsArrays = Object.keys(groups).map((date) => {
		return {
			date,
			actions: groups[date],
		};
	});

	return (
		<div className="flex items-center">
			{actions == undefined ? (
				<LoaderCircle className="animate-spin mt-2" />
			) : actions.length > 0 ? (
				<Accordion
					type="single"
					collapsible
					className="space-y-0 w-full"
				>
					{actionsArrays.map((group) => {
						const group_date = new Date(group?.date);
						return (
							<div className="flex flex-col" key={group.date}>
								<span className="mb-5 text-label-tertiary text-sm">
									{group_date.toLocaleDateString("en-GB", {
										weekday: "long",
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</span>
								<div>
									{group.actions.map((action) => {
										const date = new Date(
											action?.created_at,
										);
										const shortTime =
											new Intl.DateTimeFormat("en", {
												timeStyle: "short",
											});
										return (
											<div
												key={action.id}
												value={`item-${action?.id.toString()}`}
												className={`py-3`}
											>
												<div className="flex flex-row hover:no-underline">
													<div className="grid gap-x-2 gap-y-5 grid-cols-[70px_174px_1fr_0.5fr_1fr] w-full">
														<div className="text-left">
															#
															{action?.id.toString()}
														</div>
														<div className="text-left">
															{action?.msg[
																"@type"
															]
																?.replace(
																	"/warden.warden.v1beta2.Msg",
																	"",
																)
																.replace(
																	/([A-Z])/g,
																	" $1",
																)
																.trim()}
														</div>
														<div>
															{action.intent.id.toString() ==
															"0"
																? `Default intent`
																: `Intent #${action.intent.id.toString()}`}
														</div>
														<div>
															{shortTime.format(
																date,
															)}
														</div>
														<div className="flex justify-end">
															<div className="w-fit flex items-center p-1 pr-2 gap-1 text-muted-foreground border-[1px] border-text-muted-foreground text-xs rounded">
																<Icons.grayCheckmark stroke="currentColor" />
																{prettyActionStatus(
																	action?.status,
																)}
															</div>
														</div>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						);
					})}
				</Accordion>
			) : (
				<div>
					<div className="text-center">
						<h3 className="mt-2 text-xl">No Actions</h3>
					</div>
				</div>
			)}
		</div>
	);
}
