import { Accordion } from "@/components/ui/accordion";
import { useAddressContext } from "@/hooks/useAddressContext";
import { prettyActionStatus } from "@/utils/formatting";
import { Icons } from "@/components/ui/icons-assets";
import { LoaderCircle } from "lucide-react";
import { useQueryHooks } from "@/hooks/useClient";
import { PageRequest } from "@wardenprotocol/wardenjs/codegen/cosmos/base/query/v1beta1/pagination";
import { Action as ActionModel, ActionStatus } from "@wardenprotocol/wardenjs/codegen/warden/act/v1beta1/action";
import { timestampToDate } from "@/lib/datetime";

export function Actions() {
	const { address } = useAddressContext();
	const { useActionsByAddress } = useQueryHooks();

	const q = useActionsByAddress({
		request: {
			address,
			status: ActionStatus.UNRECOGNIZED,
			pagination: PageRequest.fromPartial({
				reverse: true,
			}),
		},
	});

	const actions = q.data?.actions || [];

	const groups: { [key: string]: ActionModel[] } = actions.reduce(
		(groups, action) => {
			const date = timestampToDate(action.createdAt).toISOString().split("T")[0];
			if (!groups[date]) {
				groups[date] = [];
			}
			groups[date].push(action);
			return groups;
		},
		{} as { [key: string]: ActionModel[] },
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
										const date = timestampToDate(action.createdAt);
										const shortTime =
											new Intl.DateTimeFormat("en", {
												timeStyle: "short",
											});
										return (
											<div
												key={action.id}
												className={`py-3`}
											>
												<div className="flex flex-row hover:no-underline">
													<div className="grid gap-x-2 gap-y-5 grid-cols-[70px_174px_1fr_0.5fr_1fr] w-full">
														<div className="text-left">
															#
															{action?.id.toString()}
														</div>
														<div className="text-left">
															{action?.msg?.typeUrl.replace(
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
															{action.rule.id.toString() ==
																"0"
																? `Default intent`
																: `Intent #${action.rule.id.toString()}`}
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
