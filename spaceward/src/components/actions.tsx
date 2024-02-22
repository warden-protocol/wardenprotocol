import Action from "./Action.1";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { useAddressContext } from "@/def-hooks/useAddressContext";
import useWardenIntent from "@/hooks/useWardenIntent";
import { ActionStatus } from "wardenprotocol-warden-client-ts/lib/warden.intent/rest";
import { Action as ActionModel } from "wardenprotocol-warden-client-ts/lib/warden.intent/rest";

export default function Actions() {
	const { address } = useAddressContext();
	const { QueryActionsByAddress } = useWardenIntent();
	const q = QueryActionsByAddress({ address }, {}, 10);
	const qpending = QueryActionsByAddress(
		{ address, status: ActionStatus.ACTION_STATUS_PENDING },
		{},
		10
	);

	const completed = (q.data?.pages?.flatMap((p) => p.actions || []) ||
		[]) as Required<ActionModel>[];
	const pending = (qpending.data?.pages?.flatMap((p) => p.actions || []) ||
		[]) as Required<ActionModel>[];

	return (
		<div className="flex items-center content-center place-content-center">
			<Tabs defaultValue="history" className="w-full">
				<TabsList>
					<TabsTrigger value="pending">Pending</TabsTrigger>
					<TabsTrigger value="history">History</TabsTrigger>
				</TabsList>
				<TabsContent value="pending">
					<Accordion type="single" collapsible className="space-y-3">
						{pending.length > 0 ? (
							<>
								{pending.map((action) => (
									<AccordionItem
										value={`item-${action?.id.toString()}`}
										className="p-4 border rounded-lg hover:border-white"
									>
										<AccordionTrigger className="flex flex-row">
											<div>
												Action #{action?.id.toString()}
											</div>
										</AccordionTrigger>
										<AccordionContent>
											<div className="space-y-4">
												<Action
													key={action.id.toString()}
													action={action}
												/>
											</div>
										</AccordionContent>
									</AccordionItem>
								))}
							</>
						) : (
							<div>
								<div className="text-center">
									<h3 className="mt-2 text-3xl">
										No Pending Actions
									</h3>
									{/* <p className="mt-1 text-gray-500">Get started by creating a new space.</p> */}
								</div>
							</div>
						)}
					</Accordion>
				</TabsContent>
				<TabsContent value="history">
					<Accordion type="single" collapsible className="space-y-3">
						{completed.length > 0 ? (
							<>
								{completed.map((action) => (
									<AccordionItem
										value={`item-${action?.id.toString()}`}
										className="p-4 border rounded-lg hover:border-white"
									>
										<AccordionTrigger className="flex flex-row">
											<div>
												Action #{action?.id.toString()}
											</div>
										</AccordionTrigger>
										<AccordionContent>
											<div className="space-y-4">
												<Action
													key={action.id.toString()}
													action={action}
												/>
											</div>
										</AccordionContent>
									</AccordionItem>
								))}
							</>
						) : (
							<div>
								<div className="text-center">
									<h3 className="mt-2 text-3xl">
										No Actions
									</h3>
									{/* <p className="mt-1 text-gray-500">Get started by creating a new space.</p> */}
								</div>
							</div>
						)}
					</Accordion>
				</TabsContent>
			</Tabs>
		</div>
	);
}
