import { LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useConnectWallet } from "@web3-onboard/react";
import { Accordion } from "@/components/ui/accordion";
import { Icons } from "@/components/ui/icons-assets";
import { Icons as IconsDashboard } from "@/features/dashboard/icons";
import { useActionsByAddress } from "@/hooks/query/act";
import type { ActionModel } from "@/hooks/query/types";
import { createPagination } from "@/hooks/query/util";
import { timestampToDate } from "@/lib/datetime";
import { prettyActionStatus } from "@/utils/formatting";

const actionPagination = createPagination({ limit: BigInt(3), reverse: true });

export function Actions() {
	const [{ wallet }] = useConnectWallet();
	const address = wallet?.accounts[0].address;

	const q = useActionsByAddress({
		request: {
			address,
			pagination: actionPagination,
		}
	});

	const actions = q.data?.actions || [];

	const groups: { [key: string]: ActionModel[] } = actions.reduce(
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
	);

	if (q.status === "loading" || !actions?.length) {
		return (
			<div className="bg-card border-[1px] flex-col gap-5 border-border-edge rounded-2xl flex items-center justify-center text-center mt-8 p-16">
				{q.status === "loading" ? (
					<LoaderCircle className="animate-spin mt-2" />
				) : (
					<div className="flex flex-col gap-3 items-center justify-center">
						<IconsDashboard.noActions />
						<div className="text-xl	font-bold">No actions yet</div>
					</div>
				)}
			</div>
		);
	}

	return (
		<div className="bg-card py-5 px-6 border-[1px] border-border-edge rounded-2xl">
			<div className="flex justify-between items-center gap-2 mb-3">
				<div className="font-bold text-2xl flex items-center justify-between">
					Latest actions
				</div>
				<Link
					to="/actions"
					className="font-semibold text-muted-foreground"
				>
					See All
				</Link>
			</div>
			<div className="flex items-center">
				<Accordion
					type="single"
					collapsible
					className="space-y-0 w-full"
				>
					{Object.entries(groups)?.map(([date, group]) => {
						const group_date = new Date(date);
						return (
							<div className="flex flex-col" key={date}>
								<span className="mb-5 text-label-tertiary text-sm">
									{group_date.toLocaleDateString("en-GB", {
										weekday: "long",
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</span>
								<div>
									{group.map((action) => {
										const date = timestampToDate(
											action.createdAt,
										);
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
													<div className="grid gap-x-2 gap-y-5 grid-cols-[60px_174px_1fr_0.85fr] w-full">
														<div className="text-left">
															#
															{action.id.toString()}
														</div>
														<div className="text-left">
															{action?.msg?.typeUrl
																.replace(
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
														{/* <div>
															{action.rule.id.toString() ==
																"0"
																? `Default rule`
																: `Rule #${action.rule.id.toString()}`}
														</div> */}
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
			</div>
		</div>
	);
}
