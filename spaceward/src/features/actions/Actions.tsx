import { Action } from "./Action";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { createPagination } from "@/hooks/query/util";
import { timestampToDate } from "@/lib/datetime";
import { prettyActionStatus } from "@/utils/formatting";
import { useConnectWallet } from "@web3-onboard/react";
import { useActionsByAddress } from "@/hooks/query/act";
import { ActionModel } from "@/hooks/query/types";

const pagination = createPagination({ reverse: true });

export function Actions() {
	const [{ wallet }] = useConnectWallet();
	const address = wallet?.accounts[0].address;

	const q = useActionsByAddress({
		request: {
			address,
			pagination
		},
	});

	const groups: { [key: string]: ActionModel[] } =
		q.data?.actions.reduce(
			(groups, action) => {
				const date = timestampToDate(action.createdAt)
					.toISOString()
					.split("T")[0];
				if (!groups[date]) {
					groups[date] = [];
				}
				groups[date].push(action);
				return groups;
			},
			{} as { [key: string]: ActionModel[] },
		) || {};

	const actionsArrays = Object.keys(groups).map((date) => {
		return {
			date,
			actions: groups[date],
		};
	});

	return (
		<div className="flex items-center content-center place-content-center min-w-fit">
			{actionsArrays.length > 0 ? (
				<Accordion
					type="single"
					collapsible
					className="space-y-0 w-full"
				>
					{actionsArrays.map((group) => {
						const group_date = new Date(group?.date);
						return (
							<div
								className="flex flex-col space-y-2 mb-8"
								key={group.date}
							>
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
										const date = timestampToDate(
											action.createdAt,
										);
										const shortTime =
											new Intl.DateTimeFormat("en", {
												timeStyle: "short",
											});
										return (
											<AccordionItem
												key={action.id}
												value={`item-${action?.id.toString()}`}
												className={`p-4 border border-background border-b-0 last:border-b first:rounded-t-xl last:rounded-b-xl py-2 bg-card`}
											>
												<AccordionTrigger className="flex flex-row font-sans text-sm hover:no-underline">
													<div className="actions-trigger">
														<div className="text-left">
															#
															{action?.id.toString()}
														</div>
														<div className="text-left">
															{action.msg?.typeUrl
																?.replace(
																	"/warden.warden.v1beta2.Msg",
																	"",
																)
																.replace(
																	"/warden.warden.v1beta3.Msg",
																	"",
																)
																.replace(
																	/([A-Z])/g,
																	" $1",
																)
																.trim()}
														</div>
														<div>
															{shortTime.format(
																date,
															)}
														</div>
														<div>
															{prettyActionStatus(
																action?.status,
															)}
														</div>
													</div>
												</AccordionTrigger>
												<AccordionContent className="border-t border-background -mx-4 px-4">
													<div className="space-y-4">
														<Action
															action={action}
															queryKey={q.queryKey}
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
					</div>
				</div>
			)}
		</div>
	);
}
