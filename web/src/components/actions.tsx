import { useQuery } from "@tanstack/react-query";
import { actionsByAddress } from "@/client/intent";
import { ActionStatus } from "@/proto/wardenprotocol/intent/action_pb";
import { useKeplrAddress } from "@/keplr";
import Action from "./action";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";


export default function Actions() {
  const addr = useKeplrAddress();
  const q = useQuery({
		queryKey: ["actions", "completed", addr],
		queryFn: () => actionsByAddress(addr, ActionStatus.COMPLETED),
		// queryFn: () => actionsByAddress(addr),
  });
  const qpending = useQuery({
		queryKey: ["actions", "pending", addr],
		queryFn: () => actionsByAddress(addr, ActionStatus.PENDING),
		// queryFn: () => actionsByAddress(addr),
	});
  if (!q.data) {
    return (
      <p>Loading...</p>
    );
  }
  const count = q.data.pagination?.total.toString();
  const pendingcount = qpending.data?.pagination?.total.toString();

  // return (
  //   <div>
  //     <div className="flex items-center justify-between">
  //       <span className="ml-2">
  //         {count}{" "}
  //         {count === "1" ? "action" : "actions"}
  //       </span>
  //     </div>

  //     <div className="mt-6">
  //       {q.data.actions.map((action) => (
  //         <Action key={action.id.toString()} action={action} />
  //       ))}
  //     </div>
  //   </div>
  // );

  return (
		<div className="flex items-center content-center place-content-center">
			<Tabs
				defaultValue="history"
				className="w-full"
			>
				<TabsList>
					<TabsTrigger value="pending">Pending</TabsTrigger>
					<TabsTrigger value="history">History</TabsTrigger>
				</TabsList>
				<TabsContent value="pending">
					<Accordion
						type="single"
						collapsible
						className="space-y-3"
					>
						{pendingcount && pendingcount !== "0" ? (
							<>
								{qpending.data.actions.map((action) => (
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
					<Accordion
						type="single"
						collapsible
						className="space-y-3"
					>
						{count && count !== "0" ? (
							<>
								{q.data.actions.map((action) => (
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

