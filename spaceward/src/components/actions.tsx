import Action from "./action";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { useAddressContext } from "@/def-hooks/useAddressContext";
import useWardenIntent from "@/hooks/useWardenIntent";
import { Action as ActionModel } from "wardenprotocol-warden-client-ts/lib/warden.intent/rest";
import { prettyActionStatus } from "@/utils/formatting";

export default function Actions() {
	const { address } = useAddressContext();
	const { QueryActionsByAddress } = useWardenIntent();
	const q = QueryActionsByAddress(
		{ address, "pagination.reverse": true },
		{},
		100
	);

	const actions = (q.data?.pages?.flatMap((p) => p.actions || []) ||
		[]) as Required<ActionModel>[];

	const groups = actions.reduce((groups, action) => {
		const date = action.created_at.split("T")[0];
		if (!groups[date]) {
			groups[date] = [];
		}
		groups[date].push(action);
		return groups;
	}, {});

	const actionsArrays = Object.keys(groups).map((date) => {
		return {
			date,
			actions: groups[date],
		};
	});

	return (
		<div className="flex items-center content-center place-content-center">
			{actions.length > 0 ? (
				<Accordion
					type="single"
					collapsible
					className="space-y-0 w-full"
				>
					{actionsArrays.map((group) => {
						const group_date = new Date(group?.date);
						return (
							<div className="flex flex-col space-y-2 mb-8">
								<span className="text-sm text-muted-foreground">
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
											action?.created_at
										);
										const shortTime =
											new Intl.DateTimeFormat("en", {
												timeStyle: "short",
											});
										return (
											<AccordionItem
												value={`item-${action?.id.toString()}`}
												className={`p-4 border border-b-0 last:border-b first:rounded-t-lg last:rounded-b-lg py-2 hover:bg-card active:bg-card data-[state=open]:bg-card`}
											>
												<AccordionTrigger className="flex flex-row font-sans text-sm hover:no-underline">
													<div className="actions-trigger">
														<div className="text-left">
															#
															{action?.id.toString()}
														</div>
														<div className="text-left">
															{action?.msg[
																"@type"
															]
																?.replace(
																	"/warden.warden.Msg",
																	""
																)
																.replace(
																	/([A-Z])/g,
																	" $1"
																)
																.trim()}
														</div>
														<div>
															{action.intent_id.toString() ==
															"0"
																? `Default intent`
																: `Intent #${action.intent_id.toString()}`}
														</div>
														<div>
															{shortTime.format(
																date
															)}
														</div>
														<div>
															{prettyActionStatus(
																action?.status
															)}
														</div>
													</div>
												</AccordionTrigger>
												<AccordionContent className="border-t -mx-4 px-4">
													<div className="space-y-4">
														<Action
															key={action.id.toString()}
															action={action}
														/>
													</div>
												</AccordionContent>
											</AccordionItem>
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
						<h3 className="mt-2 text-3xl">No Actions</h3>
						{/* <p className="mt-1 text-gray-500">Get started by creating a new space.</p> */}
					</div>
				</div>
			)}
		</div>
	);
}
