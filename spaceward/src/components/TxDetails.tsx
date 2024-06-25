import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./ui/accordion";
import { TxMsgDetails } from "./TxMsgDetails";
import CardRow from "./ui/card-row";
import { Tx } from "@wardenprotocol/wardenjs/codegen/cosmos/tx/v1beta1/tx";

export default function TxDetails({
	code,
	gasWanted,
	gasUsed,
	tx,
	blockHeight,
	log,
}: {
	code?: number;
	gasWanted?: string;
	gasUsed?: string;
	tx: Tx;
	blockHeight?: string;
	log?: string;
}) {
	const msgs = tx.body?.messages || [];
	return (
		<Card>
			<CardHeader>
				<CardTitle>Transaction</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2">
				{blockHeight && (
					<CardRow label="Block">
						<Link
							to={`/explorer/block-by-height/${blockHeight}`}
							className="underline flex flex-row items-center"
						>
							#{blockHeight}
							<ExternalLink size={16} className="ml-2" />
						</Link>
					</CardRow>
				)}
				{code !== undefined && <CardRow label="Code">{code}</CardRow>}
				{gasWanted && <CardRow label="Gas wanted">{gasWanted}</CardRow>}
				{gasUsed && <CardRow label="Gas used">{gasUsed}</CardRow>}
				<CardRow label="Memo">{tx.body?.memo}</CardRow>
				<CardRow label="Timeout height">
					{tx.body?.timeoutHeight.toString()}
				</CardRow>
				{log && (
					<CardRow label="Log">
						<Accordion type="single" collapsible className="w-full">
							<AccordionItem value="item-1">
								<AccordionTrigger>Expand logs</AccordionTrigger>
								<AccordionContent>
									<pre>
										{JSON.stringify(
											JSON.parse(log),
											null,
											2,
										)}
									</pre>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</CardRow>
				)}

				<div className="flex flex-col gap-4">
					<span className="font-bold text-sm w-[100px]">
						Messages ({msgs.length}):
					</span>
					<ul className="pl-4">
						{msgs.map((msg, i) => (
							<li key={i}>
								<TxMsgDetails msg={msg} />
							</li>
						))}
					</ul>
				</div>
			</CardContent>
		</Card>
	);
}
