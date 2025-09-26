import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { formatDateTime } from "@/lib/datetime";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import TxDetails from "./TxDetails";
import CardRow from "./ui/card-row";
import { Block } from "@wardenprotocol/wardenjs/codegen/tendermint/types/block";
import { Tx } from "@wardenprotocol/wardenjs/codegen/cosmos/tx/v1beta1/tx";

function BlockDetails({ block, txs }: { block: Block; txs: Tx[] }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Block info</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2">
				<CardRow label="Hash">
					{block.header.lastBlockId.hash}
				</CardRow>
				<CardRow label="Height">{block.header.height.toString()}</CardRow>
				<CardRow label="Timestamp">
					{formatDateTime(block.header.time)}
				</CardRow>
				<CardRow label="Transactions">
					{txs.length} txs
				</CardRow>

				<div className="flex flex-row gap-4 pt-8">
					<Link
						to={`/explorer/block-by-height/${block.header.height - BigInt(1)}`}
					>
						<Button variant="secondary">Previous block ({(block.header.height - BigInt(1)).toString()})</Button>
					</Link>
					<Link
						to={`/explorer/block-by-height/${block.header.height + BigInt(1)}`}
					>
						<Button variant="secondary">Next block ({(block.header.height + BigInt(1)).toString()})</Button>
					</Link>
				</div>

				<div>
					{txs.map((tx, i) => (
						<TxDetails key={i} tx={tx} />
					))}
				</div>
			</CardContent>
			<CardFooter className="flex justify-between"></CardFooter>
		</Card>
	);
}

export default BlockDetails;
